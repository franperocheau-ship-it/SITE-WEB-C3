/* ─────────────────────────────────────────────────────────────────────────────
   comprehensions-orales-engine.js — Moteur de passage des compréhensions
   orales côté élève (francais-oral.html). Dépend de : auth.js (lfmAuth),
   comprehensions-orales-student.js (lfmComprehensionsOralesStudent),
   breadcrumb.js.

   Bascule d'état bibliothèque/passage/résultats sur une page unique, comme
   js/questionnaires-engine.js — mais contrairement à lui, PAS de flux "une
   question à la fois" : les 10 questions d'une compréhension orale sont
   affichées simultanément sous le lecteur (renderAllQuestions), pour que
   l'élève puisse les lire pendant qu'il écoute le podcast, avec une seule
   validation groupée (onSubmitAll) plutôt qu'un "Suivant" par question —
   voir le commentaire de renderAllQuestions() pour le détail de ce choix.
   Le lecteur audio France Inter reste affiché en permanence pendant le
   passage ; les réponses QCM cochées sont des index entiers dans
   `propositions` (pas d'uuid — comprehension_orale_questions n'a pas de
   table `reponses` séparée, voir la migration 20260920100000_comprehensions_
   orales.sql) ; et une question peut être de type 'qcm' (boutons de choix)
   ou 'reponse_libre' (champ texte, comparé côté serveur à une liste de
   formulations acceptées — voir la migration 20260921100000_comprehension_
   orale_reponse_libre.sql).

   Sert aussi d'écran de consultation en lecture seule pour un enseignant ou
   un admin (francais-oral.html?resultat=<id>, voir startReview() et
   js/comprehensions-orales-teacher.js) : même écran de résultats que celui
   vu par l'élève, sans repasser par la bibliothèque ni permettre de
   soumettre. L'autorisation est vérifiée côté serveur (RPC
   get_comprehension_orale_resultat_detail), jamais côté client.
   ───────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  let library = [];
  let content = null;       // { comprehension_orale, questions } — voir get_comprehension_orale_pour_eleve
  let selectedByQuestion = new Map(); // question_id -> Set<index> (qcm uniquement — les réponses libres sont relues depuis le DOM à la soumission)
  let speechEnabled = false; // élève marqué est_dyslexique — voir lfmAuth.getMyStudentRecord()
  let _reviewMode = false;   // true si consultation enseignant/admin en lecture seule (voir startReview)
  let _reviewBackUrl = null; // ?back= — page enseignant d'origine, pour le bouton de retour

  /* Défense en profondeur : au cas où une compréhension orale existante en
     base aurait été enregistrée avant que comprehension-orale-admin.html
     n'extraie automatiquement l'UUID d'un tag <iframe> collé par erreur
     (voir extractEpisodeId côté admin) — on ne veut jamais générer un
     lecteur cassé côté élève. */
  function extractEpisodeId(raw) {
    const s = String(raw == null ? '' : raw).trim();
    const match = s.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    return match ? match[0] : s;
  }

  /* Miroir client de comprehension_orale_normalize_text() côté serveur
     (migration 20260921100000) — insensible à la casse, aux accents et aux
     espaces superflus. Le score affiché vient toujours du serveur (jamais
     recalculé ici) ; cette fonction ne sert qu'à décider si le badge
     Correct/Incorrect de l'écran de révision correspond bien à ce score,
     pour une question à réponse libre. */
  function normalizeText(str) {
    return String(str == null ? '' : str)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().trim().replace(/\s+/g, ' ');
  }

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Évite qu'un titre d'épisode termine sur un mot (ou une ponctuation)
     esseulé en fin de ligne (veuf typographique) : remplace le dernier
     espace par une espace insécable (U+00A0, pas l'entité HTML &nbsp; —
     co-page-title est rempli via textContent, jamais parsé comme HTML, donc
     un vrai caractère insécable est nécessaire). */
  function preventWidow(str) {
    const s = String(str == null ? '' : str);
    const lastSpace = s.lastIndexOf(' ');
    if (lastSpace === -1) return s;
    return s.slice(0, lastSpace) + '\u00A0' + s.slice(lastSpace + 1);
  }

  function showState(name) {
    ['loading', 'library', 'quiz', 'results', 'error'].forEach(s => {
      const el = document.getElementById('co-state-' + s);
      if (el) el.style.display = s === name ? '' : 'none';
    });
  }

  function showError(msg) {
    showState('error');
    if (msg) document.querySelector('#co-state-error p').textContent = msg;
  }

  /* ── Bilan agrégé (% de réussite sur N compréhensions orales réalisées) ── */
  async function renderBilanLine() {
    const el = document.getElementById('co-bilan-line');
    if (!el) return;
    try {
      const { data, error } = await window.lfmDb.from('exercise_results')
        .select('exercise_slug, pct')
        .like('exercise_slug', 'comprehension-orale-%');
      if (error) throw error;
      const rows = data || [];
      if (rows.length === 0) { el.style.display = 'none'; return; }
      const best = (typeof lfmAnalytics !== 'undefined') ? lfmAnalytics.dedupeBestBySlug(rows) : rows;
      const avgPct = Math.round(best.reduce((s, r) => s + parseFloat(r.pct), 0) / best.length);
      el.innerHTML = `<strong>${avgPct}%</strong> de réussite sur ${best.length} compréhension${best.length !== 1 ? 's' : ''} orale${best.length !== 1 ? 's' : ''} réalisée${best.length !== 1 ? 's' : ''}`;
      el.style.display = '';
    } catch (e) {
      el.style.display = 'none';
    }
  }

  /* ── Bibliothèque — grille de cartes ──
     3 couleurs de marque en alternance (index % 3), voir css/comprehension-
     orale.css (style aligné sur .dic-card — fond blanc, liseré coloré en
     haut). "Épisode N" numérote par position d'affichage (pas de champ
     durée en base — décision produit : on l'omet plutôt que d'inventer une
     donnée). */
  const TILE_COLORS = ['turquoise', 'or', 'navy'];

  function renderLibrary() {
    const grid = document.getElementById('co-library-grid');
    const empty = document.getElementById('co-library-empty');
    if (library.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    const tilesHtml = library.map((item, i) => `
      <button type="button" class="co-tile co-tile--${TILE_COLORS[i % 3]}" data-start="${item.id}">
        <span class="co-tile-score-badge-mount" data-score-mount="${item.id}"></span>
        <span class="co-tile-meta">Épisode ${i + 1}</span>
        <span class="co-tile-title">${escHtml(item.titre_episode)}</span>
        ${item.description ? `<span class="co-tile-resume">${escHtml(item.description)}</span>` : ''}
        <span class="co-tile-listen-btn" data-listen-btn="${item.id}">Écouter</span>
      </button>
    `).join('');

    // Complète toujours à 3 tuiles pour ne jamais laisser la grille avec un
    // vide asymétrique, sans effet une fois 3 épisodes ou plus publiés.
    const placeholdersHtml = Array.from({ length: Math.max(0, 3 - library.length) }, () => `
      <div class="co-tile co-tile--placeholder">
        <span class="co-tile-placeholder-icon" aria-hidden="true">+</span>
        <span class="co-tile-placeholder-text">Prochain épisode bientôt disponible</span>
      </div>
    `).join('');

    grid.innerHTML = tilesHtml + placeholdersHtml;
    grid.querySelectorAll('[data-start]').forEach(btn =>
      btn.addEventListener('click', () => startQuiz(btn.dataset.start))
    );
  }

  /* ── Badge de score + bouton "Réécouter" sur les cartes déjà passées ──
     Même principe que js/skill-badges.js (applySkillValidationBadges) :
     une unique requête pour tout le catalogue, réduite côté client, jamais
     rien pour un visiteur non connecté (pas de session → sortie immédiate,
     cohérent avec le mode visiteur — aucune ligne resultats_comprehension_
     orale n'existe de toute façon pour lui). Contrairement au badge à seuil
     fixe de skill-badges.js, affiche le MEILLEUR score obtenu (comme
     lfmAnalytics.dedupeBestBySlug, déjà la convention du reste du site pour
     ce genre d'agrégat), sans jamais masquer le titre ni empêcher de
     rejouer — un insert dans le mount point déjà réservé par renderLibrary()
     et un changement de texte du bouton ("Écouter" → "Réécouter"), la carte
     (bouton, clic) reste inchangée par ailleurs. */
  async function fetchOralBestScores(studentId) {
    const { data, error } = await window.lfmDb
      .from('resultats_comprehension_orale')
      .select('comprehension_orale_id, score, total')
      .eq('student_id', studentId)
      .limit(2000);

    if (error) {
      console.warn('[ComprehensionsOrales] fetchOralBestScores:', error.message);
      return new Map();
    }

    const bestByItem = new Map();
    (data || []).forEach(row => {
      const pct = Math.round((row.score / row.total) * 100);
      const current = bestByItem.get(row.comprehension_orale_id);
      if (!current || pct > current.pct) {
        bestByItem.set(row.comprehension_orale_id, { score: row.score, total: row.total, pct });
      }
    });
    return bestByItem;
  }

  async function applyOralScoreBadges() {
    const mounts = document.querySelectorAll('[data-score-mount]');
    if (!mounts.length || !window.lfmDb || typeof lfmAuth === 'undefined') return;

    try {
      const session = await lfmAuth.getSession();
      if (!session) return;

      const bestByItem = await fetchOralBestScores(session.user.id);
      if (!bestByItem.size) return;

      mounts.forEach(mount => {
        const best = bestByItem.get(mount.dataset.scoreMount);
        if (!best) return;
        mount.innerHTML = `<span class="co-tile-score-badge" title="Déjà passé — meilleur score : ${best.score}/${best.total} (${best.pct}%)">✓ ${best.score}/${best.total}</span>`;

        const listenBtn = mount.closest('.co-tile')?.querySelector('[data-listen-btn]');
        if (listenBtn) listenBtn.textContent = 'Réécouter';
      });
    } catch (err) {
      console.warn('[ComprehensionsOrales] applyOralScoreBadges:', err.message);
    }
  }

  async function loadLibrary() {
    showState('loading');
    try {
      library = await lfmComprehensionsOralesStudent.listPublished();
    } catch (e) {
      return showError();
    }
    document.getElementById('co-page-title').textContent = 'Compréhension orale';
    document.getElementById('co-page-subtitle').textContent = 'Écoute un épisode des Odyssées et teste ta compréhension.';
    renderLibrary();
    renderBilanLine();
    applyOralScoreBadges();
    showState('library');
  }

  /* ── Passage ── */
  async function startQuiz(id) {
    showState('loading');
    try {
      content = await lfmComprehensionsOralesStudent.getContent(id);
    } catch (e) {
      return showError();
    }
    selectedByQuestion = new Map();
    document.getElementById('co-page-title').textContent = preventWidow(content.comprehension_orale.titre_episode);
    document.getElementById('co-page-subtitle').textContent = content.comprehension_orale.description || '';
    document.getElementById('co-player-mount').innerHTML =
      `<iframe src="https://embed.radiofrance.fr/franceinter/diffusion/${encodeURIComponent(extractEpisodeId(content.comprehension_orale.id_episode_france_inter))}" width="100%" height="144" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('co-player-wrap').style.display = '';
    renderAllQuestions();
    showState('quiz');
  }

  /* Les 10 questions sont affichées simultanément sous le lecteur (au lieu
     d'un flux "une question à la fois" comme js/questionnaires-engine.js) :
     l'élève doit pouvoir les lire pendant qu'il écoute le podcast, ce qui
     suppose de toutes les voir sans naviguer entre elles. Chaque bloc
     réutilise .qz-question-block/.qz-choices-list/.qz-choice-btn
     (css/questionnaires.css — purement visuelles, aucune logique d'état
     attachée), simplement empilés au lieu d'un seul affiché à la fois. Les
     sélections QCM sont suivies dans selectedByQuestion (Map) au clic ; les
     réponses libres sont relues directement depuis leur <input> au moment
     de la validation (onSubmitAll), pas besoin de les suivre en JS. */
  function renderAllQuestions() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    const list = document.getElementById('co-questions-list');
    const total = content.questions.length;

    list.innerHTML = content.questions.map((q, i) => `
      <div class="qz-question-block co-q-block" data-question-block="${q.id}">
        <div class="co-q-num">Question ${i + 1} / ${total}</div>
        <div class="qz-question-enonce" data-enonce="${q.id}"></div>
        ${q.type_question === 'reponse_libre'
          ? `<input type="text" class="qz-form-input" data-libre="${q.id}" placeholder="Ta réponse" autocomplete="off">`
          : `<div class="qz-choices-list" data-choices="${q.id}">
              ${q.propositions.map((texte, pi) => `
                <div class="qz-choice-row">
                  <button type="button" class="qz-choice-btn" data-question="${q.id}" data-idx="${pi}">
                    <span class="qz-choice-mark"></span><span>${escHtml(texte)}</span>
                  </button>
                </div>
              `).join('')}
            </div>`
        }
      </div>
    `).join('');

    // Énoncé injecté via textContent (pas dans le template ci-dessus) pour
    // rester cohérent avec attachSpeechButton, qui ajoute son propre bouton
    // dans le même conteneur — même précaution que l'ancien renderQuestion().
    content.questions.forEach(q => {
      const enonceEl = list.querySelector(`[data-enonce="${q.id}"]`);
      const enonceText = document.createElement('span');
      enonceText.textContent = q.enonce;
      enonceEl.appendChild(enonceText);
      if (speechEnabled) attachSpeechButton(enonceEl, q.enonce);

      if (q.type_question !== 'reponse_libre' && speechEnabled) {
        list.querySelectorAll(`[data-choices="${q.id}"] .qz-choice-row`).forEach((row, i) =>
          attachSpeechButton(row, q.propositions[i])
        );
      }
    });

    list.querySelectorAll('.qz-choice-btn').forEach(btn => btn.addEventListener('click', () => {
      const qId = btn.dataset.question;
      const idx = +btn.dataset.idx;
      if (!selectedByQuestion.has(qId)) selectedByQuestion.set(qId, new Set());
      const set = selectedByQuestion.get(qId);
      if (set.has(idx)) { set.delete(idx); btn.classList.remove('is-selected'); }
      else { set.add(idx); btn.classList.add('is-selected'); }
      clearMissingState(qId);
    }));

    list.querySelectorAll('[data-libre]').forEach(input => {
      input.addEventListener('input', () => clearMissingState(input.dataset.libre));
    });
  }

  function clearMissingState(questionId) {
    const block = document.querySelector(`[data-question-block="${questionId}"]`);
    if (block) block.classList.remove('co-q-block--missing');
  }

  /* Vérifie que les 10 questions ont une réponse avant d'autoriser la
     soumission — jamais de soumission partielle. Retourne le tableau
     answersGiven prêt pour submitResult() si tout est répondu, sinon null
     (après avoir affiché l'erreur et mis en évidence les questions
     manquantes, en scrollant jusqu'à la première). */
  function validateAllAnswered() {
    const missing = [];
    const answersGiven = [];

    content.questions.forEach(q => {
      if (q.type_question === 'reponse_libre') {
        const input = document.querySelector(`[data-libre="${q.id}"]`);
        const value = input ? input.value.trim() : '';
        if (!value) missing.push(q.id);
        answersGiven.push({ question_id: q.id, reponse_texte: value });
      } else {
        const set = selectedByQuestion.get(q.id);
        if (!set || set.size === 0) missing.push(q.id);
        answersGiven.push({ question_id: q.id, reponse_indices: Array.from(set || []) });
      }
    });

    const errorEl = document.getElementById('co-quiz-error');
    if (missing.length > 0) {
      missing.forEach(qId => {
        const block = document.querySelector(`[data-question-block="${qId}"]`);
        if (block) block.classList.add('co-q-block--missing');
      });
      errorEl.textContent = missing.length === 1
        ? 'Il reste une question sans réponse — réponds-y avant de valider.'
        : `Il reste ${missing.length} questions sans réponse — réponds-y avant de valider.`;
      errorEl.style.display = '';
      document.querySelector(`[data-question-block="${missing[0]}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return null;
    }

    errorEl.style.display = 'none';
    return answersGiven;
  }

  async function onSubmitAll() {
    const answersGiven = validateAllAnswered();
    if (!answersGiven) return;
    await finishQuiz(answersGiven);
  }

  async function finishQuiz(answersGiven) {
    showState('loading');
    let result;
    try {
      result = await lfmComprehensionsOralesStudent.submitResult(content.comprehension_orale.id, answersGiven);
    } catch (e) {
      return showError();
    }
    document.getElementById('co-player-wrap').style.display = 'none';
    renderResults(result);
    showState('results');
  }

  /* ── Résultats ──
     Réutilisée à l'identique en direct (juste après soumission, résultat
     venant de submitResult) et en consultation enseignant/admin (résultat
     venant de getResultatDetail sur une tentative déjà enregistrée, voir
     startReview ci-dessous) : les deux RPC renvoient désormais la même forme
     de correction, chaque item portant déjà given_reponses (qcm, textes des
     propositions cochées) ou given_texte (réponse libre) — plus besoin de
     recroiser avec `content`/`answersGiven` ici, ce qui permet à cette
     fonction de fonctionner même quand la compréhension orale n'a jamais été
     chargée dans CETTE session (cas de la consultation). */
  function renderResults(result) {
    const pct = Math.round((result.score / result.total) * 100);
    const circle = document.getElementById('co-score-circle');
    circle.classList.remove('is-low', 'is-mid');
    if (pct < 50) circle.classList.add('is-low');
    else if (pct < 80) circle.classList.add('is-mid');

    document.getElementById('co-score-pct').textContent = pct + '%';
    document.getElementById('co-score-frac').textContent = `${result.score} / ${result.total} bonnes réponses`;
    document.getElementById('co-results-title').textContent =
      pct >= 80 ? 'Bravo !' : pct >= 50 ? 'Bien joué !' : "Continue à t'entraîner !";

    const list = document.getElementById('co-review-list');
    list.innerHTML = (result.correction || []).map(c => {
      const isReponseLibre = c.type_question === 'reponse_libre';

      let isWrong, correctLabel, givenLabel;
      if (isReponseLibre) {
        const acceptedNorm = (c.bonnes_reponses || []).map(normalizeText);
        isWrong = !acceptedNorm.includes(normalizeText(c.given_texte));
        correctLabel = 'Réponse(s) acceptée(s)';
        givenLabel = c.given_texte || '—';
      } else {
        const given = new Set(c.given_reponses || []);
        const correct = new Set(c.bonnes_reponses || []);
        isWrong = given.size !== correct.size || [...given].some(t => !correct.has(t));
        correctLabel = 'Bonne réponse';
        givenLabel = (c.given_reponses || []).join(', ') || '—';
      }

      return `
        <div class="qz-review-item ${isWrong ? 'is-wrong' : ''}">
          <div class="qz-review-enonce">
            ${escHtml(c.enonce)}
            <span class="qz-review-badge ${isWrong ? 'qz-review-badge--ko' : 'qz-review-badge--ok'}">${isWrong ? 'Incorrect' : 'Correct'}</span>
          </div>
          <div class="qz-review-explication">Réponse donnée : ${escHtml(givenLabel)}</div>
          <div class="qz-review-correct">${correctLabel} : ${(c.bonnes_reponses || []).map(t => escHtml(t)).join(', ')}</div>
          ${c.explication ? `<div class="qz-review-explication">${escHtml(c.explication)}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  /* ── Consultation enseignant/admin (lecture seule) ──
     Activée par francais-oral.html?resultat=<id> — voir reviewHref() dans
     resultats-oral-enseignant.html / resultats-enseignant.html. Réutilise
     exactement le même écran que le passage élève (renderResults, lecteur
     audio) : seule la source des données change (une tentative déjà
     enregistrée plutôt qu'une soumission fraîche), et le bouton de retour
     est adapté (revient à la page enseignant d'origine au lieu de recharger
     la bibliothèque élève). L'autorisation (enseignant des élèves
     concernés, ou admin) est vérifiée côté serveur par la RPC
     get_comprehension_orale_resultat_detail — jamais côté client. */
  async function startReview(resultatId) {
    showState('loading');
    let detail;
    try {
      detail = await lfmComprehensionsOralesTeacher.getResultatDetail(resultatId);
    } catch (e) {
      return showError("Impossible de charger cette tentative (elle n'existe plus, ou tu n'as pas le droit de la consulter).");
    }

    const params = new URLSearchParams(window.location.search);
    const sname = params.get('sname');
    const dateLabel = new Date(detail.date_passage).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    document.getElementById('co-page-title').textContent = preventWidow(detail.comprehension_orale.titre_episode);
    document.getElementById('co-page-subtitle').textContent =
      (sname ? `Consultation en lecture seule — ${sname}, le ${dateLabel}` : `Consultation en lecture seule — tentative du ${dateLabel}`);

    document.getElementById('co-player-mount').innerHTML =
      `<iframe src="https://embed.radiofrance.fr/franceinter/diffusion/${encodeURIComponent(extractEpisodeId(detail.comprehension_orale.id_episode_france_inter))}" width="100%" height="144" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('co-player-wrap').style.display = '';

    renderResults(detail);
    showState('results');

    _reviewMode = true;
    _reviewBackUrl = params.get('back');
    document.getElementById('co-back-btn').textContent = '← Retour';
  }

  /* ── Init ──
     Pas de blocage sur l'absence de session : mode visiteur, même principe
     que le reste du site pour les exercices standards (exercise.html ne
     vérifie aucune session, js/guided-access.js — repli sur accès total
     dans tous les cas ambigus). Les éléments qui dépendent réellement d'un
     compte élève (synthèse vocale, ligne de bilan agrégé dans
     renderBilanLine) se désactivent ou se masquent déjà d'eux-mêmes sans
     session, sans qu'il soit nécessaire de bloquer la page entière. */
  async function init() {
    const session = await lfmAuth.getSession();
    if (session) {
      const student = await lfmAuth.getMyStudentRecord();
      speechEnabled = !!(student && student.est_dyslexique);
    }

    document.getElementById('co-next-btn').addEventListener('click', onSubmitAll);
    document.getElementById('co-back-btn').addEventListener('click', () => {
      if (_reviewMode) {
        if (_reviewBackUrl) window.location.href = _reviewBackUrl;
        else history.back();
      } else {
        window.location.reload();
      }
    });

    const resultatId = new URLSearchParams(window.location.search).get('resultat');
    if (resultatId) {
      startReview(resultatId);
    } else {
      loadLibrary();
    }
  }

  init();
})();

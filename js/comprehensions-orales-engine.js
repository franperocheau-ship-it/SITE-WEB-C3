/* ─────────────────────────────────────────────────────────────────────────────
   comprehensions-orales-engine.js — Moteur de passage des compréhensions
   orales côté élève (francais-oral.html). Dépend de : auth.js (lfmAuth),
   comprehensions-orales-student.js (lfmComprehensionsOralesStudent),
   breadcrumb.js.

   Calqué sur js/questionnaires-engine.js (même bascule d'état bibliothèque/
   passage/résultats sur une page unique), avec trois différences : le
   lecteur audio France Inter reste affiché en permanence pendant le passage
   (pour permettre de réécouter en répondant) ; les réponses QCM cochées sont
   des index entiers dans `propositions` (pas d'uuid — comprehension_orale_
   questions n'a pas de table `reponses` séparée, voir la migration
   20260920100000_comprehensions_orales.sql) ; et une question peut être de
   type 'qcm' (boutons de choix) ou 'reponse_libre' (champ texte, comparé
   côté serveur à une liste de formulations acceptées — voir la migration
   20260921100000_comprehension_orale_reponse_libre.sql).

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
  let currentIndex = 0;
  let selectedIndices = new Set();
  let answersGiven = [];    // [{ question_id, reponse_indices }] (qcm) ou [{ question_id, reponse_texte }] (reponse_libre)
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

  /* ── Bibliothèque ── */
  function renderLibrary() {
    const grid = document.getElementById('co-library-grid');
    const empty = document.getElementById('co-library-empty');
    if (library.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = library.map(item => `
      <div class="qz-card">
        <div class="qz-card-icon">🎧</div>
        <div class="qz-card-title">${escHtml(item.titre_episode)}</div>
        ${item.description ? `<div class="qz-card-auteur">${escHtml(item.description)}</div>` : ''}
        <button type="button" class="qz-card-btn" data-start="${item.id}">Écouter et répondre</button>
      </div>
    `).join('');
    grid.querySelectorAll('[data-start]').forEach(btn =>
      btn.addEventListener('click', () => startQuiz(btn.dataset.start))
    );
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
    currentIndex = 0;
    answersGiven = [];
    document.getElementById('co-page-title').textContent = content.comprehension_orale.titre_episode;
    document.getElementById('co-page-subtitle').textContent = content.comprehension_orale.description || '';
    document.getElementById('co-player-mount').innerHTML =
      `<iframe src="https://embed.radiofrance.fr/franceinter/diffusion/${encodeURIComponent(extractEpisodeId(content.comprehension_orale.id_episode_france_inter))}" width="100%" height="144" frameborder="0" allowfullscreen></iframe>`;
    document.getElementById('co-player-wrap').style.display = '';
    renderQuestion();
    showState('quiz');
  }

  function renderQuestion() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    const q = content.questions[currentIndex];
    selectedIndices = new Set();

    document.getElementById('co-progress-msg').textContent =
      `Question ${currentIndex + 1} / ${content.questions.length}`;

    const enonceEl = document.getElementById('co-question-enonce');
    enonceEl.innerHTML = '';
    const enonceText = document.createElement('span');
    enonceText.textContent = q.enonce;
    enonceEl.appendChild(enonceText);
    if (speechEnabled) attachSpeechButton(enonceEl, q.enonce);

    const list = document.getElementById('co-choices-list');
    const libreWrap = document.getElementById('co-libre-wrap');
    const nextBtn = document.getElementById('co-next-btn');

    if (q.type_question === 'reponse_libre') {
      list.style.display = 'none';
      list.innerHTML = '';
      libreWrap.style.display = '';
      libreWrap.innerHTML = `<input type="text" class="qz-form-input" id="co-libre-input" placeholder="Ta réponse" autocomplete="off">`;
      const input = document.getElementById('co-libre-input');
      input.addEventListener('input', () => {
        nextBtn.disabled = !input.value.trim();
      });
      input.focus();
      nextBtn.disabled = true;
    } else {
      libreWrap.style.display = 'none';
      libreWrap.innerHTML = '';
      list.style.display = '';
      list.innerHTML = q.propositions.map((texte, i) => `
        <div class="qz-choice-row">
          <button type="button" class="qz-choice-btn" data-idx="${i}">
            <span class="qz-choice-mark"></span><span>${escHtml(texte)}</span>
          </button>
        </div>
      `).join('');
      if (speechEnabled) {
        list.querySelectorAll('.qz-choice-row').forEach((row, i) => attachSpeechButton(row, q.propositions[i]));
      }
      list.querySelectorAll('.qz-choice-btn').forEach(btn => btn.addEventListener('click', () => {
        const idx = +btn.dataset.idx;
        if (selectedIndices.has(idx)) {
          selectedIndices.delete(idx);
          btn.classList.remove('is-selected');
        } else {
          selectedIndices.add(idx);
          btn.classList.add('is-selected');
        }
        nextBtn.disabled = selectedIndices.size === 0;
      }));
      nextBtn.disabled = true;
    }

    nextBtn.textContent = currentIndex === content.questions.length - 1 ? 'Valider mes réponses' : 'Question suivante';
  }

  async function onNext() {
    const q = content.questions[currentIndex];
    if (q.type_question === 'reponse_libre') {
      const input = document.getElementById('co-libre-input');
      answersGiven.push({ question_id: q.id, reponse_texte: input ? input.value : '' });
    } else {
      answersGiven.push({ question_id: q.id, reponse_indices: Array.from(selectedIndices) });
    }

    if (currentIndex < content.questions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      await finishQuiz();
    }
  }

  async function finishQuiz() {
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

    document.getElementById('co-page-title').textContent = detail.comprehension_orale.titre_episode;
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

  /* ── Init ── */
  async function init() {
    const session = await lfmAuth.getSession();
    if (!session) return showError('Connecte-toi pour accéder à la compréhension orale.');

    const student = await lfmAuth.getMyStudentRecord();
    speechEnabled = !!(student && student.est_dyslexique);

    document.getElementById('co-next-btn').addEventListener('click', onNext);
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

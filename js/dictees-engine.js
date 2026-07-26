/* ─────────────────────────────────────────────────────────────────────────────
   dictees-engine.js — Parcours élève d'une dictée préparée (dictee.html).

   Deux exercices successifs sur les mots difficiles de la dictée :
     1. Capsule sonore  — chaque mot est dicté une fois, l'élève l'écrit.
     2. Répétition      — les mots reviennent, mélangés, jusqu'à ce que
        CHAQUE mot ait été écrit correctement au moins une fois (les mots
        ratés reviennent dans le tirage).

   Progression persistée en sessionStorage (postes de classe partagés — la
   BDD n'est écrite qu'à la fin de chaque exercice, jamais comme source de
   la progression en cours). Dépend de : supabase-client.js (window.lfmDb),
   auth.js (lfmAuth), dictees-speech.js (DicteesSpeech), breadcrumb.js.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesEngine = (() => {
  let dictee = null;
  let allMots = [];  // tous les mots de la dictée, non filtrés
  let mots = [];      // mots effectivement travaillés (filtrés selon le niveau choisi)
  let studentId = null;
  let state = null;
  let exStartTime = null;

  /* Scopée par dictée ET par élève : sessionStorage n'est jamais vidée à la
     déconnexion (postes de classe partagés, un même onglet peut enchaîner
     plusieurs comptes élève) — sans studentId dans la clé, un élève pouvait
     hériter la progression (voire le résultat final) laissée par le
     précédent sur la même dictée dans le même onglet. */
  function storageKey(id) { return `dictee_${id}_${studentId}_progress`; }

  function loadState(id) {
    try { return JSON.parse(sessionStorage.getItem(storageKey(id)) || 'null'); }
    catch { return null; }
  }
  function saveState() {
    sessionStorage.setItem(storageKey(dictee.id), JSON.stringify(state));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function motById(id) { return mots.find(m => m.id === id); }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function freshState(niveauChoisi) {
    return {
      niveauChoisi,
      step: 1,
      ex1: { order: shuffle(mots.map(m => m.id)), index: 0, correct: 0, attempts: 0, wrongIds: [], submitted: false },
      ex2: null
    };
  }

  /* L'élève choisit librement son niveau (1/2/3) au démarrage de la dictée
     (écran dic-state-niveau-choice, voir showNiveauChoice) — pas de
     déblocage séquentiel ni de score minimum, contrairement à LevelSelect
     (js/level-select.js) : ce n'est pas une progression à valider, juste un
     filtre de contenu que l'élève ajuste lui-même à chaque tentative.
     Filtrage CUMULATIF : Niveau 2 = mots tagués 1 ET 2 (jamais 3) ; Niveau 3
     = tous les mots. Repli sur la liste complète si ce filtrage ne laisse
     aucun mot dans cette dictée précise (jamais d'exercice vide). */
  function filterByChosenNiveau(allMotsToFilter, niveauChoisi) {
    const filtered = allMotsToFilter.filter(m => m.niveau <= niveauChoisi);
    return filtered.length > 0 ? filtered : allMotsToFilter;
  }

  /* ── Chargement ──────────────────────────────────────────────────────── */
  async function init() {
    const dicteeId = new URLSearchParams(window.location.search).get('id');
    if (!dicteeId) return showError();

    const session = await lfmAuth.getSession();
    if (!session) return showError("Connecte-toi pour faire cette dictée.");
    studentId = session.user.id;

    try {
      const { data: d, error: dErr } = await window.lfmDb
        .from('dictees').select('*').eq('id', dicteeId).single();
      if (dErr || !d) throw dErr || new Error('Dictée introuvable');

      const { data: m, error: mErr } = await window.lfmDb
        .from('dictee_mots').select('*').eq('dictee_id', dicteeId).order('ordre', { ascending: true });
      if (mErr) throw mErr;
      if (!m || m.length === 0) throw new Error('Aucun mot');

      dictee = d;
      allMots = m;
    } catch (e) {
      return showError();
    }

    document.title = dictee.titre + ' — Dictée préparée — LFM';
    document.getElementById('dic-title').textContent = dictee.titre;
    /* setCurrent(), pas render() : dictee.html a déjà rendu le fil d'Ariane
       une fois (placeholder "Chargement…") — un second render() créerait
       une deuxième barre au lieu de mettre à jour la première. */
    if (typeof Breadcrumb !== 'undefined') Breadcrumb.setCurrent(dictee.titre);

    /* Reprise d'une dictée déjà commencée : le niveau choisi fait partie de
       l'état persisté, on ne le redemande pas (le reste de l'état — par ex.
       ex1.order, une liste d'ids — en dépend directement). Nouvelle dictée :
       écran de choix systématique. */
    const saved = loadState(dictee.id);
    if (saved && saved.niveauChoisi) {
      mots = filterByChosenNiveau(allMots, saved.niveauChoisi);
      state = saved;
      exStartTime = Date.now();
      render();
    } else {
      showNiveauChoice();
    }
  }

  /* ── Choix libre du niveau ───────────────────────────────────────────── */
  function showNiveauChoice() {
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-niveau-choice').style.display = '';
    document.getElementById('dic-niveau-choice-grid').innerHTML = [1, 2, 3].map(n => `
      <button type="button" class="dic-niveau-choice-btn" data-niveau="${n}">
        <span class="ls-pastille" style="--ls-color:var(--ls-color-${n})">Niveau ${n}</span>
      </button>
    `).join('');
    document.querySelectorAll('.dic-niveau-choice-btn').forEach(btn =>
      btn.addEventListener('click', () => chooseNiveau(parseInt(btn.dataset.niveau, 10)))
    );
  }

  function chooseNiveau(niveauChoisi) {
    mots = filterByChosenNiveau(allMots, niveauChoisi);
    document.getElementById('dic-state-niveau-choice').style.display = 'none';
    state = freshState(niveauChoisi);
    exStartTime = Date.now();
    saveState();
    render();
  }

  function showError(msg) {
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-error').style.display = '';
    if (msg) document.querySelector('#dic-state-error p').textContent = msg;
  }

  /* ── Rendu général ───────────────────────────────────────────────────── */
  function renderStepBanner() {
    const banner = document.getElementById('dic-step-banner');
    banner.innerHTML = [1, 2].map(n => {
      const cls = n < state.step ? 'dic-step--done' : n === state.step ? 'dic-step--active' : '';
      const label = n === 1 ? '1. Capsule sonore' : '2. Jusqu’à la maîtrise';
      return `<span class="dic-step ${cls}">${label}</span>`;
    }).join('') + `<span class="ls-pastille" style="--ls-color:var(--ls-color-${state.niveauChoisi})">Niveau ${state.niveauChoisi}</span>`;
  }

  function render() {
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-error').style.display = 'none';
    renderStepBanner();
    if (state.step === 1) renderExercice1();
    else renderExercice2();
  }

  function renderListenAndInputHTML(counterHTML) {
    return `
      ${counterHTML}
      <div class="dic-listen-row">
        <button type="button" class="dic-listen-btn" id="dic-listen-btn">🔊 Réécouter</button>
      </div>
      <div class="dic-input-row">
        <input type="text" class="dic-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Écris ce que tu entends…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
  }

  function wireItem(mot, onValidate) {
    document.getElementById('dic-listen-btn').addEventListener('click', () => speakCurrent(mot.contenu));
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    document.getElementById('dic-input').addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    speakCurrent(mot.contenu);
    setTimeout(() => document.getElementById('dic-input')?.focus(), 80);
  }

  function speakCurrent(text) {
    const btn = document.getElementById('dic-listen-btn');
    if (btn) btn.disabled = true;
    DicteesSpeech.speak(text, () => { if (btn) btn.disabled = false; });
  }

  function lockItem() {
    document.getElementById('dic-input').disabled = true;
    document.getElementById('dic-val-btn').disabled = true;
    document.getElementById('dic-listen-btn').disabled = true;
  }

  /* ── Exercice 1 : capsule sonore ─────────────────────────────────────── */
  function renderExercice1() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    document.getElementById('dic-intro-consigne').textContent =
      'Écoute chaque mot ou groupe de mots, puis écris ce que tu entends.';

    if (state.ex1.index >= state.ex1.order.length) {
      showExercice1Results();
      if (!state.ex1.submitted) {
        state.ex1.submitted = true;
        saveState();
        submitResult(1, state.ex1.correct, state.ex1.order.length, false,
          Math.round((Date.now() - exStartTime) / 1000), state.ex1.attempts, state.ex1.wrongIds);
      }
      return;
    }

    const mot = motById(state.ex1.order[state.ex1.index]);
    document.getElementById('dic-item').innerHTML = renderListenAndInputHTML(
      `<div class="dic-counters"><div class="dic-word-count">Mot ${state.ex1.index + 1} / ${state.ex1.order.length}</div></div>`
    );
    wireItem(mot, () => validateExercice1(mot));
  }

  function validateExercice1(mot) {
    const input = document.getElementById('dic-input');
    if (!input || !input.value.trim() || input.disabled) return;

    const typed = input.value;
    const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
    lockItem();
    state.ex1.attempts++;

    if (isRight) {
      state.ex1.correct++;
      input.classList.add('is-correct');
      document.getElementById('dic-feedback').innerHTML =
        `<div class="dic-feedback-correct">✅ ${escapeHtml(mot.contenu)}</div>`;
    } else {
      state.ex1.wrongIds.push(mot.id);
      input.classList.add('is-wrong');
      document.getElementById('dic-feedback').innerHTML = `
        <div class="dic-feedback-wrong">
          Ça s'écrit : <span class="dic-correct-word">${DicteesSpeech.diffHighlight(mot.contenu, typed)}</span>
        </div>`;
    }

    state.ex1.index++;
    saveState();
    setTimeout(render, isRight ? 900 : 2200);
  }

  function showExercice1Results() {
    const total = state.ex1.order.length;
    const score = state.ex1.correct;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = 'Capsule sonore terminée !';
    document.getElementById('dic-final-detail').textContent =
      `${score} mot${score !== 1 ? 's' : ''} juste${score !== 1 ? 's' : ''} du premier coup sur ${total}.`;
    document.getElementById('dic-final-actions').innerHTML =
      `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers l'exercice 2 →</button>`;
    document.getElementById('dic-next-ex-btn').addEventListener('click', startExercice2);
  }

  /* ── Exercice 2 : répétition jusqu'à maîtrise ────────────────────────── */
  function startExercice2() {
    const ids = mots.map(m => m.id);
    state.step = 2;
    state.ex2 = {
      unmastered: ids,
      deck: shuffle(ids),
      current: null,
      correct: 0,
      attempts: 0,
      wrongIds: [],
      wrongAny: false,
      submitted: false
    };
    exStartTime = Date.now();
    saveState();
    render();
  }

  function drawNextExercice2() {
    if (state.ex2.deck.length === 0) state.ex2.deck = shuffle(state.ex2.unmastered);
    state.ex2.current = state.ex2.deck.shift();
  }

  function renderExercice2() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    document.getElementById('dic-intro-consigne').textContent =
      "Écris chaque mot correctement au moins une fois. Les mots ratés reviennent jusqu'à réussite !";

    if (state.ex2.unmastered.length === 0) {
      showExercice2Results();
      if (!state.ex2.submitted) {
        state.ex2.submitted = true;
        saveState();
        submitResult(2, state.ex2.correct, mots.length, !state.ex2.wrongAny,
          Math.round((Date.now() - exStartTime) / 1000), state.ex2.attempts, state.ex2.wrongIds);
      }
      return;
    }
    if (state.ex2.current == null) { drawNextExercice2(); saveState(); }

    const mot = motById(state.ex2.current);
    const remaining = state.ex2.unmastered.length;
    document.getElementById('dic-item').innerHTML = renderListenAndInputHTML(
      `<div class="dic-counters"><div class="dic-word-count">Il reste ${remaining} mot${remaining !== 1 ? 's' : ''} à maîtriser</div></div>`
    );
    wireItem(mot, () => validateExercice2(mot));
  }

  function validateExercice2(mot) {
    const input = document.getElementById('dic-input');
    if (!input || !input.value.trim() || input.disabled) return;

    const typed = input.value;
    const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
    lockItem();
    state.ex2.attempts++;

    if (isRight) {
      state.ex2.correct++;
      state.ex2.unmastered = state.ex2.unmastered.filter(id => id !== mot.id);
      state.ex2.deck = state.ex2.deck.filter(id => id !== mot.id);
      input.classList.add('is-correct');
      document.getElementById('dic-feedback').innerHTML =
        `<div class="dic-feedback-correct">✅ ${escapeHtml(mot.contenu)}</div>`;
    } else {
      state.ex2.wrongAny = true;
      if (!state.ex2.wrongIds.includes(mot.id)) state.ex2.wrongIds.push(mot.id);
      input.classList.add('is-wrong');
      document.getElementById('dic-feedback').innerHTML = `
        <div class="dic-feedback-wrong">
          Ça s'écrit : <span class="dic-correct-word">${DicteesSpeech.diffHighlight(mot.contenu, typed)}</span>. Ce mot reviendra plus tard.
        </div>`;
    }

    state.ex2.current = null;
    saveState();
    setTimeout(render, isRight ? 900 : 2200);
  }

  function showExercice2Results() {
    const total = mots.length;
    const sansFaute = !state.ex2.wrongAny;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = sansFaute
      ? '🌟 Dictée réussie sans aucune faute !'
      : 'Dictée terminée, tous les mots sont maîtrisés !';
    document.getElementById('dic-final-detail').textContent =
      `${total} mot${total !== 1 ? 's' : ''} maîtrisé${total !== 1 ? 's' : ''}.`;
    document.getElementById('dic-final-actions').innerHTML =
      `<a href="français-orthographe.html" class="dic-card-btn" style="width:auto;padding:12px 28px;">← Retour à l'Orthographe</a>`;
  }

  /* ── Enregistrement du résultat ──────────────────────────────────────── */
  async function submitResult(exercice, score, total, sansFaute, durationSecs, attempts, wrongMotIds) {
    if (!studentId || !window.lfmDb) return;
    const { error } = await window.lfmDb.from('dictee_results').insert({
      student_id: studentId,
      dictee_id: dictee.id,
      exercice,
      score,
      total,
      sans_faute: sansFaute,
      duration_secs: durationSecs,
      attempts: attempts,
      wrong_mot_ids: wrongMotIds || []
    });
    if (error) console.warn('[LFM] DicteesEngine.submitResult:', error.message);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => DicteesEngine.init());

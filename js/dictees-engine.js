/* ─────────────────────────────────────────────────────────────────────────────
   dictees-engine.js — Parcours élève d'une dictée préparée (dictee.html).

   Trois paliers successifs sur les mots difficiles de la dictée (state.step
   vaut 0, 0.5 ou 1 — la valeur 1 ne bouge pas, pour rester compatible avec
   dictee_results.exercice) :
     0.   Photographie le mot — le mot s'affiche en grand puis disparaît
          complètement, l'élève l'écrit de mémoire. Correction automatique
          (DicteesSpeech.normalize, comme les autres paliers) : la saisie et
          le mot correct restent affichés côte à côte, mais c'est le site qui
          tranche juste/faux, jamais l'élève. Les mots ratés reviennent plus
          tard dans le tirage, jamais juste après.
     0.5. Effacement progressif — le mot est affiché à trous (lettres tirées
          au hasard à chaque passage, jamais les mêmes positions) : passage 1
          ≈25 % de lettres masquées, passage 2 ≈60 %. Pas d'audio dans ce
          palier (retiré pour ne pas faire doublon avec le palier 1, qui est
          déjà une dictée audio). Correction automatique comme au palier 0.
          Par mot : une réussite fait progresser d'un passage (jusqu'à
          maîtrisé au passage 2), un échec fait redescendre d'un passage
          (jamais retiré, jamais retenté au même passage juste après —
          même mécanique de tirage differé que le palier 1 : mot raté exclu
          du prochain tirage seulement, jamais retenté immédiatement).
     1.   Dictée audio à correction retardée — lots de LOT_SIZE mots dictés
          (TTS) sans aucun retour pendant le lot. À la fin du lot : bilan
          "X/Y", un unique repêchage (réécoute possible, mais sans indice
          visuel) pour les mots ratés, puis révélation de l'orthographe pour
          ceux encore faux. Comme les autres
          paliers la correction est automatique (DicteesSpeech.normalize),
          seulement différée à la fin du lot. Un mot encore faux après
          repêchage réapparaît dans un lot ultérieur (jamais le suivant
          immédiat). Dernier palier du parcours : son écran de fin
          (showExercice1Results) est l'écran de fin du module entier.

   Le palier 0 et 0.5 sont purement formatifs : aucune écriture en base (voir
   submitResult, appelé uniquement pour l'exercice 1 ci-dessus).

   Progression persistée en sessionStorage (postes de classe partagés — la
   BDD n'est écrite qu'à la fin de l'exercice 1, jamais comme source de la
   progression en cours). Dépend de : supabase-client.js (window.lfmDb),
   auth.js (lfmAuth), dictees-speech.js (DicteesSpeech), breadcrumb.js.

   SCHEMA_VERSION : la forme/les règles de `state` ont changé plusieurs fois
   (dernier changement : palier "dictée finale" — state.step 2, `ex2` — retiré
   entièrement du parcours ; une session sauvegardée sous l'ancien schéma
   pourrait encore avoir step=2). Toute session sessionStorage sauvegardée
   sous un schéma différent est ignorée au chargement (redémarrage propre sur
   l'écran de choix du niveau) plutôt que de risquer un état incohérent — à
   bumper à chaque futur changement de forme/règles de state.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesEngine = (() => {
  const LOT_SIZE = 5;        // nb de mots par lot pour le palier 1 (dictée audio à correction retardée)
  const SCHEMA_VERSION = 6;  // voir note ci-dessus

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
    const ids = mots.map(m => m.id);
    return {
      niveauChoisi,
      step: 0,
      /* Mécanique de tirage differé (deck mélangé, unmastered = mots pas
         encore réussis, réutilisée par les autres paliers) : un mot raté
         reste hors du deck courant et ne revient qu'au réapprovisionnement
         (mélange des mots restants), donc jamais immédiatement après. Pas de
         champ submitted/wrongAny : ce palier n'écrit jamais en base (voir
         en-tête du fichier). */
      ex0: {
        unmastered: ids,
        deck: shuffle(ids),
        current: null,
        phase: 'photo',   // 'photo' (mot affiché) → 'input' (saisie, correction automatique)
        correct: 0,
        attempts: 0,
        wrongIds: []
      },
      ex05: null,
      ex1: null,
      schemaVersion: SCHEMA_VERSION
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
       l'état persisté, on ne le redemande pas (le reste de l'état — les ids
       de mots par palier — en dépend directement). saved.schemaVersion
       différent de SCHEMA_VERSION (ou absent, anciennes sessions) : la forme
       de `state` a changé depuis, on ignore la sauvegarde plutôt que de
       risquer un crash sur des champs disparus (voir note SCHEMA_VERSION en
       en-tête de fichier). Nouvelle dictée ou schéma périmé : écran de choix
       systématique. */
    const saved = loadState(dictee.id);
    if (saved && saved.niveauChoisi && saved.schemaVersion === SCHEMA_VERSION) {
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
    banner.innerHTML = [0, 0.5, 1].map(n => {
      const cls = n < state.step ? 'dic-step--done' : n === state.step ? 'dic-step--active' : '';
      const label = n === 0 ? 'Photographie le mot'
        : n === 0.5 ? 'Effacement progressif'
        : 'Dictée audio';
      return `<span class="dic-step ${cls}">${label}</span>`;
    }).join('') + `<span class="ls-pastille" style="--ls-color:var(--ls-color-${state.niveauChoisi})">Niveau ${state.niveauChoisi}</span>`;
  }

  function render() {
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-error').style.display = 'none';
    renderStepBanner();
    if (state.step === 0) renderExercice0();
    else if (state.step === 0.5) renderPalier05();
    else renderExercice1();
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

  /* ── Exercice 0 : photographie le mot ────────────────────────────────── */
  function drawNextExercice0() {
    if (state.ex0.deck.length === 0) state.ex0.deck = shuffle(state.ex0.unmastered);
    state.ex0.current = state.ex0.deck.shift();
    state.ex0.phase = 'photo';
  }

  function renderExercice0() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    document.getElementById('dic-intro-consigne').textContent =
      "Observe bien le mot affiché : il va disparaître. Écris-le ensuite de mémoire — la correction est automatique.";

    if (state.ex0.unmastered.length === 0) {
      showExercice0Results();
      return;
    }
    if (state.ex0.current == null) { drawNextExercice0(); saveState(); }

    const mot = motById(state.ex0.current);
    const remaining = state.ex0.unmastered.length;
    const counterHTML = `<div class="dic-counters"><div class="dic-word-count">Il reste ${remaining} mot${remaining !== 1 ? 's' : ''} à photographier</div></div>`;

    if (state.ex0.phase === 'photo') {
      document.getElementById('dic-item').innerHTML = `
        ${counterHTML}
        <div class="dic-flash-wrap"><div class="dic-flash-word">${escapeHtml(mot.contenu)}</div></div>
      `;
      /* ~1,5 s de base + 0,3 s par caractère (espaces compris, un groupe de
         mots comme "les enfants jouaient" doit rester lisible plus longtemps
         qu'un seul mot court). */
      const displayMs = Math.round((1.5 + 0.3 * mot.contenu.length) * 1000);
      setTimeout(() => {
        if (state.ex0.current === mot.id && state.ex0.phase === 'photo') {
          state.ex0.phase = 'input';
          saveState();
          render();
        }
      }, displayMs);
      return;
    }

    /* phase === 'input' : correction automatique (DicteesSpeech.normalize,
       même comparaison que pour l'exercice 1) — le site tranche juste/faux,
       jamais l'élève. */
    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      <div class="dic-input-row">
        <input type="text" class="dic-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Écris le mot de mémoire…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
    const input = document.getElementById('dic-input');
    const onValidate = () => {
      if (!input || !input.value.trim() || input.disabled) return;
      const typed = input.value;
      const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
      input.disabled = true;
      document.getElementById('dic-val-btn').disabled = true;
      input.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.ex0.attempts++;

      if (isRight) {
        state.ex0.correct++;
        state.ex0.unmastered = state.ex0.unmastered.filter(id => id !== mot.id);
        state.ex0.deck = state.ex0.deck.filter(id => id !== mot.id);
      } else if (!state.ex0.wrongIds.includes(mot.id)) {
        state.ex0.wrongIds.push(mot.id);
      }

      /* Uniquement le verdict automatique : la saisie de l'élève reste
         visible juste au-dessus dans le champ, jamais répétée ici. */
      document.getElementById('dic-feedback').innerHTML = isRight
        ? '<div class="dic-feedback-correct">✅ Correct</div>'
        : `<div class="dic-feedback-wrong">❌ Incorrect — le mot correct est <span class="dic-correct-word">${escapeHtml(mot.contenu)}</span></div>`;
      state.ex0.current = null;
      saveState();
      setTimeout(render, isRight ? 900 : 2200);
    };
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    setTimeout(() => document.getElementById('dic-input')?.focus(), 80);
  }

  function showExercice0Results() {
    const total = mots.length;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = 'Photographie terminée !';
    document.getElementById('dic-final-detail').textContent =
      `${total} mot${total !== 1 ? 's' : ''} mémorisé${total !== 1 ? 's' : ''}.`;
    document.getElementById('dic-final-actions').innerHTML =
      `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers l'effacement progressif →</button>`;
    document.getElementById('dic-next-ex-btn').addEventListener('click', startPalier05);
  }

  /* ── Palier 0.5 : effacement progressif ──────────────────────────────── */
  /* Fraction de lettres masquées par passage (1 → 2, maîtrisé après le 2).
     Seules les lettres comptent (espaces, apostrophes, traits d'union
     toujours visibles) : sur un groupe comme "les enfants jouaient", le
     découpage en mots reste un repère constant, seule l'orthographe des
     lettres est à retrouver. */
  function maskFraction(passage) {
    return passage === 1 ? 0.25 : 0.6;
  }

  function computeMaskIndices(word, passage) {
    const letterPositions = [];
    for (let i = 0; i < word.length; i++) {
      if (/\p{L}/u.test(word[i])) letterPositions.push(i);
    }
    const count = Math.round(maskFraction(passage) * letterPositions.length);
    return shuffle(letterPositions).slice(0, count);
  }

  function renderMaskedWord(word, maskIndices) {
    const masked = new Set(maskIndices);
    return word.split('').map((ch, i) => masked.has(i) ? '_' : ch).join('');
  }

  function startPalier05() {
    const ids = mots.map(m => m.id);
    state.step = 0.5;
    state.ex05 = {
      unmastered: ids,
      deck: shuffle(ids),
      current: null,
      levels: Object.fromEntries(ids.map(id => [id, 1])),  // passage courant (1-3) par mot
      maskIndices: [],
      correct: 0,
      attempts: 0,
      wrongIds: []
    };
    exStartTime = Date.now();
    saveState();
    render();
  }

  function drawNextPalier05() {
    if (state.ex05.deck.length === 0) state.ex05.deck = shuffle(state.ex05.unmastered);
    state.ex05.current = state.ex05.deck.shift();
    state.ex05.maskIndices = computeMaskIndices(motById(state.ex05.current).contenu, state.ex05.levels[state.ex05.current]);
  }

  function renderPalier05() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    document.getElementById('dic-intro-consigne').textContent =
      "Complète le mot à trous. Il y aura de moins en moins d'indices à chaque passage. La correction est automatique.";

    if (state.ex05.unmastered.length === 0) {
      showPalier05Results();
      return;
    }
    if (state.ex05.current == null) { drawNextPalier05(); saveState(); }

    const mot = motById(state.ex05.current);
    const passage = state.ex05.levels[mot.id];
    const remaining = state.ex05.unmastered.length;
    const counterHTML = `
      <div class="dic-counters">
        <div class="dic-word-count">Il reste ${remaining} mot${remaining !== 1 ? 's' : ''} à maîtriser</div>
        <div class="dic-passage-badge">Passage ${passage} / 2</div>
      </div>`;

    const hintHTML = `<div class="dic-flash-wrap"><div class="dic-flash-word dic-mask-word">${escapeHtml(renderMaskedWord(mot.contenu, state.ex05.maskIndices))}</div></div>`;

    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      ${hintHTML}
      <div class="dic-input-row">
        <input type="text" class="dic-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Complète le mot…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
    const input = document.getElementById('dic-input');
    /* Correction automatique (DicteesSpeech.normalize, comme au palier 0) :
       le site tranche et fait progresser/reculer le mot entre les 2 passages
       — maîtrisé (retiré du tirage) dès la réussite au passage 2. */
    const onValidate = () => {
      if (!input || !input.value.trim() || input.disabled) return;
      const typed = input.value;
      const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
      input.disabled = true;
      document.getElementById('dic-val-btn').disabled = true;
      input.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.ex05.attempts++;

      if (isRight) {
        state.ex05.correct++;
        if (passage >= 2) {
          state.ex05.unmastered = state.ex05.unmastered.filter(id => id !== mot.id);
          state.ex05.deck = state.ex05.deck.filter(id => id !== mot.id);
        } else {
          state.ex05.levels[mot.id] = passage + 1;
        }
      } else {
        if (!state.ex05.wrongIds.includes(mot.id)) state.ex05.wrongIds.push(mot.id);
        state.ex05.levels[mot.id] = Math.max(1, passage - 1);
      }

      /* Écran de correction : uniquement le verdict automatique, la saisie de
         l'élève reste visible juste au-dessus dans le champ (pas de doublon
         "Tu as écrit"). */
      document.getElementById('dic-feedback').innerHTML = isRight
        ? '<div class="dic-feedback-correct">✅ Correct</div>'
        : `<div class="dic-feedback-wrong">❌ Incorrect — le mot correct est <span class="dic-correct-word">${escapeHtml(mot.contenu)}</span></div>`;
      state.ex05.current = null;
      saveState();
      setTimeout(render, isRight ? 900 : 2200);
    };
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    setTimeout(() => document.getElementById('dic-input')?.focus(), 80);
  }

  function showPalier05Results() {
    const total = mots.length;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = 'Effacement progressif terminé !';
    document.getElementById('dic-final-detail').textContent =
      `${total} mot${total !== 1 ? 's' : ''} maîtrisé${total !== 1 ? 's' : ''}.`;
    document.getElementById('dic-final-actions').innerHTML =
      `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers l'exercice 1 →</button>`;
    document.getElementById('dic-next-ex-btn').addEventListener('click', startExercice1);
  }

  /* ── Exercice 1 : dictée audio à correction retardée ─────────────────── */
  /* Recyclage adapté (pas de deck/shift comme ex0/ex05, remplacé par un
     tirage direct filtré+mélangé à chaque lot) : `unmastered` = mots jamais
     réussis (1er passage ou repêchage) ; `coolingDown` = mots ratés du lot
     qui vient de se terminer, exclus du tirage du PROCHAIN lot seulement
     (jamais retiré, jamais dans le lot immédiatement suivant). */
  function formLotExercice1() {
    const excluded = new Set(state.ex1.coolingDown);
    let pool = state.ex1.unmastered.filter(id => !excluded.has(id));
    if (pool.length === 0) pool = state.ex1.unmastered.slice(); // repli : il ne reste que des mots en "repos"
    pool = shuffle(pool);
    state.ex1.lot = pool.slice(0, Math.min(LOT_SIZE, pool.length));
    state.ex1.lotIndex = 0;
    state.ex1.answers = {};
    state.ex1.firstTryWrong = [];
    state.ex1.repechageIndex = 0;
    state.ex1.stillWrong = [];
    state.ex1.phase = 'dictate';
  }

  function startExercice1() {
    state.step = 1;
    state.ex1 = {
      unmastered: mots.map(m => m.id),
      coolingDown: [],
      lot: [],
      lotIndex: 0,
      phase: 'dictate',   // 'dictate' (lot en cours) → 'recap' (bilan) → 'repechage' → 'reveal'
      answers: {},        // { [motId]: dernière saisie }, pour le récap/reveal du lot courant
      firstTryWrong: [],  // ids ratés au 1er passage de ce lot (candidats au repêchage)
      repechageIndex: 0,
      stillWrong: [],      // ids encore faux après repêchage (pour 'reveal')
      correctFirstTry: 0,  // stats cumulées sur toute la durée du palier
      attempts: 0,
      wrongIds: [],
      submitted: false
    };
    formLotExercice1();
    exStartTime = Date.now();
    saveState();
    render();
  }

  function renderExercice1() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';

    if (state.ex1.unmastered.length === 0) {
      showExercice1Results();
      if (!state.ex1.submitted) {
        state.ex1.submitted = true;
        saveState();
        submitResult(1, state.ex1.correctFirstTry, mots.length, false,
          Math.round((Date.now() - exStartTime) / 1000), state.ex1.attempts, state.ex1.wrongIds);
      }
      return;
    }

    if (state.ex1.phase === 'dictate') return renderLotDictate();
    if (state.ex1.phase === 'recap') return renderLotRecap();
    if (state.ex1.phase === 'repechage') return renderLotRepechage();
    return renderLotReveal();
  }

  function renderLotDictate() {
    document.getElementById('dic-intro-consigne').textContent =
      "Écoute et écris chaque mot du lot. Pas de correction pendant le lot : le bilan arrive à la fin.";

    const mot = motById(state.ex1.lot[state.ex1.lotIndex]);
    document.getElementById('dic-item').innerHTML = renderListenAndInputHTML(
      `<div class="dic-counters"><div class="dic-word-count">Mot ${state.ex1.lotIndex + 1} / ${state.ex1.lot.length} du lot</div></div>`
    );
    wireItem(mot, () => validateLotDictate(mot));
  }

  function validateLotDictate(mot) {
    const input = document.getElementById('dic-input');
    if (!input || !input.value.trim() || input.disabled) return;

    const typed = input.value;
    const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
    state.ex1.attempts++;
    state.ex1.answers[mot.id] = typed;

    if (isRight) {
      state.ex1.correctFirstTry++;
    } else {
      state.ex1.firstTryWrong.push(mot.id);
      if (!state.ex1.wrongIds.includes(mot.id)) state.ex1.wrongIds.push(mot.id);
    }

    state.ex1.lotIndex++;
    if (state.ex1.lotIndex >= state.ex1.lot.length) state.ex1.phase = 'recap';
    saveState();
    render();
  }

  function renderLotRecap() {
    document.getElementById('dic-intro-consigne').textContent = 'Voici ton bilan sur ce lot.';
    const total = state.ex1.lot.length;
    const score = total - state.ex1.firstTryWrong.length;
    document.getElementById('dic-item').innerHTML = `
      <div class="dic-final-message" style="margin-top:4px;">Lot terminé : ${score} / ${total}</div>
      <div class="dic-actions" style="margin-top:18px;">
        <button type="button" class="dic-card-btn" id="dic-lot-continue-btn" style="width:auto;padding:12px 28px;">Continuer →</button>
      </div>
    `;
    document.getElementById('dic-lot-continue-btn').addEventListener('click', () => {
      if (state.ex1.firstTryWrong.length > 0) {
        state.ex1.phase = 'repechage';
        saveState();
        render();
      } else {
        finishLotExercice1();
      }
    });
  }

  /* Réécoute possible pendant le repêchage (bouton + auto-play, comme au
     passage "dictée" du lot via wireItem/renderListenAndInputHTML) : sans
     ça l'élève n'a aucun moyen de savoir quel mot réécrire. Le reste est
     inchangé : une seule tentative, puis révélation si encore faux. */
  function renderLotRepechage() {
    document.getElementById('dic-intro-consigne').textContent =
      'Dernière chance pour les mots ratés : réécoute et réécris-les.';

    const mot = motById(state.ex1.firstTryWrong[state.ex1.repechageIndex]);
    document.getElementById('dic-item').innerHTML = renderListenAndInputHTML(
      `<div class="dic-counters"><div class="dic-word-count">Repêchage ${state.ex1.repechageIndex + 1} / ${state.ex1.firstTryWrong.length}</div></div>`
    );
    wireItem(mot, () => validateRepechage(mot));
  }

  function validateRepechage(mot) {
    const input = document.getElementById('dic-input');
    if (!input || !input.value.trim() || input.disabled) return;

    const typed = input.value;
    state.ex1.attempts++;
    state.ex1.answers[mot.id] = typed;
    if (DicteesSpeech.normalize(typed) !== DicteesSpeech.normalize(mot.contenu)) {
      state.ex1.stillWrong.push(mot.id);
    }
    state.ex1.repechageIndex++;

    if (state.ex1.repechageIndex < state.ex1.firstTryWrong.length) {
      saveState();
      render();
      return;
    }
    if (state.ex1.stillWrong.length > 0) {
      state.ex1.phase = 'reveal';
      saveState();
      render();
    } else {
      finishLotExercice1();
    }
  }

  function renderLotReveal() {
    document.getElementById('dic-intro-consigne').textContent =
      "Voici l'orthographe correcte des mots encore ratés après le repêchage.";
    /* Uniquement l'orthographe correcte (avec les lettres fautives mises en
       évidence) : tous les mots listés ici sont déjà connus comme ratés, pas
       besoin de répéter la saisie de l'élève (déjà vue pendant le lot/le
       repêchage). */
    const rows = state.ex1.stillWrong.map(id => {
      const mot = motById(id);
      const typed = state.ex1.answers[id] || '';
      return `
        <div class="dic-feedback-area" style="margin-bottom:14px;">
          <div class="dic-feedback-wrong">❌ La bonne orthographe : <span class="dic-correct-word">${DicteesSpeech.diffHighlight(mot.contenu, typed)}</span></div>
        </div>`;
    }).join('');
    document.getElementById('dic-item').innerHTML = `
      ${rows}
      <div class="dic-actions" style="margin-top:8px;">
        <button type="button" class="dic-card-btn" id="dic-lot-continue-btn" style="width:auto;padding:12px 28px;">Continuer →</button>
      </div>
    `;
    document.getElementById('dic-lot-continue-btn').addEventListener('click', finishLotExercice1);
  }

  /* Clôture le lot courant : les mots non retenus dans `stillWrong` sont
     maîtrisés (réussis au 1er passage ou au repêchage) et sortent du tirage ;
     les mots encore faux restent dans `unmastered` et passent en
     `coolingDown` (exclus du prochain lot uniquement). */
  function finishLotExercice1() {
    const masteredThisLot = state.ex1.lot.filter(id => !state.ex1.stillWrong.includes(id));
    state.ex1.unmastered = state.ex1.unmastered.filter(id => !masteredThisLot.includes(id));
    state.ex1.coolingDown = state.ex1.stillWrong.slice();
    if (state.ex1.unmastered.length > 0) formLotExercice1();
    saveState();
    render();
  }

  /* Dernier palier du parcours : cet écran est désormais l'écran de fin du
     module entier (plus de palier "dictée finale" à la suite). */
  function showExercice1Results() {
    const total = mots.length;
    const score = state.ex1.correctFirstTry;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = 'Dictée audio terminée !';
    document.getElementById('dic-final-detail').textContent =
      `${score} mot${score !== 1 ? 's' : ''} juste${score !== 1 ? 's' : ''} du premier coup sur ${total}.`;
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

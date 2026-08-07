/* ─────────────────────────────────────────────────────────────────────────────
   questionnaires-engine.js — Moteur de passage des questionnaires de lecture
   côté élève (questionnaires-lecture.html). Dépend de : auth.js (lfmAuth),
   questionnaires-student.js (lfmQuestionnairesStudent), breadcrumb.js.

   Page unique combinant bibliothèque (liste des questionnaires publiés) et
   passage (question par question, correction en fin de parcours) — pas de
   paramètre ?id= comme dictee.html, tout se passe côté client par bascule
   d'état, cf. showState().
   ───────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  let library = [];
  let content = null;       // { questionnaire, questions } — voir get_questionnaire_pour_eleve
  let currentIndex = 0;
  let selectedIds = new Set();
  let answersGiven = [];    // [{ question_id, reponse_ids }]
  let speechEnabled = false; // élève marqué est_dyslexique — voir lfmAuth.getMyStudentRecord()

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showState(name) {
    ['loading', 'library', 'quiz', 'results', 'error'].forEach(s => {
      const el = document.getElementById('qz-state-' + s);
      if (el) el.style.display = s === name ? '' : 'none';
    });
  }

  function showError(msg) {
    showState('error');
    if (msg) document.querySelector('#qz-state-error p').textContent = msg;
  }

  /* ── Bibliothèque ── */
  function renderLibrary() {
    const grid = document.getElementById('qz-library-grid');
    const empty = document.getElementById('qz-library-empty');
    if (library.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    grid.innerHTML = library.map(q => `
      <div class="qz-card">
        <div class="qz-card-icon">📖</div>
        <div class="qz-card-title">${escHtml(q.titre_oeuvre)}</div>
        ${q.auteur_oeuvre ? `<div class="qz-card-auteur">${escHtml(q.auteur_oeuvre)}</div>` : ''}
        <div class="qz-card-meta">${q.nb_questions} question${q.nb_questions !== 1 ? 's' : ''}</div>
        <button type="button" class="qz-card-btn" data-start="${q.id}">Commencer</button>
      </div>
    `).join('');
    grid.querySelectorAll('[data-start]').forEach(btn =>
      btn.addEventListener('click', () => startQuiz(btn.dataset.start))
    );
  }

  async function loadLibrary() {
    showState('loading');
    try {
      library = await lfmQuestionnairesStudent.listPublished();
    } catch (e) {
      return showError();
    }
    document.getElementById('qz-page-title').textContent = 'Questionnaires de lecture';
    document.getElementById('qz-page-subtitle').textContent = 'Choisis un livre et teste ta compréhension.';
    renderLibrary();
    showState('library');
  }

  /* ── Passage ── */
  async function startQuiz(questionnaireId) {
    showState('loading');
    try {
      content = await lfmQuestionnairesStudent.getQuestionnaireContent(questionnaireId);
    } catch (e) {
      return showError();
    }
    currentIndex = 0;
    answersGiven = [];
    document.getElementById('qz-page-title').textContent = content.questionnaire.titre_oeuvre;
    document.getElementById('qz-page-subtitle').textContent = content.questionnaire.auteur_oeuvre || '';
    renderQuestion();
    showState('quiz');
  }

  function renderQuestion() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    const q = content.questions[currentIndex];
    selectedIds = new Set();

    document.getElementById('qz-progress-msg').textContent =
      `Question ${currentIndex + 1} / ${content.questions.length}`;

    const enonceEl = document.getElementById('qz-question-enonce');
    enonceEl.innerHTML = '';
    const enonceText = document.createElement('span');
    enonceText.textContent = q.enonce;
    enonceEl.appendChild(enonceText);
    if (speechEnabled) attachSpeechButton(enonceEl, q.enonce);

    const list = document.getElementById('qz-choices-list');
    list.innerHTML = q.reponses.map(r => `
      <div class="qz-choice-row">
        <button type="button" class="qz-choice-btn" data-id="${r.id}">
          <span class="qz-choice-mark"></span><span>${escHtml(r.texte)}</span>
        </button>
      </div>
    `).join('');
    if (speechEnabled) {
      list.querySelectorAll('.qz-choice-row').forEach((row, i) => attachSpeechButton(row, q.reponses[i].texte));
    }
    list.querySelectorAll('.qz-choice-btn').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (selectedIds.has(id)) {
        selectedIds.delete(id);
        btn.classList.remove('is-selected');
      } else {
        selectedIds.add(id);
        btn.classList.add('is-selected');
      }
      document.getElementById('qz-next-btn').disabled = selectedIds.size === 0;
    }));

    const nextBtn = document.getElementById('qz-next-btn');
    nextBtn.disabled = true;
    nextBtn.textContent = currentIndex === content.questions.length - 1 ? 'Valider mes réponses' : 'Question suivante';
  }

  async function onNext() {
    const q = content.questions[currentIndex];
    answersGiven.push({ question_id: q.id, reponse_ids: Array.from(selectedIds) });

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
      result = await lfmQuestionnairesStudent.submitResult(content.questionnaire.id, answersGiven);
    } catch (e) {
      return showError();
    }
    renderResults(result);
    showState('results');
  }

  /* ── Résultats ── */
  function renderResults(result) {
    const pct = Math.round(result.score_pct);
    const circle = document.getElementById('qz-score-circle');
    circle.classList.remove('is-low', 'is-mid');
    if (pct < 50) circle.classList.add('is-low');
    else if (pct < 80) circle.classList.add('is-mid');

    document.getElementById('qz-score-pct').textContent = pct + '%';
    document.getElementById('qz-score-frac').textContent = `${result.bonnes_reponses} / ${result.total} bonnes réponses`;
    document.getElementById('qz-results-title').textContent =
      pct >= 80 ? 'Bravo !' : pct >= 50 ? 'Bien joué !' : "Continue à t'entraîner !";

    const givenByQuestion = new Map(answersGiven.map(a => [a.question_id, new Set(a.reponse_ids)]));
    const list = document.getElementById('qz-review-list');
    list.innerHTML = (result.correction || []).map(c => {
      const given = givenByQuestion.get(c.question_id) || new Set();
      const correctIds = new Set((c.bonnes_reponses || []).map(r => r.id));
      const isWrong = given.size !== correctIds.size || [...given].some(id => !correctIds.has(id));
      return `
        <div class="qz-review-item ${isWrong ? 'is-wrong' : ''}">
          <div class="qz-review-enonce">
            ${escHtml(c.enonce)}
            <span class="qz-review-badge ${isWrong ? 'qz-review-badge--ko' : 'qz-review-badge--ok'}">${isWrong ? 'Incorrect' : 'Correct'}</span>
          </div>
          <div class="qz-review-correct">Bonne réponse : ${(c.bonnes_reponses || []).map(r => escHtml(r.texte)).join(', ')}</div>
          ${c.explication ? `<div class="qz-review-explication">${escHtml(c.explication)}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  /* ── Init ── */
  async function init() {
    const session = await lfmAuth.getSession();
    if (!session) return showError('Connecte-toi pour accéder aux questionnaires de lecture.');

    const student = await lfmAuth.getMyStudentRecord();
    speechEnabled = !!(student && student.est_dyslexique);

    document.getElementById('qz-next-btn').addEventListener('click', onNext);
    document.getElementById('qz-back-btn').addEventListener('click', () => window.location.reload());

    loadLibrary();
  }

  init();
})();

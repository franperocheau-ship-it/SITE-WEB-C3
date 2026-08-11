/* ─────────────────────────────────────────────────────────────────────────────
   champ-lexical-engine.js — Écran du champ lexical (champ-lexical.html),
   Module Vocabulaire Corpus lexical / Champ lexical, Phase 1.
   Dépend de : supabase-client.js, auth.js, breadcrumb.js

   Toute validation/révélation de mots passe par les 4 fonctions RPC
   SECURITY DEFINER de la migration 20260809120000_corpus_lexicaux.sql —
   ce module ne lit/écrit jamais directement champ_lexical_mots (RLS le lui
   interdit de toute façon).
   ───────────────────────────────────────────────────────────────────────────── */

// L'ORDRE de ces tableaux pilote à la fois l'écran de collecte (ici) et,
// via la fonction SQL public.cl_categorie_ordre() (migration
// 20260817100000_corpus_lexicaux_carnet_auto_et_ordre.sql), l'ordre des
// cartes sur l'écran de correction — les deux doivent rester synchronisés
// à la main (aucune source unique possible entre JS et SQL).
const NIVEAU_CATEGORIES = {
  1: ['synonyme', 'antonyme', 'adjectif'],
  2: ['synonyme', 'antonyme', 'adjectif', 'derive', 'expression'],
  3: ['synonyme', 'antonyme', 'adjectif', 'derive', 'expression', 'soutenu', 'familier']
};

const CATEGORIE_LABELS = {
  synonyme: 'Synonymes',
  antonyme: 'Antonymes',
  adjectif: 'Adjectifs associés',
  derive: 'Mots dérivés',
  expression: 'Expressions et proverbes',
  soutenu: 'Registre soutenu',
  familier: 'Registre familier'
};

const CATEGORIE_HAS_EXEMPLE = { expression: true };

// Couleur/icône par catégorie — écran de correction (grille de cartes).
// Palette dérivée de la charte (navy/gold/turquoise) + teintes secondaires
// déjà utilisées ailleurs sur le site (violet/orange des badges de temps de
// jogging, css/jogging.css .jog-temps--*) pour rester dans la même famille.
const CATEGORIE_META = {
  synonyme:   { color: '#1DBFA0', bg: 'rgba(29,191,160,0.12)',  border: 'rgba(29,191,160,0.45)',  icon: '🔁' },
  antonyme:   { color: '#1A2D6B', bg: 'rgba(26,45,107,0.08)',   border: 'rgba(26,45,107,0.35)',   icon: '↔️' },
  adjectif:   { color: '#F5A623', bg: 'rgba(245,166,35,0.14)',  border: 'rgba(245,166,35,0.45)',  icon: '🎨' },
  derive:     { color: '#16a34a', bg: 'rgba(22,163,74,0.12)',   border: 'rgba(22,163,74,0.4)',    icon: '🌱' },
  expression: { color: '#D62839', bg: 'rgba(214,40,57,0.10)',   border: 'rgba(214,40,57,0.4)',    icon: '💬' },
  soutenu:    { color: '#7C5CBF', bg: 'rgba(124,92,191,0.12)',  border: 'rgba(124,92,191,0.4)',   icon: '🎩' },
  familier:   { color: '#E0765C', bg: 'rgba(224,118,92,0.12)',  border: 'rgba(224,118,92,0.4)',   icon: '😎' }
};

// Animation d'apparition en cascade des chips — plafonnée pour qu'une
// catégorie à beaucoup de mots (ex. 26 adjectifs) ne traîne pas en longueur.
const CHIP_STAGGER_MS = 40;
const CHIP_STAGGER_MAX_INDEX = 15;

const NIVEAU_DESC = {
  1: 'Synonymes, antonymes, adjectifs associés',
  2: 'Niveau 1 + mots dérivés, expressions',
  3: 'Niveau 2 + registres de langue'
};

const STATE_IDS = ['loading', 'contextualisation', 'collection', 'termine', 'correction', 'recall', 'recall-correction'];

let champ = null;
let profile = null;
let sessionsByNiveau = { 1: null, 2: null, 3: null }; // une session indépendante par niveau
let currentNiveau = null;
let sessionRow = null; // toujours la session de currentNiveau
let foundByCategorie = {}; // categorie -> [{mot, points}]
let totalPoints = 0;
let recallReviewId = null;
let recallPrompts = [];
let speechEnabled = false; // lecture audio (dyslexie) — résolu une fois dans init()

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showState(name) {
  STATE_IDS.forEach(s => {
    const el = document.getElementById('cl-state-' + s);
    if (el) el.style.display = (s === name) ? '' : 'none';
  });
}

/* ── Chargement du champ ─────────────────────────────────────────────────── */

async function loadChamp(champId) {
  const { data, error } = await window.lfmDb
    .from('champs_lexicaux')
    .select('id, corpus_id, theme, contextualisation, statut, corpus_lexicaux(titre)')
    .eq('id', champId)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

async function loadAllSessions(studentId, champId) {
  const { data } = await window.lfmDb
    .from('champ_lexical_sessions')
    .select('*')
    .eq('student_id', studentId)
    .eq('champ_id', champId);
  return data || [];
}

/* ── Contextualisation + choix du niveau (hub, toujours affiché sauf mode
   rappel — chaque niveau se termine indépendamment, jamais de blocage
   global sur tout le champ) ─────────────────────────────────────────────── */

function niveauStatusLabel(session) {
  if (!session) return '';
  if (session.status === 'termine') {
    const due = session.next_review_at && new Date(session.next_review_at) <= new Date();
    return `✅ Terminé — ${session.total_points} points${due ? ' · 🔁 à réviser' : ''}`;
  }
  return '▶️ En cours';
}

function renderNiveauStatuses() {
  [1, 2, 3].forEach(n => {
    const el = document.querySelector(`.cl-niveau-btn-status[data-niveau-status="${n}"]`);
    if (el) el.textContent = niveauStatusLabel(sessionsByNiveau[n]);
  });
}

/* Fil d'Ariane : "Regarder" devient cliquable (retour à ce hub, sans
   rechargement) et un maillon "Niveau N" s'ajoute dès qu'un niveau est
   actif ; niveau = null repasse le fil d'Ariane à l'état "pas de niveau
   choisi" — l'état par défaut de ce hub. */
function updateBreadcrumbForNiveau(niveau) {
  if (niveau) {
    Breadcrumb.setCurrentClickable(() => showNiveauSelectState());
    Breadcrumb.setSub('Niveau ' + niveau);
  } else {
    Breadcrumb.clearCurrentClickable();
    Breadcrumb.clearSub();
  }
}

function showNiveauSelectState() {
  updateBreadcrumbForNiveau(null);
  const contextText = champ.contextualisation || '';
  document.getElementById('cl-context-text').textContent = contextText;
  if (speechEnabled && contextText && typeof attachSpeechButton === 'function') {
    attachSpeechButton(document.getElementById('cl-context-text'), contextText);
  }
  renderNiveauStatuses();
  showState('contextualisation');
}

function bindNiveauButtons() {
  document.querySelectorAll('.cl-niveau-btn').forEach(btn => {
    btn.addEventListener('click', () => selectNiveau(Number(btn.dataset.niveau)));
  });
}

async function selectNiveau(niveau) {
  currentNiveau = niveau;
  updateBreadcrumbForNiveau(niveau);
  const existing = sessionsByNiveau[niveau];

  if (existing && existing.status === 'termine') {
    sessionRow = existing;
    await showTermineState();
    return;
  }
  if (existing && existing.status === 'en_cours') {
    sessionRow = existing;
    startCollection();
    return;
  }

  const { data, error } = await window.lfmDb
    .from('champ_lexical_sessions')
    .insert({ student_id: profile.id, champ_id: champ.id, niveau })
    .select()
    .single();
  if (error || !data) {
    document.getElementById('cl-state-loading').textContent = 'Impossible de démarrer. Réessaie dans un instant.';
    showState('loading');
    return;
  }
  sessionsByNiveau[niveau] = data;
  sessionRow = data;
  startCollection();
}

/* ── Collecte ─────────────────────────────────────────────────────────────── */

function updatePointsCounter() {
  document.getElementById('cl-points-value').textContent = totalPoints;
}

function renderPills(categorie) {
  const listEl = document.querySelector(`.cl-pill-list[data-categorie="${categorie}"]`);
  if (!listEl) return;
  const found = foundByCategorie[categorie] || [];
  listEl.innerHTML = found.map(f =>
    `<span class="cl-pill">${escapeHtml(f.mot)} <span class="cl-pill-points">+${f.points}</span></span>`
  ).join('');
}

function setFeedback(categorie, text, cls) {
  const el = document.querySelector(`.cl-input-feedback[data-categorie="${categorie}"]`);
  if (!el) return;
  el.textContent = text;
  el.className = 'cl-input-feedback' + (cls ? ' cl-input-feedback--' + cls : '');
}

async function submitWord(categorie) {
  const input = document.querySelector(`.cl-input[data-categorie="${categorie}"]`);
  const mot = input.value.trim();
  if (!mot) return;

  const { data, error } = await window.lfmDb.rpc('valider_mot_champ_lexical', {
    p_session_id: sessionRow.id,
    p_categorie: categorie,
    p_mot: mot
  });

  if (error) {
    setFeedback(categorie, 'Erreur, réessaie.', 'non');
    return;
  }

  if (!data.correct) {
    setFeedback(categorie, 'Pas dans la liste, essaie un autre mot !', 'non');
  } else if (data.deja_trouve) {
    setFeedback(categorie, 'Déjà trouvé !', 'deja');
  } else {
    setFeedback(categorie, `Trouvé ! +${data.points} points`, 'ok');
    foundByCategorie[categorie] = foundByCategorie[categorie] || [];
    foundByCategorie[categorie].push({ mot, points: data.points });
    totalPoints += data.points;
    updatePointsCounter();
    renderPills(categorie);
  }
  input.value = '';
  input.focus();
}

function renderCategorieBlock(categorie) {
  return `
    <div class="cl-categorie-block">
      <div class="cl-categorie-title">${escapeHtml(CATEGORIE_LABELS[categorie])}</div>
      <div class="cl-input-row">
        <input type="text" class="cl-input" data-categorie="${categorie}" placeholder="Tape un mot…" autocomplete="off">
        <button type="button" class="cl-add-btn" data-categorie="${categorie}">Ajouter</button>
      </div>
      <div class="cl-input-feedback" data-categorie="${categorie}"></div>
      <div class="cl-pill-list" data-categorie="${categorie}"></div>
    </div>
  `;
}

function bindCollectionEvents() {
  document.querySelectorAll('.cl-add-btn').forEach(btn => {
    btn.addEventListener('click', () => submitWord(btn.dataset.categorie));
  });
  document.querySelectorAll('.cl-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submitWord(input.dataset.categorie); }
    });
  });
  document.getElementById('cl-terminer-btn').addEventListener('click', onTerminerClick);
}

async function startCollection() {
  foundByCategorie = {};
  totalPoints = sessionRow.total_points || 0;
  const categories = NIVEAU_CATEGORIES[sessionRow.niveau];
  document.getElementById('cl-niveau-label').textContent = `Niveau ${sessionRow.niveau}`;
  document.getElementById('cl-categories-container').innerHTML = categories.map(renderCategorieBlock).join('');
  updatePointsCounter();
  bindCollectionEvents();
  showState('collection');

  // Reprise d'une session en cours : réaffiche les pastilles déjà trouvées
  // (le total de points, lui, était déjà porté par sessionRow.total_points).
  const { data: rows } = await window.lfmDb
    .from('champ_lexical_mots_trouves')
    .select('categorie, submitted_text, points_gagnes')
    .eq('session_id', sessionRow.id);

  (rows || []).forEach(r => {
    foundByCategorie[r.categorie] = foundByCategorie[r.categorie] || [];
    foundByCategorie[r.categorie].push({ mot: r.submitted_text, points: r.points_gagnes });
  });
  categories.forEach(renderPills);
}

/* ── Fin de session : correction ─────────────────────────────────────────── */

// Une chip = un mot. isTrouve distingue le style plein (trouvé) du style en
// pointillés (manqué, sans action possible — les mots manqués ne rejoignent
// jamais le carnet, voir renderCorrectionScreen/onTerminerClick). idx pilote
// le délai d'apparition en cascade, plafonné pour les grosses catégories.
function renderChip(m, isTrouve, categorie, meta, idx) {
  const delay = Math.min(idx, CHIP_STAGGER_MAX_INDEX) * CHIP_STAGGER_MS;
  const hasExemple = CATEGORIE_HAS_EXEMPLE[categorie] && m.exemple_phrase;
  const cls = 'cl-chip ' + (isTrouve ? 'cl-chip--trouve' : 'cl-chip--manque') + (hasExemple ? ' cl-chip--flippable' : '');
  const tintStyle = isTrouve ? `background:${meta.bg};border-color:${meta.border};` : '';

  const frontHtml = isTrouve
    ? `<span class="cl-chip-word">✓ ${escapeHtml(m.mot)}</span><span class="cl-chip-points" style="color:${meta.color}">+${m.points}</span>`
    : `<span class="cl-chip-word">${escapeHtml(m.mot)}</span>`;

  const backHtml = hasExemple ? `<div class="cl-chip-back">${escapeHtml(m.exemple_phrase)}</div>` : '';

  return `
    <div class="${cls}" style="animation-delay:${delay}ms;${tintStyle}">
      <div class="cl-chip-front">${frontHtml}</div>
      ${backHtml}
    </div>`;
}

function renderCorrectionScreen(payload) {
  const categories = payload.categories || [];
  const totalPossible = categories.reduce((sum, cat) =>
    sum
    + (cat.trouves || []).reduce((s, m) => s + m.points, 0)
    + (cat.manques || []).reduce((s, m) => s + m.points, 0), 0);
  document.getElementById('cl-correction-total').textContent = `⭐ ${payload.total_points} / ${totalPossible} points`;

  let chipIndex = 0;
  const catsHtml = categories.map(cat => {
    const meta = CATEGORIE_META[cat.categorie] || { color: 'var(--blue)', bg: 'var(--bg)', border: 'var(--border)', icon: '📚' };
    const trouvesCount = (cat.trouves || []).length;
    const totalCount = trouvesCount + (cat.manques || []).length;

    const chipsHtml =
      (cat.trouves || []).map(m => renderChip(m, true, cat.categorie, meta, chipIndex++)).join('') +
      (cat.manques || []).map(m => renderChip(m, false, cat.categorie, meta, chipIndex++)).join('');

    return `
      <div class="cl-cat-card" style="--cl-cat-color:${meta.color}">
        <div class="cl-cat-card-header">
          <span class="cl-cat-card-icon">${meta.icon}</span>
          <span class="cl-cat-card-title">${escapeHtml(CATEGORIE_LABELS[cat.categorie] || cat.categorie)}</span>
          <span class="cl-cat-card-count">${trouvesCount}/${totalCount}</span>
        </div>
        <div class="cl-chip-list">${chipsHtml || '<span class="cl-chip-empty">—</span>'}</div>
      </div>`;
  }).join('');

  document.getElementById('cl-correction-categories').innerHTML = catsHtml;
  showState('correction');

  document.querySelectorAll('.cl-chip--flippable').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('cl-chip--flipped'));
  });

  const nextBtn = document.getElementById('cl-correction-next-niveau-btn');
  if (nextBtn) {
    if (currentNiveau < 3) {
      nextBtn.style.display = '';
      nextBtn.textContent = `Faire le niveau ${currentNiveau + 1} →`;
      nextBtn.onclick = () => selectNiveau(currentNiveau + 1);
    } else {
      nextBtn.style.display = 'none';
    }
  }
  const backBtn = document.getElementById('cl-correction-hub-btn');
  if (backBtn) backBtn.onclick = () => showNiveauSelectState();
}

async function onTerminerClick() {
  const btn = document.getElementById('cl-terminer-btn');
  btn.disabled = true;
  const { data, error } = await window.lfmDb.rpc('terminer_session_champ_lexical', {
    p_session_id: sessionRow.id
  });
  if (error || !data) {
    // Auparavant avalé en silence : le bouton se réactivait sans aucun
    // indice, symptôme "rien ne se passe" impossible à diagnostiquer.
    console.error('[champ-lexical] terminer_session_champ_lexical a échoué', { sessionId: sessionRow.id, error });
    btn.disabled = false;
    const errEl = document.getElementById('cl-collection-error');
    if (errEl) {
      errEl.textContent = "Impossible de terminer ce niveau pour l'instant. Réessaie, ou recharge la page si ça persiste.";
      errEl.style.display = '';
    }
    return;
  }
  sessionRow.status = 'termine';
  sessionRow.total_points = data.total_points;
  sessionsByNiveau[currentNiveau] = sessionRow;
  renderCorrectionScreen(data);
}

/* ── Session déjà terminée (revisite hors mode rappel) ───────────────────── */

async function showTermineState() {
  document.getElementById('cl-termine-points').textContent = `${sessionRow.total_points} points`;

  const { data: rows } = await window.lfmDb
    .from('champ_lexical_mots_trouves')
    .select('categorie, submitted_text, points_gagnes')
    .eq('session_id', sessionRow.id)
    .order('found_at', { ascending: true });

  const byCat = {};
  (rows || []).forEach(r => {
    byCat[r.categorie] = byCat[r.categorie] || [];
    byCat[r.categorie].push(r);
  });

  document.getElementById('cl-termine-found').innerHTML = Object.keys(byCat).map(cat => `
    <div class="cl-correction-cat">
      <div class="cl-correction-cat-title">${escapeHtml(CATEGORIE_LABELS[cat] || cat)}</div>
      <div class="cl-pill-list">
        ${byCat[cat].map(r => `<span class="cl-pill">${escapeHtml(r.submitted_text)} <span class="cl-pill-points">+${r.points_gagnes}</span></span>`).join('')}
      </div>
    </div>`).join('');

  const revisionBtn = document.getElementById('cl-revision-btn');
  const dueNow = sessionRow.next_review_at && new Date(sessionRow.next_review_at) <= new Date();
  revisionBtn.style.display = dueNow ? '' : 'none';
  revisionBtn.onclick = () => {
    window.location.href = `champ-lexical.html?champ=${encodeURIComponent(champ.id)}&niveau=${currentNiveau}&mode=recall`;
  };

  const backBtn = document.getElementById('cl-termine-hub-btn');
  if (backBtn) backBtn.onclick = () => showNiveauSelectState();

  showState('termine');
}

/* ── Mode rappel (réactivation espacée) ──────────────────────────────────── */

async function startRecall() {
  const { data, error } = await window.lfmDb.rpc('demarrer_revision_champ_lexical', {
    p_session_id: sessionRow.id
  });
  if (error || !data) {
    document.getElementById('cl-state-loading').textContent = 'Impossible de démarrer la révision. Réessaie dans un instant.';
    showState('loading');
    return;
  }
  recallReviewId = data.review_id;
  recallPrompts = data.prompts;

  document.getElementById('cl-recall-prompts').innerHTML = recallPrompts.map((p, idx) => `
    <div class="cl-recall-prompt">
      <div class="cl-recall-prompt-label">Un mot <strong>${escapeHtml(CATEGORIE_LABELS[p.categorie] || p.categorie)}</strong> que tu avais trouvé pour « ${escapeHtml(champ.theme)} » ?</div>
      <input type="text" class="cl-input" data-recall-idx="${idx}" autocomplete="off">
    </div>`).join('');

  if (speechEnabled && typeof attachSpeechButton === 'function') {
    document.querySelectorAll('#cl-recall-prompts .cl-recall-prompt-label').forEach(el => {
      attachSpeechButton(el, el.textContent.trim());
    });
  }

  showState('recall');
}

async function onRecallSubmit() {
  const btn = document.getElementById('cl-recall-submit-btn');
  btn.disabled = true;
  const reponses = recallPrompts.map((p, idx) => {
    const input = document.querySelector(`.cl-input[data-recall-idx="${idx}"]`);
    return input ? input.value.trim() : '';
  });

  const { data, error } = await window.lfmDb.rpc('terminer_revision_champ_lexical', {
    p_review_id: recallReviewId,
    p_reponses: reponses
  });
  if (error || !data) {
    btn.disabled = false;
    return;
  }

  document.getElementById('cl-recall-correction-total').textContent =
    `${data.mots_trouves} / ${data.mots_total} mots retrouvés`;
  document.getElementById('cl-recall-correction-list').innerHTML = (data.resultats || []).map(r => `
    <div class="cl-recall-result cl-recall-result--${r.trouve ? 'ok' : 'non'}">
      ${r.trouve ? '✔' : '✖'} <strong>${escapeHtml(CATEGORIE_LABELS[r.categorie] || r.categorie)}</strong> — ${escapeHtml(r.mot)}
    </div>`).join('');

  showState('recall-correction');
}

/* ── Initialisation ───────────────────────────────────────────────────────── */

(async function init() {
  const params = new URLSearchParams(window.location.search);
  const champId = params.get('champ');
  const mode = params.get('mode');

  if (!champId) {
    document.getElementById('cl-state-loading').textContent = 'Champ lexical introuvable.';
    return;
  }

  champ = await loadChamp(champId);
  if (!champ) {
    document.getElementById('cl-state-loading').textContent = "Ce champ lexical n'existe pas.";
    return;
  }

  document.title = `${champ.theme} — Vocabulaire — Lycée Français de Madrid`;
  document.getElementById('cl-title').textContent = champ.theme;
  const corpusInfo = Array.isArray(champ.corpus_lexicaux) ? champ.corpus_lexicaux[0] : champ.corpus_lexicaux;
  Breadcrumb.setCategory({ href: 'vocabulaire-corpus.html', label: corpusInfo ? corpusInfo.titre : 'Corpus lexical' });
  Breadcrumb.setCurrent(champ.theme);

  profile = await lfmAuth.requireRole('eleve');
  if (!profile) return;

  const [sessions, studentRecord] = await Promise.all([
    loadAllSessions(profile.id, champ.id),
    lfmAuth.getMyStudentRecord()
  ]);
  speechEnabled = !!(studentRecord && studentRecord.est_dyslexique);
  sessionsByNiveau = { 1: null, 2: null, 3: null };
  sessions.forEach(s => { sessionsByNiveau[s.niveau] = s; });

  if (mode === 'recall') {
    const niveauParam = Number(params.get('niveau'));
    const s = sessionsByNiveau[niveauParam];
    if (!niveauParam || !s || s.status !== 'termine') {
      document.getElementById('cl-state-loading').textContent = "Termine d'abord ce niveau avant de le réviser.";
      showState('loading');
      return;
    }
    currentNiveau = niveauParam;
    updateBreadcrumbForNiveau(niveauParam);
    sessionRow = s;
    document.getElementById('cl-recall-submit-btn').addEventListener('click', onRecallSubmit);
    await startRecall();
    return;
  }

  bindNiveauButtons();
  showNiveauSelectState();
})();

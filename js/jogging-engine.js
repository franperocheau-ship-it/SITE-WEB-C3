/* ─────────────────────────────────────────────────────────────────────────────
   jogging-engine.js — Écran du jogging (jogging.html), Phase 1 v2.0.
   Dépend de : supabase-client.js, auth.js, breadcrumb.js, jogging-data.js,
               jogging-grammalecte.js, jogging-messages.js

   Correction 100 % côté client (Grammalecte, aucun appel réseau pour
   l'analyse — §3.9) ; écriture directe dans Supabase (RLS), pas d'Edge
   Function (§1.2 point 3, §6.3).
   ───────────────────────────────────────────────────────────────────────────── */

const MIN_WORDS = 20;
const MAX_WORDS = 300;
const AUTOSAVE_INTERVAL_MS = 30000;

const TEMPS_CLASS = {
  "Présent":        "jog-temps--present",
  "Imparfait":      "jog-temps--imparfait",
  "Passé composé":  "jog-temps--passe-compose",
  "Futur":          "jog-temps--futur"
};

const CODE_LABELS = {
  C: "Conjugaison",
  H: "Homophones",
  A: "Accords",
  M: "Majuscules",
  P: "Ponctuation",
  O: "Orthographe",
  S: "Son"
};

/* Légende du tableau Code Champion (survol/tap sur une tuile) — mêmes noms
   de critères et même ton que js/jogging-messages.js. */
const FEU_LEGEND = {
  C: { label: "Conjugaison", desc: "Le verbe doit être bien conjugué au bon temps." },
  H: { label: "Homophones",  desc: "Mots qui se prononcent pareil mais s'écrivent différemment." },
  A: { label: "Accords",     desc: "Accorder les mots entre eux (genre, nombre)." },
  M: { label: "Majuscules",  desc: "Majuscule en début de phrase et aux noms propres." },
  P: { label: "Ponctuation", desc: "Bien ponctuer ses phrases." },
  I: { label: "Illisible",   desc: "Non utilisé pour les textes saisis." },
  O: { label: "Orthographe", desc: "Bien écrire chaque mot." },
  N: { label: "Néant",       desc: "Non utilisé pour le moment." },
  S: { label: "Son",         desc: "Bien choisir entre des mots qui se ressemblent à l'oral." }
};

const FEU_PICTO = { vert: '✔', orange: '~', rouge: '✖', blanc: '–' };
const FEU_ORDER = ['C', 'H', 'A', 'M', 'P', 'I', 'O', 'N', 'S'];

const STATE_IDS = ['loading', 'editor', 'error', 'correction'];

let jogging        = null;
let sessionRow      = null;
let draftDirty       = false;
let submitting        = false;
let prevErrorCount = null;

/* ── Utilitaires ──────────────────────────────────────────────────────────── */

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function showState(name) {
  STATE_IDS.forEach(s => {
    const el = document.getElementById('jog-state-' + s);
    if (el) el.style.display = (s === name) ? '' : 'none';
  });
}

/* ── En-tête ───────────────────────────────────────────────────────────────── */

function renderHeader(jog) {
  document.title = `${jog.title} — Rédaction — Lycée Français de Madrid`;
  document.getElementById('jog-title').textContent = jog.title;
  document.getElementById('jog-intro-meta').innerHTML = `
    <span class="jog-temps ${TEMPS_CLASS[jog.tempsImpose] || ''}">${jog.tempsImpose}</span>
    <span class="jog-intro-duree">⏱ ${jog.duree} min conseillées</span>
  `;
  document.getElementById('jog-intro-consigne').textContent = jog.consigne;
}

/* ── Bandeau de version ───────────────────────────────────────────────────── */

function renderVersionBanner(currentVersion) {
  let html = '';
  for (let v = 1; v <= 3; v++) {
    const cls = v < currentVersion ? 'jog-version-step--done'
              : v === currentVersion ? 'jog-version-step--active' : '';
    html += `<div class="jog-version-step ${cls}">V${v}</div>`;
    if (v < 3) html += `<div class="jog-version-sep"></div>`;
  }
  document.getElementById('jog-version-banner').innerHTML = html;
  document.getElementById('jog-version-label').textContent = `Version ${currentVersion} sur 3`;
}

/* ── Éditeur ───────────────────────────────────────────────────────────────── */

function updateWordCount() {
  const textarea = document.getElementById('jog-textarea');
  const n = countWords(textarea.value);
  const el = document.getElementById('jog-wordcount');
  el.textContent = `${n} mot${n > 1 ? 's' : ''} (${MIN_WORDS}–${MAX_WORDS} attendus)`;
  const outOfBounds = n < MIN_WORDS || n > MAX_WORDS;
  el.classList.toggle('is-warning', outOfBounds);
  document.getElementById('jog-validate-btn').disabled = outOfBounds || submitting;
}

async function saveDraft() {
  if (!draftDirty || !sessionRow) return;
  draftDirty = false;
  const textarea = document.getElementById('jog-textarea');
  const text = textarea.value;
  sessionRow.draft_text = text;
  const { error } = await window.lfmDb
    .from('jogging_sessions')
    .update({ draft_text: text })
    .eq('id', sessionRow.id);
  const statusEl = document.getElementById('jog-autosave-status');
  if (!error) {
    statusEl.textContent = 'Enregistré ✓';
    setTimeout(() => { if (statusEl.textContent === 'Enregistré ✓') statusEl.textContent = ''; }, 3000);
  }
}

function showEditorState() {
  renderVersionBanner(sessionRow.current_version);
  const textarea = document.getElementById('jog-textarea');
  textarea.value = sessionRow.draft_text || '';
  textarea.disabled = false;
  draftDirty = false;
  updateWordCount();
  showState('editor');
}

function bindEditorEvents() {
  const textarea = document.getElementById('jog-textarea');
  textarea.addEventListener('input', () => { draftDirty = true; updateWordCount(); });
  textarea.addEventListener('blur', saveDraft);
  setInterval(saveDraft, AUTOSAVE_INTERVAL_MS);

  document.getElementById('jog-validate-btn').addEventListener('click', onValidateClick);
  document.getElementById('jog-retry-btn').addEventListener('click', () => {
    JoggingGrammalecte.reset();
    JoggingGrammalecte.preload();
    showEditorState();
  });
}

/* ── Soumission ────────────────────────────────────────────────────────────── */

async function onValidateClick() {
  if (submitting) return; // verrou anti double-clic

  const textarea = document.getElementById('jog-textarea');
  const text = textarea.value.trim();
  const n = countWords(text);
  if (n < MIN_WORDS || n > MAX_WORDS) return;

  submitting = true;
  document.getElementById('jog-validate-btn').disabled = true;

  // Le texte est enregistré avant l'analyse : il n'est jamais perdu.
  sessionRow.draft_text = text;
  await window.lfmDb.from('jogging_sessions').update({ draft_text: text }).eq('id', sessionRow.id);
  draftDirty = false;

  try {
    const { grammalecteVersion, erreurs, feux } = await JoggingGrammalecte.analyzeText(text);

    const allGreenAuto = JoggingGrammalecte.AUTO_CODES.every(c => feux[c] === 'vert');
    const versionNumber = sessionRow.current_version;
    const isFinal = versionNumber >= 3 || allGreenAuto;

    const feuColumns = {};
    for (const c of JoggingGrammalecte.AUTO_CODES) feuColumns[`feu_${c.toLowerCase()}`] = feux[c];
    feuColumns.feu_i = 'blanc';
    feuColumns.feu_n = 'blanc'; // en attente de l'enseignant (Phase 2)

    const correction = { grammalecteVersion, erreurs, feux };

    const { error: insertErr } = await window.lfmDb.from('jogging_versions').insert({
      session_id: sessionRow.id,
      version_number: versionNumber,
      text,
      correction,
      ...feuColumns,
      grammalecte_version: grammalecteVersion
    });
    if (insertErr) throw insertErr;

    const sessionUpdate = { all_green: allGreenAuto };
    if (isFinal) {
      sessionUpdate.status = 'completed';
      sessionUpdate.completed_at = new Date().toISOString();
    } else {
      sessionUpdate.status = 'in_progress';
      sessionUpdate.current_version = versionNumber + 1;
    }
    const { error: updateErr } = await window.lfmDb
      .from('jogging_sessions')
      .update(sessionUpdate)
      .eq('id', sessionRow.id);
    if (updateErr) throw updateErr;

    sessionRow.status = sessionUpdate.status;
    sessionRow.all_green = allGreenAuto;
    sessionRow.current_version = sessionUpdate.current_version || sessionRow.current_version;

    if (isFinal) {
      // Attribution des badges rejouée à partir des données déjà en base ;
      // ne bloque jamais la transition vers l'écran de correction (§5.6.4).
      syncBadgesAfterCompletion(sessionRow.student_id);
    }

    // Transition brève éditeur → correction (§3.11 : Grammalecte est quasi
    // instantané, plus besoin d'un écran d'attente à message).
    const editorEl = document.getElementById('jog-state-editor');
    editorEl.classList.add('jog-fade-out');
    setTimeout(() => {
      editorEl.classList.remove('jog-fade-out');
      renderCorrectionScreen(text, correction, isFinal, feux);
      const correctionEl = document.getElementById('jog-state-correction');
      showState('correction');
      correctionEl.classList.add('jog-fade-in');
      setTimeout(() => correctionEl.classList.remove('jog-fade-in'), 400);
    }, 300);
  } catch (err) {
    document.getElementById('jog-error-text').textContent =
      "Ton texte est bien enregistré, réessaie dans un instant.";
    showState('error');
  } finally {
    submitting = false;
    document.getElementById('jog-validate-btn').disabled = false;
  }
}

/* ── Badges (Phase 3, §5.6.4) ─────────────────────────────────────────────── */

/* Rejoue l'attribution des badges à partir de l'historique complet des
   sessions terminées de l'élève, comme js/jogging-student-space.js pour
   « Mes réussites ». Silencieux : en cas d'échec, l'attribution sera
   simplement retentée à la prochaine session terminée. */
async function syncBadgesAfterCompletion(studentId) {
  if (typeof JoggingBadges === 'undefined') return;
  try {
    const { data: sessions } = await window.lfmDb
      .from('jogging_sessions')
      .select('id, created_at')
      .eq('student_id', studentId)
      .eq('status', 'completed')
      .limit(2000);
    const completed = sessions || [];
    if (completed.length === 0) return;

    const { data: versions } = await window.lfmDb
      .from('jogging_versions')
      .select('session_id, version_number, feu_c, feu_h, feu_a, feu_m, feu_p, feu_o, feu_n, feu_i, feu_s')
      .in('session_id', completed.map(s => s.id))
      .order('version_number', { ascending: true })
      .limit(2000);

    const lastVersionBySession = new Map();
    (versions || []).forEach(v => lastVersionBySession.set(v.session_id, v));

    await JoggingBadges.syncBadges(studentId, completed, lastVersionBySession);
  } catch (err) {
    // silencieux — voir commentaire ci-dessus
  }
}

/* ── Carnet d'auteur (Phase 3, §5.6.7) ────────────────────────────────────── */

function markCarnetAdded(btn) {
  btn.textContent = '✓ Ajouté à ton carnet';
  btn.disabled = true;
}

function setupCarnetButton() {
  const btn = document.getElementById('jog-carnet-add-btn');
  if (!btn || !sessionRow) return;

  window.lfmDb.from('jogging_carnet').select('session_id')
    .eq('session_id', sessionRow.id).eq('student_id', sessionRow.student_id).maybeSingle()
    .then(({ data }) => { if (data) markCarnetAdded(btn); });

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    const { error } = await window.lfmDb.from('jogging_carnet')
      .insert({ student_id: sessionRow.student_id, session_id: sessionRow.id });
    if (!error) markCarnetAdded(btn);
    else btn.disabled = false;
  });
}

/* ── Surlignage par positions fiables (§3.7 : pas de repli nécessaire) ──────── */

function highlightText(text, erreurs) {
  // Filet de sécurité : si deux erreurs se chevauchent, on garde la première
  // (positions déjà triées par js/jogging-grammalecte.js).
  const resolved = [];
  let lastEnd = -1;
  for (const e of erreurs) {
    if (e.start >= lastEnd) { resolved.push(e); lastEnd = e.end; }
  }

  let html = '';
  let cursor = 0;
  resolved.forEach((e, i) => {
    html += escapeHtml(text.slice(cursor, e.start));
    html += `<span class="jog-highlight" data-code="${e.code}" data-idx="${i}">${escapeHtml(text.slice(e.start, e.end))}</span>`;
    cursor = e.end;
  });
  html += escapeHtml(text.slice(cursor));

  return { html, erreurs: resolved };
}

function closeBubble() {
  const b = document.getElementById('jog-active-bubble');
  if (b) b.remove();
}

function showBubble(anchorEl, titleHtml, bodyText) {
  closeBubble();
  const container = document.getElementById('jog-correction-text');
  const bubble = document.createElement('div');
  bubble.className = 'jog-bubble';
  bubble.id = 'jog-active-bubble';
  bubble.innerHTML = `<div class="jog-bubble-title">${titleHtml}</div><div>${escapeHtml(bodyText)}</div>`;
  container.appendChild(bubble);

  const anchorRect = anchorEl.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  bubble.style.left = Math.max(0, anchorRect.left - containerRect.left) + 'px';
  bubble.style.top  = (anchorRect.bottom - containerRect.top + 6) + 'px';
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.jog-highlight') && !e.target.closest('.jog-feu-cell') && !e.target.closest('.jog-bubble')) {
    closeBubble();
  }
  if (!e.target.closest('.jog-feu-cell') && !e.target.closest('.jog-feu-tooltip')) {
    closeFeuTooltip();
  }
});

/* ── Tableau Code Champion (9 critères, 7 auto + I et N grisés) ─────────────── */

function closeFeuTooltip() {
  const t = document.getElementById('jog-feu-tooltip');
  if (t) t.remove();
}

/** Légende contextuelle par lettre — survol (desktop) ou tap (mobile). */
function showFeuTooltip(anchorEl) {
  const legend = FEU_LEGEND[anchorEl.dataset.code];
  if (!legend) return;
  closeFeuTooltip();

  const tooltip = document.createElement('div');
  tooltip.className = 'jog-feu-tooltip';
  tooltip.id = 'jog-feu-tooltip';
  tooltip.innerHTML = `<div class="jog-feu-tooltip-title">${anchorEl.dataset.code} · ${escapeHtml(legend.label)}</div><div>${escapeHtml(legend.desc)}</div>`;
  document.body.appendChild(tooltip);

  // Positionné en fixed + bornage à la fenêtre : jamais coupée par les
  // bords de l'écran, y compris pour les tuiles collées à C ou à S.
  const margin = 8;
  const anchorRect = anchorEl.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  let left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));
  let top = anchorRect.bottom + 8;
  if (top + tooltipRect.height > window.innerHeight - margin) {
    top = anchorRect.top - tooltipRect.height - 8; // pas assez de place en dessous : au-dessus
  }
  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
}

function renderFeuxGrid(feux) {
  const html = FEU_ORDER.map(letter => {
    let state = 'blanc';
    if (letter !== 'I' && letter !== 'N') state = feux[letter] || 'blanc';
    const picto = FEU_PICTO[state] || '–';
    const manualCls = (letter === 'N') ? ' jog-feu-cell--manual' : '';
    return `
      <div class="jog-feu-cell jog-feu-cell--${state}${manualCls} jog-feu-anim" data-code="${letter}" tabindex="0">
        <span class="jog-feu-letter">${letter}</span>
        <span class="jog-feu-icon">${picto}</span>
      </div>
    `;
  }).join('');
  const grid = document.getElementById('jog-feux-grid');
  grid.innerHTML = html;

  grid.querySelectorAll('.jog-feu-cell').forEach(cell => {
    cell.addEventListener('mouseenter', () => showFeuTooltip(cell));
    cell.addEventListener('mouseleave', closeFeuTooltip);
    cell.addEventListener('focus', () => showFeuTooltip(cell));
    cell.addEventListener('blur', closeFeuTooltip);
    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      showFeuTooltip(cell);
    });
  });
}

/* ── Écran de correction ──────────────────────────────────────────────────── */

function renderCorrectionScreen(text, correction, isFinal, feux) {
  const { html, erreurs } = highlightText(text, correction.erreurs || []);

  const textEl = document.getElementById('jog-correction-text');
  textEl.innerHTML = html;
  textEl.onclick = (e) => {
    const span = e.target.closest('.jog-highlight');
    if (!span) { closeBubble(); return; }
    const idx = Number(span.dataset.idx);
    const erreur = erreurs[idx];
    const label = CODE_LABELS[erreur.code] || erreur.code;
    showBubble(span, `${erreur.code} · ${escapeHtml(label)}`, JoggingMessages.getMessage(erreur, isFinal));
  };

  renderFeuxGrid(feux);

  // Message de progrès entre versions : calculé côté front à partir des
  // données déjà stockées, aucun appel externe (§4.6/§4 Retenues n°5).
  const erreurCount = (correction.erreurs || []).length;
  let progressMsg = '';
  if (prevErrorCount !== null && erreurCount < prevErrorCount) {
    progressMsg = `Bravo, tu es passé de ${prevErrorCount} erreur${prevErrorCount > 1 ? 's' : ''} à ${erreurCount} !`;
  }
  document.getElementById('jog-progress-msg').textContent = progressMsg;
  prevErrorCount = erreurCount;

  const actionsEl = document.getElementById('jog-correction-actions');
  if (isFinal) {
    actionsEl.innerHTML = `
      <div style="text-align:center;width:100%;">
        <div class="jog-final-message">🎉 Jogging terminé !</div>
        <button type="button" id="jog-carnet-add-btn" class="jog-carnet-add-btn" style="margin-top:12px;">⭐ Ajouter à mon carnet</button>
        <div style="margin-top:12px;">
          <a href="redaction.html" class="btn-secondary" style="display:inline-flex;">← Retour au catalogue</a>
        </div>
      </div>
    `;
    setupCarnetButton();
  } else {
    actionsEl.innerHTML = `<button class="btn-secondary" id="jog-rewrite-btn">✍️ Réécrire ma version suivante</button>`;
    document.getElementById('jog-rewrite-btn').addEventListener('click', () => showEditorState());
  }
}

/* ── Session déjà terminée (revisite) : dernière version en lecture seule ──── */

async function showCompletedState() {
  const { data: versions } = await window.lfmDb
    .from('jogging_versions')
    .select('text, correction')
    .eq('session_id', sessionRow.id)
    .order('version_number', { ascending: false })
    .limit(1);

  const last = versions && versions[0];
  if (last) {
    renderCorrectionScreen(last.text, last.correction, true, last.correction.feux || {});
    showState('correction');
  } else {
    showEditorState();
  }
}

/* ── Initialisation ───────────────────────────────────────────────────────── */

(async function init() {
  const id = new URLSearchParams(window.location.search).get('id');
  const baseJogging = id ? JOGGING_DATA[id] : null;

  if (!baseJogging) {
    Breadcrumb.setCurrent('Jogging introuvable');
    document.getElementById('jog-state-loading').textContent = "Ce jogging n'existe pas.";
    return;
  }

  // Précharge le moteur/dictionnaire Grammalecte dès l'arrivée sur la page,
  // en parallèle de l'auth et de la session, pour que la 1re correction de
  // l'élève n'attende pas ce chargement (§3.11/§3.12).
  const grammalectePreload = JoggingGrammalecte.preload().catch(() => null);

  const profile = await lfmAuth.requireRole('eleve');
  if (!profile) return;

  // Personnalisation par classe + verrouillage en parcours guidé (Phase 4,
  // §5.8). Le blocage réel contre un accès direct par URL est garanti côté
  // RLS (is_jogging_locked_for_student) ; ce contrôle client évite juste
  // d'afficher l'éditeur avant l'échec d'écriture.
  let resolved = null;
  try {
    if (typeof JoggingClassSettings !== 'undefined') {
      resolved = await JoggingClassSettings.resolve(baseJogging.id);
    }
  } catch (e) {
    // repli : catalogue par défaut, jamais verrouillé
  }
  jogging = resolved ? resolved.jogging : baseJogging;

  if (resolved && resolved.locked) {
    Breadcrumb.setCategory({ href: 'redaction.html', label: 'Rédaction' });
    Breadcrumb.setCurrent('Jogging non disponible');
    document.title = "Jogging non disponible — Rédaction — Lycée Français de Madrid";
    document.getElementById('jog-state-loading').innerHTML =
      "<div style='text-align:center;padding:40px 0'>" +
      "<p style='font-size:40px;margin-bottom:12px'>🔒</p>" +
      "<p style='font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px'>Ce jogging n'est pas encore disponible</p>" +
      "<p style='font-size:14px;color:var(--muted)'>Ton enseignant l'activera plus tard.<br>" +
      "<a href='redaction.html' style='color:var(--blue);font-weight:700;'>← Retour au catalogue</a></p>" +
      "</div>";
    return;
  }

  renderHeader(jogging);
  Breadcrumb.setCategory({ href: 'redaction.html', label: 'Rédaction' });
  Breadcrumb.setCurrent(jogging.title);

  const { data: existing, error: selErr } = await window.lfmDb
    .from('jogging_sessions')
    .select('*')
    .eq('student_id', profile.id)
    .eq('jogging_id', jogging.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (selErr) {
    // Sans ce contrôle, un échec réseau transitoire ici (existing resterait
    // undefined même si une session existe déjà) tombait dans la branche de
    // création ci-dessous et dupliquait la session de l'élève pour ce jogging.
    document.getElementById('jog-state-loading').textContent = 'Impossible de démarrer ce jogging. Réessaie dans un instant.';
    return;
  }

  if (existing) {
    sessionRow = existing;
  } else {
    const { data: created, error: insErr } = await window.lfmDb
      .from('jogging_sessions')
      .insert({ student_id: profile.id, jogging_id: jogging.id, status: 'in_progress', current_version: 1, draft_text: '' })
      .select()
      .single();
    if (insErr || !created) {
      document.getElementById('jog-state-loading').textContent = 'Impossible de démarrer ce jogging. Réessaie dans un instant.';
      return;
    }
    sessionRow = created;
  }

  bindEditorEvents();

  if (sessionRow.status === 'completed') {
    await showCompletedState();
  } else {
    showEditorState();
  }

  await grammalectePreload; // ne bloque pas l'affichage, juste le futur clic "Corriger"
})();

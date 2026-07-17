/* ─────────────────────────────────────────────────────────────────────────────
   skill-badges.js — Badge "compétence validée" sur les cartes des hubs de
   notions (français-conjugaison.html, mathématiques-fractions.html, ...).
   Dépend de : supabase-client.js (window.lfmDb), auth.js (lfmAuth),
               exercise-data.js (EXERCISE_DATA)

   Un exercice est "validé" si, pour CHAQUE niveau distinct qu'il comporte
   (EXERCISE_DATA[slug].paliers — nombre réel de paliers du moteur, pas les
   labels pédagogiques CM1/CM2/6e), il existe au moins un résultat avec
   pct >= 80 dans exercise_results pour l'élève connecté. Les exercices
   mono-palier n'ont besoin que d'une seule réussite.

   sessionStorage n'est jamais utilisé comme source (postes partagés) : tout
   vient d'une unique requête exercise_results, calculée côté client. Aucun
   badge — jamais bloquant — pour un visiteur non connecté, une requête en
   échec, ou un slug absent des cartes de la page.
   ───────────────────────────────────────────────────────────────────────────── */

const SKILL_BADGE_SUCCESS_THRESHOLD = 80;

/* ── Clé de niveau normalisée (même logique que laurels.js/laurelLevelKey,
   dupliquée ici car laurels.js n'est pas chargé sur les pages hub) ────────── */
function skillBadgeLevelKey(levelValue) {
  if (levelValue === null || levelValue === undefined || levelValue === '') return '1';
  const str = String(levelValue).trim();

  const niveauMatch = str.match(/niveau\s*(\d+)/i);
  if (niveauMatch) return niveauMatch[1];

  const CANONICAL_GRADE = { cm1: '1', cm2: '2', '6e': '3' };
  const grade = CANONICAL_GRADE[str.toLowerCase()];
  if (grade) return grade;

  const asNumber = Number(str);
  if (!Number.isNaN(asNumber) && asNumber > 0) return String(Math.round(asNumber));

  return str.toLowerCase();
}

/* Nombre de paliers requis pour valider un slug absent de EXERCISE_DATA
   (pages autonomes hors moteur générique) : 1, comme laurels.js. */
function skillBadgeTotalLevels(slug) {
  const ex = (typeof EXERCISE_DATA !== 'undefined') ? EXERCISE_DATA[slug] : null;
  return (ex && typeof ex.paliers === 'number' && ex.paliers >= 1) ? ex.paliers : 1;
}

/* ── Requête unique exercise_results pour l'élève connecté ─────────────────── */
async function fetchSkillBadgeValidatedSlugs(studentId) {
  const { data, error } = await window.lfmDb
    .from('exercise_results')
    .select('exercise_slug, level, pct')
    .eq('student_id', studentId)
    .limit(2000);

  if (error) {
    console.warn('[SkillBadges] fetchSkillBadgeValidatedSlugs:', error.message);
    return new Set();
  }

  const levelKeysBySlug = new Map(); /* slug -> Set<levelKey> */
  (data || []).forEach(row => {
    const pct = parseFloat(row.pct);
    if (pct < SKILL_BADGE_SUCCESS_THRESHOLD) return;

    let keys = levelKeysBySlug.get(row.exercise_slug);
    if (!keys) {
      keys = new Set();
      levelKeysBySlug.set(row.exercise_slug, keys);
    }
    keys.add(skillBadgeLevelKey(row.level));
  });

  const validated = new Set();
  levelKeysBySlug.forEach((keys, slug) => {
    if (keys.size >= skillBadgeTotalLevels(slug)) validated.add(slug);
  });
  return validated;
}

function renderSkillValidatedBadgeHTML() {
  return '<span class="skill-card-validated-badge" title="Compétence validée !" aria-label="Compétence validée !">🏅</span>';
}

/* ── Point d'entrée : à appeler après l'injection des cartes dans le DOM ──── */
async function applySkillValidationBadges() {
  const cards = document.querySelectorAll('.skill-card[data-exercise-slug]');
  if (!cards.length || !window.lfmDb || typeof lfmAuth === 'undefined') return;

  try {
    const session = await lfmAuth.getSession();
    if (!session) return;

    const validated = await fetchSkillBadgeValidatedSlugs(session.user.id);
    if (!validated.size) return;

    cards.forEach(card => {
      if (validated.has(card.dataset.exerciseSlug)) {
        card.insertAdjacentHTML('beforeend', renderSkillValidatedBadgeHTML());
      }
    });
  } catch (err) {
    console.warn('[SkillBadges] applySkillValidationBadges:', err.message);
  }
}

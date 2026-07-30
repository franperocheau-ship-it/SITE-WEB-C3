/* ─────────────────────────────────────────────────────────────────────────────
   laurels.js — Gamification "lauriers" du tableau de bord élève (onglet
   "Mes résultats"). Tout est calculé côté client depuis exercise_results,
   aucune migration Supabase.

   Dépend de : supabase-client.js (window.lfmDb)
               exercise-data.js    (EXERCISE_DATA, global)
               js/exercise-catalog.js (EXERCISE_CATALOG_AUTONOMOUS, global)
   ───────────────────────────────────────────────────────────────────────────── */

const LAUREL_SUCCESS_THRESHOLD = 80;   /* % minimum pour gagner une feuille */
const LAUREL_LEAVES_PER_CROWN  = 20;   /* feuilles pour compléter une couronne */

const LAUREL_RANKS = [
  { name: 'Novicius',     min: 0,   color: '#9AA3B2', fr: 'Novice' },
  { name: 'Discipulus',   min: 20,  color: '#1DBFA0', fr: 'Disciple' },
  { name: 'Scholasticus', min: 40,  color: '#1A2D6B', fr: 'Érudit' },
  { name: 'Magister',     min: 80,  color: '#7C5CBF', fr: 'Maître' },
  { name: 'Laureatus',    min: 120, color: '#F5A623', fr: 'Lauréat' }
];

const LAUREL_BADGE_TIERS = [
  { tier: 'or',      min: 25 },
  { tier: 'argent',  min: 12 },
  { tier: 'bronze',  min: 5 }
];

/* ── Icônes dorées par sous-domaine (assets/Badges dores/) ────────────────
   Notions sans fichier dédié (Grammaire, Lecture, Lexique) : pas d'entrée
   ici, renderLaurelBadges() retombe alors sur l'emoji 🏅/🔒 générique. ──── */
const LAUREL_BADGE_ICONS = {
  'Conjugaison':      'assets/Badges dores/conj doré.png',
  'Orthographe':      'assets/Badges dores/orthographe doré.png',
  'Fractions':        'assets/Badges dores/fraction doré.png',
  'Nombres décimaux': 'assets/Badges dores/décimaux doré.png',
  'Nombres entiers':  'assets/Badges dores/nombres entiers dorés.png',
  'Probabilités':     'assets/Badges dores/probabilité doré.png',
  'Algèbre':          'assets/Badges dores/algèbre doré.png'
};

/* ── Table de correspondance slug → domaine/notion ────────────────────────────
   Réplique la logique de buildExerciseTree() (pilotage-enseignant.html) :
   - EXERCISE_DATA : la notion est le préfixe de `competence` avant " — "
   - EXERCISE_CATALOG_AUTONOMOUS : la notion est le champ `subCategory`
   Un slug absent des deux catalogues n'est rattaché à aucun domaine (il compte
   quand même pour la couronne/le rang, mais pas pour un badge). ────────────── */
function buildLaurelNotionMap() {
  const map = new Map();

  if (typeof EXERCISE_DATA !== 'undefined') {
    Object.keys(EXERCISE_DATA).forEach(slug => {
      const ex = EXERCISE_DATA[slug];
      const sepIdx = ex.competence.indexOf(' — ');
      const notion = sepIdx !== -1 ? ex.competence.slice(0, sepIdx) : ex.competence;
      map.set(slug, { domaine: ex.domaine, notion });
    });
  }

  if (typeof EXERCISE_CATALOG_AUTONOMOUS !== 'undefined') {
    EXERCISE_CATALOG_AUTONOMOUS.forEach(({ slug, category, subCategory }) => {
      map.set(slug, { domaine: category, notion: subCategory });
    });
  }

  return map;
}

/* ── Clé de niveau normalisée, pour compter les niveaux DISTINCTS réussis ────
   Le format stocké varie selon le type d'exercice : "Niveau N" (majorité des
   exercices du moteur générique), "CM1"/"CM2"/"6e" (flux historique), ou un
   nombre brut. On ne cherche plus un "palier" fixe (1/2/3) : seule compte la
   distinction entre niveaux (mode libre — l'ordre n'a pas d'importance), donc
   on normalise chaque valeur vers une position comparable ("1", "2", ...).
   Une valeur absente retombe sur "1" (rétrocompatibilité : résultats
   enregistrés avant l'ajout de la colonne `level`, ou exercices sans
   sélection de niveau). ─────────────────────────────────────────────────── */
function laurelLevelKey(levelValue) {
  if (levelValue === null || levelValue === undefined || levelValue === '') return '1';
  const str = String(levelValue).trim();

  const niveauMatch = str.match(/niveau\s*(\d+)/i);
  if (niveauMatch) return niveauMatch[1];

  const CANONICAL_GRADE = { cm1: '1', cm2: '2', '6e': '3' };
  const grade = CANONICAL_GRADE[str.toLowerCase()];
  if (grade) return grade;

  const asNumber = Number(str);
  if (!Number.isNaN(asNumber) && asNumber > 0) return String(Math.round(asNumber));

  return str.toLowerCase(); /* valeur non reconnue : traitée comme une position à part, par prudence */
}

/* Nombre réel de paliers de difficulté d'un exercice — champ `paliers` dans
   exercise-data.js, distinct de `levels` (sens pédagogique uniquement, utilisé
   par le bulletin/les badges/le catalogue). Voir audit-levels.mjs pour la
   vérification de cohérence entre les deux. */
function laurelTotalLevels(slug) {
  const ex = (typeof EXERCISE_DATA !== 'undefined') ? EXERCISE_DATA[slug] : null;
  return (ex && typeof ex.paliers === 'number' && ex.paliers >= 1) ? ex.paliers : 1;
}

/* ── État de la feuille : squelette → pleine → dorée ─────────────────────────
   - 1 seul palier : "pleine" directement, jamais dorée (l'or récompense la
     maîtrise multi-paliers, pas un simple exercice réussi).
   - 2 paliers : squelette → dorée directement (pas d'état intermédiaire).
   - 3 paliers ou plus : squelette (1 palier) → pleine (paliers intermédiaires)
     → dorée (tous réussis). ────────────────────────────────────────────── */
function laurelLeafState(distinctCount, totalLevels) {
  if (distinctCount <= 0) return null;
  if (totalLevels <= 1) return 'pleine';
  if (distinctCount >= totalLevels) return 'doree';
  if (distinctCount === 1) return 'squelette';
  return 'pleine';
}

/* ── Récupération des résultats + regroupement par exercice distinct ────────
   Pour chaque exercice_slug : l'ensemble des niveaux distincts réussis
   (pct >= 80, peu importe l'ordre — mode libre), et la date de première
   réussite (pour l'ordre des feuilles dans la couronne). Un exercice sans
   tentative réussie n'apparaît pas dans la map (pas de feuille). ─────────── */
async function fetchLaurelsResults(studentId) {
  const { data, error } = await window.lfmDb
    .from('exercise_results')
    .select('exercise_slug, pct, level, completed_at')
    .eq('student_id', studentId)
    .limit(2000);

  if (error) {
    console.warn('[Laurels] fetchLaurelsResults:', error.message);
    return new Map();
  }

  const bySlug = new Map(); /* slug -> { levelKeys: Set<string>, firstMasteredAt } */
  (data || []).forEach(row => {
    const pct = parseFloat(row.pct);
    if (pct < LAUREL_SUCCESS_THRESHOLD) return;

    const key = laurelLevelKey(row.level);
    const masteredAt = row.completed_at ? new Date(row.completed_at).getTime() : 0;
    let existing = bySlug.get(row.exercise_slug);

    if (!existing) {
      existing = { levelKeys: new Set(), firstMasteredAt: masteredAt };
      bySlug.set(row.exercise_slug, existing);
    }
    existing.levelKeys.add(key);
    existing.firstMasteredAt = Math.min(existing.firstMasteredAt, masteredAt);
  });

  return bySlug;
}

/* ── Rang courant + progression vers le suivant ──────────────────────────── */
function computeLaurelRank(totalLeaves) {
  let current = LAUREL_RANKS[0];
  let next = null;
  for (let i = 0; i < LAUREL_RANKS.length; i++) {
    if (totalLeaves >= LAUREL_RANKS[i].min) {
      current = LAUREL_RANKS[i];
      next = LAUREL_RANKS[i + 1] || null;
    }
  }
  return { current, next };
}

/* ── Géométrie de la couronne ─────────────────────────────────────────────
   Deux branches symétriques de 10 feuilles, arc ~130° chacune, ouverture
   d'environ 50° en haut (et, par symétrie, en bas). Angle mesuré depuis le
   sommet du cercle, sens horaire — voir formules de position/rotation
   dérivées ci-dessous. ────────────────────────────────────────────────── */
const LAUREL_LEAVES_PER_BRANCH = LAUREL_LEAVES_PER_CROWN / 2;
const LAUREL_BRANCH_BASE_DEG   = 155;  /* angle de la feuille de base (bas de branche) */
const LAUREL_BRANCH_TIP_DEG    = 25;   /* angle de la feuille de pointe (haut de branche) */
const LAUREL_OUTWARD_TILT_DEG  = 25;   /* inclinaison vers l'extérieur, ajoutée à la tangente */

function laurelPointOnCircle(cx, cy, r, deg, mirror) {
  const rad = deg * Math.PI / 180;
  const x = cx + (mirror ? -1 : 1) * r * Math.sin(rad);
  const y = cy - r * Math.cos(rad);
  return { x, y };
}

/* Chemin de tige : échantillonné le long du cercle (évite les pièges de
   sweep-flag d'un <path> arc SVG classique). */
function laurelStemPath(cx, cy, r, mirror) {
  const steps = 20;
  const pts = [];
  for (let s = 0; s <= steps; s++) {
    const deg = LAUREL_BRANCH_BASE_DEG + (LAUREL_BRANCH_TIP_DEG - LAUREL_BRANCH_BASE_DEG) * (s / steps);
    const { x, y } = laurelPointOnCircle(cx, cy, r, deg, mirror);
    pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

/* ── Répartition des feuilles, pour le compteur sous la couronne ────────────── */
function laurelLeafBreakdown(earnedList) {
  const total = earnedList.length;
  const gold  = earnedList.filter(e => e.state === 'doree').length;

  const parts = [`${total} feuille${total > 1 ? 's' : ''}`];
  if (gold > 0) parts.push(`dont ${gold} dorée${gold > 1 ? 's' : ''}`);

  return parts.join(' · ');
}

/* ── Rendu SVG de la couronne (cycle tous les 20, compteur si ≥ 1 complète) ──
   earnedList : exercices maîtrisés, triés par date de première réussite —
   la position dans cette liste = position de la feuille dans la couronne
   (l'apparence de la feuille suit son état courant, qui peut avancer sans
   que sa position ne bouge). Chaque feuille se (re)construit à l'affichage :
   tracé du contour/nervure, puis remplissage, puis virage à l'or si dorée —
   une seule animation CSS paramétrée par variables custom par feuille. ──── */
function renderLaurelCrown(earnedList, isGolden) {
  const totalLeaves = earnedList.length;
  const completedCrowns = Math.floor(totalLeaves > 0 ? (totalLeaves - 1) / LAUREL_LEAVES_PER_CROWN : 0);
  const filledInCycle = totalLeaves === 0
    ? 0
    : ((totalLeaves - 1) % LAUREL_LEAVES_PER_CROWN) + 1;
  const cycleEntries = earnedList.slice(completedCrowns * LAUREL_LEAVES_PER_CROWN);

  const rankLeafColor = isGolden ? '#F5A623' : '#1DBFA0';
  const rankVeinColor = isGolden ? '#C9860F' : '#0f8a71';
  const stemColor     = isGolden ? '#C9860F' : '#149378';
  const emptyColor    = '#E8EDF3';
  const center = 110;
  const radius = 76;

  const stems = `
    <path d="${laurelStemPath(center, center, radius, false)}" fill="none" stroke="${stemColor}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="${laurelStemPath(center, center, radius, true)}"  fill="none" stroke="${stemColor}" stroke-width="3.5" stroke-linecap="round"/>`;

  let leaves = '';
  for (let i = 0; i < LAUREL_LEAVES_PER_CROWN; i++) {
    const pairIdx = Math.floor(i / 2);
    const mirror  = i % 2 === 0; /* gauche puis droite, en alternance, à hauteur égale */
    const t       = pairIdx / (LAUREL_LEAVES_PER_BRANCH - 1);
    const deg     = LAUREL_BRANCH_BASE_DEG + (LAUREL_BRANCH_TIP_DEG - LAUREL_BRANCH_BASE_DEG) * t;
    const ry      = 22 - (22 - 14) * t;   /* dégressif : base plus grande, pointe plus fine */
    const rx      = ry * 0.45;

    const { x, y } = laurelPointOnCircle(center, center, radius, deg, mirror);
    /* Tangente au cercle (± selon le sens), + inclinaison vers l'extérieur */
    const rotation = mirror
      ? (90 - deg) - LAUREL_OUTWARD_TILT_DEG
      : (deg - 90) + LAUREL_OUTWARD_TILT_DEG;

    const filled = i < filledInCycle;
    const entry  = filled ? cycleEntries[i] : null;
    const state  = entry ? entry.state : null;

    if (!filled) {
      leaves += `
        <g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotation.toFixed(1)})">
          <path d="M0,${-ry} Q${rx},0 0,${ry} Q${-rx},0 0,${-ry} Z" fill="${emptyColor}" fill-opacity="0.7"/>
          <line x1="0" y1="${-ry + 3}" x2="0" y2="${ry - 3}" stroke="#d5dce6" stroke-width="1"/>
        </g>`;
      continue;
    }

    /* squelette : fill:none, contour + nervure couleur du rang.
       pleine    : remplie couleur du rang, nervure plus foncée en surimpression.
       dorée     : entièrement or, l'or prime sur la couleur du rang. */
    const finalFill = state === 'doree' ? '#F5A623' : rankLeafColor;
    const finalVein = state === 'doree' ? '#B87A0E' : rankVeinColor;
    const targetFillOpacity = state === 'squelette' ? 0 : 1;
    const delayMs = i * 40;

    const leafVars =
      `--leaf-pre-fill:${rankLeafColor};--leaf-pre-vein:${rankVeinColor};` +
      `--leaf-final-fill:${finalFill};--leaf-final-vein:${finalVein};` +
      `--leaf-fill-opacity:${targetFillOpacity};`;

    leaves += `
      <g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotation.toFixed(1)})">
        <g class="laurel-leaf laurel-leaf--filled" style="${leafVars}animation-delay:${delayMs}ms">
          <path class="laurel-leaf-shape" d="M0,${-ry} Q${rx},0 0,${ry} Q${-rx},0 0,${-ry} Z"
                fill="${finalFill}" fill-opacity="${targetFillOpacity}" stroke="${finalVein}" stroke-width="1.3"/>
          <line class="laurel-leaf-vein" x1="0" y1="${-ry + 3}" x2="0" y2="${ry - 3}" stroke="${finalVein}" stroke-width="1"/>
        </g>
      </g>`;
  }

  const counterHtml = completedCrowns > 0
    ? `<div class="laurel-crown-counter">${completedCrowns === 1 ? '1 couronne complète' : completedCrowns + ' couronnes complètes'}</div>`
    : '';
  const breakdownHtml = `<div class="laurel-leaf-breakdown">${laurelLeafBreakdown(earnedList)}</div>`;

  return `
    <div class="laurel-crown-wrap">
      <svg class="laurel-crown-svg ${isGolden ? 'laurel-crown-svg--golden' : ''}" viewBox="0 0 220 220" aria-hidden="true">
        ${stems}
        ${leaves}
        <text x="${center}" y="${center + 6}" text-anchor="middle" class="laurel-crown-count">${filledInCycle}/${LAUREL_LEAVES_PER_CROWN}</text>
      </svg>
      ${counterHtml}
      ${breakdownHtml}
    </div>`;
}

/* ── Rendu rang + barre de progression ───────────────────────────────────── */
function renderLaurelRank(totalLeaves) {
  const { current, next } = computeLaurelRank(totalLeaves);

  if (!next) {
    return `
      <div class="laurel-rank" style="color:var(--blue, #1A2D6B)">${current.name}<span class="laurel-rank-fr"> (${current.fr})</span></div>
      <div class="laurel-rank-max">Rang maximum atteint</div>`;
  }

  const span = next.min - current.min;
  const progressed = totalLeaves - current.min;
  const pct = Math.max(0, Math.min(100, Math.round((progressed / span) * 100)));
  const missing = next.min - totalLeaves;

  return `
    <div class="laurel-rank" style="color:var(--blue, #1A2D6B)">${current.name}<span class="laurel-rank-fr"> (${current.fr})</span></div>
    <div class="laurel-rank-progress-bg">
      <div class="laurel-rank-progress-fill" style="width:${pct}%;background:${current.color}"></div>
    </div>
    <div class="laurel-rank-next">Plus que ${missing} feuille${missing > 1 ? 's' : ''} pour devenir ${next.name}</div>`;
}

/* ── Rendu grille de badges de domaine ───────────────────────────────────── */
function laurelBadgeTierFor(count) {
  for (const { tier, min } of LAUREL_BADGE_TIERS) {
    if (count >= min) return tier;
  }
  return null;
}

function renderLaurelBadges(bySlug, notionMap) {
  const byNotion = new Map();

  bySlug.forEach((_info, slug) => {
    const info = notionMap.get(slug);
    if (!info) return;
    byNotion.set(info.notion, (byNotion.get(info.notion) || 0) + 1);
  });

  /* Domaines connus du catalogue, même à 0 réussite (badge grisé visible) */
  const allNotions = new Set(byNotion.keys());
  notionMap.forEach(({ notion }) => allNotions.add(notion));

  const sorted = Array.from(allNotions).sort((a, b) => a.localeCompare(b, 'fr'));

  const badgesHtml = sorted.map(notion => {
    const count = byNotion.get(notion) || 0;
    const tier = laurelBadgeTierFor(count);
    const locked = !tier;
    const iconSrc = LAUREL_BADGE_ICONS[notion];
    const iconInner = iconSrc
      ? `<img src="${encodeURI(iconSrc)}" alt="" loading="lazy">`
      : (locked ? '🔒' : '🏅');
    return `
      <div class="laurel-badge ${locked ? 'laurel-badge--locked' : 'laurel-badge--' + tier}">
        <div class="laurel-badge-icon">${iconInner}</div>
        <div class="laurel-badge-label">${notion}</div>
      </div>`;
  }).join('');

  return `<div class="laurel-badges-grid">${badgesHtml}</div>`;
}

/* ── Point d'entrée ───────────────────────────────────────────────────────── */
async function initLaurels(studentId) {
  const root = document.getElementById('laurels-root');
  if (!root || !window.lfmDb || !studentId) return;

  const bySlug = await fetchLaurelsResults(studentId);

  if (bySlug.size === 0) {
    root.innerHTML = '';
    return;
  }

  /* Ordre des feuilles = ordre de première réussite (stable d'une visite à
     l'autre) ; une réussite plus tardive à un niveau supérieur fait avancer
     l'état de la feuille sans changer sa position. */
  const earnedList = Array.from(bySlug.entries())
    .map(([slug, info]) => {
      const totalLevels = laurelTotalLevels(slug);
      const state = laurelLeafState(info.levelKeys.size, totalLevels);
      return { slug, state, firstMasteredAt: info.firstMasteredAt };
    })
    .filter(e => e.state !== null)
    .sort((a, b) => a.firstMasteredAt - b.firstMasteredAt);

  const notionMap = buildLaurelNotionMap();
  const totalLeaves = earnedList.length;
  const { current } = computeLaurelRank(totalLeaves);
  const isGolden = current.name === 'Laureatus';

  root.innerHTML = `
    <div class="laurel-section">
      ${renderLaurelCrown(earnedList, isGolden)}
      <div class="laurel-rank-block">
        ${renderLaurelRank(totalLeaves)}
      </div>
      ${renderLaurelBadges(bySlug, notionMap)}
    </div>`;

  requestAnimationFrame(() => {
    root.querySelectorAll('.laurel-leaf--filled').forEach(el => el.classList.add('laurel-leaf--animate'));
  });
}

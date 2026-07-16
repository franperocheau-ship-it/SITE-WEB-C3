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
  { name: 'Novicius',     min: 0,   color: '#9AA3B2' },
  { name: 'Discipulus',   min: 20,  color: '#1DBFA0' },
  { name: 'Scholasticus', min: 40,  color: '#1A2D6B' },
  { name: 'Magister',     min: 80,  color: '#7C5CBF' },
  { name: 'Laureatus',    min: 120, color: '#F5A623' }
];

const LAUREL_BADGE_TIERS = [
  { tier: 'or',      min: 25 },
  { tier: 'argent',  min: 12 },
  { tier: 'bronze',  min: 5 }
];

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

/* ── Résolution du palier (1/2/3) à partir de la colonne `level` ─────────────
   Le format stocké varie selon le type d'exercice : "Niveau N" (majorité des
   exercices du moteur générique), "CM1"/"CM2"/"6e" (exercices EXERCISE_DATA
   pilotés par le flux historique), ou un nombre brut. Une valeur absente ou
   non reconnue retombe sur le palier 1 (rétrocompatibilité des résultats
   enregistrés avant l'ajout de ce système). ─────────────────────────────── */
function laurelLevelTier(levelValue) {
  if (levelValue === null || levelValue === undefined || levelValue === '') return 1;
  const str = String(levelValue).trim();

  const niveauMatch = str.match(/niveau\s*(\d+)/i);
  if (niveauMatch) return Math.min(parseInt(niveauMatch[1], 10), 3);

  const CANONICAL_GRADE_TIER = { cm1: 1, cm2: 2, '6e': 3 };
  const gradeTier = CANONICAL_GRADE_TIER[str.toLowerCase()];
  if (gradeTier) return gradeTier;

  const asNumber = Number(str);
  if (!Number.isNaN(asNumber) && asNumber > 0) return Math.min(Math.round(asNumber), 3);

  return 1;
}

/* ── Récupération des résultats + regroupement par exercice distinct ────────
   Pour chaque exercice_slug : palier le plus haut parmi les tentatives
   réussies (pct >= 80), et date de première réussite (pour l'ordre des
   feuilles dans la couronne). Un exercice sans tentative réussie n'apparaît
   pas dans la map (pas de feuille). ─────────────────────────────────────── */
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

  const bySlug = new Map(); /* slug -> { tier, firstMasteredAt } */
  (data || []).forEach(row => {
    const pct = parseFloat(row.pct);
    if (pct < LAUREL_SUCCESS_THRESHOLD) return;

    const tier = laurelLevelTier(row.level);
    const masteredAt = row.completed_at ? new Date(row.completed_at).getTime() : 0;
    const existing = bySlug.get(row.exercise_slug);

    if (!existing) {
      bySlug.set(row.exercise_slug, { tier, firstMasteredAt: masteredAt });
    } else {
      existing.tier = Math.max(existing.tier, tier);
      existing.firstMasteredAt = Math.min(existing.firstMasteredAt, masteredAt);
    }
  });

  return bySlug;
}

/* ── Détection des feuilles nouvelles/surclassées depuis la dernière visite ──
   Persisté en localStorage (pas de migration Supabase pour un simple effet
   visuel). Une première visite (aucun instantané précédent) n'allume aucune
   brillance : seule une vraie évolution entre deux visites en déclenche une,
   pour éviter qu'un élève déjà avancé voie toute sa couronne s'illuminer au
   premier chargement après la mise en service de cette fonctionnalité. ───── */
function laurelDetectChanges(studentId, bySlug) {
  const key = 'laurels-seen-' + studentId;
  let previous = null;
  try {
    const raw = window.localStorage.getItem(key);
    previous = raw ? JSON.parse(raw) : null;
  } catch (_) { previous = null; }

  const changed = new Set();
  if (previous) {
    bySlug.forEach((info, slug) => {
      const prevTier = previous[slug] || 0;
      if (info.tier > prevTier) changed.add(slug);
    });
  }

  const snapshot = {};
  bySlug.forEach((info, slug) => { snapshot[slug] = info.tier; });
  try { window.localStorage.setItem(key, JSON.stringify(snapshot)); } catch (_) { /* stockage indisponible : pas de brillance, tant pis */ }

  return changed;
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

/* ── Répartition des feuilles par palier, pour le compteur sous la couronne ── */
function laurelLeafBreakdown(earnedList) {
  const total  = earnedList.length;
  const silver = earnedList.filter(e => e.tier === 2).length;
  const gold   = earnedList.filter(e => e.tier === 3).length;

  const parts = [`${total} feuille${total > 1 ? 's' : ''}`];
  const sub = [];
  if (silver > 0) sub.push(`${silver} argentée${silver > 1 ? 's' : ''}`);
  if (gold > 0)   sub.push(`${gold} dorée${gold > 1 ? 's' : ''}`);
  if (sub.length) parts.push('dont ' + sub.join(' · '));

  return parts.join(' · ');
}

/* ── Rendu SVG de la couronne (cycle tous les 20, compteur si ≥ 1 complète) ──
   earnedList : exercices maîtrisés, triés par date de première réussite —
   la position dans cette liste = position de la feuille dans la couronne
   (la couleur/apparence de la feuille suit en revanche son palier courant,
   qui peut monter sans que sa position ne bouge). ───────────────────────── */
function renderLaurelCrown(earnedList, isGolden, changedSlugs) {
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
    const tier   = entry ? entry.tier : 0;

    /* Niveau 1 : couleur du rang. Niveau 2 : même couleur + contour/nervure
       argentés. Niveau 3 : entièrement dorée, l'or prime sur le rang. */
    let fillColor, veinColor, strokeAttr;
    if (!filled) {
      fillColor = emptyColor;
      veinColor = '#d5dce6';
      strokeAttr = '';
    } else if (tier >= 3) {
      fillColor = '#F5A623';
      veinColor = '#B87A0E';
      strokeAttr = '';
    } else if (tier === 2) {
      fillColor = rankLeafColor;
      veinColor = '#C0C4CC';
      strokeAttr = ' stroke="#C0C4CC" stroke-width="1.2"';
    } else {
      fillColor = rankLeafColor;
      veinColor = rankVeinColor;
      strokeAttr = '';
    }

    const fillOpacity = filled ? 1 : 0.7; /* laisse deviner la tige sous les feuilles vides */
    const shine = filled && entry && changedSlugs.has(entry.slug);
    const leafClasses = 'laurel-leaf' + (filled ? ' laurel-leaf--filled' : '') + (shine ? ' laurel-leaf--shine' : '');
    const delayMs = i * 40;
    const animDelay = shine ? `${delayMs}ms, ${delayMs + 420}ms` : `${delayMs}ms`;

    leaves += `
      <g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotation.toFixed(1)})">
        <g class="${leafClasses}" style="animation-delay:${animDelay}">
          <path d="M0,${-ry} Q${rx},0 0,${ry} Q${-rx},0 0,${-ry} Z" fill="${fillColor}" fill-opacity="${fillOpacity}"${strokeAttr}/>
          <line x1="0" y1="${-ry + 3}" x2="0" y2="${ry - 3}" stroke="${veinColor}" stroke-width="1"/>
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
      <div class="laurel-rank" style="color:${current.color}">${current.name}</div>
      <div class="laurel-rank-max">Rang maximum atteint</div>`;
  }

  const span = next.min - current.min;
  const progressed = totalLeaves - current.min;
  const pct = Math.max(0, Math.min(100, Math.round((progressed / span) * 100)));
  const missing = next.min - totalLeaves;

  return `
    <div class="laurel-rank" style="color:${current.color}">${current.name}</div>
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
    return `
      <div class="laurel-badge ${locked ? 'laurel-badge--locked' : 'laurel-badge--' + tier}">
        <div class="laurel-badge-icon">${locked ? '🔒' : '🏅'}</div>
        <div class="laurel-badge-label">${notion}</div>
        <div class="laurel-badge-count">${count} exercice${count > 1 ? 's' : ''}</div>
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

  const changedSlugs = laurelDetectChanges(studentId, bySlug);

  /* Ordre des feuilles = ordre de première réussite (stable d'une visite à
     l'autre) ; une réussite plus tardive à un niveau supérieur relève le
     palier de la feuille sans changer sa position. */
  const earnedList = Array.from(bySlug.entries())
    .map(([slug, info]) => ({ slug, tier: info.tier, firstMasteredAt: info.firstMasteredAt }))
    .sort((a, b) => a.firstMasteredAt - b.firstMasteredAt);

  const notionMap = buildLaurelNotionMap();
  const totalLeaves = earnedList.length;
  const { current } = computeLaurelRank(totalLeaves);
  const isGolden = current.name === 'Laureatus';

  root.innerHTML = `
    <div class="laurel-section">
      ${renderLaurelCrown(earnedList, isGolden, changedSlugs)}
      <div class="laurel-rank-block">
        ${renderLaurelRank(totalLeaves)}
      </div>
      ${renderLaurelBadges(bySlug, notionMap)}
    </div>`;

  requestAnimationFrame(() => {
    root.querySelectorAll('.laurel-leaf--filled').forEach(el => el.classList.add('laurel-leaf--animate'));
  });
}

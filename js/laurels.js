/* ─────────────────────────────────────────────────────────────────────────────
   laurels.js — Gamification "lauriers" du tableau de bord élève (onglet
   "Mes résultats"). Calculé côté client depuis exercise_results, à l'exception
   du niveau de classe de l'élève (voir fetchStudentClassLevel) qui passe par
   la fonction SQL get_class_level_for_student() (migration 20260730120000).

   Dépend de : supabase-client.js (window.lfmDb)
               exercise-data.js    (EXERCISE_DATA, global)
               js/exercise-catalog.js (EXERCISE_CATALOG_AUTONOMOUS, global)
   ───────────────────────────────────────────────────────────────────────────── */

const LAUREL_SUCCESS_THRESHOLD = 80;   /* % minimum pour gagner une feuille */
const LAUREL_LEAVES_PER_CROWN  = 20;   /* feuilles pour compléter une couronne */

/* icon : fichier absent tant qu'il n'a pas été ajouté sous
   assets/Badges dores/ — ignoré silencieusement au rendu (onerror) tant
   qu'il manque, aucune coordination requise avec l'ajout de l'asset. */
const LAUREL_RANKS = [
  { name: 'Novicius',     min: 0,   color: '#9AA3B2', fr: 'Novice',   icon: 'assets/Badges dores/novicius.png' },
  { name: 'Discipulus',   min: 20,  color: '#1DBFA0', fr: 'Disciple', icon: 'assets/Badges dores/discipulus.png' },
  { name: 'Scholasticus', min: 40,  color: '#1A2D6B', fr: 'Érudit',   icon: 'assets/Badges dores/scholasticus.png' },
  { name: 'Magister',     min: 80,  color: '#7C5CBF', fr: 'Maître',   icon: 'assets/Badges dores/magister.png' },
  { name: 'Laureatus',    min: 120, color: '#F5A623', fr: 'Lauréat',  icon: 'assets/Badges dores/Laureatus.png' }
];

const LAUREL_BADGE_TIERS = [
  { tier: 'or',      min: 25 },
  { tier: 'argent',  min: 12 },
  { tier: 'bronze',  min: 5 }
];

/* ── Règle de déblocage par niveau de classe (CM1/CM2/6e) ────────────────────
   Un sous-domaine "noté" (au moins un exercice EXERCISE_DATA porte une de ces
   3 pastilles — voir buildLaurelGradedNotions) bascule sur un déblocage
   binaire : débloqué seulement quand TOUTES les compétences de ce sous-
   domaine taguées pour le niveau de classe de l'élève sont validées à ce
   niveau (voir laurelResolveNiveau + LAUREL_SUCCESS_THRESHOLD). Les
   sous-domaines sans aucune compétence taguée CM1/CM2/6e (Vocabulaire, Algèbre,
   Probabilités — qui utilise "niveau1/2/3", pas les labels de classe)
   restent sur l'ancien système de paliers par nombre d'exercices maîtrisés
   (LAUREL_BADGE_TIERS ci-dessus). ─────────────────────────────────────────── */
const LAUREL_GRADE_LEVELS = ['CM1', 'CM2', '6e'];

/* ── Icônes dorées par sous-domaine (assets/Badges dores/) ──────────────── */
const LAUREL_BADGE_ICONS = {
  'Conjugaison':      'assets/Badges dores/conj doré.png',
  'Orthographe':      'assets/Badges dores/orthographe doré.png',
  'Grammaire':        'assets/Badges dores/grammaire.png',
  'Lecture':          'assets/Badges dores/Lecture.png',
  'Vocabulaire':      'assets/Badges dores/vocabulaire doré.png',
  'Fractions':        'assets/Badges dores/fraction doré.png',
  'Nombres décimaux': 'assets/Badges dores/décimaux doré.png',
  'Nombres entiers':  'assets/Badges dores/nombres entiers dorés.png',
  'Probabilités':     'assets/Badges dores/probabilité doré.png',
  'Algèbre':          'assets/Badges dores/algèbre doré.png',
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

/* ── Sous-domaines "notés" CM1/CM2/6e, pour la règle de déblocage par niveau
   de classe ─────────────────────────────────────────────────────────────
   Seul EXERCISE_DATA porte des `levels` fiables (EXERCISE_CATALOG_AUTONOMOUS
   n'en a pas — pages autonomes hors moteur générique, voir point 7 de
   l'arbitrage). Un sous-domaine n'entre dans cette map que s'il contient au
   moins un exercice taguant explicitement CM1, CM2 ou 6e — ça exclut de
   facto Probabilités (labels "niveau1/2/3", pas les labels de classe), qui
   retombe donc naturellement sur l'ancien système de paliers, sans cas
   particulier à coder. ──────────────────────────────────────────────────── */
function buildLaurelGradedNotions() {
  const map = new Map(); /* notion -> [{ slug, levels }] */
  if (typeof EXERCISE_DATA === 'undefined') return map;

  Object.keys(EXERCISE_DATA).forEach(slug => {
    const ex = EXERCISE_DATA[slug];
    if (!ex.levels || !ex.levels.some(l => LAUREL_GRADE_LEVELS.includes(l))) return;
    const sepIdx = ex.competence.indexOf(' — ');
    const notion = sepIdx !== -1 ? ex.competence.slice(0, sepIdx) : ex.competence;
    if (!map.has(notion)) map.set(notion, []);
    map.get(notion).push({ slug, levels: ex.levels });
  });

  return map;
}

/* ── Déblocage d'un sous-domaine "noté" pour le niveau de classe de l'élève ──
   Débloqué seulement si l'élève a une classe connue ET que TOUTES les
   compétences de ce sous-domaine taguées pour ce niveau sont validées à ce
   niveau (validatedNiveauBySlug, alimenté par fetchLaurelsResults). Pas de
   repli sur l'ancien système ici (point 4 de l'arbitrage) : sans classe
   renseignée, le badge reste verrouillé. ─────────────────────────────────── */
function laurelGradedBadgeStatus(entries, studentLevel, validatedNiveauBySlug) {
  if (!studentLevel) return { locked: true, validatedCount: 0, total: 0 };

  const required = entries.filter(e => e.levels.includes(studentLevel));
  if (required.length === 0) return { locked: true, validatedCount: 0, total: 0 };

  const validatedCount = required.filter(e =>
    validatedNiveauBySlug.get(e.slug)?.has(studentLevel)
  ).length;

  return { locked: validatedCount < required.length, validatedCount, total: required.length };
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

/* ── Résolution du niveau scolaire (CM1/CM2/6e) d'une tentative ──────────────
   Même logique que resolveNiveau()/niveauForPalier() dans teacher-analytics.js
   (dupliquée ici, comme laurelLevelKey/skillBadgeLevelKey, car laurels.js n'a
   pas de dépendance sur ce fichier) : la position de palier (laurelLevelKey)
   est répartie proportionnellement sur les labels pédagogiques `levels` de
   l'exercice, ancrée aux deux extrémités. Renvoie null si l'exercice n'a pas
   de `levels` déclarés (pages autonomes hors moteur générique). ──────────── */
function laurelNiveauForPalier(palierIdx, totalPaliers, levels) {
  const L = levels.length;
  if (L === 0) return null;
  if (L === 1) return levels[0];
  const idx = totalPaliers <= 1 ? 0 : Math.round((palierIdx - 1) * (L - 1) / (totalPaliers - 1));
  return levels[Math.min(Math.max(idx, 0), L - 1)];
}

function laurelResolveNiveau(ex, levelValue) {
  if (!ex || !ex.levels || ex.levels.length === 0) return null;
  const paliers = typeof ex.paliers === 'number' && ex.paliers >= 1 ? ex.paliers : 1;
  const palierIdx = parseInt(laurelLevelKey(levelValue), 10);
  const safeIdx = Number.isFinite(palierIdx) && palierIdx > 0 ? palierIdx : 1;
  return laurelNiveauForPalier(safeIdx, paliers, ex.levels);
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
   tentative réussie n'apparaît pas dans la map (pas de feuille).
   validatedNiveauBySlug (même seuil, même passage) : slug -> Set des labels
   CM1/CM2/6e validés à ce niveau scolaire précis (laurelResolveNiveau) — sert
   à la règle de déblocage des badges par niveau de classe. ───────────────── */
async function fetchLaurelsResults(studentId) {
  const { data, error } = await window.lfmDb
    .from('exercise_results')
    .select('exercise_slug, pct, level, completed_at')
    .eq('student_id', studentId)
    .limit(2000);

  if (error) {
    console.warn('[Laurels] fetchLaurelsResults:', error.message);
    return { bySlug: new Map(), validatedNiveauBySlug: new Map() };
  }

  const bySlug = new Map(); /* slug -> { levelKeys: Set<string>, firstMasteredAt } */
  const validatedNiveauBySlug = new Map(); /* slug -> Set<'CM1'|'CM2'|'6e'> */

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

    const ex = typeof EXERCISE_DATA !== 'undefined' ? EXERCISE_DATA[row.exercise_slug] : null;
    const niveau = laurelResolveNiveau(ex, row.level);
    if (niveau) {
      let niveaux = validatedNiveauBySlug.get(row.exercise_slug);
      if (!niveaux) {
        niveaux = new Set();
        validatedNiveauBySlug.set(row.exercise_slug, niveaux);
      }
      niveaux.add(niveau);
    }
  });

  return { bySlug, validatedNiveauBySlug };
}

/* ── Niveau de classe (CM1/CM2/6e) de l'élève ─────────────────────────────
   Passe par get_class_level_for_student() (SECURITY DEFINER, migration
   20260730120000) plutôt que par une requête directe sur classes : un élève
   n'a aucune policy SELECT sur classes en dehors de class_memberships (jamais
   alimentée dans ce projet), et un enseignant consultant la fiche d'un autre
   élève n'est pas cet élève. La fonction gère les deux cas (élève lui-même
   via auth.uid(), ou son enseignant via is_my_student()) côté serveur. */
async function fetchStudentClassLevel(studentId) {
  const { data, error } = await window.lfmDb.rpc('get_class_level_for_student', {
    p_student_id: studentId
  });

  if (error) {
    console.warn('[Laurels] fetchStudentClassLevel:', error.message);
    return null;
  }
  return data || null;
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
function renderLaurelCrown(earnedList, isGolden, targetRank) {
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

  /* Centre de la couronne : tant qu'un rang suivant reste à valider, le
     badge du rang EN COURS s'affiche désaturé (pas encore totalement acquis,
     couronne en cours de remplissage) à la place du décompte de feuilles.
     Au rang maximum (pas de rang suivant), on garde l'ancien compteur
     "X/20". Image manquante (rang pas encore illustré) → masquée
     silencieusement via onerror, pas d'icône cassée.
     Taille calée sur la zone libre au cœur de la couronne (rayon des tiges
     moins la profondeur des feuilles, ry max 22) : ~2.5x l'ancien médaillon,
     sans chevaucher les feuilles ni déborder — proportionnel au reste du
     SVG donc identique en mobile (viewBox mis à l'échelle). */
  const centerSize = 132;
  const centerHalf = centerSize / 2;
  const centerContent = targetRank
    ? `<image class="laurel-crown-count laurel-crown-target" href="${encodeURI(targetRank.icon)}"
        x="${(center - centerHalf).toFixed(1)}" y="${(center - centerHalf).toFixed(1)}"
        width="${centerSize}" height="${centerSize}" onerror="this.style.display='none'"><title>Rang en cours : ${targetRank.name}</title></image>`
    : `<text x="${center}" y="${center + 6}" text-anchor="middle" class="laurel-crown-count">${filledInCycle}/${LAUREL_LEAVES_PER_CROWN}</text>`;

  return `
    <div class="laurel-crown-wrap">
      <svg class="laurel-crown-svg ${isGolden ? 'laurel-crown-svg--golden' : ''}" viewBox="0 0 220 220" aria-hidden="true">
        ${stems}
        ${leaves}
        ${centerContent}
      </svg>
      ${counterHtml}
      ${breakdownHtml}
    </div>`;
}

/* ── Frise des rangs déjà validés (couleur pleine, distincte du badge grisé
   au centre de la couronne qui lui représente le rang PAS ENCORE obtenu) ─── */
function renderLaurelRanksAchieved(totalLeaves) {
  const { current } = computeLaurelRank(totalLeaves);
  const achieved = LAUREL_RANKS.filter(r => r.min < current.min);
  if (achieved.length === 0) return '';

  const items = achieved.map(r => `
    <button type="button" class="laurel-ranks-item" title="${r.name} (${r.fr})" onclick="laurelOpenRankModal('${r.name}')">
      <img src="${encodeURI(r.icon)}" alt="${r.name}" loading="lazy" onerror="this.parentElement.style.display='none'">
      <span class="laurel-ranks-item-label">${r.name}</span>
    </button>`).join('');

  return `<div class="laurel-ranks-frise">${items}</div>`;
}

/* ── Modale "badge en grand" (ouverte au clic sur un rang de la frise) ──────
   Un seul élément partagé, injecté dans <body> à la demande (indépendant du
   cycle de rendu de #laurels-root, qui peut être recréé à chaque changement
   d'élève côté enseignant). ─────────────────────────────────────────────── */
function laurelEnsureRankModal() {
  if (document.getElementById('laurel-rank-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'laurel-rank-modal';
  modal.className = 'laurel-rank-modal';
  modal.innerHTML = `
    <div class="laurel-rank-modal-backdrop"></div>
    <div class="laurel-rank-modal-card" role="dialog" aria-modal="true" aria-labelledby="laurel-rank-modal-name">
      <button type="button" class="laurel-rank-modal-close" aria-label="Fermer">&times;</button>
      <img class="laurel-rank-modal-img" src="" alt="">
      <div id="laurel-rank-modal-name" class="laurel-rank-modal-name"></div>
      <div class="laurel-rank-modal-fr"></div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector('.laurel-rank-modal-backdrop').addEventListener('click', laurelCloseRankModal);
  modal.querySelector('.laurel-rank-modal-close').addEventListener('click', laurelCloseRankModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') laurelCloseRankModal();
  });
}

function laurelOpenRankModal(rankName) {
  const rank = LAUREL_RANKS.find(r => r.name === rankName);
  if (!rank) return;

  laurelEnsureRankModal();
  const modal = document.getElementById('laurel-rank-modal');
  modal.querySelector('.laurel-rank-modal-img').src = encodeURI(rank.icon);
  modal.querySelector('.laurel-rank-modal-img').alt = rank.name;
  modal.querySelector('.laurel-rank-modal-name').textContent = rank.name;
  modal.querySelector('.laurel-rank-modal-fr').textContent = `(${rank.fr})`;
  modal.classList.add('laurel-rank-modal--open');
}

function laurelCloseRankModal() {
  document.getElementById('laurel-rank-modal')?.classList.remove('laurel-rank-modal--open');
}

/* ── Rendu rang + barre de progression ───────────────────────────────────── */
function renderLaurelRank(totalLeaves) {
  const { current, next } = computeLaurelRank(totalLeaves);
  const risenHtml = renderLaurelRanksAchieved(totalLeaves);

  if (!next) {
    return `
      <div class="laurel-rank" style="color:var(--blue, #1A2D6B)">${current.name}<span class="laurel-rank-fr"> (${current.fr})</span></div>
      <div class="laurel-rank-max">Rang maximum atteint</div>
      ${risenHtml}`;
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
    <div class="laurel-rank-next">Plus que ${missing} feuille${missing > 1 ? 's' : ''} pour devenir ${next.name}</div>
    ${risenHtml}`;
}

/* ── Rendu grille de badges de domaine ───────────────────────────────────── */
function laurelBadgeTierFor(count) {
  for (const { tier, min } of LAUREL_BADGE_TIERS) {
    if (count >= min) return tier;
  }
  return null;
}

function renderLaurelBadges(bySlug, notionMap, gradedNotions, studentLevel, validatedNiveauBySlug) {
  const byNotion = new Map();

  bySlug.forEach((_info, slug) => {
    const info = notionMap.get(slug);
    if (!info) return;
    byNotion.set(info.notion, (byNotion.get(info.notion) || 0) + 1);
  });

  /* Domaines connus du catalogue, même à 0 réussite (badge grisé visible) */
  const allNotions = new Set(byNotion.keys());
  notionMap.forEach(({ notion }) => allNotions.add(notion));
  gradedNotions.forEach((_entries, notion) => allNotions.add(notion));

  const sorted = Array.from(allNotions).sort((a, b) => a.localeCompare(b, 'fr'));

  const badgesHtml = sorted.map(notion => {
    const gradedEntries = gradedNotions.get(notion);
    const iconSrc = LAUREL_BADGE_ICONS[notion];

    /* Sous-domaine noté CM1/CM2/6e : déblocage binaire par niveau de classe
       (voir laurelGradedBadgeStatus) — plus de paliers bronze/argent/or. */
    if (gradedEntries) {
      const { locked, validatedCount, total } = laurelGradedBadgeStatus(gradedEntries, studentLevel, validatedNiveauBySlug);
      const iconInner = iconSrc
        ? `<img src="${encodeURI(iconSrc)}" alt="" loading="lazy">`
        : (locked ? '🔒' : '🏅');
      const progressHtml = (locked && total > 0)
        ? `<div class="laurel-badge-count">${validatedCount}/${total} compétences</div>`
        : '';
      return `
        <div class="laurel-badge ${locked ? 'laurel-badge--locked' : 'laurel-badge--or'}">
          <div class="laurel-badge-icon">${iconInner}</div>
          <div class="laurel-badge-label">${notion}</div>
          ${progressHtml}
        </div>`;
    }

    /* Sous-domaine sans compétence taguée CM1/CM2/6e (Vocabulaire, Algèbre,
       Probabilités) : ancien système de paliers par nombre d'exercices
       maîtrisés, inchangé. */
    const count = byNotion.get(notion) || 0;
    const tier = laurelBadgeTierFor(count);
    const locked = !tier;
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

  const [{ bySlug, validatedNiveauBySlug }, studentLevel] = await Promise.all([
    fetchLaurelsResults(studentId),
    fetchStudentClassLevel(studentId)
  ]);

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
  const gradedNotions = buildLaurelGradedNotions();
  const totalLeaves = earnedList.length;
  const { current, next } = computeLaurelRank(totalLeaves);
  const isGolden = current.name === 'Laureatus';

  root.innerHTML = `
    <div class="laurel-section">
      ${renderLaurelCrown(earnedList, isGolden, next ? current : null)}
      <div class="laurel-rank-block">
        ${renderLaurelRank(totalLeaves)}
      </div>
      ${renderLaurelBadges(bySlug, notionMap, gradedNotions, studentLevel, validatedNiveauBySlug)}
    </div>`;

  requestAnimationFrame(() => {
    root.querySelectorAll('.laurel-leaf--filled').forEach(el => el.classList.add('laurel-leaf--animate'));
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   level-badge.js — Résout la valeur brute (hétérogène) de exercise_results.level
   en un index de niveau 1..5 et fournit le HTML de la pastille correspondante.

   La colonne `level` est alimentée par des dizaines de points d'appel
   (exercise.html + pages autonomes) avec des formats différents selon
   l'exercice : entier brut (1, 2, 3…), chaîne "Niveau N", identifiants
   "niveauN", ou identifiants métier "CM1"/"CM2"/"6e". Pour ces derniers, la
   position réelle dépend des niveaux réellement proposés par l'exercice (ex:
   accord-participe-cod ne propose que CM2/6e, donc CM2 = niveau 1, pas 2) —
   d'où la table CM_ORDER_OVERRIDES ci-dessous, dérivée des `levels` réels de
   chaque type dans exercise.html/exercise-data.js.
   ───────────────────────────────────────────────────────────────────────────── */

window.lfmLevelBadge = (() => {
  const CM_ORDER_DEFAULT = { 'CM1': 1, 'CM2': 2, '6e': 3 };

  /* Seul accord-participe-cod diverge de l'ordre CM1→CM2→6e par défaut
     (ses deux niveaux réels sont CM2 puis 6e). */
  const CM_ORDER_OVERRIDES = {
    'accord-participe-cod': { 'CM2': 1, '6e': 2 }
  };

  const CLASS_BY_INDEX = { 1: 'badge-cm1', 2: 'badge-cm2', 3: 'badge-6e' };
  const COLOR_BY_INDEX = { 4: '#E0765C', 5: '#7C5CBF' };

  function resolveIndex(rawLevel, exerciseType) {
    if (rawLevel === null || rawLevel === undefined || rawLevel === '') return null;

    if (typeof rawLevel === 'number' && Number.isInteger(rawLevel)) return rawLevel;

    const str = String(rawLevel).trim();
    if (!str) return null;

    if (/^\d+$/.test(str)) return Number(str);

    let m = str.match(/^Niveau\s+(\d+)$/i);
    if (m) return Number(m[1]);

    m = str.match(/^niveau(\d)$/i);
    if (m) return Number(m[1]);

    const order = CM_ORDER_OVERRIDES[exerciseType] || CM_ORDER_DEFAULT;
    if (Object.prototype.hasOwnProperty.call(order, str)) return order[str];

    return null;
  }

  /** Retourne le HTML d'une pastille "Niveau N", ou '' si non résolvable. */
  function html(rawLevel, exerciseType) {
    const idx = resolveIndex(rawLevel, exerciseType);
    if (!idx) return '';

    const cls = CLASS_BY_INDEX[idx];
    if (cls) return `<span class="badge ${cls}">Niveau ${idx}</span>`;

    const color = COLOR_BY_INDEX[idx];
    if (!color) return '';
    return `<span class="badge" style="background:${color};color:#fff">Niveau ${idx}</span>`;
  }

  return { resolveIndex, html };
})();

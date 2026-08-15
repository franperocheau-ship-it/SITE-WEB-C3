/* ─────────────────────────────────────────────────────────────────────────────
   utils.js
   Petites fonctions partagées entre plusieurs pages.
   ───────────────────────────────────────────────────────────────────────────── */

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Trie une liste d'objets par le numéro préfixant leur titre ("1. Titre",
   "10. Titre" → 1, 10, tri numérique et non alphabétique). Les titres sans
   préfixe numérique sont placés après tous les titres numérotés, triés par
   ordre alphabétique (repli cohérent). À nombre égal, ou entre deux titres
   non numérotés à égalité alphabétique, l'ordre d'origine du tableau est
   conservé (tri stable — pratique car la requête d'origine est souvent déjà
   triée par date de création). */
function sortByTitleNumber(list, titleKey = 'titre') {
  const numOf = (item) => {
    const m = String(item?.[titleKey] ?? '').match(/^\s*(\d+)\s*\./);
    return m ? parseInt(m[1], 10) : null;
  };
  return [...(list || [])].sort((a, b) => {
    const na = numOf(a), nb = numOf(b);
    if (na !== null && nb !== null) return na - nb;
    if (na !== null) return -1;
    if (nb !== null) return 1;
    return String(a[titleKey] ?? '').localeCompare(String(b[titleKey] ?? ''), 'fr', { sensitivity: 'base' });
  });
}

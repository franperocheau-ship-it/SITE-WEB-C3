/* ═══════════════════════════════════════════════════════════════════════
   Composant partagé — Fil d'Ariane élève

   Barre sticky insérée en tête de <body>, juste sous la navbar fixe :
     🏠 Mon espace › Catégorie › Titre de la page

   « Mon espace » renvoie vers l'onglet "Faire des exercices" du dashboard
   élève (dashboard-eleve.html?tab=exercices — voir la lecture du paramètre
   `tab` dans dashboard-eleve.html, prioritaire sur le dernier onglet
   mémorisé en sessionStorage). Le maillon catégorie est cliquable ; le
   dernier maillon (page courante) ne l'est jamais.

   Utilisé par les pages de catégorie (config connue au chargement, via
   render()) et par exercise.html (catégorie + titre résolus après coup à
   partir du slug, via setCategory()/setCurrent()).
   ═══════════════════════════════════════════════════════════════════════ */

const Breadcrumb = (() => {
  const HOME_HREF = 'dashboard-eleve.html?tab=exercices';

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * @param {object}  [config]
   * @param {object}  [config.category] { href, label } — maillon cliquable. Omis si absent (ex: sur une page de catégorie elle-même).
   * @param {string}  [config.current]  Libellé du dernier maillon (page en cours), non cliquable.
   */
  function render(config = {}) {
    const { category = null, current = '' } = config;

    const bar = document.createElement('div');
    bar.className = 'bc-bar';
    bar.innerHTML = `
      <div class="bc-inner">
        <a href="${HOME_HREF}" class="bc-home">🏠 <span class="bc-home-label">Mon espace</span></a>
        <span class="bc-sep" id="bc-sep-cat"${category ? '' : ' hidden'}>›</span>
        <a class="bc-link" id="bc-link" href="${category ? category.href : '#'}"${category ? '' : ' hidden'}>${category ? escapeHTML(category.label) : ''}</a>
        <span class="bc-sep" id="bc-sep-cur"${current ? '' : ' hidden'}>›</span>
        <span class="bc-current" id="bc-current"${current ? '' : ' hidden'}>${escapeHTML(current)}</span>
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /** À appeler après render() une fois la catégorie connue (ex: après résolution du slug dans exercise.html). */
  function setCategory(category) {
    const link = document.getElementById('bc-link');
    const sep  = document.getElementById('bc-sep-cat');
    if (!link || !sep || !category) return;
    link.href        = category.href;
    link.textContent = category.label;
    link.hidden = false;
    sep.hidden  = false;
  }

  /** À appeler après render() une fois le titre de la page connu (ex: après résolution du slug dans exercise.html). */
  function setCurrent(text) {
    const el  = document.getElementById('bc-current');
    const sep = document.getElementById('bc-sep-cur');
    if (!el || !sep) return;
    el.textContent = text;
    el.hidden  = false;
    sep.hidden = false;
  }

  return { render, setCategory, setCurrent };
})();

/* ═══════════════════════════════════════════════════════════════════════
   Composant partagé — Bloc "à venir"

   Rendu d'un état "compétences pas encore construites" cohérent avec le
   design system du site (cf. mathématiques-calcul.html, page de référence).
   Insère le titre de page + le bloc "à venir" dans le conteneur donné
   (par défaut .page-content), juste après le fil d'Ariane.

   Utilisé par les pages de sous-domaine dont aucun onglet/compétence n'est
   encore construit (ex. mathématiques-proportionnalite.html).
   ═══════════════════════════════════════════════════════════════════════ */

const PageAVenir = (() => {
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * @param {object} config
   * @param {string} config.titre        Titre de la page, ex. "Géométrie" (affiché en majuscules par le CSS de .page-title).
   * @param {string} [config.icone]      Chemin de l'image d'en-tête, ex. "assets/geometrie.png".
   * @param {string} [config.emoji]      Emoji du bloc "à venir". Défaut : 🚧
   * @param {string} [config.sousTitre]  Sous-titre sous le titre de page. Défaut : "Bientôt de nouveaux exercices."
   * @param {string} [config.texte]      Texte du bloc "à venir". Défaut générique basé sur `titre`.
   * @param {Element|string} [config.container] Conteneur (élément ou sélecteur) où insérer le rendu. Défaut : .page-content
   */
  function render(config = {}) {
    const {
      titre,
      icone = '',
      emoji = '🚧',
      sousTitre = 'Bientôt de nouveaux exercices.',
      texte = `Les exercices arrivent prochainement dans cette rubrique.`,
      container = '.page-content',
    } = config;

    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="page-header page-header--a-venir">
        ${icone ? `<div class="page-header-icon"><img src="${icone}" alt="${escapeHTML(titre)}" /></div>` : ''}
        <h1 class="page-title">${escapeHTML(titre)}</h1>
        <div class="page-title-rule"></div>
        <p class="page-subtitle">${escapeHTML(sousTitre)}</p>
      </div>
      <div class="page-a-venir">
        <div class="page-a-venir-emoji">${emoji}</div>
        <div class="page-a-venir-title">${escapeHTML(titre)} — à venir</div>
        <p class="page-a-venir-text">${escapeHTML(texte)}</p>
      </div>
    `;
    el.append(...wrap.childNodes);
  }

  return { render };
})();

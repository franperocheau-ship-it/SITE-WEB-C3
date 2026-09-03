/* ═══════════════════════════════════════════════════════════════════════
   Composant partagé — Sous-navigation "Résultats"

   Barre de 5 pastilles (Général / Joggings d'écriture / Dictées préparées /
   Questionnaires de lecture / Corpus lexical) utilisée par le hub de
   résultats, côté enseignant (resultats-enseignant.html,
   resultats-joggings-enseignant.html, resultats-dictees-enseignant.html,
   resultats-questionnaires-enseignant.html, resultats-corpus-enseignant.html)
   et côté élève (dashboard-eleve.html, onglet "Mes résultats"). L'onglet
   actif est en fond navy / texte blanc ; les autres en outline gris.

   Chaque pastille pointe soit vers une page (config.items[key].href, rendu
   en <a>), soit déclenche un callback in-page (config.items[key].onClick,
   rendu en <button> — utilisé par le hub élève qui bascule les sections
   sans recharger la page).

   Usage : placer un point de montage <div id="..."></div> à l'endroit
   voulu, puis appeler render(mountEl, config). Le point de montage est
   remplacé par la barre ; l'élément retourné peut être repassé à render()
   pour re-render (ex: changement d'onglet actif côté élève).
   ═══════════════════════════════════════════════════════════════════════ */

const ResultatsNav = (() => {
  const ALL_TABS = [
    { key: 'general',        icon: '📊', label: 'Général' },
    { key: 'joggings',       icon: '✍️', label: "Joggings d'écriture" },
    { key: 'dictees',        icon: '✏️', label: 'Dictées préparées' },
    { key: 'questionnaires', icon: '📚', label: 'Questionnaires de lecture' },
    { key: 'oral',           icon: '🎧', label: 'Compréhension orale' },
    { key: 'corpus',         icon: '🔤', label: 'Corpus lexical' },
  ];

  /* Pastille "Joggings d'écriture" masquée quand le module est désactivé
     (voir js/feature-flags.js — JOGGING_ENABLED). Repli permissif si le
     flag n'est pas chargé sur la page (pastille affichée).
     `exclude` retire en plus des clés données par l'appelant (ex: pastille
     "Corpus lexical" masquée côté élève, voir dashboard-eleve.html). */
  function visibleTabs(exclude = []) {
    const joggingOn = typeof LFM_FEATURES === 'undefined' || LFM_FEATURES.isEnabled('jogging');
    return ALL_TABS
      .filter(t => joggingOn || t.key !== 'joggings')
      .filter(t => !exclude.includes(t.key));
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * @param {HTMLElement} mountEl  Point de montage — remplacé par la barre.
   * @param {object} config
   * @param {'general'|'joggings'|'dictees'|'questionnaires'|'oral'|'corpus'} config.active
   * @param {object} config.items  { general: {href}|{onClick}, joggings: {...}, dictees: {...}, questionnaires: {...}, oral: {...}, corpus: {...} }
   * @param {string[]} [config.exclude]  Clés de pastilles à ne pas afficher.
   * @returns {HTMLElement} la barre insérée (à repasser à un futur appel de render()).
   */
  function render(mountEl, config = {}) {
    const { active = 'general', items = {}, exclude = [] } = config;

    const bar = document.createElement('nav');
    bar.className = 'rn-bar';
    bar.setAttribute('aria-label', 'Navigation résultats');

    visibleTabs(exclude).forEach(tab => {
      const isActive = tab.key === active;
      const item = items[tab.key] || {};
      const el = document.createElement(item.href ? 'a' : 'button');
      el.className = 'rn-pill' + (isActive ? ' rn-pill--active' : '');
      el.innerHTML = `<span class="rn-icon">${tab.icon}</span> ${escapeHTML(tab.label)}`;
      if (item.href) {
        el.href = item.href;
      } else {
        el.type = 'button';
        if (item.onClick) el.addEventListener('click', item.onClick);
      }
      if (isActive) el.setAttribute('aria-current', 'page');
      bar.appendChild(el);
    });

    mountEl.replaceWith(bar);
    return bar;
  }

  return { render };
})();

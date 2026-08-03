/* ═══════════════════════════════════════════════════════════════════════
   Composant partagé — Fil d'Ariane élève

   Barre sticky insérée en tête de <body>, juste sous la navbar fixe :
     🏠 Mon espace › Choisir la matière › Matière › Catégorie › Titre de la page

   « Mon espace » renvoie vers l'onglet "Faire des exercices" du dashboard
   élève (dashboard-eleve.html?tab=exercices — voir la lecture du paramètre
   `tab` dans dashboard-eleve.html, prioritaire sur le dernier onglet
   mémorisé en sessionStorage). « Choisir la matière » renvoie vers
   visiteur.html (sélecteur Français/Mathématiques) et est toujours présent,
   qu'une matière ait pu être déduite ou non. Les maillons Choisir la
   matière, Matière et Catégorie sont cliquables ; le dernier maillon (page
   courante) ne l'est jamais.

   Le maillon Matière (Français / Mathématiques) est déterminé automati-
   quement à partir du libellé de la catégorie ou, à défaut, du libellé de
   la page courante (voir SUBJECT_BY_LABEL) — aucune page appelante n'a
   besoin de le préciser explicitement.

   Utilisé par les pages de catégorie (config connue au chargement, via
   render()) et par exercise.html (catégorie + titre résolus après coup à
   partir du slug, via setCategory()/setCurrent()).
   ═══════════════════════════════════════════════════════════════════════ */

const Breadcrumb = (() => {
  const HOME_HREF     = 'dashboard-eleve.html?tab=exercices';
  const CHOOSE_SUBJECT = { href: 'visiteur.html', label: 'Choisir la matière' };

  const FRANCAIS      = { href: 'français.html',      label: 'Français' };
  const MATHEMATIQUES = { href: 'mathématiques.html',  label: 'Mathématiques' };

  /* Libellé de catégorie (ou, à défaut, de page courante) → matière.
     Couvre les 22 pages où le composant est intégré (catégories Français/
     Mathématiques + libellés dynamiques de exercise.html via backLink). */
  const SUBJECT_BY_LABEL = {
    // Français
    'Orthographe':          FRANCAIS,
    "l'Orthographe":        FRANCAIS,
    'Conjugaison':          FRANCAIS,
    'Grammaire':             FRANCAIS,
    'Vocabulaire':           FRANCAIS,
    'Lecture':               FRANCAIS,
    'Rédaction':             FRANCAIS,
    // Mathématiques
    'Algèbre':               MATHEMATIQUES,
    'Calcul':                 MATHEMATIQUES,
    'Fractions':              MATHEMATIQUES,
    'Grandeurs et mesures':   MATHEMATIQUES,
    'Nombres décimaux':       MATHEMATIQUES,
    'Nombres entiers':        MATHEMATIQUES,
    'Probabilités':           MATHEMATIQUES,
  };

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /** Déduit la matière depuis la catégorie (priorité) ou, à défaut, le libellé courant. */
  function resolveSubject(category, current) {
    if (category && SUBJECT_BY_LABEL[category.label]) return SUBJECT_BY_LABEL[category.label];
    if (current && SUBJECT_BY_LABEL[current]) return SUBJECT_BY_LABEL[current];
    return null;
  }

  function applySubject(subject) {
    const link = document.getElementById('bc-link-subject');
    const sep  = document.getElementById('bc-sep-subj');
    if (!link || !sep) return;
    if (!subject) {
      link.hidden = true;
      sep.hidden  = true;
      return;
    }
    link.href        = subject.href;
    link.textContent = subject.label;
    link.hidden = false;
    sep.hidden  = false;
  }

  /**
   * @param {object}  [config]
   * @param {object}  [config.category] { href, label } — maillon cliquable. Omis si absent (ex: sur une page de catégorie elle-même).
   * @param {string}  [config.current]  Libellé du dernier maillon (page en cours), non cliquable.
   */
  function render(config = {}) {
    const { category = null, current = '' } = config;
    const subject = resolveSubject(category, current);

    const bar = document.createElement('div');
    bar.className = 'bc-bar';
    bar.innerHTML = `
      <div class="bc-inner">
        <a href="${HOME_HREF}" class="bc-home">🏠 <span class="bc-home-label">Mon espace</span></a>
        <span class="bc-sep">›</span>
        <a class="bc-link" href="${CHOOSE_SUBJECT.href}">${escapeHTML(CHOOSE_SUBJECT.label)}</a>
        <span class="bc-sep" id="bc-sep-subj"${subject ? '' : ' hidden'}>›</span>
        <a class="bc-link" id="bc-link-subject" href="${subject ? subject.href : '#'}"${subject ? '' : ' hidden'}>${subject ? escapeHTML(subject.label) : ''}</a>
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
    applySubject(resolveSubject(category, null));
  }

  /** À appeler après render() une fois le titre de la page connu (ex: après résolution du slug dans exercise.html). */
  function setCurrent(text) {
    const el  = document.getElementById('bc-current');
    const sep = document.getElementById('bc-sep-cur');
    if (!el || !sep) return;
    el.textContent = text;
    el.hidden  = false;
    sep.hidden = false;
    if (SUBJECT_BY_LABEL[text]) applySubject(resolveSubject(null, text));
  }

  return { render, setCategory, setCurrent };
})();

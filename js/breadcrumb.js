/* ═══════════════════════════════════════════════════════════════════════
   Composant partagé — Fil d'Ariane élève

   Barre sticky insérée en tête de <body>, juste sous la navbar fixe :
     🏠 Mon espace › Choisir la matière › Matière › Catégorie › Titre de la page

   « Mon espace » renvoie vers l'onglet "Faire des exercices" du dashboard
   élève (dashboard-eleve.html?tab=exercices — voir la lecture du paramètre
   `tab` dans dashboard-eleve.html, prioritaire sur le dernier onglet
   mémorisé en sessionStorage). « Choisir la matière » renvoie vers
   visiteur.html (sélecteur Français/Mathématiques) ; ce maillon n'a de sens
   qu'en mode visiteur (pas encore de compte identifié), il est donc masqué
   dès qu'une session élève/enseignant est détectée (via lfmAuth.getSession()
   — voir hideChooseSubjectIfLoggedIn()) et reste affiché sinon (visiteur
   anonyme, ou auth.js absent/pas encore chargé). Les maillons Choisir la
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
    'Proportionnalité':       MATHEMATIQUES,
    'Géométrie':              MATHEMATIQUES,
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
   * @param {object}  [config.category]    { href, label } — maillon cliquable. Omis si absent (ex: sur une page de catégorie elle-même).
   * @param {object}  [config.subcategory] { href, label } — maillon cliquable intermédiaire entre la catégorie et la page courante (ex: "Dictées préparées" entre "Orthographe" et le titre d'une dictée). Omis si absent.
   * @param {string}  [config.current]     Libellé du dernier maillon (page en cours), non cliquable.
   */
  function render(config = {}) {
    const { category = null, subcategory = null, current = '' } = config;
    const subject = resolveSubject(category, current);

    const bar = document.createElement('div');
    bar.className = 'bc-bar';
    bar.innerHTML = `
      <div class="bc-inner">
        <a href="${HOME_HREF}" class="bc-home">🏠 <span class="bc-home-label">Mon espace</span></a>
        <span class="bc-sep" id="bc-sep-choose">›</span>
        <a class="bc-link" id="bc-link-choose" href="${CHOOSE_SUBJECT.href}">${escapeHTML(CHOOSE_SUBJECT.label)}</a>
        <span class="bc-sep" id="bc-sep-subj"${subject ? '' : ' hidden'}>›</span>
        <a class="bc-link" id="bc-link-subject" href="${subject ? subject.href : '#'}"${subject ? '' : ' hidden'}>${subject ? escapeHTML(subject.label) : ''}</a>
        <span class="bc-sep" id="bc-sep-cat"${category ? '' : ' hidden'}>›</span>
        <a class="bc-link" id="bc-link" href="${category ? category.href : '#'}"${category ? '' : ' hidden'}>${category ? escapeHTML(category.label) : ''}</a>
        <span class="bc-sep" id="bc-sep-subcat"${subcategory ? '' : ' hidden'}>›</span>
        <a class="bc-link" id="bc-link-subcat" href="${subcategory ? subcategory.href : '#'}"${subcategory ? '' : ' hidden'}>${subcategory ? escapeHTML(subcategory.label) : ''}</a>
        <span class="bc-sep" id="bc-sep-cur"${current ? '' : ' hidden'}>›</span>
        <span class="bc-current" id="bc-current"${current ? '' : ' hidden'}>${escapeHTML(current)}</span>
        <span class="bc-sep" id="bc-sep-sub" hidden>›</span>
        <span class="bc-sub" id="bc-sub" hidden></span>
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);
    hideChooseSubjectIfLoggedIn();
  }

  /* Masque « Choisir la matière » dès qu'une session (élève ou enseignant)
     est détectée — ce maillon ne concerne que le visiteur anonyme. Reste
     affiché en cas d'erreur réseau (repli côté visiteur, jamais de
     rupture).

     render() est appelé par un <script> inline situé n'importe où dans le
     <body> selon les pages (parfois avant, parfois après supabase-client.js
     et auth.js dans le HTML) : `lfmAuth` peut donc ne pas encore exister au
     moment de l'appel. On attend DOMContentLoaded — qui ne se déclenche
     qu'une fois tous les <script> synchrones du document exécutés — avant
     de tester sa présence, pour ne jamais dépendre de l'ordre des balises
     d'une page à l'autre. */
  function hideChooseSubjectIfLoggedIn() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doCheck, { once: true });
    } else {
      doCheck();
    }

    async function doCheck() {
      if (typeof lfmAuth === 'undefined') return;
      try {
        const session = await lfmAuth.getSession();
        if (!session) return;
        const link = document.getElementById('bc-link-choose');
        const sep  = document.getElementById('bc-sep-choose');
        if (link) link.hidden = true;
        if (sep)  sep.hidden  = true;
      } catch (err) {
        console.warn('[Breadcrumb] hideChooseSubjectIfLoggedIn():', err.message);
      }
    }
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

  /** À appeler après render() une fois la sous-catégorie connue (ex: liste intermédiaire résolue après coup). */
  function setSubcategory(subcategory) {
    const link = document.getElementById('bc-link-subcat');
    const sep  = document.getElementById('bc-sep-subcat');
    if (!link || !sep || !subcategory) return;
    link.href        = subcategory.href;
    link.textContent = subcategory.label;
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
    if (SUBJECT_BY_LABEL[text]) applySubject(resolveSubject(null, text));
  }

  /* Maillon terminal optionnel après #bc-current — ex. champ-lexical.html,
     qui affiche le niveau en cours après le nom du champ lexical. Rien
     n'appelle setSub()/clearSub() ailleurs : sans effet sur les autres pages. */
  function setSub(text) {
    const el  = document.getElementById('bc-sub');
    const sep = document.getElementById('bc-sep-sub');
    if (!el || !sep) return;
    el.textContent = text;
    el.hidden  = false;
    sep.hidden = false;
  }

  function clearSub() {
    const el  = document.getElementById('bc-sub');
    const sep = document.getElementById('bc-sep-sub');
    if (!el || !sep) return;
    el.hidden  = true;
    sep.hidden = true;
  }

  /* Rend #bc-current cliquable (ex. revenir à l'écran de choix du niveau
     sans recharger la page) — reste un <span>, pas besoin d'un <a> : le
     clic déclenche un changement d'écran en place, pas une navigation. */
  let _currentClickHandler = null;

  function setCurrentClickable(onClick) {
    const el = document.getElementById('bc-current');
    if (!el) return;
    if (_currentClickHandler) el.removeEventListener('click', _currentClickHandler);
    _currentClickHandler = onClick;
    el.addEventListener('click', _currentClickHandler);
    el.classList.add('is-clickable');
  }

  function clearCurrentClickable() {
    const el = document.getElementById('bc-current');
    if (!el || !_currentClickHandler) return;
    el.removeEventListener('click', _currentClickHandler);
    _currentClickHandler = null;
    el.classList.remove('is-clickable');
  }

  return { render, setCategory, setSubcategory, setCurrent, setSub, clearSub, setCurrentClickable, clearCurrentClickable };
})();

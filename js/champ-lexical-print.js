/* ─────────────────────────────────────────────────────────────────────────────
   champ-lexical-print.js — Générateur d'affiche imprimable pour un champ
   lexical (module Corpus lexical, Phase 1, enseignant uniquement).

   Même mécanique que js/jogging-print.js : construit le DOM imprimable dans
   une racine cachée, bascule une classe sur <body> qui la rend visible via
   @media print (css/champ-lexical-print.css) et masque le reste de la page,
   puis déclenche window.print(). Aucune lecture Supabase ici — l'appelant
   (vocabulaire-corpus-enseignant.html) résout déjà les données.
   ───────────────────────────────────────────────────────────────────────────── */

const ChampLexicalPrint = (() => {
  const LOGO_SRC = 'assets/proficiamuspetit.png?v=9';

  const CATEGORIE_LABELS = {
    synonyme: 'Synonymes',
    antonyme: 'Antonymes',
    adjectif: 'Adjectifs associés',
    derive: 'Mots dérivés',
    expression: 'Expressions et proverbes',
    soutenu: 'Registre soutenu',
    familier: 'Registre familier'
  };

  const CATEGORIE_ACCENT = {
    synonyme: 'or', antonyme: 'or', adjectif: 'or',
    derive: 'turquoise', expression: 'turquoise',
    soutenu: 'rouge', familier: 'rouge'
  };

  // Ordre propre à l'affiche imprimée (indépendant de NIVEAU_CATEGORIES dans
  // champ-lexical-engine.js, qui pilote une progression pédagogique par
  // niveau, pas une mise en page) : expression est la seule catégorie en
  // pleine largeur (voir clp-categorie--full ci-dessous) — la placer en
  // dernier évite qu'elle ne casse une ligne de 3 colonnes en cours de
  // remplissage.
  const CATEGORIE_ORDER = ['synonyme', 'antonyme', 'adjectif', 'derive', 'soutenu', 'familier', 'expression'];

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function categorieBlockHtml(categorie, mots) {
    if (!mots || mots.length === 0) return '';
    const accent = CATEGORIE_ACCENT[categorie] || 'or';
    // Seule catégorie à porter un exemple de phrase par mot — trop long pour
    // une colonne étroite, occupe toute la largeur de la grille (voir
    // .clp-categorie--full dans champ-lexical-print.css).
    const fullCls = categorie === 'expression' ? ' clp-categorie--full' : '';
    const motsHtml = mots.map(m => `
      <div class="clp-mot">
        <span class="clp-mot-text">${escapeHtml(m.mot)}</span>
        ${m.exemple_phrase ? `<span class="clp-mot-exemple">${escapeHtml(m.exemple_phrase)}</span>` : ''}
      </div>`).join('');
    return `
      <div class="clp-categorie clp-categorie--${accent}${fullCls}">
        <div class="clp-categorie-title">${escapeHtml(CATEGORIE_LABELS[categorie] || categorie)}</div>
        <div class="clp-mots-grid">${motsHtml}</div>
      </div>`;
  }

  /* data : { corpusTitre, theme, contextualisation, motsByCategorie } où
     motsByCategorie = { synonyme: [{mot, exemple_phrase}], ... } */
  function buildPageHtml(data) {
    const categoriesHtml = CATEGORIE_ORDER
      .map(cat => categorieBlockHtml(cat, data.motsByCategorie[cat]))
      .join('');

    return `
      <div class="clp-page">
        <div class="clp-header">
          <div>
            <div class="clp-header-corpus">${escapeHtml(data.corpusTitre || '')}</div>
            <div class="clp-header-theme">${escapeHtml(data.theme)}</div>
          </div>
          <img src="${LOGO_SRC}" alt="Proficiamus" class="clp-logo">
        </div>
        ${data.contextualisation ? `<div class="clp-contexte">${escapeHtml(data.contextualisation)}</div>` : ''}
        <div class="clp-categories">${categoriesHtml}</div>
      </div>`;
  }

  function generate(data) {
    const root = document.getElementById('cl-print-root');
    if (!root || !data || !data.theme) return;

    root.innerHTML = buildPageHtml(data);
    document.body.classList.add('printing-cl-affiche');
    window.print();
    document.body.classList.remove('printing-cl-affiche');
  }

  return { generate };
})();

/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-print.js — Générateur d'export PDF pour une évaluation (module
   Évaluations, enseignant uniquement).

   Même mécanique que js/champ-lexical-print.js : construit le DOM imprimable
   dans une racine cachée, bascule une classe sur <body> qui la rend visible
   via @media print (css/evaluations-print.css) et masque le reste de la
   page, puis déclenche window.print(). Aucune lecture Supabase ici —
   l'appelant (evaluations-enseignant.html) résout déjà les données et
   ajoute enseignantNom (profil connecté, pour la ligne d'attribution sous
   le titre — plus de pied de page, voir buildPageHtml).
   ───────────────────────────────────────────────────────────────────────────── */

const EvaluationsPrint = (() => {
  const PRONOMS_CONJUGAISON = ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'];

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function critereRowHtml(critere) {
    return `
      <tr>
        <td>${escapeHtml(critere)}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>`;
  }

  /* ── Corps par type d'exercice ────────────────────────────────────────────
     Chaque fonction renvoie { groupeTeteExtra, resteHtml } : groupeTeteExtra
     rejoint la consigne dans le sous-conteneur break-inside:avoid (jamais de
     page qui se termine sur la seule consigne), resteHtml reste libre de se
     répartir entre pages. Pour les mises en page qui ne se découpent pas
     proprement ligne à ligne (tableau de classement, colonnes à relier), le
     bloc entier est mis dans groupeTeteExtra : il bascule intégralement à la
     page suivante plutôt que d'être coupé au milieu d'un tableau. */

  function corpsMarquage(ex) {
    const lignes = (ex.contenu || '').split('\n');
    const [premiereLigne, ...autresLignes] = lignes;
    const ligneHtml = ligne => `<p class="evp-exercice-ligne evp-exercice-ligne--marquage">${escapeHtml(ligne)}</p>`;
    return {
      groupeTeteExtra: ex.contenu ? ligneHtml(premiereLigne) : '',
      resteHtml: autresLignes.map(ligneHtml).join('')
    };
  }

  function corpsReecriture(ex) {
    const phrases = ex.phrases || [];
    const banqueHtml = ex.banqueMots
      ? `<div class="evp-banque-mots">${escapeHtml(ex.banqueMots)}</div>` : '';
    const phraseHtml = phrase => `
      <div class="evp-reecriture-item">
        <p class="evp-exercice-ligne evp-reecriture-phrase">${escapeHtml(phrase)}</p>
        <div class="evp-dotted-answer"></div>
      </div>`;
    const [premierePhrase, ...autresPhrases] = phrases;
    return {
      groupeTeteExtra: banqueHtml + (phrases.length ? phraseHtml(premierePhrase) : ''),
      resteHtml: autresPhrases.map(phraseHtml).join('')
    };
  }

  function corpsClassement(ex) {
    const banqueHtml = ex.banqueMots
      ? `<div class="evp-banque-mots">${escapeHtml(ex.banqueMots)}</div>` : '';
    let tableHtml;
    if (ex.utiliserTableauConjugaison) {
      const verbes = ex.verbes || [];
      /* pronoms absent (anciennes évaluations créées avant la case à cocher
         par pronom) : tous inclus, comportement identique à avant. */
      const pronoms = ex.pronoms && ex.pronoms.length ? ex.pronoms : PRONOMS_CONJUGAISON;
      tableHtml = `
        <table class="evp-grille evp-table-conjugaison">
          <thead><tr><th></th>${verbes.map(v => `<th>${escapeHtml(v)}</th>`).join('')}</tr></thead>
          <tbody>
            ${pronoms.map(p => `
              <tr><td class="evp-classement-pronom">${escapeHtml(p)}</td>${verbes.map(() => '<td></td>').join('')}</tr>
            `).join('')}
          </tbody>
        </table>`;
    } else {
      const categories = ex.categories || [];
      const nbLignes = Math.max(1, parseInt(ex.nbLignes, 10) || 5);
      tableHtml = `
        <table class="evp-grille evp-table-classement">
          <thead><tr>${categories.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
          <tbody>
            ${Array.from({ length: nbLignes }).map(() => `
              <tr>${categories.map(() => '<td></td>').join('')}</tr>
            `).join('')}
          </tbody>
        </table>`;
    }
    /* Un tableau coupé en plein milieu est bien plus illisible qu'un exercice
       texte coupé — tout le bloc reste groupé avec la consigne. */
    return { groupeTeteExtra: banqueHtml + tableHtml, resteHtml: '' };
  }

  /* ── Type Mot à transformer (grille) ──────────────────────────────────────
     Mots courts (pas des phrases) répartis en grille 2 ou 3 colonnes plutôt
     qu'une longue colonne verticale unique. Bloc entier groupé avec la
     consigne, comme les autres mises en page en grille/tableau. */
  function corpsMotGrille(ex) {
    const mots = ex.mots || [];
    const nbCol = ex.nbColonnes === 3 ? 3 : 2;
    const itemHtml = mot => `
      <div class="evp-motgrille-item">
        <span>${escapeHtml(mot)}</span>
        <span class="evp-motgrille-fleche">→</span>
        <span class="evp-motgrille-ligne"></span>
      </div>`;
    const gridHtml = `<div class="evp-motgrille-grid evp-motgrille-grid--${nbCol}col">${mots.map(itemHtml).join('')}</div>`;
    return { groupeTeteExtra: gridHtml, resteHtml: '' };
  }

  function corpsRelier(ex) {
    const gauche = ex.colonneGauche || [];
    const droite = ex.colonneDroite || [];
    /* Point collé au texte (petit gap, voir CSS) plutôt qu'à l'écart central
       — ordre du balisage différent par colonne (point après pour la
       gauche, avant pour la droite) pour que chaque point reste juste à
       côté de son mot, quelle que soit sa longueur. L'espace pour tracer le
       trait à la main vient de l'écart entre colonnes (.evp-relier-wrap). */
    const itemHtmlGauche = item => `<div class="evp-relier-item"><span>${escapeHtml(item)}</span><span class="evp-relier-dot">•</span></div>`;
    const itemHtmlDroite = item => `<div class="evp-relier-item"><span class="evp-relier-dot">•</span><span>${escapeHtml(item)}</span></div>`;
    const html = `
      <div class="evp-relier-wrap">
        <div class="evp-relier-col evp-relier-col--gauche">
          ${gauche.map(itemHtmlGauche).join('')}
        </div>
        <div class="evp-relier-col evp-relier-col--droite">
          ${droite.map(itemHtmlDroite).join('')}
        </div>
      </div>`;
    return { groupeTeteExtra: html, resteHtml: '' };
  }

  function corpsQcm(ex) {
    const questionHtml = ex.question
      ? `<p class="evp-exercice-ligne evp-qcm-question">${escapeHtml(ex.question)}</p>` : '';
    const propositions = ex.propositions || [];
    const optionHtml = prop => `<p class="evp-exercice-ligne evp-qcm-option"><span class="evp-checkbox"></span>${escapeHtml(prop)}</p>`;
    const [premiere, ...autres] = propositions;
    return {
      groupeTeteExtra: questionHtml + (propositions.length ? optionHtml(premiere) : ''),
      resteHtml: autres.map(optionHtml).join('')
    };
  }

  function corpsReponseCourte(ex) {
    const questionHtml = ex.question
      ? `<p class="evp-exercice-ligne evp-qcm-question">${escapeHtml(ex.question)}</p>` : '';
    const n = Math.max(1, parseInt(ex.nombreDeLignes, 10) || 2);
    const lignes = Array.from({ length: n }).map(() => '<div class="evp-dotted-answer"></div>');
    return {
      groupeTeteExtra: questionHtml + (lignes[0] || ''),
      resteHtml: lignes.slice(1).join('')
    };
  }

  function corpsVraiFaux(ex) {
    const affirmations = ex.affirmations || [];
    const rowHtml = a => `
      <div class="evp-vf-row">
        <span class="evp-vf-text">${escapeHtml(a)}</span>
        <span class="evp-vf-choices">Vrai <span class="evp-checkbox"></span> &nbsp; Faux <span class="evp-checkbox"></span></span>
      </div>`;
    const [premiere, ...autres] = affirmations;
    return {
      groupeTeteExtra: affirmations.length ? rowHtml(premiere) : '',
      resteHtml: autres.map(rowHtml).join('')
    };
  }

  /* ── Type Texte à trous (guidé) ───────────────────────────────────────────
     Chaque item.texte porte le repère littéral [[trou]] à la position où
     l'enseignant a cliqué "Insérer un trou" (voir evaluations-enseignant.html
     insererTrouAt), remplacé ici par un blanc — plus d'indice (retiré, cf.
     evaluations-enseignant.html). Taille du blanc commune à tout l'exercice
     (ex.tailleTrous), pas par repère individuel. Classe dédiée
     evp-trou-ligne (pas evp-exercice-ligne) : interligne propre au type,
     indépendant du blanc inline (voir CSS pour le détail du bug corrigé). */
  const TROU_MARQUEUR = '[[trou]]';

  function texteTrouHtml(item, taille) {
    const parts = (item.texte || '').split(TROU_MARQUEUR);
    let html = escapeHtml(parts[0] || '');
    for (let i = 1; i < parts.length; i++) {
      html += `<span class="evp-trou-blanc evp-trou-blanc--${taille}"></span>`;
      html += escapeHtml(parts[i]);
    }
    return html;
  }

  function corpsTexteTrous(ex) {
    const items = ex.items || [];
    const taille = ex.tailleTrous || 'moyen';
    const ligneHtml = item => `<p class="evp-trou-ligne">${texteTrouHtml(item, taille)}</p>`;
    const [premier, ...autres] = items;
    return {
      groupeTeteExtra: items.length ? ligneHtml(premier) : '',
      resteHtml: autres.map(ligneHtml).join('')
    };
  }

  /* ── Type Mots soulignés + réponse ─────────────────────────────────────────
     ex.texte porte des mots entre crochets, ex. "Le [chat] noir [dort]." —
     chacun est souligné et numéroté (exposant) dans l'ordre d'apparition,
     puis une grille de lignes de réponse numérotées est générée en dessous.
     Bloc entier (texte + grille) groupé avec la consigne — comme pour la
     grille de classement, une grille de réponses coupée en cours de ligne
     serait illisible. */
  function corpsMotsSouligne(ex) {
    const texte = ex.texte || '';
    const regex = /\[([^\]]+)\]/g;
    let match;
    let lastIndex = 0;
    let texteHtml = '';
    const mots = [];
    while ((match = regex.exec(texte)) !== null) {
      texteHtml += escapeHtml(texte.slice(lastIndex, match.index));
      mots.push(match[1]);
      texteHtml += `<span class="evp-souligne-mot">${escapeHtml(match[1])}<sup class="evp-souligne-exposant">${mots.length}</sup></span>`;
      lastIndex = regex.lastIndex;
    }
    texteHtml += escapeHtml(texte.slice(lastIndex));

    if (mots.length === 0) {
      return { groupeTeteExtra: `<p class="evp-exercice-ligne">${texteHtml}</p>`, resteHtml: '' };
    }

    const reponsesHtml = `
      <div class="evp-souligne-reponses">
        ${mots.map((_, i) => `
          <div class="evp-souligne-reponse-item">
            <span class="evp-souligne-reponse-num">${i + 1}.</span>
            <span class="evp-souligne-reponse-ligne"></span>
          </div>`).join('')}
      </div>`;

    return {
      groupeTeteExtra: `<p class="evp-exercice-ligne evp-souligne-texte">${texteHtml}</p>${reponsesHtml}`,
      resteHtml: ''
    };
  }

  const CORPS_PAR_TYPE = {
    marquage: corpsMarquage,
    reecriture: corpsReecriture,
    classement: corpsClassement,
    relier: corpsRelier,
    qcm: corpsQcm,
    texte_trous: corpsTexteTrous,
    mots_souligne: corpsMotsSouligne,
    mot_grille: corpsMotGrille,
    reponse_courte: corpsReponseCourte,
    vrai_faux: corpsVraiFaux
  };

  function exerciceBlockHtml(exercice, index) {
    const type = exercice.type || 'marquage';
    const corpsFn = CORPS_PAR_TYPE[type] || corpsMarquage;
    const { groupeTeteExtra, resteHtml } = corpsFn(exercice);

    return `
      <div class="evp-exercice">
        <div class="evp-exercice-groupe-tete">
          <div class="evp-exercice-head">
            <span class="evp-exercice-num"><span class="evp-exercice-mot">EXERCICE</span> ${index + 1} — </span><span class="evp-exercice-consigne">${escapeHtml(exercice.consigne)}</span>
          </div>
          ${groupeTeteExtra}
        </div>
        ${resteHtml}
      </div>`;
  }

  /* data : { classe, titre, criteres: [string], exercices: [...], enseignantNom } */
  function buildPageHtml(data) {
    const criteresHtml = (data.criteres || []).map(critereRowHtml).join('');
    const exercicesHtml = (data.exercices || []).map(exerciceBlockHtml).join('');

    return `
      <div class="evp-page">
        <div class="evp-bandeau">
          <div class="evp-bandeau-classe">${escapeHtml(data.classe)}</div>
          <div class="evp-bandeau-info">
            <span class="evp-bandeau-champ">Nom et prénom :<span class="evp-bandeau-ligne evp-bandeau-ligne--nom"></span></span>
            <span class="evp-bandeau-champ">Date :<span class="evp-bandeau-ligne evp-bandeau-ligne--date"></span></span>
          </div>
        </div>
        <div class="evp-filet"></div>
        <h1 class="evp-titre">${escapeHtml(data.titre)}</h1>
        ${data.enseignantNom ? `<p class="evp-attribution">Évaluation créée par ${escapeHtml(data.enseignantNom)} sur proficiamus.eu</p>` : ''}
        <div class="evp-filet"></div>
        ${criteresHtml ? `
        <table class="evp-grille evp-grille-criteres">
          <thead>
            <tr>
              <th>Critères évalués</th>
              <th>Très bonne maîtrise</th>
              <th>Maîtrise satisfaisante</th>
              <th>Fragile</th>
              <th>Insuffisante</th>
            </tr>
          </thead>
          <tbody>${criteresHtml}</tbody>
        </table>` : ''}
        ${exercicesHtml}
      </div>`;
  }

  /* Le contenu injecté ici reste display:none jusqu'à l'ajout de la classe
     body.printing-evaluation juste en dessous : tant qu'il est masqué, le
     navigateur ne priorise pas le téléchargement des polices qui n'y sont
     utilisées nulle part ailleurs sur la page (Fredoka en gras pour le
     titre, notamment). Sans attendre document.fonts.ready, window.print()
     pouvait se déclencher avant la fin du chargement et retomber sur une
     police système (accents mal rendus, graisse différente). */
  async function generate(data) {
    const root = document.getElementById('ev-print-root');
    if (!root || !data || !data.titre) return;

    root.innerHTML = buildPageHtml(data);
    document.body.classList.add('printing-evaluation');
    await document.fonts.ready;
    window.print();
    document.body.classList.remove('printing-evaluation');
  }

  return { generate, exerciceBlockHtml };
})();

/* ─────────────────────────────────────────────────────────────────────────────
   dictee-grammar-print.js — Export PDF du volet Orthographe grammaticale d'une
   dictée préparée (texte à trous, transformation, classification), à
   destination des parents (usage papier, hors écran — pas de résultat à
   enregistrer, cf. cahier des charges).

   Même mécanique que js/champ-lexical-print.js : construit le DOM imprimable
   dans une racine cachée (#dgp-print-root), bascule une classe sur <body> qui
   la rend visible via @media print (css/dictee-grammar-print.css) et masque
   le reste de la page, puis déclenche window.print(). Aucune lecture Supabase
   ici — l'appelant (dictees-enseignant.html) résout déjà les données via
   lfmDicteesTeacher.getDictee().

   Nouveauté sur ce site : le recto/verso autocorrectif (aucun précédent —
   champ-lexical-print et jogging-print ne produisent qu'une affiche
   recto simple). Chaque exercice produit une page avec un côté "recto"
   (fiche élève) et un côté "verso" (corrigé), séparés par un saut de page
   (.dgp-side.dgp-verso { page-break-before: always } dans le CSS).
   ───────────────────────────────────────────────────────────────────────────── */

const DicteeGrammarPrint = (() => {
  const LOGO_SRC = 'assets/proficiamuspetit.png?v=9';

  const TRANSFO_TYPE_LABELS = {
    singulier_pluriel: 'Réécris cette phrase au pluriel.',
    pluriel_singulier: 'Réécris cette phrase au singulier.',
    masculin_feminin: 'Réécris cette phrase au féminin.',
    feminin_masculin: 'Réécris cette phrase au masculin.',
    present_futur: 'Réécris cette phrase au futur.',
    futur_present: 'Réécris cette phrase au présent.',
    present_passe: 'Réécris cette phrase au passé.',
    passe_present: 'Réécris cette phrase au présent.'
  };

  const ACCENTS = ['or', 'turquoise', 'rouge'];

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function capitalizeFr(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

  /* Même découpage que dictees-enseignant.html (tokenizeTrouPhrase, où les
     trous sont créés) et js/dictees-engine.js (parcours élève) : `position`
     numérote uniquement les tokens-mots (lettres, \p{L}), jamais la
     ponctuation — à ne jamais faire diverger entre ces trois copies. */
  function tokenizeTrouPhrase(phrase) {
    const tokens = [];
    const re = /\p{L}+|[^\p{L}]+/gu;
    let m;
    while ((m = re.exec(phrase)) !== null) {
      tokens.push({ text: m[0], isWord: /\p{L}/u.test(m[0][0]) });
    }
    return tokens;
  }

  function shuffleForPrint(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function headerHtml(dictee, subtitle, isCorrige) {
    return `
      <div class="dgp-header">
        <div>
          <div class="dgp-header-sub">${escapeHtml(subtitle)}${isCorrige ? ' — corrigé' : ''}</div>
          <div class="dgp-header-dictee">${escapeHtml(dictee.titre)}</div>
        </div>
        <img src="${LOGO_SRC}" alt="Proficiamus" class="dgp-logo">
      </div>`;
  }

  /* ── Texte à trous ── */
  function trouSentenceHtml(trou, showAnswers) {
    const tags = (trou.dictee_trous_mots || []).slice().sort((a, b) => a.position - b.position);
    const tokens = tokenizeTrouPhrase(trou.phrase);
    let wordIdx = -1;
    const html = tokens.map(tok => {
      if (!tok.isWord) return escapeHtml(tok.text);
      wordIdx++;
      const tag = tags.find(g => g.position === wordIdx);
      if (!tag) return escapeHtml(tok.text);
      if (showAnswers) {
        return `<span class="dgp-answer-highlight">${escapeHtml(tag.mot_attendu)}</span>`;
      }
      const width = Math.max(38, tag.mot_attendu.length * 7);
      return `<span class="dgp-blank-wrap">
        <span class="dgp-blank-line" style="width:${width}pt"></span>
      </span>`;
    }).join('');
    return `<div class="dgp-trou-sentence">${html}</div>`;
  }

  function trousSideHtml(dictee, trous, showAnswers) {
    return `
      <div class="dgp-side ${showAnswers ? 'dgp-verso' : 'dgp-recto'}">
        ${headerHtml(dictee, 'Texte à trous', showAnswers)}
        ${trous.map(t => trouSentenceHtml(t, showAnswers)).join('')}
      </div>`;
  }

  /* ── Trous de conjugaison ── (exercice à part, cf. migration 20260908100000)
     Toujours l'infinitif affiché en clair avant le blanc/la réponse — même
     rendu qu'à l'écran (js/dictees-engine.js/renderTrousConjugaisonExercise) :
     ne jamais faire diverger ces deux copies. Verbe pronominal
     (tag.position_fin renseigné, cf. migration 20260909100000) : même
     logique de repli (skipRawIndex) que côté élève — le pronom et le verbe
     ne forment qu'un seul blanc/une seule réponse ("se lève"), jamais deux
     tokens séparés. */
  function trouConjSentenceHtml(trou, showAnswers) {
    const tags = (trou.dictee_trous_conjugaison_mots || []).slice().sort((a, b) => a.position - b.position);
    const tokens = tokenizeTrouPhrase(trou.phrase);
    const wordRawIndices = [];
    tokens.forEach((tok, i) => { if (tok.isWord) wordRawIndices.push(i); });
    const skipRawIndex = new Array(tokens.length).fill(false);
    tags.forEach(g => {
      const end = g.position_fin != null ? g.position_fin : g.position;
      if (end > g.position) {
        const rawStart = wordRawIndices[g.position];
        const rawEnd = wordRawIndices[end];
        for (let i = rawStart + 1; i <= rawEnd; i++) skipRawIndex[i] = true;
      }
    });

    let wordIdx = -1;
    const html = tokens.map((tok, rawIdx) => {
      if (tok.isWord) wordIdx++;
      if (skipRawIndex[rawIdx]) return '';
      if (!tok.isWord) return escapeHtml(tok.text);
      const tag = tags.find(g => g.position === wordIdx);
      if (!tag) return escapeHtml(tok.text);
      const conjHint = `<span class="dgp-conj-hint">(${escapeHtml(tag.infinitif)})</span> `;
      if (showAnswers) {
        return `${conjHint}<span class="dgp-answer-highlight">${escapeHtml(tag.mot_attendu)}</span>`;
      }
      const width = Math.max(38, tag.mot_attendu.length * 7);
      return `${conjHint}<span class="dgp-blank-wrap">
        <span class="dgp-blank-line" style="width:${width}pt"></span>
      </span>`;
    }).join('');
    return `<div class="dgp-trou-sentence">${html}</div>`;
  }

  function trousConjSideHtml(dictee, trousConj, showAnswers) {
    return `
      <div class="dgp-side ${showAnswers ? 'dgp-verso' : 'dgp-recto'}">
        ${headerHtml(dictee, 'Trous — conjugaison', showAnswers)}
        ${trousConj.map(t => trouConjSentenceHtml(t, showAnswers)).join('')}
      </div>`;
  }

  /* ── Transformation de phrase ── */
  function transfoBlockHtml(t, showAnswer) {
    const alt = showAnswer && t.phrase_attendue_alt && t.phrase_attendue_alt.length
      ? `<div class="dgp-alt-answers">Autres formulations acceptées : ${t.phrase_attendue_alt.map(escapeHtml).join(' ; ')}</div>` : '';
    return `
      <div class="dgp-transfo-block">
        <div class="dgp-transfo-depart">${escapeHtml(t.phrase_depart)}</div>
        <div class="dgp-transfo-consigne">${escapeHtml(TRANSFO_TYPE_LABELS[t.type_transformation] || '')}</div>
        ${showAnswer
          ? `<div class="dgp-answer-highlight dgp-transfo-answer">${escapeHtml(t.phrase_attendue)}</div>${alt}`
          : `<div class="dgp-transfo-lines"><span class="dgp-transfo-line"></span><span class="dgp-transfo-line"></span></div>`}
      </div>`;
  }

  function transfoSideHtml(dictee, transformations, showAnswer) {
    return `
      <div class="dgp-side ${showAnswer ? 'dgp-verso' : 'dgp-recto'}">
        ${headerHtml(dictee, 'Transformation de phrase', showAnswer)}
        ${transformations.map(t => transfoBlockHtml(t, showAnswer)).join('')}
      </div>`;
  }

  /* ── Classification par nature grammaticale ──────────────────────────────
     Format tableau (pas une carte par mot) : des dizaines de mots sont
     possibles, ce qui rendrait un deck de cartes imprimé impraticable. Recto
     = ordre mélangé (ne pas révéler la réponse par la position), verso =
     regroupé par nature avec un en-tête coloré par groupe, pour une
     correction rapide d'un coup d'œil. */
  function classificationRectoHtml(dictee, pool) {
    const shuffled = shuffleForPrint(pool);
    const rows = shuffled.map(w => `<tr><td class="dgp-table-word">${escapeHtml(w.contenu)}</td><td class="dgp-table-blank"></td></tr>`).join('');
    return `
      <div class="dgp-side dgp-recto">
        ${headerHtml(dictee, 'Classification par nature grammaticale', false)}
        <table class="dgp-table">
          <thead><tr><th>Mot</th><th>Nature grammaticale</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  function classificationVersoHtml(dictee, pool) {
    const byNature = new Map();
    pool.forEach(w => {
      if (!byNature.has(w.nature_grammaticale)) byNature.set(w.nature_grammaticale, []);
      byNature.get(w.nature_grammaticale).push(w);
    });
    const natures = [...byNature.keys()].sort((a, b) => a.localeCompare(b, 'fr'));
    const groupsHtml = natures.map((nature, i) => {
      const accent = ACCENTS[i % ACCENTS.length];
      const rows = byNature.get(nature).map(w => `<tr><td class="dgp-table-word">${escapeHtml(w.contenu)}</td></tr>`).join('');
      return `
        <table class="dgp-table dgp-table--${accent}">
          <thead><tr><th>${escapeHtml(capitalizeFr(nature))}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
    }).join('');
    return `
      <div class="dgp-side dgp-verso">
        ${headerHtml(dictee, 'Classification par nature grammaticale', true)}
        <div class="dgp-table-groups">${groupsHtml}</div>
      </div>`;
  }

  function buildPagesHtml(data) {
    const dictee = data.dictee;
    const trous = (data.trous || []).filter(t => (t.dictee_trous_mots || []).length > 0);
    const trousConj = (data.trousConjugaison || []).filter(t => (t.dictee_trous_conjugaison_mots || []).length > 0);
    const transformations = data.transformations || [];
    // Uniquement les mots saisis manuellement pour l'exercice de
    // classification — jamais les mots de la dictée de mots (data.mots),
    // même chose côté élève, cf. js/dictees-engine.js.
    const pool = (data.extraMots || []).map(m => ({ id: m.id, contenu: m.contenu, nature_grammaticale: m.nature_grammaticale }));

    let pages = '';
    if (trous.length > 0) {
      pages += `<div class="dgp-page">${trousSideHtml(dictee, trous, false)}${trousSideHtml(dictee, trous, true)}</div>`;
    }
    if (trousConj.length > 0) {
      pages += `<div class="dgp-page">${trousConjSideHtml(dictee, trousConj, false)}${trousConjSideHtml(dictee, trousConj, true)}</div>`;
    }
    if (transformations.length > 0) {
      pages += `<div class="dgp-page">${transfoSideHtml(dictee, transformations, false)}${transfoSideHtml(dictee, transformations, true)}</div>`;
    }
    if (pool.length > 0) {
      pages += `<div class="dgp-page">${classificationRectoHtml(dictee, pool)}${classificationVersoHtml(dictee, pool)}</div>`;
    }
    return pages;
  }

  function generate(data) {
    const root = document.getElementById('dgp-print-root');
    if (!root || !data || !data.dictee) return;

    const html = buildPagesHtml(data);
    if (!html) {
      alert("Cette dictée n'a aucun exercice d'orthographe grammaticale à exporter (texte à trous, trous de conjugaison, transformation ou classification).");
      return;
    }
    root.innerHTML = html;
    document.body.classList.add('printing-dgp');
    window.print();
    document.body.classList.remove('printing-dgp');
  }

  return { generate };
})();

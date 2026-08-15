/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-exercise-form.js — Éditeur d'une liste d'exercices (type +
   consigne + champs propres au type), extrait de evaluations-enseignant.html
   pour être réutilisé tel quel par le panneau admin de la banque d'items
   (evaluations-banque-admin.html) : même grille de types avec icônes, mêmes
   champs par type, même aperçu fidèle au PDF. Un exercice de banque et un
   exercice d'évaluation partagent exactement la même forme persistée (voir
   supabase/migrations/20260826100000_evaluations.sql et
   20260828100000_banque_items.sql) — un seul éditeur pour les deux.

   Dépend de : js/utils.js (escHtml), js/evaluations-print.js
   (EvaluationsPrint.exerciceBlockHtml, pour l'aperçu) — chargés par la page
   hôte, pas ici. Le CSS (.ev-ex-*, .ev-form-*, .ev-trous-*, .ev-pronoms-*)
   reste dans chaque page hôte (déjà présent dans evaluations-enseignant.html,
   copié dans evaluations-banque-admin.html) — ce module ne fait que du JS.
   ───────────────────────────────────────────────────────────────────────────── */

const EvaluationsExerciseForm = (() => {

  /* ── Types d'exercice ─────────────────────────────────────────────────
     Un exercice porte tous les champs de tous les types en état de
     formulaire (raw, non filtré) — seuls ceux du type courant sont
     affichés/édités, ce qui évite de perdre la saisie en cas d'aller-
     retour entre types. Le nettoyage (ne garder que les champs du type
     choisi, parser les listes) se fait à l'enregistrement, dans
     buildExercicePayload(). `label` = infobulle complète (title) ; `court`
     = légende affichée sous l'icône dans la grille de sélection (icônes
     réduites à 32px, pas identifiables seules sans ce texte). */
  const EXERCICE_TYPES = [
    { value: 'marquage',       label: 'Repérer dans le texte (souligner / entourer / cocher / barrer)', court: 'Repérer dans le texte' },
    { value: 'texte_trous',    label: 'Texte à trous (guidé)', court: 'Texte à trous' },
    { value: 'mots_souligne',  label: 'Mots soulignés + réponse', court: 'Mots soulignés' },
    { value: 'mot_grille',     label: 'Mot à transformer (grille)', court: 'Transformer' },
    { value: 'reecriture',     label: 'Réécriture', court: 'Réécriture' },
    { value: 'classement',     label: 'Répondre / classer dans un tableau', court: 'Classer' },
    { value: 'relier',         label: 'Relier', court: 'Relier' },
    { value: 'qcm',            label: 'QCM', court: 'QCM' },
    { value: 'reponse_courte', label: 'Réponse courte', court: 'Réponse courte' },
    { value: 'vrai_faux',      label: 'Vrai/Faux', court: 'Vrai/Faux' }
  ];

  /* Repère littéral inséré dans le champ Phrase par "+ Insérer un trou" —
     remplacé au rendu PDF par un blanc (voir js/evaluations-print.js
     texteTrouHtml). */
  const TROU_MARQUEUR = '[[trou]]';

  const PRONOMS_CONJUGAISON = ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'];

  /* ── Couleurs de critère ──────────────────────────────────────────────
     8 teintes distinctes, cohérentes avec la charte (navy/gold/turquoise
     déjà utilisés dans l'app, complétées pour couvrir tout le spectre).
     La couleur d'un critère est assignée UNE FOIS, à sa création
     (newCritere), et persistée avec lui — jamais recalculée depuis sa
     position courante dans la liste : un critère garde sa couleur quels
     que soient les réordonnements ou suppressions de ses voisins. */
  const PALETTE = ['#1A2D6B', '#1DBFA0', '#F5A623', '#D62839', '#7C3AED', '#2D9C3C', '#2563EB', '#DB2777'];

  function newCritere(criteresExistants) {
    return {
      id: crypto.randomUUID(),
      texte: '',
      couleur: PALETTE[(criteresExistants || []).length % PALETTE.length]
    };
  }

  function colorForCritere(criteres, critereId) {
    if (!critereId) return null;
    const c = (criteres || []).find(c => c.id === critereId);
    return c ? (c.couleur || null) : null;
  }

  function parseLines(raw) {
    return (raw || '').split('\n').map(s => s.trim()).filter(Boolean);
  }

  function parseCommaList(raw) {
    return (raw || '').split(',').map(s => s.trim()).filter(Boolean);
  }

  function joinLines(arr) {
    return (arr || []).join('\n');
  }

  /* État de formulaire par défaut pour un nouvel exercice, ou pour
     recharger un exercice persisté (tableaux -> texte multi-lignes). */
  function exerciceFormState(e) {
    e = e || {};
    return {
      type: e.type || 'marquage',
      critereId: e.critereId || null,
      consigne: e.consigne || '',
      contenu: e.contenu || '',
      phrases: joinLines(e.phrases),
      banqueMots: e.banqueMots || '',
      categories: joinLines(e.categories),
      utiliserTableauConjugaison: !!e.utiliserTableauConjugaison,
      verbesConjugaison: (e.verbes || []).join(', '),
      // Coché par défaut pour chaque pronom — y compris quand e.pronoms
      // est absent (exercices créés avant cette case à cocher).
      pronomsCoches: PRONOMS_CONJUGAISON.map(p => !e.pronoms || e.pronoms.includes(p)),
      colonneGauche: joinLines(e.colonneGauche),
      colonneDroite: joinLines(e.colonneDroite),
      question: e.question || '',
      propositions: joinLines(e.propositions),
      nombreDeLignes: e.nombreDeLignes || 2,
      affirmations: joinLines(e.affirmations),
      // texte_trous : reste un tableau d'objets en état de formulaire
      // (pas une chaîne multi-lignes) — un item par phrase. Plus
      // d'indices (retirés) ; tailleTrous s'applique à tout l'exercice.
      trousItems: (e.items || []).map(it => ({ texte: it.texte || '' })),
      tailleTrous: e.tailleTrous || 'moyen',
      texte: e.texte || '',
      // mot_grille
      mots: joinLines(e.mots),
      nbColonnes: e.nbColonnes || 2,
      // classement (mode catégories libres) : nb de lignes vides du tableau
      nbLignesClassement: e.nbLignes || 5
    };
  }

  /* Ne garde que type + consigne + champs propres au type choisi, listes
     parsées — c'est cette forme nettoyée qui est persistée en jsonb
     (evaluations.exercices comme banque_items.items). */
  function buildExercicePayload(ex) {
    const base = { type: ex.type, critereId: ex.critereId || null, consigne: (ex.consigne || '').trim() };
    switch (ex.type) {
      case 'reecriture':
        return { ...base, phrases: parseLines(ex.phrases), banqueMots: (ex.banqueMots || '').trim() || null };
      case 'classement':
        return ex.utiliserTableauConjugaison
          ? {
              ...base,
              utiliserTableauConjugaison: true,
              verbes: parseCommaList(ex.verbesConjugaison),
              pronoms: PRONOMS_CONJUGAISON.filter((p, pi) => ex.pronomsCoches[pi])
            }
          : {
              ...base,
              utiliserTableauConjugaison: false,
              categories: parseLines(ex.categories),
              banqueMots: (ex.banqueMots || '').trim() || null,
              nbLignes: Math.max(1, ex.nbLignesClassement || 5)
            };
      case 'relier':
        return { ...base, colonneGauche: parseLines(ex.colonneGauche), colonneDroite: parseLines(ex.colonneDroite) };
      case 'qcm':
        return { ...base, question: (ex.question || '').trim() || null, propositions: parseLines(ex.propositions) };
      case 'reponse_courte':
        return { ...base, question: (ex.question || '').trim(), nombreDeLignes: Math.max(1, parseInt(ex.nombreDeLignes, 10) || 2) };
      case 'vrai_faux':
        return { ...base, affirmations: parseLines(ex.affirmations) };
      case 'texte_trous':
        return {
          ...base,
          tailleTrous: ex.tailleTrous || 'moyen',
          items: (ex.trousItems || [])
            .filter(it => it.texte.trim())
            .map(it => ({ texte: it.texte.trim() }))
        };
      case 'mots_souligne':
        return { ...base, texte: (ex.texte || '').trim() };
      case 'mot_grille':
        return { ...base, mots: parseLines(ex.mots), nbColonnes: ex.nbColonnes === 3 ? 3 : 2 };
      case 'marquage':
      default:
        return { ...base, type: 'marquage', contenu: (ex.contenu || '').trim() };
    }
  }

  function exercicePayloadHasContent(p) {
    if (p.consigne) return true;
    switch (p.type) {
      case 'reecriture':     return p.phrases.length > 0;
      case 'classement':     return p.utiliserTableauConjugaison ? p.verbes.length > 0 : p.categories.length > 0;
      case 'relier':         return p.colonneGauche.length > 0 || p.colonneDroite.length > 0;
      case 'qcm':            return p.propositions.length > 0 || !!p.question;
      case 'texte_trous':    return p.items.length > 0;
      case 'mots_souligne':  return !!p.texte;
      case 'mot_grille':     return p.mots.length > 0;
      case 'reponse_courte': return !!p.question;
      case 'vrai_faux':      return p.affirmations.length > 0;
      case 'marquage':
      default:                return !!p.contenu;
    }
  }

  /* ── Rendu HTML des champs propres au type, sous la consigne (commune à
     tous). Pure fonction de (ex, i) — i est l'index dans le tableau
     d'items de l'éditeur courant, utilisé uniquement pour les data-idx. */
  function typeFieldsHtml(ex, i) {
    switch (ex.type) {
      case 'texte_trous':
        return `
          <label class="ev-form-label">Taille des trous</label>
          <select class="ev-select ev-ex-tailleTrous" data-idx="${i}" style="max-width:160px">
            <option value="petit" ${ex.tailleTrous === 'petit' ? 'selected' : ''}>Petit</option>
            <option value="moyen" ${ex.tailleTrous === 'moyen' ? 'selected' : ''}>Moyen</option>
            <option value="grand" ${ex.tailleTrous === 'grand' ? 'selected' : ''}>Grand</option>
          </select>
          <label class="ev-form-label">Phrases</label>
          <div class="ev-trous-list" data-idx="${i}">
            ${ex.trousItems.map((item, ti) => trouItemHtml(i, item, ti)).join('')}
          </div>
          <button type="button" class="ev-btn ev-btn-outline ev-btn-sm" data-add-trou="${i}">+ Ajouter une phrase</button>`;

      case 'mots_souligne':
        return `
          <label class="ev-form-label">Texte (encadre les mots à marquer entre crochets, ex. « Le [chat] noir [dort]. »)</label>
          <textarea class="ev-form-textarea ev-ex-texte lfm-verifie" data-idx="${i}"
            placeholder="Le [chat] noir [dort] sur le canapé.">${escHtml(ex.texte)}</textarea>`;

      case 'mot_grille':
        return `
          <label class="ev-form-label">Liste de mots (un par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-mots lfm-verifie" data-idx="${i}"
            placeholder="chat&#10;souris&#10;joli">${escHtml(ex.mots)}</textarea>
          <label class="ev-form-label">Nombre de colonnes</label>
          <select class="ev-select ev-ex-nbColonnes" data-idx="${i}" style="max-width:120px">
            <option value="2" ${ex.nbColonnes === 2 ? 'selected' : ''}>2</option>
            <option value="3" ${ex.nbColonnes === 3 ? 'selected' : ''}>3</option>
          </select>`;

      case 'reecriture':
        return `
          <label class="ev-form-label">Liste de phrases à transformer (une par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-phrases lfm-verifie" data-idx="${i}"
            placeholder="Il était content.&#10;Ils seront prêts.">${escHtml(ex.phrases)}</textarea>
          <label class="ev-form-label">Banque de mots (optionnel)</label>
          <input type="text" class="ev-form-input ev-ex-banqueMots lfm-verifie" data-idx="${i}"
            value="${escHtml(ex.banqueMots)}" placeholder="Ex. était, sera, seront">`;

      case 'classement':
        return `
          <label class="ev-form-checkbox-row">
            <input type="checkbox" class="ev-ex-conjugaison-toggle" data-idx="${i}" ${ex.utiliserTableauConjugaison ? 'checked' : ''}>
            Utiliser le modèle tableau de conjugaison
          </label>
          ${ex.utiliserTableauConjugaison ? `
          <label class="ev-form-label">Verbes à conjuguer</label>
          <input type="text" class="ev-form-input ev-ex-verbesConjugaison lfm-verifie" data-idx="${i}"
            value="${escHtml(ex.verbesConjugaison)}" placeholder="Ex. aller, avoir, être...">
          <label class="ev-form-label">Pronoms à inclure</label>
          <div class="ev-pronoms-list">
            ${PRONOMS_CONJUGAISON.map((p, pi) => `
              <label class="ev-form-checkbox-row" style="margin-top:0">
                <input type="checkbox" class="ev-ex-pronom-toggle" data-idx="${i}" data-pronom-idx="${pi}" ${ex.pronomsCoches[pi] ? 'checked' : ''}>
                ${p}
              </label>`).join('')}
          </div>` : `
          <label class="ev-form-label">Catégories (une par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-categories lfm-verifie" data-idx="${i}"
            placeholder="Noms&#10;Adjectifs&#10;Verbes">${escHtml(ex.categories)}</textarea>
          <label class="ev-form-label">Texte de support ou mots à classer</label>
          <input type="text" class="ev-form-input ev-ex-banqueMots lfm-verifie" data-idx="${i}"
            value="${escHtml(ex.banqueMots)}" placeholder="Ex. rapide, chanter, maison">
          <div class="ev-classement-lignes-info">Lignes vides sur le PDF : <strong>${ex.nbLignesClassement}</strong></div>
          <button type="button" class="ev-btn ev-btn-outline ev-btn-sm" data-add-ligne-classement="${i}">+ Insérer une ligne</button>`}`;

      case 'relier':
        return `
          <label class="ev-form-label">Liste colonne gauche (une par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-colonneGauche lfm-verifie" data-idx="${i}">${escHtml(ex.colonneGauche)}</textarea>
          <label class="ev-form-label">Liste colonne droite (une par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-colonneDroite lfm-verifie" data-idx="${i}">${escHtml(ex.colonneDroite)}</textarea>`;

      case 'qcm':
        return `
          <label class="ev-form-label">Question (optionnel si la consigne suffit)</label>
          <input type="text" class="ev-form-input ev-ex-question lfm-verifie" data-idx="${i}" value="${escHtml(ex.question)}">
          <label class="ev-form-label">Liste de propositions (une par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-propositions lfm-verifie" data-idx="${i}">${escHtml(ex.propositions)}</textarea>`;

      case 'reponse_courte':
        return `
          <label class="ev-form-label">Question</label>
          <input type="text" class="ev-form-input ev-ex-question lfm-verifie" data-idx="${i}" value="${escHtml(ex.question)}">
          <label class="ev-form-label">Nombre de lignes de réponse</label>
          <input type="number" class="ev-form-input ev-ex-nombreDeLignes" data-idx="${i}" min="1" max="10"
            value="${ex.nombreDeLignes}" style="max-width:100px">`;

      case 'vrai_faux':
        return `
          <label class="ev-form-label">Liste d'affirmations (une par ligne)</label>
          <textarea class="ev-form-textarea ev-ex-affirmations lfm-verifie" data-idx="${i}">${escHtml(ex.affirmations)}</textarea>`;

      case 'marquage':
      default:
        return `
          <label class="ev-form-label">Contenu de l'exercice</label>
          <textarea class="ev-form-textarea ev-ex-contenu lfm-verifie" data-idx="${i}"
            placeholder="La phrase, la liste ou la question à faire apparaître…">${escHtml(ex.contenu)}</textarea>`;
    }
  }

  function trouItemHtml(exIdx, item, phraseIdx) {
    return `
      <div class="ev-trou-item">
        <div class="ev-trou-item-top">
          <input type="text" class="ev-form-input ev-trou-texte lfm-verifie" data-ex-idx="${exIdx}" data-phrase-idx="${phraseIdx}"
            value="${escHtml(item.texte)}" placeholder="Tape ta phrase, puis clique sur « Insérer un trou ».">
          <button type="button" class="ev-btn ev-btn-outline ev-btn-sm" data-insert-trou-ex="${exIdx}" data-insert-trou-phrase="${phraseIdx}">+ Insérer un trou</button>
          <button type="button" class="ev-btn ev-btn-danger ev-btn-icon" data-remove-trou-ex="${exIdx}" data-remove-trou-phrase="${phraseIdx}" title="Supprimer">✕</button>
        </div>
      </div>`;
  }

  /* ── Éditeur d'une liste d'exercices, monté dans un conteneur donné ──────
     Un éditeur possède son propre tableau d'items en état de formulaire
     (fermé sur containerEl) — plusieurs éditeurs peuvent coexister sur la
     même page sans se marcher dessus (pas le cas ici, mais pas de variable
     globale partagée pour autant).

     opts.onChange() : appelé après toute modification (ajout/suppression/
     réordonnancement/changement de type) — pas à chaque frappe, seulement
     quand la structure change, comme dans le code d'origine.
     opts.onPreview(payload, index, couleur) : appelé avec le payload
     construit, l'index de l'exercice et la couleur de son critère associé
     (voir opts.getCriteres ci-dessous, null si non associé ou si la page
     hôte n'a pas de notion de critère) quand on clique sur l'aperçu (👁) —
     la page hôte gère sa propre modale (voir ev-preview-modal dans
     evaluations-enseignant.html et evaluations-banque-admin.html).
     L'index sert à numéroter l'aperçu ("EXERCICE N —", voir
     EvaluationsPrint.exerciceBlockHtml).

     opts.getCriteres() : fonction optionnelle retournant le tableau de
     critères courant [{id, texte, couleur}] de la page hôte (lue à chaque
     rendu, jamais mise en cache — la page hôte reste seule source de
     vérité pour ses critères). Quand fournie, active : le sélecteur
     "Critère associé" sur chaque exercice, la pastille de couleur dans
     son en-tête, le regroupement par critère (voir regroup()) et la
     limitation du réordonnement ↑/↓ au groupe courant. Absente (cas de
     evaluations-banque-admin.html, qui n'a pas de critères) : ces
     éléments ne sont pas rendus, le réordonnement reste libre comme
     avant. */
  function createEditor(containerEl, opts) {
    opts = opts || {};
    let items = [];

    /* Reconstruit items en regroupant par critère, dans l'ordre courant
       de opts.getCriteres() — ordre relatif interne à chaque groupe
       préservé. Les items dont le critereId ne correspond à aucun
       critère courant (supprimé, ou null) forment le groupe "Sans
       critère", ajouté à la fin. Sans opts.getCriteres, no-op : pas de
       notion de groupe à respecter. */
    function sortByCriteres() {
      if (!opts.getCriteres) return;
      const ordreIds = opts.getCriteres().map(c => c.id);
      const groupes = ordreIds.map(id => items.filter(it => it.critereId === id));
      const sansCritere = items.filter(it => !ordreIds.includes(it.critereId));
      // Un critereId qui ne correspond plus à aucun critère courant (ex.
      // critère supprimé) est nettoyé plutôt que laissé "orphelin" en
      // l'état — l'exercice est déjà visuellement en "Sans critère"
      // (pas de pastille, sélecteur sur "Sans critère") : autant que la
      // donnée persistée le reflète, plutôt que de garder une référence
      // périmée vers un id de critère qui n'existe plus.
      sansCritere.forEach(it => { it.critereId = null; });
      items = [].concat(...groupes, sansCritere);
    }

    function render() {
      if (items.length === 0) { containerEl.innerHTML = ''; return; }
      const criteres = opts.getCriteres ? opts.getCriteres() : null;
      containerEl.innerHTML = items.map((ex, i) => {
        const couleur = criteres ? colorForCritere(criteres, ex.critereId) : null;
        const premierDuGroupe = i === 0 || items[i - 1].critereId !== ex.critereId;
        const dernierDuGroupe = i === items.length - 1 || items[i + 1].critereId !== ex.critereId;
        return `
        <div class="ev-exercice-item">
          <div class="ev-exercice-item-top">
            <span class="ev-exercice-item-title">${couleur ? `<span class="ev-ex-dot" style="background:${escHtml(couleur)}"></span>` : ''}Exercice ${i + 1}</span>
            <div class="ev-row-actions">
              <button type="button" class="ev-btn ev-btn-outline ev-btn-icon" data-ex-preview="${i}" title="Aperçu">👁</button>
              <button type="button" class="ev-btn ev-btn-outline ev-btn-icon" data-ex-up="${i}" ${premierDuGroupe ? 'disabled' : ''} title="Monter">↑</button>
              <button type="button" class="ev-btn ev-btn-outline ev-btn-icon" data-ex-down="${i}" ${dernierDuGroupe ? 'disabled' : ''} title="Descendre">↓</button>
              <button type="button" class="ev-btn ev-btn-danger ev-btn-icon" data-ex-remove="${i}" title="Supprimer">✕</button>
            </div>
          </div>
          ${criteres ? `
          <label class="ev-form-label" style="margin-top:0">Critère associé</label>
          <select class="ev-select ev-ex-critere" data-idx="${i}">
            <option value="">Sans critère</option>
            ${criteres.map(c => `<option value="${escHtml(c.id)}" ${ex.critereId === c.id ? 'selected' : ''}>${escHtml(c.texte || '(sans titre)')}</option>`).join('')}
          </select>` : ''}
          <label class="ev-form-label" ${criteres ? '' : 'style="margin-top:0"'}>Type d'exercice</label>
          <div class="ev-ex-type-grid">
            ${EXERCICE_TYPES.map(t => `
              <button type="button" class="ev-ex-type-option ${ex.type === t.value ? 'is-selected' : ''}"
                data-idx="${i}" data-type="${t.value}" title="${escHtml(t.label)}">
                <img src="assets/evaluations-icones/${t.value}.png?v=3" alt="${escHtml(t.label)}">
                <span class="ev-ex-type-label">${escHtml(t.court)}</span>
              </button>`).join('')}
          </div>
          <label class="ev-form-label">Consigne</label>
          <input type="text" class="ev-form-input ev-ex-consigne lfm-verifie" data-idx="${i}"
            value="${escHtml(ex.consigne)}" placeholder="Ex. Souligne le verbe conjugué dans chaque phrase.">
          ${typeFieldsHtml(ex, i)}
        </div>`;
      }).join('');

      wireEvents();
    }

    function wireEvents() {
      containerEl.querySelectorAll('.ev-ex-critere').forEach(sel => {
        sel.addEventListener('change', () => {
          items[parseInt(sel.dataset.idx, 10)].critereId = sel.value || null;
          sortByCriteres();
          render();
          if (opts.onChange) opts.onChange();
        });
      });
      containerEl.querySelectorAll('.ev-ex-type-option').forEach(btn => {
        btn.addEventListener('click', () => {
          items[parseInt(btn.dataset.idx, 10)].type = btn.dataset.type;
          render();
          if (opts.onChange) opts.onChange();
        });
      });
      containerEl.querySelectorAll('.ev-ex-conjugaison-toggle').forEach(cb => {
        cb.addEventListener('change', () => {
          items[parseInt(cb.dataset.idx, 10)].utiliserTableauConjugaison = cb.checked;
          render();
        });
      });
      containerEl.querySelectorAll('.ev-ex-pronom-toggle').forEach(cb => {
        cb.addEventListener('change', () => {
          const exIdx = parseInt(cb.dataset.idx, 10);
          const pronomIdx = parseInt(cb.dataset.pronomIdx, 10);
          items[exIdx].pronomsCoches[pronomIdx] = cb.checked;
        });
      });
      containerEl.querySelectorAll('[data-add-ligne-classement]').forEach(btn => {
        btn.addEventListener('click', () => {
          const exIdx = parseInt(btn.dataset.addLigneClassement, 10);
          items[exIdx].nbLignesClassement = (items[exIdx].nbLignesClassement || 5) + 1;
          render();
        });
      });
      // Champs texte/textarea communs à un ou plusieurs types : simple
      // affectation directe sur 'input', sans re-rendu (pas de perte de
      // focus pendant la frappe) — seuls les changements structurels
      // (type, case à cocher) ci-dessus déclenchent un re-rendu.
      ['consigne', 'contenu', 'phrases', 'banqueMots', 'categories', 'verbesConjugaison',
        'colonneGauche', 'colonneDroite', 'question', 'propositions', 'affirmations', 'texte', 'mots'].forEach(field => {
        containerEl.querySelectorAll(`.ev-ex-${field}`).forEach(el => {
          el.addEventListener('input', () => { items[parseInt(el.dataset.idx, 10)][field] = el.value; });
        });
      });
      containerEl.querySelectorAll('.ev-ex-nombreDeLignes').forEach(el => {
        el.addEventListener('input', () => { items[parseInt(el.dataset.idx, 10)].nombreDeLignes = parseInt(el.value, 10) || 2; });
      });
      containerEl.querySelectorAll('.ev-ex-nbColonnes').forEach(el => {
        el.addEventListener('change', () => { items[parseInt(el.dataset.idx, 10)].nbColonnes = parseInt(el.value, 10) === 3 ? 3 : 2; });
      });
      containerEl.querySelectorAll('.ev-ex-tailleTrous').forEach(el => {
        el.addEventListener('change', () => { items[parseInt(el.dataset.idx, 10)].tailleTrous = el.value; });
      });

      /* ── Texte à trous : phrase (simple affectation sur 'input', pas de
         re-rendu déclenché au blur) + insertion de repère + ajout/
         suppression de phrase.
         Pas de reparse/re-rendu au blur (contrairement au patron habituel,
         ex. dictees-enseignant.html) : cliquer sur "+ Insérer un trou" fait
         d'abord perdre le focus du champ Phrase (blur), qui elle-même
         appelait render() — reconstruisant tout le DOM (listeners inclus)
         EN PLEIN MILIEU du geste de clic, avant que le 'click' n'ait eu
         l'occasion de se déclencher sur le bouton : l'insertion ne se
         produisait alors jamais (bug constaté et reproduit à l'origine
         dans evaluations-enseignant.html). Le bouton gère lui-même sa
         propre reparse + re-rendu (insererTrouAt) ; c'est l'unique point
         d'entrée pour ajouter un trou, donc pas besoin d'une
         synchronisation redondante au blur. ── */
      containerEl.querySelectorAll('.ev-trou-texte').forEach(inp => {
        inp.addEventListener('input', () => {
          const exIdx = parseInt(inp.dataset.exIdx, 10);
          const phraseIdx = parseInt(inp.dataset.phraseIdx, 10);
          items[exIdx].trousItems[phraseIdx].texte = inp.value;
        });
      });
      containerEl.querySelectorAll('[data-insert-trou-ex]').forEach(btn => {
        btn.addEventListener('click', () => {
          const exIdx = parseInt(btn.dataset.insertTrouEx, 10);
          const phraseIdx = parseInt(btn.dataset.insertTrouPhrase, 10);
          const input = containerEl.querySelector(`.ev-trou-texte[data-ex-idx="${exIdx}"][data-phrase-idx="${phraseIdx}"]`);
          insererTrouAt(input, exIdx, phraseIdx);
        });
      });
      containerEl.querySelectorAll('[data-remove-trou-ex]').forEach(btn => {
        btn.addEventListener('click', () => {
          const exIdx = parseInt(btn.dataset.removeTrouEx, 10);
          const phraseIdx = parseInt(btn.dataset.removeTrouPhrase, 10);
          items[exIdx].trousItems.splice(phraseIdx, 1);
          render();
        });
      });
      containerEl.querySelectorAll('[data-add-trou]').forEach(btn => {
        btn.addEventListener('click', () => {
          const exIdx = parseInt(btn.dataset.addTrou, 10);
          items[exIdx].trousItems.push({ texte: '' });
          render();
        });
      });

      containerEl.querySelectorAll('[data-ex-up]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.exUp, 10);
          [items[i - 1], items[i]] = [items[i], items[i - 1]];
          render();
          if (opts.onChange) opts.onChange();
        });
      });
      containerEl.querySelectorAll('[data-ex-down]').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.exDown, 10);
          [items[i + 1], items[i]] = [items[i], items[i + 1]];
          render();
          if (opts.onChange) opts.onChange();
        });
      });
      containerEl.querySelectorAll('[data-ex-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          items.splice(parseInt(btn.dataset.exRemove, 10), 1);
          render();
          if (opts.onChange) opts.onChange();
        });
      });
      containerEl.querySelectorAll('[data-ex-preview]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.exPreview, 10);
          const payload = buildExercicePayload(items[idx]);
          const couleur = opts.getCriteres ? colorForCritere(opts.getCriteres(), payload.critereId) : null;
          if (opts.onPreview) opts.onPreview(payload, idx, couleur);
        });
      });
    }

    /* Insère TROU_MARQUEUR à la position du curseur dans le champ Phrase,
       puis restaure le focus + la position du curseur après le re-rendu
       (sinon la saisie perd le focus à chaque clic). */
    function insererTrouAt(input, exIdx, phraseIdx) {
      const start = input.selectionStart != null ? input.selectionStart : input.value.length;
      const end = input.selectionEnd != null ? input.selectionEnd : input.value.length;
      const item = items[exIdx].trousItems[phraseIdx];
      item.texte = input.value.slice(0, start) + TROU_MARQUEUR + input.value.slice(end);
      render();
      requestAnimationFrame(() => {
        const newInput = containerEl.querySelector(`.ev-trou-texte[data-ex-idx="${exIdx}"][data-phrase-idx="${phraseIdx}"]`);
        if (!newInput) return;
        const pos = start + TROU_MARQUEUR.length;
        newInput.focus();
        newInput.setSelectionRange(pos, pos);
      });
    }

    return {
      setItems(rawItems) { items = (rawItems || []).map(exerciceFormState); sortByCriteres(); render(); },
      addItem() { items.push(exerciceFormState()); render(); if (opts.onChange) opts.onChange(); },
      getPayloads() { return items.map(buildExercicePayload).filter(exercicePayloadHasContent); },
      isEmpty() { return items.length === 0; },
      /* À appeler par la page hôte après tout changement structurel de ses
         critères (ajout/suppression/réordonnement) — re-regroupe les
         exercices dans le nouvel ordre et re-rend. No-op sans
         opts.getCriteres. */
      regroup() { sortByCriteres(); render(); }
    };
  }

  return {
    EXERCICE_TYPES,
    PALETTE,
    newCritere,
    colorForCritere,
    exerciceFormState,
    buildExercicePayload,
    exercicePayloadHasContent,
    createEditor
  };
})();

/* ─────────────────────────────────────────────────────────────────────────────
   dictees-student-space.js — Onglet « Mes dictées préparées » de
   dashboard-eleve.html.

   Espace volontairement séparé de « Mes joggings d'écriture » : carnet de
   badges propre (js/dictees-badges.js, table jogging_badges partagée en
   base mais jamais fusionnée à l'affichage — voir js/jogging-student-
   space.js, qui reste inchangé), même patron d'organisation que ce dernier
   (JoggingStudentSpace.render(studentId) sur activation de l'onglet).

   « Mon évolution » trace le taux de réussite du premier coup à l'exercice 1
   (Dictée de mots, capsule sonore) uniquement — pas les 2 autres paliers
   lexicaux, dont la courbe serait moins lisible en la mêlant à celle-ci.

   Les 3 paliers lexicaux (dictee_results.exercice : 0 = Photographier un
   mot, 3 = Compléter un mot, 1 = Dictée de mots — jamais 2, valeur laissée
   inutilisée, cf. js/dictees-engine.js) sont affichés comme 3 résultats
   indépendants dans « Mes dictées » (retour utilisateur — chacun visible dès
   qu'il a été tenté, même si les 2 autres ne l'ont pas encore été). Fond de
   pastille fixé par catégorie (bleu lexical / ambre grammatical, mêmes
   couleurs que .dic-section-label — retour utilisateur : distinguer les 2
   volets d'un coup d'œil) ; le score n'agit plus que sur une bordure
   (tierClassFor), pour ne pas perdre ce signal en le confondant avec
   l'ambre grammatical.

   Dépend de : supabase-client.js (window.lfmDb), js/dictees-badges.js.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesStudentSpace = (() => {
  const GRAM_TYPE_LABELS = { classification: 'Classification', trous: 'Texte à trous', trous_conjugaison: 'Trous — conjugaison', transformation: 'Transformation' };
  /* Ordre pédagogique (0 → 0.5 → 1), pas l'ordre numérique des codes exercice
     (1 reste la Dictée de mots pour compatibilité historique, cf.
     js/dictees-engine.js). */
  const LEX_EXERCICES = [0, 3, 1];
  const LEX_LABELS = { 0: 'Photographier un mot', 3: 'Compléter un mot', 1: 'Dictée de mots' };
  /* var(--ls-color-N) (level-select.css) n'est pas chargé sur dashboard-
     eleve.html — même bug/même correctif que dictees-enseignant.html
     (NIVEAU_VAR) : on référence directement --color-niveau-cm1/cm2/6e
     (styles.css, toujours chargé), dont --ls-color-N n'est de toute façon
     qu'un alias. */
  const NIVEAU_COLOR = { 1: 'var(--color-niveau-cm1)', 2: 'var(--color-niveau-cm2)', 3: 'var(--color-niveau-6e)' };

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  }

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Fond de la pastille fixé par catégorie (lexical/gram, cf. LEX_EXERCICES/
     GRAM_TYPE_LABELS plus bas) — le score ne joue plus que sur une bordure
     (retour utilisateur : ne pas perdre le signal "score bas"/"score haut"
     une fois le fond réservé à la catégorie). */
  function tierClassFor(pct) {
    if (pct >= 80) return 'dic-mydictees-pill--good';
    if (pct >= 50) return 'dic-mydictees-pill--ok';
    return 'dic-mydictees-pill--low';
  }

  /* La dernière tentative par clé (dictée, ou dictée+type pour le
     grammatical) — un élève peut refaire une dictée plusieurs fois, seule la
     plus récente est affichée dans la liste "Mes dictées". */
  function latestByKey(rows, keyFn) {
    const map = new Map();
    rows.forEach(r => {
      const k = keyFn(r);
      const prev = map.get(k);
      if (!prev || new Date(r.completed_at) > new Date(prev.completed_at)) map.set(k, r);
    });
    return map;
  }

  /* ── Liste "Mes dictées" — une ligne par dictée faite, avec les résultats
     lexicaux (une pastille par palier réellement tenté parmi les 3 — 0/0.5/1,
     retour utilisateur : auparavant un seul agrégat "Lexical", jugé pas assez
     distingué) ET les résultats grammaticaux (un par type tenté), pour que
     l'élève retrouve d'un coup d'œil ce qu'il a fait sur CETTE dictée précise
     plutôt que des moyennes globales (voir §3 du retour utilisateur :
     structure auparavant confuse, mélangeait tout). */
  async function renderMesDictees(studentId, lexicalResults) {
    const section = document.getElementById('dic-dash-mesdictees-section');
    const list = document.getElementById('dic-dash-mesdictees-list');
    if (!section || !list) return { 1: 0, 2: 0, 3: 0 };

    let gramResults = [];
    if (window.lfmDb) {
      const { data, error } = await window.lfmDb
        .from('dictee_gram_results').select('*').eq('student_id', studentId).limit(2000);
      if (!error) gramResults = data || [];
    }

    const dicteeIds = [...new Set([...lexicalResults.map(r => r.dictee_id), ...gramResults.map(r => r.dictee_id)])];
    if (dicteeIds.length === 0) { section.style.display = 'none'; return { 1: 0, 2: 0, 3: 0 }; }

    let titresById = new Map();
    if (window.lfmDb) {
      const { data, error } = await window.lfmDb.from('dictees').select('id,titre').in('id', dicteeIds);
      if (!error) titresById = new Map((data || []).map(d => [d.id, d.titre]));
    }

    /* Contenu des mots ratés (dictee_mots.contenu), pour le retour "erreurs
       les plus fréquentes" (js/dictees-word-stats.js) — voir plus bas,
       calculé sur TOUTES les tentatives lexicales de l'élève pour chaque
       dictée, pas seulement la dernière (lexLatest), pour refléter la
       difficulté réelle du mot. */
    let motById = new Map();
    if (window.lfmDb) {
      const { data, error } = await window.lfmDb.from('dictee_mots').select('id,contenu').in('dictee_id', dicteeIds);
      if (!error) motById = new Map((data || []).map(m => [m.id, m.contenu]));
    }

    const lexLatest = latestByKey(lexicalResults, r => r.dictee_id + '|' + r.exercice);
    const gramLatest = latestByKey(gramResults, r => r.dictee_id + '|' + r.type);
    /* Niveau AFFICHÉ pour la dictée (remplace l'ancien calcul "dernière
       tentative grammaticale, tous types confondus" — ne marchait pas du
       tout pour une dictée purement lexicale, cf. migration 20260914110000) :
       parmi TOUTES les lignes (lexicales dictee_results ET grammaticales
       dictee_gram_results) marquées session_complete = true — posé côté
       client par js/dictees-engine.js/isFullSessionComplete quand TOUS les
       exercices actifs de la dictée à ce niveau sont terminés — la plus
       récente (completed_at). Écrase une session complète antérieure à un
       autre niveau (pas de cumul) ; reste absent tant qu'aucune session n'a
       jamais été menée à son terme sur cette dictée. */
    const completeSessionLatest = latestByKey(
      [...lexicalResults, ...gramResults].filter(r => r.session_complete && r.niveau != null),
      r => r.dictee_id
    );

    const rows = dicteeIds.map(id => {
      const lexResults = LEX_EXERCICES
        .map(ex => lexLatest.get(id + '|' + ex))
        .filter(Boolean);
      const gramTypes = ['classification', 'trous', 'trous_conjugaison', 'transformation']
        .map(type => gramLatest.get(id + '|' + type))
        .filter(Boolean);
      const lastActivity = [...lexResults, ...gramTypes]
        .reduce((max, r) => Math.max(max, new Date(r.completed_at).getTime()), 0);
      const allLexResults = lexicalResults.filter(r => r.dictee_id === id);
      /* wrong_items ('trous' uniquement, cf. migration 20260914100000) —
         mêmes tentatives grammaticales que gramTypes ci-dessus, non filtrées
         à la dernière (même logique que allLexResults). */
      const allTrousResults = gramResults.filter(r => r.dictee_id === id && r.type === 'trous');
      const completeRow = completeSessionLatest.get(id);
      const niveau = completeRow ? completeRow.niveau : null;
      return { id, titre: titresById.get(id) || '—', lexResults, gramTypes, lastActivity, allLexResults, allTrousResults, niveau };
    }).sort((a, b) => b.lastActivity - a.lastActivity);

    /* Compteur "niveau de difficulté travaillé" (dashboard-eleve.html, une
       pastille par niveau 1/2/3) : nombre de dictées où CE niveau est le
       niveau affiché actuel — une dictée sans session complète (r.niveau ===
       null) ne compte pour aucun niveau. */
    const niveauCounts = { 1: 0, 2: 0, 3: 0 };
    rows.forEach(r => { if (r.niveau != null) niveauCounts[r.niveau]++; });

    list.innerHTML = rows.map(r => {
      const lexPills = r.lexResults.map(lex => {
        const pct = Math.round(lex.score / lex.total * 100);
        return `<span class="dic-mydictees-pill dic-mydictees-pill--lexical ${tierClassFor(pct)}">${LEX_LABELS[lex.exercice]} : ${pct}%</span>`;
      }).join('');
      const gramPills = r.gramTypes.map(g => {
        const pct = Math.round(g.score / g.total * 100);
        return `<span class="dic-mydictees-pill dic-mydictees-pill--gram ${tierClassFor(pct)}">${GRAM_TYPE_LABELS[g.type]} : ${pct}%</span>`;
      }).join('');
      /* Une ligne par catégorie (lexique / grammaire), omise si l'élève n'a
         encore rien tenté dans cette catégorie pour cette dictée — retour
         utilisateur : les pastilles se mélangeaient dans un seul flux. */
      const lexRow = lexPills ? `<div class="dic-mydictees-pillrow"><span class="dic-mydictees-catlabel">Lexique</span>${lexPills}</div>` : '';
      const gramRow = gramPills ? `<div class="dic-mydictees-pillrow"><span class="dic-mydictees-catlabel">Grammaire</span>${gramPills}</div>` : '';
      const freqLine = DicteesWordStats.formatLine(DicteesWordStats.mergeTallies(
        DicteesWordStats.tally(r.allLexResults, motById),
        DicteesWordStats.tallyText(r.allTrousResults, 'wrong_items')
      ));
      const freqRow = freqLine ? `<div class="dic-mydictees-pillrow"><span class="dic-mydictees-catlabel">Erreurs</span><span class="dic-mydictees-freqtext">${escHtml(freqLine)}</span></div>` : '';
      const niveauBadge = r.niveau != null
        ? `<div class="dic-mydictees-niveau"><span class="dic-niveau-dot" style="--ls-color:${NIVEAU_COLOR[r.niveau]}"></span>Niveau ${r.niveau}</div>`
        : '';
      return `
        <div class="dic-mydictees-row">
          <div class="dic-mydictees-title">${escHtml(r.titre)}${niveauBadge}</div>
          <div class="dic-mydictees-pills">${lexRow}${gramRow}${freqRow}</div>
        </div>`;
    }).join('');
    section.style.display = '';
    return niveauCounts;
  }

  /* Compteur 3 pastilles (une par niveau 1/2/3, couleurs --color-niveau-cm1/
     cm2/6e comme le reste du site) — même composant que côté enseignant
     (resultats-dictees-enseignant.html), dupliqué ici (pas de fichier
     utilitaire commun sur ce module, cf. en-tête). Masqué si l'élève n'a
     encore aucune dictée avec une session complète (les 3 compteurs à 0
     n'apportent rien). */
  function renderNiveauCounterHtml(counts) {
    const total = counts[1] + counts[2] + counts[3];
    if (total === 0) return '';
    return `
      <div class="dic-niveau-counter">
        ${[1, 2, 3].map(n => `
          <div class="dic-niveau-counter-seg dic-niveau-counter-seg--${n}">
            <span class="dic-niveau-counter-count">${counts[n]}</span>
            <span class="dic-niveau-counter-label">Niveau ${n}</span>
          </div>`).join('')}
      </div>`;
  }

  async function render(studentId) {
    const statsEl = document.getElementById('dic-dash-stats');
    const emptySection = document.getElementById('dic-dash-empty-section');
    const evoSection = document.getElementById('dic-dash-evolution-section');
    const mesDicteesSection = document.getElementById('dic-dash-mesdictees-section');
    const badgesGrid = document.getElementById('dic-dash-badges-grid');
    if (!statsEl || !window.lfmDb || !studentId) return;

    const { data: results, error } = await window.lfmDb
      .from('dictee_results').select('*').eq('student_id', studentId).limit(2000);
    const safeResults = (error || !results) ? [] : results;

    const niveauCounts = await renderMesDictees(studentId, safeResults);
    /* Rendu indépendamment du reste de "Mon bilan" (gate sur exercice = 1,
       purement lexical juste en dessous) : une dictée sans volet lexical
       (inclut_lexicale = false) n'a jamais de ligne dans dictee_results —
       safeResults resterait vide alors que niveauCounts peut très bien avoir
       des dictées comptées (session complète sur le seul volet
       grammatical). */
    const niveauSection = document.getElementById('dic-dash-niveau-section');
    const niveauCounterEl = document.getElementById('dic-dash-niveau-counter');
    if (niveauSection && niveauCounterEl) {
      const html = renderNiveauCounterHtml(niveauCounts);
      niveauCounterEl.innerHTML = html;
      niveauSection.style.display = html ? '' : 'none';
    }

    if (safeResults.length === 0) {
      statsEl.style.display = 'none';
      if (evoSection) evoSection.style.display = 'none';
      /* mesDicteesSection reste piloté par renderMesDictees (peut avoir des
         résultats grammaticaux même sans aucun résultat lexical). */
      emptySection.style.display = mesDicteesSection && mesDicteesSection.style.display !== 'none' ? 'none' : '';
      if (badgesGrid && typeof DicteesBadges !== 'undefined') {
        badgesGrid.innerHTML = renderBadgesGrid(await DicteesBadges.syncBadges(studentId, []));
      }
      return;
    }
    emptySection.style.display = 'none';
    statsEl.style.display = '';

    /* ── Mon bilan ── */
    /* "Dictées complétées"/"sans faute" : gate sur l'exercice 1 (Dictée
       audio, dernier des 3 paliers lexicaux 0/3/1 — cf. LEX_EXERCICES). Ce
       bloc datait d'avant le passage à ces 3 paliers indépendants, où
       l'exercice 2 jouait ce rôle de "fin de dictée" ; il n'a jamais été mis
       à jour et filtrait donc sur un code qui n'existe plus jamais dans
       dictee_results (cf. js/dictees-engine.js, "2 est délibérément
       inutilisé") — ces 2 stats étaient bloquées à 0 depuis la refonte des
       paliers (bug trouvé le 2026-08-16 en creusant BUG 1 ci-dessous, jamais
       signalé séparément). */
    const ex1 = safeResults.filter(r => r.exercice === 1);
    const completedCount = new Set(ex1.map(r => r.dictee_id)).size;
    const sansFauteCount = new Set(ex1.filter(r => r.sans_faute).map(r => r.dictee_id)).size;

    /* "Mots justes du 1er coup" : agrégé sur les 3 paliers lexicaux (tous les
       dictee_results de l'élève, qui ne contient que du lexical — le
       grammatical vit dans dictee_gram_results), pas seulement l'exercice 1
       — c'était le vrai bug remonté (100 % affiché malgré des fautes
       avérées) : ne lire que l'exercice 1 ignorait totalement les fautes
       commises aux paliers 0 (Photographier un mot) et 3 (Compléter un
       mot), qui sont statistiquement les plus fautifs (moins de guidage
       qu'à l'exercice 1). */
    const scoreSum = safeResults.reduce((s, r) => s + (r.score || 0), 0);
    const totalSum = safeResults.reduce((s, r) => s + (r.total || 0), 0);
    const premierCoupPct = totalSum > 0 ? Math.round((scoreSum / totalSum) * 100) : 0;

    document.getElementById('dic-stat-completees').textContent = completedCount;
    document.getElementById('dic-stat-premier-coup').textContent = premierCoupPct + '%';
    document.getElementById('dic-stat-sans-faute').textContent = sansFauteCount;

    /* ── Mon évolution (taux de réussite ex.1, chronologique, 15 derniers) ── */
    if (evoSection) {
      const chrono = ex1.slice().sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at)).slice(-15);
      if (chrono.length === 0) {
        evoSection.style.display = 'none';
      } else {
        evoSection.style.display = '';
        document.getElementById('dic-evo-bars').innerHTML = chrono.map(r => {
          const pct = r.total > 0 ? Math.round((r.score / r.total) * 100) : 0;
          return `
            <div class="dic-evo-bar-col">
              <div class="dic-evo-bar" style="height:${Math.max(pct, 3)}%"></div>
              <div class="dic-evo-bar-label">${formatDate(r.completed_at)}</div>
            </div>`;
        }).join('');
      }
    }

    /* ── Mes badges ── */
    if (badgesGrid && typeof DicteesBadges !== 'undefined') {
      const earnedIds = await DicteesBadges.syncBadges(studentId, safeResults);
      badgesGrid.innerHTML = renderBadgesGrid(earnedIds);
    }
  }

  function renderBadgesGrid(earnedIds) {
    const earned = new Set(earnedIds || []);
    return `<div class="laurel-badges-grid">` + DicteesBadges.BADGE_DEFS.map(b => {
      const isEarned = earned.has(b.id);
      const tierClass = isEarned ? `laurel-badge--${b.tier}` : 'laurel-badge--locked';
      return `
        <div class="laurel-badge ${tierClass}" title="${b.description.replace(/"/g, '&quot;')}">
          <div class="laurel-badge-icon">${isEarned ? b.icon : '🔒'}</div>
          <div class="laurel-badge-label">${b.label}</div>
          ${isEarned ? '' : '<div class="laurel-badge-count">à débloquer</div>'}
        </div>`;
    }).join('') + `</div>`;
  }

  return { render };
})();

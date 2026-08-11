/* ─────────────────────────────────────────────────────────────────────────────
   dictees-student-space.js — Onglet « Mes dictées préparées » de
   dashboard-eleve.html.

   Espace volontairement séparé de « Mes joggings d'écriture » : carnet de
   badges propre (js/dictees-badges.js, table jogging_badges partagée en
   base mais jamais fusionnée à l'affichage — voir js/jogging-student-
   space.js, qui reste inchangé), même patron d'organisation que ce dernier
   (JoggingStudentSpace.render(studentId) sur activation de l'onglet).

   « Mon évolution » trace le taux de réussite du premier coup à l'exercice 1
   (capsule sonore), seul indicateur qui varie réellement dictée après
   dictée : le score de l'exercice 2 est toujours égal au total par
   construction (l'exercice ne finit qu'une fois tous les mots maîtrisés),
   donc sans intérêt pour une courbe de progression.

   Dépend de : supabase-client.js (window.lfmDb), js/dictees-badges.js.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesStudentSpace = (() => {
  const GRAM_TYPE_LABELS = { classification: 'Classification', trous: 'Texte à trous', transformation: 'Transformation' };

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  }

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function pillClassFor(pct) {
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

  /* ── Liste "Mes dictées" — une ligne par dictée faite, avec le résultat
     lexical (ex.1) ET les résultats grammaticaux (un par type tenté), pour
     que l'élève retrouve d'un coup d'œil ce qu'il a fait sur CETTE dictée
     précise plutôt que des moyennes globales (voir §3 du retour utilisateur :
     structure auparavant confuse, mélangeait tout). */
  async function renderMesDictees(studentId, lexicalResults) {
    const section = document.getElementById('dic-dash-mesdictees-section');
    const list = document.getElementById('dic-dash-mesdictees-list');
    if (!section || !list) return;

    let gramResults = [];
    if (window.lfmDb) {
      const { data, error } = await window.lfmDb
        .from('dictee_gram_results').select('*').eq('student_id', studentId).limit(2000);
      if (!error) gramResults = data || [];
    }

    const ex1 = lexicalResults.filter(r => r.exercice === 1);
    const dicteeIds = [...new Set([...ex1.map(r => r.dictee_id), ...gramResults.map(r => r.dictee_id)])];
    if (dicteeIds.length === 0) { section.style.display = 'none'; return; }

    let titresById = new Map();
    if (window.lfmDb) {
      const { data, error } = await window.lfmDb.from('dictees').select('id,titre').in('id', dicteeIds);
      if (!error) titresById = new Map((data || []).map(d => [d.id, d.titre]));
    }

    const lexLatest = latestByKey(ex1, r => r.dictee_id);
    const gramLatest = latestByKey(gramResults, r => r.dictee_id + '|' + r.type);

    const rows = dicteeIds.map(id => {
      const lex = lexLatest.get(id);
      const gramTypes = ['classification', 'trous', 'transformation']
        .map(type => gramLatest.get(id + '|' + type))
        .filter(Boolean);
      const lastActivity = [lex, ...gramTypes].filter(Boolean)
        .reduce((max, r) => Math.max(max, new Date(r.completed_at).getTime()), 0);
      return { id, titre: titresById.get(id) || '—', lex, gramTypes, lastActivity };
    }).sort((a, b) => b.lastActivity - a.lastActivity);

    list.innerHTML = rows.map(r => {
      const lexPill = r.lex
        ? `<span class="dic-mydictees-pill ${pillClassFor(Math.round(r.lex.score / r.lex.total * 100))}">Lexical : ${Math.round(r.lex.score / r.lex.total * 100)}%</span>`
        : '';
      const gramPills = r.gramTypes.map(g => {
        const pct = Math.round(g.score / g.total * 100);
        return `<span class="dic-mydictees-pill ${pillClassFor(pct)}">${GRAM_TYPE_LABELS[g.type]} : ${pct}%</span>`;
      }).join('');
      return `
        <div class="dic-mydictees-row">
          <div class="dic-mydictees-title">${escHtml(r.titre)}</div>
          <div class="dic-mydictees-pills">${lexPill}${gramPills}</div>
        </div>`;
    }).join('');
    section.style.display = '';
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

    await renderMesDictees(studentId, safeResults);

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
    const ex2 = safeResults.filter(r => r.exercice === 2);
    const ex1 = safeResults.filter(r => r.exercice === 1);
    const completedCount = new Set(ex2.map(r => r.dictee_id)).size;
    const sansFauteCount = new Set(ex2.filter(r => r.sans_faute).map(r => r.dictee_id)).size;

    const ex1ScoreSum = ex1.reduce((s, r) => s + (r.score || 0), 0);
    const ex1TotalSum = ex1.reduce((s, r) => s + (r.total || 0), 0);
    const premierCoupPct = ex1TotalSum > 0 ? Math.round((ex1ScoreSum / ex1TotalSum) * 100) : 0;

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

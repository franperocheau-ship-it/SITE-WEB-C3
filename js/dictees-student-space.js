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
  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  }

  async function render(studentId) {
    const statsEl = document.getElementById('dic-dash-stats');
    const emptySection = document.getElementById('dic-dash-empty-section');
    const evoSection = document.getElementById('dic-dash-evolution-section');
    const badgesGrid = document.getElementById('dic-dash-badges-grid');
    if (!statsEl || !window.lfmDb || !studentId) return;

    const { data: results, error } = await window.lfmDb
      .from('dictee_results').select('*').eq('student_id', studentId).limit(2000);
    const safeResults = (error || !results) ? [] : results;

    if (safeResults.length === 0) {
      statsEl.style.display = 'none';
      if (evoSection) evoSection.style.display = 'none';
      emptySection.style.display = '';
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

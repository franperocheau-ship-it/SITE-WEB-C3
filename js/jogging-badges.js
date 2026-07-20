/* ─────────────────────────────────────────────────────────────────────────────
   jogging-badges.js — Onglet « Mes joggings d'écriture » › Mes réussites
   (Phase 3, §5.6.4). Catalogue de badges défini ici côté client (même patron
   que le catalogue statique js/jogging-data.js) ; table jogging_badges ne
   stocke que les attributions (student_id, badge_id, earned_at).

   Attribution déterministe, rejouée à chaque ouverture de l'onglet à partir
   des sessions/versions déjà chargées par js/jogging-student-space.js —
   aucun appel externe, aucune IA.

   Réutilise les classes CSS existantes .laurel-badge* (laurels.css) pour
   rester cohérent avec les badges/couronnes déjà affichés ailleurs sur le
   site, sans dépendre de js/laurels.js (logique de notion+count non
   applicable ici).

   Expose JoggingBadges.{ BADGE_DEFS, evaluateEarnedBadges, syncBadges,
   renderBadgesGrid }.
   ───────────────────────────────────────────────────────────────────────────── */

const JoggingBadges = (() => {
  const AUTO_CODES = ['C', 'H', 'A', 'M', 'P', 'O', 'S'];

  function feuFor(v, code) {
    return v ? (v['feu_' + code.toLowerCase()] || 'blanc') : 'blanc';
  }

  /* Un jogging « Champion » : les 7 feux automatiques au vert sur la
     dernière version d'une session terminée. */
  function isAllSevenGreen(v) {
    return AUTO_CODES.every(c => feuFor(v, c) === 'vert');
  }

  /* Taux de réussite sur un critère donné, sur la dernière version de
     chaque session terminée. Nécessite au moins 5 joggings évalués sur ce
     critère pour être significatif (pas de badge sur un seul coup de
     chance). */
  function rateForCode(lastVersions, code) {
    const evaluated = lastVersions.filter(v => feuFor(v, code) !== 'blanc');
    if (evaluated.length < 5) return { enough: false, rate: 0 };
    const verts = evaluated.filter(v => feuFor(v, code) === 'vert').length;
    return { enough: true, rate: verts / evaluated.length };
  }

  function distinctDayCount(sessions) {
    const days = new Set(sessions.map(s => (s.created_at || '').slice(0, 10)));
    return days.size;
  }

  /* Calcule les statistiques nécessaires à l'évaluation des badges à partir
     des sessions terminées et de la dernière version de chacune. */
  function computeStats(completedSessions, lastVersionBySession) {
    const lastVersions = completedSessions
      .map(s => lastVersionBySession.get(s.id))
      .filter(Boolean);

    return {
      completedCount: completedSessions.length,
      hasAllSevenGreen: lastVersions.some(isAllSevenGreen),
      distinctDays: distinctDayCount(completedSessions),
      rateC: rateForCode(lastVersions, 'C'),
      rateO: rateForCode(lastVersions, 'O')
    };
  }

  const BADGE_DEFS = [
    {
      id: 'premier-jogging',
      icon: '🏁',
      label: 'Premier jogging',
      tier: 'bronze',
      description: "Terminer ton tout premier jogging d'écriture.",
      check: s => s.completedCount >= 1
    },
    {
      id: 'premier-champion',
      icon: '🏆',
      label: 'Premier Champion',
      tier: 'or',
      description: 'Obtenir les 7 feux verts automatiques sur un même jogging.',
      check: s => s.hasAllSevenGreen
    },
    {
      id: 'cinq-joggings',
      icon: '5️⃣',
      label: '5 joggings',
      tier: 'bronze',
      description: "Terminer 5 joggings d'écriture.",
      check: s => s.completedCount >= 5
    },
    {
      id: 'dix-joggings',
      icon: '🔟',
      label: '10 joggings',
      tier: 'argent',
      description: "Terminer 10 joggings d'écriture.",
      check: s => s.completedCount >= 10
    },
    {
      id: 'quinze-joggings',
      icon: '⭐',
      label: '15 joggings',
      tier: 'or',
      description: 'Terminer les 15 joggings du catalogue.',
      check: s => s.completedCount >= 15
    },
    {
      id: 'champion-conjugaison',
      icon: '📗',
      label: 'Champion de la conjugaison',
      tier: 'argent',
      description: 'Réussir le critère Conjugaison sur au moins 5 joggings évalués, dans au moins 4 cas sur 5.',
      check: s => s.rateC.enough && s.rateC.rate >= 0.8
    },
    {
      id: 'champion-orthographe',
      icon: '📘',
      label: "Champion de l'orthographe",
      tier: 'argent',
      description: 'Réussir le critère Orthographe sur au moins 5 joggings évalués, dans au moins 4 cas sur 5.',
      check: s => s.rateO.enough && s.rateO.rate >= 0.8
    },
    {
      id: 'perseverant',
      icon: '🔥',
      label: 'Persévérant',
      tier: 'bronze',
      description: "Faire des joggings d'écriture sur au moins 5 jours différents.",
      check: s => s.distinctDays >= 5
    }
  ];

  /* completedSessions : sessions avec status === 'completed'.
     lastVersionBySession : Map(session_id -> dernière version). */
  function evaluateEarnedBadges(completedSessions, lastVersionBySession) {
    const stats = computeStats(completedSessions, lastVersionBySession);
    return BADGE_DEFS.filter(b => b.check(stats)).map(b => b.id);
  }

  /* Écrit en base les badges nouvellement gagnés (jamais de suppression :
     un badge gagné reste gagné, même si les stats évoluent ensuite). */
  async function syncBadges(studentId, completedSessions, lastVersionBySession) {
    if (!window.lfmDb || !studentId) return evaluateEarnedBadges(completedSessions, lastVersionBySession);

    const earnedIds = evaluateEarnedBadges(completedSessions, lastVersionBySession);

    const { data: existing } = await window.lfmDb
      .from('jogging_badges')
      .select('badge_id')
      .eq('student_id', studentId)
      .limit(2000);

    const existingIds = new Set((existing || []).map(r => r.badge_id));
    const newIds = earnedIds.filter(id => !existingIds.has(id));

    if (newIds.length > 0) {
      await window.lfmDb.from('jogging_badges').insert(
        newIds.map(badge_id => ({ student_id: studentId, badge_id }))
      );
    }

    return earnedIds;
  }

  function renderBadgesGrid(earnedIds) {
    const earned = new Set(earnedIds || []);
    return `<div class="laurel-badges-grid">` + BADGE_DEFS.map(b => {
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

  return { BADGE_DEFS, evaluateEarnedBadges, syncBadges, renderBadgesGrid };
})();

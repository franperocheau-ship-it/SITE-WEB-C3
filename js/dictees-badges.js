/* ─────────────────────────────────────────────────────────────────────────────
   dictees-badges.js — Badges du module Dictées préparées.

   Réutilise la table jogging_badges (student_id, badge_id, earned_at) : cette
   table n'a en réalité aucune dépendance au module Rédaction — seul
   jogging_carnet référence des jogging_sessions, jogging_badges est déjà un
   simple journal d'attributions générique. Pas de nouvelle table, pas de
   second système visuel : les badges dictées et joggings sont fusionnés dans
   le même carnet (voir js/jogging-student-space.js, renderReussites).

   Identifiants préfixés "dictee-" pour ne jamais entrer en collision avec un
   badge_id du catalogue joggings (js/jogging-badges.js) au sein de la même
   table.

   Attribution déterministe et rejouable à partir de dictee_results déjà
   chargés — aucun appel externe, même patron que jogging-badges.js.

   Expose DicteesBadges.{ BADGE_DEFS, evaluateEarnedBadges, syncBadges }.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesBadges = (() => {
  /* results : lignes dictee_results de l'élève (tous exercices confondus). */
  function computeStats(results) {
    const completedDictees = new Set(
      results.filter(r => r.exercice === 2).map(r => r.dictee_id)
    );
    const sansFauteDictees = new Set(
      results.filter(r => r.exercice === 2 && r.sans_faute).map(r => r.dictee_id)
    );
    const premierCoupTotal = results
      .filter(r => r.exercice === 1)
      .reduce((sum, r) => sum + (r.score || 0), 0);

    return {
      completedCount: completedDictees.size,
      sansFauteCount: sansFauteDictees.size,
      premierCoupTotal
    };
  }

  const BADGE_DEFS = [
    {
      id: 'dictee-premiere',
      icon: '🖊️',
      label: 'Première dictée',
      tier: 'bronze',
      description: 'Terminer ta toute première dictée préparée.',
      check: s => s.completedCount >= 1
    },
    {
      id: 'dictee-sans-faute',
      icon: '✨',
      label: 'Sans faute !',
      tier: 'argent',
      description: "Réussir une dictée sans aucun mot raté à l'exercice de répétition.",
      check: s => s.sansFauteCount >= 1
    },
    {
      id: 'dictee-marathonien',
      icon: '🏃',
      label: "Marathonien de l'orthographe",
      tier: 'or',
      description: 'Terminer 10 dictées préparées.',
      check: s => s.completedCount >= 10
    },
    {
      id: 'dictee-champion',
      icon: '🏆',
      label: 'Champion des dictées',
      tier: 'or',
      description: 'Réussir 5 dictées sans aucun mot raté.',
      check: s => s.sansFauteCount >= 5
    },
    {
      id: 'dictee-oreille-fine',
      icon: '👂',
      label: 'Oreille fine',
      tier: 'argent',
      description: 'Écrire correctement 20 mots dès la première écoute (capsule sonore).',
      check: s => s.premierCoupTotal >= 20
    }
  ];

  function evaluateEarnedBadges(results) {
    const stats = computeStats(results);
    return BADGE_DEFS.filter(b => b.check(stats)).map(b => b.id);
  }

  /* Écrit en base les badges nouvellement gagnés (jamais de suppression). */
  async function syncBadges(studentId, results) {
    if (!window.lfmDb || !studentId) return evaluateEarnedBadges(results);

    const earnedIds = evaluateEarnedBadges(results);

    const { data: existing, error: selErr } = await window.lfmDb
      .from('jogging_badges')
      .select('badge_id')
      .eq('student_id', studentId)
      .limit(2000);
    if (selErr) console.warn('[LFM] DicteesBadges.syncBadges (select):', selErr.message);

    const existingIds = new Set((existing || []).map(r => r.badge_id));
    const newIds = earnedIds.filter(id => !existingIds.has(id));

    if (newIds.length > 0) {
      const { error: insErr } = await window.lfmDb.from('jogging_badges').insert(
        newIds.map(badge_id => ({ student_id: studentId, badge_id }))
      );
      if (insErr) console.warn('[LFM] DicteesBadges.syncBadges (insert):', insErr.message);
    }

    return earnedIds;
  }

  return { BADGE_DEFS, evaluateEarnedBadges, syncBadges };
})();

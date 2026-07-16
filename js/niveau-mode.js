/* ─────────────────────────────────────────────────────────────────────────────
   niveau-mode.js — Progression dans les niveaux d'un exercice (competence_settings).
   Dépend de : supabase-client.js (window.lfmDb), auth.js (lfmAuth)
   Utilisé par : js/level-select.js, pour savoir si un exercice donné est en
   'progressif' (déverrouillage séquentiel à 80 %, comportement historique) ou
   'ouvert' (tous les niveaux accessibles d'emblée), réglage par classe et par
   exercice piloté par l'enseignant (pilotage-enseignant.html).

   Sans rapport avec lfmGuidedAccess (guided-access.js), qui contrôle la
   visibilité du catalogue — deux axes orthogonaux, voir
   supabase-migration-v10-competence-settings.sql.

   Repli sur 'progressif' (comportement actuel, jamais de rupture) dans tous
   les cas ambigus : visiteur anonyme, erreur réseau, élève sans classe,
   réglage absent. Un cache par exerciseKey (pas un cache unique comme
   lfmGuidedAccess) car plusieurs LevelSelect peuvent coexister sur une même
   page pour des exercices différents.
   ───────────────────────────────────────────────────────────────────────────── */

const lfmNiveauMode = (() => {
  const PROGRESSIF = 'progressif';
  const _cache = new Map(); // exerciseKey -> Promise<'progressif'|'ouvert'>

  async function fetchMode(exerciseKey) {
    if (!window.lfmDb || typeof lfmAuth === 'undefined') return PROGRESSIF;

    try {
      const session = await lfmAuth.getSession();
      if (!session) return PROGRESSIF;

      const { data, error } = await window.lfmDb.rpc('get_my_niveau_mode', { p_exercise_id: exerciseKey });
      if (error) {
        console.warn('[lfmNiveauMode] get_my_niveau_mode:', error.message);
        return PROGRESSIF;
      }
      return data === 'ouvert' ? 'ouvert' : PROGRESSIF;
    } catch (err) {
      console.warn('[lfmNiveauMode] get():', err.message);
      return PROGRESSIF;
    }
  }

  /* Une requête par exerciseKey par page (mise en cache de la promesse, pas
     seulement du résultat, pour dédupliquer des appels concurrents). */
  function get(exerciseKey) {
    if (!_cache.has(exerciseKey)) {
      _cache.set(exerciseKey, fetchMode(exerciseKey));
    }
    return _cache.get(exerciseKey);
  }

  return { get };
})();

/* ─────────────────────────────────────────────────────────────────────────────
   guided-access.js — Accès élève au "parcours guidé" (mode_acces des classes).
   Dépend de : supabase-client.js (window.lfmDb), auth.js (lfmAuth)
   Utilisé par : exercise.html (blocage direct par URL) et les pages de
   notions (français-grammaire.html, français-conjugaison.html,
   français-orthographe.html, mathématiques-nombres-entiers.html,
   mathématiques-fractions.html) pour griser les exercices non activés.

   Repli sur 'libre' (accès total) dans tous les cas ambigus : visiteur
   anonyme, erreur réseau, élève sans classe — jamais de blocage par défaut.
   ───────────────────────────────────────────────────────────────────────────── */

const lfmGuidedAccess = (() => {
  let _cache = null; // { mode: 'libre'|'guide', activeSlugs: Set|null }

  const OPEN_ACCESS = { mode: 'libre', activeSlugs: null };

  /* Récupère (et met en cache pour la durée de la page) le mode d'accès et,
     en mode guidé, l'ensemble des exercise_id activés pour la classe de
     l'élève connecté. */
  async function get() {
    if (_cache) return _cache;

    if (!window.lfmDb || typeof lfmAuth === 'undefined') {
      _cache = OPEN_ACCESS;
      return _cache;
    }

    try {
      const session = await lfmAuth.getSession();
      if (!session) {
        _cache = OPEN_ACCESS;
        return _cache;
      }

      const { data, error } = await window.lfmDb.rpc('get_my_guided_access');
      if (error || !data || !data.length) {
        if (error) console.warn('[lfmGuidedAccess] get_my_guided_access:', error.message);
        _cache = OPEN_ACCESS;
        return _cache;
      }

      const row = data[0];
      _cache = row.mode_acces === 'guide'
        ? { mode: 'guide', activeSlugs: new Set(row.active_exercise_ids || []) }
        : OPEN_ACCESS;
    } catch (err) {
      console.warn('[lfmGuidedAccess] get():', err.message);
      _cache = OPEN_ACCESS;
    }
    return _cache;
  }

  /* Lecture synchrone après un premier get() — pour les rendus synchrones
     (ex. renderSkillCard dans les pages de notions). Si get() n'a jamais été
     appelé, on refuse plutôt de bloquer par erreur (accès ouvert). */
  function isAllowedSync(slug) {
    if (!_cache || _cache.mode !== 'guide') return true;
    return _cache.activeSlugs.has(slug);
  }

  /* Variante asynchrone pratique pour un contrôle isolé (ex. exercise.html). */
  async function isAllowed(slug) {
    await get();
    return isAllowedSync(slug);
  }

  return { get, isAllowed, isAllowedSync };
})();

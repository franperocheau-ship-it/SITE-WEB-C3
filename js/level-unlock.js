/* ─────────────────────────────────────────────────────────────────────────────
   level-unlock.js — Déblocage des niveaux (js/level-select.js) dérivé des
   résultats Supabase (exercise_results) pour un élève connecté.
   Dépend de : supabase-client.js (window.lfmDb), auth.js (lfmAuth)
   Utilisé par : js/level-select.js, pour retrouver — au chargement d'une
   page d'exercice — les niveaux déjà validés (score/total >= threshold) lors
   d'une session précédente, alors que sessionStorage (seule source jusqu'ici)
   a été vidé entre deux visites.

   La colonne exercise_results.level encode l'id LevelSelect de façons
   différentes selon le type d'exercice (id brut, ou "Niveau "+id pour
   quelques types plus anciens) — voir le plan d'implémentation. Le matching
   ci-dessous accepte les deux formats génériquement, sans table de
   correspondance par type.

   Repli sur un tableau vide dans tous les cas ambigus : visiteur anonyme,
   erreur réseau, aucun résultat, colonne "level" dans un format inconnu —
   jamais d'erreur bloquante, sessionStorage reste alors l'unique source
   (comportement actuel, aucune rupture).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmLevelUnlock = (() => {
  const _cache = new Map(); // exerciseKey -> Promise<Array<string|number>>

  async function fetchValidated(exerciseKey, levelIds, threshold) {
    if (!window.lfmDb || typeof lfmAuth === 'undefined') return [];

    try {
      const session = await lfmAuth.getSession();
      if (!session) return [];

      const { data, error } = await window.lfmDb
        .from('exercise_results')
        .select('level')
        .eq('exercise_slug', exerciseKey)
        .gte('pct', threshold * 100);

      if (error) {
        console.warn('[lfmLevelUnlock] fetchValidated:', error.message);
        return [];
      }

      const validated = new Set();
      for (const row of data) {
        for (const id of levelIds) {
          if (row.level === String(id) || row.level === `Niveau ${id}`) validated.add(id);
        }
      }
      return [...validated];
    } catch (err) {
      console.warn('[lfmLevelUnlock] get():', err.message);
      return [];
    }
  }

  /* Une requête par exerciseKey par page (mise en cache de la promesse, pas
     seulement du résultat, pour dédupliquer des appels concurrents). */
  function get(exerciseKey, levelIds, threshold) {
    if (!_cache.has(exerciseKey)) {
      _cache.set(exerciseKey, fetchValidated(exerciseKey, levelIds, threshold));
    }
    return _cache.get(exerciseKey);
  }

  return { get };
})();

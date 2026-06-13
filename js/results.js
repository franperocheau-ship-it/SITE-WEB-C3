/* ─────────────────────────────────────────────────────────────────────────────
   results.js — Sauvegarde des résultats d'exercice pour un élève connecté.
   Dépend de : supabase-client.js  (window.lfmDb)
               auth.js             (window.lfmAuth)
   ───────────────────────────────────────────────────────────────────────────── */

async function saveExerciseResult({
  exerciseSlug,
  subject,
  category     = null,
  exerciseType = null,
  level        = null,
  score,
  total,
  durationSecs = null
}) {
  /* Silencieux si Supabase non configuré ou si l'utilisateur est anonyme */
  if (!window.lfmDb || typeof lfmAuth === 'undefined') return;

  try {
    const session = await lfmAuth.getSession();
    if (!session) return;

    /* La contrainte DB n'accepte que ces deux valeurs */
    if (!['français', 'mathématiques'].includes(subject)) return;

    const { error } = await window.lfmDb.from('exercise_results').insert({
      student_id:    session.user.id,
      exercise_slug: exerciseSlug,
      subject,
      category:      category     || null,
      exercise_type: exerciseType || null,
      level:         level        || null,
      score,
      total,
      duration_secs: durationSecs || null
    });

    if (error) console.warn('[LFM] saveExerciseResult:', error.message);
  } catch (err) {
    console.warn('[LFM] saveExerciseResult:', err.message);
  }
}

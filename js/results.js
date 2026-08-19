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
  durationSecs = null,
  attemptId    = null,   /* uuid généré côté appelant au début de la tentative */
  itemResults  = null    /* [{ item_id, is_correct, level }, ...] — insert groupé si fourni avec attemptId */
}) {
  /* Silencieux si Supabase non configuré ou si l'utilisateur est anonyme */
  if (!window.lfmDb || typeof lfmAuth === 'undefined') return;

  try {
    const session = await lfmAuth.getSession();
    if (!session) return;

    /* La contrainte DB n'accepte que ces deux valeurs */
    if (!['français', 'mathématiques'].includes(subject)) return;

    /* Titre lisible depuis EXERCISE_DATA (chargé dans exercise.html) */
    const exerciseTitle =
      (typeof EXERCISE_DATA !== 'undefined' && EXERCISE_DATA[exerciseSlug])
        ? EXERCISE_DATA[exerciseSlug].title
        : null;

    const resultRow = {
      student_id:     session.user.id,
      exercise_slug:  exerciseSlug,
      exercise_title: exerciseTitle,
      subject,
      category:       category     || 'général',
      exercise_type:  exerciseType || null,
      level:          level        || null,
      score,
      total,
      duration_secs:  durationSecs || null
    };
    /* attemptId explicite (au lieu du défaut gen_random_uuid() serveur) pour
       pouvoir le réutiliser tel quel comme exercise_item_results.attempt_id
       — lien logique entre les deux tables, pas de foreign key. */
    if (attemptId) resultRow.id = attemptId;

    const { error } = await window.lfmDb.from('exercise_results').insert(resultRow);
    if (error) console.warn('[LFM] saveExerciseResult:', error.message);

    if (attemptId && itemResults && itemResults.length) {
      /* level transmis tel quel par l'appelant (niveau connu au runtime au
         moment de la réponse), jamais recalculé depuis le suffixe "-nX-" de
         item_id : cet id reste figé une fois attribué (scripts/add-item-
         ids.js) même si l'item change de niveau après une restructuration
         future — seul le niveau réellement joué fait foi. */
      const itemRows = itemResults
        .filter(r => r.level != null)
        .map(r => ({
          student_id:    session.user.id,
          attempt_id:    attemptId,
          exercise_slug: exerciseSlug,
          level:         r.level,
          item_id:       r.item_id,
          is_correct:    r.is_correct
        }));

      if (itemRows.length) {
        const { error: itemError } = await window.lfmDb.from('exercise_item_results').insert(itemRows);
        if (itemError) console.warn('[LFM] saveExerciseResult (items):', itemError.message);
      }
    }
  } catch (err) {
    console.warn('[LFM] saveExerciseResult:', err.message);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-bibliotheque.js — Bibliothèque communautaire d'évaluations
   (mode "3ᵉ option" du générateur, voir evaluations-enseignant.html
   #ev-view-biblio). Lit les évaluations partagées + validées (RLS
   evaluations_select, voir supabase/migrations/20260829100000_evaluations_partage.sql)
   et leurs likes (evaluation_likes, même migration).

   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const EvaluationsBibliotheque = (() => {
  const db = window.lfmDb;

  /* Retourne { evaluations, likes } séparément plutôt qu'un likes_count déjà
     agrégé : la page a besoin à la fois du compte ET de savoir si
     l'enseignant courant a déjà liké chaque évaluation (pour l'état du
     bouton) — les deux se calculent en une passe côté client à partir de
     la même liste de likes, pas la peine d'une vue/RPC pour ce volume. */
  async function getPublished() {
    const { data, error } = await db.from('evaluations')
      .select('id, titre, classe, niveau, niveau_autre, criteres, exercices, domaine, sous_domaine, afficher_auteur, created_at, updated_at, profiles(display_name)')
      .eq('partage', true)
      .eq('statut_validation', 'validee')
      .order('created_at', { ascending: false });
    if (error) throw error;

    const evaluations = data || [];
    const ids = evaluations.map(e => e.id);
    let likes = [];
    if (ids.length) {
      const { data: likesData, error: likesError } = await db.from('evaluation_likes')
        .select('evaluation_id, teacher_id')
        .in('evaluation_id', ids);
      if (likesError) throw likesError;
      likes = likesData || [];
    }
    return { evaluations, likes };
  }

  async function like(evaluationId, teacherId) {
    const { error } = await db.from('evaluation_likes')
      .insert({ evaluation_id: evaluationId, teacher_id: teacherId });
    if (error) throw error;
  }

  async function unlike(evaluationId, teacherId) {
    const { error } = await db.from('evaluation_likes')
      .delete()
      .eq('evaluation_id', evaluationId)
      .eq('teacher_id', teacherId);
    if (error) throw error;
  }

  return { getPublished, like, unlike };
})();

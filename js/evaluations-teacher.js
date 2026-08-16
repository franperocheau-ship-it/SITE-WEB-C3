/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-teacher.js — CRUD pour le module Évaluations (voir
   supabase/migrations/20260826100000, 20260827100000, 20260829100000).
   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmEvaluationsTeacher = (() => {
  const db = window.lfmDb;

  const SELECT_LISTE = 'id, classe, niveau, niveau_autre, titre, criteres, exercices, mode, partage, statut_validation, motif_refus, domaine, sous_domaine, afficher_auteur, created_at, updated_at';

  async function getEvaluations() {
    const { data, error } = await db
      .from('evaluations')
      .select(SELECT_LISTE)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Vue admin (modération) : toutes les évaluations partagées, tous
     enseignants, tous statuts — voir evaluations_select (RLS, réserve
     cette lecture à teacher_id=auth.uid() OU admin OU validée+partagée ;
     un admin voit donc bien tout ce qui suit, y compris en_attente/
     rejetee des autres enseignants). L'auteur réel est toujours renvoyé
     ici (afficher_auteur ne régit que l'affichage public de la
     bibliothèque, pas la vue de modération). */
  async function getAllShared() {
    const { data, error } = await db
      .from('evaluations')
      .select(SELECT_LISTE + ', profiles(display_name)')
      .eq('partage', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function getEvaluation(id) {
    const { data, error } = await db
      .from('evaluations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  /* fields : { classe, niveau, niveauAutre, titre, criteres, exercices,
     mode, partage, afficherAuteur, domaine, sousDomaine } — objet plutôt
     que paramètres positionnels (trop nombreux pour en retenir l'ordre,
     notamment les deux booléens partage/afficherAuteur, faciles à
     mélanger). */
  function toRow(fields) {
    return {
      classe: fields.classe,
      niveau: fields.niveau || null,
      niveau_autre: fields.niveau === 'autre' ? (fields.niveauAutre || null) : null,
      titre: fields.titre,
      criteres: fields.criteres,
      exercices: fields.exercices,
      mode: fields.mode || 'seul',
      partage: !!fields.partage,
      afficher_auteur: !!fields.afficherAuteur,
      domaine: fields.domaine || null,
      sous_domaine: fields.sousDomaine || null
    };
  }

  async function createEvaluation(teacherId, fields) {
    const { data, error } = await db
      .from('evaluations')
      .insert({ teacher_id: teacherId, ...toRow(fields) })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function updateEvaluation(id, fields) {
    const { data, error } = await db
      .from('evaluations')
      .update(toRow(fields))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function deleteEvaluation(id) {
    const { error } = await db.from('evaluations').delete().eq('id', id);
    if (error) throw error;
  }

  return { getEvaluations, getAllShared, getEvaluation, createEvaluation, updateEvaluation, deleteEvaluation };
})();

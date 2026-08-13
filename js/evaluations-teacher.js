/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-teacher.js — CRUD pour le module Évaluations (MVP, saisie 100%
   manuelle par l'enseignant, voir supabase/migrations/20260826100000).
   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmEvaluationsTeacher = (() => {
  const db = window.lfmDb;

  async function getEvaluations() {
    const { data, error } = await db
      .from('evaluations')
      .select('id, classe, titre, criteres, exercices, mode, created_at, updated_at')
      .order('updated_at', { ascending: false });
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

  async function createEvaluation(teacherId, classe, titre, criteres, exercices, mode) {
    const { data, error } = await db
      .from('evaluations')
      .insert({ teacher_id: teacherId, classe, titre, criteres, exercices, mode: mode || 'seul' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function updateEvaluation(id, classe, titre, criteres, exercices, mode) {
    const { data, error } = await db
      .from('evaluations')
      .update({ classe, titre, criteres, exercices, mode: mode || 'seul' })
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

  return { getEvaluations, getEvaluation, createEvaluation, updateEvaluation, deleteEvaluation };
})();

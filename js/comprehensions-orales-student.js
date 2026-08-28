/* ─────────────────────────────────────────────────────────────────────────────
   comprehensions-orales-student.js — Accès aux données du module Compréhension
   orale côté élève. Dépend de : supabase-client.js (window.lfmDb).

   Utilisé par francais-oral.html. La liste des compréhensions orales publiées
   est lue directement (RLS comprehensions_orales_select_published), mais le
   contenu jouable (questions/propositions) et la correction passent par des
   fonctions RPC — jamais par une lecture directe de comprehension_orale_
   questions, qui exposerait les bonnes réponses avant que l'élève n'ait
   répondu (voir supabase/migrations/20260920100000_comprehensions_orales.sql).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmComprehensionsOralesStudent = (() => {
  const db = window.lfmDb;

  async function listPublished() {
    const { data, error } = await db.from('comprehensions_orales')
      .select('id, titre_episode, description, created_at')
      .eq('statut', 'publie')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Contenu jouable d'une compréhension orale : questions + propositions,
     sans indication de la ou des bonne(s) réponse(s). */
  async function getContent(id) {
    const { data, error } = await db.rpc('get_comprehension_orale_pour_eleve', { p_id: id });
    if (error) throw error;
    return data;
  }

  /* Soumet les réponses de l'élève, obtient le score calculé côté serveur et
     le détail de correction pour l'écran de révision.
     reponses : [{ question_id, reponse_indices: [...] }] pour une question qcm,
     ou [{ question_id, reponse_texte: '...' }] pour une question reponse_libre
     (voir comprehension_orale_questions.type_question). */
  async function submitResult(id, reponses) {
    const { data, error } = await db.rpc('soumettre_resultat_comprehension_orale', {
      p_id: id,
      p_reponses: reponses
    });
    if (error) throw error;
    return data;
  }

  return { listPublished, getContent, submitResult };
})();

/* ─────────────────────────────────────────────────────────────────────────────
   questionnaires-student.js — Accès aux données du module Questionnaires de
   lecture côté élève. Dépend de : supabase-client.js (window.lfmDb).

   Utilisé par questionnaires-lecture.html. La liste des questionnaires
   publiés est lue directement (RLS questionnaires_select_published), mais le
   contenu jouable (questions/réponses) et la correction passent par des
   fonctions RPC — jamais par une lecture directe des tables questions/
   reponses, qui exposerait la bonne réponse avant que l'élève n'ait répondu
   (voir supabase/migrations/20260807120000_questionnaires_lecture.sql).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmQuestionnairesStudent = (() => {
  const db = window.lfmDb;

  /* Bibliothèque des questionnaires publiés (métadonnées seules — titre,
     auteur de l'œuvre, nombre de questions). */
  async function listPublished() {
    const { data, error } = await db.from('questionnaires')
      .select('id, titre_oeuvre, auteur_oeuvre, nb_questions, created_at')
      .eq('statut', 'publie')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Contenu jouable d'un questionnaire : questions + propositions de réponse,
     sans indication de la bonne réponse. */
  async function getQuestionnaireContent(questionnaireId) {
    const { data, error } = await db.rpc('get_questionnaire_pour_eleve', {
      p_questionnaire_id: questionnaireId
    });
    if (error) throw error;
    return data;
  }

  /* Soumet les réponses de l'élève, obtient le score calculé côté serveur et
     le détail de correction pour l'écran de révision.
     reponses : [{ question_id, reponse_ids: [...] }] */
  async function submitResult(questionnaireId, reponses) {
    const { data, error } = await db.rpc('soumettre_resultat_questionnaire', {
      p_questionnaire_id: questionnaireId,
      p_reponses: reponses
    });
    if (error) throw error;
    return data;
  }

  return { listPublished, getQuestionnaireContent, submitResult };
})();

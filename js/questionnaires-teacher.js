/* ─────────────────────────────────────────────────────────────────────────────
   questionnaires-teacher.js — Accès aux données du module Questionnaires de
   lecture côté enseignant. Dépend de : supabase-client.js (window.lfmDb).

   Utilisé par questionnaires-enseignant.html. Pas d'Edge Function : les
   lectures/écritures passent directement par le SDK Supabase, protégées par
   RLS (voir supabase/migrations/20260807120000_questionnaires_lecture.sql).

   Contrairement aux dictées (propriété d'une classe), un questionnaire
   appartient à son auteur et devient visible de tous une fois publié : cette
   API ne prend donc aucun classId, seulement l'id du profil enseignant
   connecté.
   ───────────────────────────────────────────────────────────────────────────── */

const lfmQuestionnairesTeacher = (() => {
  const db = window.lfmDb;

  /* Liste des questionnaires créés par l'enseignant connecté. */
  async function getMyQuestionnaires(teacherId) {
    const { data, error } = await db.from('questionnaires').select('*')
      .eq('author_id', teacherId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Questionnaire complet (pour édition), questions triées par ordre, chaque
     question portant ses réponses. */
  async function getQuestionnaire(questionnaireId) {
    const { data: questionnaire, error } = await db.from('questionnaires').select('*')
      .eq('id', questionnaireId).single();
    if (error) throw error;

    const { data: questions, error: qErr } = await db.from('questions').select('*')
      .eq('questionnaire_id', questionnaireId).order('ordre', { ascending: true });
    if (qErr) throw qErr;

    const questionIds = (questions || []).map(q => q.id);
    let reponsesByQuestion = new Map();
    if (questionIds.length > 0) {
      const { data: reponses, error: rErr } = await db.from('reponses').select('*')
        .in('question_id', questionIds);
      if (rErr) throw rErr;
      (reponses || []).forEach(r => {
        if (!reponsesByQuestion.has(r.question_id)) reponsesByQuestion.set(r.question_id, []);
        reponsesByQuestion.get(r.question_id).push(r);
      });
    }

    const fullQuestions = (questions || []).map(q => ({
      ...q,
      reponses: reponsesByQuestion.get(q.id) || []
    }));

    return { questionnaire, questions: fullQuestions };
  }

  async function createQuestionnaire(authorId, titreOeuvre, auteurOeuvre) {
    const { data, error } = await db.from('questionnaires').insert({
      author_id: authorId,
      titre_oeuvre: titreOeuvre.trim(),
      auteur_oeuvre: auteurOeuvre ? auteurOeuvre.trim() : null
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function updateQuestionnaireMeta(questionnaireId, titreOeuvre, auteurOeuvre) {
    const { error } = await db.from('questionnaires').update({
      titre_oeuvre: titreOeuvre.trim(),
      auteur_oeuvre: auteurOeuvre ? auteurOeuvre.trim() : null
    }).eq('id', questionnaireId);
    if (error) throw error;
  }

  /* Remplace intégralement les questions (et leurs réponses) d'un
     questionnaire — le formulaire enseignant ressaisit la liste entière à
     chaque enregistrement, comme dictees-teacher.js/replaceMots. Insertion
     séquentielle (pas en lot) : chaque réponse a besoin de l'id réel de sa
     question, généré par la base au moment de l'insertion. */
  async function replaceQuestions(questionnaireId, questions) {
    const { error: delErr } = await db.from('questions').delete().eq('questionnaire_id', questionnaireId);
    if (delErr) throw delErr;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const { data: qRow, error: qErr } = await db.from('questions').insert({
        questionnaire_id: questionnaireId,
        enonce: q.enonce.trim(),
        ordre: i,
        explication: q.explication ? q.explication.trim() : null
      }).select().single();
      if (qErr) throw qErr;

      const reponsesRows = q.reponses.map(r => ({
        question_id: qRow.id,
        texte: r.texte.trim(),
        est_correcte: !!r.est_correcte
      }));
      const { error: rErr } = await db.from('reponses').insert(reponsesRows);
      if (rErr) throw rErr;
    }
  }

  async function setStatut(questionnaireId, statut) {
    const { error } = await db.from('questionnaires').update({ statut }).eq('id', questionnaireId);
    if (error) throw error;
  }

  async function deleteQuestionnaire(questionnaireId) {
    const { error } = await db.from('questionnaires').delete().eq('id', questionnaireId);
    if (error) throw error;
  }

  return {
    getMyQuestionnaires, getQuestionnaire, createQuestionnaire,
    updateQuestionnaireMeta, replaceQuestions, setStatut, deleteQuestionnaire
  };
})();

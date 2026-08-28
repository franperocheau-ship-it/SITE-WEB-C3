/* ─────────────────────────────────────────────────────────────────────────────
   comprehensions-orales-admin.js — Accès aux données du module Compréhension
   orale côté admin. Dépend de : supabase-client.js (window.lfmDb).

   Utilisé par comprehension-orale-admin.html. Contrairement aux questionnaires
   de lecture (n'importe quel enseignant, bibliothèque partagée), seul l'admin
   crée/modifie/publie une compréhension orale — pas de notion d'auteur
   multiple, pas de visibilite, pas de workflow en_attente/masque (voir
   supabase/migrations/20260920100000_comprehensions_orales.sql). Les
   lectures/écritures passent directement par le SDK Supabase, protégées par
   RLS (my_role() = 'admin' partout en écriture).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmComprehensionsOralesAdmin = (() => {
  const db = window.lfmDb;

  /* Liste de toutes les compréhensions orales (tous statuts — l'admin voit
     tout via comprehensions_orales_select_admin). */
  async function getAll() {
    const { data, error } = await db.from('comprehensions_orales').select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Compréhension orale complète (pour édition), questions triées par ordre. */
  async function getOne(id) {
    const { data: comprehensionOrale, error } = await db.from('comprehensions_orales').select('*')
      .eq('id', id).single();
    if (error) throw error;

    const { data: questions, error: qErr } = await db.from('comprehension_orale_questions').select('*')
      .eq('comprehension_orale_id', id).order('ordre', { ascending: true });
    if (qErr) throw qErr;

    return { comprehensionOrale, questions: questions || [] };
  }

  async function create(adminId, titreEpisode, idEpisodeFranceInter, description) {
    const { data, error } = await db.from('comprehensions_orales').insert({
      created_by: adminId,
      titre_episode: titreEpisode.trim(),
      id_episode_france_inter: idEpisodeFranceInter.trim(),
      description: description ? description.trim() : null
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function updateMeta(id, titreEpisode, idEpisodeFranceInter, description) {
    const { error } = await db.from('comprehensions_orales').update({
      titre_episode: titreEpisode.trim(),
      id_episode_france_inter: idEpisodeFranceInter.trim(),
      description: description ? description.trim() : null
    }).eq('id', id);
    if (error) throw error;
  }

  /* Remplace intégralement les questions d'une compréhension orale — le
     formulaire admin ressaisit la liste entière à chaque enregistrement,
     comme questionnaires-teacher.js/replaceQuestions. Un seul insert par
     question (propositions/bonnes_reponses en jsonb sur la même ligne, pas
     de table enfant à alimenter séparément). */
  async function replaceQuestions(id, questions) {
    const { error: delErr } = await db.from('comprehension_orale_questions').delete()
      .eq('comprehension_orale_id', id);
    if (delErr) throw delErr;

    const rows = questions.map((q, i) => ({
      comprehension_orale_id: id,
      ordre: i,
      enonce: q.enonce.trim(),
      type_question: q.typeQuestion || 'qcm',
      propositions: q.propositions,
      bonnes_reponses: q.bonnesReponses,
      explication: q.explication ? q.explication.trim() : null
    }));
    if (rows.length === 0) return;

    const { error } = await db.from('comprehension_orale_questions').insert(rows);
    if (error) throw error;
  }

  async function setStatut(id, statut) {
    const { error } = await db.from('comprehensions_orales').update({ statut }).eq('id', id);
    if (error) throw error;
  }

  async function remove(id) {
    const { error } = await db.from('comprehensions_orales').delete().eq('id', id);
    if (error) throw error;
  }

  return { getAll, getOne, create, updateMeta, replaceQuestions, setStatut, remove };
})();

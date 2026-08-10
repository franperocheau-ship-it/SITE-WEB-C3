/* ─────────────────────────────────────────────────────────────────────────────
   champ-lexical-teacher.js — Accès aux données du module Corpus lexical /
   Champ lexical côté enseignant (Phase 2 : création, édition, fork). Dépend
   de : supabase-client.js (window.lfmDb).

   Utilisé par vocabulaire-corpus-enseignant.html. Pas d'Edge Function : les
   lectures/écritures passent directement par le SDK Supabase, protégées par
   RLS (voir supabase/migrations/20260809120000_corpus_lexicaux.sql — les
   policies insert/update/delete auteur-ou-admin y existaient déjà depuis la
   Phase 1, simplement inutilisées avant cette UI).

   Comme questionnaires-teacher.js : un corpus/champ appartient à son auteur
   et devient visible de tous une fois publié — cette API ne prend donc
   jamais de classId, seulement l'id du profil enseignant connecté.
   ───────────────────────────────────────────────────────────────────────────── */

const lfmChampLexicalTeacher = (() => {
  const db = window.lfmDb;

  const CATEGORIES = ['synonyme', 'antonyme', 'adjectif', 'derive', 'expression', 'soutenu', 'familier'];

  /* Corpus proposés dans le sélecteur du formulaire champ : les miens (tout
     statut) + ceux publiés par d'autres (pour rattacher un nouveau champ à
     une catégorie déjà partagée). */
  async function getCorpusOptions(teacherId) {
    const { data, error } = await db.from('corpus_lexicaux')
      .select('id, titre, author_id, statut')
      .or(`author_id.eq.${teacherId},statut.eq.publie`)
      .order('titre', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function createCorpus(authorId, titre, description, slug) {
    const { data, error } = await db.from('corpus_lexicaux').insert({
      author_id: authorId,
      titre: titre.trim(),
      description: description ? description.trim() : null,
      slug
    }).select().single();
    if (error) throw error;
    return data;
  }

  /* Mes champs lexicaux (tout statut), avec le titre du corpus parent. */
  async function getMyChamps(teacherId) {
    const { data, error } = await db.from('champs_lexicaux')
      .select('*, corpus_lexicaux(titre)')
      .eq('author_id', teacherId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Bibliothèque partagée : champs publiés par d'autres enseignants. Lecture
     du nom de l'auteur autorisée par la policy profiles_select_own_or_staff
     (tout enseignant/admin peut lire tous les profils), pas besoin de RPC. */
  async function getSharedChamps(teacherId) {
    const { data, error } = await db.from('champs_lexicaux')
      .select('*, corpus_lexicaux(titre), profiles(display_name)')
      .eq('statut', 'publie')
      .neq('author_id', teacherId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Champ complet (pour édition ou comme source de fork), mots triés par
     catégorie puis ordre. */
  async function getChampFull(champId) {
    const { data: champ, error } = await db.from('champs_lexicaux').select('*')
      .eq('id', champId).single();
    if (error) throw error;

    const { data: mots, error: mErr } = await db.from('champ_lexical_mots').select('*')
      .eq('champ_id', champId).order('ordre', { ascending: true });
    if (mErr) throw mErr;

    return { champ, mots: mots || [] };
  }

  async function createChamp(authorId, { corpusId, theme, slug, contextualisation, statut }) {
    const { data, error } = await db.from('champs_lexicaux').insert({
      author_id: authorId,
      corpus_id: corpusId,
      theme: theme.trim(),
      slug,
      contextualisation: contextualisation ? contextualisation.trim() : null,
      statut
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function updateChampMeta(champId, { corpusId, theme, slug, contextualisation, statut }) {
    const { error } = await db.from('champs_lexicaux').update({
      corpus_id: corpusId,
      theme: theme.trim(),
      slug,
      contextualisation: contextualisation ? contextualisation.trim() : null,
      statut
    }).eq('id', champId);
    if (error) throw error;
  }

  /* Remplace intégralement les mots d'un champ — le formulaire ressaisit la
     liste entière à chaque enregistrement, comme questionnaires-teacher.js/
     replaceQuestions. Un seul insert groupé (contrairement aux questions,
     les mots n'ont pas d'enfants dépendant d'un id généré à la volée). */
  async function replaceMots(champId, motsRows) {
    const { error: delErr } = await db.from('champ_lexical_mots').delete().eq('champ_id', champId);
    if (delErr) throw delErr;

    if (motsRows.length === 0) return;

    const rows = motsRows.map((m, i) => ({
      champ_id: champId,
      categorie: m.categorie,
      mot: m.mot.trim(),
      exemple_phrase: m.exemple_phrase ? m.exemple_phrase.trim() : null,
      ordre: i
    }));
    const { error } = await db.from('champ_lexical_mots').insert(rows);
    if (error) throw error;
  }

  async function deleteChamp(champId) {
    const { error } = await db.from('champs_lexicaux').delete().eq('id', champId);
    if (error) throw error;
  }

  /* Copie complète d'un champ partagé par un collègue : nouvelle ligne
     champs_lexicaux (author_id = moi, copied_from = original, statut
     'brouillon' — copie de travail privée par défaut, à republier ou non),
     tous ses mots dupliqués. Pas de notion de classe dans le schéma (comme
     questionnaires) : "liée à ma classe" = ma propre copie éditable, pas une
     restriction technique de visibilité. */
  async function forkChamp(champId, authorId) {
    const { champ: source, mots } = await getChampFull(champId);

    const { data: forked, error } = await db.from('champs_lexicaux').insert({
      author_id: authorId,
      corpus_id: source.corpus_id,
      copied_from: source.id,
      theme: source.theme,
      slug: source.slug,
      contextualisation: source.contextualisation,
      statut: 'brouillon'
    }).select().single();
    if (error) throw error;

    if (mots.length > 0) {
      const rows = mots.map(m => ({
        champ_id: forked.id,
        categorie: m.categorie,
        mot: m.mot,
        exemple_phrase: m.exemple_phrase,
        ordre: m.ordre
      }));
      const { error: mErr } = await db.from('champ_lexical_mots').insert(rows);
      if (mErr) throw mErr;
    }

    return forked;
  }

  return {
    CATEGORIES,
    getCorpusOptions, createCorpus,
    getMyChamps, getSharedChamps, getChampFull,
    createChamp, updateChampMeta, replaceMots, deleteChamp, forkChamp
  };
})();

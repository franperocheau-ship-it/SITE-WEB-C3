/* ─────────────────────────────────────────────────────────────────────────────
   comprehensions-orales-teacher.js — Accès en lecture aux résultats du module
   Compréhension orale côté enseignant. Dépend de : supabase-client.js
   (window.lfmDb) ; getClassOralReport()/getStudentOralAttempts() dépendent en
   plus de js/teacher.js (lfmTeacher) et js/teacher-analytics.js
   (lfmAnalytics — non utilisé directement ici, le dédoublonnage par élève est
   réimplémenté localement sur comprehension_orale_id plutôt que sur un slug).

   Utilisé par resultats-oral-enseignant.html et resultats-enseignant.html
   (carte "Compréhension orale" de la fiche élève + synthèse PDF).
   Contrairement aux questionnaires de lecture, une compréhension orale est un
   contenu partagé créé par l'admin : ce module ne filtre donc jamais par
   auteur, seulement par statut publié (comprehensions_orales_select_
   published, ouverte à tout authentifié).

   Source des tentatives : resultats_comprehension_orale (table dédiée, un
   enregistrement par passage, avec son propre id) plutôt que exercise_results
   (mirror utilisé par le reste des dashboards, mais dédoublonné à un seul
   score par élève — perdrait la notion de "tentative précise" nécessaire
   pour la consultation en lecture seule d'un essai donné, voir
   get_comprehension_orale_resultat_detail dans la migration
   20260922100000_comprehension_orale_resultat_detail.sql). La RLS
   (resultats_co_select_teacher = is_my_student(), resultats_co_select_admin)
   restreint déjà cette table aux élèves de l'enseignant connecté (ou à tout
   le monde pour un admin).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmComprehensionsOralesTeacher = (() => {
  const db = window.lfmDb;

  async function getPublished() {
    const { data, error } = await db.from('comprehensions_orales').select('*')
      .eq('statut', 'publie')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  /* Toutes les tentatives (une ligne par passage, pas de dédoublonnage) de
     TOUTES les compréhensions orales, restreintes par RLS aux élèves de
     l'enseignant connecté (ou à tous pour un admin). */
  async function getResultatsForComprehensionsOrales() {
    const { data, error } = await db.from('resultats_comprehension_orale')
      .select('id, student_id, comprehension_orale_id, score, total, date_passage');
    if (error) throw error;
    return data || [];
  }

  /* Regroupe les tentatives brutes par comprehension_orale_id et calcule,
     pour chaque item fourni : nb d'élèves distincts + moyenne de classe
     (une seule fois par élève, sur sa meilleure tentative — même principe
     que lfmAnalytics.dedupeBestBySlug, réimplémenté ici sur
     comprehension_orale_id plutôt qu'un slug), et la liste COMPLÈTE des
     tentatives (chacune avec son resultat_id propre, pour permettre à
     l'enseignant de consulter n'importe laquelle, pas seulement la
     meilleure). */
  function groupResultsByComprehensionOrale(items, rows, studentById) {
    const byItem = new Map();
    rows.forEach(r => {
      if (!byItem.has(r.comprehension_orale_id)) byItem.set(r.comprehension_orale_id, []);
      byItem.get(r.comprehension_orale_id).push(r);
    });

    const summaries = new Map(); // item.id -> { count, avgPct, students: [...tentatives] }
    items.forEach(item => {
      const itemRows = byItem.get(item.id) || [];

      const bestPctByStudent = new Map();
      itemRows.forEach(r => {
        const pct = Math.round((r.score / r.total) * 100);
        const best = bestPctByStudent.get(r.student_id);
        if (best === undefined || pct > best) bestPctByStudent.set(r.student_id, pct);
      });
      const bestPcts = Array.from(bestPctByStudent.values());
      const avgPct = bestPcts.length ? Math.round(bestPcts.reduce((s, p) => s + p, 0) / bestPcts.length) : null;

      const attempts = itemRows
        .map(r => ({
          student: studentById.get(r.student_id),
          resultat_id: r.id,
          score: r.score, total: r.total,
          pct: Math.round((r.score / r.total) * 100),
          completed_at: r.date_passage
        }))
        .filter(a => a.student)
        .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));

      summaries.set(item.id, { count: bestPctByStudent.size, avgPct, students: attempts });
    });
    return summaries;
  }

  /* Rapport pour le hub "Résultats" enseignant (resultats-oral-enseignant.html) :
     toutes les compréhensions orales publiées, restreintes aux tentatives des
     élèves d'UNE classe. Seuls les items ayant au moins un élève ayant
     tenté sont conservés. */
  async function getClassOralReport(classId) {
    const [items, students, rows] = await Promise.all([
      getPublished(),
      lfmTeacher.getStudents(classId),
      getResultatsForComprehensionsOrales()
    ]);

    const authIds = new Set(students.map(s => s.auth_user_id).filter(Boolean));
    const studentById = new Map(students.map(s => [s.auth_user_id, s]));
    const classRows = rows.filter(r => authIds.has(r.student_id));
    const summaries = groupResultsByComprehensionOrale(items, classRows, studentById);

    const perItem = items
      .map(item => {
        const summary = summaries.get(item.id) || { count: 0, avgPct: null, students: [] };
        return {
          id: item.id,
          titre: item.titre_episode,
          count: summary.count,
          avgPct: summary.avgPct,
          students: summary.students
        };
      })
      .filter(item => item.count > 0);

    return { perItem };
  }

  /* Toutes les tentatives d'UN élève (fiche élève générale, resultats-
     enseignant.html) — titre résolu via getPublished() ; un item dépublié
     après le passage retombe sur un libellé générique plutôt que de
     disparaître (la tentative elle-même reste consultable). */
  async function getStudentOralAttempts(authUserId) {
    const [{ data: rows, error }, items] = await Promise.all([
      db.from('resultats_comprehension_orale')
        .select('id, comprehension_orale_id, score, total, date_passage')
        .eq('student_id', authUserId)
        .order('date_passage', { ascending: false }),
      getPublished()
    ]);
    if (error) throw error;

    const titleById = new Map(items.map(i => [i.id, i.titre_episode]));
    return (rows || []).map(r => ({
      id: r.id,
      comprehension_orale_id: r.comprehension_orale_id,
      titre_episode: titleById.get(r.comprehension_orale_id) || 'Compréhension orale',
      score: r.score,
      total: r.total,
      date_passage: r.date_passage,
      pct: Math.round((r.score / r.total) * 100)
    }));
  }

  /* Détail complet d'une tentative précise (lecteur + score + correction
     question par question, réponse donnée vs bonne réponse) — RPC réservée
     enseignant (des élèves de sa classe) / admin, voir
     get_comprehension_orale_resultat_detail. Réutilisé par
     comprehensions-orales-engine.js en mode consultation (francais-
     oral.html?resultat=...), pour afficher exactement le même écran de
     synthèse que celui vu par l'élève, en lecture seule. */
  async function getResultatDetail(resultatId) {
    const { data, error } = await db.rpc('get_comprehension_orale_resultat_detail', {
      p_resultat_id: resultatId
    });
    if (error) throw error;
    return data;
  }

  return {
    getPublished, getResultatsForComprehensionsOrales, groupResultsByComprehensionOrale,
    getClassOralReport, getStudentOralAttempts, getResultatDetail
  };
})();

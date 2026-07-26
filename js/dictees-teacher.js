/* ─────────────────────────────────────────────────────────────────────────────
   dictees-teacher.js — Accès aux données du module Dictées préparées côté
   enseignant. Dépend de : supabase-client.js (window.lfmDb).

   Utilisé par dictees-enseignant.html. Pas d'Edge Function : les
   lectures/écritures passent directement par le SDK Supabase, protégées par
   RLS (voir supabase/migrations/20260726120000_dictees.sql).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmDicteesTeacher = (() => {
  const db = window.lfmDb;

  /* Liste des dictées d'une classe, avec le nombre de mots (pour l'affichage
     de la carte enseignant) — pas les mots eux-mêmes, chargés à la demande
     à l'ouverture du formulaire d'édition. */
  async function getClassDictees(classId) {
    const { data: dictees, error } = await db.from('dictees').select('*')
      .eq('class_id', classId)
      .order('created_at', { ascending: false });
    if (error) throw error;

    const ids = (dictees || []).map(d => d.id);
    const countMap = {};
    if (ids.length > 0) {
      const { data: mots, error: motsErr } = await db.from('dictee_mots')
        .select('dictee_id').in('dictee_id', ids);
      if (motsErr) throw motsErr;
      (mots || []).forEach(m => { countMap[m.dictee_id] = (countMap[m.dictee_id] || 0) + 1; });
    }

    return (dictees || []).map(d => ({ ...d, mot_count: countMap[d.id] || 0 }));
  }

  /* Dictée complète (pour édition), avec ses mots triés par ordre. */
  async function getDictee(dicteeId) {
    const { data: dictee, error } = await db.from('dictees').select('*')
      .eq('id', dicteeId).single();
    if (error) throw error;

    const { data: mots, error: motsErr } = await db.from('dictee_mots').select('*')
      .eq('dictee_id', dicteeId).order('ordre', { ascending: true });
    if (motsErr) throw motsErr;

    return { dictee, mots: mots || [] };
  }

  /**
   * Crée une dictée et ses mots en une opération.
   * `mots` : [{ contenu, niveau }] — l'ordre est déduit de la position dans
   * le tableau (correspond à l'ordre de saisie dans la zone de texte).
   */
  async function createDictee(classId, teacherId, titre, pointsGrammaticaux, mots) {
    const { data: dictee, error } = await db.from('dictees').insert({
      class_id: classId,
      teacher_id: teacherId,
      titre: titre.trim(),
      points_grammaticaux: pointsGrammaticaux
    }).select().single();
    if (error) throw error;

    await replaceMots(dictee.id, mots);
    return dictee;
  }

  async function updateDictee(dicteeId, titre, pointsGrammaticaux, mots) {
    const { error } = await db.from('dictees').update({
      titre: titre.trim(),
      points_grammaticaux: pointsGrammaticaux,
      updated_at: new Date().toISOString()
    }).eq('id', dicteeId);
    if (error) throw error;

    await replaceMots(dicteeId, mots);
  }

  /* Remplace intégralement la liste des mots d'une dictée (le formulaire
     enseignant ressaisit la liste entière à chaque modification — plus
     simple et plus sûr qu'un diff fin, et cohérent avec la zone de texte
     unique en points-virgules côté saisie). */
  async function replaceMots(dicteeId, mots) {
    const { error: delErr } = await db.from('dictee_mots').delete().eq('dictee_id', dicteeId);
    if (delErr) throw delErr;

    if (!mots || mots.length === 0) return;
    const rows = mots.map((m, i) => ({
      dictee_id: dicteeId,
      contenu: m.contenu.trim(),
      niveau: m.niveau,
      ordre: i
    }));
    const { error: insErr } = await db.from('dictee_mots').insert(rows);
    if (insErr) throw insErr;
  }

  async function deleteDictee(dicteeId) {
    const { error } = await db.from('dictees').delete().eq('id', dicteeId);
    if (error) throw error;
  }

  /* Seuil minimal avant d'inclure un élève dans "Élèves à suivre" : on
     retient tout élève ayant au moins une tentative d'exercice 1, plutôt
     qu'un seuil élevé façon MIN_ATTEMPTS_RANKING (js/teacher-analytics.js,
     10 exercices) — inadapté ici, une classe n'a en pratique que quelques
     dictées au total. */
  function computeStudentsToWatch(students, resultsByStudent) {
    const rows = students.map(st => {
      const results = resultsByStudent.get(st.auth_user_id) || [];
      const ex1 = results.filter(r => r.exercice === 1);
      const completedCount = new Set(results.filter(r => r.exercice === 2).map(r => r.dictee_id)).size;
      const ex1ScoreSum = ex1.reduce((s, r) => s + (r.score || 0), 0);
      const ex1TotalSum = ex1.reduce((s, r) => s + (r.total || 0), 0);
      const avgPct = ex1TotalSum > 0 ? Math.round((ex1ScoreSum / ex1TotalSum) * 100) : null;
      return { student: st, completedCount, avgPct };
    });

    const withData = rows.filter(r => r.completedCount > 0 || r.avgPct !== null);
    if (withData.length === 0) return [];

    const avgCompleted = withData.reduce((s, r) => s + r.completedCount, 0) / withData.length;
    return rows
      .filter(r => r.completedCount < avgCompleted || (r.avgPct !== null && r.avgPct < 60))
      .sort((a, b) => (a.avgPct ?? 0) - (b.avgPct ?? 0) || a.completedCount - b.completedCount)
      .slice(0, 8);
  }

  /**
   * Statistiques de classe (calculées à la volée à partir de dictee_results/
   * dictee_mots — aucune table précalculée, cf. §4 du cahier des charges).
   *
   *  - perDictee : taux de réussite moyen ex.1, tentatives moyennes par mot
   *    à l'ex.2 (indicateur de difficulté — normalisé par le nombre de mots
   *    pour rester comparable entre dictées de longueurs différentes).
   *  - mostMissed : mots les plus ratés toutes dictées confondues (dérivé de
   *    dictee_results.wrong_mot_ids).
   *  - studentsToWatch : peu de dictées complétées ou taux ex.1 bas.
   */
  async function getClassDicteeStats(classId) {
    const dictees = await getClassDictees(classId);
    const students = await lfmTeacher.getStudents(classId);
    const authIds = students.map(s => s.auth_user_id).filter(Boolean);
    const dicteeIds = dictees.map(d => d.id);

    let results = [];
    if (dicteeIds.length > 0 && authIds.length > 0) {
      const { data, error } = await db.from('dictee_results').select('*')
        .in('dictee_id', dicteeIds).in('student_id', authIds).limit(5000);
      if (error) throw error;
      results = data || [];
    }

    let mots = [];
    if (dicteeIds.length > 0) {
      const { data, error } = await db.from('dictee_mots').select('id, dictee_id, contenu')
        .in('dictee_id', dicteeIds);
      if (error) throw error;
      mots = data || [];
    }
    const motById = new Map(mots.map(m => [m.id, m]));

    /* ── Par dictée ── */
    const perDictee = dictees.map(d => {
      const dResults = results.filter(r => r.dictee_id === d.id);
      const ex1 = dResults.filter(r => r.exercice === 1);
      const ex2 = dResults.filter(r => r.exercice === 2 && r.attempts != null);

      const ex1ScoreSum = ex1.reduce((s, r) => s + (r.score || 0), 0);
      const ex1TotalSum = ex1.reduce((s, r) => s + (r.total || 0), 0);
      const ex1AvgPct = ex1TotalSum > 0 ? Math.round((ex1ScoreSum / ex1TotalSum) * 100) : null;

      const ex2AttemptsPerWord = (ex2.length > 0 && d.mot_count > 0)
        ? Math.round((ex2.reduce((s, r) => s + r.attempts, 0) / ex2.length / d.mot_count) * 10) / 10
        : null;

      return { id: d.id, titre: d.titre, motCount: d.mot_count, ex1AvgPct, ex2AttemptsPerWord };
    });

    /* ── Mots les plus ratés ── */
    const missTally = new Map();
    results.forEach(r => (r.wrong_mot_ids || []).forEach(motId => {
      missTally.set(motId, (missTally.get(motId) || 0) + 1);
    }));
    const mostMissed = [...missTally.entries()]
      .map(([motId, count]) => ({ contenu: motById.get(motId) ? motById.get(motId).contenu : '—', count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    /* ── Élèves à suivre ── */
    const resultsByStudent = new Map();
    results.forEach(r => {
      if (!resultsByStudent.has(r.student_id)) resultsByStudent.set(r.student_id, []);
      resultsByStudent.get(r.student_id).push(r);
    });
    const studentsToWatch = computeStudentsToWatch(students, resultsByStudent);

    return { perDictee, mostMissed, studentsToWatch };
  }

  return { getClassDictees, getDictee, createDictee, updateDictee, deleteDictee, getClassDicteeStats };
})();

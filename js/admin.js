/* ─────────────────────────────────────────────────────────────────────────────
   admin.js — Requêtes pour l'espace administrateur.
   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmAdmin = (() => {
  const db = window.lfmDb;

  /* ── Stats globales ──────────────────────────────────────────────────────── */
  /* Plus de compteur "pending" : les enseignants sont actifs dès l'inscription
     (voir migration 20260919100000_teacher_signup_auto_active.sql). */
  async function getGlobalStats() {
    const [teachersRes, classesRes, studentsRes, resultsRes] = await Promise.all([
      db.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'enseignant').eq('status', 'active'),
      db.from('classes').select('id', { count: 'exact', head: true }),
      db.from('students').select('id', { count: 'exact', head: true }),
      db.from('exercise_results').select('id', { count: 'exact', head: true })
    ]);
    return {
      teachers: teachersRes.count  || 0,
      classes:  classesRes.count   || 0,
      students: studentsRes.count  || 0,
      results:  resultsRes.count   || 0
    };
  }

  /* ── Contenu en attente de validation (Champ lexical + Questionnaires) ──────
     RLS (champs_lexicaux_update_own_or_admin / questionnaires_update_own_or_
     admin, voir supabase/migrations/20260818100000) autorise déjà l'admin à
     modifier un contenu 'en_attente' — decision = 'publie' (valide) ou
     'brouillon' (refuse, motif visible par l'enseignant sur sa propre
     carte). */
  async function getPendingChamps() {
    const { data, error } = await db.from('champs_lexicaux')
      .select('id, theme, created_at, corpus_lexicaux(titre), profiles(display_name)')
      .eq('statut', 'en_attente')
      .order('created_at');
    if (error) throw error;
    return data || [];
  }

  async function getPendingQuestionnaires() {
    const { data, error } = await db.from('questionnaires')
      .select('id, titre_oeuvre, auteur_oeuvre, created_at, profiles(display_name)')
      .eq('statut', 'en_attente')
      .order('created_at');
    if (error) throw error;
    return data || [];
  }

  async function moderateChamp(id, decision, motif) {
    const { error } = await db.from('champs_lexicaux')
      .update({ statut: decision, motif_refus: decision === 'publie' ? null : (motif || null) })
      .eq('id', id);
    if (error) throw error;
  }

  async function moderateQuestionnaire(id, decision, motif) {
    const { error } = await db.from('questionnaires')
      .update({ statut: decision, motif_refus: decision === 'publie' ? null : (motif || null) })
      .eq('id', id);
    if (error) throw error;
  }

  /* Évaluations partagées — même patron pivot que champs_lexicaux/
     questionnaires (voir 20260829100000_evaluations_partage.sql), mais
     vocabulaire propre au module (statut_validation: en_attente/validee/
     rejetee, pas statut: brouillon/en_attente/publie). */
  async function getPendingEvaluations() {
    const { data, error } = await db.from('evaluations')
      .select('id, titre, classe, domaine, sous_domaine, created_at, profiles(display_name)')
      .eq('partage', true)
      .eq('statut_validation', 'en_attente')
      .order('created_at');
    if (error) throw error;
    return data || [];
  }

  async function moderateEvaluation(id, decision, motif) {
    const { error } = await db.from('evaluations')
      .update({ statut_validation: decision, motif_refus: decision === 'validee' ? null : (motif || null) })
      .eq('id', id);
    if (error) throw error;
  }

  /* ── Liste des enseignants actifs avec email et stats ────────────────────── */
  /* Utilise la fonction SQL get_teachers_with_email() (voir migration V5 du schéma) */
  async function getTeachers() {
    const { data, error } = await db.rpc('get_teachers_with_email');
    if (error) throw error;
    return data || [];
  }

  /* ── Supprimer un enseignant ──────────────────────────────────────────────── */
  async function deleteTeacher(id) {
    const { data, error } = await db.functions.invoke('delete-teacher', {
      body: { teacher_id: id }
    });
    if (error) throw new Error(error.message || 'Erreur lors de la suppression');
    if (data && data.error) throw new Error(data.error);
    return data;
  }

  /* ── Classes avec stats complètes (élèves + résultats) ──────────────────── */
  /* Utilise la fonction SQL get_classes_with_stats() (voir migration V6 du schéma) */
  async function getClassesWithStats() {
    const { data, error } = await db.rpc('get_classes_with_stats');
    if (error) throw error;
    return data || [];
  }

  /* ── Supprimer une ou plusieurs classes ──────────────────────────────────── */
  async function deleteClasses(classIds) {
    const { data, error } = await db.functions.invoke('delete-class', {
      body: { class_ids: classIds }
    });
    if (error) throw new Error(error.message || 'Erreur lors de la suppression');
    if (data && data.error) throw new Error(data.error);
    return data;
  }

  /* ── Fin d'année scolaire : élèves groupés par enseignant/classe ─────────── */
  /* hemisphere_sud est lu sur profiles (marque l'enseignant, pas l'élève) —
     sert côté client à exclure ses élèves des "tout cocher" (classe/global),
     voir renderEoyTable() dans dashboard-admin.html. Les enseignants sans
     aucun élève (ni en classe, ni non affecté) sont omis : rien à supprimer
     pour eux. */
  async function getEoyOverview() {
    const [teachersRes, classesRes, studentsRes] = await Promise.all([
      db.from('profiles').select('id, display_name, hemisphere_sud')
        .eq('role', 'enseignant').eq('status', 'active').order('display_name'),
      db.from('classes').select('id, name, level, school_year, teacher_id'),
      db.from('students').select('id, display_name, teacher_id, class_id')
    ]);
    if (teachersRes.error) throw teachersRes.error;
    if (classesRes.error)  throw classesRes.error;
    if (studentsRes.error) throw studentsRes.error;

    const classesByTeacher = {};
    (classesRes.data || []).forEach(c => {
      (classesByTeacher[c.teacher_id] = classesByTeacher[c.teacher_id] || []).push(c);
    });
    const studentsByClass = {};
    const unassignedByTeacher = {};
    (studentsRes.data || []).forEach(s => {
      if (s.class_id) {
        (studentsByClass[s.class_id] = studentsByClass[s.class_id] || []).push(s);
      } else {
        (unassignedByTeacher[s.teacher_id] = unassignedByTeacher[s.teacher_id] || []).push(s);
      }
    });

    return (teachersRes.data || [])
      .map(t => ({
        ...t,
        classes: (classesByTeacher[t.id] || []).map(c => ({
          ...c,
          students: studentsByClass[c.id] || []
        })),
        unassignedStudents: unassignedByTeacher[t.id] || []
      }))
      .filter(t => t.classes.some(c => c.students.length > 0) || t.unassignedStudents.length > 0);
  }

  /* ── Suppression de fin d'année (élèves sélectionnés) ────────────────────── */
  async function deleteStudentsEoy(studentIds) {
    const { data, error } = await db.functions.invoke('delete-students-eoy', {
      body: { student_ids: studentIds }
    });
    if (error) throw new Error(error.message || 'Erreur lors de la suppression');
    if (data && data.error) throw new Error(data.error);
    return data;
  }

  /* ── Toutes les classes avec enseignant et nb élèves ─────────────────────── */
  async function getAllClasses() {
    const { data, error } = await db
      .from('classes')
      .select('id, name, level, school_year, teacher_id, created_at')
      .order('school_year', { ascending: false });
    if (error) throw error;

    const classes = data || [];
    if (classes.length === 0) return [];

    const teacherIds = [...new Set(classes.map(c => c.teacher_id))];
    const { data: profiles } = await db
      .from('profiles')
      .select('id, display_name')
      .in('id', teacherIds);
    const profileMap = {};
    (profiles || []).forEach(p => { profileMap[p.id] = p.display_name; });

    const classIds = classes.map(c => c.id);
    const { data: students } = await db
      .from('students')
      .select('class_id')
      .in('class_id', classIds);
    const countMap = {};
    (students || []).forEach(s => { countMap[s.class_id] = (countMap[s.class_id] || 0) + 1; });

    return classes.map(c => ({
      ...c,
      teacher_name:  profileMap[c.teacher_id] || '—',
      student_count: countMap[c.id] || 0
    }));
  }

  /* ── Résultats bruts, toutes classes confondues ───────────────────────────
     Réservé admin : la policy RLS "results_all_admin" donne un accès complet
     à exercise_results, donc pas de filtre .in(student_id) ici contrairement
     à lfmTeacher.getClassResultsRaw (scopé à une classe). */
  async function getAllResultsRaw() {
    const PAGE = 1000;
    let offset  = 0;
    let results = [];
    while (true) {
      const { data, error } = await db
        .from('exercise_results')
        .select('student_id, exercise_slug, exercise_title, pct')
        .order('completed_at', { ascending: false })
        .range(offset, offset + PAGE - 1);
      if (error) throw error;
      results = results.concat(data || []);
      if (!data || data.length < PAGE) break;
      offset += PAGE;
    }
    return results;
  }

  /* ── Export global CSV ───────────────────────────────────────────────────── */
  async function exportAllStudents() {
    const { data, error } = await db
      .from('students')
      .select('display_name, username, password, classes(name, level)')
      .order('display_name');
    if (error) throw error;

    const students = data || [];
    const header   = 'Nom,Identifiant,Mot de passe,Classe,Niveau';
    const rows     = students.map(s => {
      const cls = s.classes || {};
      return `"${s.display_name}","${s.username}","${s.password}","${cls.name || '—'}","${cls.level || '—'}"`;
    });
    const csv  = [header, ...rows].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `lfm-tous-eleves-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    getGlobalStats,
    getPendingChamps, getPendingQuestionnaires, moderateChamp, moderateQuestionnaire,
    getPendingEvaluations, moderateEvaluation,
    getTeachers, getAllClasses, getClassesWithStats, exportAllStudents,
    deleteTeacher, deleteClasses, getAllResultsRaw,
    getEoyOverview, deleteStudentsEoy
  };
})();

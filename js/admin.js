/* ─────────────────────────────────────────────────────────────────────────────
   admin.js — Requêtes pour l'espace administrateur.
   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmAdmin = (() => {
  const db = window.lfmDb;

  /* ── Stats globales ──────────────────────────────────────────────────────── */
  async function getGlobalStats() {
    const [teachersRes, pendingRes, classesRes, studentsRes, resultsRes] = await Promise.all([
      db.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'enseignant').eq('status', 'active'),
      db.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'enseignant').eq('status', 'pending'),
      db.from('classes').select('id', { count: 'exact', head: true }),
      db.from('students').select('id', { count: 'exact', head: true }),
      db.from('exercise_results').select('id', { count: 'exact', head: true })
    ]);
    return {
      teachers: teachersRes.count  || 0,
      pending:  pendingRes.count   || 0,
      classes:  classesRes.count   || 0,
      students: studentsRes.count  || 0,
      results:  resultsRes.count   || 0
    };
  }

  /* ── Demandes en attente ─────────────────────────────────────────────────── */
  async function getPendingTeachers() {
    const { data, error } = await db
      .from('profiles')
      .select('id, display_name, created_at')
      .eq('role', 'enseignant')
      .eq('status', 'pending')
      .order('created_at');
    if (error) throw error;
    return data || [];
  }

  /* Valide le compte ET confirme l'e-mail côté Supabase Auth (sinon
     signInWithPassword échoue avec "Email not confirmed" — voir
     supabase/functions/approve-teacher/index.ts) */
  async function approveTeacher(id) {
    const { data, error } = await db.functions.invoke('approve-teacher', {
      body: { teacher_id: id }
    });
    if (error) throw new Error(error.message || 'Erreur lors de la validation');
    if (data && data.error) throw new Error(data.error);
    return data;
  }

  async function rejectTeacher(id) {
    const { error } = await db
      .from('profiles')
      .update({ status: 'rejected' })
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
        .select('student_id, exercise_slug, pct')
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
    getPendingTeachers, approveTeacher, rejectTeacher,
    getTeachers, getAllClasses, getClassesWithStats, exportAllStudents,
    deleteTeacher, deleteClasses, getAllResultsRaw
  };
})();

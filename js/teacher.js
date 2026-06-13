/* ─────────────────────────────────────────────────────────────────────────────
   teacher.js — API enseignant : classes, élèves, résultats.
   Dépend de : supabase-client.js (window.lfmDb, SUPABASE_URL, SUPABASE_ANON)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmTeacher = (() => {
  const db = window.lfmDb;

  /* ── Alphabet sans caractères ambigus (I/1, O/0) ────────────────────────── */
  const PWD_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  /* ── Utilitaires internes ─────────────────────────────────────────────────── */
  function normalize(str) {
    return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }

  function generatePassword() {
    let pwd = '';
    for (let i = 0; i < 6; i++) pwd += PWD_CHARS[Math.floor(Math.random() * PWD_CHARS.length)];
    return pwd;
  }

  async function generateUsername(displayName) {
    const parts = normalize(displayName).split(/\s+/);
    // base = prenom (+ initiale du nom si disponible)
    const base  = parts.length >= 2
      ? parts[0] + parts[1][0]
      : parts[0];
    const clean = base.replace(/[^a-z]/g, '');

    // Chercher tous les pseudos existants commençant par cette base
    const { data } = await db.from('students').select('username').like('username', clean + '%');
    const taken    = new Set((data || []).map(r => r.username));

    // Toujours ajouter un suffixe numérique à 2 chiffres pour l'unicité
    let suffix = String(Math.floor(Math.random() * 90) + 10);
    let candidate = clean + suffix;
    let attempts = 0;
    while (taken.has(candidate) && attempts < 100) {
      suffix = String(Math.floor(Math.random() * 90) + 10);
      candidate = clean + suffix;
      attempts++;
    }
    return candidate;
  }

  /* ── Création du compte auth.users pour un élève (Option A) ──────────────── */
  async function _createStudentAuth(username, password, displayName) {
    // Client isolé sans persistance : ne touche pas à la session enseignant
    const tmp = supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    });
    const { data, error } = await tmp.auth.signUp({
      email: username + '@eleves.lfmadrid.org',
      password,
      options: { data: { display_name: displayName, role: 'eleve' } }
    });
    if (error) throw error;
    // Petite pause pour que le trigger crée le profil
    await new Promise(r => setTimeout(r, 600));
    return data.user?.id || null;
  }

  /* ── Classes ─────────────────────────────────────────────────────────────── */

  async function getClasses() {
    const { data, error } = await db
      .from('classes')
      .select('id, name, level, school_year, created_at')
      .order('created_at', { ascending: true });
    if (error) throw error;

    const ids = (data || []).map(c => c.id);
    let countMap = {};
    if (ids.length > 0) {
      const { data: stData } = await db.from('students').select('class_id').in('class_id', ids);
      (stData || []).forEach(s => {
        countMap[s.class_id] = (countMap[s.class_id] || 0) + 1;
      });
    }

    return (data || []).map(c => ({ ...c, student_count: countMap[c.id] || 0 }));
  }

  async function createClass(name, level, schoolYear) {
    const { data: { session } } = await db.auth.getSession();
    const { data, error } = await db.from('classes').insert({
      name,
      level,
      school_year: schoolYear,
      teacher_id:  session.user.id
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function updateClass(id, updates) {
    const { data, error } = await db.from('classes').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async function deleteClass(id) {
    // Récupérer les IDs des élèves avant la suppression
    const { data: students, error: fetchErr } = await db
      .from('students').select('id').eq('class_id', id);
    if (fetchErr) throw fetchErr;

    // Supprimer les élèves par leur propre ID (contourne les éventuels problèmes RLS/FK)
    if (students && students.length > 0) {
      const ids = students.map(s => s.id);
      const { error: studErr } = await db.from('students').delete().in('id', ids);
      if (studErr) throw studErr;
    }

    const { error } = await db.from('classes').delete().eq('id', id);
    if (error) throw error;
  }

  /* ── Élèves ──────────────────────────────────────────────────────────────── */

  async function getStudents(classId) {
    let q = db.from('students').select('*').order('display_name', { ascending: true });
    if (classId) q = q.eq('class_id', classId);
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  }

  async function getAllStudents() {
    const { data, error } = await db
      .from('students')
      .select('*, classes(name, level)')
      .order('display_name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function createStudentsBulk(names, classId, onProgress) {
    const results = [];
    for (let i = 0; i < names.length; i++) {
      const name = names[i].trim();
      if (!name) continue;
      try {
        const student = await createStudent(name, classId);
        results.push({ ok: true, student });
      } catch (err) {
        results.push({ ok: false, name, error: err.message });
      }
      if (onProgress) onProgress(i + 1, names.length);
      // Pause entre chaque signUp pour rester sous le rate limit Supabase (auth IP)
      if (i < names.length - 1) await new Promise(r => setTimeout(r, 450));
    }
    return results;
  }

  async function resetStudentPassword(studentId) {
    const newPassword = generatePassword();
    const { data: student, error: selErr } = await db
      .from('students').select('auth_user_id').eq('id', studentId).single();
    if (selErr) throw selErr;

    // Mettre à jour le mot de passe dans la table students
    const { error: updErr } = await db
      .from('students').update({ password: newPassword }).eq('id', studentId);
    if (updErr) throw updErr;

    // Mettre à jour le compte Supabase Auth via l'Edge Function
    if (student.auth_user_id) {
      try {
        const { data: { session } } = await db.auth.getSession();
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/reset-student-password`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + session.access_token
            },
            body: JSON.stringify({ auth_user_id: student.auth_user_id, new_password: newPassword })
          }
        );
        if (!res.ok) {
          const txt = await res.text();
          console.warn('[LFM] reset-student-password Edge Function:', txt);
        }
      } catch (err) {
        console.warn('[LFM] reset-student-password fetch:', err.message);
      }
    }

    return newPassword;
  }

  async function createStudent(displayName, classId) {
    const { data: { session } } = await db.auth.getSession();
    const username = await generateUsername(displayName);
    const password = generatePassword();

    // Créer le compte Supabase auth (silencieux en cas d'échec)
    let authUserId = null;
    try {
      authUserId = await _createStudentAuth(username, password, displayName);
    } catch (err) {
      console.warn('[LFM] Création compte élève :', err.message);
    }

    const { data, error } = await db.from('students').insert({
      display_name: displayName,
      username,
      password,
      class_id:     classId || null,
      teacher_id:   session.user.id,
      auth_user_id: authUserId || null
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function updateStudent(id, updates) {
    const { data, error } = await db.from('students').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async function deleteStudent(id) {
    const { error } = await db.from('students').delete().eq('id', id);
    if (error) throw error;
  }

  async function moveStudent(id, newClassId) {
    return updateStudent(id, { class_id: newClassId || null });
  }

  /* ── Résultats par classe ────────────────────────────────────────────────── */

  async function getClassResults(classId) {
    const students = await getStudents(classId);
    const authIds  = students.filter(s => s.auth_user_id).map(s => s.auth_user_id);

    let statsMap = {};
    if (authIds.length > 0) {
      const { data } = await db
        .from('exercise_results')
        .select('student_id, pct, completed_at')
        .in('student_id', authIds);

      (data || []).forEach(r => {
        if (!statsMap[r.student_id]) {
          statsMap[r.student_id] = { count: 0, sum: 0, last: null };
        }
        statsMap[r.student_id].count++;
        statsMap[r.student_id].sum += parseFloat(r.pct);
        const d = new Date(r.completed_at);
        if (!statsMap[r.student_id].last || d > new Date(statsMap[r.student_id].last)) {
          statsMap[r.student_id].last = r.completed_at;
        }
      });
    }

    return students.map(s => {
      const st = s.auth_user_id ? statsMap[s.auth_user_id] : null;
      return {
        ...s,
        exercise_count: st ? st.count : 0,
        avg_pct:        st && st.count > 0 ? Math.round(st.sum / st.count) : null,
        last_activity:  st ? st.last : null
      };
    });
  }

  /* ── Résultats d'un élève ────────────────────────────────────────────────── */

  async function getStudentResults(authUserId, limit = 20) {
    const { data, error } = await db
      .from('exercise_results')
      .select('*')
      .eq('student_id', authUserId)
      .order('completed_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  async function getStudentStats(authUserId) {
    const { data, error } = await db
      .from('exercise_results')
      .select('subject, pct, score, total, exercise_slug, category, completed_at, duration_secs')
      .eq('student_id', authUserId)
      .order('completed_at', { ascending: false });

    if (error) throw error;
    const rows = data || [];

    const total  = rows.length;
    const avgPct = total > 0
      ? Math.round(rows.reduce((s, r) => s + parseFloat(r.pct), 0) / total)
      : null;

    const bySubject = {};
    rows.forEach(r => {
      if (!bySubject[r.subject]) bySubject[r.subject] = { count: 0, sum: 0 };
      bySubject[r.subject].count++;
      bySubject[r.subject].sum += parseFloat(r.pct);
    });

    const subjects = Object.entries(bySubject).map(([subject, st]) => ({
      subject,
      count: st.count,
      avg:   Math.round(st.sum / st.count)
    }));

    const bestSubject = subjects.length > 0
      ? subjects.reduce((a, b) => a.avg >= b.avg ? a : b).subject
      : null;

    // Dernières sessions pour le graphique (ordre chronologique)
    const chartData = rows.slice(0, 15).reverse().map(r => ({
      label: new Date(r.completed_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      pct:   parseFloat(r.pct)
    }));

    return { total, avgPct, bestSubject, subjects, chartData, recent: rows.slice(0, 20) };
  }

  /* ── Export CSV ──────────────────────────────────────────────────────────── */

  function exportCSV(students, className) {
    const header = 'Nom,Identifiant,Mot de passe';
    const rows   = students.map(s =>
      `"${s.display_name}","${s.username}","${s.password}"`
    );
    const csv  = [header, ...rows].join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `identifiants-${normalize(className)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function exportAllStudentsCSV() {
    const students = await getAllStudents();
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
    a.download = `identifiants-tous-eleves-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Stats résumées pour le dashboard ───────────────────────────────────── */

  async function getStats() {
    const [classesRes, studentsRes] = await Promise.all([
      db.from('classes').select('id', { count: 'exact', head: true }),
      db.from('students').select('id', { count: 'exact', head: true })
    ]);
    return {
      classes:  classesRes.count  || 0,
      students: studentsRes.count || 0
    };
  }

  return {
    getClasses, createClass, updateClass, deleteClass,
    getStudents, getAllStudents, createStudent, createStudentsBulk, updateStudent,
    deleteStudent, moveStudent, resetStudentPassword,
    getClassResults, getStudentResults, getStudentStats,
    exportCSV, exportAllStudentsCSV, getStats
  };
})();

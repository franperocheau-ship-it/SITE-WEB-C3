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
      .select('id, name, level, school_year, mode_acces, created_at')
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

  async function updateClassAccessMode(id, modeAcces) {
    const { data, error } = await db
      .from('classes').update({ mode_acces: modeAcces }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  /* ── Parcours guidé : exercices actifs par classe ───────────────────────────── */

  async function getActiveExercises(classId) {
    const { data, error } = await db
      .from('class_active_exercises')
      .select('exercise_id')
      .eq('class_id', classId);
    if (error) throw error;
    return (data || []).map(r => r.exercise_id);
  }

  async function addActiveExercise(classId, exerciseId) {
    const { error } = await db
      .from('class_active_exercises')
      .upsert({ class_id: classId, exercise_id: exerciseId }, { onConflict: 'class_id,exercise_id', ignoreDuplicates: true });
    if (error) throw error;
  }

  async function removeActiveExercise(classId, exerciseId) {
    const { error } = await db
      .from('class_active_exercises')
      .delete().eq('class_id', classId).eq('exercise_id', exerciseId);
    if (error) throw error;
  }

  async function addActiveExercisesBulk(classId, exerciseIds) {
    if (!exerciseIds.length) return;
    const rows = exerciseIds.map(exercise_id => ({ class_id: classId, exercise_id }));
    const { error } = await db
      .from('class_active_exercises')
      .upsert(rows, { onConflict: 'class_id,exercise_id', ignoreDuplicates: true });
    if (error) throw error;
  }

  async function removeActiveExercisesBulk(classId, exerciseIds) {
    if (!exerciseIds.length) return;
    const { error } = await db
      .from('class_active_exercises')
      .delete().eq('class_id', classId).in('exercise_id', exerciseIds);
    if (error) throw error;
  }

  /* ── Parcours guidé différencié : groupes de besoin (v9) ────────────────────
     getGroups() renvoie les groupes bruts (id, name, color, class_id,
     created_at) — le nombre d'élèves par groupe se calcule côté appelant en
     croisant avec la liste déjà chargée via getStudents(), plutôt que par un
     count() embarqué côté requête (plus simple, évite toute dépendance à la
     détection de relation FK de PostgREST). */

  async function getGroups(classId) {
    const { data, error } = await db
      .from('groups')
      .select('*')
      .eq('class_id', classId)
      .order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function createGroup(classId, name, color) {
    const { data, error } = await db
      .from('groups')
      .insert({ class_id: classId, name: name.trim(), color: color || null })
      .select().single();
    if (error) throw error;
    return data;
  }

  async function updateGroup(id, updates) {
    const { data, error } = await db
      .from('groups').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async function deleteGroup(id) {
    const { error } = await db.from('groups').delete().eq('id', id);
    if (error) throw error;
  }

  async function assignStudentToGroup(studentId, groupId) {
    return updateStudent(studentId, { group_id: groupId || null });
  }

  /* ── Parcours guidé différencié : exercices actifs par groupe (v9) ──────────
     Même API que les fonctions class_active_exercises ci-dessus, ciblant
     group_active_exercises. */

  async function getActiveExercisesForGroup(groupId) {
    const { data, error } = await db
      .from('group_active_exercises')
      .select('exercise_id')
      .eq('group_id', groupId);
    if (error) throw error;
    return (data || []).map(r => r.exercise_id);
  }

  async function addActiveExerciseToGroup(groupId, exerciseId) {
    const { error } = await db
      .from('group_active_exercises')
      .upsert({ group_id: groupId, exercise_id: exerciseId }, { onConflict: 'group_id,exercise_id', ignoreDuplicates: true });
    if (error) throw error;
  }

  async function removeActiveExerciseFromGroup(groupId, exerciseId) {
    const { error } = await db
      .from('group_active_exercises')
      .delete().eq('group_id', groupId).eq('exercise_id', exerciseId);
    if (error) throw error;
  }

  async function addActiveExercisesBulkToGroup(groupId, exerciseIds) {
    if (!exerciseIds.length) return;
    const rows = exerciseIds.map(exercise_id => ({ group_id: groupId, exercise_id }));
    const { error } = await db
      .from('group_active_exercises')
      .upsert(rows, { onConflict: 'group_id,exercise_id', ignoreDuplicates: true });
    if (error) throw error;
  }

  async function removeActiveExercisesBulkFromGroup(groupId, exerciseIds) {
    if (!exerciseIds.length) return;
    const { error } = await db
      .from('group_active_exercises')
      .delete().eq('group_id', groupId).in('exercise_id', exerciseIds);
    if (error) throw error;
  }

  /* ── Parcours guidé différencié : exercices actifs par élève (v9) ───────────
     Même API, ciblant student_active_exercises (personnalisation
     individuelle, priorité maximale — voir get_my_guided_access() v9). */

  async function getActiveExercisesForStudent(studentId) {
    const { data, error } = await db
      .from('student_active_exercises')
      .select('exercise_id')
      .eq('student_id', studentId);
    if (error) throw error;
    return (data || []).map(r => r.exercise_id);
  }

  async function addActiveExerciseToStudent(studentId, exerciseId) {
    const { error } = await db
      .from('student_active_exercises')
      .upsert({ student_id: studentId, exercise_id: exerciseId }, { onConflict: 'student_id,exercise_id', ignoreDuplicates: true });
    if (error) throw error;
  }

  async function removeActiveExerciseFromStudent(studentId, exerciseId) {
    const { error } = await db
      .from('student_active_exercises')
      .delete().eq('student_id', studentId).eq('exercise_id', exerciseId);
    if (error) throw error;
  }

  async function addActiveExercisesBulkToStudent(studentId, exerciseIds) {
    if (!exerciseIds.length) return;
    const rows = exerciseIds.map(exercise_id => ({ student_id: studentId, exercise_id }));
    const { error } = await db
      .from('student_active_exercises')
      .upsert(rows, { onConflict: 'student_id,exercise_id', ignoreDuplicates: true });
    if (error) throw error;
  }

  async function removeActiveExercisesBulkFromStudent(studentId, exerciseIds) {
    if (!exerciseIds.length) return;
    const { error } = await db
      .from('student_active_exercises')
      .delete().eq('student_id', studentId).in('exercise_id', exerciseIds);
    if (error) throw error;
  }

  /* Réinitialisation complète (bouton "↺" du tableau Élèves, bug UX groupe vs
     liste perso) : supprime toute la liste personnelle d'un élève d'un coup,
     sans avoir besoin de connaître son contenu au préalable — contrairement à
     removeActiveExercisesBulkFromStudent qui exige la liste des exercice_id. */
  async function clearActiveExercisesForStudent(studentId) {
    const { error } = await db
      .from('student_active_exercises')
      .delete().eq('student_id', studentId);
    if (error) throw error;
  }

  /* ── Indicateurs "liste configurée" (sélecteur de cible + note de
     réactivation du mode guidé) — un seul aller-retour par lot d'IDs plutôt
     qu'une requête par groupe/élève. */

  async function getGroupIdsWithActiveExercises(groupIds) {
    if (!groupIds.length) return [];
    const { data, error } = await db
      .from('group_active_exercises').select('group_id').in('group_id', groupIds);
    if (error) throw error;
    return [...new Set((data || []).map(r => r.group_id))];
  }

  async function getStudentIdsWithActiveExercises(studentIds) {
    if (!studentIds.length) return [];
    const { data, error } = await db
      .from('student_active_exercises').select('student_id').in('student_id', studentIds);
    if (error) throw error;
    return [...new Set((data || []).map(r => r.student_id))];
  }

  /* ── Pilotage des compétences : progression par niveaux (Lot C) ─────────────
     competence_settings (class_id, exercise_id, niveau_mode). Absence de
     ligne = 'progressif' (défaut, comportement actuel de js/level-select.js)
     — on ne lit/écrit que ce qui diverge du défaut, pas de seed. Revenir à
     'progressif' supprime la ligne plutôt que de l'upserter, pour que la
     table ne garde que ce que l'enseignant a réellement changé. */

  async function getCompetenceSettings(classId) {
    const { data, error } = await db
      .from('competence_settings')
      .select('exercise_id, niveau_mode')
      .eq('class_id', classId);
    if (error) throw error;
    return data || [];
  }

  async function setNiveauMode(classId, exerciseId, mode) {
    if (mode === 'ouvert') {
      const { error } = await db
        .from('competence_settings')
        .upsert(
          { class_id: classId, exercise_id: exerciseId, niveau_mode: 'ouvert', updated_at: new Date().toISOString() },
          { onConflict: 'class_id,exercise_id' }
        );
      if (error) throw error;
    } else {
      const { error } = await db
        .from('competence_settings')
        .delete().eq('class_id', classId).eq('exercise_id', exerciseId);
      if (error) throw error;
    }
  }

  async function setNiveauModeBulk(classId, exerciseIds, mode) {
    if (!exerciseIds.length) return;
    if (mode === 'ouvert') {
      const rows = exerciseIds.map(exercise_id => ({
        class_id: classId, exercise_id, niveau_mode: 'ouvert', updated_at: new Date().toISOString()
      }));
      const { error } = await db
        .from('competence_settings')
        .upsert(rows, { onConflict: 'class_id,exercise_id' });
      if (error) throw error;
    } else {
      const { error } = await db
        .from('competence_settings')
        .delete().eq('class_id', classId).in('exercise_id', exerciseIds);
      if (error) throw error;
    }
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
      let authSyncOk = false;
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
        if (res.ok) {
          authSyncOk = true;
        } else {
          const txt = await res.text();
          console.warn('[LFM] reset-student-password Edge Function:', txt);
        }
      } catch (err) {
        console.warn('[LFM] reset-student-password fetch:', err.message);
      }
      // Ne jamais renvoyer un mot de passe comme "prêt à communiquer" si le
      // compte de connexion réel n'a pas été resynchronisé : l'élève ne
      // pourrait plus se connecter, sans qu'aucune erreur n'ait été visible.
      if (!authSyncOk) {
        throw new Error('Le mot de passe a été enregistré, mais la synchronisation avec le compte de connexion a échoué. Réessaie dans un instant avant de communiquer un nouveau mot de passe à l\'élève.');
      }
    }

    return newPassword;
  }

  async function createStudent(displayName, classId, estDyslexique = false) {
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
      display_name:   displayName,
      username,
      password,
      class_id:       classId || null,
      teacher_id:     session.user.id,
      auth_user_id:   authUserId || null,
      est_dyslexique: estDyslexique
    }).select().single();
    if (error) throw error;
    return data;
  }

  /* ── Rattrapage : (re)créer le compte auth.users d'un élève existant qui
     n'en a pas (échec silencieux de _createStudentAuth à la création) ────── */
  async function retryStudentAuth(studentId) {
    const { data: student, error: selErr } = await db
      .from('students').select('username, password, display_name, auth_user_id').eq('id', studentId).single();
    if (selErr) throw selErr;
    if (student.auth_user_id) return student.auth_user_id; // déjà en place

    const authUserId = await _createStudentAuth(student.username, student.password, student.display_name);

    const { error: updErr } = await db
      .from('students').update({ auth_user_id: authUserId }).eq('id', studentId);
    if (updErr) throw updErr;

    return authUserId;
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
    /* group_id est toujours remis à NULL : un groupe est propre à une classe
       (v9), il ne peut pas survivre à un changement de classe. Le trigger
       check_group_class_match() rejetterait de toute façon l'incohérence,
       mais autant l'éviter proprement ici plutôt que de laisser l'appelant
       découvrir l'erreur SQL. */
    return updateStudent(id, { class_id: newClassId || null, group_id: null });
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

  /* ── Remédiations (Lot D) ─────────────────────────────────────────────────────
     Données brutes uniquement : le meilleur score par élève et par
     exercise_id, sans notion de compétence (ça reste le rôle de l'appelant,
     via EXERCISE_DATA — voir remediations-enseignant.html). Ce fichier ne
     référence jamais EXERCISE_DATA, il reste une couche d'accès Supabase pure. */
  async function getRemediationRawData(classId) {
    const students = await getStudents(classId);
    const authIds  = students.filter(s => s.auth_user_id).map(s => s.auth_user_id);

    const bestByStudent = {}; // auth_user_id -> { exercise_slug -> meilleur pct }
    if (authIds.length > 0) {
      const { data, error } = await db
        .from('exercise_results')
        .select('student_id, exercise_slug, pct')
        .in('student_id', authIds)
        .limit(2000);
      if (error) throw error;

      (data || []).forEach(r => {
        if (!bestByStudent[r.student_id]) bestByStudent[r.student_id] = {};
        const pct  = parseFloat(r.pct);
        const prev = bestByStudent[r.student_id][r.exercise_slug];
        if (prev === undefined || pct > prev) bestByStudent[r.student_id][r.exercise_slug] = pct;
      });
    }

    return { students, bestByStudent };
  }

  /* ── Résultats bruts d'une classe (Vue d'ensemble — module Résultats) ───────
     Pagination par pages de 1000 lignes tant que la page est pleine, pour ne
     pas tronquer silencieusement une classe volumineuse (30 élèves × 100+
     résultats peut dépasser la limite implicite de 1000 de PostgREST). */
  async function getClassResultsRaw(classId) {
    const students = await getStudents(classId);
    const authIds  = students.filter(s => s.auth_user_id).map(s => s.auth_user_id);
    if (authIds.length === 0) return { students, results: [] };

    const PAGE = 1000;
    let offset  = 0;
    let results = [];
    while (true) {
      const { data, error } = await db
        .from('exercise_results')
        .select('student_id, exercise_slug, exercise_title, exercise_type, level, score, total, pct, completed_at')
        .in('student_id', authIds)
        .order('completed_at', { ascending: false })
        .range(offset, offset + PAGE - 1);
      if (error) throw error;
      results = results.concat(data || []);
      if (!data || data.length < PAGE) break;
      offset += PAGE;
    }
    return { students, results };
  }

  /* ── Résultats bruts d'un élève (fiche élève enrichie + bulletin) ─────────── */
  async function getStudentResultsRaw(authUserId) {
    const { data, error } = await db
      .from('exercise_results')
      .select('exercise_slug, exercise_title, exercise_type, level, score, total, pct, completed_at')
      .eq('student_id', authUserId)
      .order('completed_at', { ascending: false })
      .limit(2000);
    if (error) throw error;
    return data || [];
  }

  /* ── Résultats d'un élève ────────────────────────────────────────────────── */

  async function getStudentResults(authUserId, limit = 1000) {
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

    // Graphique d'évolution : un point par jour civil (heure locale, pas UTC —
    // cohérent avec l'affichage `toLocaleDateString` du reste du site), moyenne
    // de pct sur toutes les tentatives de ce jour. Les 15 derniers jours ayant
    // une activité réelle, ordre chronologique ; pas de point à 0 pour les
    // jours sans tentative (pas d'interpolation).
    const byDay = new Map();
    rows.forEach(r => {
      const d   = new Date(r.completed_at);
      const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (!byDay.has(key)) byDay.set(key, { date: d, sum: 0, count: 0 });
      const agg = byDay.get(key);
      agg.sum += parseFloat(r.pct);
      agg.count++;
    });
    const chartData = Array.from(byDay.values())
      .sort((a, b) => a.date - b.date)
      .slice(-15)
      .map(agg => ({
        label: agg.date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        pct:   Math.round(agg.sum / agg.count)
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
    getClasses, createClass, updateClass, updateClassAccessMode, deleteClass,
    getStudents, getAllStudents, createStudent, createStudentsBulk, updateStudent,
    deleteStudent, moveStudent, resetStudentPassword, retryStudentAuth,
    getClassResults, getClassResultsRaw, getStudentResults, getStudentResultsRaw, getStudentStats,
    getActiveExercises, addActiveExercise, removeActiveExercise,
    addActiveExercisesBulk, removeActiveExercisesBulk,
    getGroups, createGroup, updateGroup, deleteGroup, assignStudentToGroup,
    getActiveExercisesForGroup, addActiveExerciseToGroup, removeActiveExerciseFromGroup,
    addActiveExercisesBulkToGroup, removeActiveExercisesBulkFromGroup,
    getActiveExercisesForStudent, addActiveExerciseToStudent, removeActiveExerciseFromStudent,
    addActiveExercisesBulkToStudent, removeActiveExercisesBulkFromStudent, clearActiveExercisesForStudent,
    getGroupIdsWithActiveExercises, getStudentIdsWithActiveExercises,
    getCompetenceSettings, setNiveauMode, setNiveauModeBulk,
    getRemediationRawData,
    exportCSV, exportAllStudentsCSV, getStats
  };
})();

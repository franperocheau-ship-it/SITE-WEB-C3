/* ─────────────────────────────────────────────────────────────────────────────
   jogging-teacher.js — Accès aux données du module Rédaction côté enseignant.
   Dépend de : supabase-client.js (window.lfmDb), js/teacher.js (lfmTeacher,
   pour la liste des classes/élèves).

   Utilisé par synthese-joggings-enseignant.html. Pas d'Edge Function : les
   lectures/écritures passent directement par le SDK Supabase, protégées par
   RLS (§6.3 du cahier des charges).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmJoggingTeacher = (() => {
  const db = window.lfmDb;

  const AUTO_CODES = ['C', 'H', 'A', 'M', 'P', 'O', 'S'];
  const ALL_CODES  = ['C', 'H', 'A', 'M', 'P', 'I', 'O', 'N', 'S'];

  /* ── Feux d'une version, colonnes feu_* → objet {C:..,H:..,...} ─────────── */
  function feuxFromVersion(version) {
    const feux = {};
    ALL_CODES.forEach(code => {
      feux[code] = version ? (version['feu_' + code.toLowerCase()] || 'blanc') : 'blanc';
    });
    return feux;
  }

  /**
   * Vue classe : pour chaque élève de la classe, l'état du DERNIER jogging
   * correspondant aux filtres (jogging précis et/ou période récente).
   * §5.7.1 — colonnes = 9 critères ; N reste toujours ⚪ (résolu sur papier,
   * §5.5, jamais reporté dans l'application depuis la Phase 2bis).
   */
  async function getClassOverview(classId, opts = {}) {
    const { joggingId = null, periodDays = null } = opts;

    const students = await lfmTeacher.getStudents(classId);
    const authIds = students.map(s => s.auth_user_id).filter(Boolean);
    if (authIds.length === 0) return students.map(s => ({ student: s, session: null, feux: null, hasVersion: false }));

    let q = db.from('jogging_sessions').select('*')
      .in('student_id', authIds)
      .order('created_at', { ascending: false })
      .limit(2000);
    if (joggingId) q = q.eq('jogging_id', joggingId);
    if (periodDays) {
      const since = new Date(Date.now() - periodDays * 86400000).toISOString();
      q = q.gte('created_at', since);
    }
    const { data: sessions, error } = await q;
    if (error) throw error;

    /* Une ligne par élève = sa session la plus récente correspondant aux
       filtres (les sessions sont déjà triées par date décroissante). */
    const lastByStudent = new Map();
    (sessions || []).forEach(s => { if (!lastByStudent.has(s.student_id)) lastByStudent.set(s.student_id, s); });

    const sessionIds = [...lastByStudent.values()].map(s => s.id);
    const versionBySession = new Map();
    if (sessionIds.length) {
      const { data: versions, error: versionsErr } = await db.from('jogging_versions').select('*')
        .in('session_id', sessionIds).order('version_number', { ascending: false }).limit(2000);
      if (versionsErr) throw versionsErr;
      (versions || []).forEach(v => { if (!versionBySession.has(v.session_id)) versionBySession.set(v.session_id, v); });
    }

    return students.map(st => {
      const session = lastByStudent.get(st.auth_user_id) || null;
      if (!session) return { student: st, session: null, feux: null, hasVersion: false };
      const hasVersion = versionBySession.has(session.id);
      const feux = feuxFromVersion(versionBySession.get(session.id));
      return { student: st, session, feux, hasVersion };
    });
  }

  /**
   * Fiche élève : tous les joggings de l'élève, avec toutes leurs versions.
   */
  async function getStudentJoggings(authUserId) {
    const { data: sessions, error } = await db.from('jogging_sessions').select('*')
      .eq('student_id', authUserId)
      .order('created_at', { ascending: false })
      .limit(2000);
    if (error) throw error;

    const sessionIds = (sessions || []).map(s => s.id);
    const versionsBySession = new Map();
    if (sessionIds.length) {
      const { data: versions, error: versionsErr } = await db.from('jogging_versions').select('*')
        .in('session_id', sessionIds).order('version_number', { ascending: true }).limit(2000);
      if (versionsErr) throw versionsErr;
      (versions || []).forEach(v => {
        if (!versionsBySession.has(v.session_id)) versionsBySession.set(v.session_id, []);
        versionsBySession.get(v.session_id).push(v);
      });
    }

    return (sessions || []).map(s => ({
      session: s,
      versions: versionsBySession.get(s.id) || []
    }));
  }

  /**
   * Statistiques de classe (Phase 3, §5.7.5) : erreurs les plus fréquentes
   * (par critère, sur toutes les versions), progression moyenne (delta de
   * feux verts entre la V1 et la version finale des sessions closes à au
   * moins 2 versions), et taux de réussite par critère (dernière version
   * des sessions closes) pour repérer les critères les plus fragiles et les
   * mieux maîtrisés. Tout est agrégé ici à partir des lignes déjà en base,
   * aucun appel externe.
   */
  async function getClassStatistics(classId) {
    const students = await lfmTeacher.getStudents(classId);
    const authIds = students.map(s => s.auth_user_id).filter(Boolean);
    if (authIds.length === 0) {
      return { studentCount: students.length, completedCount: 0, errorFrequency: [], averageProgression: null, progressionCount: 0, criteres: [] };
    }

    const { data: sessions, error } = await db.from('jogging_sessions').select('*')
      .in('student_id', authIds).limit(2000);
    if (error) throw error;
    const allSessions = sessions || [];
    const completed = allSessions.filter(s => s.status === 'completed');

    const sessionIds = allSessions.map(s => s.id);
    const versionsBySession = new Map();
    if (sessionIds.length) {
      const { data: versions, error: versionsErr } = await db.from('jogging_versions').select('*')
        .in('session_id', sessionIds).order('version_number', { ascending: true }).limit(2000);
      if (versionsErr) throw versionsErr;
      (versions || []).forEach(v => {
        if (!versionsBySession.has(v.session_id)) versionsBySession.set(v.session_id, []);
        versionsBySession.get(v.session_id).push(v);
      });
    }

    /* Erreurs les plus fréquentes, par critère, sur toutes les versions
       soumises (reflète l'ensemble des tentatives, pas seulement les
       versions finales). */
    const errorTally = {};
    versionsBySession.forEach(vs => vs.forEach(v => {
      ((v.correction && v.correction.erreurs) || []).forEach(e => {
        errorTally[e.code] = (errorTally[e.code] || 0) + 1;
      });
    }));
    const errorFrequency = Object.entries(errorTally)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count);

    /* Progression moyenne : delta de feux verts (sur les 7 critères auto)
       entre la première et la dernière version d'une session close, moyenné
       sur les sessions ayant au moins 2 versions (une seule version ne
       donne aucune progression à mesurer). */
    let progressionSum = 0, progressionCount = 0;
    completed.forEach(s => {
      const vs = versionsBySession.get(s.id) || [];
      if (vs.length < 2) return;
      const first = vs[0], last = vs[vs.length - 1];
      const vertsFirst = AUTO_CODES.filter(c => (first['feu_' + c.toLowerCase()] || 'blanc') === 'vert').length;
      const vertsLast  = AUTO_CODES.filter(c => (last['feu_' + c.toLowerCase()] || 'blanc') === 'vert').length;
      progressionSum += (vertsLast - vertsFirst);
      progressionCount++;
    });
    const averageProgression = progressionCount > 0 ? progressionSum / progressionCount : null;

    /* Critères les plus fragiles / mieux maîtrisés : taux de vert par
       critère sur la dernière version de chaque session close. */
    const lastVersions = completed
      .map(s => { const vs = versionsBySession.get(s.id) || []; return vs[vs.length - 1]; })
      .filter(Boolean);
    const criteres = AUTO_CODES.map(code => {
      const evaluated = lastVersions.filter(v => (v['feu_' + code.toLowerCase()] || 'blanc') !== 'blanc');
      const verts = evaluated.filter(v => (v['feu_' + code.toLowerCase()] || 'blanc') === 'vert').length;
      return { code, evaluated: evaluated.length, rate: evaluated.length ? verts / evaluated.length : null };
    });

    return {
      studentCount: students.length,
      completedCount: completed.length,
      errorFrequency,
      averageProgression,
      progressionCount,
      criteres
    };
  }

  /**
   * Réglages de personnalisation Phase 4 (§5.8) pour une classe : renvoie
   * une Map(jogging_id -> ligne jogging_class_settings), pour fusion avec
   * le catalogue statique côté « Gérer mes joggings ».
   */
  async function getClassSettings(classId) {
    const { data, error } = await db.from('jogging_class_settings').select('*')
      .eq('class_id', classId).limit(2000);
    if (error) throw error;
    const map = new Map();
    (data || []).forEach(row => map.set(row.jogging_id, row));
    return map;
  }

  /**
   * Crée/met à jour la personnalisation d'un jogging pour une classe.
   * `fields` : { titre, consigne, temps_impose, niveau, duree_estimee,
   * competence } — un champ à `null` revient à la valeur par défaut du
   * catalogue (§5.8, bouton « Réinitialiser ») — et `locked` (boolean).
   * Si plus aucun champ n'est personnalisé et que locked est false, la
   * ligne est supprimée (repli propre sur le catalogue, pas de ligne
   * "vide" en base).
   */
  async function saveClassSettings(classId, joggingId, fields, teacherId) {
    const customFields = ['titre', 'consigne', 'temps_impose', 'niveau', 'duree_estimee', 'competence'];
    const allDefault = customFields.every(f => fields[f] == null);
    const locked = fields.locked === true;

    if (allDefault && !locked) {
      const { error } = await db.from('jogging_class_settings').delete()
        .eq('class_id', classId).eq('jogging_id', joggingId);
      if (error) throw error;
      return null;
    }

    const payload = {
      class_id: classId,
      jogging_id: joggingId,
      titre: fields.titre ?? null,
      consigne: fields.consigne ?? null,
      temps_impose: fields.temps_impose ?? null,
      niveau: fields.niveau ?? null,
      duree_estimee: fields.duree_estimee ?? null,
      competence: fields.competence ?? null,
      locked,
      updated_at: new Date().toISOString(),
      updated_by: teacherId || null
    };
    const { data, error } = await db.from('jogging_class_settings')
      .upsert(payload, { onConflict: 'class_id,jogging_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  /**
   * Impression groupée (Phase 2ter, §5.9) : pour une classe et un jogging
   * donnés, un élève par ligne — uniquement ceux ayant soumis au moins une
   * version de ce jogging (peu importe si le cycle numérique est clos) —
   * avec la dernière version soumise. Triés par `display_name` (ordre
   * alphabétique, §5.9) pour correspondre à la façon dont un enseignant
   * trie ses copies papier.
   */
  async function getClassJoggingSubmissions(classId, joggingId) {
    const students = await lfmTeacher.getStudents(classId);
    const authIds = students.map(s => s.auth_user_id).filter(Boolean);
    if (authIds.length === 0) return [];

    const { data: sessions, error } = await db.from('jogging_sessions').select('*')
      .in('student_id', authIds).eq('jogging_id', joggingId).limit(2000);
    if (error) throw error;
    if (!sessions || sessions.length === 0) return [];

    // Une session par élève pour ce jogging (garde la plus récente s'il y
    // en avait plusieurs — en pratique jogging.html réutilise toujours la
    // même session pour un couple élève/jogging donné).
    const sessionByStudent = new Map();
    sessions.forEach(s => {
      const existing = sessionByStudent.get(s.student_id);
      if (!existing || new Date(s.created_at) > new Date(existing.created_at)) sessionByStudent.set(s.student_id, s);
    });

    const sessionIds = [...sessionByStudent.values()].map(s => s.id);
    const { data: versions, error: versionsErr } = await db.from('jogging_versions').select('*')
      .in('session_id', sessionIds).order('version_number', { ascending: false }).limit(2000);
    if (versionsErr) throw versionsErr;
    const lastVersionBySession = new Map();
    (versions || []).forEach(v => { if (!lastVersionBySession.has(v.session_id)) lastVersionBySession.set(v.session_id, v); });

    const results = [];
    students.forEach(st => {
      const session = sessionByStudent.get(st.auth_user_id);
      if (!session) return;
      const lastVersion = lastVersionBySession.get(session.id);
      if (!lastVersion) return; // session créée mais aucune version soumise (brouillon vide)
      results.push({ student: st, session, lastVersion });
    });

    results.sort((a, b) => (a.student.display_name || '').localeCompare(b.student.display_name || '', 'fr'));
    return results;
  }

  return {
    AUTO_CODES, ALL_CODES, feuxFromVersion, getClassOverview, getStudentJoggings,
    getClassStatistics, getClassSettings, saveClassSettings, getClassJoggingSubmissions
  };
})();

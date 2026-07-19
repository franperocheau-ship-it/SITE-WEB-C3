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
   * §5.7.1 — colonnes = 9 critères, feu N mis à jour si un enrichissement
   * existe déjà pour cette session.
   */
  async function getClassOverview(classId, opts = {}) {
    const { joggingId = null, periodDays = null } = opts;

    const students = await lfmTeacher.getStudents(classId);
    const authIds = students.map(s => s.auth_user_id).filter(Boolean);
    if (authIds.length === 0) return students.map(s => ({ student: s, session: null, feux: null }));

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
    const enrichBySession  = new Map();
    if (sessionIds.length) {
      const { data: versions } = await db.from('jogging_versions').select('*')
        .in('session_id', sessionIds).order('version_number', { ascending: false }).limit(2000);
      (versions || []).forEach(v => { if (!versionBySession.has(v.session_id)) versionBySession.set(v.session_id, v); });

      const { data: enrich } = await db.from('jogging_enrichments').select('*')
        .in('session_id', sessionIds).limit(2000);
      (enrich || []).forEach(e => enrichBySession.set(e.session_id, e));
    }

    return students.map(st => {
      const session = lastByStudent.get(st.auth_user_id) || null;
      if (!session) return { student: st, session: null, feux: null };
      const feux = feuxFromVersion(versionBySession.get(session.id));
      const enrich = enrichBySession.get(session.id);
      if (enrich) feux.N = enrich.feu_n || 'blanc';
      return { student: st, session, feux, enrichment: enrich || null };
    });
  }

  /**
   * Fiche élève : tous les joggings de l'élève, avec toutes leurs versions
   * et leur éventuel enrichissement (publié ou non — l'enseignant voit tout).
   */
  async function getStudentJoggings(authUserId) {
    const { data: sessions, error } = await db.from('jogging_sessions').select('*')
      .eq('student_id', authUserId)
      .order('created_at', { ascending: false })
      .limit(2000);
    if (error) throw error;

    const sessionIds = (sessions || []).map(s => s.id);
    const versionsBySession = new Map();
    const enrichBySession   = new Map();
    if (sessionIds.length) {
      const { data: versions } = await db.from('jogging_versions').select('*')
        .in('session_id', sessionIds).order('version_number', { ascending: true }).limit(2000);
      (versions || []).forEach(v => {
        if (!versionsBySession.has(v.session_id)) versionsBySession.set(v.session_id, []);
        versionsBySession.get(v.session_id).push(v);
      });

      const { data: enrich } = await db.from('jogging_enrichments').select('*')
        .in('session_id', sessionIds).limit(2000);
      (enrich || []).forEach(e => enrichBySession.set(e.session_id, e));
    }

    return (sessions || []).map(s => ({
      session: s,
      versions: versionsBySession.get(s.id) || [],
      enrichment: enrichBySession.get(s.id) || null
    }));
  }

  /** Enregistre (crée ou met à jour) la reformulation/évaluation N d'une session. */
  async function saveEnrichment(sessionId, fields) {
    const payload = {
      session_id: sessionId,
      teacher_text: fields.teacher_text ?? null,
      teacher_comment: fields.teacher_comment ?? null,
      feu_n: fields.feu_n || 'blanc',
      published: fields.published !== false,
      updated_at: new Date().toISOString()
    };
    const { data, error } = await db.from('jogging_enrichments')
      .upsert(payload, { onConflict: 'session_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  return { AUTO_CODES, ALL_CODES, feuxFromVersion, getClassOverview, getStudentJoggings, saveEnrichment };
})();

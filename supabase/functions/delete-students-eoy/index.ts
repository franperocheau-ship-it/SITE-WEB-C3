// Edge Function : delete-students-eoy
// Suppression de fin d'année scolaire — supprime les élèves sélectionnés
// (compte auth, fiche élève, résultats, progression/badges/carnet), et
// supprime la classe elle-même si elle ne compte plus aucun élève après
// l'opération. Ne touche PAS aux tables de contenu pédagogique (joggings,
// dictées, questionnaires, corpus lexical, évaluations) : elles sont
// indexées par teacher_id/author_id, jamais par student_id/class_id (les
// dictées, seul module qui référençait class_id, ont migré vers
// ON DELETE SET NULL — voir 20260902100000_fin_annee_suppression.sql).
//
// Corps attendu : { student_ids: string[] }
// Variable d'environnement requise : SUPABASE_SERVICE_ROLE_KEY

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Non autorisé' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey     = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Vérifier que l'appelant est bien un admin connecté
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    const { data: { user }, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Session invalide' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { data: callerProfile } = await callerClient
      .from('profiles').select('role').eq('id', user.id).single();
    if (!callerProfile || callerProfile.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accès refusé' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { student_ids } = await req.json();
    if (!Array.isArray(student_ids) || student_ids.length === 0) {
      return new Response(JSON.stringify({ error: 'Paramètre student_ids manquant ou vide' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data: students, error: studErr } = await adminClient
      .from('students')
      .select('id, teacher_id, class_id, auth_user_id')
      .in('id', student_ids);
    if (studErr) throw studErr;

    const errors: Array<{ student_id: string; error: string }> = [];
    const deleted: Array<{ id: string; teacher_id: string; class_id: string | null }> = [];

    for (const s of (students || [])) {
      try {
        // Données de progression/badges (contraintes NO ACTION vers profiles :
        // doivent être effacées avant la suppression du compte auth, sinon
        // celle-ci échoue avec une violation de clé étrangère).
        if (s.auth_user_id) {
          const { error: e1 } = await adminClient.from('jogging_carnet').delete().eq('student_id', s.auth_user_id);
          if (e1) throw e1;
          const { error: e2 } = await adminClient.from('jogging_badges').delete().eq('student_id', s.auth_user_id);
          if (e2) throw e2;
          const { error: e3 } = await adminClient.from('jogging_sessions').delete().eq('student_id', s.auth_user_id);
          if (e3) throw e3;

          // Suppression du compte auth (cascade : profiles + exercise_results +
          // dictee_results + dictee_gram_results + resultats_questionnaires +
          // carnet_mots + champ_lexical_sessions, tous en ON DELETE CASCADE).
          const { error: delErr } = await adminClient.auth.admin.deleteUser(s.auth_user_id);
          if (delErr) throw new Error(`Compte élève : ${delErr.message}`);
        }

        // Fiche élève elle-même (students.auth_user_id est déjà NULL après
        // l'étape précédente grâce à ON DELETE SET NULL, mais la ligne
        // persiste tant qu'on ne la supprime pas explicitement).
        const { error: rowDelErr } = await adminClient.from('students').delete().eq('id', s.id);
        if (rowDelErr) throw rowDelErr;

        deleted.push({ id: s.id, teacher_id: s.teacher_id, class_id: s.class_id });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push({ student_id: s.id, error: msg });
      }
    }

    // Classes devenues vides : supprimées avec l'élève (les dictées de ces
    // classes ne sont plus en cascade — elles passent à class_id = NULL et
    // restent accessibles à l'enseignant pour réaffectation).
    const touchedClassIds = [...new Set(deleted.map(d => d.class_id).filter((id): id is string => !!id))];
    const deletedClasses: Array<{ id: string; name: string }> = [];

    for (const classId of touchedClassIds) {
      const { count } = await adminClient
        .from('students')
        .select('id', { count: 'exact', head: true })
        .eq('class_id', classId);
      if (count && count > 0) continue;

      const { data: classData } = await adminClient
        .from('classes').select('id, name').eq('id', classId).single();
      if (!classData) continue;

      const { error: classDelErr } = await adminClient.from('classes').delete().eq('id', classId);
      if (!classDelErr) deletedClasses.push({ id: classData.id, name: classData.name });
    }

    // Journal de traçabilité — une ligne par enseignant concerné, compteurs
    // uniquement (pas de données personnelles élèves).
    const byTeacher = new Map<string, { classCount: number; studentCount: number }>();
    for (const d of deleted) {
      const entry = byTeacher.get(d.teacher_id) || { classCount: 0, studentCount: 0 };
      entry.studentCount += 1;
      byTeacher.set(d.teacher_id, entry);
    }
    for (const c of deletedClasses) {
      // Retrouver l'enseignant de chaque classe supprimée via les élèves déjà déplacés
      const owner = deleted.find(d => d.class_id === c.id)?.teacher_id;
      if (owner && byTeacher.has(owner)) byTeacher.get(owner)!.classCount += 1;
    }
    if (byTeacher.size > 0) {
      await adminClient.from('eoy_deletion_log').insert(
        [...byTeacher.entries()].map(([teacher_id, v]) => ({
          admin_id:      user.id,
          teacher_id,
          class_count:   v.classCount,
          student_count: v.studentCount,
        }))
      );
    }

    return new Response(JSON.stringify({
      deleted_student_count: deleted.length,
      deleted_classes,
      errors,
    }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

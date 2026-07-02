// Edge Function : delete-class
// Supprime une ou plusieurs classes avec leurs élèves et résultats.
// NE touche PAS aux comptes enseignants.
//
// Corps attendu : { class_ids: string[] }
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
    const anonKey    = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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

    const { data: profile } = await callerClient
      .from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accès refusé' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { class_ids } = await req.json();
    if (!Array.isArray(class_ids) || class_ids.length === 0) {
      return new Response(JSON.stringify({ error: 'Paramètre class_ids manquant ou vide' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const report: Array<{ class_id: string; class_name: string; deleted_students: number; deleted_results: number; ok: true }> = [];
    const errors: Array<{ class_id: string; error: string }> = [];

    for (const classId of class_ids) {
      try {
        // 1. Récupérer les infos de la classe
        const { data: classData, error: classErr } = await adminClient
          .from('classes').select('id, name').eq('id', classId).single();
        if (classErr || !classData) {
          errors.push({ class_id: classId, error: 'Classe introuvable' });
          continue;
        }

        // 2. Récupérer les élèves de la classe
        const { data: students, error: studErr } = await adminClient
          .from('students')
          .select('id, auth_user_id')
          .eq('class_id', classId);
        if (studErr) throw studErr;

        const studentsInClass = students || [];
        const authUserIds = studentsInClass
          .filter((s: { auth_user_id: string | null }) => s.auth_user_id)
          .map((s: { auth_user_id: string }) => s.auth_user_id);

        // 3. Compter les résultats avant suppression (pour le rapport)
        let resultCount = 0;
        if (authUserIds.length > 0) {
          const { count } = await adminClient
            .from('exercise_results')
            .select('id', { count: 'exact', head: true })
            .in('student_id', authUserIds);
          resultCount = count || 0;
        }

        // 4. Supprimer les comptes auth des élèves (cascade : profiles + exercise_results)
        //    Si une suppression échoue → on abandonne cette classe (cohérence des données)
        for (const authUserId of authUserIds) {
          const { error: delErr } = await adminClient.auth.admin.deleteUser(authUserId);
          if (delErr) {
            throw new Error(`Impossible de supprimer le compte élève ${authUserId} : ${delErr.message}`);
          }
        }

        // 5. Supprimer les fiches élèves de la classe
        //    (students.auth_user_id est déjà NULL après l'étape 4 grâce à ON DELETE SET NULL)
        const { error: studDelErr } = await adminClient
          .from('students')
          .delete()
          .eq('class_id', classId);
        if (studDelErr) throw studDelErr;

        // 6. Supprimer la classe (cascade : class_memberships)
        const { error: classDelErr } = await adminClient
          .from('classes')
          .delete()
          .eq('id', classId);
        if (classDelErr) throw classDelErr;

        report.push({
          class_id:         classId,
          class_name:       classData.name,
          deleted_students: studentsInClass.length,
          deleted_results:  resultCount,
          ok:               true,
        });

      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push({ class_id: classId, error: msg });
      }
    }

    return new Response(JSON.stringify({ report, errors }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

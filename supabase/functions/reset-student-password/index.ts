// Edge Function : reset-student-password
// Réinitialise le mot de passe d'un compte élève dans Supabase Auth.
// Appelée par l'interface enseignant — nécessite un JWT d'enseignant valide.
//
// Corps attendu : { auth_user_id: string, new_password: string }
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
    // Vérifier que l'appelant est bien un enseignant connecté
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Non autorisé' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey     = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Client appelant (pour vérifier le rôle de l'enseignant)
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    const { data: { user }, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Session invalide' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { data: profile, error: profileErr } = await callerClient
      .from('profiles').select('role').eq('id', user.id).single();
    if (profileErr || !profile || profile.role !== 'enseignant') {
      return new Response(JSON.stringify({ error: 'Accès refusé' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { auth_user_id, new_password } = await req.json();
    if (!auth_user_id || !new_password || new_password.length < 4) {
      return new Response(JSON.stringify({ error: 'Paramètres invalides' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Vérifier que l'élève appartient bien à cet enseignant
    const { data: student, error: stErr } = await callerClient
      .from('students').select('id').eq('auth_user_id', auth_user_id).maybeSingle();
    if (stErr || !student) {
      return new Response(JSON.stringify({ error: 'Élève introuvable' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Client admin pour mettre à jour le mot de passe
    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { error: updateErr } = await adminClient.auth.admin.updateUserById(
      auth_user_id, { password: new_password }
    );
    if (updateErr) throw updateErr;

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

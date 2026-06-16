// Edge Function : approve-teacher
// Valide un compte enseignant : passe profiles.status à 'active' ET confirme
// l'e-mail dans Supabase Auth (sinon signInWithPassword échoue avec
// "Email not confirmed", même après validation admin).
// Appelée par le dashboard admin — nécessite un JWT d'admin valide.
//
// Corps attendu : { teacher_id: string }
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

    const { data: profile } = await callerClient
      .from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Accès refusé' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { teacher_id } = await req.json();
    if (!teacher_id) {
      return new Response(JSON.stringify({ error: 'Paramètre teacher_id manquant' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Confirme l'e-mail : sans ça, signInWithPassword échoue même après
    // validation admin (l'enseignant n'a jamais cliqué de lien de confirmation).
    const { error: confirmErr } = await adminClient.auth.admin.updateUserById(teacher_id, {
      email_confirm: true
    });
    if (confirmErr) throw confirmErr;

    const { error: statusErr } = await adminClient
      .from('profiles')
      .update({ status: 'active' })
      .eq('id', teacher_id);
    if (statusErr) throw statusErr;

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

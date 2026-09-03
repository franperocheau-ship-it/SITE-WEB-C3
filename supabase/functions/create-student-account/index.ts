// Edge Function : create-student-account
// Crée le compte auth.users d'un élève (email généré, pas de vraie adresse
// personnelle) sans passer par signUp() : évite l'envoi d'un e-mail de
// confirmation et le rate limit associé côté Supabase Auth.
// Appelée par l'interface enseignant — nécessite un JWT d'enseignant valide.
//
// Corps attendu : { username: string, password: string, display_name: string }
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

    const { username, password, display_name } = await req.json();
    if (!username || !password || !display_name) {
      return new Response(JSON.stringify({ error: 'Paramètres invalides' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Client admin pour créer le compte, déjà confirmé (pas d'e-mail envoyé)
    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data, error } = await adminClient.auth.admin.createUser({
      email: username + '@eleves.lfmadrid.org',
      password,
      email_confirm: true,
      user_metadata: { display_name, role: 'eleve' }
    });
    if (error) throw error;

    return new Response(JSON.stringify({ user_id: data.user.id }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   supabase-client.js
   Initialise le client Supabase et l'expose sous window.lfmDb.

   CONFIGURATION — après avoir créé votre projet sur supabase.com :
     1. Allez dans Settings → API
     2. Copiez "Project URL" → SUPABASE_URL
     3. Copiez "anon public" → SUPABASE_ANON
   ───────────────────────────────────────────────────────────────────────────── */

const SUPABASE_URL  = 'https://wugqxkiljayqqnzdctuf.supabase.co';
const SUPABASE_ANON = 'sb_publishable_EuUKNCFYOehAe16-udO1Jg_r0RL7OFy';

window.lfmDb = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

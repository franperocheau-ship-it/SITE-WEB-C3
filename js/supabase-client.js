/* ─────────────────────────────────────────────────────────────────────────────
   supabase-client.js
   Initialise le client Supabase et l'expose sous window.lfmDb.

   CONFIGURATION — après avoir créé votre projet sur supabase.com :
     1. Allez dans Settings → API
     2. Copiez "Project URL" → SUPABASE_URL
     3. Copiez "anon public" → SUPABASE_ANON
   ───────────────────────────────────────────────────────────────────────────── */

/* `var` (pas `const`) : SUPABASE_URL/SUPABASE_ANON sont aussi lus comme
   globaux bruts par js/teacher.js et test-connexion.html. `var` tolère une
   redéclaration sans lever d'erreur si ce script venait à être chargé deux
   fois sur une même page (cf. commit e3f7dca). */
var SUPABASE_URL  = 'https://wugqxkiljayqqnzdctuf.supabase.co';
var SUPABASE_ANON = 'sb_publishable_EuUKNCFYOehAe16-udO1Jg_r0RL7OFy';

if (!window.lfmDb) {
  window.lfmDb = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON,
    {
      auth: {
        storage: window.sessionStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
}

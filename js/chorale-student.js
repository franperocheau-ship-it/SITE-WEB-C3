/* ─────────────────────────────────────────────────────────────────────────────
   chorale-student.js — lecture élève des liens "Chorale"
   (chorale_links, migration 20260927100000).

   Pas besoin de connaître class_id côté client : RLS
   (chorale_links_select_student) filtre déjà sur students.class_id via
   auth.uid(), donc un simple select * renvoie uniquement les liens de la
   classe de l'élève connecté (jamais via class_memberships, non alimentée).
   Dépend de : supabase-client.js (window.lfmDb), js/auth.js (lfmAuth).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmChoraleStudent = (() => {
  async function getMyChoraleLinks() {
    if (!window.lfmDb || typeof lfmAuth === 'undefined') return [];
    const session = await lfmAuth.getSession();
    if (!session) return [];

    const { data, error } = await window.lfmDb
      .from('chorale_links')
      .select('*')
      .order('position', { ascending: true });
    if (error) { console.warn('[LFM] getMyChoraleLinks:', error.message); return []; }
    return data || [];
  }

  return { getMyChoraleLinks };
})();

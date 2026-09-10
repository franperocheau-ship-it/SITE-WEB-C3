/* ─────────────────────────────────────────────────────────────────────────────
   class-links-student.js — lecture élève des "Liens de la classe"
   (class_links, migration 20260926100000).

   Pas besoin de connaître class_id côté client : RLS
   (class_links_select_student) filtre déjà sur students.class_id via
   auth.uid(), donc un simple select * renvoie uniquement les liens de la
   classe de l'élève connecté (voir js/laurels.js pour le rappel du piège
   class_memberships, non concerné ici).
   Dépend de : supabase-client.js (window.lfmDb), js/auth.js (lfmAuth).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmClassLinksStudent = (() => {
  async function getMyClassLinks() {
    if (!window.lfmDb || typeof lfmAuth === 'undefined') return [];
    const session = await lfmAuth.getSession();
    if (!session) return [];

    const { data, error } = await window.lfmDb
      .from('class_links')
      .select('*')
      .order('position', { ascending: true });
    if (error) { console.warn('[LFM] getMyClassLinks:', error.message); return []; }
    return data || [];
  }

  return { getMyClassLinks };
})();

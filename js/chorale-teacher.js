/* ─────────────────────────────────────────────────────────────────────────────
   chorale-teacher.js — API enseignant : "Chorale" (liens de la classe)
   (chorale_links, migration 20260927100000).
   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmChoraleTeacher = (() => {
  const db = window.lfmDb;

  async function getChoraleLinks(classId) {
    const { data, error } = await db
      .from('chorale_links')
      .select('*')
      .eq('class_id', classId)
      .order('position', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async function createLink(classId, { title, url, description }) {
    const { data: existing } = await db
      .from('chorale_links').select('position').eq('class_id', classId)
      .order('position', { ascending: false }).limit(1);
    const nextPosition = existing && existing.length ? existing[0].position + 1 : 0;

    const { data, error } = await db.from('chorale_links').insert({
      class_id:    classId,
      title:       title.trim(),
      url:         url.trim(),
      description: description ? description.trim() : null,
      position:    nextPosition
    }).select().single();
    if (error) throw error;
    return data;
  }

  async function updateLink(id, updates) {
    const { data, error } = await db.from('chorale_links').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  async function deleteLink(id) {
    const { error } = await db.from('chorale_links').delete().eq('id', id);
    if (error) throw error;
  }

  /* Réordonnancement (flèches ▲▼) : échange les positions de deux liens en
     une seule paire d'updates, plutôt que de renuméroter toute la liste. */
  async function swapPositions(linkA, linkB) {
    const { error: err1 } = await db.from('chorale_links').update({ position: linkB.position }).eq('id', linkA.id);
    if (err1) throw err1;
    const { error: err2 } = await db.from('chorale_links').update({ position: linkA.position }).eq('id', linkB.id);
    if (err2) throw err2;
  }

  return { getChoraleLinks, createLink, updateLink, deleteLink, swapPositions };
})();

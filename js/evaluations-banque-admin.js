/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-banque-admin.js — CRUD admin pour la banque d'items par
   compétence (table banque_items, voir
   supabase/migrations/20260828100000_banque_items.sql). Utilisé par
   evaluations-banque-admin.html.

   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmBanqueAdmin = (() => {
  const db = window.lfmDb;

  /* Arborescence complète domaine → sous-domaine → regroupement →
     [compétences], construite côté client à partir des lignes de
     banque_items elles-mêmes (pas d'un fichier statique séparé — un
     domaine ajouté par une prochaine migration d'import apparaît ici sans
     changement de code). */
  async function getTree() {
    const { data, error } = await db.from('banque_items')
      .select('id, competence_slug, titre, domaine, sous_domaine, regroupement')
      .order('domaine').order('sous_domaine').order('created_at');
    if (error) throw error;

    const domaines = [];
    const parDomaine = new Map();
    (data || []).forEach(row => {
      const cleDomaine = row.domaine;
      if (!parDomaine.has(cleDomaine)) {
        const d = { nom: cleDomaine, sousDomaines: [], parSousDomaine: new Map() };
        parDomaine.set(cleDomaine, d);
        domaines.push(d);
      }
      const d = parDomaine.get(cleDomaine);
      const cleSousDomaine = row.sous_domaine;
      if (!d.parSousDomaine.has(cleSousDomaine)) {
        const sd = { nom: cleSousDomaine, regroupements: [], parRegroupement: new Map() };
        d.parSousDomaine.set(cleSousDomaine, sd);
        d.sousDomaines.push(sd);
      }
      const sd = d.parSousDomaine.get(cleSousDomaine);
      const cleRegroupement = row.regroupement || '';
      if (!sd.parRegroupement.has(cleRegroupement)) {
        const r = { nom: cleRegroupement, competences: [] };
        sd.parRegroupement.set(cleRegroupement, r);
        sd.regroupements.push(r);
      }
      sd.parRegroupement.get(cleRegroupement).competences.push(row);
    });
    return domaines;
  }

  async function getCompetence(id) {
    const { data, error } = await db.from('banque_items').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  /* Remplace tout le tableau items d'une compétence — l'éditeur partagé
     (js/evaluations-exercise-form.js) gère add/edit/remove/reorder en
     mémoire, ceci ne fait qu'un seul UPDATE avec le résultat final. */
  async function updateItems(id, items) {
    const { data, error } = await db.from('banque_items')
      .update({ items })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  return { getTree, getCompetence, updateItems };
})();

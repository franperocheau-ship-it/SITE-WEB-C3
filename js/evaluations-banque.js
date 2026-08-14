/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-banque.js — Mode "Je crée avec Proficiamus" du générateur
   d'évaluations : lit la banque d'items par compétence depuis Supabase
   (table banque_items, voir supabase/migrations/20260828100000_banque_items.sql
   et le panneau admin evaluations-banque-admin.html qui l'édite).

   Chaque ligne de banque_items porte déjà le vrai competence_slug résolu et
   des items au même format que evaluations.exercices — pas de correspondance
   ni de conversion à faire ici (contrairement à l'ancienne version qui lisait
   data/banques-evaluations/*.json et convertissait à la volée).

   Dépend de : supabase-client.js (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

const EvaluationsBanque = (() => {
  const db = window.lfmDb;

  /* Liste des couples {domaine, sous_domaine} présents dans la banque,
     triés, dédupliqués — alimente le <select> du mode assisté. Purement
     dérivé des données : ajouter un nouveau domaine (via une prochaine
     migration d'import) le fait apparaître ici sans changement de code. */
  async function getDomaines() {
    const { data, error } = await db.from('banque_items').select('domaine, sous_domaine');
    if (error) throw error;
    const vus = new Set();
    const domaines = [];
    (data || []).forEach(row => {
      const cle = row.domaine + '|' + row.sous_domaine;
      if (vus.has(cle)) return;
      vus.add(cle);
      domaines.push({ value: cle, domaine: row.domaine, sousDomaine: row.sous_domaine, label: `${row.domaine} — ${row.sous_domaine}` });
    });
    domaines.sort((a, b) => a.label.localeCompare(b.label, 'fr'));
    return domaines;
  }

  /* Compétences d'un domaine (value = "domaine|sous_domaine", voir
     getDomaines), triées par regroupement pédagogique puis ordre de
     création (ordre d'import, ordre pédagogique cohérent). */
  async function getCompetences(domaineValue) {
    const [domaine, sousDomaine] = domaineValue.split('|');
    const { data, error } = await db.from('banque_items')
      .select('id, competence_slug, titre, regroupement, items')
      .eq('domaine', domaine)
      .eq('sous_domaine', sousDomaine)
      .order('created_at');
    if (error) throw error;
    return data || [];
  }

  return { getDomaines, getCompetences };
})();

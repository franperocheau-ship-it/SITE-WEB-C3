function makeQueryBuilder(result) {
  const qb = {};
  ['select','eq','order','single','maybeSingle','insert','in','limit'].forEach(m => { qb[m] = () => qb; });
  qb.update = (payload) => { qb._lastUpdate = payload; return qb; };
  qb.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject);
  return qb;
}
window.__updateCalls = [];
const EVALUATIONS = [
  { id: 'ev-pending', titre: 'Éval en attente', classe: 'CM1A (CM1)', criteres: [{id:'c1',texte:'Critère A',couleur:'#1A2D6B'}], exercices: [], domaine: 'Français', sous_domaine: 'Conjugaison', partage: true, statut_validation: 'en_attente', afficher_auteur: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), profiles: { display_name: 'Mme Dupont' } },
  { id: 'ev-validee', titre: 'Éval déjà validée', classe: 'CM2B (CM2)', criteres: [{id:'c2',texte:'Critère B',couleur:'#1DBFA0'}], exercices: [], domaine: 'Français', sous_domaine: 'Conjugaison', partage: true, statut_validation: 'validee', afficher_auteur: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), profiles: { display_name: 'M. Martin' } }
];
window.lfmDb = {
  auth: { getSession: async () => ({ data: { session: { user: { id: 'admin-1' } } } }) },
  from(table) {
    if (table === 'profiles') return makeQueryBuilder({ data: { id: 'admin-1', role: 'admin', display_name: 'Admin Test', status: 'active' }, error: null });
    if (table === 'evaluations') {
      const qb = makeQueryBuilder({ data: EVALUATIONS, error: null });
      const origUpdate = qb.update;
      qb.update = (payload) => {
        qb._eqId = null;
        const chain = { ...qb };
        chain.eq = (col, val) => {
          if (col === 'id') {
            window.__updateCalls.push({ id: val, payload });
            const ev = EVALUATIONS.find(e => e.id === val);
            if (ev) Object.assign(ev, payload);
          }
          return Promise.resolve({ data: null, error: null });
        };
        return chain;
      };
      return qb;
    }
    return makeQueryBuilder({ data: [], error: null });
  }
};

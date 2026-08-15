-- ═══════════════════════════════════════════════════════════════════════════
-- dictee_gram_results — niveau de difficulté choisi pour la tentative
--
-- Le niveau (1/2/3) était déjà choisi par l'élève au démarrage de la dictée
-- (state.niveauChoisi, voir js/dictees-engine.js/chooseNiveau) et filtre les
-- phrases à trous / trous de conjugaison proposées (filterByChosenNiveau,
-- filtrage cumulatif : niveau N = niveau ≤ N), mais n'était jusqu'ici jamais
-- persisté avec le résultat — dictee_gram_results ne permettait donc pas de
-- savoir a posteriori sur quel niveau un exercice "trous"/"trous_conjugaison"
-- avait été fait. Nullable : les lignes existantes n'ont pas cette info et
-- resteront sans niveau affiché côté résultats plutôt que d'inventer une
-- valeur par défaut trompeuse.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_gram_results
  add column niveau smallint check (niveau between 1 and 3);

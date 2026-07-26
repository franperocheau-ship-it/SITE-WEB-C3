-- ═══════════════════════════════════════════════════════════════════════════
-- Statistiques enseignant des dictées préparées — deux colonnes manquantes.
--
-- dictee_results.score, pour l'exercice 2, est TOUJOURS égal à `total` par
-- construction (l'exercice ne se termine que lorsque chaque mot a fini par
-- être écrit correctement — les tentatives ratées ne sont jamais comptées,
-- seule la réussite finale l'est). Impossible d'en tirer un indicateur de
-- difficulté ; `attempts` capture le nombre réel de validations (bonnes et
-- mauvaises) de la session, seul signal utile pour "tentatives moyennes
-- avant réussite complète".
--
-- dictee_results est une ligne par EXERCICE (agrégat), jamais par mot : sans
-- `wrong_mot_ids`, impossible de calculer "mots les plus ratés" toutes
-- dictées confondues. Colonne additive plutôt que nouvelle table — assez
-- pour une agrégation via unnest() côté enseignant, pas de journal détaillé
-- nécessaire pour l'usage demandé (§ pas de sur-ingénierie).
--
-- Nullable / défaut vide : n'affecte aucune ligne déjà existante.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_results
  add column if not exists attempts smallint,
  add column if not exists wrong_mot_ids uuid[] not null default '{}';

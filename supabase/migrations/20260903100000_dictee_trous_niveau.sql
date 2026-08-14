-- ═══════════════════════════════════════════════════════════════════════════
-- Texte à trous (orthographe grammaticale) — niveau de difficulté par phrase
--
-- Même principe que dictee_mots.niveau côté lexical : chaque phrase à trous
-- porte désormais un niveau 1/2/3, choisi par l'enseignant (dictees-enseignant.html)
-- et filtré côté élève par le niveau déjà choisi au démarrage de la dictée
-- (filtrage cumulatif identique à filterByChosenNiveau, voir
-- js/dictees-engine.js). Défaut 1 pour les phrases existantes, cohérent avec
-- le défaut appliqué côté formulaire enseignant à la création d'une phrase.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_trous
  add column niveau smallint not null default 1 check (niveau between 1 and 3);

-- ═══════════════════════════════════════════════════════════════════════════
-- Dictées préparées — émoticon d'illustration personnalisable
--
-- Jusqu'ici la carte de dictée affichait toujours 📖 en dur (côté élève,
-- dictees-catalogue.html) ; l'enseignant peut désormais choisir un émoticon
-- par dictée dans une palette dédiée (dictees-enseignant.html). Défaut 📖
-- pour rester identique à l'affichage actuel sur toutes les dictées
-- existantes tant que l'enseignant n'a rien changé.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictees
  add column emoji text not null default '📖';

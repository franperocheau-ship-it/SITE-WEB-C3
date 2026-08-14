-- ═══════════════════════════════════════════════════════════════════════════
-- Module Évaluations — B3 : troisième mode de création, "Bibliothèque
-- communautaire" (clonage d'une évaluation partagée+validée, voir
-- js/evaluations-bibliotheque.js et evaluations-enseignant.html useEvaluation).
-- Traçabilité uniquement, même esprit que l'ajout de 'assiste'
-- (20260827100000) : une évaluation clonée est structurellement identique
-- à une évaluation manuelle une fois dans le formulaire.
-- ═══════════════════════════════════════════════════════════════════════════

alter table evaluations drop constraint evaluations_mode_check;
alter table evaluations add constraint evaluations_mode_check
  check (mode in ('seul', 'assiste', 'bibliotheque'));

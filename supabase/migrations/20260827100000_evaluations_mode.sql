-- ═══════════════════════════════════════════════════════════════════════════
-- Module Évaluations — ajout du mode de création ("seul" ou "assiste", voir
-- js/evaluations-banque.js). Traçabilité uniquement : une évaluation en mode
-- assisté est structurellement identique à une évaluation manuelle (mêmes
-- champs criteres/exercices en jsonb) une fois générée — aucun autre
-- changement de schéma.
-- ═══════════════════════════════════════════════════════════════════════════

alter table evaluations
  add column mode text not null default 'seul' check (mode in ('seul', 'assiste'));

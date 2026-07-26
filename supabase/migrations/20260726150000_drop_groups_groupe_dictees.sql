-- ═══════════════════════════════════════════════════════════════════════════
-- Retrait de groups.groupe_dictees — colonne orpheline.
--
-- Introduite par 20260726130000_groups_niveau.sql pour une différenciation
-- des dictées préparées "par groupe assigné par l'enseignant". Cette
-- approche a été abandonnée avant tout usage réel en production, au profit
-- d'un choix libre de niveau par l'élève au démarrage de chaque dictée
-- (js/dictees-engine.js, écran dic-state-niveau-choice) — plus aucun code
-- ne lit ni n'écrit cette colonne.
--
-- Le fichier de migration d'origine a été supprimé du dépôt localement,
-- mais la colonne était déjà appliquée en production à ce moment-là
-- (historique des migrations réparé via `supabase migration repair
-- --status reverted 20260726130000`) : DROP COLUMN nécessaire ici pour que
-- le schéma réel reflète enfin l'abandon du mécanisme, plutôt que de
-- laisser une colonne inerte et non documentée.
-- ═══════════════════════════════════════════════════════════════════════════

alter table groups
  drop column if exists groupe_dictees;

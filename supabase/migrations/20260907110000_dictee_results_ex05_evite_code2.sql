-- ═══════════════════════════════════════════════════════════════════════════
-- Correctif à la migration précédente (20260907100000) : elle réutilisait
-- exercice = 2 pour le palier 0.5 (Compléter un mot). Or js/dictees-student-
-- space.js lit déjà exercice = 2 pour "Mon bilan" (dic-stat-completees /
-- dic-stat-sans-faute) avec une sémantique héritée d'un schéma antérieur au
-- découpage 0/0.5/1 ("le score de l'exercice 2 est toujours égal au total
-- par construction" — ancien exercice de maîtrise complète, pas le palier
-- 0.5 actuel). Cette lecture était jusqu'ici inerte (aucune ligne exercice=2
-- n'a jamais existé) : réutiliser 2 l'aurait réactivée avec la mauvaise
-- signification (ex0.5 compté comme "dictée complète").
--
-- On retient 3 pour le palier 0.5 à la place, et on laisse 2 durablement
-- inutilisé (réservé, pour ne jamais recroiser cette lecture historique).
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_results drop constraint dictee_results_exercice_check;
alter table dictee_results add constraint dictee_results_exercice_check check (exercice in (0, 1, 2, 3));

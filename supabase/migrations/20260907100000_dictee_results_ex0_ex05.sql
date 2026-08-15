-- ═══════════════════════════════════════════════════════════════════════════
-- Les paliers 0 (Photographier un mot) et 0.5 (Compléter un mot / effacement
-- progressif) étaient jusqu'ici purement formatifs : aucune écriture dans
-- dictee_results (voir l'en-tête de js/dictees-engine.js avant ce commit).
-- Seul le palier 1 (Dictée de mots) y écrivait, sous exercice = 1.
--
-- Retour utilisateur : le dashboard élève et le tableau enseignant doivent
-- afficher 3 résultats distincts (une pastille par palier lexical), ce qui
-- suppose que les 3 écrivent désormais un résultat à chaque tentative,
-- comme le palier 1.
--
-- exercice = 1 ne bouge pas (compatibilité historique déjà actée). On ajoute
-- exercice = 0 pour le palier 0, et on réutilise exercice = 2 — valeur déjà
-- autorisée par la contrainte existante mais jamais utilisée par le code
-- actuel (vestige d'un schéma antérieur au découpage 0/0.5/1) — pour le
-- palier 0.5, plutôt que d'introduire une valeur non entière.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_results drop constraint dictee_results_exercice_check;
alter table dictee_results add constraint dictee_results_exercice_check check (exercice in (0, 1, 2));

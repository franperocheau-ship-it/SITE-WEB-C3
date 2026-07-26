-- ═══════════════════════════════════════════════════════════════════════════
-- Module Rédaction — Phase 2bis (amende la Phase 2, commit 4b1129d)
-- Retrait de la table jogging_enrichments (cahier des charges v2.1, §6.2)
--
-- La « zone de reformulation numérique » livrée en Phase 2 est remplacée
-- par le générateur de premier jet imprimable (§5.5) : la reformulation et
-- l'évaluation du critère N se font désormais sur papier, par l'enseignant,
-- jamais reportées dans l'application (feu_n reste 'blanc' en permanence
-- dans jogging_versions — colonne déjà présente, aucun changement de
-- schéma à faire sur cette table).
--
-- DROP TABLE supprime aussi les policies RLS qui lui sont rattachées
-- (jogging_enrichments_select_own, jogging_enrichments_select_teacher,
-- jogging_enrichments_insert_teacher, jogging_enrichments_update_teacher,
-- définies dans 20260719223947_jogging_enrichments.sql) : pas besoin de
-- les DROP POLICY explicitement au préalable.
-- ═══════════════════════════════════════════════════════════════════════════

drop table if exists jogging_enrichments;

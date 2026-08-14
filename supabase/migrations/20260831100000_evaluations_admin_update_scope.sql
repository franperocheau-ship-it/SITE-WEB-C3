-- ═══════════════════════════════════════════════════════════════════════════
-- Module Évaluations — corrige la portée de la policy update_own_or_admin
-- (20260829100000_evaluations_partage.sql) : le gate précédent
-- (statut_validation in ('en_attente','validee')) empêchait l'admin de
-- modifier une évaluation déjà 'rejetee', bloquant le retour en arrière
-- rejetee -> validee ("revenir sur une décision à tout moment, et
-- inversement", voir evaluations-enseignant.html vue admin).
--
-- Nouveau gate : partage = true, un champ que l'admin ne modifie jamais
-- lui-même (seuls statut_validation/motif_refus le sont côté modération)
-- — reste vrai indéfiniment quelle que soit la décision prise, aucun
-- verrouillage possible après une action admin, contrairement à un gate
-- basé sur statut_validation lui-même.
-- ═══════════════════════════════════════════════════════════════════════════

drop policy if exists evaluations_update_own_or_admin on evaluations;

create policy evaluations_update_own_or_admin on evaluations
  for update
  using (teacher_id = auth.uid() or (my_role() = 'admin' and partage = true))
  with check (teacher_id = auth.uid() or (my_role() = 'admin' and partage = true));

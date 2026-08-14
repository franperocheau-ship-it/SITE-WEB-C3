-- ═══════════════════════════════════════════════════════════════════════════
-- Fin d'année scolaire — suppression ciblée des données élèves
--
-- 1. profiles.hemisphere_sud : marque un enseignant dont l'année scolaire ne
--    suit pas le calendrier standard (hémisphère sud) — ses élèves sont
--    exclus des sélections "tout cocher" dans l'espace admin, protégés d'une
--    suppression de fin d'année qui ne les concerne pas encore.
--
-- 2. dictees.class_id devient nullable : une dictée n'appartenait jusqu'ici
--    qu'à sa classe (ON DELETE CASCADE), donc supprimée avec elle. Pour que
--    l'enseignant la conserve et la réaffecte à une nouvelle classe l'année
--    suivante, la FK passe en ON DELETE SET NULL et les policies RLS
--    enseignant basculent sur dictees.teacher_id (déjà présent, jusqu'ici
--    inutilisé pour les policies) plutôt qu'une jointure via classes — un
--    enseignant garde ainsi la main sur ses dictées même orphelines de
--    classe. Les policies élève restent inchangées (jointure via class_id) :
--    une dictée orpheline devient naturellement invisible aux élèves, ce qui
--    est le comportement voulu.
-- ═══════════════════════════════════════════════════════════════════════════

alter table profiles
  add column hemisphere_sud boolean not null default false;

-- ── dictees.class_id : nullable + ON DELETE SET NULL ────────────────────────
alter table dictees
  drop constraint dictees_class_id_fkey;

alter table dictees
  alter column class_id drop not null;

alter table dictees
  add constraint dictees_class_id_fkey
  foreign key (class_id) references classes(id) on delete set null;

-- ── RLS dictees : bascule sur teacher_id ─────────────────────────────────────
drop policy dictees_select_teacher on dictees;
drop policy dictees_insert_teacher on dictees;
drop policy dictees_update_teacher on dictees;
drop policy dictees_delete_teacher on dictees;

create policy dictees_select_teacher on dictees
  for select using (teacher_id = auth.uid());

create policy dictees_insert_teacher on dictees
  for insert with check (teacher_id = auth.uid());

create policy dictees_update_teacher on dictees
  for update using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

create policy dictees_delete_teacher on dictees
  for delete using (teacher_id = auth.uid());

-- ── RLS dictee_mots : bascule sur dictees.teacher_id ────────────────────────
drop policy dictee_mots_select_teacher on dictee_mots;
drop policy dictee_mots_insert_teacher on dictee_mots;
drop policy dictee_mots_update_teacher on dictee_mots;
drop policy dictee_mots_delete_teacher on dictee_mots;

create policy dictee_mots_select_teacher on dictee_mots
  for select using (
    exists (select 1 from dictees d where d.id = dictee_mots.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_mots_insert_teacher on dictee_mots
  for insert with check (
    exists (select 1 from dictees d where d.id = dictee_mots.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_mots_update_teacher on dictee_mots
  for update using (
    exists (select 1 from dictees d where d.id = dictee_mots.dictee_id and d.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from dictees d where d.id = dictee_mots.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_mots_delete_teacher on dictee_mots
  for delete using (
    exists (select 1 from dictees d where d.id = dictee_mots.dictee_id and d.teacher_id = auth.uid())
  );

-- ── RLS dictee_trous : bascule sur dictees.teacher_id ───────────────────────
drop policy dictee_trous_select_teacher on dictee_trous;
drop policy dictee_trous_insert_teacher on dictee_trous;
drop policy dictee_trous_update_teacher on dictee_trous;
drop policy dictee_trous_delete_teacher on dictee_trous;

create policy dictee_trous_select_teacher on dictee_trous
  for select using (
    exists (select 1 from dictees d where d.id = dictee_trous.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_trous_insert_teacher on dictee_trous
  for insert with check (
    exists (select 1 from dictees d where d.id = dictee_trous.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_trous_update_teacher on dictee_trous
  for update using (
    exists (select 1 from dictees d where d.id = dictee_trous.dictee_id and d.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from dictees d where d.id = dictee_trous.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_trous_delete_teacher on dictee_trous
  for delete using (
    exists (select 1 from dictees d where d.id = dictee_trous.dictee_id and d.teacher_id = auth.uid())
  );

-- ── RLS dictee_trous_mots : bascule sur dictees.teacher_id (via dictee_trous) ──
drop policy dictee_trous_mots_select_teacher on dictee_trous_mots;
drop policy dictee_trous_mots_insert_teacher on dictee_trous_mots;
drop policy dictee_trous_mots_update_teacher on dictee_trous_mots;
drop policy dictee_trous_mots_delete_teacher on dictee_trous_mots;

create policy dictee_trous_mots_select_teacher on dictee_trous_mots
  for select using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_insert_teacher on dictee_trous_mots
  for insert with check (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_update_teacher on dictee_trous_mots
  for update using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_mots.trou_id and d.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_delete_teacher on dictee_trous_mots
  for delete using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

-- ── RLS dictee_transformations : bascule sur dictees.teacher_id ────────────
drop policy dictee_transformations_select_teacher on dictee_transformations;
drop policy dictee_transformations_insert_teacher on dictee_transformations;
drop policy dictee_transformations_update_teacher on dictee_transformations;
drop policy dictee_transformations_delete_teacher on dictee_transformations;

create policy dictee_transformations_select_teacher on dictee_transformations
  for select using (
    exists (select 1 from dictees d where d.id = dictee_transformations.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_transformations_insert_teacher on dictee_transformations
  for insert with check (
    exists (select 1 from dictees d where d.id = dictee_transformations.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_transformations_update_teacher on dictee_transformations
  for update using (
    exists (select 1 from dictees d where d.id = dictee_transformations.dictee_id and d.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from dictees d where d.id = dictee_transformations.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_transformations_delete_teacher on dictee_transformations
  for delete using (
    exists (select 1 from dictees d where d.id = dictee_transformations.dictee_id and d.teacher_id = auth.uid())
  );

-- ── RLS dictee_gram_extra_mots : bascule sur dictees.teacher_id ────────────
drop policy dictee_gram_extra_mots_select_teacher on dictee_gram_extra_mots;
drop policy dictee_gram_extra_mots_insert_teacher on dictee_gram_extra_mots;
drop policy dictee_gram_extra_mots_update_teacher on dictee_gram_extra_mots;
drop policy dictee_gram_extra_mots_delete_teacher on dictee_gram_extra_mots;

create policy dictee_gram_extra_mots_select_teacher on dictee_gram_extra_mots
  for select using (
    exists (select 1 from dictees d where d.id = dictee_gram_extra_mots.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_gram_extra_mots_insert_teacher on dictee_gram_extra_mots
  for insert with check (
    exists (select 1 from dictees d where d.id = dictee_gram_extra_mots.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_gram_extra_mots_update_teacher on dictee_gram_extra_mots
  for update using (
    exists (select 1 from dictees d where d.id = dictee_gram_extra_mots.dictee_id and d.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from dictees d where d.id = dictee_gram_extra_mots.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_gram_extra_mots_delete_teacher on dictee_gram_extra_mots
  for delete using (
    exists (select 1 from dictees d where d.id = dictee_gram_extra_mots.dictee_id and d.teacher_id = auth.uid())
  );

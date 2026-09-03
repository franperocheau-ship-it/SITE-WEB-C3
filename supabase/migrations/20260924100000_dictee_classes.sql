-- ═══════════════════════════════════════════════════════════════════════════
-- Dictées préparées — distribution multi-classes
--
-- Jusqu'ici une dictée n'appartenait qu'à une seule classe (dictees.class_id,
-- déjà nullable + ON DELETE SET NULL depuis 20260901100000). Cette table de
-- liaison many-to-many permet à l'enseignant de distribuer une même dictée à
-- plusieurs classes. À partir de cette migration, dictee_classes devient la
-- seule source de vérité pour la visibilité élève ; dictees.class_id n'est
-- plus écrit par le client (conservé tel quel en base, colonne héritée du
-- modèle mono-classe — voir js/dictees-teacher.js) et le flux "dictées à
-- réaffecter" (orphelines) bascule du même coup sur "aucune ligne dans
-- dictee_classes" plutôt que "class_id IS NULL".
--
-- RLS calquée sur dictee_mots : lecture/écriture enseignant via
-- dictees.teacher_id, lecture élève via students.class_id (cf. patron déjà en
-- place depuis 20260901100000).
-- ═══════════════════════════════════════════════════════════════════════════

create table dictee_classes (
  id         uuid primary key default gen_random_uuid(),
  dictee_id  uuid not null references dictees(id) on delete cascade,
  class_id   uuid not null references classes(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (dictee_id, class_id)
);

create index dictee_classes_dictee_id_idx on dictee_classes (dictee_id);
create index dictee_classes_class_id_idx  on dictee_classes (class_id);

alter table dictee_classes enable row level security;

-- ── RLS dictee_classes ───────────────────────────────────────────────────
-- Pas de policy update : le formulaire enseignant remplace intégralement le
-- contenu (delete-then-insert), même patron que replaceMots/dictee_mots —
-- jamais de modification d'une ligne existante.
create policy dictee_classes_select_teacher on dictee_classes
  for select using (
    exists (select 1 from dictees d where d.id = dictee_classes.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_classes_insert_teacher on dictee_classes
  for insert with check (
    exists (select 1 from dictees d where d.id = dictee_classes.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_classes_delete_teacher on dictee_classes
  for delete using (
    exists (select 1 from dictees d where d.id = dictee_classes.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_classes_select_student on dictee_classes
  for select using (
    exists (
      select 1 from students st
      where st.class_id = dictee_classes.class_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS élève : bascule de dictees.class_id vers dictee_classes ────────────
drop policy dictees_select_student on dictees;
create policy dictees_select_student on dictees
  for select using (
    exists (
      select 1 from dictee_classes dc
      join students st on st.class_id = dc.class_id
      where dc.dictee_id = dictees.id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_mots_select_student on dictee_mots;
create policy dictee_mots_select_student on dictee_mots
  for select using (
    exists (
      select 1 from dictee_classes dc
      join students st on st.class_id = dc.class_id
      where dc.dictee_id = dictee_mots.dictee_id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_trous_select_student on dictee_trous;
create policy dictee_trous_select_student on dictee_trous
  for select using (
    exists (
      select 1 from dictee_classes dc
      join students st on st.class_id = dc.class_id
      where dc.dictee_id = dictee_trous.dictee_id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_trous_mots_select_student on dictee_trous_mots;
create policy dictee_trous_mots_select_student on dictee_trous_mots
  for select using (
    exists (
      select 1 from dictee_trous t
      join dictee_classes dc on dc.dictee_id = t.dictee_id
      join students st on st.class_id = dc.class_id
      where t.id = dictee_trous_mots.trou_id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_transformations_select_student on dictee_transformations;
create policy dictee_transformations_select_student on dictee_transformations
  for select using (
    exists (
      select 1 from dictee_classes dc
      join students st on st.class_id = dc.class_id
      where dc.dictee_id = dictee_transformations.dictee_id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_gram_extra_mots_select_student on dictee_gram_extra_mots;
create policy dictee_gram_extra_mots_select_student on dictee_gram_extra_mots
  for select using (
    exists (
      select 1 from dictee_classes dc
      join students st on st.class_id = dc.class_id
      where dc.dictee_id = dictee_gram_extra_mots.dictee_id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_trous_conjugaison_select_student on dictee_trous_conjugaison;
create policy dictee_trous_conjugaison_select_student on dictee_trous_conjugaison
  for select using (
    exists (
      select 1 from dictee_classes dc
      join students st on st.class_id = dc.class_id
      where dc.dictee_id = dictee_trous_conjugaison.dictee_id and st.auth_user_id = auth.uid()
    )
  );

drop policy dictee_trous_conjugaison_mots_select_student on dictee_trous_conjugaison_mots;
create policy dictee_trous_conjugaison_mots_select_student on dictee_trous_conjugaison_mots
  for select using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictee_classes dc on dc.dictee_id = t.dictee_id
      join students st on st.class_id = dc.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and st.auth_user_id = auth.uid()
    )
  );

-- ── Correctif : policies enseignant de dictee_trous_conjugaison(_mots)
--    encore basées sur classes.class_id (oubliées lors du passage à
--    teacher_id direct par 20260901100000 — cette table a été créée une
--    semaine plus tard, sur l'ancien patron). Avec dictees.class_id qui
--    devient NULL par défaut pour toute nouvelle dictée (assignée via
--    dictee_classes désormais), ces policies auraient bloqué l'enseignant
--    sur les trous de conjugaison de toute dictée créée à partir d'ici.
--    Alignées sur le patron teacher_id déjà en place pour dictee_trous/
--    dictee_transformations/dictee_gram_extra_mots.
drop policy dictee_trous_conjugaison_select_teacher on dictee_trous_conjugaison;
drop policy dictee_trous_conjugaison_insert_teacher on dictee_trous_conjugaison;
drop policy dictee_trous_conjugaison_update_teacher on dictee_trous_conjugaison;
drop policy dictee_trous_conjugaison_delete_teacher on dictee_trous_conjugaison;

create policy dictee_trous_conjugaison_select_teacher on dictee_trous_conjugaison
  for select using (
    exists (select 1 from dictees d where d.id = dictee_trous_conjugaison.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_trous_conjugaison_insert_teacher on dictee_trous_conjugaison
  for insert with check (
    exists (select 1 from dictees d where d.id = dictee_trous_conjugaison.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_trous_conjugaison_update_teacher on dictee_trous_conjugaison
  for update using (
    exists (select 1 from dictees d where d.id = dictee_trous_conjugaison.dictee_id and d.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from dictees d where d.id = dictee_trous_conjugaison.dictee_id and d.teacher_id = auth.uid())
  );

create policy dictee_trous_conjugaison_delete_teacher on dictee_trous_conjugaison
  for delete using (
    exists (select 1 from dictees d where d.id = dictee_trous_conjugaison.dictee_id and d.teacher_id = auth.uid())
  );

drop policy dictee_trous_conjugaison_mots_select_teacher on dictee_trous_conjugaison_mots;
drop policy dictee_trous_conjugaison_mots_insert_teacher on dictee_trous_conjugaison_mots;
drop policy dictee_trous_conjugaison_mots_update_teacher on dictee_trous_conjugaison_mots;
drop policy dictee_trous_conjugaison_mots_delete_teacher on dictee_trous_conjugaison_mots;

create policy dictee_trous_conjugaison_mots_select_teacher on dictee_trous_conjugaison_mots
  for select using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_insert_teacher on dictee_trous_conjugaison_mots
  for insert with check (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_update_teacher on dictee_trous_conjugaison_mots
  for update using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and d.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_delete_teacher on dictee_trous_conjugaison_mots
  for delete using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and d.teacher_id = auth.uid()
    )
  );

-- ── Backfill : les dictées existantes étaient verrouillées sur la classe
--    CM1D (f8e9e96c-a3a4-4eaa-96b9-44dea5b4e6b6, année 2025-2026, n'existe
--    plus cette année scolaire) — assignées à CM2H
--    (5bc3d6bb-a8d8-4754-b26f-ed91616ed654, année 2026-2027, classe actuelle
--    de l'enseignant), vérifiée avant écriture via `supabase db query
--    --linked`, pour qu'aucune dictée existante ne disparaisse du jour au
--    lendemain côté élève.
insert into dictee_classes (dictee_id, class_id)
select id, '5bc3d6bb-a8d8-4754-b26f-ed91616ed654'
from dictees
where class_id = 'f8e9e96c-a3a4-4eaa-96b9-44dea5b4e6b6';

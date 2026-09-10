/* ─────────────────────────────────────────────────────────────────────────────
   class_links — "Liens de la classe" : liste de liens externes (Pronote,
   Padlets, sites pédagogiques...) gérée par l'enseignant pour sa classe,
   visible en lecture seule par les élèves de cette classe.

   Pattern single-hop repris de dictees (20260726120000_dictees.sql) : pas de
   table de jointure many-to-many, donc pas du piège de récursion RLS
   rencontré sur dictee_classes (20260924/20260925). Élève scopé via
   students.class_id → students.auth_user_id = auth.uid(), jamais via
   class_memberships (table jamais alimentée dans ce projet).
   ───────────────────────────────────────────────────────────────────────────── */

create table class_links (
  id          uuid primary key default gen_random_uuid(),
  class_id    uuid not null references classes(id) on delete cascade,
  teacher_id  uuid not null references profiles(id),
  title       text not null,
  url         text not null,
  description text,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);

create index class_links_class_id_idx on class_links(class_id, position);

alter table class_links enable row level security;

-- Enseignant : CRUD complet, scopé aux classes dont il a la charge
create policy class_links_select_teacher on class_links
  for select using (
    exists (select 1 from classes c where c.id = class_links.class_id and c.teacher_id = auth.uid())
  );

create policy class_links_insert_teacher on class_links
  for insert with check (
    teacher_id = auth.uid()
    and exists (select 1 from classes c where c.id = class_links.class_id and c.teacher_id = auth.uid())
  );

create policy class_links_update_teacher on class_links
  for update using (
    exists (select 1 from classes c where c.id = class_links.class_id and c.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from classes c where c.id = class_links.class_id and c.teacher_id = auth.uid())
  );

create policy class_links_delete_teacher on class_links
  for delete using (
    exists (select 1 from classes c where c.id = class_links.class_id and c.teacher_id = auth.uid())
  );

-- Élève : lecture seule, uniquement les liens de sa propre classe
create policy class_links_select_student on class_links
  for select using (
    exists (select 1 from students st where st.class_id = class_links.class_id and st.auth_user_id = auth.uid())
  );

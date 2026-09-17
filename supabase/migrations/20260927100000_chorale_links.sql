/* ─────────────────────────────────────────────────────────────────────────────
   chorale_links — liste de liens (vidéos YouTube, partitions, sites...) gérée
   par l'enseignant pour sa classe, visible en lecture seule par les élèves de
   cette classe. Module "Chorale", indépendant de "Liens de la classe"
   (class_links, 20260926100000).

   Même pattern single-hop que class_links : élève scopé via
   students.class_id → students.auth_user_id = auth.uid(), jamais via
   class_memberships (table jamais alimentée dans ce projet).
   ───────────────────────────────────────────────────────────────────────────── */

create table chorale_links (
  id          uuid primary key default gen_random_uuid(),
  class_id    uuid references classes(id) on delete cascade,
  title       text not null,
  url         text not null,
  description text,
  position    int default 0,
  created_at  timestamptz default now()
);

create index chorale_links_class_id_idx on chorale_links(class_id, position);

alter table chorale_links enable row level security;

-- Enseignant : CRUD complet, scopé aux classes dont il a la charge
create policy chorale_links_select_teacher on chorale_links
  for select using (
    exists (select 1 from classes c where c.id = chorale_links.class_id and c.teacher_id = auth.uid())
  );

create policy chorale_links_insert_teacher on chorale_links
  for insert with check (
    exists (select 1 from classes c where c.id = chorale_links.class_id and c.teacher_id = auth.uid())
  );

create policy chorale_links_update_teacher on chorale_links
  for update using (
    exists (select 1 from classes c where c.id = chorale_links.class_id and c.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from classes c where c.id = chorale_links.class_id and c.teacher_id = auth.uid())
  );

create policy chorale_links_delete_teacher on chorale_links
  for delete using (
    exists (select 1 from classes c where c.id = chorale_links.class_id and c.teacher_id = auth.uid())
  );

-- Élève : lecture seule, uniquement les liens de sa propre classe
create policy chorale_links_select_student on chorale_links
  for select using (
    exists (select 1 from students st where st.class_id = chorale_links.class_id and st.auth_user_id = auth.uid())
  );

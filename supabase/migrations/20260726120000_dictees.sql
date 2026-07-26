-- ═══════════════════════════════════════════════════════════════════════════
-- Module Orthographe — Dictées préparées
-- Tables : dictees, dictee_mots, dictee_results
--
-- Dictées entièrement créées par l'enseignant (pas de catalogue statique,
-- contrairement au module Rédaction/joggings) : titre + points grammaticaux
-- en texte libre + liste de mots difficiles avec un niveau (1/2/3) par mot,
-- pour permettre la différenciation. Aucune Edge Function : écritures
-- directes depuis le client, protégées par RLS, comme jogging_sessions et
-- exercise_results.
-- ═══════════════════════════════════════════════════════════════════════════

create table dictees (
  id                  uuid primary key default gen_random_uuid(),
  class_id            uuid not null references classes(id) on delete cascade,
  teacher_id          uuid not null references profiles(id),
  titre               text not null,
  points_grammaticaux text[] not null default '{}',  -- saisie libre enseignante, un point par élément
  created_at          timestamptz not null default now(),
  updated_at          timestamptz default now()
);

-- Mots/groupes de mots difficiles d'une dictée. Le niveau (1/2/3, mêmes
-- libellés que le reste du site) permet de faire travailler des mots
-- différents à des élèves différents sans dupliquer la dictée elle-même —
-- c'est le seul endroit où le niveau s'applique (jamais sur la dictée
-- globale, voir §1 du cahier des charges).
create table dictee_mots (
  id         uuid primary key default gen_random_uuid(),
  dictee_id  uuid not null references dictees(id) on delete cascade,
  contenu    text not null,       -- ex. "un aéroport", "les enfants jouaient"
  niveau     smallint not null check (niveau between 1 and 3),
  ordre      smallint not null,
  unique (dictee_id, ordre)
);

-- Un enregistrement par exercice terminé (immutable, calqué sur
-- exercise_results) : exercice 1 = capsule sonore, exercice 2 = répétition
-- jusqu'à maîtrise. `sans_faute` n'a de sens que pour l'exercice 2 (aucun
-- mot raté sur l'ensemble du passage) et sert directement au badge
-- "Sans faute !".
create table dictee_results (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references profiles(id) on delete cascade,
  dictee_id      uuid not null references dictees(id) on delete cascade,
  exercice       smallint not null check (exercice in (1, 2)),
  score          integer not null check (score >= 0),
  total          integer not null check (total > 0),
  sans_faute     boolean not null default false,
  pct            numeric(5,2) generated always as (round((score::numeric / total) * 100, 2)) stored,
  duration_secs  integer,
  completed_at   timestamptz not null default now()
);

create index dictees_class_id_idx        on dictees (class_id);
create index dictee_mots_dictee_id_idx   on dictee_mots (dictee_id);
create index dictee_results_student_idx  on dictee_results (student_id);
create index dictee_results_dictee_idx   on dictee_results (dictee_id);

alter table dictees        enable row level security;
alter table dictee_mots    enable row level security;
alter table dictee_results enable row level security;

-- ── RLS dictees ────────────────────────────────────────────────────────────
-- Enseignant : CRUD limité à ses propres classes (même patron que
-- jogging_class_settings).
create policy dictees_select_teacher on dictees
  for select using (
    exists (select 1 from classes c where c.id = dictees.class_id and c.teacher_id = auth.uid())
  );

create policy dictees_insert_teacher on dictees
  for insert with check (
    teacher_id = auth.uid()
    and exists (select 1 from classes c where c.id = dictees.class_id and c.teacher_id = auth.uid())
  );

create policy dictees_update_teacher on dictees
  for update using (
    exists (select 1 from classes c where c.id = dictees.class_id and c.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from classes c where c.id = dictees.class_id and c.teacher_id = auth.uid())
  );

create policy dictees_delete_teacher on dictees
  for delete using (
    exists (select 1 from classes c where c.id = dictees.class_id and c.teacher_id = auth.uid())
  );

-- Élève : lecture seule des dictées de sa propre classe (jointure sur
-- students uniquement, pas sur classes — cf. commentaire de
-- jogging_class_settings_select_student).
create policy dictees_select_student on dictees
  for select using (
    exists (
      select 1 from students st
      where st.class_id = dictees.class_id
        and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_mots ────────────────────────────────────────────────────────
create policy dictee_mots_select_teacher on dictee_mots
  for select using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_mots_insert_teacher on dictee_mots
  for insert with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_mots_update_teacher on dictee_mots
  for update using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_mots.dictee_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_mots_delete_teacher on dictee_mots
  for delete using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_mots_select_student on dictee_mots
  for select using (
    exists (
      select 1 from dictees d
      join students st on st.class_id = d.class_id
      where d.id = dictee_mots.dictee_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_results ─────────────────────────────────────────────────────
-- Même patron que exercise_results : élève propriétaire, enseignant via
-- is_my_student(), aucune update/delete (journal immuable).
create policy dictee_results_insert_own on dictee_results
  for insert with check (student_id = auth.uid());

create policy dictee_results_select_own on dictee_results
  for select using (student_id = auth.uid());

create policy dictee_results_select_teacher on dictee_results
  for select using (public.is_my_student(student_id));

-- ═══════════════════════════════════════════════════════════════════════════
-- Module Rédaction — Phase 3 (motivation et progression)
-- Tables : jogging_badges, jogging_carnet (cahier des charges §6.2)
--
-- Toujours aucune Edge Function : attribution des badges et ajout au carnet
-- calculés côté front à partir des données déjà stockées, écriture directe
-- depuis le client (RLS), comme jogging_sessions/jogging_versions.
-- ═══════════════════════════════════════════════════════════════════════════

-- Badges gagnés par un élève (catalogue des badges défini côté client,
-- js/jogging-badges.js — pas de table de référence pour les définitions,
-- même patron que le catalogue statique jogging-data.js).
create table jogging_badges (
  student_id uuid references profiles(id),
  badge_id text,
  earned_at timestamptz default now(),
  primary key (student_id, badge_id)
);

-- Carnet d'auteur : sélection de joggings clos que l'élève choisit de
-- conserver pour son export "petit livre PDF" de fin d'année.
create table jogging_carnet (
  student_id uuid references profiles(id),
  session_id uuid references jogging_sessions(id) on delete cascade,
  added_at timestamptz default now(),
  primary key (student_id, session_id)
);

create index jogging_badges_student_id_idx on jogging_badges (student_id);
create index jogging_carnet_student_id_idx on jogging_carnet (student_id);

alter table jogging_badges enable row level security;
alter table jogging_carnet enable row level security;

-- ── RLS jogging_badges ───────────────────────────────────────────────────
-- Élève : lecture et attribution de ses propres badges (jamais de delete —
-- un badge gagné reste gagné). L'attribution est déterministe et rejouable
-- (mêmes règles, mêmes données), donc rien à corriger après coup.
create policy jogging_badges_select_own on jogging_badges
  for select using (student_id = auth.uid());

create policy jogging_badges_insert_own on jogging_badges
  for insert with check (student_id = auth.uid());

-- Enseignant : lecture seule des badges des élèves de ses classes (même
-- jointure students/classes que jogging_sessions, §6.3).
create policy jogging_badges_select_teacher on jogging_badges
  for select using (
    exists (
      select 1 from students st
      join classes c on c.id = st.class_id
      where st.auth_user_id = jogging_badges.student_id
        and c.teacher_id = auth.uid()
    )
  );

-- ── RLS jogging_carnet ───────────────────────────────────────────────────
-- Élève : lecture et ajout à son propre carnet, uniquement pour une session
-- lui appartenant et déjà close (le bouton "Ajouter à mon carnet" n'est
-- proposé que sur un jogging clos, §5.6.7 — la contrainte est reprise ici
-- pour ne pas dépendre uniquement du front).
create policy jogging_carnet_select_own on jogging_carnet
  for select using (student_id = auth.uid());

create policy jogging_carnet_insert_own on jogging_carnet
  for insert with check (
    student_id = auth.uid()
    and exists (
      select 1 from jogging_sessions s
      where s.id = jogging_carnet.session_id
        and s.student_id = auth.uid()
        and s.status = 'completed'
    )
  );

create policy jogging_carnet_delete_own on jogging_carnet
  for delete using (student_id = auth.uid());

-- Enseignant : lecture seule du carnet des élèves de ses classes.
create policy jogging_carnet_select_teacher on jogging_carnet
  for select using (
    exists (
      select 1 from students st
      join classes c on c.id = st.class_id
      where st.auth_user_id = jogging_carnet.student_id
        and c.teacher_id = auth.uid()
    )
  );

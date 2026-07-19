-- ═══════════════════════════════════════════════════════════════════════════
-- Module Rédaction — Phase 1 v2.0 (pivot zéro IA, correction via Grammalecte
-- côté client). Tables : jogging_sessions, jogging_versions.
-- Hors périmètre Phase 1 : jogging_enrichments, jogging_badges, jogging_carnet
-- (cahier des charges §6.2, §7 Phase 1).
--
-- Aucune Edge Function : les écritures se font directement depuis le client
-- (RLS-protégées), comme pour exercise_results (§1.2 point 3).
-- ═══════════════════════════════════════════════════════════════════════════

-- Une session = un élève × un jogging du catalogue statique (js/jogging-data.js)
create table jogging_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id),
  jogging_id text not null,              -- clé du catalogue statique (js/jogging-data.js)
  status text not null default 'draft',  -- draft | in_progress | completed
  current_version smallint not null default 1,
  draft_text text,                       -- auto-save du brouillon en cours (~30s + blur)
  all_green boolean not null default false, -- vrai quand les 7 critères automatisables sont verts
  flagged boolean not null default false,   -- drapeau de vigilance (§3.10) — non exploité en Phase 1
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- Une version soumise + sa correction Grammalecte, écrite directement par le
-- client (RLS) : pas d'Edge Function, le moteur tourne dans le navigateur.
create table jogging_versions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references jogging_sessions(id) on delete cascade,
  version_number smallint not null check (version_number between 1 and 3),
  text text not null,
  correction jsonb,                      -- résultat Grammalecte brut + erreurs mappées Code Champion
  -- feux en colonnes pour agrégations SQL directes côté enseignant :
  feu_c text, feu_h text, feu_a text, feu_m text, feu_p text,
  feu_i text, feu_o text, feu_n text, feu_s text,   -- 'vert' | 'orange' | 'rouge' | 'blanc'
  -- feu_n reste 'blanc' jusqu'à saisie manuelle enseignante (jogging_enrichments, Phase 2)
  grammalecte_version text,
  submitted_at timestamptz not null default now(),
  unique (session_id, version_number)
);

-- ── Index ────────────────────────────────────────────────────────────────
create index jogging_sessions_student_id_idx on jogging_sessions (student_id);
create index jogging_sessions_status_idx    on jogging_sessions (status);
create index jogging_versions_session_id_idx on jogging_versions (session_id);

-- ── RLS ──────────────────────────────────────────────────────────────────
alter table jogging_sessions enable row level security;
alter table jogging_versions enable row level security;

-- Élève : accès à ses propres sessions. Jamais de delete. Pas de modification
-- d'une session déjà 'completed' (le jogging clos reste lisible mais figé).
create policy jogging_sessions_select_own on jogging_sessions
  for select using (student_id = auth.uid());

create policy jogging_sessions_insert_own on jogging_sessions
  for insert with check (student_id = auth.uid());

create policy jogging_sessions_update_own on jogging_sessions
  for update
  using (student_id = auth.uid() and status <> 'completed')
  with check (student_id = auth.uid());

-- Élève : écriture directe de ses propres versions (pas d'Edge Function —
-- Grammalecte tourne dans le navigateur, seul le résultat est écrit ici).
-- Jamais d'update/delete : une version soumise est définitive
-- (contrainte unique(session_id, version_number) déjà garante d'unicité).
create policy jogging_versions_select_own on jogging_versions
  for select using (
    exists (
      select 1 from jogging_sessions s
      where s.id = jogging_versions.session_id
        and s.student_id = auth.uid()
    )
  );

create policy jogging_versions_insert_own on jogging_versions
  for insert with check (
    exists (
      select 1 from jogging_sessions s
      where s.id = jogging_versions.session_id
        and s.student_id = auth.uid()
        and s.status <> 'completed'
    )
  );

-- Enseignant : lecture des sessions/versions des élèves de ses classes,
-- via la jointure students (class_id) → classes (teacher_id). Écriture
-- enseignante (flagged, reformulation) hors périmètre Phase 1 — voir Phase 2
-- (§5.5, jogging_enrichments).
create policy jogging_sessions_select_teacher on jogging_sessions
  for select using (
    exists (
      select 1 from students st
      join classes c on c.id = st.class_id
      where st.auth_user_id = jogging_sessions.student_id
        and c.teacher_id = auth.uid()
    )
  );

create policy jogging_versions_select_teacher on jogging_versions
  for select using (
    exists (
      select 1 from jogging_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = jogging_versions.session_id
        and c.teacher_id = auth.uid()
    )
  );

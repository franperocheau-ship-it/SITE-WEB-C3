-- ═══════════════════════════════════════════════════════════════════════════
-- Module Rédaction — Phase 2 (espaces de suivi + reformulation enseignante)
-- Table : jogging_enrichments (cahier des charges §6.2 v2.0)
--
-- Pas de colonnes ai_text/ai_notes : il n'y a plus de proposition IA à
-- archiver depuis le pivot v2.0 (correction 100% Grammalecte, §1.2).
-- Toujours pas d'Edge Function : écriture directe depuis le client (RLS),
-- comme jogging_sessions/jogging_versions en Phase 1.
-- ═══════════════════════════════════════════════════════════════════════════

-- Reformulation et évaluation manuelle de l'enseignant — une ligne par
-- session (un jogging clos = une zone de reformulation).
create table jogging_enrichments (
  session_id uuid primary key references jogging_sessions(id) on delete cascade,
  teacher_text text,                        -- reformulation de l'enseignant (texte de l'élève par défaut)
  teacher_comment text,                     -- prioritaire partout, affiché à l'élève et dans le PDF
  feu_n text not null default 'blanc',      -- évaluation manuelle du critère Néant ('vert'|'orange'|'rouge'|'blanc')
  published boolean not null default true,  -- relecture avant publication (§8 Q8 : tranché à "publié par défaut")
  updated_at timestamptz not null default now()
);

alter table jogging_enrichments enable row level security;

-- ── RLS ──────────────────────────────────────────────────────────────────

-- Élève : lecture seule de ses propres enrichissements, uniquement s'ils
-- sont publiés (un brouillon enseignant non publié reste invisible).
create policy jogging_enrichments_select_own on jogging_enrichments
  for select using (
    published = true
    and exists (
      select 1 from jogging_sessions s
      where s.id = jogging_enrichments.session_id
        and s.student_id = auth.uid()
    )
  );

-- Enseignant : lecture + écriture (insert/update) sur les enrichissements
-- des élèves de ses classes, jointure students.class_id/auth_user_id →
-- classes.teacher_id (même patron que jogging_sessions/jogging_versions,
-- §6.3). Jamais de delete.
create policy jogging_enrichments_select_teacher on jogging_enrichments
  for select using (
    exists (
      select 1 from jogging_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = jogging_enrichments.session_id
        and c.teacher_id = auth.uid()
    )
  );

create policy jogging_enrichments_insert_teacher on jogging_enrichments
  for insert with check (
    exists (
      select 1 from jogging_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = jogging_enrichments.session_id
        and c.teacher_id = auth.uid()
    )
  );

create policy jogging_enrichments_update_teacher on jogging_enrichments
  for update
  using (
    exists (
      select 1 from jogging_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = jogging_enrichments.session_id
        and c.teacher_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from jogging_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = jogging_enrichments.session_id
        and c.teacher_id = auth.uid()
    )
  );

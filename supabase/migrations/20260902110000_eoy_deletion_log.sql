-- ═══════════════════════════════════════════════════════════════════════════
-- Journal minimal de traçabilité pour la suppression de fin d'année scolaire
-- (voir supabase/functions/delete-students-eoy). Une ligne par enseignant
-- concerné par une opération de suppression — pas de données personnelles
-- élèves conservées, uniquement des compteurs.
-- ═══════════════════════════════════════════════════════════════════════════

create table eoy_deletion_log (
  id            uuid primary key default gen_random_uuid(),
  admin_id      uuid references profiles(id) on delete set null,
  teacher_id    uuid references profiles(id) on delete set null,
  class_count   integer not null default 0,
  student_count integer not null default 0,
  created_at    timestamptz not null default now()
);

alter table eoy_deletion_log enable row level security;

-- Écriture réservée à la clé service_role (Edge Function), donc aucune
-- policy insert côté client — la RLS bloque tout insert direct par défaut.
create policy eoy_deletion_log_select_admin on eoy_deletion_log
  for select using (public.my_role() = 'admin');

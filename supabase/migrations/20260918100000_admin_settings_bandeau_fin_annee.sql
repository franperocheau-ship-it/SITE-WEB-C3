-- ═══════════════════════════════════════════════════════════════════════════
-- Table générique de settings admin (clé/valeur), + flag de pilotage du
-- bandeau enseignant de fin d'année scolaire.
--
-- Pas de mécanisme de settings globaux existant dans le schéma avant cette
-- migration (tout était jusqu'ici par entité : classes.mode_acces,
-- profiles.hemisphere_sud, etc.) — admin_settings comble ce vide et pourra
-- accueillir d'autres flags à l'avenir.
--
-- value.mode pour la clé 'bandeau_fin_annee' :
--   'auto'        (défaut) — actif si la date du jour ∈ [25/05, 15/07] de
--                  l'année en cours, calculé à la lecture (voir
--                  js/eoy-banner-settings.js) — pas de cron nécessaire.
--   'manuel_on'   — forcé actif par l'admin.
--   'manuel_off'  — forcé inactif par l'admin.
-- Un mode manuel posé hors de la fenêtre [25/05, 15/07] de l'année où il a
-- été posé est ignoré à la lecture et retombe sur 'auto' (repart sur un
-- cycle propre l'année suivante sans action admin).
-- ═══════════════════════════════════════════════════════════════════════════

create table public.admin_settings (
  key         text        primary key,
  value       jsonb       not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  uuid        references public.profiles(id) on delete set null
);

alter table public.admin_settings enable row level security;

-- Lecture : tout utilisateur authentifié (les enseignants doivent pouvoir
-- lire l'état du bandeau).
create policy "admin_settings_select_authenticated"
  on public.admin_settings for select
  using (auth.uid() is not null);

-- Écriture : réservée à l'admin.
create policy "admin_settings_all_admin"
  on public.admin_settings for all
  using (public.my_role() = 'admin')
  with check (public.my_role() = 'admin');

insert into public.admin_settings (key, value)
values ('bandeau_fin_annee', jsonb_build_object(
  'mode', 'auto',
  'derniere_activation_auto', null
));

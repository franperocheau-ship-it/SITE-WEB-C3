-- ═══════════════════════════════════════════════════════════════════════════
-- Module Rédaction — Phase 4 (personnalisation des thèmes et parcours guidé)
-- Table : jogging_class_settings (cahier des charges §6.2/§5.8)
--
-- Toujours aucune Edge Function : écriture directe depuis le client (RLS),
-- comme le reste du module.
-- ═══════════════════════════════════════════════════════════════════════════

-- Personnalisation par classe + verrouillage en parcours guidé.
-- NULL sur un champ = valeur par défaut du catalogue statique js/jogging-data.js.
-- `locked` n'a d'effet que si classes.mode_acces = 'guide' (voir §5.8 et la
-- fonction is_jogging_locked_for_student ci-dessous).
create table jogging_class_settings (
  class_id uuid not null references classes(id) on delete cascade,
  jogging_id text not null,        -- clé du catalogue statique (1 des 15)
  titre text,
  consigne text,
  temps_impose text,               -- 'present' | 'imparfait' | 'passe_compose' | 'futur'
  niveau smallint,                 -- 1 | 2 | 3
  duree_estimee smallint,          -- minutes
  competence text,
  locked boolean not null default false,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id),
  primary key (class_id, jogging_id)
);

alter table jogging_class_settings enable row level security;

-- ── RLS ──────────────────────────────────────────────────────────────────
-- Enseignant : select/insert/update/delete limité à ses propres classes.
-- Jointure directe sur classes.teacher_id (l'enseignant a un accès RLS
-- direct à ses classes, contrairement à l'élève — voir plus bas).
create policy jogging_class_settings_select_teacher on jogging_class_settings
  for select using (
    exists (select 1 from classes c where c.id = jogging_class_settings.class_id and c.teacher_id = auth.uid())
  );

create policy jogging_class_settings_insert_teacher on jogging_class_settings
  for insert with check (
    exists (select 1 from classes c where c.id = jogging_class_settings.class_id and c.teacher_id = auth.uid())
  );

create policy jogging_class_settings_update_teacher on jogging_class_settings
  for update using (
    exists (select 1 from classes c where c.id = jogging_class_settings.class_id and c.teacher_id = auth.uid())
  ) with check (
    exists (select 1 from classes c where c.id = jogging_class_settings.class_id and c.teacher_id = auth.uid())
  );

create policy jogging_class_settings_delete_teacher on jogging_class_settings
  for delete using (
    exists (select 1 from classes c where c.id = jogging_class_settings.class_id and c.teacher_id = auth.uid())
  );

-- Élève : select uniquement sur les réglages de sa propre classe (pour
-- afficher titre/consigne personnalisés et l'état verrouillé). Jointure sur
-- students UNIQUEMENT (pas sur classes) : la policy existante
-- "classes_select_enrolled_student" est inopérante pour les élèves (elle
-- s'appuie sur class_memberships, jamais peuplée dans ce projet — même
-- constat que la migration v8/get_my_guided_access) ; students, en
-- revanche, expose déjà classes_id via la policy "students_select_own".
create policy jogging_class_settings_select_student on jogging_class_settings
  for select using (
    exists (
      select 1 from students st
      where st.class_id = jogging_class_settings.class_id
        and st.auth_user_id = auth.uid()
    )
  );

-- ── Verrouillage effectif côté serveur (défense en profondeur) ────────────
-- Un élève qui contourne le clic (accès direct à jogging.html?id=...) ne
-- doit pas pouvoir créer de session sur un jogging verrouillé par son
-- enseignant, pour sa classe, en mode guidé. Comme pour
-- get_my_guided_access() (migration v8), l'élève n'a pas d'accès RLS direct
-- à `classes` : la vérification passe par une fonction SECURITY DEFINER.
create or replace function public.is_jogging_locked_for_student(p_student_auth_id uuid, p_jogging_id text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_class_id uuid;
  v_mode     text;
  v_locked   boolean;
begin
  select s.class_id into v_class_id from public.students s where s.auth_user_id = p_student_auth_id;
  if v_class_id is null then
    return false; -- pas de classe : jamais de blocage (même repli que get_my_guided_access)
  end if;

  select c.mode_acces into v_mode from public.classes c where c.id = v_class_id;
  if v_mode is distinct from 'guide' then
    return false; -- mode libre (ou classe introuvable) : le verrouillage n'a aucun effet (§5.8)
  end if;

  select jcs.locked into v_locked
  from public.jogging_class_settings jcs
  where jcs.class_id = v_class_id and jcs.jogging_id = p_jogging_id;

  return coalesce(v_locked, false);
end;
$$;

grant execute on function public.is_jogging_locked_for_student(uuid, text) to authenticated;

-- Remplace la policy d'insertion de jogging_sessions (définie dans
-- 20260719214531_joggings.sql) pour y ajouter la vérification de
-- verrouillage. Ne modifie pas le fichier de migration d'origine (pratique
-- standard : jamais éditer une migration déjà appliquée).
drop policy if exists jogging_sessions_insert_own on jogging_sessions;

create policy jogging_sessions_insert_own on jogging_sessions
  for insert with check (
    student_id = auth.uid()
    and not public.is_jogging_locked_for_student(auth.uid(), jogging_id)
  );

-- ═══════════════════════════════════════════════════════════════════════════
-- Fonction get_class_level_for_student() — expose classes.level à l'élève
-- concerné et à son enseignant, sans élargir la RLS sur public.classes.
--
-- Contexte : la nouvelle règle de déblocage des badges de sous-domaine
-- (js/laurels.js) doit connaître le niveau de classe (CM1/CM2/6e) de
-- l'élève. Ce niveau vit sur public.classes, mais la seule policy SELECT
-- ouverte à un élève ("classes_select_enrolled_student") teste
-- class_memberships — table jamais alimentée dans ce projet (voir
-- commentaire ligne ~358 de supabase-schema.sql). Un élève ne peut donc
-- aujourd'hui lire le level de sa propre classe par aucune requête client,
-- même via un join depuis students (RLS bloque la lecture de classes).
--
-- Plutôt que d'ouvrir classes en lecture (fuite du school_year/teacher_id
-- d'autres classes), on suit le pattern déjà en place pour ce type de
-- besoin (get_my_guided_access(), get_my_niveau_mode()) : une fonction
-- SECURITY DEFINER qui ne renvoie que le level, et seulement pour :
--   - l'élève lui-même (p_student_id = auth.uid(), cas dashboard-eleve.html)
--   - l'enseignant de cet élève (is_my_student(), cas resultats-enseignant.html
--     où le prof consulte la fiche/les lauriers d'un élève de sa classe)
--   - l'admin (cohérent avec l'accès élargi accordé ailleurs, my_role())
-- Ni class_memberships ni la RLS de classes ne sont modifiées.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.get_class_level_for_student(p_student_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select c.level
  from public.students s
  join public.classes c on c.id = s.class_id
  where s.auth_user_id = p_student_id
    and (
      p_student_id = auth.uid()
      or public.is_my_student(p_student_id)
      or public.my_role() = 'admin'
    )
  limit 1;
$$;

grant execute on function public.get_class_level_for_student(uuid) to authenticated;

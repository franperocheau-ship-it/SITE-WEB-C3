-- ═══════════════════════════════════════════════════════════════════════════
-- get_student_item_results_window() — fenêtre exacte des N dernières
-- tentatives par item_id pour un élève, quel que soit son volume d'activité.
--
-- Remplace un fetch client "large + group" (.limit(N) puis regroupement en
-- JS, comme getStudentResultsRaw) : avec exercise_item_results, une seule
-- tentative de niveau génère 10 à 40 lignes d'un coup (une par item de la
-- banque), contrairement à exercise_results où une ligne = une tentative
-- complète. Un élève actif qui retente plusieurs niveaux avant le seuil de
-- 80% peut dépasser plusieurs milliers de lignes sur l'année : une limite
-- fixe côté client ne garantit plus que les 5 dernières tentatives d'un
-- item ancien mais toujours raté restent dans la fenêtre récupérée. Le
-- ROW_NUMBER() ci-dessous règle ça exactement, indépendamment du volume.
--
-- Pas de SECURITY DEFINER : la fonction s'exécute avec les droits de
-- l'appelant, donc les policies RLS déjà en place sur exercise_item_results
-- (exercise_item_results_select_own / _select_teacher) s'appliquent
-- normalement — un enseignant ne peut appeler ceci que pour un élève de ses
-- classes, un élève uniquement pour lui-même, sans logique de permission
-- dupliquée ici.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function get_student_item_results_window(p_student_id uuid, p_window int default 5)
returns table (
  item_id       text,
  exercise_slug text,
  level         int,
  is_correct    boolean,
  created_at    timestamptz
)
language sql
stable
as $$
  select item_id, exercise_slug, level, is_correct, created_at
  from (
    select eir.item_id, eir.exercise_slug, eir.level, eir.is_correct, eir.created_at,
           row_number() over (partition by eir.item_id order by eir.created_at desc) as rn
    from exercise_item_results eir
    where eir.student_id = p_student_id
  ) ranked
  where rn <= p_window;
$$;

grant execute on function get_student_item_results_window(uuid, int) to authenticated;

-- ═══════════════════════════════════════════════════════════════════════════
-- Fix : récursion infinie RLS entre dictees et dictee_classes
--
-- Boucle exacte introduite par 20260924100000_dictee_classes.sql :
--   dictees_select_student (sur dictees) fait EXISTS(... FROM dictee_classes
--   JOIN students ...) → évaluer cette sous-requête applique la RLS de
--   dictee_classes → dictee_classes_select_teacher fait à son tour
--   EXISTS(... FROM dictees WHERE d.teacher_id = auth.uid()) → évaluer CETTE
--   sous-requête réapplique la RLS de dictees, donc à nouveau
--   dictees_select_student → boucle infinie (Postgres la détecte et renvoie
--   l'erreur 42P17 "infinite recursion detected in policy for relation ...").
-- Se manifeste dès qu'un rôle authentifié (enseignant OU élève) interroge
-- `dictees`, `dictee_classes` elle-même n'étant impliquée que comme relais.
--
-- Toutes les policies élève ("_select_student") du module dictées qui
-- rejoignaient dictee_classes directement souffraient du même risque latent
-- (dictee_mots, dictee_trous, dictee_trous_mots, dictee_transformations,
-- dictee_gram_extra_mots, dictee_trous_conjugaison,
-- dictee_trous_conjugaison_mots) : chacune interroge `dictees` (via sa
-- policy _select_teacher) OU `dictee_classes` (via sa propre policy
-- _select_student), et dictee_classes_select_teacher referme la boucle sur
-- dictees dans tous les cas.
--
-- Correctif : même pattern que get_class_level_for_student (migration
-- 20260730120000) — une fonction SECURITY DEFINER qui fait le join
-- dictee_classes/students en bypassant la RLS, appelée par toutes les
-- policies _select_student du module. Plus aucune de ces policies n'exécute
-- de requête normale (donc soumise à RLS) sur dictee_classes : le second
-- maillon de la boucle (dictee_classes_select_teacher → dictees) ne peut
-- alors plus jamais reboucler sur dictee_classes. Les policies
-- teacher/insert/delete de dictee_classes elle-même (qui interrogent
-- dictees) restent inchangées — elles ne posent plus de problème une fois
-- ce sens cassé.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.dictee_visible_to_student(p_dictee_id uuid, p_student_auth_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.dictee_classes dc
    join public.students st on st.class_id = dc.class_id
    where dc.dictee_id = p_dictee_id
      and st.auth_user_id = p_student_auth_id
  );
$$;

grant execute on function public.dictee_visible_to_student(uuid, uuid) to authenticated;

-- ── dictees ─────────────────────────────────────────────────────────────
drop policy dictees_select_student on dictees;
create policy dictees_select_student on dictees
  for select using (public.dictee_visible_to_student(dictees.id, auth.uid()));

-- ── dictee_mots ─────────────────────────────────────────────────────────
drop policy dictee_mots_select_student on dictee_mots;
create policy dictee_mots_select_student on dictee_mots
  for select using (public.dictee_visible_to_student(dictee_mots.dictee_id, auth.uid()));

-- ── dictee_trous ────────────────────────────────────────────────────────
drop policy dictee_trous_select_student on dictee_trous;
create policy dictee_trous_select_student on dictee_trous
  for select using (public.dictee_visible_to_student(dictee_trous.dictee_id, auth.uid()));

-- ── dictee_trous_mots (jointure via dictee_trous) ──────────────────────
drop policy dictee_trous_mots_select_student on dictee_trous_mots;
create policy dictee_trous_mots_select_student on dictee_trous_mots
  for select using (
    exists (
      select 1 from dictee_trous t
      where t.id = dictee_trous_mots.trou_id
        and public.dictee_visible_to_student(t.dictee_id, auth.uid())
    )
  );

-- ── dictee_transformations ──────────────────────────────────────────────
drop policy dictee_transformations_select_student on dictee_transformations;
create policy dictee_transformations_select_student on dictee_transformations
  for select using (public.dictee_visible_to_student(dictee_transformations.dictee_id, auth.uid()));

-- ── dictee_gram_extra_mots ───────────────────────────────────────────────
drop policy dictee_gram_extra_mots_select_student on dictee_gram_extra_mots;
create policy dictee_gram_extra_mots_select_student on dictee_gram_extra_mots
  for select using (public.dictee_visible_to_student(dictee_gram_extra_mots.dictee_id, auth.uid()));

-- ── dictee_trous_conjugaison ─────────────────────────────────────────────
drop policy dictee_trous_conjugaison_select_student on dictee_trous_conjugaison;
create policy dictee_trous_conjugaison_select_student on dictee_trous_conjugaison
  for select using (public.dictee_visible_to_student(dictee_trous_conjugaison.dictee_id, auth.uid()));

-- ── dictee_trous_conjugaison_mots (jointure via dictee_trous_conjugaison) ─
drop policy dictee_trous_conjugaison_mots_select_student on dictee_trous_conjugaison_mots;
create policy dictee_trous_conjugaison_mots_select_student on dictee_trous_conjugaison_mots
  for select using (
    exists (
      select 1 from dictee_trous_conjugaison t
      where t.id = dictee_trous_conjugaison_mots.trou_id
        and public.dictee_visible_to_student(t.dictee_id, auth.uid())
    )
  );

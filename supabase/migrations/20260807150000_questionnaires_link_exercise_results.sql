-- ═══════════════════════════════════════════════════════════════════════════
-- Rattache les passages de questionnaires de lecture au système existant
-- exercise_results, pour qu'ils apparaissent dans le dashboard élève et
-- dans les statistiques enseignant (js/teacher-analytics.js) exactement
-- comme n'importe quel autre exercice — plutôt que de créer un système de
-- suivi parallèle propre au module Lecture.
--
-- Slug partagé (constant) volontairement, pas un slug par questionnaire
-- (ex. 'questionnaire-<id>') : EXERCISE_CATALOG_AUTONOMOUS (js/exercise-
-- catalog.js) et STANDALONE_META (js/teacher-analytics.js) — les deux
-- registres qui rattachent un exercice_slug à une compétence pour
-- respectivement le dashboard élève et les stats enseignant — n'indexent
-- que des slugs exacts, écrits en dur. Un slug par questionnaire (créés en
-- continu par les enseignants) ne pourrait jamais y être enregistré et
-- resterait invisible des deux dashboards ("Autres" / compétence ignorée).
-- Avec un slug unique 'questionnaire-lecture', chaque tentative reste
-- distincte en base (exercise_title porte le titre du livre, exercise_type
-- l'id du questionnaire pour traçabilité) ; seule l'agrégation par
-- compétence les regroupe sous "Lecture — Compréhension de lecture", ce qui
-- est exactement le comportement demandé.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function soumettre_resultat_questionnaire(p_questionnaire_id uuid, p_reponses jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_titre_oeuvre text;
  v_total int;
  v_bonnes int := 0;
  v_item jsonb;
  v_question_id uuid;
  v_given_ids uuid[];
  v_correct_ids uuid[];
  v_correct_for_q boolean;
  v_correction json;
  v_result json;
begin
  select titre_oeuvre into v_titre_oeuvre
    from questionnaires where id = p_questionnaire_id and statut = 'publie';
  if v_titre_oeuvre is null then
    raise exception 'Questionnaire introuvable ou non publié';
  end if;

  select count(*) into v_total from questions where questionnaire_id = p_questionnaire_id;
  if v_total = 0 then
    raise exception 'Questionnaire sans question';
  end if;

  for v_item in select * from jsonb_array_elements(p_reponses)
  loop
    v_question_id := (v_item->>'question_id')::uuid;
    select array(select jsonb_array_elements_text(v_item->'reponse_ids'))::uuid[]
      into v_given_ids;

    select array_agg(id) into v_correct_ids
      from reponses where question_id = v_question_id and est_correcte = true;

    v_correct_for_q := (
      coalesce(array_length(v_given_ids, 1), 0) = coalesce(array_length(v_correct_ids, 1), 0)
      and v_given_ids <@ v_correct_ids
      and v_correct_ids <@ v_given_ids
    );

    if v_correct_for_q then v_bonnes := v_bonnes + 1; end if;
  end loop;

  select json_agg(json_build_object(
    'question_id', qu.id,
    'enonce', qu.enonce,
    'explication', qu.explication,
    'bonnes_reponses', (
      select json_agg(json_build_object('id', r.id, 'texte', r.texte))
      from reponses r where r.question_id = qu.id and r.est_correcte = true
    ),
    'toutes_reponses', (
      select json_agg(json_build_object('id', r.id, 'texte', r.texte, 'est_correcte', r.est_correcte))
      from reponses r where r.question_id = qu.id
    )
  ) order by qu.ordre)
  into v_correction
  from questions qu
  where qu.questionnaire_id = p_questionnaire_id;

  insert into resultats_questionnaires (student_id, questionnaire_id, score_pct, bonnes_reponses, total, reponses_donnees)
  values (auth.uid(), p_questionnaire_id, round((v_bonnes::numeric / v_total) * 100, 2), v_bonnes, v_total, p_reponses);

  -- Miroir dans exercise_results — même colonnes/conventions que
  -- saveExerciseResult() (js/results.js) : subject/category dérivés comme
  -- pour les autres exercices de Lecture (deriveSubjectCategory('français-
  -- lecture.html') → subject='français', category='lecture'), exercise_type
  -- porte l'id du questionnaire (traçabilité du livre exact, indépendamment
  -- du slug partagé ci-dessus), level=null (pas de notion de niveau sur un
  -- questionnaire en Phase 1).
  insert into exercise_results (student_id, exercise_slug, exercise_title, subject, category, exercise_type, level, score, total)
  values (
    auth.uid(), 'questionnaire-lecture', v_titre_oeuvre, 'français', 'lecture',
    p_questionnaire_id::text, null, v_bonnes, v_total
  );

  select json_build_object(
    'score_pct', round((v_bonnes::numeric / v_total) * 100, 2),
    'bonnes_reponses', v_bonnes,
    'total', v_total,
    'correction', v_correction
  ) into v_result;

  return v_result;
end;
$$;

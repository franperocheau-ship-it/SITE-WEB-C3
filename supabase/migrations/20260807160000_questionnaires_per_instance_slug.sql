-- ═══════════════════════════════════════════════════════════════════════════
-- Remplace le slug partagé 'questionnaire-lecture' (migration 20260807150000)
-- par un slug par questionnaire : 'questionnaire-lecture-<questionnaire_id>'.
--
-- Le slug partagé empêchait de distinguer "quel questionnaire" a été passé
-- dans exercise_results (seul exercise_title, non indexé, portait le titre
-- du livre) — impossible d'afficher un historique par questionnaire ou un
-- taux de réussite par questionnaire côté enseignant. Avec un slug par
-- instance, chaque questionnaire redevient un "exercice" à part entière au
-- sens du reste du site (dédoublonné indépendamment par
-- dedupeBestBySlug/exercise_slug, comme n'importe quel autre exercice), tout
-- en restant rattachable à une seule compétence "Lecture — Compréhension de
-- lecture" via une règle de préfixe (voir STANDALONE_META.prefixes dans
-- js/teacher-analytics.js, même mécanisme déjà utilisé par ortho-*/lex-*)
-- plutôt qu'une entrée exacte par questionnaire, impossible à maintenir à la
-- main dans un catalogue statique.
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
  -- saveExerciseResult() (js/results.js). exercise_slug identifie CE
  -- questionnaire précis (dédoublonnage par meilleur score, comme tout
  -- exercice) ; exercise_type garde la famille ('questionnaire-lecture')
  -- pour un filtrage générique si besoin ; level=null (pas de notion de
  -- niveau sur un questionnaire en Phase 1).
  insert into exercise_results (student_id, exercise_slug, exercise_title, subject, category, exercise_type, level, score, total)
  values (
    auth.uid(), 'questionnaire-lecture-' || p_questionnaire_id::text, v_titre_oeuvre,
    'français', 'lecture', 'questionnaire-lecture', null, v_bonnes, v_total
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

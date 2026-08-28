-- ═══════════════════════════════════════════════════════════════════════════
-- Corrige soumettre_resultat_comprehension_orale (20260921100000) : le CASE
-- construisant 'bonnes_reponses' dans la correction mélangeait une branche
-- jsonb (q.bonnes_reponses, cas reponse_libre) et une branche json
-- (json_agg(...), cas qcm) — Postgres refuse d'unifier les deux types dans
-- un même CASE ("CASE/WHEN could not convert type jsonb to json"), détecté
-- par un test de bout en bout avant livraison. Cast explicite de la branche
-- jsonb en json pour faire correspondre le type de l'autre branche.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function soumettre_resultat_comprehension_orale(p_id uuid, p_reponses jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_titre_episode text;
  v_total int;
  v_bonnes int := 0;
  v_item jsonb;
  v_question_id uuid;
  v_type_question text;
  v_bonnes_reponses_jsonb jsonb;
  v_given_indices int[];
  v_correct_indices int[];
  v_given_text text;
  v_correct_for_q boolean;
  v_correction json;
  v_result json;
begin
  select titre_episode into v_titre_episode
    from comprehensions_orales where id = p_id and statut = 'publie';
  if v_titre_episode is null then
    raise exception 'Compréhension orale introuvable ou non publiée';
  end if;

  select count(*) into v_total from comprehension_orale_questions where comprehension_orale_id = p_id;
  if v_total = 0 then
    raise exception 'Compréhension orale sans question';
  end if;

  for v_item in select * from jsonb_array_elements(p_reponses)
  loop
    v_question_id := (v_item->>'question_id')::uuid;

    select type_question, bonnes_reponses into v_type_question, v_bonnes_reponses_jsonb
      from comprehension_orale_questions where id = v_question_id and comprehension_orale_id = p_id;

    if v_type_question is null then
      continue; -- question_id inconnu ou n'appartenant pas à cette compréhension orale
    elsif v_type_question = 'reponse_libre' then
      v_given_text := comprehension_orale_normalize_text(v_item->>'reponse_texte');
      select bool_or(comprehension_orale_normalize_text(accepted.value) = v_given_text)
        into v_correct_for_q
        from jsonb_array_elements_text(v_bonnes_reponses_jsonb) as accepted(value);
      v_correct_for_q := coalesce(v_correct_for_q, false);
    else
      select array(select jsonb_array_elements_text(v_item->'reponse_indices'))::int[]
        into v_given_indices;
      select array(select jsonb_array_elements_text(v_bonnes_reponses_jsonb))::int[]
        into v_correct_indices;

      v_correct_for_q := (
        coalesce(array_length(v_given_indices, 1), 0) = coalesce(array_length(v_correct_indices, 1), 0)
        and v_given_indices <@ v_correct_indices
        and v_correct_indices <@ v_given_indices
      );
    end if;

    if v_correct_for_q then v_bonnes := v_bonnes + 1; end if;
  end loop;

  select json_agg(json_build_object(
    'question_id', q.id,
    'enonce', q.enonce,
    'explication', q.explication,
    'type_question', q.type_question,
    'bonnes_reponses', case
      when q.type_question = 'reponse_libre' then q.bonnes_reponses::json
      else (
        select json_agg(q.propositions -> idx.value::int)
        from jsonb_array_elements_text(q.bonnes_reponses) idx
      )
    end,
    'toutes_propositions', case
      when q.type_question = 'reponse_libre' then null
      else (
        select json_agg(json_build_object(
          'texte', prop.value,
          'est_correcte', (q.bonnes_reponses @> to_jsonb(prop.ordinality - 1))
        ))
        from jsonb_array_elements_text(q.propositions) with ordinality as prop(value, ordinality)
      )
    end
  ) order by q.ordre)
  into v_correction
  from comprehension_orale_questions q
  where q.comprehension_orale_id = p_id;

  insert into resultats_comprehension_orale (student_id, comprehension_orale_id, score, total)
  values (auth.uid(), p_id, v_bonnes, v_total);

  insert into exercise_results (student_id, exercise_slug, exercise_title, subject, category, exercise_type, level, score, total)
  values (
    auth.uid(), 'comprehension-orale-' || p_id::text, v_titre_episode,
    'français', 'oral', 'comprehension-orale', null, v_bonnes, v_total
  );

  select json_build_object(
    'score', v_bonnes,
    'total', v_total,
    'correction', v_correction
  ) into v_result;

  return v_result;
end;
$$;

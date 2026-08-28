-- ═══════════════════════════════════════════════════════════════════════════
-- Module Oral — Consultation en lecture seule d'une tentative par
-- l'enseignant/admin, sur le même écran de synthèse que celui vu par
-- l'élève (francais-oral.html, renderResults()).
--
-- Contrairement aux questionnaires de lecture, où reponses_donnees existe en
-- base (resultats_questionnaires) mais n'est lu nulle part côté enseignant
-- (aucun pattern de consultation à reproduire — vérifié avant d'écrire cette
-- migration), ce module ajoute la colonne ET son usage de bout en bout.
--
-- comprehension_orale_build_correction() factorise le bloc de construction
-- de la correction (déjà présent dans soumettre_resultat_comprehension_orale
-- depuis 20260921110000) pour qu'il soit identique que la source des
-- réponses soit une soumission en direct (p_reponses du client) ou une
-- tentative déjà enregistrée (reponses_donnees relu depuis la base) — même
-- écran, même code, pas de logique dupliquée. Elle enrichit aussi chaque
-- item de correction avec la réponse DONNÉE (given_reponses/given_texte),
-- pas seulement la bonne réponse : nécessaire pour qu'un enseignant qui n'a
-- pas vu l'élève jouer puisse voir ce qu'il a répondu.
--
-- Pas de grant execute sur le helper : il ne fait aucune vérification
-- d'autorisation lui-même (ni statut='publie', ni propriété de l'élève) —
-- accessible uniquement depuis l'intérieur d'une fonction SECURITY DEFINER
-- déjà autorisée, jamais appelable directement par un client.
-- ═══════════════════════════════════════════════════════════════════════════

alter table resultats_comprehension_orale
  add column reponses_donnees jsonb;

create or replace function comprehension_orale_build_correction(p_comprehension_orale_id uuid, p_reponses jsonb)
returns json
language sql
stable
set search_path = public
as $$
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
    end,
    'given_reponses', case
      when q.type_question = 'qcm' then (
        select json_agg(q.propositions -> giv.value::int)
        from (
          select jsonb_array_elements_text(item->'reponse_indices') as value
          from jsonb_array_elements(coalesce(p_reponses, '[]'::jsonb)) item
          where (item->>'question_id')::uuid = q.id
        ) giv
      )
      else null
    end,
    'given_texte', case
      when q.type_question = 'reponse_libre' then (
        select item->>'reponse_texte'
        from jsonb_array_elements(coalesce(p_reponses, '[]'::jsonb)) item
        where (item->>'question_id')::uuid = q.id
        limit 1
      )
      else null
    end
  ) order by q.ordre)
  from comprehension_orale_questions q
  where q.comprehension_orale_id = p_comprehension_orale_id;
$$;

-- Réutilise le helper ci-dessus (au lieu de dupliquer le bloc de
-- construction de la correction comme dans 20260921110000) et enregistre
-- désormais p_reponses dans reponses_donnees pour permettre la relecture
-- ultérieure par un enseignant/admin (voir get_comprehension_orale_
-- resultat_detail plus bas).
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
      continue;
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

  v_correction := comprehension_orale_build_correction(p_id, p_reponses);

  insert into resultats_comprehension_orale (student_id, comprehension_orale_id, score, total, reponses_donnees)
  values (auth.uid(), p_id, v_bonnes, v_total, p_reponses);

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

-- ─── RPC — Consultation enseignant/admin d'une tentative déjà passée ───────
-- SECURITY DEFINER : contourne la RLS de resultats_comprehension_orale pour
-- pouvoir vérifier explicitement l'autorisation (admin OU enseignant de
-- l'élève concerné), plutôt que de compter sur une policy select générique —
-- même schéma d'autorisation que la policy resultats_co_select_teacher
-- existante (is_my_student), appliqué ici manuellement pour pouvoir
-- distinguer "résultat introuvable" de "accès refusé" et construire la
-- correction complète en un seul aller-retour.
create or replace function get_comprehension_orale_resultat_detail(p_resultat_id uuid)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_student_id uuid;
  v_comprehension_orale_id uuid;
  v_score int;
  v_total int;
  v_date_passage timestamptz;
  v_reponses_donnees jsonb;
  v_titre_episode text;
  v_id_episode_france_inter text;
  v_description text;
  v_correction json;
  v_result json;
begin
  select student_id, comprehension_orale_id, score, total, date_passage, reponses_donnees
    into v_student_id, v_comprehension_orale_id, v_score, v_total, v_date_passage, v_reponses_donnees
    from resultats_comprehension_orale
    where id = p_resultat_id;

  if v_student_id is null then
    raise exception 'Résultat introuvable';
  end if;

  if not (public.my_role() = 'admin' or public.is_my_student(v_student_id)) then
    raise exception 'Accès refusé';
  end if;

  select titre_episode, id_episode_france_inter, description
    into v_titre_episode, v_id_episode_france_inter, v_description
    from comprehensions_orales where id = v_comprehension_orale_id;

  v_correction := comprehension_orale_build_correction(v_comprehension_orale_id, v_reponses_donnees);

  select json_build_object(
    'comprehension_orale', json_build_object(
      'id', v_comprehension_orale_id,
      'titre_episode', v_titre_episode,
      'id_episode_france_inter', v_id_episode_france_inter,
      'description', v_description
    ),
    'score', v_score,
    'total', v_total,
    'date_passage', v_date_passage,
    'correction', v_correction
  ) into v_result;

  return v_result;
end;
$$;

grant execute on function get_comprehension_orale_resultat_detail(uuid) to authenticated;

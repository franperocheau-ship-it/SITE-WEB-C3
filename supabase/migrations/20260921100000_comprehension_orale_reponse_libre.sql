-- ═══════════════════════════════════════════════════════════════════════════
-- Module Oral — Compréhension orale : second type de question, « réponse
-- libre » (texte saisi par l'élève, comparé à une liste de formulations
-- acceptées), en plus du QCM existant.
--
-- Pour type_question = 'reponse_libre' : propositions reste NULL (pas de
-- choix à afficher), bonnes_reponses (déjà jsonb, déjà not null) porte un
-- tableau de chaînes = les formulations acceptées, au lieu d'un tableau
-- d'index comme pour le QCM — la colonne ne change pas de type, seule son
-- interprétation dépend de type_question. La contrainte ajoutée plus bas
-- rend cette règle explicite au niveau base (jamais de propositions pour une
-- question à réponse libre, jamais de propositions NULL pour un QCM).
-- ═══════════════════════════════════════════════════════════════════════════

alter table comprehension_orale_questions
  add column type_question text not null default 'qcm'
    check (type_question in ('qcm', 'reponse_libre'));

alter table comprehension_orale_questions
  alter column propositions drop not null;

alter table comprehension_orale_questions
  add constraint comprehension_orale_questions_type_propositions
  check (
    (type_question = 'qcm'          and propositions is not null)
    or
    (type_question = 'reponse_libre' and propositions is null)
  );

-- ─── Normalisation pour la comparaison des réponses libres ─────────────────
-- Insensible à la casse, aux accents et aux espaces superflus (décision
-- produit : un élève ne doit pas être pénalisé pour un accent oublié ou une
-- majuscule — seule l'orthographe des lettres compte). unaccent() est du
-- contrib Postgres standard, absent par défaut sur ce projet : installé dans
-- le schéma `extensions`, même convention que pgcrypto/uuid-ossp déjà en
-- place (voir \dx sur le projet).
create extension if not exists unaccent with schema extensions;

-- STABLE (pas IMMUTABLE) : unaccent() dépend d'une configuration de
-- dictionnaire de recherche plein texte, donc elle-même seulement STABLE
-- dans l'extension — une fonction ne doit jamais se déclarer plus
-- déterministe que ce qu'elle appelle.
create or replace function comprehension_orale_normalize_text(p_text text)
returns text
language sql
stable
as $$
  select regexp_replace(trim(both from lower(extensions.unaccent(coalesce(p_text, '')))), '\s+', ' ', 'g');
$$;

-- ─── RPC — Passage élève (mise à jour) ──────────────────────────────────────

-- Ajoute type_question et gère propositions=NULL pour les questions à
-- réponse libre (déjà coalesce('[]') côté questions absentes, mais ici
-- propositions individuelle peut être NULL sur une question existante).
create or replace function get_comprehension_orale_pour_eleve(p_id uuid)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result json;
begin
  select json_build_object(
    'comprehension_orale', json_build_object(
      'id', co.id,
      'titre_episode', co.titre_episode,
      'id_episode_france_inter', co.id_episode_france_inter,
      'description', co.description
    ),
    'questions', coalesce((
      select json_agg(json_build_object(
        'id', q.id,
        'ordre', q.ordre,
        'enonce', q.enonce,
        'type_question', q.type_question,
        'propositions', q.propositions
      ) order by q.ordre)
      from comprehension_orale_questions q where q.comprehension_orale_id = co.id
    ), '[]'::json)
  )
  into result
  from comprehensions_orales co
  where co.id = p_id
    and co.statut = 'publie'
    and auth.uid() is not null;

  if result is null then
    raise exception 'Compréhension orale introuvable ou non publiée';
  end if;

  return result;
end;
$$;

-- Corrige et enregistre un passage. p_reponses : tableau JSON
-- [{ "question_id": "...", "reponse_indices": [0, 2] }] pour une question
-- QCM, ou [{ "question_id": "...", "reponse_texte": "..." }] pour une
-- question à réponse libre — le champ pertinent dépend de
-- comprehension_orale_questions.type_question, jamais fait confiance au
-- client. Une réponse libre est comptée bonne si sa forme normalisée
-- (comprehension_orale_normalize_text, voir plus haut) correspond exactement
-- à au moins une des formulations acceptées, elles aussi normalisées.
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
      when q.type_question = 'reponse_libre' then q.bonnes_reponses
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

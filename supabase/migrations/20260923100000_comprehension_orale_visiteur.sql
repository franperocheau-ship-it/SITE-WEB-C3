-- ═══════════════════════════════════════════════════════════════════════════
-- Module Oral — Accès en mode visiteur (utilisateur anonyme, sans session)
-- aux compréhensions orales publiées, au même titre que le reste des
-- exercices du site.
--
-- Contrairement aux exercices standards (contenu statique dans data/*.js,
-- jamais soumis à RLS — voir js/guided-access.js : « repli sur accès total
-- dans tous les cas ambigus : visiteur anonyme, erreur réseau… »), le
-- contenu d'une compréhension orale vit en base. Reproduire le même
-- comportement « fail open » nécessite donc d'ouvrir explicitement la
-- lecture du contenu publié au rôle anon, et de rendre les deux RPC
-- tolérantes à un auth.uid() nul — jamais de blocage, jamais d'erreur
-- côté visiteur, mais toujours sans trace en base (pas de ligne
-- resultats_comprehension_orale ni exercise_results pour un anonyme,
-- exactement comme saveExerciseResult() ne tente aucun insert sans
-- session, voir js/results.js).
--
-- Aucun changement de droits de table nécessaire : anon a déjà, comme
-- authenticated, les privilèges par défaut sur toutes les tables de ce
-- schéma (vérifié via information_schema.role_table_grants) — seules les
-- policies RLS et la logique interne des fonctions font encore obstacle.
-- Idem pour EXECUTE sur les fonctions (déjà accordé à PUBLIC par défaut,
-- vérifié via information_schema.role_routine_grants) : pas de nouveau
-- grant à ajouter, seule la garde auth.uid() is not null dans le corps de
-- get_comprehension_orale_pour_eleve empêchait un appel anonyme d'aboutir.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── RLS : comprehensions_orales — bibliothèque lisible sans compte ────────
drop policy if exists comprehensions_orales_select_published on comprehensions_orales;

create policy comprehensions_orales_select_published on comprehensions_orales
  for select using (statut = 'publie');

-- ─── RPC : contenu jouable, sans exiger de session ─────────────────────────
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
    and co.statut = 'publie';

  if result is null then
    raise exception 'Compréhension orale introuvable ou non publiée';
  end if;

  return result;
end;
$$;

grant execute on function get_comprehension_orale_pour_eleve(uuid) to anon, authenticated;

-- ─── RPC : soumission — score toujours calculé et renvoyé, mais aucune
-- trace en base pour un visiteur anonyme (auth.uid() is null) ──────────────
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

  -- Visiteur anonyme (auth.uid() is null) : score calculé et renvoyé
  -- normalement, mais aucune ligne insérée nulle part — ni dans
  -- resultats_comprehension_orale (student_id not null, référence
  -- profiles), ni dans le miroir exercise_results. Même choix que
  -- saveExerciseResult() (js/results.js), qui ne tente l'insert que si une
  -- session existe.
  if auth.uid() is not null then
    insert into resultats_comprehension_orale (student_id, comprehension_orale_id, score, total, reponses_donnees)
    values (auth.uid(), p_id, v_bonnes, v_total, p_reponses);

    insert into exercise_results (student_id, exercise_slug, exercise_title, subject, category, exercise_type, level, score, total)
    values (
      auth.uid(), 'comprehension-orale-' || p_id::text, v_titre_episode,
      'français', 'oral', 'comprehension-orale', null, v_bonnes, v_total
    );
  end if;

  select json_build_object(
    'score', v_bonnes,
    'total', v_total,
    'correction', v_correction
  ) into v_result;

  return v_result;
end;
$$;

grant execute on function soumettre_resultat_comprehension_orale(uuid, jsonb) to anon, authenticated;

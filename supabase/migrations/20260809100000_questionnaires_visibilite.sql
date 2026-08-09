-- ═══════════════════════════════════════════════════════════════════════════
-- Visibilité restreinte d'un questionnaire : 'tous' (défaut, comportement
-- actuel inchangé) ou 'mes_eleves' (lecture/passage réservés aux élèves de
-- l'enseignant auteur).
--
-- Lien élève↔enseignant : students.teacher_id (même colonne que
-- is_my_student() dans supabase-schema.sql — pas class_memberships, mort
-- dans ce projet, voir commentaire de cette même fonction). public.is_student_of()
-- ci-dessous en est le miroir exact, dans l'autre sens : is_my_student(s)
-- répond "s est-il mon élève ?" pour un enseignant appelant ; public.is_student_of(t)
-- répond "suis-je l'élève de t ?" pour un élève appelant.
-- ═══════════════════════════════════════════════════════════════════════════

alter table questionnaires
  add column visibilite text not null check (visibilite in ('tous', 'mes_eleves')) default 'tous';

create or replace function is_student_of(p_teacher_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from students
    where auth_user_id = auth.uid() and teacher_id = p_teacher_id
  );
$$;

grant execute on function is_student_of(uuid) to authenticated;

-- ─── RLS : questionnaires_select_published ─────────────────────────────────
-- Remplace la policy de la migration 20260807120000 : même comportement pour
-- visibilite='tous' (défaut), restreint aux élèves de l'auteur sinon. Les
-- policies own/admin (questionnaires_select_own, questionnaires_select_admin)
-- ne changent pas — l'auteur et l'admin voient toujours leurs/tous les
-- questionnaires quel que soit statut/visibilite.
drop policy if exists questionnaires_select_published on questionnaires;

create policy questionnaires_select_published on questionnaires
  for select using (
    statut = 'publie'
    and auth.uid() is not null
    and (
      visibilite = 'tous'
      or author_id = auth.uid()
      or public.is_student_of(author_id)
      or public.my_role() = 'admin'
    )
  );

-- ─── RPC : get_questionnaire_pour_eleve / soumettre_resultat_questionnaire ──
-- SECURITY DEFINER : contournent la RLS de la table questionnaires, donc
-- doivent appliquer elles-mêmes la même règle de visibilité que la policy
-- ci-dessus — sinon la restriction serait purement cosmétique (invisible
-- dans la bibliothèque mais toujours jouable en connaissant l'id).
create or replace function get_questionnaire_pour_eleve(p_questionnaire_id uuid)
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
    'questionnaire', json_build_object(
      'id', q.id,
      'titre_oeuvre', q.titre_oeuvre,
      'auteur_oeuvre', q.auteur_oeuvre,
      'nb_questions', q.nb_questions
    ),
    'questions', coalesce((
      select json_agg(json_build_object(
        'id', qu.id,
        'ordre', qu.ordre,
        'enonce', qu.enonce,
        'reponses', (
          select json_agg(json_build_object('id', r.id, 'texte', r.texte) order by r.id)
          from reponses r where r.question_id = qu.id
        )
      ) order by qu.ordre)
      from questions qu where qu.questionnaire_id = q.id
    ), '[]'::json)
  )
  into result
  from questionnaires q
  where q.id = p_questionnaire_id
    and q.statut = 'publie'
    and auth.uid() is not null
    and (
      q.visibilite = 'tous'
      or q.author_id = auth.uid()
      or public.is_student_of(q.author_id)
      or public.my_role() = 'admin'
    );

  if result is null then
    raise exception 'Questionnaire introuvable ou non publié';
  end if;

  return result;
end;
$$;

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
    from questionnaires q
    where q.id = p_questionnaire_id
      and q.statut = 'publie'
      and (
        q.visibilite = 'tous'
        or q.author_id = auth.uid()
        or public.is_student_of(q.author_id)
        or public.my_role() = 'admin'
      );
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

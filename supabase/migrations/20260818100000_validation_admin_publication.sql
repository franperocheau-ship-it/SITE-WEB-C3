-- ═══════════════════════════════════════════════════════════════════════════
-- Validation admin avant publication publique — Champ lexical + Questionnaires
--
-- Nouvel état pivot 'en_attente' entre 'brouillon' (privé) et 'publie'
-- (désormais réservé aux contenus validés par un admin) :
--   brouillon   → auteur seul
--   en_attente  → auteur + ses propres élèves (déjà visible), pas encore
--                 dans la bibliothèque/banque publique des autres enseignants
--   publie      → validé par un admin, visible de tous
-- Contenu déjà 'publie' avant cette migration : reste 'publie' tel quel,
-- aucune donnée existante n'est modifiée.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Colonnes ──────────────────────────────────────────────────────────

-- corpus_lexicaux : contrairement à champs_lexicaux (le contenu pédagogique
-- réel), un corpus n'est qu'une étiquette de regroupement, jamais éditée
-- explicitement (aucune UI ne pose son statut — createCorpus() ne le
-- fournit pas, il vit entièrement du DEFAULT de la colonne) et souvent
-- partagée entre plusieurs enseignants via le sélecteur de corpus. On élargit
-- le CHECK par cohérence de schéma mais on NE CHANGE PAS le default
-- ('publie' reste 'publie') : le passer à 'brouillon' rendrait tout nouveau
-- corpus invisible en catalogue sans aucun moyen de le publier depuis
-- l'interface. La validation admin porte donc sur le champ lexical
-- (le contenu), pas sur le corpus (le rangement).
alter table corpus_lexicaux drop constraint if exists corpus_lexicaux_statut_check;
alter table corpus_lexicaux add constraint corpus_lexicaux_statut_check
  check (statut in ('brouillon', 'en_attente', 'publie', 'masque'));
alter table corpus_lexicaux add column if not exists motif_refus text;

alter table champs_lexicaux drop constraint if exists champs_lexicaux_statut_check;
alter table champs_lexicaux add constraint champs_lexicaux_statut_check
  check (statut in ('brouillon', 'en_attente', 'publie', 'masque'));
alter table champs_lexicaux alter column statut set default 'brouillon';
alter table champs_lexicaux add column if not exists motif_refus text;

alter table questionnaires drop constraint if exists questionnaires_statut_check;
alter table questionnaires add constraint questionnaires_statut_check
  check (statut in ('brouillon', 'en_attente', 'publie', 'masque'));
alter table questionnaires add column if not exists motif_refus text;

-- ── 2a. RLS — Champ lexical ──────────────────────────────────────────────

-- Un champ en attente est visible par les propres élèves de son auteur
-- (is_student_of() déjà créée pour Questionnaires, générique). Pas
-- d'équivalent sur corpus_lexicaux : son statut reste toujours 'publie'
-- en pratique (voir commentaire plus haut), donc rien ne matcherait jamais
-- une telle policy.
create policy champs_lexicaux_select_pending_own_students on champs_lexicaux
  for select using (statut = 'en_attente' and public.is_student_of(author_id));

-- L'admin peut désormais modérer (valider/refuser) un contenu en attente,
-- en plus de son droit déjà existant sur le contenu publié — jamais sur un
-- brouillon privé.
drop policy if exists champs_lexicaux_update_own_or_admin on champs_lexicaux;
create policy champs_lexicaux_update_own_or_admin on champs_lexicaux
  for update
  using (author_id = auth.uid() or (my_role() = 'admin' and statut in ('publie', 'en_attente')))
  with check (author_id = auth.uid() or my_role() = 'admin');

drop policy if exists champs_lexicaux_delete_own_or_admin on champs_lexicaux;
create policy champs_lexicaux_delete_own_or_admin on champs_lexicaux
  for delete
  using (author_id = auth.uid() or (my_role() = 'admin' and statut in ('publie', 'en_attente')));

-- corpus_lexicaux : alignement sur champs_lexicaux (incohérence historique
-- corrigée — l'admin n'avait aucune restriction de statut ici).
drop policy if exists corpus_lexicaux_update_own_or_admin on corpus_lexicaux;
create policy corpus_lexicaux_update_own_or_admin on corpus_lexicaux
  for update
  using (author_id = auth.uid() or (my_role() = 'admin' and statut in ('publie', 'en_attente')))
  with check (author_id = auth.uid() or my_role() = 'admin');

drop policy if exists corpus_lexicaux_delete_own_or_admin on corpus_lexicaux;
create policy corpus_lexicaux_delete_own_or_admin on corpus_lexicaux
  for delete
  using (author_id = auth.uid() or (my_role() = 'admin' and statut in ('publie', 'en_attente')));

-- champ_lexical_mots : même resserrement du volet admin sur les 3 policies
-- d'écriture (select_teacher reste inchangée, admin y a déjà accès inconditionnel).
drop policy if exists champ_lexical_mots_insert_via_parent on champ_lexical_mots;
create policy champ_lexical_mots_insert_via_parent on champ_lexical_mots
  for insert
  with check (exists (
    select 1 from champs_lexicaux c
    where c.id = champ_lexical_mots.champ_id
      and (c.author_id = auth.uid() or (my_role() = 'admin' and c.statut in ('publie', 'en_attente')))
  ));

drop policy if exists champ_lexical_mots_update_via_parent on champ_lexical_mots;
create policy champ_lexical_mots_update_via_parent on champ_lexical_mots
  for update
  using (exists (
    select 1 from champs_lexicaux c
    where c.id = champ_lexical_mots.champ_id
      and (c.author_id = auth.uid() or (my_role() = 'admin' and c.statut in ('publie', 'en_attente')))
  ))
  with check (exists (
    select 1 from champs_lexicaux c
    where c.id = champ_lexical_mots.champ_id
      and (c.author_id = auth.uid() or (my_role() = 'admin' and c.statut in ('publie', 'en_attente')))
  ));

drop policy if exists champ_lexical_mots_delete_via_parent on champ_lexical_mots;
create policy champ_lexical_mots_delete_via_parent on champ_lexical_mots
  for delete
  using (exists (
    select 1 from champs_lexicaux c
    where c.id = champ_lexical_mots.champ_id
      and (c.author_id = auth.uid() or (my_role() = 'admin' and c.statut in ('publie', 'en_attente')))
  ));

-- ── 2b. RLS — Questionnaires ─────────────────────────────────────────────

drop policy if exists questionnaires_select_published on questionnaires;
create policy questionnaires_select_published on questionnaires
  for select using (
    (statut = 'publie' and auth.uid() is not null
      and (visibilite = 'tous' or author_id = auth.uid() or is_student_of(author_id) or my_role() = 'admin'))
    or
    (statut = 'en_attente'
      and (author_id = auth.uid() or is_student_of(author_id) or my_role() = 'admin'))
  );

drop policy if exists questionnaires_update_own_or_admin on questionnaires;
create policy questionnaires_update_own_or_admin on questionnaires
  for update
  using (author_id = auth.uid() or (my_role() = 'admin' and statut in ('publie', 'en_attente')))
  with check (author_id = auth.uid() or my_role() = 'admin');

-- Faille trouvée pendant l'audit : ces deux policies donnaient accès aux
-- questions/bonnes réponses d'un questionnaire publié à N'IMPORTE QUEL
-- enseignant, sans tenir compte de visibilite='mes_eleves' — un
-- questionnaire validé mais volontairement restreint fuitait donc vers des
-- tiers. Resserré ici : le volet "enseignant tiers" exige désormais
-- visibilite='tous'. ('en_attente' ne matchait déjà pas 'publie', donc
-- reste exclu de ce volet — c'est le but recherché.)
drop policy if exists questions_select_via_parent on questions;
create policy questions_select_via_parent on questions
  for select using (exists (
    select 1 from questionnaires q
    where q.id = questions.questionnaire_id
      and (q.author_id = auth.uid() or my_role() = 'admin'
        or (q.statut = 'publie' and q.visibilite = 'tous' and my_role() = 'enseignant'))
  ));

drop policy if exists reponses_select_via_parent on reponses;
create policy reponses_select_via_parent on reponses
  for select using (exists (
    select 1 from questions qu join questionnaires q on q.id = qu.questionnaire_id
    where qu.id = reponses.question_id
      and (q.author_id = auth.uid() or my_role() = 'admin'
        or (q.statut = 'publie' and q.visibilite = 'tous' and my_role() = 'enseignant'))
  ));

-- ── 3. RPC ────────────────────────────────────────────────────────────────

create or replace function public.get_questionnaire_pour_eleve(p_questionnaire_id uuid)
returns json
language plpgsql
stable security definer
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
    and (
      (q.statut = 'publie' and auth.uid() is not null
        and (q.visibilite = 'tous' or q.author_id = auth.uid() or public.is_student_of(q.author_id) or public.my_role() = 'admin'))
      or
      (q.statut = 'en_attente'
        and (q.author_id = auth.uid() or public.is_student_of(q.author_id) or public.my_role() = 'admin'))
    );
  if result is null then
    raise exception 'Questionnaire introuvable ou non publié';
  end if;
  return result;
end;
$$;

create or replace function public.soumettre_resultat_questionnaire(p_questionnaire_id uuid, p_reponses jsonb)
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
      and (
        (q.statut = 'publie'
          and (q.visibilite = 'tous' or q.author_id = auth.uid() or public.is_student_of(q.author_id) or public.my_role() = 'admin'))
        or
        (q.statut = 'en_attente'
          and (q.author_id = auth.uid() or public.is_student_of(q.author_id) or public.my_role() = 'admin'))
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

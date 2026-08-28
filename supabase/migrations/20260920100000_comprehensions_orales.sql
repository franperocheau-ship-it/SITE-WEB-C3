-- ═══════════════════════════════════════════════════════════════════════════
-- Module Oral — Compréhension orale (podcast "Les Odyssées", France Inter)
-- Tables : comprehensions_orales, comprehension_orale_questions,
--          resultats_comprehension_orale
--
-- Contrairement aux questionnaires de lecture (bibliothèque partagée,
-- créée par n'importe quel enseignant, workflow brouillon/en_attente/
-- publié/masqué), une compréhension orale n'a qu'un seul type de créateur :
-- l'administrateur. Pas de signalements, pas de votes, pas de copie —
-- d'où des policies RLS bien plus simples (my_role() = 'admin' partout en
-- écriture, pas de logique "own or admin").
--
-- Autre différence structurelle : pas de table `reponses` séparée comme
-- pour `questions`/`reponses`. Les propositions et les bonnes réponses
-- vivent directement sur la ligne de `comprehension_orale_questions`, en
-- jsonb (`propositions`: array de strings, `bonnes_reponses`: array
-- d'index entiers 0-based dans `propositions`). Conséquence RLS
-- importante : impossible de "cacher juste une colonne" sur cette table
-- comme le fait implicitement questions/reponses (colonnes séparées) — il
-- ne doit donc exister AUCUNE policy select pour un rôle élève/enseignant
-- sur comprehension_orale_questions ; le contenu jouable ne transite que
-- par la RPC get_comprehension_orale_pour_eleve ci-dessous.
-- ═══════════════════════════════════════════════════════════════════════════

create table comprehensions_orales (
  id                       uuid primary key default gen_random_uuid(),
  titre_episode            text not null,
  id_episode_france_inter  text not null,
  description              text,
  created_by               uuid references profiles(id) on delete set null,
  created_at               timestamptz not null default now(),
  statut                   text not null check (statut in ('brouillon', 'publie')) default 'brouillon'
);

create table comprehension_orale_questions (
  id                       uuid primary key default gen_random_uuid(),
  comprehension_orale_id   uuid not null references comprehensions_orales(id) on delete cascade,
  ordre                    int not null,
  enonce                   text not null,
  propositions             jsonb not null,
  bonnes_reponses          jsonb not null,
  explication              text,
  unique (comprehension_orale_id, ordre),
  constraint comprehension_orale_questions_max_4_propositions
    check (jsonb_array_length(propositions) <= 4)
);

-- Immutable : un enregistrement par passage terminé (même patron que
-- resultats_questionnaires / exercise_results).
create table resultats_comprehension_orale (
  id                       uuid primary key default gen_random_uuid(),
  student_id               uuid not null references profiles(id) on delete cascade,
  comprehension_orale_id   uuid not null references comprehensions_orales(id) on delete cascade,
  score                    int not null,
  total                    int not null,
  date_passage             timestamptz not null default now()
);

create index comprehensions_orales_statut_idx        on comprehensions_orales (statut);
create index comprehension_orale_questions_parent_idx on comprehension_orale_questions (comprehension_orale_id);
create index resultats_co_student_idx                on resultats_comprehension_orale (student_id);
create index resultats_co_comprehension_orale_idx    on resultats_comprehension_orale (comprehension_orale_id);

alter table comprehensions_orales           enable row level security;
alter table comprehension_orale_questions   enable row level security;
alter table resultats_comprehension_orale   enable row level security;

-- ─── Politiques : comprehensions_orales ────────────────────────────────────
create policy comprehensions_orales_select_published on comprehensions_orales
  for select using (statut = 'publie' and auth.uid() is not null);

create policy comprehensions_orales_select_admin on comprehensions_orales
  for select using (public.my_role() = 'admin');

create policy comprehensions_orales_insert_admin on comprehensions_orales
  for insert with check (public.my_role() = 'admin');

create policy comprehensions_orales_update_admin on comprehensions_orales
  for update using (public.my_role() = 'admin') with check (public.my_role() = 'admin');

create policy comprehensions_orales_delete_admin on comprehensions_orales
  for delete using (public.my_role() = 'admin');

-- ─── Politiques : comprehension_orale_questions ────────────────────────────
-- Aucune policy select pour élève/enseignant, volontairement — voir
-- commentaire d'en-tête. Seul l'admin peut lire/écrire cette table
-- directement ; le passage élève passe exclusivement par la RPC plus bas.
create policy comprehension_orale_questions_select_admin on comprehension_orale_questions
  for select using (public.my_role() = 'admin');

create policy comprehension_orale_questions_insert_admin on comprehension_orale_questions
  for insert with check (public.my_role() = 'admin');

create policy comprehension_orale_questions_update_admin on comprehension_orale_questions
  for update using (public.my_role() = 'admin') with check (public.my_role() = 'admin');

create policy comprehension_orale_questions_delete_admin on comprehension_orale_questions
  for delete using (public.my_role() = 'admin');

-- ─── Politiques : resultats_comprehension_orale ────────────────────────────
-- Même patron que resultats_questionnaires.
create policy resultats_co_insert_own on resultats_comprehension_orale
  for insert with check (student_id = auth.uid());

create policy resultats_co_select_own on resultats_comprehension_orale
  for select using (student_id = auth.uid());

create policy resultats_co_select_teacher on resultats_comprehension_orale
  for select using (public.is_my_student(student_id));

create policy resultats_co_select_admin on resultats_comprehension_orale
  for select using (public.my_role() = 'admin');

-- Pas d'update/delete : journal immuable (bloqué par défaut).

-- ═══════════════════════════════════════════════════════════════════════════
--  RPC — Passage élève
--
--  Aucune policy SELECT élève sur comprehension_orale_questions (voir plus
--  haut) : tout le parcours de passage passe par ces deux fonctions
--  SECURITY DEFINER, qui ne renvoient jamais bonnes_reponses/explication
--  avant correction, et qui calculent le score côté serveur.
-- ═══════════════════════════════════════════════════════════════════════════

-- Contenu jouable d'une compréhension orale publiée : questions +
-- propositions, sans indication de la ou des bonne(s) réponse(s).
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

grant execute on function get_comprehension_orale_pour_eleve(uuid) to authenticated;

-- Corrige et enregistre un passage. p_reponses : tableau JSON
-- [{ "question_id": "...", "reponse_indices": [0, 2] }] — une question est
-- comptée bonne si l'ensemble des index cochés par l'élève est exactement
-- l'ensemble des index de bonnes_reponses (gère nativement le cas à
-- réponses multiples, même logique que soumettre_resultat_questionnaire
-- mais avec des entiers plutôt que des uuid). Miroir dans exercise_results
-- (slug par instance 'comprehension-orale-<id>', même convention que
-- 'questionnaire-lecture-<id>' — voir 20260807160000_questionnaires_per_
-- instance_slug.sql) : c'est ce miroir qui alimente gratuitement tous les
-- tableaux de bord existants (dashboard élève, fiche élève, PDF) via
-- STANDALONE_META (js/teacher-analytics.js), sans dupliquer de logique
-- d'agrégation.
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
  v_given_indices int[];
  v_correct_indices int[];
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
    select array(select jsonb_array_elements_text(v_item->'reponse_indices'))::int[]
      into v_given_indices;

    select array(select jsonb_array_elements_text(bonnes_reponses))::int[]
      into v_correct_indices
      from comprehension_orale_questions where id = v_question_id;

    v_correct_for_q := (
      coalesce(array_length(v_given_indices, 1), 0) = coalesce(array_length(v_correct_indices, 1), 0)
      and v_given_indices <@ v_correct_indices
      and v_correct_indices <@ v_given_indices
    );

    if v_correct_for_q then v_bonnes := v_bonnes + 1; end if;
  end loop;

  select json_agg(json_build_object(
    'question_id', q.id,
    'enonce', q.enonce,
    'explication', q.explication,
    'bonnes_reponses', (
      select json_agg(q.propositions -> idx.value::int)
      from jsonb_array_elements_text(q.bonnes_reponses) idx
    ),
    'toutes_propositions', (
      select json_agg(json_build_object(
        'texte', prop.value,
        'est_correcte', (q.bonnes_reponses @> to_jsonb(prop.ordinality - 1))
      ))
      from jsonb_array_elements_text(q.propositions) with ordinality as prop(value, ordinality)
    )
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

grant execute on function soumettre_resultat_comprehension_orale(uuid, jsonb) to authenticated;

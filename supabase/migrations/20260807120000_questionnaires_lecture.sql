-- ═══════════════════════════════════════════════════════════════════════════
-- Module Lecture — Questionnaires de lecture (Phase 1)
-- Tables : questionnaires, questions, reponses, resultats_questionnaires,
--          signalements, votes
--
-- Contrairement aux dictées (class_id, propriété d'une seule classe), un
-- questionnaire appartient à son auteur (author_id) mais, une fois publié,
-- devient visible et jouable par tous les enseignants et élèves authentifiés
-- (bibliothèque partagée) — cf. §RLS ci-dessous pour le détail de ce choix.
-- ═══════════════════════════════════════════════════════════════════════════

create table questionnaires (
  id           uuid primary key default gen_random_uuid(),
  author_id    uuid not null references profiles(id) on delete cascade,
  copied_from  uuid references questionnaires(id) on delete set null,
  titre_oeuvre text not null,
  auteur_oeuvre text,
  nb_questions int not null default 0,
  statut       text not null check (statut in ('brouillon', 'publie', 'masque')) default 'brouillon',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz default now()
);

create table questions (
  id                uuid primary key default gen_random_uuid(),
  questionnaire_id  uuid not null references questionnaires(id) on delete cascade,
  enonce            text not null,
  ordre             int not null,
  explication       text,
  unique (questionnaire_id, ordre)
);

create table reponses (
  id            uuid primary key default gen_random_uuid(),
  question_id   uuid not null references questions(id) on delete cascade,
  texte         text not null,
  est_correcte  boolean not null default false
);

-- Immutable : un enregistrement par passage terminé (même patron que
-- exercise_results / dictee_results).
create table resultats_questionnaires (
  id                uuid primary key default gen_random_uuid(),
  student_id        uuid not null references profiles(id) on delete cascade,
  questionnaire_id  uuid not null references questionnaires(id) on delete cascade,
  score_pct         numeric(5,2) not null,
  bonnes_reponses   int not null,
  total             int not null,
  reponses_donnees  jsonb,
  date_passage      timestamptz not null default now()
);

-- unique(questionnaire_id, reported_by) : sans cette contrainte, un seul
-- enseignant pourrait à lui seul déclencher le masquage automatique (seuil
-- de 3, voir trigger plus bas) en insérant plusieurs signalements.
create table signalements (
  id                uuid primary key default gen_random_uuid(),
  questionnaire_id  uuid not null references questionnaires(id) on delete cascade,
  reported_by       uuid not null references profiles(id) on delete cascade,
  motif             text not null check (motif in ('erreur_reponse', 'orthographe', 'ambigu', 'autre')),
  created_at        timestamptz not null default now(),
  unique (questionnaire_id, reported_by)
);

create table votes (
  id                uuid primary key default gen_random_uuid(),
  questionnaire_id  uuid not null references questionnaires(id) on delete cascade,
  voter_id          uuid not null references profiles(id) on delete cascade,
  valeur            int not null check (valeur in (1, -1)),
  unique (questionnaire_id, voter_id)
);

create index questionnaires_author_idx        on questionnaires (author_id);
create index questionnaires_statut_idx        on questionnaires (statut);
create index questions_questionnaire_idx      on questions (questionnaire_id);
create index reponses_question_idx            on reponses (question_id);
create index resultats_q_student_idx          on resultats_questionnaires (student_id);
create index resultats_q_questionnaire_idx    on resultats_questionnaires (questionnaire_id);
create index signalements_questionnaire_idx   on signalements (questionnaire_id);
create index votes_questionnaire_idx          on votes (questionnaire_id);

alter table questionnaires             enable row level security;
alter table questions                  enable row level security;
alter table reponses                   enable row level security;
alter table resultats_questionnaires   enable row level security;
alter table signalements               enable row level security;
alter table votes                      enable row level security;

-- ── updated_at automatique sur questionnaires ──────────────────────────────
create or replace function questionnaires_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger questionnaires_touch_updated_at
  before update on questionnaires
  for each row execute function questionnaires_set_updated_at();

-- ── nb_questions maintenu automatiquement (recompte à chaque insert/delete
--    de question, plutôt que confié au client — évite toute désynchronisation
--    si le formulaire enseignant est interrompu en cours de saisie) ─────────
create or replace function questionnaires_recount_questions()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id uuid := coalesce(new.questionnaire_id, old.questionnaire_id);
begin
  update questionnaires
     set nb_questions = (select count(*) from questions where questionnaire_id = target_id)
   where id = target_id;
  return null;
end;
$$;

create trigger questions_recount_after_change
  after insert or delete on questions
  for each row execute function questionnaires_recount_questions();

-- ── Masquage automatique après 3 signalements ou plus ──────────────────────
-- SECURITY DEFINER : l'enseignant qui signale n'est presque jamais l'auteur
-- du questionnaire, donc pas autorisé par la policy d'update "own or admin"
-- ci-dessous — le trigger doit s'exécuter avec les droits du propriétaire de
-- la fonction (même pattern que my_role()/is_my_student() dans
-- supabase-schema.sql) pour pouvoir appliquer le masquage malgré la RLS.
create or replace function questionnaires_check_signalements()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from signalements where questionnaire_id = new.questionnaire_id) >= 3 then
    update questionnaires set statut = 'masque' where id = new.questionnaire_id and statut <> 'masque';
  end if;
  return new;
end;
$$;

create trigger signalements_auto_mask
  after insert on signalements
  for each row execute function questionnaires_check_signalements();

-- ─── Politiques : questionnaires ─────────────────────────────────────────
-- Lecture élargie à tout utilisateur authentifié (enseignant ou élève) pour
-- les questionnaires publiés : un élève doit pouvoir parcourir/lancer un
-- questionnaire publié par n'importe quel enseignant, pas seulement le sien
-- (bibliothèque partagée, cf. commentaire d'en-tête). Les questions/réponses
-- avec la bonne réponse, elles, ne sont jamais exposées par une lecture
-- directe de table (voir plus bas + fonctions RPC get_questionnaire_pour_eleve
-- / soumettre_resultat_questionnaire) : seule cette table de métadonnées
-- (titre, auteur, nb_questions, statut) est lisible largement.
create policy questionnaires_select_published on questionnaires
  for select using (statut = 'publie' and auth.uid() is not null);

-- Couvre l'auteur quel que soit le statut (brouillon, publié ou masqué) —
-- pas seulement les brouillons, malgré le nom historique évoqué plus haut.
create policy questionnaires_select_own on questionnaires
  for select using (author_id = auth.uid());

create policy questionnaires_select_admin on questionnaires
  for select using (public.my_role() = 'admin');

create policy questionnaires_insert_teacher on questionnaires
  for insert with check (author_id = auth.uid() and public.my_role() = 'enseignant');

create policy questionnaires_update_own_or_admin on questionnaires
  for update using (author_id = auth.uid() or public.my_role() = 'admin')
  with check (author_id = auth.uid() or public.my_role() = 'admin');

create policy questionnaires_delete_own_or_admin on questionnaires
  for delete using (author_id = auth.uid() or public.my_role() = 'admin');

-- ─── Politiques : questions / reponses ────────────────────────────────────
-- « Héritent des droits du questionnaire parent » — au sens gestion : lisibles
-- par qui peut déjà lire le questionnaire via une des policies ci-dessus
-- (auteur, admin, ou n'importe quel enseignant si publié — utile pour
-- prévisualiser avant de voter/signaler/copier). Un élève n'obtient PAS accès
-- à ces deux tables par cette policy (elle ne couvre que le rôle enseignant
-- pour le cas "publié" — un élève n'a que ses policies own-draft/admin, qui
-- ne le concernent jamais) : le passage élève lit les questions via la
-- fonction RPC get_questionnaire_pour_eleve(), qui ne renvoie jamais
-- reponses.est_correcte ni questions.explication avant correction.
create policy questions_select_via_parent on questions
  for select using (
    exists (
      select 1 from questionnaires q
      where q.id = questions.questionnaire_id
        and (
          q.author_id = auth.uid()
          or public.my_role() = 'admin'
          or (q.statut = 'publie' and public.my_role() = 'enseignant')
        )
    )
  );

create policy questions_insert_via_parent on questions
  for insert with check (
    exists (
      select 1 from questionnaires q
      where q.id = questions.questionnaire_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  );

create policy questions_update_via_parent on questions
  for update using (
    exists (
      select 1 from questionnaires q
      where q.id = questions.questionnaire_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  ) with check (
    exists (
      select 1 from questionnaires q
      where q.id = questions.questionnaire_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  );

create policy questions_delete_via_parent on questions
  for delete using (
    exists (
      select 1 from questionnaires q
      where q.id = questions.questionnaire_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  );

create policy reponses_select_via_parent on reponses
  for select using (
    exists (
      select 1 from questions qu
      join questionnaires q on q.id = qu.questionnaire_id
      where qu.id = reponses.question_id
        and (
          q.author_id = auth.uid()
          or public.my_role() = 'admin'
          or (q.statut = 'publie' and public.my_role() = 'enseignant')
        )
    )
  );

create policy reponses_insert_via_parent on reponses
  for insert with check (
    exists (
      select 1 from questions qu
      join questionnaires q on q.id = qu.questionnaire_id
      where qu.id = reponses.question_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  );

create policy reponses_update_via_parent on reponses
  for update using (
    exists (
      select 1 from questions qu
      join questionnaires q on q.id = qu.questionnaire_id
      where qu.id = reponses.question_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  ) with check (
    exists (
      select 1 from questions qu
      join questionnaires q on q.id = qu.questionnaire_id
      where qu.id = reponses.question_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  );

create policy reponses_delete_via_parent on reponses
  for delete using (
    exists (
      select 1 from questions qu
      join questionnaires q on q.id = qu.questionnaire_id
      where qu.id = reponses.question_id
        and (q.author_id = auth.uid() or public.my_role() = 'admin')
    )
  );

-- ─── Politiques : resultats_questionnaires ─────────────────────────────────
-- Même patron que exercise_results / dictee_results.
create policy resultats_q_insert_own on resultats_questionnaires
  for insert with check (student_id = auth.uid());

create policy resultats_q_select_own on resultats_questionnaires
  for select using (student_id = auth.uid());

create policy resultats_q_select_teacher on resultats_questionnaires
  for select using (public.is_my_student(student_id));

create policy resultats_q_select_admin on resultats_questionnaires
  for select using (public.my_role() = 'admin');

-- Pas d'update/delete : journal immuable (bloqué par défaut).

-- ─── Politiques : signalements ─────────────────────────────────────────────
create policy signalements_insert_teacher on signalements
  for insert with check (reported_by = auth.uid() and public.my_role() = 'enseignant');

-- Lecture réservée admin, sauf pour son propre signalement (nécessaire pour
-- que l'interface puisse désactiver le bouton « Signaler » déjà utilisé par
-- l'enseignant courant, sans lui donner accès aux signalements des autres).
create policy signalements_select_own on signalements
  for select using (reported_by = auth.uid());

create policy signalements_select_admin on signalements
  for select using (public.my_role() = 'admin');

-- ─── Politiques : votes ─────────────────────────────────────────────────────
create policy votes_insert_teacher on votes
  for insert with check (voter_id = auth.uid() and public.my_role() = 'enseignant');

-- Même exception que pour signalements : un enseignant doit pouvoir relire
-- (et changer) son propre vote, sans lecture des votes des autres.
create policy votes_select_own on votes
  for select using (voter_id = auth.uid());

create policy votes_select_admin on votes
  for select using (public.my_role() = 'admin');

create policy votes_update_own on votes
  for update using (voter_id = auth.uid()) with check (voter_id = auth.uid());

create policy votes_delete_own on votes
  for delete using (voter_id = auth.uid());

-- ═══════════════════════════════════════════════════════════════════════════
--  RPC — Passage élève
--
--  Un élève n'a aucune policy SELECT directe sur questions/reponses (voir
--  plus haut) : tout le parcours de passage passe par ces deux fonctions
--  SECURITY DEFINER, qui ne renvoient jamais reponses.est_correcte ni
--  questions.explication avant la correction, et qui calculent le score
--  côté serveur (jamais fait confiance à un score envoyé par le client).
-- ═══════════════════════════════════════════════════════════════════════════

-- Contenu jouable d'un questionnaire publié : questions + propositions de
-- réponse, sans indication de la bonne réponse. Accessible à tout
-- utilisateur authentifié (élève ou enseignant en prévisualisation).
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
    and auth.uid() is not null;

  if result is null then
    raise exception 'Questionnaire introuvable ou non publié';
  end if;

  return result;
end;
$$;

grant execute on function get_questionnaire_pour_eleve(uuid) to authenticated;

-- Corrige et enregistre un passage. p_reponses : tableau JSON
-- [{ "question_id": "...", "reponse_ids": ["...", "..."] }] — une question
-- est comptée bonne si l'ensemble des réponses cochées par l'élève est
-- exactement l'ensemble des réponses est_correcte=true de la question (gère
-- nativement le cas à réponses multiples). Renvoie le score et le détail de
-- correction (bonne(s) réponse(s) + explication) pour l'écran de révision.
create or replace function soumettre_resultat_questionnaire(p_questionnaire_id uuid, p_reponses jsonb)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
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
  if not exists (select 1 from questionnaires where id = p_questionnaire_id and statut = 'publie') then
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

  select json_build_object(
    'score_pct', round((v_bonnes::numeric / v_total) * 100, 2),
    'bonnes_reponses', v_bonnes,
    'total', v_total,
    'correction', v_correction
  ) into v_result;

  return v_result;
end;
$$;

grant execute on function soumettre_resultat_questionnaire(uuid, jsonb) to authenticated;

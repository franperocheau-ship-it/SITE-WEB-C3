-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical (Phase 1)
-- Tables : corpus_lexicaux, champs_lexicaux, champ_lexical_mots,
--          champ_lexical_sessions, champ_lexical_mots_trouves,
--          champ_lexical_reviews, carnet_mots
--
-- Contrairement aux autres modules (joggings, dictées, questionnaires), la
-- base de mots (champ_lexical_mots) EST la réponse que l'élève doit deviner :
-- aucune policy select élève ne lui est donnée (RLS activée, aucune policy =
-- deny par défaut). Toute validation/révélation côté élève passe par les 4
-- fonctions SECURITY DEFINER en bas de fichier, même patron que
-- get_questionnaire_pour_eleve / soumettre_resultat_questionnaire.
--
-- Phase 1 : les 2 corpus / 3 champs d'amorçage sont seedés directement par
-- cette migration (author_id = un compte admin/enseignant existant), sans
-- formulaire de création. Les colonnes author_id/copied_from/statut
-- (gabarit questionnaires) sont déjà présentes pour ne pas bloquer la
-- Phase 2 (partage, fork), mais aucune UI Phase 2 n'existe encore.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Normalisation, identique bit à bit au normalize() client de
--    français-lexique.html (NFD + suppression diacritiques + minuscule),
--    avec en plus un compactage des espaces côté serveur. ────────────────────
create or replace function public.cl_normalize(p_text text)
returns text
language sql
immutable
as $$
  select lower(regexp_replace(regexp_replace(normalize(trim(p_text), nfd), '[̀-ͯ]', '', 'g'), '\s+', ' ', 'g'));
$$;

-- ── Palier (1/2/3) et barème associés à chaque catégorie de mots. ──────────
create or replace function public.cl_categorie_niveau(p_categorie text)
returns smallint
language sql
immutable
as $$
  select case p_categorie
    when 'synonyme'    then 1
    when 'antonyme'    then 1
    when 'adjectif'    then 1
    when 'derive'      then 2
    when 'expression'  then 2
    when 'soutenu'     then 3
    when 'familier'    then 3
    when 'sens_figure' then 3
    else 99
  end;
$$;

create or replace function public.cl_points_for_categorie(p_categorie text)
returns int
language sql
immutable
as $$
  select case p_categorie
    when 'synonyme'    then 10
    when 'antonyme'    then 10
    when 'adjectif'    then 10
    when 'derive'      then 15
    when 'expression'  then 15
    when 'soutenu'     then 20
    when 'familier'    then 20
    when 'sens_figure' then 20
    else 0
  end;
$$;

-- ── Tables ───────────────────────────────────────────────────────────────

create table corpus_lexicaux (
  id           uuid primary key default gen_random_uuid(),
  author_id    uuid not null references profiles(id) on delete cascade,
  copied_from  uuid references corpus_lexicaux(id) on delete set null, -- fork Phase 2, inutilisé Phase 1
  titre        text not null,
  slug         text unique not null,
  description  text,
  statut       text not null check (statut in ('brouillon', 'publie', 'masque')) default 'publie',
  ordre        int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz default now()
);

create table champs_lexicaux (
  id                 uuid primary key default gen_random_uuid(),
  corpus_id          uuid not null references corpus_lexicaux(id) on delete cascade,
  author_id          uuid not null references profiles(id) on delete cascade,
  copied_from        uuid references champs_lexicaux(id) on delete set null,
  theme              text not null,
  slug               text unique not null,
  contextualisation  text, -- optionnel dans le principe, mais renseigné pour les 3 champs d'amorçage
  statut             text not null check (statut in ('brouillon', 'publie', 'masque')) default 'publie',
  ordre              int not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz default now()
);

-- Lignes normalisées plutôt que du JSONB : le formulaire enseignant Phase 2
-- est un formulaire par blocs (une catégorie = une liste), donc produit des
-- lignes ; expressions/sens_figure ont besoin d'une phrase d'exemple
-- optionnelle par mot, qu'une seule colonne nullable gère uniformément pour
-- les 8 catégories (vide pour synonyme/antonyme/adjectif/derive/soutenu/familier).
create table champ_lexical_mots (
  id             uuid primary key default gen_random_uuid(),
  champ_id       uuid not null references champs_lexicaux(id) on delete cascade,
  categorie      text not null check (categorie in
                   ('synonyme', 'antonyme', 'adjectif', 'derive', 'expression', 'soutenu', 'familier', 'sens_figure')),
  mot            text not null,
  mot_normalise  text generated always as (public.cl_normalize(mot)) stored,
  exemple_phrase text, -- utile seulement pour 'expression' et 'sens_figure'
  ordre          int not null default 0,
  unique (champ_id, categorie, mot_normalise)
);

-- Une ligne par (élève, champ) — pas une par tentative comme jogging_versions :
-- "pas de limite de tentatives" = pas de limite de mots saisis DANS une
-- session ouverte, pas une rejouabilité infinie du même champ en mode normal
-- (le mode rappel, lui, est illimité — voir champ_lexical_reviews).
create table champ_lexical_sessions (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid not null references profiles(id) on delete cascade,
  champ_id        uuid not null references champs_lexicaux(id) on delete cascade,
  niveau          smallint not null check (niveau between 1 and 3), -- choisi une fois, au démarrage
  status          text not null default 'en_cours' check (status in ('en_cours', 'termine')),
  total_points    int not null default 0,
  started_at      timestamptz not null default now(),
  completed_at    timestamptz,
  next_review_at  timestamptz,
  review_count    smallint not null default 0,
  unique (student_id, champ_id)
);

-- Journal par mot trouvé, écrit uniquement par valider_mot_champ_lexical()
-- (aucune policy insert élève sur cette table). Alimente aussi le carnet.
create table champ_lexical_mots_trouves (
  session_id      uuid not null references champ_lexical_sessions(id) on delete cascade,
  mot_id          uuid not null references champ_lexical_mots(id) on delete cascade,
  categorie       text not null, -- dénormalisé, évite une jointure pour le regroupement par catégorie
  submitted_text  text not null, -- texte brut tapé par l'élève, pour audit enseignant
  points_gagnes   int not null,
  found_at        timestamptz not null default now(),
  primary key (session_id, mot_id)
);

-- Événements de réactivation espacée. Le texte des mots n'est jamais stocké
-- dans prompts (seulement mot_id + categorie) : le client ne le reçoit qu'à
-- la correction, via terminer_revision_champ_lexical().
create table champ_lexical_reviews (
  id            uuid primary key default gen_random_uuid(),
  session_id    uuid not null references champ_lexical_sessions(id) on delete cascade,
  started_at    timestamptz not null default now(),
  completed_at  timestamptz,
  prompts       jsonb not null, -- [{mot_id, categorie}], tiré aléatoirement au démarrage
  resultats     jsonb,          -- rempli à la fin : [{categorie, mot, trouve}]
  mots_trouves  int,
  mots_total    int
);

-- Carnet de mots personnel. Grain différent de jogging_carnet (mot vs session
-- complète) : pas de fusion en table polymorphe (casserait l'idiome RLS
-- exists(...) plat utilisé partout sur ce site) — voir js/carnet-widget.js
-- côté client pour la mutualisation de la logique d'ajout/retrait/liste.
-- mot/categorie dénormalisés (comme submitted_text/categorie sur
-- champ_lexical_mots_trouves) : champ_lexical_mots n'a aucune policy select
-- élève (§0), donc un simple join depuis carnet_mots ne renverrait jamais le
-- texte du mot pour l'élève propriétaire — il doit être fourni à l'insert.
create table carnet_mots (
  student_id  uuid not null references profiles(id) on delete cascade,
  mot_id      uuid not null references champ_lexical_mots(id) on delete cascade,
  champ_id    uuid not null references champs_lexicaux(id) on delete cascade,
  mot         text not null,
  categorie   text not null,
  added_at    timestamptz not null default now(),
  primary key (student_id, mot_id)
);

-- ── Index ────────────────────────────────────────────────────────────────
create index champs_lexicaux_corpus_idx   on champs_lexicaux (corpus_id);
create index champ_lexical_mots_champ_idx on champ_lexical_mots (champ_id, categorie);
create index cl_sessions_student_idx      on champ_lexical_sessions (student_id);
create index cl_sessions_due_idx          on champ_lexical_sessions (next_review_at) where status = 'termine';
create index cl_mots_trouves_session_idx  on champ_lexical_mots_trouves (session_id);
create index cl_reviews_session_idx       on champ_lexical_reviews (session_id);
create index carnet_mots_student_idx      on carnet_mots (student_id);

-- ── updated_at automatique (même patron que questionnaires) ────────────────
create or replace function cl_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger corpus_lexicaux_touch_updated_at
  before update on corpus_lexicaux
  for each row execute function cl_set_updated_at();

create trigger champs_lexicaux_touch_updated_at
  before update on champs_lexicaux
  for each row execute function cl_set_updated_at();

-- ── RLS ──────────────────────────────────────────────────────────────────
alter table corpus_lexicaux           enable row level security;
alter table champs_lexicaux           enable row level security;
alter table champ_lexical_mots        enable row level security;
alter table champ_lexical_sessions    enable row level security;
alter table champ_lexical_mots_trouves enable row level security;
alter table champ_lexical_reviews     enable row level security;
alter table carnet_mots               enable row level security;

-- ─── corpus_lexicaux / champs_lexicaux ─────────────────────────────────────
-- Copie exacte du gabarit questionnaires : select publié-ou-auteur-ou-admin,
-- insert enseignant-sur-lui-même (inutilisé Phase 1, présent pour Phase 2),
-- update/delete auteur-ou-admin.
create policy corpus_lexicaux_select_published on corpus_lexicaux
  for select using (statut = 'publie' and auth.uid() is not null);
create policy corpus_lexicaux_select_own on corpus_lexicaux
  for select using (author_id = auth.uid());
create policy corpus_lexicaux_select_admin on corpus_lexicaux
  for select using (public.my_role() = 'admin');
create policy corpus_lexicaux_insert_teacher on corpus_lexicaux
  for insert with check (author_id = auth.uid() and public.my_role() = 'enseignant');
create policy corpus_lexicaux_update_own_or_admin on corpus_lexicaux
  for update using (author_id = auth.uid() or public.my_role() = 'admin')
  with check (author_id = auth.uid() or public.my_role() = 'admin');
create policy corpus_lexicaux_delete_own_or_admin on corpus_lexicaux
  for delete using (author_id = auth.uid() or public.my_role() = 'admin');

create policy champs_lexicaux_select_published on champs_lexicaux
  for select using (statut = 'publie' and auth.uid() is not null);
create policy champs_lexicaux_select_own on champs_lexicaux
  for select using (author_id = auth.uid());
create policy champs_lexicaux_select_admin on champs_lexicaux
  for select using (public.my_role() = 'admin');
create policy champs_lexicaux_insert_teacher on champs_lexicaux
  for insert with check (author_id = auth.uid() and public.my_role() = 'enseignant');
create policy champs_lexicaux_update_own_or_admin on champs_lexicaux
  for update using (author_id = auth.uid() or public.my_role() = 'admin')
  with check (author_id = auth.uid() or public.my_role() = 'admin');
create policy champs_lexicaux_delete_own_or_admin on champs_lexicaux
  for delete using (author_id = auth.uid() or public.my_role() = 'admin');

-- ─── champ_lexical_mots ─────────────────────────────────────────────────────
-- Aucune policy select élève (voir en-tête de fichier) : lecture réservée à
-- l'auteur, l'admin, ou n'importe quel enseignant si le champ est publié
-- (nécessaire pour générer l'affiche PDF). Écriture auteur-ou-admin, cible
-- Phase 2 (les lignes d'amorçage sont insérées par cette migration sous le
-- rôle postgres, qui contourne RLS).
create policy champ_lexical_mots_select_teacher on champ_lexical_mots
  for select using (
    exists (
      select 1 from champs_lexicaux c
      where c.id = champ_lexical_mots.champ_id
        and (
          c.author_id = auth.uid()
          or public.my_role() = 'admin'
          or (c.statut = 'publie' and public.my_role() = 'enseignant')
        )
    )
  );
create policy champ_lexical_mots_insert_via_parent on champ_lexical_mots
  for insert with check (
    exists (select 1 from champs_lexicaux c where c.id = champ_lexical_mots.champ_id and (c.author_id = auth.uid() or public.my_role() = 'admin'))
  );
create policy champ_lexical_mots_update_via_parent on champ_lexical_mots
  for update using (
    exists (select 1 from champs_lexicaux c where c.id = champ_lexical_mots.champ_id and (c.author_id = auth.uid() or public.my_role() = 'admin'))
  ) with check (
    exists (select 1 from champs_lexicaux c where c.id = champ_lexical_mots.champ_id and (c.author_id = auth.uid() or public.my_role() = 'admin'))
  );
create policy champ_lexical_mots_delete_via_parent on champ_lexical_mots
  for delete using (
    exists (select 1 from champs_lexicaux c where c.id = champ_lexical_mots.champ_id and (c.author_id = auth.uid() or public.my_role() = 'admin'))
  );

-- ─── champ_lexical_sessions ─────────────────────────────────────────────────
-- Élève : lecture/création de ses propres sessions. Pas d'update ni de delete
-- côté client — tous les changements d'état (points, statut, next_review_at)
-- passent par les fonctions SECURITY DEFINER en bas de fichier.
create policy cl_sessions_select_own on champ_lexical_sessions
  for select using (student_id = auth.uid());
create policy cl_sessions_insert_own on champ_lexical_sessions
  for insert with check (student_id = auth.uid());
create policy cl_sessions_select_admin on champ_lexical_sessions
  for select using (public.my_role() = 'admin');
-- Enseignant : lecture des sessions des élèves de ses classes (jointure
-- students → classes, jamais class_memberships — table non peuplée sur ce
-- projet, cf. jogging_sessions_select_teacher).
create policy cl_sessions_select_teacher on champ_lexical_sessions
  for select using (
    exists (
      select 1 from students st
      join classes c on c.id = st.class_id
      where st.auth_user_id = champ_lexical_sessions.student_id
        and c.teacher_id = auth.uid()
    )
  );

-- ─── champ_lexical_mots_trouves / champ_lexical_reviews ────────────────────
-- Aucune policy insert/update élève : toute écriture passe exclusivement par
-- valider_mot_champ_lexical / terminer_session_champ_lexical /
-- demarrer_revision_champ_lexical / terminer_revision_champ_lexical.
create policy cl_mots_trouves_select_own on champ_lexical_mots_trouves
  for select using (
    exists (select 1 from champ_lexical_sessions s where s.id = champ_lexical_mots_trouves.session_id and s.student_id = auth.uid())
  );
create policy cl_mots_trouves_select_admin on champ_lexical_mots_trouves
  for select using (public.my_role() = 'admin');
create policy cl_mots_trouves_select_teacher on champ_lexical_mots_trouves
  for select using (
    exists (
      select 1 from champ_lexical_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = champ_lexical_mots_trouves.session_id and c.teacher_id = auth.uid()
    )
  );

create policy cl_reviews_select_own on champ_lexical_reviews
  for select using (
    exists (select 1 from champ_lexical_sessions s where s.id = champ_lexical_reviews.session_id and s.student_id = auth.uid())
  );
create policy cl_reviews_select_admin on champ_lexical_reviews
  for select using (public.my_role() = 'admin');
create policy cl_reviews_select_teacher on champ_lexical_reviews
  for select using (
    exists (
      select 1 from champ_lexical_sessions s
      join students st on st.auth_user_id = s.student_id
      join classes c on c.id = st.class_id
      where s.id = champ_lexical_reviews.session_id and c.teacher_id = auth.uid()
    )
  );

-- ─── carnet_mots ────────────────────────────────────────────────────────────
-- Copie de jogging_carnet, condition d'éligibilité changée pour "le mot a
-- déjà été trouvé par cet élève" (au lieu de "la session est close").
create policy carnet_mots_select_own on carnet_mots
  for select using (student_id = auth.uid());
create policy carnet_mots_insert_own on carnet_mots
  for insert with check (
    student_id = auth.uid()
    and exists (
      select 1 from champ_lexical_mots_trouves t
      join champ_lexical_sessions s on s.id = t.session_id
      where t.mot_id = carnet_mots.mot_id and s.student_id = auth.uid()
    )
  );
create policy carnet_mots_delete_own on carnet_mots
  for delete using (student_id = auth.uid());
create policy carnet_mots_select_admin on carnet_mots
  for select using (public.my_role() = 'admin');
create policy carnet_mots_select_teacher on carnet_mots
  for select using (
    exists (
      select 1 from students st
      join classes c on c.id = st.class_id
      where st.auth_user_id = carnet_mots.student_id and c.teacher_id = auth.uid()
    )
  );

-- ═══════════════════════════════════════════════════════════════════════════
--  RPC — Parcours élève
--
--  L'élève n'a aucune policy SELECT directe sur champ_lexical_mots (voir
--  en-tête) : toute validation/révélation passe par ces 4 fonctions
--  SECURITY DEFINER, qui ne renvoient jamais un mot de la base avant qu'il
--  n'ait été trouvé (ou, pour les manques, qu'une session ne soit terminée).
-- ═══════════════════════════════════════════════════════════════════════════

-- Valide un mot saisi par l'élève contre la base du champ en cours. Ne
-- renvoie jamais le mot lui-même (le client l'a déjà tapé).
create or replace function valider_mot_champ_lexical(p_session_id uuid, p_categorie text, p_mot text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_champ_id uuid;
  v_niveau smallint;
  v_mot_normalise text;
  v_mot_id uuid;
  v_deja boolean;
  v_points int;
begin
  select champ_id, niveau into v_champ_id, v_niveau
  from champ_lexical_sessions
  where id = p_session_id and student_id = auth.uid() and status = 'en_cours';

  if v_champ_id is null then
    raise exception 'Session introuvable ou déjà terminée';
  end if;

  if public.cl_categorie_niveau(p_categorie) > v_niveau then
    raise exception 'Catégorie non disponible pour ce niveau';
  end if;

  v_mot_normalise := public.cl_normalize(p_mot);

  select id into v_mot_id
  from champ_lexical_mots
  where champ_id = v_champ_id and categorie = p_categorie and mot_normalise = v_mot_normalise;

  if v_mot_id is null then
    return jsonb_build_object('correct', false, 'deja_trouve', false, 'points', 0);
  end if;

  select exists(
    select 1 from champ_lexical_mots_trouves where session_id = p_session_id and mot_id = v_mot_id
  ) into v_deja;

  if v_deja then
    return jsonb_build_object('correct', true, 'deja_trouve', true, 'points', 0);
  end if;

  v_points := public.cl_points_for_categorie(p_categorie);

  insert into champ_lexical_mots_trouves (session_id, mot_id, categorie, submitted_text, points_gagnes)
  values (p_session_id, v_mot_id, p_categorie, p_mot, v_points);

  update champ_lexical_sessions set total_points = total_points + v_points where id = p_session_id;

  return jsonb_build_object('correct', true, 'deja_trouve', false, 'points', v_points);
end;
$$;

grant execute on function valider_mot_champ_lexical(uuid, text, text) to authenticated;

-- Clôt une session et renvoie la correction complète (trouvés + manqués),
-- strictement scopée aux catégories du niveau joué — un niveau 1 ne révèle
-- jamais les mots des catégories niveau 2/3.
create or replace function terminer_session_champ_lexical(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_champ_id uuid;
  v_niveau smallint;
  v_total_points int;
  v_categories jsonb;
begin
  select champ_id, niveau, total_points into v_champ_id, v_niveau, v_total_points
  from champ_lexical_sessions
  where id = p_session_id and student_id = auth.uid() and status = 'en_cours';

  if v_champ_id is null then
    raise exception 'Session introuvable ou déjà terminée';
  end if;

  update champ_lexical_sessions
     set status = 'termine', completed_at = now(), next_review_at = now() + interval '14 days'
   where id = p_session_id;

  select jsonb_agg(jsonb_build_object(
    'categorie', m.categorie,
    'trouves', coalesce((
      select jsonb_agg(jsonb_build_object('id', mm.id, 'mot', mm.mot, 'exemple_phrase', mm.exemple_phrase, 'points', t.points_gagnes) order by mm.ordre)
      from champ_lexical_mots mm
      join champ_lexical_mots_trouves t on t.mot_id = mm.id and t.session_id = p_session_id
      where mm.champ_id = v_champ_id and mm.categorie = m.categorie
    ), '[]'::jsonb),
    'manques', coalesce((
      select jsonb_agg(jsonb_build_object('mot', mm.mot, 'exemple_phrase', mm.exemple_phrase) order by mm.ordre)
      from champ_lexical_mots mm
      where mm.champ_id = v_champ_id and mm.categorie = m.categorie
        and not exists (
          select 1 from champ_lexical_mots_trouves t where t.mot_id = mm.id and t.session_id = p_session_id
        )
    ), '[]'::jsonb)
  ))
  into v_categories
  from (
    select distinct categorie from champ_lexical_mots
    where champ_id = v_champ_id and public.cl_categorie_niveau(categorie) <= v_niveau
  ) m;

  return jsonb_build_object('total_points', v_total_points, 'categories', coalesce(v_categories, '[]'::jsonb));
end;
$$;

grant execute on function terminer_session_champ_lexical(uuid) to authenticated;

-- Démarre un mini-quiz de rappel : tire jusqu'à 6 mots au hasard parmi les
-- catégories jouées, sans jamais envoyer le texte du mot au client (seule la
-- catégorie est renvoyée — le client affiche "Un mot [catégorie] que tu
-- avais trouvé ?" et soumet ses réponses par position, voir la fonction
-- suivante).
create or replace function demarrer_revision_champ_lexical(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_champ_id uuid;
  v_niveau smallint;
  v_review_id uuid;
  v_prompts jsonb;
begin
  select champ_id, niveau into v_champ_id, v_niveau
  from champ_lexical_sessions
  where id = p_session_id and student_id = auth.uid() and status = 'termine';

  if v_champ_id is null then
    raise exception 'Session introuvable ou non terminée';
  end if;

  select coalesce(jsonb_agg(jsonb_build_object('mot_id', id, 'categorie', categorie)), '[]'::jsonb)
  into v_prompts
  from (
    select id, categorie
    from champ_lexical_mots
    where champ_id = v_champ_id and public.cl_categorie_niveau(categorie) <= v_niveau
    order by random()
    limit 6
  ) picked;

  insert into champ_lexical_reviews (session_id, prompts)
  values (p_session_id, v_prompts)
  returning id into v_review_id;

  return jsonb_build_object(
    'review_id', v_review_id,
    'prompts', (
      select jsonb_agg(jsonb_build_object('categorie', p ->> 'categorie') order by ord)
      from jsonb_array_elements(v_prompts) with ordinality as t(p, ord)
    )
  );
end;
$$;

grant execute on function demarrer_revision_champ_lexical(uuid) to authenticated;

-- Corrige un quiz de rappel (réponses positionnelles, cf. commentaire
-- ci-dessus), révèle enfin le texte des mots dans le résultat, et repousse
-- next_review_at (barème linéaire simple 14 → 30 → 46 → 62 jours…, pas un
-- SM-2 complet — raffinable en Phase 2+ si besoin).
create or replace function terminer_revision_champ_lexical(p_review_id uuid, p_reponses text[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session_id uuid;
  v_prompts jsonb;
  v_resultats jsonb := '[]'::jsonb;
  v_mots_trouves int := 0;
  v_mots_total int;
  v_idx int;
  v_prompt jsonb;
  v_mot_id uuid;
  v_categorie text;
  v_mot_reel text;
  v_mot_normalise_reel text;
  v_reponse_normalisee text;
  v_trouve boolean;
  v_new_review_count smallint;
begin
  select r.session_id, r.prompts into v_session_id, v_prompts
  from champ_lexical_reviews r
  join champ_lexical_sessions s on s.id = r.session_id
  where r.id = p_review_id and s.student_id = auth.uid() and r.completed_at is null;

  if v_session_id is null then
    raise exception 'Session de révision introuvable ou déjà terminée';
  end if;

  v_mots_total := jsonb_array_length(v_prompts);

  for v_idx in 0 .. v_mots_total - 1 loop
    v_prompt := v_prompts -> v_idx;
    v_mot_id := (v_prompt ->> 'mot_id')::uuid;
    v_categorie := v_prompt ->> 'categorie';

    select mot, mot_normalise into v_mot_reel, v_mot_normalise_reel
    from champ_lexical_mots where id = v_mot_id;

    v_reponse_normalisee := public.cl_normalize(coalesce(p_reponses[v_idx + 1], ''));
    v_trouve := (v_reponse_normalisee <> '' and v_reponse_normalisee = v_mot_normalise_reel);

    if v_trouve then
      v_mots_trouves := v_mots_trouves + 1;
    end if;

    v_resultats := v_resultats || jsonb_build_object('categorie', v_categorie, 'mot', v_mot_reel, 'trouve', v_trouve);
  end loop;

  update champ_lexical_reviews
     set completed_at = now(), resultats = v_resultats, mots_trouves = v_mots_trouves, mots_total = v_mots_total
   where id = p_review_id;

  update champ_lexical_sessions
     set review_count = review_count + 1
   where id = v_session_id
   returning review_count into v_new_review_count;

  update champ_lexical_sessions
     set next_review_at = now() + (14 + v_new_review_count * 16) * interval '1 day'
   where id = v_session_id;

  return jsonb_build_object('mots_trouves', v_mots_trouves, 'mots_total', v_mots_total, 'resultats', v_resultats);
end;
$$;

grant execute on function terminer_revision_champ_lexical(uuid, text[]) to authenticated;

-- ═══════════════════════════════════════════════════════════════════════════
--  Seed — 2 corpus / 3 champs d'amorçage (Phase 1)
-- ═══════════════════════════════════════════════════════════════════════════
do $$
declare
  v_author uuid;
  v_corpus_emotions uuid;
  v_corpus_verbes uuid;
  v_champ_peur uuid;
  v_champ_regarder uuid;
  v_champ_dire uuid;
begin
  select id into v_author from public.profiles where role = 'admin' order by created_at limit 1;
  if v_author is null then
    select id into v_author from public.profiles where role = 'enseignant' order by created_at limit 1;
  end if;
  if v_author is null then
    raise exception 'Aucun compte admin/enseignant trouvé pour servir d''auteur système aux corpus lexicaux d''amorçage — créez au moins un compte avant d''appliquer cette migration.';
  end if;

  insert into corpus_lexicaux (author_id, titre, slug, ordre)
  values (v_author, 'Les émotions', 'les-emotions', 1)
  returning id into v_corpus_emotions;

  insert into corpus_lexicaux (author_id, titre, slug, ordre)
  values (v_author, 'Verbes de perception et de parole', 'verbes-perception-parole', 2)
  returning id into v_corpus_verbes;

  insert into champs_lexicaux (corpus_id, author_id, theme, slug, contextualisation, ordre)
  values (v_corpus_emotions, v_author, 'avoir peur', 'avoir-peur',
    'La nuit tombait sur la forêt. Soudain, un bruit étrange fit sursauter Léo, qui sentit son cœur battre plus vite.', 1)
  returning id into v_champ_peur;

  insert into champs_lexicaux (corpus_id, author_id, theme, slug, contextualisation, ordre)
  values (v_corpus_verbes, v_author, 'regarder', 'regarder',
    'Devant la vitrine, l''enfant restait immobile, les yeux grands ouverts devant les jouets illuminés.', 1)
  returning id into v_champ_regarder;

  insert into champs_lexicaux (corpus_id, author_id, theme, slug, contextualisation, ordre)
  values (v_corpus_verbes, v_author, 'dire', 'dire',
    'Le vieux marin racontait ses histoires de mer, et tous les enfants du village l''écoutaient sans dire un mot.', 2)
  returning id into v_champ_dire;

  -- ── avoir peur ──
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_peur, 'synonyme', mot, ord from unnest(array['craindre','redouter','s''effrayer','trembler','paniquer']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_peur, 'antonyme', mot, ord from unnest(array['être rassuré','être serein','oser']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_peur, 'adjectif', mot, ord from unnest(array['effrayé','terrifié','anxieux','apeuré','tétanisé']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_peur, 'derive', mot, ord from unnest(array['peureux','effroi','effrayant']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, exemple_phrase, ordre)
    select v_champ_peur, 'expression', mot, exemple, ord from unnest(
      array['avoir une peur bleue','avoir la chair de poule','avoir le cœur qui bat la chamade'],
      array['J''ai eu une peur bleue en voyant l''araignée.','Ce film d''horreur m''a donné la chair de poule.','Son cœur battait la chamade avant l''examen.']
    ) with ordinality as t(mot, exemple, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_peur, 'soutenu', mot, ord from unnest(array['appréhender','redouter','être en proie à l''effroi']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_peur, 'familier', mot, ord from unnest(array['avoir la trouille','flipper','avoir la frousse']) with ordinality as t(mot, ord);

  -- ── regarder ──
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_regarder, 'synonyme', mot, ord from unnest(array['observer','contempler','fixer','dévisager','apercevoir']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_regarder, 'antonyme', mot, ord from unnest(array['ignorer','détourner le regard']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_regarder, 'adjectif', mot, ord from unnest(array['attentif','curieux','perçant','admiratif','méfiant']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_regarder, 'derive', mot, ord from unnest(array['regard','regardant']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, exemple_phrase, ordre)
    select v_champ_regarder, 'expression', mot, exemple, ord from unnest(
      array['dévorer des yeux','avoir des yeux dans le dos','voir d''un mauvais œil'],
      array['L''enfant dévorait des yeux les jouets de la vitrine.','Ma maîtresse a des yeux dans le dos, elle voit tout !','Il voyait d''un mauvais œil cette nouvelle décision.']
    ) with ordinality as t(mot, exemple, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_regarder, 'soutenu', mot, ord from unnest(array['contempler','scruter','considérer']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_regarder, 'familier', mot, ord from unnest(array['mater','zieuter','reluquer']) with ordinality as t(mot, ord);

  -- ── dire ──
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_dire, 'synonyme', mot, ord from unnest(array['murmurer','chuchoter','s''exclamer','ordonner','affirmer','répondre','déclarer']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_dire, 'antonyme', mot, ord from unnest(array['se taire','taire']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_dire, 'adjectif', mot, ord from unnest(array['ferme','hésitant','autoritaire','doux','tremblant']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_dire, 'derive', mot, ord from unnest(array['dicton','prédire','contredire']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, exemple_phrase, ordre)
    select v_champ_dire, 'expression', mot, exemple, ord from unnest(
      array['dire ses quatre vérités','ne pas mâcher ses mots'],
      array['Elle lui a dit ses quatre vérités après cette dispute.','Le directeur ne mâche pas ses mots quand il est mécontent.']
    ) with ordinality as t(mot, exemple, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_dire, 'soutenu', mot, ord from unnest(array['proférer','énoncer','formuler']) with ordinality as t(mot, ord);
  insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
    select v_champ_dire, 'familier', mot, ord from unnest(array['balancer','lâcher']) with ordinality as t(mot, ord);
end $$;

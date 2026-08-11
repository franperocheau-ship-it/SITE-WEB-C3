-- ═══════════════════════════════════════════════════════════════════════════
-- Module Orthographe grammaticale — extension des dictées préparées
--
-- Ajoute, à côté du volet lexical existant (dictee_mots / dictee_results,
-- 20260726120000_dictees.sql), un volet grammatical à 3 exercices : texte à
-- trous taggé par règle, transformation de phrase, classification par nature
-- grammaticale. Résultats strictement cantonnés à un nouveau journal propre
-- à la dictée (dictee_gram_results), jamais dans exercise_results ni dans le
-- bilan général — lus uniquement par une nouvelle section de
-- resultats-dictees-enseignant.html. Même patron RLS que
-- dictees/dictee_mots/dictee_results.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Nature grammaticale des mots difficiles existants (optionnelle) ─────
-- Réutilise dictee_mots tel quel (comme `niveau`) plutôt qu'une table à
-- part : c'est un attribut simple et facultatif du mot, pas une entité
-- distincte. Valeurs libres côté client (11 options fixes dans l'UI), pas de
-- check constraint ici pour rester cohérent avec `contenu`/`niveau` qui
-- n'ont pas non plus de whitelist en base.
alter table dictee_mots
  add column if not exists nature_grammaticale text;

-- ── 2. Texte à trous taggé ──────────────────────────────────────────────────
-- Une phrase par exercice ; plusieurs mots tagués par phrase → sous-table
-- relationnelle (même patron que dictee_mots), pas de jsonb : cohérent avec
-- l'existant, permet un delete-then-reinsert identique à replaceMots.
create table dictee_trous (
  id         uuid primary key default gen_random_uuid(),
  dictee_id  uuid not null references dictees(id) on delete cascade,
  phrase     text not null,   -- phrase complète ; mots à masquer repérés via dictee_trous_mots.position
  ordre      smallint not null,
  unique (dictee_id, ordre)
);

-- Un mot masqué = une position dans la phrase (index du mot, séparation par
-- espaces, 0-based) + la règle affichée à l'élève comme indice pendant
-- l'exercice (confirmé : pas un simple usage analytique enseignant).
create table dictee_trous_mots (
  id           uuid primary key default gen_random_uuid(),
  trou_id      uuid not null references dictee_trous(id) on delete cascade,
  mot_attendu  text not null,   -- réponse exacte attendue (comparaison stricte, DicteesSpeech.normalize)
  position     smallint not null,   -- index du mot dans phrase.split(/\s+/), pour localiser le blanc
  regle        text not null    -- tag libre enseignant, ex. "accord adjectif" — affiché comme indice
);

create index dictee_trous_dictee_id_idx    on dictee_trous (dictee_id);
create index dictee_trous_mots_trou_id_idx on dictee_trous_mots (trou_id);

-- ── 3. Transformation de phrase ─────────────────────────────────────────────
create table dictee_transformations (
  id                  uuid primary key default gen_random_uuid(),
  dictee_id           uuid not null references dictees(id) on delete cascade,
  phrase_depart       text not null,
  type_transformation text not null check (type_transformation in (
    'singulier_pluriel', 'pluriel_singulier',
    'masculin_feminin', 'feminin_masculin',
    'present_futur', 'futur_present'
  )),
  phrase_attendue     text not null,   -- réponse "correcte" saisie par l'enseignant, pas calculée
  ordre               smallint not null,
  unique (dictee_id, ordre)
);

create index dictee_transformations_dictee_id_idx on dictee_transformations (dictee_id);

-- ── 4. Classification : mots supplémentaires propres à cet exercice ────────
-- Ne polluent jamais dictee_mots (liste lexicale) — existent uniquement pour
-- la classification grammaticale de cette dictée.
create table dictee_gram_extra_mots (
  id                  uuid primary key default gen_random_uuid(),
  dictee_id           uuid not null references dictees(id) on delete cascade,
  contenu             text not null,
  nature_grammaticale text not null,
  ordre               smallint not null,
  unique (dictee_id, ordre)
);

create index dictee_gram_extra_mots_dictee_id_idx on dictee_gram_extra_mots (dictee_id);

-- ── 5. Résultats — un seul journal pour les 3 exercices grammaticaux ───────
-- Discriminant `type`, même patron immuable/append-only que dictee_results ;
-- volontairement séparé de dictee_results (exercice smallint 1/2 déjà
-- occupé par le volet lexical) et surtout de exercise_results (jamais lu
-- par resultats-enseignant.html).
create table dictee_gram_results (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references profiles(id) on delete cascade,
  dictee_id     uuid not null references dictees(id) on delete cascade,
  type          text not null check (type in ('trous', 'transformation', 'classification')),
  score         integer not null check (score >= 0),
  total         integer not null check (total > 0),
  pct           numeric(5,2) generated always as (round((score::numeric / total) * 100, 2)) stored,
  duration_secs integer,
  completed_at  timestamptz not null default now()
);

create index dictee_gram_results_student_idx on dictee_gram_results (student_id);
create index dictee_gram_results_dictee_idx  on dictee_gram_results (dictee_id);

alter table dictee_trous             enable row level security;
alter table dictee_trous_mots        enable row level security;
alter table dictee_transformations   enable row level security;
alter table dictee_gram_extra_mots   enable row level security;
alter table dictee_gram_results      enable row level security;

-- ── RLS dictee_trous (patron identique à dictee_mots) ──────────────────────
create policy dictee_trous_select_teacher on dictee_trous
  for select using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_insert_teacher on dictee_trous
  for insert with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_update_teacher on dictee_trous
  for update using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous.dictee_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_delete_teacher on dictee_trous
  for delete using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_select_student on dictee_trous
  for select using (
    exists (
      select 1 from dictees d
      join students st on st.class_id = d.class_id
      where d.id = dictee_trous.dictee_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_trous_mots (jointure via dictee_trous → dictees) ────────────
create policy dictee_trous_mots_select_teacher on dictee_trous_mots
  for select using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_insert_teacher on dictee_trous_mots
  for insert with check (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_update_teacher on dictee_trous_mots
  for update using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_mots.trou_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_delete_teacher on dictee_trous_mots
  for delete using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_mots_select_student on dictee_trous_mots
  for select using (
    exists (
      select 1 from dictee_trous t
      join dictees d on d.id = t.dictee_id
      join students st on st.class_id = d.class_id
      where t.id = dictee_trous_mots.trou_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_transformations (patron identique à dictee_trous) ──────────
create policy dictee_transformations_select_teacher on dictee_transformations
  for select using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_transformations.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_transformations_insert_teacher on dictee_transformations
  for insert with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_transformations.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_transformations_update_teacher on dictee_transformations
  for update using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_transformations.dictee_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_transformations.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_transformations_delete_teacher on dictee_transformations
  for delete using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_transformations.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_transformations_select_student on dictee_transformations
  for select using (
    exists (
      select 1 from dictees d
      join students st on st.class_id = d.class_id
      where d.id = dictee_transformations.dictee_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_gram_extra_mots (patron identique) ──────────────────────────
create policy dictee_gram_extra_mots_select_teacher on dictee_gram_extra_mots
  for select using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_gram_extra_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_gram_extra_mots_insert_teacher on dictee_gram_extra_mots
  for insert with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_gram_extra_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_gram_extra_mots_update_teacher on dictee_gram_extra_mots
  for update using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_gram_extra_mots.dictee_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_gram_extra_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_gram_extra_mots_delete_teacher on dictee_gram_extra_mots
  for delete using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_gram_extra_mots.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_gram_extra_mots_select_student on dictee_gram_extra_mots
  for select using (
    exists (
      select 1 from dictees d
      join students st on st.class_id = d.class_id
      where d.id = dictee_gram_extra_mots.dictee_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_gram_results (patron identique à dictee_results) ────────────
-- Élève propriétaire, enseignant via is_my_student(), aucune update/delete
-- (journal immuable).
create policy dictee_gram_results_insert_own on dictee_gram_results
  for insert with check (student_id = auth.uid());

create policy dictee_gram_results_select_own on dictee_gram_results
  for select using (student_id = auth.uid());

create policy dictee_gram_results_select_teacher on dictee_gram_results
  for select using (public.is_my_student(student_id));

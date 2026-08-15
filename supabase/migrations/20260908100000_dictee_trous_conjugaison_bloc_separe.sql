-- ═══════════════════════════════════════════════════════════════════════════
-- Trous de conjugaison — exercice indépendant du texte à trous classique
--
-- Retour utilisateur : le trou "conjugaison" ajouté par
-- 20260907120000_dictee_trous_conjugaison.sql comme simple sous-type de
-- dictee_trous_mots (mélangé aux trous classiques dans la même phrase) est
-- scindé ici en exercice à part entière, sur le même patron que
-- dictee_transformations/dictee_gram_extra_mots (tables dédiées plutôt qu'un
-- discriminant sur une table partagée) — cohérence avec le pattern déjà en
-- place pour les 2 autres exercices grammaticaux séparés.
--
-- dictee_trous_conjugaison / dictee_trous_conjugaison_mots reprennent la
-- forme de dictee_trous / dictee_trous_mots (même colonnes phrase/niveau/
-- ordre, même mot_attendu/position) plus infinitif/temps (déplacés depuis
-- dictee_trous_mots) — mais SANS colonne `type` : toutes les phrases de
-- cette table sont de la conjugaison par construction.
--
-- Migration de données : toute phrase dictee_trous ayant au moins un mot
-- `type = 'conjugaison'` (tests déjà faits via le chooser introduit par
-- 20260907120000, avant sa suppression côté UI) est recopiée dans la
-- nouvelle table avec uniquement ses mots de conjugaison ; ces mots sont
-- retirés de dictee_trous_mots ; toute phrase dictee_trous qui se retrouve
-- alors sans aucun mot restant (elle ne contenait QUE de la conjugaison) est
-- supprimée — elle n'existe plus que dans la nouvelle table. Aucune perte :
-- chaque trou de conjugaison déjà créé se retrouve à l'identique (phrase,
-- niveau, mot_attendu, position, infinitif, temps) dans son nouvel exercice.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Nouvelles tables (miroir de dictee_trous/dictee_trous_mots) ─────────
create table dictee_trous_conjugaison (
  id         uuid primary key default gen_random_uuid(),
  dictee_id  uuid not null references dictees(id) on delete cascade,
  phrase     text not null,
  niveau     smallint not null default 1 check (niveau between 1 and 3),
  ordre      smallint not null,
  unique (dictee_id, ordre)
);

create table dictee_trous_conjugaison_mots (
  id           uuid primary key default gen_random_uuid(),
  trou_id      uuid not null references dictee_trous_conjugaison(id) on delete cascade,
  mot_attendu  text not null,
  position     smallint not null,
  infinitif    text not null,
  temps        text not null check (temps in ('Présent', 'Imparfait', 'Passé composé', 'Futur'))
);

create index dictee_trous_conjugaison_dictee_id_idx      on dictee_trous_conjugaison (dictee_id);
create index dictee_trous_conjugaison_mots_trou_id_idx   on dictee_trous_conjugaison_mots (trou_id);

alter table dictee_trous_conjugaison       enable row level security;
alter table dictee_trous_conjugaison_mots  enable row level security;

-- ── RLS dictee_trous_conjugaison (patron identique à dictee_trous) ────────
create policy dictee_trous_conjugaison_select_teacher on dictee_trous_conjugaison
  for select using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous_conjugaison.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_insert_teacher on dictee_trous_conjugaison
  for insert with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous_conjugaison.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_update_teacher on dictee_trous_conjugaison
  for update using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous_conjugaison.dictee_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous_conjugaison.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_delete_teacher on dictee_trous_conjugaison
  for delete using (
    exists (
      select 1 from dictees d
      join classes c on c.id = d.class_id
      where d.id = dictee_trous_conjugaison.dictee_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_select_student on dictee_trous_conjugaison
  for select using (
    exists (
      select 1 from dictees d
      join students st on st.class_id = d.class_id
      where d.id = dictee_trous_conjugaison.dictee_id and st.auth_user_id = auth.uid()
    )
  );

-- ── RLS dictee_trous_conjugaison_mots (jointure via dictee_trous_conjugaison) ──
create policy dictee_trous_conjugaison_mots_select_teacher on dictee_trous_conjugaison_mots
  for select using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_insert_teacher on dictee_trous_conjugaison_mots
  for insert with check (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_update_teacher on dictee_trous_conjugaison_mots
  for update using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and c.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_delete_teacher on dictee_trous_conjugaison_mots
  for delete using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      join classes c on c.id = d.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and c.teacher_id = auth.uid()
    )
  );

create policy dictee_trous_conjugaison_mots_select_student on dictee_trous_conjugaison_mots
  for select using (
    exists (
      select 1 from dictee_trous_conjugaison t
      join dictees d on d.id = t.dictee_id
      join students st on st.class_id = d.class_id
      where t.id = dictee_trous_conjugaison_mots.trou_id and st.auth_user_id = auth.uid()
    )
  );

-- ── 2. Migration des données déjà créées via le chooser (avant sa suppression) ──
-- Table temporaire : mémorise l'id de la nouvelle phrase générée pour chaque
-- ancienne phrase dictee_trous contenant au moins un mot de conjugaison, afin
-- de relier ensuite ses mots sans dépendre de l'ordre de renvoi d'un INSERT
-- multi-lignes (RETURNING ne garantit pas de correspondre à l'ordre du
-- SELECT source).
create temporary table _trou_conj_migration as
select
  t.id as old_trou_id,
  gen_random_uuid() as new_trou_id,
  t.dictee_id,
  t.phrase,
  t.niveau,
  (row_number() over (partition by t.dictee_id order by t.ordre) - 1)::smallint as ordre
from dictee_trous t
where exists (
  select 1 from dictee_trous_mots m where m.trou_id = t.id and m.type = 'conjugaison'
);

insert into dictee_trous_conjugaison (id, dictee_id, phrase, niveau, ordre)
select new_trou_id, dictee_id, phrase, niveau, ordre
from _trou_conj_migration;

insert into dictee_trous_conjugaison_mots (trou_id, mot_attendu, position, infinitif, temps)
select mig.new_trou_id, dtm.mot_attendu, dtm.position, dtm.infinitif, coalesce(dtm.temps, 'Présent')
from dictee_trous_mots dtm
join _trou_conj_migration mig on mig.old_trou_id = dtm.trou_id
where dtm.type = 'conjugaison';

delete from dictee_trous_mots where type = 'conjugaison';

-- Une phrase dictee_trous qui ne contenait QUE de la conjugaison n'a plus
-- aucun mot restant : elle n'a plus de sens comme trou classique (aucun
-- indice ne serait visible pour l'élève) et n'existe plus que dans la
-- nouvelle table.
delete from dictee_trous t
where not exists (select 1 from dictee_trous_mots m where m.trou_id = t.id);

drop table _trou_conj_migration;

-- ── 3. dictee_trous_mots redevient exclusivement "classique" ──────────────
alter table dictee_trous_mots
  drop column type,
  drop column infinitif,
  drop column temps;

-- ── 4. Nouveau type de résultat pour ce 4e exercice grammatical ───────────
alter table dictee_gram_results drop constraint dictee_gram_results_type_check;
alter table dictee_gram_results add constraint dictee_gram_results_type_check
  check (type in ('trous', 'transformation', 'classification', 'trous_conjugaison'));

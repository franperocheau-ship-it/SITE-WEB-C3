-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- Retire la catégorie "sens_figure" (redondante avec "expression" : les deux
-- ont un mot/expression + un exemple optionnel, tout sens figuré peut être
-- saisi comme expression). Suppression directe des mots existants (pas de
-- bascule vers 'expression', demande explicite) — les lignes dépendantes
-- (champ_lexical_mots_trouves, carnet_mots) sont nettoyées automatiquement
-- par leurs FK on delete cascade vers champ_lexical_mots.
-- ═══════════════════════════════════════════════════════════════════════════

delete from champ_lexical_mots where categorie = 'sens_figure';

-- Resserre la contrainte CHECK sur categorie. Le nom exact n'est pas fixé
-- dans le code (auto-généré par Postgres à la création de la table) : on le
-- retrouve dynamiquement via pg_constraint plutôt que de parier dessus, pour
-- ne pas faire échouer silencieusement la migration sur un nom mal deviné.
do $$
declare
  v_constraint_name text;
begin
  select con.conname into v_constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  where rel.relname = 'champ_lexical_mots'
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) like '%categorie%';

  if v_constraint_name is not null then
    execute format('alter table champ_lexical_mots drop constraint %I', v_constraint_name);
  end if;
end $$;

alter table champ_lexical_mots add constraint champ_lexical_mots_categorie_check
  check (categorie in ('synonyme', 'antonyme', 'adjectif', 'derive', 'expression', 'soutenu', 'familier'));

-- ── Fonctions de palier/barème : retire les branches sens_figure ───────────
create or replace function public.cl_categorie_niveau(p_categorie text)
returns smallint
language sql
immutable
as $$
  select case p_categorie
    when 'synonyme'   then 1
    when 'antonyme'   then 1
    when 'adjectif'   then 1
    when 'derive'     then 2
    when 'expression' then 2
    when 'soutenu'    then 3
    when 'familier'   then 3
    else 99
  end;
$$;

create or replace function public.cl_points_for_categorie(p_categorie text)
returns int
language sql
immutable
as $$
  select case p_categorie
    when 'synonyme'   then 10
    when 'antonyme'   then 10
    when 'adjectif'   then 10
    when 'derive'     then 15
    when 'expression' then 15
    when 'soutenu'    then 20
    when 'familier'   then 20
    else 0
  end;
$$;

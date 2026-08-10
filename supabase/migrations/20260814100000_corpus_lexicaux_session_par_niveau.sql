-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- champ_lexical_sessions n'autorisait qu'une session par (élève, champ),
-- quel que soit le niveau : une fois le Niveau 1 terminé, impossible de
-- démarrer le Niveau 2 sur le même champ (contrainte unique trop stricte).
-- On desserre vers unique(student_id, champ_id, niveau) — pur assouplissement,
-- aucune ligne existante ne peut violer la nouvelle contrainte.
-- ═══════════════════════════════════════════════════════════════════════════

do $$
declare
  v_constraint_name text;
begin
  select con.conname into v_constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  where rel.relname = 'champ_lexical_sessions'
    and con.contype = 'u';

  if v_constraint_name is not null then
    execute format('alter table champ_lexical_sessions drop constraint %I', v_constraint_name);
  end if;
end $$;

alter table champ_lexical_sessions
  add constraint champ_lexical_sessions_student_champ_niveau_key
  unique (student_id, champ_id, niveau);

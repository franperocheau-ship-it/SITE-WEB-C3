-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- Les policies d'insertion sur corpus_lexicaux/champs_lexicaux n'ont jamais
-- été élargies à l'admin (seules update/delete l'ont été, pour agir sur les
-- champs déjà partagés) : un compte admin ne pouvait donc pas créer de
-- nouveau corpus ni de nouveau champ lexical via vocabulaire-corpus-
-- enseignant.html, qui accepte pourtant les deux rôles depuis
-- requireAnyRole(['enseignant','admin']). author_id = auth.uid() reste
-- inchangé : on devient toujours l'auteur de ce qu'on crée soi-même.
-- ═══════════════════════════════════════════════════════════════════════════

drop policy if exists corpus_lexicaux_insert_teacher on corpus_lexicaux;
create policy corpus_lexicaux_insert_teacher on corpus_lexicaux
  for insert with check (author_id = auth.uid() and public.my_role() in ('enseignant', 'admin'));

drop policy if exists champs_lexicaux_insert_teacher on champs_lexicaux;
create policy champs_lexicaux_insert_teacher on champs_lexicaux
  for insert with check (author_id = auth.uid() and public.my_role() in ('enseignant', 'admin'));

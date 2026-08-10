-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- Resserre les droits d'écriture admin sur champs_lexicaux et
-- champ_lexical_mots : jusqu'ici public.my_role() = 'admin' donnait un accès
-- illimité, y compris aux brouillons privés d'un enseignant. La demande est
-- explicite : l'admin doit pouvoir modifier/supprimer n'importe quel champ
-- PARTAGÉ (statut = 'publie'), mais jamais un brouillon resté privé par son
-- auteur — les policies select restent inchangées (lecture large déjà
-- existante, seule l'écriture est concernée), de même que corpus_lexicaux
-- (hors périmètre de la demande).
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── champs_lexicaux ────────────────────────────────────────────────────────
drop policy if exists champs_lexicaux_update_own_or_admin on champs_lexicaux;
drop policy if exists champs_lexicaux_delete_own_or_admin on champs_lexicaux;

-- USING restreint aux lignes ACTUELLEMENT publiées pour la branche admin (un
-- admin ne peut même pas cibler un brouillon) ; WITH CHECK volontairement
-- sans condition de statut sur le résultat pour la branche admin, afin qu'un
-- admin puisse dépublier un champ (le repasser en brouillon) comme action de
-- modération sans être bloqué par son propre check.
create policy champs_lexicaux_update_own_or_admin on champs_lexicaux
  for update using (author_id = auth.uid() or (public.my_role() = 'admin' and statut = 'publie'))
  with check (author_id = auth.uid() or public.my_role() = 'admin');

create policy champs_lexicaux_delete_own_or_admin on champs_lexicaux
  for delete using (author_id = auth.uid() or (public.my_role() = 'admin' and statut = 'publie'));

-- ─── champ_lexical_mots (même resserrement, via le parent) ──────────────────
drop policy if exists champ_lexical_mots_insert_via_parent on champ_lexical_mots;
drop policy if exists champ_lexical_mots_update_via_parent on champ_lexical_mots;
drop policy if exists champ_lexical_mots_delete_via_parent on champ_lexical_mots;

create policy champ_lexical_mots_insert_via_parent on champ_lexical_mots
  for insert with check (
    exists (
      select 1 from champs_lexicaux c
      where c.id = champ_lexical_mots.champ_id
        and (c.author_id = auth.uid() or (public.my_role() = 'admin' and c.statut = 'publie'))
    )
  );
create policy champ_lexical_mots_update_via_parent on champ_lexical_mots
  for update using (
    exists (
      select 1 from champs_lexicaux c
      where c.id = champ_lexical_mots.champ_id
        and (c.author_id = auth.uid() or (public.my_role() = 'admin' and c.statut = 'publie'))
    )
  ) with check (
    exists (
      select 1 from champs_lexicaux c
      where c.id = champ_lexical_mots.champ_id
        and (c.author_id = auth.uid() or (public.my_role() = 'admin' and c.statut = 'publie'))
    )
  );
create policy champ_lexical_mots_delete_via_parent on champ_lexical_mots
  for delete using (
    exists (
      select 1 from champs_lexicaux c
      where c.id = champ_lexical_mots.champ_id
        and (c.author_id = auth.uid() or (public.my_role() = 'admin' and c.statut = 'publie'))
    )
  );

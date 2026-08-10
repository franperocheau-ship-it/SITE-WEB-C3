-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- Répare la perte de données constatée sur "avoir peur" (ligne d'origine et
-- sa copie/fork) : un bug d'interface (corrigé dans le même lot, voir
-- vocabulaire-corpus-enseignant.html — "+ Ajouter" sous Expressions
-- redéclenchait un rendu complet du formulaire qui vidait silencieusement
-- les 6 catégories simples) a fait écraser synonyme/antonyme/adjectif/
-- derive/soutenu/familier lors d'un enregistrement le 2026-08-09. Diagnostic
-- confirmé par requête directe (supabase db query --linked) avant d'écrire
-- cette migration : les 10 expressions actuelles (dont plusieurs ajoutées
-- manuellement par l'enseignant, absentes du seed d'origine) ne sont PAS
-- touchées ici — seules les 6 catégories manquantes sont réinjectées, avec
-- leur contenu d'origine du seed Phase 1 (20260809120000_corpus_lexicaux.sql).
--
-- Protégée par une vérification d'existence (sans effet si ces deux lignes
-- n'existent pas dans l'environnement où la migration s'applique) et par
-- on conflict do nothing (idempotente vis-à-vis de la contrainte unique
-- (champ_id, categorie, mot_normalise)).
-- ═══════════════════════════════════════════════════════════════════════════

do $$
declare
  v_original uuid := 'e6c4eb63-a995-499c-b91b-42320cfbe2b2';
  v_copie    uuid := 'f0179894-d660-4eef-a2bc-4ae392cce16b';
  v_champ_id uuid;
begin
  foreach v_champ_id in array array[v_original, v_copie]
  loop
    if not exists (select 1 from champs_lexicaux where id = v_champ_id) then
      continue;
    end if;

    insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
      select v_champ_id, 'synonyme', mot, ord from unnest(array['craindre','redouter','s''effrayer','trembler','paniquer']) with ordinality as t(mot, ord)
      on conflict (champ_id, categorie, mot_normalise) do nothing;

    insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
      select v_champ_id, 'antonyme', mot, ord from unnest(array['être rassuré','être serein','oser']) with ordinality as t(mot, ord)
      on conflict (champ_id, categorie, mot_normalise) do nothing;

    insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
      select v_champ_id, 'adjectif', mot, ord from unnest(array['effrayé','terrifié','anxieux','apeuré','tétanisé']) with ordinality as t(mot, ord)
      on conflict (champ_id, categorie, mot_normalise) do nothing;

    insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
      select v_champ_id, 'derive', mot, ord from unnest(array['peureux','effroi','effrayant']) with ordinality as t(mot, ord)
      on conflict (champ_id, categorie, mot_normalise) do nothing;

    insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
      select v_champ_id, 'soutenu', mot, ord from unnest(array['appréhender','redouter','être en proie à l''effroi']) with ordinality as t(mot, ord)
      on conflict (champ_id, categorie, mot_normalise) do nothing;

    insert into champ_lexical_mots (champ_id, categorie, mot, ordre)
      select v_champ_id, 'familier', mot, ord from unnest(array['avoir la trouille','flipper','avoir la frousse']) with ordinality as t(mot, ord)
      on conflict (champ_id, categorie, mot_normalise) do nothing;
  end loop;
end $$;

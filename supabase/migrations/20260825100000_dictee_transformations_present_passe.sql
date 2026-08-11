-- ═══════════════════════════════════════════════════════════════════════════
-- Orthographe grammaticale — transformation de phrase : ajout présent↔passé
--
-- Demande utilisateur : deux nouveaux types de transformation, en plus des
-- 6 déjà en place (singulier/pluriel, masculin/féminin, présent/futur).
-- Même mécanique (saisie libre, correction tolérante via
-- DicteesSpeech.normalizeSentence + réponses alternatives) — seule la liste
-- de valeurs acceptées par la colonne change.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_transformations
  drop constraint dictee_transformations_type_transformation_check;

alter table dictee_transformations
  add constraint dictee_transformations_type_transformation_check
  check (type_transformation in (
    'singulier_pluriel', 'pluriel_singulier',
    'masculin_feminin', 'feminin_masculin',
    'present_futur', 'futur_present',
    'present_passe', 'passe_present'
  ));

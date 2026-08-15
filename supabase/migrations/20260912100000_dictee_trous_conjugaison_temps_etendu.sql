-- ═══════════════════════════════════════════════════════════════════════════
-- Trous de conjugaison — liste de temps étendue + verbalisation du temps
-- imposé dans la consigne élève
--
-- Retour utilisateur : la consigne affichée côté élève ("Retrouve la forme
-- conjuguée à partir de l'infinitif indiqué.") ne précisait jamais À QUEL
-- TEMPS conjuguer le verbe — seul l'infinitif était donné en indice
-- (js/dictees-engine.js/renderTrousConjugaisonExercise). Le temps était bien
-- saisi par l'enseignant (dictee_trous_conjugaison_mots.temps) mais jamais
-- exploité côté élève. Corrigé côté JS (consigne dynamique par phrase) — ce
-- correctif SQL ne fait qu'étendre la liste fermée des temps disponibles, qui
-- ne couvrait que 4 valeurs (cohérentes avec les joggings d'écriture, sans
-- rapport fonctionnel avec cet exercice) à 7, alignées sur la demande
-- enseignant.
--
-- Migration de données : seule la valeur 'Présent' est utilisée en base à ce
-- jour (vérifié via `supabase db query --linked` avant d'écrire cette
-- migration — 19 lignes, aucune autre valeur) ; elle est remappée vers son
-- équivalent complet 'Présent de l'indicatif'. Les 3 autres anciennes valeurs
-- ('Imparfait', 'Passé composé', 'Futur') sont remappées par précaution bien
-- qu'aucune ligne existante ne les utilise, afin qu'aucune donnée future
-- restaurée depuis un backup pré-migration ne se retrouve bloquée par la
-- nouvelle contrainte.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_trous_conjugaison_mots drop constraint dictee_trous_conjugaison_mots_temps_check;

update dictee_trous_conjugaison_mots set temps = 'Présent de l''indicatif' where temps = 'Présent';
update dictee_trous_conjugaison_mots set temps = 'Imparfait de l''indicatif' where temps = 'Imparfait';
update dictee_trous_conjugaison_mots set temps = 'Futur simple de l''indicatif' where temps = 'Futur';
-- 'Passé composé' : libellé inchangé, aucun remap nécessaire.

alter table dictee_trous_conjugaison_mots add constraint dictee_trous_conjugaison_mots_temps_check
  check (temps in (
    'Présent de l''indicatif',
    'Imparfait de l''indicatif',
    'Futur simple de l''indicatif',
    'Passé composé',
    'Plus-que-parfait',
    'Impératif',
    'Conditionnel'
  ));

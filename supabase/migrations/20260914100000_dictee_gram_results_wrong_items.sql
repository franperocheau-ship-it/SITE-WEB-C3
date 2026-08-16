-- ═══════════════════════════════════════════════════════════════════════════
-- dictee_gram_results.wrong_items — mots ratés de l'exercice "Texte à
-- trous" (type = 'trous' uniquement pour l'instant — classification, trous
-- de conjugaison et transformation restent hors périmètre)
--
-- Jusqu'ici dictee_gram_results ne portait que score/total/pct : impossible
-- d'alimenter la ligne "Erreurs" de resultats-dictees-enseignant.html/
-- dashboard-eleve.html pour ce volet (contrairement à dictee_results.
-- wrong_mot_ids côté lexical). Stocke directement le mot attendu (texte),
-- PAS un id dictee_trous_mots : ces lignes n'ont pas d'équivalent stable de
-- dictee_mots (pas de replaceMots dédié, mais même risque de suppression/
-- régénération au fil des éditions enseignant) — reproduire un id ici
-- exposerait au même bug que les wrong_mot_ids orphelins récemment corrigé
-- (js/dictees-word-stats.js/tally, retour utilisateur 2026-08-16). Un texte
-- reste lisible même si le trou source a depuis été modifié ou supprimé.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_gram_results
  add column if not exists wrong_items text[];

-- ═══════════════════════════════════════════════════════════════════════════
-- Pastille "niveau de difficulté travaillé" par dictée (élève + enseignant)
--
-- Besoin : afficher, par dictée et par élève, le niveau (1/2/3) de la
-- DERNIÈRE SESSION COMPLÈTE (tous les exercices actifs — lexicaux et/ou
-- grammaticaux selon ce que l'enseignant a coché pour cette dictée —
-- terminés à ce niveau), écrasé par une session plus récente à un autre
-- niveau, jamais cumulé. Une dictée commencée mais pas terminée ne compte
-- pour aucun niveau.
--
-- Deux trous dans le stockage actuel empêchaient de calculer ça de façon
-- fiable a posteriori :
-- 1. dictee_results (paliers lexicaux 0/0.5/1) n'a jamais eu de colonne
--    `niveau`, contrairement à dictee_gram_results (migration
--    20260911100000) — impossible de savoir a posteriori à quel niveau un
--    exercice lexical avait été fait. En pratique, js/dictees-student-
--    space.js et js/dictees-teacher.js reconstituaient un "niveau" à partir
--    de la seule dernière tentative GRAMMATICALE, ce qui ne marchait pas du
--    tout pour une dictée purement lexicale (inclut_grammaticale = false)
--    ni ne reflétait fidèlement "la dernière session complète".
-- 2. Aucune des deux tables ne portait de marqueur "cette ligne clôt une
--    session complète sur cette dictée à ce niveau" — chaque palier écrit
--    sa propre ligne indépendamment (cf. l'en-tête de js/dictees-engine.js),
--    il n'existait aucun moyen de savoir, juste à la lecture des lignes,
--    laquelle correspondait au tout dernier palier d'une séquence
--    entièrement terminée.
--
-- Le calcul de complétude reste fait côté client (js/dictees-engine.js
-- connaît déjà, via currentSequence()/gramSteps()/lexicalSteps(), quels
-- exercices sont actifs pour CETTE dictée à CE niveau) : à chaque écriture
-- de résultat (submitResult/submitGramResult), le client réévalue si TOUS
-- les paliers de la séquence en cours sont désormais terminés et pose
-- `session_complete = true` sur la ligne qu'il vient d'écrire si c'est le
-- cas — au plus une ligne "complète" par session réellement menée à son
-- terme, celle du tout dernier palier fini. Lire "le niveau affiché" pour
-- une dictée/élève devient alors : parmi dictee_results ∪ dictee_gram_results
-- filtrées sur session_complete = true, la ligne la plus récente
-- (completed_at), son `niveau`.
--
-- Colonnes nullable / défaut false : n'affecte aucune ligne déjà existante
-- (les tentatives passées n'ont simplement pas de niveau affiché tant
-- qu'aucune nouvelle session complète n'est rejouée).
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_results
  add column niveau smallint check (niveau between 1 and 3),
  add column session_complete boolean not null default false;

alter table dictee_gram_results
  add column session_complete boolean not null default false;

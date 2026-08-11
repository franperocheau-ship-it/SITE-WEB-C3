-- ═══════════════════════════════════════════════════════════════════════════
-- Orthographe grammaticale — réponses alternatives + renommage "nom" → "nom
-- commun"/"nom propre"
--
-- Retour utilisateur après nouveau test :
--  - Le prof doit pouvoir accepter plusieurs formulations valables pour un
--    même trou/une même transformation (pas une seule réponse figée).
--  - La liste des natures grammaticales distingue désormais "nom commun" et
--    "nom propre" (auparavant un seul "nom" indifférencié).
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Réponses alternatives ───────────────────────────────────────────────────
-- Colonnes additives (le prof continue de saisir une réponse principale dans
-- mot_attendu/phrase_attendue, ces tableaux ne portent que les variantes
-- supplémentaires acceptées). Comparaison élève : normalizeSentence(saisie)
-- comparée à normalizeSentence(chacune des réponses acceptées).
alter table dictee_trous_mots
  add column if not exists reponses_alt text[] not null default '{}';

alter table dictee_transformations
  add column if not exists phrase_attendue_alt text[] not null default '{}';

-- ── Renommage "nom" → "nom commun" ──────────────────────────────────────────
-- La liste des natures affichées passe de 12 à 13 valeurs ("nom" scindé en
-- "nom commun"/"nom propre" côté interface) ; les données déjà saisies sous
-- l'ancienne valeur "nom" sont migrées vers "nom commun" par défaut (choix le
-- plus fréquent) plutôt que laissées orphelines (invisibles dans le nouveau
-- sélecteur, qui n'a plus d'option "nom").
update dictee_mots set nature_grammaticale = 'nom commun' where nature_grammaticale = 'nom';
update dictee_gram_extra_mots set nature_grammaticale = 'nom commun' where nature_grammaticale = 'nom';

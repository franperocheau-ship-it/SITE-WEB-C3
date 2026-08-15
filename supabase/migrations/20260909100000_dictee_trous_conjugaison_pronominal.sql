-- ═══════════════════════════════════════════════════════════════════════════
-- Trous de conjugaison — verbes pronominaux (pronom réfléchi + verbe)
--
-- Un trou de conjugaison portait jusqu'ici sur un seul mot (`position`).
-- Pour un verbe pronominal ("il se lève"), le pronom réfléchi et le verbe
-- doivent former UN SEUL trou ("se lève"), pas deux trous distincts —
-- retour utilisateur, le pronom cliqué séparément du verbe créait deux trous
-- indépendants au lieu d'une seule unité.
--
-- `position_fin` (nullable) étend le trou classique mono-mot : NULL = trou
-- d'un seul mot (comportement inchangé, valeur par défaut) ; renseigné = le
-- trou couvre les positions `position` à `position_fin` inclus (toujours 2
-- positions consécutives en pratique — pronom + verbe — mais la colonne
-- reste générique). `mot_attendu` continue de porter la réponse complète
-- ("se lève"), extraite telle quelle de la phrase par le formulaire
-- enseignant (js/dictees-enseignant.html) — aucun changement de la
-- correction tolérante côté élève (DicteesSpeech.normalizeTrouAnswer,
-- js/dictees-engine.js), qui compare déjà la chaîne entière du trou.
--
-- Ne touche pas dictee_trous_mots (texte à trous classique) : ce fix est
-- scopé au seul bloc "Trous de conjugaison".
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_trous_conjugaison_mots
  add column position_fin smallint check (position_fin is null or position_fin > position);

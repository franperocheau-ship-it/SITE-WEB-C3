-- ═══════════════════════════════════════════════════════════════════════════
-- Simplification du texte à trous (orthographe grammaticale)
--
-- L'exercice était jugé trop complexe : une règle par mot affichée comme
-- indice à l'élève, plus des réponses alternatives par mot. Retour
-- utilisateur : un seul mot attendu par trou, aucun indice de règle — la
-- correction devient tolérante (espaces, ponctuation, apostrophe) plutôt que
-- de multiplier les réponses acceptées en base. Voir js/dictees-engine.js
-- (validateTrou) et js/dictees-speech.js (normalizeTrouAnswer).
--
-- Colonnes supprimées : plus aucun lecteur/écrivain restant côté client
-- (dictees-enseignant.html, dictees-teacher.js, dictees-engine.js,
-- dictee-grammar-print.js) — données existantes perdues, jugé acceptable
-- (indices pédagogiques, pas des résultats élèves).
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_trous_mots
  drop column regle,
  drop column reponses_alt;

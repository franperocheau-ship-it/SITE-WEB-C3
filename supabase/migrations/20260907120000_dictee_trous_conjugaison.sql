-- ═══════════════════════════════════════════════════════════════════════════
-- Texte à trous (orthographe grammaticale) — type de trou "conjugaison"
--
-- Ajoute, à côté du trou "classique" existant (mot masqué tel quel), un type
-- de trou "conjugaison" : côté élève, le mot de la phrase est remplacé par
-- son infinitif affiché en clair entre parenthèses, suivi du trou à
-- compléter par la forme conjuguée attendue. `mot_attendu` reste la seule
-- réponse (le mot déjà tapé par l'enseignant dans `phrase`, comme pour un
-- trou classique) — pas de conjugueur automatique, `infinitif`/`temps` ne
-- sont que des métadonnées d'affichage saisies par l'enseignant.
--
-- `temps` reprend la liste fermée déjà utilisée pour les joggings d'écriture
-- (redaction.html, TEMPS_CLASS) pour rester cohérent sur le site.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_trous_mots
  add column type      text not null default 'classique' check (type in ('classique', 'conjugaison')),
  add column infinitif  text,
  add column temps      text check (temps is null or temps in ('Présent', 'Imparfait', 'Passé composé', 'Futur'));

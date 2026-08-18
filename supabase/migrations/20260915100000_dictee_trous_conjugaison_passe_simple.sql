-- ═══════════════════════════════════════════════════════════════════════════
-- Trous de conjugaison — ajout du passé simple à la liste des temps
--
-- Retour utilisateur : le passé simple manquait à la liste fermée des temps
-- disponibles (dictees-enseignant.html/TEMPS_OPTIONS), qui n'en couvrait que
-- 7 (cf. migration 20260912100000). Comme pour les autres temps de ce
-- module, aucune forme n'est générée automatiquement : l'enseignant saisit
-- lui-même la forme conjuguée attendue (mot_attendu) ; ce correctif SQL ne
-- fait qu'ouvrir la contrainte à la nouvelle valeur.
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictee_trous_conjugaison_mots drop constraint dictee_trous_conjugaison_mots_temps_check;

alter table dictee_trous_conjugaison_mots add constraint dictee_trous_conjugaison_mots_temps_check
  check (temps in (
    'Présent de l''indicatif',
    'Imparfait de l''indicatif',
    'Passé simple de l''indicatif',
    'Futur simple de l''indicatif',
    'Passé composé',
    'Plus-que-parfait',
    'Impératif',
    'Conditionnel'
  ));

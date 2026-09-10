/* ─────────────────────────────────────────────────────────────────────────────
   competence-order.js — Ordre pédagogique des compétences par domaine, tel
   qu'affiché sur la page d'exercices élève/enseignant correspondante (ex.
   français-conjugaison.html), et non un ordre alphabétique ou de base.
   Utilisé par : pilotage-enseignant.html (arborescence du parcours guidé).

   Chaque liste est la séquence `SECTIONS > subSections > skills` de la page
   domaine correspondante, aplatie et résolue vers le vrai slug EXERCISE_DATA
   (via CUSTOM_HREFS/CUSTOM_PAGES quand le slug affiché diffère du slug réel —
   ex. "accorder-participe-passe-etre" → "ortho-accorder-participe-passe-etre").
   Les compétences sans exercice réel (pages autonomes en dur, "en
   construction") sont omises : rien à ordonner pour elles ici.

   Clé : "<matière>::<domaine>" (même format que le notionKey utilisé dans
   pilotage-enseignant.html). Une compétence absente de sa liste (nouvel
   exercice ajouté après coup) retombe en fin de groupe, par ordre
   alphabétique, avec un avertissement console — pas de disparition silencieuse.

   À maintenir à la main si l'ordre change sur une page domaine (pas de
   génération automatique : les pages domaine ne sont pas des modules
   réutilisables, voir la conversation du 2026-09-10 sur la refonte du
   pilotage des compétences).
   ───────────────────────────────────────────────────────────────────────────── */

window.COMPETENCE_ORDER = {

  /* Source : français-conjugaison.html (SECTIONS, résolu via CUSTOM_HREFS) */
  "Français::Conjugaison": [
    "retrouver-infinitif-verbe-conjugue",
    "conjuguer-etre-present",
    "conjuguer-avoir-present",
    "conjuguer-1er-groupe-present",
    "conjuguer-verbes-particuliers-1er-groupe",
    "conjuguer-2e-groupe-present",
    "conjuguer-3e-groupe-present",
    "conjuguer-imparfait",
    "conjuguer-futur",
    "conjuguer-passe-compose-avoir",
    "etre-ou-avoir",
    "ortho-accorder-participe-passe-etre",
    "ortho-accorder-participe-passe-cod",
    "conjuguer-passe-simple",
    "conjuguer-plus-que-parfait",
    "conjuguer-imperatif-present",
    "conjuguer-conditionnel-present",
    "conjuguer-faire",
    "conjuguer-aller",
    "conjuguer-dire",
    "conjuguer-venir",
    "conjuguer-pouvoir",
    "conjuguer-voir",
    "conjuguer-vouloir",
    "conjuguer-prendre"
  ],

  /* Source : français-grammaire.html (SECTIONS, slugs réels = slugs affichés) */
  "Français::Grammaire": [
    "identifier-type-phrase",
    "transformer-phrase",
    "produire-formes-interrogatives",
    "distinguer-phrase-simple-complexe",
    "identifier-juxtaposition",
    "identifier-subordination",
    "distinguer-coordination-subordination",
    "reperer-propositions",
    "identifier-differencier-articles-definis-indefinis",
    "identifier-differencier-determinants-demonstratifs-possessifs",
    "identifier-nom-phrase",
    "identifier-adjectif",
    "distinguer-pronom-sujet-complement",
    "remplacer-gn-sujet-pronom",
    "remplacer-gn-complement-pronom",
    "identifier-pronom-complement-objet",
    "pronom-antecedent",
    "identifier-verbe-conjugue",
    "identifier-adverbe",
    "identifier-preposition",
    "identifier-conjonction-coordination",
    "identifier-conjonction-subordination",
    "distinguer-conjonctions",
    "identifier-nom-noyau-gn",
    "identifier-complement-nom",
    "distinguer-epithete-complement-nom",
    "identifier-groupe-sujet",
    "distinguer-cod-coi",
    "distinguer-attribut-sujet-complement-objet",
    "identifier-groupe-circonstanciel",
    "differencier-cc-temps-lieu-cause",
    "identifier-attribut-sujet",
    "accorder-attribut-sujet",
    "differencier-epithete-attribut"
  ],

  /* Source : français-orthographe.html (SECTIONS, slugs réels = slugs affichés) */
  "Français::Orthographe": [
    "ortho-accorder-determinant-nom",
    "ortho-accorder-adjectif-nom",
    "ortho-identifier-donneur-accord",
    "ortho-transformer-gn-pluriel",
    "ortho-transformer-gn-feminin",
    "ortho-modifier-sujet-accords",
    "ortho-modifier-temps-accords",
    "ortho-distinguer-marques-verbe-nom",
    "ortho-accorder-participe-passe-etre",
    "ortho-accorder-participe-passe-cod",
    "ortho-distinguer-a-a",
    "ortho-distinguer-et-est",
    "ortho-distinguer-son-sont",
    "ortho-distinguer-on-ont",
    "ortho-distinguer-ce-se",
    "ortho-distinguer-ces-ses-cest-sest",
    "ortho-distinguer-ou-ou",
    "ortho-distinguer-leur-leurs",
    "ortho-distinguer-tout-tous-toute-toutes",
    "ortho-distinguer-quel-quelle-quels-quelles",
    "ortho-mots-invariables"
  ],

  /* Source : français-lecture.html (SECTIONS) */
  "Français::Lecture": [
    "comprendre-implicites",
    "comprendre-mot-contexte"
  ],

  /* Source : français-lexique.html (SECTIONS) — notion EXERCISE_DATA "Vocabulaire" */
  "Français::Vocabulaire": [
    "ordre-alphabetique",
    "trouver-synonyme",
    "trouver-antonyme",
    "identifier-homonyme",
    "polysemie",
    "sens-propre-figure",
    "famille-de-mots",
    "identifier-radical",
    "identifier-prefixe",
    "identifier-suffixe",
    "mot-derive",
    "origine-mots",
    "regrouper-par-theme",
    "champ-lexical",
    "mot-adapte-contexte",
    "niveaux-de-langue"
  ],

  /* Source : mathématiques-nombres-entiers.html (SECTIONS) */
  "Mathématiques::Nombres entiers": [
    "ecrire-nombre-entier-chiffres",
    "ecrire-nombre-entier-lettres",
    "identifier-valeur-chiffre-position",
    "decomposer-nombre-entier",
    "composer-nombre-entier",
    "comparer-nombres-entiers",
    "ranger-nombres-entiers",
    "encadrer-nombre-entier",
    "droite-graduee-nombres-entiers",
    "arrondir-nombre-entier",
    "arrondi-adapte-probleme"
  ],

  /* Source : mathématiques-fractions.html (SECTIONS, CUSTOM_PAGES = identité).
     Les 2 derniers (fraction-decimale-*) ont une `competence` réelle qui
     commence par "Nombres décimaux —" (exercise-data.js inchangé), mais sont
     rattachés à "Fractions" UNIQUEMENT dans l'arborescence de pilotage via
     PILOTAGE_NOTION_OVERRIDE (pilotage-enseignant.html) — décision
     utilisateur du 2026-09-10. Ordre : en fin de liste, dans l'ordre où elles
     apparaissent sur cette page (seule page qui les affiche). */
  "Mathématiques::Fractions": [
    "lire-fraction",
    "representer-fraction",
    "placer-fraction-droite-graduee",
    "comparer-fractions",
    "encadrer-fraction",
    "decomposer-fraction-partie-entiere",
    "utiliser-fractions-problemes",
    "fraction-decimale-grille-droite",
    "fraction-decimale-tableau-numeration"
  ],

  /* Source : mathématiques-nombres-decimaux.html (SECTIONS, résolu via
     CUSTOM_PAGES — 6 slugs de la page sans exercice réel sont omis ici :
     completer-droite-graduee, retrouver-decimal-position, arrondir-dixieme,
     arrondir-centieme, trouver-entier-proche, utiliser-arrondi-situation,
     ainsi que les 2 renvoyant vers des pages autonomes (ecrire-fraction-
     decimale.html, ecrire-decimal-fraction.html) plutôt que exercise.html).
     fraction-decimale-grille-droite et fraction-decimale-tableau-numeration
     ont bien cette `competence` réelle mais s'affichent sous "Fractions"
     dans le pilotage (voir plus haut) : pas listées ici. */
  "Mathématiques::Nombres décimaux": [
    "associer-decimal-fraction",
    "decomposer-decimaux",
    "composer-decimaux",
    "comparer-decimaux",
    "ranger-decimaux",
    "encadrer-decimaux",
    "intercaler-decimaux",
    "placer-decimaux-droite"
  ],

  /* Source : mathématiques-proportionnalite.html (SECTIONS) */
  "Mathématiques::Proportionnalité": [
    "identifier-situation-proportionnalite",
    "resoudre-probleme-proportionnalite",
    "completer-tableau-proportionnalite",
    "resoudre-problemes-echelles"
  ],

  /* Source : mathématiques-probabilites.html (SECTIONS) */
  "Mathématiques::Probabilités": [
    "probabilite-chances",
    "probabilite-issues",
    "probabilite-nombre"
  ]

};

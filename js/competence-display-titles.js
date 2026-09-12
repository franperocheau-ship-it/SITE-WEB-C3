/* ─────────────────────────────────────────────────────────────────────────────
   competence-display-titles.js — Titres réels affichés sur la page d'exercice
   élève/enseignant du domaine (ex. français-conjugaison.html), pour les
   compétences du panneau "Parcours guidé" (pilotage-enseignant.html) qui ne
   recouvrent qu'UN SEUL exercice.

   Pourquoi ce fichier : pilotage-enseignant.html affichait jusqu'ici
   EXERCISE_DATA[slug].competence (un intitulé de regroupement pédagogique
   volontairement court, pensé pour le bilan enseignant — voir
   js/teacher-analytics.js splitCompetence()), et pas le titre réel de
   l'exercice. Sur 122 compétences vérifiables, seules 22 correspondaient au
   texte réellement affiché sur la page domaine (audit du 2026-09-12) —
   d'où ce fichier, qui fait le lien direct slug → texte exact de la carte,
   mot pour mot, extrait des `SECTIONS[].skills[].title` de chaque page
   domaine (résolu via CUSTOM_HREFS/CUSTOM_PAGES quand le slug affiché sur la
   page diffère du slug réel EXERCISE_DATA — même mécanique que
   js/competence-order.js, qui ne couvre que l'ORDRE, pas le texte).

   Volontairement ABSENTES de ce fichier (pilotage-enseignant.html retombe
   alors sur EXERCISE_DATA[slug].competence, comportement inchangé) : les
   compétences qui regroupent plusieurs exercices sous un seul toggle
   (Grammaire — La phrase complexe, Pronoms personnels, Les compléments
   circonstanciels ; Orthographe — Homophones grammaticaux) : un seul texte
   ne peut pas représenter fidèlement plusieurs exercices — décision prise le
   2026-09-12 de garder le libellé de regroupement `competence` pour ces 4-là,
   qui reste le bon nom pédagogique pour un groupe.

   Cas particulier déjà tranché : ortho-accorder-participe-passe-etre est
   proposé à la fois sur la page Conjugaison ("Conjuguer au passé composé
   avec être") et sur la page Orthographe ("Accorder le participe passé avec
   l'auxiliaire être") — deux titres réels pour le même exercice. Décision du
   2026-09-12 : retenir le titre Orthographe, domaine auquel cette compétence
   est rattachée sur le site (ex.competence commence par "Conjugaison" mais
   l'exercice vit dans data/orthographe.js et son backLink pointe vers
   français-orthographe.html).

   À maintenir à la main si un titre change sur une page domaine (même
   contrainte que competence-order.js : les pages domaine ne sont pas des
   modules réutilisables).
   ───────────────────────────────────────────────────────────────────────────── */

window.COMPETENCE_DISPLAY_TITLES = {

  /* Source : français-conjugaison.html (Français::Conjugaison) */
  "retrouver-infinitif-verbe-conjugue": "Retrouver l'infinitif d'un verbe conjugué puis son groupe",
  "conjuguer-etre-present": "Conjuguer être au présent",
  "conjuguer-avoir-present": "Conjuguer avoir au présent",
  "conjuguer-1er-groupe-present": "Conjuguer les verbes du 1er groupe au présent",
  "conjuguer-verbes-particuliers-1er-groupe": "Conjuguer les verbes particuliers du 1er groupe (verbes en -cer, -ger, -yer, -eler, -eter, avec modification du radical)",
  "conjuguer-2e-groupe-present": "Conjuguer les verbes du 2e groupe au présent",
  "conjuguer-3e-groupe-present": "Conjuguer les verbes fréquents du 3e groupe au présent",
  "conjuguer-imparfait": "Conjuguer à l'imparfait",
  "conjuguer-futur": "Conjuguer au futur",
  "conjuguer-passe-compose-avoir": "Conjuguer au passé composé avec avoir",
  "etre-ou-avoir": "Choisir l'auxiliaire être ou avoir au passé composé",
  "conjuguer-passe-simple": "Conjuguer au passé simple",
  "conjuguer-plus-que-parfait": "Conjuguer au plus-que-parfait",
  "conjuguer-imperatif-present": "Conjuguer à l'impératif présent",
  "conjuguer-conditionnel-present": "Conjuguer au conditionnel présent",
  "conjuguer-faire": "Conjuguer faire",
  "conjuguer-aller": "Conjuguer aller",
  "conjuguer-dire": "Conjuguer dire",
  "conjuguer-venir": "Conjuguer venir",
  "conjuguer-pouvoir": "Conjuguer pouvoir",
  "conjuguer-voir": "Conjuguer voir",
  "conjuguer-vouloir": "Conjuguer vouloir",
  "conjuguer-prendre": "Conjuguer prendre",

  /* Source : français-grammaire.html (Français::Grammaire) */
  "identifier-type-phrase": "Identifier le type et la forme d'une phrase",
  "transformer-phrase": "Transformer une phrase à la forme négative",
  "produire-formes-interrogatives": "Produire différentes formes de phrases interrogatives",
  "distinguer-phrase-simple-complexe": "Distinguer phrase simple et phrase complexe",
  "identifier-differencier-articles-definis-indefinis": "Identifier et différencier les articles définis et indéfinis",
  "identifier-differencier-determinants-demonstratifs-possessifs": "Identifier et différencier les déterminants démonstratifs et possessifs",
  "identifier-nom-phrase": "Identifier un nom",
  "identifier-adjectif": "Identifier un adjectif",
  "identifier-pronom-complement-objet": "Identifier un pronom personnel complément d'objet",
  "identifier-verbe-conjugue": "Identifier un verbe conjugué",
  "identifier-adverbe": "Identifier les adverbes",
  "identifier-preposition": "Identifier une préposition",
  "identifier-conjonction-coordination": "Identifier une conjonction de coordination",
  "identifier-conjonction-subordination": "Identifier une conjonction de subordination",
  "distinguer-conjonctions": "Distinguer conjonction de coordination et conjonction de subordination",
  "identifier-nom-noyau-gn": "Identifier le nom noyau d'un groupe nominal",
  "identifier-complement-nom": "Identifier un complément du nom",
  "distinguer-epithete-complement-nom": "Distinguer adjectif épithète et complément du nom",
  "identifier-groupe-sujet": "Identifier le groupe sujet",
  "distinguer-cod-coi": "Distinguer le complément d'objet direct (COD) et le complément d'objet indirect (COI)",
  "distinguer-attribut-sujet-complement-objet": "Distinguer l'attribut du sujet et le complément d'objet",
  "identifier-attribut-sujet": "Identifier un attribut du sujet",
  "accorder-attribut-sujet": "Accorder l'attribut du sujet avec le sujet",
  "differencier-epithete-attribut": "Différencier épithète et attribut du sujet",

  /* Source : français-orthographe.html (Français::Orthographe) */
  "ortho-accorder-determinant-nom": "Accorder le déterminant avec le nom",
  "ortho-accorder-adjectif-nom": "Accorder l'adjectif avec le nom",
  "ortho-identifier-donneur-accord": "Identifier le donneur d'accord",
  "ortho-transformer-gn-pluriel": "Transformer un groupe nominal du singulier au pluriel",
  "ortho-transformer-gn-feminin": "Transformer un groupe nominal du masculin au féminin",
  "ortho-modifier-sujet-accords": "Modifier le sujet et effectuer les accords nécessaires",
  "ortho-modifier-temps-accords": "Modifier le temps et effectuer les accords nécessaires",
  "ortho-accorder-participe-passe-cod": "Accorder le participe passé avec le COD (auxiliaire avoir)",
  "ortho-accorder-participe-passe-etre": "Accorder le participe passé avec l'auxiliaire être",
  "ortho-mots-invariables": "Orthographier les mots invariables",

  /* Source : français-lecture.html (Français::Lecture) */
  "comprendre-implicites": "Comprendre les implicites",
  "comprendre-mot-contexte": "S'appuyer sur le contexte pour comprendre un mot difficile",

  /* Source : français-lexique.html (Français::Vocabulaire) */
  "ordre-alphabetique": "Ranger dans l'ordre alphabétique",
  "trouver-synonyme": "Trouver un synonyme",
  "trouver-antonyme": "Trouver un antonyme",
  "identifier-homonyme": "Identifier un homonyme",
  "polysemie": "Comprendre la polysémie d'un mot",
  "sens-propre-figure": "Identifier le sens propre et le sens figuré",
  "famille-de-mots": "Identifier une famille de mots",
  "identifier-radical": "Identifier le radical d'un mot",
  "identifier-prefixe": "Identifier un préfixe",
  "identifier-suffixe": "Identifier un suffixe",
  "mot-derive": "Former un mot dérivé",
  "origine-mots": "Comprendre l'origine des mots (latin, grec)",
  "regrouper-par-theme": "Regrouper des mots par thème",
  "champ-lexical": "Identifier un champ lexical",
  "mot-adapte-contexte": "Choisir le mot adapté au contexte",
  "niveaux-de-langue": "Distinguer les niveaux de langue",

  /* Source : mathématiques-nombres-entiers.html (Mathématiques::Nombres entiers) */
  "ecrire-nombre-entier-chiffres": "Écrire un nombre entier en chiffres",
  "ecrire-nombre-entier-lettres": "Écrire un nombre entier en lettres",
  "identifier-valeur-chiffre-position": "Identifier la valeur d'un chiffre selon sa position",
  "decomposer-nombre-entier": "Décomposer un nombre entier",
  "composer-nombre-entier": "Composer un nombre à partir de sa décomposition",
  "comparer-nombres-entiers": "Comparer deux nombres entiers",
  "ranger-nombres-entiers": "Ranger des nombres entiers",
  "encadrer-nombre-entier": "Encadrer un nombre entier",
  "droite-graduee-nombres-entiers": "Placer un nombre sur une droite graduée",
  "arrondir-nombre-entier": "Arrondir un nombre entier",
  "arrondi-adapte-probleme": "Choisir l'arrondi adapté à la situation",

  /* Source : mathématiques-fractions.html (Mathématiques::Fractions) */
  "lire-fraction": "Lire une fraction",
  "representer-fraction": "Représenter une fraction",
  "placer-fraction-droite-graduee": "Placer une fraction sur une droite graduée",
  "comparer-fractions": "Comparer deux fractions",
  "encadrer-fraction": "Encadrer une fraction",
  "decomposer-fraction-partie-entiere": "Décomposer une fraction (partie entière + fraction)",
  "utiliser-fractions-problemes": "Utiliser les fractions dans des problèmes",
  "fraction-decimale-grille-droite": "Fraction décimale — Grille et droite graduée",
  "fraction-decimale-tableau-numeration": "Fraction décimale — Tableau de numération",

  /* Source : mathématiques-nombres-decimaux.html (Mathématiques::Nombres décimaux) */
  "associer-decimal-fraction": "Associer une fraction décimale à un nombre décimal",
  "decomposer-decimaux": "Décomposer un nombre décimal",
  "composer-decimaux": "Composer un nombre décimal à partir d'une décomposition",
  "comparer-decimaux": "Comparer deux nombres décimaux",
  "ranger-decimaux": "Ranger des nombres décimaux",
  "encadrer-decimaux": "Encadrer un nombre décimal",
  "intercaler-decimaux": "Intercaler un décimal entre deux nombres",
  "placer-decimaux-droite": "Placer un décimal sur une droite graduée",

  /* Source : mathématiques-proportionnalite.html (Mathématiques::Proportionnalité) */
  "identifier-situation-proportionnalite": "Identifier une situation de proportionnalité",
  "resoudre-probleme-proportionnalite": "Résoudre un problème de proportionnalité",
  "completer-tableau-proportionnalite": "Compléter un tableau de proportionnalité",
  "resoudre-problemes-echelles": "Résoudre des problèmes d'échelles",

  /* Source : mathématiques-probabilites.html (Mathématiques::Probabilités) */
  "probabilite-chances": "Utiliser l'expression « a chances sur b »",
  "probabilite-issues": "Dénombrer les issues possibles et favorables",
  "probabilite-nombre": "Exprimer la probabilité comme un nombre",
};

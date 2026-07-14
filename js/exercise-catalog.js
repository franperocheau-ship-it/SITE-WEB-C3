/* ─────────────────────────────────────────────────────────────────────────────
   exercise-catalog.js — Arborescence Matière > Sous-thème pour le panneau
   "Parcours guidé" de l'espace enseignant (classes-enseignant.html).

   Source de vérité unique pour cette arborescence. Contrairement à un
   regroupement automatique par domaine/competence, l'ordre et les
   sous-thèmes ci-dessous reproduisent tels quels les pages du site
   présentées aux élèves (français-grammaire.html, français-conjugaison.html,
   français-orthographe.html, mathématiques-nombres-entiers.html,
   mathématiques-fractions.html, histoire.html) : mêmes regroupements de
   sections, même ordre pédagogique d'affichage.

   Chaque slug doit correspondre à une clé de EXERCISE_DATA (exercise-data.js).
   Un sous-thème vide (ex. Lexique, Nombres décimaux) signale une rubrique du
   site pas encore migrée vers le moteur générique exercise.html?slug= — ses
   exercices existent sous une autre forme (moteur dédié) et n'apparaissent
   donc pas ici.

   Tout slug présent dans EXERCISE_DATA mais absent de ce catalogue (nouvel
   exercice ajouté sans mise à jour de ce fichier, etc.) est automatiquement
   affiché dans la section "Autres exercices" du panneau enseignant — aucun
   exercice n'est donc jamais invisible.
   ────────────────────────────────────────────────────────────────────────── */

const EXERCISE_CATALOG = [
  {
    matiere: "Français",
    sousThemes: [
      {
        nom: "Grammaire",
        slugs: [
          "identifier-phrase-declarative",
          "identifier-phrase-interrogative",
          "identifier-phrase-imperative",
          "identifier-phrase-negative",
          "identifier-phrase-exclamative",
          "transformer-declarative-interrogative",
          "transformer-affirmative-negative",
          "produire-formes-interrogatives",
          "distinguer-phrase-simple-complexe",
          "identifier-article-defini",
          "identifier-article-indefini",
          "identifier-determinant-possessif",
          "identifier-determinant-demonstratif",
          "identifier-nom-phrase",
          "identifier-adjectif",
          "distinguer-pronom-sujet-complement",
          "remplacer-gn-sujet-pronom",
          "distinguer-epithete-complement-nom",
          "accord-verbe-sujet-inverse",
          "differencier-epithete-attribut"
        ]
      },
      {
        nom: "Conjugaison",
        slugs: [
          "retrouver-infinitif-verbe-conjugue",
          "conjuguer-etre-present",
          "conjuguer-avoir-present",
          "conjuguer-1er-groupe-present",
          "conjuguer-verbes-particuliers-1er-groupe",
          "conjuguer-2e-groupe-present",
          "conjuguer-3e-groupe-present",
          "conjuguer-imparfait",
          "conjuguer-futur",
          "identifier-auxiliaire",
          "retrouver-infinitif-passe-compose",
          "conjuguer-passe-compose-avoir",
          "etre-ou-avoir",
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
        ]
      },
      {
        nom: "Orthographe",
        slugs: [
          "ortho-accorder-determinant-nom",
          "ortho-accorder-adjectif-nom",
          "ortho-identifier-donneur-accord",
          "ortho-transformer-gn-pluriel",
          "ortho-transformer-gn-feminin",
          "ortho-modifier-sujet-accords",
          "ortho-modifier-temps-accords",
          "ortho-accorder-participe-passe-etre",
          "ortho-accorder-participe-passe-cod",
          "ortho-mots-invariables"
        ]
      },
      {
        /* français-lexique.html utilise un moteur de quiz dédié (LEX_COMPRENDRE /
           LEX_CONSTRUIRE / LEX_RELATIONS), pas exercise.html?slug= : rien à
           lister ici tant que ces exercices ne migrent pas vers EXERCISE_DATA. */
        nom: "Lexique",
        slugs: []
      }
    ]
  },
  {
    matiere: "Mathématiques",
    sousThemes: [
      {
        nom: "Nombres entiers",
        slugs: [
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
        ]
      },
      {
        nom: "Fractions",
        slugs: [
          "lire-fraction",
          "representer-fraction",
          "placer-fraction-droite-graduee",
          "comparer-fractions",
          "encadrer-fraction",
          "decomposer-fraction-partie-entiere",
          "utiliser-fractions-problemes",
          "fraction-decimale-grille-droite",
          "fraction-decimale-tableau-numeration"
        ]
      },
      {
        /* mathématiques-nombres-decimaux.html existe mais ne déclare encore
           aucun EXERCISE_SLUGS : rubrique publiée sans exercice actif. */
        nom: "Nombres décimaux",
        slugs: []
      },
      {
        /* mathématiques-grandeurs-et-mesures.html : idem, aucun exercice actif. */
        nom: "Grandeurs et mesures",
        slugs: []
      }
    ]
  },
  {
    matiere: "Histoire",
    sousThemes: [
      {
        nom: "Frise chronologique (EMILE)",
        slugs: [
          "vocabulaire-revolution-francaise",
          "vocabulaire-napoleon-bonaparte"
        ]
      }
    ]
  }
];

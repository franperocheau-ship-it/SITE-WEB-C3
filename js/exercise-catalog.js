/* ─────────────────────────────────────────────────────────────────────────────
   exercise-catalog.js — Registre des exercices "autonomes" pour le panneau
   "Parcours guidé" de l'espace enseignant (classes-enseignant.html).

   La classification principale du parcours guidé est automatique : chaque
   exercice de EXERCISE_DATA (exercise-data.js) est classé par
   Matière (domaine) > Sous-thème (préfixe de `competence` avant " — "),
   directement dans classes-enseignant.html. Aucune liste à maintenir pour
   ces exercices-là — un nouvel exercice ajouté à EXERCISE_DATA apparaît
   automatiquement au bon endroit.

   Ce fichier ne couvre que les exercices qui existent sur le site mais HORS
   EXERCISE_DATA (pages autonomes avec leur propre moteur, pas pilotées par
   exercise.html?slug=) : ils n'ont pas de champ `competence` à partir duquel
   déduire une catégorie, donc leur rattachement est explicite ici.

   Vocabulaire n'est plus listé ici depuis sa migration vers exercise.html?slug=
   (data/vocabulaire.js, competence: "Vocabulaire") : classification désormais
   automatique comme le reste d'EXERCISE_DATA. Les 10 homophones grammaticaux
   (ortho-distinguer-*.html) ont suivi le même chemin (data/orthographe-
   homophones.js, competence: "Orthographe — Homophones grammaticaux") — le
   groupe "Homophones" reste défini dans EXERCISE_CATALOG_GROUPS ci-dessous
   (purement cosmétique, indépendant du statut autonome/EXERCISE_DATA).

   Tout exercice qui n'est NI dans EXERCISE_DATA NI listé ici est exclu du
   parcours guidé avec un console.warn (voir buildExerciseTree dans
   classes-enseignant.html) — volontairement, pas de section fourre-tout.
   ────────────────────────────────────────────────────────────────────────── */

const EXERCISE_CATALOG_AUTONOMOUS = [

  /* ── Algèbre (pages autonomes dédiées, hub algebre.html) ─────────────────── */
  { slug: "algebre-symboles-mysteres",   title: "Symboles mystères",        category: "Mathématiques", subCategory: "Algèbre" },
  { slug: "algebre-systemes-equations",  title: "Systèmes d'équations",     category: "Mathématiques", subCategory: "Algèbre" }

];

/* ─────────────────────────────────────────────────────────────────────────────
   EXERCISE_CATALOG_GROUPS — 3e niveau optionnel "groupes" à l'intérieur d'un
   sous-thème (Matière > Sous-thème > Groupe > Exercice). Purement cosmétique
   dans le panneau enseignant : simple libellé au-dessus des exercices
   concernés, ni case à cocher, ni repli propre.

   Clé : EXERCISE_CATALOG_GROUPS[domaine][sous-thème] = tableau ordonné de
   { groupe, slugs }. Un sous-thème absent d'ici reste affiché à plat, trié
   par titre (comportement par défaut). Un slug du sous-thème non couvert par
   un groupe est ajouté à la fin, sans étiquette.
   ────────────────────────────────────────────────────────────────────────── */

const EXERCISE_CATALOG_GROUPS = {
  "Français": {
    "Conjugaison": [
      { groupe: "Identifier le verbe", slugs: [
        "retrouver-infinitif-verbe-conjugue"
      ] },
      { groupe: "Présent de l'indicatif", slugs: [
        "conjuguer-etre-present",
        "conjuguer-avoir-present",
        "conjuguer-1er-groupe-present",
        "conjuguer-verbes-particuliers-1er-groupe",
        "conjuguer-2e-groupe-present",
        "conjuguer-3e-groupe-present",
        "conjuguer-faire",
        "conjuguer-aller",
        "conjuguer-dire",
        "conjuguer-venir",
        "conjuguer-pouvoir",
        "conjuguer-voir",
        "conjuguer-vouloir",
        "conjuguer-prendre"
      ] },
      { groupe: "Imparfait", slugs: [
        "conjuguer-imparfait"
      ] },
      { groupe: "Futur simple", slugs: [
        "conjuguer-futur"
      ] },
      { groupe: "Passé composé", slugs: [
        "conjuguer-passe-compose-avoir",
        "etre-ou-avoir"
      ] },
      { groupe: "Passé simple", slugs: [
        "conjuguer-passe-simple"
      ] },
      { groupe: "Plus-que-parfait", slugs: [
        "conjuguer-plus-que-parfait"
      ] },
      { groupe: "Impératif présent", slugs: [
        "conjuguer-imperatif-present"
      ] },
      { groupe: "Conditionnel présent", slugs: [
        "conjuguer-conditionnel-present"
      ] }
    ],
    "Orthographe": [
      { groupe: "Homophones", slugs: [
        "ortho-distinguer-a-a",
        "ortho-distinguer-et-est",
        "ortho-distinguer-son-sont",
        "ortho-distinguer-on-ont",
        "ortho-distinguer-ce-se",
        "ortho-distinguer-ces-ses-cest-sest",
        "ortho-distinguer-leur-leurs",
        "ortho-distinguer-tout-tous-toute-toutes",
        "ortho-distinguer-ou-ou",
        "ortho-distinguer-quel-quelle-quels-quelles"
      ] }
    ]
  },
  "Mathématiques": {
    /* Ordre du site (mathématiques-nombres-decimaux.html, section
       "Comparer et ranger") plutôt que l'ordre alphabétique par défaut. */
    "Nombres décimaux": [
      { groupe: "Fractions décimales", slugs: [
        "associer-decimal-fraction",
        "fraction-decimale-grille-droite",
        "fraction-decimale-tableau-numeration"
      ] },
      { groupe: "Décomposer et composer", slugs: [
        "decomposer-decimaux",
        "composer-decimaux"
      ] },
      { groupe: "Comparer, ranger, encadrer, intercaler", slugs: [
        "comparer-decimaux",
        "ranger-decimaux",
        "encadrer-decimaux",
        "intercaler-decimaux"
      ] },
      { groupe: "Représenter les décimaux", slugs: [
        "placer-decimaux-droite"
      ] }
    ],
    /* Ordre du hub algebre.html : progression de difficulté. */
    "Algèbre": [
      { groupe: "Progression", slugs: [
        "algebre-symboles-mysteres",
        "algebre-systemes-equations"
      ] }
    ]
  }
};

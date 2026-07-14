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

   - Homophones grammaticaux (ortho-distinguer-*.html, français-orthographe.html)
     → Français / Orthographe (groupe "Homophones", voir EXERCISE_CATALOG_GROUPS)
   - Lexique (js/lex-comprendre.js, js/lex-construire.js, js/lex-relations.js,
     ouverts depuis français-lexique.html)
     → Français / Lexique
   - identifier-verbe-conjugue (francais/grammaire/identifier-verbe-conjugue/)
     → Français / Grammaire

   Tout exercice qui n'est NI dans EXERCISE_DATA NI listé ici est exclu du
   parcours guidé avec un console.warn (voir buildExerciseTree dans
   classes-enseignant.html) — volontairement, pas de section fourre-tout.
   ────────────────────────────────────────────────────────────────────────── */

const EXERCISE_CATALOG_AUTONOMOUS = [

  /* ── Homophones grammaticaux (français-orthographe.html → CUSTOM_HREFS) ── */
  { slug: "ortho-distinguer-a-a",               title: "Distinguer a / à",                            category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-et-est",            title: "Distinguer et / est",                         category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-son-sont",          title: "Distinguer son / sont",                       category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-on-ont",            title: "Distinguer on / ont",                         category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-ce-se",             title: "Distinguer ce / se",                          category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-ces-ses-cest-sest", title: "ces / ses / c'est / s'est / sait / sais",     category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-leur-leurs",        title: "Distinguer leur / leurs",                     category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-tout",              title: "tout, tous, toute, toutes",                   category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-ou-ou",             title: "Distinguer ou / où",                          category: "Français", subCategory: "Orthographe" },
  { slug: "ortho-distinguer-quel",              title: "Distinguer quel(s), quelle(s), qu'elle(s)",   category: "Français", subCategory: "Orthographe" },

  /* ── Lexique (js/lex-comprendre.js) ──────────────────────────────────────── */
  { slug: "ordre-alphabetique",  title: "Ranger dans l'ordre alphabétique",               category: "Français", subCategory: "Lexique" },
  { slug: "trouver-synonyme",    title: "Trouver un synonyme",                            category: "Français", subCategory: "Lexique" },
  { slug: "trouver-antonyme",    title: "Trouver un antonyme",                            category: "Français", subCategory: "Lexique" },
  { slug: "identifier-homonyme", title: "Identifier un homonyme",                         category: "Français", subCategory: "Lexique" },
  { slug: "polysemie",           title: "Comprendre la polysémie d'un mot",               category: "Français", subCategory: "Lexique" },
  { slug: "sens-propre-figure",  title: "Identifier le sens propre et le sens figuré",    category: "Français", subCategory: "Lexique" },

  /* ── Lexique (js/lex-construire.js) ──────────────────────────────────────── */
  { slug: "famille-de-mots",    title: "Identifier une famille de mots",                 category: "Français", subCategory: "Lexique" },
  { slug: "identifier-radical", title: "Identifier le radical d'un mot",                 category: "Français", subCategory: "Lexique" },
  { slug: "identifier-prefixe", title: "Identifier un préfixe",                          category: "Français", subCategory: "Lexique" },
  { slug: "identifier-suffixe", title: "Identifier un suffixe",                          category: "Français", subCategory: "Lexique" },
  { slug: "mot-derive",         title: "Former un mot dérivé",                           category: "Français", subCategory: "Lexique" },
  { slug: "origine-mots",       title: "Comprendre l'origine des mots (latin, grec)",    category: "Français", subCategory: "Lexique" },

  /* ── Lexique (js/lex-relations.js) ───────────────────────────────────────── */
  { slug: "regrouper-par-theme", title: "Regrouper des mots par thème",       category: "Français", subCategory: "Lexique" },
  { slug: "champ-lexical",       title: "Identifier un champ lexical",       category: "Français", subCategory: "Lexique" },
  { slug: "mot-adapte-contexte", title: "Choisir le mot adapté au contexte", category: "Français", subCategory: "Lexique" },
  { slug: "niveaux-de-langue",   title: "Distinguer les niveaux de langue",  category: "Français", subCategory: "Lexique" },

  /* ── Grammaire (page autonome dédiée) ────────────────────────────────────── */
  { slug: "identifier-verbe-conjugue", title: "Identifier le verbe conjugué", category: "Français", subCategory: "Grammaire" },

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
        "identifier-auxiliaire",
        "retrouver-infinitif-passe-compose",
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
        "ortho-distinguer-tout",
        "ortho-distinguer-ou-ou",
        "ortho-distinguer-quel"
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

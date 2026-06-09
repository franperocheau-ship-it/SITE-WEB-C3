/* ── Centralized exercise dataset ──────────────────────────────────────────
   Each key is a skill slug. Adding a new entry here is all that is needed
   to make the generic ExercisePage support a new competency.
   ────────────────────────────────────────────────────────────────────────── */

const EXERCISE_DATA = {

  "retrouver-infinitif-verbe-conjugue": {
    title: "Retrouver l'infinitif d'un verbe conjugué puis son groupe",
    levels: ["CM1", "CM2", "6e"],
    type: "infinitif-et-groupe",
    questionsPerSession: 20,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── Question bank ──────────────────────────────────────────────────────
       difficulty 1 = 1er groupe   (verbs in -er)
       difficulty 2 = 2e groupe    (verbs in -ir/-issant)
       difficulty 3 = 3e groupe    (all others)
       choices must contain exactly the infinitive + 3 distractors.
    ──────────────────────────────────────────────────────────────────────── */
    bank: [
      /* 1er groupe */
      {
        sentence:   "Nous mangeons.",
        verb:       "mangeons",
        infinitive: "manger",
        group:      "1er groupe",
        difficulty: 1,
        choices:    ["manger", "mangé", "mangeant", "mangions"]
      },
      {
        sentence:   "Ils jouaient.",
        verb:       "jouaient",
        infinitive: "jouer",
        group:      "1er groupe",
        difficulty: 1,
        choices:    ["jouer", "joué", "jouant", "jouerait"]
      },
      {
        sentence:   "Il chantait.",
        verb:       "chantait",
        infinitive: "chanter",
        group:      "1er groupe",
        difficulty: 1,
        choices:    ["chanter", "chanté", "chantant", "chantons"]
      },
      {
        sentence:   "Elles parlaient.",
        verb:       "parlaient",
        infinitive: "parler",
        group:      "1er groupe",
        difficulty: 1,
        choices:    ["parler", "parlé", "parlant", "parlera"]
      },
      {
        sentence:   "Tu aimais.",
        verb:       "aimais",
        infinitive: "aimer",
        group:      "1er groupe",
        difficulty: 1,
        choices:    ["aimer", "aimé", "aimant", "aimait"]
      },
      {
        sentence:   "Nous donnons.",
        verb:       "donnons",
        infinitive: "donner",
        group:      "1er groupe",
        difficulty: 1,
        choices:    ["donner", "donné", "donnant", "donnons"]
      },

      /* 2e groupe */
      {
        sentence:   "Ils finissaient.",
        verb:       "finissaient",
        infinitive: "finir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["finir", "fini", "finissant", "finissait"]
      },
      {
        sentence:   "Elle rougira.",
        verb:       "rougira",
        infinitive: "rougir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["rougir", "rouge", "rougi", "rougissant"]
      },
      {
        sentence:   "Ils grandissaient.",
        verb:       "grandissaient",
        infinitive: "grandir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["grandir", "grandi", "grandissant", "grandissait"]
      },
      {
        sentence:   "Nous choisissons.",
        verb:       "choisissons",
        infinitive: "choisir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["choisir", "choisi", "choisissant", "choisissait"]
      },
      {
        sentence:   "Vous obéissez.",
        verb:       "obéissez",
        infinitive: "obéir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["obéir", "obéi", "obéissant", "obéissait"]
      },

      /* 3e groupe */
      {
        sentence:   "Ils prennent.",
        verb:       "prennent",
        infinitive: "prendre",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["prendre", "pris", "prenant", "prenait"]
      },
      {
        sentence:   "Je voyais.",
        verb:       "voyais",
        infinitive: "voir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["voir", "vu", "voyant", "vois"]
      },
      {
        sentence:   "Ils diront.",
        verb:       "diront",
        infinitive: "dire",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["dire", "dit", "disant", "dirait"]
      },
      {
        sentence:   "Ils feront.",
        verb:       "feront",
        infinitive: "faire",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["faire", "fait", "faisant", "ferait"]
      },
      {
        sentence:   "Je vendais.",
        verb:       "vendais",
        infinitive: "vendre",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["vendre", "vendu", "vendant", "vendit"]
      },
      {
        sentence:   "Il venait.",
        verb:       "venait",
        infinitive: "venir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["venir", "venu", "venant", "venait"]
      },
      {
        sentence:   "Ils couraient.",
        verb:       "couraient",
        infinitive: "courir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["courir", "couru", "courant", "courait"]
      },
      {
        sentence:   "Elle écrira.",
        verb:       "écrira",
        infinitive: "écrire",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["écrire", "écrit", "écrivant", "écrivait"]
      },
      {
        sentence:   "Nous entendions.",
        verb:       "entendions",
        infinitive: "entendre",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["entendre", "entendu", "entendant", "entendait"]
      },
      {
        sentence:   "Je lisais.",
        verb:       "lisais",
        infinitive: "lire",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["lire", "lu", "lisant", "lisait"]
      },
      {
        sentence:   "Ils dormaient.",
        verb:       "dormaient",
        infinitive: "dormir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["dormir", "dormi", "dormant", "dormait"]
      },

      /* 2e groupe — supplémentaires */
      {
        sentence:   "Elle réfléchissait.",
        verb:       "réfléchissait",
        infinitive: "réfléchir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["réfléchir", "réfléchi", "réfléchissant", "réfléchissait"]
      },
      {
        sentence:   "Ils applaudissaient.",
        verb:       "applaudissaient",
        infinitive: "applaudir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["applaudir", "applaudi", "applaudissant", "applaudissait"]
      },
      {
        sentence:   "Vous réussissez.",
        verb:       "réussissez",
        infinitive: "réussir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["réussir", "réussi", "réussissant", "réussissait"]
      },
      {
        sentence:   "Il punissait.",
        verb:       "punissait",
        infinitive: "punir",
        group:      "2e groupe",
        difficulty: 2,
        choices:    ["punir", "puni", "punissant", "punissait"]
      },

      /* 3e groupe — verbes en -ir (sans -issant) */
      {
        sentence:   "Elle partait.",
        verb:       "partait",
        infinitive: "partir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["partir", "parti", "partant", "partait"]
      },
      {
        sentence:   "Ils sortaient.",
        verb:       "sortaient",
        infinitive: "sortir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["sortir", "sorti", "sortant", "sortait"]
      },
      {
        sentence:   "Il tenait.",
        verb:       "tenait",
        infinitive: "tenir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["tenir", "tenu", "tenant", "tenait"]
      },
      {
        sentence:   "Ils sentaient.",
        verb:       "sentaient",
        infinitive: "sentir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["sentir", "senti", "sentant", "sentait"]
      },
      {
        sentence:   "Elle servait.",
        verb:       "servait",
        infinitive: "servir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["servir", "servi", "servant", "servait"]
      },
      {
        sentence:   "Il mourra.",
        verb:       "mourra",
        infinitive: "mourir",
        group:      "3e groupe",
        difficulty: 3,
        choices:    ["mourir", "mort", "mourant", "mourrait"]
      }
    ]
  },

  /* ── ─────────────────────────────────────────────────────────────────────── */

  "conjuguer-etre-present": {
    title: "Conjuguer le verbe être au présent",
    verb: "être",
    levels: ["CM1", "CM2", "6e"],
    exerciseTypes: ["fill-blank", "multiple-choice", "matching", "find-error", "conjugation-table", "guess-subject", "word-order"],
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── fill-blank & multiple-choice ── */
    bank: [
      { subject: "je",    sentence: "Je ___ content.",                answer: "suis",   choices: ["suis",   "est",    "sommes", "êtes"],   difficulty: 1 },
      { subject: "je",    sentence: "Je ___ à l'école.",              answer: "suis",   choices: ["suis",   "est",    "es",     "êtes"],   difficulty: 1 },
      { subject: "je",    sentence: "Je ___ prêt.",                   answer: "suis",   choices: ["suis",   "est",    "sommes", "sont"],   difficulty: 1 },
      { subject: "tu",    sentence: "Tu ___ gentil.",                 answer: "es",     choices: ["es",     "est",    "suis",   "êtes"],   difficulty: 1 },
      { subject: "tu",    sentence: "Tu ___ en retard.",              answer: "es",     choices: ["es",     "est",    "suis",   "êtes"],   difficulty: 1 },
      { subject: "tu",    sentence: "Tu ___ mon ami.",                answer: "es",     choices: ["es",     "est",    "suis",   "êtes"],   difficulty: 1 },
      { subject: "il",    sentence: "Il ___ grand.",                  answer: "est",    choices: ["est",    "es",     "suis",   "sont"],   difficulty: 1 },
      { subject: "elle",  sentence: "Elle ___ fatiguée.",             answer: "est",    choices: ["est",    "es",     "suis",   "sommes"], difficulty: 1 },
      { subject: "on",    sentence: "On ___ dehors.",                 answer: "est",    choices: ["est",    "sont",   "êtes",   "suis"],   difficulty: 2 },
      { subject: "nous",  sentence: "Nous ___ contents.",             answer: "sommes", choices: ["sommes", "êtes",   "sont",   "est"],    difficulty: 2 },
      { subject: "nous",  sentence: "Nous ___ en classe.",            answer: "sommes", choices: ["sommes", "êtes",   "sont",   "est"],    difficulty: 2 },
      { subject: "nous",  sentence: "Nous ___ amis.",                 answer: "sommes", choices: ["sommes", "êtes",   "sont",   "est"],    difficulty: 2 },
      { subject: "vous",  sentence: "Vous ___ prêts.",                answer: "êtes",   choices: ["êtes",   "sommes", "est",    "sont"],   difficulty: 2 },
      { subject: "vous",  sentence: "Vous ___ en avance.",            answer: "êtes",   choices: ["êtes",   "sommes", "est",    "sont"],   difficulty: 2 },
      { subject: "vous",  sentence: "Vous ___ les bienvenus.",        answer: "êtes",   choices: ["êtes",   "sommes", "est",    "sont"],   difficulty: 2 },
      { subject: "ils",   sentence: "Ils ___ dehors.",                answer: "sont",   choices: ["sont",   "sommes", "est",    "êtes"],   difficulty: 3 },
      { subject: "elles", sentence: "Elles ___ contentes.",           answer: "sont",   choices: ["sont",   "sommes", "est",    "êtes"],   difficulty: 3 },
      { subject: "ils",   sentence: "Ils ___ dans la cour.",          answer: "sont",   choices: ["sont",   "sommes", "est",    "êtes"],   difficulty: 3 },
      { subject: "il",    sentence: "Le chien ___ malade.",           answer: "est",    choices: ["est",    "es",     "suis",   "sont"],   difficulty: 2 },
      { subject: "elles", sentence: "Les fleurs ___ belles.",         answer: "sont",   choices: ["sont",   "est",    "êtes",   "sommes"], difficulty: 2 },
      { subject: "nous",  sentence: "Mon frère et moi ___ contents.", answer: "sommes", choices: ["sommes", "êtes",   "sont",   "est"],    difficulty: 3 },
      { subject: "vous",  sentence: "Toi et ton ami ___ en retard.",  answer: "êtes",   choices: ["êtes",   "sommes", "sont",   "est"],    difficulty: 3 }
    ],

    /* ── matching & conjugation-table (6 forms, one per subject) ── */
    conjugationForms: [
      { subject: "Je",           answer: "suis",   choices: ["suis",   "es",     "est",  "êtes"]   },
      { subject: "Tu",           answer: "es",     choices: ["es",     "est",    "suis", "êtes"]   },
      { subject: "Il / Elle",    answer: "est",    choices: ["est",    "es",     "suis", "sont"]   },
      { subject: "Nous",         answer: "sommes", choices: ["sommes", "êtes",   "sont", "est"]    },
      { subject: "Vous",         answer: "êtes",   choices: ["êtes",   "sommes", "est",  "sont"]   },
      { subject: "Ils / Elles",  answer: "sont",   choices: ["sont",   "sommes", "est",  "êtes"]   }
    ],

    /* ── guess-subject ── */
    guessSubjectBank: [
      { sentence: "_____ est dans la cour.",      answer: "Il",    choices: ["Je",   "Tu",   "Il",   "Nous"] },
      { sentence: "_____ suis à l'école.",        answer: "Je",    choices: ["Je",   "Tu",   "Il",   "Nous"] },
      { sentence: "_____ es mon ami.",            answer: "Tu",    choices: ["Je",   "Tu",   "Il",   "Vous"] },
      { sentence: "_____ sommes en classe.",      answer: "Nous",  choices: ["Je",   "Nous", "Vous", "Ils"]  },
      { sentence: "_____ êtes en retard.",        answer: "Vous",  choices: ["Tu",   "Nous", "Vous", "Ils"]  },
      { sentence: "_____ sont dans le jardin.",   answer: "Ils",   choices: ["Il",   "Nous", "Vous", "Ils"]  },
      { sentence: "_____ est fatiguée.",          answer: "Elle",  choices: ["Je",   "Tu",   "Il",   "Elle"] },
      { sentence: "_____ êtes très gentils.",     answer: "Vous",  choices: ["Nous", "Vous", "Ils",  "Elles"]},
      { sentence: "_____ sont heureuses.",        answer: "Elles", choices: ["Il",   "Nous", "Ils",  "Elles"]},
      { sentence: "_____ sommes dans le parc.",   answer: "Nous",  choices: ["Je",   "Nous", "Vous", "Ils"]  },
      { sentence: "_____ suis très content.",     answer: "Je",    choices: ["Je",   "Tu",   "Nous", "Vous"] },
      { sentence: "_____ es en avance.",          answer: "Tu",    choices: ["Je",   "Tu",   "Il",   "Vous"] }
    ],

    /* ── find-error ── */
    findErrorBank: [
      { sentence: "Nous est dans le salon.",   errorWord: "est",    correction: "Nous sommes dans le salon."   },
      { sentence: "Je es content.",            errorWord: "es",     correction: "Je suis content."             },
      { sentence: "Ils est dans la cour.",     errorWord: "est",    correction: "Ils sont dans la cour."       },
      { sentence: "Vous suis prêts.",          errorWord: "suis",   correction: "Vous êtes prêts."             },
      { sentence: "Tu sont gentil.",           errorWord: "sont",   correction: "Tu es gentil."                },
      { sentence: "Elle sommes fatiguée.",     errorWord: "sommes", correction: "Elle est fatiguée."           },
      { sentence: "Nous êtes en classe.",      errorWord: "êtes",   correction: "Nous sommes en classe."       },
      { sentence: "Je sommes prêt.",           errorWord: "sommes", correction: "Je suis prêt."                },
      { sentence: "Ils suis dehors.",          errorWord: "suis",   correction: "Ils sont dehors."             },
      { sentence: "Tu est mon ami.",           errorWord: "est",    correction: "Tu es mon ami."               },
      { sentence: "Vous sont rapides.",        errorWord: "sont",   correction: "Vous êtes rapides."           },
      { sentence: "Elles es contentes.",       errorWord: "es",     correction: "Elles sont contentes."        }
    ],

    /* ── word-order ── */
    wordOrderBank: [
      { words: ["je",    "suis",   "fatigué"],           answer: "je suis fatigué."           },
      { words: ["tu",    "es",     "gentil"],            answer: "tu es gentil."               },
      { words: ["il",    "est",    "content"],           answer: "il est content."             },
      { words: ["nous",  "sommes", "prêts"],             answer: "nous sommes prêts."          },
      { words: ["vous",  "êtes",   "en",    "retard"],   answer: "vous êtes en retard."        },
      { words: ["ils",   "sont",   "dehors"],            answer: "ils sont dehors."            },
      { words: ["elle",  "est",    "heureuse"],          answer: "elle est heureuse."          },
      { words: ["nous",  "sommes", "en",    "classe"],   answer: "nous sommes en classe."      },
      { words: ["elles", "sont",   "contentes"],         answer: "elles sont contentes."       },
      { words: ["tu",    "es",     "en",    "avance"],   answer: "tu es en avance."            },
      { words: ["je",    "suis",   "très",  "content"],  answer: "je suis très content."       },
      { words: ["vous",  "êtes",   "très",  "gentils"],  answer: "vous êtes très gentils."     }
    ]
  },

  "conjuguer-1er-groupe-present": {
    title: "Conjuguer les verbes réguliers du 1er groupe au présent",
    type: "text-input",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── chanter ── */
      { subject: "je",    infinitive: "chanter",    sentence: "Je ________ une chanson.",           answer: "chante",      difficulty: 1 },
      { subject: "tu",    infinitive: "chanter",    sentence: "Tu ________ très bien.",             answer: "chantes",     difficulty: 1 },
      { subject: "il",    infinitive: "chanter",    sentence: "Il ________ dans le jardin.",        answer: "chante",      difficulty: 1 },
      { subject: "elle",  infinitive: "chanter",    sentence: "Elle ________ sous la pluie.",       answer: "chante",      difficulty: 1 },
      { subject: "nous",  infinitive: "chanter",    sentence: "Nous ________ en chœur.",            answer: "chantons",    difficulty: 2 },
      { subject: "vous",  infinitive: "chanter",    sentence: "Vous ________ une comptine.",        answer: "chantez",     difficulty: 2 },
      { subject: "ils",   infinitive: "chanter",    sentence: "Ils ________ à la fête.",            answer: "chantent",    difficulty: 2 },

      /* ── jouer ── */
      { subject: "je",    infinitive: "jouer",      sentence: "Je ________ au football.",           answer: "joue",        difficulty: 1 },
      { subject: "tu",    infinitive: "jouer",      sentence: "Tu ________ dans la cour.",          answer: "joues",       difficulty: 1 },
      { subject: "elle",  infinitive: "jouer",      sentence: "Elle ________ au tennis.",           answer: "joue",        difficulty: 1 },
      { subject: "nous",  infinitive: "jouer",      sentence: "Nous ________ ensemble.",            answer: "jouons",      difficulty: 2 },
      { subject: "vous",  infinitive: "jouer",      sentence: "Vous ________ aux cartes.",          answer: "jouez",       difficulty: 2 },
      { subject: "elles", infinitive: "jouer",      sentence: "Elles ________ à la marelle.",       answer: "jouent",      difficulty: 2 },

      /* ── parler ── */
      { subject: "je",    infinitive: "parler",     sentence: "Je ________ à mon ami.",             answer: "parle",       difficulty: 1 },
      { subject: "tu",    infinitive: "parler",     sentence: "Tu ________ trop fort.",             answer: "parles",      difficulty: 1 },
      { subject: "il",    infinitive: "parler",     sentence: "Il ________ avec la maîtresse.",     answer: "parle",       difficulty: 1 },
      { subject: "nous",  infinitive: "parler",     sentence: "Nous ________ en français.",         answer: "parlons",     difficulty: 2 },
      { subject: "vous",  infinitive: "parler",     sentence: "Vous ________ entre vous.",          answer: "parlez",      difficulty: 2 },
      { subject: "ils",   infinitive: "parler",     sentence: "Ils ________ de leur voyage.",       answer: "parlent",     difficulty: 2 },

      /* ── regarder ── */
      { subject: "je",    infinitive: "regarder",   sentence: "Je ________ la télévision.",         answer: "regarde",     difficulty: 1 },
      { subject: "tu",    infinitive: "regarder",   sentence: "Tu ________ par la fenêtre.",        answer: "regardes",    difficulty: 1 },
      { subject: "elle",  infinitive: "regarder",   sentence: "Elle ________ les nuages.",          answer: "regarde",     difficulty: 1 },
      { subject: "nous",  infinitive: "regarder",   sentence: "Nous ________ un film.",             answer: "regardons",   difficulty: 2 },
      { subject: "vous",  infinitive: "regarder",   sentence: "Vous ________ le tableau.",          answer: "regardez",    difficulty: 2 },
      { subject: "ils",   infinitive: "regarder",   sentence: "Ils ________ le spectacle.",         answer: "regardent",   difficulty: 2 },

      /* ── aimer ── */
      { subject: "j'",    infinitive: "aimer",      sentence: "J'________ le chocolat.",            answer: "aime",        difficulty: 1 },
      { subject: "tu",    infinitive: "aimer",      sentence: "Tu ________ les animaux.",           answer: "aimes",       difficulty: 1 },
      { subject: "il",    infinitive: "aimer",      sentence: "Il ________ la musique.",            answer: "aime",        difficulty: 1 },
      { subject: "nous",  infinitive: "aimer",      sentence: "Nous ________ les vacances.",        answer: "aimons",      difficulty: 2 },
      { subject: "vous",  infinitive: "aimer",      sentence: "Vous ________ la nature.",           answer: "aimez",       difficulty: 2 },
      { subject: "elles", infinitive: "aimer",      sentence: "Elles ________ danser.",             answer: "aiment",      difficulty: 2 },

      /* ── marcher ── */
      { subject: "je",    infinitive: "marcher",    sentence: "Je ________ vers l'école.",          answer: "marche",      difficulty: 1 },
      { subject: "tu",    infinitive: "marcher",    sentence: "Tu ________ vite.",                  answer: "marches",     difficulty: 1 },
      { subject: "il",    infinitive: "marcher",    sentence: "Il ________ dans la rue.",           answer: "marche",      difficulty: 1 },
      { subject: "nous",  infinitive: "marcher",    sentence: "Nous ________ dans la forêt.",       answer: "marchons",    difficulty: 2 },
      { subject: "ils",   infinitive: "marcher",    sentence: "Ils ________ en silence.",           answer: "marchent",    difficulty: 2 },

      /* ── danser ── */
      { subject: "je",    infinitive: "danser",     sentence: "Je ________ dans le salon.",         answer: "danse",       difficulty: 1 },
      { subject: "tu",    infinitive: "danser",     sentence: "Tu ________ avec ta sœur.",          answer: "danses",      difficulty: 1 },
      { subject: "elle",  infinitive: "danser",     sentence: "Elle ________ sur la scène.",        answer: "danse",       difficulty: 2 },
      { subject: "ils",   infinitive: "danser",     sentence: "Ils ________ au bal.",               answer: "dansent",     difficulty: 2 },

      /* ── écouter ── */
      { subject: "j'",    infinitive: "écouter",    sentence: "J'________ de la musique.",          answer: "écoute",      difficulty: 1 },
      { subject: "tu",    infinitive: "écouter",    sentence: "Tu ________ attentivement.",         answer: "écoutes",     difficulty: 1 },
      { subject: "nous",  infinitive: "écouter",    sentence: "Nous ________ la radio.",            answer: "écoutons",    difficulty: 2 },
      { subject: "vous",  infinitive: "écouter",    sentence: "Vous ________ la maîtresse.",        answer: "écoutez",     difficulty: 2 },

      /* ── travailler ── */
      { subject: "je",    infinitive: "travailler", sentence: "Je ________ bien à l'école.",        answer: "travaille",   difficulty: 2 },
      { subject: "tu",    infinitive: "travailler", sentence: "Tu ________ dur.",                   answer: "travailles",  difficulty: 2 },
      { subject: "nous",  infinitive: "travailler", sentence: "Nous ________ en équipe.",           answer: "travaillons", difficulty: 2 },
      { subject: "ils",   infinitive: "travailler", sentence: "Ils ________ ensemble.",             answer: "travaillent", difficulty: 3 },

      /* ── dessiner ── */
      { subject: "je",    infinitive: "dessiner",   sentence: "Je ________ un dragon.",             answer: "dessine",     difficulty: 2 },
      { subject: "tu",    infinitive: "dessiner",   sentence: "Tu ________ très bien.",             answer: "dessines",    difficulty: 2 },
      { subject: "elle",  infinitive: "dessiner",   sentence: "Elle ________ un paysage.",          answer: "dessine",     difficulty: 2 },
      { subject: "nous",  infinitive: "dessiner",   sentence: "Nous ________ des animaux.",         answer: "dessinons",   difficulty: 3 },

      /* ── cuisiner ── */
      { subject: "je",    infinitive: "cuisiner",   sentence: "Je ________ un gâteau.",             answer: "cuisine",     difficulty: 2 },
      { subject: "vous",  infinitive: "cuisiner",   sentence: "Vous ________ avec votre maman.",    answer: "cuisinez",    difficulty: 2 },
      { subject: "ils",   infinitive: "cuisiner",   sentence: "Ils ________ le repas.",             answer: "cuisinent",   difficulty: 3 },

      /* ── habiter ── */
      { subject: "j'",    infinitive: "habiter",    sentence: "J'________ à Madrid.",               answer: "habite",      difficulty: 1 },
      { subject: "tu",    infinitive: "habiter",    sentence: "Tu ________ près du parc.",          answer: "habites",     difficulty: 1 },
      { subject: "il",    infinitive: "habiter",    sentence: "Il ________ dans une maison.",       answer: "habite",      difficulty: 1 },
      { subject: "nous",  infinitive: "habiter",    sentence: "Nous ________ en ville.",            answer: "habitons",    difficulty: 2 },

      /* ── chercher ── */
      { subject: "je",    infinitive: "chercher",   sentence: "Je ________ mon stylo.",             answer: "cherche",     difficulty: 2 },
      { subject: "tu",    infinitive: "chercher",   sentence: "Tu ________ tes affaires.",          answer: "cherches",    difficulty: 2 },
      { subject: "ils",   infinitive: "chercher",   sentence: "Ils ________ la sortie.",            answer: "cherchent",   difficulty: 3 },

      /* ── couper ── */
      { subject: "je",    infinitive: "couper",     sentence: "Je ________ le pain.",               answer: "coupe",       difficulty: 2 },
      { subject: "tu",    infinitive: "couper",     sentence: "Tu ________ les légumes.",           answer: "coupes",      difficulty: 2 },
      { subject: "nous",  infinitive: "couper",     sentence: "Nous ________ le papier.",           answer: "coupons",     difficulty: 3 },

      /* ── porter ── */
      { subject: "je",    infinitive: "porter",     sentence: "Je ________ mon sac.",               answer: "porte",       difficulty: 2 },
      { subject: "tu",    infinitive: "porter",     sentence: "Tu ________ un chapeau.",            answer: "portes",      difficulty: 2 },
      { subject: "elle",  infinitive: "porter",     sentence: "Elle ________ une robe.",            answer: "porte",       difficulty: 2 },
      { subject: "ils",   infinitive: "porter",     sentence: "Ils ________ des lunettes.",         answer: "portent",     difficulty: 3 },

      /* ── fermer ── */
      { subject: "je",    infinitive: "fermer",     sentence: "Je ________ la fenêtre.",            answer: "ferme",       difficulty: 2 },
      { subject: "tu",    infinitive: "fermer",     sentence: "Tu ________ la porte.",              answer: "fermes",      difficulty: 2 },
      { subject: "nous",  infinitive: "fermer",     sentence: "Nous ________ les cahiers.",         answer: "fermons",     difficulty: 3 }
    ]
  },

  "conjuguer-verbes-particuliers-1er-groupe": {
    title: "Conjuguer les verbes particuliers du 1er groupe au présent",
    type: "text-input",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── -cer : commencer (ç devant a/o → nous commençons) ── */
      { subject: "je",    infinitive: "commencer",   sentence: "Je ________ à travailler.",           answer: "commence",    difficulty: 1 },
      { subject: "tu",    infinitive: "commencer",   sentence: "Tu ________ l'exercice.",             answer: "commences",   difficulty: 1 },
      { subject: "il",    infinitive: "commencer",   sentence: "Il ________ à comprendre.",           answer: "commence",    difficulty: 1 },
      { subject: "nous",  infinitive: "commencer",   sentence: "Nous ________ la leçon.",             answer: "commençons",  difficulty: 2 },
      { subject: "vous",  infinitive: "commencer",   sentence: "Vous ________ à lire.",               answer: "commencez",   difficulty: 1 },
      { subject: "ils",   infinitive: "commencer",   sentence: "Ils ________ le cours.",              answer: "commencent",  difficulty: 1 },

      /* ── -cer : avancer ── */
      { subject: "j'",    infinitive: "avancer",     sentence: "J'________ doucement.",               answer: "avance",      difficulty: 1 },
      { subject: "tu",    infinitive: "avancer",     sentence: "Tu ________ vers la sortie.",         answer: "avances",     difficulty: 1 },
      { subject: "nous",  infinitive: "avancer",     sentence: "Nous ________ en rang.",              answer: "avançons",    difficulty: 2 },
      { subject: "ils",   infinitive: "avancer",     sentence: "Ils ________ en silence.",            answer: "avancent",    difficulty: 1 },

      /* ── -cer : lancer ── */
      { subject: "je",    infinitive: "lancer",      sentence: "Je ________ la balle.",               answer: "lance",       difficulty: 1 },
      { subject: "nous",  infinitive: "lancer",      sentence: "Nous ________ le ballon.",            answer: "lançons",     difficulty: 2 },
      { subject: "vous",  infinitive: "lancer",      sentence: "Vous ________ le javelot.",           answer: "lancez",      difficulty: 1 },

      /* ── -cer : placer ── */
      { subject: "tu",    infinitive: "placer",      sentence: "Tu ________ ta chaise.",              answer: "places",      difficulty: 1 },
      { subject: "nous",  infinitive: "placer",      sentence: "Nous ________ les livres.",           answer: "plaçons",     difficulty: 2 },

      /* ── -cer : prononcer ── */
      { subject: "nous",  infinitive: "prononcer",   sentence: "Nous ________ ce mot correctement.",  answer: "prononçons",  difficulty: 3 },
      { subject: "vous",  infinitive: "prononcer",   sentence: "Vous ________ bien.",                 answer: "prononcez",   difficulty: 1 },

      /* ── -ger : manger (e gardé devant a/o → nous mangeons) ── */
      { subject: "je",    infinitive: "manger",      sentence: "Je ________ une pomme.",              answer: "mange",       difficulty: 1 },
      { subject: "tu",    infinitive: "manger",      sentence: "Tu ________ trop vite.",              answer: "manges",      difficulty: 1 },
      { subject: "il",    infinitive: "manger",      sentence: "Il ________ sa soupe.",               answer: "mange",       difficulty: 1 },
      { subject: "nous",  infinitive: "manger",      sentence: "Nous ________ à la cantine.",         answer: "mangeons",    difficulty: 2 },
      { subject: "vous",  infinitive: "manger",      sentence: "Vous ________ ensemble.",             answer: "mangez",      difficulty: 1 },
      { subject: "ils",   infinitive: "manger",      sentence: "Ils ________ des fruits.",            answer: "mangent",     difficulty: 1 },

      /* ── -ger : nager ── */
      { subject: "je",    infinitive: "nager",       sentence: "Je ________ dans la piscine.",        answer: "nage",        difficulty: 1 },
      { subject: "nous",  infinitive: "nager",       sentence: "Nous ________ le crawl.",             answer: "nageons",     difficulty: 2 },
      { subject: "elles", infinitive: "nager",       sentence: "Elles ________ très vite.",           answer: "nagent",      difficulty: 1 },

      /* ── -ger : bouger ── */
      { subject: "tu",    infinitive: "bouger",      sentence: "Tu ________ beaucoup.",               answer: "bouges",      difficulty: 1 },
      { subject: "nous",  infinitive: "bouger",      sentence: "Nous ________ les meubles.",          answer: "bougeons",    difficulty: 2 },
      { subject: "ils",   infinitive: "bouger",      sentence: "Ils ________ pour danser.",           answer: "bougent",     difficulty: 1 },

      /* ── -ger : ranger ── */
      { subject: "je",    infinitive: "ranger",      sentence: "Je ________ ma chambre.",             answer: "range",       difficulty: 1 },
      { subject: "nous",  infinitive: "ranger",      sentence: "Nous ________ les affaires.",         answer: "rangeons",    difficulty: 2 },
      { subject: "vous",  infinitive: "ranger",      sentence: "Vous ________ vos livres.",           answer: "rangez",      difficulty: 1 },

      /* ── -ger : voyager ── */
      { subject: "je",    infinitive: "voyager",     sentence: "Je ________ beaucoup.",               answer: "voyage",      difficulty: 1 },
      { subject: "nous",  infinitive: "voyager",     sentence: "Nous ________ en train.",             answer: "voyageons",   difficulty: 2 },
      { subject: "ils",   infinitive: "voyager",     sentence: "Ils ________ en avion.",              answer: "voyagent",    difficulty: 1 },

      /* ── -ger : mélanger ── */
      { subject: "nous",  infinitive: "mélanger",    sentence: "Nous ________ la farine et les œufs.", answer: "mélangeons", difficulty: 2 },

      /* ── -yer : nettoyer (y→i devant e muet) ── */
      { subject: "je",    infinitive: "nettoyer",    sentence: "Je ________ le tableau.",             answer: "nettoie",     difficulty: 2 },
      { subject: "tu",    infinitive: "nettoyer",    sentence: "Tu ________ la table.",               answer: "nettoies",    difficulty: 2 },
      { subject: "il",    infinitive: "nettoyer",    sentence: "Il ________ sa chambre.",             answer: "nettoie",     difficulty: 2 },
      { subject: "nous",  infinitive: "nettoyer",    sentence: "Nous ________ la salle.",             answer: "nettoyons",   difficulty: 1 },
      { subject: "vous",  infinitive: "nettoyer",    sentence: "Vous ________ les vitres.",           answer: "nettoyez",    difficulty: 1 },
      { subject: "ils",   infinitive: "nettoyer",    sentence: "Ils ________ la cuisine.",            answer: "nettoient",   difficulty: 2 },

      /* ── -yer : employer ── */
      { subject: "j'",    infinitive: "employer",    sentence: "J'________ ce mot correctement.",     answer: "emploie",     difficulty: 2 },
      { subject: "nous",  infinitive: "employer",    sentence: "Nous ________ ces outils.",           answer: "employons",   difficulty: 1 },
      { subject: "ils",   infinitive: "employer",    sentence: "Ils ________ un nouveau mot.",        answer: "emploient",   difficulty: 2 },

      /* ── -yer : essuyer ── */
      { subject: "tu",    infinitive: "essuyer",     sentence: "Tu ________ la vaisselle.",           answer: "essuies",     difficulty: 2 },
      { subject: "nous",  infinitive: "essuyer",     sentence: "Nous ________ le sol.",               answer: "essuyons",    difficulty: 1 },
      { subject: "elles", infinitive: "essuyer",     sentence: "Elles ________ le tableau.",          answer: "essuient",    difficulty: 2 },

      /* ── -eler : appeler (l double devant e muet) ── */
      { subject: "j'",    infinitive: "appeler",     sentence: "J'________ mon ami.",                 answer: "appelle",     difficulty: 2 },
      { subject: "tu",    infinitive: "appeler",     sentence: "Tu ________ ta maman.",               answer: "appelles",    difficulty: 2 },
      { subject: "il",    infinitive: "appeler",     sentence: "Il ________ son chien.",              answer: "appelle",     difficulty: 2 },
      { subject: "nous",  infinitive: "appeler",     sentence: "Nous ________ notre professeur.",     answer: "appelons",    difficulty: 1 },
      { subject: "vous",  infinitive: "appeler",     sentence: "Vous ________ vos amis.",             answer: "appelez",     difficulty: 1 },
      { subject: "ils",   infinitive: "appeler",     sentence: "Ils ________ la maîtresse.",          answer: "appellent",   difficulty: 2 },

      /* ── -eter : jeter (t double devant e muet) ── */
      { subject: "je",    infinitive: "jeter",       sentence: "Je ________ le ballon.",              answer: "jette",       difficulty: 2 },
      { subject: "tu",    infinitive: "jeter",       sentence: "Tu ________ les déchets.",            answer: "jettes",      difficulty: 2 },
      { subject: "il",    infinitive: "jeter",       sentence: "Il ________ son sac.",                answer: "jette",       difficulty: 2 },
      { subject: "nous",  infinitive: "jeter",       sentence: "Nous ________ les papiers.",          answer: "jetons",      difficulty: 1 },
      { subject: "vous",  infinitive: "jeter",       sentence: "Vous ________ la balle.",             answer: "jetez",       difficulty: 1 },
      { subject: "ils",   infinitive: "jeter",       sentence: "Ils ________ des cailloux.",          answer: "jettent",     difficulty: 2 },

      /* ── -eter : projeter ── */
      { subject: "il",    infinitive: "projeter",    sentence: "Il ________ un film.",                answer: "projette",    difficulty: 3 },
      { subject: "nous",  infinitive: "projeter",    sentence: "Nous ________ un voyage.",            answer: "projetons",   difficulty: 2 },

      /* ── -eter : acheter (accent grave : è devant e muet) ── */
      { subject: "j'",    infinitive: "acheter",     sentence: "J'________ du pain.",                 answer: "achète",      difficulty: 2 },
      { subject: "tu",    infinitive: "acheter",     sentence: "Tu ________ des bonbons.",            answer: "achètes",     difficulty: 2 },
      { subject: "elle",  infinitive: "acheter",     sentence: "Elle ________ un livre.",             answer: "achète",      difficulty: 2 },
      { subject: "nous",  infinitive: "acheter",     sentence: "Nous ________ des légumes.",          answer: "achetons",    difficulty: 1 },
      { subject: "vous",  infinitive: "acheter",     sentence: "Vous ________ un cadeau.",            answer: "achetez",     difficulty: 1 },
      { subject: "ils",   infinitive: "acheter",     sentence: "Ils ________ des jouets.",            answer: "achètent",    difficulty: 2 }
    ]
  },

  "conjuguer-2e-groupe-present": {
    title: "Conjuguer les verbes du 2e groupe au présent",
    type: "text-input",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── finir ── */
      { subject: "je",    infinitive: "finir",     sentence: "Je ________ mon travail.",              answer: "finis",        difficulty: 1 },
      { subject: "tu",    infinitive: "finir",     sentence: "Tu ________ l'exercice.",               answer: "finis",        difficulty: 1 },
      { subject: "il",    infinitive: "finir",     sentence: "Il ________ son repas.",                answer: "finit",        difficulty: 1 },
      { subject: "nous",  infinitive: "finir",     sentence: "Nous ________ la leçon.",               answer: "finissons",    difficulty: 2 },
      { subject: "vous",  infinitive: "finir",     sentence: "Vous ________ à quelle heure ?",        answer: "finissez",     difficulty: 2 },
      { subject: "ils",   infinitive: "finir",     sentence: "Ils ________ leurs devoirs.",           answer: "finissent",    difficulty: 2 },

      /* ── choisir ── */
      { subject: "je",    infinitive: "choisir",   sentence: "Je ________ un livre.",                 answer: "choisis",      difficulty: 1 },
      { subject: "tu",    infinitive: "choisir",   sentence: "Tu ________ ta couleur préférée.",      answer: "choisis",      difficulty: 1 },
      { subject: "elle",  infinitive: "choisir",   sentence: "Elle ________ un dessert.",             answer: "choisit",      difficulty: 1 },
      { subject: "nous",  infinitive: "choisir",   sentence: "Nous ________ notre équipe.",           answer: "choisissons",  difficulty: 2 },
      { subject: "vous",  infinitive: "choisir",   sentence: "Vous ________ votre place.",            answer: "choisissez",   difficulty: 2 },
      { subject: "ils",   infinitive: "choisir",   sentence: "Ils ________ leurs vêtements.",         answer: "choisissent",  difficulty: 2 },

      /* ── rougir ── */
      { subject: "je",    infinitive: "rougir",    sentence: "Je ________ de honte.",                 answer: "rougis",       difficulty: 1 },
      { subject: "tu",    infinitive: "rougir",    sentence: "Tu ________ quand tu mens.",            answer: "rougis",       difficulty: 1 },
      { subject: "il",    infinitive: "rougir",    sentence: "Il ________ de timidité.",              answer: "rougit",       difficulty: 1 },
      { subject: "nous",  infinitive: "rougir",    sentence: "Nous ________ au soleil.",              answer: "rougissons",   difficulty: 2 },
      { subject: "ils",   infinitive: "rougir",    sentence: "Ils ________ de plaisir.",              answer: "rougissent",   difficulty: 2 },

      /* ── grandir ── */
      { subject: "je",    infinitive: "grandir",   sentence: "Je ________ chaque année.",             answer: "grandis",      difficulty: 1 },
      { subject: "tu",    infinitive: "grandir",   sentence: "Tu ________ très vite.",                answer: "grandis",      difficulty: 1 },
      { subject: "elle",  infinitive: "grandir",   sentence: "Elle ________ de cinq centimètres.",    answer: "grandit",      difficulty: 1 },
      { subject: "nous",  infinitive: "grandir",   sentence: "Nous ________ ensemble.",               answer: "grandissons",  difficulty: 2 },
      { subject: "ils",   infinitive: "grandir",   sentence: "Ils ________ comme des champignons.",   answer: "grandissent",  difficulty: 2 },

      /* ── obéir ── */
      { subject: "je",    infinitive: "obéir",     sentence: "J'________ à mes parents.",             answer: "obéis",        difficulty: 1 },
      { subject: "tu",    infinitive: "obéir",     sentence: "Tu ________ aux règles.",               answer: "obéis",        difficulty: 1 },
      { subject: "il",    infinitive: "obéir",     sentence: "Il ________ toujours.",                 answer: "obéit",        difficulty: 1 },
      { subject: "nous",  infinitive: "obéir",     sentence: "Nous ________ à la maîtresse.",         answer: "obéissons",    difficulty: 2 },
      { subject: "vous",  infinitive: "obéir",     sentence: "Vous ________ bien.",                   answer: "obéissez",     difficulty: 2 },
      { subject: "ils",   infinitive: "obéir",     sentence: "Ils ________ sans discuter.",           answer: "obéissent",    difficulty: 2 },

      /* ── réussir ── */
      { subject: "je",    infinitive: "réussir",   sentence: "Je ________ mon exercice.",             answer: "réussis",      difficulty: 1 },
      { subject: "tu",    infinitive: "réussir",   sentence: "Tu ________ toujours tes tests.",       answer: "réussis",      difficulty: 1 },
      { subject: "elle",  infinitive: "réussir",   sentence: "Elle ________ sa recette.",             answer: "réussit",      difficulty: 1 },
      { subject: "nous",  infinitive: "réussir",   sentence: "Nous ________ à travailler ensemble.",  answer: "réussissons",  difficulty: 2 },
      { subject: "ils",   infinitive: "réussir",   sentence: "Ils ________ leur projet.",             answer: "réussissent",  difficulty: 2 },

      /* ── nourrir ── */
      { subject: "je",    infinitive: "nourrir",   sentence: "Je ________ mon poisson.",              answer: "nourris",      difficulty: 1 },
      { subject: "nous",  infinitive: "nourrir",   sentence: "Nous ________ les animaux.",            answer: "nourrissons",  difficulty: 2 },
      { subject: "ils",   infinitive: "nourrir",   sentence: "Ils ________ leur chat.",               answer: "nourrissent",  difficulty: 2 },

      /* ── bâtir ── */
      { subject: "je",    infinitive: "bâtir",     sentence: "Je ________ une cabane.",               answer: "bâtis",        difficulty: 2 },
      { subject: "nous",  infinitive: "bâtir",     sentence: "Nous ________ une maison.",             answer: "bâtissons",    difficulty: 2 },
      { subject: "ils",   infinitive: "bâtir",     sentence: "Ils ________ un mur.",                  answer: "bâtissent",    difficulty: 2 },

      /* ── salir ── */
      { subject: "tu",    infinitive: "salir",     sentence: "Tu ________ ta chemise.",               answer: "salis",        difficulty: 1 },
      { subject: "il",    infinitive: "salir",     sentence: "Il ________ le sol.",                   answer: "salit",        difficulty: 1 },
      { subject: "nous",  infinitive: "salir",     sentence: "Nous ________ nos chaussures.",         answer: "salissons",    difficulty: 2 },
      { subject: "ils",   infinitive: "salir",     sentence: "Ils ________ tout.",                    answer: "salissent",    difficulty: 2 },

      /* ── pâlir ── */
      { subject: "il",    infinitive: "pâlir",     sentence: "Il ________ de peur.",                  answer: "pâlit",        difficulty: 2 },
      { subject: "nous",  infinitive: "pâlir",     sentence: "Nous ________ à cette nouvelle.",       answer: "pâlissons",    difficulty: 3 },

      /* ── maigrir ── */
      { subject: "elle",  infinitive: "maigrir",   sentence: "Elle ________ en mangeant moins.",      answer: "maigrit",      difficulty: 2 },
      { subject: "nous",  infinitive: "maigrir",   sentence: "Nous ________ pendant l'été.",          answer: "maigrissons",  difficulty: 3 },

      /* ── grossir ── */
      { subject: "tu",    infinitive: "grossir",   sentence: "Tu ________ un peu.",                   answer: "grossis",      difficulty: 2 },
      { subject: "ils",   infinitive: "grossir",   sentence: "Ils ________ pendant l'hiver.",         answer: "grossissent",  difficulty: 2 },

      /* ── avertir ── */
      { subject: "je",    infinitive: "avertir",   sentence: "Je ________ mes amis.",                 answer: "avertis",      difficulty: 2 },
      { subject: "nous",  infinitive: "avertir",   sentence: "Nous ________ la classe.",              answer: "avertissons",  difficulty: 3 },

      /* ── réfléchir ── */
      { subject: "je",    infinitive: "réfléchir", sentence: "Je ________ avant de répondre.",        answer: "réfléchis",    difficulty: 2 },
      { subject: "tu",    infinitive: "réfléchir", sentence: "Tu ________ à la question.",            answer: "réfléchis",    difficulty: 2 },
      { subject: "elle",  infinitive: "réfléchir", sentence: "Elle ________ longuement.",             answer: "réfléchit",    difficulty: 2 },
      { subject: "nous",  infinitive: "réfléchir", sentence: "Nous ________ ensemble.",               answer: "réfléchissons",difficulty: 3 },
      { subject: "ils",   infinitive: "réfléchir", sentence: "Ils ________ au problème.",             answer: "réfléchissent",difficulty: 3 }
    ]
  },

  "conjuguer-3e-groupe-present": {
    title: "Conjuguer les verbes fréquents du 3e groupe au présent",
    type: "text-input",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── FAIRE ── */
      { subject: "je",    infinitive: "faire",   sentence: "Je ________ mes devoirs.",               answer: "fais",     difficulty: 1 },
      { subject: "tu",    infinitive: "faire",   sentence: "Tu ________ du sport.",                  answer: "fais",     difficulty: 1 },
      { subject: "il",    infinitive: "faire",   sentence: "Il ________ beau aujourd'hui.",          answer: "fait",     difficulty: 1 },
      { subject: "nous",  infinitive: "faire",   sentence: "Nous ________ une promenade.",           answer: "faisons",  difficulty: 2 },
      { subject: "vous",  infinitive: "faire",   sentence: "Vous ________ de la peinture.",          answer: "faites",   difficulty: 3 },
      { subject: "ils",   infinitive: "faire",   sentence: "Ils ________ la cuisine.",               answer: "font",     difficulty: 2 },
      { subject: "elle",  infinitive: "faire",   sentence: "Elle ________ du vélo.",                 answer: "fait",     difficulty: 1 },
      { subject: "elles", infinitive: "faire",   sentence: "Elles ________ du bruit.",               answer: "font",     difficulty: 2 },

      /* ── ALLER ── */
      { subject: "je",    infinitive: "aller",   sentence: "Je ________ à l'école.",                 answer: "vais",     difficulty: 2 },
      { subject: "tu",    infinitive: "aller",   sentence: "Tu ________ au parc.",                   answer: "vas",      difficulty: 2 },
      { subject: "il",    infinitive: "aller",   sentence: "Il ________ chez son ami.",              answer: "va",       difficulty: 2 },
      { subject: "nous",  infinitive: "aller",   sentence: "Nous ________ au cinéma.",               answer: "allons",   difficulty: 2 },
      { subject: "vous",  infinitive: "aller",   sentence: "Vous ________ à la piscine.",            answer: "allez",    difficulty: 2 },
      { subject: "ils",   infinitive: "aller",   sentence: "Ils ________ au marché.",                answer: "vont",     difficulty: 2 },
      { subject: "elle",  infinitive: "aller",   sentence: "Elle ________ à la bibliothèque.",       answer: "va",       difficulty: 2 },

      /* ── DIRE ── */
      { subject: "je",    infinitive: "dire",    sentence: "Je ________ la vérité.",                 answer: "dis",      difficulty: 1 },
      { subject: "tu",    infinitive: "dire",    sentence: "Tu ________ toujours oui.",              answer: "dis",      difficulty: 1 },
      { subject: "il",    infinitive: "dire",    sentence: "Il ________ merci.",                     answer: "dit",      difficulty: 1 },
      { subject: "nous",  infinitive: "dire",    sentence: "Nous ________ bonjour.",                 answer: "disons",   difficulty: 2 },
      { subject: "vous",  infinitive: "dire",    sentence: "Vous ________ n'importe quoi.",          answer: "dites",    difficulty: 3 },
      { subject: "ils",   infinitive: "dire",    sentence: "Ils ________ qu'il va pleuvoir.",        answer: "disent",   difficulty: 2 },

      /* ── VENIR ── */
      { subject: "je",    infinitive: "venir",   sentence: "Je ________ te voir demain.",            answer: "viens",    difficulty: 2 },
      { subject: "tu",    infinitive: "venir",   sentence: "Tu ________ avec nous ?",                answer: "viens",    difficulty: 2 },
      { subject: "il",    infinitive: "venir",   sentence: "Il ________ de Madrid.",                 answer: "vient",    difficulty: 2 },
      { subject: "nous",  infinitive: "venir",   sentence: "Nous ________ à la fête.",               answer: "venons",   difficulty: 2 },
      { subject: "vous",  infinitive: "venir",   sentence: "Vous ________ ce soir ?",                answer: "venez",    difficulty: 2 },
      { subject: "ils",   infinitive: "venir",   sentence: "Ils ________ en train.",                 answer: "viennent", difficulty: 3 },
      { subject: "elle",  infinitive: "venir",   sentence: "Elle ________ en classe.",               answer: "vient",    difficulty: 2 },

      /* ── POUVOIR ── */
      { subject: "je",    infinitive: "pouvoir", sentence: "Je ________ t'aider.",                   answer: "peux",     difficulty: 2 },
      { subject: "tu",    infinitive: "pouvoir", sentence: "Tu ________ venir ce soir.",             answer: "peux",     difficulty: 2 },
      { subject: "il",    infinitive: "pouvoir", sentence: "Il ________ courir vite.",               answer: "peut",     difficulty: 2 },
      { subject: "nous",  infinitive: "pouvoir", sentence: "Nous ________ commencer.",               answer: "pouvons",  difficulty: 2 },
      { subject: "vous",  infinitive: "pouvoir", sentence: "Vous ________ sortir.",                  answer: "pouvez",   difficulty: 2 },
      { subject: "ils",   infinitive: "pouvoir", sentence: "Ils ________ jouer dehors.",             answer: "peuvent",  difficulty: 3 },

      /* ── VOIR ── */
      { subject: "je",    infinitive: "voir",    sentence: "Je ________ la mer.",                    answer: "vois",     difficulty: 1 },
      { subject: "tu",    infinitive: "voir",    sentence: "Tu ________ le tableau ?",               answer: "vois",     difficulty: 1 },
      { subject: "il",    infinitive: "voir",    sentence: "Il ________ ses amis le week-end.",      answer: "voit",     difficulty: 1 },
      { subject: "nous",  infinitive: "voir",    sentence: "Nous ________ un film.",                 answer: "voyons",   difficulty: 2 },
      { subject: "vous",  infinitive: "voir",    sentence: "Vous ________ le problème ?",            answer: "voyez",    difficulty: 2 },
      { subject: "ils",   infinitive: "voir",    sentence: "Ils ________ le match à la télé.",       answer: "voient",   difficulty: 3 },
      { subject: "elle",  infinitive: "voir",    sentence: "Elle ________ mal sans ses lunettes.",   answer: "voit",     difficulty: 1 },

      /* ── VOULOIR ── */
      { subject: "je",    infinitive: "vouloir", sentence: "Je ________ un gâteau.",                 answer: "veux",     difficulty: 2 },
      { subject: "tu",    infinitive: "vouloir", sentence: "Tu ________ jouer ?",                    answer: "veux",     difficulty: 2 },
      { subject: "il",    infinitive: "vouloir", sentence: "Il ________ dormir.",                    answer: "veut",     difficulty: 2 },
      { subject: "nous",  infinitive: "vouloir", sentence: "Nous ________ partir en voyage.",        answer: "voulons",  difficulty: 2 },
      { subject: "vous",  infinitive: "vouloir", sentence: "Vous ________ du chocolat ?",            answer: "voulez",   difficulty: 2 },
      { subject: "ils",   infinitive: "vouloir", sentence: "Ils ________ gagner.",                   answer: "veulent",  difficulty: 3 },
      { subject: "elle",  infinitive: "vouloir", sentence: "Elle ________ une nouvelle poupée.",     answer: "veut",     difficulty: 2 },

      /* ── PRENDRE ── */
      { subject: "je",    infinitive: "prendre", sentence: "Je ________ mon cartable.",              answer: "prends",   difficulty: 1 },
      { subject: "tu",    infinitive: "prendre", sentence: "Tu ________ le bus.",                    answer: "prends",   difficulty: 1 },
      { subject: "il",    infinitive: "prendre", sentence: "Il ________ son petit-déjeuner.",        answer: "prend",    difficulty: 2 },
      { subject: "nous",  infinitive: "prendre", sentence: "Nous ________ le train.",                answer: "prenons",  difficulty: 2 },
      { subject: "vous",  infinitive: "prendre", sentence: "Vous ________ quelle route ?",           answer: "prenez",   difficulty: 2 },
      { subject: "ils",   infinitive: "prendre", sentence: "Ils ________ leurs affaires.",           answer: "prennent", difficulty: 3 },
      { subject: "elle",  infinitive: "prendre", sentence: "Elle ________ un livre.",                answer: "prend",    difficulty: 2 }
    ]
  },

  "conjuguer-imparfait": {
    title: "Conjuguer des verbes à l'imparfait",
    type: "text-input",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── ÊTRE (radical ét-) ── */
      { subject: "j'",    infinitive: "être",    sentence: "J'________ fatigué après la course.",       answer: "étais",     difficulty: 2 },
      { subject: "tu",    infinitive: "être",    sentence: "Tu ________ content de ton cadeau.",        answer: "étais",     difficulty: 2 },
      { subject: "il",    infinitive: "être",    sentence: "Il ________ très courageux.",               answer: "était",     difficulty: 2 },
      { subject: "nous",  infinitive: "être",    sentence: "Nous ________ en vacances.",                answer: "étions",    difficulty: 2 },
      { subject: "vous",  infinitive: "être",    sentence: "Vous ________ très sages.",                 answer: "étiez",     difficulty: 2 },
      { subject: "ils",   infinitive: "être",    sentence: "Ils ________ dans le jardin.",              answer: "étaient",   difficulty: 2 },

      /* ── AVOIR (radical av-) ── */
      { subject: "j'",    infinitive: "avoir",   sentence: "J'________ un petit chat.",                 answer: "avais",     difficulty: 2 },
      { subject: "tu",    infinitive: "avoir",   sentence: "Tu ________ soif.",                         answer: "avais",     difficulty: 2 },
      { subject: "elle",  infinitive: "avoir",   sentence: "Elle ________ les yeux bleus.",             answer: "avait",     difficulty: 2 },
      { subject: "nous",  infinitive: "avoir",   sentence: "Nous ________ beaucoup d'amis.",            answer: "avions",    difficulty: 2 },
      { subject: "vous",  infinitive: "avoir",   sentence: "Vous ________ un grand jardin.",            answer: "aviez",     difficulty: 2 },
      { subject: "ils",   infinitive: "avoir",   sentence: "Ils ________ peur du tonnerre.",            answer: "avaient",   difficulty: 2 },

      /* ── 1er GROUPE : chanter (radical chant-) ── */
      { subject: "je",    infinitive: "chanter", sentence: "Je ________ sous la douche.",               answer: "chantais",  difficulty: 1 },
      { subject: "tu",    infinitive: "chanter", sentence: "Tu ________ une berceuse.",                 answer: "chantais",  difficulty: 1 },
      { subject: "elle",  infinitive: "chanter", sentence: "Elle ________ dans la chorale.",            answer: "chantait",  difficulty: 1 },
      { subject: "nous",  infinitive: "chanter", sentence: "Nous ________ en chœur chaque soir.",       answer: "chantions", difficulty: 2 },
      { subject: "vous",  infinitive: "chanter", sentence: "Vous ________ faux !",                      answer: "chantiez",  difficulty: 2 },
      { subject: "ils",   infinitive: "chanter", sentence: "Ils ________ autour du feu.",               answer: "chantaient",difficulty: 1 },

      /* ── 1er GROUPE : jouer ── */
      { subject: "je",    infinitive: "jouer",   sentence: "Je ________ aux billes.",                   answer: "jouais",    difficulty: 1 },
      { subject: "il",    infinitive: "jouer",   sentence: "Il ________ au foot tous les jours.",       answer: "jouait",    difficulty: 1 },
      { subject: "nous",  infinitive: "jouer",   sentence: "Nous ________ dans la cour.",               answer: "jouions",   difficulty: 2 },
      { subject: "ils",   infinitive: "jouer",   sentence: "Ils ________ ensemble.",                    answer: "jouaient",  difficulty: 1 },

      /* ── 1er GROUPE : regarder ── */
      { subject: "tu",    infinitive: "regarder",sentence: "Tu ________ les étoiles.",                  answer: "regardais", difficulty: 1 },
      { subject: "elle",  infinitive: "regarder",sentence: "Elle ________ par la fenêtre.",             answer: "regardait", difficulty: 1 },
      { subject: "nous",  infinitive: "regarder",sentence: "Nous ________ un dessin animé.",            answer: "regardions",difficulty: 2 },
      { subject: "ils",   infinitive: "regarder",sentence: "Ils ________ le match.",                    answer: "regardaient",difficulty: 1 },

      /* ── 1er GROUPE : manger (-ger : e gardé devant a) ── */
      { subject: "je",    infinitive: "manger",  sentence: "Je ________ une tarte aux pommes.",         answer: "mangeais",  difficulty: 2 },
      { subject: "il",    infinitive: "manger",  sentence: "Il ________ lentement.",                    answer: "mangeait",  difficulty: 2 },
      { subject: "nous",  infinitive: "manger",  sentence: "Nous ________ à la cantine.",               answer: "mangions",  difficulty: 2 },
      { subject: "ils",   infinitive: "manger",  sentence: "Ils ________ des crêpes.",                  answer: "mangeaient",difficulty: 2 },

      /* ── 2e GROUPE : finir (radical finiss-) ── */
      { subject: "je",    infinitive: "finir",   sentence: "Je ________ toujours mon assiette.",        answer: "finissais", difficulty: 2 },
      { subject: "tu",    infinitive: "finir",   sentence: "Tu ________ tes devoirs le soir.",          answer: "finissais", difficulty: 2 },
      { subject: "il",    infinitive: "finir",   sentence: "Il ________ sa lecture avant de dormir.",   answer: "finissait", difficulty: 2 },
      { subject: "nous",  infinitive: "finir",   sentence: "Nous ________ le cours à midi.",            answer: "finissions",difficulty: 3 },
      { subject: "vous",  infinitive: "finir",   sentence: "Vous ________ avant les autres.",           answer: "finissiez", difficulty: 3 },
      { subject: "ils",   infinitive: "finir",   sentence: "Ils ________ leur travail en silence.",     answer: "finissaient",difficulty: 2 },

      /* ── 2e GROUPE : choisir ── */
      { subject: "elle",  infinitive: "choisir", sentence: "Elle ________ toujours le même livre.",     answer: "choisissait",difficulty: 2 },
      { subject: "nous",  infinitive: "choisir", sentence: "Nous ________ notre destination.",          answer: "choisissions",difficulty: 3 },
      { subject: "ils",   infinitive: "choisir", sentence: "Ils ________ leurs équipes.",               answer: "choisissaient",difficulty: 2 },

      /* ── 3e GROUPE : faire (radical fais-) ── */
      { subject: "je",    infinitive: "faire",   sentence: "Je ________ du vélo.",                      answer: "faisais",   difficulty: 2 },
      { subject: "tu",    infinitive: "faire",   sentence: "Tu ________ beaucoup de bruit.",            answer: "faisais",   difficulty: 2 },
      { subject: "il",    infinitive: "faire",   sentence: "Il ________ froid ce jour-là.",             answer: "faisait",   difficulty: 2 },
      { subject: "nous",  infinitive: "faire",   sentence: "Nous ________ des bonhommes de neige.",     answer: "faisions",  difficulty: 2 },
      { subject: "ils",   infinitive: "faire",   sentence: "Ils ________ la fête.",                     answer: "faisaient", difficulty: 2 },

      /* ── 3e GROUPE : aller (radical all-) ── */
      { subject: "j'",    infinitive: "aller",   sentence: "J'________ à l'école à pied.",              answer: "allais",    difficulty: 2 },
      { subject: "tu",    infinitive: "aller",   sentence: "Tu ________ chez ta grand-mère.",           answer: "allais",    difficulty: 2 },
      { subject: "elle",  infinitive: "aller",   sentence: "Elle ________ à la piscine.",               answer: "allait",    difficulty: 2 },
      { subject: "nous",  infinitive: "aller",   sentence: "Nous ________ au marché le dimanche.",      answer: "allions",   difficulty: 2 },
      { subject: "ils",   infinitive: "aller",   sentence: "Ils ________ au parc après l'école.",       answer: "allaient",  difficulty: 2 },

      /* ── 3e GROUPE : dire (radical dis-) ── */
      { subject: "je",    infinitive: "dire",    sentence: "Je ________ toujours la vérité.",           answer: "disais",    difficulty: 2 },
      { subject: "il",    infinitive: "dire",    sentence: "Il ________ que tout allait bien.",         answer: "disait",    difficulty: 2 },
      { subject: "nous",  infinitive: "dire",    sentence: "Nous ________ bonsoir avant de dormir.",    answer: "disions",   difficulty: 2 },
      { subject: "ils",   infinitive: "dire",    sentence: "Ils ________ des histoires.",               answer: "disaient",  difficulty: 2 },

      /* ── 3e GROUPE : venir (radical ven-) ── */
      { subject: "tu",    infinitive: "venir",   sentence: "Tu ________ me voir chaque semaine.",       answer: "venais",    difficulty: 2 },
      { subject: "elle",  infinitive: "venir",   sentence: "Elle ________ souvent jouer ici.",          answer: "venait",    difficulty: 2 },
      { subject: "nous",  infinitive: "venir",   sentence: "Nous ________ en voiture.",                 answer: "venions",   difficulty: 2 },
      { subject: "ils",   infinitive: "venir",   sentence: "Ils ________ tous les étés.",               answer: "venaient",  difficulty: 2 },

      /* ── 3e GROUPE : pouvoir (radical pouv-) ── */
      { subject: "je",    infinitive: "pouvoir", sentence: "Je ________ courir très vite.",             answer: "pouvais",   difficulty: 2 },
      { subject: "il",    infinitive: "pouvoir", sentence: "Il ________ soulever des charges lourdes.", answer: "pouvait",   difficulty: 2 },
      { subject: "ils",   infinitive: "pouvoir", sentence: "Ils ________ jouer jusqu'à la nuit.",       answer: "pouvaient", difficulty: 2 },

      /* ── 3e GROUPE : voir (radical voy-) ── */
      { subject: "je",    infinitive: "voir",    sentence: "Je ________ la mer depuis ma fenêtre.",     answer: "voyais",    difficulty: 2 },
      { subject: "elle",  infinitive: "voir",    sentence: "Elle ________ mal sans ses lunettes.",      answer: "voyait",    difficulty: 2 },
      { subject: "nous",  infinitive: "voir",    sentence: "Nous ________ nos amis le week-end.",       answer: "voyions",   difficulty: 2 },
      { subject: "ils",   infinitive: "voir",    sentence: "Ils ________ des oiseaux dans le ciel.",    answer: "voyaient",  difficulty: 2 },

      /* ── 3e GROUPE : vouloir (radical voul-) ── */
      { subject: "je",    infinitive: "vouloir", sentence: "Je ________ un chien.",                     answer: "voulais",   difficulty: 2 },
      { subject: "il",    infinitive: "vouloir", sentence: "Il ________ devenir astronaute.",           answer: "voulait",   difficulty: 2 },
      { subject: "ils",   infinitive: "vouloir", sentence: "Ils ________ partir en voyage.",            answer: "voulaient", difficulty: 2 },

      /* ── 3e GROUPE : prendre (radical pren-) ── */
      { subject: "je",    infinitive: "prendre", sentence: "Je ________ le bus chaque matin.",          answer: "prenais",   difficulty: 2 },
      { subject: "tu",    infinitive: "prendre", sentence: "Tu ________ ton temps.",                    answer: "prenais",   difficulty: 2 },
      { subject: "elle",  infinitive: "prendre", sentence: "Elle ________ soin de ses affaires.",       answer: "prenait",   difficulty: 2 },
      { subject: "ils",   infinitive: "prendre", sentence: "Ils ________ leurs repas ensemble.",        answer: "prenaient", difficulty: 2 }
    ]
  },

  "conjuguer-futur": {
    title: "Conjuguer des verbes au futur",
    type: "text-input",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── ÊTRE (radical ser-) ── */
      { subject: "je",    infinitive: "être",    sentence: "Je ________ médecin plus tard.",             answer: "serai",      difficulty: 2 },
      { subject: "tu",    infinitive: "être",    sentence: "Tu ________ en retard.",                     answer: "seras",      difficulty: 2 },
      { subject: "il",    infinitive: "être",    sentence: "Il ________ content demain.",                answer: "sera",       difficulty: 2 },
      { subject: "nous",  infinitive: "être",    sentence: "Nous ________ à l'heure.",                   answer: "serons",     difficulty: 2 },
      { subject: "vous",  infinitive: "être",    sentence: "Vous ________ les bienvenus.",               answer: "serez",      difficulty: 2 },
      { subject: "ils",   infinitive: "être",    sentence: "Ils ________ très heureux.",                 answer: "seront",     difficulty: 2 },

      /* ── AVOIR (radical aur-) ── */
      { subject: "j'",    infinitive: "avoir",   sentence: "J'________ dix ans en mars.",                answer: "aurai",      difficulty: 2 },
      { subject: "tu",    infinitive: "avoir",   sentence: "Tu ________ un vélo pour Noël.",             answer: "auras",      difficulty: 2 },
      { subject: "elle",  infinitive: "avoir",   sentence: "Elle ________ un bébé frère.",               answer: "aura",       difficulty: 2 },
      { subject: "nous",  infinitive: "avoir",   sentence: "Nous ________ une heure de récréation.",     answer: "aurons",     difficulty: 2 },
      { subject: "vous",  infinitive: "avoir",   sentence: "Vous ________ les résultats demain.",        answer: "aurez",      difficulty: 2 },
      { subject: "ils",   infinitive: "avoir",   sentence: "Ils ________ beaucoup de travail.",          answer: "auront",     difficulty: 2 },

      /* ── 1er GROUPE : chanter (infinitif + terminaison) ── */
      { subject: "je",    infinitive: "chanter", sentence: "Je ________ une chanson demain.",            answer: "chanterai",  difficulty: 1 },
      { subject: "tu",    infinitive: "chanter", sentence: "Tu ________ sur scène.",                     answer: "chanteras",  difficulty: 1 },
      { subject: "il",    infinitive: "chanter", sentence: "Il ________ à la fête.",                     answer: "chantera",   difficulty: 1 },
      { subject: "nous",  infinitive: "chanter", sentence: "Nous ________ en chœur.",                    answer: "chanterons", difficulty: 1 },
      { subject: "vous",  infinitive: "chanter", sentence: "Vous ________ très bien.",                   answer: "chanterez",  difficulty: 1 },
      { subject: "ils",   infinitive: "chanter", sentence: "Ils ________ toute la nuit.",                answer: "chanteront", difficulty: 1 },

      /* ── 1er GROUPE : jouer ── */
      { subject: "je",    infinitive: "jouer",   sentence: "Je ________ au foot ce soir.",               answer: "jouerai",    difficulty: 1 },
      { subject: "elle",  infinitive: "jouer",   sentence: "Elle ________ du piano.",                    answer: "jouera",     difficulty: 1 },
      { subject: "nous",  infinitive: "jouer",   sentence: "Nous ________ en équipe.",                   answer: "jouerons",   difficulty: 1 },
      { subject: "ils",   infinitive: "jouer",   sentence: "Ils ________ contre nous.",                  answer: "joueront",   difficulty: 1 },

      /* ── 1er GROUPE : parler ── */
      { subject: "tu",    infinitive: "parler",  sentence: "Tu ________ devant la classe.",              answer: "parleras",   difficulty: 1 },
      { subject: "il",    infinitive: "parler",  sentence: "Il ________ au directeur.",                  answer: "parlera",    difficulty: 1 },
      { subject: "nous",  infinitive: "parler",  sentence: "Nous ________ de nos vacances.",             answer: "parlerons",  difficulty: 1 },

      /* ── 2e GROUPE : finir (infinitif + terminaison) ── */
      { subject: "je",    infinitive: "finir",   sentence: "Je ________ mes devoirs tôt.",               answer: "finirai",    difficulty: 1 },
      { subject: "tu",    infinitive: "finir",   sentence: "Tu ________ avant moi.",                     answer: "finiras",    difficulty: 1 },
      { subject: "elle",  infinitive: "finir",   sentence: "Elle ________ son livre ce soir.",           answer: "finira",     difficulty: 1 },
      { subject: "nous",  infinitive: "finir",   sentence: "Nous ________ le projet vendredi.",          answer: "finirons",   difficulty: 1 },
      { subject: "vous",  infinitive: "finir",   sentence: "Vous ________ en dernier.",                  answer: "finirez",    difficulty: 1 },
      { subject: "ils",   infinitive: "finir",   sentence: "Ils ________ la course.",                    answer: "finiront",   difficulty: 1 },

      /* ── 3e GROUPE : faire (radical fer-) ── */
      { subject: "je",    infinitive: "faire",   sentence: "Je ________ mes valises.",                   answer: "ferai",      difficulty: 2 },
      { subject: "tu",    infinitive: "faire",   sentence: "Tu ________ du sport demain.",               answer: "feras",      difficulty: 2 },
      { subject: "il",    infinitive: "faire",   sentence: "Il ________ beau ce week-end.",              answer: "fera",       difficulty: 2 },
      { subject: "nous",  infinitive: "faire",   sentence: "Nous ________ une sortie scolaire.",         answer: "ferons",     difficulty: 2 },
      { subject: "vous",  infinitive: "faire",   sentence: "Vous ________ du bon travail.",              answer: "ferez",      difficulty: 2 },
      { subject: "ils",   infinitive: "faire",   sentence: "Ils ________ la fête.",                      answer: "feront",     difficulty: 2 },

      /* ── 3e GROUPE : aller (radical ir-) ── */
      { subject: "j'",    infinitive: "aller",   sentence: "J'________ à la mer cet été.",               answer: "irai",       difficulty: 3 },
      { subject: "tu",    infinitive: "aller",   sentence: "Tu ________ chez mamie.",                    answer: "iras",       difficulty: 3 },
      { subject: "elle",  infinitive: "aller",   sentence: "Elle ________ mieux demain.",                answer: "ira",        difficulty: 3 },
      { subject: "nous",  infinitive: "aller",   sentence: "Nous ________ au musée.",                    answer: "irons",      difficulty: 3 },
      { subject: "vous",  infinitive: "aller",   sentence: "Vous ________ en voyage.",                   answer: "irez",       difficulty: 3 },
      { subject: "ils",   infinitive: "aller",   sentence: "Ils ________ au stade.",                     answer: "iront",      difficulty: 3 },

      /* ── 3e GROUPE : venir (radical viendr-) ── */
      { subject: "je",    infinitive: "venir",   sentence: "Je ________ te voir samedi.",                answer: "viendrai",   difficulty: 3 },
      { subject: "tu",    infinitive: "venir",   sentence: "Tu ________ à ma fête ?",                    answer: "viendras",   difficulty: 3 },
      { subject: "il",    infinitive: "venir",   sentence: "Il ________ en avion.",                      answer: "viendra",    difficulty: 3 },
      { subject: "nous",  infinitive: "venir",   sentence: "Nous ________ vous rejoindre.",              answer: "viendrons",  difficulty: 3 },
      { subject: "ils",   infinitive: "venir",   sentence: "Ils ________ avec leurs parents.",           answer: "viendront",  difficulty: 3 },

      /* ── 3e GROUPE : voir (radical verr-) ── */
      { subject: "je",    infinitive: "voir",    sentence: "Je ________ mes amis ce soir.",              answer: "verrai",     difficulty: 3 },
      { subject: "tu",    infinitive: "voir",    sentence: "Tu ________ comme c'est beau.",              answer: "verras",     difficulty: 3 },
      { subject: "nous",  infinitive: "voir",    sentence: "Nous ________ ce film ensemble.",            answer: "verrons",    difficulty: 3 },
      { subject: "ils",   infinitive: "voir",    sentence: "Ils ________ la différence.",                answer: "verront",    difficulty: 3 },

      /* ── 3e GROUPE : pouvoir (radical pourr-) ── */
      { subject: "je",    infinitive: "pouvoir", sentence: "Je ________ venir demain.",                  answer: "pourrai",    difficulty: 3 },
      { subject: "tu",    infinitive: "pouvoir", sentence: "Tu ________ m'aider ?",                      answer: "pourras",    difficulty: 3 },
      { subject: "il",    infinitive: "pouvoir", sentence: "Il ________ sortir ce soir.",                answer: "pourra",     difficulty: 3 },
      { subject: "ils",   infinitive: "pouvoir", sentence: "Ils ________ jouer dehors.",                 answer: "pourront",   difficulty: 3 },

      /* ── 3e GROUPE : vouloir (radical voudr-) ── */
      { subject: "je",    infinitive: "vouloir", sentence: "Je ________ un chien pour Noël.",            answer: "voudrai",    difficulty: 3 },
      { subject: "tu",    infinitive: "vouloir", sentence: "Tu ________ du gâteau ?",                    answer: "voudras",    difficulty: 3 },
      { subject: "ils",   infinitive: "vouloir", sentence: "Ils ________ partir en premier.",            answer: "voudront",   difficulty: 3 },

      /* ── 3e GROUPE : dire (radical dir-) ── */
      { subject: "je",    infinitive: "dire",    sentence: "Je ________ la vérité.",                     answer: "dirai",      difficulty: 2 },
      { subject: "tu",    infinitive: "dire",    sentence: "Tu ________ merci.",                         answer: "diras",      difficulty: 2 },
      { subject: "ils",   infinitive: "dire",    sentence: "Ils ________ ce qu'ils pensent.",            answer: "diront",     difficulty: 2 },

      /* ── 3e GROUPE : prendre (radical prendr-) ── */
      { subject: "je",    infinitive: "prendre", sentence: "Je ________ le train.",                      answer: "prendrai",   difficulty: 2 },
      { subject: "tu",    infinitive: "prendre", sentence: "Tu ________ ton manteau.",                   answer: "prendras",   difficulty: 2 },
      { subject: "elle",  infinitive: "prendre", sentence: "Elle ________ soin de toi.",                 answer: "prendra",    difficulty: 2 },
      { subject: "ils",   infinitive: "prendre", sentence: "Ils ________ leurs affaires.",               answer: "prendront",  difficulty: 2 }
    ]
  },

  "conjuguer-passe-simple": {
    title: "Conjuguer des verbes au passé simple",
    type: "text-input",
    levels: ["CM2", "6e"],
    questionsPerSession: 25,
    sortByDifficulty: true,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── ÊTRE (je fus, tu fus, il fut, nous fûmes, vous fûtes, ils furent) ── */
      { subject: "je",    infinitive: "être",    sentence: "Ce jour-là, je ________ très courageux.",              answer: "fus",      difficulty: 3 },
      { subject: "tu",    infinitive: "être",    sentence: "Tu ________ le premier à arriver sur les lieux.",      answer: "fus",      difficulty: 3 },
      { subject: "il",    infinitive: "être",    sentence: "Il ________ très surpris par la nouvelle.",            answer: "fut",      difficulty: 3 },
      { subject: "elle",  infinitive: "être",    sentence: "Elle ________ heureuse d'apprendre la nouvelle.",      answer: "fut",      difficulty: 3 },
      { subject: "nous",  infinitive: "être",    sentence: "Nous ________ récompensés pour notre courage.",        answer: "fûmes",    difficulty: 3 },
      { subject: "vous",  infinitive: "être",    sentence: "Vous ________ les héros de cette aventure.",           answer: "fûtes",    difficulty: 3 },
      { subject: "ils",   infinitive: "être",    sentence: "Ils ________ très émus à la fin du spectacle.",        answer: "furent",   difficulty: 3 },
      { subject: "elles", infinitive: "être",    sentence: "Elles ________ ravies de leur long voyage.",           answer: "furent",   difficulty: 3 },

      /* ── AVOIR (j'eus, tu eus, il eut, nous eûmes, vous eûtes, ils eurent) ── */
      { subject: "j'",    infinitive: "avoir",   sentence: "J'________ très peur en traversant la forêt.",         answer: "eus",      difficulty: 3 },
      { subject: "tu",    infinitive: "avoir",   sentence: "Tu ________ une idée brillante à ce moment-là.",       answer: "eus",      difficulty: 3 },
      { subject: "il",    infinitive: "avoir",   sentence: "Il ________ très faim après la longue randonnée.",     answer: "eut",      difficulty: 3 },
      { subject: "elle",  infinitive: "avoir",   sentence: "Elle ________ un grand courage face au danger.",       answer: "eut",      difficulty: 3 },
      { subject: "nous",  infinitive: "avoir",   sentence: "Nous ________ beaucoup de chance ce jour-là.",         answer: "eûmes",    difficulty: 3 },
      { subject: "vous",  infinitive: "avoir",   sentence: "Vous ________ la surprise de votre vie.",              answer: "eûtes",    difficulty: 3 },
      { subject: "ils",   infinitive: "avoir",   sentence: "Ils ________ du mal à trouver leur chemin.",           answer: "eurent",   difficulty: 3 },
      { subject: "elles", infinitive: "avoir",   sentence: "Elles ________ envie de repartir dès le lendemain.",   answer: "eurent",   difficulty: 3 },

      /* ── 1er GROUPE : chanter ── */
      { subject: "je",    infinitive: "chanter", sentence: "Je ________ une vieille chanson autour du feu.",       answer: "chantai",    difficulty: 1 },
      { subject: "tu",    infinitive: "chanter", sentence: "Tu ________ devant tout le village.",                  answer: "chantas",    difficulty: 1 },
      { subject: "il",    infinitive: "chanter", sentence: "Il ________ pour célébrer la victoire.",               answer: "chanta",     difficulty: 1 },
      { subject: "nous",  infinitive: "chanter", sentence: "Nous ________ tous ensemble jusqu'au matin.",          answer: "chantâmes",  difficulty: 2 },
      { subject: "vous",  infinitive: "chanter", sentence: "Vous ________ si bien que tout le monde applaudit.",   answer: "chantâtes",  difficulty: 2 },
      { subject: "ils",   infinitive: "chanter", sentence: "Ils ________ et dansèrent jusqu'au lever du jour.",    answer: "chantèrent", difficulty: 2 },

      /* ── 1er GROUPE : parler ── */
      { subject: "je",    infinitive: "parler",  sentence: "Je ________ au roi avec beaucoup de respect.",         answer: "parlai",    difficulty: 1 },
      { subject: "tu",    infinitive: "parler",  sentence: "Tu ________ d'une voix douce et assurée.",             answer: "parlas",    difficulty: 1 },
      { subject: "il",    infinitive: "parler",  sentence: "Il ________ pendant de longues heures.",               answer: "parla",     difficulty: 1 },
      { subject: "nous",  infinitive: "parler",  sentence: "Nous ________ longuement de cette étrange aventure.",  answer: "parlâmes",  difficulty: 2 },
      { subject: "vous",  infinitive: "parler",  sentence: "Vous ________ avec beaucoup de sagesse.",              answer: "parlâtes",  difficulty: 2 },
      { subject: "ils",   infinitive: "parler",  sentence: "Ils ________ entre eux à voix basse.",                 answer: "parlèrent", difficulty: 2 },

      /* ── 1er GROUPE : marcher ── */
      { subject: "je",    infinitive: "marcher", sentence: "Je ________ toute la nuit pour rentrer chez moi.",     answer: "marchai",    difficulty: 1 },
      { subject: "il",    infinitive: "marcher", sentence: "Il ________ seul jusqu'au vieux château.",             answer: "marcha",     difficulty: 1 },
      { subject: "nous",  infinitive: "marcher", sentence: "Nous ________ en silence à travers la forêt sombre.",  answer: "marchâmes",  difficulty: 2 },
      { subject: "ils",   infinitive: "marcher", sentence: "Ils ________ pendant des heures sans s'arrêter.",      answer: "marchèrent", difficulty: 2 },

      /* ── 1er GROUPE : regarder ── */
      { subject: "je",    infinitive: "regarder",sentence: "Je ________ le coucher de soleil en silence.",         answer: "regardai",    difficulty: 1 },
      { subject: "tu",    infinitive: "regarder",sentence: "Tu ________ les étoiles toute la nuit.",               answer: "regardas",    difficulty: 1 },
      { subject: "elle",  infinitive: "regarder",sentence: "Elle ________ le tableau sans dire un mot.",           answer: "regarda",     difficulty: 1 },
      { subject: "ils",   infinitive: "regarder",sentence: "Ils ________ le bateau disparaître à l'horizon.",      answer: "regardèrent", difficulty: 2 },

      /* ── 1er GROUPE : trouver ── */
      { subject: "il",    infinitive: "trouver", sentence: "Il ________ un trésor caché dans la grotte.",          answer: "trouva",     difficulty: 1 },
      { subject: "nous",  infinitive: "trouver", sentence: "Nous ________ enfin la sortie du labyrinthe.",         answer: "trouvâmes",  difficulty: 2 },
      { subject: "ils",   infinitive: "trouver", sentence: "Ils ________ refuge dans une vieille cabane.",         answer: "trouvèrent", difficulty: 2 },

      /* ── 1er GROUPE : entrer ── */
      { subject: "il",    infinitive: "entrer",  sentence: "Il ________ dans la pièce sans frapper.",              answer: "entra",     difficulty: 1 },
      { subject: "nous",  infinitive: "entrer",  sentence: "Nous ________ dans le château au lever du soleil.",    answer: "entrâmes",  difficulty: 2 },
      { subject: "ils",   infinitive: "entrer",  sentence: "Ils ________ dans la ville en triomphe.",              answer: "entrèrent", difficulty: 2 },

      /* ── 1er GROUPE : tomber ── */
      { subject: "je",    infinitive: "tomber",  sentence: "Je ________ de fatigue à la fin de la course.",        answer: "tombai",    difficulty: 1 },
      { subject: "il",    infinitive: "tomber",  sentence: "Il ________ dans le piège tendu par l'ennemi.",        answer: "tomba",     difficulty: 1 },
      { subject: "ils",   infinitive: "tomber",  sentence: "Ils ________ les uns après les autres.",               answer: "tombèrent", difficulty: 2 },

      /* ── 1er GROUPE : crier ── */
      { subject: "elle",  infinitive: "crier",   sentence: "Elle ________ de joie en voyant le résultat.",         answer: "cria",      difficulty: 1 },
      { subject: "ils",   infinitive: "crier",   sentence: "Ils ________ pour alerter le reste du village.",       answer: "crièrent",  difficulty: 2 },

      /* ── 2e GROUPE : finir ── */
      { subject: "je",    infinitive: "finir",   sentence: "Je ________ mon récit et fermai le livre.",            answer: "finis",     difficulty: 1 },
      { subject: "tu",    infinitive: "finir",   sentence: "Tu ________ ta course le premier.",                    answer: "finis",     difficulty: 1 },
      { subject: "il",    infinitive: "finir",   sentence: "Il ________ son discours sous les applaudissements.",  answer: "finit",     difficulty: 1 },
      { subject: "nous",  infinitive: "finir",   sentence: "Nous ________ notre long voyage à la tombée de la nuit.", answer: "finîmes", difficulty: 2 },
      { subject: "vous",  infinitive: "finir",   sentence: "Vous ________ votre repas en silence.",                answer: "finîtes",  difficulty: 2 },
      { subject: "ils",   infinitive: "finir",   sentence: "Ils ________ par trouver la bonne solution.",          answer: "finirent", difficulty: 2 },

      /* ── 2e GROUPE : choisir ── */
      { subject: "je",    infinitive: "choisir", sentence: "Je ________ le chemin le plus court.",                 answer: "choisis",    difficulty: 1 },
      { subject: "il",    infinitive: "choisir", sentence: "Il ________ la plus belle des pierres précieuses.",    answer: "choisit",    difficulty: 1 },
      { subject: "nous",  infinitive: "choisir", sentence: "Nous ________ de rester ensemble coûte que coûte.",    answer: "choisîmes",  difficulty: 2 },
      { subject: "ils",   infinitive: "choisir", sentence: "Ils ________ leur chef après une longue discussion.",  answer: "choisirent", difficulty: 2 },

      /* ── 2e GROUPE : grandir ── */
      { subject: "il",    infinitive: "grandir", sentence: "Il ________ vite et devint un homme fort.",            answer: "grandit",    difficulty: 1 },
      { subject: "ils",   infinitive: "grandir", sentence: "Ils ________ ensemble dans ce petit village.",         answer: "grandirent", difficulty: 2 },

      /* ── 2e GROUPE : réussir ── */
      { subject: "il",    infinitive: "réussir", sentence: "Il ________ enfin à traverser la rivière.",            answer: "réussit",    difficulty: 1 },
      { subject: "nous",  infinitive: "réussir", sentence: "Nous ________ à déjouer tous les pièges.",             answer: "réussîmes",  difficulty: 2 },
      { subject: "ils",   infinitive: "réussir", sentence: "Ils ________ à atteindre le sommet au coucher du soleil.", answer: "réussirent", difficulty: 2 },

      /* ── 2e GROUPE : obéir ── */
      { subject: "il",    infinitive: "obéir",   sentence: "Il ________ aux ordres sans discuter.",                answer: "obéit",     difficulty: 1 },
      { subject: "ils",   infinitive: "obéir",   sentence: "Ils ________ au signal et s'immobilisèrent.",          answer: "obéirent",  difficulty: 2 },

      /* ── 2e GROUPE : rougir ── */
      { subject: "elle",  infinitive: "rougir",  sentence: "Elle ________ en entendant ces mots.",                 answer: "rougit",    difficulty: 1 },
      { subject: "ils",   infinitive: "rougir",  sentence: "Ils ________ de honte devant toute la cour.",          answer: "rougirent", difficulty: 2 }
    ]
  },

  "conjuguer-avoir-present": {
    title: "Conjuguer le verbe avoir au présent",
    verb: "avoir",
    levels: ["CM1", "CM2", "6e"],
    exerciseTypes: ["fill-blank", "multiple-choice", "matching", "find-error", "conjugation-table", "guess-subject", "word-order"],
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── fill-blank & multiple-choice ── */
    bank: [
      { subject: "je",    sentence: "J'___ faim.",                    answer: "ai",    choices: ["ai",   "as",    "a",    "avons"],  difficulty: 1 },
      { subject: "je",    sentence: "J'___ un chien.",                answer: "ai",    choices: ["ai",   "as",    "a",    "ont"],    difficulty: 1 },
      { subject: "je",    sentence: "J'___ dix ans.",                 answer: "ai",    choices: ["ai",   "as",    "a",    "avez"],   difficulty: 1 },
      { subject: "tu",    sentence: "Tu ___ de la chance.",           answer: "as",    choices: ["as",   "ai",    "a",    "avez"],   difficulty: 1 },
      { subject: "tu",    sentence: "Tu ___ un vélo.",                answer: "as",    choices: ["as",   "ai",    "a",    "ont"],    difficulty: 1 },
      { subject: "tu",    sentence: "Tu ___ soif.",                   answer: "as",    choices: ["as",   "ai",    "a",    "avons"],  difficulty: 1 },
      { subject: "il",    sentence: "Il ___ peur.",                   answer: "a",     choices: ["a",    "as",    "ai",   "ont"],    difficulty: 1 },
      { subject: "elle",  sentence: "Elle ___ froid.",                answer: "a",     choices: ["a",    "as",    "ai",   "avons"],  difficulty: 1 },
      { subject: "on",    sentence: "On ___ le temps.",               answer: "a",     choices: ["a",    "ont",   "avez", "as"],     difficulty: 2 },
      { subject: "nous",  sentence: "Nous ___ un chat.",              answer: "avons", choices: ["avons","avez",  "ont",  "a"],      difficulty: 2 },
      { subject: "nous",  sentence: "Nous ___ faim.",                 answer: "avons", choices: ["avons","avez",  "ont",  "a"],      difficulty: 2 },
      { subject: "nous",  sentence: "Nous ___ de la chance.",         answer: "avons", choices: ["avons","avez",  "ont",  "as"],     difficulty: 2 },
      { subject: "vous",  sentence: "Vous ___ raison.",               answer: "avez",  choices: ["avez", "avons", "ont",  "a"],      difficulty: 2 },
      { subject: "vous",  sentence: "Vous ___ un frère.",             answer: "avez",  choices: ["avez", "avons", "ont",  "a"],      difficulty: 2 },
      { subject: "vous",  sentence: "Vous ___ de la chance.",         answer: "avez",  choices: ["avez", "avons", "ont",  "as"],     difficulty: 2 },
      { subject: "ils",   sentence: "Ils ___ tort.",                  answer: "ont",   choices: ["ont",  "avons", "avez", "a"],      difficulty: 3 },
      { subject: "elles", sentence: "Elles ___ froid.",               answer: "ont",   choices: ["ont",  "avons", "avez", "a"],      difficulty: 3 },
      { subject: "ils",   sentence: "Ils ___ deux chiens.",           answer: "ont",   choices: ["ont",  "avons", "avez", "a"],      difficulty: 3 },
      { subject: "il",    sentence: "Le chat ___ faim.",              answer: "a",     choices: ["a",    "as",    "ai",   "ont"],    difficulty: 2 },
      { subject: "elles", sentence: "Les élèves ___ de la chance.",   answer: "ont",   choices: ["ont",  "a",     "avez", "avons"],  difficulty: 2 },
      { subject: "nous",  sentence: "Ma sœur et moi ___ un vélo.",   answer: "avons", choices: ["avons","avez",  "ont",  "a"],      difficulty: 3 },
      { subject: "vous",  sentence: "Toi et ton ami ___ de la chance.",answer: "avez", choices: ["avez", "avons", "ont",  "a"],      difficulty: 3 }
    ],

    /* ── matching & conjugation-table ── */
    conjugationForms: [
      { subject: "J'",           answer: "ai",    choices: ["ai",   "as",    "a",    "avez"]   },
      { subject: "Tu",           answer: "as",    choices: ["as",   "ai",    "a",    "avons"]  },
      { subject: "Il / Elle",    answer: "a",     choices: ["a",    "as",    "ai",   "ont"]    },
      { subject: "Nous",         answer: "avons", choices: ["avons","avez",  "ont",  "a"]      },
      { subject: "Vous",         answer: "avez",  choices: ["avez", "avons", "a",    "ont"]    },
      { subject: "Ils / Elles",  answer: "ont",   choices: ["ont",  "avons", "avez", "a"]      }
    ],

    /* ── guess-subject ── */
    guessSubjectBank: [
      { sentence: "_____ a faim.",               answer: "Il",    choices: ["Je",    "Tu",    "Il",    "Nous"]  },
      { sentence: "_____ ai soif.",              answer: "Je",    choices: ["Je",    "Tu",    "Il",    "Nous"]  },
      { sentence: "_____ as un chien.",          answer: "Tu",    choices: ["Je",    "Tu",    "Il",    "Vous"]  },
      { sentence: "_____ avons raison.",         answer: "Nous",  choices: ["Je",    "Nous",  "Vous",  "Ils"]   },
      { sentence: "_____ avez tort.",            answer: "Vous",  choices: ["Tu",    "Nous",  "Vous",  "Ils"]   },
      { sentence: "_____ ont de la chance.",     answer: "Ils",   choices: ["Il",    "Nous",  "Vous",  "Ils"]   },
      { sentence: "_____ a froid.",              answer: "Elle",  choices: ["Je",    "Tu",    "Il",    "Elle"]  },
      { sentence: "_____ avez deux chats.",      answer: "Vous",  choices: ["Nous",  "Vous",  "Ils",   "Elles"] },
      { sentence: "_____ ont peur.",             answer: "Elles", choices: ["Il",    "Nous",  "Ils",   "Elles"] },
      { sentence: "_____ avons un vélo.",        answer: "Nous",  choices: ["Je",    "Nous",  "Vous",  "Ils"]   },
      { sentence: "_____ ai dix ans.",           answer: "Je",    choices: ["Je",    "Tu",    "Nous",  "Vous"]  },
      { sentence: "_____ as de la chance.",      answer: "Tu",    choices: ["Je",    "Tu",    "Il",    "Vous"]  }
    ],

    /* ── find-error ── */
    findErrorBank: [
      { sentence: "Nous a un chien.",          errorWord: "a",     correction: "Nous avons un chien."          },
      { sentence: "J'as faim.",                errorWord: "J'as",  correction: "J'ai faim."                    },
      { sentence: "Ils a tort.",               errorWord: "a",     correction: "Ils ont tort."                 },
      { sentence: "Vous ai raison.",           errorWord: "ai",    correction: "Vous avez raison."             },
      { sentence: "Tu ont de la chance.",      errorWord: "ont",   correction: "Tu as de la chance."           },
      { sentence: "Elle avons froid.",         errorWord: "avons", correction: "Elle a froid."                 },
      { sentence: "Nous avez un vélo.",        errorWord: "avez",  correction: "Nous avons un vélo."           },
      { sentence: "J'avons dix ans.",          errorWord: "J'avons", correction: "J'ai dix ans."               },
      { sentence: "Ils ai tort.",              errorWord: "ai",    correction: "Ils ont tort."                 },
      { sentence: "Tu a soif.",               errorWord: "a",     correction: "Tu as soif."                   },
      { sentence: "Vous ont raison.",          errorWord: "ont",   correction: "Vous avez raison."             },
      { sentence: "Elles as peur.",            errorWord: "as",    correction: "Elles ont peur."               }
    ],

    /* ── word-order ── */
    wordOrderBank: [
      { words: ["tu",    "as",    "très",  "faim"],       answer: "tu as très faim."            },
      { words: ["tu",    "as",    "soif"],              answer: "tu as soif."                  },
      { words: ["il",    "a",     "peur"],              answer: "il a peur."                   },
      { words: ["nous",  "avons", "un",    "chien"],    answer: "nous avons un chien."         },
      { words: ["vous",  "avez",  "raison"],            answer: "vous avez raison."            },
      { words: ["ils",   "ont",   "tort"],              answer: "ils ont tort."                },
      { words: ["elle",  "a",     "froid"],             answer: "elle a froid."                },
      { words: ["nous",  "avons", "de",    "la",  "chance"], answer: "nous avons de la chance." },
      { words: ["elles", "ont",   "peur"],              answer: "elles ont peur."              },
      { words: ["tu",    "as",    "de",    "la",  "chance"], answer: "tu as de la chance."     },
      { words: ["il",    "a",     "dix",   "ans"],       answer: "il a dix ans."               },
      { words: ["vous",  "avez",  "un",    "chat"],     answer: "vous avez un chat."           }
    ]
  },

  "retrouver-infinitif-passe-compose": {
    title: "Retrouver l'infinitif d'un verbe au passé composé",
    type: "infinitif-passe-compose",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 15,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── AVOIR — 1er groupe (peu) ── */
      { sentence: "Il a mangé une pomme.",               participle: "mangé",    infinitive: "manger"    },
      { sentence: "Elle a chanté une belle chanson.",    participle: "chanté",   infinitive: "chanter"   },
      { sentence: "J'ai parlé à mon ami.",               participle: "parlé",    infinitive: "parler"    },

      /* ── AVOIR — 2e groupe ── */
      { sentence: "Vous avez fini vos devoirs.",         participle: "fini",     infinitive: "finir"     },
      { sentence: "Elle a choisi une robe rouge.",       participle: "choisi",   infinitive: "choisir"   },
      { sentence: "Il a réussi son exercice.",           participle: "réussi",   infinitive: "réussir"   },
      { sentence: "Ils ont obéi aux règles.",            participle: "obéi",     infinitive: "obéir"     },

      /* ── AVOIR — 3e groupe (surtout) ── */
      { sentence: "Ils ont pris le bus.",                participle: "pris",     infinitive: "prendre"   },
      { sentence: "J'ai lu un livre passionnant.",       participle: "lu",       infinitive: "lire"      },
      { sentence: "Il a écrit une longue lettre.",       participle: "écrit",    infinitive: "écrire"    },
      { sentence: "Elle a dit la vérité.",               participle: "dit",      infinitive: "dire"      },
      { sentence: "Ils ont fait leurs devoirs.",         participle: "fait",     infinitive: "faire"     },
      { sentence: "Tu as vu ce beau film.",              participle: "vu",       infinitive: "voir"      },
      { sentence: "Il a voulu partir tôt.",              participle: "voulu",    infinitive: "vouloir"   },
      { sentence: "Nous avons entendu un bruit.",        participle: "entendu",  infinitive: "entendre"  },
      { sentence: "Tu as appris ta leçon.",              participle: "appris",   infinitive: "apprendre" },
      { sentence: "Elle a ouvert la fenêtre.",           participle: "ouvert",   infinitive: "ouvrir"    },
      { sentence: "Nous avons compris la leçon.",        participle: "compris",  infinitive: "comprendre"},

      /* ── ÊTRE — 3e groupe (surtout) ── */
      { sentence: "Il est allé à l'école.",              participle: "allé",     infinitive: "aller"     },
      { sentence: "Elle est partie en vacances.",        participle: "partie",   infinitive: "partir"    },
      { sentence: "Tu es sorti jouer dehors.",           participle: "sorti",    infinitive: "sortir"    },
      { sentence: "Il est venu nous voir.",              participle: "venu",     infinitive: "venir"     },
      { sentence: "Ils sont descendus rapidement.",      participle: "descendus",infinitive: "descendre" },
      { sentence: "Elle est revenue à la maison.",       participle: "revenue",  infinitive: "revenir"   },
      { sentence: "Elle est tombée dans la cour.",       participle: "tombée",   infinitive: "tomber"    }
    ]
  },

  "identifier-auxiliaire": {
    title: "Identifier l'auxiliaire",
    type: "auxiliaire-identifier",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 15,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── ÊTRE ── */
      { sentence: "Il ___ allé à l'école.",            auxiliary: "être",  answer: "est"    },
      { sentence: "Elle ___ partie en vacances.",       auxiliary: "être",  answer: "est"    },
      { sentence: "Nous ___ arrivés en retard.",        auxiliary: "être",  answer: "sommes" },
      { sentence: "Tu ___ sorti jouer dehors.",         auxiliary: "être",  answer: "es"     },
      { sentence: "Vous ___ entrés dans la classe.",    auxiliary: "être",  answer: "êtes"   },
      { sentence: "Ils ___ restés à la maison.",        auxiliary: "être",  answer: "sont"   },
      { sentence: "Je ___ venu te voir.",               auxiliary: "être",  answer: "suis"   },
      { sentence: "Elle ___ tombée dans la cour.",      auxiliary: "être",  answer: "est"    },
      { sentence: "Il ___ monté dans sa chambre.",      auxiliary: "être",  answer: "est"    },
      { sentence: "Elles ___ retournées à l'école.",    auxiliary: "être",  answer: "sont"   },
      { sentence: "Elle ___ née en hiver.",             auxiliary: "être",  answer: "est"    },
      { sentence: "Ils ___ descendus rapidement.",      auxiliary: "être",  answer: "sont"   },

      /* ── AVOIR ── */
      { sentence: "J'___ mangé une pomme.",             auxiliary: "avoir", answer: "ai"     },
      { sentence: "Tu ___ joué dans le jardin.",        auxiliary: "avoir", answer: "as"     },
      { sentence: "Elle ___ chanté une chanson.",       auxiliary: "avoir", answer: "a"      },
      { sentence: "Nous ___ regardé un film.",          auxiliary: "avoir", answer: "avons"  },
      { sentence: "Vous ___ fini vos devoirs.",         auxiliary: "avoir", answer: "avez"   },
      { sentence: "Ils ___ pris le bus.",               auxiliary: "avoir", answer: "ont"    },
      { sentence: "Il ___ lu un livre.",                auxiliary: "avoir", answer: "a"      },
      { sentence: "Nous ___ écrit une lettre.",         auxiliary: "avoir", answer: "avons"  },
      { sentence: "Tu ___ vu ce film ?",                auxiliary: "avoir", answer: "as"     },
      { sentence: "Elles ___ choisi leur dessert.",     auxiliary: "avoir", answer: "ont"    },
      { sentence: "Je ___ trouvé mon stylo.",           auxiliary: "avoir", answer: "ai"     },
      { sentence: "Il ___ répondu à la question.",      auxiliary: "avoir", answer: "a"      },
      { sentence: "Nous ___ fait nos devoirs.",         auxiliary: "avoir", answer: "avons"  },
      { sentence: "Tu ___ porté le sac.",               auxiliary: "avoir", answer: "as"     }
    ]
  },

  "identifier-phrase-declarative": {
    title: "Identifier une phrase déclarative",
    levels: ["CM1", "CM2", "6e"],
    type: "yes-no",
    questionsPerSession: 15,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      /* ── Phrases déclaratives — début (phrases courtes) ── */
      { sentence: "Le chien court.",                                                           isDeclarative: true  },
      { sentence: "Je mange une pomme.",                                                       isDeclarative: true  },
      { sentence: "Emma joue du piano.",                                                       isDeclarative: true  },
      { sentence: "Il pleut depuis ce matin.",                                                 isDeclarative: true  },
      { sentence: "Le train arrive à la gare.",                                                isDeclarative: true  },
      /* ── Phrases déclaratives — milieu ── */
      { sentence: "Mon frère lit une bande dessinée.",                                         isDeclarative: true  },
      { sentence: "Les oiseaux chantent dans les arbres.",                                     isDeclarative: true  },
      { sentence: "La maîtresse distribue les cahiers.",                                       isDeclarative: true  },
      { sentence: "Les enfants jouent dans la cour.",                                          isDeclarative: true  },
      { sentence: "Papa prépare le dîner.",                                                    isDeclarative: true  },
      /* ── Phrases déclaratives — fin (phrases développées) ── */
      { sentence: "Le jardin est couvert de fleurs.",                                          isDeclarative: true  },
      { sentence: "Vous êtes très gentils.",                                                   isDeclarative: true  },
      { sentence: "Le soleil se couche derrière les montagnes.",                               isDeclarative: true  },
      { sentence: "Après la récréation, les élèves retournent calmement dans leur classe.",    isDeclarative: true  },
      { sentence: "Dans le jardin, les fleurs poussent rapidement au printemps.",              isDeclarative: true  },
      /* ── Phrases non déclaratives — début (courtes) ── */
      { sentence: "Où vas-tu ?",                                                               isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Ferme la fenêtre.",                                                         isDeclarative: false, phraseType: "imperative"    },
      { sentence: "Range tes affaires.",                                                       isDeclarative: false, phraseType: "imperative"    },
      /* ── Phrases non déclaratives — milieu ── */
      { sentence: "Comment t'appelles-tu ?",                                                   isDeclarative: false, phraseType: "interrogative" },
      { sentence: "As-tu fini ton exercice ?",                                                 isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Écoute attentivement.",                                                     isDeclarative: false, phraseType: "imperative"    },
      { sentence: "Pourquoi regardes-tu le ciel ?",                                            isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Que fais-tu ce soir ?",                                                     isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Prenez vos cahiers.",                                                       isDeclarative: false, phraseType: "imperative"    },
      { sentence: "Traverse la rue avec prudence.",                                            isDeclarative: false, phraseType: "imperative"    },
      /* ── Phrases non déclaratives — fin (plus longues) ── */
      { sentence: "Referme le livre.",                                                         isDeclarative: false, phraseType: "imperative"    },
      { sentence: "Quand partons-nous ?",                                                      isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Peux-tu m'aider ?",                                                        isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Veux-tu venir avec nous ?",                                                 isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Peux-tu expliquer comment tu as trouvé cette réponse ?",                   isDeclarative: false, phraseType: "interrogative" }
    ]
  },

  "identifier-verbe-conjugue": {
    title: "Identifier le verbe conjugué",
    levels: ["CE2", "CM1", "CM2"],
    type: "find-conjugated-verb",
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* difficulty 1 — SVO simple, verbe évident */
      {
        sentence:   "Le chat dort sur le canapé.",
        answer:     "dort",
        choices:    ["chat",      "dort",       "canapé",       "sur"],
        difficulty: 1
      },
      {
        sentence:   "Le chien court dans le jardin.",
        answer:     "court",
        choices:    ["chien",     "court",      "jardin",       "dans"],
        difficulty: 1
      },
      {
        sentence:   "Emma chante une chanson.",
        answer:     "chante",
        choices:    ["emma",      "chante",     "chanson",      "une"],
        difficulty: 1
      },
      {
        sentence:   "Le soleil brille aujourd'hui.",
        answer:     "brille",
        choices:    ["soleil",    "brille",     "aujourd'hui",  "le"],
        difficulty: 1
      },
      {
        sentence:   "Tu regardes un film.",
        answer:     "regardes",
        choices:    ["tu",        "regardes",   "film",         "un"],
        difficulty: 1
      },
      {
        sentence:   "Je dessine un arbre.",
        answer:     "dessine",
        choices:    ["je",        "dessine",    "arbre",        "un"],
        difficulty: 1
      },
      {
        sentence:   "Le vent souffle fort.",
        answer:     "souffle",
        choices:    ["vent",      "souffle",    "fort",         "le"],
        difficulty: 1
      },
      {
        sentence:   "Papa cuisine un gâteau.",
        answer:     "cuisine",
        choices:    ["papa",      "cuisine",    "gâteau",       "un"],
        difficulty: 1
      },

      /* difficulty 2 — phrases plus longues, position du verbe moins prévisible */
      {
        sentence:   "Nous préparons le repas.",
        answer:     "préparons",
        choices:    ["nous",      "préparons",  "repas",        "le"],
        difficulty: 2
      },
      {
        sentence:   "Les oiseaux volent dans le ciel.",
        answer:     "volent",
        choices:    ["oiseaux",   "volent",     "ciel",         "dans"],
        difficulty: 2
      },
      {
        sentence:   "Ils jouent au football.",
        answer:     "jouent",
        choices:    ["ils",       "jouent",     "football",     "au"],
        difficulty: 2
      },
      {
        sentence:   "Vous écrivez une lettre.",
        answer:     "écrivez",
        choices:    ["vous",      "écrivez",    "lettre",       "une"],
        difficulty: 2
      },
      {
        sentence:   "Les enfants rient beaucoup.",
        answer:     "rient",
        choices:    ["enfants",   "rient",      "beaucoup",     "les"],
        difficulty: 2
      },
      {
        sentence:   "La maîtresse explique la leçon.",
        answer:     "explique",
        choices:    ["maîtresse", "explique",   "leçon",        "la"],
        difficulty: 2
      },
      {
        sentence:   "Les fleurs poussent au printemps.",
        answer:     "poussent",
        choices:    ["fleurs",    "poussent",   "printemps",    "au"],
        difficulty: 2
      },
      {
        sentence:   "Les poissons nagent dans l'eau.",
        answer:     "nagent",
        choices:    ["poissons",  "nagent",     "eau",          "dans"],
        difficulty: 2
      },
      {
        sentence:   "Mon frère construit une cabane.",
        answer:     "construit",
        choices:    ["frère",     "construit",  "cabane",       "mon"],
        difficulty: 2
      },
      {
        sentence:   "Tu ouvres la fenêtre.",
        answer:     "ouvres",
        choices:    ["tu",        "ouvres",     "fenêtre",      "la"],
        difficulty: 2
      },
      {
        sentence:   "Nous visitons le musée.",
        answer:     "visitons",
        choices:    ["nous",      "visitons",   "musée",        "le"],
        difficulty: 2
      },
      {
        sentence:   "Le bébé pleure dans son lit.",
        answer:     "pleure",
        choices:    ["bébé",      "pleure",     "lit",          "dans"],
        difficulty: 2
      },

      /* difficulty 3 — adverbes ou noms pouvant piéger */
      {
        sentence:   "Les élèves travaillent sérieusement.",
        answer:     "travaillent",
        choices:    ["élèves",    "travaillent","sérieusement", "les"],
        difficulty: 3
      },
      {
        sentence:   "Le renard observe ses proies.",
        answer:     "observe",
        choices:    ["renard",    "observe",    "proies",       "ses"],
        difficulty: 3
      },
      {
        sentence:   "Les astronautes flottent dans l'espace.",
        answer:     "flottent",
        choices:    ["astronautes","flottent",  "espace",       "dans"],
        difficulty: 3
      },
      {
        sentence:   "Mon chat attrape les papillons.",
        answer:     "attrape",
        choices:    ["chat",      "attrape",    "papillons",    "mon"],
        difficulty: 3
      },
      {
        sentence:   "La rivière traverse la forêt.",
        answer:     "traverse",
        choices:    ["rivière",   "traverse",   "forêt",        "la"],
        difficulty: 3
      },
      {
        sentence:   "Léa résout l'exercice rapidement.",
        answer:     "résout",
        choices:    ["léa",       "résout",     "exercice",     "rapidement"],
        difficulty: 3
      }
    ]
  }

};

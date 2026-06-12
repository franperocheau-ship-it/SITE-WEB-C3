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
    yesNoLabel: "Cette phrase est-elle déclarative ?",
    targetTypeName: "déclarative",
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
      { sentence: "Ferme la fenêtre.",                                                         isDeclarative: false, phraseType: "impérative"    },
      { sentence: "Range tes affaires.",                                                       isDeclarative: false, phraseType: "impérative"    },
      /* ── Phrases non déclaratives — milieu ── */
      { sentence: "Comment t'appelles-tu ?",                                                   isDeclarative: false, phraseType: "interrogative" },
      { sentence: "As-tu fini ton exercice ?",                                                 isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Écoute attentivement.",                                                     isDeclarative: false, phraseType: "impérative"    },
      { sentence: "Pourquoi regardes-tu le ciel ?",                                            isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Que fais-tu ce soir ?",                                                     isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Prenez vos cahiers.",                                                       isDeclarative: false, phraseType: "impérative"    },
      { sentence: "Traverse la rue avec prudence.",                                            isDeclarative: false, phraseType: "impérative"    },
      /* ── Phrases non déclaratives — fin (plus longues) ── */
      { sentence: "Referme le livre.",                                                         isDeclarative: false, phraseType: "impérative"    },
      { sentence: "Quand partons-nous ?",                                                      isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Peux-tu m'aider ?",                                                        isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Veux-tu venir avec nous ?",                                                 isDeclarative: false, phraseType: "interrogative" },
      { sentence: "Peux-tu expliquer comment tu as trouvé cette réponse ?",                   isDeclarative: false, phraseType: "interrogative" }
    ]
  },

  "transformer-declarative-interrogative": {
    title: "Transformer une phrase déclarative en phrase interrogative",
    levels: ["CM1", "CM2", "6e"],
    type: "transform-interrogative",
    questionsPerSession: 10,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      {
        sentence:  "Tu ranges tes affaires.",
        keyWords:  ["ranges", "affaires"],
        modelEcQ:  "Est-ce que tu ranges tes affaires ?",
        modelInv:  "Ranges-tu tes affaires ?"
      },
      {
        sentence:  "Il mange une pomme.",
        keyWords:  ["mange", "pomme"],
        modelEcQ:  "Est-ce qu'il mange une pomme ?",
        modelInv:  "Mange-t-il une pomme ?"
      },
      {
        sentence:  "Les enfants jouent dans le jardin.",
        keyWords:  ["enfants", "jouent", "jardin"],
        modelEcQ:  "Est-ce que les enfants jouent dans le jardin ?",
        modelInv:  "Les enfants jouent-ils dans le jardin ?"
      },
      {
        sentence:  "Elle lit un livre.",
        keyWords:  ["lit", "livre"],
        modelEcQ:  "Est-ce qu'elle lit un livre ?",
        modelInv:  "Lit-elle un livre ?"
      },
      {
        sentence:  "Vous aimez la musique.",
        keyWords:  ["aimez", "musique"],
        modelEcQ:  "Est-ce que vous aimez la musique ?",
        modelInv:  "Aimez-vous la musique ?"
      },
      {
        sentence:  "Papa prépare le dîner.",
        keyWords:  ["prépare", "dîner"],
        modelEcQ:  "Est-ce que papa prépare le dîner ?",
        modelInv:  "Papa prépare-t-il le dîner ?"
      },
      {
        sentence:  "Nous partons en vacances demain.",
        keyWords:  ["partons", "vacances", "demain"],
        modelEcQ:  "Est-ce que nous partons en vacances demain ?",
        modelInv:  "Partons-nous en vacances demain ?"
      },
      {
        sentence:  "Le chat dort sur le canapé.",
        keyWords:  ["chat", "dort", "canapé"],
        modelEcQ:  "Est-ce que le chat dort sur le canapé ?",
        modelInv:  "Le chat dort-il sur le canapé ?"
      },
      {
        sentence:  "Les élèves écoutent la maîtresse.",
        keyWords:  ["élèves", "écoutent", "maîtresse"],
        modelEcQ:  "Est-ce que les élèves écoutent la maîtresse ?",
        modelInv:  "Les élèves écoutent-ils la maîtresse ?"
      },
      {
        sentence:  "Tu viens à la fête samedi.",
        keyWords:  ["viens", "fête", "samedi"],
        modelEcQ:  "Est-ce que tu viens à la fête samedi ?",
        modelInv:  "Viens-tu à la fête samedi ?"
      }
    ]
  },

  "transformer-affirmative-negative": {
    title: "Transformer une phrase affirmative en phrase négative",
    levels: ["CM1", "CM2", "6e"],
    type: "transform-negative",
    questionsPerSession: 10,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      {
        sentence:  "Tu ranges tes affaires.",
        keyWords:  ["ranges", "affaires"],
        modelNeg:  "Tu ne ranges pas tes affaires."
      },
      {
        sentence:  "Il mange des bonbons.",
        keyWords:  ["mange", "bonbons"],
        modelNeg:  "Il ne mange pas de bonbons."
      },
      {
        sentence:  "Les enfants jouent dans le jardin.",
        keyWords:  ["enfants", "jouent", "jardin"],
        modelNeg:  "Les enfants ne jouent pas dans le jardin."
      },
      {
        sentence:  "Elle lit tous les soirs.",
        keyWords:  ["lit", "soirs"],
        modelNeg:  "Elle ne lit pas tous les soirs."
      },
      {
        sentence:  "Nous aimons la pizza.",
        keyWords:  ["aimons", "pizza"],
        modelNeg:  "Nous n'aimons pas la pizza."
      },
      {
        sentence:  "Je comprends la leçon.",
        keyWords:  ["comprends", "leçon"],
        modelNeg:  "Je ne comprends pas la leçon."
      },
      {
        sentence:  "Le chat dort sur le canapé.",
        keyWords:  ["chat", "dort", "canapé"],
        modelNeg:  "Le chat ne dort pas sur le canapé."
      },
      {
        sentence:  "Vous regardez la télévision.",
        keyWords:  ["regardez", "télévision"],
        modelNeg:  "Vous ne regardez pas la télévision."
      },
      {
        sentence:  "Papa prépare le dîner.",
        keyWords:  ["prépare", "dîner"],
        modelNeg:  "Papa ne prépare pas le dîner."
      },
      {
        sentence:  "Les élèves écoutent la maîtresse.",
        keyWords:  ["élèves", "écoutent", "maîtresse"],
        modelNeg:  "Les élèves n'écoutent pas la maîtresse."
      }
    ]
  },

  "identifier-phrase-interrogative": {
    title: "Identifier une phrase interrogative",
    levels: ["CM1", "CM2", "6e"],
    type: "yes-no",
    questionsPerSession: 15,
    yesNoLabel: "Cette phrase est-elle interrogative ?",
    targetTypeName: "interrogative",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      /* ── Phrases interrogatives (cibles) ── */
      { sentence: "Où vas-tu ce matin ?",                    isTarget: true  },
      { sentence: "As-tu fini tes devoirs ?",                isTarget: true  },
      { sentence: "Qu'est-ce que tu aimes lire ?",           isTarget: true  },
      { sentence: "Est-ce que tu viens à la fête ?",         isTarget: true  },
      { sentence: "Comment s'appelle ton chat ?",            isTarget: true  },
      { sentence: "Pourquoi es-tu en retard ?",              isTarget: true  },
      { sentence: "Veux-tu jouer avec nous ?",               isTarget: true  },
      /* ── Distracteurs ── */
      { sentence: "Le soleil brille dans le ciel bleu.",     isTarget: false, phraseType: "déclarative"  },
      { sentence: "Ma sœur aime beaucoup la lecture.",       isTarget: false, phraseType: "déclarative"  },
      { sentence: "Nous partons en vacances demain.",        isTarget: false, phraseType: "déclarative"  },
      { sentence: "Les fleurs poussent au printemps.",       isTarget: false, phraseType: "déclarative"  },
      { sentence: "Pose ton cartable sur la chaise.",        isTarget: false, phraseType: "impérative"   },
      { sentence: "Ouvrez vos cahiers à la page dix.",       isTarget: false, phraseType: "impérative"   },
      { sentence: "Comme il fait beau aujourd'hui !",        isTarget: false, phraseType: "exclamative"  },
      { sentence: "Quelle belle journée !",                  isTarget: false, phraseType: "exclamative"  }
    ]
  },

  "identifier-phrase-imperative": {
    title: "Identifier une phrase impérative",
    levels: ["CM1", "CM2", "6e"],
    type: "yes-no",
    questionsPerSession: 15,
    yesNoLabel: "Cette phrase est-elle impérative ?",
    targetTypeName: "impérative",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      /* ── Phrases impératives (cibles) ── */
      { sentence: "Ferme la porte.",                         isTarget: true  },
      { sentence: "Range tes affaires.",                     isTarget: true  },
      { sentence: "Lis ce livre avec attention.",            isTarget: true  },
      { sentence: "Venez écouter l'histoire.",               isTarget: true  },
      { sentence: "N'oublie pas ton manteau.",               isTarget: true  },
      { sentence: "Levez-vous tous ensemble.",               isTarget: true  },
      { sentence: "Écris ton prénom en haut de la page.",    isTarget: true  },
      /* ── Distracteurs ── */
      { sentence: "La cloche sonne à midi.",                 isTarget: false, phraseType: "déclarative"   },
      { sentence: "Les enfants jouent dans la cour.",        isTarget: false, phraseType: "déclarative"   },
      { sentence: "Mon chien s'appelle Rex.",                isTarget: false, phraseType: "déclarative"   },
      { sentence: "Est-ce que tu as chaud ?",                isTarget: false, phraseType: "interrogative" },
      { sentence: "Où habitent tes grands-parents ?",        isTarget: false, phraseType: "interrogative" },
      { sentence: "Peux-tu m'expliquer cela ?",              isTarget: false, phraseType: "interrogative" },
      { sentence: "Comme tu es courageux !",                 isTarget: false, phraseType: "exclamative"   },
      { sentence: "Quelle bonne idée !",                     isTarget: false, phraseType: "exclamative"   }
    ]
  },

  "identifier-phrase-negative": {
    title: "Identifier une phrase négative",
    levels: ["CM1", "CM2", "6e"],
    type: "yes-no",
    questionsPerSession: 15,
    yesNoLabel: "Cette phrase est-elle négative ?",
    targetTypeName: "négative",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      /* ── Phrases négatives (cibles) ── */
      { sentence: "Je ne mange pas de viande.",              isTarget: true  },
      { sentence: "Elle ne lit jamais le soir.",             isTarget: true  },
      { sentence: "Nous n'allons plus à cette école.",       isTarget: true  },
      { sentence: "Il n'a pas encore fini ses devoirs.",     isTarget: true  },
      { sentence: "N'oublie pas tes affaires.",              isTarget: true  },
      { sentence: "Ne crie pas dans les couloirs.",          isTarget: true  },
      { sentence: "Il ne dit rien à personne.",              isTarget: true  },
      /* ── Distracteurs (formes affirmatives) ── */
      { sentence: "Le chat dort sur le canapé.",             isTarget: false, phraseType: "affirmative"   },
      { sentence: "Mes amis jouent au foot.",                isTarget: false, phraseType: "affirmative"   },
      { sentence: "Quelle belle histoire !",                 isTarget: false, phraseType: "affirmative"   },
      { sentence: "Viens jouer avec moi.",                   isTarget: false, phraseType: "affirmative"   },
      { sentence: "As-tu faim ?",                           isTarget: false, phraseType: "affirmative"   },
      { sentence: "Prends ton manteau.",                     isTarget: false, phraseType: "affirmative"   },
      { sentence: "La rivière coule doucement.",             isTarget: false, phraseType: "affirmative"   },
      { sentence: "Où est mon stylo ?",                     isTarget: false, phraseType: "affirmative"   }
    ]
  },

  "identifier-phrase-exclamative": {
    title: "Identifier une phrase exclamative",
    levels: ["CM1", "CM2", "6e"],
    type: "yes-no",
    questionsPerSession: 15,
    yesNoLabel: "Cette phrase est-elle exclamative ?",
    targetTypeName: "exclamative",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      /* ── Phrases exclamatives (cibles) ── */
      { sentence: "Quelle belle journée !",                  isTarget: true  },
      { sentence: "Comme tu es grand !",                     isTarget: true  },
      { sentence: "Quel dommage !",                          isTarget: true  },
      { sentence: "Comme c'est magnifique !",                isTarget: true  },
      { sentence: "Que tu es intelligent !",                 isTarget: true  },
      { sentence: "Quel beau dessin tu as fait !",           isTarget: true  },
      { sentence: "Comme il fait froid ce matin !",          isTarget: true  },
      /* ── Distracteurs ── */
      { sentence: "Mon chat s'appelle Mimi.",                isTarget: false, phraseType: "déclarative"   },
      { sentence: "Le vent souffle fort.",                   isTarget: false, phraseType: "déclarative"   },
      { sentence: "Les élèves écoutent attentivement.",      isTarget: false, phraseType: "déclarative"   },
      { sentence: "Où est passé mon livre ?",               isTarget: false, phraseType: "interrogative" },
      { sentence: "Est-ce que tu as bien dormi ?",           isTarget: false, phraseType: "interrogative" },
      { sentence: "Qui a renversé le vase ?",                isTarget: false, phraseType: "interrogative" },
      { sentence: "Posez vos crayons.",                      isTarget: false, phraseType: "impérative"    },
      { sentence: "Mange ta soupe.",                         isTarget: false, phraseType: "impérative"    }
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
  },

  /* ─────────────────────────────────────────────────────────────────────────
     Produire différentes formes de phrases interrogatives
     Type custom : produire-3-formes
     3 champs par phrase (intonation / est-ce que / inversion)
     CM1 → 2 formes obligatoires (inversion = bonus)
     CM2 / 6e → 3 formes obligatoires
  ───────────────────────────────────────────────────────────────────────── */

  /* ─── Grammaire : déterminants, noms, adjectifs, phrase complexe ──────── */

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un article défini — le / la / les / l'
     Étape 1 : mots-cliquables — détecter les articles dans des phrases
     Étapes 2–3 : slugs « articles-definis-choix » et « articles-definis-completer »
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-article-defini": {
    title: "Identifier les articles définis",
    levels: ["CM1", "CM2", "6e"],
    type: "mots-cliquables",
    questionsPerSession: 6,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les articles définis (le, la, les, l') dans la phrase.",
        sentence: "Le chat dort sur le canapé .",
        targets: ["Le", "le"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles définis (le, la, les, l') dans la phrase.",
        sentence: "La maîtresse range les livres de l' école .",
        targets: ["La", "les", "l'"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles définis (le, la, les, l') dans la phrase.",
        sentence: "Je le vois tous les jours .",
        targets: ["les"],
        piege: { "le": "Ici, « le » remplace un nom. C'est un pronom personnel, pas un article !" }
      },
      {
        instruction: "Clique sur tous les articles définis (le, la, les, l') dans la phrase.",
        sentence: "L' oiseau chante dans l' arbre .",
        targets: ["L'", "l'"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles définis (le, la, les, l') dans la phrase.",
        sentence: "Les enfants adorent la pizza .",
        targets: ["Les", "la"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles définis (le, la, les, l') dans la phrase. Attention, il y a peut-être un piège !",
        sentence: "Il la regarde et les prend .",
        targets: [],
        piege: {
          "la": "Ici, « la » et « les » remplacent des noms. Ce sont des pronoms personnels, pas des articles !",
          "les": "Ici, « la » et « les » remplacent des noms. Ce sont des pronoms personnels, pas des articles !"
        }
      }
    ]
  },

  "articles-definis-choix": {
    title: "Choisir l'article défini — le / la / les / l'",
    levels: ["CM1", "CM2", "6e"],
    type: "choix-etiquette",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🐱", word: "chat",   answer: "le",  choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🏫", word: "école",  answer: "l'",  choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🌳", word: "arbre",  answer: "l'",  choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🐶", word: "chiens", answer: "les", choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🌙", word: "lune",   answer: "la",  choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🤝", word: "ami",    answer: "l'",  choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🌸", word: "fleurs", answer: "les", choices: ["le", "la", "les", "l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "☀️", word: "soleil", answer: "le",  choices: ["le", "la", "les", "l'"] }
    ]
  },

  "articles-definis-completer": {
    title: "Compléter avec l'article défini — Le printemps",
    levels: ["CM1", "CM2", "6e"],
    type: "glisser-deposer",
    questionsPerSession: 1,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Place les bons articles définis dans les cases. Attention à l'intrus !",
        template: "___ printemps est arrivé ! ___ hirondelles reviennent dans ___ ciel. ___ école organise une sortie dans la forêt.",
        blanks: ["Le", "Les", "le", "L'"],
        bank: ["Le", "Les", "le", "L'", "des"]
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un article indéfini — un / une / des
     Étapes 1 + 3 : choix-etiquette (défini/indéfini + choisir un/une/des)
     Étape 2 : slug « articles-indefinis-premiere-rencontre »
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-article-indefini": {
    title: "Identifier les articles indéfinis",
    levels: ["CM1", "CM2", "6e"],
    type: "choix-etiquette",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Une</b> grenouille saute dans l'étang.</span>",
        word: "une",
        choices: ["défini", "indéfini"],
        answer: "indéfini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Les</b> étoiles brillent dans le ciel noir.</span>",
        word: "les",
        choices: ["défini", "indéfini"],
        answer: "défini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'>Je mange <b>un</b> gâteau au chocolat.</span>",
        word: "un",
        choices: ["défini", "indéfini"],
        answer: "indéfini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>La</b> lune est pleine ce soir.</span>",
        word: "la",
        choices: ["défini", "indéfini"],
        answer: "défini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Des</b> enfants jouent dans le parc.</span>",
        word: "des",
        choices: ["défini", "indéfini"],
        answer: "indéfini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Le</b> directeur parle aux élèves.</span>",
        word: "le",
        choices: ["défini", "indéfini"],
        answer: "défini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'>Il a trouvé <b>une</b> nouvelle cachette.</span>",
        word: "une",
        choices: ["défini", "indéfini"],
        answer: "indéfini"
      },
      {
        instruction: "L'article en gras est-il défini ou indéfini ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>L'</b>hirondelle annonce le printemps.</span>",
        word: "l'",
        choices: ["défini", "indéfini"],
        answer: "défini"
      },
      { instruction: "Quel article indéfini va avec ce nom ?", emoji: "🏠", word: "maison",     answer: "une", choices: ["un", "une", "des"] },
      { instruction: "Quel article indéfini va avec ce nom ?", emoji: "👦", word: "garçons",    answer: "des", choices: ["un", "une", "des"] },
      { instruction: "Quel article indéfini va avec ce nom ?", emoji: "🤖", word: "robot",      answer: "un",  choices: ["un", "une", "des"] },
      { instruction: "Quel article indéfini va avec ce nom ?", emoji: "🌺", word: "fleur",      answer: "une", choices: ["un", "une", "des"] },
      { instruction: "Quel article indéfini va avec ce nom ?", emoji: "🌳", word: "arbres",     answer: "des", choices: ["un", "une", "des"] },
      { instruction: "Quel article indéfini va avec ce nom ?", emoji: "💻", word: "ordinateur", answer: "un",  choices: ["un", "une", "des"] }
    ]
  },

  "articles-indefinis-premiere-rencontre": {
    title: "Articles indéfinis — Première et deuxième mention",
    levels: ["CM1", "CM2", "6e"],
    type: "glisser-deposer",
    questionsPerSession: 4,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.",
        template: "___ chat noir dort sur la fenêtre. ___ chat s'appelle Minuit.",
        blanks: ["Un", "Le"],
        bank: ["Un", "Le", "Une", "La"]
      },
      {
        instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.",
        template: "___ élève entre dans la salle. ___ élève s'appelle Emma.",
        blanks: ["Une", "L'"],
        bank: ["Une", "L'", "Un", "Le"]
      },
      {
        instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.",
        template: "___ chien aboie dans le jardin. ___ chien appartient à notre voisin.",
        blanks: ["Un", "Le"],
        bank: ["Un", "Le", "Une", "La"]
      },
      {
        instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.",
        template: "___ livre est posé sur la table. ___ livre parle des dinosaures.",
        blanks: ["Un", "Le"],
        bank: ["Un", "Le", "Une", "La"]
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un déterminant démonstratif — ce / cet / cette / ces
     Toutes les étapes fusionnées en choix-etiquette
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-determinant-demonstratif": {
    title: "Identifier les déterminants démonstratifs",
    levels: ["CM1", "CM2", "6e"],
    type: "choix-etiquette",
    questionsPerSession: 10,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "⚽", word: "ballon",     answer: "ce",    choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "✈️", word: "avion",      answer: "cet",   choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "🏠", word: "maison",     answer: "cette", choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "🌸", word: "fleurs",     answer: "ces",   choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "🏨", word: "hôtel",      answer: "cet",   choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "👟", word: "chaussures", answer: "ces",   choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "🐦", word: "oiseau",     answer: "cet",   choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Quel déterminant démonstratif va devant ce nom ?", emoji: "📚", word: "livres",     answer: "ces",   choices: ["ce", "cet", "cette", "ces"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "ce chien",      answer: "CE",    choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "cette pomme",   answer: "CETTE", choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "ces étoiles",   answer: "CES",   choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "cet ami",       answer: "CET",   choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "ce bureau",     answer: "CE",    choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "cette chanson", answer: "CETTE", choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "cet étudiant",  answer: "CET",   choices: ["CE", "CET", "CETTE", "CES"] },
      { instruction: "Dans quelle catégorie se range ce groupe nominal ?", emoji: "", word: "ces outils",    answer: "CES",   choices: ["CE", "CET", "CETTE", "CES"] },
      {
        instruction: "Ce déterminant est-il démonstratif ou possessif ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'>Je range <b>ces</b> affaires dans mon sac.</span>",
        word: "ces",
        choices: ["démonstratif", "possessif"],
        answer: "démonstratif"
      },
      {
        instruction: "Ce déterminant est-il démonstratif ou possessif ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'>Je range <b>ses</b> affaires dans mon sac.</span>",
        word: "ses",
        choices: ["démonstratif", "possessif"],
        answer: "possessif"
      },
      {
        instruction: "Ce déterminant est-il démonstratif ou possessif ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Ce</b> livre est vraiment passionnant !</span>",
        word: "ce",
        choices: ["démonstratif", "possessif"],
        answer: "démonstratif"
      },
      {
        instruction: "Ce déterminant est-il démonstratif ou possessif ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Son</b> livre est vraiment passionnant !</span>",
        word: "son",
        choices: ["démonstratif", "possessif"],
        answer: "possessif"
      },
      {
        instruction: "Ce déterminant est-il démonstratif ou possessif ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Ces</b> oiseaux chantent magnifiquement.</span>",
        word: "ces",
        choices: ["démonstratif", "possessif"],
        answer: "démonstratif"
      },
      {
        instruction: "Ce déterminant est-il démonstratif ou possessif ?",
        emoji: "<span style='font-size:17px;font-style:italic;line-height:1.5;display:block'><b>Ses</b> oiseaux chantent magnifiquement.</span>",
        word: "ses",
        choices: ["démonstratif", "possessif"],
        answer: "possessif"
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un déterminant possessif
     Étapes 1 + 3 : choix-etiquette
     Étape 2 : slug « possessifs-dans-phrases »
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-determinant-possessif": {
    title: "Identifier les déterminants possessifs",
    levels: ["CM1", "CM2", "6e"],
    type: "choix-etiquette",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "<span style='font-style:italic;text-transform:none'>C'est le vélo de Paul.</span>",
        emoji: "",
        word: "C'est ___ vélo.",
        choices: ["son", "sa", "ses", "leur"],
        answer: "son"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>C'est la chambre de Léa.</span>",
        emoji: "",
        word: "C'est ___ chambre.",
        choices: ["son", "sa", "ses", "leur"],
        answer: "sa"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>Ce sont les affaires de Tom.</span>",
        emoji: "",
        word: "Ce sont ___ affaires.",
        choices: ["son", "sa", "ses", "leur"],
        answer: "ses"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>C'est la voiture de Paul et Léa.</span>",
        emoji: "",
        word: "C'est ___ voiture.",
        choices: ["son", "leur", "leurs", "sa"],
        answer: "leur"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>Ce sont les jouets de Paul et Léa.</span>",
        emoji: "",
        word: "Ce sont ___ jouets.",
        choices: ["leur", "leurs", "ses", "des"],
        answer: "leurs"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>C'est le cahier de toi.</span>",
        emoji: "",
        word: "C'est ___ cahier.",
        choices: ["ton", "ta", "tes", "votre"],
        answer: "ton"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>C'est la trousse de vous.</span>",
        emoji: "",
        word: "C'est ___ trousse.",
        choices: ["votre", "vos", "notre", "ton"],
        answer: "votre"
      },
      {
        instruction: "<span style='font-style:italic;text-transform:none'>C'est l'amie de Tom.</span>",
        emoji: "",
        word: "C'est ___ amie.",
        choices: ["son", "sa", "ses", "mon"],
        answer: "son"
      },
      { instruction: "je range ___ affaires.",      emoji: "", word: "je",    choices: ["mes", "tes", "ses", "nos"],    answer: "mes"   },
      { instruction: "tu ranges ___ affaires.",     emoji: "", word: "tu",    choices: ["mes", "tes", "ses", "nos"],    answer: "tes"   },
      { instruction: "il range ___ affaires.",      emoji: "", word: "il",    choices: ["mes", "tes", "ses", "nos"],    answer: "ses"   },
      { instruction: "nous rangeons ___ affaires.", emoji: "", word: "nous",  choices: ["mes", "tes", "ses", "nos"],    answer: "nos"   },
      { instruction: "je lave ___ vélo.",           emoji: "", word: "je",    choices: ["mon", "ton", "son", "leur"],   answer: "mon"   },
      { instruction: "tu laves ___ vélo.",          emoji: "", word: "tu",    choices: ["mon", "ton", "son", "leur"],   answer: "ton"   },
      { instruction: "il lave ___ vélo.",           emoji: "", word: "il",    choices: ["mon", "ton", "son", "leur"],   answer: "son"   },
      { instruction: "elles lavent ___ vélo.",      emoji: "", word: "elles", choices: ["mon", "ton", "son", "leur"],   answer: "leur"  },
      { instruction: "je montre ___ photo.",        emoji: "", word: "je",    choices: ["ma", "ta", "sa", "votre"],     answer: "ma"    },
      { instruction: "tu montres ___ photo.",       emoji: "", word: "tu",    choices: ["ma", "ta", "sa", "votre"],     answer: "ta"    },
      { instruction: "elle montre ___ photo.",      emoji: "", word: "elle",  choices: ["ma", "ta", "sa", "votre"],     answer: "sa"    },
      { instruction: "vous montrez ___ photo.",     emoji: "", word: "vous",  choices: ["ma", "ta", "sa", "votre"],     answer: "votre" },
      { instruction: "je prends ___ livres.",       emoji: "", word: "je",    choices: ["mes", "ses", "nos", "leurs"],  answer: "mes"   },
      { instruction: "il prend ___ livres.",        emoji: "", word: "il",    choices: ["mes", "ses", "nos", "leurs"],  answer: "ses"   },
      { instruction: "nous prenons ___ livres.",    emoji: "", word: "nous",  choices: ["mes", "ses", "nos", "leurs"],  answer: "nos"   },
      { instruction: "ils prennent ___ livres.",    emoji: "", word: "ils",   choices: ["mes", "ses", "nos", "leurs"],  answer: "leurs" }
    ]
  },

  "possessifs-dans-phrases": {
    title: "Repérer les déterminants possessifs dans une phrase",
    levels: ["CM1", "CM2", "6e"],
    type: "mots-cliquables",
    questionsPerSession: 5,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Je range mes affaires dans mon sac .",
        targets: ["mes", "mon"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Elle prête son crayon à sa camarade .",
        targets: ["son", "sa"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Nous adorons notre école et nos professeurs .",
        targets: ["notre", "nos"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Il promène son chien avec ses amis .",
        targets: ["son", "ses"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention au piège !",
        sentence: "Leurs parents les attendent devant leur maison .",
        targets: ["Leurs", "leur"],
        piege: { "les": "« les » est un pronom personnel complément, pas un possessif !" }
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un adjectif
     Toutes les étapes adaptées en mots-cliquables
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-adjectif": {
    title: "Identifier les adjectifs",
    levels: ["CM1", "CM2", "6e"],
    type: "mots-cliquables",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les adjectifs parmi ces mots. (Ils peuvent décrire : le chat.)",
        sentence: "petit noir mange maison silencieusement rapide",
        targets: ["petit", "noir", "rapide"],
        piege: {
          "mange": "« mange » est un verbe.",
          "maison": "« maison » est un nom.",
          "silencieusement": "« silencieusement » est un adverbe (finit souvent en -ment)."
        }
      },
      {
        instruction: "Clique sur tous les adjectifs parmi ces mots. (Ils peuvent décrire : la fille.)",
        sentence: "jolie gentille chante école doucement bleue",
        targets: ["jolie", "gentille", "bleue"],
        piege: {
          "chante": "« chante » est un verbe.",
          "école": "« école » est un nom.",
          "doucement": "« doucement » est un adverbe (finit en -ment)."
        }
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "La petite chatte grise dort sur le canapé confortable .",
        targets: ["petite", "grise", "confortable"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Un élève curieux lit un livre passionnant .",
        targets: ["curieux", "passionnant"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Il marche lentement dans la rue bondée .",
        targets: ["bondée"],
        piege: { "lentement": "« lentement » est un adverbe (il décrit le verbe « marche »), pas un adjectif." }
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "La porte fermée cache un couloir sombre .",
        targets: ["fermée", "sombre"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Ces beaux oiseaux chantent des mélodies douces .",
        targets: ["beaux", "douces"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Mon grand-père prépare une soupe chaude .",
        targets: ["chaude"],
        piege: { "grand-père": "« grand-père » est un nom composé, pas un adjectif." }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "rouge grand table joyeux",
        targets: ["table"],
        piege: {
          "rouge": "« rouge » est un adjectif de couleur — cherche l'intrus !",
          "grand": "« grand » est un adjectif — cherche l'intrus !",
          "joyeux": "« joyeux » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "rapide courir fort doux",
        targets: ["courir"],
        piege: {
          "rapide": "« rapide » est un adjectif — cherche l'intrus !",
          "fort": "« fort » est un adjectif — cherche l'intrus !",
          "doux": "« doux » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "beau maison petit léger",
        targets: ["maison"],
        piege: {
          "beau": "« beau » est un adjectif — cherche l'intrus !",
          "petit": "« petit » est un adjectif — cherche l'intrus !",
          "léger": "« léger » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "chanter triste sage bleu",
        targets: ["chanter"],
        piege: {
          "triste": "« triste » est un adjectif — cherche l'intrus !",
          "sage": "« sage » est un adjectif — cherche l'intrus !",
          "bleu": "« bleu » est un adjectif de couleur — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "lentement heureux vif froid",
        targets: ["lentement"],
        piege: {
          "heureux": "« heureux » est un adjectif — cherche l'intrus !",
          "vif": "« vif » est un adjectif — cherche l'intrus !",
          "froid": "« froid » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "verte lumière ancienne nouvelle",
        targets: ["lumière"],
        piege: {
          "verte": "« verte » est un adjectif de couleur — cherche l'intrus !",
          "ancienne": "« ancienne » est un adjectif — cherche l'intrus !",
          "nouvelle": "« nouvelle » est un adjectif — cherche l'intrus !"
        }
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un nom dans une phrase
     Toutes les étapes adaptées en mots-cliquables
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-nom-phrase": {
    title: "Identifier les noms dans une phrase",
    levels: ["CM1", "CM2", "6e"],
    type: "mots-cliquables",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "Le chien mange sa nourriture dans le jardin .",
        targets: ["chien", "nourriture", "jardin"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "La porte de la salle claque .",
        targets: ["porte", "salle"],
        piege: { "claque": "« claque » est un verbe (la porte claque). Les noms s'accompagnent souvent d'un déterminant." }
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "L' astronaute voyage vers la planète rouge .",
        targets: ["astronaute", "planète"],
        piege: { "rouge": "« rouge » est un adjectif, pas un nom. Les noms ont souvent un déterminant devant eux." }
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "Le cuisinier prépare une délicieuse soupe .",
        targets: ["cuisinier", "soupe"],
        piege: { "délicieuse": "« délicieuse » est un adjectif (il décrit la soupe). Le nom, c'est « soupe »." }
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "Les enfants lisent des histoires amusantes .",
        targets: ["enfants", "histoires"],
        piege: { "amusantes": "« amusantes » est un adjectif. Les noms ici sont « enfants » et « histoires »." }
      },
      {
        instruction: "Clique sur tous les noms (communs ET propres) dans la phrase.",
        sentence: "Emma joue au football avec ses amis .",
        targets: ["Emma", "football", "amis"],
        piege: {}
      },
      { instruction: "Classe ce nom : ville",       sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« ville » est un nom commun : il désigne n'importe quelle ville, sans majuscule." } },
      { instruction: "Classe ce nom : fleuve",      sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« fleuve » est un nom commun : il désigne n'importe quel fleuve." } },
      { instruction: "Classe ce nom : chien",       sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« chien » est un nom commun : il désigne n'importe quel chien." } },
      { instruction: "Classe ce nom : professeur",  sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« professeur » est un nom commun : il désigne n'importe quel professeur." } },
      { instruction: "Classe ce nom : livre",       sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« livre » est un nom commun." } },
      { instruction: "Classe ce nom : Madrid",      sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« Madrid » est un nom propre : il désigne une ville particulière et prend une majuscule." } },
      { instruction: "Classe ce nom : Emma",        sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« Emma » est un nom propre : c'est un prénom, il prend une majuscule." } },
      { instruction: "Classe ce nom : la Seine",    sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« la Seine » est un nom propre : c'est le nom d'un fleuve particulier." } },
      { instruction: "Classe ce nom : Léa",         sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« Léa » est un nom propre : c'est un prénom." } },
      { instruction: "Classe ce nom : LFM",         sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« LFM » est un nom propre : c'est le sigle d'une école particulière." } },
      {
        instruction: "Quel nom répond à cette devinette ? On y range les livres de la classe.",
        sentence: "bibliothèque ranger grand table",
        targets: ["bibliothèque"],
        piege: {
          "ranger": "« ranger » est un verbe à l'infinitif, pas un nom.",
          "grand": "« grand » est un adjectif, pas un nom.",
          "table": "« table » est un nom, mais on ne range pas des livres sur une table... réfléchis !"
        }
      },
      {
        instruction: "Quel nom répond à cette devinette ? Il apporte la lumière pendant la journée.",
        sentence: "soleil briller chaud nuit",
        targets: ["soleil"],
        piege: {
          "briller": "« briller » est un verbe.",
          "chaud": "« chaud » est un adjectif.",
          "nuit": "« nuit » est aussi un nom, mais elle n'apporte pas la lumière !"
        }
      },
      {
        instruction: "Quel nom répond à cette devinette ? On y joue avec ses camarades à la récréation.",
        sentence: "terrain jouer amusant ballon",
        targets: ["terrain"],
        piege: {
          "jouer": "« jouer » est un verbe.",
          "amusant": "« amusant » est un adjectif.",
          "ballon": "« ballon » est un nom, mais on joue AVEC un ballon, pas SUR un ballon !"
        }
      },
      {
        instruction: "Quel nom répond à cette devinette ? Elle coule de la montagne vers la mer.",
        sentence: "rivière couler froide cascade",
        targets: ["rivière"],
        piege: {
          "couler": "« couler » est un verbe.",
          "froide": "« froide » est un adjectif.",
          "cascade": "« cascade » coule aussi, mais c'est une chute d'eau verticale, pas une rivière !"
        }
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Distinguer phrase simple et phrase complexe
     Étapes 1 + 2 : classification-etapes (verbes conjugués → simple/complexe)
     Étape 3 : slug « phrases-connecteurs »
  ─────────────────────────────────────────────────────────────────────────── */
  "distinguer-phrase-simple-complexe": {
    title: "Distinguer phrase simple et phrase complexe",
    levels: ["CM2", "6e"],
    type: "classification-etapes",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Le chat dort sur le canapé.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["dort"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Les enfants rient et courent dans la cour.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["rient", "courent"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (aller = infinitif !)",
        sentence: "La petite fille veut aller à la piscine.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["veut"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Mon chien aboie quand le voisin arrive.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["aboie", "arrive"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Le footballeur tire le ballon et marque un but.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["tire", "marque"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (travailler = infinitif !)",
        sentence: "La maîtresse demande aux élèves de travailler en silence.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["demande"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Le soleil brille dans le ciel bleu.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["brille"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Je mange une pomme parce que j'ai faim.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["mange", "j'ai"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (Même si la phrase est longue !)",
        sentence: "Le vieux monsieur avec le long manteau rouge marche lentement dans le parc.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["marche"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Les oiseaux chantent et les fleurs poussent au printemps.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["chantent", "poussent"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (jouer = infinitif !)",
        sentence: "Mon chat adore jouer avec la pelote de laine.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["adore"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Il pleut depuis ce matin.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["pleut"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Les élèves écoutent quand le professeur parle.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["écoutent", "parle"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (décoller = infinitif !)",
        sentence: "La fusée va décoller dans dix secondes.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["va"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Le lapin saute mais le renard l'attrape.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["saute", "l'attrape"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Zoé ferme les yeux parce qu'elle tremble.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["ferme", "tremble"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      }
    ]
  },

  "phrases-connecteurs": {
    title: "Relier deux phrases avec la bonne conjonction",
    levels: ["CM2", "6e"],
    type: "choix-etiquette",
    questionsPerSession: 4,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Quelle conjonction relie le mieux ces deux phrases ?",
        emoji: "<span style='font-size:15px;line-height:1.6;display:block;font-style:italic'>Léa est triste. / Elle a perdu son jouet.</span>",
        word: "Léa est triste ___ elle a perdu son jouet.",
        choices: ["mais", "parce que", "quand"],
        answer: "parce que"
      },
      {
        instruction: "Quelle conjonction relie le mieux ces deux phrases ?",
        emoji: "<span style='font-size:15px;line-height:1.6;display:block;font-style:italic'>Les enfants rentrent en classe. / La cloche sonne.</span>",
        word: "Les enfants rentrent ___ la cloche sonne.",
        choices: ["et", "mais", "quand"],
        answer: "quand"
      },
      {
        instruction: "Quelle conjonction relie le mieux ces deux phrases ?",
        emoji: "<span style='font-size:15px;line-height:1.6;display:block;font-style:italic'>Tom aime le chocolat. / Sa sœur préfère les fraises.</span>",
        word: "Tom aime le chocolat ___ sa sœur préfère les fraises.",
        choices: ["parce que", "mais", "quand"],
        answer: "mais"
      },
      {
        instruction: "Quelle conjonction relie le mieux ces deux phrases ?",
        emoji: "<span style='font-size:15px;line-height:1.6;display:block;font-style:italic'>Le chien aboie. / Le facteur passe dans la rue.</span>",
        word: "Le chien aboie ___ le facteur passe dans la rue.",
        choices: ["qui", "parce que", "quand"],
        answer: "quand"
      }
    ]
  },

  "produire-formes-interrogatives": {
    title: "Produire différentes formes de phrases interrogatives",
    levels: ["CM1", "CM2", "6e"],
    type: "produire-3-formes",
    questionsPerSession: 6,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    bank: [
      {
        sentence:        "Tu aides ta sœur.",
        keyWords:        ["aides", "sœur"],
        modelIntonation: "Tu aides ta sœur ?",
        modelEcQ:        "Est-ce que tu aides ta sœur ?",
        modelInv:        "Aides-tu ta sœur ?"
      },
      {
        sentence:        "Elle dessine un château.",
        keyWords:        ["dessine", "château"],
        modelIntonation: "Elle dessine un château ?",
        modelEcQ:        "Est-ce qu'elle dessine un château ?",
        modelInv:        "Dessine-t-elle un château ?"
      },
      {
        sentence:        "Vous lisez un livre.",
        keyWords:        ["lisez", "livre"],
        modelIntonation: "Vous lisez un livre ?",
        modelEcQ:        "Est-ce que vous lisez un livre ?",
        modelInv:        "Lisez-vous un livre ?"
      },
      {
        sentence:        "Il fait beau aujourd'hui.",
        keyWords:        ["fait", "beau"],
        modelIntonation: "Il fait beau aujourd'hui ?",
        modelEcQ:        "Est-ce qu'il fait beau aujourd'hui ?",
        modelInv:        "Fait-il beau aujourd'hui ?"
      },
      {
        sentence:        "Les élèves travaillent en classe.",
        keyWords:        ["élèves", "travaillent", "classe"],
        modelIntonation: "Les élèves travaillent en classe ?",
        modelEcQ:        "Est-ce que les élèves travaillent en classe ?",
        modelInv:        "Les élèves travaillent-ils en classe ?"
      },
      {
        sentence:        "Nous allons à la piscine.",
        keyWords:        ["allons", "piscine"],
        modelIntonation: "Nous allons à la piscine ?",
        modelEcQ:        "Est-ce que nous allons à la piscine ?",
        modelInv:        "Allons-nous à la piscine ?"
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════
     MATHÉMATIQUES — FRACTIONS
  ══════════════════════════════════════════════════════════════════════ */

  "representer-fraction": {
    title: "Représenter une fraction",
    type: "representer-fraction",
    levels: ["CM1"],
    questionsPerSession: 10,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ─────────────────────────────────────────────
       level 1 : fraction simple — la bande est partagée en `denominator`
                 parts. Fractions ≤ 1 ET > 1 (plusieurs bandes).
       level 2 : partage différent — la bande est partagée en `partitions`
                 parts (multiple de `denominator`). Introduction fractions éq.
    ────────────────────────────────────────────────────────────────────── */
    bank: [

      /* Niveau 1 — fractions ≤ 1 */
      { level: 1, numerator: 1, denominator: 2 },
      { level: 1, numerator: 3, denominator: 4 },
      { level: 1, numerator: 2, denominator: 5 },
      { level: 1, numerator: 5, denominator: 6 },
      { level: 1, numerator: 7, denominator: 8 },

      /* Niveau 1 — fractions > 1 (plusieurs bandes automatiques) */
      { level: 1, numerator: 5,  denominator: 4 },
      { level: 1, numerator: 7,  denominator: 5 },
      { level: 1, numerator: 3,  denominator: 2 },
      { level: 1, numerator: 11, denominator: 6 },
      { level: 1, numerator: 9,  denominator: 4 },

      /* Niveau 2 — partage différent du dénominateur */
      { level: 2, numerator: 1, denominator: 2, partitions: 4  },
      { level: 2, numerator: 1, denominator: 2, partitions: 6  },
      { level: 2, numerator: 1, denominator: 3, partitions: 6  },
      { level: 2, numerator: 2, denominator: 3, partitions: 6  },
      { level: 2, numerator: 1, denominator: 4, partitions: 8  },
      { level: 2, numerator: 3, denominator: 4, partitions: 8  },
      { level: 2, numerator: 2, denominator: 5, partitions: 10 },
      { level: 2, numerator: 4, denominator: 5, partitions: 10 },
      { level: 2, numerator: 3, denominator: 6, partitions: 12 },
      { level: 2, numerator: 5, denominator: 6, partitions: 12 },

    ]
  },

  "lire-fraction": {
    title: "Lire une fraction",
    type: "lire-fraction",
    levels: ["CM1"],
    questionsPerSession: 10,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ─────────────────────────────────────────────
       parts    : nombre total de parts égales (= dénominateur)
       colored  : nombre de parts coloriées    (= numérateur)
       shape    : "strip" | "circle" | "rect"
       cols     : colonnes (shape "rect" uniquement)
       difficulty 1 : fractions ≤ 1, petits dénominateurs
       difficulty 2 : fractions variées, y compris supérieures à 1
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Niveau 1 — bandes et disques, fractions ≤ 1 */
      { parts: 2, colored: 1, shape: "strip",              difficulty: 1 },
      { parts: 4, colored: 1, shape: "strip",              difficulty: 1 },
      { parts: 4, colored: 3, shape: "strip",              difficulty: 1 },
      { parts: 3, colored: 1, shape: "circle",             difficulty: 1 },
      { parts: 3, colored: 2, shape: "circle",             difficulty: 1 },
      { parts: 5, colored: 2, shape: "strip",              difficulty: 1 },
      { parts: 5, colored: 3, shape: "strip",              difficulty: 1 },
      { parts: 6, colored: 5, shape: "circle",             difficulty: 1 },
      { parts: 4, colored: 2, shape: "rect",  cols: 2,     difficulty: 1 },
      { parts: 6, colored: 4, shape: "rect",  cols: 3,     difficulty: 1 },

      /* Niveau 2 — figures variées, dont fractions > 1 */
      { parts: 4, colored: 5, shape: "strip",              difficulty: 2 },
      { parts: 4, colored: 7, shape: "strip",              difficulty: 2 },
      { parts: 3, colored: 4, shape: "circle",             difficulty: 2 },
      { parts: 5, colored: 6, shape: "strip",              difficulty: 2 },
      { parts: 3, colored: 5, shape: "circle",             difficulty: 2 },
      { parts: 4, colored: 9, shape: "strip",              difficulty: 2 },
      { parts: 8, colored: 5, shape: "rect",  cols: 4,     difficulty: 2 },
      { parts: 10, colored: 7, shape: "rect", cols: 5,     difficulty: 2 },
      { parts: 6, colored: 4, shape: "circle",             difficulty: 2 },
      { parts: 9, colored: 6, shape: "rect",  cols: 3,     difficulty: 2 }
    ]
  },

  "placer-fraction-droite-graduee": {
    title: "Placer une fraction sur une droite graduée",
    type: "placer-fraction-droite",
    levels: ["CM2"],
    questionsPerSession: 10,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ─────────────────────────────────────────────
       level 1 : fraction < 1 — droite de 0 à 1, partagée en denominator parts
       level 2 : fraction > 1 — droite de 0 à ceil(num/denom), même découpage
       Tick i représente la valeur i/denominator.
       La bonne réponse est toujours le tick d'index numerator.
    ────────────────────────────────────────────────────────────────────── */
    bank: [

      /* Niveau 1 — fractions inférieures à 1 */
      { level: 1, numerator: 1, denominator: 2 },
      { level: 1, numerator: 1, denominator: 3 },
      { level: 1, numerator: 2, denominator: 3 },
      { level: 1, numerator: 1, denominator: 4 },
      { level: 1, numerator: 3, denominator: 4 },
      { level: 1, numerator: 1, denominator: 5 },
      { level: 1, numerator: 2, denominator: 5 },
      { level: 1, numerator: 3, denominator: 5 },
      { level: 1, numerator: 4, denominator: 5 },
      { level: 1, numerator: 5, denominator: 6 },

      /* Niveau 2 — fractions supérieures à 1 */
      { level: 2, numerator: 5,  denominator: 4 },
      { level: 2, numerator: 3,  denominator: 2 },
      { level: 2, numerator: 7,  denominator: 4 },
      { level: 2, numerator: 7,  denominator: 5 },
      { level: 2, numerator: 9,  denominator: 4 },
      { level: 2, numerator: 11, denominator: 6 },
      { level: 2, numerator: 8,  denominator: 3 },
      { level: 2, numerator: 10, denominator: 4 },
      { level: 2, numerator: 13, denominator: 8 },
      { level: 2, numerator: 15, denominator: 6 }

    ]
  },

  /* ══════════════════════════════════════════════════════════════════════
     MATHÉMATIQUES — NOMBRES ENTIERS
  ══════════════════════════════════════════════════════════════════════ */

  "ecrire-nombre-entier-chiffres": {
    title: "Écrire un nombre en chiffres",
    type: "nombre-entier",
    levels: ["CM1", "CM2"],
    questionsPerSession: 12,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    bank: [

      /* ── CM1 — 15 questions, jusqu'à 999 999 ──────────────────────────── */
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "soixante-cinq",
        answer: "65", choices: ["65", "56", "605", "650"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "soixante-treize",
        answer: "73" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "deux-cent-douze",
        answer: "212", choices: ["212", "221", "2 012", "2 120"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "quatre-cent-soixante",
        answer: "460" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "mille-deux-cent-huit",
        answer: "1 208", choices: ["1 208", "1 280", "12 008", "1 028"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "trois-mille-quatre-vingts",
        answer: "3 080" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cinq-mille-soixante",
        answer: "5 060", choices: ["5 060", "5 600", "5 006", "560"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "douze-mille-cinq",
        answer: "12 005" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "quarante-cinq-mille-trois-cents",
        answer: "45 300", choices: ["45 300", "45 030", "45 003", "43 500"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "quatre-vingt-sept-mille-six-cent-trente-neuf",
        answer: "87 639" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cent-mille-huit",
        answer: "100 008", choices: ["100 008", "100 080", "10 008", "100 800"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "deux-cent-mille-cent",
        answer: "200 100" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cinq-cent-mille-deux-cent-soixante",
        answer: "500 260", choices: ["500 260", "500 026", "500 206", "502 060"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "six-cent-quarante-deux-mille-treize",
        answer: "642 013" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "neuf-cent-mille-neuf-cent-un",
        answer: "900 901", choices: ["900 901", "990 901", "900 191", "900 910"] },

      /* ── CM2 — 15 questions, jusqu'à 999 999 999 ──────────────────────── */
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "un-million",
        answer: "1 000 000", choices: ["1 000 000", "100 000", "1 000", "10 000 000"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "deux-millions-trois-cent-mille",
        answer: "2 300 000" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cinq-millions-cinquante",
        answer: "5 000 050", choices: ["5 000 050", "5 000 500", "5 050 000", "5 005 000"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "dix-millions-quatre-cent-vingt-mille",
        answer: "10 420 000" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "vingt-cinq-millions",
        answer: "25 000 000", choices: ["25 000 000", "2 500 000", "250 000 000", "25 000"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "cinquante-millions-six-mille",
        answer: "50 006 000" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "un-million-deux-cent-mille",
        answer: "1 200 000", choices: ["1 200 000", "1 020 000", "1 002 000", "12 000 000"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "soixante-quinze-millions-trois-cent-mille-quarante-deux",
        answer: "75 300 042" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cent-millions",
        answer: "100 000 000", choices: ["100 000 000", "10 000 000", "1 000 000 000", "100 000"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "deux-cent-millions",
        answer: "200 000 000" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "trois-cent-quarante-cinq-millions-six-cent-soixante-dix-huit-mille-neuf-cent-douze",
        answer: "345 678 912", choices: ["345 678 912", "345 768 912", "354 678 912", "345 678 921"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "huit-cent-millions-huit-cents",
        answer: "800 000 800" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "deux-cent-cinquante-quatre-millions-sept-cent-trente-deux-mille-cent-neuf",
        answer: "254 732 109", choices: ["254 732 109", "254 732 190", "254 732 019", "254 730 109"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "neuf-millions-neuf-cent-mille-neuf-cents",
        answer: "9 900 900" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "quatre-cent-millions-dix-mille-soixante",
        answer: "400 010 060", choices: ["400 010 060", "400 100 060", "400 010 600", "400 001 060"] }
    ]
  },

  "ecrire-nombre-entier-lettres": {
    title: "Écrire un nombre en lettres",
    type: "nombre-entier",
    levels: ["CM1", "CM2"],
    questionsPerSession: 12,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },
    bank: [

      /* ── CM1 — 15 questions, jusqu'à 999 999 ──────────────────────────── */
      /* Pièges : accord de -vingts/-cent/-cents, invariabilité de mille     */
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "80",
        answer: "quatre-vingts",
        choices: ["quatre-vingts", "quatre-vingt", "huitante", "quatre-vingt-zéro"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "21",
        answer: "vingt-et-un" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "200",
        answer: "deux-cents",
        choices: ["deux-cents", "deux-cent", "deux-centièmes", "vingt-zéros"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "203",
        answer: "deux-cent-trois" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "81",
        answer: "quatre-vingt-un",
        choices: ["quatre-vingt-un", "quatre-vingts-un", "quatre-vingt-et-un", "huitante-un"] },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "71",
        answer: "soixante-et-onze",
        choices: ["soixante-et-onze", "soixante-onze", "soixante-et-un", "septante-et-un"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "300",
        answer: "trois-cents" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "2 000",
        answer: "deux-mille",
        choices: ["deux-mille", "deux-milles", "deux-milliers", "vingt-cents"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "1 200",
        answer: "mille-deux-cents" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "1 201",
        answer: "mille-deux-cent-un",
        choices: ["mille-deux-cent-un", "mille-deux-cents-un", "mille-deux-cent-et-un", "mille-deux-cents-et-un"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "3 500",
        answer: "trois-mille-cinq-cents" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "80 000",
        answer: "quatre-vingt-mille",
        choices: ["quatre-vingt-mille", "quatre-vingts-mille", "quatre-vingt-milles", "quatre-vingts-milles"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "100 000",
        answer: "cent-mille" },
      { level: "CM1", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "45 300",
        answer: "quarante-cinq-mille-trois-cents",
        choices: ["quarante-cinq-mille-trois-cents", "quarante-cinq-mille-trois-cent", "quarante-cinq-milles-trois-cents", "quarante-cinq-mille-trois-centaines"] },
      { level: "CM1", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "200 400",
        answer: "deux-cent-mille-quatre-cents" },

      /* ── CM2 — 15 questions, millions et milliards ─────────────────────── */
      /* Pièges : million/millions, cent devant million, milliard             */
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "1 000 000",
        answer: "un-million",
        choices: ["un-million", "un-mille-mille", "mille-mille", "un-milliard"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "2 000 000",
        answer: "deux-millions" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "100 000 000",
        answer: "cent-millions",
        choices: ["cent-millions", "cents-millions", "cent-million", "cent-mille-mille"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "3 000 000",
        answer: "trois-millions" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "200 000 000",
        answer: "deux-cent-millions",
        choices: ["deux-cent-millions", "deux-cents-millions", "deux-cent-million", "vingt-millions"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "5 000 200",
        answer: "cinq-millions-deux-cents" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "1 000 000 000",
        answer: "un-milliard",
        choices: ["un-milliard", "un-billion", "mille-millions", "un-mille-millions"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "12 000 000",
        answer: "douze-millions" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "1 200 000",
        answer: "un-million-deux-cent-mille",
        choices: ["un-million-deux-cent-mille", "un-million-deux-cents-mille", "un-million-deux-cent-milles", "douze-cent-mille"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "750 000 000",
        answer: "sept-cent-cinquante-millions" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "500 000 000",
        answer: "cinq-cent-millions",
        choices: ["cinq-cent-millions", "cinq-cents-millions", "cinq-cent-million", "cinq-mille-cent-mille"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "2 500 000",
        answer: "deux-millions-cinq-cent-mille" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "25 000 000",
        answer: "vingt-cinq-millions",
        choices: ["vingt-cinq-millions", "vingt-cinq-million", "vingt-cinq-milles-mille", "vingt-et-cinq-millions"] },
      { level: "CM2", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "300 045 000",
        answer: "trois-cent-millions-quarante-cinq-mille" },
      { level: "CM2", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "99 099 099",
        answer: "quatre-vingt-dix-neuf-millions-quatre-vingt-dix-neuf-mille-quatre-vingt-dix-neuf",
        choices: [
          "quatre-vingt-dix-neuf-millions-quatre-vingt-dix-neuf-mille-quatre-vingt-dix-neuf",
          "quatre-vingts-dix-neuf-millions-quatre-vingt-dix-neuf-mille-quatre-vingt-dix-neuf",
          "quatre-vingt-dix-neuf-millions-quatre-vingt-dix-neuf-mille-quatre-vingt-neuf",
          "quatre-vingt-dix-neuf-millions-quatre-vingt-dix-mille-quatre-vingt-dix-neuf"
        ] }
    ]
  }

,

  /* ═══════════════════════════════════════════════════════════════════════
     Identifier la valeur d'un chiffre selon sa position — 5 étapes
     ═══════════════════════════════════════════════════════════════════════ */
  "identifier-valeur-chiffre-position": {
    title: "Identifier la valeur d'un chiffre selon sa position",
    type:  "valeur-position",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 13,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* Étape 1 — "Le chiffre allumé" : { n, pos } — pos = rang depuis la droite (0=unités) */
    step1Pool: [
      { n: 4582,   pos: 2 },   /* 5 → 500                                               */
      { n: 7346,   pos: 3 },   /* 7 → 7 000                                             */
      { n: 93508,  pos: 2 },   /* 5 → 500   (zéro adjacent)                             */
      { n: 4484,   pos: 2 },   /* 4 → 400   (piège : chiffre 4 répété trois fois)       */
      { n: 71204,  pos: 1 },   /* 0 → 0     (piège : le chiffre allumé est un zéro)     */
      { n: 358209, pos: 5 },   /* 3 → 300 000                                           */
      { n: 62850,  pos: 4 },   /* 6 → 60 000                                            */
      { n: 834567, pos: 3 },   /* 4 → 4 000                                             */
      { n: 209300, pos: 4 },   /* 0 → 0     (piège : zéro à position haute)             */
      { n: 540821, pos: 5 },   /* 5 → 500 000                                           */
    ],

    /* Étape 2 — Tableau de numération : { n, fr } — fr = texte lu à voix haute */
    step2Pool: [
      { n: 6254,   fr: "six mille deux cent cinquante-quatre" },
      { n: 30508,  fr: "trente mille cinq cent huit" },           /* zéro intercalé */
      { n: 72061,  fr: "soixante-douze mille soixante et un" },
      { n: 103475, fr: "cent trois mille quatre cent soixante-quinze" },
      { n: 4009,   fr: "quatre mille neuf" },                     /* deux zéros     */
      { n: 81300,  fr: "quatre-vingt-un mille trois cents" },
    ],

    /* Étape 3 — "Clique sur le chiffre des…" : { n, posName, pos } */
    step3Pool: [
      { n: 23508,   posName: "milliers",              pos: 3 },  /* 3 (zéro adjacent)        */
      { n: 4484,    posName: "centaines",              pos: 2 },  /* 4 (piège : trois fois 4) */
      { n: 53042800, posName: "dizaines de millions",  pos: 7 },  /* 5 (8 chiffres)           */
      { n: 69482,   posName: "dizaines",               pos: 1 },  /* 8                        */
      { n: 105070,  posName: "centaines de milliers",  pos: 5 },  /* 1                        */
      { n: 833912,  posName: "dizaines de milliers",   pos: 4 },  /* 3 (piège : deux fois 3)  */
      { n: 40300,   posName: "centaines",              pos: 2 },  /* 3                        */
      { n: 2050900, posName: "millions",               pos: 6 },  /* 2                        */
    ],

    /* Étape 4 — "Nombre de…" : { n, posName, placeValue }
       Réponse = Math.floor(n / placeValue)
       Piège classique : élève répond chiffre=7 au lieu de nombre=457 */
    step4Pool: [
      { n: 45782,   posName: "centaines",             placeValue: 100    },  /* 457 (chiffre=7) */
      { n: 30508,   posName: "milliers",              placeValue: 1000   },  /* 30  (zéro)      */
      { n: 2345678, posName: "dizaines de milliers",  placeValue: 10000  },  /* 234             */
      { n: 96300,   posName: "centaines",             placeValue: 100    },  /* 963             */
      { n: 1050000, posName: "dizaines de milliers",  placeValue: 10000  },  /* 105             */
      { n: 74839,   posName: "milliers",              placeValue: 1000   },  /* 74              */
      { n: 830247,  posName: "centaines de milliers", placeValue: 100000 },  /* 8               */
      { n: 5070,    posName: "milliers",              placeValue: 1000   },  /* 5               */
    ],

    /* Étape 5 — Décomposition : nombres dont zéros intercalés en piège final */
    step5Pool: [
      4582,    /* 4×1 000 + 5×100 + 8×10 + 2                                   */
      30508,   /* 3×10 000 + 0×1 000 + 5×100 + 0×10 + 8  (piège requis)       */
      716043,  /* 6 chiffres avec zéro                                          */
      8200,    /* 4 chiffres, zéros finaux                                       */
      90305,   /* 5 chiffres, deux zéros                                        */
      403026,  /* 6 chiffres, deux zéros                                        */
    ]
  }

};

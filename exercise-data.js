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
    title: "Conjuguer à l'imparfait",
    type: "imparfait-niveaux",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── Niveau 1 : 4 textes d'identification ─────────────────────────────
       pqp: true  = verbe à l'imparfait (cible)
       pqp: false = distractor (présent ou passé composé)
    ───────────────────────────────────────────────────────────────────── */
    identTexts: [
      /* Texte 1 — Quand j'étais petit */
      {
        tokens: [
          { t: "Quand j'étais petit, je " },
          { t: "jouais", v: true, pqp: true },
          { t: " dans le jardin tous les après-midis. Ma grand-mère " },
          { t: "aimait", v: true, pqp: true },
          { t: " nous faire des gâteaux. Elle " },
          { t: "a appris", v: true, pqp: false },
          { t: " à cuisiner très jeune. Mon grand-père " },
          { t: "lisait", v: true, pqp: true },
          { t: " le journal chaque matin. Aujourd'hui ils " },
          { t: "habitent", v: true, pqp: false },
          { t: " loin de chez nous." }
        ]
      },
      /* Texte 2 — La forêt enchantée */
      {
        tokens: [
          { t: "Dans la forêt, les animaux " },
          { t: "vivaient", v: true, pqp: true },
          { t: " en paix. Un vieux hibou " },
          { t: "gardait", v: true, pqp: true },
          { t: " les secrets de la forêt. Chaque soir, les renards " },
          { t: "dansaient", v: true, pqp: true },
          { t: " sous les étoiles. Aujourd'hui cette forêt " },
          { t: "appartient", v: true, pqp: false },
          { t: " à un grand parc naturel. Les visiteurs " },
          { t: "viennent", v: true, pqp: false },
          { t: " la découvrir en été." }
        ]
      },
      /* Texte 3 — L'école d'autrefois */
      {
        tokens: [
          { t: "Autrefois, les enfants " },
          { t: "portaient", v: true, pqp: true },
          { t: " un tablier à l'école. La maîtresse " },
          { t: "écrivait", v: true, pqp: true },
          { t: " les leçons au tableau avec de la craie. Les élèves " },
          { t: "copiaient", v: true, pqp: true },
          { t: " tout dans leurs cahiers. Maintenant les enfants " },
          { t: "utilisent", v: true, pqp: false },
          { t: " des tablettes. Les écoles " },
          { t: "ont beaucoup changé", v: true, pqp: false },
          { t: " depuis cette époque." }
        ]
      },
      /* Texte 4 — La tempête de neige */
      {
        tokens: [
          { t: "Ce jour-là, il " },
          { t: "neigeait", v: true, pqp: true },
          { t: " fort dehors. Les enfants " },
          { t: "regardaient", v: true, pqp: true },
          { t: " la neige tomber par la fenêtre. Papa " },
          { t: "a allumé", v: true, pqp: false },
          { t: " la cheminée. Maman " },
          { t: "préparait", v: true, pqp: true },
          { t: " du chocolat chaud. Ce soir-là, le vent " },
          { t: "souffle", v: true, pqp: false },
          { t: " encore très fort." }
        ]
      }
    ],

    /* ── Niveau 2 : 10 phrases à trous ────────────────────────────────────
       (infinitif) dans la phrase → affiché comme puce-aide
       ___ → zone à compléter
    ───────────────────────────────────────────────────────────────────── */
    writeBank: [
      { sentence: "J'(être) ___ fatigué après la course.",              answers: ["étais"],      explication: "À l'imparfait, « j' » + être → <strong>étais</strong> (radical irrégulier « ét- »)." },
      { sentence: "Il (avoir) ___ peur du tonnerre.",                   answers: ["avait"],      explication: "À l'imparfait, « il » + avoir → <strong>avait</strong> (radical « av- »)." },
      { sentence: "Elle (chanter) ___ dans la chorale.",                answers: ["chantait"],   explication: "À l'imparfait, 1<sup>er</sup> groupe : radical + <em>-ait</em> → <strong>chantait</strong>." },
      { sentence: "Je (jouer) ___ aux billes dans la cour.",            answers: ["jouais"],     explication: "À l'imparfait, 1<sup>er</sup> groupe : radical + <em>-ais</em> → <strong>jouais</strong>." },
      { sentence: "Ils (manger) ___ des crêpes le dimanche.",           answers: ["mangeaient"], explication: "À l'imparfait, « ils » + manger → <strong>mangeaient</strong> (on garde le <em>e</em> devant <em>-a</em>)." },
      { sentence: "Il (finir) ___ sa lecture avant de dormir.",         answers: ["finissait"],  explication: "À l'imparfait, 2<sup>e</sup> groupe : radical <em>finiss-</em> + <em>-ait</em> → <strong>finissait</strong>." },
      { sentence: "Nous (faire) ___ des bonhommes de neige.",           answers: ["faisions"],   explication: "À l'imparfait, « nous » + faire → <strong>faisions</strong> (radical irrégulier « fais- »)." },
      { sentence: "Ils (aller) ___ au parc après l'école.",             answers: ["allaient"],   explication: "À l'imparfait, « ils » + aller → <strong>allaient</strong> (radical « all- »)." },
      { sentence: "Tu (voir) ___ la mer depuis ta fenêtre.",            answers: ["voyais"],     explication: "À l'imparfait, « tu » + voir → <strong>voyais</strong> (radical irrégulier « voy- »)." },
      { sentence: "Elle (venir) ___ souvent jouer ici.",                answers: ["venait"],     explication: "À l'imparfait, « elle » + venir → <strong>venait</strong> (radical « ven- »)." }
    ],

    niveauxConfig: {
      rule:             "Imparfait : radical du verbe + terminaisons <em>-ais, -ais, -ait, -ions, -iez, -aient</em>",
      lvDefs: [
        { lv: 1, icon: '⭐',   label: "Niveau 1 — Repère l'imparfait",    desc: "Lis un texte et clique sur les verbes à l'imparfait" },
        { lv: 2, icon: '⭐⭐', label: "Niveau 2 — Conjugue à l'imparfait", desc: "Complète des phrases en conjuguant le verbe à l'imparfait" }
      ],
      verb1Instruction: "Clique sur les verbes à l'<strong>imparfait</strong>, puis valide.",
      verb1NotTarget:   "n'est pas à l'imparfait",
      verb1TargetName:  "imparfait",
      verb1FoundAll:    "Tu as trouvé tous les verbes à l'imparfait !",
      verb2Instruction: "Conjugue le verbe à l'<strong>imparfait</strong>.",
      lv2NextBtnLabel:  "Niveau 2 — Conjugue →",
      winMsg:           "Tu maîtrises l'imparfait aux deux niveaux !",
      simpleErrorFeedback: true
    }
  },

  "conjuguer-futur": {
    title: "Conjuguer au futur",
    type: "futur-niveaux",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── Niveau 1 : 4 textes d'identification ─────────────────────────────
       pqp: true  = verbe au futur simple (cible)
       pqp: false = distractor (présent ou passé composé)
    ───────────────────────────────────────────────────────────────────── */
    identTexts: [
      /* Texte 1 — Les vacances de Tom */
      {
        tokens: [
          { t: "Cet été, Tom " },
          { t: "ira", v: true, pqp: true },
          { t: " en vacances à la mer. Il " },
          { t: "nagera", v: true, pqp: true },
          { t: " chaque jour avec ses cousins. Sa famille " },
          { t: "a loué", v: true, pqp: false },
          { t: " un appartement près de la plage. Le soir, ils " },
          { t: "regardent", v: true, pqp: false },
          { t: " le coucher de soleil. Tom " },
          { t: "reviendra", v: true, pqp: true },
          { t: " bronzé et heureux à la rentrée." }
        ]
      },
      /* Texte 2 — La fête d'anniversaire */
      {
        tokens: [
          { t: "Samedi, c'" },
          { t: "est", v: true, pqp: false },
          { t: " l'anniversaire de Léa. Ses amis " },
          { t: "viendront", v: true, pqp: true },
          { t: " à la fête. Ils " },
          { t: "ont apporté", v: true, pqp: false },
          { t: " des cadeaux la semaine dernière. On " },
          { t: "mangera", v: true, pqp: true },
          { t: " un gros gâteau au chocolat. Léa " },
          { t: "soufflera", v: true, pqp: true },
          { t: " les bougies et " },
          { t: "fera", v: true, pqp: true },
          { t: " un vœu." }
        ]
      },
      /* Texte 3 — La rentrée des classes */
      {
        tokens: [
          { t: "La semaine prochaine, ce " },
          { t: "sera", v: true, pqp: true },
          { t: " la rentrée. Les élèves " },
          { t: "retrouveront", v: true, pqp: true },
          { t: " leurs camarades avec joie. La maîtresse " },
          { t: "distribue", v: true, pqp: false },
          { t: " toujours les cahiers le premier jour. Les enfants " },
          { t: "ont travaillé", v: true, pqp: false },
          { t: " dur cet été. Ils " },
          { t: "apprendront", v: true, pqp: true },
          { t: " plein de choses nouvelles et " },
          { t: "seront", v: true, pqp: true },
          { t: " très contents." }
        ]
      },
      /* Texte 4 — Le voyage dans l'espace */
      {
        tokens: [
          { t: "Un jour, les hommes " },
          { t: "iront", v: true, pqp: true },
          { t: " sur Mars. Ils " },
          { t: "construiront", v: true, pqp: true },
          { t: " des fusées encore plus puissantes. Des astronautes " },
          { t: "ont étudié", v: true, pqp: false },
          { t: " ce projet depuis longtemps. La vie là-bas " },
          { t: "sera", v: true, pqp: true },
          { t: " difficile mais les scientifiques " },
          { t: "travaillent", v: true, pqp: false },
          { t: " sans relâche. Ils " },
          { t: "réussiront", v: true, pqp: true },
          { t: " peut-être un jour." }
        ]
      }
    ],

    /* ── Niveau 2 : 10 phrases à trous ────────────────────────────────────
       (infinitif) dans la phrase → affiché comme puce-aide
       ___ → zone à compléter
    ───────────────────────────────────────────────────────────────────── */
    writeBank: [
      { sentence: "Je (être) ___ médecin plus tard.",               answers: ["serai"],     explication: "Au futur, « je » + être → <strong>serai</strong> (radical irrégulier « ser- »)." },
      { sentence: "Tu (avoir) ___ un vélo pour Noël.",              answers: ["auras"],     explication: "Au futur, « tu » + avoir → <strong>auras</strong> (radical irrégulier « aur- »)." },
      { sentence: "Il (chanter) ___ une chanson sur scène.",        answers: ["chantera"],  explication: "Au futur, 1<sup>er</sup> groupe : infinitif + <em>-a</em> → <strong>chantera</strong>." },
      { sentence: "Nous (finir) ___ nos devoirs avant le dîner.",   answers: ["finirons"],  explication: "Au futur, 2<sup>e</sup> groupe : infinitif + <em>-ons</em> → <strong>finirons</strong>." },
      { sentence: "Vous (parler) ___ devant toute la classe.",      answers: ["parlerez"],  explication: "Au futur, 1<sup>er</sup> groupe : infinitif + <em>-ez</em> → <strong>parlerez</strong>." },
      { sentence: "Ils (jouer) ___ au football demain matin.",      answers: ["joueront"],  explication: "Au futur, 1<sup>er</sup> groupe : infinitif + <em>-ont</em> → <strong>joueront</strong>." },
      { sentence: "Je (faire) ___ mes valises ce soir.",            answers: ["ferai"],     explication: "Au futur, « je » + faire → <strong>ferai</strong> (radical irrégulier « fer- »)." },
      { sentence: "Elle (aller) ___ mieux demain.",                 answers: ["ira"],       explication: "Au futur, + aller → <strong>ira</strong> (radical irrégulier « ir- »)." },
      { sentence: "Nous (venir) ___ vous rejoindre samedi.",        answers: ["viendrons"], explication: "Au futur, « nous » + venir → <strong>viendrons</strong> (radical irrégulier « viendr- »)." },
      { sentence: "Tu (pouvoir) ___ m'aider après l'école ?",       answers: ["pourras"],   explication: "Au futur, « tu » + pouvoir → <strong>pourras</strong> (radical irrégulier « pourr- »)." }
    ],

    niveauxConfig: {
      rule:             "Futur simple : terminaisons <em>-rai, -ras, -ra, -rons, -rez, -ront</em>",
      lvDefs: [
        { lv: 1, icon: '⭐',   label: 'Niveau 1 — Repère le futur',    desc: 'Lis un texte et clique sur les verbes au futur simple' },
        { lv: 2, icon: '⭐⭐', label: 'Niveau 2 — Conjugue au futur',  desc: 'Complète des phrases en conjuguant le verbe au futur simple' }
      ],
      verb1Instruction: "Clique sur les verbes au <strong>futur simple</strong>, puis valide.",
      verb1NotTarget:   "n'est pas au futur simple",
      verb1TargetName:  "futur simple",
      verb1FoundAll:    "Tu as trouvé tous les verbes au futur simple !",
      verb2Instruction: "Conjugue le verbe au <strong>futur simple</strong>.",
      lv2NextBtnLabel:  "Niveau 2 — Conjugue →",
      winMsg:           "Tu maîtrises le futur simple aux deux niveaux !",
      simpleErrorFeedback: true
    }
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
        instruction: "Clique sur tous les articles définis dans ce texte.",
        sentence: "Le chien joue dans le jardin . Il renifle les fleurs et s' approche de la fontaine . Le soleil brille et l' air est doux .",
        targets: ["Le", "le", "les", "la", "l'"],
        piege: {},
        note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet."
      },
      {
        instruction: "Clique sur tous les articles définis dans ce texte.",
        sentence: "La classe prépare la pièce de théâtre . Les élèves apprennent le texte et l' institutrice sourit . Le spectacle aura lieu vendredi .",
        targets: ["La", "la", "Les", "le", "l'", "Le"],
        piege: {},
        note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet."
      },
      {
        instruction: "Clique sur tous les articles définis dans ce texte.",
        sentence: "L' hiver arrive dans la montagne . La neige recouvre les sapins et le sentier disparaît sous le blanc . Les randonneurs rentrent au refuge .",
        targets: ["L'", "la", "La", "les", "le", "Les", "au"],
        piege: {},
        note: "💡 <b>L'</b> et <b>au</b> (= à + le) sont des articles définis contractés."
      },
      {
        instruction: "Clique sur tous les articles définis dans ce texte.",
        sentence: "Le soir , l' enfant lit le livre que sa maman lui a offert . Les illustrations sont magnifiques et les couleurs très vives .",
        targets: ["Le", "l'", "le", "Les", "les"],
        piege: {},
        note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet."
      },
      {
        instruction: "Clique sur tous les articles définis dans ce texte.",
        sentence: "La fermière nourrit les poules avec le grain . L' après-midi , elle va au marché acheter les légumes . Le soir , elle ferme la porte .",
        targets: ["La", "les", "le", "L'", "au", "Le", "la"],
        piege: {},
        note: "💡 <b>L'</b> et <b>au</b> (= à + le) sont des articles définis contractés."
      },
      {
        instruction: "Clique sur tous les articles définis dans ce texte. Attention, il y a peut-être un piège !",
        sentence: "Les oiseaux font leur nid dans l' arbre près de la haie . Le chat les observe depuis la fenêtre sans bouger . Il les guette depuis des heures .",
        targets: ["Les", "l'", "la", "Le"],
        piege: { "les": "Ici, « les » remplace un nom (les oiseaux). C'est un pronom personnel, pas un article !" },
        note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet."
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
    type: "mots-cliquables",
    questionsPerSession: 6,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les articles indéfinis dans ce texte.",
        sentence: "Un enfant joue dans le jardin . Il trouve une coccinelle et des fourmis sous les pierres .",
        targets: ["Un", "une", "des"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles indéfinis dans ce texte.",
        sentence: "Des nuages arrivent dans le ciel . Un vent froid souffle et les feuilles tombent . Il faut une veste pour sortir .",
        targets: ["Des", "Un", "une"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles indéfinis dans ce texte.",
        sentence: "Dans une vieille maison , un fantôme habite . Des bruits étranges se font entendre la nuit . Les habitants ont très peur .",
        targets: ["une", "un", "Des"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles indéfinis dans ce texte.",
        sentence: "Le boulanger prépare des croissants et des baguettes chaque matin . Une cliente arrive et achète un pain aux raisins .",
        targets: ["des", "Une", "un"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles indéfinis dans ce texte.",
        sentence: "Un explorateur découvre une grotte cachée dans la forêt . Des stalactites pendent et des cristaux scintillent sous sa lampe .",
        targets: ["Un", "une", "Des", "des"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les articles indéfinis dans ce texte.",
        sentence: "Un matin de printemps , des hirondelles arrivent dans le village . Une hirondelle construit un nid sous le toit de la grange .",
        targets: ["Un", "des", "Une", "un"],
        piege: {}
      }
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
     3 niveaux déverrouillables (det-demo-niveaux)
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-determinant-demonstratif": {
    title: "Identifier un déterminant démonstratif",
    levels: ["CM1", "CM2", "6e"],
    type: "det-demo-niveaux",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : clique sur le déterminant démonstratif ─────────────────
       targets = tableau des formes attendues (version "clean" sans ponctuation)
    ─────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      {
        sentence: "Ce matin, le soleil brille dans le ciel.",
        targets: ["Ce"],
        feedbackOk: "Oui ! <strong>Ce</strong> est un déterminant démonstratif : il est placé devant le nom <em>matin</em> pour désigner un moment précis.",
        feedbackErr: "Le déterminant démonstratif est <strong>Ce</strong>, placé devant le nom <em>matin</em>. <em>Le</em> est un article défini, pas un démonstratif."
      },
      {
        sentence: "J'ai lu cet article très intéressant.",
        targets: ["cet"],
        feedbackOk: "Bravo ! <strong>Cet</strong> s'emploie devant un nom masculin singulier qui commence par une <strong>voyelle</strong> (<em>article</em> commence par <em>a</em>).",
        feedbackErr: "Le déterminant démonstratif est <strong>cet</strong>. On l'emploie devant un nom masculin singulier commençant par une voyelle ou un h muet (<em>article</em> → voyelle <em>a</em>)."
      },
      {
        sentence: "Regarde cette belle fleur dans le jardin !",
        targets: ["cette"],
        feedbackOk: "Oui ! <strong>Cette</strong> est le déterminant démonstratif féminin singulier, placé devant le nom <em>fleur</em>.",
        feedbackErr: "Le déterminant démonstratif est <strong>cette</strong>, féminin singulier, devant le nom <em>fleur</em>. <em>Le</em> est un article défini."
      },
      {
        sentence: "Ces enfants jouent dans la cour de l'école.",
        targets: ["Ces"],
        feedbackOk: "Parfait ! <strong>Ces</strong> est la forme plurielle du déterminant démonstratif — il désigne plusieurs enfants à la fois.",
        feedbackErr: "Le déterminant démonstratif est <strong>Ces</strong> (pluriel). <em>La</em> et <em>l'</em> sont des articles définis."
      },
      {
        sentence: "Mon voisin promène son chien dans ce parc.",
        targets: ["ce"],
        feedbackOk: "Bien trouvé ! <strong>Ce</strong> est un déterminant démonstratif (masculin singulier devant consonne), placé devant le nom <em>parc</em>.",
        feedbackErr: "Le déterminant démonstratif est <strong>ce</strong>, devant le nom <em>parc</em>. <em>Mon</em> et <em>son</em> sont des déterminants possessifs, pas démonstratifs."
      },
      {
        sentence: "Cet homme est très gentil avec les voisins.",
        targets: ["Cet"],
        feedbackOk: "Excellent ! <strong>Cet</strong> s'utilise devant un nom masculin commençant par un <strong>h muet</strong> (<em>homme</em>). On prononce « cet·homme » avec une liaison.",
        feedbackErr: "Le déterminant démonstratif est <strong>Cet</strong>, devant <em>homme</em>. On emploie <em>cet</em> (et non <em>ce</em>) car <em>homme</em> commence par un h muet — le h muet entraîne la liaison comme une voyelle."
      },
      {
        sentence: "Elle range ses affaires dans cette armoire.",
        targets: ["cette"],
        feedbackOk: "Bravo ! <strong>Cette</strong> est le déterminant démonstratif féminin singulier, placé devant le nom <em>armoire</em>.",
        feedbackErr: "Le déterminant démonstratif est <strong>cette</strong>, devant le nom féminin <em>armoire</em>. <em>Ses</em> est un déterminant possessif (il indique l'appartenance)."
      },
      {
        sentence: "Les élèves rangent leurs livres sur ces étagères.",
        targets: ["ces"],
        feedbackOk: "Oui ! <strong>Ces</strong> est le déterminant démonstratif pluriel, placé devant le nom <em>étagères</em> pour désigner des étagères précises.",
        feedbackErr: "Le déterminant démonstratif est <strong>ces</strong> (pluriel), devant <em>étagères</em>. <em>Les</em> est un article défini et <em>leurs</em> est un déterminant possessif."
      }
    ],

    /* ── Niveau 2 : 2 étapes — observe le nom, puis choisis le démonstratif ──
       genre    : "masculin" | "féminin"
       nombre   : "singulier" | "pluriel"
       initiale : "consonne" | "voyelle" | "h muet"  (ignoré si pluriel)
       answer   : "ce" | "cet" | "cette" | "ces"
    ─────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      {
        phrase: "___ avion décolle dans cinq minutes.",
        noun: "avion", genre: "masculin", nombre: "singulier", initiale: "voyelle", answer: "cet",
        explication: "<strong>Cet</strong> : masculin singulier commençant par une voyelle (<em>a</em>)."
      },
      {
        phrase: "___ homme est arrivé ce matin.",
        noun: "homme", genre: "masculin", nombre: "singulier", initiale: "h muet", answer: "cet",
        explication: "<strong>Cet</strong> : masculin singulier commençant par un h muet (liaison comme une voyelle)."
      },
      {
        phrase: "___ amie est très sympathique.",
        noun: "amie", genre: "féminin", nombre: "singulier", initiale: "voyelle", answer: "cette",
        explication: "<strong>Cette</strong> : féminin singulier. Même devant une voyelle, on dit <em>cette</em> et non *<em>cet</em>."
      },
      {
        phrase: "___ oiseaux font leurs nids dans les arbres.",
        noun: "oiseaux", genre: "masculin", nombre: "pluriel", initiale: "voyelle", answer: "ces",
        explication: "<strong>Ces</strong> : toujours au pluriel, quel que soit le genre ou l'initiale."
      },
      {
        phrase: "___ livre est vraiment passionnant.",
        noun: "livre", genre: "masculin", nombre: "singulier", initiale: "consonne", answer: "ce",
        explication: "<strong>Ce</strong> : masculin singulier commençant par une consonne."
      },
      {
        phrase: "___ fleur sent très bon.",
        noun: "fleur", genre: "féminin", nombre: "singulier", initiale: "consonne", answer: "cette",
        explication: "<strong>Cette</strong> : féminin singulier."
      },
      {
        phrase: "Regarde ___ beau château !",
        noun: "château", genre: "masculin", nombre: "singulier", initiale: "consonne", answer: "ce",
        explication: "<strong>Ce</strong> : masculin singulier devant consonne."
      },
      {
        phrase: "___ chaussures sont toutes neuves.",
        noun: "chaussures", genre: "féminin", nombre: "pluriel", initiale: "consonne", answer: "ces",
        explication: "<strong>Ces</strong> : pluriel (ici féminin pluriel)."
      },
      {
        phrase: "___ école est vraiment très grande.",
        noun: "école", genre: "féminin", nombre: "singulier", initiale: "voyelle", answer: "cette",
        explication: "<strong>Cette</strong> : féminin singulier. Contrairement au masculin, le féminin ne prend pas <em>cet</em> devant une voyelle."
      },
      {
        phrase: "___ jouets sont éparpillés dans le salon.",
        noun: "jouets", genre: "masculin", nombre: "pluriel", initiale: "consonne", answer: "ces",
        explication: "<strong>Ces</strong> : pluriel. Ne pas confondre avec <em>ses</em> (possessif) : <em>ces jouets</em> = on montre des jouets précis ; <em>ses jouets</em> = les jouets lui appartiennent.",
        noteSesCes: true
      }
    ],

    /* ── Niveau 3 : ce ou se ? (20 items, score /20) ───────────────────────
       answer : "ce" (déterminant devant nom) | "se" (pronom réfléchi devant verbe)
    ─────────────────────────────────────────────────────────────────────── */
    lvl3Bank: [
      /* ── « ce » devant un nom ── */
      { sentence: "___ chien aboie très fort.",                          answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>chien</em>." },
      { sentence: "J'aime beaucoup ___ film.",                           answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>film</em>." },
      { sentence: "___ problème est difficile à résoudre.",              answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>problème</em>." },
      { sentence: "Regarde ___ beau papillon !",                        answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>papillon</em> (l'adjectif <em>beau</em> est intercalé)." },
      { sentence: "___ livre est vraiment passionnant.",                 answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>livre</em>." },
      { sentence: "Elle habite dans ___ quartier depuis longtemps.",     answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>quartier</em>." },
      { sentence: "Il travaille dans ___ bureau depuis l'an dernier.",   answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>bureau</em>." },
      { sentence: "Prends ___ chemin, c'est plus court.",               answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>chemin</em>." },
      { sentence: "Nous allons voir ___ spectacle demain.",              answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>spectacle</em>." },
      { sentence: "___ matin, Paul se lève tôt.",                       answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>matin</em>. Dans cette même phrase, <em>se</em> est un pronom réfléchi devant le verbe <em>lève</em>." },
      /* ── « se » devant un verbe (pronom réfléchi) ── */
      { sentence: "Le chat ___ lave les pattes.",                       answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : placé devant le verbe <em>lave</em>. Test : on peut dire <em>je me lave</em> → c'est bien un pronom réfléchi." },
      { sentence: "Il ___ lève tôt chaque matin.",                      answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : placé devant le verbe <em>lève</em>. Test : <em>je me lève</em> → pronom réfléchi." },
      { sentence: "Elle ___ promène dans le parc.",                     answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : placé devant le verbe <em>promène</em>. Test : <em>je me promène</em>." },
      { sentence: "Paul ___ dépêche d'aller à l'école.",                answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>dépêche</em>. Test : <em>je me dépêche</em>." },
      { sentence: "Les enfants ___ couchent à vingt et une heures.",    answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>couchent</em>. Test : <em>je me couche</em>." },
      { sentence: "Tom ___ regarde dans le miroir.",                    answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>regarde</em>. Test : <em>je me regarde</em>." },
      { sentence: "Ma sœur ___ peigne les cheveux chaque matin.",       answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>peigne</em>. Test : <em>je me peigne</em>." },
      { sentence: "Il ___ tait quand le professeur parle.",             answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>tait</em>. Test : <em>je me tais</em>." },
      { sentence: "Ils ___ parlent souvent après la classe.",           answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>parlent</em>. Test : <em>nous nous parlons</em>." },
      { sentence: "Ce matin, Paul ___ lève tôt.",                       answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>lève</em>. Test : <em>je me lève</em>. Dans cette même phrase, <em>Ce</em> est un déterminant démonstratif devant le nom <em>matin</em>." }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     Identifier un déterminant possessif — cliquer dans des phrases
     10 phrases, toutes les formes (mon/ma/mes … leur/leurs), pièges inclus
  ─────────────────────────────────────────────────────────────────────────── */
  "identifier-determinant-possessif": {
    title: "Identifier les déterminants possessifs",
    levels: ["CM1", "CM2", "6e"],
    type: "mots-cliquables",
    questionsPerSession: 10,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Je range mes affaires dans mon cartable .",
        targets: ["mes", "mon"],
        piege: {},
        note: "📌 <strong>mes</strong> et <strong>mon</strong> indiquent l'appartenance à la 1<sup>re</sup> personne du singulier (<em>je</em>)."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Tu as oublié ton stylo et tes cahiers .",
        targets: ["ton", "tes"],
        piege: {},
        note: "📌 <strong>ton</strong> et <strong>tes</strong> : 2<sup>e</sup> personne du singulier (<em>tu</em>). <em>Ton</em> devant un nom masculin, <em>tes</em> au pluriel."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Il promène son chien avec ses amis .",
        targets: ["son", "ses"],
        piege: {},
        note: "📌 <strong>son</strong> et <strong>ses</strong> : 3<sup>e</sup> personne du singulier (<em>il</em>). <em>Son</em> devant un nom singulier, <em>ses</em> au pluriel."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Elle lit ses livres dans sa chambre .",
        targets: ["ses", "sa"],
        piege: {},
        note: "📌 <strong>ses</strong> et <strong>sa</strong> : 3<sup>e</sup> personne du singulier (<em>elle</em>). <em>Sa</em> devant un nom féminin singulier."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Nous adorons notre école et nos professeurs .",
        targets: ["notre", "nos"],
        piege: {},
        note: "📌 <strong>notre</strong> et <strong>nos</strong> : 1<sup>re</sup> personne du pluriel (<em>nous</em>). <em>Notre</em> au singulier, <em>nos</em> au pluriel."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Vous avez rangé votre sac et vos affaires .",
        targets: ["votre", "vos"],
        piege: {},
        note: "📌 <strong>votre</strong> et <strong>vos</strong> : 2<sup>e</sup> personne du pluriel ou de politesse (<em>vous</em>)."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention au piège !",
        sentence: "Les enfants jouent avec leurs jouets dans leur chambre .",
        targets: ["leurs", "leur"],
        piege: { "Les": "« Les » est un article défini, pas un déterminant possessif." },
        note: "📌 <strong>leurs</strong> et <strong>leur</strong> : 3<sup>e</sup> personne du pluriel (<em>ils/elles</em>). <em>Leur</em> devant un nom singulier, <em>leurs</em> devant un nom pluriel."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention aux pièges !",
        sentence: "Mon petit frère prête sa guitare à ses camarades le week-end .",
        targets: ["Mon", "sa", "ses"],
        piege: { "le": "« le » est un article défini, pas un déterminant possessif." },
        note: "📌 Trois possessifs : <strong>Mon</strong> (masc. sing., 1<sup>re</sup> pers.), <strong>sa</strong> (fém. sing., 3<sup>e</sup> pers.), <strong>ses</strong> (plur., 3<sup>e</sup> pers.)."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention au piège !",
        sentence: "Ta mère et ton père sont partis avec leurs valises ce matin .",
        targets: ["Ta", "ton", "leurs"],
        piege: { "ce": "« ce » est un déterminant démonstratif (il montre un moment précis), pas un possessif." },
        note: "📌 <strong>Ta</strong> et <strong>ton</strong> (2<sup>e</sup> pers. sing.) + <strong>leurs</strong> (3<sup>e</sup> pers. plur.) dans la même phrase."
      },
      {
        instruction: "Clique sur tous les déterminants possessifs dans la phrase.",
        sentence: "Notre jardin et nos fleurs sont magnifiques en été .",
        targets: ["Notre", "nos"],
        piege: {},
        note: "📌 <strong>Notre</strong> et <strong>nos</strong> : 1<sup>re</sup> personne du pluriel (<em>nous</em>)."
      }
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
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     ORTHOGRAPHE — ACCORDS DANS LE GROUPE NOMINAL
     Programmes 2025 : CM1 → CM2 → 6e
  ═══════════════════════════════════════════════════════════════════════════ */

  "ortho-accorder-determinant-nom": {
    title: "Accorder le déterminant avec le nom",
    type:  "accord-ecrit",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 15,
    backLink: { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Articles définis et indéfinis, genre et nombre",
      "CM2": "Déterminants possessifs, démonstratifs et élision",
      "6e":  "Partitifs, contractés, « tout » et cas complexes"
    },
    bank: [
      /* ── CM1 (difficulty 1) : articles définis et indéfinis ───────────────
         Objectif : comprendre que le déterminant s'accorde en genre
         et en nombre avec le nom qui le suit.
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un livre", answer: "des livres", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "la table", answer: "les tables", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "le chat", answer: "les chats", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une fleur", answer: "des fleurs", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un enfant", answer: "des enfants", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "le stylo", answer: "les stylos", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une voiture", answer: "des voitures", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un chien", answer: "des chiens", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "les livres", answer: "le livre", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "des maisons", answer: "une maison", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "les pommes", answer: "la pomme", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "des garçons", answer: "un garçon", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "les chiens", answer: "le chien", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "des filles", answer: "une fille", difficulty: 1 },
      { instruction: "Écris ce nom avec l'article défini qui convient.",
        prompt: "soleil", answer: "le soleil", difficulty: 1 },
      { instruction: "Écris ce nom avec l'article défini qui convient.",
        prompt: "lune", answer: "la lune", difficulty: 1 },
      { instruction: "Écris ce nom avec l'article défini qui convient.",
        prompt: "cahier", answer: "le cahier", difficulty: 1 },
      { instruction: "Écris ce nom avec l'article défini qui convient.",
        prompt: "porte", answer: "la porte", difficulty: 1 },
      { instruction: "Écris ce nom avec l'article indéfini qui convient.",
        prompt: "vélo", answer: "un vélo", difficulty: 1 },
      { instruction: "Écris ce nom avec l'article indéfini qui convient.",
        prompt: "gomme", answer: "une gomme", difficulty: 1 },

      /* ── CM2 (difficulty 2) : possessifs, démonstratifs, élision ──────────
         Objectif : maîtriser les déterminants possessifs et démonstratifs ;
         comprendre l'élision et la forme « cet/mon/ton/son » devant voyelle.
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "mon chien", answer: "mes chiens", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "ta maison", answer: "tes maisons", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "son livre", answer: "ses livres", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "notre ami", answer: "nos amis", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "votre école", answer: "vos écoles", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "ce chat", answer: "ces chats", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "cette fleur", answer: "ces fleurs", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "cet arbre", answer: "ces arbres", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "mes livres", answer: "mon livre", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "tes amies", answer: "ton amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "ses histoires", answer: "son histoire", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "ces chats", answer: "ce chat", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "ces fleurs", answer: "cette fleur", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "ces arbres", answer: "cet arbre", difficulty: 2 },
      { instruction: "Écris ce nom avec l'article défini (attention à l'élision !).",
        prompt: "arbre", answer: "l'arbre", difficulty: 2 },
      { instruction: "Écris ce nom avec l'article défini (attention à l'élision !).",
        prompt: "orange", answer: "l'orange", difficulty: 2 },
      { instruction: "Écris ce nom avec l'article défini (attention à l'élision !).",
        prompt: "eau", answer: "l'eau", difficulty: 2 },
      { instruction: "Écris ce nom avec le déterminant démonstratif qui convient. (Attention : « cet » devant voyelle !)",
        prompt: "homme", answer: "cet homme", difficulty: 2 },
      { instruction: "Écris ce nom avec le déterminant démonstratif qui convient. (Attention : « cet » devant voyelle !)",
        prompt: "animal", answer: "cet animal", difficulty: 2 },
      { instruction: "Écris ce nom avec le déterminant possessif « mon/ma ». (Attention : « mon » devant voyelle même au féminin !)",
        prompt: "amie", answers: ["mon amie"], difficulty: 2 },

      /* ── 6e (difficulty 3) : partitifs, contractés, « tout », cas complexes
         Objectif : utiliser l'ensemble des déterminants dans des contextes
         variés ; maîtriser les articles partitifs, les formes contractées
         et l'accord de « tout ».
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Écris ce nom avec le déterminant partitif qui convient (du / de la / de l').",
        prompt: "pain", answer: "du pain", difficulty: 3 },
      { instruction: "Écris ce nom avec le déterminant partitif qui convient (du / de la / de l').",
        prompt: "eau", answer: "de l'eau", difficulty: 3 },
      { instruction: "Écris ce nom avec le déterminant partitif qui convient (du / de la / de l').",
        prompt: "farine", answer: "de la farine", difficulty: 3 },
      { instruction: "Écris ce nom avec le déterminant partitif qui convient (du / de la / de l').",
        prompt: "huile", answer: "de l'huile", difficulty: 3 },
      { instruction: "Écris ce nom avec le déterminant partitif qui convient (du / de la / de l').",
        prompt: "lait", answer: "du lait", difficulty: 3 },
      { instruction: "Écris ce groupe nominal avec « tout » accordé correctement.",
        prompt: "la journée", answer: "toute la journée", difficulty: 3 },
      { instruction: "Écris ce groupe nominal avec « tout » accordé correctement.",
        prompt: "le travail", answer: "tout le travail", difficulty: 3 },
      { instruction: "Écris ce groupe nominal avec « tout » accordé correctement.",
        prompt: "les élèves", answer: "tous les élèves", difficulty: 3 },
      { instruction: "Écris ce groupe nominal avec « tout » accordé correctement.",
        prompt: "les classes", answer: "toutes les classes", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "leur maison", answer: "leurs maisons", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "leur ami", answer: "leurs amis", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "leurs livres", answer: "leur livre", difficulty: 3 },
      { instruction: "Écris la forme contractée (de + le / de + les).",
        prompt: "de + le marché", answer: "du marché", difficulty: 3 },
      { instruction: "Écris la forme contractée (à + le / à + les).",
        prompt: "à + les enfants", answer: "aux enfants", difficulty: 3 },
      { instruction: "Écris la forme contractée (à + le / à + les).",
        prompt: "à + le cinéma", answer: "au cinéma", difficulty: 3 },
      { instruction: "Écris ce nom avec l'article défini (attention au h muet ou aspiré !).",
        prompt: "hôpital (h muet)", answer: "l'hôpital", difficulty: 3 },
      { instruction: "Écris ce nom avec l'article défini (attention au h muet ou aspiré !).",
        prompt: "hibou (h aspiré)", answer: "le hibou", difficulty: 3 },
      { instruction: "Écris ce nom avec l'article défini (attention au h muet ou aspiré !).",
        prompt: "haricot (h aspiré)", answer: "le haricot", difficulty: 3 },
      { instruction: "Écris ce nom avec l'article défini (attention au h muet ou aspiré !).",
        prompt: "heure (h muet)", answer: "l'heure", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "leur collègue", answer: "leurs collègues", difficulty: 3 }
    ]
  },

  "ortho-accorder-adjectif-nom": {
    title: "Accorder l'adjectif avec le nom",
    type:  "accord-ecrit",
    levels: ["CM1", "CM2", "6e"],
    questionsPerSession: 15,
    backLink: { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Adjectifs courants : accord en genre et en nombre",
      "CM2": "Adjectifs irréguliers et formes spéciales (beau, -al/-aux…)",
      "6e":  "Adjectifs invariables, participes, cas complexes"
    },
    bank: [
      /* ── CM1 (difficulty 1) : accord basique des adjectifs ────────────────
         Objectif : comprendre que l'adjectif s'accorde en genre et en nombre
         avec le nom qu'il qualifie ; maîtriser les terminaisons -e, -s, -es.
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un chat noir", answer: "des chats noirs", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "le petit garçon", answer: "les petits garçons", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un livre rouge", answer: "des livres rouges", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un enfant sage", answer: "des enfants sages", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "le stylo bleu", answer: "les stylos bleus", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une fleur rouge", answer: "des fleurs rouges", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "la grande maison", answer: "les grandes maisons", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une petite fille", answer: "des petites filles", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une table ronde", answer: "des tables rondes", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "les chats noirs", answer: "le chat noir", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "des fleurs blanches", answer: "une fleur blanche", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au singulier.",
        prompt: "les petits enfants", answer: "le petit enfant", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un ami poli", answer: "une amie polie", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un élève sérieux", answer: "une élève sérieuse", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un cousin content", answer: "une cousine contente", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un voisin gentil", answer: "une voisine gentille", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un ami gentil", answer: "des amies gentilles", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "le cousin sérieux", answer: "les cousines sérieuses", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un voisin content", answer: "des voisines contentes", difficulty: 1 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une fleur blanche", answer: "des fleurs blanches", difficulty: 1 },

      /* ── CM2 (difficulty 2) : formes irrégulières ─────────────────────────
         Objectif : maîtriser les adjectifs irréguliers : -al/-aux au
         masculin pluriel, beau/bel/belle, nouveau/nouvel/nouvelle,
         vieux/vieil/vieille, -eux/-euse, -if/-ive, -er/-ère, -eur/-euse.
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "le problème principal", answer: "les problèmes principaux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "un thème national", answer: "des thèmes nationaux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "le texte régional", answer: "les textes régionaux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "un résultat normal", answer: "des résultats normaux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au masculin pluriel. (Attention : -eux ne change pas au pluriel !)",
        prompt: "un élève courageux", answer: "des élèves courageux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au masculin pluriel. (Attention : -eux ne change pas au pluriel !)",
        prompt: "un ami sérieux", answer: "des amis sérieux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier. (Attention au féminin de « beau » !)",
        prompt: "un beau voisin", answer: "une belle voisine", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier. (Attention : « bel » devant voyelle → « belle » au féminin.)",
        prompt: "un bel ami", answer: "une belle amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier. (Attention au féminin de « nouveau » !)",
        prompt: "un nouvel ami", answer: "une nouvelle amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier. (Attention au féminin de « nouveau » !)",
        prompt: "un nouveau voisin", answer: "une nouvelle voisine", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier. (Attention au féminin de « vieux » !)",
        prompt: "un vieil ami", answer: "une vieille amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier. (Attention au féminin de « vieux » !)",
        prompt: "un vieux voisin", answer: "une vieille voisine", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-eux → -euse)",
        prompt: "un élève courageux", answer: "une élève courageuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-eux → -euse)",
        prompt: "un ami heureux", answer: "une amie heureuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-eux → -euse)",
        prompt: "un voisin sérieux", answer: "une voisine sérieuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-eur → -euse)",
        prompt: "un ami menteur", answer: "une amie menteuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-if → -ive)",
        prompt: "un ami sportif", answer: "une amie sportive", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-if → -ive)",
        prompt: "un élève actif", answer: "une élève active", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin. (-er → -ère)",
        prompt: "un voisin étranger", answer: "une voisine étrangère", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un ami courageux", answer: "des amies courageuses", difficulty: 2 },

      /* ── 6e (difficulty 3) : cas avancés ──────────────────────────────────
         Objectif : identifier les adjectifs invariables (couleurs dérivées
         de noms), accorder les participes passés employés comme adjectifs,
         maîtriser les formes complexes (doux/douce, faux/fausse, etc.)
         et distinguer adjectif épithète et attribut.
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Mets ce groupe nominal au pluriel. (Attention : cet adjectif de couleur est invariable !)",
        prompt: "un pantalon marron", answer: "des pantalons marron", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin pluriel. (Attention : cet adjectif de couleur est invariable !)",
        prompt: "un pull orange", answer: "des pulls orange", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel. (Attention : cet adjectif de couleur est invariable !)",
        prompt: "une veste kaki", answer: "des vestes kaki", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel. (« roux » est un adjectif de couleur qui s'accorde.)",
        prompt: "un chat roux", answer: "des chats roux", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin pluriel. (« roux » s'accorde !)",
        prompt: "un chat roux", answer: "des chattes rousses", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel. (Le participe passé s'accorde.)",
        prompt: "un livre ouvert", answer: "des livres ouverts", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel. (Le participe passé s'accorde.)",
        prompt: "la porte fermée", answer: "les portes fermées", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel. (Le participe passé s'accorde.)",
        prompt: "une fenêtre cassée", answer: "des fenêtres cassées", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-oux → -ouce)",
        prompt: "un ami doux", answer: "une amie douce", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-aux → -ausse)",
        prompt: "un voisin faux", answer: "une voisine fausse", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-ou → -olle)",
        prompt: "un élève fou", answer: "une élève folle", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-eur → -eure)",
        prompt: "un artiste supérieur", answer: "une artiste supérieure", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-eur → -eure)",
        prompt: "un collègue meilleur", answer: "une collègue meilleure", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin pluriel. (-al/-ale → -ales)",
        prompt: "un artiste génial", answer: "des artistes géniales", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au masculin pluriel. (-al → -aux)",
        prompt: "un accord général", answer: "des accords généraux", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel. (Attention : adjectif composé, seul le second élément s'accorde.)",
        prompt: "un accord franco-allemand", answer: "des accords franco-allemands", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (Adjectif composé.)",
        prompt: "un artiste franco-allemand", answer: "une artiste franco-allemande", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-gu → -guë, avec tréma)",
        prompt: "un élève ambigu", answer: "une élève ambiguë", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-et → -ète)",
        prompt: "un élève complet", answer: "une élève complète", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin. (-et → -ette)",
        prompt: "un voisin muet", answer: "une voisine muette", difficulty: 3 }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════
     MATHÉMATIQUES — FRACTIONS — COMPARER DEUX FRACTIONS
  ══════════════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════════════
     MATHÉMATIQUES — FRACTIONS — ENCADRER UNE FRACTION
  ══════════════════════════════════════════════════════════════════════ */

  "encadrer-fraction": {
    title: "Encadrer une fraction entre deux entiers consécutifs",
    levels: ["CM1", "CM2", "6e"],
    type: "encadrer-fraction",
    questionsPerSession: 6,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ──────────────────────────────────────────────
       difficulty 1 — avec droite graduée (CM1 / CM2)
         Fractions > 1, petits dénominateurs. Un cas entier : 8/4 = 2 (signe ≤).
       difficulty 2 — sans droite graduée, par le calcul (CM2 / 6e)
         Fractions plus grandes ou en dixièmes. Un cas entier : 30/6 = 5.
       Champs : numerator, denominator, lo (entier inf.), hi (entier sup.),
                isInteger (true quand la fraction vaut exactement un entier)
    ────────────────────────────────────────────────────────────────────── */
    bank: [

      /* Niveau 1 — avec droite graduée */
      { numerator:  7, denominator: 4, lo: 1, hi: 2, difficulty: 1 },
      { numerator:  5, denominator: 2, lo: 2, hi: 3, difficulty: 1 },
      { numerator: 11, denominator: 3, lo: 3, hi: 4, difficulty: 1 },
      { numerator:  9, denominator: 4, lo: 2, hi: 3, difficulty: 1 },
      { numerator:  5, denominator: 3, lo: 1, hi: 2, difficulty: 1 },
      { numerator:  7, denominator: 2, lo: 3, hi: 4, difficulty: 1 },
      { numerator: 13, denominator: 5, lo: 2, hi: 3, difficulty: 1 },
      { numerator:  9, denominator: 2, lo: 4, hi: 5, difficulty: 1 },

      /* Niveau 2 — sans droite graduée */
      { numerator: 47, denominator: 10, lo: 4, hi: 5, difficulty: 2 },
      { numerator: 23, denominator:  4, lo: 5, hi: 6, difficulty: 2 },
      { numerator: 38, denominator:  5, lo: 7, hi: 8, difficulty: 2 },
      { numerator: 31, denominator:  7, lo: 4, hi: 5, difficulty: 2 },
      { numerator: 53, denominator:  8, lo: 6, hi: 7, difficulty: 2 },
      { numerator: 29, denominator:  6, lo: 4, hi: 5, difficulty: 2 },
      { numerator: 41, denominator:  9, lo: 4, hi: 5, difficulty: 2 },
      { numerator: 43, denominator:  6, lo: 7, hi: 8, difficulty: 2 }

    ]
  },

  "comparer-fractions": {
    title: "Comparer deux fractions",
    levels: ["CM1", "CM2", "6e"],
    type: "comparer-fractions",
    questionsPerSession: 6,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ──────────────────────────────────────────────
       level 1 — même dénominateur (CM1)
         → comparer revient à comparer les numérateurs
         → inclut au moins un cas d'égalité
       level 2 — dénominateurs différents (CM2 / 6e)
         → approche visuelle : même taille de disque, partages différents
         → inclut : fractions équivalentes, pièges (1/2 > 1/3),
                    cas où grand dénominateur ≠ grande fraction
    ────────────────────────────────────────────────────────────────────── */
    bank: [

      /* Niveau 1 — même dénominateur */
      { level: 1, left: { num: 3, den: 4 }, right: { num: 1, den: 4 }, answer: ">" },
      { level: 1, left: { num: 2, den: 5 }, right: { num: 4, den: 5 }, answer: "<" },
      { level: 1, left: { num: 3, den: 6 }, right: { num: 3, den: 6 }, answer: "=" },
      { level: 1, left: { num: 5, den: 8 }, right: { num: 3, den: 8 }, answer: ">" },
      { level: 1, left: { num: 1, den: 3 }, right: { num: 2, den: 3 }, answer: "<" },
      { level: 1, left: { num: 4, den: 7 }, right: { num: 6, den: 7 }, answer: "<" },

      /* Niveau 3 — droite graduée partagée, fractions < 1 et > 1, dénominateurs différents */
      { level: 3, left: { num: 1, den: 2 }, right: { num: 2, den: 3 }, answer: "<" },   // LCM=6
      { level: 3, left: { num: 3, den: 4 }, right: { num: 1, den: 2 }, answer: ">" },   // LCM=4
      { level: 3, left: { num: 1, den: 3 }, right: { num: 1, den: 2 }, answer: "<" },   // LCM=6
      { level: 3, left: { num: 2, den: 3 }, right: { num: 1, den: 2 }, answer: ">" },   // LCM=6
      { level: 3, left: { num: 5, den: 3 }, right: { num: 3, den: 2 }, answer: ">" },   // LCM=6, >1
      { level: 3, left: { num: 4, den: 3 }, right: { num: 3, den: 2 }, answer: "<" },   // LCM=6, >1
      { level: 3, left: { num: 5, den: 4 }, right: { num: 3, den: 2 }, answer: "<" },   // LCM=4, >1
      { level: 3, left: { num: 3, den: 2 }, right: { num: 4, den: 3 }, answer: ">" },   // LCM=6, >1

      /* Niveau 2 — dénominateurs différents */
      { level: 2, left: { num: 1, den: 2 }, right: { num: 2, den: 4 }, answer: "=" },
      { level: 2, left: { num: 1, den: 2 }, right: { num: 1, den: 3 }, answer: ">" },
      { level: 2, left: { num: 3, den: 4 }, right: { num: 2, den: 3 }, answer: ">" },
      { level: 2, left: { num: 1, den: 3 }, right: { num: 2, den: 5 }, answer: "<" },
      { level: 2, left: { num: 2, den: 3 }, right: { num: 3, den: 4 }, answer: "<" },
      { level: 2, left: { num: 1, den: 4 }, right: { num: 2, den: 3 }, answer: "<" }

    ]
  },

  /* ══════════════════════════════════════════════════════════════════════
     ORTHOGRAPHE — ACCORD DU PARTICIPE PASSÉ AVEC LE COD
  ══════════════════════════════════════════════════════════════════════ */

  "ortho-accorder-participe-passe-cod": {
    title: "Accorder le participe passé avec le COD",
    type:  "accord-participe-cod",
    levels: ["CM2", "6e"],
    questionsPerSession: 8,
    backLink: { href: "français-orthographe.html", label: "Orthographe" },

    /* ── Banque de phrases ──────────────────────────────────────────────────
       Chaque phrase contient un participe passé à compléter (marqué ___).
       Trois situations :
         A. COD placé AVANT le verbe via pronom relatif « que/qu' »  → accord
         B. COD placé AVANT le verbe via déplacement + pronom perso  → accord
         C. COD placé APRÈS le verbe ou absent                       → invariable
       Champs :
         sentence    — phrase affichée (avec « ___ » comme emplacement)
         base        — forme de base du participe (masc. sing.)
         answer      — forme correcte attendue
         hasCodBefore — true si le COD est placé avant le verbe
         choices     — boutons du niveau 1 : { label, isCorrect, gender?, number? }
         codHint     — explication d'accord affichée après l'étape 1 (niv. 1)
         explanation — explication complète pour le feedback de l'étape 2
    ────────────────────────────────────────────────────────────────────── */
    bank: [

      /* ── A : COD avant le verbe — pronom relatif « que / qu' » ─────────── */
      {
        sentence:     "Les photos que j'ai ___ sont magnifiques.",
        base:         "pris", answer: "prises",
        hasCodBefore: true,
        choices: [
          { label: "les photos",                 isCorrect: true,  gender: "f", number: "p" },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « les photos » est féminin pluriel.",
        explanation: "Le COD « les photos » (féminin pluriel) est avant le verbe → « prises »."
      },
      {
        sentence:     "La lettre qu'il a ___ était très longue.",
        base:         "écrit", answer: "écrite",
        hasCodBefore: true,
        choices: [
          { label: "la lettre",                  isCorrect: true,  gender: "f", number: "s" },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « la lettre » est féminin singulier.",
        explanation: "Le COD « la lettre » (féminin singulier) est avant le verbe → « écrite »."
      },
      {
        sentence:     "Les livres que nous avons ___ étaient passionnants.",
        base:         "lu", answer: "lus",
        hasCodBefore: true,
        choices: [
          { label: "les livres",                 isCorrect: true,  gender: "m", number: "p" },
          { label: "nous",                       isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « les livres » est masculin pluriel.",
        explanation: "Le COD « les livres » (masculin pluriel) est avant le verbe → « lus »."
      },
      {
        sentence:     "La tarte que ma mère a ___ est délicieuse.",
        base:         "fait", answer: "faite",
        hasCodBefore: true,
        choices: [
          { label: "la tarte",                   isCorrect: true,  gender: "f", number: "s" },
          { label: "ma mère",                    isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « la tarte » est féminin singulier.",
        explanation: "Le COD « la tarte » (féminin singulier) est avant le verbe → « faite »."
      },
      {
        sentence:     "Les chansons qu'elles ont ___ étaient belles.",
        base:         "chanté", answer: "chantées",
        hasCodBefore: true,
        choices: [
          { label: "les chansons",               isCorrect: true,  gender: "f", number: "p" },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « les chansons » est féminin pluriel.",
        explanation: "Le COD « les chansons » (féminin pluriel) est avant le verbe → « chantées »."
      },
      {
        sentence:     "La robe que Julie a ___ est magnifique.",
        base:         "choisi", answer: "choisie",
        hasCodBefore: true,
        choices: [
          { label: "la robe",                    isCorrect: true,  gender: "f", number: "s" },
          { label: "Julie",                      isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « la robe » est féminin singulier.",
        explanation: "Le COD « la robe » (féminin singulier) est avant le verbe → « choisie »."
      },
      {
        sentence:     "Les devoirs que les élèves ont ___ étaient difficiles.",
        base:         "rendu", answer: "rendus",
        hasCodBefore: true,
        choices: [
          { label: "les devoirs",                isCorrect: true,  gender: "m", number: "p" },
          { label: "les élèves",                 isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « les devoirs » est masculin pluriel.",
        explanation: "Le COD « les devoirs » (masculin pluriel) est avant le verbe → « rendus »."
      },
      {
        sentence:     "La voiture que mon père a ___ est rouge.",
        base:         "acheté", answer: "achetée",
        hasCodBefore: true,
        choices: [
          { label: "la voiture",                 isCorrect: true,  gender: "f", number: "s" },
          { label: "mon père",                   isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « la voiture » est féminin singulier.",
        explanation: "Le COD « la voiture » (féminin singulier) est avant le verbe → « achetée »."
      },
      {
        sentence:     "Les fleurs que tu as ___ sentent bon.",
        base:         "cueilli", answer: "cueillies",
        hasCodBefore: true,
        choices: [
          { label: "les fleurs",                 isCorrect: true,  gender: "f", number: "p" },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « les fleurs » est féminin pluriel.",
        explanation: "Le COD « les fleurs » (féminin pluriel) est avant le verbe → « cueillies »."
      },
      {
        sentence:     "La leçon que l'enseignante a ___ était très claire.",
        base:         "expliqué", answer: "expliquée",
        hasCodBefore: true,
        choices: [
          { label: "la leçon",                   isCorrect: true,  gender: "f", number: "s" },
          { label: "l'enseignante",              isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « la leçon » est féminin singulier.",
        explanation: "Le COD « la leçon » (féminin singulier) est avant le verbe → « expliquée »."
      },

      /* ── B : COD avant le verbe — déplacement + pronom personnel ──────── */
      {
        sentence:     "Cette émission, je l'ai ___ deux fois.",
        base:         "regardé", answer: "regardée",
        hasCodBefore: true,
        choices: [
          { label: "cette émission (→ l')",      isCorrect: true,  gender: "f", number: "s" },
          { label: "deux fois",                  isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « cette émission », repris par « l' », est féminin singulier.",
        explanation: "Le COD « cette émission » (féminin singulier, repris par « l' ») est avant le verbe → « regardée »."
      },
      {
        sentence:     "Ces gâteaux, maman les a ___ ce matin.",
        base:         "préparé", answer: "préparés",
        hasCodBefore: true,
        choices: [
          { label: "ces gâteaux (→ les)",        isCorrect: true,  gender: "m", number: "p" },
          { label: "ce matin",                   isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « ces gâteaux », repris par « les », est masculin pluriel.",
        explanation: "Le COD « ces gâteaux » (masculin pluriel, repris par « les ») est avant le verbe → « préparés »."
      },
      {
        sentence:     "Mes clés, je les ai ___ dans mon sac.",
        base:         "mis", answer: "mises",
        hasCodBefore: true,
        choices: [
          { label: "mes clés (→ les)",           isCorrect: true,  gender: "f", number: "p" },
          { label: "mon sac",                    isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: false }
        ],
        codHint:     "Le COD « mes clés », repris par « les », est féminin pluriel.",
        explanation: "Le COD « mes clés » (féminin pluriel, repris par « les ») est avant le verbe → « mises »."
      },

      /* ── C : COD après le verbe → pas d'accord ──────────────────────── */
      {
        sentence:     "J'ai ___ des fraises dans le jardin.",
        base:         "cueilli", answer: "cueilli",
        hasCodBefore: false,
        choices: [
          { label: "des fraises",                isCorrect: false },
          { label: "le jardin",                  isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Le COD « des fraises » est placé APRÈS le verbe → pas d'accord : « cueilli »."
      },
      {
        sentence:     "Nous avons ___ un beau château médiéval.",
        base:         "visité", answer: "visité",
        hasCodBefore: false,
        choices: [
          { label: "un beau château médiéval",   isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Le COD « un beau château médiéval » est après le verbe → pas d'accord : « visité »."
      },
      {
        sentence:     "Elle a ___ une lettre à ses parents.",
        base:         "envoyé", answer: "envoyé",
        hasCodBefore: false,
        choices: [
          { label: "une lettre",                 isCorrect: false },
          { label: "ses parents",                isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Le COD « une lettre » est après le verbe → pas d'accord : « envoyé »."
      },
      {
        sentence:     "Les enfants ont ___ leurs jouets avant le dîner.",
        base:         "rangé", answer: "rangé",
        hasCodBefore: false,
        choices: [
          { label: "leurs jouets",               isCorrect: false },
          { label: "le dîner",                   isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Le COD « leurs jouets » est placé après le verbe → pas d'accord : « rangé »."
      },

      /* ── C : verbe sans COD → pas d'accord ─────────────────────────── */
      {
        sentence:     "Nous avons ___ toute la journée.",
        base:         "ri", answer: "ri",
        hasCodBefore: false,
        choices: [
          { label: "la journée",                 isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Il n'y a pas de COD → le participe passé ne s'accorde pas : « ri »."
      },
      {
        sentence:     "Elle a ___ très tard cette nuit-là.",
        base:         "dormi", answer: "dormi",
        hasCodBefore: false,
        choices: [
          { label: "cette nuit-là",              isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Il n'y a pas de COD → le participe passé ne s'accorde pas : « dormi »."
      },
      {
        sentence:     "Ils ont ___ pendant toute la récréation.",
        base:         "couru", answer: "couru",
        hasCodBefore: false,
        choices: [
          { label: "la récréation",              isCorrect: false },
          { label: "Pas de COD avant le verbe",  isCorrect: true }
        ],
        codHint:     "",
        explanation: "Il n'y a pas de COD → le participe passé ne s'accorde pas : « couru »."
      }

    ]
  },

  /* ── Vocabulaire bilingue : La Révolution française ─────────────────────── */
  "vocabulaire-revolution-francaise": {
    title: "Vocabulaire de la Révolution française",
    levels: ["CM1"],
    type: "vocabu-bilingue",
    backLink: { href: "histoire.html", label: "Histoire EMILE" },

    vocabulaire: [
      { anglais: "French Revolution",                 francais: "Révolution française" },
      { anglais: "King",                              francais: "Roi" },
      { anglais: "Queen",                             francais: "Reine" },
      { anglais: "People",                            francais: "Peuple" },
      { anglais: "Citizens",                          francais: "Citoyens" },
      { anglais: "Nobles",                            francais: "Nobles" },
      { anglais: "Clergy",                            francais: "Clergé" },
      { anglais: "Third Estate",                      francais: "Tiers État" },
      { anglais: "Taxes",                             francais: "Impôts" },
      { anglais: "Bread",                             francais: "Pain" },
      { anglais: "Hunger",                            francais: "Faim" },
      { anglais: "Poverty",                           francais: "Pauvreté" },
      { anglais: "Liberty",                           francais: "Liberté" },
      { anglais: "Equality",                          francais: "Égalité" },
      { anglais: "Fraternity",                        francais: "Fraternité" },
      { anglais: "Rights",                            francais: "Droits" },
      { anglais: "Revolution",                        francais: "Révolution" },
      { anglais: "Protest",                           francais: "Manifestation" },
      { anglais: "Rebellion",                         francais: "Révolte" },
      { anglais: "Army",                              francais: "Armée" },
      { anglais: "Bastille",                          francais: "Bastille" },
      { anglais: "Prison",                            francais: "Prison" },
      { anglais: "Flag",                              francais: "Drapeau" },
      { anglais: "National Assembly",                 francais: "Assemblée nationale" },
      { anglais: "Declaration of the Rights of Man",  francais: "Déclaration des droits de l'homme" },
      { anglais: "Constitution",                      francais: "Constitution" },
      { anglais: "Republic",                          francais: "République" },
      { anglais: "Monarchy",                          francais: "Monarchie" },
      { anglais: "Guillotine",                        francais: "Guillotine" },
      { anglais: "Justice",                           francais: "Justice" }
    ]
  },

  /* ── Vocabulaire bilingue : Napoléon Bonaparte ────────────────────────── */
  "vocabulaire-napoleon-bonaparte": {
    title: "Vocabulaire — Napoléon Bonaparte",
    levels: ["CM2"],
    type: "vocabu-bilingue",
    backLink: { href: "histoire.html", label: "Histoire EMILE" },

    vocabulaire: [
      { anglais: "Emperor",              francais: "Empereur" },
      { anglais: "Army",                 francais: "Armée" },
      { anglais: "Soldier",              francais: "Soldat" },
      { anglais: "Battle",               francais: "Bataille" },
      { anglais: "War",                  francais: "Guerre" },
      { anglais: "Victory",              francais: "Victoire" },
      { anglais: "Defeat",               francais: "Défaite" },
      { anglais: "Corsica",              francais: "Corse" },
      { anglais: "Island",               francais: "Île" },
      { anglais: "Military school",      francais: "École militaire" },
      { anglais: "Power",                francais: "Pouvoir" },
      { anglais: "French Revolution",    francais: "Révolution française" },
      { anglais: "Coronation",           francais: "Couronnement" },
      { anglais: "Crown",                francais: "Couronne" },
      { anglais: "Throne",               francais: "Trône" },
      { anglais: "Civil Code",           francais: "Code civil" },
      { anglais: "Law",                  francais: "Loi" },
      { anglais: "Conquest",             francais: "Conquête" },
      { anglais: "Enemy",                francais: "Ennemi" },
      { anglais: "Leader",               francais: "Chef" },
      { anglais: "Death",                francais: "Mort" }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     conjuguer-faire  —  3 niveaux progressifs (CM1 / CM2 / 6e)
     Type custom : "faire-niveaux"
     Les pools sont mélangés (Fisher-Yates) à chaque tentative.
     ══════════════════════════════════════════════════════════════════════════ */
  "conjuguer-faire": {
    title: "Conjuguer le verbe FAIRE",
    verb: "faire",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×4) + Imparfait (×4) + Futur simple (×4) + Passé composé (×4) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ du vélo le week-end.",          temps: "Présent",       reponse: "fais",       explication: "Au présent, « je » → je fais." },
        { phrase: "Tu ___ beaucoup de bruit.",            temps: "Présent",       reponse: "fais",       explication: "Au présent, « tu » → tu fais." },
        { phrase: "Il ___ ses devoirs chaque soir.",      temps: "Présent",       reponse: "fait",       explication: "Au présent, « il » → il fait." },
        { phrase: "Nous ___ une promenade ensemble.",     temps: "Présent",       reponse: "faisons",    explication: "Au présent, « nous » → nous faisons." },
        { phrase: "Vous ___ de la peinture en classe.",   temps: "Présent",       reponse: "faites",     explication: "Au présent, « vous » → vous faites." },
        { phrase: "Ils ___ la cuisine ce soir.",          temps: "Présent",       reponse: "font",       explication: "Au présent, « ils » → ils font." },
        { phrase: "Elle ___ du sport le matin.",          temps: "Présent",       reponse: "fait",       explication: "Au présent, « elle » → elle fait." },
        { phrase: "Elles ___ de leur mieux.",             temps: "Présent",       reponse: "font",       explication: "Au présent, « elles » → elles font." },
        /* Imparfait */
        { phrase: "Je ___ du vélo tous les jours.",       temps: "Imparfait",     reponse: "faisais",    explication: "À l'imparfait, « je » → je faisais." },
        { phrase: "Tu ___ beaucoup de bruit avant.",      temps: "Imparfait",     reponse: "faisais",    explication: "À l'imparfait, « tu » → tu faisais." },
        { phrase: "Nous ___ du bruit hier soir.",         temps: "Imparfait",     reponse: "faisions",   explication: "À l'imparfait, « nous » → nous faisions." },
        { phrase: "Elle ___ la cuisine tous les soirs.",  temps: "Imparfait",     reponse: "faisait",    explication: "À l'imparfait, « elle » → elle faisait." },
        { phrase: "Vous ___ du sport le matin.",          temps: "Imparfait",     reponse: "faisiez",    explication: "À l'imparfait, « vous » → vous faisiez." },
        { phrase: "Ils ___ la fête chaque été.",          temps: "Imparfait",     reponse: "faisaient",  explication: "À l'imparfait, « ils » → ils faisaient." },
        /* Futur simple */
        { phrase: "Tu ___ tes devoirs ce soir.",          temps: "Futur simple",  reponse: "feras",      explication: "Au futur, « tu » → tu feras." },
        { phrase: "Je ___ de mon mieux pour réussir.",    temps: "Futur simple",  reponse: "ferai",      explication: "Au futur, « je » → je ferai." },
        { phrase: "Il ___ beau demain.",                  temps: "Futur simple",  reponse: "fera",       explication: "Au futur, « il » → il fera." },
        { phrase: "Nous ___ une sortie la semaine prochaine.", temps: "Futur simple", reponse: "ferons", explication: "Au futur, « nous » → nous ferons." },
        { phrase: "Vous ___ du bon travail.",             temps: "Futur simple",  reponse: "ferez",      explication: "Au futur, « vous » → vous ferez." },
        { phrase: "Ils ___ la fête après l'examen.",      temps: "Futur simple",  reponse: "feront",     explication: "Au futur, « ils » → ils feront." },
        /* Passé composé */
        { phrase: "Ils ___ une erreur.",                  temps: "Passé composé", reponse: "ont fait",   explication: "Au passé composé, « ils » → ils ont fait." },
        { phrase: "Elle ___ un long voyage.",             temps: "Passé composé", reponse: "a fait",     explication: "Au passé composé, « elle » → elle a fait." },
        { phrase: "Tu ___ du bon travail aujourd'hui.",   temps: "Passé composé", reponse: "as fait",    explication: "Au passé composé, « tu » → tu as fait." },
        { phrase: "Nous ___ nos bagages en vitesse.",     temps: "Passé composé", reponse: "avons fait", explication: "Au passé composé, « nous » → nous avons fait." },
        { phrase: "J'___ de mon mieux pour aider.",       temps: "Passé composé", reponse: "ai fait",    explication: "Au passé composé, « j' » → j'ai fait." },
        { phrase: "Vous ___ preuve de courage.",          temps: "Passé composé", reponse: "avez fait",  explication: "Au passé composé, « vous » → vous avez fait." }
      ],

      /* ── CM2 : Passé simple (×6) + Plus-que-parfait (×6) ── */
      "CM2": [
        /* Passé simple */
        { phrase: "Elle ___ un long voyage au printemps.", temps: "Passé simple",   reponse: "fit",        explication: "Au passé simple, « elle » → elle fit." },
        { phrase: "Ils ___ de gros efforts toute l'année.", temps: "Passé simple",  reponse: "firent",     explication: "Au passé simple, « ils » → ils firent." },
        { phrase: "Je ___ semblant de dormir.",            temps: "Passé simple",   reponse: "fis",        explication: "Au passé simple, « je » → je fis." },
        { phrase: "Il ___ un geste d'adieu de la main.",  temps: "Passé simple",   reponse: "fit",        explication: "Au passé simple, « il » → il fit." },
        { phrase: "Nous ___ de notre mieux ce jour-là.",  temps: "Passé simple",   reponse: "fîmes",      explication: "Au passé simple, « nous » → nous fîmes." },
        { phrase: "Vous ___ preuve d'un grand courage.",  temps: "Passé simple",   reponse: "fîtes",      explication: "Au passé simple, « vous » → vous fîtes." },
        { phrase: "Elles ___ leurs adieux à la gare.",    temps: "Passé simple",   reponse: "firent",     explication: "Au passé simple, « elles » → elles firent." },
        { phrase: "Tu ___ un beau dessin en classe.",     temps: "Passé simple",   reponse: "fis",        explication: "Au passé simple, « tu » → tu fis." },
        /* Plus-que-parfait */
        { phrase: "Nous ___ nos bagages avant le départ.", temps: "Plus-que-parfait", reponse: "avions fait",  explication: "Au plus-que-parfait, « nous » → nous avions fait." },
        { phrase: "Il ___ ses devoirs avant d'aller jouer.", temps: "Plus-que-parfait", reponse: "avait fait", explication: "Au plus-que-parfait, « il » → il avait fait." },
        { phrase: "Tu ___ une erreur sans t'en rendre compte.", temps: "Plus-que-parfait", reponse: "avais fait", explication: "Au plus-que-parfait, « tu » → tu avais fait." },
        { phrase: "Ils ___ la fête la veille de notre arrivée.", temps: "Plus-que-parfait", reponse: "avaient fait", explication: "Au plus-que-parfait, « ils » → ils avaient fait." },
        { phrase: "Vous ___ vos courses avant la tempête.", temps: "Plus-que-parfait", reponse: "aviez fait", explication: "Au plus-que-parfait, « vous » → vous aviez fait." },
        { phrase: "J'___ mes adieux avant de partir.",    temps: "Plus-que-parfait", reponse: "avais fait",   explication: "Au plus-que-parfait, « j' » → j'avais fait." },
        { phrase: "Elle ___ ses valises dès la veille.",  temps: "Plus-que-parfait", reponse: "avait fait",   explication: "Au plus-que-parfait, « elle » → elle avait fait." },
        { phrase: "Elles ___ leurs devoirs avant le dîner.", temps: "Plus-que-parfait", reponse: "avaient fait", explication: "Au plus-que-parfait, « elles » → elles avaient fait." }
      ],

      /* ── 6e : Impératif (×6) + Conditionnel (×6) ── */
      "6e": [
        /* Impératif */
        { phrase: "___ attention en traversant !",          temps: "Impératif", reponses: ["Fais","Faites"], explication: "À l'impératif : « Fais attention » (tu) ou « Faites attention » (vous)." },
        { phrase: "___ ton travail sérieusement.",          temps: "Impératif", reponse: "Fais",             explication: "« ton » indique tu → Fais ton travail." },
        { phrase: "___ de ton mieux pour réussir !",        temps: "Impératif", reponse: "Fais",             explication: "« ton » indique tu → Fais de ton mieux." },
        { phrase: "___ confiance à tes amis.",              temps: "Impératif", reponse: "Fais",             explication: "« tes » indique tu → Fais confiance." },
        { phrase: "___ vite les exercices de maths !",      temps: "Impératif", reponses: ["Fais","Faites"], explication: "À l'impératif : « Fais vite » (tu) ou « Faites vite » (vous)." },
        { phrase: "___ silence, s'il vous plaît !",         temps: "Impératif", reponse: "Faites",           explication: "« vous plaît » indique vous → Faites silence." },
        { phrase: "Ne ___ pas de bruit dans le couloir.",   temps: "Impératif", reponses: ["fais","faites"], explication: "À l'impératif négatif : « ne fais pas » (tu) ou « ne faites pas » (vous)." },
        { phrase: "Ne ___ pas semblant de ne pas savoir.",  temps: "Impératif", reponses: ["fais","faites"], explication: "À l'impératif négatif : « ne fais pas » (tu) ou « ne faites pas » (vous)." },
        /* Conditionnel */
        { phrase: "Il ___ beau demain, dit la météo.",      temps: "Conditionnel", reponse: "ferait",    explication: "Au conditionnel, « il » → il ferait." },
        { phrase: "Je ___ mieux avec davantage de temps.",  temps: "Conditionnel", reponse: "ferais",    explication: "Au conditionnel, « je » → je ferais." },
        { phrase: "Tu ___ cela pour moi, n'est-ce pas ?",  temps: "Conditionnel", reponse: "ferais",    explication: "Au conditionnel, « tu » → tu ferais." },
        { phrase: "Ils ___ la fête s'il venait nous voir.", temps: "Conditionnel", reponse: "feraient",  explication: "Au conditionnel, « ils » → ils feraient." },
        { phrase: "Nous ___ une erreur en partant si tôt.", temps: "Conditionnel", reponse: "ferions",   explication: "Au conditionnel, « nous » → nous ferions." },
        { phrase: "Vous ___ mieux de vous reposer avant.", temps: "Conditionnel", reponse: "feriez",    explication: "Au conditionnel, « vous » → vous feriez." },
        { phrase: "Elle ___ volontiers ce voyage.",         temps: "Conditionnel", reponse: "ferait",    explication: "Au conditionnel, « elle » → elle ferait." },
        { phrase: "Elles ___ des merveilles avec de l'aide.", temps: "Conditionnel", reponse: "feraient", explication: "Au conditionnel, « elles » → elles feraient." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER ALLER  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Impératif + Conditionnel
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-aller": {
    title: "Conjuguer le verbe ALLER",
    verb: "aller",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ à l'école à pied chaque matin.",        temps: "Présent",       reponse: "vais",         explication: "Au présent, « je » → je vais (verbe irrégulier)." },
        { phrase: "Tu ___ au parc après les cours.",               temps: "Présent",       reponse: "vas",          explication: "Au présent, « tu » → tu vas (verbe irrégulier)." },
        { phrase: "Il ___ chez son ami le samedi.",                temps: "Présent",       reponse: "va",           explication: "Au présent, « il » → il va (verbe irrégulier)." },
        { phrase: "Elle ___ à la piscine tous les jeudis.",        temps: "Présent",       reponse: "va",           explication: "Au présent, « elle » → elle va (verbe irrégulier)." },
        { phrase: "Nous ___ au cinéma ce soir.",                   temps: "Présent",       reponse: "allons",       explication: "Au présent, « nous » → nous allons." },
        { phrase: "Vous ___ à la médiathèque cet après-midi.",     temps: "Présent",       reponse: "allez",        explication: "Au présent, « vous » → vous allez." },
        { phrase: "Ils ___ au marché le samedi matin.",            temps: "Présent",       reponse: "vont",         explication: "Au présent, « ils » → ils vont (verbe irrégulier)." },
        { phrase: "Elles ___ en vacances demain.",                 temps: "Présent",       reponse: "vont",         explication: "Au présent, « elles » → elles vont (verbe irrégulier)." },

        /* Imparfait */
        { phrase: "J'___ à l'école à pied quand j'étais petit.",  temps: "Imparfait",     reponse: "allais",       explication: "À l'imparfait, « j' » → j'allais." },
        { phrase: "Tu ___ chez ta grand-mère chaque dimanche.",    temps: "Imparfait",     reponse: "allais",       explication: "À l'imparfait, « tu » → tu allais." },
        { phrase: "Elle ___ à la piscine tous les jeudis.",        temps: "Imparfait",     reponse: "allait",       explication: "À l'imparfait, « elle » → elle allait." },
        { phrase: "Nous ___ au marché le dimanche matin.",         temps: "Imparfait",     reponse: "allions",      explication: "À l'imparfait, « nous » → nous allions." },
        { phrase: "Vous ___ au parc après l'école.",               temps: "Imparfait",     reponse: "alliez",       explication: "À l'imparfait, « vous » → vous alliez." },
        { phrase: "Ils ___ au stade chaque samedi.",               temps: "Imparfait",     reponse: "allaient",     explication: "À l'imparfait, « ils » → ils allaient." },

        /* Futur simple */
        { phrase: "J'___ à la mer cet été.",                      temps: "Futur simple",  reponse: "irai",         explication: "Au futur, « j' » → j'irai (radical irrégulier « ir- »)." },
        { phrase: "Tu ___ chez mamie le week-end prochain.",       temps: "Futur simple",  reponse: "iras",         explication: "Au futur, « tu » → tu iras (radical irrégulier « ir- »)." },
        { phrase: "Elle ___ mieux après quelques jours de repos.", temps: "Futur simple",  reponse: "ira",          explication: "Au futur, « elle » → elle ira (radical irrégulier « ir- »)." },
        { phrase: "Nous ___ au musée vendredi.",                   temps: "Futur simple",  reponse: "irons",        explication: "Au futur, « nous » → nous irons (radical irrégulier « ir- »)." },
        { phrase: "Vous ___ en voyage cet été.",                   temps: "Futur simple",  reponse: "irez",         explication: "Au futur, « vous » → vous irez (radical irrégulier « ir- »)." },
        { phrase: "Ils ___ au stade dimanche.",                    temps: "Futur simple",  reponse: "iront",        explication: "Au futur, « ils » → ils iront (radical irrégulier « ir- »)." },

        /* Passé composé (auxiliaire être → accord du participe) */
        { phrase: "Il ___ au parc hier après-midi.",               temps: "Passé composé", reponse: "est allé",     explication: "Au passé composé, aller se conjugue avec être : il est allé." },
        { phrase: "Elle ___ à la bibliothèque hier soir.",         temps: "Passé composé", reponse: "est allée",    explication: "Au passé composé, aller se conjugue avec être : elle est allée (accord)." },
        { phrase: "Nous ___ au cinéma samedi dernier.",            temps: "Passé composé", reponse: "sommes allés", explication: "Au passé composé, aller se conjugue avec être : nous sommes allés." },
        { phrase: "Ils ___ au stade hier soir.",                   temps: "Passé composé", reponse: "sont allés",   explication: "Au passé composé, aller se conjugue avec être : ils sont allés." },
        { phrase: "Elles ___ à la piscine la semaine dernière.",   temps: "Passé composé", reponse: "sont allées",  explication: "Au passé composé, aller se conjugue avec être : elles sont allées (accord)." },
        { phrase: "Je ___ chez mon ami hier après l'école.",       temps: "Passé composé", reponses: ["suis allé", "suis allée"], explication: "Au passé composé, aller se conjugue avec être : je suis allé(e) selon le genre." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple */
        { phrase: "Il ___ chercher de l'aide au village.",                    temps: "Passé simple",      reponse: "alla",         explication: "Au passé simple, « il » → il alla." },
        { phrase: "Elle ___ se réfugier dans la forêt.",                      temps: "Passé simple",      reponse: "alla",         explication: "Au passé simple, « elle » → elle alla." },
        { phrase: "J'___ voir le directeur ce matin-là.",                     temps: "Passé simple",      reponse: "allai",        explication: "Au passé simple, « j' » → j'allai." },
        { phrase: "Tu ___ à la bibliothèque après l'école.",                  temps: "Passé simple",      reponse: "allas",        explication: "Au passé simple, « tu » → tu allas." },
        { phrase: "Nous ___ au château dès l'aube.",                          temps: "Passé simple",      reponse: "allâmes",      explication: "Au passé simple, « nous » → nous allâmes (accent circonflexe)." },
        { phrase: "Vous ___ au bout du chemin sans vous retourner.",          temps: "Passé simple",      reponse: "allâtes",      explication: "Au passé simple, « vous » → vous allâtes (accent circonflexe)." },
        { phrase: "Ils ___ au marché de bonne heure.",                        temps: "Passé simple",      reponse: "allèrent",     explication: "Au passé simple, « ils » → ils allèrent." },
        { phrase: "Elles ___ chercher de l'eau à la fontaine.",               temps: "Passé simple",      reponse: "allèrent",     explication: "Au passé simple, « elles » → elles allèrent." },

        /* Plus-que-parfait */
        { phrase: "Il ___ chercher les clés avant de partir.",                temps: "Plus-que-parfait",  reponse: "était allé",   explication: "Au plus-que-parfait, « il » → il était allé (être à l'imparfait + participe)." },
        { phrase: "Elle ___ à la plage la veille.",                           temps: "Plus-que-parfait",  reponse: "était allée",  explication: "Au plus-que-parfait, « elle » → elle était allée (accord du participe)." },
        { phrase: "Nous ___ au cinéma avant l'orage.",                        temps: "Plus-que-parfait",  reponse: "étions allés", explication: "Au plus-que-parfait, « nous » → nous étions allés." },
        { phrase: "Vous ___ faire les courses avant la fermeture.",           temps: "Plus-que-parfait",  reponse: "étiez allés",  explication: "Au plus-que-parfait, « vous » → vous étiez allés." },
        { phrase: "Ils ___ à l'école avant tout le monde.",                   temps: "Plus-que-parfait",  reponse: "étaient allés", explication: "Au plus-que-parfait, « ils » → ils étaient allés." },
        { phrase: "Elles ___ chercher de l'aide au village.",                 temps: "Plus-que-parfait",  reponse: "étaient allées", explication: "Au plus-que-parfait, « elles » → elles étaient allées (accord)." },
        { phrase: "Je ___ rendre visite à mon oncle avant les vacances.",     temps: "Plus-que-parfait",  reponses: ["étais allé", "étais allée"], explication: "Au plus-que-parfait, je → j'étais allé(e) selon le genre." },
        { phrase: "Tu ___ à la pharmacie ce matin-là.",                       temps: "Plus-que-parfait",  reponses: ["étais allé", "étais allée"], explication: "Au plus-que-parfait, « tu » → tu étais allé(e) selon le genre." }
      ],

      /* ── 6e : Impératif (×8) + Conditionnel (×8) ── */
      "6e": [
        /* Impératif */
        { phrase: "___ vite te coucher, il est tard !",              temps: "Impératif", reponse: "Va",                        explication: "À l'impératif, « te » indique « tu » : Va ! (sans -s, c'est une exception)." },
        { phrase: "___ chercher ton cartable dans ta chambre !",     temps: "Impératif", reponse: "Va",                        explication: "À l'impératif, « ton » indique « tu » : Va ! (pas de -s)." },
        { phrase: "___ à votre place maintenant !",                  temps: "Impératif", reponse: "Allez",                     explication: "À l'impératif, « votre » indique « vous » : Allez !" },
        { phrase: "___ jouer dehors avec tes amis !",                temps: "Impératif", reponse: "Va",                        explication: "À l'impératif, « tes » indique « tu » : Va ! (pas de -s)." },
        { phrase: "___ tous ensemble au tableau !",                  temps: "Impératif", reponse: "Allons",                    explication: "À l'impératif pour « nous » : Allons ! (on invite le groupe à agir)." },
        { phrase: "___ voir le directeur tout de suite !",           temps: "Impératif", reponses: ["Va", "Allez"],            explication: "À l'impératif : Va (tu) ou Allez (vous) selon la personne." },
        { phrase: "N'___ pas là-bas, c'est dangereux !",            temps: "Impératif", reponses: ["va", "allez"],            explication: "À l'impératif négatif : ne va pas (tu) ou n'allez pas (vous)." },
        { phrase: "___, on va rater le bus !",                       temps: "Impératif", reponses: ["Va", "Allez"],            explication: "À l'impératif : Va (tu) ou Allez (vous) selon la personne." },

        /* Conditionnel */
        { phrase: "Je ___ bien au cinéma ce soir.",                  temps: "Conditionnel", reponse: "irais",    explication: "Au conditionnel, « je » → j'irais (radical irrégulier « ir- »)." },
        { phrase: "Tu ___ plus vite avec un bon vélo.",              temps: "Conditionnel", reponse: "irais",    explication: "Au conditionnel, « tu » → tu irais (radical irrégulier « ir- »)." },
        { phrase: "Il ___ mieux avec quelques jours de repos.",      temps: "Conditionnel", reponse: "irait",    explication: "Au conditionnel, « il » → il irait (radical irrégulier « ir- »)." },
        { phrase: "Elle ___ bien voir ses amis ce week-end.",        temps: "Conditionnel", reponse: "irait",    explication: "Au conditionnel, « elle » → elle irait (radical irrégulier « ir- »)." },
        { phrase: "Nous ___ volontiers à la mer si c'était possible.", temps: "Conditionnel", reponse: "irions", explication: "Au conditionnel, « nous » → nous irions (radical irrégulier « ir- »)." },
        { phrase: "Vous ___ plus vite par l'autoroute.",             temps: "Conditionnel", reponse: "iriez",    explication: "Au conditionnel, « vous » → vous iriez (radical irrégulier « ir- »)." },
        { phrase: "Ils ___ bien en vacances ensemble.",              temps: "Conditionnel", reponse: "iraient",  explication: "Au conditionnel, « ils » → ils iraient (radical irrégulier « ir- »)." },
        { phrase: "Elles ___ volontiers à Paris pour le week-end.",  temps: "Conditionnel", reponse: "iraient",  explication: "Au conditionnel, « elles » → elles iraient (radical irrégulier « ir- »)." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER DIRE  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Impératif + Conditionnel
     Irrégularités clés : vous dites (pas disez), passé simple
     je/tu/il = dis/dis/dit (homonymes du présent)
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-dire": {
    title: "Conjuguer le verbe DIRE",
    verb: "dire",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ toujours la vérité.",                       temps: "Présent",       reponse: "dis",       explication: "Au présent, « je » → je dis." },
        { phrase: "Tu ___ des bêtises parfois.",                      temps: "Présent",       reponse: "dis",       explication: "Au présent, « tu » → tu dis." },
        { phrase: "Il ___ bonjour à son voisin chaque matin.",        temps: "Présent",       reponse: "dit",       explication: "Au présent, « il » → il dit." },
        { phrase: "Elle ___ au revoir en partant.",                   temps: "Présent",       reponse: "dit",       explication: "Au présent, « elle » → elle dit." },
        { phrase: "Nous ___ les mots à voix haute.",                  temps: "Présent",       reponse: "disons",    explication: "Au présent, « nous » → nous disons." },
        { phrase: "Vous ___ des poèmes en classe.",                   temps: "Présent",       reponse: "dites",     explication: "Au présent, « vous » → vous dites (attention : pas « disez », c'est irrégulier !)." },
        { phrase: "Ils ___ des blagues pendant la récré.",            temps: "Présent",       reponse: "disent",    explication: "Au présent, « ils » → ils disent." },
        { phrase: "Elles ___ toujours la vérité.",                    temps: "Présent",       reponse: "disent",    explication: "Au présent, « elles » → elles disent." },

        /* Imparfait */
        { phrase: "Je ___ toujours bonjour à la maîtresse.",          temps: "Imparfait",     reponse: "disais",    explication: "À l'imparfait, « je » → je disais." },
        { phrase: "Tu ___ des mensonges quand tu étais petit.",       temps: "Imparfait",     reponse: "disais",    explication: "À l'imparfait, « tu » → tu disais." },
        { phrase: "Elle ___ des histoires à ses enfants le soir.",    temps: "Imparfait",     reponse: "disait",    explication: "À l'imparfait, « elle » → elle disait." },
        { phrase: "Nous ___ des poèmes chaque matin en classe.",      temps: "Imparfait",     reponse: "disions",   explication: "À l'imparfait, « nous » → nous disions." },
        { phrase: "Vous ___ toujours la vérité.",                     temps: "Imparfait",     reponse: "disiez",    explication: "À l'imparfait, « vous » → vous disiez." },
        { phrase: "Ils ___ des bêtises en classe.",                   temps: "Imparfait",     reponse: "disaient",  explication: "À l'imparfait, « ils » → ils disaient." },

        /* Futur simple */
        { phrase: "Je ___ la vérité quand ce sera le bon moment.",    temps: "Futur simple",  reponse: "dirai",     explication: "Au futur, « je » → je dirai." },
        { phrase: "Tu ___ au revoir avant de partir.",                temps: "Futur simple",  reponse: "diras",     explication: "Au futur, « tu » → tu diras." },
        { phrase: "Il ___ son discours devant toute la classe.",      temps: "Futur simple",  reponse: "dira",      explication: "Au futur, « il » → il dira." },
        { phrase: "Nous ___ ce que nous pensons.",                    temps: "Futur simple",  reponse: "dirons",    explication: "Au futur, « nous » → nous dirons." },
        { phrase: "Vous ___ vos mots de vocabulaire.",                temps: "Futur simple",  reponse: "direz",     explication: "Au futur, « vous » → vous direz." },
        { phrase: "Elles ___ des poèmes à la fête de l'école.",      temps: "Futur simple",  reponse: "diront",    explication: "Au futur, « elles » → elles diront." },

        /* Passé composé (auxiliaire avoir → pas d'accord) */
        { phrase: "J'___ bonjour à tout le monde en entrant.",        temps: "Passé composé", reponse: "ai dit",    explication: "Au passé composé, dire se conjugue avec avoir : j'ai dit." },
        { phrase: "Tu ___ la vérité, bravo !",                        temps: "Passé composé", reponse: "as dit",    explication: "Au passé composé, dire se conjugue avec avoir : tu as dit." },
        { phrase: "Il ___ qu'il reviendrait demain.",                 temps: "Passé composé", reponse: "a dit",     explication: "Au passé composé, dire se conjugue avec avoir : il a dit." },
        { phrase: "Nous ___ au revoir à nos amis.",                   temps: "Passé composé", reponse: "avons dit", explication: "Au passé composé, dire se conjugue avec avoir : nous avons dit." },
        { phrase: "Vous ___ vos mots de vocabulaire correctement.",   temps: "Passé composé", reponse: "avez dit",  explication: "Au passé composé, dire se conjugue avec avoir : vous avez dit." },
        { phrase: "Elles ___ la vérité à la maîtresse.",              temps: "Passé composé", reponse: "ont dit",   explication: "Au passé composé, dire se conjugue avec avoir : elles ont dit." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple  (attention : je/tu/il dis/dis/dit = homonymes du présent) */
        { phrase: "Il ___ au roi qu'il avait eu tort.",                temps: "Passé simple",     reponse: "dit",       explication: "Au passé simple, « il » → il dit (même forme que le présent, le contexte l'indique)." },
        { phrase: "Elle ___ au prince qu'elle partirait au lever du jour.", temps: "Passé simple", reponse: "dit",      explication: "Au passé simple, « elle » → elle dit." },
        { phrase: "Je ___ adieu à mes amis ce soir-là.",               temps: "Passé simple",     reponse: "dis",       explication: "Au passé simple, « je » → je dis (même forme que le présent)." },
        { phrase: "Tu ___ la vérité devant toute l'assemblée.",        temps: "Passé simple",     reponse: "dis",       explication: "Au passé simple, « tu » → tu dis." },
        { phrase: "Nous ___ notre vœu en soufflant les bougies.",      temps: "Passé simple",     reponse: "dîmes",     explication: "Au passé simple, « nous » → nous dîmes (avec accent circonflexe)." },
        { phrase: "Vous ___ des paroles que l'on ne peut oublier.",    temps: "Passé simple",     reponse: "dîtes",     explication: "Au passé simple, « vous » → vous dîtes (accent circonflexe, différent de l'impératif « dites »)." },
        { phrase: "Ils ___ la même chose au même moment.",             temps: "Passé simple",     reponse: "dirent",    explication: "Au passé simple, « ils » → ils dirent." },
        { phrase: "Elles ___ au revoir une dernière fois.",            temps: "Passé simple",     reponse: "dirent",    explication: "Au passé simple, « elles » → elles dirent." },

        /* Plus-que-parfait (avoir à l'imparfait + dit → pas d'accord) */
        { phrase: "Il ___ au roi ce qu'il pensait, bien avant l'audience.", temps: "Plus-que-parfait", reponse: "avait dit",   explication: "Au plus-que-parfait, « il » → il avait dit (avoir imparfait + dit)." },
        { phrase: "Elle ___ au revoir la veille du départ.",           temps: "Plus-que-parfait", reponse: "avait dit",   explication: "Au plus-que-parfait, « elle » → elle avait dit." },
        { phrase: "J'___ la vérité bien avant qu'on me le demande.",   temps: "Plus-que-parfait", reponse: "avais dit",   explication: "Au plus-que-parfait, « j' » → j'avais dit." },
        { phrase: "Tu ___ que tu ne viendrais pas.",                   temps: "Plus-que-parfait", reponse: "avais dit",   explication: "Au plus-que-parfait, « tu » → tu avais dit." },
        { phrase: "Nous ___ nos prières avant de nous endormir.",      temps: "Plus-que-parfait", reponse: "avions dit",  explication: "Au plus-que-parfait, « nous » → nous avions dit." },
        { phrase: "Vous ___ au revoir avant de quitter la salle.",     temps: "Plus-que-parfait", reponse: "aviez dit",   explication: "Au plus-que-parfait, « vous » → vous aviez dit." },
        { phrase: "Ils ___ les mêmes mots que nous.",                  temps: "Plus-que-parfait", reponse: "avaient dit", explication: "Au plus-que-parfait, « ils » → ils avaient dit." },
        { phrase: "Elles ___ la même chose hier matin.",               temps: "Plus-que-parfait", reponse: "avaient dit", explication: "Au plus-que-parfait, « elles » → elles avaient dit." }
      ],

      /* ── 6e : Impératif (×8) + Conditionnel (×8) ── */
      "6e": [
        /* Impératif : dis (tu) / disons (nous) / dites (vous — irrégulier, pas disez) */
        { phrase: "___ bonjour à ta maîtresse !",                      temps: "Impératif", reponse: "Dis",                        explication: "À l'impératif avec « ta », c'est « tu » : Dis !" },
        { phrase: "___ la vérité à tes parents !",                     temps: "Impératif", reponse: "Dis",                        explication: "À l'impératif avec « tes », c'est « tu » : Dis !" },
        { phrase: "___ au revoir à ton ami avant de partir !",         temps: "Impératif", reponse: "Dis",                        explication: "À l'impératif avec « ton », c'est « tu » : Dis !" },
        { phrase: "___ vos mots de vocabulaire à voix haute !",        temps: "Impératif", reponse: "Dites",                      explication: "À l'impératif avec « vos », c'est « vous » : Dites ! (pas « disez », c'est irrégulier)." },
        { phrase: "___ à votre professeur ce que vous avez compris !", temps: "Impératif", reponse: "Dites",                      explication: "À l'impératif avec « votre », c'est « vous » : Dites ! (irrégulier)." },
        { phrase: "___ nos poèmes ensemble !",                         temps: "Impératif", reponse: "Disons",                     explication: "À l'impératif pour « nous » : Disons ! (on invite le groupe à agir)." },
        { phrase: "___ la vérité !",                                   temps: "Impératif", reponses: ["Dis", "Disons", "Dites"],  explication: "À l'impératif : Dis (tu), Disons (nous) ou Dites (vous) selon la personne." },
        { phrase: "N'___ pas de mensonges !",                         temps: "Impératif", reponses: ["dis", "disons", "dites"],  explication: "À l'impératif négatif : ne dis pas, ne disons pas ou ne dites pas selon la personne." },

        /* Conditionnel */
        { phrase: "Je ___ bien quelques mots si on me le demandait.",  temps: "Conditionnel", reponse: "dirais",   explication: "Au conditionnel, « je » → je dirais." },
        { phrase: "Tu ___ la même chose à ma place.",                  temps: "Conditionnel", reponse: "dirais",   explication: "Au conditionnel, « tu » → tu dirais." },
        { phrase: "Il ___ oui si tu lui posais la question.",          temps: "Conditionnel", reponse: "dirait",   explication: "Au conditionnel, « il » → il dirait." },
        { phrase: "Elle ___ volontiers la vérité.",                    temps: "Conditionnel", reponse: "dirait",   explication: "Au conditionnel, « elle » → elle dirait." },
        { phrase: "Nous ___ la même chose à votre place.",             temps: "Conditionnel", reponse: "dirions",  explication: "Au conditionnel, « nous » → nous dirions." },
        { phrase: "Vous ___ le contraire si vous saviez la vérité.",  temps: "Conditionnel", reponse: "diriez",   explication: "Au conditionnel, « vous » → vous diriez." },
        { phrase: "Ils ___ qu'ils ont raison.",                        temps: "Conditionnel", reponse: "diraient", explication: "Au conditionnel, « ils » → ils diraient." },
        { phrase: "Elles ___ au revoir sans hésiter.",                 temps: "Conditionnel", reponse: "diraient", explication: "Au conditionnel, « elles » → elles diraient." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER VENIR  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Impératif + Conditionnel
     Irrégularités clés : présent (viens/viennent), radical
     « viendr- » au futur et conditionnel, auxiliaire ÊTRE
     au passé composé et plus-que-parfait (accord participe)
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-venir": {
    title: "Conjuguer le verbe VENIR",
    verb: "venir",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ te voir ce soir.",                           temps: "Présent",       reponse: "viens",     explication: "Au présent, « je » → je viens (verbe irrégulier)." },
        { phrase: "Tu ___ jouer avec nous ?",                          temps: "Présent",       reponse: "viens",     explication: "Au présent, « tu » → tu viens (verbe irrégulier)." },
        { phrase: "Il ___ à l'école en vélo chaque matin.",           temps: "Présent",       reponse: "vient",     explication: "Au présent, « il » → il vient (verbe irrégulier)." },
        { phrase: "Elle ___ d'Espagne.",                               temps: "Présent",       reponse: "vient",     explication: "Au présent, « elle » → elle vient (verbe irrégulier)." },
        { phrase: "Nous ___ te rendre visite.",                        temps: "Présent",       reponse: "venons",    explication: "Au présent, « nous » → nous venons." },
        { phrase: "Vous ___ à la fête ce soir ?",                     temps: "Présent",       reponse: "venez",     explication: "Au présent, « vous » → vous venez." },
        { phrase: "Ils ___ me voir chaque semaine.",                   temps: "Présent",       reponse: "viennent",  explication: "Au présent, « ils » → ils viennent (attention au double n)." },
        { phrase: "Elles ___ de terminer l'exercice.",                 temps: "Présent",       reponse: "viennent",  explication: "Au présent, « elles » → elles viennent (attention au double n)." },

        /* Imparfait */
        { phrase: "Je ___ à l'école à pied quand j'étais petit.",     temps: "Imparfait",     reponse: "venais",    explication: "À l'imparfait, « je » → je venais." },
        { phrase: "Tu ___ me voir chaque dimanche.",                   temps: "Imparfait",     reponse: "venais",    explication: "À l'imparfait, « tu » → tu venais." },
        { phrase: "Elle ___ nous rendre visite chaque été.",           temps: "Imparfait",     reponse: "venait",    explication: "À l'imparfait, « elle » → elle venait." },
        { phrase: "Nous ___ à la piscine ensemble le jeudi.",         temps: "Imparfait",     reponse: "venions",   explication: "À l'imparfait, « nous » → nous venions." },
        { phrase: "Vous ___ toujours en retard.",                      temps: "Imparfait",     reponse: "veniez",    explication: "À l'imparfait, « vous » → vous veniez." },
        { phrase: "Ils ___ de loin pour assister à la fête.",         temps: "Imparfait",     reponse: "venaient",  explication: "À l'imparfait, « ils » → ils venaient." },

        /* Futur simple (radical irrégulier « viendr- ») */
        { phrase: "Je ___ te voir demain matin.",                      temps: "Futur simple",  reponse: "viendrai",  explication: "Au futur, « je » → je viendrai (radical irrégulier « viendr- »)." },
        { phrase: "Tu ___ avec nous au musée ?",                       temps: "Futur simple",  reponse: "viendras",  explication: "Au futur, « tu » → tu viendras (radical irrégulier « viendr- »)." },
        { phrase: "Elle ___ nous rejoindre plus tard.",                temps: "Futur simple",  reponse: "viendra",   explication: "Au futur, « elle » → elle viendra (radical irrégulier « viendr- »)." },
        { phrase: "Nous ___ te chercher à la gare.",                   temps: "Futur simple",  reponse: "viendrons", explication: "Au futur, « nous » → nous viendrons (radical irrégulier « viendr- »)." },
        { phrase: "Vous ___ à la réunion de parents ?",               temps: "Futur simple",  reponse: "viendrez",  explication: "Au futur, « vous » → vous viendrez (radical irrégulier « viendr- »)." },
        { phrase: "Ils ___ nous rendre visite cet été.",              temps: "Futur simple",  reponse: "viendront", explication: "Au futur, « ils » → ils viendront (radical irrégulier « viendr- »)." },

        /* Passé composé (auxiliaire être → accord du participe) */
        { phrase: "Il ___ me voir hier après-midi.",                   temps: "Passé composé", reponse: "est venu",     explication: "Au passé composé, venir se conjugue avec être : il est venu." },
        { phrase: "Elle ___ à la fête hier soir.",                     temps: "Passé composé", reponse: "est venue",    explication: "Au passé composé, venir se conjugue avec être : elle est venue (accord)." },
        { phrase: "Nous ___ à l'école à pied ce matin.",              temps: "Passé composé", reponse: "sommes venus", explication: "Au passé composé, venir se conjugue avec être : nous sommes venus." },
        { phrase: "Ils ___ me rendre visite la semaine dernière.",    temps: "Passé composé", reponse: "sont venus",   explication: "Au passé composé, venir se conjugue avec être : ils sont venus." },
        { phrase: "Elles ___ assister à la représentation.",          temps: "Passé composé", reponse: "sont venues",  explication: "Au passé composé, venir se conjugue avec être : elles sont venues (accord)." },
        { phrase: "Je ___ te voir hier après les cours.",              temps: "Passé composé", reponses: ["suis venu", "suis venue"], explication: "Au passé composé, venir se conjugue avec être : je suis venu(e) selon le genre." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple */
        { phrase: "Il ___ me voir un beau matin d'hiver.",            temps: "Passé simple",     reponse: "vint",      explication: "Au passé simple, « il » → il vint." },
        { phrase: "Elle ___ frapper à ma porte à l'aube.",            temps: "Passé simple",     reponse: "vint",      explication: "Au passé simple, « elle » → elle vint." },
        { phrase: "Je ___ à bout de mes efforts ce jour-là.",         temps: "Passé simple",     reponse: "vins",      explication: "Au passé simple, « je » → je vins." },
        { phrase: "Tu ___ me rejoindre au bord du lac.",              temps: "Passé simple",     reponse: "vins",      explication: "Au passé simple, « tu » → tu vins." },
        { phrase: "Nous ___ à bout de toutes les épreuves.",          temps: "Passé simple",     reponse: "vînmes",    explication: "Au passé simple, « nous » → nous vînmes (avec accent circonflexe)." },
        { phrase: "Vous ___ enfin nous voir après tant d'années.",    temps: "Passé simple",     reponse: "vîntes",    explication: "Au passé simple, « vous » → vous vîntes (avec accent circonflexe)." },
        { phrase: "Ils ___ de très loin pour assister à la cérémonie.", temps: "Passé simple",   reponse: "vinrent",   explication: "Au passé simple, « ils » → ils vinrent." },
        { phrase: "Elles ___ toutes ensemble ce même jour.",           temps: "Passé simple",     reponse: "vinrent",   explication: "Au passé simple, « elles » → elles vinrent." },

        /* Plus-que-parfait (être à l'imparfait + venu → accord) */
        { phrase: "Il ___ me voir avant mon départ.",                  temps: "Plus-que-parfait", reponse: "était venu",   explication: "Au plus-que-parfait, « il » → il était venu (être imparfait + participe)." },
        { phrase: "Elle ___ à la réunion la veille.",                  temps: "Plus-que-parfait", reponse: "était venue",  explication: "Au plus-que-parfait, « elle » → elle était venue (accord du participe)." },
        { phrase: "Nous ___ à bout de nos peines avant l'hiver.",     temps: "Plus-que-parfait", reponse: "étions venus", explication: "Au plus-que-parfait, « nous » → nous étions venus." },
        { phrase: "Vous ___ nous rendre visite avant les vacances.",  temps: "Plus-que-parfait", reponse: "étiez venus",  explication: "Au plus-que-parfait, « vous » → vous étiez venus." },
        { phrase: "Ils ___ de très loin pour cette occasion.",        temps: "Plus-que-parfait", reponse: "étaient venus",  explication: "Au plus-que-parfait, « ils » → ils étaient venus." },
        { phrase: "Elles ___ chercher leur prix le matin.",            temps: "Plus-que-parfait", reponse: "étaient venues", explication: "Au plus-que-parfait, « elles » → elles étaient venues (accord)." },
        { phrase: "Je ___ te voir avant que tu partes.",               temps: "Plus-que-parfait", reponses: ["étais venu", "étais venue"], explication: "Au plus-que-parfait, je → j'étais venu(e) (être imparfait + participe, accord selon le genre)." },
        { phrase: "Tu ___ me rejoindre avant la tombée de la nuit.",  temps: "Plus-que-parfait", reponses: ["étais venu", "étais venue"], explication: "Au plus-que-parfait, « tu » → tu étais venu(e) selon le genre." }
      ],

      /* ── 6e : Impératif (×8) + Conditionnel (×8) ── */
      "6e": [
        /* Impératif : viens (tu) / venons (nous) / venez (vous) */
        { phrase: "___ chercher ton cartable !",                       temps: "Impératif", reponse: "Viens",                      explication: "À l'impératif avec « ton », c'est « tu » : Viens !" },
        { phrase: "___ goûter ces gâteaux avec tes amis !",           temps: "Impératif", reponse: "Viens",                      explication: "À l'impératif avec « tes », c'est « tu » : Viens !" },
        { phrase: "___ à votre place maintenant !",                    temps: "Impératif", reponse: "Venez",                      explication: "À l'impératif avec « votre », c'est « vous » : Venez !" },
        { phrase: "___ voir ce que vous avez réalisé !",              temps: "Impératif", reponse: "Venez",                      explication: "À l'impératif avec « vous », c'est « vous » : Venez !" },
        { phrase: "___ tous ensemble applaudir les artistes !",        temps: "Impératif", reponse: "Venons",                     explication: "À l'impératif pour « nous » : Venons ! (on invite le groupe à agir)." },
        { phrase: "___ nous retrouver à la gare !",                    temps: "Impératif", reponses: ["Viens", "Venez"],          explication: "À l'impératif : Viens (tu) ou Venez (vous) selon la personne." },
        { phrase: "___ ! Le dîner est prêt.",                         temps: "Impératif", reponses: ["Viens", "Venez"],          explication: "À l'impératif : Viens (tu) ou Venez (vous) selon la personne." },
        { phrase: "N'___ pas sans prévenir !",                        temps: "Impératif", reponses: ["viens", "venez"],          explication: "À l'impératif négatif : ne viens pas (tu) ou ne venez pas (vous)." },

        /* Conditionnel (radical irrégulier « viendr- ») */
        { phrase: "Je ___ bien te voir si j'avais le temps.",         temps: "Conditionnel", reponse: "viendrais",  explication: "Au conditionnel, « je » → je viendrais (radical irrégulier « viendr- »)." },
        { phrase: "Tu ___ avec nous si tu pouvais ?",                 temps: "Conditionnel", reponse: "viendrais",  explication: "Au conditionnel, « tu » → tu viendrais (radical irrégulier « viendr- »)." },
        { phrase: "Il ___ nous aider s'il était disponible.",         temps: "Conditionnel", reponse: "viendrait",  explication: "Au conditionnel, « il » → il viendrait (radical irrégulier « viendr- »)." },
        { phrase: "Elle ___ volontiers à la fête.",                    temps: "Conditionnel", reponse: "viendrait",  explication: "Au conditionnel, « elle » → elle viendrait (radical irrégulier « viendr- »)." },
        { phrase: "Nous ___ te voir plus souvent si on habitait plus près.", temps: "Conditionnel", reponse: "viendrions", explication: "Au conditionnel, « nous » → nous viendrions (radical irrégulier « viendr- »)." },
        { phrase: "Vous ___ avec nous si on vous invitait ?",         temps: "Conditionnel", reponse: "viendriez",  explication: "Au conditionnel, « vous » → vous viendriez (radical irrégulier « viendr- »)." },
        { phrase: "Ils ___ nous rendre visite cet été s'ils pouvaient.", temps: "Conditionnel", reponse: "viendraient", explication: "Au conditionnel, « ils » → ils viendraient (radical irrégulier « viendr- »)." },
        { phrase: "Elles ___ volontiers si on les invitait.",         temps: "Conditionnel", reponse: "viendraient", explication: "Au conditionnel, « elles » → elles viendraient (radical irrégulier « viendr- »)." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER POUVOIR  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Conditionnel + Subjonctif présent
     Irrégularités clés : présent (peux/peut/peuvent),
     radical « pourr- » au futur et conditionnel,
     pas d'impératif → 6e = Conditionnel + Subjonctif présent
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-pouvoir": {
    title: "Conjuguer le verbe POUVOIR",
    verb: "pouvoir",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ t'aider si tu veux.",                        temps: "Présent",       reponse: "peux",       explication: "Au présent, « je » → je peux (verbe irrégulier)." },
        { phrase: "Tu ___ venir avec nous ?",                          temps: "Présent",       reponse: "peux",       explication: "Au présent, « tu » → tu peux (verbe irrégulier)." },
        { phrase: "Il ___ courir très vite.",                          temps: "Présent",       reponse: "peut",       explication: "Au présent, « il » → il peut (verbe irrégulier)." },
        { phrase: "Elle ___ chanter très bien.",                       temps: "Présent",       reponse: "peut",       explication: "Au présent, « elle » → elle peut (verbe irrégulier)." },
        { phrase: "Nous ___ travailler ensemble.",                     temps: "Présent",       reponse: "pouvons",    explication: "Au présent, « nous » → nous pouvons." },
        { phrase: "Vous ___ commencer quand vous voulez.",             temps: "Présent",       reponse: "pouvez",     explication: "Au présent, « vous » → vous pouvez." },
        { phrase: "Ils ___ jouer dehors maintenant.",                  temps: "Présent",       reponse: "peuvent",    explication: "Au présent, « ils » → ils peuvent (verbe irrégulier)." },
        { phrase: "Elles ___ terminer l'exercice.",                    temps: "Présent",       reponse: "peuvent",    explication: "Au présent, « elles » → elles peuvent (verbe irrégulier)." },

        /* Imparfait */
        { phrase: "Je ___ courir plus vite quand j'étais jeune.",     temps: "Imparfait",     reponse: "pouvais",    explication: "À l'imparfait, « je » → je pouvais." },
        { phrase: "Tu ___ rester plus longtemps autrefois.",           temps: "Imparfait",     reponse: "pouvais",    explication: "À l'imparfait, « tu » → tu pouvais." },
        { phrase: "Elle ___ nager très bien à cet âge.",              temps: "Imparfait",     reponse: "pouvait",    explication: "À l'imparfait, « elle » → elle pouvait." },
        { phrase: "Nous ___ sortir le week-end.",                      temps: "Imparfait",     reponse: "pouvions",   explication: "À l'imparfait, « nous » → nous pouvions." },
        { phrase: "Vous ___ parler plus fort.",                        temps: "Imparfait",     reponse: "pouviez",    explication: "À l'imparfait, « vous » → vous pouviez." },
        { phrase: "Ils ___ jouer dehors jusqu'à la nuit.",            temps: "Imparfait",     reponse: "pouvaient",  explication: "À l'imparfait, « ils » → ils pouvaient." },

        /* Futur simple (radical irrégulier « pourr- ») */
        { phrase: "Je ___ t'aider demain.",                            temps: "Futur simple",  reponse: "pourrai",    explication: "Au futur, « je » → je pourrai (radical irrégulier « pourr- »)." },
        { phrase: "Tu ___ venir avec nous le week-end prochain.",     temps: "Futur simple",  reponse: "pourras",    explication: "Au futur, « tu » → tu pourras (radical irrégulier « pourr- »)." },
        { phrase: "Elle ___ venir à la fête.",                        temps: "Futur simple",  reponse: "pourra",     explication: "Au futur, « elle » → elle pourra (radical irrégulier « pourr- »)." },
        { phrase: "Nous ___ commencer le projet lundi.",              temps: "Futur simple",  reponse: "pourrons",   explication: "Au futur, « nous » → nous pourrons (radical irrégulier « pourr- »)." },
        { phrase: "Vous ___ partir quand vous voulez.",               temps: "Futur simple",  reponse: "pourrez",    explication: "Au futur, « vous » → vous pourrez (radical irrégulier « pourr- »)." },
        { phrase: "Ils ___ jouer dans le jardin cet été.",            temps: "Futur simple",  reponse: "pourront",   explication: "Au futur, « ils » → ils pourront (radical irrégulier « pourr- »)." },

        /* Passé composé (auxiliaire avoir → pas d'accord) */
        { phrase: "J'___ terminer mon travail à temps.",              temps: "Passé composé", reponse: "ai pu",      explication: "Au passé composé, pouvoir se conjugue avec avoir : j'ai pu." },
        { phrase: "Tu ___ venir à la fête, super !",                  temps: "Passé composé", reponse: "as pu",      explication: "Au passé composé, pouvoir se conjugue avec avoir : tu as pu." },
        { phrase: "Il ___ courir malgré sa blessure.",                temps: "Passé composé", reponse: "a pu",       explication: "Au passé composé, pouvoir se conjugue avec avoir : il a pu." },
        { phrase: "Nous ___ finir avant la récréation.",              temps: "Passé composé", reponse: "avons pu",   explication: "Au passé composé, pouvoir se conjugue avec avoir : nous avons pu." },
        { phrase: "Vous ___ sortir malgré la pluie.",                 temps: "Passé composé", reponse: "avez pu",    explication: "Au passé composé, pouvoir se conjugue avec avoir : vous avez pu." },
        { phrase: "Elles ___ terminer leur exposé à temps.",          temps: "Passé composé", reponse: "ont pu",     explication: "Au passé composé, pouvoir se conjugue avec avoir : elles ont pu." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple */
        { phrase: "Il ___ enfin ouvrir la lourde porte.",             temps: "Passé simple",     reponse: "put",       explication: "Au passé simple, « il » → il put." },
        { phrase: "Elle ___ traverser la forêt seule.",               temps: "Passé simple",     reponse: "put",       explication: "Au passé simple, « elle » → elle put." },
        { phrase: "Je ___ soulever la pierre.",                        temps: "Passé simple",     reponse: "pus",       explication: "Au passé simple, « je » → je pus." },
        { phrase: "Tu ___ convaincre tout le monde.",                  temps: "Passé simple",     reponse: "pus",       explication: "Au passé simple, « tu » → tu pus." },
        { phrase: "Nous ___ arriver avant la nuit.",                   temps: "Passé simple",     reponse: "pûmes",     explication: "Au passé simple, « nous » → nous pûmes (avec accent circonflexe)." },
        { phrase: "Vous ___ trouver la sortie.",                       temps: "Passé simple",     reponse: "pûtes",     explication: "Au passé simple, « vous » → vous pûtes (avec accent circonflexe)." },
        { phrase: "Ils ___ résoudre le problème ensemble.",            temps: "Passé simple",     reponse: "purent",    explication: "Au passé simple, « ils » → ils purent." },
        { phrase: "Elles ___ traverser la rivière.",                   temps: "Passé simple",     reponse: "purent",    explication: "Au passé simple, « elles » → elles purent." },

        /* Plus-que-parfait (avoir à l'imparfait + pu → pas d'accord) */
        { phrase: "Il ___ terminer son travail avant l'orage.",       temps: "Plus-que-parfait", reponse: "avait pu",   explication: "Au plus-que-parfait, « il » → il avait pu (avoir imparfait + pu)." },
        { phrase: "Elle ___ venir à la réunion la veille.",           temps: "Plus-que-parfait", reponse: "avait pu",   explication: "Au plus-que-parfait, « elle » → elle avait pu." },
        { phrase: "J'___ me reposer avant la course.",                temps: "Plus-que-parfait", reponse: "avais pu",   explication: "Au plus-que-parfait, « j' » → j'avais pu." },
        { phrase: "Tu ___ apprendre la leçon avant le contrôle.",     temps: "Plus-que-parfait", reponse: "avais pu",   explication: "Au plus-que-parfait, « tu » → tu avais pu." },
        { phrase: "Nous ___ finir avant la fermeture.",               temps: "Plus-que-parfait", reponse: "avions pu",  explication: "Au plus-que-parfait, « nous » → nous avions pu." },
        { phrase: "Vous ___ partir avant l'embouteillage.",           temps: "Plus-que-parfait", reponse: "aviez pu",   explication: "Au plus-que-parfait, « vous » → vous aviez pu." },
        { phrase: "Ils ___ sortir avant la pluie.",                   temps: "Plus-que-parfait", reponse: "avaient pu", explication: "Au plus-que-parfait, « ils » → ils avaient pu." },
        { phrase: "Elles ___ terminer leur exposé à temps.",          temps: "Plus-que-parfait", reponse: "avaient pu", explication: "Au plus-que-parfait, « elles » → elles avaient pu." }
      ],

      /* ── 6e : Conditionnel (×8) + Subjonctif présent (×8) ── */
      /* Note : « pouvoir » n'a pas d'impératif → Subjonctif présent à la place */
      "6e": [
        /* Conditionnel (radical irrégulier « pourr- ») */
        { phrase: "Je ___ t'aider si j'avais le temps.",              temps: "Conditionnel", reponse: "pourrais",   explication: "Au conditionnel, « je » → je pourrais (radical irrégulier « pourr- »)." },
        { phrase: "Tu ___ venir avec nous si tu voulais.",            temps: "Conditionnel", reponse: "pourrais",   explication: "Au conditionnel, « tu » → tu pourrais (radical irrégulier « pourr- »)." },
        { phrase: "Il ___ courir plus vite avec de l'entraînement.", temps: "Conditionnel", reponse: "pourrait",   explication: "Au conditionnel, « il » → il pourrait (radical irrégulier « pourr- »)." },
        { phrase: "Elle ___ chanter sur scène.",                      temps: "Conditionnel", reponse: "pourrait",   explication: "Au conditionnel, « elle » → elle pourrait (radical irrégulier « pourr- »)." },
        { phrase: "Nous ___ partir plus tôt si on se dépêchait.",    temps: "Conditionnel", reponse: "pourrions",  explication: "Au conditionnel, « nous » → nous pourrions (radical irrégulier « pourr- »)." },
        { phrase: "Vous ___ réussir si vous travailliez davantage.", temps: "Conditionnel", reponse: "pourriez",   explication: "Au conditionnel, « vous » → vous pourriez (radical irrégulier « pourr- »)." },
        { phrase: "Ils ___ résoudre ce problème facilement.",        temps: "Conditionnel", reponse: "pourraient", explication: "Au conditionnel, « ils » → ils pourraient (radical irrégulier « pourr- »)." },
        { phrase: "Elles ___ venir si elles étaient disponibles.",   temps: "Conditionnel", reponse: "pourraient", explication: "Au conditionnel, « elles » → elles pourraient (radical irrégulier « pourr- »)." },

        /* Subjonctif présent */
        { phrase: "Il faut que je ___ terminer avant ce soir.",      temps: "Subjonctif présent", reponse: "puisse",    explication: "Au subjonctif présent, « je » → que je puisse (verbe irrégulier)." },
        { phrase: "Je veux que tu ___ venir à la fête.",             temps: "Subjonctif présent", reponse: "puisses",   explication: "Au subjonctif présent, « tu » → que tu puisses (verbe irrégulier)." },
        { phrase: "Il faut qu'il ___ partir à l'heure.",             temps: "Subjonctif présent", reponse: "puisse",    explication: "Au subjonctif présent, « il » → qu'il puisse (verbe irrégulier)." },
        { phrase: "Je souhaite qu'elle ___ venir avec nous.",        temps: "Subjonctif présent", reponse: "puisse",    explication: "Au subjonctif présent, « elle » → qu'elle puisse (verbe irrégulier)." },
        { phrase: "Il faut que nous ___ travailler ensemble.",       temps: "Subjonctif présent", reponse: "puissions", explication: "Au subjonctif présent, « nous » → que nous puissions (verbe irrégulier)." },
        { phrase: "Je veux que vous ___ réussir cet examen.",        temps: "Subjonctif présent", reponse: "puissiez",  explication: "Au subjonctif présent, « vous » → que vous puissiez (verbe irrégulier)." },
        { phrase: "Il faut qu'ils ___ participer au projet.",        temps: "Subjonctif présent", reponse: "puissent",  explication: "Au subjonctif présent, « ils » → qu'ils puissent (verbe irrégulier)." },
        { phrase: "Je souhaite qu'elles ___ venir à la cérémonie.", temps: "Subjonctif présent", reponse: "puissent",  explication: "Au subjonctif présent, « elles » → qu'elles puissent (verbe irrégulier)." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER VOIR  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Impératif + Conditionnel
     Irrégularités clés : présent (vois/voient vs voyons/voyez),
     radical « verr- » au futur et conditionnel,
     passé simple vit ≠ vit (vivre, contexte narratif)
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-voir": {
    title: "Conjuguer le verbe VOIR",
    verb: "voir",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ un beau coucher de soleil.",                 temps: "Présent",       reponse: "vois",      explication: "Au présent, « je » → je vois (verbe irrégulier)." },
        { phrase: "Tu ___ bien sans lunettes ?",                       temps: "Présent",       reponse: "vois",      explication: "Au présent, « tu » → tu vois (verbe irrégulier)." },
        { phrase: "Il ___ le tableau depuis sa place.",                temps: "Présent",       reponse: "voit",      explication: "Au présent, « il » → il voit (verbe irrégulier)." },
        { phrase: "Elle ___ ses amis le week-end.",                    temps: "Présent",       reponse: "voit",      explication: "Au présent, « elle » → elle voit (verbe irrégulier)." },
        { phrase: "Nous ___ un film ce soir.",                         temps: "Présent",       reponse: "voyons",    explication: "Au présent, « nous » → nous voyons." },
        { phrase: "Vous ___ ce que je veux dire ?",                   temps: "Présent",       reponse: "voyez",     explication: "Au présent, « vous » → vous voyez." },
        { phrase: "Ils ___ la mer depuis leur fenêtre.",              temps: "Présent",       reponse: "voient",    explication: "Au présent, « ils » → ils voient (attention au double radical : voi-/voy-)." },
        { phrase: "Elles ___ souvent leurs cousins.",                  temps: "Présent",       reponse: "voient",    explication: "Au présent, « elles » → elles voient (attention au double radical : voi-/voy-)." },

        /* Imparfait */
        { phrase: "Je ___ très bien sans lunettes autrefois.",         temps: "Imparfait",     reponse: "voyais",    explication: "À l'imparfait, « je » → je voyais." },
        { phrase: "Tu ___ tes amis chaque jour.",                      temps: "Imparfait",     reponse: "voyais",    explication: "À l'imparfait, « tu » → tu voyais." },
        { phrase: "Elle ___ ses grands-parents chaque été.",           temps: "Imparfait",     reponse: "voyait",    explication: "À l'imparfait, « elle » → elle voyait." },
        { phrase: "Nous ___ des films le vendredi soir.",              temps: "Imparfait",     reponse: "voyions",   explication: "À l'imparfait, « nous » → nous voyions." },
        { phrase: "Vous ___ souvent vos voisins.",                     temps: "Imparfait",     reponse: "voyiez",    explication: "À l'imparfait, « vous » → vous voyiez." },
        { phrase: "Ils ___ la montagne depuis leur maison.",           temps: "Imparfait",     reponse: "voyaient",  explication: "À l'imparfait, « ils » → ils voyaient." },

        /* Futur simple (radical irrégulier « verr- ») */
        { phrase: "Je ___ bien comment résoudre ce problème.",         temps: "Futur simple",  reponse: "verrai",    explication: "Au futur, « je » → je verrai (radical irrégulier « verr- »)." },
        { phrase: "Tu ___ combien c'est beau en vrai.",               temps: "Futur simple",  reponse: "verras",    explication: "Au futur, « tu » → tu verras (radical irrégulier « verr- »)." },
        { phrase: "Elle ___ ses amis pendant les vacances.",           temps: "Futur simple",  reponse: "verra",     explication: "Au futur, « elle » → elle verra (radical irrégulier « verr- »)." },
        { phrase: "Nous ___ bien le spectacle depuis nos places.",     temps: "Futur simple",  reponse: "verrons",   explication: "Au futur, « nous » → nous verrons (radical irrégulier « verr- »)." },
        { phrase: "Vous ___ le résultat demain.",                      temps: "Futur simple",  reponse: "verrez",    explication: "Au futur, « vous » → vous verrez (radical irrégulier « verr- »)." },
        { phrase: "Ils ___ ce film à la télé ce soir.",               temps: "Futur simple",  reponse: "verront",   explication: "Au futur, « ils » → ils verront (radical irrégulier « verr- »)." },

        /* Passé composé (auxiliaire avoir → pas d'accord) */
        { phrase: "J'___ un arc-en-ciel ce matin.",                   temps: "Passé composé", reponse: "ai vu",     explication: "Au passé composé, voir se conjugue avec avoir : j'ai vu." },
        { phrase: "Tu ___ le match hier soir ?",                       temps: "Passé composé", reponse: "as vu",     explication: "Au passé composé, voir se conjugue avec avoir : tu as vu." },
        { phrase: "Il ___ le directeur ce matin.",                     temps: "Passé composé", reponse: "a vu",      explication: "Au passé composé, voir se conjugue avec avoir : il a vu." },
        { phrase: "Nous ___ un beau spectacle hier.",                  temps: "Passé composé", reponse: "avons vu",  explication: "Au passé composé, voir se conjugue avec avoir : nous avons vu." },
        { phrase: "Vous ___ ce film ?",                                temps: "Passé composé", reponse: "avez vu",   explication: "Au passé composé, voir se conjugue avec avoir : vous avez vu." },
        { phrase: "Elles ___ leurs cousins pendant les vacances.",     temps: "Passé composé", reponse: "ont vu",    explication: "Au passé composé, voir se conjugue avec avoir : elles ont vu." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple (attention : « vit » = passé simple de voir ≠ « vit » de vivre) */
        { phrase: "Il ___ le château se dresser devant lui.",          temps: "Passé simple",     reponse: "vit",       explication: "Au passé simple, « il » → il vit (contexte narratif)." },
        { phrase: "Elle ___ une lumière au loin dans la nuit.",        temps: "Passé simple",     reponse: "vit",       explication: "Au passé simple, « elle » → elle vit." },
        { phrase: "Je ___ quelque chose d'étrange ce soir-là.",       temps: "Passé simple",     reponse: "vis",       explication: "Au passé simple, « je » → je vis." },
        { phrase: "Tu ___ la vérité de tes propres yeux.",            temps: "Passé simple",     reponse: "vis",       explication: "Au passé simple, « tu » → tu vis." },
        { phrase: "Nous ___ le spectacle depuis le premier rang.",     temps: "Passé simple",     reponse: "vîmes",     explication: "Au passé simple, « nous » → nous vîmes (avec accent circonflexe)." },
        { phrase: "Vous ___ le lever du soleil ce matin-là.",         temps: "Passé simple",     reponse: "vîtes",     explication: "Au passé simple, « vous » → vous vîtes (avec accent circonflexe)." },
        { phrase: "Ils ___ la comète traverser le ciel.",             temps: "Passé simple",     reponse: "virent",    explication: "Au passé simple, « ils » → ils virent." },
        { phrase: "Elles ___ la scène depuis leur fenêtre.",          temps: "Passé simple",     reponse: "virent",    explication: "Au passé simple, « elles » → elles virent." },

        /* Plus-que-parfait (avoir à l'imparfait + vu → pas d'accord) */
        { phrase: "Il ___ ce film avant d'en lire le livre.",         temps: "Plus-que-parfait", reponse: "avait vu",   explication: "Au plus-que-parfait, « il » → il avait vu (avoir imparfait + vu)." },
        { phrase: "Elle ___ ses amis la veille.",                      temps: "Plus-que-parfait", reponse: "avait vu",   explication: "Au plus-que-parfait, « elle » → elle avait vu." },
        { phrase: "J'___ cette scène en rêve la nuit d'avant.",       temps: "Plus-que-parfait", reponse: "avais vu",   explication: "Au plus-que-parfait, « j' » → j'avais vu." },
        { phrase: "Tu ___ ce tableau au musée.",                       temps: "Plus-que-parfait", reponse: "avais vu",   explication: "Au plus-que-parfait, « tu » → tu avais vu." },
        { phrase: "Nous ___ ce film avant la sortie en salle.",       temps: "Plus-que-parfait", reponse: "avions vu",  explication: "Au plus-que-parfait, « nous » → nous avions vu." },
        { phrase: "Vous ___ le résultat avant tout le monde.",        temps: "Plus-que-parfait", reponse: "aviez vu",   explication: "Au plus-que-parfait, « vous » → vous aviez vu." },
        { phrase: "Ils ___ l'accident avant l'arrivée des secours.",  temps: "Plus-que-parfait", reponse: "avaient vu", explication: "Au plus-que-parfait, « ils » → ils avaient vu." },
        { phrase: "Elles ___ le spectacle la veille.",                 temps: "Plus-que-parfait", reponse: "avaient vu", explication: "Au plus-que-parfait, « elles » → elles avaient vu." }
      ],

      /* ── 6e : Impératif (×8) + Conditionnel (×8) ── */
      "6e": [
        /* Impératif : vois (tu) / voyons (nous) / voyez (vous) */
        { phrase: "___ par toi-même, c'est magnifique !",             temps: "Impératif", reponse: "Vois",                     explication: "À l'impératif avec « toi », c'est « tu » : Vois !" },
        { phrase: "___ tes résultats avant de te plaindre !",         temps: "Impératif", reponse: "Vois",                     explication: "À l'impératif avec « tes », c'est « tu » : Vois !" },
        { phrase: "___ vos copies avant de les rendre !",             temps: "Impératif", reponse: "Voyez",                    explication: "À l'impératif avec « vos », c'est « vous » : Voyez !" },
        { phrase: "___ le résultat de votre travail !",               temps: "Impératif", reponse: "Voyez",                    explication: "À l'impératif avec « votre », c'est « vous » : Voyez !" },
        { phrase: "___ notre nouveau projet ensemble !",              temps: "Impératif", reponse: "Voyons",                   explication: "À l'impératif pour « nous » : Voyons ! (on invite le groupe à agir)." },
        { phrase: "___ ce spectacle, c'est impressionnant !",         temps: "Impératif", reponses: ["Vois", "Voyez"],         explication: "À l'impératif : Vois (tu) ou Voyez (vous) selon la personne." },
        { phrase: "N'___ pas les choses en noir !",                   temps: "Impératif", reponses: ["vois", "voyez"],         explication: "À l'impératif négatif : ne vois pas (tu) ou ne voyez pas (vous)." },
        { phrase: "___ ! C'est exactement ce que je voulais dire.",   temps: "Impératif", reponses: ["Vois", "Voyez"],         explication: "À l'impératif : Vois (tu) ou Voyez (vous) selon la personne." },

        /* Conditionnel (radical irrégulier « verr- ») */
        { phrase: "Je ___ bien ce film ce soir.",                     temps: "Conditionnel", reponse: "verrais",   explication: "Au conditionnel, « je » → je verrais (radical irrégulier « verr- »)." },
        { phrase: "Tu ___ mieux avec des lunettes.",                  temps: "Conditionnel", reponse: "verrais",   explication: "Au conditionnel, « tu » → tu verrais (radical irrégulier « verr- »)." },
        { phrase: "Il ___ tout depuis ce rocher.",                    temps: "Conditionnel", reponse: "verrait",   explication: "Au conditionnel, « il » → il verrait (radical irrégulier « verr- »)." },
        { phrase: "Elle ___ ses amis ce week-end si elle pouvait.",   temps: "Conditionnel", reponse: "verrait",   explication: "Au conditionnel, « elle » → elle verrait (radical irrégulier « verr- »)." },
        { phrase: "Nous ___ mieux le tableau de là-bas.",             temps: "Conditionnel", reponse: "verrions",  explication: "Au conditionnel, « nous » → nous verrions (radical irrégulier « verr- »)." },
        { phrase: "Vous ___ la différence si vous regardiez bien.",   temps: "Conditionnel", reponse: "verriez",   explication: "Au conditionnel, « vous » → vous verriez (radical irrégulier « verr- »)." },
        { phrase: "Ils ___ la mer depuis leur nouvelle maison.",      temps: "Conditionnel", reponse: "verraient", explication: "Au conditionnel, « ils » → ils verraient (radical irrégulier « verr- »)." },
        { phrase: "Elles ___ leurs amis plus souvent si elles habitaient plus près.", temps: "Conditionnel", reponse: "verraient", explication: "Au conditionnel, « elles » → elles verraient (radical irrégulier « verr- »)." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER VOULOIR  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Impératif + Conditionnel
     Irrégularités clés : présent (veux/veut/veulent),
     radical « voudr- » au futur et conditionnel,
     impératif : veux/veuille (tu), voulons/veuillons (nous),
     voulez/veuillez (vous) — les deux formes acceptées
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-vouloir": {
    title: "Conjuguer le verbe VOULOIR",
    verb: "vouloir",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ devenir astronaute.",                        temps: "Présent",       reponse: "veux",       explication: "Au présent, « je » → je veux (verbe irrégulier)." },
        { phrase: "Tu ___ venir avec nous ?",                          temps: "Présent",       reponse: "veux",       explication: "Au présent, « tu » → tu veux (verbe irrégulier)." },
        { phrase: "Il ___ un nouveau vélo pour son anniversaire.",     temps: "Présent",       reponse: "veut",       explication: "Au présent, « il » → il veut (verbe irrégulier)." },
        { phrase: "Elle ___ apprendre le piano.",                      temps: "Présent",       reponse: "veut",       explication: "Au présent, « elle » → elle veut (verbe irrégulier)." },
        { phrase: "Nous ___ faire une excursion.",                     temps: "Présent",       reponse: "voulons",    explication: "Au présent, « nous » → nous voulons." },
        { phrase: "Vous ___ partir maintenant ?",                      temps: "Présent",       reponse: "voulez",     explication: "Au présent, « vous » → vous voulez." },
        { phrase: "Ils ___ jouer au football après l'école.",         temps: "Présent",       reponse: "veulent",    explication: "Au présent, « ils » → ils veulent (verbe irrégulier)." },
        { phrase: "Elles ___ aller au cinéma ce soir.",               temps: "Présent",       reponse: "veulent",    explication: "Au présent, « elles » → elles veulent (verbe irrégulier)." },

        /* Imparfait */
        { phrase: "Je ___ devenir pompier quand j'étais petit.",      temps: "Imparfait",     reponse: "voulais",    explication: "À l'imparfait, « je » → je voulais." },
        { phrase: "Tu ___ toujours le meilleur jouet.",               temps: "Imparfait",     reponse: "voulais",    explication: "À l'imparfait, « tu » → tu voulais." },
        { phrase: "Elle ___ être vétérinaire.",                       temps: "Imparfait",     reponse: "voulait",    explication: "À l'imparfait, « elle » → elle voulait." },
        { phrase: "Nous ___ partir en vacances ensemble.",            temps: "Imparfait",     reponse: "voulions",   explication: "À l'imparfait, « nous » → nous voulions." },
        { phrase: "Vous ___ rester plus longtemps.",                  temps: "Imparfait",     reponse: "vouliez",    explication: "À l'imparfait, « vous » → vous vouliez." },
        { phrase: "Ils ___ jouer dehors mais il pleuvait.",           temps: "Imparfait",     reponse: "voulaient",  explication: "À l'imparfait, « ils » → ils voulaient." },

        /* Futur simple (radical irrégulier « voudr- ») */
        { phrase: "Je ___ te parler demain.",                         temps: "Futur simple",  reponse: "voudrai",    explication: "Au futur, « je » → je voudrai (radical irrégulier « voudr- »)." },
        { phrase: "Tu ___ encore du gâteau ?",                        temps: "Futur simple",  reponse: "voudras",    explication: "Au futur, « tu » → tu voudras (radical irrégulier « voudr- »)." },
        { phrase: "Elle ___ choisir elle-même.",                      temps: "Futur simple",  reponse: "voudra",     explication: "Au futur, « elle » → elle voudra (radical irrégulier « voudr- »)." },
        { phrase: "Nous ___ vous remercier après la cérémonie.",      temps: "Futur simple",  reponse: "voudrons",   explication: "Au futur, « nous » → nous voudrons (radical irrégulier « voudr- »)." },
        { phrase: "Vous ___ bien nous aider ?",                       temps: "Futur simple",  reponse: "voudrez",    explication: "Au futur, « vous » → vous voudrez (radical irrégulier « voudr- »)." },
        { phrase: "Ils ___ y aller en premiers.",                     temps: "Futur simple",  reponse: "voudront",   explication: "Au futur, « ils » → ils voudront (radical irrégulier « voudr- »)." },

        /* Passé composé (auxiliaire avoir → pas d'accord) */
        { phrase: "J'___ partir tôt ce matin.",                       temps: "Passé composé", reponse: "ai voulu",    explication: "Au passé composé, vouloir se conjugue avec avoir : j'ai voulu." },
        { phrase: "Tu ___ venir mais tu n'as pas pu.",                temps: "Passé composé", reponse: "as voulu",    explication: "Au passé composé, vouloir se conjugue avec avoir : tu as voulu." },
        { phrase: "Il ___ rester mais il devait partir.",             temps: "Passé composé", reponse: "a voulu",     explication: "Au passé composé, vouloir se conjugue avec avoir : il a voulu." },
        { phrase: "Nous ___ vous aider du mieux possible.",           temps: "Passé composé", reponse: "avons voulu", explication: "Au passé composé, vouloir se conjugue avec avoir : nous avons voulu." },
        { phrase: "Vous ___ changer les règles.",                     temps: "Passé composé", reponse: "avez voulu",  explication: "Au passé composé, vouloir se conjugue avec avoir : vous avez voulu." },
        { phrase: "Elles ___ tout faire elles-mêmes.",                temps: "Passé composé", reponse: "ont voulu",   explication: "Au passé composé, vouloir se conjugue avec avoir : elles ont voulu." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple */
        { phrase: "Il ___ partir sans dire au revoir.",               temps: "Passé simple",     reponse: "voulut",     explication: "Au passé simple, « il » → il voulut." },
        { phrase: "Elle ___ rester seule.",                            temps: "Passé simple",     reponse: "voulut",     explication: "Au passé simple, « elle » → elle voulut." },
        { phrase: "Je ___ tout de suite répondre.",                    temps: "Passé simple",     reponse: "voulus",     explication: "Au passé simple, « je » → je voulus." },
        { phrase: "Tu ___ prendre la parole devant l'assemblée.",     temps: "Passé simple",     reponse: "voulus",     explication: "Au passé simple, « tu » → tu voulus." },
        { phrase: "Nous ___ avancer malgré le danger.",               temps: "Passé simple",     reponse: "voulûmes",   explication: "Au passé simple, « nous » → nous voulûmes (avec accent circonflexe)." },
        { phrase: "Vous ___ garder le secret.",                       temps: "Passé simple",     reponse: "voulûtes",   explication: "Au passé simple, « vous » → vous voulûtes (avec accent circonflexe)." },
        { phrase: "Ils ___ changer d'avis à la dernière minute.",     temps: "Passé simple",     reponse: "voulurent",  explication: "Au passé simple, « ils » → ils voulurent." },
        { phrase: "Elles ___ prendre une décision immédiatement.",    temps: "Passé simple",     reponse: "voulurent",  explication: "Au passé simple, « elles » → elles voulurent." },

        /* Plus-que-parfait (avoir à l'imparfait + voulu → pas d'accord) */
        { phrase: "Il ___ partir avant que la tempête arrive.",       temps: "Plus-que-parfait", reponse: "avait voulu",   explication: "Au plus-que-parfait, « il » → il avait voulu (avoir imparfait + voulu)." },
        { phrase: "Elle ___ rester, mais ses parents avaient insisté.", temps: "Plus-que-parfait", reponse: "avait voulu", explication: "Au plus-que-parfait, « elle » → elle avait voulu." },
        { phrase: "J'___ prévenir tout le monde.",                    temps: "Plus-que-parfait", reponse: "avais voulu",   explication: "Au plus-que-parfait, « j' » → j'avais voulu." },
        { phrase: "Tu ___ venir mais tu étais malade.",               temps: "Plus-que-parfait", reponse: "avais voulu",   explication: "Au plus-que-parfait, « tu » → tu avais voulu." },
        { phrase: "Nous ___ organiser une fête.",                     temps: "Plus-que-parfait", reponse: "avions voulu",  explication: "Au plus-que-parfait, « nous » → nous avions voulu." },
        { phrase: "Vous ___ changer les règles avant notre arrivée.", temps: "Plus-que-parfait", reponse: "aviez voulu",   explication: "Au plus-que-parfait, « vous » → vous aviez voulu." },
        { phrase: "Ils ___ partir plus tôt.",                         temps: "Plus-que-parfait", reponse: "avaient voulu", explication: "Au plus-que-parfait, « ils » → ils avaient voulu." },
        { phrase: "Elles ___ tout faire par elles-mêmes.",            temps: "Plus-que-parfait", reponse: "avaient voulu", explication: "Au plus-que-parfait, « elles » → elles avaient voulu." }
      ],

      /* ── 6e : Impératif (×8) + Conditionnel (×8) ── */
      /* Impératif : veux ou veuille (tu), voulons ou veuillons (nous), voulez ou veuillez (vous) */
      "6e": [
        /* Impératif */
        { phrase: "___ fermer la porte s'il te plaît !",               temps: "Impératif", reponses: ["Veuille", "Veux"],         explication: "À l'impératif (tu) : Veux ou Veuille (forme soutenue). Les deux sont corrects." },
        { phrase: "___ avoir la gentillesse de te calmer !",           temps: "Impératif", reponses: ["Veuille", "Veux"],         explication: "À l'impératif (tu) : Veux ou Veuille (forme soutenue). Les deux sont corrects." },
        { phrase: "___ vous asseoir, s'il vous plaît.",                temps: "Impératif", reponses: ["Veuillez", "Voulez"],      explication: "À l'impératif (vous) : Voulez ou Veuillez (plus formel, très courant à l'écrit)." },
        { phrase: "___ agréer, Madame, mes sincères salutations.",     temps: "Impératif", reponse: "Veuillez",                   explication: "Dans les formules de politesse épistolaires, on emploie toujours « Veuillez »." },
        { phrase: "___ trouver ci-joint les documents demandés.",      temps: "Impératif", reponse: "Veuillez",                   explication: "Dans les courriers formels, on emploie « Veuillez » (forme polie de « vous »)." },
        { phrase: "___ bien noter votre numéro de dossier.",           temps: "Impératif", reponses: ["Veuillez", "Voulez"],      explication: "À l'impératif (vous) : Voulez ou Veuillez (plus formel)." },
        { phrase: "___ tous faire de notre mieux !",                   temps: "Impératif", reponses: ["Veuillons", "Voulons"],    explication: "À l'impératif (nous) : Voulons ou Veuillons (forme soutenue). Les deux sont corrects." },
        { phrase: "___ bien m'excuser auprès de tes parents.",         temps: "Impératif", reponses: ["Veuille", "Veux"],         explication: "À l'impératif (tu) : Veux ou Veuille (forme soutenue). Les deux sont corrects." },

        /* Conditionnel (radical irrégulier « voudr- ») */
        { phrase: "Je ___ te parler en privé.",                        temps: "Conditionnel", reponse: "voudrais",   explication: "Au conditionnel, « je » → je voudrais (radical irrégulier « voudr- »)." },
        { phrase: "Tu ___ encore du dessert ?",                        temps: "Conditionnel", reponse: "voudrais",   explication: "Au conditionnel, « tu » → tu voudrais (radical irrégulier « voudr- »)." },
        { phrase: "Il ___ changer d'avis.",                            temps: "Conditionnel", reponse: "voudrait",   explication: "Au conditionnel, « il » → il voudrait (radical irrégulier « voudr- »)." },
        { phrase: "Elle ___ devenir médecin.",                         temps: "Conditionnel", reponse: "voudrait",   explication: "Au conditionnel, « elle » → elle voudrait (radical irrégulier « voudr- »)." },
        { phrase: "Nous ___ vous inviter à cette cérémonie.",          temps: "Conditionnel", reponse: "voudrions",  explication: "Au conditionnel, « nous » → nous voudrions (radical irrégulier « voudr- »)." },
        { phrase: "Vous ___ bien nous aider ?",                        temps: "Conditionnel", reponse: "voudriez",   explication: "Au conditionnel, « vous » → vous voudriez (radical irrégulier « voudr- »)." },
        { phrase: "Ils ___ partir en vacances ensemble.",              temps: "Conditionnel", reponse: "voudraient", explication: "Au conditionnel, « ils » → ils voudraient (radical irrégulier « voudr- »)." },
        { phrase: "Elles ___ choisir elles-mêmes.",                    temps: "Conditionnel", reponse: "voudraient", explication: "Au conditionnel, « elles » → elles voudraient (radical irrégulier « voudr- »)." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════
     CONJUGUER PRENDRE  (type : faire-niveaux)
     CM1 : Présent + Imparfait + Futur simple + Passé composé
     CM2 : Passé simple + Plus-que-parfait
     6e  : Impératif + Conditionnel
     Irrégularités clés : présent (prends/prend/prennent),
     participe passé irrégulier « pris »,
     passé simple : pris/prit/prîmes/prîtes/prirent
  ══════════════════════════════════════════════════════════════ */
  "conjuguer-prendre": {
    title: "Conjuguer le verbe PRENDRE",
    verb: "prendre",
    levels: ["CM1", "CM2", "6e"],
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── CM1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
      "CM1": [
        /* Présent */
        { phrase: "Je ___ mon cartable tous les matins.",              temps: "Présent",       reponse: "prends",     explication: "Au présent, « je » → je prends (verbe irrégulier)." },
        { phrase: "Tu ___ le bus pour aller à l'école.",              temps: "Présent",       reponse: "prends",     explication: "Au présent, « tu » → tu prends (verbe irrégulier)." },
        { phrase: "Il ___ son temps.",                                 temps: "Présent",       reponse: "prend",      explication: "Au présent, « il » → il prend (sans -s final)." },
        { phrase: "Elle ___ un verre d'eau.",                          temps: "Présent",       reponse: "prend",      explication: "Au présent, « elle » → elle prend (sans -s final)." },
        { phrase: "Nous ___ le train demain.",                         temps: "Présent",       reponse: "prenons",    explication: "Au présent, « nous » → nous prenons." },
        { phrase: "Vous ___ votre temps.",                             temps: "Présent",       reponse: "prenez",     explication: "Au présent, « vous » → vous prenez." },
        { phrase: "Ils ___ leur petit-déjeuner ensemble.",            temps: "Présent",       reponse: "prennent",   explication: "Au présent, « ils » → ils prennent (attention au double n)." },
        { phrase: "Elles ___ le chemin le plus court.",               temps: "Présent",       reponse: "prennent",   explication: "Au présent, « elles » → elles prennent (attention au double n)." },

        /* Imparfait */
        { phrase: "Je ___ toujours le bus pour aller à l'école.",     temps: "Imparfait",     reponse: "prenais",    explication: "À l'imparfait, « je » → je prenais." },
        { phrase: "Tu ___ ton vélo le week-end.",                      temps: "Imparfait",     reponse: "prenais",    explication: "À l'imparfait, « tu » → tu prenais." },
        { phrase: "Elle ___ des leçons de piano chaque semaine.",     temps: "Imparfait",     reponse: "prenait",    explication: "À l'imparfait, « elle » → elle prenait." },
        { phrase: "Nous ___ notre temps pour finir.",                  temps: "Imparfait",     reponse: "prenions",   explication: "À l'imparfait, « nous » → nous prenions." },
        { phrase: "Vous ___ toujours ce chemin.",                      temps: "Imparfait",     reponse: "preniez",    explication: "À l'imparfait, « vous » → vous preniez." },
        { phrase: "Ils ___ le train chaque vendredi soir.",           temps: "Imparfait",     reponse: "prenaient",  explication: "À l'imparfait, « ils » → ils prenaient." },

        /* Futur simple */
        { phrase: "Je ___ le train demain matin.",                     temps: "Futur simple",  reponse: "prendrai",   explication: "Au futur, « je » → je prendrai." },
        { phrase: "Tu ___ ton petit-déjeuner avant de partir.",       temps: "Futur simple",  reponse: "prendras",   explication: "Au futur, « tu » → tu prendras." },
        { phrase: "Elle ___ le chemin le plus court.",                 temps: "Futur simple",  reponse: "prendra",    explication: "Au futur, « elle » → elle prendra." },
        { phrase: "Nous ___ notre décision demain.",                   temps: "Futur simple",  reponse: "prendrons",  explication: "Au futur, « nous » → nous prendrons." },
        { phrase: "Vous ___ vos affaires avant de partir.",           temps: "Futur simple",  reponse: "prendrez",   explication: "Au futur, « vous » → vous prendrez." },
        { phrase: "Ils ___ l'avion pour les vacances.",               temps: "Futur simple",  reponse: "prendront",  explication: "Au futur, « ils » → ils prendront." },

        /* Passé composé (auxiliaire avoir + participe irrégulier « pris » → pas d'accord) */
        { phrase: "J'___ mon manteau car il faisait froid.",          temps: "Passé composé", reponse: "ai pris",    explication: "Au passé composé, prendre se conjugue avec avoir : j'ai pris (participe irrégulier « pris »)." },
        { phrase: "Tu ___ le bon chemin.",                             temps: "Passé composé", reponse: "as pris",    explication: "Au passé composé, prendre se conjugue avec avoir : tu as pris." },
        { phrase: "Il ___ sa décision tout seul.",                    temps: "Passé composé", reponse: "a pris",     explication: "Au passé composé, prendre se conjugue avec avoir : il a pris." },
        { phrase: "Nous ___ le train de 8 heures.",                   temps: "Passé composé", reponse: "avons pris", explication: "Au passé composé, prendre se conjugue avec avoir : nous avons pris." },
        { phrase: "Vous ___ vos affaires.",                            temps: "Passé composé", reponse: "avez pris",  explication: "Au passé composé, prendre se conjugue avec avoir : vous avez pris." },
        { phrase: "Elles ___ le bus ce matin.",                        temps: "Passé composé", reponse: "ont pris",   explication: "Au passé composé, prendre se conjugue avec avoir : elles ont pris." }
      ],

      /* ── CM2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
      "CM2": [
        /* Passé simple */
        { phrase: "Il ___ la fuite en voyant le danger.",             temps: "Passé simple",     reponse: "prit",      explication: "Au passé simple, « il » → il prit." },
        { phrase: "Elle ___ la parole devant toute l'assemblée.",     temps: "Passé simple",     reponse: "prit",      explication: "Au passé simple, « elle » → elle prit." },
        { phrase: "Je ___ la décision de partir ce soir-là.",        temps: "Passé simple",     reponse: "pris",      explication: "Au passé simple, « je » → je pris." },
        { phrase: "Tu ___ le premier chemin qui se présentait.",      temps: "Passé simple",     reponse: "pris",      explication: "Au passé simple, « tu » → tu pris." },
        { phrase: "Nous ___ nos affaires et partîmes aussitôt.",      temps: "Passé simple",     reponse: "prîmes",    explication: "Au passé simple, « nous » → nous prîmes (avec accent circonflexe)." },
        { phrase: "Vous ___ la bonne décision.",                       temps: "Passé simple",     reponse: "prîtes",    explication: "Au passé simple, « vous » → vous prîtes (avec accent circonflexe)." },
        { phrase: "Ils ___ les armes pour défendre leur village.",    temps: "Passé simple",     reponse: "prirent",   explication: "Au passé simple, « ils » → ils prirent." },
        { phrase: "Elles ___ le chemin du retour.",                    temps: "Passé simple",     reponse: "prirent",   explication: "Au passé simple, « elles » → elles prirent." },

        /* Plus-que-parfait (avoir à l'imparfait + pris → pas d'accord) */
        { phrase: "Il ___ sa décision avant l'arrivée de son père.", temps: "Plus-que-parfait", reponse: "avait pris",   explication: "Au plus-que-parfait, « il » → il avait pris (avoir imparfait + pris)." },
        { phrase: "Elle ___ le train avant l'orage.",                 temps: "Plus-que-parfait", reponse: "avait pris",   explication: "Au plus-que-parfait, « elle » → elle avait pris." },
        { phrase: "J'___ mon manteau avant de sortir.",               temps: "Plus-que-parfait", reponse: "avais pris",   explication: "Au plus-que-parfait, « j' » → j'avais pris." },
        { phrase: "Tu ___ le mauvais chemin.",                        temps: "Plus-que-parfait", reponse: "avais pris",   explication: "Au plus-que-parfait, « tu » → tu avais pris." },
        { phrase: "Nous ___ nos billets en avance.",                  temps: "Plus-que-parfait", reponse: "avions pris",  explication: "Au plus-que-parfait, « nous » → nous avions pris." },
        { phrase: "Vous ___ vos affaires avant de partir.",           temps: "Plus-que-parfait", reponse: "aviez pris",   explication: "Au plus-que-parfait, « vous » → vous aviez pris." },
        { phrase: "Ils ___ la bonne décision.",                        temps: "Plus-que-parfait", reponse: "avaient pris", explication: "Au plus-que-parfait, « ils » → ils avaient pris." },
        { phrase: "Elles ___ le bus avant la fermeture.",             temps: "Plus-que-parfait", reponse: "avaient pris", explication: "Au plus-que-parfait, « elles » → elles avaient pris." }
      ],

      /* ── 6e : Impératif (×8) + Conditionnel (×8) ── */
      "6e": [
        /* Impératif : prends (tu) / prenons (nous) / prenez (vous) */
        { phrase: "___ ton manteau, il fait froid !",                  temps: "Impératif", reponse: "Prends",                   explication: "À l'impératif avec « ton », c'est « tu » : Prends !" },
        { phrase: "___ tes affaires et viens !",                       temps: "Impératif", reponse: "Prends",                   explication: "À l'impératif avec « tes », c'est « tu » : Prends !" },
        { phrase: "___ soin de toi !",                                 temps: "Impératif", reponse: "Prends",                   explication: "À l'impératif avec « toi », c'est « tu » : Prends !" },
        { phrase: "___ vos places, le spectacle va commencer.",        temps: "Impératif", reponse: "Prenez",                   explication: "À l'impératif avec « vos », c'est « vous » : Prenez !" },
        { phrase: "___ votre temps, rien ne presse.",                  temps: "Impératif", reponse: "Prenez",                   explication: "À l'impératif avec « votre », c'est « vous » : Prenez !" },
        { phrase: "___ nos vélos et partons à l'aventure !",          temps: "Impératif", reponse: "Prenons",                  explication: "À l'impératif pour « nous » : Prenons ! (on invite le groupe à agir)." },
        { phrase: "___ le chemin le plus court !",                     temps: "Impératif", reponses: ["Prends", "Prenez"],      explication: "À l'impératif : Prends (tu) ou Prenez (vous) selon la personne." },
        { phrase: "N'___ pas ce chemin, il est dangereux !",          temps: "Impératif", reponses: ["prends", "prenez"],      explication: "À l'impératif négatif : ne prends pas (tu) ou ne prenez pas (vous)." },

        /* Conditionnel */
        { phrase: "Je ___ bien un peu de gâteau.",                     temps: "Conditionnel", reponse: "prendrais",  explication: "Au conditionnel, « je » → je prendrais." },
        { phrase: "Tu ___ le bus si tu étais en retard.",             temps: "Conditionnel", reponse: "prendrais",  explication: "Au conditionnel, « tu » → tu prendrais." },
        { phrase: "Il ___ sa décision après réflexion.",              temps: "Conditionnel", reponse: "prendrait",  explication: "Au conditionnel, « il » → il prendrait." },
        { phrase: "Elle ___ le chemin le plus court si elle pouvait.", temps: "Conditionnel", reponse: "prendrait", explication: "Au conditionnel, « elle » → elle prendrait." },
        { phrase: "Nous ___ le train si nous avions le temps.",       temps: "Conditionnel", reponse: "prendrions", explication: "Au conditionnel, « nous » → nous prendrions." },
        { phrase: "Vous ___ vos affaires avant de partir, normalement.", temps: "Conditionnel", reponse: "prendriez", explication: "Au conditionnel, « vous » → vous prendriez." },
        { phrase: "Ils ___ l'avion s'ils avaient l'argent.",          temps: "Conditionnel", reponse: "prendraient", explication: "Au conditionnel, « ils » → ils prendraient." },
        { phrase: "Elles ___ le bus si les horaires le permettaient.", temps: "Conditionnel", reponse: "prendraient", explication: "Au conditionnel, « elles » → elles prendraient." }
      ]
    }
  },

  /* ══════════════════════════════════════════════════════════════════════════
     conjuguer-plus-que-parfait  —  2 niveaux déverrouillables
     Niveau 1 : Repère le plus-que-parfait (identification dans un texte)
     Niveau 2 : Complète au plus-que-parfait (saisie libre)
     ══════════════════════════════════════════════════════════════════════════ */
  "conjuguer-plus-que-parfait": {
    title: "Conjuguer au plus-que-parfait",
    levels: ["CM2", "6e"],
    type: "pqp-niveaux",
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── Niveau 1 : 4 textes d'identification ───────────────────────────────
       tokens : {t: texte, v: true = groupe verbal cliquable, pqp: true = cible}
       Pièges : passé composé (auxiliaire au PRÉSENT) vs plus-que-parfait (aux à l'IMPARFAIT)
    ──────────────────────────────────────────────────────────────────────── */
    identTexts: [
      /* Texte 1 — Le voyage en famille */
      {
        tokens: [
          { t: "La veille du voyage, maman " },
          { t: "avait préparé", v: true, pqp: true },
          { t: " les valises avec soin. Le matin, Paul " },
          { t: "s'était levé", v: true, pqp: true },
          { t: " très tôt. Il réveilla sa sœur qui dormait encore. Ils " },
          { t: "ont pris", v: true, pqp: false },
          { t: " le train et " },
          { t: "sont arrivés", v: true, pqp: false },
          { t: " à destination." }
        ]
      },
      /* Texte 2 — Le renard */
      {
        tokens: [
          { t: "Ce soir-là, Léa raconta qu'elle " },
          { t: "avait vu", v: true, pqp: true },
          { t: " un renard dans le jardin. Son frère " },
          { t: "a dessiné", v: true, pqp: false },
          { t: " l'animal dans son cahier, mais il " },
          { t: "avait oublié", v: true, pqp: true },
          { t: " d'écrire son nom. Il " },
          { t: "est rentré", v: true, pqp: false },
          { t: " chez lui sans son dessin." }
        ]
      },
      /* Texte 3 — Le château enchanté */
      {
        tokens: [
          { t: "La sorcière habitait un château sombre. Avant l'arrivée du héros, elle " },
          { t: "avait préparé", v: true, pqp: true },
          { t: " un piège terrible. Les gardes " },
          { t: "avaient fermé", v: true, pqp: true },
          { t: " toutes les portes. Le héros " },
          { t: "a frappé", v: true, pqp: false },
          { t: " à la porte et " },
          { t: "a crié", v: true, pqp: false },
          { t: " son nom. Personne ne répondit." }
        ]
      },
      /* Texte 4 — Jules à l'école */
      {
        tokens: [
          { t: "Jules " },
          { t: "était arrivé", v: true, pqp: true },
          { t: " en avance car il " },
          { t: "avait fini", v: true, pqp: true },
          { t: " ses devoirs dès le réveil. La maîtresse " },
          { t: "a regardé", v: true, pqp: false },
          { t: " son travail et " },
          { t: "a souri", v: true, pqp: false },
          { t: ". Il lui " },
          { t: "a montré", v: true, pqp: false },
          { t: " fièrement son cahier." }
        ]
      }
    ],

    /* ── Niveau 2 : 10 phrases à trous ────────────────────────────────────
       sentence : phrase avec ___ (trou) et (infinitif) comme aide
       answers  : formes acceptées (tableau, pour couvrir variations genre)
       auxVerb  : "avoir" | "être" — pour orienter le message d'erreur
       explication : règle rappelée en cas d'erreur
    ──────────────────────────────────────────────────────────────────────── */
    writeBank: [
      {
        sentence:    "Quand nous sommes arrivés, le film (commencer) ___ déjà.",
        answers:     ["avait commencé"],
        auxVerb:     "avoir",
        explication: "Le film → il : <strong>avait</strong> (avoir à l'imparfait) + <strong>commencé</strong> (participe invariable)."
      },
      {
        sentence:    "Elle (partir) ___ bien avant que la pluie tombe.",
        answers:     ["était partie"],
        auxVerb:     "être",
        explication: "Partir prend être : <strong>était</strong> (être à l'imparfait) + <strong>partie</strong> (accord avec elle → -e)."
      },
      {
        sentence:    "Ils (manger) ___ avant d'aller jouer.",
        answers:     ["avaient mangé"],
        auxVerb:     "avoir",
        explication: "Plus-que-parfait avec avoir : <strong>avaient</strong> + <strong>mangé</strong> (participe invariable)."
      },
      {
        sentence:    "Tu (finir) ___ tes devoirs quand le téléphone a sonné.",
        answers:     ["avais fini"],
        auxVerb:     "avoir",
        explication: "Plus-que-parfait avec avoir : <strong>avais</strong> + <strong>fini</strong> (participe invariable)."
      },
      {
        sentence:    "Il (se lever) ___ si tôt qu'il n'y avait personne dans la rue.",
        answers:     ["s'était levé"],
        auxVerb:     "être",
        explication: "Verbe pronominal avec être : <strong>s'était</strong> + <strong>levé</strong> (accord avec il → pas de -e)."
      },
      {
        sentence:    "Vous (lire) ___ ce roman avant d'en discuter en classe.",
        answers:     ["aviez lu"],
        auxVerb:     "avoir",
        explication: "Plus-que-parfait avec avoir : <strong>aviez</strong> + <strong>lu</strong> (participe invariable)."
      },
      {
        sentence:    "Le chat (manger) ___ toute la nourriture avant notre retour.",
        answers:     ["avait mangé"],
        auxVerb:     "avoir",
        explication: "Le chat → il : <strong>avait</strong> + <strong>mangé</strong> (participe invariable)."
      },
      {
        sentence:    "Elles (rentrer) ___ depuis une heure quand il a téléphoné.",
        answers:     ["étaient rentrées"],
        auxVerb:     "être",
        explication: "Rentrer prend être : <strong>étaient</strong> + <strong>rentrées</strong> (accord féminin pluriel → -ées)."
      },
      {
        sentence:    "Nous (faire) ___ nos valises avant que le taxi arrive.",
        answers:     ["avions fait"],
        auxVerb:     "avoir",
        explication: "Plus-que-parfait avec avoir : <strong>avions</strong> + <strong>fait</strong> (participe invariable)."
      },
      {
        sentence:    "Comme j'(oublier) ___ mon sac, je suis retourné le chercher.",
        answers:     ["avais oublié"],
        auxVerb:     "avoir",
        explication: "J' → je : <strong>avais</strong> + <strong>oublié</strong> (participe invariable)."
      }
    ],
    niveauxConfig: {
      rule:             "Plus-que-parfait = auxiliaire <em>être</em> ou <em>avoir</em> à l'imparfait + participe passé",
      lvDefs: [
        { lv: 1, icon: '⭐',   label: 'Niveau 1 — Repère le plus-que-parfait', desc: 'Lis un texte, identifie les verbes au plus-que-parfait' },
        { lv: 2, icon: '⭐⭐', label: 'Niveau 2 — Complète au plus-que-parfait', desc: 'Conjugue des phrases à trous au plus-que-parfait' }
      ],
      verb1Instruction: "Clique sur les verbes au <strong>plus-que-parfait</strong>, puis valide.",
      verb1NotTarget:   "n'est pas au plus-que-parfait : l'auxiliaire n'est pas à l'imparfait",
      verb1TargetName:  "plus-que-parfait",
      verb1FoundAll:    "Tu as trouvé tous les plus-que-parfaits !",
      verb2Instruction: "Conjugue le verbe au <strong>plus-que-parfait</strong>.",
      lv2NextBtnLabel:  "Niveau 2 — Complète →",
      winMsg:           "Tu maîtrises le plus-que-parfait aux deux niveaux !"
    }
  },

  "conjuguer-imperatif-present": {
    title:              "Conjuguer à l'impératif présent",
    levels:             ["CM2", "6e"],
    type:               "imp-niveaux",
    questionsPerSession: 10,
    backLink:           { href: "français-conjugaison.html", label: "Conjugaison" },
    niveauxConfig: {
      rule:             "Impératif présent : sans pronom sujet · <em>tu</em> (1<sup>er</sup> groupe : pas de -s) / <em>nous</em> / <em>vous</em>",
      lvDefs: [
        { lv: 1, icon: '⭐',   label: "Niveau 1 — Repère l'impératif", desc: "Lis un texte, identifie les verbes à l'impératif présent" },
        { lv: 2, icon: '⭐⭐', label: "Niveau 2 — Écris à l'impératif", desc: "Conjugue des phrases à trous à l'impératif présent" }
      ],
      verb1Instruction: "Clique sur les verbes à l'<strong>impératif présent</strong>, puis valide.",
      verb1NotTarget:   "n'est pas à l'impératif présent",
      verb1TargetName:  "impératif",
      verb1FoundAll:    "Tu as trouvé tous les impératifs !",
      verb2Instruction: "Conjugue le verbe à l'<strong>impératif présent</strong>.",
      lv2NextBtnLabel:  "Niveau 2 — Écris →",
      winMsg:           "Tu maîtrises l'impératif présent aux deux niveaux !",
      simpleErrorFeedback: true
    },
    identTexts: [
      /* Texte 1 — La recette */
      { tokens: [
        { t: "Maman ouvrit le livre de cuisine. Elle dit : « " },
        { t: "Prends", v: true, pqp: true },
        { t: " deux œufs et " },
        { t: "mélange", v: true, pqp: true },
        { t: "-les bien. » Paul " },
        { t: "prit", v: true, pqp: false },
        { t: " les ingrédients sur l'étagère. Il " },
        { t: "versa", v: true, pqp: false },
        { t: " le lait dans le bol." }
      ]},
      /* Texte 2 — À l'école */
      { tokens: [
        { t: "La maîtresse se leva et dit aux élèves : « " },
        { t: "Ouvrez", v: true, pqp: true },
        { t: " vos cahiers et " },
        { t: "écrivez", v: true, pqp: true },
        { t: " la date. » Les enfants " },
        { t: "ouvrirent", v: true, pqp: false },
        { t: " leurs cahiers en silence. Théo " },
        { t: "écrit", v: true, pqp: false },
        { t: " très lentement." }
      ]},
      /* Texte 3 — La forêt magique */
      { tokens: [
        { t: "Un lutin apparut devant Hugo. « " },
        { t: "Suis", v: true, pqp: true },
        { t: "-moi jusqu'à la clairière et " },
        { t: "ferme", v: true, pqp: true },
        { t: " les yeux. » Hugo " },
        { t: "suivit", v: true, pqp: false },
        { t: " le lutin à travers les arbres. Il " },
        { t: "ferma", v: true, pqp: false },
        { t: " les yeux comme demandé." }
      ]},
      /* Texte 4 — Chez grand-mère */
      { tokens: [
        { t: "Grand-mère nous regarda et dit : « " },
        { t: "Soyez", v: true, pqp: true },
        { t: " sages pendant le dîner et " },
        { t: "rangez", v: true, pqp: true },
        { t: " vos affaires après. » Les enfants se regardèrent et " },
        { t: "obéirent", v: true, pqp: false },
        { t: " sans protester. Léa " },
        { t: "rangea", v: true, pqp: false },
        { t: " son sac en premier." }
      ]}
    ],
    writeBank: [
      {
        sentence:    "(manger) ___ tes légumes avant d'aller jouer !",
        answers:     ["Mange", "mange"],
        explication: "1<sup>er</sup> groupe, tu : <strong>mange</strong> — pas de -s à l'impératif (tu manges → mange)."
      },
      {
        sentence:    "(choisir) ___ votre place en silence, s'il vous plaît.",
        answers:     ["Choisissez", "choisissez"],
        explication: "2<sup>e</sup> groupe, vous : <strong>choisissez</strong> — même forme qu'au présent de l'indicatif."
      },
      {
        sentence:    "(chanter) ___ la chanson tous ensemble !",
        answers:     ["Chantons", "chantons"],
        explication: "1<sup>er</sup> groupe, nous : <strong>chantons</strong> — même forme qu'au présent de l'indicatif."
      },
      {
        sentence:    "(finir) ___ ton exercice avant la récréation.",
        answers:     ["Finis", "finis"],
        explication: "2<sup>e</sup> groupe, tu : <strong>finis</strong> — même forme qu'au présent de l'indicatif."
      },
      {
        sentence:    "(être) ___ attentifs pendant toute la leçon !",
        answers:     ["Soyez", "soyez"],
        explication: "Être, vous : <strong>soyez</strong> — forme irrégulière (à mémoriser)."
      },
      {
        sentence:    "(avoir) ___ confiance en vous !",
        answers:     ["Ayez", "ayez"],
        explication: "Avoir, vous : <strong>ayez</strong> — forme irrégulière (à mémoriser)."
      },
      {
        sentence:    "(aller) ___ te coucher, il est tard !",
        answers:     ["Va", "va"],
        explication: "Aller, tu : <strong>va</strong> — pas de -s (exception : va-s-y avec le pronom y)."
      },
      {
        sentence:    "Vous êtes prêts ? (avancer) ___ vers la sortie !",
        answers:     ["Avancez", "avancez"],
        explication: "1<sup>er</sup> groupe, vous : <strong>avancez</strong> — même forme qu'au présent."
      },
      {
        sentence:    "(prendre) ___ ton manteau, il fait froid dehors.",
        answers:     ["Prends", "prends"],
        explication: "3<sup>e</sup> groupe, tu : <strong>prends</strong> — forme irrégulière, avec -ds."
      },
      {
        sentence:    "(partir) ___ à l'aventure avant que la nuit tombe !",
        answers:     ["Partons", "partons"],
        explication: "3<sup>e</sup> groupe, nous : <strong>partons</strong> — même forme qu'au présent de l'indicatif."
      }
    ]
  },

  "conjuguer-conditionnel-present": {
    title:               "Conjuguer au conditionnel présent",
    levels:              ["6e"],
    type:                "cond-niveaux",
    questionsPerSession: 10,
    backLink:            { href: "français-conjugaison.html", label: "Conjugaison" },
    niveauxConfig: {
      rule:             "Conditionnel présent = radical du futur + terminaisons de l'imparfait (-<em>ais</em>, -<em>ais</em>, -<em>ait</em>, -<em>ions</em>, -<em>iez</em>, -<em>aient</em>)",
      lvDefs: [
        { lv: 1, icon: '⭐',   label: "Niveau 1 — Repère le conditionnel", desc: "Lis un texte, identifie les verbes au conditionnel présent" },
        { lv: 2, icon: '⭐⭐', label: "Niveau 2 — Complète au conditionnel", desc: "Conjugue des phrases à trous au conditionnel présent" }
      ],
      verb1Instruction: "Clique sur les verbes au <strong>conditionnel présent</strong>, puis valide.",
      verb1NotTarget:   "n'est pas au conditionnel présent",
      verb1TargetName:  "conditionnel",
      verb1FoundAll:    "Tu as trouvé tous les conditionnels !",
      verb2Instruction: "Conjugue le verbe au <strong>conditionnel présent</strong>.",
      lv2NextBtnLabel:  "Niveau 2 — Complète →",
      winMsg:           "Tu maîtrises le conditionnel présent aux deux niveaux !",
      simpleErrorFeedback: true
    },
    identTexts: [
      /* Texte 1 — La maison de rêve : conditionnels "achèterais", "aurait" ; imparfaits "rêvais", "préférait" */
      { tokens: [
        { t: "Si j'avais beaucoup d'argent, j'" },
        { t: "achèterais", v: true, pqp: true },
        { t: " une grande maison avec un jardin. Quand j'étais enfant, je " },
        { t: "rêvais", v: true, pqp: false },
        { t: " d'y habiter chaque soir. La maison " },
        { t: "aurait", v: true, pqp: true },
        { t: " une piscine et une bibliothèque. Mon frère " },
        { t: "préférait", v: true, pqp: false },
        { t: " un appartement en ville." }
      ]},
      /* Texte 2 — Le voyage imaginaire : "serait", "trouverait" ; "étudiaient", "publiaient" */
      { tokens: [
        { t: "D'après les explorateurs, cette île " },
        { t: "serait", v: true, pqp: true },
        { t: " magnifique. On y " },
        { t: "trouverait", v: true, pqp: true },
        { t: " des plantes inconnues. Les scientifiques " },
        { t: "étudiaient", v: true, pqp: false },
        { t: " la région depuis des années. Ils " },
        { t: "publiaient", v: true, pqp: false },
        { t: " leurs résultats chaque mois." }
      ]},
      /* Texte 3 — La météo : "neigerait", "descendraient" ; "s'inquiétaient", "préparaient" */
      { tokens: [
        { t: "Le journaliste annonça : « Il " },
        { t: "neigerait", v: true, pqp: true },
        { t: " ce week-end sur les sommets et les températures " },
        { t: "descendraient", v: true, pqp: true },
        { t: " sous zéro. » Les habitants " },
        { t: "s'inquiétaient", v: true, pqp: false },
        { t: " pour les routes. Ils " },
        { t: "préparaient", v: true, pqp: false },
        { t: " du bois pour se chauffer." }
      ]},
      /* Texte 4 — La fête : "aimeraient", "voudrait" ; "décoraient", "pensait" */
      { tokens: [
        { t: "Mes amis " },
        { t: "aimeraient", v: true, pqp: true },
        { t: " organiser une surprise pour mon anniversaire. Ils " },
        { t: "décoraient", v: true, pqp: false },
        { t: " la salle en secret chaque fois. Julia " },
        { t: "voudrait", v: true, pqp: true },
        { t: " inviter toute la classe. Elle " },
        { t: "pensait", v: true, pqp: false },
        { t: " à un thème différent." }
      ]}
    ],
    writeBank: [
      {
        sentence:    "Si j'avais des ailes, j'(aimer) ___ voler au-dessus des nuages.",
        answers:     ["aimerais"],
        explication: "1<sup>er</sup> groupe, je : <strong>aim-</strong> (radical futur) + <strong>-ais</strong> → <strong>aimerais</strong>."
      },
      {
        sentence:    "Avec un peu d'entraînement, tu (chanter) ___ encore mieux !",
        answers:     ["chanterais"],
        explication: "1<sup>er</sup> groupe, tu : <strong>chanter-</strong> + <strong>-ais</strong> → <strong>chanterais</strong>."
      },
      {
        sentence:    "Il (finir) ___ son travail bien plus vite avec de l'aide.",
        answers:     ["finirait"],
        explication: "2<sup>e</sup> groupe, il : <strong>finir-</strong> + <strong>-ait</strong> → <strong>finirait</strong>."
      },
      {
        sentence:    "Nous (voyager) ___ autour du monde si nous avions le temps.",
        answers:     ["voyagerions"],
        explication: "1<sup>er</sup> groupe, nous : <strong>voyager-</strong> + <strong>-ions</strong> → <strong>voyagerions</strong>."
      },
      {
        sentence:    "Vous (arriver) ___ à l'heure si vous partiez maintenant.",
        answers:     ["arriveriez"],
        explication: "1<sup>er</sup> groupe, vous : <strong>arriver-</strong> + <strong>-iez</strong> → <strong>arriveriez</strong>."
      },
      {
        sentence:    "Elles (choisir) ___ le menu si on leur demandait.",
        answers:     ["choisiraient"],
        explication: "2<sup>e</sup> groupe, elles : <strong>choisir-</strong> + <strong>-aient</strong> → <strong>choisiraient</strong>."
      },
      {
        sentence:    "Sans la pluie, ce (être) ___ la journée parfaite.",
        answers:     ["serait"],
        explication: "Être, il/ce : radical irrégulier <strong>ser-</strong> + <strong>-ait</strong> → <strong>serait</strong>."
      },
      {
        sentence:    "Elle (avoir) ___ peur si elle voyait une araignée géante.",
        answers:     ["aurait"],
        explication: "Avoir, elle : radical irrégulier <strong>aur-</strong> + <strong>-ait</strong> → <strong>aurait</strong>."
      },
      {
        sentence:    "Tu (aller) ___ jouer dehors si le soleil revenait.",
        answers:     ["irais"],
        explication: "Aller, tu : radical irrégulier <strong>ir-</strong> + <strong>-ais</strong> → <strong>irais</strong>."
      },
      {
        sentence:    "Nous (faire) ___ un gâteau si nous avions assez d'œufs.",
        answers:     ["ferions"],
        explication: "Faire, nous : radical irrégulier <strong>fer-</strong> + <strong>-ions</strong> → <strong>ferions</strong>."
      }
    ]
  },

  /* ── Accorder le verbe avec un sujet inversé ────────────────────────────── */
  "accord-verbe-sujet-inverse": {
    title: "Accorder le verbe avec un sujet inversé",
    levels: ["CM1", "CM2", "6e"],
    type: "sujet-inverse-niveaux",
    questionsPerSession: 6,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : Dans les questions ──────────────────────────────────────
       Inversion du sujet dans des phrases interrogatives.
       Tenses mélangés : présent / imparfait / futur.
       display format : [infinitif] marks the verb slot ; all other words are
       clickable ; subjectWords lists ALL tokens of the subject group.
       stem + answer[stem.length..] = answer (used to highlight the ending).
    ────────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      {
        display:       "Que [vouloir] tes amis ?",
        subjectWords:  ["tes", "amis"],
        tense:         "présent",
        answer:        "veulent",
        stem:          "veul",
        fullSentence:  "Que veulent tes amis ?"
      },
      {
        display:       "Quand [partir] les invités ?",
        subjectWords:  ["les", "invités"],
        tense:         "futur",
        answer:        "partiront",
        stem:          "partir",
        fullSentence:  "Quand partiront les invités ?"
      },
      {
        display:       "Que [penser] les élèves de ce livre ?",
        subjectWords:  ["les", "élèves"],
        tense:         "présent",
        answer:        "pensent",
        stem:          "pens",
        fullSentence:  "Que pensent les élèves de ce livre ?"
      },
      {
        display:       "Où [aller] les enfants ?",
        subjectWords:  ["les", "enfants"],
        tense:         "imparfait",
        answer:        "allaient",
        stem:          "all",
        fullSentence:  "Où allaient les enfants ?"
      },
      {
        display:       "Comment [chanter] ce chœur ?",
        subjectWords:  ["ce", "chœur"],
        tense:         "imparfait",
        answer:        "chantait",
        stem:          "chant",
        fullSentence:  "Comment chantait ce chœur ?"
      },
      {
        display:       "Quand [rentrer] ta sœur ?",
        subjectWords:  ["ta", "sœur"],
        tense:         "futur",
        answer:        "rentrera",
        stem:          "rentrer",
        fullSentence:  "Quand rentrera ta sœur ?"
      }
    ],

    /* ── Niveau 2 : Incises et tournures ────────────────────────────────────
       Inversion dans les incises de dialogue et après un adverbe / complément
       en tête de phrase. Pièges : sujet éloigné du verbe, sujet pluriel.
    ────────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      {
        display:       "— Attention ! [crier] les enfants .",
        subjectWords:  ["les", "enfants"],
        tense:         "présent",
        answer:        "crient",
        stem:          "cri",
        fullSentence:  "— Attention ! crient les enfants ."
      },
      {
        display:       "— On se reverra ! [promettre] les deux amis .",
        subjectWords:  ["les", "deux", "amis"],
        tense:         "futur",
        answer:        "promettront",
        stem:          "promettr",
        fullSentence:  "— On se reverra ! promettront les deux amis ."
      },
      {
        display:       "— Bonne nuit ! [murmurer] le groupe .",
        subjectWords:  ["le", "groupe"],
        tense:         "imparfait",
        answer:        "murmurait",
        stem:          "murmur",
        fullSentence:  "— Bonne nuit ! murmurait le groupe ."
      },
      {
        display:       "Sur la branche [chanter] deux oiseaux .",
        subjectWords:  ["deux", "oiseaux"],
        tense:         "imparfait",
        answer:        "chantaient",
        stem:          "chant",
        fullSentence:  "Sur la branche chantaient deux oiseaux ."
      },
      {
        display:       "Peut-être [arriver] ses cousins ce soir .",
        subjectWords:  ["ses", "cousins"],
        tense:         "futur",
        answer:        "arriveront",
        stem:          "arriver",
        fullSentence:  "Peut-être arriveront ses cousins ce soir ."
      },
      {
        display:       "Ainsi [parler] autrefois les anciens .",
        subjectWords:  ["les", "anciens"],
        tense:         "imparfait",
        answer:        "parlaient",
        stem:          "parl",
        fullSentence:  "Ainsi parlaient autrefois les anciens ."
      }
    ]
  },

  /* ────────────────────────────────────────────────────────────────────────
     DIFFÉRENCIER ÉPITHÈTE ET ATTRIBUT DU SUJET
     Type : epithete-attribut-niveaux
     Niveau 1 — Verbe d'état ou verbe d'action ? (8 phrases, choix binaire)
     Niveau 2 — Épithète ou attribut ? (10 phrases, 2 étapes par phrase)
     Niveau 3 — Transforme ! (6 phrases, saisie libre)
  ─────────────────────────────────────────────────────────────────────────── */

  "differencier-epithete-attribut": {
    title:   "Différencier l'adjectif épithète et l'attribut du sujet",
    levels:  ["CM2", "6e"],
    type:    "epithete-attribut-niveaux",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : Verbe d'état ou verbe d'action ? ────────────────────────
       isStateVerb : true = verbe d'état (être, paraître, sembler, devenir,
                             rester, demeurer, avoir l'air)
       verb        : forme du verbe à mettre en évidence dans la phrase
    ──────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      { sentence: "Le ciel semble menaçant.",
        verb: "semble", isStateVerb: true,
        feedback: "« Semble » est un verbe d'état : il relie l'adjectif « menaçant » au sujet « le ciel »." },
      { sentence: "Le chien court vite.",
        verb: "court", isStateVerb: false,
        feedback: "« Court » est un verbe d'action : il exprime ce que fait le chien (courir)." },
      { sentence: "Cette fille devient grande.",
        verb: "devient", isStateVerb: true,
        feedback: "« Devient » est un verbe d'état : il exprime un changement d'état et relie « grande » au sujet." },
      { sentence: "Le professeur explique la leçon.",
        verb: "explique", isStateVerb: false,
        feedback: "« Explique » est un verbe d'action : il décrit ce que fait le professeur." },
      { sentence: "Le chat a l'air endormi.",
        verb: "a l'air", isStateVerb: true,
        feedback: "Piège ! « Avoir l'air » est un verbe d'état : il relie « endormi » au sujet « le chat ». Ne pas confondre avec le verbe « avoir » seul." },
      { sentence: "La rose paraît fragile.",
        verb: "paraît", isStateVerb: true,
        feedback: "« Paraît » est un verbe d'état : il relie l'adjectif « fragile » au sujet « la rose »." },
      { sentence: "Les enfants jouent dans la cour.",
        verb: "jouent", isStateVerb: false,
        feedback: "« Jouent » est un verbe d'action : il exprime ce que font les enfants." },
      { sentence: "Il reste silencieux toute la journée.",
        verb: "reste", isStateVerb: true,
        feedback: "« Reste » est un verbe d'état : il exprime la continuité d'un état et relie « silencieux » au sujet." }
    ],

    /* ── Niveau 2 : Épithète ou attribut ? ─────────────────────────────────
       adjective      : adjectif surligné
       hasStateVerb   : true si un verbe d'état relie l'adjectif au sujet
       stateVerb      : verbe d'état (null si hasStateVerb = false)
       stateVerbChoices : [verbe correct, ...distracteurs] (pour le clic)
       nature         : "epithete" | "attribut"
       subject        : groupe sujet (pour l'animation attribut)
       noun           : nom noyau (pour l'animation épithète)
    ──────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      { sentence: "Le vieux chat dort sur le canapé.",
        adjective: "vieux", hasStateVerb: false, stateVerb: null,
        stateVerbChoices: [], nature: "epithete",
        subject: "Le vieux chat", noun: "chat",
        feedbackEpithete: "« Vieux » est épithète : il est directement collé au nom « chat » sans verbe d'état.",
        feedbackAttribut: "" },
      { sentence: "Ma sœur semble triste.",
        adjective: "triste", hasStateVerb: true, stateVerb: "semble",
        stateVerbChoices: ["semble", "triste", "Ma sœur"],
        nature: "attribut", subject: "Ma sœur", noun: null,
        feedbackAttribut: "« Triste » est attribut : le verbe d'état « semble » relie l'adjectif au sujet « ma sœur ».",
        feedbackEpithete: "" },
      { sentence: "Le petit chien blanc aboie.",
        adjective: "blanc", hasStateVerb: false, stateVerb: null,
        stateVerbChoices: [], nature: "epithete",
        subject: "Le petit chien blanc", noun: "chien",
        feedbackEpithete: "« Blanc » est épithète (même éloigné du nom) : pas de verbe d'état — l'adjectif fait partie du groupe nominal.",
        feedbackAttribut: "" },
      { sentence: "Le ciel est bleu.",
        adjective: "bleu", hasStateVerb: true, stateVerb: "est",
        stateVerbChoices: ["est", "bleu", "Le ciel"],
        nature: "attribut", subject: "Le ciel", noun: null,
        feedbackAttribut: "« Bleu » est attribut : le verbe d'état « est » relie l'adjectif « bleu » au sujet « le ciel ».",
        feedbackEpithete: "" },
      { sentence: "L'élève studieux paraît fatigué.",
        adjective: "fatigué", hasStateVerb: true, stateVerb: "paraît",
        stateVerbChoices: ["paraît", "studieux", "fatigué"],
        nature: "attribut", subject: "L'élève studieux", noun: null,
        feedbackAttribut: "« Fatigué » est attribut du sujet « l'élève » via le verbe d'état « paraît ». (Piège : « studieux » est épithète — il y a les deux dans cette phrase !)",
        feedbackEpithete: "" },
      { sentence: "Un homme grand traversait la rue.",
        adjective: "grand", hasStateVerb: false, stateVerb: null,
        stateVerbChoices: [], nature: "epithete",
        subject: "Un homme grand", noun: "homme",
        feedbackEpithete: "« Grand » est épithète : il appartient au groupe nominal de « homme » sans verbe d'état.",
        feedbackAttribut: "" },
      { sentence: "La fleur reste belle même en hiver.",
        adjective: "belle", hasStateVerb: true, stateVerb: "reste",
        stateVerbChoices: ["reste", "belle", "La fleur"],
        nature: "attribut", subject: "La fleur", noun: null,
        feedbackAttribut: "« Belle » est attribut : le verbe d'état « reste » relie l'adjectif au sujet « la fleur ».",
        feedbackEpithete: "" },
      { sentence: "Les feuilles tombées couvrent le sol.",
        adjective: "tombées", hasStateVerb: false, stateVerb: null,
        stateVerbChoices: [], nature: "epithete",
        subject: "Les feuilles tombées", noun: "feuilles",
        feedbackEpithete: "Piège ! « Tombées » est un participe passé employé comme adjectif épithète : il qualifie « feuilles » sans verbe d'état.",
        feedbackAttribut: "" },
      { sentence: "Cette histoire est passionnante.",
        adjective: "passionnante", hasStateVerb: true, stateVerb: "est",
        stateVerbChoices: ["est", "passionnante", "Cette histoire"],
        nature: "attribut", subject: "Cette histoire", noun: null,
        feedbackAttribut: "« Passionnante » est attribut du sujet « cette histoire » via le verbe d'état « est ».",
        feedbackEpithete: "" },
      { sentence: "Le courageux chevalier avance.",
        adjective: "courageux", hasStateVerb: false, stateVerb: null,
        stateVerbChoices: [], nature: "epithete",
        subject: "Le courageux chevalier", noun: "chevalier",
        feedbackEpithete: "« Courageux » est épithète antéposé : il est placé avant le nom « chevalier » sans verbe d'état.",
        feedbackAttribut: "" }
    ],

    /* ── Niveau 3 : Transformer ─────────────────────────────────────────────
       direction        : "epithete-to-attribute" | "attribute-to-epithet"
       adjective        : forme dans la phrase originale
       adjectiveForms   : toutes les formes acceptées (m/f/s/p) après normalisation
       acceptedAnswers  : liste de réponses exactes acceptées
    ──────────────────────────────────────────────────────────────────────── */
    lvl3Bank: [
      { original:    "Le chien joyeux aboie.",
        direction:   "epithete-to-attribute",
        adjective:   "joyeux",
        adjectiveForms: ["joyeux", "joyeuse", "joyeuses"],
        instruction: "Réécris la phrase en utilisant l'adjectif comme <strong>attribut du sujet</strong> (avec un verbe d'état).",
        example:     "Le chien est joyeux.",
        acceptedAnswers: [
          "Le chien est joyeux.", "Le chien semble joyeux.",
          "Le chien paraît joyeux.", "Le chien reste joyeux.",
          "Le chien devient joyeux.", "Le chien a l'air joyeux.",
          "Le chien demeure joyeux."
        ]
      },
      { original:    "La lune brillante éclaire la nuit.",
        direction:   "epithete-to-attribute",
        adjective:   "brillante",
        adjectiveForms: ["brillant", "brillante", "brillants", "brillantes"],
        instruction: "Réécris la phrase en utilisant l'adjectif comme <strong>attribut du sujet</strong>.",
        example:     "La lune est brillante.",
        acceptedAnswers: [
          "La lune est brillante.", "La lune paraît brillante.",
          "La lune semble brillante.", "La lune reste brillante.",
          "La lune demeure brillante."
        ]
      },
      { original:    "Un garçon courageux se défend.",
        direction:   "epithete-to-attribute",
        adjective:   "courageux",
        adjectiveForms: ["courageux", "courageuse", "courageux", "courageuses"],
        instruction: "Réécris la phrase en utilisant l'adjectif comme <strong>attribut du sujet</strong>.",
        example:     "Le garçon est courageux.",
        acceptedAnswers: [
          "Le garçon est courageux.", "Il est courageux.",
          "Le garçon semble courageux.", "Le garçon paraît courageux.",
          "Le garçon reste courageux.", "Un garçon est courageux.",
          "Ce garçon est courageux."
        ]
      },
      { original:    "Le chat semble fatigué.",
        direction:   "attribute-to-epithet",
        adjective:   "fatigué",
        adjectiveForms: ["fatigue", "fatigué", "fatiguee", "fatiguée", "fatigues", "fatigués", "fatiguees", "fatiguées"],
        instruction: "Réécris la phrase en utilisant l'adjectif comme <strong>épithète</strong> (colle-le au nom, sans verbe d'état).",
        example:     "Le chat fatigué dort.",
        acceptedAnswers: [
          "Le chat fatigué dort.", "Le chat fatigué mange.",
          "Le chat fatigué se repose.", "Le chat fatigué ronronne.",
          "Le chat fatigué reste immobile.", "Le chat fatigué bâille.",
          "Le chat fatigué ferme les yeux.", "Un chat fatigué dort."
        ]
      },
      { original:    "Le ciel est sombre.",
        direction:   "attribute-to-epithet",
        adjective:   "sombre",
        adjectiveForms: ["sombre", "sombres"],
        instruction: "Réécris la phrase en utilisant l'adjectif comme <strong>épithète</strong>.",
        example:     "Le ciel sombre menace.",
        acceptedAnswers: [
          "Le ciel sombre menace.", "Le ciel sombre s'étend.",
          "Le ciel sombre annonce la pluie.", "Le ciel sombre couvre la ville.",
          "Le ciel sombre inquiète.", "Le ciel sombre pèse sur la ville.",
          "Un ciel sombre annonce l'orage.", "Un ciel sombre menace."
        ]
      },
      { original:    "Ma sœur semble triste.",
        direction:   "attribute-to-epithet",
        adjective:   "triste",
        adjectiveForms: ["triste", "tristes"],
        instruction: "Réécris la phrase en utilisant l'adjectif comme <strong>épithète</strong>.",
        example:     "Ma sœur triste pleure.",
        acceptedAnswers: [
          "Ma sœur triste pleure.", "Ma sœur triste soupire.",
          "Ma sœur triste ne parle plus.", "La sœur triste pleure.",
          "Une sœur triste pleure.", "Ma sœur triste s'isole.",
          "Ma sœur triste reste seule.", "Ma sœur triste boudait."
        ]
      }
    ]
  },

  /* ════════════════════════════════════════════════════════════════════════
     Exercice : Distinguer adjectif épithète et complément du nom
     Niveau 1 — Trouve l'expansion du nom (8 GNs, mots cliquables)
     Niveau 2 — Épithète ou complément du nom ? (10 items, 2 étapes)
     Niveau 3 — Transforme ! (6 items, saisie libre, validation souple)
  ═════════════════════════════════════════════════════════════════════════ */

  "distinguer-epithete-complement-nom": {
    title:   "Distinguer l'adjectif épithète et le complément du nom",
    levels:  ["6e"],
    type:    "ecn-niveaux",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : Trouve l'expansion du nom ────────────────────────────
       words        : mots du GN (tous cliquables)
       noyauIdx     : index du nom-noyau dans words[]
       expansionIdx : indices des mots formant l'expansion
       type         : "epithete" | "complement-nom"
       feedback     : explication affichée après validation
    ──────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      { words: ["le", "vélo", "rouge"],
        noyauIdx: 1, expansionIdx: [2], type: "epithete",
        feedback: "« Vélo » est le nom-noyau. « Rouge » est un adjectif épithète : directement accolé au nom, il le précise sans préposition." },
      { words: ["le", "vélo", "de", "course"],
        noyauIdx: 1, expansionIdx: [2, 3], type: "complement-nom",
        feedback: "« Vélo » est le nom-noyau. « De course » est un complément du nom : la préposition « de » introduit le groupe qui précise le vélo." },
      { words: ["une", "belle", "maison"],
        noyauIdx: 2, expansionIdx: [1], type: "epithete",
        feedback: "« Maison » est le nom-noyau. « Belle » est un adjectif épithète : même placé avant le nom, il lui est directement rattaché — pas de préposition." },
      { words: ["le", "chien", "du", "voisin"],
        noyauIdx: 1, expansionIdx: [2, 3], type: "complement-nom",
        feedback: "« Chien » est le nom-noyau. « Du voisin » est un complément du nom. Attention : « du » = « de + le » — une préposition est bien présente !" },
      { words: ["un", "livre", "passionnant"],
        noyauIdx: 1, expansionIdx: [2], type: "epithete",
        feedback: "« Livre » est le nom-noyau. « Passionnant » est un adjectif épithète : il qualifie le livre directement, sans préposition." },
      { words: ["la", "table", "en", "bois"],
        noyauIdx: 1, expansionIdx: [2, 3], type: "complement-nom",
        feedback: "« Table » est le nom-noyau. « En bois » est un complément du nom introduit par la préposition « en »." },
      { words: ["un", "enfant", "courageux"],
        noyauIdx: 1, expansionIdx: [2], type: "epithete",
        feedback: "« Enfant » est le nom-noyau. « Courageux » est un adjectif épithète : il qualifie directement l'enfant, sans préposition." },
      { words: ["un", "terrain", "de", "sport"],
        noyauIdx: 1, expansionIdx: [2, 3], type: "complement-nom",
        feedback: "« Terrain » est le nom-noyau. « De sport » est un complément du nom introduit par la préposition « de »." }
    ],

    /* ── Niveau 2 : Épithète ou complément du nom ? ──────────────────────
       gn           : groupe nominal affiché
       gnWords      : mots du GN
       noyauIdx     : index du nom-noyau dans gnWords[]
       expansion    : texte de l'expansion
       expansionIdx : indices de l'expansion dans gnWords[]
       hasPrep      : true si l'expansion est introduite par une préposition
       prepText     : préposition telle qu'elle apparaît (ex. "du", "des", "en")
       prepIdx      : index du mot-préposition dans gnWords[]
       prepReal     : forme développée (ex. "de + le")
       isMerged     : true si du/des (préposition fusionnée avec article)
       nature       : "epithete" | "complement-nom"
       feedbackPrep : explication de l'étape préposition
       feedbackFinal: explication finale
    ──────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      { gn: "le manteau bleu",
        gnWords: ["le", "manteau", "bleu"], noyauIdx: 1,
        expansion: "bleu", expansionIdx: [2],
        hasPrep: false, prepText: null, prepIdx: -1, prepReal: null, isMerged: false,
        nature: "epithete",
        feedbackPrep: "Aucune préposition : « bleu » est un adjectif directement collé au nom.",
        feedbackFinal: "« Bleu » est un <strong>adjectif épithète</strong> : il s'accorde avec « manteau » (masc. sing.) et y est directement rattaché, sans préposition." },

      { gn: "la maison du quartier",
        gnWords: ["la", "maison", "du", "quartier"], noyauIdx: 1,
        expansion: "du quartier", expansionIdx: [2, 3],
        hasPrep: true, prepText: "du", prepIdx: 2, prepReal: "de + le", isMerged: true,
        nature: "complement-nom",
        feedbackPrep: "Piège classique ! « du » = « de + le » : la préposition « de » est fusionnée avec l'article « le ». Il y a bien une préposition !",
        feedbackFinal: "« Du quartier » est un <strong>complément du nom</strong> introduit par la préposition « de » cachée dans « du » (de + le)." },

      { gn: "un enfant sage",
        gnWords: ["un", "enfant", "sage"], noyauIdx: 1,
        expansion: "sage", expansionIdx: [2],
        hasPrep: false, prepText: null, prepIdx: -1, prepReal: null, isMerged: false,
        nature: "epithete",
        feedbackPrep: "Aucune préposition : « sage » est un adjectif collé directement au nom.",
        feedbackFinal: "« Sage » est un <strong>adjectif épithète</strong> : il qualifie l'enfant directement, sans préposition." },

      { gn: "une robe sans manches",
        gnWords: ["une", "robe", "sans", "manches"], noyauIdx: 1,
        expansion: "sans manches", expansionIdx: [2, 3],
        hasPrep: true, prepText: "sans", prepIdx: 2, prepReal: "sans", isMerged: false,
        nature: "complement-nom",
        feedbackPrep: "Oui ! « sans » est une préposition qui introduit le groupe « sans manches ».",
        feedbackFinal: "« Sans manches » est un <strong>complément du nom</strong> introduit par la préposition « sans »." },

      { gn: "le petit vélo de course",
        gnWords: ["le", "petit", "vélo", "de", "course"], noyauIdx: 2,
        expansion: "de course", expansionIdx: [3, 4],
        hasPrep: true, prepText: "de", prepIdx: 3, prepReal: "de", isMerged: false,
        nature: "complement-nom",
        feedbackPrep: "Oui ! « de » est une préposition qui introduit « de course ».",
        feedbackFinal: "« De course » est un <strong>complément du nom</strong>. 🔍 Bonus : dans ce GN, « petit » est aussi une expansion — mais c'est un adjectif épithète ! Ce GN a donc deux expansions de natures différentes." },

      { gn: "une belle maison",
        gnWords: ["une", "belle", "maison"], noyauIdx: 2,
        expansion: "belle", expansionIdx: [1],
        hasPrep: false, prepText: null, prepIdx: -1, prepReal: null, isMerged: false,
        nature: "epithete",
        feedbackPrep: "Aucune préposition : « belle » est un adjectif, même s'il est placé avant le nom.",
        feedbackFinal: "Piège : même placé <em>avant</em> le nom, « belle » reste un <strong>adjectif épithète</strong>. La position (avant ou après) ne change pas sa nature." },

      { gn: "le sac de sport",
        gnWords: ["le", "sac", "de", "sport"], noyauIdx: 1,
        expansion: "de sport", expansionIdx: [2, 3],
        hasPrep: true, prepText: "de", prepIdx: 2, prepReal: "de", isMerged: false,
        nature: "complement-nom",
        feedbackPrep: "Oui ! « de » est une préposition qui introduit « de sport ».",
        feedbackFinal: "« De sport » est un <strong>complément du nom</strong> introduit par la préposition « de »." },

      { gn: "des chaussures confortables",
        gnWords: ["des", "chaussures", "confortables"], noyauIdx: 1,
        expansion: "confortables", expansionIdx: [2],
        hasPrep: false, prepText: null, prepIdx: -1, prepReal: null, isMerged: false,
        nature: "epithete",
        feedbackPrep: "Aucune préposition : « confortables » est un adjectif directement accolé au nom.",
        feedbackFinal: "« Confortables » est un <strong>adjectif épithète</strong> : il qualifie les chaussures et s'accorde en genre et en nombre (fém. plur.)." },

      { gn: "la voiture des voisins",
        gnWords: ["la", "voiture", "des", "voisins"], noyauIdx: 1,
        expansion: "des voisins", expansionIdx: [2, 3],
        hasPrep: true, prepText: "des", prepIdx: 2, prepReal: "de + les", isMerged: true,
        nature: "complement-nom",
        feedbackPrep: "Piège ! « des » = « de + les » : la préposition « de » est fusionnée avec l'article « les ». Il y a bien une préposition !",
        feedbackFinal: "« Des voisins » est un <strong>complément du nom</strong> introduit par la préposition « de » cachée dans « des » (de + les)." },

      { gn: "un livre passionnant",
        gnWords: ["un", "livre", "passionnant"], noyauIdx: 1,
        expansion: "passionnant", expansionIdx: [2],
        hasPrep: false, prepText: null, prepIdx: -1, prepReal: null, isMerged: false,
        nature: "epithete",
        feedbackPrep: "Aucune préposition : « passionnant » est un adjectif directement accolé au nom.",
        feedbackFinal: "« Passionnant » est un <strong>adjectif épithète</strong> : il qualifie le livre sans préposition." }
    ],

    /* ── Niveau 3 : Transforme ──────────────────────────────────────────
       direction      : "cdn-to-epithete" | "epithete-to-cdn"
       original       : GN d'origine
       highlight      : expansion à mettre en évidence dans l'original
       prompt         : GN avec ___ (l'élève tape l'expansion seule)
       acceptedAnswers: formes correctes acceptées (expansion seule, après normalisation)
       example        : exemple de bonne réponse
       feedback       : explication en cas d'erreur
    ──────────────────────────────────────────────────────────────────────── */
    lvl3Bank: [
      { direction: "cdn-to-epithete",
        original: "une journée de pluie", highlight: "de pluie",
        prompt: "une journée ___",
        acceptedAnswers: ["pluvieuse", "tres pluvieuse", "bien pluvieuse"],
        example: "une journée pluvieuse",
        feedback: "Le CDN « de pluie » devient l'adjectif épithète « pluvieuse » — pense à accorder l'adjectif avec le nom (féminin singulier)." },

      { direction: "epithete-to-cdn",
        original: "la pollution terrestre", highlight: "terrestre",
        prompt: "la pollution ___",
        acceptedAnswers: ["de la Terre", "de la terre", "de notre planete", "de notre planète", "du monde", "de la planete", "de la planète"],
        example: "la pollution de la Terre",
        feedback: "L'adjectif épithète « terrestre » devient un complément du nom : introduis un groupe prépositionnel (« de la Terre », « de notre planète »…)." },

      { direction: "cdn-to-epithete",
        original: "un ciel d'orage", highlight: "d'orage",
        prompt: "un ciel ___",
        acceptedAnswers: ["orageux", "tres orageux", "bien orageux"],
        example: "un ciel orageux",
        feedback: "Le CDN « d'orage » devient l'adjectif épithète « orageux » — masculin singulier, accord avec « ciel »." },

      { direction: "epithete-to-cdn",
        original: "une manifestation étudiante", highlight: "étudiante",
        prompt: "une manifestation ___",
        acceptedAnswers: ["d'etudiants", "d'étudiants", "des etudiants", "des étudiants"],
        example: "une manifestation d'étudiants",
        feedback: "L'adjectif épithète « étudiante » devient un complément du nom : introduis un groupe prépositionnel (« d'étudiants »)." },

      { direction: "cdn-to-epithete",
        original: "une recette de famille", highlight: "de famille",
        prompt: "une recette ___",
        acceptedAnswers: ["familiale", "tres familiale", "bien familiale"],
        example: "une recette familiale",
        feedback: "Le CDN « de famille » devient l'adjectif épithète « familiale » — féminin singulier, accord avec « recette »." },

      { direction: "cdn-to-epithete",
        original: "une autorisation des parents", highlight: "des parents",
        prompt: "une autorisation ___",
        acceptedAnswers: ["parentale", "tres parentale"],
        example: "une autorisation parentale",
        feedback: "Le CDN « des parents » (des = de + les) devient l'adjectif épithète « parentale » — féminin singulier, accord avec « autorisation »." }
    ]
  },

  /* ═══════════════════════════════════════════════════════════════════════
     Distinguer pronom personnel sujet / pronom personnel complément
     CM2 / 6e — 3 niveaux déverrouillables
  ════════════════════════════════════════════════════════════════════════ */
  "distinguer-pronom-sujet-complement": {
    title: "Distinguer le pronom personnel sujet et le pronom personnel complément",
    levels: ["CM2", "6e"],
    type: "psc-niveaux",
    questionsPerSession: 10,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : cliquer sur le pronom sujet ─────────────────────────
       wordTypes[] : "subject" | "complement" | null pour chaque token
    ──────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      /* 1 — phrase-ancre : seul pronom = sujet */
      {
        words:    ["Ils", "jouent", "dans", "la", "cour", "."],
        wordTypes:["subject", null, null, null, null, null],
        testQ:    "Qui est-ce qui joue ?",
        testA:    "Ils",
        feedbackCorrect: "Exact ! <em>Qui est-ce qui joue ?</em> → <strong>Ils</strong>. C'est le pronom sujet.",
        note:     "📌 Le pronom sujet fait l'action et commande l'accord du verbe."
      },
      /* 2 — phrase-ancre : seul pronom = sujet */
      {
        words:    ["Elle", "adore", "le", "chocolat", "."],
        wordTypes:["subject", null, null, null, null],
        testQ:    "Qui est-ce qui adore ?",
        testA:    "Elle",
        feedbackCorrect: "Bravo ! <em>Qui est-ce qui adore ?</em> → <strong>Elle</strong>. C'est le pronom sujet.",
        note:     "📌 Le pronom sujet commande l'accord du verbe : elle adore (3ᵉ personne du singulier)."
      },
      /* 3 — piège : pronom complément avant le verbe */
      {
        words:    ["Il", "me", "regarde", "."],
        wordTypes:["subject", "complement", null, null],
        testQ:    "Qui est-ce qui regarde ?",
        testA:    "Il",
        feedbackCorrect: "Exact ! <em>Qui est-ce qui regarde ?</em> → <strong>Il</strong>. C'est le pronom sujet.",
        feedbackComplement: "⚠️ « me » est avant le verbe, mais c'est un pronom <em>complément</em> : Il regarde <em>qui ?</em> → me. La position ne suffit pas !",
        note:     "📌 Le pronom complément répond à « qui ? », « quoi ? » ou « à qui ? ». Il se place souvent avant le verbe, comme le sujet."
      },
      /* 4 — piège central : même forme nous / vous */
      {
        words:    ["Nous", "vous", "attendons", "."],
        wordTypes:["subject", "complement", null, null],
        testQ:    "Qui est-ce qui attend ?",
        testA:    "Nous",
        feedbackCorrect: "Exact ! <em>Qui est-ce qui attend ?</em> → <strong>Nous</strong>. C'est le pronom sujet.",
        feedbackComplement: "⚠️ « vous » a la même forme comme sujet ET comme complément. Ici c'est un pronom <em>complément</em> : On attend <em>qui ?</em> → vous. C'est le rôle dans la phrase, pas la forme, qui décide !",
        note:     "📌 Difficulté centrale : « nous » et « vous » ont la même forme sujet et complément. Seul le test <em>Qui est-ce qui + verbe ?</em> permet de trancher."
      },
      /* 5 — piège : « les » pronom vs article */
      {
        words:    ["Je", "les", "vois", "."],
        wordTypes:["subject", "complement", null, null],
        testQ:    "Qui est-ce qui voit ?",
        testA:    "Je",
        feedbackCorrect: "Bravo ! <em>Qui est-ce qui voit ?</em> → <strong>Je</strong>. C'est le pronom sujet.",
        feedbackComplement: "⚠️ « les » est ici un pronom <em>complément</em> (Je vois <em>qui ?</em> → les). À ne pas confondre avec « les » article comme dans « les enfants ».",
        note:     "📌 « le », « la », « les » peuvent être articles (devant un nom) ou pronoms compléments (à la place d'un nom)."
      },
      /* 6 — pronom complément indirect (lui) */
      {
        words:    ["Tu", "lui", "parles", "gentiment", "."],
        wordTypes:["subject", "complement", null, null, null],
        testQ:    "Qui est-ce qui parle ?",
        testA:    "Tu",
        feedbackCorrect: "Exact ! <em>Qui est-ce qui parle ?</em> → <strong>Tu</strong>. C'est le pronom sujet.",
        feedbackComplement: "⚠️ « lui » est un pronom <em>complément indirect</em> (Tu parles <em>à qui ?</em> → lui).",
        note:     "📌 « lui » complément répond à « à qui ? ». Ne pas le confondre avec un sujet."
      },
      /* 7 — piège : « leur » pronom vs déterminant possessif */
      {
        words:    ["On", "leur", "raconte", "une", "histoire", "."],
        wordTypes:["subject", "complement", null, null, null, null],
        testQ:    "Qui est-ce qui raconte ?",
        testA:    "On",
        feedbackCorrect: "Bravo ! <em>Qui est-ce qui raconte ?</em> → <strong>On</strong>. C'est le pronom sujet.",
        feedbackComplement: "⚠️ « leur » est ici un pronom <em>complément indirect</em> (On raconte <em>à qui ?</em> → leur). À ne pas confondre avec « leur maison » (déterminant possessif).",
        note:     "📌 « leur » pronom complément est invariable (On <em>leur</em> parle) ≠ « leur/leurs » déterminant qui s'accorde (leur maison / leurs maisons)."
      },
      /* 8 — piège : « vous » sujet, mais aussi possible complément */
      {
        words:    ["Vous", "m'", "écoutez", "attentivement", "."],
        wordTypes:["subject", "complement", null, null, null],
        testQ:    "Qui est-ce qui écoute ?",
        testA:    "Vous",
        feedbackCorrect: "Exact ! <em>Qui est-ce qui écoute ?</em> → <strong>Vous</strong>. C'est le pronom sujet.",
        feedbackComplement: "⚠️ « m' » (= me) est un pronom <em>complément</em> (Vous écoutez <em>qui ?</em> → m'). Le sujet est « Vous ».",
        note:     "📌 « vous » peut être sujet ou complément selon la phrase. Seul le test <em>Qui est-ce qui + verbe ?</em> permet de décider."
      }
    ],

    /* ── Niveau 2 : sujet ou complément ? (2 étapes par phrase) ─────────
       fn        : "subject" | "complement"
       highlightIdx : index dans words[] du pronom mis en évidence
    ──────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      /* 1 — piège position : pronom complément avant le verbe */
      {
        words: ["Je", "le", "vois", "chaque", "jour", "."],
        highlightIdx: 1, fn: "complement", verb: "vois",
        testQ: "Qui est-ce qui voit ?", testA: "Je",
        compQ: "Je vois qui ?", compA: "le",
        feedback: "« le » est avant le verbe comme un sujet, mais c'est un pronom <strong>complément</strong> : <em>Je vois qui ?</em> → <strong>le</strong>. La position avant le verbe ne suffit pas à identifier un sujet !",
        trap: "position"
      },
      /* 2 — piège nous / vous — côté sujet */
      {
        words: ["Nous", "vous", "attendons", "."],
        highlightIdx: 0, fn: "subject", verb: "attendons",
        testQ: "Qui est-ce qui attend ?", testA: "Nous",
        compQ: "Nous attendons qui ?", compA: "vous",
        feedback: "« nous » et « vous » ont la même forme comme sujet ET comme complément. Ici <em>Qui est-ce qui attend ?</em> → <strong>Nous</strong>. « Nous » commande l'accord du verbe : c'est le <strong>sujet</strong>.",
        trap: "nousVous"
      },
      /* 3 — piège nous / vous — côté complément */
      {
        words: ["Nous", "vous", "attendons", "."],
        highlightIdx: 1, fn: "complement", verb: "attendons",
        testQ: "Qui est-ce qui attend ?", testA: "Nous",
        compQ: "Nous attendons qui ?", compA: "vous",
        feedback: "Même si « vous » a la forme d'un sujet, ici c'est un pronom <strong>complément</strong> : <em>Nous attendons qui ?</em> → <strong>vous</strong>. C'est la <em>fonction</em>, pas la forme, qui décide !",
        trap: "nousVous"
      },
      /* 4 — complément indirect (te) */
      {
        words: ["Il", "te", "téléphone", "souvent", "."],
        highlightIdx: 1, fn: "complement", verb: "téléphone",
        testQ: "Qui est-ce qui téléphone ?", testA: "Il",
        compQ: "Il téléphone à qui ?", compA: "te",
        feedback: "« te » répond à « <em>à qui ?</em> » (Il téléphone à qui ? → <strong>te</strong>). C'est un pronom <strong>complément indirect</strong>.",
        trap: null
      },
      /* 5 — sujet simple */
      {
        words: ["Elle", "leur", "explique", "la", "leçon", "."],
        highlightIdx: 0, fn: "subject", verb: "explique",
        testQ: "Qui est-ce qui explique ?", testA: "Elle",
        compQ: "Elle explique à qui ?", compA: "leur",
        feedback: "<em>Qui est-ce qui explique ?</em> → <strong>Elle</strong>. C'est le pronom <strong>sujet</strong> qui commande l'accord du verbe.",
        trap: null
      },
      /* 6 — piège : « les » article vs pronom complément */
      {
        words: ["Tu", "les", "emmènes", "au", "cinéma", "."],
        highlightIdx: 1, fn: "complement", verb: "emmènes",
        testQ: "Qui est-ce qui emmène ?", testA: "Tu",
        compQ: "Tu emmènes qui ?", compA: "les",
        feedback: "« les » est ici un pronom <strong>complément</strong> : <em>Tu emmènes qui ?</em> → <strong>les</strong>. À ne pas confondre avec « les » article (« les enfants »).",
        trap: "lesArticle"
      },
      /* 7 — vous sujet (avec les complément) */
      {
        words: ["Vous", "les", "comprenez", "très", "bien", "."],
        highlightIdx: 0, fn: "subject", verb: "comprenez",
        testQ: "Qui est-ce qui comprend ?", testA: "Vous",
        compQ: "Vous comprenez qui ?", compA: "les",
        feedback: "<em>Qui est-ce qui comprend ?</em> → <strong>Vous</strong>. C'est le pronom <strong>sujet</strong>. « les » est le pronom complément.",
        trap: "nousVous"
      },
      /* 8 — piège : « leur » pronom vs déterminant possessif */
      {
        words: ["Il", "leur", "écrit", "une", "lettre", "."],
        highlightIdx: 1, fn: "complement", verb: "écrit",
        testQ: "Qui est-ce qui écrit ?", testA: "Il",
        compQ: "Il écrit à qui ?", compA: "leur",
        feedback: "« leur » est ici un pronom <strong>complément indirect</strong> : <em>Il écrit à qui ?</em> → <strong>leur</strong>. À ne pas confondre avec « leur maison » (déterminant possessif).",
        trap: "leurPossessif"
      },
      /* 9 — piège : « le » article vs pronom (sujet = GN, pas pronom) */
      {
        words: ["Le", "chat", "le", "regarde", "depuis", "la", "fenêtre", "."],
        highlightIdx: 2, fn: "complement", verb: "regarde",
        testQ: "Qui est-ce qui regarde ?", testA: "Le chat",
        compQ: "Le chat regarde qui ?", compA: "le",
        feedback: "« le » (3ᵉ mot) est un pronom <strong>complément</strong> : <em>Le chat regarde qui ?</em> → <strong>le</strong>. À ne pas confondre avec « Le » article dans « Le chat ».",
        trap: "leArticle"
      },
      /* 10 — vous complément (sujet = ils), piège nous/vous */
      {
        words: ["Ils", "vous", "ont", "vus", "hier", "."],
        highlightIdx: 1, fn: "complement", verb: "ont vus",
        testQ: "Qui est-ce qui a vu ?", testA: "Ils",
        compQ: "Ils ont vu qui ?", compA: "vous",
        feedback: "« vous » est ici un pronom <strong>complément</strong> : <em>Ils ont vu qui ?</em> → <strong>vous</strong>. Le sujet est « Ils ». Même si « vous » a la forme d'un sujet, ici il complète le verbe.",
        trap: "nousVous"
      }
    ],

    /* ── Niveau 3 : remplace par un pronom (saisie libre) ───────────────
       6 phrases tirées aléatoirement dans cette banque (localStorage anti-répétition)
    ──────────────────────────────────────────────────────────────────── */
    lvl3Bank: [
      /* 1 — remplacer le SUJET */
      {
        sentence:    "Marie regarde le film .",
        displayHtml: "<strong class='psc-replace-hl'>Marie</strong> regarde le film .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>sujet</strong> et réécris la phrase complète.",
        fn: "subject", group: "Marie", targetPronoun: "elle", verb: "regarde",
        solution: "Elle regarde le film .",
        answers:  ["elle regarde le film", "elle regarde le film ."],
        feedbackWrongPronoun: "Pour remplacer « Marie » (féminin singulier), le pronom sujet est « elle ».",
        feedbackBadPosition:  "Le pronom sujet se place avant le verbe, à la place du sujet.",
        feedbackGeneric:      "Réponse attendue : « Elle regarde le film. »"
      },
      /* 2 — remplacer le COMPLÉMENT */
      {
        sentence:    "Marie regarde le film .",
        displayHtml: "Marie regarde <strong class='psc-replace-hl'>le film</strong> .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>complément</strong> et réécris la phrase complète.",
        fn: "complement", group: "le film", targetPronoun: "le", verb: "regarde",
        solution: "Marie le regarde .",
        answers:  ["marie le regarde", "marie le regarde ."],
        feedbackWrongPronoun: "Pour remplacer « le film » (masculin singulier, complément direct), le pronom est « le ».",
        feedbackBadPosition:  "Le pronom complément se place AVANT le verbe : « Marie le regarde. »",
        feedbackGeneric:      "Réponse attendue : « Marie le regarde. »"
      },
      /* 3 — remplacer le SUJET (pluriel) */
      {
        sentence:    "Les enfants jouent dans la cour .",
        displayHtml: "<strong class='psc-replace-hl'>Les enfants</strong> jouent dans la cour .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>sujet</strong> et réécris la phrase complète.",
        fn: "subject", group: "Les enfants", targetPronoun: "ils", verb: "jouent",
        solution: "Ils jouent dans la cour .",
        answers:  ["ils jouent dans la cour", "ils jouent dans la cour ."],
        feedbackWrongPronoun: "Pour remplacer « Les enfants » (masculin pluriel), le pronom sujet est « ils ».",
        feedbackBadPosition:  "Le pronom sujet se place avant le verbe.",
        feedbackGeneric:      "Réponse attendue : « Ils jouent dans la cour. »"
      },
      /* 4 — remplacer le COMPLÉMENT indirect (lui) */
      {
        sentence:    "Paul téléphone à sa mère .",
        displayHtml: "Paul téléphone <strong class='psc-replace-hl'>à sa mère</strong> .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>complément</strong> et réécris la phrase complète.",
        fn: "complement", group: "à sa mère", targetPronoun: "lui", verb: "téléphone",
        solution: "Paul lui téléphone .",
        answers:  ["paul lui telephone", "paul lui téléphone", "paul lui téléphone ."],
        feedbackWrongPronoun: "Pour remplacer « à sa mère » (complément indirect, féminin singulier), le pronom est « lui ».",
        feedbackBadPosition:  "Le pronom complément se place AVANT le verbe : « Paul lui téléphone. »",
        feedbackGeneric:      "Réponse attendue : « Paul lui téléphone. »"
      },
      /* 5 — remplacer le SUJET (féminin) */
      {
        sentence:    "La maîtresse aide les élèves .",
        displayHtml: "<strong class='psc-replace-hl'>La maîtresse</strong> aide les élèves .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>sujet</strong> et réécris la phrase complète.",
        fn: "subject", group: "La maîtresse", targetPronoun: "elle", verb: "aide",
        solution: "Elle aide les élèves .",
        answers:  ["elle aide les eleves", "elle aide les élèves", "elle aide les élèves ."],
        feedbackWrongPronoun: "Pour remplacer « La maîtresse » (féminin singulier), le pronom sujet est « elle ».",
        feedbackBadPosition:  "Le pronom sujet se place avant le verbe.",
        feedbackGeneric:      "Réponse attendue : « Elle aide les élèves. »"
      },
      /* 6 — remplacer le COMPLÉMENT direct (les) */
      {
        sentence:    "Les enfants adorent les bonbons .",
        displayHtml: "Les enfants adorent <strong class='psc-replace-hl'>les bonbons</strong> .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>complément</strong> et réécris la phrase complète.",
        fn: "complement", group: "les bonbons", targetPronoun: "les", verb: "adorent",
        solution: "Les enfants les adorent .",
        answers:  ["les enfants les adorent", "les enfants les adorent ."],
        feedbackWrongPronoun: "Pour remplacer « les bonbons » (pluriel, complément direct), le pronom est « les ».",
        feedbackBadPosition:  "Le pronom complément se place AVANT le verbe : « Les enfants les adorent. »",
        feedbackGeneric:      "Réponse attendue : « Les enfants les adorent. »"
      },
      /* 7 — remplacer le COMPLÉMENT indirect (lui, féminin) */
      {
        sentence:    "Zoé envoie une lettre à son amie .",
        displayHtml: "Zoé envoie une lettre <strong class='psc-replace-hl'>à son amie</strong> .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>complément</strong> et réécris la phrase complète.",
        fn: "complement", group: "à son amie", targetPronoun: "lui", verb: "envoie",
        solution: "Zoé lui envoie une lettre .",
        answers:  ["zoe lui envoie une lettre", "zoé lui envoie une lettre", "zoé lui envoie une lettre ."],
        feedbackWrongPronoun: "Pour remplacer « à son amie » (complément indirect, féminin singulier), le pronom est « lui ».",
        feedbackBadPosition:  "Le pronom complément se place AVANT le verbe : « Zoé lui envoie une lettre. »",
        feedbackGeneric:      "Réponse attendue : « Zoé lui envoie une lettre. »"
      },
      /* 8 — remplacer le SUJET (nous) */
      {
        sentence:    "Mon frère et moi regardons la télévision .",
        displayHtml: "<strong class='psc-replace-hl'>Mon frère et moi</strong> regardons la télévision .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>sujet</strong> et réécris la phrase complète.",
        fn: "subject", group: "Mon frère et moi", targetPronoun: "nous", verb: "regardons",
        solution: "Nous regardons la télévision .",
        answers:  ["nous regardons la television", "nous regardons la télévision", "nous regardons la télévision ."],
        feedbackWrongPronoun: "Pour remplacer « Mon frère et moi » (1ʳᵉ personne du pluriel), le pronom sujet est « nous ».",
        feedbackBadPosition:  "Le pronom sujet se place avant le verbe.",
        feedbackGeneric:      "Réponse attendue : « Nous regardons la télévision. »"
      },
      /* 9 — remplacer le COMPLÉMENT direct (les, pluriel) */
      {
        sentence:    "La directrice félicite les élèves .",
        displayHtml: "La directrice félicite <strong class='psc-replace-hl'>les élèves</strong> .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>complément</strong> et réécris la phrase complète.",
        fn: "complement", group: "les élèves", targetPronoun: "les", verb: "félicite",
        solution: "La directrice les félicite .",
        answers:  ["la directrice les felicite", "la directrice les félicite", "la directrice les félicite ."],
        feedbackWrongPronoun: "Pour remplacer « les élèves » (pluriel, complément direct), le pronom est « les ».",
        feedbackBadPosition:  "Le pronom complément se place AVANT le verbe : « La directrice les félicite. »",
        feedbackGeneric:      "Réponse attendue : « La directrice les félicite. »"
      },
      /* 10 — remplacer le SUJET (ils, pluriel masculin) */
      {
        sentence:    "Les oiseaux chantent dans le jardin .",
        displayHtml: "<strong class='psc-replace-hl'>Les oiseaux</strong> chantent dans le jardin .",
        instruction: "Remplace le groupe en gras par le bon pronom <strong>sujet</strong> et réécris la phrase complète.",
        fn: "subject", group: "Les oiseaux", targetPronoun: "ils", verb: "chantent",
        solution: "Ils chantent dans le jardin .",
        answers:  ["ils chantent dans le jardin", "ils chantent dans le jardin ."],
        feedbackWrongPronoun: "Pour remplacer « Les oiseaux » (masculin pluriel), le pronom sujet est « ils ».",
        feedbackBadPosition:  "Le pronom sujet se place avant le verbe.",
        feedbackGeneric:      "Réponse attendue : « Ils chantent dans le jardin. »"
      }
    ]
  },

  /* ── ─────────────────────────────────────────────────────────────────────── */

  "remplacer-gn-sujet-pronom": {
    title: "Remplacer un groupe nominal sujet par un pronom personnel sujet",
    type: "gnsp-niveaux",
    levels: ["CM1", "CM2", "6e"],
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ════════════════════════════════════════════════════════════════════
       NIVEAU 1 — Trouve le groupe nominal sujet complet (8 phrases)
       gnsIndices = indices (dans `words`) qui composent le GNS entier
       ════════════════════════════════════════════════════════════════════ */
    lvl1Bank: [
      {
        words:      ["Le", "chat", "dort", "sur", "le", "canapé", "."],
        gnsIndices: [0, 1],
        verb:       "dort",
        testQ:      "Qui est-ce qui dort ?",
        testA:      "Le chat",
        note:       "Le GNS est « Le chat » : déterminant + nom-noyau."
      },
      {
        words:      ["La", "petite", "fille", "mange", "une", "pomme", "."],
        gnsIndices: [0, 1, 2],
        verb:       "mange",
        testQ:      "Qui est-ce qui mange ?",
        testA:      "La petite fille",
        note:       "Le GNS est « La petite fille » : il inclut l'adjectif « petite »."
      },
      {
        words:      ["Le", "grand", "chien", "de", "mon", "voisin", "aboie", "."],
        gnsIndices: [0, 1, 2, 3, 4, 5],
        verb:       "aboie",
        testQ:      "Qui est-ce qui aboie ?",
        testA:      "Le grand chien de mon voisin",
        note:       "Attention : le GNS entier est « Le grand chien de mon voisin ». Il faut prendre tout le groupe, y compris le complément du nom « de mon voisin », pas seulement le nom-noyau « chien »."
      },
      {
        words:      ["Les", "élèves", "de", "la", "classe", "écoutent", "la", "maîtresse", "."],
        gnsIndices: [0, 1, 2, 3, 4],
        verb:       "écoutent",
        testQ:      "Qui est-ce qui écoutent ?",
        testA:      "Les élèves de la classe",
        note:       "Le GNS « Les élèves de la classe » inclut le complément du nom « de la classe »."
      },
      {
        words:      ["Mon", "petit", "frère", "joue", "dans", "le", "jardin", "."],
        gnsIndices: [0, 1, 2],
        verb:       "joue",
        testQ:      "Qui est-ce qui joue ?",
        testA:      "Mon petit frère",
        note:       "Le GNS est « Mon petit frère »."
      },
      {
        words:      ["La", "vieille", "maison", "de", "mes", "grands-parents", "est", "magnifique", "."],
        gnsIndices: [0, 1, 2, 3, 4, 5],
        verb:       "est",
        testQ:      "Qui est-ce qui est magnifique ?",
        testA:      "La vieille maison de mes grands-parents",
        note:       "Le GNS complet « La vieille maison de mes grands-parents » comprend le déterminant, l'adjectif, le nom-noyau « maison » et son complément du nom « de mes grands-parents »."
      },
      {
        words:      ["Les", "oiseaux", "chantent", "dans", "les", "arbres", "."],
        gnsIndices: [0, 1],
        verb:       "chantent",
        testQ:      "Qui est-ce qui chantent ?",
        testA:      "Les oiseaux",
        note:       "Le GNS est « Les oiseaux »."
      },
      {
        words:      ["Le", "livre", "de", "mathématiques", "est", "sur", "la", "table", "."],
        gnsIndices: [0, 1, 2, 3],
        verb:       "est",
        testQ:      "Qui est-ce qui est sur la table ?",
        testA:      "Le livre de mathématiques",
        note:       "« de mathématiques » fait partie du GNS : c'est le complément du nom « livre »."
      }
    ],

    /* ════════════════════════════════════════════════════════════════════
       NIVEAU 2 — Quel pronom ? (10 items, 2 étapes : genre/nombre puis pronom)
       ════════════════════════════════════════════════════════════════════ */
    lvl2Bank: [
      {
        displayHtml: "<span class='psc-pronoun-hl'>La fillette</span> court dans la cour.",
        gnsText: "La fillette", noyau: "fillette",
        gender: "féminin", number: "singulier", pronoun: "elle",
        noyauNote: "Le nom-noyau du groupe est « fillette ».",
        trap: false
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Le grand chien de mon voisin</span> aboie toute la nuit.",
        gnsText: "Le grand chien de mon voisin", noyau: "chien",
        gender: "masculin", number: "singulier", pronoun: "il",
        noyauNote: "Le nom-noyau est « chien » (masculin singulier), et non « voisin » qui fait partie du complément du nom « de mon voisin ».",
        trap: true
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Les danseuses</span> montent sur scène.",
        gnsText: "Les danseuses", noyau: "danseuses",
        gender: "féminin", number: "pluriel", pronoun: "elles",
        noyauNote: "Le nom-noyau est « danseuses » (féminin pluriel).",
        trap: false
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Paul et Marie</span> arrivent en retard.",
        gnsText: "Paul et Marie", noyau: "Paul et Marie",
        gender: "masculin", number: "pluriel", pronoun: "ils",
        noyauNote: "« Paul » (masculin) et « Marie » (féminin) forment un groupe de genres mélangés : dès qu'il y a un nom masculin, on emploie « ils ».",
        trap: true
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Marie</span> chante très bien.",
        gnsText: "Marie", noyau: "Marie",
        gender: "féminin", number: "singulier", pronoun: "elle",
        noyauNote: "« Marie » est un nom propre féminin singulier.",
        trap: false
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Les enfants de la classe</span> jouent en récréation.",
        gnsText: "Les enfants de la classe", noyau: "enfants",
        gender: "masculin", number: "pluriel", pronoun: "ils",
        noyauNote: "Le nom-noyau est « enfants » (masculin pluriel) ; « de la classe » est complément du nom.",
        trap: true
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>La belle robe de ma mère</span> est accrochée dans l'armoire.",
        gnsText: "La belle robe de ma mère", noyau: "robe",
        gender: "féminin", number: "singulier", pronoun: "elle",
        noyauNote: "Le nom-noyau est « robe » (féminin singulier), pas « mère » qui est complément du nom.",
        trap: true
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Les Dupont</span> partent en vacances demain.",
        gnsText: "Les Dupont", noyau: "Dupont",
        gender: "masculin", number: "pluriel", pronoun: "ils",
        noyauNote: "« Les Dupont » désigne une famille (nom propre au pluriel) : on emploie « ils ».",
        trap: true
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Les roses du jardin</span> embaument toute la pièce.",
        gnsText: "Les roses du jardin", noyau: "roses",
        gender: "féminin", number: "pluriel", pronoun: "elles",
        noyauNote: "Le nom-noyau est « roses » (féminin pluriel) ; « du jardin » est complément du nom.",
        trap: true
      },
      {
        displayHtml: "<span class='psc-pronoun-hl'>Mon grand frère et sa meilleure amie</span> rentrent de l'école.",
        gnsText: "Mon grand frère et sa meilleure amie", noyau: "frère et amie",
        gender: "masculin", number: "pluriel", pronoun: "ils",
        noyauNote: "Le groupe contient un nom masculin (« frère ») et un nom féminin (« amie ») : genres mélangés → on emploie « ils ».",
        trap: true
      }
    ],

    /* ════════════════════════════════════════════════════════════════════
       NIVEAU 3 — Réécris la phrase (6 phrases, production écrite)
       ════════════════════════════════════════════════════════════════════ */
    lvl3Bank: [
      {
        sentence:    "Les enfants jouent dans le jardin .",
        displayHtml: "<span class='psc-pronoun-hl'>Les enfants</span> jouent dans le jardin .",
        gns: "Les enfants", pronoun: "Ils", verb: "jouent",
        solution: "Ils jouent dans le jardin .",
        answers:  ["ils jouent dans le jardin", "ils jouent dans le jardin ."],
        noteOk:   "« Les enfants » est masculin pluriel → « Ils »."
      },
      {
        sentence:    "La directrice de l'école parle aux parents .",
        displayHtml: "<span class='psc-pronoun-hl'>La directrice de l'école</span> parle aux parents .",
        gns: "La directrice de l'école", pronoun: "Elle", verb: "parle",
        solution: "Elle parle aux parents .",
        answers:  ["elle parle aux parents", "elle parle aux parents ."],
        noteOk:   "Le nom-noyau du GNS long est « directrice » (féminin singulier) → « Elle »."
      },
      {
        sentence:    "Paul et Marie chantent ensemble .",
        displayHtml: "<span class='psc-pronoun-hl'>Paul et Marie</span> chantent ensemble .",
        gns: "Paul et Marie", pronoun: "Ils", verb: "chantent",
        solution: "Ils chantent ensemble .",
        answers:  ["ils chantent ensemble", "ils chantent ensemble ."],
        noteOk:   "Genres mélangés (Paul masculin, Marie féminin) → « Ils »."
      },
      {
        sentence:    "Les danseuses montent sur scène .",
        displayHtml: "<span class='psc-pronoun-hl'>Les danseuses</span> montent sur scène .",
        gns: "Les danseuses", pronoun: "Elles", verb: "montent",
        solution: "Elles montent sur scène .",
        answers:  ["elles montent sur scene", "elles montent sur scène", "elles montent sur scène ."]
      },
      {
        sentence:    "Mon petit frère regarde un film .",
        displayHtml: "<span class='psc-pronoun-hl'>Mon petit frère</span> regarde un film .",
        gns: "Mon petit frère", pronoun: "Il", verb: "regarde",
        solution: "Il regarde un film .",
        answers:  ["il regarde un film", "il regarde un film ."]
      },
      {
        sentence:    "Les grands arbres du parc donnent de l'ombre .",
        displayHtml: "<span class='psc-pronoun-hl'>Les grands arbres du parc</span> donnent de l'ombre .",
        gns: "Les grands arbres du parc", pronoun: "Ils", verb: "donnent",
        solution: "Ils donnent de l'ombre .",
        answers:  ["ils donnent de l'ombre", "ils donnent de l ombre", "ils donnent de l'ombre ."],
        noteOk:   "Le nom-noyau du GNS long est « arbres » (masculin pluriel) → « Ils »."
      }
    ]
  }

};

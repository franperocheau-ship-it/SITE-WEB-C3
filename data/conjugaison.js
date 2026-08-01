/* ── data/conjugaison.js — Conjugaison (25 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "retrouver-infinitif-verbe-conjugue": {
    title: "Retrouver l'infinitif d'un verbe conjugué puis son groupe",
    domaine:    "Français",
    competence: "Conjugaison — Identifier l'infinitif et le groupe",
    levels: ["CM1", "CM2", "6e"],
    paliers: 1, /* nombre réel de paliers du moteur */
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

  "conjuguer-etre-present": {
    title: "Conjuguer le verbe être au présent",
    domaine:    "Français",
    competence: "Conjugaison — Être au présent",
    type:       "etre-present-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── les 6 formes de référence, utilisées comme distracteurs par le
       mode "matching" du niveau 1 ── */
    conjugationForms: [
      { subject: "Je",          answer: "suis"   },
      { subject: "Tu",          answer: "es"     },
      { subject: "Il / Elle",   answer: "est"    },
      { subject: "Nous",        answer: "sommes" },
      { subject: "Vous",        answer: "êtes"   },
      { subject: "Ils / Elles", answer: "sont"   }
    ],

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer,
       comme pour verbes-particuliers-niveaux. Niveau 2 = pronom donné,
       niveau 3 = sujet non pronominal (groupe nominal). */
    bank: [
      /* ── NIVEAU 1 : QCM (5) ── */
      { level: 1, mode: "mcq", subject: "je",   choices: ["suis", "est", "sommes", "êtes"], answer: "suis"   },
      { level: 1, mode: "mcq", subject: "tu",   choices: ["es", "est", "suis", "êtes"],      answer: "es"     },
      { level: 1, mode: "mcq", subject: "il",   choices: ["est", "es", "suis", "sont"],      answer: "est"    },
      { level: 1, mode: "mcq", subject: "nous", choices: ["sommes", "êtes", "sont", "est"],  answer: "sommes" },
      { level: 1, mode: "mcq", subject: "vous", choices: ["êtes", "sommes", "est", "sont"],  answer: "êtes"   },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", subject: "Elle",  answer: "est"    },
      { level: 1, mode: "matching", subject: "On",    answer: "est"    },
      { level: 1, mode: "matching", subject: "Ils",   answer: "sont"   },
      { level: 1, mode: "matching", subject: "Elles", answer: "sont"   },
      { level: 1, mode: "matching", subject: "Vous",  answer: "êtes"   },

      /* ── NIVEAU 2 : saisie libre, pronom donné (10) ── */
      { level: 2, infinitive: "être", sentence: "Je ________ à l'école.",               answer: "suis"   },
      { level: 2, infinitive: "être", sentence: "Tu ________ mon ami.",                 answer: "es"     },
      { level: 2, infinitive: "être", sentence: "Il ________ malade aujourd'hui.",      answer: "est"    },
      { level: 2, infinitive: "être", sentence: "Elle ________ contente de te voir.",   answer: "est"    },
      { level: 2, infinitive: "être", sentence: "On ________ en retard.",               answer: "est"    },
      { level: 2, infinitive: "être", sentence: "Nous ________ en classe de français.", answer: "sommes" },
      { level: 2, infinitive: "être", sentence: "Vous ________ très gentils avec moi.", answer: "êtes"   },
      { level: 2, infinitive: "être", sentence: "Ils ________ dans la cour.",           answer: "sont"   },
      { level: 2, infinitive: "être", sentence: "Elles ________ heureuses de partir.",  answer: "sont"   },
      { level: 2, infinitive: "être", sentence: "Je ________ prêt pour l'examen.",      answer: "suis"   },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal (10) ── */
      { level: 3, infinitive: "être", sentence: "Le chat ________ sur le mur.",               answer: "est"    },
      { level: 3, infinitive: "être", sentence: "Mes parents ________ contents.",             answer: "sont"   },
      { level: 3, infinitive: "être", sentence: "Léa et moi ________ prêts.",                 answer: "sommes" },
      { level: 3, infinitive: "être", sentence: "Toi et ton frère ________ en retard.",       answer: "êtes"   },
      { level: 3, infinitive: "être", sentence: "La maîtresse ________ absente demain.",      answer: "est"    },
      { level: 3, infinitive: "être", sentence: "Les enfants ________ dans la cour.",         answer: "sont"   },
      { level: 3, infinitive: "être", sentence: "Mon chien et moi ________ fatigués.",        answer: "sommes" },
      { level: 3, infinitive: "être", sentence: "Toi et tes amis ________ très bruyants.",    answer: "êtes"   },
      { level: 3, infinitive: "être", sentence: "Le ballon ________ crevé.",                  answer: "est"    },
      { level: 3, infinitive: "être", sentence: "Les fleurs du jardin ________ magnifiques.", answer: "sont"   }
    ]
  },

  "conjuguer-1er-groupe-present": {
    title: "Conjuguer les verbes réguliers du 1er groupe au présent",
    domaine:    "Français",
    competence: "Conjugaison — 1er groupe au présent",
    type:       "premier-groupe-present-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
         mode "mcq" : choices = 4 formes possibles du même verbe.
         mode "matching" : forms = formes distinctes du verbe (je et il/elle
         partagent la même forme pour un verbe du 1er groupe régulier, donc
         5 formes distinctes et non 6 comme pour être/avoir).
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer.
       Niveau 2 = pronom donné, niveau 3 = sujet non pronominal (GN). */
    bank: [
      /* ── NIVEAU 1 : QCM (5) ── */
      { level: 1, mode: "mcq", infinitive: "chanter",  subject: "je",   choices: ["chante", "chantes", "chantons", "chantez"], answer: "chante"  },
      { level: 1, mode: "mcq", infinitive: "jouer",     subject: "tu",   choices: ["joues", "joue", "jouons", "jouez"],          answer: "joues"   },
      { level: 1, mode: "mcq", infinitive: "regarder",  subject: "il",   choices: ["regarde", "regardes", "regardons", "regardent"], answer: "regarde" },
      { level: 1, mode: "mcq", infinitive: "parler",    subject: "nous", choices: ["parlons", "parlez", "parlent", "parle"],     answer: "parlons" },
      { level: 1, mode: "mcq", infinitive: "aimer",     subject: "vous", choices: ["aimez", "aimons", "aiment", "aime"],         answer: "aimez"   },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "danser",   subject: "Elle",  forms: ["danse", "danses", "dansons", "dansez", "dansent"],       answer: "danse"   },
      { level: 1, mode: "matching", infinitive: "marcher",  subject: "Nous",  forms: ["marche", "marches", "marchons", "marchez", "marchent"],   answer: "marchons" },
      { level: 1, mode: "matching", infinitive: "écouter",  subject: "Vous",  forms: ["écoute", "écoutes", "écoutons", "écoutez", "écoutent"],   answer: "écoutez" },
      { level: 1, mode: "matching", infinitive: "aimer",    subject: "Ils",   forms: ["aime", "aimes", "aimons", "aimez", "aiment"],             answer: "aiment"  },
      { level: 1, mode: "matching", infinitive: "jouer",    subject: "Tu",    forms: ["joue", "joues", "jouons", "jouez", "jouent"],             answer: "joues"   },

      /* ── NIVEAU 2 : saisie libre, pronom donné (10) ── */
      { level: 2, infinitive: "chanter",  sentence: "Je ________ une chanson.",       answer: "chante"    },
      { level: 2, infinitive: "regarder", sentence: "Tu ________ la télévision.",     answer: "regardes"  },
      { level: 2, infinitive: "parler",   sentence: "Il ________ avec son ami.",      answer: "parle"     },
      { level: 2, infinitive: "danser",   sentence: "Elle ________ dans le salon.",   answer: "danse"     },
      { level: 2, infinitive: "jouer",    sentence: "On ________ dans le jardin.",    answer: "joue"      },
      { level: 2, infinitive: "aimer",    sentence: "Nous ________ les vacances.",    answer: "aimons"    },
      { level: 2, infinitive: "marcher",  sentence: "Vous ________ vite.",            answer: "marchez"   },
      { level: 2, infinitive: "écouter",  sentence: "Ils ________ la maîtresse.",     answer: "écoutent"  },
      { level: 2, infinitive: "chanter",  sentence: "Elles ________ en chœur.",       answer: "chantent"  },
      { level: 2, infinitive: "jouer",    sentence: "Tu ________ au ballon.",         answer: "joues"     },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal (10) ── */
      { level: 3, infinitive: "écouter",  sentence: "Les élèves ________ la maîtresse.",            answer: "écoutent" },
      { level: 3, infinitive: "jouer",    sentence: "Mon frère et moi ________ au foot.",           answer: "jouons"   },
      { level: 3, infinitive: "préparer", sentence: "La sorcière ________ une potion.",              answer: "prépare"  },
      { level: 3, infinitive: "chanter",  sentence: "Les oiseaux ________ dans les arbres.",         answer: "chantent" },
      { level: 3, infinitive: "regarder", sentence: "Le chat ________ par la fenêtre.",              answer: "regarde"  },
      { level: 3, infinitive: "marcher",  sentence: "Toi et ta sœur ________ vite.",                 answer: "marchez"  },
      { level: 3, infinitive: "danser",   sentence: "Léa et moi ________ ensemble.",                 answer: "dansons"  },
      { level: 3, infinitive: "aimer",    sentence: "Mes parents ________ le jardinage.",            answer: "aiment"   },
      { level: 3, infinitive: "parler",   sentence: "Toi et tes amis ________ trop fort.",           answer: "parlez"   },
      { level: 3, infinitive: "cuisiner", sentence: "La maîtresse ________ un gâteau pour la classe.", answer: "cuisine" }
    ]
  },

  "conjuguer-verbes-particuliers-1er-groupe": {
    title: "Conjuguer les verbes particuliers du 1er groupe au présent",
    domaine:    "Français",
    competence: "Conjugaison — Verbes particuliers du 1er groupe",
    type: "verbes-particuliers-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 5, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* bank : chaque item porte un champ « level » 1-5 (famille orthographique).
       cvpStartLevel filtre par niveau puis tire questionsPerSession questions. */
    bank: [
      /* ── NIVEAU 1 : -cer (ç devant a/o) ── */
      { subject: "je",    infinitive: "commencer",   sentence: "Je ________ à travailler.",           answer: "commence",    level: 1 },
      { subject: "tu",    infinitive: "commencer",   sentence: "Tu ________ l'exercice.",             answer: "commences",   level: 1 },
      { subject: "il",    infinitive: "commencer",   sentence: "Il ________ à comprendre.",           answer: "commence",    level: 1 },
      { subject: "nous",  infinitive: "commencer",   sentence: "Nous ________ la leçon.",             answer: "commençons",  level: 1 },
      { subject: "vous",  infinitive: "commencer",   sentence: "Vous ________ à lire.",               answer: "commencez",   level: 1 },
      { subject: "ils",   infinitive: "commencer",   sentence: "Ils ________ le cours.",              answer: "commencent",  level: 1 },

      { subject: "j'",    infinitive: "avancer",     sentence: "J'________ doucement.",               answer: "avance",      level: 1 },
      { subject: "tu",    infinitive: "avancer",     sentence: "Tu ________ vers la sortie.",         answer: "avances",     level: 1 },
      { subject: "nous",  infinitive: "avancer",     sentence: "Nous ________ en rang.",              answer: "avançons",    level: 1 },
      { subject: "ils",   infinitive: "avancer",     sentence: "Ils ________ en silence.",            answer: "avancent",    level: 1 },

      { subject: "je",    infinitive: "lancer",      sentence: "Je ________ la balle.",               answer: "lance",       level: 1 },
      { subject: "nous",  infinitive: "lancer",      sentence: "Nous ________ le ballon.",            answer: "lançons",     level: 1 },
      { subject: "vous",  infinitive: "lancer",      sentence: "Vous ________ le javelot.",           answer: "lancez",      level: 1 },

      { subject: "tu",    infinitive: "placer",      sentence: "Tu ________ ta chaise.",              answer: "places",      level: 1 },
      { subject: "nous",  infinitive: "placer",      sentence: "Nous ________ les livres.",           answer: "plaçons",     level: 1 },

      { subject: "nous",  infinitive: "prononcer",   sentence: "Nous ________ ce mot correctement.",  answer: "prononçons",  level: 1 },
      { subject: "vous",  infinitive: "prononcer",   sentence: "Vous ________ bien.",                 answer: "prononcez",   level: 1 },

      /* ── NIVEAU 2 : -ger (e gardé devant a/o) ── */
      { subject: "je",    infinitive: "manger",      sentence: "Je ________ une pomme.",              answer: "mange",       level: 2 },
      { subject: "tu",    infinitive: "manger",      sentence: "Tu ________ trop vite.",              answer: "manges",      level: 2 },
      { subject: "il",    infinitive: "manger",      sentence: "Il ________ sa soupe.",               answer: "mange",       level: 2 },
      { subject: "nous",  infinitive: "manger",      sentence: "Nous ________ à la cantine.",         answer: "mangeons",    level: 2 },
      { subject: "vous",  infinitive: "manger",      sentence: "Vous ________ ensemble.",             answer: "mangez",      level: 2 },
      { subject: "ils",   infinitive: "manger",      sentence: "Ils ________ des fruits.",            answer: "mangent",     level: 2 },

      { subject: "je",    infinitive: "nager",       sentence: "Je ________ dans la piscine.",        answer: "nage",        level: 2 },
      { subject: "nous",  infinitive: "nager",       sentence: "Nous ________ le crawl.",             answer: "nageons",     level: 2 },
      { subject: "elles", infinitive: "nager",       sentence: "Elles ________ très vite.",           answer: "nagent",      level: 2 },

      { subject: "tu",    infinitive: "bouger",      sentence: "Tu ________ beaucoup.",               answer: "bouges",      level: 2 },
      { subject: "nous",  infinitive: "bouger",      sentence: "Nous ________ les meubles.",          answer: "bougeons",    level: 2 },
      { subject: "ils",   infinitive: "bouger",      sentence: "Ils ________ pour danser.",           answer: "bougent",     level: 2 },

      { subject: "je",    infinitive: "ranger",      sentence: "Je ________ ma chambre.",             answer: "range",       level: 2 },
      { subject: "nous",  infinitive: "ranger",      sentence: "Nous ________ les affaires.",         answer: "rangeons",    level: 2 },
      { subject: "vous",  infinitive: "ranger",      sentence: "Vous ________ vos livres.",           answer: "rangez",      level: 2 },

      { subject: "je",    infinitive: "voyager",     sentence: "Je ________ beaucoup.",               answer: "voyage",      level: 2 },
      { subject: "nous",  infinitive: "voyager",     sentence: "Nous ________ en train.",             answer: "voyageons",   level: 2 },
      { subject: "ils",   infinitive: "voyager",     sentence: "Ils ________ en avion.",              answer: "voyagent",    level: 2 },

      { subject: "nous",  infinitive: "mélanger",    sentence: "Nous ________ la farine et les œufs.", answer: "mélangeons", level: 2 },

      /* ── NIVEAU 3 : -yer (y→i devant e muet) ── */
      { subject: "je",    infinitive: "nettoyer",    sentence: "Je ________ le tableau.",             answer: "nettoie",     level: 3 },
      { subject: "tu",    infinitive: "nettoyer",    sentence: "Tu ________ la table.",               answer: "nettoies",    level: 3 },
      { subject: "il",    infinitive: "nettoyer",    sentence: "Il ________ sa chambre.",             answer: "nettoie",     level: 3 },
      { subject: "nous",  infinitive: "nettoyer",    sentence: "Nous ________ la salle.",             answer: "nettoyons",   level: 3 },
      { subject: "vous",  infinitive: "nettoyer",    sentence: "Vous ________ les vitres.",           answer: "nettoyez",    level: 3 },
      { subject: "ils",   infinitive: "nettoyer",    sentence: "Ils ________ la cuisine.",            answer: "nettoient",   level: 3 },

      { subject: "j'",    infinitive: "employer",    sentence: "J'________ ce mot correctement.",     answer: "emploie",     level: 3 },
      { subject: "nous",  infinitive: "employer",    sentence: "Nous ________ ces outils.",           answer: "employons",   level: 3 },
      { subject: "ils",   infinitive: "employer",    sentence: "Ils ________ un nouveau mot.",        answer: "emploient",   level: 3 },

      { subject: "tu",    infinitive: "essuyer",     sentence: "Tu ________ la vaisselle.",           answer: "essuies",     level: 3 },
      { subject: "nous",  infinitive: "essuyer",     sentence: "Nous ________ le sol.",               answer: "essuyons",    level: 3 },
      { subject: "elles", infinitive: "essuyer",     sentence: "Elles ________ le tableau.",          answer: "essuient",    level: 3 },

      { subject: "j'",    infinitive: "envoyer",     sentence: "J'________ un message à mon cousin.", answer: "envoie",      level: 3 },
      { subject: "nous",  infinitive: "envoyer",     sentence: "Nous ________ une lettre à nos correspondants.", answer: "envoyons", level: 3 },

      /* ── NIVEAU 4 : -eler/-eter — doublement de la consonne devant e muet ── */
      { subject: "j'",    infinitive: "appeler",     sentence: "J'________ mon ami.",                 answer: "appelle",     level: 4 },
      { subject: "tu",    infinitive: "appeler",     sentence: "Tu ________ ta maman.",               answer: "appelles",    level: 4 },
      { subject: "il",    infinitive: "appeler",     sentence: "Il ________ son chien.",              answer: "appelle",     level: 4 },
      { subject: "nous",  infinitive: "appeler",     sentence: "Nous ________ notre professeur.",     answer: "appelons",    level: 4 },
      { subject: "vous",  infinitive: "appeler",     sentence: "Vous ________ vos amis.",             answer: "appelez",     level: 4 },
      { subject: "ils",   infinitive: "appeler",     sentence: "Ils ________ la maîtresse.",          answer: "appellent",   level: 4 },

      { subject: "je",    infinitive: "jeter",       sentence: "Je ________ le ballon.",              answer: "jette",       level: 4 },
      { subject: "tu",    infinitive: "jeter",       sentence: "Tu ________ les déchets.",            answer: "jettes",      level: 4 },
      { subject: "il",    infinitive: "jeter",       sentence: "Il ________ son sac.",                answer: "jette",       level: 4 },
      { subject: "nous",  infinitive: "jeter",       sentence: "Nous ________ les papiers.",          answer: "jetons",      level: 4 },
      { subject: "vous",  infinitive: "jeter",       sentence: "Vous ________ la balle.",             answer: "jetez",       level: 4 },
      { subject: "ils",   infinitive: "jeter",       sentence: "Ils ________ des cailloux.",          answer: "jettent",     level: 4 },

      { subject: "il",    infinitive: "projeter",    sentence: "Il ________ un film.",                answer: "projette",    level: 4 },
      { subject: "nous",  infinitive: "projeter",    sentence: "Nous ________ un voyage.",            answer: "projetons",   level: 4 },

      { subject: "tu",    infinitive: "rappeler",    sentence: "Tu ________ ta grand-mère pour lui dire bonjour.", answer: "rappelles", level: 4 },
      { subject: "ils",   infinitive: "rejeter",     sentence: "Ils ________ les papiers usagés à la poubelle.",  answer: "rejettent", level: 4 },

      /* ── NIVEAU 5 : -eler/-eter — accent grave devant e muet ── */
      { subject: "j'",    infinitive: "acheter",     sentence: "J'________ du pain.",                 answer: "achète",      level: 5 },
      { subject: "tu",    infinitive: "acheter",     sentence: "Tu ________ des bonbons.",            answer: "achètes",     level: 5 },
      { subject: "elle",  infinitive: "acheter",     sentence: "Elle ________ un livre.",             answer: "achète",      level: 5 },
      { subject: "nous",  infinitive: "acheter",     sentence: "Nous ________ des légumes.",          answer: "achetons",    level: 5 },
      { subject: "vous",  infinitive: "acheter",     sentence: "Vous ________ un cadeau.",            answer: "achetez",     level: 5 },
      { subject: "ils",   infinitive: "acheter",     sentence: "Ils ________ des jouets.",            answer: "achètent",    level: 5 },

      { subject: "il",    infinitive: "geler",       sentence: "Il ________ dehors ce matin.",        answer: "gèle",        level: 5 },
      { subject: "nous",  infinitive: "geler",       sentence: "Nous ________ la viande pour la conserver.", answer: "gelons", level: 5 },
      { subject: "elles", infinitive: "geler",       sentence: "Elles ________ de froid sous la neige.", answer: "gèlent",   level: 5 },

      { subject: "je",    infinitive: "peler",       sentence: "Je ________ une pomme pour la tarte.", answer: "pèle",       level: 5 },
      { subject: "vous",  infinitive: "peler",       sentence: "Vous ________ les légumes avant de les cuisiner.", answer: "pelez", level: 5 },

      { subject: "tu",    infinitive: "modeler",     sentence: "Tu ________ une figurine en pâte à modeler.", answer: "modèles", level: 5 },
      { subject: "nous",  infinitive: "modeler",     sentence: "Nous ________ de l'argile en classe d'arts plastiques.", answer: "modelons", level: 5 },

      { subject: "elle",  infinitive: "congeler",    sentence: "Elle ________ les fruits du jardin pour l'hiver.", answer: "congèle", level: 5 },
      { subject: "ils",   infinitive: "congeler",    sentence: "Ils ________ les restes du repas.",   answer: "congèlent",   level: 5 },
      { subject: "vous",  infinitive: "congeler",    sentence: "Vous ________ le pain pour qu'il se conserve.", answer: "congelez", level: 5 }
    ]
  },

  "conjuguer-2e-groupe-present": {
    title: "Conjuguer les verbes du 2e groupe au présent",
    domaine:    "Français",
    competence: "Conjugaison — 2e groupe au présent",
    type:       "deuxieme-groupe-present-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
         mode "mcq" : choices = 4 formes possibles du même verbe.
         mode "matching" : forms = formes distinctes du verbe (je et tu
         partagent la même forme pour un verbe du 2e groupe, donc 5 formes
         distinctes et non 6 — contrairement au 1er groupe où c'est je et
         il/elle qui fusionnent).
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer.
       Niveau 2 = pronom donné, niveau 3 = sujet non pronominal (GN). */
    bank: [
      /* ── NIVEAU 1 : QCM (5) ── */
      { level: 1, mode: "mcq", infinitive: "finir",    subject: "je",   choices: ["finis", "finit", "finissons", "finissez"], answer: "finis" },
      { level: 1, mode: "mcq", infinitive: "choisir",  subject: "tu",   choices: ["choisis", "choisit", "choisissons", "choisissez"], answer: "choisis" },
      { level: 1, mode: "mcq", infinitive: "grandir",  subject: "il",   choices: ["grandit", "grandis", "grandissons", "grandissent"], answer: "grandit" },
      { level: 1, mode: "mcq", infinitive: "réussir",  subject: "nous", choices: ["réussissons", "réussissez", "réussissent", "réussit"], answer: "réussissons" },
      { level: 1, mode: "mcq", infinitive: "obéir",    subject: "vous", choices: ["obéissez", "obéissons", "obéissent", "obéit"], answer: "obéissez" },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "remplir",  subject: "Elle",  forms: ["remplis", "remplit", "remplissons", "remplissez", "remplissent"], answer: "remplit" },
      { level: 1, mode: "matching", infinitive: "rougir",   subject: "Ils",   forms: ["rougis", "rougit", "rougissons", "rougissez", "rougissent"],       answer: "rougissent" },
      { level: 1, mode: "matching", infinitive: "finir",    subject: "Vous",  forms: ["finis", "finit", "finissons", "finissez", "finissent"],            answer: "finissez" },
      { level: 1, mode: "matching", infinitive: "choisir",  subject: "Elles", forms: ["choisis", "choisit", "choisissons", "choisissez", "choisissent"],  answer: "choisissent" },
      { level: 1, mode: "matching", infinitive: "grandir",  subject: "On",    forms: ["grandis", "grandit", "grandissons", "grandissez", "grandissent"],  answer: "grandit" },

      /* ── NIVEAU 2 : saisie libre, pronom donné (10) ── */
      { level: 2, infinitive: "finir",    sentence: "Je ________ mon travail.",              answer: "finis"       },
      { level: 2, infinitive: "choisir",  sentence: "Tu ________ ta couleur préférée.",      answer: "choisis"     },
      { level: 2, infinitive: "grandir",  sentence: "Il ________ chaque année.",             answer: "grandit"     },
      { level: 2, infinitive: "réussir",  sentence: "Elle ________ sa recette.",             answer: "réussit"     },
      { level: 2, infinitive: "obéir",    sentence: "On ________ toujours aux règles.",      answer: "obéit"       },
      { level: 2, infinitive: "finir",    sentence: "Nous ________ la leçon.",               answer: "finissons"   },
      { level: 2, infinitive: "choisir",  sentence: "Vous ________ votre place.",            answer: "choisissez"  },
      { level: 2, infinitive: "grandir",  sentence: "Ils ________ comme des champignons.",   answer: "grandissent" },
      { level: 2, infinitive: "rougir",   sentence: "Elles ________ de plaisir.",            answer: "rougissent"  },
      { level: 2, infinitive: "remplir",  sentence: "Tu ________ ton verre d'eau.",          answer: "remplis"     },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal (10) ── */
      { level: 3, infinitive: "grandir",    sentence: "Les fleurs ________ au printemps.",              answer: "grandissent" },
      { level: 3, infinitive: "choisir",    sentence: "Ma sœur et moi ________ un livre.",              answer: "choisissons" },
      { level: 3, infinitive: "réussir",    sentence: "Le chevalier ________ sa mission.",              answer: "réussit"     },
      { level: 3, infinitive: "finir",      sentence: "Les élèves ________ leur exercice.",             answer: "finissent"   },
      { level: 3, infinitive: "obéir",      sentence: "Le chien ________ à son maître.",                answer: "obéit"       },
      { level: 3, infinitive: "remplir",    sentence: "Toi et ton frère ________ les verres.",          answer: "remplissez"  },
      { level: 3, infinitive: "rougir",     sentence: "La petite fille ________ de timidité.",          answer: "rougit"      },
      { level: 3, infinitive: "grandir",    sentence: "Mes cousins ________ très vite.",                answer: "grandissent" },
      { level: 3, infinitive: "choisir",    sentence: "Toi et tes amis ________ un jeu.",               answer: "choisissez"  },
      { level: 3, infinitive: "réfléchir",  sentence: "La maîtresse ________ à la meilleure solution.", answer: "réfléchit"   }
    ]
  },

  "conjuguer-3e-groupe-present": {
    title: "Conjuguer les verbes fréquents du 3e groupe au présent",
    domaine:    "Français",
    competence: "Conjugaison — 3e groupe au présent",
    type:       "troisieme-groupe-present-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
         mode "mcq" : choices = 4 formes possibles du même verbe.
         mode "matching" : forms = formes distinctes du verbe. Pour la
         plupart de ces verbes, je et tu partagent la même forme (5 formes
         distinctes) — SAUF aller, entièrement irrégulier (vais/vas/va/
         allons/allez/vont), dont les 6 formes sont toutes distinctes.
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer.
       Niveau 2 = pronom donné, niveau 3 = sujet non pronominal (GN). */
    bank: [
      /* ── NIVEAU 1 : QCM (5) ── */
      { level: 1, mode: "mcq", infinitive: "faire",   subject: "je",   choices: ["fais", "fait", "faisons", "faites"], answer: "fais" },
      { level: 1, mode: "mcq", infinitive: "aller",   subject: "tu",   choices: ["vas", "va", "allons", "allez"], answer: "vas" },
      { level: 1, mode: "mcq", infinitive: "dire",    subject: "il",   choices: ["dit", "dis", "disons", "dites"], answer: "dit" },
      { level: 1, mode: "mcq", infinitive: "pouvoir", subject: "nous", choices: ["pouvons", "pouvez", "peuvent", "peut"], answer: "pouvons" },
      { level: 1, mode: "mcq", infinitive: "vouloir", subject: "vous", choices: ["voulez", "voulons", "veulent", "veut"], answer: "voulez" },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "venir",   subject: "Elle",  forms: ["viens", "vient", "venons", "venez", "viennent"], answer: "vient" },
      { level: 1, mode: "matching", infinitive: "voir",    subject: "Ils",   forms: ["vois", "voit", "voyons", "voyez", "voient"],       answer: "voient" },
      { level: 1, mode: "matching", infinitive: "prendre", subject: "Vous",  forms: ["prends", "prend", "prenons", "prenez", "prennent"], answer: "prenez" },
      { level: 1, mode: "matching", infinitive: "faire",   subject: "Elles", forms: ["fais", "fait", "faisons", "faites", "font"],        answer: "font" },
      { level: 1, mode: "matching", infinitive: "aller",   subject: "On",    forms: ["vais", "vas", "va", "allons", "allez", "vont"],     answer: "va" },

      /* ── NIVEAU 2 : saisie libre, pronom donné (10) ── */
      { level: 2, infinitive: "faire",   sentence: "Je ________ mes devoirs.",       answer: "fais"    },
      { level: 2, infinitive: "pouvoir", sentence: "Tu ________ venir avec nous ?",  answer: "peux"    },
      { level: 2, infinitive: "vouloir", sentence: "Tu ________ jouer avec moi ?",   answer: "veux"    },
      { level: 2, infinitive: "prendre", sentence: "Il ________ son goûter.",        answer: "prend"   },
      { level: 2, infinitive: "dire",    sentence: "Elle ________ la vérité.",       answer: "dit"     },
      { level: 2, infinitive: "venir",   sentence: "Nous ________ à l'école à pied.",answer: "venons"  },
      { level: 2, infinitive: "faire",   sentence: "Vous ________ du sport ?",       answer: "faites"  },
      { level: 2, infinitive: "dire",    sentence: "Vous ________ toujours merci.",  answer: "dites"   },
      { level: 2, infinitive: "aller",   sentence: "Ils ________ à la piscine.",     answer: "vont"    },
      { level: 2, infinitive: "faire",   sentence: "Ils ________ leurs devoirs ensemble.", answer: "font" },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal (10) ── */
      { level: 3, infinitive: "aller",    sentence: "Les enfants ________ à la piscine.",        answer: "vont"     },
      { level: 3, infinitive: "faire",    sentence: "Mon voisin ________ du vélo.",               answer: "fait"     },
      { level: 3, infinitive: "prendre",  sentence: "Léa et moi ________ le bus.",                answer: "prenons"  },
      { level: 3, infinitive: "dire",     sentence: "La maîtresse ________ bonjour.",             answer: "dit"      },
      { level: 3, infinitive: "voir",     sentence: "Le chat ________ une souris.",                answer: "voit"     },
      { level: 3, infinitive: "pouvoir",  sentence: "Toi et ton frère ________ venir ce soir.",    answer: "pouvez"   },
      { level: 3, infinitive: "vouloir",  sentence: "Mes parents ________ partir en vacances.",    answer: "veulent"  },
      { level: 3, infinitive: "venir",    sentence: "Les élèves ________ de la piscine.",          answer: "viennent" },
      { level: 3, infinitive: "voir",     sentence: "Toi et tes amis ________ le spectacle.",      answer: "voyez"    },
      { level: 3, infinitive: "faire",    sentence: "Les hirondelles ________ un long voyage.",    answer: "font"     }
    ]
  },

  "conjuguer-imparfait": {
    title: "Conjuguer à l'imparfait",
    domaine:    "Français",
    competence: "Conjugaison — Imparfait",
    type:       "imparfait-groupes-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
         mode "mcq" : choices = formes homophones erronées + la bonne forme
         (à l'imparfait, je/tu/il/elle/ils/elles se prononcent tous [ɛ] :
         -ais/-ais/-ait/-aient — piège volontaire entre singulier et
         pluriel, et orthographes tronquées comme "chantai").
         mode "matching" : forms = les 5 formes distinctes du verbe (je et
         tu partagent toujours -ais/-ais à l'imparfait, quel que soit le
         verbe — contrairement au présent, cette fusion est constante ici).
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer.
       Niveau 2 = uniquement des verbes en -ir, avec q.hasIss (true = 2e
       groupe avec infixe -iss-, false = 3e groupe sans -iss-) pour le
       choix binaire avant saisie. Niveau 3 = sujet non pronominal (GN),
       tous groupes mélangés. */
    bank: [
      /* ── NIVEAU 1 : QCM (5) — distracteurs homophones ── */
      { level: 1, mode: "mcq", infinitive: "chanter", subject: "il",   choices: ["chantait", "chantai", "chantaient", "chantais"], answer: "chantait" },
      { level: 1, mode: "mcq", infinitive: "jouer",    subject: "ils",  choices: ["jouaient", "jouait", "jouais", "jouai"], answer: "jouaient" },
      { level: 1, mode: "mcq", infinitive: "être",     subject: "je",   choices: ["étais", "était", "étaient", "étai"], answer: "étais" },
      { level: 1, mode: "mcq", infinitive: "avoir",    subject: "nous", choices: ["avions", "aviez", "avait", "avaient"], answer: "avions" },
      { level: 1, mode: "mcq", infinitive: "faire",    subject: "vous", choices: ["faisiez", "faisions", "faisaient", "faisait"], answer: "faisiez" },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "venir",   subject: "Elle",  forms: ["venais", "venait", "venions", "veniez", "venaient"], answer: "venait" },
      { level: 1, mode: "matching", infinitive: "prendre", subject: "Ils",   forms: ["prenais", "prenait", "prenions", "preniez", "prenaient"], answer: "prenaient" },
      { level: 1, mode: "matching", infinitive: "être",    subject: "Vous",  forms: ["étais", "était", "étions", "étiez", "étaient"], answer: "étiez" },
      { level: 1, mode: "matching", infinitive: "avoir",   subject: "Elles", forms: ["avais", "avait", "avions", "aviez", "avaient"], answer: "avaient" },
      { level: 1, mode: "matching", infinitive: "aller",   subject: "On",    forms: ["allais", "allait", "allions", "alliez", "allaient"], answer: "allait" },

      /* ── NIVEAU 2 : uniquement des verbes en -ir, choix avec/sans -iss- (10) ── */
      { level: 2, infinitive: "finir",    sentence: "Je ________ mon travail avant le dîner.",     answer: "finissais",    hasIss: true  },
      { level: 2, infinitive: "venir",    sentence: "Tu ________ souvent me voir le dimanche.",    answer: "venais",       hasIss: false },
      { level: 2, infinitive: "grandir",  sentence: "Il ________ un peu plus chaque année.",       answer: "grandissait",  hasIss: true  },
      { level: 2, infinitive: "partir",   sentence: "Elle ________ tôt le matin pour l'école.",    answer: "partait",      hasIss: false },
      { level: 2, infinitive: "choisir",  sentence: "On ________ toujours le même dessert.",       answer: "choisissait",  hasIss: true  },
      { level: 2, infinitive: "dormir",   sentence: "Nous ________ dans la même chambre.",         answer: "dormions",     hasIss: false },
      { level: 2, infinitive: "réussir",  sentence: "Vous ________ tous vos exercices.",           answer: "réussissiez",  hasIss: true  },
      { level: 2, infinitive: "tenir",    sentence: "Ils ________ à leur vieille tradition.",      answer: "tenaient",     hasIss: false },
      { level: 2, infinitive: "obéir",    sentence: "Elles ________ toujours à leurs parents.",    answer: "obéissaient",  hasIss: true  },
      { level: 2, infinitive: "sortir",   sentence: "Tu ________ jouer dans le jardin.",           answer: "sortais",      hasIss: false },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal, groupes mélangés (10) ── */
      { level: 3, infinitive: "porter",   sentence: "Autrefois, les chevaliers ________ une armure.",       answer: "portaient"      },
      { level: 3, infinitive: "finir",    sentence: "Ma grand-mère ________ toujours son assiette.",         answer: "finissait"      },
      { level: 3, infinitive: "venir",    sentence: "Le vent ________ du nord.",                             answer: "venait"         },
      { level: 3, infinitive: "être",     sentence: "Mes parents ________ très jeunes sur cette photo.",     answer: "étaient"        },
      { level: 3, infinitive: "avoir",    sentence: "Le dragon ________ des ailes immenses.",                answer: "avait"          },
      { level: 3, infinitive: "jouer",    sentence: "Léa et moi ________ ensemble tous les jours.",          answer: "jouions"        },
      { level: 3, infinitive: "dormir",   sentence: "Toi et ton frère ________ dans la même chambre.",       answer: "dormiez"        },
      { level: 3, infinitive: "choisir",  sentence: "Les enfants ________ toujours le même jeu.",            answer: "choisissaient"  },
      { level: 3, infinitive: "faire",    sentence: "La sorcière ________ des potions magiques.",            answer: "faisait"        },
      { level: 3, infinitive: "aller",    sentence: "Toi et tes cousins ________ à la ferme chaque été.",    answer: "alliez"         }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     Type : futur-groupes-niveaux
     Niveau 1 : QCM (5) + associer sujet↔forme (5) — sujets = pronoms,
                verbes réguliers des 1er et 2e groupes. Distracteurs des QCM
                = terminaisons erronées ou confusions de personne (*tu
                chantera, *nous chanteront, *je finira).
     Niveau 2 : SPÉCIFICITÉ — le radical. Choix binaire avant saisie (radical
                régulier = infinitif complet / radical irrégulier des verbes
                fréquents) puis saisie libre. Réutilise le motif step1/step2
                déjà utilisé pour l'imparfait (avec/sans -iss-), pas une
                nouvelle interaction.
     Niveau 3 : saisie libre, sujet = groupe nominal, radicaux réguliers et
                irréguliers mélangés, indicateurs temporels de futur.
     Progression verrouillée : seuil 80 %, persistance sessionStorage.
  ══════════════════════════════════════════════════════════════════════════ */

  "conjuguer-futur": {
    title: "Conjuguer au futur",
    domaine:    "Français",
    competence: "Conjugaison — Futur simple",
    type:       "futur-groupes-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
         mode "mcq" : choices = terminaisons erronées / confusions de personne.
         mode "matching" : forms = les 6 formes du verbe (au futur, les 6
         personnes sont TOUJOURS distinctes -rai/-ras/-ra/-rons/-rez/-ront,
         contrairement à l'imparfait où je/tu fusionnent systématiquement).
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer.
       Niveau 2 = uniquement des verbes utilisés pour illustrer le radical,
       avec q.regRadical (true = radical régulier/infinitif, false = radical
       irrégulier) pour le choix binaire avant saisie. Niveau 3 = sujet non
       pronominal (GN), radicaux mélangés. */
    bank: [
      /* ── NIVEAU 1 : QCM (5) — distracteurs de terminaison/personne ── */
      { level: 1, mode: "mcq", infinitive: "chanter",  subject: "tu",   choices: ["chanteras", "chantera", "chanteront", "chanterai"], answer: "chanteras" },
      { level: 1, mode: "mcq", infinitive: "finir",    subject: "je",   choices: ["finirai", "finira", "finiras", "finirons"], answer: "finirai" },
      { level: 1, mode: "mcq", infinitive: "jouer",    subject: "nous", choices: ["jouerons", "joueront", "jouerez", "jouera"], answer: "jouerons" },
      { level: 1, mode: "mcq", infinitive: "choisir",  subject: "vous", choices: ["choisirez", "choisirons", "choisiront", "choisira"], answer: "choisirez" },
      { level: 1, mode: "mcq", infinitive: "regarder", subject: "ils",  choices: ["regarderont", "regarderons", "regardera", "regarderez"], answer: "regarderont" },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "parler",   subject: "Elle",  forms: ["parlerai", "parleras", "parlera", "parlerons", "parlerez", "parleront"], answer: "parlera" },
      { level: 1, mode: "matching", infinitive: "finir",    subject: "Ils",   forms: ["finirai", "finiras", "finira", "finirons", "finirez", "finiront"], answer: "finiront" },
      { level: 1, mode: "matching", infinitive: "chanter",  subject: "Vous",  forms: ["chanterai", "chanteras", "chantera", "chanterons", "chanterez", "chanteront"], answer: "chanterez" },
      { level: 1, mode: "matching", infinitive: "choisir",  subject: "Elles", forms: ["choisirai", "choisiras", "choisira", "choisirons", "choisirez", "choisiront"], answer: "choisiront" },
      { level: 1, mode: "matching", infinitive: "jouer",    subject: "On",    forms: ["jouerai", "joueras", "jouera", "jouerons", "jouerez", "joueront"], answer: "jouera" },

      /* ── NIVEAU 2 : radical régulier (infinitif) vs irrégulier (10) ── */
      { level: 2, infinitive: "parler",   sentence: "Je ________ à la maîtresse demain.",           answer: "parlerai",   regRadical: true  },
      { level: 2, infinitive: "finir",    sentence: "Tu ________ ton livre ce soir.",                answer: "finiras",    regRadical: true  },
      { level: 2, infinitive: "jouer",    sentence: "Il ________ au ballon avec ses amis.",          answer: "jouera",     regRadical: true  },
      { level: 2, infinitive: "être",     sentence: "Nous ________ en retard si on ne se dépêche pas.", answer: "serons",  regRadical: false },
      { level: 2, infinitive: "avoir",    sentence: "Vous ________ une bonne surprise bientôt.",     answer: "aurez",      regRadical: false },
      { level: 2, infinitive: "crier",    sentence: "Ils ________ de joie en apprenant la nouvelle.", answer: "crieront",  regRadical: true  },
      { level: 2, infinitive: "aller",    sentence: "Elle ________ mieux dans quelques jours.",      answer: "ira",        regRadical: false },
      { level: 2, infinitive: "faire",    sentence: "On ________ un gâteau pour son anniversaire.",  answer: "fera",       regRadical: false },
      { level: 2, infinitive: "venir",    sentence: "Elles ________ nous voir samedi prochain.",     answer: "viendront",  regRadical: false },
      { level: 2, infinitive: "choisir",  sentence: "Tu ________ ton cadeau toi-même.",              answer: "choisiras",  regRadical: true  },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal, radicaux mélangés (10) ── */
      { level: 3, infinitive: "aller",    sentence: "Demain, les élèves ________ à la bibliothèque.",              answer: "iront"      },
      { level: 3, infinitive: "avoir",    sentence: "L'année prochaine, mon frère ________ dix ans.",              answer: "aura"       },
      { level: 3, infinitive: "être",     sentence: "Ce soir, la lune ________ pleine.",                           answer: "sera"       },
      { level: 3, infinitive: "venir",    sentence: "Léa et moi ________ te voir bientôt.",                        answer: "viendrons"  },
      { level: 3, infinitive: "voir",     sentence: "Demain, mes cousins ________ la mer pour la première fois.",  answer: "verront"    },
      { level: 3, infinitive: "pouvoir",  sentence: "Toi et ton frère ________ venir samedi.",                     answer: "pourrez"    },
      { level: 3, infinitive: "vouloir",  sentence: "Bientôt, mes parents ________ déménager.",                    answer: "voudront"   },
      { level: 3, infinitive: "prendre",  sentence: "L'année prochaine, la classe ________ le train pour Paris.",  answer: "prendra"    },
      { level: 3, infinitive: "chanter",  sentence: "Demain soir, le chœur ________ pour la fête de l'école.",     answer: "chantera"   },
      { level: 3, infinitive: "grandir",  sentence: "Bientôt, ces petits chatons ________ beaucoup.",              answer: "grandiront" }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     Type : passe-simple-groupes-niveaux
     Niveau 1 : QCM (5) + associer sujet↔forme (5) — sujets = pronoms,
                distracteurs = confusion avec l'imparfait/le futur et pièges
                de terminaison à la 3e pers. du pluriel (-èrent vs -aient).
                Pour être/avoir et les verbes du 2e groupe, je et tu partagent
                la même forme au passé simple (fus/fus, eus/eus, finis/finis) :
                le mode "matching" n'affiche alors que 5 formes distinctes,
                comme pour l'imparfait.
     Niveau 2 : SPÉCIFICITÉ — choix binaire avant saisie : le verbe est-il du
                1er groupe (terminaisons en -a-) ou du 2e/3e groupe/être/avoir
                (terminaisons en -i-/-u-) ? Réutilise le motif step1/step2 déjà
                utilisé pour l'imparfait (hasIss) et le futur (regRadical).
     Niveau 3 : saisie libre, sujet = groupe nominal, groupes mélangés.
     Progression verrouillée : seuil 80 %, persistance sessionStorage.
  ══════════════════════════════════════════════════════════════════════════ */

  "conjuguer-passe-simple": {
    title: "Conjuguer des verbes au passé simple",
    domaine:    "Français",
    competence: "Conjugaison — Passé simple",
    type:       "passe-simple-groupes-niveaux",
    levels:     ["CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── NIVEAU 1 : QCM (5) — distracteurs imparfait/futur et terminaisons ── */
      { level: 1, mode: "mcq", infinitive: "chanter", subject: "il",   choices: ["chanta", "chantait", "chantera", "chantèrent"], answer: "chanta" },
      { level: 1, mode: "mcq", infinitive: "finir",    subject: "je",   choices: ["finis", "finissais", "finirai", "finit"], answer: "finis" },
      { level: 1, mode: "mcq", infinitive: "être",     subject: "elle", choices: ["fut", "était", "sera", "furent"], answer: "fut" },
      { level: 1, mode: "mcq", infinitive: "avoir",    subject: "nous", choices: ["eûmes", "avions", "aurons", "eurent"], answer: "eûmes" },
      { level: 1, mode: "mcq", infinitive: "parler",   subject: "ils",  choices: ["parlèrent", "parlaient", "parleront", "parla"], answer: "parlèrent" },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "chanter",  subject: "Elle",  forms: ["chantai", "chantas", "chanta", "chantâmes", "chantâtes", "chantèrent"], answer: "chanta" },
      { level: 1, mode: "matching", infinitive: "finir",    subject: "Ils",   forms: ["finis", "finit", "finîmes", "finîtes", "finirent"], answer: "finirent" },
      { level: 1, mode: "matching", infinitive: "être",     subject: "Elles", forms: ["fus", "fut", "fûmes", "fûtes", "furent"], answer: "furent" },
      { level: 1, mode: "matching", infinitive: "avoir",    subject: "Vous",  forms: ["eus", "eut", "eûmes", "eûtes", "eurent"], answer: "eûtes" },
      { level: 1, mode: "matching", infinitive: "regarder", subject: "On",    forms: ["regardai", "regardas", "regarda", "regardâmes", "regardâtes", "regardèrent"], answer: "regarda" },

      /* ── NIVEAU 2 : 1er groupe (-a-) vs 2e/3e groupe/être/avoir (-i-/-u-) (10) ── */
      { level: 2, infinitive: "chanter",  sentence: "Je ________ une vieille chanson autour du feu.",   answer: "chantai", groupe1: true },
      { level: 2, infinitive: "finir",    sentence: "Tu ________ ta course le premier.",                answer: "finis",   groupe1: false },
      { level: 2, infinitive: "regarder", sentence: "Elle ________ le tableau sans dire un mot.",       answer: "regarda", groupe1: true },
      { level: 2, infinitive: "choisir",  sentence: "Il ________ la plus belle des pierres précieuses.", answer: "choisit", groupe1: false },
      { level: 2, infinitive: "tomber",   sentence: "Il ________ dans le piège tendu par l'ennemi.",    answer: "tomba",   groupe1: true },
      { level: 2, infinitive: "être",     sentence: "Tu ________ le premier à arriver sur les lieux.",  answer: "fus",     groupe1: false },
      { level: 2, infinitive: "trouver",  sentence: "Il ________ un trésor caché dans la grotte.",      answer: "trouva",  groupe1: true },
      { level: 2, infinitive: "avoir",    sentence: "Il ________ très faim après la longue randonnée.", answer: "eut",     groupe1: false },
      { level: 2, infinitive: "crier",    sentence: "Elle ________ de joie en voyant le résultat.",     answer: "cria",    groupe1: true },
      { level: 2, infinitive: "obéir",    sentence: "Il ________ aux ordres sans discuter.",            answer: "obéit",   groupe1: false },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal, groupes mélangés (10) ── */
      { level: 3, infinitive: "être",     sentence: "Les villageois ________ très surpris par la nouvelle.",        answer: "furent"     },
      { level: 3, infinitive: "avoir",    sentence: "Le chevalier ________ très peur en traversant la forêt.",      answer: "eut"        },
      { level: 3, infinitive: "chanter",  sentence: "Les enfants ________ une vieille chanson autour du feu.",      answer: "chantèrent" },
      { level: 3, infinitive: "parler",   sentence: "Le vieux sage ________ avec beaucoup de sagesse.",             answer: "parla"      },
      { level: 3, infinitive: "marcher",  sentence: "Les voyageurs ________ pendant des heures sans s'arrêter.",    answer: "marchèrent" },
      { level: 3, infinitive: "regarder", sentence: "La foule ________ le coucher de soleil en silence.",           answer: "regarda"    },
      { level: 3, infinitive: "trouver",  sentence: "Le chevalier ________ un trésor caché dans la grotte.",        answer: "trouva"     },
      { level: 3, infinitive: "finir",    sentence: "La reine ________ son discours sous les applaudissements.",    answer: "finit"      },
      { level: 3, infinitive: "choisir",  sentence: "Les habitants ________ leur chef après une longue discussion.", answer: "choisirent" },
      { level: 3, infinitive: "grandir",  sentence: "Les arbres ________ vite dans cette forêt lointaine.",         answer: "grandirent" }
    ]
  },

  "conjuguer-avoir-present": {
    title: "Conjuguer le verbe avoir au présent",
    domaine:    "Français",
    competence: "Conjugaison — Avoir au présent",
    type:       "avoir-present-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── les 6 formes de référence, utilisées comme distracteurs par le
       mode "matching" du niveau 1. Sujet "J'" (et non "Je") : avoir commence
       par une voyelle, l'élision est donc correcte ici (contrairement à être). ── */
    conjugationForms: [
      { subject: "J'",          answer: "ai"    },
      { subject: "Tu",          answer: "as"    },
      { subject: "Il / Elle",   answer: "a"     },
      { subject: "Nous",        answer: "avons" },
      { subject: "Vous",        answer: "avez"  },
      { subject: "Ils / Elles", answer: "ont"   }
    ],

    /* bank : chaque item porte un champ « level » 1-3.
       Niveau 1 (mode "mcq" ou "matching") : sujets = pronoms personnels.
       Niveaux 2 et 3 (saisie libre) : q.infinitive + q.sentence + q.answer.
       Niveau 2 = pronom donné, niveau 3 = sujet non pronominal (GN). */
    bank: [
      /* ── NIVEAU 1 : QCM (5) ── */
      { level: 1, mode: "mcq", subject: "je",   choices: ["ai", "as", "a", "avons"],  answer: "ai"    },
      { level: 1, mode: "mcq", subject: "tu",   choices: ["as", "ai", "a", "avez"],   answer: "as"    },
      { level: 1, mode: "mcq", subject: "il",   choices: ["a", "as", "ai", "ont"],    answer: "a"     },
      { level: 1, mode: "mcq", subject: "nous", choices: ["avons", "avez", "ont", "a"], answer: "avons" },
      { level: 1, mode: "mcq", subject: "vous", choices: ["avez", "avons", "ont", "a"], answer: "avez"  },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", subject: "Elle",  answer: "a"    },
      { level: 1, mode: "matching", subject: "On",    answer: "a"    },
      { level: 1, mode: "matching", subject: "Ils",   answer: "ont"  },
      { level: 1, mode: "matching", subject: "Elles", answer: "ont"  },
      { level: 1, mode: "matching", subject: "Vous",  answer: "avez" },

      /* ── NIVEAU 2 : saisie libre, pronom donné (10) ── */
      { level: 2, infinitive: "avoir", sentence: "J'________ faim.",                    answer: "ai"    },
      { level: 2, infinitive: "avoir", sentence: "Tu ________ un vélo.",                answer: "as"    },
      { level: 2, infinitive: "avoir", sentence: "Il ________ peur du noir.",           answer: "a"     },
      { level: 2, infinitive: "avoir", sentence: "Elle ________ froid ce matin.",       answer: "a"     },
      { level: 2, infinitive: "avoir", sentence: "On ________ de la chance.",           answer: "a"     },
      { level: 2, infinitive: "avoir", sentence: "Nous ________ un chat à la maison.",  answer: "avons" },
      { level: 2, infinitive: "avoir", sentence: "Vous ________ raison.",               answer: "avez"  },
      { level: 2, infinitive: "avoir", sentence: "Ils ________ deux chiens.",           answer: "ont"   },
      { level: 2, infinitive: "avoir", sentence: "Elles ________ soif après le sport.", answer: "ont"   },
      { level: 2, infinitive: "avoir", sentence: "Elle ________ un beau vélo rouge.",   answer: "a"     },

      /* ── NIVEAU 3 : saisie libre, sujet = groupe nominal (10) ── */
      { level: 3, infinitive: "avoir", sentence: "Mes voisins ________ un chien.",           answer: "ont"   },
      { level: 3, infinitive: "avoir", sentence: "La maîtresse ________ raison.",             answer: "a"     },
      { level: 3, infinitive: "avoir", sentence: "Paul et moi ________ faim.",                answer: "avons" },
      { level: 3, infinitive: "avoir", sentence: "Le chat ________ soif.",                    answer: "a"     },
      { level: 3, infinitive: "avoir", sentence: "Toi et ta sœur ________ de la chance.",     answer: "avez"  },
      { level: 3, infinitive: "avoir", sentence: "Les élèves ________ beaucoup de devoirs.",  answer: "ont"   },
      { level: 3, infinitive: "avoir", sentence: "Mon frère et moi ________ un vélo neuf.",   answer: "avons" },
      { level: 3, infinitive: "avoir", sentence: "Toi et tes amis ________ raison.",          answer: "avez"  },
      { level: 3, infinitive: "avoir", sentence: "Le vieux chien ________ peur de l'orage.",  answer: "a"     },
      { level: 3, infinitive: "avoir", sentence: "Mes cousines ________ un chat.",            answer: "ont"   }
    ]
  },

  "conjuguer-faire": {
    title: "Conjuguer le verbe FAIRE",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : FAIRE",
    verb: "faire",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×4) + Imparfait (×4) + Futur simple (×4) + Passé composé (×4) ── */
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

      /* ── Niveau 2 : Passé simple (×6) + Plus-que-parfait (×6) ── */
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

      /* ── Niveau 3 : Impératif (×6) + Conditionnel (×6) ── */
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

  "conjuguer-aller": {
    title: "Conjuguer le verbe ALLER",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : ALLER",
    verb: "aller",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Impératif (×8) + Conditionnel (×8) ── */
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

  "conjuguer-dire": {
    title: "Conjuguer le verbe DIRE",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : DIRE",
    verb: "dire",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Impératif (×8) + Conditionnel (×8) ── */
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

  "conjuguer-venir": {
    title: "Conjuguer le verbe VENIR",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : VENIR",
    verb: "venir",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Impératif (×8) + Conditionnel (×8) ── */
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

  "conjuguer-pouvoir": {
    title: "Conjuguer le verbe POUVOIR",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : POUVOIR",
    verb: "pouvoir",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Conditionnel (×8) + Subjonctif présent (×8) ── */
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

  "conjuguer-voir": {
    title: "Conjuguer le verbe VOIR",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : VOIR",
    verb: "voir",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Impératif (×8) + Conditionnel (×8) ── */
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

  "conjuguer-vouloir": {
    title: "Conjuguer le verbe VOULOIR",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : VOULOIR",
    verb: "vouloir",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Impératif (×8) + Conditionnel (×8) ── */
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

  "conjuguer-prendre": {
    title: "Conjuguer le verbe PRENDRE",
    domaine:    "Français",
    competence: "Conjugaison — Verbes irréguliers : PRENDRE",
    verb: "prendre",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "faire-niveaux",
    questionsPerSession: 8,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    pools: {

      /* ── Niveau 1 : Présent (×8) + Imparfait (×6) + Futur simple (×6) + Passé composé (×6) ── */
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

      /* ── Niveau 2 : Passé simple (×8) + Plus-que-parfait (×8) ── */
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

      /* ── Niveau 3 : Impératif (×8) + Conditionnel (×8) ── */
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
     Type : plus-que-parfait-groupes-niveaux
     Niveau 1 : QCM (5) + associer sujet↔forme (5) — sujets = pronoms,
                distracteurs = confusion avec le passé composé (aux. au présent
                vs à l'imparfait) et l'imparfait simple, mélange avoir/être.
     Niveau 2 : SPÉCIFICITÉ — choix binaire avant saisie : le verbe se
                conjugue-t-il avec être ou avoir au plus-que-parfait ? Réutilise
                le motif step1/step2 déjà utilisé pour l'imparfait (hasIss), le
                futur (regRadical) et le passé simple (groupe1). Les 10 phrases
                reprennent telles quelles l'ancienne banque writeBank.
     Niveau 3 : saisie libre, sujet = groupe nominal. Couvre la matrice
                d'accord complète du participe avec être (masc./fém.
                singulier/pluriel + piège d'accord mixte), sur le modèle de
                ortho-accorder-participe-passe-etre (data/orthographe.js).
     Progression verrouillée : seuil 80 %, persistance sessionStorage.
  ══════════════════════════════════════════════════════════════════════════ */

  "conjuguer-plus-que-parfait": {
    title: "Conjuguer au plus-que-parfait",
    domaine:    "Français",
    competence: "Conjugaison — Plus-que-parfait",
    type:       "plus-que-parfait-groupes-niveaux",
    levels:     ["CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    bank: [
      /* ── NIVEAU 1 : QCM (5) — distracteurs passé composé/imparfait ── */
      { level: 1, mode: "mcq", infinitive: "préparer", subject: "elle", choices: ["avait préparé", "a préparé", "préparait", "préparera"], answer: "avait préparé" },
      { level: 1, mode: "mcq", infinitive: "partir",   subject: "elle", choices: ["était partie", "est partie", "partait", "partira"], answer: "était partie" },
      { level: 1, mode: "mcq", infinitive: "manger",   subject: "nous", choices: ["avions mangé", "avons mangé", "mangions", "mangerons"], answer: "avions mangé" },
      { level: 1, mode: "mcq", infinitive: "venir",    subject: "ils",  choices: ["étaient venus", "sont venus", "venaient", "viendront"], answer: "étaient venus" },
      { level: 1, mode: "mcq", infinitive: "finir",    subject: "tu",   choices: ["avais fini", "as fini", "finissais", "finiras"], answer: "avais fini" },

      /* ── NIVEAU 1 : associer sujet ↔ forme (5) ── */
      { level: 1, mode: "matching", infinitive: "chanter", subject: "Elle",  forms: ["avais chanté", "avait chanté", "avions chanté", "aviez chanté", "avaient chanté"], answer: "avait chanté" },
      { level: 1, mode: "matching", infinitive: "finir",   subject: "Ils",   forms: ["avais fini", "avait fini", "avions fini", "aviez fini", "avaient fini"], answer: "avaient fini" },
      { level: 1, mode: "matching", infinitive: "partir",  subject: "Il",    forms: ["étais parti", "était parti", "étions partis", "étiez partis", "étaient partis"], answer: "était parti" },
      { level: 1, mode: "matching", infinitive: "venir",   subject: "Elles", forms: ["étais venue", "était venue", "étions venues", "étiez venues", "étaient venues"], answer: "étaient venues" },
      { level: 1, mode: "matching", infinitive: "manger",  subject: "Vous",  forms: ["avais mangé", "avait mangé", "avions mangé", "aviez mangé", "avaient mangé"], answer: "aviez mangé" },

      /* ── NIVEAU 2 : être ou avoir ? (10) — reprise telle quelle de l'ancienne writeBank ── */
      { level: 2, infinitive: "débuter",   sentence: "Quand nous sommes arrivés, le film ________.",                     answer: "avait débuté",    auxEtre: false },
      { level: 2, infinitive: "partir",    sentence: "Elle ________ bien avant que la pluie tombe.",                     answer: "était partie",    auxEtre: true  },
      { level: 2, infinitive: "manger",    sentence: "Ils ________ avant d'aller jouer.",                                answer: "avaient mangé",   auxEtre: false },
      { level: 2, infinitive: "finir",     sentence: "Tu ________ tes devoirs quand le téléphone a sonné.",              answer: "avais fini",      auxEtre: false },
      { level: 2, infinitive: "se lever",  sentence: "Il ________ si tôt qu'il n'y avait personne dans la rue.",         answer: "s'était levé",    auxEtre: true  },
      { level: 2, infinitive: "lire",      sentence: "Vous ________ ce roman avant d'en discuter en classe.",            answer: "aviez lu",        auxEtre: false },
      { level: 2, infinitive: "manger",    sentence: "Le chat ________ toute la nourriture avant notre retour.",         answer: "avait mangé",     auxEtre: false },
      { level: 2, infinitive: "rentrer",   sentence: "Elles ________ depuis une heure quand il a téléphoné.",            answer: "étaient rentrées", auxEtre: true  },
      { level: 2, infinitive: "faire",     sentence: "Nous ________ nos valises avant que le taxi arrive.",              answer: "avions fait",     auxEtre: false },
      { level: 2, infinitive: "oublier",   sentence: "Comme j'________ mon sac, je suis retourné le chercher.",          answer: "avais oublié",    auxEtre: false },

      /* ── NIVEAU 3 : saisie libre, sujet = GN, matrice d'accord être/avoir (10) ── */
      { level: 3, infinitive: "déposer",  sentence: "Le facteur ________ le colis avant midi.",                          answer: "avait déposé"     },
      { level: 3, infinitive: "finir",    sentence: "Les enfants ________ leurs devoirs avant le dîner.",                answer: "avaient fini"     },
      { level: 3, infinitive: "préparer", sentence: "La sorcière ________ un piège terrible avant l'arrivée du héros.",  answer: "avait préparé"    },
      { level: 3, infinitive: "fermer",   sentence: "Les gardes ________ toutes les portes avant l'aube.",               answer: "avaient fermé"    },
      { level: 3, infinitive: "manger",   sentence: "Le chien ________ tout son repas avant notre retour.",              answer: "avait mangé"      },
      { level: 3, infinitive: "arriver",  sentence: "Jules ________ en avance ce matin-là.",                             answer: "était arrivé"     },
      { level: 3, infinitive: "arriver",  sentence: "La reine ________ la première dans la salle du trône.",             answer: "était arrivée"    },
      { level: 3, infinitive: "partir",   sentence: "Les voyageurs ________ tôt ce matin-là, avant le lever du soleil.", answer: "étaient partis"   },
      { level: 3, infinitive: "rentrer",  sentence: "Les filles ________ avant la tombée de la nuit.",                   answer: "étaient rentrées" },
      { level: 3, infinitive: "venir",    sentence: "Paul et Marie ________ ensemble à la fête, main dans la main.",     answer: "étaient venus"    }
    ]
  },

  "conjuguer-imperatif-present": {
    title:              "Conjuguer à l'impératif présent",
    domaine:    "Français",
    competence: "Conjugaison — Impératif présent",
    levels:             ["CM2", "6e"],
    paliers:            2, /* nombre réel de paliers du moteur */
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
    domaine:    "Français",
    competence: "Conjugaison — Conditionnel présent",
    levels:              ["6e"],
    paliers:             2, /* nombre réel de paliers du moteur */
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

  "conjuguer-passe-compose-avoir": {
    title: "Le passé composé avec avoir",
    domaine:    "Français",
    competence: "Conjugaison — Passé composé avec avoir",
    type: "pc-avoir-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* ── Niveau 1 — Participes en -é (1er groupe) et -i (2e groupe) ──────────
       Pool de 14 items, tirage de 10 par session.
    ─────────────────────────────────────────────────────────────────────────── */
    level1Bank: [
      /* 1er groupe — participe en -é */
      {
        sentence: "Hier, nous ___ (manger) une pizza.",
        blanks: [{ infinitive: "manger", answer: "avons mangé", trap: false, group: 1 }]
      },
      {
        sentence: "Elle ___ (chanter) toute la journée.",
        blanks: [{ infinitive: "chanter", answer: "a chanté", trap: false, group: 1 }]
      },
      {
        sentence: "J'___ (regarder) un film ce soir.",
        blanks: [{ infinitive: "regarder", answer: "ai regardé", trap: false, group: 1 }]
      },
      {
        sentence: "Le chien ___ (sauter) par-dessus la barrière.",
        blanks: [{ infinitive: "sauter", answer: "a sauté", trap: false, group: 1 }]
      },
      {
        sentence: "Tu ___ (écouter) de la musique ?",
        blanks: [{ infinitive: "écouter", answer: "as écouté", trap: false, group: 1 }]
      },
      {
        sentence: "Elle ___ (dessiner) un château.",
        blanks: [{ infinitive: "dessiner", answer: "a dessiné", trap: false, group: 1 }]
      },
      {
        sentence: "Vous ___ (danser) toute la nuit.",
        blanks: [{ infinitive: "danser", answer: "avez dansé", trap: false, group: 1 }]
      },
      /* 2e groupe — participe en -i */
      {
        sentence: "Tu ___ (finir) tes devoirs ?",
        blanks: [{ infinitive: "finir", answer: "as fini", trap: false, group: 2 }]
      },
      {
        sentence: "Ils ___ (choisir) le chemin le plus court.",
        blanks: [{ infinitive: "choisir", answer: "ont choisi", trap: false, group: 2 }]
      },
      {
        sentence: "Vous ___ (remplir) le formulaire.",
        blanks: [{ infinitive: "remplir", answer: "avez rempli", trap: false, group: 2 }]
      },
      {
        sentence: "Nous ___ (obéir) aux consignes.",
        blanks: [{ infinitive: "obéir", answer: "avons obéi", trap: false, group: 2 }]
      },
      {
        sentence: "Ils ___ (applaudir) très fort.",
        blanks: [{ infinitive: "applaudir", answer: "ont applaudi", trap: false, group: 2 }]
      },
      {
        sentence: "J'___ (réfléchir) longtemps avant de répondre.",
        blanks: [{ infinitive: "réfléchir", answer: "ai réfléchi", trap: false, group: 2 }]
      },
      {
        sentence: "Nous ___ (avertir) les secours.",
        blanks: [{ infinitive: "avertir", answer: "avons averti", trap: false, group: 2 }]
      }
    ],

    /* ── Niveau 2 — Participes irréguliers en -s, -u, -t (3e groupe) ─────────
       Pool de 15 items, tirage de 10 par session.
    ─────────────────────────────────────────────────────────────────────────── */
    level2Bank: [
      /* Participes en -s */
      {
        sentence: "J'___ (prendre) le mauvais bus.",
        blanks: [{ infinitive: "prendre", answer: "ai pris", trap: false,
          feedbackBadPP: "prendre → <strong>pris</strong> (même famille : surpris, appris, compris)." }]
      },
      {
        sentence: "Elle ___ (mettre) son manteau.",
        blanks: [{ infinitive: "mettre", answer: "a mis", trap: false,
          feedbackBadPP: "mettre → <strong>mis</strong>. Les verbes en -<em>ettre</em> font leur participe en -<em>is</em>." }]
      },
      {
        sentence: "Nous ___ (apprendre) une nouvelle chanson.",
        blanks: [{ infinitive: "apprendre", answer: "avons appris", trap: false,
          feedbackBadPP: "apprendre → <strong>appris</strong> (même famille : pris, compris, surpris)." }]
      },
      {
        sentence: "Ils ___ (comprendre) la leçon.",
        blanks: [{ infinitive: "comprendre", answer: "ont compris", trap: false,
          feedbackBadPP: "comprendre → <strong>compris</strong> (même famille : pris, appris, surpris)." }]
      },
      {
        sentence: "Tu ___ (promettre) de revenir.",
        blanks: [{ infinitive: "promettre", answer: "as promis", trap: false,
          feedbackBadPP: "promettre → <strong>promis</strong>. Les verbes en -<em>ettre</em> font leur participe en -<em>is</em>." }]
      },
      /* Participes en -u */
      {
        sentence: "Il ___ (pouvoir) terminer à temps.",
        blanks: [{ infinitive: "pouvoir", answer: "a pu", trap: false,
          feedbackBadPP: "pouvoir → <strong>pu</strong>. Participe passé court et invariable." }]
      },
      {
        sentence: "Vous ___ (savoir) répondre.",
        blanks: [{ infinitive: "savoir", answer: "avez su", trap: false,
          feedbackBadPP: "savoir → <strong>su</strong>. Participe passé court et invariable." }]
      },
      {
        sentence: "J'___ (vouloir) partir tôt.",
        blanks: [{ infinitive: "vouloir", answer: "ai voulu", trap: false,
          feedbackBadPP: "vouloir → <strong>voulu</strong>. Participe irrégulier en -<em>u</em>." }]
      },
      {
        sentence: "Nous ___ (voir) un aigle dans le ciel.",
        blanks: [{ infinitive: "voir", answer: "avons vu", trap: false,
          feedbackBadPP: "voir → <strong>vu</strong>. Participe passé court et invariable." }]
      },
      {
        sentence: "Elles ___ (recevoir) une lettre.",
        blanks: [{ infinitive: "recevoir", answer: "ont reçu", trap: false,
          feedbackBadPP: "recevoir → <strong>reçu</strong>. Attention au ç ! Participe en -<em>u</em>." }]
      },
      /* Participes en -t */
      {
        sentence: "Tu ___ (faire) un effort.",
        blanks: [{ infinitive: "faire", answer: "as fait", trap: false,
          feedbackBadPP: "faire → <strong>fait</strong>. Verbe irrégulier très fréquent." }]
      },
      {
        sentence: "Il ___ (dire) la vérité.",
        blanks: [{ infinitive: "dire", answer: "a dit", trap: false,
          feedbackBadPP: "dire → <strong>dit</strong>. Verbe irrégulier." }]
      },
      {
        sentence: "Nous ___ (écrire) une histoire.",
        blanks: [{ infinitive: "écrire", answer: "avons écrit", trap: false,
          feedbackBadPP: "écrire → <strong>écrit</strong>. Les verbes en -<em>ire</em> font leur participe en -<em>it</em>." }]
      },
      {
        sentence: "J'___ (conduire) jusqu'à Madrid.",
        blanks: [{ infinitive: "conduire", answer: "ai conduit", trap: false,
          feedbackBadPP: "conduire → <strong>conduit</strong>. Les verbes en -<em>uire</em> font leur participe en -<em>it</em>." }]
      },
      {
        sentence: "Elles ___ (peindre) un tableau.",
        blanks: [{ infinitive: "peindre", answer: "ont peint", trap: false,
          feedbackBadPP: "peindre → <strong>peint</strong>. Les verbes en -<em>eindre</em> font leur participe en -<em>eint</em>." }]
      }
    ],

    /* ── Niveau 3 — Mélange des trois groupes + phrases complexes ────────────
       Pool de 14 items, tirage de 10 par session.
       Pièges être (trap:true) : non pénalisants, juste un éveil.
    ─────────────────────────────────────────────────────────────────────────── */
    level3Bank: [
      {
        sentence: "Ce matin, Paul et Léa ___ (finir) leur petit-déjeuner rapidement.",
        blanks: [{ infinitive: "finir", answer: "ont fini", trap: false,
          feedbackBadPP: "finir → <strong>fini</strong> (2<sup>e</sup> groupe, participe en -<em>i</em>)." }]
      },
      {
        sentence: "Hier soir, nous ___ (voir) un très beau coucher de soleil.",
        blanks: [{ infinitive: "voir", answer: "avons vu", trap: false,
          feedbackBadPP: "voir → <strong>vu</strong> (3<sup>e</sup> groupe, participe irrégulier en -<em>u</em>)." }]
      },
      {
        sentence: "Tu ___ (manger) et ensuite tu ___ (partir)… non, attends !",
        blanks: [
          { infinitive: "manger", answer: "as mangé", trap: false,
            feedbackBadPP: "manger → <strong>mangé</strong> (1<sup>er</sup> groupe, participe en -<em>é</em>)." },
          { infinitive: "partir", answer: null, trap: true,
            trapMessage: "<em>Partir</em> se conjugue avec <strong>être</strong>, pas avoir ! On dit : tu <em>es parti(e)</em>." }
        ]
      },
      {
        sentence: "Elle ___ (écrire) une longue lettre à sa grand-mère.",
        blanks: [{ infinitive: "écrire", answer: "a écrit", trap: false,
          feedbackBadPP: "écrire → <strong>écrit</strong> (3<sup>e</sup> groupe, verbes en -<em>ire</em> → participe en -<em>it</em>)." }]
      },
      {
        sentence: "Ils ___ (choisir) le bon chemin et ___ (prendre) la bonne décision.",
        blanks: [
          { infinitive: "choisir", answer: "ont choisi", trap: false,
            feedbackBadPP: "choisir → <strong>choisi</strong> (2<sup>e</sup> groupe, participe en -<em>i</em>)." },
          { infinitive: "prendre", answer: "ont pris", trap: false,
            feedbackBadPP: "prendre → <strong>pris</strong> (3<sup>e</sup> groupe, participe en -<em>is</em>)." }
        ]
      },
      {
        sentence: "J'___ (vouloir) appeler mais je n'___ (pouvoir) pas.",
        blanks: [
          { infinitive: "vouloir", answer: "ai voulu", trap: false,
            feedbackBadPP: "vouloir → <strong>voulu</strong> (3<sup>e</sup> groupe, participe en -<em>u</em>)." },
          { infinitive: "pouvoir", answer: "ai pu", trap: false,
            feedbackBadPP: "pouvoir → <strong>pu</strong> (3<sup>e</sup> groupe, participe irrégulier court)." }
        ]
      },
      {
        sentence: "Vous ___ (apprendre) cette règle et vous ___ (réussir) le test.",
        blanks: [
          { infinitive: "apprendre", answer: "avez appris", trap: false,
            feedbackBadPP: "apprendre → <strong>appris</strong> (3<sup>e</sup> groupe, famille : pris, compris)." },
          { infinitive: "réussir", answer: "avez réussi", trap: false,
            feedbackBadPP: "réussir → <strong>réussi</strong> (2<sup>e</sup> groupe, participe en -<em>i</em>)." }
        ]
      },
      {
        sentence: "Le chat ___ (sauter) sur la table et ___ (renverser) le verre.",
        blanks: [
          { infinitive: "sauter", answer: "a sauté", trap: false,
            feedbackBadPP: "sauter → <strong>sauté</strong> (1<sup>er</sup> groupe, participe en -<em>é</em>)." },
          { infinitive: "renverser", answer: "a renversé", trap: false,
            feedbackBadPP: "renverser → <strong>renversé</strong> (1<sup>er</sup> groupe, participe en -<em>é</em>)." }
        ]
      },
      {
        sentence: "Nous ___ (dire) bonjour et nous ___ (repartir).",
        blanks: [
          { infinitive: "dire", answer: "avons dit", trap: false,
            feedbackBadPP: "dire → <strong>dit</strong> (3<sup>e</sup> groupe, verbe irrégulier)." },
          { infinitive: "repartir", answer: null, trap: true,
            trapMessage: "<em>Repartir</em> se conjugue avec <strong>être</strong>, pas avoir ! On dit : nous <em>sommes repartis</em>." }
        ]
      },
      {
        sentence: "Elle ___ (peindre) toute la matinée puis elle ___ (ranger) ses affaires.",
        blanks: [
          { infinitive: "peindre", answer: "a peint", trap: false,
            feedbackBadPP: "peindre → <strong>peint</strong>. Les verbes en -<em>eindre</em> font leur participe en -<em>eint</em>." },
          { infinitive: "ranger", answer: "a rangé", trap: false,
            feedbackBadPP: "ranger → <strong>rangé</strong> (1<sup>er</sup> groupe, participe en -<em>é</em>)." }
        ]
      },
      {
        sentence: "Tu ___ (recevoir) le colis que j'___ (envoyer) ?",
        blanks: [
          { infinitive: "recevoir", answer: "as reçu", trap: false,
            feedbackBadPP: "recevoir → <strong>reçu</strong> (3<sup>e</sup> groupe, participe irrégulier). Attention au ç !" },
          { infinitive: "envoyer", answer: "ai envoyé", trap: false,
            feedbackBadPP: "envoyer → <strong>envoyé</strong> (1<sup>er</sup> groupe, participe en -<em>é</em>)." }
        ]
      },
      {
        sentence: "Ils ___ (mettre) la table et ___ (servir) le repas.",
        blanks: [
          { infinitive: "mettre", answer: "ont mis", trap: false,
            feedbackBadPP: "mettre → <strong>mis</strong> (3<sup>e</sup> groupe, verbes en -<em>ettre</em> → participe en -<em>is</em>)." },
          { infinitive: "servir", answer: "ont servi", trap: false,
            feedbackBadPP: "servir → <strong>servi</strong> (3<sup>e</sup> groupe, participe en -<em>i</em> comme le 2<sup>e</sup> groupe)." }
        ]
      },
      {
        sentence: "Nous ___ (comprendre) la question mais nous ___ (répondre) trop vite.",
        blanks: [
          { infinitive: "comprendre", answer: "avons compris", trap: false,
            feedbackBadPP: "comprendre → <strong>compris</strong> (3<sup>e</sup> groupe, famille : pris, appris)." },
          { infinitive: "répondre", answer: "avons répondu", trap: false,
            feedbackBadPP: "répondre → <strong>répondu</strong> (3<sup>e</sup> groupe, participe en -<em>u</em>)." }
        ]
      },
      {
        sentence: "J'___ (conduire) jusqu'au village et j'___ (découvrir) un marché.",
        blanks: [
          { infinitive: "conduire", answer: "ai conduit", trap: false,
            feedbackBadPP: "conduire → <strong>conduit</strong> (3<sup>e</sup> groupe, verbes en -<em>uire</em> → participe en -<em>it</em>)." },
          { infinitive: "découvrir", answer: "ai découvert", trap: false,
            feedbackBadPP: "découvrir → <strong>découvert</strong> (3<sup>e</sup> groupe, verbes en -<em>vrir</em> → participe en -<em>vert</em>)." }
        ]
      }
    ]
  },

  "etre-ou-avoir": {
    title: "Être ou avoir ?",
    domaine:    "Français",
    competence: "Conjugaison — Choisir l'auxiliaire être ou avoir au passé composé",
    type: "etre-ou-avoir-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 12,
    backLink: { href: "français-conjugaison.html", label: "Conjugaison" },

    /* Niveau 1 — verbes clairement être ou avoir, cas non ambigus */
    level1Bank: [
      { sentence: "Hier, elle ___ partie tôt.",     auxiliary: "être",  answer: "est"   },
      { sentence: "Nous ___ mangé une pizza.",       auxiliary: "avoir", answer: "avons" },
      { sentence: "Ils ___ arrivés en retard.",      auxiliary: "être",  answer: "sont"  },
      { sentence: "Tu ___ fini tes devoirs ?",       auxiliary: "avoir", answer: "as"    },
      { sentence: "Je ___ allé au parc.",            auxiliary: "être",  answer: "suis"  },
      { sentence: "Vous ___ choisi le bon chemin.",  auxiliary: "avoir", answer: "avez"  },
      { sentence: "Elle ___ née en avril.",          auxiliary: "être",  answer: "est"   },
      { sentence: "Nous ___ écrit une lettre.",      auxiliary: "avoir", answer: "avons" },
      { sentence: "Il ___ tombé dans la cour.",      auxiliary: "être",  answer: "est"   },
      { sentence: "Elles ___ venues nous voir.",     auxiliary: "être",  answer: "sont"  },
      { sentence: "Tu ___ pris ton sac.",            auxiliary: "avoir", answer: "as"    },
      { sentence: "J'___ fait un gâteau.",           auxiliary: "avoir", answer: "ai"    }
    ],

    /* Niveau 2 — pronominaux + pièges */
    level2Bank: [
      { sentence: "Elle ___ levée à 7h.",              auxiliary: "être",  answer: "s'est",        feedbackType: "pronominal"  },
      { sentence: "Il ___ souvenu de moi.",             auxiliary: "être",  answer: "s'est",        feedbackType: "pronominal"  },
      { sentence: "Elles ___ dépêchées ce matin.",      auxiliary: "être",  answer: "se sont",      feedbackType: "pronominal"  },
      { sentence: "Il ___ trompé de route.",            auxiliary: "être",  answer: "s'est",        feedbackType: "pronominal"  },
      { sentence: "Nous ___ promenés dans le parc.",    auxiliary: "être",  answer: "nous sommes",  feedbackType: "pronominal"  },
      { sentence: "Tu ___ eu peur.",                    auxiliary: "avoir", answer: "as",           feedbackType: "trap-avoir"  },
      { sentence: "Tu ___ été malade.",                 auxiliary: "avoir", answer: "as",           feedbackType: "trap-etre"   },
      { sentence: "Ils ___ restés à la maison.",        auxiliary: "être",  answer: "sont"                                      },
      { sentence: "Elle ___ blessée au genou.",         auxiliary: "être",  answer: "s'est",        feedbackType: "pronominal"  },
      { sentence: "Vous ___ sortis sans manteau.",      auxiliary: "être",  answer: "êtes"                                      },
      { sentence: "J'___ passé une bonne journée.",     auxiliary: "avoir", answer: "ai",           feedbackType: "trap-passer" },
      { sentence: "Nous ___ rentrés à minuit.",         auxiliary: "être",  answer: "sommes"                                    }
    ],

    /* Niveau 3 — verbes à double auxiliaire selon le sens */
    level3Bank: [
      { sentence: "Elle ___ monté les valises.",      auxiliary: "avoir", answer: "a",      cod: "les valises" },
      { sentence: "Elle ___ montée dans sa chambre.", auxiliary: "être",  answer: "est"                        },
      { sentence: "Il ___ sorti le chien.",           auxiliary: "avoir", answer: "a",      cod: "le chien"    },
      { sentence: "Il ___ sorti dans le jardin.",     auxiliary: "être",  answer: "est"                        },
      { sentence: "Nous ___ descendu les cartons.",   auxiliary: "avoir", answer: "avons",  cod: "les cartons" },
      { sentence: "Nous ___ descendus à la cave.",    auxiliary: "être",  answer: "sommes"                     },
      { sentence: "Tu ___ rentré le vélo.",           auxiliary: "avoir", answer: "as",     cod: "le vélo"     },
      { sentence: "Tu ___ rentré à la maison.",       auxiliary: "être",  answer: "es"                         },
      { sentence: "Elle ___ retourné la crêpe.",      auxiliary: "avoir", answer: "a",      cod: "la crêpe"    },
      { sentence: "Elle ___ retournée chez sa mère.", auxiliary: "être",  answer: "est"                        }
    ]
  }

});

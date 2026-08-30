/* ── data/nombres-entiers.js — Nombres entiers (11 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "ecrire-nombre-entier-chiffres": {
    title: "Écrire un nombre en chiffres",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Écriture chiffrée",
    type: "nombre-entier",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    bank: [

      /* ── Niveau 1 — 10 questions, jusqu'à 999 999 ──────────────────────────── */
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
      { level: "CM1", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cent-mille-huit",
        answer: "100 008", choices: ["100 008", "100 080", "10 008", "100 800"] },

      /* ── Niveau 2 — 10 questions, jusqu'à 999 999 999 ──────────────────────── */
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

      /* ── Niveau 3 — 10 questions, nombres supérieurs au milliard ────────────── */
      { level: "6e", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "un-milliard-cinquante-millions",
        answer: "1 050 000 000", choices: ["1 050 000 000", "1 005 000 000", "1 500 000 000", "1 050 000 000 000"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "deux-milliards-trois-cent-millions",
        answer: "2 300 000 000" },
      { level: "6e", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cinq-milliards-cinquante-mille",
        answer: "5 000 050 000", choices: ["5 000 050 000", "5 000 500 000", "5 050 000 000", "5 000 005 000"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "dix-milliards-quatre-cent-vingt-millions",
        answer: "10 420 000 000" },
      { level: "6e", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "vingt-cinq-milliards",
        answer: "25 000 000 000", choices: ["25 000 000 000", "2 500 000 000", "250 000 000 000", "25 000 000 000 000"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "cinquante-milliards-six-millions",
        answer: "50 006 000 000" },
      { level: "6e", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "un-milliard-deux-cent-millions",
        answer: "1 200 000 000", choices: ["1 200 000 000", "1 020 000 000", "1 002 000 000", "12 000 000 000"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "soixante-quinze-milliards-trois-cent-millions-quarante-deux-mille",
        answer: "75 300 042 000" },
      { level: "6e", inputMode: "qcm",
        instruction: "Écris en chiffres :", word: "cent-milliards",
        answer: "100 000 000 000", choices: ["100 000 000 000", "10 000 000 000", "1 000 000 000 000", "100 000 000"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en chiffres :", word: "deux-cent-milliards",
        answer: "200 000 000 000" }
    ]
  },

  "ecrire-nombre-entier-lettres": {
    title: "Écrire un nombre en lettres",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Écriture en lettres",
    type: "nombre-entier",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },
    bank: [

      /* ── Niveau 1 — 10 questions, jusqu'à 999 999 ──────────────────────────── */
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

      /* ── Niveau 2 — 10 questions, millions et milliards ─────────────────────── */
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

      /* ── Niveau 3 — 10 questions, nombres supérieurs au milliard ────────────── */
      /* Pièges : invariabilité de "un milliard", accord de milliard(s), cent devant milliard */
      { level: "6e", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "1 000 000 500",
        answer: "un-milliard-cinq-cents",
        choices: ["un-milliard-cinq-cents", "un-milliards-cinq-cents", "un-milliard-cinq-cent", "un-million-cinq-cents"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "2 000 000 000",
        answer: "deux-milliards" },
      { level: "6e", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "100 000 000 000",
        answer: "cent-milliards",
        choices: ["cent-milliards", "cent-milliard", "cents-milliards", "cent-milliars"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "5 002 000 000",
        answer: "cinq-milliards-deux-millions" },
      { level: "6e", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "12 000 000 000",
        answer: "douze-milliards",
        choices: ["douze-milliards", "douze-milliard", "douze-millions", "douze-cent-milliards"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "1 200 000 000",
        answer: "un-milliard-deux-cent-millions" },
      { level: "6e", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "750 000 000 000",
        answer: "sept-cent-cinquante-milliards",
        choices: ["sept-cent-cinquante-milliards", "sept-cents-cinquante-milliards", "sept-cent-cinquante-milliard", "soixante-quinze-milliards"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "2 500 000 000",
        answer: "deux-milliards-cinq-cent-millions" },
      { level: "6e", inputMode: "qcm",
        instruction: "Choisis l'écriture correcte en lettres :", word: "25 000 000 000",
        answer: "vingt-cinq-milliards",
        choices: ["vingt-cinq-milliards", "vingt-cinq-milliard", "vingt-cinq-millions", "deux-cent-cinquante-milliards"] },
      { level: "6e", inputMode: "saisie",
        instruction: "Écris ce nombre en lettres :", word: "99 099 099 099",
        answer: "quatre-vingt-dix-neuf-milliards-quatre-vingt-dix-neuf-millions-quatre-vingt-dix-neuf-mille-quatre-vingt-dix-neuf" }
    ]
  },

  "identifier-valeur-chiffre-position": {
    title: "Identifier la valeur d'un chiffre selon sa position",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Valeur positionnelle",
    type:       "identifier-valeur-position-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Nombres entiers jusqu'à 6 chiffres — chiffre des…",
      "CM2": "Nombres entiers jusqu'à 9 chiffres — chiffre des… et nombre de…",
      "6e":  "Nombres décimaux — chiffre des… et nombre de…"
    },
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — QCM : « chiffre des… » (nombres ≤ 6 chiffres) ──
       distracteurs = chiffre pris à d'autres positions du même nombre */
    lvl1: [
      { n: 452786, rang: "unités",              reponse: 6, distracteurs: [8, 7, 2] },
      { n: 613940, rang: "dizaines",             reponse: 4, distracteurs: [0, 9, 3] },
      { n: 875231, rang: "centaines",            reponse: 2, distracteurs: [3, 1, 5] },
      { n: 349617, rang: "milliers",             reponse: 9, distracteurs: [4, 3, 6] },
      { n: 726458, rang: "dizaines de mille",    reponse: 2, distracteurs: [7, 6, 4] },
      { n: 158964, rang: "centaines de mille",   reponse: 1, distracteurs: [5, 8, 9] },
      { n: 937042, rang: "unités",               reponse: 2, distracteurs: [4, 0, 7] },
      { n: 264719, rang: "dizaines",             reponse: 1, distracteurs: [9, 7, 4] },
      { n: 583176, rang: "centaines",            reponse: 1, distracteurs: [7, 6, 3] },
      { n: 461823, rang: "milliers",             reponse: 1, distracteurs: [8, 2, 6] }
    ],

    /* ── Niveau 2 — nombres ≤ 9 chiffres ──
       mode "chiffre" : clic sur le chiffre isolé demandé
       mode "groupe"  : clic sur le groupe de chiffres contigus (depuis la
                        gauche) représentant le nombre d'unités de ce rang */
    lvl2: [
      { mode: "chiffre", n: 345678912, rang: "centaines de mille" },
      { mode: "chiffre", n: 128934567, rang: "dizaines de millions" },
      { mode: "chiffre", n: 906452178, rang: "unités de mille" },
      { mode: "chiffre", n: 573891246, rang: "centaines de millions" },
      { mode: "chiffre", n: 214967038, rang: "dizaines de mille" },
      { mode: "groupe",  n: 45678,  rang: "centaines" },
      { mode: "groupe",  n: 128934, rang: "dizaines de mille" },
      { mode: "groupe",  n: 906452, rang: "milliers" },
      { mode: "groupe",  n: 573891, rang: "centaines" },
      { mode: "groupe",  n: 214967, rang: "dizaines" }
    ],

    /* ── Niveau 3 — nombres décimaux ──
       mode "chiffre" : clic sur le chiffre isolé au rang décimal demandé
       mode "nombre"  : saisie du nombre total d'unités du rang demandé */
    lvl3: [
      { mode: "chiffre", nombre: "47,308",  rang: "dixièmes" },
      { mode: "chiffre", nombre: "152,904", rang: "centièmes" },
      { mode: "chiffre", nombre: "8,675",   rang: "millièmes" },
      { mode: "chiffre", nombre: "93,014",  rang: "dixièmes" },
      { mode: "chiffre", nombre: "6,247",   rang: "centièmes" },
      { mode: "nombre",  nombre: "47,308",  rang: "dixièmes" },
      { mode: "nombre",  nombre: "152,904", rang: "centièmes" },
      { mode: "nombre",  nombre: "93,014",  rang: "dixièmes" },
      { mode: "nombre",  nombre: "8,675",   rang: "centièmes" },
      { mode: "nombre",  nombre: "6,247",   rang: "dixièmes" }
    ]
  },

  "decomposer-nombre-entier": {
    title:      "Décomposer un nombre entier",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Décomposition",
    type:       "decomposer-nombre-entier-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Nombres à 3-4 chiffres, sans zéro",
      "CM2": "Nombres à 4-5 chiffres, avec un zéro intercalé",
      "6e":  "Nombres à 5-6 chiffres + question piège sur les positions"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Génération procédurale ────────────────────────────────────────
       À chaque tentative, dniBuildItem() (exercise.html) tire un nombre
       aléatoire selon ces règles puis un format (additif / multiplicatif).
       Aucune banque fixe : itemsPerLevel questions fraîches par session. */
    genRules: {
      1: { digitsMin: 3, digitsMax: 4, noZero: true },
      2: { digitsMin: 4, digitsMax: 5, requireInteriorZero: true },
      3: { digitsMin: 5, digitsMax: 6, trap: true }
    },
    itemsPerLevel: 10,

    /* ── Exemples statiques (nouveau format) — utilisés uniquement par
       l'aperçu enseignant (js/competence-preview.js) ; le moteur d'exercice
       ignore ces tableaux et génère toujours à la volée. ── */
    lvl1: [
      { display: "3 456", value: 3456, format: "multiplicative",
        digits: [3, 4, 5, 6],
        positions: [
          { name: "Milliers",  mult: 1000 }, { name: "Centaines", mult: 100 },
          { name: "Dizaines",  mult: 10 },   { name: "Unités",    mult: 1 }
        ] }
    ],
    lvl2: [
      { display: "4 059", value: 4059, format: "additive",
        digits: [4, 0, 5, 9],
        positions: [
          { name: "Milliers",  mult: 1000 }, { name: "Centaines", mult: 100 },
          { name: "Dizaines",  mult: 10 },   { name: "Unités",    mult: 1 }
        ] }
    ],
    lvl3: [
      { display: "306 050", value: 306050, format: "additive",
        digits: [3, 0, 6, 0, 5, 0],
        positions: [
          { name: "Centaines de mille", mult: 100000 }, { name: "Dizaines de mille", mult: 10000 },
          { name: "Milliers",           mult: 1000 },   { name: "Centaines",         mult: 100 },
          { name: "Dizaines",           mult: 10 },     { name: "Unités",            mult: 1 }
        ],
        trap: { name: "Unités de million", mult: 1000000 } }
    ]
  },

  "comparer-nombres-entiers": {
    title:      "Comparer deux nombres entiers",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Comparaison",
    type:       "comparer-nombres-entiers-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "4 chiffres — pièges : zéros intercalés, chiffres identiques sauf un rang",
      "CM2": "Nombres plus grands, comparaisons plus fines",
      "6e":  "Niveau expert"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — 4 chiffres, pièges : zéros intercalés, chiffres identiques sauf un rang ── */
    lvl1: [
      { left: "3 450", right: "3 540", answer: "<", explication: "3 450 < 3 540 — même nombre de chiffres, les centaines diffèrent : 4 < 5" },
      { left: "9 100", right: "8 999", answer: ">", explication: "9 100 > 8 999 — les milliers diffèrent : 9 > 8" },
      { left: "4 070", right: "4 700", answer: "<", explication: "4 070 < 4 700 — les centaines diffèrent : 0 < 7" },
      { left: "6 315", right: "6 135", answer: ">", explication: "6 315 > 6 135 — les centaines diffèrent : 3 > 1" },
      { left: "2 008", right: "2 080", answer: "<", explication: "2 008 < 2 080 — les dizaines diffèrent : 0 < 8" },
      { left: "5 000", right: "4 999", answer: ">", explication: "5 000 > 4 999 — les milliers diffèrent : 5 > 4" },
      { left: "8 040", right: "8 400", answer: "<", explication: "8 040 < 8 400 — les centaines diffèrent : 0 < 4" },
      { left: "3 900", right: "3 009", answer: ">", explication: "3 900 > 3 009 — les centaines diffèrent : 9 > 0" },
      { left: "7 010", right: "7 100", answer: "<", explication: "7 010 < 7 100 — les centaines diffèrent : 0 < 1" },
      { left: "1 980", right: "1 890", answer: ">", explication: "1 980 > 1 890 — les centaines diffèrent : 9 > 8" }
    ],

    /* ── Niveau 2 — 5–6 chiffres, longueurs différentes, zéros en position critique ── */
    lvl2: [
      { left: "304 500",   right: "340 500",   answer: "<", explication: "304 500 < 340 500 — les dizaines de milliers diffèrent : 0 < 4" },
      { left: "99 999",    right: "100 000",   answer: "<", explication: "99 999 < 100 000 — 100 000 a 6 chiffres, 99 999 en a 5 : le plus long est le plus grand" },
      { left: "820 070",   right: "82 007",    answer: ">", explication: "820 070 > 82 007 — 820 070 a 6 chiffres, 82 007 en a 5 : le plus long est le plus grand" },
      { left: "267 010",   right: "267 100",   answer: "<", explication: "267 010 < 267 100 — les centaines diffèrent : 0 < 1" },
      { left: "999 999",   right: "1 000 000", answer: "<", explication: "999 999 < 1 000 000 — 1 000 000 a 7 chiffres, 999 999 en a 6 : le plus long est le plus grand" },
      { left: "450 060",   right: "405 060",   answer: ">", explication: "450 060 > 405 060 — les dizaines de milliers diffèrent : 5 > 0" },
      { left: "760 001",   right: "760 010",   answer: "<", explication: "760 001 < 760 010 — les dizaines diffèrent : 0 < 1" },
      { left: "530 000",   right: "503 000",   answer: ">", explication: "530 000 > 503 000 — les dizaines de milliers diffèrent : 3 > 0" },
      { left: "100 001",   right: "99 999",    answer: ">", explication: "100 001 > 99 999 — 100 001 a 6 chiffres, 99 999 en a 5 : le plus long est le plus grand" },
      { left: "408 200",   right: "480 200",   answer: "<", explication: "408 200 < 480 200 — les dizaines de milliers diffèrent : 0 < 8" }
    ],

    /* ── Niveau 3 — jusqu'au million et au-delà, symétries trompeuses ── */
    lvl3: [
      { left: "3 070 450", right: "3 700 450", answer: "<", explication: "3 070 450 < 3 700 450 — les millions sont égaux (3), les centaines de milliers diffèrent : 0 < 7" },
      { left: "1 000 000", right: "999 999",   answer: ">", explication: "1 000 000 > 999 999 — 1 000 000 a 7 chiffres, 999 999 en a 6 : le plus long est le plus grand" },
      { left: "4 004 004", right: "4 040 040", answer: "<", explication: "4 004 004 < 4 040 040 — les dizaines de milliers diffèrent : 0 < 4" },
      { left: "2 200 220", right: "2 020 202", answer: ">", explication: "2 200 220 > 2 020 202 — les centaines de milliers diffèrent : 2 > 0" },
      { left: "5 000 001", right: "5 000 010", answer: "<", explication: "5 000 001 < 5 000 010 — les dizaines diffèrent : 0 < 1" },
      { left: "6 300 000", right: "6 030 000", answer: ">", explication: "6 300 000 > 6 030 000 — les centaines de milliers diffèrent : 3 > 0" },
      { left: "8 080 080", right: "8 800 800", answer: "<", explication: "8 080 080 < 8 800 800 — les centaines de milliers diffèrent : 0 < 8" },
      { left: "3 999 999", right: "4 000 000", answer: "<", explication: "3 999 999 < 4 000 000 — les millions diffèrent : 3 < 4" },
      { left: "7 070 707", right: "7 700 770", answer: "<", explication: "7 070 707 < 7 700 770 — les centaines de milliers diffèrent : 0 < 7" },
      { left: "9 000 100", right: "8 999 999", answer: ">", explication: "9 000 100 > 8 999 999 — les millions diffèrent : 9 > 8" }
    ]
  },

  "composer-nombre-entier": {
    title:      "Composer un nombre à partir de sa décomposition",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Composition",
    type:       "composer-nombre-entier-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Nombres à 3-4 chiffres, sans zéro",
      "CM2": "Nombres à 4-5 chiffres, avec un zéro intercalé",
      "6e":  "Nombres à 5-6 chiffres"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Génération procédurale — moteur partagé avec decomposer-nombre-
       entier (sens inverse : ici la décomposition est donnée, l'élève
       recompose le nombre). dniGenerateDigits()/DNI_POSITIONS/dniFmtVal()
       (exercise.html) sont réutilisées telles quelles ; cniBuildItem() ne
       fait qu'assembler l'affichage et la réponse à partir des mêmes
       chiffres générés. Aucune banque fixe : itemsPerLevel questions
       fraîches par session. */
    genRules: {
      1: { digitsMin: 3, digitsMax: 4, noZero: true },
      2: { digitsMin: 4, digitsMax: 5, requireInteriorZero: true },
      3: { digitsMin: 5, digitsMax: 6 }
    },
    itemsPerLevel: 10,

    /* ── Exemples statiques (nouveau format) — utilisés uniquement par
       l'aperçu enseignant (js/competence-preview.js) ; le moteur d'exercice
       ignore ces tableaux et génère toujours à la volée. ── */
    lvl1: [
      { display: "(3 × 100) + (4 × 10) + (5 × 1)", value: 345, format: "multiplicative" }
    ],
    lvl2: [
      { display: "4 000 + 50 + 9", value: 4059, format: "additive" }
    ],
    lvl3: [
      { display: "(3 × 100 000) + (0 × 10 000) + (6 × 1 000) + (0 × 100) + (5 × 10) + (0 × 1)", value: 306050, format: "multiplicative" }
    ]
  },

  "ranger-nombres-entiers": {
    title:      "Ranger des nombres entiers",
    domaine:    "Mathématiques",
    competence: "Nombres entiers",
    type:       "ranger-nombres-entiers-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "4 nombres à 4 chiffres",
      "CM2": "Nombres plus grands, écarts plus fins",
      "6e":  "Niveau expert"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — 4 nombres à 4 chiffres ────────────────────────────────── */
    lvl1: [
      { order: "croissant",   numbers: [4750, 4075, 4507, 4705], answer: [4075, 4507, 4705, 4750] },
      { order: "décroissant", numbers: [3210, 3021, 3201, 3120], answer: [3210, 3201, 3120, 3021] },
      { order: "croissant",   numbers: [8009, 8900, 8090, 8000], answer: [8000, 8009, 8090, 8900] },
      { order: "décroissant", numbers: [5600, 5060, 5006, 5500], answer: [5600, 5500, 5060, 5006] },
      { order: "croissant",   numbers: [1010, 1100, 1001, 1110], answer: [1001, 1010, 1100, 1110] },
      { order: "décroissant", numbers: [7070, 7700, 7007, 7770], answer: [7770, 7700, 7070, 7007] },
      { order: "croissant",   numbers: [2400, 2040, 2004, 2440], answer: [2004, 2040, 2400, 2440] },
      { order: "décroissant", numbers: [9010, 9100, 9001, 9110], answer: [9110, 9100, 9010, 9001] },
      { order: "croissant",   numbers: [6350, 6035, 6503, 6305], answer: [6035, 6305, 6350, 6503] },
      { order: "décroissant", numbers: [4820, 4082, 4802, 4280], answer: [4820, 4802, 4280, 4082] }
    ],

    /* ── Niveau 2 — 4 nombres à 5–6 chiffres ──────────────────────────────── */
    lvl2: [
      { order: "croissant",   numbers: [304500, 34500, 340500, 3450],    answer: [3450, 34500, 304500, 340500] },
      { order: "décroissant", numbers: [99999, 100000, 99099, 100100],   answer: [100100, 100000, 99999, 99099] },
      { order: "croissant",   numbers: [820007, 82007, 802007, 8207],    answer: [8207, 82007, 802007, 820007] },
      { order: "décroissant", numbers: [267100, 267010, 267001, 267110], answer: [267110, 267100, 267010, 267001] },
      { order: "croissant",   numbers: [500050, 505000, 550000, 500500], answer: [500050, 500500, 505000, 550000] },
      { order: "décroissant", numbers: [408000, 480000, 400800, 408800], answer: [480000, 408800, 408000, 400800] },
      { order: "croissant",   numbers: [999001, 990001, 999100, 909001], answer: [909001, 990001, 999001, 999100] },
      { order: "décroissant", numbers: [100001, 10001, 100010, 1001],    answer: [100010, 100001, 10001, 1001] },
      { order: "croissant",   numbers: [670300, 67300, 607300, 673000],  answer: [67300, 607300, 670300, 673000] },
      { order: "décroissant", numbers: [305600, 350600, 300560, 305060], answer: [350600, 305600, 305060, 300560] }
    ],

    /* ── Niveau 3 — 5 nombres jusqu'au million et au-delà ─────────────────── */
    lvl3: [
      { order: "croissant",   numbers: [3070450, 370045, 3700450, 307045, 3007450],  answer: [307045, 370045, 3007450, 3070450, 3700450] },
      { order: "décroissant", numbers: [9800070, 980007, 9080700, 98007, 9800700],   answer: [9800700, 9800070, 9080700, 980007, 98007] },
      { order: "croissant",   numbers: [4004004, 400400, 4040040, 40040, 4000400],   answer: [40040, 400400, 4000400, 4004004, 4040040] },
      { order: "décroissant", numbers: [2020202, 202020, 2200220, 20202, 2002020],   answer: [2200220, 2020202, 2002020, 202020, 20202] },
      { order: "croissant",   numbers: [7070070, 707007, 7007700, 770700, 7700007],  answer: [707007, 770700, 7007700, 7070070, 7700007] },
      { order: "décroissant", numbers: [1000001, 999999, 1001000, 1000100, 100001],  answer: [1001000, 1000100, 1000001, 999999, 100001] },
      { order: "croissant",   numbers: [5050500, 5500050, 5005050, 505050, 5500500], answer: [505050, 5005050, 5050500, 5500050, 5500500] },
      { order: "décroissant", numbers: [8008080, 8080800, 800808, 8800008, 8000880], answer: [8800008, 8080800, 8008080, 8000880, 800808] },
      { order: "croissant",   numbers: [6030600, 603060, 6300600, 630060, 6003060],  answer: [603060, 630060, 6003060, 6030600, 6300600] },
      { order: "décroissant", numbers: [7070700, 7700070, 7007700, 7770000, 7000770], answer: [7770000, 7700070, 7070700, 7007700, 7000770] }
    ]
  },

  "encadrer-nombre-entier": {
    title:      "Encadrer un nombre entier",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Encadrement",
    type:       "encadrer-nombre-entier-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Dizaine / centaine — nombres à 3-4 chiffres",
      "CM2": "Millier / dizaine de milliers — 5-6 chiffres",
      "6e":  "Centaine de milliers / million — jusqu'à 8 chiffres"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — dizaine / centaine, 3–4 chiffres ─────────────────────── */
    lvl1: [
      { display: "347",   lower: 340,   upper: 350,   rang: "dizaine" },
      { display: "892",   lower: 800,   upper: 900,   rang: "centaine" },
      { display: "1 456", lower: 1400,  upper: 1500,  rang: "centaine" },
      { display: "2 073", lower: 2070,  upper: 2080,  rang: "dizaine" },
      { display: "5 801", lower: 5800,  upper: 5900,  rang: "centaine" },
      { display: "738",   lower: 730,   upper: 740,   rang: "dizaine" },
      { display: "3 990", lower: 3900,  upper: 4000,  rang: "centaine" },
      { display: "6 005", lower: 6000,  upper: 6010,  rang: "dizaine" },
      { display: "9 999", lower: 9900,  upper: 10000, rang: "centaine" },
      { display: "4 153", lower: 4150,  upper: 4160,  rang: "dizaine" }
    ],

    /* ── Niveau 2 — millier / dizaine de milliers, 5–6 chiffres ──────────── */
    lvl2: [
      { display: "34 672",  lower: 34000,  upper: 35000,   rang: "millier" },
      { display: "99 301",  lower: 90000,  upper: 100000,  rang: "dizaine de milliers" },
      { display: "150 480", lower: 150000, upper: 151000,  rang: "millier" },
      { display: "307 055", lower: 300000, upper: 310000,  rang: "dizaine de milliers" },
      { display: "480 900", lower: 480000, upper: 481000,  rang: "millier" },
      { display: "999 500", lower: 990000, upper: 1000000, rang: "dizaine de milliers" },
      { display: "200 070", lower: 200000, upper: 201000,  rang: "millier" },
      { display: "63 008",  lower: 60000,  upper: 70000,   rang: "dizaine de milliers" },
      { display: "749 999", lower: 749000, upper: 750000,  rang: "millier" },
      { display: "500 001", lower: 500000, upper: 510000,  rang: "dizaine de milliers" }
    ],

    /* ── Niveau 3 — centaine de milliers / million, jusqu'à 8 chiffres ───── */
    lvl3: [
      { display: "3 472 815",  lower: 3400000,  upper: 3500000,  rang: "centaine de milliers" },
      { display: "806 499",    lower: 800000,   upper: 900000,   rang: "centaine de milliers" },
      { display: "5 000 001",  lower: 5000000,  upper: 6000000,  rang: "million" },
      { display: "9 950 000",  lower: 9900000,  upper: 10000000, rang: "centaine de milliers" },
      { display: "1 070 300",  lower: 1000000,  upper: 1100000,  rang: "centaine de milliers" },
      { display: "7 499 999",  lower: 7000000,  upper: 8000000,  rang: "million" },
      { display: "2 850 000",  lower: 2800000,  upper: 2900000,  rang: "centaine de milliers" },
      { display: "10 000 001", lower: 10000000, upper: 11000000, rang: "million" },
      { display: "6 305 200",  lower: 6300000,  upper: 6400000,  rang: "centaine de milliers" },
      { display: "999 999",    lower: 900000,   upper: 1000000,  rang: "centaine de milliers" }
    ]
  },

  "droite-graduee-nombres-entiers": {
    title:      "Lire un nombre sur une droite graduée",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Droite graduée",
    type:       "droite-graduee-nombres-entiers-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Nombres à 3-4 chiffres — 2/4/5/6/10 intervalles",
      "CM2": "Nombres à 5-6 chiffres — 4/5/6/10 intervalles",
      "6e":  "Jusqu'au million et au-delà — 2/4/5/10 intervalles"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — nombres à 3–4 chiffres, 2/4/5/6/10 intervalles ── */
    lvl1: [
      { min:630,  max:670,  intervalles:4,  pas:10,  arrow:650,  answer:650  },
      { min:60,   max:160,  intervalles:10, pas:10,  arrow:130,  answer:130  },
      { min:900,  max:1100, intervalles:2,  pas:100, arrow:1000, answer:1000 },
      { min:0,    max:500,  intervalles:5,  pas:100, arrow:300,  answer:300  },
      { min:200,  max:600,  intervalles:4,  pas:100, arrow:500,  answer:500  },
      { min:1000, max:2000, intervalles:5,  pas:200, arrow:1400, answer:1400 },
      { min:3000, max:3500, intervalles:5,  pas:100, arrow:3200, answer:3200 },
      { min:0,    max:1000, intervalles:4,  pas:250, arrow:750,  answer:750  },
      { min:4000, max:5000, intervalles:10, pas:100, arrow:4700, answer:4700 },
      { min:6000, max:6600, intervalles:6,  pas:100, arrow:6400, answer:6400 }
    ],

    /* ── Niveau 2 — nombres à 5–6 chiffres, 4/5/6/10 intervalles ── */
    lvl2: [
      { min:0,      max:50000,   intervalles:5,  pas:10000,  arrow:30000,  answer:30000  },
      { min:20000,  max:70000,   intervalles:5,  pas:10000,  arrow:50000,  answer:50000  },
      { min:100000, max:200000,  intervalles:4,  pas:25000,  arrow:175000, answer:175000 },
      { min:0,      max:100000,  intervalles:10, pas:10000,  arrow:60000,  answer:60000  },
      { min:300000, max:400000,  intervalles:5,  pas:20000,  arrow:360000, answer:360000 },
      { min:500000, max:600000,  intervalles:4,  pas:25000,  arrow:525000, answer:525000 },
      { min:0,      max:500000,  intervalles:5,  pas:100000, arrow:400000, answer:400000 },
      { min:750000, max:1000000, intervalles:5,  pas:50000,  arrow:850000, answer:850000 },
      { min:200000, max:500000,  intervalles:6,  pas:50000,  arrow:350000, answer:350000 },
      { min:900000, max:1000000, intervalles:10, pas:10000,  arrow:960000, answer:960000 }
    ],

    /* ── Niveau 3 — jusqu'au million et au-delà, 2/4/5/10 intervalles ── */
    lvl3: [
      { min:0,       max:1000000,  intervalles:4,  pas:250000,  arrow:750000,  answer:750000  },
      { min:2000000, max:3000000,  intervalles:5,  pas:200000,  arrow:2600000, answer:2600000 },
      { min:0,       max:10000000, intervalles:5,  pas:2000000, arrow:6000000, answer:6000000 },
      { min:5000000, max:6000000,  intervalles:4,  pas:250000,  arrow:5750000, answer:5750000 },
      { min:9000000, max:10000000, intervalles:5,  pas:200000,  arrow:9400000, answer:9400000 },
      { min:1000000, max:2000000,  intervalles:10, pas:100000,  arrow:1700000, answer:1700000 },
      { min:3000000, max:4000000,  intervalles:4,  pas:250000,  arrow:3500000, answer:3500000 },
      { min:0,       max:5000000,  intervalles:5,  pas:1000000, arrow:3000000, answer:3000000 },
      { min:8000000, max:9000000,  intervalles:4,  pas:250000,  arrow:8250000, answer:8250000 },
      { min:6000000, max:7000000,  intervalles:2,  pas:500000,  arrow:6500000, answer:6500000 }
    ]
  },

  "arrondir-nombre-entier": {
    title:      "Arrondir un nombre entier",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Arrondi",
    type:       "arrondir-nombre-entier-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "à la dizaine près (chiffre décisif : unités)",
      "CM2": "à la centaine près (chiffre décisif : dizaines)",
      "6e":  "au millier près (chiffre décisif : centaines)"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — dizaine près, 3–4 chiffres ────────────────────────────
       decisive = chiffre des unités
    ──────────────────────────────────────────────────────────────────────── */
    lvl1: [
      { display: "347",   answer: 350,   decisive: 7 },
      { display: "342",   answer: 340,   decisive: 2 },
      { display: "865",   answer: 870,   decisive: 5 },
      { display: "891",   answer: 890,   decisive: 1 },
      { display: "998",   answer: 1000,  decisive: 8 },
      { display: "1 203", answer: 1200,  decisive: 3 },
      { display: "1 756", answer: 1760,  decisive: 6 },
      { display: "4 095", answer: 4100,  decisive: 5 },
      { display: "6 001", answer: 6000,  decisive: 1 },
      { display: "7 999", answer: 8000,  decisive: 9 }
    ],

    /* ── Niveau 2 — centaine près, 4–5 chiffres ───────────────────────────
       decisive = chiffre des dizaines
    ──────────────────────────────────────────────────────────────────────── */
    lvl2: [
      { display: "3 472",  answer: 3500,   decisive: 7 },
      { display: "3 421",  answer: 3400,   decisive: 2 },
      { display: "6 850",  answer: 6900,   decisive: 5 },
      { display: "9 949",  answer: 9900,   decisive: 4 },
      { display: "9 972",  answer: 10000,  decisive: 7 },
      { display: "12 034", answer: 12000,  decisive: 3 },
      { display: "45 678", answer: 45700,  decisive: 7 },
      { display: "30 050", answer: 30100,  decisive: 5 },
      { display: "80 009", answer: 80000,  decisive: 0 },
      { display: "99 950", answer: 100000, decisive: 5 }
    ],

    /* ── Niveau 3 — millier près, 5–6 chiffres ────────────────────────────
       decisive = chiffre des centaines
    ──────────────────────────────────────────────────────────────────────── */
    lvl3: [
      { display: "34 672",  answer: 35000,   decisive: 6 },
      { display: "34 321",  answer: 34000,   decisive: 3 },
      { display: "99 500",  answer: 100000,  decisive: 5 },
      { display: "150 499", answer: 150000,  decisive: 4 },
      { display: "207 600", answer: 208000,  decisive: 6 },
      { display: "480 050", answer: 480000,  decisive: 0 },
      { display: "749 500", answer: 750000,  decisive: 5 },
      { display: "999 499", answer: 999000,  decisive: 4 },
      { display: "999 500", answer: 1000000, decisive: 5 },
      { display: "305 082", answer: 305000,  decisive: 0 }
    ]
  },

  "arrondi-adapte-probleme": {
    title:      "Choisir l'arrondi adapté à la situation",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Arrondis en contexte",
    type:       "arrondi-adapte-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "2 choix — excès ou défaut, 2 valeurs proches",
      "CM2": "3 choix — choisir le rang d'arrondi adapté au contexte",
      "6e":  "2 à 3 choix — raisonnement sur excès / défaut et rang"
    },
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — 2 choix, excès ou défaut au rang le plus proche ── */
    lvl1: [
      {
        enonce: "Une salle de cinéma contient 347 places. Le directeur veut commander des programmes. Il vaut mieux en commander environ…",
        choices: ["300", "350"],
        answer:  "350",
        explication: "On arrondit par excès : mieux avoir trop de programmes que pas assez. Si on choisissait 300, il manquerait des programmes pour 47 spectateurs. À la dizaine près, 347 → 350."
      },
      {
        enonce: "Un trajet en voiture dure 473 km. Pour estimer l'essence nécessaire, le conducteur arrondit à la dizaine près. Il compte environ…",
        choices: ["470 km", "480 km"],
        answer:  "480 km",
        explication: "On arrondit par excès pour ne pas tomber en panne d'essence. Sous-estimer la distance serait dangereux. À la dizaine près, 473 → 480."
      },
      {
        enonce: "Une bibliothécaire a reçu 126 nouveaux livres ce mois-ci. Pour l'affichage à l'entrée, elle arrondit ce nombre à la dizaine : elle annonce environ…",
        choices: ["120 livres", "130 livres"],
        answer:  "130 livres",
        explication: "Bravo ! Le chiffre des unités de 126 est 6, donc on arrondit à la dizaine supérieure : 126 → 130."
      },
      {
        enonce: "Un agriculteur récolte 1 847 kg de pommes. Pour son compte-rendu annuel, il note environ…",
        choices: ["1 800 kg", "1 900 kg"],
        answer:  "1 800 kg",
        explication: "Pour un compte-rendu annuel, on prend l'arrondi le plus proche. À la centaine près, 1 847 → 1 800 (le chiffre des dizaines est 4, donc on arrondit vers le bas)."
      },
      {
        enonce: "Un organisateur prépare des goûters pour 93 enfants. Pour être sûr d'en avoir assez, il en prépare environ…",
        choices: ["90 goûters", "100 goûters"],
        answer:  "100 goûters",
        explication: "On arrondit par excès : mieux avoir quelques restes que des enfants sans goûter. À la dizaine près, 93 → 100."
      },
      {
        enonce: "Une piscine peut accueillir 312 baigneurs. L'affichage à l'entrée indique la capacité environ…",
        choices: ["300 baigneurs", "310 baigneurs"],
        answer:  "300 baigneurs",
        explication: "Pour un affichage approximatif de capacité, on arrondit à la centaine. À la centaine près, 312 → 300. La dizaine (310) serait trop précise pour un simple panneau."
      },
      {
        enonce: "Un magasin a vendu 1 253 articles ce mois-ci. Pour le bilan mensuel, le gérant note environ…",
        choices: ["1 200 articles", "1 300 articles"],
        answer:  "1 300 articles",
        explication: "Pour un bilan, on prend l'arrondi le plus proche. À la centaine près, 1 253 → 1 300 (le chiffre des dizaines est 5, on arrondit vers le haut)."
      },
      {
        enonce: "Un randonneur a marché 38 km. Il dit à ses amis qu'il a marché environ…",
        choices: ["30 km", "40 km"],
        answer:  "40 km",
        explication: "À la dizaine près, 38 → 40 (le chiffre des unités est 8, ≥ 5, on arrondit vers le haut). Dire 30 km minimiserait l'effort fourni."
      },
      {
        enonce: "Une cagnotte contient 674 €. Pour savoir si on peut acheter un article à 700 €, on estime qu'on dispose d'environ…",
        choices: ["700 €", "600 €"],
        answer:  "700 €",
        explication: "On arrondit par excès pour vérifier si l'objectif est atteignable. 674 → 700 montre qu'on est très proche. Arrondir à 600 € sous-estimerait la cagnotte."
      },
      {
        enonce: "Un fleuriste a vendu 45 bouquets aujourd'hui. Pour son compte-rendu du soir, il arrondit ce nombre à la dizaine : il note environ…",
        choices: ["40 bouquets", "50 bouquets"],
        answer:  "50 bouquets",
        explication: "Bravo ! Quand le chiffre des unités est 5 ou plus, on arrondit à la dizaine supérieure : 45 → 50."
      }
    ],

    /* ── Niveau 2 — 3 choix, choisir le rang d'arrondi imposé par un indice concret ── */
    lvl2: [
      {
        enonce: "Léna retire de l'argent à un distributeur qui ne donne que des billets de 10 €. Elle veut environ 236 €. Elle demande un retrait de…",
        choices: ["236 €", "240 €", "200 €"],
        answer:  "240 €",
        explication: "Le distributeur ne donne que des billets de 10 €, donc on arrondit à la dizaine : 236 € devient 240 €."
      },
      {
        enonce: "Une balance de cuisine n'affiche que des multiples de 10 g. Une recette nécessite 764 g de farine. La balance affichera environ…",
        choices: ["764 g", "760 g", "800 g"],
        answer:  "760 g",
        explication: "La balance n'affiche que des multiples de 10 g, donc on arrondit à la dizaine : 764 g devient 760 g."
      },
      {
        enonce: "Un producteur vend ses pommes par caisses de 10 fruits. Il a récolté 368 pommes. Le nombre de caisses pleines correspond à environ…",
        choices: ["368 pommes", "370 pommes", "400 pommes"],
        answer:  "370 pommes",
        explication: "Les caisses contiennent 10 fruits chacune, donc on arrondit à la dizaine : 368 pommes correspond à environ 370 pommes."
      },
      {
        enonce: "Un bureau de poste vend les timbres uniquement par carnets de 100. Une entreprise veut 1 247 timbres. Elle doit en commander environ…",
        choices: ["1 250 timbres", "1 200 timbres", "1 000 timbres"],
        answer:  "1 200 timbres",
        explication: "Les timbres se vendent par carnets de 100, donc on arrondit à la centaine : 1 247 timbres devient environ 1 200 timbres."
      },
      {
        enonce: "Une bibliothèque range ses livres sur des étagères de 100 livres chacune. Il y a 3 482 livres à ranger. Le nombre d'étagères nécessaires est d'environ…",
        choices: ["3 480 livres", "3 500 livres", "3 000 livres"],
        answer:  "3 500 livres",
        explication: "Chaque étagère contient 100 livres, donc on arrondit à la centaine : 3 482 livres devient environ 3 500 livres."
      },
      {
        enonce: "Une kermesse vend ses bonbons par sachets de 100. Il reste 2 763 bonbons. Le nombre de sachets restants est d'environ…",
        choices: ["2 760 bonbons", "2 800 bonbons", "3 000 bonbons"],
        answer:  "2 800 bonbons",
        explication: "Les bonbons se vendent par sachets de 100, donc on arrondit à la centaine : 2 763 bonbons devient environ 2 800 bonbons."
      },
      {
        enonce: "Une carte de randonnée place une borne tous les 1 000 mètres. Un randonneur a parcouru 47 328 m. Il se trouve environ à la borne…",
        choices: ["47 330 m", "47 300 m", "47 000 m"],
        answer:  "47 000 m",
        explication: "Les bornes sont placées tous les 1 000 mètres, donc on arrondit au millier : 47 328 m devient environ 47 000 m."
      },
      {
        enonce: "Un stade est divisé en tribunes de 1 000 places chacune. Il y a 82 643 spectateurs. Le nombre de tribunes occupées est d'environ…",
        choices: ["82 640 spectateurs", "82 600 spectateurs", "83 000 spectateurs"],
        answer:  "83 000 spectateurs",
        explication: "Chaque tribune contient 1 000 places, donc on arrondit au millier : 82 643 spectateurs devient environ 83 000 spectateurs."
      },
      {
        enonce: "Une association envoie des vêtements collectés par cartons de 1 000 pièces. Elle a reçu 6 480 vêtements. Le nombre de cartons nécessaires est d'environ…",
        choices: ["6 480 vêtements", "6 500 vêtements", "6 000 vêtements"],
        answer:  "6 000 vêtements",
        explication: "Les cartons contiennent 1 000 pièces chacun, donc on arrondit au millier : 6 480 vêtements devient environ 6 000 vêtements."
      },
      {
        enonce: "Une classe de 529 élèves (plusieurs écoles réunies) se répartit par groupes de 10 pour une photo. Le nombre de groupes complets est d'environ…",
        choices: ["529 élèves", "530 élèves", "500 élèves"],
        answer:  "530 élèves",
        explication: "La photo se fait par groupes de 10, donc on arrondit à la dizaine : 529 élèves devient environ 530 élèves."
      }
    ],

    /* ── Niveau 3 — 2–3 choix, raisonnement sur excès / défaut + rang ── */
    lvl3: [
      {
        enonce: "Un pyrotechnicien prépare un feu d'artifice pour 4 830 spectateurs. Il commande des équipements de sécurité. Il vaut mieux prévoir pour…",
        choices: ["4 800 spectateurs", "4 830 spectateurs", "5 000 spectateurs"],
        answer:  "5 000 spectateurs",
        explication: "En matière de sécurité, on arrondit toujours par excès au rang le plus fort. 5 000 couvre tous les spectateurs avec marge. Commander pour 4 800 laisserait 30 personnes sans couverture."
      },
      {
        enonce: "Un club de sport a 1 247 casques de protection en stock pour ses adhérents. Pour ne jamais promettre plus de casques qu'il n'en a réellement, l'entraîneur annonce en disposer d'environ…",
        choices: ["1 300 casques", "1 200 casques"],
        answer:  "1 200 casques",
        explication: "Arrondi par défaut : en matière de sécurité et de matériel, on annonce toujours moins que ce qu'on a réellement, jamais plus. 1 247 casques → environ 1 200."
      },
      {
        enonce: "Un entrepreneur doit couvrir 873 m² avec des dalles vendues par lot de 100 m². Il commande…",
        choices: ["8 lots — 800 m²", "9 lots — 900 m²"],
        answer:  "9 lots — 900 m²",
        explication: "On ne peut pas laisser de sol non couvert : l'arrondi par excès est obligatoire. 873 → 900 m², soit 9 lots. 8 lots ne couvrirait que 800 m², laissant 73 m² de sol nu."
      },
      {
        enonce: "Un organisateur dispose d'un budget de 9 730 € pour un évènement. Pour ne jamais risquer de dépasser son budget réel en négociant avec les fournisseurs, il annonce disposer d'environ…",
        choices: ["9 800 €", "9 700 €"],
        answer:  "9 700 €",
        explication: "Arrondi par défaut : on annonce toujours moins que ce qu'on a réellement pour ne pas se retrouver à découvert. 9 730 € → environ 9 700 €."
      },
      {
        enonce: "Un camion peut transporter 3 000 kg. Un livreur charge 2 847 kg de marchandises. Son collègue lui demande quelle est la charge. Il répond qu'il transporte environ…",
        choices: ["2 800 kg", "3 000 kg"],
        answer:  "2 800 kg",
        explication: "Pour la sécurité, on arrondit la charge par défaut : déclarer 3 000 kg pour 2 847 kg porterait la charge déclarée au maximum autorisé, ce qui est inexact et risqué."
      },
      {
        enonce: "Un refuge d'urgence doit distribuer une couverture à chacun des 38 412 réfugiés accueillis. Pour être certain de ne manquer à personne, le responsable en commande environ…",
        choices: ["38 400 couvertures", "38 000 couvertures", "39 000 couvertures"],
        answer:  "39 000 couvertures",
        explication: "Arrondi par excès au millier : en situation d'urgence, on prévoit toujours plus, jamais moins. 38 412 → environ 39 000 couvertures."
      },
      {
        enonce: "Un projecteur éclaire une scène de 247 m². Le technicien commande des ampoules pour couvrir environ…",
        choices: ["200 m²", "250 m²", "300 m²"],
        answer:  "300 m²",
        explication: "Pour l'éclairage, mieux vaut prévoir plus que moins. L'arrondi par excès à la centaine (300 m²) garantit une scène bien éclairée. 200 m² serait insuffisant ; 250 m² légèrement court."
      },
      {
        enonce: "Un aéroport prépare des cartes d'embarquement pour un vol de 312 passagers. Pour ne jamais tomber à court, le personnel en imprime environ…",
        choices: ["310 cartes", "300 cartes", "320 cartes"],
        answer:  "320 cartes",
        explication: "Arrondi par excès à la dizaine : mieux vaut en avoir trop que pas assez. 312 → environ 320 cartes."
      },
      {
        enonce: "Un producteur récolte 4 173 kg de tomates. Il les vend en caisses complètes de 500 kg. Combien de caisses complètes peut-il remplir ?",
        choices: ["8 caisses — 4 000 kg", "9 caisses — 4 500 kg"],
        answer:  "8 caisses — 4 000 kg",
        explication: "On ne peut remplir que des caisses complètes. 4 173 ÷ 500 = 8,346 → 8 caisses complètes. Les 173 kg restants ne suffisent pas à remplir une 9e caisse : ici on arrondit par défaut."
      },
      {
        enonce: "Un pays envoie de l'aide alimentaire pour 2 340 000 personnes. Les rations sont conditionnées par lot de 100 000. Le ministre commande…",
        choices: ["23 lots — 2 300 000 rations", "24 lots — 2 400 000 rations"],
        answer:  "24 lots — 2 400 000 rations",
        explication: "Pour l'aide humanitaire, on arrondit toujours par excès. 2 340 000 ÷ 100 000 = 23,4 → il faut 24 lots pour que toutes les 2 340 000 personnes reçoivent une ration."
      }
    ]
  }

});

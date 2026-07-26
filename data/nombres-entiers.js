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
    levels: ["CM1", "CM2"],
    paliers: 2, /* nombre réel de paliers du moteur */
    questionsPerSession: 12,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    bank: [

      /* ── Niveau 1 — 15 questions, jusqu'à 999 999 ──────────────────────────── */
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

      /* ── Niveau 2 — 15 questions, jusqu'à 999 999 999 ──────────────────────── */
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
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Écriture en lettres",
    type: "nombre-entier",
    levels: ["CM1", "CM2"],
    paliers: 2, /* nombre réel de paliers du moteur */
    questionsPerSession: 12,
    backLink: { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },
    bank: [

      /* ── Niveau 1 — 15 questions, jusqu'à 999 999 ──────────────────────────── */
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

      /* ── Niveau 2 — 15 questions, millions et milliards ─────────────────────── */
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
  },

  "identifier-valeur-chiffre-position": {
    title: "Identifier la valeur d'un chiffre selon sa position",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Valeur positionnelle",
    type:  "valeur-position",
    levels: ["CM1", "CM2", "6e"],
    paliers: 1, /* nombre réel de paliers du moteur */
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

  "decomposer-nombre-entier": {
    title:      "Décomposer un nombre entier",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Décomposition",
    type:       "decomposer-nombre-entier-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — 4 champs numériques (milliers / centaines / dizaines / unités) ── */
    lvl1: [
      { display: "4 537", mil: 4, cen: 5, diz: 3, uni: 7 },
      { display: "2 080", mil: 2, cen: 0, diz: 8, uni: 0 },
      { display: "7 001", mil: 7, cen: 0, diz: 0, uni: 1 },
      { display: "3 456", mil: 3, cen: 4, diz: 5, uni: 6 },
      { display: "9 090", mil: 9, cen: 0, diz: 9, uni: 0 }
    ],

    /* ── Niveau 2 — étiquettes positionnelles à placer dans les slots ── */
    lvl2: [
      { display: "27 046",  parts: [20000, 7000, 40, 6] },
      { display: "150 302", parts: [100000, 50000, 300, 2] },
      { display: "83 500",  parts: [80000, 3000, 500] },
      { display: "400 070", parts: [400000, 70] },
      { display: "609 403", parts: [600000, 9000, 400, 3] }
    ],

    /* ── Niveau 3 — 3 champs texte : additive / somme de produits / lettres ── */
    lvl3: [
      { display: "306 050",
        add: "300000+6000+50",
        vp: ["3×100000","6×1000","5×10"],
        lettres: "trois",  chiffre: "3" },
      { display: "2 040 107",
        add: "2000000+40000+100+7",
        vp: ["2×1000000","4×10000","1×100","7×1"],
        lettres: "vingt",  chiffre: "20" },
      { display: "750 030",
        add: "700000+50000+30",
        vp: ["7×100000","5×10000","3×10"],
        lettres: "sept",   chiffre: "7" },
      { display: "1 800 605",
        add: "1000000+800000+600+5",
        vp: ["1×1000000","8×100000","6×100","5×1"],
        lettres: "huit",   chiffre: "8" },
      { display: "450 002",
        add: "400000+50000+2",
        vp: ["4×100000","5×10000","2×1"],
        lettres: "quatre", chiffre: "4" }
    ]
  },

  "comparer-nombres-entiers": {
    title:      "Comparer deux nombres entiers",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Comparaison",
    type:       "comparer-nombres-entiers-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
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
    backLink:   { href: "mathématiques-nombres-entiers.html", label: "Nombres entiers" },

    /* ── Niveau 1 — décomposition canonique → trouver le nombre ── */
    lvl1: [
      { display: "3 × 1 000 + 2 × 100 + 4 × 10 + 5 × 1", answer: 3245,  mil: 3, cen: 2, diz: 4, uni: 5 },
      { display: "6 × 1 000 + 0 × 100 + 7 × 10 + 0 × 1", answer: 6070,  mil: 6, cen: 0, diz: 7, uni: 0 },
      { display: "5 × 1 000 + 5 × 100 + 0 × 10 + 1 × 1", answer: 5501,  mil: 5, cen: 5, diz: 0, uni: 1 },
      { display: "9 × 1 000 + 0 × 100 + 0 × 10 + 8 × 1", answer: 9008,  mil: 9, cen: 0, diz: 0, uni: 8 },
      { display: "1 × 1 000 + 3 × 100 + 3 × 10 + 3 × 1", answer: 1333,  mil: 1, cen: 3, diz: 3, uni: 3 }
    ],

    /* ── Niveau 2 — parties non canoniques, ordre mélangé → trouver le nombre ── */
    lvl2: [
      { display: "40 000 + 3 000 + 200 + 8",        answer: 43208,   parts: [40000, 3000, 200, 8] },
      { display: "500 000 + 60 + 7 000",             answer: 507060,  parts: [500000, 60, 7000] },
      { display: "200 000 + 90 000 + 400 + 5",       answer: 290405,  parts: [200000, 90000, 400, 5] },
      { display: "30 + 800 000 + 4 000",             answer: 804030,  parts: [30, 800000, 4000] },
      { display: "6 000 000 + 50 000 + 3",           answer: 6050003, parts: [6000000, 50000, 3] }
    ],

    /* ── Niveau 3 — somme de produits avec grandes puissances → trouver le nombre ── */
    lvl3: [
      { display: "4 × 100 000 + 2 × 10 000 + 0 × 1 000 + 7 × 100 + 3 × 10 + 9 × 1", answer: 420739,  factors: [[4,100000],[2,10000],[0,1000],[7,100],[3,10],[9,1]] },
      { display: "3 × 1 000 000 + 5 × 10 000 + 8 × 1",                                answer: 3050008, factors: [[3,1000000],[5,10000],[8,1]] },
      { display: "7 × 100 000 + 7 × 1 000 + 7 × 10",                                  answer: 707070,  factors: [[7,100000],[7,1000],[7,10]] },
      { display: "2 × 1 000 000 + 4 × 100 000 + 0 × 10 000 + 6 × 100 + 1 × 1",       answer: 2400601, factors: [[2,1000000],[4,100000],[0,10000],[6,100],[1,1]] },
      { display: "9 × 100 000 + 9 × 100 + 9 × 1",                                     answer: 900909,  factors: [[9,100000],[9,100],[9,1]] }
    ]
  },

  "ranger-nombres-entiers": {
    title:      "Ranger des nombres entiers",
    domaine:    "Mathématiques",
    competence: "Nombres entiers",
    type:       "ranger-nombres-entiers-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
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
      { order: "décroissant", numbers: [9010, 9100, 9001, 9110], answer: [9110, 9100, 9010, 9001] }
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
      { order: "décroissant", numbers: [100001, 10001, 100010, 1001],    answer: [100010, 100001, 10001, 1001] }
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
      { order: "décroissant", numbers: [8008080, 8080800, 800808, 8800008, 8000880], answer: [8800008, 8080800, 8008080, 8000880, 800808] }
    ]
  },

  "encadrer-nombre-entier": {
    title:      "Encadrer un nombre entier",
    domaine:    "Mathématiques",
    competence: "Nombres entiers — Encadrement",
    type:       "encadrer-nombre-entier-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
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
        enonce: "Une école commande des stylos pour 124 élèves. Elle en a commandé 126. La secrétaire note approximativement…",
        choices: ["100 stylos", "130 stylos"],
        answer:  "130 stylos",
        explication: "On arrondit par excès pour ne pas manquer de stylos. À la dizaine près, 126 → 130. Choisir 100 laisserait 26 élèves sans stylo."
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
        enonce: "Un bus peut transporter 48 passagers. Il y a 45 élèves à transporter. On arrondit le nombre d'élèves à…",
        choices: ["40 élèves", "50 élèves"],
        answer:  "50 élèves",
        explication: "On arrondit par excès pour s'assurer qu'un seul bus suffit. 45 → 50 confirme qu'un bus de 48 places est suffisant pour tout le monde."
      }
    ],

    /* ── Niveau 2 — 3 choix, choisir le rang d'arrondi adapté au contexte ── */
    lvl2: [
      {
        enonce: "La population d'une ville est de 34 672 habitants. Le maire donne une estimation dans son discours. Quel arrondi est le plus adapté ?",
        choices: ["34 670", "34 700", "35 000"],
        answer:  "35 000",
        explication: "Dans un discours public, on parle de grandes tendances : l'arrondi au millier (35 000) est le plus adapté. 34 670 est trop précis pour un discours ; 34 700 l'est encore trop."
      },
      {
        enonce: "Un stade contient 48 315 places. Le speaker annonce l'affluence du match. Il dit environ…",
        choices: ["48 300", "48 000", "50 000"],
        answer:  "48 000",
        explication: "Pour l'affluence d'un match, l'arrondi au millier (48 000) est adapté : ni trop précis ni trop vague. 48 300 serait trop détaillé ; 50 000 exagèrerait de près de 1 700 personnes."
      },
      {
        enonce: "Un magasin a réalisé un chiffre d'affaires de 127 483 €. Le comptable arrondit pour une estimation rapide…",
        choices: ["127 500 €", "127 000 €", "130 000 €"],
        answer:  "127 000 €",
        explication: "En comptabilité, l'arrondi au millier le plus proche (127 000 €) est adéquat. 127 500 € est trop précis ; 130 000 € introduit une erreur de plus de 2 500 €."
      },
      {
        enonce: "La distance Paris–Madrid est de 1 272 km. Sur un panneau indicateur, on afficherait environ…",
        choices: ["1 270 km", "1 300 km", "1 000 km"],
        answer:  "1 300 km",
        explication: "Sur un panneau routier, on indique à la centaine près (1 300 km). 1 270 km serait trop précis pour un panneau ; 1 000 km serait beaucoup trop approximatif."
      },
      {
        enonce: "Un collège compte 763 élèves. Le principal répond à une journaliste. Il dit environ…",
        choices: ["760 élèves", "800 élèves", "700 élèves"],
        answer:  "800 élèves",
        explication: "Pour une estimation orale, la centaine est plus naturelle. 763 → 800 est l'arrondi le plus proche. 760 paraît trop précis ; 700 s'éloigne trop de la réalité."
      },
      {
        enonce: "Un pays a une superficie de 504 782 km². Dans un manuel scolaire, on indique environ…",
        choices: ["504 800 km²", "505 000 km²", "500 000 km²"],
        answer:  "500 000 km²",
        explication: "Dans un manuel, on donne un ordre de grandeur : à la centaine de milliers (500 000 km²). 504 800 et 505 000 sont trop précis pour une notion générale de géographie."
      },
      {
        enonce: "Un artisan a besoin d'environ 1 847 vis et veut commander avec une marge de sécurité. Il vaut mieux en commander…",
        choices: ["1 800 vis", "1 850 vis", "2 000 vis"],
        answer:  "2 000 vis",
        explication: "On arrondit par excès au millier pour avoir une marge confortable. 2 000 vis assure qu'il n'en manquera pas. 1 800 et 1 850 seraient trop proches du besoin réel."
      },
      {
        enonce: "Un événement a attiré 23 418 visiteurs. Le journal titre « Environ … visiteurs ».",
        choices: ["23 400 visiteurs", "23 000 visiteurs", "20 000 visiteurs"],
        answer:  "23 000 visiteurs",
        explication: "Dans un article de presse, l'arrondi au millier (23 000) offre un bon équilibre entre précision et lisibilité. 23 400 semble trop précis ; 20 000 est trop vague."
      },
      {
        enonce: "Une famille a roulé 1 253 km pendant les vacances. Pour le carnet de bord, elle note environ…",
        choices: ["1 250 km", "1 300 km", "1 000 km"],
        answer:  "1 300 km",
        explication: "Pour un carnet de bord, la centaine (1 300 km) est suffisamment précise. 1 250 km paraît trop détaillé ; 1 000 km serait bien trop imprécis."
      },
      {
        enonce: "Un pays a une dette de 2 847 632 €. Le ministre l'arrondit dans son allocution…",
        choices: ["2 847 600 €", "2 848 000 €", "2 800 000 €"],
        answer:  "2 800 000 €",
        explication: "À l'oral, énoncer « 2 847 632 € » est impossible. L'arrondi à la centaine de milliers (2 800 000 €) est le seul lisible et compréhensible en discours public."
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
        enonce: "Une pharmacie a 1 247 comprimés en stock. Un médecin demande s'il y en a assez pour 1 300 patients. La pharmacienne estime…",
        choices: ["Oui, j'en ai environ 1 300", "Non, j'en ai environ 1 200"],
        answer:  "Non, j'en ai environ 1 200",
        explication: "1 247 arrondi à la centaine par défaut donne 1 200. Le stock est insuffisant pour 1 300 patients. Dire « environ 1 300 » serait inexact et risquerait de laisser des patients sans traitement."
      },
      {
        enonce: "Un entrepreneur doit couvrir 873 m² avec des dalles vendues par lot de 100 m². Il commande…",
        choices: ["8 lots — 800 m²", "9 lots — 900 m²"],
        answer:  "9 lots — 900 m²",
        explication: "On ne peut pas laisser de sol non couvert : l'arrondi par excès est obligatoire. 873 → 900 m², soit 9 lots. 8 lots ne couvrirait que 800 m², laissant 73 m² de sol nu."
      },
      {
        enonce: "Un organisateur a un budget de 9 730 € pour décorer une salle. Le décorateur lui demande s'il peut dépenser 10 000 €. L'organisateur répond…",
        choices: ["Oui, j'ai environ 10 000 €", "Non, j'ai environ 9 000 €"],
        answer:  "Non, j'ai environ 9 000 €",
        explication: "Le budget réel est 9 730 €. Dire qu'on a 10 000 € ferait dépasser le budget. L'arrondi par défaut (9 000 €) est prudent et honnête — il protège contre un dépassement."
      },
      {
        enonce: "Un camion peut transporter 3 000 kg. Un livreur charge 2 847 kg de marchandises. Son collègue lui demande quelle est la charge. Il répond qu'il transporte environ…",
        choices: ["2 800 kg", "3 000 kg"],
        answer:  "2 800 kg",
        explication: "Pour la sécurité, on arrondit la charge par défaut : déclarer 3 000 kg pour 2 847 kg porterait la charge déclarée au maximum autorisé, ce qui est inexact et risqué."
      },
      {
        enonce: "Une ville doit évacuer 38 412 habitants en urgence. Des cars de 50 personnes sont commandés. Le préfet commande…",
        choices: ["760 cars — 38 000 ÷ 50", "770 cars — 38 500 ÷ 50", "800 cars — 40 000 ÷ 50"],
        answer:  "800 cars — 40 000 ÷ 50",
        explication: "En urgence, on ne peut pas laisser quelqu'un sans moyen d'évacuation. On arrondit par excès à 40 000 ÷ 50 = 800 cars. 760 cars laisserait 412 personnes sans transport."
      },
      {
        enonce: "Un projecteur éclaire une scène de 247 m². Le technicien commande des ampoules pour couvrir environ…",
        choices: ["200 m²", "250 m²", "300 m²"],
        answer:  "300 m²",
        explication: "Pour l'éclairage, mieux vaut prévoir plus que moins. L'arrondi par excès à la centaine (300 m²) garantit une scène bien éclairée. 200 m² serait insuffisant ; 250 m² légèrement court."
      },
      {
        enonce: "Une école prévoit une sortie pour 312 élèves. Les bus ont 50 places. Le directeur commande…",
        choices: ["6 bus — 300 places", "7 bus — 350 places"],
        answer:  "7 bus — 350 places",
        explication: "312 élèves ne rentrent pas dans 6 bus (300 places seulement, il manquerait 12 places). Un 7e bus est indispensable : on arrondit toujours le nombre de bus par excès."
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

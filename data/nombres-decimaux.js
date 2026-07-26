/* ── data/nombres-decimaux.js — Nombres décimaux (8 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "comparer-decimaux": {
    title:      "Comparer deux nombres décimaux",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Comparaison",
    type:       "comparer-decimaux-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { type: 'A', a: '3,7',  b: '5,2',  signe: '<' },
      { type: 'B', a: '4,3',  b: '4,7',  signe: '<' },
      { type: 'C', a: '2,30', b: '2,3',  signe: '=', piege: 'zeros' },
      { type: 'B', a: '0,9',  b: '0,4',  signe: '>' },
      { type: 'A', a: '6,1',  b: '2,8',  signe: '>' },
      { type: 'C', a: '1,10', b: '1,1',  signe: '=', piege: 'zeros' },
      { type: 'D', nombres: ['1,2','3,1','1,9'], ordre: ['1,2','1,9','3,1'] },
      { type: 'B', a: '5,5',  b: '5,8',  signe: '<' }
    ],

    lvl2: [
      { type: 'A', a: '1,9',  b: '1,47', signe: '>', piege: 'longueur' },
      { type: 'B', a: '0,07', b: '0,7',  signe: '<', piege: 'zero_intercale' },
      { type: 'C', a: '0,25', b: '0,3',  signe: '<', piege: 'longueur' },
      { type: 'A', a: '3,04', b: '3,4',  signe: '<', piege: 'zero_intercale' },
      { type: 'D', min: '1,2', max: '1,3' },
      { type: 'E', nombres: ['2,08','2,8','2,80','2,008'], plus_grand: '2,8', equivalents: ['2,8','2,80'] },
      { type: 'A', a: '0,5',  b: '0,50', signe: '=', piege: 'zeros' },
      { type: 'C', a: '0,09', b: '0,9',  signe: '<', piege: 'zero_intercale' }
    ],

    lvl3: [
      { type: 'A', a: '0,245', b: '0,249', signe: '<' },
      { type: 'A', a: '1,300', b: '1,3',   signe: '=', piege: 'zeros' },
      { type: 'B', nombres: ['0,35','0,305','0,350','0,053'], ordre: ['0,053','0,305','0,35','0,350'], equivalents: [['0,35','0,350']] },
      { type: 'C', nombre: '1,347', inf: '1,34', sup: '1,35' },
      { type: 'D', nombre: '0,072', inf: '0,0',  sup: '0,1' },
      { type: 'E', min: '2,450', max: '2,451' },
      { type: 'F', a: '0,9', b: '0,099', signe: '>', justif: { col: 'dixièmes', val_a: '9', val_b: '0' } },
      { type: 'A', a: '0,100', b: '0,010', signe: '>', piege: 'zero_intercale' }
    ]
  },

  "ranger-decimaux": {
    title:      "Ranger des nombres décimaux",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Rangement",
    type:       "ranger-decimaux-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { type:'A', sens:'croissant',   nombres:['3,7','1,2','5,4'],    ordre:['1,2','3,7','5,4'] },
      { type:'B', sens:'croissant',   nombres:['4,3','4,7','4,1'],    ordre:['4,1','4,3','4,7'] },
      { type:'C', sens:'décroissant', nombres:['2,5','2,1','2,8'],    ordre:['2,8','2,5','2,1'] },
      { type:'D', sens:'croissant',   nombres:['3,10','3,1','3,9'],
        equivalents:[['3,10','3,1']], piege:'zeros' },
      { type:'A', sens:'croissant',   nombres:['0,8','0,2','0,5'],    ordre:['0,2','0,5','0,8'] },
      { type:'B', sens:'décroissant', nombres:['7,3','7,9','7,1'],    ordre:['7,9','7,3','7,1'] },
      { type:'C', sens:'croissant',   nombres:['1,5','1,50','1,2'],
        equivalents:[['1,5','1,50']], piege:'zeros' },
      { type:'A', sens:'décroissant', nombres:['6,4','3,8','6,1'],    ordre:['6,4','6,1','3,8'] }
    ],

    lvl2: [
      { type:'A', sens:'croissant',   nombres:['1,9','1,47','1,8','1,23'],  ordre:['1,23','1,47','1,8','1,9'],    piege:'longueur' },
      { type:'B', sens:'croissant',   nombres:['0,7','0,07','0,70','0,17'], equivalents:[['0,7','0,70']], piege:'zero_intercale' },
      { type:'C', sens:'décroissant', nombres:['2,5','2,05','2,50','1,9'],  equivalents:[['2,5','2,50']] },
      { type:'D', nombres:['0,3','0,25','0,8','0,9'],       intrus:'0,25', position_correcte:1 },
      { type:'E', inf:'0,4', sup:'0,9', nb_champs:2 },
      { type:'A', sens:'croissant',   nombres:['3,5','3,15','3,9','3,50'],  equivalents:[['3,5','3,50']], piege:'longueur' },
      { type:'B', sens:'décroissant', nombres:['0,08','0,8','0,80','0,18'], equivalents:[['0,8','0,80']], piege:'zero_intercale' },
      { type:'C', sens:'croissant',   nombres:['4,06','4,6','4,60','4,006'],equivalents:[['4,6','4,60']] }
    ],

    lvl3: [
      { type:'A', sens:'croissant',   nombres:['1,375','1,357','1,3','1,370'],                equivalents:[['1,370','1,37']] },
      { type:'B', sens:'décroissant', nombres:['0,050','0,5','0,500','0,005'],                equivalents:[['0,5','0,500']], piege:'zero_intercale' },
      { type:'C', sens:'croissant',   nombres:['2,008','2,08','2,8','2,080','2,800'],         equivalents:[['2,08','2,080'],['2,8','2,800']] },
      { type:'D', sens:'croissant',   nombres:['0,305','0,350','0,035','0,503'],
        ordre:['0,035','0,305','0,350','0,503'], justif:{plus_petit_dixieme:'0', plus_grand_dixieme:'5'} },
      { type:'E', liste:['0,100','0,250','0,205','0,300','0,400'], intrus:'0,205', position_correcte:2 },
      { type:'A', sens:'décroissant', nombres:['3,060','3,6','3,006','3,600'],                equivalents:[['3,6','3,600']] },
      { type:'B', sens:'croissant',   nombres:['0,100','0,010','0,001','0,110'] },
      { type:'C', sens:'croissant',   nombres:['1,409','1,049','1,490','1,904','1,094'] }
    ]
  },

  "encadrer-decimaux": {
    title:      "Encadrer un nombre décimal",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Encadrement",
    type:       "encadrer-decimaux-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { type: 'A', nombre: '3,7',  rang: 'unite',   inf: '3',   sup: '4'   },
      { type: 'A', nombre: '0,4',  rang: 'unite',   inf: '0',   sup: '1'   },
      { type: 'B', nombre: '3,72', rang: 'dixieme', inf: '3,7', sup: '3,8' },
      { type: 'B', nombre: '0,43', rang: 'dixieme', inf: '0,4', sup: '0,5' },
      { type: 'C', nombre: '2,8',  rang: 'unite',   champ: 'sup', known: '2,5', reponse: '3'  },
      { type: 'C', nombre: '4,3',  rang: 'unite',   champ: 'inf', known: '5',   reponse: '4'  },
      { type: 'D', nombre: '3,7',  rang: 'unite',   enonce: '3 < 3,7 < 4', reponse: true  },
      { type: 'D', nombre: '3,7',  rang: 'unite',   enonce: '2 < 3,7 < 4', reponse: false,
        explication: 'La borne inférieure doit être 3, pas 2.' }
    ],

    lvl2: [
      { type: 'A', nombre: '3,47',  rang: 'dixieme',  inf: '3,4',  sup: '3,5'  },
      { type: 'B', nombre: '2,08',  rang: 'dixieme',  inf: '2,0',  sup: '2,1',  piege: 'zero_dixieme' },
      { type: 'C', nombre: '3,473', rang: 'centieme', inf: '3,47', sup: '3,48' },
      { type: 'C', nombre: '0,251', rang: 'centieme', inf: '0,25', sup: '0,26' },
      { type: 'D', nombre: '1,85',
        encadrements: [
          { rang: 'unite',   inf: '1',   sup: '2'   },
          { rang: 'dixieme', inf: '1,8', sup: '1,9' }
        ]
      },
      { type: 'E', inf: '0,4', sup: '0,5' },
      { type: 'B', nombre: '5,03',  rang: 'dixieme',  inf: '5,0',  sup: '5,1',  piege: 'zero_dixieme' },
      { type: 'A', nombre: '7,61',  rang: 'dixieme',  inf: '7,6',  sup: '7,7'  }
    ],

    lvl3: [
      { type: 'A', nombre: '1,347',  rang: 'centieme', inf: '1,34', sup: '1,35'  },
      { type: 'B', nombre: '0,2483', rang: 'milieme',  inf: '0,248',sup: '0,249' },
      { type: 'C', nombre: '2,008',  rang: 'centieme', inf: '2,00', sup: '2,01',  piege: 'zero_centieme' },
      { type: 'D', nombre: '0,345',
        encadrements: [
          { rang: 'unite',    inf: '0',    sup: '1'    },
          { rang: 'dixieme',  inf: '0,3',  sup: '0,4'  },
          { rang: 'centieme', inf: '0,34', sup: '0,35' }
        ]
      },
      { type: 'E', inf: '2,450', sup: '2,451' },
      { type: 'F', nombre: '1,347', dixieme_inf: '1,3', dixieme_sup: '1,4',
        plus_proche: '1,3', arrondi: '1,3' },
      { type: 'A', nombre: '4,562', rang: 'centieme', inf: '4,56', sup: '4,57'  },
      { type: 'B', nombre: '0,0034',rang: 'milieme',  inf: '0,003',sup: '0,004', piege: 'zero_intercale' }
    ]
  },

  "decomposer-decimaux": {
    title:      "Décomposer un nombre décimal",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Décomposition",
    type:       "decomposer-decimaux-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { decimal: "2,3",  entier: 2, d: 3 },
      { decimal: "0,7",  entier: 0, d: 7 },
      { decimal: "5,4",  entier: 5, d: 4 },
      { decimal: "1,9",  entier: 1, d: 9 },
      { decimal: "4,0",  entier: 4, d: 0 },
      { decimal: "0,1",  entier: 0, d: 1 },
      { decimal: "3,6",  entier: 3, d: 6 },
      { decimal: "7,5",  entier: 7, d: 5 }
    ],

    lvl2: [
      { decimal: "3,47",  entier: 3,  d: 4, c: 7 },
      { decimal: "0,08",  entier: 0,  d: 0, c: 8,  piege: true },
      { decimal: "12,50", entier: 12, d: 5, c: 0,  piege: true },
      { decimal: "0,25",  entier: 0,  d: 2, c: 5 },
      { decimal: "6,30",  entier: 6,  d: 3, c: 0,  piege: true },
      { decimal: "1,04",  entier: 1,  d: 0, c: 4,  piege: true },
      { decimal: "9,99",  entier: 9,  d: 9, c: 9 },
      { decimal: "0,60",  entier: 0,  d: 6, c: 0,  piege: true }
    ],

    lvl3: [
      { decimal: "1,375", entier: 1, d: 3, c: 7, m: 5 },
      { decimal: "0,040", entier: 0, d: 0, c: 4, m: 0, piege: true },
      { decimal: "2,008", entier: 2, d: 0, c: 0, m: 8, piege: true },
      { decimal: "0,500", entier: 0, d: 5, c: 0, m: 0, equivalent: true },
      { decimal: "3,060", entier: 3, d: 0, c: 6, m: 0, piege: true },
      { decimal: "0,100", entier: 0, d: 1, c: 0, m: 0, equivalent: true },
      { decimal: "4,251", entier: 4, d: 2, c: 5, m: 1 },
      { decimal: "0,009", entier: 0, d: 0, c: 0, m: 9, piege: true }
    ]
  },

  "composer-decimaux": {
    title:      "Composer un nombre décimal",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Composition",
    type:       "composer-decimaux-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { decomp: "2 + 3/10",  formes: ["A","B"],  reponse: "2,3"               },
      { decomp: "0 + 7/10",  formes: ["A","B"],  reponse: "0,7"               },
      { decomp: "5 + 4/10",  formes: ["A","C"],  reponse: "5,4"               },
      { decomp: "1 + 0/10",  formes: ["B","C"],  reponse: "1,0",  piege: true },
      { decomp: "4 + 9/10",  formes: ["A","B"],  reponse: "4,9"               },
      { decomp: "0 + 1/10",  formes: ["A","C"],  reponse: "0,1"               },
      { decomp: "3 + 6/10",  formes: ["B","C"],  reponse: "3,6"               },
      { decomp: "7 + 5/10",  formes: ["A","B"],  reponse: "7,5"               }
    ],

    lvl2: [
      { decomp: "3 + 4/10 + 7/100",                    forme: "A", reponse: "3,47"  },
      { decomp: "1 + 0/10 + 4/100",                    forme: "B", reponse: "1,04",  piege: true },
      { decomp: "0 + 0/10 + 8/100",                    forme: "B", reponse: "0,08",  piege: true },
      { decomp: "4/10 + 7/100",                        forme: "C", reponse: "0,47"  },
      { decomp: "7 centièmes + 3 unités + 4 dixièmes", forme: "D", reponse: "3,47"  },
      { decomp: "6 + 3/10 + 0/100",                    forme: "B", reponse: "6,30",  piege: true },
      { decomp: "0 + 2/10 + 5/100",                    forme: "A", reponse: "0,25"  },
      { decomp: "12 + 5/10 + 0/100",                   forme: "B", reponse: "12,50", piege: true }
    ],

    lvl3: [
      { decomp: "1 + 3/10 + 7/100 + 5/1000",  forme: "A", reponse: "1,375" },
      { decomp: "2 + 0/10 + 0/100 + 8/1000",  forme: "B", reponse: "2,008", piege: true },
      { decomp: "0 + 0/10 + 4/100 + 0/1000",  forme: "B", reponse: "0,040", piege: true },
      { decomp: "3 + 6/100",                  forme: "C", reponse: "3,060" },
      { decomp: "5/1000",                      forme: "C", reponse: "0,005", piege: true },
      { decomp: "2 + 47/1000",                 forme: "D", reponse: "2,047" },
      { decomp: "0 + 500/1000",                forme: "D", reponse: "0,500" },
      { nombre: "0,305", forme: "E",
        choix: ["3/10 + 0/100 + 5/1000","3/100 + 5/1000","0 + 3/10 + 5/1000","305/100"],
        reponse_index: 0 }
    ]
  },

  "intercaler-decimaux": {
    title:      "Intercaler un nombre décimal entre deux nombres",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Intercalation",
    type:       "intercaler-decimaux-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { type: 'A', inf: '3',   sup: '4'   },
      { type: 'A', inf: '0',   sup: '1'   },
      { type: 'B', inf: '2,3', sup: '2,4' },
      { type: 'B', inf: '0,6', sup: '0,7' },
      { type: 'C', inf: '2,3', sup: '2,4' },
      { type: 'D',
        inf: '1,2', sup: '1,5',
        choix: ['1,6', '1,3', '0,9', '1,5'],
        reponse: '1,3',
        pieges: { '1,5': 'borne_exclue', '0,9': 'trop_petit', '1,6': 'trop_grand' }
      },
      { type: 'E', inf_frac: '1/10', sup_frac: '3/10', inf: '0,1', sup: '0,3', den: 10 },
      { type: 'C', inf: '4,1', sup: '4,2' }
    ],

    lvl2: [
      { type: 'A', inf: '0,47', sup: '0,48' },
      { type: 'B', inf: '2,0',  sup: '2,1',  piege: 'zero_dixieme' },
      { type: 'C', inf: '3,40', sup: '3,41', piege: 'vide_apparent' },
      { type: 'D', nombre: '0,50', inf: '0,4', sup: '0,6', equivalent: '0,5' },
      { type: 'E2', inf: '1,2',  sup: '1,3' },
      { type: 'F',
        inf: '0,5', sup: '0,6',
        choix: ['0,50', '0,55', '0,6', '0,05', '0,500'],
        corrects: ['0,55'],
        pieges: { '0,50': 'egal_borne_inf', '0,6': 'egal_borne_sup', '0,05': 'trop_petit', '0,500': 'egal_borne_inf' }
      },
      { type: 'A', inf: '1,07', sup: '1,08' },
      { type: 'C', inf: '0,09', sup: '0,10', piege: 'vide_apparent' }
    ],

    lvl3: [
      { type: 'A', inf: '0,248',  sup: '0,249' },
      { type: 'B3', inf: '1,41',  sup: '1,42'  },
      { type: 'C3', inf: '2,450', sup: '2,451' },
      { type: 'D3',
        inf: '0,1', sup: '0,2',
        choix: ['Aucun', 'Exactement 8', 'Une infinité', 'Exactement 9'],
        reponse: 'Une infinité'
      },
      { type: 'E3', inf: '0,3',    sup: '0,4'   },
      { type: 'F3', inf: '0,249',  sup: '0,250', exemple: '0,2495' },
      { type: 'A',  inf: '3,0041', sup: '3,0042' },
      { type: 'C3', inf: '0,100',  sup: '0,101'  }
    ]
  },

  "placer-decimaux-droite": {
    title:      "Placer un nombre décimal sur une droite graduée",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Droite graduée",
    type:       "placer-decimaux-droite-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { mode: "placer",  nombre: "2,7", droite: { min: 2, max: 3, pas: 0.1, etiquettes: [2, 3] }, tooltip: true },
      { mode: "reperer", valeur: "0,4", droite: { min: 0, max: 1, pas: 0.1, etiquettes: [0, 1] }, point_label: "A" },
      { mode: "placer",  nombre: "7/10", equivalent: "0,7", droite: { min: 0, max: 1, pas: 0.1, etiquettes: [0, 1] }, tooltip: true, lien_fraction: true },
      { mode: "placer",  nombre: "0,45", droite: { min: 0.4, max: 0.5, pas: 0.01, etiquettes: [0.4, 0.5] }, tooltip: true },
      { mode: "reperer", valeur: "3,8", droite: { min: 3, max: 4, pas: 0.1, etiquettes: [3, 4] }, point_label: "B" },
      { mode: "placer",  nombre: "1,3", droite: { min: 1, max: 2, pas: 0.1, etiquettes: [1, 2] }, tooltip: true },
      { mode: "reperer", valeur: "0,25", droite: { min: 0.2, max: 0.3, pas: 0.01, etiquettes: [0.2, 0.3] }, point_label: "A" },
      { mode: "placer",  nombre: "3/10", equivalent: "0,3", droite: { min: 0, max: 1, pas: 0.1, etiquettes: [0, 1] }, tooltip: true, lien_fraction: true }
    ],

    lvl2: [
      { mode: "placer",  nombre: "5,3", droite: { min: 5, max: 6, pas: 0.1, etiquettes: [5, 6] }, tooltip: false },
      { mode: "reperer", valeur: "2,6", droite: { min: 2, max: 3, pas: 0.1, etiquettes: [2, 3] }, point_label: "A" },
      { mode: "placer",  nombre: "0,347", droite: { min: 0.34, max: 0.35, pas: 0.001, etiquettes: [0.34, 0.35] }, tooltip: false },
      { mode: "reperer", valeur: "1,258", droite: { min: 1.25, max: 1.26, pas: 0.001, etiquettes: [1.25, 1.26] }, point_label: "B" },
      { mode: "associer", etiquettes_a_placer: ["0,5", "0,50", "0,55"], droite: { min: 0, max: 1, pas: 0.01, etiquettes: [0, 0.5, 1] }, equivalents: [["0,5", "0,50"]], piege: "zeros" },
      { mode: "placer_multiple", nombres: ["2,4", "2,45", "2,405"], droite: { min: 2.4, max: 2.5, pas: 0.01, etiquettes: [2.4, 2.5] }, tooltip: false },
      { mode: "placer",  nombre: "7,08", droite: { min: 7, max: 7.2, pas: 0.01, etiquettes: [7, 7.1, 7.2] }, tooltip: false, piege: "zero_dixieme" },
      { mode: "reperer", valeur: "0,905", droite: { min: 0.9, max: 0.91, pas: 0.001, etiquettes: [0.9, 0.91] }, point_label: "C" }
    ],

    lvl3: [
      { mode: "reperer", valeur: "1,4", droite: { min: 0, max: 2, pas: 0.2, etiquettes: [0, 1, 2] }, point_label: "A", piege: "pas_non_unitaire" },
      { mode: "placer",  nombre: "1,75", droite: { min: 0, max: 2, pas: 0.25, etiquettes: [0, 0.5, 1, 1.5, 2] }, tooltip: false, piege: "pas_non_unitaire" },
      { mode: "reperer", valeur: "4,2", droite: { min: 3.5, max: 4.5, pas: 0.1, etiquettes: [3.5, 4.5] }, point_label: "B", piege: "origine_decalee" },
      { mode: "reperer", valeur: "0,64", droite: { min: 0, max: 1, pas: 0.01, etiquettes: [0, 1] }, point_label: "M", vocabulaire: "abscisse" },
      { mode: "qcm_estimation", valeur: "2,35", droite: { min: 2, max: 3, pas: 0.1, etiquettes: [2, 3] }, point_position: 2.35, point_label: "C", choix: ["2,3", "2,35", "2,4", "2,53"], reponse: "2,35" },
      { mode: "placer",  nombre: "0,125", droite: { min: 0, max: 0.5, pas: 0.05, etiquettes: [0, 0.25, 0.5] }, tooltip: false, tolerance: "quart_intervalle", piege: "entre_graduations" },
      { mode: "reperer", valeur: "0,6", droite: { min: 0, max: 1, pas: 0.2, etiquettes: [0, 1] }, point_label: "D", piege: "pas_non_unitaire" },
      { mode: "placer",  nombre: "6,8", droite: { min: 5.5, max: 7.5, pas: 0.1, etiquettes: [5.5, 6.5, 7.5] }, tooltip: false, piege: "origine_decalee" }
    ]
  },

  "associer-decimal-fraction": {
    title:      "Associer une fraction décimale à un nombre décimal",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Association fraction / décimal",
    type:       "associer-decimal-fraction-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-nombres-decimaux.html", label: "Nombres décimaux" },

    lvl1: [
      { mode: 'fraction-to-decimal', display: { type: 'fraction', num: 3, den: 10 }, answer: { decimal: 0.3, str: '0,3' }, table: { u: 0, di: 3, ce: null, mi: null }, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'fraction-to-decimal', display: { type: 'fraction', num: 7, den: 100 }, answer: { decimal: 0.07, str: '0,07' }, table: { u: 0, di: 0, ce: 7, mi: null }, line: { min: 0, max: 0.1, step: 0.01 } },
      { mode: 'fraction-to-decimal', display: { type: 'fraction', num: 25, den: 100 }, answer: { decimal: 0.25, str: '0,25' }, table: { u: 0, di: 2, ce: 5, mi: null }, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'fraction-to-decimal', display: { type: 'fraction', num: 143, den: 1000 }, answer: { decimal: 0.143, str: '0,143' }, table: { u: 0, di: 1, ce: 4, mi: 3 }, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'fraction-to-decimal', display: { type: 'fraction', num: 9, den: 1000 }, answer: { decimal: 0.009, str: '0,009' }, table: { u: 0, di: 0, ce: 0, mi: 9 }, line: { min: 0, max: 0.01, step: 0.001 } }
    ],

    lvl2: [
      { mode: 'decimal-to-fraction', display: { type: 'decimal', value: '0,4' }, answer: { decimal: 0.4, num: 4, den: 10, altNums: [40, 400], altDens: [100, 1000] }, table: { u: 0, di: 4, ce: null, mi: null }, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'decimal-to-fraction', display: { type: 'decimal', value: '0,35' }, answer: { decimal: 0.35, num: 35, den: 100, altNums: [350], altDens: [1000] }, table: { u: 0, di: 3, ce: 5, mi: null }, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'decimal-to-fraction', display: { type: 'decimal', value: '0,208' }, answer: { decimal: 0.208, num: 208, den: 1000, altNums: [], altDens: [] }, table: { u: 0, di: 2, ce: 0, mi: 8 }, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'decimal-to-fraction', display: { type: 'decimal', value: '1,75' }, answer: { decimal: 1.75, num: 175, den: 100, altNums: [1750], altDens: [1000] }, table: { u: 1, di: 7, ce: 5, mi: null }, line: { min: 0, max: 2, step: 0.25 } },
      { mode: 'decimal-to-fraction', display: { type: 'decimal', value: '4,6' }, answer: { decimal: 4.6, num: 46, den: 10, altNums: [460, 4600], altDens: [100, 1000] }, table: { u: 4, di: 6, ce: null, mi: null }, line: { min: 0, max: 5, step: 0.25 } }
    ],

    lvl3: [
      { mode: 'mcq', display: { type: 'fraction', num: 3, den: 10 }, answer: { decimal: 0.3 }, choiceType: 'decimal',
        choices: [ { label: '0,3', decimal: 0.3 }, { label: '0,03', decimal: 0.03 }, { label: '3,0', decimal: 3.0 }, { label: '0,003', decimal: 0.003 } ],
        correctIdx: 0, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'mcq', display: { type: 'decimal', value: '0,17' }, answer: { decimal: 0.17 }, choiceType: 'fraction',
        choices: [ { label: '17/10', fracNum: 17, fracDen: 10, decimal: 1.7 }, { label: '17/100', fracNum: 17, fracDen: 100, decimal: 0.17 }, { label: '17/1000', fracNum: 17, fracDen: 1000, decimal: 0.017 }, { label: '1,7/10', fracNum: null, fracDen: null, decimal: null } ],
        correctIdx: 1, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'mcq', display: { type: 'fraction', num: 250, den: 1000 }, answer: { decimal: 0.25 }, choiceType: 'decimal',
        choices: [ { label: '2,5', decimal: 2.5 }, { label: '25', decimal: 25 }, { label: '0,25', decimal: 0.25 }, { label: '0,025', decimal: 0.025 } ],
        correctIdx: 2, line: { min: 0, max: 1, step: 0.1 } },
      { mode: 'mcq', display: { type: 'decimal', value: '0,005' }, answer: { decimal: 0.005 }, choiceType: 'fraction',
        choices: [ { label: '5/100', fracNum: 5, fracDen: 100, decimal: 0.05 }, { label: '5/10', fracNum: 5, fracDen: 10, decimal: 0.5 }, { label: '5/1000', fracNum: 5, fracDen: 1000, decimal: 0.005 }, { label: '50/1000', fracNum: 50, fracDen: 1000, decimal: 0.05 } ],
        correctIdx: 2, line: { min: 0, max: 0.01, step: 0.001 } },
      { mode: 'mcq', display: { type: 'fraction', num: 36, den: 100 }, answer: { decimal: 0.36 }, choiceType: 'decimal',
        choices: [ { label: '0,36', decimal: 0.36 }, { label: '0,63', decimal: 0.63 }, { label: '3,6', decimal: 3.6 }, { label: '0,036', decimal: 0.036 } ],
        correctIdx: 0, line: { min: 0, max: 1, step: 0.1 } }
    ]
  }

});

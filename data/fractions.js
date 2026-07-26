/* ── data/fractions.js — Fractions (9 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "representer-fraction": {
    title: "Représenter une fraction",
    domaine:    "Mathématiques",
    competence: "Fractions — Représenter",
    type: "representer-fraction",
    levels: ["CM1", "CM2"],
    paliers: 2, /* nombre réel de paliers du moteur */
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
    domaine:    "Mathématiques",
    competence: "Fractions — Lire et écrire",
    type: "lire-fraction",
    levels: ["CM1", "CM2"],
    paliers: 2, /* nombre réel de paliers du moteur */
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

  "decomposer-fraction-partie-entiere": {
    title: "Décomposer une fraction (partie entière + fraction)",
    domaine:    "Mathématiques",
    competence: "Fractions — Décomposer",
    type: "decomposer-fraction",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ─────────────────────────────────────────────
       num / den   : fraction de départ (num > den)
       entiere     : partie entière      = Math.floor(num / den)
       reste       : numérateur restant  = num % den (fraction propre = reste/den)
       inputMode   : "qcm" (Niveau 1) | "fill-two" (Niveau 2) | "free-text" (Niveau 3)
       choices/answer : uniquement pour inputMode "qcm"
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Niveau 1 — QCM */
      { level: "CM1", inputMode: "qcm", num: 7,  den: 2,  entiere: 3, reste: 1,
        answer: "3 + 1/2", choices: ["3 + 1/2", "2 + 1/2", "3 + 2/2"] },
      { level: "CM1", inputMode: "qcm", num: 11, den: 4,  entiere: 2, reste: 3,
        answer: "2 + 3/4", choices: ["2 + 3/4", "3 + 1/4", "2 + 1/4"] },
      { level: "CM1", inputMode: "qcm", num: 13, den: 5,  entiere: 2, reste: 3,
        answer: "2 + 3/5", choices: ["2 + 3/5", "3 + 2/5", "2 + 1/5"] },
      { level: "CM1", inputMode: "qcm", num: 9,  den: 3,  entiere: 3, reste: 0,
        answer: "3 + 0/3 = 3", choices: ["3 + 0/3 = 3", "2 + 1/3", "4 + 0/3"] },
      { level: "CM1", inputMode: "qcm", num: 17, den: 8,  entiere: 2, reste: 1,
        answer: "2 + 1/8", choices: ["2 + 1/8", "1 + 7/8", "2 + 3/8"] },
      { level: "CM1", inputMode: "qcm", num: 9,  den: 2,  entiere: 4, reste: 1,
        answer: "4 + 1/2", choices: ["4 + 1/2", "3 + 1/2", "4 + 2/2"] },
      { level: "CM1", inputMode: "qcm", num: 14, den: 3,  entiere: 4, reste: 2,
        answer: "4 + 2/3", choices: ["4 + 2/3", "3 + 2/3", "4 + 1/3"] },
      { level: "CM1", inputMode: "qcm", num: 22, den: 5,  entiere: 4, reste: 2,
        answer: "4 + 2/5", choices: ["4 + 2/5", "5 + 2/5", "4 + 3/5"] },
      { level: "CM1", inputMode: "qcm", num: 19, den: 4,  entiere: 4, reste: 3,
        answer: "4 + 3/4", choices: ["4 + 3/4", "3 + 3/4", "4 + 1/4"] },
      { level: "CM1", inputMode: "qcm", num: 25, den: 8,  entiere: 3, reste: 1,
        answer: "3 + 1/8", choices: ["3 + 1/8", "2 + 1/8", "3 + 7/8"] },
      { level: "CM1", inputMode: "qcm", num: 30, den: 10, entiere: 3, reste: 0,
        answer: "3 + 0/10 = 3", choices: ["3 + 0/10 = 3", "2 + 8/10", "3 + 1/10"] },
      { level: "CM1", inputMode: "qcm", num: 16, den: 5,  entiere: 3, reste: 1,
        answer: "3 + 1/5", choices: ["3 + 1/5", "2 + 1/5", "3 + 2/5"] },

      /* Niveau 2 — saisie libre (partie entière + numérateur, dénominateur affiché) */
      { level: "CM2", inputMode: "fill-two", num: 23, den: 6,  entiere: 3, reste: 5 },
      { level: "CM2", inputMode: "fill-two", num: 19, den: 7,  entiere: 2, reste: 5 },
      { level: "CM2", inputMode: "fill-two", num: 31, den: 9,  entiere: 3, reste: 4 },
      { level: "CM2", inputMode: "fill-two", num: 18, den: 6,  entiere: 3, reste: 0 },
      { level: "CM2", inputMode: "fill-two", num: 29, den: 8,  entiere: 3, reste: 5 },
      { level: "CM2", inputMode: "fill-two", num: 17, den: 5,  entiere: 3, reste: 2 },
      { level: "CM2", inputMode: "fill-two", num: 26, den: 4,  entiere: 6, reste: 2 },
      { level: "CM2", inputMode: "fill-two", num: 21, den: 10, entiere: 2, reste: 1 },
      { level: "CM2", inputMode: "fill-two", num: 33, den: 7,  entiere: 4, reste: 5 },
      { level: "CM2", inputMode: "fill-two", num: 15, den: 3,  entiere: 5, reste: 0 },
      { level: "CM2", inputMode: "fill-two", num: 38, den: 9,  entiere: 4, reste: 2 },
      { level: "CM2", inputMode: "fill-two", num: 27, den: 8,  entiere: 3, reste: 3 },

      /* Niveau 3 — saisie libre forme mixte "a + b/c" */
      { level: "6e", inputMode: "free-text", num: 23, den: 6,  entiere: 3, reste: 5 },
      { level: "6e", inputMode: "free-text", num: 19, den: 7,  entiere: 2, reste: 5 },
      { level: "6e", inputMode: "free-text", num: 31, den: 9,  entiere: 3, reste: 4 },
      { level: "6e", inputMode: "free-text", num: 24, den: 6,  entiere: 4, reste: 0 },
      { level: "6e", inputMode: "free-text", num: 41, den: 12, entiere: 3, reste: 5 },
      { level: "6e", inputMode: "free-text", num: 47, den: 15, entiere: 3, reste: 2 },
      { level: "6e", inputMode: "free-text", num: 53, den: 25, entiere: 2, reste: 3 },
      { level: "6e", inputMode: "free-text", num: 29, den: 8,  entiere: 3, reste: 5 },
      { level: "6e", inputMode: "free-text", num: 37, den: 11, entiere: 3, reste: 4 },
      { level: "6e", inputMode: "free-text", num: 50, den: 12, entiere: 4, reste: 2 },
      { level: "6e", inputMode: "free-text", num: 63, den: 15, entiere: 4, reste: 3 },
      { level: "6e", inputMode: "free-text", num: 81, den: 25, entiere: 3, reste: 6 }
    ]
  },

  "utiliser-fractions-problemes": {
    title: "Utiliser les fractions dans des problèmes",
    domaine:    "Mathématiques",
    competence: "Fractions — Problèmes",
    type: "fractions-problemes",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ─────────────────────────────────────────────
       Niveau 1 (inputMode "qcm")       : lecture d'une fraction simple dans un énoncé
       Niveau 2 (inputMode "free-text") : calcul d'une fraction d'une quantité
       Niveau 3  (inputMode "multi-step"): problème à étapes, saisie libre, équivalences acceptées
       illustration : { type: "cercle"|"rectangle"|"barre"|"proportion"|"ardoise", ... }
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* ── Niveau 1 — QCM ──────────────────────────────────────────────────── */
      { level: "CM1", inputMode: "qcm",
        question: "Une pizza est coupée en 4 parts égales. Léa mange 3 parts. Quelle fraction de la pizza a-t-elle mangée ?",
        choices: ["3/4", "1/4", "4/3"], answer: "3/4",
        illustration: { type: "cercle", n: 3, d: 4 } },
      { level: "CM1", inputMode: "qcm",
        question: "Un ruban mesure 10 cm. Tom en utilise la moitié. Quelle longueur a-t-il utilisée ?",
        choices: ["5 cm", "2 cm", "8 cm"], answer: "5 cm",
        illustration: { type: "barre", n: 1, d: 2, total: 10, resultat: 5, unite: "cm" } },
      { level: "CM1", inputMode: "qcm",
        question: "Un gâteau est partagé en 8 parts égales. 5 parts sont mangées. Quelle fraction reste-t-il ?",
        choices: ["3/8", "5/8", "2/8"], answer: "3/8",
        illustration: { type: "cercle", n: 3, d: 8 } },
      { level: "CM1", inputMode: "qcm",
        question: "Une tablette de chocolat compte 6 carrés. Sam en mange 2. Quelle fraction a-t-il mangée ?",
        choices: ["2/6", "6/2", "4/6"], answer: "2/6",
        illustration: { type: "rectangle", n: 2, d: 6 } },
      { level: "CM1", inputMode: "qcm",
        question: "Une pizza est coupée en 3 parts égales. Un ami mange 1 part. Quelle fraction a-t-il mangée ?",
        choices: ["1/3", "3/1", "2/3"], answer: "1/3",
        illustration: { type: "cercle", n: 1, d: 3 } },
      { level: "CM1", inputMode: "qcm",
        question: "Une barre de réglisse mesure 12 m. Tom en utilise un tiers. Quelle longueur a-t-il utilisée ?",
        choices: ["4 m", "3 m", "6 m"], answer: "4 m",
        illustration: { type: "barre", n: 1, d: 3, total: 12, resultat: 4, unite: "m" } },
      { level: "CM1", inputMode: "qcm",
        question: "Un gâteau est partagé en 5 parts égales. 2 parts sont mangées. Quelle fraction a été mangée ?",
        choices: ["2/5", "5/2", "3/5"], answer: "2/5",
        illustration: { type: "cercle", n: 2, d: 5 } },
      { level: "CM1", inputMode: "qcm",
        question: "Une tablette de chocolat compte 8 carrés. Léa en mange 5. Quelle fraction a-t-elle mangée ?",
        choices: ["5/8", "3/8", "8/5"], answer: "5/8",
        illustration: { type: "rectangle", n: 5, d: 8 } },
      { level: "CM1", inputMode: "qcm",
        question: "Une pizza est coupée en 6 parts égales. Léo mange 2 parts. Quelle fraction a-t-il mangée ?",
        choices: ["2/6", "4/6", "6/2"], answer: "2/6",
        illustration: { type: "cercle", n: 2, d: 6 } },
      { level: "CM1", inputMode: "qcm",
        question: "Un ruban mesure 8 m. Léa en utilise un quart. Quelle longueur a-t-elle utilisée ?",
        choices: ["2 m", "4 m", "1 m"], answer: "2 m",
        illustration: { type: "barre", n: 1, d: 4, total: 8, resultat: 2, unite: "m" } },
      { level: "CM1", inputMode: "qcm",
        question: "Un gâteau est partagé en 3 parts égales. 2 parts sont mangées. Quelle fraction a été mangée ?",
        choices: ["2/3", "3/2", "1/3"], answer: "2/3",
        illustration: { type: "cercle", n: 2, d: 3 } },
      { level: "CM1", inputMode: "qcm",
        question: "Une tablette de chocolat compte 4 carrés. Mehdi en mange 3. Quelle fraction a-t-il mangée ?",
        choices: ["3/4", "1/4", "4/3"], answer: "3/4",
        illustration: { type: "rectangle", n: 3, d: 4 } },

      /* ── Niveau 2 — saisie libre : fraction d'une quantité ─────────────────── */
      { level: "CM2", inputMode: "free-text",
        question: "Une classe a 24 élèves. 1/4 sont absents. Combien d'élèves sont absents ?",
        total: 24, n: 1, d: 4, resultat: 6, unite: "élèves",
        illustration: { type: "proportion", n: 1, d: 4, total: 24, resultat: 6, unite: "élèves" } },
      { level: "CM2", inputMode: "free-text",
        question: "Un sac contient 30 billes. Clara prend 2/5 des billes. Combien en prend-elle ?",
        total: 30, n: 2, d: 5, resultat: 12, unite: "billes",
        illustration: { type: "proportion", n: 2, d: 5, total: 30, resultat: 12, unite: "billes" } },
      { level: "CM2", inputMode: "free-text",
        question: "Une corde mesure 45 cm. On en coupe 2/3. Quelle longueur a-t-on coupée ?",
        total: 45, n: 2, d: 3, resultat: 30, unite: "cm",
        illustration: { type: "proportion", n: 2, d: 3, total: 45, resultat: 30, unite: "cm" } },
      { level: "CM2", inputMode: "free-text",
        question: "Un livre a 80 pages. Mehdi a lu 3/8 du livre. Combien de pages a-t-il lues ?",
        total: 80, n: 3, d: 8, resultat: 30, unite: "pages",
        illustration: { type: "proportion", n: 3, d: 8, total: 80, resultat: 30, unite: "pages" } },
      { level: "CM2", inputMode: "free-text",
        question: "Un paquet contient 36 bonbons. Léo en mange 1/3. Combien de bonbons a-t-il mangés ?",
        total: 36, n: 1, d: 3, resultat: 12, unite: "bonbons",
        illustration: { type: "proportion", n: 1, d: 3, total: 36, resultat: 12, unite: "bonbons" } },
      { level: "CM2", inputMode: "free-text",
        question: "Léa a 50 euros. Elle dépense 2/5 de cette somme. Combien d'euros a-t-elle dépensés ?",
        total: 50, n: 2, d: 5, resultat: 20, unite: "euros",
        illustration: { type: "proportion", n: 2, d: 5, total: 50, resultat: 20, unite: "euros" } },
      { level: "CM2", inputMode: "free-text",
        question: "Un jardin compte 18 fleurs. La moitié sont des roses. Combien y a-t-il de roses ?",
        total: 18, n: 1, d: 2, resultat: 9, unite: "roses",
        illustration: { type: "proportion", n: 1, d: 2, total: 18, resultat: 9, unite: "roses" } },
      { level: "CM2", inputMode: "free-text",
        question: "Un film dure 60 minutes. Tom en a déjà regardé 3/4. Combien de minutes a-t-il regardées ?",
        total: 60, n: 3, d: 4, resultat: 45, unite: "minutes",
        illustration: { type: "proportion", n: 3, d: 4, total: 60, resultat: 45, unite: "minutes" } },
      { level: "CM2", inputMode: "free-text",
        question: "Une classe compte 27 élèves. 2/3 d'entre eux pratiquent un sport. Combien d'élèves pratiquent un sport ?",
        total: 27, n: 2, d: 3, resultat: 18, unite: "élèves",
        illustration: { type: "proportion", n: 2, d: 3, total: 27, resultat: 18, unite: "élèves" } },
      { level: "CM2", inputMode: "free-text",
        question: "Une recette demande 100 g de farine. On en utilise 3/10. Quelle masse a-t-on utilisée ?",
        total: 100, n: 3, d: 10, resultat: 30, unite: "g",
        illustration: { type: "proportion", n: 3, d: 10, total: 100, resultat: 30, unite: "g" } },
      { level: "CM2", inputMode: "free-text",
        question: "Une bibliothèque possède 21 livres de la même collection. Mehdi en emprunte 1/7. Combien de livres emprunte-t-il ?",
        total: 21, n: 1, d: 7, resultat: 3, unite: "livres",
        illustration: { type: "proportion", n: 1, d: 7, total: 21, resultat: 3, unite: "livres" } },
      { level: "CM2", inputMode: "free-text",
        question: "Un album contient 32 photos. Léa en range 5/8 dans un classeur. Combien de photos range-t-elle ?",
        total: 32, n: 5, d: 8, resultat: 20, unite: "photos",
        illustration: { type: "proportion", n: 5, d: 8, total: 32, resultat: 20, unite: "photos" } },

      /* ── Niveau 3 — problèmes à étapes, saisie libre, équivalences acceptées ──
         accept : toutes les écritures valides de la réponse
         steps  : étapes numérotées affichées dans le panneau "ardoise"
         visual : description du schéma de gauche
      ────────────────────────────────────────────────────────────────── */
      { level: "6e", inputMode: "multi-step",
        question: "Une bouteille contient 3/4 de litre. Paul en boit 1/4 de litre. Quelle fraction de la bouteille reste-t-il ?",
        accept: ["2/4", "1/2"], display: "2/4",
        steps: ["① 3/4 − 1/4 = 2/4", "② 2/4 = 1/2 (forme simplifiée)"],
        illustration: { type: "ardoise",
          visual: { kind: "diffsame", d: 4, n1: 3, n2: 1, unite: "L" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un terrain a une surface de 60 m². 2/5 sont du gazon et 1/3 sont du gravier. Quelle surface est recouverte en tout ?",
        accept: ["44", "44 m2", "44 m²"], display: "44",
        steps: ["① 60 ÷ 5 = 12, puis 12 × 2 = 24 m² (gazon)", "② 60 ÷ 3 = 20, puis 20 × 1 = 20 m² (gravier)", "③ 24 + 20 = 44 m²"],
        illustration: { type: "ardoise",
          visual: { kind: "sum2", total: 60, n1: 2, d1: 5, n2: 1, d2: 3, unite: "m²" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Une recette demande 3/8 de litre de lait. Jules en a déjà 1/8. Combien lui manque-t-il ?",
        accept: ["2/8", "1/4"], display: "2/8",
        steps: ["① 3/8 − 1/8 = 2/8", "② 2/8 = 1/4 (forme simplifiée)"],
        illustration: { type: "ardoise",
          visual: { kind: "diffsame", d: 8, n1: 3, n2: 1, unite: "L" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un collège a 360 élèves. 5/9 sont des filles. Combien y a-t-il de garçons ?",
        accept: ["160"], display: "160",
        steps: ["① 360 ÷ 9 = 40", "② 40 × 5 = 200 filles", "③ 360 − 200 = 160 garçons"],
        illustration: { type: "ardoise",
          visual: { kind: "complement", total: 360, n: 5, d: 9, unite: "élèves" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un panier contient 5/6 kg de pommes. Léa en mange 1/6 kg. Quelle masse de pommes reste-t-il ?",
        accept: ["4/6", "2/3"], display: "4/6",
        steps: ["① 5/6 − 1/6 = 4/6", "② 4/6 = 2/3 (forme simplifiée)"],
        illustration: { type: "ardoise",
          visual: { kind: "diffsame", d: 6, n1: 5, n2: 1, unite: "kg" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Une classe compte 28 élèves. 3/7 d'entre eux partent en classe de sport. Combien d'élèves restent dans la classe ?",
        accept: ["16"], display: "16",
        steps: ["① 28 ÷ 7 = 4", "② 4 × 3 = 12 élèves partent", "③ 28 − 12 = 16 élèves restent"],
        illustration: { type: "ardoise",
          visual: { kind: "complement", total: 28, n: 3, d: 7, unite: "élèves" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un réservoir est plein à 7/8. On utilise 3/8 de sa capacité. Quelle fraction du réservoir reste-t-il ?",
        accept: ["4/8", "1/2"], display: "4/8",
        steps: ["① 7/8 − 3/8 = 4/8", "② 4/8 = 1/2 (forme simplifiée)"],
        illustration: { type: "ardoise",
          visual: { kind: "diffsame", d: 8, n1: 7, n2: 3, unite: "" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Une ferme compte 96 animaux. 3/8 sont des vaches et 1/4 sont des chevaux. Combien y a-t-il de vaches et de chevaux en tout ?",
        accept: ["60"], display: "60",
        steps: ["① 96 ÷ 8 = 12, puis 12 × 3 = 36 vaches", "② 96 ÷ 4 = 24, puis 24 × 1 = 24 chevaux", "③ 36 + 24 = 60 animaux"],
        illustration: { type: "ardoise",
          visual: { kind: "sum2", total: 96, n1: 3, d1: 8, n2: 1, d2: 4, unite: "animaux" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un verger compte 90 fruits. 2/3 sont des pommes et 1/9 sont des poires. Combien de pommes et de poires y a-t-il en tout ?",
        accept: ["70"], display: "70",
        steps: ["① 90 ÷ 3 = 30, puis 30 × 2 = 60 pommes", "② 90 ÷ 9 = 10, puis 10 × 1 = 10 poires", "③ 60 + 10 = 70 fruits"],
        illustration: { type: "ardoise",
          visual: { kind: "sum2", total: 90, n1: 2, d1: 3, n2: 1, d2: 9, unite: "fruits" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un bidon contient 9/10 de litre. On en verse 4/10 de litre. Quelle fraction du bidon reste-t-il ?",
        accept: ["5/10", "1/2"], display: "5/10",
        steps: ["① 9/10 − 4/10 = 5/10", "② 5/10 = 1/2 (forme simplifiée)"],
        illustration: { type: "ardoise",
          visual: { kind: "diffsame", d: 10, n1: 9, n2: 4, unite: "L" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un trajet mesure 48 km. Une voiture a déjà parcouru 3/8 du trajet. Combien de kilomètres reste-t-il à parcourir ?",
        accept: ["30"], display: "30",
        steps: ["① 48 ÷ 8 = 6", "② 6 × 3 = 18 km déjà parcourus", "③ 48 − 18 = 30 km restants"],
        illustration: { type: "ardoise",
          visual: { kind: "complement", total: 48, n: 3, d: 8, unite: "km" } } },
      { level: "6e", inputMode: "multi-step",
        question: "Un spectacle compte 480 places. 5/8 des places ont été vendues. Combien de places restent disponibles ?",
        accept: ["180"], display: "180",
        steps: ["① 480 ÷ 8 = 60", "② 60 × 5 = 300 places vendues", "③ 480 − 300 = 180 places restantes"],
        illustration: { type: "ardoise",
          visual: { kind: "complement", total: 480, n: 5, d: 8, unite: "places" } } }
    ]
  },

  "placer-fraction-droite-graduee": {
    title: "Placer une fraction sur une droite graduée",
    domaine:    "Mathématiques",
    competence: "Fractions — Droite graduée",
    type: "placer-fraction-droite",
    levels: ["CM1", "CM2"],
    paliers: 2, /* nombre réel de paliers du moteur */
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

  "encadrer-fraction": {
    title: "Encadrer une fraction entre deux entiers consécutifs",
    domaine:    "Mathématiques",
    competence: "Fractions — Encadrer",
    levels: ["CM1", "CM2"],
    paliers: 2, /* nombre réel de paliers du moteur */
    type: "encadrer-fraction",
    questionsPerSession: 6,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ──────────────────────────────────────────────
       difficulty 1 — avec droite graduée (Niveau 1 / Niveau 2)
         Fractions > 1, petits dénominateurs. Un cas entier : 8/4 = 2 (signe ≤).
       difficulty 2 — sans droite graduée, par le calcul (Niveau 2 / Niveau 3)
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
    domaine:    "Mathématiques",
    competence: "Fractions — Comparer",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "comparer-fractions",
    questionsPerSession: 6,
    backLink: { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Banque de questions ──────────────────────────────────────────────
       level 1 — même dénominateur (Niveau 1)
         → comparer revient à comparer les numérateurs
         → inclut au moins un cas d'égalité
       level 2 — dénominateurs différents (Niveau 2 / Niveau 3)
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

  /* NB : classé ici (Fractions) par backLink car proposé sur la page Fractions,
     bien que competence relève des Nombres décimaux (lien fraction décimale ↔ décimal). */
  "fraction-decimale-grille-droite": {
    title:      "Fraction décimale — Grille, droite et écriture décimale",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Associer une fraction décimale à un nombre décimal",
    type:       "fraction-decimale-grille-droite-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-fractions.html", label: "Fractions" },

    /* ── Niveau 1 — /10 ── */
    lvl1: [
      { num: 3, den: 10, decimal: 0.3,  decimalStr: "0,3",  droiteTicks: 10, majorStep: 10, tickIdx: 3  },
      { num: 7, den: 10, decimal: 0.7,  decimalStr: "0,7",  droiteTicks: 10, majorStep: 10, tickIdx: 7  },
      { num: 1, den: 10, decimal: 0.1,  decimalStr: "0,1",  droiteTicks: 10, majorStep: 10, tickIdx: 1  },
      { num: 9, den: 10, decimal: 0.9,  decimalStr: "0,9",  droiteTicks: 10, majorStep: 10, tickIdx: 9  },
      { num: 5, den: 10, decimal: 0.5,  decimalStr: "0,5",  droiteTicks: 10, majorStep: 10, tickIdx: 5  },
      { num: 4, den: 10, decimal: 0.4,  decimalStr: "0,4",  droiteTicks: 10, majorStep: 10, tickIdx: 4  },
      { num: 6, den: 10, decimal: 0.6,  decimalStr: "0,6",  droiteTicks: 10, majorStep: 10, tickIdx: 6  },
      { num: 2, den: 10, decimal: 0.2,  decimalStr: "0,2",  droiteTicks: 10, majorStep: 10, tickIdx: 2  }
    ],

    /* ── Niveau 2 — /100 ── */
    lvl2: [
      { num: 23, den: 100, decimal: 0.23, decimalStr: "0,23", droiteTicks: 100, majorStep: 10, tickIdx: 23 },
      { num: 75, den: 100, decimal: 0.75, decimalStr: "0,75", droiteTicks: 100, majorStep: 10, tickIdx: 75 },
      { num: 40, den: 100, decimal: 0.4,  decimalStr: "0,40", droiteTicks: 100, majorStep: 10, tickIdx: 40 },
      { num: 8,  den: 100, decimal: 0.08, decimalStr: "0,08", droiteTicks: 100, majorStep: 10, tickIdx: 8  },
      { num: 60, den: 100, decimal: 0.6,  decimalStr: "0,60", droiteTicks: 100, majorStep: 10, tickIdx: 60 },
      { num: 17, den: 100, decimal: 0.17, decimalStr: "0,17", droiteTicks: 100, majorStep: 10, tickIdx: 17 },
      { num: 50, den: 100, decimal: 0.5,  decimalStr: "0,50", droiteTicks: 100, majorStep: 10, tickIdx: 50 },
      { num: 91, den: 100, decimal: 0.91, decimalStr: "0,91", droiteTicks: 100, majorStep: 10, tickIdx: 91 }
    ],

    /* ── Niveau 3 — /1000 (pas droite = 50/1000, 20 graduations) ── */
    lvl3: [
      { num:  50, den: 1000, decimal: 0.05,  decimalStr: "0,050", droiteTicks: 20, majorStep: 5, tickIdx:  1 },
      { num: 150, den: 1000, decimal: 0.15,  decimalStr: "0,150", droiteTicks: 20, majorStep: 5, tickIdx:  3 },
      { num: 250, den: 1000, decimal: 0.25,  decimalStr: "0,250", droiteTicks: 20, majorStep: 5, tickIdx:  5 },
      { num: 350, den: 1000, decimal: 0.35,  decimalStr: "0,350", droiteTicks: 20, majorStep: 5, tickIdx:  7 },
      { num: 450, den: 1000, decimal: 0.45,  decimalStr: "0,450", droiteTicks: 20, majorStep: 5, tickIdx:  9 },
      { num: 650, den: 1000, decimal: 0.65,  decimalStr: "0,650", droiteTicks: 20, majorStep: 5, tickIdx: 13 },
      { num: 750, den: 1000, decimal: 0.75,  decimalStr: "0,750", droiteTicks: 20, majorStep: 5, tickIdx: 15 },
      { num: 900, den: 1000, decimal: 0.9,   decimalStr: "0,900", droiteTicks: 20, majorStep: 5, tickIdx: 18 }
    ]
  },

  /* NB : classé ici (Fractions) par backLink car proposé sur la page Fractions,
     bien que competence relève des Nombres décimaux (lien fraction décimale ↔ décimal). */
  "fraction-decimale-tableau-numeration": {
    title:      "Fraction décimale — Tableau de numération",
    domaine:    "Mathématiques",
    competence: "Nombres décimaux — Associer une fraction décimale à un nombre décimal",
    type:       "fraction-decimale-tableau-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "mathématiques-fractions.html", label: "Fractions" },

    /* tab : { u, di, ce, mi } — null = colonne non active */

    /* ── Niveau 1 — /10 ── */
    lvl1: [
      { num: 7, den: 10, decimal: 0.7, decimalStr: "0,7", tab: { u: 0, di: 7, ce: null, mi: null } },
      { num: 3, den: 10, decimal: 0.3, decimalStr: "0,3", tab: { u: 0, di: 3, ce: null, mi: null } },
      { num: 9, den: 10, decimal: 0.9, decimalStr: "0,9", tab: { u: 0, di: 9, ce: null, mi: null } },
      { num: 1, den: 10, decimal: 0.1, decimalStr: "0,1", tab: { u: 0, di: 1, ce: null, mi: null } },
      { num: 5, den: 10, decimal: 0.5, decimalStr: "0,5", tab: { u: 0, di: 5, ce: null, mi: null } },
      { num: 4, den: 10, decimal: 0.4, decimalStr: "0,4", tab: { u: 0, di: 4, ce: null, mi: null } },
      { num: 6, den: 10, decimal: 0.6, decimalStr: "0,6", tab: { u: 0, di: 6, ce: null, mi: null } },
      { num: 2, den: 10, decimal: 0.2, decimalStr: "0,2", tab: { u: 0, di: 2, ce: null, mi: null } }
    ],

    /* ── Niveau 2 — /100 ── */
    lvl2: [
      { num: 37, den: 100, decimal: 0.37, decimalStr: "0,37", tab: { u: 0, di: 3, ce: 7, mi: null } },
      { num: 75, den: 100, decimal: 0.75, decimalStr: "0,75", tab: { u: 0, di: 7, ce: 5, mi: null } },
      { num: 40, den: 100, decimal: 0.4,  decimalStr: "0,40", tab: { u: 0, di: 4, ce: 0, mi: null } },
      { num:  8, den: 100, decimal: 0.08, decimalStr: "0,08", tab: { u: 0, di: 0, ce: 8, mi: null } },
      { num: 60, den: 100, decimal: 0.6,  decimalStr: "0,60", tab: { u: 0, di: 6, ce: 0, mi: null } },
      { num: 17, den: 100, decimal: 0.17, decimalStr: "0,17", tab: { u: 0, di: 1, ce: 7, mi: null } },
      { num: 50, den: 100, decimal: 0.5,  decimalStr: "0,50", tab: { u: 0, di: 5, ce: 0, mi: null } },
      { num: 91, den: 100, decimal: 0.91, decimalStr: "0,91", tab: { u: 0, di: 9, ce: 1, mi: null } }
    ],

    /* ── Niveau 3 — /1000 ── */
    lvl3: [
      { num:  125, den: 1000, decimal: 0.125, decimalStr: "0,125", tab: { u: 0, di: 1, ce: 2, mi: 5 } },
      { num:  450, den: 1000, decimal: 0.45,  decimalStr: "0,450", tab: { u: 0, di: 4, ce: 5, mi: 0 } },
      { num:  875, den: 1000, decimal: 0.875, decimalStr: "0,875", tab: { u: 0, di: 8, ce: 7, mi: 5 } },
      { num: 1234, den: 1000, decimal: 1.234, decimalStr: "1,234", tab: { u: 1, di: 2, ce: 3, mi: 4 } },
      { num:  500, den: 1000, decimal: 0.5,   decimalStr: "0,500", tab: { u: 0, di: 5, ce: 0, mi: 0 } },
      { num:  750, den: 1000, decimal: 0.75,  decimalStr: "0,750", tab: { u: 0, di: 7, ce: 5, mi: 0 } },
      { num: 2345, den: 1000, decimal: 2.345, decimalStr: "2,345", tab: { u: 2, di: 3, ce: 4, mi: 5 } },
      { num:   30, den: 1000, decimal: 0.03,  decimalStr: "0,030", tab: { u: 0, di: 0, ce: 3, mi: 0 } }
    ]
  }

});

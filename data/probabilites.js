/* ── data/probabilites.js — Probabilités (3 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "probabilite-chances": {
    title:      "Utiliser l'expression « a chances sur b »",
    domaine:    "Mathématiques",
    competence: "Probabilités — Exprimer une chance",
    type:       "probabilite-chances",
    levels:     ["niveau1", "niveau2", "niveau3"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "niveau1": "Billes et cubes dans un sac",
      "niveau2": "Pièce et dé équilibrés",
      "niveau3": "Urne de formes et jeu de cartes"
    },
    questionsPerSession: 6,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Banque provisoire — rendu via renderChoixEtiquette ───────────────
       Niveau 1 : Ex.1 sac de billes, Ex.2 boîte de cubes
       Niveau 2 : Ex.3 pièce équilibrée, Ex.4 dé équilibré
       Niveau 3 : Ex.5 urne de formes, Ex.6 jeu de 52 cartes
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Ex.1 — Sac de billes : 5 rouges, 3 bleues */
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 3 bleues. Quelle est la probabilité de tirer une bille rouge ?", emoji: "🔴🔴🔴🔴🔴🔵🔵🔵", word: "Bille rouge", choices: ["5 chances sur 8", "3 chances sur 8", "5 chances sur 3", "8 chances sur 5"], answer: "5 chances sur 8" },
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 3 bleues. Quelle est la probabilité de tirer une bille bleue ?", emoji: "🔴🔴🔴🔴🔴🔵🔵🔵", word: "Bille bleue", choices: ["3 chances sur 8", "5 chances sur 8", "3 chances sur 5", "8 chances sur 3"], answer: "3 chances sur 8" },
      /* Ex.2 — Boîte de cubes : 4 verts, 2 jaunes, 1 rouge */
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge. Quelle est la probabilité de tirer un cube vert ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube vert", choices: ["4 chances sur 7", "2 chances sur 7", "1 chance sur 7", "4 chances sur 3"], answer: "4 chances sur 7" },
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge. Quelle est la probabilité de tirer un cube jaune ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube jaune", choices: ["2 chances sur 7", "4 chances sur 7", "1 chance sur 7", "2 chances sur 5"], answer: "2 chances sur 7" },
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge. Quelle est la probabilité de tirer un cube rouge ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube rouge", choices: ["1 chance sur 7", "2 chances sur 7", "4 chances sur 7", "1 chance sur 6"], answer: "1 chance sur 7" },

      /* Ex.3 — Pièce équilibrée */
      { level: "niveau2", instruction: "Pièce équilibrée. Quelle est la probabilité d'obtenir Pile ?", emoji: "🪙", word: "Pile", choices: ["1 chance sur 2", "1 chance sur 4", "2 chances sur 2", "1 chance sur 3"], answer: "1 chance sur 2" },
      { level: "niveau2", instruction: "Pièce équilibrée. Quelle est la probabilité d'obtenir Face ?", emoji: "🪙", word: "Face", choices: ["1 chance sur 2", "1 chance sur 4", "2 chances sur 1", "1 chance sur 3"], answer: "1 chance sur 2" },
      /* Ex.4 — Dé équilibré */
      { level: "niveau2", instruction: "Dé équilibré. Quelle est la probabilité d'obtenir 2 ?", emoji: "🎲", word: "Obtenir 2", choices: ["1 chance sur 6", "2 chances sur 6", "1 chance sur 2", "6 chances sur 1"], answer: "1 chance sur 6" },
      { level: "niveau2", instruction: "Dé équilibré. Quelle est la probabilité de NE PAS obtenir 2 ?", emoji: "🎲", word: "Ne pas obtenir 2", choices: ["5 chances sur 6", "1 chance sur 6", "5 chances sur 1", "4 chances sur 6"], answer: "5 chances sur 6" },

      /* Ex.5 — Urne de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle */
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle. Quelle est la probabilité de tirer une étoile ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Étoile", choices: ["2 chances sur 10", "4 chances sur 10", "1 chance sur 10", "2 chances sur 8"], answer: "2 chances sur 10" },
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle. Quelle est la probabilité de tirer un cercle ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Cercle", choices: ["4 chances sur 10", "2 chances sur 10", "4 chances sur 6", "3 chances sur 10"], answer: "4 chances sur 10" },
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle. Quelle est la probabilité de tirer un carré ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Carré", choices: ["3 chances sur 10", "4 chances sur 10", "1 chance sur 10", "3 chances sur 7"], answer: "3 chances sur 10" },
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle. Quelle est la probabilité de tirer un triangle ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Triangle", choices: ["1 chance sur 10", "2 chances sur 10", "1 chance sur 9", "3 chances sur 10"], answer: "1 chance sur 10" },
      /* Ex.6 — Jeu de 52 cartes */
      { level: "niveau3", instruction: "Jeu de 52 cartes. Quelle est la probabilité de tirer une carte rouge ?", emoji: "🂡", word: "Carte rouge", choices: ["26 chances sur 52", "13 chances sur 52", "26 chances sur 26", "1 chance sur 52"], answer: "26 chances sur 52" },
      { level: "niveau3", instruction: "Jeu de 52 cartes. Quelle est la probabilité de tirer une carte qui n'est pas rouge ?", emoji: "🂡", word: "Carte pas rouge", choices: ["26 chances sur 52", "13 chances sur 52", "39 chances sur 52", "1 chance sur 26"], answer: "26 chances sur 52" }
    ]
  },

  "probabilite-issues": {
    title:      "Dénombrer les issues possibles et favorables",
    domaine:    "Mathématiques",
    competence: "Probabilités — Dénombrer les issues",
    type:       "probabilite-issues",
    levels:     ["niveau1", "niveau2", "niveau3"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "niveau1": "Lister les issues possibles",
      "niveau2": "Dénombrer les issues favorables",
      "niveau3": "Situations combinées"
    },
    questionsPerSession: 6,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Banque provisoire — rendu via renderClassificationEtapes ─────────
       step1 : clique les issues/éléments ciblés · step2 : dénombre-les
       Niveau 1 : Ex.1 dé (issues possibles), Ex.2 roue (possibles + favorables)
       Niveau 2 : Ex.3 dé (tableau pair/impair/6), Ex.4 urne (par couleur)
       Niveau 3 : Ex.5 boîte de formes, Ex.6 dé (multiples/≤5/impair)
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Ex.1 — Dé à six faces : lister toutes les issues possibles */
      { level: "niveau1", instruction: "Un dé à six faces.", sentence: "1 2 3 4 5 6 7 8", step1Instruction: "Clique toutes les issues possibles avec ce dé.", step1Targets: ["1", "2", "3", "4", "5", "6"], step2Instruction: "Combien d'issues possibles au total ?", classifyChoices: ["4", "6", "8"], step2Answer: "6" },
      /* Ex.2 — Roue : 6 secteurs noirs, 2 blancs */
      { level: "niveau1", instruction: "Une roue à 8 secteurs : 6 noirs, 2 blancs.", sentence: "Noir Noir Noir Noir Noir Noir Blanc Blanc", step1Instruction: "Clique tous les secteurs.", step1Targets: ["Noir", "Blanc"], step2Instruction: "Combien d'issues possibles au total ?", classifyChoices: ["6", "2", "8"], step2Answer: "8" },
      { level: "niveau1", instruction: "Une roue à 8 secteurs : 6 noirs, 2 blancs.", sentence: "Noir Noir Noir Noir Noir Noir Blanc Blanc", step1Instruction: "Clique tous les secteurs noirs.", step1Targets: ["Noir"], step2Instruction: "Combien d'issues favorables au noir ?", classifyChoices: ["2", "6", "8"], step2Answer: "6" },

      /* Ex.3 — Dé équilibré, tableau à compléter */
      { level: "niveau2", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique tous les nombres pairs.", step1Targets: ["2", "4", "6"], step2Instruction: "Combien d'issues favorables aux nombres pairs ?", classifyChoices: ["2", "3", "4"], step2Answer: "3" },
      { level: "niveau2", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique tous les nombres impairs.", step1Targets: ["1", "3", "5"], step2Instruction: "Combien d'issues favorables aux nombres impairs ?", classifyChoices: ["2", "3", "4"], step2Answer: "3" },
      { level: "niveau2", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique le nombre 6.", step1Targets: ["6"], step2Instruction: "Combien d'issues favorables à obtenir 6 ?", classifyChoices: ["1", "2", "6"], step2Answer: "1" },
      /* Ex.4 — Urne : 4 rouges, 2 jaunes, 5 bleues (total 11) */
      { level: "niveau2", instruction: "Urne : 4 rouges, 2 jaunes, 5 bleues.", sentence: "Rouge Rouge Rouge Rouge Jaune Jaune Bleue Bleue Bleue Bleue Bleue", step1Instruction: "Clique toutes les boules rouges.", step1Targets: ["Rouge"], step2Instruction: "Combien d'issues favorables au rouge ?", classifyChoices: ["2", "4", "5"], step2Answer: "4" },
      { level: "niveau2", instruction: "Urne : 4 rouges, 2 jaunes, 5 bleues.", sentence: "Rouge Rouge Rouge Rouge Jaune Jaune Bleue Bleue Bleue Bleue Bleue", step1Instruction: "Clique toutes les boules bleues.", step1Targets: ["Bleue"], step2Instruction: "Combien d'issues favorables au bleu ?", classifyChoices: ["4", "5", "11"], step2Answer: "5" },

      /* Ex.5 — Boîte de formes (reprise du modèle urne formes, compétence 1) */
      { level: "niveau3", instruction: "Boîte de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle.", sentence: "Étoile Étoile Cercle Cercle Cercle Cercle Carré Carré Carré Triangle", step1Instruction: "Clique toutes les étoiles.", step1Targets: ["Étoile"], step2Instruction: "Combien d'issues favorables à l'étoile ?", classifyChoices: ["1", "2", "4"], step2Answer: "2" },
      { level: "niveau3", instruction: "Boîte de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle.", sentence: "Étoile Étoile Cercle Cercle Cercle Cercle Carré Carré Carré Triangle", step1Instruction: "Clique tous les cercles.", step1Targets: ["Cercle"], step2Instruction: "Combien d'issues favorables au cercle ?", classifyChoices: ["3", "4", "10"], step2Answer: "4" },
      /* Ex.6 — Dé, tableau : multiples de 3, ≤ 5, impair */
      { level: "niveau3", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique tous les multiples de 3.", step1Targets: ["3", "6"], step2Instruction: "Combien d'issues favorables aux multiples de 3 ?", classifyChoices: ["1", "2", "3"], step2Answer: "2" },
      { level: "niveau3", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique tous les nombres inférieurs ou égaux à 5.", step1Targets: ["1", "2", "3", "4", "5"], step2Instruction: "Combien d'issues favorables aux nombres ≤ 5 ?", classifyChoices: ["4", "5", "6"], step2Answer: "5" }
    ]
  },

  "probabilite-nombre": {
    title:      "Exprimer la probabilité comme un nombre",
    domaine:    "Mathématiques",
    competence: "Probabilités — Écrire une probabilité",
    type:       "probabilite-nombre",
    levels:     ["niveau1", "niveau2", "niveau3"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "niveau1": "Placer des événements sur une échelle de 0 à 1",
      "niveau2": "Écrire une probabilité (fraction, décimal, pourcentage)",
      "niveau3": "Conversions et approche fréquentiste"
    },
    questionsPerSession: 6,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Banque provisoire — rendu via renderMotsCliquables. Le mot-clé
       "targets" est comparé à la valeur NETTOYÉE (voir cleaning regex du
       moteur) : éviter la virgule décimale dans un token cliquable
       (ex. "0,5" devient "05" après nettoyage) — utiliser une forme sans
       ponctuation ("zéro-virgule-cinq") comme ci-dessous.
       Niveau 1 : Ex.1+Ex.2 échelle 0–1 / vocabulaire de probabilité
       Niveau 2 : Ex.3 urne (3 écritures), Ex.4 dé (fractions)
       Niveau 3 : Ex.5 tableau de conversions, Ex.6 approche fréquentiste
       NOTE (à trancher lors du polish contenu, Lot 4) : l'exercice échelle
       0–1 gagnerait à devenir un composant dédié (glisser-déposer sur une
       droite graduée, cf. plan) plutôt que mots-cliquables — laissé en
       l'état ici pour ne pas construire un nouveau composant sans validation.
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Ex.1 + Ex.2 — Échelle 0 à 1 et vocabulaire (impossible / peu probable / une chance sur deux / probable / certain) */
      { level: "niveau1", instruction: "Clique le mot qui décrit la probabilité d'obtenir un 7 avec un dé normal.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] },
      { level: "niveau1", instruction: "Clique le mot qui décrit la probabilité d'obtenir un chiffre entre 1 et 6 avec ce dé.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["certain"] },
      { level: "niveau1", instruction: "On lance une pièce. Clique le mot qui décrit la probabilité d'obtenir Pile.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] },
      { level: "niveau1", instruction: "Clique le mot qui décrit la probabilité de gagner au loto avec un seul billet.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"] },
      { level: "niveau1", instruction: "Clique le mot qui décrit la probabilité d'obtenir dix fois de suite un 1 avec un dé.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"], note: "Très proche de zéro, mais pas mathématiquement impossible." },

      /* Ex.3 — Urne : 3 boules noires, 7 blanches → 3/10, 0,3, 30 % */
      { level: "niveau2", instruction: "Urne : 3 boules noires, 7 blanches. Clique toutes les écritures correctes de la probabilité de tirer une noire.", sentence: "3/10 zéro-virgule-trois 30% 3/7 70%", targets: ["3/10", "zéro-virgule-trois", "30%"] },
      /* Ex.4 — Dé : fractions */
      { level: "niveau2", instruction: "Dé équilibré. Clique la probabilité (en fraction) d'obtenir un multiple de 3.", sentence: "2/6 4/6 1/6 3/6", targets: ["2/6"] },
      { level: "niveau2", instruction: "Dé équilibré. Clique la probabilité (en fraction) d'obtenir un nombre supérieur à 2.", sentence: "2/6 4/6 1/6 3/6", targets: ["4/6"] },
      { level: "niveau2", instruction: "Dé équilibré. Clique la probabilité (en fraction) d'obtenir un nombre inférieur à 2.", sentence: "2/6 4/6 1/6 3/6", targets: ["1/6"] },

      /* Ex.5 — Tableau de conversions */
      { level: "niveau3", instruction: "Clique toutes les écritures équivalentes à un demi.", sentence: "1/2 zéro-virgule-cinq 50% 3/4 75%", targets: ["1/2", "zéro-virgule-cinq", "50%"] },
      { level: "niveau3", instruction: "Clique toutes les écritures équivalentes à trois quarts.", sentence: "1/2 zéro-virgule-cinq 50% 3/4 75%", targets: ["3/4", "75%"] },
      { level: "niveau3", instruction: "Clique toutes les écritures équivalentes à un dixième.", sentence: "1/10 zéro-virgule-un 10% 1/2 50%", targets: ["1/10", "zéro-virgule-un", "10%"] },
      /* Ex.6 — Approche fréquentiste (séries pré-générées) */
      { level: "niveau3", instruction: "Clique Pile à chaque fois qu'il apparaît dans cette série de 8 lancers.", sentence: "Pile Face Pile Pile Face Pile Face Face", targets: ["Pile"], note: "Sur 8 lancers, Pile est sorti 4 fois : fréquence 4 sur 8, soit 0,5 — proche de la probabilité théorique." },
      { level: "niveau3", instruction: "Clique Pile à chaque fois qu'il apparaît dans cette série de 10 lancers.", sentence: "Pile Pile Face Pile Face Face Pile Face Pile Face", targets: ["Pile"], note: "Sur 10 lancers, Pile est sorti 5 fois : fréquence 5 sur 10, soit 0,5." }
    ]
  }

});

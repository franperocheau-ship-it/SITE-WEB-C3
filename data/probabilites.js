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
    questionsPerSession: 8,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Banque provisoire — rendu via renderChoixEtiquette ───────────────
       Niveau 1 : Ex.1 sac de billes, Ex.2 boîte de cubes (comptage direct) +
                  Ex.3-6 comparaisons sans calcul exact (plus/moins/autant de
                  chances) + Ex.7-8 piège équiprobabilité (2 issues ≠ chances
                  égales, cf. programme CM1)
       Niveau 2 : Ex.9 pièce équilibrée, Ex.10 dé équilibré (nombres donnés) +
                  Ex.11-13 boîtes de jetons à dénombrer soi-même avant
                  d'exprimer "a chances sur b" (nombres non donnés dans l'énoncé)
       Niveau 3 : Ex.14 urne de formes, Ex.15 jeu de 52 cartes — items
                  demandant simultanément fraction/décimal/pourcentage (au
                  lieu du format "a chances sur b", cf. probabilite-nombre)
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Ex.1 — Sac de billes : 5 rouges, 3 bleues */
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 3 bleues.<br>Quelle est la probabilité de tirer une bille rouge ?", emoji: "🔴🔴🔴🔴🔴🔵🔵🔵", word: "Bille rouge", choices: ["5 chances sur 8", "3 chances sur 8", "5 chances sur 3", "8 chances sur 5"], answer: "5 chances sur 8" },
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 3 bleues.<br>Quelle est la probabilité de tirer une bille bleue ?", emoji: "🔴🔴🔴🔴🔴🔵🔵🔵", word: "Bille bleue", choices: ["3 chances sur 8", "5 chances sur 8", "3 chances sur 5", "8 chances sur 3"], answer: "3 chances sur 8" },
      /* Ex.2 — Boîte de cubes : 4 verts, 2 jaunes, 1 rouge */
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge.<br>Quelle est la probabilité de tirer un cube vert ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube vert", choices: ["4 chances sur 7", "2 chances sur 7", "1 chance sur 7", "4 chances sur 3"], answer: "4 chances sur 7" },
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge.<br>Quelle est la probabilité de tirer un cube jaune ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube jaune", choices: ["2 chances sur 7", "4 chances sur 7", "1 chance sur 7", "2 chances sur 5"], answer: "2 chances sur 7" },
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge.<br>Quelle est la probabilité de tirer un cube rouge ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube rouge", choices: ["1 chance sur 7", "2 chances sur 7", "4 chances sur 7", "1 chance sur 6"], answer: "1 chance sur 7" },
      /* Ex.3 — Comparaison sans calcul exact : sac 6 rouges / 2 bleues */
      { level: "niveau1", instruction: "Sac de billes : 6 rouges, 2 bleues.<br>A-t-on plus de chances de tirer une bille rouge, une bille bleue, ou est-ce autant de chances ?", emoji: "🔴🔴🔴🔴🔴🔴🔵🔵", word: "Rouge ou bleue ?", choices: ["Rouge", "Bleu", "Autant de chances"], answer: "Rouge", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "6 billes rouges contre 2 bleues : plus de chances de tirer rouge." },
      /* Ex.3bis — même sac, effectifs égaux */
      { level: "niveau1", instruction: "Sac de billes : 3 rouges, 3 bleues.<br>A-t-on plus de chances de tirer une bille rouge, une bille bleue, ou est-ce autant de chances ?", emoji: "🔴🔴🔴🔵🔵🔵", word: "Rouge ou bleue ?", choices: ["Rouge", "Bleu", "Autant de chances"], answer: "Autant de chances", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "3 billes rouges et 3 billes bleues : c'est un partage égal, donc autant de chances." },
      /* Ex.4 — Comparaison : boîte de jetons 2 verts / 6 jaunes */
      { level: "niveau1", instruction: "Boîte de jetons : 2 verts, 6 jaunes.<br>A-t-on plus de chances de tirer un jeton vert, un jeton jaune, ou est-ce autant de chances ?", emoji: "🟢🟢🟡🟡🟡🟡🟡🟡", word: "Vert ou jaune ?", choices: ["Vert", "Jaune", "Autant de chances"], answer: "Jaune", wrongFeedback: "Compare le nombre de jetons de chaque couleur.", hint: "6 jetons jaunes contre seulement 2 verts : plus de chances de tirer jaune." },
      /* Ex.5 — Comparaison : sac de billes en nombres égaux */
      { level: "niveau1", instruction: "Sac de billes : 4 rouges, 4 vertes.<br>A-t-on plus de chances de tirer une bille rouge, une bille verte, ou est-ce autant de chances ?", emoji: "🔴🔴🔴🔴🟢🟢🟢🟢", word: "Rouge ou vert ?", choices: ["Rouge", "Vert", "Autant de chances"], answer: "Autant de chances", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "4 billes rouges et 4 billes vertes : partage égal, donc autant de chances." },
      /* Ex.6 — Comparaison : sac de billes en nombres inégaux */
      { level: "niveau1", instruction: "Sac de billes : 5 oranges, 3 violettes.<br>A-t-on plus de chances de tirer une bille orange, une bille violette, ou est-ce autant de chances ?", emoji: "🟠🟠🟠🟠🟠🟣🟣🟣", word: "Orange ou violet ?", choices: ["Orange", "Violet", "Autant de chances"], answer: "Orange", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "5 billes oranges contre 3 violettes : plus de chances de tirer orange." },
      /* Ex.7 — Piège équiprobabilité : boîte 9 verts / 1 rouge */
      { level: "niveau1", instruction: "Boîte : 9 jetons verts, 1 jeton rouge.<br>Y a-t-il autant de chances de tirer un jeton vert que de tirer un jeton rouge ?", emoji: "🟢🟢🟢🟢🟢🟢🟢🟢🟢🔴", word: "Vert ou rouge ?", choices: ["Oui, autant de chances", "Non, plus de chances de tirer vert", "Non, plus de chances de tirer rouge"], answer: "Non, plus de chances de tirer vert", wrongFeedback: "Deux couleurs possibles ne veut pas dire deux chances égales.", hint: "⚠️ 9 jetons verts contre 1 seul rouge : beaucoup plus de chances de tirer vert." },
      /* Ex.8 — Piège équiprobabilité : boîte 1 noir / 9 blancs */
      { level: "niveau1", instruction: "Boîte : 1 jeton noir, 9 jetons blancs.<br>Y a-t-il autant de chances de tirer un jeton noir que de tirer un jeton blanc ?", emoji: "⚫⚪⚪⚪⚪⚪⚪⚪⚪⚪", word: "Noir ou blanc ?", choices: ["Oui, autant de chances", "Non, plus de chances de tirer blanc", "Non, plus de chances de tirer noir"], answer: "Non, plus de chances de tirer blanc", wrongFeedback: "Deux couleurs possibles ne veut pas dire deux chances égales.", hint: "⚠️ 9 jetons blancs contre 1 seul noir : beaucoup plus de chances de tirer blanc." },

      /* Ex.9 — Pièce équilibrée */
      { level: "niveau2", instruction: "Pièce équilibrée.<br>Quelle est la probabilité d'obtenir Pile ?", emoji: "🪙", word: "Pile", choices: ["1 chance sur 2", "1 chance sur 4", "2 chances sur 2", "1 chance sur 3"], answer: "1 chance sur 2" },
      { level: "niveau2", instruction: "Pièce équilibrée.<br>Quelle est la probabilité d'obtenir Face ?", emoji: "🪙", word: "Face", choices: ["1 chance sur 2", "1 chance sur 4", "2 chances sur 1", "1 chance sur 3"], answer: "1 chance sur 2" },
      /* Ex.10 — Dé équilibré */
      { level: "niveau2", instruction: "Dé équilibré.<br>Quelle est la probabilité d'obtenir 2 ?", emoji: "🎲", word: "Obtenir 2", choices: ["1 chance sur 6", "2 chances sur 6", "1 chance sur 2", "6 chances sur 1"], answer: "1 chance sur 6" },
      { level: "niveau2", instruction: "Dé équilibré.<br>Quelle est la probabilité de NE PAS obtenir 2 ?", emoji: "🎲", word: "Ne pas obtenir 2", choices: ["5 chances sur 6", "1 chance sur 6", "5 chances sur 1", "4 chances sur 6"], answer: "5 chances sur 6" },
      /* Ex.11 — Boîte de jetons à dénombrer soi-même : 3 noirs, 5 blancs (8 jetons) */
      { level: "niveau2", instruction: "Cette boîte a des jetons noirs et blancs.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton noir.", emoji: "⚫⚫⚫⚪⚪⚪⚪⚪", word: "Jeton noir", choices: ["3 chances sur 8", "5 chances sur 8", "3 chances sur 5", "8 chances sur 3"], answer: "3 chances sur 8" },
      { level: "niveau2", instruction: "Cette boîte a des jetons noirs et blancs.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton blanc.", emoji: "⚫⚫⚫⚪⚪⚪⚪⚪", word: "Jeton blanc", choices: ["5 chances sur 8", "3 chances sur 8", "5 chances sur 3", "8 chances sur 5"], answer: "5 chances sur 8" },
      /* Ex.12 — Boîte de jetons à dénombrer soi-même : 4 bleus, 2 jaunes (6 jetons) */
      { level: "niveau2", instruction: "Cette boîte a des jetons bleus et jaunes.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton bleu.", emoji: "🟦🟦🟦🟦🟨🟨", word: "Jeton bleu", choices: ["4 chances sur 6", "2 chances sur 6", "4 chances sur 2", "6 chances sur 4"], answer: "4 chances sur 6" },
      { level: "niveau2", instruction: "Cette boîte a des jetons bleus et jaunes.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton jaune.", emoji: "🟦🟦🟦🟦🟨🟨", word: "Jeton jaune", choices: ["2 chances sur 6", "4 chances sur 6", "2 chances sur 4", "6 chances sur 2"], answer: "2 chances sur 6" },
      /* Ex.13 — Boîte de jetons à dénombrer soi-même : 2 rouges, 4 verts, 3 violets (9 jetons) */
      { level: "niveau2", instruction: "Cette boîte a des jetons rouges, verts et violets.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton vert.", emoji: "🟥🟥🟩🟩🟩🟩🟪🟪🟪", word: "Jeton vert", choices: ["4 chances sur 9", "2 chances sur 9", "3 chances sur 9", "4 chances sur 5"], answer: "4 chances sur 9" },
      { level: "niveau2", instruction: "Cette boîte a des jetons rouges, verts et violets.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton violet.", emoji: "🟥🟥🟩🟩🟩🟩🟪🟪🟪", word: "Jeton violet", choices: ["3 chances sur 9", "4 chances sur 9", "2 chances sur 9", "3 chances sur 6"], answer: "3 chances sur 9" },

      /* Ex.14 — Urne de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle — fraction/décimal/pourcentage simultanés */
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer une étoile, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Étoile", choices: ["2/10 = 0,2 = 20%", "2/10 = 0,2 = 2%", "2/10 = 0,02 = 20%", "4/10 = 0,4 = 20%"], answer: "2/10 = 0,2 = 20%" },
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer un cercle, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Cercle", choices: ["4/10 = 0,4 = 40%", "4/10 = 0,4 = 4%", "4/10 = 0,04 = 40%", "3/10 = 0,4 = 40%"], answer: "4/10 = 0,4 = 40%" },
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer un carré, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Carré", choices: ["3/10 = 0,3 = 30%", "3/10 = 0,3 = 3%", "3/10 = 0,03 = 30%", "1/10 = 0,3 = 30%"], answer: "3/10 = 0,3 = 30%" },
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer un triangle, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Triangle", choices: ["1/10 = 0,1 = 10%", "1/10 = 0,1 = 1%", "1/10 = 0,01 = 10%", "2/10 = 0,1 = 10%"], answer: "1/10 = 0,1 = 10%" },
      /* Ex.15 — Jeu de 52 cartes — fraction/décimal/pourcentage simultanés */
      { level: "niveau3", instruction: "Jeu de 52 cartes, 26 rouges.<br>Quelle est la probabilité de tirer une carte rouge, en fraction, en décimal et en pourcentage ?", emoji: "🂡", word: "Carte rouge", choices: ["26/52 = 0,5 = 50%", "26/52 = 0,5 = 5%", "26/52 = 0,26 = 50%", "13/52 = 0,5 = 50%"], answer: "26/52 = 0,5 = 50%" },
      { level: "niveau3", instruction: "Jeu de 52 cartes, 13 trèfles.<br>Quelle est la probabilité de tirer un trèfle, en fraction, en décimal et en pourcentage ?", emoji: "🂡", word: "Trèfle", choices: ["13/52 = 0,25 = 25%", "13/52 = 0,25 = 2,5%", "13/52 = 0,13 = 25%", "26/52 = 0,25 = 25%"], answer: "13/52 = 0,25 = 25%" },
      /* Ex.16 — Urne de billes : 5 rouges sur 20 */
      { level: "niveau3", instruction: "Urne de 20 billes, 5 rouges.<br>Quelle est la probabilité de tirer une bille rouge, en fraction, en décimal et en pourcentage ?", emoji: "🔴", word: "Bille rouge", choices: ["5/20 = 0,25 = 25%", "5/20 = 0,25 = 250%", "5/20 = 0,4 = 25%", "5/20 = 0,25 = 2,5%"], answer: "5/20 = 0,25 = 25%" },
      /* Ex.17 — Urne de boules : 10 vertes sur 25 */
      { level: "niveau3", instruction: "Urne de 25 boules, 10 vertes.<br>Quelle est la probabilité de tirer une boule verte, en fraction, en décimal et en pourcentage ?", emoji: "🟢", word: "Boule verte", choices: ["10/25 = 0,4 = 40%", "10/25 = 0,4 = 4%", "10/25 = 0,04 = 40%", "15/25 = 0,4 = 40%"], answer: "10/25 = 0,4 = 40%" },
      /* Ex.18 — Sac de jetons : 8 rouges sur 50 */
      { level: "niveau3", instruction: "Sac de 50 jetons, 8 jetons rouges.<br>Quelle est la probabilité de tirer un jeton rouge, en fraction, en décimal et en pourcentage ?", emoji: "🔴", word: "Jeton rouge", choices: ["8/50 = 0,16 = 16%", "8/50 = 0,16 = 1,6%", "8/50 = 0,016 = 16%", "8/50 = 0,16 = 8%"], answer: "8/50 = 0,16 = 16%" },
      /* Ex.19 — Urne de billes : 6 bleues sur 40 */
      { level: "niveau3", instruction: "Urne de 40 billes, 6 bleues.<br>Quelle est la probabilité de tirer une bille bleue, en fraction, en décimal et en pourcentage ?", emoji: "🔵", word: "Bille bleue", choices: ["6/40 = 0,15 = 15%", "6/40 = 0,15 = 1,5%", "6/40 = 0,015 = 15%", "6/40 = 0,15 = 6%"], answer: "6/40 = 0,15 = 15%" }
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
    questionsPerSession: 8,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Banque provisoire — rendu via renderClassificationEtapes ─────────
       step1 : clique les issues/éléments ciblés · step2 : dénombre-les
       Niveau 1 : Ex.1 dé, Ex.2 sac de billes (possibles + favorables) + Ex.3
                  sac de billes inégal, Ex.4 cartes réduites à une couleur,
                  Ex.5 sac de billes, Ex.6 sac de billes inégal (contextes
                  supplémentaires)
       Niveau 2 : Ex.7 dé (tableau pair/impair/6), Ex.8 urne (par couleur) +
                  Ex.9 sac de billes à 10 billes, Ex.10 cartes 1-10, Ex.11
                  urne à 3 couleurs (contextes supplémentaires)
       Niveau 3 : Ex.12 boîte de formes, Ex.13 dé (multiples/≤5) + Ex.14-17
                  expériences à deux étapes indépendantes (dé + pièce, cf.
                  programme CM2) et Ex.18-19 indépendance des tirages (le dé/
                  la pièce "ne se souvient pas" du tirage précédent)
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Ex.1 — Dé à six faces : lister toutes les issues possibles */
      { level: "niveau1", instruction: "Un dé à six faces.", sentence: "1 2 3 4 5 6 7 8", step1Instruction: "Clique sur toutes les issues possibles avec ce dé.", step1Targets: ["1", "2", "3", "4", "5", "6"], step2Instruction: "Combien d'issues possibles au total ?", classifyChoices: ["4", "6", "8"], step2Answer: "6" },
      /* Ex.2 — Sac de billes : 6 noires, 2 blanches */
      { level: "niveau1", instruction: "Sac de billes : 6 noires, 2 blanches.", sentence: "Noir Noir Noir Noir Noir Noir Blanc Blanc", step1Instruction: "Clique sur toutes les billes.", step1Targets: ["Noir", "Blanc"], step2Instruction: "Combien d'issues possibles au total ?", classifyChoices: ["6", "2", "8"], step2Answer: "8" },
      { level: "niveau1", instruction: "Sac de billes : 6 noires, 2 blanches.", sentence: "Noir Noir Noir Noir Noir Noir Blanc Blanc", step1Instruction: "Clique sur toutes les billes noires.", step1Targets: ["Noir"], step2Instruction: "Combien d'issues favorables au noir ?", classifyChoices: ["2", "6", "8"], step2Answer: "6" },
      /* Ex.3 — Sac de billes en nombres inégaux : 2 rouges, 3 vertes */
      { level: "niveau1", instruction: "Sac de billes : 2 rouges, 3 vertes.", sentence: "Rouge Rouge Vert Vert Vert", step1Instruction: "Clique sur toutes les billes possibles.", step1Targets: ["Rouge", "Vert"], step2Instruction: "Combien de billes possibles au total ?", classifyChoices: ["3", "5", "2"], step2Answer: "5" },
      { level: "niveau1", instruction: "Sac de billes : 2 rouges, 3 vertes.", sentence: "Rouge Rouge Vert Vert Vert", step1Instruction: "Clique sur toutes les billes rouges.", step1Targets: ["Rouge"], step2Instruction: "Combien d'issues favorables au rouge ?", classifyChoices: ["2", "3", "5"], step2Answer: "2" },
      /* Ex.4 — Jeu de cartes réduit à une seule couleur (cœurs, de 1 à 7) */
      { level: "niveau1", instruction: "Un jeu de 7 cartes de cœur, numérotées de 1 à 7.", sentence: "1 2 3 4 5 6 7", step1Instruction: "Clique sur toutes les cartes possibles.", step1Targets: ["1", "2", "3", "4", "5", "6", "7"], step2Instruction: "Combien de cartes possibles au total ?", classifyChoices: ["6", "7", "8"], step2Answer: "7" },
      { level: "niveau1", instruction: "Un jeu de 7 cartes de cœur, numérotées de 1 à 7.", sentence: "1 2 3 4 5 6 7", step1Instruction: "Clique sur la carte 7.", step1Targets: ["7"], step2Instruction: "Combien d'issues favorables à tirer un 7 ?", classifyChoices: ["1", "2", "7"], step2Answer: "1" },
      /* Ex.5 — Sac de billes : 3 rouges, 2 bleues */
      { level: "niveau1", instruction: "Sac de billes : 3 rouges, 2 bleues.", sentence: "Rouge Rouge Rouge Bleue Bleue", step1Instruction: "Clique sur toutes les issues possibles.", step1Targets: ["Rouge", "Bleue"], step2Instruction: "Combien d'issues possibles au total ?", classifyChoices: ["2", "3", "5"], step2Answer: "5" },
      { level: "niveau1", instruction: "Sac de billes : 3 rouges, 2 bleues.", sentence: "Rouge Rouge Rouge Bleue Bleue", step1Instruction: "Clique sur toutes les billes bleues.", step1Targets: ["Bleue"], step2Instruction: "Combien d'issues favorables au bleu ?", classifyChoices: ["2", "3", "5"], step2Answer: "2" },
      /* Ex.6 — Sac de billes en nombres inégaux : 1 jaune, 3 violettes */
      { level: "niveau1", instruction: "Sac de billes : 1 jaune, 3 violettes.", sentence: "Jaune Violet Violet Violet", step1Instruction: "Clique sur toutes les billes violettes.", step1Targets: ["Violet"], step2Instruction: "Combien d'issues favorables au violet ?", classifyChoices: ["1", "3", "4"], step2Answer: "3" },
      /* Ex.6bis — Boîte de jetons : 5 verts, 3 jaunes */
      { level: "niveau1", instruction: "Boîte de jetons : 5 verts, 3 jaunes.", sentence: "Vert Vert Vert Vert Vert Jaune Jaune Jaune", step1Instruction: "Clique sur tous les jetons verts.", step1Targets: ["Vert"], step2Instruction: "Combien d'issues favorables au vert ?", classifyChoices: ["3", "5", "8"], step2Answer: "5" },
      /* Ex.6ter — Sac de billes en nombres égaux : 4 rouges, 4 bleues */
      { level: "niveau1", instruction: "Sac de billes : 4 rouges, 4 bleues.", sentence: "Rouge Rouge Rouge Rouge Bleu Bleu Bleu Bleu", step1Instruction: "Clique sur toutes les billes possibles.", step1Targets: ["Rouge", "Bleu"], step2Instruction: "Combien de billes possibles au total ?", classifyChoices: ["4", "8", "2"], step2Answer: "8" },

      /* Ex.7 — Dé équilibré, tableau à compléter */
      { level: "niveau2", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique sur tous les nombres pairs.", step1Targets: ["2", "4", "6"], step2Instruction: "Combien d'issues favorables aux nombres pairs ?", classifyChoices: ["2", "3", "4"], step2Answer: "3" },
      { level: "niveau2", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique sur tous les nombres impairs.", step1Targets: ["1", "3", "5"], step2Instruction: "Combien d'issues favorables aux nombres impairs ?", classifyChoices: ["2", "3", "4"], step2Answer: "3" },
      { level: "niveau2", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique sur le nombre 6.", step1Targets: ["6"], step2Instruction: "Combien d'issues favorables à obtenir 6 ?", classifyChoices: ["1", "2", "6"], step2Answer: "1" },
      /* Ex.8 — Urne : 4 rouges, 2 jaunes, 5 bleues (total 11) */
      { level: "niveau2", instruction: "Urne : 4 rouges, 2 jaunes, 5 bleues.", sentence: "Rouge Rouge Rouge Rouge Jaune Jaune Bleue Bleue Bleue Bleue Bleue", step1Instruction: "Clique sur toutes les boules rouges.", step1Targets: ["Rouge"], step2Instruction: "Combien d'issues favorables au rouge ?", classifyChoices: ["2", "4", "5"], step2Answer: "4" },
      { level: "niveau2", instruction: "Urne : 4 rouges, 2 jaunes, 5 bleues.", sentence: "Rouge Rouge Rouge Rouge Jaune Jaune Bleue Bleue Bleue Bleue Bleue", step1Instruction: "Clique sur toutes les boules bleues.", step1Targets: ["Bleue"], step2Instruction: "Combien d'issues favorables au bleu ?", classifyChoices: ["4", "5", "11"], step2Answer: "5" },
      /* Ex.9 — Sac de billes : 6 bleues, 4 oranges */
      { level: "niveau2", instruction: "Sac de billes : 6 bleues, 4 oranges.", sentence: "Bleu Bleu Bleu Bleu Bleu Bleu Orange Orange Orange Orange", step1Instruction: "Clique sur toutes les billes bleues.", step1Targets: ["Bleu"], step2Instruction: "Combien d'issues favorables au bleu ?", classifyChoices: ["4", "6", "10"], step2Answer: "6" },
      { level: "niveau2", instruction: "Sac de billes : 6 bleues, 4 oranges.", sentence: "Bleu Bleu Bleu Bleu Bleu Bleu Orange Orange Orange Orange", step1Instruction: "Clique sur toutes les billes oranges.", step1Targets: ["Orange"], step2Instruction: "Combien d'issues favorables à l'orange ?", classifyChoices: ["4", "6", "10"], step2Answer: "4" },
      /* Ex.10 — Jeu de cartes réduit à une seule couleur (piques, de 1 à 10) */
      { level: "niveau2", instruction: "Un jeu de 10 cartes de pique, numérotées de 1 à 10.", sentence: "1 2 3 4 5 6 7 8 9 10", step1Instruction: "Clique sur tous les nombres supérieurs à 7.", step1Targets: ["8", "9", "10"], step2Instruction: "Combien d'issues favorables aux nombres supérieurs à 7 ?", classifyChoices: ["2", "3", "4"], step2Answer: "3" },
      { level: "niveau2", instruction: "Un jeu de 10 cartes de pique, numérotées de 1 à 10.", sentence: "1 2 3 4 5 6 7 8 9 10", step1Instruction: "Clique sur tous les multiples de 5.", step1Targets: ["5", "10"], step2Instruction: "Combien d'issues favorables aux multiples de 5 ?", classifyChoices: ["1", "2", "3"], step2Answer: "2" },
      /* Ex.11 — Urne à 3 couleurs : 6 vertes, 3 jaunes, 1 rouge (total 10) */
      { level: "niveau2", instruction: "Urne : 6 vertes, 3 jaunes, 1 rouge.", sentence: "Verte Verte Verte Verte Verte Verte Jaune Jaune Jaune Rouge", step1Instruction: "Clique sur toutes les boules vertes.", step1Targets: ["Verte"], step2Instruction: "Combien d'issues favorables au vert ?", classifyChoices: ["3", "6", "10"], step2Answer: "6" },

      /* Ex.12 — Boîte de formes (reprise du modèle urne formes, compétence 1) */
      { level: "niveau3", instruction: "Boîte de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle.", sentence: "Étoile Étoile Cercle Cercle Cercle Cercle Carré Carré Carré Triangle", step1Instruction: "Clique sur toutes les étoiles.", step1Targets: ["Étoile"], step2Instruction: "Combien d'issues favorables à l'étoile ?", classifyChoices: ["1", "2", "4"], step2Answer: "2" },
      { level: "niveau3", instruction: "Boîte de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle.", sentence: "Étoile Étoile Cercle Cercle Cercle Cercle Carré Carré Carré Triangle", step1Instruction: "Clique sur tous les cercles.", step1Targets: ["Cercle"], step2Instruction: "Combien d'issues favorables au cercle ?", classifyChoices: ["3", "4", "10"], step2Answer: "4" },
      /* Ex.13 — Dé, tableau : multiples de 3, ≤ 5 */
      { level: "niveau3", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique sur tous les multiples de 3.", step1Targets: ["3", "6"], step2Instruction: "Combien d'issues favorables aux multiples de 3 ?", classifyChoices: ["1", "2", "3"], step2Answer: "2" },
      { level: "niveau3", instruction: "Un dé équilibré.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique sur tous les nombres inférieurs ou égaux à 5.", step1Targets: ["1", "2", "3", "4", "5"], step2Instruction: "Combien d'issues favorables aux nombres ≤ 5 ?", classifyChoices: ["4", "5", "6"], step2Answer: "5" },
      /* Ex.14 — Expérience à deux étapes indépendantes : dé + pièce (12 combinaisons dé-pièce) */
      { level: "niveau3", instruction: "On lance un dé, puis on lance une pièce. Voici les 12 combinaisons possibles (dé-pièce).", sentence: "1-Pile 1-Face 2-Pile 2-Face 3-Pile 3-Face 4-Pile 4-Face 5-Pile 5-Face 6-Pile 6-Face", step1Instruction: "Clique sur toutes les combinaisons qui donnent Pile.", step1Targets: ["1-Pile", "2-Pile", "3-Pile", "4-Pile", "5-Pile", "6-Pile"], step2Instruction: "Combien y a-t-il de combinaisons avec Pile ?", classifyChoices: ["6", "12", "2"], step2Answer: "6" },
      { level: "niveau3", instruction: "On lance un dé, puis on lance une pièce. Voici les 12 combinaisons possibles (dé-pièce).", sentence: "1-Pile 1-Face 2-Pile 2-Face 3-Pile 3-Face 4-Pile 4-Face 5-Pile 5-Face 6-Pile 6-Face", step1Instruction: "Clique sur toutes les combinaisons qui donnent Face.", step1Targets: ["1-Face", "2-Face", "3-Face", "4-Face", "5-Face", "6-Face"], step2Instruction: "Combien y a-t-il de combinaisons avec Face ?", classifyChoices: ["6", "12", "2"], step2Answer: "6" },
      { level: "niveau3", instruction: "On lance un dé, puis on lance une pièce. Voici les 12 combinaisons possibles (dé-pièce).", sentence: "1-Pile 1-Face 2-Pile 2-Face 3-Pile 3-Face 4-Pile 4-Face 5-Pile 5-Face 6-Pile 6-Face", step1Instruction: "Clique sur toutes les combinaisons possibles.", step1Targets: ["1-Pile", "1-Face", "2-Pile", "2-Face", "3-Pile", "3-Face", "4-Pile", "4-Face", "5-Pile", "5-Face", "6-Pile", "6-Face"], step2Instruction: "Combien y a-t-il de combinaisons possibles au total ?", classifyChoices: ["8", "12", "6"], step2Answer: "12" },
      { level: "niveau3", instruction: "On lance un dé, puis on lance une pièce. Voici les 12 combinaisons possibles (dé-pièce).", sentence: "1-Pile 1-Face 2-Pile 2-Face 3-Pile 3-Face 4-Pile 4-Face 5-Pile 5-Face 6-Pile 6-Face", step1Instruction: "Clique sur toutes les combinaisons où le dé donne un nombre pair.", step1Targets: ["2-Pile", "2-Face", "4-Pile", "4-Face", "6-Pile", "6-Face"], step2Instruction: "Combien y a-t-il de combinaisons avec un nombre pair au dé ?", classifyChoices: ["3", "6", "12"], step2Answer: "6" },
      /* Ex.15 — Indépendance des tirages : le dé ne se souvient pas du lancer précédent */
      { level: "niveau3", instruction: "Un dé vient de tomber sur 6. On le relance.", sentence: "1 2 3 4 5 6", step1Instruction: "Clique sur toutes les issues possibles pour ce nouveau lancer.", step1Targets: ["1", "2", "3", "4", "5", "6"], step2Instruction: "Quelle est la probabilité d'obtenir 6 à ce nouveau lancer ?", classifyChoices: ["1 chance sur 6", "Impossible, il vient de sortir", "Certain, il va se répéter"], step2Answer: "1 chance sur 6", rewriteSentence: "Le dé ne se souvient pas du lancer précédent : chaque lancer est indépendant." },
      /* Ex.16 — Indépendance des tirages : la pièce ne se souvient pas des lancers précédents */
      { level: "niveau3", instruction: "Une pièce vient de tomber 3 fois de suite sur Pile. On la relance.", sentence: "Pile Face", step1Instruction: "Clique sur toutes les issues possibles pour ce nouveau lancer.", step1Targets: ["Pile", "Face"], step2Instruction: "Quelle est la probabilité d'obtenir Pile à ce nouveau lancer ?", classifyChoices: ["1 chance sur 2", "Impossible, Pile est déjà sorti 3 fois", "Certain, ça va changer"], step2Answer: "1 chance sur 2", rewriteSentence: "La pièce ne se souvient pas des lancers précédents : la probabilité reste 1 chance sur 2 à chaque lancer." }
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
    questionsPerSession: 8,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Banque provisoire — rendu via renderMotsCliquables. Le mot-clé
       "targets" est comparé à la valeur NETTOYÉE (voir cleaning regex du
       moteur) : éviter la virgule décimale dans un token cliquable
       (ex. "0,5" devient "05" après nettoyage) — utiliser une forme sans
       ponctuation ("zéro-virgule-cinq") comme ci-dessous.
       Niveau 1 : Ex.1+Ex.2 échelle 0–1 / vocabulaire de probabilité + Ex.3-9
                  contextes supplémentaires (billes, jetons, cartes), mêmes
                  situations que probabilite-chances niveau 1
       Niveau 2 : Ex.10 urne (3 écritures), Ex.11 dé (fractions) + Ex.12-17
                  situations où l'élève doit calculer lui-même la fraction
                  avant de cliquer les écritures équivalentes (nombres non
                  donnés tout faits dans l'énoncé)
       Niveau 3 : Ex.18 tableau de conversions, Ex.19 approche fréquentiste
                  (comptage d'une série) + Ex.20-27 comparaison explicite
                  fréquence observée / probabilité théorique (esprit 6e)
       NOTE (à trancher lors du polish contenu, Lot 4) : l'exercice échelle
       0–1 gagnerait à devenir un composant dédié (glisser-déposer sur une
       droite graduée, cf. plan) plutôt que mots-cliquables — laissé en
       l'état ici pour ne pas construire un nouveau composant sans validation.
    ────────────────────────────────────────────────────────────────────── */
    bank: [
      /* Ex.1 + Ex.2 — Échelle 0 à 1 et vocabulaire (impossible / peu probable / une chance sur deux / probable / certain) */
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité d'obtenir un 7 avec un dé normal.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] },
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité d'obtenir un chiffre entre 1 et 6 avec ce dé.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["certain"] },
      { level: "niveau1", instruction: "On lance une pièce.<br>Clique sur le mot qui décrit la probabilité d'obtenir Pile.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] },
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité de gagner au loto avec un seul billet.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"] },
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité d'obtenir dix fois de suite un 1 avec un dé.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"], note: "Très proche de zéro, mais pas mathématiquement impossible." },
      /* Ex.3 — Sac de billes toutes rouges : tirer une bleue est impossible */
      { level: "niveau1", instruction: "Sac de billes : elles sont toutes rouges.<br>Clique sur le mot qui décrit la probabilité de tirer une bille bleue.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] },
      /* Ex.4 — Sac 8 rouges, 2 bleues : tirer une rouge est probable (sans être certain) */
      { level: "niveau1", instruction: "Sac de billes : 8 rouges, 2 bleues.<br>Clique sur le mot qui décrit la probabilité de tirer une bille rouge.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["probable"] },
      /* Ex.5 — Boîte 1 jeton noir, 1 jeton blanc : équiprobable */
      { level: "niveau1", instruction: "Boîte de jetons : 1 noir, 1 blanc.<br>Clique sur le mot qui décrit la probabilité de tirer le jeton noir.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] },
      /* Ex.6 — Boîte de jetons : 9 verts, 1 rouge : tirer rouge est peu probable */
      { level: "niveau1", instruction: "Boîte de jetons : 9 verts, 1 rouge.<br>Clique sur le mot qui décrit la probabilité de tirer le jeton rouge.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"] },
      /* Ex.7 — Tirer une carte parmi 52 : certain de tirer une carte */
      { level: "niveau1", instruction: "On tire une carte dans un jeu de 52 cartes.<br>Clique sur le mot qui décrit la probabilité de tirer une carte (n'importe laquelle).", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["certain"] },
      /* Ex.8 — Sac 5 rouges, 5 bleues : équiprobable */
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 5 bleues.<br>Clique sur le mot qui décrit la probabilité de tirer une bille rouge.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] },
      /* Ex.9 — Boîte 10 jetons tous jaunes : tirer un jeton vert est impossible */
      { level: "niveau1", instruction: "Boîte de jetons : 10 jetons, tous jaunes.<br>Clique sur le mot qui décrit la probabilité de tirer un jeton vert.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] },

      /* Ex.10 — Urne : 3 boules noires, 7 blanches → 3/10, 0,3, 30 % */
      { level: "niveau2", instruction: "Urne : 3 boules noires, 7 blanches.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une noire.", sentence: "3/10 zéro-virgule-trois 30% 3/7 70%", targets: ["3/10", "zéro-virgule-trois", "30%"] },
      /* Ex.11 — Dé : fractions */
      { level: "niveau2", instruction: "Dé équilibré.<br>Clique sur la probabilité (en fraction) d'obtenir un multiple de 3.", sentence: "2/6 4/6 1/6 3/6", targets: ["2/6"] },
      { level: "niveau2", instruction: "Dé équilibré.<br>Clique sur la probabilité (en fraction) d'obtenir un nombre supérieur à 2.", sentence: "2/6 4/6 1/6 3/6", targets: ["4/6"] },
      { level: "niveau2", instruction: "Dé équilibré.<br>Clique sur la probabilité (en fraction) d'obtenir un nombre inférieur à 2.", sentence: "2/6 4/6 1/6 3/6", targets: ["1/6"] },
      /* Ex.12 — Calcul à faire soi-même : urne 4 vertes / 16 jaunes (total 20) → 4/20 = 0,2 = 20% */
      { level: "niveau2", instruction: "Urne : 4 boules vertes, 16 boules jaunes.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une verte.", sentence: "4/20 zéro-virgule-deux 20% 1/4 25%", targets: ["4/20", "zéro-virgule-deux", "20%"] },
      /* Ex.13 — Sac 6 rouges / 14 bleues (total 20) → 6/20 = 0,3 = 30% */
      { level: "niveau2", instruction: "Sac : 6 billes rouges, 14 billes bleues.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une bille rouge.", sentence: "6/20 zéro-virgule-trois 30% 6/14 43%", targets: ["6/20", "zéro-virgule-trois", "30%"] },
      /* Ex.14 — Boîte 12 jaunes / 8 verts (total 20) → 8/20 = 0,4 = 40% */
      { level: "niveau2", instruction: "Boîte : 12 jetons jaunes, 8 jetons verts.<br>Clique sur toutes les écritures correctes de la probabilité de tirer un jeton vert.", sentence: "8/20 zéro-virgule-quatre 40% 8/12 67%", targets: ["8/20", "zéro-virgule-quatre", "40%"] },
      /* Ex.15 — Urne 9 blanches / 1 noire (total 10) → 1/10 = 0,1 = 10% */
      { level: "niveau2", instruction: "Urne : 9 boules blanches, 1 boule noire.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une boule noire.", sentence: "1/10 zéro-virgule-un 10% 1/9 11%", targets: ["1/10", "zéro-virgule-un", "10%"] },
      /* Ex.16 — Sac 45 vertes / 5 oranges (total 50) → 5/50 = 0,1 = 10% */
      { level: "niveau2", instruction: "Sac : 45 billes vertes, 5 billes oranges.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une bille orange.", sentence: "5/50 zéro-virgule-un 10% 5/45 11%", targets: ["5/50", "zéro-virgule-un", "10%"] },
      /* Ex.17 — Urne 7 rouges / 3 noires (total 10) → 3/10 = 0,3 = 30% */
      { level: "niveau2", instruction: "Urne : 7 boules rouges, 3 boules noires.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une boule noire.", sentence: "3/10 zéro-virgule-trois 30% 3/7 43%", targets: ["3/10", "zéro-virgule-trois", "30%"] },

      /* Ex.18 — Tableau de conversions */
      { level: "niveau3", instruction: "Clique sur toutes les écritures équivalentes à un demi.", sentence: "1/2 zéro-virgule-cinq 50% 3/4 75%", targets: ["1/2", "zéro-virgule-cinq", "50%"] },
      { level: "niveau3", instruction: "Clique sur toutes les écritures équivalentes à trois quarts.", sentence: "1/2 zéro-virgule-cinq 50% 3/4 75%", targets: ["3/4", "75%"] },
      { level: "niveau3", instruction: "Clique sur toutes les écritures équivalentes à un dixième.", sentence: "1/10 zéro-virgule-un 10% 1/2 50%", targets: ["1/10", "zéro-virgule-un", "10%"] },
      /* Ex.19 — Approche fréquentiste (séries pré-générées) */
      { level: "niveau3", instruction: "Clique sur Pile à chaque fois qu'il apparaît dans cette série de 8 lancers.", sentence: "Pile Face Pile Pile Face Pile Face Face", targets: ["Pile"], note: "Sur 8 lancers, Pile est sorti 4 fois : fréquence 4 sur 8, soit 0,5 — proche de la probabilité théorique." },
      { level: "niveau3", instruction: "Clique sur Pile à chaque fois qu'il apparaît dans cette série de 10 lancers.", sentence: "Pile Pile Face Pile Face Face Pile Face Pile Face", targets: ["Pile"], note: "Sur 10 lancers, Pile est sorti 5 fois : fréquence 5 sur 10, soit 0,5." },
      /* Ex.20-27 — Comparaison fréquence observée / probabilité théorique (esprit 6e) */
      { level: "niveau3", instruction: "On lance 200 fois une pièce. Face sort 104 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "104 sur 200, c'est une fréquence de 0,52 — très proche de 0,5 (la probabilité théorique)." },
      { level: "niveau3", instruction: "On lance 200 fois une pièce. Face sort 40 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Éloignée"], note: "40 sur 200, c'est une fréquence de 0,2 — très éloignée de 0,5 : la pièce est peut-être truquée." },
      { level: "niveau3", instruction: "On lance un dé 60 fois. Le 6 sort 11 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 6) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "11 sur 60 ≈ 0,18 — proche de 1/6 ≈ 0,17 (la probabilité théorique)." },
      { level: "niveau3", instruction: "On lance un dé 60 fois. Le 6 sort 2 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 6) ?", sentence: "Proche Éloignée", targets: ["Éloignée"], note: "2 sur 60 ≈ 0,03 — très éloignée de 1/6 ≈ 0,17 : le dé est peut-être truqué." },
      { level: "niveau3", instruction: "On tire 100 fois une bille dans une urne (5 rouges, 5 bleues), en la remettant à chaque fois. La bille rouge sort 48 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "48 sur 100, c'est une fréquence de 0,48 — très proche de 0,5 (la probabilité théorique)." },
      { level: "niveau3", instruction: "On tire 100 fois une bille dans la même urne (5 rouges, 5 bleues), en la remettant à chaque fois. La bille rouge sort 12 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Éloignée"], note: "12 sur 100, c'est une fréquence de 0,12 — très éloignée de 0,5 : résultat surprenant pour une urne équilibrée." },
      { level: "niveau3", instruction: "On lance 500 fois une pièce. Pile sort 251 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "251 sur 500, c'est une fréquence de 0,502 — très proche de 0,5 (la probabilité théorique)." },
      { level: "niveau3", instruction: "On tire 90 fois une bille dans un sac à 3 couleurs en nombres égaux (rouge, vert, bleu), en la remettant à chaque fois. La bille rouge sort 29 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 3) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "29 sur 90 ≈ 0,32 — proche de 1/3 ≈ 0,33 (la probabilité théorique)." }
    ]
  }

});

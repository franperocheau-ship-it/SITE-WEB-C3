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
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 3 bleues.<br>Quelle est la probabilité de tirer une bille rouge ?", emoji: "🔴🔴🔴🔴🔴🔵🔵🔵", word: "Bille rouge", choices: ["5 chances sur 8", "3 chances sur 8", "5 chances sur 3", "8 chances sur 5"], answer: "5 chances sur 8" , highlightTerms: ["Sac de billes : 5 rouges, 3 bleues", "tirer une bille rouge", "Bille rouge"]},
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 3 bleues.<br>Quelle est la probabilité de tirer une bille bleue ?", emoji: "🔴🔴🔴🔴🔴🔵🔵🔵", word: "Bille bleue", choices: ["3 chances sur 8", "5 chances sur 8", "3 chances sur 5", "8 chances sur 3"], answer: "3 chances sur 8" , highlightTerms: ["Sac de billes : 5 rouges, 3 bleues", "tirer une bille bleue", "Bille bleue"]},
      /* Ex.2 — Boîte de cubes : 4 verts, 2 jaunes, 1 rouge */
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge.<br>Quelle est la probabilité de tirer un cube vert ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube vert", choices: ["4 chances sur 7", "2 chances sur 7", "1 chance sur 7", "4 chances sur 3"], answer: "4 chances sur 7" , highlightTerms: ["Boîte de cubes : 4 verts, 2 jaunes, 1 rouge", "tirer un cube vert", "Cube vert"]},
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge.<br>Quelle est la probabilité de tirer un cube jaune ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube jaune", choices: ["2 chances sur 7", "4 chances sur 7", "1 chance sur 7", "2 chances sur 5"], answer: "2 chances sur 7" , highlightTerms: ["Boîte de cubes : 4 verts, 2 jaunes, 1 rouge", "tirer un cube jaune", "Cube jaune"]},
      { level: "niveau1", instruction: "Boîte de cubes : 4 verts, 2 jaunes, 1 rouge.<br>Quelle est la probabilité de tirer un cube rouge ?", emoji: "🟩🟩🟩🟩🟨🟨🟥", word: "Cube rouge", choices: ["1 chance sur 7", "2 chances sur 7", "4 chances sur 7", "1 chance sur 6"], answer: "1 chance sur 7" , highlightTerms: ["Boîte de cubes : 4 verts, 2 jaunes, 1 rouge", "tirer un cube rouge", "Cube rouge"]},
      /* Ex.3 — Comparaison sans calcul exact : sac 6 rouges / 2 bleues */
      { level: "niveau1", instruction: "Sac de billes : 6 rouges, 2 bleues.<br>A-t-on plus de chances de tirer une bille rouge, une bille bleue, ou est-ce autant de chances ?", emoji: "🔴🔴🔴🔴🔴🔴🔵🔵", word: "Rouge ou bleue ?", choices: ["Rouge", "Bleu", "Autant de chances"], answer: "Rouge", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "6 billes rouges contre 2 bleues : plus de chances de tirer rouge." , highlightTerms: ["Sac de billes : 6 rouges, 2 bleues", "Rouge ou bleue ?"]},
      /* Ex.3bis — même sac, effectifs égaux */
      { level: "niveau1", instruction: "Sac de billes : 3 rouges, 3 bleues.<br>A-t-on plus de chances de tirer une bille rouge, une bille bleue, ou est-ce autant de chances ?", emoji: "🔴🔴🔴🔵🔵🔵", word: "Rouge ou bleue ?", choices: ["Rouge", "Bleu", "Autant de chances"], answer: "Autant de chances", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "3 billes rouges et 3 billes bleues : c'est un partage égal, donc autant de chances." , highlightTerms: ["Sac de billes : 3 rouges, 3 bleues", "Rouge ou bleue ?"]},
      /* Ex.4 — Comparaison : boîte de jetons 2 verts / 6 jaunes */
      { level: "niveau1", instruction: "Boîte de jetons : 2 verts, 6 jaunes.<br>A-t-on plus de chances de tirer un jeton vert, un jeton jaune, ou est-ce autant de chances ?", emoji: "🟢🟢🟡🟡🟡🟡🟡🟡", word: "Vert ou jaune ?", choices: ["Vert", "Jaune", "Autant de chances"], answer: "Jaune", wrongFeedback: "Compare le nombre de jetons de chaque couleur.", hint: "6 jetons jaunes contre seulement 2 verts : plus de chances de tirer jaune." , highlightTerms: ["Boîte de jetons : 2 verts, 6 jaunes", "Vert ou jaune ?"]},
      /* Ex.5 — Comparaison : sac de billes en nombres égaux */
      { level: "niveau1", instruction: "Sac de billes : 4 rouges, 4 vertes.<br>A-t-on plus de chances de tirer une bille rouge, une bille verte, ou est-ce autant de chances ?", emoji: "🔴🔴🔴🔴🟢🟢🟢🟢", word: "Rouge ou vert ?", choices: ["Rouge", "Vert", "Autant de chances"], answer: "Autant de chances", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "4 billes rouges et 4 billes vertes : partage égal, donc autant de chances." , highlightTerms: ["Sac de billes : 4 rouges, 4 vertes", "Rouge ou vert ?"]},
      /* Ex.6 — Comparaison : sac de billes en nombres inégaux */
      { level: "niveau1", instruction: "Sac de billes : 5 oranges, 3 violettes.<br>A-t-on plus de chances de tirer une bille orange, une bille violette, ou est-ce autant de chances ?", emoji: "🟠🟠🟠🟠🟠🟣🟣🟣", word: "Orange ou violet ?", choices: ["Orange", "Violet", "Autant de chances"], answer: "Orange", wrongFeedback: "Compare le nombre de billes de chaque couleur.", hint: "5 billes oranges contre 3 violettes : plus de chances de tirer orange." , highlightTerms: ["Sac de billes : 5 oranges, 3 violettes", "Orange ou violet ?"]},
      /* Ex.7 — Piège équiprobabilité : boîte 9 verts / 1 rouge */
      { level: "niveau1", instruction: "Boîte : 9 jetons verts, 1 jeton rouge.<br>Y a-t-il autant de chances de tirer un jeton vert que de tirer un jeton rouge ?", emoji: "🟢🟢🟢🟢🟢🟢🟢🟢🟢🔴", word: "Vert ou rouge ?", choices: ["Oui, autant de chances", "Non, plus de chances de tirer vert", "Non, plus de chances de tirer rouge"], answer: "Non, plus de chances de tirer vert", wrongFeedback: "Deux couleurs possibles ne veut pas dire deux chances égales.", hint: "⚠️ 9 jetons verts contre 1 seul rouge : beaucoup plus de chances de tirer vert." , highlightTerms: ["Boîte : 9 jetons verts, 1 jeton rouge", "Vert ou rouge ?"]},
      /* Ex.8 — Piège équiprobabilité : boîte 1 noir / 9 blancs */
      { level: "niveau1", instruction: "Boîte : 1 jeton noir, 9 jetons blancs.<br>Y a-t-il autant de chances de tirer un jeton noir que de tirer un jeton blanc ?", emoji: "⚫⚪⚪⚪⚪⚪⚪⚪⚪⚪", word: "Noir ou blanc ?", choices: ["Oui, autant de chances", "Non, plus de chances de tirer blanc", "Non, plus de chances de tirer noir"], answer: "Non, plus de chances de tirer blanc", wrongFeedback: "Deux couleurs possibles ne veut pas dire deux chances égales.", hint: "⚠️ 9 jetons blancs contre 1 seul noir : beaucoup plus de chances de tirer blanc." , highlightTerms: ["Boîte : 1 jeton noir, 9 jetons blancs", "Noir ou blanc ?"]},

      /* Ex.9 — Pièce équilibrée */
      { level: "niveau2", instruction: "Pièce équilibrée.<br>Quelle est la probabilité d'obtenir Pile ?", emoji: "🪙", word: "Pile", choices: ["1 chance sur 2", "1 chance sur 4", "2 chances sur 2", "1 chance sur 3"], answer: "1 chance sur 2" , highlightTerms: ["Pièce équilibrée", "obtenir Pile", "Pile"]},
      { level: "niveau2", instruction: "Pièce équilibrée.<br>Quelle est la probabilité d'obtenir Face ?", emoji: "🪙", word: "Face", choices: ["1 chance sur 2", "1 chance sur 4", "2 chances sur 1", "1 chance sur 3"], answer: "1 chance sur 2" , highlightTerms: ["Pièce équilibrée", "obtenir Face", "Face"]},
      /* Ex.10 — Dé équilibré */
      { level: "niveau2", instruction: "Dé équilibré.<br>Quelle est la probabilité d'obtenir 2 ?", emoji: "🎲", word: "Obtenir 2", choices: ["1 chance sur 6", "2 chances sur 6", "1 chance sur 2", "6 chances sur 1"], answer: "1 chance sur 6" , highlightTerms: ["Dé équilibré", "obtenir 2", "Obtenir 2"]},
      { level: "niveau2", instruction: "Dé équilibré.<br>Quelle est la probabilité de NE PAS obtenir 2 ?", emoji: "🎲", word: "Ne pas obtenir 2", choices: ["5 chances sur 6", "1 chance sur 6", "5 chances sur 1", "4 chances sur 6"], answer: "5 chances sur 6" , highlightTerms: ["Dé équilibré", "NE PAS obtenir 2", "Ne pas obtenir 2"]},
      /* Ex.11 — Boîte de jetons à dénombrer soi-même : 3 noirs, 5 blancs (8 jetons) */
      { level: "niveau2", instruction: "Cette boîte a des jetons noirs et blancs.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton noir.", emoji: "⚫⚫⚫⚪⚪⚪⚪⚪", word: "Jeton noir", choices: ["3 chances sur 8", "5 chances sur 8", "3 chances sur 5", "8 chances sur 3"], answer: "3 chances sur 8" , highlightTerms: ["Cette boîte a des jetons noirs et blancs", "tirer un jeton noir", "Jeton noir"]},
      { level: "niveau2", instruction: "Cette boîte a des jetons noirs et blancs.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton blanc.", emoji: "⚫⚫⚫⚪⚪⚪⚪⚪", word: "Jeton blanc", choices: ["5 chances sur 8", "3 chances sur 8", "5 chances sur 3", "8 chances sur 5"], answer: "5 chances sur 8" , highlightTerms: ["Cette boîte a des jetons noirs et blancs", "tirer un jeton blanc", "Jeton blanc"]},
      /* Ex.12 — Boîte de jetons à dénombrer soi-même : 4 bleus, 2 jaunes (6 jetons) */
      { level: "niveau2", instruction: "Cette boîte a des jetons bleus et jaunes.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton bleu.", emoji: "🟦🟦🟦🟦🟨🟨", word: "Jeton bleu", choices: ["4 chances sur 6", "2 chances sur 6", "4 chances sur 2", "6 chances sur 4"], answer: "4 chances sur 6" , highlightTerms: ["Cette boîte a des jetons bleus et jaunes", "tirer un jeton bleu", "Jeton bleu"]},
      { level: "niveau2", instruction: "Cette boîte a des jetons bleus et jaunes.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton jaune.", emoji: "🟦🟦🟦🟦🟨🟨", word: "Jeton jaune", choices: ["2 chances sur 6", "4 chances sur 6", "2 chances sur 4", "6 chances sur 2"], answer: "2 chances sur 6" , highlightTerms: ["Cette boîte a des jetons bleus et jaunes", "tirer un jeton jaune", "Jeton jaune"]},
      /* Ex.13 — Boîte de jetons à dénombrer soi-même : 2 rouges, 4 verts, 3 violets (9 jetons) */
      { level: "niveau2", instruction: "Cette boîte a des jetons rouges, verts et violets.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton vert.", emoji: "🟥🟥🟩🟩🟩🟩🟪🟪🟪", word: "Jeton vert", choices: ["4 chances sur 9", "2 chances sur 9", "3 chances sur 9", "4 chances sur 5"], answer: "4 chances sur 9" , highlightTerms: ["Cette boîte a des jetons rouges, verts et violets", "tirer un jeton vert", "Jeton vert"]},
      { level: "niveau2", instruction: "Cette boîte a des jetons rouges, verts et violets.<br>Compte-les toi-même, puis donne la probabilité de tirer un jeton violet.", emoji: "🟥🟥🟩🟩🟩🟩🟪🟪🟪", word: "Jeton violet", choices: ["3 chances sur 9", "4 chances sur 9", "2 chances sur 9", "3 chances sur 6"], answer: "3 chances sur 9" , highlightTerms: ["Cette boîte a des jetons rouges, verts et violets", "tirer un jeton violet", "Jeton violet"]},

      /* Ex.14 — Urne de formes : 2 étoiles, 4 cercles, 3 carrés, 1 triangle — fraction/décimal/pourcentage simultanés */
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer une étoile, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Étoile", choices: ["2/10 = 0,2 = 20%", "2/10 = 0,2 = 2%", "2/10 = 0,02 = 20%", "4/10 = 0,4 = 20%"], answer: "2/10 = 0,2 = 20%" , highlightTerms: ["Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes)", "tirer une étoile", "Étoile"]},
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer un cercle, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Cercle", choices: ["4/10 = 0,4 = 40%", "4/10 = 0,4 = 4%", "4/10 = 0,04 = 40%", "3/10 = 0,4 = 40%"], answer: "4/10 = 0,4 = 40%" , highlightTerms: ["Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes)", "tirer un cercle", "Cercle"]},
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer un carré, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Carré", choices: ["3/10 = 0,3 = 30%", "3/10 = 0,3 = 3%", "3/10 = 0,03 = 30%", "1/10 = 0,3 = 30%"], answer: "3/10 = 0,3 = 30%" , highlightTerms: ["Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes)", "tirer un carré", "Carré"]},
      { level: "niveau3", instruction: "Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes).<br>Quelle est la probabilité de tirer un triangle, en fraction, en décimal et en pourcentage ?", emoji: "⭐⭐⚪⚪⚪⚪🟦🟦🟦🔺", word: "Triangle", choices: ["1/10 = 0,1 = 10%", "1/10 = 0,1 = 1%", "1/10 = 0,01 = 10%", "2/10 = 0,1 = 10%"], answer: "1/10 = 0,1 = 10%" , highlightTerms: ["Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle (10 formes)", "tirer un triangle", "Triangle"]},
      /* Ex.15 — Jeu de 52 cartes — fraction/décimal/pourcentage simultanés */
      { level: "niveau3", instruction: "Jeu de 52 cartes, 26 rouges.<br>Quelle est la probabilité de tirer une carte rouge, en fraction, en décimal et en pourcentage ?", emoji: "🂡", word: "Carte rouge", choices: ["26/52 = 0,5 = 50%", "26/52 = 0,5 = 5%", "26/52 = 0,26 = 50%", "13/52 = 0,5 = 50%"], answer: "26/52 = 0,5 = 50%" , highlightTerms: ["Jeu de 52 cartes, 26 rouges", "tirer une carte rouge", "Carte rouge"]},
      { level: "niveau3", instruction: "Jeu de 52 cartes, 13 trèfles.<br>Quelle est la probabilité de tirer un trèfle, en fraction, en décimal et en pourcentage ?", emoji: "🂡", word: "Trèfle", choices: ["13/52 = 0,25 = 25%", "13/52 = 0,25 = 2,5%", "13/52 = 0,13 = 25%", "26/52 = 0,25 = 25%"], answer: "13/52 = 0,25 = 25%" , highlightTerms: ["Jeu de 52 cartes, 13 trèfles", "tirer un trèfle", "Trèfle"]},
      /* Ex.16 — Urne de billes : 5 rouges sur 20 */
      { level: "niveau3", instruction: "Urne de 20 billes, 5 rouges.<br>Quelle est la probabilité de tirer une bille rouge, en fraction, en décimal et en pourcentage ?", emoji: "🔴", word: "Bille rouge", choices: ["5/20 = 0,25 = 25%", "5/20 = 0,25 = 250%", "5/20 = 0,4 = 25%", "5/20 = 0,25 = 2,5%"], answer: "5/20 = 0,25 = 25%" , highlightTerms: ["Urne de 20 billes, 5 rouges", "tirer une bille rouge", "Bille rouge"]},
      /* Ex.17 — Urne de boules : 10 vertes sur 25 */
      { level: "niveau3", instruction: "Urne de 25 boules, 10 vertes.<br>Quelle est la probabilité de tirer une boule verte, en fraction, en décimal et en pourcentage ?", emoji: "🟢", word: "Boule verte", choices: ["10/25 = 0,4 = 40%", "10/25 = 0,4 = 4%", "10/25 = 0,04 = 40%", "15/25 = 0,4 = 40%"], answer: "10/25 = 0,4 = 40%" , highlightTerms: ["Urne de 25 boules, 10 vertes", "tirer une boule verte", "Boule verte"]},
      /* Ex.18 — Sac de jetons : 8 rouges sur 50 */
      { level: "niveau3", instruction: "Sac de 50 jetons, 8 jetons rouges.<br>Quelle est la probabilité de tirer un jeton rouge, en fraction, en décimal et en pourcentage ?", emoji: "🔴", word: "Jeton rouge", choices: ["8/50 = 0,16 = 16%", "8/50 = 0,16 = 1,6%", "8/50 = 0,016 = 16%", "8/50 = 0,16 = 8%"], answer: "8/50 = 0,16 = 16%" , highlightTerms: ["Sac de 50 jetons, 8 jetons rouges", "tirer un jeton rouge", "Jeton rouge"]},
      /* Ex.19 — Urne de billes : 6 bleues sur 40 */
      { level: "niveau3", instruction: "Urne de 40 billes, 6 bleues.<br>Quelle est la probabilité de tirer une bille bleue, en fraction, en décimal et en pourcentage ?", emoji: "🔵", word: "Bille bleue", choices: ["6/40 = 0,15 = 15%", "6/40 = 0,15 = 1,5%", "6/40 = 0,015 = 15%", "6/40 = 0,15 = 6%"], answer: "6/40 = 0,15 = 15%" , highlightTerms: ["Urne de 40 billes, 6 bleues", "tirer une bille bleue", "Bille bleue"]}
    ]
  },

  "probabilite-issues": {
    title:      "Dénombrer les issues possibles et favorables",
    domaine:    "Mathématiques",
    competence: "Probabilités — Dénombrer les issues",
    type:       "homophones-niveaux", /* 3 niveaux à contenu propre (level1Bank/2/3),
                                          chaque item porte son propre type — cf.
                                          distinguer-attribut-sujet-complement-objet
                                          (data/grammaire.js) pour le même mécanisme */
    levels:     ["niveau1", "niveau2", "niveau3"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "niveau1": "Je découvre — identifier les issues possibles et favorables",
      "niveau2": "Je m'entraîne — organiser une expérience à deux étapes",
      "niveau3": "Je raisonne — stratégie efficace, éviter le double comptage"
    },
    questionsPerSession: 8,
    backLink:   { href: "mathématiques-probabilites.html", label: "Probabilités" },

    /* ── Refonte complète (3 ruptures cognitives) ─────────────────────────
       Niveau 1 — Je découvre : une seule expérience (dé/carte/roue/sac de
                  billes), identifier issues possibles ET favorables.
                  mots-cliquables / choix-etiquette / classification-etapes
                  (step2Mode:"click" pour les items à 2 sous-questions).
       Niveau 2 — Je m'entraîne : expériences à deux étapes, organiser sans
                  compter au hasard. Introduit les deux nouveaux renderers :
                  grille-double-entree (tableau, avec q.prefilledKeys pour
                  un tableau déjà partiellement rempli à compléter) et
                  arbre-probabilites (arbre à 2 niveaux de branches).
       Niveau 3 — Je raisonne : stratégie efficace, complémentaire, piège du
                  "au moins", couples symétriques, double comptage. Toutes
                  les anciennes questions ouvertes ("explique pourquoi/
                  comment") sont converties en QCM de justification (choix
                  parmi 3-4 raisonnements, dont des erreurs plausibles) —
                  aucune production libre non auto-corrigeable.
       Aucun de ces 3 niveaux ne couvre la formalisation "a chances sur b"
       ni la comparaison de probabilités (déjà probabilite-chances /
       probabilite-nombre).
    ────────────────────────────────────────────────────────────────────── */

    level1Bank: [
      /* 1 — dé, distracteurs hors plage (0 et 7) */
      { id: "probabilite-issues-n1-01", type: "mots-cliquables",
        instruction: "On lance un dé à six faces.<br>Clique sur toutes les issues possibles.",
        sentence: "0 1 2 3 4 5 6 7", targets: ["1", "2", "3", "4", "5", "6"],
        note: "0 et 7 ne sont pas des issues possibles : un dé à six faces ne porte que les nombres de 1 à 6.", highlightTerms: ["dé à six faces", "issues possibles"] },
      /* 2 — roue 4 secteurs (2 rouges, 1 bleu, 1 vert) : total puis favorable à une couleur */
      { id: "probabilite-issues-n1-02", type: "classification-etapes",
        instruction: "Une roue à 4 secteurs : 2 rouges, 1 bleu, 1 vert.",
        sentence: "Rouge Rouge Bleu Vert",
        step1Instruction: "Clique sur tous les secteurs (pour compter les issues possibles).", step1Targets: ["Rouge", "Bleu", "Vert"],
        step2Instruction: "On cherche à obtenir un secteur rouge. Clique sur toutes les issues favorables.",
        step2Targets: ["Rouge"], step2Mode: "click", highlightTerms: ["roue à 4 secteurs", "secteur rouge", "issues possibles", "issues favorables"] },
      /* 3 — sélection multiple, dé, un seul piège (0) */
      { id: "probabilite-issues-n1-03", type: "mots-cliquables",
        instruction: "Un dé à six faces. Un élève propose ces résultats.<br>Clique sur ceux qui sont des issues possibles.",
        sentence: "1 2 3 4 5 6 0", targets: ["1", "2", "3", "4", "5", "6"],
        note: "0 n'est pas une issue possible : un dé à six faces commence à 1.", highlightTerms: ["dé à six faces", "issues possibles"] },
      /* 4 — issues favorables à "nombre supérieur à 4" */
      { id: "probabilite-issues-n1-04", type: "mots-cliquables",
        instruction: "Un dé à six faces.<br>On cherche un nombre supérieur à 4. Clique sur toutes les issues favorables.",
        sentence: "1 2 3 4 5 6", targets: ["5", "6"],
        note: "4 n'est pas supérieur à 4 (il est égal à 4) : seuls 5 et 6 conviennent.", highlightTerms: ["dé à six faces", "supérieur à 4", "issues favorables"] },
      /* 5 — Tom a oublié une issue (roue à 5 secteurs, il n'en cite que 4) */
      { id: "probabilite-issues-n1-05", type: "mots-cliquables",
        instruction: "Une roue à 5 secteurs : rouge, bleu, vert, jaune, violet.<br>Tom affirme que les issues possibles sont rouge, bleu, vert et jaune.<br>Clique sur l'issue qu'il a oubliée.",
        sentence: "Rouge Bleu Vert Jaune Violet", targets: ["Violet"],
        note: "Tom a oublié le violet : cette roue a 5 issues possibles, pas 4.", highlightTerms: ["roue à 5 secteurs", "issues possibles", "l'issue qu'il a oubliée"] },
      /* 6 — dé, nombre pair : total puis favorables (2 sous-questions en 1 item) */
      { id: "probabilite-issues-n1-06", type: "classification-etapes",
        instruction: "Un dé à six faces.", sentence: "1 2 3 4 5 6",
        step1Instruction: "Clique sur toutes les issues possibles (pour établir le total).", step1Targets: ["1", "2", "3", "4", "5", "6"],
        step2Instruction: "On cherche à obtenir un nombre pair. Clique sur toutes les issues favorables.",
        step2Targets: ["2", "4", "6"], step2Mode: "click", highlightTerms: ["dé à six faces", "nombre pair", "issues possibles", "issues favorables"] },
      /* 7 — Léa a raison : distinguer "possibles" du reste, réponse vraie cette fois */
      { id: "probabilite-issues-n1-07", type: "choix-etiquette",
        instruction: "Léa affirme : \"Un dé à six faces a 6 issues possibles.\"",
        emoji: "🎲", word: "Léa a-t-elle raison ?",
        choices: ["Oui, elle a raison", "Non, elle se trompe"], fixedChoiceOrder: true, answer: "Oui, elle a raison",
        wrongFeedback: "La bonne réponse est : <strong>Oui, elle a raison</strong>.",
        hint: "Un dé à six faces porte les nombres 1 à 6 : il y a bien 6 issues possibles, ni plus ni moins.", highlightTerms: ["dé à six faces", "6 issues possibles"] },
      /* 8 — résultats obtenus (avec répétitions) vs issues distinctes */
      { id: "probabilite-issues-n1-08", type: "mots-cliquables",
        instruction: "Un élève lance un dé 10 fois et note les résultats obtenus, dans l'ordre : 3, 5, 3, 1, 5, 5, 2, 3, 1, 5.<br>Clique sur les résultats qui sont RÉELLEMENT APPARUS au moins une fois (sans les répéter).",
        sentence: "1 2 3 4 5 6", targets: ["1", "2", "3", "5"],
        note: "4 et 6 ne sont jamais apparus dans cette série : ce sont pourtant des issues possibles du dé, juste pas des résultats obtenus ici.", highlightTerms: ["résultats obtenus", "RÉELLEMENT APPARUS"] },
      /* 9 — événement par la négative */
      { id: "probabilite-issues-n1-09", type: "mots-cliquables",
        instruction: "Sac de billes à 3 couleurs : rouge, bleu, vert.<br>On cherche une bille qui N'EST PAS rouge. Clique sur toutes les issues favorables.",
        sentence: "Rouge Bleu Vert", targets: ["Bleu", "Vert"],
        note: "\"Pas rouge\" veut dire bleu OU vert : 2 issues favorables sur 3 issues possibles.", highlightTerms: ["Sac de billes à 3 couleurs", "N'EST PAS rouge", "issues favorables"] },
      /* 10 — roue 6 secteurs numérotés, "inférieur à 4" : 3 sous-questions en 1 item */
      { id: "probabilite-issues-n1-10", type: "classification-etapes",
        instruction: "Une roue à 6 secteurs numérotés de 1 à 6.", sentence: "1 2 3 4 5 6",
        step1Instruction: "Clique sur toutes les issues possibles (pour établir le total).", step1Targets: ["1", "2", "3", "4", "5", "6"],
        step2Instruction: "On cherche un nombre inférieur à 4. Clique sur toutes les issues favorables.",
        step2Targets: ["1", "2", "3"], step2Mode: "click", highlightTerms: ["roue à 6 secteurs", "inférieur à 4", "issues possibles", "issues favorables"] }
    ],

    level2Bank: [
      /* 1 — 2 tee-shirts × 3 shorts : lister toutes les tenues (mots-cliquables, piège hors-ensemble) */
      { id: "probabilite-issues-n2-01", type: "mots-cliquables",
        instruction: "Léa a 2 tee-shirts (rouge, bleu) et 3 shorts (noir, blanc, gris). Elle choisit une tenue : 1 tee-shirt + 1 short.<br>Clique sur toutes les tenues possibles.",
        sentence: "Rouge-Noir Rouge-Blanc Rouge-Gris Bleu-Noir Bleu-Blanc Bleu-Gris Bleu-Jaune",
        targets: ["Rouge-Noir", "Rouge-Blanc", "Rouge-Gris", "Bleu-Noir", "Bleu-Blanc", "Bleu-Gris"],
        note: "Bleu-Jaune n'est pas possible : il n'existe pas de short jaune. Il y a 2 × 3 = 6 tenues possibles au total.", highlightTerms: ["2 tee-shirts", "3 shorts", "tenues possibles"] },
      /* 2 — menu 2 entrées × 3 plats, total puis favorable "avec du Poisson" */
      { id: "probabilite-issues-n2-02", type: "classification-etapes",
        instruction: "Menu : 2 entrées (Salade, Soupe) et 3 plats (Poulet, Poisson, Pâtes). On choisit une entrée et un plat.",
        sentence: "Salade-Poulet Salade-Poisson Salade-Pâtes Soupe-Poulet Soupe-Poisson Soupe-Pâtes",
        step1Instruction: "Clique sur tous les menus possibles (pour établir le total).",
        step1Targets: ["Salade-Poulet", "Salade-Poisson", "Salade-Pâtes", "Soupe-Poulet", "Soupe-Poisson", "Soupe-Pâtes"],
        step2Instruction: "On cherche un menu avec du Poisson. Clique sur tous les menus favorables.",
        step2Targets: ["Salade-Poisson", "Soupe-Poisson"], step2Mode: "click", highlightTerms: ["2 entrées", "3 plats", "avec du Poisson", "menus possibles", "menus favorables"] },
      /* 3 — arbre : pièce puis dé, événement "Pile ET nombre pair" */
      { id: "probabilite-issues-n2-03", type: "arbre-probabilites",
        instruction: "On lance une pièce de monnaie, puis un dé à six faces.",
        level1Values: ["Pile", "Face"], level2Values: ["1", "2", "3", "4", "5", "6"],
        step2Instruction: "On cherche Pile ET un nombre pair. Clique sur toutes les feuilles qui réalisent cet événement.",
        step2Targets: [["Pile", "2"], ["Pile", "4"], ["Pile", "6"]], highlightTerms: ["pièce de monnaie", "dé à six faces", "Pile ET un nombre pair"] },
      /* 4 — tableau 6×6 partiellement rempli (diagonale donnée), deux dés */
      { id: "probabilite-issues-n2-04", type: "grille-double-entree",
        instruction: "Deux dés à six faces. Le tableau ci-dessous est déjà commencé (cases verrouillées) : complète les cases manquantes pour recenser tous les couples possibles.",
        rowLabel: "1er dé", colLabel: "2e dé", rowValues: ["1", "2", "3", "4", "5", "6"], colValues: ["1", "2", "3", "4", "5", "6"],
        /* 32 cases acquises (affichées en lecture seule, comme repère) → 4
           cases à compléter (0-3, 2-5, 3-1, 5-2 : lignes/colonnes toutes
           différentes, pas groupées dans un coin) — le tableau sert avant
           tout de support visuel pour comprendre la logique du double
           entrée, pas un exercice de saisie répétitive. */
        prefilledKeys: ["0-0", "0-1", "0-2", "0-4", "0-5", "1-0", "1-1", "1-2", "1-3", "1-4", "1-5", "2-0", "2-1", "2-2", "2-3", "2-4", "3-0", "3-2", "3-3", "3-4", "3-5", "4-0", "4-1", "4-2", "4-3", "4-4", "4-5", "5-0", "5-1", "5-3", "5-4", "5-5"],
        highlightTerms: ["Deux dés à six faces", "couples possibles"] },
      /* 5 — combinaison oubliée (couleur × animal) */
      { id: "probabilite-issues-n2-05", type: "mots-cliquables",
        instruction: "On associe une couleur (rouge, bleu) à un animal (chat, chien, oiseau). Un élève a trouvé ces combinaisons : Rouge-Chat, Rouge-Chien, Rouge-Oiseau, Bleu-Chat, Bleu-Chien.<br>Clique sur la combinaison qu'il a oubliée.",
        sentence: "Rouge-Chat Rouge-Chien Rouge-Oiseau Bleu-Chat Bleu-Chien Bleu-Oiseau", targets: ["Bleu-Oiseau"],
        note: "Il manquait Bleu-Oiseau : avec 2 couleurs × 3 animaux, il y a 2 × 3 = 6 combinaisons possibles, pas 5.", highlightTerms: ["la combinaison qu'il a oubliée"] },
      /* 6 — QCM de justification : pourquoi "11 résultats de 2 à 12" est faux pour 2 dés */
      { id: "probabilite-issues-n2-06", type: "choix-etiquette",
        instruction: "Avec deux dés, un élève affirme : \"Il y a 11 résultats possibles, de 2 à 12.\"",
        emoji: "🎲🎲", word: "Pourquoi cette affirmation est-elle fausse ?",
        choices: [
          "Parce qu'une issue correspond au couple des deux dés, pas seulement à leur somme : il y a 36 couples possibles, pas 11 sommes",
          "Parce qu'il faut aussi compter le zéro comme résultat possible",
          "Parce que les deux dés doivent obligatoirement être de couleurs différentes",
          "Parce que la somme 7 doit être comptée deux fois"
        ],
        answer: "Parce qu'une issue correspond au couple des deux dés, pas seulement à leur somme : il y a 36 couples possibles, pas 11 sommes",
        wrongFeedback: "La bonne réponse est : <strong>une issue = un couple, pas une somme</strong> — il y a 36 couples possibles (6 × 6), pas 11.",
        hint: "36 couples, même si plusieurs couples différents donnent la même somme (ex. 1+6 et 2+5 donnent tous les deux 7).", highlightTerms: ["deux dés", "11 résultats possibles"] },
      /* 7 — sélection multiple, couples favorables à somme = 7 (piège : un couple à 8) */
      { id: "probabilite-issues-n2-07", type: "mots-cliquables",
        instruction: "Deux dés à six faces. On cherche les couples dont la somme fait 7.<br>Clique sur tous les couples favorables parmi cette liste.",
        sentence: "1+6 2+5 3+4 4+3 5+2 6+1 2+6",
        targets: ["1+6", "2+5", "3+4", "4+3", "5+2", "6+1"],
        note: "2+6 fait 8, pas 7 : ce couple n'est pas favorable à cet événement. Il y a bien 6 couples favorables (pas plus, pas moins).", highlightTerms: ["Deux dés à six faces", "somme fait 7", "couples favorables"] },
      /* 8 — QCM méthode fiable pour dénombrer sans oublier/doublonner */
      { id: "probabilite-issues-n2-08", type: "choix-etiquette",
        instruction: "On veut dénombrer tous les couples possibles avec deux dés, sans en oublier ni en compter deux fois.",
        emoji: "📋", word: "Quelle méthode est la plus fiable ?",
        choices: [
          "Un tableau à double entrée (6 lignes × 6 colonnes)",
          "Une liste des sommes possibles (de 2 à 12)",
          "Compter seulement les résultats déjà vus lors d'un lancer"
        ],
        answer: "Un tableau à double entrée (6 lignes × 6 colonnes)",
        wrongFeedback: "La bonne réponse est : <strong>le tableau à double entrée</strong>.",
        hint: "Chaque case du tableau correspond à un couple unique (ligne, colonne) : impossible d'en oublier ou d'en compter deux fois. Une liste de sommes mélange plusieurs couples différents dans une même case (ex. 7 = 1+6 = 2+5 = ...).", highlightTerms: ["couples possibles", "sans en oublier ni en compter deux fois"] },
      /* 9 — code lettre × chiffre, total puis favorable "commence par A" */
      { id: "probabilite-issues-n2-09", type: "classification-etapes",
        instruction: "Un code est formé d'une lettre (A ou B) suivie d'un chiffre (1, 2 ou 3).",
        sentence: "A1 A2 A3 B1 B2 B3",
        step1Instruction: "Clique sur tous les codes possibles (pour établir le total).", step1Targets: ["A1", "A2", "A3", "B1", "B2", "B3"],
        step2Instruction: "On cherche les codes qui commencent par A. Clique sur tous les codes favorables.",
        step2Targets: ["A1", "A2", "A3"], step2Mode: "click", highlightTerms: ["commencent par A", "codes possibles", "codes favorables"] },
      /* 10 — sélection multiple, couples favorables à somme > 9 (piège : un couple à 9 pile) */
      { id: "probabilite-issues-n2-10", type: "mots-cliquables",
        instruction: "Deux dés à six faces. On cherche les couples dont la somme est strictement supérieure à 9 (donc 10, 11 ou 12).<br>Clique sur tous les couples favorables parmi cette liste.",
        sentence: "4+6 5+5 6+4 5+6 6+5 6+6 4+5",
        targets: ["4+6", "5+5", "6+4", "5+6", "6+5", "6+6"],
        note: "4+5 fait 9, pas plus de 9 : ce couple n'est pas favorable ici. Il y a 6 couples favorables à une somme supérieure à 9.", highlightTerms: ["Deux dés à six faces", "strictement supérieure à 9", "couples favorables"] }
    ],

    level3Bank: [
      /* 1 — code 3 chiffres parmi {1,2,3}, avec répétition : sous-ensemble "commence par 1" */
      { id: "probabilite-issues-n3-01", type: "choix-etiquette",
        instruction: "Un code secret est formé de 3 chiffres, chacun choisi parmi 1, 2 ou 3 (un chiffre peut se répéter, par exemple <span class=\"ex-nowrap\">1-1-2</span> est valide).",
        emoji: "🔐", word: "Combien de ces codes commencent par un 1 <span class=\"ex-nowrap\">(1-_-_)</span> ?",
        choices: ["3", "9", "27", "6"], answer: "9",
        wrongFeedback: "La bonne réponse est : <strong>9</strong>.",
        hint: "Le 1er chiffre est fixé à 1. Il reste 3 × 3 = 9 façons de choisir les deux chiffres suivants (3 choix chacun). Au total, sans contrainte, il y aurait 3 × 3 × 3 = 27 codes possibles.", highlightTerms: ["3 chiffres", "commencent par un 1"] },
      /* 2 — QCM de justification : raisonnement du complémentaire (25 - 16 = 9) */
      { id: "probabilite-issues-n3-02", type: "choix-etiquette",
        instruction: "Un code à 3 chiffres commence par 2 ; les deux chiffres suivants sont chacun choisis parmi 1, 2, 3, 4, 5 (répétition autorisée). Il y a 5 × 5 = 25 façons de choisir ces deux derniers chiffres. On veut ceux qui contiennent AU MOINS un 3. On calcule : 25 − 16 = 9.",
        emoji: "🧮", word: "Pourquoi peut-on calculer ce nombre par 25 − 16 ?",
        choices: [
          "Parce que 16 est le nombre de codes SANS aucun 3 (choisis parmi 1, 2, 4, 5) : 25 moins ceux-là donne ceux qui en contiennent au moins un",
          "Parce qu'il faut retirer les codes où les deux chiffres sont identiques",
          "Parce que 16 correspond aux codes qui contiennent exactement deux 3",
          "Parce qu'on retire tous les codes qui commencent par un chiffre pair"
        ],
        answer: "Parce que 16 est le nombre de codes SANS aucun 3 (choisis parmi 1, 2, 4, 5) : 25 moins ceux-là donne ceux qui en contiennent au moins un",
        wrongFeedback: "La bonne réponse est : <strong>16 = les codes sans aucun 3</strong>, donc 25 − 16 = ceux qui en contiennent au moins un.",
        hint: "C'est la méthode du complémentaire : compter ce qu'on NE veut PAS (aucun 3 : 4 × 4 = 16 façons parmi 1,2,4,5), puis soustraire du total.", highlightTerms: ["AU MOINS un 3", "25 − 16"] },
      /* 3 — QCM de justification : complémentaire 36 - 6 pour "résultats différents" */
      { id: "probabilite-issues-n3-03", type: "choix-etiquette",
        instruction: "Deux dés à six faces (36 couples possibles). On cherche l'événement \"les deux dés donnent des résultats différents\". On sait qu'il y a 30 couples favorables, calculés par 36 − 6.",
        emoji: "🧮", word: "Pourquoi soustrait-on 6 ?",
        choices: [
          "Parce qu'il y a 6 couples où les deux dés donnent le même résultat (1-1, 2-2, ..., 6-6), qu'il faut exclure",
          "Parce qu'il y a 6 faces sur un dé, donc on retire toujours 6",
          "Parce que 6 couples donnent une somme impossible",
          "Parce qu'il faut retirer les couples où le premier dé est plus grand que le second"
        ],
        answer: "Parce qu'il y a 6 couples où les deux dés donnent le même résultat (1-1, 2-2, ..., 6-6), qu'il faut exclure",
        wrongFeedback: "La bonne réponse est : <strong>les 6 couples doubles (1-1 à 6-6)</strong> ne réalisent pas l'événement \"résultats différents\".",
        hint: "36 couples au total, moins les 6 doubles (mêmes résultats), donne 30 couples avec des résultats différents.", highlightTerms: ["résultats différents", "36 − 6"] },
      /* 4 — sélection multiple, "au moins un 6" (piège du double comptage de 6-6) */
      { id: "probabilite-issues-n3-04", type: "mots-cliquables",
        instruction: "Deux dés à six faces. On cherche l'événement \"au moins un des deux dés donne 6\".<br>Clique sur tous les couples favorables parmi cette liste.",
        sentence: "6+1 6+2 6+3 6+4 6+5 6+6 1+6 2+6 3+6 4+6 5+6 3+3 2+4 5+1",
        targets: ["6+1", "6+2", "6+3", "6+4", "6+5", "6+6", "1+6", "2+6", "3+6", "4+6", "5+6"],
        note: "3+3, 2+4 et 5+1 ne contiennent aucun 6 : ils ne sont pas favorables. Il y a 11 couples favorables (pas 12) : le couple 6+6 a un 6 sur chaque dé, mais on ne le compte qu'une seule fois.", highlightTerms: ["Deux dés à six faces", "au moins un des deux dés donne 6", "couples favorables"] },
      /* 5 — multiplication simple invalide quand une contrainte ne s'applique qu'à certains cas */
      { id: "probabilite-issues-n3-05", type: "choix-etiquette",
        instruction: "Un menu propose 2 entrées × 3 plats. Un dessert n'est proposé QUE si on choisit le plat \"Poisson\" (2 desserts au choix dans ce cas).",
        emoji: "🍽️", word: "Peut-on calculer le nombre total de menus complets par un simple 2 × 3 × 2 ?",
        choices: [
          "Non, car le dessert ne concerne pas tous les plats : il faut compter séparément les cas \"Poisson\" et les autres",
          "Oui, il suffit de multiplier les 3 nombres, comme pour n'importe quel menu",
          "Non, il faut d'abord choisir le dessert avant le plat"
        ],
        answer: "Non, car le dessert ne concerne pas tous les plats : il faut compter séparément les cas \"Poisson\" et les autres",
        wrongFeedback: "La bonne réponse est : <strong>non</strong>, la multiplication simple suppose un choix libre à chaque étape, ce qui n'est pas le cas ici.",
        hint: "Avec Poisson : 2 entrées × 1 plat × 2 desserts = 4 menus. Sans Poisson (Poulet ou Pâtes) : 2 entrées × 2 plats × 1 (pas de dessert) = 4 menus. Total : 4 + 4 = 8, et non 2×3×2 = 12.", highlightTerms: ["2 entrées × 3 plats", "QUE si on choisit le plat", "2 × 3 × 2"] },
      /* 6 — Emma vs Lucas, couples symétriques */
      { id: "probabilite-issues-n3-06", type: "choix-etiquette",
        instruction: "Avec deux dés de couleurs différentes (un rouge, un bleu), Emma dit que (Rouge=2, Bleu=5) et (Rouge=5, Bleu=2) sont DEUX issues différentes. Lucas dit que c'est la MÊME issue.",
        emoji: "🎲", word: "Qui a raison ?",
        choices: ["Emma a raison", "Lucas a raison", "Les deux ont raison"], answer: "Emma a raison",
        wrongFeedback: "La bonne réponse est : <strong>Emma a raison</strong>.",
        hint: "Comme les dés sont distinguables (rouge/bleu), (2,5) et (5,2) correspondent à deux résultats concrets différents : ce sont bien deux issues distinctes, même si les nombres sont les mêmes dans un ordre inversé.", highlightTerms: ["DEUX issues différentes", "MÊME issue"] },
      /* 7 — sélection multiple, méthodes efficaces (plusieurs bonnes réponses) */
      { id: "probabilite-issues-n3-07", type: "mots-cliquables",
        instruction: "Pour dénombrer tous les couples de deux dés dont la somme est supérieure ou égale à 10, sans risque d'oubli ni de double comptage.<br>Clique sur toutes les méthodes efficaces.",
        sentence: "Tableau-double-entrée Liste-organisée-par-1er-dé Deviner-au-hasard Compter-seulement-les-doubles",
        targets: ["Tableau-double-entrée", "Liste-organisée-par-1er-dé"],
        note: "Deviner au hasard risque d'oublier des couples ; ne compter que les doubles (5-5, 6-6...) ignore des couples comme 4-6 ou 6-4.", highlightTerms: ["supérieure ou égale à 10", "méthodes efficaces"] },
      /* 8 — sac où plusieurs billes donnent la même issue (couleur) */
      { id: "probabilite-issues-n3-08", type: "classification-etapes",
        instruction: "Sac de 5 billes : 2 rouges, 2 bleues, 1 verte. On s'intéresse à la COULEUR tirée (pas à la bille précise) : il y a donc 3 issues possibles (rouge, bleu, vert), même si le sac contient 5 billes.",
        sentence: "Rouge Bleu Vert",
        step1Instruction: "Clique sur toutes les issues possibles (les couleurs, pas les billes).", step1Targets: ["Rouge", "Bleu", "Vert"],
        step2Instruction: "On cherche une bille qui n'est PAS verte. Clique sur toutes les issues favorables.",
        step2Targets: ["Rouge", "Bleu"], step2Mode: "click", highlightTerms: ["COULEUR tirée", "n'est PAS verte", "issues possibles", "issues favorables"] },
      /* 9 — quelle expérience a exactement 8 issues possibles et 3 favorables (remplace "invente ta propre expérience") */
      { id: "probabilite-issues-n3-09", type: "choix-etiquette",
        instruction: "Parmi ces expériences, laquelle a exactement 8 issues possibles au total, ET exactement 3 issues favorables à l'événement indiqué ?",
        emoji: "🔍", word: "Choisis la bonne expérience.",
        choices: [
          "Sac de 8 billes : 3 rouges, 5 bleues ; on cherche une bille rouge",
          "Sac de 8 billes : 2 rouges, 6 bleues ; on cherche une bille rouge",
          "Sac de 6 billes : 3 rouges, 3 bleues ; on cherche une bille rouge",
          "Sac de 10 billes : 3 rouges, 7 bleues ; on cherche une bille rouge"
        ],
        answer: "Sac de 8 billes : 3 rouges, 5 bleues ; on cherche une bille rouge",
        wrongFeedback: "La bonne réponse est : <strong>le sac de 8 billes (3 rouges, 5 bleues)</strong> — 8 issues possibles, 3 favorables.",
        hint: "Les autres ont soit le mauvais total (6 ou 10 billes au lieu de 8), soit le mauvais nombre de favorables (2 rouges au lieu de 3).", highlightTerms: ["8 issues possibles", "3 issues favorables"] },
      /* 10 — mission finale : QCM de justification sur le double comptage (somme≥9 OU double) */
      { id: "probabilite-issues-n3-10", type: "choix-etiquette",
        instruction: "Mission finale — Deux dés à six faces. On cherche les couples qui réalisent l'événement \"la somme est supérieure ou égale à 9, OU c'est un double (même chiffre sur les deux dés)\".<br>On compte 10 couples de somme ≥ 9, et 6 couples doubles.",
        emoji: "🏆", word: "Peut-on dire qu'il y a 10 + 6 = 16 couples qui réalisent cet événement ?",
        choices: [
          "Non, car (5,5) et (6,6) sont à la fois des doubles et des sommes ≥ 9 : ils seraient comptés deux fois. Le bon total est 14",
          "Non, car il faut d'abord retirer tous les couples où le premier dé est plus grand que le second",
          "Oui, 10 + 6 = 16 est correct car les deux événements sont indépendants",
          "Non, car un dé ne peut pas donner deux fois le même chiffre"
        ],
        answer: "Non, car (5,5) et (6,6) sont à la fois des doubles et des sommes ≥ 9 : ils seraient comptés deux fois. Le bon total est 14",
        wrongFeedback: "La bonne réponse est : <strong>non, 16 compte deux fois (5,5) et (6,6)</strong> — le bon total est 14.",
        hint: "10 couples de somme ≥ 9, 6 couples doubles, mais (5,5) et (6,6) sont dans les deux : 10 + 6 − 2 = 14, pas 16. C'est le même piège que pour \"au moins un 6\".", highlightTerms: ["supérieure ou égale à 9", "OU c'est un double", "10 + 6 = 16"] }
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
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité d'obtenir un 7 avec un dé normal.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] , highlightTerms: ["obtenir un 7 avec un dé normal"]},
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité d'obtenir un chiffre entre 1 et 6 avec ce dé.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["certain"] , highlightTerms: ["obtenir un chiffre entre 1 et 6 avec ce dé"]},
      { level: "niveau1", instruction: "On lance une pièce.<br>Clique sur le mot qui décrit la probabilité d'obtenir Pile.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] , highlightTerms: ["On lance une pièce", "obtenir Pile"]},
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité de gagner au loto avec un seul billet.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"] , highlightTerms: ["gagner au loto avec un seul billet"]},
      { level: "niveau1", instruction: "Clique sur le mot qui décrit la probabilité d'obtenir dix fois de suite un 1 avec un dé.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"], note: "Très proche de zéro, mais pas mathématiquement impossible." , highlightTerms: ["obtenir dix fois de suite un 1 avec un dé"]},
      /* Ex.3 — Sac de billes toutes rouges : tirer une bleue est impossible */
      { level: "niveau1", instruction: "Sac de billes : elles sont toutes rouges.<br>Clique sur le mot qui décrit la probabilité de tirer une bille bleue.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] , highlightTerms: ["Sac de billes : elles sont toutes rouges", "tirer une bille bleue"]},
      /* Ex.4 — Sac 8 rouges, 2 bleues : tirer une rouge est probable (sans être certain) */
      { level: "niveau1", instruction: "Sac de billes : 8 rouges, 2 bleues.<br>Clique sur le mot qui décrit la probabilité de tirer une bille rouge.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["probable"] , highlightTerms: ["Sac de billes : 8 rouges, 2 bleues", "tirer une bille rouge"]},
      /* Ex.5 — Boîte 1 jeton noir, 1 jeton blanc : équiprobable */
      { level: "niveau1", instruction: "Boîte de jetons : 1 noir, 1 blanc.<br>Clique sur le mot qui décrit la probabilité de tirer le jeton noir.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] , highlightTerms: ["Boîte de jetons : 1 noir, 1 blanc", "tirer le jeton noir"]},
      /* Ex.6 — Boîte de jetons : 9 verts, 1 rouge : tirer rouge est peu probable */
      { level: "niveau1", instruction: "Boîte de jetons : 9 verts, 1 rouge.<br>Clique sur le mot qui décrit la probabilité de tirer le jeton rouge.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["peu-probable"] , highlightTerms: ["Boîte de jetons : 9 verts, 1 rouge", "tirer le jeton rouge"]},
      /* Ex.7 — Tirer une carte parmi 52 : certain de tirer une carte */
      { level: "niveau1", instruction: "On tire une carte dans un jeu de 52 cartes.<br>Clique sur le mot qui décrit la probabilité de tirer une carte (n'importe laquelle).", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["certain"] , highlightTerms: ["On tire une carte dans un jeu de 52 cartes", "tirer une carte (n'importe laquelle)"]},
      /* Ex.8 — Sac 5 rouges, 5 bleues : équiprobable */
      { level: "niveau1", instruction: "Sac de billes : 5 rouges, 5 bleues.<br>Clique sur le mot qui décrit la probabilité de tirer une bille rouge.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["une-chance-sur-deux"] , highlightTerms: ["Sac de billes : 5 rouges, 5 bleues", "tirer une bille rouge"]},
      /* Ex.9 — Boîte 10 jetons tous jaunes : tirer un jeton vert est impossible */
      { level: "niveau1", instruction: "Boîte de jetons : 10 jetons, tous jaunes.<br>Clique sur le mot qui décrit la probabilité de tirer un jeton vert.", sentence: "impossible peu-probable une-chance-sur-deux probable certain", targets: ["impossible"] , highlightTerms: ["Boîte de jetons : 10 jetons, tous jaunes", "tirer un jeton vert"]},

      /* Ex.10 — Urne : 3 boules noires, 7 blanches → 3/10, 0,3, 30 % */
      { level: "niveau2", instruction: "Urne : 3 boules noires, 7 blanches.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une noire.", sentence: "3/10 zéro-virgule-trois 30% 3/7 70%", targets: ["3/10", "zéro-virgule-trois", "30%"] , highlightTerms: ["Urne : 3 boules noires, 7 blanches", "tirer une noire"]},
      /* Ex.11 — Dé : fractions */
      { level: "niveau2", instruction: "Dé équilibré.<br>Clique sur la probabilité (en fraction) d'obtenir un multiple de 3.", sentence: "2/6 4/6 1/6 3/6", targets: ["2/6"] , highlightTerms: ["Dé équilibré", "obtenir un multiple de 3"]},
      { level: "niveau2", instruction: "Dé équilibré.<br>Clique sur la probabilité (en fraction) d'obtenir un nombre supérieur à 2.", sentence: "2/6 4/6 1/6 3/6", targets: ["4/6"] , highlightTerms: ["Dé équilibré", "obtenir un nombre supérieur à 2"]},
      { level: "niveau2", instruction: "Dé équilibré.<br>Clique sur la probabilité (en fraction) d'obtenir un nombre inférieur à 2.", sentence: "2/6 4/6 1/6 3/6", targets: ["1/6"] , highlightTerms: ["Dé équilibré", "obtenir un nombre inférieur à 2"]},
      /* Ex.12 — Calcul à faire soi-même : urne 4 vertes / 16 jaunes (total 20) → 4/20 = 0,2 = 20% */
      { level: "niveau2", instruction: "Urne : 4 boules vertes, 16 boules jaunes.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une verte.", sentence: "4/20 zéro-virgule-deux 20% 1/4 25%", targets: ["4/20", "zéro-virgule-deux", "20%"] , highlightTerms: ["Urne : 4 boules vertes, 16 boules jaunes", "tirer une verte"]},
      /* Ex.13 — Sac 6 rouges / 14 bleues (total 20) → 6/20 = 0,3 = 30% */
      { level: "niveau2", instruction: "Sac : 6 billes rouges, 14 billes bleues.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une bille rouge.", sentence: "6/20 zéro-virgule-trois 30% 6/14 43%", targets: ["6/20", "zéro-virgule-trois", "30%"] , highlightTerms: ["Sac : 6 billes rouges, 14 billes bleues", "tirer une bille rouge"]},
      /* Ex.14 — Boîte 12 jaunes / 8 verts (total 20) → 8/20 = 0,4 = 40% */
      { level: "niveau2", instruction: "Boîte : 12 jetons jaunes, 8 jetons verts.<br>Clique sur toutes les écritures correctes de la probabilité de tirer un jeton vert.", sentence: "8/20 zéro-virgule-quatre 40% 8/12 67%", targets: ["8/20", "zéro-virgule-quatre", "40%"] , highlightTerms: ["Boîte : 12 jetons jaunes, 8 jetons verts", "tirer un jeton vert"]},
      /* Ex.15 — Urne 9 blanches / 1 noire (total 10) → 1/10 = 0,1 = 10% */
      { level: "niveau2", instruction: "Urne : 9 boules blanches, 1 boule noire.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une boule noire.", sentence: "1/10 zéro-virgule-un 10% 1/9 11%", targets: ["1/10", "zéro-virgule-un", "10%"] , highlightTerms: ["Urne : 9 boules blanches, 1 boule noire", "tirer une boule noire"]},
      /* Ex.16 — Sac 45 vertes / 5 oranges (total 50) → 5/50 = 0,1 = 10% */
      { level: "niveau2", instruction: "Sac : 45 billes vertes, 5 billes oranges.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une bille orange.", sentence: "5/50 zéro-virgule-un 10% 5/45 11%", targets: ["5/50", "zéro-virgule-un", "10%"] , highlightTerms: ["Sac : 45 billes vertes, 5 billes oranges", "tirer une bille orange"]},
      /* Ex.17 — Urne 7 rouges / 3 noires (total 10) → 3/10 = 0,3 = 30% */
      { level: "niveau2", instruction: "Urne : 7 boules rouges, 3 boules noires.<br>Clique sur toutes les écritures correctes de la probabilité de tirer une boule noire.", sentence: "3/10 zéro-virgule-trois 30% 3/7 43%", targets: ["3/10", "zéro-virgule-trois", "30%"] , highlightTerms: ["Urne : 7 boules rouges, 3 boules noires", "tirer une boule noire"]},

      /* Ex.18 — Tableau de conversions */
      { level: "niveau3", instruction: "Clique sur toutes les écritures équivalentes à un demi.", sentence: "1/2 zéro-virgule-cinq 50% 3/4 75%", targets: ["1/2", "zéro-virgule-cinq", "50%"] , highlightTerms: ["un demi"]},
      { level: "niveau3", instruction: "Clique sur toutes les écritures équivalentes à trois quarts.", sentence: "1/2 zéro-virgule-cinq 50% 3/4 75%", targets: ["3/4", "75%"] , highlightTerms: ["trois quarts"]},
      { level: "niveau3", instruction: "Clique sur toutes les écritures équivalentes à un dixième.", sentence: "1/10 zéro-virgule-un 10% 1/2 50%", targets: ["1/10", "zéro-virgule-un", "10%"] , highlightTerms: ["un dixième"]},
      /* Ex.19 — Approche fréquentiste (séries pré-générées) */
      { level: "niveau3", instruction: "Clique sur Pile à chaque fois qu'il apparaît dans cette série de 8 lancers.", sentence: "Pile Face Pile Pile Face Pile Face Face", targets: ["Pile"], note: "Sur 8 lancers, Pile est sorti 4 fois : fréquence 4 sur 8, soit 0,5 — proche de la probabilité théorique." , highlightTerms: ["Pile", "série de 8 lancers"]},
      { level: "niveau3", instruction: "Clique sur Pile à chaque fois qu'il apparaît dans cette série de 10 lancers.", sentence: "Pile Pile Face Pile Face Face Pile Face Pile Face", targets: ["Pile"], note: "Sur 10 lancers, Pile est sorti 5 fois : fréquence 5 sur 10, soit 0,5." , highlightTerms: ["Pile", "série de 10 lancers"]},
      /* Ex.20-27 — Comparaison fréquence observée / probabilité théorique (esprit 6e) */
      { level: "niveau3", instruction: "On lance 200 fois une pièce. Face sort 104 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "104 sur 200, c'est une fréquence de 0,52 — très proche de 0,5 (la probabilité théorique)." , highlightTerms: ["On lance 200 fois une pièce", "Face sort 104 fois"]},
      { level: "niveau3", instruction: "On lance 200 fois une pièce. Face sort 40 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Éloignée"], note: "40 sur 200, c'est une fréquence de 0,2 — très éloignée de 0,5 : la pièce est peut-être truquée." , highlightTerms: ["On lance 200 fois une pièce", "Face sort 40 fois"]},
      { level: "niveau3", instruction: "On lance un dé 60 fois. Le 6 sort 11 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 6) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "11 sur 60 ≈ 0,18 — proche de 1/6 ≈ 0,17 (la probabilité théorique)." , highlightTerms: ["On lance un dé 60 fois", "Le 6 sort 11 fois"]},
      { level: "niveau3", instruction: "On lance un dé 60 fois. Le 6 sort 2 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 6) ?", sentence: "Proche Éloignée", targets: ["Éloignée"], note: "2 sur 60 ≈ 0,03 — très éloignée de 1/6 ≈ 0,17 : le dé est peut-être truqué." , highlightTerms: ["On lance un dé 60 fois", "Le 6 sort 2 fois"]},
      { level: "niveau3", instruction: "On tire 100 fois une bille dans une urne (5 rouges, 5 bleues), en la remettant à chaque fois. La bille rouge sort 48 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "48 sur 100, c'est une fréquence de 0,48 — très proche de 0,5 (la probabilité théorique)." , highlightTerms: ["La bille rouge sort 48 fois"]},
      { level: "niveau3", instruction: "On tire 100 fois une bille dans la même urne (5 rouges, 5 bleues), en la remettant à chaque fois. La bille rouge sort 12 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Éloignée"], note: "12 sur 100, c'est une fréquence de 0,12 — très éloignée de 0,5 : résultat surprenant pour une urne équilibrée." , highlightTerms: ["La bille rouge sort 12 fois"]},
      { level: "niveau3", instruction: "On lance 500 fois une pièce. Pile sort 251 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 2) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "251 sur 500, c'est une fréquence de 0,502 — très proche de 0,5 (la probabilité théorique)." , highlightTerms: ["On lance 500 fois une pièce", "Pile sort 251 fois"]},
      { level: "niveau3", instruction: "On tire 90 fois une bille dans un sac à 3 couleurs en nombres égaux (rouge, vert, bleu), en la remettant à chaque fois. La bille rouge sort 29 fois.<br>La fréquence observée est-elle proche ou éloignée de la probabilité théorique (1 chance sur 3) ?", sentence: "Proche Éloignée", targets: ["Proche"], note: "29 sur 90 ≈ 0,32 — proche de 1/3 ≈ 0,33 (la probabilité théorique)." , highlightTerms: ["La bille rouge sort 29 fois"]}
    ]
  }

});

/* ── data/orthographe.js — Orthographe (10 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "ortho-accorder-determinant-nom": {
    title: "Accorder le déterminant avec le nom",
    domaine:    "Français",
    competence: "Orthographe — Accord déterminant/nom",
    type:  "accord-ecrit",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 15,
    backLink: { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Articles définis et indéfinis, genre et nombre",
      "CM2": "Déterminants possessifs, démonstratifs et élision",
      "6e":  "Partitifs, contractés, « tout » et cas complexes"
    },
    bank: [
      /* ── Niveau 1 (difficulty 1) : articles définis et indéfinis ───────────────
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

      /* ── Niveau 2 (difficulty 2) : possessifs, démonstratifs, élision ──────────
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

      /* ── Niveau 3 (difficulty 3) : partitifs, contractés, « tout », cas complexes
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
    domaine:    "Français",
    competence: "Orthographe — Accord adjectif/nom",
    type:  "accord-ecrit",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    questionsPerSession: 15,
    backLink: { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Adjectifs courants : accord en genre et en nombre",
      "CM2": "Adjectifs irréguliers et formes spéciales (beau, -al/-aux…)",
      "6e":  "Adjectifs invariables, participes, cas complexes"
    },
    bank: [
      /* ── Niveau 1 (difficulty 1) : accord basique des adjectifs ────────────────
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

      /* ── Niveau 2 (difficulty 2) : formes irrégulières ─────────────────────────
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
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "un élève courageux", answer: "des élèves courageux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "un ami sérieux", answer: "des amis sérieux", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un beau voisin", answer: "une belle voisine", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un bel ami", answer: "une belle amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un nouvel ami", answer: "une nouvelle amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un nouveau voisin", answer: "une nouvelle voisine", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un vieil ami", answer: "une vieille amie", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin singulier.",
        prompt: "un vieux voisin", answer: "une vieille voisine", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un élève courageux", answer: "une élève courageuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un ami heureux", answer: "une amie heureuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un voisin sérieux", answer: "une voisine sérieuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un ami menteur", answer: "une amie menteuse", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un ami sportif", answer: "une amie sportive", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un élève actif", answer: "une élève active", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un voisin étranger", answer: "une voisine étrangère", difficulty: 2 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un ami courageux", answer: "des amies courageuses", difficulty: 2 },

      /* ── Niveau 3 (difficulty 3) : cas avancés ──────────────────────────────────
         Objectif : identifier les adjectifs invariables (couleurs dérivées
         de noms), accorder les participes passés employés comme adjectifs,
         maîtriser les formes complexes (doux/douce, faux/fausse, etc.)
         et distinguer adjectif épithète et attribut.
      ──────────────────────────────────────────────────────────────────────── */
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un pantalon marron", answer: "des pantalons marron", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un pull orange", answer: "des pulls orange", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une veste kaki", answer: "des vestes kaki", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un chat roux", answer: "des chats roux", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un chat roux", answer: "des chattes rousses", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un livre ouvert", answer: "des livres ouverts", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "la porte fermée", answer: "les portes fermées", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "une fenêtre cassée", answer: "des fenêtres cassées", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un ami doux", answer: "une amie douce", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un voisin faux", answer: "une voisine fausse", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un élève fou", answer: "une élève folle", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un artiste supérieur", answer: "une artiste supérieure", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un collègue meilleur", answer: "une collègue meilleure", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin pluriel.",
        prompt: "un artiste génial", answer: "des artistes géniales", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au masculin pluriel.",
        prompt: "un accord général", answer: "des accords généraux", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au pluriel.",
        prompt: "un accord franco-allemand", answer: "des accords franco-allemands", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un artiste franco-allemand", answer: "une artiste franco-allemande", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un élève ambigu", answer: "une élève ambiguë", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un élève complet", answer: "une élève complète", difficulty: 3 },
      { instruction: "Mets ce groupe nominal au féminin.",
        prompt: "un voisin muet", answer: "une voisine muette", difficulty: 3 }
    ]
  },

  "ortho-accorder-participe-passe-cod": {
    title: "Accorder le participe passé avec le COD",
    domaine:    "Français",
    competence: "Orthographe — Accord participe passé (COD)",
    type:  "accord-participe-cod",
    levels: ["CM2", "6e"],
    paliers: 2, /* nombre réel de paliers du moteur */
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

  "ortho-transformer-gn-pluriel": {
    title:      "Transformer un GN du singulier au pluriel",
    domaine:    "Français",
    competence: "Orthographe — Accord dans le groupe nominal",
    type:       "gn-pluriel-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-orthographe.html", label: "Orthographe" },

    pools: {

      /* ── Niveau 1 ★ — Pluriels réguliers en -s ───────────────────────────
         Seuls les GN déterminant + nom dont le pluriel se forme par simple
         ajout de -s. Aucun adjectif. Aucun nom en -eau/-au/-eu/-al/-ou.
      ──────────────────────────────────────────────────────────────────────── */
      1: [
        { prompt: "un chat",     answer: "des chats",    rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "la fleur",    answer: "les fleurs",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une trousse", answer: "des trousses", rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "le livre",    answer: "les livres",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une étoile",  answer: "des étoiles",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "le ballon",   answer: "les ballons",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une pomme",   answer: "des pommes",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "le stylo",    answer: "les stylos",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "un chien",    answer: "des chiens",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "la maison",   answer: "les maisons",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "un arbre",    answer: "des arbres",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "le jardin",   answer: "les jardins",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une table",   answer: "des tables",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "le cahier",   answer: "les cahiers",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une feuille", answer: "des feuilles", rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "un canard",   answer: "des canards",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "la porte",    answer: "les portes",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "le crayon",   answer: "les crayons",  rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une lampe",   answer: "des lampes",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." },
        { prompt: "une forêt",   answer: "des forêts",   rule: "En général, on forme le pluriel en ajoutant -s au nom. Le déterminant change aussi : un/une → des, le/la → les." }
      ],

      /* ── Niveau 2 ★★ — Pluriels irréguliers + adjectif simple ───────────
         Noms en -al → -aux, en -eau/-au → -eaux/-aux, en -eu → -eux,
         invariables (-s/-x déjà en place), et GN avec adjectif à accord
         régulier.
      ──────────────────────────────────────────────────────────────────────── */
      2: [
        { prompt: "un cheval rapide",    answer: "des chevaux rapides",    rule: "Les noms en -al font leur pluriel en -aux (cheval → chevaux). L'adjectif s'accorde en genre et en nombre avec le nom." },
        { prompt: "le beau château",     answer: "les beaux châteaux",     rule: "Les noms en -eau prennent un -x au pluriel (château → châteaux). L'adjectif beau fait beaux au pluriel." },
        { prompt: "un journal local",    answer: "des journaux locaux",    rule: "Les noms et adjectifs en -al font leur pluriel en -aux (journal → journaux, local → locaux)." },
        { prompt: "un feu de camp",      answer: "des feux de camp",       rule: "Les noms en -eu prennent un -x au pluriel (feu → feux)." },
        { prompt: "le nez rouge",        answer: "les nez rouges",         rule: "Certains noms sont invariables au pluriel : ils gardent la même forme (nez, bras, voix…). L'adjectif s'accorde quand même." },
        { prompt: "un gâteau fondant",   answer: "des gâteaux fondants",   rule: "Les noms en -eau prennent un -x au pluriel. L'adjectif s'accorde en genre et en nombre avec le nom." },
        { prompt: "un œil bleu",         answer: "des yeux bleus",         rule: "L'œil fait yeux au pluriel : c'est un pluriel supplétif (forme entièrement différente). L'adjectif s'accorde." },
        { prompt: "le tuyau rouillé",    answer: "les tuyaux rouillés",    rule: "Les noms en -au prennent un -x au pluriel (tuyau → tuyaux). L'adjectif s'accorde en genre et en nombre." },
        { prompt: "un animal sauvage",   answer: "des animaux sauvages",   rule: "Les noms en -al font leur pluriel en -aux (animal → animaux). L'adjectif s'accorde en genre et en nombre." },
        { prompt: "le canal principal",  answer: "les canaux principaux",  rule: "Les noms et adjectifs en -al font leur pluriel en -aux (canal → canaux, principal → principaux)." },
        { prompt: "un chapeau gris",     answer: "des chapeaux gris",      rule: "Les noms en -eau prennent un -x au pluriel. L'adjectif gris est invariable au pluriel car il se termine déjà par -s." },
        { prompt: "le genou douloureux", answer: "les genoux douloureux",  rule: "Certains noms en -ou prennent -x au pluriel (bijou, caillou, chou, genou, hibou, joujou, pou). L'adjectif en -eux est invariable au masculin pluriel." },
        { prompt: "un bras musclé",      answer: "des bras musclés",       rule: "Les noms qui se terminent par -s, -x ou -z ne changent pas au pluriel (bras → bras). L'adjectif s'accorde." },
        { prompt: "la voix douce",       answer: "les voix douces",        rule: "Les noms qui se terminent par -x ne changent pas au pluriel (voix → voix). L'adjectif s'accorde." },
        { prompt: "un bureau propre",    answer: "des bureaux propres",    rule: "Les noms en -eau prennent un -x au pluriel (bureau → bureaux). L'adjectif s'accorde en genre et en nombre." },
        { prompt: "le cheval blanc",     answer: "les chevaux blancs",     rule: "Les noms en -al font leur pluriel en -aux (cheval → chevaux). L'adjectif s'accorde en genre et en nombre." },
        { prompt: "un neveu joyeux",     answer: "des neveux joyeux",      rule: "Les noms en -eu prennent un -x au pluriel (neveu → neveux). L'adjectif en -eux ne change pas au masculin pluriel." },
        { prompt: "un signal lumineux",  answer: "des signaux lumineux",   rule: "Les noms en -al font leur pluriel en -aux (signal → signaux). L'adjectif en -eux ne change pas au masculin pluriel." },
        { prompt: "un bateau léger",     answer: "des bateaux légers",     rule: "Les noms en -eau prennent un -x au pluriel (bateau → bateaux). L'adjectif s'accorde en genre et en nombre." },
        { prompt: "le pieu planté",      answer: "les pieux plantés",      rule: "Les noms en -eu prennent un -x au pluriel (pieu → pieux). L'adjectif s'accorde en genre et en nombre." }
      ],

      /* ── Niveau 3 ★★★ — Adjectifs irréguliers, exceptions, noms composés ─
         Formes bel/vieil/nouvel → beaux/vieux/nouveaux ; exceptions -al :
         bal → bals, carnaval → carnavals, festival → festivals,
         récital → récitals ; noms composés.
      ──────────────────────────────────────────────────────────────────────── */
      3: [
        { prompt: "le vieil arbre tordu",          answer: "les vieux arbres tordus",          rule: "Beau, nouveau, vieux s'emploient bel, nouvel, vieil devant un nom masculin commençant par une voyelle ou un h muet au singulier, mais leur pluriel est toujours beaux, nouveaux, vieux." },
        { prompt: "un nouvel élève sérieux",       answer: "des nouveaux élèves sérieux",      rule: "Beau, nouveau, vieux s'emploient bel, nouvel, vieil devant un nom masculin commençant par une voyelle ou un h muet au singulier, mais leur pluriel est toujours beaux, nouveaux, vieux." },
        { prompt: "un grand-père souriant",        answer: "des grands-pères souriants",        rule: "Dans un nom composé adjectif + nom, les deux éléments prennent généralement la marque du pluriel." },
        { prompt: "le bal masqué",                 answer: "les bals masqués",                  rule: "Certains noms en -al ne font pas -aux au pluriel : bal → bals, carnaval → carnavals, festival → festivals, récital → récitals." },
        { prompt: "un festival musical",           answer: "des festivals musicaux",            rule: "Festival, bal, carnaval et récital ne font pas -aux au pluriel. L'adjectif musical fait musicaux." },
        { prompt: "un carnaval animé",             answer: "des carnavals animés",              rule: "Certains noms en -al ne font pas -aux au pluriel : carnaval → carnavals, festival → festivals, récital → récitals, bal → bals." },
        { prompt: "le chef-d'œuvre ancien",        answer: "les chefs-d'œuvre anciens",         rule: "Dans un nom composé, le nom principal (ici chef) prend la marque du pluriel. L'adjectif s'accorde aussi." },
        { prompt: "un récital classique",          answer: "des récitals classiques",           rule: "Récital, festival, bal et carnaval ne font pas -aux au pluriel. L'adjectif s'accorde en genre et en nombre." },
        { prompt: "le bel oiseau coloré",          answer: "les beaux oiseaux colorés",         rule: "Beau s'emploie bel devant une voyelle au singulier, mais son pluriel est toujours beaux. Les noms en -eau prennent -x au pluriel." },
        { prompt: "un nouvel ami fidèle",          answer: "des nouveaux amis fidèles",         rule: "Nouveau s'emploie nouvel devant une voyelle au singulier, mais son pluriel est toujours nouveaux." },
        { prompt: "le vieil homme sage",           answer: "les vieux hommes sages",            rule: "Vieux s'emploie vieil devant une voyelle ou un h muet au singulier, mais son pluriel est toujours vieux." },
        { prompt: "un beau-frère gentil",          answer: "des beaux-frères gentils",          rule: "Dans un nom composé adjectif + nom, les deux éléments prennent généralement la marque du pluriel." },
        { prompt: "le bel enfant curieux",         answer: "les beaux enfants curieux",         rule: "Beau s'emploie bel devant une voyelle au singulier, mais son pluriel est toujours beaux. L'adjectif curieux est invariable au masculin pluriel." },
        { prompt: "un bal populaire",              answer: "des bals populaires",               rule: "Bal ne fait pas -aux au pluriel : bal → bals." },
        { prompt: "le vieil outil rouillé",        answer: "les vieux outils rouillés",         rule: "Vieux s'emploie vieil devant une voyelle ou un h muet au singulier, mais son pluriel est toujours vieux. L'adjectif s'accorde." },
        { prompt: "un nouvel hôtel confortable",   answer: "des nouveaux hôtels confortables",  rule: "Nouveau s'emploie nouvel devant un h muet au singulier, mais son pluriel est toujours nouveaux." },
        { prompt: "un long discours ennuyeux",     answer: "de longs discours ennuyeux",        rule: "Quand un adjectif précède le nom au pluriel, on utilise de à la place de des (de longs discours). Les noms en -s sont invariables au pluriel. L'adjectif en -eux ne change pas au masculin pluriel.", answers: ["de longs discours ennuyeux", "des longs discours ennuyeux"] },
        { prompt: "un récital musical",            answer: "des récitals musicaux",             rule: "Récital ne fait pas -aux au pluriel : récital → récitals. L'adjectif musical fait musicaux." },
        { prompt: "le bel appartement vide",       answer: "les beaux appartements vides",      rule: "Beau s'emploie bel devant une voyelle au singulier, mais son pluriel est toujours beaux." },
        { prompt: "un festival régional",          answer: "des festivals régionaux",           rule: "Festival ne fait pas -aux au pluriel : festival → festivals. L'adjectif régional fait régionaux." }
      ]
    }
  },

  "ortho-transformer-gn-feminin": {
    title: "Change de genre !",
    domaine:    "Français",
    competence: "Orthographe — Transformer un groupe nominal du masculin au féminin",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "genre-niveaux",
    backLink: { href: "français-orthographe.html", label: "Orthographe" },

    /* ── Pools par niveau ───────────────────────────────────────────────────
       hintNoun : nom féminin utilisé pour générer la silhouette d'indice.
       rule     : phrase rappelée en cas d'erreur sur la terminaison.
    ─────────────────────────────────────────────────────────────────────── */
    pools: {

      /* Niveau 1 ★ — Féminisation régulière (12 items)
         Déterminant + nom uniquement ; terminaisons courantes.            */
      1: [
        { masculine: "un chat",        answer: "une chatte",        hintNoun: "chatte",       rule: "Certains noms doublent leur consonne finale au féminin : chat → chatte." },
        { masculine: "le voisin",      answer: "la voisine",        hintNoun: "voisine",      rule: "On forme le féminin de nombreux noms en ajoutant -e au masculin : voisin → voisine." },
        { masculine: "un ami",         answer: "une amie",          hintNoun: "amie",         rule: "On forme le féminin de nombreux noms en ajoutant -e au masculin : ami → amie." },
        { masculine: "le chanteur",    answer: "la chanteuse",      hintNoun: "chanteuse",    rule: "Les noms en -eur font souvent leur féminin en -euse : chanteur → chanteuse." },
        { masculine: "un directeur",   answer: "une directrice",    hintNoun: "directrice",   rule: "Certains noms en -eur font -rice au féminin : directeur → directrice, acteur → actrice." },
        { masculine: "le boulanger",   answer: "la boulangère",     hintNoun: "boulangère",   rule: "Les noms en -er font -ère au féminin : boulanger → boulangère." },
        { masculine: "un lion",        answer: "une lionne",        hintNoun: "lionne",       rule: "Les noms en -on doublent le n au féminin : lion → lionne." },
        { masculine: "le nageur",      answer: "la nageuse",        hintNoun: "nageuse",      rule: "Les noms en -eur font souvent leur féminin en -euse : nageur → nageuse." },
        { masculine: "un baron",       answer: "une baronne",       hintNoun: "baronne",      rule: "Les noms en -on doublent le n au féminin : baron → baronne." },
        { masculine: "le pharmacien",  answer: "la pharmacienne",   hintNoun: "pharmacienne", rule: "Les noms en -ien doublent le n au féminin : pharmacien → pharmacienne." },
        { masculine: "un sportif",     answer: "une sportive",      hintNoun: "sportive",     rule: "Les noms en -f font leur féminin en -ve : sportif → sportive." },
        { masculine: "le berger",      answer: "la bergère",        hintNoun: "bergère",      rule: "Les noms en -er font -ère au féminin : berger → bergère." }
      ],

      /* Niveau 2 ★★ — GN avec adjectif épithète (12 items)
         Déterminant + (adj) + nom + (adj) ; tous les mots à féminiser.   */
      2: [
        { masculine: "un petit chien noir",       answer: "une petite chienne noire",     hintNoun: "chienne",    rule: "Les noms en -ien doublent le n au féminin : chien → chienne. Les adjectifs s'accordent aussi." },
        { masculine: "le vieux chat gris",        answer: "la vieille chatte grise",      hintNoun: "chatte",     rule: "Vieux → vieille au féminin (forme irrégulière à mémoriser). Le nom et l'adjectif s'accordent en genre." },
        { masculine: "un beau garçon blond",      answer: "une belle fille blonde",       hintNoun: "fille",      rule: "Beau → belle au féminin (forme irrégulière). Le nom garçon/fille change entièrement." },
        { masculine: "le nouveau directeur",      answer: "la nouvelle directrice",       hintNoun: "directrice", rule: "Nouveau → nouvelle au féminin (forme irrégulière). Directeur → directrice (-eur → -rice)." },
        { masculine: "un bon boulanger",          answer: "une bonne boulangère",         hintNoun: "boulangère", rule: "Bon → bonne au féminin (consonne doublée). Boulanger → boulangère (-er → -ère)." },
        { masculine: "le jeune sportif rapide",   answer: "la jeune sportive rapide",     hintNoun: "sportive",   rule: "Jeune et rapide sont invariables (même forme au féminin). Sportif → sportive (-f → -ve)." },
        { masculine: "un doux agneau blanc",      answer: "une douce agnelle blanche",    hintNoun: "agnelle",    rule: "Doux → douce au féminin. Agneau → agnelle (forme à retenir). Blanc → blanche (ajout de -he)." },
        { masculine: "le grand nageur champion",  answer: "la grande nageuse championne", hintNoun: "nageuse",    rule: "Grand → grande (+e). Nageur → nageuse (-eur → -euse). Champion → championne (-on → -onne)." },
        { masculine: "un vieux berger discret",   answer: "une vieille bergère discrète", hintNoun: "bergère",    rule: "Vieux → vieille (irrégulier). Berger → bergère (-er → -ère). Discret → discrète (accent + e)." },
        { masculine: "le faux ami dangereux",     answer: "la fausse amie dangereuse",    hintNoun: "amie",       rule: "Faux → fausse au féminin (-x → -sse). Ami → amie (+e). Dangereux → dangereuse (-eux → -euse)." },
        { masculine: "un beau chanteur célèbre",  answer: "une belle chanteuse célèbre",  hintNoun: "chanteuse",  rule: "Beau → belle (irrégulier). Chanteur → chanteuse (-eur → -euse). Célèbre est invariable." },
        { masculine: "le nouveau voisin curieux", answer: "la nouvelle voisine curieuse", hintNoun: "voisine",    rule: "Nouveau → nouvelle (irrégulier). Voisin → voisine (+e). Curieux → curieuse (-eux → -euse)." }
      ],

      /* Niveau 3 ★★★ — Féminins irréguliers et supplétifs (10 items)
         Formes entièrement différentes : féminins supplétifs à mémoriser. */
      3: [
        { masculine: "un roi courageux",    answer: "une reine courageuse",    hintNoun: "reine",      rule: "Roi → reine : féminin supplétif entièrement différent, à mémoriser. Courageux → courageuse (-eux → -euse)." },
        { masculine: "le fils aîné",        answer: "la fille aînée",          hintNoun: "fille",      rule: "Fils → fille : féminin supplétif à mémoriser. Aîné → aînée (+e)." },
        { masculine: "un homme fort",       answer: "une femme forte",         hintNoun: "femme",      rule: "Homme → femme : féminin supplétif à mémoriser. Fort → forte (+e)." },
        { masculine: "le neveu studieux",   answer: "la nièce studieuse",      hintNoun: "nièce",      rule: "Neveu → nièce : féminin supplétif à mémoriser. Studieux → studieuse (-eux → -euse)." },
        { masculine: "un héros célèbre",    answer: "une héroïne célèbre",     hintNoun: "héroïne",    rule: "Héros → héroïne : féminin supplétif à mémoriser. Célèbre est invariable." },
        { masculine: "le duc puissant",     answer: "la duchesse puissante",   hintNoun: "duchesse",   rule: "Duc → duchesse : forme féminine irrégulière à mémoriser. Puissant → puissante (+e)." },
        { masculine: "un copain fidèle",    answer: "une copine fidèle",       hintNoun: "copine",     rule: "Copain → copine : transformation irrégulière à mémoriser. Fidèle est invariable." },
        { masculine: "le comte riche",      answer: "la comtesse riche",       hintNoun: "comtesse",   rule: "Comte → comtesse : forme féminine irrégulière à mémoriser. Riche est invariable." },
        { masculine: "un compagnon loyal",  answer: "une compagne loyale",     hintNoun: "compagne",   rule: "Compagnon → compagne : féminin supplétif à mémoriser. Loyal → loyale (+e)." },
        { masculine: "le traître rusé",     answer: "la traîtresse rusée",     hintNoun: "traîtresse", rule: "Traître → traîtresse : forme féminine irrégulière à mémoriser. Rusé → rusée (+e)." }
      ]
    }
  },

  "ortho-identifier-donneur-accord": {
    title: "Qui commande l'accord ?",
    domaine:    "Français",
    competence: "Orthographe — Identifier le donneur d'accord",
    levels: ["CM1", "CM2", "6e"],
    paliers: 2, /* nombre réel de paliers du moteur */
    type: "donneur-niveaux",
    backLink: { href: "français-orthographe.html", label: "Orthographe" },

    /* ── Niveau 1 — Donneur dans un GN simple ───────────────────────────────
       wordRoles : "det" | "adj" | "nom"
       Cliquer le nom = correct ; det ou adj = feedback ciblé.
    ─────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      { gn: "les petits chats",
        noun: "chats", wordRoles: { "les": "det", "petits": "adj", "chats": "nom" },
        genre: "masculin", nombre: "pluriel" },
      { gn: "une belle journée",
        noun: "journée", wordRoles: { "une": "det", "belle": "adj", "journée": "nom" },
        genre: "féminin", nombre: "singulier" },
      { gn: "des livres illustrés",
        noun: "livres", wordRoles: { "des": "det", "livres": "nom", "illustrés": "adj" },
        genre: "masculin", nombre: "pluriel" },
      { gn: "mon vieux vélo",
        noun: "vélo", wordRoles: { "mon": "det", "vieux": "adj", "vélo": "nom" },
        genre: "masculin", nombre: "singulier" },
      { gn: "ces grandes fenêtres",
        noun: "fenêtres", wordRoles: { "ces": "det", "grandes": "adj", "fenêtres": "nom" },
        genre: "féminin", nombre: "pluriel" },
      { gn: "un élève attentif",
        noun: "élève", wordRoles: { "un": "det", "élève": "nom", "attentif": "adj" },
        genre: "masculin", nombre: "singulier" },
      { gn: "leurs nouvelles chaussures",
        noun: "chaussures", wordRoles: { "leurs": "det", "nouvelles": "adj", "chaussures": "nom" },
        genre: "féminin", nombre: "pluriel" },
      { gn: "le ciel étoilé",
        noun: "ciel", wordRoles: { "le": "det", "ciel": "nom", "étoilé": "adj" },
        genre: "masculin", nombre: "singulier" },
      { gn: "une forêt mystérieuse",
        noun: "forêt", wordRoles: { "une": "det", "forêt": "nom", "mystérieuse": "adj" },
        genre: "féminin", nombre: "singulier" },
      { gn: "des oiseaux colorés",
        noun: "oiseaux", wordRoles: { "des": "det", "oiseaux": "nom", "colorés": "adj" },
        genre: "masculin", nombre: "pluriel" },
      { gn: "son premier dessin",
        noun: "dessin", wordRoles: { "son": "det", "premier": "adj", "dessin": "nom" },
        genre: "masculin", nombre: "singulier" },
      { gn: "les meilleures idées",
        noun: "idées", wordRoles: { "les": "det", "meilleures": "adj", "idées": "nom" },
        genre: "féminin", nombre: "pluriel" }
    ],

    /* ── Niveau 2 — Donneur dans une phrase : sujet du verbe ────────────────
       wordRoles    : "sujet" | "cod" | "cc" | "compl-nom" | "coi"
       subjectWords : tokens valides (clicking any = correct)
       verb         : token souligné en bleu (non-cliquable)
       coordinated  : true → message spécial sujets coordonnés
    ─────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      { sentence: "Les filles chantent dans la cour.",
        verb: "chantent", subjectDisplay: "Les filles",
        subjectIndices: [0, 1],
        genre: "féminin", nombre: "pluriel" },

      { sentence: "Ma sœur aime les fraises.",
        verb: "aime", subjectDisplay: "Ma sœur",
        subjectIndices: [0, 1],
        genre: "féminin", nombre: "singulier" },

      { sentence: "Dans la forêt vivent des renards.",
        verb: "vivent", subjectDisplay: "des renards",
        subjectIndices: [4, 5],
        genre: "masculin", nombre: "pluriel",
        note: "Sujet inversé : des renards est placé après le verbe, mais c'est bien lui qui commande l'accord de vivent." },

      { sentence: "Le chien de mes voisins aboie toute la nuit.",
        verb: "aboie", subjectDisplay: "Le chien",
        subjectIndices: [0, 1],
        genre: "masculin", nombre: "singulier",
        note: "Piège : voisins est complément du nom de chien, pas le sujet. Le nom noyau du sujet est chien (singulier)." },

      { sentence: "Elle mange une pomme chaque matin.",
        verb: "mange", subjectDisplay: "Elle",
        subjectIndices: [0],
        genre: "féminin", nombre: "singulier" },

      { sentence: "Les oiseaux que tu observes chantent fort.",
        verb: "chantent", subjectDisplay: "Les oiseaux",
        subjectIndices: [0, 1],
        genre: "masculin", nombre: "pluriel",
        note: "La proposition relative que tu observes est enchâssée dans le groupe sujet. C'est oiseaux qui commande l'accord de chantent." },

      { sentence: "Tous les lundis, Paul et Léa font du sport.",
        verb: "font", subjectDisplay: "Paul et Léa",
        subjectIndices: [3, 4, 5],
        genre: "masculin", nombre: "pluriel",
        note: "Deux sujets coordonnés → pluriel. Le genre dépend du mélange : masculin l'emporte si l'un est masculin." },

      { sentence: "Lentement, la neige tombe sur la ville.",
        verb: "tombe", subjectDisplay: "la neige",
        subjectIndices: [1, 2],
        genre: "féminin", nombre: "singulier",
        note: "Le CC Lentement est en tête de phrase. Le sujet reste la neige." },

      { sentence: "Ce livre me plaît beaucoup.",
        verb: "plaît", subjectDisplay: "Ce livre",
        subjectIndices: [0, 1],
        genre: "masculin", nombre: "singulier" },

      { sentence: "Mes parents et moi partons en vacances.",
        verb: "partons", subjectDisplay: "Mes parents et moi",
        subjectIndices: [0, 1, 2, 3],
        genre: "masculin", nombre: "pluriel",
        note: "moi + parents : deux sujets coordonnés incluant un pronom de 1re personne → pluriel." },

      { sentence: "La directrice parle aux parents.",
        verb: "parle", subjectDisplay: "La directrice",
        subjectIndices: [0, 1],
        genre: "féminin", nombre: "singulier" },

      { sentence: "Les résultats de l'examen sont affichés.",
        verb: "sont", subjectDisplay: "Les résultats",
        subjectIndices: [0, 1],
        genre: "masculin", nombre: "pluriel",
        note: "Piège : examen est complément du nom résultats, pas le sujet. Le sujet est bien résultats (pluriel)." }
    ]
  },

  /* NB : classé ici (Orthographe) par backLink car proposé sur la page Orthographe,
     bien que competence commence par "Conjugaison" (accord du participe passé avec être). */
  "ortho-accorder-participe-passe-etre": {
    title:      "Le passé composé avec être",
    domaine:    "Français",
    competence: "Conjugaison — Passé composé avec être (accord du participe)",
    type:       "pc-etre-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    questionsPerSession: 10,
    backLink: { href: "français-orthographe.html", label: "l'Orthographe" },

    /* ── Niveau 1 — raisonnement guidé (10 items) ────────────────────────
       Étape 1 (mots-cliquables) : clique sur le sujet.
       Étape 2 (classification)  : genre + nombre du sujet, combinés.
       Étape 3 (saisie)          : auxiliaire être conjugué + participe accordé.
       subjectWords  — mots de la phrase appartenant au GN sujet (cliquables)
       subjectCore   — nom noyau du sujet, seul mot qui porte l'accord ;
                       accepté à l'étape 1 comme alternative au groupe complet
                       (ex. cliquer seulement "sœur" plutôt que "Ma" + "sœur")
       subjectPhrase — sujet affiché dans les feedbacks
       gender — "m" | "f"   number — "s" | "p"
       Mélange pronoms et GN simples pour graduer la difficulté du repérage.
    ─────────────────────────────────────────────────────────────────── */
    level1Bank: [
      { subjectWords: ["elle"],        subjectCore: "elle",   subjectPhrase: "elle",        gender: "f", number: "s",
        infinitive: "aller",   sentence: "Hier, elle ________ au parc.",        answer: "est allée" },
      { subjectWords: ["Ils"],         subjectCore: "Ils",    subjectPhrase: "ils",         gender: "m", number: "p",
        infinitive: "partir",  sentence: "Ils ________ sans prévenir.",         answer: "sont partis" },
      { subjectWords: ["Il"],          subjectCore: "Il",     subjectPhrase: "il",          gender: "m", number: "s",
        infinitive: "tomber",  sentence: "Il ________ dans la cour.",           answer: "est tombé" },
      { subjectWords: ["Elles"],       subjectCore: "Elles",  subjectPhrase: "elles",       gender: "f", number: "p",
        infinitive: "venir",   sentence: "Elles ________ nous voir.",           answer: "sont venues" },
      { subjectWords: ["Vous"],        subjectCore: "Vous",   subjectPhrase: "vous",        gender: "m", number: "p",
        infinitive: "monter",  sentence: "Vous ________ trop vite.",            answer: "êtes montés" },
      { subjectWords: ["Ma", "sœur"],  subjectCore: "sœur",   subjectPhrase: "ma sœur",     gender: "f", number: "s",
        infinitive: "naître",  sentence: "Ma sœur ________ en décembre.",       answer: "est née" },
      { subjectWords: ["Mon", "frère"], subjectCore: "frère", subjectPhrase: "mon frère",  gender: "m", number: "s",
        infinitive: "revenir", sentence: "Mon frère ________ de voyage.",       answer: "est revenu" },
      { subjectWords: ["La", "chatte"], subjectCore: "chatte", subjectPhrase: "la chatte",  gender: "f", number: "s",
        infinitive: "rester",  sentence: "La chatte ________ dehors.",          answer: "est restée" },
      { subjectWords: ["Les", "filles"], subjectCore: "filles", subjectPhrase: "les filles", gender: "f", number: "p",
        infinitive: "rentrer", sentence: "Les filles ________ à midi.",        answer: "sont rentrées" },
      { subjectWords: ["Les", "élèves"], subjectCore: "élèves", subjectPhrase: "les élèves", gender: "m", number: "p",
        infinitive: "sortir",  sentence: "Les élèves ________ en récréation.",  answer: "sont sortis" }
    ],

    /* ── Niveau 2 — écriture directe, sujet pronominal ou GN simple (10 items) ── */
    level2Bank: [
      { infinitive: "arriver",  sentence: "Les voisines ________ ensemble.",        answer: "sont arrivées" },
      { infinitive: "descendre", sentence: "La touriste ________ à Paris.",         answer: "est descendue" },
      { infinitive: "entrer",   sentence: "La directrice ________ dans la classe.", answer: "est entrée" },
      { infinitive: "partir",   sentence: "Mes parents ________ en vacances.",      answer: "sont partis" },
      { infinitive: "partir",   sentence: "Elle ________ tôt ce matin.",            answer: "est partie" },
      { infinitive: "arriver",  sentence: "Nous ________ en retard.",               answer: "sommes arrivés" },
      { infinitive: "sortir",   sentence: "Le chien ________ dans le jardin.",      answer: "est sorti" },
      { infinitive: "monter",   sentence: "Les enfants ________ dans le bus.",      answer: "sont montés" },
      { infinitive: "rester",   sentence: "On ________ à la maison.",              answer: "est resté" },
      { infinitive: "venir",    sentence: "La maîtresse ________ nous voir hier.",  answer: "est venue" }
    ],

    /* ── Niveau 3 — sujet non pronominal exclusivement (12 items) ────────
       Inclut le piège de l'accord mixte : sujet masculin + féminin → masculin.
    ─────────────────────────────────────────────────────────────────── */
    level3Bank: [
      { infinitive: "arriver",   sentence: "Le facteur ________ très tôt ce matin.",              answer: "est arrivé" },
      { infinitive: "rentrer",   sentence: "La voisine ________ tard hier soir.",                 answer: "est rentrée" },
      { infinitive: "partir",    sentence: "Les chevaliers ________ au combat à l'aube.",          answer: "sont partis" },
      { infinitive: "naître",    sentence: "Les jumelles ________ le même jour.",                  answer: "sont nées" },
      { infinitive: "aller",     sentence: "Mon frère et ma sœur ________ chez leurs grands-parents.", answer: "sont allés" },
      { infinitive: "tomber",    sentence: "Le vieux chêne ________ pendant la tempête.",          answer: "est tombé" },
      { infinitive: "venir",     sentence: "Ma tante ________ nous rendre visite dimanche.",       answer: "est venue" },
      { infinitive: "monter",    sentence: "Les explorateurs ________ au sommet de la montagne.",  answer: "sont montés" },
      { infinitive: "retourner", sentence: "Les championnes ________ sur le podium.",               answer: "sont retournées" },
      { infinitive: "entrer",    sentence: "Le roi et la reine ________ dans la salle du trône.",  answer: "sont entrés" },
      { infinitive: "rester",    sentence: "Ma grand-mère ________ à la maison ce week-end.",      answer: "est restée" },
      { infinitive: "devenir",   sentence: "Les acteurs ________ célèbres du jour au lendemain.",  answer: "sont devenus" }
    ]
  },

  "ortho-modifier-temps-accords": {
    title:      "Change de temps !",
    domaine:    "Français",
    competence: "Orthographe — Modifier le temps et effectuer les accords nécessaires",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    5, /* nombre réel de paliers du moteur */
    type:       "change-temps-niveaux",
    questionsPerSession: 10,
    backLink:   { href: "français-orthographe.html", label: "Orthographe" },

    /* bank : chaque item porte un champ « level » 1-5.
       startSessionWithType filtre par niveau avant de shuffler. */
    bank: [

      /* ── NIVEAU 1 : Présent ↔ Futur simple / Présent ↔ Imparfait ─────────── */
      {
        level: 1,
        sentence:     "Les enfants jouent dans le jardin.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Les enfants joueront dans le jardin."],
        feedbackRule: "Au futur, les verbes du 1<sup>er</sup> groupe prennent : <em>-erai, -eras, -era, -erons, -erez, -eront</em>."
      },
      {
        level: 1,
        sentence:     "Elle chante sous la pluie.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Elle chantait sous la pluie."],
        feedbackRule: "À l'imparfait, les verbes du 1<sup>er</sup> groupe prennent : <em>-ais, -ais, -ait, -ions, -iez, -aient</em>."
      },
      {
        level: 1,
        sentence:     "Nous mangeons des crêpes.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Nous mangerons des crêpes."],
        feedbackRule: "Au futur, les verbes du 1<sup>er</sup> groupe prennent : <em>-erai, -eras, -era, -erons, -erez, -eront</em>."
      },
      {
        level: 1,
        sentence:     "Tu finis tes devoirs.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Tu finissais tes devoirs."],
        feedbackRule: "À l'imparfait, les verbes du 2<sup>e</sup> groupe prennent le suffixe <em>-iss-</em> : <em>je finissais, nous finissions</em>."
      },
      {
        level: 1,
        sentence:     "Il regarde la télévision.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Il regardera la télévision."],
        feedbackRule: "Au futur, les verbes du 1<sup>er</sup> groupe prennent : <em>-erai, -eras, -era, -erons, -erez, -eront</em>."
      },
      {
        level: 1,
        sentence:     "Vous choisissez un livre.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Vous choisissiez un livre."],
        feedbackRule: "À l'imparfait, les verbes du 2<sup>e</sup> groupe prennent le suffixe <em>-iss-</em> : <em>tu choisissais, nous choisissions</em>."
      },
      {
        level: 1,
        sentence:     "Les oiseaux chantent le matin.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Les oiseaux chantaient le matin."],
        feedbackRule: "À l'imparfait, les verbes du 1<sup>er</sup> groupe prennent : <em>-ais, -ais, -ait, -ions, -iez, -aient</em>."
      },
      {
        level: 1,
        sentence:     "Je dessine un château.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Je dessinerai un château."],
        feedbackRule: "Au futur, les verbes du 1<sup>er</sup> groupe prennent : <em>-erai, -eras, -era, -erons, -erez, -eront</em>."
      },
      {
        level: 1,
        sentence:     "Nous obéissons aux règles.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Nous obéissions aux règles."],
        feedbackRule: "À l'imparfait, les verbes du 2<sup>e</sup> groupe prennent le suffixe <em>-iss-</em> : <em>nous obéissions</em>."
      },
      {
        level: 1,
        sentence:     "Elle range sa chambre.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Elle rangera sa chambre."],
        feedbackRule: "Au futur, les verbes du 1<sup>er</sup> groupe prennent : <em>-erai, -eras, -era, -erons, -erez, -eront</em>."
      },
      {
        level: 1,
        sentence:     "Tu sautes par-dessus la barrière.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Tu sautais par-dessus la barrière."],
        feedbackRule: "À l'imparfait, les verbes du 1<sup>er</sup> groupe prennent : <em>-ais, -ais, -ait, -ions, -iez, -aient</em>."
      },
      {
        level: 1,
        sentence:     "Ils applaudissent les artistes.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Ils applaudiront les artistes."],
        feedbackRule: "Au futur, les verbes du 2<sup>e</sup> groupe prennent : <em>-irai, -iras, -ira, -irons, -irez, -iront</em>."
      },
      {
        level: 1,
        sentence:     "Je marche jusqu'à l'école.",
        sourceTense:  "Présent",
        targetTense:  "imparfait",
        answers:      ["Je marchais jusqu'à l'école."],
        feedbackRule: "À l'imparfait, les verbes du 1<sup>er</sup> groupe prennent : <em>-ais, -ais, -ait, -ions, -iez, -aient</em>."
      },
      {
        level: 1,
        sentence:     "Vous remplissez le formulaire.",
        sourceTense:  "Présent",
        targetTense:  "futur simple",
        answers:      ["Vous remplirez le formulaire."],
        feedbackRule: "Au futur, les verbes du 2<sup>e</sup> groupe prennent : <em>-irai, -iras, -ira, -irons, -irez, -iront</em>."
      },

      /* ── NIVEAU 2 : Présent → Passé composé ──────────────────────────────── */
      {
        level: 2,
        sentence:     "Elle mange une pomme.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Elle a mangé une pomme."],
        feedbackRule: "<em>Manger</em> se conjugue avec <em>avoir</em> au passé composé. Participe <em>mangé</em> — invariable avec avoir."
      },
      {
        level: 2,
        sentence:     "Les filles partent en vacances.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Les filles sont parties en vacances."],
        feedbackRule: "<em>Partir</em> se conjugue avec <em>être</em>. Avec être, le participe s'accorde avec le sujet : <em>les filles</em> (fém. pluriel) → <strong>parties</strong>."
      },
      {
        level: 2,
        sentence:     "Tu écris une lettre.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Tu as écrit une lettre."],
        feedbackRule: "<em>Écrire</em> se conjugue avec <em>avoir</em>. Participe irrégulier : <strong>écrit</strong> (invariable)."
      },
      {
        level: 2,
        sentence:     "Il tombe dans l'escalier.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Il est tombé dans l'escalier."],
        feedbackRule: "<em>Tomber</em> se conjugue avec <em>être</em>. Le sujet <em>il</em> est masc. sing. : participe <strong>tombé</strong> (sans accord)."
      },
      {
        level: 2,
        sentence:     "Nous chantons une chanson.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Nous avons chanté une chanson."],
        feedbackRule: "<em>Chanter</em> se conjugue avec <em>avoir</em>. Participe <em>chanté</em> — invariable avec avoir."
      },
      {
        level: 2,
        sentence:     "Elles arrivent à l'heure.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Elles sont arrivées à l'heure."],
        feedbackRule: "<em>Arriver</em> se conjugue avec <em>être</em>. Le sujet <em>elles</em> est fém. pluriel : <strong>arrivées</strong>."
      },
      {
        level: 2,
        sentence:     "Je prends mon sac.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["J'ai pris mon sac.", "j'ai pris mon sac."],
        feedbackRule: "<em>Prendre</em> se conjugue avec <em>avoir</em>. Participe irrégulier : <strong>pris</strong>. N'oublie pas l'élision : <em>J'ai</em>."
      },
      {
        level: 2,
        sentence:     "Ma sœur entre dans la classe.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Ma sœur est entrée dans la classe."],
        feedbackRule: "<em>Entrer</em> se conjugue avec <em>être</em>. <em>Ma sœur</em> est fém. sing. : <strong>entrée</strong>."
      },
      {
        level: 2,
        sentence:     "Vous finissez le travail.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Vous avez fini le travail."],
        feedbackRule: "<em>Finir</em> se conjugue avec <em>avoir</em>. Participe : <strong>fini</strong> (invariable)."
      },
      {
        level: 2,
        sentence:     "Ils viennent nous voir.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Ils sont venus nous voir."],
        feedbackRule: "<em>Venir</em> se conjugue avec <em>être</em>. Le sujet <em>ils</em> est masc. pluriel : <strong>venus</strong>."
      },
      {
        level: 2,
        sentence:     "Elle met son manteau.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Elle a mis son manteau."],
        feedbackRule: "<em>Mettre</em> se conjugue avec <em>avoir</em>. Participe irrégulier : <strong>mis</strong> (invariable)."
      },
      {
        level: 2,
        sentence:     "Les élèves sortent en récréation.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Les élèves sont sortis en récréation."],
        feedbackRule: "<em>Sortir</em> se conjugue avec <em>être</em>. <em>Les élèves</em> est masc. pluriel : <strong>sortis</strong>."
      },
      {
        level: 2,
        sentence:     "Tu reçois un colis.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["Tu as reçu un colis."],
        feedbackRule: "<em>Recevoir</em> se conjugue avec <em>avoir</em>. Participe irrégulier : <strong>reçu</strong> (invariable)."
      },
      {
        level: 2,
        sentence:     "La directrice monte dans son bureau.",
        sourceTense:  "Présent",
        targetTense:  "passé composé",
        answers:      ["La directrice est montée dans son bureau."],
        feedbackRule: "<em>Monter</em> se conjugue avec <em>être</em>. <em>La directrice</em> est fém. sing. : <strong>montée</strong>."
      },

      /* ── NIVEAU 3 : Présent → Passé simple ───────────────────────────────── */
      {
        level: 3,
        sentence:     "Le roi entre dans la salle.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Le roi entra dans la salle."],
        feedbackRule: "Au passé simple, les verbes du 1<sup>er</sup> groupe prennent : <em>-ai, -as, -a, -âmes, -âtes, -èrent</em>."
      },
      {
        level: 3,
        sentence:     "Les soldats marchent toute la nuit.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Les soldats marchèrent toute la nuit."],
        feedbackRule: "Au passé simple, les verbes du 1<sup>er</sup> groupe prennent : <em>-ai, -as, -a, -âmes, -âtes, -èrent</em>."
      },
      {
        level: 3,
        sentence:     "Elle prend la parole.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Elle prit la parole."],
        feedbackRule: "<em>Prendre</em> est irrégulier au passé simple : <em>je pris, tu pris, il/elle prit, nous prîmes, ils prirent</em>."
      },
      {
        level: 3,
        sentence:     "Il fait un geste de la main.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Il fit un geste de la main."],
        feedbackRule: "<em>Faire</em> est irrégulier au passé simple : <em>je fis, tu fis, il fit, nous fîmes, ils firent</em>."
      },
      {
        level: 3,
        sentence:     "Nous arrivons au village.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Nous arrivâmes au village."],
        feedbackRule: "Au passé simple, les verbes du 1<sup>er</sup> groupe prennent : <em>-âmes</em> pour nous. N'oublie pas l'accent circonflexe : <strong>arrivâmes</strong>."
      },
      {
        level: 3,
        sentence:     "Ils viennent en courant.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Ils vinrent en courant."],
        feedbackRule: "<em>Venir</em> est irrégulier au passé simple : <em>je vins, tu vins, il vint, nous vînmes, ils vinrent</em>."
      },
      {
        level: 3,
        sentence:     "Elle dit la vérité.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Elle dit la vérité."],
        feedbackRule: "Au passé simple, <em>dire</em> à la 3<sup>e</sup> personne du singulier donne <em>dit</em> — la forme est identique au présent !"
      },
      {
        level: 3,
        sentence:     "Tu trouves la solution.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Tu trouvas la solution."],
        feedbackRule: "Au passé simple, les verbes du 1<sup>er</sup> groupe prennent : <em>-ai, -as, -a, -âmes, -âtes, -èrent</em>."
      },
      {
        level: 3,
        sentence:     "Il a peur.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Il eut peur."],
        feedbackRule: "<em>Avoir</em> est irrégulier au passé simple : <em>j'eus, tu eus, il eut, nous eûmes, vous eûtes, ils eurent</em>."
      },
      {
        level: 3,
        sentence:     "Elles chantent devant la foule.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Elles chantèrent devant la foule."],
        feedbackRule: "Au passé simple, les verbes du 1<sup>er</sup> groupe prennent : <em>-ai, -as, -a, -âmes, -âtes, -èrent</em>."
      },
      {
        level: 3,
        sentence:     "Nous sommes fatigués.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Nous fûmes fatigués."],
        feedbackRule: "<em>Être</em> est irrégulier au passé simple : <em>je fus, tu fus, il fut, nous fûmes, vous fûtes, ils furent</em>."
      },
      {
        level: 3,
        sentence:     "Il prend son épée.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Il prit son épée."],
        feedbackRule: "<em>Prendre</em> est irrégulier au passé simple : <em>je pris, tu pris, il prit, nous prîmes, ils prirent</em>."
      },
      {
        level: 3,
        sentence:     "Les enfants jouent dans la rue.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Les enfants jouèrent dans la rue."],
        feedbackRule: "Au passé simple, les verbes du 1<sup>er</sup> groupe prennent : <em>-ai, -as, -a, -âmes, -âtes, -èrent</em>."
      },
      {
        level: 3,
        sentence:     "Elle vient à sa rencontre.",
        sourceTense:  "Présent",
        targetTense:  "passé simple",
        answers:      ["Elle vint à sa rencontre."],
        feedbackRule: "<em>Venir</em> est irrégulier au passé simple : <em>je vins, tu vins, il vint, nous vînmes, ils vinrent</em>."
      },

      /* ── NIVEAU 4 : Passé composé → Plus-que-parfait ─────────────────────── */
      {
        level: 4,
        sentence:     "Elle a mangé avant de partir.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Elle avait mangé avant de partir."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire est à l'imparfait : <em>avais, avait, avions…</em> ou <em>étais, était, étions…</em>"
      },
      {
        level: 4,
        sentence:     "Les filles sont parties en vacances.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Les filles étaient parties en vacances."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>étaient</em>. L'accord du participe reste identique."
      },
      {
        level: 4,
        sentence:     "Tu as écrit une lettre.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Tu avais écrit une lettre."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>avoir</em> passe à l'imparfait : <em>avais</em>."
      },
      {
        level: 4,
        sentence:     "Il est tombé dans l'escalier.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Il était tombé dans l'escalier."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>était</em>. L'accord du participe reste identique."
      },
      {
        level: 4,
        sentence:     "Nous avons chanté une chanson.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Nous avions chanté une chanson."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>avoir</em> passe à l'imparfait : <em>avions</em>."
      },
      {
        level: 4,
        sentence:     "Elles sont arrivées à l'heure.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Elles étaient arrivées à l'heure."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>étaient</em>. L'accord du participe reste identique."
      },
      {
        level: 4,
        sentence:     "J'ai pris mon sac.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["J'avais pris mon sac.", "j'avais pris mon sac."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>avoir</em> passe à l'imparfait : <em>avais</em>."
      },
      {
        level: 4,
        sentence:     "Ma sœur est entrée dans la classe.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Ma sœur était entrée dans la classe."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>était</em>. L'accord du participe reste identique."
      },
      {
        level: 4,
        sentence:     "Vous avez fini le travail.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Vous aviez fini le travail."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>avoir</em> passe à l'imparfait : <em>aviez</em>."
      },
      {
        level: 4,
        sentence:     "Ils sont venus nous voir.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Ils étaient venus nous voir."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>étaient</em>. L'accord du participe reste identique."
      },
      {
        level: 4,
        sentence:     "Elle a mis son manteau.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Elle avait mis son manteau."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>avoir</em> passe à l'imparfait : <em>avait</em>."
      },
      {
        level: 4,
        sentence:     "Les élèves sont sortis en récréation.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Les élèves étaient sortis en récréation."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>étaient</em>. L'accord du participe reste identique."
      },
      {
        level: 4,
        sentence:     "Tu as reçu un colis.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["Tu avais reçu un colis."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>avoir</em> passe à l'imparfait : <em>avais</em>."
      },
      {
        level: 4,
        sentence:     "La directrice est montée dans son bureau.",
        sourceTense:  "Passé composé",
        targetTense:  "plus-que-parfait",
        answers:      ["La directrice était montée dans son bureau."],
        feedbackRule: "Au plus-que-parfait, l'auxiliaire <em>être</em> passe à l'imparfait : <em>était</em>. L'accord du participe reste identique."
      },

      /* ── NIVEAU 5 : Présent → Conditionnel présent ───────────────────────── */
      {
        level: 5,
        sentence:     "Je mange une pizza.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Je mangerais une pizza."],
        feedbackRule: "Au conditionnel, les terminaisons sont : <em>-rais, -rais, -rait, -rions, -riez, -raient</em>."
      },
      {
        level: 5,
        sentence:     "Elle part en voyage.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Elle partirait en voyage."],
        feedbackRule: "Au conditionnel, les terminaisons sont : <em>-rais, -rais, -rait, -rions, -riez, -raient</em>. Radical de <em>partir</em> : <em>partir-</em> → <em>partirait</em>."
      },
      {
        level: 5,
        sentence:     "Nous faisons un gâteau.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Nous ferions un gâteau."],
        feedbackRule: "<em>Faire</em> a un radical irrégulier au conditionnel : <em>fer-</em> → <em>ferions</em>."
      },
      {
        level: 5,
        sentence:     "Tu peux venir ce soir.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Tu pourrais venir ce soir."],
        feedbackRule: "<em>Pouvoir</em> a un radical irrégulier au conditionnel : <em>pourr-</em> → <em>pourrais</em>."
      },
      {
        level: 5,
        sentence:     "Il va à l'école.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Il irait à l'école."],
        feedbackRule: "<em>Aller</em> a un radical irrégulier au conditionnel : <em>ir-</em> → <em>irait</em>."
      },
      {
        level: 5,
        sentence:     "Vous voulez du café ?",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Vous voudriez du café ?"],
        feedbackRule: "<em>Vouloir</em> a un radical irrégulier au conditionnel : <em>voudr-</em> → <em>voudriez</em>."
      },
      {
        level: 5,
        sentence:     "Elles savent la réponse.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Elles sauraient la réponse."],
        feedbackRule: "<em>Savoir</em> a un radical irrégulier au conditionnel : <em>saur-</em> → <em>sauraient</em>."
      },
      {
        level: 5,
        sentence:     "Je suis content.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Je serais content."],
        feedbackRule: "<em>Être</em> a un radical irrégulier au conditionnel : <em>ser-</em> → <em>serais</em>."
      },
      {
        level: 5,
        sentence:     "Nous avons le temps.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Nous aurions le temps."],
        feedbackRule: "<em>Avoir</em> a un radical irrégulier au conditionnel : <em>aur-</em> → <em>aurions</em>."
      },
      {
        level: 5,
        sentence:     "Tu viens avec nous ?",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Tu viendrais avec nous ?"],
        feedbackRule: "<em>Venir</em> a un radical irrégulier au conditionnel : <em>viendr-</em> → <em>viendrais</em>."
      },
      {
        level: 5,
        sentence:     "Il choisit le bon chemin.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Il choisirait le bon chemin."],
        feedbackRule: "Au conditionnel, les verbes du 2<sup>e</sup> groupe conservent leur infinitif comme radical : <em>choisir-</em> → <em>choisirait</em>."
      },
      {
        level: 5,
        sentence:     "Elles finissent à midi.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Elles finiraient à midi."],
        feedbackRule: "Au conditionnel, les verbes du 2<sup>e</sup> groupe conservent leur infinitif comme radical : <em>finir-</em> → <em>finiraient</em>."
      },
      {
        level: 5,
        sentence:     "Vous êtes prêts.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Vous seriez prêts."],
        feedbackRule: "<em>Être</em> a un radical irrégulier au conditionnel : <em>ser-</em> → <em>seriez</em>."
      },
      {
        level: 5,
        sentence:     "Je prends le bus.",
        sourceTense:  "Présent",
        targetTense:  "conditionnel présent",
        answers:      ["Je prendrais le bus."],
        feedbackRule: "<em>Prendre</em> a un radical irrégulier au conditionnel : <em>prendr-</em> → <em>prendrais</em>."
      }

    ]
  },

  "ortho-modifier-sujet-accords": {
    title:       "Change de sujet !",
    domaine:     "Français",
    competence:  "Orthographe — Accord sujet-verbe, adjectif attribut et participe passé",
    type:        "change-sujet-niveaux",
    levels:      ["CM1", "CM2", "6e"],
    paliers:     4, /* nombre réel de paliers du moteur */
    backLink:    { href: "français-orthographe.html", label: "Orthographe" },
    questionsPerSession: 10,

    pools: {

      /* ── Niveau 1 — Changement de nombre (singulier ↔ pluriel), présent, groupes 1 et 2 ── */
      1: [
        {
          source:     "Le chat dort sur le canapé.",
          subject:    "Le chat",
          newSubject: "Les chats",
          answer:     "Les chats dorment sur le canapé.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Les élèves chantent ensemble.",
          subject:    "Les élèves",
          newSubject: "L'élève",
          answer:     "L'élève chante ensemble.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Tu ranges ta chambre.",
          subject:    "Tu",
          newSubject: "Vous",
          answer:     "Vous rangez votre chambre.",
          rule:       "Le verbe s'accorde avec son sujet. Le déterminant possessif change aussi : ta → votre."
        },
        {
          source:     "Nous finissons le travail.",
          subject:    "Nous",
          newSubject: "Il",
          answer:     "Il finit le travail.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Elle dessine un château.",
          subject:    "Elle",
          newSubject: "Elles",
          answer:     "Elles dessinent un château.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Vous choisissez un livre.",
          subject:    "Vous",
          newSubject: "Tu",
          answer:     "Tu choisis un livre.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Les oiseaux volent vers le sud.",
          subject:    "Les oiseaux",
          newSubject: "L'oiseau",
          answer:     "L'oiseau vole vers le sud.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Je marche jusqu'à l'école.",
          subject:    "Je",
          newSubject: "Nous",
          answer:     "Nous marchons jusqu'à l'école.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Il obéit aux consignes.",
          subject:    "Il",
          newSubject: "Ils",
          answer:     "Ils obéissent aux consignes.",
          rule:       "Les verbes du 2ème groupe prennent -issent à la 3ème personne du pluriel : ils finissent, ils obéissent."
        },
        {
          source:     "Les enfants jouent dans la cour.",
          subject:    "Les enfants",
          newSubject: "L'enfant",
          answer:     "L'enfant joue dans la cour.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Tu sautes par-dessus la barrière.",
          subject:    "Tu",
          newSubject: "Elle",
          answer:     "Elle saute par-dessus la barrière.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Nous regardons un film.",
          subject:    "Nous",
          newSubject: "Vous",
          answer:     "Vous regardez un film.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        },
        {
          source:     "Elle remplit son verre.",
          subject:    "Elle",
          newSubject: "Ils",
          answer:     "Ils remplissent leur verre.",
          rule:       "Les verbes du 2ème groupe prennent -issent à la 3ème personne du pluriel. Le possessif change aussi : son → leur."
        },
        {
          source:     "Le boulanger prépare le pain.",
          subject:    "Le boulanger",
          newSubject: "Les boulangers",
          answer:     "Les boulangers préparent le pain.",
          rule:       "Le verbe s'accorde toujours avec son sujet en personne et en nombre."
        }
      ],

      /* ── Niveau 2 — Changement de genre + nombre, adjectif attribut, présent et imparfait ── */
      2: [
        {
          source:     "Le directeur est sévère mais juste.",
          subject:    "Le directeur",
          newSubject: "La directrice",
          answer:     "La directrice est sévère mais juste.",
          rule:       "Les adjectifs sévère et juste sont invariables (même forme au masculin et au féminin). N'oublie pas d'accorder le verbe avec le nouveau sujet."
        },
        {
          source:     "Paul est content de ses résultats.",
          subject:    "Paul",
          newSubject: "Léa",
          answer:     "Léa est contente de ses résultats.",
          rule:       "L'adjectif attribut s'accorde en genre et en nombre avec le sujet : content → contente au féminin."
        },
        {
          source:     "Les garçons étaient fatigués après la course.",
          subject:    "Les garçons",
          newSubject: "Les filles",
          answer:     "Les filles étaient fatiguées après la course.",
          rule:       "L'adjectif attribut s'accorde en genre et en nombre avec le sujet : fatigués → fatiguées au féminin pluriel."
        },
        {
          source:     "Mon frère est grand et sportif.",
          subject:    "Mon frère",
          newSubject: "Ma sœur",
          answer:     "Ma sœur est grande et sportive.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : grand → grande, sportif → sportive au féminin."
        },
        {
          source:     "Elle semblait heureuse.",
          subject:    "Elle",
          newSubject: "Il",
          answer:     "Il semblait heureux.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : heureuse → heureux au masculin singulier."
        },
        {
          source:     "Le chien paraît doux et calme.",
          subject:    "Le chien",
          newSubject: "Les chiens",
          answer:     "Les chiens paraissent doux et calmes.",
          rule:       "L'adjectif attribut s'accorde en nombre avec le sujet : calme → calmes. Doux est invariable au masculin pluriel."
        },
        {
          source:     "Tu es prête pour le départ ?",
          subject:    "Tu",
          newSubject: "Vous",
          answers:    ["Vous êtes prêtes pour le départ ?", "Vous êtes prêts pour le départ ?"],
          answer:     "Vous êtes prêtes pour le départ ?",
          rule:       "L'adjectif attribut s'accorde avec le sujet en genre et en nombre : prête → prêts (masc. plur.) ou prêtes (fém. plur.)."
        },
        {
          source:     "Mes cousins étaient joyeux ce matin.",
          subject:    "Mes cousins",
          newSubject: "Mes cousines",
          answer:     "Mes cousines étaient joyeuses ce matin.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : joyeux → joyeuses au féminin pluriel."
        },
        {
          source:     "Il devenait impatient.",
          subject:    "Il",
          newSubject: "Elle",
          answer:     "Elle devenait impatiente.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : impatient → impatiente au féminin."
        },
        {
          source:     "Le vieux chat semblait fatigué.",
          subject:    "Le vieux chat",
          newSubject: "La vieille chatte",
          answer:     "La vieille chatte semblait fatiguée.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : fatigué → fatiguée au féminin. Vieux → vieille devant un nom féminin."
        },
        {
          source:     "Vous étiez prêts à partir.",
          subject:    "Vous",
          newSubject: "Tu",
          answer:     "Tu étais prêt à partir.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : prêts → prêt au masculin singulier. L'auxiliaire change aussi : étiez → étais."
        },
        {
          source:     "Les nouveaux élèves étaient timides.",
          subject:    "Les nouveaux élèves",
          newSubject: "Le nouvel élève",
          answer:     "Le nouvel élève était timide.",
          rule:       "Nouveau s'emploie nouvel devant un nom masculin commençant par une voyelle ou un h muet. Timide est invariable."
        },
        {
          source:     "Mon voisin est toujours souriant.",
          subject:    "Mon voisin",
          newSubject: "Mes voisines",
          answer:     "Mes voisines sont toujours souriantes.",
          rule:       "L'adjectif attribut s'accorde avec le sujet : souriant → souriantes au féminin pluriel."
        },
        {
          source:     "Les élèves sont attentifs.",
          subject:    "Les élèves",
          newSubject: "L'élève",
          answers:    ["L'élève est attentif.", "L'élève est attentive."],
          answer:     "L'élève est attentif.",
          rule:       "L'adjectif attribut s'accorde avec le sujet en genre et en nombre : attentifs → attentif (masc.) ou attentive (fém.) au singulier."
        }
      ],

      /* ── Niveau 3 — Participe passé avec être et avoir (passé composé, plus-que-parfait) ── */
      3: [
        {
          source:     "Il est parti sans prévenir.",
          subject:    "Il",
          newSubject: "Elle",
          answer:     "Elle est partie sans prévenir.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : parti → partie au féminin singulier."
        },
        {
          source:     "Les garçons sont arrivés en retard.",
          subject:    "Les garçons",
          newSubject: "Les filles",
          answer:     "Les filles sont arrivées en retard.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : arrivés → arrivées au féminin pluriel."
        },
        {
          source:     "Elle avait mangé avant de partir.",
          subject:    "Elle",
          newSubject: "Ils",
          answer:     "Ils avaient mangé avant de partir.",
          rule:       "Avec avoir, le participe passé ne s'accorde pas avec le sujet : mangé reste invariable. L'auxiliaire change : avait → avaient."
        },
        {
          source:     "Ma sœur est entrée dans la classe.",
          subject:    "Ma sœur",
          newSubject: "Mon frère",
          answer:     "Mon frère est entré dans la classe.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : entrée → entré au masculin singulier."
        },
        {
          source:     "Elles étaient venues nous voir.",
          subject:    "Elles",
          newSubject: "Ils",
          answer:     "Ils étaient venus nous voir.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : venues → venus au masculin pluriel."
        },
        {
          source:     "Tu es resté à la maison.",
          subject:    "Tu",
          newSubject: "Vous",
          answers:    ["Vous êtes restés à la maison.", "Vous êtes restées à la maison."],
          answer:     "Vous êtes restés à la maison.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : resté → restés (masc. plur.) ou restées (fém. plur.) selon le groupe."
        },
        {
          source:     "Nous avons fini le travail.",
          subject:    "Nous",
          newSubject: "Elle",
          answer:     "Elle a fini le travail.",
          rule:       "Avec avoir, le participe passé ne s'accorde pas avec le sujet : fini reste invariable. L'auxiliaire change : avons → a."
        },
        {
          source:     "Les élèves sont sortis en récréation.",
          subject:    "Les élèves",
          newSubject: "L'élève",
          answers:    ["L'élève est sortie en récréation.", "L'élève est sorti en récréation."],
          answer:     "L'élève est sortie en récréation.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet. Selon le genre de l'élève : sorti (masc.) ou sortie (fém.)."
        },
        {
          source:     "Il avait pris son sac.",
          subject:    "Il",
          newSubject: "Elles",
          answer:     "Elles avaient pris leur sac.",
          rule:       "Avec avoir, le participe passé ne s'accorde pas avec le sujet : pris reste invariable. Le possessif change : son → leur."
        },
        {
          source:     "La directrice est montée dans son bureau.",
          subject:    "La directrice",
          newSubject: "Les directrices",
          answer:     "Les directrices sont montées dans leur bureau.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : montée → montées au pluriel. Le possessif change : son → leur."
        },
        {
          source:     "Vous étiez partis tôt.",
          subject:    "Vous",
          newSubject: "Tu",
          answer:     "Tu étais parti tôt.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : partis → parti au masculin singulier. L'auxiliaire change : étiez → étais."
        },
        {
          source:     "Mes parents sont revenus de voyage.",
          subject:    "Mes parents",
          newSubject: "Ma mère",
          answer:     "Ma mère est revenue de voyage.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : revenus → revenue au féminin singulier. L'auxiliaire change : sont → est."
        },
        {
          source:     "Elle a écrit une lettre.",
          subject:    "Elle",
          newSubject: "Ils",
          answer:     "Ils ont écrit une lettre.",
          rule:       "Avec avoir, le participe passé ne s'accorde pas avec le sujet : écrit reste invariable. L'auxiliaire change : a → ont."
        },
        {
          source:     "Les filles étaient tombées dans la cour.",
          subject:    "Les filles",
          newSubject: "Le garçon",
          answer:     "Le garçon était tombé dans la cour.",
          rule:       "Avec être, le participe passé s'accorde avec le sujet : tombées → tombé au masculin singulier. L'auxiliaire change : étaient → était."
        }
      ],

      /* ── Niveau 4 — Pronoms indéfinis, sujets coordonnés, sujets inversés ── */
      4: [
        {
          source:     "Paul et Léa sont arrivés ensemble.",
          subject:    "Paul et Léa",
          newSubject: "Personne",
          answer:     "Personne n'est arrivé ensemble.",
          rule:       "\"Personne\" est un pronom indéfini masculin singulier qui entraîne la négation avec \"ne\" : Personne n'est arrivé (masculin singulier, invariable)."
        },
        {
          source:     "Chacun a fait son travail sérieusement.",
          subject:    "Chacun",
          newSubject: "Tous les élèves",
          answer:     "Tous les élèves ont fait leur travail sérieusement.",
          rule:       "\"Chacun\" est singulier ; \"tous les élèves\" est pluriel : a → ont. Le possessif change aussi : son → leur."
        },
        {
          source:     "Dans la forêt vivait un vieux loup gris.",
          subject:    "un vieux loup gris",
          newSubject: "de vieux loups gris",
          answer:     "Dans la forêt vivaient de vieux loups gris.",
          rule:       "Dans une phrase à sujet inversé, le verbe s'accorde avec le sujet réel qui est après lui : vivait → vivaient au pluriel."
        },
        {
          source:     "Ni Paul ni Léa n'était prêt.",
          subject:    "Ni Paul ni Léa",
          newSubject: "Paul et Léa",
          answer:     "Paul et Léa n'étaient pas prêts.",
          rule:       "Avec \"et\", le sujet est pluriel : n'était → n'étaient pas, prêt → prêts. La structure de la négation change."
        },
        {
          source:     "Tout le monde était content.",
          subject:    "Tout le monde",
          newSubject: "Les enfants",
          answer:     "Les enfants étaient contents.",
          rule:       "\"Tout le monde\" est singulier ; \"les enfants\" est masculin pluriel : était → étaient, content → contents."
        },
        {
          source:     "Mes amis et moi sommes partis tôt.",
          subject:    "Mes amis et moi",
          newSubject: "Mon amie et moi",
          answer:     "Mon amie et moi sommes parties tôt.",
          rule:       "Quand le sujet \"et moi\" ne contient que des féminins, on accorde au féminin pluriel : partis → parties."
        },
        {
          source:     "Aucun élève n'a répondu correctement.",
          subject:    "Aucun élève",
          newSubject: "Tous les élèves",
          answer:     "Tous les élèves ont répondu correctement.",
          rule:       "\"Aucun\" est singulier et entraîne la négation ; \"tous les élèves\" est pluriel : n'a → ont. La négation disparaît."
        },
        {
          source:     "La plupart des enfants étaient fatigués.",
          subject:    "La plupart des enfants",
          newSubject: "Chaque enfant",
          answer:     "Chaque enfant était fatigué.",
          rule:       "\"Chaque\" est toujours singulier et masculin ici : étaient → était, fatigués → fatigué."
        },
        {
          source:     "Sur la table étaient posés des livres.",
          subject:    "des livres",
          newSubject: "un livre",
          answer:     "Sur la table était posé un livre.",
          rule:       "Dans une phrase à sujet inversé, le verbe s'accorde avec le sujet réel : étaient posés → était posé au masculin singulier."
        },
        {
          source:     "Ni l'un ni l'autre n'avait compris.",
          subject:    "Ni l'un ni l'autre",
          newSubject: "Ils",
          answer:     "Ils n'avaient pas compris.",
          rule:       "\"Ils\" entraîne le pluriel et modifie la structure de la négation : n'avait → n'avaient pas."
        },
        {
          source:     "Mes sœurs et moi avons chanté.",
          subject:    "Mes sœurs et moi",
          newSubject: "Mon frère et moi",
          answer:     "Mon frère et moi avons chanté.",
          rule:       "Avec avoir, le participe passé est invariable : chanté reste invariable. Mon frère + moi forme un groupe masculin pluriel."
        },
        {
          source:     "Quelqu'un a frappé à la porte.",
          subject:    "Quelqu'un",
          newSubject: "Plusieurs personnes",
          answer:     "Plusieurs personnes ont frappé à la porte.",
          rule:       "\"Quelqu'un\" est singulier ; \"plusieurs personnes\" est pluriel féminin : a → ont. Frappé reste invariable (auxiliaire avoir)."
        }
      ]
    }
  },

  "ortho-mots-invariables": {
    title: "Les mots invariables",
    domaine:    "Français",
    competence: "Orthographe — Mots invariables",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "mots-invariables-serie",
    backLink: { href: "français-orthographe.html", label: "Orthographe" },

    level1Words: [
      "alors", "après", "assez", "aussi", "avant", "avec", "beaucoup",
      "bien", "bientôt", "car", "chez", "comme", "contre", "dans", "dedans",
      "dehors", "déjà", "demain", "depuis", "derrière", "dessous", "dessus",
      "devant", "donc", "encore", "enfin", "ensemble", "entre", "environ",
      "hier", "ici", "jamais", "là", "loin", "longtemps", "mais", "maintenant",
      "même", "moins", "non"
    ],

    level2Words: [
      "ailleurs", "ainsi", "alentour", "alors que", "auparavant", "aussitôt",
      "autant", "autrefois", "autrement", "auprès", "cependant", "certainement",
      "davantage", "désormais", "dorénavant", "effectivement", "également",
      "ensuite", "exprès", "facilement", "forcément", "guère", "hormis",
      "jadis", "jusqu'à", "lorsque", "malgré", "néanmoins", "notamment",
      "nulle part", "or", "parfois", "parmi", "partout", "pendant", "plutôt",
      "pourtant", "pourvu que", "presque", "puisque"
    ],

    level3Words: [
      { word: "quant",        context: "Quant à lui, il ne sait pas." },
      { word: "davantage",    context: "Il travaille davantage." },
      { word: "plutôt",       context: "Je préfère plutôt rester ici." },
      { word: "tandis que",   context: "Elle chante tandis que lui dessine." },
      { word: "voire",        context: "C'est difficile, voire impossible." },
      { word: "sinon",        context: "Dépêche-toi, sinon tu seras en retard." },
      { word: "désormais",    context: "Désormais, il fait attention." },
      { word: "cependant",    context: "Il était fatigué, cependant il continua." },
      { word: "néanmoins",    context: "C'est risqué, néanmoins je tente." },
      { word: "dorénavant",   context: "Dorénavant, tu rangeras ta chambre." },
      { word: "afin de",      context: "Il s'entraîne afin de progresser." },
      { word: "quoique",      context: "Quoiqu'il soit tard, il continue." },
      { word: "nonobstant",   context: "Nonobstant les difficultés, il réussit." },
      { word: "toutefois",    context: "Il était triste, toutefois il sourit." },
      { word: "par ailleurs", context: "Par ailleurs, il faut noter que…" },
      { word: "hormis",       context: "Hormis Paul, tout le monde est venu." },
      { word: "certes",       context: "Certes, c'est compliqué." },
      { word: "à moins que",  context: "Je viendrai, à moins qu'il pleuve." },
      { word: "pourvu que",   context: "Pourvu qu'il fasse beau demain !" },
      { word: "quoi que",     context: "Quoi qu'il arrive, sois courageux." }
    ]
  }

});

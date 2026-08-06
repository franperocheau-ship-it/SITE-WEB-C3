/* ── data/grammaire.js — Grammaire (18 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "identifier-adjectif": {
    title: "Identifier un adjectif",
    domaine:    "Français",
    competence: "Grammaire — L'adjectif",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },
    levelDescs: {
      "CM1": "Repérer un adjectif parmi plusieurs mots",
      "CM2": "Trouver tous les adjectifs dans une phrase",
      "6e":  "Trouver tous les adjectifs dans des phrases plus longues et plus riches"
    },
    homoShuffle: [false, true, false],

    /* Refonte en 3 niveaux (level1Bank/level2Bank/level3Bank), moteur
       générique "homophones-niveaux" — même schéma que identifier-nom-
       phrase (aucun nouveau moteur : chaque item porte son propre `type`,
       dispatché dans showQuestion() vers les renderers standards choix-
       etiquette / mots-cliquables / classification-etapes).
       Niveau 1 : mots isolés (choix-etiquette), l'élève choisit l'adjectif
       parmi 3 distracteurs de nature différente (nom/verbe/déterminant) —
       volontairement sans piège nom/adjectif pour rester simple.
       Niveau 2 : mots-cliquables, l'élève clique tous les adjectifs d'une
       phrase ; la position varie (épithète avant/après le nom, attribut du
       sujet) pour éviter un repérage purement positionnel.
       Niveau 3 : mots-cliquables (même primitive qu'au niveau 2, une seule
       étape, pas de "Étape 1"/classification) — identifier TOUS les
       adjectifs d'une phrase plus riche/longue que le niveau 2 (plusieurs
       adjectifs par phrase, épithètes avant ET après le nom, structures
       plus complexes). Pas de volet gentilés/nationalités ni de
       classification nom/adjectif : mélanger des réponses "ce n'est pas
       un adjectif" dans une banque censée faire identifier des adjectifs
       créait une confusion pédagogique, et le double palier de clic
       (repérer puis classer) était superflu dès lors que la seule
       réponse possible était toujours "Adjectif". Chaque item ci-dessous
       a été vérifié mot à mot : tous les `targets` sont des adjectifs
       qualificatifs réels (aucun déterminant comme « plusieurs »/
       « quelques », aucun participe employé comme verbe, aucun gentilé/
       nom de nationalité). */

    level1Bank: [
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"rouge · voiture · manger · les", choices:["rouge","voiture","manger","les"], answer:"rouge",
        hint:"« rouge » est un adjectif de couleur : il décrit un nom (une pomme rouge)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"grand · arbre · sauter · un", choices:["grand","arbre","sauter","un"], answer:"grand",
        hint:"« grand » est un adjectif de taille : il décrit un nom (un grand arbre)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"gentil · enfant · parler · des", choices:["gentil","enfant","parler","des"], answer:"gentil",
        hint:"« gentil » est un adjectif de caractère : il décrit un nom (un enfant gentil)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"rond · ballon · rouler · ce", choices:["rond","ballon","rouler","ce"], answer:"rond",
        hint:"« rond » est un adjectif de forme : il décrit un nom (un ballon rond)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"bleue · robe · danser · cette", choices:["bleue","robe","danser","cette"], answer:"bleue",
        hint:"« bleue » est un adjectif de couleur : il décrit un nom (une robe bleue)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"petit · chat · dormir · mon", choices:["petit","chat","dormir","mon"], answer:"petit",
        hint:"« petit » est un adjectif de taille : il décrit un nom (un petit chat)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"courageux · pompier · éteindre · le", choices:["courageux","pompier","éteindre","le"], answer:"courageux",
        hint:"« courageux » est un adjectif de caractère : il décrit un nom (un pompier courageux)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"carrée · table · poser · une", choices:["carrée","table","poser","une"], answer:"carrée",
        hint:"« carrée » est un adjectif de forme : il décrit un nom (une table carrée)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"verte · prairie · brouter · la", choices:["verte","prairie","brouter","la"], answer:"verte",
        hint:"« verte » est un adjectif de couleur : il décrit un nom (une prairie verte)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"joyeux · clown · amuser · ces", choices:["joyeux","clown","amuser","ces"], answer:"joyeux",
        hint:"« joyeux » est un adjectif de caractère : il décrit un nom (un clown joyeux)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"pointu · crayon · tailler · ce", choices:["pointu","crayon","tailler","ce"], answer:"pointu",
        hint:"« pointu » est un adjectif de forme : il décrit un nom (un crayon pointu)." },
      { type:"choix-etiquette", instruction:"Clique sur l'adjectif parmi ces mots.",
        word:"timide · élève · répondre · cet", choices:["timide","élève","répondre","cet"], answer:"timide",
        hint:"« timide » est un adjectif de caractère : il décrit un nom (un élève timide)." }
    ],

    level2Bank: [
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Une jolie maison borde la rivière .", targets:["jolie"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le chat noir dort sur le canapé .", targets:["noir"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le ciel est gris aujourd'hui .", targets:["gris"],
        piege:{ "aujourd'hui": "« aujourd'hui » est un adverbe de temps, pas un adjectif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Cette grande forêt cache un vieux sentier .", targets:["grande","vieux"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Mon frère est fatigué ce soir .", targets:["fatigué"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Les enfants heureux jouent dans le jardin .", targets:["heureux"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Cette petite fille porte une robe rouge .", targets:["petite","rouge"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le vieux marin raconte une histoire captivante .", targets:["vieux","captivante"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Ton nouveau vélo est très rapide .", targets:["nouveau","rapide"],
        piege:{ "très": "« très » est un adverbe d'intensité, pas un adjectif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"La mer semble calme ce matin .", targets:["calme"], piege:{} }
    ],

    level3Bank: [
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le vieux chat noir dormait paisiblement sur le canapé confortable de sa maîtresse fatiguée .",
        targets:["vieux","noir","confortable","fatiguée"],
        piege:{ "paisiblement": "« paisiblement » est un adverbe de manière, pas un adjectif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"La grande maison blanche possède un magnifique jardin fleuri où jouent des enfants heureux .",
        targets:["grande","blanche","magnifique","fleuri","heureux"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le jeune pêcheur courageux affronta bravement la mer agitée et rentra chez lui , épuisé mais fier .",
        targets:["jeune","courageux","agitée","épuisé","fier"],
        piege:{ "bravement": "« bravement » est un adverbe de manière, pas un adjectif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Cette petite librairie ancienne vend de vieux livres poussiéreux à des clients passionnés .",
        targets:["petite","ancienne","vieux","poussiéreux","passionnés"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Ce jeune artiste talentueux peint de superbes tableaux colorés dans son petit atelier lumineux .",
        targets:["jeune","talentueux","superbes","colorés","petit","lumineux"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"La vieille horloge dorée sonnait doucement dans le grand salon silencieux .",
        targets:["vieille","dorée","grand","silencieux"],
        piege:{ "doucement": "« doucement » est un adverbe de manière, pas un adjectif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le petit village tranquille abrite une jolie église ancienne et plusieurs maisons colorées .",
        targets:["petit","tranquille","jolie","ancienne","colorées"],
        piege:{ "plusieurs": "« plusieurs » est un déterminant indéfini, pas un adjectif qualificatif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Cette immense forêt sombre cache de nombreux animaux sauvages et quelques ruines mystérieuses .",
        targets:["immense","sombre","nombreux","sauvages","mystérieuses"],
        piege:{ "quelques": "« quelques » est un déterminant indéfini, pas un adjectif qualificatif." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Le petit garçon timide observait le magicien habile avec de grands yeux curieux .",
        targets:["petit","timide","habile","grands","curieux"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les adjectifs de la phrase.",
        sentence:"Cette jeune institutrice patiente explique de longues leçons compliquées à des élèves attentifs .",
        targets:["jeune","patiente","longues","compliquées","attentifs"], piege:{} }
    ]
  },

  "identifier-attribut-sujet": {
    title: "Identifier un attribut du sujet",
    domaine:    "Français",
    competence: "Grammaire — L'attribut du sujet",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },
    levelDescs: {
      "CM1": "Reconnaître un verbe d'état parmi des verbes d'action",
      "CM2": "Relier dans l'ordre le nom, l'adjectif attribut et le verbe d'état",
      "6e":  "Distinguer l'adjectif attribut du sujet de l'adjectif épithète"
    },
    homoShuffle: [false, true, false],

    /* Refonte en 3 niveaux (level1Bank/level2Bank/level3Bank), moteur
       générique "homophones-niveaux" — même schéma qu'identifier-adjectif/
       identifier-nom-phrase (aucun nouveau moteur dédié : chaque item porte
       son propre `type`, dispatché dans showQuestion() vers les renderers
       standards). Niveaux 2 et 3 s'appuient tous deux sur une extension
       générique et rétrocompatible ajoutée pour cette compétence :
       renderMotsCliquables accepte désormais un champ `steps` optionnel
       (liste ordonnée de { instruction, targets, cssClass }) pour un
       enchaînement de clics à rôles distincts — sans `steps`, un item
       "mots-cliquables" se comporte exactement comme avant. Réutilisable
       par toute future compétence.

       Niveau 1 : choix-etiquette — trouver le verbe d'état parmi 3 verbes
       d'action, temps variés (présent/imparfait/passé composé) pour ne pas
       faire reposer la reconnaissance sur la terminaison plutôt que sur le
       sens.
       Niveau 2 : mots-cliquables en 3 étapes séquentielles (nom → jaune,
       adjectif attribut → turquoise, verbe d'état → navy encadré) sur des
       phrases à un seul GN sujet et un seul adjectif candidat (pas de piège
       nom/adjectif à ce niveau, l'enjeu est l'enchaînement des 3 rôles).
       Niveau 3 : mots-cliquables en 3 étapes (nom → jaune, adjectif attribut
       → turquoise, TOUS les adjectifs épithètes de la phrase → gold) sur des
       phrases contenant 1 ou 2 épithètes en plus de l'attribut — l'étape 3
       accepte plusieurs cibles (cf. `targets` à 2 éléments) et l'attribut
       déjà trouvé à l'étape 2 est verrouillé (disabled), donc jamais
       re-cliquable par erreur à l'étape 3. */

    level1Bank: [
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"est · court · joue · mange", choices:["est","court","joue","mange"], answer:"est",
        hint:"« être » est un verbe d'état : il ne montre pas une action, il relie le sujet à ce qu'on dit de lui." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"semble · dessine · chante · saute", choices:["semble","dessine","chante","saute"], answer:"semble",
        hint:"« sembler » est un verbe d'état : il indique une apparence, pas une action." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"deviennent · parlent · écoutent · lisent", choices:["deviennent","parlent","écoutent","lisent"], answer:"deviennent",
        hint:"« devenir » est un verbe d'état : il indique un changement d'état, pas une action." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"paraît · travaille · nage · écrit", choices:["paraît","travaille","nage","écrit"], answer:"paraît",
        hint:"« paraître » est un verbe d'état : il indique une apparence, pas une action." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"reste · marche · dort · crie", choices:["reste","marche","dort","crie"], answer:"reste",
        hint:"« rester » est un verbe d'état ici : le sujet garde un état, il ne fait pas d'action." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes (ou groupes de mots).",
        word:"ont l'air · construisent · réparent · jettent", choices:["ont l'air","construisent","réparent","jettent"], answer:"ont l'air",
        hint:"« avoir l'air » est une expression verbale d'état : elle indique une apparence, comme « sembler »." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"étaient · couraient · dansaient · pleuraient", choices:["étaient","couraient","dansaient","pleuraient"], answer:"étaient",
        hint:"« être » à l'imparfait reste un verbe d'état : il ne montre pas d'action." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"semblait · regardait · tombait · criait", choices:["semblait","regardait","tombait","criait"], answer:"semblait",
        hint:"« sembler » à l'imparfait est un verbe d'état : il indique une apparence." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes (ou groupes de mots).",
        word:"est devenu · a grandi · a couru · a sauté", choices:["est devenu","a grandi","a couru","a sauté"], answer:"est devenu",
        hint:"« devenir » au passé composé reste un verbe d'état : il indique un changement d'état, pas une action." },
      { type:"choix-etiquette", instruction:"Trouve le verbe d'état parmi ces 4 verbes.",
        word:"restent · jouent · mangent · dessinent", choices:["restent","jouent","mangent","dessinent"], answer:"restent",
        hint:"« rester » est un verbe d'état ici : le sujet garde un état, il ne fait pas d'action." }
    ],

    level2Bank: [
      { type:"mots-cliquables", sentence:"Le ciel est gris .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["ciel"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["gris"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["est"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Cette soupe semble délicieuse .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["soupe"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["délicieuse"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["semble"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Mes cousins paraissent fatigués .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["cousins"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["fatigués"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["paraissent"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"La forêt reste silencieuse .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["forêt"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["silencieuse"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["reste"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Les élèves ont l'air contents .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["élèves"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["contents"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état (2 mots).", targets:["ont","l'air"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Ce livre est devenu célèbre .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["livre"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["célèbre"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état (2 mots).", targets:["est","devenu"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"La maison paraissait abandonnée .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["maison"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["abandonnée"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["paraissait"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Les enfants semblaient heureux .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["enfants"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["heureux"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["semblaient"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Le repas semble savoureux .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["repas"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["savoureux"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["semble"], cssClass:"attr-verbe" }
        ] },
      { type:"mots-cliquables", sentence:"Les acteurs paraissent nerveux .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["acteurs"], cssClass:"attr-nom" },
          { instruction:"Clique maintenant sur l'adjectif attribut du sujet.", targets:["nerveux"], cssClass:"attr-adj" },
          { instruction:"Clique maintenant sur le verbe d'état.", targets:["paraissent"], cssClass:"attr-verbe" }
        ] }
    ],

    level3Bank: [
      { type:"mots-cliquables", sentence:"Le grand chat noir est agile .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["chat"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["agile"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["grand","noir"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Cette jolie fleur rouge semble fanée .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["fleur"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["fanée"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["jolie","rouge"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Le vieux pont paraît solide .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["pont"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["solide"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["vieux"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Ma petite sœur est timide .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["sœur"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["timide"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["petite"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Ce long voyage était fatigant .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["voyage"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["fatigant"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["long"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Les belles montagnes restent majestueuses .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["montagnes"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["majestueuses"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["belles"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Un jeune chien curieux semble effrayé .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["chien"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["effrayé"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["jeune","curieux"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"La nouvelle élève paraît sympathique .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["élève"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["sympathique"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["nouvelle"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Ce vieux professeur patient reste calme .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["professeur"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["calme"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["vieux","patient"], cssClass:"attr-epithete" }
        ] },
      { type:"mots-cliquables", sentence:"Ma jeune cousine timide semble ravie .",
        steps: [
          { instruction:"Clique sur le nom.", targets:["cousine"], cssClass:"attr-nom" },
          { instruction:"Clique sur l'adjectif attribut du sujet.", targets:["ravie"], cssClass:"attr-adj" },
          { instruction:"Clique sur tous les adjectifs épithètes de la phrase.", targets:["jeune","timide"], cssClass:"attr-epithete" }
        ] }
    ]
  },

  "identifier-adverbe-frequent": {
    title:   "Identifier les adverbes",
    domaine:    "Français",
    competence: "Grammaire — L'adverbe",
    levels:  ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type:    "adv-niveaux",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : un seul adverbe à trouver par phrase ────────────────────
       targets : l'adverbe attendu (tableau à un seul élément)
       piege   : message affiché si l'élève clique sur un mot-piège
    ──────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Le chat dort tranquillement sous la table .",
        targets: ["tranquillement"],
        piege: { "sous": "« sous » est une préposition : elle introduit le complément de lieu « la table »." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Nous partirons demain matin .",
        targets: ["demain"],
        piege: { "matin": "« matin » est un nom : il précise le moment, mais ce n'est pas lui qui modifie le verbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Elle chante très bien .",
        targets: ["très"],
        piege: { "bien": "« bien » est aussi un adverbe ici, mais c'est « très » qui modifie « bien » : c'est l'adverbe attendu dans cette phrase." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Il court vite dans la cour .",
        targets: ["vite"],
        piege: { "dans": "« dans » est une préposition : elle introduit le complément de lieu « la cour »." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Nous sommes souvent en retard .",
        targets: ["souvent"],
        piege: { "en": "« en » est ici une préposition (dans le groupe « en retard »), pas un adverbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Elle parle doucement à son frère .",
        targets: ["doucement"],
        piege: { "à": "« à » est une préposition : elle introduit le complément « son frère »." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Ils arrivent bientôt à la gare .",
        targets: ["bientôt"],
        piege: { "gare": "« gare » est un nom, pas un adverbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Le ciel est déjà sombre .",
        targets: ["déjà"],
        piege: { "sombre": "« sombre » est un adjectif : il qualifie le nom « ciel »." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Mon père conduit prudemment en ville .",
        targets: ["prudemment"],
        piege: { "conduit": "« conduit » est un verbe conjugué, pas un adverbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Les enfants jouent dehors toute la journée .",
        targets: ["dehors"],
        piege: { "journée": "« journée » est un nom, pas un adverbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Il a beaucoup travaillé ce week-end .",
        targets: ["beaucoup"],
        piege: { "travaillé": "« travaillé » est un participe passé, pas un adverbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Nous reviendrons ici la semaine prochaine .",
        targets: ["ici"],
        piege: { "semaine": "« semaine » est un nom, pas un adverbe." } },
      { instruction: "Clique sur l'adverbe de cette phrase.",
        sentence: "Le vent souffle fort sur la plage .",
        targets: ["fort"],
        piege: { "plage": "« plage » est un nom, complément de lieu." } }
    ],

    /* ── Niveau 2 : plusieurs adverbes à trouver par phrase ─────────────────
       targets : tous les adverbes attendus
       classes : classe sémantique de chaque adverbe (manière, temps, lieu,
                 intensité, négation) — affichée dans le feedback
       piege   : message affiché si l'élève clique sur un mot-piège (ex. « ne »)
    ──────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Il parle très doucement .",
        targets: ["très", "doucement"],
        classes: { "très": "intensité", "doucement": "manière" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Elle est toujours là quand on a besoin d' elle .",
        targets: ["toujours", "là"],
        classes: { "toujours": "temps", "là": "lieu" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Nous partirons bientôt ensemble .",
        targets: ["bientôt", "ensemble"],
        classes: { "bientôt": "temps", "ensemble": "manière" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Le chien aboie souvent trop fort .",
        targets: ["souvent", "trop", "fort"],
        classes: { "souvent": "temps", "trop": "intensité", "fort": "manière" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Il ne vient jamais ici .",
        targets: ["jamais", "ici"],
        classes: { "jamais": "négation", "ici": "lieu" },
        piege: { "ne": "« ne » fait partie de la négation avec « jamais », mais c'est « jamais » qui est l'adverbe." } },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Elle travaille beaucoup et bien .",
        targets: ["beaucoup", "bien"],
        classes: { "beaucoup": "intensité", "bien": "manière" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Nous sortirons peut-être demain .",
        targets: ["peut-être", "demain"],
        classes: { "peut-être": "manière", "demain": "temps" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Il ne mange jamais beaucoup le matin .",
        targets: ["jamais", "beaucoup"],
        classes: { "jamais": "négation", "beaucoup": "intensité" },
        piege: { "ne": "« ne » fait partie de la négation, mais l'adverbe est « jamais »." } },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Elle chante vraiment très bien .",
        targets: ["vraiment", "très", "bien"],
        classes: { "vraiment": "intensité", "très": "intensité", "bien": "manière" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Ils habitent loin et reviennent souvent .",
        targets: ["loin", "souvent"],
        classes: { "loin": "lieu", "souvent": "temps" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Elle ne dort jamais assez profondément .",
        targets: ["jamais", "assez", "profondément"],
        classes: { "jamais": "négation", "assez": "intensité", "profondément": "manière" },
        piege: { "ne": "« ne » accompagne la négation, mais l'adverbe est « jamais »." } },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Nous arriverons probablement très tard .",
        targets: ["probablement", "très", "tard"],
        classes: { "probablement": "manière", "très": "intensité", "tard": "temps" },
        piege: {} },
      { instruction: "Clique sur tous les adverbes de cette phrase.",
        sentence: "Ici , il pleut souvent fort .",
        targets: ["Ici", "souvent", "fort"],
        classes: { "Ici": "lieu", "souvent": "temps", "fort": "manière" },
        piege: {} }
    ],

    /* ── Niveau 3 : l'adverbe et ce qu'il modifie ────────────────────────────
       adverb       : l'adverbe à cliquer en étape 1 (forme exacte dans la phrase)
       step2Answer  : une des 4 valeurs de ADV_CHOICES3
       modifiedWord : mot modifié à surligner dans le récapitulatif (null pour
                      les adverbes qui modifient la phrase entière)
       semClass     : classe sémantique affichée dans le récapitulatif
    ──────────────────────────────────────────────────────────────────────── */
    lvl3Bank: [
      { sentence: "Elle court rapidement .", adverb: "rapidement",
        step2Answer: "un verbe", modifiedWord: "court", semClass: "manière" },
      { sentence: "C' est vraiment beau .", adverb: "vraiment",
        step2Answer: "un adjectif", modifiedWord: "beau", semClass: "intensité" },
      { sentence: "Il parle trop vite .", adverb: "trop",
        step2Answer: "un autre adverbe", modifiedWord: "vite", semClass: "intensité" },
      { sentence: "Heureusement , il est arrivé à temps .", adverb: "Heureusement",
        step2Answer: "une phrase entière", modifiedWord: null, semClass: "valeur de phrase" },
      { sentence: "Elle est peu courageuse .", adverb: "peu",
        step2Answer: "un adjectif", modifiedWord: "courageuse", semClass: "intensité" },
      { sentence: "Il marche lentement .", adverb: "lentement",
        step2Answer: "un verbe", modifiedWord: "marche", semClass: "manière" },
      { sentence: "Cette robe est très élégante .", adverb: "très",
        step2Answer: "un adjectif", modifiedWord: "élégante", semClass: "intensité" },
      { sentence: "Il conduit assez prudemment .", adverb: "assez",
        step2Answer: "un autre adverbe", modifiedWord: "prudemment", semClass: "intensité" },
      { sentence: "Malheureusement , le train est parti .", adverb: "Malheureusement",
        step2Answer: "une phrase entière", modifiedWord: null, semClass: "valeur de phrase" },
      { sentence: "Nous arriverons bientôt .", adverb: "bientôt",
        step2Answer: "un verbe", modifiedWord: "arriverons", semClass: "temps" },
      { sentence: "Ce gâteau est extrêmement bon .", adverb: "extrêmement",
        step2Answer: "un adjectif", modifiedWord: "bon", semClass: "intensité" },
      { sentence: "Elle parle si doucement .", adverb: "si",
        step2Answer: "un autre adverbe", modifiedWord: "doucement", semClass: "intensité" },
      { sentence: "Finalement , ils ont gagné le match .", adverb: "Finalement",
        step2Answer: "une phrase entière", modifiedWord: null, semClass: "valeur de phrase" }
    ]
  },

  "identifier-nom-phrase": {
    title: "Identifier un nom",
    domaine:    "Français",
    competence: "Grammaire — Le nom",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },
    levelDescs: {
      "CM1": "Repérer un nom parmi plusieurs mots",
      "CM2": "Trouver tous les noms dans une phrase",
      "6e":  "Distinguer nom commun et nom propre, y compris les cas particuliers"
    },
    homoShuffle: [false, true, false],

    /* Refonte en 3 niveaux (level1Bank/level2Bank/level3Bank), moteur
       générique "homophones-niveaux" (aucun nouveau moteur : chaque item
       porte son propre `type`, dispatché dans showQuestion() vers les
       renderers standards choix-etiquette / mots-cliquables /
       classification-etapes déjà utilisés ailleurs sur le site).
       Niveau 1 : mots isolés (choix-etiquette), l'élève choisit le nom
       parmi 3 distracteurs d'une autre nature (verbe/adjectif/adverbe) —
       volontairement sans piège adjectif/nom pour rester simple.
       Niveau 2 : mots-cliquables, l'élève clique tous les noms d'une
       phrase ; la position du nom par rapport au déterminant varie (collé
       ou avec un adjectif intercalé) pour éviter un repérage purement
       positionnel.
       Niveau 3 : classification-etapes (Nom commun / Nom propre) sur des
       phrases plus riches, incluant des gentilés substantivés (Français,
       Parisiens, Italiens, Espagnols) opposés dans la même phrase à leur
       emploi adjectival (français, parisien...) pour travailler
       l'ambiguïté adjectif qualificatif / nom propre substantivé. */

    level1Bank: [
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"table · manger · bleu · doucement", choices:["table","manger","bleu","doucement"], answer:"table",
        hint:"« table » est un nom : on peut dire « la table », « une table »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"chien · courir · rapide · joyeusement", choices:["chien","courir","rapide","joyeusement"], answer:"chien",
        hint:"« chien » est un nom (il désigne un animal) : on peut dire « le chien », « un chien »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"bonheur · chanter · triste · vite", choices:["bonheur","chanter","triste","vite"], answer:"bonheur",
        hint:"« bonheur » est un nom abstrait : on peut dire « le bonheur », « un grand bonheur »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"professeur · enseigner · gentil · lentement", choices:["professeur","enseigner","gentil","lentement"], answer:"professeur",
        hint:"« professeur » est un nom (il désigne une personne) : on peut dire « le professeur », « un professeur »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"liberté · libérer · libre · librement", choices:["liberté","libérer","libre","librement"], answer:"liberté",
        hint:"« liberté » est un nom abstrait : on peut dire « la liberté »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"montagne · grimper · haute · difficilement", choices:["montagne","grimper","haute","difficilement"], answer:"montagne",
        hint:"« montagne » est un nom : on peut dire « la montagne », « une montagne »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"oiseau · voler · léger · silencieusement", choices:["oiseau","voler","léger","silencieusement"], answer:"oiseau",
        hint:"« oiseau » est un nom (il désigne un animal) : on peut dire « l'oiseau », « un oiseau »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"courage · oser · courageux · courageusement", choices:["courage","oser","courageux","courageusement"], answer:"courage",
        hint:"« courage » est un nom abstrait : on peut dire « le courage », « du courage »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"voiture · rouler · rapide · vite", choices:["voiture","rouler","rapide","vite"], answer:"voiture",
        hint:"« voiture » est un nom : on peut dire « la voiture », « une voiture »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"enfant · jouer · petit · joyeusement", choices:["enfant","jouer","petit","joyeusement"], answer:"enfant",
        hint:"« enfant » est un nom (il désigne une personne) : on peut dire « l'enfant », « un enfant »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"amitié · aimer · amical · amicalement", choices:["amitié","aimer","amical","amicalement"], answer:"amitié",
        hint:"« amitié » est un nom abstrait : on peut dire « l'amitié », « une grande amitié »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"fleur · pousser · jolie · doucement", choices:["fleur","pousser","jolie","doucement"], answer:"fleur",
        hint:"« fleur » est un nom : on peut dire « la fleur », « une fleur »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"poisson · nager · argenté · silencieusement", choices:["poisson","nager","argenté","silencieusement"], answer:"poisson",
        hint:"« poisson » est un nom (il désigne un animal) : on peut dire « le poisson », « un poisson »." },
      { type:"choix-etiquette", instruction:"Clique sur le nom parmi ces mots.",
        word:"tristesse · pleurer · triste · tristement", choices:["tristesse","pleurer","triste","tristement"], answer:"tristesse",
        hint:"« tristesse » est un nom abstrait : on peut dire « la tristesse »." }
    ],

    level2Bank: [
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Le chien mange sa gamelle .", targets:["chien","gamelle"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Le petit chat dort sur le tapis .", targets:["chat","tapis"],
        piege:{ "petit": "« petit » est un adjectif : il décrit le nom « chat », il n'est pas un nom lui-même." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Les enfants lisent une belle histoire .", targets:["enfants","histoire"],
        piege:{ "belle": "« belle » est un adjectif : il décrit le nom « histoire »." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Ma grande sœur prépare le repas .", targets:["sœur","repas"],
        piege:{ "grande": "« grande » est un adjectif : il décrit le nom « sœur »." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Un vieux marin raconte son histoire .", targets:["marin","histoire"],
        piege:{ "vieux": "« vieux » est un adjectif : il décrit le nom « marin »." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Le professeur explique la leçon difficile .", targets:["professeur","leçon"],
        piege:{ "difficile": "« difficile » est un adjectif : il décrit le nom « leçon »." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Cette jolie maison a un grand jardin .", targets:["maison","jardin"],
        piege:{ "jolie": "« jolie » est un adjectif : il décrit le nom « maison ».", "grand": "« grand » est un adjectif : il décrit le nom « jardin »." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Les élèves rangent leurs cahiers .", targets:["élèves","cahiers"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"Mon jeune frère adore les animaux sauvages .", targets:["frère","animaux"],
        piege:{ "jeune": "« jeune » est un adjectif : il décrit le nom « frère ».", "sauvages": "« sauvages » est un adjectif : il décrit le nom « animaux »." } },
      { type:"mots-cliquables", instruction:"Clique sur tous les noms de la phrase.",
        sentence:"La vieille dame nourrit les oiseaux du parc .", targets:["dame","oiseaux","parc"],
        piege:{ "vieille": "« vieille » est un adjectif : il décrit le nom « dame »." } }
    ],

    level3Bank: [
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Les Français apprécient ce fromage typiquement français .",
        step1Instruction:"Clique sur le mot qui désigne les habitants de la France (le nom, pas l'adjectif).",
        step1Targets:["Français"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Les Parisiens aiment se promener , mais leur voisin a un accent parisien très fort .",
        step1Instruction:"Clique sur le mot qui désigne les habitants de Paris (le nom, pas l'adjectif).",
        step1Targets:["Parisiens"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Les Italiens cuisinent de bons plats , et ce restaurant italien est réputé .",
        step1Instruction:"Clique sur le mot qui désigne les habitants de l'Italie (le nom, pas l'adjectif).",
        step1Targets:["Italiens"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Les Espagnols dansent le flamenco , et ce guitariste espagnol est très doué .",
        step1Instruction:"Clique sur le mot qui désigne les habitants de l'Espagne (le nom, pas l'adjectif).",
        step1Targets:["Espagnols"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Le vieux libraire range soigneusement les nombreux livres sur la grande étagère .",
        step1Instruction:"Clique sur le mot qui désigne la personne qui vend des livres.",
        step1Targets:["libraire"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom commun" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Chaque été , la famille Dupont part en vacances à Madrid pour visiter le musée .",
        step1Instruction:"Clique sur le nom de la ville visitée.",
        step1Targets:["Madrid"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Pendant la récréation , Léa raconte une histoire drôle à ses camarades de classe .",
        step1Instruction:"Clique sur le prénom de l'élève qui raconte l'histoire.",
        step1Targets:["Léa"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Malgré la fatigue , cette athlète a montré un courage remarquable devant le public .",
        step1Instruction:"Clique sur le mot qui désigne cette qualité, malgré la fatigue.",
        step1Targets:["courage"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom commun" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Le bateau descend lentement la Seine avant de rejoindre la grande cathédrale .",
        step1Instruction:"Clique sur le nom du fleuve traversé par le bateau.",
        step1Targets:["Seine"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom propre" },
      { type:"classification-etapes",
        instruction:"Clique sur le nom demandé, puis indique s'il s'agit d'un nom commun ou d'un nom propre.",
        sentence:"Au fond du jardin , un jeune renard cherche de la nourriture près de la vieille cabane .",
        step1Instruction:"Clique sur le mot qui désigne l'animal qui cherche de la nourriture.",
        step1Targets:["renard"],
        step2Instruction:"Ce mot est-il un nom commun ou un nom propre ?",
        classifyChoices:["Nom commun","Nom propre"], step2Answer:"Nom commun" }
    ]
  },

  "identifier-verbe-conjugue": {
    title: "Identifier un verbe conjugué",
    domaine:    "Français",
    competence: "Grammaire — Le verbe",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur — cohérent avec les anciennes
                       tentatives "Niveau 1/2/3" de la page autonome (analytics enseignant) */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },
    levelDescs: {
      "CM1": "Repérer le verbe conjugué dans une phrase simple",
      "CM2": "Reconnaître le verbe conjugué malgré les pièges (infinitif, nom, passé composé)",
      "6e":  "Repérer un ou plusieurs verbes conjugués dans des phrases plus complexes"
    },
    homoShuffle: [false, true, false],

    /* Migration depuis l'ancienne page autonome francais/grammaire/identifier-
       verbe-conjugue/ (moteur JS dédié, hors EXERCISE_DATA) vers le moteur
       générique "homophones-niveaux" : chaque item est du type mots-cliquables
       déjà utilisé ailleurs sur le site (ex. identifier-nom-phrase/level2Bank),
       ce qui suffit à couvrir les 3 niveaux sans nouveau renderer — le clic
       gère nativement plusieurs cibles (verbes composés du type "a terminé",
       ou phrases à deux verbes conjugués).
       Niveau 1 : un seul verbe conjugué évident, aucun piège.
       Niveau 2 : temps variés (présent/imparfait/futur/passé composé) et
       pièges classiques (infinitif, nom homographe) signalés via `piege`.
       Niveau 3 : phrases plus riches, parfois deux verbes conjugués à la
       fois, pièges participe passé employé comme adjectif. */

    level1Bank: [
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Le chat dort sur le canapé .", targets:["dort"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Les élèves écoutent la maîtresse .", targets:["écoutent"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Papa prépare le repas .", targets:["prépare"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Nous jouons dans la cour .", targets:["jouons"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Le vent souffle très fort .", targets:["souffle"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Ma sœur dessine un cheval .", targets:["dessine"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Vous chantez une jolie chanson .", targets:["chantez"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Les oiseaux volent dans le ciel .", targets:["volent"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Je range ma chambre .", targets:["range"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Tu regardes un dessin animé .", targets:["regardes"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Le facteur distribue le courrier .", targets:["distribue"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase.",
        sentence:"Les abeilles butinent les fleurs .", targets:["butinent"], piege:{} }
    ],

    level2Bank: [
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Demain , nous partirons en voyage .", targets:["partirons"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Il veut manger une glace .", targets:["veut"],
        piege:{ "manger": "« manger » est un verbe à l'infinitif : il ne se conjugue pas, il ne change pas selon le sujet. Le verbe conjugué est « veut »." } },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Hier , Léa a terminé son dessin .", targets:["a","terminé"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Le dîner refroidit sur la table .", targets:["refroidit"],
        piege:{ "dîner": "« dîner » est un nom ici (le repas du soir) : on peut dire « le dîner ». Le verbe conjugué est « refroidit »." } },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Avant , mon frère jouait au tennis .", targets:["jouait"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Elle espère gagner la course .", targets:["espère"],
        piege:{ "gagner": "« gagner » est un verbe à l'infinitif : il ne se conjugue pas. Le verbe conjugué est « espère »." } },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Nous avons visité un château .", targets:["avons","visité"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"La marche rapide fatigue les jambes .", targets:["fatigue"],
        piege:{ "marche": "« marche » est un nom ici (l'activité de marcher) : on peut dire « la marche ». Le verbe conjugué est « fatigue »." } },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Vous finirez vos devoirs ce soir .", targets:["finirez"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le verbe conjugué de la phrase (un ou deux mots si le verbe est composé).",
        sentence:"Tu aimes lire des bandes dessinées .", targets:["aimes"],
        piege:{ "lire": "« lire » est un verbe à l'infinitif : il ne se conjugue pas. Le verbe conjugué est « aimes »." } }
    ],

    level3Bank: [
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Quand la cloche sonne , les élèves rangent leurs affaires .", targets:["sonne","rangent"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"La porte fermée grince quand on la pousse .", targets:["grince","pousse"],
        piege:{ "fermée": "« fermée » est un participe passé employé ici comme adjectif : il décrit le nom « porte ». Ce n'est pas le verbe conjugué (qui est « grince »)." } },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Mon voisin est très gentil .", targets:["est"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Elle prend son manteau et sort rapidement .", targets:["prend","sort"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Fatigués , les coureurs veulent s'arrêter .", targets:["veulent"],
        piege:{ "Fatigués": "« Fatigués » est un participe passé employé ici comme adjectif : il décrit les coureurs. Ce n'est pas le verbe conjugué (qui est « veulent »).",
                 "s'arrêter": "« s'arrêter » est un verbe à l'infinitif : il ne se conjugue pas. Le verbe conjugué est « veulent »." } },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Le repas préparé sent délicieusement bon .", targets:["sent"],
        piege:{ "préparé": "« préparé » est un participe passé employé ici comme adjectif : il décrit le nom « repas ». Ce n'est pas le verbe conjugué (qui est « sent »)." } },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Les enfants ont sommeil car ils jouent depuis ce matin .", targets:["ont","jouent"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Pendant que maman lit , papa écoute de la musique .", targets:["lit","écoute"], piege:{} },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Le champion , épuisé , franchit la ligne d'arrivée .", targets:["franchit"],
        piege:{ "épuisé": "« épuisé » est un participe passé employé ici comme adjectif : il décrit le champion. Ce n'est pas le verbe conjugué (qui est « franchit »)." } },
      { type:"mots-cliquables", instruction:"Clique sur le(s) verbe(s) conjugué(s) de la phrase (il peut y en avoir deux).",
        sentence:"Le clown a très peur des araignées .", targets:["a"], piege:{} }
    ]
  },

  "distinguer-phrase-simple-complexe": {
    title:      "Distinguer phrase simple et phrase complexe",
    domaine:    "Français",
    competence: "Grammaire — Phrase simple et complexe",
    type:       "distinguer-phrase-simple-complexe-niveaux",
    levels:     ["CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Refonte en 3 niveaux (même schéma que identifier-type-phrase /
       transformer-phrase). Niveau 1 : construire une phrase complexe en
       choisissant le bon connecteur (guidé, 2 étapes : choix-étiquette puis
       complétion en texte à trous). Niveau 2 : raisonnement en 2 étapes
       (repérer le(s) verbe(s) conjugué(s) puis classer) — reprend le
       contenu de l'ancienne banque unique (classification-etapes) sur un
       sous-ensemble d'items. Niveau 3 : jugement direct simple/complexe
       sans repérage préalable, banque plus large avec cas pièges (sujets
       multiples + un seul verbe = toujours simple, complément long dans
       une phrase simple, coordination courte dans une phrase complexe). */

    level1Bank: [
      {
        sentence1: "Le chat dort.", sentence2: "Il a passé toute la nuit dehors.",
        choices: ["parce que", "et", "donc"], connector: "parce que",
        blankAnswer: "parce qu'il",
        template: "Le chat dort ___ a passé toute la nuit dehors."
      },
      {
        sentence1: "Léa est triste.", sentence2: "Elle sourit quand même.",
        choices: ["mais", "et", "car"], connector: "mais",
        template: "Léa est triste ___ elle sourit quand même."
      },
      {
        sentence1: "Il pleut.", sentence2: "Nous restons à la maison.",
        choices: ["donc", "mais", "qui"], connector: "donc",
        template: "Il pleut ___ nous restons à la maison."
      },
      {
        sentence1: "Tom saute de joie.", sentence2: "Il vient de gagner le match.",
        choices: ["car", "donc", "quand"], connector: "car",
        template: "Tom saute de joie ___ il vient de gagner le match."
      },
      {
        sentence1: "Les enfants applaudissent.", sentence2: "Le clown entre en scène.",
        choices: ["quand", "mais", "donc"], connector: "quand",
        template: "Les enfants applaudissent ___ le clown entre en scène."
      },
      {
        sentence1: "Nous restons chez nous.", sentence2: "Le temps s'est brusquement dégradé.",
        choices: ["parce que", "quand", "si"], connector: "parce que",
        template: "Nous restons chez nous ___ le temps s'est brusquement dégradé."
      },
      {
        sentence1: "J'ai un chat.", sentence2: "Il miaule beaucoup.",
        choices: ["qui", "et", "mais"], connector: "qui",
        template: "J'ai un chat ___ miaule beaucoup."
      },
      {
        sentence1: "Le facteur passe.", sentence2: "Les enfants sont à l'école.",
        choices: ["quand", "car", "donc"], connector: "quand",
        template: "Le facteur passe ___ les enfants sont à l'école."
      },
      {
        sentence1: "Tu pourras peut-être jouer dehors.", sentence2: "Tu ranges ta chambre.",
        choices: ["si", "quand", "donc"], connector: "si",
        template: "Tu pourras peut-être jouer dehors ___ tu ranges ta chambre."
      },
      {
        sentence1: "Le vent souffle fort.", sentence2: "Les feuilles tombent des arbres.",
        choices: ["et", "car", "si"], connector: "et",
        template: "Le vent souffle fort ___ les feuilles tombent des arbres."
      }
    ],

    level2Bank: [
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
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (Même si la phrase semble courte !)",
        sentence: "Le footballeur tire le ballon et marque un but.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["tire", "marque"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
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
        sentence: "Il pleut depuis ce matin.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["pleut"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (Même si la phrase semble courte !)",
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
    ],

    level3Bank: [
      {
        sentence: "Les enfants rient et courent dans la cour.",
        answer: "complexe",
        hint: "Deux verbes conjugués : « rient » et « courent »."
      },
      {
        sentence: "La maîtresse demande aux élèves de travailler en silence.",
        answer: "simple",
        hint: "« travailler » est un infinitif, pas un verbe conjugué : un seul verbe conjugué, « demande »."
      },
      {
        sentence: "Le soleil brille dans le ciel bleu.",
        answer: "simple",
        hint: "Un seul verbe conjugué : « brille »."
      },
      {
        sentence: "Les oiseaux chantent et les fleurs poussent au printemps.",
        answer: "complexe",
        hint: "Deux verbes conjugués : « chantent » et « poussent »."
      },
      {
        sentence: "Mon chat adore jouer avec la pelote de laine.",
        answer: "simple",
        hint: "« jouer » est un infinitif : un seul verbe conjugué, « adore »."
      },
      {
        sentence: "Les élèves écoutent quand le professeur parle.",
        answer: "complexe",
        hint: "Deux verbes conjugués : « écoutent » et « parle »."
      },
      {
        sentence: "La fusée va décoller dans dix secondes.",
        answer: "simple",
        hint: "« décoller » est un infinitif : un seul verbe conjugué, « va »."
      },
      {
        sentence: "Paul et Marie regardent un film.",
        answer: "simple",
        hint: "Deux sujets, mais un seul verbe conjugué (« regardent ») : la phrase reste simple."
      },
      {
        sentence: "Le chat, le chien et le lapin dorment ensemble dans le panier.",
        answer: "simple",
        hint: "Trois sujets, mais un seul verbe conjugué (« dorment ») : la phrase reste simple."
      },
      {
        sentence: "Après une longue journée de classe bien remplie, les élèves rentrent chez eux.",
        answer: "simple",
        hint: "Le complément est long, mais un seul verbe conjugué (« rentrent ») : la phrase reste simple."
      },
      {
        sentence: "Il tombe, il se relève aussitôt.",
        answer: "complexe",
        hint: "Deux verbes conjugués : « tombe » et « se relève »."
      },
      {
        sentence: "Viens si tu peux.",
        answer: "complexe",
        hint: "Deux verbes conjugués : « viens » et « peux »."
      }
    ]
  },

  "reperer-propositions": {
    title:      "Repérer les propositions dans une phrase complexe",
    domaine:    "Français",
    competence: "Grammaire — La phrase complexe",
    type:       "reperer-propositions-niveaux",
    levels:     ["6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Synthèse qui réinvestit identifier-juxtaposition / identifier-
       subordination / distinguer-coordination-subordination : mêmes 3
       types de lien, mais ici l'élève délimite TOUTES les propositions
       d'une phrase (2 à 4) au lieu d'un lien binaire entre 2 propositions
       fixes. Chaque item est représenté par un tableau `parts` (une entrée
       par proposition), `verbs` (le verbe conjugué cible de chaque
       proposition, dans le même ordre), `connectors` (N-1 mots ou signes
       de ponctuation entre les propositions) et `linkTypes` (le type de
       chaque lien N-1, utilisé pour la catégorisation au Niveau 3
       uniquement — aucun verbe à la forme réfléchie parmi les cibles,
       pour éviter toute ambiguïté d'élision lors du clic).
       Un élément de `verbs` peut aussi être { aux, participle } pour un
       verbe composé (passé composé, plus-que-parfait...) : le moteur exige
       alors le clic sur les DEUX tokens (auxiliaire ET participe), ni plus
       ni moins, pour valider la proposition (cf. rpBuildTokens/verbIndices
       et rpValidateWords dans exercise.html).
       Niveau 1 : 2 ou 3 propositions (majorité à 3), liens variés incluant
       parfois 2 types différents dans une même phrase (à 3 propositions).
       Clique sur le(s) mot(s) du verbe de chaque proposition, indique le
       nombre de propositions (1/2/3), pas de catégorisation.
       Niveau 2 : primitive curseur (voir rpRenderLevel2), 2 ou 3
       propositions, liens mixtes dans une même phrase.
       Niveau 3 : 3 ou 4 propositions, sans indication du nombre attendu.
       Comptage (2/3/4/5) puis catégorisation de chaque lien, un lien à la
       fois (juxtaposition / coordination / subordination). ─────────── */
    level1Bank: [
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le chat dort", "le chien joue"], verbs: ["dort", "joue"],
        connectors: [","], linkTypes: ["juxtaposition"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Les enfants dormaient déjà", "leurs parents étaient rentrés"],
        verbs: ["dormaient", { aux: "étaient", participle: "rentrés" }],
        connectors: ["quand"], linkTypes: ["subordination"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le vent souffle", "les feuilles tombent", "les enfants rentrent vite"],
        verbs: ["souffle", "tombent", "rentrent"],
        connectors: [",", "donc"], linkTypes: ["juxtaposition", "coordination"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le magasin ferme", "les clients partent", "la nuit tombe"],
        verbs: ["ferme", "partent", "tombe"],
        connectors: ["donc", "quand"], linkTypes: ["coordination", "subordination"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le vent forcit", "les bateaux rentrent", "les pêcheurs sont contents"],
        verbs: ["forcit", "rentrent", "sont"],
        connectors: ["quand", ";"], linkTypes: ["subordination", "juxtaposition"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le ciel devient bleu", "le vent tombe", "les oiseaux chantent"],
        verbs: ["devient", "tombe", "chantent"],
        connectors: [",", ";"], linkTypes: ["juxtaposition", "juxtaposition"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Tom a fermé la porte", "il éteint la lumière", "il va dormir"],
        verbs: [{ aux: "a", participle: "fermé" }, "éteint", "va"],
        connectors: [",", "puis"], linkTypes: ["juxtaposition", "coordination"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le réveil sonne", "Léa sort du lit", "elle prépare son sac"],
        verbs: ["sonne", "sort", "prépare"],
        connectors: ["donc", ";"], linkTypes: ["coordination", "juxtaposition"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Le film commence", "la salle devient sombre", "le générique apparaît"],
        verbs: ["commence", "devient", "apparaît"],
        connectors: [",", "quand"], linkTypes: ["juxtaposition", "subordination"]
      },
      {
        instruction: "Clique sur le(s) mot(s) du verbe conjugué de chaque proposition, puis indique combien de propositions tu as trouvées.",
        parts: ["Les invités sont arrivés", "le repas commence", "la musique démarre"],
        verbs: [{ aux: "sont", participle: "arrivés" }, "commence", "démarre"],
        connectors: ["quand", "donc"], linkTypes: ["subordination", "coordination"]
      }
    ],

    /* Niveau 2 : nouvelle primitive "curseur de séparation" (voir
       rpRenderLevel2 dans exercise.html) — pas de champ `verbs` ici, la
       segmentation se fait au sens global de la phrase, pas via les verbes
       conjugués. `connectors` est toujours en position médiane (jamais de
       proposition antéposée) : boundaries calculées automatiquement à
       partir de `parts`/`connectors`, aucun champ dédié nécessaire.
       `linkTypes` reste renseigné à titre documentaire (non utilisé pour
       la notation à ce niveau — pas de catégorisation avant le Niveau 3). */
    level2Bank: [
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Le vent souffle fort", "les feuilles tombent"],
        connectors: [","], linkTypes: ["juxtaposition"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Elle travaille dur", "l'examen approche"],
        connectors: ["car"], linkTypes: ["coordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Léa lit un livre", "elle a du temps libre"],
        connectors: ["quand"], linkTypes: ["subordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Le film commence", "les spectateurs cherchent leur place"],
        connectors: ["or"], linkTypes: ["coordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Nous partons demain", "mes parents restent ici"],
        connectors: [";"], linkTypes: ["juxtaposition"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Le ciel devient gris", "l'orage approche", "les enfants rentrent vite"],
        connectors: [",", "donc"], linkTypes: ["juxtaposition", "coordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Le chat miaule", "le chien aboie", "quelqu'un arrive"],
        connectors: ["et", "quand"], linkTypes: ["coordination", "subordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Il fait nuit", "les rues sont calmes", "les magasins ferment"],
        connectors: [";", "quand"], linkTypes: ["juxtaposition", "subordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["Les élèves restent silencieux", "le film commence", "tout le monde applaudit"],
        connectors: ["quand", "puis"], linkTypes: ["subordination", "coordination"]
      },
      {
        instruction: "Place un curseur à chaque endroit où tu penses que se trouve une frontière entre propositions (il peut y en avoir plusieurs).",
        parts: ["La cloche sonne", "les élèves sortent", "ils rejoignent la cour"],
        connectors: [",", "puis"], linkTypes: ["juxtaposition", "coordination"]
      }
    ],

    level3Bank: [
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Le ciel devient bleu", "le vent tombe", "les oiseaux chantent"],
        verbs: ["devient", "tombe", "chantent"],
        connectors: [",", ";"], linkTypes: ["juxtaposition", "juxtaposition"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Léa a terminé son travail", "elle range son bureau", "elle part enfin"],
        verbs: [{ aux: "a", participle: "terminé" }, "range", "part"],
        connectors: ["puis", "et"], linkTypes: ["coordination", "coordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Le magasin ferme", "les clients partent", "la nuit tombe"],
        verbs: ["ferme", "partent", "tombe"],
        connectors: ["donc", "quand"], linkTypes: ["coordination", "subordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Le vent forcit", "les bateaux rentrent", "les pêcheurs sont contents"],
        verbs: ["forcit", "rentrent", "sont"],
        connectors: ["quand", "et"], linkTypes: ["subordination", "coordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Les cloches sonnent", "le gardien ouvre les portes", "la foule entre"],
        verbs: ["sonnent", "ouvre", "entre"],
        connectors: [",", "et"], linkTypes: ["juxtaposition", "coordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["La lumière baisse", "on allume les lampes", "le soir arrive"],
        verbs: ["baisse", "allume", "arrive"],
        connectors: [";", "quand"], linkTypes: ["juxtaposition", "subordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Le ciel devient noir", "l'orage éclate", "les gens courent", "la pluie commence"],
        verbs: ["devient", "éclate", "courent", "commence"],
        connectors: [",", "donc", "quand"], linkTypes: ["juxtaposition", "coordination", "subordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Le film commence", "la salle devient sombre", "le public reste silencieux", "chacun observe l'écran"],
        verbs: ["commence", "devient", "reste", "observe"],
        connectors: ["quand", ";", "et"], linkTypes: ["subordination", "juxtaposition", "coordination"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Léa ferme son livre", "elle éteint la lumière", "le silence règne", "la nuit continue"],
        verbs: ["ferme", "éteint", "règne", "continue"],
        connectors: ["puis", "quand", ";"], linkTypes: ["coordination", "subordination", "juxtaposition"]
      },
      {
        instruction: "Clique sur tous les verbes conjugués de cette phrase (tu ne sais pas combien il y en a), indique combien de propositions tu as trouvées, puis catégorise chaque lien.",
        parts: ["Le train arrive", "les voyageurs sont prêts", "ils descendent", "ils quittent la gare"],
        verbs: ["arrive", "sont", "descendent", "quittent"],
        connectors: [",", "quand", "puis"], linkTypes: ["juxtaposition", "subordination", "coordination"]
      }
    ]
  },

  "identifier-juxtaposition": {
    title:      "Distinguer la juxtaposition de la coordination",
    domaine:    "Français",
    competence: "Grammaire — La phrase complexe",
    type:       "identifier-juxtaposition-niveaux",
    levels:     ["6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* 3 niveaux (même schéma que distinguer-phrase-simple-complexe-niveaux).
       Niveau 1 : mots-cliquables en 2 temps — clique sur le verbe conjugué
       de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ ; les deux propositions
       se colorent ensuite séparément (bleu / orange), sans mention du mot
       « juxtaposition ». Toutes les phrases de level1Bank sont des
       juxtapositions (virgule ou point-virgule seul, sans connecteur).
       Niveau 2 : étai en 2 étapes — les 2 propositions sont déjà surlignées ;
       étape 1 = clique sur ce qui les relie (ponctuation ou connecteur),
       étape 2 = choix binaire juxtaposition / coordination. Banque mixte.
       Niveau 3 : jugement direct seul, avec pièges de virgule énumérative
       (groupe nominal sujet) à ne pas confondre avec la virgule de
       juxtaposition entre deux propositions. ─────────────────────────── */
    level1Bank: [
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le chat dort", verbA: "dort", sep: ",",
        partB: "le chien aboie", verbB: "aboie"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Il pleut", verbA: "pleut", sep: ";",
        partB: "les enfants restent à la maison", verbB: "restent"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Marie chante", verbA: "chante", sep: ",",
        partB: "Paul danse", verbB: "danse"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le vent souffle fort", verbA: "souffle", sep: ",",
        partB: "les feuilles tombent", verbB: "tombent"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Elle lit un livre", verbA: "lit", sep: ";",
        partB: "son frère joue dehors", verbB: "joue"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le soleil brille", verbA: "brille", sep: ",",
        partB: "les oiseaux chantent", verbB: "chantent"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Nous partons demain", verbA: "partons", sep: ",",
        partB: "mes parents restent ici", verbB: "restent"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le repas est prêt", verbA: "est", sep: ";",
        partB: "tout le monde a faim", verbB: "a"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Les élèves travaillent", verbA: "travaillent", sep: ",",
        partB: "le professeur explique la leçon", verbB: "explique"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le chien aboie", verbA: "aboie", sep: ",",
        partB: "le chat miaule", verbB: "miaule"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Il fait froid", verbA: "fait", sep: ";",
        partB: "nous allumons le chauffage", verbB: "allumons"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "La pluie tombe", verbA: "tombe", sep: ",",
        partB: "la rivière monte", verbB: "monte"
      }
    ],

    level2Bank: [
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Le vent souffle", partB: "les feuilles volent", link: ",", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Il fait nuit", partB: "les étoiles brillent", link: ";", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Marie sourit", partB: "elle est heureuse", link: ",", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Le train arrive", partB: "les voyageurs se lèvent", link: ";", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Il pleut", partB: "nous sortons quand même", link: "mais", linkType: "coordination"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Elle travaille dur", partB: "l'examen approche", link: "car", linkType: "coordination"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Le magasin ferme", partB: "nous partons", link: "donc", linkType: "coordination"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Il devait pleuvoir", partB: "le ciel est resté bleu", link: "or", linkType: "coordination"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Elle se lave", partB: "elle s'habille", link: "puis", linkType: "coordination"
      },
      {
        instruction: "Clique sur ce qui relie les deux propositions (ponctuation ou connecteur).",
        partA: "Le chat miaule", partB: "le chien aboie", link: "et", linkType: "coordination"
      }
    ],

    level3Bank: [
      { sentence: "Le ciel s'assombrit, l'orage approche .", answer: "juxtaposition" },
      { sentence: "Léa révise ; son frère regarde la télévision .", answer: "juxtaposition" },
      { sentence: "Nous avons faim, le repas n'est pas prêt .", answer: "juxtaposition" },
      { sentence: "Il neige, les routes sont glissantes .", answer: "juxtaposition" },
      {
        sentence: "Tom range sa chambre mais il oublie son bureau .",
        answer: "coordination",
        hint: "« mais » est un connecteur de coordination."
      },
      {
        sentence: "Elle a raté le bus donc elle arrive en retard .",
        answer: "coordination",
        hint: "« donc » est un connecteur de coordination."
      },
      {
        sentence: "Le film commence or les spectateurs ne sont pas installés .",
        answer: "coordination",
        hint: "« or » est un connecteur de coordination."
      },
      {
        sentence: "Ils sont fatigués car ils ont beaucoup marché .",
        answer: "coordination",
        hint: "« car » est un connecteur de coordination."
      },
      {
        sentence: "Elle ferme la porte puis elle allume la lumière .",
        answer: "coordination",
        hint: "« puis » est un connecteur de coordination."
      },
      {
        sentence: "Paul, Marie et Lucas jouent, ils sont heureux .",
        answer: "juxtaposition",
        hint: "« Paul, Marie et Lucas » : virgule d'énumération dans le sujet, pas une juxtaposition. Ce sont les propositions « …jouent » et « ils sont heureux », reliées par la dernière virgule (sans connecteur)."
      },
      {
        sentence: "Le chat, le chien et le lapin dorment, mais le hamster reste éveillé .",
        answer: "coordination",
        hint: "La 1ʳᵉ virgule énumère les sujets (« le chat, le chien et le lapin ») ; ce qui relie vraiment les deux propositions est « mais »."
      },
      {
        sentence: "Mes parents, mes cousins et moi partons en vacances ; nous sommes impatients .",
        answer: "juxtaposition",
        hint: "Les virgules énumèrent le sujet ; les deux propositions sont reliées par le point-virgule, sans connecteur : c'est une juxtaposition."
      }
    ]
  },

  "identifier-subordination": {
    title:      "Distinguer la juxtaposition de la subordination",
    domaine:    "Français",
    competence: "Grammaire — La phrase complexe",
    type:       "identifier-subordination-niveaux",
    levels:     ["6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* 3 niveaux (même schéma que identifier-juxtaposition-niveaux).
       Compétence binaire : juxtaposition vs subordination UNIQUEMENT (pas de
       coordination ici — fera l'objet d'une compétence séparée).
       Niveau 1 : mots-cliquables en 2 temps — clique sur le verbe conjugué
       de la principale, puis sur celui de la subordonnée ; les deux
       propositions se colorent ensuite séparément (bleu / orange), sans
       mention du mot « subordination ». Toutes les phrases de level1Bank
       contiennent une subordination (conjonction ou pronom relatif).
       Conjonctives et relatives sont séparées ci-dessous.
       Niveau 2 : étai en 2 étapes — les 2 propositions sont déjà surlignées ;
       étape 1 = clique sur le mot (ou la ponctuation) qui introduit la 2ᵉ
       proposition, étape 2 = choix binaire subordination / juxtaposition.
       Banque mixte des 2 types de liaison uniquement.
       Niveau 3 : jugement direct seul, à 2 choix, avec pièges : « que »
       comparatif (pas une proposition) et virgule énumérative dans un
       groupe nominal (à ne pas confondre avec la virgule de juxtaposition
       entre deux propositions). ───────────────────────────────────────── */
    level1Bank: [
      /* ── Subordonnées conjonctives ── */
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Les enfants sourient", verbA: "sourient",
        connector: "quand",
        partB: "le soleil brille", verbB: "brille"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Nous partons", verbA: "partons",
        connector: "si",
        partB: "la pluie cesse", verbB: "cesse"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "La rivière déborde", verbA: "déborde",
        connector: "comme",
        partB: "la pluie tombe abondamment", verbB: "tombe"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Tu peux sortir", verbA: "peux",
        connector: "puisque",
        partB: "le devoir est fini", verbB: "est"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Le magasin ferme", verbA: "ferme",
        connector: "lorsque",
        partB: "la nuit arrive", verbB: "arrive"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Léa sourit", verbA: "sourit",
        connector: "parce que",
        partB: "son ami chante", verbB: "chante"
      },
      /* ── Subordonnées relatives ── */
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Léa regarde le chien", verbA: "regarde",
        connector: "qui",
        partB: "aboie", verbB: "aboie"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Paul lit la lettre", verbA: "lit",
        connector: "que",
        partB: "sa sœur envoie", verbB: "envoie"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Nous visitons la ville", verbA: "visitons",
        connector: "où",
        partB: "mes cousins habitent", verbB: "habitent"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Léa raconte l'histoire", verbA: "raconte",
        connector: "dont",
        partB: "tout le monde parle", verbB: "parle"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Le fermier nourrit les poules", verbA: "nourrit",
        connector: "qui",
        partB: "picorent", verbB: "picorent"
      },
      {
        instruction: "Clique sur le verbe conjugué de la proposition principale, puis sur celui de la proposition subordonnée.",
        partA: "Tom range les jouets", verbA: "range",
        connector: "que",
        partB: "son cousin apporte", verbB: "apporte"
      }
    ],

    level2Bank: [
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Le chat miaule", partB: "Léo oublie de le nourrir", link: "parce que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Nous restons chez nous", partB: "le temps se gâte", link: "quand", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Les élèves applaudissent", partB: "le spectacle commence", link: "lorsque", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Tom prend un parapluie", partB: "le ciel devient gris", link: "puisque", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Léa lit le livre", partB: "son frère a offert", link: "que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Le vent se lève", partB: "les nuages arrivent", link: ",", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "La nuit tombe", partB: "les lampadaires s'allument", link: ";", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Les cloches sonnent", partB: "les élèves sortent", link: ",", linkType: "juxtaposition"
      },
      {
        instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
        partA: "Le vent souffle fort", partB: "les feuilles tombent", link: ";", linkType: "juxtaposition"
      }
    ],

    level3Bank: [
      { sentence: "Les enfants jouent dehors quand il fait beau .", answer: "subordination", hint: "« quand » introduit une subordonnée : conjonction de subordination." },
      { sentence: "Nous irons à la plage si le temps le permet .", answer: "subordination", hint: "« si » introduit une subordonnée de condition." },
      { sentence: "Léa est arrivée en retard comme le bus avait du retard .", answer: "subordination", hint: "« comme » introduit une subordonnée de cause." },
      {
        sentence: "Le chien qui aboie appartient à mon voisin .",
        answer: "subordination",
        hint: "« qui » est un pronom relatif : il introduit une subordonnée relative."
      },
      { sentence: "Le livre que je lis est passionnant .", answer: "subordination", hint: "« que » est ici un pronom relatif, pas un comparatif : il introduit une subordonnée relative." },
      { sentence: "La maison où j'habite est petite .", answer: "subordination", hint: "« où » est un pronom relatif de lieu." },
      { sentence: "Voici le stylo dont j'ai besoin .", answer: "subordination", hint: "« dont » est un pronom relatif." },
      { sentence: "Le soleil se couche, les étoiles apparaissent .", answer: "juxtaposition", hint: "Aucun connecteur : virgule seule entre les deux propositions." },
      { sentence: "Il fait chaud ; les enfants jouent dehors .", answer: "juxtaposition", hint: "Aucun connecteur : point-virgule seul entre les deux propositions." },
      { sentence: "Le film commence, tout le monde se tait .", answer: "juxtaposition", hint: "Aucun connecteur : virgule seule entre les deux propositions." },
      {
        sentence: "Léa court plus vite que Paul, elle gagne toujours la course .",
        answer: "juxtaposition",
        hint: "« que Paul » compare deux éléments, sans verbe : ce n'est pas une proposition. Les deux vraies propositions (« Léa court… » et « elle gagne… ») sont juste séparées par une virgule, sans mot de liaison : juxtaposition."
      },
      {
        sentence: "Le chat, le chien et le hamster dorment, ils sont fatigués .",
        answer: "juxtaposition",
        hint: "Les deux premières virgules énumèrent le sujet (« le chat, le chien et le hamster ») ; c'est la dernière virgule qui relie les deux propositions (« …dorment » et « ils sont fatigués »), sans connecteur : juxtaposition."
      }
    ]
  },

  "distinguer-coordination-subordination": {
    title:      "Distinguer la coordination de la subordination",
    domaine:    "Français",
    competence: "Grammaire — La phrase complexe",
    type:       "distinguer-coordination-subordination-niveaux",
    levels:     ["6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* 3 niveaux (même primitive mots-cliquables que identifier-juxtaposition-
       niveaux / identifier-subordination-niveaux). Uniquement des CONJONCTIONS
       (coordination et subordination) — pas de pronoms relatifs ici (déjà
       couverts par identifier-subordination), pas de juxtaposition (déjà
       couverte par identifier-juxtaposition).
       Niveau 1 : 3 étapes — (1) clique sur le verbe de chaque proposition
       (colore bleu/orange une fois les 2 trouvés), (2) clique sur le(s)
       mot(s) de liaison restant(s) (violet), (3) choix binaire "conjonction
       de coordination" / "conjonction de subordination". Bouton d'indice
       "?" disponible (rôle grammatical, sans exemple de mot).
       Niveau 2 : étai en 1 étape — clique directement sur le connecteur (les
       2 propositions se colorent automatiquement), puis choix binaire
       "coordonnée" / "subordonnée". Pas d'indice.
       Niveau 3 : jugement direct seul, à 2 choix, avec pièges ("et"/"ou"
       reliant deux noms dans une phrase par ailleurs complexe, à ne pas
       confondre avec le vrai connecteur de la phrase). ─────────────────── */
    level1Bank: [
      /* ── Coordination ── */
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le vent souffle", verbA: "souffle",
        connector: "et",
        partB: "la pluie tombe", verbB: "tombe",
        connectorType: "coordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Léa aime lire", verbA: "aime",
        connector: "mais",
        partB: "elle déteste écrire", verbB: "déteste",
        connectorType: "coordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Tu restes", verbA: "restes",
        connector: "ou",
        partB: "tu pars", verbB: "pars",
        connectorType: "coordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Il court vite", verbA: "court",
        connector: "donc",
        partB: "il gagne la course", verbB: "gagne",
        connectorType: "coordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le film commence", verbA: "commence",
        connector: "or",
        partB: "les spectateurs arrivent en retard", verbB: "arrivent",
        connectorType: "coordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Paul reste chez lui", verbA: "reste",
        connector: "car",
        partB: "il est malade", verbB: "est",
        connectorType: "coordination"
      },
      /* ── Subordination ── */
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Les enfants sourient", verbA: "sourient",
        connector: "quand",
        partB: "le soleil brille", verbB: "brille",
        connectorType: "subordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Nous partons", verbA: "partons",
        connector: "si",
        partB: "la pluie cesse", verbB: "cesse",
        connectorType: "subordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "La rivière déborde", verbA: "déborde",
        connector: "comme",
        partB: "la pluie tombe abondamment", verbB: "tombe",
        connectorType: "subordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Tu peux sortir", verbA: "peux",
        connector: "puisque",
        partB: "le devoir est fini", verbB: "est",
        connectorType: "subordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Le magasin ferme", verbA: "ferme",
        connector: "lorsque",
        partB: "la nuit arrive", verbB: "arrive",
        connectorType: "subordination"
      },
      {
        instruction: "Clique sur le verbe conjugué de la 1ʳᵉ proposition, puis sur celui de la 2ᵉ.",
        partA: "Léa sourit", verbA: "sourit",
        connector: "parce que",
        partB: "son ami chante", verbB: "chante",
        connectorType: "subordination"
      }
    ],

    level2Bank: [
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Léa sort", partB: "le temps soit maussade", link: "bien que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Les enfants dessinent", partB: "la pluie tombe", link: "pendant que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Le train partira", partB: "tout le monde soit installé", link: "avant que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Nous sortirons", partB: "la pluie cessera", link: "dès que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Marie est contente", partB: "son frère est déçu", link: "alors que", linkType: "subordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Le ciel s'éclaircit", partB: "les enfants sortent jouer", link: "donc", linkType: "coordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Elle aime la mer", partB: "elle déteste la montagne", link: "mais", linkType: "coordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Tu choisis le rouge", partB: "tu choisis le bleu", link: "ou", linkType: "coordination"
      },
      {
        instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
        partA: "Le ciel devient sombre", partB: "l'orage approche", link: "or", linkType: "coordination"
      }
    ],

    level3Bank: [
      { sentence: "Les élèves applaudissent quand le spectacle commence .", answer: "subordination", hint: "« quand » est une conjonction de subordination." },
      { sentence: "Nous resterons chez nous si la tempête continue .", answer: "subordination", hint: "« si » est une conjonction de subordination." },
      { sentence: "Léo travaille bien qu'il soit fatigué .", answer: "subordination", hint: "« bien que » est une conjonction de subordination (elle exprime la concession)." },
      { sentence: "Elle prépare le dîner pendant que son frère met la table .", answer: "subordination", hint: "« pendant que » est une conjonction de subordination." },
      { sentence: "Ils partiront dès que le bus arrivera .", answer: "subordination", hint: "« dès que » est une conjonction de subordination." },
      {
        sentence: "Paul et Marie jouent au ballon quand la cloche sonne .",
        answer: "subordination",
        hint: "« Paul et Marie » : « et » relie ici deux noms (le sujet), pas deux propositions. Le vrai lien entre les deux propositions est « quand » : subordination."
      },
      { sentence: "Le ciel est bleu et les oiseaux chantent .", answer: "coordination", hint: "« et » est une conjonction de coordination." },
      { sentence: "Elle est fatiguée car elle a beaucoup travaillé .", answer: "coordination", hint: "« car » est une conjonction de coordination." },
      { sentence: "Tu peux rester ou tu peux partir .", answer: "coordination", hint: "« ou » est une conjonction de coordination." },
      { sentence: "Il pleuvait donc nous sommes restés à la maison .", answer: "coordination", hint: "« donc » est une conjonction de coordination." },
      { sentence: "Le magasin est fermé or nous avions besoin de pain .", answer: "coordination", hint: "« or » est une conjonction de coordination." },
      {
        sentence: "Léa choisit un livre ou un magazine, mais elle repart les mains vides .",
        answer: "coordination",
        hint: "« ou » relie ici deux noms (le complément), pas deux propositions. Le vrai lien entre les deux propositions est « mais » : coordination."
      }
    ]
  },

  "phrases-connecteurs": {
    title: "Relier deux phrases avec la bonne conjonction",
    domaine:    "Français",
    competence: "Grammaire — Connecteurs et conjonctions",
    levels: ["CM2", "6e"],
    paliers: 1, /* nombre réel de paliers du moteur */
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
    domaine:    "Français",
    competence: "Grammaire — Formes de phrases interrogatives",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
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

  "accord-verbe-sujet-inverse": {
    title: "Accorder le verbe avec un sujet inversé",
    domaine:    "Français",
    competence: "Grammaire — Accord sujet-verbe inversé",
    levels: ["CM1", "CM2", "6e"],
    paliers: 2, /* nombre réel de paliers du moteur */
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

  "differencier-epithete-attribut": {
    title:   "Différencier l'adjectif épithète et l'attribut du sujet",
    domaine:    "Français",
    competence: "Grammaire — Épithète et attribut du sujet",
    levels:  ["CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
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

  "distinguer-epithete-complement-nom": {
    title:   "Distinguer l'adjectif épithète et le complément du nom",
    domaine:    "Français",
    competence: "Grammaire — Épithète et complément du nom",
    levels:  ["6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
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

  "distinguer-pronom-sujet-complement": {
    title: "Distinguer le pronom personnel sujet et le pronom personnel complément",
    domaine:    "Français",
    competence: "Grammaire — Pronoms personnels",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
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

  "remplacer-gn-sujet-pronom": {
    title: "Remplacer un groupe nominal sujet par un pronom personnel sujet",
    domaine:    "Français",
    competence: "Grammaire — Pronoms personnels",
    type: "gnsp-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
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
  },

  "identifier-type-phrase": {
    title:      "Identifier le type et la forme d'une phrase",
    domaine:    "Français",
    competence: "Grammaire — Identifier le type et la forme de la phrase",
    type:       "identifier-type-phrase-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de identifier-phrase-declarative/interrogative/imperative/exclamative
       (Lot 6, groupe 1). Niveau 1 : QCM sur le TYPE de phrase (déclarative /
       interrogative / impérative — l'exclamative n'est plus traitée comme un
       type au même titre que les 3 autres, voir niveau 3). Niveau 2 :
       identifier-phrase-negative — la négation est une FORME (orthogonale
       aux types, ex. une phrase peut être déclarative ET négative), traitée
       à part en oui/non. Niveau 3 : transformer-phrase-exclamative — saisie
       libre, transformer une phrase déclarative/affirmative en phrase
       exclamative commençant par « Comme ». */

    lvl1: [
      { sentence: "Le chien court.", correctType: "déclarative" },
      { sentence: "Je mange une pomme.", correctType: "déclarative" },
      { sentence: "Emma joue du piano.", correctType: "déclarative" },
      { sentence: "Il pleut depuis ce matin.", correctType: "déclarative" },
      { sentence: "Où vas-tu ce matin ?", correctType: "interrogative" },
      { sentence: "As-tu fini tes devoirs ?", correctType: "interrogative" },
      { sentence: "Comment s'appelle ton chat ?", correctType: "interrogative" },
      { sentence: "Ferme la porte.", correctType: "impérative" },
      { sentence: "Range tes affaires.", correctType: "impérative" },
      { sentence: "Lis ce livre avec attention.", correctType: "impérative" }
    ],

    lvl2: [
      { sentence: "Le chat dort sur le canapé.", isNegative: false },
      { sentence: "Le jardin est couvert de fleurs.", isNegative: false },
      { sentence: "As-tu faim ?", isNegative: false },
      { sentence: "Où vas-tu ce matin ?", isNegative: false },
      { sentence: "Viens jouer avec moi.", isNegative: false },
      { sentence: "Je ne mange pas de viande.", isNegative: true },
      { sentence: "Elle ne lit jamais le soir.", isNegative: true },
      { sentence: "Pourquoi tu ne viens pas avec nous ?", isNegative: true },
      { sentence: "N'oublie pas tes affaires.", isNegative: true },
      { sentence: "Ne crie pas dans les couloirs.", isNegative: true }
    ],

    lvl3: [
      { sentence: "Il fait beau.", reponse: "Comme il fait beau !" },
      { sentence: "Elle chante bien.", reponse: "Comme elle chante bien !" },
      { sentence: "Tu cours vite.", reponse: "Comme tu cours vite !" },
      { sentence: "Vous êtes gentils.", reponse: "Comme vous êtes gentils !" },
      { sentence: "Nous sommes heureux.", reponse: "Comme nous sommes heureux !" },
      { sentence: "Ils travaillent bien.", reponse: "Comme ils travaillent bien !" },
      { sentence: "Elle est belle.", reponse: "Comme elle est belle !" },
      { sentence: "Cette maison est grande.", reponse: "Comme cette maison est grande !" },
      { sentence: "Ce gâteau est délicieux.", reponse: "Comme ce gâteau est délicieux !" },
      { sentence: "Il pleut fort.", reponse: "Comme il pleut fort !" }
    ]
  },

  "transformer-phrase": {
    title:      "Transformer une phrase à la forme négative",
    domaine:    "Français",
    competence: "Grammaire — Transformer une phrase",
    type:       "transformer-phrase-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Le volet « interrogative » a été retiré (redondant avec
       produire-formes-interrogatives). Compétence recentrée sur la seule
       transformation affirmative → négative, sur 3 niveaux croissants :
       niveau 1 = négation simple (ne...pas, présent, dont un/une/des → de) ;
       niveau 2 = temps composés (passé composé, futur proche) et phrases
       plus longues (deux verbes, subordonnée), mais négation encore
       limitée à ne...pas ; niveau 3 = négations variées
       (jamais/plus/rien/personne), avec des indices contextuels dans la
       phrase de départ (toujours→jamais, encore→plus, quelque chose→rien,
       quelqu'un→personne) — plus difficile car il faut choisir le bon mot
       de négation, pas seulement le placer. */

    lvl1: [
      { sentence: "Tom range sa chambre.", keyWords: ["range", "chambre"], modelNeg: "Tom ne range pas sa chambre." },
      { sentence: "Il mange une pomme.", keyWords: ["mange", "pomme"], modelNeg: "Il ne mange pas de pomme." },
      { sentence: "Léa boit du chocolat chaud.", keyWords: ["boit", "chocolat", "chaud"], modelNeg: "Léa ne boit pas de chocolat chaud." },
      { sentence: "Nous achetons des fraises.", keyWords: ["achetons", "fraises"], modelNeg: "Nous n'achetons pas de fraises." },
      { sentence: "Vous regardez la télévision.", keyWords: ["regardez", "télévision"], modelNeg: "Vous ne regardez pas la télévision." },
      { sentence: "Le chat attrape une souris.", keyWords: ["chat", "attrape", "souris"], modelNeg: "Le chat n'attrape pas de souris." },
      { sentence: "Les enfants font du bruit.", keyWords: ["enfants", "font", "bruit"], modelNeg: "Les enfants ne font pas de bruit." },
      { sentence: "Tu portes des lunettes.", keyWords: ["portes", "lunettes"], modelNeg: "Tu ne portes pas de lunettes." },
      { sentence: "Papa prépare un gâteau.", keyWords: ["prépare", "gâteau"], modelNeg: "Papa ne prépare pas de gâteau." },
      { sentence: "Elle aime les épinards.", keyWords: ["aime", "épinards"], modelNeg: "Elle n'aime pas les épinards." }
    ],

    lvl2: [
      { sentence: "Il a mangé son repas.", keyWords: ["mangé", "repas"], modelNeg: "Il n'a pas mangé son repas." },
      { sentence: "Elle a fini ses devoirs.", keyWords: ["fini", "devoirs"], modelNeg: "Elle n'a pas fini ses devoirs." },
      { sentence: "Nous allons partir en vacances.", keyWords: ["allons", "partir", "vacances"], modelNeg: "Nous n'allons pas partir en vacances." },
      { sentence: "Tu vas gagner ce match.", keyWords: ["vas", "gagner", "match"], modelNeg: "Tu ne vas pas gagner ce match." },
      { sentence: "Il a acheté des fleurs.", keyWords: ["acheté", "fleurs"], modelNeg: "Il n'a pas acheté de fleurs." },
      { sentence: "Elle aime regarder des films.", keyWords: ["aime", "regarder", "films"], modelNeg: "Elle n'aime pas regarder de films." },
      { sentence: "Je pense qu'il viendra demain.", keyWords: ["pense", "viendra", "demain"], modelNeg: "Je ne pense pas qu'il viendra demain." },
      { sentence: "Ils ont trouvé quelque chose dans le grenier.", keyWords: ["trouvé", "grenier"], modelNeg: "Ils n'ont rien trouvé dans le grenier." },
      { sentence: "Elle sait que tu as raison.", keyWords: ["sait", "raison"], modelNeg: "Elle ne sait pas que tu as raison." },
      { sentence: "Nous allons regarder un film ce soir.", keyWords: ["allons", "regarder", "soir"], modelNeg: "Nous n'allons pas regarder de film ce soir." }
    ],

    lvl3: [
      { sentence: "Il arrive toujours en retard.", keyWords: ["arrive", "retard"], modelNeg: "Il n'arrive jamais en retard." },
      { sentence: "Elle mange encore des bonbons.", keyWords: ["mange", "bonbons"], modelNeg: "Elle ne mange plus de bonbons." },
      { sentence: "Tu dis toujours la vérité.", keyWords: ["dis", "vérité"], modelNeg: "Tu ne dis jamais la vérité." },
      { sentence: "Nous voyons quelqu'un dans le jardin.", keyWords: ["voyons", "jardin"], modelNeg: "Nous ne voyons personne dans le jardin." },
      { sentence: "Il entend quelque chose derrière la porte.", keyWords: ["entend", "porte"], modelNeg: "Il n'entend rien derrière la porte." },
      { sentence: "Elle joue encore avec sa poupée.", keyWords: ["joue", "poupée"], modelNeg: "Elle ne joue plus avec sa poupée." },
      { sentence: "Les élèves parlent toujours pendant le cours.", keyWords: ["élèves", "parlent", "cours"], modelNeg: "Les élèves ne parlent jamais pendant le cours." },
      { sentence: "Il voit quelqu'un au loin.", keyWords: ["voit", "loin"], modelNeg: "Il ne voit personne au loin." },
      { sentence: "Il achète encore des jouets.", keyWords: ["achète", "jouets"], modelNeg: "Il n'achète plus de jouets." },
      { sentence: "Elle voit quelque chose dans le ciel.", keyWords: ["voit", "ciel"], modelNeg: "Elle ne voit rien dans le ciel." }
    ]
  },

  "identifier-differencier-articles-definis-indefinis": {
    title:      "Identifier et différencier les articles définis et indéfinis",
    domaine:    "Français",
    competence: "Grammaire — Déterminants : articles définis et indéfinis",
    type:       "articles-def-indef-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de articles-definis et articles-indefinis en une seule
       compétence progressive. Niveau 1 : l'article est surligné dans la
       phrase, l'élève choisit défini/indéfini (indices permanents sous
       les boutons). Niveau 2 : l'élève clique d'abord sur l'article
       (mots-cliquables) puis le qualifie (sans indice). Niveau 3 : même
       mécanique que le niveau 2, appliquée à 2 phrases par item (dont
       des articles élidés « l' », toujours définis grammaticalement). */

    level1Bank: [
      { html: "<mark class=\"idi-mark\">Le</mark> chien de Léa dort sur son tapis.", answer: "defini", explain: "« Le » désigne un chien précis : celui de Léa." },
      { html: "Léa a vu <mark class=\"idi-mark\">un</mark> renard près de chez elle.", answer: "indefini", explain: "« un » ne précise pas de quel renard il s'agit : un renard parmi d'autres." },
      { html: "<mark class=\"idi-mark\">L'</mark>école est fermée aujourd'hui.", answer: "defini", explain: "« L' » (= la) désigne une école précise, celle qu'on connaît." },
      { html: "Il mange <mark class=\"idi-mark\">une</mark> pomme verte.", answer: "indefini", explain: "« une » désigne une pomme quelconque, non précisée." },
      { html: "<mark class=\"idi-mark\">Les</mark> enfants de la classe chantent joyeusement.", answer: "defini", explain: "« Les » désigne un groupe précis : les enfants de cette classe." },
      { html: "Nous avons trouvé <mark class=\"idi-mark\">des</mark> coquillages ce matin.", answer: "indefini", explain: "« des » désigne des coquillages non précisés, en quantité indéterminée." },
      { html: "<mark class=\"idi-mark\">Les</mark> chats détestent l'eau.", answer: "defini", explain: "Même si on parle des chats en général (sens générique), « les » reste un article défini." },
      { html: "As-tu vu <mark class=\"idi-mark\">l'</mark>oiseau bleu dans l'arbre ?", answer: "defini", explain: "« l' » (= le) désigne un oiseau précis, que tu as vu." },
      { html: "Notre maître a donné <mark class=\"idi-mark\">un</mark> livre à chaque élève.", answer: "indefini", explain: "« un » désigne un livre parmi d'autres, non précisé." },
      { html: "<mark class=\"idi-mark\">La</mark> maîtresse que j'aime beaucoup est absente aujourd'hui.", answer: "defini", explain: "« La » désigne une maîtresse précise : celle que tu connais." }
    ],

    level2Bank: [
      { sentence: "Léo range un cahier dans son sac .", target: "un", answer: "indefini" },
      { sentence: "Le professeur explique son cours .", target: "Le", answer: "defini" },
      { sentence: "Elle a mangé une pomme ce matin .", target: "une", answer: "indefini" },
      { sentence: "L' oiseau chante sur mon balcon .", target: "L'", answer: "defini" },
      { sentence: "Il a trouvé des champignons ce matin .", target: "des", answer: "indefini" },
      { sentence: "La maîtresse corrige nos cahiers .", target: "La", answer: "defini" },
      { sentence: "Nous avons vu un dauphin ce matin .", target: "un", answer: "indefini" },
      { sentence: "L' arbre perd ses feuilles en automne .", target: "L'", answer: "defini" },
      { sentence: "Elle porte des lunettes de soleil .", target: "des", answer: "indefini" },
      { sentence: "Les enfants jouent dans mon jardin .", target: "Les", answer: "defini" }
    ],

    /* Chaque phrase peut contenir plusieurs articles à trouver ET qualifier
       (2, 3 voire plus selon les phrases) — c'est ce qui différencie ce
       niveau du niveau 2 (1 seul article par phrase). Les articles élidés
       (l') restent mélangés parmi les cas défini/indéfini normaux, jamais
       un 3e type. Aucun "du/au/aux" (article contracté) : uniquement des
       déterminants isolables sans ambiguïté (sujet ou COD direct). */
    level3Bank: [
      { sentences: [
        { sentence: "Le chien joue avec un ballon .", targets: [
          { word: "Le", answer: "defini" }, { word: "un", answer: "indefini" }
        ]},
        { sentence: "Les enfants caressent une petite chienne .", targets: [
          { word: "Les", answer: "defini" }, { word: "une", answer: "indefini" }
        ]}
      ]},
      { sentences: [
        { sentence: "L' hirondelle revient chaque printemps .", targets: [
          { word: "L'", answer: "defini" }
        ]},
        { sentence: "Elle attrape des insectes et une libellule .", targets: [
          { word: "des", answer: "indefini" }, { word: "une", answer: "indefini" }
        ]}
      ]},
      { sentences: [
        { sentence: "Une girafe broute des feuilles vertes .", targets: [
          { word: "Une", answer: "indefini" }, { word: "des", answer: "indefini" }
        ]},
        { sentence: "La girafe rejoint le troupeau .", targets: [
          { word: "La", answer: "defini" }, { word: "le", answer: "defini" }
        ]}
      ]},
      { sentences: [
        { sentence: "L' ami de mon frère arrive ce soir .", targets: [
          { word: "L'", answer: "defini" }
        ]},
        { sentence: "Il apporte un cadeau et une carte .", targets: [
          { word: "un", answer: "indefini" }, { word: "une", answer: "indefini" }
        ]}
      ]},
      { sentences: [
        { sentence: "Le soleil réchauffe la terre et les plantes .", targets: [
          { word: "Le", answer: "defini" }, { word: "la", answer: "defini" }, { word: "les", answer: "defini" }
        ]},
        { sentence: "Des nuages arrivent avec un vent frais .", targets: [
          { word: "Des", answer: "indefini" }, { word: "un", answer: "indefini" }
        ]}
      ]},
      { sentences: [
        { sentence: "Le miel coule lentement de la ruche .", targets: [
          { word: "Le", answer: "defini" }, { word: "la", answer: "defini" }
        ]},
        { sentence: "Des abeilles butinent une fleur .", targets: [
          { word: "Des", answer: "indefini" }, { word: "une", answer: "indefini" }
        ]}
      ]},
      { sentences: [
        { sentence: "Un dragon garde son trésor .", targets: [
          { word: "Un", answer: "indefini" }
        ]},
        { sentence: "Le dragon rugit et les villageois s'enfuient .", targets: [
          { word: "Le", answer: "defini" }, { word: "les", answer: "defini" }
        ]}
      ]},
      { sentences: [
        { sentence: "Une tempête approche avec des vents violents .", targets: [
          { word: "Une", answer: "indefini" }, { word: "des", answer: "indefini" }
        ]},
        { sentence: "La tempête frappe le village .", targets: [
          { word: "La", answer: "defini" }, { word: "le", answer: "defini" }
        ]}
      ]},
      { sentences: [
        { sentence: "L' orage gronde très fort .", targets: [
          { word: "L'", answer: "defini" }
        ]},
        { sentence: "Des éclairs illuminent le ciel sombre .", targets: [
          { word: "Des", answer: "indefini" }, { word: "le", answer: "defini" }
        ]}
      ]},
      { sentences: [
        { sentence: "Le fermier nourrit un cheval et une vache .", targets: [
          { word: "Le", answer: "defini" }, { word: "un", answer: "indefini" }, { word: "une", answer: "indefini" }
        ]},
        { sentence: "Les animaux mangent tranquillement .", targets: [
          { word: "Les", answer: "defini" }
        ]}
      ]}
    ]
  },

  "identifier-differencier-determinants-demonstratifs-possessifs": {
    title:      "Identifier et différencier les déterminants démonstratifs et possessifs",
    domaine:    "Français",
    competence: "Grammaire — Déterminants : démonstratifs et possessifs",
    type:       "det-demo-poss-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de determinants-possessifs et identifier-determinant-
       demonstratif en une seule compétence progressive, sur le modèle de
       identifier-differencier-articles-definis-indefinis. Niveau 1 : le
       déterminant est surligné dans la phrase, l'élève choisit
       possessif/démonstratif (indice à la demande sous les boutons).
       Niveau 2 : l'élève clique d'abord sur le déterminant (mots-
       cliquables) puis le qualifie (sans indice) — 1 seul déterminant par
       phrase. Niveau 3 : même mécanique, 1 phrase par item comme le
       niveau 2, mais la phrase peut contenir plusieurs déterminants à
       trouver et qualifier (facteur de difficulté vs niveau 2). */

    level1Bank: [
      { html: "Je prends <mark class=\"idi-mark\">mon</mark> cartable.", answer: "possessif", explain: "« mon » indique que le cartable appartient à la personne qui parle (1<sup>re</sup> pers. du singulier)." },
      { html: "Regarde <mark class=\"idi-mark\">cette</mark> fleur !", answer: "demonstratif", explain: "« cette » montre une fleur précise, sous les yeux de la personne à qui l'on parle." },
      { html: "Il range <mark class=\"idi-mark\">ses</mark> jouets avant de dormir.", answer: "possessif", explain: "« ses » (pluriel) indique que les jouets appartiennent à « il » (3<sup>e</sup> pers. du singulier)." },
      { html: "<mark class=\"idi-mark\">Ces</mark> nuages annoncent la pluie.", answer: "demonstratif", explain: "« Ces » désigne des nuages précis, que l'on montre." },
      { html: "Nous rangeons <mark class=\"idi-mark\">notre</mark> classe avant la récréation.", answer: "possessif", explain: "« notre » indique que la classe appartient à « nous » (1<sup>re</sup> pers. du pluriel)." },
      { html: "J'ai vu <mark class=\"idi-mark\">cet</mark> oiseau dans le jardin.", answer: "demonstratif", explain: "« cet » désigne un oiseau précis ; on emploie <em>cet</em> (et non <em>ce</em>) devant un nom masculin qui commence par une voyelle." },
      { html: "Vous avez oublié <mark class=\"idi-mark\">vos</mark> cahiers à la maison.", answer: "possessif", explain: "« vos » indique que les cahiers appartiennent à « vous » (2<sup>e</sup> pers. du pluriel)." },
      { html: "Elle a choisi <mark class=\"idi-mark\">ce</mark> livre à la bibliothèque.", answer: "demonstratif", explain: "« ce » désigne un livre précis, devant un nom masculin qui commence par une consonne." },
      { html: "Les enfants promènent <mark class=\"idi-mark\">leur</mark> chien tous les soirs.", answer: "possessif", explain: "« leur » indique que le chien appartient aux enfants (3<sup>e</sup> pers. du pluriel)." },
      { html: "Il faut ranger <mark class=\"idi-mark\">ces</mark> outils dans la remise.", answer: "demonstratif", explain: "« ces » (pluriel) désigne des outils précis, que l'on montre." }
    ],

    level2Bank: [
      { sentence: "Léa porte son sac à dos .", target: "son", answer: "possessif" },
      { sentence: "Regarde ce nuage étrange .", target: "ce", answer: "demonstratif" },
      { sentence: "Nous rangeons nos vélos dans le garage .", target: "nos", answer: "possessif" },
      { sentence: "Cette histoire est passionnante .", target: "Cette", answer: "demonstratif" },
      { sentence: "Ils apportent leurs raquettes .", target: "leurs", answer: "possessif" },
      { sentence: "Ces montagnes sont magnifiques .", target: "Ces", answer: "demonstratif" },
      { sentence: "Tu as perdu ton écharpe .", target: "ton", answer: "possessif" },
      { sentence: "J'ai goûté cet ananas .", target: "cet", answer: "demonstratif" },
      { sentence: "Vous partagez votre goûter .", target: "votre", answer: "possessif" },
      { sentence: "Elle adore ces vacances .", target: "ces", answer: "demonstratif" }
    ],

    /* 1 phrase par item (comme le niveau 2), mais chaque phrase peut
       contenir plusieurs déterminants possessifs/démonstratifs à trouver ET
       qualifier (2 à 3 selon les phrases) — c'est ce facteur de difficulté,
       et non une 2<sup>e</sup> phrase, qui distingue ce niveau du niveau 2
       (qui n'en cible qu'un seul par phrase).
       Large diversité des formes plutôt qu'une concentration artificielle
       sur la paire homophone ses/ces : les 15 possessifs (mon, ma, mes,
       ton, ta, tes, son, sa, ses, notre, nos, votre, vos, leur, leurs) et
       les 4 démonstratifs (ce, cet, cette, ces) sont chacun représentés au
       moins une fois sur les 10 phrases. Chaque démonstratif reste employé
       dans un contexte simple et naturel où le sens est évident sans effort
       (geste de pointage « Regarde/Observe », ou fait déclaratif sur un
       objet compris comme présent/visible) — jamais construit artificiellement
       via une reprise anaphorique forcée. Aucun article (le/la/les/un/une/
       des) n'est jamais une cible attendue, même quand un article apparaît
       dans la phrase comme mot non pertinent — voir la consigne du moteur
       (« déterminants possessifs et démonstratifs », jamais « déterminants »
       au sens large). Aucune forme ambiguë ne se répète deux fois dans la
       même phrase. */
    level3Bank: [
      { sentence: "Léa porte son manteau et ses bottes .", targets: [
        { word: "son", answer: "possessif" }, { word: "ses", answer: "possessif" }
      ]},
      { sentence: "Regarde cette photo de mon anniversaire !", targets: [
        { word: "cette", answer: "demonstratif" }, { word: "mon", answer: "possessif" }
      ]},
      { sentence: "Nous rangeons notre chambre pendant que vous rangez vos jouets .", targets: [
        { word: "notre", answer: "possessif" }, { word: "vos", answer: "possessif" }
      ]},
      { sentence: "Ce livre appartient à ma sœur .", targets: [
        { word: "Ce", answer: "demonstratif" }, { word: "ma", answer: "possessif" }
      ]},
      { sentence: "Tu as oublié ton écharpe et tes gants .", targets: [
        { word: "ton", answer: "possessif" }, { word: "tes", answer: "possessif" }
      ]},
      { sentence: "Cet exercice est difficile, mais ta persévérance est remarquable .", targets: [
        { word: "Cet", answer: "demonstratif" }, { word: "ta", answer: "possessif" }
      ]},
      { sentence: "Ils rangent leurs vélos pendant que leur père répare la voiture .", targets: [
        { word: "leurs", answer: "possessif" }, { word: "leur", answer: "possessif" }
      ]},
      { sentence: "Sa robe et ces chaussures vont très bien ensemble .", targets: [
        { word: "Sa", answer: "possessif" }, { word: "ces", answer: "demonstratif" }
      ]},
      { sentence: "Suivez mes conseils et prenez votre temps .", targets: [
        { word: "mes", answer: "possessif" }, { word: "votre", answer: "possessif" }
      ]},
      { sentence: "Regardez ces étoiles : nos ancêtres les observaient déjà .", targets: [
        { word: "ces", answer: "demonstratif" }, { word: "nos", answer: "possessif" }
      ]}
    ]
  },

});

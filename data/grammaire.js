/* ── data/grammaire.js — Grammaire (17 exercices) ──────────────────────────
   Extrait de exercise-data.js (migration par domaine). Chaque fichier de domaine
   s'enregistre lui-même dans window.EXERCISE_DATA : l'ordre de chargement entre
   fichiers de domaine n'a donc pas d'importance.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "identifier-determinant-demonstratif": {
    title: "Identifier un déterminant démonstratif",
    domaine:    "Français",
    competence: "Grammaire — Déterminants démonstratifs",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3, /* nombre réel de paliers du moteur */
    type: "det-demo-niveaux",
    backLink: { href: "français-grammaire.html", label: "Grammaire" },

    /* ── Niveau 1 : clique sur le déterminant démonstratif ─────────────────
       targets = tableau des formes attendues (version "clean" sans ponctuation)
    ─────────────────────────────────────────────────────────────────────── */
    lvl1Bank: [
      {
        sentence: "Ce matin, le soleil brille dans le ciel.",
        targets: ["Ce"],
        feedbackOk: "Oui ! <strong>Ce</strong> est un déterminant démonstratif : il est placé devant le nom <em>matin</em> pour désigner un moment précis.",
        feedbackErr: "Le déterminant démonstratif est <strong>Ce</strong>, placé devant le nom <em>matin</em>. <em>Le</em> est un article défini, pas un démonstratif."
      },
      {
        sentence: "J'ai lu cet article très intéressant.",
        targets: ["cet"],
        feedbackOk: "Bravo ! <strong>Cet</strong> s'emploie devant un nom masculin singulier qui commence par une <strong>voyelle</strong> (<em>article</em> commence par <em>a</em>).",
        feedbackErr: "Le déterminant démonstratif est <strong>cet</strong>. On l'emploie devant un nom masculin singulier commençant par une voyelle ou un h muet (<em>article</em> → voyelle <em>a</em>)."
      },
      {
        sentence: "Regarde cette belle fleur dans le jardin !",
        targets: ["cette"],
        feedbackOk: "Oui ! <strong>Cette</strong> est le déterminant démonstratif féminin singulier, placé devant le nom <em>fleur</em>.",
        feedbackErr: "Le déterminant démonstratif est <strong>cette</strong>, féminin singulier, devant le nom <em>fleur</em>. <em>Le</em> est un article défini."
      },
      {
        sentence: "Ces enfants jouent dans la cour de l'école.",
        targets: ["Ces"],
        feedbackOk: "Parfait ! <strong>Ces</strong> est la forme plurielle du déterminant démonstratif — il désigne plusieurs enfants à la fois.",
        feedbackErr: "Le déterminant démonstratif est <strong>Ces</strong> (pluriel). <em>La</em> et <em>l'</em> sont des articles définis."
      },
      {
        sentence: "Mon voisin promène son chien dans ce parc.",
        targets: ["ce"],
        feedbackOk: "Bien trouvé ! <strong>Ce</strong> est un déterminant démonstratif (masculin singulier devant consonne), placé devant le nom <em>parc</em>.",
        feedbackErr: "Le déterminant démonstratif est <strong>ce</strong>, devant le nom <em>parc</em>. <em>Mon</em> et <em>son</em> sont des déterminants possessifs, pas démonstratifs."
      },
      {
        sentence: "Cet homme est très gentil avec les voisins.",
        targets: ["Cet"],
        feedbackOk: "Excellent ! <strong>Cet</strong> s'utilise devant un nom masculin commençant par un <strong>h muet</strong> (<em>homme</em>). On prononce « cet·homme » avec une liaison.",
        feedbackErr: "Le déterminant démonstratif est <strong>Cet</strong>, devant <em>homme</em>. On emploie <em>cet</em> (et non <em>ce</em>) car <em>homme</em> commence par un h muet — le h muet entraîne la liaison comme une voyelle."
      },
      {
        sentence: "Elle range ses affaires dans cette armoire.",
        targets: ["cette"],
        feedbackOk: "Bravo ! <strong>Cette</strong> est le déterminant démonstratif féminin singulier, placé devant le nom <em>armoire</em>.",
        feedbackErr: "Le déterminant démonstratif est <strong>cette</strong>, devant le nom féminin <em>armoire</em>. <em>Ses</em> est un déterminant possessif (il indique l'appartenance)."
      },
      {
        sentence: "Les élèves rangent leurs livres sur ces étagères.",
        targets: ["ces"],
        feedbackOk: "Oui ! <strong>Ces</strong> est le déterminant démonstratif pluriel, placé devant le nom <em>étagères</em> pour désigner des étagères précises.",
        feedbackErr: "Le déterminant démonstratif est <strong>ces</strong> (pluriel), devant <em>étagères</em>. <em>Les</em> est un article défini et <em>leurs</em> est un déterminant possessif."
      }
    ],

    /* ── Niveau 2 : 2 étapes — observe le nom, puis choisis le démonstratif ──
       genre    : "masculin" | "féminin"
       nombre   : "singulier" | "pluriel"
       initiale : "consonne" | "voyelle" | "h muet"  (ignoré si pluriel)
       answer   : "ce" | "cet" | "cette" | "ces"
    ─────────────────────────────────────────────────────────────────────── */
    lvl2Bank: [
      {
        phrase: "___ avion décolle dans cinq minutes.",
        noun: "avion", genre: "masculin", nombre: "singulier", initiale: "voyelle", answer: "cet",
        explication: "<strong>Cet</strong> : masculin singulier commençant par une voyelle (<em>a</em>)."
      },
      {
        phrase: "___ homme est arrivé ce matin.",
        noun: "homme", genre: "masculin", nombre: "singulier", initiale: "h muet", answer: "cet",
        explication: "<strong>Cet</strong> : masculin singulier commençant par un h muet (liaison comme une voyelle)."
      },
      {
        phrase: "___ amie est très sympathique.",
        noun: "amie", genre: "féminin", nombre: "singulier", initiale: "voyelle", answer: "cette",
        explication: "<strong>Cette</strong> : féminin singulier. Même devant une voyelle, on dit <em>cette</em> et non *<em>cet</em>."
      },
      {
        phrase: "___ oiseaux font leurs nids dans les arbres.",
        noun: "oiseaux", genre: "masculin", nombre: "pluriel", initiale: "voyelle", answer: "ces",
        explication: "<strong>Ces</strong> : toujours au pluriel, quel que soit le genre ou l'initiale."
      },
      {
        phrase: "___ livre est vraiment passionnant.",
        noun: "livre", genre: "masculin", nombre: "singulier", initiale: "consonne", answer: "ce",
        explication: "<strong>Ce</strong> : masculin singulier commençant par une consonne."
      },
      {
        phrase: "___ fleur sent très bon.",
        noun: "fleur", genre: "féminin", nombre: "singulier", initiale: "consonne", answer: "cette",
        explication: "<strong>Cette</strong> : féminin singulier."
      },
      {
        phrase: "Regarde ___ beau château !",
        noun: "château", genre: "masculin", nombre: "singulier", initiale: "consonne", answer: "ce",
        explication: "<strong>Ce</strong> : masculin singulier devant consonne."
      },
      {
        phrase: "___ chaussures sont toutes neuves.",
        noun: "chaussures", genre: "féminin", nombre: "pluriel", initiale: "consonne", answer: "ces",
        explication: "<strong>Ces</strong> : pluriel (ici féminin pluriel)."
      },
      {
        phrase: "___ école est vraiment très grande.",
        noun: "école", genre: "féminin", nombre: "singulier", initiale: "voyelle", answer: "cette",
        explication: "<strong>Cette</strong> : féminin singulier. Contrairement au masculin, le féminin ne prend pas <em>cet</em> devant une voyelle."
      },
      {
        phrase: "___ jouets sont éparpillés dans le salon.",
        noun: "jouets", genre: "masculin", nombre: "pluriel", initiale: "consonne", answer: "ces",
        explication: "<strong>Ces</strong> : pluriel. Ne pas confondre avec <em>ses</em> (possessif) : <em>ces jouets</em> = on montre des jouets précis ; <em>ses jouets</em> = les jouets lui appartiennent.",
        noteSesCes: true
      }
    ],

    /* ── Niveau 3 : ce ou se ? (20 items, score /20) ───────────────────────
       answer : "ce" (déterminant devant nom) | "se" (pronom réfléchi devant verbe)
    ─────────────────────────────────────────────────────────────────────── */
    lvl3Bank: [
      /* ── « ce » devant un nom ── */
      { sentence: "___ chien aboie très fort.",                          answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>chien</em>." },
      { sentence: "J'aime beaucoup ___ film.",                           answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>film</em>." },
      { sentence: "___ problème est difficile à résoudre.",              answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>problème</em>." },
      { sentence: "Regarde ___ beau papillon !",                        answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>papillon</em> (l'adjectif <em>beau</em> est intercalé)." },
      { sentence: "___ livre est vraiment passionnant.",                 answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>livre</em>." },
      { sentence: "Elle habite dans ___ quartier depuis longtemps.",     answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>quartier</em>." },
      { sentence: "Il travaille dans ___ bureau depuis l'an dernier.",   answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>bureau</em>." },
      { sentence: "Prends ___ chemin, c'est plus court.",               answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>chemin</em>." },
      { sentence: "Nous allons voir ___ spectacle demain.",              answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>spectacle</em>." },
      { sentence: "___ matin, Paul se lève tôt.",                       answer: "ce",
        explication: "<strong>Ce</strong> est un déterminant démonstratif : placé devant le nom <em>matin</em>. Dans cette même phrase, <em>se</em> est un pronom réfléchi devant le verbe <em>lève</em>." },
      /* ── « se » devant un verbe (pronom réfléchi) ── */
      { sentence: "Le chat ___ lave les pattes.",                       answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : placé devant le verbe <em>lave</em>. Test : on peut dire <em>je me lave</em> → c'est bien un pronom réfléchi." },
      { sentence: "Il ___ lève tôt chaque matin.",                      answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : placé devant le verbe <em>lève</em>. Test : <em>je me lève</em> → pronom réfléchi." },
      { sentence: "Elle ___ promène dans le parc.",                     answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : placé devant le verbe <em>promène</em>. Test : <em>je me promène</em>." },
      { sentence: "Paul ___ dépêche d'aller à l'école.",                answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>dépêche</em>. Test : <em>je me dépêche</em>." },
      { sentence: "Les enfants ___ couchent à vingt et une heures.",    answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>couchent</em>. Test : <em>je me couche</em>." },
      { sentence: "Tom ___ regarde dans le miroir.",                    answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>regarde</em>. Test : <em>je me regarde</em>." },
      { sentence: "Ma sœur ___ peigne les cheveux chaque matin.",       answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>peigne</em>. Test : <em>je me peigne</em>." },
      { sentence: "Il ___ tait quand le professeur parle.",             answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>tait</em>. Test : <em>je me tais</em>." },
      { sentence: "Ils ___ parlent souvent après la classe.",           answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>parlent</em>. Test : <em>nous nous parlons</em>." },
      { sentence: "Ce matin, Paul ___ lève tôt.",                       answer: "se",
        explication: "<strong>Se</strong> est un pronom réfléchi : devant le verbe <em>lève</em>. Test : <em>je me lève</em>. Dans cette même phrase, <em>Ce</em> est un déterminant démonstratif devant le nom <em>matin</em>." }
    ]
  },

  "identifier-adjectif": {
    title: "Identifier les adjectifs",
    domaine:    "Français",
    competence: "Grammaire — L'adjectif",
    levels: ["CM1", "CM2", "6e"],
    paliers: 1, /* nombre réel de paliers du moteur */
    type: "mots-cliquables",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les adjectifs parmi ces mots. (Ils peuvent décrire : le chat.)",
        sentence: "petit noir mange maison silencieusement rapide",
        targets: ["petit", "noir", "rapide"],
        piege: {
          "mange": "« mange » est un verbe.",
          "maison": "« maison » est un nom.",
          "silencieusement": "« silencieusement » est un adverbe (finit souvent en -ment)."
        }
      },
      {
        instruction: "Clique sur tous les adjectifs parmi ces mots. (Ils peuvent décrire : la fille.)",
        sentence: "jolie gentille chante école doucement bleue",
        targets: ["jolie", "gentille", "bleue"],
        piege: {
          "chante": "« chante » est un verbe.",
          "école": "« école » est un nom.",
          "doucement": "« doucement » est un adverbe (finit en -ment)."
        }
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "La petite chatte grise dort sur le canapé confortable .",
        targets: ["petite", "grise", "confortable"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Un élève curieux lit un livre passionnant .",
        targets: ["curieux", "passionnant"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Il marche lentement dans la rue bondée .",
        targets: ["bondée"],
        piege: { "lentement": "« lentement » est un adverbe (il décrit le verbe « marche »), pas un adjectif." }
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "La porte fermée cache un couloir sombre .",
        targets: ["fermée", "sombre"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Ces beaux oiseaux chantent des mélodies douces .",
        targets: ["beaux", "douces"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les adjectifs dans la phrase.",
        sentence: "Mon grand-père prépare une soupe chaude .",
        targets: ["chaude"],
        piege: { "grand-père": "« grand-père » est un nom composé, pas un adjectif." }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "rouge grand table joyeux",
        targets: ["table"],
        piege: {
          "rouge": "« rouge » est un adjectif de couleur — cherche l'intrus !",
          "grand": "« grand » est un adjectif — cherche l'intrus !",
          "joyeux": "« joyeux » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "rapide courir fort doux",
        targets: ["courir"],
        piege: {
          "rapide": "« rapide » est un adjectif — cherche l'intrus !",
          "fort": "« fort » est un adjectif — cherche l'intrus !",
          "doux": "« doux » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "beau maison petit léger",
        targets: ["maison"],
        piege: {
          "beau": "« beau » est un adjectif — cherche l'intrus !",
          "petit": "« petit » est un adjectif — cherche l'intrus !",
          "léger": "« léger » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "chanter triste sage bleu",
        targets: ["chanter"],
        piege: {
          "triste": "« triste » est un adjectif — cherche l'intrus !",
          "sage": "« sage » est un adjectif — cherche l'intrus !",
          "bleu": "« bleu » est un adjectif de couleur — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "lentement heureux vif froid",
        targets: ["lentement"],
        piege: {
          "heureux": "« heureux » est un adjectif — cherche l'intrus !",
          "vif": "« vif » est un adjectif — cherche l'intrus !",
          "froid": "« froid » est un adjectif — cherche l'intrus !"
        }
      },
      {
        instruction: "Clique sur le mot qui N'EST PAS un adjectif (l'intrus).",
        sentence: "verte lumière ancienne nouvelle",
        targets: ["lumière"],
        piege: {
          "verte": "« verte » est un adjectif de couleur — cherche l'intrus !",
          "ancienne": "« ancienne » est un adjectif — cherche l'intrus !",
          "nouvelle": "« nouvelle » est un adjectif — cherche l'intrus !"
        }
      }
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
    title: "Identifier les noms dans une phrase",
    domaine:    "Français",
    competence: "Grammaire — Le nom",
    levels: ["CM1", "CM2", "6e"],
    paliers: 1, /* nombre réel de paliers du moteur */
    type: "mots-cliquables",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "Le chien mange sa nourriture dans le jardin .",
        targets: ["chien", "nourriture", "jardin"],
        piege: {}
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "La porte de la salle claque .",
        targets: ["porte", "salle"],
        piege: { "claque": "« claque » est un verbe (la porte claque). Les noms s'accompagnent souvent d'un déterminant." }
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "L' astronaute voyage vers la planète rouge .",
        targets: ["astronaute", "planète"],
        piege: { "rouge": "« rouge » est un adjectif, pas un nom. Les noms ont souvent un déterminant devant eux." }
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "Le cuisinier prépare une délicieuse soupe .",
        targets: ["cuisinier", "soupe"],
        piege: { "délicieuse": "« délicieuse » est un adjectif (il décrit la soupe). Le nom, c'est « soupe »." }
      },
      {
        instruction: "Clique sur tous les noms dans la phrase.",
        sentence: "Les enfants lisent des histoires amusantes .",
        targets: ["enfants", "histoires"],
        piege: { "amusantes": "« amusantes » est un adjectif. Les noms ici sont « enfants » et « histoires »." }
      },
      {
        instruction: "Clique sur tous les noms (communs ET propres) dans la phrase.",
        sentence: "Emma joue au football avec ses amis .",
        targets: ["Emma", "football", "amis"],
        piege: {}
      },
      { instruction: "Classe ce nom : ville",       sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« ville » est un nom commun : il désigne n'importe quelle ville, sans majuscule." } },
      { instruction: "Classe ce nom : fleuve",      sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« fleuve » est un nom commun : il désigne n'importe quel fleuve." } },
      { instruction: "Classe ce nom : chien",       sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« chien » est un nom commun : il désigne n'importe quel chien." } },
      { instruction: "Classe ce nom : professeur",  sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« professeur » est un nom commun : il désigne n'importe quel professeur." } },
      { instruction: "Classe ce nom : livre",       sentence: "commun   propre", targets: ["commun"], piege: { "propre":  "« livre » est un nom commun." } },
      { instruction: "Classe ce nom : Madrid",      sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« Madrid » est un nom propre : il désigne une ville particulière et prend une majuscule." } },
      { instruction: "Classe ce nom : Emma",        sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« Emma » est un nom propre : c'est un prénom, il prend une majuscule." } },
      { instruction: "Classe ce nom : la Seine",    sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« la Seine » est un nom propre : c'est le nom d'un fleuve particulier." } },
      { instruction: "Classe ce nom : Léa",         sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« Léa » est un nom propre : c'est un prénom." } },
      { instruction: "Classe ce nom : LFM",         sentence: "commun   propre", targets: ["propre"],  piege: { "commun": "« LFM » est un nom propre : c'est le sigle d'une école particulière." } },
      {
        instruction: "Quel nom répond à cette devinette ? On y range les livres de la classe.",
        sentence: "bibliothèque ranger grand table",
        targets: ["bibliothèque"],
        piege: {
          "ranger": "« ranger » est un verbe à l'infinitif, pas un nom.",
          "grand": "« grand » est un adjectif, pas un nom.",
          "table": "« table » est un nom, mais on ne range pas des livres sur une table... réfléchis !"
        }
      },
      {
        instruction: "Quel nom répond à cette devinette ? Il apporte la lumière pendant la journée.",
        sentence: "soleil briller chaud nuit",
        targets: ["soleil"],
        piege: {
          "briller": "« briller » est un verbe.",
          "chaud": "« chaud » est un adjectif.",
          "nuit": "« nuit » est aussi un nom, mais elle n'apporte pas la lumière !"
        }
      },
      {
        instruction: "Quel nom répond à cette devinette ? On y joue avec ses camarades à la récréation.",
        sentence: "terrain jouer amusant ballon",
        targets: ["terrain"],
        piege: {
          "jouer": "« jouer » est un verbe.",
          "amusant": "« amusant » est un adjectif.",
          "ballon": "« ballon » est un nom, mais on joue AVEC un ballon, pas SUR un ballon !"
        }
      },
      {
        instruction: "Quel nom répond à cette devinette ? Elle coule de la montagne vers la mer.",
        sentence: "rivière couler froide cascade",
        targets: ["rivière"],
        piege: {
          "couler": "« couler » est un verbe.",
          "froide": "« froide » est un adjectif.",
          "cascade": "« cascade » coule aussi, mais c'est une chute d'eau verticale, pas une rivière !"
        }
      }
    ]
  },

  "distinguer-phrase-simple-complexe": {
    title: "Distinguer phrase simple et phrase complexe",
    domaine:    "Français",
    competence: "Grammaire — Phrase simple et complexe",
    levels: ["CM2", "6e"],
    paliers: 1, /* nombre réel de paliers du moteur */
    type: "classification-etapes",
    questionsPerSession: 8,
    backLink: { href: "français-grammaire.html", label: "Grammaire" },
    bank: [
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
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Les enfants rient et courent dans la cour.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["rient", "courent"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
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
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Le footballeur tire le ballon et marque un but.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["tire", "marque"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (travailler = infinitif !)",
        sentence: "La maîtresse demande aux élèves de travailler en silence.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["demande"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Le soleil brille dans le ciel bleu.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["brille"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
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
        sentence: "Les oiseaux chantent et les fleurs poussent au printemps.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["chantent", "poussent"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (jouer = infinitif !)",
        sentence: "Mon chat adore jouer avec la pelote de laine.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["adore"],
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
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
        sentence: "Les élèves écoutent quand le professeur parle.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
        step1Targets: ["écoutent", "parle"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "complexe"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase. (décoller = infinitif !)",
        sentence: "La fusée va décoller dans dix secondes.",
        step1Instruction: "Clique sur le(s) verbe(s) conjugué(s). Attention à l'infinitif !",
        step1Targets: ["va"],
        step2Instruction: "Cette phrase est-elle simple ou complexe ?",
        classifyChoices: ["simple", "complexe"],
        step2Answer: "simple"
      },
      {
        instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
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
    levels: ["CM2", "6e"],
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
    paliers:    4, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de identifier-phrase-declarative/interrogative/imperative/exclamative
       (Lot 6, groupe 1). Niveaux 1-3 : QCM sur le TYPE de phrase (mutuellement
       exclusifs). Niveau 4 : identifier-phrase-negative — la négation est une
       FORME (orthogonale aux types, ex. une phrase peut être déclarative ET
       négative), traitée à part en oui/non plutôt que fondue dans le QCM. */

    lvl1: [
      { sentence: "Le chien court.", correctType: "déclarative" },
      { sentence: "Je mange une pomme.", correctType: "déclarative" },
      { sentence: "Emma joue du piano.", correctType: "déclarative" },
      { sentence: "Il pleut depuis ce matin.", correctType: "déclarative" },
      { sentence: "Le train arrive à la gare.", correctType: "déclarative" },
      { sentence: "Mon frère lit une bande dessinée.", correctType: "déclarative" },
      { sentence: "Les oiseaux chantent dans les arbres.", correctType: "déclarative" },
      { sentence: "La maîtresse distribue les cahiers.", correctType: "déclarative" },
      { sentence: "Les enfants jouent dans la cour.", correctType: "déclarative" },
      { sentence: "Papa prépare le dîner.", correctType: "déclarative" },
      { sentence: "Le jardin est couvert de fleurs.", correctType: "déclarative" },
      { sentence: "Vous êtes très gentils.", correctType: "déclarative" },
      { sentence: "Le soleil se couche derrière les montagnes.", correctType: "déclarative" },
      { sentence: "Après la récréation, les élèves retournent calmement dans leur classe.", correctType: "déclarative" },
      { sentence: "Dans le jardin, les fleurs poussent rapidement au printemps.", correctType: "déclarative" },
      { sentence: "Où vas-tu ce matin ?", correctType: "interrogative" },
      { sentence: "As-tu fini tes devoirs ?", correctType: "interrogative" },
      { sentence: "Qu'est-ce que tu aimes lire ?", correctType: "interrogative" },
      { sentence: "Est-ce que tu viens à la fête ?", correctType: "interrogative" },
      { sentence: "Comment s'appelle ton chat ?", correctType: "interrogative" },
      { sentence: "Pourquoi es-tu en retard ?", correctType: "interrogative" },
      { sentence: "Veux-tu jouer avec nous ?", correctType: "interrogative" }
    ],

    lvl2: [
      { sentence: "Le chien court.", correctType: "déclarative" },
      { sentence: "Je mange une pomme.", correctType: "déclarative" },
      { sentence: "Emma joue du piano.", correctType: "déclarative" },
      { sentence: "Il pleut depuis ce matin.", correctType: "déclarative" },
      { sentence: "Le train arrive à la gare.", correctType: "déclarative" },
      { sentence: "Mon frère lit une bande dessinée.", correctType: "déclarative" },
      { sentence: "Les oiseaux chantent dans les arbres.", correctType: "déclarative" },
      { sentence: "La maîtresse distribue les cahiers.", correctType: "déclarative" },
      { sentence: "Les enfants jouent dans la cour.", correctType: "déclarative" },
      { sentence: "Papa prépare le dîner.", correctType: "déclarative" },
      { sentence: "Le jardin est couvert de fleurs.", correctType: "déclarative" },
      { sentence: "Vous êtes très gentils.", correctType: "déclarative" },
      { sentence: "Le soleil se couche derrière les montagnes.", correctType: "déclarative" },
      { sentence: "Après la récréation, les élèves retournent calmement dans leur classe.", correctType: "déclarative" },
      { sentence: "Dans le jardin, les fleurs poussent rapidement au printemps.", correctType: "déclarative" },
      { sentence: "Où vas-tu ce matin ?", correctType: "interrogative" },
      { sentence: "As-tu fini tes devoirs ?", correctType: "interrogative" },
      { sentence: "Qu'est-ce que tu aimes lire ?", correctType: "interrogative" },
      { sentence: "Est-ce que tu viens à la fête ?", correctType: "interrogative" },
      { sentence: "Comment s'appelle ton chat ?", correctType: "interrogative" },
      { sentence: "Pourquoi es-tu en retard ?", correctType: "interrogative" },
      { sentence: "Veux-tu jouer avec nous ?", correctType: "interrogative" },
      { sentence: "Ferme la porte.", correctType: "impérative" },
      { sentence: "Range tes affaires.", correctType: "impérative" },
      { sentence: "Lis ce livre avec attention.", correctType: "impérative" },
      { sentence: "Venez écouter l'histoire.", correctType: "impérative" },
      { sentence: "N'oublie pas ton manteau.", correctType: "impérative" },
      { sentence: "Levez-vous tous ensemble.", correctType: "impérative" },
      { sentence: "Écris ton prénom en haut de la page.", correctType: "impérative" }
    ],

    lvl3: [
      { sentence: "Le chien court.", correctType: "déclarative" },
      { sentence: "Je mange une pomme.", correctType: "déclarative" },
      { sentence: "Emma joue du piano.", correctType: "déclarative" },
      { sentence: "Il pleut depuis ce matin.", correctType: "déclarative" },
      { sentence: "Le train arrive à la gare.", correctType: "déclarative" },
      { sentence: "Mon frère lit une bande dessinée.", correctType: "déclarative" },
      { sentence: "Les oiseaux chantent dans les arbres.", correctType: "déclarative" },
      { sentence: "La maîtresse distribue les cahiers.", correctType: "déclarative" },
      { sentence: "Les enfants jouent dans la cour.", correctType: "déclarative" },
      { sentence: "Papa prépare le dîner.", correctType: "déclarative" },
      { sentence: "Le jardin est couvert de fleurs.", correctType: "déclarative" },
      { sentence: "Vous êtes très gentils.", correctType: "déclarative" },
      { sentence: "Le soleil se couche derrière les montagnes.", correctType: "déclarative" },
      { sentence: "Après la récréation, les élèves retournent calmement dans leur classe.", correctType: "déclarative" },
      { sentence: "Dans le jardin, les fleurs poussent rapidement au printemps.", correctType: "déclarative" },
      { sentence: "Où vas-tu ce matin ?", correctType: "interrogative" },
      { sentence: "As-tu fini tes devoirs ?", correctType: "interrogative" },
      { sentence: "Qu'est-ce que tu aimes lire ?", correctType: "interrogative" },
      { sentence: "Est-ce que tu viens à la fête ?", correctType: "interrogative" },
      { sentence: "Comment s'appelle ton chat ?", correctType: "interrogative" },
      { sentence: "Pourquoi es-tu en retard ?", correctType: "interrogative" },
      { sentence: "Veux-tu jouer avec nous ?", correctType: "interrogative" },
      { sentence: "Ferme la porte.", correctType: "impérative" },
      { sentence: "Range tes affaires.", correctType: "impérative" },
      { sentence: "Lis ce livre avec attention.", correctType: "impérative" },
      { sentence: "Venez écouter l'histoire.", correctType: "impérative" },
      { sentence: "N'oublie pas ton manteau.", correctType: "impérative" },
      { sentence: "Levez-vous tous ensemble.", correctType: "impérative" },
      { sentence: "Écris ton prénom en haut de la page.", correctType: "impérative" },
      { sentence: "Quelle belle journée !", correctType: "exclamative" },
      { sentence: "Comme tu es grand !", correctType: "exclamative" },
      { sentence: "Quel dommage !", correctType: "exclamative" },
      { sentence: "Comme c'est magnifique !", correctType: "exclamative" },
      { sentence: "Que tu es intelligent !", correctType: "exclamative" },
      { sentence: "Quel beau dessin tu as fait !", correctType: "exclamative" },
      { sentence: "Comme il fait froid ce matin !", correctType: "exclamative" }
    ],

    lvl4: [
      { sentence: "Je ne mange pas de viande.", isNegative: true },
      { sentence: "Elle ne lit jamais le soir.", isNegative: true },
      { sentence: "Nous n'allons plus à cette école.", isNegative: true },
      { sentence: "Il n'a pas encore fini ses devoirs.", isNegative: true },
      { sentence: "N'oublie pas tes affaires.", isNegative: true },
      { sentence: "Ne crie pas dans les couloirs.", isNegative: true },
      { sentence: "Il ne dit rien à personne.", isNegative: true },
      { sentence: "Le chat dort sur le canapé.", isNegative: false },
      { sentence: "Mes amis jouent au foot.", isNegative: false },
      { sentence: "Quelle belle histoire !", isNegative: false },
      { sentence: "Viens jouer avec moi.", isNegative: false },
      { sentence: "As-tu faim ?", isNegative: false },
      { sentence: "Prends ton manteau.", isNegative: false },
      { sentence: "La rivière coule doucement.", isNegative: false }
    ]
  },

  "transformer-phrase": {
    title:      "Transformer une phrase (interrogative, négative)",
    domaine:    "Français",
    competence: "Grammaire — Transformer une phrase",
    type:       "transformer-phrase-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    2, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de transformer-declarative-interrogative (niveau 1) et
       transformer-affirmative-negative (niveau 2) — Lot 6, groupe 2. */

    lvl1: [
      { sentence: "Tu ranges tes affaires.", keyWords: ["ranges", "affaires"], modelEcQ: "Est-ce que tu ranges tes affaires ?", modelInv: "Ranges-tu tes affaires ?" },
      { sentence: "Il mange une pomme.", keyWords: ["mange", "pomme"], modelEcQ: "Est-ce qu'il mange une pomme ?", modelInv: "Mange-t-il une pomme ?" },
      { sentence: "Les enfants jouent dans le jardin.", keyWords: ["enfants", "jouent", "jardin"], modelEcQ: "Est-ce que les enfants jouent dans le jardin ?", modelInv: "Les enfants jouent-ils dans le jardin ?" },
      { sentence: "Elle lit un livre.", keyWords: ["lit", "livre"], modelEcQ: "Est-ce qu'elle lit un livre ?", modelInv: "Lit-elle un livre ?" },
      { sentence: "Vous aimez la musique.", keyWords: ["aimez", "musique"], modelEcQ: "Est-ce que vous aimez la musique ?", modelInv: "Aimez-vous la musique ?" },
      { sentence: "Papa prépare le dîner.", keyWords: ["prépare", "dîner"], modelEcQ: "Est-ce que papa prépare le dîner ?", modelInv: "Papa prépare-t-il le dîner ?" },
      { sentence: "Nous partons en vacances demain.", keyWords: ["partons", "vacances", "demain"], modelEcQ: "Est-ce que nous partons en vacances demain ?", modelInv: "Partons-nous en vacances demain ?" },
      { sentence: "Le chat dort sur le canapé.", keyWords: ["chat", "dort", "canapé"], modelEcQ: "Est-ce que le chat dort sur le canapé ?", modelInv: "Le chat dort-il sur le canapé ?" },
      { sentence: "Les élèves écoutent la maîtresse.", keyWords: ["élèves", "écoutent", "maîtresse"], modelEcQ: "Est-ce que les élèves écoutent la maîtresse ?", modelInv: "Les élèves écoutent-ils la maîtresse ?" },
      { sentence: "Tu viens à la fête samedi.", keyWords: ["viens", "fête", "samedi"], modelEcQ: "Est-ce que tu viens à la fête samedi ?", modelInv: "Viens-tu à la fête samedi ?" }
    ],

    lvl2: [
      { sentence: "Tu ranges tes affaires.", keyWords: ["ranges", "affaires"], modelNeg: "Tu ne ranges pas tes affaires." },
      { sentence: "Il mange des bonbons.", keyWords: ["mange", "bonbons"], modelNeg: "Il ne mange pas de bonbons." },
      { sentence: "Les enfants jouent dans le jardin.", keyWords: ["enfants", "jouent", "jardin"], modelNeg: "Les enfants ne jouent pas dans le jardin." },
      { sentence: "Elle lit tous les soirs.", keyWords: ["lit", "soirs"], modelNeg: "Elle ne lit pas tous les soirs." },
      { sentence: "Nous aimons la pizza.", keyWords: ["aimons", "pizza"], modelNeg: "Nous n'aimons pas la pizza." },
      { sentence: "Je comprends la leçon.", keyWords: ["comprends", "leçon"], modelNeg: "Je ne comprends pas la leçon." },
      { sentence: "Le chat dort sur le canapé.", keyWords: ["chat", "dort", "canapé"], modelNeg: "Le chat ne dort pas sur le canapé." },
      { sentence: "Vous regardez la télévision.", keyWords: ["regardez", "télévision"], modelNeg: "Vous ne regardez pas la télévision." },
      { sentence: "Papa prépare le dîner.", keyWords: ["prépare", "dîner"], modelNeg: "Papa ne prépare pas le dîner." },
      { sentence: "Les élèves écoutent la maîtresse.", keyWords: ["élèves", "écoutent", "maîtresse"], modelNeg: "Les élèves n'écoutent pas la maîtresse." }
    ]
  },

  "articles-definis": {
    title:      "Les articles définis (le, la, les, l')",
    domaine:    "Français",
    competence: "Grammaire — Déterminants : articles définis",
    type:       "articles-definis-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de identifier-article-defini (niveau 1, mots cliquables),
       articles-definis-choix (niveau 2, choix d'étiquette) et
       articles-definis-completer (niveau 3, glisser-déposer) — Lot 6,
       groupe 3a. Le niveau 3 n'a qu'un seul item (banque d'origine),
       absorbé tel quel plutôt que supprimé. */

    lvl1: [
      { instruction: "Clique sur tous les articles définis dans ce texte.", sentence: "Le chien joue dans le jardin . Il renifle les fleurs et s' approche de la fontaine . Le soleil brille et l' air est doux .", targets: ["Le","le","les","la","l'"], piege: {}, note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet." },
      { instruction: "Clique sur tous les articles définis dans ce texte.", sentence: "La classe prépare la pièce de théâtre . Les élèves apprennent le texte et l' institutrice sourit . Le spectacle aura lieu vendredi .", targets: ["La","la","Les","le","l'","Le"], piege: {}, note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet." },
      { instruction: "Clique sur tous les articles définis dans ce texte.", sentence: "L' hiver arrive dans la montagne . La neige recouvre les sapins et le sentier disparaît sous le blanc . Les randonneurs rentrent au refuge .", targets: ["L'","la","La","les","le","Les","au"], piege: {}, note: "💡 <b>L'</b> et <b>au</b> (= à + le) sont des articles définis contractés." },
      { instruction: "Clique sur tous les articles définis dans ce texte.", sentence: "Le soir , l' enfant lit le livre que sa maman lui a offert . Les illustrations sont magnifiques et les couleurs très vives .", targets: ["Le","l'","le","Les","les"], piege: {}, note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet." },
      { instruction: "Clique sur tous les articles définis dans ce texte.", sentence: "La fermière nourrit les poules avec le grain . L' après-midi , elle va au marché acheter les légumes . Le soir , elle ferme la porte .", targets: ["La","les","le","L'","au","Le","la"], piege: {}, note: "💡 <b>L'</b> et <b>au</b> (= à + le) sont des articles définis contractés." },
      { instruction: "Clique sur tous les articles définis dans ce texte. Attention, il y a peut-être un piège !", sentence: "Les oiseaux font leur nid dans l' arbre près de la haie . Le chat les observe depuis la fenêtre sans bouger . Il les guette depuis des heures .", targets: ["Les","l'","la","Le"], piege: { "les": "Ici, « les » remplace un nom (les oiseaux). C'est un pronom personnel, pas un article !" }, note: "💡 <b>L'</b> est un article défini contracté : il remplace <b>le</b> ou <b>la</b> devant une voyelle ou un <i>h</i> muet." }
    ],

    lvl2: [
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🐱", word: "chat", answer: "le", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🏫", word: "école", answer: "l'", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🌳", word: "arbre", answer: "l'", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🐶", word: "chiens", answer: "les", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🌙", word: "lune", answer: "la", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🤝", word: "ami", answer: "l'", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "🌸", word: "fleurs", answer: "les", choices: ["le","la","les","l'"] },
      { instruction: "Quel article défini va avec ce nom ?", emoji: "☀️", word: "soleil", answer: "le", choices: ["le","la","les","l'"] }
    ],

    lvl3: [
      { instruction: "Place les bons articles définis dans les cases. Attention à l'intrus !", template: "___ printemps est arrivé ! ___ hirondelles reviennent dans ___ ciel. ___ école organise une sortie dans la forêt.", blanks: ["Le","Les","le","L'"], bank: ["Le","Les","le","L'","des"] }
    ]
  },

  "determinants-possessifs": {
    title:      "Les déterminants possessifs",
    domaine:    "Français",
    competence: "Grammaire — Déterminants possessifs",
    type:       "determinants-possessifs-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    2, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de identifier-determinant-possessif (niveau 1) et
       possessifs-dans-phrases (niveau 2) — Lot 6, groupe 3c. Même
       mécanique (mots cliquables) pour les deux niveaux. */

    lvl1: [
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Je range mes affaires dans mon cartable .", targets: ["mes","mon"], piege: {}, note: "📌 <strong>mes</strong> et <strong>mon</strong> indiquent l'appartenance à la 1<sup>re</sup> personne du singulier (<em>je</em>)." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Tu as oublié ton stylo et tes cahiers .", targets: ["ton","tes"], piege: {}, note: "📌 <strong>ton</strong> et <strong>tes</strong> : 2<sup>e</sup> personne du singulier (<em>tu</em>). <em>Ton</em> devant un nom masculin, <em>tes</em> au pluriel." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Il promène son chien avec ses amis .", targets: ["son","ses"], piege: {}, note: "📌 <strong>son</strong> et <strong>ses</strong> : 3<sup>e</sup> personne du singulier (<em>il</em>). <em>Son</em> devant un nom singulier, <em>ses</em> au pluriel." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Elle lit ses livres dans sa chambre .", targets: ["ses","sa"], piege: {}, note: "📌 <strong>ses</strong> et <strong>sa</strong> : 3<sup>e</sup> personne du singulier (<em>elle</em>). <em>Sa</em> devant un nom féminin singulier." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Nous adorons notre école et nos professeurs .", targets: ["notre","nos"], piege: {}, note: "📌 <strong>notre</strong> et <strong>nos</strong> : 1<sup>re</sup> personne du pluriel (<em>nous</em>). <em>Notre</em> au singulier, <em>nos</em> au pluriel." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Vous avez rangé votre sac et vos affaires .", targets: ["votre","vos"], piege: {}, note: "📌 <strong>votre</strong> et <strong>vos</strong> : 2<sup>e</sup> personne du pluriel ou de politesse (<em>vous</em>)." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention au piège !", sentence: "Les enfants jouent avec leurs jouets dans leur chambre .", targets: ["leurs","leur"], piege: { "Les": "« Les » est un article défini, pas un déterminant possessif." }, note: "📌 <strong>leurs</strong> et <strong>leur</strong> : 3<sup>e</sup> personne du pluriel (<em>ils/elles</em>). <em>Leur</em> devant un nom singulier, <em>leurs</em> devant un nom pluriel." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention aux pièges !", sentence: "Mon petit frère prête sa guitare à ses camarades le week-end .", targets: ["Mon","sa","ses"], piege: { "le": "« le » est un article défini, pas un déterminant possessif." }, note: "📌 Trois possessifs : <strong>Mon</strong> (masc. sing., 1<sup>re</sup> pers.), <strong>sa</strong> (fém. sing., 3<sup>e</sup> pers.), <strong>ses</strong> (plur., 3<sup>e</sup> pers.)." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention au piège !", sentence: "Ta mère et ton père sont partis avec leurs valises ce matin .", targets: ["Ta","ton","leurs"], piege: { "ce": "« ce » est un déterminant démonstratif (il montre un moment précis), pas un possessif." }, note: "📌 <strong>Ta</strong> et <strong>ton</strong> (2<sup>e</sup> pers. sing.) + <strong>leurs</strong> (3<sup>e</sup> pers. plur.) dans la même phrase." },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Notre jardin et nos fleurs sont magnifiques en été .", targets: ["Notre","nos"], piege: {}, note: "📌 <strong>Notre</strong> et <strong>nos</strong> : 1<sup>re</sup> personne du pluriel (<em>nous</em>)." }
    ],

    lvl2: [
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Je range mes affaires dans mon sac .", targets: ["mes","mon"], piege: {} },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Elle prête son crayon à sa camarade .", targets: ["son","sa"], piege: {} },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Nous adorons notre école et nos professeurs .", targets: ["notre","nos"], piege: {} },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase.", sentence: "Il promène son chien avec ses amis .", targets: ["son","ses"], piege: {} },
      { instruction: "Clique sur tous les déterminants possessifs dans la phrase. Attention au piège !", sentence: "Leurs parents les attendent devant leur maison .", targets: ["Leurs","leur"], piege: { "les": "« les » est un pronom personnel complément, pas un possessif !" } }
    ]
  },

  "articles-indefinis": {
    title:      "Les articles indéfinis (un, une, des)",
    domaine:    "Français",
    competence: "Grammaire — Déterminants : articles indéfinis",
    type:       "articles-indefinis-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    2, /* nombre réel de paliers du moteur */
    backLink:   { href: "français-grammaire.html", label: "Grammaire" },

    /* Fusion de identifier-article-indefini (niveau 1, mots cliquables) et
       articles-indefinis-premiere-rencontre (niveau 2, glisser-déposer) —
       Lot 6, groupe 3b. Niveau 2 enrichi de 8 items supplémentaires
       (validés par l'utilisateur) car la banque d'origine (4 items) était
       trop mince pour un niveau à part entière. */

    lvl1: [
      { instruction: "Clique sur tous les articles indéfinis dans ce texte.", sentence: "Un enfant joue dans le jardin . Il trouve une coccinelle et des fourmis sous les pierres .", targets: ["Un","une","des"], piege: {} },
      { instruction: "Clique sur tous les articles indéfinis dans ce texte.", sentence: "Des nuages arrivent dans le ciel . Un vent froid souffle et les feuilles tombent . Il faut une veste pour sortir .", targets: ["Des","Un","une"], piege: {} },
      { instruction: "Clique sur tous les articles indéfinis dans ce texte.", sentence: "Dans une vieille maison , un fantôme habite . Des bruits étranges se font entendre la nuit . Les habitants ont très peur .", targets: ["une","un","Des"], piege: {} },
      { instruction: "Clique sur tous les articles indéfinis dans ce texte.", sentence: "Le boulanger prépare des croissants et des baguettes chaque matin . Une cliente arrive et achète un pain aux raisins .", targets: ["des","Une","un"], piege: {} },
      { instruction: "Clique sur tous les articles indéfinis dans ce texte.", sentence: "Un explorateur découvre une grotte cachée dans la forêt . Des stalactites pendent et des cristaux scintillent sous sa lampe .", targets: ["Un","une","Des","des"], piege: {} },
      { instruction: "Clique sur tous les articles indéfinis dans ce texte.", sentence: "Un matin de printemps , des hirondelles arrivent dans le village . Une hirondelle construit un nid sous le toit de la grange .", targets: ["Un","des","Une","un"], piege: {} }
    ],

    lvl2: [
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ chat noir dort sur la fenêtre. ___ chat s'appelle Minuit.", blanks: ["Un","Le"], bank: ["Un","Le","Une","La"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ élève entre dans la salle. ___ élève s'appelle Emma.", blanks: ["Une","L'"], bank: ["Une","L'","Un","Le"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ chien aboie dans le jardin. ___ chien appartient à notre voisin.", blanks: ["Un","Le"], bank: ["Un","Le","Une","La"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ livre est posé sur la table. ___ livre parle des dinosaures.", blanks: ["Un","Le"], bank: ["Un","Le","Une","La"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ fille chante dans la cour. ___ fille s'appelle Léa.", blanks: ["Une","La"], bank: ["Une","La","Un","Le"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ oiseau se pose sur la branche. ___ oiseau chante joliment.", blanks: ["Un","L'"], bank: ["Un","L'","Une","La"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ maison est à vendre dans notre rue. ___ maison a un grand jardin.", blanks: ["Une","La"], bank: ["Une","La","Un","Le"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ homme traverse la rue prudemment. ___ homme porte un manteau gris.", blanks: ["Un","L'"], bank: ["Un","L'","Une","La"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ voiture rouge est garée devant l'école. ___ voiture appartient à la maîtresse.", blanks: ["Une","La"], bank: ["Une","La","Un","Le"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ ballon roule jusqu'au but. ___ ballon est neuf.", blanks: ["Un","Le"], bank: ["Un","Le","Une","La"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ araignée tisse sa toile dans le coin. ___ araignée est minuscule.", blanks: ["Une","L'"], bank: ["Une","L'","Un","Le"] },
      { instruction: "Première mention → indéfini (un/une). Déjà mentionné → défini (le/la/l'). Place les bons articles.", template: "___ ami m'attend à la sortie. ___ ami s'appelle Karim.", blanks: ["Un","L'"], bank: ["Un","L'","Une","La"] }
    ]
  }

});

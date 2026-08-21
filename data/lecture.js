/* ── data/lecture.js — Lecture (2 exercices) ───────────────────────────────
   Nouveau domaine (Lecture / Compréhension), même convention que les autres
   fichiers data/*.js : chaque fichier de domaine s'enregistre lui-même dans
   window.EXERCISE_DATA, l'ordre de chargement entre fichiers n'a donc pas
   d'importance.

   Type "comprendre-implicites-niveaux" / "comprendre-mot-contexte-niveaux" :
   QCM sur un court texte (2-3 phrases) — une question, 3 réponses (A/B/C),
   feedback avec « Indices dans le texte » (2 puces citant les passages qui
   justifient la bonne réponse). Voir exercise.html, section lecInitSession.
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

  "comprendre-implicites": {
    title:      "Comprendre les implicites",
    domaine:    "Français",
    competence: "Lecture — Comprendre les implicites",
    type:       "comprendre-implicites-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Indices explicites dans le texte",
      "CM2": "Indices un peu plus discrets",
      "6e":  "Indices indirects, à déduire"
    },
    backLink:   { href: "français-lecture.html", label: "Lecture" },

    lvl1: [
      {
        text: "Léa chuchote en cherchant un livre entre les rayonnages silencieux, puis tend sa carte au bibliothécaire pour l'emprunter.",
        question: "Où se trouve Léa ?",
        choices: ["Dans une bibliothèque", "À la piscine", "Au marché"],
        correct: 0,
        indices: ["chuchote entre les rayonnages", "tend sa carte au bibliothécaire"]
      },
      {
        text: "Il enfile son gilet jaune, charge son sac de lettres et pédale de boîte aux lettres en boîte aux lettres le long de la rue.",
        question: "Quel est son métier ?",
        choices: ["Jardinier", "Facteur", "Boulanger"],
        correct: 1,
        indices: ["gilet jaune, sac de lettres", "pédale de boîte en boîte"]
      },
      {
        text: "Sur la table, un gâteau couvert de bougies allumées attend que tout le monde chante avant de les souffler.",
        question: "Quel moment approche ?",
        choices: ["Un petit-déjeuner", "Une sieste", "Un anniversaire"],
        correct: 2,
        indices: ["gâteau couvert de bougies", "chanter avant de souffler"]
      },
      {
        text: "Le fermier verse du grain aux poules et remplit l'abreuvoir des vaches avant d'aller traire dans l'étable.",
        question: "Où se trouve le fermier ?",
        choices: ["Dans une ferme", "Dans un zoo", "Dans une école"],
        correct: 0,
        indices: ["verse du grain aux poules", "traire dans l'étable"]
      },
      {
        text: "Elle enroule une mèche de cheveux autour de sa brosse, puis passe le sèche-cheveux sur la coupe fraîchement réalisée.",
        question: "Quel est son métier ?",
        choices: ["Dentiste", "Coiffeuse", "Infirmière"],
        correct: 1,
        indices: ["enroule une mèche de cheveux", "coupe fraîchement réalisée"]
      },
      {
        text: "Les enfants enfilent bonnet et moufles, sortent la luge du garage et se lancent des boules toutes blanches dans le jardin.",
        question: "Que se passe-t-il probablement dehors ?",
        choices: ["Il pleut", "Il fait très chaud", "Il neige"],
        correct: 2,
        indices: ["bonnet et moufles, luge", "boules toutes blanches"]
      }
    ],

    lvl2: [
      {
        text: "Léna pose sa valise sur le tapis roulant, présente son passeport au comptoir puis cherche sa porte d'embarquement sur le grand écran.",
        question: "Où se trouve Léna ?",
        choices: ["Dans un aéroport", "Dans une gare", "Dans un port"],
        correct: 0,
        indices: ["passeport au comptoir", "porte d'embarquement"]
      },
      {
        text: "Il lit attentivement l'ordonnance, prépare les boîtes de médicaments dans un petit sac puis explique la posologie au client.",
        question: "Quel est son métier ?",
        choices: ["Médecin", "Pharmacien", "Infirmier"],
        correct: 1,
        indices: ["lit l'ordonnance", "explique la posologie"]
      },
      {
        text: "Installé sur la berge depuis l'aube, il surveille son bouchon flotter sur l'eau calme, la canne bien calée entre deux pierres.",
        question: "Quelle activité pratique-t-il ?",
        choices: ["De la natation", "Du jardinage", "De la pêche"],
        correct: 2,
        indices: ["bouchon flotter sur l'eau", "la canne calée"]
      },
      {
        text: "Le ciel s'assombrit brutalement, un grondement lointain se fait entendre et les feuilles des arbres commencent à s'agiter fort.",
        question: "Que va-t-il probablement se passer ?",
        choices: ["Un orage va éclater", "Le soleil va se lever", "Une éclipse va commencer"],
        correct: 0,
        indices: ["ciel s'assombrit brutalement", "grondement lointain"]
      },
      {
        text: "Les visiteurs avancent en silence devant les tableaux, s'arrêtant parfois pour lire la petite pancarte fixée à côté du cadre.",
        question: "Où se trouve-t-on ?",
        choices: ["Dans un supermarché", "Dans un musée", "Dans un stade"],
        correct: 1,
        indices: ["avancent en silence devant les tableaux", "petite pancarte à côté du cadre"]
      },
      {
        text: "Des cartons empilés envahissent le salon presque vide, tandis qu'un grand camion attend, portes grandes ouvertes, devant l'immeuble.",
        question: "Que se passe-t-il ?",
        choices: ["Une fête se prépare", "Des travaux commencent", "Un déménagement a lieu"],
        correct: 2,
        indices: ["cartons empilés, salon vide", "camion portes ouvertes"]
      }
    ],

    lvl3: [
      {
        text: "Elle ausculte le hamster tremblant, note soigneusement son poids sur une fiche puis rassure le petit garçon inquiet qui vient de le déposer.",
        question: "Quel est probablement son métier ?",
        choices: ["Vétérinaire", "Institutrice", "Boulangère"],
        correct: 0,
        indices: ["ausculte le hamster", "note son poids sur une fiche"]
      },
      {
        text: "Le silence se fait dès que la porte capitonnée s'ouvre ; tous se lèvent au passage de la robe noire qui rejoint l'estrade.",
        question: "Où se trouve-t-on ?",
        choices: ["Dans une église", "Dans un tribunal", "Dans une école"],
        correct: 1,
        indices: ["tous se lèvent au passage de la robe noire", "rejoint l'estrade"]
      },
      {
        text: "Les doigts couverts de craie s'agrippent à la prise suivante, les pieds cherchent un appui sur la paroi verticale, la corde tendue juste derrière lui.",
        question: "Quelle activité pratique-t-il ?",
        choices: ["De la natation", "Du vélo", "De l'escalade"],
        correct: 2,
        indices: ["doigts couverts de craie", "paroi verticale, la corde tendue"]
      },
      {
        text: "D'un coup, l'écran s'éteint, la musique s'arrête net et quelqu'un allume la lampe de son téléphone pour éclairer la pièce plongée dans le noir.",
        question: "Que se passe-t-il ?",
        choices: ["Une panne de courant", "Un incendie", "Un tremblement de terre"],
        correct: 0,
        indices: ["l'écran s'éteint, la musique s'arrête net", "lampe de téléphone pour éclairer"]
      },
      {
        text: "Il fait glisser la planche sous la scie, souffle la fine sciure qui s'envole puis passe la main sur le bois pour vérifier qu'il est bien lisse.",
        question: "Quel est son métier ?",
        choices: ["Peintre", "Menuisier", "Électricien"],
        correct: 1,
        indices: ["fait glisser la planche sous la scie", "passe la main sur le bois"]
      },
      {
        text: "Le cartable neuf sur le dos, elle serre la main de sa mère un peu plus fort devant le grand portail, où d'autres enfants attendent aussi, un peu inquiets.",
        question: "Quel moment est-ce probablement ?",
        choices: ["Des vacances", "Un anniversaire", "La rentrée des classes"],
        correct: 2,
        indices: ["cartable neuf sur le dos", "grand portail, d'autres enfants inquiets"]
      }
    ]
  },

  "comprendre-mot-contexte": {
    title:      "S'appuyer sur le contexte pour comprendre un mot difficile",
    domaine:    "Français",
    competence: "Lecture — S'appuyer sur le contexte pour comprendre un mot difficile",
    type:       "comprendre-mot-contexte-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    paliers:    3, /* nombre réel de paliers du moteur */
    levelDescs: {
      "CM1": "Indices explicites dans le texte",
      "CM2": "Indices un peu plus discrets",
      "6e":  "Indices indirects, à déduire"
    },
    backLink:   { href: "français-lecture.html", label: "Lecture" },

    lvl1: [
      {
        text: "En traversant la cuisine, Hugo, <strong>maladroit</strong>, heurta la table et fit tomber le verre qui se brisa au sol.",
        question: "Que signifie « maladroit » ?",
        choices: ["Qui manque d'adresse, qui fait tomber ou casse des choses", "Qui est très habile de ses mains", "Qui marche très vite"],
        correct: 0,
        indices: ["heurta la table", "fit tomber le verre"]
      },
      {
        text: "<strong>Curieuse</strong>, Manon ouvrait chaque tiroir, posait mille questions et voulait tout savoir sur le fonctionnement de la machine.",
        question: "Que signifie « curieuse » ?",
        choices: ["Qui n'aime pas parler", "Qui veut tout découvrir et tout comprendre", "Qui a peur de tout"],
        correct: 1,
        indices: ["ouvrait chaque tiroir", "posait mille questions"]
      },
      {
        text: "Tout l'après-midi, <strong>paresseux</strong>, il resta allongé sur le canapé, refusant même de se lever pour aller chercher la télécommande.",
        question: "Que signifie « paresseux » ?",
        choices: ["Qui aime bouger sans arrêt", "Qui travaille avec ardeur", "Qui évite tout effort, qui ne veut rien faire"],
        correct: 2,
        indices: ["resta allongé sur le canapé", "refusant de se lever"]
      },
      {
        text: "<strong>Généreux</strong>, Karim partagea son goûter avec toute la classe et donna même son dernier gâteau à celui qui n'en avait pas.",
        question: "Que signifie « généreux » ?",
        choices: ["Qui aime donner et partager", "Qui garde tout pour lui", "Qui oublie facilement"],
        correct: 0,
        indices: ["partagea son goûter avec toute la classe", "donna son dernier gâteau"]
      },
      {
        text: "<strong>Timide</strong>, la nouvelle élève rougit dès qu'on lui adressa la parole et se cacha derrière son cahier pendant toute la présentation.",
        question: "Que signifie « timide » ?",
        choices: ["Qui parle fort devant tout le monde", "Qui est gêné(e) et mal à l'aise devant les autres", "Qui rit de tout"],
        correct: 1,
        indices: ["rougit dès qu'on lui adressa la parole", "se cacha derrière son cahier"]
      },
      {
        text: "<strong>Gourmand</strong>, Léo ne quittait pas des yeux le gâteau au chocolat et en reprit trois parts avant même que les autres n'aient fini.",
        question: "Que signifie « gourmand » ?",
        choices: ["Qui n'aime pas les sucreries", "Qui mange très peu", "Qui aime beaucoup manger, surtout de bonnes choses"],
        correct: 2,
        indices: ["ne quittait pas des yeux le gâteau", "en reprit trois parts"]
      }
    ],

    lvl2: [
      {
        text: "<strong>Intrépide</strong>, Sarah sauta la première du grand plongeoir sans la moindre hésitation, sous les yeux impressionnés de ses amis.",
        question: "Que signifie « intrépide » ?",
        choices: ["Qui n'a pas peur, qui ose affronter le danger", "Qui hésite longtemps avant d'agir", "Qui reste toujours prudent"],
        correct: 0,
        indices: ["sauta la première sans hésitation", "sous les yeux impressionnés"]
      },
      {
        text: "Devant l'énoncé du problème, <strong>perplexe</strong>, Tom relisait la question trois fois, un sourcil levé, sans trouver par où commencer.",
        question: "Que signifie « perplexe » ?",
        choices: ["Très content", "Qui ne comprend pas, qui est embarrassé face à quelque chose", "Très en colère"],
        correct: 1,
        indices: ["relisait la question trois fois", "sans trouver par où commencer"]
      },
      {
        text: "<strong>Méfiant</strong>, le chat reculait dès que l'inconnu tendait la main, l'observant longuement avant d'accepter de s'approcher.",
        question: "Que signifie « méfiant » ?",
        choices: ["Qui fait confiance à tout le monde", "Qui aime les caresses", "Qui se tient sur ses gardes, qui n'a pas confiance"],
        correct: 2,
        indices: ["reculait dès que l'inconnu tendait la main", "l'observant longuement"]
      },
      {
        text: "<strong>Exubérant</strong>, le petit garçon sautait partout, criait sa joie à tue-tête et voulait raconter son voyage à quiconque passait.",
        question: "Que signifie « exubérant » ?",
        choices: ["Qui exprime sa joie avec beaucoup d'énergie et d'enthousiasme", "Qui reste très calme et silencieux", "Qui est très triste"],
        correct: 0,
        indices: ["sautait partout", "criait sa joie à tue-tête"]
      },
      {
        text: "<strong>Consciencieuse</strong>, Inès relisait chaque exercice deux fois et vérifiait soigneusement l'orthographe de chaque mot avant de rendre sa copie.",
        question: "Que signifie « consciencieuse » ?",
        choices: ["Qui bâcle son travail", "Qui fait son travail avec beaucoup de soin et d'application", "Qui n'aime pas l'école"],
        correct: 1,
        indices: ["relisait chaque exercice deux fois", "vérifiait soigneusement l'orthographe"]
      },
      {
        text: "<strong>Hargneux</strong>, le chien grognait et montrait les dents dès que quelqu'un s'approchait un peu trop près de sa gamelle.",
        question: "Que signifie « hargneux » ?",
        choices: ["Très joueur et affectueux", "Très fatigué", "Agressif, prêt à mordre ou à attaquer"],
        correct: 2,
        indices: ["grognait et montrait les dents", "dès que quelqu'un s'approchait"]
      }
    ],

    lvl3: [
      {
        text: "Face aux moqueries de ses camarades, <strong>impassible</strong>, elle continua son travail sans qu'un seul muscle de son visage ne bouge.",
        question: "Que signifie « impassible » ?",
        choices: ["Qui ne montre aucune émotion, qui reste de marbre", "Qui pleure facilement", "Qui rit à toutes les blagues"],
        correct: 0,
        indices: ["sans qu'un seul muscle de son visage ne bouge", "continua son travail"]
      },
      {
        text: "<strong>Circonspect</strong>, l'explorateur testait chaque planche du pont suspendu du bout du pied avant d'y poser tout son poids.",
        question: "Que signifie « circonspect » ?",
        choices: ["Qui agit sans réfléchir", "Qui avance avec prudence, en pesant chaque risque", "Qui court le plus vite possible"],
        correct: 1,
        indices: ["testait chaque planche du bout du pied", "avant d'y poser tout son poids"]
      },
      {
        text: "<strong>Impétueux</strong>, le jeune cheval s'élança au galop dès l'ouverture de la barrière, sans attendre le signal du cavalier.",
        question: "Que signifie « impétueux » ?",
        choices: ["Qui reste immobile", "Qui obéit toujours aux ordres", "Qui agit avec une fougue soudaine, difficile à contenir"],
        correct: 2,
        indices: ["s'élança au galop dès l'ouverture", "sans attendre le signal"]
      },
      {
        text: "Même au cœur de l'orage et des éclairs, la vieille vache restait <strong>placide</strong>, continuant de mâcher son herbe sans lever la tête.",
        question: "Que signifie « placide » ?",
        choices: ["Calme, qui ne s'inquiète de rien", "Très agité et nerveux", "Affamé"],
        correct: 0,
        indices: ["continuait de mâcher son herbe", "sans lever la tête"]
      },
      {
        text: "Depuis l'annonce de son départ, l'ambiance dans la classe était <strong>morose</strong> : plus personne ne riait ni ne plaisantait pendant la récréation.",
        question: "Que signifie « morose » ?",
        choices: ["Joyeuse et animée", "Triste et sans entrain", "Bruyante et agitée"],
        correct: 1,
        indices: ["plus personne ne riait", "ni ne plaisantait"]
      },
      {
        text: "<strong>Obstiné</strong>, il refit le même exercice de vélo dix fois de suite, refusant catégoriquement l'aide qu'on lui proposait.",
        question: "Que signifie « obstiné » ?",
        choices: ["Qui abandonne vite", "Qui change souvent d'avis", "Qui persiste avec entêtement, sans vouloir céder"],
        correct: 2,
        indices: ["refit le même exercice dix fois", "refusant catégoriquement l'aide"]
      }
    ]
  }

});

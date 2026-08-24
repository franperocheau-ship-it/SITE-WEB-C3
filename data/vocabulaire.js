/* ── data/vocabulaire.js — Vocabulaire (16 exercices) ──────────────────────────
   Migré depuis l'ancien moteur autonome (français-lexique.html + ExercisePanel +
   js/lex-comprendre.js / lex-construire.js / lex-relations.js, tous deux supprimés)
   vers le format standard du site : level1Bank/level2Bank/level3Bank exploités
   par le module partagé "vocabulaire-niveaux" dans exercise.html. Chaque
   question garde son type d'origine (mcq / dict-mcq / click-sort / match /
   col-sort), rendu par les renderers ajoutés à exercise.html pour ces types.

   competence: "Vocabulaire — <nom de l'exercice>" pour chaque entrée — libellé
   repris tel quel de l'ancien EXERCISE_CATALOG_AUTONOMOUS (désormais retiré,
   voir historique git) pour ne rien réinventer. Le préfixe "Vocabulaire" avant
   le " — " permet le regroupement automatique par sous-thème (comme partout
   ailleurs sur le site) tout en gardant une ligne distincte par exercice dans
   les bilans enseignant (resultats-enseignant.html, pilotage-enseignant.html).
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {
  "ordre-alphabetique": {
    title: "Ranger dans l'ordre alphabétique",
    domaine: "Français",
    competence: "Vocabulaire — Ranger dans l'ordre alphabétique",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Première lettre différente — classement simple",
      "2": "Même première lettre — comparaison de la 2e ou 3e lettre",
      "3": "Classement précis — mots proches avec accents et 3e lettre"
    },
    level1Bank: [
      { id:"ordre-alphabetique-n1-01",
        type: "click-sort",
        instruction: "Clique sur les mots dans l'ordre alphabétique (du premier au dernier).",
        words: ["soleil", "arbre", "nuage", "fleur"],
        answer: ["arbre", "fleur", "nuage", "soleil"],
        feedback: "A vient avant F, F avant N, N avant S : arbre → fleur → nuage → soleil."
      },
      { id:"ordre-alphabetique-n1-02",
        type: "mcq",
        instruction: "Quel groupe de mots est dans l'ordre alphabétique ?",
        choices: [
          "lune, arbre, mer, vent",
          "arbre, lune, mer, vent",
          "mer, arbre, vent, lune",
          "vent, lune, arbre, mer"
        ],
        answer: "arbre, lune, mer, vent",
        feedback: "A < L < M < V : arbre → lune → mer → vent. C'est le seul groupe dans le bon ordre."
      },
      { id:"ordre-alphabetique-n1-03",
        type: "mcq",
        instruction: "Quel mot vient en PREMIER dans le dictionnaire ?",
        choices: ["tigre", "renard", "aigle", "zèbre"],
        answer: "aigle",
        feedback: "A est la première lettre de l'alphabet. Aigle commence par A, donc c'est le premier."
      },
      { id:"ordre-alphabetique-n1-04",
        type: "click-sort",
        instruction: "Clique sur les mots dans l'ordre alphabétique.",
        words: ["vache", "canard", "mouton", "lapin"],
        answer: ["canard", "lapin", "mouton", "vache"],
        feedback: "C < L < M < V : canard → lapin → mouton → vache."
      },
      { id:"ordre-alphabetique-n1-05",
        type: "mcq",
        instruction: "Pour classer des mots dans un dictionnaire, on compare d'abord…",
        choices: ["le nombre de lettres", "le sens du mot", "la première lettre", "la dernière lettre"],
        answer: "la première lettre",
        feedback: "On regarde toujours la première lettre en premier. Si elle est identique, on passe à la deuxième, etc."
      },
      { id:"ordre-alphabetique-n1-06",
        type: "click-sort",
        instruction: "Clique sur les mots dans l'ordre alphabétique (du premier au dernier).",
        words: ["girafe", "ours", "poisson", "abeille"],
        answer: ["abeille", "girafe", "ours", "poisson"],
        feedback: "A vient avant G, G avant O, O avant P : abeille → girafe → ours → poisson."
      },
      { id:"ordre-alphabetique-n1-07",
        type: "mcq",
        instruction: "Quel groupe de mots est dans l'ordre alphabétique ?",
        choices: [
          "cerise, kiwi, mangue, pomme",
          "pomme, mangue, kiwi, cerise",
          "mangue, cerise, pomme, kiwi",
          "kiwi, cerise, mangue, pomme"
        ],
        answer: "cerise, kiwi, mangue, pomme",
        feedback: "C < K < M < P : cerise → kiwi → mangue → pomme. C'est le seul groupe dans le bon ordre."
      },
      { id:"ordre-alphabetique-n1-08",
        type: "mcq",
        instruction: "Quel mot vient en DERNIER dans le dictionnaire ?",
        choices: ["hibou", "dauphin", "singe", "chèvre"],
        answer: "singe",
        feedback: "On compare les premières lettres : c, d, h, s. S est la dernière parmi ces quatre, donc singe vient en dernier."
      },
      { id:"ordre-alphabetique-n1-09",
        type: "click-sort",
        instruction: "Clique sur les mots dans l'ordre alphabétique.",
        words: ["tortue", "escargot", "papillon", "lézard"],
        answer: ["escargot", "lézard", "papillon", "tortue"],
        feedback: "E < L < P < T : escargot → lézard → papillon → tortue."
      },
      { id:"ordre-alphabetique-n1-10",
        type: "mcq",
        instruction: "Pour savoir si 'jardin' vient avant ou après 'lampe' dans le dictionnaire, que dois-tu comparer ?",
        choices: [
          "le nombre de syllabes",
          "la première lettre de chaque mot (J et L)",
          "la dernière lettre de chaque mot",
          "le sens des deux mots"
        ],
        answer: "la première lettre de chaque mot (J et L)",
        feedback: "J vient avant L dans l'alphabet, donc jardin précède lampe dans le dictionnaire."
      }
    ],
    level2Bank: [
      { id:"ordre-alphabetique-n2-01",
        type: "click-sort",
        instruction: "Ces mots commencent tous par la même lettre. Clique-les dans l'ordre alphabétique.",
        words: ["chameau", "chien", "chat", "cheval"],
        answer: ["chameau", "chat", "cheval", "chien"],
        feedback: "On compare la 2e lettre : tous ont 'h'. On regarde donc la 3e : cha < cha… on regarde la 4e : chameau (m) < chat (t) < cheval (v) < chien (i→ non, chi). Attention : cha-t vs cha-m vs che-v vs chi-en. Cha(m) < cha(t) < che(v) < chi(en)."
      },
      { id:"ordre-alphabetique-n2-02",
        type: "mcq",
        instruction: "Quel mot vient AVANT 'manger' dans le dictionnaire ?",
        choices: ["manque", "manchot", "marché", "marron"],
        answer: "manchot",
        feedback: "manger = m-a-n-g… manchot = m-a-n-c… La 4e lettre : C vient avant G dans l'alphabet, donc manchot précède manger."
      },
      { id:"ordre-alphabetique-n2-03",
        type: "click-sort",
        instruction: "Clique sur ces fruits dans l'ordre alphabétique.",
        words: ["baguette", "banane", "ballon", "barque"],
        answer: ["baguette", "ballon", "banane", "barque"],
        feedback: "ba-g < ba-l < ba-n < ba-r : baguette → ballon → banane → barque."
      },
      { id:"ordre-alphabetique-n2-04",
        type: "mcq",
        instruction: "Dans le dictionnaire, dans quel ordre viennent : 'porte', 'portée', 'portrait' ?",
        choices: [
          "portrait, porte, portée",
          "portée, portrait, porte",
          "porte, portée, portrait",
          "portrait, portée, porte"
        ],
        answer: "porte, portée, portrait",
        feedback: "porte (5 lettres) < portée (port-é, 6e lettre é) < portrait (port-r, 6e lettre r). É vient avant R, donc portée précède portrait."
      },
      { id:"ordre-alphabetique-n2-05",
        type: "mcq",
        instruction: "Quel mot vient APRÈS 'fleuve' dans le dictionnaire ?",
        choices: ["fleur", "flan", "flûte", "flamme"],
        answer: "flûte",
        feedback: "fleuve = f-l-e-u-v. Les autres : fleur (fl-e-u-r, r < v), flan (fl-a, a < e), flamme (fl-a, a < e), flûte (fl-û, û > e). Donc flûte vient après fleuve."
      },
      { id:"ordre-alphabetique-n2-06",
        type: "click-sort",
        instruction: "Ces mots commencent tous par la même lettre. Clique-les dans l'ordre alphabétique.",
        words: ["rivière", "robe", "radis", "rue"],
        answer: ["radis", "rivière", "robe", "rue"],
        feedback: "On compare la 2e lettre : radis (a), rivière (i), robe (o), rue (u). A < I < O < U : radis → rivière → robe → rue."
      },
      { id:"ordre-alphabetique-n2-07",
        type: "mcq",
        instruction: "Quel mot vient AVANT 'tourner' dans le dictionnaire ?",
        choices: ["tourbillon", "tourteau", "tousser", "tournevis"],
        answer: "tourbillon",
        feedback: "tourner = t-o-u-r-n-e-r. Tourbillon = t-o-u-r-b… : à la 5e lettre, b vient avant n, donc tourbillon précède tourner. Tourteau, tousser et tournevis viennent tous après."
      },
      { id:"ordre-alphabetique-n2-08",
        type: "click-sort",
        instruction: "Clique sur ces légumes dans l'ordre alphabétique.",
        words: ["carotte", "céleri", "chou", "concombre"],
        answer: ["carotte", "céleri", "chou", "concombre"],
        feedback: "ca < cé(ce) < ch < co : carotte → céleri → chou → concombre."
      },
      { id:"ordre-alphabetique-n2-09",
        type: "mcq",
        instruction: "Dans le dictionnaire, dans quel ordre viennent : 'chanter', 'chantier', 'chanteur' ?",
        choices: [
          "chantier, chanter, chanteur",
          "chanteur, chantier, chanter",
          "chanter, chanteur, chantier",
          "chantier, chanteur, chanter"
        ],
        answer: "chanter, chanteur, chantier",
        feedback: "Chanter et chanteur partagent 'chante-' : à la 7e lettre, chanter a 'r', chanteur a 'u' (r < u), donc chanter précède chanteur. Chantier a 'i' en 6e lettre (après le 'e' des deux autres), donc il vient en dernier."
      },
      { id:"ordre-alphabetique-n2-10",
        type: "mcq",
        instruction: "Quel mot vient APRÈS 'garder' dans le dictionnaire ?",
        choices: ["garage", "gant", "garçon", "gare"],
        answer: "gare",
        feedback: "garder = g-a-r-d-e-r. Garage (4e lettre a), garçon (4e lettre c) et gant (3e lettre n) précèdent garder. Gare (4e lettre e) vient après, car e vient après d."
      }
    ],
    level3Bank: [
      { id:"ordre-alphabetique-n3-01",
        type: "click-sort",
        instruction: "Classement délicat ! Clique ces mots dans l'ordre du dictionnaire.",
        words: ["client", "cloche", "clé", "classe", "clown"],
        answer: ["classe", "clé", "client", "cloche", "clown"],
        feedback: "cla- < clé- < cli- < clo-c < clo-w. À la 3e lettre : a < é < i < o. Pour cloche et clown : 4e lettre c < w."
      },
      { id:"ordre-alphabetique-n3-02",
        type: "mcq",
        instruction: "On cherche 'trace' dans le dictionnaire. Entre quels mots se trouve-t-il ?",
        choices: ["entre 'tracer' et 'tradition'", "avant 'trac'", "entre 'trac' et 'tracer'", "après 'tradition'"],
        answer: "entre 'trac' et 'tracer'",
        feedback: "trac (4 lettres) < trace (5 lettres, ajoute un e) < tracer (6 lettres, ajoute er). Un mot plus court précède toujours le mot dont il est le début."
      },
      { id:"ordre-alphabetique-n3-03",
        type: "click-sort",
        instruction: "Classe ces mots dans l'ordre du dictionnaire.",
        words: ["préférer", "premier", "prendre", "prairie"],
        answer: ["prairie", "préférer", "premier", "prendre"],
        feedback: "pr-a < pr-é (=pré) < pr-e-m < pr-e-n. Prairie commence par pra. Préférer par pré. Premier et prendre par pre : m vient avant n, donc premier < prendre."
      },
      { id:"ordre-alphabetique-n3-04",
        type: "mcq",
        instruction: "Pour ranger 'acacia' et 'accent' dans le dictionnaire, quelle lettre compare-t-on en 3e position ?",
        choices: ["a", "c", "c (encore)", "e"],
        answer: "e",
        feedback: "ac-a-cia vs ac-c-ent : la 1re lettre est 'a' pour les deux, la 2e est 'c' pour les deux. On compare la 3e : 'a' (acacia) vs 'c' (accent). A < C, donc acacia vient avant accent."
      },
      { id:"ordre-alphabetique-n3-05",
        type: "mcq",
        instruction: "Un élève hésite pour classer 'île' et 'image'. Quelle règle faut-il lui rappeler ?",
        choices: [
          "Les accents n'ont aucune importance pour classer",
          "On ignore le tréma et le chapeau pour classer",
          "On classe 'î' comme 'i', donc île vient avant image",
          "Image vient avant île car M vient avant L"
        ],
        answer: "On classe 'î' comme 'i', donc île vient avant image",
        feedback: "Dans la plupart des dictionnaires français, les lettres accentuées (î, é, à…) se classent comme leur équivalent sans accent. Î = I. Île et image commencent tous deux par i, puis l (île) vs m (image) : L < M, donc île précède image."
      },
      { id:"ordre-alphabetique-n3-06",
        type: "click-sort",
        instruction: "Classement délicat ! Clique ces mots dans l'ordre du dictionnaire.",
        words: ["brique", "bribe", "brebis", "broche", "bronze"],
        answer: ["brebis", "bribe", "brique", "broche", "bronze"],
        feedback: "br-e (brebis) vient en premier. Puis br-i : bribe (4e lettre b) avant brique (4e lettre q). Puis br-o : broche (4e lettre c) avant bronze (4e lettre n)."
      },
      { id:"ordre-alphabetique-n3-07",
        type: "mcq",
        instruction: "On cherche 'montage' dans le dictionnaire. Entre quels mots se trouve-t-il ?",
        choices: [
          "entre 'mont' et 'montagne'",
          "avant 'mont'",
          "entre 'montagne' et 'monter'",
          "après 'montagne'"
        ],
        answer: "entre 'mont' et 'montagne'",
        feedback: "mont (4 lettres) < montage (ajoute 'age') < montagne (le 'e' de montage vient avant le 'n' de montagne à la 8e lettre). Un mot plus court précède le mot dont il est le début."
      },
      { id:"ordre-alphabetique-n3-08",
        type: "click-sort",
        instruction: "Classe ces mots dans l'ordre du dictionnaire.",
        words: ["plaisir", "plancher", "plage", "planer", "plaine"],
        answer: ["plage", "plaine", "plaisir", "plancher", "planer"],
        feedback: "pla-g < pla-i (plaine, plaisir) < pla-n (plancher, planer). Entre plaine et plaisir, la 5e lettre n < s. Entre plancher et planer, la 5e lettre c < e."
      },
      { id:"ordre-alphabetique-n3-09",
        type: "mcq",
        instruction: "Pour ranger 'chagrin' et 'chrome' dans le dictionnaire, quelle lettre compare-t-on en 3e position ?",
        choices: ["c", "h", "a et r", "g"],
        answer: "a et r",
        feedback: "chagrin = ch-a-grin, chrome = ch-r-ome. Les deux premières lettres (c, h) sont identiques. On compare donc la 3e : 'a' (chagrin) contre 'r' (chrome). A vient avant R, donc chagrin précède chrome."
      },
      { id:"ordre-alphabetique-n3-10",
        type: "mcq",
        instruction: "Un élève hésite pour classer 'pêche' et 'pelle'. Quelle règle faut-il lui rappeler ?",
        choices: [
          "Les accents n'ont aucune importance et on les ignore totalement",
          "On classe 'ê' comme 'e', donc on compare ensuite 'p-e-c' et 'p-e-l' : pêche vient avant pelle",
          "Pelle vient toujours avant les mots accentués",
          "On classe 'ê' après 'z', donc pêche vient en dernier"
        ],
        answer: "On classe 'ê' comme 'e', donc on compare ensuite 'p-e-c' et 'p-e-l' : pêche vient avant pelle",
        feedback: "Comme pour î/i, on classe 'ê' comme 'e'. Pêche (p-e-c...) et pelle (p-e-l...) : à la 3e lettre, c vient avant l, donc pêche précède pelle."
      }
    ]
  },

  "trouver-synonyme": {
    title: "Trouver un synonyme",
    domaine: "Français",
    competence: "Vocabulaire — Trouver un synonyme",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître des synonymes courants",
      "2": "Nuances entre synonymes — choisir le mot juste selon le contexte",
      "3": "Reformuler avec un synonyme précis en contexte"
    },
    level1Bank: [
      { id:"trouver-synonyme-n1-01",
        type: "mcq",
        instruction: "Quel est le synonyme de 'content' ?",
        choices: ["triste", "heureux", "fâché", "inquiet"],
        answer: "heureux",
        feedback: "Content et heureux expriment tous les deux un sentiment de joie. Ce sont des synonymes : ils ont un sens très proche."
      },
      { id:"trouver-synonyme-n1-02",
        type: "mcq",
        instruction: "Quel est le synonyme de 'rapide' ?",
        choices: ["lent", "vif", "calme", "silencieux"],
        answer: "vif",
        feedback: "Rapide et vif signifient tous les deux 'qui se déplace ou agit vite'. Ce sont des synonymes."
      },
      { id:"trouver-synonyme-n1-03",
        type: "match",
        instruction: "Associe chaque mot à son synonyme. Clique un mot à gauche, puis son synonyme à droite.",
        pairs: [
          { left: "commencer", right: "débuter" },
          { left: "fatigué", right: "épuisé" },
          { left: "petit", right: "minuscule" }
        ],
        feedback: "Commencer = débuter, fatigué = épuisé, petit = minuscule. Les synonymes peuvent différer légèrement en intensité."
      },
      { id:"trouver-synonyme-n1-04",
        type: "mcq",
        instruction: "Deux mots sont synonymes quand ils ont…",
        choices: [
          "le même nombre de lettres",
          "un sens proche ou identique",
          "la même lettre initiale",
          "la même terminaison"
        ],
        answer: "un sens proche ou identique",
        feedback: "Des synonymes ont un sens très proche. On peut souvent remplacer l'un par l'autre dans une phrase sans changer le sens."
      },
      { id:"trouver-synonyme-n1-05",
        type: "mcq",
        instruction: "Quel mot peut remplacer 'courageux' sans changer le sens de la phrase ?",
        choices: ["peureux", "vaillant", "timide", "maladroit"],
        answer: "vaillant",
        feedback: "Courageux et vaillant signifient tous les deux 'qui n'a pas peur du danger'. Vaillant est un synonyme un peu plus littéraire."
      },
      { id:"trouver-synonyme-n1-06",
        type: "mcq",
        instruction: "Quel est le synonyme de 'beau' ?",
        choices: ["laid", "joli", "ancien", "sale"],
        answer: "joli",
        feedback: "Beau et joli expriment tous les deux une qualité esthétique agréable. Ce sont des synonymes."
      },
      { id:"trouver-synonyme-n1-07",
        type: "mcq",
        instruction: "Quel est le synonyme de 'difficile' ?",
        choices: ["facile", "dur", "mou", "léger"],
        answer: "dur",
        feedback: "Difficile et dur signifient tous les deux 'qui demande beaucoup d'efforts'. Ce sont des synonymes dans ce contexte."
      },
      { id:"trouver-synonyme-n1-08",
        type: "match",
        instruction: "Associe chaque mot à son synonyme. Clique un mot à gauche, puis son synonyme à droite.",
        pairs: [
          { left: "malin", right: "astucieux" },
          { left: "aider", right: "secourir" },
          { left: "propre", right: "net" }
        ],
        feedback: "Malin = astucieux, aider = secourir, propre = net. Les synonymes ont un sens très proche."
      },
      { id:"trouver-synonyme-n1-09",
        type: "mcq",
        instruction: "Quel est le synonyme de 'gentil' ?",
        choices: ["méchant", "aimable", "timide", "triste"],
        answer: "aimable",
        feedback: "Gentil et aimable décrivent tous les deux une personne agréable avec les autres. Ce sont des synonymes."
      },
      { id:"trouver-synonyme-n1-10",
        type: "mcq",
        instruction: "Quel mot peut remplacer 'aimer' sans changer le sens de la phrase 'J'aime beaucoup ce gâteau' ?",
        choices: ["détester", "adorer", "oublier", "ignorer"],
        answer: "adorer",
        feedback: "Aimer beaucoup et adorer expriment tous les deux un sentiment fort d'affection ou de goût. Ce sont des synonymes."
      }
    ],
    level2Bank: [
      { id:"trouver-synonyme-n2-01",
        type: "match",
        instruction: "Associe chaque mot à son synonyme. Clique un mot à gauche, puis son synonyme à droite.",
        pairs: [
          { left: "silencieux", right: "taciturne" },
          { left: "bizarre", right: "étrange" },
          { left: "courir", right: "galoper" },
          { left: "parler", right: "s'exprimer" }
        ],
        feedback: "Taciturne (qui parle peu) = silencieux dans ce sens. Étrange = bizarre. Galoper (courir rapidement) ≈ courir. S'exprimer = parler."
      },
      { id:"trouver-synonyme-n2-02",
        type: "mcq",
        instruction: "Pour parler de la démarche d'un lion, quel synonyme de 'marcher' est le plus précis ?",
        choices: ["trottiner", "chanceler", "rôder", "traîner"],
        answer: "rôder",
        feedback: "Rôder signifie marcher lentement en cherchant, en surveillant. C'est le synonyme le plus adapté pour un lion qui chasse."
      },
      { id:"trouver-synonyme-n2-03",
        type: "mcq",
        instruction: "Dans la phrase 'Le scientifique a analysé le produit', quel synonyme de 'analysé' convient le mieux ?",
        choices: ["regardé", "examiné minutieusement", "goûté", "dessiné"],
        answer: "examiné minutieusement",
        feedback: "Dans un contexte scientifique, analyser implique une observation détaillée et méthodique. 'Examiné minutieusement' rend cette précision mieux que simplement 'regardé'."
      },
      { id:"trouver-synonyme-n2-04",
        type: "match",
        instruction: "Associe les synonymes de l'adjectif 'grand' selon leur nuance.",
        pairs: [
          { left: "une grande personne", right: "une personne de haute taille" },
          { left: "un grand artiste", right: "un artiste illustre" },
          { left: "une grande peur", right: "une peur immense" }
        ],
        feedback: "Grand peut signifier 'de haute taille', 'célèbre' ou 'intense' selon le contexte. Le synonyme choisi doit correspondre au sens exact."
      },
      { id:"trouver-synonyme-n2-05",
        type: "mcq",
        instruction: "Pourquoi deux synonymes ne sont-ils pas toujours interchangeables ?",
        choices: [
          "Ils ont exactement le même sens et s'utilisent toujours pareil",
          "Ils peuvent avoir des nuances de sens, de niveau de langue ou de registre différents",
          "Ils proviennent toujours de la même langue d'origine",
          "Ils s'écrivent toujours de la même façon"
        ],
        answer: "Ils peuvent avoir des nuances de sens, de niveau de langue ou de registre différents",
        feedback: "Maison et demeure sont synonymes, mais 'demeure' est plus soutenu. Fatigué et épuisé sont synonymes, mais 'épuisé' marque une intensité plus forte."
      },
      { id:"trouver-synonyme-n2-06",
        type: "mcq",
        instruction: "Pour décrire une petite pluie fine et froide, quel synonyme de 'pluie' est le plus précis ?",
        choices: ["averse", "bruine", "déluge", "orage"],
        answer: "bruine",
        feedback: "La bruine est une pluie fine, légère et pénétrante. C'est le synonyme le plus précis pour ce type de pluie, contrairement à l'averse ou au déluge, plus intenses."
      },
      { id:"trouver-synonyme-n2-07",
        type: "match",
        instruction: "Associe chaque emploi de 'regarder' au synonyme qui correspond le mieux à sa nuance.",
        pairs: [
          { left: "Elle regarde longuement le tableau.", right: "Elle contemple le tableau." },
          { left: "Il regarde discrètement par la fenêtre.", right: "Il épie par la fenêtre." },
          { left: "Le douanier regarde attentivement les bagages.", right: "Le douanier scrute les bagages." }
        ],
        feedback: "Contempler (regarder avec admiration), épier (regarder en cachette), scruter (regarder avec attention) : chaque synonyme précise une nuance différente de 'regarder'."
      },
      { id:"trouver-synonyme-n2-08",
        type: "mcq",
        instruction: "Dans la phrase 'Le client a demandé un remboursement', quel synonyme de 'demandé' convient le mieux dans un contexte commercial soutenu ?",
        choices: ["réclamé", "gueulé", "redemandé", "questionné"],
        answer: "réclamé",
        feedback: "Réclamer signifie demander avec insistance ce qui est dû. C'est le synonyme le plus adapté dans un contexte commercial ou administratif."
      },
      { id:"trouver-synonyme-n2-09",
        type: "match",
        instruction: "Associe chaque action à son synonyme le plus précis selon l'intensité indiquée.",
        pairs: [
          { left: "rire bruyamment", right: "s'esclaffer" },
          { left: "dormir légèrement", right: "somnoler" },
          { left: "toucher légèrement", right: "effleurer" }
        ],
        feedback: "S'esclaffer (rire fort), somnoler (dormir d'un sommeil léger), effleurer (toucher à peine) : ces synonymes précisent l'intensité de l'action."
      },
      { id:"trouver-synonyme-n2-10",
        type: "mcq",
        instruction: "Quel facteur ne détermine PAS le choix d'un synonyme précis dans une phrase ?",
        choices: [
          "le registre de langue (familier, courant, soutenu)",
          "le contexte de la phrase",
          "la nuance de sens",
          "la couleur du stylo utilisé pour écrire"
        ],
        answer: "la couleur du stylo utilisé pour écrire",
        feedback: "Le choix d'un synonyme dépend du registre de langue, du contexte et de la nuance de sens — jamais d'un critère matériel comme la couleur du stylo."
      }
    ],
    level3Bank: [
      { id:"trouver-synonyme-n3-01",
        type: "mcq",
        instruction: "Dans un texte sur la mer, quel synonyme de 'bruit' est le plus précis pour parler des vagues ?",
        choices: ["fracas", "tapage", "bavardage", "mélodie"],
        answer: "fracas",
        feedback: "Le fracas évoque un bruit fort et violent, comme celui des vagues qui s'écrasent sur les rochers. C'est le synonyme le plus précis dans ce contexte."
      },
      { id:"trouver-synonyme-n3-02",
        type: "match",
        instruction: "Associe chaque verbe à son synonyme le plus précis dans le contexte indiqué.",
        pairs: [
          { left: "Le soleil brille (intensément)", right: "Le soleil flamboie" },
          { left: "L'enfant pleure (doucement)", right: "L'enfant geint" },
          { left: "La rivière coule (rapidement)", right: "La rivière dévale" }
        ],
        feedback: "Flamboyer = briller avec éclat, geindre = pleurer faiblement, dévaler = descendre en courant. Les synonymes précis enrichissent le style."
      },
      { id:"trouver-synonyme-n3-03",
        type: "mcq",
        instruction: "La phrase 'Le directeur était irrité' est au niveau courant. Quel synonyme d'irrité convient dans un texte soutenu ?",
        choices: ["énervé", "en pétard", "courroucé", "de mauvais poil"],
        answer: "courroucé",
        feedback: "Courroucé est un synonyme soutenu et littéraire d'irrité. 'En pétard' et 'de mauvais poil' sont familiers. 'Énervé' reste courant."
      },
      { id:"trouver-synonyme-n3-04",
        type: "mcq",
        instruction: "Pour éviter la répétition du verbe 'dire' dans un récit, quel synonyme ne convient PAS pour une réponse agressive ?",
        choices: ["vociférer", "répliquer", "murmurer", "crier"],
        answer: "murmurer",
        feedback: "Murmurer signifie parler très doucement. Ce synonyme de 'dire' ne convient pas pour exprimer une réponse agressive. Vociférer, répliquer ou crier sont adaptés."
      },
      { id:"trouver-synonyme-n3-05",
        type: "match",
        instruction: "Chaque phrase a un mot souligné. Associe-la au synonyme soutenu qui pourrait le remplacer.",
        pairs: [
          { left: "Il habitait là depuis toujours.", right: "Il résidait là depuis toujours." },
          { left: "La fête était très joyeuse.", right: "La fête était très festive." },
          { left: "Elle cherchait la sortie.", right: "Elle quêtait la sortie." }
        ],
        feedback: "Résider (soutenu pour habiter), festif (registre un peu plus soutenu), quêter (chercher avec insistance, plus littéraire)."
      },
      { id:"trouver-synonyme-n3-06",
        type: "mcq",
        instruction: "Dans un texte descriptif sur l'automne, quel synonyme de 'vent' est le plus précis pour décrire un vent froid et sec ?",
        choices: ["brise", "bise", "zéphyr", "courant d'air"],
        answer: "bise",
        feedback: "La bise désigne un vent froid et sec, souvent venu du nord. Brise et zéphyr évoquent au contraire un vent léger et doux."
      },
      { id:"trouver-synonyme-n3-07",
        type: "match",
        instruction: "Associe chaque déplacement à son synonyme le plus précis dans le contexte indiqué.",
        pairs: [
          { left: "Le vieillard se déplace (péniblement, en boitant)", right: "Le vieillard clopine" },
          { left: "Les enfants jouent (avec insouciance, en sautillant)", right: "Les enfants batifolent" },
          { left: "Le chat se déplace (silencieusement, sans bruit)", right: "Le chat se faufile" }
        ],
        feedback: "Clopiner (marcher en boitant), batifoler (s'amuser avec légèreté), se faufiler (se glisser discrètement) : ces verbes précis enrichissent la description."
      },
      { id:"trouver-synonyme-n3-08",
        type: "mcq",
        instruction: "La phrase 'Il a mangé rapidement' est courante. Quel synonyme soutenu de 'mangé' convient dans un texte littéraire ?",
        choices: ["bouffé", "englouti", "grignoté", "bâfré"],
        answer: "englouti",
        feedback: "Engloutir est un synonyme soutenu de manger rapidement et complètement. 'Bouffé' et 'bâfré' sont familiers, 'grignoté' signifie au contraire manger par petites bouchées."
      },
      { id:"trouver-synonyme-n3-09",
        type: "mcq",
        instruction: "Pour décrire une réflexion profonde et prolongée, quel synonyme de 'penser' ne convient PAS ?",
        choices: ["méditer", "réfléchir intensément", "songer brièvement", "approfondir"],
        answer: "songer brièvement",
        feedback: "Songer brièvement évoque une pensée courte et légère, ce qui contredit l'idée de réflexion profonde et prolongée. Méditer, réfléchir intensément et approfondir conviennent mieux."
      },
      { id:"trouver-synonyme-n3-10",
        type: "match",
        instruction: "Chaque phrase a un mot souligné. Associe-la au synonyme soutenu qui pourrait le remplacer.",
        pairs: [
          { left: "Il a expliqué la situation.", right: "Il a exposé la situation." },
          { left: "Elle a supporté la douleur sans se plaindre.", right: "Elle a enduré la douleur sans se plaindre." },
          { left: "Le village était calme et endormi.", right: "Le village était assoupi." }
        ],
        feedback: "Exposer (soutenu pour expliquer), endurer (soutenu pour supporter), assoupi (image soutenue pour calme et endormi)."
      }
    ]
  },

  "trouver-antonyme": {
    title: "Trouver un antonyme",
    domaine: "Français",
    competence: "Vocabulaire — Trouver un antonyme",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Contraires simples et courants",
      "2": "Antonymes formés par préfixe et antonymes selon le contexte",
      "3": "Antonymes subtils — registre, nuances et contexte"
    },
    level1Bank: [
      { id:"trouver-antonyme-n1-01",
        type: "mcq",
        instruction: "Quel est l'antonyme (contraire) de 'chaud' ?",
        choices: ["tiède", "froid", "brûlant", "chaud"],
        answer: "froid",
        feedback: "Chaud et froid sont des antonymes : ils ont des sens opposés. Tiède est entre les deux, donc pas l'antonyme strict."
      },
      { id:"trouver-antonyme-n1-02",
        type: "match",
        instruction: "Associe chaque mot à son contraire. Clique un mot à gauche puis son antonyme à droite.",
        pairs: [
          { left: "jour", right: "nuit" },
          { left: "monter", right: "descendre" },
          { left: "gentil", right: "méchant" }
        ],
        feedback: "Jour ↔ nuit, monter ↔ descendre, gentil ↔ méchant. Les antonymes expriment des idées opposées."
      },
      { id:"trouver-antonyme-n1-03",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'grand' ?",
        choices: ["gros", "fort", "petit", "haut"],
        answer: "petit",
        feedback: "Grand et petit désignent des tailles opposées : ce sont des antonymes. Gros concerne le volume, pas la taille."
      },
      { id:"trouver-antonyme-n1-04",
        type: "mcq",
        instruction: "L'antonyme de 'commencer' est…",
        choices: ["débuter", "continuer", "terminer", "avancer"],
        answer: "terminer",
        feedback: "Commencer et terminer sont des antonymes : l'un marque le début, l'autre la fin d'une action."
      },
      { id:"trouver-antonyme-n1-05",
        type: "match",
        instruction: "Associe chaque adjectif à son contraire.",
        pairs: [
          { left: "fort", right: "faible" },
          { left: "rapide", right: "lent" },
          { left: "propre", right: "sale" }
        ],
        feedback: "Fort ↔ faible, rapide ↔ lent, propre ↔ sale. Les antonymes sont des mots de sens contraire."
      },
      { id:"trouver-antonyme-n1-06",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'joyeux' ?",
        choices: ["content", "triste", "heureux", "gai"],
        answer: "triste",
        feedback: "Joyeux et triste expriment des sentiments opposés : l'un exprime la joie, l'autre le chagrin. Ce sont des antonymes."
      },
      { id:"trouver-antonyme-n1-07",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'dur' ?",
        choices: ["solide", "mou", "lourd", "épais"],
        answer: "mou",
        feedback: "Dur et mou décrivent des textures opposées : ce sont des antonymes."
      },
      { id:"trouver-antonyme-n1-08",
        type: "match",
        instruction: "Associe chaque mot à son contraire.",
        pairs: [
          { left: "plein", right: "vide" },
          { left: "haut", right: "bas" },
          { left: "riche", right: "pauvre" }
        ],
        feedback: "Plein ↔ vide, haut ↔ bas, riche ↔ pauvre. Les antonymes sont des mots de sens contraire."
      },
      { id:"trouver-antonyme-n1-09",
        type: "mcq",
        instruction: "L'antonyme de 'ouvrir' est…",
        choices: ["fermer", "pousser", "tirer", "sortir"],
        answer: "fermer",
        feedback: "Ouvrir et fermer sont des antonymes : l'un permet le passage, l'autre le bloque."
      },
      { id:"trouver-antonyme-n1-10",
        type: "match",
        instruction: "Associe chaque adjectif à son contraire.",
        pairs: [
          { left: "large", right: "étroit" },
          { left: "neuf", right: "vieux" },
          { left: "facile", right: "difficile" }
        ],
        feedback: "Large ↔ étroit, neuf ↔ vieux, facile ↔ difficile. Les antonymes sont des mots de sens opposé."
      }
    ],
    level2Bank: [
      { id:"trouver-antonyme-n2-01",
        type: "mcq",
        instruction: "Comment forme-t-on souvent l'antonyme de 'honnête' ?",
        choices: [
          "En ajoutant le suffixe -eur",
          "En ajoutant le préfixe dés- ou in-",
          "En changeant la terminaison",
          "En le remplaçant par son synonyme"
        ],
        answer: "En ajoutant le préfixe dés- ou in-",
        feedback: "Malhonnête (préfixe mal-), déshonnête… Un grand nombre d'antonymes se forment avec un préfixe négatif : in-, dé-/dés-, mal-, im-."
      },
      { id:"trouver-antonyme-n2-02",
        type: "match",
        instruction: "Forme l'antonyme de chaque mot en ajoutant le bon préfixe. Associe le mot à son antonyme.",
        pairs: [
          { left: "possible", right: "impossible" },
          { left: "patient", right: "impatient" },
          { left: "ordre", right: "désordre" },
          { left: "content", right: "mécontent" }
        ],
        feedback: "Impossible (préf. im-), impatient (préf. im-), désordre (préf. dés-), mécontent (préf. mé-)."
      },
      { id:"trouver-antonyme-n2-03",
        type: "mcq",
        instruction: "Dans 'La lumière s'allume', l'antonyme du verbe 's'allume' est…",
        choices: ["s'éteint", "brille", "éclaire", "clignote"],
        answer: "s'éteint",
        feedback: "S'allumer et s'éteindre sont des antonymes : quand une lumière s'allume, elle s'éteint au sens contraire."
      },
      { id:"trouver-antonyme-n2-04",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'présent' dans la phrase 'L'élève est présent' ?",
        choices: ["absent", "actuel", "passé", "cadeau"],
        answer: "absent",
        feedback: "Dans ce contexte (présence en classe), l'antonyme de présent est absent. Attention : présent peut aussi signifier 'maintenant' ou 'cadeau', avec d'autres antonymes possibles."
      },
      { id:"trouver-antonyme-n2-05",
        type: "mcq",
        instruction: "Pourquoi un même mot peut-il avoir plusieurs antonymes différents ?",
        choices: [
          "Parce que les antonymes changent selon la longueur du mot",
          "Parce qu'un mot polysémique a des sens différents, donc des contraires différents selon le contexte",
          "Parce que tous les mots ont exactement deux antonymes",
          "Parce que les antonymes viennent toujours du latin"
        ],
        answer: "Parce qu'un mot polysémique a des sens différents, donc des contraires différents selon le contexte",
        feedback: "Par exemple, 'doux' peut signifier 'non rugueux' (contraire : rugueux) ou 'de bonne humeur' (contraire : agressif). Le contexte détermine quel antonyme choisir."
      },
      { id:"trouver-antonyme-n2-06",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'légal' formé avec un préfixe ?",
        choices: ["illégal", "délégal", "malégal", "inlégal"],
        answer: "illégal",
        feedback: "Le préfixe négatif il- transforme 'légal' en son contraire 'illégal'."
      },
      { id:"trouver-antonyme-n2-07",
        type: "match",
        instruction: "Forme l'antonyme de chaque mot en ajoutant le bon préfixe. Associe le mot à son antonyme.",
        pairs: [
          { left: "utile", right: "inutile" },
          { left: "correct", right: "incorrect" },
          { left: "faire", right: "défaire" },
          { left: "agréable", right: "désagréable" }
        ],
        feedback: "Inutile (préf. in-), incorrect (préf. in-), défaire (préf. dé-), désagréable (préf. dés-)."
      },
      { id:"trouver-antonyme-n2-08",
        type: "mcq",
        instruction: "Dans 'Le ciel est clair ce soir', l'antonyme contextuel de 'clair' est…",
        choices: ["obscur", "beau", "froid", "calme"],
        answer: "obscur",
        feedback: "Dans ce contexte (luminosité du ciel), l'antonyme de clair est obscur. Attention : clair peut aussi signifier 'compréhensible', avec un autre antonyme possible ('confus')."
      },
      { id:"trouver-antonyme-n2-09",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'accepter' dans un contexte de négociation ?",
        choices: ["refuser", "proposer", "négocier", "discuter"],
        answer: "refuser",
        feedback: "Accepter une proposition et la refuser sont deux réactions opposées dans une négociation."
      },
      { id:"trouver-antonyme-n2-10",
        type: "mcq",
        instruction: "Quel est l'antonyme de 'obéir' ?",
        choices: ["désobéir", "écouter", "suivre", "respecter"],
        answer: "désobéir",
        feedback: "Le préfixe dés- transforme 'obéir' en son contraire 'désobéir' : ne pas se soumettre à un ordre."
      }
    ],
    level3Bank: [
      { id:"trouver-antonyme-n3-01",
        type: "mcq",
        instruction: "Dans un texte littéraire, quel antonyme de 'sombre' est le plus évocateur pour décrire un paysage lumineux ?",
        choices: ["pas sombre", "radieux", "propre", "grand"],
        answer: "radieux",
        feedback: "Radieux (qui rayonne de lumière) est l'antonyme le plus précis et le plus évocateur de 'sombre' dans un contexte littéraire."
      },
      { id:"trouver-antonyme-n3-02",
        type: "match",
        instruction: "Associe chaque adjectif à son antonyme le plus précis dans le contexte littéraire.",
        pairs: [
          { left: "une voix stridente", right: "une voix veloutée" },
          { left: "un visage austère", right: "un visage affable" },
          { left: "une lumière aveuglante", right: "une lumière tamisée" }
        ],
        feedback: "Strident ↔ velouté (doux, chaud), austère ↔ affable (aimable, souriant), aveuglant ↔ tamisé (doux, atténué)."
      },
      { id:"trouver-antonyme-n3-03",
        type: "mcq",
        instruction: "L'antonyme de 'espoir' dans le sens philosophique est…",
        choices: ["joie", "désespoir", "bonheur", "inquiétude"],
        answer: "désespoir",
        feedback: "L'espoir est l'attente confiante d'un bien futur. Son contraire le plus fort est le désespoir : l'absence totale d'espoir."
      },
      { id:"trouver-antonyme-n3-04",
        type: "match",
        instruction: "Ces verbes ont des antonymes différents selon le contexte. Associe chaque emploi à son contraire.",
        pairs: [
          { left: "perdre un match", right: "gagner un match" },
          { left: "perdre ses clés", right: "retrouver ses clés" },
          { left: "perdre du temps", right: "gagner du temps" }
        ],
        feedback: "Perdre un match → gagner ; perdre ses clés → retrouver ; perdre du temps → gagner du temps. Un même verbe a des antonymes différents selon le sens exact."
      },
      { id:"trouver-antonyme-n3-05",
        type: "mcq",
        instruction: "Dans 'Sa réponse était évasive', l'antonyme exact de 'évasive' est…",
        choices: ["claire", "longue", "sympathique", "étonnante"],
        answer: "claire",
        feedback: "Évasif signifie 'qui évite de répondre franchement'. Son antonyme est 'clair' (direct, sans détour). On peut aussi dire 'précis', 'franc' ou 'explicite'."
      },
      { id:"trouver-antonyme-n3-06",
        type: "mcq",
        instruction: "Dans un texte littéraire, quel antonyme de 'silence' est le plus évocateur pour décrire une foule en délire ?",
        choices: ["bruit", "vacarme", "calme", "paix"],
        answer: "vacarme",
        feedback: "Le vacarme évoque un bruit assourdissant et chaotique, contraste bien plus fort et évocateur du silence que le simple mot 'bruit'."
      },
      { id:"trouver-antonyme-n3-07",
        type: "match",
        instruction: "Associe chaque adjectif à son antonyme le plus précis dans le contexte littéraire.",
        pairs: [
          { left: "une attitude servile", right: "une attitude altière" },
          { left: "un discours laconique", right: "un discours prolixe" },
          { left: "une réponse ambiguë", right: "une réponse univoque" }
        ],
        feedback: "Servile (soumis) ↔ altière (fière), laconique (bref) ↔ prolixe (long, verbeux), ambiguë (plusieurs sens) ↔ univoque (un seul sens clair)."
      },
      { id:"trouver-antonyme-n3-08",
        type: "mcq",
        instruction: "L'antonyme de 'magnanime' dans un texte classique est…",
        choices: ["généreux", "mesquin", "puissant", "sage"],
        answer: "mesquin",
        feedback: "Magnanime signifie 'généreux et noble de cœur'. Son contraire est mesquin : petit, avare de sentiments."
      },
      { id:"trouver-antonyme-n3-09",
        type: "match",
        instruction: "Ce verbe a des antonymes différents selon le contexte. Associe chaque emploi à son contraire.",
        pairs: [
          { left: "tenir une promesse", right: "rompre une promesse" },
          { left: "tenir debout", right: "s'effondrer" },
          { left: "tenir bon (résister)", right: "céder" }
        ],
        feedback: "Tenir une promesse → rompre ; tenir debout → s'effondrer ; tenir bon → céder. Un même verbe a des antonymes différents selon le sens exact."
      },
      { id:"trouver-antonyme-n3-10",
        type: "mcq",
        instruction: "Dans 'Sa décision fut abrupte', l'antonyme exact de 'abrupte' (soudaine et brutale) est…",
        choices: ["rapide", "mûrement réfléchie", "silencieuse", "coûteuse"],
        answer: "mûrement réfléchie",
        feedback: "Abrupte signifie ici 'prise sans préparation, de façon brusque'. Son antonyme est 'mûrement réfléchie' : pensée longuement avant d'être prise."
      }
    ]
  },

  "identifier-homonyme": {
    title: "Identifier un homonyme",
    domaine: "Français",
    competence: "Vocabulaire — Identifier un homonyme",
    type: "vocabulaire-niveaux",
    levels: ["CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître les paires d'homonymes courants",
      "2": "Choisir le bon homonyme selon le contexte de la phrase",
      "3": "Homonymes rares et homophones grammaticaux complexes"
    },
    level1Bank: [
      { id:"identifier-homonyme-n1-01",
        type: "mcq",
        instruction: "Que sont 'mère' et 'mer' ?",
        choices: ["Des synonymes", "Des antonymes", "Des homonymes", "Des mots de la même famille"],
        answer: "Des homonymes",
        feedback: "Mère et mer se prononcent de la même façon [mεʁ] mais s'écrivent différemment et ont des sens distincts. Ce sont des homonymes."
      },
      { id:"identifier-homonyme-n1-02",
        type: "mcq",
        instruction: "Complète : « Nous avons navigué sur la ___ pendant toute la journée. »",
        choices: ["mère", "mer", "maire", "faire"],
        answer: "mer",
        feedback: "On navigue sur la mer (grande étendue d'eau salée). 'Mère' est le parent féminin, 'maire' est le responsable d'une commune."
      },
      { id:"identifier-homonyme-n1-03",
        type: "match",
        instruction: "Associe chaque homonyme à sa définition.",
        pairs: [
          { left: "verre", right: "récipient pour boire" },
          { left: "vert", right: "couleur entre bleu et jaune" },
          { left: "vers", right: "en direction de" }
        ],
        feedback: "Verre (récipient), vert (couleur), vers (direction ou lignes de poème) sont trois homonymes : même son [vɛʁ], sens très différents."
      },
      { id:"identifier-homonyme-n1-04",
        type: "mcq",
        instruction: "Qu'est-ce que deux homonymes ont en commun ?",
        choices: ["Le même sens", "La même orthographe", "La même prononciation", "La même longueur"],
        answer: "La même prononciation",
        feedback: "Les homonymes partagent la même prononciation (même son) mais ont des orthographes et/ou des sens différents."
      },
      { id:"identifier-homonyme-n1-05",
        type: "mcq",
        instruction: "Quel est l'homonyme du mot 'sot' (stupide) ?",
        choices: ["sol", "sort", "seau", "soif"],
        answer: "seau",
        feedback: "Sot [so] (stupide) et seau [so] (récipient) se prononcent exactement pareil. Ce sont des homonymes."
      },
      { id:"identifier-homonyme-n1-06",
        type: "mcq",
        instruction: "Que sont 'cent', 'sang' et 'sans' ?",
        choices: ["Des synonymes", "Des antonymes", "Des homonymes", "Des mots de la même famille"],
        answer: "Des homonymes",
        feedback: "Cent [sɑ̃] (nombre), sang [sɑ̃] (liquide rouge) et sans [sɑ̃] (préposition) se prononcent pareil mais s'écrivent différemment. Ce sont des homonymes."
      },
      { id:"identifier-homonyme-n1-07",
        type: "mcq",
        instruction: "Complète : « Le boulanger vend du ___ frais tous les matins. »",
        choices: ["pain", "pin", "peint", "main"],
        answer: "pain",
        feedback: "On achète du pain (aliment) chez le boulanger. Pin est un arbre, peint vient du verbe peindre, main est une partie du corps."
      },
      { id:"identifier-homonyme-n1-08",
        type: "match",
        instruction: "Associe chaque homonyme à sa définition.",
        pairs: [
          { left: "cou", right: "partie du corps entre la tête et les épaules" },
          { left: "coup", right: "choc ou action brève" },
          { left: "coût", right: "prix de quelque chose" }
        ],
        feedback: "Cou, coup et coût se prononcent tous [ku] mais ont des sens et des orthographes différents : ce sont des homonymes."
      },
      { id:"identifier-homonyme-n1-09",
        type: "mcq",
        instruction: "Quel est l'homonyme du mot 'air' (ce qu'on respire) ?",
        choices: ["aire", "habit", "route", "fleur"],
        answer: "aire",
        feedback: "Air [ɛʁ] (ce qu'on respire) et aire [ɛʁ] (surface, zone) se prononcent pareil. Ce sont des homonymes."
      },
      { id:"identifier-homonyme-n1-10",
        type: "mcq",
        instruction: "Complète : « Il a acheté une bouteille de ___ pour le dîner. »",
        choices: ["vin", "vingt", "vain", "vint"],
        answer: "vin",
        feedback: "On boit du vin (boisson) au dîner. Vingt est un nombre, vain signifie inutile, vint est le passé simple du verbe venir."
      }
    ],
    level2Bank: [
      { id:"identifier-homonyme-n2-01",
        type: "mcq",
        instruction: "Choisis le bon mot : « Je voudrais un ___ d'eau, s'il vous plaît. »",
        choices: ["verre (récipient pour boire)", "vert (couleur)", "ver (animal)", "vers (direction)"],
        answer: "verre (récipient pour boire)",
        feedback: "On boit dans un verre. Vert est une couleur, ver est un petit animal, vers indique une direction. Même prononciation [vɛʁ], orthographes et sens différents : ce sont des homonymes."
      },
      { id:"identifier-homonyme-n2-02",
        type: "mcq",
        instruction: "Quelle phrase utilise correctement 'ou' et 'où' ?",
        choices: [
          "Je ne sais pas ou je suis allé.",
          "Je ne sais pas où je suis allé.",
          "Veux-tu du chocolat où de la vanille ?",
          "Tu vas ou ce soir ?"
        ],
        answer: "Je ne sais pas où je suis allé.",
        feedback: "'Où' (avec accent) indique un lieu. 'Ou' (sans accent) marque un choix (= ou bien). Test facile : si tu peux remplacer par 'ou bien', pas d'accent. Sinon, accent grave."
      },
      { id:"identifier-homonyme-n2-03",
        type: "mcq",
        instruction: "Choisis le bon homonyme : « Il ___ son manteau sur le fauteuil. »",
        choices: ["pose (verbe poser)", "Paul (prénom)", "pot (récipient)", "pauvre"],
        answer: "pose (verbe poser)",
        feedback: "Dans cette phrase, le sujet 'il' a besoin d'un verbe. 'Pose' est le verbe poser conjugué à la 3e personne du singulier. Les homonymes de 'pose' seraient 'peau', 'peut', etc. dans d'autres homonymes."
      },
      { id:"identifier-homonyme-n2-04",
        type: "match",
        instruction: "Associe chaque homonyme à la phrase où il doit apparaître.",
        pairs: [
          { left: "a (verbe avoir)", right: "Paul a mangé sa pomme." },
          { left: "à (préposition)", right: "Elle habite à Madrid." },
          { left: "la (article)", right: "La maison est grande." },
          { left: "là (adverbe de lieu)", right: "Pose-le là, sur la table." }
        ],
        feedback: "'A' est le verbe avoir conjugué ; 'à' est une préposition. 'La' est un article défini ; 'là' indique un lieu. Ce sont des homonymes grammaticaux."
      },
      { id:"identifier-homonyme-n2-05",
        type: "mcq",
        instruction: "Pourquoi est-il important de connaître les homonymes ?",
        choices: [
          "Pour faire de plus longues phrases",
          "Pour ne pas commettre d'erreurs d'orthographe et choisir le bon mot",
          "Pour apprendre l'alphabet plus vite",
          "Pour écrire en calligraphie"
        ],
        answer: "Pour ne pas commettre d'erreurs d'orthographe et choisir le bon mot",
        feedback: "Les homonymes sont une source fréquente d'erreurs (a/à, ou/où, son/sont…). Les connaître permet de choisir la bonne orthographe selon le sens voulu."
      },
      { id:"identifier-homonyme-n2-06",
        type: "mcq",
        instruction: "Quelle phrase utilise correctement 'ces' et 'ses' ?",
        choices: [
          "Ces chaussures sont ses préférées.",
          "Ses chaussures sont ces préférées.",
          "Ces chaussures sont ces préférées.",
          "Ses chaussures sont ses préférées et ces confortables."
        ],
        answer: "Ces chaussures sont ses préférées.",
        feedback: "'Ces' est un déterminant démonstratif (ces chaussures-là). 'Ses' est un déterminant possessif (les chaussures de lui/elle)."
      },
      { id:"identifier-homonyme-n2-07",
        type: "mcq",
        instruction: "Choisis le bon mot : « Je te laisse le choix, prends la ___ que tu préfères. »",
        choices: ["voie (chemin)", "voix (son émis)", "vois (verbe voir)", "vois-tu"],
        answer: "voie (chemin)",
        feedback: "'Voie' désigne un chemin ou une direction. 'Voix' est le son émis en parlant. 'Vois' est le verbe voir conjugué. Ces mots se prononcent tous [vwa]."
      },
      { id:"identifier-homonyme-n2-08",
        type: "mcq",
        instruction: "Quelle phrase utilise correctement 'quand', 'quant' et 'qu'en' ?",
        choices: [
          "Quand tu viendras, quant à moi, je serai prêt.",
          "Quant tu viendras, quand à moi, je serai prêt.",
          "Qu'en tu viendras, quant à moi, je serai prêt.",
          "Quand tu viendras, qu'en à moi, je serai prêt."
        ],
        answer: "Quand tu viendras, quant à moi, je serai prêt.",
        feedback: "'Quand' indique le temps (= lorsque). 'Quant à' signifie 'en ce qui concerne'. 'Qu'en' est la contraction de 'que' + 'en'."
      },
      { id:"identifier-homonyme-n2-09",
        type: "match",
        instruction: "Associe chaque homonyme à la phrase où il doit apparaître.",
        pairs: [
          { left: "peu (adverbe de quantité)", right: "Il reste peu de temps." },
          { left: "peux (verbe pouvoir)", right: "Tu peux venir avec nous." },
          { left: "peut (verbe pouvoir)", right: "Elle peut réussir." }
        ],
        feedback: "Peu, peux et peut se prononcent tous [pø] mais ont des rôles grammaticaux différents : adverbe ou verbe pouvoir conjugué."
      },
      { id:"identifier-homonyme-n2-10",
        type: "mcq",
        instruction: "Pourquoi confond-on souvent 'quel(le)' et 'qu'elle' ?",
        choices: [
          "Parce qu'ils se prononcent de la même façon [kɛl]",
          "Parce qu'ils ont le même sens",
          "Parce qu'ils s'écrivent de la même façon",
          "Parce qu'ils sont tous les deux des verbes"
        ],
        answer: "Parce qu'ils se prononcent de la même façon [kɛl]",
        feedback: "'Quel/quelle' est un déterminant ou adjectif interrogatif (quelle heure est-il ?). 'Qu'elle' est la contraction de 'que' + 'elle' (Je pense qu'elle viendra)."
      }
    ],
    level3Bank: [
      { id:"identifier-homonyme-n3-01",
        type: "mcq",
        instruction: "Dans « Ces cèdres cèdent sous le vent », combien de mots se prononcent pareil mais s'écrivent différemment ?",
        choices: ["Aucun", "1 paire : ces/cèdres", "1 paire : ces/cèdent", "2 paires : ces/cèdres et ces/cèdent"],
        answer: "1 paire : ces/cèdent",
        feedback: "'Ces' [se] (déterminant) et 'cèdent' [sɛd] ne se prononcent pas exactement pareil. Mais 'cèdres' [sɛdʁ] et 'cèdent' [sɛd] sont proches. La bonne réponse dépend de la prononciation régionale, mais ce sont surtout 'ces' et le début de 'cèdent'/'cèdres' qui sont homophones."
      },
      { id:"identifier-homonyme-n3-02",
        type: "match",
        instruction: "Associe chaque paire d'homophones à leur différence grammaticale.",
        pairs: [
          { left: "son / sont", right: "son = déterminant ; sont = verbe être" },
          { left: "ce / se", right: "ce = déterminant/pronom ; se = pronom réfléchi" },
          { left: "leur / leurs", right: "leur = pronom/déterminant sg. ; leurs = déterminant pluriel" }
        ],
        feedback: "Son/sont, ce/se, leur/leurs sont des homophones grammaticaux : même son, mais catégorie grammaticale différente. Pour ne pas les confondre, on analyse le rôle du mot dans la phrase."
      },
      { id:"identifier-homonyme-n3-03",
        type: "mcq",
        instruction: "Lequel de ces couples n'est PAS une paire d'homonymes ?",
        choices: ["poing / point", "chant / champ", "sain / saint", "maison / manteau"],
        answer: "maison / manteau",
        feedback: "Poing [pwɛ̃] et point [pwɛ̃] sont homonymes. Chant [ʃɑ̃] et champ [ʃɑ̃] sont homonymes. Sain [sɛ̃] et saint [sɛ̃] sont homonymes. Mais maison [mɛzɔ̃] et manteau [mɑ̃to] ne se prononcent pas pareil."
      },
      { id:"identifier-homonyme-n3-04",
        type: "mcq",
        instruction: "Dans « Il compte sur ses doigts », 'compte' est un homonyme de…",
        choices: ["comte (noble)", "conte (histoire)", "comte et conte à la fois", "aucun mot"],
        answer: "comte et conte à la fois",
        feedback: "Compte [kɔ̃t] (verbe compter), conte [kɔ̃t] (récit merveilleux) et comte [kɔ̃t] (titre de noblesse) sont trois homonymes ! Même prononciation, orthographes et sens très différents."
      },
      { id:"identifier-homonyme-n3-05",
        type: "mcq",
        instruction: "Quelle stratégie permet de ne PAS confondre 'davantage' et 'd'avantage' ?",
        choices: [
          "Davantage s'écrit en un mot quand il signifie 'plus' ; d'avantage en deux mots quand avantage est un nom",
          "Les deux s'écrivent toujours en deux mots",
          "Les deux s'écrivent toujours en un mot",
          "On choisit selon la longueur de la phrase"
        ],
        answer: "Davantage s'écrit en un mot quand il signifie 'plus' ; d'avantage en deux mots quand avantage est un nom",
        feedback: "Test : peut-on remplacer par 'plus' ? Si oui, c'est 'davantage' (adverbe, un mot). Sinon, 'd'avantage' = préposition de + nom avantage (ex. : 'tirer d'avantage de la situation')."
      },
      { id:"identifier-homonyme-n3-06",
        type: "mcq",
        instruction: "Lequel de ces couples n'est PAS une paire d'homophones ?",
        choices: ["cygne / signe", "tante / tente", "cher / chair", "chou / genou"],
        answer: "chou / genou",
        feedback: "Cygne/signe [siɲ], tante/tente [tɑ̃t] et cher/chair [ʃɛʁ] sont des paires d'homophones parfaits. Chou [ʃu] et genou [ʒənu] ne se prononcent pas pareil."
      },
      { id:"identifier-homonyme-n3-07",
        type: "match",
        instruction: "Associe chaque série d'homophones rares à leur différence de nature.",
        pairs: [
          { left: "prêt / près / pré", right: "prêt = adjectif (disponible) ; près = adverbe (proximité) ; pré = nom (champ)" },
          { left: "cour / cours / court / courre", right: "cour = espace extérieur ; cours = leçon ; court = bref ; courre = chasse à courre" },
          { left: "tan / tant / taon / temps", right: "tan = écorce tannante ; tant = quantité ; taon = insecte piqueur ; temps = durée ou météo" }
        ],
        feedback: "Ces séries d'homophones rares regroupent jusqu'à quatre mots de nature grammaticale différente qui se prononcent exactement pareil."
      },
      { id:"identifier-homonyme-n3-08",
        type: "mcq",
        instruction: "Dans « Le foie du canard est cuit », combien de mots ont un homophone ?",
        choices: ["Aucun", "1 : foie (fois/foi)", "2 : foie et canard", "3 : foie, canard et cuit"],
        answer: "1 : foie (fois/foi)",
        feedback: "Foie [fwa] a deux homophones : fois (occurrence) et foi (croyance). Canard et cuit n'ont pas d'homophone courant."
      },
      { id:"identifier-homonyme-n3-09",
        type: "mcq",
        instruction: "Quelle stratégie permet de ne PAS confondre 'plus tôt' et 'plutôt' ?",
        choices: [
          "Plus tôt s'oppose à 'plus tard' (notion de temps) ; plutôt signifie 'de préférence'",
          "Les deux s'écrivent toujours en un seul mot",
          "Les deux s'écrivent toujours en deux mots",
          "On choisit selon la longueur de la phrase"
        ],
        answer: "Plus tôt s'oppose à 'plus tard' (notion de temps) ; plutôt signifie 'de préférence'",
        feedback: "Test : peut-on remplacer par 'plus tard' ? Si le sens s'y oppose, on écrit en deux mots. Sinon (= de préférence), on écrit 'plutôt' en un mot."
      },
      { id:"identifier-homonyme-n3-10",
        type: "mcq",
        instruction: "Lequel de ces mots n'est PAS homophone de 'père' ?",
        choices: ["paire", "pair", "perd", "pierre"],
        answer: "pierre",
        feedback: "Père, paire, pair et perd se prononcent tous [pɛʁ]. Pierre se prononce [pjɛʁ], avec un son différent : ce n'est pas un homophone de 'père'."
      }
    ]
  },

  "polysemie": {
    title: "Comprendre la polysémie d'un mot",
    domaine: "Français",
    competence: "Vocabulaire — Comprendre la polysémie d'un mot",
    type: "vocabulaire-niveaux",
    levels: ["CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître qu'un mot peut avoir plusieurs sens",
      "2": "Identifier le sens exact d'un mot polysémique dans son contexte",
      "3": "Analyser la polysémie — liens de sens et glissements de sens"
    },
    level1Bank: [
      { id:"polysemie-n1-01",
        type: "mcq",
        instruction: "Un mot qui a plusieurs sens différents s'appelle…",
        choices: ["un synonyme", "un antonyme", "un homonyme", "un mot polysémique"],
        answer: "un mot polysémique",
        feedback: "Polysémique vient du grec 'poly' (plusieurs) et 'sema' (sens). Un mot polysémique possède plusieurs définitions différentes dans le dictionnaire."
      },
      { id:"polysemie-n1-02",
        type: "mcq",
        instruction: "Le mot 'voler' peut signifier : 1. Se déplacer dans les airs  2. Prendre ce qui ne m'appartient pas. Combien de sens a-t-il ?",
        choices: ["Un seul sens", "Deux sens", "Trois sens", "Aucun sens"],
        answer: "Deux sens",
        feedback: "Voler est polysémique : il a au moins deux sens différents. 'L'oiseau vole' (dans les airs) et 'Il a volé mon sac' (dérober) n'expriment pas du tout la même idée."
      },
      { id:"polysemie-n1-03",
        type: "mcq",
        instruction: "Dans « Le feu est rouge », que signifie 'feu' ?",
        choices: ["Un incendie", "Un signal de circulation", "De la chaleur", "Un feu de cheminée"],
        answer: "Un signal de circulation",
        feedback: "Le contexte (couleur rouge, circulation) indique qu'il s'agit d'un feu tricolore. Le sens d'un mot polysémique se trouve grâce au contexte."
      },
      { id:"polysemie-n1-04",
        type: "mcq",
        instruction: "Comment trouve-t-on le bon sens d'un mot polysémique ?",
        choices: [
          "En regardant sa longueur",
          "En lisant le contexte (les mots autour)",
          "En cherchant son synonyme",
          "En comptant ses lettres"
        ],
        answer: "En lisant le contexte (les mots autour)",
        feedback: "Le contexte est la clé ! Les mots qui entourent un mot polysémique indiquent quel sens est utilisé dans cette situation."
      },
      { id:"polysemie-n1-05",
        type: "mcq",
        instruction: "Quel mot est polysémique ?",
        choices: [
          "stylo (un seul sens)",
          "table (meuble, repas, liste…)",
          "crayon (un seul sens)",
          "gomme (uniquement pour effacer)"
        ],
        answer: "table (meuble, repas, liste…)",
        feedback: "Table est polysémique : meuble (table de cuisine), repas (tenir une bonne table), liste (table de multiplication). Les autres mots ont un sens principal."
      },
      { id:"polysemie-n1-06",
        type: "mcq",
        instruction: "Combien de sens différents le mot 'glace' peut-il avoir : 1. Eau gelée  2. Dessert froid sucré  3. Miroir ?",
        choices: ["Un seul sens", "Deux sens", "Trois sens", "Aucun sens"],
        answer: "Trois sens",
        feedback: "Glace est polysémique : on patine sur la glace (eau gelée), on mange une glace (dessert), on se regarde dans la glace (miroir). Trois sens bien différents."
      },
      { id:"polysemie-n1-07",
        type: "mcq",
        instruction: "Dans « Elle range ses affaires dans le bureau », que signifie 'bureau' ?",
        choices: [
          "Un meuble pour écrire ou ranger",
          "Une pièce où l'on travaille",
          "Une entreprise",
          "Un service administratif"
        ],
        answer: "Un meuble pour écrire ou ranger",
        feedback: "Le contexte (ranger ses affaires) indique le meuble. 'Bureau' peut aussi désigner une pièce de travail ou une administration, selon le contexte."
      },
      { id:"polysemie-n1-08",
        type: "mcq",
        instruction: "Le mot 'note' peut signifier : 1. Un résultat scolaire  2. Un son de musique. Combien de sens a-t-il dans ces deux exemples ?",
        choices: ["Un seul sens", "Deux sens", "Trois sens", "Aucun sens"],
        answer: "Deux sens",
        feedback: "Note est polysémique : 'j'ai eu une bonne note' (résultat scolaire) et 'jouer une note' (son de musique) sont deux sens bien distincts."
      },
      { id:"polysemie-n1-09",
        type: "mcq",
        instruction: "Quel mot est polysémique ?",
        choices: [
          "trousse (un seul sens)",
          "carte (jeu, géographie, restaurant…)",
          "taille-crayon (un seul sens)",
          "agrafeuse (un seul sens)"
        ],
        answer: "carte (jeu, géographie, restaurant…)",
        feedback: "Carte est polysémique : carte à jouer, carte de géographie, carte de restaurant, carte bancaire. Les autres mots ont un sens unique."
      },
      { id:"polysemie-n1-10",
        type: "mcq",
        instruction: "Dans « Range ta feuille dans ton classeur », que signifie 'feuille' ?",
        choices: [
          "Une partie d'une plante",
          "Une feuille de papier",
          "Une fine plaque de métal",
          "Un journal"
        ],
        answer: "Une feuille de papier",
        feedback: "Le contexte (ranger dans un classeur) indique une feuille de papier. 'Feuille' peut aussi désigner une partie de plante ou une fine plaque de métal."
      }
    ],
    level2Bank: [
      { id:"polysemie-n2-01",
        type: "match",
        instruction: "Le mot 'tête' a plusieurs sens. Associe chaque phrase au sens utilisé.",
        pairs: [
          { left: "Il a mal à la tête.", right: "Partie supérieure du corps" },
          { left: "Il est en tête du classement.", right: "Première place, leader" },
          { left: "Quelle tête de lard !", right: "Caractère têtu, personne obstinée" }
        ],
        feedback: "Tête peut désigner une partie du corps, une position en tête, ou un caractère difficile. Le contexte révèle le sens polysémique."
      },
      { id:"polysemie-n2-02",
        type: "mcq",
        instruction: "Dans 'Le boulanger pétrit la pâte', que signifie 'pâte' ?",
        choices: [
          "Un mélange de farine et d'eau à travailler",
          "Un plat de spaghettis",
          "Une couleur pastel",
          "Un tempérament doux"
        ],
        answer: "Un mélange de farine et d'eau à travailler",
        feedback: "Le boulanger pétrit une pâte à pain (mélange de farine, eau, levure). Pâte est polysémique : pâtes alimentaires, pâte dentifrice, pâte (tempérament), etc."
      },
      { id:"polysemie-n2-03",
        type: "match",
        instruction: "Associe chaque emploi du mot 'planche' à son sens.",
        pairs: [
          { left: "Clouer une planche.", right: "Morceau de bois plat" },
          { left: "La planche de surf glisse sur les vagues.", right: "Plaque de matière rigide pour sport" },
          { left: "Regarder les planches de bande dessinée.", right: "Pages de BD avec cases dessinées" }
        ],
        feedback: "Planche est polysémique : bois de construction, équipement de sport, page de BD. C'est le contexte qui précise le sens."
      },
      { id:"polysemie-n2-04",
        type: "mcq",
        instruction: "Dans 'Son roman est une mine d'informations', le mot 'mine' signifie…",
        choices: [
          "Un gisement souterrain",
          "Une source riche et abondante",
          "Un aspect du visage",
          "Un engin explosif"
        ],
        answer: "Une source riche et abondante",
        feedback: "Ici, 'mine d'informations' est une expression figurée : le roman est comme une mine (gisement) très riche. C'est un emploi métaphorique du mot polysémique 'mine'."
      },
      { id:"polysemie-n2-05",
        type: "mcq",
        instruction: "Pourquoi le mot 'opération' est-il polysémique ?",
        choices: [
          "Parce qu'il vient du grec",
          "Parce qu'il désigne à la fois un calcul mathématique, une intervention chirurgicale, et une action militaire",
          "Parce qu'il a beaucoup de lettres",
          "Parce qu'il est difficile à écrire"
        ],
        answer: "Parce qu'il désigne à la fois un calcul mathématique, une intervention chirurgicale, et une action militaire",
        feedback: "Opération est polysémique : 4+3 est une opération (maths), retirer une appendicite est une opération (chirurgie), le débarquement était une opération (militaire)."
      },
      { id:"polysemie-n2-06",
        type: "match",
        instruction: "Le mot 'pièce' a plusieurs sens. Associe chaque phrase au sens utilisé.",
        pairs: [
          { left: "Il a payé avec une pièce de deux euros.", right: "Une pièce de monnaie" },
          { left: "Cette maison a cinq pièces.", right: "Une salle, une chambre" },
          { left: "Nous allons voir une pièce de théâtre.", right: "Une œuvre théâtrale" }
        ],
        feedback: "Pièce peut désigner une pièce de monnaie, une salle d'une maison, ou une œuvre de théâtre. Le contexte révèle le sens."
      },
      { id:"polysemie-n2-07",
        type: "mcq",
        instruction: "Dans « Le facteur dépose le courrier dans la boîte », que signifie 'boîte' ?",
        choices: [
          "Une boîte aux lettres",
          "Un contenant en carton",
          "Une entreprise (familier)",
          "Une boîte de nuit"
        ],
        answer: "Une boîte aux lettres",
        feedback: "Le contexte (facteur, courrier) indique la boîte aux lettres. Boîte est polysémique : boîte de conserve, boîte de nuit, boîte (= entreprise, familier), etc."
      },
      { id:"polysemie-n2-08",
        type: "match",
        instruction: "Associe chaque emploi du mot 'langue' à son sens.",
        pairs: [
          { left: "Elle s'est mordu la langue.", right: "Organe de la bouche" },
          { left: "Il parle trois langues.", right: "Système de communication d'un pays" },
          { left: "Une langue de terre s'avance dans la mer.", right: "Bande étroite et allongée" }
        ],
        feedback: "Langue est polysémique : organe du corps, système linguistique, forme géographique. Le contexte précise le sens."
      },
      { id:"polysemie-n2-09",
        type: "mcq",
        instruction: "Dans « La curiosité est le moteur de ses recherches », le mot 'moteur' signifie…",
        choices: [
          "Une pièce mécanique qui produit un mouvement",
          "Ce qui pousse à agir, la cause principale",
          "Un véhicule",
          "Un bruit fort"
        ],
        answer: "Ce qui pousse à agir, la cause principale",
        feedback: "Ici, 'moteur' est employé au sens figuré : comme un moteur fait avancer une machine, la curiosité pousse à agir. Emploi métaphorique du mot polysémique 'moteur'."
      },
      { id:"polysemie-n2-10",
        type: "mcq",
        instruction: "Pourquoi le mot 'sac' est-il polysémique ?",
        choices: [
          "Parce qu'il désigne à la fois un contenant en tissu, un sac de couchage, et un sac à main",
          "Parce qu'il vient du grec",
          "Parce qu'il est court à écrire",
          "Parce qu'il n'existe qu'un seul type de sac"
        ],
        answer: "Parce qu'il désigne à la fois un contenant en tissu, un sac de couchage, et un sac à main",
        feedback: "Sac est polysémique : sac à dos, sac de couchage, sac à main, sac de sport… le sens de base 'contenant souple' se décline selon l'usage."
      }
    ],
    level3Bank: [
      { id:"polysemie-n3-01",
        type: "mcq",
        instruction: "Le mot 'pont' signifie 1. ouvrage qui enjambe un cours d'eau 2. partie du navire 3. jour férié entre deux jours chômés. Quel sens 'pont' a-t-il dans 'faire le pont' ?",
        choices: ["Ouvrage sur l'eau", "Partie du navire", "Jour chômé entre deux congés", "Aucun des trois"],
        answer: "Jour chômé entre deux congés",
        feedback: "'Faire le pont' signifie prendre un jour de congé entre deux jours non travaillés (week-end + jour férié). C'est un sens figuré issu de l'idée de 'relier' deux rives."
      },
      { id:"polysemie-n3-02",
        type: "match",
        instruction: "Associe chaque emploi du mot 'temps' à sa catégorie de sens.",
        pairs: [
          { left: "Il fait beau temps.", right: "Météo (état de l'atmosphère)" },
          { left: "Je n'ai pas le temps.", right: "Durée disponible" },
          { left: "Le temps passe vite.", right: "Succession des moments" },
          { left: "Le temps du verbe", right: "Forme grammaticale du verbe" }
        ],
        feedback: "Temps est l'un des mots les plus polysémiques du français. Ses sens (météo, durée, grammaire, moment) ont tous un lien avec la notion de 'durée' ou d''état'."
      },
      { id:"polysemie-n3-03",
        type: "mcq",
        instruction: "Comment les sens d'un mot polysémique sont-ils souvent liés entre eux ?",
        choices: [
          "Ils n'ont aucun rapport",
          "Ils partagent une image ou une idée commune (métaphore, analogie)",
          "Ils ont toujours la même longueur",
          "Ils viennent toujours de langues différentes"
        ],
        answer: "Ils partagent une image ou une idée commune (métaphore, analogie)",
        feedback: "La polysémie naît souvent d'une métaphore ou d'une analogie. Ex. : 'pied de table' (comme un pied humain qui soutient). Les sens se développent à partir d'une image centrale."
      },
      { id:"polysemie-n3-04",
        type: "mcq",
        instruction: "Dans 'La vedette du film a du cœur', que signifie 'vedette' ?",
        choices: [
          "Un petit bateau rapide",
          "Une star, une célébrité",
          "Un avant-poste militaire",
          "Le titre d'un article"
        ],
        answer: "Une star, une célébrité",
        feedback: "Vedette est polysémique : petit bateau (vedette de la marine), star (vedette du cinéma), mise en relief d'un mot (en vedette). Ici, le contexte 'film' indique qu'il s'agit d'une star."
      },
      { id:"polysemie-n3-05",
        type: "match",
        instruction: "Le mot 'lame' a plusieurs sens. Associe chaque emploi à sa définition.",
        pairs: [
          { left: "La lame du couteau.", right: "Partie tranchante d'une arme ou d'un outil" },
          { left: "Les lames de parquet.", right: "Planche mince et allongée" },
          { left: "Les lames déferlent sur la plage.", right: "Vague de la mer" }
        ],
        feedback: "Lame (partie tranchante), lame (planche mince), lame (vague) : trois sens liés par l'idée d'une forme plate et allongée. C'est un glissement de sens typique de la polysémie."
      },
      { id:"polysemie-n3-06",
        type: "mcq",
        instruction: "Le mot 'cœur' signifie 1. organe qui fait circuler le sang  2. centre d'une chose  3. siège des sentiments. Quel sens a 'cœur' dans 'le cœur du problème' ?",
        choices: [
          "L'organe qui bat",
          "Le centre, l'essentiel d'une chose",
          "Le siège des sentiments",
          "Une carte à jouer"
        ],
        answer: "Le centre, l'essentiel d'une chose",
        feedback: "'Le cœur du problème' est une expression figurée : comme le cœur est au centre du corps, l'expression désigne l'essentiel d'une question."
      },
      { id:"polysemie-n3-07",
        type: "match",
        instruction: "Associe chaque emploi du mot 'porte' à sa catégorie de sens.",
        pairs: [
          { left: "Il ouvre la porte du garage.", right: "Panneau qui ferme une entrée" },
          { left: "Cette victoire lui ouvre la porte du championnat.", right: "Accès, possibilité" },
          { left: "Le porte-parole du gouvernement s'exprime.", right: "Élément composé indiquant qui porte quelque chose" }
        ],
        feedback: "Porte est polysémique : objet concret, sens figuré (accès à une possibilité), et élément de mots composés (porte-parole, porte-monnaie)."
      },
      { id:"polysemie-n3-08",
        type: "mcq",
        instruction: "Comment appelle-t-on l'emploi d'un mot polysémique dans un sens détourné, comme dans 'dévorer un livre' (= lire avec avidité) ?",
        choices: ["Un sens propre", "Un sens figuré", "Un homonyme", "Un synonyme"],
        answer: "Un sens figuré",
        feedback: "'Dévorer' au sens propre signifie manger avec voracité. Ici, il est employé au sens figuré : lire avec avidité, comme si on 'mangeait' le livre des yeux."
      },
      { id:"polysemie-n3-09",
        type: "mcq",
        instruction: "Dans « L'entreprise a pris du volume ces dernières années », que signifie 'volume' ?",
        choices: [
          "L'intensité d'un son",
          "L'importance, la taille globale",
          "Un livre relié",
          "Une mesure d'espace en mathématiques"
        ],
        answer: "L'importance, la taille globale",
        feedback: "Volume est très polysémique : volume sonore, volume d'un livre, volume en géométrie, et ici, au sens figuré, l'ampleur d'une entreprise."
      },
      { id:"polysemie-n3-10",
        type: "match",
        instruction: "Le mot 'clé' (ou 'clef') a plusieurs sens. Associe chaque emploi à sa définition.",
        pairs: [
          { left: "La clé ouvre la porte.", right: "Objet métallique qui actionne une serrure" },
          { left: "C'est un secteur clé de l'économie.", right: "Élément essentiel, déterminant" },
          { left: "La clé de sol indique la hauteur des notes.", right: "Symbole musical de repère" }
        ],
        feedback: "Clé (objet, adjectif figuré 'essentiel', symbole musical) : trois sens liés à l'idée d'un élément qui permet d'ouvrir, de comprendre ou de repérer quelque chose."
      }
    ]
  },

  "sens-propre-figure": {
    title: "Identifier le sens propre et le sens figuré",
    domaine: "Français",
    competence: "Vocabulaire — Identifier le sens propre et le sens figuré",
    type: "vocabulaire-niveaux",
    levels: ["CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Distinguer sens littéral et sens imagé",
      "2": "Expressions figurées — reconnaître et interpréter",
      "3": "Analyser et créer des images — métaphore et sens figuré dans les textes"
    },
    level1Bank: [
      { id:"sens-propre-figure-n1-01",
        type: "mcq",
        instruction: "Que signifie 'sens propre' d'un mot ?",
        choices: [
          "Le sens imagé, non littéral",
          "Le sens courant et concret du mot",
          "Le sens contraire",
          "Le sens le plus rare"
        ],
        answer: "Le sens courant et concret du mot",
        feedback: "Le sens propre est le sens premier, concret et littéral. Ex. : 'le chat monte dans l'arbre' → 'monter' au sens propre = se déplacer vers le haut."
      },
      { id:"sens-propre-figure-n1-02",
        type: "col-sort",
        instruction: "Clique sur la bonne colonne pour chaque phrase.",
        colA: "Sens propre",
        colB: "Sens figuré",
        items: [
          {
            text: "Le chat monte dans l'arbre.",
            answer: "A",
            feedback: "Monter = se déplacer physiquement vers le haut. C'est le sens propre, concret et littéral."
          },
          {
            text: "Sa colère monte.",
            answer: "B",
            feedback: "La colère ne monte pas vraiment : c'est une image. 'Monter' est utilisé au sens figuré pour exprimer que la colère s'intensifie."
          },
          {
            text: "Il a le cœur brisé.",
            answer: "B",
            feedback: "Le cœur n'est pas cassé physiquement : c'est une image qui exprime la tristesse. Sens figuré."
          },
          {
            text: "La vitre est brisée.",
            answer: "A",
            feedback: "La vitre est physiquement cassée en morceaux. C'est le sens propre, concret de 'briser'."
          }
        ],
        feedback: "Sens propre = sens concret, littéral. Sens figuré = sens imagé, métaphorique."
      },
      { id:"sens-propre-figure-n1-03",
        type: "mcq",
        instruction: "Dans 'Il a un cœur de pierre', le mot 'pierre' est au…",
        choices: [
          "sens propre (matière minérale)",
          "sens figuré (dur, sans pitié)",
          "sens alphabétique",
          "sens contraire"
        ],
        answer: "sens figuré (dur, sans pitié)",
        feedback: "Le cœur n'est pas fait de pierre ! 'Pierre' est utilisé comme image pour dire que la personne est dure et sans pitié. C'est le sens figuré."
      },
      { id:"sens-propre-figure-n1-04",
        type: "mcq",
        instruction: "Quelle phrase utilise 'lourd' au sens figuré ?",
        choices: [
          "Ce sac est très lourd.",
          "La pierre est lourde.",
          "Cette nouvelle est lourde à porter.",
          "Le cartable est lourd."
        ],
        answer: "Cette nouvelle est lourde à porter.",
        feedback: "Une nouvelle n'a pas de poids physique. 'Lourde à porter' exprime une douleur morale, un fardeau émotionnel. C'est le sens figuré."
      },
      { id:"sens-propre-figure-n1-05",
        type: "mcq",
        instruction: "Dans 'La rivière coule vite', 'couler' est au…",
        choices: ["sens figuré", "sens contraire", "sens propre", "sens polysémique"],
        answer: "sens propre",
        feedback: "L'eau coule vraiment, physiquement. C'est le sens premier et concret du verbe couler. Sens propre."
      },
      { id:"sens-propre-figure-n1-06",
        type: "mcq",
        instruction: "Que signifie 'sens figuré' d'un mot ?",
        choices: [
          "Le sens concret et littéral",
          "Le sens imagé, qui n'est pas à prendre au pied de la lettre",
          "Le sens le plus ancien du mot",
          "Le sens qu'on trouve en premier dans le dictionnaire"
        ],
        answer: "Le sens imagé, qui n'est pas à prendre au pied de la lettre",
        feedback: "Le sens figuré utilise une image pour exprimer une idée abstraite. Ex. : 'il a pris la porte' ne veut pas dire qu'il a emporté la porte, mais qu'il est parti brusquement."
      },
      { id:"sens-propre-figure-n1-07",
        type: "col-sort",
        instruction: "Clique sur la bonne colonne pour chaque phrase.",
        colA: "Sens propre",
        colB: "Sens figuré",
        items: [
          { text: "Le boulanger casse des œufs.", answer: "A", feedback: "Casser un œuf est une action physique et concrète. Sens propre." },
          { text: "Cette nouvelle m'a cassé le moral.", answer: "B", feedback: "Le moral ne se casse pas physiquement : c'est une image pour dire qu'on est démoralisé. Sens figuré." },
          { text: "Le vent souffle fort ce soir.", answer: "A", feedback: "Le vent souffle réellement, physiquement. Sens propre." },
          { text: "Elle lui a soufflé une idée de cadeau.", answer: "B", feedback: "Souffler une idée ne veut pas dire souffler de l'air : cela signifie suggérer discrètement. Sens figuré." }
        ],
        feedback: "Sens propre = action concrète. Sens figuré = image qui exprime autre chose."
      },
      { id:"sens-propre-figure-n1-08",
        type: "mcq",
        instruction: "Dans 'Il a pris la porte', l'expression est au…",
        choices: [
          "sens propre (il a emporté une porte)",
          "sens figuré (il est parti brusquement)",
          "sens contraire",
          "sens alphabétique"
        ],
        answer: "sens figuré (il est parti brusquement)",
        feedback: "'Prendre la porte' ne signifie pas emporter une porte : c'est une image pour dire qu'on quitte un lieu rapidement, souvent avec colère. Sens figuré."
      },
      { id:"sens-propre-figure-n1-09",
        type: "mcq",
        instruction: "Quelle phrase utilise 'dur' au sens figuré ?",
        choices: [
          "Cette pierre est dure.",
          "Le pain est devenu dur.",
          "La vie a été dure pour lui.",
          "Le bois est dur."
        ],
        answer: "La vie a été dure pour lui.",
        feedback: "La vie n'a pas de dureté physique. 'Dure' exprime ici une difficulté, une souffrance morale. C'est le sens figuré."
      },
      { id:"sens-propre-figure-n1-10",
        type: "mcq",
        instruction: "Dans 'Elle a un appétit de loup', l'expression signifie qu'elle…",
        choices: ["élève des loups", "a très faim", "a peur des loups", "chasse le loup"],
        answer: "a très faim",
        feedback: "Elle n'a pas vraiment l'appétit d'un loup : cette image signifie simplement qu'elle a très faim. Sens figuré."
      }
    ],
    level2Bank: [
      { id:"sens-propre-figure-n2-01",
        type: "col-sort",
        instruction: "Clique sur 'Sens propre' ou 'Sens figuré' pour chaque phrase.",
        colA: "Sens propre",
        colB: "Sens figuré",
        items: [
          {
            text: "Il broie du noir depuis la mauvaise nouvelle.",
            answer: "B",
            feedback: "On ne broie pas vraiment du noir : cette expression signifie 'être déprimé, avoir des idées sombres'. Sens figuré."
          },
          {
            text: "Le broyeur broie les déchets.",
            answer: "A",
            feedback: "Le broyeur écrase physiquement les déchets. Sens propre, action concrète."
          },
          {
            text: "Elle a les pieds sur terre.",
            answer: "B",
            feedback: "Ses pieds ne touchent pas forcément le sol ici : l'expression signifie 'être pragmatique, réaliste'. Sens figuré."
          },
          {
            text: "Il pose ses pieds dans la boue.",
            answer: "A",
            feedback: "Les pieds touchent réellement la boue. C'est le sens propre et concret de l'action."
          },
          {
            text: "Il nage dans le bonheur.",
            answer: "B",
            feedback: "On ne nage pas dans le bonheur comme dans l'eau : c'est une image exprimant une grande joie. Sens figuré."
          }
        ],
        feedback: "Le sens figuré utilise une image ou une métaphore pour exprimer quelque chose d'abstrait."
      },
      { id:"sens-propre-figure-n2-02",
        type: "mcq",
        instruction: "Que signifie l'expression 'avoir le cafard' au sens figuré ?",
        choices: ["Avoir un insecte chez soi", "Être déprimé, triste", "Avoir faim", "Avoir les idées claires"],
        answer: "Être déprimé, triste",
        feedback: "'Avoir le cafard' est une expression figurée qui signifie 'être triste, mélancolique'. L'insecte (le cafard) est utilisé comme image de quelque chose de désagréable et sombre."
      },
      { id:"sens-propre-figure-n2-03",
        type: "mcq",
        instruction: "Quelle est la différence entre le sens propre et le sens figuré du mot 'feu' dans 'Mettre le feu aux poudres' ?",
        choices: [
          "Au sens propre : déclencher une explosion. Au sens figuré : provoquer une dispute ou une crise.",
          "Au sens propre : allumer une bougie. Au sens figuré : cuisiner.",
          "Les deux sens sont identiques.",
          "Au sens propre : éteindre un feu. Au sens figuré : calmer."
        ],
        answer: "Au sens propre : déclencher une explosion. Au sens figuré : provoquer une dispute ou une crise.",
        feedback: "'Mettre le feu aux poudres' au sens propre = enflammer une poudre explosive. Au sens figuré = déclencher une dispute ou une crise. L'image de l'explosion illustre la soudaineté et la violence de la crise."
      },
      { id:"sens-propre-figure-n2-04",
        type: "mcq",
        instruction: "Quelle phrase utilise 'tomber' au sens figuré ?",
        choices: [
          "Le vase est tombé du bureau.",
          "Il est tombé dans l'escalier.",
          "La nuit tombe sur la ville.",
          "Les feuilles tombent en automne."
        ],
        answer: "La nuit tombe sur la ville.",
        feedback: "La nuit ne 'tombe' pas physiquement : cette expression signifie 'la nuit arrive progressivement'. C'est un sens figuré. Les autres phrases décrivent des chutes ou des descentes concrètes."
      },
      { id:"sens-propre-figure-n2-05",
        type: "mcq",
        instruction: "Dans 'Cette musique m'a transporté', quel est le sens figuré de 'transporté' ?",
        choices: [
          "Déplacé physiquement d'un lieu à un autre",
          "Ému, enthousiaste, hors de soi de joie",
          "Traduit dans une autre langue",
          "Enregistré sur un support numérique"
        ],
        answer: "Ému, enthousiaste, hors de soi de joie",
        feedback: "Au sens propre, transporter = déplacer physiquement. Au sens figuré, 'être transporté' par une musique = en être profondément ému, comme soulevé de terre par l'émotion."
      },
      { id:"sens-propre-figure-n2-06",
        type: "col-sort",
        instruction: "Clique sur 'Sens propre' ou 'Sens figuré' pour chaque phrase.",
        colA: "Sens propre",
        colB: "Sens figuré",
        items: [
          { text: "Il a la tête dans les nuages.", answer: "B", feedback: "Il n'a pas vraiment la tête dans le ciel : l'expression signifie qu'il est distrait, rêveur. Sens figuré." },
          { text: "L'avion vole dans les nuages.", answer: "A", feedback: "L'avion traverse réellement les nuages. Sens propre." },
          { text: "Ce projet est tombé à l'eau.", answer: "B", feedback: "Le projet n'est pas tombé physiquement dans l'eau : il a échoué. Sens figuré." },
          { text: "Le seau est tombé dans le puits.", answer: "A", feedback: "Le seau est réellement tombé dans le puits. Sens propre." },
          { text: "Elle a le cœur qui bat la chamade avant l'examen.", answer: "B", feedback: "Le cœur ne bat pas un tambour : cette image signifie qu'il bat très fort sous l'effet du stress. Sens figuré." }
        ],
        feedback: "Le sens figuré transforme une image concrète (nuages, eau, tambour) en expression d'un état ou d'un caractère."
      },
      { id:"sens-propre-figure-n2-07",
        type: "mcq",
        instruction: "Que signifie l'expression 'avoir un poil dans la main' au sens figuré ?",
        choices: ["Avoir mal à la main", "Être très paresseux", "Être très fort", "Avoir une blessure"],
        answer: "Être très paresseux",
        feedback: "'Avoir un poil dans la main' est une expression imagée qui signifie 'être très paresseux, ne rien vouloir faire'."
      },
      { id:"sens-propre-figure-n2-08",
        type: "mcq",
        instruction: "Quelle est la différence entre le sens propre et le sens figuré de 'couper' dans 'Couper la parole à quelqu'un' ?",
        choices: [
          "Au sens propre : trancher avec un objet. Au sens figuré : interrompre quelqu'un qui parle.",
          "Les deux sens sont identiques.",
          "Au sens propre : arrêter une machine. Au sens figuré : commencer une discussion.",
          "Au sens propre : couper les cheveux. Au sens figuré : se taire."
        ],
        answer: "Au sens propre : trancher avec un objet. Au sens figuré : interrompre quelqu'un qui parle.",
        feedback: "Couper la parole au sens figuré, c'est interrompre quelqu'un pendant qu'il parle, comme si on 'tranchait' son discours."
      },
      { id:"sens-propre-figure-n2-09",
        type: "mcq",
        instruction: "Quelle phrase utilise 'briller' au sens figuré ?",
        choices: [
          "Le soleil brille dans le ciel.",
          "Les étoiles brillent la nuit.",
          "Elle a brillé lors de l'examen.",
          "Le miroir brille de propreté."
        ],
        answer: "Elle a brillé lors de l'examen.",
        feedback: "Elle n'a pas émis de lumière : 'briller' signifie ici qu'elle a été excellente, remarquable. C'est le sens figuré."
      },
      { id:"sens-propre-figure-n2-10",
        type: "mcq",
        instruction: "Dans 'Cette histoire m'a glacé le sang', quel est le sens figuré de 'glacé' ?",
        choices: [
          "Refroidi avec de la glace",
          "Rempli d'une peur intense",
          "Rendu très froid au toucher",
          "Transformé en glaçon"
        ],
        answer: "Rempli d'une peur intense",
        feedback: "Le sang ne gèle pas réellement : cette expression signifie qu'on a ressenti une peur ou une horreur très forte. Sens figuré."
      }
    ],
    level3Bank: [
      { id:"sens-propre-figure-n3-01",
        type: "col-sort",
        instruction: "Classe ces expressions : sens propre ou sens figuré ?",
        colA: "Sens propre",
        colB: "Sens figuré",
        items: [
          {
            text: "Il bouillait d'impatience.",
            answer: "B",
            feedback: "On ne bout pas vraiment : c'est une image pour dire qu'on est très impatient. Sens figuré."
          },
          {
            text: "La casserole bout sur le feu.",
            answer: "A",
            feedback: "L'eau bout réellement à 100°C. Sens propre."
          },
          {
            text: "Ce livre m'a dévoré.",
            answer: "B",
            feedback: "Un livre ne dévore pas physiquement : cette image exprime qu'on était absorbé, captivé par la lecture. Sens figuré."
          },
          {
            text: "Le lion a dévoré sa proie.",
            answer: "A",
            feedback: "Le lion mange vraiment sa proie. Sens propre, action concrète."
          },
          {
            text: "Elle portait un lourd fardeau.",
            answer: "A",
            feedback: "Un fardeau est un vrai poids ici (un sac, un paquet lourd). Sens propre. (Il peut aussi être figuré selon le contexte.)"
          }
        ],
        feedback: "Le sens figuré transforme une action physique en image abstraite : bouillir (chaleur physique → intensité des émotions)."
      },
      { id:"sens-propre-figure-n3-02",
        type: "mcq",
        instruction: "Dans un poème, le poète écrit : 'L'aurore aux doigts de rose ouvre les portes du ciel.' Quelle figure de style utilise-t-il ?",
        choices: [
          "Un sens propre (le soleil a vraiment des doigts)",
          "Une métaphore (image qui associe l'aurore à une personne aux doigts rosés)",
          "Un antonyme (l'aurore est le contraire du soir)",
          "Un homonyme (aurore et erreur se ressemblent)"
        ],
        answer: "Une métaphore (image qui associe l'aurore à une personne aux doigts rosés)",
        feedback: "L'aurore n'a pas vraiment de doigts. 'Aux doigts de rose' est une métaphore (sens figuré) qui compare la lumière orangée du lever de soleil à des doigts roses. C'est une image poétique célèbre (Homère)."
      },
      { id:"sens-propre-figure-n3-03",
        type: "mcq",
        instruction: "Expliquer le sens figuré de 'La discussion a dégénéré' : que veut dire 'dégénérer' ici ?",
        choices: [
          "La discussion s'est améliorée",
          "La discussion a pris une mauvaise tournure, est devenue violente ou agressive",
          "La discussion a duré très longtemps",
          "La discussion a été enregistrée"
        ],
        answer: "La discussion a pris une mauvaise tournure, est devenue violente ou agressive",
        feedback: "Au sens propre, dégénérer = perdre ses qualités génétiques. Au sens figuré, une situation 'dégénère' quand elle se dégrade, se détériore et devient violente ou problématique."
      },
      { id:"sens-propre-figure-n3-04",
        type: "mcq",
        instruction: "Quel énoncé résume le mieux la relation entre sens propre et sens figuré ?",
        choices: [
          "Le sens figuré est toujours plus important que le sens propre.",
          "Le sens figuré naît souvent d'une image tirée du sens propre : on transfère l'idée concrète vers l'abstrait.",
          "Le sens propre et le sens figuré n'ont aucun rapport entre eux.",
          "Le sens figuré est une erreur de langue à corriger."
        ],
        answer: "Le sens figuré naît souvent d'une image tirée du sens propre : on transfère l'idée concrète vers l'abstrait.",
        feedback: "C'est l'essence de la métaphore : on prend une expérience concrète (tomber, brûler, peser) et on l'applique à une réalité abstraite (tomber amoureux, brûler de désir, peser sur la conscience)."
      },
      { id:"sens-propre-figure-n3-05",
        type: "mcq",
        instruction: "Lequel de ces titres utilise un mot au sens figuré ?",
        choices: [
          "La rivière aux crocodiles",
          "Les dents de la mer",
          "Le chien et le chat",
          "Une journée à la montagne"
        ],
        answer: "Les dents de la mer",
        feedback: "'Les dents de la mer' (titre du film de Spielberg) utilise 'dents' au sens figuré : les rochers tranchants ou les vagues évoquent des dents menaçantes. La mer n'a pas de dents littéralement."
      },
      { id:"sens-propre-figure-n3-06",
        type: "col-sort",
        instruction: "Classe ces expressions : sens propre ou sens figuré ?",
        colA: "Sens propre",
        colB: "Sens figuré",
        items: [
          { text: "Le temps dévore les civilisations.", answer: "B", feedback: "Le temps ne mange pas littéralement : cette image signifie qu'il détruit, efface progressivement. Sens figuré." },
          { text: "Le termite dévore la charpente.", answer: "A", feedback: "Le termite mange réellement le bois. Sens propre." },
          { text: "Son regard perçait l'obscurité.", answer: "B", feedback: "Le regard ne transperce pas physiquement comme une lame : il distinguait malgré le noir. Sens figuré." },
          { text: "La lance a percé le bouclier.", answer: "A", feedback: "La lance a réellement traversé le bouclier. Sens propre." },
          { text: "Le temps guérit toutes les blessures.", answer: "B", feedback: "Le temps ne soigne pas physiquement une plaie : cette image signifie qu'il atténue la douleur morale. Sens figuré." }
        ],
        feedback: "Les verbes d'action concrète (dévorer, percer, guérir) sont souvent employés au figuré pour intensifier une idée abstraite."
      },
      { id:"sens-propre-figure-n3-07",
        type: "mcq",
        instruction: "Dans l'expression 'Le vaisseau de l'État vogue sur une mer démontée', quelle figure de style désigne l'État ?",
        choices: [
          "Une comparaison explicite avec 'comme'",
          "Une métaphore filée (l'État comparé à un navire en pleine tempête)",
          "Un sens propre (l'État possède réellement un bateau)",
          "Une antonymie"
        ],
        answer: "Une métaphore filée (l'État comparé à un navire en pleine tempête)",
        feedback: "L'État n'est pas un vrai bateau : cette image classique compare le gouvernement d'un pays à un navire qui doit traverser des difficultés (la tempête). C'est une métaphore filée."
      },
      { id:"sens-propre-figure-n3-08",
        type: "mcq",
        instruction: "Expliquer le sens figuré de 'Son argument ne tient pas debout' : que signifie cette expression ?",
        choices: [
          "L'argument est physiquement instable",
          "L'argument est incohérent, mal fondé",
          "L'argument est très long",
          "L'argument a été noté par écrit"
        ],
        answer: "L'argument est incohérent, mal fondé",
        feedback: "Un argument ne 'tient' pas debout comme une personne : l'image signifie qu'il est mal construit, incohérent, qu'il s'effondre dès qu'on l'examine."
      },
      { id:"sens-propre-figure-n3-09",
        type: "mcq",
        instruction: "Pourquoi les auteurs emploient-ils souvent des verbes de mouvement concret (couler, s'effondrer, exploser) au sens figuré pour parler des émotions ?",
        choices: [
          "Parce que ces verbes n'ont pas d'autre usage possible",
          "Parce que l'image physique rend une émotion abstraite plus vive et plus facile à ressentir pour le lecteur",
          "Parce que ce sont des erreurs de langue courantes",
          "Parce que ces verbes sont plus courts à écrire"
        ],
        answer: "Parce que l'image physique rend une émotion abstraite plus vive et plus facile à ressentir pour le lecteur",
        feedback: "En empruntant des verbes d'action concrète, l'auteur donne une image sensible et forte à une émotion invisible, ce qui rend le texte plus vivant."
      },
      { id:"sens-propre-figure-n3-10",
        type: "mcq",
        instruction: "Lequel de ces titres utilise une expression au sens figuré ?",
        choices: [
          "Vingt mille lieues sous les mers",
          "Le Rouge et le Noir",
          "Le Tour du monde en 80 jours",
          "Les Trois Mousquetaires"
        ],
        answer: "Le Rouge et le Noir",
        feedback: "Dans le titre de Stendhal, le rouge et le noir ne désignent pas simplement des couleurs : ils symbolisent au sens figuré deux voies possibles pour le héros (l'armée et l'Église). Les autres titres décrivent des éléments au sens propre."
      }
    ]
  },

  "famille-de-mots": {
    title: "Identifier une famille de mots",
    domaine: "Français",
    competence: "Vocabulaire — Identifier une famille de mots",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître une famille de mots — radical commun évident",
      "2": "Familles plus subtiles et faux-amis de famille",
      "3": "Analyse fine et familles étymologiques"
    },
    level1Bank: [
      { id:"famille-de-mots-n1-01",
        type: "mcq",
        instruction: "Quel mot appartient à la famille de « chant » ?",
        choices: ["chanson", "château", "chance", "charme"],
        answer: "chanson",
        feedback: "Chanson vient du radical « chant ». Château, chance et charme ont une origine différente."
      },
      { id:"famille-de-mots-n1-02",
        type: "mcq",
        instruction: "Quel mot N'appartient PAS à la famille de « marcher » ?",
        choices: ["marcheur", "démarche", "marché", "marche"],
        answer: "marché",
        feedback: "Marché vient du latin « mercatus » (commerce), alors que marcheur, démarche et marche viennent tous du verbe marcher (aller à pied)."
      },
      { id:"famille-de-mots-n1-03",
        type: "match",
        instruction: "Associe chaque mot à un autre membre de sa famille.",
        pairs: [
          { left: "fleur", right: "fleuriste" },
          { left: "jardin", right: "jardinier" },
          { left: "pêche", right: "pêcheur" }
        ],
        feedback: "Fleuriste, jardinier et pêcheur sont formés à partir des radicaux fleur-, jardin- et pêch-."
      },
      { id:"famille-de-mots-n1-04",
        type: "mcq",
        instruction: "Quel groupe forme une famille de mots ?",
        choices: [
          "soleil, sol, solde",
          "chanter, chanteur, chanson, chant",
          "livre, libre, livrer",
          "maison, mais, mason"
        ],
        answer: "chanter, chanteur, chanson, chant",
        feedback: "Chanter, chanteur, chanson et chant partagent tous le radical « chant ». Les autres groupes mélangent des mots sans lien."
      },
      { id:"famille-de-mots-n1-05",
        type: "mcq",
        instruction: "Quel est le radical commun à « porteur », « portage » et « portable » ?",
        choices: ["port", "por", "porte", "portabl"],
        answer: "port",
        feedback: "Le radical « port- » est commun à tous ces mots : port-eur, port-age, port-able. Il vient du verbe porter."
      },
      { id:"famille-de-mots-n1-06",
        type: "mcq",
        instruction: "Quel mot appartient à la famille de « terre » ?",
        choices: ["terrain", "terrible", "sphère", "verre"],
        answer: "terrain",
        feedback: "Terrain vient du radical « terre ». Terrible et sphère n'ont aucun lien avec terre malgré une ressemblance de son."
      },
      { id:"famille-de-mots-n1-07",
        type: "mcq",
        instruction: "Quel mot N'appartient PAS à la famille de « lait » ?",
        choices: ["laitier", "laiterie", "allaiter", "laid"],
        answer: "laid",
        feedback: "Laid n'a aucun lien avec le lait, bien qu'il se prononce presque pareil. Laitier, laiterie et allaiter viennent tous du radical « lait »."
      },
      { id:"famille-de-mots-n1-08",
        type: "match",
        instruction: "Associe chaque mot à un autre membre de sa famille.",
        pairs: [
          { left: "vent", right: "venteux" },
          { left: "ferme", right: "fermier" },
          { left: "route", right: "routier" }
        ],
        feedback: "Venteux, fermier et routier sont formés à partir des radicaux vent-, ferm(e)- et rout(e)-."
      },
      { id:"famille-de-mots-n1-09",
        type: "mcq",
        instruction: "Quel groupe forme une famille de mots ?",
        choices: [
          "fumée, fumeur, enfumer, fumoir",
          "chaise, chose, choix, chou",
          "sale, salle, salaire, salade",
          "boule, boulanger, bouclier, boulon"
        ],
        answer: "fumée, fumeur, enfumer, fumoir",
        feedback: "Fumée, fumeur, enfumer et fumoir partagent le radical « fum- ». Les autres groupes ne sont que des ressemblances de son, sans lien de sens."
      },
      { id:"famille-de-mots-n1-10",
        type: "mcq",
        instruction: "Quel est le radical commun à « osseux », « ossature » et « désosser » ?",
        choices: ["os", "oss", "osse", "ossu"],
        answer: "os",
        feedback: "Le radical « os » (sous la forme « oss- ») est présent dans osseux, ossature et désosser. Tous ces mots sont liés à l'os."
      }
    ],
    level2Bank: [
      { id:"famille-de-mots-n2-01",
        type: "mcq",
        instruction: "Quel mot est un intrus dans la famille de « pied » ?",
        choices: ["piéton", "trépied", "piège", "piédestal"],
        answer: "piège",
        feedback: "Piège vient du latin « pedica » (entrave), un mot distinct. Piéton (qui va à pied), trépied (trois pieds) et piédestal partagent bien le radical de « pied »."
      },
      { id:"famille-de-mots-n2-02",
        type: "mcq",
        instruction: "Les mots « chaud », « chauffer » et « surchauffé » forment-ils une famille ?",
        choices: [
          "Oui, ils partagent le radical « chaud »",
          "Non, ils ont des sens différents",
          "Non, car surchauffé a un préfixe",
          "Non, chauffer vient d'un autre mot"
        ],
        answer: "Oui, ils partagent le radical « chaud »",
        feedback: "Oui ! « Chaud » est le radical commun. Chauffer = rendre chaud. Surchauffé = trop chauffé. Le préfixe « sur- » ne change pas la famille."
      },
      { id:"famille-de-mots-n2-03",
        type: "match",
        instruction: "Associe chaque mot à son dérivé de même famille.",
        pairs: [
          { left: "beau", right: "embellir" },
          { left: "fort", right: "fortifier" },
          { left: "grand", right: "agrandir" }
        ],
        feedback: "Embellir = rendre beau, fortifier = rendre fort, agrandir = rendre grand. Ces mots partagent le même radical."
      },
      { id:"famille-de-mots-n2-04",
        type: "mcq",
        instruction: "Pourquoi « dent » et « dentifrice » appartiennent-ils à la même famille ?",
        choices: [
          "Car ils riment",
          "Car dentifrice contient le radical « dent »",
          "Car ils ont le même nombre de syllabes",
          "Car ils commencent par la même lettre"
        ],
        answer: "Car dentifrice contient le radical « dent »",
        feedback: "Dentifrice = dent + latin « fricare » (frotter). Il contient bien le radical « dent ». Même famille que dentiste, dentition…"
      },
      { id:"famille-de-mots-n2-05",
        type: "mcq",
        instruction: "Parmi ces mots, lequel est de la famille de « lire » ?",
        choices: ["lilas", "lisible", "lime", "lion"],
        answer: "lisible",
        feedback: "Lisible = que l'on peut lire. Il contient le radical « lis- » (variante de « lir- »). Lilas, lime et lion n'ont aucun lien avec la lecture."
      },
      { id:"famille-de-mots-n2-06",
        type: "mcq",
        instruction: "Quel mot est un intrus dans la famille de « voix » ?",
        choices: ["vocal", "voisin", "convoquer", "vocabulaire"],
        answer: "voisin",
        feedback: "Voisin vient du latin « vicinus » (proche), un mot sans lien avec la voix. Vocal, convoquer et vocabulaire viennent tous du latin « vox/vocis » (la voix)."
      },
      { id:"famille-de-mots-n2-07",
        type: "mcq",
        instruction: "Les mots « clair », « éclaircir » et « clairvoyant » forment-ils une famille ?",
        choices: [
          "Oui, ils partagent le radical « clair »",
          "Non, ils ont des sens différents",
          "Non, car éclaircir a un préfixe",
          "Non, clairvoyant est un mot composé donc à part"
        ],
        answer: "Oui, ils partagent le radical « clair »",
        feedback: "Oui ! « Clair » est le radical commun. Éclaircir = rendre clair. Clairvoyant = qui voit clair(ement)."
      },
      { id:"famille-de-mots-n2-08",
        type: "match",
        instruction: "Associe chaque mot à son dérivé de même famille.",
        pairs: [
          { left: "doux", right: "adoucir" },
          { left: "riche", right: "enrichir" },
          { left: "large", right: "élargir" }
        ],
        feedback: "Adoucir = rendre doux, enrichir = rendre riche, élargir = rendre large. Ces mots partagent le même radical que l'adjectif de départ."
      },
      { id:"famille-de-mots-n2-09",
        type: "mcq",
        instruction: "Pourquoi « lune » et « lunette » appartiennent-ils à la même famille ?",
        choices: [
          "Car ils riment",
          "Car lunette contient le radical « lun » et évoque à l'origine la forme ronde de la lune",
          "Car ils ont le même nombre de syllabes",
          "Car ils commencent par la même lettre"
        ],
        answer: "Car lunette contient le radical « lun » et évoque à l'origine la forme ronde de la lune",
        feedback: "Lunette vient de « lune » : à l'origine, ce mot désignait un petit objet rond comme la lune. Même famille que lunaire, alunir…"
      },
      { id:"famille-de-mots-n2-10",
        type: "mcq",
        instruction: "Parmi ces mots, lequel est de la famille de « nombre » ?",
        choices: ["nombreux", "ombre", "nombril", "novembre"],
        answer: "nombreux",
        feedback: "Nombreux = qui contient un grand nombre, radical « nombr- ». Ombre, nombril et novembre n'ont aucun lien avec « nombre » malgré une ressemblance de son."
      }
    ],
    level3Bank: [
      { id:"famille-de-mots-n3-01",
        type: "mcq",
        instruction: "Les mots « main » et « manuel » appartiennent-ils à la même famille ?",
        choices: [
          "Non, ils sont trop différents",
          "Oui, tous deux viennent du latin « manus » (main)",
          "Non, manuel est un prénom",
          "Oui, car ils commencent par « m »"
        ],
        answer: "Oui, tous deux viennent du latin « manus » (main)",
        feedback: "Manuel (fait à la main) vient du latin « manualis », dérivé de « manus » (la main). C'est la même famille étymologique que « main »."
      },
      { id:"famille-de-mots-n3-02",
        type: "match",
        instruction: "Associe chaque mot savant (origine latine ou grecque) à son équivalent courant.",
        pairs: [
          { left: "pédestre", right: "pied" },
          { left: "aquatique", right: "eau" },
          { left: "solaire", right: "soleil" }
        ],
        feedback: "Pédestre (pes/pedis = pied), aquatique (aqua = eau), solaire (sol = soleil) : des mots savants de même famille que des mots courants."
      },
      { id:"famille-de-mots-n3-03",
        type: "col-sort",
        instruction: "Classe chaque mot dans sa famille : famille de « port » ou famille de « fort » ?",
        colA: "Famille de « port »",
        colB: "Famille de « fort »",
        items: [
          { text: "porteur", answer: "A", feedback: "Porteur vient de porter → radical port-." },
          { text: "fortement", answer: "B", feedback: "Fortement vient de fort → radical fort-." },
          { text: "portable", answer: "A", feedback: "Portable vient de porter → radical port-." },
          { text: "renforcer", answer: "B", feedback: "Renforcer contient le radical fort- (re-n-forcer)." },
          { text: "portail", answer: "A", feedback: "Portail vient de porte → même famille que port-." }
        ],
        feedback: "Port- (porter, portail, portable) et fort- (fortifier, renforcer, fortement) sont deux familles bien distinctes."
      },
      { id:"famille-de-mots-n3-04",
        type: "mcq",
        instruction: "Quel mot n'appartient PAS à la famille de « voir » ?",
        choices: ["prévoir", "voile", "revoir", "apercevoir"],
        answer: "voile",
        feedback: "Voile (tissu) n'a aucun lien avec le verbe voir. Prévoir = voir à l'avance, revoir = voir à nouveau, apercevoir = commencer à voir."
      },
      { id:"famille-de-mots-n3-05",
        type: "mcq",
        instruction: "Pourquoi « dentiste » et « trident » appartiennent-ils à la même famille ?",
        choices: [
          "Car ils riment",
          "Car tous deux contiennent le radical latin « dens/dentis » (dent)",
          "Car ce sont des mots récents",
          "Car ils désignent des outils"
        ],
        answer: "Car tous deux contiennent le radical latin « dens/dentis » (dent)",
        feedback: "Dentiste (qui soigne les dents) et trident (fourche à trois dents) partagent le radical latin « dens/dentis ». C'est une famille étymologique !"
      },
      { id:"famille-de-mots-n3-06",
        type: "mcq",
        instruction: "Les mots « cœur » et « courage » appartiennent-ils à la même famille ?",
        choices: [
          "Non, ils sont trop différents",
          "Oui, tous deux viennent du latin « cor/cordis » (le cœur)",
          "Non, courage est un mot abstrait",
          "Oui, car ils commencent par la même syllabe"
        ],
        answer: "Oui, tous deux viennent du latin « cor/cordis » (le cœur)",
        feedback: "Courage vient du latin « cor/cordis » (le cœur), siège symbolique du courage. Même famille étymologique que cœur, cordial, écœurer."
      },
      { id:"famille-de-mots-n3-07",
        type: "match",
        instruction: "Associe chaque mot savant (origine latine) à son équivalent courant.",
        pairs: [
          { left: "nocturne", right: "nuit" },
          { left: "capillaire", right: "cheveu" },
          { left: "lacté", right: "lait" }
        ],
        feedback: "Nocturne (nox/noctis = nuit), capillaire (capillus = cheveu), lacté (lac/lactis = lait) : des mots savants issus du latin, de même famille que des mots courants."
      },
      { id:"famille-de-mots-n3-08",
        type: "col-sort",
        instruction: "Classe chaque mot selon le sens de son radical grec : « écrire » ou « son » ?",
        colA: "Famille de « -graphe/-graphie » (écrire)",
        colB: "Famille de « -phone » (son)",
        items: [
          { text: "orthographe", answer: "A", feedback: "Orthographe contient -graphe, du grec « graphein » (écrire)." },
          { text: "microphone", answer: "B", feedback: "Microphone contient -phone, du grec « phônê » (le son)." },
          { text: "calligraphie", answer: "A", feedback: "Calligraphie = belle écriture, du grec « graphein »." },
          { text: "téléphone", answer: "B", feedback: "Téléphone = son de loin, du grec « phônê »." },
          { text: "biographie", answer: "A", feedback: "Biographie = écriture d'une vie, du grec « graphein »." }
        ],
        feedback: "-graphe/-graphie (écrire) et -phone (son) sont deux familles savantes très productives en français."
      },
      { id:"famille-de-mots-n3-09",
        type: "mcq",
        instruction: "Quel mot n'appartient PAS à la famille étymologique de « chronomètre » (temps) ?",
        choices: ["chronologie", "synchronisation", "chronique (récit)", "chrome"],
        answer: "chrome",
        feedback: "Chrome vient du grec « khrôma » (couleur), sans lien avec le temps. Chronologie, synchronisation et chronique viennent du grec « khronos » (le temps)."
      },
      { id:"famille-de-mots-n3-10",
        type: "mcq",
        instruction: "Pourquoi « biologie » et « symbiose » appartiennent-ils à la même famille étymologique ?",
        choices: [
          "Car ils riment",
          "Car tous deux contiennent le radical grec « bios » (la vie)",
          "Car ce sont des mots récents",
          "Car ils désignent des sciences"
        ],
        answer: "Car tous deux contiennent le radical grec « bios » (la vie)",
        feedback: "Biologie (étude de la vie) et symbiose (vivre ensemble) partagent le radical grec « bios ». C'est une famille étymologique, comme dentiste/trident avec « dens/dentis »."
      }
    ]
  },

  "identifier-radical": {
    title: "Identifier le radical d'un mot",
    domaine: "Français",
    competence: "Vocabulaire — Identifier le radical d'un mot",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Trouver le radical — mots simples",
      "2": "Radical moins évident — changements d'orthographe",
      "3": "Radicaux latins et grecs — familles étymologiques"
    },
    level1Bank: [
      { id:"identifier-radical-n1-01",
        type: "mcq",
        instruction: "Quel est le radical du mot « chanteur » ?",
        choices: ["chant", "-eur", "chanteuse", "chante"],
        answer: "chant",
        feedback: "Chant-eur : le radical est « chant ». Le suffixe « -eur » indique une personne qui fait l'action."
      },
      { id:"identifier-radical-n1-02",
        type: "mcq",
        instruction: "Quel est le radical commun à « jardiner », « jardinier » et « jardinage » ?",
        choices: ["jardin", "jar", "jardinage", "jardiner"],
        answer: "jardin",
        feedback: "Le radical commun est « jardin ». Tous ces mots parlent du jardin et de ce qui lui est lié."
      },
      { id:"identifier-radical-n1-03",
        type: "match",
        instruction: "Associe chaque mot à son radical.",
        pairs: [
          { left: "marcheur", right: "march-" },
          { left: "danseur", right: "dans-" },
          { left: "vendeur", right: "vend-" }
        ],
        feedback: "March-eur, dans-eur, vend-eur : le suffixe « -eur » s'ajoute au radical pour désigner celui qui fait l'action."
      },
      { id:"identifier-radical-n1-04",
        type: "mcq",
        instruction: "Le radical d'un mot, c'est…",
        choices: [
          "La dernière syllabe du mot",
          "La partie du mot qui porte le sens principal",
          "La lettre majuscule du mot",
          "Le premier mot du dictionnaire"
        ],
        answer: "La partie du mot qui porte le sens principal",
        feedback: "Le radical est la partie centrale du mot qui en porte le sens. Les préfixes et suffixes viennent s'y ajouter."
      },
      { id:"identifier-radical-n1-05",
        type: "mcq",
        instruction: "Quel est le radical du mot « fleuriste » ?",
        choices: ["fleur", "florist", "fleurist", "-iste"],
        answer: "fleur",
        feedback: "Fleur-iste : le radical est « fleur ». Le suffixe « -iste » désigne un métier ou une spécialité."
      },
      { id:"identifier-radical-n1-06",
        type: "mcq",
        instruction: "Quel est le radical du mot « laitier » ?",
        choices: ["lait", "laitue", "laiterie", "laitage"],
        answer: "lait",
        feedback: "Lait-ier : le radical est « lait ». Le suffixe « -ier » indique souvent un métier."
      },
      { id:"identifier-radical-n1-07",
        type: "mcq",
        instruction: "Quel est le radical commun à « chocolatier », « chocolaterie » et « chocolaté » ?",
        choices: ["chocolat", "choc", "chocolate", "chocolatier"],
        answer: "chocolat",
        feedback: "Le radical commun est « chocolat ». Chocolatier, chocolaterie et chocolaté sont tous liés au chocolat."
      },
      { id:"identifier-radical-n1-08",
        type: "match",
        instruction: "Associe chaque mot à son radical.",
        pairs: [
          { left: "nageur", right: "nag-" },
          { left: "coureur", right: "cour-" },
          { left: "joueur", right: "jou-" }
        ],
        feedback: "Nag-eur, cour-eur, jou-eur : le suffixe « -eur » s'ajoute au radical pour désigner celui qui fait l'action."
      },
      { id:"identifier-radical-n1-09",
        type: "mcq",
        instruction: "Quel est le radical du mot « poissonnier » ?",
        choices: ["poisson", "poissonn", "poissonnier", "-nier"],
        answer: "poisson",
        feedback: "Poisson-nier : le radical est « poisson ». Le suffixe « -nier » désigne un métier lié au commerce."
      },
      { id:"identifier-radical-n1-10",
        type: "mcq",
        instruction: "Quel est le radical du mot « dentiste » ?",
        choices: ["dent", "dentist", "-iste", "dentier"],
        answer: "dent",
        feedback: "Dent-iste : le radical est « dent ». Le suffixe « -iste » désigne souvent une profession ou une spécialité."
      }
    ],
    level2Bank: [
      { id:"identifier-radical-n2-01",
        type: "mcq",
        instruction: "Quel est le radical du mot « invisible » ?",
        choices: ["in-", "vis", "visible", "-ible"],
        answer: "vis",
        feedback: "Invisible = in- (non) + vis (voir) + -ible (que l'on peut). Le radical « vis- » vient du latin « videre » (voir)."
      },
      { id:"identifier-radical-n2-02",
        type: "mcq",
        instruction: "Quel est le radical du mot « agrandissement » ?",
        choices: ["a-", "grand", "-issement", "agrand"],
        answer: "grand",
        feedback: "A-grand-issement : « a- » est un préfixe, « grand » est le radical, « -issement » est le suffixe. Ce mot signifie « rendre plus grand »."
      },
      { id:"identifier-radical-n2-03",
        type: "match",
        instruction: "Associe chaque mot à son radical (attention aux petits changements de forme).",
        pairs: [
          { left: "raccourcir", right: "court" },
          { left: "alléger", right: "léger" },
          { left: "noircir", right: "noir" }
        ],
        feedback: "Raccourc-ir (court), allég-er (léger), noire-ir (noir) : le radical peut légèrement changer de forme."
      },
      { id:"identifier-radical-n2-04",
        type: "mcq",
        instruction: "Quel radical partagent « boulanger », « boulangerie » et « boulangère » ?",
        choices: ["boulangi", "boulanger", "boulang", "boul"],
        answer: "boulang",
        feedback: "Le radical commun est « boulang- ». Il vient de l'ancien français « boulange » (action de faire le pain)."
      },
      { id:"identifier-radical-n2-05",
        type: "mcq",
        instruction: "Quel est le radical du mot « malheureux » ?",
        choices: ["mal-", "heureux", "heur", "-eux"],
        answer: "heur",
        feedback: "Mal-heur-eux : « mal- » est le préfixe, « heur » est le radical (ancien mot pour « chance, destin »), « -eux » est le suffixe."
      },
      { id:"identifier-radical-n2-06",
        type: "mcq",
        instruction: "Quel est le radical du mot « éclaircir » ?",
        choices: ["clair", "éclair", "clairc", "-cir"],
        answer: "clair",
        feedback: "É-clairc-ir : le radical est « clair », légèrement modifié par l'ajout du suffixe verbal. Éclaircir signifie « rendre plus clair »."
      },
      { id:"identifier-radical-n2-07",
        type: "mcq",
        instruction: "Quel est le radical du mot « embellissement » ?",
        choices: ["em-", "bell", "-issement", "embell"],
        answer: "bell",
        feedback: "Em-bell-issement : « em- » est un préfixe, « bell » est le radical (qui vient de « beau/belle »), « -issement » est le suffixe. Ce mot signifie « rendre plus beau »."
      },
      { id:"identifier-radical-n2-08",
        type: "match",
        instruction: "Associe chaque mot à son radical (attention aux petits changements de forme).",
        pairs: [
          { left: "blanchir", right: "blanc" },
          { left: "épaissir", right: "épais" },
          { left: "verdir", right: "vert" }
        ],
        feedback: "Blanch-ir (blanc), épaiss-ir (épais), verd-ir (vert) : le radical change légèrement de forme à l'oral et à l'écrit."
      },
      { id:"identifier-radical-n2-09",
        type: "mcq",
        instruction: "Quel radical partagent « pâtissier », « pâtisserie » et « pâtissière » ?",
        choices: ["pâtiss", "pât", "pâte", "pâtisseri"],
        answer: "pâtiss",
        feedback: "Le radical commun est « pâtiss- ». Il vient du mot « pâte », avec un léger changement orthographique."
      },
      { id:"identifier-radical-n2-10",
        type: "mcq",
        instruction: "Quel est le radical du mot « infortuné » ?",
        choices: ["in-", "fortun", "fortuné", "-é"],
        answer: "fortun",
        feedback: "In-fortun-é : « in- » est le préfixe (négation), « fortun » est le radical (vient de « fortune », la chance), « -é » est le suffixe."
      }
    ],
    level3Bank: [
      { id:"identifier-radical-n3-01",
        type: "mcq",
        instruction: "Quel est le radical commun à « portable », « transport » et « importation » ?",
        choices: ["port", "trans", "-able", "import"],
        answer: "port",
        feedback: "Le radical « port- » vient du latin « portare » (porter). On le retrouve dans portable, transport (porter d'un lieu à l'autre), importation."
      },
      { id:"identifier-radical-n3-02",
        type: "col-sort",
        instruction: "Classe chaque mot selon son radical : radical « vis/voir » ou radical « aud/entendre » ?",
        colA: "Radical « vis » (voir)",
        colB: "Radical « aud » (entendre)",
        items: [
          { text: "visible", answer: "A", feedback: "Visible vient du latin « visus » (vu). Radical vis-." },
          {
            text: "audition",
            answer: "B",
            feedback: "Audition vient du latin « audire » (entendre). Radical aud-."
          },
          { text: "visuel", answer: "A", feedback: "Visuel = qui concerne la vision. Radical vis-." },
          {
            text: "inaudible",
            answer: "B",
            feedback: "Inaudible = qu'on ne peut pas entendre. Radical aud-."
          },
          { text: "invisible", answer: "A", feedback: "Invisible = qu'on ne peut pas voir. Radical vis-." }
        ],
        feedback: "Vis- (visuel, visible, invisible) vient du latin « videre » (voir). Aud- (audition, inaudible) vient de « audire » (entendre)."
      },
      { id:"identifier-radical-n3-03",
        type: "mcq",
        instruction: "Dans « biologie », « zoologie » et « psychologie », quel est le radical grec commun ?",
        choices: ["-logie", "bio", "zoo", "psycho"],
        answer: "-logie",
        feedback: "Le radical grec « logos » (étude, discours) donne le suffixe « -logie ». Biologie = étude du vivant, zoologie = étude des animaux."
      },
      { id:"identifier-radical-n3-04",
        type: "mcq",
        instruction: "Quel est le radical commun à « lumineux », « illuminer » et « luminosité » ?",
        choices: ["lumin", "lum", "illumin", "luminosit"],
        answer: "lumin",
        feedback: "Le radical « lumin- » vient du latin « lumen » (lumière). On le retrouve dans lumineux, illuminer, luminosité."
      },
      { id:"identifier-radical-n3-05",
        type: "match",
        instruction: "Associe chaque radical latin à sa signification.",
        pairs: [{ left: "aqua-", right: "eau" }, { left: "terr-", right: "terre" }, { left: "igni-", right: "feu" }],
        feedback: "Aqua- (aquarium, aquatique), terr- (territoire, terrain), igni- (igné, ignifugé) sont des radicaux latins courants."
      },
      { id:"identifier-radical-n3-06",
        type: "mcq",
        instruction: "Quel est le radical latin commun à « capable », « capture » et « captif » ?",
        choices: ["capt", "able", "ure", "if"],
        answer: "capt",
        feedback: "Le radical latin « capt- » (parfois « cap- ») vient de « capere » (prendre, saisir). Capable = qui peut prendre/comprendre, capture = action de prendre, captif = qui est pris."
      },
      { id:"identifier-radical-n3-07",
        type: "col-sort",
        instruction: "Classe chaque mot selon son radical : radical « scrip » (écrire) ou radical « phon » (son) ?",
        colA: "Radical « scrip » (écrire)",
        colB: "Radical « phon » (son)",
        items: [
          { text: "inscription", answer: "A", feedback: "Inscription vient du latin « scribere » (écrire). Radical scrip-." },
          { text: "téléphone", answer: "B", feedback: "Téléphone vient du grec « phônê » (son, voix). Radical phon-." },
          { text: "manuscrit", answer: "A", feedback: "Manuscrit = écrit à la main. Radical scrip/script-." },
          { text: "symphonie", answer: "B", feedback: "Symphonie = accord de sons. Radical phon-." },
          { text: "description", answer: "A", feedback: "Description vient de « describere » (décrire). Radical scrip-." }
        ],
        feedback: "Scrip/script- (inscription, manuscrit, description) vient du latin « scribere » (écrire). Phon- (téléphone, symphonie) vient du grec « phônê » (son)."
      },
      { id:"identifier-radical-n3-08",
        type: "mcq",
        instruction: "Quel radical grec signifie « chaleur » dans « thermomètre », « thermal » et « hypothermie » ?",
        choices: ["therm", "mètre", "hypo", "thermomètre"],
        answer: "therm",
        feedback: "Le radical grec « thermos » (chaud) donne « therm- ». Thermomètre mesure la chaleur, thermal se dit d'une source chaude, hypothermie = température corporelle trop basse."
      },
      { id:"identifier-radical-n3-09",
        type: "mcq",
        instruction: "Quel est le radical commun à « manuel », « manœuvre » et « manufacture » ?",
        choices: ["man", "oeuvre", "facture", "uel"],
        answer: "man",
        feedback: "Le radical latin « man- » (manus = la main) est présent dans manuel (fait à la main), manœuvre (travail manuel) et manufacture (fabrication à la main à l'origine)."
      },
      { id:"identifier-radical-n3-10",
        type: "match",
        instruction: "Associe chaque radical grec à sa signification.",
        pairs: [
          { left: "chrono-", right: "temps" },
          { left: "path-", right: "maladie / sentiment" },
          { left: "astro-", right: "étoile" }
        ],
        feedback: "Chrono- (chronomètre) vient du grec « khronos » (temps). Path- (pathologie) vient de « pathos » (souffrance, sentiment). Astro- (astronomie) vient de « astron » (étoile)."
      }
    ]
  },

  "identifier-prefixe": {
    title: "Identifier un préfixe",
    domaine: "Français",
    competence: "Vocabulaire — Identifier un préfixe",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître les préfixes courants",
      "2": "Utiliser les préfixes pour comprendre et former des mots",
      "3": "Préfixes savants d'origine latine et grecque"
    },
    level1Bank: [
      { id:"identifier-prefixe-n1-01",
        type: "mcq",
        instruction: "Quel est le préfixe dans le mot « déplacer » ?",
        choices: ["dé-", "place", "-er", "dép"],
        answer: "dé-",
        feedback: "Dé-placer : « dé- » est le préfixe. Il signifie « contraire de » ou « action inverse ». Dé-placer = ne plus être à sa place."
      },
      { id:"identifier-prefixe-n1-02",
        type: "mcq",
        instruction: "Que signifie le préfixe « re- » dans « recommencer » ?",
        choices: ["avant", "après", "à nouveau", "sans"],
        answer: "à nouveau",
        feedback: "« Re- » indique la répétition. Recommencer = commencer à nouveau. On retrouve re- dans refaire, relire, revoir…"
      },
      { id:"identifier-prefixe-n1-03",
        type: "match",
        instruction: "Associe chaque préfixe à sa signification.",
        pairs: [
          { left: "im- (impossible)", right: "contraire / non" },
          { left: "pré- (prévoir)", right: "avant" },
          { left: "sur- (surpuissant)", right: "au-dessus / en plus" }
        ],
        feedback: "Im- (non), pré- (avant), sur- (au-dessus) sont des préfixes très courants en français."
      },
      { id:"identifier-prefixe-n1-04",
        type: "mcq",
        instruction: "Quel mot contient un préfixe ?",
        choices: ["maison", "soleil", "désordre", "jardin"],
        answer: "désordre",
        feedback: "Désordre = dés- (préfixe = contraire) + ordre. Maison, soleil et jardin n'ont pas de préfixe."
      },
      { id:"identifier-prefixe-n1-05",
        type: "mcq",
        instruction: "Quel préfixe faut-il ajouter à « heureux » pour former son contraire ?",
        choices: ["re-", "mal-", "pré-", "sur-"],
        answer: "mal-",
        feedback: "Malheureux = mal- + heureux. Le préfixe « mal- » exprime une idée négative ou mauvaise."
      },
      { id:"identifier-prefixe-n1-06",
        type: "mcq",
        instruction: "Quel est le préfixe dans le mot « redire » ?",
        choices: ["re-", "dire", "-ire", "redi"],
        answer: "re-",
        feedback: "Re-dire : « re- » est le préfixe, il indique la répétition. Redire = dire à nouveau, répéter."
      },
      { id:"identifier-prefixe-n1-07",
        type: "mcq",
        instruction: "Que signifie le préfixe « in- » dans « inutile » ?",
        choices: ["avant", "après", "non / sans", "à nouveau"],
        answer: "non / sans",
        feedback: "« In- » exprime la négation. Inutile = qui n'est pas utile, sans utilité."
      },
      { id:"identifier-prefixe-n1-08",
        type: "match",
        instruction: "Associe chaque préfixe à sa signification.",
        pairs: [
          { left: "dé- (défaire)", right: "contraire / action inverse" },
          { left: "re- (repartir)", right: "à nouveau" },
          { left: "mal- (malchance)", right: "mauvais / négatif" }
        ],
        feedback: "Dé- (contraire), re- (à nouveau) et mal- (mauvais) sont des préfixes très courants en français."
      },
      { id:"identifier-prefixe-n1-09",
        type: "mcq",
        instruction: "Quel mot contient un préfixe ?",
        choices: ["fenêtre", "revoir", "tableau", "voiture"],
        answer: "revoir",
        feedback: "Revoir = re- (préfixe = répétition) + voir. Fenêtre, tableau et voiture n'ont pas de préfixe."
      },
      { id:"identifier-prefixe-n1-10",
        type: "mcq",
        instruction: "Quel préfixe trouve-t-on dans « prévenir » et que signifie-t-il ?",
        choices: ["pré- = avant", "pré- = après", "pré- = contre", "pré- = beaucoup"],
        answer: "pré- = avant",
        feedback: "Prévenir = pré- (avant) + venir : informer à l'avance. Le préfixe pré- indique l'antériorité."
      }
    ],
    level2Bank: [
      { id:"identifier-prefixe-n2-01",
        type: "mcq",
        instruction: "Que signifie le préfixe « anti- » dans « antiviolence » ?",
        choices: ["avant", "contre", "à nouveau", "sans"],
        answer: "contre",
        feedback: "Anti- vient du grec et signifie « contre ». Antiviolence = contre la violence. Aussi : antibiotique, antidote…"
      },
      { id:"identifier-prefixe-n2-02",
        type: "mcq",
        instruction: "Le préfixe « inter- » dans « intercontinental » signifie…",
        choices: ["à l'intérieur", "entre", "au-delà", "contre"],
        answer: "entre",
        feedback: "Inter- (du latin « inter ») signifie « entre ». Intercontinental = entre les continents. Aussi : international, interclasse, interagir."
      },
      { id:"identifier-prefixe-n2-03",
        type: "col-sort",
        instruction: "Classe chaque mot selon le sens de son préfixe.",
        colA: "Répétition (re-)",
        colB: "Contraire (dé-/mal-)",
        items: [
          { text: "refaire", answer: "A", feedback: "Refaire = faire à nouveau. Préfixe re- = répétition." },
          { text: "malhonnête", answer: "B", feedback: "Malhonnête = non honnête. Préfixe mal- = contraire." },
          { text: "relire", answer: "A", feedback: "Relire = lire à nouveau. Préfixe re- = répétition." },
          {
            text: "décoller",
            answer: "B",
            feedback: "Décoller = séparer ce qui était collé. Préfixe dé- = action inverse."
          },
          { text: "revenir", answer: "A", feedback: "Revenir = venir à nouveau. Préfixe re- = répétition." }
        ],
        feedback: "Re- exprime la répétition (refaire, relire, revenir). Dé- et mal- expriment le contraire ou l'action inverse."
      },
      { id:"identifier-prefixe-n2-04",
        type: "mcq",
        instruction: "Quel préfixe donne à « possible » son contraire ?",
        choices: ["dé-", "im-", "re-", "sur-"],
        answer: "im-",
        feedback: "Impossible = im- + possible. Im- (variante de in- devant p, b, m) exprime la négation."
      },
      { id:"identifier-prefixe-n2-05",
        type: "mcq",
        instruction: "Que signifie le préfixe « bi- » dans « bilingue » ?",
        choices: ["sans", "deux", "entre", "beaucoup"],
        answer: "deux",
        feedback: "Bi- vient du latin « bis » (deux fois). Bilingue = qui parle deux langues. Aussi : bicyclette (deux roues), bimensuel (deux fois par mois)."
      },
      { id:"identifier-prefixe-n2-06",
        type: "mcq",
        instruction: "Que signifie le préfixe « co- » dans « coéquipier » ?",
        choices: ["contre", "avec / ensemble", "avant", "au-delà"],
        answer: "avec / ensemble",
        feedback: "Co- (du latin « cum », avec) signifie « ensemble ». Coéquipier = personne qui joue avec toi dans la même équipe. Aussi : cohabiter, coexister."
      },
      { id:"identifier-prefixe-n2-07",
        type: "mcq",
        instruction: "Le préfixe « sous- » dans « sous-marin » signifie…",
        choices: ["au-dessus", "sous, en dessous de", "entre", "contre"],
        answer: "sous, en dessous de",
        feedback: "Sous- indique une position inférieure. Sous-marin = qui est sous la mer. Aussi : sous-sol, souterrain."
      },
      { id:"identifier-prefixe-n2-08",
        type: "col-sort",
        instruction: "Classe chaque mot selon le sens de son préfixe.",
        colA: "Ensemble (co-/con-)",
        colB: "Contre (contre-)",
        items: [
          { text: "collaborer", answer: "A", feedback: "Collaborer = travailler ensemble (col- = variante de co-)." },
          { text: "contrecarrer", answer: "B", feedback: "Contrecarrer = agir contre un projet." },
          { text: "connexion", answer: "A", feedback: "Connexion = action de relier ensemble (con- = avec)." },
          { text: "contrepoison", answer: "B", feedback: "Contrepoison = substance qui agit contre un poison." },
          { text: "conjuguer", answer: "A", feedback: "Conjuguer = joindre ensemble (con- = avec)." }
        ],
        feedback: "Co-/con- exprime l'idée d'ensemble, tandis que contre- exprime l'opposition."
      },
      { id:"identifier-prefixe-n2-09",
        type: "mcq",
        instruction: "Quel préfixe donne à « légal » son contraire ?",
        choices: ["il-", "re-", "co-", "sous-"],
        answer: "il-",
        feedback: "Illégal = il- + légal. Il- est une variante de in- devant la lettre l, exprimant la négation."
      },
      { id:"identifier-prefixe-n2-10",
        type: "mcq",
        instruction: "Que signifie le préfixe « tri- » dans « tricycle » ?",
        choices: ["un", "deux", "trois", "quatre"],
        answer: "trois",
        feedback: "Tri- vient du latin/grec « tri » (trois). Tricycle = véhicule à trois roues. Aussi : triangle, trimestre."
      }
    ],
    level3Bank: [
      { id:"identifier-prefixe-n3-01",
        type: "mcq",
        instruction: "Quel préfixe grec signifiant « loin » retrouve-t-on dans « téléphone », « télévision » et « télécommunication » ?",
        choices: ["télé-", "téléph-", "tél-", "phon-"],
        answer: "télé-",
        feedback: "Télé- vient du grec « têle » (loin). Téléphone = voix de loin, télévision = vision de loin, télécommunication = communication à distance."
      },
      { id:"identifier-prefixe-n3-02",
        type: "match",
        instruction: "Associe chaque préfixe savant à sa signification.",
        pairs: [
          { left: "micro-", right: "petit" },
          { left: "macro-", right: "grand" },
          { left: "poly-", right: "plusieurs" }
        ],
        feedback: "Micro- (microbe, microscope), macro- (macroéconomie, macrocosme), poly- (polygone, polyglotte) sont des préfixes d'origine grecque."
      },
      { id:"identifier-prefixe-n3-03",
        type: "mcq",
        instruction: "Dans « hypothèse », quel préfixe grec signifie « sous, en dessous » ?",
        choices: ["hyp-", "hypo-", "hyper-", "hé-"],
        answer: "hypo-",
        feedback: "Hypo- (du grec « hupo ») signifie « sous, en dessous ». Hypo-thèse = ce qui est posé en dessous (comme base). À ne pas confondre avec hyper- (au-dessus, excessif)."
      },
      { id:"identifier-prefixe-n3-04",
        type: "col-sort",
        instruction: "Classe chaque mot selon le sens de son préfixe : « au-delà / trop » ou « en dessous / pas assez » ?",
        colA: "Au-delà / trop (hyper-, sur-, ultra-)",
        colB: "En dessous / pas assez (hypo-, sous-, infra-)",
        items: [
          { text: "surchargé", answer: "A", feedback: "Sur- = au-delà. Surchargé = trop chargé." },
          {
            text: "sous-estimé",
            answer: "B",
            feedback: "Sous- = en dessous. Sous-estimé = pas assez estimé."
          },
          { text: "hyperactif", answer: "A", feedback: "Hyper- = excessif. Hyperactif = trop actif." },
          {
            text: "infrastructure",
            answer: "B",
            feedback: "Infra- = en dessous. Infrastructure = la base, ce qui est en dessous."
          },
          {
            text: "ultra-rapide",
            answer: "A",
            feedback: "Ultra- = extrêmement. Ultra-rapide = très très rapide."
          }
        ],
        feedback: "Hyper-, sur-, ultra- expriment l'excès ou le dépassement. Hypo-, sous-, infra- expriment l'insuffisance ou ce qui est en dessous."
      },
      { id:"identifier-prefixe-n3-05",
        type: "mcq",
        instruction: "Le préfixe « anthropo- » (dans « anthropologie ») vient du grec et signifie…",
        choices: ["animal", "homme", "nature", "société"],
        answer: "homme",
        feedback: "Anthropo- vient du grec « anthrôpos » (être humain). Anthropologie = étude de l'être humain. On retrouve ce préfixe dans « philanthrope » (ami des hommes)."
      },
      { id:"identifier-prefixe-n3-06",
        type: "mcq",
        instruction: "Quel préfixe grec signifiant « seul » retrouve-t-on dans « monologue » et « monopole » ?",
        choices: ["mono-", "poly-", "mon-", "logue-"],
        answer: "mono-",
        feedback: "Mono- vient du grec « monos » (seul, unique). Monologue = discours d'une seule personne. Monopole = possession exclusive par un seul."
      },
      { id:"identifier-prefixe-n3-07",
        type: "match",
        instruction: "Associe chaque préfixe savant à sa signification.",
        pairs: [
          { left: "pan-", right: "tout / entier" },
          { left: "pseudo-", right: "faux" },
          { left: "omni-", right: "tout / partout" }
        ],
        feedback: "Pan- (pandémie), pseudo- (pseudonyme), omni- (omniprésent) sont des préfixes d'origine grecque ou latine."
      },
      { id:"identifier-prefixe-n3-08",
        type: "mcq",
        instruction: "Dans « rétrograde », quel préfixe latin signifie « en arrière » ?",
        choices: ["rétro-", "gra-", "ré-", "-grade"],
        answer: "rétro-",
        feedback: "Rétro- vient du latin « retro » (en arrière). Rétrograde = qui va en arrière. Aussi : rétroviseur, rétrospective."
      },
      { id:"identifier-prefixe-n3-09",
        type: "col-sort",
        instruction: "Classe chaque mot selon le sens de son préfixe : « autour » ou « à travers » ?",
        colA: "Autour (circon-, péri-)",
        colB: "À travers (trans-)",
        items: [
          { text: "circonférence", answer: "A", feedback: "Circon- = autour. Circonférence = ligne autour d'un cercle." },
          { text: "transparent", answer: "B", feedback: "Trans- = à travers. Transparent = qu'on voit à travers." },
          { text: "périmètre", answer: "A", feedback: "Péri- = autour. Périmètre = mesure du tour d'une figure." },
          { text: "traverser", answer: "B", feedback: "Trans-/tra- = à travers. Traverser = passer à travers." },
          { text: "périphérique", answer: "A", feedback: "Péri- = autour. Périphérique = qui est autour d'un centre." }
        ],
        feedback: "Circon-/péri- (autour) et trans- (à travers) sont deux préfixes savants d'origine grecque et latine."
      },
      { id:"identifier-prefixe-n3-10",
        type: "mcq",
        instruction: "Le préfixe « xéno- » (dans « xénophobie ») vient du grec et signifie…",
        choices: ["ami", "étranger", "animal", "couleur"],
        answer: "étranger",
        feedback: "Xéno- vient du grec « xenos » (étranger). Xénophobie = peur/rejet de l'étranger. On retrouve ce préfixe dans « xénophile » (qui aime les cultures étrangères)."
      }
    ]
  },

  "identifier-suffixe": {
    title: "Identifier un suffixe",
    domaine: "Français",
    competence: "Vocabulaire — Identifier un suffixe",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître les suffixes courants",
      "2": "Suffixes et catégories grammaticales",
      "3": "Suffixes savants d'origine latine et grecque"
    },
    level1Bank: [
      { id:"identifier-suffixe-n1-01",
        type: "mcq",
        instruction: "Quel est le suffixe dans le mot « jardinage » ?",
        choices: ["jardin-", "-age", "-inage", "jard-"],
        answer: "-age",
        feedback: "Jardin-age : le suffixe « -age » indique une action ou son résultat. Jardinage = l'action de jardiner."
      },
      { id:"identifier-suffixe-n1-02",
        type: "mcq",
        instruction: "Que signifie le suffixe « -eur » dans « plongeur » ?",
        choices: ["une action", "un endroit", "celui qui fait l'action", "une qualité"],
        answer: "celui qui fait l'action",
        feedback: "Le suffixe « -eur » désigne une personne qui fait l'action. Plongeur = celui qui plonge. Aussi : chanteur, nageur, coureur…"
      },
      { id:"identifier-suffixe-n1-03",
        type: "match",
        instruction: "Associe chaque suffixe à ce qu'il exprime.",
        pairs: [
          { left: "-ette (maisonnette)", right: "petite taille" },
          { left: "-ment (rapidement)", right: "adverbe de manière" },
          { left: "-tion (construction)", right: "action ou résultat" }
        ],
        feedback: "-ette (petite taille), -ment (transforme un adjectif en adverbe), -tion (action ou résultat)."
      },
      { id:"identifier-suffixe-n1-04",
        type: "mcq",
        instruction: "Quel mot contient un suffixe signifiant « petite taille » ?",
        choices: ["maison", "jardin", "maisonnette", "soleil"],
        answer: "maisonnette",
        feedback: "Maisonnette = maison + -ette. Le suffixe « -ette » exprime la petite taille ou un diminutif."
      },
      { id:"identifier-suffixe-n1-05",
        type: "mcq",
        instruction: "Quel suffixe retrouve-t-on dans « épicerie », « boulangerie » et « boucherie » pour désigner un lieu de commerce ?",
        choices: ["-erie", "-er", "-rie", "-ie"],
        answer: "-erie",
        feedback: "Le suffixe « -erie » désigne souvent un lieu de commerce ou de travail : épic-erie, boulang-erie, bouch-erie, libr-airie…"
      },
      { id:"identifier-suffixe-n1-06",
        type: "mcq",
        instruction: "Quel est le suffixe dans le mot « chanteuse » ?",
        choices: ["chant-", "-euse", "-use", "chanteu-"],
        answer: "-euse",
        feedback: "Chant-euse : le suffixe « -euse » est le féminin de « -eur ». Il désigne une femme qui fait l'action de chanter."
      },
      { id:"identifier-suffixe-n1-07",
        type: "mcq",
        instruction: "Que signifie le suffixe « -able » dans « lavable » ?",
        choices: ["une action", "qui peut être lavé", "un endroit", "une petite taille"],
        answer: "qui peut être lavé",
        feedback: "Le suffixe « -able » signifie « qui peut être… ». Lavable = qui peut être lavé. Aussi : mangeable, cassable, réparable…"
      },
      { id:"identifier-suffixe-n1-08",
        type: "match",
        instruction: "Associe chaque suffixe à ce qu'il exprime.",
        pairs: [
          { left: "-elle (tourelle)", right: "petite taille" },
          { left: "-oir (miroir)", right: "objet qui sert à" },
          { left: "-esse (richesse)", right: "qualité, état" }
        ],
        feedback: "-elle exprime la petite taille (tourelle = petite tour), -oir désigne un objet servant à quelque chose (un miroir sert à se voir), -esse exprime une qualité ou un état (richesse = état de richesse)."
      },
      { id:"identifier-suffixe-n1-09",
        type: "mcq",
        instruction: "Quel mot contient un suffixe désignant un objet qui sert à faire quelque chose ?",
        choices: ["séchoir", "jardin", "gentil", "content"],
        answer: "séchoir",
        feedback: "Séch-oir : le suffixe « -oir » désigne un objet ou un lieu qui sert à faire l'action indiquée par le radical."
      },
      { id:"identifier-suffixe-n1-10",
        type: "mcq",
        instruction: "Quel suffixe retrouve-t-on dans « politesse » et « tristesse » pour exprimer une qualité ou un état ?",
        choices: ["-esse", "-ette", "-age", "-erie"],
        answer: "-esse",
        feedback: "Le suffixe « -esse » exprime une qualité, un état : politesse (être poli), tristesse (être triste)."
      }
    ],
    level2Bank: [
      { id:"identifier-suffixe-n2-01",
        type: "mcq",
        instruction: "Quel suffixe transforme l'adjectif « rapide » en adverbe ?",
        choices: ["-ment", "-eur", "-age", "-ette"],
        answer: "-ment",
        feedback: "Rapide-ment. Le suffixe « -ment » transforme un adjectif (au féminin) en adverbe de manière : lente → lentement, douce → doucement."
      },
      { id:"identifier-suffixe-n2-02",
        type: "match",
        instruction: "Associe chaque suffixe à la catégorie grammaticale qu'il crée.",
        pairs: [
          { left: "-eur (chanteur)", right: "nom (personne)" },
          { left: "-ment (doucement)", right: "adverbe" },
          { left: "-able (aimable)", right: "adjectif" }
        ],
        feedback: "-eur crée des noms de personne, -ment crée des adverbes, -able crée des adjectifs signifiant « qu'on peut… »."
      },
      { id:"identifier-suffixe-n2-03",
        type: "col-sort",
        instruction: "Classe chaque mot : le suffixe désigne-t-il une personne ou une action/résultat ?",
        colA: "Désigne une personne (-eur, -iste, -ien)",
        colB: "Désigne une action ou un résultat (-age, -tion, -ment)",
        items: [
          { text: "nageur", answer: "A", feedback: "Nageur = celui qui nage. Suffixe -eur = personne." },
          {
            text: "nettoyage",
            answer: "B",
            feedback: "Nettoyage = action de nettoyer. Suffixe -age = action."
          },
          {
            text: "pianiste",
            answer: "A",
            feedback: "Pianiste = celui qui joue du piano. Suffixe -iste = personne."
          },
          {
            text: "construction",
            answer: "B",
            feedback: "Construction = résultat de construire. Suffixe -tion = action/résultat."
          },
          {
            text: "musicien",
            answer: "A",
            feedback: "Musicien = celui qui joue de la musique. Suffixe -ien = personne."
          }
        ],
        feedback: "-eur, -iste et -ien désignent des personnes. -age, -tion et -ment désignent des actions ou leurs résultats."
      },
      { id:"identifier-suffixe-n2-04",
        type: "mcq",
        instruction: "Le suffixe « -iste » dans « fleuriste » exprime…",
        choices: ["Une petite fleur", "Une profession ou spécialité", "Une action", "Un résultat"],
        answer: "Une profession ou spécialité",
        feedback: "Fleur-iste : le suffixe « -iste » désigne une personne exerçant une profession. Aussi : pianiste, dentiste, journaliste…"
      },
      { id:"identifier-suffixe-n2-05",
        type: "mcq",
        instruction: "Quel suffixe dans « livraison » crée un nom d'action à partir du verbe « livrer » ?",
        choices: ["-son", "-aison", "-ison", "livr-"],
        answer: "-aison",
        feedback: "Livr-aison : le suffixe « -aison » crée des noms d'action. Aussi : terminaison (terminer), floraison (fleurir), pendaison (pendre)."
      },
      { id:"identifier-suffixe-n2-06",
        type: "mcq",
        instruction: "Quel suffixe transforme l'adjectif « franche » en adverbe ?",
        choices: ["-ment", "-eur", "-age", "-ette"],
        answer: "-ment",
        feedback: "Franche-ment. Le suffixe « -ment » s'ajoute à l'adjectif au féminin pour former l'adverbe de manière : franche → franchement, sûre → sûrement."
      },
      { id:"identifier-suffixe-n2-07",
        type: "match",
        instruction: "Associe chaque suffixe à la catégorie grammaticale qu'il crée.",
        pairs: [
          { left: "-ien (pharmacien)", right: "nom (personne)" },
          { left: "-emment (prudemment)", right: "adverbe" },
          { left: "-if (sportif)", right: "adjectif" }
        ],
        feedback: "-ien crée des noms de personnes (métiers), -emment crée des adverbes (variante de -ment après un adjectif en -ent/-ant), -if crée des adjectifs."
      },
      { id:"identifier-suffixe-n2-08",
        type: "col-sort",
        instruction: "Classe chaque mot : le suffixe désigne-t-il une personne ou une qualité/état ?",
        colA: "Désigne une personne (-eur, -iste, -ien)",
        colB: "Désigne une qualité ou un état (-esse, -té, -ise)",
        items: [
          { text: "magicien", answer: "A", feedback: "Magicien = celui qui pratique la magie. Suffixe -ien = personne." },
          { text: "vieillesse", answer: "B", feedback: "Vieillesse = état d'être vieux. Suffixe -esse = état." },
          { text: "violoniste", answer: "A", feedback: "Violoniste = celui qui joue du violon. Suffixe -iste = personne." },
          { text: "beauté", answer: "B", feedback: "Beauté = qualité d'être beau. Suffixe -té = qualité." },
          { text: "coiffeuse", answer: "A", feedback: "Coiffeuse = celle qui coiffe. Suffixe -euse = personne (féminin de -eur)." }
        ],
        feedback: "-eur, -iste, -ien et -euse désignent des personnes. -esse et -té désignent des qualités ou des états."
      },
      { id:"identifier-suffixe-n2-09",
        type: "mcq",
        instruction: "Le suffixe « -ien » dans « électricien » exprime…",
        choices: ["Une petite taille", "Une profession ou spécialité", "Une action", "Un résultat"],
        answer: "Une profession ou spécialité",
        feedback: "Électric-ien : le suffixe « -ien » désigne une personne exerçant une profession ou une spécialité, comme « informaticien » ou « historien »."
      },
      { id:"identifier-suffixe-n2-10",
        type: "mcq",
        instruction: "Quel suffixe dans « guérison » crée un nom d'action à partir du verbe « guérir » ?",
        choices: ["-son", "-aison", "-ison", "guér-"],
        answer: "-ison",
        feedback: "Guér-ison : le suffixe « -ison » crée un nom d'action à partir d'un verbe (ici, guérir → guérison)."
      }
    ],
    level3Bank: [
      { id:"identifier-suffixe-n3-01",
        type: "mcq",
        instruction: "Le suffixe « -logie » dans « biologie », « zoologie » et « psychologie » vient du grec et signifie…",
        choices: ["voir", "écrire", "étude / discours", "vivre"],
        answer: "étude / discours",
        feedback: "« Logos » signifie « étude, discours » en grec. Biologie = étude du vivant, zoologie = étude des animaux, psychologie = étude de l'esprit."
      },
      { id:"identifier-suffixe-n3-02",
        type: "match",
        instruction: "Associe chaque suffixe d'origine grecque à sa signification.",
        pairs: [
          { left: "-vore (herbivore)", right: "qui mange" },
          { left: "-phile (cinéphile)", right: "qui aime" },
          { left: "-phobe (claustrophobe)", right: "qui craint" }
        ],
        feedback: "-vore (latin vorare = dévorer), -phile (grec philos = ami), -phobe (grec phobos = peur)."
      },
      { id:"identifier-suffixe-n3-03",
        type: "mcq",
        instruction: "Dans « omnivore », quel suffixe signifie « qui mange » ?",
        choices: ["omni-", "-vore", "-ore", "omniv-"],
        answer: "-vore",
        feedback: "-vore vient du latin « vorare » (dévorer). Omnivore = mange de tout. Aussi : carnivore (viande), herbivore (herbe), insectivore (insectes)."
      },
      { id:"identifier-suffixe-n3-04",
        type: "col-sort",
        instruction: "Classe chaque suffixe selon son origine : grec ou latin ?",
        colA: "Origine grecque",
        colB: "Origine latine",
        items: [
          {
            text: "-logie (biologie)",
            answer: "A",
            feedback: "-logie vient du grec « logos » (étude). Ex : biologie, zoologie."
          },
          {
            text: "-tion (construction)",
            answer: "B",
            feedback: "-tion vient du latin (action ou résultat). Ex : construction, animation."
          },
          {
            text: "-phile (cinéphile)",
            answer: "A",
            feedback: "-phile vient du grec « philos » (ami). Ex : cinéphile, bibliophile."
          },
          {
            text: "-age (jardinage)",
            answer: "B",
            feedback: "-age vient du latin (action ou résultat). Ex : jardinage, bricolage."
          },
          {
            text: "-scope (microscope)",
            answer: "A",
            feedback: "-scope vient du grec « skopein » (observer). Ex : microscope, télescope."
          }
        ],
        feedback: "Les suffixes d'origine grecque enrichissent surtout le vocabulaire scientifique (-logie, -phile, -scope). Les suffixes latins sont très courants dans le français quotidien (-tion, -age)."
      },
      { id:"identifier-suffixe-n3-05",
        type: "mcq",
        instruction: "Le suffixe « -graphie » (dans « photographie ») vient du grec « graphein » qui signifie…",
        choices: ["voir", "écrire / représenter", "mesurer", "parler"],
        answer: "écrire / représenter",
        feedback: "Graphein signifie « écrire, tracer, représenter » en grec. Photographie = représentation par la lumière. Aussi : calligraphie, biographie, typographie."
      },
      { id:"identifier-suffixe-n3-06",
        type: "mcq",
        instruction: "Le suffixe « -cide » dans « insecticide » vient du latin « caedere » et signifie…",
        choices: ["qui aime", "qui tue", "qui mange", "qui craint"],
        answer: "qui tue",
        feedback: "« -cide » vient du latin « caedere » (tuer, couper). Insecticide = qui tue les insectes. Aussi : pesticide, homicide."
      },
      { id:"identifier-suffixe-n3-07",
        type: "match",
        instruction: "Associe chaque suffixe d'origine grecque ou latine à sa signification.",
        pairs: [
          { left: "-onyme (synonyme)", right: "nom" },
          { left: "-cratie (démocratie)", right: "pouvoir" },
          { left: "-isme (optimisme)", right: "doctrine, attitude" }
        ],
        feedback: "-onyme (grec onoma = nom), -cratie (grec kratos = pouvoir), -isme (suffixe désignant une doctrine, un système ou une attitude)."
      },
      { id:"identifier-suffixe-n3-08",
        type: "mcq",
        instruction: "Dans « thermomètre », quel suffixe grec signifie « mesure » ?",
        choices: ["-mètre", "thermo-", "-ique", "-eur"],
        answer: "-mètre",
        feedback: "« -mètre » vient du grec « metron » (mesure). Thermomètre mesure la chaleur. Aussi : kilomètre, baromètre, chronomètre."
      },
      { id:"identifier-suffixe-n3-09",
        type: "col-sort",
        instruction: "Classe chaque suffixe selon son origine : grec ou latin ?",
        colA: "Origine grecque",
        colB: "Origine latine",
        items: [
          { text: "-thèque (bibliothèque)", answer: "A", feedback: "-thèque vient du grec « thêkê » (lieu de dépôt). Bibliothèque = lieu où l'on range des livres." },
          { text: "-fère (aquifère)", answer: "B", feedback: "-fère vient du latin « ferre » (porter). Aquifère = qui porte/contient de l'eau." },
          { text: "-drome (aérodrome)", answer: "A", feedback: "-drome vient du grec « dromos » (course, piste). Aérodrome = piste pour avions." },
          { text: "-forme (uniforme)", answer: "B", feedback: "-forme vient du latin « forma » (forme). Uniforme = qui a une seule forme." },
          { text: "-onyme (pseudonyme)", answer: "A", feedback: "-onyme vient du grec « onoma » (nom). Pseudonyme = faux nom." }
        ],
        feedback: "Les suffixes d'origine grecque (-thèque, -drome, -onyme) et latine (-fère, -forme) enrichissent le vocabulaire savant du français."
      },
      { id:"identifier-suffixe-n3-10",
        type: "mcq",
        instruction: "Le suffixe « -phage » (dans « anthropophage ») vient du grec « phagein » et signifie…",
        choices: ["qui parle", "qui mange", "qui écrit", "qui voit"],
        answer: "qui mange",
        feedback: "« Phagein » signifie « manger » en grec. On le retrouve dans « anthropophage » (qui mange des humains) et en biologie dans « phagocyte » (cellule qui « mange » d'autres cellules)."
      }
    ]
  },

  "mot-derive": {
    title: "Former un mot dérivé",
    domaine: "Français",
    competence: "Vocabulaire — Former un mot dérivé",
    type: "vocabulaire-niveaux",
    levels: ["CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Construire des mots dérivés simples",
      "2": "Dérivation plus complexe — analyse de la structure",
      "3": "Analyse morphologique avancée"
    },
    level1Bank: [
      { id:"mot-derive-n1-01",
        type: "mcq",
        instruction: "Quel mot est dérivé de « fleur » avec un suffixe ?",
        choices: ["fleuve", "flocon", "fleurir", "flûte"],
        answer: "fleurir",
        feedback: "Fleurir = fleur + -ir. C'est un mot dérivé par suffixation. Fleuve, flocon et flûte ont une origine différente."
      },
      { id:"mot-derive-n1-02",
        type: "mcq",
        instruction: "Comment est formé le mot « malheureux » ?",
        choices: [
          "préfixe mal- + radical heur + suffixe -eux",
          "radical mal + heureux",
          "préfixe malheur + suffixe -eux",
          "radical malheureux (sans affixes)"
        ],
        answer: "préfixe mal- + radical heur + suffixe -eux",
        feedback: "Mal-heur-eux : mal- (préfixe = mauvais), heur (radical = chance), -eux (suffixe = plein de). C'est un mot à double affixation."
      },
      { id:"mot-derive-n1-03",
        type: "match",
        instruction: "Associe chaque base à son mot dérivé.",
        pairs: [
          { left: "jardin + -ier", right: "jardinier" },
          { left: "chanter + -eur", right: "chanteur" },
          { left: "livr- + -aison", right: "livraison" }
        ],
        feedback: "Jardin-ier, chant-eur, livr-aison : on ajoute un suffixe à la base pour former un nouveau mot."
      },
      { id:"mot-derive-n1-04",
        type: "mcq",
        instruction: "Quel préfixe ajoute-t-on à « possible » pour former son contraire ?",
        choices: ["dé-", "im-", "re-", "sur-"],
        answer: "im-",
        feedback: "Impossible = im- + possible. Im- (variante de in- devant p, b, m) exprime la négation."
      },
      { id:"mot-derive-n1-05",
        type: "mcq",
        instruction: "Quel mot est formé par préfixation à partir de « honnête » ?",
        choices: ["honnêteté", "honnêtement", "malhonnête", "honnêteur"],
        answer: "malhonnête",
        feedback: "Malhonnête = mal- (préfixe) + honnête. C'est une dérivation par préfixation. Honnêteté et honnêtement sont formés par suffixation. Honnêteur n'existe pas."
      },
      { id:"mot-derive-n1-06",
        type: "mcq",
        instruction: "Quel mot est dérivé de « dent » avec un suffixe ?",
        choices: ["dentiste", "denture", "dentifrice", "addenda"],
        answer: "dentiste",
        feedback: "Dentiste = dent + -iste. C'est un mot dérivé par suffixation."
      },
      { id:"mot-derive-n1-07",
        type: "mcq",
        instruction: "Comment est formé le mot « improbable » ?",
        choices: [
          "préfixe im- + radical probable",
          "radical im + probable",
          "préfixe improbabl- + suffixe -e",
          "radical improbable (sans affixes)"
        ],
        answer: "préfixe im- + radical probable",
        feedback: "Improbable = im- (préfixe négatif) + probable (radical). C'est une dérivation par préfixation, qui signifie « qui n'est pas probable »."
      },
      { id:"mot-derive-n1-08",
        type: "match",
        instruction: "Associe chaque base à son mot dérivé.",
        pairs: [
          { left: "danser + -eur", right: "danseur" },
          { left: "peindre + -ure", right: "peinture" },
          { left: "coller + -age", right: "collage" }
        ],
        feedback: "Dans-eur, peint-ure, coll-age : on ajoute un suffixe à la base (le verbe) pour former un nouveau mot, souvent un nom."
      },
      { id:"mot-derive-n1-09",
        type: "mcq",
        instruction: "Quel préfixe ajoute-t-on à « content » pour former son contraire ?",
        choices: ["dé-", "mé-", "in-", "re-"],
        answer: "mé-",
        feedback: "Mécontent = mé- + content. Le préfixe « mé- » exprime souvent la négation ou l'idée contraire, comme dans méconnaître ou mésentente."
      },
      { id:"mot-derive-n1-10",
        type: "mcq",
        instruction: "Quel mot est formé par préfixation à partir de « faire » ?",
        choices: ["faisable", "refaire", "faiseur", "défaite"],
        answer: "refaire",
        feedback: "Refaire = re- (préfixe = de nouveau) + faire. C'est une dérivation par préfixation. Faisable et faiseur sont formés par suffixation."
      }
    ],
    level2Bank: [
      { id:"mot-derive-n2-01",
        type: "mcq",
        instruction: "Quel est le mot de base (radical sans affixes) de « débranchement » ?",
        choices: ["débranche", "branche", "débranchement", "branchement"],
        answer: "branche",
        feedback: "Dé-branch-ement : le préfixe « dé- » et le suffixe « -ment » entourent le radical « branch- ». Le mot de base est « branche »."
      },
      { id:"mot-derive-n2-02",
        type: "mcq",
        instruction: "Comment est formé « imperméable » ?",
        choices: [
          "im- (non) + perméable (qui laisse passer l'eau)",
          "im- (dans) + per + méable",
          "préfixe imperméabl- + suffixe -e",
          "radical imperméable sans décomposition"
        ],
        answer: "im- (non) + perméable (qui laisse passer l'eau)",
        feedback: "Imperméable = im- (non) + perméable (qui laisse l'eau passer). Un imperméable est un vêtement qui ne laisse pas passer la pluie."
      },
      { id:"mot-derive-n2-03",
        type: "col-sort",
        instruction: "Classe chaque mot selon son type de dérivation.",
        colA: "Dérivation par préfixe",
        colB: "Dérivation par suffixe",
        items: [
          { text: "désordre", answer: "A", feedback: "Désordre = dés- (préfixe) + ordre." },
          { text: "jardinage", answer: "B", feedback: "Jardinage = jardin + -age (suffixe)." },
          { text: "repartir", answer: "A", feedback: "Repartir = re- (préfixe) + partir." },
          { text: "boulangerie", answer: "B", feedback: "Boulangerie = boulanger + -ie (suffixe)." },
          { text: "impossible", answer: "A", feedback: "Impossible = im- (préfixe) + possible." }
        ],
        feedback: "La préfixation ajoute un élément avant le radical ; la suffixation ajoute un élément après."
      },
      { id:"mot-derive-n2-04",
        type: "mcq",
        instruction: "Quel mot est formé avec à la fois un préfixe ET un suffixe ?",
        choices: ["jardinier", "malheureux", "chanteur", "fleuri"],
        answer: "malheureux",
        feedback: "Malheureux = mal- (préfixe) + heur (radical) + -eux (suffixe). Les autres n'ont qu'un suffixe."
      },
      { id:"mot-derive-n2-05",
        type: "match",
        instruction: "Associe chaque mot à sa structure de dérivation.",
        pairs: [
          { left: "rechargeable", right: "re- + radical + -able" },
          { left: "porteur", right: "radical + -eur" },
          { left: "démonter", right: "dé- + radical" }
        ],
        feedback: "Rechargeable (préfixe + radical + suffixe), porteur (radical + suffixe), démonter (préfixe + radical)."
      },
      { id:"mot-derive-n2-06",
        type: "mcq",
        instruction: "Quel est le mot de base (radical sans affixes) de « refroidissement » ?",
        choices: ["refroidi", "froid", "refroidissement", "froidissement"],
        answer: "froid",
        feedback: "Re-froid-issement : le préfixe « re- » et le suffixe « -issement » entourent le radical « froid ». Le mot de base est « froid »."
      },
      { id:"mot-derive-n2-07",
        type: "mcq",
        instruction: "Comment est formé « inconfortable » ?",
        choices: [
          "in- (non) + confortable (qui procure du confort)",
          "in- (dans) + confort + able",
          "préfixe inconfortabl- + suffixe -e",
          "radical inconfortable sans décomposition"
        ],
        answer: "in- (non) + confortable (qui procure du confort)",
        feedback: "Inconfortable = in- (non) + confortable (qui procure du confort). Quelque chose d'inconfortable ne procure pas de confort."
      },
      { id:"mot-derive-n2-08",
        type: "col-sort",
        instruction: "Classe chaque mot selon son type de dérivation.",
        colA: "Dérivation par préfixe",
        colB: "Dérivation par suffixe",
        items: [
          { text: "refaire", answer: "A", feedback: "Refaire = re- (préfixe) + faire." },
          { text: "coiffure", answer: "B", feedback: "Coiffure = coiffer + -ure (suffixe)." },
          { text: "mécontent", answer: "A", feedback: "Mécontent = mé- (préfixe) + content." },
          { text: "emballage", answer: "B", feedback: "Emballage = emballer + -age (suffixe)." },
          { text: "prévoir", answer: "A", feedback: "Prévoir = pré- (préfixe) + voir." }
        ],
        feedback: "La préfixation ajoute un élément avant le radical ; la suffixation ajoute un élément après."
      },
      { id:"mot-derive-n2-09",
        type: "mcq",
        instruction: "Quel mot est formé avec à la fois un préfixe ET un suffixe ?",
        choices: ["mécontentement", "coiffure", "refaire", "emballage"],
        answer: "mécontentement",
        feedback: "Mécontentement = mé- (préfixe) + content (radical) + -ement (suffixe). Les autres mots n'ont qu'un préfixe ou qu'un suffixe, pas les deux."
      },
      { id:"mot-derive-n2-10",
        type: "match",
        instruction: "Associe chaque mot à sa structure de dérivation.",
        pairs: [
          { left: "increvable", right: "in- + radical + -able" },
          { left: "nageuse", right: "radical + -euse" },
          { left: "prévenir", right: "pré- + radical" }
        ],
        feedback: "Increvable (préfixe + radical + suffixe), nageuse (radical + suffixe), prévenir (préfixe + radical)."
      }
    ],
    level3Bank: [
      { id:"mot-derive-n3-01",
        type: "mcq",
        instruction: "Le mot « invraisemblable » est formé de…",
        choices: ["in- + vraisemblable", "invrai + semblable", "in- + vrai + sembl + -able", "in- + vraisembl + -able"],
        answer: "in- + vraisemblable",
        feedback: "Invraisemblable = in- (non) + vraisemblable. Et vraisemblable lui-même = vrai + sembl- + -able. C'est un mot à plusieurs niveaux de dérivation."
      },
      { id:"mot-derive-n3-02",
        type: "col-sort",
        instruction: "Classe chaque mot : est-il dérivé (préfixe ou suffixe) ou composé (deux mots indépendants réunis) ?",
        colA: "Mot dérivé (affixes)",
        colB: "Mot composé (deux mots)",
        items: [
          {
            text: "porte-monnaie",
            answer: "B",
            feedback: "Porte-monnaie = porte + monnaie. C'est un mot composé."
          },
          { text: "chanteur", answer: "A", feedback: "Chanteur = chant + -eur. C'est un mot dérivé." },
          {
            text: "arc-en-ciel",
            answer: "B",
            feedback: "Arc-en-ciel = arc + en + ciel. C'est un mot composé."
          },
          {
            text: "malheureux",
            answer: "A",
            feedback: "Malheureux = mal- + heur + -eux. C'est un mot dérivé."
          },
          { text: "chou-fleur", answer: "B", feedback: "Chou-fleur = chou + fleur. C'est un mot composé." }
        ],
        feedback: "Un mot dérivé est formé d'un radical + affixes (préfixes/suffixes). Un mot composé réunit deux mots qui existent séparément."
      },
      { id:"mot-derive-n3-03",
        type: "mcq",
        instruction: "Quelle est la différence entre un mot dérivé et un mot composé ?",
        choices: [
          "Un mot dérivé a deux radicaux ; un mot composé a des affixes",
          "Un mot dérivé est formé d'un radical + affixes ; un mot composé réunit deux mots indépendants",
          "Un mot dérivé est toujours plus court",
          "Il n'y a aucune différence"
        ],
        answer: "Un mot dérivé est formé d'un radical + affixes ; un mot composé réunit deux mots indépendants",
        feedback: "Dérivé : chanteur (chant + -eur). Composé : porte-monnaie (porte + monnaie). Les deux enrichissent le vocabulaire mais par des mécanismes différents."
      },
      { id:"mot-derive-n3-04",
        type: "mcq",
        instruction: "Dans « extraordinaire », le préfixe « extra- » signifie…",
        choices: ["très", "en dehors de / au-delà de", "entre", "avant"],
        answer: "en dehors de / au-delà de",
        feedback: "Extra- vient du latin « extra » (en dehors de). Extraordinaire = en dehors de l'ordinaire, hors du commun."
      },
      { id:"mot-derive-n3-05",
        type: "match",
        instruction: "Associe chaque mot à sa structure morphologique.",
        pairs: [
          { left: "aquarium", right: "emprunté au latin (radical seul)" },
          { left: "déshydratation", right: "préfixe + radical + suffixe" },
          { left: "portefeuille", right: "mot composé" }
        ],
        feedback: "Aquarium = emprunté directement au latin. Déshydratation = dés- + hydr- + -at- + -ion. Portefeuille = porte + feuille."
      },
      { id:"mot-derive-n3-06",
        type: "mcq",
        instruction: "Le mot « incontestable » est formé de…",
        choices: ["in- + contestable", "incontest + able", "in- + contest + able", "in- + contestabl + e"],
        answer: "in- + contestable",
        feedback: "Incontestable = in- (non) + contestable. Et contestable lui-même = contest- + -able. C'est un mot à plusieurs niveaux de dérivation, comme invraisemblable."
      },
      { id:"mot-derive-n3-07",
        type: "col-sort",
        instruction: "Classe chaque mot : est-il dérivé (préfixe ou suffixe) ou composé (deux mots indépendants réunis) ?",
        colA: "Mot dérivé (affixes)",
        colB: "Mot composé (deux mots)",
        items: [
          { text: "grand-mère", answer: "B", feedback: "Grand-mère = grand + mère. C'est un mot composé." },
          { text: "inoubliable", answer: "A", feedback: "Inoubliable = in- + oubli(er) + -able. C'est un mot dérivé." },
          { text: "tire-bouchon", answer: "B", feedback: "Tire-bouchon = tire + bouchon. C'est un mot composé." },
          { text: "replantation", answer: "A", feedback: "Replantation = re- + plant- + -ation. C'est un mot dérivé." },
          { text: "timbre-poste", answer: "B", feedback: "Timbre-poste = timbre + poste. C'est un mot composé." }
        ],
        feedback: "Un mot dérivé est formé d'un radical + affixes. Un mot composé réunit deux mots qui existent séparément."
      },
      { id:"mot-derive-n3-08",
        type: "mcq",
        instruction: "Quelle est la différence entre un préfixe et un suffixe ?",
        choices: [
          "Un préfixe se place après le radical, un suffixe avant",
          "Un préfixe se place avant le radical, un suffixe après",
          "Un préfixe change toujours la catégorie grammaticale, pas le suffixe",
          "Il n'y a aucune différence"
        ],
        answer: "Un préfixe se place avant le radical, un suffixe après",
        feedback: "Préfixe (avant) : re-faire. Suffixe (après) : faire-able. Certains suffixes changent la catégorie grammaticale, les préfixes généralement pas."
      },
      { id:"mot-derive-n3-09",
        type: "mcq",
        instruction: "Dans « interplanétaire », le préfixe « inter- » signifie…",
        choices: ["au-dessus de", "entre", "avant", "contre"],
        answer: "entre",
        feedback: "Inter- vient du latin « inter » (entre). Interplanétaire = qui se situe entre les planètes. Aussi : international, intercontinental."
      },
      { id:"mot-derive-n3-10",
        type: "match",
        instruction: "Associe chaque mot à sa structure morphologique.",
        pairs: [
          { left: "kilomètre", right: "emprunté au grec (radicaux combinés)" },
          { left: "réensablement", right: "préfixe + radical + suffixe" },
          { left: "pomme de terre", right: "mot composé (plusieurs mots)" }
        ],
        feedback: "Kilomètre = kilo- (mille) + mètre (mesure), deux radicaux grecs combinés. Réensablement = re- + en- + sabl(e) + -ement. Pomme de terre = pomme + de + terre, plusieurs mots réunis."
      }
    ]
  },

  "origine-mots": {
    title: "Comprendre l'origine des mots (latin, grec)",
    domaine: "Français",
    competence: "Vocabulaire — Comprendre l'origine des mots (latin, grec)",
    type: "vocabulaire-niveaux",
    levels: ["6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Reconnaître les racines latines et grecques courantes",
      "2": "Reconnaître et utiliser des racines latines et grecques",
      "3": "Étymologie avancée — familles latines et grecques"
    },
    level1Bank: [
      { id:"origine-mots-n1-01",
        type: "mcq",
        instruction: "Que signifie la racine latine « aqua » ?",
        choices: ["feu", "eau", "terre", "air"],
        answer: "eau",
        feedback: "« Aqua » signifie « eau » en latin. On la retrouve dans aquarium, aquatique, aqueduct (conduit d'eau)."
      },
      { id:"origine-mots-n1-02",
        type: "mcq",
        instruction: "Quelle racine grecque signifie « vie » ?",
        choices: ["geo", "bio", "photo", "logo"],
        answer: "bio",
        feedback: "« Bios » signifie « vie » en grec. On le retrouve dans biologie (étude du vivant), biographie (récit d'une vie), biodiversité."
      },
      { id:"origine-mots-n1-03",
        type: "match",
        instruction: "Associe chaque racine latine ou grecque à sa signification.",
        pairs: [
          { left: "terra (latin)", right: "terre" },
          { left: "photo (grec)", right: "lumière" },
          { left: "chronos (grec)", right: "temps" }
        ],
        feedback: "Terra : territoire, terrestre. Photo : photographie, photosynthèse. Chronos : chronologie, chronomètre."
      },
      { id:"origine-mots-n1-04",
        type: "mcq",
        instruction: "Le mot « bibliothèque » vient du grec « biblion » (livre) et « theke » (rangement). Que signifie-t-il littéralement ?",
        choices: ["Endroit pour lire", "Rangement de livres", "Collection de livres anciens", "Maison du savoir"],
        answer: "Rangement de livres",
        feedback: "Bibliothèque = biblion (livre) + theke (rangement, coffre). Littéralement : l'endroit où l'on range les livres."
      },
      { id:"origine-mots-n1-05",
        type: "mcq",
        instruction: "La racine « graph- » (du grec « graphein ») dans « autographe » signifie…",
        choices: ["lire", "voir", "écrire / tracer", "entendre"],
        answer: "écrire / tracer",
        feedback: "Graphein signifie « écrire, tracer » en grec. Autographe = écrit de sa propre main. Aussi : photographie, calligraphie, orthographe."
      },
      { id:"origine-mots-n1-06",
        type: "mcq",
        instruction: "Que signifie la racine latine « dict- » (dicere) ?",
        choices: ["chanter", "dire", "donner", "dormir"],
        answer: "dire",
        feedback: "« Dicere » signifie « dire » en latin. On la retrouve dans dictionnaire, prédire (dire à l'avance), dicter."
      },
      { id:"origine-mots-n1-07",
        type: "mcq",
        instruction: "Quelle racine grecque signifie « plusieurs » ?",
        choices: ["mono", "poly", "auto", "anti"],
        answer: "poly",
        feedback: "« Poly » signifie « plusieurs » en grec. On le retrouve dans polygone (plusieurs angles), polyglotte (qui parle plusieurs langues)."
      },
      { id:"origine-mots-n1-08",
        type: "match",
        instruction: "Associe chaque racine latine ou grecque à sa signification.",
        pairs: [
          { left: "mono (grec)", right: "seul, un" },
          { left: "port- (latin)", right: "porter" },
          { left: "scrib/script (latin)", right: "écrire" }
        ],
        feedback: "Mono : monologue (parler seul). Port- : transporter, exporter. Scrib/script : inscription, manuscrit."
      },
      { id:"origine-mots-n1-09",
        type: "mcq",
        instruction: "Le mot « thermomètre » vient du grec « thermos » (chaud) et « metron » (mesure). Que signifie-t-il littéralement ?",
        choices: [
          "Instrument pour mesurer la chaleur",
          "Instrument pour produire de la chaleur",
          "Machine à réchauffer",
          "Objet qui refroidit"
        ],
        answer: "Instrument pour mesurer la chaleur",
        feedback: "Thermomètre = thermos (chaud) + metron (mesure). Littéralement : l'instrument qui mesure la chaleur."
      },
      { id:"origine-mots-n1-10",
        type: "mcq",
        instruction: "La racine « path- » (du grec « pathos », sentiment/souffrance) dans « sympathie » signifie…",
        choices: ["couleur", "sentiment / souffrance", "mouvement", "lumière"],
        answer: "sentiment / souffrance",
        feedback: "Pathos signifie « sentiment, souffrance » en grec. Sympathie = éprouver un sentiment commun (sym- = avec). Aussi : antipathie, empathie."
      }
    ],
    level2Bank: [
      { id:"origine-mots-n2-01",
        type: "match",
        instruction: "Associe chaque adjectif savant à son équivalent courant.",
        pairs: [
          { left: "aquatique", right: "qui vit dans l'eau" },
          { left: "terrestre", right: "qui vit sur la terre" },
          { left: "aérien", right: "qui vit dans l'air" }
        ],
        feedback: "Aquatique (aqua = eau), terrestre (terra = terre), aérien (aer = air) sont formés à partir de racines latines ou grecques."
      },
      { id:"origine-mots-n2-02",
        type: "mcq",
        instruction: "Quelle racine grecque se retrouve dans « géographie » et « géologie » ?",
        choices: ["graph", "geo", "log", "bio"],
        answer: "geo",
        feedback: "« Geo » vient du grec « gê » (la Terre). Géographie = description de la Terre, géologie = étude des roches terrestres."
      },
      { id:"origine-mots-n2-03",
        type: "col-sort",
        instruction: "Ces mots viennent-ils d'une racine latine ou d'une racine grecque ?",
        colA: "Racine latine",
        colB: "Racine grecque",
        items: [
          { text: "aquarium", answer: "A", feedback: "Aquarium vient du latin « aqua » (eau)." },
          {
            text: "téléphone",
            answer: "B",
            feedback: "Téléphone vient du grec « têle » (loin) + « phone » (voix)."
          },
          { text: "lunaire", answer: "A", feedback: "Lunaire vient du latin « luna » (lune)." },
          {
            text: "microscope",
            answer: "B",
            feedback: "Microscope vient du grec « mikros » (petit) + « skopein » (observer)."
          },
          { text: "solaire", answer: "A", feedback: "Solaire vient du latin « sol » (soleil)." }
        ],
        feedback: "Le latin et le grec ont tous deux enrichi le français, surtout dans les domaines scientifiques et savants."
      },
      { id:"origine-mots-n2-04",
        type: "mcq",
        instruction: "La racine « phon- » (du grec « phone ») dans « microphone » et « téléphone » signifie…",
        choices: ["lumière", "voix / son", "eau", "voir"],
        answer: "voix / son",
        feedback: "Phone = voix, son en grec. Microphone = qui amplifie la voix, téléphone = voix à distance, phonologie = étude des sons."
      },
      { id:"origine-mots-n2-05",
        type: "mcq",
        instruction: "Parmi ces mots, lequel vient de la racine latine « manus » (main) ?",
        choices: ["manteau", "manuel", "manie", "manège"],
        answer: "manuel",
        feedback: "Manuel vient du latin « manualis » (de la main). Un travail manuel = fait à la main. Manteau vient d'un autre mot latin (mantellum)."
      },
      { id:"origine-mots-n2-06",
        type: "match",
        instruction: "Associe chaque adjectif savant à son équivalent courant.",
        pairs: [
          { left: "nocturne", right: "qui a lieu la nuit" },
          { left: "diurne", right: "qui a lieu le jour" },
          { left: "maritime", right: "qui concerne la mer" }
        ],
        feedback: "Nocturne (nox = nuit), diurne (dies = jour), maritime (mare = mer) sont formés à partir de racines latines."
      },
      { id:"origine-mots-n2-07",
        type: "mcq",
        instruction: "Quelle racine grecque se retrouve dans « métamorphose » et « morphologie » ?",
        choices: ["morph (forme)", "therm (chaleur)", "path (sentiment)", "port (porter)"],
        answer: "morph (forme)",
        feedback: "« Morphê » signifie « forme » en grec. Métamorphose = changement de forme, morphologie = étude des formes."
      },
      { id:"origine-mots-n2-08",
        type: "col-sort",
        instruction: "Ces mots viennent-ils d'une racine latine ou d'une racine grecque ?",
        colA: "Racine latine",
        colB: "Racine grecque",
        items: [
          { text: "capital", answer: "A", feedback: "Capital vient du latin « caput » (tête) : la capitale est la « tête » d'un pays." },
          { text: "cardiaque", answer: "B", feedback: "Cardiaque vient du grec « kardia » (cœur)." },
          { text: "dentifrice", answer: "A", feedback: "Dentifrice vient du latin « dens, dentis » (dent) + « fricare » (frotter)." },
          { text: "gymnase", answer: "B", feedback: "Gymnase vient du grec « gymnos » (nu) : les athlètes grecs s'exerçaient nus." },
          { text: "annuel", answer: "A", feedback: "Annuel vient du latin « annus » (année)." }
        ],
        feedback: "Ces racines latines et grecques enrichissent le vocabulaire savant, notamment scientifique et médical."
      },
      { id:"origine-mots-n2-09",
        type: "mcq",
        instruction: "Quelle racine latine se retrouve dans « sonore » et « résonance » ?",
        choices: ["sonus (son)", "luna (lune)", "aqua (eau)", "terra (terre)"],
        answer: "sonus (son)",
        feedback: "« Sonus » signifie « son » en latin. Sonore = qui produit un son, résonance = son qui se répète."
      },
      { id:"origine-mots-n2-10",
        type: "mcq",
        instruction: "Parmi ces mots, lequel vient de la racine grecque « astron » (astre, étoile) ?",
        choices: ["astronomie", "fenêtre", "voiture", "chapeau"],
        answer: "astronomie",
        feedback: "Astron signifie « étoile, astre » en grec. Astronomie = étude des astres. On le retrouve aussi dans astronaute, astéroïde."
      }
    ],
    level3Bank: [
      { id:"origine-mots-n3-01",
        type: "mcq",
        instruction: "La racine grecque « demos » signifie « peuple ». Dans quel mot la retrouve-t-on ?",
        choices: ["démon", "démocratie", "démolir", "démontrer"],
        answer: "démocratie",
        feedback: "Démocratie = demos (peuple) + kratos (pouvoir). C'est le pouvoir du peuple. Démon, démolir et démontrer ont des racines différentes."
      },
      { id:"origine-mots-n3-02",
        type: "match",
        instruction: "Associe chaque racine grecque à un mot qui la contient.",
        pairs: [
          { left: "-cratie (pouvoir)", right: "démocratie" },
          { left: "graphe (écrire)", right: "calligraphie" },
          { left: "phob (peur)", right: "claustrophobie" }
        ],
        feedback: "Démocratie (pouvoir du peuple), calligraphie (belle écriture), claustrophobie (peur des espaces fermés)."
      },
      { id:"origine-mots-n3-03",
        type: "mcq",
        instruction: "Les mots « carnivore », « herbivore » et « omnivore » partagent le suffixe latin « -vore » qui signifie…",
        choices: ["animal", "qui mange", "qui court", "qui vit"],
        answer: "qui mange",
        feedback: "Vore vient du latin « vorare » (dévorer). Carnivore = mange de la viande, herbivore = mange de l'herbe, omnivore = mange de tout."
      },
      { id:"origine-mots-n3-04",
        type: "col-sort",
        instruction: "Ces racines viennent-elles du latin ou du grec ?",
        colA: "Latin",
        colB: "Grec",
        items: [
          {
            text: "spect (voir) → spectacle",
            answer: "A",
            feedback: "Spectacle vient du latin « spectare » (regarder)."
          },
          {
            text: "opt (vue) → optique",
            answer: "B",
            feedback: "Optique vient du grec « optikos » (de la vue)."
          },
          {
            text: "aud (entendre) → audition",
            answer: "A",
            feedback: "Audition vient du latin « audire » (entendre)."
          },
          {
            text: "acou (entendre) → acoustique",
            answer: "B",
            feedback: "Acoustique vient du grec « akouein » (entendre)."
          },
          {
            text: "vid/vis (voir) → vision",
            answer: "A",
            feedback: "Vision vient du latin « videre » (voir)."
          }
        ],
        feedback: "Latin et grec ont souvent des racines qui expriment les mêmes sens (voir, entendre) mais donnent des mots différents en français."
      },
      { id:"origine-mots-n3-05",
        type: "mcq",
        instruction: "Le mot « philanthrope » (qui aime l'humanité) est formé de…",
        choices: [
          "phil- (ami) + anthrope (homme)",
          "phi- (lumière) + lanthrope (esprit)",
          "philan- (générosité) + thrope (action)",
          "phil- (aimé) + anthrope (animal)"
        ],
        answer: "phil- (ami) + anthrope (homme)",
        feedback: "Philo/phil- vient du grec « philos » (ami). Anthrôpos = être humain. Philanthrope = ami de l'homme, qui aime l'humanité."
      },
      { id:"origine-mots-n3-06",
        type: "mcq",
        instruction: "La racine grecque « hydro » signifie « eau », tout comme le latin « aqua ». Dans quel mot retrouve-t-on la racine grecque ?",
        choices: ["aquarium", "hydravion", "aquatique", "aqueduc"],
        answer: "hydravion",
        feedback: "Hydravion = hydro (eau, grec) + avion : un avion qui peut se poser sur l'eau. Les trois autres mots viennent de la racine latine « aqua »."
      },
      { id:"origine-mots-n3-07",
        type: "match",
        instruction: "Associe chaque racine à un mot qui la contient.",
        pairs: [
          { left: "gramma (lettre écrite, grec)", right: "télégramme" },
          { left: "cide (tuer, latin)", right: "insecticide" },
          { left: "pod/pous (pied, grec)", right: "trépied" }
        ],
        feedback: "Télégramme (écrit à distance), insecticide (qui tue les insectes), trépied (objet à trois pieds) : ces mots combinent des racines grecques ou latines."
      },
      { id:"origine-mots-n3-08",
        type: "mcq",
        instruction: "Les racines « andro- » (grec, homme) et « anthropo- » (grec, être humain) sont souvent confondues. Que signifie précisément « androïde » ?",
        choices: [
          "Un robot en forme d'être humain, homme ou femme",
          "Un robot qui ressemble spécifiquement à un homme (et non à une femme)",
          "Un animal robotisé",
          "Un logiciel intelligent"
        ],
        answer: "Un robot qui ressemble spécifiquement à un homme (et non à une femme)",
        feedback: "Contrairement à « anthropo- » qui désigne l'être humain en général (comme dans philanthrope), « andro- » désigne précisément l'homme. Androïde = qui a la forme d'un homme."
      },
      { id:"origine-mots-n3-09",
        type: "col-sort",
        instruction: "Ces racines viennent-elles du latin ou du grec ?",
        colA: "Latin",
        colB: "Grec",
        items: [
          { text: "cide (tuer) → insecticide", answer: "A", feedback: "Insecticide vient du latin « caedere » (tuer, couper)." },
          { text: "gramma (lettre) → télégramme", answer: "B", feedback: "Télégramme vient du grec « gramma » (lettre écrite)." },
          { text: "somnus (sommeil) → insomnie", answer: "A", feedback: "Insomnie vient du latin « somnus » (sommeil)." },
          { text: "pous (pied) → podium", answer: "B", feedback: "Podium vient du grec « pous, podos » (pied)." },
          { text: "hydor (eau) → hydravion", answer: "B", feedback: "Hydravion vient du grec « hydor » (eau)." }
        ],
        feedback: "Ces racines latines et grecques, souvent proches par le sens, permettent de construire de nombreux mots savants du français."
      },
      { id:"origine-mots-n3-10",
        type: "mcq",
        instruction: "Le mot « gynécologue » est composé de « gynê » (femme, grec) et « logos » (étude, parole). Que signifie-t-il littéralement ?",
        choices: [
          "Celui qui étudie/soigne les femmes",
          "Celui qui parle aux femmes",
          "Celui qui aime les femmes",
          "Un spécialiste des hommes"
        ],
        answer: "Celui qui étudie/soigne les femmes",
        feedback: "Gynécologue = gynê (femme) + logos (étude, ici au sens de spécialiste) : le médecin spécialiste de la santé des femmes."
      }
    ]
  },

  "regrouper-par-theme": {
    title: "Regrouper des mots par thème",
    domaine: "Français",
    competence: "Vocabulaire — Regrouper des mots par thème",
    type: "vocabulaire-niveaux",
    levels: ["CM1", "CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Catégories simples et évidentes",
      "2": "Catégories plus fines — thèmes abstraits ou subtils",
      "3": "Thèmes abstraits, intrus difficiles, polysémie"
    },
    level1Bank: [
      { id:"regrouper-par-theme-n1-01",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "Animaux de compagnie",
        colB: "Aliments",
        items: [
          { text: "chien", answer: "A", feedback: "Le chien est un animal de compagnie." },
          { text: "pain", answer: "B", feedback: "Le pain est un aliment." },
          { text: "chat", answer: "A", feedback: "Le chat est un animal de compagnie." },
          { text: "fromage", answer: "B", feedback: "Le fromage est un aliment." },
          { text: "lapin", answer: "A", feedback: "Le lapin peut être un animal de compagnie." }
        ],
        feedback: "Pour regrouper des mots par thème, on cherche ce qu'ils ont en commun : leur catégorie, leur usage, leur domaine."
      },
      { id:"regrouper-par-theme-n1-02",
        type: "mcq",
        instruction: "Quel mot n'appartient PAS au thème des sports ?",
        choices: ["natation", "football", "peinture", "tennis"],
        answer: "peinture",
        feedback: "Natation, football et tennis sont des sports. La peinture est un art, pas un sport."
      },
      { id:"regrouper-par-theme-n1-03",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La nature",
        colB: "L'école",
        items: [
          { text: "forêt", answer: "A", feedback: "La forêt appartient au thème de la nature." },
          { text: "cahier", answer: "B", feedback: "Le cahier appartient au thème de l'école." },
          { text: "rivière", answer: "A", feedback: "La rivière appartient au thème de la nature." },
          { text: "crayon", answer: "B", feedback: "Le crayon appartient au thème de l'école." },
          { text: "montagne", answer: "A", feedback: "La montagne appartient au thème de la nature." }
        ],
        feedback: "La nature désigne le monde naturel (forêts, rivières, montagnes). L'école rassemble les outils et lieux d'apprentissage."
      },
      { id:"regrouper-par-theme-n1-04",
        type: "mcq",
        instruction: "Quel groupe de mots appartient entièrement au thème de la cuisine ?",
        choices: [
          "couteau, fourchette, assiette, casserole",
          "stylo, règle, gomme, classeur",
          "ballon, raquette, arbitre, stade",
          "marteau, clou, scie, tournevis"
        ],
        answer: "couteau, fourchette, assiette, casserole",
        feedback: "Couteau, fourchette, assiette et casserole sont tous des ustensiles de cuisine. Les autres groupes appartiennent à d'autres thèmes (école, sport, bricolage)."
      },
      { id:"regrouper-par-theme-n1-05",
        type: "match",
        instruction: "Associe chaque mot à son thème.",
        pairs: [
          { left: "ballon", right: "Sport" },
          { left: "casserole", right: "Cuisine" },
          { left: "cahier", right: "École" }
        ],
        feedback: "Ballon → sport, casserole → cuisine, cahier → école. Regrouper par thème, c'est identifier ce que les mots ont en commun."
      },
      { id:"regrouper-par-theme-n1-06",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "Les vêtements",
        colB: "Les fruits",
        items: [
          { text: "pantalon", answer: "A", feedback: "Le pantalon est un vêtement." },
          { text: "pomme", answer: "B", feedback: "La pomme est un fruit." },
          { text: "chemise", answer: "A", feedback: "La chemise est un vêtement." },
          { text: "banane", answer: "B", feedback: "La banane est un fruit." },
          { text: "chaussette", answer: "A", feedback: "La chaussette est un vêtement." }
        ],
        feedback: "Pour regrouper des mots par thème, on cherche ce qu'ils ont en commun : ici, on porte des vêtements et on mange des fruits."
      },
      { id:"regrouper-par-theme-n1-07",
        type: "mcq",
        instruction: "Quel mot n'appartient PAS au thème des couleurs ?",
        choices: ["rouge", "bleu", "carré", "vert"],
        answer: "carré",
        feedback: "Rouge, bleu et vert sont des couleurs. Carré désigne une forme géométrique, pas une couleur."
      },
      { id:"regrouper-par-theme-n1-08",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La ferme",
        colB: "La mer",
        items: [
          { text: "vache", answer: "A", feedback: "La vache est un animal de la ferme." },
          { text: "poisson", answer: "B", feedback: "Le poisson vit dans la mer." },
          { text: "tracteur", answer: "A", feedback: "Le tracteur est utilisé à la ferme." },
          { text: "bateau", answer: "B", feedback: "Le bateau navigue sur la mer." },
          { text: "poule", answer: "A", feedback: "La poule est un animal de la ferme." }
        ],
        feedback: "La ferme et la mer sont deux lieux très différents, avec chacun leurs animaux et leurs objets."
      },
      { id:"regrouper-par-theme-n1-09",
        type: "mcq",
        instruction: "Quel groupe de mots appartient entièrement au thème du corps humain ?",
        choices: [
          "bras, jambe, tête, main",
          "table, chaise, lit, armoire",
          "voiture, bus, train, avion",
          "soleil, lune, étoile, nuage"
        ],
        answer: "bras, jambe, tête, main",
        feedback: "Bras, jambe, tête et main sont des parties du corps humain. Les autres groupes appartiennent à d'autres thèmes (meubles, transports, ciel)."
      },
      { id:"regrouper-par-theme-n1-10",
        type: "match",
        instruction: "Associe chaque mot à son thème.",
        pairs: [
          { left: "guitare", right: "Musique" },
          { left: "soleil", right: "Le ciel" },
          { left: "lion", right: "Animaux sauvages" }
        ],
        feedback: "Guitare → musique, soleil → le ciel, lion → animaux sauvages. Regrouper par thème, c'est identifier ce que les mots ont en commun."
      }
    ],
    level2Bank: [
      { id:"regrouper-par-theme-n2-01",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La météo (temps qu'il fait)",
        colB: "Les saisons",
        items: [
          { text: "orage", answer: "A", feedback: "L'orage est un phénomène météorologique." },
          { text: "printemps", answer: "B", feedback: "Le printemps est une saison." },
          { text: "grêle", answer: "A", feedback: "La grêle est un phénomène météorologique." },
          { text: "automne", answer: "B", feedback: "L'automne est une saison." },
          { text: "brouillard", answer: "A", feedback: "Le brouillard est un phénomène météorologique." }
        ],
        feedback: "Météo et saisons sont liées mais distinctes : la météo désigne les conditions atmosphériques du moment ; les saisons sont des périodes cycliques de l'année."
      },
      { id:"regrouper-par-theme-n2-02",
        type: "mcq",
        instruction: "Quel mot est l'intrus dans cette liste liée au thème de la mer ?",
        choices: ["vague", "écume", "marée", "prairie"],
        answer: "prairie",
        feedback: "Vague, écume et marée appartiennent au champ de la mer. La prairie est un espace terrestre herbu — elle n'a rien à voir avec la mer."
      },
      { id:"regrouper-par-theme-n2-03",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La tristesse",
        colB: "La joie",
        items: [
          { text: "larme", answer: "A", feedback: "Les larmes évoquent la tristesse." },
          { text: "rire", answer: "B", feedback: "Le rire évoque la joie." },
          { text: "deuil", answer: "A", feedback: "Le deuil est lié à la perte et à la tristesse." },
          { text: "fête", answer: "B", feedback: "La fête évoque la joie et la célébration." },
          {
            text: "mélancolie",
            answer: "A",
            feedback: "La mélancolie est une forme de tristesse douce et profonde."
          }
        ],
        feedback: "Les thèmes des émotions (joie, tristesse) rassemblent des mots qui décrivent des états intérieurs. Attention : certains mots comme « larme » peuvent parfois évoquer une joie intense !"
      },
      { id:"regrouper-par-theme-n2-04",
        type: "mcq",
        instruction: "À quel thème général appartiennent « flûte », « violon », « batterie » et « trompette » ?",
        choices: ["Les sports", "La musique", "Les outils", "Les transports"],
        answer: "La musique",
        feedback: "Ce sont tous des instruments de musique. Les regrouper sous le thème « musique » ou « instruments » est correct."
      },
      { id:"regrouper-par-theme-n2-05",
        type: "match",
        instruction: "Associe chaque groupe de mots à son thème.",
        pairs: [
          { left: "bistouri, stéthoscope, seringue", right: "La médecine" },
          { left: "pinceau, toile, palette", right: "La peinture" },
          { left: "boussole, carte, sentier", right: "La randonnée" }
        ],
        feedback: "Bistouri/stéthoscope → médecine, pinceau/palette → peinture, boussole/carte → randonnée. Les mots d'un même thème partagent un contexte ou un usage commun."
      },
      { id:"regrouper-par-theme-n2-06",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "Le désert",
        colB: "La banquise",
        items: [
          { text: "cactus", answer: "A", feedback: "Le cactus pousse dans le désert." },
          { text: "pingouin", answer: "B", feedback: "Le pingouin vit sur la banquise." },
          { text: "dune", answer: "A", feedback: "La dune est un relief de sable typique du désert." },
          { text: "iceberg", answer: "B", feedback: "L'iceberg est un bloc de glace flottant des régions polaires." },
          { text: "chameau", answer: "A", feedback: "Le chameau est un animal adapté au désert." }
        ],
        feedback: "Désert et banquise sont deux milieux naturels très différents, avec chacun leur faune et leur flore."
      },
      { id:"regrouper-par-theme-n2-07",
        type: "mcq",
        instruction: "Quel mot est l'intrus dans cette liste liée au thème de la montagne ?",
        choices: ["sommet", "glacier", "randonnée", "plage"],
        answer: "plage",
        feedback: "Sommet, glacier et randonnée appartiennent au thème de la montagne. La plage appartient au thème du littoral."
      },
      { id:"regrouper-par-theme-n2-08",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La colère",
        colB: "La peur",
        items: [
          { text: "rage", answer: "A", feedback: "La rage est une forme intense de colère." },
          { text: "terreur", answer: "B", feedback: "La terreur est une peur extrême." },
          { text: "fureur", answer: "A", feedback: "La fureur est une colère violente." },
          { text: "angoisse", answer: "B", feedback: "L'angoisse est une forme de peur diffuse." },
          { text: "exaspération", answer: "A", feedback: "L'exaspération est une forme de colère née de l'agacement." }
        ],
        feedback: "Colère et peur sont deux émotions bien distinctes, chacune avec son propre vocabulaire de nuances."
      },
      { id:"regrouper-par-theme-n2-09",
        type: "mcq",
        instruction: "À quel thème général appartiennent « micro-ondes », « réfrigérateur », « grille-pain » et « bouilloire » ?",
        choices: ["Les instruments de musique", "Les appareils électroménagers", "Les outils de bricolage", "Les moyens de transport"],
        answer: "Les appareils électroménagers",
        feedback: "Micro-ondes, réfrigérateur, grille-pain et bouilloire sont tous des appareils électroménagers utilisés dans la cuisine."
      },
      { id:"regrouper-par-theme-n2-10",
        type: "match",
        instruction: "Associe chaque groupe de mots à son thème.",
        pairs: [
          { left: "casque, gants, genouillères", right: "La sécurité à vélo" },
          { left: "loupe, microscope, éprouvette", right: "Les sciences" },
          { left: "valise, passeport, billet", right: "Le voyage" }
        ],
        feedback: "Casque/gants → sécurité à vélo, loupe/microscope → sciences, valise/passeport → voyage. Les mots d'un même thème partagent un usage commun."
      }
    ],
    level3Bank: [
      { id:"regrouper-par-theme-n3-01",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La guerre",
        colB: "La paix",
        items: [
          { text: "canon", answer: "A", feedback: "Le canon est une arme de guerre." },
          { text: "traité", answer: "B", feedback: "Un traité de paix met fin à un conflit." },
          { text: "bataillon", answer: "A", feedback: "Un bataillon est une unité militaire." },
          {
            text: "diplomatie",
            answer: "B",
            feedback: "La diplomatie cherche des solutions pacifiques aux conflits."
          },
          { text: "armée", answer: "A", feedback: "L'armée est une organisation militaire liée à la guerre." }
        ],
        feedback: "Attention : certains mots comme « armistice » ou « trêve » appartiennent aux deux thèmes — ils désignent des pauses dans la guerre."
      },
      { id:"regrouper-par-theme-n3-02",
        type: "mcq",
        instruction: "Quel mot peut appartenir à deux thèmes différents selon le contexte ?",
        choices: ["vague (la mer / l'imprécision)", "marée", "écume", "phare"],
        answer: "vague (la mer / l'imprécision)",
        feedback: "« Vague » appartient au thème de la mer (une vague d'eau) ET au thème de l'imprécision (une réponse vague). Cette double appartenance s'appelle la polysémie."
      },
      { id:"regrouper-par-theme-n3-03",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "L'argent / le commerce",
        colB: "Le droit / la justice",
        items: [
          { text: "facture", answer: "A", feedback: "Une facture est un document de paiement commercial." },
          { text: "tribunal", answer: "B", feedback: "Le tribunal est une institution de justice." },
          { text: "dette", answer: "A", feedback: "Une dette est une somme d'argent due à quelqu'un." },
          { text: "jugement", answer: "B", feedback: "Un jugement est une décision rendue par un tribunal." },
          {
            text: "bénéfice",
            answer: "A",
            feedback: "Le bénéfice est le gain réalisé dans une activité commerciale."
          }
        ],
        feedback: "Commerce et droit sont deux domaines bien distincts, même si certains mots (comme « contrat ») peuvent appartenir aux deux."
      },
      { id:"regrouper-par-theme-n3-04",
        type: "mcq",
        instruction: "Dans quel thème général range-t-on les mots « épistolaire », « narratif », « lyrique » et « dramatique » ?",
        choices: ["La géographie", "Les genres littéraires", "La biologie", "Les arts plastiques"],
        answer: "Les genres littéraires",
        feedback: "Épistolaire (lettres), narratif (récit), lyrique (poésie) et dramatique (théâtre) désignent les grands genres de la littérature."
      },
      { id:"regrouper-par-theme-n3-05",
        type: "match",
        instruction: "Associe chaque mot savant au domaine thématique auquel il appartient.",
        pairs: [
          { left: "chlorophylle", right: "Biologie / botanique" },
          { left: "métaphore", right: "Littérature / rhétorique" },
          { left: "parallèle", right: "Géographie / géométrie" }
        ],
        feedback: "Chlorophylle (pigment des plantes), métaphore (figure de style), parallèle (ligne ou droite) : certains mots appartiennent à un seul domaine, d'autres (comme « parallèle ») à plusieurs."
      },
      { id:"regrouper-par-theme-n3-06",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "La démocratie",
        colB: "La dictature",
        items: [
          { text: "élection", answer: "A", feedback: "L'élection permet aux citoyens de choisir leurs représentants." },
          { text: "censure", answer: "B", feedback: "La censure interdit l'expression libre, typique des régimes autoritaires." },
          { text: "parlement", answer: "A", feedback: "Le parlement est une assemblée élue qui vote les lois." },
          { text: "propagande", answer: "B", feedback: "La propagande diffuse des idées imposées par le pouvoir en place." },
          { text: "référendum", answer: "A", feedback: "Le référendum consulte directement les citoyens sur une question." }
        ],
        feedback: "Attention : certains mots comme « pouvoir » ou « État » peuvent appartenir aux deux systèmes politiques."
      },
      { id:"regrouper-par-theme-n3-07",
        type: "mcq",
        instruction: "Quel mot peut appartenir à deux thèmes différents selon le contexte ?",
        choices: ["feuille (l'arbre / le papier)", "tronc", "écorce", "branche"],
        answer: "feuille (l'arbre / le papier)",
        feedback: "« Feuille » appartient au thème des végétaux (une feuille d'arbre) ET au thème de l'écriture (une feuille de papier). C'est un exemple de polysémie."
      },
      { id:"regrouper-par-theme-n3-08",
        type: "col-sort",
        instruction: "Classe chaque mot dans son thème.",
        colA: "L'économie",
        colB: "L'écologie",
        items: [
          { text: "inflation", answer: "A", feedback: "L'inflation est une hausse générale des prix, un phénomène économique." },
          { text: "biodiversité", answer: "B", feedback: "La biodiversité désigne la variété des espèces vivantes, un thème écologique." },
          { text: "actionnaire", answer: "A", feedback: "Un actionnaire possède des parts d'une entreprise." },
          { text: "recyclage", answer: "B", feedback: "Le recyclage permet de réduire l'impact environnemental des déchets." },
          { text: "investissement", answer: "A", feedback: "Un investissement est une somme d'argent placée pour un projet économique." }
        ],
        feedback: "Économie et écologie sont deux domaines distincts, même si des mots comme « développement durable » les relient."
      },
      { id:"regrouper-par-theme-n3-09",
        type: "mcq",
        instruction: "Dans quel thème général range-t-on les mots « ellipse », « métonymie », « antithèse » et « hyperbole » ?",
        choices: ["Les figures de style", "Les formes géométriques", "Les temps verbaux", "Les registres de langue"],
        answer: "Les figures de style",
        feedback: "Ellipse (omission), métonymie, antithèse et hyperbole sont des figures de style. Attention : « ellipse » désigne aussi une forme géométrique dans un autre contexte."
      },
      { id:"regrouper-par-theme-n3-10",
        type: "match",
        instruction: "Associe chaque mot savant au domaine thématique auquel il appartient.",
        pairs: [
          { left: "amygdale, fémur, aorte", right: "Anatomie / médecine" },
          { left: "pixel, octet, algorithme", right: "Informatique" },
          { left: "strophe, rime, hémistiche", right: "Poésie" }
        ],
        feedback: "Chaque domaine spécialisé possède son propre vocabulaire technique : anatomie, informatique, poésie."
      }
    ]
  },

  "champ-lexical": {
    title: "Identifier un champ lexical",
    domaine: "Français",
    competence: "Vocabulaire — Identifier un champ lexical",
    type: "vocabulaire-niveaux",
    levels: ["CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Champs lexicaux évidents — identifier les membres d'un champ",
      "2": "Champs subtils, distinction champ lexical / famille de mots",
      "3": "Polysémie et analyse fine du champ lexical dans un texte"
    },
    level1Bank: [
      { id:"champ-lexical-n1-01",
        type: "col-sort",
        instruction: "Classe chaque mot : appartient-il au champ lexical de la mer ?",
        colA: "Champ lexical de la mer",
        colB: "N'appartient pas à ce champ",
        items: [
          { text: "vague", answer: "A", feedback: "Une vague est un mouvement de l'eau de mer." },
          {
            text: "montagne",
            answer: "B",
            feedback: "La montagne n'appartient pas au champ lexical de la mer."
          },
          { text: "marin", answer: "A", feedback: "Un marin travaille sur la mer." },
          {
            text: "prairie",
            answer: "B",
            feedback: "La prairie est un espace terrestre, sans lien avec la mer."
          },
          {
            text: "phare",
            answer: "A",
            feedback: "Le phare est une tour lumineuse qui guide les bateaux en mer."
          }
        ],
        feedback: "Le champ lexical de la mer rassemble tous les mots qui évoquent la mer : ses mouvements, ses habitants, ses outils de navigation…"
      },
      { id:"champ-lexical-n1-02",
        type: "mcq",
        instruction: "Quel mot N'appartient PAS au champ lexical de la forêt ?",
        choices: ["arbre", "feuille", "bûcheron", "assiette"],
        answer: "assiette",
        feedback: "Arbre, feuille et bûcheron évoquent tous la forêt. L'assiette est un objet de cuisine qui n'a aucun lien avec la forêt."
      },
      { id:"champ-lexical-n1-03",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Champ lexical de l'école",
        colB: "Champ lexical de la maison",
        items: [
          { text: "tableau", answer: "A", feedback: "Le tableau (noir ou blanc) est un outil de l'école." },
          { text: "canapé", answer: "B", feedback: "Le canapé est un meuble de maison." },
          { text: "professeur", answer: "A", feedback: "Le professeur enseigne à l'école." },
          { text: "cuisine", answer: "B", feedback: "La cuisine est une pièce de la maison." },
          { text: "récréation", answer: "A", feedback: "La récréation est une pause à l'école." }
        ],
        feedback: "Un champ lexical peut regrouper des personnes, des lieux, des objets et des actions qui partagent un même domaine."
      },
      { id:"champ-lexical-n1-04",
        type: "mcq",
        instruction: "Qu'est-ce qu'un champ lexical ?",
        choices: [
          "Des mots qui partagent la même racine",
          "Des mots qui appartiennent au même thème et évoquent la même réalité",
          "Des mots qui ont le même nombre de syllabes",
          "Des mots qui riment ensemble"
        ],
        answer: "Des mots qui appartiennent au même thème et évoquent la même réalité",
        feedback: "Le champ lexical d'un mot ou d'un thème regroupe tous les mots qui s'y rapportent, quelle que soit leur famille grammaticale (noms, verbes, adjectifs…)."
      },
      { id:"champ-lexical-n1-05",
        type: "mcq",
        instruction: "Quel groupe de mots forme le champ lexical de la peur ?",
        choices: [
          "rire, joie, bonheur, gaieté",
          "effroi, frisson, terreur, angoisse",
          "rouge, bleu, vert, jaune",
          "table, chaise, lit, armoire"
        ],
        answer: "effroi, frisson, terreur, angoisse",
        feedback: "Effroi, frisson, terreur et angoisse évoquent tous la peur sous différentes formes. C'est le champ lexical de la peur."
      },
      { id:"champ-lexical-n1-06",
        type: "mcq",
        instruction: "Quel mot appartient au champ lexical de l'hiver ?",
        choices: ["neige", "sable", "chaleur", "plage"],
        answer: "neige",
        feedback: "La neige est caractéristique de l'hiver. Sable, chaleur et plage évoquent plutôt l'été."
      },
      { id:"champ-lexical-n1-07",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Champ lexical du feu",
        colB: "Champ lexical de l'eau",
        items: [
          { text: "flamme", answer: "A", feedback: "Une flamme est produite par le feu." },
          { text: "ruisseau", answer: "B", feedback: "Un ruisseau est un petit cours d'eau." },
          { text: "brasier", answer: "A", feedback: "Un brasier est un feu très intense." },
          { text: "cascade", answer: "B", feedback: "Une cascade est une chute d'eau." },
          { text: "cendre", answer: "A", feedback: "La cendre est un résidu laissé par le feu." }
        ],
        feedback: "Le feu et l'eau sont deux champs lexicaux bien distincts, chacun avec son propre vocabulaire."
      },
      { id:"champ-lexical-n1-08",
        type: "mcq",
        instruction: "Quel mot N'appartient PAS au champ lexical de l'hôpital ?",
        choices: ["médecin", "infirmière", "piqûre", "tracteur"],
        answer: "tracteur",
        feedback: "Médecin, infirmière et piqûre évoquent tous l'hôpital. Le tracteur est un engin agricole, sans lien avec l'hôpital."
      },
      { id:"champ-lexical-n1-09",
        type: "mcq",
        instruction: "Quel groupe de mots forme le champ lexical du cirque ?",
        choices: [
          "jongleur, trapèze, clown, chapiteau",
          "pupitre, cahier, stylo, ardoise",
          "casserole, poêle, fourchette, verre",
          "chien, chat, hamster, poisson"
        ],
        answer: "jongleur, trapèze, clown, chapiteau",
        feedback: "Jongleur, trapèze, clown et chapiteau évoquent tous le cirque. Les autres groupes appartiennent à d'autres champs (école, cuisine, animaux domestiques)."
      },
      { id:"champ-lexical-n1-10",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Champ lexical de la ferme",
        colB: "Champ lexical de la ville",
        items: [
          { text: "vache", answer: "A", feedback: "La vache est un animal d'élevage à la ferme." },
          { text: "immeuble", answer: "B", feedback: "Un immeuble est un bâtiment typique de la ville." },
          { text: "grange", answer: "A", feedback: "La grange est un bâtiment qui sert à stocker le foin ou le matériel agricole." },
          { text: "trottoir", answer: "B", feedback: "Le trottoir est un espace piéton en ville." },
          { text: "poule", answer: "A", feedback: "La poule est un animal élevé à la ferme." }
        ],
        feedback: "La ferme et la ville sont deux champs lexicaux qui rassemblent des réalités très différentes."
      }
    ],
    level2Bank: [
      { id:"champ-lexical-n2-01",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Champ lexical de la joie",
        colB: "Champ lexical de la tristesse",
        items: [
          { text: "rire", answer: "A", feedback: "Rire évoque la joie et la gaieté." },
          { text: "larme", answer: "B", feedback: "Les larmes sont liées à la tristesse." },
          { text: "allégresse", answer: "A", feedback: "L'allégresse est une joie vive et exubérante." },
          { text: "mélancolie", answer: "B", feedback: "La mélancolie est une tristesse douce et profonde." },
          { text: "enthousiasme", answer: "A", feedback: "L'enthousiasme est un élan joyeux et passionné." }
        ],
        feedback: "Les champs lexicaux des émotions sont très riches. Un mot comme « larme » peut parfois appartenir aux deux (larmes de joie), selon le contexte."
      },
      { id:"champ-lexical-n2-02",
        type: "mcq",
        instruction: "Quel mot inattendu peut appartenir au champ lexical de la lumière ?",
        choices: ["éclat", "songe", "marmite", "tabouret"],
        answer: "éclat",
        feedback: "« Éclat » peut appartenir au champ lexical de la lumière (un éclat de lumière), mais aussi au bruit (un éclat de rire) ou à la violence. C'est un mot polysémique."
      },
      { id:"champ-lexical-n2-03",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Le voyage",
        colB: "Le corps humain",
        items: [
          { text: "escale", answer: "A", feedback: "Une escale est une étape dans un voyage." },
          { text: "poumon", answer: "B", feedback: "Le poumon est un organe du corps humain." },
          { text: "bagages", answer: "A", feedback: "Les bagages accompagnent le voyageur." },
          { text: "cerveau", answer: "B", feedback: "Le cerveau est l'organe central du système nerveux." },
          { text: "itinéraire", answer: "A", feedback: "L'itinéraire est le trajet prévu pour un voyage." }
        ],
        feedback: "Voyage et corps humain sont deux champs bien distincts. Certains mots peuvent néanmoins appartenir aux deux : « circuit » (tour du corps / circuit touristique)."
      },
      { id:"champ-lexical-n2-04",
        type: "mcq",
        instruction: "Quelle est la différence entre un champ lexical et une famille de mots ?",
        choices: [
          "Ce sont exactement la même chose",
          "Le champ lexical regroupe des mots par thème ; la famille de mots regroupe des mots ayant le même radical",
          "Le champ lexical n'utilise que des adjectifs",
          "La famille de mots ne contient que des noms"
        ],
        answer: "Le champ lexical regroupe des mots par thème ; la famille de mots regroupe des mots ayant le même radical",
        feedback: "Champ lexical de la mer : vague, marin, voile, sel, tempête (radical différent, même thème). Famille de « pêche » : pêcher, pêcheur, pêcherie (même radical, sens lié)."
      },
      { id:"champ-lexical-n2-05",
        type: "mcq",
        instruction: "Quel est le champ lexical dominant dans : « Le chirurgien prit son bistouri, ausculta le patient et posa un diagnostic » ?",
        choices: ["La gastronomie", "La médecine", "L'architecture", "Le sport"],
        answer: "La médecine",
        feedback: "Chirurgien, bistouri, ausculter, patient, diagnostic : tous ces mots appartiennent au champ lexical de la médecine."
      },
      { id:"champ-lexical-n2-06",
        type: "mcq",
        instruction: "Quel mot polysémique appartient à la fois au champ lexical de l'arbre et à celui de l'école ?",
        choices: ["feuille", "tronc", "cahier", "branche"],
        answer: "feuille",
        feedback: "« Feuille » peut désigner la feuille d'un arbre (nature) ou une feuille de papier (école). C'est un mot polysémique."
      },
      { id:"champ-lexical-n2-07",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Champ lexical du sport",
        colB: "Champ lexical de la guerre",
        items: [
          { text: "entraînement", answer: "A", feedback: "L'entraînement prépare un sportif à la compétition." },
          { text: "tranchée", answer: "B", feedback: "La tranchée est un abri creusé pendant la guerre." },
          { text: "supporter", answer: "A", feedback: "Le supporter encourage une équipe sportive." },
          { text: "armistice", answer: "B", feedback: "L'armistice marque la fin des combats d'une guerre." },
          { text: "stade", answer: "A", feedback: "Le stade est le lieu où se déroulent les compétitions sportives." }
        ],
        feedback: "Sport et guerre partagent parfois un vocabulaire proche (bataille, victoire…), mais restent deux champs lexicaux distincts."
      },
      { id:"champ-lexical-n2-08",
        type: "mcq",
        instruction: "Quelle est la différence entre un champ lexical et des synonymes ?",
        choices: [
          "Le champ lexical regroupe des mots liés à un même thème ; les synonymes ont un sens presque identique",
          "Ce sont deux mots qui désignent exactement la même chose",
          "Un champ lexical ne contient qu'un seul mot",
          "Les synonymes appartiennent toujours à des thèmes différents"
        ],
        answer: "Le champ lexical regroupe des mots liés à un même thème ; les synonymes ont un sens presque identique",
        feedback: "Champ lexical de la peur : effroi, frisson, angoisse (sens différents, même thème). Synonymes de « content » : joyeux, heureux (sens presque identique)."
      },
      { id:"champ-lexical-n2-09",
        type: "mcq",
        instruction: "Quel est le champ lexical dominant dans : « Le juge écouta les témoins, consulta le dossier et rendit son verdict » ?",
        choices: ["La justice", "La cuisine", "Le sport", "La musique"],
        answer: "La justice",
        feedback: "Juge, témoins, dossier, verdict : tous ces mots appartiennent au champ lexical de la justice."
      },
      { id:"champ-lexical-n2-10",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "Le désert",
        colB: "La banquise",
        items: [
          { text: "dune", answer: "A", feedback: "Une dune est une colline de sable façonnée par le vent dans le désert." },
          { text: "iceberg", answer: "B", feedback: "Un iceberg est un bloc de glace flottant dans les mers polaires." },
          { text: "oasis", answer: "A", feedback: "Une oasis est un point d'eau entouré de végétation dans le désert." },
          { text: "morse", answer: "B", feedback: "Le morse est un mammifère marin vivant sur la banquise." },
          { text: "sécheresse", answer: "A", feedback: "La sécheresse est un manque d'eau caractéristique du désert." }
        ],
        feedback: "Désert et banquise sont deux milieux extrêmes, chacun avec son propre champ lexical."
      }
    ],
    level3Bank: [
      { id:"champ-lexical-n3-01",
        type: "mcq",
        instruction: "Un mot peut-il appartenir à plusieurs champs lexicaux ?",
        choices: [
          "Non, chaque mot appartient à un seul champ lexical",
          "Oui, selon le contexte, un même mot peut appartenir à des champs différents",
          "Oui, mais seulement les adjectifs",
          "Non, cela créerait de la confusion"
        ],
        answer: "Oui, selon le contexte, un même mot peut appartenir à des champs différents",
        feedback: "Exemple : « court » appartient au champ lexical du tennis (un court de tennis), de l'espace (un trajet court) ou du temps (un délai court). Le contexte est décisif."
      },
      { id:"champ-lexical-n3-02",
        type: "col-sort",
        instruction: "Classe chaque mot dans le bon champ lexical du mot « temps ».",
        colA: "Le temps qui passe (durée)",
        colB: "Le temps qu'il fait (météo)",
        items: [
          { text: "siècle", answer: "A", feedback: "Un siècle = 100 ans. C'est une mesure de durée." },
          { text: "nuage", answer: "B", feedback: "Le nuage est un phénomène météorologique." },
          { text: "instant", answer: "A", feedback: "Un instant est une courte durée." },
          { text: "tempête", answer: "B", feedback: "La tempête est un phénomène météorologique violent." },
          { text: "ère", answer: "A", feedback: "Une ère est une longue période de temps." }
        ],
        feedback: "Le mot « temps » est polysémique : il a deux champs lexicaux distincts selon qu'on parle de durée ou de météorologie."
      },
      { id:"champ-lexical-n3-03",
        type: "mcq",
        instruction: "Dans quel champ lexical range-t-on le mot « éclipse » ?",
        choices: ["La cuisine", "L'astronomie", "La médecine", "L'architecture"],
        answer: "L'astronomie",
        feedback: "Une éclipse se produit quand un astre en cache un autre (éclipse de Soleil, de Lune). Ce mot appartient au champ lexical de l'astronomie."
      },
      { id:"champ-lexical-n3-04",
        type: "match",
        instruction: "Associe chaque mot savant au champ lexical qu'il évoque.",
        pairs: [
          { left: "axiome", right: "Les mathématiques" },
          { left: "allitération", right: "La littérature / poésie" },
          { left: "photosynthèse", right: "La biologie / botanique" }
        ],
        feedback: "Axiome (vérité de base en maths), allitération (répétition de sons en poésie), photosynthèse (fabrication de sucre par les plantes)."
      },
      { id:"champ-lexical-n3-05",
        type: "mcq",
        instruction: "Dans : « Les cordes vibrèrent, la mélodie s'éleva, le maestro leva sa baguette », quel est le champ lexical dominant ?",
        choices: ["Le sport", "La musique", "La cuisine", "La guerre"],
        answer: "La musique",
        feedback: "Cordes, mélodie, maestro, baguette (de chef d'orchestre) : ces mots forment le champ lexical de la musique classique. Identifier ce champ aide à comprendre le sens global d'un texte."
      },
      { id:"champ-lexical-n3-06",
        type: "mcq",
        instruction: "Quel mot peut appartenir soit au champ lexical des animaux, soit à celui de la file d'attente ?",
        choices: ["queue", "poil", "griffe", "plume"],
        answer: "queue",
        feedback: "« Queue » désigne la queue d'un animal, mais aussi la file d'attente (faire la queue). Un mot polysémique appartient à plusieurs champs lexicaux selon le contexte."
      },
      { id:"champ-lexical-n3-07",
        type: "col-sort",
        instruction: "Classe chaque mot dans son champ lexical.",
        colA: "La justice",
        colB: "La politique",
        items: [
          { text: "verdict", answer: "A", feedback: "Le verdict est la décision rendue par un tribunal." },
          { text: "élection", answer: "B", feedback: "Une élection permet de désigner des représentants politiques." },
          { text: "avocat", answer: "A", feedback: "L'avocat défend un accusé devant la justice." },
          { text: "ministre", answer: "B", feedback: "Le ministre est un responsable politique." },
          { text: "tribunal", answer: "A", feedback: "Le tribunal est le lieu où la justice est rendue." }
        ],
        feedback: "Justice et politique sont parfois liées (un procès politique) mais forment deux champs lexicaux distincts."
      },
      { id:"champ-lexical-n3-08",
        type: "mcq",
        instruction: "Dans « L'orateur martela ses arguments, plaida sa cause et convainquit l'assemblée », quel est le champ lexical dominant ?",
        choices: ["La rhétorique / le discours", "La cuisine", "L'agriculture", "La météorologie"],
        answer: "La rhétorique / le discours",
        feedback: "Orateur, arguments, plaida, convainquit : ces mots renvoient à l'art de convaincre par la parole, le champ lexical de la rhétorique."
      },
      { id:"champ-lexical-n3-09",
        type: "match",
        instruction: "Associe chaque mot savant au champ lexical qu'il évoque.",
        pairs: [
          { left: "sismographe", right: "La géologie / sismologie" },
          { left: "amnésie", right: "La médecine" },
          { left: "misanthrope", right: "Les sentiments humains (haïr l'humanité)" }
        ],
        feedback: "Sismographe (mesure des séismes), amnésie (perte de mémoire), misanthrope (qui déteste les hommes) : des mots savants, chacun ancré dans un champ lexical précis."
      },
      { id:"champ-lexical-n3-10",
        type: "mcq",
        instruction: "Dans « Le funambule avança sur le fil, garda son équilibre et salua la foule sous les applaudissements », quel est le champ lexical dominant ?",
        choices: ["Le cirque", "La pêche", "L'agriculture", "La médecine"],
        answer: "Le cirque",
        feedback: "Funambule, fil, équilibre, foule qui applaudit : ces mots forment le champ lexical du cirque."
      }
    ]
  },

  "mot-adapte-contexte": {
    title: "Choisir le mot adapté au contexte",
    domaine: "Français",
    competence: "Vocabulaire — Choisir le mot adapté au contexte",
    type: "vocabulaire-niveaux",
    levels: ["CM2", "6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Choisir le mot juste dans des phrases au sens évident",
      "2": "Nuances de sens, précision lexicale, mots quasi-synonymes",
      "3": "Connotations, registres et précision stylistique"
    },
    level1Bank: [
      { id:"mot-adapte-contexte-n1-01",
        type: "mcq",
        instruction: "Complète la phrase : « Le chien _____ très fort quand le facteur sonne. »",
        choices: ["chante", "aboie", "siffle", "miaule"],
        answer: "aboie",
        feedback: "Le chien aboie : c'est le verbe spécifique à son cri. Chanter est pour les oiseaux, siffler pour certains animaux, miauler pour le chat."
      },
      { id:"mot-adapte-contexte-n1-02",
        type: "mcq",
        instruction: "Quelle phrase utilise le mot le plus adapté pour parler de la démarche d'un éléphant ?",
        choices: [
          "L'éléphant sautillait dans la savane.",
          "L'éléphant voltigeait entre les arbres.",
          "L'éléphant avançait lourdement.",
          "L'éléphant gambadait dans la plaine."
        ],
        answer: "L'éléphant avançait lourdement.",
        feedback: "Un éléphant est lourd et lent. « Avancer lourdement » est le plus précis. Sautiller, voltiger et gambader évoquent légèreté et vivacité, inadaptées à cet animal."
      },
      { id:"mot-adapte-contexte-n1-03",
        type: "mcq",
        instruction: "Complète la phrase : « La _____ brillait dans le ciel étoilé de la nuit. »",
        choices: ["lune", "carotte", "brosse", "chaussure"],
        answer: "lune",
        feedback: "La lune est l'astre qui éclaire la nuit. Les autres mots n'ont aucun rapport avec le ciel."
      },
      { id:"mot-adapte-contexte-n1-04",
        type: "mcq",
        instruction: "Dans un compte rendu médical, quel mot est le plus adapté pour parler d'une douleur au ventre ?",
        choices: ["bobo", "mal au bidon", "douleur abdominale", "c'est nul"],
        answer: "douleur abdominale",
        feedback: "Dans un contexte médical et formel, on utilise des termes précis : « douleur abdominale » (ventre). « Bobo » et « bidon » sont des mots familiers, inadaptés à ce contexte."
      },
      { id:"mot-adapte-contexte-n1-05",
        type: "match",
        instruction: "Associe chaque animal au verbe qui décrit son cri.",
        pairs: [
          { left: "Le chat", right: "miaule" },
          { left: "La vache", right: "meugle" },
          { left: "Le cheval", right: "hennit" }
        ],
        feedback: "Chaque animal a son verbe propre : miauler (chat), meugler (vache), hennir (cheval). Utiliser le bon verbe rend l'écriture plus précise."
      },
      { id:"mot-adapte-contexte-n1-06",
        type: "mcq",
        instruction: "Complète la phrase : « Le boulanger sort le pain tout chaud de son _____. »",
        choices: ["four", "frigo", "lit", "vélo"],
        answer: "four",
        feedback: "Le pain cuit dans un four. Les autres mots n'ont aucun rapport avec la cuisson du pain."
      },
      { id:"mot-adapte-contexte-n1-07",
        type: "mcq",
        instruction: "Quelle phrase utilise le mot le plus adapté pour parler du déplacement d'un serpent ?",
        choices: [
          "Le serpent sautait dans l'herbe.",
          "Le serpent galopait sur le chemin.",
          "Le serpent rampait dans l'herbe.",
          "Le serpent volait au-dessus du sol."
        ],
        answer: "Le serpent rampait dans l'herbe.",
        feedback: "Un serpent n'a pas de pattes : il rampe. Sauter, galoper et voler sont des mouvements impossibles pour un serpent."
      },
      { id:"mot-adapte-contexte-n1-08",
        type: "mcq",
        instruction: "Complète la phrase : « Le _____ chantait joyeusement sur la branche de l'arbre. »",
        choices: ["oiseau", "poisson", "ballon", "crayon"],
        answer: "oiseau",
        feedback: "Un oiseau chante et se pose sur une branche. Les autres mots ne correspondent pas à cette scène."
      },
      { id:"mot-adapte-contexte-n1-09",
        type: "mcq",
        instruction: "Dans un magasin, quel mot utilise-t-on pour parler du prix d'un objet ?",
        choices: ["le coût", "le bruit", "la couleur", "l'odeur"],
        answer: "le coût",
        feedback: "Le coût désigne le prix à payer pour un objet. Bruit, couleur et odeur ne concernent pas l'argent."
      },
      { id:"mot-adapte-contexte-n1-10",
        type: "match",
        instruction: "Associe chaque animal au verbe qui décrit son cri.",
        pairs: [
          { left: "Le canard", right: "cancane" },
          { left: "Le cochon", right: "grogne" },
          { left: "La grenouille", right: "coasse" }
        ],
        feedback: "Chaque animal a son verbe propre : cancaner (canard), grogner (cochon), coasser (grenouille). Utiliser le bon verbe rend l'écriture plus précise."
      }
    ],
    level2Bank: [
      { id:"mot-adapte-contexte-n2-01",
        type: "mcq",
        instruction: "Complète la phrase : « En automne, les feuilles des arbres _____ et recouvrent le sol. »",
        choices: ["tombent", "poussent", "fleurissent", "gèlent"],
        answer: "tombent",
        feedback: "En automne, les feuilles tombent. Pousser et fleurir décrivent le printemps, geler évoque l'hiver."
      },
      { id:"mot-adapte-contexte-n2-02",
        type: "mcq",
        instruction: "Lequel de ces mots est le plus précis pour décrire une lumière très faible et terne ?",
        choices: ["éblouissante", "vive", "blafarde", "lumineuse"],
        answer: "blafarde",
        feedback: "Blafarde décrit une lumière faible, froide et sans éclat. Éblouissante, vive et lumineuse désignent au contraire des lumières intenses."
      },
      { id:"mot-adapte-contexte-n2-03",
        type: "mcq",
        instruction: "Complète : « L'alpiniste avait les jambes _____ après avoir gravi le sommet. »",
        choices: ["légères", "cotonneuses", "bronzées", "parfumées"],
        answer: "cotonneuses",
        feedback: "« Avoir les jambes cotonneuses (en coton) » exprime la fatigue musculaire extrême. Légères est le contraire, bronzées et parfumées ne correspondent pas à ce contexte."
      },
      { id:"mot-adapte-contexte-n2-04",
        type: "mcq",
        instruction: "Complète : « Le conférencier _____ l'assistance avec son exposé passionnant. »",
        choices: ["ennuyait", "captivait", "dormait", "criait"],
        answer: "captivait",
        feedback: "Captiver = retenir entièrement l'attention. Un exposé passionnant captive son auditoire. Ennuyer est le contraire."
      },
      { id:"mot-adapte-contexte-n2-05",
        type: "col-sort",
        instruction: "Classe chaque mot selon le contexte où il convient pour décrire le mouvement de l'eau.",
        colA: "Un ruisseau calme",
        colB: "Un torrent ou une tempête",
        items: [
          { text: "murmure", answer: "A", feedback: "L'eau d'un ruisseau murmure : son doux et discret." },
          { text: "déferle", answer: "B", feedback: "Les vagues déferlent avec force et violence." },
          {
            text: "glouglote",
            answer: "A",
            feedback: "L'eau glouglote en coulant doucement sur des cailloux."
          },
          {
            text: "gronde",
            answer: "B",
            feedback: "Un torrent en crue gronde avec une puissance terrifiante."
          },
          {
            text: "babille",
            answer: "A",
            feedback: "L'eau babille agréablement dans un ruisseau de montagne."
          }
        ],
        feedback: "Le choix du verbe crée une image précise : murmure/glouglote/babille pour la douceur, déferle/gronde pour la puissance. C'est le lexique de l'eau en mouvement."
      },
      { id:"mot-adapte-contexte-n2-06",
        type: "mcq",
        instruction: "Complète la phrase : « Au printemps, les bourgeons des arbres _____ et donnent de nouvelles feuilles. »",
        choices: ["éclosent", "tombent", "gèlent", "jaunissent"],
        answer: "éclosent",
        feedback: "Au printemps, les bourgeons éclosent (s'ouvrent). Tomber, geler et jaunir correspondent plutôt à l'automne ou à l'hiver."
      },
      { id:"mot-adapte-contexte-n2-07",
        type: "mcq",
        instruction: "Lequel de ces mots est le plus précis pour décrire une odeur désagréable et forte ?",
        choices: ["parfumée", "fade", "nauséabonde", "sucrée"],
        answer: "nauséabonde",
        feedback: "Nauséabonde décrit une odeur forte et écœurante qui donne la nausée. Parfumée, fade et sucrée ne conviennent pas pour une odeur désagréable."
      },
      { id:"mot-adapte-contexte-n2-08",
        type: "mcq",
        instruction: "Complète : « Après la course, le sportif avait le souffle _____. »",
        choices: ["léger", "court", "parfumé", "silencieux"],
        answer: "court",
        feedback: "« Avoir le souffle court » signifie respirer difficilement après un effort. Les autres adjectifs ne conviennent pas à ce contexte."
      },
      { id:"mot-adapte-contexte-n2-09",
        type: "mcq",
        instruction: "Complète : « Le clown _____ les enfants avec ses grimaces amusantes. »",
        choices: ["effrayait", "amusait", "ennuyait", "endormait"],
        answer: "amusait",
        feedback: "Amuser = faire rire, divertir. Des grimaces amusantes amusent les enfants. Effrayer et ennuyer sont des contraires dans ce contexte."
      },
      { id:"mot-adapte-contexte-n2-10",
        type: "col-sort",
        instruction: "Classe chaque mot selon le contexte où il convient pour décrire le vent.",
        colA: "Un vent léger",
        colB: "Une tempête violente",
        items: [
          { text: "caresse", answer: "A", feedback: "Un vent léger caresse doucement le visage." },
          { text: "déchaîne", answer: "B", feedback: "Le vent se déchaîne avec une force destructrice." },
          { text: "frôle", answer: "A", feedback: "Une brise frôle légèrement la peau." },
          { text: "hurle", answer: "B", feedback: "Le vent hurle dans la tempête, avec un bruit puissant." },
          { text: "effleure", answer: "A", feedback: "Le vent effleure les feuilles sans les agiter fortement." }
        ],
        feedback: "Le choix du verbe crée une image précise : caresse/frôle/effleure pour la douceur, déchaîne/hurle pour la puissance. C'est le lexique du vent."
      }
    ],
    level3Bank: [
      { id:"mot-adapte-contexte-n3-01",
        type: "mcq",
        instruction: "Quel mot convient le mieux dans : « Sa remarque, bien que _____, m'a blessé. » ?",
        choices: ["anodine", "hurlée", "parfumée", "froide"],
        answer: "anodine",
        feedback: "Anodine = sans importance apparente, sans gravité. La phrase dit que la remarque semblait insignifiante mais a pourtant blessé — c'est le sens voulu."
      },
      { id:"mot-adapte-contexte-n3-02",
        type: "mcq",
        instruction: "Dans : « Ce discours a _____ l'assemblée », quel verbe convient pour exprimer l'ennui causé par un exposé confus ?",
        choices: ["fasciné", "lassé", "réjoui", "émerveillé"],
        answer: "lassé",
        feedback: "Lasser = ennuyer, fatiguer par excès ou manque d'intérêt. Un discours confus lasse son auditoire. Fasciner, réjouir, émerveiller expriment tous des réactions positives."
      },
      { id:"mot-adapte-contexte-n3-03",
        type: "col-sort",
        instruction: "Classe ces adjectifs selon la connotation qu'ils donnent à un sourire.",
        colA: "Sourire positif (chaleur, sincérité)",
        colB: "Sourire négatif ou ambigu (ironie, froideur)",
        items: [
          {
            text: "radieux",
            answer: "A",
            feedback: "Radieux = qui rayonne de bonheur. Sourire très positif."
          },
          { text: "narquois", answer: "B", feedback: "Narquois = moqueur, plein d'ironie cachée." },
          { text: "épanoui", answer: "A", feedback: "Épanoui = plein de joie et de vitalité." },
          {
            text: "ironique",
            answer: "B",
            feedback: "Ironique = qui exprime le contraire de ce qu'on dit vraiment."
          },
          {
            text: "chaleureux",
            answer: "A",
            feedback: "Chaleureux = qui exprime de la bienveillance sincère."
          }
        ],
        feedback: "Le choix de l'adjectif change complètement l'image donnée. Un sourire « radieux » et un sourire « narquois » ne traduisent pas du tout la même attitude."
      },
      { id:"mot-adapte-contexte-n3-04",
        type: "mcq",
        instruction: "Dans : « Il la regarda avec une moue _____ », quel adjectif exprime le mieux le dédain ?",
        choices: ["admirative", "méprisante", "affectueuse", "attendrie"],
        answer: "méprisante",
        feedback: "Une moue méprisante exprime le dédain, le peu d'estime. Une moue admirative, affectueuse ou attendrie exprimerait au contraire des sentiments positifs."
      },
      { id:"mot-adapte-contexte-n3-05",
        type: "match",
        instruction: "Associe chaque mot à la phrase où il est le mieux adapté.",
        pairs: [
          { left: "fulgurant", right: "Un progrès fulgurant en quelques jours" },
          { left: "lancinant", right: "Une douleur lancinante qui ne cesse pas" },
          { left: "lugubre", right: "Une mélodie lugubre jouée aux funérailles" }
        ],
        feedback: "Fulgurant = très rapide (comme l'éclair). Lancinant = qui revient sans cesse (douleur persistante). Lugubre = sombre et triste, lié à la mort."
      },
      { id:"mot-adapte-contexte-n3-06",
        type: "mcq",
        instruction: "Quel mot convient le mieux dans : « Son silence, pourtant _____, en disait long. » ?",
        choices: ["bruyant", "éloquent", "sucré", "rapide"],
        answer: "éloquent",
        feedback: "Éloquent = qui exprime beaucoup sans avoir besoin de mots. Un « silence éloquent » est une expression courante et pertinente ici, contrairement à « silence bruyant » qui est contradictoire."
      },
      { id:"mot-adapte-contexte-n3-07",
        type: "mcq",
        instruction: "Dans : « Ses propos ont _____ toute l'assistance », quel verbe convient pour exprimer une indignation collective ?",
        choices: ["ravi", "outré", "amusé", "attendri"],
        answer: "outré",
        feedback: "Outrer = provoquer une vive indignation. Des propos choquants outrent l'assistance. Ravir, amuser et attendrir expriment des réactions positives ou neutres."
      },
      { id:"mot-adapte-contexte-n3-08",
        type: "col-sort",
        instruction: "Classe ces adjectifs selon la connotation qu'ils donnent à un regard.",
        colA: "Regard positif (douceur, bienveillance)",
        colB: "Regard négatif ou ambigu (dureté, mépris)",
        items: [
          { text: "tendre", answer: "A", feedback: "Tendre = plein d'affection et de douceur." },
          { text: "glacial", answer: "B", feedback: "Glacial = froid, sans chaleur humaine, hostile." },
          { text: "bienveillant", answer: "A", feedback: "Bienveillant = qui veut du bien, plein de gentillesse." },
          { text: "perçant", answer: "B", feedback: "Perçant peut évoquer un regard dur qui transperce, gênant." },
          { text: "complice", answer: "A", feedback: "Complice = qui exprime une entente secrète et chaleureuse." }
        ],
        feedback: "Le choix de l'adjectif change complètement l'image donnée. Un regard « tendre » et un regard « glacial » ne traduisent pas la même émotion."
      },
      { id:"mot-adapte-contexte-n3-09",
        type: "mcq",
        instruction: "Dans : « Il répondit d'un ton _____ », quel adjectif exprime le mieux l'arrogance ?",
        choices: ["hésitant", "hautain", "timide", "ému"],
        answer: "hautain",
        feedback: "Un ton hautain exprime le mépris et la supériorité affichée. Hésitant, timide et ému traduisent au contraire de la retenue ou de la sensibilité."
      },
      { id:"mot-adapte-contexte-n3-10",
        type: "match",
        instruction: "Associe chaque mot à la phrase où il est le mieux adapté.",
        pairs: [
          { left: "éphémère", right: "Une beauté éphémère, qui ne dure qu'un instant" },
          { left: "obsédant", right: "Un air de musique obsédant qui revient sans cesse en tête" },
          { left: "sibyllin", right: "Une réponse sibylline, difficile à comprendre" }
        ],
        feedback: "Éphémère = qui dure très peu de temps. Obsédant = qui occupe constamment l'esprit. Sibyllin = mystérieux, dont le sens est caché."
      }
    ]
  },

  "niveaux-de-langue": {
    title: "Distinguer les niveaux de langue",
    domaine: "Français",
    competence: "Vocabulaire — Distinguer les niveaux de langue",
    type: "vocabulaire-niveaux",
    levels: ["6e"],
    paliers: 3,
    backLink: { href: "français-lexique.html", label: "Vocabulaire" },
    levelDescs: {
      "1": "Les trois registres — reconnaître le familier et le soutenu",
      "2": "Les trois registres — nuances et équivalences",
      "3": "Analyse fine, effets de style et maîtrise des registres"
    },
    level1Bank: [
      { id:"niveaux-de-langue-n1-01",
        type: "mcq",
        instruction: "Quelle phrase est au registre familier ?",
        choices: [
          "Je n'ai pas vu ce film.",
          "J'ai pas vu ce film.",
          "Je n'ai point visionné ce long métrage.",
          "Ce film m'est inconnu."
        ],
        answer: "J'ai pas vu ce film.",
        feedback: "« J'ai pas vu » omet la première partie de la négation (ne). C'est typique du registre familier. Le registre courant dirait « Je n'ai pas vu » ; le soutenu, « Je n'ai point visionné »."
      },
      { id:"niveaux-de-langue-n1-02",
        type: "col-sort",
        instruction: "Classe chaque expression selon son niveau de langue.",
        colA: "Registre familier",
        colB: "Registre courant ou soutenu",
        items: [
          {
            text: "C'est ouf !",
            answer: "A",
            feedback: "« Ouf » est du verlan (= fou). Très familier, argotique."
          },
          { text: "C'est extraordinaire.", answer: "B", feedback: "Courant ou soutenu selon le contexte." },
          {
            text: "J'ai la dalle.",
            answer: "A",
            feedback: "« Avoir la dalle » = avoir faim. Expression familière."
          },
          {
            text: "Je n'ai pas faim.",
            answer: "B",
            feedback: "Négation correcte, vocabulaire neutre. Registre courant."
          },
          {
            text: "Mon pote est arrivé.",
            answer: "A",
            feedback: "« Pote » = ami. Mot familier ou argotique."
          }
        ],
        feedback: "Le registre familier se reconnaît à l'absence de la négation complète, aux mots argotiques ou au verlan. Le registre courant respecte les règles grammaticales standard."
      },
      { id:"niveaux-de-langue-n1-03",
        type: "mcq",
        instruction: "Quel mot est de niveau soutenu pour dire « triste » ?",
        choices: ["cafardeux", "triste", "mélancolique", "déprimé"],
        answer: "mélancolique",
        feedback: "Mélancolique est un terme littéraire et soutenu. Triste est courant. Cafardeux est familier (avoir le cafard = être triste). Déprimé est courant/médical."
      },
      { id:"niveaux-de-langue-n1-04",
        type: "mcq",
        instruction: "À quel niveau de langue appartient : « Veuillez agréer l'expression de mes sincères salutations » ?",
        choices: ["Familier", "Courant", "Soutenu", "Argotique"],
        answer: "Soutenu",
        feedback: "Cette formule de politesse très formelle appartient au registre soutenu. Elle est utilisée dans les lettres officielles, les courriers administratifs."
      },
      { id:"niveaux-de-langue-n1-05",
        type: "mcq",
        instruction: "Dans quelle situation utilise-t-on le registre familier ?",
        choices: [
          "Dans une lettre au directeur de l'école",
          "Lors d'un exposé oral en classe",
          "En discutant avec ses amis proches",
          "Dans un texte officiel"
        ],
        answer: "En discutant avec ses amis proches",
        feedback: "Le registre familier est adapté aux situations informelles : avec des amis, en famille, dans un cadre détendu. Il ne convient pas aux situations formelles."
      },
      { id:"niveaux-de-langue-n1-06",
        type: "mcq",
        instruction: "Quelle phrase est au registre soutenu pour dire qu'on va manger ?",
        choices: ["Je vais bouffer.", "Je vais manger.", "Je vais me restaurer.", "Je vais becter."],
        answer: "Je vais me restaurer.",
        feedback: "« Se restaurer » est un terme soutenu. « Manger » est courant. « Bouffer » et « becter » sont très familiers, presque argotiques."
      },
      { id:"niveaux-de-langue-n1-07",
        type: "col-sort",
        instruction: "Classe chaque expression selon son niveau de langue.",
        colA: "Registre familier",
        colB: "Registre courant ou soutenu",
        items: [
          { text: "Il est vachement fort.", answer: "A", feedback: "« Vachement » est un intensif familier." },
          { text: "Il est très compétent.", answer: "B", feedback: "Vocabulaire neutre et correct. Registre courant." },
          { text: "Elle a la flemme.", answer: "A", feedback: "« Avoir la flemme » = ne pas avoir envie de faire un effort. Familier." },
          { text: "Elle n'a pas envie de sortir.", answer: "B", feedback: "Formulation claire et neutre. Registre courant." },
          { text: "Ce mec est sympa.", answer: "A", feedback: "« Mec » pour désigner un homme est familier." }
        ],
        feedback: "Les intensifs comme « vachement », ou des mots comme « flemme » et « mec », marquent le registre familier."
      },
      { id:"niveaux-de-langue-n1-08",
        type: "mcq",
        instruction: "Quel mot est de niveau soutenu pour dire « content » ?",
        choices: ["content", "comblé", "joyeux", "trop content"],
        answer: "comblé",
        feedback: "« Comblé » (pleinement satisfait) est un terme soutenu. « Content » et « joyeux » sont courants. « Trop content » utilise un intensif familier."
      },
      { id:"niveaux-de-langue-n1-09",
        type: "mcq",
        instruction: "À quel niveau de langue appartient : « Puis-je me permettre de vous interrompre un instant ? »",
        choices: ["Familier", "Courant", "Soutenu", "Argotique"],
        answer: "Soutenu",
        feedback: "Cette formule de politesse recherchée, avec « me permettre », relève du registre soutenu."
      },
      { id:"niveaux-de-langue-n1-10",
        type: "mcq",
        instruction: "Dans quelle situation utilise-t-on plutôt le registre soutenu ?",
        choices: [
          "En jouant avec son petit frère",
          "Lors d'un entretien avec le principal du collège",
          "En envoyant un message à un copain",
          "Dans la cour de récréation"
        ],
        answer: "Lors d'un entretien avec le principal du collège",
        feedback: "Face à un adulte inconnu dans un cadre officiel, un registre soigné, voire soutenu, est attendu."
      }
    ],
    level2Bank: [
      { id:"niveaux-de-langue-n2-01",
        type: "mcq",
        instruction: "Laquelle de ces phrases est au registre soutenu ?",
        choices: [
          "Ce bouquin est trop bien !",
          "J'ai beaucoup aimé ce livre.",
          "Cet ouvrage m'a profondément marqué.",
          "Ce livre, il est super."
        ],
        answer: "Cet ouvrage m'a profondément marqué.",
        feedback: "« Ouvrage » est plus soutenu que « livre » ou « bouquin ». « Profondément marqué » est une formulation recherchée. Les autres phrases sont familières ou courantes."
      },
      { id:"niveaux-de-langue-n2-02",
        type: "col-sort",
        instruction: "Classe ces phrases selon leur niveau de langue.",
        colA: "Registre familier",
        colB: "Registre soutenu",
        items: [
          {
            text: "Il a un boulot de ouf.",
            answer: "A",
            feedback: "« Boulot » = travail, « de ouf » = incroyable. Double marque familière."
          },
          {
            text: "Il exerce une profession éminente.",
            answer: "B",
            feedback: "« Profession éminente » est une formulation recherchée et soutenue."
          },
          {
            text: "T'as qu'à te bouger.",
            answer: "A",
            feedback: "« T'as qu'à » = tu n'as qu'à. Contraction familière."
          },
          {
            text: "Il vous serait aisé d'agir promptement.",
            answer: "B",
            feedback: "« Aisé » (= facile) et « promptement » (= rapidement) sont des termes soutenus."
          },
          {
            text: "C'est chelou ce truc.",
            answer: "A",
            feedback: "« Chelou » (verlan de louche) et « truc » sont très familiers."
          }
        ],
        feedback: "Entre le familier et le soutenu, le registre courant est celui qu'on utilise dans la vie quotidienne normale : correct sans être recherché."
      },
      { id:"niveaux-de-langue-n2-03",
        type: "mcq",
        instruction: "Quel est l'équivalent soutenu de « Il s'est baladé en ville » ?",
        choices: ["Il s'est promené en ville.", "Il a déambulé dans la cité.", "Il a tourné en rond.", "Il a traîné."],
        answer: "Il a déambulé dans la cité.",
        feedback: "Déambuler = se promener sans but précis. C'est un terme soutenu. « Cité » pour désigner la ville est aussi plus soutenu. Se promener est courant, traîner et tourner en rond sont familiers."
      },
      { id:"niveaux-de-langue-n2-04",
        type: "match",
        instruction: "Associe chaque expression familière à son équivalent courant.",
        pairs: [
          { left: "J'ai la dalle.", right: "J'ai faim." },
          { left: "C'est nul.", right: "C'est mauvais." },
          { left: "Il se tire.", right: "Il part." }
        ],
        feedback: "Passer du familier au courant consiste souvent à changer le vocabulaire et à respecter la syntaxe standard (negation complète, pronoms corrects)."
      },
      { id:"niveaux-de-langue-n2-05",
        type: "mcq",
        instruction: "Pourquoi adapter son niveau de langue selon la situation ?",
        choices: [
          "Pour impressionner les gens",
          "Pour communiquer de façon adaptée et respectueuse selon l'interlocuteur et le contexte",
          "Parce que c'est une règle arbitraire sans raison",
          "Parce qu'il n'existe qu'une seule façon correcte de parler"
        ],
        answer: "Pour communiquer de façon adaptée et respectueuse selon l'interlocuteur et le contexte",
        feedback: "Adapter son registre, c'est montrer qu'on comprend la situation. Parler avec soin à un directeur ou à un inconnu est une forme de respect. Il n'y a pas de registre supérieur à un autre : chacun a sa place."
      },
      { id:"niveaux-de-langue-n2-06",
        type: "mcq",
        instruction: "Quelle phrase relève du registre courant (ni familier, ni soutenu) ?",
        choices: [
          "Ce type est franchement space.",
          "Cet individu affiche un comportement singulier.",
          "Cette personne se comporte de façon étrange.",
          "C'est un vrai ouf, ce gars."
        ],
        answer: "Cette personne se comporte de façon étrange.",
        feedback: "« Type », « space » et « gars » sont familiers ; « individu... singulier » est soutenu. « Cette personne se comporte de façon étrange » est neutre : c'est le registre courant."
      },
      { id:"niveaux-de-langue-n2-07",
        type: "col-sort",
        instruction: "Classe ces phrases selon leur niveau de langue.",
        colA: "Registre familier",
        colB: "Registre courant",
        items: [
          { text: "Il a la pêche ce matin.", answer: "A", feedback: "« Avoir la pêche » = être en forme. Familier." },
          { text: "Il est plein d'énergie ce matin.", answer: "B", feedback: "Formulation neutre. Registre courant." },
          { text: "Elle s'est fait larguer.", answer: "A", feedback: "« Larguer » = quitter quelqu'un. Familier." },
          { text: "Elle a été quittée par son compagnon.", answer: "B", feedback: "Vocabulaire neutre et précis. Registre courant." },
          { text: "C'est trop la honte.", answer: "A", feedback: "Expression familière d'intensité." }
        ],
        feedback: "Le registre familier multiplie les expressions imagées et les intensifs ; le registre courant reste neutre et précis."
      },
      { id:"niveaux-de-langue-n2-08",
        type: "mcq",
        instruction: "Quel est l'équivalent soutenu de « Il a flippé pendant l'examen » ?",
        choices: [
          "Il a eu peur pendant l'examen.",
          "Il a éprouvé une vive appréhension pendant l'épreuve.",
          "Il a stressé à mort.",
          "Il a eu la trouille."
        ],
        answer: "Il a éprouvé une vive appréhension pendant l'épreuve.",
        feedback: "« Flipper », « stresser à mort » et « avoir la trouille » sont familiers. « Avoir peur » est courant. « Éprouver une vive appréhension » est soutenu."
      },
      { id:"niveaux-de-langue-n2-09",
        type: "match",
        instruction: "Associe chaque expression familière à son équivalent courant.",
        pairs: [
          { left: "Il a claqué son argent de poche.", right: "Il a dépensé son argent de poche." },
          { left: "Elle est carrément balaise en maths.", right: "Elle est très douée en maths." },
          { left: "On s'est pris la tête.", right: "On s'est disputés." }
        ],
        feedback: "Passer du familier au courant, c'est remplacer les mots imagés par un vocabulaire neutre et précis."
      },
      { id:"niveaux-de-langue-n2-10",
        type: "mcq",
        instruction: "Pourquoi certains mots familiers sont-ils à éviter dans un travail scolaire écrit ?",
        choices: [
          "Parce qu'ils sont toujours grossiers",
          "Parce que l'écrit scolaire demande un registre courant ou soutenu, plus précis et mieux accepté à l'école",
          "Parce qu'ils n'existent pas dans le dictionnaire",
          "Parce qu'ils sont trop courts"
        ],
        answer: "Parce que l'écrit scolaire demande un registre courant ou soutenu, plus précis et mieux accepté à l'école",
        feedback: "Le registre familier n'est pas fautif en soi, mais il n'est pas adapté à l'écrit scolaire, qui exige précision et neutralité."
      }
    ],
    level3Bank: [
      { id:"niveaux-de-langue-n3-01",
        type: "col-sort",
        instruction: "Classe ces phrases selon leur niveau de langue.",
        colA: "Registre courant",
        colB: "Registre soutenu",
        items: [
          {
            text: "Je pense que tu as tort.",
            answer: "A",
            feedback: "Courant : syntaxe simple et directe, vocabulaire neutre."
          },
          {
            text: "Il m'appert que votre position est erronée.",
            answer: "B",
            feedback: "« Il m'appert » = il m'apparaît, « erronée » = fausse. Termes très soutenus."
          },
          { text: "Le film était bien.", answer: "A", feedback: "Courant : formulation simple et directe." },
          {
            text: "Ce long métrage m'a vivement impressionné.",
            answer: "B",
            feedback: "« Long métrage » et « vivement impressionné » sont des formulations recherchées."
          },
          {
            text: "Je ne suis pas d'accord.",
            answer: "A",
            feedback: "Courant : négation correcte, vocabulaire neutre et précis."
          }
        ],
        feedback: "Le registre soutenu se reconnaît à l'emploi de termes rares, de tournures complexes et d'un vocabulaire précis et recherché."
      },
      { id:"niveaux-de-langue-n3-02",
        type: "mcq",
        instruction: "Quel est l'effet produit par l'utilisation d'un registre soutenu dans un texte ?",
        choices: [
          "Le texte semble plus amusant",
          "Le texte devient toujours incompréhensible",
          "Le texte gagne en précision, en élégance et en distance",
          "Le texte devient plus court"
        ],
        answer: "Le texte gagne en précision, en élégance et en distance",
        feedback: "Le registre soutenu permet d'exprimer des nuances fines, de créer de la distance ou de donner un ton solennel. Mais utilisé de façon excessive, il peut aussi paraître artificiel."
      },
      { id:"niveaux-de-langue-n3-03",
        type: "match",
        instruction: "Associe chaque formule soutenue à son équivalent courant.",
        pairs: [
          { left: "Il convient de partir à l'heure.", right: "Il faut partir à l'heure." },
          { left: "Je sollicite votre aide.", right: "Je vous demande votre aide." },
          { left: "Cela m'est fort agréable.", right: "Ça me plaît beaucoup." }
        ],
        feedback: "Solliciter = demander (soutenu), convenir = être nécessaire (soutenu), fort agréable = très agréable (soutenu). Le registre soutenu ajoute formalité et distance."
      },
      { id:"niveaux-de-langue-n3-04",
        type: "mcq",
        instruction: "Dans un discours officiel ou un exposé, quel niveau de langue est le plus approprié ?",
        choices: [
          "Exclusivement familier",
          "Courant, avec des touches soutenues selon les passages",
          "Argotique",
          "N'importe lequel : le contenu seul compte"
        ],
        answer: "Courant, avec des touches soutenues selon les passages",
        feedback: "Un exposé ou un discours officiel appelle un registre courant soigné, parfois soutenu pour les passages importants. Le registre familier ou argotique serait inadapté et ferait perdre en crédibilité."
      },
      { id:"niveaux-de-langue-n3-05",
        type: "col-sort",
        instruction: "Classe chaque paire selon le niveau de langue : familier ou soutenu ?",
        colA: "Registre familier",
        colB: "Registre soutenu",
        items: [
          { text: "la bouffe", answer: "A", feedback: "Bouffe = nourriture. Très familier." },
          {
            text: "la pitance",
            answer: "B",
            feedback: "Pitance = nourriture. Terme soutenu, presque vieilli."
          },
          { text: "la bagnole", answer: "A", feedback: "Bagnole = voiture. Familier." },
          { text: "le véhicule", answer: "B", feedback: "Véhicule = moyen de transport. Courant/soutenu." },
          { text: "le pognon", answer: "A", feedback: "Pognon = argent. Très familier, argotique." }
        ],
        feedback: "Bouffe/pitance, bagnole/véhicule, pognon/argent : ces paires illustrent que le registre change le mot mais pas le sens. Le choix dépend toujours de la situation de communication."
      },
      { id:"niveaux-de-langue-n3-06",
        type: "col-sort",
        instruction: "Classe ces phrases selon leur niveau de langue.",
        colA: "Registre courant",
        colB: "Registre soutenu",
        items: [
          { text: "Ce repas était vraiment bon.", answer: "A", feedback: "Formulation simple, vocabulaire courant." },
          { text: "Ce repas fut un pur délice pour le palais.", answer: "B", feedback: "« Délice » et « palais » (au sens du goût) sont des termes soutenus." },
          { text: "Elle a beaucoup voyagé cette année.", answer: "A", feedback: "Courant : phrase simple et directe." },
          { text: "Elle a parcouru maintes contrées au cours de cette année.", answer: "B", feedback: "« Maintes » (= beaucoup de) et « contrées » sont des termes littéraires et soutenus." },
          { text: "Le professeur a expliqué la leçon clairement.", answer: "A", feedback: "Courant : vocabulaire neutre, syntaxe simple." }
        ],
        feedback: "Les termes littéraires comme « maintes », « délice » ou « contrées » signalent le registre soutenu, à l'inverse des phrases simples et directes du registre courant."
      },
      { id:"niveaux-de-langue-n3-07",
        type: "mcq",
        instruction: "Quel effet produit l'emploi d'un mot familier dans un texte globalement soutenu ?",
        choices: [
          "Cela renforce toujours le sérieux du texte",
          "Cela peut créer un effet comique ou une rupture de ton volontaire",
          "Cela n'a jamais d'effet particulier",
          "Cela rend le texte plus long"
        ],
        answer: "Cela peut créer un effet comique ou une rupture de ton volontaire",
        feedback: "Le mélange des registres est un procédé stylistique : il peut surprendre, faire rire ou caractériser un personnage par contraste."
      },
      { id:"niveaux-de-langue-n3-08",
        type: "match",
        instruction: "Associe chaque formule soutenue à son équivalent courant.",
        pairs: [
          { left: "Nul n'est censé ignorer la loi.", right: "Tout le monde doit connaître la loi." },
          { left: "Je vous serais reconnaissant de bien vouloir répondre.", right: "Merci de répondre." },
          { left: "Il éprouve une vive contrariété.", right: "Il est très énervé." }
        ],
        feedback: "Censé, reconnaissant, contrariété : ces mots ajoutent de la distance et de la formalité, typiques du registre soutenu."
      },
      { id:"niveaux-de-langue-n3-09",
        type: "mcq",
        instruction: "Dans un dialogue de roman, un auteur fait parler un personnage en registre très familier. Quel est l'intérêt de ce choix ?",
        choices: [
          "Rendre le personnage plus réaliste et donner des indices sur son milieu social ou son caractère",
          "Montrer que l'auteur écrit mal",
          "Simplifier la lecture pour les jeunes enfants",
          "Aucun intérêt particulier"
        ],
        answer: "Rendre le personnage plus réaliste et donner des indices sur son milieu social ou son caractère",
        feedback: "Le choix du registre dans un dialogue est un outil de caractérisation : il renseigne sur qui parle et d'où il vient."
      },
      { id:"niveaux-de-langue-n3-10",
        type: "col-sort",
        instruction: "Classe chaque mot selon le niveau de langue : courant ou soutenu ?",
        colA: "Registre courant",
        colB: "Registre soutenu",
        items: [
          { text: "la maison", answer: "A", feedback: "Maison est le mot courant pour désigner une habitation." },
          { text: "la demeure", answer: "B", feedback: "Demeure est un terme soutenu, littéraire, pour désigner une habitation." },
          { text: "le travail", answer: "A", feedback: "Mot neutre et courant." },
          { text: "le labeur", answer: "B", feedback: "Labeur est un terme soutenu qui insiste sur la pénibilité de l'effort." },
          { text: "l'effroi", answer: "B", feedback: "Effroi est un terme soutenu et littéraire pour désigner une grande peur." }
        ],
        feedback: "Demeure, labeur, effroi appartiennent au vocabulaire soutenu et littéraire, alors que maison et travail sont les mots du quotidien."
      }
    ]
  }

});

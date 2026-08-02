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
      {
        type: "click-sort",
        instruction: "Clique sur les mots dans l'ordre alphabétique (du premier au dernier).",
        words: ["soleil", "arbre", "nuage", "fleur"],
        answer: ["arbre", "fleur", "nuage", "soleil"],
        feedback: "A vient avant F, F avant N, N avant S : arbre → fleur → nuage → soleil."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel mot vient en PREMIER dans le dictionnaire ?",
        choices: ["tigre", "renard", "aigle", "zèbre"],
        answer: "aigle",
        feedback: "A est la première lettre de l'alphabet. Aigle commence par A, donc c'est le premier."
      },
      {
        type: "click-sort",
        instruction: "Clique sur les mots dans l'ordre alphabétique.",
        words: ["vache", "canard", "mouton", "lapin"],
        answer: ["canard", "lapin", "mouton", "vache"],
        feedback: "C < L < M < V : canard → lapin → mouton → vache."
      },
      {
        type: "mcq",
        instruction: "Pour classer des mots dans un dictionnaire, on compare d'abord…",
        choices: ["le nombre de lettres", "le sens du mot", "la première lettre", "la dernière lettre"],
        answer: "la première lettre",
        feedback: "On regarde toujours la première lettre en premier. Si elle est identique, on passe à la deuxième, etc."
      }
    ],
    level2Bank: [
      {
        type: "click-sort",
        instruction: "Ces mots commencent tous par la même lettre. Clique-les dans l'ordre alphabétique.",
        words: ["chameau", "chien", "chat", "cheval"],
        answer: ["chameau", "chat", "cheval", "chien"],
        feedback: "On compare la 2e lettre : tous ont 'h'. On regarde donc la 3e : cha < cha… on regarde la 4e : chameau (m) < chat (t) < cheval (v) < chien (i→ non, chi). Attention : cha-t vs cha-m vs che-v vs chi-en. Cha(m) < cha(t) < che(v) < chi(en)."
      },
      {
        type: "mcq",
        instruction: "Quel mot vient AVANT 'manger' dans le dictionnaire ?",
        choices: ["manque", "manchot", "marché", "marron"],
        answer: "manchot",
        feedback: "manger = m-a-n-g… manchot = m-a-n-c… La 4e lettre : C vient avant G dans l'alphabet, donc manchot précède manger."
      },
      {
        type: "click-sort",
        instruction: "Clique sur ces fruits dans l'ordre alphabétique.",
        words: ["baguette", "banane", "ballon", "barque"],
        answer: ["baguette", "ballon", "banane", "barque"],
        feedback: "ba-g < ba-l < ba-n < ba-r : baguette → ballon → banane → barque."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel mot vient APRÈS 'fleuve' dans le dictionnaire ?",
        choices: ["fleur", "flan", "flûte", "flamme"],
        answer: "flûte",
        feedback: "fleuve = f-l-e-u-v. Les autres : fleur (fl-e-u-r, r < v), flan (fl-a, a < e), flamme (fl-a, a < e), flûte (fl-û, û > e). Donc flûte vient après fleuve."
      }
    ],
    level3Bank: [
      {
        type: "click-sort",
        instruction: "Classement délicat ! Clique ces mots dans l'ordre du dictionnaire.",
        words: ["client", "cloche", "clé", "classe", "clown"],
        answer: ["classe", "clé", "client", "cloche", "clown"],
        feedback: "cla- < clé- < cli- < clo-c < clo-w. À la 3e lettre : a < é < i < o. Pour cloche et clown : 4e lettre c < w."
      },
      {
        type: "mcq",
        instruction: "On cherche 'trace' dans le dictionnaire. Entre quels mots se trouve-t-il ?",
        choices: ["entre 'tracer' et 'tradition'", "avant 'trac'", "entre 'trac' et 'tracer'", "après 'tradition'"],
        answer: "entre 'trac' et 'tracer'",
        feedback: "trac (4 lettres) < trace (5 lettres, ajoute un e) < tracer (6 lettres, ajoute er). Un mot plus court précède toujours le mot dont il est le début."
      },
      {
        type: "click-sort",
        instruction: "Classe ces mots dans l'ordre du dictionnaire.",
        words: ["préférer", "premier", "prendre", "prairie"],
        answer: ["prairie", "préférer", "premier", "prendre"],
        feedback: "pr-a < pr-é (=pré) < pr-e-m < pr-e-n. Prairie commence par pra. Préférer par pré. Premier et prendre par pre : m vient avant n, donc premier < prendre."
      },
      {
        type: "mcq",
        instruction: "Pour ranger 'acacia' et 'accent' dans le dictionnaire, quelle lettre compare-t-on en 3e position ?",
        choices: ["a", "c", "c (encore)", "e"],
        answer: "e",
        feedback: "ac-a-cia vs ac-c-ent : la 1re lettre est 'a' pour les deux, la 2e est 'c' pour les deux. On compare la 3e : 'a' (acacia) vs 'c' (accent). A < C, donc acacia vient avant accent."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel est le synonyme de 'content' ?",
        choices: ["triste", "heureux", "fâché", "inquiet"],
        answer: "heureux",
        feedback: "Content et heureux expriment tous les deux un sentiment de joie. Ce sont des synonymes : ils ont un sens très proche."
      },
      {
        type: "mcq",
        instruction: "Quel est le synonyme de 'rapide' ?",
        choices: ["lent", "vif", "calme", "silencieux"],
        answer: "vif",
        feedback: "Rapide et vif signifient tous les deux 'qui se déplace ou agit vite'. Ce sont des synonymes."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à son synonyme. Clique un mot à gauche, puis son synonyme à droite.",
        pairs: [
          { left: "commencer", right: "débuter" },
          { left: "fatigué", right: "épuisé" },
          { left: "petit", right: "minuscule" }
        ],
        feedback: "Commencer = débuter, fatigué = épuisé, petit = minuscule. Les synonymes peuvent différer légèrement en intensité."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel mot peut remplacer 'courageux' sans changer le sens de la phrase ?",
        choices: ["peureux", "vaillant", "timide", "maladroit"],
        answer: "vaillant",
        feedback: "Courageux et vaillant signifient tous les deux 'qui n'a pas peur du danger'. Vaillant est un synonyme un peu plus littéraire."
      }
    ],
    level2Bank: [
      {
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
      {
        type: "mcq",
        instruction: "Pour parler de la démarche d'un lion, quel synonyme de 'marcher' est le plus précis ?",
        choices: ["trottiner", "chanceler", "rôder", "traîner"],
        answer: "rôder",
        feedback: "Rôder signifie marcher lentement en cherchant, en surveillant. C'est le synonyme le plus adapté pour un lion qui chasse."
      },
      {
        type: "mcq",
        instruction: "Dans la phrase 'Le scientifique a analysé le produit', quel synonyme de 'analysé' convient le mieux ?",
        choices: ["regardé", "examiné minutieusement", "goûté", "dessiné"],
        answer: "examiné minutieusement",
        feedback: "Dans un contexte scientifique, analyser implique une observation détaillée et méthodique. 'Examiné minutieusement' rend cette précision mieux que simplement 'regardé'."
      },
      {
        type: "match",
        instruction: "Associe les synonymes de l'adjectif 'grand' selon leur nuance.",
        pairs: [
          { left: "une grande personne", right: "une personne de haute taille" },
          { left: "un grand artiste", right: "un artiste illustre" },
          { left: "une grande peur", right: "une peur immense" }
        ],
        feedback: "Grand peut signifier 'de haute taille', 'célèbre' ou 'intense' selon le contexte. Le synonyme choisi doit correspondre au sens exact."
      },
      {
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
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Dans un texte sur la mer, quel synonyme de 'bruit' est le plus précis pour parler des vagues ?",
        choices: ["fracas", "tapage", "bavardage", "mélodie"],
        answer: "fracas",
        feedback: "Le fracas évoque un bruit fort et violent, comme celui des vagues qui s'écrasent sur les rochers. C'est le synonyme le plus précis dans ce contexte."
      },
      {
        type: "match",
        instruction: "Associe chaque verbe à son synonyme le plus précis dans le contexte indiqué.",
        pairs: [
          { left: "Le soleil brille (intensément)", right: "Le soleil flamboie" },
          { left: "L'enfant pleure (doucement)", right: "L'enfant geint" },
          { left: "La rivière coule (rapidement)", right: "La rivière dévale" }
        ],
        feedback: "Flamboyer = briller avec éclat, geindre = pleurer faiblement, dévaler = descendre en courant. Les synonymes précis enrichissent le style."
      },
      {
        type: "mcq",
        instruction: "La phrase 'Le directeur était irrité' est au niveau courant. Quel synonyme d'irrité convient dans un texte soutenu ?",
        choices: ["énervé", "en pétard", "courroucé", "de mauvais poil"],
        answer: "courroucé",
        feedback: "Courroucé est un synonyme soutenu et littéraire d'irrité. 'En pétard' et 'de mauvais poil' sont familiers. 'Énervé' reste courant."
      },
      {
        type: "mcq",
        instruction: "Pour éviter la répétition du verbe 'dire' dans un récit, quel synonyme ne convient PAS pour une réponse agressive ?",
        choices: ["vociférer", "répliquer", "murmurer", "crier"],
        answer: "murmurer",
        feedback: "Murmurer signifie parler très doucement. Ce synonyme de 'dire' ne convient pas pour exprimer une réponse agressive. Vociférer, répliquer ou crier sont adaptés."
      },
      {
        type: "match",
        instruction: "Chaque phrase a un mot souligné. Associe-la au synonyme soutenu qui pourrait le remplacer.",
        pairs: [
          { left: "Il habitait là depuis toujours.", right: "Il résidait là depuis toujours." },
          { left: "La fête était très joyeuse.", right: "La fête était très festive." },
          { left: "Elle cherchait la sortie.", right: "Elle quêtait la sortie." }
        ],
        feedback: "Résider (soutenu pour habiter), festif (registre un peu plus soutenu), quêter (chercher avec insistance, plus littéraire)."
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
      {
        type: "mcq",
        instruction: "Quel est l'antonyme (contraire) de 'chaud' ?",
        choices: ["tiède", "froid", "brûlant", "chaud"],
        answer: "froid",
        feedback: "Chaud et froid sont des antonymes : ils ont des sens opposés. Tiède est entre les deux, donc pas l'antonyme strict."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à son contraire. Clique un mot à gauche puis son antonyme à droite.",
        pairs: [
          { left: "jour", right: "nuit" },
          { left: "monter", right: "descendre" },
          { left: "gentil", right: "méchant" }
        ],
        feedback: "Jour ↔ nuit, monter ↔ descendre, gentil ↔ méchant. Les antonymes expriment des idées opposées."
      },
      {
        type: "mcq",
        instruction: "Quel est l'antonyme de 'grand' ?",
        choices: ["gros", "fort", "petit", "haut"],
        answer: "petit",
        feedback: "Grand et petit désignent des tailles opposées : ce sont des antonymes. Gros concerne le volume, pas la taille."
      },
      {
        type: "mcq",
        instruction: "L'antonyme de 'commencer' est…",
        choices: ["débuter", "continuer", "terminer", "avancer"],
        answer: "terminer",
        feedback: "Commencer et terminer sont des antonymes : l'un marque le début, l'autre la fin d'une action."
      },
      {
        type: "match",
        instruction: "Associe chaque adjectif à son contraire.",
        pairs: [
          { left: "fort", right: "faible" },
          { left: "rapide", right: "lent" },
          { left: "propre", right: "sale" }
        ],
        feedback: "Fort ↔ faible, rapide ↔ lent, propre ↔ sale. Les antonymes sont des mots de sens contraire."
      }
    ],
    level2Bank: [
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Dans 'La lumière s'allume', l'antonyme du verbe 's'allume' est…",
        choices: ["s'éteint", "brille", "éclaire", "clignote"],
        answer: "s'éteint",
        feedback: "S'allumer et s'éteindre sont des antonymes : quand une lumière s'allume, elle s'éteint au sens contraire."
      },
      {
        type: "mcq",
        instruction: "Quel est l'antonyme de 'présent' dans la phrase 'L'élève est présent' ?",
        choices: ["absent", "actuel", "passé", "cadeau"],
        answer: "absent",
        feedback: "Dans ce contexte (présence en classe), l'antonyme de présent est absent. Attention : présent peut aussi signifier 'maintenant' ou 'cadeau', avec d'autres antonymes possibles."
      },
      {
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
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Dans un texte littéraire, quel antonyme de 'sombre' est le plus évocateur pour décrire un paysage lumineux ?",
        choices: ["pas sombre", "radieux", "propre", "grand"],
        answer: "radieux",
        feedback: "Radieux (qui rayonne de lumière) est l'antonyme le plus précis et le plus évocateur de 'sombre' dans un contexte littéraire."
      },
      {
        type: "match",
        instruction: "Associe chaque adjectif à son antonyme le plus précis dans le contexte littéraire.",
        pairs: [
          { left: "une voix stridente", right: "une voix veloutée" },
          { left: "un visage austère", right: "un visage affable" },
          { left: "une lumière aveuglante", right: "une lumière tamisée" }
        ],
        feedback: "Strident ↔ velouté (doux, chaud), austère ↔ affable (aimable, souriant), aveuglant ↔ tamisé (doux, atténué)."
      },
      {
        type: "mcq",
        instruction: "L'antonyme de 'espoir' dans le sens philosophique est…",
        choices: ["joie", "désespoir", "bonheur", "inquiétude"],
        answer: "désespoir",
        feedback: "L'espoir est l'attente confiante d'un bien futur. Son contraire le plus fort est le désespoir : l'absence totale d'espoir."
      },
      {
        type: "match",
        instruction: "Ces verbes ont des antonymes différents selon le contexte. Associe chaque emploi à son contraire.",
        pairs: [
          { left: "perdre un match", right: "gagner un match" },
          { left: "perdre ses clés", right: "retrouver ses clés" },
          { left: "perdre du temps", right: "gagner du temps" }
        ],
        feedback: "Perdre un match → gagner ; perdre ses clés → retrouver ; perdre du temps → gagner du temps. Un même verbe a des antonymes différents selon le sens exact."
      },
      {
        type: "mcq",
        instruction: "Dans 'Sa réponse était évasive', l'antonyme exact de 'évasive' est…",
        choices: ["claire", "longue", "sympathique", "étonnante"],
        answer: "claire",
        feedback: "Évasif signifie 'qui évite de répondre franchement'. Son antonyme est 'clair' (direct, sans détour). On peut aussi dire 'précis', 'franc' ou 'explicite'."
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
      {
        type: "mcq",
        instruction: "Que sont 'mère' et 'mer' ?",
        choices: ["Des synonymes", "Des antonymes", "Des homonymes", "Des mots de la même famille"],
        answer: "Des homonymes",
        feedback: "Mère et mer se prononcent de la même façon [mεʁ] mais s'écrivent différemment et ont des sens distincts. Ce sont des homonymes."
      },
      {
        type: "mcq",
        instruction: "Complète : « Nous avons navigué sur la ___ pendant toute la journée. »",
        choices: ["mère", "mer", "maire", "faire"],
        answer: "mer",
        feedback: "On navigue sur la mer (grande étendue d'eau salée). 'Mère' est le parent féminin, 'maire' est le responsable d'une commune."
      },
      {
        type: "match",
        instruction: "Associe chaque homonyme à sa définition.",
        pairs: [
          { left: "verre", right: "récipient pour boire" },
          { left: "vert", right: "couleur entre bleu et jaune" },
          { left: "vers", right: "en direction de" }
        ],
        feedback: "Verre (récipient), vert (couleur), vers (direction ou lignes de poème) sont trois homonymes : même son [vɛʁ], sens très différents."
      },
      {
        type: "mcq",
        instruction: "Qu'est-ce que deux homonymes ont en commun ?",
        choices: ["Le même sens", "La même orthographe", "La même prononciation", "La même longueur"],
        answer: "La même prononciation",
        feedback: "Les homonymes partagent la même prononciation (même son) mais ont des orthographes et/ou des sens différents."
      },
      {
        type: "mcq",
        instruction: "Quel est l'homonyme du mot 'sot' (stupide) ?",
        choices: ["sol", "sort", "seau", "soif"],
        answer: "seau",
        feedback: "Sot [so] (stupide) et seau [so] (récipient) se prononcent exactement pareil. Ce sont des homonymes."
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Choisis le bon mot : « Je voudrais un ___ d'eau, s'il vous plaît. »",
        choices: ["verre (récipient pour boire)", "vert (couleur)", "ver (animal)", "vers (direction)"],
        answer: "verre (récipient pour boire)",
        feedback: "On boit dans un verre. Vert est une couleur, ver est un petit animal, vers indique une direction. Même prononciation [vɛʁ], orthographes et sens différents : ce sont des homonymes."
      },
      {
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
      {
        type: "mcq",
        instruction: "Choisis le bon homonyme : « Il ___ son manteau sur le fauteuil. »",
        choices: ["pose (verbe poser)", "Paul (prénom)", "pot (récipient)", "pauvre"],
        answer: "pose (verbe poser)",
        feedback: "Dans cette phrase, le sujet 'il' a besoin d'un verbe. 'Pose' est le verbe poser conjugué à la 3e personne du singulier. Les homonymes de 'pose' seraient 'peau', 'peut', etc. dans d'autres homonymes."
      },
      {
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
      {
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
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Dans « Ces cèdres cèdent sous le vent », combien de mots se prononcent pareil mais s'écrivent différemment ?",
        choices: ["Aucun", "1 paire : ces/cèdres", "1 paire : ces/cèdent", "2 paires : ces/cèdres et ces/cèdent"],
        answer: "1 paire : ces/cèdent",
        feedback: "'Ces' [se] (déterminant) et 'cèdent' [sɛd] ne se prononcent pas exactement pareil. Mais 'cèdres' [sɛdʁ] et 'cèdent' [sɛd] sont proches. La bonne réponse dépend de la prononciation régionale, mais ce sont surtout 'ces' et le début de 'cèdent'/'cèdres' qui sont homophones."
      },
      {
        type: "match",
        instruction: "Associe chaque paire d'homophones à leur différence grammaticale.",
        pairs: [
          { left: "son / sont", right: "son = déterminant ; sont = verbe être" },
          { left: "ce / se", right: "ce = déterminant/pronom ; se = pronom réfléchi" },
          { left: "leur / leurs", right: "leur = pronom/déterminant sg. ; leurs = déterminant pluriel" }
        ],
        feedback: "Son/sont, ce/se, leur/leurs sont des homophones grammaticaux : même son, mais catégorie grammaticale différente. Pour ne pas les confondre, on analyse le rôle du mot dans la phrase."
      },
      {
        type: "mcq",
        instruction: "Lequel de ces couples n'est PAS une paire d'homonymes ?",
        choices: ["poing / point", "chant / champ", "sain / saint", "maison / manteau"],
        answer: "maison / manteau",
        feedback: "Poing [pwɛ̃] et point [pwɛ̃] sont homonymes. Chant [ʃɑ̃] et champ [ʃɑ̃] sont homonymes. Sain [sɛ̃] et saint [sɛ̃] sont homonymes. Mais maison [mɛzɔ̃] et manteau [mɑ̃to] ne se prononcent pas pareil."
      },
      {
        type: "mcq",
        instruction: "Dans « Il compte sur ses doigts », 'compte' est un homonyme de…",
        choices: ["comte (noble)", "conte (histoire)", "comte et conte à la fois", "aucun mot"],
        answer: "comte et conte à la fois",
        feedback: "Compte [kɔ̃t] (verbe compter), conte [kɔ̃t] (récit merveilleux) et comte [kɔ̃t] (titre de noblesse) sont trois homonymes ! Même prononciation, orthographes et sens très différents."
      },
      {
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
      {
        type: "mcq",
        instruction: "Un mot qui a plusieurs sens différents s'appelle…",
        choices: ["un synonyme", "un antonyme", "un homonyme", "un mot polysémique"],
        answer: "un mot polysémique",
        feedback: "Polysémique vient du grec 'poly' (plusieurs) et 'sema' (sens). Un mot polysémique possède plusieurs définitions différentes dans le dictionnaire."
      },
      {
        type: "mcq",
        instruction: "Le mot 'voler' peut signifier : 1. Se déplacer dans les airs  2. Prendre ce qui ne m'appartient pas. Combien de sens a-t-il ?",
        choices: ["Un seul sens", "Deux sens", "Trois sens", "Aucun sens"],
        answer: "Deux sens",
        feedback: "Voler est polysémique : il a au moins deux sens différents. 'L'oiseau vole' (dans les airs) et 'Il a volé mon sac' (dérober) n'expriment pas du tout la même idée."
      },
      {
        type: "mcq",
        instruction: "Dans « Le feu est rouge », que signifie 'feu' ?",
        choices: ["Un incendie", "Un signal de circulation", "De la chaleur", "Un feu de cheminée"],
        answer: "Un signal de circulation",
        feedback: "Le contexte (couleur rouge, circulation) indique qu'il s'agit d'un feu tricolore. Le sens d'un mot polysémique se trouve grâce au contexte."
      },
      {
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
      {
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
      }
    ],
    level2Bank: [
      {
        type: "match",
        instruction: "Le mot 'tête' a plusieurs sens. Associe chaque phrase au sens utilisé.",
        pairs: [
          { left: "Il a mal à la tête.", right: "Partie supérieure du corps" },
          { left: "Il est en tête du classement.", right: "Première place, leader" },
          { left: "Quelle tête de lard !", right: "Caractère têtu, personne obstinée" }
        ],
        feedback: "Tête peut désigner une partie du corps, une position en tête, ou un caractère difficile. Le contexte révèle le sens polysémique."
      },
      {
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
      {
        type: "match",
        instruction: "Associe chaque emploi du mot 'planche' à son sens.",
        pairs: [
          { left: "Clouer une planche.", right: "Morceau de bois plat" },
          { left: "La planche de surf glisse sur les vagues.", right: "Plaque de matière rigide pour sport" },
          { left: "Regarder les planches de bande dessinée.", right: "Pages de BD avec cases dessinées" }
        ],
        feedback: "Planche est polysémique : bois de construction, équipement de sport, page de BD. C'est le contexte qui précise le sens."
      },
      {
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
      {
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
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Le mot 'pont' signifie 1. ouvrage qui enjambe un cours d'eau 2. partie du navire 3. jour férié entre deux jours chômés. Quel sens 'pont' a-t-il dans 'faire le pont' ?",
        choices: ["Ouvrage sur l'eau", "Partie du navire", "Jour chômé entre deux congés", "Aucun des trois"],
        answer: "Jour chômé entre deux congés",
        feedback: "'Faire le pont' signifie prendre un jour de congé entre deux jours non travaillés (week-end + jour férié). C'est un sens figuré issu de l'idée de 'relier' deux rives."
      },
      {
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
      {
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
      {
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
      {
        type: "match",
        instruction: "Le mot 'lame' a plusieurs sens. Associe chaque emploi à sa définition.",
        pairs: [
          { left: "La lame du couteau.", right: "Partie tranchante d'une arme ou d'un outil" },
          { left: "Les lames de parquet.", right: "Planche mince et allongée" },
          { left: "Les lames déferlent sur la plage.", right: "Vague de la mer" }
        ],
        feedback: "Lame (partie tranchante), lame (planche mince), lame (vague) : trois sens liés par l'idée d'une forme plate et allongée. C'est un glissement de sens typique de la polysémie."
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
      {
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
      {
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
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Dans 'La rivière coule vite', 'couler' est au…",
        choices: ["sens figuré", "sens contraire", "sens propre", "sens polysémique"],
        answer: "sens propre",
        feedback: "L'eau coule vraiment, physiquement. C'est le sens premier et concret du verbe couler. Sens propre."
      }
    ],
    level2Bank: [
      {
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
      {
        type: "mcq",
        instruction: "Que signifie l'expression 'avoir le cafard' au sens figuré ?",
        choices: ["Avoir un insecte chez soi", "Être déprimé, triste", "Avoir faim", "Avoir les idées claires"],
        answer: "Être déprimé, triste",
        feedback: "'Avoir le cafard' est une expression figurée qui signifie 'être triste, mélancolique'. L'insecte (le cafard) est utilisé comme image de quelque chose de désagréable et sombre."
      },
      {
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
      {
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
      {
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
      }
    ],
    level3Bank: [
      {
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
      {
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
      {
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
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Quel mot appartient à la famille de « chant » ?",
        choices: ["chanson", "château", "chance", "charme"],
        answer: "chanson",
        feedback: "Chanson vient du radical « chant ». Château, chance et charme ont une origine différente."
      },
      {
        type: "mcq",
        instruction: "Quel mot N'appartient PAS à la famille de « marcher » ?",
        choices: ["marcheur", "démarche", "marché", "marche"],
        answer: "marché",
        feedback: "Marché vient du latin « mercatus » (commerce), alors que marcheur, démarche et marche viennent tous du verbe marcher (aller à pied)."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à un autre membre de sa famille.",
        pairs: [
          { left: "fleur", right: "fleuriste" },
          { left: "jardin", right: "jardinier" },
          { left: "pêche", right: "pêcheur" }
        ],
        feedback: "Fleuriste, jardinier et pêcheur sont formés à partir des radicaux fleur-, jardin- et pêch-."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel est le radical commun à « porteur », « portage » et « portable » ?",
        choices: ["port", "por", "porte", "portabl"],
        answer: "port",
        feedback: "Le radical « port- » est commun à tous ces mots : port-eur, port-age, port-able. Il vient du verbe porter."
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Quel mot est un intrus dans la famille de « pied » ?",
        choices: ["piéton", "trépied", "piège", "piédestal"],
        answer: "piège",
        feedback: "Piège vient du latin « pedica » (entrave), un mot distinct. Piéton (qui va à pied), trépied (trois pieds) et piédestal partagent bien le radical de « pied »."
      },
      {
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
      {
        type: "match",
        instruction: "Associe chaque mot à son dérivé de même famille.",
        pairs: [
          { left: "beau", right: "embellir" },
          { left: "fort", right: "fortifier" },
          { left: "grand", right: "agrandir" }
        ],
        feedback: "Embellir = rendre beau, fortifier = rendre fort, agrandir = rendre grand. Ces mots partagent le même radical."
      },
      {
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
      {
        type: "mcq",
        instruction: "Parmi ces mots, lequel est de la famille de « lire » ?",
        choices: ["lilas", "lisible", "lime", "lion"],
        answer: "lisible",
        feedback: "Lisible = que l'on peut lire. Il contient le radical « lis- » (variante de « lir- »). Lilas, lime et lion n'ont aucun lien avec la lecture."
      }
    ],
    level3Bank: [
      {
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
      {
        type: "match",
        instruction: "Associe chaque mot savant (origine latine ou grecque) à son équivalent courant.",
        pairs: [
          { left: "pédestre", right: "pied" },
          { left: "aquatique", right: "eau" },
          { left: "solaire", right: "soleil" }
        ],
        feedback: "Pédestre (pes/pedis = pied), aquatique (aqua = eau), solaire (sol = soleil) : des mots savants de même famille que des mots courants."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel mot n'appartient PAS à la famille de « voir » ?",
        choices: ["prévoir", "voile", "revoir", "apercevoir"],
        answer: "voile",
        feedback: "Voile (tissu) n'a aucun lien avec le verbe voir. Prévoir = voir à l'avance, revoir = voir à nouveau, apercevoir = commencer à voir."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel est le radical du mot « chanteur » ?",
        choices: ["chant", "-eur", "chanteuse", "chante"],
        answer: "chant",
        feedback: "Chant-eur : le radical est « chant ». Le suffixe « -eur » indique une personne qui fait l'action."
      },
      {
        type: "mcq",
        instruction: "Quel est le radical commun à « jardiner », « jardinier » et « jardinage » ?",
        choices: ["jardin", "jar", "jardinage", "jardiner"],
        answer: "jardin",
        feedback: "Le radical commun est « jardin ». Tous ces mots parlent du jardin et de ce qui lui est lié."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à son radical.",
        pairs: [
          { left: "marcheur", right: "march-" },
          { left: "danseur", right: "dans-" },
          { left: "vendeur", right: "vend-" }
        ],
        feedback: "March-eur, dans-eur, vend-eur : le suffixe « -eur » s'ajoute au radical pour désigner celui qui fait l'action."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel est le radical du mot « fleuriste » ?",
        choices: ["fleur", "florist", "fleurist", "-iste"],
        answer: "fleur",
        feedback: "Fleur-iste : le radical est « fleur ». Le suffixe « -iste » désigne un métier ou une spécialité."
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Quel est le radical du mot « invisible » ?",
        choices: ["in-", "vis", "visible", "-ible"],
        answer: "vis",
        feedback: "Invisible = in- (non) + vis (voir) + -ible (que l'on peut). Le radical « vis- » vient du latin « videre » (voir)."
      },
      {
        type: "mcq",
        instruction: "Quel est le radical du mot « agrandissement » ?",
        choices: ["a-", "grand", "-issement", "agrand"],
        answer: "grand",
        feedback: "A-grand-issement : « a- » est un préfixe, « grand » est le radical, « -issement » est le suffixe. Ce mot signifie « rendre plus grand »."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à son radical (attention aux petits changements de forme).",
        pairs: [
          { left: "raccourcir", right: "court" },
          { left: "alléger", right: "léger" },
          { left: "noircir", right: "noir" }
        ],
        feedback: "Raccourc-ir (court), allég-er (léger), noire-ir (noir) : le radical peut légèrement changer de forme."
      },
      {
        type: "mcq",
        instruction: "Quel radical partagent « boulanger », « boulangerie » et « boulangère » ?",
        choices: ["boulangi", "boulanger", "boulang", "boul"],
        answer: "boulang",
        feedback: "Le radical commun est « boulang- ». Il vient de l'ancien français « boulange » (action de faire le pain)."
      },
      {
        type: "mcq",
        instruction: "Quel est le radical du mot « malheureux » ?",
        choices: ["mal-", "heureux", "heur", "-eux"],
        answer: "heur",
        feedback: "Mal-heur-eux : « mal- » est le préfixe, « heur » est le radical (ancien mot pour « chance, destin »), « -eux » est le suffixe."
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Quel est le radical commun à « portable », « transport » et « importation » ?",
        choices: ["port", "trans", "-able", "import"],
        answer: "port",
        feedback: "Le radical « port- » vient du latin « portare » (porter). On le retrouve dans portable, transport (porter d'un lieu à l'autre), importation."
      },
      {
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
      {
        type: "mcq",
        instruction: "Dans « biologie », « zoologie » et « psychologie », quel est le radical grec commun ?",
        choices: ["-logie", "bio", "zoo", "psycho"],
        answer: "-logie",
        feedback: "Le radical grec « logos » (étude, discours) donne le suffixe « -logie ». Biologie = étude du vivant, zoologie = étude des animaux."
      },
      {
        type: "mcq",
        instruction: "Quel est le radical commun à « lumineux », « illuminer » et « luminosité » ?",
        choices: ["lumin", "lum", "illumin", "luminosit"],
        answer: "lumin",
        feedback: "Le radical « lumin- » vient du latin « lumen » (lumière). On le retrouve dans lumineux, illuminer, luminosité."
      },
      {
        type: "match",
        instruction: "Associe chaque radical latin à sa signification.",
        pairs: [{ left: "aqua-", right: "eau" }, { left: "terr-", right: "terre" }, { left: "igni-", right: "feu" }],
        feedback: "Aqua- (aquarium, aquatique), terr- (territoire, terrain), igni- (igné, ignifugé) sont des radicaux latins courants."
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
      {
        type: "mcq",
        instruction: "Quel est le préfixe dans le mot « déplacer » ?",
        choices: ["dé-", "place", "-er", "dép"],
        answer: "dé-",
        feedback: "Dé-placer : « dé- » est le préfixe. Il signifie « contraire de » ou « action inverse ». Dé-placer = ne plus être à sa place."
      },
      {
        type: "mcq",
        instruction: "Que signifie le préfixe « re- » dans « recommencer » ?",
        choices: ["avant", "après", "à nouveau", "sans"],
        answer: "à nouveau",
        feedback: "« Re- » indique la répétition. Recommencer = commencer à nouveau. On retrouve re- dans refaire, relire, revoir…"
      },
      {
        type: "match",
        instruction: "Associe chaque préfixe à sa signification.",
        pairs: [
          { left: "im- (impossible)", right: "contraire / non" },
          { left: "pré- (prévoir)", right: "avant" },
          { left: "sur- (surpuissant)", right: "au-dessus / en plus" }
        ],
        feedback: "Im- (non), pré- (avant), sur- (au-dessus) sont des préfixes très courants en français."
      },
      {
        type: "mcq",
        instruction: "Quel mot contient un préfixe ?",
        choices: ["maison", "soleil", "désordre", "jardin"],
        answer: "désordre",
        feedback: "Désordre = dés- (préfixe = contraire) + ordre. Maison, soleil et jardin n'ont pas de préfixe."
      },
      {
        type: "mcq",
        instruction: "Quel préfixe faut-il ajouter à « heureux » pour former son contraire ?",
        choices: ["re-", "mal-", "pré-", "sur-"],
        answer: "mal-",
        feedback: "Malheureux = mal- + heureux. Le préfixe « mal- » exprime une idée négative ou mauvaise."
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Que signifie le préfixe « anti- » dans « antiviolence » ?",
        choices: ["avant", "contre", "à nouveau", "sans"],
        answer: "contre",
        feedback: "Anti- vient du grec et signifie « contre ». Antiviolence = contre la violence. Aussi : antibiotique, antidote…"
      },
      {
        type: "mcq",
        instruction: "Le préfixe « inter- » dans « intercontinental » signifie…",
        choices: ["à l'intérieur", "entre", "au-delà", "contre"],
        answer: "entre",
        feedback: "Inter- (du latin « inter ») signifie « entre ». Intercontinental = entre les continents. Aussi : international, interclasse, interagir."
      },
      {
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
      {
        type: "mcq",
        instruction: "Quel préfixe donne à « possible » son contraire ?",
        choices: ["dé-", "im-", "re-", "sur-"],
        answer: "im-",
        feedback: "Impossible = im- + possible. Im- (variante de in- devant p, b, m) exprime la négation."
      },
      {
        type: "mcq",
        instruction: "Que signifie le préfixe « bi- » dans « bilingue » ?",
        choices: ["sans", "deux", "entre", "beaucoup"],
        answer: "deux",
        feedback: "Bi- vient du latin « bis » (deux fois). Bilingue = qui parle deux langues. Aussi : bicyclette (deux roues), bimensuel (deux fois par mois)."
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Quel préfixe grec signifiant « loin » retrouve-t-on dans « téléphone », « télévision » et « télécommunication » ?",
        choices: ["télé-", "téléph-", "tél-", "phon-"],
        answer: "télé-",
        feedback: "Télé- vient du grec « têle » (loin). Téléphone = voix de loin, télévision = vision de loin, télécommunication = communication à distance."
      },
      {
        type: "match",
        instruction: "Associe chaque préfixe savant à sa signification.",
        pairs: [
          { left: "micro-", right: "petit" },
          { left: "macro-", right: "grand" },
          { left: "poly-", right: "plusieurs" }
        ],
        feedback: "Micro- (microbe, microscope), macro- (macroéconomie, macrocosme), poly- (polygone, polyglotte) sont des préfixes d'origine grecque."
      },
      {
        type: "mcq",
        instruction: "Dans « hypothèse », quel préfixe grec signifie « sous, en dessous » ?",
        choices: ["hyp-", "hypo-", "hyper-", "hé-"],
        answer: "hypo-",
        feedback: "Hypo- (du grec « hupo ») signifie « sous, en dessous ». Hypo-thèse = ce qui est posé en dessous (comme base). À ne pas confondre avec hyper- (au-dessus, excessif)."
      },
      {
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
      {
        type: "mcq",
        instruction: "Le préfixe « anthropo- » (dans « anthropologie ») vient du grec et signifie…",
        choices: ["animal", "homme", "nature", "société"],
        answer: "homme",
        feedback: "Anthropo- vient du grec « anthrôpos » (être humain). Anthropologie = étude de l'être humain. On retrouve ce préfixe dans « philanthrope » (ami des hommes)."
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
      {
        type: "mcq",
        instruction: "Quel est le suffixe dans le mot « jardinage » ?",
        choices: ["jardin-", "-age", "-inage", "jard-"],
        answer: "-age",
        feedback: "Jardin-age : le suffixe « -age » indique une action ou son résultat. Jardinage = l'action de jardiner."
      },
      {
        type: "mcq",
        instruction: "Que signifie le suffixe « -eur » dans « plongeur » ?",
        choices: ["une action", "un endroit", "celui qui fait l'action", "une qualité"],
        answer: "celui qui fait l'action",
        feedback: "Le suffixe « -eur » désigne une personne qui fait l'action. Plongeur = celui qui plonge. Aussi : chanteur, nageur, coureur…"
      },
      {
        type: "match",
        instruction: "Associe chaque suffixe à ce qu'il exprime.",
        pairs: [
          { left: "-ette (maisonnette)", right: "petite taille" },
          { left: "-ment (rapidement)", right: "adverbe de manière" },
          { left: "-tion (construction)", right: "action ou résultat" }
        ],
        feedback: "-ette (petite taille), -ment (transforme un adjectif en adverbe), -tion (action ou résultat)."
      },
      {
        type: "mcq",
        instruction: "Quel mot contient un suffixe signifiant « petite taille » ?",
        choices: ["maison", "jardin", "maisonnette", "soleil"],
        answer: "maisonnette",
        feedback: "Maisonnette = maison + -ette. Le suffixe « -ette » exprime la petite taille ou un diminutif."
      },
      {
        type: "mcq",
        instruction: "Quel suffixe retrouve-t-on dans « épicerie », « boulangerie » et « boucherie » pour désigner un lieu de commerce ?",
        choices: ["-erie", "-er", "-rie", "-ie"],
        answer: "-erie",
        feedback: "Le suffixe « -erie » désigne souvent un lieu de commerce ou de travail : épic-erie, boulang-erie, bouch-erie, libr-airie…"
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Quel suffixe transforme l'adjectif « rapide » en adverbe ?",
        choices: ["-ment", "-eur", "-age", "-ette"],
        answer: "-ment",
        feedback: "Rapide-ment. Le suffixe « -ment » transforme un adjectif (au féminin) en adverbe de manière : lente → lentement, douce → doucement."
      },
      {
        type: "match",
        instruction: "Associe chaque suffixe à la catégorie grammaticale qu'il crée.",
        pairs: [
          { left: "-eur (chanteur)", right: "nom (personne)" },
          { left: "-ment (doucement)", right: "adverbe" },
          { left: "-able (aimable)", right: "adjectif" }
        ],
        feedback: "-eur crée des noms de personne, -ment crée des adverbes, -able crée des adjectifs signifiant « qu'on peut… »."
      },
      {
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
      {
        type: "mcq",
        instruction: "Le suffixe « -iste » dans « fleuriste » exprime…",
        choices: ["Une petite fleur", "Une profession ou spécialité", "Une action", "Un résultat"],
        answer: "Une profession ou spécialité",
        feedback: "Fleur-iste : le suffixe « -iste » désigne une personne exerçant une profession. Aussi : pianiste, dentiste, journaliste…"
      },
      {
        type: "mcq",
        instruction: "Quel suffixe dans « livraison » crée un nom d'action à partir du verbe « livrer » ?",
        choices: ["-son", "-aison", "-ison", "livr-"],
        answer: "-aison",
        feedback: "Livr-aison : le suffixe « -aison » crée des noms d'action. Aussi : terminaison (terminer), floraison (fleurir), pendaison (pendre)."
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Le suffixe « -logie » dans « biologie », « zoologie » et « psychologie » vient du grec et signifie…",
        choices: ["voir", "écrire", "étude / discours", "vivre"],
        answer: "étude / discours",
        feedback: "« Logos » signifie « étude, discours » en grec. Biologie = étude du vivant, zoologie = étude des animaux, psychologie = étude de l'esprit."
      },
      {
        type: "match",
        instruction: "Associe chaque suffixe d'origine grecque à sa signification.",
        pairs: [
          { left: "-vore (herbivore)", right: "qui mange" },
          { left: "-phile (cinéphile)", right: "qui aime" },
          { left: "-phobe (claustrophobe)", right: "qui craint" }
        ],
        feedback: "-vore (latin vorare = dévorer), -phile (grec philos = ami), -phobe (grec phobos = peur)."
      },
      {
        type: "mcq",
        instruction: "Dans « omnivore », quel suffixe signifie « qui mange » ?",
        choices: ["omni-", "-vore", "-ore", "omniv-"],
        answer: "-vore",
        feedback: "-vore vient du latin « vorare » (dévorer). Omnivore = mange de tout. Aussi : carnivore (viande), herbivore (herbe), insectivore (insectes)."
      },
      {
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
      {
        type: "mcq",
        instruction: "Le suffixe « -graphie » (dans « photographie ») vient du grec « graphein » qui signifie…",
        choices: ["voir", "écrire / représenter", "mesurer", "parler"],
        answer: "écrire / représenter",
        feedback: "Graphein signifie « écrire, tracer, représenter » en grec. Photographie = représentation par la lumière. Aussi : calligraphie, biographie, typographie."
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
      {
        type: "mcq",
        instruction: "Quel mot est dérivé de « fleur » avec un suffixe ?",
        choices: ["fleuve", "flocon", "fleurir", "flûte"],
        answer: "fleurir",
        feedback: "Fleurir = fleur + -ir. C'est un mot dérivé par suffixation. Fleuve, flocon et flûte ont une origine différente."
      },
      {
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
      {
        type: "match",
        instruction: "Associe chaque base à son mot dérivé.",
        pairs: [
          { left: "jardin + -ier", right: "jardinier" },
          { left: "chanter + -eur", right: "chanteur" },
          { left: "livr- + -aison", right: "livraison" }
        ],
        feedback: "Jardin-ier, chant-eur, livr-aison : on ajoute un suffixe à la base pour former un nouveau mot."
      },
      {
        type: "mcq",
        instruction: "Quel préfixe ajoute-t-on à « possible » pour former son contraire ?",
        choices: ["dé-", "im-", "re-", "sur-"],
        answer: "im-",
        feedback: "Impossible = im- + possible. Im- (variante de in- devant p, b, m) exprime la négation."
      },
      {
        type: "mcq",
        instruction: "Quel mot est formé par préfixation à partir de « honnête » ?",
        choices: ["honnêteté", "honnêtement", "malhonnête", "honnêteur"],
        answer: "malhonnête",
        feedback: "Malhonnête = mal- (préfixe) + honnête. C'est une dérivation par préfixation. Honnêteté et honnêtement sont formés par suffixation. Honnêteur n'existe pas."
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Quel est le mot de base (radical sans affixes) de « débranchement » ?",
        choices: ["débranche", "branche", "débranchement", "branchement"],
        answer: "branche",
        feedback: "Dé-branch-ement : le préfixe « dé- » et le suffixe « -ment » entourent le radical « branch- ». Le mot de base est « branche »."
      },
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Quel mot est formé avec à la fois un préfixe ET un suffixe ?",
        choices: ["jardinier", "malheureux", "chanteur", "fleuri"],
        answer: "malheureux",
        feedback: "Malheureux = mal- (préfixe) + heur (radical) + -eux (suffixe). Les autres n'ont qu'un suffixe."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à sa structure de dérivation.",
        pairs: [
          { left: "rechargeable", right: "re- + radical + -able" },
          { left: "porteur", right: "radical + -eur" },
          { left: "démonter", right: "dé- + radical" }
        ],
        feedback: "Rechargeable (préfixe + radical + suffixe), porteur (radical + suffixe), démonter (préfixe + radical)."
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Le mot « invraisemblable » est formé de…",
        choices: ["in- + vraisemblable", "invrai + semblable", "in- + vrai + sembl + -able", "in- + vraisembl + -able"],
        answer: "in- + vraisemblable",
        feedback: "Invraisemblable = in- (non) + vraisemblable. Et vraisemblable lui-même = vrai + sembl- + -able. C'est un mot à plusieurs niveaux de dérivation."
      },
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Dans « extraordinaire », le préfixe « extra- » signifie…",
        choices: ["très", "en dehors de / au-delà de", "entre", "avant"],
        answer: "en dehors de / au-delà de",
        feedback: "Extra- vient du latin « extra » (en dehors de). Extraordinaire = en dehors de l'ordinaire, hors du commun."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à sa structure morphologique.",
        pairs: [
          { left: "aquarium", right: "emprunté au latin (radical seul)" },
          { left: "déshydratation", right: "préfixe + radical + suffixe" },
          { left: "portefeuille", right: "mot composé" }
        ],
        feedback: "Aquarium = emprunté directement au latin. Déshydratation = dés- + hydr- + -at- + -ion. Portefeuille = porte + feuille."
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
      {
        type: "mcq",
        instruction: "Que signifie la racine latine « aqua » ?",
        choices: ["feu", "eau", "terre", "air"],
        answer: "eau",
        feedback: "« Aqua » signifie « eau » en latin. On la retrouve dans aquarium, aquatique, aqueduct (conduit d'eau)."
      },
      {
        type: "mcq",
        instruction: "Quelle racine grecque signifie « vie » ?",
        choices: ["geo", "bio", "photo", "logo"],
        answer: "bio",
        feedback: "« Bios » signifie « vie » en grec. On le retrouve dans biologie (étude du vivant), biographie (récit d'une vie), biodiversité."
      },
      {
        type: "match",
        instruction: "Associe chaque racine latine ou grecque à sa signification.",
        pairs: [
          { left: "terra (latin)", right: "terre" },
          { left: "photo (grec)", right: "lumière" },
          { left: "chronos (grec)", right: "temps" }
        ],
        feedback: "Terra : territoire, terrestre. Photo : photographie, photosynthèse. Chronos : chronologie, chronomètre."
      },
      {
        type: "mcq",
        instruction: "Le mot « bibliothèque » vient du grec « biblion » (livre) et « theke » (rangement). Que signifie-t-il littéralement ?",
        choices: ["Endroit pour lire", "Rangement de livres", "Collection de livres anciens", "Maison du savoir"],
        answer: "Rangement de livres",
        feedback: "Bibliothèque = biblion (livre) + theke (rangement, coffre). Littéralement : l'endroit où l'on range les livres."
      },
      {
        type: "mcq",
        instruction: "La racine « graph- » (du grec « graphein ») dans « autographe » signifie…",
        choices: ["lire", "voir", "écrire / tracer", "entendre"],
        answer: "écrire / tracer",
        feedback: "Graphein signifie « écrire, tracer » en grec. Autographe = écrit de sa propre main. Aussi : photographie, calligraphie, orthographe."
      }
    ],
    level2Bank: [
      {
        type: "match",
        instruction: "Associe chaque adjectif savant à son équivalent courant.",
        pairs: [
          { left: "aquatique", right: "qui vit dans l'eau" },
          { left: "terrestre", right: "qui vit sur la terre" },
          { left: "aérien", right: "qui vit dans l'air" }
        ],
        feedback: "Aquatique (aqua = eau), terrestre (terra = terre), aérien (aer = air) sont formés à partir de racines latines ou grecques."
      },
      {
        type: "mcq",
        instruction: "Quelle racine grecque se retrouve dans « géographie » et « géologie » ?",
        choices: ["graph", "geo", "log", "bio"],
        answer: "geo",
        feedback: "« Geo » vient du grec « gê » (la Terre). Géographie = description de la Terre, géologie = étude des roches terrestres."
      },
      {
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
      {
        type: "mcq",
        instruction: "La racine « phon- » (du grec « phone ») dans « microphone » et « téléphone » signifie…",
        choices: ["lumière", "voix / son", "eau", "voir"],
        answer: "voix / son",
        feedback: "Phone = voix, son en grec. Microphone = qui amplifie la voix, téléphone = voix à distance, phonologie = étude des sons."
      },
      {
        type: "mcq",
        instruction: "Parmi ces mots, lequel vient de la racine latine « manus » (main) ?",
        choices: ["manteau", "manuel", "manie", "manège"],
        answer: "manuel",
        feedback: "Manuel vient du latin « manualis » (de la main). Un travail manuel = fait à la main. Manteau vient d'un autre mot latin (mantellum)."
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "La racine grecque « demos » signifie « peuple ». Dans quel mot la retrouve-t-on ?",
        choices: ["démon", "démocratie", "démolir", "démontrer"],
        answer: "démocratie",
        feedback: "Démocratie = demos (peuple) + kratos (pouvoir). C'est le pouvoir du peuple. Démon, démolir et démontrer ont des racines différentes."
      },
      {
        type: "match",
        instruction: "Associe chaque racine grecque à un mot qui la contient.",
        pairs: [
          { left: "-cratie (pouvoir)", right: "démocratie" },
          { left: "graphe (écrire)", right: "calligraphie" },
          { left: "phob (peur)", right: "claustrophobie" }
        ],
        feedback: "Démocratie (pouvoir du peuple), calligraphie (belle écriture), claustrophobie (peur des espaces fermés)."
      },
      {
        type: "mcq",
        instruction: "Les mots « carnivore », « herbivore » et « omnivore » partagent le suffixe latin « -vore » qui signifie…",
        choices: ["animal", "qui mange", "qui court", "qui vit"],
        answer: "qui mange",
        feedback: "Vore vient du latin « vorare » (dévorer). Carnivore = mange de la viande, herbivore = mange de l'herbe, omnivore = mange de tout."
      },
      {
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
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Quel mot n'appartient PAS au thème des sports ?",
        choices: ["natation", "football", "peinture", "tennis"],
        answer: "peinture",
        feedback: "Natation, football et tennis sont des sports. La peinture est un art, pas un sport."
      },
      {
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
      {
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
      {
        type: "match",
        instruction: "Associe chaque mot à son thème.",
        pairs: [
          { left: "ballon", right: "Sport" },
          { left: "casserole", right: "Cuisine" },
          { left: "cahier", right: "École" }
        ],
        feedback: "Ballon → sport, casserole → cuisine, cahier → école. Regrouper par thème, c'est identifier ce que les mots ont en commun."
      }
    ],
    level2Bank: [
      {
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
      {
        type: "mcq",
        instruction: "Quel mot est l'intrus dans cette liste liée au thème de la mer ?",
        choices: ["vague", "écume", "marée", "prairie"],
        answer: "prairie",
        feedback: "Vague, écume et marée appartiennent au champ de la mer. La prairie est un espace terrestre herbu — elle n'a rien à voir avec la mer."
      },
      {
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
      {
        type: "mcq",
        instruction: "À quel thème général appartiennent « flûte », « violon », « batterie » et « trompette » ?",
        choices: ["Les sports", "La musique", "Les outils", "Les transports"],
        answer: "La musique",
        feedback: "Ce sont tous des instruments de musique. Les regrouper sous le thème « musique » ou « instruments » est correct."
      },
      {
        type: "match",
        instruction: "Associe chaque groupe de mots à son thème.",
        pairs: [
          { left: "bistouri, stéthoscope, seringue", right: "La médecine" },
          { left: "pinceau, toile, palette", right: "La peinture" },
          { left: "boussole, carte, sentier", right: "La randonnée" }
        ],
        feedback: "Bistouri/stéthoscope → médecine, pinceau/palette → peinture, boussole/carte → randonnée. Les mots d'un même thème partagent un contexte ou un usage commun."
      }
    ],
    level3Bank: [
      {
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
      {
        type: "mcq",
        instruction: "Quel mot peut appartenir à deux thèmes différents selon le contexte ?",
        choices: ["vague (la mer / l'imprécision)", "marée", "écume", "phare"],
        answer: "vague (la mer / l'imprécision)",
        feedback: "« Vague » appartient au thème de la mer (une vague d'eau) ET au thème de l'imprécision (une réponse vague). Cette double appartenance s'appelle la polysémie."
      },
      {
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
      {
        type: "mcq",
        instruction: "Dans quel thème général range-t-on les mots « épistolaire », « narratif », « lyrique » et « dramatique » ?",
        choices: ["La géographie", "Les genres littéraires", "La biologie", "Les arts plastiques"],
        answer: "Les genres littéraires",
        feedback: "Épistolaire (lettres), narratif (récit), lyrique (poésie) et dramatique (théâtre) désignent les grands genres de la littérature."
      },
      {
        type: "match",
        instruction: "Associe chaque mot savant au domaine thématique auquel il appartient.",
        pairs: [
          { left: "chlorophylle", right: "Biologie / botanique" },
          { left: "métaphore", right: "Littérature / rhétorique" },
          { left: "parallèle", right: "Géographie / géométrie" }
        ],
        feedback: "Chlorophylle (pigment des plantes), métaphore (figure de style), parallèle (ligne ou droite) : certains mots appartiennent à un seul domaine, d'autres (comme « parallèle ») à plusieurs."
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
      {
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
      {
        type: "mcq",
        instruction: "Quel mot N'appartient PAS au champ lexical de la forêt ?",
        choices: ["arbre", "feuille", "bûcheron", "assiette"],
        answer: "assiette",
        feedback: "Arbre, feuille et bûcheron évoquent tous la forêt. L'assiette est un objet de cuisine qui n'a aucun lien avec la forêt."
      },
      {
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
      {
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
      {
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
      }
    ],
    level2Bank: [
      {
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
      {
        type: "mcq",
        instruction: "Quel mot inattendu peut appartenir au champ lexical de la lumière ?",
        choices: ["éclat", "songe", "marmite", "tabouret"],
        answer: "éclat",
        feedback: "« Éclat » peut appartenir au champ lexical de la lumière (un éclat de lumière), mais aussi au bruit (un éclat de rire) ou à la violence. C'est un mot polysémique."
      },
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Quel est le champ lexical dominant dans : « Le chirurgien prit son bistouri, ausculta le patient et posa un diagnostic » ?",
        choices: ["La gastronomie", "La médecine", "L'architecture", "Le sport"],
        answer: "La médecine",
        feedback: "Chirurgien, bistouri, ausculter, patient, diagnostic : tous ces mots appartiennent au champ lexical de la médecine."
      }
    ],
    level3Bank: [
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Dans quel champ lexical range-t-on le mot « éclipse » ?",
        choices: ["La cuisine", "L'astronomie", "La médecine", "L'architecture"],
        answer: "L'astronomie",
        feedback: "Une éclipse se produit quand un astre en cache un autre (éclipse de Soleil, de Lune). Ce mot appartient au champ lexical de l'astronomie."
      },
      {
        type: "match",
        instruction: "Associe chaque mot savant au champ lexical qu'il évoque.",
        pairs: [
          { left: "axiome", right: "Les mathématiques" },
          { left: "allitération", right: "La littérature / poésie" },
          { left: "photosynthèse", right: "La biologie / botanique" }
        ],
        feedback: "Axiome (vérité de base en maths), allitération (répétition de sons en poésie), photosynthèse (fabrication de sucre par les plantes)."
      },
      {
        type: "mcq",
        instruction: "Dans : « Les cordes vibrèrent, la mélodie s'éleva, le maestro leva sa baguette », quel est le champ lexical dominant ?",
        choices: ["Le sport", "La musique", "La cuisine", "La guerre"],
        answer: "La musique",
        feedback: "Cordes, mélodie, maestro, baguette (de chef d'orchestre) : ces mots forment le champ lexical de la musique classique. Identifier ce champ aide à comprendre le sens global d'un texte."
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
      {
        type: "mcq",
        instruction: "Complète la phrase : « Le chien _____ très fort quand le facteur sonne. »",
        choices: ["chante", "aboie", "siffle", "miaule"],
        answer: "aboie",
        feedback: "Le chien aboie : c'est le verbe spécifique à son cri. Chanter est pour les oiseaux, siffler pour certains animaux, miauler pour le chat."
      },
      {
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
      {
        type: "mcq",
        instruction: "Complète la phrase : « La _____ brillait dans le ciel étoilé de la nuit. »",
        choices: ["lune", "carotte", "brosse", "chaussure"],
        answer: "lune",
        feedback: "La lune est l'astre qui éclaire la nuit. Les autres mots n'ont aucun rapport avec le ciel."
      },
      {
        type: "mcq",
        instruction: "Dans un compte rendu médical, quel mot est le plus adapté pour parler d'une douleur au ventre ?",
        choices: ["bobo", "mal au bidon", "douleur abdominale", "c'est nul"],
        answer: "douleur abdominale",
        feedback: "Dans un contexte médical et formel, on utilise des termes précis : « douleur abdominale » (ventre). « Bobo » et « bidon » sont des mots familiers, inadaptés à ce contexte."
      },
      {
        type: "match",
        instruction: "Associe chaque animal au verbe qui décrit son cri.",
        pairs: [
          { left: "Le chat", right: "miaule" },
          { left: "La vache", right: "meugle" },
          { left: "Le cheval", right: "hennit" }
        ],
        feedback: "Chaque animal a son verbe propre : miauler (chat), meugler (vache), hennir (cheval). Utiliser le bon verbe rend l'écriture plus précise."
      }
    ],
    level2Bank: [
      {
        type: "mcq",
        instruction: "Complète la phrase : « En automne, les feuilles des arbres _____ et recouvrent le sol. »",
        choices: ["tombent", "poussent", "fleurissent", "gèlent"],
        answer: "tombent",
        feedback: "En automne, les feuilles tombent. Pousser et fleurir décrivent le printemps, geler évoque l'hiver."
      },
      {
        type: "mcq",
        instruction: "Lequel de ces mots est le plus précis pour décrire une lumière très faible et terne ?",
        choices: ["éblouissante", "vive", "blafarde", "lumineuse"],
        answer: "blafarde",
        feedback: "Blafarde décrit une lumière faible, froide et sans éclat. Éblouissante, vive et lumineuse désignent au contraire des lumières intenses."
      },
      {
        type: "mcq",
        instruction: "Complète : « L'alpiniste avait les jambes _____ après avoir gravi le sommet. »",
        choices: ["légères", "cotonneuses", "bronzées", "parfumées"],
        answer: "cotonneuses",
        feedback: "« Avoir les jambes cotonneuses (en coton) » exprime la fatigue musculaire extrême. Légères est le contraire, bronzées et parfumées ne correspondent pas à ce contexte."
      },
      {
        type: "mcq",
        instruction: "Complète : « Le conférencier _____ l'assistance avec son exposé passionnant. »",
        choices: ["ennuyait", "captivait", "dormait", "criait"],
        answer: "captivait",
        feedback: "Captiver = retenir entièrement l'attention. Un exposé passionnant captive son auditoire. Ennuyer est le contraire."
      },
      {
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
      }
    ],
    level3Bank: [
      {
        type: "mcq",
        instruction: "Quel mot convient le mieux dans : « Sa remarque, bien que _____, m'a blessé. » ?",
        choices: ["anodine", "hurlée", "parfumée", "froide"],
        answer: "anodine",
        feedback: "Anodine = sans importance apparente, sans gravité. La phrase dit que la remarque semblait insignifiante mais a pourtant blessé — c'est le sens voulu."
      },
      {
        type: "mcq",
        instruction: "Dans : « Ce discours a _____ l'assemblée », quel verbe convient pour exprimer l'ennui causé par un exposé confus ?",
        choices: ["fasciné", "lassé", "réjoui", "émerveillé"],
        answer: "lassé",
        feedback: "Lasser = ennuyer, fatiguer par excès ou manque d'intérêt. Un discours confus lasse son auditoire. Fasciner, réjouir, émerveiller expriment tous des réactions positives."
      },
      {
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
      {
        type: "mcq",
        instruction: "Dans : « Il la regarda avec une moue _____ », quel adjectif exprime le mieux le dédain ?",
        choices: ["admirative", "méprisante", "affectueuse", "attendrie"],
        answer: "méprisante",
        feedback: "Une moue méprisante exprime le dédain, le peu d'estime. Une moue admirative, affectueuse ou attendrie exprimerait au contraire des sentiments positifs."
      },
      {
        type: "match",
        instruction: "Associe chaque mot à la phrase où il est le mieux adapté.",
        pairs: [
          { left: "fulgurant", right: "Un progrès fulgurant en quelques jours" },
          { left: "lancinant", right: "Une douleur lancinante qui ne cesse pas" },
          { left: "lugubre", right: "Une mélodie lugubre jouée aux funérailles" }
        ],
        feedback: "Fulgurant = très rapide (comme l'éclair). Lancinant = qui revient sans cesse (douleur persistante). Lugubre = sombre et triste, lié à la mort."
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
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Quel mot est de niveau soutenu pour dire « triste » ?",
        choices: ["cafardeux", "triste", "mélancolique", "déprimé"],
        answer: "mélancolique",
        feedback: "Mélancolique est un terme littéraire et soutenu. Triste est courant. Cafardeux est familier (avoir le cafard = être triste). Déprimé est courant/médical."
      },
      {
        type: "mcq",
        instruction: "À quel niveau de langue appartient : « Veuillez agréer l'expression de mes sincères salutations » ?",
        choices: ["Familier", "Courant", "Soutenu", "Argotique"],
        answer: "Soutenu",
        feedback: "Cette formule de politesse très formelle appartient au registre soutenu. Elle est utilisée dans les lettres officielles, les courriers administratifs."
      },
      {
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
      }
    ],
    level2Bank: [
      {
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
      {
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
      {
        type: "mcq",
        instruction: "Quel est l'équivalent soutenu de « Il s'est baladé en ville » ?",
        choices: ["Il s'est promené en ville.", "Il a déambulé dans la cité.", "Il a tourné en rond.", "Il a traîné."],
        answer: "Il a déambulé dans la cité.",
        feedback: "Déambuler = se promener sans but précis. C'est un terme soutenu. « Cité » pour désigner la ville est aussi plus soutenu. Se promener est courant, traîner et tourner en rond sont familiers."
      },
      {
        type: "match",
        instruction: "Associe chaque expression familière à son équivalent courant.",
        pairs: [
          { left: "J'ai la dalle.", right: "J'ai faim." },
          { left: "C'est nul.", right: "C'est mauvais." },
          { left: "Il se tire.", right: "Il part." }
        ],
        feedback: "Passer du familier au courant consiste souvent à changer le vocabulaire et à respecter la syntaxe standard (negation complète, pronoms corrects)."
      },
      {
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
      }
    ],
    level3Bank: [
      {
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
      {
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
      {
        type: "match",
        instruction: "Associe chaque formule soutenue à son équivalent courant.",
        pairs: [
          { left: "Il convient de partir à l'heure.", right: "Il faut partir à l'heure." },
          { left: "Je sollicite votre aide.", right: "Je vous demande votre aide." },
          { left: "Cela m'est fort agréable.", right: "Ça me plaît beaucoup." }
        ],
        feedback: "Solliciter = demander (soutenu), convenir = être nécessaire (soutenu), fort agréable = très agréable (soutenu). Le registre soutenu ajoute formalité et distance."
      },
      {
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
      {
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
      }
    ]
  }

});

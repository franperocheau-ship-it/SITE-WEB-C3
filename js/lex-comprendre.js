/* ─────────────────────────────────────────────────────────────────────────────
   lex-comprendre.js
   Données des exercices à 3 niveaux pour la section "Comprendre les mots"
   de français-lexique.html
   ─────────────────────────────────────────────────────────────────────────── */

/* Clé de passage : 80 % (4 bonnes réponses sur 5) */
window.LEX_COMPRENDRE = [

  /* ══════════════════════════════════════════════════════════════════════════
     1. UTILISER L'ORDRE ALPHABÉTIQUE
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "ordre-alphabetique",
    title: "Ranger dans l'ordre alphabétique",
    levels: ["CM1","CM2","6e"],
    category: "comprendre-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Première lettre différente — classement simple",
        questions: [
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
            choices: ["lune, arbre, mer, vent", "arbre, lune, mer, vent", "mer, arbre, vent, lune", "vent, lune, arbre, mer"],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Même première lettre — comparaison de la 2e ou 3e lettre",
        questions: [
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
            choices: ["portrait, porte, portée", "portée, portrait, porte", "porte, portée, portrait", "portrait, portée, porte"],
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Classement précis — mots proches avec accents et 3e lettre",
        questions: [
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
            choices: ["Les accents n'ont aucune importance pour classer", "On ignore le tréma et le chapeau pour classer", "On classe 'î' comme 'i', donc île vient avant image", "Image vient avant île car M vient avant L"],
            answer: "On classe 'î' comme 'i', donc île vient avant image",
            feedback: "Dans la plupart des dictionnaires français, les lettres accentuées (î, é, à…) se classent comme leur équivalent sans accent. Î = I. Île et image commencent tous deux par i, puis l (île) vs m (image) : L < M, donc île précède image."
          }
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     3. TROUVER UN SYNONYME
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "trouver-synonyme",
    title: "Trouver un synonyme",
    levels: ["CM1","CM2","6e"],
    category: "comprendre-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître des synonymes courants",
        questions: [
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
            choices: ["le même nombre de lettres", "un sens proche ou identique", "la même lettre initiale", "la même terminaison"],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Nuances entre synonymes — choisir le mot juste selon le contexte",
        questions: [
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Reformuler avec un synonyme précis en contexte",
        questions: [
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     4. TROUVER UN ANTONYME
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "trouver-antonyme",
    title: "Trouver un antonyme",
    levels: ["CM1","CM2","6e"],
    category: "comprendre-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Contraires simples et courants",
        questions: [
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Antonymes formés par préfixe et antonymes selon le contexte",
        questions: [
          {
            type: "mcq",
            instruction: "Comment forme-t-on souvent l'antonyme de 'honnête' ?",
            choices: ["En ajoutant le suffixe -eur", "En ajoutant le préfixe dés- ou in-", "En changeant la terminaison", "En le remplaçant par son synonyme"],
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Antonymes subtils — registre, nuances et contexte",
        questions: [
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     5. IDENTIFIER UN HOMONYME
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "identifier-homonyme",
    title: "Identifier un homonyme",
    levels: ["CM2","6e"],
    category: "comprendre-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître les paires d'homonymes courants",
        questions: [
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Choisir le bon homonyme selon le contexte de la phrase",
        questions: [
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Homonymes rares et homophones grammaticaux complexes",
        questions: [
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     6. COMPRENDRE LA POLYSÉMIE
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "polysemie",
    title: "Comprendre la polysémie d'un mot",
    levels: ["CM2","6e"],
    category: "comprendre-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître qu'un mot peut avoir plusieurs sens",
        questions: [
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
            choices: ["En regardant sa longueur", "En lisant le contexte (les mots autour)", "En cherchant son synonyme", "En comptant ses lettres"],
            answer: "En lisant le contexte (les mots autour)",
            feedback: "Le contexte est la clé ! Les mots qui entourent un mot polysémique indiquent quel sens est utilisé dans cette situation."
          },
          {
            type: "mcq",
            instruction: "Quel mot est polysémique ?",
            choices: ["stylo (un seul sens)", "table (meuble, repas, liste…)", "crayon (un seul sens)", "gomme (uniquement pour effacer)"],
            answer: "table (meuble, repas, liste…)",
            feedback: "Table est polysémique : meuble (table de cuisine), repas (tenir une bonne table), liste (table de multiplication). Les autres mots ont un sens principal."
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Identifier le sens exact d'un mot polysémique dans son contexte",
        questions: [
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
            choices: ["Un mélange de farine et d'eau à travailler", "Un plat de spaghettis", "Une couleur pastel", "Un tempérament doux"],
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
            choices: ["Un gisement souterrain", "Une source riche et abondante", "Un aspect du visage", "Un engin explosif"],
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Analyser la polysémie — liens de sens et glissements de sens",
        questions: [
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
            choices: ["Un petit bateau rapide", "Une star, une célébrité", "Un avant-poste militaire", "Le titre d'un article"],
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     7. SENS PROPRE ET SENS FIGURÉ
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "sens-propre-figure",
    title: "Identifier le sens propre et le sens figuré",
    levels: ["CM2","6e"],
    category: "comprendre-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Distinguer sens littéral et sens imagé",
        questions: [
          {
            type: "mcq",
            instruction: "Que signifie 'sens propre' d'un mot ?",
            choices: ["Le sens imagé, non littéral", "Le sens courant et concret du mot", "Le sens contraire", "Le sens le plus rare"],
            answer: "Le sens courant et concret du mot",
            feedback: "Le sens propre est le sens premier, concret et littéral. Ex. : 'le chat monte dans l'arbre' → 'monter' au sens propre = se déplacer vers le haut."
          },
          {
            type: "col-sort",
            instruction: "Clique sur la bonne colonne pour chaque phrase.",
            colA: "Sens propre",
            colB: "Sens figuré",
            items: [
              { text: "Le chat monte dans l'arbre.", answer: "A", feedback: "Monter = se déplacer physiquement vers le haut. C'est le sens propre, concret et littéral." },
              { text: "Sa colère monte.", answer: "B", feedback: "La colère ne monte pas vraiment : c'est une image. 'Monter' est utilisé au sens figuré pour exprimer que la colère s'intensifie." },
              { text: "Il a le cœur brisé.", answer: "B", feedback: "Le cœur n'est pas cassé physiquement : c'est une image qui exprime la tristesse. Sens figuré." },
              { text: "La vitre est brisée.", answer: "A", feedback: "La vitre est physiquement cassée en morceaux. C'est le sens propre, concret de 'briser'." }
            ],
            feedback: "Sens propre = sens concret, littéral. Sens figuré = sens imagé, métaphorique."
          },
          {
            type: "mcq",
            instruction: "Dans 'Il a un cœur de pierre', le mot 'pierre' est au…",
            choices: ["sens propre (matière minérale)", "sens figuré (dur, sans pitié)", "sens alphabétique", "sens contraire"],
            answer: "sens figuré (dur, sans pitié)",
            feedback: "Le cœur n'est pas fait de pierre ! 'Pierre' est utilisé comme image pour dire que la personne est dure et sans pitié. C'est le sens figuré."
          },
          {
            type: "mcq",
            instruction: "Quelle phrase utilise 'lourd' au sens figuré ?",
            choices: ["Ce sac est très lourd.", "La pierre est lourde.", "Cette nouvelle est lourde à porter.", "Le cartable est lourd."],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Expressions figurées — reconnaître et interpréter",
        questions: [
          {
            type: "col-sort",
            instruction: "Clique sur 'Sens propre' ou 'Sens figuré' pour chaque phrase.",
            colA: "Sens propre",
            colB: "Sens figuré",
            items: [
              { text: "Il broie du noir depuis la mauvaise nouvelle.", answer: "B", feedback: "On ne broie pas vraiment du noir : cette expression signifie 'être déprimé, avoir des idées sombres'. Sens figuré." },
              { text: "Le broyeur broie les déchets.", answer: "A", feedback: "Le broyeur écrase physiquement les déchets. Sens propre, action concrète." },
              { text: "Elle a les pieds sur terre.", answer: "B", feedback: "Ses pieds ne touchent pas forcément le sol ici : l'expression signifie 'être pragmatique, réaliste'. Sens figuré." },
              { text: "Il pose ses pieds dans la boue.", answer: "A", feedback: "Les pieds touchent réellement la boue. C'est le sens propre et concret de l'action." },
              { text: "Il nage dans le bonheur.", answer: "B", feedback: "On ne nage pas dans le bonheur comme dans l'eau : c'est une image exprimant une grande joie. Sens figuré." }
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Analyser et créer des images — métaphore et sens figuré dans les textes",
        questions: [
          {
            type: "col-sort",
            instruction: "Classe ces expressions : sens propre ou sens figuré ?",
            colA: "Sens propre",
            colB: "Sens figuré",
            items: [
              { text: "Il bouillait d'impatience.", answer: "B", feedback: "On ne bout pas vraiment : c'est une image pour dire qu'on est très impatient. Sens figuré." },
              { text: "La casserole bout sur le feu.", answer: "A", feedback: "L'eau bout réellement à 100°C. Sens propre." },
              { text: "Ce livre m'a dévoré.", answer: "B", feedback: "Un livre ne dévore pas physiquement : cette image exprime qu'on était absorbé, captivé par la lecture. Sens figuré." },
              { text: "Le lion a dévoré sa proie.", answer: "A", feedback: "Le lion mange vraiment sa proie. Sens propre, action concrète." },
              { text: "Elle portait un lourd fardeau.", answer: "A", feedback: "Un fardeau est un vrai poids ici (un sac, un paquet lourd). Sens propre. (Il peut aussi être figuré selon le contexte.)" }
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
      }
    ]
  }

]; // fin LEX_COMPRENDRE

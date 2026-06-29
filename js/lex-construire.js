window.LEX_CONSTRUIRE = [

  /* ══════════════════════════════════════════════════════════════════════════
     1. Identifier une famille de mots
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "famille-de-mots",
    title: "Identifier une famille de mots",
    levels: ["CM1","CM2","6e"],
    category: "construire-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître une famille de mots — radical commun évident",
        questions: [
          {
            type: "mcq",
            instruction: "Quel mot appartient à la famille de « chant » ?",
            choices: ["chanson","château","chance","charme"],
            answer: "chanson",
            feedback: "Chanson vient du radical « chant ». Château, chance et charme ont une origine différente."
          },
          {
            type: "mcq",
            instruction: "Quel mot N'appartient PAS à la famille de « marcher » ?",
            choices: ["marcheur","démarche","marché","marche"],
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
            choices: ["port","por","porte","portabl"],
            answer: "port",
            feedback: "Le radical « port- » est commun à tous ces mots : port-eur, port-age, port-able. Il vient du verbe porter."
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Familles plus subtiles et faux-amis de famille",
        questions: [
          {
            type: "mcq",
            instruction: "Quel mot est un intrus dans la famille de « pied » ?",
            choices: ["piéton","trépied","piège","piédestal"],
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
            choices: ["lilas","lisible","lime","lion"],
            answer: "lisible",
            feedback: "Lisible = que l'on peut lire. Il contient le radical « lis- » (variante de « lir- »). Lilas, lime et lion n'ont aucun lien avec la lecture."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Analyse fine et familles étymologiques",
        questions: [
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
            choices: ["prévoir","voile","revoir","apercevoir"],
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     2. Identifier le radical d'un mot
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "identifier-radical",
    title: "Identifier le radical d'un mot",
    levels: ["CM1","CM2","6e"],
    category: "construire-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Trouver le radical — mots simples",
        questions: [
          {
            type: "mcq",
            instruction: "Quel est le radical du mot « chanteur » ?",
            choices: ["chant","-eur","chanteuse","chante"],
            answer: "chant",
            feedback: "Chant-eur : le radical est « chant ». Le suffixe « -eur » indique une personne qui fait l'action."
          },
          {
            type: "mcq",
            instruction: "Quel est le radical commun à « jardiner », « jardinier » et « jardinage » ?",
            choices: ["jardin","jar","jardinage","jardiner"],
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
            choices: ["fleur","florist","fleurist","-iste"],
            answer: "fleur",
            feedback: "Fleur-iste : le radical est « fleur ». Le suffixe « -iste » désigne un métier ou une spécialité."
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Radical moins évident — changements d'orthographe",
        questions: [
          {
            type: "mcq",
            instruction: "Quel est le radical du mot « invisible » ?",
            choices: ["in-","vis","visible","-ible"],
            answer: "vis",
            feedback: "Invisible = in- (non) + vis (voir) + -ible (que l'on peut). Le radical « vis- » vient du latin « videre » (voir)."
          },
          {
            type: "mcq",
            instruction: "Quel est le radical du mot « agrandissement » ?",
            choices: ["a-","grand","-issement","agrand"],
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
            choices: ["boulangi","boulanger","boulang","boul"],
            answer: "boulang",
            feedback: "Le radical commun est « boulang- ». Il vient de l'ancien français « boulange » (action de faire le pain)."
          },
          {
            type: "mcq",
            instruction: "Quel est le radical du mot « malheureux » ?",
            choices: ["mal-","heureux","heur","-eux"],
            answer: "heur",
            feedback: "Mal-heur-eux : « mal- » est le préfixe, « heur » est le radical (ancien mot pour « chance, destin »), « -eux » est le suffixe."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Radicaux latins et grecs — familles étymologiques",
        questions: [
          {
            type: "mcq",
            instruction: "Quel est le radical commun à « portable », « transport » et « importation » ?",
            choices: ["port","trans","-able","import"],
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
              { text: "audition", answer: "B", feedback: "Audition vient du latin « audire » (entendre). Radical aud-." },
              { text: "visuel", answer: "A", feedback: "Visuel = qui concerne la vision. Radical vis-." },
              { text: "inaudible", answer: "B", feedback: "Inaudible = qu'on ne peut pas entendre. Radical aud-." },
              { text: "invisible", answer: "A", feedback: "Invisible = qu'on ne peut pas voir. Radical vis-." }
            ],
            feedback: "Vis- (visuel, visible, invisible) vient du latin « videre » (voir). Aud- (audition, inaudible) vient de « audire » (entendre)."
          },
          {
            type: "mcq",
            instruction: "Dans « biologie », « zoologie » et « psychologie », quel est le radical grec commun ?",
            choices: ["-logie","bio","zoo","psycho"],
            answer: "-logie",
            feedback: "Le radical grec « logos » (étude, discours) donne le suffixe « -logie ». Biologie = étude du vivant, zoologie = étude des animaux."
          },
          {
            type: "mcq",
            instruction: "Quel est le radical commun à « lumineux », « illuminer » et « luminosité » ?",
            choices: ["lumin","lum","illumin","luminosit"],
            answer: "lumin",
            feedback: "Le radical « lumin- » vient du latin « lumen » (lumière). On le retrouve dans lumineux, illuminer, luminosité."
          },
          {
            type: "match",
            instruction: "Associe chaque radical latin à sa signification.",
            pairs: [
              { left: "aqua-", right: "eau" },
              { left: "terr-", right: "terre" },
              { left: "igni-", right: "feu" }
            ],
            feedback: "Aqua- (aquarium, aquatique), terr- (territoire, terrain), igni- (igné, ignifugé) sont des radicaux latins courants."
          }
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     3. Identifier un préfixe
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "identifier-prefixe",
    title: "Identifier un préfixe",
    levels: ["CM1","CM2","6e"],
    category: "construire-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître les préfixes courants",
        questions: [
          {
            type: "mcq",
            instruction: "Quel est le préfixe dans le mot « déplacer » ?",
            choices: ["dé-","place","-er","dép"],
            answer: "dé-",
            feedback: "Dé-placer : « dé- » est le préfixe. Il signifie « contraire de » ou « action inverse ». Dé-placer = ne plus être à sa place."
          },
          {
            type: "mcq",
            instruction: "Que signifie le préfixe « re- » dans « recommencer » ?",
            choices: ["avant","après","à nouveau","sans"],
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
            choices: ["maison","soleil","désordre","jardin"],
            answer: "désordre",
            feedback: "Désordre = dés- (préfixe = contraire) + ordre. Maison, soleil et jardin n'ont pas de préfixe."
          },
          {
            type: "mcq",
            instruction: "Quel préfixe faut-il ajouter à « heureux » pour former son contraire ?",
            choices: ["re-","mal-","pré-","sur-"],
            answer: "mal-",
            feedback: "Malheureux = mal- + heureux. Le préfixe « mal- » exprime une idée négative ou mauvaise."
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Utiliser les préfixes pour comprendre et former des mots",
        questions: [
          {
            type: "mcq",
            instruction: "Que signifie le préfixe « anti- » dans « antiviolence » ?",
            choices: ["avant","contre","à nouveau","sans"],
            answer: "contre",
            feedback: "Anti- vient du grec et signifie « contre ». Antiviolence = contre la violence. Aussi : antibiotique, antidote…"
          },
          {
            type: "mcq",
            instruction: "Le préfixe « inter- » dans « intercontinental » signifie…",
            choices: ["à l'intérieur","entre","au-delà","contre"],
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
              { text: "décoller", answer: "B", feedback: "Décoller = séparer ce qui était collé. Préfixe dé- = action inverse." },
              { text: "revenir", answer: "A", feedback: "Revenir = venir à nouveau. Préfixe re- = répétition." }
            ],
            feedback: "Re- exprime la répétition (refaire, relire, revenir). Dé- et mal- expriment le contraire ou l'action inverse."
          },
          {
            type: "mcq",
            instruction: "Quel préfixe donne à « possible » son contraire ?",
            choices: ["dé-","im-","re-","sur-"],
            answer: "im-",
            feedback: "Impossible = im- + possible. Im- (variante de in- devant p, b, m) exprime la négation."
          },
          {
            type: "mcq",
            instruction: "Que signifie le préfixe « bi- » dans « bilingue » ?",
            choices: ["sans","deux","entre","beaucoup"],
            answer: "deux",
            feedback: "Bi- vient du latin « bis » (deux fois). Bilingue = qui parle deux langues. Aussi : bicyclette (deux roues), bimensuel (deux fois par mois)."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Préfixes savants d'origine latine et grecque",
        questions: [
          {
            type: "mcq",
            instruction: "Quel préfixe grec signifiant « loin » retrouve-t-on dans « téléphone », « télévision » et « télécommunication » ?",
            choices: ["télé-","téléph-","tél-","phon-"],
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
            choices: ["hyp-","hypo-","hyper-","hé-"],
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
              { text: "sous-estimé", answer: "B", feedback: "Sous- = en dessous. Sous-estimé = pas assez estimé." },
              { text: "hyperactif", answer: "A", feedback: "Hyper- = excessif. Hyperactif = trop actif." },
              { text: "infrastructure", answer: "B", feedback: "Infra- = en dessous. Infrastructure = la base, ce qui est en dessous." },
              { text: "ultra-rapide", answer: "A", feedback: "Ultra- = extrêmement. Ultra-rapide = très très rapide." }
            ],
            feedback: "Hyper-, sur-, ultra- expriment l'excès ou le dépassement. Hypo-, sous-, infra- expriment l'insuffisance ou ce qui est en dessous."
          },
          {
            type: "mcq",
            instruction: "Le préfixe « anthropo- » (dans « anthropologie ») vient du grec et signifie…",
            choices: ["animal","homme","nature","société"],
            answer: "homme",
            feedback: "Anthropo- vient du grec « anthrôpos » (être humain). Anthropologie = étude de l'être humain. On retrouve ce préfixe dans « philanthrope » (ami des hommes)."
          }
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     4. Identifier un suffixe
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "identifier-suffixe",
    title: "Identifier un suffixe",
    levels: ["CM1","CM2","6e"],
    category: "construire-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître les suffixes courants",
        questions: [
          {
            type: "mcq",
            instruction: "Quel est le suffixe dans le mot « jardinage » ?",
            choices: ["jardin-","-age","-inage","jard-"],
            answer: "-age",
            feedback: "Jardin-age : le suffixe « -age » indique une action ou son résultat. Jardinage = l'action de jardiner."
          },
          {
            type: "mcq",
            instruction: "Que signifie le suffixe « -eur » dans « plongeur » ?",
            choices: ["une action","un endroit","celui qui fait l'action","une qualité"],
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
            choices: ["maison","jardin","maisonnette","soleil"],
            answer: "maisonnette",
            feedback: "Maisonnette = maison + -ette. Le suffixe « -ette » exprime la petite taille ou un diminutif."
          },
          {
            type: "mcq",
            instruction: "Quel suffixe retrouve-t-on dans « épicerie », « boulangerie » et « boucherie » pour désigner un lieu de commerce ?",
            choices: ["-erie","-er","-rie","-ie"],
            answer: "-erie",
            feedback: "Le suffixe « -erie » désigne souvent un lieu de commerce ou de travail : épic-erie, boulang-erie, bouch-erie, libr-airie…"
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Suffixes et catégories grammaticales",
        questions: [
          {
            type: "mcq",
            instruction: "Quel suffixe transforme l'adjectif « rapide » en adverbe ?",
            choices: ["-ment","-eur","-age","-ette"],
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
              { text: "nettoyage", answer: "B", feedback: "Nettoyage = action de nettoyer. Suffixe -age = action." },
              { text: "pianiste", answer: "A", feedback: "Pianiste = celui qui joue du piano. Suffixe -iste = personne." },
              { text: "construction", answer: "B", feedback: "Construction = résultat de construire. Suffixe -tion = action/résultat." },
              { text: "musicien", answer: "A", feedback: "Musicien = celui qui joue de la musique. Suffixe -ien = personne." }
            ],
            feedback: "-eur, -iste et -ien désignent des personnes. -age, -tion et -ment désignent des actions ou leurs résultats."
          },
          {
            type: "mcq",
            instruction: "Le suffixe « -iste » dans « fleuriste » exprime…",
            choices: [
              "Une petite fleur",
              "Une profession ou spécialité",
              "Une action",
              "Un résultat"
            ],
            answer: "Une profession ou spécialité",
            feedback: "Fleur-iste : le suffixe « -iste » désigne une personne exerçant une profession. Aussi : pianiste, dentiste, journaliste…"
          },
          {
            type: "mcq",
            instruction: "Quel suffixe dans « livraison » crée un nom d'action à partir du verbe « livrer » ?",
            choices: ["-son","-aison","-ison","livr-"],
            answer: "-aison",
            feedback: "Livr-aison : le suffixe « -aison » crée des noms d'action. Aussi : terminaison (terminer), floraison (fleurir), pendaison (pendre)."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Suffixes savants d'origine latine et grecque",
        questions: [
          {
            type: "mcq",
            instruction: "Le suffixe « -logie » dans « biologie », « zoologie » et « psychologie » vient du grec et signifie…",
            choices: ["voir","écrire","étude / discours","vivre"],
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
            choices: ["omni-","-vore","-ore","omniv-"],
            answer: "-vore",
            feedback: "-vore vient du latin « vorare » (dévorer). Omnivore = mange de tout. Aussi : carnivore (viande), herbivore (herbe), insectivore (insectes)."
          },
          {
            type: "col-sort",
            instruction: "Classe chaque suffixe selon son origine : grec ou latin ?",
            colA: "Origine grecque",
            colB: "Origine latine",
            items: [
              { text: "-logie (biologie)", answer: "A", feedback: "-logie vient du grec « logos » (étude). Ex : biologie, zoologie." },
              { text: "-tion (construction)", answer: "B", feedback: "-tion vient du latin (action ou résultat). Ex : construction, animation." },
              { text: "-phile (cinéphile)", answer: "A", feedback: "-phile vient du grec « philos » (ami). Ex : cinéphile, bibliophile." },
              { text: "-age (jardinage)", answer: "B", feedback: "-age vient du latin (action ou résultat). Ex : jardinage, bricolage." },
              { text: "-scope (microscope)", answer: "A", feedback: "-scope vient du grec « skopein » (observer). Ex : microscope, télescope." }
            ],
            feedback: "Les suffixes d'origine grecque enrichissent surtout le vocabulaire scientifique (-logie, -phile, -scope). Les suffixes latins sont très courants dans le français quotidien (-tion, -age)."
          },
          {
            type: "mcq",
            instruction: "Le suffixe « -graphie » (dans « photographie ») vient du grec « graphein » qui signifie…",
            choices: ["voir","écrire / représenter","mesurer","parler"],
            answer: "écrire / représenter",
            feedback: "Graphein signifie « écrire, tracer, représenter » en grec. Photographie = représentation par la lumière. Aussi : calligraphie, biographie, typographie."
          }
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     5. Former un mot dérivé
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "mot-derive",
    title: "Former un mot dérivé",
    levels: ["CM2","6e"],
    category: "construire-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Construire des mots dérivés simples",
        questions: [
          {
            type: "mcq",
            instruction: "Quel mot est dérivé de « fleur » avec un suffixe ?",
            choices: ["fleuve","flocon","fleurir","flûte"],
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
            choices: ["dé-","im-","re-","sur-"],
            answer: "im-",
            feedback: "Impossible = im- + possible. Im- (variante de in- devant p, b, m) exprime la négation."
          },
          {
            type: "mcq",
            instruction: "Quel mot est formé par préfixation à partir de « honnête » ?",
            choices: ["honnêteté","honnêtement","malhonnête","honnêteur"],
            answer: "malhonnête",
            feedback: "Malhonnête = mal- (préfixe) + honnête. C'est une dérivation par préfixation. Honnêteté et honnêtement sont formés par suffixation. Honnêteur n'existe pas."
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Dérivation plus complexe — analyse de la structure",
        questions: [
          {
            type: "mcq",
            instruction: "Quel est le mot de base (radical sans affixes) de « débranchement » ?",
            choices: ["débranche","branche","débranchement","branchement"],
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
            choices: ["jardinier","malheureux","chanteur","fleuri"],
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Analyse morphologique avancée",
        questions: [
          {
            type: "mcq",
            instruction: "Le mot « invraisemblable » est formé de…",
            choices: [
              "in- + vraisemblable",
              "invrai + semblable",
              "in- + vrai + sembl + -able",
              "in- + vraisembl + -able"
            ],
            answer: "in- + vraisemblable",
            feedback: "Invraisemblable = in- (non) + vraisemblable. Et vraisemblable lui-même = vrai + sembl- + -able. C'est un mot à plusieurs niveaux de dérivation."
          },
          {
            type: "col-sort",
            instruction: "Classe chaque mot : est-il dérivé (préfixe ou suffixe) ou composé (deux mots indépendants réunis) ?",
            colA: "Mot dérivé (affixes)",
            colB: "Mot composé (deux mots)",
            items: [
              { text: "porte-monnaie", answer: "B", feedback: "Porte-monnaie = porte + monnaie. C'est un mot composé." },
              { text: "chanteur", answer: "A", feedback: "Chanteur = chant + -eur. C'est un mot dérivé." },
              { text: "arc-en-ciel", answer: "B", feedback: "Arc-en-ciel = arc + en + ciel. C'est un mot composé." },
              { text: "malheureux", answer: "A", feedback: "Malheureux = mal- + heur + -eux. C'est un mot dérivé." },
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
            choices: ["très","en dehors de / au-delà de","entre","avant"],
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     6. Comprendre l'origine des mots (latin, grec)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "origine-mots",
    title: "Comprendre l'origine des mots (latin, grec)",
    levels: ["6e"],
    category: "construire-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Reconnaître les racines latines et grecques courantes",
        questions: [
          {
            type: "mcq",
            instruction: "Que signifie la racine latine « aqua » ?",
            choices: ["feu","eau","terre","air"],
            answer: "eau",
            feedback: "« Aqua » signifie « eau » en latin. On la retrouve dans aquarium, aquatique, aqueduct (conduit d'eau)."
          },
          {
            type: "mcq",
            instruction: "Quelle racine grecque signifie « vie » ?",
            choices: ["geo","bio","photo","logo"],
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
            choices: [
              "Endroit pour lire",
              "Rangement de livres",
              "Collection de livres anciens",
              "Maison du savoir"
            ],
            answer: "Rangement de livres",
            feedback: "Bibliothèque = biblion (livre) + theke (rangement, coffre). Littéralement : l'endroit où l'on range les livres."
          },
          {
            type: "mcq",
            instruction: "La racine « graph- » (du grec « graphein ») dans « autographe » signifie…",
            choices: ["lire","voir","écrire / tracer","entendre"],
            answer: "écrire / tracer",
            feedback: "Graphein signifie « écrire, tracer » en grec. Autographe = écrit de sa propre main. Aussi : photographie, calligraphie, orthographe."
          }
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Reconnaître et utiliser des racines latines et grecques",
        questions: [
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
            choices: ["graph","geo","log","bio"],
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
              { text: "téléphone", answer: "B", feedback: "Téléphone vient du grec « têle » (loin) + « phone » (voix)." },
              { text: "lunaire", answer: "A", feedback: "Lunaire vient du latin « luna » (lune)." },
              { text: "microscope", answer: "B", feedback: "Microscope vient du grec « mikros » (petit) + « skopein » (observer)." },
              { text: "solaire", answer: "A", feedback: "Solaire vient du latin « sol » (soleil)." }
            ],
            feedback: "Le latin et le grec ont tous deux enrichi le français, surtout dans les domaines scientifiques et savants."
          },
          {
            type: "mcq",
            instruction: "La racine « phon- » (du grec « phone ») dans « microphone » et « téléphone » signifie…",
            choices: ["lumière","voix / son","eau","voir"],
            answer: "voix / son",
            feedback: "Phone = voix, son en grec. Microphone = qui amplifie la voix, téléphone = voix à distance, phonologie = étude des sons."
          },
          {
            type: "mcq",
            instruction: "Parmi ces mots, lequel vient de la racine latine « manus » (main) ?",
            choices: ["manteau","manuel","manie","manège"],
            answer: "manuel",
            feedback: "Manuel vient du latin « manualis » (de la main). Un travail manuel = fait à la main. Manteau vient d'un autre mot latin (mantellum)."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Étymologie avancée — familles latines et grecques",
        questions: [
          {
            type: "mcq",
            instruction: "La racine grecque « demos » signifie « peuple ». Dans quel mot la retrouve-t-on ?",
            choices: ["démon","démocratie","démolir","démontrer"],
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
            choices: ["animal","qui mange","qui court","qui vit"],
            answer: "qui mange",
            feedback: "Vore vient du latin « vorare » (dévorer). Carnivore = mange de la viande, herbivore = mange de l'herbe, omnivore = mange de tout."
          },
          {
            type: "col-sort",
            instruction: "Ces racines viennent-elles du latin ou du grec ?",
            colA: "Latin",
            colB: "Grec",
            items: [
              { text: "spect (voir) → spectacle", answer: "A", feedback: "Spectacle vient du latin « spectare » (regarder)." },
              { text: "opt (vue) → optique", answer: "B", feedback: "Optique vient du grec « optikos » (de la vue)." },
              { text: "aud (entendre) → audition", answer: "A", feedback: "Audition vient du latin « audire » (entendre)." },
              { text: "acou (entendre) → acoustique", answer: "B", feedback: "Acoustique vient du grec « akouein » (entendre)." },
              { text: "vid/vis (voir) → vision", answer: "A", feedback: "Vision vient du latin « videre » (voir)." }
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
      }
    ]
  }

];

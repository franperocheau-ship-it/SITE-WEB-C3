window.LEX_RELATIONS = [

  /* ══════════════════════════════════════════════════════════════════════════
     1. Regrouper des mots par thème
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "regrouper-par-theme",
    title: "Regrouper des mots par thème",
    levels: ["CM1","CM2","6e"],
    category: "relations-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Catégories simples et évidentes",
        questions: [
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
            choices: ["natation","football","peinture","tennis"],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Catégories plus fines — thèmes abstraits ou subtils",
        questions: [
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
            choices: ["vague","écume","marée","prairie"],
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
              { text: "mélancolie", answer: "A", feedback: "La mélancolie est une forme de tristesse douce et profonde." }
            ],
            feedback: "Les thèmes des émotions (joie, tristesse) rassemblent des mots qui décrivent des états intérieurs. Attention : certains mots comme « larme » peuvent parfois évoquer une joie intense !"
          },
          {
            type: "mcq",
            instruction: "À quel thème général appartiennent « flûte », « violon », « batterie » et « trompette » ?",
            choices: ["Les sports","La musique","Les outils","Les transports"],
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Thèmes abstraits, intrus difficiles, polysémie",
        questions: [
          {
            type: "col-sort",
            instruction: "Classe chaque mot dans son thème.",
            colA: "La guerre",
            colB: "La paix",
            items: [
              { text: "canon", answer: "A", feedback: "Le canon est une arme de guerre." },
              { text: "traité", answer: "B", feedback: "Un traité de paix met fin à un conflit." },
              { text: "bataillon", answer: "A", feedback: "Un bataillon est une unité militaire." },
              { text: "diplomatie", answer: "B", feedback: "La diplomatie cherche des solutions pacifiques aux conflits." },
              { text: "armée", answer: "A", feedback: "L'armée est une organisation militaire liée à la guerre." }
            ],
            feedback: "Attention : certains mots comme « armistice » ou « trêve » appartiennent aux deux thèmes — ils désignent des pauses dans la guerre."
          },
          {
            type: "mcq",
            instruction: "Quel mot peut appartenir à deux thèmes différents selon le contexte ?",
            choices: [
              "vague (la mer / l'imprécision)",
              "marée",
              "écume",
              "phare"
            ],
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
              { text: "bénéfice", answer: "A", feedback: "Le bénéfice est le gain réalisé dans une activité commerciale." }
            ],
            feedback: "Commerce et droit sont deux domaines bien distincts, même si certains mots (comme « contrat ») peuvent appartenir aux deux."
          },
          {
            type: "mcq",
            instruction: "Dans quel thème général range-t-on les mots « épistolaire », « narratif », « lyrique » et « dramatique » ?",
            choices: ["La géographie","Les genres littéraires","La biologie","Les arts plastiques"],
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     2. Identifier un champ lexical
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "champ-lexical",
    title: "Identifier un champ lexical",
    levels: ["CM2","6e"],
    category: "relations-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Champs lexicaux évidents — identifier les membres d'un champ",
        questions: [
          {
            type: "col-sort",
            instruction: "Classe chaque mot : appartient-il au champ lexical de la mer ?",
            colA: "Champ lexical de la mer",
            colB: "N'appartient pas à ce champ",
            items: [
              { text: "vague", answer: "A", feedback: "Une vague est un mouvement de l'eau de mer." },
              { text: "montagne", answer: "B", feedback: "La montagne n'appartient pas au champ lexical de la mer." },
              { text: "marin", answer: "A", feedback: "Un marin travaille sur la mer." },
              { text: "prairie", answer: "B", feedback: "La prairie est un espace terrestre, sans lien avec la mer." },
              { text: "phare", answer: "A", feedback: "Le phare est une tour lumineuse qui guide les bateaux en mer." }
            ],
            feedback: "Le champ lexical de la mer rassemble tous les mots qui évoquent la mer : ses mouvements, ses habitants, ses outils de navigation…"
          },
          {
            type: "mcq",
            instruction: "Quel mot N'appartient PAS au champ lexical de la forêt ?",
            choices: ["arbre","feuille","bûcheron","assiette"],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Champs subtils, distinction champ lexical / famille de mots",
        questions: [
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
            choices: ["éclat","songe","marmite","tabouret"],
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
            choices: ["La gastronomie","La médecine","L'architecture","Le sport"],
            answer: "La médecine",
            feedback: "Chirurgien, bistouri, ausculter, patient, diagnostic : tous ces mots appartiennent au champ lexical de la médecine."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Polysémie et analyse fine du champ lexical dans un texte",
        questions: [
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
            choices: ["La cuisine","L'astronomie","La médecine","L'architecture"],
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
            choices: ["Le sport","La musique","La cuisine","La guerre"],
            answer: "La musique",
            feedback: "Cordes, mélodie, maestro, baguette (de chef d'orchestre) : ces mots forment le champ lexical de la musique classique. Identifier ce champ aide à comprendre le sens global d'un texte."
          }
        ]
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     3. Choisir le mot adapté au contexte
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "mot-adapte-contexte",
    title: "Choisir le mot adapté au contexte",
    levels: ["CM2","6e"],
    category: "relations-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Choisir le mot juste dans des phrases au sens évident",
        questions: [
          {
            type: "mcq",
            instruction: "Complète la phrase : « Le chien _____ très fort quand le facteur sonne. »",
            choices: ["chante","aboie","siffle","miaule"],
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
            choices: ["lune","carotte","brosse","chaussure"],
            answer: "lune",
            feedback: "La lune est l'astre qui éclaire la nuit. Les autres mots n'ont aucun rapport avec le ciel."
          },
          {
            type: "mcq",
            instruction: "Dans un compte rendu médical, quel mot est le plus adapté pour parler d'une douleur au ventre ?",
            choices: ["bobo","mal au bidon","douleur abdominale","c'est nul"],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Nuances de sens, précision lexicale, mots quasi-synonymes",
        questions: [
          {
            type: "mcq",
            instruction: "Complète la phrase : « En automne, les feuilles des arbres _____ et recouvrent le sol. »",
            choices: ["tombent","poussent","fleurissent","gèlent"],
            answer: "tombent",
            feedback: "En automne, les feuilles tombent. Pousser et fleurir décrivent le printemps, geler évoque l'hiver."
          },
          {
            type: "mcq",
            instruction: "Lequel de ces mots est le plus précis pour décrire une lumière très faible et terne ?",
            choices: ["éblouissante","vive","blafarde","lumineuse"],
            answer: "blafarde",
            feedback: "Blafarde décrit une lumière faible, froide et sans éclat. Éblouissante, vive et lumineuse désignent au contraire des lumières intenses."
          },
          {
            type: "mcq",
            instruction: "Complète : « L'alpiniste avait les jambes _____ après avoir gravi le sommet. »",
            choices: ["légères","cotonneuses","bronzées","parfumées"],
            answer: "cotonneuses",
            feedback: "« Avoir les jambes cotonneuses (en coton) » exprime la fatigue musculaire extrême. Légères est le contraire, bronzées et parfumées ne correspondent pas à ce contexte."
          },
          {
            type: "mcq",
            instruction: "Complète : « Le conférencier _____ l'assistance avec son exposé passionnant. »",
            choices: ["ennuyait","captivait","dormait","criait"],
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
              { text: "glouglote", answer: "A", feedback: "L'eau glouglote en coulant doucement sur des cailloux." },
              { text: "gronde", answer: "B", feedback: "Un torrent en crue gronde avec une puissance terrifiante." },
              { text: "babille", answer: "A", feedback: "L'eau babille agréablement dans un ruisseau de montagne." }
            ],
            feedback: "Le choix du verbe crée une image précise : murmure/glouglote/babille pour la douceur, déferle/gronde pour la puissance. C'est le lexique de l'eau en mouvement."
          }
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Connotations, registres et précision stylistique",
        questions: [
          {
            type: "mcq",
            instruction: "Quel mot convient le mieux dans : « Sa remarque, bien que _____, m'a blessé. » ?",
            choices: ["anodine","hurlée","parfumée","froide"],
            answer: "anodine",
            feedback: "Anodine = sans importance apparente, sans gravité. La phrase dit que la remarque semblait insignifiante mais a pourtant blessé — c'est le sens voulu."
          },
          {
            type: "mcq",
            instruction: "Dans : « Ce discours a _____ l'assemblée », quel verbe convient pour exprimer l'ennui causé par un exposé confus ?",
            choices: ["fasciné","lassé","réjoui","émerveillé"],
            answer: "lassé",
            feedback: "Lasser = ennuyer, fatiguer par excès ou manque d'intérêt. Un discours confus lasse son auditoire. Fasciner, réjouir, émerveiller expriment tous des réactions positives."
          },
          {
            type: "col-sort",
            instruction: "Classe ces adjectifs selon la connotation qu'ils donnent à un sourire.",
            colA: "Sourire positif (chaleur, sincérité)",
            colB: "Sourire négatif ou ambigu (ironie, froideur)",
            items: [
              { text: "radieux", answer: "A", feedback: "Radieux = qui rayonne de bonheur. Sourire très positif." },
              { text: "narquois", answer: "B", feedback: "Narquois = moqueur, plein d'ironie cachée." },
              { text: "épanoui", answer: "A", feedback: "Épanoui = plein de joie et de vitalité." },
              { text: "ironique", answer: "B", feedback: "Ironique = qui exprime le contraire de ce qu'on dit vraiment." },
              { text: "chaleureux", answer: "A", feedback: "Chaleureux = qui exprime de la bienveillance sincère." }
            ],
            feedback: "Le choix de l'adjectif change complètement l'image donnée. Un sourire « radieux » et un sourire « narquois » ne traduisent pas du tout la même attitude."
          },
          {
            type: "mcq",
            instruction: "Dans : « Il la regarda avec une moue _____ », quel adjectif exprime le mieux le dédain ?",
            choices: ["admirative","méprisante","affectueuse","attendrie"],
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
      }
    ]
  },

  /* ══════════════════════════════════════════════════════════════════════════
     4. Distinguer les niveaux de langue
  ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "niveaux-de-langue",
    title: "Distinguer les niveaux de langue",
    levels: ["6e"],
    category: "relations-mots",
    niveaux: [
      {
        num: 1,
        label: "Niveau 1",
        desc: "Les trois registres — reconnaître le familier et le soutenu",
        questions: [
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
              { text: "C'est ouf !", answer: "A", feedback: "« Ouf » est du verlan (= fou). Très familier, argotique." },
              { text: "C'est extraordinaire.", answer: "B", feedback: "Courant ou soutenu selon le contexte." },
              { text: "J'ai la dalle.", answer: "A", feedback: "« Avoir la dalle » = avoir faim. Expression familière." },
              { text: "Je n'ai pas faim.", answer: "B", feedback: "Négation correcte, vocabulaire neutre. Registre courant." },
              { text: "Mon pote est arrivé.", answer: "A", feedback: "« Pote » = ami. Mot familier ou argotique." }
            ],
            feedback: "Le registre familier se reconnaît à l'absence de la négation complète, aux mots argotiques ou au verlan. Le registre courant respecte les règles grammaticales standard."
          },
          {
            type: "mcq",
            instruction: "Quel mot est de niveau soutenu pour dire « triste » ?",
            choices: ["cafardeux","triste","mélancolique","déprimé"],
            answer: "mélancolique",
            feedback: "Mélancolique est un terme littéraire et soutenu. Triste est courant. Cafardeux est familier (avoir le cafard = être triste). Déprimé est courant/médical."
          },
          {
            type: "mcq",
            instruction: "À quel niveau de langue appartient : « Veuillez agréer l'expression de mes sincères salutations » ?",
            choices: ["Familier","Courant","Soutenu","Argotique"],
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
        ]
      },
      {
        num: 2,
        label: "Niveau 2",
        desc: "Les trois registres — nuances et équivalences",
        questions: [
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
              { text: "Il a un boulot de ouf.", answer: "A", feedback: "« Boulot » = travail, « de ouf » = incroyable. Double marque familière." },
              { text: "Il exerce une profession éminente.", answer: "B", feedback: "« Profession éminente » est une formulation recherchée et soutenue." },
              { text: "T'as qu'à te bouger.", answer: "A", feedback: "« T'as qu'à » = tu n'as qu'à. Contraction familière." },
              { text: "Il vous serait aisé d'agir promptement.", answer: "B", feedback: "« Aisé » (= facile) et « promptement » (= rapidement) sont des termes soutenus." },
              { text: "C'est chelou ce truc.", answer: "A", feedback: "« Chelou » (verlan de louche) et « truc » sont très familiers." }
            ],
            feedback: "Entre le familier et le soutenu, le registre courant est celui qu'on utilise dans la vie quotidienne normale : correct sans être recherché."
          },
          {
            type: "mcq",
            instruction: "Quel est l'équivalent soutenu de « Il s'est baladé en ville » ?",
            choices: [
              "Il s'est promené en ville.",
              "Il a déambulé dans la cité.",
              "Il a tourné en rond.",
              "Il a traîné."
            ],
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
        ]
      },
      {
        num: 3,
        label: "Niveau 3",
        desc: "Analyse fine, effets de style et maîtrise des registres",
        questions: [
          {
            type: "col-sort",
            instruction: "Classe ces phrases selon leur niveau de langue.",
            colA: "Registre courant",
            colB: "Registre soutenu",
            items: [
              { text: "Je pense que tu as tort.", answer: "A", feedback: "Courant : syntaxe simple et directe, vocabulaire neutre." },
              { text: "Il m'appert que votre position est erronée.", answer: "B", feedback: "« Il m'appert » = il m'apparaît, « erronée » = fausse. Termes très soutenus." },
              { text: "Le film était bien.", answer: "A", feedback: "Courant : formulation simple et directe." },
              { text: "Ce long métrage m'a vivement impressionné.", answer: "B", feedback: "« Long métrage » et « vivement impressionné » sont des formulations recherchées." },
              { text: "Je ne suis pas d'accord.", answer: "A", feedback: "Courant : négation correcte, vocabulaire neutre et précis." }
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
              { text: "la pitance", answer: "B", feedback: "Pitance = nourriture. Terme soutenu, presque vieilli." },
              { text: "la bagnole", answer: "A", feedback: "Bagnole = voiture. Familier." },
              { text: "le véhicule", answer: "B", feedback: "Véhicule = moyen de transport. Courant/soutenu." },
              { text: "le pognon", answer: "A", feedback: "Pognon = argent. Très familier, argotique." }
            ],
            feedback: "Bouffe/pitance, bagnole/véhicule, pognon/argent : ces paires illustrent que le registre change le mot mais pas le sens. Le choix dépend toujours de la situation de communication."
          }
        ]
      }
    ]
  }

];

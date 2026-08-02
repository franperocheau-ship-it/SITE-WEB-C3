/* ── data/orthographe-homophones.js — Homophones grammaticaux (10 exercices) ──
   Migration des 10 pages autonomes ortho-distinguer-*.html vers le moteur
   standard exercise.html?slug=... (type "homophones-niveaux"). Voir
   audit-homophones.md pour le détail compétence par compétence (structure
   de données d'origine, types d'interaction, logique métier propre à chaque
   paire d'homophones) et le résumé de migration pour les adaptations
   apportées lors de la conversion.

   Chaque compétence utilise 3 niveaux (level1Bank/level2Bank/level3Bank),
   sélectionnés via LevelSelect (seuil 80 %, tabs "Niveau 1/2/3"). Chaque
   item de niveau porte son propre champ `type`, dispatché dans
   showQuestion() vers l'un des 6 renderers : choix-etiquette, mots-
   cliquables, classification-etapes (types standards déjà utilisés
   ailleurs sur le site) ou texte-a-trous, production-libre, double-blanc
   (renderers dédiés ajoutés pour cette migration).
   ────────────────────────────────────────────────────────────────────────── */

window.EXERCISE_DATA = window.EXERCISE_DATA || {};

Object.assign(window.EXERCISE_DATA, {

"ortho-distinguer-a-a": {
  title: "Distinguer a / à",
  domaine:    "Français",
  competence: "Orthographe — Homophones grammaticaux",
  type:       "homophones-niveaux",
  levels:     ["CM1", "CM2", "6e"],
  backLink:   { href: "français-orthographe.html", label: "Orthographe" },
  levelDescs: {
    "CM1": "Choisir entre <em>a</em> et <em>à</em> dans des phrases courtes",
    "CM2": "Détecter les erreurs et classer des phrases",
    "6e":  "Compléter des phrases et écrire librement"
  },
  homoShuffle: [false, true, false],

  level1Bank: [
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Il ___ mangé toute la tarte.", choices:["a","à"], answer:"a", hint:"Teste « avait mangé » : ça fonctionne → on écrit « a »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Elle pense ___ ses amis.", choices:["a","à"], answer:"à", hint:"Teste « avait ses amis » : ça ne fonctionne pas → on écrit « à »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Le chat ___ renversé son bol.", choices:["a","à"], answer:"a", hint:"Teste « avait renversé » : ça fonctionne → on écrit « a »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Nous allons ___ la piscine.", choices:["a","à"], answer:"à", hint:"Teste « avait la piscine » : ça ne fonctionne pas → on écrit « à »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Papa ___ appelé le médecin.", choices:["a","à"], answer:"a", hint:"Teste « avait appelé » : ça fonctionne → on écrit « a »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Il tient ___ son jouet.", choices:["a","à"], answer:"à", hint:"Teste « avait son jouet » : ça ne fonctionne pas → on écrit « à »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Elle ___ oublié son cartable.", choices:["a","à"], answer:"a", hint:"Teste « avait oublié » : ça fonctionne → on écrit « a »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Le train part ___ midi.", choices:["a","à"], answer:"à", hint:"Teste « avait midi » : ça ne fonctionne pas → on écrit « à »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Mon frère ___ couru très vite.", choices:["a","à"], answer:"a", hint:"Teste « avait couru » : ça fonctionne → on écrit « a »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Ce livre appartient ___ Léa.", choices:["a","à"], answer:"à", hint:"Teste « avait Léa » : ça ne fonctionne pas → on écrit « à »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Il ___ neigé cette nuit.", choices:["a","à"], answer:"a", hint:"Teste « avait neigé » : ça fonctionne → on écrit « a »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « a » ou « à » ?", word:"Je pense ___ toi.", choices:["a","à"], answer:"à", hint:"Teste « avait toi » : ça ne fonctionne pas → on écrit « à »." }
  ],

  level2Bank: [
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il à gagné le match.", targets:["à"],
      note:"Teste « avait gagné » : ça fonctionne → on écrit <strong>a</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle réagit a l'orage.", targets:["a"],
      note:"Teste « avait l'orage » : ça ne fonctionne pas → on écrit <strong>à</strong> (essaie l'autre test)." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Le chien à aboyé toute la nuit.", targets:["à"],
      note:"Teste « avait aboyé » : ça fonctionne → on écrit <strong>a</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Nous allons a Paris demain.", targets:["a"],
      note:"Teste « avait Paris » : ça ne fonctionne pas → on écrit <strong>à</strong> (essaie l'autre test)." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il à offert des fleurs hier.", targets:["à"],
      note:"Teste « avait offert » : ça fonctionne → on écrit <strong>a</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle à pensé a tout.", targets:["à","a"],
      note:"Teste « avait pensé » : ça fonctionne → on écrit <strong>a</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il a donné son livre à son ami.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle a couru jusqu'à la maison.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Le boulanger a livré le pain à l'école.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Papa a téléphoné à mamie ce matin.", targets:[] },

    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il a dormi.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["a"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"a — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle va à l'école.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["à"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"à — préposition" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il a crié.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["a"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"a — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Je pense à toi.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["à"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"à — préposition" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le chien a mordu.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["a"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"a — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle répond à Paul.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["à"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"à — préposition" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Maman a cuisiné.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["a"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"a — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il joue à la balle.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["à"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"à — préposition" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il a souri.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["a"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"a — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle tient à ce livre.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["à"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"à — préposition" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le vent a soufflé.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["a"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"a — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il habite à Lyon.",
      step1Instruction:"Clique sur « a » ou « à » dans la phrase.", step1Targets:["à"],
      step2Instruction:"Ce mot est-il verbe avoir ou préposition ?", classifyChoices:["a — verbe avoir","à — préposition"], step2Answer:"à — préposition" }
  ],

  level3Bank: [
    { type:"texte-a-trous", sentence:"Le médecin ___ soigné le blessé.",
      blanks:[{ answer:"a", hint:"« avait soigné » fonctionne → on écrit « a »." }] },
    { type:"texte-a-trous", sentence:"Elle habite ___ Bordeaux depuis deux ans.",
      blanks:[{ answer:"à", hint:"« avait Bordeaux » ne fonctionne pas → on écrit « à »." }] },
    { type:"texte-a-trous", sentence:"Le professeur ___ expliqué la leçon.",
      blanks:[{ answer:"a", hint:"« avait expliqué » fonctionne → on écrit « a »." }] },
    { type:"texte-a-trous", sentence:"Il tient ___ terminer son travail.",
      blanks:[{ answer:"à", hint:"« avait terminer » ne fonctionne pas → on écrit « à »." }] },
    { type:"texte-a-trous", sentence:"La tempête ___ abîmé les toitures.",
      blanks:[{ answer:"a", hint:"« avait abîmé » fonctionne → on écrit « a »." }] },
    { type:"texte-a-trous", sentence:"Nous pensons ___ partir demain.",
      blanks:[{ answer:"à", hint:"« avait partir » ne fonctionne pas → on écrit « à »." }] },
    { type:"texte-a-trous", sentence:"Il ___ écrit une lettre ___ sa grand-mère.",
      blanks:[
        { answer:"a", hint:"« avait écrit » fonctionne → on écrit « a »." },
        { answer:"à", hint:"« avait sa grand-mère » ne fonctionne pas → on écrit « à »." }
      ] },
    { type:"texte-a-trous", sentence:"Elle ___ couru ___ toute vitesse.",
      blanks:[
        { answer:"a", hint:"« avait couru » fonctionne → on écrit « a »." },
        { answer:"à", hint:"« avait toute vitesse » ne fonctionne pas → on écrit « à »." }
      ] },
    { type:"texte-a-trous", sentence:"Le chien ___ obéi ___ son maître.",
      blanks:[
        { answer:"a", hint:"« avait obéi » fonctionne → on écrit « a »." },
        { answer:"à", hint:"« avait son maître » ne fonctionne pas → on écrit « à »." }
      ] },
    { type:"texte-a-trous", sentence:"Papa ___ téléphoné ___ son ami.",
      blanks:[
        { answer:"a", hint:"« avait téléphoné » fonctionne → on écrit « a »." },
        { answer:"à", hint:"« avait son ami » ne fonctionne pas → on écrit « à »." }
      ] },
    { type:"texte-a-trous", sentence:"La maîtresse ___ lu l'histoire ___ voix haute.",
      blanks:[
        { answer:"a", hint:"« avait lu » fonctionne → on écrit « a »." },
        { answer:"à", hint:"« avait voix haute » ne fonctionne pas → on écrit « à »." }
      ] },
    { type:"texte-a-trous", sentence:"Il ___ répondu ___ toutes les questions.",
      blanks:[
        { answer:"a", hint:"« avait répondu » fonctionne → on écrit « a »." },
        { answer:"à", hint:"« avait toutes les questions » ne fonctionne pas → on écrit « à »." }
      ] },

    { type:"production-libre", consigne:"Écris une phrase avec le verbe <strong>partir</strong> qui contient à la fois <em>a</em> et <em>à</em>.", words:["a","à"] },
    { type:"production-libre", consigne:"Écris une phrase avec <strong>l'école</strong> qui contient à la fois <em>a</em> et <em>à</em>.", words:["a","à"] },
    { type:"production-libre", consigne:"Écris une phrase avec le verbe <strong>manger</strong> qui contient à la fois <em>a</em> et <em>à</em>.", words:["a","à"] },
    { type:"production-libre", consigne:"Écris une phrase avec le verbe <strong>téléphoner</strong> qui contient à la fois <em>a</em> et <em>à</em>.", words:["a","à"] }
  ]
},
"ortho-distinguer-ce-se": {
  title: "Distinguer ce / se",
  domaine:    "Français",
  competence: "Orthographe — Homophones grammaticaux",
  type:       "homophones-niveaux",
  levels:     ["CM1", "CM2", "6e"],
  backLink:   { href: "français-orthographe.html", label: "Orthographe" },
  levelDescs: {
    "CM1": "Choisir entre <em>ce</em> et <em>se</em> dans des phrases courtes",
    "CM2": "Détecter les erreurs et classer des phrases",
    "6e":  "Compléter des phrases et écrire librement"
  },
  homoShuffle: [false, true, false],

  level1Bank: [
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Il ___ lave les mains avant de manger.", choices:["ce","se"], answer:"se", hint:"Teste « me lave » : ça fonctionne → on écrit « se »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"___ film est très drôle.", choices:["ce","se"], answer:"ce", hint:"Teste « me film » : ça ne fonctionne pas → on écrit « ce »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Elle ___ dépêche pour ne pas être en retard.", choices:["ce","se"], answer:"se", hint:"Teste « me dépêche » : ça fonctionne → on écrit « se »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Il aime ___ quartier depuis toujours.", choices:["ce","se"], answer:"ce", hint:"Teste « me quartier » : ça ne fonctionne pas → on écrit « ce »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Le chat ___ cache sous le canapé.", choices:["ce","se"], answer:"se", hint:"Teste « me cache » : ça fonctionne → on écrit « se »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"___ que tu dis est intéressant.", choices:["ce","se"], answer:"ce", hint:"Teste « me que tu dis » : ça ne fonctionne pas → on écrit « ce »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Il ___ souvient de ses vacances.", choices:["ce","se"], answer:"se", hint:"Teste « me souvient » : ça fonctionne → on écrit « se »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Regarde ___ beau coucher de soleil.", choices:["ce","se"], answer:"ce", hint:"Teste « me beau coucher » : ça ne fonctionne pas → on écrit « ce »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Elle ___ repose après le sport.", choices:["ce","se"], answer:"se", hint:"Teste « me repose » : ça fonctionne → on écrit « se »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"___ soir, on mange ensemble.", choices:["ce","se"], answer:"ce", hint:"Teste « me soir » : ça ne fonctionne pas → on écrit « ce »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Le bébé ___ réveille souvent la nuit.", choices:["ce","se"], answer:"se", hint:"Teste « me réveille » : ça fonctionne → on écrit « se »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ce » ou « se » ?", word:"Il ne comprend pas ___ qui s'est passé.", choices:["ce","se"], answer:"ce", hint:"Teste « me qui s'est passé » : ça ne fonctionne pas → on écrit « ce »." }
  ],

  level2Bank: [
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il ce lève tôt chaque matin.", targets:["ce"],
      note:"Teste « me lève » : ça fonctionne → on écrit <strong>se</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Se livre est passionnant.", targets:["Se"],
      note:"Teste « me livre » : ça ne fonctionne pas → on écrit <strong>ce</strong> (essaie l'autre test)." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle ce demande pourquoi il pleut.", targets:["ce"],
      note:"Teste « me demande » : ça fonctionne → on écrit <strong>se</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il aime se quartier calme.", targets:["se"],
      note:"Teste « me quartier » : ça ne fonctionne pas → on écrit <strong>ce</strong> (essaie l'autre test)." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Le chien ce couche devant la cheminée.", targets:["ce"],
      note:"Teste « me couche » : ça fonctionne → on écrit <strong>se</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Son histoire ce comprend facilement.", targets:["ce"],
      note:"Teste « me comprend » : ça fonctionne → on écrit <strong>se</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Ce matin, il se lève plus tôt que d'habitude.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle ne sait pas ce qui se passe.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Ce livre se lit très facilement.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il se souvient de ce jour-là.", targets:[] },

    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ce chat est mignon.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["Ce"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"ce — déterminant/pronom démonstratif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il se lève.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["se"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"se — pronom réfléchi" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ce soir il fait froid.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["Ce"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"ce — déterminant/pronom démonstratif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle se coiffe.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["se"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"se — pronom réfléchi" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ce que tu veux.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["Ce"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"ce — déterminant/pronom démonstratif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il se cache.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["se"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"se — pronom réfléchi" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ce livre est lourd.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["Ce"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"ce — déterminant/pronom démonstratif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle se dépêche.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["se"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"se — pronom réfléchi" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ce n'est pas vrai.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["Ce"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"ce — déterminant/pronom démonstratif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il se repose.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["se"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"se — pronom réfléchi" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ce moment était beau.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["Ce"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"ce — déterminant/pronom démonstratif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle se souvient.",
      step1Instruction:"Clique sur « ce » ou « se » dans la phrase.", step1Targets:["se"],
      step2Instruction:"Ce mot est-il déterminant/pronom démonstratif ou pronom réfléchi ?", classifyChoices:["ce — déterminant/pronom démonstratif","se — pronom réfléchi"], step2Answer:"se — pronom réfléchi" }
  ],

  level3Bank: [
    { type:"texte-a-trous", sentence:"Les athlètes ___ préparent pour la compétition.",
      blanks:[{ answer:"se", hint:"« me préparent » fonctionne → on écrit « se »." }] },
    { type:"texte-a-trous", sentence:"___ résultat est inattendu.",
      blanks:[{ answer:"ce", hint:"« me résultat » ne fonctionne pas → on écrit « ce »." }] },
    { type:"texte-a-trous", sentence:"Le public ___ lève pour applaudir.",
      blanks:[{ answer:"se", hint:"« me lève » fonctionne → on écrit « se »." }] },
    { type:"texte-a-trous", sentence:"Il ne comprend pas ___ qu'on lui explique.",
      blanks:[{ answer:"ce", hint:"« me qu'on lui explique » ne fonctionne pas → on écrit « ce »." }] },
    { type:"texte-a-trous", sentence:"La situation ___ complique de jour en jour.",
      blanks:[{ answer:"se", hint:"« me complique » fonctionne → on écrit « se »." }] },
    { type:"texte-a-trous", sentence:"___ projet demande beaucoup de travail.",
      blanks:[{ answer:"ce", hint:"« me projet » ne fonctionne pas → on écrit « ce »." }] },
    { type:"texte-a-trous", sentence:"Il ___ souvient de ___ voyage inoubliable.",
      blanks:[
        { answer:"se", hint:"« me souvient » fonctionne → on écrit « se »." },
        { answer:"ce", hint:"« me voyage » ne fonctionne pas → on écrit « ce »." }
      ] },
    { type:"texte-a-trous", sentence:"___ problème ___ règle facilement.",
      blanks:[
        { answer:"ce", hint:"« me problème » ne fonctionne pas → on écrit « ce »." },
        { answer:"se", hint:"« me règle » fonctionne → on écrit « se »." }
      ] },
    { type:"texte-a-trous", sentence:"Elle ___ demande si ___ qu'on lui dit est vrai.",
      blanks:[
        { answer:"se", hint:"« me demande » fonctionne → on écrit « se »." },
        { answer:"ce", hint:"« me qu'on lui dit » ne fonctionne pas → on écrit « ce »." }
      ] },
    { type:"texte-a-trous", sentence:"___ matin, il ___ lève plus tôt que d'habitude.",
      blanks:[
        { answer:"ce", hint:"« me matin » ne fonctionne pas → on écrit « ce »." },
        { answer:"se", hint:"« me lève » fonctionne → on écrit « se »." }
      ] },
    { type:"texte-a-trous", sentence:"Il ___ concentre sur ___ qu'il doit faire.",
      blanks:[
        { answer:"se", hint:"« me concentre » fonctionne → on écrit « se »." },
        { answer:"ce", hint:"« me qu'il doit faire » ne fonctionne pas → on écrit « ce »." }
      ] },
    { type:"texte-a-trous", sentence:"___ que je vois ___ passe sous mes yeux.",
      blanks:[
        { answer:"ce", hint:"« me que je vois » ne fonctionne pas → on écrit « ce »." },
        { answer:"se", hint:"« me passe » fonctionne → on écrit « se »." }
      ] },

    { type:"production-libre", consigne:"Écris une phrase sur <strong>le matin</strong> qui contient à la fois <em>ce</em> et <em>se</em>.", words:["ce","se"] },
    { type:"production-libre", consigne:"Écris une phrase sur <strong>un animal</strong> qui contient à la fois <em>ce</em> et <em>se</em>.", words:["ce","se"] },
    { type:"production-libre", consigne:"Écris une phrase sur <strong>l'école</strong> qui contient à la fois <em>ce</em> et <em>se</em>.", words:["ce","se"] },
    { type:"production-libre", consigne:"Écris une phrase sur <strong>un souvenir</strong> qui contient à la fois <em>ce</em> et <em>se</em>.", words:["ce","se"] }
  ]
},
  "ortho-distinguer-ces-ses-cest-sest": {
    title: "ces / ses / c'est / s'est / sait / sais",
    domaine:    "Français",
    competence: "Orthographe — Homophones grammaticaux",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Choisir entre « ces » et « ses »",
      "CM2": "Choisir entre « c'est » et « s'est »",
      "6e":  "Les six formes mélangées (ces/ses, c'est/s'est, sait/sais), y compris des phrases à deux blancs"
    },
    homoShuffle: [false, false, true],

    level1Bank: [
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Il brosse ___ dents avant de se coucher.",        choices:["ces","ses"], answer:"ses", hint:"Au singulier : son/sa ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Regarde ___ beaux papillons là-bas !",           choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Elle peigne ___ cheveux devant le miroir.",      choices:["ces","ses"], answer:"ses", hint:"Au singulier : son/sa ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"___ étoiles brillent très fort ce soir.",        choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Le chat lèche ___ pattes après avoir mangé.",    choices:["ces","ses"], answer:"ses", hint:"Au singulier : son/sa ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"___ vagues sont très dangereuses aujourd'hui.",  choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Il emporte toujours ___ médicaments en voyage.", choices:["ces","ses"], answer:"ses", hint:"Au singulier : son/sa ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"___ fleurs sauvages poussent le long du chemin.", choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Elle écrit ___ secrets dans un journal intime.",  choices:["ces","ses"], answer:"ses", hint:"Au singulier : son/sa ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"On peut voir ___ sommets enneigés depuis ici.",  choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"Il téléphone souvent à ___ grands-parents.",     choices:["ces","ses"], answer:"ses", hint:"Au singulier : son/sa ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ces » ou « ses » ?", word:"___ petits oiseaux reviennent chaque printemps.", choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" }
    ],

    level2Bank: [
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"___ une belle journée.",             choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"Il ___ trompé de chemin.",           choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"___ lui qui a gagné.",                choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"Elle ___ blessée en tombant.",       choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"___ vrai ce que tu dis.",             choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"Le chat ___ caché sous le lit.",     choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"___ difficile à comprendre.",         choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"Il ___ endormi pendant le film.",    choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"___ ici que tout a commencé.",        choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"Elle ___ souvenue de son rêve.",     choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"___ pour ça qu'il est parti.",        choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « c'est » ou « s'est » ?", word:"Le soleil ___ levé très tôt.",       choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" }
    ],

    /* Niveau 3 : les 6 formes mélangées — 13 phrases à 1 blanc (choix-etiquette)
       + 7 phrases à 2 blancs indépendants (double-blanc). Les indices "hint"
       reprennent les explications FB[...].ok de la page d'origine. */
    level3Bank: [
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Je ___ que tu as raison.",                 choices:["sais","sait"],   answer:"sais", hint:"Verbe savoir, 1re ou 2e personne ✓"   },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ incroyable ce qu'il a fait !",         choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓"  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Il ___ très bien jouer de la guitare.",     choices:["sais","sait"],   answer:"sait", hint:"Verbe savoir, 3e personne ✓"   },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Elle ___ levée tôt pour prendre le train.", choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓"  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ montagnes sont couvertes de neige en hiver.", choices:["ces","ses"], answer:"ces", hint:"Au singulier : ce/cette ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Tu ___ ce que tu fais ?",                   choices:["sais","sait"],   answer:"sais", hint:"Verbe savoir, 1re ou 2e personne ✓"   },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ grâce à elle que tout s'est arrangé.",  choices:["c'est","s'est"], answer:"c'est", hint:"Remplace par « cela est » : fonctionne ✓"  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Il ___ perdu dans la forêt.",              choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓"  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ vagues fascinent les surfeurs.",       choices:["ces","ses"],     answer:"ces", hint:"Au singulier : ce/cette ✓"    },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Le chien agite ___ pattes de joie.",       choices:["ces","ses"],     answer:"ses", hint:"Au singulier : son/sa ✓"    },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"On ne ___ jamais de quoi demain sera fait.", choices:["sais","sait"], answer:"sait", hint:"Verbe savoir, 3e personne ✓"   },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Il ___ souvenu de cet épisode.",           choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Il sait ce qui ___ passé.",                choices:["c'est","s'est"], answer:"s'est", hint:"Verbe pronominal au passé composé ✓" },

      { type:"double-blanc", sentence:"Il serre ___ enfants dans ___ bras.",
        blanks:[
          { answer:"ses", choices:["ces","ses"], hint:"Au singulier : son/sa ✓" },
          { answer:"ses", choices:["ces","ses"], hint:"Au singulier : son/sa ✓" }
        ] },
      { type:"double-blanc", sentence:"Je ___ que ___ lui qui ment.",
        blanks:[
          { answer:"sais",  choices:["sais","sait"],   hint:"Verbe savoir, 1re ou 2e personne ✓" },
          { answer:"c'est", choices:["c'est","s'est"], hint:"Remplace par « cela est » : fonctionne ✓" }
        ] },
      { type:"double-blanc", sentence:"Le garçon a perdu ___ sandales dans ___ vagues.",
        blanks:[
          { answer:"ses", choices:["ces","ses"], hint:"Au singulier : son/sa ✓" },
          { answer:"ces", choices:["ces","ses"], hint:"Au singulier : ce/cette ✓" }
        ] },
      { type:"double-blanc", sentence:"Il ___ blessé et je ___ que c'est grave.",
        blanks:[
          { answer:"s'est", choices:["c'est","s'est"], hint:"Verbe pronominal au passé composé ✓" },
          { answer:"sais",  choices:["sais","sait"],   hint:"Verbe savoir, 1re ou 2e personne ✓" }
        ] },
      { type:"double-blanc", sentence:"___ dommage qu'il ne ___ pas ce sport.",
        blanks:[
          { answer:"c'est", choices:["c'est","s'est"], hint:"Remplace par « cela est » : fonctionne ✓" },
          { answer:"sait",  choices:["sais","sait"],   hint:"Verbe savoir, 3e personne ✓" }
        ] },
      { type:"double-blanc", sentence:"Tu ___ où il ___ réfugié ?",
        blanks:[
          { answer:"sais",  choices:["sais","sait"],   hint:"Verbe savoir, 1re ou 2e personne ✓" },
          { answer:"s'est", choices:["c'est","s'est"], hint:"Verbe pronominal au passé composé ✓" }
        ] },
      { type:"double-blanc", sentence:"Je ne ___ pas si ___ vrai.",
        blanks:[
          { answer:"sais",  choices:["sais","sait"],   hint:"Verbe savoir, 1re ou 2e personne ✓" },
          { answer:"c'est", choices:["c'est","s'est"], hint:"Remplace par « cela est » : fonctionne ✓" }
        ] }
    ]
  },
  "ortho-distinguer-et-est": {
    title: "Distinguer et / est",
    domaine:    "Français",
    competence: "Orthographe — Homophones grammaticaux",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Choisir entre <em>est</em> et <em>et</em> dans des phrases courtes",
      "CM2": "Détecter les erreurs et classer des phrases",
      "6e":  "Compléter des phrases et écrire librement"
    },
    homoShuffle: [false, true, false],

    level1Bank: [
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Le ciel ___ bleu aujourd'hui.",            choices:["est","et"], answer:"est", hint:"Teste « était bleu » : ça fonctionne → on écrit « est »." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Il mange une pomme ___ une poire.",         choices:["est","et"], answer:"et", hint:"Teste « était une poire » : ça ne fonctionne pas → on écrit « et »."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"La maîtresse ___ absente ce matin.",        choices:["est","et"], answer:"est", hint:"Teste « était absente » : ça fonctionne → on écrit « est »." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Elle prend son manteau ___ ses gants.",     choices:["est","et"], answer:"et", hint:"Teste « était ses gants » : ça ne fonctionne pas → on écrit « et »."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Le chien ___ fatigué après sa promenade.",  choices:["est","et"], answer:"est", hint:"Teste « était fatigué » : ça fonctionne → on écrit « est »." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Papa lit le journal ___ boit son café.",    choices:["est","et"], answer:"et", hint:"Teste « était boit » : ça ne fonctionne pas → on écrit « et »."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"La porte ___ fermée à clé.",                choices:["est","et"], answer:"est", hint:"Teste « était fermée » : ça fonctionne → on écrit « est »." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Il aime le foot ___ le vélo.",              choices:["est","et"], answer:"et", hint:"Teste « était le vélo » : ça ne fonctionne pas → on écrit « et »."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Le repas ___ prêt.",                        choices:["est","et"], answer:"est", hint:"Teste « était prêt » : ça fonctionne → on écrit « est »." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Lucie chante ___ danse très bien.",         choices:["est","et"], answer:"et", hint:"Teste « était danse » : ça ne fonctionne pas → on écrit « et »."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Ce livre ___ très intéressant.",            choices:["est","et"], answer:"est", hint:"Teste « était intéressant » : ça fonctionne → on écrit « est »." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « est » ou « et » ?", word:"Il range ses affaires ___ part à l'école.", choices:["est","et"], answer:"et", hint:"Teste « était part » : ça ne fonctionne pas → on écrit « et »."  }
    ],

    /* Niveau 2 : 10 mots-cliquables + 12 classification-etapes (les 2 séries
       de 6 phrases de l'original sont ici décomposées en 12 questions
       individuelles au lieu de 2 écrans de tri par lot de 6 — adaptation
       imposée par le format standard classification-etapes, question par
       question). L'item mots-cliquables n°2 ("Elle est venue est a souri.")
       a été reformulé : le mot fautif "est" y apparaissait deux fois dans la
       même phrase (une occurrence correcte + une fautive), ce qui aurait
       rendu les deux occurrences cliquables-correctes avec l'appariement
       par chaîne du renderer standard (targets par valeur, pas par index). */
    level2Bank: [
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Le chat et sur le toit.", targets:["et"],
        note:"Teste « était sur le toit » : ça fonctionne → on écrit <strong>est</strong>." },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Elle chante est danse bien.", targets:["est"],
        note:"Teste « était danse bien » : ça ne fonctionne pas → on écrit <strong>et</strong> (essaie « et puis »)." },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Le match et terminé.", targets:["et"],
        note:"Teste « était terminé » : ça fonctionne → on écrit <strong>est</strong>." },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Il prend son sac est ses clés.", targets:["est"],
        note:"Teste « était ses clés » : ça ne fonctionne pas → on écrit <strong>et</strong> (essaie « et puis »)." },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"La soupe et trop chaude.", targets:["et"],
        note:"Teste « était trop chaude » : ça fonctionne → on écrit <strong>est</strong>." },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Elle chante et elle est contente et heureuse.", targets:[] },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Le soleil est chaud et le ciel est clair.", targets:[] },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Il est fatigué et il va se coucher.", targets:[] },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"La leçon est difficile et longue.", targets:[] },
      { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
        sentence:"Elle est gentille et travailleuse.", targets:[] },

      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le chien est gentil.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["est"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"est — verbe être" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il mange et boit.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["et"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"et — conjonction" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"La route est longue.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["est"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"est — verbe être" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle chante et rit.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["et"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"et — conjonction" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le temps est nuageux.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["est"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"est — verbe être" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il lit et écrit.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["et"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"et — conjonction" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"La maison est grande.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["est"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"est — verbe être" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il court et saute.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["et"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"et — conjonction" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le bébé est endormi.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["est"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"est — verbe être" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle range et nettoie.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["et"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"et — conjonction" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le problème est difficile.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["est"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"est — verbe être" },
      { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il parle et écoute.",
        step1Instruction:"Clique sur « est » ou « et » dans la phrase.", step1Targets:["et"],
        step2Instruction:"Ce mot est-il le verbe être ou la conjonction ?", classifyChoices:["est — verbe être","et — conjonction"], step2Answer:"et — conjonction" }
    ],

    level3Bank: [
      { type:"texte-a-trous", sentence:"Le musée ___ fermé le lundi.",
        blanks:[{ answer:"est", hint:"« était fermé » fonctionne → on écrit « est »." }] },
      { type:"texte-a-trous", sentence:"Elle prend son vélo ___ part au marché.",
        blanks:[{ answer:"et", hint:"« était part » ne fonctionne pas → on écrit « et »." }] },
      { type:"texte-a-trous", sentence:"Le résultat ___ surprenant.",
        blanks:[{ answer:"est", hint:"« était surprenant » fonctionne → on écrit « est »." }] },
      { type:"texte-a-trous", sentence:"Il range sa chambre ___ fait ses devoirs.",
        blanks:[{ answer:"et", hint:"« était fait » ne fonctionne pas → on écrit « et »." }] },
      { type:"texte-a-trous", sentence:"La rivière ___ en crue ce matin.",
        blanks:[{ answer:"est", hint:"« était en crue » fonctionne → on écrit « est »." }] },
      { type:"texte-a-trous", sentence:"Nous visitons Paris ___ Lyon.",
        blanks:[{ answer:"et", hint:"« était Lyon » ne fonctionne pas → on écrit « et »." }] },
      { type:"texte-a-trous", sentence:"Le film ___ long ___ ennuyeux.",
        blanks:[
          { answer:"est", hint:"« était long » fonctionne → « est »." },
          { answer:"et",  hint:"« long était ennuyeux » ne fonctionne pas → « et »." }
        ] },
      { type:"texte-a-trous", sentence:"Il ___ courageux ___ travailleur.",
        blanks:[
          { answer:"est", hint:"« était courageux » fonctionne → « est »." },
          { answer:"et",  hint:"« courageux était travailleur » ne fonctionne pas → « et »." }
        ] },
      { type:"texte-a-trous", sentence:"La route ___ barrée ___ dangereuse.",
        blanks:[
          { answer:"est", hint:"« était barrée » fonctionne → « est »." },
          { answer:"et",  hint:"« barrée était dangereuse » ne fonctionne pas → « et »." }
        ] },
      { type:"texte-a-trous", sentence:"Le repas ___ prêt ___ il sent bon.",
        blanks:[
          { answer:"est", hint:"« était prêt » fonctionne → « est »." },
          { answer:"et",  hint:"« prêt était il sent bon » ne fonctionne pas → « et »." }
        ] },
      { type:"texte-a-trous", sentence:"Elle ___ souriante ___ pleine d'énergie.",
        blanks:[
          { answer:"est", hint:"« était souriante » fonctionne → « est »." },
          { answer:"et",  hint:"« souriante était pleine d'énergie » ne fonctionne pas → « et »." }
        ] },
      { type:"texte-a-trous", sentence:"Le colis ___ arrivé ___ il attend sur le pas de la porte.",
        blanks:[
          { answer:"est", hint:"« était arrivé » fonctionne → « est »." },
          { answer:"et",  hint:"« arrivé était il attend » ne fonctionne pas → « et »." }
        ] },

      { type:"production-libre", consigne:"Écris une phrase sur un <strong>animal</strong> qui contient à la fois <em>est</em> et <em>et</em>.", words:["est","et"] },
      { type:"production-libre", consigne:"Écris une phrase sur <strong>l'école</strong> qui contient à la fois <em>est</em> et <em>et</em>.",   words:["est","et"] },
      { type:"production-libre", consigne:"Écris une phrase sur le <strong>sport</strong> qui contient à la fois <em>est</em> et <em>et</em>.",  words:["est","et"] },
      { type:"production-libre", consigne:"Écris une phrase sur la <strong>météo</strong> qui contient à la fois <em>est</em> et <em>et</em>.",  words:["est","et"] }
    ]
  },
"ortho-distinguer-leur-leurs": {
  title: "Distinguer leur / leurs",
  domaine:    "Français",
  competence: "Orthographe — Homophones grammaticaux",
  type:       "homophones-niveaux",
  levels:     ["CM1", "CM2", "6e"],
  backLink:   { href: "français-orthographe.html", label: "Orthographe" },
  levelDescs: {
    "CM1": "Choisir entre <em>leur</em> et <em>leurs</em> dans des phrases courtes",
    "CM2": "Détecter les erreurs et classer des phrases",
    "6e":  "Compléter des phrases et écrire librement"
  },
  homoShuffle: [false, true, false],

  level1Bank: [
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les enfants rangent ___ affaires.",    choices:["leur","leurs"], answer:"leurs", hint:"ses affaires → pluriel" },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les élèves ont rendu ___ copie.",      choices:["leur","leurs"], answer:"leur", hint:"sa copie → singulier"  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les chats lèchent ___ pelage.",        choices:["leur","leurs"], answer:"leur", hint:"son pelage → singulier"  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les joueurs enfilent ___ maillots.",   choices:["leur","leurs"], answer:"leurs", hint:"ses maillots → pluriel" },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les parents attendent ___ enfants.",   choices:["leur","leurs"], answer:"leurs", hint:"ses enfants → pluriel" },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les oiseaux regagnent ___ nid.",       choices:["leur","leurs"], answer:"leur", hint:"son nid → singulier"  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les élèves ouvrent ___ cahiers.",      choices:["leur","leurs"], answer:"leurs", hint:"ses cahiers → pluriel" },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les pompiers font ___ travail.",       choices:["leur","leurs"], answer:"leur", hint:"son travail → singulier"  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les enfants lavent ___ mains.",        choices:["leur","leurs"], answer:"leurs", hint:"ses mains → pluriel" },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les coureurs reprennent ___ souffle.", choices:["leur","leurs"], answer:"leur", hint:"son souffle → singulier"  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les touristes prennent ___ photos.",   choices:["leur","leurs"], answer:"leurs", hint:"ses photos → pluriel" },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « leur » ou « leurs » ?", word:"Les acteurs apprennent ___ rôle.",     choices:["leur","leurs"], answer:"leur", hint:"son rôle → singulier"  }
  ],

  level2Bank: [
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les enfants ont perdu leurs manteau.", targets:["leurs"],
      note:"« leurs » → <strong>leur</strong> : son manteau → singulier." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Je leur ai dit la vérité.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les élèves ont fini leur devoirs.", targets:["leur"],
      note:"« leur » → <strong>leurs</strong> : ses devoirs → pluriel." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle leur a expliqué la règle.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les sportifs préparent leurs équipement.", targets:["leurs"],
      note:"« leurs » → <strong>leur</strong> : son équipement → singulier." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il leurs a offert des fleurs.", targets:["leurs"],
      note:"« leurs » → <strong>leur</strong> : pronom invariable → jamais de s." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les oiseaux construisent leur nids.", targets:["leur"],
      note:"« leur » → <strong>leurs</strong> : ses nids → pluriel." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Nous leur avons rendu leurs livres.", targets:[] },

    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leur maison est grande.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leur"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leur — singulier ou pronom" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leurs enfants jouent.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leurs"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leurs — pluriel" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Je leur parle.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["leur"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leur — singulier ou pronom" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leurs idées sont bonnes.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leurs"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leurs — pluriel" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leur avis compte.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leur"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leur — singulier ou pronom" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leurs amis arrivent.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leurs"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leurs — pluriel" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leur chien aboie.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leur"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leur — singulier ou pronom" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leurs bagages sont lourds.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leurs"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leurs — pluriel" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il leur répond.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["leur"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leur — singulier ou pronom" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leurs résultats sont bons.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leurs"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leurs — pluriel" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leur projet avance.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leur"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leur — singulier ou pronom" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Leurs parents attendent.",
      step1Instruction:"Clique sur « leur » ou « leurs » dans la phrase.", step1Targets:["Leurs"],
      step2Instruction:"Ce mot est-il « leur » (singulier ou pronom) ou « leurs » (pluriel) ?", classifyChoices:["leur — singulier ou pronom","leurs — pluriel"], step2Answer:"leurs — pluriel" }
  ],

  level3Bank: [
    { type:"texte-a-trous", sentence:"Les médecins ont donné ___ avis sur la question.",
      blanks:[{ answer:"leur", hint:"son avis → singulier" }] },
    { type:"texte-a-trous", sentence:"Les chercheurs ont publié ___ résultats.",
      blanks:[{ answer:"leurs", hint:"ses résultats → pluriel" }] },
    { type:"texte-a-trous", sentence:"Le professeur ___ a expliqué la leçon.",
      blanks:[{ answer:"leur", hint:"pronom → lui" }] },
    { type:"texte-a-trous", sentence:"Les athlètes ont battu ___ record.",
      blanks:[{ answer:"leur", hint:"son record → singulier" }] },
    { type:"texte-a-trous", sentence:"Les élèves ont rendu ___ travaux.",
      blanks:[{ answer:"leurs", hint:"ses travaux → pluriel" }] },
    { type:"texte-a-trous", sentence:"On ___ a annoncé la nouvelle ce matin.",
      blanks:[{ answer:"leur", hint:"pronom → lui" }] },
    { type:"texte-a-trous", sentence:"Les parents lisent une histoire à ___ enfants avant ___ coucher.",
      blanks:[{ answer:"leurs", hint:"ses enfants → pluriel" },
              { answer:"leur",  hint:"son coucher → singulier" }] },
    { type:"texte-a-trous", sentence:"Les enseignants corrigent ___ copies et rendent ___ avis.",
      blanks:[{ answer:"leurs", hint:"ses copies → pluriel" },
              { answer:"leur",  hint:"son avis → singulier" }] },
    { type:"texte-a-trous", sentence:"Les joueurs reprennent ___ entraînements et ___ coach les encourage.",
      blanks:[{ answer:"leurs", hint:"ses entraînements → pluriel" },
              { answer:"leur",  hint:"son coach → singulier" }] },
    { type:"texte-a-trous", sentence:"Je ___ ai expliqué ___ erreurs.",
      blanks:[{ answer:"leur",  hint:"pronom → lui" },
              { answer:"leurs", hint:"ses erreurs → pluriel" }] },
    { type:"texte-a-trous", sentence:"Les scientifiques partagent ___ découvertes avec ___ équipe.",
      blanks:[{ answer:"leurs", hint:"ses découvertes → pluriel" },
              { answer:"leur",  hint:"son équipe → singulier" }] },
    { type:"texte-a-trous", sentence:"On ___ a remis ___ diplômes lors de la cérémonie.",
      blanks:[{ answer:"leur",  hint:"pronom → lui" },
              { answer:"leurs", hint:"ses diplômes → pluriel" }] },

    { type:"production-libre", consigne:"Écris une phrase sur des <strong>enfants</strong> qui contient à la fois <strong>leur</strong> et <strong>leurs</strong>.", words:["leur","leurs"] },
    { type:"production-libre", consigne:"Écris une phrase sur des <strong>sportifs</strong> qui contient à la fois <strong>leur</strong> et <strong>leurs</strong>.", words:["leur","leurs"] },
    { type:"production-libre", consigne:"Écris une phrase sur des <strong>élèves</strong> qui contient à la fois <strong>leur</strong> et <strong>leurs</strong>.", words:["leur","leurs"] },
    { type:"production-libre", consigne:"Écris une phrase sur des <strong>animaux</strong> qui contient à la fois <strong>leur</strong> et <strong>leurs</strong>.", words:["leur","leurs"] }
  ]
},
"ortho-distinguer-on-ont": {
  title: "Distinguer on / ont",
  domaine:    "Français",
  competence: "Orthographe — Homophones grammaticaux",
  type:       "homophones-niveaux",
  levels:     ["CM1", "CM2", "6e"],
  backLink:   { href: "français-orthographe.html", label: "Orthographe" },
  levelDescs: {
    "CM1": "Choisir entre <em>on</em> et <em>ont</em> dans des phrases courtes",
    "CM2": "Détecter les erreurs et classer des phrases",
    "6e":  "Compléter des phrases et écrire librement"
  },
  homoShuffle: [false, true, false],

  level1Bank: [
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"Les élèves ___ fini leur travail.", choices:["on","ont"], answer:"ont", hint:"Teste « avaient fini » : ça fonctionne → on écrit « ont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"___ entend les oiseaux chanter.", choices:["on","ont"], answer:"on", hint:"Teste « avaient entend » : ça ne fonctionne pas → on écrit « on »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"Mes parents ___ acheté une voiture.", choices:["on","ont"], answer:"ont", hint:"Teste « avaient acheté » : ça fonctionne → on écrit « ont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"___ ne sait jamais ce qui peut arriver.", choices:["on","ont"], answer:"on", hint:"Teste « avaient ne sait » : ça ne fonctionne pas → on écrit « on »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"Les enfants ___ joué toute la journée.", choices:["on","ont"], answer:"ont", hint:"Teste « avaient joué » : ça fonctionne → on écrit « ont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"___ dirait qu'il va pleuvoir.", choices:["on","ont"], answer:"on", hint:"Teste « avaient dirait » : ça ne fonctionne pas → on écrit « on »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"Mes amis ___ organisé une fête.", choices:["on","ont"], answer:"ont", hint:"Teste « avaient organisé » : ça fonctionne → on écrit « ont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"___ peut voir la mer depuis ici.", choices:["on","ont"], answer:"on", hint:"Teste « avaient peut voir » : ça ne fonctionne pas → on écrit « on »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"Les pompiers ___ éteint l'incendie.", choices:["on","ont"], answer:"ont", hint:"Teste « avaient éteint » : ça fonctionne → on écrit « ont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"___ a sonné à la porte.", choices:["on","ont"], answer:"on", hint:"Teste « avaient a sonné » : ça ne fonctionne pas → on écrit « on »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"Les voisins ___ fait beaucoup de bruit.", choices:["on","ont"], answer:"ont", hint:"Teste « avaient fait » : ça fonctionne → on écrit « ont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « on » ou « ont » ?", word:"___ apprend beaucoup de choses à l'école.", choices:["on","ont"], answer:"on", hint:"Teste « avaient apprend » : ça ne fonctionne pas → on écrit « on »." }
  ],

  level2Bank: [
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les joueurs on marqué trois buts.", targets:["on"],
      note:"Teste « avaient marqué » : ça fonctionne → on écrit <strong>ont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Ont dit que le film est bien.", targets:["Ont"],
      note:"Teste « avaient dit » : ça ne fonctionne pas → on écrit <strong>on</strong> (essaie l'autre test)." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Mes cousins on passé les vacances ici.", targets:["on"],
      note:"Teste « avaient passé » : ça fonctionne → on écrit <strong>ont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les chevaux on galopé dans le pré.", targets:["on"],
      note:"Teste « avaient galopé » : ça fonctionne → on écrit <strong>ont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Ont mange bien dans ce restaurant.", targets:["Ont"],
      note:"Teste « avaient mange » : ça ne fonctionne pas → on écrit <strong>on</strong> (essaie l'autre test)." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les scientifiques on découvert une nouvelle espèce.", targets:["on"],
      note:"Teste « avaient découvert » : ça fonctionne → on écrit <strong>ont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"On a retrouvé les clés perdues.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les élèves ont rendu leurs copies.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"On entend le vent dans les arbres.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Ils ont travaillé toute la nuit.", targets:[] },

    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les chats ont faim.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["ont"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"ont — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On part demain.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["On"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"on — pronom sujet" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ils ont gagné.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["ont"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"ont — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On verra bien.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["On"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"on — pronom sujet" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les élèves ont réussi.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["ont"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"ont — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On y va ?",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["On"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"on — pronom sujet" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les voisins ont déménagé.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["ont"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"ont — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On ne sait pas.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["On"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"on — pronom sujet" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les oiseaux ont migré.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["ont"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"ont — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On vous écoute.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["On"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"on — pronom sujet" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Mes parents ont appelé.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["ont"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"ont — verbe avoir" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On fait comme ça.",
      step1Instruction:"Clique sur « on » ou « ont » dans la phrase.", step1Targets:["On"],
      step2Instruction:"Ce mot est-il verbe avoir ou pronom sujet ?", classifyChoices:["ont — verbe avoir","on — pronom sujet"], step2Answer:"on — pronom sujet" }
  ],

  level3Bank: [
    { type:"texte-a-trous", sentence:"Les scientifiques ___ publié leurs résultats.",
      blanks:[{ answer:"ont", hint:"« avaient publié » fonctionne → on écrit « ont »." }] },
    { type:"texte-a-trous", sentence:"___ raconte que ce château est hanté.",
      blanks:[{ answer:"on", hint:"« avaient raconte » ne fonctionne pas → on écrit « on »." }] },
    { type:"texte-a-trous", sentence:"Les randonneurs ___ atteint le sommet.",
      blanks:[{ answer:"ont", hint:"« avaient atteint » fonctionne → on écrit « ont »." }] },
    { type:"texte-a-trous", sentence:"___ ne peut pas tout prévoir.",
      blanks:[{ answer:"on", hint:"« avaient ne peut » ne fonctionne pas → on écrit « on »." }] },
    { type:"texte-a-trous", sentence:"Les agriculteurs ___ récolté du blé.",
      blanks:[{ answer:"ont", hint:"« avaient récolté » fonctionne → on écrit « ont »." }] },
    { type:"texte-a-trous", sentence:"___ voit souvent des renards dans cette forêt.",
      blanks:[{ answer:"on", hint:"« avaient voit » ne fonctionne pas → on écrit « on »." }] },
    { type:"texte-a-trous", sentence:"___ dit que les loups ___ disparu de cette région.",
      blanks:[
        { answer:"on", hint:"« avaient dit » ne fonctionne pas → on écrit « on »." },
        { answer:"ont", hint:"« avaient disparu » fonctionne → on écrit « ont »." }
      ] },
    { type:"texte-a-trous", sentence:"Les médecins ___ confirmé ce qu'___ suspectait.",
      blanks:[
        { answer:"ont", hint:"« avaient confirmé » fonctionne → on écrit « ont »." },
        { answer:"on", hint:"« avaient suspectait » ne fonctionne pas → on écrit « on »." }
      ] },
    { type:"texte-a-trous", sentence:"___ apprend que les chercheurs ___ trouvé un remède.",
      blanks:[
        { answer:"on", hint:"« avaient apprend » ne fonctionne pas → on écrit « on »." },
        { answer:"ont", hint:"« avaient trouvé » fonctionne → on écrit « ont »." }
      ] },
    { type:"texte-a-trous", sentence:"Les élèves ___ compris ce qu'___ leur a expliqué.",
      blanks:[
        { answer:"ont", hint:"« avaient compris » fonctionne → on écrit « ont »." },
        { answer:"on", hint:"« avaient leur a expliqué » ne fonctionne pas → on écrit « on »." }
      ] },
    { type:"texte-a-trous", sentence:"___ pense que les températures ___ augmenté.",
      blanks:[
        { answer:"on", hint:"« avaient pense » ne fonctionne pas → on écrit « on »." },
        { answer:"ont", hint:"« avaient augmenté » fonctionne → on écrit « ont »." }
      ] },
    { type:"texte-a-trous", sentence:"Les artistes ___ exposé leurs œuvres et ___ peut les admirer.",
      blanks:[
        { answer:"ont", hint:"« avaient exposé » fonctionne → on écrit « ont »." },
        { answer:"on", hint:"« avaient peut » ne fonctionne pas → on écrit « on »." }
      ] },

    { type:"production-libre", consigne:"Écris une phrase sur des <strong>animaux</strong> qui contient à la fois <em>on</em> et <em>ont</em>.", words:["on","ont"] },
    { type:"production-libre", consigne:"Écris une phrase sur <strong>l'école</strong> qui contient à la fois <em>on</em> et <em>ont</em>.", words:["on","ont"] },
    { type:"production-libre", consigne:"Écris une phrase sur les <strong>vacances</strong> qui contient à la fois <em>on</em> et <em>ont</em>.", words:["on","ont"] },
    { type:"production-libre", consigne:"Écris une phrase sur la <strong>météo</strong> qui contient à la fois <em>on</em> et <em>ont</em>.", words:["on","ont"] }
  ]
},
"ortho-distinguer-ou-ou": {
  title: "Distinguer ou / où",
  domaine:    "Français",
  competence: "Orthographe — Homophones grammaticaux",
  type:       "homophones-niveaux",
  levels:     ["CM1", "CM2", "6e"],
  backLink:   { href: "français-orthographe.html", label: "Orthographe" },
  levelDescs: {
    "CM1": "Choisir entre <em>ou</em> et <em>où</em> dans des phrases courtes",
    "CM2": "Détecter les erreurs et classer des phrases",
    "6e":  "Compléter des phrases et écrire librement"
  },
  homoShuffle: [false, true, false],

  level1Bank: [
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Tu veux du lait ___ du jus d'orange ?",          choices:["ou","où"], answer:"ou", hint:"Teste « ou bien du jus d'orange » : ça fonctionne → on écrit « ou »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Je ne sais pas ___ j'ai mis mes clés.",           choices:["ou","où"], answer:"où", hint:"Teste « ou bien j'ai mis mes clés » : ça ne fonctionne pas → on écrit « où »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Il part en vacances en juillet ___ en août.",     choices:["ou","où"], answer:"ou", hint:"Teste « ou bien en août » : ça fonctionne → on écrit « ou »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"La ville ___ je suis né est très belle.",         choices:["ou","où"], answer:"où", hint:"Teste « ou bien je suis né » : ça ne fonctionne pas → on écrit « où »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Tu préfères le foot ___ le tennis ?",             choices:["ou","où"], answer:"ou", hint:"Teste « ou bien le tennis » : ça fonctionne → on écrit « ou »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"C'est la forêt ___ nous nous sommes perdus.",     choices:["ou","où"], answer:"où", hint:"Teste « ou bien nous nous sommes perdus » : ça ne fonctionne pas → on écrit « où »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Elle viendra demain ___ après-demain.",           choices:["ou","où"], answer:"ou", hint:"Teste « ou bien après-demain » : ça fonctionne → on écrit « ou »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Le village ___ elle habite est très calme.",      choices:["ou","où"], answer:"où", hint:"Teste « ou bien elle habite » : ça ne fonctionne pas → on écrit « où »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"On peut y aller à pied ___ en vélo.",             choices:["ou","où"], answer:"ou", hint:"Teste « ou bien en vélo » : ça fonctionne → on écrit « ou »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Je me souviens du jour ___ tu es arrivé.",        choices:["ou","où"], answer:"où", hint:"Teste « ou bien tu es arrivé » : ça ne fonctionne pas → on écrit « où »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"Il peut choisir la mer ___ la montagne.",         choices:["ou","où"], answer:"ou", hint:"Teste « ou bien la montagne » : ça fonctionne → on écrit « ou »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « ou » ou « où » ?", word:"La montagne ___ nous avons campé était superbe.", choices:["ou","où"], answer:"où", hint:"Teste « ou bien nous avons campé » : ça ne fonctionne pas → on écrit « où »."  }
  ],

  level2Bank: [
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Je ne sais pas ou tu as rangé tes affaires.", targets:["ou"],
      note:"Teste « ou bien tu as rangé » : ça ne fonctionne pas → on écrit <strong>où</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il préfère le foot où le tennis.", targets:["où"],
      note:"Teste « ou bien le tennis » : ça fonctionne → on écrit <strong>ou</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"La maison ou j'habite est grande.", targets:["ou"],
      note:"Teste « ou bien j'habite » : ça ne fonctionne pas → on écrit <strong>où</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle choisit la ville ou elle veut vivre.", targets:["ou"],
      note:"Teste « ou bien elle veut vivre » : ça ne fonctionne pas → on écrit <strong>où</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Tu veux du chocolat où de la vanille ?", targets:["où"],
      note:"Teste « ou bien de la vanille » : ça fonctionne → on écrit <strong>ou</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il peut venir lundi ou mardi.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"C'est là où j'ai grandi.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Je ne sais pas où elle est allée.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Tu préfères le matin ou le soir ?", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Le parc où nous jouons est fermé.", targets:[] },

    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il mange ou boit.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["ou"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"ou — conjonction" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"C'est là où je vis.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["où"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"où — lieu ou temps" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Tu viens ou tu restes ?",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["ou"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"ou — conjonction" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"La rue où j'habite est calme.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["où"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"où — lieu ou temps" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Elle choisit le rouge ou le bleu.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["ou"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"ou — conjonction" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Le pays où il est né est loin.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["où"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"où — lieu ou temps" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il part demain ou après-demain.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["ou"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"ou — conjonction" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Voilà l'endroit où nous avons campé.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["où"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"où — lieu ou temps" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"On y va à pied ou en bus ?",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["ou"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"ou — conjonction" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Je me souviens du jour où tu es parti.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["où"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"où — lieu ou temps" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Il préfère le foot ou le tennis.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["ou"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"ou — conjonction" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"La bibliothèque où j'étudie est grande.",
      step1Instruction:"Clique sur « ou » ou « où » dans la phrase.", step1Targets:["où"],
      step2Instruction:"Ce mot est-il une conjonction (ou) ou un lieu/temps (où) ?", classifyChoices:["ou — conjonction","où — lieu ou temps"], step2Answer:"où — lieu ou temps" }
  ],

  level3Bank: [
    { type:"texte-a-trous", sentence:"Tu veux du thé ___ du café ?",
      blanks:[{ answer:"ou", hint:"« ou bien du café » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"C'est la ville ___ je suis né.",
      blanks:[{ answer:"où", hint:"« ou bien je suis né » ne fonctionne pas → on écrit « où »." }] },
    { type:"texte-a-trous", sentence:"Il viendra lundi ___ mardi.",
      blanks:[{ answer:"ou", hint:"« ou bien mardi » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"Je cherche le cahier ___ j'ai noté les devoirs.",
      blanks:[{ answer:"où", hint:"« ou bien j'ai noté les devoirs » ne fonctionne pas → on écrit « où »." }] },
    { type:"texte-a-trous", sentence:"Elle reste ici ___ elle part avec nous ?",
      blanks:[{ answer:"ou", hint:"« ou bien elle part avec nous » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"La forêt ___ nous nous sommes promenés était magnifique.",
      blanks:[{ answer:"où", hint:"« ou bien nous nous sommes promenés » ne fonctionne pas → on écrit « où »." }] },
    { type:"texte-a-trous", sentence:"Je ne sais plus ___ il est allé ___ si quelqu'un l'a vu.",
      blanks:[{ answer:"où", hint:"« ou bien il est allé » ne fonctionne pas → on écrit « où »." },
              { answer:"ou", hint:"« ou bien si quelqu'un l'a vu » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"La plage ___ nous nageons est belle ___ dangereuse ?",
      blanks:[{ answer:"où", hint:"« ou bien nous nageons » ne fonctionne pas → on écrit « où »." },
              { answer:"ou", hint:"« ou bien dangereuse » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"C'est la forêt ___ nous avons campé l'été dernier ___ l'été d'avant.",
      blanks:[{ answer:"où", hint:"« ou bien nous avons campé » ne fonctionne pas → on écrit « où »." },
              { answer:"ou", hint:"« ou bien l'été d'avant » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"Le stade ___ il joue est grand ___ petit ?",
      blanks:[{ answer:"où", hint:"« ou bien il joue » ne fonctionne pas → on écrit « où »." },
              { answer:"ou", hint:"« ou bien petit » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"La maison ___ elle habite est calme ___ bruyante.",
      blanks:[{ answer:"où", hint:"« ou bien elle habite » ne fonctionne pas → on écrit « où »." },
              { answer:"ou", hint:"« ou bien bruyante » fonctionne → on écrit « ou »." }] },
    { type:"texte-a-trous", sentence:"Je ne sais pas ___ tu es allé ___ pourquoi tu es parti si tôt.",
      blanks:[{ answer:"où", hint:"« ou bien tu es allé » ne fonctionne pas → on écrit « où »." },
              { answer:"ou", hint:"« ou bien pourquoi tu es parti » fonctionne → on écrit « ou »." }] },

    { type:"production-libre", consigne:"Écris une phrase sur un <strong>lieu</strong> que tu connais qui contient à la fois <em>ou</em> et <em>où</em>.", words:["ou","où"] },
    { type:"production-libre", consigne:"Écris une phrase sur le <strong>week-end</strong> qui contient à la fois <em>ou</em> et <em>où</em>.", words:["ou","où"] },
    { type:"production-libre", consigne:"Écris une phrase sur <strong>l'école</strong> qui contient à la fois <em>ou</em> et <em>où</em>.", words:["ou","où"] },
    { type:"production-libre", consigne:"Écris une phrase avec le verbe <strong>aller</strong> qui contient à la fois <em>ou</em> et <em>où</em>.", words:["ou","où"] }
  ]
},
  "ortho-distinguer-quel-quelle-quels-quelles": {
    title: "Distinguer quel(s), quelle(s), qu'elle(s)",
    domaine:    "Français",
    competence: "Orthographe — Homophones grammaticaux",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Accorder « quel » en genre et en nombre avec le nom qui suit",
      "CM2": "Distinguer « quelle(s) » (adjectif) et « qu'elle(s) » (que + elle/elles)",
      "6e":  "Les six formes mélangées, y compris des phrases à deux blancs"
    },
    homoShuffle: [false, false, true],

    level1Bank: [
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ livre as-tu choisi ?",          choices:["quel","quelle","quels","quelles"], answer:"quel", hint:"masculin singulier (accord avec « livre »)."    },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ heure est-il ?",                choices:["quel","quelle","quels","quelles"], answer:"quelle", hint:"féminin singulier (accord avec « heure »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ beaux paysages !",              choices:["quel","quelle","quels","quelles"], answer:"quels", hint:"masculin pluriel (accord avec « paysages »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ belles fleurs !",               choices:["quel","quelle","quels","quelles"], answer:"quelles", hint:"féminin pluriel (accord avec « fleurs »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"Je ne sais pas ___ chemin prendre.", choices:["quel","quelle","quels","quelles"], answer:"quel", hint:"masculin singulier (accord avec « chemin »)."    },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ chance tu as !",                choices:["quel","quelle","quels","quelles"], answer:"quelle", hint:"féminin singulier (accord avec « chance »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ sont tes sports préférés ?",    choices:["quel","quelle","quels","quelles"], answer:"quels", hint:"masculin pluriel (accord avec « sports »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ sont tes matières préférées ?", choices:["quel","quelle","quels","quelles"], answer:"quelles", hint:"féminin pluriel (accord avec « matières »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ temps fait-il dehors ?",        choices:["quel","quelle","quels","quelles"], answer:"quel", hint:"masculin singulier (accord avec « temps »)."    },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"___ surprise !",                    choices:["quel","quelle","quels","quelles"], answer:"quelle", hint:"féminin singulier (accord avec « surprise »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"Dis-moi ___ films tu aimes.",       choices:["quel","quelle","quels","quelles"], answer:"quels", hint:"masculin pluriel (accord avec « films »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « quel », « quelle », « quels » ou « quelles » ?", word:"Dis-moi ___ chansons tu écoutes.",  choices:["quel","quelle","quels","quelles"], answer:"quelles", hint:"féminin pluriel (accord avec « chansons »)." }
    ],

    level2Bank: [
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"Je sais ___ a raison.",             choices:["quelle","qu'elle"], answer:"qu'elle", hint:"Remplaçable par « qu'il » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"___ belle journée !",                choices:["quelle","qu'elle"], answer:"quelle", hint:"féminin singulier (accord avec « journée »)."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"Il pense ___ viendra demain.",       choices:["quelle","qu'elle"], answer:"qu'elle", hint:"Remplaçable par « qu'il » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"Je ne sais pas ___ heure il est.",   choices:["quelle","qu'elle"], answer:"quelle", hint:"féminin singulier (accord avec « heure »)."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"Il espère ___ réussira.",            choices:["quelle","qu'elle"], answer:"qu'elle", hint:"Remplaçable par « qu'il » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"___ surprise de la voir ici !",      choices:["quelle","qu'elle"], answer:"quelle", hint:"féminin singulier (accord avec « surprise »)."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"Il dit ___ est malade.",             choices:["quelle","qu'elle"], answer:"qu'elle", hint:"Remplaçable par « qu'il » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelle » ou « qu'elle » ?", word:"___ est cette odeur ?",              choices:["quelle","qu'elle"], answer:"quelle", hint:"féminin singulier (accord avec « odeur »)."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelles » ou « qu'elles » ?", word:"Je crois ___ sont parties.",             choices:["quelles","qu'elles"], answer:"qu'elles", hint:"Remplaçable par « qu'ils » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelles » ou « qu'elles » ?", word:"___ sont tes couleurs préférées ?",      choices:["quelles","qu'elles"], answer:"quelles", hint:"féminin pluriel (accord avec « couleurs »)."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelles » ou « qu'elles » ?", word:"Il pense ___ ont raison.",               choices:["quelles","qu'elles"], answer:"qu'elles", hint:"Remplaçable par « qu'ils » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « quelles » ou « qu'elles » ?", word:"___ belles photos elles ont prises !",   choices:["quelles","qu'elles"], answer:"quelles", hint:"féminin pluriel (accord avec « photos »)."  }
    ],

    /* Niveau 3 : les six formes mélangées — 12 phrases à 1 blanc
       (choix-etiquette) + 6 phrases à 2 blancs indépendants (double-blanc). */
    level3Bank: [
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ film regardes-tu ?",                    choices:["quel","quelle"],       answer:"quel", hint:"masculin singulier (accord avec « film »)."    },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Je crois ___ a compris la leçon.",          choices:["quelle","qu'elle"],    answer:"qu'elle", hint:"Remplaçable par « qu'il » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ jolies fleurs tu as cueillies !",       choices:["quelles","qu'elles"],  answer:"quelles", hint:"féminin pluriel (accord avec « fleurs »)." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Il pense ___ sont en retard.",              choices:["quelles","qu'elles"],  answer:"qu'elles", hint:"Remplaçable par « qu'ils » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ sport pratiques-tu ?",                  choices:["quel","quels"],        answer:"quel", hint:"masculin singulier (accord avec « sport »)."    },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ chance incroyable !",                   choices:["quelle","qu'elle"],    answer:"quelle", hint:"féminin singulier (accord avec « chance »)."  },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Dis-moi ___ livres tu préfères.",           choices:["quel","quels"],        answer:"quels", hint:"masculin pluriel (accord avec « livres »)."   },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Il espère ___ sera là.",                    choices:["quelle","qu'elle"],    answer:"qu'elle", hint:"Remplaçable par « qu'il » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ sont les règles du jeu ?",              choices:["quelles","qu'elles"],  answer:"quelles", hint:"féminin pluriel (accord avec « règles »)." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"Je sais ___ ont tout préparé.",             choices:["quelles","qu'elles"],  answer:"qu'elles", hint:"Remplaçable par « qu'ils » → conjonction « que » + pronom." },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ beau tableau !",                        choices:["quel","quelle"],       answer:"quel", hint:"masculin singulier (accord avec « tableau »)."    },
      { type:"choix-etiquette", instruction:"Quel mot complète la phrase ?", word:"___ est ton adresse ?",                     choices:["quelle","qu'elle"],    answer:"quelle", hint:"féminin singulier (accord avec « adresse »)."  },

      { type:"double-blanc", sentence:"Je sais ___ film elle préfère et ___ elle viendra.",
        blanks:[
          { answer:"quel",    choices:["quel","quelle"],    hint:"masculin singulier (accord avec « film »)" },
          { answer:"qu'elle", choices:["quelle","qu'elle"], hint:"remplaçable par « qu'il » → conjonction que + pronom elle" }
        ] },
      { type:"double-blanc", sentence:"___ chance ___ a eue !",
        blanks:[
          { answer:"quelle",  choices:["quelle","qu'elle"], hint:"adjectif exclamatif, féminin singulier (accord avec « chance »)" },
          { answer:"qu'elle", choices:["quelle","qu'elle"], hint:"remplaçable par « qu'il » → conjonction que + pronom elle" }
        ] },
      { type:"double-blanc", sentence:"Dis-moi ___ matières tu aimes et ___ tu réussis le mieux.",
        blanks:[
          { answer:"quelles",  choices:["quelles","qu'elles"], hint:"féminin pluriel (accord avec « matières »)" },
          { answer:"qu'elles", choices:["quelles","qu'elles"], hint:"remplaçable par « qu'ils » → conjonction que + pronom elles" }
        ] },
      { type:"double-blanc", sentence:"___ sont les équipes et ___ ont gagné ?",
        blanks:[
          { answer:"quelles",  choices:["quelles","qu'elles"], hint:"féminin pluriel (accord avec « équipes »)" },
          { answer:"qu'elles", choices:["quelles","qu'elles"], hint:"remplaçable par « qu'ils » → conjonction que + pronom elles" }
        ] },
      { type:"double-blanc", sentence:"Je ne sais pas ___ chemin prendre ni ___ est sûre.",
        blanks:[
          { answer:"quel",    choices:["quel","quelle"],    hint:"masculin singulier (accord avec « chemin »)" },
          { answer:"qu'elle", choices:["quelle","qu'elle"], hint:"remplaçable par « qu'il » → conjonction que + pronom elle" }
        ] },
      { type:"double-blanc", sentence:"___ belles photos ! Je crois ___ les a prises elle-même.",
        blanks:[
          { answer:"quelles", choices:["quelles","qu'elles"], hint:"adjectif exclamatif, féminin pluriel (accord avec « photos »)" },
          { answer:"qu'elle", choices:["qu'elle","qu'elles"], hint:"sujet singulier ici (« elle-même ») → qu'elle" }
        ] }
    ]
  },
"ortho-distinguer-son-sont": {
  title: "Distinguer son / sont",
  domaine:    "Français",
  competence: "Orthographe — Homophones grammaticaux",
  type:       "homophones-niveaux",
  levels:     ["CM1", "CM2", "6e"],
  backLink:   { href: "français-orthographe.html", label: "Orthographe" },
  levelDescs: {
    "CM1": "Choisir entre <em>son</em> et <em>sont</em> dans des phrases courtes",
    "CM2": "Détecter les erreurs et classer des phrases",
    "6e":  "Compléter des phrases et écrire librement"
  },
  homoShuffle: [false, true, false],

  level1Bank: [
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Les enfants ___ fatigués après la récréation.", choices:["son","sont"], answer:"sont", hint:"Essaie « étaient » : « étaient fatigués » → ça fonctionne → on écrit « sont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Il a oublié ___ cartable à la maison.",           choices:["son","sont"], answer:"son", hint:"Essaie « étaient » : ça ne fonctionne pas ; essaie « mon cartable » : ça fonctionne → on écrit « son »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Les fleurs ___ écloses ce matin.",              choices:["son","sont"], answer:"sont", hint:"Essaie « étaient » : « étaient écloses » → ça fonctionne → on écrit « sont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Elle range ___ manteau dans l'armoire.",        choices:["son","sont"], answer:"son", hint:"Essaie « étaient » : ça ne fonctionne pas ; essaie « mon manteau » : ça fonctionne → on écrit « son »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Les élèves ___ attentifs en classe.",           choices:["son","sont"], answer:"sont", hint:"Essaie « étaient » : « étaient attentifs » → ça fonctionne → on écrit « sont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Le chien a retrouvé ___ os.",                   choices:["son","sont"], answer:"son", hint:"Essaie « étaient » : ça ne fonctionne pas ; essaie « mon os » : ça fonctionne → on écrit « son »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Les nuages ___ très sombres ce soir.",         choices:["son","sont"], answer:"sont", hint:"Essaie « étaient » : « étaient sombres » → ça fonctionne → on écrit « sont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Il prête ___ vélo à un ami.",                   choices:["son","sont"], answer:"son", hint:"Essaie « étaient » : ça ne fonctionne pas ; essaie « mon vélo » : ça fonctionne → on écrit « son »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Les résultats ___ excellents cette année.",    choices:["son","sont"], answer:"sont", hint:"Essaie « étaient » : « étaient excellents » → ça fonctionne → on écrit « sont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Elle a perdu ___ écharpe rouge.",               choices:["son","sont"], answer:"son", hint:"Essaie « étaient » : ça ne fonctionne pas ; essaie « mon écharpe » : ça fonctionne → on écrit « son »."  },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Les portes ___ fermées à clé.",                 choices:["son","sont"], answer:"sont", hint:"Essaie « étaient » : « étaient fermées » → ça fonctionne → on écrit « sont »." },
    { type:"choix-etiquette", instruction:"Quel mot complète la phrase : « son » ou « sont » ?", word:"Le chat lèche ___ pelage.",                     choices:["son","sont"], answer:"son", hint:"Essaie « étaient » : ça ne fonctionne pas ; essaie « mon pelage » : ça fonctionne → on écrit « son »."  }
  ],

  level2Bank: [
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les oiseaux son partis vers le sud.", targets:["son"],
      note:"Teste « étaient partis » : ça fonctionne → on écrit <strong>sont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il a rangé sont livre sur l'étagère.", targets:["sont"],
      note:"Teste « étaient » : ça ne fonctionne pas ; teste « mon livre » : ça fonctionne → on écrit <strong>son</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les routes son glissantes ce matin.", targets:["son"],
      note:"Teste « étaient glissantes » : ça fonctionne → on écrit <strong>sont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Elle a donné sont avis sur la question.", targets:["sont"],
      note:"Teste « étaient » : ça ne fonctionne pas ; teste « mon avis » : ça fonctionne → on écrit <strong>son</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les résultats son meilleurs qu'avant.", targets:["son"],
      note:"Teste « étaient meilleurs » : ça fonctionne → on écrit <strong>sont</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Le professeur a corrigé sont erreur.", targets:["sont"],
      note:"Teste « étaient » : ça ne fonctionne pas ; teste « mon erreur » : ça fonctionne → on écrit <strong>son</strong>." },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les enfants sont rentrés et leur père attend son tour.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Il a pris son manteau car les températures sont basses.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Les joueurs sont prêts et leur entraîneur garde son calme.", targets:[] },
    { type:"mots-cliquables", instruction:"Clique sur le mot mal orthographié s'il y en a un, puis valide. (Si la phrase est correcte, valide directement sans rien sélectionner.)",
      sentence:"Son chien est malade et les vétérinaires sont occupés.", targets:[] },

    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Ils sont là.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["sont"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"sont — verbe être" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Son ami arrive.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["Son"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"son — déterminant possessif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les chats sont dehors.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["sont"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"sont — verbe être" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Son cartable est lourd.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["Son"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"son — déterminant possessif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les notes sont bonnes.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["sont"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"sont — verbe être" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Son vélo est neuf.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["Son"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"son — déterminant possessif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les portes sont ouvertes.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["sont"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"sont — verbe être" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Son manteau est rouge.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["Son"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"son — déterminant possessif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les élèves sont prêts.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["sont"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"sont — verbe être" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Son idée est bonne.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["Son"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"son — déterminant possessif" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Les résultats sont là.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["sont"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"sont — verbe être" },
    { type:"classification-etapes", instruction:"Clique sur le mot à classer, puis choisis sa catégorie.", sentence:"Son frère est grand.",
      step1Instruction:"Clique sur « son » ou « sont » dans la phrase.", step1Targets:["Son"],
      step2Instruction:"Ce mot est-il le verbe être (sont) ou un déterminant possessif (son) ?", classifyChoices:["sont — verbe être","son — déterminant possessif"], step2Answer:"son — déterminant possessif" }
  ],

  level3Bank: [
    { type:"texte-a-trous", sentence:"Les scientifiques ___ convaincus par les résultats.",
      blanks:[{ answer:"sont", hint:"« étaient convaincus » fonctionne → on écrit « sont »." }] },
    { type:"texte-a-trous", sentence:"Le directeur a exprimé ___ mécontentement.",
      blanks:[{ answer:"son", hint:"« étaient » ne fonctionne pas ; « mon mécontentement » fonctionne → on écrit « son »." }] },
    { type:"texte-a-trous", sentence:"Les températures ___ en baisse depuis une semaine.",
      blanks:[{ answer:"sont", hint:"« étaient en baisse » fonctionne → on écrit « sont »." }] },
    { type:"texte-a-trous", sentence:"L'artiste a exposé ___ dernier tableau.",
      blanks:[{ answer:"son", hint:"« étaient » ne fonctionne pas ; « mon dernier tableau » fonctionne → on écrit « son »." }] },
    { type:"texte-a-trous", sentence:"Les décisions ___ prises à l'unanimité.",
      blanks:[{ answer:"sont", hint:"« étaient prises » fonctionne → on écrit « sont »." }] },
    { type:"texte-a-trous", sentence:"Le médecin a donné ___ accord pour l'opération.",
      blanks:[{ answer:"son", hint:"« étaient » ne fonctionne pas ; « mon accord » fonctionne → on écrit « son »." }] },
    { type:"texte-a-trous", sentence:"Les élèves ___ studieux et leur professeur est fier de ___ travail.",
      blanks:[{ answer:"sont", hint:"« étaient studieux » fonctionne → on écrit « sont »." },
              { answer:"son",  hint:"« étaient » ne fonctionne pas ; « mon travail » fonctionne → on écrit « son »." }] },
    { type:"texte-a-trous", sentence:"___ discours était long et les spectateurs ___ partis avant la fin.",
      blanks:[{ answer:"son",  hint:"« étaient » ne fonctionne pas ; « mon discours » fonctionne → on écrit « son »." },
              { answer:"sont", hint:"« étaient partis » fonctionne → on écrit « sont »." }] },
    { type:"texte-a-trous", sentence:"Les résultats ___ bons et le directeur garde ___ calme.",
      blanks:[{ answer:"sont", hint:"« étaient bons » fonctionne → on écrit « sont »." },
              { answer:"son",  hint:"« étaient » ne fonctionne pas ; « mon calme » fonctionne → on écrit « son »." }] },
    { type:"texte-a-trous", sentence:"Il a perdu ___ chemin et ses amis ___ inquiets.",
      blanks:[{ answer:"son",  hint:"« étaient » ne fonctionne pas ; « mon chemin » fonctionne → on écrit « son »." },
              { answer:"sont", hint:"« étaient inquiets » fonctionne → on écrit « sont »." }] },
    { type:"texte-a-trous", sentence:"Les arbres ___ hauts et ___ ombre est bienfaisante.",
      blanks:[{ answer:"sont", hint:"« étaient hauts » fonctionne → on écrit « sont »." },
              { answer:"son",  hint:"« étaient » ne fonctionne pas ; « mon ombre » fonctionne → on écrit « son »." }] },
    { type:"texte-a-trous", sentence:"___ équipe a gagné et les supporters ___ en fête.",
      blanks:[{ answer:"son",  hint:"« étaient » ne fonctionne pas ; « mon équipe » fonctionne → on écrit « son »." },
              { answer:"sont", hint:"« étaient en fête » fonctionne → on écrit « sont »." }] },

    { type:"production-libre", consigne:"Écris une phrase sur un <strong>sportif</strong> qui contient à la fois <em>son</em> et <em>sont</em>.", words:["son","sont"] },
    { type:"production-libre", consigne:"Écris une phrase sur <strong>l'école</strong> qui contient à la fois <em>son</em> et <em>sont</em>.", words:["son","sont"] },
    { type:"production-libre", consigne:"Écris une phrase sur un <strong>animal</strong> qui contient à la fois <em>son</em> et <em>sont</em>.", words:["son","sont"] },
    { type:"production-libre", consigne:"Écris une phrase sur la <strong>famille</strong> qui contient à la fois <em>son</em> et <em>sont</em>.", words:["son","sont"] }
  ]
},
  "ortho-distinguer-tout-tous-toute-toutes": {
    title: "tout, tous, toute, toutes",
    domaine:    "Français",
    competence: "Orthographe — Homophones grammaticaux",
    type:       "homophones-niveaux",
    levels:     ["CM1", "CM2", "6e"],
    backLink:   { href: "français-orthographe.html", label: "Orthographe" },
    levelDescs: {
      "CM1": "Choisir la bonne forme : « toute » ou « toutes »",
      "CM2": "Choisir la bonne forme : « tout » ou « tous »",
      "6e":  "Les quatre formes mélangées, y compris des phrases à deux blancs"
    },
    homoShuffle: [false, false, true],

    level1Bank: [
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ la classe a applaudi.",       choices:["toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « classe »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ les filles ont participé.",  choices:["toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « filles »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"Elle a mangé ___ la tarte.",     choices:["toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « tarte »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ les portes sont fermées.",   choices:["toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « portes »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"Il a neigé ___ la nuit.",        choices:["toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « nuit »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ les équipes sont prêtes.",   choices:["toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « équipes »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"Elle court ___ la journée.",    choices:["toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « journée »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ les maisons sont illuminées.", choices:["toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « maisons »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ la ville est en fête.",      choices:["toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « ville »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ les routes sont barrées.",   choices:["toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « routes »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"Il a attendu ___ la matinée.",  choices:["toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « matinée »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « toute » ou « toutes » ?", word:"___ les fenêtres sont ouvertes.", choices:["toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « fenêtres »)." }
    ],

    level2Bank: [
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"___ les garçons sont présents.",           choices:["tout","tous"], answer:"tous", hint:"masculin pluriel (accord avec « garçons »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"Il a lu ___ le livre en une nuit.",        choices:["tout","tous"], answer:"tout", hint:"masculin singulier (accord avec « livre »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"___ les jours il se lève tôt.",            choices:["tout","tous"], answer:"tous", hint:"masculin pluriel (accord avec « jours »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"Il a mangé ___ le gâteau.",                choices:["tout","tous"], answer:"tout", hint:"masculin singulier (accord avec « gâteau »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"___ les élèves ont réussi.",               choices:["tout","tous"], answer:"tous", hint:"masculin pluriel (accord avec « élèves »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"C'est ___ ce que je sais.",                choices:["tout","tous"], answer:"tout", hint:"Pronom." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"___ le monde était là.",                   choices:["tout","tous"], answer:"tout", hint:"masculin singulier (accord avec « monde »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"Ils sont ___ partis à midi.",              choices:["tout","tous"], answer:"tous", hint:"Pronom masculin pluriel." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"___ le temps il pleut ici.",               choices:["tout","tous"], answer:"tout", hint:"masculin singulier (accord avec « temps »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"Il a ___ compris.",                        choices:["tout","tous"], answer:"tout", hint:"Adverbe invariable (= complètement)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"___ les arbres ont perdu leurs feuilles.", choices:["tout","tous"], answer:"tous", hint:"masculin pluriel (accord avec « arbres »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout » ou « tous » ?", word:"C'est ___ pour aujourd'hui.",              choices:["tout","tous"], answer:"tout", hint:"Pronom." }
    ],

    /* Niveau 3 : 16 phrases à 1 blanc (choix parmi les 4 formes) + 6 phrases
       à 2 blancs indépendants (double-blanc), mélangées ensemble. */
    level3Bank: [
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ la nuit il a pleuré.",                 choices:["tout","tous","toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « nuit »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ les enfants adorent les histoires.",   choices:["tout","tous","toute","toutes"], answer:"tous", hint:"masculin pluriel (accord avec « enfants »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"Elle est ___ contente de son résultat.",   choices:["tout","tous","toute","toutes"], answer:"toute", hint:"Adverbe (= complètement) devant un adjectif féminin → s'accorde ici."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ le village était réveillé.",           choices:["tout","tous","toute","toutes"], answer:"tout", hint:"masculin singulier (accord avec « village »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ les fleurs ont fané.",                 choices:["tout","tous","toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « fleurs »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"Il est ___ petit encore.",                 choices:["tout","tous","toute","toutes"], answer:"tout", hint:"Adverbe (= complètement) devant un adjectif masculin → s'accorde ici."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ les nuits sont calmes ici.",           choices:["tout","tous","toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « nuits »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"Il a couru ___ le trajet.",                choices:["tout","tous","toute","toutes"], answer:"tout", hint:"masculin singulier (accord avec « trajet »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"Elles sont ___ arrivées en retard.",       choices:["tout","tous","toute","toutes"], answer:"toutes", hint:"Pronom féminin pluriel." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ la semaine il fait beau.",             choices:["tout","tous","toute","toutes"], answer:"toute", hint:"féminin singulier (accord avec « semaine »)."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"Ils sont ___ fatigués.",                   choices:["tout","tous","toute","toutes"], answer:"tous", hint:"Pronom masculin pluriel."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ le monde était là.",                   choices:["tout","tous","toute","toutes"], answer:"tout", hint:"masculin singulier (accord avec « monde »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ les équipes étaient là.",              choices:["tout","tous","toute","toutes"], answer:"toutes", hint:"féminin pluriel (accord avec « équipes »)." },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"Elle était ___ rouge de honte.",           choices:["tout","tous","toute","toutes"], answer:"toute", hint:"Adverbe (= complètement) devant un adjectif féminin → s'accorde ici."  },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"___ les matins il prend son café.",        choices:["tout","tous","toute","toutes"], answer:"tous", hint:"masculin pluriel (accord avec « matins »)."   },
      { type:"choix-etiquette", instruction:"Quelle forme complète la phrase : « tout », « tous », « toute » ou « toutes » ?", word:"C'est ___ ce qu'il restait.",              choices:["tout","tous","toute","toutes"], answer:"tout", hint:"Pronom."   },

      { type:"double-blanc", sentence:"___ la famille et ___ les amis étaient présents.",
        blanks:[
          { answer:"toute", choices:["tout","tous","toute","toutes"], hint:"féminin singulier (accord avec « famille »)" },
          { answer:"tous",  choices:["tout","tous","toute","toutes"], hint:"masculin pluriel (accord avec « amis »)" }
        ] },
      { type:"double-blanc", sentence:"___ les nuits et ___ le jour il travaille.",
        blanks:[
          { answer:"toutes", choices:["tout","tous","toute","toutes"], hint:"féminin pluriel (accord avec « nuits »)" },
          { answer:"tout",   choices:["tout","tous","toute","toutes"], hint:"masculin singulier (accord avec « jour »)" }
        ] },
      { type:"double-blanc", sentence:"Ils ont ___ mangé et ___ les assiettes sont vides.",
        blanks:[
          { answer:"tous",   choices:["tout","tous","toute","toutes"], hint:"pronom masculin pluriel" },
          { answer:"toutes", choices:["tout","tous","toute","toutes"], hint:"féminin pluriel (accord avec « assiettes »)" }
        ] },
      { type:"double-blanc", sentence:"___ le groupe est là mais ___ les places ne sont pas prises.",
        blanks:[
          { answer:"tout",   choices:["tout","tous","toute","toutes"], hint:"masculin singulier (accord avec « groupe »)" },
          { answer:"toutes", choices:["tout","tous","toute","toutes"], hint:"féminin pluriel (accord avec « places »)" }
        ] },
      { type:"double-blanc", sentence:"Elle a ___ compris et ___ ses réponses sont correctes.",
        blanks:[
          { answer:"tout",   choices:["tout","tous","toute","toutes"], hint:"adverbe invariable (= complètement)" },
          { answer:"toutes", choices:["tout","tous","toute","toutes"], hint:"féminin pluriel (accord avec « réponses »)" }
        ] },
      { type:"double-blanc", sentence:"___ les élèves et ___ la classe ont applaudi.",
        blanks:[
          { answer:"tous",  choices:["tout","tous","toute","toutes"], hint:"masculin pluriel (accord avec « élèves »)" },
          { answer:"toute", choices:["tout","tous","toute","toutes"], hint:"féminin singulier (accord avec « classe »)" }
        ] }
    ]
  },

});

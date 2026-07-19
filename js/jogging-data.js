/* ── Catalogue statique des joggings d'écriture ────────────────────────────
   15 joggings pour toute l'année scolaire (module Rédaction, Phase 1).
   Source : docs/catalogue-15-joggings.md — à relire/ajuster par l'enseignant
   avant intégration définitive (§3.14 du cahier des charges).

   Même patron que exercise-data.js : un objet indexé par slug, pas de table
   Supabase pour les consignes.
   ──────────────────────────────────────────────────────────────────────── */

const JOGGING_DATA = {

  "monstre-placard": {
    id: "monstre-placard",
    numero: 1,
    title: "Le monstre du placard",
    niveau: 1,
    tempsImpose: "Présent",
    duree: 15,
    competence: "Décrire (accords dans le groupe nominal)",
    consigne: "Un monstre s'est installé dans ton placard, mais il n'est pas du tout effrayant ! Décris à quoi il ressemble : sa taille, sa couleur, ce qu'il aime faire toute la journée."
  },

  "matinee-extraordinaire": {
    id: "matinee-extraordinaire",
    numero: 2,
    title: "Ma matinée extraordinaire",
    niveau: 1,
    tempsImpose: "Passé composé",
    duree: 15,
    competence: "Conjuguer au passé composé",
    consigne: "Ce matin, en te réveillant, tout était différent dans ta maison ! Raconte ce qui s'est passé, du réveil jusqu'au départ pour l'école."
  },

  "portrait-heros": {
    id: "portrait-heros",
    numero: 3,
    title: "Le portrait de mon héros",
    niveau: 2,
    tempsImpose: "Présent",
    duree: 15,
    competence: "Accords dans le groupe nominal, adjectifs",
    consigne: "Invente un super-héros ou une super-héroïne. Décris son physique, son pouvoir, et un objet qui l'accompagne toujours."
  },

  "journee-prehistoire": {
    id: "journee-prehistoire",
    numero: 4,
    title: "Une journée dans la préhistoire",
    niveau: 2,
    tempsImpose: "Imparfait",
    duree: 15,
    competence: "Conjuguer à l'imparfait (description d'habitudes)",
    consigne: "Tu es un enfant de la préhistoire. Décris comment se passait une journée habituelle : ce que tu mangeais, où tu dormais, comment tu t'amusais."
  },

  "lettre-directeur": {
    id: "lettre-directeur",
    numero: 5,
    title: "La lettre au directeur de l'école",
    niveau: 2,
    tempsImpose: "Présent",
    duree: 20,
    competence: "Ponctuation, formules de politesse",
    consigne: "Tu proposes une idée pour améliorer la cour de récréation. Écris une lettre au directeur pour expliquer ton idée et pourquoi elle est utile."
  },

  "rencontre-extraterrestre": {
    id: "rencontre-extraterrestre",
    numero: 6,
    title: "Le jour où j'ai rencontré un extraterrestre",
    niveau: 2,
    tempsImpose: "Passé composé",
    duree: 20,
    competence: "Enchaînement chronologique, accords sujet-verbe",
    consigne: "Raconte ta rencontre imaginaire avec un extraterrestre : où cela s'est passé, ce qu'il t'a dit, comment l'histoire s'est terminée."
  },

  "dans-dix-ans": {
    id: "dans-dix-ans",
    numero: 7,
    title: "Dans dix ans, je serai…",
    niveau: 1,
    tempsImpose: "Futur",
    duree: 15,
    competence: "Conjuguer au futur simple",
    consigne: "Imagine ta vie dans dix ans. Où habiteras-tu ? Quel métier feras-tu ? Décris une journée de ta vie future."
  },

  "dragon-peur-noir": {
    id: "dragon-peur-noir",
    numero: 8,
    title: "Le dragon qui avait peur du noir",
    niveau: 1,
    tempsImpose: "Imparfait",
    duree: 15,
    competence: "Imparfait de description (début de conte)",
    consigne: "Écris le début d'un conte : présente un dragon qui a peur du noir. Où vivait-il ? À quoi ressemblait-il ? Pourquoi avait-il si peur ?"
  },

  "dispute-amis": {
    id: "dispute-amis",
    numero: 9,
    title: "Une dispute entre deux amis",
    niveau: 3,
    tempsImpose: "Présent",
    duree: 20,
    competence: "Ponctuation du dialogue",
    consigne: "Deux amis se disputent à cause d'un jeu de cour de récréation. Écris leur dialogue, avec les tirets, jusqu'à ce qu'ils se réconcilient."
  },

  "recette-magique": {
    id: "recette-magique",
    numero: 10,
    title: "La recette magique",
    niveau: 1,
    tempsImpose: "Présent",
    duree: 15,
    competence: "Verbes d'action, impératif ou infinitif",
    consigne: "Invente la recette d'une potion magique (pour voler, pour devenir invisible, ou une idée à toi). Liste les ingrédients et explique les étapes."
  },

  "message-mysterieux": {
    id: "message-mysterieux",
    numero: 11,
    title: "Le message mystérieux",
    niveau: 3,
    tempsImpose: "Passé composé",
    duree: 20,
    competence: "Connecteurs temporels, accords sujet-verbe",
    consigne: "Tu as trouvé un message codé caché dans ton cartable. Raconte comment tu l'as découvert, ce que tu as fait pour le déchiffrer, et ce qu'il révélait."
  },

  "si-jetais-invisible": {
    id: "si-jetais-invisible",
    numero: 12,
    title: "Si j'étais invisible pendant une journée",
    niveau: 2,
    tempsImpose: "Futur",
    duree: 20,
    competence: "Futur simple, cohérence temporelle",
    consigne: "Demain, tu deviens invisible pour une journée entière. Décris ce que tu feras, où tu iras, et ce que tu observeras sans être vu."
  },

  "vieux-chene-foret": {
    id: "vieux-chene-foret",
    numero: 13,
    title: "Le vieux chêne de la forêt",
    niveau: 3,
    tempsImpose: "Imparfait",
    duree: 20,
    competence: "Vocabulaire descriptif, accords des adjectifs",
    consigne: "Décris un arbre très ancien au milieu d'une forêt : son tronc, ses branches, les animaux qui vivaient autour de lui, l'ambiance du lieu."
  },

  "exploit-sportif": {
    id: "exploit-sportif",
    numero: 14,
    title: "Mon plus grand exploit sportif",
    niveau: 2,
    tempsImpose: "Passé composé",
    duree: 15,
    competence: "Passé composé, homophones (a/à, et/est)",
    consigne: "Raconte un moment sportif dont tu es fier ou fière (réel ou imaginé) : une course, un match, un défi relevé."
  },

  "ecoles-futur": {
    id: "ecoles-futur",
    numero: 15,
    title: "Dans le futur, les écoles seront…",
    niveau: 3,
    tempsImpose: "Futur",
    duree: 20,
    competence: "Futur simple, connecteurs logiques",
    consigne: "Imagine l'école dans cent ans. Explique comment les élèves apprendront, à quoi ressembleront les salles de classe, ce qui aura changé."
  }

};

/* Liste triée par numéro — pratique pour le rendu des 15 cartes (redaction.html). */
const JOGGING_LIST = Object.values(JOGGING_DATA).sort((a, b) => a.numero - b.numero);

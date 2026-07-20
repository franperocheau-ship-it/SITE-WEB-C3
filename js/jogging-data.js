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

/* ── Temps de conjugaison imposé — valeurs stockées vs libellés affichés ────
   jogging_class_settings.temps_impose (Phase 4, §6.2) est stocké en base au
   format court ('present'|'imparfait'|'passe_compose'|'futur'), cohérent
   avec les autres colonnes-énumération du site (ex. classes.mode_acces).
   Le catalogue statique JOGGING_DATA, lui, garde le libellé français
   affiché ("Présent"…) dans `tempsImpose`, déjà utilisé tel quel par
   TEMPS_CLASS (redaction.html, js/jogging-engine.js). Ces deux tables de
   correspondance font le pont entre les deux représentations. ──────────── */
const TEMPS_IMPOSE_OPTIONS = [
  { value: 'present', label: 'Présent' },
  { value: 'imparfait', label: 'Imparfait' },
  { value: 'passe_compose', label: 'Passé composé' },
  { value: 'futur', label: 'Futur' }
];
const TEMPS_IMPOSE_LABEL_BY_VALUE = Object.fromEntries(TEMPS_IMPOSE_OPTIONS.map(o => [o.value, o.label]));
const TEMPS_IMPOSE_VALUE_BY_LABEL = Object.fromEntries(TEMPS_IMPOSE_OPTIONS.map(o => [o.label, o.value]));

/* ── Textes déterministes — onglet « Mes progrès » (Phase 3, §5.6.2) ────────
   Pour chacun des 7 critères automatisables, trois états possibles selon le
   taux de réussite calculé côté front à partir de l'historique de l'élève
   (voir js/jogging-student-space.js) :
     — "reussi"    : taux de vert élevé sur ce critère
     — "difficile" : taux de vert faible
     — "neutre"    : pas encore assez de joggings évalués sur ce critère
   Chaque état fournit les 4 blocs demandés par le cahier des charges :
   ce que je réussis / ce qui reste difficile / un conseil / un défi.
   I (Illisible) et N (Néant) n'ont pas d'historique automatisé : traités à
   part dans le code (message fixe, pas de règle déterministe à appliquer).
   ──────────────────────────────────────────────────────────────────────── */
const JOGGING_PROGRES_TEXTS = {
  C: {
    reussi: {
      reussis: "Tes verbes sont bien conjugués : tu choisis la bonne terminaison la plupart du temps.",
      difficile: "Rien de majeur pour l'instant — continue à vérifier chaque verbe avant de valider.",
      conseil: "Avant d'écrire un verbe, demande-toi toujours : qui fait l'action, et à quel temps ?",
      defi: "Essaie d'écrire un texte entier sans aucune erreur de conjugaison !"
    },
    difficile: {
      reussis: "Tu as déjà progressé sur certains verbes bien connus.",
      difficile: "L'accord entre le verbe et son sujet te pose encore souvent problème.",
      conseil: "Repère d'abord le sujet du verbe, puis compte : une personne ou plusieurs ?",
      defi: "Sur ta prochaine version, relis chaque phrase en cachant tout sauf le sujet et le verbe."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  },
  H: {
    reussi: {
      reussis: "Tu distingues bien les mots qui se prononcent pareil mais s'écrivent différemment.",
      difficile: "Quelques confusions peuvent encore t'échapper dans les phrases longues.",
      conseil: "En cas de doute entre deux mots, essaie de les remplacer par un mot de la même famille pour vérifier.",
      defi: "Trouve un texte où tu utilises au moins 3 homophones différents, tous corrects !"
    },
    difficile: {
      reussis: "Tu commences à repérer certaines confusions fréquentes.",
      difficile: "Les homophones grammaticaux (a/à, et/est, son/sont…) te posent encore souvent problème.",
      conseil: "Remplace le mot par une autre forme pour vérifier : « à » devient « avait », « est » devient « était ».",
      defi: "Sur ta prochaine version, relis ton texte une fois rien que pour chasser les homophones."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  },
  A: {
    reussi: {
      reussis: "Tes groupes nominaux sont bien accordés en genre et en nombre.",
      difficile: "Quelques adjectifs éloignés du nom peuvent encore t'échapper.",
      conseil: "Repère toujours le nom principal du groupe avant d'accorder les mots autour de lui.",
      defi: "Écris une description avec au moins 5 adjectifs, tous bien accordés !"
    },
    difficile: {
      reussis: "Tu accordes déjà bien les groupes nominaux les plus simples.",
      difficile: "Les accords dans le groupe nominal (déterminant, nom, adjectif) restent fragiles.",
      conseil: "Cherche le nom principal du groupe, puis accorde un par un tous les mots qui l'entourent.",
      defi: "Sur ta prochaine version, souligne mentalement chaque groupe nominal et vérifie ses accords."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  },
  M: {
    reussi: {
      reussis: "Tes phrases commencent bien par une majuscule et tu penses aux noms propres.",
      difficile: "Rien de majeur pour l'instant.",
      conseil: "Après un point, pense toujours à la majuscule avant d'écrire le mot suivant.",
      defi: "Écris un court dialogue avec plusieurs phrases, sans oublier une seule majuscule !"
    },
    difficile: {
      reussis: "Tu penses déjà à la majuscule en tout début de texte.",
      difficile: "La majuscule après un point ou pour un nom propre est encore souvent oubliée.",
      conseil: "Relis ton texte phrase par phrase : chaque nouvelle phrase doit commencer par une majuscule.",
      defi: "Sur ta prochaine version, fais une relecture spéciale « chasse aux majuscules manquantes »."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  },
  P: {
    reussi: {
      reussis: "Tes phrases sont bien ponctuées, avec des points et des virgules bien placés.",
      difficile: "Rien de majeur pour l'instant.",
      conseil: "Relis chaque phrase à voix haute : une pause naturelle veut souvent dire une virgule ou un point.",
      defi: "Écris un texte avec au moins une phrase interrogative et une phrase exclamative, bien ponctuées !"
    },
    difficile: {
      reussis: "Tu penses déjà à ponctuer la fin de tes phrases.",
      difficile: "Il manque encore parfois un point final ou une virgule dans une phrase longue.",
      conseil: "À la fin de chaque phrase, pose-toi la question : point, point d'exclamation, ou point d'interrogation ?",
      defi: "Sur ta prochaine version, vérifie qu'il y a bien un signe de ponctuation à la fin de chaque phrase."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  },
  O: {
    reussi: {
      reussis: "Tu orthographies bien la plupart des mots de ton texte.",
      difficile: "Quelques mots moins courants peuvent encore te faire hésiter.",
      conseil: "En cas de doute sur un mot, découpe-le en syllabes pour bien entendre chaque son.",
      defi: "Utilise 3 mots que tu n'as encore jamais écrits dans un jogging, tous bien orthographiés !"
    },
    difficile: {
      reussis: "Tu orthographies déjà correctement les mots les plus fréquents.",
      difficile: "Certains mots restent mal orthographiés d'un jogging à l'autre.",
      conseil: "Relis ton texte mot par mot, en le lisant à l'envers si besoin pour ne pas te laisser porter par le sens.",
      defi: "Sur ta prochaine version, note les mots qui t'ont posé problème et révise-les avant d'écrire."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  },
  S: {
    reussi: {
      reussis: "Tu choisis bien entre les mots qui se ressemblent à l'oral.",
      difficile: "Rien de majeur pour l'instant.",
      conseil: "Relis ton texte à voix haute : si un enchaînement de mots sonne mal, il y a peut-être une erreur.",
      defi: "Écris une phrase avec une élision (l', d', j'…) bien placée à chaque fois !"
    },
    difficile: {
      reussis: "Tu commences à mieux entendre certains enchaînements de mots.",
      difficile: "Certains enchaînements de sons (élisions, liaisons) restent difficiles à l'écrit.",
      conseil: "Lis ta phrase à voix haute : devant une voyelle, « le » et « la » deviennent souvent « l' ».",
      defi: "Sur ta prochaine version, relis ton texte une fois juste pour l'écouter dans ta tête."
    },
    neutre: {
      reussis: "Pas encore assez de joggings évalués sur ce critère.",
      difficile: "Impossible à dire pour l'instant.",
      conseil: "Termine quelques joggings pour voir ta progression apparaître ici.",
      defi: "Lance-toi sur un nouveau jogging pour commencer à progresser !"
    }
  }
};

/* I et N : pas de règle déterministe sur l'historique (I ne concerne pas les
   textes saisis ; N est évalué manuellement par l'enseignant, pas par le
   nombre de joggings faits). */
const JOGGING_PROGRES_FIXED = {
  I: {
    reussis: "Ce critère ne concerne pas les textes saisis à l'ordinateur.",
    difficile: "—",
    conseil: "Rien à faire ici : ce feu reste toujours gris pour un jogging tapé au clavier.",
    defi: "—"
  },
  N: {
    reussis: "Ce critère est évalué par ton enseignant, pas automatiquement.",
    difficile: "Ton enseignant repère les mots manquants en relisant ton texte.",
    conseil: "Relis-toi une dernière fois avant de valider : as-tu oublié un mot dans une phrase ?",
    defi: "Demande à ton enseignant ce qu'il ou elle a pensé de ce critère sur ton dernier jogging."
  }
};

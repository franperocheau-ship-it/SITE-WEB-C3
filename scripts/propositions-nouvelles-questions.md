# Propositions de nouvelles questions — compétences MANQUE

Périmètre : les 19 compétences au statut **MANQUE** dans
`scripts/audit-modele-standard.md`. Fichiers concernés : `data/vocabulaire.js`
(16 compétences, 5 items manquants par niveau × 3 niveaux) et
`data/grammaire.js` (3 compétences, 1 item manquant au niveau 2 uniquement —
les niveaux 1 et 3 de ces 3 compétences sont en SURPLUS, hors périmètre de
cette tâche puisque leur statut global reste MANQUE et que le chantier
SURPLUS ne traite que les compétences dont le statut global est SURPLUS).

**LECTURE SEULE** : aucune modification de `data/*.js` n'a été faite. Ce
fichier ne contient que des propositions — chaque bloc de code est prêt à
être copié-collé comme nouvel élément du tableau `levelNBank` correspondant,
juste après le dernier item existant (ajouter une virgule avant le bloc
collé).

Toutes les propositions ci-dessous ont été vérifiées :
- syntaxe JS valide (chaque bloc `{ ... }` parse sans erreur) ;
- aucun identifiant `id` ne collisionne avec un id déjà présent dans le
  fichier source, ni avec un autre id proposé ici (240 ids vocabulaire + 3
  ids grammaire, tous uniques) ;
- continuité de la numérotation existante (`-n1-06` à `-n1-10`, etc.).

## Résumé

- Compétences traitées : 19 (16 dans data/vocabulaire.js, 3 dans data/grammaire.js)
- Items proposés dans data/vocabulaire.js : 240 (16 compétences × 3 niveaux × 5 items)
- Items proposés dans data/grammaire.js : 3 (1 par compétence, niveau 2 uniquement)
- Total : 243 items proposés

---

# Partie 1 — data/vocabulaire.js (16 compétences, 5 items × 3 niveaux)

## champ-lexical — Identifier un champ lexical

### Niveau 1 (manque 5)

```js
{ id:"champ-lexical-n1-06",
  type: "mcq",
  instruction: "Quel mot appartient au champ lexical de l'hiver ?",
  choices: ["neige", "sable", "chaleur", "plage"],
  answer: "neige",
  feedback: "La neige est caractéristique de l'hiver. Sable, chaleur et plage évoquent plutôt l'été."
}
```

```js
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
}
```

```js
{ id:"champ-lexical-n1-08",
  type: "mcq",
  instruction: "Quel mot N'appartient PAS au champ lexical de l'hôpital ?",
  choices: ["médecin", "infirmière", "piqûre", "tracteur"],
  answer: "tracteur",
  feedback: "Médecin, infirmière et piqûre évoquent tous l'hôpital. Le tracteur est un engin agricole, sans lien avec l'hôpital."
}
```

```js
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
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
{ id:"champ-lexical-n2-06",
  type: "mcq",
  instruction: "Quel mot polysémique appartient à la fois au champ lexical de l'arbre et à celui de l'école ?",
  choices: ["feuille", "tronc", "cahier", "branche"],
  answer: "feuille",
  feedback: "« Feuille » peut désigner la feuille d'un arbre (nature) ou une feuille de papier (école). C'est un mot polysémique."
}
```

```js
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
}
```

```js
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
}
```

```js
{ id:"champ-lexical-n2-09",
  type: "mcq",
  instruction: "Quel est le champ lexical dominant dans : « Le juge écouta les témoins, consulta le dossier et rendit son verdict » ?",
  choices: ["La justice", "La cuisine", "Le sport", "La musique"],
  answer: "La justice",
  feedback: "Juge, témoins, dossier, verdict : tous ces mots appartiennent au champ lexical de la justice."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
{ id:"champ-lexical-n3-06",
  type: "mcq",
  instruction: "Quel mot peut appartenir soit au champ lexical des animaux, soit à celui de la file d'attente ?",
  choices: ["queue", "poil", "griffe", "plume"],
  answer: "queue",
  feedback: "« Queue » désigne la queue d'un animal, mais aussi la file d'attente (faire la queue). Un mot polysémique appartient à plusieurs champs lexicaux selon le contexte."
}
```

```js
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
}
```

```js
{ id:"champ-lexical-n3-08",
  type: "mcq",
  instruction: "Dans « L'orateur martela ses arguments, plaida sa cause et convainquit l'assemblée », quel est le champ lexical dominant ?",
  choices: ["La rhétorique / le discours", "La cuisine", "L'agriculture", "La météorologie"],
  answer: "La rhétorique / le discours",
  feedback: "Orateur, arguments, plaida, convainquit : ces mots renvoient à l'art de convaincre par la parole, le champ lexical de la rhétorique."
}
```

```js
{ id:"champ-lexical-n3-09",
  type: "match",
  instruction: "Associe chaque mot savant au champ lexical qu'il évoque.",
  pairs: [
    { left: "sismographe", right: "La géologie / sismologie" },
    { left: "amnésie", right: "La médecine" },
    { left: "misanthrope", right: "Les sentiments humains (haïr l'humanité)" }
  ],
  feedback: "Sismographe (mesure des séismes), amnésie (perte de mémoire), misanthrope (qui déteste les hommes) : des mots savants, chacun ancré dans un champ lexical précis."
}
```

```js
{ id:"champ-lexical-n3-10",
  type: "mcq",
  instruction: "Dans « Le funambule avança sur le fil, garda son équilibre et salua la foule sous les applaudissements », quel est le champ lexical dominant ?",
  choices: ["Le cirque", "La pêche", "L'agriculture", "La médecine"],
  answer: "Le cirque",
  feedback: "Funambule, fil, équilibre, foule qui applaudit : ces mots forment le champ lexical du cirque."
}
```

## famille-de-mots — Identifier une famille de mots

### Niveau 1 (manque 5)

```js
{ id:"famille-de-mots-n1-06",
  type: "mcq",
  instruction: "Quel mot appartient à la famille de « terre » ?",
  choices: ["terrain", "terrible", "sphère", "verre"],
  answer: "terrain",
  feedback: "Terrain vient du radical « terre ». Terrible et sphère n'ont aucun lien avec terre malgré une ressemblance de son."
}
```

```js
{ id:"famille-de-mots-n1-07",
  type: "mcq",
  instruction: "Quel mot N'appartient PAS à la famille de « lait » ?",
  choices: ["laitier", "laiterie", "allaiter", "laid"],
  answer: "laid",
  feedback: "Laid n'a aucun lien avec le lait, bien qu'il se prononce presque pareil. Laitier, laiterie et allaiter viennent tous du radical « lait »."
}
```

```js
{ id:"famille-de-mots-n1-08",
  type: "match",
  instruction: "Associe chaque mot à un autre membre de sa famille.",
  pairs: [
    { left: "vent", right: "venteux" },
    { left: "ferme", right: "fermier" },
    { left: "route", right: "routier" }
  ],
  feedback: "Venteux, fermier et routier sont formés à partir des radicaux vent-, ferm(e)- et rout(e)-."
}
```

```js
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
}
```

```js
{ id:"famille-de-mots-n1-10",
  type: "mcq",
  instruction: "Quel est le radical commun à « osseux », « ossature » et « désosser » ?",
  choices: ["os", "oss", "osse", "ossu"],
  answer: "os",
  feedback: "Le radical « os » (sous la forme « oss- ») est présent dans osseux, ossature et désosser. Tous ces mots sont liés à l'os."
}
```

### Niveau 2 (manque 5)

```js
{ id:"famille-de-mots-n2-06",
  type: "mcq",
  instruction: "Quel mot est un intrus dans la famille de « voix » ?",
  choices: ["vocal", "voisin", "convoquer", "vocabulaire"],
  answer: "voisin",
  feedback: "Voisin vient du latin « vicinus » (proche), un mot sans lien avec la voix. Vocal, convoquer et vocabulaire viennent tous du latin « vox/vocis » (la voix)."
}
```

```js
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
}
```

```js
{ id:"famille-de-mots-n2-08",
  type: "match",
  instruction: "Associe chaque mot à son dérivé de même famille.",
  pairs: [
    { left: "doux", right: "adoucir" },
    { left: "riche", right: "enrichir" },
    { left: "large", right: "élargir" }
  ],
  feedback: "Adoucir = rendre doux, enrichir = rendre riche, élargir = rendre large. Ces mots partagent le même radical que l'adjectif de départ."
}
```

```js
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
}
```

```js
{ id:"famille-de-mots-n2-10",
  type: "mcq",
  instruction: "Parmi ces mots, lequel est de la famille de « nombre » ?",
  choices: ["nombreux", "ombre", "nombril", "novembre"],
  answer: "nombreux",
  feedback: "Nombreux = qui contient un grand nombre, radical « nombr- ». Ombre, nombril et novembre n'ont aucun lien avec « nombre » malgré une ressemblance de son."
}
```

### Niveau 3 (manque 5)

```js
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
}
```

```js
{ id:"famille-de-mots-n3-07",
  type: "match",
  instruction: "Associe chaque mot savant (origine latine) à son équivalent courant.",
  pairs: [
    { left: "nocturne", right: "nuit" },
    { left: "capillaire", right: "cheveu" },
    { left: "lacté", right: "lait" }
  ],
  feedback: "Nocturne (nox/noctis = nuit), capillaire (capillus = cheveu), lacté (lac/lactis = lait) : des mots savants issus du latin, de même famille que des mots courants."
}
```

```js
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
}
```

```js
{ id:"famille-de-mots-n3-09",
  type: "mcq",
  instruction: "Quel mot n'appartient PAS à la famille étymologique de « chronomètre » (temps) ?",
  choices: ["chronologie", "synchronisation", "chronique (récit)", "chrome"],
  answer: "chrome",
  feedback: "Chrome vient du grec « khrôma » (couleur), sans lien avec le temps. Chronologie, synchronisation et chronique viennent du grec « khronos » (le temps)."
}
```

```js
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
```

## identifier-homonyme — Identifier un homonyme

### Niveau 1 (manque 5)

```js
{ id:"identifier-homonyme-n1-06",
  type: "mcq",
  instruction: "Que sont 'cent', 'sang' et 'sans' ?",
  choices: ["Des synonymes", "Des antonymes", "Des homonymes", "Des mots de la même famille"],
  answer: "Des homonymes",
  feedback: "Cent [sɑ̃] (nombre), sang [sɑ̃] (liquide rouge) et sans [sɑ̃] (préposition) se prononcent pareil mais s'écrivent différemment. Ce sont des homonymes."
}
```

```js
{ id:"identifier-homonyme-n1-07",
  type: "mcq",
  instruction: "Complète : « Le boulanger vend du ___ frais tous les matins. »",
  choices: ["pain", "pin", "peint", "main"],
  answer: "pain",
  feedback: "On achète du pain (aliment) chez le boulanger. Pin est un arbre, peint vient du verbe peindre, main est une partie du corps."
}
```

```js
{ id:"identifier-homonyme-n1-08",
  type: "match",
  instruction: "Associe chaque homonyme à sa définition.",
  pairs: [
    { left: "cou", right: "partie du corps entre la tête et les épaules" },
    { left: "coup", right: "choc ou action brève" },
    { left: "coût", right: "prix de quelque chose" }
  ],
  feedback: "Cou, coup et coût se prononcent tous [ku] mais ont des sens et des orthographes différents : ce sont des homonymes."
}
```

```js
{ id:"identifier-homonyme-n1-09",
  type: "mcq",
  instruction: "Quel est l'homonyme du mot 'air' (ce qu'on respire) ?",
  choices: ["aire", "habit", "route", "fleur"],
  answer: "aire",
  feedback: "Air [ɛʁ] (ce qu'on respire) et aire [ɛʁ] (surface, zone) se prononcent pareil. Ce sont des homonymes."
}
```

```js
{ id:"identifier-homonyme-n1-10",
  type: "mcq",
  instruction: "Complète : « Il a acheté une bouteille de ___ pour le dîner. »",
  choices: ["vin", "vingt", "vain", "vint"],
  answer: "vin",
  feedback: "On boit du vin (boisson) au dîner. Vingt est un nombre, vain signifie inutile, vint est le passé simple du verbe venir."
}
```

### Niveau 2 (manque 5)

```js
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
}
```

```js
{ id:"identifier-homonyme-n2-07",
  type: "mcq",
  instruction: "Choisis le bon mot : « Je te laisse le choix, prends la ___ que tu préfères. »",
  choices: ["voie (chemin)", "voix (son émis)", "vois (verbe voir)", "vois-tu"],
  answer: "voie (chemin)",
  feedback: "'Voie' désigne un chemin ou une direction. 'Voix' est le son émis en parlant. 'Vois' est le verbe voir conjugué. Ces mots se prononcent tous [vwa]."
}
```

```js
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
}
```

```js
{ id:"identifier-homonyme-n2-09",
  type: "match",
  instruction: "Associe chaque homonyme à la phrase où il doit apparaître.",
  pairs: [
    { left: "peu (adverbe de quantité)", right: "Il reste peu de temps." },
    { left: "peux (verbe pouvoir)", right: "Tu peux venir avec nous." },
    { left: "peut (verbe pouvoir)", right: "Elle peut réussir." }
  ],
  feedback: "Peu, peux et peut se prononcent tous [pø] mais ont des rôles grammaticaux différents : adverbe ou verbe pouvoir conjugué."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
{ id:"identifier-homonyme-n3-06",
  type: "mcq",
  instruction: "Lequel de ces couples n'est PAS une paire d'homophones ?",
  choices: ["cygne / signe", "tante / tente", "cher / chair", "chou / genou"],
  answer: "chou / genou",
  feedback: "Cygne/signe [siɲ], tante/tente [tɑ̃t] et cher/chair [ʃɛʁ] sont des paires d'homophones parfaits. Chou [ʃu] et genou [ʒənu] ne se prononcent pas pareil."
}
```

```js
{ id:"identifier-homonyme-n3-07",
  type: "match",
  instruction: "Associe chaque série d'homophones rares à leur différence de nature.",
  pairs: [
    { left: "prêt / près / pré", right: "prêt = adjectif (disponible) ; près = adverbe (proximité) ; pré = nom (champ)" },
    { left: "cour / cours / court / courre", right: "cour = espace extérieur ; cours = leçon ; court = bref ; courre = chasse à courre" },
    { left: "tan / tant / taon / temps", right: "tan = écorce tannante ; tant = quantité ; taon = insecte piqueur ; temps = durée ou météo" }
  ],
  feedback: "Ces séries d'homophones rares regroupent jusqu'à quatre mots de nature grammaticale différente qui se prononcent exactement pareil."
}
```

```js
{ id:"identifier-homonyme-n3-08",
  type: "mcq",
  instruction: "Dans « Le foie du canard est cuit », combien de mots ont un homophone ?",
  choices: ["Aucun", "1 : foie (fois/foi)", "2 : foie et canard", "3 : foie, canard et cuit"],
  answer: "1 : foie (fois/foi)",
  feedback: "Foie [fwa] a deux homophones : fois (occurrence) et foi (croyance). Canard et cuit n'ont pas d'homophone courant."
}
```

```js
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
}
```

```js
{ id:"identifier-homonyme-n3-10",
  type: "mcq",
  instruction: "Lequel de ces mots n'est PAS homophone de 'père' ?",
  choices: ["paire", "pair", "perd", "pierre"],
  answer: "pierre",
  feedback: "Père, paire, pair et perd se prononcent tous [pɛʁ]. Pierre se prononce [pjɛʁ], avec un son différent : ce n'est pas un homophone de 'père'."
}
```

## identifier-prefixe — Identifier un préfixe

### Niveau 1 (manque 5)

```js
{ id:"identifier-prefixe-n1-06",
  type: "mcq",
  instruction: "Quel est le préfixe dans le mot « redire » ?",
  choices: ["re-", "dire", "-ire", "redi"],
  answer: "re-",
  feedback: "Re-dire : « re- » est le préfixe, il indique la répétition. Redire = dire à nouveau, répéter."
}
```

```js
{ id:"identifier-prefixe-n1-07",
  type: "mcq",
  instruction: "Que signifie le préfixe « in- » dans « inutile » ?",
  choices: ["avant", "après", "non / sans", "à nouveau"],
  answer: "non / sans",
  feedback: "« In- » exprime la négation. Inutile = qui n'est pas utile, sans utilité."
}
```

```js
{ id:"identifier-prefixe-n1-08",
  type: "match",
  instruction: "Associe chaque préfixe à sa signification.",
  pairs: [
    { left: "dé- (défaire)", right: "contraire / action inverse" },
    { left: "re- (repartir)", right: "à nouveau" },
    { left: "mal- (malchance)", right: "mauvais / négatif" }
  ],
  feedback: "Dé- (contraire), re- (à nouveau) et mal- (mauvais) sont des préfixes très courants en français."
}
```

```js
{ id:"identifier-prefixe-n1-09",
  type: "mcq",
  instruction: "Quel mot contient un préfixe ?",
  choices: ["fenêtre", "revoir", "tableau", "voiture"],
  answer: "revoir",
  feedback: "Revoir = re- (préfixe = répétition) + voir. Fenêtre, tableau et voiture n'ont pas de préfixe."
}
```

```js
{ id:"identifier-prefixe-n1-10",
  type: "mcq",
  instruction: "Quel préfixe trouve-t-on dans « prévenir » et que signifie-t-il ?",
  choices: ["pré- = avant", "pré- = après", "pré- = contre", "pré- = beaucoup"],
  answer: "pré- = avant",
  feedback: "Prévenir = pré- (avant) + venir : informer à l'avance. Le préfixe pré- indique l'antériorité."
}
```

### Niveau 2 (manque 5)

```js
{ id:"identifier-prefixe-n2-06",
  type: "mcq",
  instruction: "Que signifie le préfixe « co- » dans « coéquipier » ?",
  choices: ["contre", "avec / ensemble", "avant", "au-delà"],
  answer: "avec / ensemble",
  feedback: "Co- (du latin « cum », avec) signifie « ensemble ». Coéquipier = personne qui joue avec toi dans la même équipe. Aussi : cohabiter, coexister."
}
```

```js
{ id:"identifier-prefixe-n2-07",
  type: "mcq",
  instruction: "Le préfixe « sous- » dans « sous-marin » signifie…",
  choices: ["au-dessus", "sous, en dessous de", "entre", "contre"],
  answer: "sous, en dessous de",
  feedback: "Sous- indique une position inférieure. Sous-marin = qui est sous la mer. Aussi : sous-sol, souterrain."
}
```

```js
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
}
```

```js
{ id:"identifier-prefixe-n2-09",
  type: "mcq",
  instruction: "Quel préfixe donne à « légal » son contraire ?",
  choices: ["il-", "re-", "co-", "sous-"],
  answer: "il-",
  feedback: "Illégal = il- + légal. Il- est une variante de in- devant la lettre l, exprimant la négation."
}
```

```js
{ id:"identifier-prefixe-n2-10",
  type: "mcq",
  instruction: "Que signifie le préfixe « tri- » dans « tricycle » ?",
  choices: ["un", "deux", "trois", "quatre"],
  answer: "trois",
  feedback: "Tri- vient du latin/grec « tri » (trois). Tricycle = véhicule à trois roues. Aussi : triangle, trimestre."
}
```

### Niveau 3 (manque 5)

```js
{ id:"identifier-prefixe-n3-06",
  type: "mcq",
  instruction: "Quel préfixe grec signifiant « seul » retrouve-t-on dans « monologue » et « monopole » ?",
  choices: ["mono-", "poly-", "mon-", "logue-"],
  answer: "mono-",
  feedback: "Mono- vient du grec « monos » (seul, unique). Monologue = discours d'une seule personne. Monopole = possession exclusive par un seul."
}
```

```js
{ id:"identifier-prefixe-n3-07",
  type: "match",
  instruction: "Associe chaque préfixe savant à sa signification.",
  pairs: [
    { left: "pan-", right: "tout / entier" },
    { left: "pseudo-", right: "faux" },
    { left: "omni-", right: "tout / partout" }
  ],
  feedback: "Pan- (pandémie), pseudo- (pseudonyme), omni- (omniprésent) sont des préfixes d'origine grecque ou latine."
}
```

```js
{ id:"identifier-prefixe-n3-08",
  type: "mcq",
  instruction: "Dans « rétrograde », quel préfixe latin signifie « en arrière » ?",
  choices: ["rétro-", "gra-", "ré-", "-grade"],
  answer: "rétro-",
  feedback: "Rétro- vient du latin « retro » (en arrière). Rétrograde = qui va en arrière. Aussi : rétroviseur, rétrospective."
}
```

```js
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
}
```

```js
{ id:"identifier-prefixe-n3-10",
  type: "mcq",
  instruction: "Le préfixe « xéno- » (dans « xénophobie ») vient du grec et signifie…",
  choices: ["ami", "étranger", "animal", "couleur"],
  answer: "étranger",
  feedback: "Xéno- vient du grec « xenos » (étranger). Xénophobie = peur/rejet de l'étranger. On retrouve ce préfixe dans « xénophile » (qui aime les cultures étrangères)."
}
```
## identifier-radical — Identifier le radical d'un mot

### Niveau 1 (manque 5)

```js
{ id:"identifier-radical-n1-06",
  type: "mcq",
  instruction: "Quel est le radical du mot « laitier » ?",
  choices: ["lait", "laitue", "laiterie", "laitage"],
  answer: "lait",
  feedback: "Lait-ier : le radical est « lait ». Le suffixe « -ier » indique souvent un métier."
}
```

```js
{ id:"identifier-radical-n1-07",
  type: "mcq",
  instruction: "Quel est le radical commun à « chocolatier », « chocolaterie » et « chocolaté » ?",
  choices: ["chocolat", "choc", "chocolate", "chocolatier"],
  answer: "chocolat",
  feedback: "Le radical commun est « chocolat ». Chocolatier, chocolaterie et chocolaté sont tous liés au chocolat."
}
```

```js
{ id:"identifier-radical-n1-08",
  type: "match",
  instruction: "Associe chaque mot à son radical.",
  pairs: [
    { left: "nageur", right: "nag-" },
    { left: "coureur", right: "cour-" },
    { left: "joueur", right: "jou-" }
  ],
  feedback: "Nag-eur, cour-eur, jou-eur : le suffixe « -eur » s'ajoute au radical pour désigner celui qui fait l'action."
}
```

```js
{ id:"identifier-radical-n1-09",
  type: "mcq",
  instruction: "Quel est le radical du mot « poissonnier » ?",
  choices: ["poisson", "poissonn", "poissonnier", "-nier"],
  answer: "poisson",
  feedback: "Poisson-nier : le radical est « poisson ». Le suffixe « -nier » désigne un métier lié au commerce."
}
```

```js
{ id:"identifier-radical-n1-10",
  type: "mcq",
  instruction: "Quel est le radical du mot « dentiste » ?",
  choices: ["dent", "dentist", "-iste", "dentier"],
  answer: "dent",
  feedback: "Dent-iste : le radical est « dent ». Le suffixe « -iste » désigne souvent une profession ou une spécialité."
}
```

### Niveau 2 (manque 5)

```js
{ id:"identifier-radical-n2-06",
  type: "mcq",
  instruction: "Quel est le radical du mot « éclaircir » ?",
  choices: ["clair", "éclair", "clairc", "-cir"],
  answer: "clair",
  feedback: "É-clairc-ir : le radical est « clair », légèrement modifié par l'ajout du suffixe verbal. Éclaircir signifie « rendre plus clair »."
}
```

```js
{ id:"identifier-radical-n2-07",
  type: "mcq",
  instruction: "Quel est le radical du mot « embellissement » ?",
  choices: ["em-", "bell", "-issement", "embell"],
  answer: "bell",
  feedback: "Em-bell-issement : « em- » est un préfixe, « bell » est le radical (qui vient de « beau/belle »), « -issement » est le suffixe. Ce mot signifie « rendre plus beau »."
}
```

```js
{ id:"identifier-radical-n2-08",
  type: "match",
  instruction: "Associe chaque mot à son radical (attention aux petits changements de forme).",
  pairs: [
    { left: "blanchir", right: "blanc" },
    { left: "épaissir", right: "épais" },
    { left: "verdir", right: "vert" }
  ],
  feedback: "Blanch-ir (blanc), épaiss-ir (épais), verd-ir (vert) : le radical change légèrement de forme à l'oral et à l'écrit."
}
```

```js
{ id:"identifier-radical-n2-09",
  type: "mcq",
  instruction: "Quel radical partagent « pâtissier », « pâtisserie » et « pâtissière » ?",
  choices: ["pâtiss", "pât", "pâte", "pâtisseri"],
  answer: "pâtiss",
  feedback: "Le radical commun est « pâtiss- ». Il vient du mot « pâte », avec un léger changement orthographique."
}
```

```js
{ id:"identifier-radical-n2-10",
  type: "mcq",
  instruction: "Quel est le radical du mot « infortuné » ?",
  choices: ["in-", "fortun", "fortuné", "-é"],
  answer: "fortun",
  feedback: "In-fortun-é : « in- » est le préfixe (négation), « fortun » est le radical (vient de « fortune », la chance), « -é » est le suffixe."
}
```

### Niveau 3 (manque 5)

```js
{ id:"identifier-radical-n3-06",
  type: "mcq",
  instruction: "Quel est le radical latin commun à « capable », « capture » et « captif » ?",
  choices: ["capt", "able", "ure", "if"],
  answer: "capt",
  feedback: "Le radical latin « capt- » (parfois « cap- ») vient de « capere » (prendre, saisir). Capable = qui peut prendre/comprendre, capture = action de prendre, captif = qui est pris."
}
```

```js
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
}
```

```js
{ id:"identifier-radical-n3-08",
  type: "mcq",
  instruction: "Quel radical grec signifie « chaleur » dans « thermomètre », « thermal » et « hypothermie » ?",
  choices: ["therm", "mètre", "hypo", "thermomètre"],
  answer: "therm",
  feedback: "Le radical grec « thermos » (chaud) donne « therm- ». Thermomètre mesure la chaleur, thermal se dit d'une source chaude, hypothermie = température corporelle trop basse."
}
```

```js
{ id:"identifier-radical-n3-09",
  type: "mcq",
  instruction: "Quel est le radical commun à « manuel », « manœuvre » et « manufacture » ?",
  choices: ["man", "oeuvre", "facture", "uel"],
  answer: "man",
  feedback: "Le radical latin « man- » (manus = la main) est présent dans manuel (fait à la main), manœuvre (travail manuel) et manufacture (fabrication à la main à l'origine)."
}
```

```js
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
```

## identifier-suffixe — Identifier un suffixe

### Niveau 1 (manque 5)

```js
{ id:"identifier-suffixe-n1-06",
  type: "mcq",
  instruction: "Quel est le suffixe dans le mot « chanteuse » ?",
  choices: ["chant-", "-euse", "-use", "chanteu-"],
  answer: "-euse",
  feedback: "Chant-euse : le suffixe « -euse » est le féminin de « -eur ». Il désigne une femme qui fait l'action de chanter."
}
```

```js
{ id:"identifier-suffixe-n1-07",
  type: "mcq",
  instruction: "Que signifie le suffixe « -able » dans « lavable » ?",
  choices: ["une action", "qui peut être lavé", "un endroit", "une petite taille"],
  answer: "qui peut être lavé",
  feedback: "Le suffixe « -able » signifie « qui peut être… ». Lavable = qui peut être lavé. Aussi : mangeable, cassable, réparable…"
}
```

```js
{ id:"identifier-suffixe-n1-08",
  type: "match",
  instruction: "Associe chaque suffixe à ce qu'il exprime.",
  pairs: [
    { left: "-elle (tourelle)", right: "petite taille" },
    { left: "-oir (miroir)", right: "objet qui sert à" },
    { left: "-esse (richesse)", right: "qualité, état" }
  ],
  feedback: "-elle exprime la petite taille (tourelle = petite tour), -oir désigne un objet servant à quelque chose (un miroir sert à se voir), -esse exprime une qualité ou un état (richesse = état de richesse)."
}
```

```js
{ id:"identifier-suffixe-n1-09",
  type: "mcq",
  instruction: "Quel mot contient un suffixe désignant un objet qui sert à faire quelque chose ?",
  choices: ["séchoir", "jardin", "gentil", "content"],
  answer: "séchoir",
  feedback: "Séch-oir : le suffixe « -oir » désigne un objet ou un lieu qui sert à faire l'action indiquée par le radical."
}
```

```js
{ id:"identifier-suffixe-n1-10",
  type: "mcq",
  instruction: "Quel suffixe retrouve-t-on dans « politesse » et « tristesse » pour exprimer une qualité ou un état ?",
  choices: ["-esse", "-ette", "-age", "-erie"],
  answer: "-esse",
  feedback: "Le suffixe « -esse » exprime une qualité, un état : politesse (être poli), tristesse (être triste)."
}
```

### Niveau 2 (manque 5)

```js
{ id:"identifier-suffixe-n2-06",
  type: "mcq",
  instruction: "Quel suffixe transforme l'adjectif « franche » en adverbe ?",
  choices: ["-ment", "-eur", "-age", "-ette"],
  answer: "-ment",
  feedback: "Franche-ment. Le suffixe « -ment » s'ajoute à l'adjectif au féminin pour former l'adverbe de manière : franche → franchement, sûre → sûrement."
}
```

```js
{ id:"identifier-suffixe-n2-07",
  type: "match",
  instruction: "Associe chaque suffixe à la catégorie grammaticale qu'il crée.",
  pairs: [
    { left: "-ien (pharmacien)", right: "nom (personne)" },
    { left: "-emment (prudemment)", right: "adverbe" },
    { left: "-if (sportif)", right: "adjectif" }
  ],
  feedback: "-ien crée des noms de personnes (métiers), -emment crée des adverbes (variante de -ment après un adjectif en -ent/-ant), -if crée des adjectifs."
}
```

```js
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
}
```

```js
{ id:"identifier-suffixe-n2-09",
  type: "mcq",
  instruction: "Le suffixe « -ien » dans « électricien » exprime…",
  choices: ["Une petite taille", "Une profession ou spécialité", "Une action", "Un résultat"],
  answer: "Une profession ou spécialité",
  feedback: "Électric-ien : le suffixe « -ien » désigne une personne exerçant une profession ou une spécialité, comme « informaticien » ou « historien »."
}
```

```js
{ id:"identifier-suffixe-n2-10",
  type: "mcq",
  instruction: "Quel suffixe dans « guérison » crée un nom d'action à partir du verbe « guérir » ?",
  choices: ["-son", "-aison", "-ison", "guér-"],
  answer: "-ison",
  feedback: "Guér-ison : le suffixe « -ison » crée un nom d'action à partir d'un verbe (ici, guérir → guérison)."
}
```

### Niveau 3 (manque 5)

```js
{ id:"identifier-suffixe-n3-06",
  type: "mcq",
  instruction: "Le suffixe « -cide » dans « insecticide » vient du latin « caedere » et signifie…",
  choices: ["qui aime", "qui tue", "qui mange", "qui craint"],
  answer: "qui tue",
  feedback: "« -cide » vient du latin « caedere » (tuer, couper). Insecticide = qui tue les insectes. Aussi : pesticide, homicide."
}
```

```js
{ id:"identifier-suffixe-n3-07",
  type: "match",
  instruction: "Associe chaque suffixe d'origine grecque ou latine à sa signification.",
  pairs: [
    { left: "-onyme (synonyme)", right: "nom" },
    { left: "-cratie (démocratie)", right: "pouvoir" },
    { left: "-isme (optimisme)", right: "doctrine, attitude" }
  ],
  feedback: "-onyme (grec onoma = nom), -cratie (grec kratos = pouvoir), -isme (suffixe désignant une doctrine, un système ou une attitude)."
}
```

```js
{ id:"identifier-suffixe-n3-08",
  type: "mcq",
  instruction: "Dans « thermomètre », quel suffixe grec signifie « mesure » ?",
  choices: ["-mètre", "thermo-", "-ique", "-eur"],
  answer: "-mètre",
  feedback: "« -mètre » vient du grec « metron » (mesure). Thermomètre mesure la chaleur. Aussi : kilomètre, baromètre, chronomètre."
}
```

```js
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
}
```

```js
{ id:"identifier-suffixe-n3-10",
  type: "mcq",
  instruction: "Le suffixe « -phage » (dans « anthropophage ») vient du grec « phagein » et signifie…",
  choices: ["qui parle", "qui mange", "qui écrit", "qui voit"],
  answer: "qui mange",
  feedback: "« Phagein » signifie « manger » en grec. On le retrouve dans « anthropophage » (qui mange des humains) et en biologie dans « phagocyte » (cellule qui « mange » d'autres cellules)."
}
```

## mot-adapte-contexte — Choisir le mot adapté au contexte

### Niveau 1 (manque 5)

```js
{ id:"mot-adapte-contexte-n1-06",
  type: "mcq",
  instruction: "Complète la phrase : « Le boulanger sort le pain tout chaud de son _____. »",
  choices: ["four", "frigo", "lit", "vélo"],
  answer: "four",
  feedback: "Le pain cuit dans un four. Les autres mots n'ont aucun rapport avec la cuisson du pain."
}
```

```js
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
}
```

```js
{ id:"mot-adapte-contexte-n1-08",
  type: "mcq",
  instruction: "Complète la phrase : « Le _____ chantait joyeusement sur la branche de l'arbre. »",
  choices: ["oiseau", "poisson", "ballon", "crayon"],
  answer: "oiseau",
  feedback: "Un oiseau chante et se pose sur une branche. Les autres mots ne correspondent pas à cette scène."
}
```

```js
{ id:"mot-adapte-contexte-n1-09",
  type: "mcq",
  instruction: "Dans un magasin, quel mot utilise-t-on pour parler du prix d'un objet ?",
  choices: ["le coût", "le bruit", "la couleur", "l'odeur"],
  answer: "le coût",
  feedback: "Le coût désigne le prix à payer pour un objet. Bruit, couleur et odeur ne concernent pas l'argent."
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
{ id:"mot-adapte-contexte-n2-06",
  type: "mcq",
  instruction: "Complète la phrase : « Au printemps, les bourgeons des arbres _____ et donnent de nouvelles feuilles. »",
  choices: ["éclosent", "tombent", "gèlent", "jaunissent"],
  answer: "éclosent",
  feedback: "Au printemps, les bourgeons éclosent (s'ouvrent). Tomber, geler et jaunir correspondent plutôt à l'automne ou à l'hiver."
}
```

```js
{ id:"mot-adapte-contexte-n2-07",
  type: "mcq",
  instruction: "Lequel de ces mots est le plus précis pour décrire une odeur désagréable et forte ?",
  choices: ["parfumée", "fade", "nauséabonde", "sucrée"],
  answer: "nauséabonde",
  feedback: "Nauséabonde décrit une odeur forte et écœurante qui donne la nausée. Parfumée, fade et sucrée ne conviennent pas pour une odeur désagréable."
}
```

```js
{ id:"mot-adapte-contexte-n2-08",
  type: "mcq",
  instruction: "Complète : « Après la course, le sportif avait le souffle _____. »",
  choices: ["léger", "court", "parfumé", "silencieux"],
  answer: "court",
  feedback: "« Avoir le souffle court » signifie respirer difficilement après un effort. Les autres adjectifs ne conviennent pas à ce contexte."
}
```

```js
{ id:"mot-adapte-contexte-n2-09",
  type: "mcq",
  instruction: "Complète : « Le clown _____ les enfants avec ses grimaces amusantes. »",
  choices: ["effrayait", "amusait", "ennuyait", "endormait"],
  answer: "amusait",
  feedback: "Amuser = faire rire, divertir. Des grimaces amusantes amusent les enfants. Effrayer et ennuyer sont des contraires dans ce contexte."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
{ id:"mot-adapte-contexte-n3-06",
  type: "mcq",
  instruction: "Quel mot convient le mieux dans : « Son silence, pourtant _____, en disait long. » ?",
  choices: ["bruyant", "éloquent", "sucré", "rapide"],
  answer: "éloquent",
  feedback: "Éloquent = qui exprime beaucoup sans avoir besoin de mots. Un « silence éloquent » est une expression courante et pertinente ici, contrairement à « silence bruyant » qui est contradictoire."
}
```

```js
{ id:"mot-adapte-contexte-n3-07",
  type: "mcq",
  instruction: "Dans : « Ses propos ont _____ toute l'assistance », quel verbe convient pour exprimer une indignation collective ?",
  choices: ["ravi", "outré", "amusé", "attendri"],
  answer: "outré",
  feedback: "Outrer = provoquer une vive indignation. Des propos choquants outrent l'assistance. Ravir, amuser et attendrir expriment des réactions positives ou neutres."
}
```

```js
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
}
```

```js
{ id:"mot-adapte-contexte-n3-09",
  type: "mcq",
  instruction: "Dans : « Il répondit d'un ton _____ », quel adjectif exprime le mieux l'arrogance ?",
  choices: ["hésitant", "hautain", "timide", "ému"],
  answer: "hautain",
  feedback: "Un ton hautain exprime le mépris et la supériorité affichée. Hésitant, timide et ému traduisent au contraire de la retenue ou de la sensibilité."
}
```

```js
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
```

## mot-derive — Former un mot dérivé

### Niveau 1 (manque 5)

```js
{ id:"mot-derive-n1-06",
  type: "mcq",
  instruction: "Quel mot est dérivé de « dent » avec un suffixe ?",
  choices: ["dentiste", "denture", "dentifrice", "addenda"],
  answer: "dentiste",
  feedback: "Dentiste = dent + -iste. C'est un mot dérivé par suffixation."
}
```

```js
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
}
```

```js
{ id:"mot-derive-n1-08",
  type: "match",
  instruction: "Associe chaque base à son mot dérivé.",
  pairs: [
    { left: "danser + -eur", right: "danseur" },
    { left: "peindre + -ure", right: "peinture" },
    { left: "coller + -age", right: "collage" }
  ],
  feedback: "Dans-eur, peint-ure, coll-age : on ajoute un suffixe à la base (le verbe) pour former un nouveau mot, souvent un nom."
}
```

```js
{ id:"mot-derive-n1-09",
  type: "mcq",
  instruction: "Quel préfixe ajoute-t-on à « content » pour former son contraire ?",
  choices: ["dé-", "mé-", "in-", "re-"],
  answer: "mé-",
  feedback: "Mécontent = mé- + content. Le préfixe « mé- » exprime souvent la négation ou l'idée contraire, comme dans méconnaître ou mésentente."
}
```

```js
{ id:"mot-derive-n1-10",
  type: "mcq",
  instruction: "Quel mot est formé par préfixation à partir de « faire » ?",
  choices: ["faisable", "refaire", "faiseur", "défaite"],
  answer: "refaire",
  feedback: "Refaire = re- (préfixe = de nouveau) + faire. C'est une dérivation par préfixation. Faisable et faiseur sont formés par suffixation."
}
```

### Niveau 2 (manque 5)

```js
{ id:"mot-derive-n2-06",
  type: "mcq",
  instruction: "Quel est le mot de base (radical sans affixes) de « refroidissement » ?",
  choices: ["refroidi", "froid", "refroidissement", "froidissement"],
  answer: "froid",
  feedback: "Re-froid-issement : le préfixe « re- » et le suffixe « -issement » entourent le radical « froid ». Le mot de base est « froid »."
}
```

```js
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
}
```

```js
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
}
```

```js
{ id:"mot-derive-n2-09",
  type: "mcq",
  instruction: "Quel mot est formé avec à la fois un préfixe ET un suffixe ?",
  choices: ["mécontentement", "coiffure", "refaire", "emballage"],
  answer: "mécontentement",
  feedback: "Mécontentement = mé- (préfixe) + content (radical) + -ement (suffixe). Les autres mots n'ont qu'un préfixe ou qu'un suffixe, pas les deux."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
{ id:"mot-derive-n3-06",
  type: "mcq",
  instruction: "Le mot « incontestable » est formé de…",
  choices: ["in- + contestable", "incontest + able", "in- + contest + able", "in- + contestabl + e"],
  answer: "in- + contestable",
  feedback: "Incontestable = in- (non) + contestable. Et contestable lui-même = contest- + -able. C'est un mot à plusieurs niveaux de dérivation, comme invraisemblable."
}
```

```js
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
}
```

```js
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
}
```

```js
{ id:"mot-derive-n3-09",
  type: "mcq",
  instruction: "Dans « interplanétaire », le préfixe « inter- » signifie…",
  choices: ["au-dessus de", "entre", "avant", "contre"],
  answer: "entre",
  feedback: "Inter- vient du latin « inter » (entre). Interplanétaire = qui se situe entre les planètes. Aussi : international, intercontinental."
}
```

```js
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
```
## niveaux-de-langue — Distinguer les niveaux de langue

### Niveau 1 (manque 5)

```js
{ id:"niveaux-de-langue-n1-06",
  type: "mcq",
  instruction: "Quelle phrase est au registre soutenu pour dire qu'on va manger ?",
  choices: ["Je vais bouffer.", "Je vais manger.", "Je vais me restaurer.", "Je vais becter."],
  answer: "Je vais me restaurer.",
  feedback: "« Se restaurer » est un terme soutenu. « Manger » est courant. « Bouffer » et « becter » sont très familiers, presque argotiques."
}
```

```js
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
}
```

```js
{ id:"niveaux-de-langue-n1-08",
  type: "mcq",
  instruction: "Quel mot est de niveau soutenu pour dire « content » ?",
  choices: ["content", "comblé", "joyeux", "trop content"],
  answer: "comblé",
  feedback: "« Comblé » (pleinement satisfait) est un terme soutenu. « Content » et « joyeux » sont courants. « Trop content » utilise un intensif familier."
}
```

```js
{ id:"niveaux-de-langue-n1-09",
  type: "mcq",
  instruction: "À quel niveau de langue appartient : « Puis-je me permettre de vous interrompre un instant ? »",
  choices: ["Familier", "Courant", "Soutenu", "Argotique"],
  answer: "Soutenu",
  feedback: "Cette formule de politesse recherchée, avec « me permettre », relève du registre soutenu."
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
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
}
```

```js
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
}
```

```js
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
}
```

```js
{ id:"niveaux-de-langue-n2-09",
  type: "match",
  instruction: "Associe chaque expression familière à son équivalent courant.",
  pairs: [
    { left: "Il a claqué son argent de poche.", right: "Il a dépensé son argent de poche." },
    { left: "Elle est carrément balaise en maths.", right: "Elle est très douée en maths." },
    { left: "On s'est pris la tête.", right: "On s'est disputés." }
  ],
  feedback: "Passer du familier au courant, c'est remplacer les mots imagés par un vocabulaire neutre et précis."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
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
}
```

```js
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
}
```

```js
{ id:"niveaux-de-langue-n3-08",
  type: "match",
  instruction: "Associe chaque formule soutenue à son équivalent courant.",
  pairs: [
    { left: "Nul n'est censé ignorer la loi.", right: "Tout le monde doit connaître la loi." },
    { left: "Je vous serais reconnaissant de bien vouloir répondre.", right: "Merci de répondre." },
    { left: "Il éprouve une vive contrariété.", right: "Il est très énervé." }
  ],
  feedback: "Censé, reconnaissant, contrariété : ces mots ajoutent de la distance et de la formalité, typiques du registre soutenu."
}
```

```js
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
}
```

```js
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
```

## ordre-alphabetique — Ranger dans l'ordre alphabétique

### Niveau 1 (manque 5)

```js
{ id:"ordre-alphabetique-n1-06",
  type: "click-sort",
  instruction: "Clique sur les mots dans l'ordre alphabétique (du premier au dernier).",
  words: ["girafe", "ours", "poisson", "abeille"],
  answer: ["abeille", "girafe", "ours", "poisson"],
  feedback: "A vient avant G, G avant O, O avant P : abeille → girafe → ours → poisson."
}
```

```js
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
}
```

```js
{ id:"ordre-alphabetique-n1-08",
  type: "mcq",
  instruction: "Quel mot vient en DERNIER dans le dictionnaire ?",
  choices: ["hibou", "dauphin", "singe", "chèvre"],
  answer: "singe",
  feedback: "On compare les premières lettres : c, d, h, s. S est la dernière parmi ces quatre, donc singe vient en dernier."
}
```

```js
{ id:"ordre-alphabetique-n1-09",
  type: "click-sort",
  instruction: "Clique sur les mots dans l'ordre alphabétique.",
  words: ["tortue", "escargot", "papillon", "lézard"],
  answer: ["escargot", "lézard", "papillon", "tortue"],
  feedback: "E < L < P < T : escargot → lézard → papillon → tortue."
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
{ id:"ordre-alphabetique-n2-06",
  type: "click-sort",
  instruction: "Ces mots commencent tous par la même lettre. Clique-les dans l'ordre alphabétique.",
  words: ["rivière", "robe", "radis", "rue"],
  answer: ["radis", "rivière", "robe", "rue"],
  feedback: "On compare la 2e lettre : radis (a), rivière (i), robe (o), rue (u). A < I < O < U : radis → rivière → robe → rue."
}
```

```js
{ id:"ordre-alphabetique-n2-07",
  type: "mcq",
  instruction: "Quel mot vient AVANT 'tourner' dans le dictionnaire ?",
  choices: ["tourbillon", "tourteau", "tousser", "tournevis"],
  answer: "tourbillon",
  feedback: "tourner = t-o-u-r-n-e-r. Tourbillon = t-o-u-r-b… : à la 5e lettre, b vient avant n, donc tourbillon précède tourner. Tourteau, tousser et tournevis viennent tous après."
}
```

```js
{ id:"ordre-alphabetique-n2-08",
  type: "click-sort",
  instruction: "Clique sur ces légumes dans l'ordre alphabétique.",
  words: ["carotte", "céleri", "chou", "concombre"],
  answer: ["carotte", "céleri", "chou", "concombre"],
  feedback: "ca < cé(ce) < ch < co : carotte → céleri → chou → concombre."
}
```

```js
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
}
```

```js
{ id:"ordre-alphabetique-n2-10",
  type: "mcq",
  instruction: "Quel mot vient APRÈS 'garder' dans le dictionnaire ?",
  choices: ["garage", "gant", "garçon", "gare"],
  answer: "gare",
  feedback: "garder = g-a-r-d-e-r. Garage (4e lettre a), garçon (4e lettre c) et gant (3e lettre n) précèdent garder. Gare (4e lettre e) vient après, car e vient après d."
}
```

### Niveau 3 (manque 5)

```js
{ id:"ordre-alphabetique-n3-06",
  type: "click-sort",
  instruction: "Classement délicat ! Clique ces mots dans l'ordre du dictionnaire.",
  words: ["brique", "bribe", "brebis", "broche", "bronze"],
  answer: ["brebis", "bribe", "brique", "broche", "bronze"],
  feedback: "br-e (brebis) vient en premier. Puis br-i : bribe (4e lettre b) avant brique (4e lettre q). Puis br-o : broche (4e lettre c) avant bronze (4e lettre n)."
}
```

```js
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
}
```

```js
{ id:"ordre-alphabetique-n3-08",
  type: "click-sort",
  instruction: "Classe ces mots dans l'ordre du dictionnaire.",
  words: ["plaisir", "plancher", "plage", "planer", "plaine"],
  answer: ["plage", "plaine", "plaisir", "plancher", "planer"],
  feedback: "pla-g < pla-i (plaine, plaisir) < pla-n (plancher, planer). Entre plaine et plaisir, la 5e lettre n < s. Entre plancher et planer, la 5e lettre c < e."
}
```

```js
{ id:"ordre-alphabetique-n3-09",
  type: "mcq",
  instruction: "Pour ranger 'chagrin' et 'chrome' dans le dictionnaire, quelle lettre compare-t-on en 3e position ?",
  choices: ["c", "h", "a et r", "g"],
  answer: "a et r",
  feedback: "chagrin = ch-a-grin, chrome = ch-r-ome. Les deux premières lettres (c, h) sont identiques. On compare donc la 3e : 'a' (chagrin) contre 'r' (chrome). A vient avant R, donc chagrin précède chrome."
}
```

```js
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
```

## origine-mots — Comprendre l'origine des mots (latin, grec)

### Niveau 1 (manque 5)

```js
{ id:"origine-mots-n1-06",
  type: "mcq",
  instruction: "Que signifie la racine latine « dict- » (dicere) ?",
  choices: ["chanter", "dire", "donner", "dormir"],
  answer: "dire",
  feedback: "« Dicere » signifie « dire » en latin. On la retrouve dans dictionnaire, prédire (dire à l'avance), dicter."
}
```

```js
{ id:"origine-mots-n1-07",
  type: "mcq",
  instruction: "Quelle racine grecque signifie « plusieurs » ?",
  choices: ["mono", "poly", "auto", "anti"],
  answer: "poly",
  feedback: "« Poly » signifie « plusieurs » en grec. On le retrouve dans polygone (plusieurs angles), polyglotte (qui parle plusieurs langues)."
}
```

```js
{ id:"origine-mots-n1-08",
  type: "match",
  instruction: "Associe chaque racine latine ou grecque à sa signification.",
  pairs: [
    { left: "mono (grec)", right: "seul, un" },
    { left: "port- (latin)", right: "porter" },
    { left: "scrib/script (latin)", right: "écrire" }
  ],
  feedback: "Mono : monologue (parler seul). Port- : transporter, exporter. Scrib/script : inscription, manuscrit."
}
```

```js
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
}
```

```js
{ id:"origine-mots-n1-10",
  type: "mcq",
  instruction: "La racine « path- » (du grec « pathos », sentiment/souffrance) dans « sympathie » signifie…",
  choices: ["couleur", "sentiment / souffrance", "mouvement", "lumière"],
  answer: "sentiment / souffrance",
  feedback: "Pathos signifie « sentiment, souffrance » en grec. Sympathie = éprouver un sentiment commun (sym- = avec). Aussi : antipathie, empathie."
}
```

### Niveau 2 (manque 5)

```js
{ id:"origine-mots-n2-06",
  type: "match",
  instruction: "Associe chaque adjectif savant à son équivalent courant.",
  pairs: [
    { left: "nocturne", right: "qui a lieu la nuit" },
    { left: "diurne", right: "qui a lieu le jour" },
    { left: "maritime", right: "qui concerne la mer" }
  ],
  feedback: "Nocturne (nox = nuit), diurne (dies = jour), maritime (mare = mer) sont formés à partir de racines latines."
}
```

```js
{ id:"origine-mots-n2-07",
  type: "mcq",
  instruction: "Quelle racine grecque se retrouve dans « métamorphose » et « morphologie » ?",
  choices: ["morph (forme)", "therm (chaleur)", "path (sentiment)", "port (porter)"],
  answer: "morph (forme)",
  feedback: "« Morphê » signifie « forme » en grec. Métamorphose = changement de forme, morphologie = étude des formes."
}
```

```js
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
}
```

```js
{ id:"origine-mots-n2-09",
  type: "mcq",
  instruction: "Quelle racine latine se retrouve dans « sonore » et « résonance » ?",
  choices: ["sonus (son)", "luna (lune)", "aqua (eau)", "terra (terre)"],
  answer: "sonus (son)",
  feedback: "« Sonus » signifie « son » en latin. Sonore = qui produit un son, résonance = son qui se répète."
}
```

```js
{ id:"origine-mots-n2-10",
  type: "mcq",
  instruction: "Parmi ces mots, lequel vient de la racine grecque « astron » (astre, étoile) ?",
  choices: ["astronomie", "fenêtre", "voiture", "chapeau"],
  answer: "astronomie",
  feedback: "Astron signifie « étoile, astre » en grec. Astronomie = étude des astres. On le retrouve aussi dans astronaute, astéroïde."
}
```

### Niveau 3 (manque 5)

```js
{ id:"origine-mots-n3-06",
  type: "mcq",
  instruction: "La racine grecque « hydro » signifie « eau », tout comme le latin « aqua ». Dans quel mot retrouve-t-on la racine grecque ?",
  choices: ["aquarium", "hydravion", "aquatique", "aqueduc"],
  answer: "hydravion",
  feedback: "Hydravion = hydro (eau, grec) + avion : un avion qui peut se poser sur l'eau. Les trois autres mots viennent de la racine latine « aqua »."
}
```

```js
{ id:"origine-mots-n3-07",
  type: "match",
  instruction: "Associe chaque racine à un mot qui la contient.",
  pairs: [
    { left: "gramma (lettre écrite, grec)", right: "télégramme" },
    { left: "cide (tuer, latin)", right: "insecticide" },
    { left: "pod/pous (pied, grec)", right: "trépied" }
  ],
  feedback: "Télégramme (écrit à distance), insecticide (qui tue les insectes), trépied (objet à trois pieds) : ces mots combinent des racines grecques ou latines."
}
```

```js
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
}
```

```js
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
}
```

```js
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
```

## polysemie — Comprendre la polysémie d'un mot

### Niveau 1 (manque 5)

```js
{ id:"polysemie-n1-06",
  type: "mcq",
  instruction: "Combien de sens différents le mot 'glace' peut-il avoir : 1. Eau gelée  2. Dessert froid sucré  3. Miroir ?",
  choices: ["Un seul sens", "Deux sens", "Trois sens", "Aucun sens"],
  answer: "Trois sens",
  feedback: "Glace est polysémique : on patine sur la glace (eau gelée), on mange une glace (dessert), on se regarde dans la glace (miroir). Trois sens bien différents."
}
```

```js
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
}
```

```js
{ id:"polysemie-n1-08",
  type: "mcq",
  instruction: "Le mot 'note' peut signifier : 1. Un résultat scolaire  2. Un son de musique. Combien de sens a-t-il dans ces deux exemples ?",
  choices: ["Un seul sens", "Deux sens", "Trois sens", "Aucun sens"],
  answer: "Deux sens",
  feedback: "Note est polysémique : 'j'ai eu une bonne note' (résultat scolaire) et 'jouer une note' (son de musique) sont deux sens bien distincts."
}
```

```js
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
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
{ id:"polysemie-n2-06",
  type: "match",
  instruction: "Le mot 'pièce' a plusieurs sens. Associe chaque phrase au sens utilisé.",
  pairs: [
    { left: "Il a payé avec une pièce de deux euros.", right: "Une pièce de monnaie" },
    { left: "Cette maison a cinq pièces.", right: "Une salle, une chambre" },
    { left: "Nous allons voir une pièce de théâtre.", right: "Une œuvre théâtrale" }
  ],
  feedback: "Pièce peut désigner une pièce de monnaie, une salle d'une maison, ou une œuvre de théâtre. Le contexte révèle le sens."
}
```

```js
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
}
```

```js
{ id:"polysemie-n2-08",
  type: "match",
  instruction: "Associe chaque emploi du mot 'langue' à son sens.",
  pairs: [
    { left: "Elle s'est mordu la langue.", right: "Organe de la bouche" },
    { left: "Il parle trois langues.", right: "Système de communication d'un pays" },
    { left: "Une langue de terre s'avance dans la mer.", right: "Bande étroite et allongée" }
  ],
  feedback: "Langue est polysémique : organe du corps, système linguistique, forme géographique. Le contexte précise le sens."
}
```

```js
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
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
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
}
```

```js
{ id:"polysemie-n3-07",
  type: "match",
  instruction: "Associe chaque emploi du mot 'porte' à sa catégorie de sens.",
  pairs: [
    { left: "Il ouvre la porte du garage.", right: "Panneau qui ferme une entrée" },
    { left: "Cette victoire lui ouvre la porte du championnat.", right: "Accès, possibilité" },
    { left: "Le porte-parole du gouvernement s'exprime.", right: "Élément composé indiquant qui porte quelque chose" }
  ],
  feedback: "Porte est polysémique : objet concret, sens figuré (accès à une possibilité), et élément de mots composés (porte-parole, porte-monnaie)."
}
```

```js
{ id:"polysemie-n3-08",
  type: "mcq",
  instruction: "Comment appelle-t-on l'emploi d'un mot polysémique dans un sens détourné, comme dans 'dévorer un livre' (= lire avec avidité) ?",
  choices: ["Un sens propre", "Un sens figuré", "Un homonyme", "Un synonyme"],
  answer: "Un sens figuré",
  feedback: "'Dévorer' au sens propre signifie manger avec voracité. Ici, il est employé au sens figuré : lire avec avidité, comme si on 'mangeait' le livre des yeux."
}
```

```js
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
}
```

```js
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
```

Justification (origine-mots, niveau 3) : les racines « andro- »/« anthropo- » et « cide » ont été choisies pour prolonger et nuancer les racines déjà enseignées dans la compétence (anthropo via « philanthrope »), sans jamais réutiliser un mot déjà présent.
## regrouper-par-theme — Regrouper des mots par thème

### Niveau 1 (manque 5)

```js
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
}
```

```js
{ id:"regrouper-par-theme-n1-07",
  type: "mcq",
  instruction: "Quel mot n'appartient PAS au thème des couleurs ?",
  choices: ["rouge", "bleu", "carré", "vert"],
  answer: "carré",
  feedback: "Rouge, bleu et vert sont des couleurs. Carré désigne une forme géométrique, pas une couleur."
}
```

```js
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
}
```

```js
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
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
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
}
```

```js
{ id:"regrouper-par-theme-n2-07",
  type: "mcq",
  instruction: "Quel mot est l'intrus dans cette liste liée au thème de la montagne ?",
  choices: ["sommet", "glacier", "randonnée", "plage"],
  answer: "plage",
  feedback: "Sommet, glacier et randonnée appartiennent au thème de la montagne. La plage appartient au thème du littoral."
}
```

```js
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
}
```

```js
{ id:"regrouper-par-theme-n2-09",
  type: "mcq",
  instruction: "À quel thème général appartiennent « micro-ondes », « réfrigérateur », « grille-pain » et « bouilloire » ?",
  choices: ["Les instruments de musique", "Les appareils électroménagers", "Les outils de bricolage", "Les moyens de transport"],
  answer: "Les appareils électroménagers",
  feedback: "Micro-ondes, réfrigérateur, grille-pain et bouilloire sont tous des appareils électroménagers utilisés dans la cuisine."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
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
}
```

```js
{ id:"regrouper-par-theme-n3-07",
  type: "mcq",
  instruction: "Quel mot peut appartenir à deux thèmes différents selon le contexte ?",
  choices: ["feuille (l'arbre / le papier)", "tronc", "écorce", "branche"],
  answer: "feuille (l'arbre / le papier)",
  feedback: "« Feuille » appartient au thème des végétaux (une feuille d'arbre) ET au thème de l'écriture (une feuille de papier). C'est un exemple de polysémie."
}
```

```js
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
}
```

```js
{ id:"regrouper-par-theme-n3-09",
  type: "mcq",
  instruction: "Dans quel thème général range-t-on les mots « ellipse », « métonymie », « antithèse » et « hyperbole » ?",
  choices: ["Les figures de style", "Les formes géométriques", "Les temps verbaux", "Les registres de langue"],
  answer: "Les figures de style",
  feedback: "Ellipse (omission), métonymie, antithèse et hyperbole sont des figures de style. Attention : « ellipse » désigne aussi une forme géométrique dans un autre contexte."
}
```

```js
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
```

## sens-propre-figure — Identifier le sens propre et le sens figuré

### Niveau 1 (manque 5)

```js
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
}
```

```js
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
}
```

```js
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
}
```

```js
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
}
```

```js
{ id:"sens-propre-figure-n1-10",
  type: "mcq",
  instruction: "Dans 'Elle a un appétit de loup', l'expression signifie qu'elle…",
  choices: ["élève des loups", "a très faim", "a peur des loups", "chasse le loup"],
  answer: "a très faim",
  feedback: "Elle n'a pas vraiment l'appétit d'un loup : cette image signifie simplement qu'elle a très faim. Sens figuré."
}
```

### Niveau 2 (manque 5)

```js
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
}
```

```js
{ id:"sens-propre-figure-n2-07",
  type: "mcq",
  instruction: "Que signifie l'expression 'avoir un poil dans la main' au sens figuré ?",
  choices: ["Avoir mal à la main", "Être très paresseux", "Être très fort", "Avoir une blessure"],
  answer: "Être très paresseux",
  feedback: "'Avoir un poil dans la main' est une expression imagée qui signifie 'être très paresseux, ne rien vouloir faire'."
}
```

```js
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
}
```

```js
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
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
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
}
```

```js
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
}
```

```js
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
}
```

```js
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
}
```

```js
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
```

Justification (sens-propre-figure-n3-10) : « Le Rouge et le Noir » a été retenu comme exemple classique du sens symbolique/figuré des couleurs dans un titre, sur le même principe qu'un exemple déjà présent dans la banque (« Les dents de la mer »).

## trouver-antonyme — Trouver un antonyme

### Niveau 1 (manque 5)

```js
{ id:"trouver-antonyme-n1-06",
  type: "mcq",
  instruction: "Quel est l'antonyme de 'joyeux' ?",
  choices: ["content", "triste", "heureux", "gai"],
  answer: "triste",
  feedback: "Joyeux et triste expriment des sentiments opposés : l'un exprime la joie, l'autre le chagrin. Ce sont des antonymes."
}
```

```js
{ id:"trouver-antonyme-n1-07",
  type: "mcq",
  instruction: "Quel est l'antonyme de 'dur' ?",
  choices: ["solide", "mou", "lourd", "épais"],
  answer: "mou",
  feedback: "Dur et mou décrivent des textures opposées : ce sont des antonymes."
}
```

```js
{ id:"trouver-antonyme-n1-08",
  type: "match",
  instruction: "Associe chaque mot à son contraire.",
  pairs: [
    { left: "plein", right: "vide" },
    { left: "haut", right: "bas" },
    { left: "riche", right: "pauvre" }
  ],
  feedback: "Plein ↔ vide, haut ↔ bas, riche ↔ pauvre. Les antonymes sont des mots de sens contraire."
}
```

```js
{ id:"trouver-antonyme-n1-09",
  type: "mcq",
  instruction: "L'antonyme de 'ouvrir' est…",
  choices: ["fermer", "pousser", "tirer", "sortir"],
  answer: "fermer",
  feedback: "Ouvrir et fermer sont des antonymes : l'un permet le passage, l'autre le bloque."
}
```

```js
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
```

### Niveau 2 (manque 5)

```js
{ id:"trouver-antonyme-n2-06",
  type: "mcq",
  instruction: "Quel est l'antonyme de 'légal' formé avec un préfixe ?",
  choices: ["illégal", "délégal", "malégal", "inlégal"],
  answer: "illégal",
  feedback: "Le préfixe négatif il- transforme 'légal' en son contraire 'illégal'."
}
```

```js
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
}
```

```js
{ id:"trouver-antonyme-n2-08",
  type: "mcq",
  instruction: "Dans 'Le ciel est clair ce soir', l'antonyme contextuel de 'clair' est…",
  choices: ["obscur", "beau", "froid", "calme"],
  answer: "obscur",
  feedback: "Dans ce contexte (luminosité du ciel), l'antonyme de clair est obscur. Attention : clair peut aussi signifier 'compréhensible', avec un autre antonyme possible ('confus')."
}
```

```js
{ id:"trouver-antonyme-n2-09",
  type: "mcq",
  instruction: "Quel est l'antonyme de 'accepter' dans un contexte de négociation ?",
  choices: ["refuser", "proposer", "négocier", "discuter"],
  answer: "refuser",
  feedback: "Accepter une proposition et la refuser sont deux réactions opposées dans une négociation."
}
```

```js
{ id:"trouver-antonyme-n2-10",
  type: "mcq",
  instruction: "Quel est l'antonyme de 'obéir' ?",
  choices: ["désobéir", "écouter", "suivre", "respecter"],
  answer: "désobéir",
  feedback: "Le préfixe dés- transforme 'obéir' en son contraire 'désobéir' : ne pas se soumettre à un ordre."
}
```

### Niveau 3 (manque 5)

```js
{ id:"trouver-antonyme-n3-06",
  type: "mcq",
  instruction: "Dans un texte littéraire, quel antonyme de 'silence' est le plus évocateur pour décrire une foule en délire ?",
  choices: ["bruit", "vacarme", "calme", "paix"],
  answer: "vacarme",
  feedback: "Le vacarme évoque un bruit assourdissant et chaotique, contraste bien plus fort et évocateur du silence que le simple mot 'bruit'."
}
```

```js
{ id:"trouver-antonyme-n3-07",
  type: "match",
  instruction: "Associe chaque adjectif à son antonyme le plus précis dans le contexte littéraire.",
  pairs: [
    { left: "une attitude servile", right: "une attitude altière" },
    { left: "un discours laconique", right: "un discours prolixe" },
    { left: "une réponse ambiguë", right: "une réponse univoque" }
  ],
  feedback: "Servile (soumis) ↔ altière (fière), laconique (bref) ↔ prolixe (long, verbeux), ambiguë (plusieurs sens) ↔ univoque (un seul sens clair)."
}
```

```js
{ id:"trouver-antonyme-n3-08",
  type: "mcq",
  instruction: "L'antonyme de 'magnanime' dans un texte classique est…",
  choices: ["généreux", "mesquin", "puissant", "sage"],
  answer: "mesquin",
  feedback: "Magnanime signifie 'généreux et noble de cœur'. Son contraire est mesquin : petit, avare de sentiments."
}
```

```js
{ id:"trouver-antonyme-n3-09",
  type: "match",
  instruction: "Ce verbe a des antonymes différents selon le contexte. Associe chaque emploi à son contraire.",
  pairs: [
    { left: "tenir une promesse", right: "rompre une promesse" },
    { left: "tenir debout", right: "s'effondrer" },
    { left: "tenir bon (résister)", right: "céder" }
  ],
  feedback: "Tenir une promesse → rompre ; tenir debout → s'effondrer ; tenir bon → céder. Un même verbe a des antonymes différents selon le sens exact."
}
```

```js
{ id:"trouver-antonyme-n3-10",
  type: "mcq",
  instruction: "Dans 'Sa décision fut abrupte', l'antonyme exact de 'abrupte' (soudaine et brutale) est…",
  choices: ["rapide", "mûrement réfléchie", "silencieuse", "coûteuse"],
  answer: "mûrement réfléchie",
  feedback: "Abrupte signifie ici 'prise sans préparation, de façon brusque'. Son antonyme est 'mûrement réfléchie' : pensée longuement avant d'être prise."
}
```

## trouver-synonyme — Trouver un synonyme

### Niveau 1 (manque 5)

```js
{ id:"trouver-synonyme-n1-06",
  type: "mcq",
  instruction: "Quel est le synonyme de 'beau' ?",
  choices: ["laid", "joli", "ancien", "sale"],
  answer: "joli",
  feedback: "Beau et joli expriment tous les deux une qualité esthétique agréable. Ce sont des synonymes."
}
```

```js
{ id:"trouver-synonyme-n1-07",
  type: "mcq",
  instruction: "Quel est le synonyme de 'difficile' ?",
  choices: ["facile", "dur", "mou", "léger"],
  answer: "dur",
  feedback: "Difficile et dur signifient tous les deux 'qui demande beaucoup d'efforts'. Ce sont des synonymes dans ce contexte."
}
```

```js
{ id:"trouver-synonyme-n1-08",
  type: "match",
  instruction: "Associe chaque mot à son synonyme. Clique un mot à gauche, puis son synonyme à droite.",
  pairs: [
    { left: "malin", right: "astucieux" },
    { left: "aider", right: "secourir" },
    { left: "propre", right: "net" }
  ],
  feedback: "Malin = astucieux, aider = secourir, propre = net. Les synonymes ont un sens très proche."
}
```

```js
{ id:"trouver-synonyme-n1-09",
  type: "mcq",
  instruction: "Quel est le synonyme de 'gentil' ?",
  choices: ["méchant", "aimable", "timide", "triste"],
  answer: "aimable",
  feedback: "Gentil et aimable décrivent tous les deux une personne agréable avec les autres. Ce sont des synonymes."
}
```

```js
{ id:"trouver-synonyme-n1-10",
  type: "mcq",
  instruction: "Quel mot peut remplacer 'aimer' sans changer le sens de la phrase 'J'aime beaucoup ce gâteau' ?",
  choices: ["détester", "adorer", "oublier", "ignorer"],
  answer: "adorer",
  feedback: "Aimer beaucoup et adorer expriment tous les deux un sentiment fort d'affection ou de goût. Ce sont des synonymes."
}
```

### Niveau 2 (manque 5)

```js
{ id:"trouver-synonyme-n2-06",
  type: "mcq",
  instruction: "Pour décrire une petite pluie fine et froide, quel synonyme de 'pluie' est le plus précis ?",
  choices: ["averse", "bruine", "déluge", "orage"],
  answer: "bruine",
  feedback: "La bruine est une pluie fine, légère et pénétrante. C'est le synonyme le plus précis pour ce type de pluie, contrairement à l'averse ou au déluge, plus intenses."
}
```

```js
{ id:"trouver-synonyme-n2-07",
  type: "match",
  instruction: "Associe chaque emploi de 'regarder' au synonyme qui correspond le mieux à sa nuance.",
  pairs: [
    { left: "Elle regarde longuement le tableau.", right: "Elle contemple le tableau." },
    { left: "Il regarde discrètement par la fenêtre.", right: "Il épie par la fenêtre." },
    { left: "Le douanier regarde attentivement les bagages.", right: "Le douanier scrute les bagages." }
  ],
  feedback: "Contempler (regarder avec admiration), épier (regarder en cachette), scruter (regarder avec attention) : chaque synonyme précise une nuance différente de 'regarder'."
}
```

```js
{ id:"trouver-synonyme-n2-08",
  type: "mcq",
  instruction: "Dans la phrase 'Le client a demandé un remboursement', quel synonyme de 'demandé' convient le mieux dans un contexte commercial soutenu ?",
  choices: ["réclamé", "gueulé", "redemandé", "questionné"],
  answer: "réclamé",
  feedback: "Réclamer signifie demander avec insistance ce qui est dû. C'est le synonyme le plus adapté dans un contexte commercial ou administratif."
}
```

```js
{ id:"trouver-synonyme-n2-09",
  type: "match",
  instruction: "Associe chaque action à son synonyme le plus précis selon l'intensité indiquée.",
  pairs: [
    { left: "rire bruyamment", right: "s'esclaffer" },
    { left: "dormir légèrement", right: "somnoler" },
    { left: "toucher légèrement", right: "effleurer" }
  ],
  feedback: "S'esclaffer (rire fort), somnoler (dormir d'un sommeil léger), effleurer (toucher à peine) : ces synonymes précisent l'intensité de l'action."
}
```

```js
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
```

### Niveau 3 (manque 5)

```js
{ id:"trouver-synonyme-n3-06",
  type: "mcq",
  instruction: "Dans un texte descriptif sur l'automne, quel synonyme de 'vent' est le plus précis pour décrire un vent froid et sec ?",
  choices: ["brise", "bise", "zéphyr", "courant d'air"],
  answer: "bise",
  feedback: "La bise désigne un vent froid et sec, souvent venu du nord. Brise et zéphyr évoquent au contraire un vent léger et doux."
}
```

```js
{ id:"trouver-synonyme-n3-07",
  type: "match",
  instruction: "Associe chaque déplacement à son synonyme le plus précis dans le contexte indiqué.",
  pairs: [
    { left: "Le vieillard se déplace (péniblement, en boitant)", right: "Le vieillard clopine" },
    { left: "Les enfants jouent (avec insouciance, en sautillant)", right: "Les enfants batifolent" },
    { left: "Le chat se déplace (silencieusement, sans bruit)", right: "Le chat se faufile" }
  ],
  feedback: "Clopiner (marcher en boitant), batifoler (s'amuser avec légèreté), se faufiler (se glisser discrètement) : ces verbes précis enrichissent la description."
}
```

```js
{ id:"trouver-synonyme-n3-08",
  type: "mcq",
  instruction: "La phrase 'Il a mangé rapidement' est courante. Quel synonyme soutenu de 'mangé' convient dans un texte littéraire ?",
  choices: ["bouffé", "englouti", "grignoté", "bâfré"],
  answer: "englouti",
  feedback: "Engloutir est un synonyme soutenu de manger rapidement et complètement. 'Bouffé' et 'bâfré' sont familiers, 'grignoté' signifie au contraire manger par petites bouchées."
}
```

```js
{ id:"trouver-synonyme-n3-09",
  type: "mcq",
  instruction: "Pour décrire une réflexion profonde et prolongée, quel synonyme de 'penser' ne convient PAS ?",
  choices: ["méditer", "réfléchir intensément", "songer brièvement", "approfondir"],
  answer: "songer brièvement",
  feedback: "Songer brièvement évoque une pensée courte et légère, ce qui contredit l'idée de réflexion profonde et prolongée. Méditer, réfléchir intensément et approfondir conviennent mieux."
}
```

```js
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
```

---

# Partie 2 — data/grammaire.js (3 compétences, 1 item manquant au niveau 2)

Pour ces 3 compétences, seul le niveau 2 est en MANQUE (9/10 items). Les
niveaux 1 et 3 sont en SURPLUS (12/10) : conformément au périmètre de cette
tâche, ils ne sont pas traités ici (le chantier SURPLUS séparé porte
uniquement sur les compétences dont le **statut global** est SURPLUS ; ces
3 compétences ont un statut global MANQUE et relèvent donc uniquement de ce
rapport, sur leur seul niveau manquant).

## distinguer-phrase-simple-complexe — Distinguer phrase simple et phrase complexe

Fichier : data/grammaire.js

### Niveau 2 (manque 1)

```js
{ id:"distinguer-phrase-simple-complexe-n2-10",
  instruction: "Identifie le(s) verbe(s) conjugué(s), puis classe la phrase.",
  sentence: "Théo range sa chambre puis il descend goûter.",
  step1Instruction: "Clique sur le(s) verbe(s) conjugué(s).",
  step1Targets: ["range", "descend"],
  step2Instruction: "Cette phrase est-elle simple ou complexe ?",
  classifyChoices: ["simple", "complexe"],
  step2Answer: "complexe"
}
```

Justification : niveau 2 actuellement composé de 5 phrases « simple » et 4
« complexe » (n2-01 à n2-09) ; l'item proposé est « complexe » pour
rééquilibrer à 5/5, avec deux verbes conjugués reliés par « puis » (cas non
encore couvert par la banque existante, qui utilise déjà et/mais/parce
que/quand pour les autres exemples complexes).

## identifier-subordination — Distinguer la juxtaposition de la subordination

Fichier : data/grammaire.js

### Niveau 2 (manque 1)

```js
{ id:"identifier-subordination-n2-10",
  instruction: "Clique sur le mot ou la ponctuation qui relie les deux propositions.",
  partA: "Le réveil sonne", partB: "Léo se lève aussitôt", link: ",", linkType: "juxtaposition"
}
```

Justification : niveau 2 actuellement composé de 5 items « subordination »
(n2-01 à n2-05) et 4 « juxtaposition » (n2-06 à n2-09) ; l'item proposé est
une juxtaposition par virgule pour rééquilibrer à 5/5, cohérent avec les
exemples juxtaposition déjà présents (n2-06, n2-08) qui utilisent aussi la
virgule seule.

## distinguer-coordination-subordination — Distinguer la coordination de la subordination

Fichier : data/grammaire.js

### Niveau 2 (manque 1)

```js
{ id:"distinguer-coordination-subordination-n2-10",
  instruction: "Clique sur le mot (ou les mots) qui relient les deux propositions.",
  partA: "Le chat dort", partB: "le chien surveille la maison", link: "et", linkType: "coordination"
}
```

Justification : niveau 2 actuellement composé de 5 items « subordination »
(n2-01 à n2-05) et 4 « coordination » (n2-06 à n2-09) ; l'item proposé est
une coordination avec « et », conjonction pas encore utilisée à ce niveau
(déjà présente au niveau 1 mais absente du niveau 2), pour rééquilibrer à
5/5 sans dupliquer les connecteurs donc/mais/ou/or déjà présents.

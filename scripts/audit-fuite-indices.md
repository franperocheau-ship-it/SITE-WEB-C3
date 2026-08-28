# Audit — fuite d'indices dans les 243 items du commit 2ab4cb2

Scan en lecture seule des 243 items intégrés le 24/08/2026 (240 dans
`data/vocabulaire.js` sur 16 compétences, 3 dans `data/grammaire.js`), à la
recherche du même défaut que celui trouvé sur `polysemie` niveau 1 :
numérotation de l'énoncé qui correspond à un choix, distracteurs qui
s'auto-décrivent, ou mot/nombre de la question répété littéralement dans une
seule option.

**Méthode** : script Node (`scan-leaks.js`, jetable) chargeant les deux
fichiers de données, filtrant les items dont l'`id` apparaît dans le diff du
commit 2ab4cb2, et appliquant 4 heuristiques automatiques (énumération
numérotée, parenthèses asymétriques, formulation auto-descriptive "un seul
sens/type", réponse démesurément plus longue que les distracteurs, mot cité
entre guillemets répété dans une seule option). 27 candidats détectés,
revus un par un manuellement — la majorité sont des faux positifs (question
de type "lequel est absurde parmi les 4" où la réponse est volontairement la
plus développée, ou parenthèses symétriques sur les options plausibles). Le
détail ci-dessous ne garde que ce qui survit à la relecture manuelle.

Les 3 items de `data/grammaire.js` (`distinguer-phrase-simple-complexe-n2-10`,
`identifier-subordination-n2-10`, `distinguer-coordination-subordination-n2-10`)
sont de type clic/classification (pas de `choices`) — aucune fuite possible
sur ce format, rien à signaler.

---

## 🔴 Confirmé — même défaut que polysémie n1-05/n1-09

### `ordre-alphabetique-n1-10` (level1Bank, [data/vocabulaire.js:107](data/vocabulaire.js#L107))
> Instruction : *"Pour savoir si 'jardin' vient avant ou après 'lampe' dans le
> dictionnaire, que dois-tu comparer ?"*
> Choix : `le nombre de syllabes` / **`la première lettre de chaque mot (J et L)`**
> / `la dernière lettre de chaque mot` / `le sens des deux mots`

**Problème** : la bonne réponse est la seule option entre parenthèses, et ces
parenthèses reprennent littéralement les initiales des deux mots donnés dans
l'énoncé ("(J et L)" ← jardin/lampe). Un élève repère l'option qui "colle" à
l'exemple sans avoir besoin de savoir ce qu'est l'ordre alphabétique.

**Piste de correction** : retirer le "(J et L)" — l'option reste
compréhensible seule ("la première lettre de chaque mot"), ou bien ajouter un
niveau de détail symétrique aux 3 distracteurs.

### `regrouper-par-theme-n3-07` (level3Bank, [data/vocabulaire.js:4027](data/vocabulaire.js#L4027))
> Instruction : *"Quel mot peut appartenir à deux thèmes différents selon le
> contexte ?"*
> Choix : **`feuille (l'arbre / le papier)`** / `tronc` / `écorce` / `branche`

**Problème** : identique au bug original — 3 distracteurs sont des mots nus,
la bonne réponse est la seule à afficher deux sens entre parenthèses. Il
suffit de repérer la seule option qui contient un "/" pour répondre, sans
connaître le mot.

**Piste de correction** : retirer la parenthèse ("feuille" seul), quitte à
perdre en clarté immédiate — le feedback post-réponse peut expliciter les deux
sens.

---

## 🟡 Modéré — la bonne réponse est la seule option glosée/citée entre parenthèses

Ce sont des questions "pourquoi ce mot/cette règle…" où seule la bonne réponse
porte une parenthèse explicative ou une citation, alors que les distracteurs
sont de simples affirmations nues. Le contenu de la parenthèse est
pédagogiquement pertinent (ce n'est pas une fuite aussi flagrante que les deux
ci-dessus), mais la présence systématique de la parenthèse uniquement sur la
bonne réponse crée un raccourci repérable ("l'option la plus détaillée/citée
est la bonne") sans nécessiter la connaissance testée.

- **`identifier-homonyme-n3-08`** ([data/vocabulaire.js:1097](data/vocabulaire.js#L1097))
  Instruction : *"Dans « Le foie du canard est cuit », combien de mots ont un
  homophone ?"* → réponse **`1 : foie (fois/foi)`** seule à citer les
  homophones entre parenthèses, vs `Aucun` / `2 : foie et canard` / `3 : foie,
  canard et cuit`.

- **`identifier-homonyme-n3-09`** ([data/vocabulaire.js:1104](data/vocabulaire.js#L1104))
  Instruction : *"Quelle stratégie permet de ne PAS confondre 'plus tôt' et
  'plutôt' ?"* → réponse **`Plus tôt s'oppose à 'plus tard' (notion de temps) ;
  plutôt signifie 'de préférence'`**, nettement plus longue (83 caractères) et
  seule à reprendre littéralement "plus tôt" de l'énoncé, vs 3 distracteurs
  courts (~42 caractères en moyenne) qui ne citent aucun des deux mots.

- **`famille-de-mots-n3-06`** ([data/vocabulaire.js:2139](data/vocabulaire.js#L2139))
  Instruction : *"Les mots « cœur » et « courage » appartiennent-ils à la même
  famille ?"* → réponse **`Oui, tous deux viennent du latin « cor/cordis » (le
  cœur)`**, seule option avec citation latine, vs 3 distracteurs nus.

- **`famille-de-mots-n3-10`** ([data/vocabulaire.js:2182](data/vocabulaire.js#L2182))
  Même structure : réponse **`Car tous deux contiennent le radical grec «
  bios » (la vie)`** seule à citer une racine, vs distracteurs nus.

- **`origine-mots-n3-08`** ([data/vocabulaire.js:3672](data/vocabulaire.js#L3672))
  Instruction distingue "andro-" (homme) et "anthropo-" (être humain).
  Réponse : **`Un robot qui ressemble spécifiquement à un homme (et non à une
  femme)`**. Ici la question est plutôt bien conçue (le distracteur n°1 est le
  piège "intuitif" attendu), mais la parenthèse reste un indice structurel
  récurrent du même type que les 4 items ci-dessus.

**Piste de correction commune** : neutraliser l'asymétrie en ajoutant une
courte justification (même brève, même fausse) aux distracteurs, plutôt que de
les laisser en simples négations sèches — ou retirer la parenthèse de la bonne
réponse et déplacer l'explication dans le champ `feedback`.

---

## ⚪ Observation basse priorité — asymétrie de longueur

Une dizaine d'items "pourquoi…"/"quel est l'équivalent…" ont une bonne réponse
sensiblement plus longue que les distracteurs (`niveaux-de-langue-n2-08`,
`niveaux-de-langue-n2-10`, `niveaux-de-langue-n3-07`, `niveaux-de-langue-n3-09`,
`champ-lexical-n2-08`, `sens-propre-figure-n3-09`, `polysemie-n2-09`,
`polysemie-n2-10`, `identifier-suffixe-n2-09`, `famille-de-mots-n2-09`). Dans
tous les cas examinés, l'écart de longueur vient du fait que la bonne réponse
doit exposer une nuance réelle (registre soutenu, sens figuré, étymologie)
alors que les distracteurs sont des négations/absurdités courtes — c'est un
style d'écriture cohérent avec le reste de la banque, pas une fuite
structurelle comparable aux deux premières catégories. Sans action requise à
ce stade ; mentionné pour information si un futur audit de style veut
harmoniser la longueur des choix.

---

## Items vérifiés et jugés sains malgré un signal du script
`trouver-synonyme-n2-10` (distracteur absurde volontaire "couleur du stylo"),
`identifier-homonyme-n2-07` (parenthèses symétriques sur 3 choix plausibles),
`sens-propre-figure-n1-08` et `sens-propre-figure-n3-07` (parenthèses
symétriques sur les deux options sérieuses, distracteurs faibles nus),
`mot-derive-n1-07` et `mot-derive-n2-07` (parenthèses sur un distracteur, pas
sur la réponse), `polysemie-n3-06` (énumération numérotée utilisée comme
mini-glossaire avant une vraie question de mise en contexte, format déjà
validé sur les items sains de niveau 1).

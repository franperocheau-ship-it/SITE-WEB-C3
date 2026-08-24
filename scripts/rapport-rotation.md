# Rapport — Rotation des banques SURPLUS

Périmètre : les 18 compétences au statut **SURPLUS** dans
`scripts/audit-modele-standard.md` (banque > 10 items sur au moins un
niveau, moteur standard `level1Bank`/`level2Bank`/`level3Bank`). Les
compétences en STRUCTURE ANORMALE ne sont pas traitées ici.

Fichier modifié : **`exercise.html`** uniquement (le moteur d'exercice est
inline dans ce fichier — il n'existe pas de `js/exercise-engine.js` dans ce
dépôt). Aucun fichier `data/*.js` n'a été touché.

## 1. Comportement constaté avant correctif

Les 18 compétences SURPLUS se répartissent sur **6 chemins de code**
différents dans `exercise.html`, un par valeur de `type` :

| Type | Fonction de sélection | Comportement avant correctif |
|---|---|---|
| `homophones-niveaux` (13 compétences) | `showHomoLevelSelect()` → `loadLevel()` | **Aucun tirage.** `questions = doShuffle[i] ? shuffle([...bank]) : [...bank]` — sert **la banque entière**, mélangée ou non selon `homoShuffle[i]`, jamais réduite à 10. Une banque de 22 items affichait 22 questions à l'élève. |
| `identifier-juxtaposition-niveaux` (1) | `ijInitSession()` → `ijStartLevel()` | **Aucun tirage.** `items = shuffle([...bank])` — sert la banque entière mélangée, jamais réduite à 10. |
| `pc-avoir-niveaux` (1) | `pcaInitSession()` → `pcaStartLevel()` | Déjà correct : `pcaShuffle([...bank]).slice(0, n)` avec `n = questionsPerSession \|\| 10` — tirage aléatoire de 10 à **chaque** appel de `pcaStartLevel` (donc à chaque tentative), mais sans mémoire de la tentative précédente (le même lot de 10 pouvait retomber par hasard). |
| `etre-ou-avoir-niveaux` (1) | `eoaInitSession()` → `eoaStartLevel()` | Même mécanique que ci-dessus, mais `n = questionsPerSession \|\| bank.length` et **`questionsPerSession: 12`** dans `data/conjugaison.js` → sert 12 items par tentative, pas 10 (voir §3, hors périmètre de ce correctif). |
| `pc-etre-niveaux` (1) | `pceInitSession()` → `pceStartLevel()` | Déjà correct, identique à `pc-avoir-niveaux` (`questionsPerSession: 10`). |
| `accord-cod-niveaux` (1) | `apcInitSession()` → `apcStartLevel()` | Déjà correct, identique à `pc-avoir-niveaux` (`questionsPerSession: 10`). |

**Constat clé** : 14 des 18 compétences SURPLUS (les 13 `homophones-niveaux`
+ `identifier-juxtaposition`) présentaient donc un vrai bug — l'élève voyait
systématiquement **plus de 10 questions** (jusqu'à 22 pour certains
homophones), jamais de rotation. Les 4 autres (`pc-avoir`, `etre-ou-avoir`,
`pc-etre`, `accord-cod`) tiraient déjà 10 items au hasard à chaque
tentative, via 4 implémentations quasi identiques (`apcShuffle`,
`pcaShuffle`, `eoaShuffle`, `pceShuffle` — même Fisher-Yates dupliqué 4
fois), mais sans anti-répétition du lot précédent.

## 2. Correctif appliqué

Ajout d'une fonction centralisée **`pickRotatedItems(bank, rotationKey, n, opts)`**
juste après l'utilitaire `shuffle()` existant (`exercise.html`, ~ligne 4848) :

- **`bank.length <= n`** → sert la banque telle quelle (ou mélangée si
  `opts.alwaysShuffleOrder`, pour ne rien changer au comportement des
  appelants qui mélangeaient déjà inconditionnellement). **Aucun tirage** :
  les compétences déjà à effectif exact (OK) ne sont pas affectées.
- **`bank.length > n`** → tire `n` items au hasard. Mémorise les IDs servis
  dans `sessionStorage['examRotation:<rotationKey>']` ; au tirage suivant,
  exclut ce lot exact s'il reste assez d'items en dehors (sinon retombe sur
  un tirage simple dans la banque entière, comme demandé).

Appliquée aux **6 points d'appel** :

| Fonction | Avant | Après |
|---|---|---|
| `loadLevel()` (homophones-niveaux) | `doShuffle[i] ? shuffle([...bank]) : [...bank]` | `pickRotatedItems(bank, slug+':homo:'+lv, n)` puis même bascule `doShuffle[i] ? shuffle(selected) : selected` — `n = questionsPerSession \|\| 10` |
| `ijStartLevel()` | `shuffle([...bank])` | `pickRotatedItems(bank, slug+':ij:'+lv, n, {alwaysShuffleOrder:true})` |
| `apcStartLevel()` | `apcShuffle([...bank]).slice(0, n)` | `pickRotatedItems(bank, slug+':apc:'+lv, n, {alwaysShuffleOrder:true})` |
| `pcaStartLevel()` | `pcaShuffle([...bank]).slice(0, n)` | `pickRotatedItems(bank, slug+':pca:'+lv, n, {alwaysShuffleOrder:true})` |
| `eoaStartLevel()` | `eoaShuffle([...bank]).slice(0, n)` | `pickRotatedItems(bank, slug+':eoa:'+lv, n, {alwaysShuffleOrder:true})` |
| `pceStartLevel()` | `pceShuffle([...bank]).slice(0, n)` | `pickRotatedItems(bank, slug+':pce:'+lv, n, {alwaysShuffleOrder:true})` |

`rotationKey` inclut le `slug` de l'exercice (déjà lu depuis l'URL dans
chacune de ces fonctions) et le niveau, pour isoler la mémoire de rotation
par compétence et par niveau dans le même onglet.

## 3. Détail par compétence SURPLUS

| Compétence | Fichier | Type | Niveaux (avant → servi après) |
|---|---|---|---|
| ortho-distinguer-a-a | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 22→10, N3 16→10 |
| ortho-distinguer-ce-se | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 22→10, N3 16→10 |
| ortho-distinguer-et-est | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 22→10, N3 16→10 |
| ortho-distinguer-on-ont | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 22→10, N3 16→10 |
| ortho-distinguer-ou-ou | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 22→10, N3 16→10 |
| ortho-distinguer-son-sont | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 22→10, N3 16→10 |
| ortho-distinguer-leur-leurs | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 20→10, N3 16→10 |
| ortho-distinguer-tout-tous-toute-toutes | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 12→10, N3 22→10 |
| ortho-distinguer-ces-ses-cest-sest | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 12→10, N3 20→10 |
| ortho-distinguer-quel-quelle-quels-quelles | data/orthographe-homophones.js | homophones-niveaux | N1 12→10, N2 12→10, N3 18→10 |
| identifier-nom-phrase | data/grammaire.js | homophones-niveaux | N1 14→10, N2 10 (inchangé), N3 10 (inchangé) |
| identifier-adjectif | data/grammaire.js | homophones-niveaux | N1 12→10, N2 10 (inchangé), N3 10 (inchangé) |
| identifier-verbe-conjugue | data/grammaire.js | homophones-niveaux | N1 12→10, N2 10 (inchangé), N3 10 (inchangé) |
| identifier-juxtaposition | data/grammaire.js | identifier-juxtaposition-niveaux | N1 12→10, N2 10 (inchangé), N3 12→10 |
| conjuguer-passe-compose-avoir | data/conjugaison.js | pc-avoir-niveaux | N1 14, N2 15, N3 14 → déjà 10 servis, rotation renforcée (anti-répétition ajoutée) |
| ortho-accorder-participe-passe-cod | data/orthographe.js | accord-cod-niveaux | N1 10, N2 10, N3 12 → déjà 10 servis, rotation renforcée |
| ortho-accorder-participe-passe-etre | data/orthographe.js | pc-etre-niveaux | N1 10, N2 10, N3 12 → déjà 10 servis, rotation renforcée |
| etre-ou-avoir | data/conjugaison.js | etre-ou-avoir-niveaux | voir §4 — sert 12, pas 10 (donnée, hors périmètre code) |

## 4. Anomalie hors périmètre : `etre-ou-avoir`

`data/conjugaison.js` définit `questionsPerSession: 12` pour la compétence
`etre-ou-avoir`. Le code (`eoaStartLevel`) applique fidèlement cette valeur
(`n = questionsPerSession || bank.length`) : l'élève reçoit **12** questions
par tentative, pas 10, quel que soit le correctif de rotation. C'est une
valeur de configuration dans `data/conjugaison.js`, pas un comportement de
`exercise.html` — je n'y ai pas touché (hors périmètre : lecture seule sur
`data/*.js` dans cette tâche). **À votre arbitrage** : ramener
`questionsPerSession` à 10 dans un chantier séparé si la norme doit
s'appliquer strictement ici aussi.

## 5. Points d'arbitrage / choix faits sans vous solliciter

- **Ordre du lot tiré (SURPLUS uniquement)** : pour `homophones-niveaux`,
  quand un niveau a `homoShuffle[i] = false` (ordre pédagogique figé voulu
  par l'auteur du contenu) et que sa banque est en SURPLUS, le lot de 10
  tiré par `pickRotatedItems` est composé au hasard mais je n'ai **pas**
  cherché à retrier ces 10 items dans leur ordre d'origine dans la banque —
  ils gardent l'ordre issu du tirage aléatoire (`shuffle(pool).slice(...)`
  interne à `pickRotatedItems`). Avec un tirage variable d'une tentative à
  l'autre, une progression pédagogique fixe sur l'ensemble de la banque
  n'a plus vraiment de sens dès qu'on n'en sert qu'un sous-ensemble tournant
  — mais si vous préfériez qu'un ordre relatif soit préservé pour ces
  niveaux précis, c'est un ajustement simple à faire dans `loadLevel()`.
- **`pcaShuffle` et `eoaShuffle`** : ces deux fonctions (Fisher-Yates
  dupliquées) ne sont plus appelées après le correctif — je ne les ai
  **pas supprimées** (risque de casse nul à les laisser, périmètre de la
  tâche centré sur la sélection d'items). `apcShuffle` et `pceShuffle`
  restent utilisées ailleurs (mélange des choix de QCM) et n'ont pas bougé.
- **Clé de rotation** : basée sur `slug` (déjà lu depuis l'URL dans chaque
  fonction concernée) + niveau. Une même compétence ouverte dans deux onglets
  différents a donc des mémoires de rotation indépendantes (sessionStorage
  est par onglet) — comportement jugé acceptable, à confirmer si vous
  voulez un partage inter-onglets (nécessiterait `localStorage`).

## 6. Tests effectués

### a) Harness Node (logique pure, données réelles)

Le vrai code de `shuffle()` et `pickRotatedItems()` a été extrait tel quel
depuis `exercise.html` (pas réimplémenté) et exécuté dans un `vm` Node avec
un shim `sessionStorage`, contre les vraies banques de `data/*.js` (chargées
via le même chargeur `vm` que `scripts/audit-questions.js`).

Compétences testées :
- **SURPLUS** : `identifier-adjectif` (homophones-niveaux, N1 12→10),
  `ortho-distinguer-a-a` (homophones-niveaux, N2 22→10 et N3 16→10, 5
  tentatives consécutives), `identifier-juxtaposition`
  (identifier-juxtaposition-niveaux, N1 et N3), `conjuguer-passe-compose-avoir`
  (pc-avoir-niveaux, N1 14→10).
- **Anomalie connue** : `etre-ou-avoir` (confirme que 12 items sont bien
  servis, cf. §4).
- **Non-régression (OK, 10/10/10)** : `identifier-adverbe`,
  `identifier-complement-nom`, `distinguer-attribut-sujet-complement-objet`
  — vérifié que `pickRotatedItems` renvoie exactement la banque, **dans le
  même ordre, sans aucun tirage**.

Résultat : **31/31 assertions passées** (longueur exacte servie, absence de
répétition exacte du lot précédent quand la banque le permet, non-régression
bit-à-bit sur les compétences à effectif exact).

### b) Test navigateur réel (Playwright, Chromium)

Site servi localement (`python3 -m http.server`), Chromium piloté en tête
sur `exercise.html?slug=<id>`, clic sur la carte du niveau 1, lecture de
`#q-total` (nombre de questions affiché à l'élève) + capture de toute erreur
JS (`pageerror`/`console.error`).

| Compétence | Niveau 1 avant | q-total observé après clic | Erreurs JS |
|---|---|---|---|
| identifier-adjectif (SURPLUS) | 12 | **10** | aucune |
| ortho-distinguer-a-a (SURPLUS) | 12 | **10** | aucune |
| conjuguer-passe-compose-avoir (SURPLUS) | 14 | **10** | aucune |
| identifier-juxtaposition (SURPLUS) | 12 | **10** | aucune |
| identifier-adverbe (OK) | 10 | **10** | aucune |
| distinguer-attribut-sujet-complement-objet (OK) | 10 | **10** | aucune |

Aucune régression détectée sur les compétences déjà à effectif exact ; les
4 compétences SURPLUS testées servent désormais bien 10 questions.

Rien n'a été committé.

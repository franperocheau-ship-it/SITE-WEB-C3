# Audit des 10 pages homophones — lecture seule, aucune modification

Périmètre : `ortho-distinguer-a-a.html`, `ortho-distinguer-ce-se.html`, `ortho-distinguer-ces-ses-cest-sest.html`, `ortho-distinguer-et-est.html`, `ortho-distinguer-leur-leurs.html`, `ortho-distinguer-on-ont.html`, `ortho-distinguer-ou-ou.html`, `ortho-distinguer-quel-quelle-quels-quelles.html`, `ortho-distinguer-son-sont.html`, `ortho-distinguer-tout-tous-toute-toutes.html`.

Contexte : ces 10 pages sont des pages autonomes (hand-rolled), antérieures au moteur partagé `exercise.html` + `js/level-select.js` (cf. diagnostic précédent). Cet audit évalue, compétence par compétence, ce qu'il faudrait pour les faire passer sur le moteur standard.

---

## Sommaire — compatibilité par compétence

Aucune des 10 pages n'est directement compatible telle quelle : **toutes** utilisent un slug Supabase avec le niveau intégré (`ortho-<slug>-n1/n2/n3`) au lieu du slug nu + colonne `level` du standard — une migration de données est donc nécessaire dans tous les cas (voir Constat transverse n°1). Le tableau ci-dessous classe les compétences selon l'ampleur du travail **au-delà** de cette migration de données commune.

| # | Compétence | Slug généré | Types d'interaction (N1→N3) | Verdict |
|---|---|---|---|---|
| 1 | à / a | `ortho-a-a-n{1,2,3}` | choix-étiquette → mots-cliquables + classification-clic → texte à trous + libre | **Traitement particulier** — 2 des 5 sous-types (texte à trous, production libre) n'existent pas dans le moteur standard |
| 2 | ce / se | `ortho-ce-se-n{1,2,3}` | idem #1 | **Traitement particulier** (idem #1) |
| 3 | ces / ses / c'est / s'est | `ortho-ces-ses-n{1,2,3}` ⚠️ *(pas `-cest-sest`, voir constat n°2)* | choix-étiquette partout, y compris un pattern « double blanc » en N3 | **Traitement particulier plus léger** — 100% QCM (proche du standard), mais double-blanc non standard + décalage slug/nom de fichier + logique à 3 règles combinées |
| 4 | et / est | `ortho-et-est-n{1,2,3}` | idem #1 | **Traitement particulier** (idem #1) |
| 5 | leur / leurs | `ortho-leur-leurs-n{1,2,3}` | idem #1, + taxonomie grammaticale à 3 branches (`wtype`) | **Traitement particulier, le plus lourd** — mêmes types non standards que #1, plus un modèle de données plus riche (déterminant sing./plur./pronom) |
| 6 | on / ont | `ortho-on-ont-n{1,2,3}` | idem #1 | **Traitement particulier** (idem #1) |
| 7 | ou / où | `ortho-ou-ou-n{1,2,3}` | idem #1 | **Traitement particulier** (idem #1) |
| 8 | quel(le)(s) / qu'elle(s) | `ortho-quel-n{1,2,3}` ⚠️ *(pas `-quel-quelle-quels-quelles`)* | choix-étiquette partout + double blanc en N3 | **Traitement particulier plus léger** — 100% QCM, mais accord genre/nombre à modéliser + double-blanc + `category` non standard (`'Orthographe — Homophones grammaticaux'`) |
| 9 | son / sont | `ortho-son-sont-n{1,2,3}` | idem #1 | **Traitement particulier** (idem #1) + **bug latent** : `EXERCISE_DATA` absent du fichier (aucune des 4 autres pages de la même famille n'a cette lacune) |
| 10 | tout / tous / toute / toutes | `ortho-tout-n{1,2,3}` ⚠️ *(pas `-tout-tous-toute-toutes`)* | choix-étiquette partout + double blanc en N3 | **Traitement particulier, cas le plus complexe côté grammaire** — accord + valeur adverbiale invariable avec exception (« tout » devant adjectif féminin commençant par consonne) ; double-blanc ; slug/nom mismatch ; `category` non standard |

**Deux familles architecturales se dégagent**, chacune nécessitant un traitement différent :
- **Famille A** (7 fichiers : à/a, ce/se, et/est, leur/leurs, on/ont, ou/où, son/sont) : 5 sous-types par page (choix-étiquette, mots-cliquables, classification-par-clic, texte-à-trous, production libre). Seuls les 2 premiers correspondent à des types standards du site.
- **Famille B** (3 fichiers : ces/ses/c'est/s'est, quel(le)(s), tout/tous/toute/toutes) : 100% QCM/choix-étiquette, y compris un pattern « double blanc » (deux QCM validés ensemble) propre à cette famille. Plus proche du standard côté interaction, mais porte la logique grammaticale la plus dense (accords, exceptions).

---

## Constats transverses

### 1. Slug Supabase — toutes les pages nécessitent une migration de données, à l'image du cas Vocabulaire

Convention standard confirmée dans `exercise.html` (ex. lignes 6522-6527, 10479-10484, 10939-10942...) : `saveExerciseResult({ exerciseSlug: slug, ..., level: 'Niveau N' })` — **slug nu**, niveau dans une colonne séparée.

Les 10 pages homophones utilisent toutes `exerciseSlug: \`ortho-${ORTHO_SLUG}-n${lv}\`` (ex. `ortho-distinguer-et-est.html:1393`, et l'équivalent dans les 9 autres fichiers) : **le niveau est intégré au slug**, donc chaque niveau d'un même exercice génère 3 lignes Supabase sous 3 slugs différents et non reliés entre eux (`ortho-et-est-n1`, `ortho-et-est-n2`, `ortho-et-est-n3` au lieu de `ortho-et-est` + `level`).

J'ai vérifié que ce **même anti-pattern existe déjà et est toujours actif aujourd'hui** dans `français-lexique.html:1732` : `exerciseSlug: \`lex-${slug}-n${num}\`` (avec en plus un champ `level: 'Niveau ${num}'` redondant, jamais exploité comme clé). Aucun fichier SQL de migration touchant `exercise_results`/slugs `lex-*` n'existe dans le dépôt (`supabase/migrations/` ne contient que jogging, dictées, RLS, `get_class_level_for_student`). Donc soit cette migration a été faite directement en base sans script versionné, soit le cas Vocabulaire n'a en réalité jamais été corrigé lui non plus — à vérifier côté Supabase avant de decider de la stratégie pour les homophones (le pattern à reproduire ou au contraire à ne pas reproduire).

**Complication additionnelle propre aux homophones** : la logique de déverrouillage de niveau (`loadOrthoUnlocks()`, présente identiquement dans les 10 fichiers) *dépend* de ce format de slug — elle fait `.like('exercise_slug', 'ortho-${ORTHO_SLUG}-n%')` puis extrait le numéro de niveau via regex `/-n([123])$/` sur le slug retourné. Une migration vers slug nu + colonne `level` doit donc aussi réécrire cette logique de déverrouillage (pas seulement les futurs inserts), sous peine de casser la persistance des niveaux validés pour tous les élèves ayant déjà des résultats enregistrés sous l'ancien format.

### 2. Décalage slug / nom de fichier sur 3 des 10 pages

`ortho-distinguer-ces-ses-cest-sest.html` → `ORTHO_SLUG = 'ces-ses'` (pas `ces-ses-cest-sest`).
`ortho-distinguer-quel-quelle-quels-quelles.html` → `ORTHO_SLUG = 'quel'` (pas le nom complet).
`ortho-distinguer-tout-tous-toute-toutes.html` → `ORTHO_SLUG = 'tout'` (pas le nom complet).

Ces slugs tronqués risquent d'entrer en collision si une compétence future (ex. un exercice séparé sur seulement « ces/ses ») utilisait le même slug court. À trancher explicitement lors de la migration (garder le slug court en le réservant définitivement, ou le renommer — auquel cas migration de données obligatoire y compris sur ce point).

### 3. Types d'interaction absents du moteur standard

Le moteur standard (`exercise.html`) supporte 4 types : mots-cliquables, choix-étiquette, glisser-déposer, classification-étapes. Les pages homophones utilisent en réalité **6 patterns distincts** :
- **choix-étiquette** ✅ standard — présent partout (N1 de toutes les pages, tout le contenu des pages Famille B).
- **mots-cliquables** ✅ standard — présent en N2 des 7 pages Famille A.
- **classification par clic** ⚠️ partiellement standard — présent en N2 des 7 pages Famille A, mais implémenté en clic-sélection + clic-colonne, **sans aucun vrai drag & drop HTML5** (aucun `draggable`, aucun `dragstart`/`drop`). Si le composant standard `classification-étapes` attend un vrai glisser-déposer, il y a un choix d'UX à trancher (garder le clic, ou réimplémenter en drag&drop).
- **texte à trous** ❌ non standard — présent en N3 des 7 pages Famille A (saisie clavier libre dans un `<input>`, comparaison stricte après `trim().toLowerCase()`, **aucune tolérance d'accent ni de casse**).
- **production libre** ❌ non standard — présent en N3 des 7 pages Famille A (`<textarea>`, validation par simple présence des deux mots homophones via regex, **aucune vérification grammaticale réelle**).
- **double-blanc (2 QCM liés)** ❌ non standard — présent en N3 des 3 pages Famille B (2 groupes de boutons indépendants + un bouton « Vérifier » commun).

Migrer les 7 pages de la Famille A sans perte de contenu suppose donc soit d'étendre le moteur standard avec 2 nouveaux types (texte à trous, production libre), soit de renoncer à ces sous-types pédagogiques lors de la migration.

### 4. Logique métier spécifique aux homophones — pas d'équivalent ailleurs sur le site

Chaque page encode une règle de substitution grammaticale propre, non générique et non réutilisable telle quelle par un moteur générique à base de simples listes de bonnes réponses :
- à/a : test « avait » ; ce/se : test « me/te » ; et/est : test « était » (+ « et puis ») ; on/ont : test « avaient »/« il » ; ou/où : test « ou bien » ; son/sont : test à deux étapes « étaient » puis « mon/ton ».
- leur/leurs : taxonomie à 3 branches (déterminant singulier / déterminant pluriel / pronom invariable), champ `wtype` dédié par item.
- ces/ses/c'est/s'est : 3 règles combinables dans une même phrase à 2 blancs (singularisation ce/cette vs son/sa ; « cela est » vs pronominal ; personne du verbe savoir).
- quel(le)(s)/qu'elle(s) : accord genre/nombre en tant qu'adjectif + test de substitution « qu'il/qu'ils » pour distinguer de la conjonction+pronom.
- tout/tous/toute/toutes : accord standard **+ règle adverbiale exceptionnelle** (« tout » invariable sauf devant adjectif féminin à initiale consonne/h aspiré → « toute »/« toutes »), seule page du corpus avec une exception grammaticale à ce point contextuelle.

Ces règles vivent uniquement dans les champs de données par item (`testPhrase`, `wtype`, `nom/genre/nombre`, `adverbe/adjGenre`...) et dans les fonctions d'explication (`avaitExpl`, `ceseExpl`, `explainOk/explainErr`, etc.) propres à chaque fichier — rien de comparable n'existe dans `data/orthographe.js` ni dans les autres compétences du site.

### 5. Incohérences mineures entre les 10 fichiers (à corriger ou à absorber pendant la migration)

- **Sensibilité à la casse du tokenizer** : `à/a`, `et/est` sont sensibles à la casse (un « A »/« Et » en début de phrase n'est pas détecté comme mot cliquable) ; `ce/se`, `on/ont`, `son/sont` sont insensibles à la casse ; `ou/où` n'est ni l'un ni l'autre de façon cohérente (comparaison sensible à la casse mais regex de production libre insensible).
- **Déclaration `EXERCISE_DATA`** : `à/a`, `et/est`, `on/ont`, `ou/où` utilisent `const EXERCISE_DATA = {...}` ; `quel`, `tout` utilisent le pattern défensif `window.EXERCISE_DATA = window.EXERCISE_DATA || {}` ; **`son/sont` n'en déclare aucune** (probable oubli, à vérifier — impact possible sur le titre affiché par `results.js`).
- **`category` Supabase** : `à/a`, `ce/se`, `et/est`, `leur/leurs`, `on/ont`, `ou/où`, `son/sont` envoient `category: 'Orthographe'` ; `quel` et `tout` envoient `category: 'Orthographe — Homophones grammaticaux'` — deux valeurs différentes pour une même famille pédagogique.
- **Aucune tolérance orthographique nulle part** : toutes les comparaisons texte-à-trous sont des égalités strictes post `trim()+toLowerCase()`, sans normalisation Unicode/accents — contrairement à ce que pourrait faire un moteur standard plus tolérant.

---

## Détail par compétence

### 1. à / a — `ortho-distinguer-a-a.html`
1. **Questions** : 5 tableaux JS (`N1`, `N2_MC`, `N2_CL`, `N3_FI`, `N3_PL`, lignes 676-776). Exemple N1 (:677) : `{ phrase:"Il ___ mangé toute la tarte.", answer:"a", testPhrase:"avait mangé", testOk:true }`.
2. **Items/niveau** : N1=12 ; N2=10(mots-cliquables)+12(2×6 classification)=22 mélangés ; N3=12(texte à trous)+4(libre)=16.
3. **Correction** : `===` strict sur `trim().toLowerCase()` pour les blancs, **sensible à l'accent** (« à » doit être tapé avec accent). Production libre : détection par regex de présence des deux formes.
4. **Interaction** : choix-étiquette (std) / mots-cliquables (std) / classification par clic (semi-std, pas de drag&drop) / texte à trous (non std) / production libre (non std).
5. **Métier** : test « avait » (verbe avoir) vs non-remplaçable (préposition). `tokenize()` sensible à la casse (:803-809).
6. **Slug** : `ORTHO_SLUG='a-a'` (:578) → `ortho-a-a-n1/n2/n3`.

### 2. ce / se — `ortho-distinguer-ce-se.html`
1. **Questions** : mêmes 5 tableaux (:674-795). Exemple (:675) : `{ phrase:"Il ___ lave les mains avant de manger.", answer:"se", testPhrase:"me lave", testOk:true }`.
2. **Items/niveau** : N1=12 ; N2=22 mélangés ; N3=16.
3. **Correction** : identique à #1. Production libre avec `\bce\b`/`\bse\b` + `/i` (:1340-1341).
4. **Interaction** : identique à #1.
5. **Métier** : test « me/te » (pronom réfléchi) vs « cela » (démonstratif). `tokenize()` **insensible** à la casse (:821-828) — incohérence avec #1.
6. **Slug** : `ORTHO_SLUG='ce-se'` (:573) → `ortho-ce-se-n1/n2/n3`.

### 3. ces / ses / c'est / s'est — `ortho-distinguer-ces-ses-cest-sest.html`
1. **Questions** : 3 tableaux (`N1` ces/ses, `N2` c'est/s'est, `N3` 6 formes mélangées avec 1 ou 2 blancs, :563-661) + objet `FB` de feedback par forme exacte (:529-554). Pas de `testPhrase`.
2. **Items/niveau** : N1=12 (ordre fixe) ; N2=12 (ordre fixe) ; N3=13 (1 blanc)+7 (2 blancs)=20 mélangés.
3. **Correction** : uniquement comparaison bouton cliqué vs `answer` exact (avec apostrophe, ex. `"c'est"`). **Aucune saisie libre** dans tout le fichier.
4. **Interaction — divergent** : uniquement `renderChoices` (boutons) et `renderDouble` (2 groupes de boutons + bouton Vérifier). Pas de mots-cliquables, classification, drag&drop, texte à trous ni production libre — seul fichier 100% QCM parmi les 10.
5. **Métier** : 3 règles combinées (singularisation ce/cette vs son/sa pour ces/ses ; « cela est » vs pronominal pour c'est/s'est ; personne du verbe savoir pour sait/sais), jusqu'à 2 blancs indépendants par phrase en N3.
6. **Slug — décalage** : `ORTHO_SLUG='ces-ses'` (:432) → `ortho-ces-ses-n1/n2/n3` (ne reflète pas `cest-sest`).

### 4. et / est — `ortho-distinguer-et-est.html`
1. **Questions** : mêmes 5 tableaux (:672-768). Exemple (:673) : `{ phrase:"Le ciel ___ bleu aujourd'hui.", answer:"est", testPhrase:"était bleu", testOk:true }`.
2. **Items/niveau** : N1=12 ; N2=22 mélangés ; N3=16.
3. **Correction** : identique à #1/#2, `maxlength="3"` sur les inputs. Production libre `\best\b`/`\bet\b` + `/i` (:1314-1315).
4. **Interaction** : identique à #1.
5. **Métier** : test « était » (verbe être) vs « et puis » (conjonction). `tokenize()` sensible à la casse (:795-801), comme #1.
6. **Slug** : `ORTHO_SLUG='et-est'` (:571) → `ortho-et-est-n1/n2/n3`.

### 5. leur / leurs — `ortho-distinguer-leur-leurs.html`
1. **Questions** : 5 tableaux enrichis d'un champ `wtype` (`det-sing`/`det-plur`/`pron`) et de `hint` par item (:399-552). Exemple (:400) : `{ phrase:"Les enfants rangent ___ affaires.", answer:"leurs", wtype:"det-plur", hint:"ses affaires → pluriel" }`.
2. **Items/niveau** : N1=12 ; N2=8(mots-cliquables)+12(2×6 classification)=20 mélangés (le placeholder statique affiche « sur 10 », écrasé au runtime sans impact utilisateur) ; N3=6(1 blanc)+6(2 blancs)+4(libre)=16.
3. **Correction** : `===` exact sur texte trimé/lowercase (:1045,1103) ; comparaison par index pour mots-cliquables ; `placement[i]===item.col` pour classification. Production libre `\bleur\b`/`\bleurs\b` sur texte déjà lowercased.
4. **Interaction** : identique à #1, mais fonctions de rendu totalement redondantes (aucune mutualisation avec les autres fichiers).
5. **Métier — le plus riche** : taxonomie à 3 branches (déterminant sing./plur./pronom invariable), seul fichier avec une classification grammaticale à 3 valeurs plutôt qu'une règle binaire.
6. **Slug** : `ORTHO_SLUG='leur-leurs'` (:302) → `ortho-leur-leurs-n1/n2/n3`. Seul fichier à utiliser `window.EXERCISE_DATA = window.EXERCISE_DATA || {}`.

### 6. on / ont — `ortho-distinguer-on-ont.html`
1. **Questions** : mêmes 5 tableaux (:672-794). Exemple (:673) : `{ phrase:"Les élèves ___ fini leur travail.", answer:"ont", testPhrase:"avaient fini", testOk:true }`.
2. **Items/niveau** : N1=12 ; N2=22 mélangés ; N3=16.
3. **Correction** : identique aux autres pages Famille A. Production libre `/\bon\b/i`, `/\bont\b/i` (:1341-1342).
4. **Interaction** : identique à #1.
5. **Métier** : test « avaient » (verbe avoir) vs « il »/« nous » (pronom). Détection insensible à la casse de « Ont » en début de phrase (commentaire :820).
6. **Slug** : `ORTHO_SLUG='on-ont'` (:571) → `ortho-on-ont-n1/n2/n3`. `exerciseType: 'on-ont-niveaux'`, `category: 'Orthographe'`.

### 7. ou / où — `ortho-distinguer-ou-ou.html`
1. **Questions** : mêmes 5 tableaux. Exemple (:672) : `{ phrase:"Tu veux du lait ___ du jus d'orange ?", answer:"ou", testPhrase:"ou bien du jus d'orange", testOk:true }`.
2. **Items/niveau** : N1=12 ; N2=22 mélangés ; N3=16.
3. **Correction** : identique aux autres. Production libre avec regex plus élaborée à lookaround sur ponctuation/guillemets (:1318) plutôt qu'un simple `\b`, du fait de l'accent sur « où ».
4. **Interaction** : identique à #1.
5. **Métier** : test « ou bien » (conjonction) vs non-remplaçable (lieu/temps). Tokenizer **sensible** à la casse et **sans lowercase**, contrairement à `on-ont` — incohérence entre pages.
6. **Slug** : `ORTHO_SLUG='ou-ou'` (:570) → `ortho-ou-ou-n1/n2/n3`. `exerciseType: 'ou-ou-niveaux'`.

### 8. quel / quelle / quels / quelles / qu'elle(s) — `ortho-distinguer-quel-quelle-quels-quelles.html`
1. **Questions** : 3 tableaux 100% QCM, avec champs `nom/genre/nombre` (:511-626). Exemple N2 (:530+) : `{ phrase:"Je sais ___ a raison.", answer:"qu'elle", choices:["quelle","qu'elle"] }`.
2. **Items/niveau** : N1=12 (fixe) ; N2=12 (fixe, 8 quelle/qu'elle + 4 quelles/qu'elles) ; N3=16(1 blanc)+6(2 blancs)=22 mélangés.
3. **Correction** : uniquement `choice===q.answer` sur clic, y compris en double-blanc (`sel[i]===ans` par blanc). Pas de saisie libre.
4. **Interaction** : QCM/choix-étiquette partout + pattern double-blanc en N3 (2 QCM liés validés ensemble par un bouton « Vérifier »).
5. **Métier — complexe** : accord genre/nombre comme adjectif (quel/quelle/quels/quelles) + test de substitution « qu'il/qu'ils » pour distinguer de qu'elle(s).
6. **Slug — décalage** : `ORTHO_SLUG='quel'` (:414) → `ortho-quel-n1/n2/n3`. `category: 'Orthographe — Homophones grammaticaux'` (différent des 7 pages Famille A). `EXERCISE_DATA` en pattern défensif.

### 9. son / sont — `ortho-distinguer-son-sont.html`
1. **Questions** : mêmes 5 tableaux Famille A (:670-774). Exemple N1 (:670) : `{ phrase:"Les enfants ___ fatigués après la récréation.", answer:"sont", testPhrase:"étaient fatigués" }` ; testPhrase de « son » basé sur « mon cartable » plutôt qu'une formule fixe unique.
2. **Items/niveau** : N1=12 ; N2=22 mélangés ; N3=16.
3. **Correction** : identique aux autres pages Famille A. Production libre en simple `\b` (:1314-1315, style proche de `on-ont`).
4. **Interaction** : identique à #1.
5. **Métier** : test en deux temps — « étaient » (verbe être) puis, si échec, « mon »/« ton » (possessif). Tokenizer insensible à la casse.
6. **Slug** : `ORTHO_SLUG='son-sont'` (:568) → `ortho-son-sont-n1/n2/n3`. **Anomalie** : aucune déclaration `EXERCISE_DATA` dans ce fichier (0 occurrence), contrairement aux 9 autres — impact probable sur le titre affiché par `results.js`, à vérifier avant migration.

### 10. tout / tous / toute / toutes — `ortho-distinguer-tout-tous-toute-toutes.html`
1. **Questions** : 3 tableaux 100% QCM, champs `nom/genre/nombre/pronom/adverbe/adjGenre` (:519-639). Exemple adverbial (:562-563) : `{ phrase:"Elle est ___ contente de son résultat.", answer:"toute", adverbe:true, adjGenre:"féminin" }`.
2. **Items/niveau** : N1=12 (fixe, toute/toutes) ; N2=12 (fixe, tout/tous) ; N3=16(1 blanc)+6(2 blancs)=22 mélangés, les 4 formes mixées.
3. **Correction** : `choice===q.answer` sur clic ; double-blanc identique à #8.
4. **Interaction** : QCM/choix-étiquette partout + double-blanc en N3.
5. **Métier — le plus complexe des 10** : accord déterminant standard + usage pronominal + **règle adverbiale exceptionnelle** (« tout » invariable sauf devant adjectif féminin à initiale consonne/h aspiré). 4 branches d'explication distinctes dans `errorMsg()` (:682-699).
6. **Slug — décalage** : `ORTHO_SLUG='tout'` (:422) → `ortho-tout-n1/n2/n3`. `category: 'Orthographe — Homophones grammaticaux'` (comme #8). `EXERCISE_DATA` en pattern défensif, comme #8.

---

## Constat commun à toutes les pages : logique de déverrouillage

Les 10 fichiers partagent la même fonction `loadOrthoUnlocks()` : requête Supabase `.like('exercise_slug', 'ortho-${ORTHO_SLUG}-n%')`, extraction du numéro de niveau via regex `/-n([123])$/`, validation si `score/total >= 0.8`. C'est le point d'ancrage exact qu'une migration devra remplacer (par une lecture standard slug-nu + `level`), et le point de rupture si la migration de données historiques n'est pas faite correctement : sans elle, tous les niveaux déjà validés par les élèves redeviendraient verrouillés.

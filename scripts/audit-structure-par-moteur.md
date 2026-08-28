# Audit de structure par moteur — les 70 compétences STRUCTURE ANORMALE

Généré à partir de `scripts/audit-modele-standard.md` (70 compétences en
statut STRUCTURE ANORMALE) croisé avec une lecture du dispatch de
`exercise.html` (`startSessionWithType()` et les fonctions `xxInitSession` /
`xxStartLevel` / `xxRenderQuestion` qu'il appelle). **Lecture seule — aucun
code ni donnée modifiés.**

## Résumé

16 groupes, triés par taille décroissante (un moteur partagé par N
compétences migré une fois traite N compétences d'un coup — c'est le
critère de tri demandé) :

| # | Groupe | Compétences | Moteur | Migration |
|---|---|---|---|---|
| 1 | `lvlN` (tableaux bruts) — dédiés, math/grammaire/lecture | **20** | 20 fonctions distinctes | 18 ÉLEVÉE, 2 FAIBLE |
| 2 | `bank`+`item.level` — conjugaison au présent/temps simples, dédiés | **13** | 13 fonctions distinctes | 13 ÉLEVÉE |
| 3 | `pools` — **moteur partagé "faire-niveaux"** (8 verbes irréguliers) | **8** | 1 fonction partagée | 8 ÉLEVÉE |
| 4 | `bank`+`item.level` — fractions/problèmes, dédiés | **5** | 5 fonctions distinctes | 5 ÉLEVÉE |
| 5 | `lvlNBank` — grammaire (GN/pronoms/épithète), dédiés mais template dupliqué | **5** | 5 fonctions distinctes (même charpente) | 5 ÉLEVÉE |
| 6 | `pools` — orthographe grammaticale, dédiés | **3** | 3 fonctions distinctes | 3 ÉLEVÉE |
| 7 | `bank`+`item.level` — probabilités, dédiés mais renderers génériques déjà réutilisés | **3** | 3 fonctions distinctes | 3 FAIBLE |
| 8 | `lvlN` — **moteur partagé "lecture"** (implicites/mot en contexte) | **2** | 1 fonction partagée | 2 FAIBLE |
| 9 | `bank`+`item.level` — **moteur partagé "nombre-entier"** (chiffres/lettres) | **2** | 1 fonction partagée | 2 ÉLEVÉE |
| 10 | `bank`+`item.difficulty` — **moteur partagé "accord-ecrit"** | **2** | 1 fonction partagée | 2 ÉLEVÉE |
| 11 | `bank`+`item.difficulty` — fractions, dédiés | **2** | 2 fonctions distinctes | 2 ÉLEVÉE |
| 12 | `bank`+`item.level`, 5 niveaux — standalone | **1** | 1 fonction | ÉLEVÉE |
| 13 | `levelNWords` — standalone | **1** | 1 fonction | ÉLEVÉE |
| 14 | `produire-3-formes` — standalone | **1** | 1 fonction | ÉLEVÉE |
| 15 | `stepNPool`, 5 paliers séquentiels — standalone | **1** | 1 fonction, architecture unique | ÉLEVÉE |
| 16 | `homophones-niveaux` **déjà migré**, level1Bank manquant | **1** | moteur partagé avec ~47 autres compétences déjà conformes | **FAIBLE** (pas une vraie migration — juste un level1Bank ou une décision produit) |

**Total : 70.** Répartition migration : **26 FAIBLE** (renderers génériques déjà
réutilisés ou structure quasi identique à un QCM standard) / **44 ÉLEVÉE**
(rendu/interaction bespoke : SVG, drag-and-drop, saisie libre multi-champs,
widgets dédiés). Les groupes 3, 8, 9, 10 et 16 sont les seuls où un moteur
JS unique dessert plusieurs compétences (comme `homophones-niveaux` l'a fait
pour ~50 compétences) — migrer ce moteur une fois traite tout le groupe.
Les groupes 1, 2, 4, 5, 6, 7, 11 regroupent des compétences qui **partagent
la même convention de données** mais ont chacune leur **propre fonction JS**
(souvent une charpente copiée-collée d'une compétence sœur, notamment le
groupe 5 où les 4 fonctions `eaXxx`/`ecnXxx`/`pscXxx`/`gnspXxx` ont une
structure quasi identique) : les migrer suit le même schéma mais nécessite
une passe de code par compétence, pas une seule.

---

## 1. `lvlN` (tableaux bruts) — dédiés, math/grammaire/lecture (20)

Convention de données : `lvl1`/`lvl2`/`lvl3` (tableaux nus, sans suffixe
`Bank`). Chaque compétence a son propre couple `type` + fonctions
`xxInitSession`/`xxStartLevel`/`xxRenderQuestion` — **aucun partage de code**
entre elles (hormis les 2 exceptions FAIBLE du tableau, qui partagent déjà
`lecInitSession`/`lecRenderQuestion`, comptées séparément au groupe 8).
Niveaux actuels : 3 pour toutes.

| Slug | Titre | Fichier | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|---|
| arrondi-adapte-probleme | Choisir l'arrondi adapté à la situation | data/nombres-entiers.js | aaInitSession@L23904 / aaStartLevel@L23932 / aaRenderQuestion@L23946 | **FAIBLE** — liste de boutons de choix par valeur, structurellement un QCM. |
| arrondir-nombre-entier | Arrondir un nombre entier | data/nombres-entiers.js | aniInitSession@L23624 / aniStartLevel@L23652 / aniRenderQuestion@L23665 | ÉLEVÉE — chiffre surligné (aniHighlightDisplay) + saisie numérique + validation de rang. |
| comparer-nombres-entiers | Comparer deux nombres entiers | data/nombres-entiers.js | cneInitSession@L22340 / cneStartLevel@L22368 / cneRenderQuestion@L22381 | ÉLEVÉE — widget "deux nombres + slot de signe central" avec boutons `<`/`>`. |
| droite-graduee-nombres-entiers | Lire un nombre sur une droite graduée | data/nombres-entiers.js | dgnInitSession@L23461 / dgnStartLevel@L23440 / dgnRenderQuestion@L23433 | ÉLEVÉE — droite graduée en SVG généré (dgnBuildSvg) avec curseur dynamique. |
| encadrer-nombre-entier | Encadrer un nombre entier | data/nombres-entiers.js | eniInitSession@L22965 / eniStartLevel@L22993 / eniRenderQuestion@L23006 | ÉLEVÉE — widget à deux saisies (borne inf/sup) avec activation conditionnelle du bouton. |
| identifier-type-phrase | Identifier le type et la forme d'une phrase | data/grammaire.js | itpInitSession@L30884 / itpStartLevel@L30906 / itpRenderQuestion@L30918 | ÉLEVÉE — 3 modes de rendu par niveau (QCM, vrai/faux, saisie libre normalisée). |
| transformer-phrase | Transformer une phrase à la forme négative | data/grammaire.js | tpInitSession@L31399 / tpStartLevel@L31421 / tpRenderQuestion@L31433 | ÉLEVÉE — saisie libre (tpRenderNegative) tolérant plusieurs formulations. |
| associer-decimal-fraction | Associer une fraction décimale à un nombre décimal | data/nombres-decimaux.js | afInitSession@L30458 / afStartLevel@L30480 / afRenderQuestion@L30492 | ÉLEVÉE — droite graduée SVG (afBuildSvg) + tableau de numération + QCM selon sous-type. |
| composer-nombre-entier | Composer un nombre à partir de sa décomposition | data/nombres-entiers.js | cniInitSession@L22030 / cniStartLevel@L22052 / cniRenderQuestion@L22065 | ÉLEVÉE — saisies texte multiples + formatage/validation dédiés. |
| decomposer-nombre-entier | Décomposer un nombre entier | data/nombres-entiers.js | dniInitSession@L21573 / dniStartLevel@L21595 / dniRenderQuestion@L21609 | ÉLEVÉE — 3 sous-formats (addition/parts/formes), parseurs dédiés (dniCheckAdd/dniCheckVp). |
| comparer-decimaux | Comparer deux nombres décimaux | data/nombres-decimaux.js | cdInitSession@L24289 / cdStartLevel@L24311 / cdRenderQuestion@L24324 | ÉLEVÉE — cdRenderCard dispatche vers 6 sous-rendus bespoke (signe, drag pour ranger, droite SVG, encadrement, QCM, vrai/faux). |
| composer-decimaux | Composer un nombre décimal | data/nombres-decimaux.js | cpInitSession@L28040 / cpStartLevel@L28062 / cpRenderQuestion@L28074 | ÉLEVÉE — grille de décomposition par colonnes (cpSetupTableInputs) + QCM inverse. |
| decomposer-decimaux | Décomposer un nombre décimal | data/nombres-decimaux.js | ddInitSession@L27059 / ddStartLevel@L27081 / ddRenderQuestion@L27093 | ÉLEVÉE — 7 sous-formats de rendu bespoke avec tableau de numération dynamique. |
| encadrer-decimaux | Encadrer un nombre décimal | data/nombres-decimaux.js | edInitSession@L26226 / edStartLevel@L26248 / edRenderQuestion@L26261 | ÉLEVÉE — encadrement double saisie (types A-F) + droite graduée SVG + tableau de numération. |
| fraction-decimale-grille-droite | Fraction décimale — Grille, droite et écriture décimale | data/fractions.js | fdgdInitSession@L35114 / fdgdStartLevel@L35136 / fdgdRenderQuestion@L35147 | ÉLEVÉE — 3 rendus successifs : grille de fraction SVG, droite graduée SVG, saisie décimale. |
| fraction-decimale-tableau-numeration | Fraction décimale — Tableau de numération | data/fractions.js | fdtnInitSession@L35560 / fdtnStartLevel@L35582 / fdtnRenderQuestion@L35593 | ÉLEVÉE — tableau de numération interactif à cases par colonne (fdtnCheckTableau). |
| intercaler-decimaux | Intercaler un nombre décimal entre deux nombres | data/nombres-decimaux.js | icInitSession@L29032 / icStartLevel@L29054 / icRenderQuestion@L29066 | ÉLEVÉE — icRenderCard dispatche vers de nombreux widgets bespoke (ligne graduée cliquable, saisie, QCM, fraction, oui/non). |
| placer-decimaux-droite | Placer un nombre décimal sur une droite graduée | data/nombres-decimaux.js | pdInitSession@L29902 / pdStartLevel@L29924 / pdRenderQuestion@L29936 | ÉLEVÉE — le plus complexe du lot : droite SVG à 5 modes (drag-and-drop, repérage, association par chip, QCM, multi-placement). |
| ranger-decimaux | Ranger des nombres décimaux | data/nombres-decimaux.js | rdInitSession@L25242 / rdStartLevel@L25264 / rdRenderQuestion@L25277 | ÉLEVÉE — drag-and-drop HTML5 natif (rdRenderDragOrder) + droite graduée multi-points. |
| ranger-nombres-entiers | Ranger des nombres entiers | data/nombres-entiers.js | rniInitSession@L22591 / rniStartLevel@L22619 / rniRenderQuestion@L22632 | ÉLEVÉE — tri par clic (tuiles → emplacements ordonnés, rniSetupInteraction), sans équivalent générique. |

---

## 2. `bank` + `item.level` — conjugaison au présent/temps, dédiés (13)

Toutes dans `data/conjugaison.js`. Banque unique filtrée par `item.level`
(valeurs numériques 1..N). **Aucun partage de code** entre elles malgré la
convention de données identique — chacune a sa propre fonction de rendu, la
plupart avec un sous-widget de choix spécifique (radical, groupe, auxiliaire,
terminaison -iss-…). 3 niveaux pour toutes sauf `conjuguer-verbes-
particuliers-1er-groupe` (5 niveaux).

| Slug | Titre | Niveaux | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|---|
| conjuguer-1er-groupe-present | Conjuguer les verbes réguliers du 1er groupe au présent | 3 | c1gInitSession@L6023 / c1gStartLevel@L18119 / c1gRenderQuestion@L18135 | ÉLEVÉE — rendu bespoke (c1gRenderMcq/Matching/TextInput). |
| conjuguer-2e-groupe-present | Conjuguer les verbes du 2e groupe au présent | 3 | c2gInitSession@L6026 / c2gStartLevel@L18386 / c2gRenderQuestion@L18402 | ÉLEVÉE — même architecture bespoke que c1g, fonctions propres. |
| conjuguer-3e-groupe-present | Conjuguer les verbes fréquents du 3e groupe au présent | 3 | c3gInitSession@L6029 / c3gStartLevel@L18653 / c3gRenderQuestion@L18669 | ÉLEVÉE — rendu bespoke dédié (c3gRenderMcq/Matching/TextInput). |
| conjuguer-avoir-present | Conjuguer le verbe avoir au présent | 3 | capInitSession@L6020 / capStartLevel@L17851 / capRenderQuestion@L17867 | ÉLEVÉE — rendu bespoke propre au verbe avoir. |
| conjuguer-conditionnel-present | Conjuguer au conditionnel présent | 3 | ccondInitSession@L5963 / ccondStartLevel@L20647 / ccondRenderQuestion@L20662 | ÉLEVÉE — + interaction dédiée ccondRenderRadicalChoice (choix du radical). |
| conjuguer-etre-present | Conjuguer le verbe être au présent | 3 | cepInitSession@L6017 / cepStartLevel@L17587 / cepRenderQuestion@L17603 | ÉLEVÉE — rendu bespoke propre au verbe être. |
| conjuguer-futur | Conjuguer au futur | 3 | cfutInitSession@L6035 / cfutStartLevel@L19267 / cfutRenderQuestion@L19282 | ÉLEVÉE — + cfutRenderRadicalChoice. |
| conjuguer-imparfait | Conjuguer à l'imparfait | 3 | cimpInitSession@L6032 / cimpStartLevel@L18919 / cimpRenderQuestion@L18934 | ÉLEVÉE — + cimpRenderIssChoice (choix terminaison -iss-). |
| conjuguer-imperatif-present | Conjuguer à l'impératif présent | 3 | cimperInitSession@L5960 / cimperStartLevel@L20321 / cimperRenderQuestion@L20336 | ÉLEVÉE — rendu de niveau 2 dédié (cimperRenderLevel2). |
| conjuguer-passe-simple | Conjuguer des verbes au passé simple | 3 | cpsInitSession@L6038 / cpsStartLevel@L19615 / cpsRenderQuestion@L19630 | ÉLEVÉE — + cpsRenderGroupeChoice (choix du groupe verbal). |
| conjuguer-plus-que-parfait | Conjuguer au plus-que-parfait | 3 | cpqpInitSession@L5957 / cpqpStartLevel@L19965 / cpqpRenderQuestion@L19980 | ÉLEVÉE — + cpqpRenderAuxChoice (choix de l'auxiliaire). |
| retrouver-infinitif-verbe-conjugue | Retrouver l'infinitif d'un verbe conjugué puis son groupe | 3 | cigInitSession@L5966 / cigStartLevel@L20996 / cigRenderQuestion@L21011 | ÉLEVÉE — rendu en 2 étapes (cigRenderStep1Mcq/Input puis cigRenderStep2). |
| conjuguer-verbes-particuliers-1er-groupe | Conjuguer les verbes particuliers du 1er groupe au présent | **5** | cvpInitSession@L6014 / cvpStartLevel@L17384 / cvpRenderQuestion@L17399 | ÉLEVÉE — 5 niveaux numériques, saisie libre dédiée, fonction cvpShuffle propre. |

---

## 3. `pools` — moteur partagé "faire-niveaux" (8 verbes irréguliers)

**Moteur réellement partagé** : les 8 compétences ci-dessous ont toutes
`type: "faire-niveaux"` et appellent **exactement les mêmes fonctions**
`faireInitSession@L12112` / `faireStartLevel@L12140` /
`faireRenderQuestion@L12155`. Migrer ce moteur une fois traite les 8
compétences d'un coup — comme `homophones-niveaux` l'a fait pour ~50
compétences, mais à plus petite échelle. Toutes dans `data/conjugaison.js`,
3 niveaux (`pools` clés CM1/CM2/6e).

| Slug | Titre |
|---|---|
| conjuguer-aller | Conjuguer le verbe ALLER |
| conjuguer-dire | Conjuguer le verbe DIRE |
| conjuguer-faire | Conjuguer le verbe FAIRE |
| conjuguer-pouvoir | Conjuguer le verbe POUVOIR |
| conjuguer-prendre | Conjuguer le verbe PRENDRE |
| conjuguer-venir | Conjuguer le verbe VENIR |
| conjuguer-voir | Conjuguer le verbe VOIR |
| conjuguer-vouloir | Conjuguer le verbe VOULOIR |

**Migration : ÉLEVÉE** — le rendu (saisie libre, badge de temps affiché,
feedback/explication détaillée par phrase, validation contre un tableau de
formes acceptées) n'appelle aucun renderer générique. Mais l'effort de
migration est **mutualisé sur une seule fonction** pour les 8 compétences,
contrairement aux groupes 1 et 2 où chaque compétence a son propre code.

---

## 4. `bank` + `item.level` — fractions/problèmes, dédiés (5)

Toutes dans `data/fractions.js`. **Aucun partage de code** entre elles.

| Slug | Titre | Niveaux | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|---|
| placer-fraction-droite-graduee | Placer une fraction sur une droite graduée | 2 | showPlacerFractionDroiteLevelSelect@L5466 / filtre inline onSelectLevel@L5485 / renderPlacerFractionDroite@L8800 | ÉLEVÉE — droite graduée SVG sur mesure (calcul de graduations, clic sur tick). |
| representer-fraction | Représenter une fraction | 2 | showRepresenterFractionLevelSelect@L5416 / filtre inline@L5435 / renderRepresenterFraction@L8687 | ÉLEVÉE — widget de bandes/parts coloriables généré dynamiquement. |
| decomposer-fraction-partie-entiere | Décomposer une fraction (partie entière + fraction) | 3 | showDecomposerFractionLevelSelect@L5666 / filtre inline@L5685 / renderDecomposerFraction@L9779 (→ renderDecompQCM/FillTwo/FreeText) | ÉLEVÉE — 3 sous-rendus bespoke par niveau, dont une droite graduée SVG interne. |
| utiliser-fractions-problemes | Utiliser les fractions dans des problèmes | 3 | showFractionsProblemesLevelSelect@L5716 / filtre inline@L5735 / renderFractionsProblemes@L10203 (→ fpRenderQcm/FreeText/MultiStep) | ÉLEVÉE — HTML bespoke avec illustration contextuelle, aucun renderer générique. |
| comparer-fractions | Comparer deux fractions | 3 | showComparerFractionsLevelSelect@L5516 / filtre inline@L5536 / renderComparerFractions@L8986 (+ renderComparerFractionsNL niveau 3) | ÉLEVÉE — widget double de coloriage de fractions + saisie du signe de comparaison. |

---

## 5. `lvlNBank` — grammaire (GN/pronoms/épithète), dédiés mais template dupliqué (5)

Toutes dans `data/grammaire.js` sauf `ortho-identifier-donneur-accord`
(`data/orthographe.js`). **Aucun partage de code runtime**, mais 4 des 5
fonctions ont une charpente quasi identique (`xxRenderLvl1`/`Lvl2`/`Lvl3`,
probablement copiées d'une compétence sœur lors de leur création) — un
patron de migration commun devrait s'appliquer aux 4 avec peu d'adaptation.

| Slug | Titre | Niveaux | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|---|
| ortho-identifier-donneur-accord | Qui commande l'accord ? | **2** (lvl1Bank/lvl2Bank seulement) | donneurInitSession@L15050 / daStartLevel@L15077 / daRenderQuestion@L15088 (→ daRenderLvl1/Lvl2) | ÉLEVÉE — sélecteurs genre/nombre custom. |
| differencier-epithete-attribut | Différencier l'adjectif épithète et l'attribut du sujet | 3 | eaInitSession@L12705 / eaStartLevel@L12737 / eaRenderLvl1@L12776 (+Lvl2/Lvl3) | ÉLEVÉE — rendu spécifique par niveau, template dupliqué avec les 3 suivants. |
| distinguer-epithete-complement-nom | Distinguer l'adjectif épithète et le complément du nom | 3 | ecnInitSession@L13227 / ecnStartLevel@L13256 / ecnRenderLvl1@L13291 (+Lvl2/Lvl3) | ÉLEVÉE — même architecture que differencier-epithete-attribut. |
| distinguer-pronom-sujet-complement | Distinguer le pronom personnel sujet et le pronom personnel complément | 3 | pscInitSession@L13721 / pscStartLevel@L13750 / pscRenderLvl1@L13787 (+Lvl2/Lvl3) | ÉLEVÉE — même template. |
| remplacer-gn-sujet-pronom | Remplacer un groupe nominal sujet par un pronom personnel sujet | 3 | gnspInitSession@L14113 / gnspStartLevel@L14138 / gnspRenderLvl1@L14166 (+Lvl2/Lvl3) | ÉLEVÉE — même template. |

---

## 6. `pools` — orthographe grammaticale, dédiés (3)

Toutes dans `data/orthographe.js`. **Aucun partage de code** entre elles ni
avec le groupe "faire-niveaux" (types distincts).

| Slug | Titre | Niveaux | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|---|
| ortho-transformer-gn-feminin | Change de genre ! | 3 | genreInitSession@L14791 / genreStartLevel@L14817 / genreRenderQuestion@L14829 | ÉLEVÉE — saisie libre à 2 tentatives, pénalité de score, diff caractère-par-caractère. |
| ortho-transformer-gn-pluriel | Transformer un GN du singulier au pluriel | 3 | gnpInitSession@L14506 / gnpStartLevel@L14532 / gnpRenderQuestion@L14544 | ÉLEVÉE — saisie libre + diffHtml + règle affichée en cas d'erreur. |
| ortho-modifier-sujet-accords | Change de sujet ! | **4** | csjInitSession@L21301 / csjStartLevel@L21328 / csjRenderQuestion@L21343 | ÉLEVÉE — réécriture de phrase entière (sujet en gras), csjIsCorrect/csjDiffHtml. |

---

## 7. `bank` + `item.level` — probabilités, dédiés mais renderers génériques déjà réutilisés (3)

Toutes dans `data/probabilites.js`, 3 niveaux chacune. Trois fonctions
`show*LevelSelect` distinctes (pas de partage de code entre elles), **mais**
chacune délègue son rendu à un renderer **déjà générique et partagé** par
ailleurs dans `exercise.html` (les mêmes que `homophones-niveaux` utilise) —
d'où la migration FAIBLE malgré l'absence de code commun entre les trois.

| Slug | Titre | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|
| probabilite-issues | Dénombrer les issues possibles et favorables | showProbaIssuesLevelSelect@L5824 / filtre inline@L5843 / **renderClassificationEtapes@L7530** (générique) | **FAIBLE** — renderer déjà partagé (mots-cliquables-étapes, homophones). |
| probabilite-nombre | Exprimer la probabilité comme un nombre | showProbaNombreLevelSelect@L5874 / filtre inline@L5893 / **renderMotsCliquables@L7304** (générique) | **FAIBLE** — renderer déjà utilisé par HOMO_RENDERERS. |
| probabilite-chances | Utiliser l'expression « a chances sur b » | showProbaChancesLevelSelect@L5774 / filtre inline@L5793 / **renderChoixEtiquette@L7478** (générique) | **FAIBLE** — renderer déjà utilisé par HOMO_RENDERERS. |

---

## 8. `lvlN` — moteur partagé "lecture" (implicites / mot en contexte)

**Moteur réellement partagé** : les 2 compétences appellent les mêmes
fonctions `lecInitSession@L31193` / `lecStartLevel@L31215` /
`lecRenderQuestion@L31228`, malgré des `type` distincts
(`comprendre-implicites-niveaux` / `comprendre-mot-contexte-niveaux`,
dispatchés vers le même moteur). Fichier `data/lecture.js`, 3 niveaux.

| Slug | Titre |
|---|---|
| comprendre-implicites | Comprendre les implicites |
| comprendre-mot-contexte | S'appuyer sur le contexte pour comprendre un mot difficile |

**Migration : FAIBLE** — grille de boutons de choix avec index de réponse et
zone de feedback, structure quasi identique à un QCM générique.

---

## 9. `bank` + `item.level` — moteur partagé "nombre-entier" (chiffres/lettres)

**Moteur réellement partagé** : `type: "nombre-entier"` pour les deux,
mêmes fonctions `showNombreEntierLevelSelect@L5617` / filtre inline@L5635 /
`renderNombreEntier@L9673`. Fichier `data/nombres-entiers.js`, 2 niveaux
(level="CM1"/"CM2").

| Slug | Titre |
|---|---|
| ecrire-nombre-entier-chiffres | Écrire un nombre en chiffres |
| ecrire-nombre-entier-lettres | Écrire un nombre en lettres |

**Migration : ÉLEVÉE** — QCM et saisie construits en HTML brut bespoke
(grille de choix custom + clavier numérique), aucun renderer générique.

---

## 10. `bank` + `item.difficulty` — moteur partagé "accord-ecrit"

**Moteur réellement partagé** : `type: "accord-ecrit"` pour les deux,
mêmes fonctions `showAccordLevelSelect@L5225` / `renderAccordEcrit@L6985`.
Fichier `data/orthographe.js`, 3 niveaux (difficulty=1/2/3, 20 items chacun).

| Slug | Titre |
|---|---|
| ortho-accorder-adjectif-nom | Accorder l'adjectif avec le nom |
| ortho-accorder-determinant-nom | Accorder le déterminant avec le nom |

**Migration : ÉLEVÉE** — champ de saisie libre + normalisation, pas de
renderer générique réutilisé.

---

## 11. `bank` + `item.difficulty` — fractions, dédiés (2)

Fichier `data/fractions.js`, 2 niveaux chacune. **Aucun partage de code.**

| Slug | Titre | Fonctions (Init/StartLevel/Render) | Migration |
|---|---|---|---|
| lire-fraction | Lire une fraction | showLireFractionLevelSelect@L5366 / filtre inline@L6166 / renderLireFraction@L8608 | ÉLEVÉE — visuel SVG de fraction + inputs numérateur/dénominateur. |
| encadrer-fraction | Encadrer une fraction entre deux entiers consécutifs | showEncadrerFractionLevelSelect@L5567 / filtre inline@L6186 / renderEncadrerFraction@L9384 | ÉLEVÉE — droite graduée SVG (_renderEncadrAvecDroite/_renderEncadrSansDroite). |

---

## 12. `bank` + `item.level`, 5 niveaux — standalone

| Slug | Titre | Fichier | Niveaux | Fonctions | Migration |
|---|---|---|---|---|---|
| ortho-modifier-temps-accords | Change de temps ! | data/orthographe.js | **5** | ctInitSession@L17033 / ctStartLevel@L17057 / ctRenderQuestion@L17074 | ÉLEVÉE — badge de temps, saisie libre de phrase entière, validation textuelle custom. |

---

## 13. `levelNWords` — standalone

| Slug | Titre | Fichier | Niveaux | Fonctions | Migration |
|---|---|---|---|---|---|
| ortho-mots-invariables | Les mots invariables | data/orthographe.js | 3 | miInitSession@L35968 / miStartLevel@L35996 / miRenderItem@L36016 | ÉLEVÉE — UX de série/streak (remise à zéro sur erreur), non réutilisable ailleurs. |

---

## 14. `produire-3-formes` — standalone

| Slug | Titre | Fichier | Niveaux | Fonctions | Migration |
|---|---|---|---|---|---|
| produire-formes-interrogatives | Produire différentes formes de phrases interrogatives | data/grammaire.js | 3 paliers (banque unique de 6 items) | showLevelSelect@L5180 / renderProduire3Formes@L7164 | ÉLEVÉE — 3 champs de saisie libre non génériques ; c'est le même cas déjà rencontré et documenté dans dashboard-admin.html ("banque unique × paliers"). |

---

## 15. `stepNPool`, 5 paliers séquentiels — standalone

| Slug | Titre | Fichier | Niveaux | Fonctions | Migration |
|---|---|---|---|---|---|
| identifier-valeur-chiffre-position | Identifier la valeur d'un chiffre selon sa position | data/nombres-entiers.js | **5** (step1Pool..step5Pool) | vpInitSession@L10459 / pas d'écran LevelSelect ni de xxStartLevel (progression interne via vpState.stepIdx) / renderValeurPosition@L10496 (→ vpStep1..vpStep5) | ÉLEVÉE — architecture unique à 5 étapes séquentielles sans sélecteur de niveau, entièrement bespoke. |

---

## 16. Cas particulier : `homophones-niveaux` déjà migré, level1Bank manquant

| Slug | Titre | Fichier | Niveaux | Fonctions | Migration |
|---|---|---|---|---|---|
| identifier-attribut-sujet | Identifier un attribut du sujet | data/grammaire.js | **2** (level2Bank/level3Bank seulement, pas de level1Bank) | showHomoLevelSelect@L5292 / loadLevel@L5320 (closure interne) / showQuestion→HOMO_RENDERERS[q.type]@L6274-6284 — **moteur générique déjà partagé avec ~47 autres compétences** (data/grammaire.js et data/orthographe-homophones.js) | **FAIBLE** |

Ce n'est pas une vraie compétence "moteur dédié" : `type` vaut déjà
`"homophones-niveaux"`, le `bankKeyMap` (CM2→level2Bank, 6e→level3Bank)
correspond exactement à sa structure actuelle. Elle est en STRUCTURE
ANORMALE uniquement parce qu'il lui manque un `level1Bank` — soit il faut en
ajouter un (banque CM1), soit assumer que c'est une compétence à 2 niveaux
(CM2/6e) comme le sont déjà `distinguer-phrase-simple-complexe` et
`identifier-juxtaposition`, ce qui nécessiterait alors une clarification du
modèle "exactement 3 niveaux" pour ce sous-cas déjà toléré ailleurs sur le
site.

---

Rapport généré en lecture seule — aucun fichier `data/*.js` ni `exercise.html`
n'a été modifié.

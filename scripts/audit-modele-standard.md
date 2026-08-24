# Audit de conformité au modèle standard (3 niveaux × 10 items)

Généré par `scripts/audit-modele-standard.js`.

Norme auditée : chaque compétence doit utiliser exactement le moteur standard `level1Bank`/`level2Bank`/`level3Bank` (consommé par exercise.html), avec exactement 10 items par niveau.

## Résumé

- Compétences auditées : 126
- STRUCTURE ANORMALE (moteur/rendu dédié ou nombre de niveaux ≠ 3) : 69
- Au moins un niveau en MANQUE (< 10 items) : 0
- Au moins un niveau en SURPLUS (> 10 items) : 21
- Entièrement OK (3 × 10 items, moteur standard) : 36

---

## arrondi-adapte-probleme — Choisir l'arrondi adapté à la situation

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## arrondir-nombre-entier — Arrondir un nombre entier

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## associer-decimal-fraction — Associer une fraction décimale à un nombre décimal

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 5 · lvl2: 5 · lvl3: 5.

## comparer-decimaux — Comparer deux nombres décimaux

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## comparer-fractions — Comparer deux fractions

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 6 · level=3: 8 · level=2: 6.

## comparer-nombres-entiers — Comparer deux nombres entiers

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## composer-decimaux — Composer un nombre décimal

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## composer-nombre-entier — Composer un nombre à partir de sa décomposition

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 5 · lvl2: 5 · lvl3: 5.

## comprendre-implicites — Comprendre les implicites

Fichier : data/lecture.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 6 · lvl2: 6 · lvl3: 6.

## comprendre-mot-contexte — S'appuyer sur le contexte pour comprendre un mot difficile

Fichier : data/lecture.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 6 · lvl2: 6 · lvl3: 6.

## conjuguer-1er-groupe-present — Conjuguer les verbes réguliers du 1er groupe au présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-2e-groupe-present — Conjuguer les verbes du 2e groupe au présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-3e-groupe-present — Conjuguer les verbes fréquents du 3e groupe au présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-aller — Conjuguer le verbe ALLER

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-avoir-present — Conjuguer le verbe avoir au présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-conditionnel-present — Conjuguer au conditionnel présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-dire — Conjuguer le verbe DIRE

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-etre-present — Conjuguer le verbe être au présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-faire — Conjuguer le verbe FAIRE

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-futur — Conjuguer au futur

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-imparfait — Conjuguer à l'imparfait

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-imperatif-present — Conjuguer à l'impératif présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-passe-simple — Conjuguer des verbes au passé simple

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-plus-que-parfait — Conjuguer au plus-que-parfait

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## conjuguer-pouvoir — Conjuguer le verbe POUVOIR

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-prendre — Conjuguer le verbe PRENDRE

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-venir — Conjuguer le verbe VENIR

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-verbes-particuliers-1er-groupe — Conjuguer les verbes particuliers du 1er groupe au présent

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (5 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 17 · level=2: 19 · level=3: 14 · level=4: 16 · level=5: 16.

## conjuguer-voir — Conjuguer le verbe VOIR

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## conjuguer-vouloir — Conjuguer le verbe VOULOIR

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : CM1, CM2, 6e) au lieu de level1Bank/level2Bank/level3Bank — CM1: 26 · CM2: 16 · 6e: 16.

## decomposer-decimaux — Décomposer un nombre décimal

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## decomposer-fraction-partie-entiere — Décomposer une fraction (partie entière + fraction)

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="CM1": 12 · level="CM2": 12 · level="6e": 12.

## decomposer-nombre-entier — Décomposer un nombre entier

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 5 · lvl2: 5 · lvl3: 5.

## differencier-epithete-attribut — Différencier l'adjectif épithète et l'attribut du sujet

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlNBank" (lvl1Bank, lvl2Bank, lvl3Bank) au lieu de level1Bank/level2Bank/level3Bank.

## distinguer-epithete-complement-nom — Distinguer l'adjectif épithète et le complément du nom

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlNBank" (lvl1Bank, lvl2Bank, lvl3Bank) au lieu de level1Bank/level2Bank/level3Bank.

## distinguer-pronom-sujet-complement — Distinguer le pronom personnel sujet et le pronom personnel complément

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlNBank" (lvl1Bank, lvl2Bank, lvl3Bank) au lieu de level1Bank/level2Bank/level3Bank.

## droite-graduee-nombres-entiers — Lire un nombre sur une droite graduée

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## ecrire-nombre-entier-chiffres — Écrire un nombre en chiffres

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (2 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="CM1": 15 · level="CM2": 15.

## ecrire-nombre-entier-lettres — Écrire un nombre en lettres

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (2 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="CM1": 15 · level="CM2": 15.

## encadrer-decimaux — Encadrer un nombre décimal

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## encadrer-fraction — Encadrer une fraction entre deux entiers consécutifs

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "difficulty" (2 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — difficulty=1: 8 · difficulty=2: 8.

## encadrer-nombre-entier — Encadrer un nombre entier

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## fraction-decimale-grille-droite — Fraction décimale — Grille, droite et écriture décimale

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## fraction-decimale-tableau-numeration — Fraction décimale — Tableau de numération

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## identifier-type-phrase — Identifier le type et la forme d'une phrase

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## identifier-valeur-chiffre-position — Identifier la valeur d'un chiffre selon sa position

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "stepNPool" (step1Pool, step2Pool, step3Pool, step4Pool, step5Pool) — 5 paliers au lieu de 3 niveaux level1Bank/level2Bank/level3Bank.

## intercaler-decimaux — Intercaler un nombre décimal entre deux nombres

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## lire-fraction — Lire une fraction

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "difficulty" (2 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — difficulty=1: 10 · difficulty=2: 10.

## ortho-accorder-adjectif-nom — Accorder l'adjectif avec le nom

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "difficulty" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — difficulty=1: 20 · difficulty=2: 20 · difficulty=3: 20.

## ortho-accorder-determinant-nom — Accorder le déterminant avec le nom

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "difficulty" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — difficulty=1: 20 · difficulty=2: 20 · difficulty=3: 20.

## ortho-identifier-donneur-accord — Qui commande l'accord ?

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlNBank" (lvl1Bank, lvl2Bank) au lieu de level1Bank/level2Bank/level3Bank.

## ortho-modifier-sujet-accords — Change de sujet !

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : 1, 2, 3, 4) au lieu de level1Bank/level2Bank/level3Bank — 1: 14 · 2: 14 · 3: 14 · 4: 12.

## ortho-modifier-temps-accords — Change de temps !

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (5 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 14 · level=2: 14 · level=3: 14 · level=4: 14 · level=5: 14.

## ortho-mots-invariables — Les mots invariables

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "levelNWords" (level1Words, level2Words, level3Words) au lieu de level1Bank/level2Bank/level3Bank.

## ortho-transformer-gn-feminin — Change de genre !

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : 1, 2, 3) au lieu de level1Bank/level2Bank/level3Bank — 1: 12 · 2: 12 · 3: 10.

## ortho-transformer-gn-pluriel — Transformer un GN du singulier au pluriel

Fichier : data/orthographe.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "pools" (objet, clés : 1, 2, 3) au lieu de level1Bank/level2Bank/level3Bank — 1: 20 · 2: 20 · 3: 20.

## placer-decimaux-droite — Placer un nombre décimal sur une droite graduée

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## placer-fraction-droite-graduee — Placer une fraction sur une droite graduée

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (2 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10.

## probabilite-chances — Utiliser l'expression « a chances sur b »

Fichier : data/probabilites.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="niveau1": 5 · level="niveau2": 4 · level="niveau3": 6.

## probabilite-issues — Dénombrer les issues possibles et favorables

Fichier : data/probabilites.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="niveau1": 3 · level="niveau2": 5 · level="niveau3": 4.

## probabilite-nombre — Exprimer la probabilité comme un nombre

Fichier : data/probabilites.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="niveau1": 5 · level="niveau2": 4 · level="niveau3": 5.

## produire-formes-interrogatives — Produire différentes formes de phrases interrogatives

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique (6 items) réutilisée × 3 paliers (type "produire-3-formes") — aucun level1Bank/level2Bank/level3Bank.

## ranger-decimaux — Ranger des nombres décimaux

Fichier : data/nombres-decimaux.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## ranger-nombres-entiers — Ranger des nombres entiers

Fichier : data/nombres-entiers.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 8 · lvl2: 8 · lvl3: 8.

## remplacer-gn-sujet-pronom — Remplacer un groupe nominal sujet par un pronom personnel sujet

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlNBank" (lvl1Bank, lvl2Bank, lvl3Bank) au lieu de level1Bank/level2Bank/level3Bank.

## representer-fraction — Représenter une fraction

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (2 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10.

## retrouver-infinitif-verbe-conjugue — Retrouver l'infinitif d'un verbe conjugué puis son groupe

Fichier : data/conjugaison.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level=1: 10 · level=2: 10 · level=3: 10.

## transformer-phrase — Transformer une phrase à la forme négative

Fichier : data/grammaire.js
Statut : STRUCTURE ANORMALE
Détail : Moteur "lvlN" (3 niveau(x) : lvl1, lvl2, lvl3) au lieu de level1Bank/level2Bank/level3Bank — lvl1: 10 · lvl2: 10 · lvl3: 10.

## utiliser-fractions-problemes — Utiliser les fractions dans des problèmes

Fichier : data/fractions.js
Statut : STRUCTURE ANORMALE
Détail : Banque unique "bank" filtrée par champ "level" (3 valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — level="CM1": 12 · level="CM2": 12 · level="6e": 12.

## ortho-distinguer-a-a — Distinguer a / à

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 22/10 items (12 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-ce-se — Distinguer ce / se

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 22/10 items (12 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-et-est — Distinguer et / est

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 22/10 items (12 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-on-ont — Distinguer on / ont

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 22/10 items (12 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-ou-ou — Distinguer ou / où

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 22/10 items (12 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-son-sont — Distinguer son / sont

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 22/10 items (12 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-leur-leurs — Distinguer leur / leurs

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 20/10 items (10 en surplus) ; Niveau 3 : 16/10 items (6 en surplus)

## ortho-distinguer-tout-tous-toute-toutes — tout, tous, toute, toutes

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 12/10 items (2 en surplus) ; Niveau 3 : 22/10 items (12 en surplus)

## ortho-distinguer-ces-ses-cest-sest — ces / ses / c'est / s'est / sait / sais

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 12/10 items (2 en surplus) ; Niveau 3 : 20/10 items (10 en surplus)

## conjuguer-passe-compose-avoir — Le passé composé avec avoir

Fichier : data/conjugaison.js
Statut : SURPLUS
Détail : Niveau 1 : 14/10 items (4 en surplus) ; Niveau 2 : 15/10 items (5 en surplus) ; Niveau 3 : 14/10 items (4 en surplus)

## ortho-distinguer-quel-quelle-quels-quelles — Distinguer quel(s), quelle(s), qu'elle(s)

Fichier : data/orthographe-homophones.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 12/10 items (2 en surplus) ; Niveau 3 : 18/10 items (8 en surplus)

## distinguer-coordination-subordination — Distinguer la coordination de la subordination

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 3 : 12/10 items (2 en surplus)

## etre-ou-avoir — Être ou avoir ?

Fichier : data/conjugaison.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 2 : 12/10 items (2 en surplus)

## identifier-juxtaposition — Distinguer la juxtaposition de la coordination

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 3 : 12/10 items (2 en surplus)

## identifier-nom-phrase — Identifier un nom

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 1 : 14/10 items (4 en surplus)

## identifier-subordination — Distinguer la juxtaposition de la subordination

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus) ; Niveau 3 : 12/10 items (2 en surplus)

## distinguer-phrase-simple-complexe — Distinguer phrase simple et phrase complexe

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 3 : 12/10 items (2 en surplus)

## identifier-adjectif — Identifier un adjectif

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus)

## identifier-verbe-conjugue — Identifier un verbe conjugué

Fichier : data/grammaire.js
Statut : SURPLUS
Détail : Niveau 1 : 12/10 items (2 en surplus)

## ortho-accorder-participe-passe-cod — Accorder le participe passé avec le COD

Fichier : data/orthographe.js
Statut : SURPLUS
Détail : Niveau 3 : 12/10 items (2 en surplus)

## ortho-accorder-participe-passe-etre — Le passé composé avec être

Fichier : data/orthographe.js
Statut : SURPLUS
Détail : Niveau 3 : 12/10 items (2 en surplus)

## Compétences OK (10/10/10 sur le moteur standard)

- accorder-attribut-sujet — Accorder l'attribut du sujet avec le sujet (data/grammaire.js)
- champ-lexical — Identifier un champ lexical (data/vocabulaire.js)
- differencier-cc-temps-lieu-cause — Différencier les compléments circonstanciels de temps, de lieu et de cause (data/grammaire.js)
- distinguer-attribut-sujet-complement-objet — Distinguer l'attribut du sujet et le complément d'objet (data/grammaire.js)
- distinguer-cod-coi — Distinguer le complément d'objet direct (COD) et le complément d'objet indirect (COI) (data/grammaire.js)
- distinguer-conjonctions — Distinguer conjonction de coordination et conjonction de subordination (data/grammaire.js)
- famille-de-mots — Identifier une famille de mots (data/vocabulaire.js)
- identifier-adverbe — Identifier les adverbes (data/grammaire.js)
- identifier-attribut-sujet — Identifier un attribut du sujet (data/grammaire.js)
- identifier-complement-nom — Identifier un complément du nom (data/grammaire.js)
- identifier-conjonction-coordination — Identifier une conjonction de coordination (data/grammaire.js)
- identifier-conjonction-subordination — Identifier une conjonction de subordination (data/grammaire.js)
- identifier-differencier-articles-definis-indefinis — Identifier et différencier les articles définis et indéfinis (data/grammaire.js)
- identifier-differencier-determinants-demonstratifs-possessifs — Identifier et différencier les déterminants démonstratifs et possessifs (data/grammaire.js)
- identifier-groupe-circonstanciel — Identifier un groupe circonstanciel (data/grammaire.js)
- identifier-groupe-sujet — Identifier le groupe sujet (data/grammaire.js)
- identifier-homonyme — Identifier un homonyme (data/vocabulaire.js)
- identifier-nom-noyau-gn — Identifier le nom noyau d'un groupe nominal (data/grammaire.js)
- identifier-prefixe — Identifier un préfixe (data/vocabulaire.js)
- identifier-preposition — Identifier une préposition (data/grammaire.js)
- identifier-pronom-complement-objet — Identifier un pronom personnel complément d'objet (data/grammaire.js)
- identifier-radical — Identifier le radical d'un mot (data/vocabulaire.js)
- identifier-suffixe — Identifier un suffixe (data/vocabulaire.js)
- mot-adapte-contexte — Choisir le mot adapté au contexte (data/vocabulaire.js)
- mot-derive — Former un mot dérivé (data/vocabulaire.js)
- niveaux-de-langue — Distinguer les niveaux de langue (data/vocabulaire.js)
- ordre-alphabetique — Ranger dans l'ordre alphabétique (data/vocabulaire.js)
- origine-mots — Comprendre l'origine des mots (latin, grec) (data/vocabulaire.js)
- polysemie — Comprendre la polysémie d'un mot (data/vocabulaire.js)
- pronom-antecedent — Mettre en relation un pronom personnel avec son antécédent (data/grammaire.js)
- regrouper-par-theme — Regrouper des mots par thème (data/vocabulaire.js)
- remplacer-gn-complement-pronom — Remplacer un groupe nominal complément par un pronom personnel (data/grammaire.js)
- reperer-propositions — Repérer les propositions dans une phrase complexe (data/grammaire.js)
- sens-propre-figure — Identifier le sens propre et le sens figuré (data/vocabulaire.js)
- trouver-antonyme — Trouver un antonyme (data/vocabulaire.js)
- trouver-synonyme — Trouver un synonyme (data/vocabulaire.js)

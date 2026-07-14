# Audit — Exercices sans LevelSelect

Périmètre : les 39 exercices d'`exercise-data.js` dont le type ne passe pas par le composant
`LevelSelect` (voir [DOCUMENTATION.md § 6.8](DOCUMENTATION.md#68-historique-des-lots-levelselect)
pour le contexte complet et la correction de périmètre 43 → 39).

Recommandations : **(a)** créer de vrais niveaux progressifs · **(b)** garder en mono-niveau assumé ·
**(c)** fusionner avec un exercice existant · **(d)** supprimer.

La colonne **Décision** est laissée vide pour validation ligne par ligne.

---

## Hors périmètre — déjà traité ou à part

4 exercices exclus du décompte des 43 initiales : ils utilisent déjà `LevelSelect` via un mécanisme
générique (`showLevelSelect()` / `showAccordLevelSelect()`) que le filtre "type se termine par
`-niveaux`" ne détectait pas — `produire-formes-interrogatives` (CM1/CM2/6e, seuil 80 %),
`ortho-accorder-determinant-nom` et `ortho-accorder-adjectif-nom` (niveaux par difficulté
CM1/CM2/6e), `ortho-mots-invariables` (niveaux + verrouillage dédiés).

26 pages autonomes (10 `ortho-distinguer-*` + 16 `js/lex-*`) ont déjà leurs propres niveaux
verrouillés codés à la main — hors périmètre de cet audit sur validation précédente.

---

## Conjugaison (10)

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `retrouver-infinitif-verbe-conjugue` | Infinitif + groupe | Quiz plat, série de 20 | 32 | b — compétence isolée, un seul palier | |
| `conjuguer-etre-present` | Être au présent | Multi-mode (7 formats au choix), série de 10 | 22 + 3 banques annexes | b — le choix de mode fait déjà office de variété | |
| `conjuguer-avoir-present` | Avoir au présent | Multi-mode (7 formats au choix), série de 10 | 22 + 3 banques annexes | b — même architecture, à garder cohérente avec être-présent | |
| `conjuguer-1er-groupe-present` | 1er groupe au présent | Quiz plat trié par difficulté, série de 25 | 72 | a — `sortByDifficulty` déjà présent, prêt à découper en 3 niveaux | |
| `conjuguer-verbes-particuliers-1er-groupe` | Verbes particuliers du 1er groupe | Quiz plat trié par difficulté, série de 25 | 68 | a — cohérence avec le 1er groupe standard | |
| `conjuguer-2e-groupe-present` | 2e groupe au présent | Quiz plat trié par difficulté, série de 25 | 56 | a — banque assez large pour 3 vrais paliers | |
| `conjuguer-3e-groupe-present` | 3e groupe au présent | Quiz plat trié par difficulté, série de 25 | 55 | a — le plus irrégulier, vrai bénéfice à graduer | |
| `conjuguer-passe-simple` | Passé simple | Quiz plat trié par difficulté, série de 25 | 66 | a — notion difficile, banque déjà triée par difficulté | |
| `retrouver-infinitif-passe-compose` | Infinitif au passé composé | Quiz plat, série de 15 | 25 | b — skill de reconnaissance ponctuel, banque modeste | |
| `identifier-auxiliaire` | Auxiliaire être/avoir | Quiz plat, série de 15 | 26 | b — discrimination binaire simple | |

## Grammaire — Types de phrases (7)

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `identifier-phrase-declarative` | Phrase déclarative | Quiz plat oui/non, série de 15 | 30 | c — fusionner les 5 "identifier-phrase-*" en un exercice progressif (N1 : 2 types → N3 : 5 types) | |
| `identifier-phrase-interrogative` | Phrase interrogative | Quiz plat oui/non, série de 15 | 15 | c — même groupe de fusion | |
| `identifier-phrase-imperative` | Phrase impérative | Quiz plat oui/non, série de 15 | 15 | c — banque de 15 trop mince pour une page à part | |
| `identifier-phrase-negative` | Phrase négative | Quiz plat oui/non, série de 15 | 15 | c — même groupe de fusion | |
| `identifier-phrase-exclamative` | Phrase exclamative | Quiz plat oui/non, série de 15 | 15 | c — dernier des 5 à regrouper | |
| `transformer-declarative-interrogative` | Transformer en interrogative | Quiz plat, série unique | 10 | c — à rapprocher de "transformer-affirmative-negative" en un exercice à 2 volets | |
| `transformer-affirmative-negative` | Transformer en négative | Quiz plat, série unique | 10 | c — regrouper les deux transformations | |

## Grammaire — Déterminants & nature des mots (10)

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `identifier-article-defini` | Articles définis — identifier | Quiz plat, mots cliquables | 6 | c — fusionner identifier → choisir → compléter en 1 exercice à 3 niveaux | |
| `articles-definis-choix` | Articles définis — choisir | Quiz plat, choix d'étiquette | 8 | c — même groupe de fusion | |
| `articles-definis-completer` | Articles définis — compléter | Glisser-déposer, **1 seul item** | 1 | d — un item ne constitue pas un exercice ; absorber comme dernier palier de la fusion, ou supprimer | |
| `identifier-article-indefini` | Articles indéfinis — identifier | Quiz plat, mots cliquables | 6 | c — fusionner avec "première rencontre" en un exercice à 2 niveaux | |
| `articles-indefinis-premiere-rencontre` | Articles indéfinis — 1re/2e mention | Glisser-déposer, série de 4 | 4 | c — banque trop mince seule ; second palier naturel | |
| `identifier-determinant-possessif` | Déterminants possessifs — identifier | Quiz plat, mots cliquables | 10 | c — fusionner avec "dans les phrases" | |
| `possessifs-dans-phrases` | Déterminants possessifs en contexte | Quiz plat, mots cliquables, série de 5 | 5 | c — second palier naturel de l'exercice ci-dessus | |
| `identifier-adjectif` | L'adjectif | Quiz plat, mots cliquables, série de 8 | 14 | b — taille correcte, notion autonome, pas de fusion évidente | |
| `identifier-nom-phrase` | Le nom | Quiz plat, mots cliquables, série de 8 | 20 | b — banque confortable pour un skill isolé | |
| `distinguer-phrase-simple-complexe` | Phrase simple / complexe | Quiz plat en étapes, série de 8 | 16 | a — progression naturelle disponible (2 propositions → 3 → subordination) ; peut absorber "connecteurs" en dernier niveau | |

## Grammaire — Connecteurs (1)

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `phrases-connecteurs` | Relier deux phrases avec un connecteur | Quiz plat, choix d'étiquette, série de 4 | 4 | c — banque trop mince pour une page seule ; dernier niveau naturel de "distinguer-phrase-simple-complexe" | |

## Mathématiques — Fractions (7)

*Miroir exact des exercices de nombres décimaux (comparer/ranger/encadrer/placer/intercaler) déjà migrés en Lot 5 vers `LevelSelect`.*

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `representer-fraction` | Représenter une fraction | Quiz plat, série de 10 | 20 | a — même traitement que comparer/ranger/encadrer-decimaux (Lot 5) | |
| `lire-fraction` | Lire une fraction | Quiz plat, série de 10 | 20 | a — bon candidat pour 3 niveaux (dixièmes → centièmes → millièmes) | |
| `decomposer-fraction-partie-entiere` | Décomposer (partie entière + fraction) | Quiz plat, série de 10 | 36 | a — banque large, miroir direct de decomposer-decimaux | |
| `utiliser-fractions-problemes` | Fractions dans des problèmes | Quiz plat, série de 10 | 36 | a — banque large, se prête à une progression de complexité | |
| `placer-fraction-droite-graduee` | Placer sur une droite graduée | Quiz plat, série de 10 | 20 | a — pendant exact de placer-decimaux-droite (Lot 5, 3/3) | |
| `encadrer-fraction` | Encadrer entre deux entiers | Quiz plat, série de 6 | 16 | a — pendant direct d'encadrer-decimaux | |
| `comparer-fractions` | Comparer deux fractions | Quiz plat, série de 6 | 20 | a — pendant direct de comparer-decimaux | |

## Mathématiques — Nombres entiers (3)

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `ecrire-nombre-entier-chiffres` | Écriture en chiffres | Quiz plat, série de 12 | 30 | a — pendant du couple decomposer/composer-decimaux ; (c) fusion avec "lettres" envisageable | |
| `ecrire-nombre-entier-lettres` | Écriture en lettres | Quiz plat, série de 12 | 30 | a — même remarque de fusion possible avec "chiffres" | |
| `identifier-valeur-chiffre-position` | Valeur positionnelle d'un chiffre | Parcours guidé fixe en 5 étapes | 38 (5 pools) | b — progression interne déjà scénarisée ; la reformater en CM1/CM2/6e casserait ce scénario | |

## Orthographe (1)

| Slug | Notion | Structure actuelle | Items | Reco | Décision |
|---|---|---|---|---|---|
| `ortho-accorder-participe-passe-cod` | Accord du participe passé (COD) | Quiz plat, série de 8 | 20 | a — même famille que les 2 "accord-ecrit" déjà CM1/CM2/6e ; (c) fusion comme 3e volet envisageable | |

---

**Total : 39** — répartition proposée : 11 (a), 10 (b), 17 (c), 1 (d).

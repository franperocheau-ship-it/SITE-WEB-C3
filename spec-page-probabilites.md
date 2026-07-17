# Spécification — Page « Probabilités » (Proficiamus / SITE-WEB-C3)

> Prompt à utiliser dans Claude Code, à la racine du dépôt. Ne commit pas avant validation locale.

## 1. Objectif

Créer une nouvelle catégorie **Probabilités** conforme aux programmes de mathématiques 2025 (cycle 3), entièrement intégrée au site comme les autres compétences :

- une page de catégorie sur le modèle des pages existantes (ex. grammaire), avec fil d'Ariane (`js/breadcrumb.js` + `breadcrumb.css`) ;
- 3 compétences avec **pastilles de niveau** sur le même modèle visuel que les autres pages (CM1 / CM2 / 6e sur la page de catégorie ; **jamais** CM1/CM2/6e dans l'interface des exercices, uniquement « Niveau 1 / 2 / 3 ») ;
- exercices différenciés Niveau 1 → 3 avec **LevelSelect** (`js/level-select.js`, déblocage séquentiel à 80 %) ;
- rendu via `exercise.html` + `exercise-data.js` + `js/exercise-engine.js` (aucune page HTML autonome) ;
- énoncés **illustrés** (voir §4) ;
- enregistrement des résultats via `saveExerciseResult` (table `exercise_results`, colonne `exercise_title` renseignée) ;
- les 3 compétences apparaissent dans l'espace enseignant (accordéons par domaine, sélection dans le **parcours guidé**) et dans les résultats côté enseignant et élève.

**Avant d'écrire du code :** ouvre `exercise-data.js` et une catégorie récente déjà migrée LevelSelect pour reprendre exactement le schéma existant (structure des objets, ids, types d'interaction, gestion des illustrations). Réutilise uniquement les types d'interaction déjà supportés par le moteur (`mots-cliquables`, `choix-etiquette`, `glisser-deposer`, `classification-etapes`, + types standards existants).

## 2. Les 3 compétences (avec pastilles)

| Pastille | Compétence | Intitulé programme 2025 |
|---|---|---|
| CM1 | Utiliser l'expression « a chances sur b » | Comparer des chances, équiprobabilité, événement contraire |
| CM2 | Dénombrer les issues possibles et favorables | Dénombrement en situation d'équiprobabilité (dés, roues, urnes) |
| 6e | Exprimer la probabilité comme un nombre | Échelle 0–1, écritures fraction / décimal / pourcentage, approche fréquentiste |

## 3. Contenu des exercices

### Compétence 1 — « a chances sur b » (pastille CM1)

**Niveau 1 (découverte)**
- Ex. 1 — Sac de billes : 5 rouges, 3 bleues. Compléter : rouge → 5 chances sur 8 ; bleue → 3 chances sur 8.
- Ex. 2 — Boîte de cubes : 4 verts, 2 jaunes, 1 rouge. Vert → 4/7 chances ; jaune → 2/7 ; rouge → 1/7 (formulation « x chances sur 7 »).

**Niveau 2 (situations officielles du programme)**
- Ex. 3 — Pièce équilibrée. Pile → 1 chance sur 2 ; face → 1 chance sur 2 (introduction de « une chance sur deux », équiprobabilité).
- Ex. 4 — Dé équilibré. Obtenir 2 → 1 chance sur 6 ; ne pas obtenir 2 → 5 chances sur 6 (événement qui a plus de chances de ne pas se produire).

**Niveau 3**
- Ex. 5 — Urne : 2 étoiles, 4 cercles, 3 carrés, 1 triangle → chances sur 10 pour chaque forme.
- Ex. 6 — Jeu de 52 cartes. Carte rouge → 26 chances sur 52 ; pas rouge → 26 chances sur 52.

### Compétence 2 — Dénombrer les issues (pastille CM2)

**Niveau 1**
- Ex. 1 — Dé à six faces : lister toutes les issues possibles (1 à 6).
- Ex. 2 — Roue : 6 secteurs noirs, 2 blancs. Issues possibles → 8 ; favorables au noir → 6 ; favorables au blanc → 2.

**Niveau 2**
- Ex. 3 — Dé équilibré, tableau à compléter : nombre pair → 3 issues ; nombre impair → 3 ; obtenir 6 → 1.
- Ex. 4 — Urne : 4 rouges, 2 jaunes, 5 bleues → dénombrement des issues favorables par couleur (total 11).

**Niveau 3**
- Ex. 5 — Boîte de formes (reprendre le modèle de l'urne formes de la compétence 1).
- Ex. 6 — Dé, tableau : multiples de 3 → 2 issues (3, 6) ; inférieur ou égal à 5 → 5 issues ; impair → 3 issues.

### Compétence 3 — La probabilité comme un nombre (pastille 6e)

**Niveau 1 (échelle de probabilité — exemples officiels)**
- Ex. 1 — Placer sur une échelle de 0 à 1 (glisser-déposer) : obtenir un 7 avec un dé → 0 ; obtenir un entier de 1 à 6 → 1 ; pile → 0,5 ; ne pas gagner au loto → très proche de 1 ; obtenir dix fois de suite un 1 → très proche de 0.
- Ex. 2 — Même échelle avec le vocabulaire : impossible / peu probable / une chance sur deux / probable / certain ; associer des événements à ces zones.

**Niveau 2 (exemple exact du programme)**
- Ex. 3 — Urne : 3 boules noires, 7 blanches. P(noire) sous les trois écritures : 3/10 ; 0,3 ; 30 %.
- Ex. 4 — Dé : P(multiple de 3) = 2/6 ; P(supérieur à 2) = 4/6 ; P(inférieur à 2) = 1/6.

**Niveau 3**
- Ex. 5 — Tableau de conversions : 1/2 → 0,5 → 50 % ; 3/4 → 0,75 → 75 % ; 1/10 → 0,1 → 10 %.
- Ex. 6 — Approche fréquentiste : simulation de lancers de pièce (20, puis 100, puis 200). Calculer la fréquence de « pile », comparer à 0,5, constater que la fréquence se rapproche de la probabilité théorique quand le nombre de lancers augmente. Si le moteur ne permet pas de simulation interactive, présenter des séries de résultats pré-générées et faire calculer/comparer les fréquences.

## 4. Illustrations

Chaque énoncé doit être illustré pour faciliter la compréhension. Regarde d'abord comment les exercices existants gèrent les visuels (emoji, SVG inline, images) et suis le même mécanisme. Proposition par situation :

- **Billes / boules / cubes** : pastilles SVG colorées (cercles/carrés) dans les couleurs de l'énoncé, disposées dans un sac/urne stylisé.
- **Pièce** : SVG pièce dorée (`#F5A623`) recto/verso « Pile / Face ».
- **Dé** : SVG des 6 faces avec les points, ou face unique selon l'exercice.
- **Roue** : SVG camembert 8 secteurs (6 noirs, 2 blancs) avec une flèche.
- **Cartes** : représentation simplifiée 26 rouges / 26 noires (icônes ♥♦ / ♠♣), pas de reproduction de cartes sous licence.
- **Échelle 0–1** : barre graduée horizontale (0 — 0,5 — 1) avec zones de dépôt pour le glisser-déposer.
- Respecter la charte : Fredoka, navy `#1A2D6B`, gold `#F5A623`, turquoise `#1DBFA0`.

## 5. Intégration (checklist)

1. **`exercise-data.js`** : nouvelle catégorie « Probabilités », 3 compétences × 3 niveaux × 2 exercices, schéma identique aux catégories existantes.
2. **Page de catégorie** : sur le modèle des 9 pages de catégorie existantes, avec breadcrumb sticky « 🏠 Mon espace › Probabilités › … » ; ajouter la carte « Probabilités » là où les catégories de maths sont listées (espace élève, onglet « Faire des exercices »).
3. **LevelSelect** : déblocage séquentiel à 80 %, progression en sessionStorage (choix assumé pour les postes partagés).
4. **Résultats** : `saveExerciseResult` → `exercise_results` avec `exercise_title` ; vérifier que les requêtes des dashboards gardent le garde-fou `.limit(2000)`.
5. **Espace enseignant** : les 3 compétences apparaissent dans l'accordéon par domaine (Maths → Probabilités) et sont sélectionnables dans le **parcours guidé** (mode « guidé »). Vérifier si l'accordéon se construit dynamiquement depuis `exercise-data.js` ou depuis une liste séparée ; dans le second cas, mettre à jour cette liste.
6. **Espace élève** : les résultats remontent dans « Mes résultats » comme pour toute autre compétence.
7. **CSS** : incrémenter `?v=` sur `styles.css` (et tout CSS modifié) avant commit.
8. **Ne pas aggraver** le bug connu du double chargement de `js/supabase-client.js` dans `exercise.html` (à corriger séparément).
9. **Labels** : « Niveau 1/2/3 » uniquement dans l'interface exercice ; pastilles CM1/CM2/6e uniquement sur la page de catégorie / espace enseignant.
10. **Validation locale** avant tout commit ; ne commit pas sans accord explicite.

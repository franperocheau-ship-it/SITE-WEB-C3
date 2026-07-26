# Contribuer à Proficiamus

Ce document formalise les règles de développement pour tout travail futur sur le site (Cycle 3, LFM). Il s'adresse à quiconque modifie le code — humain ou agent.

## 1. Convention de nommage

- **Fichiers** : `kebab-case` (ex. `français-conjugaison.html`, `exercise-catalog.js`, `data/nombres-decimaux.js`).
- **Variables et fonctions JS** : `camelCase` (ex. `loadCompetenceStats`, `catalogMap`, `sessionData`).
- Les constantes globales "module-level" peuvent rester en `SCREAMING_SNAKE_CASE` quand elles désignent une valeur figée (ex. `EXERCISE_DATA`, `CIMP_SEUIL`) — pratique déjà en usage dans le code existant, à conserver pour la cohérence.

## 2. Un commit = un seul sujet

Un commit ne doit jamais mélanger un correctif (`fix:`) et une nouvelle fonctionnalité (`feat:`), ni deux sujets indépendants entre eux.

- Si un fix est découvert incidemment pendant le développement d'une fonctionnalité, il part dans **son propre commit**, avant ou après, jamais fondu dans le même diff.
- Le projet utilise déjà des préfixes de type conventionnel (`fix:`, `feat:`, `refactor:`) dans l'historique — à poursuivre. Le message décrit le *pourquoi*, pas seulement le *quoi*.
- Corollaire pratique : si le titre du commit a besoin d'un « et » pour tout décrire, c'est probablement deux commits.

## 3. Test manuel obligatoire des 3 espaces avant tout commit

Avant de commiter, vérifier manuellement dans un navigateur qu'aucune régression n'a été introduite dans :

1. **Espace élève** (`dashboard-eleve.html`, une page d'exercice via `exercise.html`, `remediation.html`) ;
2. **Espace enseignant** (`classes-enseignant.html`, `pilotage-enseignant.html`, `resultats-enseignant.html`, `remediations-enseignant.html`) ;
3. **Espace admin** (`dashboard-admin.html`).

Le test porte au minimum sur : absence d'erreur console au chargement, et un parcours fonctionnel représentatif de l'espace (pas seulement l'ouverture de la page). Une modification qui ne touche qu'un seul espace en apparence peut casser un autre espace via une donnée ou un script partagé (`EXERCISE_DATA`, `js/auth.js`, `js/teacher-analytics.js`, etc.) — c'est justement ce que ce test doit détecter.

## 4. Cache-busting : incrémenter `?v=` à chaque modification

Tous les fichiers CSS/JS chargés avec un paramètre `?v=N` (ex. `<script src="js/level-select.js?v=3">`) doivent voir ce numéro incrémenté **à chaque modification du contenu du fichier**, dans **toutes** les pages qui le référencent.

- Oublier d'incrémenter expose les utilisateurs à une version mise en cache par leur navigateur — bug silencieux, difficile à diagnostiquer à distance.
- Avant de commiter, grep le nom du fichier modifié dans tout le repo pour s'assurer que chaque balise `<script src="...">` ou `<link href="...">` qui le cible a bien été mise à jour, pas seulement la première trouvée.

## 5. Modifications sur `data/*.js` ou le moteur d'exercice : tester toutes les catégories

Toute modification touchant un fichier `data/*.js` (conjugaison, grammaire, orthographe, nombres-entiers, fractions, nombres-decimaux, probabilites) ou la logique moteur d'exercice (`js/exercise-engine.js` selon la documentation d'architecture cible ; actuellement le bloc moteur inline de `exercise.html`) doit être testée sur **toutes les catégories d'exercices**, pas seulement celle qui a été ajoutée ou modifiée.

- Raison : `data/index.js` et les chargeurs paresseux (`pilotage-enseignant.html`, `resultats-enseignant.html`, `remediations-enseignant.html`, `dashboard-admin.html`) dépendent de la présence de **tous** les fichiers de domaine pour reconstituer `EXERCISE_DATA` en entier — une régression dans un seul fichier de domaine peut casser des pages qui ne touchent pas directement ce domaine.
- En pratique : après une modification, ouvrir au moins une page de chaque domaine (`français-conjugaison.html`, `français-grammaire.html`, `français-orthographe.html`, `mathématiques-nombres-entiers.html`, `mathématiques-fractions.html`, `mathématiques-nombres-decimaux.html`, `mathématiques-probabilites.html`) et une page enseignant qui agrège le catalogue complet (ex. `pilotage-enseignant.html`), et vérifier l'absence d'erreur console.

## 6. Suppression de table en production : jamais sans sauvegarde

Une fois que le site aura de vrais utilisateurs (élèves/enseignants avec des données réelles en base), **aucune suppression de table** (`DROP TABLE`, migration destructive) ne doit être exécutée en production sans :

1. Un export/dump préalable de la table concernée ;
2. Une vérification que l'export est restaurable (pas seulement qu'il existe) ;
3. Une confirmation explicite que la suppression est voulue et irréversible, avant exécution.

Cette règle s'applique aussi aux migrations qui *modifient* une table de façon destructive (colonne supprimée, contrainte resserrée sur des données existantes), pas seulement au `DROP TABLE` littéral.

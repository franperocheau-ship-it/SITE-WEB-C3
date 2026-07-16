# Refonte de l'espace enseignant — Proficiamus

**Statut : chantier terminé (Lots A à D).** Ce document a été écrit comme plan
avant implémentation ; il est mis à jour à la fin pour refléter ce qui a
réellement été construit, notamment là où des découvertes en cours de route
ont changé l'approche initiale. Conservé comme doc de référence du chantier.

## Objectif (atteint)

Restructurer l'espace enseignant en **4 onglets** :

**Mes classes · Pilotage des compétences · Résultats · Remédiations**

L'onglet/section "Export CSV" disparaît en tant que tel ; la fonction JS est conservée et déplacée dans Résultats sous forme de bouton.

---

## 1. Onglet « Mes classes » — Lot B

### Vue liste
- Cartes ou lignes : nom de la classe, effectif, date de création.
- Clic sur une classe → vue détail élèves.

### Vue détail d'une classe
Table des élèves (`display_name` uniquement — contrainte RGPD, jamais nom/email) avec colonne **Actions** :
- ✏️ **Modifier** : display_name (modale simple).
- 🗑️ **Supprimer** : retrait de l'élève de la classe (résultats `exercise_results` conservés, seul le lien classe est rompu).
- 👥 **Groupe** : assignation à un groupe de besoin.

### Groupes de besoin — ÉCART avec le plan initial

Le plan prévoyait une migration `groups` + `group_members` (M:N, un élève dans
plusieurs groupes). **Découverte au début du Lot B** : un système de groupes
existait déjà, livré le jour même par un chantier antérieur (v9, "parcours
guidé différencié") :
- `public.groups` (`class_id`, `name`, `color`)
- `students.group_id` — **un seul groupe par élève** (partition, pas M:N)
- `group_active_exercises` / `student_active_exercises` — ciblage des
  exercices actifs du parcours guidé, par groupe ou par élève

Décision prise (voir "Discussions en cours de route" plus bas) : **réutiliser
ce système tel quel** plutôt que de créer `group_members`. Aucune migration
SQL pour ce lot. Le travail du Lot B a donc été uniquement UI :
- Bouton « 👥 Gérer les groupes » déplacé hors du panneau conditionnel
  "Parcours guidé" (il n'était visible qu'en mode guidé) vers la section
  Élèves, toujours accessible.
- Pastille de couleur à côté du sélecteur de groupe, mise à jour immédiate.
- Rappels explicites (modale de gestion, tooltip colonne Groupe, légende sous
  le sélecteur de cible) que les groupes pilotent aussi les exercices du
  parcours guidé — pour éviter la confusion entre appartenance à un groupe et
  ciblage d'exercices.
- Correctifs UX (ajoutés lors du Lot C, voir plus bas) : badge « 🔒 Liste
  perso » + bouton de réinitialisation dans le tableau Élèves, avertissement
  au moment de réaffecter un groupe à un élève ayant une liste personnalisée.

---

## 2. Onglet « Pilotage des compétences » — Lot C

### Écart majeur avec le plan initial

Le plan affirmait qu'un « chantier en cours du toggle libre/guidé » existait
déjà à absorber. **Réalité découverte en creusant avant le Lot C** : ce
chantier existait bien, mais c'est un système **v7/v8/v9** complet et
indépendant, portant sur un axe totalement différent de celui visé par ce
lot :

| | Système v7/v9 (déjà en prod) | Ce que "Pilotage" devait ajouter |
|---|---|---|
| Contrôle | Visibilité du catalogue (quels exercices apparaissent) | Déverrouillage des niveaux à l'intérieur d'un exercice |
| Stockage | `classes.mode_acces` (`libre`/`guide`), `class_active_exercises`, `group_active_exercises`, `student_active_exercises` | Rien n'existait |
| RPC | `get_my_guided_access()` | À créer |
| Composant élève | `js/guided-access.js` | `js/level-select.js` (déjà là, mais 100 % client, aucune notion de réglage par classe) |

Les deux systèmes sont **orthogonaux** (un exercice peut être visible au
catalogue ET en niveaux ouverts, ou l'inverse) et ne devaient pas être
fusionnés. D'où les décisions suivantes, différentes du plan initial :

- **Nouvelle table `competence_settings`**, clé sur **`(class_id, exercise_id)`**
  — pas sur un `competence_id` texte comme prévu au plan, pour rester cohérent
  avec la convention déjà en place (`class_active_exercises` etc. sont tous
  clés sur `exercise_id`, le slug).
- **Colonne `niveau_mode`**, valeurs **`'progressif'` / `'ouvert'`** — pas
  `mode` / `'libre'` / `'guide'` comme au plan, précisément pour ne jamais
  confondre ce réglage avec `mode_acces` (catalogue). Dans l'UI : toujours
  « Niveaux progressifs / Niveaux ouverts », jamais « libre/guidé » pour ce
  réglage-ci.
- **Défaut `'progressif'`** (pas `'guide'`) — reste le nom neutre cohérent
  avec la colonne.
- **RPC dédiée `get_my_niveau_mode(p_exercise_id)`** plutôt que d'étendre
  `get_my_guided_access()` — appelants différents (une page de compétence n'a
  besoin que du réglage de son propre exercice, pas de la liste complète des
  exercices actifs de la classe). `GRANT` à `authenticated` **et** `anon`
  (différence volontaire avec `get_my_guided_access()`) car ce site a un vrai
  usage visiteur non connecté sur les pages d'exercice autonomes.
- **Le panneau existant "Mode d'accès aux exercices" (v7/v9) a été
  physiquement déplacé** de `classes-enseignant.html` vers
  `pilotage-enseignant.html` (Section 1, « Exercices visibles »), avec un
  sélecteur de classe en haut de page puisque ce n'est plus imbriqué dans la
  fiche d'une classe. `classes-enseignant.html` ne garde qu'un lien « Piloter
  les exercices de cette classe → ».
- La nouvelle UI de progression par compétence est la **Section 2** de
  `pilotage-enseignant.html` : accordéons domaine → compétence (visuel
  emprunté au bilan de Résultats, pas à l'arbre d'exercices de la Section 1),
  toggle Progressif/Ouvert, boutons « Tout progressif »/« Tout ouvert » par
  domaine. Ne couvre que les exercices d'`exercise-data.js` ayant plus d'un
  niveau (les exercices "autonomes" hors `exercise-data.js` restent en
  progressif par défaut, limite connue).

### Impact côté élève (`js/level-select.js`)
- Nouveau module `js/niveau-mode.js` (miroir de `guided-access.js`), une
  requête par instance de `LevelSelect`, résolue au plus une fois.
- Rendu toujours immédiat en `'progressif'` (comportement historique, aucun
  flash vide), puis un seul re-rendu si le réglage résolu est `'ouvert'` —
  jamais l'inverse : un élève ne voit jamais un niveau se reverrouiller sous
  ses yeux.
- Élève sans classe / non connecté / erreur réseau → `'progressif'`, jamais
  d'erreur bloquante (y compris pour `anon`, grâce au `GRANT` ci-dessus).

---

## 3. Onglet « Résultats » — Lot A

- Dashboard existant conservé (accordéons domaine/compétence, filtre par classe, export PDF via `window.print()`).
- **Écart avec le plan** : en creusant, le bouton « Exporter (CSV) » à côté de
  l'impression **existait déjà** dans `resultats-enseignant.html` (par
  classe, respectant déjà le filtre actif) — ce n'était pas à construire. Le
  vrai travail du Lot A a été de supprimer la carte « Export CSV » du
  dashboard enseignant (export global, non filtré, redondant), sans toucher
  à l'export déjà en place.
- Filtre par groupe de besoin dans Résultats : **non fait**, reporté (pas
  demandé depuis).

---

## 4. Onglet « Remédiations » — Lot D

### Écart majeur avec le plan initial

Le plan affirmait qu'une « infrastructure `remediation-data.js` /
`remediation.html` déjà en place, vue duale élève/enseignant existante »
existait. **Recherche exhaustive avant le Lot D : cette infrastructure
n'existait pas du tout**, ni les fichiers, ni un quelconque pattern
`?demo=1`. Construction intégrale, et **volet enseignant uniquement** pour ce
chantier — le volet élève (proposition de fiche après un score faible) est
explicitement reporté à un chantier ultérieur, non implémenté (un commentaire
dans `remediation.html` signale où le brancher plus tard sans en anticiper la
structure).

### Seuil

**`REMEDIATION_THRESHOLD = 70`** (constante nommée dans
`remediations-enseignant.html`), pas 60 comme proposé initialement. Un élève
est en difficulté sur une compétence si son meilleur score sur les exercices
de cette compétence est `< 70 %`, avec au moins une tentative.

### Affichage (conforme au plan)
- Sélecteur de classe (`?class=<id>`, même patron que Pilotage : repli
  silencieux sur la première classe si le paramètre est absent/invalide).
- Liste des compétences chutées triée par nombre d'élèves décroissant,
  dépliable (display_name + meilleur score), lien vers
  `remediation.html?competence=<libellé encodé>&class=<id>`.
- Si aucune compétence chutée : message positif.

### `remediation-data.js` — écart / précision

Clé = libellé exact de `competence` dans `exercise-data.js` (pas d'id
synthétique). Fragilité assumée et documentée en tête du fichier (un
renommage de libellé rend une fiche orpheline silencieusement) ; atténuée par
un contrôle au chargement de `remediations-enseignant.html`
(`checkRemediationDataOrphans()`) qui `console.warn` toute clé sans
correspondance dans `EXERCISE_DATA`. Fichier livré quasi vide
(`REMEDIATION_DATA = {}`), avec un exemple complet en commentaire à
copier-coller. Une compétence chutée dont la fiche est absente ou vide
affiche « 📝 Fiche à compléter » à la place du lien.

### Requêtes
- Nouvelle fonction `lfmTeacher.getRemediationRawData(classId)` : agrégation
  brute (meilleur `pct` par élève × `exercise_slug`), `.limit(2000)`
  explicite. Ne référence jamais `EXERCISE_DATA` — reste une couche Supabase
  pure ; le rollup par compétence se fait côté page
  (`remediations-enseignant.html`), avec import direct d'`exercise-data.js`
  (pas de duplication).
- **Doublon pré-existant repéré, hors périmètre** : `resultats-enseignant.html`
  maintient sa propre copie manuelle (`EXERCISE_META`) du mapping
  slug→{domaine, compétence} au lieu d'importer `exercise-data.js` comme les
  deux autres pages. TODO laissé dans le code, non traité dans ce chantier.

---

## Discussions en cours de route (décisions prises pendant le chantier)

Ces points n'étaient pas anticipés au plan initial et ont été tranchés en
cours de route, avec validation explicite avant implémentation à chaque
fois :

1. **Groupes (Lot B)** : réutiliser le système v9 existant (1 groupe/élève)
   plutôt que créer le M:N `group_members` prévu au plan — pour ne pas faire
   cohabiter deux notions de "groupe" différentes sur la même table, et ne
   pas risquer de régression sur le parcours guidé déjà en prod.
2. **Pilotage (Lot C)** : `competence_settings` clé sur `exercise_id` (pas un
   id de compétence libre), RPC dédiée plutôt qu'extension de
   `get_my_guided_access()`, panneau "Mode d'accès" déménagé physiquement
   vers Pilotage plutôt que dupliqué.
3. **Bug de priorité groupe vs liste personnelle** (découvert en testant le
   Lot B) : un élève ajouté à un groupe peut avoir une liste personnelle
   héritée d'un état antérieur (`student_active_exercises`) qui prime
   silencieusement sur le groupe (résolution `élève > groupe > classe` de
   `get_my_guided_access()`, comportement voulu mais peu visible). Corrigé
   lors du Lot C : badge, avertissement et bouton de réinitialisation dans le
   tableau Élèves et dans le panneau de ciblage.
4. **Remédiations (Lot D)** : infrastructure `remediation.html` /
   `remediation-data.js` inexistante malgré l'affirmation du plan — construite
   intégralement, volet enseignant uniquement.

---

## Ordre d'implémentation (réalisé)

1. **Lot A — Structure** ✅ : navigation 4 onglets, suppression de la carte
   Export CSV globale du dashboard (l'export par classe existait déjà dans
   Résultats).
2. **Lot B — Groupes** ✅ : pas de migration (réutilisation v9), UI de gestion
   toujours accessible dans Mes classes.
3. **Lot C — Pilotage** ✅ : migration `competence_settings` (v10) + RLS + RPC
   dédiée, déménagement du panneau "Mode d'accès" + nouvelle UI de
   progression, branchement `js/level-select.js` + `js/niveau-mode.js`,
   correctifs UX groupe/liste perso.
4. **Lot D — Remédiations** ✅ : `remediation-data.js` + `remediation.html` +
   refonte de `remediations-enseignant.html`, volet enseignant uniquement.

Chaque lot : validation locale avant commit, `?v=` incrémenté sur tout script
CSS/JS modifié (pas seulement `styles.css` — `level-select.js`, `teacher.js`,
`niveau-mode.js` ont été versionnés au fil des lots).

---

## Rappels techniques projet

- Supabase projet `wugqxkiljayqqnzdctuf` ; edge functions → clé service_role **Legacy** (pas `sb_secret`).
- RGPD : uniquement `display_name` affiché, partout.
- Design system : Fredoka, navy `#1A2D6B`, gold `#F5A623`, turquoise `#1DBFA0` ; niveaux 4/5 : `#E0765C` / `#7C5CBF`.
- Requêtes Supabase : `.limit(2000)` systématique sur les tables de résultats.
- Cache-busting : incrémenter `?v=` sur **tout** fichier CSS/JS modifié (pas seulement `styles.css`), sur toutes les pages qui le chargent — pas seulement celle qu'on vient de modifier.

## Reporté / non traité dans ce chantier

1. Filtre par groupe de besoin dans l'onglet Résultats.
2. Volet élève des Remédiations (proposition de fiche après un score faible).
3. Nettoyage du doublon `EXERCISE_META` dans `resultats-enseignant.html` (TODO laissé dans le code).
4. `getClassResults()` (`js/teacher.js`) n'a pas de `.limit(2000)` explicite — repéré en cours de route, pré-existant, non corrigé (hors périmètre des lots traités).

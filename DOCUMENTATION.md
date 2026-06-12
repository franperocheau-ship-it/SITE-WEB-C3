# Documentation — LFM Cycle 3
## Espace d'apprentissage numérique — Lycée Français de Madrid

---

## Table des matières

1. [Configuration de Supabase](#1-configuration-de-supabase)
2. [Déploiement sur GitHub Pages](#2-déploiement-sur-github-pages)
3. [Créer un compte enseignant](#3-créer-un-compte-enseignant)
4. [Créer une classe](#4-créer-une-classe)
5. [Créer des élèves et distribuer leurs identifiants](#5-créer-des-élèves-et-distribuer-leurs-identifiants)
6. [Maintenance et évolution du projet](#6-maintenance-et-évolution-du-projet)

---

## 1. Configuration de Supabase

### 1.1 Créer le projet

1. Rendez-vous sur [supabase.com](https://supabase.com) et créez un compte.
2. Cliquez sur **New project** et renseignez :
   - **Name** : `lfm-cycle3` (ou autre)
   - **Database Password** : choisissez un mot de passe fort
   - **Region** : `West EU (Ireland)` recommandé
3. Attendez ~2 minutes que le projet soit prêt.

### 1.2 Récupérer les clés d'API

Dans le dashboard Supabase → **Settings → API** :

- Copiez **Project URL** → c'est votre `SUPABASE_URL`
- Copiez **anon public** → c'est votre `SUPABASE_ANON`

Ouvrez le fichier `js/supabase-client.js` et remplacez les placeholders :

```javascript
const SUPABASE_URL  = 'https://XXXXXXXXXXXXXXXX.supabase.co';  // ← coller ici
const SUPABASE_ANON = 'VOTRE_CLÉ_ANON_PUBLIQUE';               // ← coller ici
```

> **Important :** La clé `anon` est publique et destinée au navigateur. Ne jamais utiliser la clé `service_role` côté client.

### 1.3 Créer le schéma de base de données

Dans **Supabase Dashboard → SQL Editor → New query**, exécutez le contenu du fichier `supabase-schema.sql` en deux étapes :

**Étape 1** — Copiez-collez tout le contenu du fichier et cliquez **Run**.

**Étape 2** — Désactivez la confirmation par e-mail (nécessaire pour la connexion des élèves) :

Dans **Authentication → Settings → Email Auth** :
- Décochez **Enable email confirmations**
- Cliquez **Save**

### 1.4 Créer le compte administrateur

1. Dans **Authentication → Users → Invite user**, invitez l'adresse e-mail de l'administrateur.
2. L'administrateur reçoit un e-mail et définit son mot de passe.
3. Dans **SQL Editor**, exécutez la commande suivante en remplaçant l'e-mail :

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@lfmadrid.es');
```

L'administrateur peut maintenant se connecter via **Espace administrateur** dans le menu.

---

## 2. Déploiement sur GitHub Pages

### 2.1 Préparer le dépôt

```bash
git init
git add .
git commit -m "Initial commit"
```

Créez un dépôt GitHub (public ou privé avec GitHub Pages activé) et poussez :

```bash
git remote add origin https://github.com/votre-compte/lfm-cycle3.git
git push -u origin main
```

### 2.2 Activer GitHub Pages

Dans les **Settings** du dépôt GitHub → **Pages** :
- **Source** : Deploy from a branch
- **Branch** : `main` / `root`
- Cliquez **Save**

Le site sera accessible à `https://votre-compte.github.io/lfm-cycle3/` dans quelques minutes.

### 2.3 Ajouter l'URL du site dans Supabase

Dans **Authentication → URL Configuration** :
- **Site URL** : `https://votre-compte.github.io/lfm-cycle3`
- **Redirect URLs** : ajoutez la même URL

Cela est nécessaire pour que les redirections après authentification fonctionnent correctement.

### 2.4 Déployer une mise à jour

```bash
git add .
git commit -m "Description de la modification"
git push
```

GitHub Pages se met à jour automatiquement en quelques secondes.

---

## 3. Créer un compte enseignant

### Via la page de connexion

1. Ouvrez le menu hamburger (coin supérieur droit).
2. Cliquez sur **Espace enseignant**.
3. Cliquez sur l'onglet **Créer un compte**.
4. Renseignez votre prénom, nom, adresse e-mail et un mot de passe (8 caractères minimum).
5. Un e-mail de confirmation est envoyé — cliquez sur le lien pour activer le compte.

> **Note :** Si la confirmation par e-mail est désactivée dans Supabase (recommandé pour les projets scolaires), la connexion est immédiate après inscription.

### Vérifier le compte dans Supabase

Dans **Authentication → Users**, le nouvel enseignant apparaît avec le rôle `enseignant` dans la table `profiles`.

---

## 4. Créer une classe

1. Connectez-vous à votre **Espace enseignant**.
2. Cliquez sur la card **Mes classes**.
3. Cliquez sur **+ Nouvelle classe**.
4. Renseignez :
   - **Nom** : ex. `CM2-B`
   - **Niveau** : CM1, CM2 ou 6e
   - **Année scolaire** : ex. `2025-2026`
5. Cliquez **Créer**.

La classe apparaît dans votre tableau de bord. Vous pouvez en créer plusieurs (une par groupe ou niveau).

---

## 5. Créer des élèves et distribuer leurs identifiants

### 5.1 Créer un élève

1. Dans **Mes classes**, cliquez sur une classe pour l'ouvrir.
2. Cliquez sur l'onglet **Élèves**, puis **+ Ajouter un élève**.
3. Saisissez le prénom et nom de l'élève. Le système génère automatiquement :
   - Un **identifiant** (ex. `jean.dupont`)
   - Un **mot de passe** (ex. `soleil42`)
4. Ces identifiants s'affichent à l'écran une seule fois — notez-les ou imprimez-les.

> Le système crée également un compte Supabase pour l'élève. Celui-ci utilisera son identifiant et son mot de passe pour se connecter.

### 5.2 Distribuer les identifiants

**Option 1 — Impression individuelle**
Lors de la création, cliquez sur **🖨 Imprimer** pour imprimer une fiche individuelle.

**Option 2 — Export CSV**
Dans la liste des élèves, cliquez sur **Export CSV**. Le fichier contient :
- Nom de l'élève
- Identifiant
- Mot de passe
- Classe

Ce fichier peut être ouvert dans Excel ou Numbers pour imprimer des étiquettes ou fiches.

**Option 3 — Export global (administrateur)**
Dans l'espace administrateur, cliquez sur **Export global CSV** pour télécharger tous les élèves de tous les enseignants.

### 5.3 Connexion de l'élève

L'élève se connecte via **Espace élève** dans le menu hamburger :
- **Identifiant** : `jean.dupont` (sans `@lfm-c3.eleve`)
- **Mot de passe** : le mot de passe généré

L'élève accède à son tableau de bord personnel avec ses statistiques et son historique.

### 5.4 Réinitialiser le mot de passe d'un élève

Actuellement, la réinitialisation se fait manuellement dans **Supabase → Authentication → Users** : cherchez l'e-mail `jean.dupont@lfm-c3.eleve` et cliquez **Send password reset**.

Mettez ensuite à jour le champ `password` dans la table `students` pour garder le CSV synchronisé.

---

## 6. Maintenance et évolution du projet

### 6.1 Structure des fichiers

```
/
├── index.html                      Page d'accueil
├── français.html                   Hub matière Français
├── français-grammaire.html         Navigateur compétences Grammaire
├── français-conjugaison.html       Navigateur compétences Conjugaison
├── français-orthographe.html       Navigateur compétences Orthographe
├── français-lexique.html           Navigateur compétences Lexique
├── mathématiques.html              Hub matière Mathématiques
├── mathématiques-*.html            Navigateurs compétences Maths
├── exercise.html                   Moteur d'exercices universel
├── exercise-data.js                Données de tous les exercices
├── auth.html                       Page de connexion (3 rôles)
├── dashboard-enseignant.html       Dashboard enseignant
├── dashboard-eleve.html            Dashboard élève
├── dashboard-admin.html            Dashboard administrateur
├── classes-enseignant.html         Gestion classes et élèves
├── resultats-enseignant.html       Tableau de bord résultats
├── styles.css                      Design system partagé
├── supabase-schema.sql             Schéma BDD + RLS (référence)
├── js/
│   ├── supabase-client.js          Initialisation client Supabase
│   ├── auth.js                     Fonctions d'authentification
│   ├── menu.js                     Menu hamburger
│   ├── teacher.js                  API enseignant
│   ├── admin.js                    API administrateur
│   └── results.js                  Sauvegarde des résultats
└── assets/
    └── lfm-logo.svg                Logo LFM
```

### 6.2 Ajouter un exercice

1. Ajoutez les données de l'exercice dans `exercise-data.js` en suivant le format existant.
2. Dans `exercise.html`, les 4 scripts doivent être présents en `<head>` pour activer la sauvegarde des résultats :
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="js/supabase-client.js"></script>
   <script src="js/auth.js"></script>
   <script src="js/results.js"></script>
   ```
3. Appelez `saveExerciseResult({...})` dans la fonction qui affiche les résultats finaux.

### 6.3 Ajouter un nouveau niveau

Le système supporte CM1, CM2 et 6e. Pour ajouter un niveau :
1. Modifiez la contrainte SQL : `CHECK (level IN ('CM1', 'CM2', '6e', 'NOUVEAU'))`.
2. Ajoutez la classe de badge CSS correspondante dans `styles.css`.
3. Mettez à jour les formulaires de création de classe.

### 6.4 Sécurité (RLS)

Les politiques Row Level Security garantissent :

| Acteur | Ce qu'il peut voir |
|---|---|
| Visiteur anonyme | Exercices uniquement (pas d'accès aux tables) |
| Élève connecté | Ses propres résultats et sa propre fiche |
| Enseignant connecté | Ses classes, ses élèves, les résultats de ses élèves |
| Administrateur | Tout |

Le schéma SQL complet est dans `supabase-schema.sql`. Les modifications de RLS doivent être exécutées dans **Supabase → SQL Editor**.

### 6.5 Changer les couleurs ou le design

Toutes les variables de design sont dans `styles.css` :

```css
--blue: #102B6A;   /* Bleu marine principal */
--red:  #D62839;   /* Rouge accent */
--bg:   #F8FAFC;   /* Fond de page */
```

### 6.6 Fin d'année scolaire

En fin d'année :
1. Exportez tous les identifiants via l'export global (espace admin).
2. Dans Supabase, vous pouvez archiver ou supprimer les données de la promotion sortante.
3. Créez de nouvelles classes pour la rentrée suivante.
4. Les résultats historiques restent dans `exercise_results` tant que les comptes élèves existent.

### 6.7 Support et retours

Pour signaler un problème ou proposer une amélioration, créez une issue sur le dépôt GitHub du projet.

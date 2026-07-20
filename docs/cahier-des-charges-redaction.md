# Cahier des charges — Module « ✍️ Rédaction » (Joggings d'écriture)

**Projet :** Proficiamus (proficiamus.eu, repo SITE-WEB-C3)
**Version :** 2.1 — pivot « générateur de premier jet », amende la Phase 2
**Date :** 19 juillet 2026 (v1.0 matin, v2.0 soir), 20 juillet 2026 (v2.1)

> **Changement v2.0 → v2.1 :** le module n'est plus positionné comme un
> outil qui corrige numériquement jusqu'à une version finale « propre ».
> Il devient un **générateur de premier jet** : l'élève tape et retravaille
> son texte à l'écran (guidé par Grammalecte, inchangé), puis un bouton
> génère un **support imprimable en 2 pages** — la première pour la
> correction manuscrite de l'enseignant, la seconde pour que l'élève y
> recopie à la main sa version corrigée. **La zone de reformulation
> numérique livrée en Phase 2 est retirée** et remplacée par ce circuit
> papier — voir la Phase 2bis en section 7.

---

## 1. Analyse de l'existant : sur quoi ce module s'appuie

### 1.1 Architecture actuelle

| Élément | État actuel | Conséquence pour le module |
|---|---|---|
| Front | Vanilla HTML/CSS/JS, GitHub Pages (site 100 % statique) | Grammalecte est du JS pur : il s'intègre comme n'importe quelle bibliothèque cliente, **sans Edge Function ni secret** pour la correction elle-même |
| Données | Supabase (auth, `profiles`, `classes`, `exercise_results`, plan free/lfi/pro) | Les productions d'élèves rejoignent le même modèle : RLS par élève / par classe. Écriture directe depuis le client (RLS-protégée) |
| Catalogue d'exercices | `exercise-data.js` statique + moteur `js/exercise-engine.js`, rendu via `exercise.html?param` | Le catalogue des joggings suit le même patron : **fichier statique `jogging-data.js`** |
| Design system | Fredoka, navy `#1A2D6B`, gold `#F5A623`, turquoise `#1DBFA0` ; cartes, pastilles de niveau, badges, fil d'Ariane (`js/breadcrumb.js`) | **Pas de composant CSS partagé pour les cartes/boutons/jauges** (voir §1.2) : le module reprend les valeurs visuelles à l'identique dans `css/jogging.css`. Seuls `level-select.css` et `laurels.css` sont réellement importables tels quels. |
| Espaces | Élève (onglets, `?tab=` géré), Enseignant (pages séparées `.main-tab`, sans gestion `?tab=`), Admin | Onglet élève « Mes joggings d'écriture » ; page enseignant dédiée `synthese-joggings-enseignant.html` en 5e `.main-tab` |
| Edge Functions | Deux patrons coexistent | **Aucune Edge Function nécessaire pour ce module** |
| PDF | Bulletin via `window.print()` + CSS print | Réutilisé pour le bilan de fin d'année **et** pour le nouveau générateur de premier jet (§5.5, §5.9) |
| Pièges connus | `.limit(2000)`, RGPD `display_name` uniquement, cache-busting `?v=` | Repris tels quels partout |

### 1.2 Vérification effectuée et décisions actées (rapport Claude Code, 19 juillet 2026)

1. **Composants « cartes/boutons/pastilles » : pas de composant partagé à importer.** `.skill-card`, `.hub-card`, `.ex-validate-btn` dupliqués en `<style>` inline par page. Seuls `level-select.css` et `laurels.css` sont centralisés. **Décision : copie des règles visuelles dans `css/jogging.css`.**

2. **Navigation enseignant : nouvelle page dédiée.** `resultats-enseignant.html` n'a pas de gestion `?tab=`. **Décision : `synthese-joggings-enseignant.html` en 5e `.main-tab`.**

3. ~~Edge Functions~~ — sans objet, aucune n'est nécessaire.

4. **RLS élève↔classe : table `students`, pas `class_memberships`** pour l'outillage admin/enseignant ; `classes.teacher_id` pour les policies directement liées à une classe (ex. `jogging_class_settings`).

5. ~~Clé `service_role` Legacy~~ — sans objet.

6. **`classes.mode_acces` confirmé** (rapport Phase 4, 21/07/2026) : colonne `text`, valeurs `'libre'` / `'guide'`. **Découverte associée :** la policy `classes_select_enrolled_student` est inopérante (repose sur `class_memberships`, jamais peuplée) — contournée via la RPC `get_my_guided_access()` déjà utilisée ailleurs dans le projet, à réutiliser pour toute nouvelle lecture élève sur `classes`.

---

## 2. Reformulation de la demande (mise à jour v2.1)

Tu veux ajouter à Proficiamus un **générateur de premier jet** : l'élève écrit un court texte à partir d'une consigne (« jogging d'écriture »), reçoit une correction automatique, et peut retravailler son texte à l'écran (jusqu'à trois versions) — guidé par un tableau de feux tricolores par critère de la grille **Code Champion** (C-H-A-M-P-I-O-N-S), affiché **sous le texte, pleine largeur**.

**La correction automatique** repose sur **Grammalecte**, un correcteur grammatical français open source tournant côté client (coût nul, aucune limite d'échelle). Il couvre fiablement **7 des 9 critères** : O, M, P, C, H, A, S. Le critère **N (Néant — mot manquant)** reste hors de portée d'un outil à base de règles.

**Ce que devient le texte ensuite — le cœur du pivot v2.1 :** il n'y a plus de correction numérique « finale », ni de zone où l'enseignant retape sa reformulation à l'écran. À la place, un bouton génère un **document imprimable en deux pages** :
- **Page 1** : les résultats du tableau Code Champion, puis le texte de l'élève en gros caractères avec un interligne important, et un espace en dessous — pour que l'enseignant corrige **à la main**, au stylo, sur le papier.
- **Page 2** : un rappel de la consigne, le nom de l'élève, une grille d'évaluation classique de la rédaction (7 critères usuels × 4 niveaux de maîtrise, §5.5), et des lignes espacées — pour que l'élève **recopie à la main** sa version corrigée.

Le suivi numérique (progression, badges, statistiques) s'appuie uniquement sur les données du premier jet numérique (les 7 feux automatiques) ; il n'y a pas de retour dans l'application après la recopie manuscrite — le circuit se termine sur papier.

Autour de ce cœur : un tableau de progression motivant pour l'élève (bilan, feux, historique, badges, graphiques, objectif, carnet d'auteur), une synthèse de classe pour l'enseignant (tableau élèves × critères, statistiques, bilan PDF de fin d'année), une personnalisation des thèmes par classe et un verrouillage en parcours guidé (Phase 4, déjà livrée).

Le tout doit être **indiscernable du reste de Proficiamus**.

---

## 3. Points de vigilance et oublis identifiés (mis à jour v2.1)

**3.1 Coût.** Nul, à n'importe quelle échelle.

**3.2 Persistance.** Brouillon **auto-sauvegardé dans Supabase** toutes les ~30 s et à la perte de focus.

**3.3 Garde-fous sur le texte.** 20–300 mots. Compteur de mots discret.

**3.4 Cas « tous verts dès la V1 » (ou V2).** Le jogging est clos immédiatement ; message de réussite. Le bouton de génération du premier jet reste disponible quelle que soit l'issue.

**3.5 Cas « pas tout vert après la V3 ».** La correction finale affiche les critères encore non acquis. Les feux orange/rouge alimentent « Mon objectif ». Le premier jet peut être généré même si tout n'est pas vert — c'est justement le rôle de la page 1 que de laisser l'enseignant compléter à la main.

**3.6 Indices vs réponses selon la version.** V1/V2 : catégorie + explication générale, sans la suggestion précise. Correction finale (V3 ou fin anticipée) : suggestion complète révélée. Simple filtre d'affichage côté front.

**3.7 Surlignage.** Positions de caractères fiables (analyseur déterministe), pas de mécanisme de repli nécessaire.

**3.8 Accessibilité des feux.** Pictogramme ou libellé (✔ / ~ / ✖ / –), pas seulement une couleur — utile aussi à l'impression en noir et blanc (§3.16).

**3.9 RGPD.** Le texte ne quitte jamais le navigateur pour la correction automatique.

**3.10 Contenu inapproprié.** Un outil à règles ne détecte pas un contenu préoccupant. Option retenue : pas de détection automatique — la relecture manuscrite systématique de l'enseignant sur la page 1 (désormais garantie par le design même du module) sert de filet, sans mécanisme dédié supplémentaire.

**3.11 Latence.** Grammalecte est quasi instantané. Transition brève (300-500 ms) entre éditeur et correction.

**3.12 Échec technique.** Bibliothèque Grammalecte qui ne se charge pas → message clair + réessayer, texte déjà sauvegardé.

**3.13 Versionnement.** `grammalecte_version` enregistrée à chaque correction.

**3.14 Qui crée les joggings ?** Catalogue statique (15, rédigés) + personnalisation par classe (Phase 4, livrée).

**3.15 Mode « libre vs guidé ».** `classes.mode_acces` confirmé (§1.2 point 6) ; verrouillage par jogging livré en Phase 4.

**3.16 Impression et accessibilité papier.** Les pictogrammes des feux (§3.8) doivent rester lisibles en noir et blanc à l'impression (pas seulement une pastille de couleur). Prévoir une feuille de style dédiée à l'impression (`css/jogging-print.css`), distincte du CSS écran, pour maîtriser précisément tailles de police, interlignage et marges sur papier — le rendu écran n'est pas transposable tel quel.

---

## 4. Améliorations proposées — retenues et écartées (mis à jour v2.1)

### Retenues
1. **Pictogrammes sur les feux** (§3.8), utiles aussi à l'impression.
2. **Brouillon auto-sauvegardé** (§3.2).
3. **Compteur de mots + bornes min/max** (§3.3).
4. **Indices en V1/V2, suggestion complète en finale** (§3.6).
5. **Message de progrès entre versions**, calculé côté front.
6. **Générateur de premier jet imprimable, individuel et par classe** (§5.5, §5.9) — remplace la zone de reformulation numérique de la Phase 2, jugée moins naturelle pour un enseignant de primaire qu'une correction au stylo sur papier.
7. **Nom de l'élève sur les deux pages du support imprimé** — indispensable dès qu'on imprime pour plusieurs élèves à la fois (§5.9).

### Écartées (volontairement)
- **Correction en temps réel pendant la frappe.**
- **Note chiffrée / classement entre élèves.**
- **Éditeur riche (gras, couleurs, images).**
- **Synthèse vocale / dictée vocale au MVP.**
- **Toute réintroduction d'un appel à un modèle de langage.**
- **Zone de reformulation numérique** (Phase 2 initiale) — retirée au profit du circuit papier.

---

## 5. Spécification fonctionnelle

### 5.1 Catalogue et page « Rédaction » (`redaction.html`)
- Nouvelle entrée « ✍️ Rédaction » dans le domaine Français, fil d'Ariane inclus.
- Cartes de jogging (styles copiés de `.skill-card`, §1.2) : illustration, titre, niveau, durée estimée, compétence, **pastille du temps de conjugaison imposé**, bouton « Commencer ». Pas de mention de période.
- Catalogue fixe : **15 joggings**, `js/jogging-data.js`. Les 15 cartes affichées d'emblée, sauf verrouillage en parcours guidé (Phase 4).

### 5.2 Écran du jogging (`jogging.html?id=…`)
- En-tête : titre, consigne, pastille du temps imposé, temps conseillé.
- Grand éditeur, compteur de mots, auto-save.
- Bouton « ✅ Corriger mon texte » (désactivé sous 20 mots).
- Bandeau de version : « Version 1 sur 3 ».

### 5.3 Cycle des versions
```
V1 → Correction (indices) → V2 → Correction (indices) → V3 → Correction finale (suggestions complètes)
```
- Plusieurs versions numériques restent possibles avant de générer le premier jet imprimable — le cycle V1→V3 est inchangé dans son fonctionnement.
- Tous les feux automatisables au vert à n'importe quelle étape → le jogging est marqué terminé, sans étape supplémentaire à l'écran.
- À **tout moment** dès qu'au moins une version a été soumise (pas seulement à la fin), le bouton « 🖨️ Générer ma feuille de premier jet » (§5.5) devient disponible et utilise la **dernière version soumise**.
- Un jogging clos ne peut plus être modifié par l'élève (lecture seule dans l'historique) ; le premier jet reste générable depuis l'historique.

### 5.4 Écran de correction
- Texte surligné (positions fiables Grammalecte) ; bulle au clic/tap avec lettre du code, nom du critère, explication cycle 3.
- **Tableau Code Champion sous le texte, pleine largeur**, 9 tuiles sur une seule ligne (lecture « CHAMPIONS »), légende au survol/tap. 7 feux automatiques (O, M, P, C, H, A, S) ; **N reste ⚪** en permanence dans l'application — ce n'est plus « en attente d'une saisie enseignante » mais **définitivement résolu sur papier** (§5.5), jamais reporté dans l'app.
- Transition de feu animée. Sous le tableau : « 🎯 Mission... » + message de progrès.
- **Bouton « 🖨️ Générer ma feuille de premier jet »**, visible dès qu'une version existe (§5.3).
- **Message préventif élève**, discret, non alarmant, présentant l'outil comme un générateur de premier jet : « 💡 Ce correcteur guide ta relecture, mais il n'attrape pas toutes les erreurs. Il t'aide surtout à voir où tu réussis et où travailler encore. Ton enseignant relit et corrige ta feuille ensuite ! » (à ajuster ensemble sur le ton exact, cf. échanges précédents).

### 5.5 Générateur de premier jet — support de correction et de recopie manuscrites
Remplace entièrement la « zone de reformulation numérique » de la Phase 2 initiale (retirée, §7 Phase 2bis).

- **Déclenchement** : bouton « 🖨️ Générer ma feuille de premier jet », accessible côté élève (jogging.html, dès qu'une version existe) et côté enseignant (fiche élève, pour régénérer/imprimer à sa place). Utilise `window.print()` + `css/jogging-print.css`, même mécanique que le bulletin.
- **Page 1** : nom de l'élève (indispensable une fois imprimé, §4 point 7), résultats du tableau Code Champion (feux avec pictogrammes, lisibles en noir et blanc), puis le texte de la dernière version soumise en **gros caractères, interligne important**, et un **espace libre en dessous** pour les commentaires manuscrits de l'enseignant.
- **Page 2** : rappel de la consigne, nom de l'élève, une **grille d'évaluation classique de la rédaction** (validée — 7 critères usuels de production écrite cycle 3, chacun sur 4 niveaux de maîtrise : non acquis / en cours d'acquisition / satisfaisant / très satisfaisant, une case à cocher par niveau) :
  1. Respect de la consigne et du sujet
  2. Cohérence et organisation du texte (enchaînement logique des idées)
  3. Richesse et pertinence du vocabulaire
  4. Correction de la langue (syntaxe, conjugaison)
  5. Orthographe
  6. Ponctuation
  7. Soin et lisibilité de l'écriture

  Cette grille évalue la **qualité rédactionnelle globale** (fond, structure, style) — elle est volontairement distincte du tableau Code Champion de la page 1, qui reste mécanique (orthographe, accords, conjugaison...). Les deux se complètent sans se répéter.
- Et des **lignes espacées** pour que l'élève recopie sa version corrigée à la main (réglure proposée par défaut : type Seyès, à ajuster si besoin — §8).
- **Message préventif enseignant** (voix perso du concepteur, ton « mot du concepteur »), affiché **une fois, en intro** de la page enseignant (`synthese-joggings-enseignant.html`, pas répété à chaque fiche élève) — texte définitif : « 💬 "Relis-toi", "pense au Code Champion", "saute des lignes pour la correction" — ce générateur de premier jet guide l'élève dans ces réflexes, et prend en charge l'espacement nécessaire à votre correction. Résultat : un premier jet mieux réalisé et plus lisible, qui facilite la réussite du deuxième jet. La correction automatique reste imparfaite, votre vérification reste indispensable. »
- **Aucune clôture numérique après la recopie manuscrite** : le suivi de l'application (progression, badges) s'arrête aux données du premier jet numérique ; rien ne redescend depuis le papier.

### 5.6 Espace élève — onglet « Mes joggings d'écriture »
1. **Mon bilan** : joggings réalisés, feux verts, progression, dernier jogging, encouragement.
2. **Mes progrès** : 9 feux cliquables → réussites/difficultés/conseil/défi.
3. **Mon historique** : cartes (titre, date, résultat, feux verts) → détail des versions numériques + accès au bouton « 🖨️ Générer ma feuille de premier jet » pour régénérer le PDF a posteriori.
4. **Mes réussites** : badges.
5. **Mon évolution** : graphiques.
6. **Mon objectif** : critère le plus fragile.
7. **Mon carnet d'auteur** : ajout + export livre PDF (Phase 3).

### 5.7 Espace enseignant — page « Synthèse des joggings d'écriture » (`synthese-joggings-enseignant.html`)
1. **Vue classe** : filtres classe / période / jogging, tableau élève × 9 critères en feux, colonne N visuellement distincte (toujours ⚪, résolue sur papier). Triable, filtrable. **Bouton « 🖨️ Imprimer tous les premiers jets »** dès qu'une classe et un jogging sont sélectionnés (§5.9).
2. **Fiche élève** : infos générales, progression, historique des joggings avec leurs versions numériques, bouton « 🖨️ Générer ma feuille de premier jet » pour cet élève.
3. **Statistiques** : erreurs fréquentes, progression moyenne, critères fragiles/maîtrisés, graphiques SQL.
4. **« Générer le bilan PDF »** : logo, nom, classe, période, bilan général, tableau Code Champion, graphique de progression, historique, exemple de versions, points forts, axes de progrès, conclusion, dernière page « Le mot de l'enseignant ».
5. **« Gérer mes joggings »** (Phase 4) : personnalisation par classe + verrouillage en parcours guidé (§5.8).

### 5.8 Personnalisation des thèmes et verrouillage en parcours guidé (Phase 4 — livrée)
- **Personnalisation, par classe** : titre, consigne, temps imposé, niveau, durée, compétence — tous remplaçables, `jogging-data.js` reste la valeur par défaut, bouton « Réinitialiser » par champ.
- **Verrouillage, en parcours guidé uniquement** (`classes.mode_acces = 'guide'`) : un jogging verrouillé reste **visible mais grisé et non cliquable**.
- Mécanismes indépendants et combinables.

### 5.9 Impression groupée pour la classe
- Dans la vue classe (§5.7 point 1), une fois **classe + jogging** sélectionnés, le bouton « 🖨️ Imprimer tous les premiers jets » génère **un seul fichier PDF** concaténant, pour **chaque élève ayant soumis au moins une version de ce jogging** (peu importe si le cycle numérique est clos), la paire page 1 + page 2 décrite en §5.5.
- **Ordre** : alphabétique par `display_name`, pour correspondre à la façon dont un enseignant trie ses copies.
- **Saut de page entre chaque élève** (CSS print `page-break-after`), pour que l'impression physique tombe proprement, copie par copie.
- Chaque paire porte le nom de l'élève sur ses deux pages (§5.5) — indispensable une fois la pile imprimée et éventuellement découpée en copies séparées.

---

## 6. Spécification technique

### 6.1 Fichiers (conventions existantes)
```
redaction.html                     # page catalogue du domaine
jogging.html                       # écran d'écriture + correction (rendu par id, comme exercise.html)
synthese-joggings-enseignant.html  # page enseignant, 5e .main-tab (§1.2)
js/jogging-data.js                 # catalogue statique (consignes, pastilles, textes des conseils/défis)
js/jogging-engine.js               # logique élève (éditeur, versions, appel Grammalecte, rendu correction, feux)
js/jogging-grammalecte.js          # adaptateur Grammalecte → critères Code Champion (§6.4)
js/jogging-student-space.js        # onglet « Mes joggings d'écriture » (dashboard-eleve.html)
js/jogging-teacher.js              # logique de synthese-joggings-enseignant.html (vue classe, fiche élève,
                                    # personnalisation Phase 4)
js/jogging-print.js                # génération du support de premier jet (individuel §5.5, groupé §5.9),
                                    # construction du DOM imprimable, appel window.print()
js/jogging-class-settings.js       # résolution personnalisation + verrouillage côté élève (Phase 4, livrée)
css/jogging.css                    # styles écran, copiés depuis .skill-card/.hub-card (§1.2)
css/jogging-print.css              # styles dédiés à l'impression (§3.16, §5.5) — distincts du CSS écran
lib/grammalecte/                   # bibliothèque Grammalecte (JS) + dictionnaire français
supabase/migrations/xxx_joggings.sql
```
Aucune Edge Function requise pour ce module (§1.2, point 3).

### 6.2 Modèle de données Supabase
```sql
-- Une session = un élève × un jogging du catalogue
create table jogging_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id),
  jogging_id text not null,
  status text not null default 'draft',  -- draft | in_progress | completed
  current_version smallint not null default 1,
  draft_text text,
  all_green boolean not null default false,  -- vrai quand les 7 critères automatisables sont verts
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Une version soumise + sa correction Grammalecte
create table jogging_versions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references jogging_sessions(id) on delete cascade,
  version_number smallint not null check (version_number between 1 and 3),
  text text not null,
  correction jsonb,                      -- résultat Grammalecte brut
  feu_c text, feu_h text, feu_a text, feu_m text, feu_p text,
  feu_i text, feu_o text, feu_n text, feu_s text,   -- 'vert'|'orange'|'rouge'|'blanc'
  -- feu_n reste TOUJOURS 'blanc' : non automatisable, résolu sur papier (§5.5), jamais reporté ici
  grammalecte_version text,
  submitted_at timestamptz default now(),
  unique (session_id, version_number)
);

-- Badges et carnet d'auteur
create table jogging_badges (
  student_id uuid references profiles(id),
  badge_id text,
  earned_at timestamptz default now(),
  primary key (student_id, badge_id)
);
create table jogging_carnet (
  student_id uuid references profiles(id),
  session_id uuid references jogging_sessions(id) on delete cascade,
  added_at timestamptz default now(),
  primary key (student_id, session_id)
);

-- Personnalisation par classe + verrouillage en parcours guidé (Phase 4 — livrée)
create table jogging_class_settings (
  class_id uuid not null references classes(id) on delete cascade,
  jogging_id text not null,
  titre text,
  consigne text,
  temps_impose text,
  niveau smallint,
  duree_estimee smallint,
  competence text,
  locked boolean not null default false,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id),
  primary key (class_id, jogging_id)
);
```
**⚠️ Retirée en v2.1 :** la table `jogging_enrichments` (créée en Phase 2, commit `4b1129d`) est supprimée — voir Phase 2bis en section 7.

Notes : feux en colonnes pour SQL simple ; `.limit(2000)` systématique ; index sur `(student_id)`, `(session_id)`, `(status)`.

### 6.3 RLS (calquée sur l'existant)
- Élève : `select/insert/update` sur ses propres lignes (`student_id = auth.uid()`), jamais de `delete` ; pas de modification d'une session `completed`.
- Enseignant : `select` sur les sessions des élèves de ses classes, jointure via `students.class_id`/`students.auth_user_id`.
- `jogging_class_settings` : enseignant CRUD limité à ses classes (`classes.teacher_id = auth.uid()`) ; élève `select` sur les réglages de sa classe.
- Élève sur `classes` : passer par la RPC `get_my_guided_access()` (§1.2 point 6), pas par une policy directe.
- Admin : lecture agrégée (aucune identité).
- Génération des PDF (§5.5, §5.9) : aucune écriture supplémentaire nécessaire, lecture seule sur des données déjà couvertes par les policies ci-dessus.

### 6.4 Intégration Grammalecte (côté client)
- Bibliothèque + dictionnaire servis en fichiers statiques (`lib/grammalecte/`), chargés uniquement sur `jogging.html`.
- `js/jogging-grammalecte.js` mappe chaque règle Grammalecte sur un critère Code Champion (C/H/A/M/P/O/S).
- Le mapping alimente les colonnes `feu_*` de `jogging_versions`.

### 6.5 Bibliothèque de messages pédagogiques cycle 3
Explications reformulées pour un enfant de cycle 3, indexées par famille de règle Grammalecte, stockées dans `js/jogging-messages.js`.

### 6.6 Performance
- Bibliothèque + dictionnaire Grammalecte chargés uniquement sur `jogging.html`.
- Aucun coût récurrent, aucune limite de débit.

---

## 7. Plan de développement par phases

### Phase 1 — Socle + boucle d'écriture ✅ livrée
Intégration Grammalecte, catalogue 15 joggings, `redaction.html`/`jogging.html`, tableau Code Champion. Audit et correctifs du mapping règles → critères effectués (19/07/2026).

### Phase 2 — Espaces de suivi ✅ livrée, amendée par la Phase 2bis
Onglet élève, page enseignant `synthese-joggings-enseignant.html`, bilan PDF. **La zone de reformulation numérique et `jogging_enrichments` livrées ici sont retirées par la Phase 2bis ci-dessous.**

### Phase 2bis — Générateur de premier jet imprimable (amende la Phase 2) — À FAIRE
⚠️ Retire une partie du travail déjà commité en Phase 2 (`jogging_enrichments`,
zone de reformulation à l'écran).
- Migration : suppression de la table `jogging_enrichments` et de sa RLS (si déjà poussée en base — à vérifier avant).
- `js/jogging-print.js` + `css/jogging-print.css` : génération individuelle du support de premier jet (§5.5) — page 1 (résultats + texte gros/interligné + espace commentaire) et page 2 (consigne, nom, grille d'évaluation, lignes espacées), via `window.print()`.
- Bouton « 🖨️ Générer ma feuille de premier jet » sur `jogging.html` et sur la fiche élève enseignant.
- Retrait de la zone de reformulation, du sélecteur de feu N, et de la mention « reformulation enseignante » dans le bilan PDF, sur `synthese-joggings-enseignant.html`.
- Mise à jour des messages préventifs élève (§5.4) et enseignant (§5.5) pour présenter l'outil comme un générateur de premier jet.
- Test réel : imprimer une feuille, vérifier la lisibilité (taille, interligne, grille, lignes) sur papier physique avant de valider le format définitif (§8).

### Phase 2ter — Impression groupée pour la classe (§5.9) — À FAIRE
- Bouton « 🖨️ Imprimer tous les premiers jets » dans la vue classe.
- Génère un seul PDF, toutes les paires page 1/page 2 des élèves ayant soumis une version, triées alphabétiquement, nom sur chaque page, saut de page entre élèves.

### Phase 3 — Motivation et progression ✅ livrée
Mes progrès, Mes réussites, Mon évolution, Mon objectif, Mon carnet d'auteur, statistiques enseignant.

### Phase 4 — Personnalisation des thèmes et parcours guidé ✅ livrée
Table `jogging_class_settings`, section « Gérer mes joggings », verrouillage en mode guidé.

### Phase 5 — Autres ouvertures (à réévaluer plus tard, hors engagement)
Joggings créés entièrement par l'enseignant, extension du catalogue au-delà de 15, indicateurs admin d'usage, dictée vocale, affinage continu du mapping Grammalecte.

Chaque phase = une série de prompts Claude Code séparés, avec validation locale avant commit, cache-busting `?v=` sur les CSS livrés.

---

## 8. Questions à trancher

1. ~~Modèle IA~~ / ~~Quota~~ **Sans objet** (pivot v2.0).
2. **Indices vs réponses** (§3.6) : validé, inchangé.
3. **Bornes de texte** : 20–300 mots, validé.
4. ~~Contenu inapproprié~~ **Tranché** : pas de détection automatique (§3.10).
5. ~~Catalogue~~ **Tranché** : 15 consignes rédigées (`docs/catalogue-15-joggings.md`).
6. **Illustrations des cartes** : réutilisation d'un stock existant, ou création à prévoir ?
7. ~~Reformulation enseignante~~ **Sans objet** (retirée, remplacée par le circuit papier v2.1).
8. ~~Grille d'évaluation page 2~~ **Tranché** : grille classique 7 critères × 4 niveaux de maîtrise (§5.5).
9. **Nouveau — réglure des lignes d'écriture page 2** (§5.5) : proposition par défaut = réglure Seyès (comme un cahier). Seyès, lignes simples, ou autre ?
10. **Nouveau — périmètre de l'impression groupée** (§5.9) : proposition par défaut = tous les élèves ayant soumis au moins une version (même si le cycle n'est pas clos). Tu préfères limiter aux joggings clos (`status = completed`) uniquement ?

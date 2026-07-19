# Cahier des charges — Module « ✍️ Rédaction » (Joggings d'écriture)

**Projet :** Proficiamus (proficiamus.eu, repo SITE-WEB-C3)
**Version :** 2.0 — pivot « zéro IA générative », à valider avant tout développement
**Date :** 19 juillet 2026 (v1.0 le matin, v2.0 le soir après décision de coût)

> **Changement majeur par rapport à la v1.0 :** le module n'appelle plus aucun
> modèle de langage (Claude, Gemini, Mistral, Groq...). La correction repose
> sur **Grammalecte**, un correcteur grammatical français open source qui
> tourne entièrement **côté client** (dans le navigateur de l'élève), sans
> jamais contacter un serveur ni un fournisseur d'IA. Conséquence directe :
> **coût nul, à n'importe quelle échelle**, aucune limite de débit, aucune
> dépendance à un tiers payant. La contrepartie est fonctionnelle, pas
> financière : voir l'encadré de la section 2.

---

## 1. Analyse de l'existant : sur quoi ce module s'appuie

### 1.1 Architecture actuelle

| Élément | État actuel | Conséquence pour le module |
|---|---|---|
| Front | Vanilla HTML/CSS/JS, GitHub Pages (site 100 % statique) | Grammalecte est du JS pur : il s'intègre comme n'importe quelle bibliothèque cliente, **sans Edge Function ni secret** pour la correction elle-même |
| Données | Supabase (auth, `profiles`, `classes`, `exercise_results`, plan free/lfi/pro) | Les productions d'élèves rejoignent le même modèle : RLS par élève / par classe. Écriture directe depuis le client (RLS-protégée), pas besoin d'un intermédiaire serveur pour la correction |
| Catalogue d'exercices | `exercise-data.js` statique + moteur `js/exercise-engine.js`, rendu via `exercise.html?param` | Le catalogue des joggings suivra le même patron : **fichier statique `jogging-data.js`**, pas de table Supabase pour les consignes |
| Design system | Fredoka, navy `#1A2D6B`, gold `#F5A623`, turquoise `#1DBFA0` ; cartes, pastilles de niveau, badges, fil d'Ariane (`js/breadcrumb.js`) | **Pas de composant CSS partagé pour les cartes/boutons/jauges** (voir §1.2) : le module reprend les valeurs visuelles à l'identique dans `css/jogging.css`. Seuls `level-select.css` (pastilles) et `laurels.css` (badges/couronnes) sont réellement importables tels quels. |
| Espaces | Élève (onglets Faire des exercices / Mes résultats, `?tab=` géré), Enseignant (pages séparées `.main-tab` : `classes-enseignant.html`, `pilotage-enseignant.html`, `resultats-enseignant.html`, `remediations-enseignant.html`, sans gestion `?tab=`), Admin | Un nouvel onglet « Mes joggings d'écriture » côté élève (s'intègre au mécanisme `?tab=` existant) ; côté enseignant, une **nouvelle page** `synthese-joggings-enseignant.html` en 5e `.main-tab` (voir §1.2) plutôt qu'un onglet interne |
| Edge Functions | Deux patrons coexistent (`functions.invoke` du SDK vs `fetch` manuel) | **Aucune nouvelle Edge Function nécessaire pour ce module** (voir pivot ci-dessus) — les écritures Supabase se font en direct depuis le client, comme pour `exercise_results` |
| PDF | Bulletin via `window.print()` + CSS print, fusion bulletin/synthèse en cours | Le « Bilan PDF joggings » réutilise cette mécanique et la charte du bulletin fusionné |
| Pièges connus | Limite implicite 1000 lignes (`.limit(2000)`), RGPD `display_name` uniquement, cache-busting `?v=` sur les CSS | Repris tels quels dans toutes les requêtes et livraisons du module |

### 1.2 Vérification effectuée et décisions actées (rapport Claude Code, 19 juillet 2026)

Une vérification directe du code a mis à jour plusieurs écarts avec les hypothèses initiales de ce document (v1.0). Décisions actées en conséquence, toujours valables après le pivot v2.0 :

1. **Composants « cartes/boutons/pastilles » : pas de composant partagé à importer.** `.skill-card`, `.hub-card` et `.ex-validate-btn` sont dupliqués en `<style>` inline par page (aucun fichier CSS central) ; les « jauges » n'existent nulle part comme composant réutilisable. Seuls `level-select.css` (pastilles `.ls-pastille`) et `laurels.css` (badges/couronnes) sont réellement centralisés. **Décision : le module copie les règles visuelles nécessaires dans `css/jogging.css`.**

2. **Navigation enseignant : nouvelle page dédiée, pas un onglet interne.** `resultats-enseignant.html` n'a pas de gestion `?tab=` et son sous-système d'onglets (`switchClassTab`) se réinitialise à chaque ouverture de classe. **Décision : « Synthèse des joggings d'écriture » est une nouvelle page à part entière, `synthese-joggings-enseignant.html`, ajoutée comme 5e `.main-tab`.**

3. ~~Edge Functions : patron `functions.invoke` retenu~~ — **devenu sans objet** : le pivot v2.0 supprime le besoin d'Edge Function pour la correction. Les écritures dans `jogging_sessions`/`jogging_versions` se font directement depuis le client via le SDK Supabase, protégées par RLS (même patron que l'enregistrement des résultats d'exercices classiques).

4. **RLS élève↔classe : table `students`, pas `class_memberships`.** `students` (id, `auth_user_id`, `class_id`, `display_name`, `username`, `password`) est utilisée par tout l'outillage admin/enseignant existant ; `class_memberships` uniquement côté élève. **Décision : la policy enseignant de `jogging_sessions`/`jogging_versions` se fonde sur `students.class_id`/`students.auth_user_id`.** Le champ `profiles.plan` mentionné en §1.1 n'apparaît dans aucun fichier JS du repo — sans incidence sur ce module (aucune policy n'en dépend ici).

5. ~~Clé `service_role` Legacy~~ — **devenu sans objet**, plus d'Edge Function à déployer pour ce module.

---

## 2. Reformulation de la demande (mise à jour v2.0)

Tu veux ajouter à Proficiamus un **atelier d'écriture itératif** : l'élève écrit un court texte à partir d'une consigne (« jogging d'écriture »), le soumet, reçoit une correction, puis réécrit son texte — jusqu'à trois versions. Le retour visuel central est un tableau de feux tricolores par critère de la grille **Code Champion** (C-H-A-M-P-I-O-N-S), affiché **sous le texte, pleine largeur**, dont l'objectif explicite est : *« fais passer tous les feux au vert »*.

**Ce qui change avec le pivot « zéro IA » :** la correction automatique n'est plus produite par un modèle de langage, mais par **Grammalecte**, un correcteur grammatical français open source tournant côté client. Il couvre fiablement **7 des 9 critères** : O (Orthographe), M (Majuscules), P (Ponctuation), C (Conjugaison), H (Homophones), A (Accords), S (Son). Le critère **N (Néant — mot manquant)** reste hors de portée d'un outil à base de règles (repérer une absence demande de comprendre le sens de la phrase) : il est **laissé au regard de l'enseignant**. Il n'y a plus de « proposition d'amélioration IA » automatique en fin de parcours : c'est l'enseignant qui, dans sa fiche élève, **reformule lui-même** les phrases qui posent encore problème (syntaxe, cohérence, style, et le critère N), via son commentaire — qui reste, comme prévu initialement, prioritaire à l'écran élève et dans le PDF.

Autour de ce cœur, deux espaces de suivi inchangés dans leur principe : un tableau de progression motivant pour l'élève (bilan, feux par compétence, historique, badges, graphiques, objectif, carnet d'auteur) et une synthèse de classe pour l'enseignant (tableau élèves × critères en feux, fiche élève complète, statistiques, bilan PDF).

Le tout doit être **indiscernable du reste de Proficiamus** : mêmes composants, même charte, mêmes conventions, rien de cassé.

---

## 3. Points de vigilance et oublis identifiés (mis à jour v2.0)

**3.1 Coût.** Nul, à n'importe quelle échelle. Grammalecte tourne dans le navigateur de l'élève, aucun appel serveur, aucun jeton, aucune limite de débit à surveiller, aucun quota à gérer — que ce soit pour ta classe ou pour l'ensemble du réseau AEFE.

**3.2 Persistance : Supabase, pas sessionStorage.** Inchangé : un texte d'élève est un travail long et précieux, brouillon **auto-sauvegardé dans Supabase** toutes les ~30 s et à la perte de focus.

**3.3 Garde-fous sur le texte.** Longueur minimale (20 mots) et maximale (300 mots) — la borne haute n'est plus motivée par un coût de tokens mais reste pertinente pour un jogging de cycle 3 (texte court, ciblé). Compteur de mots discret dans l'éditeur.

**3.4 Cas « tous verts dès la V1 » (ou V2).** Le jogging est alors clos immédiatement (plus d'étape d'amélioration automatique à déclencher) ; message de réussite, comptabilisé comme terminé. Ne pas forcer trois versions artificielles.

**3.5 Cas « pas tout vert après la V3 ».** La correction finale affiche les critères encore non acquis, un message valorisant les progrès entre V1 et V3, et le jogging est clos. Les feux orange/rouge restants alimentent « Mon objectif » et signalent à l'enseignant où porter son attention (y compris pour N, qu'il évalue lui-même à ce moment-là).

**3.6 Indices vs réponses selon la version.** Pour garder l'esprit « ne pas donner la réponse tout de suite » : en V1/V2, on affiche la catégorie d'erreur détectée par Grammalecte et une explication générale, **sans afficher la suggestion de correction précise** ; en correction finale (V3 ou fin anticipée), la suggestion complète de Grammalecte est révélée. C'est un simple filtre d'affichage côté front sur les données déjà renvoyées par le moteur, pas une contrainte à faire respecter par un modèle.

**3.7 Surlignage.** Avantage du pivot : Grammalecte, en tant qu'analyseur déterministe, renvoie des **positions de caractères fiables** dans le texte exact qu'on lui donne (contrairement à un LLM qui peut mal citer un extrait). Le surlignage peut donc s'appuyer directement sur ces offsets, sans le mécanisme de repli « extrait + occurrence » qui était nécessaire pour parer aux imprécisions d'un modèle génératif.

**3.8 Accessibilité des feux.** Inchangé : chaque feu porte un pictogramme ou libellé (✔ / ~ / ✖ / –), pas seulement une couleur.

**3.9 RGPD.** Encore renforcé par le pivot : le texte de l'élève **ne quitte jamais le navigateur** pour l'étape de correction automatique (aucun envoi à un tiers). Il n'est écrit que dans Supabase (même politique `display_name` que le reste du site). Plus besoin de mention « traitement par un sous-traitant IA » dans les mentions légales pour ce module.

**3.10 Contenu inapproprié.** **Régression assumée du pivot** : un outil à base de règles grammaticales ne comprend pas le sens d'un texte, il ne peut donc plus détecter automatiquement un contenu préoccupant (ce qu'un LLM pouvait faire en V1.0). Deux options, à trancher en §8 : (a) abandonner la détection automatique, en comptant sur la relecture enseignante normale du texte final ; (b) ajouter une liste de mots-clés de vigilance très simple, côté client, qui lève un drapeau `flagged` sans prétendre à une compréhension fine — un filet de sécurité grossier mais gratuit, à ne pas présenter comme fiable.

**3.11 Latence.** Grammalecte est quasi instantané sur un texte de 300 mots (analyse locale, pas d'aller-retour réseau). L'écran d'attente pédagogique de la v1.0 n'est plus nécessaire pour masquer un délai — on peut le remplacer par une transition très brève (300-500 ms) pour que le passage de l'éditeur à la correction ne soit pas trop abrupt visuellement, sans message de patience.

**3.12 Échec technique.** Plus de risque d'échec d'appel IA. Reste à gérer : la bibliothèque/dictionnaire Grammalecte qui ne se charge pas (connexion lente, cache navigateur) — prévoir un message clair et un bouton « réessayer », le texte étant de toute façon déjà sauvegardé.

**3.13 Versionnement.** Chaque correction enregistre la **version du moteur/dictionnaire Grammalecte** utilisée (`grammalecte_version`), à la place de `prompt_version`/`model` — même utilité : comprendre plus tard pourquoi deux corrections diffèrent après une mise à jour du correcteur.

**3.14 Qui crée les joggings ?** Inchangé : MVP en catalogue statique rédigé par toi (avec mon aide, cf. §8 déjà tranché), une évolution possible en Phase 5 pour que l'enseignant crée ses propres consignes.

**3.15 Mode « libre vs guidé ».** Inchangé, hors MVP, champ `assigned` réservé dans le modèle de données.

---

## 4. Améliorations proposées — retenues et écartées (mis à jour v2.0)

### Retenues
1. **Pictogrammes sur les feux** (accessibilité, §3.8).
2. **Brouillon auto-sauvegardé** (§3.2).
3. **Compteur de mots + bornes min/max** (§3.3).
4. **Indices en V1/V2, suggestion complète en finale** (§3.6), désormais un simple filtre d'affichage.
5. **Message de progrès entre versions** : « Bravo, tu es passé de 3 erreurs d'accords à 1 ! » — calculé côté front, aucun appel externe.
6. **Zone de reformulation enseignante mise en avant** : puisqu'elle porte désormais tout le travail sur N et sur la syntaxe fine, elle doit être facile d'accès depuis la fiche élève, pas une case perdue en bas de page.

### Écartées (volontairement)
- **Correction en temps réel pendant la frappe** — priverait l'élève de la relecture autonome.
- **Note chiffrée / classement entre élèves** — contraire à l'esprit des feux et du RGPD d'équipe.
- **Éditeur riche (gras, couleurs, images)** — au cycle 3, on travaille le texte, pas la mise en forme.
- **Synthèse vocale / dictée vocale au MVP** — à réévaluer en Phase 5.
- **Toute réintroduction d'un appel à un modèle de langage** (même « juste pour l'amélioration finale ») — irait à l'encontre de l'objectif « coût zéro, toute échelle » qui a motivé le pivot.

---

## 5. Spécification fonctionnelle

### 5.1 Catalogue et page « Rédaction » (`redaction.html`)
- Nouvelle entrée « ✍️ Rédaction » dans le domaine Français (page de catégorie, même gabarit que les autres, fil d'Ariane inclus).
- Cartes de jogging (styles repris de `.skill-card` dans `css/jogging.css`, voir §1.2 — copie, pas import) : illustration, titre, niveau (pastilles `.ls-pastille` de `level-select.css`), durée estimée, compétence travaillée, **pastille du temps de conjugaison imposé** (Présent / Imparfait / Futur / Passé composé), bouton « Commencer ». Pas de mention de période.
- Catalogue fixe : **15 joggings pour toute l'année scolaire**, définis dans `js/jogging-data.js`. **Les 15 cartes sont toutes affichées d'emblée**, chaque enseignant choisit librement.

### 5.2 Écran du jogging (`jogging.html?id=…`)
- En-tête : titre, consigne, pastille du temps de conjugaison imposé, temps conseillé (indicatif).
- Grand éditeur (textarea stylée charte, Fredoka), compteur de mots, auto-save.
- Bouton principal « ✅ Corriger mon texte » (désactivé sous 20 mots).
- Bandeau de version : « Version 1 sur 3 » avec le fil V1 → V2 → V3.

### 5.3 Cycle des versions
```
V1 → Correction (indices) → V2 → Correction (indices) → V3 → Correction finale (suggestions complètes)
```
- Tous les feux automatisables (O, M, P, C, H, A, S) au vert à n'importe quelle étape → le jogging bascule directement en attente de relecture enseignante (§5.5), sans étape supplémentaire pour l'élève.
- Après correction, bouton « ✍️ Réécrire ma version suivante » : l'éditeur se pré-remplit avec la version précédente.
- Un jogging clos ne peut plus être modifié par l'élève (lecture seule dans l'historique).

### 5.4 Écran de correction
- Le texte de l'élève, avec les erreurs surlignées (positions fiables Grammalecte, §3.7) ; au clic/tap, une bulle charte affiche la lettre du code, le nom du critère et l'explication (reformulée cycle 3, voir §6.5).
- **Tableau Code Champion sous le texte, pleine largeur** : 9 critères (C, H, A, M, P, I, O, N, S — I toujours ⚪ pour les textes saisis). 7 feux calculés automatiquement (O, M, P, C, H, A, S) ; **N reste ⚪ « à consolider avec ton enseignant »** tant que l'enseignant ne l'a pas renseigné dans sa fiche élève.
- Transition de feu animée discrètement quand une version change un statut.
- Sous le tableau : « 🎯 Mission : fais passer tous les feux au vert ! » + message de progrès.

### 5.5 Rôle de l'enseignant — reformulation et critère N
- Plus d'étape « proposition IA » automatique. Dans sa fiche élève (page enseignant), pour chaque jogging clos, l'enseignant dispose d'une **zone de reformulation** : il peut réécrire tout ou partie du texte de l'élève pour corriger la syntaxe fine, la cohérence, et repérer/marquer les mots manquants (N), plus un champ commentaire libre.
- **Ce texte et ce commentaire enseignant sont ce qui s'affiche à l'élève et dans le PDF** — c'est la même règle de priorité que dans la v1.0, seulement il n'y a plus de proposition IA à conserver/modifier/remplacer en amont : l'enseignant part directement du texte de l'élève.
- Le feu N est mis à jour manuellement par l'enseignant (🟢/🟠/🔴) au moment de sa relecture — un simple sélecteur, pas de génération de texte.

### 5.6 Espace élève — onglet « Mes joggings d'écriture »
Sections (dans l'ordre, gabarits réutilisés de « Mes résultats ») :
1. **Mon bilan** : joggings réalisés, feux verts obtenus, progression, dernier jogging, message d'encouragement (calculé côté front).
2. **Mes progrès** : 9 grands feux cliquables → panneau « Ce que je réussis / Ce qui reste difficile / Un conseil / Un défi » (règles déterministes, formulations stockées dans `jogging-data.js`).
3. **Mon historique** : cartes (titre, date, résultat, nb de feux verts) → détail V1/V2/V3 + reformulation et commentaire enseignant s'ils existent.
4. **Mes réussites** : badges (Premier jogging, Premier Champion, 5 joggings, 10 joggings, Champion de la conjugaison, Champion de l'orthographe, Persévérant…).
5. **Mon évolution** : 1–2 graphiques simples (feux verts par jogging dans le temps ; répartition par critère).
6. **Mon objectif** : critère le plus fragile → « 🎯 Travaille aujourd'hui la ponctuation » (règle déterministe).
7. **Mon carnet d'auteur** : bouton « ⭐ Ajouter à mon carnet » sur chaque jogging clos ; export « petit livre PDF » en fin d'année (Phase 4).

### 5.7 Espace enseignant — nouvelle page « Synthèse des joggings d'écriture » (`synthese-joggings-enseignant.html`)
Page dédiée en 5e `.main-tab` (voir §1.2) :
1. **Vue classe** : filtres classe / période / jogging → tableau 1 ligne = élève (`display_name`), colonnes = 9 critères, cases = feux (état du **dernier** jogging filtré). Triable, filtrable. Colonne N visuellement distincte (manuelle) pour rappeler qu'elle attend une action enseignante.
2. **Fiche élève** (nom cliquable) : infos générales, progression, liste des joggings ; pour chacun : V1 + correction, V2 + correction, V3 + correction finale, **zone de reformulation et commentaire enseignant** (§5.5), sélecteur du feu N, conseils de remédiation, synthèse.
3. **Statistiques** : erreurs les plus fréquentes, progression moyenne, critères les plus fragiles / mieux maîtrisés, graphiques — calculés en SQL, même style que `teacher-analytics.js`.
4. **« Générer le bilan PDF »** : logo, nom, classe, période, bilan général, tableau Code Champion, graphique de progression, historique, exemple des trois versions, reformulation enseignante, points forts, axes de progrès, conclusion, dernière page « Le mot de l'enseignant ».

---

## 6. Spécification technique

### 6.1 Fichiers (conventions existantes)
```
redaction.html                     # page catalogue du domaine
jogging.html                       # écran d'écriture + correction (rendu par id, comme exercise.html)
synthese-joggings-enseignant.html  # nouvelle page enseignant, 5e .main-tab (§1.2)
js/jogging-data.js                 # catalogue statique (consignes, pastilles, textes des conseils/défis)
js/jogging-engine.js               # logique élève (éditeur, versions, appel Grammalecte, rendu correction, feux)
js/jogging-grammalecte.js          # adaptateur : appelle Grammalecte, mappe ses codes de règles sur C/H/A/M/P/O/S,
                                    # applique les messages pédagogiques cycle 3 (§6.5)
js/jogging-student-space.js        # onglet « Mes joggings d'écriture » (dashboard-eleve.html)
js/jogging-teacher.js              # logique de synthese-joggings-enseignant.html, zone de reformulation
css/jogging.css                    # styles spécifiques, copiés depuis .skill-card/.hub-card (§1.2)
lib/grammalecte/                   # bibliothèque Grammalecte (JS) + dictionnaire français, servis statiquement
supabase/migrations/xxx_joggings.sql
```
Aucune Edge Function requise pour ce module (voir §1.2, point 3).

### 6.2 Modèle de données Supabase
```sql
-- Une session = un élève × un jogging du catalogue
create table jogging_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id),
  jogging_id text not null,              -- clé du catalogue statique
  status text not null default 'draft',  -- draft | in_progress | completed
  current_version smallint not null default 1,
  draft_text text,                       -- auto-save du brouillon en cours
  all_green boolean not null default false,  -- vrai quand les 7 critères automatisables sont verts
  flagged boolean not null default false,    -- drapeau de vigilance, voir §3.10 (optionnel, à trancher §8)
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Une version soumise + sa correction Grammalecte
create table jogging_versions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references jogging_sessions(id) on delete cascade,
  version_number smallint not null check (version_number between 1 and 3),
  text text not null,
  correction jsonb,                      -- résultat Grammalecte brut (erreurs, positions, règles déclenchées)
  -- feux en colonnes pour agrégations SQL directes côté enseignant :
  feu_c text, feu_h text, feu_a text, feu_m text, feu_p text,
  feu_i text, feu_o text, feu_n text, feu_s text,   -- 'vert'|'orange'|'rouge'|'blanc'
  -- feu_n reste 'blanc' jusqu'à saisie manuelle enseignante (voir jogging_enrichments)
  grammalecte_version text,
  submitted_at timestamptz default now(),
  unique (session_id, version_number)
);

-- Reformulation et évaluation manuelle de l'enseignant
create table jogging_enrichments (
  session_id uuid primary key references jogging_sessions(id) on delete cascade,
  teacher_text text,                        -- reformulation de l'enseignant (texte de l'élève par défaut)
  teacher_comment text,                     -- prioritaire partout, affiché à l'élève et dans le PDF
  feu_n text default 'blanc',               -- évaluation manuelle du critère Néant
  published boolean not null default true,  -- relecture avant publication
  updated_at timestamptz default now()
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
```
Notes : feux en colonnes pour que la vue classe et les statistiques restent du SQL simple ; `.limit(2000)` systématique ; index sur `(student_id)`, `(session_id)` et `(status)`.

### 6.3 RLS (calquée sur l'existant)
- Élève : `select/insert/update` sur ses propres lignes (`student_id = auth.uid()`), jamais de `delete` ; pas de modification d'une session `completed`. Écriture directe depuis le client (pas d'Edge Function intermédiaire).
- Enseignant : `select` sur les sessions des élèves de ses classes, jointure via **`students.class_id`/`students.auth_user_id`** ; `update` sur `jogging_enrichments` (ses élèves uniquement) et sur `flagged`.
- Admin : lecture agrégée pour le tableau de bord (aucune identité).

### 6.4 Intégration Grammalecte (côté client)
- La bibliothèque et son dictionnaire français sont servis en fichiers statiques (`lib/grammalecte/`), chargés uniquement sur `jogging.html`.
- `js/jogging-grammalecte.js` appelle le moteur sur le texte soumis, récupère la liste des erreurs détectées (règle déclenchée, position, suggestion), et **mappe chaque règle Grammalecte sur un critère Code Champion** (C/H/A/M/P/O/S) via une table de correspondance à construire et affiner (les identifiants de règles internes de Grammalecte devront être classés une fois, pas par jogging).
- Le mapping alimente directement les colonnes `feu_*` de `jogging_versions` — calcul entièrement local, écriture Supabase ensuite.
- Les messages bruts du moteur sont génériques ; §6.5 couvre leur reformulation pédagogique.

### 6.5 Bibliothèque de messages pédagogiques cycle 3
Livrable à part entière (comme le catalogue des 15 consignes) : pour chaque grande famille de règles Grammalecte utilisée, une explication reformulée pour un enfant de cycle 3 (ex. « Ici, le verbe ne s'accorde pas avec son sujet. Compte : combien de personnes font l'action ? » plutôt que le message technique du moteur), stockée dans `js/jogging-data.js` ou un fichier dédié `js/jogging-messages.js`, indexée par identifiant de règle. Travail ponctuel (quelques dizaines d'entrées, pas par élève ni par jogging), à produire en Phase 1.

### 6.6 Performance
- Bibliothèque + dictionnaire Grammalecte à charger uniquement sur `jogging.html` (pas sur les autres pages du site) pour ne pas alourdir le reste du site ; vérifier la taille du bundle et prévoir un chargement différé/asynchrone.
- Aucun coût récurrent, aucune limite de débit, aucune surveillance de facturation nécessaire.

---

## 7. Plan de développement par phases

### Phase 1 — Socle + boucle d'écriture (MVP cœur) ✅ critère : un élève réel termine un jogging complet
- Migration SQL (tables + RLS + index, version simplifiée sans Edge Function).
- Intégration Grammalecte côté client (`js/jogging-grammalecte.js`), table de correspondance règles → critères Code Champion, bibliothèque de messages pédagogiques cycle 3 (§6.5, premier jet sur les familles de règles les plus fréquentes).
- `redaction.html` (les 15 cartes), `jogging.html` : éditeur, auto-save, garde-fous, cycle V1→V3, écran de correction, tableau Code Champion pleine largeur (7 feux auto + N grisé), feux animés, message Mission.
- Test réel : 2–3 élèves (ou toi en compte élève test), ajustement du mapping règles → critères et des messages pédagogiques.

### Phase 2 — Espaces de suivi ✅ critère : un enseignant voit sa classe et peut reformuler
- Onglet élève « Mes joggings d'écriture » : Mon bilan, Mon historique (versions + corrections).
- Nouvelle page enseignant `synthese-joggings-enseignant.html` (5e `.main-tab`) : vue classe (feux, colonne N distincte), fiche élève avec **zone de reformulation et commentaire** (§5.5) et sélecteur du feu N.
- Fil d'Ariane élève et navigation `?tab=` intégrés ; navigation enseignant via lien `.main-tab` standard.
- « Générer le bilan PDF » (fusionné directement ici, la logique étant plus simple sans Edge Function d'enrichissement à attendre).

### Phase 3 — Motivation et progression
- Mes progrès (feux cliquables + conseils/défis), Mes réussites (badges), Mon évolution (graphiques), Mon objectif, Mon carnet d'auteur (+ export livre PDF).
- Statistiques enseignant (SQL agrégé + graphiques).

### Phase 4 — Ouvertures (à réévaluer plus tard, hors engagement)
- Joggings créés par l'enseignant ; assignation via le mode « guidé » ; extension du catalogue ; indicateurs admin d'usage ; dictée vocale ; affinage continu du mapping Grammalecte → Code Champion à mesure que des cas limites apparaissent en usage réel.

Chaque phase = une série de prompts Claude Code séparés, avec ta validation locale avant commit, et cache-busting `?v=` sur les CSS livrés.

---

## 8. Questions à trancher avant la Phase 1

1. ~~Modèle IA~~ **Sans objet** (pivot v2.0).
2. ~~Quota~~ **Sans objet** (pivot v2.0, coût nul).
3. **Indices vs réponses** (§3.6) : valides-tu « catégorie + explication générale en V1/V2, suggestion complète en finale » ?
4. **Bornes de texte** : 20–300 mots te conviennent-elles pour le cycle 3 ?
5. **Contenu inapproprié** (§3.10) : abandonner la détection automatique, ou ajouter une liste de mots-clés de vigilance grossière côté client ?
6. ~~Catalogue~~ **Tranché** : c'est Claude qui rédige les 15 consignes (déjà fait, voir `docs/catalogue-15-joggings.md`).
7. **Illustrations des cartes** : réutilisation d'un stock existant, ou création à prévoir ?
8. **Nouveau — publication de la reformulation enseignante** : visible immédiatement dès que l'enseignant l'enregistre, ou avec un bouton « publier » explicite pour éviter qu'un brouillon inachevé s'affiche à l'élève ?

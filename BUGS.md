# Audit du projet SITE-WEB-C3

Date : 2026-07-24 (mis à jour le 2026-07-24 après traitement des priorités urgentes)
Méthode : lecture systématique des 3 espaces (élève, enseignant, admin) et des fichiers JS/HTML/CSS principaux, complétée par des traces précises du parcours de données pour les 5 bugs déjà identifiés.

Chaque point comporte : fichier(s)/ligne(s), gravité, cause probable, correction proposée. Les 5 bugs déjà signalés sont repérés par **[Bug signalé #N]**.

Légende de gravité :
- 🔴 **Bloquant** — casse une fonctionnalité critique, perte de données, ou faille de sécurité exploitable.
- 🟠 **Gênant** — fonctionnalité dégradée, message trompeur, ou risque silencieux notable.
- 🟡 **Mineur** — code mort, incohérence cosmétique, log de debug, dette technique.

## État d'avancement (mis à jour le 2026-07-24, fin Jour 3)

**Bloquants** — B2 ✅ corrigé et déployé en production (migration `20260724150000_fix_feedback_admin_rls.sql`). B3 ✅ corrigé, commit `a8f0bd5` poussé sur `origin/main`. B1 ⚠️ déjà appliqué en production le 2026-07-22 10:00 UTC, action corrective impossible côté code (aucune sauvegarde/PITR disponible) — vérifié qu'aucune page HTML/JS ne référence plus `jogging_enrichments`, point clos côté code ; reste ouverte la question de récupération de données auprès du support Supabase, à la décision de l'utilisateur.

**Gênant — 11 des 12 points traités et poussés, 1 bloqué.**
- 6 commits isolés poussés sur `origin/main` (Jour 2) : G3 (`e3f7dca`), G6 (`98f53db`), G4 (`a76da17`), G7 (`1e22a2b`), G10 (`78c246c`), G11 (`371332d`).
- 5 points (G1, G2, G5, G8, G9) intégrés au commit consolidé du module Rédaction (Jour 3, voir ci-dessous).
- **1 point bloqué** : G12 (`.order()` manquant, `js/admin.js`) — le correctif a été écrit puis **retiré à la demande de l'utilisateur**, le code visé appartenant à un chantier « Pilotage plateforme » distinct, non encore repris. Non résolu, en attente.

**Mineur — les 12 points sont traités, 12 commits séparés, locaux, non poussés :**
M1 (`20bb0cd`), M2 (`ad513b3`), M3 (`fa3077e`), M4 (`76f7b6d`), M5 (`1cd0b97`), M6 (`f191d2f`), M7 (`e0ec88c`), M8 (`7dc43b0`), M9 (`8504c39`), M10 (`cc93dc7`), M11 (`c3192b4`), M12 (`61a7bf4`).

**Module Rédaction (Phase 2bis/2ter/2quater) — finalisé et consolidé.**
Commit unique `44d2491`, local, non poussé — regroupe le générateur de premier jet imprimable, l'impression groupée classe, la restructuration en 3 onglets, le message préventif élève, et les corrections G1/G2/G5/G8/G9 ci-dessus. Relecture de cohérence effectuée sur les 8 fichiers du module (IDs/fonctions DOM vérifiés par script, aucune référence résiduelle à `jogging_enrichments`) ; 2 erreurs Supabase non vérifiées supplémentaires trouvées et corrigées pendant cette relecture (`showCompletedState()` dans `js/jogging-engine.js`, `JoggingStudentSpace.render()` dans `js/jogging-student-space.js` — même pattern que G8, hors liste initiale de l'audit).

**Tests** — serveur statique local + Playwright (headless Chromium), Supabase stubbé (pas de compte réel disponible) :
- Smoke test des 3 espaces : 17 pages (publiques + protégées par `requireRole`), zéro erreur console, zéro erreur JS, toutes les redirections d'auth fonctionnent. Confirme entre autres que G3 (double chargement `supabase-client.js`) ne produit plus d'erreur sur `exercise.html`.
- `jogging.html` en session élève simulée : message préventif visible avec le bon texte (état éditeur) ; grille Code Champion à 9 cases avec colonne N visuellement distincte, bouton d'impression premier jet visible (état correction). Captures d'écran à l'appui.
- `synthese-joggings-enseignant.html` avec 0 classe : bascule des onglets Personnaliser/Imprimer/Résultats fonctionnelle (confirme G9). Capture d'écran à l'appui.
- `dashboard-eleve.html` avec onglet "joggings" mémorisé actif : contenu rendu correctement au lieu de rester vide (confirme G6). Capture d'écran à l'appui.

---

## 🔴 Bloquant

### B1. Migration destructive `jogging_enrichments` sans sauvegarde — perte de données irréversible ⚠️ DÉJÀ APPLIQUÉE, ACTION IMPOSSIBLE
*(complément au bug signalé #1 — voir G1 ci-dessous pour le symptôme visuel)*

- **Fichier** : `supabase/migrations/20260722100000_drop_jogging_enrichments.sql:19`
- **Constat corrigé (2026-07-24)** : l'analyse initiale était erronée. Le fichier de migration est bien non tracké par git (`git status` : `??`), mais **cela ne dit rien de l'état de la base** — git suit le dépôt, pas les migrations réellement jouées côté Supabase. Vérification directe sur le projet lié (`wugqxkiljayqqnzdctuf`) :
  - `supabase migration list --linked` : la migration `20260722100000` apparaît **appliquée côté remote depuis le 2026-07-22 10:00:00 UTC**.
  - `supabase db query --linked "select tablename from pg_tables where tablename='jogging_enrichments'"` → **0 ligne** : la table n'existe plus.
  - `supabase backups list --project-ref wugqxkiljayqqnzdctuf` → `"pitr_enabled":false, "backups":[]` : **aucune sauvegarde ni point-in-time recovery disponible** via les outils Supabase standard pour ce projet.
- **Cause probable** : `drop table if exists jogging_enrichments;` a été exécuté sans étape d'archivage préalable. Cette table contenait les reformulations/commentaires saisis manuellement par les enseignants (fonctionnalité mise en ligne avec la Phase 2, commit `4b1129d` du 2026-07-20 02:01) avant d'être remplacée par le générateur de premier jet imprimable. Fenêtre d'exposition réelle : ~2 jours (2026-07-20 02:01 → 2026-07-22 10:00) pendant laquelle des enseignants ont pu utiliser la fonctionnalité. Impossible de déterminer a posteriori si la table contenait effectivement des données au moment du DROP (pas de logs, pas de sauvegarde).
- **Gravité** : Bloquant — perte déjà survenue et irréversible via les moyens standards.
- **Action à décider par l'utilisateur** (aucune correction de code possible ici) : contacter le support Supabase en urgence en précisant l'heure exacte du DROP (2026-07-22 10:00 UTC) — une rétention WAL interne au-delà de ce qu'expose l'API `backups` est parfois récupérable manuellement par le support, mais la fenêtre se réduit chaque jour qui passe. Sinon, acter la perte et avertir les enseignants ayant utilisé la fonctionnalité entre le 20 et le 22 juillet.

### B2. `feedback.html` — le contrôle d'accès admin est cosmétique ; RLS autorise la modification/suppression publique ✅ CORRIGÉ (2026-07-24)
- **Fichiers** : `feedback.html:585-592` (policies SQL documentées dans le fichier), `feedback.html:596` (`const ADMIN_PASSWORD = 'lfm-admin-2026';`), `feedback.html:728-732` (affichage conditionnel des boutons admin via `sessionStorage`), `feedback.html:758-779` (`markDone()` / `deleteFeedback()`)
- **Cause probable** : le mot de passe admin était codé en clair côté client et ne servait qu'à afficher/masquer des boutons — visible instantanément via « Afficher le code source ». Les mutations réelles passaient directement par l'API Supabase (`window.lfmDb.from('feedback')...`), protégées par des policies RLS `using (true)` / `with check (true)` sur `update` et `delete`. Résultat : **n'importe qui possédant la clé anon publique** pouvait modifier ou supprimer n'importe quelle ligne `feedback` directement via l'API REST Supabase, sans authentification. Vérifié en direct sur la base avant correction (`supabase db query --linked` sur `pg_policies`) : confirmé, `feedback_update_public`/`feedback_delete_public` avaient bien `qual = true`. Le véritable espace admin (`dashboard-admin.html`/`js/admin.js`) était lui correctement protégé côté serveur — ce n'était pas un problème général du site, mais spécifique à cette page.
- **Gravité** : Bloquant (sécurité) — faille exploitable sans authentification.
- **Correction appliquée** :
  1. Nouvelle migration `supabase/migrations/20260724150000_fix_feedback_admin_rls.sql`, poussée en production via `supabase db push --linked` : suppression de `feedback_update_public`/`feedback_delete_public`, remplacées par `feedback_update_admin`/`feedback_delete_admin` avec `using (public.my_role() = 'admin')` (`select`/`insert` restent publics). Revérifié en base après application : les nouvelles policies sont bien actives.
  2. `feedback.html` : suppression du mot de passe codé en dur et du flag `sessionStorage` ; ajout de `js/auth.js` et d'une vérification de session réelle (`checkAdminSession()`, basée sur `lfmAuth.getProfile()` et `profile.role === 'admin'`) ; le bouton « Activer » (mot de passe) est remplacé par un lien « Se connecter » vers `auth.html?role=admin` ; « Quitter le mode admin » appelle désormais `lfmAuth.signOut()`.

### B3. `resetStudentPassword()` renvoie un succès même si la synchronisation du compte Auth échoue ✅ CORRIGÉ (2026-07-24) — commit local `a8f0bd5`, non poussé
- **Fichiers** : `js/teacher.js:418-454` (`resetStudentPassword`), consommé par `classes-enseignant.html:1717-1743` (`executeReset`)
- **Cause probable** : la fonction mettait à jour `students.password` en base (lignes 425-427) puis tentait de synchroniser le compte Supabase Auth réel via l'Edge Function `reset-student-password` (lignes 430-450). Si cet appel échouait (réseau, erreur 5xx, timeout), l'échec n'était que journalisé en `console.warn` — la fonction renvoyait quand même `newPassword` comme si tout s'était bien passé. `classes-enseignant.html` affichait alors ce mot de passe à l'enseignant comme le nouveau mot de passe à transmettre à l'élève, alors que le compte Auth réel avait conservé l'ancien mot de passe.
- **Gravité** : Bloquant (pour l'élève concerné) — celui-ci ne pouvait plus se connecter avec le mot de passe communiqué, sans qu'aucune erreur n'ait été signalée à l'enseignant.
- **Correction appliquée** : `resetStudentPassword` lève désormais une erreur explicite si la synchronisation Auth échoue (`authSyncOk` tracké, `throw new Error(...)` si `false`), au lieu de retourner silencieusement le mot de passe. `executeReset()` dans `classes-enseignant.html` gérait déjà ce cas via son `try/catch`/toast d'erreur existant — aucune modification nécessaire côté UI. **Commit séparé `a8f0bd5`, non poussé — en attente de validation avant `git push`.**

---

## 🟠 Gênant

### G1. [Bug signalé #1] Feux Code Champion — la colonne « N » reste en permanence blanche/« – »
- **Fichiers concernés (chemin de rendu)** :
  - Rendu vue classe : `synthese-joggings-enseignant.html:730-734` (en-têtes), `:748-753` (`feuCells`, icône `FEU_PICTO[state]`)
  - Rendu fiche élève : `synthese-joggings-enseignant.html:1267-1274` (`renderJoggingCard`, `feux[c] = last['feu_' + c.toLowerCase()] || 'blanc'`), `:1283-1286`
  - Rendu Bilan PDF : `synthese-joggings-enseignant.html:1340-1354`, `:1423-1424`
  - Table de correspondance icône : `synthese-joggings-enseignant.html:576` (`FEU_PICTO = { vert:'✔', orange:'~', rouge:'✖', blanc:'–' }`)
  - Écriture des données : `js/jogging-engine.js:199` (`feuColumns.feu_n = 'blanc'; // non automatisable`)
- **Cause probable** : les 7 autres critères (C,H,A,M,P,O,S) sont corrects de bout en bout (aucune régression). Le critère **N** était auparavant renseigné manuellement par l'enseignant via une « zone de reformulation » stockée dans la table `jogging_enrichments`. Le refactor en cours (Phase 2bis, voir `js/jogging-teacher.js` diff et B1 ci-dessus) retire entièrement ce mécanisme et le remplace par une évaluation « sur papier » qui n'est plus jamais reportée dans l'application — `feu_n` vaut donc systématiquement `'blanc'`, ce qui s'affiche comme `–`. C'est cohérent avec la nouvelle documentation (`docs/cahier-des-charges-redaction.md`) mais **rien dans l'interface ne signale à l'enseignant que ce changement est volontaire** : la tuile N est visuellement indiscernable d'un « pas encore de données », ce qui explique le symptôme rapporté (« tuiles vides »).
- **Correction proposée** : distinguer visuellement la colonne N des 7 autres (icône/texte différent, ex. « 📄 sur papier » plutôt que `–`), en s'appuyant sur la classe `jog-th-manual` déjà présente (`synthese-joggings-enseignant.html:132`/`732`) mais qui ne change actuellement que le fond, pas l'icône ni l'infobulle.

### G2. [Bug signalé #2] Message préventif élève — implémenté mais jamais committé ni déployé
- **Fichiers** : `jogging.html:56-60` (paragraphe `.jog-preventif-msg`), `css/jogging.css:512-521` (style associé)
- **Cause probable** : le code correspondant au §5.4 du cahier des charges (*« Ce correcteur guide ta relecture… »*) est présent et correct dans l'arborescence de travail actuelle, mais **ces modifications sont non committées** (`git status` : `modified`, non stagées) — `git log --all -S"preventif"` ne trouve aucun commit historique contenant ce code. La version actuellement committée sur `main` (et donc potentiellement déployée) ne contient pas du tout cet élément : il n'y a ni conflit de sélecteur ni condition défaillante à corriger, la fonctionnalité n'a simplement jamais été publiée.
- **Cause secondaire (mode visiteur)** : `jogging.html` est entièrement protégé par `lfmAuth.requireRole('eleve')` (`js/jogging-engine.js:533-534`, `js/auth.js:73-95`) qui redirige immédiatement vers `auth.html?role=eleve` en l'absence de session. Un visiteur anonyme n'atteint donc jamais le DOM de la page — comportement de garde d'accès voulu, pas un défaut du message lui-même.
- **Gravité** : Gênant — l'absence de ce rappel pédagogique explicite (ne pas sur-interpréter la correction automatique) est un manque réel, mais aucune autre fonctionnalité n'est cassée.
- **Correction proposée** : committer et pousser les modifications déjà présentes (`jogging.html:56-60`, `css/jogging.css:512-521`), vérifier visuellement le rendu en session élève avant publication, et incrémenter le cache-busting de `jogging.css` (`?v=1` → `?v=2`) pour éviter qu'un CDN/navigateur ne serve l'ancienne feuille de style en cache.

### G3. [Bug signalé #3] `supabase-client.js` (et le SDK Supabase) chargés deux fois dans `exercise.html`
- **Fichiers** : `exercise.html:11-12` (head : `@supabase/supabase-js@2` puis `js/supabase-client.js`) et `exercise.html:31081-31082` (même paire de scripts, juste avant `js/menu.js` en fin de page)
- **Cause probable** : doublon d'inclusion, probablement un reliquat de fusion/refactor. `js/supabase-client.js:11` déclare `const SUPABASE_URL = '...'` (et `SUPABASE_ANON`) au niveau global — en JavaScript classique (non-module), une redéclaration de `const` dans l'environnement lexical global provoque un `SyntaxError: Identifier 'SUPABASE_URL' has already been declared`, qui interrompt l'exécution de ce second `<script>` (mais pas des scripts suivants).
- **Gravité** : Gênant — pollue la console à chaque chargement de `exercise.html` (page la plus utilisée du site), et fragilise le chargement de scripts en cas de changement d'ordre futur ; la page reste néanmoins fonctionnelle car la première exécution de `supabase-client.js` a déjà initialisé `window.lfmDb` avant l'échec du doublon.
- **Correction proposée** : supprimer les deux `<script>` en doublon aux lignes 31081-31082 (le SDK et le client sont déjà chargés dans le `<head>`).

### G4. [Bug signalé #4] Fil d'Ariane « fiche élève » — non reproduit en l'état, mais point de fragilité réel identifié
- **Fichiers** : `resultats-enseignant.html:1424-1430` (`navigate()`), `:1432-1469` (`applyView()`), `:1474-1488` (`updateBreadcrumb()`), `:1645-1646` (`initLaurels()` / `renderStudentBilan()` non attendus/non protégés)
- **Constat** : le mécanisme de rendu du fil d'Ariane (boutons `onclick="navigate(...)"` générés dynamiquement) est correctement câblé — vérifié par test automatisé (Playwright, données Supabase simulées) : cliquer sur « Résultats » et sur « CM1D » change bien l'URL et bascule les vues (`#view-classes`/`#view-students`/`#view-student`). `js/breadcrumb.js` n'est même pas chargé sur cette page — c'est un composant sans rapport (fil d'Ariane des pages d'exercices élève), donc pas la cause.
- **Cause probable du symptôme réel** : `applyView()` (lignes 1432-1469) ne contient **aucun `try/catch`** autour de `await renderStudents(classId)` (1450) ou `await renderStudentDetail()` (1465), et `navigate()` appelle `history.pushState` **avant** d'invoquer `applyView()` sans l'attendre. Si le rendu de la vue de destination lève une exception (erreur Supabase/RLS réelle, ligne de données malformée), l'URL et le fil d'Ariane ont déjà changé, mais l'overlay `#view-loading` (affiché ligne 1439) n'est jamais masqué car il n'est caché qu'à la toute dernière ligne non conditionnelle (`1468`) — l'écran reste bloqué sur « Chargement… », visuellement indiscernable d'un clic qui « ne fait rien ». `initLaurels()` (appelé sans `await` ni `.catch()` ligne 1645) présente le même schéma de défaillance silencieuse.
- **Gravité** : Gênant à potentiellement bloquant selon la fréquence de déclenchement — le mécanisme de navigation lui-même est sain, mais toute erreur backend au moment du clic laisse l'enseignant durablement bloqué sans message d'erreur ni recours autre qu'un rechargement manuel.
- **Correction proposée** : entourer les `await` de `applyView()` d'un `try/catch/finally`, garantir que `#view-loading` est masqué dans tous les cas, afficher un message d'erreur explicite en cas d'échec, et ajouter `.catch()` aux appels `initLaurels()`/`renderStudentBilan()` non attendus.

### G5. [Bug signalé #5] Fuite de l'interface à l'impression — pas sur « Imprimer les premiers jets », mais sur le « Bilan PDF »
- **Fichiers** : liste noire incomplète en `synthese-joggings-enseignant.html:317-334` (règles `body.printing-jog-bilan`), comparée à la déclaration de `#jog-tabs` en `:407`
- **Cause probable** : le flux « 🖨️ Imprimer les premiers jets » (`JoggingPrint.generate()`/`generateBatch()`, `js/jogging-print.js`, `css/jogging-print.css:206-212`) fonctionne correctement et utilise une **liste blanche** (`.dash-content > *:not(#jog-print-root) { display:none }`) qui masque automatiquement tout élément non prévu. En revanche, le bouton distinct « 📄 Générer le bilan PDF » (`synthese-joggings-enseignant.html:511`, fonction `printStudentJoggingBilan()`) utilise une **liste noire** codée en dur dans un `<style>` du `<head>` (lignes 325-329 : `.navbar`, `footer`, `.breadcrumb`, `.main-tabs`, `.jog-teacher-intro`, `.student-header`, `.stats-row-3`, `#jog-student-joggings`, `.nav-footer`) qui **omet `#jog-tabs`**, la barre à 3 onglets ajoutée en Phase 2quater — dont le bouton du milieu porte justement le libellé « 🖨️ Imprimer les premiers jets », ce qui explique probablement la confusion du signalement initial. Le fichier `css/jogging-print.css:191-200` documente lui-même ce risque et l'a corrigé pour son propre flux, sans que le correctif soit reporté sur l'autre.
- **Gravité** : Gênant — n'affecte pas le flux de correction (premiers jets), mais dégrade systématiquement chaque Bilan PDF distribué aux familles (bandeau de navigation en haut de chaque impression).
- **Correction proposée** : ajouter `body.printing-jog-bilan #jog-tabs` à la liste noire existante (ligne ~328), ou migrer `printing-jog-bilan` vers le même patron « liste blanche » que `printing-jog-premier-jet`, en déplaçant idéalement la règle dans `css/jogging-print.css` pour une source unique.

### G6. `dashboard-eleve.html` — l'onglet « Mes joggings d'écriture » reste vide si c'est l'onglet mémorisé au chargement
- **Fichiers** : `dashboard-eleve.html:717-730` (`activateTab`), `:742` (appel initial synchrone), `:989` (filet de sécurité `await refreshResultsTab()` — existe seulement pour l'onglet « Résultats »)
- **Cause probable** : `activateTab(...)` est appelé avant la résolution de `lfmAuth.requireRole('eleve')`, donc avec `_profile === null` : les conditions `if (tabName === 'joggings' && _profile)` ne se déclenchent jamais à ce moment. Un filet de sécurité existe bien après le chargement du profil, mais uniquement pour l'onglet « Résultats » (`refreshResultsTab()`, ligne 989) — pas pour l'onglet « joggings ». Si le dernier onglet actif mémorisé en `sessionStorage` est `'joggings'` (cas courant), l'onglet s'affiche vide au retour sur la page.
- **Gravité** : Gênant.
- **Correction proposée** : après l'affectation de `_profile`, appeler explicitement `JoggingStudentSpace.render(_profile.id)` si l'onglet actif est `'joggings'`, symétriquement à ce qui est fait pour l'onglet Résultats (factoriser un `refreshActiveTabData()`).

### G7. `resultats-enseignant.html` — table `EXERCISE_META` obsolète : 35 exercices sur 83 marqués à tort « retiré du catalogue »
- **Fichiers** : `resultats-enseignant.html:833-902` (déclaration `EXERCISE_META`, avec TODO explicite en 824-832), utilisée en `:1156` (Vue d'ensemble classe) et `:1969` (Bilan de compétences / bulletin PDF)
- **Cause probable** : `EXERCISE_META` duplique manuellement une partie de `exercise-data.js` au lieu de le charger dynamiquement. 35 des 83 slugs actuels de `exercise-data.js` en sont absents (ex. `decomposer-nombre-entier`, `comparer-decimaux`, `etre-ou-avoir`, `probabilite-chances`…), donc `EXERCISE_META[slug] || UNKNOWN_META` retombe sur `{ domaine: 'Autres', competence: 'Exercice retiré du catalogue' }` pour des exercices pourtant actifs.
- **Gravité** : Gênant — fausse à la fois la Vue d'ensemble classe et le bulletin PDF envoyé aux familles.
- **Correction proposée** : remplacer `EXERCISE_META` par un chargement dynamique via `exercise-data.js` + `lfmAnalytics.buildCatalogMap()`, comme déjà fait dans `pilotage-enseignant.html`/`remediations-enseignant.html` (piste déjà notée dans le TODO du fichier).

### G8. `js/jogging-teacher.js` — erreurs Supabase avalées sur `jogging_versions`, message trompeur en cas de panne réelle
- **Fichiers** : `js/jogging-teacher.js:59-61`, `:85-90`, `:124-129`, `:266-269`
- **Cause probable** : ces requêtes ne vérifient/relancent jamais `error` (contrairement aux requêtes voisines sur `jogging_sessions`/`jogging_class_settings`, qui font systématiquement `if (error) throw error`). En cas d'échec réseau/RLS transitoire, le cas le plus trompeur concerne `getClassJoggingSubmissions` (ligne 266, utilisée par l'onglet « Imprimer les premiers jets ») : si la requête échoue, chaque élève est filtré par `if (!lastVersion) return;` (ligne 276) et l'UI affiche « Aucun élève de cette classe n'a encore soumis de version » — un message factuellement faux qui masque un incident technique.
- **Gravité** : Gênant.
- **Correction proposée** : ajouter `if (error) throw error;` sur ces 4 requêtes, comme partout ailleurs dans le fichier, pour que l'échec remonte au `try/catch` appelant et affiche un vrai message d'erreur.

### G9. `synthese-joggings-enseignant.html` — onglets « Personnaliser » / « Imprimer » inertes pour un enseignant sans classe
- **Fichier** : `synthese-joggings-enseignant.html:1478-1499` (IIFE d'initialisation)
- **Cause probable** : quand `_classes.length === 0`, le code affiche `#jog-tabs` puis fait un `return` anticipé **avant** l'attache des `addEventListener('click', …)` sur `.jog-tab` (lignes 1496-1498) et avant `populateImprimerFilters()`. Les boutons d'onglets restent visibles mais ne réagissent à aucun clic.
- **Gravité** : Gênant.
- **Correction proposée** : sortir l'attache des écouteurs du chemin conditionné par `_classes.length`, ou la dupliquer avant le `return` anticipé.

### G10. `js/teacher.js` — `createStudent()` peut créer un élève sans compte Auth, sans aucun signal visuel
- **Fichiers** : `js/teacher.js:456-479` (`createStudent`), `classes-enseignant.html` (aucune vérification de `auth_user_id`)
- **Cause probable** : si `_createStudentAuth()` échoue (ligne 463-467, volontairement silencieux), l'élève est quand même inséré avec `auth_user_id: null` (ligne 475). Rien dans `classes-enseignant.html` ne signale cet état : l'élève disparaît silencieusement des calculs de résultats (qui filtrent sur `auth_user_id` non nul), donnant l'impression qu'il « n'a jamais rien fait » alors qu'il ne peut simplement pas se connecter.
- **Gravité** : Gênant.
- **Correction proposée** : afficher un badge/état sur la ligne de l'élève quand `auth_user_id` est `null` (« Compte de connexion à créer »), avec une action de rattrapage.

### G11. `dashboard-enseignant.html` — module « Joggings d'écriture » invisible depuis le tableau de bord principal
- **Fichier** : `dashboard-enseignant.html:291-320` (`.dash-grid`)
- **Cause probable** : les 4 autres pages enseignant partagent une nav `.main-tabs` à 5 entrées incluant « ✍️ Joggings d'écriture ». Le tableau de bord principal (point d'entrée après connexion) n'a ni cette nav, ni de carte correspondante dans `.dash-grid` (seulement Mes classes / Pilotage / Résultats / Remédiations). Un enseignant ne découvre le module que s'il connaît déjà l'URL ou passe d'abord par une autre page.
- **Gravité** : Gênant.
- **Correction proposée** : ajouter une 5ᵉ `.dash-card` vers `synthese-joggings-enseignant.html`.

### G12. `js/admin.js` — `getAllResultsRaw()` pagine sans tri stable 🚧 BLOQUÉ (en attente du chantier « Pilotage plateforme »)
- **Fichier** : `js/admin.js:133-148`
- **Cause probable** : la fonction pagine `exercise_results` avec `.range(offset, offset+999)` sans `.order(...)` préalable. Sans tri stable, PostgREST ne garantit pas un ordre cohérent entre requêtes successives : au-delà de 1000 lignes, des enregistrements peuvent être sautés ou dupliqués, faussant silencieusement les statistiques « Compétences — plateforme » (`dashboard-admin.html:981-1028`). La fonction analogue `getClassResultsRaw` (`js/teacher.js:573-593`) applique correctement `.order('completed_at', ...)`, confirmant qu'il s'agit d'un oubli dans le nouveau code.
- **Gravité** : Gênant.
- **Correction proposée** : ajouter `.order('completed_at', { ascending: false })` (ou une colonne stable équivalente) avant `.range()`.
- **Statut (2026-07-24)** : **non résolu.** `getAllResultsRaw()` elle-même n'existe dans aucun commit — c'est du code déjà présent, non commité, dans `js/admin.js` avant même le début de cet audit (chantier « Pilotage plateforme », sans rapport avec le module Rédaction). Un correctif d'une ligne a été écrit puis **retiré à la demande de l'utilisateur** le temps que ce chantier soit repris séparément, pour ne pas mélanger un fix isolé avec une fonctionnalité entière non validée. À refaire quand `js/admin.js`/`dashboard-admin.html` (stats « Pilotage plateforme ») seront traités.

### G13. Vue classe — "brouillon en cours" affiché comme 9 tirets, indiscernable d'un résultat réel ✅ CORRIGÉ — commit `ab35270`, local, non poussé
*(trouvé le 2026-07-24 en testant G8 en conditions réelles, hors liste initiale de l'audit)*
- **Fichiers** : `js/jogging-teacher.js:32-69` (`getClassOverview`), `synthese-joggings-enseignant.html:746-754` (rendu de la Vue classe)
- **Cause probable** : `getClassOverview()` distinguait uniquement « pas de session » (`!session` → « Aucun jogging ») de « session avec feux ». Quand la session la plus récente d'un élève n'a aucune version soumise (jogging ouvert, jamais écrit ou jamais corrigé), `feuxFromVersion(undefined)` renvoie les 9 codes à `'blanc'` — rendu comme une ligne de 9 tirets identiques, indiscernable d'un résultat réel où tout serait blanc.
- **Confirmé en conditions réelles** : élève « Pierre », session `portrait-heros` (`status: in_progress`, `current_version: 1`, `draft_text: ""`), `select count(*) from jogging_versions where session_id = '...'` → 0 ligne. Ce même état est déjà correctement filtré ailleurs dans ce fichier (`getClassJoggingSubmissions`, onglet Imprimer, commentaire `// session créée mais aucune version soumise (brouillon vide)`) — seule la Vue classe (« Résultats des joggings ») ne le distinguait pas.
- **Gravité** : Gênant — pas de perte de données, mais un enseignant peut lire à tort une ligne de tirets comme « résultat vide/anormal » plutôt que « rien soumis pour l'instant ».
- **Correction appliquée** : `getClassOverview()` renvoie un flag `hasVersion` (`versionBySession.has(session.id)`) ; la Vue classe affiche « Brouillon en cours » au lieu des 9 tirets quand `session` existe mais `hasVersion` est faux.

---

## 🟡 Mineur

### M1. `css/jogging.css:558-577` — classes `.jog-histo-enrichment*` orphelines ✅ CORRIGÉ — commit `20bb0cd`, local, non poussé
Reliquat de l'ancienne « zone de reformulation enseignant » (voir B1/G1) : `.jog-histo-enrichment`, `.jog-histo-enrichment-title`, `.jog-histo-comment` ne sont plus référencées nulle part dans le code. **Correction** : supprimer ces règles.

### M2. `dashboard-eleve.html:928` — `console.log('[DEBUG] ...')` laissé en production ✅ CORRIGÉ — commit `ad513b3`, local, non poussé
S'exécute à chaque affichage de l'onglet « Mes résultats » et à chaque retour `pageshow`. **Correction** : retirer la ligne ou la remplacer par un `console.warn` conditionné à une vraie erreur.

### M3. `js/jogging-badges.js:141-162` — erreurs Supabase non vérifiées dans `syncBadges()` ✅ CORRIGÉ — commit `fa3077e`, local, non poussé
Ni le `select` ni l'`insert` ne vérifient `error` ; un échec transitoire peut provoquer une tentative de ré-insertion silencieuse de badges déjà obtenus, sans aucun log. **Correction** : ajouter des `console.warn` sur erreur, comme dans les modules voisins (`js/level-unlock.js`, `js/niveau-mode.js`).

### M4. `js/jogging-engine.js:569-591` — risque de session dupliquée si le `select` initial échoue silencieusement ✅ CORRIGÉ — commit `76f7b6d`, local, non poussé
Le `select` sur `jogging_sessions` ne vérifie pas `error` ; un échec réseau transitoire fait passer le code dans la branche de création, dupliquant potentiellement une session existante. **Correction** : vérifier `error` et afficher l'écran d'erreur existant plutôt que de créer une nouvelle session.

### M5. Réutilisation trompeuse de la classe `.jog-carnet-add-btn` ✅ CORRIGÉ — commit `1cd0b97`, local, non poussé
`js/jogging-student-space.js:123` réutilise cette classe (pensée pour le bouton « Ajouter à mon carnet », `js/jogging-engine.js:301/484`) pour un bouton d'impression sans rapport, uniquement pour hériter du style. **Correction** : renommer en un nom neutre partagé, ou créer une classe dédiée avec les mêmes styles.

### M6. `index-v2.html` — fichier mort, non lié depuis le site ✅ CORRIGÉ — commit `f191d2f`, local, non poussé
Aucun `<a href>`, redirection ou référence ne pointe vers ce fichier ailleurs dans le dépôt ; il duplique une bonne partie de la page d'accueil et risque de diverger silencieusement si `index.html` est mis à jour. **Correction** : supprimer le fichier, ou le déplacer hors de la racine publique s'il s'agit d'un brouillon en cours.

### M7. `js/auth.js:33` — `console.log` laissé en production dans `signUp()` ✅ CORRIGÉ — commit `e0ec88c`, local, non poussé
Journalise l'UUID et le nombre d'identités de chaque nouvel enseignant inscrit. **Correction** : retirer la ligne ou la conditionner à un flag de debug.

### M8. Fonction d'échappement HTML dupliquée indépendamment à 4 endroits ✅ CORRIGÉ — commit `7dc43b0`, local, non poussé
`dashboard-admin.html:516-520`, `js/menu.js:335-341`, `feedback.html:749-755`, `remediation.html:215-221` (ce dernier avec une gestion du `null` légèrement différente). **Correction** : extraire un `escHtml()` unique dans un fichier partagé (`js/utils.js` ou `supabase-client.js`).

### M9. `err.log` — fichier vide non tracké, non ignoré ✅ CORRIGÉ — commit `8504c39`, local, non poussé
0 octet, présent en racine, non couvert par `.gitignore`. **Correction** : supprimer le fichier et ajouter `*.log` au `.gitignore`.

### M10. `resultats-enseignant.html:2075-2100` — fonction morte `renderHistory()` référençant un id DOM inexistant ✅ CORRIGÉ — commit `cc93dc7`, local, non poussé
Cible `document.getElementById('history-tbody')`, qui n'existe dans aucun document, et n'est appelée nulle part. CSS associée `.history-card*` (lignes 218-224) également orpheline. **Correction** : supprimer la fonction et les règles CSS associées.

### M11. `js/teacher.js:514` et `:628` — `console.log('[DEBUG] ...')` laissés en production ✅ CORRIGÉ — commit `c3192b4`, local, non poussé
Dans `getClassResults()` et `getStudentStats()`, exécutés à chaque chargement de la Vue d'ensemble et de la fiche élève. **Correction** : supprimer les deux lignes.

### M12. Commentaires obsolètes « 4 onglets » dans 4 fichiers ✅ CORRIGÉ — commit `61a7bf4`, local, non poussé
`classes-enseignant.html:46`, `pilotage-enseignant.html:26`, `remediations-enseignant.html:26`, `resultats-enseignant.html:35` mentionnent encore « 4 onglets » alors que la nav en compte désormais 5 (ajout de « Joggings d'écriture »). **Correction** : mettre à jour le commentaire dans les 4 fichiers.

---

## Estimation de temps — 24 points restants (pour réorganisation Jours 2/3)

Temps de correction estimé (code + test rapide en local), hors déploiement et QA approfondie.

| # | Résumé | Gravité | Estimation |
|---|--------|---------|------------|
| G7 | `EXERCISE_META` obsolète (35/83 exercices mal classés) | Gênant | 60-90 min |
| G1 | Code Champion — distinguer visuellement la colonne N | Gênant | 45-60 min |
| G4 | `applyView()` sans try/catch/finally (fil d'Ariane) | Gênant | 45-60 min |
| G10 | `createStudent()` — signal visuel compte Auth manquant | Gênant | 45-60 min |
| G6 | Onglet joggings vide au chargement (`dashboard-eleve.html`) | Gênant | 30-40 min |
| G8 | Erreurs Supabase avalées sur `jogging_versions` (4 requêtes) | Gênant | 20-30 min |
| G9 | Onglets Personnaliser/Imprimer inertes (0 classe) | Gênant | 20-30 min |
| G2 | Committer/pousser le message préventif déjà écrit | Gênant | 15-20 min |
| G5 | Fuite `#jog-tabs` sur Bilan PDF (fix rapide liste noire) | Gênant | 15 min (45 min si refactor liste blanche) |
| G11 | Carte « Joggings d'écriture » manquante sur dashboard enseignant | Gênant | 15-20 min |
| G3 | Retirer le double chargement `supabase-client.js` | Gênant | 10-15 min |
| G12 | `.order()` manquant dans `getAllResultsRaw()` — 🚧 bloqué, hors périmètre (chantier « Pilotage plateforme ») | Gênant | 10 min |
| **Sous-total Gênant** | | | **≈ 6h20-6h50** |
| M8 | Extraire `escHtml()` partagé (4 fichiers) | Mineur | 30-45 min |
| M4 | Vérifier `error` sur le `select` de session (risque doublon) | Mineur | 20-30 min |
| M5 | Renommer/dédupliquer `.jog-carnet-add-btn` | Mineur | 15-20 min |
| M3 | `console.warn` sur erreurs `syncBadges()` | Mineur | 10-15 min |
| M6 | Supprimer/déplacer `index-v2.html` (fichier mort) | Mineur | 10 min |
| M10 | Supprimer `renderHistory()` morte + CSS associée | Mineur | 10 min |
| M12 | Corriger commentaires « 4 onglets » (4 fichiers) | Mineur | 10 min |
| M1 | Supprimer CSS `.jog-histo-enrichment*` orpheline | Mineur | 5 min |
| M2 | Retirer `console.log` DEBUG (`dashboard-eleve.html:928`) | Mineur | 5 min |
| M7 | Retirer `console.log` (`js/auth.js:33`) | Mineur | 5 min |
| M9 | Supprimer `err.log` + ajouter au `.gitignore` | Mineur | 5 min |
| M11 | Retirer 2 `console.log` DEBUG (`js/teacher.js:514,628`) | Mineur | 5 min |
| **Sous-total Mineur** | | | **≈ 2h10-2h40** |
| **Total 24 points** | | | **≈ 8h30-9h30** |

Suggestion de répartition (à valider/réorganiser) : Jour 2 = tous les gênants (~6,5h, dans l'ordre du tableau — G7/G1/G4/G10 sont les plus substantiels) ; Jour 3 = tous les mineurs (~2,5h) + marge pour tests/QA sur les corrections du Jour 2.

---

## Points vérifiés et écartés (pas de bug confirmé)

- La migration `20260722100000_drop_jogging_enrichments.sql` est bien répercutée dans le code applicatif : aucune référence résiduelle à `saveEnrichment`/`jogging_enrichments` trouvée dans le dépôt.
- Aucune collision de noms de fonctions/variables globales entre les scripts chargés simultanément sur les pages auditées (modules encapsulés en IIFE).
- `css/jogging-print.css` et `js/jogging-print.js` sont correctement inclus sur les 3 pages qui les utilisent, et `#jog-print-root` respecte la structure attendue par la règle CSS « liste blanche ».
- L'espace admin légitime (`dashboard-admin.html`/`js/admin.js`) applique une autorisation côté serveur correcte (fonctions `SECURITY DEFINER`, Edge Functions, policies RLS scopées `admin`) — à distinguer du problème spécifique de `feedback.html` (B2).
- `REMEDIATION_DATA` vide (`js/remediation-data.js:60-62`) est un état documenté comme volontaire (lot en cours), pas un bug.
- Les nouvelles fonctions ajoutées à `exercise.html` pour le type `imparfait-groupes-niveaux` sont correctement câblées et cohérentes avec `exercise-data.js`.

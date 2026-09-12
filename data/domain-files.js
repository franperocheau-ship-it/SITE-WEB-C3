/* ── data/domain-files.js — Liste canonique des fichiers de domaine EXERCISE_DATA
   à charger en paresseux (loadScript), partagée entre pilotage-enseignant.html,
   remediations-enseignant.html et dashboard-admin.html.

   Avant ce fichier, chacun de ces 3 écrans maintenait sa PROPRE copie de cette
   liste — les 3 copies avaient fini par diverger silencieusement de la liste
   des 11 fichiers réellement utilisée par data/index.js (chargement synchrone,
   pages élève) : il leur manquait à tous data/orthographe-homophones.js, ce qui
   rendait les 10 compétences "Orthographe — Homophones grammaticaux" invisibles
   sur ces 3 écrans (voir resultats-enseignant.html, qui avait déjà rencontré et
   corrigé exactement ce même oubli séparément). Un seul tableau à maintenir ici
   pour les 3 : plus de copie à oublier de mettre à jour.

   data/index.js ne peut pas charger CE fichier lui-même à sa place : il injecte
   ses <script> via document.write, qui casse le document s'il est déclenché
   après le chargement initial de la page (voir son propre commentaire) — donc
   incompatible avec le chargement paresseux (loadScript) utilisé ici. Les deux
   listes restent séparées ; si un fichier de domaine est ajouté/retiré dans
   data/index.js, reporter le changement ici (les numéros de version ne sont
   pas forcément identiques : ceux ci-dessous suivent les versions déjà en
   usage sur les 3 écrans paresseux, pas celles de data/index.js). */
window.EXERCISE_DOMAIN_FILE_URLS = [
  'data/conjugaison.js?v=2',
  'data/grammaire.js?v=10',
  'data/orthographe.js?v=2',
  'data/orthographe-homophones.js?v=2',
  'data/lecture.js?v=2',
  'data/nombres-entiers.js?v=2',
  'data/fractions.js?v=3',
  'data/nombres-decimaux.js?v=2',
  'data/probabilites.js?v=8',
  'data/proportionnalite.js?v=1',
  'data/vocabulaire.js?v=2'
];

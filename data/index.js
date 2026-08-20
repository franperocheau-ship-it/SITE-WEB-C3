/* ── data/index.js — Agrégateur des fichiers de domaine EXERCISE_DATA ─────────
   Injecte les 7 fichiers data/*.js via document.write (script bloquant,
   chargé en <head> avant le reste de la page — même comportement que
   l'ancien exercise-data.js chargé en un seul <script src>).

   Ne PAS utiliser via loadScript()/injection dynamique après le chargement
   de la page : document.write casse le document dans ce cas. Les pages qui
   chargent le catalogue en paresseux (loadExerciseAssets / loadScript)
   chargent directement les 7 fichiers data/*.js en parallèle à la place.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  var DOMAIN_FILES = [
    "data/conjugaison.js",
    "data/grammaire.js",
    "data/orthographe.js",
    "data/orthographe-homophones.js",
    "data/lecture.js",
    "data/nombres-entiers.js",
    "data/fractions.js",
    "data/nombres-decimaux.js",
    "data/probabilites.js",
    "data/vocabulaire.js"
  ];
  DOMAIN_FILES.forEach(function (src) {
    document.write('<script src="' + src + '?v=10"></script>');
  });
})();

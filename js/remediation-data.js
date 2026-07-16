/* ─────────────────────────────────────────────────────────────────────────────
   remediation-data.js — Ressources de remédiation par compétence (Lot D).
   Dépend de : rien. Chargé après exercise-data.js par remediations-enseignant.html
   et remediation.html.

   ⚠️  IMPORTANT — CLÉS FRAGILES PAR CONSTRUCTION
   Les clés de REMEDIATION_DATA doivent correspondre EXACTEMENT, caractère
   pour caractère, aux libellés `competence` utilisés dans exercise-data.js
   (ex. "Conjugaison — Être au présent", tiret cadratin inclus). Si un libellé
   est renommé dans exercise-data.js sans que la clé correspondante soit
   renommée ici, la fiche devient orpheline SILENCIEUSEMENT : elle reste dans
   ce fichier, syntaxiquement valide, mais ne sera plus jamais reliée à aucune
   compétence affichée dans l'onglet Remédiations.
   Pour limiter le risque, remediations-enseignant.html vérifie au chargement
   que chaque clé de REMEDIATION_DATA correspond à une compétence existante
   dans EXERCISE_DATA, et signale les clés orphelines par un console.warn
   (jamais bloquant, jamais visible pour l'enseignant — à surveiller
   ponctuellement dans la console du navigateur après un renommage).

   ── STRUCTURE ATTENDUE POUR CHAQUE COMPÉTENCE ───────────────────────────────
   {
     theorie:     [ { titre, description, lien? }, ... ],  // rappels théoriques, règles
     outils:      [ { titre, description, lien? }, ... ],  // supports, fiches, outils concrets
     dispositifs: [ { titre, description, lien? }, ... ]   // dispositifs pédagogiques (ateliers, tutorat, groupes de besoin...)
   }
   `lien` est optionnel (omettre le champ ou mettre `null` si pas de lien).
   Une compétence absente de cet objet, ou présente mais avec ses 3 tableaux
   vides, s'affiche comme "Fiche à compléter" dans l'onglet Remédiations —
   c'est l'état de départ normal pour toute nouvelle compétence, pas une erreur.

   ── EXEMPLE COMPLET (à copier-coller comme point de départ) ─────────────────
   Décommenter, coller dans REMEDIATION_DATA ci-dessous, remplacer la clé par
   le libellé exact de la compétence visée, puis adapter le contenu.

   "Conjugaison — Être au présent": {
     theorie: [
       {
         titre: "Le verbe être au présent de l'indicatif",
         description: "Rappel des 6 formes conjuguées (je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont) et des erreurs fréquentes (confusion avec 'et').",
         lien: "https://exemple.fr/regle-etre-present"
       }
     ],
     outils: [
       {
         titre: "Carte mentale des conjugaisons du verbe être",
         description: "Support visuel à imprimer, une conjugaison par branche.",
         lien: "https://exemple.fr/carte-mentale-etre"
       }
     ],
     dispositifs: [
       {
         titre: "Atelier de manipulation en groupe de besoin",
         description: "Petit groupe (4-5 élèves) : jeu de cartes sujet + terminaison à associer, 15 minutes, en autonomie pendant que le reste de la classe travaille sur un exercice écrit.",
         lien: null
       }
     ]
   }
   ───────────────────────────────────────────────────────────────────────────── */

const REMEDIATION_DATA = {

};

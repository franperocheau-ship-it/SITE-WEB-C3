/* ─────────────────────────────────────────────────────────────────────────────
   dictees-word-stats.js — Calcul partagé du retour "erreurs les plus
   fréquentes" des dictées préparées (dictee_results.wrong_mot_ids côté
   lexical, dictee_gram_results.wrong_items côté grammatical), utilisé à la
   fois côté élève (js/dictees-student-space.js) et côté enseignant
   (js/dictees-teacher.js, resultats-dictees-enseignant.html) pour rester
   cohérent entre les deux affichages — un seul calcul de fréquence, appliqué
   à des portées de résultats différentes (un élève sur une dictée, ou toute
   une dictée).

   Volet grammatical : seul l'exercice "Texte à trous" (type = 'trous')
   alimente wrong_items pour l'instant (cf. migration
   20260914100000_dictee_gram_results_wrong_items) — classification, trous de
   conjugaison et transformation n'ont toujours pas de suivi mot-par-mot
   (colonne nulle pour eux, tallyText() ne renvoie donc rien les concernant).
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesWordStats = (() => {
  /* Fréquence des mots ratés dans `results` (lignes dictee_results, toutes
     tentatives confondues — pas seulement la dernière, pour refléter la
     difficulté réelle du mot), triée du plus raté au moins raté.
     `motById` : Map(dictee_mots.id → contenu). */
  function tally(results, motById) {
    const counts = new Map();
    (results || []).forEach(r => (r.wrong_mot_ids || []).forEach(motId => {
      counts.set(motId, (counts.get(motId) || 0) + 1);
    }));
    /* motById peut ne plus contenir motId : la liste de mots d'une dictée
       est remplacée en bloc (delete-then-reinsert, cf. js/dictees-teacher.js/
       replaceMots) à chaque modification par l'enseignant, ce qui régénère
       tous les id — les wrong_mot_ids de résultats antérieurs à une
       modification pointent alors vers des mots qui n'existent plus. Ces
       entrées orphelines sont ignorées plutôt qu'affichées comme un mot
       « — » illisible (bug remonté 2026-08-16 : la ligne "Erreurs" n'affiche
       que des tirets). */
    return [...counts.entries()]
      .filter(([motId]) => motById.has(motId))
      .map(([motId, count]) => ({ contenu: motById.get(motId), count }))
      .sort((a, b) => b.count - a.count);
  }

  /* Équivalent de tally() pour des items déjà textuels (dictee_gram_results.
     wrong_items — le mot attendu est stocké en clair, pas un id à résoudre
     via une table de référence, cf. migration 20260914100000). `field` :
     nom de la colonne array sur chaque ligne de `results` (ex. 'wrong_items'). */
  function tallyText(results, field) {
    const counts = new Map();
    (results || []).forEach(r => (r[field] || []).forEach(text => {
      counts.set(text, (counts.get(text) || 0) + 1);
    }));
    return [...counts.entries()]
      .map(([contenu, count]) => ({ contenu, count }))
      .sort((a, b) => b.count - a.count);
  }

  /* Fusionne plusieurs listes déjà au format tally()/tallyText() (ex. lexical
     + grammatical "texte à trous" d'un même élève sur une même dictée) en une
     seule, sommant les occurrences d'un contenu apparu dans plusieurs
     sources puis retriant par fréquence totale. */
  function mergeTallies(...tallies) {
    const counts = new Map();
    tallies.forEach(t => (t || []).forEach(({ contenu, count }) => {
      counts.set(contenu, (counts.get(contenu) || 0) + count);
    }));
    return [...counts.entries()]
      .map(([contenu, count]) => ({ contenu, count }))
      .sort((a, b) => b.count - a.count);
  }

  /* "inaccessible ; un lycée ; ..." — une seule ligne, mots seuls (sans le
     nombre d'occurrences, cf. tri par fréquence déjà fait dans tally()),
     vide si aucune erreur. */
  function formatLine(tallied) {
    return (tallied || []).map(t => t.contenu).join(' ; ');
  }

  /* Nombre moyen de mots ratés par résultat (longueur de wrong_mot_ids),
     arrondi à 1 décimale — null si `results` est vide (aucun résultat à
     moyenner, distinct de "0 erreur en moyenne"). */
  function averageMissedCount(results) {
    if (!results || results.length === 0) return null;
    const sum = results.reduce((s, r) => s + (r.wrong_mot_ids || []).length, 0);
    return Math.round((sum / results.length) * 10) / 10;
  }

  return { tally, tallyText, mergeTallies, formatLine, averageMissedCount };
})();

/* ─────────────────────────────────────────────────────────────────────────────
   dictees-word-stats.js — Calcul partagé du retour "erreurs les plus
   fréquentes" du volet orthographe lexicale des dictées préparées
   (dictee_results.wrong_mot_ids), utilisé à la fois côté élève
   (js/dictees-student-space.js) et côté enseignant (js/dictees-teacher.js,
   resultats-dictees-enseignant.html) pour rester cohérent entre les deux
   affichages — un seul calcul de fréquence, appliqué à des portées de
   résultats différentes (un élève sur une dictée, ou toute une dictée).

   Ne couvre que l'orthographe lexicale (dictee_mots/wrong_mot_ids) : le volet
   orthographe grammaticale n'a pas de suivi mot-par-mot équivalent.
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
    return [...counts.entries()]
      .map(([motId, count]) => ({ contenu: motById.get(motId) || '—', count }))
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

  return { tally, formatLine, averageMissedCount };
})();

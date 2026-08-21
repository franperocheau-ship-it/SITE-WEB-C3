/* ─────────────────────────────────────────────────────────────────────────────
   niveau-pastilles.js — Rendu partagé du "Bilan par compétences" : arborescence
   Domaine > Sous-domaine > Exercice (intitulé exact, une compétence du
   catalogue pouvant regrouper plusieurs exercices). Ne montre que ce qui a
   été effectivement travaillé — aucune ligne pour un sous-domaine jamais
   abordé.
   - Lignes domaine/sous-domaine : UNE jauge à côté du nom (5 paliers fixes),
     reflétant le % d'acquisition du programme attendu au niveau scolaire DE
     L'ÉLÈVE affiché (voir renderGaugeRow/gaugeCran) — colonnes Niveau 1/2/3
     vides sur ces lignes.
   - Lignes compétence : inchangé, une pastille % par palier (Niveau 1/2/3),
     colorée si travaillée, grise vide sinon (renderCompetenceRow).

   Pure fonction de rendu (pas de DOM, pas de réseau) : reçoit un `profile`
   déjà calculé par lfmAnalytics.computeStudentProfile() (js/teacher-analytics.js,
   champs `jauges`/`sousDomaineJauges`) et le niveau scolaire CM1/CM2/6e de
   l'élève affiché, retourne une chaîne HTML (table .bj-table, stylée par
   css/niveau-pastilles.css). Le montage dans le DOM reste à la charge de la
   page appelante.

   Utilisé par :
   - resultats-enseignant.html (fiche élève écran + synthèse PDF)
   - dashboard-eleve.html (onglet "Mes résultats")

   Dépend de : lfmAnalytics (js/teacher-analytics.js, doit être chargé avant).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmNiveauPastilles = (() => {
  const NIVEAU_LABEL = { CM1: 'Niveau 1', CM2: 'Niveau 2', '6e': 'Niveau 3' };

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  const pctColor     = pct => pct >= 70 ? '#15803d' : pct >= 50 ? '#a16207' : '#D62839';

  /* Intitulé de spécificité du niveau pour CETTE compétence (ex. "Repérer un
     nom isolé"), lu dans data/*.js (EXERCISE_DATA[slug].levelDescs) — même
     source que les cartes de LevelSelect (js/level-select.js). Replie sur le
     libellé générique "Niveau X" quand l'exercice n'a pas encore ce champ
     (ex. moteurs à niveaux codés en dur dans exercise.html) ou pour un slug
     hérité non résolu ici (pas de canonicalisation côté pastilles). */
  function niveauDescFor(slug, level) {
    const ex = typeof window !== 'undefined' && window.EXERCISE_DATA && slug ? window.EXERCISE_DATA[slug] : null;
    return (ex && ex.levelDescs && ex.levelDescs[level]) || NIVEAU_LABEL[level] || level;
  }

  /* Palier fixe (0 à 4) de la jauge domaine/sous-domaine à partir du ratio
     cumulatif renvoyé par computeNiveauJauge() — pas de remplissage continu :
     vide / 1-4 / 2-4 / 3-4 / plein, le palier "3/4" couvrant tout
     l'intervalle [50%, 100%[ sans étape intermédiaire avant la validation
     complète (décision produit). */
  function gaugeCran(ratio) {
    if (!(ratio > 0)) return 0;
    if (ratio < 0.25) return 1;
    if (ratio < 0.5)  return 2;
    if (ratio < 1)    return 3;
    return 4;
  }

  /* Jauge unique (domaine/sous-domaine) reflétant le % d'acquisition du
     programme attendu au niveau scolaire DE L'ÉLÈVE affiché (CM1 pour un
     élève CM1, CM2 pour un CM2, 6e pour un 6e) — remplace les 3 pastilles
     Niveau 1/2/3 sur ces lignes (peu lisibles, quasi identiques visuellement
     tant qu'aucun niveau n'est totalement atteint). Réutilise directement le
     segment `level === studentLevel` déjà calculé par computeNiveauJauge()
     (portée cumulative CM1 ⊂ CM2 ⊂ 6e, voir js/teacher-analytics.js) — pas
     de nouveau calcul ici.
     `studentLevel` absent/invalide (ex. échec de get_class_level_for_student,
     voir js/laurels.js:fetchStudentClassLevel) → jauge vide, même convention
     que laurelGradedBadgeStatus (locked faute de niveau connu). */
  function renderGaugeHtml(segs, studentLevel) {
    const seg = (segs || []).find(s => s.level === studentLevel);
    if (!studentLevel || !seg) {
      return `<span class="bjt-jauge bjt-jauge-0" title="Niveau scolaire non disponible"></span>`;
    }
    if (seg.denom === 0) {
      return `<span class="bjt-jauge bjt-jauge-0" title="Non concerné pour le niveau ${escHtml(studentLevel)}"></span>`;
    }
    const cran = gaugeCran(seg.ratio);
    const pct  = Math.round(seg.ratio * 100);
    return `<span class="bjt-jauge bjt-jauge-${cran}" title="${pct}% du programme ${escHtml(studentLevel)} maîtrisé (${seg.achieved}/${seg.denom} compétences validées)"></span>`;
  }

  /* Ligne domaine/sous-domaine : jauge unique à côté du nom (1re colonne),
     colonnes Niveau 1/2/3 laissées vides — contrairement à renderCompetenceRow
     (inchangée), qui garde son détail par palier. */
  function renderGaugeRow(label, segs, cls, studentLevel) {
    return `<tr class="${cls}">
      <td>${label} ${renderGaugeHtml(segs, studentLevel)}</td>
      <td></td><td></td><td></td>
    </tr>`;
  }

  function renderCompetenceRow(c) {
    return `<tr class="bjt-comp">
      <td>${escHtml(c.title)}</td>
      ${lfmAnalytics.JAUGE_LEVELS.map(level => {
        const pct   = c.levels[level];
        const label = escHtml(niveauDescFor(c.slug, level));
        return pct === null
          ? `<td><span class="bcp-pastille bcp-empty" title="${label} — non travaillé"></span></td>`
          : `<td><span class="bcp-pastille" style="background:${pctColor(pct)}" title="${label} — ${pct}%">${pct}%</span></td>`;
      }).join('')}
    </tr>`;
  }

  /* Retourne le HTML d'une table .bj-table (Domaine > Sous-domaine >
     Compétence), ou '' si l'élève n'a rien travaillé.
     `studentLevel` : niveau scolaire CM1/CM2/6e DE L'ÉLÈVE affiché (pas
     forcément l'utilisateur courant — un enseignant consultant une fiche
     élève passe le niveau de CET élève) — pilote la jauge unique des lignes
     domaine/sous-domaine (voir renderGaugeRow). */
  function renderTable(profile, studentLevel) {
    const domaines = lfmAnalytics.DOMAIN_ORDER.filter(d => (profile.jauges[d] || []).some(seg => seg.denom > 0));
    let rows = '';
    domaines.forEach(domaine => {
      rows += renderGaugeRow(escHtml(domaine), profile.jauges[domaine] || [], 'bjt-domaine', studentLevel);
      (profile.sousDomaineJauges?.[domaine] || [])
        .filter(sd => sd.segments.some(seg => seg.status !== 'non-concerne'))
        .forEach(sd => {
          rows += renderGaugeRow(escHtml(sd.sousDomaine), sd.segments, 'bjt-sous', studentLevel);
          (sd.competences || []).forEach(c => { rows += renderCompetenceRow(c); });
        });
    });
    if (!rows) return '';
    return `<table class="bj-table">
        <thead><tr><th>Compétence</th><th>Niveau 1</th><th>Niveau 2</th><th>Niveau 3</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  return { renderTable };
})();

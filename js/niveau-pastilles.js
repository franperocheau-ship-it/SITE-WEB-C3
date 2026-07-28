/* ─────────────────────────────────────────────────────────────────────────────
   niveau-pastilles.js — Rendu partagé du "Bilan par compétences" : arborescence
   Domaine > Sous-domaine > Compétence, une pastille par niveau scolaire
   (Niveau 1/2/3), colorée + % si travaillée, grise vide sinon. Ne montre que
   ce qui a été effectivement travaillé — aucune ligne pour un sous-domaine
   jamais abordé.

   Pure fonction de rendu (pas de DOM, pas de réseau) : reçoit un `profile`
   déjà calculé par lfmAnalytics.computeStudentProfile() (js/teacher-analytics.js,
   champs `jauges`/`sousDomaineJauges`) et retourne une chaîne HTML (table
   .bj-table, stylée par css/niveau-pastilles.css). Le montage dans le DOM
   reste à la charge de la page appelante.

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

  const pastilleCls  = status => status === 'atteint' ? 'atteint' : status === 'en-cours' ? 'en-cours' : 'non-travaille';
  const statusLabel  = status => status === 'atteint' ? 'atteint' : status === 'en-cours' ? 'en cours' : status === 'non-concerne' ? 'non concerné' : 'non travaillé';
  const pctColor     = pct => pct >= 70 ? '#15803d' : pct >= 50 ? '#a16207' : '#D62839';

  function renderRow(label, segs, cls) {
    return `<tr class="${cls}">
      <td>${label}</td>
      ${segs.map(seg => `<td><span class="bjt-pastille ${pastilleCls(seg.status)}" title="${escHtml(seg.level)} — ${statusLabel(seg.status)}"></span></td>`).join('')}
    </tr>`;
  }

  function renderCompetenceRow(c) {
    return `<tr class="bjt-comp">
      <td>${escHtml(c.compLabel)}</td>
      ${lfmAnalytics.JAUGE_LEVELS.map(level => {
        const pct   = c.levels[level];
        const label = NIVEAU_LABEL[level] || level;
        return pct === null
          ? `<td><span class="bcp-pastille bcp-empty" title="${label} — non travaillé"></span></td>`
          : `<td><span class="bcp-pastille" style="background:${pctColor(pct)}" title="${label} — ${pct}%">${pct}%</span></td>`;
      }).join('')}
    </tr>`;
  }

  /* Retourne le HTML d'une table .bj-table (Domaine > Sous-domaine >
     Compétence), ou '' si l'élève n'a rien travaillé. */
  function renderTable(profile) {
    const domaines = lfmAnalytics.DOMAIN_ORDER.filter(d => (profile.jauges[d] || []).some(seg => seg.denom > 0));
    let rows = '';
    domaines.forEach(domaine => {
      rows += renderRow(escHtml(domaine), profile.jauges[domaine] || [], 'bjt-domaine');
      (profile.sousDomaineJauges?.[domaine] || [])
        .filter(sd => sd.segments.some(seg => seg.status !== 'non-concerne'))
        .forEach(sd => {
          rows += renderRow(`${escHtml(sd.sousDomaine)} · ${sd.exerciseCount} ex.`, sd.segments, 'bjt-sous');
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

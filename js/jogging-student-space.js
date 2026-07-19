/* ─────────────────────────────────────────────────────────────────────────────
   jogging-student-space.js — Onglet « Mes joggings d'écriture » de
   dashboard-eleve.html (Phase 2).
   Dépend de : supabase-client.js (window.lfmDb), js/jogging-data.js
   (JOGGING_DATA, pour les titres), css/jogging.css (.jog-feu-cell,
   .jog-highlight, .jog-correction-text — réutilisés tels quels).

   Expose JoggingStudentSpace.render(studentId), appelé depuis
   dashboard-eleve.html à l'activation de l'onglet (même patron que
   initLaurels() dans js/laurels.js).
   ───────────────────────────────────────────────────────────────────────────── */

const JoggingStudentSpace = (() => {
  const ALL_CODES = ['C', 'H', 'A', 'M', 'P', 'I', 'O', 'N', 'S'];
  const FEU_PICTO = { vert: '✔', orange: '~', rouge: '✖', blanc: '–' };

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return "Hier";
    if (diff < 7) return 'Il y a ' + diff + ' jours';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }

  function feuxFromVersion(v) {
    const feux = {};
    ALL_CODES.forEach(c => { feux[c] = v ? (v['feu_' + c.toLowerCase()] || 'blanc') : 'blanc'; });
    return feux;
  }

  function countVerts(feux) {
    return Object.values(feux).filter(v => v === 'vert').length;
  }

  function renderFeuxMini(feux) {
    return `<div class="jog-feux-grid" style="max-width:360px;">` + ALL_CODES.map(code => {
      const state = feux[code] || 'blanc';
      return `
        <div class="jog-feu-cell jog-feu-cell--${state}">
          <span class="jog-feu-letter">${code}</span>
          <span class="jog-feu-icon">${FEU_PICTO[state]}</span>
        </div>`;
    }).join('') + `</div>`;
  }

  /* Positions fiables (offsets Grammalecte déjà stockés) : même surlignage
     que l'écran de correction, en lecture seule ici. */
  function highlightVersionText(text, erreurs) {
    const resolved = [];
    let lastEnd = -1;
    (erreurs || []).forEach(e => { if (e.start >= lastEnd) { resolved.push(e); lastEnd = e.end; } });

    let html = '';
    let cursor = 0;
    resolved.forEach(e => {
      html += escapeHtml(text.slice(cursor, e.start));
      html += `<span class="jog-highlight" data-code="${e.code}">${escapeHtml(text.slice(e.start, e.end))}</span>`;
      cursor = e.end;
    });
    html += escapeHtml(text.slice(cursor));
    return html;
  }

  function encouragementMessage(totalCompleted, totalVerts) {
    if (totalCompleted === 0) return "Lance-toi : ton premier jogging d'écriture t'attend dans Français → Rédaction !";
    if (totalCompleted === 1) return 'Bravo pour ton premier jogging terminé !';
    if (totalCompleted >= 5) return `Belle régularité : ${totalCompleted} joggings déjà réalisés !`;
    return `Continue comme ça, tu as déjà terminé ${totalCompleted} jogging${totalCompleted > 1 ? 's' : ''} !`;
  }

  function renderHistoriqueCard(session, versions, enrichment) {
    const jog = (typeof JOGGING_DATA !== 'undefined') ? JOGGING_DATA[session.jogging_id] : null;
    const title = jog ? jog.title : session.jogging_id;
    const last = versions[versions.length - 1];
    const feux = feuxFromVersion(last);
    const verts = countVerts(feux);
    const statusLabel = session.status === 'completed' ? `${verts}/7 feux verts` : 'en cours';

    const detailId = 'jog-histo-detail-' + session.id;

    const versionsHtml = versions.map(v => `
      <div class="jog-histo-version">
        <div class="jog-histo-version-label">Version ${v.version_number}</div>
        <div class="jog-correction-text" style="margin-bottom:10px;">${highlightVersionText(v.text, (v.correction && v.correction.erreurs) || [])}</div>
        ${renderFeuxMini(feuxFromVersion(v))}
      </div>`).join('');

    const enrichHtml = (enrichment && enrichment.published && (enrichment.teacher_text || enrichment.teacher_comment))
      ? `
        <div class="jog-histo-enrichment">
          <div class="jog-histo-enrichment-title">📝 Reformulation et commentaire de ton enseignant</div>
          ${enrichment.teacher_text ? `<div class="jog-correction-text">${escapeHtml(enrichment.teacher_text)}</div>` : ''}
          ${enrichment.teacher_comment ? `<div class="jog-histo-comment">${escapeHtml(enrichment.teacher_comment)}</div>` : ''}
        </div>` : '';

    return `
      <div class="jog-histo-card">
        <div class="jog-histo-card-top" data-toggle="${detailId}">
          <div>
            <div class="jog-histo-title">${escapeHtml(title)}</div>
            <div class="jog-histo-meta">${formatDate(session.created_at)} · ${statusLabel}</div>
          </div>
          <span class="jog-histo-chevron">▾</span>
        </div>
        <div class="jog-histo-detail" id="${detailId}" style="display:none">
          ${versionsHtml}
          ${enrichHtml}
        </div>
      </div>`;
  }

  function bindToggles(container) {
    container.querySelectorAll('.jog-histo-card-top').forEach(top => {
      top.addEventListener('click', () => {
        const el = document.getElementById(top.dataset.toggle);
        if (!el) return;
        const isOpen = el.style.display !== 'none';
        el.style.display = isOpen ? 'none' : '';
        const chevron = top.querySelector('.jog-histo-chevron');
        if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
      });
    });
  }

  async function render(studentId) {
    const statsEl       = document.getElementById('jog-stats');
    const encEl          = document.getElementById('jog-encouragement-section');
    const encMsgEl        = document.getElementById('jog-encouragement-msg');
    const histoSection     = document.getElementById('jog-historique-section');
    const histoList          = document.getElementById('jog-historique-list');
    const emptySection        = document.getElementById('jog-empty-section');
    if (!statsEl || !window.lfmDb || !studentId) return;

    const { data: sessions, error } = await window.lfmDb
      .from('jogging_sessions')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .limit(2000);

    if (error || !sessions || sessions.length === 0) {
      statsEl.style.display = 'none';
      encEl.style.display = 'none';
      histoSection.style.display = 'none';
      emptySection.style.display = '';
      return;
    }
    emptySection.style.display = 'none';

    const sessionIds = sessions.map(s => s.id);
    const [{ data: versions }, { data: enrichments }] = await Promise.all([
      window.lfmDb.from('jogging_versions').select('*')
        .in('session_id', sessionIds).order('version_number', { ascending: true }).limit(2000),
      window.lfmDb.from('jogging_enrichments').select('*')
        .in('session_id', sessionIds).limit(2000)
    ]);

    const versionsBySession = new Map();
    (versions || []).forEach(v => {
      if (!versionsBySession.has(v.session_id)) versionsBySession.set(v.session_id, []);
      versionsBySession.get(v.session_id).push(v);
    });
    const enrichBySession = new Map();
    (enrichments || []).forEach(e => enrichBySession.set(e.session_id, e));

    /* ── Mon bilan ── */
    const completed = sessions.filter(s => s.status === 'completed');
    let totalVerts = 0;
    completed.forEach(s => {
      const vs = versionsBySession.get(s.id) || [];
      const last = vs[vs.length - 1];
      if (last) totalVerts += countVerts(feuxFromVersion(last));
    });

    document.getElementById('jog-stat-total').textContent = completed.length;
    document.getElementById('jog-stat-verts').textContent = totalVerts;
    const dernierJog = (typeof JOGGING_DATA !== 'undefined') ? JOGGING_DATA[sessions[0].jogging_id] : null;
    document.getElementById('jog-stat-dernier').textContent = dernierJog ? dernierJog.title : '—';
    statsEl.style.display = '';

    encMsgEl.textContent = encouragementMessage(completed.length, totalVerts);
    encEl.style.display = '';

    /* ── Mon historique ── */
    histoList.innerHTML = sessions.map(s =>
      renderHistoriqueCard(s, versionsBySession.get(s.id) || [], enrichBySession.get(s.id))
    ).join('');
    bindToggles(histoList);
    histoSection.style.display = '';
  }

  return { render };
})();

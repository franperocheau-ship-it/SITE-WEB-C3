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
  const AUTO_CODES = ['C', 'H', 'A', 'M', 'P', 'O', 'S'];
  const FEU_PICTO = { vert: '✔', orange: '~', rouge: '✖', blanc: '–' };
  const CODE_LABELS = {
    C: 'Conjugaison', H: 'Homophones', A: 'Accords', M: 'Majuscules',
    P: 'Ponctuation', I: 'Illisible', O: 'Orthographe', N: 'Néant', S: 'Son'
  };

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

  function feuFor(v, code) {
    return feuxFromVersion(v)[code];
  }

  /* Taux de réussite déterministe sur un critère, à partir de la dernière
     version de chaque session terminée. Nécessite au moins 3 joggings
     évalués sur ce critère pour être significatif (seuil plus bas que les
     badges, qui demandent une régularité plus forte pour être décernés). */
  function codeState(completed, lastVersionBySession, code) {
    const lastVersions = completed.map(s => lastVersionBySession.get(s.id)).filter(Boolean);
    const evaluated = lastVersions.filter(v => feuFor(v, code) !== 'blanc');
    if (evaluated.length < 3) return { state: 'neutre', tile: 'blanc', evaluated: evaluated.length, rate: 0 };
    const verts = evaluated.filter(v => feuFor(v, code) === 'vert').length;
    const rate = verts / evaluated.length;
    return rate >= 0.6
      ? { state: 'reussi', tile: 'vert', evaluated: evaluated.length, rate }
      : { state: 'difficile', tile: 'rouge', evaluated: evaluated.length, rate };
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

  /* ── Mes progrès ─────────────────────────────────────────────────────── */
  function renderProgresPanel(code, texts) {
    const panelEl = document.getElementById('jog-progres-panel');
    if (!panelEl) return;
    panelEl.innerHTML = `
      <div class="jog-progres-panel-title">${code} — ${escapeHtml(CODE_LABELS[code])}</div>
      <div class="jog-progres-block jog-progres-block--reussi">
        <div class="jog-progres-block-label">Ce que je réussis</div>
        <div class="jog-progres-block-text">${escapeHtml(texts.reussis)}</div>
      </div>
      <div class="jog-progres-block jog-progres-block--difficile">
        <div class="jog-progres-block-label">Ce qui reste difficile</div>
        <div class="jog-progres-block-text">${escapeHtml(texts.difficile)}</div>
      </div>
      <div class="jog-progres-block jog-progres-block--conseil">
        <div class="jog-progres-block-label">Un conseil</div>
        <div class="jog-progres-block-text">${escapeHtml(texts.conseil)}</div>
      </div>
      <div class="jog-progres-block jog-progres-block--defi">
        <div class="jog-progres-block-label">Un défi personnalisé</div>
        <div class="jog-progres-block-text">${escapeHtml(texts.defi)}</div>
      </div>`;
  }

  function renderProgres(completed, lastVersionBySession) {
    const gridEl = document.getElementById('jog-progres-grid');
    if (!gridEl) return;

    const stateByCode = {};
    ALL_CODES.forEach(code => {
      stateByCode[code] = (code === 'I' || code === 'N')
        ? { tile: 'blanc', fixed: true }
        : codeState(completed, lastVersionBySession, code);
    });

    gridEl.innerHTML = ALL_CODES.map(code => {
      const st = stateByCode[code];
      return `
        <button type="button" class="jog-progres-tile jog-progres-tile--${st.tile}" data-code="${code}">
          <span class="jog-progres-tile-letter">${code}</span>
          <span class="jog-progres-tile-icon">${FEU_PICTO[st.tile]}</span>
        </button>`;
    }).join('');

    gridEl.querySelectorAll('.jog-progres-tile').forEach(btn => {
      btn.addEventListener('click', () => {
        gridEl.querySelectorAll('.jog-progres-tile').forEach(b => b.classList.remove('jog-progres-tile--active'));
        btn.classList.add('jog-progres-tile--active');
        const code = btn.dataset.code;
        const st = stateByCode[code];
        const texts = st.fixed ? JOGGING_PROGRES_FIXED[code] : JOGGING_PROGRES_TEXTS[code][st.state];
        renderProgresPanel(code, texts);
      });
    });

    const defaultBtn = gridEl.querySelector('.jog-progres-tile[data-code="C"]');
    if (defaultBtn) defaultBtn.click();
  }

  /* ── Mon évolution ────────────────────────────────────────────────────── */
  function renderEvolution(completed, lastVersionBySession) {
    const section = document.getElementById('jog-evolution-section');
    const barsEl = document.getElementById('jog-evo-bars');
    const repartEl = document.getElementById('jog-evo-repart');
    if (!barsEl || !repartEl) return;
    if (completed.length === 0) { if (section) section.style.display = 'none'; return; }
    if (section) section.style.display = '';

    const chrono = [...completed].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    barsEl.innerHTML = chrono.map((s, i) => {
      const v = lastVersionBySession.get(s.id);
      const verts = v ? countVerts(feuxFromVersion(v)) : 0;
      const height = Math.round((Math.min(verts, 7) / 7) * 80) + 6;
      return `
        <div class="jog-evo-bar-col">
          <div class="jog-evo-bar" style="height:${height}px" title="${verts}/7 feux verts"></div>
          <div class="jog-evo-bar-label">${i + 1}</div>
        </div>`;
    }).join('');

    const lastVersions = completed.map(s => lastVersionBySession.get(s.id)).filter(Boolean);
    repartEl.innerHTML = AUTO_CODES.map(code => {
      const evaluated = lastVersions.filter(v => feuFor(v, code) !== 'blanc');
      const verts = evaluated.filter(v => feuFor(v, code) === 'vert').length;
      const pct = evaluated.length ? Math.round((verts / evaluated.length) * 100) : 0;
      return `
        <div class="jog-evo-repart-row">
          <div class="jog-evo-repart-label">${code} · ${CODE_LABELS[code]}</div>
          <div class="jog-evo-repart-bar-bg"><div class="jog-evo-repart-bar-fill" style="width:${pct}%"></div></div>
          <div class="jog-evo-repart-count">${pct}%</div>
        </div>`;
    }).join('');
  }

  /* ── Mon objectif ─────────────────────────────────────────────────────── */
  function renderObjectif(completed, lastVersionBySession) {
    const section = document.getElementById('jog-objectif-section');
    const boxEl = document.getElementById('jog-objectif-box');
    if (!boxEl) return;
    if (completed.length === 0) { if (section) section.style.display = 'none'; return; }
    if (section) section.style.display = '';

    const lastVersions = completed.map(s => lastVersionBySession.get(s.id)).filter(Boolean);
    let weakest = null;
    AUTO_CODES.forEach(code => {
      const evaluated = lastVersions.filter(v => feuFor(v, code) !== 'blanc');
      if (evaluated.length < 3) return;
      const verts = evaluated.filter(v => feuFor(v, code) === 'vert').length;
      const rate = verts / evaluated.length;
      if (!weakest || rate < weakest.rate) weakest = { code, rate };
    });

    boxEl.innerHTML = (!weakest || weakest.rate >= 0.7)
      ? `<div class="jog-objectif-icon">🎯</div><div class="jog-objectif-text">Continue comme ça : tous tes critères sont bien maîtrisés pour l'instant !</div>`
      : `<div class="jog-objectif-icon">🎯</div><div class="jog-objectif-text">Travaille aujourd'hui : ${escapeHtml(CODE_LABELS[weakest.code])} (${weakest.code})</div>`;
  }

  /* ── Mes réussites ────────────────────────────────────────────────────── */
  async function renderReussites(studentId, completed, lastVersionBySession) {
    const gridEl = document.getElementById('jog-reussites-grid');
    if (!gridEl || typeof JoggingBadges === 'undefined') return;
    const earnedIds = await JoggingBadges.syncBadges(studentId, completed, lastVersionBySession);
    gridEl.innerHTML = JoggingBadges.renderBadgesGrid(earnedIds);
  }

  /* ── Mon carnet d'auteur ──────────────────────────────────────────────── */
  function printCarnet(rows, sessionsById, versionsBySession, studentName) {
    const root = document.getElementById('jog-carnet-print-root');
    if (!root) return;

    const entriesHtml = rows.map(row => {
      const session = sessionsById.get(row.session_id);
      const jog = (session && typeof JOGGING_DATA !== 'undefined') ? JOGGING_DATA[session.jogging_id] : null;
      const title = jog ? jog.title : (session ? session.jogging_id : 'Jogging');
      const versions = versionsBySession.get(row.session_id) || [];
      const last = versions[versions.length - 1];
      return `
        <div class="jog-carnet-entry">
          <div class="jog-carnet-entry-title">${escapeHtml(title)}</div>
          <div class="jog-carnet-entry-meta">${session ? formatDate(session.created_at) : ''}</div>
          <div class="jog-carnet-entry-text">${last ? escapeHtml(last.text) : ''}</div>
        </div>`;
    }).join('');

    root.innerHTML = `
      <div class="jog-carnet-page">
        <div class="jog-carnet-cover">
          <div class="jog-carnet-cover-title">Mon carnet d'auteur</div>
          <div class="jog-carnet-cover-sub">${escapeHtml(studentName || '')}</div>
        </div>
        ${entriesHtml}
      </div>`;

    document.body.classList.add('printing-jog-carnet');
    window.print();
    document.body.classList.remove('printing-jog-carnet');
  }

  async function renderCarnet(studentId, sessionsById, versionsBySession) {
    const listEl = document.getElementById('jog-carnet-list');
    const printBtn = document.getElementById('jog-carnet-print-btn');
    if (!listEl || !window.lfmDb) return;

    const { data: carnetRows } = await window.lfmDb
      .from('jogging_carnet')
      .select('*')
      .eq('student_id', studentId)
      .order('added_at', { ascending: true })
      .limit(2000);

    const rows = carnetRows || [];

    if (rows.length === 0) {
      listEl.innerHTML = `<div class="dash-empty"><em>Aucun jogging ajouté à ton carnet pour l'instant. Depuis un jogging terminé, clique sur « ⭐ Ajouter à mon carnet ».</em></div>`;
      if (printBtn) printBtn.style.display = 'none';
      return;
    }

    listEl.innerHTML = rows.map(row => {
      const session = sessionsById.get(row.session_id);
      const jog = (session && typeof JOGGING_DATA !== 'undefined') ? JOGGING_DATA[session.jogging_id] : null;
      const title = jog ? jog.title : (session ? session.jogging_id : 'Jogging');
      return `
        <div class="jog-carnet-card">
          <div>
            <div class="jog-carnet-card-title">${escapeHtml(title)}</div>
            <div class="jog-carnet-card-meta">Ajouté ${formatDate(row.added_at)}</div>
          </div>
          <button type="button" class="jog-carnet-remove-btn" data-session-id="${row.session_id}">Retirer</button>
        </div>`;
    }).join('');

    listEl.querySelectorAll('.jog-carnet-remove-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        await window.lfmDb.from('jogging_carnet').delete()
          .eq('student_id', studentId).eq('session_id', btn.dataset.sessionId);
        renderCarnet(studentId, sessionsById, versionsBySession);
      });
    });

    if (printBtn) {
      printBtn.style.display = '';
      const studentName = document.getElementById('dash-name') ? document.getElementById('dash-name').textContent : '';
      printBtn.onclick = () => printCarnet(rows, sessionsById, versionsBySession, studentName);
    }
  }

  async function render(studentId) {
    const statsEl       = document.getElementById('jog-stats');
    const encEl          = document.getElementById('jog-encouragement-section');
    const encMsgEl        = document.getElementById('jog-encouragement-msg');
    const histoSection     = document.getElementById('jog-historique-section');
    const histoList          = document.getElementById('jog-historique-list');
    const emptySection        = document.getElementById('jog-empty-section');
    const progresSection       = document.getElementById('jog-progres-section');
    if (!statsEl || !window.lfmDb || !studentId) return;

    const { data: sessions, error } = await window.lfmDb
      .from('jogging_sessions')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })
      .limit(2000);

    const safeSessions = (error || !sessions) ? [] : sessions;

    if (safeSessions.length === 0) {
      statsEl.style.display = 'none';
      encEl.style.display = 'none';
      histoSection.style.display = 'none';
      if (progresSection) progresSection.style.display = 'none';
      emptySection.style.display = '';
      await renderReussites(studentId, [], new Map());
      await renderCarnet(studentId, new Map(), new Map());
      return;
    }
    emptySection.style.display = 'none';
    if (progresSection) progresSection.style.display = '';

    const sessionIds = safeSessions.map(s => s.id);
    const sessionsById = new Map(safeSessions.map(s => [s.id, s]));
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
    const lastVersionBySession = new Map();
    versionsBySession.forEach((vs, sessionId) => lastVersionBySession.set(sessionId, vs[vs.length - 1]));
    const enrichBySession = new Map();
    (enrichments || []).forEach(e => enrichBySession.set(e.session_id, e));

    /* ── Mon bilan ── */
    const completed = safeSessions.filter(s => s.status === 'completed');
    let totalVerts = 0;
    completed.forEach(s => {
      const last = lastVersionBySession.get(s.id);
      if (last) totalVerts += countVerts(feuxFromVersion(last));
    });

    document.getElementById('jog-stat-total').textContent = completed.length;
    document.getElementById('jog-stat-verts').textContent = totalVerts;
    const dernierJog = (typeof JOGGING_DATA !== 'undefined') ? JOGGING_DATA[safeSessions[0].jogging_id] : null;
    document.getElementById('jog-stat-dernier').textContent = dernierJog ? dernierJog.title : '—';
    statsEl.style.display = '';

    encMsgEl.textContent = encouragementMessage(completed.length, totalVerts);
    encEl.style.display = '';

    /* ── Mes progrès ── */
    renderProgres(completed, lastVersionBySession);

    /* ── Mon historique ── */
    histoList.innerHTML = safeSessions.map(s =>
      renderHistoriqueCard(s, versionsBySession.get(s.id) || [], enrichBySession.get(s.id))
    ).join('');
    bindToggles(histoList);
    histoSection.style.display = '';

    /* ── Mes réussites ── */
    await renderReussites(studentId, completed, lastVersionBySession);

    /* ── Mon évolution ── */
    renderEvolution(completed, lastVersionBySession);

    /* ── Mon objectif ── */
    renderObjectif(completed, lastVersionBySession);

    /* ── Mon carnet d'auteur ── */
    await renderCarnet(studentId, sessionsById, versionsBySession);
  }

  return { render };
})();

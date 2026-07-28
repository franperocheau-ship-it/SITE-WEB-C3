/* ─────────────────────────────────────────────────────────────────────────────
   bilan-nav.js — Navigation progressive à 5 étapes pour le "Bilan par
   compétence" (onglet classe ET fiche élève) : matière → sous-domaine →
   compétence → niveau → élèves. Remplace l'ancien arbre à plat (accordéons
   domaine/sous-domaine affichant tout d'un coup).

   Ne fait aucun appel réseau et ne construit pas byDomaine — reçoit la
   structure déjà groupée par la page appelante (voir resultats-enseignant.html
   /renderCompetences, /renderStudentBilan) et se contente de la parcourir.
   L'état (chemin de navigation courant) est isolé par conteneur DOM, pas
   global, pour que la vue classe et la fiche élève ne se marchent pas dessus.
   ───────────────────────────────────────────────────────────────────────────── */

const lfmBilanNav = (() => {

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function pctClass(pct) {
    return pct >= 70 ? 'score-high' : pct >= 50 ? 'score-mid' : 'score-low';
  }

  function fmtDate(iso) {
    return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }

  /* Nombre de résultats sous un nœud, quelle que soit sa profondeur (domaine,
     sous-domaine ou compétence) — un nœud feuille est un tableau d'items. */
  function countLeaves(node) {
    if (Array.isArray(node)) return node.length;
    return Object.values(node).reduce((sum, child) => sum + countLeaves(child), 0);
  }

  /* Ordre des niveaux d'une compétence, même logique que l'ancien arbre
     (badges CM1/CM2/6e dans l'ordre réel de l'exercice, sinon fin de liste). */
  function levelSort(levelsMap, levelBadge) {
    const idx = level => levelBadge.resolveIndex(level === '—' ? null : level, levelsMap[level][0]?.exerciseType);
    return Object.keys(levelsMap).sort((a, b) => {
      const ia = idx(a), ib = idx(b);
      return (ia == null ? 99 : ia) - (ib == null ? 99 : ib);
    });
  }

  /* ── Agrégation étape 5 (élèves), mode 'classe' ──────────────────────────
     items = [{name, exTitle, exerciseType, score, total, pct, date}, ...]
     -> une ligne par élève, % moyen de ses tentatives à ce niveau, triée
     du plus faible au plus élevé. */
  function aggregateStudents(items) {
    const byName = new Map();
    items.forEach(it => {
      if (!byName.has(it.name)) byName.set(it.name, []);
      byName.get(it.name).push(it);
    });
    return Array.from(byName.entries())
      .map(([name, attempts]) => ({
        name,
        avgPct: Math.round(attempts.reduce((s, a) => s + a.pct, 0) / attempts.length),
        attempts
      }))
      .sort((a, b) => a.avgPct - b.avgPct);
  }

  function renderCrumbs(path) {
    const labels = ['Toutes les matières', ...path];
    return `<div class="bnav-crumbs">${labels.map((label, i) => {
      const isLast = i === labels.length - 1;
      const sep = i > 0 ? '<span class="bnav-sep">›</span>' : '';
      return sep + (isLast
        ? `<span class="bnav-crumb-current">${escHtml(label)}</span>`
        : `<button type="button" class="bnav-crumb" data-nav-jump="${i}">${escHtml(label)}</button>`);
    }).join('')}</div>`;
  }

  function renderRowList(rows) {
    if (rows.length === 0) return '<div class="empty-inline">Aucune donnée.</div>';
    return `<div class="bnav-row-list">${rows.join('')}</div>`;
  }

  function navRow(value, label, meta) {
    return `<button type="button" class="bnav-row" data-nav-select="${escHtml(value)}">
      <span class="bnav-row-label">${label}</span>
      <span class="bnav-row-meta">${meta}</span>
      <span class="bnav-row-arrow">›</span>
    </button>`;
  }

  function renderClasseLeaf(items) {
    const students = aggregateStudents(items);
    if (students.length === 0) return '<div class="empty-inline">Aucun résultat.</div>';
    const rows = students.map(s => `
      <div class="bnav-leaf-row">
        <span class="bnav-leaf-name">${escHtml(s.name)}</span>
        <span class="bnav-leaf-meta">${s.attempts.length} tentative${s.attempts.length > 1 ? 's' : ''}</span>
        <span class="score-pill ${pctClass(s.avgPct)}">${s.avgPct}%</span>
      </div>`).join('');
    return `<div class="bnav-leaf-list">${rows}</div>`;
  }

  function renderEleveLeaf(items) {
    if (items.length === 0) return '<div class="empty-inline">Aucun résultat.</div>';
    const avg = Math.round(items.reduce((s, it) => s + it.pct, 0) / items.length);
    const rows = items.slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(it => {
        const t = it.exTitle.charAt(0).toUpperCase() + it.exTitle.slice(1);
        return `<tr>
          <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
              title="${escHtml(t)}">${escHtml(t)}</td>
          <td>${it.score}/${it.total}</td>
          <td><span class="score-pill ${pctClass(it.pct)}">${Math.round(it.pct)}%</span></td>
          <td style="color:var(--muted);font-size:13px">${fmtDate(it.date)}</td>
        </tr>`;
      }).join('');
    return `
      <div class="bnav-leaf-summary">
        <span class="score-pill ${pctClass(avg)}" style="font-size:15px;padding:6px 14px">${avg}%</span>
        <span class="bnav-leaf-meta">${items.length} tentative${items.length > 1 ? 's' : ''}</span>
      </div>
      <div class="table-wrap" style="border-radius:8px;margin-top:10px">
        <table class="result-table">
          <thead><tr><th>Exercice</th><th>Score</th><th>Résultat</th><th>Date</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  function renderStep(container) {
    const state = container.__bilanNav;
    const { path, config } = state;
    const { byDomaine, mode, domainOrder = [], domainIcons = {}, sousDomaineRates, levelBadge } = config;
    let body = '';

    if (path.length === 0) {
      /* Étape 1 — matières */
      const keys = domainOrder.filter(d => byDomaine[d]);
      Object.keys(byDomaine).forEach(d => { if (!keys.includes(d)) keys.push(d); });
      const rows = keys.map(domaine => {
        const count = countLeaves(byDomaine[domaine]);
        const icon = domainIcons[domaine] || '📖';
        return navRow(domaine, `${icon} ${escHtml(domaine)}`, `${count} résultat${count > 1 ? 's' : ''}`);
      });
      body = renderRowList(rows);

    } else if (path.length === 1) {
      /* Étape 2 — sous-domaines */
      const [domaine] = path;
      const sousDomaineMap = byDomaine[domaine] || {};
      const rows = Object.keys(sousDomaineMap).map(sousDomaine => {
        const count = countLeaves(sousDomaineMap[sousDomaine]);
        const rate  = sousDomaineRates && sousDomaineRates.get(domaine + '||' + sousDomaine);
        const meta  = (rate ? `${rate.avgPct}% · ` : '') + `${count} résultat${count > 1 ? 's' : ''}`;
        return navRow(sousDomaine, escHtml(sousDomaine), meta);
      });
      body = renderRowList(rows);

    } else if (path.length === 2) {
      /* Étape 3 — compétences */
      const [domaine, sousDomaine] = path;
      const comps = (byDomaine[domaine] || {})[sousDomaine] || {};
      const rows = Object.keys(comps).map(compLabel => {
        const count = countLeaves(comps[compLabel]);
        return navRow(compLabel, escHtml(compLabel), `${count} résultat${count > 1 ? 's' : ''}`);
      });
      body = renderRowList(rows);

    } else if (path.length === 3) {
      /* Étape 4 — niveaux de la compétence choisie */
      const [domaine, sousDomaine, compLabel] = path;
      const levels = ((byDomaine[domaine] || {})[sousDomaine] || {})[compLabel] || {};
      const rows = levelSort(levels, levelBadge).map(level => {
        const items = levels[level];
        const badge = levelBadge.html(level === '—' ? null : level, items[0]?.exerciseType)
          || `<span class="badge" style="background:var(--border);color:var(--muted)">${escHtml(level)}</span>`;
        const count = mode === 'classe' ? aggregateStudents(items).length : items.length;
        const unit  = mode === 'classe' ? `élève${count > 1 ? 's' : ''}` : `tentative${count > 1 ? 's' : ''}`;
        return navRow(level, badge, `${count} ${unit}`);
      });
      body = renderRowList(rows);
      if (config.onPrintCompetence) {
        body = `<div class="bnav-actions">
          <button type="button" class="btn btn-ghost btn-sm" data-nav-print-comp>📄 Exporter cette compétence en PDF</button>
        </div>` + body;
      }

    } else {
      /* Étape 5 — élèves (feuille) */
      const [domaine, sousDomaine, compLabel, level] = path;
      const items = (((byDomaine[domaine] || {})[sousDomaine] || {})[compLabel] || {})[level] || [];
      body = mode === 'classe' ? renderClasseLeaf(items) : renderEleveLeaf(items);
    }

    container.innerHTML = renderCrumbs(path) + body;
  }

  function persistMatiere(state) {
    if (!state.config.rememberKey) return;
    if (state.path.length >= 1) {
      sessionStorage.setItem('lfm-bilan-matiere-' + state.config.rememberKey, state.path[0]);
    }
  }

  function bindEvents(container) {
    if (container.dataset.bnavBound) return;
    container.dataset.bnavBound = '1';
    container.addEventListener('click', e => {
      const state = container.__bilanNav;
      if (!state) return;

      const jumpBtn = e.target.closest('[data-nav-jump]');
      if (jumpBtn) {
        state.path = state.path.slice(0, Number(jumpBtn.dataset.navJump));
        persistMatiere(state);
        renderStep(container);
        return;
      }

      const printBtn = e.target.closest('[data-nav-print-comp]');
      if (printBtn) {
        state.config.onPrintCompetence(state.path.slice());
        return;
      }

      const selectBtn = e.target.closest('[data-nav-select]');
      if (selectBtn) {
        state.path = [...state.path, selectBtn.dataset.navSelect];
        persistMatiere(state);
        renderStep(container);
      }
    });
  }

  /* ── API publique ────────────────────────────────────────────────────── */

  /** (Ré)initialise la navigation dans `container` avec les données fournies.
      config: { byDomaine, mode: 'classe'|'eleve', domainOrder, domainIcons,
                sousDomaineRates, levelBadge, rememberKey, onPrintCompetence } */
  function mount(container, config) {
    let initialPath = [];
    if (config.rememberKey) {
      const saved = sessionStorage.getItem('lfm-bilan-matiere-' + config.rememberKey);
      if (saved && config.byDomaine[saved]) initialPath = [saved];
    }
    container.__bilanNav = { path: initialPath, config };
    bindEvents(container);
    renderStep(container);
  }

  /* ── Rendu impression (arbre complet, données → HTML direct, sans DOM) ──
     Utilisé par printBilan() pour le bilan classe entier. Reprend le même
     balisage (.bilan-domaine / .bilan-sous-domaine / .bilan-competence /
     .bilan-level-block) que l'ancien arbre, dont le CSS d'impression est
     conservé pour cet usage. */
  function renderFullTreeHtml(byDomaine, opts) {
    const { domainOrder = [], domainIcons = {}, sousDomaineRates = null, levelBadge } = opts;
    const domaineKeys = domainOrder.filter(d => byDomaine[d]);
    Object.keys(byDomaine).forEach(d => { if (!domaineKeys.includes(d)) domaineKeys.push(d); });

    let html = '';
    domaineKeys.forEach(domaine => {
      const sousDomaineMap = byDomaine[domaine];
      const totalRows = countLeaves(sousDomaineMap);
      const icon = domainIcons[domaine] || '📖';

      html += `<div class="bilan-domaine">
        <div class="bilan-domaine-header">
          <span class="bilan-domaine-title">${icon} ${escHtml(domaine)}</span>
          <span class="bilan-domaine-count">${totalRows} résultat${totalRows > 1 ? 's' : ''}</span>
        </div>
        <div class="bilan-domaine-body">`;

      Object.entries(sousDomaineMap).forEach(([sousDomaine, comps]) => {
        const rate = sousDomaineRates && sousDomaineRates.get(domaine + '||' + sousDomaine);
        const gaugeHtml = rate ? `
          <div class="subdom-gauge-row">
            <div class="subdom-gauge-label"><span>${escHtml(sousDomaine)}</span><span class="n">${rate.avgPct}%</span></div>
            <div class="subdom-gauge-track"><div class="subdom-gauge-fill" style="width:${rate.avgPct}%"></div></div>
          </div>` : `<div class="bilan-sous-domaine-title" style="padding:0">${escHtml(sousDomaine)}</div>`;

        html += `<div class="bilan-sous-domaine">
          <div class="bilan-sous-domaine-header">${gaugeHtml}</div>`;

        Object.entries(comps).forEach(([compLabel, levels]) => {
          html += `<div class="bilan-competence">
            <div class="bilan-competence-title">${escHtml(compLabel)}</div>`;

          levelSort(levels, levelBadge).forEach(level => {
            const items = levels[level];
            const badge = levelBadge.html(level === '—' ? null : level, items[0]?.exerciseType)
              || `<span class="badge" style="background:var(--border);color:var(--muted)">${escHtml(level)}</span>`;

            html += `<div class="bilan-level-block">
              <span style="margin-bottom:8px;display:inline-block">${badge}</span>
              <div class="table-wrap" style="border-radius:8px">
                <table class="result-table">
                  <thead><tr><th>Élève</th><th>Exercice</th><th>Score</th><th>Résultat</th><th>Date</th></tr></thead>
                  <tbody>`;

            items.slice().sort((a, b) => a.name.localeCompare(b.name, 'fr')).forEach(item => {
              const t = item.exTitle.charAt(0).toUpperCase() + item.exTitle.slice(1);
              html += `<tr>
                <td style="font-weight:600">${escHtml(item.name)}</td>
                <td style="font-size:12px;color:var(--muted);max-width:180px;
                    overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                    title="${escHtml(t)}">${escHtml(t)}</td>
                <td>${item.score}/${item.total}</td>
                <td><span class="score-pill ${pctClass(item.pct)}">${Math.round(item.pct)}%</span></td>
                <td style="color:var(--muted);font-size:13px">${fmtDate(item.date)}</td>
              </tr>`;
            });

            html += `</tbody></table></div></div>`;
          });

          html += `</div>`; /* bilan-competence */
        });

        html += `</div>`; /* bilan-sous-domaine */
      });

      html += `</div></div>`; /* bilan-domaine-body + bilan-domaine */
    });

    return html;
  }

  return { mount, renderFullTreeHtml, levelSort };
})();

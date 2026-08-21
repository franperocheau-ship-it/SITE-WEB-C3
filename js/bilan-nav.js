/* ─────────────────────────────────────────────────────────────────────────────
   bilan-nav.js — Navigation progressive à 5 étapes pour l'onglet "Détail par
   compétence" (classe ET fiche élève) : matière → sous-domaine → compétence
   (un exercice, triée du moins réussi au mieux réussi) → niveau (palier
   interne 1/2/3, avec %) → feuille (élèves pour la classe, détail par
   question pour l'élève — voir resultats-enseignant.html).

   Ne fait aucun appel réseau. Ne construit aucune structure imbriquée lui-
   même : la structure de l'arbre (quels domaines/sous-domaines/compétences/
   niveaux existent) est dérivée à la volée des clés de `competenceRates`/
   `niveauRates` (Maps "domaine||sousDomaine[||slug[||palier]]" → { ... }),
   fournies déjà agrégées et déjà filtrées par seuil par la page appelante
   (voir resultats-enseignant.html /renderCompetences). Dériver depuis ces
   Maps plutôt que depuis un arbre à part garantit qu'un domaine/sous-domaine
   sans aucune compétence qualifiée (seuil non atteint) n'apparaît pas.

   Le contenu de la feuille (étape 5) est résolu à la demande via le callback
   `getLeafItems(path)` fourni par la page — jamais précalculé pour tous les
   noeuds à l'avance (les données sont déjà en mémoire côté page, ce n'est
   qu'un filtrage, pas un appel réseau).

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

  const KEY_SEP = '||';
  const rateKey = (...parts) => parts.join(KEY_SEP);

  /* metaText peut être vide (mode élève, étape 4 : pas de "N tentatives"
     affiché à ce niveau, voir maquette) — pas de séparateur orphelin. */
  function pctMeta(avgPct, metaText) {
    return metaText ? `${avgPct}% · ${metaText}` : `${avgPct}%`;
  }

  /* ── Dérivation de l'arbre depuis les clés de competenceRates ────────────── */
  function domainesOf(competenceRates) {
    const set = new Set();
    competenceRates.forEach((v, key) => set.add(key.split(KEY_SEP)[0]));
    return set;
  }
  function sousDomainesOf(competenceRates, domaine) {
    const set = new Set();
    competenceRates.forEach((v, key) => {
      const [d, sd] = key.split(KEY_SEP);
      if (d === domaine) set.add(sd);
    });
    return set;
  }
  function slugsOf(competenceRates, domaine, sousDomaine) {
    const list = [];
    competenceRates.forEach((v, key) => {
      const [d, sd, slug] = key.split(KEY_SEP);
      if (d === domaine && sd === sousDomaine) list.push(slug);
    });
    return list;
  }
  /* Paliers réellement présents dans niveauRates pour cette compétence,
     triés numériquement (1, 2, 3) — utilisé tel quel côté élève (seuls les
     niveaux tentés apparaissent). Côté classe, renderStep complète avec les
     paliers attendus mais non tentés (voir competenceRates[key].paliers). */
  function paliersOf(niveauRates, domaine, sousDomaine, slug) {
    const list = [];
    niveauRates.forEach((v, key) => {
      const [d, sd, s, palier] = key.split(KEY_SEP);
      if (d === domaine && sd === sousDomaine && s === slug) list.push(palier);
    });
    return list.sort((a, b) => Number(a) - Number(b));
  }

  /* labels : chemin déjà résolu en libellés humains (voir renderStep). */
  function renderCrumbs(labels) {
    const all = ['Toutes les matières', ...labels];
    return `<div class="bnav-crumbs">${all.map((label, i) => {
      const isLast = i === all.length - 1;
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

  function disabledRow(label, meta) {
    return `<div class="bnav-row bnav-row-disabled">
      <span class="bnav-row-label">${label}</span>
      <span class="bnav-row-meta">${meta}</span>
    </div>`;
  }

  /* ── Feuille "classe" — une ligne par élève, triée pire d'abord (items déjà
     triés par getLeafItems), score individuel. Items minimaux {name, pct} :
     tout champ supplémentaire (score/total/date…) est ignoré ici. */
  function renderClasseLeaf(items) {
    if (!items || items.length === 0) return '<div class="empty-inline">Aucun résultat.</div>';
    const rows = items.map(it => `
      <div class="bnav-leaf-row">
        <span class="bnav-leaf-name">${escHtml(it.name)}</span>
        <span class="score-pill ${pctClass(it.pct)}">${Math.round(it.pct)}%</span>
      </div>`).join('');
    return `<div class="bnav-leaf-list">${rows}</div>`;
  }

  function renderStep(container) {
    const state = container.__bilanNav;
    const { path, config } = state;
    const { mode, domainOrder = [], domainIcons = {}, sousDomaineRates, competenceRates, niveauRates, getLeafItems } = config;
    let body = '';
    const crumbLabels = [];

    if (path.length === 0) {
      /* Étape 1 — matières */
      const keys = [...domainesOf(competenceRates)];
      const domaineKeys = domainOrder.filter(d => keys.includes(d));
      keys.forEach(d => { if (!domaineKeys.includes(d)) domaineKeys.push(d); });
      const rows = domaineKeys.map(domaine => {
        const icon = domainIcons[domaine] || '📖';
        return navRow(domaine, `${icon} ${escHtml(domaine)}`, '');
      });
      body = renderRowList(rows);

    } else if (path.length === 1) {
      /* Étape 2 — sous-domaines (ordre naturel, pas de tri par taux) */
      const [domaine] = path;
      const rows = [...sousDomainesOf(competenceRates, domaine)].map(sousDomaine => {
        const rate = sousDomaineRates && sousDomaineRates.get(rateKey(domaine, sousDomaine));
        const meta = rate ? `${rate.avgPct}%` : '';
        return navRow(sousDomaine, escHtml(sousDomaine), meta);
      });
      body = renderRowList(rows);

    } else if (path.length === 2) {
      /* Étape 3 — compétences (un exercice), triées du moins bien réussi au
         mieux réussi ; % + métatexte (page-fourni : "N élèves"/"N tentatives"). */
      const [domaine, sousDomaine] = path;
      const slugs = slugsOf(competenceRates, domaine, sousDomaine)
        .map(slug => ({ slug, rate: competenceRates.get(rateKey(domaine, sousDomaine, slug)) }))
        .sort((a, b) => a.rate.avgPct - b.rate.avgPct);
      const rows = slugs.map(({ slug, rate }) =>
        navRow(slug, escHtml(rate.title), pctMeta(rate.avgPct, rate.metaText)));
      body = renderRowList(rows);

    } else if (path.length === 3) {
      /* Étape 4 — niveaux (paliers internes 1/2/3) de la compétence choisie.
         Mode classe : montre aussi les paliers attendus (competenceRates
         .paliers) mais jamais tentés, en ligne grisée non cliquable. Mode
         élève : seuls les paliers réellement tentés (paliersOf). */
      const [domaine, sousDomaine, slug] = path;
      const compRate = competenceRates.get(rateKey(domaine, sousDomaine, slug));
      const tried = paliersOf(niveauRates, domaine, sousDomaine, slug);
      /* Union avec `tried` (jamais juste `1..paliers`) : un palier réellement
         présent dans niveauRates ne doit jamais être masqué, même si le
         nombre de paliers attendu (catalogue) était sous-estimé pour une
         raison quelconque — cohérent avec les limites déjà documentées de
         la résolution palier/niveau ailleurs dans teacher-analytics.js. */
      const expected = mode === 'classe' && compRate && compRate.paliers
        ? Array.from({ length: compRate.paliers }, (_, i) => String(i + 1))
        : [];
      const palierKeys = mode === 'classe'
        ? [...new Set([...expected, ...tried])].sort((a, b) => Number(a) - Number(b))
        : tried;
      const rows = palierKeys.map(palier => {
        const rate = niveauRates.get(rateKey(domaine, sousDomaine, slug, palier));
        const desc  = config.getLevelDesc ? config.getLevelDesc(slug, palier) : null;
        const label = desc ? `Niveau ${escHtml(palier)} — ${escHtml(desc)}` : `Niveau ${escHtml(palier)}`;
        if (!rate) return disabledRow(label, 'pas encore travaillé');
        return navRow(palier, label, pctMeta(rate.avgPct, rate.metaText));
      });
      body = renderRowList(rows);
      if (config.onPrintCompetence) {
        body = `<div class="bnav-actions">
          <button type="button" class="btn btn-ghost btn-sm" data-nav-print-comp>📄 Exporter cette compétence en PDF</button>
        </div>` + body;
      }

    } else {
      /* Étape 5 — feuille, résolue à la demande par la page (getLeafItems) :
         liste d'élèves (classe) ou détail par question (élève, voir
         resultats-enseignant.html sous-étape D). */
      const items = getLeafItems(path);
      body = mode === 'classe' ? renderClasseLeaf(items) : (config.renderEleveLeaf ? config.renderEleveLeaf(items) : '');
    }

    /* Libellés de fil d'Ariane lisibles : le domaine/sous-domaine/palier
       sont déjà lisibles tels quels ; le slug (étape 3+) est remplacé par
       son titre humain via competenceRates. */
    path.forEach((p, i) => {
      if (i === 2) {
        const rate = competenceRates.get(rateKey(path[0], path[1], path[2]));
        crumbLabels.push(rate ? rate.title : p);
      } else if (i === 3) {
        crumbLabels.push(`Niveau ${p}`);
      } else {
        crumbLabels.push(p);
      }
    });

    container.innerHTML = renderCrumbs(crumbLabels) + body;
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
      config: { mode: 'classe'|'eleve', domainOrder, domainIcons,
                sousDomaineRates, competenceRates, niveauRates, getLeafItems,
                renderEleveLeaf, rememberKey, onPrintCompetence, getLevelDesc }
      getLevelDesc(slug, palier) optionnel : intitulé de spécificité du
      niveau (levelDescs, data/*.js — voir lfmAnalytics.levelDescFor), affiché
      à côté de "Niveau X" à l'étape 4. Appelé pour CHAQUE palier affiché, y
      compris ceux jamais tentés (lignes grisées) — pas seulement ceux
      présents dans niveauRates. */
  function mount(container, config) {
    let initialPath = [];
    if (config.rememberKey) {
      const saved = sessionStorage.getItem('lfm-bilan-matiere-' + config.rememberKey);
      if (saved && domainesOf(config.competenceRates).has(saved)) initialPath = [saved];
    }
    container.__bilanNav = { path: initialPath, config };
    bindEvents(container);
    renderStep(container);
  }

  /** Navigue directement vers `path` (ex. [domaine, sousDomaine, slug,
      palier] pour ouvrir la feuille) sans repartir de l'étape 1 — utilisé
      par le bouton "Voir les erreurs" (compétences à consolider, fiche
      élève). `container` doit déjà avoir été monté (mount()). */
  function navigateTo(container, path) {
    if (!container.__bilanNav) return;
    container.__bilanNav.path = path;
    persistMatiere(container.__bilanNav);
    renderStep(container);
  }

  /* ── Rendu impression (arbre complet, données → HTML direct, sans DOM) ──
     Utilisé par printBilan() pour le bilan classe entier. Repli sur les
     mêmes Maps rates + getLeafItems que l'écran — pas de structure séparée
     à maintenir. Ne montre que les paliers réellement tentés (pas de ligne
     "pas encore travaillé" dans un document imprimé). */
  function renderFullTreeHtml(opts) {
    const { domainOrder = [], domainIcons = {}, sousDomaineRates, competenceRates, niveauRates, getLeafItems } = opts;
    const domaineKeys = domainOrder.filter(d => domainesOf(competenceRates).has(d));
    domainesOf(competenceRates).forEach(d => { if (!domaineKeys.includes(d)) domaineKeys.push(d); });

    let html = '';
    domaineKeys.forEach(domaine => {
      const icon = domainIcons[domaine] || '📖';
      html += `<div class="bilan-domaine">
        <div class="bilan-domaine-header">
          <span class="bilan-domaine-title">${icon} ${escHtml(domaine)}</span>
        </div>
        <div class="bilan-domaine-body">`;

      [...sousDomainesOf(competenceRates, domaine)].forEach(sousDomaine => {
        const rate = sousDomaineRates && sousDomaineRates.get(rateKey(domaine, sousDomaine));
        const gaugeHtml = rate ? `
          <div class="subdom-gauge-row">
            <div class="subdom-gauge-label"><span>${escHtml(sousDomaine)}</span><span class="n">${rate.avgPct}%</span></div>
            <div class="subdom-gauge-track"><div class="subdom-gauge-fill" style="width:${rate.avgPct}%"></div></div>
          </div>` : `<div class="bilan-sous-domaine-title" style="padding:0">${escHtml(sousDomaine)}</div>`;

        html += `<div class="bilan-sous-domaine">
          <div class="bilan-sous-domaine-header">${gaugeHtml}</div>`;

        slugsOf(competenceRates, domaine, sousDomaine)
          .map(slug => ({ slug, rate: competenceRates.get(rateKey(domaine, sousDomaine, slug)) }))
          .sort((a, b) => a.rate.avgPct - b.rate.avgPct)
          .forEach(({ slug, rate: compRate }) => {
            html += `<div class="bilan-competence">
              <div class="bilan-competence-title">${escHtml(compRate.title)} — ${compRate.avgPct}% · ${escHtml(compRate.metaText)}</div>`;

            paliersOf(niveauRates, domaine, sousDomaine, slug).forEach(palier => {
              const niveauRate = niveauRates.get(rateKey(domaine, sousDomaine, slug, palier));
              const items = getLeafItems([domaine, sousDomaine, slug, palier]);

              html += `<div class="bilan-level-block">
                <span style="margin-bottom:8px;display:inline-block" class="badge">Niveau ${escHtml(palier)} — ${niveauRate.avgPct}%</span>
                <div class="table-wrap" style="border-radius:8px">
                  <table class="result-table">
                    <thead><tr><th>Élève</th><th>Résultat</th></tr></thead>
                    <tbody>`;

              items.slice().sort((a, b) => a.name.localeCompare(b.name, 'fr')).forEach(item => {
                const pct = Math.round(item.pct);
                html += `<tr>
                  <td style="font-weight:600">${escHtml(item.name)}</td>
                  <td><span class="score-pill ${pctClass(pct)}">${pct}%</span></td>
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

  return { mount, navigateTo, renderFullTreeHtml };
})();

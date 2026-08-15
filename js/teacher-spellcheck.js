/* ═══════════════════════════════════════════════════════════════════════
   teacher-spellcheck.js — Vérificateur orthographique/grammatical temps
   réel pour les champs de texte libre de l'espace enseignant/admin.

   Indépendant du module Rédaction (js/jogging-grammalecte.js) : ce fichier
   ne fait AUCUN mapping vers la grille pédagogique Code Champion. Seul un
   filtrage par famille (voir EXCLUDED_FAMILIES ci-dessous) retire le bruit
   non linguistique (apostrophe, espacement, ponctuation) ; toutes les autres
   erreurs Grammalecte sont affichées telles quelles. Ce filtrage réutilise
   le même mécanisme de résolution de famille que resolveCode() dans
   js/jogging-grammalecte.js (repli sur le préfixe du sRuleId quand sType
   vaut "notype") pour ne pas laisser passer une règle d'espace/ponctuation
   simplement parce qu'elle serait mal étiquetée — donc aucun risque de
   reproduire le bug corrigé le 2026-07-20 où des erreurs sType:"notype"
   légitimes étaient, elles, silencieusement perdues par un filtrage trop
   large (ici le filtrage est volontairement étroit : 3 familles seulement).

   Le moteur n'est pas dupliqué : ce module réinstancie le même script
   lib/grammalecte/gc-worker.js que le module Rédaction (mêmes options de
   règles déjà activées dans ce fichier — poncfin/esp/tab/nbsp/unit/mapos/mc,
   même audit du 2026-07-20). Un Worker ne pouvant pas être partagé entre
   deux pages différentes, chaque page qui inclut ce script obtient sa
   propre instance — comme le fait déjà jogging.html pour le module Rédaction.

   Usage :
     <script src="js/teacher-spellcheck.js"></script>
   puis ajouter la classe "lfm-verifie" à tout <textarea>, <input type="text">
   ou élément [contenteditable] à vérifier. Les champs ajoutés dynamiquement
   après coup (formulaires générés en JS) sont détectés automatiquement via
   MutationObserver — inutile d'appeler quoi que ce soit manuellement.
   ═══════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const FIELD_CLASS = 'lfm-verifie';
  const DEBOUNCE_MS = 600;
  const WORKER_PATH = 'lib/grammalecte/gc-worker.js';

  // ── Worker Grammalecte (une seule instance, partagée par tous les champs
  //    vérifiés de la page) ──────────────────────────────────────────────
  let worker = null;
  let workerReady = null; // Promise

  function getWorker() {
    if (worker) return worker;
    worker = new Worker(WORKER_PATH);
    workerReady = new Promise((resolve, reject) => {
      const onTimeout = setTimeout(() => {
        reject(new Error('Le correcteur met trop de temps à démarrer.'));
      }, 20000);
      worker.onmessage = (e) => {
        const data = e.data || {};
        if (data.type === 'ready') {
          clearTimeout(onTimeout);
          resolve(true);
        } else if (data.type === 'error' && !workerReady) {
          clearTimeout(onTimeout);
          reject(new Error(data.message || 'Erreur du correcteur'));
        }
      };
      worker.onerror = () => {
        clearTimeout(onTimeout);
        reject(new Error("Le correcteur n'a pas pu se charger."));
      };
    });
    return worker;
  }

  // Le worker traite une requête à la fois et sa réponse ne porte pas
  // d'identifiant (même contrat que js/jogging-grammalecte.js) : les appels
  // de plusieurs champs sont sérialisés ici pour qu'aucune réponse ne soit
  // livrée au mauvais appelant.
  let parseQueue = Promise.resolve();

  function analyzeText(text) {
    if (!text || !text.trim()) return Promise.resolve([]);
    const w = getWorker();
    const run = () => new Promise((resolve) => {
      workerReady.then(
        () => {
          const onTimeout = setTimeout(() => resolve([]), 15000);
          w.onmessage = (e) => {
            const data = e.data || {};
            if (data.type === 'result') {
              clearTimeout(onTimeout);
              resolve(buildErrors(data));
            } else if (data.type === 'error') {
              clearTimeout(onTimeout);
              resolve([]);
            }
          };
          w.onerror = () => { clearTimeout(onTimeout); resolve([]); };
          w.postMessage({ type: 'parse', text });
        },
        () => resolve([]) // le worker n'a pas pu démarrer : pas de correction, pas de blocage
      );
    });
    parseQueue = parseQueue.then(run, run);
    return parseQueue;
  }

  // ── Familles Grammalecte hors-sujet pour un correcteur enseignant/admin ──
  // On ne garde que l'orthographe, la grammaire, les accords, la
  // conjugaison et les homophones : on retire l'apostrophe, l'espacement et
  // la ponctuation, qui sont des questions de présentation/typographie, pas
  // de véritables fautes de langue (voir lib/grammalecte/fr/gc_options.js
  // → oOptLabel pour la définition de chaque famille).
  const EXCLUDED_FAMILIES = new Set([
    // Apostrophe : typographique (' vs '), manquante après lettre isolée
    // (l/d/s/n/c/j/m/t/ç), élisions.
    'apos', 'mapos', 'eleu',
    // Espace : surnuméraires, tabulations, espaces insécables (y compris
    // autour de la ponctuation ! ? : ;), espaces avant unités.
    'esp', 'tab', 'nbsp', 'unit',
    // Ponctuation : virgules manquantes, ponctuation finale de paragraphe,
    // traits d'union/tirets. 'typo' est aussi ici : vérifié empiriquement
    // (ex. « dort , il » → sRuleId "typo_virgule_entre_deux_espaces"), c'est
    // sous ce sType que Grammalecte range l'espace en trop AVANT une
    // ponctuation — pas sous "esp" ni "virg" comme on pourrait s'y attendre.
    'virg', 'poncfin', 'tu', 'typo'
  ]);

  // Même mécanisme que resolveCode() dans js/jogging-grammalecte.js : une
  // règle de confusion réelle peut ressortir avec sType:"notype" (groupe de
  // règles "toujours actif", sans option associée) au lieu de sa vraie
  // famille — on retente alors une extraction depuis le préfixe du sRuleId
  // (convention "g<n>__<famille>_...") avant de statuer, pour ne jamais
  // laisser passer une règle d'espace/ponctuation simplement mal étiquetée.
  const RULE_ID_FAMILY_RE = /^g\d*__([a-zàâéèêëîïôùûç]+)_/;

  function isExcludedFamily(sType, sRuleId) {
    if (EXCLUDED_FAMILIES.has(sType)) return true;
    const m = sRuleId && RULE_ID_FAMILY_RE.exec(sRuleId);
    return !!(m && EXCLUDED_FAMILIES.has(m[1]));
  }

  function buildErrors(result) {
    const erreurs = [];
    for (const oErr of (result.aGrammErr || [])) {
      if (isExcludedFamily(oErr.sType, oErr.sRuleId)) continue;
      erreurs.push({
        start: oErr.nStart,
        end: oErr.nEnd,
        message: oErr.sMessage || 'Erreur détectée.',
        suggestions: oErr.aSuggestions || []
      });
    }
    for (const oTok of (result.aSpellErr || [])) {
      erreurs.push({
        start: oTok.nStart,
        end: oTok.nEnd,
        message: `« ${oTok.sValue} » ne figure pas dans le dictionnaire.`,
        suggestions: oTok.aSuggestions || []
      });
    }
    erreurs.sort((a, b) => a.start - b.start);

    // Filet de sécurité : si deux erreurs se chevauchent (arrive quand une
    // règle de grammaire et le correcteur orthographique se déclenchent sur
    // la même zone), on garde la première — même logique que
    // js/jogging-engine.js (highlightText) pour un surlignage cohérent.
    const resolved = [];
    let lastEnd = -1;
    for (const e of erreurs) {
      if (e.start >= lastEnd) { resolved.push(e); lastEnd = e.end; }
    }
    return resolved;
  }

  // ── Styles (injectés une seule fois, indépendants de la page hôte) ──────
  function injectStyle() {
    if (document.getElementById('lfm-verifie-style')) return;
    const style = document.createElement('style');
    style.id = 'lfm-verifie-style';
    style.textContent = `
      .lfm-verifie-wrap { position: relative; display: block; }
      .lfm-verifie-mirror {
        position: absolute; inset: 0; margin: 0; overflow: hidden;
        pointer-events: none; white-space: pre-wrap; word-wrap: break-word;
        overflow-wrap: break-word; color: transparent; background: transparent;
      }
      .lfm-verifie-mirror .lfm-err,
      [contenteditable].lfm-verifie .lfm-err {
        color: transparent;
        text-decoration: underline wavy;
        text-decoration-color: var(--red, #D62839);
        text-decoration-thickness: 2px;
        text-underline-offset: 3px;
      }
      [contenteditable].lfm-verifie .lfm-err { color: inherit; cursor: pointer; }
      .lfm-verifie-wrap > textarea.lfm-verifie,
      .lfm-verifie-wrap > input.lfm-verifie {
        position: relative; z-index: 1; background: transparent;
      }
      #lfm-verifie-popover {
        position: fixed; z-index: 99999; max-width: 320px;
        background: #fff; border: 2px solid var(--color-brand-navy, #1A2D6B);
        border-radius: 12px; box-shadow: 0 10px 30px rgba(16,43,106,0.18);
        padding: 12px 30px 12px 14px; display: none;
      }
      #lfm-verifie-popover.is-open { display: block; }
      #lfm-verifie-popover .lfm-pop-msg {
        font-family: var(--font-body, 'Nunito Sans', sans-serif);
        font-size: 13px; color: var(--color-brand-navy, #1A2D6B);
        margin: 0 0 8px; line-height: 1.4;
      }
      #lfm-verifie-popover .lfm-pop-suggestions {
        display: flex; flex-wrap: wrap; gap: 6px;
      }
      #lfm-verifie-popover .lfm-pop-sugg-btn {
        font-family: var(--font-display, 'Fredoka', sans-serif);
        font-weight: 600; font-size: 13px; cursor: pointer;
        border: 1.5px solid var(--color-niveau-cm1, #1DBFA0);
        background: #fff; color: var(--color-brand-navy, #1A2D6B);
        border-radius: 8px; padding: 4px 10px; transition: background .15s, color .15s;
      }
      #lfm-verifie-popover .lfm-pop-sugg-btn:hover,
      #lfm-verifie-popover .lfm-pop-sugg-btn:focus-visible {
        background: var(--color-niveau-cm1, #1DBFA0); color: #fff;
      }
      #lfm-verifie-popover .lfm-pop-close {
        position: absolute; top: 6px; right: 8px; border: none; background: none;
        cursor: pointer; font-size: 15px; line-height: 1; color: var(--muted, #5F6368);
        padding: 4px;
      }
    `;
    document.head.appendChild(style);
  }

  // ── État par champ ───────────────────────────────────────────────────
  const state = new WeakMap(); // field -> { timer, errors, kind, mirror? }

  function getFieldText(field) {
    return field.isContentEditable ? (field.textContent || '') : (field.value || '');
  }

  function escText(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function scheduleAnalyze(field, st) {
    clearTimeout(st.timer);
    st.timer = setTimeout(() => runAnalyze(field, st), DEBOUNCE_MS);
  }

  function reAnalyzeNow(field, st) {
    clearTimeout(st.timer);
    runAnalyze(field, st);
  }

  async function runAnalyze(field, st) {
    const text = getFieldText(field);
    const errors = await analyzeText(text);
    // Le champ a pu changer pendant l'attente de la réponse du worker :
    // un résultat devenu obsolète est ignoré plutôt que mal appliqué.
    if (getFieldText(field) !== text) return;
    st.errors = errors;
    if (st.kind === 'mirror') renderMirror(field, st.mirror, errors);
    else renderContentEditable(field, errors);
  }

  // ── Champs <textarea> / <input type="text"> : div miroir superposée ────
  // Un champ natif ne permet pas de styler un mot précis dans son texte —
  // on superpose donc une div invisible (texte transparent) portant les
  // soulignements ondulés au bon endroit, pendant que le champ réel
  // (transparent lui aussi côté fond, opaque côté texte) reste au-dessus
  // pour recevoir la saisie et afficher le texte normalement.
  function attachMirrored(field) {
    const wrapper = document.createElement('div');
    wrapper.className = 'lfm-verifie-wrap';
    field.parentNode.insertBefore(wrapper, field);

    const mirror = document.createElement('div');
    mirror.className = 'lfm-verifie-mirror';
    wrapper.appendChild(mirror);
    wrapper.appendChild(field);

    const st = { timer: null, errors: [], kind: 'mirror', mirror };
    state.set(field, st);

    syncMirrorBox(field, mirror);
    renderMirror(field, mirror, []);

    field.addEventListener('input', () => {
      syncMirrorScroll(field, mirror);
      scheduleAnalyze(field, st);
    });
    field.addEventListener('scroll', () => syncMirrorScroll(field, mirror));
    field.addEventListener('click', (e) => onMirroredClick(field, st, e));
    field.addEventListener('focus', () => { if (getFieldText(field)) scheduleAnalyze(field, st); });
    field.addEventListener('blur', closePopover);
    window.addEventListener('resize', () => syncMirrorBox(field, mirror));

    if (getFieldText(field)) scheduleAnalyze(field, st);
  }

  const MIRROR_CSS_PROPS = [
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing',
    'textTransform', 'textIndent', 'textAlign',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle',
    'boxSizing'
  ];

  function syncMirrorBox(field, mirror) {
    const cs = getComputedStyle(field);
    MIRROR_CSS_PROPS.forEach(prop => { mirror.style[prop] = cs[prop]; });
    mirror.style.borderColor = 'transparent';
    if (field.tagName === 'INPUT') {
      mirror.style.whiteSpace = 'pre';
      mirror.style.overflow = 'hidden';
    }
  }

  function syncMirrorScroll(field, mirror) {
    mirror.scrollTop = field.scrollTop;
    mirror.scrollLeft = field.scrollLeft;
  }

  function renderMirror(field, mirror, errors) {
    const text = getFieldText(field);
    let html = '';
    let cursor = 0;
    errors.forEach(err => {
      const start = Math.max(cursor, Math.min(err.start, text.length));
      const end = Math.max(start, Math.min(err.end, text.length));
      html += escText(text.slice(cursor, start));
      html += `<span class="lfm-err">${escText(text.slice(start, end))}</span>`;
      cursor = end;
    });
    html += escText(text.slice(cursor));
    // white-space:pre-wrap n'affiche pas un dernier retour à la ligne sans
    // caractère de suite — même contournement que pour un textarea natif.
    if (text.endsWith('\n')) html += ' ';
    mirror.innerHTML = html;
  }

  function onMirroredClick(field, st, evt) {
    const pos = field.selectionStart;
    if (pos == null) { closePopover(); return; }
    const err = st.errors.find(e => pos >= e.start && pos <= e.end);
    if (!err) { closePopover(); return; }
    openPopover(err, evt.clientX, evt.clientY, (suggestion) => {
      applySuggestionMirrored(field, st, err, suggestion);
    });
  }

  function applySuggestionMirrored(field, st, err, suggestion) {
    const text = getFieldText(field);
    const before = text.slice(0, err.start);
    const after = text.slice(err.end);
    const newText = before + suggestion + after;
    const caret = before.length + suggestion.length;
    field.value = newText;
    field.focus();
    field.setSelectionRange(caret, caret);
    // Efface les soulignements devenus obsolètes tout de suite (positions
    // décalées par le remplacement) : le prochain runAnalyze() les recalcule.
    st.errors = [];
    renderMirror(field, st.mirror, []);
    field.dispatchEvent(new Event('input', { bubbles: true }));
    closePopover();
    reAnalyzeNow(field, st);
  }

  // ── Champs [contenteditable] ─────────────────────────────────────────
  function attachContentEditable(field) {
    const st = { timer: null, errors: [], kind: 'contenteditable' };
    state.set(field, st);

    field.addEventListener('input', () => scheduleAnalyze(field, st));
    field.addEventListener('click', (e) => {
      const mark = e.target.closest('.lfm-err');
      if (!mark || !field.contains(mark)) { closePopover(); return; }
      const idx = +mark.dataset.i;
      const err = st.errors[idx];
      if (!err) return;
      openPopover(err, e.clientX, e.clientY, (suggestion) => {
        applySuggestionContentEditable(field, st, err, suggestion);
      });
    });
    field.addEventListener('focus', () => { if (getFieldText(field)) scheduleAnalyze(field, st); });
    field.addEventListener('blur', closePopover);

    if (getFieldText(field)) scheduleAnalyze(field, st);
  }

  function renderContentEditable(field, errors) {
    const caretOffset = getContentEditableCaret(field);
    const text = getFieldText(field);
    let html = '';
    let cursor = 0;
    errors.forEach((err, i) => {
      const start = Math.max(cursor, Math.min(err.start, text.length));
      const end = Math.max(start, Math.min(err.end, text.length));
      html += escText(text.slice(cursor, start));
      html += `<span class="lfm-err" data-i="${i}">${escText(text.slice(start, end))}</span>`;
      cursor = end;
    });
    html += escText(text.slice(cursor));
    field.innerHTML = html;
    if (caretOffset != null) setContentEditableCaret(field, caretOffset);
  }

  function getContentEditableCaret(field) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (!field.contains(range.startContainer)) return null;
    const pre = range.cloneRange();
    pre.selectNodeContents(field);
    pre.setEnd(range.startContainer, range.startOffset);
    return pre.toString().length;
  }

  function setContentEditableCaret(field, offset) {
    const range = document.createRange();
    let remaining = offset;
    let found = false;
    (function walk(n) {
      if (found) return;
      if (n.nodeType === Node.TEXT_NODE) {
        if (remaining <= n.textContent.length) {
          range.setStart(n, Math.max(0, remaining));
          found = true;
        } else {
          remaining -= n.textContent.length;
        }
      } else {
        for (const child of n.childNodes) {
          walk(child);
          if (found) break;
        }
      }
    })(field);
    if (!found) {
      range.selectNodeContents(field);
      range.collapse(false);
    } else {
      range.collapse(true);
    }
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function applySuggestionContentEditable(field, st, err, suggestion) {
    const text = getFieldText(field);
    const newText = text.slice(0, err.start) + suggestion + text.slice(err.end);
    field.textContent = newText;
    setContentEditableCaret(field, err.start + suggestion.length);
    st.errors = [];
    field.dispatchEvent(new Event('input', { bubbles: true }));
    closePopover();
    reAnalyzeNow(field, st);
  }

  // ── Bulle de suggestion (une seule instance, partagée par tous les champs) ─
  let popoverEl = null;
  let outsideClickHandler = null;

  function ensurePopover() {
    if (popoverEl) return popoverEl;
    popoverEl = document.createElement('div');
    popoverEl.id = 'lfm-verifie-popover';
    popoverEl.innerHTML = `
      <button type="button" class="lfm-pop-close" aria-label="Fermer">✕</button>
      <p class="lfm-pop-msg"></p>
      <div class="lfm-pop-suggestions"></div>
    `;
    document.body.appendChild(popoverEl);
    popoverEl.querySelector('.lfm-pop-close').addEventListener('click', closePopover);
    return popoverEl;
  }

  function openPopover(err, x, y, onPick) {
    const el = ensurePopover();
    el.querySelector('.lfm-pop-msg').textContent = err.message || 'Erreur détectée.';
    const suggWrap = el.querySelector('.lfm-pop-suggestions');
    suggWrap.innerHTML = '';
    (err.suggestions || []).slice(0, 5).forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lfm-pop-sugg-btn';
      btn.textContent = s;
      btn.addEventListener('click', () => onPick(s));
      suggWrap.appendChild(btn);
    });
    el.classList.add('is-open');

    // Position mesurée puis ajustée pour rester dans le viewport (évite une
    // bulle tronquée en bord d'écran).
    el.style.left = '0px';
    el.style.top = '0px';
    const rect = el.getBoundingClientRect();
    let left = x + 8, top = y + 12;
    if (left + rect.width > window.innerWidth - 8) left = window.innerWidth - rect.width - 8;
    if (top + rect.height > window.innerHeight - 8) top = y - rect.height - 12;
    el.style.left = Math.max(8, left) + 'px';
    el.style.top = Math.max(8, top) + 'px';

    if (outsideClickHandler) document.removeEventListener('mousedown', outsideClickHandler, true);
    setTimeout(() => {
      outsideClickHandler = (e) => { if (!el.contains(e.target)) closePopover(); };
      document.addEventListener('mousedown', outsideClickHandler, true);
    }, 0);
  }

  function closePopover() {
    if (!popoverEl) return;
    popoverEl.classList.remove('is-open');
    if (outsideClickHandler) {
      document.removeEventListener('mousedown', outsideClickHandler, true);
      outsideClickHandler = null;
    }
  }

  // ── Attache automatique (initiale + champs ajoutés dynamiquement) ──────
  function attach(field) {
    if (state.has(field)) return;
    if (field.isContentEditable) {
      attachContentEditable(field);
    } else if (field.tagName === 'TEXTAREA' ||
      (field.tagName === 'INPUT' && (field.type === 'text' || field.type === ''))) {
      attachMirrored(field);
    }
  }

  function attachAll(root) {
    root.querySelectorAll('.' + FIELD_CLASS).forEach(attach);
  }

  function init() {
    injectStyle();
    attachAll(document);

    const mo = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains(FIELD_CLASS)) attach(node);
          if (node.querySelectorAll) attachAll(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Préchauffe le worker/dictionnaire dès l'arrivée sur la page, pour que
    // la première vérification n'attende pas son chargement (~4 Mo) —
    // même raison que JoggingGrammalecte.preload() dans le module Rédaction.
    getWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

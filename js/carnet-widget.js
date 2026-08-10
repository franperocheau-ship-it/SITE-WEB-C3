/* ─────────────────────────────────────────────────────────────────────────────
   carnet-widget.js — Helper partagé pour les carnets élève (carnet d'auteur
   des joggings, carnet de mots du module Corpus lexical). Ne fait aucune
   hypothèse sur la forme des lignes : l'appelant fournit les callbacks de
   récupération/suppression/rendu, ce module ne gère que le squelette
   liste + bouton retirer + bouton impression optionnel.
   ───────────────────────────────────────────────────────────────────────────── */

const CarnetWidget = (() => {
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * @param {object} config
   * @param {string} config.listElId       id du conteneur de liste
   * @param {string} [config.printBtnElId] id du bouton impression (optionnel)
   * @param {string} config.emptyMessage   message affiché si aucune ligne
   * @param {function} config.rowKey       (row) => clé unique (string/uuid)
   * @param {function} config.fetchRows    async () => rows[]
   * @param {function} config.renderCard   (row) => html — doit inclure un
   *        élément portant l'attribut data-carnet-remove="<rowKey(row)>"
   * @param {function} config.removeRow    async (row) => void
   * @param {function} [config.onPrint]    (rows) => void, appelé au clic du
   *        bouton impression si fourni ; sinon le bouton reste masqué
   */
  async function render(config) {
    const listEl = document.getElementById(config.listElId);
    const printBtn = config.printBtnElId ? document.getElementById(config.printBtnElId) : null;
    if (!listEl) return;

    const rows = await config.fetchRows();

    if (!rows || rows.length === 0) {
      listEl.innerHTML = `<div class="dash-empty"><em>${escapeHtml(config.emptyMessage)}</em></div>`;
      if (printBtn) printBtn.style.display = 'none';
      return;
    }

    listEl.innerHTML = rows.map(config.renderCard).join('');

    listEl.querySelectorAll('[data-carnet-remove]').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        const row = rows.find(r => String(config.rowKey(r)) === btn.dataset.carnetRemove);
        if (row) await config.removeRow(row);
        render(config);
      });
    });

    if (printBtn) {
      if (config.onPrint) {
        printBtn.style.display = '';
        printBtn.onclick = () => config.onPrint(rows);
      } else {
        printBtn.style.display = 'none';
      }
    }
  }

  return { render, escapeHtml };
})();

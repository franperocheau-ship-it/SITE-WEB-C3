/* ─────────────────────────────────────────────────────────────────────────────
   locked-feature.js — Composant partagé "carte grisée + mot de passe".

   Grise une carte/onglet (hub-card ou dash-card) marquée data-locked="true" tout
   en gardant le clic actif : il ouvre une modale demandant un mot de passe avant
   de poursuivre vers le href d'origine de la carte. Mauvais mot de passe →
   message d'erreur, la modale reste ouverte.

   Utilisation dans une page :
     1) Sur la carte : <a href="cible.html" class="hub-card hub-card--locked"
                           data-locked="true"> ... </a>
        + un badge visible, ex. <span class="lf-badge-construction">En construction</span>
     2) En fin de page :
          <script src="js/locked-feature.js?v=1"></script>
          <script>LockedFeature.init();</script>
   ───────────────────────────────────────────────────────────────────────────── */

const LockedFeature = (() => {
  const PASSWORD = '1234';
  let modalEl = null;
  let pendingHref = null;

  function injectModal() {
    if (modalEl) return;

    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="lf-modal-overlay" id="lf-modal-overlay">
        <div class="lf-modal" role="dialog" aria-modal="true" aria-labelledby="lf-modal-title">
          <div class="lf-modal-header">
            <h2 class="lf-modal-title" id="lf-modal-title">Rubrique en construction</h2>
            <button type="button" class="lf-modal-close" id="lf-modal-close" aria-label="Fermer">×</button>
          </div>
          <form class="lf-modal-body" id="lf-modal-form" novalidate>
            <p class="lf-modal-text">Cette rubrique n'est pas encore finalisée. Un mot de passe est nécessaire pour y accéder quand même.</p>
            <input type="password" class="lf-modal-input" id="lf-modal-input" placeholder="Mot de passe" autocomplete="off" />
            <p class="lf-modal-error" id="lf-modal-error" style="display:none">Mot de passe incorrect.</p>
            <div class="lf-modal-footer">
              <button type="button" class="lf-modal-btn lf-modal-btn--ghost" id="lf-modal-cancel">Annuler</button>
              <button type="submit" class="lf-modal-btn lf-modal-btn--primary">Valider</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(wrap.firstElementChild);
    modalEl = document.getElementById('lf-modal-overlay');

    const input = document.getElementById('lf-modal-input');
    const error = document.getElementById('lf-modal-error');
    const form  = document.getElementById('lf-modal-form');

    function close() {
      modalEl.style.display = 'none';
      input.value = '';
      input.classList.remove('is-error');
      error.style.display = 'none';
      pendingHref = null;
    }

    document.getElementById('lf-modal-close').addEventListener('click', close);
    document.getElementById('lf-modal-cancel').addEventListener('click', close);
    modalEl.addEventListener('click', (e) => { if (e.target === modalEl) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.style.display === 'flex') close();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value === PASSWORD) {
        const href = pendingHref;
        close();
        if (href) window.location.href = href;
      } else {
        input.classList.remove('is-error');
        // force le replay de l'animation de secousse même en cas d'erreurs répétées
        void input.offsetWidth;
        input.classList.add('is-error');
        error.style.display = 'block';
        input.value = '';
        input.focus();
      }
    });

    modalEl.__lf_close = close;
  }

  function open(href) {
    injectModal();
    pendingHref = href;
    document.getElementById('lf-modal-error').style.display = 'none';
    document.getElementById('lf-modal-input').classList.remove('is-error');
    modalEl.style.display = 'flex';
    setTimeout(() => document.getElementById('lf-modal-input').focus(), 50);
  }

  function init(selector) {
    injectModal();
    document.querySelectorAll(selector || '[data-locked="true"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        open(el.getAttribute('href') || el.dataset.href || '');
      });
    });
  }

  return { init, open };
})();

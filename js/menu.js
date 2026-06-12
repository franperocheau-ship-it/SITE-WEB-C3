/* ─────────────────────────────────────────────────────────────────────────────
   menu.js
   Injecte l'overlay de navigation dans le DOM et active le bouton hamburger.
   Dépend de : supabase-client.js  (window.lfmDb)
   ───────────────────────────────────────────────────────────────────────────── */

(async function () {
  'use strict';

  /* ── 1. Styles du drawer ──────────────────────────────────────────────────── */
  const css = document.createElement('style');
  css.textContent = `
    /* Overlay pleine page */
    .lfm-overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      visibility: hidden;
      pointer-events: none;
    }
    .lfm-overlay.is-open {
      visibility: visible;
      pointer-events: auto;
    }

    /* Fond semi-transparent */
    .lfm-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(16,43,106,0.42);
      opacity: 0;
      transition: opacity 260ms ease;
    }
    .lfm-overlay.is-open .lfm-backdrop { opacity: 1; }

    /* Panneau latéral droit */
    .lfm-drawer {
      position: absolute;
      top: 0;
      right: 0;
      width: min(360px, 100vw);
      height: 100%;
      background: #ffffff;
      box-shadow: -6px 0 32px rgba(16,43,106,0.13);
      transform: translateX(100%);
      transition: transform 260ms cubic-bezier(.4,0,.2,1);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .lfm-overlay.is-open .lfm-drawer { transform: translateX(0); }

    /* En-tête du drawer */
    .lfm-dh {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 64px;
      border-bottom: 3px solid #D62839;
      flex-shrink: 0;
    }
    .lfm-dh-logo {
      font-weight: 800;
      font-size: 13px;
      color: #102B6A;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* Bouton fermer (×) — reprend l'apparence du bouton hamburger */
    .lfm-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex-shrink: 0;
    }
    .lfm-close .b { display: block; width: 26px; height: 2.5px; border-radius: 2px; }
    .lfm-close .b1 { background: #D62839; transform: rotate(45deg) translate(5.5px, 5.5px); }
    .lfm-close .b2 { background: #102B6A; opacity: 0; }
    .lfm-close .b3 { background: #D62839; transform: rotate(-45deg) translate(5.5px, -5.5px); }
    .lfm-close .b4 { background: #102B6A; transform: rotate(-45deg) translate(-5.5px, 5.5px); }

    /* Corps du drawer */
    .lfm-body { padding: 20px; flex: 1; }

    /* Bloc utilisateur connecté */
    .lfm-user {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(16,43,106,0.05);
      border: 1px solid rgba(16,43,106,0.10);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 20px;
    }
    .lfm-avatar {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: #102B6A;
      color: #fff;
      font-weight: 800;
      font-size: 15px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .lfm-uname { font-weight: 700; font-size: 14px; color: #1E2532; }
    .lfm-urole { font-size: 11px; color: #5F6368; text-transform: capitalize; margin-top: 2px; }

    /* Titre de section */
    .lfm-section-label {
      font-size: 10px;
      font-weight: 700;
      color: #5F6368;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    /* Cartes des espaces */
    .lfm-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 15px 16px;
      border-radius: 14px;
      border: 1.5px solid #E8EDF3;
      text-decoration: none;
      color: inherit;
      margin-bottom: 8px;
      transition: border-color 180ms, box-shadow 180ms, transform 180ms;
      background: #fff;
    }
    .lfm-card:hover {
      border-color: #102B6A;
      box-shadow: 0 4px 16px rgba(16,43,106,0.09);
      transform: translateY(-2px);
    }
    .lfm-card-icon {
      width: 46px; height: 46px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    .lfm-icon-t { background: rgba(16,43,106,0.07); }
    .lfm-icon-s { background: rgba(214,40,57,0.07); }
    .lfm-icon-a { background: rgba(16,43,106,0.04); }
    .lfm-card-info { flex: 1; min-width: 0; }
    .lfm-card-name { font-weight: 700; font-size: 14px; color: #102B6A; margin-bottom: 2px; }
    .lfm-card-desc { font-size: 12px; color: #5F6368; }
    .lfm-card-arr  { color: #102B6A; opacity: 0.45; font-size: 15px; flex-shrink: 0; }

    /* Séparateur */
    .lfm-sep {
      height: 1px;
      background: #E8EDF3;
      margin: 16px 0;
    }

    /* Bouton déconnexion */
    .lfm-logout {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 13px 16px;
      background: none;
      border: 1.5px solid #E8EDF3;
      border-radius: 10px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      color: #D62839;
      cursor: pointer;
      transition: background 180ms, border-color 180ms;
      text-align: left;
    }
    .lfm-logout:hover { background: rgba(214,40,57,0.05); border-color: #D62839; }
  `;
  document.head.appendChild(css);

  /* ── 2. Récupération de l'état d'authentification ─────────────────────────── */
  let profile = null;
  try {
    if (window.lfmDb) {
      const { data: { session } } = await window.lfmDb.auth.getSession();
      if (session) {
        const { data } = await window.lfmDb
          .from('profiles')
          .select('id, role, display_name')
          .eq('id', session.user.id)
          .single();
        profile = data;
      }
    }
  } catch (_) { /* silencieux — Supabase peut ne pas encore être configuré */ }

  /* ── 3. Définition des espaces ────────────────────────────────────────────── */
  const ROLE_LABELS = { enseignant: 'Enseignant·e', eleve: 'Élève', admin: 'Administrateur' };

  const spaces = [
    {
      key:  'enseignant',
      icon: '📚',
      cls:  'lfm-icon-t',
      name: 'Espace enseignant',
      desc: 'Gérez vos classes et suivez vos élèves',
      href: profile?.role === 'enseignant' ? 'dashboard-enseignant.html' : 'auth.html?role=enseignant'
    },
    {
      key:  'eleve',
      icon: '🎒',
      cls:  'lfm-icon-s',
      name: 'Espace élève',
      desc: 'Accédez à vos exercices et résultats',
      href: profile?.role === 'eleve' ? 'dashboard-eleve.html' : 'auth.html?role=eleve'
    },
    {
      key:  'admin',
      icon: '⚙️',
      cls:  'lfm-icon-a',
      name: 'Espace administrateur',
      desc: 'Gérez les utilisateurs et les paramètres',
      href: profile?.role === 'admin' ? 'dashboard-admin.html' : 'auth.html?role=admin'
    }
  ];

  /* ── 4. Construction du HTML ──────────────────────────────────────────────── */
  const userBlock = profile ? `
    <div class="lfm-user">
      <div class="lfm-avatar">${(profile.display_name || '?')[0].toUpperCase()}</div>
      <div>
        <div class="lfm-uname">${escHtml(profile.display_name)}</div>
        <div class="lfm-urole">${ROLE_LABELS[profile.role] || profile.role}</div>
      </div>
    </div>` : '';

  const logoutBlock = profile ? `
    <div class="lfm-sep"></div>
    <button class="lfm-logout" id="lfm-logout">
      <span>↩</span> Se déconnecter
    </button>` : '';

  const overlay = document.createElement('div');
  overlay.id = 'lfm-overlay';
  overlay.className = 'lfm-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Menu de navigation');
  overlay.innerHTML = `
    <div class="lfm-backdrop" id="lfm-backdrop"></div>
    <div class="lfm-drawer">
      <div class="lfm-dh">
        <span class="lfm-dh-logo">LFM — Espaces</span>
        <button class="lfm-close" id="lfm-close" aria-label="Fermer le menu">
          <span class="b b1"></span>
          <span class="b b2"></span>
          <span class="b b3"></span>
          <span class="b b4"></span>
        </button>
      </div>
      <div class="lfm-body">
        ${userBlock}
        <div class="lfm-section-label">Espaces de travail</div>
        ${spaces.map(s => `
          <a class="lfm-card" href="${s.href}">
            <div class="lfm-card-icon ${s.cls}">${s.icon}</div>
            <div class="lfm-card-info">
              <div class="lfm-card-name">${s.name}</div>
              <div class="lfm-card-desc">${s.desc}</div>
            </div>
            <span class="lfm-card-arr">→</span>
          </a>`).join('')}
        ${logoutBlock}
      </div>
    </div>`;
  document.body.appendChild(overlay);

  /* ── 5. Interactions ──────────────────────────────────────────────────────── */
  function openMenu()  { overlay.classList.add('is-open');    document.body.style.overflow = 'hidden'; }
  function closeMenu() { overlay.classList.remove('is-open'); document.body.style.overflow = ''; }

  document.querySelector('.menu-btn')?.addEventListener('click', openMenu);
  document.getElementById('lfm-close')?.addEventListener('click', closeMenu);
  document.getElementById('lfm-backdrop')?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  document.getElementById('lfm-logout')?.addEventListener('click', async () => {
    try { await window.lfmDb?.auth.signOut(); } catch (_) {}
    window.location.href = 'index.html';
  });

  /* ── Utilitaire ───────────────────────────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();

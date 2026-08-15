/* ─────────────────────────────────────────────────────────────────────────────
   idle-logout.js
   Déconnexion automatique après inactivité — espace élève, postes partagés.
   Dépend de : supabase-client.js (window.lfmDb), auth.js (lfmAuth) chargés avant.
   ───────────────────────────────────────────────────────────────────────────── */

(() => {
  const IDLE_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

  const ACTIVITY_EVENTS = ['click', 'keydown', 'touchstart', 'mousemove'];

  let timer = null;

  async function onIdle() {
    /* Certaines pages (ex. français.html, mathématiques.html) sont aussi
       consultées sans compte depuis visiteur.html — ne rediriger que s'il
       y a réellement une session élève à protéger. */
    let session = null;
    try {
      session = (await window.lfmDb?.auth.getSession())?.data?.session ?? null;
    } catch (_) {}
    if (!session) { resetTimer(); return; }

    try {
      await window.lfmDb?.auth.signOut();
    } catch (_) {}
    window.location.href = 'auth.html?role=eleve';
  }

  function resetTimer() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(onIdle, IDLE_TIMEOUT_MS);
  }

  ACTIVITY_EVENTS.forEach(evt => {
    window.addEventListener(evt, resetTimer, { passive: true });
  });

  resetTimer();
})();

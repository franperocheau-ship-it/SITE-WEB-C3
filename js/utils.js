/* ─────────────────────────────────────────────────────────────────────────────
   utils.js
   Petites fonctions partagées entre plusieurs pages.
   ───────────────────────────────────────────────────────────────────────────── */

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

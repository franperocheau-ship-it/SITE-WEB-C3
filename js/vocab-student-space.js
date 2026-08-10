/* ─────────────────────────────────────────────────────────────────────────────
   vocab-student-space.js — Sections dashboard-eleve.html du module
   Corpus lexical / Champ lexical (Phase 1) : bandeau de réactivation espacée
   (#tab-exercices) + section vocabulaire (stats + carnet de mots, dans
   #res-sub-general). Dépend de : supabase-client.js (window.lfmDb),
   js/carnet-widget.js.
   ───────────────────────────────────────────────────────────────────────────── */

const VocabStudentSpace = (() => {
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }

  /* ── Bandeau « à réviser » (haut de l'onglet Faire des exercices) ───────── */
  async function renderReactivationBanner(studentId) {
    const section = document.getElementById('vocab-reactivation-section');
    if (!section || !window.lfmDb) return;

    const { data } = await window.lfmDb
      .from('champ_lexical_sessions')
      .select('champ_id, niveau, next_review_at, champs_lexicaux(theme)')
      .eq('student_id', studentId)
      .eq('status', 'termine');

    const now = new Date();
    // Plusieurs niveaux du même champ peuvent être dus en même temps depuis
    // qu'ils sont suivis indépendamment — un lien distinct par niveau, jamais
    // regroupé, pour que champ-lexical.html?...&mode=recall sache toujours
    // lequel des 3 réviser.
    const due = (data || []).filter(s => s.next_review_at && new Date(s.next_review_at) <= now && s.champs_lexicaux);

    if (due.length === 0) { section.style.display = 'none'; return; }

    const items = due.slice(0, 3).map(s => `
      <a href="champ-lexical.html?champ=${encodeURIComponent(s.champ_id)}&niveau=${s.niveau}&mode=recall" class="cl-reactivation-btn">
        🔁 ${escapeHtml(s.champs_lexicaux.theme)} · Niveau ${s.niveau}
      </a>`).join(' ');

    section.innerHTML = `
      <div class="cl-reactivation-banner">
        <div class="cl-reactivation-icon">📖</div>
        <div class="cl-reactivation-text">
          C'est le moment de réviser tes mots !
          <div class="cl-reactivation-list">${due.length} niveau${due.length > 1 ? 'x' : ''} à réviser</div>
        </div>
        ${items}
      </div>`;
    section.style.display = '';
  }

  /* ── Section vocabulaire (stats + carnet de mots) ────────────────────────── */
  async function renderSection(studentId) {
    const section = document.getElementById('section-vocabulaire');
    if (!section || !window.lfmDb) return;

    const { data: sessions } = await window.lfmDb
      .from('champ_lexical_sessions')
      .select('status, total_points')
      .eq('student_id', studentId);

    const completed = (sessions || []).filter(s => s.status === 'termine');
    if (completed.length === 0) { section.style.display = 'none'; return; }
    section.style.display = '';

    const totalPoints = completed.reduce((sum, s) => sum + (s.total_points || 0), 0);
    document.getElementById('vocab-stat-champs').textContent = completed.length;
    document.getElementById('vocab-stat-points').textContent = totalPoints;

    await renderCarnet(studentId);
  }

  async function renderCarnet(studentId) {
    if (typeof CarnetWidget === 'undefined') return;

    await CarnetWidget.render({
      listElId: 'vocab-carnet-list',
      emptyMessage: "Aucun mot dans ton carnet pour l'instant. Depuis l'écran de correction d'un champ lexical, clique sur « ★ Carnet » à côté d'un mot trouvé.",
      rowKey: row => row.mot_id,
      fetchRows: async () => {
        const { data } = await window.lfmDb
          .from('carnet_mots')
          .select('*')
          .eq('student_id', studentId)
          .order('added_at', { ascending: false })
          .limit(2000);
        return data || [];
      },
      renderCard: row => `
        <div class="cl-carnet-card">
          <div>
            <div class="cl-carnet-card-word">${escapeHtml(row.mot)}</div>
            <div class="cl-carnet-card-meta">Ajouté ${formatDate(row.added_at)}</div>
          </div>
          <button type="button" class="cl-carnet-remove-btn" data-carnet-remove="${row.mot_id}">Retirer</button>
        </div>`,
      removeRow: async row => {
        await window.lfmDb.from('carnet_mots').delete()
          .eq('student_id', studentId).eq('mot_id', row.mot_id);
      }
    });
  }

  return { renderReactivationBanner, renderSection };
})();

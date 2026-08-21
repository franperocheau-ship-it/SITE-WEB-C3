/* ─────────────────────────────────────────────────────────────────────────────
   eoy-banner-settings.js — Pilotage du bandeau enseignant de fin d'année
   scolaire (admin_settings, clé 'bandeau_fin_annee').
   Dépend de : supabase-client.js (window.lfmDb)

   mode 'auto'       : actif si la date du jour ∈ [25/05, 15/07] de l'année
                        en cours — calculé ici, aucun cron nécessaire.
   mode 'manuel_on'  : forcé actif par l'admin.
   mode 'manuel_off' : forcé inactif par l'admin.
   Un mode manuel posé une année donnée n'est valable que jusqu'au 15/07 de
   cette même année : passé cette date (ou avant le 25/05 suivant), il est
   ignoré et retombe sur 'auto' — cycle propre chaque année sans action admin.
   ───────────────────────────────────────────────────────────────────────────── */

const lfmEoyBanner = (() => {
  const db  = window.lfmDb;
  const KEY = 'bandeau_fin_annee';

  function bounds(year) {
    return {
      start: new Date(year, 4, 25),   // 25 mai
      end:   new Date(year, 6, 15, 23, 59, 59, 999) // 15 juillet (fin de journée)
    };
  }

  function isWithinAutoWindow(now = new Date()) {
    const { start, end } = bounds(now.getFullYear());
    return now >= start && now <= end;
  }

  /* Le mode manuel n'est retenu que s'il a été posé pendant la fenêtre
     [25/05, 15/07] de l'année en cours (approximé ici via updated_at) —
     sinon on considère qu'un nouveau cycle a commencé. */
  function manualStillValid(updatedAt, now = new Date()) {
    if (!updatedAt) return false;
    const updated = new Date(updatedAt);
    const { start, end } = bounds(now.getFullYear());
    return updated >= start && updated <= end && now <= end;
  }

  async function getRow() {
    const { data, error } = await db
      .from('admin_settings')
      .select('value, updated_at')
      .eq('key', KEY)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  function fmtDate(d) {
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  /* Retourne { actif, mode, autoActivationDateStr, derniereActivationAuto }.
     autoActivationDateStr est calculé en direct (25/05 de l'année en cours) —
     toujours exact, indépendant de la dernière écriture en base. */
  async function getBandeauState() {
    const row = await getRow();
    const value = row?.value || { mode: 'auto', derniere_activation_auto: null };
    const now   = new Date();

    let mode = value.mode || 'auto';
    if ((mode === 'manuel_on' || mode === 'manuel_off') && !manualStillValid(row?.updated_at, now)) {
      mode = 'auto';
    }

    const actif = mode === 'manuel_on'  ? true
                : mode === 'manuel_off' ? false
                : isWithinAutoWindow(now);

    return {
      actif,
      mode,
      autoActivationDateStr: fmtDate(bounds(now.getFullYear()).start),
      derniereActivationAuto: value.derniere_activation_auto || null
    };
  }

  /* Écriture réservée admin (RLS). mode ∈ 'auto' | 'manuel_on' | 'manuel_off' */
  async function setBandeauMode(mode) {
    const session = await lfmAuth.getSession();
    const userId = session?.user?.id || null;

    const patch = { mode };
    if (mode === 'manuel_on' || (mode === 'auto' && isWithinAutoWindow())) {
      patch.derniere_activation_auto = new Date().toISOString().slice(0, 10);
    }

    const { data: current } = await db
      .from('admin_settings')
      .select('value')
      .eq('key', KEY)
      .maybeSingle();

    const nextValue = { ...(current?.value || {}), ...patch };

    const { error } = await db
      .from('admin_settings')
      .update({ value: nextValue, updated_at: new Date().toISOString(), updated_by: userId })
      .eq('key', KEY);
    if (error) throw error;
  }

  return { getBandeauState, setBandeauMode };
})();

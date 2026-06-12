/* ─────────────────────────────────────────────────────────────────────────────
   auth.js
   Fonctions d'authentification LFM.
   Dépend de : supabase-client.js  (window.lfmDb doit être chargé avant)
   ───────────────────────────────────────────────────────────────────────────── */

const lfmAuth = (() => {
  const db = window.lfmDb;

  /* Connexion ──────────────────────────────────────────────────────────────── */
  async function signIn(email, password) {
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  /* Inscription — enseignants uniquement ──────────────────────────────────── */
  async function signUp(email, password, displayName, role = 'enseignant') {
    const { data, error } = await db.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, role }
      }
    });
    if (error) throw error;
    return data;
  }

  /* Déconnexion ────────────────────────────────────────────────────────────── */
  async function signOut() {
    await db.auth.signOut();
    window.location.href = 'index.html';
  }

  /* Session courante ───────────────────────────────────────────────────────── */
  async function getSession() {
    const { data: { session } } = await db.auth.getSession();
    return session;
  }

  /* Profil (rôle, display_name) depuis la table profiles ──────────────────── */
  async function getProfile() {
    const session = await getSession();
    if (!session) return null;
    const { data, error } = await db
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    if (error) return null;
    return data;
  }

  /* Redirection vers le dashboard selon le rôle ───────────────────────────── */
  function redirectToDashboard(role) {
    const map = {
      enseignant: 'dashboard-enseignant.html',
      eleve:      'dashboard-eleve.html',
      admin:      'dashboard-admin.html'
    };
    window.location.href = map[role] || 'index.html';
  }

  /* Guard : redirige vers la page de connexion si non connecté / mauvais rôle */
  async function requireRole(expectedRole) {
    const session = await getSession();
    if (!session) {
      window.location.href = 'auth.html?role=' + expectedRole;
      return null;
    }
    const profile = await getProfile();
    if (!profile || profile.role !== expectedRole) {
      window.location.href = 'auth.html?role=' + expectedRole;
      return null;
    }
    if (profile.status === 'pending') {
      await signOut();
      window.location.href = 'auth.html?role=' + expectedRole + '&status=pending';
      return null;
    }
    if (profile.status === 'rejected') {
      await signOut();
      window.location.href = 'auth.html?role=' + expectedRole + '&status=rejected';
      return null;
    }
    return profile;
  }

  /* Envoie un e-mail de réinitialisation de mot de passe ──────────────────── */
  async function resetPassword(email, redirectTo) {
    const { error } = await db.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }

  /* Définit un nouveau mot de passe (après clic sur le lien de reset) ─────── */
  async function updatePassword(newPassword) {
    const { error } = await db.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }

  return { signIn, signUp, signOut, getSession, getProfile, redirectToDashboard, requireRole, resetPassword, updatePassword };
})();

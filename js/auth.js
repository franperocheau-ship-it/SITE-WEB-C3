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
    if (error) {
      console.error('[lfmAuth.signIn] Supabase error:', error.status, error.code, error.message);
      throw error;
    }
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
    if (error) {
      console.error('[lfmAuth.signUp] Supabase error:', error.status, error.code, error.message, error);
      throw error;
    }
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

  /* Fiche élève (students) de l'utilisateur connecté — porte les infos
     pédagogiques par élève (ex. est_dyslexique), absentes de profiles.
     Policy RLS "students_select_own" (auth_user_id = auth.uid()). */
  async function getMyStudentRecord() {
    const session = await getSession();
    if (!session) return null;
    const { data, error } = await db
      .from('students')
      .select('*')
      .eq('auth_user_id', session.user.id)
      .maybeSingle();
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

  /* Variante de requireRole() pour une page utilisable par plusieurs rôles
     (ex. enseignant + admin) — même logique (session → profil → statut
     pending/rejected → redirection), sauf que le test devient une
     appartenance à la liste plutôt qu'une correspondance exacte. requireRole
     reste inchangée pour ne rien risquer sur les pages qui l'utilisent déjà. */
  async function requireAnyRole(roles) {
    const primaryRole = roles[0];
    const session = await getSession();
    if (!session) {
      window.location.href = 'auth.html?role=' + primaryRole;
      return null;
    }
    const profile = await getProfile();
    if (!profile || !roles.includes(profile.role)) {
      window.location.href = 'auth.html?role=' + primaryRole;
      return null;
    }
    if (profile.status === 'pending') {
      await signOut();
      window.location.href = 'auth.html?role=' + primaryRole + '&status=pending';
      return null;
    }
    if (profile.status === 'rejected') {
      await signOut();
      window.location.href = 'auth.html?role=' + primaryRole + '&status=rejected';
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

  return { signIn, signUp, signOut, getSession, getProfile, getMyStudentRecord, redirectToDashboard, requireRole, requireAnyRole, resetPassword, updatePassword };
})();

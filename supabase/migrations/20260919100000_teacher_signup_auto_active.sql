-- ═══════════════════════════════════════════════════════════════════════════
--  Suppression de la validation admin obligatoire pour les enseignants
--  À exécuter dans Supabase Dashboard → SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Jusqu'ici, un compte enseignant démarrait en 'pending' (voir MISE À JOUR V3
-- dans supabase-schema.sql) et restait bloqué (email jamais confirmé, accès
-- refusé côté client) jusqu'à ce qu'un admin clique "Approuver" dans
-- dashboard-admin.html, ce qui appelait l'edge function approve-teacher pour
-- confirmer l'e-mail ET passer status à 'active'.
--
-- Désormais, un enseignant obtient l'accès complet dès qu'il confirme son
-- adresse e-mail via le lien natif envoyé par Supabase Auth au signUp() (voir
-- emailRedirectTo ajouté dans js/auth.js) — aucune étape de validation
-- manuelle par l'admin.
--
-- La colonne profiles.status et sa contrainte CHECK ('pending','active',
-- 'rejected') ne changent pas : 'rejected' reste disponible pour qu'un admin
-- puisse bannir un compte a posteriori (via une mise à jour SQL directe,
-- l'UI de modération correspondante ayant été retirée de dashboard-admin.html).
-- 'pending' n'est simplement plus jamais attribué automatiquement.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
BEGIN
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'eleve');
  INSERT INTO public.profiles (id, role, display_name, status)
  VALUES (
    NEW.id,
    v_role,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    'active'
  );
  RETURN NEW;
END;
$$;

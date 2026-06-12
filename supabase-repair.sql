-- ═══════════════════════════════════════════════════════════════════════════
--  LFM CYCLE 3 — Script de réparation du système d'authentification
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  Ce script est idempotent : on peut l'exécuter plusieurs fois sans risque.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── 1. Vérification préalable ────────────────────────────────────────────────
-- Affiche l'état actuel du trigger et de la table profiles.

SELECT
  'trigger' AS type,
  trigger_name AS name,
  event_manipulation AS event,
  action_timing AS timing
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created'

UNION ALL

SELECT
  'column' AS type,
  column_name AS name,
  data_type AS event,
  column_default AS timing
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'profiles'
ORDER BY type, name;


-- ─── 2. Colonne status dans profiles ─────────────────────────────────────────
-- Ajoutée si manquante (V3). Les enseignants démarrent en 'pending'.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'
  CHECK (status IN ('pending', 'active', 'rejected'));


-- ─── 3. Fonction trigger handle_new_user (version définitive) ─────────────────
-- SECURITY DEFINER → s'exécute en tant que superuser, bypasse RLS.
-- Crée automatiquement un profil à chaque nouvel utilisateur auth.users.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role        TEXT;
  v_display     TEXT;
  v_status      TEXT;
BEGIN
  v_role    := COALESCE(NEW.raw_user_meta_data->>'role', 'eleve');
  v_display := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'display_name'), ''),
    split_part(NEW.email, '@', 1)
  );
  v_status  := CASE WHEN v_role = 'enseignant' THEN 'pending' ELSE 'active' END;

  INSERT INTO public.profiles (id, role, display_name, status)
  VALUES (NEW.id, v_role, v_display, v_status)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;


-- ─── 4. Trigger on_auth_user_created ─────────────────────────────────────────
-- Recrée le trigger pour s'assurer qu'il est bien actif.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─── 5. RLS — policies manquantes ─────────────────────────────────────────────

-- Policy SELECT admin (si absente)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'profiles'
      AND policyname = 'profiles_select_admin'
  ) THEN
    EXECUTE '
      CREATE POLICY "profiles_select_admin"
        ON public.profiles FOR SELECT
        USING (public.my_role() = ''admin'')
    ';
    RAISE NOTICE 'Policy profiles_select_admin créée.';
  ELSE
    RAISE NOTICE 'Policy profiles_select_admin déjà existante.';
  END IF;
END $$;

-- Policy UPDATE admin (si absente — ajoutée en V3)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'profiles'
      AND policyname = 'profiles_update_admin'
  ) THEN
    EXECUTE '
      CREATE POLICY "profiles_update_admin"
        ON public.profiles FOR UPDATE
        USING  (public.my_role() = ''admin'')
        WITH CHECK (public.my_role() = ''admin'')
    ';
    RAISE NOTICE 'Policy profiles_update_admin créée.';
  ELSE
    RAISE NOTICE 'Policy profiles_update_admin déjà existante.';
  END IF;
END $$;


-- ─── 6. Test du trigger ────────────────────────────────────────────────────────
-- Vérifie que la fonction est correctement définie.

SELECT
  routine_name,
  security_type,
  routine_definition IS NOT NULL AS has_body
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name   = 'handle_new_user';


-- ─── 7. Affiche les politiques actives sur profiles ──────────────────────────

SELECT
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename  = 'profiles'
ORDER BY policyname;


-- ═══════════════════════════════════════════════════════════════════════════
--  DIAGNOSTIC : profils existants sans colonne status
--  (détecte les lignes corrompues avant la migration)
-- ═══════════════════════════════════════════════════════════════════════════
SELECT
  id,
  role,
  display_name,
  status,
  created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 20;

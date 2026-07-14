-- ═══════════════════════════════════════════════════════════════════════════
--  MISE À JOUR V8 — RPC D'ACCÈS ÉLÈVE AU PARCOURS GUIDÉ
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  (après la v7 dans supabase-migration-v7-mode-acces.sql)
--
--  Contexte :
--  Le mode d'accès (classes.mode_acces) et les exercices actifs
--  (class_active_exercises) existent déjà en base (v7), pilotés par
--  l'enseignant via classes-enseignant.html. Mais aucun code élève ne les
--  consulte encore : exercise.html et les pages de notions restent en accès
--  libre pour tout le monde, y compris les élèves d'une classe en mode
--  "guidé".
--
--  Point bloquant découvert en marge : la policy existante
--  "classes_select_enrolled_student" (supabase-schema.sql) autorise la
--  lecture de sa classe via public.class_memberships — une table qui n'est
--  jamais peuplée dans ce projet (les élèves vivent dans public.students,
--  voir le commentaire de la migration v2). Un élève connecté n'a donc
--  aujourd'hui AUCUN accès en lecture à sa propre ligne dans public.classes.
--
--  Plutôt que corriger cette policy (et en ajouter une nouvelle sur
--  class_active_exercises), on expose une fonction RPC SECURITY DEFINER
--  unique : l'élève appelle get_my_guided_access() et reçoit exactement
--  ce dont exercise.html / js/guided-access.js ont besoin, sans jamais
--  interroger classes ou class_active_exercises directement.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.get_my_guided_access()
RETURNS TABLE(
  mode_acces          TEXT,
  active_exercise_ids TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_class_id UUID;
  v_mode     TEXT;
BEGIN
  -- Élève non connecté ou sans compte students lié : accès libre par défaut.
  SELECT s.class_id INTO v_class_id
  FROM public.students s
  WHERE s.auth_user_id = auth.uid();

  IF v_class_id IS NULL THEN
    RETURN QUERY SELECT 'libre'::TEXT, ARRAY[]::TEXT[];
    RETURN;
  END IF;

  SELECT c.mode_acces INTO v_mode
  FROM public.classes c
  WHERE c.id = v_class_id;

  -- Classe introuvable (ne devrait pas arriver, FK) : repli sur 'libre'.
  IF v_mode IS NULL THEN
    RETURN QUERY SELECT 'libre'::TEXT, ARRAY[]::TEXT[];
    RETURN;
  END IF;

  IF v_mode = 'guide' THEN
    RETURN QUERY
      SELECT v_mode, COALESCE(array_agg(cae.exercise_id), ARRAY[]::TEXT[])
      FROM public.class_active_exercises cae
      WHERE cae.class_id = v_class_id;
  ELSE
    RETURN QUERY SELECT v_mode, ARRAY[]::TEXT[];
  END IF;
END;
$$;

-- Accessible à tout utilisateur authentifié (élève). Sans session, le client
-- ne l'appelle même pas (voir js/guided-access.js) — repli 'libre' de toute
-- façon si jamais appelée sans auth.uid().
GRANT EXECUTE ON FUNCTION public.get_my_guided_access() TO authenticated;

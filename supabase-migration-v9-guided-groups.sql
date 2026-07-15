-- ═══════════════════════════════════════════════════════════════════════════
--  MISE À JOUR V9 — PARCOURS GUIDÉ DIFFÉRENCIÉ (GROUPES DE BESOIN + ÉLÈVE)
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  (après la v8 dans supabase-migration-v8-guided-access-rpc.sql)
--
--  Contexte :
--  Le parcours guidé (v7/v8) ne connaît qu'un seul niveau de ciblage : la
--  classe entière (classes.mode_acces + class_active_exercises). Cette
--  migration ajoute deux niveaux de ciblage plus fins, avec une priorité
--  stricte à la résolution (voir get_my_guided_access() plus bas) :
--
--    1. Liste personnelle de l'élève (student_active_exercises)  — priorité 1
--    2. Liste de son groupe de besoin (group_active_exercises)   — priorité 2
--    3. Liste de la classe (class_active_exercises, v7, inchangée) — repli
--
--  Un groupe appartient à une classe (public.groups.class_id). Un élève
--  peut être rattaché à au plus un groupe de sa classe (students.group_id,
--  nullable — un élève sans groupe suit directement la liste de classe).
--
--  classes.mode_acces reste l'interrupteur maître : si la classe est en
--  'libre', les listes personnelles/de groupe restent en base mais sont
--  dormantes (get_my_guided_access() renvoie 'libre' avant même de les
--  consulter). Les repasser en 'guide' réactive tout ce qui existait déjà.
--
--  Repli basé sur l'EXISTENCE de lignes, pas sur la simple affectation :
--  un élève affecté à un groupe qui n'a encore aucun exercice actif
--  configuré retombe sur la liste de la classe (pas de liste vide
--  intentionnelle distincte d'un groupe "pas encore configuré").
--
--  Ordre de création important (corrigé après échec le 2026-07 en SQL
--  Editor : "column group_id does not exist") : students.group_id doit
--  exister AVANT toute policy qui le référence, y compris les policies de
--  la table groups elle-même. D'où l'ordre ci-dessous : groups (table nue,
--  sans policies) → students.group_id → trigger → policies groups →
--  group_active_exercises → student_active_exercises → RPC.
--
--  Script entièrement rejouable : CREATE TABLE/INDEX IF NOT EXISTS,
--  DROP POLICY IF EXISTS avant chaque CREATE POLICY, CREATE OR REPLACE
--  pour les fonctions, DROP TRIGGER IF EXISTS avant CREATE TRIGGER.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── TABLE : groups (nue, sans policies pour l'instant) ────────────────────
-- Groupes de besoin, propres à une classe. Les policies arrivent plus bas,
-- une fois students.group_id créé (elles le référencent).

CREATE TABLE IF NOT EXISTS public.groups (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id   UUID        NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  color      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (class_id, name)
);

CREATE INDEX IF NOT EXISTS idx_groups_class ON public.groups(class_id);

ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;


-- ─── students.group_id ────────────────────────────────────────────────────
-- Nullable : un élève sans groupe suit la liste de sa classe. Doit exister
-- avant toute policy (groups incluse) qui le référence.

ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS group_id UUID REFERENCES public.groups(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_students_group ON public.students(group_id);


-- ─── Trigger d'intégrité : group_id doit appartenir à la classe de l'élève ──
-- Rejette (ne corrige PAS silencieusement) toute tentative d'affecter un
-- élève à un groupe d'une autre classe, y compris si l'incohérence apparaît
-- via un changement de class_id plutôt que de group_id.

CREATE OR REPLACE FUNCTION public.check_group_class_match()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_group_class_id UUID;
BEGIN
  IF NEW.group_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT class_id INTO v_group_class_id
  FROM public.groups
  WHERE id = NEW.group_id;

  IF v_group_class_id IS NULL THEN
    RAISE EXCEPTION 'Groupe % introuvable', NEW.group_id;
  END IF;

  IF v_group_class_id IS DISTINCT FROM NEW.class_id THEN
    RAISE EXCEPTION
      'Le groupe % appartient à une autre classe que l''élève (classe élève : %, classe groupe : %)',
      NEW.group_id, NEW.class_id, v_group_class_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_check_group_class_match ON public.students;
CREATE TRIGGER trg_check_group_class_match
  BEFORE INSERT OR UPDATE OF group_id, class_id ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.check_group_class_match();


-- ─── Policies : groups ──────────────────────────────────────────────────────
-- students.group_id existe maintenant — ces policies peuvent le référencer.

DROP POLICY IF EXISTS "groups_all_own_teacher" ON public.groups;
CREATE POLICY "groups_all_own_teacher"
  ON public.groups FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ));

-- Élève affecté à ce groupe : lecture seule (pas d'usage direct côté client
-- aujourd'hui — get_my_guided_access() fait le travail — mais cohérent avec
-- le reste du schéma de ne pas laisser la table totalement fermée à l'élève).
DROP POLICY IF EXISTS "groups_select_own_student" ON public.groups;
CREATE POLICY "groups_select_own_student"
  ON public.groups FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE group_id = groups.id AND auth_user_id = auth.uid()
  ));

-- Admin : accès complet
DROP POLICY IF EXISTS "groups_all_admin" ON public.groups;
CREATE POLICY "groups_all_admin"
  ON public.groups FOR ALL
  USING (public.my_role() = 'admin');


-- ─── TABLE : group_active_exercises ────────────────────────────────────────
-- Liste des exercices activés par l'enseignant pour un groupe de besoin.

CREATE TABLE IF NOT EXISTS public.group_active_exercises (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id    UUID        NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  exercise_id TEXT        NOT NULL,
  added_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (group_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_group_active_exercises_group ON public.group_active_exercises(group_id);

ALTER TABLE public.group_active_exercises ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "group_active_exercises_select_own_teacher" ON public.group_active_exercises;
CREATE POLICY "group_active_exercises_select_own_teacher"
  ON public.group_active_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.groups g
    JOIN public.classes c ON c.id = g.class_id
    WHERE g.id = group_id AND c.teacher_id = auth.uid()
  ));

DROP POLICY IF EXISTS "group_active_exercises_insert_own_teacher" ON public.group_active_exercises;
CREATE POLICY "group_active_exercises_insert_own_teacher"
  ON public.group_active_exercises FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.groups g
    JOIN public.classes c ON c.id = g.class_id
    WHERE g.id = group_id AND c.teacher_id = auth.uid()
  ));

DROP POLICY IF EXISTS "group_active_exercises_delete_own_teacher" ON public.group_active_exercises;
CREATE POLICY "group_active_exercises_delete_own_teacher"
  ON public.group_active_exercises FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.groups g
    JOIN public.classes c ON c.id = g.class_id
    WHERE g.id = group_id AND c.teacher_id = auth.uid()
  ));

-- Élève membre de ce groupe : lecture seule
DROP POLICY IF EXISTS "group_active_exercises_select_own_student" ON public.group_active_exercises;
CREATE POLICY "group_active_exercises_select_own_student"
  ON public.group_active_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE group_id = group_active_exercises.group_id
      AND auth_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "group_active_exercises_all_admin" ON public.group_active_exercises;
CREATE POLICY "group_active_exercises_all_admin"
  ON public.group_active_exercises FOR ALL
  USING (public.my_role() = 'admin');


-- ─── TABLE : student_active_exercises ──────────────────────────────────────
-- Liste des exercices activés par l'enseignant pour un élève précis
-- (personnalisation individuelle, priorité maximale à la résolution).

CREATE TABLE IF NOT EXISTS public.student_active_exercises (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID        NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  exercise_id TEXT        NOT NULL,
  added_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_student_active_exercises_student ON public.student_active_exercises(student_id);

ALTER TABLE public.student_active_exercises ENABLE ROW LEVEL SECURITY;

-- Enseignant propriétaire de l'élève (students.teacher_id direct, pas
-- besoin de remonter par classes ici).
DROP POLICY IF EXISTS "student_active_exercises_select_own_teacher" ON public.student_active_exercises;
CREATE POLICY "student_active_exercises_select_own_teacher"
  ON public.student_active_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE id = student_id AND teacher_id = auth.uid()
  ));

DROP POLICY IF EXISTS "student_active_exercises_insert_own_teacher" ON public.student_active_exercises;
CREATE POLICY "student_active_exercises_insert_own_teacher"
  ON public.student_active_exercises FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.students
    WHERE id = student_id AND teacher_id = auth.uid()
  ));

DROP POLICY IF EXISTS "student_active_exercises_delete_own_teacher" ON public.student_active_exercises;
CREATE POLICY "student_active_exercises_delete_own_teacher"
  ON public.student_active_exercises FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE id = student_id AND teacher_id = auth.uid()
  ));

-- Élève lui-même : lecture seule
DROP POLICY IF EXISTS "student_active_exercises_select_own_student" ON public.student_active_exercises;
CREATE POLICY "student_active_exercises_select_own_student"
  ON public.student_active_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE id = student_active_exercises.student_id
      AND auth_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "student_active_exercises_all_admin" ON public.student_active_exercises;
CREATE POLICY "student_active_exercises_all_admin"
  ON public.student_active_exercises FOR ALL
  USING (public.my_role() = 'admin');


-- ─── get_my_guided_access() v9 — résolution à 3 niveaux ────────────────────
-- Même signature qu'en v8 (mode_acces, active_exercise_ids[]) : aucun
-- changement requis côté js/guided-access.js, qui reçoit déjà la liste
-- effective, pré-résolue côté serveur.

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
  v_student_id UUID;
  v_class_id   UUID;
  v_group_id   UUID;
  v_mode       TEXT;
BEGIN
  -- Élève non connecté ou sans compte students lié : accès libre par défaut.
  SELECT s.id, s.class_id, s.group_id
  INTO v_student_id, v_class_id, v_group_id
  FROM public.students s
  WHERE s.auth_user_id = auth.uid();

  IF v_student_id IS NULL THEN
    RETURN QUERY SELECT 'libre'::TEXT, ARRAY[]::TEXT[];
    RETURN;
  END IF;

  SELECT c.mode_acces INTO v_mode
  FROM public.classes c
  WHERE c.id = v_class_id;

  -- Classe introuvable (ne devrait pas arriver, FK) ou mode libre :
  -- interrupteur maître — les listes personnelles/de groupe restent
  -- dormantes tant que la classe n'est pas repassée en 'guide'.
  IF v_mode IS NULL OR v_mode <> 'guide' THEN
    RETURN QUERY SELECT COALESCE(v_mode, 'libre')::TEXT, ARRAY[]::TEXT[];
    RETURN;
  END IF;

  -- 1. Liste personnelle de l'élève (priorité maximale)
  IF EXISTS (SELECT 1 FROM public.student_active_exercises WHERE student_id = v_student_id) THEN
    RETURN QUERY
      SELECT 'guide'::TEXT, array_agg(exercise_id)
      FROM public.student_active_exercises
      WHERE student_id = v_student_id;
    RETURN;
  END IF;

  -- 2. Liste de son groupe, si affecté à un groupe qui a au moins un
  --    exercice actif configuré (sinon repli direct sur la classe).
  IF v_group_id IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.group_active_exercises WHERE group_id = v_group_id) THEN
    RETURN QUERY
      SELECT 'guide'::TEXT, array_agg(exercise_id)
      FROM public.group_active_exercises
      WHERE group_id = v_group_id;
    RETURN;
  END IF;

  -- 3. Liste de la classe (repli par défaut, comportement v7/v8 inchangé)
  RETURN QUERY
    SELECT 'guide'::TEXT, COALESCE(array_agg(exercise_id), ARRAY[]::TEXT[])
    FROM public.class_active_exercises
    WHERE class_id = v_class_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_my_guided_access() TO authenticated;

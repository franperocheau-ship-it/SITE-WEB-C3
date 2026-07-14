-- ═══════════════════════════════════════════════════════════════════════════
--  MISE À JOUR V7 — MODE D'ACCÈS AUX EXERCICES PAR CLASSE (LIBRE / GUIDÉ)
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  (après la v6 dans supabase-schema.sql)
--
--  Contexte :
--  - Table des classes  : public.classes (colonne teacher_id = propriétaire)
--  - Lien élève ↔ classe : public.students.class_id (PAS class_memberships,
--    qui existe dans le schéma mais n'est pas utilisée — voir commentaire v2).
--    Un élève connecté est repéré par public.students.auth_user_id = auth.uid().
--  - exercise_id = le "slug" utilisé comme clé dans EXERCISE_DATA
--    (exercise-data.js) et comme paramètre ?slug= de exercise.html,
--    ex. "retrouver-infinitif-verbe-conjugue". Type TEXT, pas UUID.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── classes.mode_acces ───────────────────────────────────────────────────────
-- 'libre' (défaut) : l'élève voit tout le catalogue (comportement actuel).
-- 'guide'          : l'élève ne voit que les exercices activés par l'enseignant.

ALTER TABLE public.classes
  ADD COLUMN IF NOT EXISTS mode_acces TEXT NOT NULL DEFAULT 'libre'
  CHECK (mode_acces IN ('libre', 'guide'));


-- ─── TABLE : class_active_exercises ───────────────────────────────────────────
-- Liste des exercices activés par l'enseignant pour une classe en mode 'guide'.

CREATE TABLE public.class_active_exercises (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id     UUID        NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  exercise_id  TEXT        NOT NULL,
  added_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (class_id, exercise_id)
);

CREATE INDEX idx_active_exercises_class ON public.class_active_exercises(class_id);

ALTER TABLE public.class_active_exercises ENABLE ROW LEVEL SECURITY;


-- ─── Politiques : class_active_exercises ──────────────────────────────────────
-- Aucune policy pour anon → tout accès non authentifié est bloqué par défaut.

-- Enseignant propriétaire de la classe : lecture
CREATE POLICY "active_exercises_select_own_teacher"
  ON public.class_active_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ));

-- Enseignant propriétaire de la classe : ajout d'un exercice actif
CREATE POLICY "active_exercises_insert_own_teacher"
  ON public.class_active_exercises FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ));

-- Enseignant propriétaire de la classe : retrait d'un exercice actif
CREATE POLICY "active_exercises_delete_own_teacher"
  ON public.class_active_exercises FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ));

-- Élève membre de la classe (via public.students) : lecture seule
CREATE POLICY "active_exercises_select_own_student"
  ON public.class_active_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE class_id = class_active_exercises.class_id
      AND auth_user_id = auth.uid()
  ));

-- Admin : accès complet, cohérent avec les autres tables du schéma
CREATE POLICY "active_exercises_all_admin"
  ON public.class_active_exercises FOR ALL
  USING (public.my_role() = 'admin');

-- Note : la policy existante "classes_all_own_teacher" (FOR ALL) sur
-- public.classes couvre déjà SELECT/INSERT/UPDATE/DELETE pour le propriétaire,
-- y compris la mise à jour de mode_acces — aucune nouvelle policy nécessaire
-- sur public.classes pour ce champ.

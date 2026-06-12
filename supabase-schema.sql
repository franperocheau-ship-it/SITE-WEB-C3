-- ═══════════════════════════════════════════════════════════════════════════
--  LFM CYCLE 3 — Schéma Supabase
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  Compatible PostgreSQL 15+ (Supabase)
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── TABLE : profiles ────────────────────────────────────────────────────────
-- Étend auth.users : une ligne par utilisateur authentifié.
-- Créée automatiquement via le trigger ci-dessous.

CREATE TABLE public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role          TEXT        NOT NULL CHECK (role IN ('eleve', 'enseignant', 'admin')),
  display_name  TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── TRIGGER : création automatique du profil à l'inscription ────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role',         'eleve'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─── TABLE : classes ──────────────────────────────────────────────────────────

CREATE TABLE public.classes (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  level        TEXT        NOT NULL CHECK (level IN ('CM1', 'CM2', '6e')),
  teacher_id   UUID        NOT NULL REFERENCES public.profiles(id),
  school_year  TEXT        NOT NULL,   -- ex. "2025-2026"
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── TABLE : class_memberships ────────────────────────────────────────────────

CREATE TABLE public.class_memberships (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID        NOT NULL REFERENCES public.classes(id)  ON DELETE CASCADE,
  student_id  UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (class_id, student_id)
);


-- ─── TABLE : exercise_results ─────────────────────────────────────────────────
-- Immutable : un enregistrement par session d'exercice terminée.

CREATE TABLE public.exercise_results (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id     UUID         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_slug  TEXT         NOT NULL,
  subject        TEXT         NOT NULL CHECK (subject IN ('français', 'mathématiques')),
  category       TEXT         NOT NULL,
  exercise_type  TEXT,
  level          TEXT,
  score          INTEGER      NOT NULL CHECK (score >= 0),
  total          INTEGER      NOT NULL CHECK (total > 0),
  pct            NUMERIC(5,2) GENERATED ALWAYS AS
                   (ROUND((score::NUMERIC / total) * 100, 2)) STORED,
  duration_secs  INTEGER,
  completed_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_results_student   ON public.exercise_results(student_id);
CREATE INDEX idx_results_slug      ON public.exercise_results(exercise_slug);
CREATE INDEX idx_results_completed ON public.exercise_results(completed_at DESC);
CREATE INDEX idx_members_student   ON public.class_memberships(student_id);
CREATE INDEX idx_members_class     ON public.class_memberships(class_id);


-- ═══════════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_results  ENABLE ROW LEVEL SECURITY;


-- ─── Fonctions helper ─────────────────────────────────────────────────────────

-- Retourne le rôle de l'utilisateur connecté
CREATE OR REPLACE FUNCTION public.my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Vérifie si l'utilisateur connecté est l'enseignant d'un élève donné
CREATE OR REPLACE FUNCTION public.is_my_student(p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.class_memberships cm
    JOIN public.classes c ON c.id = cm.class_id
    WHERE cm.student_id = p_student_id
      AND c.teacher_id  = auth.uid()
  );
$$;


-- ─── Politiques : profiles ────────────────────────────────────────────────────

CREATE POLICY "profiles_select_own_or_staff"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.my_role() IN ('enseignant', 'admin'));

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());


-- ─── Politiques : classes ─────────────────────────────────────────────────────

CREATE POLICY "classes_all_own_teacher"
  ON public.classes FOR ALL
  USING (teacher_id = auth.uid())
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "classes_select_enrolled_student"
  ON public.classes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.class_memberships
    WHERE class_id = id AND student_id = auth.uid()
  ));

CREATE POLICY "classes_all_admin"
  ON public.classes FOR ALL
  USING (public.my_role() = 'admin');


-- ─── Politiques : class_memberships ──────────────────────────────────────────

CREATE POLICY "memberships_all_own_teacher"
  ON public.class_memberships FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ));

CREATE POLICY "memberships_select_own_student"
  ON public.class_memberships FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "memberships_all_admin"
  ON public.class_memberships FOR ALL
  USING (public.my_role() = 'admin');


-- ─── Politiques : exercise_results ───────────────────────────────────────────

CREATE POLICY "results_insert_own"
  ON public.exercise_results FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "results_select_own"
  ON public.exercise_results FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "results_select_teacher"
  ON public.exercise_results FOR SELECT
  USING (public.is_my_student(student_id));

CREATE POLICY "results_all_admin"
  ON public.exercise_results FOR ALL
  USING (public.my_role() = 'admin');

-- UPDATE / DELETE : aucune policy → bloqué par défaut (audit immutable)


-- ═══════════════════════════════════════════════════════════════════════════
--  COMPTE SUPERADMIN
--  À exécuter APRÈS avoir créé manuellement le compte via :
--  Supabase Dashboard → Authentication → Users → Invite user
--  Puis remplacez l'email ci-dessous par le vrai email de l'admin.
-- ═══════════════════════════════════════════════════════════════════════════

-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@lfmadrid.org');


-- ═══════════════════════════════════════════════════════════════════════════
--  TABLE : students
--  Élèves créés et gérés directement par l'enseignant.
--  Non lié à auth.users pour l'instant (connexion élève à brancher plus tard).
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE public.students (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id    UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id      UUID        REFERENCES public.classes(id)  ON DELETE SET NULL,
  display_name  TEXT        NOT NULL,
  username      TEXT        NOT NULL UNIQUE,
  password      TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_teacher ON public.students(teacher_id);
CREATE INDEX idx_students_class   ON public.students(class_id);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- L'enseignant gère uniquement ses propres élèves
CREATE POLICY "students_all_own_teacher"
  ON public.students FOR ALL
  USING  (teacher_id = auth.uid())
  WITH CHECK (teacher_id = auth.uid());

-- L'admin voit tout
CREATE POLICY "students_all_admin"
  ON public.students FOR ALL
  USING (public.my_role() = 'admin');


-- ═══════════════════════════════════════════════════════════════════════════
--  MISE À JOUR V3 — APPROBATION DES ENSEIGNANTS PAR L'ADMIN
--  À exécuter dans Supabase Dashboard → SQL Editor après la v2 ci-dessus.
-- ═══════════════════════════════════════════════════════════════════════════

-- Colonne status : les nouveaux enseignants démarrent en 'pending'
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'
  CHECK (status IN ('pending', 'active', 'rejected'));

-- Mise à jour du trigger : les enseignants démarrent en 'pending'
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
    CASE WHEN v_role = 'enseignant' THEN 'pending' ELSE 'active' END
  );
  RETURN NEW;
END;
$$;

-- L'admin peut mettre à jour le status de n'importe quel profil
CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE
  USING  (public.my_role() = 'admin')
  WITH CHECK (public.my_role() = 'admin');


-- ═══════════════════════════════════════════════════════════════════════════
--  MISE À JOUR V2 — LIAISON ÉLÈVES ↔ AUTH.USERS
--  À exécuter dans Supabase SQL Editor après la v1 ci-dessus.
-- ═══════════════════════════════════════════════════════════════════════════

-- Colonne de liaison : un élève dans students peut avoir un compte auth.users
ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_students_auth_user ON public.students(auth_user_id);

-- Un élève connecté peut lire sa propre fiche
CREATE POLICY "students_select_own"
  ON public.students FOR SELECT
  USING (auth_user_id = auth.uid());

-- Correction de is_my_student() : utilise la table students au lieu de class_memberships
-- (class_memberships n'est pas utilisée dans ce projet — les élèves sont dans students)
CREATE OR REPLACE FUNCTION public.is_my_student(p_student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.students
    WHERE auth_user_id = p_student_id
      AND teacher_id   = auth.uid()
  );
$$;

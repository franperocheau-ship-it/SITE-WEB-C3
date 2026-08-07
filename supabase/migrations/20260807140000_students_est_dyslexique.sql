-- ═══════════════════════════════════════════════════════════════════════════
-- Colonne est_dyslexique — statut accessibilité porté par l'élève
-- (students, cf. supabase-schema.sql ligne ~276 : c'est cette table, et non
-- profiles, qui porte les infos pédagogiques par élève dans ce projet).
--
-- Aucune policy RLS supplémentaire n'est nécessaire :
--   - "students_all_own_teacher" (FOR ALL) couvre déjà l'UPDATE par
--     l'enseignant propriétaire (teacher_id = auth.uid()).
--   - "students_select_own" (FOR SELECT) couvre déjà la lecture par l'élève
--     concerné (auth_user_id = auth.uid()), utilisée pour afficher ou non le
--     bouton de lecture audio côté élève.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS est_dyslexique BOOLEAN NOT NULL DEFAULT false;

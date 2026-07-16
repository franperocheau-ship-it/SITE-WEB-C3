-- ═══════════════════════════════════════════════════════════════════════════
--  MISE À JOUR V10 — PILOTAGE DU DÉVERROUILLAGE DES NIVEAUX PAR COMPÉTENCE
--  À exécuter dans : Supabase Dashboard → SQL Editor → New query
--  (après la v9 dans supabase-migration-v9-guided-groups.sql)
--
--  Contexte :
--  Le "Parcours guidé" existant (v7/v8/v9 : classes.mode_acces,
--  class_active_exercises, group_active_exercises, student_active_exercises,
--  get_my_guided_access()) contrôle la VISIBILITÉ du catalogue : quels
--  exercices apparaissent pour une classe/un groupe/un élève. Ça n'a aucun
--  rapport avec cette migration.
--
--  Cette migration porte sur un axe totalement différent et jusqu'ici
--  inexistant en base : à l'intérieur d'un exercice qui a plusieurs niveaux
--  (js/level-select.js, ex. CM1 → CM2 → 6e), les niveaux sont-ils à
--  débloquer un par un (80 % de réussite au niveau précédent requis) ou
--  tous accessibles d'emblée ? Aujourd'hui ce comportement est câblé en dur
--  et purement client (sessionStorage, aucun appel Supabase) dans
--  js/level-select.js — cette migration lui donne un réglage par classe et
--  par exercice, piloté par l'enseignant.
--
--  Nommage : la colonne s'appelle "niveau_mode" (valeurs 'progressif' /
--  'ouvert'), volontairement distinct de "mode_acces" (valeurs 'libre' /
--  'guide') pour qu'on ne confonde jamais les deux réglages en base ni dans
--  l'UI. Côté enseignant : "Niveaux progressifs" / "Niveaux ouverts" —
--  jamais "libre/guidé" pour ce réglage-ci.
--
--  Clé : (class_id, exercise_id) — exercise_id est le slug utilisé comme clé
--  dans EXERCISE_DATA (exercise-data.js) et dans class_active_exercises /
--  group_active_exercises / student_active_exercises. Pas de clé sur le
--  libellé texte "competence" (exercise-data.js), qui n'est pas garanti
--  unique et n'est pas la convention du reste du schéma.
--
--  Convention (pas de seed) : absence de ligne pour (class_id, exercise_id)
--  = 'progressif', le comportement actuel de js/level-select.js. On n'insère
--  une ligne que lorsque l'enseignant bascule explicitement un exercice en
--  "Niveaux ouverts" (ou revient en arrière) — aucune rupture pour les
--  classes existantes, aucun script de seed nécessaire.
--
--  RPC dédiée plutôt qu'extension de get_my_guided_access() : les deux
--  réglages sont orthogonaux (un exercice peut très bien être actif au
--  catalogue ET en niveaux ouverts, ou l'inverse) et n'ont pas les mêmes
--  appelants — js/guided-access.js (pages de notions + exercise.html,
--  besoin de TOUS les exercise_id actifs de la classe) vs. js/level-select.js
--  (n'importe quelle page d'exercice autonome, besoin du réglage d'UN SEUL
--  exercice — le sien). Faire porter les deux à get_my_guided_access()
--  forcerait tous ses appelants à recevoir une charge utile qui ne les
--  concerne pas. get_my_niveau_mode(exercise_id) est paramétrée par exercice
--  : une classe entière peut avoir des dizaines de réglages, mais une page
--  d'exercice n'a besoin que du sien — une seule ligne, une seule requête,
--  cohérent avec la contrainte "une requête par page" de js/level-select.js.
--
--  Script entièrement rejouable : CREATE TABLE/INDEX IF NOT EXISTS,
--  DROP POLICY IF EXISTS avant chaque CREATE POLICY, CREATE OR REPLACE pour
--  la fonction.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── TABLE : competence_settings ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.competence_settings (
  class_id    UUID        NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  exercise_id TEXT        NOT NULL,
  niveau_mode TEXT        NOT NULL DEFAULT 'progressif'
                           CHECK (niveau_mode IN ('progressif', 'ouvert')),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (class_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_competence_settings_class ON public.competence_settings(class_id);

ALTER TABLE public.competence_settings ENABLE ROW LEVEL SECURITY;


-- ─── Policies : competence_settings ─────────────────────────────────────────

-- Enseignant propriétaire de la classe : tous droits.
DROP POLICY IF EXISTS "competence_settings_all_own_teacher" ON public.competence_settings;
CREATE POLICY "competence_settings_all_own_teacher"
  ON public.competence_settings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.classes
    WHERE id = class_id AND teacher_id = auth.uid()
  ));

-- Élève membre de la classe (via public.students, pas class_memberships —
-- voir le commentaire de la v8 sur cette table jamais peuplée) : lecture
-- seule. Pas d'usage direct côté client aujourd'hui (get_my_niveau_mode()
-- fait le travail en SECURITY DEFINER), mais cohérent avec le reste du
-- schéma de ne pas laisser la table totalement fermée à l'élève.
DROP POLICY IF EXISTS "competence_settings_select_own_student" ON public.competence_settings;
CREATE POLICY "competence_settings_select_own_student"
  ON public.competence_settings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students
    WHERE class_id = competence_settings.class_id AND auth_user_id = auth.uid()
  ));

-- Admin : accès complet.
DROP POLICY IF EXISTS "competence_settings_all_admin" ON public.competence_settings;
CREATE POLICY "competence_settings_all_admin"
  ON public.competence_settings FOR ALL
  USING (public.my_role() = 'admin');


-- ─── get_my_niveau_mode(p_exercise_id) ──────────────────────────────────────
-- Appelée par js/level-select.js (à écrire au lot C front) : une requête par
-- page d'exercice, paramétrée par le slug de l'exercice courant. Élève non
-- connecté, sans compte students lié, ou réglage absent : repli 'progressif'
-- (comportement actuel, jamais de rupture ni d'erreur bloquante).

CREATE OR REPLACE FUNCTION public.get_my_niveau_mode(p_exercise_id TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_class_id UUID;
  v_mode     TEXT;
BEGIN
  SELECT s.class_id INTO v_class_id
  FROM public.students s
  WHERE s.auth_user_id = auth.uid();

  IF v_class_id IS NULL THEN
    RETURN 'progressif';
  END IF;

  SELECT cs.niveau_mode INTO v_mode
  FROM public.competence_settings cs
  WHERE cs.class_id = v_class_id AND cs.exercise_id = p_exercise_id;

  RETURN COALESCE(v_mode, 'progressif');
END;
$$;

-- authenticated : élève connecté, même convention que js/guided-access.js
-- (le futur wrapper JS vérifie la session avant d'appeler la RPC).
--
-- anon EN PLUS (différence volontaire avec get_my_guided_access(), qui ne
-- grant pas anon) : ce site a un vrai usage visiteur non connecté sur les
-- pages d'exercice autonomes (mode démo, voir visiteur.html et le docstring
-- de guided-access.js). Sans ce GRANT, un appel anon échouerait avec une
-- erreur de permission AVANT même d'exécuter le corps de la fonction — le
-- repli interne COALESCE(v_mode, 'progressif') ne joue son rôle qu'une fois
-- l'exécution autorisée. Avec ce GRANT, auth.uid() est toujours NULL pour
-- le rôle anon, donc v_class_id reste NULL et la fonction ne peut renvoyer
-- que 'progressif' : aucune fuite de données possible, juste une réponse
-- propre au lieu d'une exception réseau si un futur appel oubliait la garde
-- de session côté client.
GRANT EXECUTE ON FUNCTION public.get_my_niveau_mode(TEXT) TO authenticated, anon;

-- ═══════════════════════════════════════════════════════════════════════════
-- exercise_item_results — suivi granulaire par question (item_id)
--
-- Jusqu'ici exercise_results ne porte qu'un score global par tentative
-- (élève/exercice/niveau). Cette table ajoute une ligne par item répondu
-- (score/total connus dès la fin de la tentative), pour permettre : la fiche
-- élève enseignant ("Questions les plus ratées", fenêtre glissante 5
-- dernières tentatives), le bilan de classe enseignant (taux de réussite
-- cumulé par exercice/niveau, seuil 3), et une vue admin agrégée/anonyme
-- (RPC admin_worst_items(), seuil 20) — voir migrations suivantes.
--
-- attempt_id : lien LOGIQUE vers exercise_results, pas une foreign key.
-- L'id est généré côté client au début de la tentative et réutilisé pour
-- l'insert de exercise_results.id (qui accepte une valeur explicite au lieu
-- du défaut gen_random_uuid()) ET pour toutes les lignes de cette table —
-- les deux inserts restent indépendants (pas de dépendance d'ordre, pas
-- d'échec en cascade si l'un des deux inserts échoue).
--
-- student_id référence profiles(id) plutôt que auth.users(id) directement :
-- même convention que exercise_results / dictee_results / dictee_gram_results
-- (profiles.id référence déjà auth.users(id) en 1:1, cf. supabase-schema.sql).
-- id en uuid/gen_random_uuid() plutôt que bigint identity : même convention
-- que toutes les tables de résultats existantes du projet.
-- ═══════════════════════════════════════════════════════════════════════════

create table exercise_item_results (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references profiles(id) on delete cascade,
  attempt_id    uuid not null,
  exercise_slug text not null,
  level         int not null,
  item_id       text not null,
  is_correct    boolean not null,
  created_at    timestamptz not null default now()
);

-- Agrégats par item (bilan de classe enseignant, vue admin) : filtrage sur
-- (exercise_slug, level, item_id) puis comptage/moyenne sur toutes les lignes.
create index idx_exercise_item_results_lookup
  on exercise_item_results (exercise_slug, level, item_id);

-- Fiche élève enseignant : dernières lignes d'un élève pour un item donné,
-- triées par date décroissante (LIMIT 5 côté requête).
create index idx_exercise_item_results_student
  on exercise_item_results (student_id, exercise_slug, item_id, created_at desc);

alter table exercise_item_results enable row level security;

-- ── Politiques : même patron que exercise_results ──────────────────────────
-- Pas de policy admin ici : l'admin ne doit jamais lire ces lignes de façon
-- nominative (student_id), seulement via la fonction agrégée et anonymisée
-- admin_worst_items() (SECURITY DEFINER, contourne RLS) ajoutée plus tard.

create policy exercise_item_results_insert_own on exercise_item_results
  for insert with check (student_id = auth.uid());

create policy exercise_item_results_select_own on exercise_item_results
  for select using (student_id = auth.uid());

create policy exercise_item_results_select_teacher on exercise_item_results
  for select using (public.is_my_student(student_id));

-- UPDATE / DELETE : aucune policy → bloqué par défaut (journal immuable,
-- même patron que exercise_results).

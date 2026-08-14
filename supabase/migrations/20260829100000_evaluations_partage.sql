-- ═══════════════════════════════════════════════════════════════════════════
-- Module Évaluations — bibliothèque communautaire (B1 : schéma + B2 :
-- modération admin, préparation de B3 : écran bibliothèque enseignant,
-- pas encore construit dans cette migration).
--
-- partage / statut_validation suivent le même patron pivot que champs_
-- lexicaux / questionnaires (20260818100000_validation_admin_publication) :
-- en_attente -> auteur + admin, validee -> visible de tous (voir policy
-- evaluations_select ci-dessous), rejetee -> jamais visible hors auteur/admin.
-- ═══════════════════════════════════════════════════════════════════════════

alter table evaluations add column partage boolean;
-- Rétrocompatibilité : les évaluations déjà créées n'ont jamais donné leur
-- accord au partage — on ne les rend PAS rétroactivement partageables/en
-- attente de modération (sans quoi cette migration ferait apparaître d'un
-- coup, dans la file de modération, tout l'historique existant). Seules les
-- évaluations créées à partir de maintenant ont partage=true par défaut
-- (opt-out, pas opt-in, comme demandé pour les nouvelles évaluations).
update evaluations set partage = false;
alter table evaluations alter column partage set default true;
alter table evaluations alter column partage set not null;

alter table evaluations add column statut_validation text not null default 'en_attente'
  check (statut_validation in ('en_attente', 'validee', 'rejetee'));
alter table evaluations add column motif_refus text;

-- Opt-in explicite, indépendant de partage : une évaluation peut être
-- partagée sans attribution nominative (défaut = anonyme).
alter table evaluations add column afficher_auteur boolean not null default false;

-- Tag domaine/sous-domaine — nul pour une évaluation privée, requis (côté
-- application, voir evaluations-enseignant.html) quand partage=true, pour
-- permettre à la future bibliothèque (B3) de regrouper par domaine puis
-- sous-domaine. Sourcé depuis les couples domaine/sous_domaine de
-- banque_items (même liste que le sélecteur du mode assisté) plutôt que du
-- texte libre, pour un regroupement fiable — pas de contrainte FK ici
-- (banque_items n'a pas ces colonnes en clé unique), simple cohérence
-- applicative comme le reste du module.
alter table evaluations add column domaine text;
alter table evaluations add column sous_domaine text;

-- ── RLS — remplace la policy for-all unique par 4 policies (même patron que
-- champs_lexicaux_update_own_or_admin / delete_own_or_admin) : garde à
-- l'identique les droits actuels du propriétaire, ajoute l'admin
-- (modération) et la lecture publique des évaluations partagées+validées
-- (prépare B3 — inerte tant qu'aucun écran ne s'appuie dessus). ──
drop policy evaluations_all_own_teacher on evaluations;

create policy evaluations_select on evaluations
  for select using (
    teacher_id = auth.uid()
    or my_role() = 'admin'
    or (partage = true and statut_validation = 'validee')
  );

create policy evaluations_insert_own on evaluations
  for insert with check (teacher_id = auth.uid());

create policy evaluations_update_own_or_admin on evaluations
  for update
  using (teacher_id = auth.uid() or (my_role() = 'admin' and statut_validation in ('en_attente', 'validee')))
  with check (teacher_id = auth.uid() or my_role() = 'admin');

create policy evaluations_delete_own_or_admin on evaluations
  for delete
  using (teacher_id = auth.uid() or (my_role() = 'admin' and statut_validation in ('en_attente', 'validee')));

-- ── Likes — schéma seul dans cette session, aucune UI avant B3. Table
-- séparée (pas juste un compteur likes_count sur evaluations) pour empêcher
-- les likes multiples par le même enseignant et permettre de retirer un
-- like, comme demandé. ──
create table evaluation_likes (
  id            uuid primary key default gen_random_uuid(),
  evaluation_id uuid not null references evaluations(id) on delete cascade,
  teacher_id    uuid not null references profiles(id) on delete cascade,
  created_at    timestamptz not null default now(),
  unique (evaluation_id, teacher_id)
);

create index evaluation_likes_evaluation_idx on evaluation_likes (evaluation_id);

alter table evaluation_likes enable row level security;

create policy evaluation_likes_select on evaluation_likes
  for select using (auth.uid() is not null);

create policy evaluation_likes_insert_own on evaluation_likes
  for insert with check (teacher_id = auth.uid());

create policy evaluation_likes_delete_own on evaluation_likes
  for delete using (teacher_id = auth.uid());

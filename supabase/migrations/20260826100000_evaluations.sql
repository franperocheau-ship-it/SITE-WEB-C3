-- ═══════════════════════════════════════════════════════════════════════════
-- Module Évaluations (MVP) — évaluation papier composée à la main par
-- l'enseignant : critères de réussite (grille vide, cochée à la main sur
-- l'impression) + exercices (consigne + contenu), export PDF via
-- js/evaluations-print.js (mécanique window.print(), pas de banque d'items ni
-- de pioche automatique à ce stade). Un seul propriétaire (teacher_id) : pas
-- de partage entre enseignants ni de visibilité élève, contrairement aux
-- dictées/questionnaires — patron RLS le plus proche est donc classes
-- (classes_all_own_teacher), pas dictees (qui ajoute une policy élève).
-- ═══════════════════════════════════════════════════════════════════════════

create table evaluations (
  id          uuid primary key default gen_random_uuid(),
  teacher_id  uuid not null references profiles(id) on delete cascade,
  classe      text not null,
  titre       text not null,
  criteres    jsonb not null default '[]'::jsonb,   -- tableau ordonné de chaînes
  -- Tableau ordonné d'exercices, structure libre (jsonb, pas de migration
  -- nécessaire pour en changer la forme). Champs communs : {type, consigne}.
  -- type absent = 'marquage' implicite (rétrocompatibilité MVP, voir
  -- js/evaluations-print.js exerciceBlockHtml). Champs propres à chaque
  -- type (voir js/evaluations-enseignant.html buildExercicePayload) :
  --   marquage       : contenu
  --   reecriture     : phrases[], banqueMots
  --   classement     : utiliserTableauConjugaison, categories[]|temps[], banqueMots
  --   relier         : colonneGauche[], colonneDroite[]
  --   qcm            : question, propositions[]
  --   reponse_courte : question, nombreDeLignes
  --   vrai_faux      : affirmations[]
  exercices   jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz default now()
);

create index evaluations_teacher_idx on evaluations (teacher_id);

alter table evaluations enable row level security;

create policy evaluations_all_own_teacher
  on evaluations for all
  using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid());

-- ── updated_at automatique (même patron que questionnaires_set_updated_at /
--    cl_set_updated_at) ────────────────────────────────────────────────────
create or replace function evaluations_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger evaluations_touch_updated_at
  before update on evaluations
  for each row execute function evaluations_set_updated_at();

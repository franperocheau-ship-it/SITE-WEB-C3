-- ═══════════════════════════════════════════════════════════════════════════
-- Module Évaluations — niveau explicite (remplace la détection par regex sur
-- le champ libre "classe", voir ancien detecterNiveaux() dans
-- evaluations-enseignant.html, commit 88a3025). L'enseignant choisit
-- désormais CM1/CM2/6e/Autre à la création — une seule valeur par
-- évaluation (contrairement à l'ancien affichage qui pouvait cumuler
-- plusieurs badges déduits du texte).
-- ═══════════════════════════════════════════════════════════════════════════

alter table evaluations add column niveau text
  check (niveau in ('CM1', 'CM2', '6e', 'autre'));
alter table evaluations add column niveau_autre text;

-- ── Backfill ponctuel des évaluations existantes ────────────────────────
-- Même heuristique que l'ancien detecterNiveaux() (regex sur "classe"),
-- exécutée une seule fois ici et jamais reproduite côté application. On ne
-- préremplit que les lignes où un seul niveau est détecté sans ambiguïté :
-- une classe qui n'en mentionne aucun, ou qui en mentionne plusieurs,
-- garde niveau = null (pas de pastille) plutôt qu'une valeur devinée à
-- tort — même principe de repli non bloquant que l'ancien code JS.
update evaluations
set niveau = case
  when (classe ~* '\yCM1\y')::int + (classe ~* '\yCM2\y')::int + (classe ~* '\y6\s*e(me)?\y')::int = 1
    then case
      when classe ~* '\yCM1\y' then 'CM1'
      when classe ~* '\yCM2\y' then 'CM2'
      when classe ~* '\y6\s*e(me)?\y' then '6e'
    end
  else null
end
where niveau is null;

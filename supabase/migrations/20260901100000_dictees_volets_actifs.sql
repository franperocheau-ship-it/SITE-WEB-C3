-- ═══════════════════════════════════════════════════════════════════════════
-- Module Dictées préparées — l'enseignant choisit, pour chaque dictée, quel(s)
-- volet(s) proposer à l'élève : orthographe lexicale (Photographie/Effacement
-- progressif/Dictée audio) et/ou orthographe grammaticale (Classification/
-- Texte à trous/Transformation). Les deux valent true par défaut, ce qui
-- reproduit exactement le comportement actuel pour toutes les dictées
-- existantes (rien ne change tant que l'enseignant ne décoche rien).
-- ═══════════════════════════════════════════════════════════════════════════

alter table dictees
  add column inclut_lexicale boolean not null default true,
  add column inclut_grammaticale boolean not null default true;

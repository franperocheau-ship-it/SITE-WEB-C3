-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical (Phase 2, ajustement)
--
-- Phase 1 routait champ-lexical.html?champ=<slug> avec une contrainte unique
-- globale sur le slug. Une fois plusieurs enseignants capables de créer des
-- champs (Phase 2), deux personnes choisissant "la peur" entreraient en
-- collision. Le module questionnaires (seul précédent auteur/partage du
-- site) n'a d'ailleurs aucune colonne slug : il route uniquement par id.
-- On aligne ce module sur ce précédent : la colonne slug reste (cosmétique,
-- utile pour une recherche future) mais n'est plus unique ni utilisée pour
-- le routage — voir vocabulaire-corpus.html / js/champ-lexical-engine.js /
-- js/vocab-student-space.js, qui routent désormais par id.
-- ═══════════════════════════════════════════════════════════════════════════

alter table corpus_lexicaux drop constraint corpus_lexicaux_slug_key;
alter table champs_lexicaux drop constraint champs_lexicaux_slug_key;

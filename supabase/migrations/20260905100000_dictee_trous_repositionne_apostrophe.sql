-- ═══════════════════════════════════════════════════════════════════════════
-- Correctif ponctuel : repositionnement des trous existants suite à
-- l'isolement de la ponctuation (dont l'apostrophe d'élision) du découpage
-- des phrases à trous (tokenizeTrouPhrase, dupliquée dans
-- dictees-enseignant.html, js/dictees-engine.js et js/dictee-grammar-print.js).
-- `dictee_trous_mots.position` numérote désormais uniquement les tokens-mots
-- (lettres), plus les tokens espace/ponctuation du découpage précédent
-- (phrase.split(/\s+/)) — une élision comme "d'une" comptait pour 1 token,
-- elle en compte désormais 2 ("d" + "une"), décalant de +1 tous les trous
-- placés après elle dans la même phrase.
--
-- Une seule phrase en base contient une élision à ce jour (vérifié
-- manuellement, id ci-dessous) : les 7 trous placés après "d'une" sont
-- décalés de +1. Le dernier trou de cette phrase avait aussi été créé avant
-- l'introduction de tokenizeTrouPhrase et portait encore la ponctuation
-- collée ("professeur.") — corrigé au passage.
--
-- CASE dans un seul UPDATE (et non plusieurs UPDATE séquentiels) : évalué
-- sur l'état de la ligne avant l'instruction, donc aucun risque qu'un trou
-- déjà déplacé soit ré-apparié par une clause WHERE position = ... suivante.
-- ═══════════════════════════════════════════════════════════════════════════

update dictee_trous_mots
set
  position = case position
    when 8  then 9
    when 10 then 11
    when 12 then 13
    when 13 then 14
    when 17 then 18
    when 20 then 21
    when 26 then 27
    else position
  end,
  mot_attendu = case when position = 26 then 'professeur' else mot_attendu end
where trou_id = '41f98f5d-7433-4924-aa10-1ee52d81f631';

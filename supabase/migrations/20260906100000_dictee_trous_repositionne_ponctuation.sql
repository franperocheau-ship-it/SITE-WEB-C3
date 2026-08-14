-- ═══════════════════════════════════════════════════════════════════════════
-- Correctif ponctuel (2/2) : repositionnement des trous existants suite à
-- l'isolement de la ponctuation (dont l'apostrophe d'élision) du découpage
-- des phrases à trous (tokenizeTrouPhrase, dupliquée dans
-- dictees-enseignant.html, js/dictees-engine.js et js/dictee-grammar-print.js).
--
-- La migration 20260905100000 ciblait la dictée de test par son id, mais
-- celle-ci avait entre-temps été recréée (nouvel id) pendant les tests en
-- direct — elle n'a donc rien corrigé (0 ligne trouvée). Recalculée ici sur
-- l'état réellement en base à ce jour, sur les 3 dictées de test existantes,
-- ciblée par id de ligne dictee_trous_mots (immunisé contre un réordonnancement).
--
-- Cas particulier : un trou avait été posé sur le bloc entier "l'alphabétisation."
-- (article élidé + mot + point) sous l'ancien découpage — réassigné au seul
-- mot "alphabétisation" (le "l'" écarté), qui correspond à l'intention
-- pédagogique la plus probable et à ce que produirait désormais un clic sur
-- ce mot dans l'interface enseignant.
-- ═══════════════════════════════════════════════════════════════════════════

update dictee_trous_mots set position = case id
    when '7d90c6d4-aeeb-4f08-883e-ad7e0d2f5cc7' then 1
    when 'a1ea9d0f-88b3-4819-a3d1-4c10c4c23c7f' then 3
    when 'd54059f7-5b11-461f-a099-f59b2dc4cb87' then 6
    when '1a4f1e26-8635-4c9b-9d4e-801b7d7b8964' then 9
    when 'd7ea0223-ecb1-4f17-86b6-455955d30273' then 17
    when 'fbebae0d-8f22-4fca-8bca-5c9cb95d40ad' then 31
    else position end,
  mot_attendu = case id
    when '7d90c6d4-aeeb-4f08-883e-ad7e0d2f5cc7' then 'septembre'
    when 'a1ea9d0f-88b3-4819-a3d1-4c10c4c23c7f' then 'célèbre'
    when 'd54059f7-5b11-461f-a099-f59b2dc4cb87' then 'internationale'
    when '1a4f1e26-8635-4c9b-9d4e-801b7d7b8964' then 'alphabétisation'
    when 'd7ea0223-ecb1-4f17-86b6-455955d30273' then 'restent'
    when 'fbebae0d-8f22-4fca-8bca-5c9cb95d40ad' then 'inaccessibles'
    else mot_attendu end
where trou_id = '7c944050-c5c1-4a92-b06f-b34a2f198ae8';

update dictee_trous_mots set position = case id
    when '834f13ce-8e99-42d2-8d9d-adab51d7cd41' then 5
    else position end,
  mot_attendu = case id
    when '834f13ce-8e99-42d2-8d9d-adab51d7cd41' then 'ambitieux'
    else mot_attendu end
where trou_id = 'bd179434-42eb-471a-95ba-72ae0521b1d8';

update dictee_trous_mots set position = case id
    when '099b365d-c990-46c4-b451-79a6d222e502' then 9
    when '67f0dac5-2a90-4016-97d5-d13adf9b6711' then 11
    when '11f0f201-d17d-494a-b2c5-4f8a549426c0' then 13
    when 'dc7932da-c34f-40d5-8c0f-8233a531c377' then 14
    when '177108fe-9fb2-434d-92ea-4acd85e4d9b1' then 18
    when 'a996bdb7-5c85-4045-89bd-8308f19ea472' then 21
    when '60926c22-7061-4e77-96e0-07f57a85dcb7' then 27
    else position end,
  mot_attendu = case id
    when '099b365d-c990-46c4-b451-79a6d222e502' then 'nouvelle'
    when '67f0dac5-2a90-4016-97d5-d13adf9b6711' then 'scolaire'
    when '11f0f201-d17d-494a-b2c5-4f8a549426c0' then 'lycée'
    when 'dc7932da-c34f-40d5-8c0f-8233a531c377' then 'français'
    when '177108fe-9fb2-434d-92ea-4acd85e4d9b1' then 'élèves'
    when 'a996bdb7-5c85-4045-89bd-8308f19ea472' then 'cahiers'
    when '60926c22-7061-4e77-96e0-07f57a85dcb7' then 'professeur'
    else mot_attendu end
where trou_id = 'eeb8bd94-dde7-4e34-b391-25d26571d799';

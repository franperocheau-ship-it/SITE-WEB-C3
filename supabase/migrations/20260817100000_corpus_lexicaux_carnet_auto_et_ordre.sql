-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- 1) Le carnet de mots ne doit contenir QUE les mots trouvés, ajoutés
--    automatiquement à la validation d'un niveau — plus de bouton manuel, et
--    plus possible d'y ajouter un mot manqué (retour en arrière sur l'ajout
--    précédent). La fonction dédiée à cet ajout manuel devient sans
--    utilité : supprimée plutôt que laissée en code mort.
-- 2) L'ordre des catégories dans la correction dépendait de l'ordre naturel
--    d'un `select distinct` sans tri explicite — non garanti par Postgres,
--    d'où un ordre parfois différent de celui de l'écran de collecte
--    (js/champ-lexical-engine.js, NIVEAU_CATEGORIES). Nouvelle fonction
--    cl_categorie_ordre(), calquée sur cet ordre, utilisée pour trier.
-- ═══════════════════════════════════════════════════════════════════════════

drop function if exists ajouter_mot_carnet_lexical(uuid, uuid);

-- Ordre d'affichage canonique des catégories — doit rester synchronisé avec
-- NIVEAU_CATEGORIES dans js/champ-lexical-engine.js (aucune source unique
-- possible entre SQL et JS, deux runtimes séparés — d'où ce commentaire
-- miroir des deux côtés).
create or replace function public.cl_categorie_ordre(p_categorie text)
returns smallint
language sql
immutable
as $$
  select case p_categorie
    when 'synonyme'    then 1
    when 'antonyme'    then 2
    when 'adjectif'    then 3
    when 'derive'      then 4
    when 'expression'  then 5
    when 'soutenu'     then 6
    when 'familier'    then 7
    else 99
  end;
$$;

create or replace function terminer_session_champ_lexical(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_champ_id uuid;
  v_niveau smallint;
  v_student_id uuid;
  v_total_points int;
  v_categories jsonb;
begin
  select champ_id, niveau, student_id, total_points
    into v_champ_id, v_niveau, v_student_id, v_total_points
  from champ_lexical_sessions
  where id = p_session_id and student_id = auth.uid() and status = 'en_cours';

  if v_champ_id is null then
    raise exception 'Session introuvable ou déjà terminée';
  end if;

  update champ_lexical_sessions
     set status = 'termine', completed_at = now(), next_review_at = now() + interval '14 days'
   where id = p_session_id;

  -- Carnet automatique : tous les mots trouvés lors de CETTE session, jamais
  -- les manqués. on conflict absorbe le cas d'un mot déjà présent (retrouvé
  -- à un niveau ultérieur partageant la même catégorie).
  insert into carnet_mots (student_id, mot_id, champ_id, mot, categorie)
  select v_student_id, mm.id, mm.champ_id, mm.mot, mm.categorie
  from champ_lexical_mots_trouves t
  join champ_lexical_mots mm on mm.id = t.mot_id
  where t.session_id = p_session_id
  on conflict (student_id, mot_id) do nothing;

  select jsonb_agg(jsonb_build_object(
    'categorie', m.categorie,
    'trouves', coalesce((
      select jsonb_agg(jsonb_build_object('id', mm.id, 'mot', mm.mot, 'exemple_phrase', mm.exemple_phrase, 'points', t.points_gagnes) order by mm.ordre)
      from champ_lexical_mots mm
      join champ_lexical_mots_trouves t on t.mot_id = mm.id and t.session_id = p_session_id
      where mm.champ_id = v_champ_id and mm.categorie = m.categorie
    ), '[]'::jsonb),
    'manques', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', mm.id, 'mot', mm.mot, 'exemple_phrase', mm.exemple_phrase,
        'points', public.cl_points_for_categorie(mm.categorie)
      ) order by mm.ordre)
      from champ_lexical_mots mm
      where mm.champ_id = v_champ_id and mm.categorie = m.categorie
        and not exists (
          select 1 from champ_lexical_mots_trouves t where t.mot_id = mm.id and t.session_id = p_session_id
        )
    ), '[]'::jsonb)
  ) order by public.cl_categorie_ordre(m.categorie))
  into v_categories
  from (
    select distinct categorie from champ_lexical_mots
    where champ_id = v_champ_id and public.cl_categorie_niveau(categorie) <= v_niveau
  ) m;

  return jsonb_build_object('total_points', v_total_points, 'categories', coalesce(v_categories, '[]'::jsonb));
end;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- Module Vocabulaire — Corpus lexical / Champ lexical
-- Refonte visuelle de l'écran de correction : le bouton "Ajouter à mon
-- carnet" passe des mots trouvés aux mots manqués (carnet pensé comme
-- "mots à retravailler"). Deux ajustements serveur nécessaires :
--
-- 1. terminer_session_champ_lexical() : les manques n'avaient que
--    mot/exemple_phrase. On leur ajoute id (indispensable pour référencer
--    le mot depuis le client) et points (indispensable pour afficher un
--    score "gagné / possible" — les manques n'ont jamais été crédités,
--    donc ce champ n'existait pas encore pour eux).
--
-- 2. Nouvelle fonction ajouter_mot_carnet_lexical() : champ_lexical_mots
--    n'a toujours aucune policy select élève (règle fondatrice du module —
--    la base de mots EST la réponse), donc aucune policy RLS directe sur
--    carnet_mots ne peut vérifier "ce mot manqué appartenait à une session
--    terminée m'appartenant" sans re-divulguer indirectement la base. Comme
--    pour toute écriture touchant la base de mots dans ce module, on passe
--    par une fonction SECURITY DEFINER : vérifie que la session appartient
--    à l'élève et est 'termine', que le mot appartient bien au champ de
--    cette session et à une catégorie du niveau joué, puis insère dans
--    carnet_mots avec le texte lu depuis la base (jamais fourni par le
--    client). La policy carnet_mots_insert_own existante n'est pas touchée
--    (reste valide pour un éventuel ajout direct d'un mot déjà trouvé).
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function terminer_session_champ_lexical(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_champ_id uuid;
  v_niveau smallint;
  v_total_points int;
  v_categories jsonb;
begin
  select champ_id, niveau, total_points into v_champ_id, v_niveau, v_total_points
  from champ_lexical_sessions
  where id = p_session_id and student_id = auth.uid() and status = 'en_cours';

  if v_champ_id is null then
    raise exception 'Session introuvable ou déjà terminée';
  end if;

  update champ_lexical_sessions
     set status = 'termine', completed_at = now(), next_review_at = now() + interval '14 days'
   where id = p_session_id;

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
  ))
  into v_categories
  from (
    select distinct categorie from champ_lexical_mots
    where champ_id = v_champ_id and public.cl_categorie_niveau(categorie) <= v_niveau
  ) m;

  return jsonb_build_object('total_points', v_total_points, 'categories', coalesce(v_categories, '[]'::jsonb));
end;
$$;

-- Ajout d'un mot (trouvé ou manqué) au carnet personnel, depuis une session
-- terminée appartenant à l'élève. Ne fait jamais confiance au texte fourni
-- par le client : mot/categorie/exemple_phrase sont relus depuis la base.
create or replace function ajouter_mot_carnet_lexical(p_session_id uuid, p_mot_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_champ_id uuid;
  v_niveau smallint;
  v_mot text;
  v_categorie text;
  v_exemple text;
begin
  select champ_id, niveau into v_champ_id, v_niveau
  from champ_lexical_sessions
  where id = p_session_id and student_id = auth.uid() and status = 'termine';

  if v_champ_id is null then
    raise exception 'Session introuvable ou non terminée';
  end if;

  select mot, categorie, exemple_phrase into v_mot, v_categorie, v_exemple
  from champ_lexical_mots
  where id = p_mot_id and champ_id = v_champ_id and public.cl_categorie_niveau(categorie) <= v_niveau;

  if v_mot is null then
    raise exception 'Mot introuvable pour ce niveau';
  end if;

  insert into carnet_mots (student_id, mot_id, champ_id, mot, categorie)
  values (auth.uid(), p_mot_id, v_champ_id, v_mot, v_categorie)
  on conflict (student_id, mot_id) do nothing;

  return jsonb_build_object('mot', v_mot, 'categorie', v_categorie, 'exemple_phrase', v_exemple);
end;
$$;

grant execute on function ajouter_mot_carnet_lexical(uuid, uuid) to authenticated;

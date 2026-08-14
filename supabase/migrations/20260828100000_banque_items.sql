-- ═══════════════════════════════════════════════════════════════════════════
-- Banque d'items par compétence (mode "Je crée avec Proficiamus" du
-- générateur d'évaluations) — remplace la lecture directe de
-- data/banques-evaluations/*.json par une table éditable depuis un panneau
-- admin dédié (evaluations-banque-admin.html).
--
-- `items` est stocké au même format que evaluations.exercices (voir
-- 20260826100000_evaluations.sql) — {type, consigne, ...champs propres au
-- type}, PAS le format brut des fichiers JSON (qui a un corrigé/réponse,
-- des distracteurs et une note papier). La conversion de l'un vers l'autre
-- (ex-EvaluationsBanque.convertirItem() côté client) est faite une seule
-- fois ici, à l'import — plus de correspondance à la volée. Le corrigé,
-- les distracteurs et la note papier du JSON d'origine sont abandonnés :
-- déjà inutilisés en aval (ni evaluations-print.js, ni le formulaire ne
-- les affichent).
--
-- `competence_slug` est le vrai slug d'exercice (clé de window.EXERCISE_DATA,
-- ex. data/conjugaison.js), résolu une fois à l'import avec la même logique
-- que l'ancien trouverSlug()/CORRESPONDANCE_MANUELLE — pas un slug généré
-- automatiquement à partir du titre.
-- ═══════════════════════════════════════════════════════════════════════════

create table banque_items (
  id               uuid primary key default gen_random_uuid(),
  competence_slug  text not null,
  titre            text not null,
  domaine          text not null,
  sous_domaine     text not null,
  regroupement     text,
  -- Tableau ordonné d'exercices, même forme que evaluations.exercices
  -- (voir 20260826100000_evaluations.sql pour le détail des champs par type).
  items            jsonb not null default '[]'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz default now()
);

create index banque_items_domaine_idx on banque_items (domaine, sous_domaine);

alter table banque_items enable row level security;

-- Lecture : tout utilisateur connecté (enseignant ou admin) — contenu
-- pédagogique partagé, pas de notion de propriétaire (contrairement à
-- evaluations).
create policy banque_items_select_authenticated on banque_items
  for select using (auth.uid() is not null);

-- Écriture : admin uniquement (même patron my_role() que
-- champs_lexicaux_update_own_or_admin, 20260818100000_validation_admin_publication.sql).
create policy banque_items_admin_write on banque_items
  for all using (my_role() = 'admin') with check (my_role() = 'admin');

-- ── updated_at automatique (même patron que evaluations_set_updated_at) ────
create or replace function banque_items_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger banque_items_touch_updated_at
  before update on banque_items
  for each row execute function banque_items_set_updated_at();

-- ── Peuplement initial : Conjugaison ────────────────────────────────────────
-- Généré à partir de data/banques-evaluations/conjugaison.json via un
-- script jetable portant trouverSlug()/CORRESPONDANCE_MANUELLE/
-- convertirItem() de l'ancien js/evaluations-banque.js. 15 compétences sur
-- 17 ont une correspondance (2 exclues, comme aujourd'hui côté client) :
-- "Conjuguer au passé composé avec être" et "Accorder le participe passé
-- avec le COD (auxiliaire avoir)" n'ont pas d'exercice correspondant sur
-- le site — à ajouter à la banque plus tard une fois l'exercice créé.
insert into banque_items (competence_slug, titre, domaine, sous_domaine, regroupement, items) values
  ('retrouver-infinitif-verbe-conjugue', 'Retrouver l''infinitif d''un verbe conjugué puis son groupe', 'Français', 'Conjugaison', 'Le verbe > Identifier le verbe', '[{"type":"marquage","consigne":"Souligne le verbe conjugué dans chaque phrase, puis donne son infinitif et son groupe.","contenu":"Les enfants jouent dans la cour.\nNous choisissons un livre.\nTu prends ton manteau.\nElles grandissent rapidement.\nVous écrivez une lettre."},{"type":"marquage","consigne":"Pour chaque verbe conjugué, indique son infinitif et son groupe.","contenu":"Le chat dort sur le canapé.\nJe regarde la pluie.\nNous finissons notre travail.\nIls font un dessin.\nVous venez demain."}]'::jsonb),
  ('conjuguer-etre-present', 'Conjuguer être au présent', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Présent', '[{"type":"classement","consigne":"Conjugue le verbe être au présent avec les six pronoms.","utiliserTableauConjugaison":true,"verbes":["être"],"pronoms":null},{"type":"texte_trous","consigne":"Complète chaque phrase avec la forme correcte du verbe être au présent.","items":[{"texte":"Je [[trou]] dans la classe."},{"texte":"Tu [[trou]] en avance."},{"texte":"Nous [[trou]] prêts."},{"texte":"Vous [[trou]] attentifs."},{"texte":"Elles [[trou]] heureuses."}],"tailleTrous":"moyen"}]'::jsonb),
  ('conjuguer-avoir-present', 'Conjuguer avoir au présent', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Présent', '[{"type":"relier","consigne":"Relie chaque sujet à la forme correcte du verbe avoir.","colonneGauche":["Je","Tu","Nous","Vous","Elles"],"colonneDroite":["ai","as","avons","avez","ont"]},{"type":"marquage","consigne":"Choisis la bonne forme du verbe avoir.","contenu":"Nous ___ une grande carte.  (avons / avez / ont)\nTu ___ un nouveau cahier.  (as / a / ai)\nIls ___ faim.  (ont / avons / avez)\nJ''___ une idée.  (ai / a / as)\nVous ___ deux minutes.  (avez / avons / ont)"}]'::jsonb),
  ('conjuguer-1er-groupe-present', 'Conjuguer les verbes du 1er groupe au présent', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Présent', '[{"type":"texte_trous","consigne":"Complète chaque phrase avec le verbe entre parenthèses au présent.","items":[{"texte":"Je [[trou]] une photo. (regarder)"},{"texte":"Tu [[trou]] ton vélo. (réparer)"},{"texte":"Nous [[trou]] dans la cour. (jouer)"},{"texte":"Vous [[trou]] la réponse. (chercher)"},{"texte":"Ils [[trou]] leur travail. (terminer)"}],"tailleTrous":"moyen"},{"type":"reecriture","consigne":"Réécris chaque phrase en changeant le sujet indiqué.","phrases":["Je dessine un arbre. → Nous","Tu marches vite. → Vous","Il écoute la consigne. → Ils","Nous préparons le sac. → Elle","Elles chantent ensemble. → Je"],"banqueMots":null}]'::jsonb),
  ('conjuguer-verbes-particuliers-1er-groupe', 'Conjuguer les verbes particuliers du 1er groupe (verbes en -cer, -ger, -yer, -eler, -eter, avec modification du radical)', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Présent', '[{"type":"marquage","consigne":"Choisis la forme correcte du verbe au présent.","contenu":"Nous ___ la leçon. (commencer)  (commencons / commençons / commencez)\nNous ___ une affiche. (manger)  (mangeons / mangons / mangez)\nJ''___ mon sac. (essuyer)  (essuis / essuie / essuyons)\nElle ___ son voisin. (appeler)  (apelle / appelle / appelons)\nIl ___ la balle. (jeter)  (jète / jette / jetons)"},{"type":"marquage","consigne":"Entoure la forme correctement conjuguée dans chaque série.","contenu":"nous commençons / nous commencons\nnous mangeons / nous mangons\nj''essaie / j''essaye\nelle appelle / elle apelle\nil jette / il jète"}]'::jsonb),
  ('conjuguer-2e-groupe-present', 'Conjuguer les verbes du 2e groupe au présent', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Présent', '[{"type":"classement","consigne":"Conjugue le verbe finir au présent avec les six pronoms.","utiliserTableauConjugaison":true,"verbes":["finir"],"pronoms":null},{"type":"marquage","consigne":"Écris la forme correcte du verbe indiqué.","contenu":"Nous ___ notre repas. (finir)\nTu ___ vite. (grandir)\nElles ___ leur travail. (choisir)\nJe ___ le formulaire. (remplir)\nVous ___ à la lumière. (réfléchir)"}]'::jsonb),
  ('conjuguer-3e-groupe-present', 'Conjuguer les verbes fréquents du 3e groupe au présent', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Présent', '[{"type":"relier","consigne":"Relie chaque sujet à la forme correcte du verbe.","colonneGauche":["Je","Tu","Elle","Nous","Vous"],"colonneDroite":["vais","fais","vient","prenons","dites"]},{"type":"texte_trous","consigne":"Complète les phrases avec le verbe entre parenthèses au présent.","items":[{"texte":"Je [[trou]] à l''école à pied. (aller)"},{"texte":"Tu [[trou]] ton exercice. (faire)"},{"texte":"Nous [[trou]] le bus. (prendre)"},{"texte":"Ils [[trou]] demain matin. (venir)"},{"texte":"Vous [[trou]] la vérité. (dire)"}],"tailleTrous":"moyen"}]'::jsonb),
  ('conjuguer-imparfait', 'Conjuguer à l''imparfait', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Imparfait', '[{"type":"reecriture","consigne":"Réécris chaque phrase à l''imparfait.","phrases":["Je joue dans le jardin.","Nous regardons les étoiles.","Tu finis ton dessin.","Ils prennent le train.","Vous êtes en vacances."],"banqueMots":null},{"type":"marquage","consigne":"Choisis la forme correcte à l''imparfait.","contenu":"Quand j''étais petit, je ___ souvent ici. (jouer)  (jouais / jouait / jouer)\nNous ___ chaque matin. (marcher)  (marchions / marchiez / marchons)\nTu ___ toujours la même histoire. (raconter)  (racontais / racontait / racontiez)\nElles ___ leurs devoirs après le goûter. (finir)  (finissaient / finissions / finissaient)\nVous ___ très attentifs. (être)  (étiez / êtes / es)"}]'::jsonb),
  ('conjuguer-futur', 'Conjuguer au futur', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Futur simple', '[{"type":"texte_trous","consigne":"Complète chaque phrase avec le verbe entre parenthèses au futur simple.","items":[{"texte":"Demain, je [[trou]] une promenade. (faire)"},{"texte":"Tu [[trou]] ton projet lundi. (terminer)"},{"texte":"Nous [[trou]] le musée. (visiter)"},{"texte":"Vous [[trou]] votre valise. (préparer)"},{"texte":"Ils [[trou]] à Madrid. (venir)"}],"tailleTrous":"moyen"},{"type":"marquage","consigne":"Souligne les verbes conjugués au futur simple.","contenu":"Nous partirons demain matin.\nJe regarde la carte.\nIls construiront une cabane.\nVous avez un rendez-vous.\nTu choisiras un livre."}]'::jsonb),
  ('conjuguer-passe-compose-avoir', 'Conjuguer au passé composé avec avoir', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Passé composé', '[{"type":"classement","consigne":"Conjugue le verbe regarder au passé composé avec les six pronoms.","utiliserTableauConjugaison":true,"verbes":["regarder"],"pronoms":null},{"type":"reecriture","consigne":"Réécris chaque phrase au passé composé.","phrases":["Je range ma chambre.","Tu regardes le film.","Nous visitons le musée.","Vous préparez le repas.","Ils terminent leur travail."],"banqueMots":null}]'::jsonb),
  ('etre-ou-avoir', 'Choisir l''auxiliaire être ou avoir au passé composé', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Passé composé', '[{"type":"marquage","consigne":"Choisis l''auxiliaire correct.","contenu":"Léa ___ arrivée tôt.  (est / a)\nNous ___ mangé dehors.  (avons / sommes)\nIls ___ partis à huit heures.  (sont / ont)\nTu ___ pris le train.  (as / es)\nVous ___ venus hier.  (êtes / avez)"},{"type":"marquage","consigne":"Entoure l''auxiliaire utilisé dans chaque phrase.","contenu":"Nous avons joué au ballon.\nElle est tombée dans la cour.\nIls ont choisi un livre.\nTu es parti rapidement.\nVous avez écrit une lettre."}]'::jsonb),
  ('conjuguer-passe-simple', 'Conjuguer au passé simple', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Passé simple', '[{"type":"marquage","consigne":"Choisis la bonne forme au passé simple.","contenu":"Le chevalier ___ la porte. (ouvrir)  (ouvrit / ouvrait / ouvrira)\nIl ___ dans la cour. (entrer)  (entra / entrait / entrer)\nNous ___ le spectacle. (regarder)  (regardâmes / regardions / regarderons)\nIls ___ leur voyage. (commencer)  (commencèrent / commençaient / commenceront)\nElle ___ un grand bruit. (entendre)  (entendit / entendait / entendra)"},{"type":"texte_trous","consigne":"Complète avec le verbe entre parenthèses au passé simple.","items":[{"texte":"Le roi [[trou]] son cheval. (monter)"},{"texte":"Les enfants [[trou]] dans la forêt. (courir)"},{"texte":"Elle [[trou]] la bonne réponse. (trouver)"},{"texte":"Nous [[trou]] le château. (visiter)"},{"texte":"Ils [[trou]] la porte. (fermer)"}],"tailleTrous":"moyen"}]'::jsonb),
  ('conjuguer-plus-que-parfait', 'Conjuguer au plus-que-parfait', 'Français', 'Conjugaison', 'Les temps de l''indicatif > Plus-que-parfait', '[{"type":"reecriture","consigne":"Réécris chaque phrase au plus-que-parfait.","phrases":["Je termine mon travail avant de sortir.","Nous visitons déjà le musée quand le groupe arrive.","Tu ranges ta chambre avant le dîner.","Ils partent avant notre arrivée.","Elle lit le livre avant le cours."],"banqueMots":null},{"type":"texte_trous","consigne":"Conjugue le verbe entre parenthèses au plus-que-parfait.","items":[{"texte":"Je [[trou]] le message. (lire)"},{"texte":"Tu [[trou]] ton sac. (préparer)"},{"texte":"Il [[trou]] avant midi. (partir)"},{"texte":"Nous [[trou]] la porte. (fermer)"},{"texte":"Elles [[trou]] leur travail. (finir)"}],"tailleTrous":"moyen"}]'::jsonb),
  ('conjuguer-imperatif-present', 'Conjuguer à l''impératif présent', 'Français', 'Conjugaison', 'Les autres modes > Impératif', '[{"type":"marquage","consigne":"Souligne les verbes conjugués à l''impératif présent.","contenu":"Ferme la porte, s''il te plaît.\nVous fermez la porte.\nÉcoute attentivement.\nNous écoutons la consigne.\nPrenez vos cahiers."},{"type":"texte_trous","consigne":"Complète chaque consigne avec le verbe à l''impératif présent.","items":[{"texte":"[[trou]] la lumière ! (éteindre)"},{"texte":"[[trou]] ton cahier ! (prendre)"},{"texte":"[[trou]] doucement ! (parler)"},{"texte":"[[trou]] vos affaires ! (ranger)"},{"texte":"[[trou]] patient ! (être)"}],"tailleTrous":"moyen"}]'::jsonb),
  ('conjuguer-conditionnel-present', 'Conjuguer au conditionnel présent', 'Français', 'Conjugaison', 'Les autres modes > Conditionnel', '[{"type":"marquage","consigne":"Conjugue le verbe indiqué au conditionnel présent.","contenu":"Je ___ plus souvent si j''avais le temps. (lire)\nTu ___ avec nous. (venir)\nElle ___ un gâteau. (faire)\nNous ___ cette idée. (choisir)\nVous ___ la vérité. (dire)"},{"type":"marquage","consigne":"Choisis la forme correcte au conditionnel présent.","contenu":"Je ___ volontiers ce livre. (lire)  (lirais / lirai / lisais)\nNous ___ demain. (partir)  (partirions / partirons / partions)\nIls ___ plus tôt. (venir)  (viendraient / viendront / venaient)\nTu ___ cette veste. (prendre)  (prendrais / prendras / prenais)\nVous ___ nous aider. (pouvoir)  (pourriez / pourrez / pouviez)"}]'::jsonb);

-- ═══════════════════════════════════════════════════════════════════════════
-- Correctif sécurité — policies RLS "feedback" trop permissives
--
-- feedback_update_public / feedback_delete_public utilisaient using (true),
-- ce qui permettait à n'importe quel client (même non authentifié, via la
-- clé anon publique embarquée dans js/supabase-client.js) de modifier ou
-- supprimer n'importe quelle entrée de feedback via l'API REST Supabase.
-- Le contrôle d'accès affiché sur feedback.html (mot de passe en dur côté
-- client, ADMIN_PASSWORD) n'avait aucune valeur de sécurité réelle : il ne
-- faisait que masquer/afficher des boutons, sans jamais être vérifié côté
-- serveur.
--
-- select/insert restent publics (n'importe qui doit pouvoir soumettre et
-- consulter les signalements) ; update/delete sont désormais réservés aux
-- comptes dont profiles.role = 'admin', via la fonction public.my_role()
-- déjà utilisée pour protéger le reste de l'espace admin (supabase-schema.sql).
-- ═══════════════════════════════════════════════════════════════════════════

drop policy if exists "feedback_update_public" on public.feedback;
drop policy if exists "feedback_delete_public" on public.feedback;

create policy "feedback_update_admin"
  on public.feedback for update
  using (public.my_role() = 'admin')
  with check (public.my_role() = 'admin');

create policy "feedback_delete_admin"
  on public.feedback for delete
  using (public.my_role() = 'admin');

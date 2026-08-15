/* ─────────────────────────────────────────────────────────────────────────────
   feature-flags.js — Flags de visibilité de modules (masquage réversible,
   sans suppression de code/logique/données).

   ██  POUR RÉACTIVER UN MODULE : repasser son flag à `true` ci-dessous.  ██
   C'est le SEUL endroit à modifier — tous les points d'entrée (onglets,
   cartes, liens, blocages d'accès direct) lisent ce fichier.

   JOGGING_ENABLED : module "Rédaction / Joggings d'écriture" (front-office
   ET espace enseignant). Passé à false le 2026-08-15 à la demande du client
   — module développé mais pas encore ouvert aux classes.
   ───────────────────────────────────────────────────────────────────────────

   Utilisation dans les pages :

   1) Masquer un lien/carte/onglet statique : ajouter l'attribut
      data-feature="jogging" sur l'élément, puis appeler quelque part après
      lui dans le DOM :
        <script src="js/feature-flags.js?v=1"></script>
        <script>LFM_FEATURES.hideDisabled();</script>

   2) Bloquer l'accès direct à une page du module (URL tapée à la main) :
      LFM_FEATURES.isEnabled('jogging') renvoie false → afficher un message
      "non disponible" à la place du contenu (voir redaction.html,
      jogging.html, synthese-joggings-enseignant.html et
      resultats-joggings-enseignant.html pour le pattern utilisé).
   ───────────────────────────────────────────────────────────────────────────── */

const LFM_FEATURES = (() => {
  const FLAGS = {
    jogging: false, // ← module "Rédaction / Joggings d'écriture" — repasser à true pour réactiver
  };

  function isEnabled(name) {
    return FLAGS[name] !== false;
  }

  /* Masque (display:none) tout élément [data-feature="xxx"] déjà présent
     dans le DOM dont le flag correspondant est désactivé. À appeler après
     les éléments à surveiller (voir usage ci-dessus) : pas d'écoute
     DOMContentLoaded, le script est chargé en fin de bloc pour rester
     synchrone avec le rendu et éviter tout flash de contenu masqué. */
  function hideDisabled(root) {
    (root || document).querySelectorAll('[data-feature]').forEach(el => {
      if (!isEnabled(el.getAttribute('data-feature'))) el.style.display = 'none';
    });
  }

  return { FLAGS, isEnabled, hideDisabled };
})();

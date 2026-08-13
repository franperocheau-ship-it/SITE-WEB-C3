/* ─────────────────────────────────────────────────────────────────────────────
   evaluations-banque.js — Mode "Je crée avec Proficiamus" du générateur
   d'évaluations : charge une banque JSON par domaine (data/banques-
   evaluations/*.json), fait correspondre chaque compétence à son vrai slug
   existant dans le catalogue du site, et convertit un item de banque en
   exercice au format attendu par le formulaire (même forme que
   buildExercicePayload() dans evaluations-enseignant.html).

   Dépend de : rien côté réseau propre — le chargement de data/conjugaison.js
   (pour la correspondance de slugs) est fait à la demande par l'appelant via
   loadScript(), pas ici (voir evaluations-enseignant.html).
   ───────────────────────────────────────────────────────────────────────────── */

const EvaluationsBanque = (() => {
  /* Un domaine = un fichier JSON. D'autres domaines suivront au même format
     (voir prompt) — il suffira d'ajouter une entrée ici. */
  const DOMAINES = [
    { value: 'conjugaison', label: 'Français — Conjugaison', fichier: 'data/banques-evaluations/conjugaison.json' }
  ];

  /* ── Correspondance banque -> vrai slug existant ──────────────────────────
     Le competenceSlug du JSON est une approximation générée automatiquement
     (slugification du titre) qui ne correspond pas forcément au vrai slug
     utilisé sur le site (voir data/conjugaison.js, clé de chaque exercice).
     Une correspondance automatique par titre exact (ou, à défaut, par champ
     `competence` exact — voir matchCompetence) couvre la majorité des cas ;
     celles qui restent (formulation différente entre banque et site) sont
     réglées ici à la main, une fois pour toutes, par competenceSlug. Tout ce
     qui n'a ni correspondance automatique ni entrée ici est exclu de l'écran
     de sélection (voir buildIndex), avec un console.warn — jamais d'erreur
     bloquante. */
  const CORRESPONDANCE_MANUELLE = {
    'conjuguer-etre-au-present': 'conjuguer-etre-present',
    'conjuguer-avoir-au-present': 'conjuguer-avoir-present',
    'conjuguer-les-verbes-du-1er-groupe-au-present': 'conjuguer-1er-groupe-present',
    'conjuguer-les-verbes-particuliers-du-1er-groupe-verbes-en-cer-ger-yer-eler-eter-avec-modification-du-radical': 'conjuguer-verbes-particuliers-1er-groupe',
    'conjuguer-au-passe-compose-avec-avoir': 'conjuguer-passe-compose-avoir',
    'choisir-l-auxiliaire-etre-ou-avoir-au-passe-compose': 'etre-ou-avoir',
    'conjuguer-au-passe-simple': 'conjuguer-passe-simple'
  };

  async function chargerDomaine(domaineValue) {
    const domaine = DOMAINES.find(d => d.value === domaineValue);
    if (!domaine) throw new Error('Domaine de banque inconnu : ' + domaineValue);
    const res = await fetch(domaine.fichier);
    if (!res.ok) throw new Error('Impossible de charger ' + domaine.fichier);
    return res.json();
  }

  /* exerciseIndex : [{slug, title, competence}], construit par l'appelant à
     partir de window.EXERCISE_DATA (déjà chargé au moment de l'appel — voir
     evaluations-enseignant.html). Retourne le vrai slug ou null. */
  function trouverSlug(banqueEntry, exerciseIndex) {
    let trouve = exerciseIndex.find(e => e.title === banqueEntry.titre);
    if (!trouve) trouve = exerciseIndex.find(e => e.competence === banqueEntry.titre);
    if (!trouve) {
      const slugManuel = CORRESPONDANCE_MANUELLE[banqueEntry.competenceSlug];
      if (slugManuel) trouve = exerciseIndex.find(e => e.slug === slugManuel);
    }
    return trouve ? trouve.slug : null;
  }

  /* Sépare la banque en compétences valides (avec leur vrai slug attaché) et
     compétences exclues (aucune correspondance) — jamais d'exception, juste
     un console.warn par exclusion pour rester traçable. */
  function indexerBanque(banqueEntries, exerciseIndex) {
    const valides = [];
    const exclues = [];
    banqueEntries.forEach(entry => {
      const slug = trouverSlug(entry, exerciseIndex);
      if (slug) {
        valides.push({ ...entry, slugReel: slug });
      } else {
        exclues.push(entry);
        console.warn('[EvaluationsBanque] Compétence sans correspondance dans le catalogue, exclue de la sélection :', entry.titre, '(competenceSlug: ' + entry.competenceSlug + ')');
      }
    });
    return { valides, exclues };
  }

  /* ── Conversion item de banque -> exercice (forme "payload persisté", la
     même que buildExercicePayload() dans evaluations-enseignant.html) ──────
     Certains types de la banque ne correspondent pas exactement à la forme
     attendue par le type déclaré côté formulaire : repli documenté au cas
     par cas ci-dessous plutôt que de forcer un contenu inadapté dans le
     mauvais type. */

  const PRONOMS_MOTS = ['je', 'tu', 'nous', 'vous', 'ils-elles'];

  function estTableauDeConjugaison(contenu) {
    if (!contenu || contenu.length !== 1) return false;
    const s = contenu[0].toLowerCase();
    return PRONOMS_MOTS.every(mot => s.includes(mot));
  }

  function extraireVerbe(consigne) {
    const m = (consigne || '').match(/verbe\s+(\S+?)\s+au\b/i);
    return m ? m[1].replace(/[.,;]+$/, '') : '';
  }

  /* "___" (une ou plusieurs) -> repère [[trou]] consommé par le rendu PDF du
     type texte_trous (voir js/evaluations-print.js). */
  function versItemsTrous(contenu) {
    return (contenu || []).map(ligne => ({ texte: ligne.replace(/_{2,}/g, '[[trou]]') }));
  }

  function convertirItem(item) {
    const consigne = item.consigne || '';
    const contenu = item.contenu || [];
    const reponse = item.reponse || [];
    const distracteurs = item.distracteurs || [];

    switch (item.type) {
      case 'Marquage':
        return { type: 'marquage', consigne, contenu: contenu.join('\n') };

      case 'Texte à trous':
        return { type: 'texte_trous', consigne, items: versItemsTrous(contenu), tailleTrous: 'moyen' };

      case 'Réécriture':
        return { type: 'reecriture', consigne, phrases: contenu, banqueMots: null };

      case 'Répondre / classer dans un tableau':
        if (estTableauDeConjugaison(contenu)) {
          const verbe = extraireVerbe(consigne);
          return {
            type: 'classement',
            consigne,
            utiliserTableauConjugaison: true,
            verbes: verbe ? [verbe] : [],
            pronoms: null /* absent = tous cochés par défaut, voir exerciceFormState */
          };
        }
        /* Forme non tabulaire rencontrée dans la banque (une phrase à trou
           par pronom plutôt qu'un verbe unique sur les 6 pronoms) : la
           grille de conjugaison ne convient pas telle quelle — repli texte
           à trous, qui correspond exactement au contenu fourni ("___" déjà
           présent dans chaque phrase). */
        return { type: 'texte_trous', consigne, items: versItemsTrous(contenu), tailleTrous: 'moyen' };

      case 'Relier': {
        /* contenu liste aussi les distracteurs ("Je -> a / ai / avons"),
           mais reponse ne garde que la bonne paire ("Je -> ai") — c'est
           cette dernière qui donne des colonnes gauche/droite propres. */
        const gauche = [];
        const droite = [];
        reponse.forEach(ligne => {
          const parts = ligne.split('→').map(s => s.trim());
          if (parts.length === 2) { gauche.push(parts[0]); droite.push(parts[1]); }
        });
        return { type: 'relier', consigne, colonneGauche: gauche, colonneDroite: droite };
      }

      case 'QCM': {
        /* Le type qcm du formulaire attend UNE question + UNE liste de
           propositions ; la banque donne PLUSIEURS phrases à trou, chacune
           avec son propre jeu d'options — forme incompatible. Repli
           marquage : chaque phrase suivie de ses options entre parenthèses,
           l'élève entoure ou recopie son choix. */
        const lignes = contenu.map((ligne, i) => distracteurs[i] ? `${ligne}  (${distracteurs[i]})` : ligne);
        return { type: 'marquage', consigne, contenu: lignes.join('\n') };
      }

      case 'Vrai/Faux':
      case 'Vrai / Faux':
        return { type: 'vrai_faux', consigne, affirmations: contenu };

      case 'Mots soulignés + réponse dessous':
        /* Contenu de la banque = phrases à trou ("___"), pas un texte avec
           des mots entre crochets attendu par le type mots_souligne — même
           repli que la variante non tabulaire de "Répondre / classer". */
        return { type: 'texte_trous', consigne, items: versItemsTrous(contenu), tailleTrous: 'moyen' };

      case 'Réponse courte':
        /* Le type reponse_courte de l'app attend UNE question + N lignes de
           réponse ; la banque donne PLUSIEURS phrases complètes à analyser
           séparément, sans blanc explicite — même repli que QCM : affichage
           en liste avec interligne généreux pour écrire la réponse. */
        return { type: 'marquage', consigne, contenu: contenu.join('\n') };

      default:
        console.warn('[EvaluationsBanque] Type d\'item de banque non reconnu, repli marquage :', item.type);
        return { type: 'marquage', consigne, contenu: contenu.join('\n') };
    }
  }

  return { DOMAINES, chargerDomaine, indexerBanque, convertirItem };
})();

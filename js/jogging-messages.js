/* ═══════════════════════════════════════════════════════════════════════
   jogging-messages.js — Bibliothèque de messages pédagogiques cycle 3
   (cahier des charges §6.5).

   Grammalecte renvoie des messages techniques, pensés pour des adultes qui
   corrigent leur propre texte, pas pour expliquer une règle à un enfant.
   Ce fichier reformule, pour chaque famille de règles Grammalecte
   effectivement mappée sur un critère Code Champion (voir
   js/jogging-grammalecte.js pour la table complète), une explication à
   hauteur de cycle 3 :
     — en V1/V2 : on signale la catégorie d'erreur et on explique la règle,
       SANS révéler la correction précise (§3.6) ;
     — en correction finale (V3, ou fin anticipée) : la suggestion complète
       de Grammalecte est révélée, ajoutée au message.

   Ce fichier est un premier jet volontairement limité aux familles les plus
   fréquentes en production d'élève (§6.5) : accords sujet-verbe et groupe
   nominal, conjugaison, homophones grammaticaux courants (a/à, et/est,
   son/sont, ces/ses, on/ont, ce/se), majuscule en début de phrase,
   ponctuation finale. Le filet de sécurité générique par famille couvre le
   reste ; à affiner ensemble après les premiers tests réels.

   Note sur « conjugaison au temps imposé » : Grammalecte vérifie qu'une
   forme verbale est correctement conjuguée (accord avec son sujet, forme
   attendue), pas que l'élève a bien utilisé LE temps demandé par la
   consigne (ça, c'est de la compréhension de consigne, hors de portée d'un
   correcteur grammatical — cf. §2/§3.10 du cahier des charges). Les
   messages ci-dessous portent donc sur la correction de la forme verbale
   utilisée, pas sur le respect du temps imposé.
   ═══════════════════════════════════════════════════════════════════════ */

const JoggingMessages = (() => {

  /* ── Overrides précis, par motif reconnu dans sRuleId ─────────────────
     Plus parlants que le message générique de famille quand on reconnaît
     un cas fréquent. Premier motif qui matche (dans l'ordre) l'emporte. */
  const RULE_PATTERNS = [
    {
      test: /conf.*(à_a|a_à)/i,
      hint: "Confusion entre « a » et « à ». Remplace le mot par « avait » : si ça fonctionne, c'est le verbe « a » ; sinon, c'est la préposition « à ».",
      full: "Confusion entre « a » et « à » : remplace le mot par « avait » pour vérifier. Si ça fonctionne, écris « a » (verbe avoir) ; sinon, écris « à »."
    },
    {
      test: /conf.*et_est/i,
      hint: "Confusion entre « et » et « est ». Remplace le mot par « était » : si ça fonctionne, c'est le verbe « est » ; sinon, c'est le mot « et ».",
      full: "Confusion entre « et » et « est » : remplace le mot par « était » pour vérifier. Si ça fonctionne, écris « est » (verbe être) ; sinon, écris « et »."
    },
    {
      test: /conf.*(son_sont|_ont(?!\w))/i,
      hint: "Confusion possible entre « son »/« sont » ou « on »/« ont ». Remplace par « étaient » (pour sont/ont) ou par « ma », « ta », « sa » (pour son) afin de vérifier.",
      full: "Remplace le mot par « étaient » : si ça fonctionne, c'est « sont » ou « ont » (verbe) ; sinon, c'est « son » (possessif, comme « sa », « ma »)."
    },
    {
      test: /conf.*on_ont/i,
      hint: "Confusion entre « on » et « ont ». Remplace le mot par « avaient » : si ça fonctionne, c'est « ont » ; sinon, c'est « on ».",
      full: "Remplace le mot par « avaient » pour vérifier. Si ça fonctionne, écris « ont » (verbe avoir) ; sinon, écris « on » (pronom)."
    },
    {
      test: /conf.*ces_ses/i,
      hint: "Confusion possible entre « ces » et « ses ». Demande-toi : est-ce que ces mots appartiennent à quelqu'un (ses) ou est-ce qu'on montre quelque chose (ces) ?",
      full: "« ses » s'utilise quand les objets appartiennent à quelqu'un (= ses affaires à lui/elle) ; « ces » sert à montrer (= ces objets-là)."
    },
    {
      test: /conf.*ce_se/i,
      hint: "Confusion possible entre « ce » et « se ». Essaie de remplacer par « cela » : si ça fonctionne, c'est « ce ».",
      full: "Remplace par « cela » pour vérifier. Si ça fonctionne, écris « ce » ; sinon (verbe pronominal, ex. « se lever »), écris « se »."
    },
    {
      test: /majuscule_début_paragraphe|majuscule_après_point/,
      hint: "Une phrase commence toujours par une majuscule.",
      full: "N'oublie pas la majuscule en début de phrase, juste après le point qui précède."
    },
    {
      test: /poncfin/,
      hint: "Il manque peut-être un signe de ponctuation à la fin de cette phrase.",
      full: "Termine ta phrase par un point, un point d'exclamation ou un point d'interrogation."
    }
  ];

  /* ── Messages génériques par famille (filet de sécurité) ─────────────── */
  const FAMILY_MESSAGES = {
    // — Conjugaison (C) —
    conj: {
      hint: "Ici, le verbe ne s'accorde pas avec son sujet. Compte : combien de personnes font l'action ?",
      full: "Le verbe doit s'accorder avec son sujet. Retrouve qui fait l'action, puis vérifie sa terminaison."
    },
    infi: {
      hint: "Attention à ne pas confondre l'infinitif du verbe avec une autre forme.",
      full: "Remplace le verbe par un verbe du 3e groupe (ex. « prendre/pris ») : ça t'aide à entendre s'il faut l'infinitif ou le participe."
    },
    imp: {
      hint: "Vérifie la terminaison de ce verbe à l'impératif.",
      full: "À l'impératif, les verbes en -er ne prennent pas de « s » à la 2e personne du singulier (ex. « Mange », pas « Manges »), sauf devant « en »/« y »."
    },
    inte: {
      hint: "Dans une question, vérifie comment le verbe et le pronom sont reliés.",
      full: "Dans une phrase interrogative avec inversion, le verbe et le pronom sont reliés par un trait d'union (ex. « veux-tu »)."
    },
    vmode: {
      hint: "Regarde bien le mode de ce verbe : est-ce la bonne forme pour ce que tu veux dire ?",
      full: "Vérifie le mode verbal utilisé (indicatif, subjonctif, conditionnel…) : la forme du verbe change selon le mode."
    },

    // — Homophones (H) —
    conf: {
      hint: "Deux mots qui se prononcent pareil sont peut-être confondus ici. Relis bien ce mot.",
      full: "Vérifie la nature du mot (verbe, nom, pronom…) pour choisir la bonne orthographe entre les deux mots qui se ressemblent."
    },

    // — Accords (A) —
    gn: {
      hint: "Un mot du groupe nominal ne s'accorde pas avec les autres. Cherche le nom principal : est-il singulier ou pluriel, masculin ou féminin ?",
      full: "Accorde tous les mots du groupe nominal (déterminant, nom, adjectif) en genre et en nombre avec le nom principal."
    },
    ppas: {
      hint: "Le participe passé de ce verbe ne semble pas correctement accordé.",
      full: "Avec « être », le participe passé s'accorde avec le sujet. Avec « avoir », il s'accorde avec le COD seulement s'il est placé avant le verbe."
    },

    // — Majuscules (M) —
    maj: {
      hint: "Une majuscule semble manquer ou être mal placée ici.",
      full: "Vérifie l'usage de la majuscule à cet endroit (début de phrase, nom propre…)."
    },
    minis: {
      hint: "Vérifie l'usage de la majuscule pour ce nom.",
      full: "Ce type de nom prend une majuscule particulière — vérifie l'orthographe exacte."
    },

    // — Ponctuation (P) —
    virg: {
      hint: "Il manque peut-être une virgule avant ce mot.",
      full: "Une virgule est généralement nécessaire avant « mais », « car » à l'intérieur d'une phrase."
    },
    esp: {
      hint: "Il y a peut-être un espace en trop à cet endroit.",
      full: "Supprime l'espace superflu."
    },
    tab: {
      hint: "Il y a peut-être une tabulation inutile ici.",
      full: "Supprime la tabulation superflue."
    },
    nbsp: {
      hint: "Vérifie l'espace avant ce signe de ponctuation.",
      full: "Devant « ! », « ? », « : », « ; », on utilise un espace insécable en français."
    },
    unit: {
      hint: "Vérifie l'espace avant cette unité de mesure.",
      full: "On laisse un espace insécable entre un nombre et son unité (ex. « 12 cm »)."
    },

    // — Orthographe (O) —
    tu: {
      hint: "Vérifie si ce mot a besoin d'un trait d'union.",
      full: "Regarde dans le dictionnaire si ce mot composé s'écrit avec un trait d'union."
    },
    mapos: {
      hint: "Il manque peut-être une apostrophe après cette lettre.",
      full: "Une apostrophe est nécessaire après cette lettre isolée (l', d', s'…)."
    },
    loc: {
      hint: "Cette expression toute faite semble mal orthographiée.",
      full: "Vérifie l'orthographe exacte de cette expression dans le dictionnaire."
    },
    mc: {
      hint: "Vérifie l'orthographe de ce mot composé.",
      full: "Ce mot composé ne semble pas exister tel quel — vérifie dans le dictionnaire."
    },
    num: {
      hint: "Relis attentivement ce nombre.",
      full: "Utilise le chiffre 0, pas la lettre O, pour écrire un nombre."
    },
    orth: {
      hint: "Ce mot ne semble pas exister tel quel. Relis-le attentivement, syllabe par syllabe.",
      full: "Ce mot est mal orthographié."
    },

    // — Son (S) —
    eleu: {
      hint: "Relis cette phrase à voix haute : quelque chose sonne mal ici.",
      full: "Devant une voyelle, certains mots changent de forme pour que la phrase soit plus facile à prononcer (ex. « le » devient « l' »)."
    }
  };

  /**
   * @param {{code:string, family:string, ruleId:string, suggestion:?string}} erreur
   * @param {boolean} isFinal — correction finale (V3 ou fin anticipée) : révèle la suggestion.
   * @returns {string}
   */
  function getMessage(erreur, isFinal) {
    let base = null;

    for (const oPattern of RULE_PATTERNS) {
      if (oPattern.test.test(erreur.ruleId || '')) {
        base = isFinal ? oPattern.full : oPattern.hint;
        break;
      }
    }

    if (base === null) {
      const oFamily = FAMILY_MESSAGES[erreur.family];
      base = oFamily ? (isFinal ? oFamily.full : oFamily.hint)
                      : (isFinal ? "Vérifie bien ce passage." : "Il y a quelque chose à revoir ici.");
    }

    if (isFinal && erreur.suggestion) {
      base += ` Suggestion : « ${erreur.suggestion} ».`;
    }

    return base;
  }

  return { getMessage };
})();

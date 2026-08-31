/* ═══════════════════════════════════════════════════════════════════════
   competence-preview.js — Aperçu admin en lecture seule des banques de
   questions d'une compétence (level1Bank/level2Bank/level3Bank & co.).

   Réservé au rôle admin (lfmAuth.getProfile().role === 'admin') — PAS
   enseignant. Les banques vont grossir (jusqu'à ~50 items/niveau, dont
   seulement 10 tirés par session côté élève) : un enseignant y verrait un
   dump illisible sans valeur pédagogique. Cette vue exhaustive sert
   uniquement à l'admin pour auditer l'intégralité du contenu.

   Pas encore câblé sur une page (voir résumé de session pour le point
   d'accès admin à définir). Le module lit directement window.EXERCISE_DATA
   (déjà chargé par data/index.js — même source que scripts/audit-questions.js) :
   aucune donnée dupliquée, aucun appel Supabase.

   La diversité des ~70 moteurs d'exercice (data/*.js) ne permet pas un
   texte "parfait" pour chaque format ; describeQA() couvre les types
   d'interaction courants (mots-cliquables, choix-étiquette, classification-
   étapes, mcq, match, col-sort, click-sort, texte-a-trous...) puis retombe
   sur une lecture générique des champs (answer/targets/signe/lo-hi/...),
   et en dernier recours sur un dump clé:valeur brut — jamais un aperçu vide.
   ═══════════════════════════════════════════════════════════════════════ */

const CompetencePreview = (() => {

  /* ── 1. Rôle admin uniquement (résolu une seule fois, mis en cache) ─────── */
  let roleCheckPromise = null;

  function checkAdmin() {
    if (roleCheckPromise) return roleCheckPromise;
    roleCheckPromise = (async () => {
      if (typeof lfmAuth === 'undefined') return false;
      try {
        const session = await lfmAuth.getSession();
        if (!session || !session.user) return false;
        const profile = await lfmAuth.getProfile();
        return !!profile && profile.role === 'admin';
      } catch (e) {
        console.warn('[CompetencePreview] role check failed:', e);
        return false;
      }
    })();
    return roleCheckPromise;
  }

  /* ── 2. Extraction des banques par niveau (portée depuis scripts/audit-
     questions.js — mêmes conventions de nommage level1Bank/lvl1/step1Pool/
     bank+level/pools/tableaux non numérotés). ────────────────────────── */
  const NUMBERED_KEY_RE = /^(?:level|lvl|step)(\d+)(?:Bank|Words|Pool)?$/i;
  const UNNUMBERED_BANK_RE = /(bank|identtexts)$/i;

  function extractLevelBuckets(ex) {
    // Cas particulier : type "produire-3-formes" — banque unique réutilisée
    // à chaque palier, la progression venant du nombre de formes exigées
    // par le moteur, pas d'un sous-ensemble de contenu par niveau (même
    // logique que scripts/audit-questions.js).
    if (ex.type === "produire-3-formes" && Array.isArray(ex.bank) && typeof ex.paliers === "number") {
      return [{
        level: 1,
        label: `Banque unique (${ex.bank.length} items) × ${ex.paliers} paliers de rigueur croissante`,
        items: ex.bank,
        omitCountSuffix: true,
      }];
    }

    if (ex.pools && typeof ex.pools === "object" && !Array.isArray(ex.pools)) {
      return Object.entries(ex.pools).map(([key, items], i) => ({
        level: i + 1,
        label: `Niveau ${i + 1}`,
        items: Array.isArray(items) ? items : [],
      }));
    }

    const arrayKeys = Object.keys(ex).filter((k) => Array.isArray(ex[k]));
    const numbered = new Map();
    const unnumbered = [];
    let plainBankWithLevelField = null;
    let plainBankLevelKey = null; // "level" ou "difficulty" selon le champ trouvé

    for (const key of arrayKeys) {
      if (key === "levels") continue;

      const numberedMatch = key.match(NUMBERED_KEY_RE);
      if (numberedMatch) {
        const n = parseInt(numberedMatch[1], 10);
        numbered.set(n, (numbered.get(n) || []).concat(ex[key]));
        continue;
      }

      // "level" (banques manuellement regroupées) ou "difficulty" (ex. type
      // accord-ecrit : une banque unique filtrée par palier de difficulté).
      if (key === "bank" && ex[key].length && ex[key][0] && typeof ex[key][0] === "object") {
        if ("level" in ex[key][0]) {
          plainBankWithLevelField = ex[key];
          plainBankLevelKey = "level";
          continue;
        }
        if ("difficulty" in ex[key][0]) {
          plainBankWithLevelField = ex[key];
          plainBankLevelKey = "difficulty";
          continue;
        }
      }

      if (UNNUMBERED_BANK_RE.test(key)) {
        unnumbered.push({ key, items: ex[key] });
      }
    }

    if (numbered.size > 0) {
      const sortedNs = [...numbered.keys()].sort((a, b) => a - b);
      return sortedNs.map((n) => ({ level: n, label: `Niveau ${n}`, items: numbered.get(n) }));
    }

    if (plainBankWithLevelField) {
      const order = [];
      const groups = new Map();
      for (const item of plainBankWithLevelField) {
        const lvl = item[plainBankLevelKey];
        if (!groups.has(lvl)) { groups.set(lvl, []); order.push(lvl); }
        groups.get(lvl).push(item);
      }
      return order.map((lvl, i) => ({ level: i + 1, label: `Niveau ${i + 1}`, items: groups.get(lvl) }));
    }

    if (unnumbered.length > 0) {
      return unnumbered.map((u, i) => ({ level: i + 1, label: `Niveau ${i + 1}`, items: u.items }));
    }

    return [];
  }

  /* ── 3. Extraction question/réponse d'un item ───────────────────────────── */
  const MAIN_TEXT_FIELDS = ["instruction", "phrase", "sentence", "question", "texte", "text", "prompt", "display", "enonce"];
  const APPEND_FIELDS = ["word", "mot", "subject"];
  const METADATA_BLACKLIST = new Set([
    "level", "mode", "inputMode", "choices", "answer", "answers", "explication", "feedback",
    "note", "emoji", "auxVerb", "classifyChoices", "step1Targets", "step2Targets",
    "step3Targets", "step2Answer", "step3Answer", "targets", "backLink", "v",
    "pqp", "id", "type", "hint", "piege", "justif",
    "instruction", "phrase", "sentence", "question", "texte", "text", "prompt", "display", "enonce",
    "reponse", "reponses", "solution", "corrects",
  ]);

  const isPrimitive = (v) => typeof v === "string" || typeof v === "number" || typeof v === "boolean";

  function fracOf(v) {
    if (!v || typeof v !== "object") return null;
    const n = v.num !== undefined ? v.num : v.numerator;
    const d = v.den !== undefined ? v.den : v.denominator;
    return (isPrimitive(n) && isPrimitive(d)) ? `${n}/${d}` : null;
  }

  function flattenFields(obj, prefix, depth) {
    const out = [];
    for (const [k, v] of Object.entries(obj)) {
      if (!prefix && METADATA_BLACKLIST.has(k)) continue;
      const label = prefix ? `${prefix}.${k}` : k;
      if (isPrimitive(v)) {
        out.push(`${label} : ${v}`);
      } else if (Array.isArray(v) && v.every(isPrimitive)) {
        out.push(`${label} : ${v.join(", ")}`);
      } else if (v && typeof v === "object" && !Array.isArray(v) && depth < 2) {
        out.push(...flattenFields(v, label, depth + 1));
      }
    }
    return out;
  }

  /* Comparaisons/rangements/fractions isolées sans champ texte (fractions,
     nombres entiers/décimaux — "droite graduée", "encadrer", "comparer"). */
  function describeNumeric(item) {
    const left = fracOf(item.left), right = fracOf(item.right);
    if (left && right) {
      return { q: `${left}  □  ${right}`, a: item.answer != null ? String(item.answer) : "" };
    }
    if (isPrimitive(item.left) && isPrimitive(item.right)) {
      return { q: `${item.left}  □  ${item.right}`, a: item.answer != null ? String(item.answer) : "" };
    }
    if (isPrimitive(item.a) && isPrimitive(item.b)) {
      return { q: `${item.a}  □  ${item.b}`, a: item.signe != null ? String(item.signe) : "" };
    }

    /* Vrai/faux sur un énoncé d'encadrement (encadrer-decimaux type D). */
    if (typeof item.enonce === "string" && typeof item.reponse === "boolean") {
      return { q: `Vrai ou faux ? ${item.enonce}`, a: item.reponse ? "Vrai" : `Faux${item.explication ? " — " + item.explication : ""}` };
    }

    /* Intrus dans une liste (ranger-decimaux type D/E) — vérifié AVANT le
       rangement générique ci-dessous, qui matcherait sinon en premier sur
       le même champ `nombres`/`liste` sans jamais trouver de `ordre`. */
    const intrusList = Array.isArray(item.nombres) ? item.nombres : Array.isArray(item.liste) ? item.liste : null;
    if (intrusList && item.intrus !== undefined) {
      return { q: `Trouver l'intrus parmi : ${intrusList.join(" ; ")}`, a: String(item.intrus) };
    }

    /* Plus grand nombre parmi une liste (comparer-decimaux type E). */
    if (Array.isArray(item.nombres) && item.plus_grand !== undefined) {
      return { q: `Quel est le plus grand nombre parmi : ${item.nombres.join(" ; ")} ?`, a: String(item.plus_grand) };
    }

    const list = Array.isArray(item.nombres) ? item.nombres : Array.isArray(item.numbers) ? item.numbers : null;
    if (list) {
      let ordered = Array.isArray(item.ordre) ? item.ordre : Array.isArray(item.answer) ? item.answer : null;
      if (!ordered) {
        /* Pas d'ordre stocké dans la donnée (ex. valeurs équivalentes type
           "3,10"/"3,1") : on le recalcule nous-mêmes plutôt que de laisser
           la réponse vide. */
        ordered = list
          .map((s) => ({ s, v: parseFloat(String(s).replace(",", ".")) }))
          .sort((x, y) => (item.sens === "décroissant" ? y.v - x.v : x.v - y.v))
          .map((p) => p.s);
      }
      const label = item.sens ? `Ranger dans l'ordre ${item.sens} : ` : "Ranger : ";
      return { q: `${label}${list.join(" ; ")}`, a: ordered.join(" ; ") };
    }

    const self = fracOf(item);
    if (self) {
      if (isPrimitive(item.lo) && isPrimitive(item.hi)) {
        return { q: `Encadrer ${self} entre deux entiers consécutifs`, a: `${item.lo} et ${item.hi}` };
      }
      return { q: `Placer ${self} sur la droite graduée`, a: self };
    }

    if (isPrimitive(item.min) && isPrimitive(item.max) && (isPrimitive(item.arrow) || item.answer != null)) {
      return { q: `Droite graduée de ${item.min} à ${item.max}`, a: item.answer != null ? String(item.answer) : String(item.arrow) };
    }

    /* Encadrement à rangs multiples (encadrer-decimaux type D niveau 2/3). */
    if (isPrimitive(item.nombre) && Array.isArray(item.encadrements)) {
      return {
        q: `Encadrer ${item.nombre} à différents rangs`,
        a: item.encadrements.map((e) => `${e.rang} : ${e.inf} et ${e.sup}`).join(" ; "),
      };
    }

    /* Encadrement par déduction d'une seule borne, l'autre étant donnée
       (encadrer-decimaux type C : champ "sup"/"inf" + valeur connue). */
    if (isPrimitive(item.nombre) && isPrimitive(item.champ) && isPrimitive(item.known)) {
      const label = item.champ === "sup" ? "supérieure" : "inférieure";
      return {
        q: `Encadrer ${item.nombre} : quelle est la borne ${label} (l'autre borne est ${item.known}) ?`,
        a: item.reponse != null ? String(item.reponse) : "",
      };
    }

    /* Arrondi au dixième le plus proche (encadrer-decimaux type F niveau 3). */
    if (isPrimitive(item.nombre) && isPrimitive(item.dixieme_inf) && isPrimitive(item.dixieme_sup) && item.arrondi != null) {
      return {
        q: `Arrondir ${item.nombre} au dixième le plus proche (entre ${item.dixieme_inf} et ${item.dixieme_sup})`,
        a: String(item.arrondi),
      };
    }

    if (isPrimitive(item.nombre) && (isPrimitive(item.inf) || isPrimitive(item.sup))) {
      return { q: `Encadrer ${item.nombre}`, a: `${item.inf != null ? item.inf : "?"} … ${item.sup != null ? item.sup : "?"}` };
    }

    /* QCM de décomposition (composer-decimaux forme "E" : nombre + choix +
       index de la bonne décomposition). */
    if (isPrimitive(item.nombre) && Array.isArray(item.choix) && typeof item.reponse_index === "number") {
      return { q: `Quelle décomposition correspond à ${item.nombre} ?`, a: item.choix[item.reponse_index] };
    }

    /* Décomposition d'un nombre décimal en unités de numération
       (decomposer-decimaux : { decimal, entier, d, c?, m? }). */
    if (isPrimitive(item.decimal) && isPrimitive(item.entier) && isPrimitive(item.d) && item.champ === undefined) {
      const parts = [`${item.entier} unité${Math.abs(item.entier) > 1 ? "s" : ""}`, `${item.d} dixième${item.d > 1 ? "s" : ""}`];
      if (item.c !== undefined) parts.push(`${item.c} centième${item.c > 1 ? "s" : ""}`);
      if (item.m !== undefined) parts.push(`${item.m} millième${item.m > 1 ? "s" : ""}`);
      return { q: `Décomposer ${item.decimal}`, a: parts.join(" + ") };
    }

    /* Composition d'un nombre décimal à partir d'une écriture décomposée
       (composer-decimaux : { decomp, reponse }) — la réponse elle-même est
       déjà reprise par le chaînage générique de describeGeneric (reponse). */
    if (isPrimitive(item.decomp)) {
      return { q: `Écris en écriture décimale : ${item.decomp}`, a: "" };
    }

    /* Intercalation d'un nombre entre deux bornes (intercaler-decimaux,
       comparer-decimaux type D/E) — sans réponse fixe unique sauf si un
       champ reponse/reponses/corrects existe déjà (repris par le chaînage
       générique de describeGeneric avant d'arriver ici). */
    const OPEN_ANSWER = "(réponse libre entre les deux bornes)";
    if (isPrimitive(item.inf) && isPrimitive(item.sup) && item.nombre === undefined) {
      return { q: `Intercaler un nombre entre ${item.inf} et ${item.sup}`, a: OPEN_ANSWER };
    }
    if (isPrimitive(item.min) && isPrimitive(item.max)) {
      return { q: `Intercaler un nombre entre ${item.min} et ${item.max}`, a: OPEN_ANSWER };
    }

    return null;
  }

  /* ── 3bis. Formateurs dédiés par moteur d'exercice (ex.type) ─────────────
     Pour les compétences dont les items ne portent pas leur propre `type`
     (mots-cliquables/mcq/...) et dont la forme ne se laisse pas deviner par
     les heuristiques génériques ci-dessus/dessous — vérifié AVANT tout le
     reste de describeQA. Chaque formateur retourne null pour laisser la
     main aux heuristiques génériques si la forme réelle de l'item diffère
     de ce qui est attendu (ex. sentences[] déjà géré ailleurs). ─────────── */
  function verbLabel(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (v.aux && v.participle) return `${v.aux} ${v.participle}`;
    return String(v);
  }

  function choiceAnswer(item) {
    if (Array.isArray(item.choices) && typeof item.correct === "number") return item.choices[item.correct];
    return null;
  }

  function stripMarkHtml(html) {
    return String(html)
      .replace(/<(?:mark|span)[^>]*>(.*?)<\/(?:mark|span)>/g, "**$1**")
      .replace(/<[^>]+>/g, "");
  }

  const ENGINE_HANDLERS = {
    "identifier-type-phrase-niveaux": (item) => {
      if (item.correctType !== undefined) {
        return { q: `Quel est le type de cette phrase ? — ${item.sentence}`, a: item.correctType };
      }
      if (item.isNegative !== undefined) {
        return { q: `Quelle est la forme de cette phrase ? — ${item.sentence}`, a: item.isNegative ? "Forme négative" : "Forme affirmative" };
      }
      if (item.reponse !== undefined) {
        return { q: `Transforme cette phrase à la forme exclamative (« Comme… ! ») — ${item.sentence}`, a: item.reponse };
      }
      return null;
    },

    "placer-fraction-droite-niveaux": (item) => {
      if (item.kind !== "mixed") return null;
      const rep = (item.reperer || []).map((r) => `${r.letter}=${r.num}/${r.den}`).join(", ");
      const pl  = (item.placer  || []).map((p) => `${p.letter}=${p.num}/${p.den}`).join(", ");
      const q = rep
        ? `Lire l'abscisse de ${rep} puis placer ${pl} (exemple ; item tiré aléatoirement à l'exécution)`
        : `Placer ${pl} (exemple ; item tiré aléatoirement à l'exécution)`;
      return { q, a: rep ? `${rep}, ${pl}` : pl };
    },

    "fraction-decimale-grille-droite-niveaux": (item) => {
      if (item.num == null || item.den == null) return null;
      if (item.level === 1) {
        return { q: `Colorier la grille (bande de 10) et placer ${item.num}/${item.den} sur la droite 0→1 (exemple ; item tiré aléatoirement à l'exécution)`, a: `${item.num}/${item.den}` };
      }
      if (item.level === 2) {
        const d = Math.floor(item.num / 10), c = item.num % 10;
        return { q: `Colorier la grille 10×10, placer ${item.num}/${item.den} sur la droite, puis décomposer (exemple ; item tiré aléatoirement à l'exécution)`, a: `${item.num}/${item.den} = ${d} dixième(s) + ${c} centième(s)` };
      }
      const unit = Math.floor(item.num / item.den);
      const rem  = item.num % item.den;
      const d = item.den === 10 ? rem : Math.floor(rem / 10);
      const c = item.den === 10 ? 0   : rem % 10;
      const trapNote = item.hasTrap ? " + piège vrai/faux sur une écriture équivalente" : "";
      return { q: `Colorier plusieurs grilles, placer ${item.num}/${item.den} au-delà de 1, puis décomposer${trapNote} (exemple ; item tiré aléatoirement à l'exécution)`, a: `${item.num}/${item.den} = ${unit} unité(s) + ${d} dixième(s) + ${c} centième(s)` };
    },

    "lire-fraction": (item) => {
      if (item.parts == null || item.colored == null) return null;
      const shapeLabel = item.shape === "circle" ? "disque" : item.shape === "rect" ? "grille" : "bande";
      return {
        q: `Quelle fraction de la figure (${shapeLabel} partagée en ${item.parts}) est coloriée ? (${item.colored} partie(s) coloriée(s))`,
        a: `${item.colored}/${item.parts}`,
      };
    },

    "fractions-problemes": (item) => {
      if (item.resultat != null) {
        return { q: item.question || item.instruction || "", a: `${item.resultat}${item.unite ? " " + item.unite : ""}` };
      }
      if (Array.isArray(item.accept)) {
        return { q: item.question || item.instruction || "", a: item.accept.join(" / ") };
      }
      return null;
    },

    "reperer-propositions-niveaux": (item) => {
      if (!Array.isArray(item.parts)) return null;
      const n = item.parts.length;
      const detail = item.parts.map((p, i) => `« ${p} » (verbe : ${verbLabel(item.verbs && item.verbs[i])})`).join(" ; ");
      const links = Array.isArray(item.linkTypes) && item.linkTypes.length ? ` — liens : ${item.linkTypes.join(", ")}` : "";
      return { q: item.instruction || "Repère les propositions de la phrase.", a: `${n} proposition${n > 1 ? "s" : ""} : ${detail}${links}` };
    },

    "identifier-juxtaposition-niveaux": (item) => {
      if (item.partA == null) return null;
      return {
        q: item.instruction || "",
        a: `Proposition 1 : « ${item.partA} » (verbe : ${verbLabel(item.verbA)}) — Proposition 2 : « ${item.partB} » (verbe : ${verbLabel(item.verbB)})`,
      };
    },

    "identifier-subordination-niveaux": (item) => {
      if (item.partA == null) return null;
      if (item.verbA !== undefined || item.verbB !== undefined) {
        return {
          q: item.instruction || "",
          a: `Principale : « ${item.partA} » (verbe : ${verbLabel(item.verbA)}) — Subordonnée (${item.connector}) : « ${item.partB} » (verbe : ${verbLabel(item.verbB)})`,
        };
      }
      if (item.link !== undefined) {
        return { q: item.instruction || "", a: `« ${item.link} »` };
      }
      return null;
    },

    "distinguer-coordination-subordination-niveaux": (item) => {
      if (item.partA == null) return null;
      if (item.verbA !== undefined || item.verbB !== undefined) {
        return {
          q: item.instruction || "",
          a: `Verbe 1 : ${verbLabel(item.verbA)} — Verbe 2 : ${verbLabel(item.verbB)} — connecteur « ${item.connector} » (${item.connectorType})`,
        };
      }
      if (item.link !== undefined) {
        return { q: item.instruction || "", a: `« ${item.link} » (${item.linkType})` };
      }
      return null;
    },

    "distinguer-phrase-simple-complexe-niveaux": (item) => {
      if (item.template !== undefined) {
        return { q: item.template, a: item.blankAnswer || item.connector };
      }
      return null;
    },

    "produire-3-formes": (item) => {
      if (item.modelIntonation == null) return null;
      const forms = [
        item.modelIntonation && `Intonation : ${item.modelIntonation}`,
        item.modelEcQ && `Est-ce que : ${item.modelEcQ}`,
        item.modelInv && `Inversion : ${item.modelInv}`,
      ].filter(Boolean).join(" | ");
      return { q: item.sentence ? `Transforme en 3 formes interrogatives : ${item.sentence}` : "", a: forms };
    },

    "epithete-attribut-niveaux": (item) => {
      if (item.isStateVerb !== undefined) {
        return {
          q: `Le verbe « ${item.verb} » est-il un verbe d'état ? — ${item.sentence}`,
          a: item.isStateVerb ? `Oui, verbe d'état → adjectif attribut du sujet` : `Non → adjectif épithète`,
        };
      }
      if (item.nature !== undefined) {
        const label = item.nature === "epithete" ? "épithète" : "attribut du sujet";
        return { q: `Quelle est la nature de l'adjectif « ${item.adjective} » ? — ${item.sentence}`, a: label };
      }
      if (Array.isArray(item.acceptedAnswers)) {
        return {
          q: `${item.instruction || ""} — ${item.original || ""}`.trim(),
          a: item.acceptedAnswers[0] + (item.acceptedAnswers.length > 1 ? " (ou variante équivalente)" : ""),
        };
      }
      return null;
    },

    "ecn-niveaux": (item) => {
      if (Array.isArray(item.words) && item.noyauIdx != null) {
        const noyau = item.words[item.noyauIdx];
        const expIdx = Array.isArray(item.expansionIdx) ? item.expansionIdx : [item.expansionIdx];
        const expansion = expIdx.map((i) => item.words[i]).join(" ");
        const natureLabel = item.type === "epithete" ? "épithète" : "complément du nom";
        return {
          q: `Dans le groupe nominal « ${item.words.join(" ")} », quelle est la nature de « ${expansion} » ?`,
          a: `${natureLabel} (nom-noyau : « ${noyau} »)`,
        };
      }
      if (item.gn != null && item.nature != null) {
        const natureLabel = item.nature === "epithete" ? "épithète" : "complément du nom";
        return { q: `Dans le groupe nominal « ${item.gn} », quelle est la nature de « ${item.expansion} » ?`, a: natureLabel };
      }
      if (item.prompt != null && Array.isArray(item.acceptedAnswers)) {
        return {
          q: item.prompt,
          a: item.acceptedAnswers[0] + (item.acceptedAnswers.length > 1 ? " (ou variante équivalente)" : ""),
        };
      }
      return null;
    },

    "psc-niveaux": (item) => {
      if (!Array.isArray(item.words) || !item.testQ) return null;
      return { q: `${item.testQ} — phrase : « ${item.words.join(" ")} »`, a: item.testA };
    },

    "gnsp-niveaux": (item) => {
      if (Array.isArray(item.words) && item.testQ) {
        return { q: `${item.testQ} — phrase : « ${item.words.join(" ")} »`, a: item.testA };
      }
      if (item.displayHtml != null && item.pronoun != null) {
        const gnsLabel = item.gnsText || item.gns || "";
        const noyauLabel = item.noyau ? `, noyau : « ${item.noyau} »` : "";
        return {
          q: `Remplace le groupe souligné par le bon pronom sujet : ${stripMarkHtml(item.displayHtml)}`,
          a: `${item.pronoun}${gnsLabel ? ` (GNS : « ${gnsLabel} »${noyauLabel})` : ""}`,
        };
      }
      return null;
    },

    "transformer-phrase-niveaux": (item) => {
      if (item.modelNeg == null) return null;
      return { q: `Transforme cette phrase à la forme négative : ${item.sentence}`, a: item.modelNeg };
    },

    "articles-def-indef-niveaux": (item) => {
      if (item.sentences) return null; // forme multi-phrases déjà gérée par describeGeneric
      if (typeof item.html !== "string") return null;
      const clean = stripMarkHtml(item.html);
      const label = item.answer === "defini" ? "article défini" : item.answer === "indefini" ? "article indéfini" : item.answer;
      return { q: clean, a: label };
    },

    "det-demo-poss-niveaux": (item) => {
      const detLabel = (v) => (v === "demonstratif" ? "déterminant démonstratif" : v === "possessif" ? "déterminant possessif" : v);
      if (typeof item.html === "string") {
        return { q: stripMarkHtml(item.html), a: detLabel(item.answer) };
      }
      if (item.sentence != null && Array.isArray(item.targets)) {
        return {
          q: item.sentence,
          a: item.targets.map((t) => `${t.word} (${detLabel(t.answer)})`).join(", "),
        };
      }
      return null;
    },

    "comprendre-implicites-niveaux": (item) => {
      const ans = choiceAnswer(item);
      if (ans == null) return null;
      return { q: `${item.question || ""} — texte : « ${item.text || ""} »`, a: ans };
    },

    "comprendre-mot-contexte-niveaux": (item) => {
      const ans = choiceAnswer(item);
      if (ans == null) return null;
      return { q: `${item.question || ""} — texte : « ${item.text || ""} »`, a: ans };
    },

    "genre-niveaux": (item) => {
      if (item.masculine == null) return null;
      return { q: `Mets au féminin : ${item.masculine}`, a: item.answer };
    },

    "mots-invariables-serie": (item) => {
      if (typeof item === "string") return { q: "Mot invariable à connaître", a: item };
      if (typeof item !== "object" || item == null || item.word == null) return null;
      return {
        q: item.context ? `Mot invariable à retenir, en contexte : « ${item.context} »` : `Mot invariable à retenir`,
        a: item.word,
      };
    },

    "infinitif-groupe-niveaux": (item) => {
      if (item.infinitive == null) return null;
      return { q: item.sentence, a: `${item.infinitive}${item.group ? ` (${item.group})` : ""}` };
    },

    "donneur-niveaux": (item) => {
      if (item.gn != null && item.noun != null) {
        return {
          q: `Dans le groupe nominal « ${item.gn} », quel mot commande (donne) l'accord ?`,
          a: `${item.noun}${item.genre || item.nombre ? ` (${[item.genre, item.nombre].filter(Boolean).join(", ")})` : ""}`,
        };
      }
      if (item.sentence != null && item.subjectDisplay != null) {
        return {
          q: `Dans la phrase « ${item.sentence} », quel est le sujet qui commande l'accord du verbe « ${item.verb} » ?`,
          a: `${item.subjectDisplay}${item.genre || item.nombre ? ` (${[item.genre, item.nombre].filter(Boolean).join(", ")})` : ""}`,
        };
      }
      return null;
    },

    "valeur-position": (item) => {
      if (typeof item === "number") {
        return { q: `Décomposer ${item} en unités de numération (milliers/centaines/dizaines/unités)`, a: "(décomposition positionnelle)" };
      }
      if (typeof item !== "object" || item == null) return null;
      if (item.fr !== undefined) {
        return { q: `Nombre : ${item.n}`, a: `s'écrit « ${item.fr} »` };
      }
      if (item.posName !== undefined && item.placeValue !== undefined) {
        return { q: `Combien y a-t-il de ${item.posName} dans ${item.n} ?`, a: String(Math.floor(item.n / item.placeValue)) };
      }
      if (item.posName !== undefined && item.pos !== undefined) {
        const digit = Math.floor(item.n / Math.pow(10, item.pos)) % 10;
        return { q: `Clique sur le chiffre des ${item.posName} dans ${item.n}`, a: String(digit) };
      }
      if (item.pos !== undefined) {
        const digit = Math.floor(item.n / Math.pow(10, item.pos)) % 10;
        const value = digit * Math.pow(10, item.pos);
        return { q: `Quelle est la valeur du chiffre en position ${item.pos} (depuis la droite) dans ${item.n} ?`, a: `${digit} (valeur : ${value})` };
      }
      return null;
    },

    "decomposer-nombre-entier-niveaux": (item) => {
      if (!Array.isArray(item.digits) || !Array.isArray(item.positions)) return null;
      const isAdd = item.format === "additive";
      const parts = item.digits.map((d, i) => {
        const pos = item.positions[i];
        return isAdd ? `${d * pos.mult} (${pos.name.toLowerCase()})` : `${d} × ${pos.mult} (${pos.name.toLowerCase()})`;
      });
      let a = parts.join(" + ");
      if (item.trap) {
        a += ` — piège : « a-t-il un chiffre des ${item.trap.name.toLowerCase()} ? » → Non`;
      }
      const fmtLabel = isAdd ? "écriture additive" : "écriture en produits";
      return { q: `Décomposer ${item.display} (${fmtLabel} — exemple ; format tiré aléatoirement à l'exécution)`, a };
    },

    "composer-nombre-entier-niveaux": (item) => {
      if (!item.display || typeof item.value !== "number") return null;
      return { q: `${item.display} = ? (exemple ; format tiré aléatoirement à l'exécution)`, a: String(item.value) };
    },

    "encadrer-nombre-entier-niveaux": (item) => {
      if (item.lower === undefined) return null;
      return { q: `Encadrer ${item.display} à la ${item.rang} la plus proche`, a: `${item.lower} et ${item.upper}` };
    },

    "placer-decimaux-droite-niveaux": (item) => {
      const d = item.droite || {};
      const rangeTxt = `de ${d.min} à ${d.max}`;
      switch (item.mode) {
        case "placer":
          return { q: `Placer ${item.nombre} sur la droite graduée (${rangeTxt})`, a: item.equivalent ? `${item.nombre} (= ${item.equivalent})` : String(item.nombre) };
        case "reperer":
          return { q: `Quel nombre correspond au point ${item.point_label} sur la droite graduée (${rangeTxt}) ?`, a: String(item.valeur) };
        case "associer":
          return {
            q: `Associer les étiquettes ${(item.etiquettes_a_placer || []).join(", ")} à leur place sur la droite graduée (${rangeTxt})`,
            a: (item.equivalents || []).map((g) => g.join(" = ")).join(" ; ") || (item.etiquettes_a_placer || []).join(", "),
          };
        case "placer_multiple":
          return { q: `Placer les nombres ${(item.nombres || []).join(", ")} sur la droite graduée (${rangeTxt})`, a: (item.nombres || []).join(", ") };
        case "qcm_estimation":
          return { q: `Quel nombre correspond approximativement au point ${item.point_label} ? Choix : ${(item.choix || []).join(", ")}`, a: item.reponse };
        default:
          return null;
      }
    },

    "associer-decimal-fraction-niveaux": (item) => {
      const d = item.display || {};
      if (item.mode === "fraction-to-decimal") {
        return { q: `Écris en écriture décimale : ${d.num}/${d.den}`, a: item.answer ? item.answer.str : "" };
      }
      if (item.mode === "decimal-to-fraction") {
        return { q: `Écris en fraction décimale : ${d.value}`, a: item.answer ? `${item.answer.num}/${item.answer.den}` : "" };
      }
      if (item.mode === "mcq") {
        const stim = d.type === "fraction" ? `${d.num}/${d.den}` : d.value;
        const correct = Array.isArray(item.choices) && typeof item.correctIdx === "number" ? item.choices[item.correctIdx].label : "";
        return { q: `Quelle écriture correspond à ${stim} ?`, a: correct };
      }
      return null;
    },
  };

  function describeGeneric(item) {
    if (Array.isArray(item.tokens)) {
      const q = item.tokens.map((t) => (t && t.pqp ? "___" : (t && t.t != null ? t.t : ""))).join("");
      const a = item.tokens.filter((t) => t && t.pqp).map((t) => t.t).join(", ");
      return { q, a: a || "—" };
    }

    /* Item multi-phrases (ex. articles-def-indef-niveaux niveau 3) :
       { sentences: [{ sentence, targets: [{ word, answer }] }] } */
    if (Array.isArray(item.sentences)) {
      const q = item.sentences.map((s) => s.sentence || "").join("  /  ");
      const a = item.sentences
        .map((s) => (Array.isArray(s.targets) ? s.targets.map((t) => `${t.word} (${t.answer})`).join(", ") : ""))
        .filter(Boolean)
        .join("  /  ");
      return { q, a: a || "—" };
    }

    let q = "";
    for (const f of MAIN_TEXT_FIELDS) {
      if (typeof item[f] === "string" && item[f].trim()) { q = item[f].trim(); break; }
    }
    for (const f of APPEND_FIELDS) {
      if (typeof item[f] === "string" && item[f].trim() && !q.toLowerCase().includes(item[f].trim().toLowerCase())) {
        q = q ? `${q} — ${item[f].trim()}` : item[f].trim();
      }
    }

    let a = "";
    if (typeof item.answer === "string" || typeof item.answer === "number") a = String(item.answer);
    else if (typeof item.answer === "boolean") a = item.answer ? "Vrai" : "Faux";
    else if (Array.isArray(item.answer)) a = item.answer.join(" → ");
    else if (Array.isArray(item.answers)) a = item.answers.join(", ");
    else if (typeof item.reponse === "string" || typeof item.reponse === "number") a = String(item.reponse);
    else if (typeof item.reponse === "boolean") a = item.reponse ? "Vrai" : "Faux";
    else if (Array.isArray(item.reponses)) a = item.reponses.join(", ");
    else if (Array.isArray(item.corrects)) a = item.corrects.join(", ");
    else if (typeof item.solution === "string") a = item.solution;
    else if (Array.isArray(item.targets) && item.targets.every((t) => typeof t === "string")) a = item.targets.join(" ");
    else if (typeof item.signe === "string") a = item.signe;
    else if (item.step2Answer != null) a = String(item.step2Answer);
    else if (Array.isArray(item.blanks)) {
      a = item.blanks
        .map((b) => (Array.isArray(b.whitelist) ? b.whitelist.join(" / ") : (b.answer != null ? String(b.answer) : "")))
        .filter(Boolean)
        .join(" ; ");
    }

    if (q && a) return { q, a };

    const numeric = describeNumeric(item);
    if (numeric) return { q: q || numeric.q, a: a || numeric.a };

    if (!a) {
      const flat = flattenFields(item, "", 0);
      if (flat.length) a = flat.join(" · ");
    }

    if (q) return { q, a: a || "—" };

    const flat = flattenFields(item, "", 0);
    return { q: flat.join(" · ") || "(aperçu non disponible pour ce format)", a: a || "" };
  }

  /* Dispatch par type d'item (types explicites utilisés par le moteur
     "-niveaux" générique — mots-cliquables, choix-étiquette, classification-
     étapes — et par le moteur vocabulaire — mcq, match, col-sort, click-sort). */
  function describeQA(item, ex) {
    const engineHandler = ex && ENGINE_HANDLERS[ex.type];
    if (engineHandler) {
      const engineResult = engineHandler(item, ex);
      if (engineResult) return engineResult;
    }

    if (typeof item === "string") return { q: item, a: "" };
    if (!item || typeof item !== "object") return { q: String(item), a: "" };

    switch (item.type) {
      case "mots-cliquables": {
        const q = `${item.instruction || "Clique sur le(s) mot(s) demandé(s)."} ${item.sentence || item.phrase || ""}`.trim();
        if (Array.isArray(item.steps)) {
          const a = item.steps
            .map((s) => (Array.isArray(s.targets) ? (s.targets.length ? s.targets.join(" ") : "(aucun mot — rien à cliquer)") : ""))
            .join(" → ");
          return { q, a };
        }
        if (Array.isArray(item.targets)) {
          return { q, a: item.targets.length ? item.targets.join(" ") : "(aucun mot à cliquer — phrase correcte)" };
        }
        return { q, a: "" };
      }

      case "choix-etiquette":
        return {
          q: `${item.instruction || ""} (${item.word || (Array.isArray(item.choices) ? item.choices.join(" · ") : "")})`.trim(),
          a: item.answer != null ? String(item.answer) : "",
        };

      case "classification-etapes": {
        const steps = [];
        if (Array.isArray(item.step1Targets)) steps.push(item.step1Targets.join(" "));
        if (item.step2Answer != null) steps.push(String(item.step2Answer));
        if (item.step3Answer != null) steps.push(String(item.step3Answer));
        return {
          q: `${item.instruction || ""} ${item.sentence || item.phrase || ""}`.trim(),
          a: steps.join(" → ") || "—",
        };
      }

      case "mcq":
      case "qcm":
        return {
          q: item.instruction || item.question || "",
          a: item.answer != null ? String(item.answer) : "",
        };

      case "match":
        return {
          q: item.instruction || "Associer les éléments.",
          a: Array.isArray(item.pairs) ? item.pairs.map((p) => `${p.left} → ${p.right}`).join(" ; ") : "",
        };

      case "col-sort":
        return {
          q: `${item.instruction || ""} (${item.colA || "A"} / ${item.colB || "B"})`.trim(),
          a: Array.isArray(item.items)
            ? item.items.map((sub) => `« ${sub.text} » → ${sub.answer === "A" ? (item.colA || "A") : (item.colB || "B")}`).join(" ; ")
            : "",
        };

      case "click-sort":
        return {
          q: `${item.instruction || ""} (${(item.words || []).join(", ")})`.trim(),
          a: Array.isArray(item.answer) ? item.answer.join(" → ") : (item.answer != null ? String(item.answer) : ""),
        };

      case "texte-a-trous":
      case "gap-saisie":
      case "double-blanc":
        return {
          q: `${item.instruction || ""} ${item.sentence || item.phrase || item.texte || ""}`.trim(),
          a: Array.isArray(item.blanks)
            ? item.blanks.map((b) => (Array.isArray(b.whitelist) ? b.whitelist.join(" / ") : (b.answer != null ? String(b.answer) : ""))).join(" ; ")
            : (item.answer != null ? String(item.answer) : ""),
        };

      case "production-libre":
        return { q: item.instruction || item.consigne || "", a: "(réponse libre — pas de correction automatique)" };

      default:
        return describeGeneric(item);
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ── 4. Modale ────────────────────────────────────────────────────────── */
  let modalEl = null;

  function ensureStyles() {
    if (document.getElementById("cp-preview-styles")) return;
    const style = document.createElement("style");
    style.id = "cp-preview-styles";
    style.textContent = `
      .cp-eye-btn {
        appearance: none; -webkit-appearance: none;
        display: inline-flex; align-items: center; justify-content: center;
        flex: none; width: 22px; height: 22px; margin-left: auto; padding: 0;
        border: none; outline: none; border-radius: 100px; background: rgba(26,45,107,0.08);
        color: var(--color-brand-navy, #1A2D6B); line-height: 1; cursor: pointer;
        transition: background 150ms, transform 150ms, color 150ms;
      }
      .cp-eye-btn:hover { background: rgba(245,166,35,0.25); color: #c47c00; transform: scale(1.08); }
      .cp-eye-btn::-moz-focus-inner { border: 0; }

      .cp-overlay {
        display: none; position: fixed; inset: 0; z-index: 5000;
        background: rgba(16,20,35,0.55); backdrop-filter: blur(2px);
        align-items: center; justify-content: center; padding: 24px;
      }
      .cp-overlay.cp-open { display: flex; }

      .cp-modal {
        background: var(--card-bg, #fff); border-radius: var(--radius-card, 20px);
        width: 100%; max-width: 760px; max-height: 85vh;
        display: flex; flex-direction: column; overflow: hidden;
        box-shadow: var(--shadow-md, 0 10px 30px rgba(16,43,106,0.18));
        font-family: var(--font-body, 'Nunito Sans', sans-serif);
      }

      .cp-modal-header {
        display: flex; align-items: flex-start; justify-content: space-between;
        gap: 12px; padding: 20px 24px; border-bottom: 1px solid var(--border, #E8EDF3);
        background: var(--color-brand-navy, #1A2D6B); color: #fff;
      }
      .cp-modal-eyebrow {
        font-size: 11px; font-weight: 700; text-transform: uppercase;
        letter-spacing: 0.06em; color: var(--color-brand-gold, #F5A623); margin-bottom: 4px;
      }
      .cp-modal-title {
        font-family: var(--font-display, 'Fredoka', sans-serif);
        font-size: 19px; font-weight: 700; margin: 0; color: #fff;
      }
      .cp-modal-close {
        flex: none; width: 32px; height: 32px; border: none; border-radius: 100px;
        background: rgba(255,255,255,0.15); color: #fff; font-size: 15px;
        cursor: pointer; transition: background 150ms;
      }
      .cp-modal-close:hover { background: rgba(255,255,255,0.3); }

      .cp-modal-body { padding: 20px 24px 28px; overflow-y: auto; }

      .cp-level { margin-bottom: 24px; }
      .cp-level:last-child { margin-bottom: 0; }
      .cp-level-title {
        font-family: var(--font-display, 'Fredoka', sans-serif);
        font-size: 15px; font-weight: 700; color: var(--color-brand-navy, #1A2D6B);
        margin: 0 0 10px; padding-bottom: 6px; border-bottom: 2px solid var(--color-niveau-cm1, #1DBFA0);
      }
      .cp-level-count { font-weight: 500; color: var(--muted, #5F6368); font-size: 12px; }
      .cp-level-consigne {
        margin: 0 0 12px; padding: 8px 12px; border-radius: 8px;
        background: rgba(245,166,35,0.12); border-left: 3px solid var(--color-brand-gold, #F5A623);
        font-size: 12.5px; font-style: italic; color: var(--text, #1E2532);
      }

      .cp-qa-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
      .cp-qa-item {
        border: 1px solid var(--border, #E8EDF3); border-radius: 12px; padding: 10px 14px;
        background: var(--bg, #F8FAFC);
      }
      .cp-qa-question { font-size: 13.5px; color: var(--text, #1E2532); line-height: 1.5; }
      .cp-qa-question b { color: var(--color-brand-navy, #1A2D6B); }
      .cp-qa-answer { margin-top: 4px; font-size: 13px; color: var(--text, #1E2532); }
      .cp-qa-answer-label { font-weight: 700; color: var(--color-brand-gold, #c47c00); margin-right: 4px; }

      .cp-empty { color: var(--muted, #5F6368); font-size: 14px; padding: 12px 0; }
    `;
    document.head.appendChild(style);
  }

  function ensureModal() {
    if (modalEl) return modalEl;
    ensureStyles();
    const overlay = document.createElement("div");
    overlay.className = "cp-overlay";
    overlay.id = "cp-overlay";
    overlay.innerHTML = `
      <div class="cp-modal" role="dialog" aria-modal="true" aria-labelledby="cp-modal-title">
        <div class="cp-modal-header">
          <div>
            <div class="cp-modal-eyebrow">Aperçu admin — lecture seule</div>
            <h2 class="cp-modal-title" id="cp-modal-title"></h2>
          </div>
          <button type="button" class="cp-modal-close" aria-label="Fermer l'aperçu">✕</button>
        </div>
        <div class="cp-modal-body" id="cp-modal-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
    overlay.querySelector(".cp-modal-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && overlay.classList.contains("cp-open")) closeModal(); });

    modalEl = overlay;
    return overlay;
  }

  function closeModal() {
    if (modalEl) modalEl.classList.remove("cp-open");
  }

  /* ── Consigne officielle affichée au-dessus de chaque niveau ─────────────
     Priorité : 1) ex.levelDescs (déjà présent dans ~46 compétences, texte
     pédagogique par niveau) 2) une consigne connue en dur pour les moteurs
     où elle est fixe côté exercise.html et absente des données 3) l'
     `instruction` d'item quand elle est identique pour tous les items du
     niveau 4) rien plutôt qu'un texte halluciné. ─────────────────────────── */
  const ENGINE_LEVEL_DESCS = {
    "identifier-type-phrase-niveaux": [
      "Identifier le type : déclarative, interrogative, impérative",
      "Identifier la forme : affirmative ou négative",
      "Transformer une phrase à la forme exclamative",
    ],
    "distinguer-phrase-simple-complexe-niveaux": [
      "Construire une phrase complexe avec un connecteur",
      "Repérer le(s) verbe(s) conjugué(s), puis classer la phrase",
      "Juger seul : phrase simple ou complexe ?",
    ],
  };
  const ENGINE_INSTRUCTIONS = {
    "lire-fraction": "Quelle fraction de la figure est coloriée ?",
  };

  function levelDescFor(ex, bucket) {
    if (!ex.levelDescs) return null;
    const candidates = [String(bucket.level), "niveau" + bucket.level, ex.levels && ex.levels[bucket.level - 1]].filter(Boolean);
    for (const key of candidates) {
      if (ex.levelDescs[key]) return ex.levelDescs[key];
    }
    return null;
  }

  function getSectionConsigne(ex, bucket) {
    const fromLevelDescs = levelDescFor(ex, bucket);
    if (fromLevelDescs) return fromLevelDescs;

    const engineLevels = ENGINE_LEVEL_DESCS[ex.type];
    if (engineLevels && engineLevels[bucket.level - 1]) return engineLevels[bucket.level - 1];

    if (ENGINE_INSTRUCTIONS[ex.type]) return ENGINE_INSTRUCTIONS[ex.type];

    const perItem = bucket.items.map((it) => (it && typeof it === "object" && typeof it.instruction === "string" ? it.instruction.trim() : null));
    const first = perItem[0];
    if (first && perItem.every((x) => x === first)) return first;

    return null;
  }

  function openModal(slug) {
    const ex = window.EXERCISE_DATA && window.EXERCISE_DATA[slug];
    if (!ex) return;

    const overlay = ensureModal();
    overlay.querySelector("#cp-modal-title").textContent = ex.competence || ex.title || slug;

    const buckets = extractLevelBuckets(ex);
    const body = overlay.querySelector("#cp-modal-body");

    if (buckets.length === 0) {
      body.innerHTML = `<p class="cp-empty">Aucune banque de questions détectée pour cette compétence.</p>`;
    } else {
      body.innerHTML = buckets.map((bucket) => {
        const rows = bucket.items.map((item, i) => {
          const { q, a } = describeQA(item, ex);
          return `
            <li class="cp-qa-item">
              <div class="cp-qa-question"><b>${i + 1}.</b> ${escapeHtml(q)}</div>
              <div class="cp-qa-answer"><span class="cp-qa-answer-label">Réponse :</span>${escapeHtml(a || "—")}</div>
            </li>
          `;
        }).join("");
        const consigne = getSectionConsigne(ex, bucket);
        const consigneHtml = consigne ? `<p class="cp-level-consigne">📋 ${escapeHtml(consigne)}</p>` : "";
        return `
          <section class="cp-level">
            <h3 class="cp-level-title">${bucket.label}${bucket.omitCountSuffix ? "" : ` <span class="cp-level-count">(${bucket.items.length} question${bucket.items.length > 1 ? "s" : ""})</span>`}</h3>
            ${consigneHtml}
            <ol class="cp-qa-list">${rows}</ol>
          </section>
        `;
      }).join("");
    }

    overlay.classList.add("cp-open");
  }

  /* ── 5. API publique ─────────────────────────────────────────────────── */
  async function decorate(root) {
    if (!root) return;
    const allowed = await checkAdmin();
    if (!allowed) return;
    if (typeof window.EXERCISE_DATA === "undefined") return;

    ensureStyles();

    root.querySelectorAll(".skill-card[data-exercise-slug]").forEach((card) => {
      if (card.querySelector(".cp-eye-btn")) return;
      const slug = card.dataset.exerciseSlug;
      if (!slug || !window.EXERCISE_DATA[slug]) return;

      const badgesEl = card.querySelector(".skill-badges");
      if (!badgesEl) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cp-eye-btn";
      btn.title = "Aperçu admin des questions";
      btn.setAttribute("aria-label", "Aperçu admin des questions de cette compétence");
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(slug);
      });
      badgesEl.appendChild(btn);
    });
  }

  /* extractLevelBuckets/describeQA : exportées pour réemploi hors de ce
     module (fiche élève enseignant — « Questions les plus ratées », voir
     js/teacher-analytics.js) — fonctions pures, aucun lien avec le gating
     admin de decorate()/checkAdmin() ci-dessus, qui ne s'applique qu'à
     l'aperçu admin lui-même. */
  return { decorate, extractLevelBuckets, describeQA };
})();

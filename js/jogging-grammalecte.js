/* ═══════════════════════════════════════════════════════════════════════
   jogging-grammalecte.js — Adaptateur Grammalecte pour le module Rédaction.

   Fait tourner Grammalecte dans un Web Worker (lib/grammalecte/gc-worker.js,
   jamais envoyé à un serveur — §3.9), et mappe chaque famille de règles
   Grammalecte sur un critère de la grille Code Champion.

   ── Table de correspondance familles Grammalecte → Code Champion ─────────
   Grammalecte regroupe ses règles en ~30 "options" (catégories togglables,
   voir lib/grammalecte/fr/gc_options.js → oOptLabel/lStructOpt). C'est cette
   granularité — pas le sRuleId individuel, bien trop fin (des milliers
   d'identifiants) — qui sert de "famille" pour le mapping ci-dessous.
   Vérifié empiriquement (phrases de test, voir procédure de test manuel) :
   les familles ci-dessous se déclenchent bien comme attendu.

   Choix retenus (à affiner ensemble après les premiers tests réels avec de
   vrais élèves, cf. cahier des charges §6.4/§8) :

   • C — Conjugaison : conj, infi, imp, inte, vmode (tout ce qui touche à la
     FORME verbale elle-même, y compris l'accord sujet-verbe qui déclenche
     la même famille "conj" chez Grammalecte — il ne distingue pas les deux).
   • H — Homophones : conf (confusions lexicales/grammaticales — a/à, et/est,
     son/sont, ces/ses, on/ont, ce/se… tous vérifiés déclenchés en pratique).
   • A — Accords : gn (accords genre/nombre du groupe nominal) + ppas
     (accord du participe passé — classé ici plutôt qu'en C car c'est un
     accord, pas une forme verbale).
   • M — Majuscules : maj (majuscule en début de phrase/après un point —
     règles les plus fréquentes en cycle 3), minis.
   • P — Ponctuation : virg (virgules manquantes), poncfin (ponctuation
     finale manquante — désactivée par défaut chez Grammalecte, réactivée
     explicitement dans gc-worker.js), esp/tab/nbsp/unit (espacement).
   • O — Orthographe : tu (traits d'union), mapos, loc, mc, num (orthographe
     lexicale/grammaticale au sens large) + tout mot absent du dictionnaire
     (vérification orthographique séparée du moteur de règles, voir
     analyzeText ci-dessous).
   • S — Son : eleu (élisions et tournures dysphoniques — la seule famille
     Grammalecte vraiment centrée sur "comment ça sonne").

   Non mappées (aucun critère, jamais montrées à l'élève) : apos (préférence
   typographique, pas une erreur), eepi, nf, liga, chim, ocr (beaucoup de
   faux positifs, déconseillée par Grammalecte lui-même), date, idrule,
   html/latex/md, bs, pleo, neg, redon1, redon2 (style — désactivées par
   défaut et hors du champ d'un premier jet de cycle 3).

   I (toujours ⚪) et N (Néant, laissé à l'enseignant) ne viennent jamais de
   Grammalecte — voir js/jogging-engine.js.
   ═══════════════════════════════════════════════════════════════════════ */

const JoggingGrammalecte = (() => {

  const FAMILY_TO_CODE = {
    // Conjugaison
    conj: 'C', infi: 'C', imp: 'C', inte: 'C', vmode: 'C',
    // Homophones
    conf: 'H',
    // Accords
    gn: 'A', ppas: 'A',
    // Majuscules
    maj: 'M', minis: 'M',
    // Ponctuation
    virg: 'P', poncfin: 'P', esp: 'P', tab: 'P', nbsp: 'P', unit: 'P',
    // Orthographe (lexicale/grammaticale, hors mots absents du dictionnaire)
    tu: 'O', mapos: 'O', loc: 'O', mc: 'O', num: 'O',
    // Son
    eleu: 'S'
  };

  const AUTO_CODES = ['C', 'H', 'A', 'M', 'P', 'O', 'S'];

  let worker = null;
  let workerReady = null; // Promise
  let pendingParse = null; // { resolve, reject }

  function getWorker() {
    if (worker) return worker;
    worker = new Worker('lib/grammalecte/gc-worker.js');
    workerReady = new Promise((resolve, reject) => {
      const onTimeout = setTimeout(() => {
        reject(new Error("Le correcteur met trop de temps à démarrer."));
      }, 20000);
      worker.onmessage = (e) => {
        const data = e.data || {};
        if (data.type === 'ready') {
          clearTimeout(onTimeout);
          resolve(data.grammalecteVersion || null);
        } else if (data.type === 'error' && !workerReady) {
          clearTimeout(onTimeout);
          reject(new Error(data.message || 'Erreur du correcteur'));
        }
      };
      worker.onerror = (e) => {
        clearTimeout(onTimeout);
        reject(new Error("Le correcteur n'a pas pu se charger."));
      };
    });
    return worker;
  }

  /** Précharge le worker (à appeler tôt, par ex. dès l'arrivée sur jogging.html)
      pour que la première correction de l'élève n'attende pas le chargement
      du dictionnaire (~4 Mo) — §3.11/§3.12. */
  function preload() {
    getWorker();
    return workerReady;
  }

  /** Réinitialise complètement le worker (bouton "réessayer", §3.12). */
  function reset() {
    if (worker) { worker.terminate(); }
    worker = null;
    workerReady = null;
    pendingParse = null;
  }

  function normalizeErreur(code, family, ruleId, start, end, message, suggestion) {
    return { code, family, ruleId, start, end, message: message || '', suggestion: suggestion || null };
  }

  /**
   * Analyse un texte et retourne { grammalecteVersion, erreurs, feux }.
   * `feux` ne couvre que les 7 critères automatisables (C,H,A,M,P,O,S) —
   * I et N sont gérés par l'appelant (js/jogging-engine.js).
   */
  async function analyzeText(sText) {
    const w = getWorker();
    const grammalecteVersion = await workerReady;

    const result = await new Promise((resolve, reject) => {
      const onTimeout = setTimeout(() => {
        reject(new Error("La correction prend trop de temps."));
      }, 15000);
      w.onmessage = (e) => {
        const data = e.data || {};
        if (data.type === 'result') {
          clearTimeout(onTimeout);
          resolve(data);
        } else if (data.type === 'error') {
          clearTimeout(onTimeout);
          reject(new Error(data.message || 'Erreur du correcteur'));
        }
      };
      w.onerror = () => {
        clearTimeout(onTimeout);
        reject(new Error("Le correcteur a rencontré un problème."));
      };
      w.postMessage({ type: 'parse', text: sText });
    });

    const erreurs = [];

    for (const oErr of (result.aGrammErr || [])) {
      const code = FAMILY_TO_CODE[oErr.sType];
      if (!code) continue; // famille non retenue pour Code Champion (voir en-tête)
      erreurs.push(normalizeErreur(
        code, oErr.sType, oErr.sRuleId, oErr.nStart, oErr.nEnd,
        oErr.sMessage, (oErr.aSuggestions && oErr.aSuggestions[0]) || null
      ));
    }

    for (const oTok of (result.aSpellErr || [])) {
      erreurs.push(normalizeErreur(
        'O', 'orth', oTok.sValue, oTok.nStart, oTok.nEnd,
        `« ${oTok.sValue} » ne figure pas dans le dictionnaire.`,
        (oTok.aSuggestions && oTok.aSuggestions[0]) || null
      ));
    }

    // Positions fiables (offsets exacts renvoyés par un analyseur déterministe,
    // §3.7) : trier par position pour un surlignage cohérent à l'affichage.
    erreurs.sort((a, b) => a.start - b.start);

    // ── Calcul des feux (7 critères automatisables) ─────────────────────
    // Règle simple et documentée (à affiner) : 0 erreur → vert ; 1 erreur
    // → orange ; 2+ erreurs du même critère → rouge.
    const feux = {};
    for (const c of AUTO_CODES) feux[c] = 'vert';
    const counts = {};
    for (const e of erreurs) counts[e.code] = (counts[e.code] || 0) + 1;
    for (const c of AUTO_CODES) {
      const n = counts[c] || 0;
      feux[c] = n === 0 ? 'vert' : (n === 1 ? 'orange' : 'rouge');
    }

    return { grammalecteVersion, erreurs, feux };
  }

  return { preload, reset, analyzeText, FAMILY_TO_CODE, AUTO_CODES };
})();

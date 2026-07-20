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
     finale manquante), esp/tab/nbsp/unit (espacement). Ces 5 options sont
     désactivées par défaut chez Grammalecte ; réactivées explicitement dans
     gc-worker.js (audit du 2026-07-20 : elles étaient listées ici comme
     couvrant P, mais jamais réellement activées — correction ci-dessous).
   • O — Orthographe : tu (traits d'union), mapos (apostrophe manquante
     après l/d/s/n/c/j/m/t/ç), loc, mc (mots composés), num (orthographe
     lexicale/grammaticale au sens large) + tout mot absent du dictionnaire
     (vérification orthographique séparée du moteur de règles, voir
     analyzeText ci-dessous). mapos et mc sont désactivées par défaut chez
     Grammalecte ; réactivées explicitement dans gc-worker.js (même audit).
   • S — Son : eleu (élisions et tournures dysphoniques — la seule famille
     Grammalecte vraiment centrée sur "comment ça sonne"). Attention : une
     confusion homophonique comme « c'est »/« s'est » relève en réalité de
     "conf" (donc H) chez Grammalecte, pas de "eleu" — aucune règle du moteur
     ne couvre spécifiquement ce cas précis (vérifié empiriquement, aucun
     faux réglage possible ici, limite du moteur à base de règles).

   Non mappées (aucun critère, jamais montrées à l'élève) : apos (préférence
   typographique, pas une erreur), eepi, nf, liga, chim, ocr (beaucoup de
   faux positifs, déconseillée par Grammalecte lui-même), date, idrule,
   html/latex/md, bs, pleo, neg, redon1, redon2 (style — désactivées par
   défaut et hors du champ d'un premier jet de cycle 3).

   ── Filet de sécurité sType "notype" (audit du 2026-07-20) ────────────────
   Certaines règles de confusion bien réelles (ex. « ils son fatigués ») sont
   rattachées par Grammalecte à un groupe de règles "toujours actif" (sans
   option associée) et ressortent avec sType: "notype" au lieu de leur vraie
   famille — alors que ce même groupe "notype" contient aussi des règles hors
   sujet (répétitions de mots, formatage des grands nombres, écriture
   épicène…) qu'on ne veut surtout pas montrer à l'élève. resolveCode()
   ci-dessous retente, dans ce cas seulement, une extraction de la famille
   depuis le préfixe du sRuleId (convention "g<n>__<famille>_...") avant
   d'abandonner — cela récupère les vraies règles de confusion sans jamais
   laisser passer les règles de style/mise en forme (leur sRuleId ne suit
   pas cette convention de préfixe).

   ── Limites connues du moteur (pas des bugs de configuration) ─────────────
   Vérifié empiriquement (voir procédure de test manuel) :
   - Majuscule en tout début de texte (aucune phrase précédente) et
     majuscule des noms propres non répertoriés (ex. « paris » pour
     « Paris ») : non couvertes par Grammalecte, qui n'a pas de lexique de
     noms propres génériques. Sans impact réel ici : les joggings font
     20-300 mots (donc plusieurs phrases), et la règle de majuscule en
     début de paragraphe se déclenche dès qu'il y a une 2e phrase.
   - Ponctuation finale d'un paragraphe d'UNE seule phrase : non vérifiée
     par design Grammalecte (évite de signaler des titres/fragments) —
     même remarque, sans impact réel vu la longueur minimale imposée.
   - Cohérence sémantique d'un temps verbal avec un repère temporel
     (« hier je mange », « demain déjà ») et absence de ponctuation dédiée
     au discours rapporté (dialogue sans tiret/guillemets) : nécessitent une
     compréhension du sens, hors de portée d'un correcteur à base de règles
     — pas corrigible sans IA générative, donc explicitement hors périmètre
     du module (§1.2 : zéro IA).
   - Un mot mal orthographié qui correspond PAR HASARD à un autre mot valide
     du dictionnaire n'est jamais détecté (ni par le correcteur orthogra-
     phique, ni par une règle de confusion dédiée si elle n'existe pas).
     Vérifié empiriquement (audit du 2026-07-20) sur « Ensuit » (pour
     « Ensuite ») : « ensuit » est une forme conjuguée réelle du verbe rare
     « (s')ensuivre » (« il s'ensuit que… »), donc un mot valide pour le
     dictionnaire. La seule règle `conf` qui s'en approche (g2__conf_s_
     ensuivre, déjà active par défaut) cible la confusion « s'ensuit »
     employé comme locution pour « ensuite », pas ce cas précis — elle ne
     se déclenche pas non plus ici (testé). Même statut que S1 (c'est/s'est)
     dans l'audit précédent : limite du moteur, pas un réglage manquant.

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

  // Certaines règles Grammalecte renvoient sType: "notype" au lieu de leur
  // vraie famille : ce sont des règles rattachées à un groupe "toujours actif"
  // (sans option associée, ex. détection de doublons, écriture épicène,
  // formatage des grands nombres — jamais pertinentes pour nos 7 critères),
  // MAIS ce même groupe contient aussi de vraies règles de confusion (ex.
  // g2__conf_ils_non_verbe, qui détecte « ils son fatigués ») dont le nom de
  // règle garde la vraie famille en préfixe. Filet de sécurité vérifié
  // empiriquement (audit Grammalecte, cf. procédure de test) : si sType est
  // absent du mapping, on retente avec la famille extraite du sRuleId
  // (convention "g<n>__<famille>_..."), pour ne pas perdre ces cas réels.
  const RULE_ID_FAMILY_RE = /^g\d*__([a-zàâéèêëîïôùûç]+)_/;

  function resolveCode(sType, sRuleId) {
    if (FAMILY_TO_CODE[sType]) return FAMILY_TO_CODE[sType];
    const m = sRuleId && RULE_ID_FAMILY_RE.exec(sRuleId);
    if (m && FAMILY_TO_CODE[m[1]]) return FAMILY_TO_CODE[m[1]];
    return null;
  }

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
      const code = resolveCode(oErr.sType, oErr.sRuleId);
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

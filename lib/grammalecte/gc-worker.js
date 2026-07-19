/* ═══════════════════════════════════════════════════════════════════════
   gc-worker.js — Web Worker Grammalecte pour Proficiamus (module Rédaction)

   Fichier écrit pour ce projet (pas un fichier Grammalecte d'origine — voir
   NOTICE.md). Remplace le gce_worker.js de l'extension navigateur, qui gère
   des dizaines de commandes de panneau (conjugueur, éditeur lexical,
   dictionnaire personnel…) sans rapport avec ce module. Ici : deux
   commandes seulement — "init" et "parse" — combinant grammaire et
   orthographe en une seule réponse.

   Tourne dans un Worker dédié pour ne jamais bloquer le thread principal
   pendant l'analyse (§3.11 du cahier des charges — même si Grammalecte est
   quasi instantané, l'init du moteur/dictionnaire prend, elle, une fraction
   de seconde à quelques secondes selon la machine).
   ═══════════════════════════════════════════════════════════════════════ */

"use strict";

const GRAMMALECTE_VERSION = "2.3.1"; // moteur Grammalecte-by-algoo — voir NOTICE.md

importScripts(
  "graphspell/helpers.js",
  "graphspell/str_transform.js",
  "graphspell/char_player.js",
  "graphspell/lexgraph_fr.js",
  "graphspell/ibdawg.js",
  "graphspell/spellchecker.js",
  "text.js",
  "graphspell/tokenizer.js",
  "fr/conj.js",
  "fr/mfsp.js",
  "fr/phonet.js",
  "fr/cregex.js",
  "fr/gc_options.js",
  "fr/gc_functions.js",
  "fr/gc_rules.js",
  "fr/gc_rules_graph.js",
  "fr/gc_engine.js"
);

let bReady = false;

function init() {
  try {
    conj.init(helpers.loadFile("fr/conj_data.json"));
    phonet.init(helpers.loadFile("fr/phonet_data.json"));
    mfsp.init(helpers.loadFile("fr/mfsp_data.json"));
    gc_engine.load("JavaScript", "aHSL", "graphspell/_dictionaries");

    // "Ponctuation finale" est désactivée par défaut dans Grammalecte
    // (pensée pour du texte long/varié) ; on l'active explicitement car
    // c'est un point pédagogique central en cycle 3 et couvert par notre
    // critère P — voir js/jogging-grammalecte.js.
    gc_engine.setOption("poncfin", true);

    bReady = true;
    postMessage({ type: "ready", grammalecteVersion: GRAMMALECTE_VERSION });
  } catch (e) {
    postMessage({ type: "error", message: "init: " + (e && e.message ? e.message : String(e)) });
  }
}

function analyze(sText) {
  if (!bReady) {
    postMessage({ type: "error", message: "Le correcteur n'est pas encore prêt." });
    return;
  }
  try {
    const sClean = sText.replace(/­/g, "").normalize("NFC");
    const aGrammErr = gc_engine.parse(sClean, "FR", false, null, false);

    const oSpellChecker = gc_engine.getSpellChecker();
    const aSpellTokens = oSpellChecker.parseParagraph(sClean);
    const aSpellErr = aSpellTokens.map(function (oToken) {
      let aSugg = [];
      try {
        const oIter = oSpellChecker.suggest(oToken.sValue);
        const oFirst = oIter.next();
        if (!oFirst.done && Array.isArray(oFirst.value)) {
          aSugg = oFirst.value.slice(0, 5);
        }
      } catch (eSugg) {
        // pas grave si aucune suggestion disponible pour ce mot
      }
      return { nStart: oToken.nStart, nEnd: oToken.nEnd, sValue: oToken.sValue, aSuggestions: aSugg };
    });

    postMessage({
      type: "result",
      grammalecteVersion: GRAMMALECTE_VERSION,
      aGrammErr: aGrammErr,
      aSpellErr: aSpellErr
    });
  } catch (e) {
    postMessage({ type: "error", message: "parse: " + (e && e.message ? e.message : String(e)) });
  }
}

onmessage = function (e) {
  const oData = e.data || {};
  if (oData.type === "init") {
    init();
  } else if (oData.type === "parse") {
    analyze(oData.text || "");
  }
};

init();

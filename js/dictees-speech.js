/* ─────────────────────────────────────────────────────────────────────────────
   dictees-speech.js — Capsule sonore des dictées préparées.
   Web Speech API (SpeechSynthesis) uniquement — gratuite et illimitée, même
   choix que pour Grammalecte côté correction (jamais de service payant à
   l'échelle). Logique reprise telle quelle de l'exercice « mots invariables »
   (exercise.html, type mots-invariables-serie), qui utilise déjà cette API
   pour dicter un mot à l'élève.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesSpeech = (() => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  /* "Google français" (Chrome, moteur réseau) est la voix fr la plus claire
     disponible côté navigateur — on la force dès qu'elle existe. Sinon,
     repli sur une voix fr-FR non "compact" (les voix embarquées "compact"
     de l'OS sont robotiques). */
  function voiceScore(v) {
    if (v.name === 'Google français') return 1000;
    let score = 0;
    if (v.lang === 'fr-FR') score += 10;
    else if (v.lang && v.lang.toLowerCase().startsWith('fr')) score += 5;
    if (v.localService === false) score += 3;
    if (/google/i.test(v.name)) score += 2;
    if (/compact/i.test(v.name)) score -= 4;
    return score;
  }

  function pickVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = (window.speechSynthesis.getVoices() || [])
      .filter(v => v.lang && v.lang.toLowerCase().startsWith('fr'));
    const google = voices.find(v => v.name === 'Google français');
    if (google) return google;
    voices.sort((a, b) => voiceScore(b) - voiceScore(a));
    return voices[0] || null;
  }

  /* Chrome tronque/déforme le début de l'énoncé quand speak() est appelé
     juste après cancel() dans le même tick (bug connu du moteur réseau
     "Google français") — on n'annule que si une lecture est vraiment en
     cours, et on laisse un court délai au moteur avant de relancer.

     requestId : si un 2e speak() arrive pendant le délai de 150 ms d'un 1er
     appel encore en attente, rien n'empêchait jusqu'ici le fire() du 1er
     appel de s'exécuter quand même une fois le délai écoulé — il jouait
     alors SON texte à lui, désormais périmé, après (ou en même temps que)
     le mot suivant déjà affiché à l'écran. Symptôme observé sur le palier
     "effacement progressif" (passage 3), qui relance l'audio à chaque mot
     et expose donc bien plus ce risque qu'avant. Le jeton ci-dessous rend
     tout fire() retardé inoffensif dès qu'un appel plus récent a pris le
     relais. */
  let requestId = 0;

  function speak(text, onEnd) {
    if (!('speechSynthesis' in window)) { if (onEnd) onEnd(); return; }
    const synth = window.speechSynthesis;
    const myRequest = ++requestId;

    const fire = () => {
      if (myRequest !== requestId) return; // supplanté par un appel plus récent
      const utter  = new SpeechSynthesisUtterance(text);
      utter.lang   = 'fr-FR';
      utter.rate   = 0.85;
      utter.pitch  = 1;
      utter.volume = 1;
      const voice = pickVoice();
      if (voice) utter.voice = voice;
      let done = false;
      const finish = () => { if (!done) { done = true; if (onEnd) onEnd(); } };
      utter.onend   = finish;
      utter.onerror = finish;
      synth.speak(utter);
    };

    if (synth.speaking || synth.pending) {
      synth.cancel();
      setTimeout(fire, 150);
    } else {
      fire();
    }
  }

  function cancel() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  /* Tolérance : espaces multiples réduits + insensible à la casse, apostrophe
     ramenée à une forme canonique (') quelle que soit celle tapée par
     l'élève (' ’ ʼ `) ou stockée en base pour ce mot — un clavier standard
     ne produit qu'une apostrophe droite, alors qu'un mot saisi/copié côté
     enseignant peut très bien contenir une apostrophe courbe (ex.
     "l'alphabétisation" en base, bug remonté par un utilisateur : réponse
     juste refusée à chaque fois). La présence d'une apostrophe reste
     exigée : seul son type précis devient tolérant. Accents et ponctuation
     restent stricts par ailleurs (souvent l'objet même de la dictée). */
  function normalize(str) {
    return (str || '').trim().toLowerCase().replace(/['’ʼ`]/g, "'").replace(/\s+/g, ' ');
  }

  /* Variante utilisée uniquement par le volet Orthographe grammaticale
     (texte à trous, transformation de phrase — jamais les paliers lexicaux
     ci-dessus, dont la ponctuation reste volontairement stricte) : en plus
     de `normalize`, la ponctuation de fin/liaison de phrase (. , ; : ! ? …
     « » " ") est totalement ignorée dans la comparaison — un oubli de
     ponctuation ne doit jamais faire échouer une réponse par ailleurs
     correcte (retour utilisateur, surtout sensible sur le texte à trous, où
     l'élève ne retape qu'un mot isolé et oublie facilement la virgule/le
     point qui l'entoure). Les apostrophes et traits d'union restent
     significatifs (élision, mots composés) et ne sont jamais retirés. */
  function normalizeSentence(str) {
    return normalize(str)
      .replace(/[.,;:!?…«»""]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Normalisation dédiée au texte à trous (§ orthographe grammaticale,
     js/dictees-engine.js/validateTrou) : reprend normalizeSentence (espaces,
     ponctuation de fin/liaison) et y ajoute une tolérance sur l'apostrophe —
     contrairement à normalizeSentence, l'élève ne retape ici qu'un mot isolé
     entendu à l'oral (bouton haut-parleur, jamais affiché à l'écrit avant
     saisie) : une apostrophe oubliée ou d'un mauvais type (' vs ’) est une
     erreur de frappe bénigne, pas la faute que l'exercice cherche à évaluer.
     Apostrophes droites/courbes retirées des deux côtés avant comparaison. */
  function normalizeTrouAnswer(str) {
    return normalizeSentence(str).replace(/['’ʼ`]/g, '');
  }

  /* Met en évidence, dans le mot correct, la zone qui diffère de la saisie
     (alignement par préfixe/suffixe communs) — même mécanique que
     l'exercice « mots invariables ». */
  function diffHighlight(correct, typed) {
    const c = correct;
    const cL = c.toLowerCase();
    const tL = (typed || '').trim().toLowerCase();
    let prefix = 0;
    const maxPrefix = Math.min(cL.length, tL.length);
    while (prefix < maxPrefix && cL[prefix] === tL[prefix]) prefix++;
    let suffix = 0;
    const maxSuffix = Math.min(cL.length, tL.length) - prefix;
    while (suffix < maxSuffix && cL[cL.length - 1 - suffix] === tL[tL.length - 1 - suffix]) suffix++;
    const midStart = prefix;
    const midEnd = c.length - suffix;
    if (midStart >= midEnd) return c;
    return c.slice(0, midStart) +
      '<span class="dic-diff-char">' + c.slice(midStart, midEnd) + '</span>' +
      c.slice(midEnd);
  }

  return { speak, cancel, normalize, normalizeSentence, normalizeTrouAnswer, diffHighlight };
})();

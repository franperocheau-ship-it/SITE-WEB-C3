/* ─────────────────────────────────────────────────────────────────────────────
   text-to-speech.js — Bouton de lecture audio (accessibilité dyslexie).

   Expose attachSpeechButton(element, texte, opts) : insère un bouton 🔊
   discret dans `element`, qui lit `texte` à voix haute via la Web Speech
   API du navigateur au clic (jamais automatique). Un second clic pendant
   la lecture l'arrête. Fallback silencieux si la synthèse vocale n'est pas
   disponible — aucune erreur visible, le bouton n'est simplement pas inséré.

   opts.inline (défaut false) : `element` est lui-même un <button> existant
   (ex. un choix de QCM) — imbriquer un <button> y serait invalide en HTML.
   Dans ce cas, l'icône est un <span role="button" tabindex="0"> à la place,
   et son clic appelle stopPropagation() pour ne jamais déclencher le choix
   parent (bouton direct, onclick inline, ou délégation sur un ancêtre —
   les trois cas s'arrêtent à stopPropagation, appelé avant que l'événement
   ne remonte).

   Sélection de voix et gestion cancel()/speak() reprises de
   js/dictees-speech.js (même bug Chrome connu : speak() juste après
   cancel() dans le même tick tronque le début de l'énoncé côté moteur
   réseau "Google français").

   Appelant responsable de n'appeler cette fonction que pour les élèves
   marqués est_dyslexique (voir js/auth.js → getMyStudentRecord()).
   ───────────────────────────────────────────────────────────────────────────── */

const attachSpeechButton = (() => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  const SPEECH_UNAVAILABLE_TITLE = 'Lecture audio indisponible sur cet appareil';
  const SPEECH_UNAVAILABLE_TIMEOUT_MS = 2500;

  /* Sur certains appareils (Chromebooks notamment), la liste des voix se
     charge de façon asynchrone côté navigateur et peut mettre plusieurs
     secondes à être prête au premier chargement de la page — parfois elle
     ne l'est jamais (TTS bloqué par une politique de l'appareil/réseau). On
     ne grise donc jamais le bouton sur la seule base de l'état des voix au
     moment de sa création : on réévalue à chaque 'voiceschanged' (déclenché
     indéfiniment, pas seulement avant le délai ci-dessous, au cas où les
     voix mettraient encore plus longtemps à arriver), et seulement si
     aucune voix n'est toujours disponible après un délai raisonnable, on
     grise le bouton avec une info-bulle explicite plutôt que de le laisser
     silencieusement inopérant. */
  function watchVoiceAvailability(btn, inline) {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    const defaultTitle = btn.title;
    const defaultLabel = btn.getAttribute('aria-label');

    function hasVoices() { return (synth.getVoices() || []).length > 0; }

    function markUnavailable() {
      btn.classList.add('lfm-speech-btn--unavailable');
      if (inline) btn.setAttribute('aria-disabled', 'true');
      else btn.disabled = true;
      btn.title = SPEECH_UNAVAILABLE_TITLE;
      btn.setAttribute('aria-label', SPEECH_UNAVAILABLE_TITLE);
    }

    function markAvailable() {
      if (!btn.classList.contains('lfm-speech-btn--unavailable')) return;
      btn.classList.remove('lfm-speech-btn--unavailable');
      if (inline) btn.removeAttribute('aria-disabled');
      else btn.disabled = false;
      btn.title = defaultTitle;
      btn.setAttribute('aria-label', defaultLabel);
    }

    if (hasVoices()) return;

    synth.addEventListener('voiceschanged', () => { if (hasVoices()) markAvailable(); });
    setTimeout(() => { if (!hasVoices()) markUnavailable(); }, SPEECH_UNAVAILABLE_TIMEOUT_MS);
  }

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
    const voices = (window.speechSynthesis.getVoices() || [])
      .filter(v => v.lang && v.lang.toLowerCase().startsWith('fr'));
    const google = voices.find(v => v.name === 'Google français');
    if (google) return google;
    voices.sort((a, b) => voiceScore(b) - voiceScore(a));
    return voices[0] || null;
  }

  let requestId = 0;
  let resetActiveButton = null; // idle-icon reset du bouton actuellement en lecture

  function speak(text, { onStart, onEnd }) {
    const synth = window.speechSynthesis;
    const myRequest = ++requestId;

    const fire = () => {
      if (myRequest !== requestId) return; // supplanté par un appel plus récent
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'fr-FR';
      const voice = pickVoice();
      if (voice) utter.voice = voice;
      let done = false;
      const finish = () => { if (!done) { done = true; onEnd(); } };
      utter.onstart = onStart;
      utter.onend = finish;
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

  return function attachSpeechButton(element, texte, opts) {
    if (!element || !texte) return null;
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return null;

    const inline = !!(opts && opts.inline);
    const btn = document.createElement(inline ? 'span' : 'button');
    if (inline) {
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
    } else {
      btn.type = 'button';
    }
    btn.className = inline ? 'lfm-speech-btn lfm-speech-btn--inline' : 'lfm-speech-btn';
    btn.title = 'Écouter';
    btn.setAttribute('aria-label', 'Écouter le texte');
    btn.textContent = '🔊';

    function setIdle() {
      if (resetActiveButton === setIdle) resetActiveButton = null;
      btn.classList.remove('is-playing');
      btn.textContent = '🔊';
      btn.title = 'Écouter';
      btn.setAttribute('aria-label', 'Écouter le texte');
    }

    function setPlaying() {
      btn.classList.add('is-playing');
      btn.textContent = '⏹';
      btn.title = 'Arrêter la lecture';
      btn.setAttribute('aria-label', 'Arrêter la lecture');
    }

    function activate(e) {
      if (inline) { e.stopPropagation(); e.preventDefault(); }
      if (btn.classList.contains('lfm-speech-btn--unavailable')) return;
      if (btn.classList.contains('is-playing')) {
        window.speechSynthesis.cancel();
        setIdle();
        return;
      }
      if (resetActiveButton) resetActiveButton();
      resetActiveButton = setIdle;
      speak(texte, { onStart: setPlaying, onEnd: setIdle });
    }

    btn.addEventListener('click', activate);
    if (inline) {
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') activate(e);
      });
    }

    watchVoiceAvailability(btn, inline);

    element.appendChild(btn);
    return btn;
  };
})();

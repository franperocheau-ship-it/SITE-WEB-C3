/* ═══════════════════════════════════════════════════════════════════════
   Composant partagé — Écran "Choisis ton niveau"

   Utilisé par le moteur partagé (exercise.html) et par les pages
   d'exercice autonomes (maths/*, francais/*, ortho-distinguer-*, ...).
   Réplique le modèle de référence "Conjuguer le verbe ALLER" :
     - écran "Choisis ton niveau" avec cartes verrouillées séquentiellement
     - pastilles de progression en haut de page (jamais cliquables)
     - persistance en sessionStorage (standard du site — pas de localStorage)
     - seuil de validation à 80 % par défaut
   Supporte un nombre variable de niveaux (2 à 5).

   Ce composant ne gère PAS le déroulé des questions ni l'écran de
   résultats : ceux-ci restent propres à chaque exercice. Il gère
   uniquement la sélection de niveau, le verrouillage, les pastilles et
   la persistance de progression.
   ═══════════════════════════════════════════════════════════════════════ */

const LevelSelect = (() => {
  const DEFAULT_THRESHOLD = 0.8;
  const COLORS = [
    'var(--ls-color-1)',
    'var(--ls-color-2)',
    'var(--ls-color-3)',
    'var(--ls-color-4)',
    'var(--ls-color-5)'
  ];
  const CONFETTI_COLORS = ['#27ae60','#2980b9','#8e44ad','#e67e22','#c0392b','#1abc9c','#e91e8c','#f39c12'];

  function storageKey(exerciseKey) {
    return `${exerciseKey}_niveaux_valides`;
  }

  function getValidated(exerciseKey) {
    try { return JSON.parse(sessionStorage.getItem(storageKey(exerciseKey)) || '[]'); }
    catch { return []; }
  }

  function setValidated(exerciseKey, arr) {
    sessionStorage.setItem(storageKey(exerciseKey), JSON.stringify(arr));
  }

  function showConfetti() {
    const container = document.createElement('div');
    container.className = 'ls-confetti-container';
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'ls-confetti-piece';
      p.style.left              = Math.random() * 100 + 'vw';
      p.style.background        = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      p.style.width              = (8 + Math.random() * 8) + 'px';
      p.style.height             = (8 + Math.random() * 8) + 'px';
      p.style.animationDelay     = (Math.random() * 0.8) + 's';
      p.style.animationDuration  = (1.5 + Math.random()) + 's';
      container.appendChild(p);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 3500);
  }

  /**
   * Crée une instance du composant pour un exercice donné.
   *
   * @param {object}   config
   * @param {string}   config.exerciseKey     Clé unique de l'exercice (ex: le slug). Sert de base à la clé sessionStorage.
   * @param {Array}    config.levels          Liste ordonnée des niveaux : [{ id, description, label? }]. `id` est la clé métier (ex: "CM1"), invisible côté élève.
   * @param {number}   [config.threshold=0.8] Seuil de validation (0 à 1).
   * @param {Function} config.onSelectLevel   Callback appelé avec l'id du niveau cliqué (uniquement les niveaux débloqués sont cliquables).
   * @param {Element}  config.selectContainer Élément dans lequel injecter l'écran "Choisis ton niveau".
   * @param {Element}  [config.badgesContainer] Élément dans lequel injecter les pastilles de progression (optionnel).
   * @param {Function} [config.onBackToSelect] Callback appelé quand l'élève clique "← Choisir un niveau" depuis l'écran de résultats, AVANT le ré-affichage de l'écran de sélection. Sert à basculer la visibilité des écrans propres à la page (ex: cacher les résultats, ré-afficher le conteneur d'exercice) — logique propre à chaque page, pas au composant.
   * @param {string}   [config.introHTML] HTML optionnel affiché entre le titre et la grille de niveaux (ex: rappel de règle).
   * @param {boolean}  [config.autoConfetti=true] Si false, `completeLevel()` ne déclenche pas les confettis du composant — utile quand la page appelle déjà sa propre animation de confettis (conserver l'existant plutôt que d'en ajouter une seconde).
   */
  function create(config) {
    const {
      exerciseKey,
      levels,
      threshold = DEFAULT_THRESHOLD,
      onSelectLevel,
      selectContainer,
      badgesContainer,
      onBackToSelect,
      introHTML = '',
      autoConfetti = true
    } = config;

    function isUnlocked(index) {
      if (index === 0) return true;
      const validated = getValidated(exerciseKey);
      return validated.includes(levels[index - 1].id);
    }

    function colorFor(index) {
      return COLORS[index] || COLORS[COLORS.length - 1];
    }

    function renderBadges(currentLevelId = null) {
      if (!badgesContainer) return;
      const validated = getValidated(exerciseKey);
      badgesContainer.innerHTML = levels.map((lvl, i) => {
        const done  = validated.includes(lvl.id);
        const state = done
          ? 'done'
          : lvl.id === currentLevelId
            ? 'current'
            : isUnlocked(i) ? 'unlocked' : 'locked';
        return `<span class="ls-badge ls-badge--${state}" style="--ls-color:${colorFor(i)}">Niveau ${i + 1}</span>`;
      }).join('');
    }

    function renderSelectScreen() {
      const validated = getValidated(exerciseKey);
      selectContainer.innerHTML = `
        <p class="ls-select-label">Choisis ton niveau</p>
        ${introHTML}
        <div class="ls-grid">
          ${levels.map((lvl, i) => {
            const unlocked = isUnlocked(i);
            const done     = validated.includes(lvl.id);
            const cls      = !unlocked ? ' ls-card--locked' : '';
            const disabled = !unlocked ? ' disabled' : '';
            const desc     = !unlocked
              ? 'Valide le niveau précédent pour débloquer'
              : done ? `${lvl.description} · Niveau validé !` : lvl.description;
            return `
              <button class="ls-card${cls}" data-level="${lvl.id}"${disabled}>
                <span class="ls-pastille" style="--ls-color:${colorFor(i)}">Niveau ${i + 1}</span>
                <span class="ls-card-body">
                  <span class="ls-card-name">${lvl.label || `Niveau ${i + 1}`}</span>
                  <span class="ls-card-desc">${desc}</span>
                </span>
              </button>`;
          }).join('')}
        </div>
      `;
      selectContainer.querySelectorAll('.ls-card:not([disabled])').forEach(btn =>
        btn.addEventListener('click', () => onSelectLevel(btn.dataset.level))
      );
      renderBadges(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * À appeler à la fin d'un niveau, avec le score obtenu.
     * Met à jour la persistance, déclenche les confettis si validé,
     * et renvoie les infos nécessaires pour construire l'écran de résultats.
     */
    function completeLevel(levelId, score, total) {
      const pct    = total > 0 ? score / total : 0;
      const passed = pct >= threshold;
      const idx    = levels.findIndex(l => l.id === levelId);
      const isLast = idx === levels.length - 1;
      let nextLevelId = null;

      if (passed) {
        const validated = getValidated(exerciseKey);
        if (!validated.includes(levelId)) {
          validated.push(levelId);
          setValidated(exerciseKey, validated);
        }
        if (autoConfetti) showConfetti();
        if (!isLast) nextLevelId = levels[idx + 1].id;
      }

      const allValidated = getValidated(exerciseKey).length >= levels.length;
      renderBadges(levelId);

      return { passed, pct, isLast, nextLevelId, allValidated };
    }

    function reset() {
      setValidated(exerciseKey, []);
    }

    /**
     * Bouton "← Choisir un niveau", à insérer dans l'écran de résultats de
     * chaque exercice, EN PLUS des boutons existants (recommencer, niveau
     * suivant, ...). Ramène à l'écran "Choisis ton niveau" avec l'état de
     * déblocage à jour.
     */
    function backToSelectButtonHTML(label = '← Choisir un niveau') {
      return `<button type="button" class="ls-back-btn" data-ls-back-btn>${label}</button>`;
    }

    /** À appeler après avoir inséré le HTML de `backToSelectButtonHTML()` dans le DOM. */
    function wireBackToSelectButton(container) {
      container.querySelectorAll('[data-ls-back-btn]').forEach(btn =>
        btn.addEventListener('click', () => {
          if (typeof onBackToSelect === 'function') onBackToSelect();
          renderSelectScreen();
        })
      );
    }

    return {
      renderSelectScreen,
      renderBadges,
      completeLevel,
      isUnlocked,
      getValidated: () => getValidated(exerciseKey),
      reset,
      backToSelectButtonHTML,
      wireBackToSelectButton
    };
  }

  return { create };
})();

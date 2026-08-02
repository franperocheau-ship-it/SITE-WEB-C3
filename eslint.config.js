'use strict';

/* ─────────────────────────────────────────────────────────────────────────────
   ESLint — config volontairement minimale pour un site vanilla JS sans build
   (voir CONTRIBUTING.md). Objectif unique : attraper les erreurs évidentes
   (variable non déclarée, doublon, code mort évident) — pas de règles de
   style (indentation, quotes, semi…), pas de bundler, pas de framework.

   PÉRIMÈTRE : uniquement js/*.js et data/*.js. Les <script> inline dans les
   pages .html (exercise.html, dashboard-*.html, etc.) ne sont PAS couverts —
   les linter demanderait un plugin d'extraction HTML supplémentaire, hors
   du "simple et non intrusif" demandé. À reconsidérer si ces blocs inline
   grossissent encore ou deviennent une source récurrente de bugs.

   GLOBALS PARTAGÉS : ce projet charge de nombreux <script> classiques (pas
   de modules ES) qui partagent un même scope global par page. Un fichier
   js/*.js linté seul ne "voit" donc pas les identifiants définis par les
   autres fichiers chargés sur la même page — sans la liste ci-dessous,
   no-undef produirait un très grand nombre de faux positifs. Cette liste a
   été construite en grep-ant les déclarations top-level de js/*.js et
   data/*.js (voir CONTRIBUTING.md, règle §1) ; à compléter quand un nouveau
   fichier expose un nouvel identifiant partagé.
   ────────────────────────────────────────────────────────────────────────── */

const js = require('@eslint/js');
const globals = require('globals');

const PROJECT_GLOBALS = {
  // Catalogue d'exercices (exercise-data.js legacy + data/*.js + module autonome)
  EXERCISE_DATA: 'readonly',
  EXERCISE_CATALOG_AUTONOMOUS: 'readonly',
  EXERCISE_CATALOG_GROUPS: 'readonly',
  REMEDIATION_DATA: 'readonly',

  // Client Supabase + espaces d'API "lfm*" (chaque js/*.js expose son
  // namespace, cf. en-têtes "Dépend de :" dans chaque fichier)
  supabase: 'readonly', // @supabase/supabase-js, chargé depuis un <script> CDN
  SUPABASE_URL: 'readonly',
  SUPABASE_ANON: 'readonly',
  lfmDb: 'readonly',
  lfmAuth: 'readonly',
  lfmAdmin: 'readonly',
  lfmAnalytics: 'readonly',
  lfmTeacher: 'readonly',
  lfmGuidedAccess: 'readonly',
  lfmLevelUnlock: 'readonly',
  lfmLevelBadge: 'readonly',
  lfmNiveauMode: 'readonly',
  lfmJoggingTeacher: 'readonly',

  // Widgets UI partagés
  Breadcrumb: 'readonly',
  LevelSelect: 'readonly',
  escHtml: 'readonly',

  // Module Lauriers (js/laurels.js)
  LAUREL_RANKS: 'readonly',
  LAUREL_BADGE_TIERS: 'readonly',
  LAUREL_LEAVES_PER_CROWN: 'readonly',
  LAUREL_LEAVES_PER_BRANCH: 'readonly',
  LAUREL_SUCCESS_THRESHOLD: 'readonly',
  LAUREL_BRANCH_BASE_DEG: 'readonly',
  LAUREL_BRANCH_TIP_DEG: 'readonly',
  LAUREL_OUTWARD_TILT_DEG: 'readonly',
  buildLaurelNotionMap: 'readonly',
  laurelLevelKey: 'readonly',
  laurelTotalLevels: 'readonly',
  laurelLeafState: 'readonly',
  laurelLeafBreakdown: 'readonly',
  laurelPointOnCircle: 'readonly',
  laurelStemPath: 'readonly',
  laurelBadgeTierFor: 'readonly',
  computeLaurelRank: 'readonly',
  renderLaurelCrown: 'readonly',
  renderLaurelRank: 'readonly',
  renderLaurelBadges: 'readonly',

  // Module Badges de compétence (js/skill-badges.js)
  SKILL_BADGE_SUCCESS_THRESHOLD: 'readonly',
  skillBadgeLevelKey: 'readonly',
  skillBadgeTotalLevels: 'readonly',
  renderSkillValidatedBadgeHTML: 'readonly',

  // Module Rédaction / Jogging (js/jogging-*.js)
  JOGGING_DATA: 'readonly',
  JOGGING_LIST: 'readonly',
  JOGGING_PROGRES_FIXED: 'readonly',
  JOGGING_PROGRES_TEXTS: 'readonly',
  JoggingBadges: 'readonly',
  JoggingClassSettings: 'readonly',
  JoggingGrammalecte: 'readonly',
  JoggingMessages: 'readonly',
  JoggingPrint: 'readonly',
  JoggingStudentSpace: 'readonly',
  CODE_LABELS: 'readonly',
  FEU_LEGEND: 'readonly',
  FEU_ORDER: 'readonly',
  FEU_PICTO: 'readonly',
  STATE_IDS: 'readonly',
  TEMPS_CLASS: 'readonly',
  TEMPS_IMPOSE_OPTIONS: 'readonly',
  TEMPS_IMPOSE_LABEL_BY_VALUE: 'readonly',
  TEMPS_IMPOSE_VALUE_BY_LABEL: 'readonly',
  AUTOSAVE_INTERVAL_MS: 'readonly',
  MAX_WORDS: 'readonly',
  MIN_WORDS: 'readonly',
  // État mutable de jogging-engine.js (let top-level réassigné dans le
  // fichier) : 'writable', pas 'readonly', sinon no-global-assign se
  // déclenche sur la réassignation normale de ces variables.
  jogging: 'writable',
  draftDirty: 'writable',
  submitting: 'writable',
  studentName: 'writable',
  sessionRow: 'writable',
  prevErrorCount: 'writable',
  lastVersionText: 'writable',
  lastVersionFeux: 'writable',
  escapeHtml: 'readonly',
  countWords: 'readonly',
  highlightText: 'readonly',
  showState: 'readonly',
  showEditorState: 'readonly',
  bindEditorEvents: 'readonly',
  updateWordCount: 'readonly',
  renderHeader: 'readonly',
  renderVersionBanner: 'readonly',
  renderCorrectionScreen: 'readonly',
  renderFeuxGrid: 'readonly',
  updateFeuxScrollHint: 'readonly',
  showBubble: 'readonly',
  closeBubble: 'readonly',
  showFeuTooltip: 'readonly',
  closeFeuTooltip: 'readonly',
  markCarnetAdded: 'readonly',
  setupCarnetButton: 'readonly'
};

module.exports = [
  {
    ignores: ['node_modules/**', 'exercise-data.js.bak']
  },
  {
    files: ['js/**/*.js', 'data/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script', // <script> classiques, pas de modules ES
      globals: {
        ...globals.browser,
        ...PROJECT_GLOBALS
      }
    },
    rules: {
      ...js.configs.recommended.rules,

      // Volontairement assoupli par rapport à recommended : trop de faux
      // positifs sur ce code (fonctions/constantes exportées vers d'autres
      // pages mais jamais utilisées dans le fichier qui les déclare).
      'no-unused-vars': 'warn',

      // Les data/*.js n'utilisent qu'un objet littéral géant : une clé
      // dupliquée (copier-coller d'un exercice) y est silencieuse sans
      // cette règle — directement motivé par la migration data/*.js.
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',

      // builtinGlobals:false : chaque fichier qui "exporte" un global
      // partagé (const lfmAnalytics = ..., const LevelSelect = ...) le
      // déclare au même nom que dans PROJECT_GLOBALS ci-dessus — c'est le
      // site de définition, pas une collision. Sans ce réglage, no-redeclare
      // se déclenche sur la quasi-totalité des fichiers js/*.js.
      'no-redeclare': ['error', { builtinGlobals: false }],

      // `catch (_) {}` est un idiome volontaire ici (ex. js/menu.js —
      // ignorer l'échec de signOut et rediriger quand même) : ne pas le
      // signaler. Un bloc if/for/while vide reste, lui, une vraie erreur.
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  }
];

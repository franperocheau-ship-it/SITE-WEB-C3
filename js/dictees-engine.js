/* ─────────────────────────────────────────────────────────────────────────────
   dictees-engine.js — Parcours élève d'une dictée préparée (dictee.html).

   Trois paliers successifs sur les mots difficiles de la dictée (state.step
   vaut 0, 0.5 ou 1 — la valeur 1 ne bouge pas, pour rester compatible avec
   dictee_results.exercice) :
     0.   Photographie le mot — un écran de lancement (bouton "Lancer
          l'exercice") laisse l'élève lire la consigne à son rythme avant que
          le premier mot ne s'affiche (retour utilisateur : le mot flashait
          puis disparaissait dès l'arrivée sur l'écran, sans laisser le temps
          de lire la consigne). Une fois lancé : le mot s'affiche en grand
          puis disparaît complètement, l'élève l'écrit de mémoire. Correction
          automatique (DicteesSpeech.normalize, comme les autres paliers) :
          la saisie et le mot correct restent affichés côte à côte, mais
          c'est le site qui tranche juste/faux, jamais l'élève. Les mots
          ratés reviennent plus tard dans le tirage, jamais juste après.
     0.5. Effacement progressif — le mot est affiché à trous (lettres tirées
          au hasard à chaque passage, jamais les mêmes positions) : passage 1
          ≈25 % de lettres masquées, passage 2 ≈60 %. Pas d'audio dans ce
          palier (retiré pour ne pas faire doublon avec le palier 1, qui est
          déjà une dictée audio). Correction automatique comme au palier 0.
          Par mot : une réussite fait progresser d'un passage (jusqu'à
          maîtrisé au passage 2), un échec fait redescendre d'un passage
          (jamais retiré, jamais retenté au même passage juste après : mot
          raté exclu du prochain tirage seulement, jamais retenté
          immédiatement).
     1.   Dictée audio — consigne simple ("Écoute le mot puis écris-le."),
          pas d'écran de lancement : le premier mot est dicté (TTS) dès
          l'arrivée sur l'écran (contrairement au palier 0, rien ne disparaît
          ici avant que l'élève ait pu agir, donc pas besoin de ce sas). Tous
          les mots de la dictée forment une seule série (plus de découpage en
          lots successifs) ; après chaque mot, verdict
          juste/faux immédiat, mais jamais la correction (l'orthographe
          attendue) avant la toute fin de l'exercice (retour utilisateur).
          Une fois la série terminée : un unique repêchage (réécoute
          possible, mais sans indice visuel) pour les mots ratés au premier
          passage, même verdict immédiat sans correction, puis révélation de
          l'orthographe pour ceux encore faux après repêchage. Comme les
          autres paliers la correction est automatique
          (DicteesSpeech.normalize), seulement différée à la toute fin de
          l'exercice.

   Puis, si la dictée en a été pourvue par l'enseignant, jusqu'à 4 paliers
   Orthographe grammaticale (state.step 2/3/5/4 — l'ordre d'apparition dans
   gramSteps()/le bandeau suit CET ordre, pas l'ordre numérique des steps ;
   chacun sauté si aucune donnée n'existe pour lui — voir
   gramSteps()/advanceAfter()) :
     2.   Classification par nature grammaticale — mots saisis manuellement
          par l'enseignant spécifiquement pour cet exercice
          (dictee_gram_extra_mots), indépendamment des mots choisis pour la
          dictée de mots (retour utilisateur : l'exercice reprenait avant ça
          automatiquement les mots difficiles lexicaux taggés d'une nature
          grammaticale, un couplage indésirable entre les deux exercices).
          Interaction "clic mot → clic nature", même famille que classification-etapes dans exercise.html
          (pas de drag-and-drop). Tableau de synthèse cumulatif sous la zone
          active (classificationTableHtml) : les mots bien classés en
          sortent mais restent visibles, rangés par nature. L'exercice ne se
          termine qu'une fois tous les mots classés correctement (retries
          illimités, cf. cs.unmastered/cs.coolingDown) — mais le score
          soumis (cs.correctFirstTry) ne compte que les mots réussis au tout
          premier essai, jamais les retries, sinon il vaudrait toujours 100%
          par construction (bug corrigé, voir validateClassification).
     3.   Texte à trous — phrases de dictee_trous, mots masqués par
          dictee_trous_mots. Aucun indice de règle : un bouton haut-parleur
          par trou (DicteesSpeech.speak) est le seul support, l'élève
          reproduit le mot entendu. Un seul mot attendu par trou, correction
          tolérante à la ponctuation/aux espaces et à l'apostrophe
          (DicteesSpeech.normalizeTrouAnswer). 3 tentatives au total sur tout
          l'exercice (state.trous.attempts/maxAttempts) : succès si plus
          aucun trou faux à l'issue, sinon synthèse des mots encore ratés à
          la fin (voir renderTrousFinished).
     5.   Trous — conjugaison — exercice à part entière (jusqu'au 2026-09,
          un simple sous-type du palier 3 ; scindé en palier indépendant sur
          ses propres tables dictee_trous_conjugaison/
          dictee_trous_conjugaison_mots, cf. migration 20260908100000), même
          mécanique que le palier 3 (deck/unmastered, 3 tentatives au total,
          verrouillage des blancs déjà justes) mais l'infinitif du verbe est
          affiché en clair juste avant chaque trou (jamais caché) — seul
          indice fourni en plus du haut-parleur (voir
          renderTrousConjugaisonExercise).
     4.   Transformation de phrase — phrase de départ + consigne de
          transformation, réponse(s) attendue(s) saisie(s) par l'enseignant
          (pas calculées) ; même comparaison tolérante qu'au palier 3. Retries
          illimités jusqu'à réussite (comme le palier 2) mais score soumis
          (correctFirstTry) compté uniquement au premier essai, jamais
          après une correction (cf. bug corrigé sur ce palier).

   Bloc lexical (0/0.5/1) et bloc grammatical (2/3/5/4) sont chacun un tout :
   l'ordre INTERNE à chaque bloc est fixe, mais l'élève choisit lequel des
   deux blocs passe en premier juste après le niveau (écran
   dic-state-ordre-choice, voir showOrdreChoice/chooseOrdre/currentSequence)
   — sauté directement dans l'unique bloc actif si l'enseignant n'a coché
   qu'un seul volet pour cette dictée (dictees.inclut_lexicale/
   inclut_grammaticale, gérés par gramSteps()/lexicalSteps()) ou si le volet
   grammatical n'a aucun contenu saisi (voir chooseNiveau). Dernier palier de
   la séquence choisie : son écran de fin est l'écran de fin du module entier
   (cf. advanceAfter).

   Les résultats des 4 paliers grammaticaux vont dans dictee_gram_results
   (jamais dictee_results ni exercise_results — cf. submitGramResult), lus
   uniquement par resultats-dictees-enseignant.html.

   Les paliers 0, 0.5 et 1 écrivent chacun leur propre ligne dans
   dictee_results (submitResult) à leur toute fin — exercice = 0/1/3
   respectivement (pas 2 : valeur lue ailleurs avec une autre sémantique
   héritée, cf. migration 20260907110000 ; exercice = 1 ne bouge pas,
   compatibilité historique). Score = mots réussis dès leur 1ère tentative
   (correctFirstTry, jamais les retries, cf. le bug déjà corrigé sur ce
   principe pour la classification — voir validateClassification) : les 3
   paliers lexicaux tolèrent des essais illimités par mot avant maîtrise,
   donc un score basé sur "l'exercice est fini" vaudrait toujours 100 % par
   construction. Avant ce commit, 0 et 0.5 étaient purement formatifs (aucune
   écriture) ; les 3 sont maintenant affichés séparément côté élève/
   enseignant (une pastille par palier, cf. js/dictees-student-space.js et
   js/dictees-teacher.js).

   Progression persistée en sessionStorage (postes de classe partagés — la
   BDD n'est écrite qu'à la fin de chaque palier, jamais comme source de la
   progression en cours). Dépend de : supabase-client.js (window.lfmDb),
   auth.js (lfmAuth), dictees-speech.js (DicteesSpeech), breadcrumb.js.

   SCHEMA_VERSION : la forme/les règles de `state` ont changé plusieurs fois
   (dernier changement : ajout de state.sectionResume — { lexical, gram },
   mémorise le dernier step actif de chaque section pour que le switcher
   lexical/grammatical reprenne le bon exercice au lieu de changer les
   onglets sans resynchroniser le contenu affiché, voir renderStepBanner).
   Toute session sessionStorage sauvegardée sous un schéma différent est
   ignorée au chargement (redémarrage propre sur l'écran de choix du niveau)
   plutôt que de risquer un état incohérent — à bumper à chaque futur
   changement de forme/règles de state.
   ───────────────────────────────────────────────────────────────────────────── */

const DicteesEngine = (() => {
  const SCHEMA_VERSION = 17;  // voir note ci-dessus

  /* Liste fixe des natures grammaticales (dupliquée depuis
     dictees-enseignant.html — pas de fichier utilitaire commun sur ce
     module, cohérent avec son style actuel de fichiers autonomes). */
  const NATURE_OPTIONS = ['nom commun', 'nom propre', 'verbe', 'verbe pronominal', 'adjectif', 'adverbe', 'article défini',
    'article indéfini', 'déterminant possessif', 'déterminant démonstratif', 'préposition', 'conjonction', 'autre'];

  const TRANSFO_TYPE_LABELS = {
    singulier_pluriel: 'Réécris cette phrase au pluriel.',
    pluriel_singulier: 'Réécris cette phrase au singulier.',
    masculin_feminin: 'Réécris cette phrase au féminin.',
    feminin_masculin: 'Réécris cette phrase au masculin.',
    present_futur: 'Réécris cette phrase au futur.',
    futur_present: 'Réécris cette phrase au présent.',
    present_passe: 'Réécris cette phrase au passé.',
    passe_present: 'Réécris cette phrase au présent.'
  };

  let dictee = null;
  let allMots = [];  // tous les mots de la dictée, non filtrés
  let mots = [];      // mots effectivement travaillés (filtrés selon le niveau choisi)
  let allGramTrous = [];          // dictee_trous + dictee_trous_mots imbriqués, non filtrés
  let gramTrous = [];             // phrases à trous effectivement travaillées (filtrées selon le niveau choisi)
  let allGramTrousConj = [];      // dictee_trous_conjugaison + dictee_trous_conjugaison_mots imbriqués, non filtrés
  let gramTrousConj = [];         // phrases à trous de conjugaison effectivement travaillées (filtrées selon le niveau choisi)
  let gramTransformations = [];   // dictee_transformations
  let gramExtraMots = [];         // dictee_gram_extra_mots
  let classificationPool = [];    // gramExtraMots seuls (jamais les mots de dictee_mots, cf. §2 en tête de fichier)
  let studentId = null;
  let state = null;
  /* Exercices déjà réalisés par l'élève AVANT cette session, sur cette
     dictée — un booléen par palier scoré (0/0.5 n'ont aucun résultat
     persisté, jamais concernés). Chargé une fois dans init() ; sert
     uniquement à proposer refaire/passer (voir withRedoOrSkipCheck) —
     jamais mis à jour en cours de session pour ne pas se re-déclencher sur
     ce que l'élève vient tout juste de terminer ici. */
  let alreadyDone = { 1: false, 2: false, 3: false, 4: false, 5: false };  // clé = même `step` numérique que currentSequence()

  /* Note historique : une variable previewSection permettait de "prévisualiser"
     l'autre section sans lancer d'exercice, mais ça désynchronisait le
     bandeau (qui suivait la prévisualisation) du contenu réellement affiché
     dans #dic-item (qui suivait state.step) — bug remonté par retour
     utilisateur. Le switcher déclenche maintenant une vraie navigation (voir
     renderStepBanner + state.sectionResume), donc le bandeau suit toujours
     state.step, comme le reste de l'écran. */

  /* Scopée par dictée ET par élève : sessionStorage n'est jamais vidée à la
     déconnexion (postes de classe partagés, un même onglet peut enchaîner
     plusieurs comptes élève) — sans studentId dans la clé, un élève pouvait
     hériter la progression (voire le résultat final) laissée par le
     précédent sur la même dictée dans le même onglet. */
  function storageKey(id) { return `dictee_${id}_${studentId}_progress`; }

  function loadState(id) {
    try { return JSON.parse(sessionStorage.getItem(storageKey(id)) || 'null'); }
    catch { return null; }
  }
  function saveState() {
    sessionStorage.setItem(storageKey(dictee.id), JSON.stringify(state));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function motById(id) { return mots.find(m => m.id === id); }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function capitalizeFr(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

  /* Découpe une phrase de texte à trous en tokens { text, isWord } : un
     token "mot" est un groupe de lettres (accents compris via \p{L}) ; tout
     le reste (espaces, ponctuation, apostrophes droites/courbes) forme des
     tokens non-mots, jamais un blanc. `position` (dictee_trous_mots.position)
     numérote uniquement les tokens-mots, dans l'ordre de la phrase — MÊME
     découpage que dictees-enseignant.html (tokenizeTrouPhrase, où les trous
     sont créés) et js/dictee-grammar-print.js : ne jamais faire diverger ces
     trois copies, sous peine de décaler quel mot correspond à quel blanc. */
  function tokenizeTrouPhrase(phrase) {
    const tokens = [];
    const re = /\p{L}+|[^\p{L}]+/gu;
    let m;
    while ((m = re.exec(phrase)) !== null) {
      tokens.push({ text: m[0], isWord: /\p{L}/u.test(m[0][0]) });
    }
    return tokens;
  }

  /* Volet grammatical uniquement (texte à trous, transformation) : ignore
     totalement la ponctuation (oubli de virgule/point toléré, cf.
     DicteesSpeech.normalizeSentence) ET accepte n'importe laquelle des
     réponses/formulations que l'enseignant a déclarées valables pour cet
     item, pas seulement la réponse principale. */
  function answerMatchesAny(typed, accepted) {
    const t = DicteesSpeech.normalizeSentence(typed);
    return accepted.some(a => DicteesSpeech.normalizeSentence(a) === t);
  }

  /* `step` démarre à null : le palier de départ dépend désormais de
     `ordreChoisi` ('lexical' ou 'grammatical', choisi par l'élève juste
     après le niveau — voir showOrdreChoice/chooseOrdre) et est fixé par le
     premier start() de currentSequence(), pas ici. */
  function freshState(niveauChoisi, ordreChoisi) {
    return {
      niveauChoisi,
      ordreChoisi,
      step: null,
      ex0: null,
      ex05: null,
      ex1: null,
      classification: null,
      trous: null,
      trousConj: null,
      transfo: null,
      redoChoiceResolved: {},  // { [step]: true } une fois le choix refaire/passer tranché pour ce step
      sectionResume: { lexical: null, gram: null },  // dernier step actif par section, voir renderStepBanner
      schemaVersion: SCHEMA_VERSION
    };
  }

  /* L'élève choisit librement son niveau (1/2/3) au démarrage de la dictée
     (écran dic-state-niveau-choice, voir showNiveauChoice) — pas de
     déblocage séquentiel ni de score minimum, contrairement à LevelSelect
     (js/level-select.js) : ce n'est pas une progression à valider, juste un
     filtre de contenu que l'élève ajuste lui-même à chaque tentative.
     Filtrage CUMULATIF : Niveau 2 = mots tagués 1 ET 2 (jamais 3) ; Niveau 3
     = tous les mots. Repli sur la liste complète si ce filtrage ne laisse
     aucun mot dans cette dictée précise (jamais d'exercice vide). Réutilisée
     telle quelle pour les phrases à trous (dictee_trous.niveau, même
     principe) : générique sur tout tableau d'objets portant un `.niveau`. */
  function filterByChosenNiveau(itemsToFilter, niveauChoisi) {
    const filtered = itemsToFilter.filter(m => m.niveau <= niveauChoisi);
    return filtered.length > 0 ? filtered : itemsToFilter;
  }

  /* ── Chargement ──────────────────────────────────────────────────────── */
  async function init() {
    const dicteeId = new URLSearchParams(window.location.search).get('id');
    if (!dicteeId) return showError();

    const session = await lfmAuth.getSession();
    if (!session) return showError("Connecte-toi pour faire cette dictée.");
    studentId = session.user.id;

    // Rejoue en tâche de fond d'éventuels résultats mis en attente lors d'un
    // précédent échec d'envoi (voir submitResult/submitGramResult) — jamais
    // bloquant pour le chargement de la dictée en cours.
    flushPendingResults();

    try {
      const { data: d, error: dErr } = await window.lfmDb
        .from('dictees').select('*').eq('id', dicteeId).single();
      if (dErr || !d) throw dErr || new Error('Dictée introuvable');

      const { data: m, error: mErr } = await window.lfmDb
        .from('dictee_mots').select('*').eq('dictee_id', dicteeId).order('ordre', { ascending: true });
      if (mErr) throw mErr;
      if (!m || m.length === 0) throw new Error('Aucun mot');

      dictee = d;
      allMots = m;
    } catch (e) {
      return showError();
    }

    /* Volet Orthographe grammaticale : facultatif, échec isolé (ex. migration
       pas encore appliquée) ne doit jamais bloquer le chargement du volet
       lexical déjà fonctionnel — repli sur des listes vides plutôt que
       showError(). */
    try {
      const [trousRes, trousConjRes, transfoRes, extraRes] = await Promise.all([
        window.lfmDb.from('dictee_trous').select('*, dictee_trous_mots(*)').eq('dictee_id', dicteeId).order('ordre', { ascending: true }),
        window.lfmDb.from('dictee_trous_conjugaison').select('*, dictee_trous_conjugaison_mots(*)').eq('dictee_id', dicteeId).order('ordre', { ascending: true }),
        window.lfmDb.from('dictee_transformations').select('*').eq('dictee_id', dicteeId).order('ordre', { ascending: true }),
        window.lfmDb.from('dictee_gram_extra_mots').select('*').eq('dictee_id', dicteeId).order('ordre', { ascending: true })
      ]);
      if (trousRes.error) throw trousRes.error;
      if (trousConjRes.error) throw trousConjRes.error;
      if (transfoRes.error) throw transfoRes.error;
      if (extraRes.error) throw extraRes.error;
      allGramTrous = (trousRes.data || []).filter(t => (t.dictee_trous_mots || []).length > 0);
      allGramTrousConj = (trousConjRes.data || []).filter(t => (t.dictee_trous_conjugaison_mots || []).length > 0);
      gramTransformations = transfoRes.data || [];
      gramExtraMots = extraRes.data || [];
    } catch (e) {
      console.warn('[LFM] DicteesEngine: volet orthographe grammaticale indisponible:', e.message);
      allGramTrous = []; allGramTrousConj = []; gramTransformations = []; gramExtraMots = [];
    }

    /* Historique des résultats déjà soumis par cet élève sur CETTE dictée
       (toutes tentatives passées, tous niveaux confondus — cette vérification
       d'existence ignore volontairement dictee_gram_results.niveau) : sert
       uniquement à proposer refaire/passer avant de relancer un exercice
       déjà fait (voir withRedoOrSkipCheck). Échec isolé sans conséquence :
       repli sur "rien de fait" plutôt que de bloquer le chargement. */
    try {
      const [lexRes, gramRes] = await Promise.all([
        window.lfmDb.from('dictee_results').select('id').eq('student_id', studentId).eq('dictee_id', dicteeId).eq('exercice', 1).limit(1),
        window.lfmDb.from('dictee_gram_results').select('type').eq('student_id', studentId).eq('dictee_id', dicteeId).limit(50)
      ]);
      if (lexRes.error) throw lexRes.error;
      if (gramRes.error) throw gramRes.error;
      const gramTypes = new Set((gramRes.data || []).map(r => r.type));
      alreadyDone = {
        1: (lexRes.data || []).length > 0,
        2: gramTypes.has('classification'),
        3: gramTypes.has('trous'),
        4: gramTypes.has('transformation'),
        5: gramTypes.has('trous_conjugaison')
      };
    } catch (e) {
      console.warn('[LFM] DicteesEngine: historique des résultats indisponible (refaire/passer désactivé):', e.message);
    }

    /* Uniquement les mots saisis manuellement pour cet exercice — jamais les
       mots de la dictée de mots (allMots), même tagués d'une nature
       grammaticale : ce couplage automatique a été retiré (retour
       utilisateur, cf. §2 en tête de fichier). */
    classificationPool = gramExtraMots.map(m => ({ id: m.id, contenu: m.contenu, nature_grammaticale: m.nature_grammaticale }));

    document.title = dictee.titre + ' — Dictée préparée — LFM';
    document.getElementById('dic-title').textContent = dictee.titre;
    /* setCurrent(), pas render() : dictee.html a déjà rendu le fil d'Ariane
       une fois (placeholder "Chargement…") — un second render() créerait
       une deuxième barre au lieu de mettre à jour la première. */
    if (typeof Breadcrumb !== 'undefined') Breadcrumb.setCurrent(dictee.titre);

    /* Reprise d'une dictée déjà commencée : le niveau choisi fait partie de
       l'état persisté, on ne le redemande pas (le reste de l'état — les ids
       de mots par palier — en dépend directement). saved.schemaVersion
       différent de SCHEMA_VERSION (ou absent, anciennes sessions) : la forme
       de `state` a changé depuis, on ignore la sauvegarde plutôt que de
       risquer un crash sur des champs disparus (voir note SCHEMA_VERSION en
       en-tête de fichier). Nouvelle dictée ou schéma périmé : écran de choix
       systématique. */
    const saved = loadState(dictee.id);
    if (saved && saved.niveauChoisi && saved.schemaVersion === SCHEMA_VERSION) {
      mots = filterByChosenNiveau(allMots, saved.niveauChoisi);
      gramTrous = filterByChosenNiveau(allGramTrous, saved.niveauChoisi);
      gramTrousConj = filterByChosenNiveau(allGramTrousConj, saved.niveauChoisi);
      state = saved;
      trapBackToNiveauChoice();
      render();
    } else {
      showNiveauChoice();
    }
  }

  /* ── Piège "un niveau de retour" pour le bouton retour du navigateur ────
     Sans ceci, un appui sur retour depuis un exercice quittait carrément
     dictee.html (vers la fiche dictée d'où l'élève venait) au lieu de
     revenir à l'écran de choix du niveau qui précède les exercices — retour
     utilisateur. On pousse une entrée d'historique dès qu'on quitte l'écran
     de choix du niveau (ici et dans chooseNiveau) ; le popstate déclenché
     par le bouton retour consomme cette entrée sans changer d'URL et
     ramène sur ce même écran plutôt que de quitter la page. Un second appui
     retour (aucune entrée piège encore posée à ce moment-là) quitte alors
     la page normalement, comme attendu. */
  function trapBackToNiveauChoice() {
    history.pushState({ dicteeExercise: true }, '', location.href);
  }

  window.addEventListener('popstate', () => {
    if (!dictee) return;
    showNiveauChoice();
  });

  /* ── Choix libre du niveau ───────────────────────────────────────────── */
  function showNiveauChoice() {
    DicteesSpeech.cancel(); // coupe une éventuelle lecture audio en cours si on y revient depuis un exercice
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-error').style.display = 'none';
    document.getElementById('dic-state-ordre-choice').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-niveau-choice').style.display = '';
    document.getElementById('dic-niveau-choice-grid').innerHTML = [1, 2, 3].map(n => `
      <button type="button" class="dic-niveau-choice-btn" data-niveau="${n}">
        <span class="dic-niveau-badge" style="--ls-color:var(--ls-color-${n})">Niveau de difficulté n°${n}</span>
      </button>
    `).join('');
    /* Sélecteur scopé à #dic-niveau-choice-grid, PAS un querySelectorAll
       global sur .dic-niveau-choice-btn : cette classe est réutilisée pour
       le style (pas la sélection) par les boutons ordre-choice et
       refaire/passer, déjà présents dans le DOM à ce moment — un sélecteur
       global les aurait aussi appariés et leur aurait posé un faux listener
       chooseNiveau(NaN) (data-niveau absent sur ces boutons-là), écrasant
       ensuite leur vrai onclick au clic (bug trouvé en testant redo/skip :
       le niveau filtré retombait silencieusement sur NaN → repli sur "tous
       les mots" dès que l'écran ordre-choice avait été affiché une fois). */
    document.querySelectorAll('#dic-niveau-choice-grid .dic-niveau-choice-btn').forEach(btn =>
      btn.addEventListener('click', () => chooseNiveau(parseInt(btn.dataset.niveau, 10)))
    );
  }

  /* Après le niveau, l'élève choisit ce qu'il veut travailler en premier
     (lexical ou grammatical) — mais seulement si la dictée a effectivement
     un volet grammatical à proposer ; sinon on démarre directement en
     lexical, sans écran de choix inutile (comportement identique à avant
     cette fonctionnalité). */
  function chooseNiveau(niveauChoisi) {
    // Garde défensive : un niveau invalide (bouton mal câblé, data-niveau
    // absent) ne doit jamais atteindre state.niveauChoisi — c'est la seule
    // façon dont ce champ pourrait devenir NaN (voir bug badge n°NaN corrigé
    // dans showNiveauChoice) et se propager ensuite dans tout le reste de la
    // session (filtrage des mots, affichage du badge de niveau).
    if (![1, 2, 3].includes(niveauChoisi)) return;
    trapBackToNiveauChoice();
    mots = filterByChosenNiveau(allMots, niveauChoisi);
    gramTrous = filterByChosenNiveau(allGramTrous, niveauChoisi);
    gramTrousConj = filterByChosenNiveau(allGramTrousConj, niveauChoisi);
    document.getElementById('dic-state-niveau-choice').style.display = 'none';
    // gramSteps()/lexicalSteps() combinent déjà le choix de l'enseignant
    // (dictee.inclut_lexicale/inclut_grammaticale) et le contenu réellement
    // saisi (une dictée peut avoir le volet grammatical coché mais aucun
    // exercice rempli) — un volet n'est "actif" que si les deux sont vrais.
    const hasLex = lexicalSteps().length > 0;
    const hasGram = gramSteps().length > 0;
    if (hasLex && hasGram) {
      showOrdreChoice(niveauChoisi);
    } else if (hasGram) {
      chooseOrdre(niveauChoisi, 'grammatical');
    } else if (hasLex) {
      chooseOrdre(niveauChoisi, 'lexical');
    } else {
      showError("Cette dictée ne propose aucun exercice pour le moment.");
    }
  }

  function showOrdreChoice(niveauChoisi) {
    document.getElementById('dic-state-ordre-choice').style.display = '';
    document.querySelectorAll('.dic-ordre-choice-btn').forEach(btn => {
      btn.onclick = () => chooseOrdre(niveauChoisi, btn.dataset.ordre);
    });
  }

  function chooseOrdre(niveauChoisi, ordreChoisi) {
    document.getElementById('dic-state-ordre-choice').style.display = 'none';
    // Pas de saveState() ici : currentSequence()[0].start() (startExercice0
    // ou l'un des startX grammaticaux) fixe `step` et sauvegarde tout de
    // suite — état jamais persisté avec step encore à null.
    state = freshState(niveauChoisi, ordreChoisi);
    currentSequence()[0].start();
  }

  function showError(msg) {
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-error').style.display = '';
    if (msg) document.querySelector('#dic-state-error p').textContent = msg;
  }

  /* ── Refaire pour s'entraîner / passer au suivant ────────────────────────
     Un palier scoré (1/2/3/4) dont l'élève a déjà une tentative en base
     (alreadyDone, chargé dans init()) ne se relance plus automatiquement :
     on lui propose d'abord de le refaire (entraînement, nouvelle tentative
     normale — submitResult/submitGramResult insèrent toujours une nouvelle
     ligne, jamais un écrasement, cf. "Mes dictées" qui affiche déjà la plus
     récente) ou de passer directement à la suite. `state.redoChoiceResolved`
     retient le choix pour ne pas re-proposer deux fois le même palier dans
     une même session déjà en cours (ex. retour arrière puis re-avance). */
  function withRedoOrSkipCheck(key, realStart) {
    return () => {
      const resolved = state.redoChoiceResolved && state.redoChoiceResolved[key];
      if (alreadyDone[key] && !resolved) {
        renderRedoOrSkipChoice(key, realStart);
      } else {
        realStart();
      }
    };
  }

  function renderRedoOrSkipChoice(key, realStart) {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne('');

    /* state.step positionné dès cet écran (avant même que realStart() ne le
       fasse) uniquement pour que renderStepBanner — normalement appelé par
       render(), qu'on court-circuite ici — reflète déjà le palier concerné
       plutôt que le précédent. markSectionResume() mémorise ce step comme
       dernier actif de sa section, pour que le switcher (voir
       renderStepBanner) sache y revenir. */
    state.step = key;
    markSectionResume();
    renderStepBanner();

    const seq = currentSequence();
    const idx = seq.findIndex(s => s.step === key);
    const current = idx >= 0 ? seq[idx] : null;
    const next = idx >= 0 ? seq[idx + 1] : undefined;

    const resolve = fn => {
      state.redoChoiceResolved = state.redoChoiceResolved || {};
      state.redoChoiceResolved[key] = true;
      saveState();
      fn();
    };

    document.getElementById('dic-item').innerHTML = `
      <p class="dic-niveau-choice-intro">Tu as déjà fait « ${escapeHtml(current ? current.label : 'cet exercice')} » sur cette dictée.</p>
      <div class="dic-niveau-choice-grid">
        <button type="button" class="dic-niveau-choice-btn" id="dic-redo-btn">🔁 Refaire pour t'entraîner</button>
        <button type="button" class="dic-niveau-choice-btn" id="dic-skip-btn">${next ? '⏭️ Passer à ' + escapeHtml(next.label) : '⏭️ Passer à la suite'}</button>
      </div>
    `;
    document.getElementById('dic-redo-btn').addEventListener('click', () => resolve(() => {
      resetStepState(key);
      realStart();
    }));
    document.getElementById('dic-skip-btn').addEventListener('click', () => resolve(() => {
      if (next) next.start();
      else advanceAfter(key, 'Dictée terminée !', 'Tu as déjà fait tous les exercices disponibles pour cette dictée.');
    }));
  }

  /* ── Rendu général ───────────────────────────────────────────────────── */
  /* Étapes du volet grammatical, calculées à partir des données réellement
     chargées : une dictée n'a pas forcément les 3 exercices renseignés, dans
     ce cas l'étape correspondante n'apparaît ni dans le bandeau ni dans le
     parcours (voir finishGramStep). */
  function gramSteps() {
    if (dictee.inclut_grammaticale === false) return [];
    const steps = [];
    if (classificationPool.length > 0) steps.push({ step: 2, label: 'Classification', icon: '🏷️', start: withRedoOrSkipCheck(2, startClassification) });
    if (gramTrous.length > 0) steps.push({ step: 3, label: 'Texte à trous', icon: '🧩', start: withRedoOrSkipCheck(3, startTrous) });
    if (gramTrousConj.length > 0) steps.push({ step: 5, label: 'Trous — conjugaison', icon: '🔤', start: withRedoOrSkipCheck(5, startTrousConjugaison) });
    if (gramTransformations.length > 0) steps.push({ step: 4, label: 'Transformation', icon: '🔄', start: withRedoOrSkipCheck(4, startTransformation) });
    return steps;
  }

  /* Ordre interne au bloc lexical (0 → 0.5 → 1) toujours fixe — seul l'ordre
     RELATIF entre le bloc lexical entier et le bloc grammatical entier varie
     selon ce que l'élève a choisi sur l'écran "que veux-tu travailler en
     premier ?" (voir chooseOrdre/showOrdreChoice). Vide si l'enseignant a
     décoché ce volet pour cette dictée (dictee.inclut_lexicale === false). */
  function lexicalSteps() {
    if (dictee.inclut_lexicale === false) return [];
    return [
      { step: 0, label: 'Photographie le mot', icon: '📸', color: 'var(--color-niveau-cm1)', start: startExercice0 },
      { step: 0.5, label: 'Effacement progressif', icon: '🧽', color: 'var(--color-niveau-cm2)', start: startPalier05 },
      { step: 1, label: 'Dictée audio', icon: '🎧', color: 'var(--color-niveau-6e)', start: withRedoOrSkipCheck(1, startExercice1) }
    ];
  }

  function currentSequence() {
    const gram = gramSteps();
    return state.ordreChoisi === 'grammatical' ? [...gram, ...lexicalSteps()] : [...lexicalSteps(), ...gram];
  }

  /* "Fait" se détermine par l'état RÉEL de chaque palier (unmastered vide),
     jamais par position dans la séquence : navigation libre entre onglets
     (retour utilisateur) — l'élève peut très bien terminer le palier 3 avant
     le palier 1, un critère positionnel donnerait alors un bandeau
     incohérent. state.exN/classification/trous/transfo restent `null` tant
     que le palier correspondant n'a jamais été démarré cette session (ni
     "fait" ni "en cours", juste l'état par défaut du bouton). Extrait de
     stepStatus (même définition de "terminé") pour être réutilisé par
     isFullSessionComplete() — voir plus bas, sert à poser
     dictee_results/dictee_gram_results.session_complete au moment de
     chaque soumission de résultat. */
  function isStepDone(step) {
    return !!{
      0: state.ex0 && state.ex0.unmastered.length === 0,
      0.5: state.ex05 && state.ex05.unmastered.length === 0,
      1: state.ex1 && state.ex1.unmastered.length === 0,
      2: state.classification && state.classification.unmastered.length === 0,
      3: state.trous && (state.trous.unmastered.length === 0 || state.trous.attempts >= state.trous.maxAttempts),
      4: state.transfo && state.transfo.unmastered.length === 0,
      5: state.trousConj && (state.trousConj.unmastered.length === 0 || state.trousConj.attempts >= state.trousConj.maxAttempts)
    }[step];
  }

  /* Chaque tuile d'étape porte aussi dic-tab--gram pour les paliers 2/3/4
     (classification/trous/transformation) : coloration ambre distincte du
     bleu lexical (voir css/dictees.css), pour que l'élève voie tout de suite
     à quel bloc de travail il est en train de passer. */
  function stepStatus(s) {
    if (s.step === state.step) return 'active';
    return isStepDone(s.step) ? 'done' : '';
  }

  /* Une "session complète" pour la pastille de niveau (§ voir migration
     20260914100000) : retour utilisateur — Classification/Trous-conjugaison/
     Transformation ne doivent plus compter (activés mais non faits, ils ne
     bloquent plus le statut "complet"). Palier requis = les 3 paliers
     lexicaux (0/0.5/1, cf. lexicalSteps() — vide si inclut_lexicale ===
     false) + le palier 3 (Texte à trous) SEULEMENT s'il fait partie de la
     séquence de cette dictée (gramSteps() ne le renvoie que si l'enseignant
     l'a renseigné ET inclut_grammaticale !== false) ; PAS "tous les paliers
     de currentSequence()" comme avant.

     Cas limite explicite : si le sous-ensemble requis est vide (dictée sans
     volet lexical ET sans Texte à trous, ex. dictée purement Classification/
     Transformation) — aucune dictée existante n'est dans ce cas au
     2026-09-14 (vérifié en base : inclut_lexicale = false sur aucune ligne),
     mais le schéma l'autorise (le formulaire exige seulement qu'AU MOINS un
     des deux volets lexical/grammatical reste actif, pas spécifiquement le
     lexical) — retourne false plutôt que le true vacueux de
     `[].every(...)`, pour ne jamais afficher "session complète" avant que
     l'élève ait fait quoi que ce soit.

     Appelée à chaque submitResult/submitGramResult, juste avant l'écriture :
     le palier qui vient de finir a déjà mis à jour son state.xxx.unmastered
     à ce moment-là (submit est toujours appelé une fois le palier fini), les
     autres reflètent l'état cumulé depuis le début de la session
     (sessionStorage), donc au plus UNE ligne par session réellement menée à
     son terme se retrouve avec session_complete = true — celle du tout
     dernier palier requis fini, quel que soit l'ordre dans lequel l'élève
     les a enchaînés. */
  function isFullSessionComplete() {
    const required = lexicalSteps().map(s => s.step);
    if (gramSteps().some(s => s.step === 3)) required.push(3);
    if (required.length === 0) return false;
    return required.every(isStepDone);
  }

  function tabButtonHTML(s) {
    const status = stepStatus(s);
    const cls = status === 'done' ? 'dic-tab--done' : status === 'active' ? 'dic-tab--active' : '';
    const gramCls = s.step >= 2 ? 'dic-tab--gram' : '';
    const colorStyle = s.color ? ` style="--dic-tab-color:${s.color}"` : '';
    return `<button type="button" class="dic-tab ${cls} ${gramCls}"${colorStyle}><span class="dic-tab-icon">${s.icon}</span>${s.label}</button>`;
  }

  /* Mémorise state.step comme dernier exercice actif de sa section — appelé
     à chaque vraie navigation (render(), renderRedoOrSkipChoice()), jamais
     au survol/affichage seul. Sert au switcher (voir renderStepBanner) pour
     reprendre le bon exercice au lieu de changer les onglets sans
     resynchroniser le contenu affiché (bug remonté par retour
     utilisateur). */
  function markSectionResume() {
    state.sectionResume[state.step >= 2 ? 'gram' : 'lexical'] = state.step;
  }

  /* Switcher "segmented control" — volontairement plus discret que .dic-tab
     (retour utilisateur). Absent si un seul des deux volets est actif pour
     cette dictée (rien à basculer). */
  function sectionSwitcherHTML(active) {
    return `
      <div class="dic-section-switcher" role="tablist">
        <button type="button" class="dic-section-switch-btn dic-section-switch-btn--lexical${active === 'lexical' ? ' dic-section-switch-btn--active' : ''}" data-section="lexical" aria-pressed="${active === 'lexical'}">📘 Orthographe lexicale</button>
        <button type="button" class="dic-section-switch-btn dic-section-switch-btn--gram${active === 'gram' ? ' dic-section-switch-btn--active' : ''}" data-section="gram" aria-pressed="${active === 'gram'}">✏️ Orthographe grammaticale</button>
      </div>`;
  }

  /* Bandeau = UN SEUL groupe affiché à la fois (retour utilisateur : les 2
     groupes empilés en permanence faisaient trop d'éléments à scanner),
     avec le switcher au-dessus pour basculer — mais TOUS les onglets des
     deux groupes restent cliquables à tout moment une fois affichés :
     navigation libre inchangée, seule la présentation change. La section
     affichée suit TOUJOURS state.step (jamais de "prévisualisation" à
     part — ça désynchronisait le bandeau du contenu réellement affiché,
     bug remonté par retour utilisateur) : cliquer le switcher déclenche une
     vraie navigation, voir plus bas.

     Chaque tuile d'exercice est un vrai <button> qui appelle s.start
     directement : s.start est déjà le bon point d'entrée
     (withRedoOrSkipCheck pour les paliers scorés 1/2/3/4, start direct pour
     0/0.5) — cliquer sur l'onglet courant relance simplement le même palier
     (startXXX est idempotente, voir plus bas : elle reprend l'état en cours
     au lieu de le réinitialiser). */
  function renderStepBanner() {
    const banner = document.getElementById('dic-step-banner');
    const lex = lexicalSteps();
    const gram = gramSteps();
    const hasBoth = lex.length > 0 && gram.length > 0;
    const section = state.step >= 2 ? 'gram' : 'lexical';
    const isGram = section === 'gram';
    const steps = isGram ? gram : lex;
    const label = isGram ? 'Orthographe grammaticale' : 'Orthographe lexicale';
    const icon = isGram ? '✏️' : '📘';

    const switcherOrLabel = hasBoth
      ? sectionSwitcherHTML(section)
      : `<div class="dic-section-label ${isGram ? 'dic-section-label--gram' : 'dic-section-label--lexical'}">${icon} ${label}</div>`;

    banner.innerHTML = `
      <div class="dic-tab-group">
        ${switcherOrLabel}
        <div class="dic-tab-bar">${steps.map(tabButtonHTML).join('')}</div>
      </div>`;

    if (hasBoth) {
      /* Au clic : reprend le dernier exercice actif de la section visée
         (state.sectionResume) si l'élève y était déjà venu cette session,
         sinon lance son premier onglet — jamais un simple changement
         d'affichage, cf. bug remonté par retour utilisateur. */
      banner.querySelectorAll('.dic-section-switch-btn').forEach(btn => {
        const targetSection = btn.dataset.section;
        if (targetSection === section) return; // déjà affichée, rien à faire
        btn.addEventListener('click', () => {
          const targetSteps = targetSection === 'gram' ? gram : lex;
          const resumeStep = state.sectionResume[targetSection];
          const target = targetSteps.find(s => s.step === resumeStep) || targetSteps[0];
          target.start();
        });
      });
    }
    banner.querySelectorAll('.dic-tab').forEach((btn, i) => btn.addEventListener('click', steps[i].start));

    /* Hors de la ligne d'onglets (élément séparé, #dic-niveau-indicator,
       affiché juste au-dessus) — retour utilisateur : partager le même
       conteneur flex que les onglets, avec un style de pastille identique,
       laissait croire à une 4e option cliquable alors que c'est une simple
       info d'état sur la session en cours (jamais modifiable ici, voir
       showNiveauChoice pour le seul écran où le niveau est un vrai choix). */
    document.getElementById('dic-niveau-indicator').innerHTML =
      `<span class="dic-niveau-dot" style="--ls-color:var(--ls-color-${state.niveauChoisi})"></span>Niveau de difficulté n°${state.niveauChoisi}`;
  }

  function render() {
    document.getElementById('dic-state-loading').style.display = 'none';
    document.getElementById('dic-state-error').style.display = 'none';
    markSectionResume();
    renderStepBanner();
    if (state.step === 0) renderExercice0();
    else if (state.step === 0.5) renderPalier05();
    else if (state.step === 1) renderExercice1();
    else if (state.step === 2) renderClassification();
    else if (state.step === 3) renderTrousExercise();
    else if (state.step === 5) renderTrousConjugaisonExercise();
    else renderTransformation();
  }

  /* Remet à zéro l'état local d'un palier pour permettre une vraie nouvelle
     tentative (bouton "Refaire pour t'entraîner", disponible sur les 6
     écrans de fin — retour utilisateur : jusqu'ici réservé à Dictée audio et
     Transformation) : startExercice0/startPalier05/startExercice1/
     startClassification/startTrous/startTransformation sont tous idempotents
     (`if (!state.exN)`), donc sans ce reset ils se contentent de reprendre
     l'ancien state.exN déjà terminé et ré-affichent le même écran de
     résultats en boucle (bug déjà corrigé une 1ère fois pour la dictée
     audio). Chaque nouvelle tentative reste bien historisée :
     submitResult/submitGramResult insèrent toujours une nouvelle ligne,
     jamais un écrasement (cf. "Mes dictées", qui n'affiche que la plus
     récente — pas besoin de contrainte d'unicité côté base pour ça). */
  function resetStepState(step) {
    if (step === 0) state.ex0 = null;
    else if (step === 0.5) state.ex05 = null;
    else if (step === 1) state.ex1 = null;
    else if (step === 2) state.classification = null;
    else if (step === 3) state.trous = null;
    else if (step === 4) state.transfo = null;
    else if (step === 5) state.trousConj = null;
  }

  /* Bouton "refaire" partagé par les 6 écrans de fin (advanceAfter pour 1/4,
     chacun des 4 autres écrans dédiés pour 0/0.5/2/3 — ces derniers ne
     passent pas par advanceAfter, cf. en-tête des paliers correspondants).
     `restart` est appelé APRÈS le reset : passer directement la fonction
     start du palier (jamais besoin de repasser par withRedoOrSkipCheck ici,
     l'élève vient déjà de voir/choisir de refaire sur cet écran). */
  function redoButtonHTML() {
    return `<button type="button" class="dic-card-btn" id="dic-redo-again-btn" style="width:auto;padding:12px 28px;background:#fff;color:var(--blue);border:2px solid var(--blue);">🔁 Refaire pour t'entraîner</button>`;
  }
  function wireRedoButton(step, restart) {
    const btn = document.getElementById('dic-redo-again-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      resetStepState(step);
      state.redoChoiceResolved = state.redoChoiceResolved || {};
      state.redoChoiceResolved[step] = true;
      saveState();
      restart();
    });
  }

  /* Fin d'un palier (lexical 1, ou grammatical 2/3/4) : enchaîne sur le
     palier suivant dans currentSequence() — qui reflète l'ordre choisi par
     l'élève (lexical d'abord ou grammatical d'abord, voir chooseOrdre) —
     sinon affiche l'écran de fin du module entier. Remplace l'ancien
     finishGramStep (qui ne connaissait que l'ordre lexical→grammatical figé,
     incompatible avec le choix d'ordre). Propose aussi de refaire ce même
     palier (retour utilisateur) : jusqu'ici, ce choix n'était offert qu'en
     rentrant à nouveau sur l'onglet du palier (withRedoOrSkipCheck), jamais
     directement sur cet écran de fin. */
  function advanceAfter(step, title, detail) {
    const seq = currentSequence();
    const idx = seq.findIndex(s => s.step === step);
    const current = idx >= 0 ? seq[idx] : null;
    const next = idx >= 0 ? seq[idx + 1] : undefined;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = title;
    document.getElementById('dic-final-detail').textContent = detail;

    const redoBtn = current ? redoButtonHTML() : '';
    const nextBtn = next
      ? `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers ${next.label} →</button>`
      : `<a href="français-orthographe.html" class="dic-card-btn" style="width:auto;padding:12px 28px;">← Retour à l'Orthographe</a>`;
    document.getElementById('dic-final-actions').innerHTML = redoBtn + nextBtn;

    if (next) document.getElementById('dic-next-ex-btn').addEventListener('click', next.start);
    if (current) wireRedoButton(step, current.start);
  }

  /* Écrit le texte du bloc consigne (icône 💡, #dic-intro-consigne) en
     l'enveloppant dans un <span> plutôt que de laisser le texte (et un
     éventuel <br> pour les consignes à 2 phrases) directement enfant du
     conteneur flex : un <br> child direct d'un display:flex devient lui-même
     un flex item séparé, ce qui casse le centrage vertical de l'icône
     (chaque fragment de texte se centre sur sa propre hauteur au lieu du
     bloc entier — bug remonté par retour utilisateur). Le <span> redevient
     LE seul 2e flex item ; le <br> à l'intérieur se comporte alors
     normalement. `html` peut être vide (écran qui masque la consigne, voir
     :empty dans css/dictees.css) ou contenir du HTML de confiance (chaînes
     statiques du fichier, jamais de contenu élève). */
  function setConsigne(html) {
    const el = document.getElementById('dic-intro-consigne');
    el.innerHTML = html ? `<span>${html}</span>` : '';
  }

  /* Barre de progression partagée par tous les paliers scorés (0, 0.5, 1,
     2, 3, 4) — remplace l'ancien texte brut "Il reste X…" par une barre
     remplie proportionnellement + un compteur "X sur Y" (retour utilisateur :
     texte seul insuffisamment lisible). `current` = déjà fait/maîtrisé,
     jamais l'index de l'élément en cours, pour que la barre se remplisse au
     fur et à mesure plutôt que de sauter à la fin. */
  function progressBarHTML(current, total, label) {
    const pct = total > 0 ? Math.round((current / total) * 100) : 0;
    return `
      <div class="dic-progress">
        <div class="dic-progress-label"><span>${escapeHtml(label)}</span><span>${current} sur ${total}</span></div>
        <div class="dic-progress-track"><div class="dic-progress-fill" style="width:${pct}%"></div></div>
      </div>`;
  }

  function renderListenAndInputHTML(counterHTML) {
    return `
      ${counterHTML}
      <div class="dic-listen-row">
        <button type="button" class="dic-listen-btn" id="dic-listen-btn">🔊 Réécouter</button>
      </div>
      <div class="dic-input-row">
        <input type="text" class="dic-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Écris ce que tu entends…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
  }

  function wireItem(mot, onValidate) {
    document.getElementById('dic-listen-btn').addEventListener('click', () => speakCurrent(mot.contenu));
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    document.getElementById('dic-input').addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    speakCurrent(mot.contenu);
    // Toujours palier 1 (dictée audio, seul appelant de wireItem) — garde
    // state.step au cas où l'élève aurait déjà changé d'onglet en 80ms.
    setTimeout(() => { if (state.step === 1) document.getElementById('dic-input')?.focus(); }, 80);
  }

  function speakCurrent(text) {
    const btn = document.getElementById('dic-listen-btn');
    if (btn) btn.disabled = true;
    DicteesSpeech.speak(text, () => { if (btn) btn.disabled = false; });
  }

  /* ── Exercice 0 : photographie le mot ────────────────────────────────── */
  /* Point d'entrée du bloc lexical — appelé soit tout de suite après le
     choix du niveau (bloc lexical choisi en premier), soit après le bloc
     grammatical entier (bloc grammatical choisi en premier), voir
     currentSequence()/chooseOrdre(). Mécanique de tirage differé identique à
     avant (deck mélangé, unmastered = mots pas encore réussis) : un mot
     raté reste hors du deck courant et ne revient qu'au réapprovisionnement,
     donc jamais immédiatement après. Pas de champ submitted/wrongAny : ce
     palier n'écrit jamais en base (voir en-tête du fichier). */
  /* Idempotent (comme les 5 autres startXXX) — navigation libre entre
     onglets, voir renderStepBanner : cliquer sur un onglet déjà commencé
     doit reprendre le deck/le mot en cours tel quel, jamais repartir de
     zéro. Seul un state.exN encore absent déclenche une vraie
     initialisation ; `startedAt` (remplace l'ancienne variable globale
     exStartTime, qui se faisait écraser par le dernier palier démarré dès
     qu'on pouvait naviguer librement entre paliers) n'est posé qu'à ce
     moment-là, jamais à chaque reprise. */
  function startExercice0() {
    state.step = 0;
    if (!state.ex0) {
      const ids = mots.map(m => m.id);
      state.ex0 = {
        unmastered: ids,
        deck: shuffle(ids),
        current: null,
        phase: 'intro',   // 'intro' (écran de lancement) → 'photo' (mot affiché) → 'input' (saisie, correction automatique)
        correct: 0,          // mots mémorisés cumulés (toujours égal à total en fin d'exercice — retries illimités)
        correctFirstTry: 0,  // score réellement soumis : mots réussis dès le 1er passage, jamais les retries
        attempts: 0,
        wrongIds: [],
        submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function drawNextExercice0() {
    if (state.ex0.deck.length === 0) state.ex0.deck = shuffle(state.ex0.unmastered);
    state.ex0.current = state.ex0.deck.shift();
    state.ex0.phase = 'photo';
  }

  /* Écran de lancement : laisse l'élève lire la consigne à son rythme avant
     que le premier mot ne s'affiche puis disparaisse — sans ce sas, le mot
     flashait dès l'arrivée sur l'écran et la consigne n'avait pas eu le
     temps d'être lue (retour utilisateur). */
  function renderExercice0Intro() {
    setConsigne("Observe bien le mot affiché : il va disparaître.<br>Écris-le ensuite de mémoire.");
    document.getElementById('dic-item').innerHTML = `
      <div class="dic-actions" style="margin-top:18px;">
        <button type="button" class="dic-card-btn" id="dic-start-btn" style="width:auto;padding:12px 28px;">Lancer l'exercice</button>
      </div>
    `;
    document.getElementById('dic-start-btn').addEventListener('click', () => {
      state.ex0.phase = 'photo';
      saveState();
      render();
    });
  }

  function renderExercice0() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';

    if (state.ex0.phase === 'intro') return renderExercice0Intro();

    setConsigne("Observe bien le mot affiché : il va disparaître.<br>Écris-le ensuite de mémoire.");

    if (state.ex0.unmastered.length === 0) {
      showExercice0Results();
      if (!state.ex0.submitted) {
        state.ex0.submitted = true;
        saveState();
        submitResult(0, state.ex0.correctFirstTry, mots.length, state.ex0.wrongIds.length === 0,
          Math.round((Date.now() - state.ex0.startedAt) / 1000), state.ex0.attempts, state.ex0.wrongIds);
      }
      return;
    }
    if (state.ex0.current == null) { drawNextExercice0(); saveState(); }

    const mot = motById(state.ex0.current);
    const remaining = state.ex0.unmastered.length;
    const total = mots.length;
    const counterHTML = `<div class="dic-counters">${progressBarHTML(total - remaining, total, 'Mots photographiés')}</div>`;

    if (state.ex0.phase === 'photo') {
      document.getElementById('dic-item').innerHTML = `
        ${counterHTML}
        <div class="dic-flash-wrap"><div class="dic-flash-word">${escapeHtml(mot.contenu)}</div></div>
      `;
      /* ~1,5 s de base + 0,3 s par caractère (espaces compris, un groupe de
         mots comme "les enfants jouaient" doit rester lisible plus longtemps
         qu'un seul mot court). */
      const displayMs = Math.round((1.5 + 0.3 * mot.contenu.length) * 1000);
      /* Garde state.step === 0 (navigation libre entre onglets) : si
         l'élève a quitté ce palier avant la fin du délai, on ne fait rien —
         ni changement de phase, ni render() de l'écran actuellement affiché
         ailleurs — plutôt que de faire disparaître le mot sans qu'il l'ait
         vu. La carte se re-déclenche fraîche (nouveau délai complet) au
         retour sur ce palier, tant que phase reste 'photo'. */
      setTimeout(() => {
        if (state.step === 0 && state.ex0.current === mot.id && state.ex0.phase === 'photo') {
          state.ex0.phase = 'input';
          saveState();
          render();
        }
      }, displayMs);
      return;
    }

    /* phase === 'input' : correction automatique (DicteesSpeech.normalize,
       même comparaison que pour l'exercice 1) — le site tranche juste/faux,
       jamais l'élève. */
    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      <div class="dic-input-row">
        <input type="text" class="dic-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Écris le mot de mémoire…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
    const input = document.getElementById('dic-input');
    const onValidate = () => {
      if (!input || !input.value.trim() || input.disabled) return;
      const typed = input.value;
      const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
      input.disabled = true;
      document.getElementById('dic-val-btn').disabled = true;
      input.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.ex0.attempts++;

      if (isRight) {
        state.ex0.correct++;
        /* Un mot réussi n'est plus jamais retenté (retiré du deck juste en
           dessous) : s'il n'a jamais été raté avant, cette réussite est donc
           forcément sa toute première et unique tentative — pas de risque de
           double-compte, contrairement au palier 0.5 (retries multiples sur
           le même mot avant maîtrise, cf. startPalier05/attemptedIds). */
        if (!state.ex0.wrongIds.includes(mot.id)) state.ex0.correctFirstTry++;
        state.ex0.unmastered = state.ex0.unmastered.filter(id => id !== mot.id);
        state.ex0.deck = state.ex0.deck.filter(id => id !== mot.id);
      } else {
        /* Une entrée par échec réel, pas par mot distinct (retiré le garde
           `!wrongIds.includes(mot.id)` qui plafonnait à 1 occurrence par mot
           même si retenté 3-4 fois avant réussite) : wrong_mot_ids doit
           refléter le nombre de fois où le mot a été raté, pas juste "a été
           raté au moins une fois" — c'est ce que compte
           js/dictees-word-stats.js/tally côté "erreurs les plus fréquentes",
           et ce que sous-comptait ce garde (bug remonté 2026-08-16 :
           "désormais (1)" alors que raté 3 fois). .includes() ci-dessus
           reste valable pour correctFirstTry, qui ne teste que la présence,
           pas le nombre d'occurrences. */
        state.ex0.wrongIds.push(mot.id);
      }

      /* Uniquement le verdict automatique : la saisie de l'élève reste
         visible juste au-dessus dans le champ, jamais répétée ici. */
      document.getElementById('dic-feedback').innerHTML = isRight
        ? '<div class="dic-feedback-correct">✅ Correct</div>'
        : `<div class="dic-feedback-wrong">❌ Incorrect — le mot correct est <span class="dic-correct-word">${escapeHtml(mot.contenu)}</span></div>`;
      state.ex0.current = null;
      saveState();
      // État déjà avancé synchroniquement ci-dessus : ce timer ne fait que
      // différer le rafraîchissement visuel. Garde state.step (navigation
      // libre) pour ne pas re-rendre par-dessus un autre palier si l'élève
      // a changé d'onglet pendant l'affichage du feedback.
      setTimeout(() => { if (state.step === 0) render(); }, isRight ? 900 : 2200);
    };
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    setTimeout(() => { if (state.step === 0) document.getElementById('dic-input')?.focus(); }, 80);
  }

  function showExercice0Results() {
    const total = mots.length;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = 'Photographie terminée !';
    document.getElementById('dic-final-detail').textContent =
      `${total} mot${total !== 1 ? 's' : ''} mémorisé${total !== 1 ? 's' : ''}.`;
    document.getElementById('dic-final-actions').innerHTML = redoButtonHTML() +
      `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers l'effacement progressif →</button>`;
    document.getElementById('dic-next-ex-btn').addEventListener('click', startPalier05);
    wireRedoButton(0, startExercice0);
  }

  /* ── Palier 0.5 : effacement progressif ──────────────────────────────── */
  /* Fraction de lettres masquées par passage (1 → 2, maîtrisé après le 2).
     Seules les lettres comptent (espaces, apostrophes, traits d'union
     toujours visibles) : sur un groupe comme "les enfants jouaient", le
     découpage en mots reste un repère constant, seule l'orthographe des
     lettres est à retrouver. */
  function maskFraction(passage) {
    return passage === 1 ? 0.25 : 0.6;
  }

  function computeMaskIndices(word, passage) {
    const letterPositions = [];
    for (let i = 0; i < word.length; i++) {
      if (/\p{L}/u.test(word[i])) letterPositions.push(i);
    }
    const count = Math.round(maskFraction(passage) * letterPositions.length);
    return shuffle(letterPositions).slice(0, count);
  }

  function renderMaskedWord(word, maskIndices) {
    const masked = new Set(maskIndices);
    return word.split('').map((ch, i) => masked.has(i) ? '_' : ch).join('');
  }

  function startPalier05() {
    state.step = 0.5;
    if (!state.ex05) {
      const ids = mots.map(m => m.id);
      state.ex05 = {
        unmastered: ids,
        deck: shuffle(ids),
        current: null,
        levels: Object.fromEntries(ids.map(id => [id, 1])),  // passage courant (1-3) par mot
        maskIndices: [],
        correct: 0,           // mots maîtrisés cumulés (toujours égal à total en fin d'exercice — retries illimités)
        correctFirstTry: 0,   // score réellement soumis : mots réussis dès leur toute première tentative
        attemptedIds: [],     // mots déjà tentés au moins une fois (un seul essai compte pour le score)
        attempts: 0,
        wrongIds: [],
        submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function drawNextPalier05() {
    if (state.ex05.deck.length === 0) state.ex05.deck = shuffle(state.ex05.unmastered);
    state.ex05.current = state.ex05.deck.shift();
    state.ex05.maskIndices = computeMaskIndices(motById(state.ex05.current).contenu, state.ex05.levels[state.ex05.current]);
  }

  function renderPalier05() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne("Complète le mot à trous. Il y aura de moins en moins d'indices à chaque passage.");

    if (state.ex05.unmastered.length === 0) {
      showPalier05Results();
      if (!state.ex05.submitted) {
        state.ex05.submitted = true;
        saveState();
        /* exercice = 3 (jamais 2, cf. migration 20260907110000) : 2 est lu
           ailleurs — dic-stat-completees/dic-stat-sans-faute côté dashboard
           élève — avec une sémantique héritée d'un ancien schéma sans rapport
           avec ce palier, jamais réactivée jusqu'ici faute d'écriture. */
        submitResult(3, state.ex05.correctFirstTry, mots.length, state.ex05.wrongIds.length === 0,
          Math.round((Date.now() - state.ex05.startedAt) / 1000), state.ex05.attempts, state.ex05.wrongIds);
      }
      return;
    }
    if (state.ex05.current == null) { drawNextPalier05(); saveState(); }

    const mot = motById(state.ex05.current);
    const passage = state.ex05.levels[mot.id];
    const remaining = state.ex05.unmastered.length;
    const total = mots.length;
    const counterHTML = `
      <div class="dic-counters">
        ${progressBarHTML(total - remaining, total, 'Mots maîtrisés')}
        <div class="dic-passage-badge">Passage ${passage} / 2</div>
      </div>`;

    const hintHTML = `<div class="dic-flash-wrap"><div class="dic-flash-word dic-mask-word">${escapeHtml(renderMaskedWord(mot.contenu, state.ex05.maskIndices))}</div></div>`;

    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      ${hintHTML}
      <div class="dic-input-row">
        <input type="text" class="dic-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Complète le mot…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
    const input = document.getElementById('dic-input');
    /* Correction automatique (DicteesSpeech.normalize, comme au palier 0) :
       le site tranche et fait progresser/reculer le mot entre les 2 passages
       — maîtrisé (retiré du tirage) dès la réussite au passage 2. */
    const onValidate = () => {
      if (!input || !input.value.trim() || input.disabled) return;
      const typed = input.value;
      const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
      input.disabled = true;
      document.getElementById('dic-val-btn').disabled = true;
      input.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.ex05.attempts++;

      /* Un même mot peut être retenté plusieurs fois (recul d'un passage sur
         échec) avant d'être maîtrisé — contrairement au palier 0, une
         réussite ne suffit donc pas à garantir qu'il s'agit de la 1ère
         tentative. `attemptedIds` isole ce moment une seule fois par mot,
         pour ne compter dans correctFirstTry que les mots réussis dès leur
         tout premier essai (jamais après un recul), sans quoi le score
         soumis vaudrait toujours 100 % par construction (l'exercice ne finit
         qu'une fois tous les mots maîtrisés — même bug que celui déjà corrigé
         sur la classification, voir validateClassification). */
      const firstAttempt = !state.ex05.attemptedIds.includes(mot.id);
      if (firstAttempt) state.ex05.attemptedIds.push(mot.id);

      if (isRight) {
        state.ex05.correct++;
        if (firstAttempt) state.ex05.correctFirstTry++;
        if (passage >= 2) {
          state.ex05.unmastered = state.ex05.unmastered.filter(id => id !== mot.id);
          state.ex05.deck = state.ex05.deck.filter(id => id !== mot.id);
        } else {
          state.ex05.levels[mot.id] = passage + 1;
        }
      } else {
        // Une entrée par échec réel (pas de garde de dédoublonnage) — même
        // correction que le palier 0 ci-dessus, voir son commentaire.
        state.ex05.wrongIds.push(mot.id);
        state.ex05.levels[mot.id] = Math.max(1, passage - 1);
      }

      /* Écran de correction : uniquement le verdict automatique, la saisie de
         l'élève reste visible juste au-dessus dans le champ (pas de doublon
         "Tu as écrit"). */
      document.getElementById('dic-feedback').innerHTML = isRight
        ? '<div class="dic-feedback-correct">✅ Correct</div>'
        : `<div class="dic-feedback-wrong">❌ Incorrect — le mot correct est <span class="dic-correct-word">${escapeHtml(mot.contenu)}</span></div>`;
      state.ex05.current = null;
      saveState();
      setTimeout(() => { if (state.step === 0.5) render(); }, isRight ? 900 : 2200);
    };
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    setTimeout(() => { if (state.step === 0.5) document.getElementById('dic-input')?.focus(); }, 80);
  }

  function showPalier05Results() {
    const total = mots.length;
    document.getElementById('dic-state-exercise').style.display = 'none';
    document.getElementById('dic-state-results').style.display = '';
    document.getElementById('dic-final-message').textContent = 'Effacement progressif terminé !';
    document.getElementById('dic-final-detail').textContent =
      `${total} mot${total !== 1 ? 's' : ''} maîtrisé${total !== 1 ? 's' : ''}.`;
    /* "Continuer vers l'exercice 1" (ancienne numérotation, cf. commentaire
       d'en-tête historique) n'a plus de sens dans le nouveau parcours et
       laissait croire à tort que le bloc lexical était déjà terminé — retour
       utilisateur. Reste bien dirigé vers startExercice1 (Dictée audio,
       toujours le 3e et dernier palier lexical) : seul le libellé change,
       la vraie fin du bloc lexical est gérée par showExercice1Results/
       advanceAfter, qui propose déjà correctement la suite vers le module
       grammatical. */
    document.getElementById('dic-final-actions').innerHTML = redoButtonHTML() +
      `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers la dictée audio →</button>`;
    document.getElementById('dic-next-ex-btn').addEventListener('click', startExercice1);
    wireRedoButton(0.5, startPalier05);
  }

  /* ── Exercice 1 : dictée audio ────────────────────────────────────────── */
  /* Idempotent comme les autres startXXX : re-rentrer sur l'onglet reprend
     la série/le phase en cours tel quel, jamais un redémarrage à zéro.
     `order` fige l'ordre (mélangé une fois) de la série complète des mots
     pour toute la durée du palier — plus de découpage en lots successifs,
     tous les mots sont présentés ensemble (retour utilisateur). `unmastered`
     ne sert plus au tirage (remplacé par `order`/`index`) : il ne sert plus
     qu'à signaler la fin du palier à stepStatus/renderStepBanner (vidé
     seulement une fois tout enchaîné : série → repêchage → reveal). Pas
     d'écran de lancement ici (contrairement à l'exercice 0) : consigne
     simple affichée directement, le premier mot est dicté dès l'arrivée sur
     l'écran (retour utilisateur — l'écran de lancement ne concerne que
     l'exercice 0, où le mot disparaît après un délai). */
  function startExercice1() {
    state.step = 1;
    if (!state.ex1) {
      state.ex1 = {
        order: shuffle(mots.map(m => m.id)),
        index: 0,
        unmastered: mots.map(m => m.id),
        phase: 'dictate',    // 'dictate' (série) → 'repechage' → 'reveal'
        answers: {},         // { [motId]: dernière saisie }, pour le reveal final
        firstTryWrong: [],   // ids ratés au 1er passage (candidats au repêchage)
        repechageIndex: 0,
        stillWrong: [],       // ids encore faux après repêchage (pour 'reveal')
        correctFirstTry: 0,   // stats cumulées sur toute la durée du palier
        attempts: 0,
        wrongIds: [],
        submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function renderExercice1() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';

    if (state.ex1.unmastered.length === 0) {
      showExercice1Results();
      if (!state.ex1.submitted) {
        state.ex1.submitted = true;
        saveState();
        /* sans_faute = aucun mot jamais faux au 1er passage (wrongIds vide) —
           corrigé d'un `false` codé en dur qui empêchait tout badge "sans
           faute"/"champion" de se déclencher sur ce palier (cf.
           js/dictees-badges.js), même motif que ex0/ex05. */
        submitResult(1, state.ex1.correctFirstTry, mots.length, state.ex1.wrongIds.length === 0,
          Math.round((Date.now() - state.ex1.startedAt) / 1000), state.ex1.attempts, state.ex1.wrongIds);
      }
      return;
    }

    if (state.ex1.phase === 'dictate') return renderDicteeMot();
    if (state.ex1.phase === 'repechage') return renderDicteeRepechage();
    return renderDicteeReveal();
  }

  function renderDicteeMot() {
    setConsigne('Écoute le mot puis écris-le.');

    const mot = motById(state.ex1.order[state.ex1.index]);
    document.getElementById('dic-item').innerHTML = renderListenAndInputHTML(
      `<div class="dic-counters">${progressBarHTML(state.ex1.index, state.ex1.order.length, 'Mots dictés')}</div>`
    );
    wireItem(mot, () => validateDicteeMot(mot));
  }

  /* Verdict juste/faux affiché systématiquement après chaque mot, mais
     jamais la correction (l'orthographe attendue) avant renderDicteeReveal,
     à la toute fin de l'exercice (retour utilisateur). Le passage au mot
     suivant est différé le temps que l'élève voie ce verdict (comme pour
     les autres paliers à correction immédiate, cf. exercice 0). */
  function validateDicteeMot(mot) {
    const input = document.getElementById('dic-input');
    if (!input || !input.value.trim() || input.disabled) return;

    const typed = input.value;
    const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
    input.disabled = true;
    document.getElementById('dic-val-btn').disabled = true;
    input.classList.add(isRight ? 'is-correct' : 'is-wrong');
    state.ex1.attempts++;
    state.ex1.answers[mot.id] = typed;

    if (isRight) {
      state.ex1.correctFirstTry++;
    } else {
      state.ex1.firstTryWrong.push(mot.id);
      // Chaque mot.id ne passe qu'une fois par `order` (cf. startExercice1) :
      // pas de garde de dédoublonnage nécessaire ici (mais retiré quand même
      // pour rester cohérent avec ex0/ex05 ci-dessus, même correction).
      state.ex1.wrongIds.push(mot.id);
    }

    document.getElementById('dic-feedback').innerHTML = isRight
      ? '<div class="dic-feedback-correct">✅ Juste</div>'
      : '<div class="dic-feedback-wrong">❌ Faux</div>';

    state.ex1.index++;
    if (state.ex1.index >= state.ex1.order.length) {
      if (state.ex1.firstTryWrong.length > 0) {
        state.ex1.phase = 'repechage';
      } else {
        state.ex1.unmastered = [];
      }
    }
    saveState();
    setTimeout(() => { if (state.step === 1) render(); }, isRight ? 900 : 1600);
  }

  /* Réécoute possible pendant le repêchage (bouton + auto-play, comme au
     passage "dictée" via wireItem/renderListenAndInputHTML) : sans ça
     l'élève n'a aucun moyen de savoir quel mot réécrire. Une seule
     tentative par mot, même verdict immédiat sans correction que
     validateDicteeMot ; révélation seulement si encore faux après ça. */
  function renderDicteeRepechage() {
    setConsigne('Dernière chance pour les mots ratés : réécoute et réécris-les.');

    const mot = motById(state.ex1.firstTryWrong[state.ex1.repechageIndex]);
    document.getElementById('dic-item').innerHTML = renderListenAndInputHTML(
      `<div class="dic-counters">${progressBarHTML(state.ex1.repechageIndex, state.ex1.firstTryWrong.length, 'Mots repêchés')}</div>`
    );
    wireItem(mot, () => validateRepechage(mot));
  }

  function validateRepechage(mot) {
    const input = document.getElementById('dic-input');
    if (!input || !input.value.trim() || input.disabled) return;

    const typed = input.value;
    const isRight = DicteesSpeech.normalize(typed) === DicteesSpeech.normalize(mot.contenu);
    input.disabled = true;
    document.getElementById('dic-val-btn').disabled = true;
    input.classList.add(isRight ? 'is-correct' : 'is-wrong');
    state.ex1.attempts++;
    state.ex1.answers[mot.id] = typed;
    if (!isRight) state.ex1.stillWrong.push(mot.id);

    document.getElementById('dic-feedback').innerHTML = isRight
      ? '<div class="dic-feedback-correct">✅ Juste</div>'
      : '<div class="dic-feedback-wrong">❌ Faux</div>';

    state.ex1.repechageIndex++;
    if (state.ex1.repechageIndex >= state.ex1.firstTryWrong.length) {
      if (state.ex1.stillWrong.length > 0) {
        state.ex1.phase = 'reveal';
      } else {
        state.ex1.unmastered = [];
      }
    }
    saveState();
    setTimeout(() => { if (state.step === 1) render(); }, isRight ? 900 : 1600);
  }

  function renderDicteeReveal() {
    setConsigne("Voici l'orthographe correcte des mots encore ratés après le repêchage.");
    /* Uniquement l'orthographe correcte (avec les lettres fautives mises en
       évidence) : tous les mots listés ici sont déjà connus comme ratés, pas
       besoin de répéter la saisie de l'élève (déjà vue pendant la
       série/le repêchage). */
    const rows = state.ex1.stillWrong.map(id => {
      const mot = motById(id);
      const typed = state.ex1.answers[id] || '';
      return `
        <div class="dic-feedback-area" style="margin-bottom:14px;">
          <div class="dic-feedback-wrong">❌ La bonne orthographe : <span class="dic-correct-word">${DicteesSpeech.diffHighlight(mot.contenu, typed)}</span></div>
        </div>`;
    }).join('');
    document.getElementById('dic-item').innerHTML = `
      ${rows}
      <div class="dic-actions" style="margin-top:8px;">
        <button type="button" class="dic-card-btn" id="dic-finish-btn" style="width:auto;padding:12px 28px;">Continuer →</button>
      </div>
    `;
    document.getElementById('dic-finish-btn').addEventListener('click', () => {
      state.ex1.unmastered = [];
      saveState();
      render();
    });
  }

  /* Fin du palier 1 : enchaîne vers le premier palier grammatical disponible
     (classification → texte à trous → transformation), sinon c'est l'écran
     de fin du module entier (cf. finishGramStep). */
  function showExercice1Results() {
    const total = mots.length;
    const score = state.ex1.correctFirstTry;
    advanceAfter(1, 'Dictée audio terminée !',
      `${score} mot${score !== 1 ? 's' : ''} juste${score !== 1 ? 's' : ''} du premier coup sur ${total}.`);
  }

  /* ── Palier 2 : classification par nature grammaticale ──────────────────
     Interaction "clic mot → clic nature" (même famille que
     classification-etapes de exercise.html, pas de drag-and-drop) : tous les
     mots restants sont affichés en même temps, l'élève en sélectionne un
     puis clique sa nature. `coolingDown` = mots ratés du cycle d'affichage
     courant, exclus tant que d'autres mots restent visibles (retiré
     seulement quand ils ont tous été retentés — jamais retenté
     immédiatement). `order` fixe l'ordre d'affichage pour toute la durée du
     palier (pas de remélange à chaque rendu, sinon les mots sauteraient). */
  function classificationWordById(id) { return classificationPool.find(w => w.id === id); }

  /* Tableau de synthèse cumulatif, sous la zone de classification : les mots
     correctement classés disparaissent de la zone active (moins de clutter)
     mais restent visibles ici, rangés par nature, pour que l'élève garde une
     vue d'ensemble de sa correction au fil de l'exercice (retour
     utilisateur — l'ancien comportement les faisait disparaître sans trace).
     Colonnes fixes dès le départ (toutes les natures présentes dans le lot,
     pas seulement celles déjà rencontrées) pour ne pas faire "sauter" la
     mise en page à chaque bonne réponse. */
  function classificationTableHtml(cs) {
    const masteredIds = cs.order.filter(id => !cs.unmastered.includes(id));
    const natures = [...new Set(cs.order.map(id => classificationWordById(id).nature_grammaticale))]
      .sort((a, b) => a.localeCompare(b, 'fr'));
    const byNature = new Map(natures.map(n => [n, []]));
    masteredIds.forEach(id => {
      const w = classificationWordById(id);
      byNature.get(w.nature_grammaticale).push(w);
    });
    return `
      <div class="dic-classify-table-wrap">
        <div class="dic-classify-table-title">Ton tableau de classification</div>
        <div class="dic-classify-table">
          ${natures.map(n => `
            <div class="dic-classify-col">
              <div class="dic-classify-col-header">${capitalizeFr(n)}</div>
              <div class="dic-classify-col-body">
                ${byNature.get(n).length
                  ? byNature.get(n).map(w => `<span class="dic-classify-chip">${escapeHtml(w.contenu)}</span>`).join('')
                  : '<span class="dic-classify-col-empty">—</span>'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  }

  function startClassification() {
    state.step = 2;
    if (!state.classification) {
      const order = shuffle(classificationPool.map(w => w.id));
      state.classification = {
        order, unmastered: order.slice(), coolingDown: [], selected: null,
        correctFirstTry: 0,  // score réellement soumis : voir validateClassification
        attemptedIds: [],    // mots déjà tentés au moins une fois (un seul essai compte pour le score)
        attempts: 0, submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function renderClassification() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne("Clique sur un mot, puis clique sur sa nature grammaticale.");

    const cs = state.classification;
    if (cs.unmastered.length === 0) return finishClassification();

    let visible = cs.order.filter(id => cs.unmastered.includes(id) && !cs.coolingDown.includes(id));
    if (visible.length === 0) {
      cs.coolingDown = [];
      saveState();
      visible = cs.order.filter(id => cs.unmastered.includes(id));
    }

    const remaining = cs.unmastered.length;
    const total = cs.order.length;
    const counterHTML = `<div class="dic-counters">${progressBarHTML(total - remaining, total, 'Mots classés')}</div>`;
    const tokensHTML = visible.map(id => {
      const w = classificationWordById(id);
      return `<button type="button" class="dic-classify-word ${cs.selected === id ? 'is-selected' : ''}" data-word-id="${id}">${escapeHtml(w.contenu)}</button>`;
    }).join('');
    const choicesHTML = cs.selected
      ? `<div class="dic-classify-choices">${NATURE_OPTIONS.map(n => `<button type="button" class="dic-classify-choice" data-nature="${n}">${capitalizeFr(n)}</button>`).join('')}</div>`
      : `<p class="dic-trou-hint">Sélectionne d'abord un mot ci-dessus.</p>`;

    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      <div class="dic-classify-words">${tokensHTML}</div>
      ${choicesHTML}
      <div class="dic-feedback-area" id="dic-feedback"></div>
      ${classificationTableHtml(cs)}
    `;

    document.querySelectorAll('.dic-classify-word').forEach(btn => {
      btn.addEventListener('click', () => {
        cs.selected = cs.selected === btn.dataset.wordId ? null : btn.dataset.wordId;
        saveState();
        render();
      });
    });
    document.querySelectorAll('.dic-classify-choice').forEach(btn => {
      btn.addEventListener('click', () => validateClassification(btn.dataset.nature));
    });
  }

  function validateClassification(chosenNature) {
    const cs = state.classification;
    const wordId = cs.selected;
    if (!wordId) return;
    const word = classificationWordById(wordId);
    const isRight = chosenNature === word.nature_grammaticale;
    cs.attempts++;

    /* Score soumis = uniquement les mots classés correctement au tout premier
       essai (comme correctFirstTry pour l'exercice 1 lexical) — un mot raté
       puis corrigé au repêchage ne doit jamais compter comme réussi, sinon le
       score atteint toujours 100% par construction : l'exercice ne se
       termine qu'une fois cs.unmastered vide, donc chaque mot finit
       nécessairement par y être retiré (cf. bug signalé, résultats toujours
       à 100% quel que soit le nombre d'erreurs). */
    const isFirstAttempt = !cs.attemptedIds.includes(wordId);
    if (isFirstAttempt) cs.attemptedIds.push(wordId);

    document.querySelectorAll('.dic-classify-word, .dic-classify-choice').forEach(b => { b.disabled = true; });
    const wordBtn = document.querySelector(`.dic-classify-word[data-word-id="${wordId}"]`);
    if (wordBtn) wordBtn.classList.add(isRight ? 'is-correct' : 'is-wrong');
    const choiceBtn = document.querySelector(`.dic-classify-choice[data-nature="${chosenNature}"]`);
    if (choiceBtn) choiceBtn.classList.add(isRight ? 'is-correct' : 'is-wrong');

    document.getElementById('dic-feedback').innerHTML = isRight
      ? '<div class="dic-feedback-correct">✅ Correct</div>'
      : `<div class="dic-feedback-wrong">❌ Incorrect — nature attendue : <span class="dic-correct-word">${capitalizeFr(word.nature_grammaticale)}</span></div>`;

    if (isRight) {
      if (isFirstAttempt) cs.correctFirstTry++;
      cs.unmastered = cs.unmastered.filter(id => id !== wordId);
    } else if (!cs.coolingDown.includes(wordId)) {
      cs.coolingDown.push(wordId);
    }
    cs.selected = null;
    saveState();
    setTimeout(() => { if (state.step === 2) render(); }, isRight ? 900 : 2200);
  }

  function finishClassification() {
    const cs = state.classification;
    if (!cs.submitted) {
      cs.submitted = true;
      saveState();
      submitGramResult('classification', cs.correctFirstTry, cs.order.length, Math.round((Date.now() - cs.startedAt) / 1000));
    }
    renderClassificationFinished(cs);
  }

  /* Contrairement aux autres paliers, l'écran de fin de la classification ne
     bascule PAS sur #dic-state-results (via advanceAfter) : le tableau de
     synthèse doit rester affiché une fois l'exercice terminé, pas disparaître
     — retour utilisateur, c'est le moment où l'élève mémorise visuellement
     son classement complet. On reste donc dans #dic-item avec le même
     tableau, plus le message de fin et le bouton "continuer" (même logique
     de séquence qu'advanceAfter, dupliquée ici car le conteneur DOM cible
     est différent). */
  function renderClassificationFinished(cs) {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne('Classification terminée !');

    const seq = currentSequence();
    const idx = seq.findIndex(s => s.step === 2);
    const current = idx >= 0 ? seq[idx] : null;
    const next = idx >= 0 ? seq[idx + 1] : undefined;
    const nextHTML = next
      ? `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers ${next.label} →</button>`
      : `<a href="français-orthographe.html" class="dic-card-btn" style="width:auto;padding:12px 28px;">← Retour à l'Orthographe</a>`;
    const actionsHTML = (current ? redoButtonHTML() : '') + nextHTML;

    document.getElementById('dic-item').innerHTML = `
      <div class="dic-final-message" style="margin-bottom:6px;">Classification terminée !</div>
      <div class="dic-final-detail" style="margin-bottom:10px;">${cs.correctFirstTry} mot${cs.correctFirstTry !== 1 ? 's' : ''} bien classé${cs.correctFirstTry !== 1 ? 's' : ''} du premier coup sur ${cs.order.length}.</div>
      ${classificationTableHtml(cs)}
      <div class="dic-actions" style="margin-top:20px;">${actionsHTML}</div>
    `;
    if (next) document.getElementById('dic-next-ex-btn').addEventListener('click', next.start);
    if (current) wireRedoButton(2, current.start);
  }

  /* ── Palier 3 : texte à trous ─────────────────────────────────────────────
     Exercice volontairement simplifié (retour utilisateur) : aucun indice de
     règle, un seul mot attendu par trou. Une phrase = un item du deck (même
     tirage differé unmastered/deck que le palier 0), MAIS contrairement aux
     autres paliers, une phrase ratée est immédiatement redemandée (pas de
     "jamais retenté immédiatement" ici) : state.trous.current n'est remis à
     null que si la phrase est réussie, cf. validateTrou — avec seulement 3
     tentatives au total, l'élève doit pouvoir corriger tout de suite
     l'erreur qu'il vient de faire, jamais retomber sur une autre phrase par
     tirage aléatoire (bug corrigé, signalé par l'enseignant). Score conservé
     au niveau du blanc (masteredBlankIds, dédupliqué) pour ne pas compter
     deux fois un blanc déjà réussi lors d'une nouvelle tentative de la même
     phrase — et réutilisé pour verrouiller l'affichage : un blanc déjà dans
     masteredBlankIds est rendu comme un input désactivé pré-rempli (retour
     utilisateur, bug corrigé : la phrase entière se réaffichait vide à
     chaque nouvel essai, obligeant à retaper aussi les mots déjà justes) —
     seuls les blancs encore faux redeviennent éditables, cf.
     renderTrousExercise/validateTrou. `answers` mémorise la dernière saisie
     par blanc pour réafficher ce que l'élève a réellement écrit une fois
     verrouillé (pas systématiquement l'orthographe canonique, cohérent avec
     la tolérance de DicteesSpeech.normalizeTrouAnswer). L'élève dispose de
     maxAttempts (3) tentatives « Valider » au total sur tout l'exercice,
     tous trous confondus — pas par phrase : dès que ce total est atteint (ou
     que tout est déjà maîtrisé avant), l'exercice s'arrête, cf.
     renderTrousExercise/renderTrousFinished. */
  function trouById(id) { return gramTrous.find(t => t.id === id); }

  function drawNextTrou() {
    if (state.trous.deck.length === 0) state.trous.deck = shuffle(state.trous.unmastered);
    state.trous.current = state.trous.deck.shift();
  }

  function startTrous() {
    state.step = 3;
    if (!state.trous) {
      const ids = gramTrous.map(t => t.id);
      state.trous = {
        unmastered: ids,
        deck: shuffle(ids),
        current: null,
        masteredBlankIds: [],
        answers: {},   // { [blankId]: dernière saisie } — pour réafficher un blanc verrouillé (déjà juste)
        totalBlanks: gramTrous.reduce((s, t) => s + t.dictee_trous_mots.length, 0),
        attempts: 0,
        maxAttempts: 3,
        submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function renderTrousExercise() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne("Écoute chaque mot manquant (🔊) puis récris-le.");

    if (state.trous.unmastered.length === 0 || state.trous.attempts >= state.trous.maxAttempts) return finishTrous();
    if (state.trous.current == null) { drawNextTrou(); saveState(); }

    const trou = trouById(state.trous.current);
    const tags = trou.dictee_trous_mots.slice().sort((a, b) => a.position - b.position);
    const tokens = tokenizeTrouPhrase(trou.phrase);
    const remaining = state.trous.unmastered.length;
    const total = gramTrous.length;
    const attemptsLeft = state.trous.maxAttempts - state.trous.attempts;
    const counterHTML = `
      <div class="dic-counters">
        ${progressBarHTML(total - remaining, total, 'Phrases complétées')}
        <div class="dic-passage-badge">${attemptsLeft} tentative${attemptsLeft !== 1 ? 's' : ''} restante${attemptsLeft !== 1 ? 's' : ''}</div>
      </div>`;

    /* Aucun mot n'est jamais affiché à l'écrit avant saisie — le bouton
       haut-parleur (DicteesSpeech.speak) est le seul support pour retrouver
       l'orthographe de chaque trou (retour utilisateur, exercice
       volontairement simplifié : plus d'indice de règle). Présentation en
       carte aérée + contraste renforcé (bordure bleue pleine sur les trous
       plutôt qu'un gris discret, interlignage large, espacement des mots) :
       lisibilité pensée pour un élève dyslexique, cf. retour utilisateur —
       aucune police "dys" dédiée n'est utilisée ailleurs sur le site
       (vérifié), on s'appuie donc uniquement sur contraste/taille/espacement
       avec la police existante du site.

       Un blanc déjà dans masteredBlankIds (juste lors d'une tentative
       précédente sur CETTE phrase) est rendu verrouillé : input désactivé,
       pré-rempli avec la dernière saisie de l'élève (state.trous.answers),
       style "juste", sans bouton haut-parleur (plus rien à écouter, déjà
       acquis) — retour utilisateur, bug corrigé : auparavant toute la phrase
       se réaffichait vide à chaque nouvel essai. */
    let wordIdx = -1;
    const sentenceHTML = tokens.map(tok => {
      if (!tok.isWord) return escapeHtml(tok.text);
      wordIdx++;
      const tag = tags.find(g => g.position === wordIdx);
      if (!tag) return escapeHtml(tok.text);
      const locked = state.trous.masteredBlankIds.includes(tag.id);
      if (locked) {
        const answer = state.trous.answers[tag.id] || tag.mot_attendu;
        return `<span class="dic-trou-blank-group">
          <input type="text" class="dic-input dic-trou-blank-input is-correct" data-blank-id="${tag.id}"
            disabled value="${escapeHtml(answer)}">
        </span>`;
      }
      return `<span class="dic-trou-blank-group">
        <input type="text" class="dic-input dic-trou-blank-input" data-blank-id="${tag.id}"
          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <button type="button" class="dic-trou-speak-btn" data-blank-id="${tag.id}" aria-label="Écouter le mot" title="Écouter le mot">🔊</button>
      </span>`;
    }).join('');

    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      <div class="dic-trou-card">
        <div class="dic-trou-sentence">${sentenceHTML}</div>
      </div>
      <div class="dic-actions" style="margin-top:16px;">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;

    const allBlankInputs = Array.from(document.querySelectorAll('.dic-trou-blank-input'));
    allBlankInputs.forEach(inp => {
      const tag = tags.find(g => g.id === inp.dataset.blankId);
      sizeTrouInput(inp, tag.mot_attendu);
    });
    const editableInputs = allBlankInputs.filter(inp => !inp.disabled);

    document.getElementById('dic-val-btn').addEventListener('click', () => validateTrou(tags));
    editableInputs.forEach((inp, i) => {
      const tag = tags.find(g => g.id === inp.dataset.blankId);
      inp.addEventListener('input', () => sizeTrouInput(inp, tag.mot_attendu));
      inp.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        if (i < editableInputs.length - 1) editableInputs[i + 1].focus();
        else validateTrou(tags);
      });
    });
    document.querySelectorAll('.dic-trou-speak-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = tags.find(g => g.id === btn.dataset.blankId);
        if (!tag) return;
        btn.disabled = true;
        DicteesSpeech.speak(tag.mot_attendu, () => { btn.disabled = false; });
      });
    });
    if (editableInputs[0]) setTimeout(() => { if (state.step === 3) editableInputs[0].focus(); }, 80);
  }

  /* Largeur dynamique des champs "texte à trous" — un champ à largeur fixe
     calculée sur la longueur du mot attendu tronquait le texte visible dès
     que la saisie (juste ou fausse) était plus longue que prévu, ou que la
     police réelle rendait plus large que l'estimation (retour utilisateur :
     "marqu", "débu", "anné" au lieu du mot complet). Mesure la largeur
     réelle du texte avec la police effectivement appliquée à CET input
     (getComputedStyle, pas une estimation par caractère) : jamais sous une
     largeur mini confortable basée sur le mot attendu, grandit (ou revient
     au mini) selon ce qui est le plus large entre le mot attendu et la
     saisie en cours. Complété par `field-sizing: content` en CSS
     (.dic-trou-blank-input) pour les navigateurs qui le supportent — ce JS
     reste la garantie qui fonctionne partout. */
  let _trouMeasureCtx = null;
  function sizeTrouInput(inp, expectedWord) {
    if (!_trouMeasureCtx) _trouMeasureCtx = document.createElement('canvas').getContext('2d');
    _trouMeasureCtx.font = getComputedStyle(inp).font;
    const base = _trouMeasureCtx.measureText(expectedWord || '').width;
    const current = _trouMeasureCtx.measureText(inp.value || '').width;
    inp.style.width = Math.max(70, Math.ceil(Math.max(base, current)) + 40) + 'px';
  }

  function validateTrou(tags) {
    /* Ne traite que les blancs encore éditables : les verrouillés (déjà
       justes lors d'un essai précédent sur cette phrase, cf.
       renderTrousExercise) sont exclus, jamais revalidés ni recomptés. */
    const inputs = Array.from(document.querySelectorAll('.dic-trou-blank-input')).filter(inp => !inp.disabled);
    if (inputs.length === 0) return;
    if (inputs.some(inp => !inp.value.trim())) return;

    let allRight = true;
    const wrongTags = [];
    inputs.forEach(inp => {
      const tag = tags.find(g => g.id === inp.dataset.blankId);
      const isRight = DicteesSpeech.normalizeTrouAnswer(inp.value) === DicteesSpeech.normalizeTrouAnswer(tag.mot_attendu);
      inp.disabled = true;
      inp.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.trous.answers[tag.id] = inp.value;
      if (isRight) {
        if (!state.trous.masteredBlankIds.includes(tag.id)) state.trous.masteredBlankIds.push(tag.id);
      } else {
        allRight = false;
        wrongTags.push(tag);
      }
    });
    document.getElementById('dic-val-btn').disabled = true;
    state.trous.attempts++;

    document.getElementById('dic-feedback').innerHTML = allRight
      ? '<div class="dic-feedback-correct">✅ Correct</div>'
      : `<div class="dic-feedback-wrong">❌ Réponse${wrongTags.length > 1 ? 's' : ''} attendue${wrongTags.length > 1 ? 's' : ''} : ${wrongTags.map(t => `<span class="dic-correct-word">${escapeHtml(t.mot_attendu)}</span>`).join(', ')}</div>`;

    if (allRight) {
      state.trous.unmastered = state.trous.unmastered.filter(id => id !== state.trous.current);
      state.trous.deck = state.trous.deck.filter(id => id !== state.trous.current);
      /* state.trous.current n'est remis à null QUE si la phrase est
         maîtrisée : c'est ce null qui déclenche un nouveau tirage dans
         drawNextTrou() au prochain rendu (voir renderTrousExercise). En cas
         d'erreur, `current` reste sur CETTE phrase — sinon drawNextTrou()
         retire de deck (ou, une fois deck épuisé, retire au hasard de
         unmastered) une phrase quelconque au lieu de refaire précisément
         celle qui vient d'être ratée (bug signalé : erreur sur la 2ᵉ phrase,
         c'est la 1ʳᵉ qui était redemandée). Avec seulement 3 tentatives au
         total, l'élève doit pouvoir corriger immédiatement l'erreur qu'il
         vient de faire, pas retomber sur une autre phrase par tirage. */
      state.trous.current = null;
    }
    saveState();
    setTimeout(() => { if (state.step === 3) render(); }, allRight ? 900 : 2600);
  }

  function finishTrous() {
    if (!state.trous.submitted) {
      state.trous.submitted = true;
      saveState();
      /* Mêmes trous que la synthèse "encore ratés" de renderTrousFinished
         (missed = blancs jamais dans masteredBlankIds) — mot_attendu stocké
         en texte, pas l'id dictee_trous_mots (cf. migration
         20260914100000_dictee_gram_results_wrong_items, même raison que le
         bug d'ids orphelins corrigé sur wrong_mot_ids). */
      const wrongItems = gramTrous
        .flatMap(t => t.dictee_trous_mots)
        .filter(tag => !state.trous.masteredBlankIds.includes(tag.id))
        .map(tag => tag.mot_attendu);
      submitGramResult('trous', state.trous.masteredBlankIds.length, state.trous.totalBlanks, Math.round((Date.now() - state.trous.startedAt) / 1000), wrongItems);
    }
    renderTrousFinished();
  }

  /* Contrairement aux autres paliers, l'écran de fin du texte à trous ne
     bascule pas sur #dic-state-results (via advanceAfter) : en cas d'échec,
     la synthèse des mots encore ratés doit rester affichée le temps que
     l'élève la lise — même logique que renderClassificationFinished,
     dupliquée ici car le conteneur DOM cible est différent. "0 erreur" =
     plus aucun trou dans `unmastered` (mastered dans les maxAttempts
     tentatives, même s'il a fallu plusieurs essais) ; sinon, synthèse des
     mots encore faux/jamais atteints (mots ratés = tous les blancs de
     gramTrous hors masteredBlankIds) et invitation à réessayer plus tard. */
  function renderTrousFinished() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne('Texte à trous terminé !');

    const seq = currentSequence();
    const idx = seq.findIndex(s => s.step === 3);
    const current = idx >= 0 ? seq[idx] : null;
    const next = idx >= 0 ? seq[idx + 1] : undefined;
    const nextHTML = next
      ? `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers ${next.label} →</button>`
      : `<a href="français-orthographe.html" class="dic-card-btn" style="width:auto;padding:12px 28px;">← Retour à l'Orthographe</a>`;
    const actionsHTML = (current ? redoButtonHTML() : '') + nextHTML;

    const missed = gramTrous
      .flatMap(t => t.dictee_trous_mots)
      .filter(tag => !state.trous.masteredBlankIds.includes(tag.id));

    const bodyHTML = missed.length === 0
      ? `<div class="dic-final-message" style="margin-bottom:6px;">Bravo, tu es prêt(e) pour ta dictée !</div>`
      : `
        <div class="dic-final-message" style="margin-bottom:6px;">Encore un peu d'entraînement</div>
        <div class="dic-final-detail" style="margin-bottom:10px;">Fais attention à ${missed.length > 1 ? 'ces mots' : 'ce mot'} :</div>
        <div class="dic-trou-missed-list">${missed.map(t => `<span class="dic-classify-chip">${escapeHtml(t.mot_attendu)}</span>`).join('')}</div>
        <div class="dic-final-detail" style="margin-top:12px;">Tu peux refaire cet exercice demain, à tête reposée.</div>
      `;

    document.getElementById('dic-item').innerHTML = `
      ${bodyHTML}
      <div class="dic-actions" style="margin-top:20px;">${actionsHTML}</div>
    `;
    if (next) document.getElementById('dic-next-ex-btn').addEventListener('click', next.start);
    if (current) wireRedoButton(3, current.start);
  }

  /* ── Palier 5 : trous — conjugaison ───────────────────────────────────────
     Exercice à part entière, distinct du palier 3 (texte à trous), sur ses
     propres phrases (dictee_trous_conjugaison/dictee_trous_conjugaison_mots)
     — même table shape que dictee_trous/dictee_trous_mots, sans discriminant
     `type` puisque toutes les phrases de cette table sont de la conjugaison
     par construction (cf. supabase/migrations/20260908100000). Mécanique
     IDENTIQUE au palier 3 (deck/unmastered, 3 tentatives au total,
     verrouillage des blancs déjà justes, correction tolérante) — dupliquée
     plutôt que partagée, cohérent avec le style du fichier (paliers
     autonomes, voir palier 3/note SCHEMA_VERSION en tête de fichier). Deux
     différences de rendu par rapport au palier 3 : l'infinitif du verbe est
     affiché en clair juste avant chaque trou (jamais caché, contrairement au
     reste de la phrase) — seul indice fourni ; et PAS de bouton haut-parleur
     (contrairement au palier 3) puisqu'il lirait justement la forme
     conjuguée attendue, donnant la réponse à l'élève. */
  function trouConjById(id) { return gramTrousConj.find(t => t.id === id); }

  function drawNextTrouConj() {
    if (state.trousConj.deck.length === 0) state.trousConj.deck = shuffle(state.trousConj.unmastered);
    state.trousConj.current = state.trousConj.deck.shift();
  }

  function startTrousConjugaison() {
    state.step = 5;
    if (!state.trousConj) {
      const ids = gramTrousConj.map(t => t.id);
      state.trousConj = {
        unmastered: ids,
        deck: shuffle(ids),
        current: null,
        masteredBlankIds: [],
        answers: {},
        totalBlanks: gramTrousConj.reduce((s, t) => s + t.dictee_trous_conjugaison_mots.length, 0),
        attempts: 0,
        maxAttempts: 3,
        submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function renderTrousConjugaisonExercise() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';

    if (state.trousConj.unmastered.length === 0 || state.trousConj.attempts >= state.trousConj.maxAttempts) return finishTrousConjugaison();
    if (state.trousConj.current == null) { drawNextTrouConj(); saveState(); }

    const trou = trouConjById(state.trousConj.current);
    const tags = trou.dictee_trous_conjugaison_mots.slice().sort((a, b) => a.position - b.position);
    /* Consigne dynamique : verbalise le temps imposé par l'enseignant pour
       CETTE phrase, recalculée à chaque nouveau tirage (cf. tags recalculé
       ci-dessus à chaque appel) — remplace l'ancienne consigne fixe qui ne
       précisait jamais à quel temps conjuguer (retour utilisateur, exercice
       impossible à réaliser sans cette info). `temps` est saisi par mot
       (dictee_trous_conjugaison_mots.temps, cf. dictees-enseignant.html) et
       non par phrase ; en pratique une même phrase n'a qu'un seul temps
       imposé, donc le premier tag suffit — si l'enseignant tague malgré tout
       plusieurs verbes d'une même phrase à des temps différents, seul le
       temps du premier suffit à couvrir la consigne affichée. */
    const temps = tags[0].temps;
    setConsigne(`Conjugue le verbe entre parenthèses au ${temps.charAt(0).toLowerCase()}${temps.slice(1)}.`);
    const tokens = tokenizeTrouPhrase(trou.phrase);
    const remaining = state.trousConj.unmastered.length;
    const total = gramTrousConj.length;
    const attemptsLeft = state.trousConj.maxAttempts - state.trousConj.attempts;
    const counterHTML = `
      <div class="dic-counters">
        ${progressBarHTML(total - remaining, total, 'Phrases complétées')}
        <div class="dic-passage-badge">${attemptsLeft} tentative${attemptsLeft !== 1 ? 's' : ''} restante${attemptsLeft !== 1 ? 's' : ''}</div>
      </div>`;

    /* Verbe pronominal (tag.position_fin renseigné) : le pronom réfléchi et
       le verbe forment UN SEUL trou sur 2 positions-mots consécutives — les
       tokens (mot + ponctuation/espace intermédiaires) situés APRÈS le
       premier mot du trou et jusqu'à son dernier mot inclus ne sont jamais
       rendus séparément (skipRawIndex), le trou (conjHint + input) n'étant
       émis qu'une seule fois, au premier mot couvert. */
    const wordRawIndices = [];
    tokens.forEach((tok, i) => { if (tok.isWord) wordRawIndices.push(i); });
    const skipRawIndex = new Array(tokens.length).fill(false);
    tags.forEach(g => {
      const end = g.position_fin != null ? g.position_fin : g.position;
      if (end > g.position) {
        const rawStart = wordRawIndices[g.position];
        const rawEnd = wordRawIndices[end];
        for (let i = rawStart + 1; i <= rawEnd; i++) skipRawIndex[i] = true;
      }
    });

    let wordIdx = -1;
    const sentenceHTML = tokens.map((tok, rawIdx) => {
      if (tok.isWord) wordIdx++;
      if (skipRawIndex[rawIdx]) return '';
      if (!tok.isWord) return escapeHtml(tok.text);
      const tag = tags.find(g => g.position === wordIdx);
      if (!tag) return escapeHtml(tok.text);
      const conjHint = `<span class="dic-trou-conj-hint">(${escapeHtml(tag.infinitif)})</span> `;
      const locked = state.trousConj.masteredBlankIds.includes(tag.id);
      if (locked) {
        const answer = state.trousConj.answers[tag.id] || tag.mot_attendu;
        return `${conjHint}<span class="dic-trou-blank-group">
          <input type="text" class="dic-input dic-trou-blank-input is-correct" data-blank-id="${tag.id}"
            disabled value="${escapeHtml(answer)}">
        </span>`;
      }
      return `${conjHint}<span class="dic-trou-blank-group">
        <input type="text" class="dic-input dic-trou-blank-input" data-blank-id="${tag.id}"
          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </span>`;
    }).join('');

    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      <div class="dic-trou-card">
        <div class="dic-trou-sentence">${sentenceHTML}</div>
      </div>
      <div class="dic-actions" style="margin-top:16px;">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;

    const allBlankInputs = Array.from(document.querySelectorAll('.dic-trou-blank-input'));
    allBlankInputs.forEach(inp => {
      const tag = tags.find(g => g.id === inp.dataset.blankId);
      sizeTrouInput(inp, tag.mot_attendu);
    });
    const editableInputs = allBlankInputs.filter(inp => !inp.disabled);

    document.getElementById('dic-val-btn').addEventListener('click', () => validateTrouConj(tags));
    editableInputs.forEach((inp, i) => {
      const tag = tags.find(g => g.id === inp.dataset.blankId);
      inp.addEventListener('input', () => sizeTrouInput(inp, tag.mot_attendu));
      inp.addEventListener('keydown', e => {
        if (e.key !== 'Enter') return;
        if (i < editableInputs.length - 1) editableInputs[i + 1].focus();
        else validateTrouConj(tags);
      });
    });
    if (editableInputs[0]) setTimeout(() => { if (state.step === 5) editableInputs[0].focus(); }, 80);
  }

  function validateTrouConj(tags) {
    const inputs = Array.from(document.querySelectorAll('.dic-trou-blank-input')).filter(inp => !inp.disabled);
    if (inputs.length === 0) return;
    if (inputs.some(inp => !inp.value.trim())) return;

    let allRight = true;
    const wrongTags = [];
    inputs.forEach(inp => {
      const tag = tags.find(g => g.id === inp.dataset.blankId);
      const isRight = DicteesSpeech.normalizeTrouAnswer(inp.value) === DicteesSpeech.normalizeTrouAnswer(tag.mot_attendu);
      inp.disabled = true;
      inp.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.trousConj.answers[tag.id] = inp.value;
      if (isRight) {
        if (!state.trousConj.masteredBlankIds.includes(tag.id)) state.trousConj.masteredBlankIds.push(tag.id);
      } else {
        allRight = false;
        wrongTags.push(tag);
      }
    });
    document.getElementById('dic-val-btn').disabled = true;
    state.trousConj.attempts++;

    document.getElementById('dic-feedback').innerHTML = allRight
      ? '<div class="dic-feedback-correct">✅ Correct</div>'
      : `<div class="dic-feedback-wrong">❌ Réponse${wrongTags.length > 1 ? 's' : ''} attendue${wrongTags.length > 1 ? 's' : ''} : ${wrongTags.map(t => `<span class="dic-correct-word">${escapeHtml(t.mot_attendu)}</span>`).join(', ')}</div>`;

    if (allRight) {
      state.trousConj.unmastered = state.trousConj.unmastered.filter(id => id !== state.trousConj.current);
      state.trousConj.deck = state.trousConj.deck.filter(id => id !== state.trousConj.current);
      state.trousConj.current = null;
    }
    saveState();
    setTimeout(() => { if (state.step === 5) render(); }, allRight ? 900 : 2600);
  }

  function finishTrousConjugaison() {
    if (!state.trousConj.submitted) {
      state.trousConj.submitted = true;
      saveState();
      submitGramResult('trous_conjugaison', state.trousConj.masteredBlankIds.length, state.trousConj.totalBlanks, Math.round((Date.now() - state.trousConj.startedAt) / 1000));
    }
    renderTrousConjugaisonFinished();
  }

  function renderTrousConjugaisonFinished() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    setConsigne('Trous de conjugaison terminés !');

    const seq = currentSequence();
    const idx = seq.findIndex(s => s.step === 5);
    const current = idx >= 0 ? seq[idx] : null;
    const next = idx >= 0 ? seq[idx + 1] : undefined;
    const nextHTML = next
      ? `<button type="button" class="dic-card-btn" id="dic-next-ex-btn" style="width:auto;padding:12px 28px;">Continuer vers ${next.label} →</button>`
      : `<a href="français-orthographe.html" class="dic-card-btn" style="width:auto;padding:12px 28px;">← Retour à l'Orthographe</a>`;
    const actionsHTML = (current ? redoButtonHTML() : '') + nextHTML;

    const missed = gramTrousConj
      .flatMap(t => t.dictee_trous_conjugaison_mots)
      .filter(tag => !state.trousConj.masteredBlankIds.includes(tag.id));

    const bodyHTML = missed.length === 0
      ? `<div class="dic-final-message" style="margin-bottom:6px;">Bravo, tu es prêt(e) pour ta dictée !</div>`
      : `
        <div class="dic-final-message" style="margin-bottom:6px;">Encore un peu d'entraînement</div>
        <div class="dic-final-detail" style="margin-bottom:10px;">Fais attention à ${missed.length > 1 ? 'ces verbes' : 'ce verbe'} :</div>
        <div class="dic-trou-missed-list">${missed.map(t => `<span class="dic-classify-chip">${escapeHtml(`${t.infinitif} → ${t.mot_attendu}`)}</span>`).join('')}</div>
        <div class="dic-final-detail" style="margin-top:12px;">Tu peux refaire cet exercice demain, à tête reposée.</div>
      `;

    document.getElementById('dic-item').innerHTML = `
      ${bodyHTML}
      <div class="dic-actions" style="margin-top:20px;">${actionsHTML}</div>
    `;
    if (next) document.getElementById('dic-next-ex-btn').addEventListener('click', next.start);
    if (current) wireRedoButton(5, current.start);
  }

  /* ── Palier 4 : transformation de phrase ─────────────────────────────────
     Comparaison stricte de la phrase entière (DicteesSpeech.normalize),
     réponse attendue saisie par l'enseignant — même tirage differé
     unmastered/deck que le palier 0. Dernier palier possible du parcours.
     Comme la classification (palier 2), l'exercice ne se termine qu'une fois
     toutes les phrases réussies (retries illimités) : le score soumis
     (correctFirstTry) ne compte donc que les phrases réussies au tout
     premier essai, jamais après une correction — sinon il vaudrait toujours
     100% par construction (même bug que la classification, signalé par
     l'enseignant sur cet exercice aussi). */
  function transfoById(id) { return gramTransformations.find(t => t.id === id); }

  function drawNextTransfo() {
    if (state.transfo.deck.length === 0) state.transfo.deck = shuffle(state.transfo.unmastered);
    state.transfo.current = state.transfo.deck.shift();
  }

  function startTransformation() {
    state.step = 4;
    if (!state.transfo) {
      const ids = gramTransformations.map(t => t.id);
      state.transfo = {
        unmastered: ids, deck: shuffle(ids), current: null,
        correctFirstTry: 0, attemptedIds: [],
        attempts: 0, submitted: false,
        startedAt: Date.now()
      };
    }
    saveState();
    render();
  }

  function renderTransformation() {
    document.getElementById('dic-state-results').style.display = 'none';
    document.getElementById('dic-state-exercise').style.display = '';
    // Pas de "Réécris la phrase…" générique ici : la consigne spécifique
    // (bloc orange plus bas, ex. "Réécris cette phrase au pluriel.") porte
    // déjà ce verbe — le doublon confondait l'élève (retour utilisateur).
    // "La correction est automatique." retiré (sans intérêt, retour
    // utilisateur) : plus rien à afficher dans ce bloc pour ce palier.
    setConsigne('');

    if (state.transfo.unmastered.length === 0) return finishTransformation();
    if (state.transfo.current == null) { drawNextTransfo(); saveState(); }

    const t = transfoById(state.transfo.current);
    const remaining = state.transfo.unmastered.length;
    const total = gramTransformations.length;
    const counterHTML = `<div class="dic-counters">${progressBarHTML(total - remaining, total, 'Phrases transformées')}</div>`;

    // Consigne spécifique avant la phrase à transformer (retour utilisateur :
    // l'élève doit savoir ce qu'on lui demande AVANT de lire la phrase, pas
    // après) — voir aussi le commentaire au-dessus de .dic-transfo-consigne
    // dans css/dictees.css.
    document.getElementById('dic-item').innerHTML = `
      ${counterHTML}
      <p class="dic-transfo-consigne">${escapeHtml(TRANSFO_TYPE_LABELS[t.type_transformation] || '')}</p>
      <div class="dic-flash-wrap"><div class="dic-flash-word" style="font-size:20px;">${escapeHtml(t.phrase_depart)}</div></div>
      <div class="dic-input-row dic-transfo-input-row">
        <input type="text" class="dic-input dic-transfo-input" id="dic-input"
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
               placeholder="Écris la phrase transformée…">
        <button type="button" class="dic-validate-btn" id="dic-val-btn">Valider</button>
      </div>
      <div class="dic-feedback-area" id="dic-feedback"></div>
    `;
    const input = document.getElementById('dic-input');
    const onValidate = () => {
      if (!input || !input.value.trim() || input.disabled) return;
      const typed = input.value;
      const isRight = answerMatchesAny(typed, [t.phrase_attendue, ...(t.phrase_attendue_alt || [])]);
      input.disabled = true;
      document.getElementById('dic-val-btn').disabled = true;
      input.classList.add(isRight ? 'is-correct' : 'is-wrong');
      state.transfo.attempts++;

      const isFirstAttempt = !state.transfo.attemptedIds.includes(t.id);
      if (isFirstAttempt) state.transfo.attemptedIds.push(t.id);

      if (isRight) {
        if (isFirstAttempt) state.transfo.correctFirstTry++;
        state.transfo.unmastered = state.transfo.unmastered.filter(id => id !== t.id);
        state.transfo.deck = state.transfo.deck.filter(id => id !== t.id);
      }

      document.getElementById('dic-feedback').innerHTML = isRight
        ? '<div class="dic-feedback-correct">✅ Correct</div>'
        : `<div class="dic-feedback-wrong">❌ Phrase attendue : <span class="dic-correct-word">${escapeHtml(t.phrase_attendue)}</span></div>`;
      state.transfo.current = null;
      saveState();
      setTimeout(() => { if (state.step === 4) render(); }, isRight ? 900 : 2600);
    };
    document.getElementById('dic-val-btn').addEventListener('click', onValidate);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') onValidate(); });
    setTimeout(() => { if (state.step === 4) document.getElementById('dic-input')?.focus(); }, 80);
  }

  function finishTransformation() {
    if (!state.transfo.submitted) {
      state.transfo.submitted = true;
      saveState();
      submitGramResult('transformation', state.transfo.correctFirstTry, gramTransformations.length, Math.round((Date.now() - state.transfo.startedAt) / 1000));
    }
    advanceAfter(4, 'Transformation terminée !',
      `${state.transfo.correctFirstTry} phrase${state.transfo.correctFirstTry !== 1 ? 's' : ''} juste${state.transfo.correctFirstTry !== 1 ? 's' : ''} du premier coup sur ${gramTransformations.length}.`);
  }

  /* ── Enregistrement du résultat ──────────────────────────────────────── */
  /* ── Filet de secours contre les insertions silencieusement perdues ─────
     Un élève (Andreas) a terminé les 3 paliers lexicaux sans qu'aucune ligne
     n'apparaisse ensuite dans dictee_results, côté élève comme enseignant.
     Vérification directe (supabase db query --linked, insert simulé sous
     l'identité de l'élève via request.jwt.claim.sub) : le schéma et les
     policies RLS acceptent l'insert sans problème — la cause n'est donc pas
     côté base. Le point de défaillance le plus probable est côté client :
     le palier "Dictée audio" peut prendre plusieurs minutes (série complète,
     TTS, saisie), le temps qu'un token de session expire sans que le
     rafraîchissement automatique du SDK Supabase ait pu jouer (veille de
     tablette, wifi de classe instable) — l'insert échoue alors avec une
     erreur PostgREST normale, mais `submitResult` ne faisait que la logguer
     en console (déjà le patron d'échec silencieux rencontré par le passé
     sur ce module) sans jamais retenter ni conserver le résultat perdu.
     Filet à deux niveaux : 1) une nouvelle tentative immédiate après avoir
     relu la session (récupère un token rafraîchi si c'était bien la cause) ;
     2) si ça échoue encore, mise en file d'attente locale (localStorage,
     survit à la fermeture de l'onglet) rejouée au chargement de la
     prochaine dictée (flushPendingResults, appelée depuis init()). */
  const PENDING_RESULT_PREFIX = 'dictee_pending_result_';

  function queuePendingResult(table, payload) {
    try {
      const key = PENDING_RESULT_PREFIX + Date.now() + '_' + Math.random().toString(36).slice(2);
      localStorage.setItem(key, JSON.stringify({ table, payload }));
    } catch (e) { /* localStorage indisponible (navigation privée, quota) — rien de plus à faire */ }
  }

  async function flushPendingResults() {
    if (!window.lfmDb) return;
    let keys;
    try { keys = Object.keys(localStorage).filter(k => k.startsWith(PENDING_RESULT_PREFIX)); }
    catch (e) { return; }
    for (const key of keys) {
      let entry;
      try { entry = JSON.parse(localStorage.getItem(key)); } catch (e) { entry = null; }
      if (!entry || !entry.table || !entry.payload) { localStorage.removeItem(key); continue; }
      const { error } = await window.lfmDb.from(entry.table).insert(entry.payload);
      if (!error) localStorage.removeItem(key);
      // Sinon (échec encore, ex. élève différent connecté sur ce poste :
      // RLS rejette un student_id qui n'est pas auth.uid()) : entrée
      // laissée en attente pour un prochain essai, jamais perdue.
    }
  }

  async function submitResult(exercice, score, total, sansFaute, durationSecs, attempts, wrongMotIds) {
    if (!studentId || !window.lfmDb) return;
    const payload = {
      student_id: studentId,
      dictee_id: dictee.id,
      exercice,
      score,
      total,
      sans_faute: sansFaute,
      duration_secs: durationSecs,
      attempts: attempts,
      wrong_mot_ids: wrongMotIds || [],
      niveau: state.niveauChoisi,
      session_complete: isFullSessionComplete()
    };
    const { error } = await window.lfmDb.from('dictee_results').insert(payload);
    if (!error) return;
    console.warn('[LFM] DicteesEngine.submitResult:', error.message);

    const session = await lfmAuth.getSession().catch(() => null);
    if (session && session.user && session.user.id) {
      studentId = session.user.id;
      payload.student_id = studentId;
    }
    const retry = await window.lfmDb.from('dictee_results').insert(payload);
    if (retry.error) {
      console.warn('[LFM] DicteesEngine.submitResult (nouvel essai):', retry.error.message);
      queuePendingResult('dictee_results', payload);
    }
  }

  /* Distinct de submitResult : dictee_gram_results a ses propres colonnes
     (pas de sans_faute/attempts) et reste strictement cantonné à l'espace
     dictée de l'enseignant (jamais exercise_results ni le bilan général —
     cf. resultats-dictees-enseignant.html). Même filet de secours (nouvel
     essai + file d'attente) que submitResult, voir commentaire ci-dessus.
     `wrongItems` : mots ratés en texte (pas d'id, cf. finishTrous) —
     optionnel, seul l'appel depuis 'trous' le renseigne pour l'instant
     (classification/trous_conjugaison/transformation restent hors
     périmètre, colonne wrong_items nulle pour eux). */
  async function submitGramResult(type, score, total, durationSecs, wrongItems) {
    if (!studentId || !window.lfmDb) return;
    const payload = {
      student_id: studentId,
      dictee_id: dictee.id,
      type,
      score,
      total,
      duration_secs: durationSecs,
      niveau: state.niveauChoisi,
      wrong_items: wrongItems || null,
      session_complete: isFullSessionComplete()
    };
    const { error } = await window.lfmDb.from('dictee_gram_results').insert(payload);
    if (!error) return;
    console.warn('[LFM] DicteesEngine.submitGramResult:', error.message);

    const session = await lfmAuth.getSession().catch(() => null);
    if (session && session.user && session.user.id) {
      studentId = session.user.id;
      payload.student_id = studentId;
    }
    const retry = await window.lfmDb.from('dictee_gram_results').insert(payload);
    if (retry.error) {
      console.warn('[LFM] DicteesEngine.submitGramResult (nouvel essai):', retry.error.message);
      queuePendingResult('dictee_gram_results', payload);
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => DicteesEngine.init());

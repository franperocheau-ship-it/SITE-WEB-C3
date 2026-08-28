/* ─────────────────────────────────────────────────────────────────────────────
   teacher-analytics.js — Calculs pour le module Résultats (Vue d'ensemble
   classe + fiche élève enrichie + bulletin). Aucune manipulation du DOM,
   aucun appel réseau : reçoit des lignes exercise_results déjà chargées
   (voir lfmTeacher.getClassResultsRaw / getStudentResultsRaw) et le
   catalogue EXERCISE_DATA (chargé paresseusement par la page appelante).

   Dépend de : EXERCISE_DATA (global, exercise-data.js — doit être chargé
   avant tout appel à buildCatalogMap()).
   ───────────────────────────────────────────────────────────────────────────── */

const lfmAnalytics = (() => {
  const SUCCESS_THRESHOLD = 80;     /* seuil de réussite, cohérent avec les lauriers */
  const JAUGE_LEVELS       = ['CM1', 'CM2', '6e'];
  const DOMAIN_ORDER       = ['Français', 'Mathématiques'];
  const MIN_STUDENTS_COMP  = 5;     /* seuil "au moins 5 élèves" pour top/bottom compétences et exercices */
  const MIN_STUDENTS_COMP_LEVEL = 3; /* seuil "au moins 3 élèves distincts" — top/bottom exercice+niveau (computeClassOverview), liste "Détail par compétence" classe (computeClassExercisesChutes). Distinct de MIN_STUDENTS_COMP, qui reste utilisé tel quel par computeCompetenceStats */
  const DAY  = 86400000;
  const WEEK = 7 * DAY;

  const UNKNOWN_META = {
    domaine: 'Autres', competence: 'Exercice retiré du catalogue',
    sousDomaine: 'Autres', compLabel: 'Exercice retiré du catalogue',
    title: null, levels: []
  };

  /* Anciens slugs fusionnés en exercices progressifs (Lot 6, commit 3675639,
     2026-07-15) : les résultats historiques enregistrés sous ces slugs n'ont
     plus de correspondance directe dans EXERCISE_DATA. On les fait pointer
     vers le domaine/compétence du nouvel exercice pour ne pas les perdre
     dans "Autres" — mais sans reprendre ses levels/paliers (numérotation
     incompatible avec l'ancien format flat/mono-niveau), donc ces lignes ne
     contribuent pas aux jauges. */
  const LEGACY_SLUG_ALIASES = {
    'identifier-phrase-declarative':         'identifier-type-phrase',
    'identifier-phrase-interrogative':       'identifier-type-phrase',
    'identifier-phrase-imperative':          'identifier-type-phrase',
    'identifier-phrase-exclamative':         'identifier-type-phrase',
    'identifier-phrase-negative':            'identifier-type-phrase',
    'transformer-declarative-interrogative': 'transformer-phrase',
    'transformer-affirmative-negative':      'transformer-phrase',
    'identifier-article-defini':             'identifier-differencier-articles-definis-indefinis',
    'articles-definis-choix':                'identifier-differencier-articles-definis-indefinis',
    'articles-definis-completer':            'identifier-differencier-articles-definis-indefinis',
    'identifier-article-indefini':           'identifier-differencier-articles-definis-indefinis',
    'articles-indefinis-premiere-rencontre': 'identifier-differencier-articles-definis-indefinis',
    'articles-definis':                      'identifier-differencier-articles-definis-indefinis',
    'articles-indefinis':                    'identifier-differencier-articles-definis-indefinis',
    'identifier-determinant-possessif':      'identifier-differencier-determinants-demonstratifs-possessifs',
    'possessifs-dans-phrases':               'identifier-differencier-determinants-demonstratifs-possessifs',
    'determinants-possessifs':               'identifier-differencier-determinants-demonstratifs-possessifs',
    'identifier-determinant-demonstratif':   'identifier-differencier-determinants-demonstratifs-possessifs',
  };

  /* Résout un exercise_slug brut vers son slug canonique (cible de fusion
     s'il s'agit d'un ancien slug retiré du catalogue, sinon inchangé).
     Distinct de metaFor(), qui ne résout l'alias QUE pour l'affichage
     (titre/domaine) sans jamais changer le exercise_slug lui-même — d'où
     un même exercice pouvant apparaître sous plusieurs lignes distinctes
     dans l'arborescence "Détail par compétence" (une par ancien slug
     tenté), toutes affichant le même titre. À utiliser à la source, dans
     dedupeBestBySlug/dedupeBestBySlugPalier, AVANT tout regroupement par
     exercice — pas seulement pour l'affichage. */
  function canonicalSlug(slug) {
    return LEGACY_SLUG_ALIASES[slug] || slug;
  }

  /* Pages d'exercices autonomes (hors moteur exercise.html / catalogue
     EXERCISE_DATA) dont l'exercise_slug n'a jamais existé dans le
     catalogue — donc jamais résolu par catalogMap ni par
     LEGACY_SLUG_ALIASES (qui ne fait que renommer un ancien slug de
     catalogue vers un nouveau). Slugs fixes (exact) et préfixes
     dynamiques (un slug par mot × par niveau, ex. ortho-son-sont-n2,
     lex-xxx-n1 sur les pages ortho-distinguer-*.html / français-lexique.html
     — voir grep "saveExerciseResult" *.html). */
  const STANDALONE_META = {
    exact: {
      /* identifier-verbe-conjugue migré vers EXERCISE_DATA (data/grammaire.js,
         competence "Grammaire — Le verbe") : résolu directement par
         catalogMap[slug] dans metaFor() ci-dessous, plus besoin d'entrée ici. */
      'ecrire-fraction-sous-forme-decimale': { domaine: 'Mathématiques', competence: 'Nombres décimaux — Écrire une fraction sous forme décimale' },
      'ecrire-decimal-sous-forme-fraction':  { domaine: 'Mathématiques', competence: 'Nombres décimaux — Écrire un décimal sous forme de fraction' },
    },
    prefixes: [
      /* Les 10 pages ortho-distinguer-*.html ont toutes exactement 3 niveaux,
         affichés avec des badges CM1/CM2/6e à l'écran (vérifié identique sur
         les 10 fichiers) et enregistrent level: 'Niveau N' — reconnu tel
         quel par levelToPalierKey. Mapping 1:1 fiable, contrairement à
         lex-* (data-levels variable selon la compétence, pas de badge
         CM1/CM2/6e) qui reste donc sans `levels` ci-dessous. */
      { prefix: 'ortho-', meta: { domaine: 'Français', competence: 'Orthographe — Homophones grammaticaux', levels: ['CM1', 'CM2', '6e'], paliers: 3 } },
      /* Un slug par questionnaire ('questionnaire-lecture-<id>', voir la
         migration 20260807160000) : préfixe plutôt qu'entrée exacte, pour ne
         pas avoir à maintenir une ligne par questionnaire créé par les
         enseignants. Pas de `levels` : aucune notion de niveau sur un
         questionnaire en Phase 1 (exclu des jauges CM1/CM2/6e, comme lex-*). */
      { prefix: 'questionnaire-lecture-', meta: { domaine: 'Français', competence: 'Lecture — Compréhension de lecture' } },
      /* Même logique que questionnaire-lecture- ci-dessus, mais pour le
         module Oral ('comprehension-orale-<id>', voir soumettre_resultat_
         comprehension_orale dans la migration 20260920100000). Pas de
         `levels` non plus : aucune notion de niveau sur une compréhension
         orale. */
      { prefix: 'comprehension-orale-', meta: { domaine: 'Français', competence: 'Oral — Compréhension orale' } },
      { prefix: 'lex-',   meta: { domaine: 'Français', competence: 'Vocabulaire' } },
    ],
  };

  function standaloneMetaFor(slug) {
    if (STANDALONE_META.exact[slug]) return STANDALONE_META.exact[slug];
    const rule = STANDALONE_META.prefixes.find(r => slug.startsWith(r.prefix));
    return rule ? rule.meta : null;
  }

  /* ── Titre d'affichage d'un exercice individuel ──────────────────────────
     Jamais le libellé de compétence (bucket, ex. "Grammaire — L'adjectif") :
     une compétence du catalogue peut regrouper plusieurs exercices (ex.
     "Pronoms personnels" = 3 exercices), et tout affichage par exercice
     (bilan par compétences, compétences à consolider/réussies, points forts
     élève, tops/flops classe et plateforme) doit montrer l'intitulé exact de
     CET exercice. Priorité : titre catalogue (EXERCISE_DATA) → titre brut
     stocké sur la ligne de résultat (exercise_title) → slug humanisé en
     dernier recours. Exportée pour être réutilisée telle quelle par
     dashboard-eleve.html (computeCompetenceStats), qui a son propre registre
     slug→catalogue mais doit appliquer la même règle plutôt que d'en
     dupliquer une variante. */
  function exerciseTitleFor(catalogTitle, row) {
    const raw = catalogTitle || row.exercise_title || row.exercise_slug.replace(/-/g, ' ');
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  function splitCompetence(competence) {
    const sep = competence.indexOf(' — ');
    return {
      sousDomaine: sep >= 0 ? competence.slice(0, sep)  : competence,
      compLabel:   sep >= 0 ? competence.slice(sep + 3) : competence,
    };
  }

  /* ── Catalogue : slug → {domaine, competence, sousDomaine, compLabel, title, levels} ── */
  function buildCatalogMap() {
    const map = {};
    if (typeof EXERCISE_DATA === 'undefined') return map;
    Object.keys(EXERCISE_DATA).forEach(slug => {
      const ex = EXERCISE_DATA[slug];
      map[slug] = {
        domaine:    ex.domaine,
        competence: ex.competence,
        ...splitCompetence(ex.competence),
        title:      ex.title || null,
        levels:     ex.levels || [],
        paliers:    ex.paliers
      };
    });
    return map;
  }

  function metaFor(catalogMap, slug) {
    if (catalogMap[slug]) return catalogMap[slug];
    const aliasTarget = LEGACY_SLUG_ALIASES[slug] && catalogMap[LEGACY_SLUG_ALIASES[slug]];
    if (aliasTarget) return { ...aliasTarget, levels: [], paliers: undefined };
    const standalone = standaloneMetaFor(slug);
    if (standalone) {
      return {
        domaine: standalone.domaine, competence: standalone.competence,
        ...splitCompetence(standalone.competence),
        title: null, levels: standalone.levels || [], paliers: standalone.paliers
      };
    }
    return UNKNOWN_META;
  }

  /* ── Dédoublonnage : meilleur pct par (élève × exercice) ─────────────────────
     exercise_slug résolu via canonicalSlug() avant de servir de clé — un
     ancien slug fusionné (Lot 6, ex. identifier-phrase-declarative) et son
     exercice cible (identifier-type-phrase) comptent donc comme UN seul
     exercice, avec le meilleur score toutes tentatives confondues (ancien
     ET nouveau slug). exercise_slug est aussi réécrit dans la ligne
     conservée, pour que tout le code en aval (aggregateByCompetence,
     computeClassLeafStudents…) qui lit r.exercise_slug voie déjà la forme
     canonique sans avoir à refaire la résolution lui-même. */
  function dedupeBestBySlug(rows) {
    const map = new Map();
    rows.forEach(r => {
      const slug = canonicalSlug(r.exercise_slug);
      const key  = r.student_id + '|' + slug;
      const pct  = parseFloat(r.pct);
      const prev = map.get(key);
      if (!prev || pct > prev.pct) map.set(key, { ...r, exercise_slug: slug, pct });
    });
    return Array.from(map.values());
  }

  /* ── Dédoublonnage : meilleur pct par (élève × exercice), TOUS PALIERS
     REQUIS, réservé au numérateur de computeNiveauJauge. Une compétence ne
     compte comme "acquise" que si CHAQUE palier déclaré (meta.paliers,
     nombre réel de paliers du moteur — repli sur meta.levels.length si non
     déclaré, même convention que levelDescFor) atteint individuellement
     SUCCESS_THRESHOLD ; un seul palier sous le seuil, ou jamais tenté,
     empêche la compétence entière d'être comptée (bug constaté : "Encadrer
     une fraction..." validée à tort avec Niveau 1 à 100% alors que Niveau 2
     n'était qu'à 67% — l'ancienne version ne gardait que le meilleur score
     TOUS paliers confondus). Le pct renvoyé par compétence est donc le
     MINIMUM des meilleurs scores par palier (palier jamais tenté = 0), pas
     le meilleur score global — pour que la comparaison `pct >= SUCCESS_THRESHOLD`
     déjà faite en aval par computeNiveauJauge reste inchangée.
     Même garde que précédemment : exclut, via metaFor(), toute ligne dont
     l'exercise_slug brut n'a pas de `levels` fiables — notamment les anciens
     slugs LEGACY_SLUG_ALIASES (metaFor leur renvoie `levels: []`, leur
     numérotation de palier, flat/mono-niveau, étant incompatible avec celle
     du nouvel exercice fusionné). */
  function dedupeBestBySlugForJauge(rows, catalogMap) {
    const bestByPalier      = new Map(); // 'student|slug' -> Map(palier -> meilleur pct)
    const totalPaliersBySlug = new Map(); // slug -> nombre de paliers requis

    rows.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      if (!meta || !meta.levels || meta.levels.length === 0) return;
      const slug = canonicalSlug(r.exercise_slug);
      const totalPaliers = typeof meta.paliers === 'number' && meta.paliers >= 1 ? meta.paliers : meta.levels.length;
      totalPaliersBySlug.set(slug, totalPaliers);
      const palier = levelToPalierKey(r.level);
      const key    = r.student_id + '|' + slug;
      const pct    = parseFloat(r.pct);
      if (!bestByPalier.has(key)) bestByPalier.set(key, new Map());
      const paliersMap = bestByPalier.get(key);
      const prevPct = paliersMap.get(palier);
      if (prevPct === undefined || pct > prevPct) paliersMap.set(palier, pct);
    });

    const out = [];
    bestByPalier.forEach((paliersMap, key) => {
      const sep = key.indexOf('|');
      const studentId = key.slice(0, sep);
      const slug = key.slice(sep + 1);
      const totalPaliers = totalPaliersBySlug.get(slug) || 1;
      let effectivePct = 100;
      for (let p = 1; p <= totalPaliers; p++) {
        const pct = paliersMap.get(String(p));
        effectivePct = Math.min(effectivePct, pct !== undefined ? pct : 0);
      }
      out.push({ student_id: studentId, exercise_slug: slug, pct: effectivePct });
    });
    return out;
  }

  /* ── Résolution du niveau scolaire (CM1/CM2/6e) d'une tentative ──────────────
     La colonne `level` stocke la valeur brute du palier joué, sous 3 formats
     selon le type d'exercice : "Niveau N", "CM1"/"CM2"/"6e", ou un entier brut
     (voir audit-levels.mjs). On ne peut plus la comparer telle quelle à
     JAUGE_LEVELS : on la normalise vers une position de palier, puis on la
     fait correspondre au niveau scolaire via `paliers` (nombre réel de
     paliers du moteur, distinct de `levels` — pédagogique) et une répartition
     proportionnelle ancrée aux deux extrémités de `levels`. Quand
     paliers === levels.length (cas majoritaire), ça redonne le mapping 1:1
     naturel. Quand paliers < levels.length (16 exercices audités), un niveau
     intermédiaire peut structurellement ne jamais être crédité — limite
     connue et acceptée, pas un bug. ───────────────────────────────────────── */
  function levelToPalierKey(levelValue) {
    if (levelValue === null || levelValue === undefined || levelValue === '') return '1';
    const str = String(levelValue).trim();
    const niveauMatch = str.match(/niveau\s*(\d+)/i);
    if (niveauMatch) return niveauMatch[1];
    const CANONICAL_GRADE = { cm1: '1', cm2: '2', '6e': '3' };
    const grade = CANONICAL_GRADE[str.toLowerCase()];
    if (grade) return grade;
    const asNumber = Number(str);
    if (!Number.isNaN(asNumber) && asNumber > 0) return String(Math.round(asNumber));
    return str.toLowerCase();
  }

  function niveauForPalier(palierIdx, totalPaliers, levels) {
    const L = levels.length;
    if (L === 0) return null;
    if (L === 1) return levels[0];
    const idx = totalPaliers <= 1 ? 0 : Math.round((palierIdx - 1) * (L - 1) / (totalPaliers - 1));
    return levels[Math.min(Math.max(idx, 0), L - 1)];
  }

  function resolveNiveau(catalogMap, row) {
    /* metaFor() (et non catalogMap[slug] direct) pour reconnaître aussi les
       pages autonomes dont le mapping niveau est fiable (ortho-*, voir
       STANDALONE_META) — sans rouvrir les cas volontairement exclus
       (LEGACY_SLUG_ALIASES et les autres standalones renvoient levels: [],
       donc toujours exclus par le test ci-dessous). */
    const meta = metaFor(catalogMap, row.exercise_slug);
    if (!meta || !meta.levels || meta.levels.length === 0) return null;
    const paliers = typeof meta.paliers === 'number' && meta.paliers >= 1 ? meta.paliers : 1;
    const palierIdx = parseInt(levelToPalierKey(row.level), 10);
    const safeIdx = Number.isFinite(palierIdx) && palierIdx > 0 ? palierIdx : 1;
    return niveauForPalier(safeIdx, paliers, meta.levels);
  }

  /* ── Dédoublonnage : meilleur pct par (élève × exercice × niveau scolaire résolu) ──
     Nécessaire pour les jauges — un même exercice progressif peut être tenté
     à plusieurs paliers, on ne veut retenir que le meilleur score obtenu au
     niveau scolaire résolu, pas le meilleur toutes tentatives confondues. */
  function dedupeBestByNiveau(rows, catalogMap) {
    const map = new Map();
    rows.forEach(r => {
      const niveau = resolveNiveau(catalogMap, r);
      if (!niveau) return;
      const key  = r.student_id + '|' + r.exercise_slug + '|' + niveau;
      const pct  = parseFloat(r.pct);
      const prev = map.get(key);
      if (!prev || pct > prev.pct) map.set(key, { ...r, pct, niveau });
    });
    return Array.from(map.values());
  }

  /* ── Taux de réussite par sous-domaine (jauges — classe et élève) ─────────
     Même méthodologie que les taux généraux : dédoublonnage par meilleur
     score (élève × exercice), moyenne simple des pct sur le sous-domaine.
     Retourne une Map "Domaine||SousDomaine" → { domaine, sousDomaine, avgPct }. */
  function computeSousDomaineRates(rows, catalogMap) {
    const best = dedupeBestBySlug(rows);
    const agg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine;
      if (!agg.has(key)) agg.set(key, { domaine: meta.domaine, sousDomaine: meta.sousDomaine, sum: 0, count: 0 });
      const a = agg.get(key);
      a.sum += r.pct; a.count++;
    });
    const out = new Map();
    agg.forEach((a, key) => out.set(key, { domaine: a.domaine, sousDomaine: a.sousDomaine, avgPct: Math.round(a.sum / a.count) }));
    return out;
  }

  /* ── État par niveau scolaire (non travaillé / en cours / atteint) pour un
     ensemble d'exercices catalogue sélectionné par `matchSlug(meta)` —
     factorisé pour être utilisé à la fois pour la jauge domaine (jauges) et
     pour chaque jauge sous-domaine (sousDomaineJauges, voir
     computeStudentProfile).
     Portée hiérarchique cumulative (CM1 ⊂ CM2 ⊂ 6e, voir JAUGE_LEVELS) :
     une compétence "CM1/CM2/6e" compte dans les 3 jauges, une compétence
     "CM2/6e" compte dans CM2 et 6e (pas CM1), une compétence "6e" seule ne
     compte que dans 6e — le dénominateur d'un niveau L inclut donc toute
     compétence dont AU MOINS un niveau déclaré (`meta.levels`) est ≤ L dans
     JAUGE_LEVELS. Une compétence est "validée" (numérateur) sur la base de
     son meilleur score GLOBAL toutes tentatives confondues (`best`, voir
     dedupeBestBySlug) — indépendamment du palier atteint, contrairement à
     l'ancien calcul par niveau scolaire résolu palier par palier
     (resolveNiveau/niveauForPalier, qui reste utilisé ailleurs : détail par
     palier de niveauAggByComp/levelsPctFor ci-dessous, et levelDescFor pour
     bilan-nav.js). */
  function computeNiveauJauge(best, catalogMap, matchSlug) {
    const bestPctBySlug = new Map(best.map(r => [r.exercise_slug, r.pct]));
    const expectedByLevel = {};
    JAUGE_LEVELS.forEach(level => { expectedByLevel[level] = []; });
    Object.keys(catalogMap).forEach(slug => {
      const m = catalogMap[slug];
      if (!matchSlug(m)) return;
      const scopeIdx = (m.levels || [])
        .map(lv => JAUGE_LEVELS.indexOf(lv))
        .filter(idx => idx >= 0);
      if (scopeIdx.length === 0) return;
      const minIdx = Math.min(...scopeIdx);
      JAUGE_LEVELS.forEach((level, idx) => {
        if (minIdx <= idx) expectedByLevel[level].push(slug);
      });
    });

    return JAUGE_LEVELS.map(level => {
      const slugs = expectedByLevel[level];
      let achieved = 0, attempted = 0;
      slugs.forEach(slug => {
        const pct = bestPctBySlug.get(slug);
        if (pct === undefined) return;
        attempted++;
        if (pct >= SUCCESS_THRESHOLD) achieved++;
      });
      const denom = slugs.length;
      const ratio = denom > 0 ? achieved / denom : 0;
      /* "en cours" dès la 1ère tentative enregistrée, même sans réussite ≥80% —
         "non travaillé" seulement en l'absence totale d'exercice fait à ce
         niveau (voir discussion Objectif jauges sous-domaine, 2026-07-18). */
      const status = denom === 0 ? 'non-concerne'
        : ratio >= 0.7 ? 'atteint'
        : (ratio >= 0.15 || attempted > 0) ? 'en-cours' /* TEMP test seuil : 0.3 → 0.15, à revenir en arrière après validation visuelle */
        : 'non-travaille';
      return { level, ratio, status, denom, achieved, attempted };
    });
  }

  /* ── Agrégation par exercice : moyenne + volume ────────────────────────────
     Factorisé pour être utilisé à la fois par computeClassOverview (vue
     classe) et computeCompetenceStats (vue plateforme, admin) — même forme
     { domaine, competence, avgPct, attemptCount, studentCount } par ligne,
     à partir de `best` (dédoublonné élève × exercice). Champ `competence`
     conservé par nom pour ne pas retoucher les templates appelants, mais
     contient désormais l'intitulé exact de l'exercice (exerciseTitleFor),
     jamais le libellé de compétence du catalogue : une compétence peut
     regrouper plusieurs exercices (ex. "Pronoms personnels" = 3 exercices),
     donc la clé d'agrégation est exercise_slug et non plus compLabel — même
     principe que niveauAggByComp/compAgg dans computeStudentProfile(). */
  function aggregateByCompetence(best, catalogMap) {
    const compAgg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + r.exercise_slug;
      if (!compAgg.has(key)) {
        compAgg.set(key, { meta, title: exerciseTitleFor(meta.title, r), exerciseSlug: r.exercise_slug, sum: 0, count: 0, students: new Set() });
      }
      const agg = compAgg.get(key);
      agg.sum += r.pct; agg.count++; agg.students.add(r.student_id);
    });
    return Array.from(compAgg.values()).map(agg => ({
      domaine: agg.meta.domaine,
      sousDomaine: agg.meta.sousDomaine,
      competence: agg.title,
      exerciseSlug: agg.exerciseSlug,
      avgPct: Math.round(agg.sum / agg.count),
      attemptCount: agg.count,
      studentCount: agg.students.size
    }));
  }

  /* ── Onglet "Exercices chutés", niveau classe — liste ─────────────────────
     Granularité par exercice seul (pas exercice+niveau comme l'étape 5) :
     aggregateByCompetence sur dedupeBestBySlug, exactement comme top5/bottom5
     de la Vue d'ensemble. Seuil de 3 élèves distincts (MIN_STUDENTS_COMP_LEVEL)
     appliqué ici, encapsulé dans la fonction plutôt que délégué à l'appelant —
     un exercice tenté par 1-2 élèves ne doit jamais apparaître, même en tête
     de liste : sinon un score extrême non représentatif fausserait le
     classement "du plus chuté au moins chuté". Triée par taux croissant
     (le plus chuté en premier). */
  function computeClassExercisesChutes(rows, catalogMap) {
    const best = dedupeBestBySlug(rows);
    return aggregateByCompetence(best, catalogMap)
      .filter(c => c.studentCount >= MIN_STUDENTS_COMP_LEVEL)
      .sort((a, b) => a.avgPct - b.avgPct);
  }

  /* ── Onglet "Exercices chutés", niveau élève — liste ───────────────────────
     Même principe que computeClassExercisesChutes (aggregateByCompetence sur
     dedupeBestBySlug, granularité par exercice seul), mais SANS seuil : un
     seul élève, dès la 1ère tentative (cohérent avec computeWorstItems côté
     détail, qui n'a pas non plus de seuil minimal). Triée du plus chuté au
     moins chuté.
     Note : aggregateByCompetence compte les lignes "best" (une par élève et
     par exercice après dedupeBestBySlug) — pour un seul élève, ce compte
     vaut donc toujours 1 et ne peut pas servir de "nombre de tentatives"
     (contrairement au niveau classe, où il coïncide avec studentCount).
     On recalcule ici le vrai nombre de tentatives par exercice à partir des
     lignes brutes (non dédupliquées) et on l'utilise pour écraser
     attemptCount avant affichage. Clé résolue via canonicalSlug() comme
     dedupeBestBySlug : sinon les tentatives d'un ancien slug fusionné (Lot
     6) resteraient comptées sous leur ancienne clé et ne seraient jamais
     retrouvées par c.exerciseSlug (déjà canonique via aggregateByCompetence/
     dedupeBestBySlug) — le compte affiché doit additionner les tentatives
     de l'ancien ET du nouveau slug. */
  function computeStudentExercisesChutes(rows, catalogMap) {
    const best = dedupeBestBySlug(rows);
    const attemptsBySlug = new Map();
    rows.forEach(r => {
      const slug = canonicalSlug(r.exercise_slug);
      attemptsBySlug.set(slug, (attemptsBySlug.get(slug) || 0) + 1);
    });
    return aggregateByCompetence(best, catalogMap)
      .map(c => ({ ...c, attemptCount: attemptsBySlug.get(c.exerciseSlug) || c.attemptCount }))
      .sort((a, b) => a.avgPct - b.avgPct);
  }

  /* ── Dédoublonnage : meilleur pct par (élève × exercice × palier interne 1/2/3) ──
     Distinct de dedupeBestByNiveau (qui résout le niveau SCOLAIRE CM1/CM2/6e
     via meta.levels/paliers — approximatif, pensé pour les jauges de
     progression). Ici on veut le palier interne (1/2/3) tel quel, via
     levelToPalierKey directement sur la valeur brute stockée — donc
     disponible pour tout exercice, y compris les types standalone sans
     `levels` déclarés dans le catalogue (contrairement à resolveNiveau).
     exercise_slug résolu via canonicalSlug() avant de servir de clé, même
     principe que dedupeBestBySlug — un ancien exercice mono-niveau fusionné
     (level souvent absent) retombe sur le palier 1 du nouvel exercice via
     le repli par défaut de levelToPalierKey, seule approximation possible
     puisque l'ancien exercice n'avait justement aucune notion de palier. */
  function dedupeBestBySlugPalier(rows) {
    const map = new Map();
    rows.forEach(r => {
      const slug   = canonicalSlug(r.exercise_slug);
      const palier = levelToPalierKey(r.level);
      const key    = r.student_id + '|' + slug + '|' + palier;
      const pct    = parseFloat(r.pct);
      const prev   = map.get(key);
      if (!prev || pct > prev.pct) map.set(key, { ...r, exercise_slug: slug, pct, palier });
    });
    return Array.from(map.values());
  }

  /* ── Agrégation par exercice ET palier interne (1/2/3) ────────────────────
     Même principe qu'aggregateByCompetence, mais à partir de bestBySlugPalier
     (dedupeBestBySlugPalier ci-dessus) au lieu de best (dedupeBestBySlug, qui
     ignore le niveau). Clé d'agrégation = exercice + palier : un exercice
     progressif apparaît donc jusqu'à 3 fois (une ligne par palier réellement
     tenté par la classe).
     sousDomaine/exerciseSlug ajoutés en sortie (additif, même principe que
     l'extension d'aggregateByCompetence) : nécessaires à l'arborescence
     "Détail par compétence" (étape 2 sous-domaine, clé de navigation par
     slug plutôt que par libellé de compétence — voir plan
     federated-popping-finch, sous-étape B). */
  function aggregateByCompetenceLevel(bestBySlugPalier, catalogMap) {
    const compAgg = new Map();
    bestBySlugPalier.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + r.exercise_slug + '||' + r.palier;
      if (!compAgg.has(key)) {
        compAgg.set(key, { meta, title: exerciseTitleFor(meta.title, r), exerciseSlug: r.exercise_slug, palier: r.palier, sum: 0, count: 0, students: new Set() });
      }
      const agg = compAgg.get(key);
      agg.sum += r.pct; agg.count++; agg.students.add(r.student_id);
    });
    return Array.from(compAgg.values()).map(agg => ({
      domaine: agg.meta.domaine,
      sousDomaine: agg.meta.sousDomaine,
      competence: agg.title,
      exerciseSlug: agg.exerciseSlug,
      niveau: agg.palier,
      avgPct: Math.round(agg.sum / agg.count),
      attemptCount: agg.count,
      studentCount: agg.students.size
    }));
  }

  /* ── Arborescence "Détail par compétence", feuille classe (étape 5) ───────
     Liste des élèves ayant travaillé un exercice+palier précis, avec leur
     meilleur score à ce palier — remplace le détail par question
     (computeClassWorstItems) au niveau feuille de la nouvelle arborescence,
     conformément à l'énoncé ("par élève, pas par question cette fois").
     Filtre à la volée bestBySlugPalier (déjà calculé une fois pour toute la
     classe par dedupeBestBySlugPalier, réutilisé tel quel — pas de nouvel
     appel réseau au clic). Aucun seuil ici (voir plan, décision 6) : le
     seuil de 3 élèves distincts est déjà appliqué en amont, à la liste des
     compétences (étape 3, computeClassExercisesChutes). Triée du score le
     plus faible au plus élevé ; la page résout studentId → nom via son
     studentMap déjà construit. */
  function computeClassLeafStudents(bestBySlugPalier, exerciseSlug, palier) {
    return bestBySlugPalier
      .filter(r => r.exercise_slug === exerciseSlug && r.palier === palier)
      .map(r => ({ studentId: r.student_id, pct: r.pct }))
      .sort((a, b) => a.pct - b.pct);
  }

  /* ── Nombre d'exercices distincts travaillés (bestByNiveau + catalogMap,
     donc uniquement les exercices avec `levels` déclarés — même périmètre
     que le dénominateur de computeNiveauJauge) — pour l'affichage
     "N exercices" à côté du nom de sous-domaine, cohérent avec ce qui
     alimente les segments plutôt qu'un comptage plus large (metaFor). */
  function countExercisesTravailles(bestByNiveau, catalogMap, matchSlug) {
    const slugs = new Set(
      bestByNiveau
        .filter(r => catalogMap[r.exercise_slug] && matchSlug(catalogMap[r.exercise_slug]))
        .map(r => r.exercise_slug)
    );
    return slugs.size;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     VUE CLASSE
  ═══════════════════════════════════════════════════════════════════════════ */
  function computeClassOverview(rows, students, catalogMap) {
    const now = Date.now();
    const enrolledCount = students.length;
    const best = dedupeBestBySlug(rows);

    /* ── Bandeau ─────────────────────────────────────────────────────────── */
    const lastActivityByStudent = new Map();
    rows.forEach(r => {
      const t = new Date(r.completed_at).getTime();
      const prev = lastActivityByStudent.get(r.student_id);
      if (!prev || t > prev) lastActivityByStudent.set(r.student_id, t);
    });
    const activeStudents7d = students.filter(s => {
      const t = s.auth_user_id && lastActivityByStudent.get(s.auth_user_id);
      return t && (now - t) <= WEEK;
    }).length;
    const staleStudents14d = students.filter(s => {
      const t = s.auth_user_id ? lastActivityByStudent.get(s.auth_user_id) : null;
      return !t || (now - t) > 14 * DAY;
    }).length;
    const exercisesWeek  = rows.filter(r => (now - new Date(r.completed_at).getTime()) <= WEEK).length;
    const exercisesTotal = rows.length;

    /* Score moyen classe = moyenne des moyennes par élève (dédupliquées),
       pas moyenne brute — un élève très actif ne doit pas peser plus lourd. */
    const sumByStudent = new Map(), countByStudent = new Map();
    best.forEach(r => {
      sumByStudent.set(r.student_id,   (sumByStudent.get(r.student_id)   || 0) + r.pct);
      countByStudent.set(r.student_id, (countByStudent.get(r.student_id) || 0) + 1);
    });
    const perStudentAvgs = Array.from(sumByStudent.keys())
      .map(sid => sumByStudent.get(sid) / countByStudent.get(sid));
    const classAvg = perStudentAvgs.length
      ? Math.round(perStudentAvgs.reduce((a, b) => a + b, 0) / perStudentAvgs.length)
      : null;

    /* Même méthodologie que classAvg, restreinte à un domaine — moyenne des
       moyennes par élève, pas moyenne brute. */
    function classAvgForDomaine(domaine) {
      const sums = new Map(), counts = new Map();
      best.forEach(r => {
        if (metaFor(catalogMap, r.exercise_slug).domaine !== domaine) return;
        sums.set(r.student_id,   (sums.get(r.student_id)   || 0) + r.pct);
        counts.set(r.student_id, (counts.get(r.student_id) || 0) + 1);
      });
      const avgs = Array.from(sums.keys()).map(sid => sums.get(sid) / counts.get(sid));
      return avgs.length ? Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length) : null;
    }
    const classAvgFrancais = classAvgForDomaine('Français');
    const classAvgMaths    = classAvgForDomaine('Mathématiques');

    /* ── Compétences (top 5 / bottom 5), granularité exercice + niveau ───────
       dedupeBestBySlugPalier (palier interne 1/2/3, cf. levelToPalierKey)
       plutôt que best/dedupeBestBySlug : un exercice progressif est ici
       décomposé en autant de lignes que de paliers réellement tentés par la
       classe. Seuil de 3 élèves (MIN_STUDENTS_COMP_LEVEL, pas
       MIN_STUDENTS_COMP) — plus bas que le seuil "par exercice" car un
       palier précis d'un exercice rassemble mécaniquement moins d'élèves que
       l'exercice entier. */
    const bestBySlugPalier = dedupeBestBySlugPalier(rows);
    const compList = aggregateByCompetenceLevel(bestBySlugPalier, catalogMap)
      .filter(c => c.studentCount >= MIN_STUDENTS_COMP_LEVEL);
    const top5    = [...compList].sort((a, b) => b.avgPct - a.avgPct).slice(0, 5);
    const bottom5 = [...compList].sort((a, b) => a.avgPct - b.avgPct).slice(0, 5);

    /* ── Élèves en réussite / à attention particulière ────────────────────
       Classées par taux de réussite global (avgPct) plutôt qu'un score
       composite : l'ordre affiché doit toujours correspondre au % affiché
       (retour utilisateur — un score caché produisait un classement
       incohérent à l'œil). Seuil d'activité minimal pour être classé : un
       élève avec 1-2 résultats fausserait le classement (moyenne non
       représentative). "Attention particulière" est en plus limitée aux
       élèves sous ATTENTION_THRESHOLD : lister systématiquement 5 noms
       faisait apparaître des élèves à 90%+ de réussite dans cette case. */
    const MIN_ATTEMPTS_RANKING = 10;
    const ATTENTION_THRESHOLD  = 80;
    const rowsByStudent = new Map();
    rows.forEach(r => {
      if (!rowsByStudent.has(r.student_id)) rowsByStudent.set(r.student_id, []);
      rowsByStudent.get(r.student_id).push(r);
    });
    const studentNames = new Map(students.map(s => [s.auth_user_id, s.display_name]));
    const ranked = [];
    rowsByStudent.forEach((studentRows, studentId) => {
      if (studentRows.length < MIN_ATTEMPTS_RANKING) return;
      const profile = computeStudentProfile(studentRows, catalogMap);
      if (profile.rates.general === null || profile.totalCompetences === 0) return;
      ranked.push({
        studentId,
        name: studentNames.get(studentId) || '?',
        avgPct: profile.rates.general,
        notAcquiredCount: profile.consolider.length
      });
    });
    const topStudents    = [...ranked].sort((a, b) => b.avgPct - a.avgPct).slice(0, 5);
    const bottomStudents = ranked
      .filter(s => s.avgPct < ATTENTION_THRESHOLD)
      .sort((a, b) => a.avgPct - b.avgPct)
      .slice(0, 5);

    return {
      bandeau: {
        activeStudents7d, exercisesWeek, exercisesTotal, staleStudents14d, enrolledCount,
        classAvg, classAvgFrancais, classAvgMaths
      },
      top5, bottom5, topStudents, bottomStudents
    };
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     VUE ÉLÈVE (fiche + bulletin — les deux appellent cette même fonction,
     le bulletin passant des `rows` déjà filtrées sur la période choisie)
  ═══════════════════════════════════════════════════════════════════════════ */
  function computeStudentProfile(rows, catalogMap) {
    const best        = dedupeBestBySlug(rows);
    const bestByNiveau = dedupeBestByNiveau(rows, catalogMap);
    const bestForJauge = dedupeBestBySlugForJauge(rows, catalogMap);

    /* ── Détail par niveau scolaire (CM1/CM2/6e) pour chaque exercice ──────
       Réutilise bestByNiveau (déjà calculé pour les jauges) plutôt que de
       relire les rows brutes ; chaque niveau reste indépendant (moyenne des
       meilleurs pct des exercices résolus à ce niveau), sans déduction
       depuis un niveau supérieur. Alimente à la fois consolider/reussies
       (champ `levels`) et l'arborescence des jauges sous-domaine (champ
       `competences`, voir plus bas). Clé par exercise_slug (et non par
       compLabel) : une compétence du catalogue peut regrouper plusieurs
       exercices (ex. "Pronoms personnels" = 3 exercices) et le tableau
       "Bilan par compétences" affiche l'intitulé exact de chaque exercice
       (exerciseTitleFor) plutôt que le libellé générique de la compétence. */
    const niveauAggByComp = new Map();
    bestByNiveau.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + r.exercise_slug;
      if (!niveauAggByComp.has(key)) {
        niveauAggByComp.set(key, { meta, slug: r.exercise_slug, title: exerciseTitleFor(meta.title, r), byLevel: {} });
      }
      const byLevel = niveauAggByComp.get(key).byLevel;
      if (!byLevel[r.niveau]) byLevel[r.niveau] = { sum: 0, count: 0 };
      byLevel[r.niveau].sum += r.pct;
      byLevel[r.niveau].count++;
    });
    function levelsPctFor(key) {
      const byLevel = (niveauAggByComp.get(key) || {}).byLevel || {};
      const out = {};
      JAUGE_LEVELS.forEach(level => {
        const agg = byLevel[level];
        out[level] = agg ? Math.round(agg.sum / agg.count) : null;
      });
      return out;
    }

    /* ── Jauges de niveau par domaine ─────────────────────────────────────
       Dénominateur = exercices du catalogue pour ce domaine dont la portée
       (`levels`) couvre ce niveau scolaire ou un niveau inférieur (héritage
       cumulatif CM1 ⊂ CM2 ⊂ 6e, voir computeNiveauJauge). Numérateur =
       combien de ces exercices ont un meilleur score global ≥80% (`best`,
       tous paliers confondus) ; les exercices hors catalogue ou sans
       `levels` déclaré ne comptent dans aucun segment. */
    const jauges = {};
    DOMAIN_ORDER.forEach(domaine => {
      jauges[domaine] = computeNiveauJauge(bestForJauge, catalogMap, m => m.domaine === domaine);
    });

    /* ── Jauges de niveau par sous-domaine ─────────────────────────────────
       Même logique que jauges (computeNiveauJauge), filtrée en plus sur le
       sous-domaine. La liste des sous-domaines à calculer vient de
       computeSousDomaineRates (ce que l'élève a réellement travaillé) —
       pas du catalogue entier, pour ne pas afficher de jauge vide pour un
       sous-domaine jamais abordé. */
    const sousDomaineJauges = {};
    computeSousDomaineRates(rows, catalogMap).forEach(({ domaine, sousDomaine }) => {
      if (!sousDomaineJauges[domaine]) sousDomaineJauges[domaine] = [];
      const matchFn = m => m.domaine === domaine && m.sousDomaine === sousDomaine;
      /* Exercices de ce sous-domaine effectivement travaillés (au moins un
         niveau résolu dans bestByNiveau) — pour le détail par pastilles du
         bulletin, une ligne par exercice (intitulé exact) sous chaque
         sous-domaine, plutôt qu'une ligne par compétence du catalogue
         (qui peut regrouper plusieurs exercices, voir niveauAggByComp). */
      const competences = [];
      niveauAggByComp.forEach((entry, key) => {
        if (entry.meta.domaine === domaine && entry.meta.sousDomaine === sousDomaine) {
          competences.push({
            title: entry.title,
            competence: entry.meta.competence,
            slug: entry.slug,
            levels: levelsPctFor(key)
          });
        }
      });
      competences.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
      sousDomaineJauges[domaine].push({
        sousDomaine,
        exerciseCount: countExercisesTravailles(bestByNiveau, catalogMap, matchFn),
        segments: computeNiveauJauge(bestForJauge, catalogMap, matchFn),
        competences
      });
    });
    Object.values(sousDomaineJauges).forEach(list => list.sort((a, b) => a.sousDomaine.localeCompare(b.sousDomaine, 'fr')));

    /* ── Compétences à consolider / réussies ──────────────────────────────
       Consolider : moyenne ≤60% OU échec répété (≥2 tentatives sur un même
       exercice sans jamais atteindre 80%). Réussies : moyenne ≥80%.
       Clé par exercise_slug (même principe que niveauAggByComp ci-dessus,
       et même clé exacte) — pas par compLabel : une compétence du catalogue
       peut regrouper plusieurs exercices, chacun listé séparément avec son
       propre titre (exerciseTitleFor) plutôt que fusionnés sous le libellé
       générique de la compétence. La clé doit correspondre exactement à
       celle de niveauAggByComp pour que `levels` ci-dessous ne soit pas vide. */
    const attemptsBySlug = new Map();
    rows.forEach(r => {
      if (!attemptsBySlug.has(r.exercise_slug)) attemptsBySlug.set(r.exercise_slug, []);
      attemptsBySlug.get(r.exercise_slug).push(parseFloat(r.pct));
    });

    const compAgg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + r.exercise_slug;
      if (!compAgg.has(key)) compAgg.set(key, { meta, slug: r.exercise_slug, title: exerciseTitleFor(meta.title, r), sum: 0, count: 0 });
      const agg = compAgg.get(key);
      agg.sum += r.pct; agg.count++;
    });

    const consolider = [];
    const reussies    = [];
    compAgg.forEach((agg, key) => {
      const avgPct = agg.sum / agg.count;
      const attempts = attemptsBySlug.get(agg.slug) || [];
      const hasRepeatedFailure = attempts.length >= 2 && Math.max(...attempts) < SUCCESS_THRESHOLD;
      const entry = {
        domaine: agg.meta.domaine,
        competence: agg.title,
        avgPct: Math.round(avgPct),
        hasRepeatedFailure,
        exampleSlug: agg.slug,
        levels: levelsPctFor(key)
      };
      if (avgPct <= 60 || hasRepeatedFailure) consolider.push(entry);
      else if (avgPct >= SUCCESS_THRESHOLD) reussies.push(entry);
    });
    consolider.sort((a, b) => (b.hasRepeatedFailure - a.hasRepeatedFailure) || (a.avgPct - b.avgPct));
    reussies.sort((a, b) => b.avgPct - a.avgPct);

    /* ── Taux de réussite général / par matière ───────────────────────────
       Moyenne simple des meilleurs scores (un seul élève : pas de biais
       "élève très actif" à corriger, contrairement à la classe). */
    const generalAvg  = best.length ? Math.round(best.reduce((s, r) => s + r.pct, 0) / best.length) : null;
    const francaisBest = best.filter(r => metaFor(catalogMap, r.exercise_slug).domaine === 'Français');
    const mathsBest     = best.filter(r => metaFor(catalogMap, r.exercise_slug).domaine === 'Mathématiques');
    const francaisAvg = francaisBest.length ? Math.round(francaisBest.reduce((s, r) => s + r.pct, 0) / francaisBest.length) : null;
    const mathsAvg    = mathsBest.length ? Math.round(mathsBest.reduce((s, r) => s + r.pct, 0) / mathsBest.length) : null;

    /* ── Courbe d'activité : 8 fenêtres glissantes de 7 jours ─────────────── */
    const now = Date.now();
    const weekly = Array.from({ length: 8 }, (_, i) => ({ index: i, count: 0 }));
    rows.forEach(r => {
      const age = now - new Date(r.completed_at).getTime();
      if (age < 0 || age >= 8 * WEEK) return;
      const bucket = 7 - Math.floor(age / WEEK);
      if (bucket >= 0 && bucket < 8) weekly[bucket].count++;
    });

    /* Synthèse factuelle par domaine (utilisée par le bulletin) */
    const domSynthese = DOMAIN_ORDER.map(domaine => {
      const domBest = best.filter(r => metaFor(catalogMap, r.exercise_slug).domaine === domaine);
      if (domBest.length === 0) return { domaine, count: 0, avgPct: null, consolidees: 0, aRenforcer: 0 };
      const avgPct = Math.round(domBest.reduce((s, r) => s + r.pct, 0) / domBest.length);
      const consolidees = reussies.filter(c => c.domaine === domaine).length;
      const aRenforcer  = consolider.filter(c => c.domaine === domaine).length;
      return { domaine, count: domBest.length, avgPct, consolidees, aRenforcer };
    });

    return {
      jauges, sousDomaineJauges, consolider, reussies, weekly, domSynthese,
      totalReussis: best.filter(r => r.pct >= SUCCESS_THRESHOLD).length,
      totalExercices: rows.length,
      totalCompetences: compAgg.size,
      rates: { general: generalAvg, francais: francaisAvg, maths: mathsAvg }
    };
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     VUE PLATEFORME (admin — agrégats toutes classes confondues, aucune
     donnée par élève : mêmes seuils que la vue classe, voir aggregateByCompetence)
  ═══════════════════════════════════════════════════════════════════════════ */
  function computeCompetenceStats(rows, catalogMap) {
    const best     = dedupeBestBySlug(rows);
    const compList = aggregateByCompetence(best, catalogMap)
      .filter(c => c.studentCount >= MIN_STUDENTS_COMP);

    return {
      topReussite:    [...compList].sort((a, b) => b.avgPct - a.avgPct).slice(0, 5),
      bottomReussite: [...compList].sort((a, b) => a.avgPct - b.avgPct).slice(0, 5),
      mostWorked:     [...compList].sort((a, b) => b.studentCount - a.studentCount).slice(0, 5),
      leastWorked:    [...compList].sort((a, b) => a.studentCount - b.studentCount).slice(0, 5)
    };
  }

  /* ── Questions les plus ratées (fiche élève enrichie) ─────────────────────
     Fenêtre glissante : 5 dernières tentatives par item_id (rows déjà
     triées created_at desc par getStudentItemResultsRaw, donc les 5
     premières rencontrées par groupe = les 5 dernières). Seuil : au moins
     1 tentative et un taux d'échec > 0, sinon l'item n'est pas affiché —
     un item raté dès le premier essai doit remonter, pas seulement à partir
     de la 2e tentative. Triées par taux d'échec décroissant, 10 pires au
     maximum. */
  const WORST_ITEMS_WINDOW = 5;
  const WORST_ITEMS_MIN_ATTEMPTS = 1;
  const WORST_ITEMS_MAX_DISPLAY = 10;

  function computeWorstItems(itemRows) {
    const byItem = new Map();
    for (const r of itemRows) {
      const g = byItem.get(r.item_id) || [];
      if (g.length < WORST_ITEMS_WINDOW) g.push(r);
      byItem.set(r.item_id, g);
    }
    return [...byItem.entries()]
      .map(([item_id, rows]) => ({
        item_id,
        exercise_slug: rows[0].exercise_slug,
        level:         rows[0].level,
        attempts:      rows.length,
        failRate:      rows.filter(r => !r.is_correct).length / rows.length
      }))
      .filter(it => it.attempts >= WORST_ITEMS_MIN_ATTEMPTS && it.failRate > 0)
      .sort((a, b) => b.failRate - a.failRate)
      .slice(0, WORST_ITEMS_MAX_DISPLAY);
  }

  /* item_id → texte de la question, résolu dynamiquement depuis EXERCISE_DATA
     (jamais stocké en dur) — réutilise CompetencePreview.extractLevelBuckets/
     describeQA (js/competence-preview.js), déjà responsable de ce même
     format d'aperçu côté admin. Retourne null si l'exercice ou l'item n'est
     plus dans le catalogue (compétence retirée depuis) : l'appelant décide
     de l'affichage de repli. */
  function resolveItemText(exerciseSlug, level, itemId) {
    if (typeof EXERCISE_DATA === 'undefined' || typeof CompetencePreview === 'undefined') return null;
    const ex = EXERCISE_DATA[exerciseSlug];
    if (!ex) return null;
    const bucket = CompetencePreview.extractLevelBuckets(ex).find(b => b.level === level);
    const item = bucket && bucket.items.find(it => it && it.id === itemId);
    if (!item) return null;
    return CompetencePreview.describeQA(item, ex);
  }

  /* Intitulé de spécificité du niveau (levelDescs, data/*.js) pour un palier
     interne (1/2/3) d'une compétence — sert à enrichir les lignes "Niveau X"
     de l'arborescence "Détail par compétence" (bilan-nav.js), au même titre
     que niveau-pastilles.js pour les pastilles CM1/CM2/6e. Même traduction
     palier→niveau scolaire que niveauForPalier, à une différence près : ici
     le repli quand `paliers` n'est pas déclaré est `meta.levels.length` et
     non 1. Ce composant affiche le palier interne (1/2/3) tel quel — jamais
     résolu vers un niveau scolaire agrégé comme resolveNiveau — donc rien
     n'exploite le défaut à 1 pour rester "cohérent" avec un pct déjà mal
     agrégé ailleurs (voir resolveNiveau) ; le repli sur levels.length est
     simplement la meilleure hypothèse en l'absence d'information, et évite
     qu'un défaut pensé pour un autre usage n'attribue ici la description du
     palier 1 à tous les paliers d'une compétence (cas réel : 8 compétences
     grammaire.js encore sans `paliers:`, voir audit). Retourne null si
     l'exercice n'a pas de levelDescs, pas de niveaux déclarés, ou si le
     palier n'a pas de correspondance. */
  function levelDescFor(catalogMap, slug, palier) {
    if (typeof EXERCISE_DATA === 'undefined') return null;
    const meta = metaFor(catalogMap, slug);
    if (!meta || !meta.levels || meta.levels.length === 0) return null;
    const paliers = typeof meta.paliers === 'number' && meta.paliers >= 1 ? meta.paliers : meta.levels.length;
    const palierIdx = parseInt(palier, 10);
    const safeIdx = Number.isFinite(palierIdx) && palierIdx > 0 ? palierIdx : 1;
    const grade = niveauForPalier(safeIdx, paliers, meta.levels);
    const ex = EXERCISE_DATA[slug];
    return (ex && ex.levelDescs && ex.levelDescs[grade]) || null;
  }

  return {
    SUCCESS_THRESHOLD, JAUGE_LEVELS, DOMAIN_ORDER, MIN_STUDENTS_COMP,
    buildCatalogMap, dedupeBestBySlug, computeSousDomaineRates,
    computeClassOverview, computeStudentProfile, computeCompetenceStats,
    computeWorstItems, resolveItemText, levelDescFor,
    computeClassExercisesChutes, computeStudentExercisesChutes,
    dedupeBestBySlugPalier, aggregateByCompetenceLevel, computeClassLeafStudents,
    levelToPalierKey,
    metaFor, exerciseTitleFor
  };
})();

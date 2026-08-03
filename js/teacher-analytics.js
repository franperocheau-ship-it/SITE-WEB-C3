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
      'identifier-verbe-conjugue':           { domaine: 'Français',      competence: 'Conjugaison — Identifier le verbe conjugué' },
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
      { prefix: 'lex-',   meta: { domaine: 'Français', competence: 'Vocabulaire' } },
    ],
  };

  function standaloneMetaFor(slug) {
    if (STANDALONE_META.exact[slug]) return STANDALONE_META.exact[slug];
    const rule = STANDALONE_META.prefixes.find(r => slug.startsWith(r.prefix));
    return rule ? rule.meta : null;
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

  /* ── Dédoublonnage : meilleur pct par (élève × exercice) ─────────────────── */
  function dedupeBestBySlug(rows) {
    const map = new Map();
    rows.forEach(r => {
      const key  = r.student_id + '|' + r.exercise_slug;
      const pct  = parseFloat(r.pct);
      const prev = map.get(key);
      if (!prev || pct > prev.pct) map.set(key, { ...r, pct });
    });
    return Array.from(map.values());
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

  /* ── État par niveau (non travaillé / en cours / atteint) pour un ensemble
     d'exercices catalogue sélectionné par `matchSlug(meta)` — factorisé pour
     être utilisé à la fois pour la jauge domaine (jauges) et pour chaque
     jauge sous-domaine (sousDomaineJauges, voir computeStudentProfile).
     Dénominateur = exercices catalogue avec `levels` déclarés correspondant
     au filtre ; numérateur = meilleur score ≥80% au niveau scolaire résolu
     (voir resolveNiveau). */
  function computeNiveauJauge(bestByNiveau, catalogMap, matchSlug) {
    const expectedByLevel = {};
    JAUGE_LEVELS.forEach(level => { expectedByLevel[level] = []; });
    Object.keys(catalogMap).forEach(slug => {
      const m = catalogMap[slug];
      if (!matchSlug(m)) return;
      (m.levels || []).forEach(level => {
        if (expectedByLevel[level]) expectedByLevel[level].push(slug);
      });
    });

    return JAUGE_LEVELS.map(level => {
      const matching = bestByNiveau.filter(r =>
        r.niveau === level && catalogMap[r.exercise_slug] && matchSlug(catalogMap[r.exercise_slug]));
      const achieved  = new Set(matching.filter(r => r.pct >= SUCCESS_THRESHOLD).map(r => r.exercise_slug));
      const attempted = new Set(matching.map(r => r.exercise_slug));
      const denom = expectedByLevel[level].length;
      const ratio = denom > 0 ? achieved.size / denom : 0;
      /* "en cours" dès la 1ère tentative enregistrée, même sans réussite ≥80% —
         "non travaillé" seulement en l'absence totale d'exercice fait à ce
         niveau (voir discussion Objectif jauges sous-domaine, 2026-07-18). */
      const status = denom === 0 ? 'non-concerne'
        : ratio >= 0.7 ? 'atteint'
        : (ratio >= 0.15 || attempted.size > 0) ? 'en-cours' /* TEMP test seuil : 0.3 → 0.15, à revenir en arrière après validation visuelle */
        : 'non-travaille';
      return { level, ratio, status, denom, achieved: achieved.size, attempted: attempted.size };
    });
  }

  /* ── Agrégation par compétence : moyenne + volume ─────────────────────────
     Factorisé pour être utilisé à la fois par computeClassOverview (vue
     classe) et computeCompetenceStats (vue plateforme, admin) — même forme
     { domaine, competence, avgPct, attemptCount, studentCount } par
     compétence, à partir de `best` (dédoublonné élève × exercice). */
  function aggregateByCompetence(best, catalogMap) {
    const compAgg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + meta.compLabel;
      if (!compAgg.has(key)) compAgg.set(key, { meta, sum: 0, count: 0, students: new Set() });
      const agg = compAgg.get(key);
      agg.sum += r.pct; agg.count++; agg.students.add(r.student_id);
    });
    return Array.from(compAgg.values()).map(agg => ({
      domaine: agg.meta.domaine,
      competence: agg.meta.competence,
      avgPct: Math.round(agg.sum / agg.count),
      attemptCount: agg.count,
      studentCount: agg.students.size
    }));
  }

  /* ── Nombre d'exercices distincts travaillés (même source/filtre que
     computeNiveauJauge : bestByNiveau + catalogMap) — pour l'affichage
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

    /* ── Compétences (top 5 / bottom 5) ─────────────────────────────────────
       Seuil de 5 élèves appliqué aux deux classements pour éviter qu'une
       compétence travaillée par un seul élève ne fausse le résultat. */
    const compList = aggregateByCompetence(best, catalogMap)
      .filter(c => c.studentCount >= MIN_STUDENTS_COMP);
    const top5    = [...compList].sort((a, b) => b.avgPct - a.avgPct).slice(0, 5);
    const bottom5 = [...compList].sort((a, b) => a.avgPct - b.avgPct).slice(0, 5);

    /* ── Élèves en réussite / à attention particulière ────────────────────
       Score composite = 50% taux de réussite global + 50% proportion de
       compétences acquises (1 − compétences à consolider / compétences
       travaillées, voir computeStudentProfile). Seuil d'activité minimal
       pour être classé : un élève avec 1-2 résultats fausserait le
       classement (moyenne non représentative). */
    const MIN_ATTEMPTS_RANKING = 10;
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
      const notAcquiredRate = profile.consolider.length / profile.totalCompetences;
      const compositeScore  = Math.round(0.5 * profile.rates.general + 0.5 * (100 * (1 - notAcquiredRate)));
      ranked.push({
        studentId,
        name: studentNames.get(studentId) || '?',
        avgPct: profile.rates.general,
        notAcquiredCount: profile.consolider.length,
        compositeScore
      });
    });
    const topStudents    = [...ranked].sort((a, b) => b.compositeScore - a.compositeScore).slice(0, 5);
    const bottomStudents = [...ranked].sort((a, b) => a.compositeScore - b.compositeScore).slice(0, 5);

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

    /* ── Détail par niveau scolaire (CM1/CM2/6e) pour chaque compétence ────
       Réutilise bestByNiveau (déjà calculé pour les jauges) plutôt que de
       relire les rows brutes ; chaque niveau reste indépendant (moyenne des
       meilleurs pct des exercices résolus à ce niveau pour cette
       compétence), sans déduction depuis un niveau supérieur. Alimente à la
       fois consolider/reussies (champ `levels`) et l'arborescence des jauges
       sous-domaine (champ `competences`, voir plus bas). */
    const niveauAggByComp = new Map();
    bestByNiveau.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + meta.compLabel;
      if (!niveauAggByComp.has(key)) niveauAggByComp.set(key, { meta, byLevel: {} });
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
       Dénominateur = exercices du catalogue pour ce domaine × niveau.
       Numérateur = combien de ces exercices ont un meilleur score ≥80% au
       niveau scolaire résolu (voir resolveNiveau) ; les exercices hors
       catalogue ou sans `levels` déclaré ne comptent dans aucun segment. */
    const jauges = {};
    DOMAIN_ORDER.forEach(domaine => {
      jauges[domaine] = computeNiveauJauge(bestByNiveau, catalogMap, m => m.domaine === domaine);
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
      /* Compétences de ce sous-domaine effectivement travaillées (au moins
         un niveau résolu dans bestByNiveau) — pour le détail par pastilles
         du bulletin, une ligne par compétence sous chaque sous-domaine. */
      const competences = [];
      niveauAggByComp.forEach((entry, key) => {
        if (entry.meta.domaine === domaine && entry.meta.sousDomaine === sousDomaine) {
          competences.push({
            compLabel: entry.meta.compLabel,
            competence: entry.meta.competence,
            levels: levelsPctFor(key)
          });
        }
      });
      competences.sort((a, b) => a.compLabel.localeCompare(b.compLabel, 'fr'));
      sousDomaineJauges[domaine].push({
        sousDomaine,
        exerciseCount: countExercisesTravailles(bestByNiveau, catalogMap, matchFn),
        segments: computeNiveauJauge(bestByNiveau, catalogMap, matchFn),
        competences
      });
    });
    Object.values(sousDomaineJauges).forEach(list => list.sort((a, b) => a.sousDomaine.localeCompare(b.sousDomaine, 'fr')));

    /* ── Compétences à consolider / réussies ──────────────────────────────
       Consolider : moyenne <60% OU échec répété (≥2 tentatives sur un même
       exercice sans jamais atteindre 80%). Réussies : moyenne ≥80%. */
    const attemptsBySlug = new Map();
    rows.forEach(r => {
      if (!attemptsBySlug.has(r.exercise_slug)) attemptsBySlug.set(r.exercise_slug, []);
      attemptsBySlug.get(r.exercise_slug).push(parseFloat(r.pct));
    });

    const compAgg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + meta.compLabel;
      if (!compAgg.has(key)) compAgg.set(key, { meta, sum: 0, count: 0, slugs: [] });
      const agg = compAgg.get(key);
      agg.sum += r.pct; agg.count++; agg.slugs.push(r.exercise_slug);
    });

    const consolider = [];
    const reussies    = [];
    compAgg.forEach((agg, key) => {
      const avgPct = agg.sum / agg.count;
      const hasRepeatedFailure = agg.slugs.some(slug => {
        const attempts = attemptsBySlug.get(slug) || [];
        return attempts.length >= 2 && Math.max(...attempts) < SUCCESS_THRESHOLD;
      });
      const entry = {
        domaine: agg.meta.domaine,
        competence: agg.meta.competence,
        avgPct: Math.round(avgPct),
        hasRepeatedFailure,
        exampleSlug: agg.slugs[0],
        levels: levelsPctFor(key)
      };
      if (avgPct < 60 || hasRepeatedFailure) consolider.push(entry);
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

  return {
    SUCCESS_THRESHOLD, JAUGE_LEVELS, DOMAIN_ORDER, MIN_STUDENTS_COMP,
    buildCatalogMap, dedupeBestBySlug, computeSousDomaineRates,
    computeClassOverview, computeStudentProfile, computeCompetenceStats
  };
})();

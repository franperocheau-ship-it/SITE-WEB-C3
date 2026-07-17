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

  /* ── Catalogue : slug → {domaine, competence, sousDomaine, compLabel, title, levels} ── */
  function buildCatalogMap() {
    const map = {};
    if (typeof EXERCISE_DATA === 'undefined') return map;
    Object.keys(EXERCISE_DATA).forEach(slug => {
      const ex  = EXERCISE_DATA[slug];
      const sep = ex.competence.indexOf(' — ');
      map[slug] = {
        domaine:     ex.domaine,
        competence:  ex.competence,
        sousDomaine: sep >= 0 ? ex.competence.slice(0, sep)  : ex.competence,
        compLabel:   sep >= 0 ? ex.competence.slice(sep + 3) : ex.competence,
        title:       ex.title || null,
        levels:      ex.levels || [],
        paliers:     ex.paliers
      };
    });
    return map;
  }

  function metaFor(catalogMap, slug) {
    return catalogMap[slug] || UNKNOWN_META;
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
    const meta = catalogMap[row.exercise_slug];
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

    /* ── Compétences (top 5 / bottom 5) ─────────────────────────────────────
       Seuil de 5 élèves appliqué aux deux classements pour éviter qu'une
       compétence travaillée par un seul élève ne fausse le résultat. */
    const compAgg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      const key  = meta.domaine + '||' + meta.sousDomaine + '||' + meta.compLabel;
      if (!compAgg.has(key)) compAgg.set(key, { meta, sum: 0, count: 0, students: new Set() });
      const agg = compAgg.get(key);
      agg.sum += r.pct; agg.count++; agg.students.add(r.student_id);
    });
    const compList = Array.from(compAgg.values())
      .filter(agg => agg.students.size >= MIN_STUDENTS_COMP)
      .map(agg => ({
        domaine: agg.meta.domaine,
        competence: agg.meta.competence,
        avgPct: Math.round(agg.sum / agg.count),
        studentCount: agg.students.size
      }));
    const top5    = [...compList].sort((a, b) => b.avgPct - a.avgPct).slice(0, 5);
    const bottom5 = [...compList].sort((a, b) => a.avgPct - b.avgPct).slice(0, 5);

    /* ── Exercices en difficulté ─────────────────────────────────────────────
       score moyen / taux de réussite calculés sur les meilleurs scores
       (mesure de maîtrise) ; "tentatives" reste le compte brut (volume de
       pratique réel, avant maîtrise). */
    const slugRawCount = new Map();
    rows.forEach(r => slugRawCount.set(r.exercise_slug, (slugRawCount.get(r.exercise_slug) || 0) + 1));

    const exAgg = new Map();
    best.forEach(r => {
      if (!exAgg.has(r.exercise_slug)) exAgg.set(r.exercise_slug, { sum: 0, count: 0, students: new Set(), success: 0 });
      const agg = exAgg.get(r.exercise_slug);
      agg.sum += r.pct; agg.count++; agg.students.add(r.student_id);
      if (r.pct >= SUCCESS_THRESHOLD) agg.success++;
    });
    const exList = Array.from(exAgg.entries())
      .filter(([, agg]) => agg.students.size >= MIN_STUDENTS_COMP)
      .map(([slug, agg]) => {
        const meta = metaFor(catalogMap, slug);
        return {
          slug,
          title: meta.title || slug.replace(/-/g, ' '),
          domaine: meta.domaine,
          avgPct: Math.round(agg.sum / agg.count),
          successRate: Math.round((agg.success / agg.count) * 100),
          attempts: slugRawCount.get(slug) || agg.count
        };
      })
      .sort((a, b) => a.avgPct - b.avgPct)
      .slice(0, 8);

    /* ── Heatmap domaines × activité ─────────────────────────────────────── */
    const domAgg = new Map();
    best.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      if (!domAgg.has(meta.domaine)) domAgg.set(meta.domaine, { sum: 0, count: 0, students: new Set() });
      const agg = domAgg.get(meta.domaine);
      agg.sum += r.pct; agg.count++; agg.students.add(r.student_id);
    });
    const domRawCount = new Map();
    rows.forEach(r => {
      const meta = metaFor(catalogMap, r.exercise_slug);
      domRawCount.set(meta.domaine, (domRawCount.get(meta.domaine) || 0) + 1);
    });
    const domaineKeys = DOMAIN_ORDER.filter(d => domAgg.has(d));
    Array.from(domAgg.keys()).forEach(d => { if (!domaineKeys.includes(d)) domaineKeys.push(d); });
    const heatmap = domaineKeys.map(domaine => {
      const agg = domAgg.get(domaine);
      return {
        domaine,
        exerciseCount: domRawCount.get(domaine) || 0,
        avgPct: Math.round(agg.sum / agg.count),
        studentPct: enrolledCount ? Math.round((agg.students.size / enrolledCount) * 100) : 0
      };
    });

    return {
      bandeau: { activeStudents7d, exercisesWeek, exercisesTotal, classAvg, staleStudents14d, enrolledCount },
      top5, bottom5, exList, heatmap
    };
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     VUE ÉLÈVE (fiche + bulletin — les deux appellent cette même fonction,
     le bulletin passant des `rows` déjà filtrées sur la période choisie)
  ═══════════════════════════════════════════════════════════════════════════ */
  function computeStudentProfile(rows, catalogMap) {
    const best        = dedupeBestBySlug(rows);
    const bestByNiveau = dedupeBestByNiveau(rows, catalogMap);

    /* ── Jauges de niveau par domaine ─────────────────────────────────────
       Dénominateur = exercices du catalogue pour ce domaine × niveau.
       Numérateur = combien de ces exercices ont un meilleur score ≥80% au
       niveau scolaire résolu (voir resolveNiveau) ; les exercices hors
       catalogue ou sans `levels` déclaré ne comptent dans aucun segment. */
    const jauges = {};
    DOMAIN_ORDER.forEach(domaine => {
      const expectedByLevel = {};
      JAUGE_LEVELS.forEach(level => { expectedByLevel[level] = []; });
      Object.keys(catalogMap).forEach(slug => {
        const m = catalogMap[slug];
        if (m.domaine !== domaine) return;
        (m.levels || []).forEach(level => {
          if (expectedByLevel[level]) expectedByLevel[level].push(slug);
        });
      });

      jauges[domaine] = JAUGE_LEVELS.map(level => {
        const achieved = new Set(
          bestByNiveau
            .filter(r => r.niveau === level && r.pct >= SUCCESS_THRESHOLD && catalogMap[r.exercise_slug]?.domaine === domaine)
            .map(r => r.exercise_slug)
        );
        const denom = expectedByLevel[level].length;
        const ratio = denom > 0 ? achieved.size / denom : 0;
        const status = denom === 0 ? 'non-concerne'
          : ratio >= 0.7 ? 'atteint'
          : ratio >= 0.15 ? 'en-cours' /* TEMP test seuil : 0.3 → 0.15, à revenir en arrière après validation visuelle */
          : 'non-travaille';
        return { level, ratio, status, denom, achieved: achieved.size };
      });
    });

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
    compAgg.forEach(agg => {
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
        exampleSlug: agg.slugs[0]
      };
      if (avgPct < 60 || hasRepeatedFailure) consolider.push(entry);
      else if (avgPct >= SUCCESS_THRESHOLD) reussies.push(entry);
    });
    consolider.sort((a, b) => (b.hasRepeatedFailure - a.hasRepeatedFailure) || (a.avgPct - b.avgPct));
    reussies.sort((a, b) => b.avgPct - a.avgPct);

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
      jauges, consolider, reussies, weekly, domSynthese,
      totalReussis: best.filter(r => r.pct >= SUCCESS_THRESHOLD).length,
      totalExercices: rows.length
    };
  }

  return {
    SUCCESS_THRESHOLD, JAUGE_LEVELS, DOMAIN_ORDER,
    buildCatalogMap, dedupeBestBySlug,
    computeClassOverview, computeStudentProfile
  };
})();

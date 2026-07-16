#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────────
   audit-levels.mjs — Vérifie que le champ `paliers` de exercise-data.js (nombre
   réel de paliers de difficulté du moteur) correspond bien à ce qui est
   réellement implémenté, pour chaque exercice du catalogue.

   `paliers` est distinct de `levels` (niveaux scolaires pédagogiques —
   CM1/CM2/6e — utilisé par le bulletin, les badges et le catalogue). Ce
   script ne touche pas à `levels`.

   À rejouer après chaque ajout/modification d'exercice :
     node scripts/audit-levels.mjs

   Sort avec le code 1 si au moins une divergence ou un champ `paliers`
   manquant est détecté (utilisable comme vérification avant commit/CI).
   ───────────────────────────────────────────────────────────────────────────── */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const dataCode = fs.readFileSync(path.join(ROOT, 'exercise-data.js'), 'utf8');
const EXERCISE_DATA = new Function(dataCode + '; return EXERCISE_DATA;')();
const exerciseHtml = fs.readFileSync(path.join(ROOT, 'exercise.html'), 'utf8');

/* Types confirmés (lecture de exercise.html) qui lisent `sessionData.levels`
   (= EXERCISE_DATA[slug].levels) DIRECTEMENT à l'exécution pour construire
   leur LevelSelect — cf. grep "sessionData.levels" dans exercise.html.
   Pour ces types, paliers === levels.length TOUJOURS, par construction :
   aucune divergence possible, peu importe ce qu'indiquerait un signal de
   données. */
const GUARANTEED_CONSISTENT_TYPES = [
  'produire-3-formes', 'accord-ecrit',
  'lire-fraction', 'representer-fraction', 'placer-fraction-droite',
  'comparer-fractions', 'encadrer-fraction', 'nombre-entier',
  'decomposer-fraction', 'fractions-problemes', 'accord-participe-cod',
  'mots-invariables-serie'
];

/* Types confirmés (lecture de startSessionWithType() dans exercise.html) qui
   tombent dans le bloc générique `else { bankSource = sessionData.bank }` —
   AUCUN écran de sélection de niveau, session continue unique, quel que soit
   un éventuel champ `level`/`difficulty` décoratif dans leurs données :
   paliers doit valoir 1. */
const CONFIRMED_UNGATED_TYPES = [
  'matching', 'conjugation-table', 'guess-subject', 'find-error', 'word-order',
  'fill-blank', 'multiple-choice',
  'text-input', 'infinitif-et-groupe', 'auxiliaire-identifier', 'mots-cliquables',
  'infinitif-passe-compose', 'classification-etapes', 'choix-etiquette',
  'valeur-position' /* vpInitSession : 5 ÉTAPES dans UNE session, pas des paliers */
];

function detectFromLvlKeys(ex) {
  // couvre lvl1/lvl2/..., lvl1Bank/lvl1Pool/..., et level1Bank/level2Bank/...
  const keys = Object.keys(ex).filter(k => /^lvl\d+/i.test(k) || /^level\d+/i.test(k));
  if (keys.length === 0) return null;
  const nums = [...new Set(keys.map(k => parseInt(k.match(/\d+/)[0], 10)))].sort((a, b) => a - b);
  const n = nums.length;
  const contiguous = nums.every((v, i) => v === i + 1);
  return contiguous ? n : { irregular: nums };
}

function detectFromBank(ex) {
  if (!Array.isArray(ex.bank)) return null;
  const hasLevel = ex.bank.some(it => it && typeof it === 'object' && 'level' in it);
  const hasDifficulty = ex.bank.some(it => it && typeof it === 'object' && 'difficulty' in it);
  const field = hasLevel ? 'level' : (hasDifficulty ? 'difficulty' : null);
  if (!field) return null;
  const values = new Set(ex.bank.map(it => it[field]).filter(v => v !== undefined));
  return { count: values.size, field };
}

// { CM1: [...], CM2: [...], 6e: [...] } — clé = id de niveau
function detectFromPoolsObject(ex) {
  if (!ex.pools || typeof ex.pools !== 'object' || Array.isArray(ex.pools)) return null;
  const keys = Object.keys(ex.pools);
  return keys.length > 0 ? keys.length : null;
}

// niveauxConfig.lvDefs = [{lv:1,...},{lv:2,...}]
function detectFromNiveauxConfig(ex) {
  const lvDefs = ex.niveauxConfig && ex.niveauxConfig.lvDefs;
  return Array.isArray(lvDefs) && lvDefs.length > 0 ? lvDefs.length : null;
}

/* Best-effort : pour un type "-niveaux", localise sa chaîne exerciseType dans
   exercise.html et cherche, juste avant, une config de niveaux au format
   _LV_DEFS / _LEVEL_IDS / [n,...].map(...) / levels:[{id..}] inline. */
function detectFromExerciseHtml(type) {
  if (!type) return null;
  const marker = `exerciseType: '${type}'`;
  let idx = exerciseHtml.indexOf(marker);
  if (idx === -1) idx = exerciseHtml.indexOf(`exerciseType:'${type}'`);
  if (idx === -1) idx = exerciseHtml.indexOf(`'${type}'`);
  if (idx === -1) return null;

  const before = exerciseHtml.slice(Math.max(0, idx - 8000), idx);

  const mapMatches = [...before.matchAll(/\[\s*((?:\d+\s*,\s*)*\d+)\s*\]\.map/g)];
  const idsMatches = [...before.matchAll(/const\s+([A-Z_]+_LEVEL_IDS)\s*=\s*\[([^\]]*)\]/g)];
  const defsMatches = [...before.matchAll(/([A-Z_]+_LV_DEFS)\s*=\s*\[/g)];

  const candidates = [];
  if (mapMatches.length) {
    const m = mapMatches[mapMatches.length - 1];
    candidates.push({ pos: m.index, count: m[1].split(',').length, method: '[n,...].map(...) trouvé dans exercise.html' });
  }
  if (idsMatches.length) {
    const m = idsMatches[idsMatches.length - 1];
    const count = m[2].split(',').map(s => s.trim()).filter(Boolean).length;
    candidates.push({ pos: m.index, count, method: m[1] + ' trouvé dans exercise.html' });
  }
  if (defsMatches.length) {
    const m = defsMatches[defsMatches.length - 1];
    const name = m[1];
    const defIdx = exerciseHtml.lastIndexOf(name + ' = [', idx);
    const endIdx = exerciseHtml.indexOf('];', defIdx);
    const block = exerciseHtml.slice(defIdx, endIdx);
    const count = (block.match(/\{\s*lv:/g) || []).length;
    if (count > 0) candidates.push({ pos: m.index, count, method: name + ' trouvé dans exercise.html' });
  }

  const inlineIdx = before.lastIndexOf('levels: [');
  if (inlineIdx !== -1) {
    const endIdx = before.indexOf('],', inlineIdx);
    if (endIdx !== -1) {
      const block = before.slice(inlineIdx, endIdx);
      const count = (block.match(/\{\s*id\s*:/g) || []).length;
      if (count > 0) candidates.push({ pos: inlineIdx, count, method: 'levels:[...] inline trouvé dans exercise.html' });
    }
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.pos - a.pos);
  return candidates[0];
}

function detectRealPaliers(slug, ex) {
  const type = ex.type;
  const exerciseTypesAllUngated = Array.isArray(ex.exerciseTypes) && ex.exerciseTypes.length > 0 &&
    ex.exerciseTypes.every(t => CONFIRMED_UNGATED_TYPES.includes(t));

  if (GUARANTEED_CONSISTENT_TYPES.includes(type)) {
    const declared = Array.isArray(ex.levels) ? ex.levels.length : 0;
    return { detected: declared, method: 'sessionData.levels lu directement à l\'exécution (jamais divergent par construction)' };
  }
  if (CONFIRMED_UNGATED_TYPES.includes(type) || exerciseTypesAllUngated) {
    return {
      detected: 1,
      method: exerciseTypesAllUngated
        ? 'exerciseTypes[] entièrement non paliérés (choix aléatoire de rendu, sans écran de niveau)'
        : 'type confirmé non paliéré (bloc générique bankSource = sessionData.bank, sans écran de niveau)'
    };
  }

  const lvlKeyResult = detectFromLvlKeys(ex);
  if (typeof lvlKeyResult === 'number') {
    return { detected: lvlKeyResult, method: 'clés lvl1..lvlN / level1..levelN dans exercise-data.js' };
  }

  const bankResult = detectFromBank(ex);
  if (bankResult) {
    return { detected: bankResult.count, method: `bank[].${bankResult.field} distincts dans exercise-data.js` };
  }

  const poolsResult = detectFromPoolsObject(ex);
  if (poolsResult) {
    return { detected: poolsResult, method: 'objet pools{} dans exercise-data.js' };
  }

  const niveauxConfigResult = detectFromNiveauxConfig(ex);
  if (niveauxConfigResult) {
    return { detected: niveauxConfigResult, method: 'niveauxConfig.lvDefs dans exercise-data.js' };
  }

  if ((type || '').endsWith('-niveaux')) {
    const htmlResult = detectFromExerciseHtml(type);
    if (htmlResult) return { detected: htmlResult.count, method: htmlResult.method };
    return { detected: null, method: 'aucun signal (type paliéré attendu, non localisé automatiquement — vérification manuelle requise)' };
  }

  return { detected: null, method: 'type non reconnu (ni liste garantie, ni "-niveaux", ni signal de données) — vérification manuelle requise' };
}

const rows = [];
for (const [slug, ex] of Object.entries(EXERCISE_DATA)) {
  const declared = typeof ex.paliers === 'number' ? ex.paliers : null;
  const { detected, method } = detectRealPaliers(slug, ex);
  const missingField = declared === null;
  const divergence = !missingField && detected !== null && detected !== declared;
  rows.push({ slug, type: ex.type || '(non défini)', declared, detected, method, divergence, missingField });
}

rows.sort((a, b) => (b.missingField - a.missingField) || (b.divergence - a.divergence) || a.slug.localeCompare(b.slug));

console.log('| Slug | Type | paliers déclaré | Réel détecté | Statut | Méthode |');
console.log('|---|---|---|---|---|---|');
rows.forEach(r => {
  const declaredStr = r.declared === null ? '∅' : r.declared;
  const detectedStr = r.detected === null ? '?' : r.detected;
  const status = r.missingField ? '**CHAMP MANQUANT**' : r.divergence ? '**DIVERGENT**' : r.detected === null ? '(non vérifiable)' : 'OK';
  console.log(`| ${r.slug} | ${r.type} | ${declaredStr} | ${detectedStr} | ${status} | ${r.method} |`);
});

const missing = rows.filter(r => r.missingField);
const divergent = rows.filter(r => r.divergence);
const undetected = rows.filter(r => r.detected === null && !r.missingField);

console.error('\n--- RÉSUMÉ ---');
console.error(`Total : ${rows.length} | Champ paliers manquant : ${missing.length} | Divergent : ${divergent.length} | Non vérifiable : ${undetected.length}`);

if (missing.length > 0 || divergent.length > 0) {
  process.exitCode = 1;
}

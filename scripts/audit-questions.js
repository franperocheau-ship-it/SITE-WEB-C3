#!/usr/bin/env node
/* ── scripts/audit-questions.js — Audit des banques de questions ────────────
   Lecture seule : charge data/*.js dans un contexte vm isolé (aucune écriture
   sur le filesystem, aucune exécution du moteur d'exercice) puis génère
   audit-questions.md listant, pour chaque compétence, le contenu de chaque
   niveau et une alerte si une banque a moins de MIN_ITEMS items.

   Usage : node scripts/audit-questions.js
   ────────────────────────────────────────────────────────────────────────── */

"use strict";

const vm = require("vm");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const OUTPUT_FILE = path.join(__dirname, "..", "audit-questions.md");

/* Seuils d'alerte par niveau : Niveau 1 sert de première découverte (plus
   de variété nécessaire), Niveaux 2/3(+) sont plus ciblés → seuil plus bas.
   Sous CRITICAL_ITEMS, quel que soit le niveau, la banque est jugée
   critique (badge 🔴) plutôt que simplement faible (badge ⚠️). */
const MIN_ITEMS_LEVEL1 = 12;
const MIN_ITEMS_OTHER = 8;
const CRITICAL_ITEMS = 5;

function minItemsForLevel(level) {
  return level === 1 ? MIN_ITEMS_LEVEL1 : MIN_ITEMS_OTHER;
}

function badgeForCount(level, count) {
  if (count < CRITICAL_ITEMS) return "🔴";
  if (count < minItemsForLevel(level)) return "⚠️";
  return null;
}

/* ── 1. Chargement des fichiers data/*.js dans un contexte vm isolé ────────
   Chaque fichier fait `window.EXERCISE_DATA = window.EXERCISE_DATA || {}` puis
   `Object.assign(window.EXERCISE_DATA, {...})` : on rejoue ce comportement
   dans un sandbox pour obtenir les vrais objets JS sans dupliquer à la main
   la syntaxe de chaque fichier (bien plus fiable qu'un parseur regex face à
   la diversité des structures utilisées).
   ────────────────────────────────────────────────────────────────────────── */
function loadExerciseData() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".js") && f !== "index.js")
    .sort();

  const sandbox = { window: {} };
  vm.createContext(sandbox);

  for (const file of files) {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    vm.runInContext(code, sandbox, { filename: file });
  }

  return sandbox.window.EXERCISE_DATA || {};
}

/* ── 2. Détection des banques par niveau ────────────────────────────────────
   Les fichiers data/*.js utilisent plusieurs conventions de nommage selon le
   type d'exercice : level1Bank/level2Bank/level3Bank, lvl1Bank/lvl2Bank/lvl3Bank,
   lvl1/lvl2/lvl3, level1Words/level2Words/level3Words, step1Pool..step5Pool,
   un tableau "bank" unique avec un champ item.level, ou une paire
   identTexts/writeBank (un tableau par niveau, dans l'ordre de déclaration).
   ────────────────────────────────────────────────────────────────────────── */
const NUMBERED_KEY_RE = /^(?:level|lvl|step)(\d+)(?:Bank|Words|Pool)?$/i;
const UNNUMBERED_BANK_RE = /(bank|identtexts)$/i;

function extractLevelBuckets(ex) {
  // Cas particulier : type "produire-3-formes" (ex. produire-formes-
  // interrogatives) — une seule banque de phrases réutilisée à chaque
  // palier, la progression venant du nombre de formes exigées par le
  // moteur (pas d'un sous-ensemble de contenu par niveau). Signaler "1 seul
  // niveau" serait trompeur ; on l'affiche comme banque unique × N paliers.
  if (ex.type === "produire-3-formes" && Array.isArray(ex.bank) && typeof ex.paliers === "number") {
    return [{
      level: 1,
      label: `Banque unique (${ex.bank.length} items) × ${ex.paliers} paliers de rigueur croissante`,
      items: ex.bank,
      omitCountSuffix: true,
    }];
  }

  // Cas particulier : "pools" est un objet (pas un tableau) dont chaque clé
  // (ex. "CM1"/"CM2"/"6e" ou "1"/"2"/"3") pointe vers un tableau d'items pour
  // ce niveau, dans l'ordre de déclaration des clés.
  if (ex.pools && typeof ex.pools === "object" && !Array.isArray(ex.pools)) {
    return Object.entries(ex.pools).map(([key, items], i) => ({
      level: i + 1,
      label: `Niveau ${i + 1} (pools.${key})`,
      items: Array.isArray(items) ? items : [],
    }));
  }

  const arrayKeys = Object.keys(ex).filter((k) => Array.isArray(ex[k]));

  const numbered = new Map(); // niveau (1-based) -> items[]
  const unnumbered = []; // [{ key, items }] dans l'ordre de déclaration
  let plainBankWithLevelField = null;
  let plainBankLevelKey = null; // "level" ou "difficulty" selon le champ trouvé

  for (const key of arrayKeys) {
    if (key === "levels") continue; // métadonnée (liste de libellés CM1/CM2/6e...), pas une banque

    const numberedMatch = key.match(NUMBERED_KEY_RE);
    if (numberedMatch) {
      const n = parseInt(numberedMatch[1], 10);
      const items = ex[key];
      numbered.set(n, (numbered.get(n) || []).concat(items));
      continue;
    }

    // "level" (banques manuellement regroupées) ou "difficulty" (ex. type
    // accord-ecrit : une banque unique filtrée par palier de difficulté).
    if (key === "bank" && ex[key].length && ex[key][0] && typeof ex[key][0] === "object") {
      if ("level" in ex[key][0]) {
        plainBankWithLevelField = ex[key];
        plainBankLevelKey = "level";
        continue;
      }
      if ("difficulty" in ex[key][0]) {
        plainBankWithLevelField = ex[key];
        plainBankLevelKey = "difficulty";
        continue;
      }
    }

    if (UNNUMBERED_BANK_RE.test(key)) {
      unnumbered.push({ key, items: ex[key] });
    }
  }

  // Cas 1 : banques numérotées (level1Bank, lvl1, step1Pool, ...) → niveaux 1..N dans l'ordre des numéros
  if (numbered.size > 0) {
    const sortedNs = [...numbered.keys()].sort((a, b) => a - b);
    return sortedNs.map((n) => ({ level: n, label: `Niveau ${n}`, items: numbered.get(n) }));
  }

  // Cas 2 : tableau "bank" unique avec un champ item.level → regroupement par
  // valeur de level, dans l'ordre de première apparition
  if (plainBankWithLevelField) {
    const order = [];
    const groups = new Map();
    for (const item of plainBankWithLevelField) {
      const lvl = item[plainBankLevelKey];
      if (!groups.has(lvl)) {
        groups.set(lvl, []);
        order.push(lvl);
      }
      groups.get(lvl).push(item);
    }
    return order.map((lvl, i) => ({
      level: i + 1,
      label: `Niveau ${i + 1} (${plainBankLevelKey}: ${JSON.stringify(lvl)})`,
      items: groups.get(lvl),
    }));
  }

  // Cas 3 : plusieurs tableaux non numérotés (ex. identTexts + writeBank) →
  // niveaux dans l'ordre de déclaration dans le fichier source
  if (unnumbered.length > 0) {
    return unnumbered.map((u, i) => ({ level: i + 1, label: `Niveau ${i + 1} (${u.key})`, items: u.items }));
  }

  return [];
}

/* ── 3. Extraction du texte représentatif d'un item ─────────────────────────
   Priorité aux champs "humains" habituels ; si l'item n'en a aucun (ex.
   structures purement numériques utilisées par des exercices générés), on
   retombe sur une sérialisation des champs de contenu restants pour ne
   jamais produire une ligne vide.
   ────────────────────────────────────────────────────────────────────────── */
const MAIN_TEXT_FIELDS = ["instruction", "phrase", "sentence", "question", "texte", "text", "prompt"];
const APPEND_FIELDS = ["word", "mot", "step1Instruction", "step2Instruction", "step3Instruction"];
const METADATA_BLACKLIST = new Set([
  "level", "mode", "inputMode", "choices", "answer", "answers", "explication",
  "note", "emoji", "auxVerb", "classifyChoices", "step1Targets", "step2Targets",
  "step3Targets", "step2Answer", "step3Answer", "targets", "backLink", "v",
  "pqp", "id",
]);

function describeItem(item) {
  if (typeof item === "string") return item;
  if (!item || typeof item !== "object") return String(item);

  if (Array.isArray(item.tokens)) {
    return item.tokens.map((t) => (t && t.pqp ? `**${t.t}**` : t && t.t != null ? t.t : "")).join("");
  }

  const parts = [];
  for (const field of MAIN_TEXT_FIELDS) {
    if (typeof item[field] === "string" && item[field].trim()) {
      parts.push(item[field].trim());
      break;
    }
  }

  for (const field of APPEND_FIELDS) {
    if (typeof item[field] === "string" && item[field].trim()) {
      const val = item[field].trim();
      if (!parts.some((p) => p.toLowerCase().includes(val.toLowerCase()))) {
        parts.push(val);
      }
    }
  }

  if (parts.length > 0) return parts.join(" — ");

  const numeric = describeNumericComparison(item);
  if (numeric) return numeric;

  // Repli générique : concatène les champs de contenu restants (primitifs,
  // tableaux de primitifs comme "nombres"/"ordre", ou objets imbriqués peu
  // profonds comme {left:{num,den}, right:{num,den}} dans les exercices de
  // fractions/nombres) pour ne jamais laisser une ligne vide.
  return flattenFields(item, "", 0).join(" · ") || "(item sans champ texte identifiable)";
}

const isPrimitive = (v) => typeof v === "string" || typeof v === "number" || typeof v === "boolean";
const isFractionShape = (v) => v && typeof v === "object" && isPrimitive(v.num) && isPrimitive(v.den);

/* ── Rendu lisible des items purement numériques (comparaisons gauche/droite
   de fractions ou de nombres, rangements, fractions isolées) : produit un
   format court type "1/2 vs 2/3" au lieu des clés brutes. Retourne null si
   la structure de l'item ne correspond à aucun format reconnu — dans ce cas
   describeItem() retombe sur le rendu brut existant (flattenFields).
   ────────────────────────────────────────────────────────────────────────── */
function describeNumericComparison(item) {
  // {left:{num,den}, right:{num,den}, answer} — comparaison de fractions
  if (isFractionShape(item.left) && isFractionShape(item.right)) {
    let s = `${item.left.num}/${item.left.den} vs ${item.right.num}/${item.right.den}`;
    if (isPrimitive(item.answer)) s += ` (réponse : ${item.answer})`;
    return s;
  }

  // {left, right, answer} — comparaison de deux nombres/écritures (left/right primitifs)
  if (isPrimitive(item.left) && isPrimitive(item.right)) {
    let s = `${item.left} vs ${item.right}`;
    if (isPrimitive(item.answer)) s += ` (réponse : ${item.answer})`;
    return s;
  }

  // {a, b, signe} — comparaison de deux nombres (variante a/b)
  if (isPrimitive(item.a) && isPrimitive(item.b)) {
    let s = `${item.a} vs ${item.b}`;
    if (isPrimitive(item.signe)) s += ` (réponse : ${item.signe})`;
    if (isPrimitive(item.piege)) s += ` [piège : ${item.piege}]`;
    return s;
  }

  // {nombres:[...], ordre:[...]} ou {numbers:[...], answer:[...]} — rangement
  const list = Array.isArray(item.nombres) ? item.nombres : Array.isArray(item.numbers) ? item.numbers : null;
  const ordered = Array.isArray(item.ordre) ? item.ordre : Array.isArray(item.answer) ? item.answer : null;
  if (list && list.every(isPrimitive)) {
    let s = `Ranger : ${list.join(" ; ")}`;
    if (ordered && ordered.every(isPrimitive)) s += ` → ordre attendu : ${ordered.join(" ; ")}`;
    return s;
  }

  // {num, den, decimal?} — fraction isolée (pas de comparaison gauche/droite)
  if (isFractionShape(item)) {
    let s = `${item.num}/${item.den}`;
    if (isPrimitive(item.decimal)) s += ` = ${item.decimal}`;
    else if (isPrimitive(item.decimalStr)) s += ` = ${item.decimalStr}`;
    return s;
  }

  return null;
}

function flattenFields(obj, prefix, depth) {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (!prefix && METADATA_BLACKLIST.has(k)) continue;
    const label = prefix ? `${prefix}.${k}` : k;
    if (isPrimitive(v)) {
      out.push(`${label}: ${v}`);
    } else if (Array.isArray(v) && v.every(isPrimitive)) {
      out.push(`${label}: ${v.join(", ")}`);
    } else if (v && typeof v === "object" && !Array.isArray(v) && depth < 2) {
      out.push(...flattenFields(v, label, depth + 1));
    }
  }
  return out;
}

/* ── 4. Génération du rapport Markdown ──────────────────────────────────── */
function buildReport(data) {
  const body = [];

  // Une entrée par exercice, avec ses niveaux déjà extraits et son total —
  // trié par nombre d'items croissant, toutes compétences confondues, pour
  // faire remonter les banques les plus fragiles en tête de rapport.
  const entries = Object.keys(data).map((id) => {
    const ex = data[id];
    const buckets = extractLevelBuckets(ex);
    const totalItems = buckets.reduce((sum, b) => sum + b.items.length, 0);
    return { id, ex, buckets, totalItems };
  });

  entries.sort((x, y) => {
    if (x.totalItems !== y.totalItems) return x.totalItems - y.totalItems;
    return (x.ex.competence || "").localeCompare(y.ex.competence || "", "fr");
  });

  let warningCount = 0;
  let criticalCount = 0;
  let grandTotalItems = 0;

  for (const { id, ex, buckets, totalItems } of entries) {
    grandTotalItems += totalItems;

    body.push(`## ${ex.competence}`);
    body.push("");
    body.push(`_Domaine : ${ex.domaine} · Exercice : \`${id}\` — ${ex.title || "(sans titre)"} · **${totalItems} items au total**_`);
    body.push("");

    if (buckets.length === 0) {
      body.push("⚠️ Aucune banque de questions détectée pour cet exercice (structure non reconnue par l'audit).");
      body.push("");
      continue;
    }

    body.push(`**Total par niveau :** ${buckets.map((b) => b.omitCountSuffix ? b.label : `${b.label} = ${b.items.length}`).join(" · ")}`);
    body.push("");

    for (const bucket of buckets) {
      const badge = badgeForCount(bucket.level, bucket.items.length);
      const countSuffix = bucket.omitCountSuffix ? "" : ` (${bucket.items.length} items)`;
      body.push(`### ${badge ? badge + " " : ""}${bucket.label}${countSuffix}`);
      if (badge === "🔴") {
        criticalCount++;
        body.push("");
        body.push(`> 🔴 **Banque critique** : ${bucket.items.length} item(s) < ${CRITICAL_ITEMS} — répétition quasi certaine, quel que soit le niveau.`);
      } else if (badge === "⚠️") {
        warningCount++;
        body.push("");
        body.push(`> ⚠️ **Banque faible** : ${bucket.items.length} item(s) < ${minItemsForLevel(bucket.level)} (seuil Niveau ${bucket.level === 1 ? "1" : "2/3+"}) — risque de répétition perçue par l'élève.`);
      }
      body.push("");
      bucket.items.forEach((item, i) => {
        body.push(`${i + 1}. ${describeItem(item)}`);
      });
      body.push("");
    }
  }

  const header = [
    "# Audit des banques de questions",
    "",
    `Généré le ${new Date().toISOString().slice(0, 10)} par \`scripts/audit-questions.js\`.`,
    `Tri : par nombre total d'items croissant (toutes compétences confondues) — les banques les plus fragiles en premier.`,
    `Seuils d'alerte : Niveau 1 < ${MIN_ITEMS_LEVEL1} items → ⚠️ · Niveaux 2/3+ < ${MIN_ITEMS_OTHER} items → ⚠️ · tout niveau < ${CRITICAL_ITEMS} items → 🔴.`,
    "",
    `**Résumé global :** ${entries.length} exercices audités · ${grandTotalItems} items au total · ${warningCount} niveau(x) ⚠️ · ${criticalCount} niveau(x) 🔴.`,
    "",
  ];

  return header.concat(body).join("\n");
}

/* ── main ────────────────────────────────────────────────────────────────── */
function main() {
  const data = loadExerciseData();
  const exerciseCount = Object.keys(data).length;
  if (exerciseCount === 0) {
    console.error("Aucune compétence trouvée dans data/*.js — abandon.");
    process.exit(1);
  }

  const report = buildReport(data);
  fs.writeFileSync(OUTPUT_FILE, report, "utf8");

  console.log(`Rapport généré : ${path.relative(process.cwd(), OUTPUT_FILE)}`);
  console.log(`${exerciseCount} exercices audités.`);
}

main();

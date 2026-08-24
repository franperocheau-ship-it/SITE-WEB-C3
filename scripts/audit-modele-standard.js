#!/usr/bin/env node
/* ── scripts/audit-modele-standard.js — Audit de conformité au modèle standard
   3×10 ───────────────────────────────────────────────────────────────────
   Lecture seule : charge chaque fichier data/*.js dans un contexte vm isolé
   (aucune écriture sur les fichiers audités) puis vérifie, pour chaque
   compétence :
     - STRUCTURE : exactement 3 niveaux via le moteur standard
       level1Bank/level2Bank/level3Bank (consommé par exercise.html) ?
     - COMPTE : chaque niveau existant contient-il exactement 10 items ?

   Contrairement à scripts/audit-questions.js (qui tolère toutes les
   conventions de nommage rencontrées dans le code pour lister le contenu),
   ce script est volontairement strict : seule la convention
   level1Bank/level2Bank/level3Bank est considérée "standard". Toute autre
   convention (lvl1Bank, pools, step-Pool, bank+level/difficulty, banque
   unique × paliers, etc.) est un écart structurel, même si elle est bien
   formée et fonctionne correctement dans le moteur dédié qui la consomme.

   Usage : node scripts/audit-modele-standard.js
   ────────────────────────────────────────────────────────────────────────── */

"use strict";

const vm = require("vm");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const OUTPUT_FILE = path.join(__dirname, "audit-modele-standard.md");
const EXPECTED_ITEMS = 10;

/* ── 1. Chargement de chaque fichier data/*.js dans un contexte vm ISOLÉ par
   fichier (et non cumulatif) afin de savoir, pour chaque compétence, de
   quel fichier source elle provient — Object.assign(window.EXERCISE_DATA, …)
   fusionnerait tout dans un seul objet et ferait perdre cette info. ──────── */
function loadPerFile() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".js") && f !== "index.js")
    .sort();

  const entries = []; // [{ id, ex, file }]

  for (const file of files) {
    const code = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { filename: file });
    const data = sandbox.window.EXERCISE_DATA || {};
    for (const id of Object.keys(data)) {
      entries.push({ id, ex: data[id], file: `data/${file}` });
    }
  }

  return entries;
}

/* ── 2. Détection stricte de la structure ───────────────────────────────── */
const STANDARD_RE = /^level([0-9]+)Bank$/;
const LVL_ALT_RE = /^lvl([0-9]+)Bank$/;
const LVL_BARE_RE = /^lvl([0-9]+)$/;
const LEVEL_WORDS_RE = /^level([0-9]+)Words$/;
const STEP_POOL_RE = /^step([0-9]+)Pool$/;
const UNNUMBERED_BANK_RE = /(bank|identtexts)$/i;

// Décrit une convention alternative (moteur dédié) rencontrée à la place de
// level1Bank/level2Bank/level3Bank. Retourne null si rien de reconnu (dans
// ce cas : "aucune banque détectée").
function describeAlternateEngine(ex, arrayKeys) {
  // Cas "produire-3-formes" : une seule banque de phrases réutilisée à
  // chaque palier de rigueur croissante (pas de sous-ensemble par niveau).
  if (ex.type === "produire-3-formes" && Array.isArray(ex.bank) && typeof ex.paliers === "number") {
    return `Banque unique (${ex.bank.length} items) réutilisée × ${ex.paliers} paliers (type "produire-3-formes") — aucun level1Bank/level2Bank/level3Bank.`;
  }

  // Cas "pools" : objet (pas un tableau) dont chaque clé (CM1/CM2/6e, ou
  // niveau1/2/3…) pointe vers un tableau d'items, consommé par pioche
  // aléatoire (questionsPerSession) plutôt que par 3 banques fixes.
  if (ex.pools && typeof ex.pools === "object" && !Array.isArray(ex.pools)) {
    const keys = Object.keys(ex.pools);
    const counts = keys.map((k) => `${k}: ${Array.isArray(ex.pools[k]) ? ex.pools[k].length : "?"}`);
    return `Moteur "pools" (objet, clés : ${keys.join(", ")}) au lieu de level1Bank/level2Bank/level3Bank — ${counts.join(" · ")}.`;
  }

  const lvlAlt = arrayKeys.filter((k) => LVL_ALT_RE.test(k));
  if (lvlAlt.length > 0) {
    return `Moteur "lvlNBank" (${lvlAlt.sort().join(", ")}) au lieu de level1Bank/level2Bank/level3Bank.`;
  }

  const lvlBare = arrayKeys.filter((k) => LVL_BARE_RE.test(k));
  if (lvlBare.length > 0) {
    const nums = lvlBare.map((k) => parseInt(k.match(LVL_BARE_RE)[1], 10)).sort((a, b) => a - b);
    const counts = lvlBare
      .sort((a, b) => parseInt(a.match(LVL_BARE_RE)[1], 10) - parseInt(b.match(LVL_BARE_RE)[1], 10))
      .map((k) => `${k}: ${ex[k].length}`);
    return `Moteur "lvlN" (${nums.length} niveau(x) : ${lvlBare.sort().join(", ")}) au lieu de level1Bank/level2Bank/level3Bank — ${counts.join(" · ")}.`;
  }

  const levelWords = arrayKeys.filter((k) => LEVEL_WORDS_RE.test(k));
  if (levelWords.length > 0) {
    return `Moteur "levelNWords" (${levelWords.sort().join(", ")}) au lieu de level1Bank/level2Bank/level3Bank.`;
  }

  const stepPools = arrayKeys.filter((k) => STEP_POOL_RE.test(k));
  if (stepPools.length > 0) {
    return `Moteur "stepNPool" (${stepPools.sort().join(", ")}) — ${stepPools.length} paliers au lieu de 3 niveaux level1Bank/level2Bank/level3Bank.`;
  }

  // Banque "bank" unique avec un champ item.level ou item.difficulty.
  if (Array.isArray(ex.bank) && ex.bank.length && ex.bank[0] && typeof ex.bank[0] === "object") {
    const keyField = "level" in ex.bank[0] ? "level" : "difficulty" in ex.bank[0] ? "difficulty" : null;
    if (keyField) {
      const groups = new Map();
      for (const item of ex.bank) {
        const v = item[keyField];
        groups.set(v, (groups.get(v) || 0) + 1);
      }
      const detail = [...groups.entries()].map(([v, n]) => `${keyField}=${JSON.stringify(v)}: ${n}`).join(" · ");
      return `Banque unique "bank" filtrée par champ "${keyField}" (${groups.size} valeur(s) distinctes) au lieu de level1Bank/level2Bank/level3Bank — ${detail}.`;
    }
  }

  // Plusieurs tableaux non numérotés se terminant par "Bank"/"identTexts"
  // (ex. identTexts + writeBank), utilisés comme niveaux successifs.
  const unnumbered = arrayKeys.filter((k) => UNNUMBERED_BANK_RE.test(k) && k !== "bank");
  if (unnumbered.length > 0) {
    return `Tableaux non numérotés (${unnumbered.sort().join(", ")}) au lieu de level1Bank/level2Bank/level3Bank.`;
  }

  return null;
}

function analyze(ex) {
  const arrayKeys = Object.keys(ex).filter((k) => Array.isArray(ex[k]));
  const standardKeys = arrayKeys.filter((k) => STANDARD_RE.test(k));
  const standardNums = standardKeys
    .map((k) => parseInt(k.match(STANDARD_RE)[1], 10))
    .sort((a, b) => a - b);

  if (standardNums.length > 0) {
    const isExactly123 = standardNums.length === 3 && standardNums.join(",") === "1,2,3";
    if (isExactly123) {
      const banks = [1, 2, 3].map((n) => ({ level: n, items: ex[`level${n}Bank`] }));
      return { kind: "standard", banks };
    }
    return {
      kind: "structure",
      severity: 1,
      detail: `${standardNums.length} niveau(x) détecté(s) via level*Bank (${standardKeys.sort().join(", ")}) au lieu de 3 (level1Bank/level2Bank/level3Bank).`,
    };
  }

  const altDescription = describeAlternateEngine(ex, arrayKeys);
  if (altDescription) {
    return { kind: "structure", severity: 2, detail: altDescription };
  }

  return {
    kind: "structure",
    severity: 3,
    detail: "Aucune banque level*Bank ni convention alternative reconnue — structure non standard ou moteur externe (hors EXERCISE_DATA).",
  };
}

/* ── 3. Construction des entrées de rapport ─────────────────────────────── */
function buildRows(entries) {
  const rows = [];

  for (const { id, ex, file } of entries) {
    const titre = ex.title || ex.competence || id;
    const result = analyze(ex);

    if (result.kind === "structure") {
      rows.push({
        id,
        titre,
        file,
        status: "STRUCTURE ANORMALE",
        severity: result.severity,
        detail: [result.detail],
        sortKey: 0,
      });
      continue;
    }

    const bankInfo = result.banks.map((b) => ({
      level: b.level,
      count: b.items.length,
      delta: b.items.length - EXPECTED_ITEMS,
    }));

    const manque = bankInfo.filter((b) => b.delta < 0);
    const surplus = bankInfo.filter((b) => b.delta > 0);

    let status;
    let detail = [];
    let sortKey = 0;

    if (manque.length > 0) {
      status = "MANQUE";
      sortKey = manque.reduce((s, b) => s + -b.delta, 0);
      detail = bankInfo
        .filter((b) => b.delta !== 0)
        .map((b) =>
          b.delta < 0
            ? `Niveau ${b.level} : ${b.count}/${EXPECTED_ITEMS} items (manque ${-b.delta})`
            : `Niveau ${b.level} : ${b.count}/${EXPECTED_ITEMS} items (${b.delta} en surplus)`
        );
    } else if (surplus.length > 0) {
      status = "SURPLUS";
      sortKey = surplus.reduce((s, b) => s + b.delta, 0);
      detail = surplus.map((b) => `Niveau ${b.level} : ${b.count}/${EXPECTED_ITEMS} items (${b.delta} en surplus)`);
    } else {
      status = "OK";
      detail = [];
    }

    rows.push({ id, titre, file, status, detail, sortKey });
  }

  return rows;
}

/* ── 4. Génération du rapport Markdown ──────────────────────────────────── */
function buildReport(rows) {
  const structureRows = rows
    .filter((r) => r.status === "STRUCTURE ANORMALE")
    .sort((a, b) => b.severity - a.severity || a.id.localeCompare(b.id, "fr"));
  const manqueRows = rows
    .filter((r) => r.status === "MANQUE")
    .sort((a, b) => b.sortKey - a.sortKey || a.id.localeCompare(b.id, "fr"));
  const surplusRows = rows
    .filter((r) => r.status === "SURPLUS")
    .sort((a, b) => b.sortKey - a.sortKey || a.id.localeCompare(b.id, "fr"));
  const okRows = rows.filter((r) => r.status === "OK").sort((a, b) => a.id.localeCompare(b.id, "fr"));

  const body = [];

  for (const r of [...structureRows, ...manqueRows, ...surplusRows]) {
    body.push(`## ${r.id} — ${r.titre}`);
    body.push("");
    body.push(`Fichier : ${r.file}`);
    body.push(`Statut : ${r.status}`);
    body.push(`Détail : ${r.detail.join(" ; ")}`);
    body.push("");
  }

  if (okRows.length > 0) {
    body.push("## Compétences OK (10/10/10 sur le moteur standard)");
    body.push("");
    for (const r of okRows) {
      body.push(`- ${r.id} — ${r.titre} (${r.file})`);
    }
    body.push("");
  }

  const header = [
    "# Audit de conformité au modèle standard (3 niveaux × 10 items)",
    "",
    `Généré par \`scripts/audit-modele-standard.js\`.`,
    "",
    `Norme auditée : chaque compétence doit utiliser exactement le moteur standard \`level1Bank\`/\`level2Bank\`/\`level3Bank\` (consommé par exercise.html), avec exactement ${EXPECTED_ITEMS} items par niveau.`,
    "",
    "## Résumé",
    "",
    `- Compétences auditées : ${rows.length}`,
    `- STRUCTURE ANORMALE (moteur/rendu dédié ou nombre de niveaux ≠ 3) : ${structureRows.length}`,
    `- Au moins un niveau en MANQUE (< ${EXPECTED_ITEMS} items) : ${manqueRows.length}`,
    `- Au moins un niveau en SURPLUS (> ${EXPECTED_ITEMS} items) : ${surplusRows.length}`,
    `- Entièrement OK (3 × ${EXPECTED_ITEMS} items, moteur standard) : ${okRows.length}`,
    "",
    "---",
    "",
  ];

  return header.concat(body).join("\n");
}

/* ── main ────────────────────────────────────────────────────────────────── */
function main() {
  const entries = loadPerFile();
  if (entries.length === 0) {
    console.error("Aucune compétence trouvée dans data/*.js — abandon.");
    process.exit(1);
  }

  const rows = buildRows(entries);
  const report = buildReport(rows);
  fs.writeFileSync(OUTPUT_FILE, report, "utf8");

  console.log(path.relative(process.cwd(), OUTPUT_FILE));
}

main();

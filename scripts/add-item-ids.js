#!/usr/bin/env node
/*
 * Script one-shot : ajoute un `id` stable à chaque item de level1Bank /
 * level2Bank / level3Bank qui n'en a pas encore.
 *
 * Format : <slug-compétence>-n<niveau>-<numéro à 2 chiffres>
 * (numéro = position de l'item dans son tableau, avant tri éventuel).
 *
 * - N'écrase jamais un id déjà présent.
 * - N'écrit que si des ids ont réellement été ajoutés.
 * - Insertion par offset (acorn AST, pas de re-sérialisation) pour ne
 *   toucher que le strict nécessaire et préserver formatage/commentaires.
 *
 * Usage : node scripts/add-item-ids.js
 */

const fs = require("fs");
const path = require("path");
const acorn = require("acorn");

const DATA_DIR = path.join(__dirname, "..", "data");
const BANK_KEYS = ["level1Bank", "level2Bank", "level3Bank"];

function findExerciseDataObject(ast) {
  // Cherche Object.assign(window.EXERCISE_DATA, { ... }) au niveau du Program.
  for (const stmt of ast.body) {
    if (stmt.type !== "ExpressionStatement") continue;
    const expr = stmt.expression;
    if (expr.type !== "CallExpression") continue;
    const callee = expr.callee;
    if (
      callee.type === "MemberExpression" &&
      callee.object.type === "Identifier" &&
      callee.object.name === "Object" &&
      callee.property.type === "Identifier" &&
      callee.property.name === "assign"
    ) {
      const [firstArg, secondArg] = expr.arguments;
      if (
        firstArg &&
        firstArg.type === "MemberExpression" &&
        secondArg &&
        secondArg.type === "ObjectExpression"
      ) {
        return secondArg;
      }
    }
  }
  return null;
}

function propKeyName(prop) {
  if (prop.key.type === "Identifier") return prop.key.name;
  if (prop.key.type === "Literal") return String(prop.key.value);
  return null;
}

function hasIdProp(objExpr) {
  return objExpr.properties.some(
    (p) => p.type === "Property" && propKeyName(p) === "id"
  );
}

function processFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  let ast;
  try {
    ast = acorn.parse(src, { ecmaVersion: "latest", sourceType: "script" });
  } catch (err) {
    console.error(`  [SKIP] ${filePath} — parse error: ${err.message}`);
    return { file: filePath, added: 0, skipped: true };
  }

  const exerciseDataObj = findExerciseDataObject(ast);
  if (!exerciseDataObj) {
    return { file: filePath, added: 0, skipped: false, noMatch: true };
  }

  // Insertions : { offset, text }, appliquées de la fin vers le début
  // pour ne pas invalider les offsets précédents.
  const insertions = [];
  let added = 0;
  let warnings = 0;

  for (const competenceProp of exerciseDataObj.properties) {
    if (competenceProp.type !== "Property") continue;
    const slug = propKeyName(competenceProp);
    const competenceValue = competenceProp.value;
    if (!slug || competenceValue.type !== "ObjectExpression") continue;

    for (const bankProp of competenceValue.properties) {
      if (bankProp.type !== "Property") continue;
      const bankName = propKeyName(bankProp);
      if (!BANK_KEYS.includes(bankName)) continue;
      const levelNum = bankName.match(/^level(\d)Bank$/)[1];

      const bankArray = bankProp.value;
      if (bankArray.type !== "ArrayExpression") {
        console.warn(`  [WARN] ${filePath}: ${slug}.${bankName} n'est pas un tableau littéral, ignoré.`);
        warnings++;
        continue;
      }

      bankArray.elements.forEach((item, idx) => {
        if (!item || item.type !== "ObjectExpression") {
          console.warn(`  [WARN] ${filePath}: ${slug}.${bankName}[${idx}] n'est pas un objet littéral, ignoré.`);
          warnings++;
          return;
        }
        if (hasIdProp(item)) return; // ne jamais écraser un id existant

        const num = String(idx + 1).padStart(2, "0");
        const id = `${slug}-n${levelNum}-${num}`;
        insertions.push({ offset: item.start + 1, text: ` id:"${id}",` });
        added++;
      });
    }
  }

  if (added === 0) {
    return { file: filePath, added: 0, skipped: false, warnings };
  }

  insertions.sort((a, b) => b.offset - a.offset);
  let out = src;
  for (const { offset, text } of insertions) {
    out = out.slice(0, offset) + text + out.slice(offset);
  }

  fs.writeFileSync(filePath, out, "utf8");
  return { file: filePath, added, skipped: false, warnings };
}

function main() {
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(DATA_DIR, f))
    .filter((f) => {
      const content = fs.readFileSync(f, "utf8");
      return BANK_KEYS.some((k) => content.includes(k));
    });

  console.log(`Fichiers candidats (contiennent level1Bank/level2Bank/level3Bank) : ${files.length}`);

  const results = [];
  for (const file of files) {
    const res = processFile(file);
    results.push(res);
    const rel = path.relative(process.cwd(), file);
    if (res.skipped) {
      // déjà loggé
    } else if (res.noMatch) {
      console.log(`  ${rel} : pas de Object.assign(window.EXERCISE_DATA, {...}) trouvé — ignoré.`);
    } else {
      console.log(`  ${rel} : ${res.added} id(s) ajouté(s)${res.warnings ? ` (${res.warnings} avertissement(s))` : ""}`);
    }
  }

  const total = results.reduce((sum, r) => sum + (r.added || 0), 0);
  console.log(`\nTotal : ${total} id(s) ajouté(s) sur ${results.filter((r) => r.added > 0).length} fichier(s).`);
}

main();

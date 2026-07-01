// 仕様書とテストの連動チェッカー。
// specs/*.spec.md の SPEC-ID と test/**/*.spec.js・test/**/*.test.js 内の [SPEC-ID] を
// 双方向で突き合わせ、次を検出して失敗させる:
//   - 仕様にあるがテストが無い（カバレッジ漏れ）
//   - テストにあるが仕様に無い（仕様化漏れ）
// これにより「実装追加時に過去挙動のテストが失われていない」ことを機械的に担保する。
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SPEC_ID = /SPEC-[A-Z0-9]+-\d{3}/g;

function walk(dir, filter, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, filter, acc);
    else if (filter(p)) acc.push(p);
  }
  return acc;
}

function idsFrom(files) {
  const map = new Map(); // id -> [file, ...]
  for (const f of files) {
    const rel = f.slice(ROOT.length).replace(/\\/g, "/");
    for (const id of new Set(readFileSync(f, "utf-8").match(SPEC_ID) || [])) {
      if (!map.has(id)) map.set(id, []);
      map.get(id).push(rel);
    }
  }
  return map;
}

const specFiles = walk(join(ROOT, "specs"), p => p.endsWith(".spec.md"));
const testFiles = walk(join(ROOT, "test"), p => p.endsWith(".spec.js") || p.endsWith(".test.js"));

const specIds = idsFrom(specFiles);
const testIds = idsFrom(testFiles);

const missingTest = [...specIds.keys()].filter(id => !testIds.has(id)); // 仕様のみ
const missingSpec = [...testIds.keys()].filter(id => !specIds.has(id)); // テストのみ

let ok = true;

if (missingTest.length) {
  ok = false;
  console.error("\n✖ 仕様にあるがテストが無い SPEC-ID（カバレッジ漏れ）:");
  for (const id of missingTest.sort()) console.error(`   - ${id}  (${specIds.get(id).join(", ")})`);
}

if (missingSpec.length) {
  ok = false;
  console.error("\n✖ テストにあるが仕様に無い SPEC-ID（仕様化漏れ）:");
  for (const id of missingSpec.sort()) console.error(`   - ${id}  (${testIds.get(id).join(", ")})`);
}

// 同一 SPEC-ID が複数テストに散っていないか（重複は追跡を難しくする）
for (const [id, files] of testIds) {
  if (files.length > 1) {
    ok = false;
    console.error(`\n✖ SPEC-ID ${id} が複数テストファイルに存在: ${files.join(", ")}`);
  }
}

if (ok) {
  console.log(`[spec-trace] OK — 仕様 ${specIds.size} 件とテストが1:1で連動しています。`);
  process.exit(0);
} else {
  console.error("\n[spec-trace] NG — specs/ とテストの SPEC-ID を一致させてください。");
  process.exit(1);
}

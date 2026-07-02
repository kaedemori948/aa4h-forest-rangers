import { test } from "node:test";
import assert from "node:assert/strict";

// Step 2 で transformData 等の純粋関数ユニットテストに差し替える。
// それまでチェーン（npm test）を緑に保つためのプレースホルダ。
test("[PLACEHOLDER] unit harness works", () => {
  assert.equal(1 + 1, 2);
});

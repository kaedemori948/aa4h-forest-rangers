import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// Step 0 の基盤検証用スモークテスト。フィクスチャ差し替え→レンダリングまでの
// 配線が通っていることだけを確認する（画面仕様は Step 2 以降で SPEC-ID 付きで拡充）。
test("[SMOKE] ホームがフィクスチャの件数で描画される", async ({ page }) => {
  await useFixture(page);
  await page.goto("/index.html");

  // フィクスチャは5件。meta.total が反映されること。
  await expect(page.locator('[data-stat="total"]').first()).toHaveText("5");

  // ピック（上位4件）カードが描画されること。
  await expect(page.locator("#picks .card")).toHaveCount(4);
});

import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// 一覧画面の仕様は specs/list.spec.md（SPEC-LIST-*）と1:1で対応する。
const ids = loc => loc.evaluateAll(els => els.map(e => e.dataset.id));

test.beforeEach(async ({ page }) => {
  await useFixture(page);
});

test("[SPEC-LIST-001] 初期表示で全件を閲覧数降順で並べ、件数を表示する", async ({ page }) => {
  await page.goto("/pages/agents.html");
  const cards = page.locator("#grid .card");
  await expect(cards).toHaveCount(5);
  await expect(page.locator("#result-count")).toHaveText("5");
  expect(await ids(cards)).toEqual(["102", "104", "101", "103", "105"]);
});

test("[SPEC-LIST-002] キーワード検索でタイトル・オーナー・概要・タグ・機能・カテゴリに部分一致で絞り込む", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator("#q").fill("議事録");
  await expect(page.locator("#result-count")).toHaveText("1");
  expect(await ids(page.locator("#grid .card"))).toEqual(["104"]);
});

test("[SPEC-LIST-003] 並び替えでDL実績の降順に並べ替える", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator("#sort").selectOption("downloads");
  expect(await ids(page.locator("#grid .card"))).toEqual(["101", "102", "104", "103", "105"]);
});

test("[SPEC-LIST-004] カテゴリチップで絞り込む", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator('#chips .chip[data-cat="開発支援"]').click();
  await expect(page.locator("#result-count")).toHaveText("2");
  expect(await ids(page.locator("#grid .card"))).toEqual(["102", "105"]);
});

test("[SPEC-LIST-005] 該当が無いとき空状態を表示する", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator("#q").fill("該当なしxyz");
  await expect(page.locator("#result-count")).toHaveText("0");
  await expect(page.locator("#grid .card")).toHaveCount(0);
  await expect(page.locator("#empty")).toBeVisible();
});

test("[SPEC-LIST-006] URLの ?cat= で初期カテゴリを絞り込む", async ({ page }) => {
  await page.goto("/pages/agents.html?cat=" + encodeURIComponent("データ分析"));
  await expect(page.locator("#result-count")).toHaveText("1");
  expect(await ids(page.locator("#grid .card"))).toEqual(["103"]);
});

test("[SPEC-LIST-007] タグ経由でも検索にヒットする", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator("#q").fill("生成AI");
  await expect(page.locator("#result-count")).toHaveText("2");
  // タグ一致同点のため選択中の並び順（閲覧数降順）で決まる
  expect(await ids(page.locator("#grid .card"))).toEqual(["101", "103"]);
});

test("[SPEC-LIST-008] 複数キーワードは全語一致を先頭に、部分一致も関連度順で表示する", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator("#q").fill("コード テスト");
  await expect(page.locator("#result-count")).toHaveText("2");
  // 105は両トークン一致、102は「コード」のみ一致。旧仕様のANDでは0件+1件になっていたケース
  expect(await ids(page.locator("#grid .card"))).toEqual(["105", "102"]);
});

test("[SPEC-LIST-009] 同義語展開により表記ゆれでも検索にヒットする", async ({ page }) => {
  await page.goto("/pages/agents.html");
  await page.locator("#q").fill("文書");
  await expect(page.locator("#result-count")).toHaveText("2");
  // 「文書」→「ドキュメント/資料」展開。101はタイトル+タグ一致で104より関連度が高い
  expect(await ids(page.locator("#grid .card"))).toEqual(["101", "104"]);
});

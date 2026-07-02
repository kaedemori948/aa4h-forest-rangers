import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// ホーム画面の仕様は specs/home.spec.md（SPEC-HOME-*）と1:1で対応する。
// 期待値の根拠はフィクスチャ test/fixtures/assets.fixture.js。
test.beforeEach(async ({ page }) => {
  await useFixture(page);
  await page.goto("/index.html");
});

test("[SPEC-HOME-001] 統計バーに件数・閲覧数・カテゴリ数を表示する", async ({ page }) => {
  await expect(page.locator('[data-stat="total"]').first()).toHaveText("5");
  await expect(page.locator('[data-stat="views"]').first()).toHaveText("2,450");
  await expect(page.locator('[data-stat="cats"]').first()).toHaveText("3");
});

test("[SPEC-HOME-002] プロデューサーズピックは閲覧数上位4件を表示する", async ({ page }) => {
  const cards = page.locator("#picks .card");
  await expect(cards).toHaveCount(4);
  // 集合は閲覧数上位4件（105を除外）。表示順はデータ順（filterが元順序を保持）。
  const ids = await cards.evaluateAll(els => els.map(e => e.dataset.id));
  expect(ids).toEqual(["101", "102", "103", "104"]);
});

test("[SPEC-HOME-003] カテゴリ索引に全カテゴリを初出順・件数付きで表示する", async ({ page }) => {
  const rows = page.locator("#cat-index .cat-row");
  await expect(rows).toHaveCount(3);
  await expect(rows.locator(".cat-name")).toHaveText(["資料作成", "開発支援", "データ分析"]);
  await expect(rows.locator(".cat-count")).toHaveText(["2 assets", "2 assets", "1 assets"]);
  await expect(rows.first()).toHaveAttribute("href", /\?cat=/);
});

test("[SPEC-HOME-004] 人気ランキングは閲覧数降順で最大8件を表示する", async ({ page }) => {
  const rows = page.locator("#ranking .rank-row");
  await expect(rows).toHaveCount(5);
  await expect(rows.first().locator(".rank-title")).toHaveText("コードレビューボット");
  await expect(rows.first().locator(".rank-stats .rs b").first()).toHaveText("800");
  const ids = await rows.evaluateAll(els => els.map(e => e.dataset.id));
  expect(ids).toEqual(["102", "104", "101", "103", "105"]);
});

test("[SPEC-HOME-005] 新着は更新日降順で最大8件を表示する", async ({ page }) => {
  const cards = page.locator("#newest .card");
  await expect(cards).toHaveCount(5);
  const ids = await cards.evaluateAll(els => els.map(e => e.dataset.id));
  expect(ids).toEqual(["104", "102", "101", "103", "105"]);
});

test("[SPEC-HOME-006] カード／ランキング行クリックで詳細ページへ遷移する", async ({ page }) => {
  await page.locator("#ranking .rank-row").first().click();
  await expect(page).toHaveURL(/agent\.html\?id=102/);
});

test("[SPEC-HOME-007] 人気ランキングは順位が上から下へ縦に並ぶ2カラムで表示する", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const list = page.locator("#ranking");
  const style = await list.evaluate(el => {
    const cs = getComputedStyle(el);
    return { flow: cs.gridAutoFlow, cols: cs.gridTemplateColumns.trim().split(/\s+/).length };
  });
  expect(style.flow).toBe("column");
  expect(style.cols).toBe(2);

  // 列優先配置の検証: 1列目内は上位ほど上に来る（縦積み）こと。
  const boxes = await page.locator("#ranking .rank-row").evaluateAll(
    els => els.map(e => ({ id: e.dataset.id, x: e.getBoundingClientRect().x, y: e.getBoundingClientRect().y }))
  );
  const col1 = boxes.filter(b => b.x === boxes[0].x).sort((a, b) => a.y - b.y);
  expect(col1.length).toBeGreaterThan(1);
  expect(col1.map(b => b.id)).toEqual(["102", "104", "101", "103"]);
});

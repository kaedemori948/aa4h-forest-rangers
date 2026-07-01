import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// 詳細画面の仕様は specs/detail.spec.md（SPEC-DETAIL-*）と1:1で対応する。
test.beforeEach(async ({ page }) => {
  await useFixture(page);
});

test("[SPEC-DETAIL-001] 指定IDのアセット詳細（タイトル・統計・オーナー）を表示する", async ({ page }) => {
  await page.goto("/pages/agent.html?id=102");
  await expect(page.locator("#detail .dtl-title")).toHaveText("コードレビューボット");
  await expect(page.locator("#detail .dtl-stats")).toContainText("800");
  await expect(page.locator("#detail .dtl-meta")).toContainText("佐藤 花子");
});

test("[SPEC-DETAIL-002] カテゴリリンクは一覧へ ?cat= 付きで遷移する", async ({ page }) => {
  await page.goto("/pages/agent.html?id=102");
  await expect(page.locator("#detail .dtl-cat-link")).toHaveAttribute("href", /agents\.html\?cat=/);
});

test("[SPEC-DETAIL-003] ピック対象にはピックバッジを表示し、非対象には表示しない", async ({ page }) => {
  await page.goto("/pages/agent.html?id=102");
  await expect(page.locator("#detail .dtl-pick")).toHaveCount(1);

  await page.goto("/pages/agent.html?id=105");
  await expect(page.locator("#detail .dtl-pick")).toHaveCount(0);
});

test("[SPEC-DETAIL-004] 存在しないIDでは not found メッセージを表示する", async ({ page }) => {
  await page.goto("/pages/agent.html?id=9999");
  await expect(page.locator("#detail")).toContainText("アセットが見つかりませんでした。");
  await expect(page.locator("#detail .dtl-title")).toHaveCount(0);
});

test("[SPEC-DETAIL-005] ドキュメントタイトルがアセット名になる", async ({ page }) => {
  await page.goto("/pages/agent.html?id=102");
  await expect(page).toHaveTitle(/^コードレビューボット/);
});

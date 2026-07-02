import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// 多言語切り替えの仕様は specs/i18n.spec.md（SPEC-I18N-*）と1:1で対応する。
// 期待値の根拠はフィクスチャ test/fixtures/assets.fixture.js（日本語5件＋英語2件）。
const ids = loc => loc.evaluateAll(els => els.map(e => e.dataset.id));

// EN をページ読み込み前に確定させるヘルパ。app.js は起動時に localStorage を読むため
// addInitScript で先に設定してから遷移する。
async function useEnglish(page) {
  await page.addInitScript(() => localStorage.setItem("aa4h_lang", "en"));
}

test.beforeEach(async ({ page }) => {
  await useFixture(page);
});

test("[SPEC-I18N-001] ヘッダーのJA/ENトグルで言語が切り替わり永続化される", async ({ page }) => {
  await page.goto("/index.html");
  // 既定は日本語
  await expect(page.locator(".site-head .nav > a").first()).toHaveText("ホーム");

  await page.locator('#lang-switch [data-l="en"]').click();
  // クリックで location.reload() されるため、英語適用後の状態を検証する
  await expect(page.locator(".site-head .nav > a").first()).toHaveText("Home");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => localStorage.getItem("aa4h_lang"))).toBe("en");
});

test("[SPEC-I18N-002] 選択言語のアセットのみを表示する", async ({ page }) => {
  // JA（既定）: 日本語5件
  await page.goto("/pages/agents.html");
  await expect(page.locator("#result-count")).toHaveText("5");
  expect(await ids(page.locator("#grid .card"))).toEqual(["102", "104", "101", "103", "105"]);

  // EN: 英語2件のみ
  await useEnglish(page);
  await page.goto("/pages/agents.html");
  await expect(page.locator("#result-count")).toHaveText("2");
  const titles = await page.locator("#grid .card .card-title").allTextContents();
  expect(titles.sort()).toEqual(["Meeting Notes Summarizer", "Pull Request Reviewer"]);
});

test("[SPEC-I18N-003] 英語選択時はカテゴリ名を英語表示する", async ({ page }) => {
  await useEnglish(page);
  await page.goto("/pages/agents.html");
  await expect(page.locator('#chips .chip[data-cat="資料・文書作成"]')).toContainText("Document Creation");
  await expect(page.locator('#chips .chip[data-cat="開発・コード支援"]')).toContainText("Development & Code");
});

test("[SPEC-I18N-004] 全ナビ項目を言語に応じて翻訳する", async ({ page }) => {
  await useEnglish(page);
  await page.goto("/index.html");
  await expect(page.locator(".site-head .nav > a")).toHaveText(["Home", "Directory", "Request"]);
});

test("[SPEC-I18N-005] 要望フォームを言語に応じて翻訳する", async ({ page }) => {
  await useEnglish(page);
  await page.goto("/pages/feedback.html");
  await expect(page.locator("#submit-btn")).toHaveText("Submit as Issue");
  await expect(page.locator(".fb-section-title").first()).toHaveText("Your Task & Needs");

  await page.locator("#asset-name").fill("X");
  await expect(page.locator("#preview-issue-title")).toHaveText("[Asset Request] X");
});

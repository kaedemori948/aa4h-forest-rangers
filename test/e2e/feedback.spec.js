import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// 要望フォームの仕様は specs/feedback.spec.md（SPEC-FEEDBACK-*）と1:1で対応する。
// 送信は AA4HAPI.createIssue（POST /api/issues）を叩くため、route で応答をモックする。
test.beforeEach(async ({ page }) => {
  await useFixture(page);
});

// 必須3項目を埋めるヘルパ
async function fillRequired(page) {
  await page.locator("#goal").fill("既存アセットで代替できない業務を自動化したい");
  await page.locator("#result").selectOption("zero");
  await page.locator("#asset-desc").fill("PDFを読み取って要約するアセットが欲しい");
}

test("[SPEC-FEEDBACK-001] 入力に応じてIssueタイトルをライブプレビューする", async ({ page }) => {
  await page.goto("/pages/feedback.html");
  await page.locator("#asset-name").fill("テストAI");
  await expect(page.locator("#preview-issue-title")).toHaveText("[アセット要望] テストAI");
});

test("[SPEC-FEEDBACK-002] 必須未入力で送信するとアラートを出し、APIを呼ばない", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  let apiCalled = false;
  await page.route("**/api/issues", route => { apiCalled = true; route.abort(); });

  let alertShown = false;
  page.on("dialog", d => { alertShown = true; d.accept(); });

  await page.locator("#submit-btn").click();

  await expect.poll(() => alertShown).toBe(true);
  expect(apiCalled).toBe(false);
  await expect(page.locator("#sent-banner")).toBeHidden();
});

test("[SPEC-FEEDBACK-003] 必須を満たして送信すると Issue を作成し、成功バナーとリンクを表示する", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  const issueUrl = "https://github.com/example/repo/issues/42";
  let posts = 0;
  await page.route("**/api/issues", route => {
    if (route.request().method() === "POST") posts++;
    route.fulfill({ contentType: "application/json", body: JSON.stringify({ url: issueUrl, number: 42 }) });
  });

  await fillRequired(page);
  await page.locator("#submit-btn").click();

  await expect(page.locator("#sent-banner")).toBeVisible();
  await expect(page.locator("#issue-link")).toHaveAttribute("href", issueUrl);
  await expect(page.locator("#submit-btn")).toHaveText("送信済み");
  expect(posts).toBe(1);
});

test("[SPEC-FEEDBACK-004] 送信が失敗するとエラーアラートを出し、ボタンを再有効化する", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  await page.route("**/api/issues", route =>
    route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "boom" }) })
  );

  let alertShown = false;
  page.on("dialog", d => { alertShown = true; d.accept(); });

  await fillRequired(page);
  await page.locator("#submit-btn").click();

  await expect.poll(() => alertShown).toBe(true);
  await expect(page.locator("#submit-btn")).toBeEnabled();
  await expect(page.locator("#submit-btn")).toHaveText("Issue として送信する");
  await expect(page.locator("#sent-banner")).toBeHidden();
});

test("[SPEC-FEEDBACK-005] キーワードを Enter でチップ追加し、重複は無視する", async ({ page }) => {
  await page.goto("/pages/feedback.html");
  const input = page.locator("#keywords-input");
  await input.fill("提案書");
  await input.press("Enter");
  await input.fill("提案書");
  await input.press("Enter");

  const chips = page.locator("#keywords-wrap .tag-chip");
  await expect(chips).toHaveCount(1);
  await expect(chips.first()).toContainText("提案書");
});

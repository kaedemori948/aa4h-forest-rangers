import { test, expect } from "@playwright/test";
import { useFixture } from "../helpers/fixture.js";

// 要望フォームの仕様は specs/feedback.spec.md（SPEC-FEEDBACK-*）と1:1で対応する。
// 送信は AA4HAPI.createIssue（POST /api/issues）を叩くため、route で応答をモックする。
test.beforeEach(async ({ page }) => {
  await useFixture(page);
});

// 必須項目（種別+検索系3項目）を埋めるヘルパ
// check-pill の input は非表示（display:none）で、見た目上のラベルをクリックして選択させる
async function selectFbType(page, value) {
  await page.locator(`#fb-type-group label.check-pill:has(input[value="${value}"])`).click();
}

async function fillRequired(page) {
  await selectFbType(page, "specific");
  await page.locator("#goal").fill("既存アセットで代替できない業務を自動化したい");
  await page.locator("#result").selectOption("zero");
  await page.locator("#asset-desc").fill("PDFを読み取って要約するアセットが欲しい");
}

test("[SPEC-FEEDBACK-001] 入力に応じてIssueタイトルをライブプレビューする", async ({ page }) => {
  await page.goto("/pages/feedback.html");
  await selectFbType(page, "specific");
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
  await selectFbType(page, "specific");
  const input = page.locator("#keywords-input");
  await input.fill("提案書");
  await input.press("Enter");
  await input.fill("提案書");
  await input.press("Enter");

  const chips = page.locator("#keywords-wrap .tag-chip");
  await expect(chips).toHaveCount(1);
  await expect(chips.first()).toContainText("提案書");
});

test("[SPEC-FEEDBACK-006] フィードバック種別で表示セクションが切り替わる", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  await expect(page.locator("#branch-search")).toBeHidden();
  await expect(page.locator("#branch-ux")).toBeHidden();

  await selectFbType(page, "ux");
  await expect(page.locator("#branch-ux")).toBeVisible();
  await expect(page.locator("#branch-search")).toBeHidden();

  await selectFbType(page, "specific");
  await expect(page.locator("#branch-search")).toBeVisible();
  await expect(page.locator("#branch-ux")).toBeHidden();
});

test("[SPEC-FEEDBACK-007] UX種別で困りごと未入力のまま送信するとアラートを出し、APIを呼ばない", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  let apiCalled = false;
  await page.route("**/api/issues", route => { apiCalled = true; route.abort(); });

  let alertShown = false;
  page.on("dialog", d => { alertShown = true; d.accept(); });

  await selectFbType(page, "ux");
  await page.locator("#submit-btn").click();

  await expect.poll(() => alertShown).toBe(true);
  expect(apiCalled).toBe(false);
});

test("[SPEC-FEEDBACK-008] UX種別で送信すると ux-improvement ラベル付きの Issue を作成する", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  let requestBody = "";
  await page.route("**/api/issues", route => {
    requestBody = route.request().postData() || "";
    route.fulfill({ contentType: "application/json", body: JSON.stringify({ url: "https://github.com/example/repo/issues/43", number: 43 }) });
  });

  await selectFbType(page, "ux");
  await page.locator("#ux-desc").fill("一覧画面でソートを変更するとフィルタが解除される");
  await page.locator("#submit-btn").click();

  await expect(page.locator("#sent-banner")).toBeVisible();
  expect(requestBody).toContain("`ux-improvement`");
  expect(requestBody).not.toContain("`asset-request`");
});

test("[SPEC-FEEDBACK-009] 確信度を選択するとプレビュー本文に反映される", async ({ page }) => {
  await page.goto("/pages/feedback.html");

  await selectFbType(page, "specific");
  await page.locator("#confidence").selectOption("sure_not_exist");

  await expect(page.locator("#preview-body")).toContainText("探した範囲では存在しないと思う");
});

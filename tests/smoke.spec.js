const { test, expect } = require("@playwright/test");

// テスト対象のバリアント（サイトの構成ごとのパス）
const variants = ["a", "b", "c"];
// 重要なページ群を列挙（トップ・一覧・詳細など）
const keyPages = [
  "/",
  "/a/index.html",
  "/a/agents.html",
  "/a/agent.html?id=1",
  "/b/index.html",
  "/b/agents.html",
  "/b/agent.html?id=1",
  "/c/index.html",
  "/c/agents.html",
  "/c/agent.html?id=1"
];


// ページ上で発生するランタイムエラー（pageerror）や
// コンソールのerrorログを収集するヘルパー。
// 各テストでこの配列を監視して、エラーが発生していないか確認する。
async function monitorPage(page) {
  const errors = [];
  // ページの未処理例外を捕捉
  page.on("pageerror", error => errors.push(error.message));
  // console.error() 等のコンソール出力を捕捉
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}


// --- 基本的な静的レンダリング確認 ---
// 各主要ページが開けて、致命的なランタイムエラーが発生していないことを確認する。
test.describe("static site smoke", () => {
  for (const pagePath of keyPages) {
    test(`${pagePath} renders without runtime errors`, async ({ page }) => {
      // ページ上のエラー収集を開始
      const errors = await monitorPage(page);
      // DOMContentLoadedまで待機して描画を確認
      await page.goto(pagePath, { waitUntil: "domcontentloaded" });
      // bodyが表示されているか（ページがレンダリングされているか）
      await expect(page.locator("body")).toBeVisible();
      // ヘッダーが存在するか（ページ骨格が正しく読み込まれたか）
      await expect(page.locator(".site-head, .head").first()).toBeVisible();
      // 収集したエラーが無いことを確認
      expect(errors).toEqual([]);
    });
  }
});


// --- バリアント毎のホームページに表示される動的なセクションの確認 ---
// カードやランキングなど、クライアント側で動的に描画される要素が
// 正しく表示されているかを検証する。
test.describe("variant home pages", () => {
  for (const variant of variants) {
    test(`${variant} home renders dynamic sections`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/index.html`, { waitUntil: "domcontentloaded" });

      // 総数表示（数値が入ること）
      await expect(page.locator("[data-stat='total']").first()).toHaveText(/\d/);
      // 編集者のピック、カテゴリ索引、ランキング、新着カードなどが存在
      await expect(page.locator("#picks .card").first()).toBeVisible();
      await expect(page.locator("#cat-index").first()).toBeVisible();
      await expect(page.locator("#ranking").first()).toBeVisible();
      await expect(page.locator("#newest .card").first()).toBeVisible();

      // ランタイムエラーが無いことを確認
      expect(errors).toEqual([]);
    });
  }
});


// --- 一覧ページの対話操作（検索・絞り込み・ソート・ページネーション） ---
// 検索入力やソート、フィルタチェック等を操作して一覧の反応を確認する。
test.describe("directory interactions", () => {
  for (const variant of variants) {
    test(`${variant} directory supports search, filters, sort, and pagination`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/agents.html`, { waitUntil: "domcontentloaded" });

      const cards = page.locator("#grid .card");
      // 最初のカードが見える＝一覧がレンダリングされている
      await expect(cards.first()).toBeVisible();
      const initialCount = await cards.count();
      // 最低1つ以上のカードがあることを前提とするテスト
      expect(initialCount).toBeGreaterThan(0);

      // 存在しないキーワードで検索して結果が0件になることを確認
      await page.locator("#q").fill("__no_match__");
      // 空結果表示（result-countが0を表示）
      await expect(page.locator("#result-count")).toHaveText("0");

      // 検索をクリアして元に戻ることを確認
      await page.locator("#q").fill("");
      await expect(cards.first()).toBeVisible();

      // ソートを切り替えても一覧が表示されることを確認
      await page.locator("#sort").selectOption("newest");
      await expect(cards.first()).toBeVisible();

      // ピック（facet）で絞り込んだり外したりして反応を確認
      await page.locator("#facet-pick").check();
      await expect(cards.first()).toBeVisible();
      await page.locator("#facet-pick").uncheck();

      // 「もっと見る」ボタンがある場合はクリックしてカード数が増えることを確認
      const more = page.locator("#more");
      if (await more.isVisible()) {
        const before = await cards.count();
        await more.click();
        await expect.poll(() => cards.count()).toBeGreaterThan(before);
      }

      expect(errors).toEqual([]);
    });
  }
});


// --- 詳細ページの対話操作（タブ切替、スライダー、試すアクション） ---
// タブを切り替えたときパネルがアクティブになること、スライダーが動作すること、
// 「試す」ボタンが押された状態になることを確認する。
test.describe("detail page interactions", () => {
  for (const variant of variants) {
    test(`${variant} detail page supports tabs, slider, and try action`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/agent.html?id=1`, { waitUntil: "domcontentloaded" });

      // タイトルとタブが表示される
      await expect(page.locator(".detail-title")).toBeVisible();
      await expect(page.locator(".tab").first()).toBeVisible();
      // 2つ目のタブをクリックしてパネルがアクティブになる
      await page.locator(".tab").nth(1).click();
      await expect(page.locator(".panel.active")).toBeVisible();

      // スライダーの「次へ」ボタンがある場合、トラックの変換スタイルが変わることを確認
      const next = page.locator(".detail-slider-next");
      if (await next.isVisible()) {
        const track = page.locator(".detail-slider-track");
        await next.click();
        await expect(track).toHaveAttribute("style", /translateX\(-100%\)/);
      }

      // 「試す」ボタンを押すと試行済みスタイルが付与される
      const tryButton = page.locator(".try-cta");
      await tryButton.click();
      await expect(tryButton).toHaveClass(/tried/);

      expect(errors).toEqual([]);
    });

    // 存在しない id を渡したとき、一覧に戻るリンクが表示されるかを確認する
    test(`${variant} detail page handles unknown ids`, async ({ page }) => {
      const errors = await monitorPage(page);
      await page.goto(`/${variant}/agent.html?id=999999`, { waitUntil: "domcontentloaded" });
      // 詳細が見つからない場合は一覧へのリンクがあるはず
      await expect(page.locator("#detail a[href='agents.html']")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});


// --- レスポンシブレイアウト確認（モバイル幅で横スクロールが発生しないか） ---
test.describe("responsive layout", () => {
  for (const pagePath of ["/a/index.html", "/a/agents.html", "/a/agent.html?id=1"]) {
    test(`${pagePath} does not overflow mobile viewport`, async ({ page }) => {
      // iPhone/モバイル相当のビューポートでレンダリング
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(pagePath, { waitUntil: "domcontentloaded" });
      // 横スクロールのはみ出し量を計測し、許容範囲内か確認
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }
});

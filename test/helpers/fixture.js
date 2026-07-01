import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// data/test.js への実リクエストを決定論フィクスチャに差し替える。
// これにより本番相当データの変動に依存せず、期待値を固定できる。
const fixtureBody = readFileSync(
  fileURLToPath(new URL("../fixtures/assets.fixture.js", import.meta.url)),
  "utf-8"
);

export async function useFixture(page) {
  // 外部フォント(Google Fonts)は挙動と無関係。load イベントを待たせて
  // 並列実行時にタイムアウトの原因になるため遮断し、テストを決定論化する。
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());

  await page.route("**/data/test.js", route =>
    route.fulfill({ contentType: "application/javascript", body: fixtureBody })
  );
}

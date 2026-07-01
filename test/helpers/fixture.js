import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// data/test.js への実リクエストを決定論フィクスチャに差し替える。
// これにより本番相当データの変動に依存せず、期待値を固定できる。
const fixtureBody = readFileSync(
  fileURLToPath(new URL("../fixtures/assets.fixture.js", import.meta.url)),
  "utf-8"
);

export async function useFixture(page) {
  await page.route("**/data/test.js", route =>
    route.fulfill({ contentType: "application/javascript", body: fixtureBody })
  );
}

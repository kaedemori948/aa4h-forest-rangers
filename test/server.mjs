// CI・ローカル横断で使える最小の静的サーバ。
// serve.ps1 は PowerShell 依存のため、テスト用途では OS 非依存の本ファイルを使う。
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PORT = process.env.PORT || 3333;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain",
};

const server = createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

  // ルート外へのパストラバーサルを防ぐ
  const filePath = normalize(join(ROOT, urlPath));
  if (!filePath.startsWith(normalize(ROOT))) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const bytes = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
    res.end(bytes);
  } catch {
    res.writeHead(404).end("Not found");
  }
});

server.listen(PORT, () => console.log(`Serving ${ROOT} on http://localhost:${PORT}/`));

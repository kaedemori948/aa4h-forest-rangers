# Security Report
**対象**: AI Assets for HMAX (aa4h-forest-rangers)
**監査日**: 2026-06-18
**監査範囲**: assets/app.js, a/index.html, a/agents.html, a/agent.html, agents.js

---

## 問題一覧

### [SEC-001] `javascript:` URL が `esc()` でブロックされない
- **場所**: `assets/app.js:617`
- **重要度**: 高
- **リスク**: エージェントデータの `api.docUrl` に `javascript:alert(document.cookie)` のような値が入ると、詳細ページの「API仕様書を見る」リンクをクリックした際に任意の JavaScript が実行される (ストアド XSS)。
- **現象**:
  ```js
  // renderDetail() 内
  `<a class="api-link" href="${esc(a.api.docUrl)}">${t("fld_api_doc")}</a>`
  ```
  `esc()` 関数 (line 294) は `& < > "` のみをエンコードするが、`javascript:` プロトコル文字列はこれらを含まないため素通りする。現在 agents.js のデータは `"docUrl": "#"` なので実害はないが、データソースが外部化・編集可能になった時点で即座に危険になる。
- **修正案**:
  ```js
  // URLを安全なプロトコルに限定するヘルパーを追加
  const safeUrl = u => /^https?:\/\//i.test(u) ? u : "#";
  // 使用箇所
  `<a class="api-link" href="${esc(safeUrl(a.api.docUrl))}">`
  ```

---

### [SEC-002] Content Security Policy (CSP) が未設定
- **場所**: `a/index.html`, `a/agents.html`, `a/agent.html` (全 HTML ファイル)
- **重要度**: 高
- **リスク**: CSP がないため、XSS が成立した場合にインラインスクリプト・外部スクリプト読み込み・データ窃取を制限する防御層がゼロになる。また eval、`data:` URI 等も無制限に許可されている。
- **現象**: 各 HTML の `<head>` に CSP meta タグなし。サーバサイドの CSP ヘッダも（静的配信のため）存在しない。
- **修正案**:
  各 HTML の `<head>` 先頭に追加:
  ```html
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self';
                 style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                 font-src 'self' https://fonts.gstatic.com;
                 img-src 'self' https://picsum.photos data:;
                 script-src 'self';
                 object-src 'none';
                 base-uri 'self';">
  ```

---

### [SEC-003] `data-i18n-html` による `innerHTML` への HTML 直接書き込み
- **場所**: `assets/app.js:284–286`
- **重要度**: 中
- **リスク**: i18n 辞書の値が HTML タグを含み、それを `innerHTML` で展開する。辞書はコード内にハードコードされているが、将来的に外部 JSON に切り出した場合や、プロトタイプ汚染攻撃によって `I18N` オブジェクトが改ざんされた場合に XSS が成立する。
- **現象**:
  ```js
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = t(el.dataset.i18nHtml);
    if (v !== undefined) el.innerHTML = v;  // HTML タグを含む値をそのまま展開
  });
  ```
  例: `hero_lead_a` の値に `<span data-stat="total">—</span>` が含まれる。
- **修正案**:
  DOMPurify でサニタイズするか、`data-i18n-html` キーを廃止して動的な `<span>` を個別に `textContent` で更新する構造に変更する。

---

### [SEC-004] チャットの `addMsg()` が HTML を `innerHTML` に直接挿入
- **場所**: `assets/app.js:773–778`
- **重要度**: 中
- **リスク**: 呼び出し側がエスケープを忘れた場合、チャット UI でユーザ入力由来の XSS が成立する。現在はユーザ入力を `esc(q)` で保護しているが、関数シグネチャが生 HTML を受け入れる設計のため、将来のコード変更時に混入しやすい。
- **現象**:
  ```js
  function addMsg(html, isUser=false) {
    div.innerHTML = `…<div class="msg-bubble">${html}</div>`;  // 引数をエスケープなしに挿入
  }
  // 呼び出し側 (line 832) は正しくエスケープ済み
  addMsg(esc(q), true);
  ```
- **修正案**:
  `msg-bubble` を `textContent` で設定し、HTML が必要な要素だけ個別に `appendChild` する構造に変更する。または JSDoc で「引数は必ず esc() 済みか固定 HTML を渡すこと」と明記する。

---

### [SEC-005] 画像 URL が HTML 属性にエスケープなしで埋め込まれる
- **場所**: `assets/app.js:73`, `78`, `111`
- **重要度**: 中
- **リスク**: `a.images[]` の URL 値に `"` (ダブルクォート) が含まれる場合、属性値から抜け出して任意の HTML 属性・イベントハンドラを注入できる。現在のデータは picsum.photos の安全な URL だが、データソース変更時に問題になる。
- **現象**:
  ```js
  // line 73: 単一画像
  `<img src="${images[0]}" alt="" loading="lazy">`

  // line 78 / 111: 複数画像ループ
  const imgs = images.map(u => `<img src="${u}" alt="" loading="lazy">`).join("");
  // u = 'x" onerror="alert(1)' のような値で XSS 成立
  ```
- **修正案**:
  ```js
  const imgs = images.map(u => `<img src="${esc(safeUrl(u))}" alt="" loading="lazy">`).join("");
  ```

---

### [SEC-006] 外部 CDN (Google Fonts) を Subresource Integrity (SRI) なしで読み込み
- **場所**: `a/index.html:8–9`, `a/agents.html:8–9`, `a/agent.html:8–9` (全 HTML ファイル共通)
- **重要度**: 中
- **リスク**: Google Fonts CDN が侵害された場合、悪意ある CSS がロードされ、コンテンツの書き換え・CSS Injection によるデータ窃取などが可能になる。
- **現象**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:…" rel="stylesheet">
  <!-- integrity 属性が存在しない -->
  ```
- **修正案**:
  フォントをビルド時にダウンロードし `assets/fonts/` に格納してセルフホストする（最も安全）。または CSP の `style-src` で Google Fonts ドメインのみに限定する。

---

### [SEC-007] クリックジャッキング対策が未実施
- **場所**: 全 HTML ファイル (サーバヘッダ含む)
- **重要度**: 低
- **リスク**: 本サイトを悪意ある外部サイトが `<iframe>` で読み込み、透明な overlay を重ねることでユーザのクリックを乗っ取り (クリックジャッキング)、意図しない操作を誘発できる。
- **現象**: `X-Frame-Options` ヘッダなし、CSP の `frame-ancestors` ディレクティブなし。
- **修正案**:
  CSP (SEC-002 参照) に `frame-ancestors 'self'` を追加するか、サーバで `X-Frame-Options: SAMEORIGIN` ヘッダを返す。

---

### [SEC-008] カテゴリ ID が HTML 属性・URL にエスケープなしで埋め込まれる
- **場所**: `assets/app.js:428`, `502`
- **重要度**: 低
- **リスク**: `c.id` は現在 `"doc"`, `"dev"` 等の英小文字のみだが、将来データが変更され `"` や `>` を含む ID が追加された場合、HTML インジェクションが起きる。
- **現象**:
  ```js
  // line 428
  `<a class="cat-row reveal" href="agents.html?cat=${c.id}" …>`

  // line 502
  `<button class="chip" data-cat="${c.id}">…</button>`
  // c.id は esc() を通していない
  ```
- **修正案**:
  ```js
  `<a class="cat-row reveal" href="agents.html?cat=${encodeURIComponent(c.id)}" …>`
  `<button class="chip" data-cat="${esc(c.id)}">…</button>`
  ```

---

## サマリー

| ID | 問題 | 重要度 | ファイル |
|----|------|--------|---------|
| SEC-001 | `javascript:` URL が `esc()` でブロックされない | **高** | assets/app.js:617 |
| SEC-002 | Content Security Policy 未設定 | **高** | 全 HTML ファイル |
| SEC-003 | `data-i18n-html` による innerHTML 書き込み | 中 | assets/app.js:284–286 |
| SEC-004 | `addMsg()` が生 HTML を innerHTML に挿入 | 中 | assets/app.js:773–778 |
| SEC-005 | 画像 URL がエスケープなしで HTML 属性に埋め込まれる | 中 | assets/app.js:73, 78, 111 |
| SEC-006 | 外部 CDN (Google Fonts) に SRI なし | 中 | 全 HTML ファイル:8–9 |
| SEC-007 | クリックジャッキング対策なし | 低 | 全 HTML ファイル |
| SEC-008 | カテゴリ ID がエスケープなしで埋め込まれる | 低 | assets/app.js:428, 502 |

## 対応優先度

1. **即時対応**: SEC-001 (`safeUrl()` ヘルパー追加) — 1行修正で対応可能
2. **即時対応**: SEC-002 (CSP meta タグ追加) — 全 HTML に同じタグを追加するだけ
3. **次スプリント**: SEC-005 (画像 URL に `esc()` 適用)、SEC-008 (カテゴリ ID エスケープ)
4. **計画的対応**: SEC-003/004 (innerHTML の構造的見直し)、SEC-006 (フォントのセルフホスト化)、SEC-007 (X-Frame-Options 設定)

---

*レポート生成: Claude Sonnet 4.6 / 2026-06-18*

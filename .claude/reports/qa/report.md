# QA Report — AI Assets for HMAX (Design Variant A)

**作成日**: 2026-06-18
**対象**: `a/index.html`, `a/agents.html`, `a/agent.html`, `assets/app.js`, `assets/app.css`
**検査方針**: コード静的解析（JS ロジック・DOM 操作・イベント・CSS レスポンシブ）

---

## バグ一覧

---

### [BUG-001] `renderDetail()` — `a.rating` が null/undefined のとき TypeError でクラッシュ

- **場所**: `assets/app.js:588`, `assets/app.js:646`
- **重要度**: 高
- **現象**: エージェントデータに `rating` フィールドが存在しない場合、詳細ページ (`agent.html`) を開くと TypeError が発生しページが真っ白になる。
- **原因**:
  ```js
  // line 588 (overview パネル)
  <span class="mg-n">★ ${a.rating.toFixed(1)}</span>
  // line 646 (detail-head バッジ)
  <span class="bdg bdg-rate">★ ${a.rating.toFixed(1)} ...
  ```
  `a.rating` が `null` / `undefined` の状態で `.toFixed(1)` を呼び出すと `TypeError: Cannot read properties of null` が発生する。`badgesHTML()` 関数 (line 303) では `a.rating == null` チェックが存在するが、`renderDetail()` には同等のガードがない。
- **修正案**:
  ```js
  // 両箇所を以下のように変更
  ★ ${a.rating != null ? a.rating.toFixed(1) : "—"}
  ```

---

### [BUG-002] `renderDetail()` — `a.testimonials` が欠損のとき TypeError でクラッシュ

- **場所**: `assets/app.js:604`
- **重要度**: 高
- **現象**: エージェントデータに `testimonials` 配列が存在しない場合、"効果・活用事例" タブを開くと TypeError でパネルが壊れる。
- **原因**:
  ```js
  ${a.testimonials.map(v => `<blockquote class="voice">...`).join("")}
  ```
  `a.testimonials` が `undefined` または `null` のとき `.map()` が呼べず例外が発生する。
- **修正案**:
  ```js
  ${(a.testimonials || []).map(v => `<blockquote class="voice">...`).join("")}
  ```

---

### [BUG-003] `renderDetail()` — effect パネルで `a.useCases.map()` が null クラッシュ

- **場所**: `assets/app.js:607`
- **重要度**: 高
- **現象**: `useCases` フィールドが欠損したエージェントで詳細ページを開くと、"効果・活用事例" タブのリスト生成でクラッシュ。
- **原因**:
  ```js
  <ul class="usecase-list">${a.useCases.map(u => `<li>${esc(u)}</li>`).join("")}</ul>
  ```
  概要タブで使う `chips(a.useCases)` は `arr && arr.length` でガードされているが、この行には null チェックがない。
- **修正案**:
  ```js
  <ul class="usecase-list">${(a.useCases || []).map(u => `<li>${esc(u)}</li>`).join("")}</ul>
  ```

---

### [BUG-004] `renderDetail()` — ネスト型プロパティ (`a.tech`, `a.api`, `a.security`, `a.support`) が欠損のとき一括クラッシュ

- **場所**: `assets/app.js:611–629`
- **重要度**: 高
- **現象**: データに `tech` / `api` / `security` / `support` オブジェクトのいずれかが存在しない場合、"技術・API" または "セキュリティ" タブの描画で TypeError が発生しページ全体がクラッシュする。
- **原因**: 以下のプロパティアクセスがすべてガードなし:
  ```
  a.tech.model, a.tech.integrations, a.tech.performance, a.tech.customizable (lines 612–615)
  a.api.available, a.api.docUrl                                               (lines 616–617)
  a.security.auth, a.security.dataHandling, a.security.compliance             (lines 622–624)
  a.support.channel, a.support.sla                                            (lines 626–627)
  ```
- **修正案**: 各オブジェクトにデフォルト値を設定してからアクセスする:
  ```js
  const tech_obj     = a.tech     || {};
  const api_obj      = a.api      || {};
  const security_obj = a.security || {};
  const support_obj  = a.support  || {};
  ```

---

### [BUG-005] "さらに表示" 押下でカードスライダーにイベントリスナーが重複登録される

- **場所**: `assets/app.js:534–535` (`paint()` 内)
- **重要度**: 中
- **現象**: 「さらに表示」ボタンを複数回押すと、既存のカードスライダーの「前へ」「次へ」ボタンやドットを 1 回クリックするたびに複数回スライドが進み、スライダーが誤動作する。
- **原因**:
  ```js
  function paint(append) {
    if (!append) grid.innerHTML = "";
    grid.insertAdjacentHTML("beforeend", next.map(...).join(""));
    bindCardSliders(grid);   // 全スライダーを再スキャン（追記時も）
  }
  ```
  `bindCardSliders(grid)` は grid 内の全 `[data-slider]` 要素を毎回バインドするため、追記モード (`append=true`) では既存スライダーに新たなリスナーが積み重なる。2 回目押下後は prev/next 1 クリックで 2 スライド進む。
- **修正案**:
  ```js
  // 未バインド要素のみ対象にする
  grid.querySelectorAll("[data-slider]:not([data-slider-bound])").forEach(el => {
    bindCardSlider(el);
    el.dataset.sliderBound = "1";
  });
  ```

---

### [BUG-006] モバイルでスティッキーコントロールバーがヘッダーと重なる

- **場所**: `a/agents.html` インライン CSS (line 103)
- **重要度**: 中
- **現象**: 画面幅 600px 以下（スマートフォン）でエージェント一覧ページを開くと、検索バー・フィルタを含むコントロールバーがヘッダーと約 8px 重なって表示される。
- **原因**:
  ```css
  @media (max-width: 600px) {
    .controls { top: 60px; }  /* ← ヘッダー実効高さより小さい */
  }
  ```
  `app.css` の `.site-head .wrap { height: 68px }` と `border-bottom: 1px` により、ヘッダーの実効高さは約 69px。しかしモバイル用の `top: 60px` ではヘッダーと 9px 重なる。
- **修正案**:
  ```css
  @media (max-width: 600px) {
    .controls { top: 69px; }  /* ヘッダー 68px + border 1px */
  }
  ```

---

### [BUG-007] `CARD_PAD` テーマ検出が常に 22 を返す（検出ロジック不全）

- **場所**: `assets/app.js:13`
- **重要度**: 低
- **現象**: スライダーのネガティブマージンが、テーマ b/c でも常に 22px で計算され、将来テーマ別 CSS を追加した場合にスライダーのレイアウトがずれる。
- **原因**:
  ```js
  const CARD_PAD = document.querySelector('link[href*="theme-b"],link[href*="theme-c"]') ? 18 : 22;
  ```
  a/b/c いずれのページも `<link href="../assets/app.css">` を使用しており、href に `"theme-b"` / `"theme-c"` が含まれないためクエリは常に null を返す。
- **修正案**: テーマ識別を `data-theme` 属性等で行う:
  ```js
  const theme = document.body.dataset.theme || "a";
  const CARD_PAD = (theme === "b" || theme === "c") ? 18 : 22;
  ```

---

### [BUG-008] `agents.html` のソート選択初期化スクリプトが `renderList()` と重複

- **場所**: `a/agents.html:191–194`
- **重要度**: 低
- **現象**: 直接的な不具合なし。URL の `?sort=` パラメータを `<select>` に反映する処理が二重に実行されている。
- **原因**: インラインスクリプトが `select.value` を設定しているが、`renderList()` は `select.value` を参照せず URL パラメータを直接読み取るため、インラインスクリプトは実際には何も効果をもたらさない。
- **修正案**: インラインスクリプトを削除し、`renderList()` の URL 読み込みに一本化する。

---

### [BUG-009] i18n キー `nav_home` が定義されているが使用箇所なし（デッドコード）

- **場所**: `assets/app.js:149` (ja), `assets/app.js:212` (en)
- **重要度**: 低
- **現象**: 直接的な不具合なし。将来のメンテナンス時に混乱を招く。
- **原因**: `I18N.ja.nav_home: "ホーム"` / `I18N.en.nav_home: "Home"` が定義されているが、`data-i18n="nav_home"` を持つ要素がどの HTML にも存在しない。
- **修正案**: 未使用キーを I18N オブジェクトから削除する。

---

### [BUG-010] モーダル CSS が `a/index.html` と `a/agents.html` に重複定義（デッドコード）

- **場所**: `a/index.html:111–138`, `a/agents.html:76–101`
- **重要度**: 低
- **現象**: 直接的な不具合なし。CSS の重複により片方だけ修正してしまうメンテナンスリスクがある。
- **原因**: `.modal` / `.modal-bg` / `.modal-card` 等が両ファイルに同一内容で定義されているが、両ページの `<body data-detail="page">` により `go()` は常に `location.href` で遷移するため、モーダルは実際には開かれない。
- **修正案**: モーダル CSS を `app.css` に一元化し、各 HTML のインライン定義を削除する。

---

## サマリー

| ID       | タイトル                                                       | 重要度 |
|----------|----------------------------------------------------------------|--------|
| BUG-001  | `a.rating.toFixed(1)` — null で TypeError クラッシュ           | 高     |
| BUG-002  | `a.testimonials.map()` — 欠損で TypeError クラッシュ           | 高     |
| BUG-003  | `a.useCases.map()` (effect パネル) — null クラッシュ           | 高     |
| BUG-004  | ネストオブジェクト (`tech/api/security/support`) null クラッシュ | 高   |
| BUG-005  | "さらに表示" でスライダーにリスナーが重複登録                   | 中     |
| BUG-006  | モバイルでスティッキーコントロールがヘッダーと重なる            | 中     |
| BUG-007  | `CARD_PAD` テーマ検出が常に 22 を返す（不全）                  | 低     |
| BUG-008  | ソート選択初期化スクリプトが `renderList()` と重複              | 低     |
| BUG-009  | i18n キー `nav_home` が未使用（デッドコード）                   | 低     |
| BUG-010  | モーダル CSS が 2 ファイルに重複定義（デッドコード）            | 低     |

**高: 4件 / 中: 2件 / 低: 4件**

# update-dev-env

`dev-environment.html` を最新の開発状況に合わせて更新するスキル。
`updateFormat.md` が添付されている場合は、その指示による追加修正も実施する。

## トリガー

- `/update-dev-env`

## 手順

### STEP 1: updateFormat.md の確認

ユーザーが `updateFormat.md` を添付しているか確認する。

- **添付あり** → ファイルから以下を把握し、STEP 2 へ進む
  - **修正目的**: 何のための修正か、なぜ必要か
  - **対象スライド**: どのスライドを修正するか（指定外は一切変更しない）
  - **補足**: 追加の禁止事項・制約・背景情報
- **添付なし** → エラーにせず STEP 2 へ進む（自動更新のみ実施）

「対象スライド」の記載が曖昧な場合は、STEP 3 で HTML を確認してから特定する。

---

### STEP 2: スタイルガイドを読む

`.claude/documents/style.md` が存在する場合は読み、以下を把握する。
ファイルが存在しない場合はスキップする。

- カラーパレット（特に `#E60012` の使用箇所と禁止事項）
- 各コンポーネントのクラス構成
- タイポグラフィの階層ルール
- ファイル末尾の「修正時の禁止事項」セクション

---

### STEP 3: dev-environment.html を読む

`dev-environment.html` を読み、以下のスライドを特定する。

| 対象スライド | 識別条件 |
|---|---|
| サイトマップ | `data-act="Sitemap"` を持つ `<div class="slide">` |
| ディレクトリ構成 | `data-act="Directory"` を持つ `<div class="slide">` |
| Agents 一覧 | `data-act="Claude for AI Agent"` かつ `エージェント一覧と役割` を含む `<div class="slide">` |
| Skills 一覧 | `data-act="Claude for AI Agent"` かつ `Skills 一覧と役割` を含む `<div class="slide">` |

---

### STEP 4: 【自動】サイトマップ更新

**常に実施する。**

`index.html` を読み、サイトの大きな画面遷移を把握する。
- ヘッダーナビゲーションのリンク
- メインコンテンツ内のページ遷移リンク
- `pages/` 配下の HTML ファイル（必要に応じて読む）

**判断基準:**
大きな画面遷移（ページ単位の遷移）に変化がない場合は変更しない。
追加・削除・名称変更があった場合のみ、サイトマップスライドの SVG を更新する。

**制約:**
- `data-act="Sitemap"` スライド以外には触れない
- 同一画面内のフィルター・タブ切り替えなどのインタラクションは含めない
- 大きな画面遷移のみ記載する

---

### STEP 5: 【自動】ディレクトリ構成更新

**常に実施する。**

プロジェクトルートのディレクトリ構造を把握する（深さ 3〜4 レベルまで）。

特に以下を確認する。
- `.claude/` 配下（`agents/`, `skills/`, `reports/` など主要なもの）
- トップレベルのディレクトリ・ファイル（`assets/`, `data/`, `pages/`, `CLAUDE.md`, `index.html`, `dev-environment.html` など）
- `pages/` 配下の HTML ファイル群

把握した最新のディレクトリ構成を、ディレクトリ構成スライドのモノスペースツリーに反映する。

**除外するフォルダ・ファイル（記載しない）:**
- `.git/`
- `node_modules/`
- `.claude/worktrees/`
- `.claude/skills/superpowers/` の深い階層（グループ名のみ記載）

**制約:**
- `data-act="Directory"` スライド以外には触れない

---

### STEP 6: 【自動】Agents・Skills 一覧更新

**常に実施する。**

#### 6-1: エージェント定義を読む

`.claude/agents/` 配下の全 `.md` ファイルを読む。
各ファイルから以下を抽出する。

- **名前**: `# ` で始まる最初の見出しテキスト
- **説明**: `## Role` 直下のテキスト（なければファイル冒頭の説明文）
- **出力先パス**: `## Output` 直下のパス文字列（なければ省略）

#### 6-2: スキル定義を読む

**グループ化ルール（重要）:**
`.claude/skills/` 直下のサブディレクトリが子ディレクトリを持つ場合は、そのサブディレクトリ全体を **1枚のグループカード** としてまとめる。

読み込み対象:
1. `.claude/skills/*.md` → 個別スキルカード（`name:` フロントマターがあれば使用、なければファイル名）
2. `.claude/skills/X/SKILL.md`（`X/` の中にさらにサブディレクトリがない場合）→ 個別スキルカード
3. `.claude/skills/X/`（`X/` が子ディレクトリを持つ場合）→ グループカード1枚

#### 6-3: スライドHTMLを構築する

**ページ配置の原則（厳守）:**
- **Agents ページ**: Agents のみ（Skills と同一ページに混在させない）
- **Skills ページ**: Skills のみ（Agents と同一ページに混在させない）
- ページ順序: Agents ページ → Skills ページ の順

**ページヘッダーの連番:**
- Agents ページ: `06 — Claude for AI Agent① Agents`
- Skills ページ 1 枚目: `06 — Claude for AI Agent② Skills`
- Skills ページ 2 枚目以降: `06 — Claude for AI Agent③ Skills（続き）`（④⑤... と増やす）

**ページ分割の判断基準:**
- Agents ページ: 通常 1 ページで収まる（エージェント数が多い場合のみ分割）
- Skills ページ: スライド有効高さ目安 `~660px`（カード 1 枚 `~58px` / col-span-2 グループカード `~140px`）
- 超えそうな場合は次スライドを追加する

**Agents ページ テンプレート:**

```html
<!-- ── SLIDE N: Agents 一覧 ── -->
<div class="slide" data-act="Claude for AI Agent">
  <div class="h-1.5 bg-[#E60012]"></div>
  <div class="flex-1 bg-white px-16 py-8 flex flex-col">
    <p class="text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2">06 — Claude for AI Agent① Agents</p>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">エージェント一覧と役割</h2>
    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Agents（自律的に動くAIサブエージェント）</div>
    <div class="grid grid-cols-2 gap-4">
      {エージェントカード群}
    </div>
  </div>
</div>
```

**Skills ページ テンプレート（1 枚目）:**

```html
<!-- ── SLIDE N: Skills 一覧 ── -->
<div class="slide" data-act="Claude for AI Agent">
  <div class="h-1.5 bg-[#E60012]"></div>
  <div class="flex-1 bg-white px-16 py-8 flex flex-col">
    <p class="text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2">06 — Claude for AI Agent② Skills</p>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Skills 一覧と役割</h2>
    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Skills（/コマンドで呼び出す追加機能）</div>
    <div class="grid grid-cols-2 gap-1.5">
      {スキルカード群}
    </div>
  </div>
</div>
```

**Skills ページ テンプレート（2 枚目以降）:**

```html
<!-- ── SLIDE N: Skills 一覧（続き）── -->
<div class="slide" data-act="Claude for AI Agent">
  <div class="h-1.5 bg-[#E60012]"></div>
  <div class="flex-1 bg-white px-16 py-8 flex flex-col">
    <p class="text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2">06 — Claude for AI Agent③ Skills（続き）</p>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Skills 一覧（続き）</h2>
    <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Skills（続き）</div>
    <div class="grid grid-cols-2 gap-1.5">
      {スキルカード群}
    </div>
  </div>
</div>
```

**スキルカード（個別）:**

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-2">
  <div class="text-xs font-semibold text-[#E60012] mb-1">{スキル名}</div>
  <p class="text-xs text-gray-600">{説明}</p>
</div>
```

**グループカード（サブフォルダをまとめる場合）:**

```html
<div class="col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-2">
  <div class="text-xs font-semibold text-[#E60012] mb-1">{フォルダ名}（拡張スキル群）</div>
  <div class="flex gap-4">
    <ul class="text-xs text-gray-600 flex flex-col gap-0.5 flex-1">
      <li><span class="text-gray-400">—</span> {スキル名1}</li>
      <li><span class="text-gray-400">—</span> {スキル名2}</li>
    </ul>
    <ul class="text-xs text-gray-600 flex flex-col gap-0.5 flex-1">
      <li><span class="text-gray-400">—</span> {スキル名N}</li>
    </ul>
  </div>
</div>
```

**エージェントカード（出力先パスあり）:**

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
  <div class="flex items-center justify-between mb-2">
    <div class="text-xs font-semibold text-[#E60012]">{エージェント名}</div>
    <code class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">{出力先パス}</code>
  </div>
  <p class="text-xs text-gray-600">{説明}</p>
</div>
```

**エージェントカード（出力先パスなし）:**

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
  <div class="text-xs font-semibold text-[#E60012] mb-2">{エージェント名}</div>
  <p class="text-xs text-gray-600">{説明}</p>
</div>
```

**制約:**
- 対象スライド（`data-act="Claude for AI Agent"` かつ `エージェント一覧と役割` または `Skills 一覧と役割` または `Skills 一覧（続き）` を含む全スライド）のみ置き換える
- 追加スライドが必要な場合は元の最終対象スライドの直後に挿入する
- `<style>` ブロックは変更しない
- `<script>` ブロックは変更しない（スライド枚数のカウントは JS が自動で行う）
- インラインスタイルを追加しない

---

### STEP 7: updateFormat.md の修正を適用（添付があった場合のみ）

STEP 1 で添付が確認された場合のみ実施する。

STEP 1 で把握した「対象スライド」に対し、以下の制約のもとで修正を実施する。
STEP 4〜6 で既に更新したスライドが対象スライドと重複する場合は、両方の変更を合わせて適用する。

**スコープ制約:**
- 対象スライド以外の HTML に一切触れない
- ナビゲーション・カウンター・セクションラベル（`no-print` 要素）は変更しない
- `<script>` ブロックは変更しない
- `<style>` ブロックは変更しない

**スタイル制約:**
- インラインスタイルを追加しない（Tailwind クラスで対応する）
- 新しいカラーコードを追加しない（パレット外の色を使わない）

**内容制約:**
- `updateFormat.md` の「補足」に記載された禁止事項・制約を守る
- 指示された変更以外の表現・構造を勝手に改善しない

**判断基準（表現に迷ったとき）:**
1. `updateFormat.md` の指示内容を正確に反映する
2. `style.md` のルールに従う
3. 前後の文脈と自然につながる表現にする
4. 余計な語句・要素を追加しない

---

### STEP 8: 完了報告

```
## 更新完了

### 【自動更新】（毎回実施）

| スライド | 結果 |
|---|---|
| サイトマップ | {変更あり / 変更なし（大きな画面遷移に変化なし）} |
| ディレクトリ構成 | {変更あり / 変更なし} |
| Agents 一覧 | {変更あり（Agents N件）/ 変更なし} |
| Skills 一覧 | {変更あり（Skills N件）/ 変更なし} |

### 【updateFormat.md による修正】

{添付あり の場合}
| # | 対象スライド | 変更箇所 | 変更前 | 変更後 |
|---|---|---|---|---|
| 1 | P.X（スライドタイトル） | ... | ... | ... |

{添付なし の場合}
実施なし（updateFormat.md の添付がありませんでした）

---
対象外スライド: 変更なし
```

変更できなかった項目がある場合（指示と HTML の不一致など）はその理由も報告する。

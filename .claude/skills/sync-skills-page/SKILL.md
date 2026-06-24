---
name: sync-skills-page
description: .claude/agents/ と .claude/skills/ の内容を読み取り、dev-environment.html の「Skills・エージェント一覧と役割」ページを最新状態に更新するスキル。
---

# sync-skills-page

`.claude/agents/` と `.claude/skills/` の内容を読み取り、`dev-environment.html` の「Skills・エージェント一覧と役割」スライドを最新状態に更新する。

## トリガー

- `/sync-skills-page`

## 手順

### STEP 1: エージェント定義を読む

`.claude/agents/` 配下の全 `.md` ファイルを読む。
各ファイルから以下を抽出する。

- **名前**: `# ` で始まる最初の見出しテキスト（例: `# QA Agent` → `QA Agent`）
- **説明**: `## Role` 直下のテキスト。なければファイル冒頭の説明文（最初の `#` 見出し直後）
- **出力先パス**: `## Output` 直下に記載されたパス文字列（なければ省略）
- **チェック項目**: `## Check` 直下のリスト（あれば説明の補足に使う）

### STEP 2: スキル定義を読む

**グループ化ルール（重要）:**
`.claude/skills/` 直下のサブディレクトリが、さらに子ディレクトリに分かれている場合（例: `superpowers/brainstorming/`）、そのサブディレクトリ全体を **1枚のグループカード** としてまとめる。
このルールは `superpowers/` に限らず、同様の構造を持つすべてのフォルダに適用する。

**読み込み対象:**

1. **直下の `.md` ファイル** → 個別スキルカード
   - `.claude/skills/*.md`

2. **直下サブディレクトリの `SKILL.md`**（そのサブディレクトリが子ディレクトリを持たない場合）→ 個別スキルカード
   - `.claude/skills/X/SKILL.md`（`X/` の中にさらにサブディレクトリがない場合）

3. **直下サブディレクトリが子ディレクトリを持つ場合** → グループカード1枚
   - 親ディレクトリ名をカード名にする（例: `superpowers`）
   - 各子ディレクトリの `SKILL.md` の `name:` フィールドをリスト形式で列挙する

個別スキルカードから抽出する情報:
- **名前**: フロントマターの `name:` フィールド。なければファイル名から拡張子を除いたもの
- **説明**: フロントマターの `description:` フィールド。なければ `## トリガー` より前の最初の説明段落

表示順: プロジェクト固有スキル（`.md` ファイルと個別カード）を先に列挙し、グループカードを後に続ける。

### STEP 3: 対象スライドを特定する

`dev-environment.html` を読み、以下の両条件を満たす `<div class="slide">` ブロックをすべて特定する。

1. `data-act="Claude for AI Agent"` を持つ
2. ブロック内に `Skills・エージェント一覧と役割` というテキストが含まれる

対象ブロックが複数ある場合（前回更新でページが追加されていた場合）は、全て置き換え対象とする。
対象ブロックが 1 つも見つからない場合は処理を中断し、その旨を報告する。

対象外スライドには一切触れない。

### STEP 4: スライドHTMLを構築する

STEP 1・2 で抽出した内容を使い、以下のルールに従ってスライド HTML を構築する。

**列配置の原則（厳守）:**
- **左列**: Skills のみ（どのページでも右列に Skills を置かない）
- **右列**: Agents のみ（どのページでも左列に Agents を置かない）
- Agents がすべて収まった後のページでも、右列は空のままにする（列ラベルだけ表示してもよい）

**ページ分割の判断基準:**
1 列に収まるカード数をカード高さで推定する。
- スライド有効高さ: 100vh（標準 1080px として算出） − トップバー(6px) − 上パディング pt-8(32px) − 下パディング pb-20(80px) − ヘッダー行(28px) − タイトル行(46px) − 列ラベル(20px) ≒ **868px**
- カード 1 枚の高さ: padding(24px) + タイトル(12px) + 説明(13px) + gap(8px) ≒ **57px**
- 1 列あたりの上限: 916 ÷ 57 ≒ **16 枚**

推定枚数を超えそうな場合は次スライドに送る。説明が長いカードは少なめに見積もること。

**ページヘッダーの連番規則:**
- 1 枚目: `06 — Claude for AI Agent① Skills とエージェント`
- 2 枚目以降: `06 — Claude for AI Agent② Skills とエージェント（続き）`（③④... と増やす）

---

**スライドテンプレート:**

```html
<!-- ── SLIDE N: Skills とエージェント一覧 ── -->
<div class="slide" data-act="Claude for AI Agent">
  <div class="h-1.5 bg-[#E60012]"></div>
  <div class="flex-1 bg-white px-16 py-8 flex flex-col">
    <p class="text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2">{ページヘッダー}</p>
    <h2 class="text-2xl font-bold text-gray-900 mb-4">Skills・エージェント一覧と役割</h2>
    <div class="flex gap-6 flex-1">

      <!-- 左列 -->
      <div class="flex-1 flex flex-col gap-2">
        <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{左列ラベル}</div>
        {左列カード群}
      </div>

      <!-- 右列 -->
      <div class="flex-1 flex flex-col gap-2">
        <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{右列ラベル}</div>
        {右列カード群}
      </div>

    </div>
  </div>
</div>
```

左列ラベル: `Skills（/コマンドで呼び出す追加機能）` または `Skills（続き）`
右列ラベル: `Agents（自律的に動くAIサブエージェント）` または `Skills（続き）`

---

**スキルカード（1件）:**

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-3">
  <div class="text-xs font-semibold text-[#E60012] mb-1">{スキル名}</div>
  <p class="text-xs text-gray-600">{説明}</p>
</div>
```

---

**グループカード（サブフォルダをまとめる場合）:**
内部スキル名を 2 列レイアウトで列挙し、カードの高さを抑える。

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-3">
  <div class="text-xs font-semibold text-[#E60012] mb-2">{フォルダ名}（拡張スキル群）</div>
  <div class="flex gap-4">
    <ul class="text-xs text-gray-600 flex flex-col gap-0.5 flex-1">
      <li><span class="text-gray-400">—</span> {スキル名1}</li>
      <li><span class="text-gray-400">—</span> {スキル名2}</li>
      ...前半
    </ul>
    <ul class="text-xs text-gray-600 flex flex-col gap-0.5 flex-1">
      <li><span class="text-gray-400">—</span> {スキル名N}</li>
      ...後半
    </ul>
  </div>
</div>
```

---

**エージェントカード（出力先パスあり）:**

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-3">
  <div class="flex items-center justify-between mb-1">
    <div class="text-xs font-semibold text-[#E60012]">{エージェント名}</div>
    <code class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">{出力先パス}</code>
  </div>
  <p class="text-xs text-gray-600">{説明}</p>
</div>
```

**エージェントカード（出力先パスなし）:**

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-3">
  <div class="text-xs font-semibold text-[#E60012] mb-1">{エージェント名}</div>
  <p class="text-xs text-gray-600">{説明}</p>
</div>
```

### STEP 5: dev-environment.html を更新する

STEP 3 で特定した対象スライドブロック（複数の場合は連続した全ブロック）を、STEP 4 で構築した HTML に置き換える。

追加スライドが必要な場合は、元の最終対象スライドの直後に挿入する。

**厳守する制約:**
- 対象スライド以外の HTML には一切触れない
- `<style>` ブロックは変更しない
- `<script>` ブロックは変更しない（スライド枚数のカウントは JS が自動で行う）
- インラインスタイルを追加しない
- Tailwind クラス以外の新規クラスを追加しない

### STEP 6: 完了報告

```
## sync-skills-page 完了

更新スライド: SLIDE N「Skills・エージェント一覧と役割」
追加スライド: {追加した場合は枚数と位置}

[Skills] {件数} 件
  - {スキル名}: {説明（冒頭30字）}
  ...

[Agents] {件数} 件
  - {エージェント名}: {説明（冒頭30字）}
  ...

対象外スライド: 変更なし
```

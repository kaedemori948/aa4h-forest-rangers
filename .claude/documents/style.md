# dev-environment.html スタイルガイド v2

> **用途**: ClaudeCodeが `dev-environment.html` を編集する際、このファイルを必ず先に参照してから修正に入ること。スタイルの変更はここに定義した範囲内に留める。

---

## 1. 使用フレームワーク・フォント

| 種別 | 内容 |
|------|------|
| CSSフレームワーク | Tailwind CSS（CDN: `https://cdn.tailwindcss.com`） |
| フォント | Noto Sans JP（Google Fonts） |
| フォントウェイト | 300 / 400 / 500 / 600 / 700 / 900 |
| 基本フォント指定 | `* { font-family: 'Noto Sans JP', sans-serif; }` |

---

## 2. カラーパレット

### ブランドカラー（変更禁止）

| 役割 | 値 | 使用箇所 |
|------|----|---------|
| アクセント赤 | `#E60012` | 上部バー、ラベル、アクセント要素、SVGの強調線 |
| 赤（淡） | `#fff5f5` | ClaudeCode強調カードの背景 |
| 赤（テキスト用） | `#fecaca` | 表紙スライドのサブテキスト（赤背景上） |

### テキストカラー

| 役割 | 値 | Tailwind相当 |
|------|----|-------------|
| 見出し（最強） | `#1e293b` | `text-gray-900` 相当 |
| 本文 | `#374151` / `#475569` | `text-gray-700` / `text-gray-600` |
| サブテキスト | `#6b7280` | `text-gray-500` |
| 補足・弱テキスト | `#94a3b8` | `text-gray-400` |
| 最弱（非アクティブ） | `#d1d5db` | `text-gray-300` |

### 背景・ボーダーカラー

| 役割 | 値 | Tailwind相当 |
|------|----|-------------|
| ページ背景 | `#f1f5f9` | `bg-slate-100` |
| スライド本体 | `#ffffff` | `bg-white` |
| カード背景（グレー） | `#f8fafc` | `bg-gray-50` |
| ボーダー（強） | `#e2e8f0` | `border-gray-200` |
| ボーダー（弱） | `#94a3b8` | `border-gray-300` |

### 特殊用途カラー

| 役割 | 値 | 使用箇所 |
|------|----|---------|
| リーダーバッジ | `#3b82f6` / blue-300/400/500 | リーダー担当ステップのバッジ・ボーダー |
| 注釈背景（黄） | `#fef9c3` | GitHub Auth注釈ボックス背景 |
| 注釈ボーダー（黄） | `#fbbf24` | GitHub Auth注釈ボックスボーダー |
| 注釈テキスト（茶） | `#92400e` / `#78350f` | GitHub Auth注釈内テキスト |

---

## 3. レイアウト

### スライド基本構造

```
<div class="slide [active]" data-act="セクション名">
  <div class="h-1.5 bg-[#E60012]">           ← 上部アクセントバー（6px）
  <div class="flex-1 bg-white px-16 py-8 flex flex-col">  ← コンテンツ領域
    ...
  </div>
</div>
```

- スライドサイズ: `width: 100vw; height: 100vh`
- レイアウト方向: `flex-direction: column`
- コンテンツパディング: `px-16 py-8`（通常）/ `px-16 py-10`（余白多めスライド）
- 上部アクセントバー: `h-1.5 bg-[#E60012]`（必ず全スライドに付ける）

### 固定UIオブジェクト（no-print）

#### ナビゲーション（下部中央）
```html
<div class="no-print fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50
            bg-white/95 backdrop-blur rounded-full px-5 py-2.5 shadow-lg border border-gray-200">
  <button id="prev"> ← </button>
  <div id="dots"></div>   <!-- ドットインジケーター -->
  <button id="next"> → </button>
</div>
```
- 矢印ボタン: `w-7 h-7 text-gray-400 hover:text-[#E60012] transition-colors`
- アクティブドット: `width:18px; height:6px; border-radius:3px; background:#E60012`
- 非アクティブドット: `width:6px; height:6px; border-radius:3px; background:#D1D5DB`

#### スライドカウンター（右上）
```html
<div class="no-print fixed top-4 right-6 text-xs text-gray-400 z-50" id="counter"></div>
```

#### セクションラベル（左上）
```html
<div class="no-print fixed top-4 left-6 text-xs text-gray-400 tracking-widest uppercase z-50" id="act-label"></div>
```

---

## 4. タイポグラフィ

### スライド内テキスト階層

| 役割 | クラス | 使用箇所 |
|------|--------|---------|
| セクションラベル | `text-xs font-semibold tracking-widest text-[#E60012] uppercase` | 各スライド上部の番号付きラベル |
| 大見出し（表紙） | `text-6xl font-black text-gray-900` | 表紙タイトルのみ |
| 中見出し | `text-3xl font-bold text-gray-900 leading-snug` | 左カラム見出し系 |
| 小見出し（スライドタイトル） | `text-2xl font-bold text-gray-900` | 各スライドのメイン見出し |
| カード内ラベル | `text-xs font-semibold uppercase tracking-widest text-gray-400` | カード内セクション名 |
| 本文 | `text-sm text-gray-600 leading-relaxed` | 説明テキスト全般 |
| 本文（行間広め） | `text-sm text-gray-600 leading-loose` | 余白が必要な説明 |
| 補足テキスト | `text-xs text-gray-400` | 注記・補足 |

### セクションラベルフォーマット
```
{番号} — {セクション名}
例: "01 — プロジェクト目的 / 概要"
例: "03 — 開発フロー① ツール関係図"
```

---

## 5. コンポーネント

### カード

#### グレーカード（標準）
```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
  <div class="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest">ラベル</div>
  ...
</div>
```

#### 赤カード（強調）
```html
<div class="bg-red-50 border border-red-200 rounded-xl p-6">
  <div class="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-widest">ラベル</div>
  ...
</div>
```

#### サイドバーカード（p-4 小サイズ）
```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
  <div class="text-xs font-bold text-[#E60012] mb-1">タイトル</div>
  <p class="text-xs text-gray-600">...</p>
</div>
```

### アクセントライン（水平区切り）
```html
<div class="w-16 h-1 bg-[#E60012] my-5"></div>   <!-- 大 -->
<div class="w-10 h-0.5 bg-[#E60012] my-5"></div>  <!-- 小 -->
```

### リストアイテム（赤ダッシュ）
```html
<li class="flex gap-3 text-sm text-gray-600">
  <span class="text-[#E60012] font-bold shrink-0">—</span>
  テキスト
</li>
```

### テクノロジーバッジ（pill）
```html
<span class="bg-white border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-600">バッジ名</span>
```

### コードインライン
```html
<code class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">コード</code>
```

### 目次アイテム
```html
<div class="flex items-start gap-4 py-3 border-b border-gray-100">
  <span class="text-[#E60012] font-bold text-sm w-6 shrink-0">01</span>
  <span class="text-gray-700 font-medium">項目名</span>
</div>
```

---

## 6. ステップフロー（担当者別スタイル）

### ロールバッジ

| 担当者 | バッジクラス |
|--------|------------|
| 人間 | `border-2 border-gray-400 rounded px-2 py-0.5 text-xs font-semibold text-gray-600` |
| ClaudeCode | `bg-red-50 border-2 border-[#E60012] text-[#E60012] rounded px-2 py-0.5 text-xs font-semibold` |
| リーダー | `border-2 border-blue-400 rounded px-2 py-0.5 text-xs font-semibold text-blue-500` |

### ステップカード外枠

| 担当者 | カードクラス |
|--------|------------|
| 人間 | `border-2 border-gray-300 rounded-xl p-5` |
| ClaudeCode | `bg-red-50 border-2 border-[#E60012] rounded-xl p-5` |
| リーダー | `border-2 border-blue-300 rounded-xl p-5` |

### ステップラベル

| 担当者 | テキストクラス |
|--------|--------------|
| 人間 | `text-xs font-bold text-gray-400 tracking-widest` |
| ClaudeCode | `text-xs font-bold text-[#E60012] tracking-widest` |
| リーダー | `text-xs font-bold text-blue-400 tracking-widest` |

### 矢印（ステップ間）
```html
<div class="flex items-center text-gray-300 text-2xl shrink-0">→</div>
```

---

## 7. SVGダイアグラム

### ノードスタイル

| 種別 | fill | stroke | stroke-width |
|------|------|--------|-------------|
| 通常ノード | `#f8fafc` | `#64748b` or `#94a3b8` | `1.5` |
| 強調ノード（赤） | `#fff5f5` | `#E60012` | `2` |
| 主要ノード（赤塗り） | `#E60012` | なし | — |
| 注釈ボックス（黄） | `#fef9c3` | `#fbbf24` | `1.5` |

### 線・矢印スタイル

| 種別 | stroke | stroke-width | 備考 |
|------|--------|-------------|------|
| 通常フロー線 | `#94a3b8` or `#64748b` | `1.5` | |
| 強調フロー線 | `#E60012` | `1.5` | API呼び出し等 |
| 点線 | `#94a3b8` or `#64748b` | `1.5` | `stroke-dasharray="4,2"` or `"3,2"` |
| 赤点線 | `#E60012` | `1.5` | `stroke-dasharray="5,3"` |
| メインブランチ線 | `#1e293b` | `3` | |
| weeklyブランチ線 | `#E60012` | `2.5` | |

### SVGテキストスタイル

| 種別 | font-size | font-weight | fill |
|------|-----------|-------------|------|
| ノード見出し | `12` or `13` | `700` | `#1e293b` |
| ノード補足 | `10` | — | `#6b7280` |
| 線ラベル | `9` or `10` | — | `#6b7280` or `#E60012` |
| 注釈ヘッダー | `10` | `700` | `#92400e` |
| 注釈テキスト | `9` | — | `#78350f` |

### 矢印マーカー定義（標準2種）
```xml
<defs>
  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
  </marker>
  <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#E60012"/>
  </marker>
</defs>
```

---

## 8. ディレクトリ表示（モノスペースブロック）

```html
<div class="bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-xs leading-7 overflow-auto">
  <div class="text-gray-400 mb-2"># コメント行</div>
  <div><span class="text-[#E60012]">ルートフォルダ/</span></div>
  <div class="pl-4"><span class="text-blue-600">├─ 第1階層/</span></div>
  <div class="pl-8"><span class="text-blue-500">├─ 第2階層/</span> <span class="text-gray-400 font-sans">— 説明</span></div>
  <div class="pl-12"><span class="text-gray-500">└─ 第3階層以降/</span></div>
  <div class="pl-4"><span class="text-gray-700">├─ ファイル名</span> <span class="text-gray-400 font-sans">— 説明</span></div>
</div>
```

### ディレクトリ色分けルール

| 階層 | クラス |
|------|--------|
| ルートフォルダ | `text-[#E60012]` |
| 第1階層フォルダ | `text-blue-600` |
| 第2階層フォルダ | `text-blue-500` |
| 第3階層以降フォルダ | `text-gray-500` |
| ファイル | `text-gray-700` |
| 説明テキスト | `text-gray-400 font-sans`（モノスペース解除） |

---

## 9. アニメーション

### スライド切り替え
```css
.slide.active { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

### ドット切り替え（JS内）
```js
'transition:all 0.25s'
```

---

## 10. 印刷対応

```css
@media print {
  body { overflow: visible; background: white; }
  .slide { display: flex !important; }
  .no-print { display: none !important; }
  @page { size: landscape; margin: 0; }
}
```

- `no-print` クラス: ナビゲーション・カウンター・ラベルに付与。印刷時に非表示にする要素はこのクラスを使う。

---

## 11. 修正時の禁止事項

- フォントを `Noto Sans JP` 以外に変更しない
- `#E60012` を別の赤系カラーに置き換えない
- スライドの上部アクセントバー（`h-1.5 bg-[#E60012]`）を削除・変更しない
- ナビゲーション（ドット・矢印・カウンター）のUIを勝手に変更しない
- インラインスタイルを追加しない（Tailwindクラスで対応する）
- 各スライドの `data-act` 属性値を不用意に変更しない（セクションラベルと連動している）

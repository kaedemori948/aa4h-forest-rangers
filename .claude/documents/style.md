# Style

## フォント
- Noto Sans JP (Google Fonts): wght 300, 400, 500, 600, 700, 900
- 全要素に適用

## ライブラリ
- Tailwind CSS (CDN)

## カラー
- アクセント: #E60012（赤）
- テキスト（見出し）: gray-900
- テキスト（本文）: gray-600
- テキスト（補足）: gray-500, gray-400
- 背景（通常）: white
- 背景（強調）: red-50
- 背景（サブ）: gray-50
- ボーダー（通常）: gray-200
- ボーダー（強調）: #E60012

## スライド共通レイアウト
- 各スライドは `.slide` クラスを持つ `<div>`
- 上部に高さ1.5の赤いバー（`h-1.5 bg-[#E60012]`）
- `.slide.active` のときのみ表示（`display: flex; flex-direction: column`）
- アニメーション: fadeIn 0.3s ease
- `data-act` 属性にセクション名を設定（カバーは空文字列）

## ナビゲーション
- 画面下部中央に固定（no-printクラスでprint時非表示）
- ← → ボタン＋ドットインジケーター
- 右上: スライド番号カウンター（例: 1 / 6）
- 左上: セクション名ラベル
- キーボード: ArrowRight/Down/Space で次へ、ArrowLeft/Up で前へ

## セクションラベルのフォーマット
- `text-xs font-semibold tracking-widest text-[#E60012] uppercase`
- 形式: `{act名} — 01 / 01`（カバースライドを除く）

## カードスタイル
- 通常カード: `bg-gray-50 border border-gray-200 rounded-xl p-6`
- 強調カード: `bg-red-50 border border-red-200 rounded-xl p-6`

## リストアイテムスタイル
- `<li class="flex gap-3 text-sm text-gray-600"><span class="text-[#E60012] font-bold shrink-0">—</span>{テキスト}</li>`

## コードラベルスタイル
- `<code class="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-xs">`

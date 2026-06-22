# Flow

## スライド設定
- data-act: "Flow"
- セクションラベル: Flow — 01 / 01

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### ヘッダー（flex items-baseline justify-between mb-6）

**左側**
- セクションラベル: Flow — 01 / 01
- 見出し（text-3xl font-bold text-gray-900）: 開発フロー

**右側 凡例（flex items-center gap-5 text-xs text-gray-500）**
- 人間バッジ（`border-2 border-gray-400 rounded px-2 py-0.5 font-semibold text-gray-600`）: 人間 → テスター・開発者チームが担当
- ClaudeCodeバッジ（`bg-red-50 border-2 border-[#E60012] text-[#E60012] rounded px-2 py-0.5 font-semibold`）: ClaudeCode → AIが自動で担当

### ステップ行（flex items-stretch gap-2）

各ステップは `flex-1 rounded-xl p-5 flex flex-col` のカード。
ステップ間は `→`（text-gray-300 text-2xl shrink-0）で接続。

**STEP 01**
- スタイル: `border-2 border-gray-300`（人間担当）
- バッジ: 人間
- タイトル: ユーザーテスト実施
- 説明: テスト指示文に従い、特定アセットへ素早くたどり着けるか検証する

**STEP 02**
- スタイル: `bg-red-50 border-2 border-[#E60012]`（ClaudeCode担当）
- バッジ: ClaudeCode
- タイトル: 修正案を作成
- 説明: テスト結果を受けて、UI改善の修正案をまとめる

**STEP 03**
- スタイル: `bg-red-50 border-2 border-[#E60012]`（ClaudeCode担当）
- バッジ: ClaudeCode
- タイトル（上部）: コード修正
- 説明（上部）: 新ブランチを切り、修正案をもとにフロントのコードを修正する
- 区切り（`border-t border-red-200 pt-3`）
- タイトル（下部）: 次回テスト指示文を作成
- 説明（下部）: 次のサイクルで使うテスト指示文を複数パターン生成する

**STEP 04**
- スタイル: `bg-red-50 border-2 border-[#E60012]`（ClaudeCode担当）
- バッジ: ClaudeCode
- タイトル: 自動テスト ＋ PR作成
- 説明: GitHub Actionsで自動テストを実行。パスしたものだけmainへPRを作成する

**STEP 05**
- スタイル: `border-2 border-gray-300`（人間担当）
- バッジ: 人間
- タイトル: レビュー ＆ マージ
- 説明: 開発者チームがPRを確認し、mainにマージする


**STEP 06**
- スタイル: `border-2 border-blue-300`（リーダー担当）
- バッジ: リーダー
- タイトル: 品質管理
- 説明: ああああああああああああああああああ


### ループ矢印（SVG）
- コンテナ: `w-full` style="height:44px;"
- SVG viewBox="0 0 1000 44" preserveAspectRatio="none"
- パス: STEP05からSTEP01へ戻るU字矢印
  - path: `M 960 4 L 960 28 Q 960 40 944 40 L 56 40 Q 40 40 40 28 L 40 4`
  - stroke: #E60012, stroke-width: 3
  - 下矢印（右端）: polygon points="960,8 954,0 966,0" fill="#E60012"
  - 上矢印（左端）: polygon points="40,0 34,14 46,14" fill="#E60012"
- ループ説明文（text-xs font-semibold text-[#E60012] 中央寄せ）:
  - テキスト: ↺　STEP05完了後、STEP03で生成した新しいテスト指示文でSTEP01に戻り、何周もくり返す

### ステップカード内ヘッダー構造
- `flex items-center justify-between mb-3`
- 左: ステップ番号ラベル
  - 人間担当: `text-xs font-bold text-gray-400 tracking-widest`
  - ClaudeCode担当: `text-xs font-bold text-[#E60012] tracking-widest`
- 右: バッジ
  - 人間: `border-2 border-gray-400 rounded px-2 py-0.5 text-xs font-semibold text-gray-600`
  - ClaudeCode: `bg-red-50 border-2 border-[#E60012] text-[#E60012] rounded px-2 py-0.5 text-xs font-semibold`

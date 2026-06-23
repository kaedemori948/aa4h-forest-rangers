# Flow

## スライド設定
- data-act: "Flow"
- セクションラベル: 03 — 開発フロー② UI/UX改善フロー

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### ヘッダー（flex items-baseline justify-between mb-6）

**左側**
- セクションラベル: 03 — 開発フロー② UI/UX改善フロー
- 見出し（text-2xl font-bold text-gray-900）: UI/UX 改善サイクル

**右側 凡例（flex items-center gap-5 text-xs text-gray-500）**
- 人間バッジ（`border-2 border-gray-400 rounded px-2 py-0.5 font-semibold text-gray-600`）: 人間 → テスター・開発者チームが担当
- ClaudeCodeバッジ（`bg-red-50 border-2 border-[#E60012] text-[#E60012] rounded px-2 py-0.5 font-semibold`）: ClaudeCode → AIが自動で担当
- リーダーバッジ（`border-2 border-blue-300 rounded px-2 py-0.5 font-semibold text-blue-500`）: リーダー → リーダーが担当

### ステップ行（flex items-stretch gap-2）

各ステップは `flex-1 rounded-xl p-5 flex flex-col` のカード。
ステップ間は `→`（text-gray-300 text-2xl shrink-0）で接続。

**STEP 01**
- スタイル: `border-2 border-gray-300`（人間担当）
- バッジ: 人間
- タイトル: 利用 & FBフォーム入力
- 説明: 実際にAIAgentサイトを利用し、気づいた要望・不具合をフィードバックフォームへ入力する

**STEP 02**
- スタイル: `border-2 border-gray-300`（人間担当）
- バッジ: 人間
- タイトル: Issue起票（ラベル管理）
- 説明: FBをもとにGitHub Issueを起票。ラベル（bug / enhancement 等）で分類・優先度管理する

**STEP 03**
- スタイル: `bg-red-50 border-2 border-[#E60012]`（ClaudeCode担当）
- バッジ: ClaudeCode
- タイトル: 実装
- 説明: Issueを読んで新ブランチを切り、フロントのコードを修正する。自動テストも実行する

**STEP 04**
- スタイル: `bg-red-50 border-2 border-[#E60012]`（ClaudeCode担当）
- バッジ: ClaudeCode
- タイトル: PR作成
- 説明: テスト通過後、weeklyブランチへPRを作成する

**STEP 05**
- スタイル: `border-2 border-blue-300`（リーダー担当）
- バッジ: リーダー
- タイトル: 承認 & マージ
- 説明: リーダーがPRをレビューし、weeklyブランチへマージする。週次でmainへデプロイ

### ループ矢印（SVG）
- コンテナ: `w-full` style="height:44px;"
- SVG viewBox="0 0 1000 44" preserveAspectRatio="none"
- パス: STEP05からSTEP01へ戻るU字矢印
  - path: `M 960 4 L 960 28 Q 960 40 944 40 L 56 40 Q 40 40 40 28 L 40 4`
  - stroke: #E60012, stroke-width: 3
  - 下矢印（右端）: polygon points="960,8 954,0 966,0" fill="#E60012"
  - 上矢印（左端）: polygon points="40,0 34,14 46,14" fill="#E60012"
- ループ説明文（text-xs font-semibold text-[#E60012] 中央寄せ）:
  - テキスト: ↺　承認・マージ後、継続的に改善サイクルを繰り返す

### ステップカード内ヘッダー構造
- `flex items-center justify-between mb-3`
- 左: ステップ番号ラベル
  - 人間担当: `text-xs font-bold text-gray-400 tracking-widest`
  - ClaudeCode担当: `text-xs font-bold text-[#E60012] tracking-widest`
  - リーダー担当: `text-xs font-bold text-blue-400 tracking-widest`
- 右: バッジ
  - 人間: `border-2 border-gray-400 rounded px-2 py-0.5 text-xs font-semibold text-gray-600`
  - ClaudeCode: `bg-red-50 border-2 border-[#E60012] text-[#E60012] rounded px-2 py-0.5 text-xs font-semibold`
  - リーダー: `border-2 border-blue-400 rounded px-2 py-0.5 text-xs font-semibold text-blue-500`

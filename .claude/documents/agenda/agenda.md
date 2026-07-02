# Agenda

## スライド設定
- data-act: "目次"
- セクションラベル: なし（ラベル英語のみ）

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-10 flex flex-col）

## コンテンツ

### 英語ラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-4`
- テキスト: Agenda

### 見出し
- スタイル: `text-3xl font-bold text-gray-900 mb-8`
- テキスト: 目次

### 目次リスト（flex gap-16 flex-1）
縦並びのアイテムリスト（flex flex-col gap-3 flex-1）

各アイテムは `flex items-start gap-4 py-3 border-b border-gray-100` のレイアウト。
番号スタイル: `text-[#E60012] font-bold text-sm w-6 shrink-0`
テキストスタイル: `text-gray-700 font-medium`

#### 01 AIAgentサイトの利用フロー
- テキスト: AIAgentサイトの利用フロー

#### 02 プロジェクト目的 / 概要
- テキスト: プロジェクト目的 / 概要

#### 03 開発フロー
- テキスト（親）: 開発フロー
- サブ項目（flex flex-col gap-1 pl-2、スタイル: `text-xs text-gray-400`）:
  - — ツール関係図（GitHub / AIAgentサイト / GitHub Pages / KMPF / VSCode）
  - — UI/UX改善フロー（利用 → FB → Issue → 実装 → PR → 承認）
  - — ブランチ構成（main / weekly / PR）

#### 04 AIAgentサイト サイトマップ
- テキスト: AIAgentサイト サイトマップ

#### 05 ディレクトリ構成
- テキスト: ディレクトリ構成

#### 06 Claude for AI Agent
- テキスト（親）: Claude for AI Agent
- サブ項目:
  - — Skills とエージェントの一覧と役割
  - — 利用可能なコマンドと実行後の処理

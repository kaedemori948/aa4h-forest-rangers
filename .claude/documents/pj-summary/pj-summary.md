# PJ Summary

## スライド設定
- data-act: "Overview"
- セクションラベル: 02 — プロジェクト目的 / 概要

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-10 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-4`
- テキスト: 02 — プロジェクト目的 / 概要

### 2カラム構成（flex gap-14 flex-1 items-start）

#### 左カラム（w-64 shrink-0）
- 見出し: `text-3xl font-bold text-gray-900 leading-snug`
  - テキスト: プロジェクト<br>概要
- 区切り線: `w-10 h-0.5 bg-[#E60012] my-5`
- 説明文: `text-sm text-gray-600 leading-loose`
  - テキスト: 既存システムの機能はそのままに、操作性・視認性を改善し、業務効率の向上を目指す

#### 右カラム（flex-1 flex flex-col gap-4）

**カード1: 目的（bg-red-50 border border-red-200）**
- ラベル: 目的
- 本文: AIAgentサイトのUI/UXを刷新する。既存システムの機能はそのままに、操作性・視認性を改善し、業務効率の向上を目指す。

**カード2: アーキテクチャ（bg-gray-50 border border-gray-200）**
- ラベル: アーキテクチャ
- リスト:
  - フロントエンドのみを実装し、クライアントの既存APIを呼び出して画面を表示する
  - バックエンド・APIはクライアント側が管理（本プロジェクトでは触らない）
  - モックデータと本番API呼び出しを差し替えやすい構造にし、開発中はモックで動作確認する

**カード3: 技術スタック（bg-gray-50 border border-gray-200）**
- ラベル: 技術スタック
- タグ一覧（`bg-white border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-600`）:
  - HTML
  - CSS
  - バニラJS
  - CSS変数（--プレフィックス）
  - セマンティックタグ
  - フレームワーク不使用

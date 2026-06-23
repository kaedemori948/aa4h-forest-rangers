# Sitemap

## スライド設定
- data-act: "Sitemap"
- セクションラベル: 04 — AIAgentサイト サイトマップ

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2`
- テキスト: 04 — AIAgentサイト サイトマップ

### 見出し
- スタイル: `text-2xl font-bold text-gray-900 mb-6`
- テキスト: 画面構成と各ページの役割

### 2カラム構成（flex-1 flex items-start gap-8）

#### 左: SVGサイトマップ図（flex-1、viewBox="0 0 680 340"）

ノード構成（全て rx="10"）:

**ホーム**（赤塗り）
- 位置: x=250 y=10 w=180 h=52
- スタイル: fill="#E60012"
- ラベル: ホーム（fill="#fff"）/ index.html（fill="#fecaca"）

**エージェント一覧**
- 位置: x=30 y=110 w=160 h=52
- ラベル: エージェント一覧 / agents.html

**エージェント詳細**
- 位置: x=30 y=185 w=160 h=52
- ラベル: エージェント詳細 / agent.html

**新着一覧**
- 位置: x=250 y=110 w=180 h=52
- ラベル: 新着一覧 / agents.html?sort=newest

**要望フォーム**
- 位置: x=490 y=110 w=160 h=52
- ラベル: 要望フォーム / feedback.html

**カテゴリ / 検索 / ソート**（黄色ボックス）
- 位置: x=30 y=260 w=160 h=52
- スタイル: fill="#fef9c3" stroke="#fbbf24"
- テキスト: カテゴリ / 検索 / ソート
- サブ: 同一画面内での絞り込み

接続線（stroke="#94a3b8" stroke-width="1.5"）:
- ホーム → エージェント一覧 / 新着一覧 / 要望フォーム（水平分岐 y=90）
- エージェント一覧 → エージェント詳細 → カテゴリ/検索/ソート（縦接続）

#### 右: ページ役割説明（w-72 flex flex-col gap-3）

**ホーム（bg-red-50 border border-red-200 rounded-xl p-4）**
- ラベル（text-xs font-bold text-[#E60012]）: ホーム
- テキスト: プロデューサーズピック・カテゴリ一覧・人気ランキング・新着を表示。サイト全体のエントリーポイント

**エージェント一覧（bg-gray-50 border border-gray-200 rounded-xl p-4）**
- ラベル（text-xs font-bold text-gray-700）: エージェント一覧
- テキスト: 全エージェントをキーワード検索・カテゴリフィルター・ソート（人気/新着/いいね）で横断検索できる画面

**エージェント詳細（bg-gray-50 border border-gray-200 rounded-xl p-4）**
- ラベル: エージェント詳細
- テキスト: 各エージェントのプロンプト・使い方・評価などの詳細情報を表示する画面

**要望フォーム（bg-gray-50 border border-gray-200 rounded-xl p-4）**
- ラベル: 要望フォーム
- テキスト: 利用者がUI改善要望・新規エージェントリクエストを送信できるフォーム。入力内容がGitHub Issueへ連携される

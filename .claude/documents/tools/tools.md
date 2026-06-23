# Tools

## スライド設定
- data-act: "Flow"
- セクションラベル: 03 — 開発フロー① ツール関係図

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2`
- テキスト: 03 — 開発フロー① ツール関係図

### 見出し
- スタイル: `text-2xl font-bold text-gray-900 mb-6`
- テキスト: GitHub / AIAgentサイト / Vercel / KMPF / VSCode の関係

### SVG関係図（viewBox="0 0 860 380"）

#### ノード（全て rx="12"）

**中央: AIAgentサイト（赤枠強調）**
- 位置: x=320 y=140 w=220 h=70
- スタイル: fill="#fff" stroke="#E60012" stroke-width="2.5"
- ラベル: AIAgentサイト（font-weight="700" fill="#E60012"）
- サブ: フロントエンド（HTML/CSS/JS）/ 社内システムUI/UX刷新

**左: GitHub**
- 位置: x=60 y=140 w=180 h=70
- スタイル: fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"
- ラベル: GitHub
- サブ: ソースコード管理 / Issue / PR / Branch

**下: Vercel（仮）**
- 位置: x=320 y=270 w=220 h=70
- スタイル: fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"
- ラベル: Vercel（仮）
- サブ: ホスティング・公開 / mainブランチを自動デプロイ

**右: KMPF**
- 位置: x=620 y=140 w=180 h=70
- スタイル: fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"
- ラベル: KMPF
- サブ: 既存API群 / クライアント管理・変更不可

**上: VSCode**
- 位置: x=320 y=20 w=220 h=70
- スタイル: fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"
- ラベル: VSCode
- サブ: ソース閲覧・編集 / コードレビュー・マージ操作

#### 矢印
- GitHub → AIAgentサイト: 「デプロイ元」灰色矢印
- AIAgentサイト → Vercel: 「公開」灰色矢印
- AIAgentサイト → KMPF: 「API呼び出し」赤破線矢印（#E60012 stroke-dasharray="5,3"）
- VSCode → GitHub: 「push / PR」灰色矢印
- VSCode → AIAgentサイト: 「編集」灰色矢印

#### 注釈ボックス（GitHub Auth）
- 位置: x=580 y=270 w=240 h=60
- スタイル: fill="#fef9c3" stroke="#fbbf24" stroke-width="1.5"
- タイトル: 📌 GitHub Auth
- テキスト: AIAgentサイトへのログインはGitHub認証（OAuth）を利用

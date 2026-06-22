# Agents

## スライド設定
- data-act: "Agents"
- セクションラベル: Agents — 01 / 01

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-10 flex flex-col）

## コンテンツ

### セクションラベル
- テキスト: Agents — 01 / 01

### 見出し
- スタイル: `text-3xl font-bold text-gray-900 mb-2`
- テキスト: AIエージェント

### サブタイトル
- スタイル: `text-sm text-gray-500 mb-6`
- テキスト: 品質・修正・セキュリティを専門エージェントが並列で担当する

### 3カラムグリッド（grid grid-cols-3 gap-4 flex-1）

#### カード1: QA Agent
- ラベル（text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-4）: QA Agent
- 見出し（font-bold text-gray-900 text-lg mb-3）: 品質検査
- リスト:
  - UI操作
  - 入力処理
  - JSイベント
  - レスポンシブ
  - エラー処理
- フッター:
  - ラベル: 出力先
  - コード: `.claude/reports/qa/`

#### カード2: Fixer Agent
- ラベル: Fixer Agent
- 見出し: 修正担当
- リスト:
  - 問題一覧を入力として受け取る
  - 原因確認
  - コード修正
  - git diff で説明
- フッター:
  - ラベル: 入力元
  - コード: `.claude/reports/`

#### カード3: Security Agent
- ラベル: Security Agent
- 見出し: セキュリティ監査
- リスト:
  - XSS
  - innerHTML
  - APIキー漏洩
  - localStorage
  - 外部通信
- フッター:
  - ラベル: 出力先
  - コード: `.claude/reports/security/`

### カードスタイル詳細
- 各カード: `bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col`
- フッター区切り: `mt-4 pt-4 border-t border-gray-200`
- フッターラベル: `text-xs text-gray-400`
- フッターコード: `text-xs bg-gray-100 border border-gray-200 px-2 py-1 rounded mt-1 block`

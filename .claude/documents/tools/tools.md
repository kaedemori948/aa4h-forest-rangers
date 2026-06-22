# Tools

## スライド設定
- data-act: "Tools"
- セクションラベル: Tools — 01 / 01

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-10 flex flex-col）

## コンテンツ

### セクションラベル
- テキスト: Tools — 01 / 01

### 見出し
- スタイル: `text-3xl font-bold text-gray-900 mb-2`
- テキスト: 開発ツール構成

### サブタイトル
- スタイル: `text-sm text-gray-500 mb-6`
- テキスト: 各ツールの役割と使い方の方針

### テーブル（w-full border-collapse flex-1）

#### ヘッダー行
- ツール（w-36）
- 役割（w-52）
- 備考

#### データ行

**01 Claude Code**
- 役割: AIによるフロントエンド実装
- 備考: CLAUDE.md・Skills・Agentsを設定して使用。GitHubのIssueを読んでコードを自動生成する

**02 VSCode**
- 役割: コード確認・Git操作
- 備考: 実装はClaudeCodeに任せ、人間はコードの確認・レビュー・マージに集中する

**03 GitHub**
- 役割: ソースコード管理
- 備考: Issueを起票して要件を管理。ブランチ・PRベースのレビューフローを採用

**04 GitHub Actions**
- 役割: 自動テスト・PR制御
- 備考: テスト・Lint・セキュリティチェックを自動実行。すべてパスしたものだけPR可能にする

#### テーブルスタイル詳細
- ヘッダーセル: `text-left py-3 px-4 text-xs text-gray-400 uppercase tracking-widest font-medium`
- 行区切り: `border-b border-gray-100`（最終行を除く）
- 番号: `text-xs text-[#E60012] mb-1`
- ツール名: `font-semibold text-gray-900`
- 役割・備考テキスト: `text-sm text-gray-600`

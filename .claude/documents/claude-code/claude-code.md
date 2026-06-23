# Claude Code

## スライド設定
- data-act: "Claude for AI Agent"
- セクションラベル: 06 — Claude for AI Agent① Skills とエージェント

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2`
- テキスト: 06 — Claude for AI Agent① Skills とエージェント

### 見出し
- スタイル: `text-2xl font-bold text-gray-900 mb-5`
- テキスト: Skills・エージェント一覧と役割

### 2カラム構成（flex gap-6 flex-1）

#### 左カラム: Skills（flex-1 flex flex-col gap-3）

カラムラベル（`text-xs font-bold text-gray-400 uppercase tracking-widest mb-1`）:
- テキスト: Skills（/コマンドで呼び出す追加機能）

各カードスタイル: `bg-gray-50 border border-gray-200 rounded-xl p-4`
ラベルスタイル: `text-xs font-semibold text-[#E60012] mb-1`

**issue-to-impl**
- GitHub IssueのURLを受け取り、内容を読んでブランチ作成→コード修正→コミットまで自動で行う

**ship**
- 実装完了後にPRを作成してデプロイまでのフローを実行する

**frontend-design**
- UI/UX実装に特化した指示パターンを提供。デザイン品質を一定に保つ

**superpowers（拡張スキル群）**
- brainstorming：ブレインストーミング支援
- systematic-debugging：体系的デバッグ手順
- test-driven-development：TDD実践支援
- dispatching-parallel-agents：並列エージェント実行
- using-git-worktrees：Git Worktree活用

#### 右カラム: Agents（flex-1 flex flex-col gap-3）

カラムラベル（`text-xs font-bold text-gray-400 uppercase tracking-widest mb-1`）:
- テキスト: Agents（自律的に動くAIサブエージェント）

各カードスタイル: `bg-gray-50 border border-gray-200 rounded-xl p-4`
カードヘッダー: `flex items-center justify-between mb-1`
ラベルスタイル: `text-xs font-semibold text-[#E60012]`
出力先コード: `text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded`

**QA Agent**
- 出力先: `.claude/reports/qa/`
- UI操作・入力処理・JSイベント・レスポンシブ・エラー処理の品質検査を担当

**Fixer Agent**
- 出力先: `.claude/reports/`
- QA/Securityレポートを入力に受け取り、原因確認→コード修正→git diff説明を行う

**Security Agent**
- 出力先: `.claude/reports/security/`
- XSS・innerHTML・APIキー漏洩・localStorage・外部通信のセキュリティ監査を担当

**UI Analyst Agent**
- UIの使いやすさ・視認性を分析し、改善提案をまとめるエージェント

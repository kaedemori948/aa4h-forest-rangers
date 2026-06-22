# Claude Code

## スライド設定
- data-act: "Claude Code"
- セクションラベル: Claude Code — 01 / 01

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-10 flex flex-col）

## コンテンツ

### セクションラベル
- テキスト: Claude Code — 01 / 01

### 2カラム構成（flex gap-14 flex-1 items-start）

#### 左カラム（w-64 shrink-0）
- 見出し: `text-3xl font-bold text-gray-900 leading-snug`
  - テキスト: Claude Code<br>設定
- 区切り線: `w-10 h-0.5 bg-[#E60012] my-5`
- 説明文: `text-sm text-gray-600 leading-loose`
  - テキスト: CLAUDE.md・Skills・Agentsの3層構造でClaudeCodeの挙動を制御する

#### 右カラム（flex-1 flex flex-col gap-4）

**カード1: CLAUDE.md（bg-gray-50 border border-gray-200）**
- ラベル（text-xs text-[#E60012] font-semibold mb-2）: CLAUDE.md（コーディング規約・プロジェクト情報）
- リスト:
  - クライアントからもらったモックを元に、ClaudeCodeでWEBサイトの叩き台を作成
  - 叩き台をClaudeCodeに読み込ませてCLAUDE.md案を生成 → 手で修正して完成
  - 記載内容：プロジェクト概要・技術スタック・CSSルール・JSルール・コメント規約・自動化パイプラインの説明
  - リポジトリのルートに配置。ClaudeCodeが毎回参照するため、規約変更時はここを更新する

**カード2: Skills（bg-gray-50 border border-gray-200）**
- ラベル: Skills（ClaudeCodeの追加機能）
- リスト:
  - **superpowers**：ClaudeCodeの標準機能を拡張するスキルセット
  - **frontend-design**：UI/UX実装に特化した指示パターンを提供

**カード3: Agents定義ファイルの置き場所（bg-gray-50 border border-gray-200）**
- ラベル: Agents定義ファイルの置き場所
- リスト:
  - 各Agentの定義は `.claude/agents/` 配下にMarkdownファイルとして配置（コードラベルスタイルを使用）
  - Skillsの定義は `.claude/commands/` 配下に配置（コードラベルスタイルを使用）

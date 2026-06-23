# Directory

## スライド設定
- data-act: "Directory"
- セクションラベル: 05 — ディレクトリ構成

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2`
- テキスト: 05 — ディレクトリ構成

### 見出し
- スタイル: `text-2xl font-bold text-gray-900 mb-6`
- テキスト: フォルダ構成と役割

### ディレクトリツリー（bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-xs leading-7 overflow-auto）

コメント行（text-gray-400）: # プロジェクトルート

```
aa4h-forest-rangers/          ← text-[#E60012]
├─ .claude/                   ← text-blue-600
│  ├─ agents/                 ← text-blue-500（AIエージェント定義ファイル（.md））
│  ├─ documents/              ← text-blue-500（資料ごとのMDファイル（スライド素材））
│  │  ├─ agents/              ← text-gray-500
│  │  ├─ claude-code/
│  │  ├─ cover/
│  │  ├─ flow/
│  │  └─ pj-summary/
│  ├─ reports/                ← text-blue-500（各エージェントの出力レポート）
│  │  ├─ qa/                  （QAエージェントのレポート）
│  │  └─ security/            （セキュリティエージェントのレポート）
│  └─ skills/                 ← text-blue-500（ClaudeCodeのSkill定義）
│     ├─ frontend-design/     （UI/UX実装支援スキル）
│     ├─ issue-to-impl.md     （Issue→実装スキル）
│     ├─ ship.md              （デプロイスキル）
│     └─ superpowers/         （ClaudeCode標準拡張スキル群）
├─ assets/                    ← text-blue-600（共通CSS・JSファイル）
├─ b/                         ← text-blue-600（AIAgentサイト本体（HTML群））
├─ data/                      ← text-blue-600（モックデータ・テストデータ）
├─ scripts/                   ← text-blue-600（ユーティリティスクリプト）
├─ CLAUDE.md                  ← text-gray-700（AI向けプロジェクト規約）
├─ index.html                 ← text-gray-700（b/index.html へリダイレクト）
└─ dev-environment.html       ← text-gray-700（このドキュメント）
```

色スタイル詳細:
- ルートフォルダ名: `text-[#E60012]`
- `.claude/`配下の主要フォルダ: `text-blue-600`
- `.claude/`配下のサブフォルダ: `text-blue-500`
- `.claude/documents/`配下: `text-gray-500`
- 説明テキスト: `text-gray-400 font-sans`

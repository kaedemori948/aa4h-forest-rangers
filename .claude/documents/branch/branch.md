# Branch

## スライド設定
- data-act: "Flow"
- セクションラベル: 03 — 開発フロー③ ブランチ構成（暫定）

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2`
- テキスト: 03 — 開発フロー③ ブランチ構成（暫定）

### 見出し
- スタイル: `text-2xl font-bold text-gray-900 mb-2`
- テキスト: ブランチ戦略

### 注記
- スタイル: `text-xs text-gray-400 mb-5`
- テキスト: ※ 週1回 main へデプロイ。1週間分のIssue対応をweeklyブランチに集約してからリリース

### SVGブランチ図（viewBox="0 0 820 320"）

#### ブランチライン

**main**（水平線 y=60）
- スタイル: stroke="#1e293b" stroke-width="3"
- 両端にノード（circle r="8" fill="#1e293b"）
- ラベル: main（上部、font-weight="700"）
- サブ: 本番ブランチ — 週1回 GitHub Pages へ自動デプロイ

**weekly/2026-W26**（水平線 y=130）
- スタイル: stroke="#E60012" stroke-width="2.5"
- main から x=120 で枝分かれ、x=680 でマージ（破線接続 stroke-dasharray="4,2"）
- 両端にノード（circle r="7" fill="#E60012"）
- ラベル: weekly/2026-W26
- サブ: 週ごとに作成。1週間分のPRをここに集約 → 週末にmainへマージ

**feature/issue-12**（y=210）
- スタイル: stroke="#64748b" stroke-width="2"（破線接続は stroke-dasharray="3,2"）
- weekly x=220 から分岐、x=330 でマージ
- ラベル: feature/issue-12 / Issue #12 対応

**feature/issue-15**（y=250）
- weekly x=380 から分岐、x=490 でマージ
- ラベル: feature/issue-15 / Issue #15 対応

**feature/issue-18**（y=210）
- weekly x=540 から分岐、x=640 でマージ
- ラベル: feature/issue-18 / Issue #18 対応

各featureブランチには「← PR →」ラベル（fill="#E60012" font-size="8"）

#### 凡例（下部バー: rect x=30 y=275 w=760 h=34 rx="6" fill="#f8fafc"）
- ● main（本番）
- ● weekly（週次集約）
- ● feature/issue-XX（各Issue対応ブランチ）
- --- PR（マージ方向）

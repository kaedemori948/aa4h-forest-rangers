# Site Flow

## スライド設定
- data-act: "Site Flow"
- セクションラベル: 02 — AIAgentサイトの利用フロー

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）

## コンテンツ

### セクションラベル
- スタイル: `text-xs font-semibold tracking-widest text-[#E60012] uppercase mb-2`
- テキスト: 02 — AIAgentサイトの利用フロー

### 見出し
- スタイル: `text-2xl font-bold text-gray-900 mb-6`
- テキスト: サイト利用者のアクセスフロー

### SVGフローチャート（flex-1 flex items-center justify-center / viewBox="0 0 840 520"）

全ボックス共通サイズ: **w=134, h=90, rx=8**

#### メインフロー（左から右、cy=160）

**ユーザー**（x=10, y=115）
- スタイル: fill="#f8fafc" stroke="#64748b" stroke-width="1.5"
- ラベル: ユーザー（font-size="12" font-weight="700"）

→ 矢印 (144,160)→(174,160)

**GitHub Pages またはVercel HTML/JS**（x=174, y=115）
- 3行テキスト: "GitHub Pages"（font-size="11"）/ "またはVercel"（font-size="10"）/ "HTML/JS"（font-size="10"）

→ 矢印 (308,160)→(338,160)

**GitHub OAuth ログイン確認？**（x=338, y=115）
- 2行テキスト: "GitHub OAuth"（font-size="11"）/ "ログイン確認？"（font-size="10"）

→ 矢印 (472,160)→(502,160)

**認可ユーザー？**（x=502, y=115）
- スタイル: fill="#fff5f5" stroke="#E60012" stroke-width="2"（赤枠強調）
- 2行テキスト: "認可" / "ユーザー？"（font-size="11" font-weight="700" fill="#E60012"）

#### 分岐（x=666の縦スパイン y=50〜y=260）

認可ユーザー？の右端から水平コネクター(x=636→666)が伸び、縦スパイン(y=50〜260)につながる。

**NOブランチ（上方向）**
- "NO" ラベル: (672, 105)
- 横矢印: (666,50)→(700,50)
- **拒否**ボックス: x=700, y=5（fill="#f8fafc" stroke="#94a3b8"）

**YESブランチ（下方向）**
- "YES" ラベル: (672, 210)
- 横矢印: (666,260)→(700,260)
- **サイト利用**: x=700, y=215（fill="#fff5f5" stroke="#E60012"）
- ↓ 矢印 (767,305)→(767,320)
- **Vercel Functions**: x=700, y=320（fill="#f8fafc" stroke="#64748b"）2行テキスト: "Vercel" / "Functions"
- ↓ 矢印 (767,410)→(767,425)
- **外部API（APIキー隠蔽）**: x=700, y=425（fill="#f8fafc" stroke="#64748b"）2行テキスト: "外部API" / "（APIキー隠蔽）"

#### スタイル詳細
- 矢印マーカー: id="arrFlow" fill="#64748b" markerWidth="8" markerHeight="8" refX="6" refY="3"
- 通常ボックス: fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="8"
- 強調ボックス（認可/サイト利用）: fill="#fff5f5" stroke="#E60012"
- 拒否ボックス: fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"
- NO/YESラベル: font-size="10" font-weight="700" fill="#64748b"

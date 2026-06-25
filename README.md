# aa4h-forest-rangers

クライアント社内システムのUI/UX刷新プロジェクト。  
Claude Code を活用した AI 駆動開発で、GitHub Issue を起点に実装・テスト・デプロイを自動化している。

---

## ファイル構成（主要）

| ファイル | 役割 |
|---|---|
| `index.html` | AIAgent サイトの入り口 |
| `dev-environment.html` | 本プロジェクトの開発資料（スライド形式） |
| `assets/` | CSS・JS アセット |
| `.claude/skills/` | 開発自動化スキル群 |

---

## index.html — AIAgent サイト

社内 AI Agent プラットフォームのフロントエンド入り口。  
HTML / CSS / バニラ JS のみで構成し、クライアント既存 API を呼び出して情報を表示する。

**技術スタック**

- HTML / CSS / バニラ JS（フレームワーク不使用）
- テーマ値は CSS 変数（`--` プレフィックス）で一元管理
- テスト: Playwright
- デプロイ: Vercel（予定）

---

## 開発フロー — UI/UX 改善サイクル

Claude Code が GitHub Issue を元にUI/UXの改善提案を行う。

```
/ui-improve（オーケストレーター）
  ├─ proposal:needed のIssue → /ui-improve-needed → 新規ブランチ & PR 作成
  └─ proposal:revise のIssue → /ui-improve-revise → 既存ブランチに再実装 & PR 更新

PR → リーダーレビュー & マージ → 週次で main へデプロイ
```

| ステップ | 担当 | 内容 |
|---|---|---|
| `/ui-improve` | Claude Code | `proposal:needed` / `proposal:revise` ラベルの Issue を全件取得し、サブスキルに並列委譲 |
| `/ui-improve-needed` | Claude Code | 新規 Issue を解析 → 改善案生成 → 実装 → 新規ブランチで PR 作成 |
| `/ui-improve-revise` | Claude Code | 既存 PR の却下理由を収集 → 前回変更を巻き戻し → 再実装 → PR を更新 |
| 承認 & マージ | リーダー | PR をレビューし weekly ブランチへマージ。週次で main へデプロイ |

---

## 資料作成フロー — dev-environment.html

本プロジェクトの開発環境・フロー・スキル構成をまとめたスライドドキュメント。  
キーボード（← →）またはナビゲーションボタンでスライドを切り替えられる。

**主なコンテンツ:** プロジェクト概要 / AIAgent サイト利用フロー / 開発フロー / Skills・エージェント一覧 / ブランチ戦略

### 手動での更新（静的な部分）

スライドの文言・構成など、人手で内容を決める箇所は `update-dev-env` スキルで更新する。

1. [`.claude/documents/updateFormat.md`](.claude/documents/updateFormat.md) をローカルにコピーし、修正目的・対象スライド・変更内容を記入する
2. 記入済みファイルを添付して `/update-dev-env` を実行する
3. 指定スライドのみが書き換わり、他のスライドは一切変更されない

### 自動での更新（動的な部分）

Skills やエージェントなど日々増えるものは `/sync-skills-page` で一括反映する。

```
/sync-skills-page
```

`.claude/skills/` と `.claude/agents/` の内容を読み取り、「Skills・エージェント一覧と役割」スライドを自動で最新化する。スキルを追加・変更したタイミングで実行することで資料を常に最新の状態に保てる。

---

## コーディングルール（抜粋）

- テーマ値は必ず CSS 変数で管理、インラインスタイル禁止
- レイアウトと色は分離して管理
- モックデータと本番 API 呼び出しは差し替えやすい構造にする
- セマンティックタグを使う
- コメントは「なぜそうしているか」のみ（何をしているかは書かない）

詳細は [CLAUDE.md](CLAUDE.md) を参照。

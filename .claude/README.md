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

## dev-environment.html — 開発資料

本プロジェクトの開発環境・フロー・スキル構成をまとめたスライドドキュメント。  
キーボード（← →）またはナビゲーションボタンでスライドを切り替えられる。

**主なコンテンツ**

1. プロジェクト目的 / 概要
2. AIAgent サイトの利用フロー
3. 開発フロー（Issue → 実装 → PR → マージ）
4. Skills・エージェント一覧と役割
5. ブランチ戦略

**更新方法**

`update-dev-env` スキルを使って部分的に更新する。

```
# updateFormat.md に修正内容を記入して添付
/update-dev-env
```

詳細は [`.claude/skills/update-dev-env/SKILL.md`](.claude/skills/update-dev-env/SKILL.md) を参照。

---

## 開発フロー

Claude Code を中心に、GitHub Issue 起点で自動化している。

```
GitHub Issue → /issue-to-impl → PR作成 → レビュー & マージ → デプロイ
```

| ステップ | 担当 | 内容 |
|---|---|---|
| Issue 起票 | 人間 | フィードバックをもとに GitHub Issue を作成・ラベル管理 |
| 実装 | Claude Code | Issue を読んでブランチを切り、コードを修正 |
| PR 作成 | Claude Code | テスト通過後、weekly ブランチへ PR を作成 |
| 承認 & マージ | リーダー | PR をレビューし weekly ブランチへマージ。週次で main へデプロイ |

### 主要スキル

| スキル | トリガー | 役割 |
|---|---|---|
| `issue-to-impl` | `/issue-to-impl <Issue番号>` | Issue を解析して実装まで自動実行 |
| `ui-improve` | `/ui-improve` | GitHub Issue を確認し UI 改善提案を並列処理 |
| `update-dev-env` | `/update-dev-env` | `dev-environment.html` を部分更新 |
| `sync-skills-page` | `/sync-skills-page` | Skills・エージェント一覧ページを最新化 |

---

## コーディングルール（抜粋）

- テーマ値は必ず CSS 変数で管理、インラインスタイル禁止
- レイアウトと色は分離して管理
- モックデータと本番 API 呼び出しは差し替えやすい構造にする
- セマンティックタグを使う
- コメントは「なぜそうしているか」のみ（何をしているかは書かない）

詳細は [CLAUDE.md](CLAUDE.md) を参照。

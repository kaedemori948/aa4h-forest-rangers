---
name: ui-improve-revise
description: UI/UX改善サイクルを1回実行する。proposal: revise ラベルのissueを1件選び、対応PRにチェックアウトして前回の却下理由を確認し、前回変更を元に戻した上で新たな改善案を実装・push・PRコメントを更新する。
---

# ui-improve-revise

UI/UX改善サイクルを1回実行する。
対象issueは `proposal: revise` ラベルのものを1件選ぶ。

## トリガー
- `/ui-improve-revise`

## 手順

### 1. イシュー取得

`proposal: revise` ラベルのissueを1件取得する。

```bash
gh issue list --label "proposal: revise" --state open --json number,title,body,labels,comments --limit 1
```

空なら「対象issueなし」と報告して終了する。

### 2. 対応PRの特定とチェックアウト

issueに紐づくPRを取得し、そのブランチに切り替える。

```bash
gh pr list --search "closes #<番号> OR fixes #<番号>" --state open --json number,headRefName,body --limit 1
# または
gh issue develop <番号> --list
```

取得したブランチ名（通常 `feature/issue-<番号>`）にチェックアウトする。

```bash
git fetch origin
git checkout feature/issue-<番号>
git pull origin feature/issue-<番号>
```

### 3. 全サイクルの実装履歴と却下理由の収集

このブランチは複数回 `proposal: revise` を経ている可能性があるため、**全サイクル分**の情報を時系列で収集する。

**コミット履歴の全件確認：**
```bash
git log --oneline origin/main..HEAD
git diff origin/main...HEAD
```

**PRの全コメント・レビューを時系列で取得：**
```bash
gh pr view <PR番号> --comments --json comments,reviews
gh pr review list <PR番号>
```

**issueの全コメントを時系列で取得：**
```bash
gh issue view <番号> --comments
```

取得した情報を以下の形式で時系列に整理する。`proposal: revise` ラベルが付いた回数分のサイクルを列挙し、それぞれの却下理由を明確にする。

```
[サイクル1]
  実装内容: <コミットメッセージ・diffの要約>
  却下理由: <PRレビュー・issueコメントから抽出>

[サイクル2]
  実装内容: <コミットメッセージ・diffの要約>
  却下理由: <PRレビュー・issueコメントから抽出>

... （以降繰り返し）
```

この整理結果をui-analystへの入力として使う。

### 4. 新たな改善案の策定

ui-analyst エージェントを呼び出し、以下を全て踏まえた新たな改善案を生成する。

- 元のissueの要件
- 全サイクル分の実装内容と却下理由（時系列順）
- 繰り返し指摘されている問題は特に重視するよう指示する

エージェントの出力は `.claude/reports/ui-proposals/` に保存される。

### 5. 前回変更の巻き戻し

`origin/main` との差分を全て元に戻し、クリーンな状態にする。

```bash
git diff origin/main...HEAD --name-only
# 変更ファイルを確認してから:
git checkout origin/main -- <変更されていたファイル群>
```

### 6. 新たな改善案の実装

ステップ4で策定した案をもとに実装する。

> **制約: `data/` 配下のファイル（`test.json` 等）は変更禁止。**
> 検索ヒット漏れなどデータ起因の問題は、UIロジック側（同義語展開・スコアリング等）で吸収すること。

UIの変更を伴う場合は `superpowers/subagent-driven-development` の並列エージェントパターンを使い、
HTML骨格・CSS・JSモックデータ層を並行実装することでコンテキスト汚染を防ぐ。

### 7. 既存ブランチへcommit・push

```bash
git add .
git commit -m "fix: <Issueタイトル> 再実装 (#<番号>)"
git push origin HEAD
```

### 8. PRのコメントを新たな実装内容に更新

PRの説明本文を新たな実装内容に全て書き換える。

```bash
gh pr edit <PR番号> --body "$(cat <<'EOF'
## 変更概要
<新たな改善案の内容>

## 前回からの変更点
<却下理由を踏まえて何を変えたか>

closes #<番号>
EOF
)"
```

既存のレビューコメントへの返信として、対応内容も記録する。

```bash
gh pr comment <PR番号> --body "前回の指摘を踏まえ再実装しました。変更点: <対応内容の要約>"
```

### 9. ラベル更新

```bash
gh issue edit <番号> \
  --remove-label "proposal: revise" \
  --add-label "proposal: ready"
```

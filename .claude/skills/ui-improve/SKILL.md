---
name: ui-improve
description: GitHubの全issueを確認し、proposal:needed または proposal:revise ラベルを持つissueを全てピックアップして、それぞれ対応するサブスキルに処理を委譲するオーケストレーター。
---

# ui-improve

GitHubの全issueを走査し、`proposal: needed` / `proposal: revise` ラベルを持つissueをピックアップして、対応するスキルに処理を委譲する。

## トリガー
- `/ui-improve`

## 手順

### 1. 対象issueの全件取得

```bash
gh issue list --label "proposal: needed" --state open --json number,title,labels --limit 100
gh issue list --label "proposal: revise" --state open --json number,title,labels --limit 100
```

両方の結果をまとめてリスト化する。どちらも空なら「対象issueなし」と報告して終了する。

### 2. issueの分類と表示

取得したissueを以下の2グループに分けて一覧表示する。

```
[proposal: needed]
  #12 ヘッダーのコントラスト改善
  #15 モバイルレイアウトの崩れ修正

[proposal: revise]
  #10 フォームのバリデーション表示
```

### 3. 各issueへの処理委譲

分類ごとに、対応するスキルを順番に呼び出す。

#### proposal: needed のissueに対して

issue 1件ごとに `/ui-improve-needed` の処理フローを実行する。
ただし `/ui-improve-needed` のステップ1（イシュー取得）はスキップし、
このステップで取得済みのissue番号を直接渡してステップ2（改善案の生成）から開始する。

#### proposal: revise のissueに対して

issue 1件ごとに `/ui-improve-revise` の処理フローを実行する。
ただし `/ui-improve-revise` のステップ1（イシュー取得）はスキップし、
このステップで取得済みのissue番号を直接渡してステップ2（改善案の生成）から開始する。

### 4. 完了報告

全issueの処理が終わったら、処理結果を以下の形式でまとめて報告する。

```
処理完了:
  [proposal: needed → proposal: ready]
    #12 ヘッダーのコントラスト改善
    #15 モバイルレイアウトの崩れ修正
  [proposal: revise → proposal: ready]
    #10 フォームのバリデーション表示
```

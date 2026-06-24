---
name: ui-improve
description: GitHubの全issueを確認し、proposal:needed または proposal:revise ラベルを持つissueを全てピックアップして、それぞれ対応するサブスキルに並列処理で委譲するオーケストレーター。
---

# ui-improve

GitHubの全issueを走査し、`proposal: needed` / `proposal: revise` ラベルを持つissueをピックアップして、対応するスキルに並列で処理を委譲する。

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

### 3. 各issueへの並列処理委譲

**issue 1件につき1エージェントを割り当て、全件を同一レスポンス内で一括ディスパッチする（並列実行）。**

各エージェントへの指示は以下の構造で渡す：

#### proposal: needed のissueに対するエージェント指示テンプレート

```
issue #<番号>「<タイトル>」に対して /ui-improve-needed の処理フローを実行せよ。

ステップ1（イシュー取得）はスキップし、issue番号 <番号> を直接使ってステップ2（改善案の生成）から開始すること。

完了後、以下を報告すること：
- 処理したissue番号とタイトル
- 作成したPR番号とURL
- 付与したラベル
```

#### proposal: revise のissueに対するエージェント指示テンプレート

```
issue #<番号>「<タイトル>」に対して /ui-improve-revise の処理フローを実行せよ。

ステップ1（イシュー取得）はスキップし、issue番号 <番号> を直接使ってステップ2（対応PRの特定とチェックアウト）から開始すること。

完了後、以下を報告すること：
- 処理したissue番号とタイトル
- 更新したPR番号とURL
- 付与したラベル
```

#### 並列ディスパッチの例（issue が needed×2、revise×1 の場合）

```
Agent 1 → issue #12「ヘッダーのコントラスト改善」: /ui-improve-needed フロー
Agent 2 → issue #15「モバイルレイアウトの崩れ修正」: /ui-improve-needed フロー
Agent 3 → issue #10「フォームのバリデーション表示」: /ui-improve-revise フロー
# 3エージェントが同時に実行される
```

> **注意:** 各エージェントは独立したブランチを操作するため競合は発生しない。
> ただし、同一ファイルを複数issueが編集する可能性がある場合は競合リスクがあるため、その旨を報告してユーザーに確認を求めてから実行すること。

### 4. 完了報告

全エージェントの結果が揃ったら、各エージェントの報告を統合して以下の形式で表示する。

```
処理完了:
  [proposal: needed → proposal: ready]
    #12 ヘッダーのコントラスト改善 → PR #34
    #15 モバイルレイアウトの崩れ修正 → PR #35
  [proposal: revise → proposal: ready]
    #10 フォームのバリデーション表示 → PR #28（更新）

失敗:
  （あれば issue番号・エラー内容を記載）
```

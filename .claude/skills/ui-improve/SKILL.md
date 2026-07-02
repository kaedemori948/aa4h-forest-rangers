---
name: ui-improve
description: GitHubの全issueを確認し、proposal:needed / proposal:revise / dev-fix ラベルを持つissueを全てピックアップして、それぞれ対応するサブスキルに並列処理で委譲するオーケストレーター。
---

# ui-improve

GitHubの全issueを走査し、`proposal: needed` / `proposal: revise` / `dev-fix` ラベルを持つissueをピックアップして、対応するスキルに並列で処理を委譲する。

## トリガー
- `/ui-improve`

## 共通制約

> **`data/` 配下のファイル（`test.json` 等）はいかなる修正でも変更禁止。**
> 本番稼働時にはdataディレクトリ自体が削除され、API経由で酷似したデータを取得する構成に置き換わるため、
> dataディレクトリへの変更は本番移行時に失われる。検索ヒット漏れなどデータ起因の問題も含め、
> 表示側（UIロジック・同義語展開・スコアリング等）で吸収すること。
> この制約は委譲先の全エージェントに明示的に伝えること。

## 手順

### 1. 対象issueの全件取得

```bash
gh issue list --label "proposal: needed" --state open --json number,title,labels --limit 100
gh issue list --label "proposal: revise" --state open --json number,title,labels --limit 100
gh issue list --label "dev-fix" --state open --json number,title,labels --limit 100
```

3つの結果をまとめてリスト化する。すべて空なら「対象issueなし」と報告して終了する。

### 2. issueの分類と表示

取得したissueを以下の3グループに分けて一覧表示する。

```
[proposal: needed]
  #12 ヘッダーのコントラスト改善
  #15 モバイルレイアウトの崩れ修正

[proposal: revise]
  #10 フォームのバリデーション表示

[dev-fix]
  #20 [dev-fix]
```

### 3. 各issueへの並列処理委譲

**issue 1件につき1エージェントを割り当て、全件を同一レスポンス内で一括ディスパッチする（並列実行）。**

各エージェントへの指示は以下の構造で渡す：

#### proposal: needed のissueに対するエージェント指示テンプレート

```
issue #<番号>「<タイトル>」に対して /ui-improve-needed の処理フローを実行せよ。

ステップ1（イシュー取得）はスキップし、issue番号 <番号> を直接使ってステップ2（改善案の生成）から開始すること。

【必須制約】`data/` 配下のファイルはいかなる修正でも変更禁止。データ起因の問題も表示側で吸収すること。

完了後、以下を報告すること：
- 処理したissue番号とタイトル
- 作成したPR番号とURL
- 付与したラベル
```

#### proposal: revise のissueに対するエージェント指示テンプレート

```
issue #<番号>「<タイトル>」に対して /ui-improve-revise の処理フローを実行せよ。

ステップ1（イシュー取得）はスキップし、issue番号 <番号> を直接使ってステップ2（対応PRの特定とチェックアウト）から開始すること。

【必須制約】`data/` 配下のファイルはいかなる修正でも変更禁止。データ起因の問題も表示側で吸収すること。

完了後、以下を報告すること：
- 処理したissue番号とタイトル
- 更新したPR番号とURL
- 付与したラベル
```

#### dev-fix のissueに対するエージェント指示テンプレート

```
issue #<番号>「<タイトル>」に対して /issue-to-impl <番号> の処理フローを実行し、実装完了後に /ship <番号> を実行してPR作成まで行え。

issue本文はチェックボックス形式の修正案リストである。issue-to-impl の手順に従い、実装が完了した項目のみ `- [ ]` → `- [x]` に書き換えて `gh issue edit <番号> --body` で反映すること。一部の項目のみ実装できた場合も、実装できた分だけチェックを入れて構わない。

【必須制約】`data/` 配下のファイルはいかなる修正でも変更禁止。データ起因の問題も表示側で吸収すること。

ship実行時、issueに `proposal: approved` ラベルは付いていないため、ship手順内のラベル更新（proposal: approved → proposal: ready）はスキップすること。

完了後、以下を報告すること：
- 処理したissue番号とタイトル
- チェックを入れた修正案の項目
- 作成したPR番号とURL
```

#### 並列ディスパッチの例（issue が needed×2、revise×1、dev-fix×1 の場合）

```
Agent 1 → issue #12「ヘッダーのコントラスト改善」: /ui-improve-needed フロー
Agent 2 → issue #15「モバイルレイアウトの崩れ修正」: /ui-improve-needed フロー
Agent 3 → issue #10「フォームのバリデーション表示」: /ui-improve-revise フロー
Agent 4 → issue #20「[dev-fix]」: issue-to-impl → ship フロー
# 4エージェントが同時に実行される
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
  [dev-fix]
    #20 [dev-fix]（2/2件チェック） → PR #36

失敗:
  （あれば issue番号・エラー内容を記載）
```

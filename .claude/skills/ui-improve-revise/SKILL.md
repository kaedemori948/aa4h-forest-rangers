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

### 7. 資料反映（dev-environment.html）

`dev-environment.html` の目的は、サイトの大まかな仕様書・プロジェクト体制・開発環境を常に最新に保つことである。
この目的に照らして、ステップ6で実装した変更を資料に反映すべきか判断する。

1. `dev-environment.html` を読み、スライド構成を把握する。
2. ステップ6での変更内容（diff）と各スライドの記載を照らし合わせ、記載内容が実態と乖離する・古くなったスライドがないか判断する。
   - 判断基準はClaudeの裁量に委ねる。目安: issueの変更が既存スライドに記載された仕様・体制・開発環境の説明と矛盾する、または既存スライドで扱っている範囲の情報が古くなる場合は反映対象。
   - 実装の内部詳細のみで、スライドに記載されているレベルの仕様・体制・環境説明に影響しない軽微な修正は反映不要。
3. 反映対象のスライドがあれば、該当スライドのみを修正する。
   - 対象外のスライド、`<style>` ブロック、`<script>` ブロックには触れない。
   - `.claude/documents/` 配下のMarkdownは更新しない（`/update-docs` の管轄のため対象外）。
   - インラインスタイルは追加しない。
   - 前サイクルで `dev-environment.html` を修正していた場合、ステップ5（前回変更の巻き戻し）で一度 `origin/main` の状態に戻っている点に注意し、今回の変更内容を踏まえて改めて判断する。
4. 反映対象がなければ、`dev-environment.html` は変更せず「資料反映不要」と判断する。
5. 判断結果（反映有無・対象スライド・理由）を記録し、完了報告に含める。

### 8. 既存ブランチへcommit・push

```bash
git add .
git commit -m "fix: <Issueタイトル> 再実装 (#<番号>)"
git push origin HEAD
```

### 9. PRのコメントを新たな実装内容に更新

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

### 10. ラベル更新

```bash
gh issue edit <番号> \
  --remove-label "proposal: revise" \
  --add-label "proposal: ready"
```

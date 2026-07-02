---
name: ui-improve-needed
description: UI/UX改善サイクルを1回実行する。proposal: needed ラベルのissueを1件選び、改善案の生成・承認・実装・PR提出まで自動で行う。
---

# ui-improve-needed

UI/UX改善サイクルを1回実行する。
対象issueは `proposal: needed` ラベルのものを1件選ぶ。

## トリガー
- `/ui-improve-needed`

## 手順

### 1. イシュー取得

`proposal: revise` ラベルのissueを優先して取得する。
なければ `proposal: needed` を取得する。

```bash
gh issue list --label "proposal: revise" --state open --json number,title,body,labels --limit 1
# 結果が空なら:
gh issue list --label "proposal: needed" --state open --json number,title,body,labels --limit 1
```

どちらも空なら「対象issueなし」と報告して終了する。

取得したissueのラベルが `proposal: revise` か `proposal: needed` かを記録しておく（ステップ5で分岐に使う）。

### 2. 改善案の生成

ui-analyst エージェントを呼び出し、取得したissueの改善案を生成する。
エージェントの出力は `.claude/reports/ui-proposals/` に保存される。

### 3. 案の自動選択

スコア最上位の案を自動で選択し、確認なしでステップ4へ進む。

```bash
gh issue edit <番号> --remove-label "proposal: needed" --remove-label "proposal: revise" --add-label "proposal: ready"
```

### 4. 実装

`/issue-to-impl <番号>` を実行する。

> **制約: `data/` 配下のファイル（`test.json` 等）は変更禁止。**
> 検索ヒット漏れなどデータ起因の問題は、UIロジック側（同義語展開・スコアリング等）で吸収すること。

UIの変更を伴う場合は `superpowers/subagent-driven-development` の並列エージェントパターンを使い、
HTML骨格・CSS・JSモックデータ層を並行実装することでコンテキスト汚染を防ぐ。

### 5. 資料反映（dev-environment.html）

`dev-environment.html` の目的は、サイトの大まかな仕様書・プロジェクト体制・開発環境を常に最新に保つことである。
この目的に照らして、ステップ4で実装した変更を資料に反映すべきか判断する。

1. `dev-environment.html` を読み、スライド構成を把握する。
2. ステップ4での変更内容（diff）と各スライドの記載を照らし合わせ、記載内容が実態と乖離する・古くなったスライドがないか判断する。
   - 判断基準はClaudeの裁量に委ねる。目安: issueの変更が既存スライドに記載された仕様・体制・開発環境の説明と矛盾する、または既存スライドで扱っている範囲の情報が古くなる場合は反映対象。
   - 実装の内部詳細のみで、スライドに記載されているレベルの仕様・体制・環境説明に影響しない軽微な修正は反映不要。
3. 反映対象のスライドがあれば、該当スライドのみを修正する。
   - 対象外のスライド、`<style>` ブロック、`<script>` ブロックには触れない。
   - `.claude/documents/` 配下のMarkdownは更新しない（`/update-docs` の管轄のため対象外）。
   - インラインスタイルは追加しない。
4. 反映対象がなければ、`dev-environment.html` は変更せず「資料反映不要」と判断する。
5. 判断結果（反映有無・対象スライド・理由）を記録し、完了報告に含める。

### 6. ブランチ作成・PR提出

**ステップ1で取得したラベルによって分岐する。**

#### proposal: revise だった場合（既存PRへの追加）

既存ブランチに切り替えてcommit・pushする。PRは新規作成しない。

```bash
git checkout feature/issue-<番号>
git add .
git commit -m "fix: <Issueタイトル> 修正 (#<番号>)"
git push origin HEAD
```

#### proposal: needed だった場合（新規PR作成）

新規ブランチを作成してcommit・push・PR作成する。

```bash
git checkout -b feature/issue-<番号>
git add .
git commit -m "feat: <Issueタイトル> (#<番号>)"
git push origin HEAD
gh pr create \
  --title "<Issueタイトル> (#<番号>)" \
  --body "closes #<番号>"
```

## ラベル定義（初回のみセットアップ）

```bash
gh label create "proposal: needed"   --color "e11d48" --description "修正案が提案されていない"
gh label create "proposal: ready"    --color "f59e0b" --description "修正案が提案されている"
gh label create "proposal: revise"   --color "f97316" --description "別の修正案を要求"
gh label create "proposal: approved" --color "16a34a" --description "修正案承認済み"
```

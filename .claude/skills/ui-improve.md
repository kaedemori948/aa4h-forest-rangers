# ui-improve

UI/UX改善サイクルを1回実行する。
対象issueは `proposal: revise` → `proposal: needed` の優先順で1件選ぶ。

## トリガー
- `/ui-improve`

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

### 2. 改善案の生成

ui-analyst エージェントを呼び出し、取得したissueの改善案を生成する。
エージェントの出力は `.claude/reports/ui-proposals/` に保存される。

### 3. 案の自動選択

スコア最上位の案を自動で選択し、確認なしでステップ4へ進む。

```bash
gh issue edit <番号> --remove-label "proposal: needed" --remove-label "proposal: revise" --add-label "proposal: approved"
```

### 4. 実装

`/issue-to-impl <番号>` を実行する。

### 5. ブランチ作成・PR提出

```bash
git checkout -b feature/issue-<番号>
git add .
git commit -m "feat: <Issueタイトル> (#<番号>)"
git push origin HEAD
gh pr create \
  --title "<Issueタイトル> (#<番号>)" \
  --body "closes #<番号>" \
  --label "proposal: ready"
```

PR作成後、issueのラベルを `proposal: ready` に更新する。

```bash
gh issue edit <番号> \
  --remove-label "proposal: approved" \
  --add-label "proposal: ready"
```

## ラベル定義（初回のみセットアップ）

```bash
gh label create "proposal: needed"   --color "e11d48" --description "修正案が提案されていない"
gh label create "proposal: ready"    --color "f59e0b" --description "修正案が提案されている"
gh label create "proposal: revise"   --color "f97316" --description "別の修正案を要求"
gh label create "proposal: approved" --color "16a34a" --description "修正案承認済み"
```

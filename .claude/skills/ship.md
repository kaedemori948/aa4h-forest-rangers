# ship

テスト済みの変更をブランチ作成 → commit → push → PR作成まで行う。
`test` スキルがパスした後に呼び出す。

## トリガー
- `/ship <Issue番号>`
- `test` スキルから自動呼び出し

## 手順

1. **変更確認**
   ```bash
   git diff --stat
   ```
   意図しないファイルが含まれていないか確認する。

2. **既存PRの有無を確認**

   issueに紐づく既存PRが存在するか確認する。
   ```bash
   gh pr list --search "closes #<番号>" --state open --json number,headRefName --limit 1
   ```
   結果が存在する場合は「既存PR」ルートへ、存在しない場合は「新規PR」ルートへ進む。

3. **【既存PRルート】既存ブランチへの追加**

   既存PRがある場合はそのブランチに切り替えてcommit・pushする。PRは新規作成しない。
   ```bash
   git checkout feature/issue-<番号>
   git add .
   git commit -m "fix: <Issueタイトル> 修正 (#<番号>)"
   git push origin HEAD
   gh issue edit <番号> \
     --remove-label "proposal: approved" \
     --add-label "proposal: ready"
   ```

4. **【新規PRルート】ブランチ作成・PR作成**

   既存PRがない場合は新規ブランチを作成してPRを立てる。
   ```bash
   git checkout -b feature/issue-<番号>
   git add .
   git commit -m "feat: <Issueタイトル> (#<番号>)"
   git push origin HEAD
   gh pr create \
     --title "<Issueタイトル> (#<番号>)" \
     --body "closes #<番号>"
   gh issue edit <番号> \
     --remove-label "proposal: approved" \
     --add-label "proposal: ready"
   ```

## 注意
- `git push --force` は使わない
- mainブランチへの直接pushはしない（必ずブランチを切る）

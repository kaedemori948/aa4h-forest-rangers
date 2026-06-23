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

2. **ブランチ作成**
   ```bash
   git checkout -b feature/issue-<番号>
   ```

3. **コミット**
   メッセージはIssueタイトルから生成する。テストファイルも必ず含める。
   ```bash
   git add .
   git commit -m "feat: <Issueタイトル> (#<番号>)"
   ```

4. **プッシュ**
   ```bash
   git push origin HEAD
   ```

5. **PR作成**
   ```bash
   gh pr create \
     --title "<Issueタイトル> (#<番号>)" \
     --body "closes #<番号>"
   ```

6. **Issueラベル更新**
   ```bash
   gh issue edit <番号> \
     --remove-label "proposal: approved" \
     --add-label "proposal: ready"
   ```

## 注意
- `git push --force` は使わない
- mainブランチへの直接pushはしない（必ずブランチを切る）

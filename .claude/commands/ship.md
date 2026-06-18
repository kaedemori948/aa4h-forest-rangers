# ship

テスト済みの変更をcommit → push → Vercelデプロイまで行う。
`test` スキルがパスした後に呼び出す。

## トリガー
- `/ship <Issue番号>`
- `test` スキルから自動呼び出し

## 手順

1. **変更確認**
   ```
   git diff --stat
   ```
   - 意図しないファイルが含まれていないか確認する

2. **コミット**
   - メッセージはIssueタイトルから生成する
   - テストファイルも必ず含める
   ```
   git add -p   # 対話的に確認（自動モードでは git add . を使う）
   git commit -m "fix: <Issueタイトル> (#<番号>)"
   ```

3. **プッシュ**
   ```
   git push origin HEAD
   ```

4. **デプロイ**
   - Vercel CLI が使える場合:
     ```
     vercel --prod
     ```
   - Vercel GitHubインテグレーション設定済みの場合: pushで自動デプロイされるため不要

5. **Issueクローズ**
   ```
   gh issue close <番号> --comment "実装・デプロイ完了"
   ```

## Vercel未確定時の対応
デプロイ先が確定していない場合はステップ4をスキップし、
「push完了。デプロイは手動で行ってください」とユーザーに報告して終了する。

## 注意
- `git push --force` は使わない
- mainブランチへの直接pushは避け、ブランチ運用が決まったらこのSkillを更新する

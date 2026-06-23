# issue-to-impl

GitHubイシューを解析し、実装とPlaywrightテストコード生成までを行う。
確認なしで実装まで進める。

## トリガー
- `/issue-to-impl <Issue番号>`

## 手順

1. **イシュー取得**
   ```bash
   gh issue view <番号> --json number,title,body,labels,comments
   ```

2. **解析・計画**
   - 変更対象ファイルを特定する
   - 影響範囲（他ファイルへの波及）を確認する
   - 実装方針を1段落でコメントに残す（作業ログとして）

3. **実装**
   - CLAUDE.mdのコーディングルールに従う
   - モックデータと本番APIは差し替えやすい構造にする

4. **Playwrightテストコード生成**
   - 実装した機能の正常系を最低1ケース書く
   - テストファイルは `tests/` 配下に置く（例: `tests/feature-xxx.spec.js`）
   - Playwrightが未導入なら先に `npm init playwright@latest` を実行する

5. **testスキルを呼び出す**
   - `/test` を実行して合否を確認する
   - テスト失敗時は原因を修正して再実行する（最大3回）
   - 3回失敗したらユーザーに報告して止まる

## 注意
- CSS変数を新たに追加する場合は `app.css` のルート変数に定義する
- 既存のCSSクラスを再利用できないか先に確認する

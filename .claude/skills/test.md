# test

Playwrightでテストを実行する。機能テストとリグレッションテストを両方行う。

## トリガー
- `/test`
- `issue-to-impl` スキルから自動呼び出し

## 手順

1. **環境確認**
   - `package.json` が存在しない場合: `npm init playwright@latest` を実行する
   - `npx playwright install --with-deps` でブラウザが揃っているか確認する

2. **テスト実行**
   ```
   npx playwright test --reporter=list
   ```
   - `tests/` 配下の全テストを実行する（リグレッション込み）

3. **結果判定**
   - 全件パス → `ship` スキルへ進む
   - 失敗あり → 失敗したテストのエラーログを読んで原因を特定し修正する
   - 修正後は再実行する（`issue-to-impl` から呼ばれた場合は最大3回まで）

## テストファイルの命名規則
```
tests/
├── <機能名>.spec.js     # 機能テスト（Issueごとに追加）
└── smoke.spec.js        # 主要画面の表示確認（常に存在する基盤テスト）
```

## 注意
- `smoke.spec.js` が存在しない場合は初回に作成する（index, agents, agentページの表示確認のみ）
- スクリーンショット比較は使わない（差分が出やすく保守コストが高い）

# 要望フォーム画面（pages/feedback.html）仕様

- **画面ID**: `FEEDBACK`
- **対応実装**: `pages/feedback.html` 内インラインスクリプト（`buildIssue` / submit ハンドラ）
- **対応テスト**: `test/e2e/feedback.spec.js`
- **API**: 送信は `AA4HAPI.createIssue`（POST `/api/issues`）。テストでは route で応答をモックする

### 必須項目

- 達成したかったこと（`#goal`）
- 検索結果の状況（`#result`）
- 求める機能・処理（`#asset-desc`）

---

### SPEC-FEEDBACK-001: 入力に応じてIssueタイトルをライブプレビューする

- **対象**: `#asset-name`、`#preview-issue-title`
- **前提**: アセット仮称に「テストAI」を入力
- **挙動**: 仮称が入力されている場合、プレビュータイトルを `[アセット要望] <仮称>` にする
- **期待値**: `#preview-issue-title` が `[アセット要望] テストAI`
- **テスト**: `[SPEC-FEEDBACK-001]`

### SPEC-FEEDBACK-002: 必須未入力で送信するとアラートを出し、APIを呼ばない

- **対象**: `#submit-btn`
- **前提**: 必須項目が空のまま送信
- **挙動**: 不足項目を列挙する alert を表示し、`createIssue`（POST /api/issues）は呼ばない
- **期待値**: alert が表示される。`/api/issues` へのリクエストが発生しない。送信バナーは非表示のまま
- **テスト**: `[SPEC-FEEDBACK-002]`

### SPEC-FEEDBACK-003: 必須を満たして送信すると Issue を作成し、成功バナーとリンクを表示する

- **対象**: `#submit-btn`、`#sent-banner`、`#issue-link`
- **前提**: 必須3項目を入力。`/api/issues` は `{ url, number }` を返すモック
- **挙動**: `createIssue` を呼び、成功したら送信バナーを表示し、Issueリンクに返却URLを設定、ボタンを「送信済み」にする
- **期待値**: `/api/issues` に POST が1回発生。`#sent-banner` が可視。`#issue-link` の href = モック返却URL。`#submit-btn` テキスト=`送信済み`
- **テスト**: `[SPEC-FEEDBACK-003]`

### SPEC-FEEDBACK-004: 送信が失敗するとエラーアラートを出し、ボタンを再有効化する

- **対象**: `#submit-btn`
- **前提**: 必須3項目を入力。`/api/issues` が 500 を返すモック
- **挙動**: 送信失敗時に失敗を知らせる alert を表示し、ボタンを再び押下可能に戻す
- **期待値**: alert が表示される。`#submit-btn` は `disabled` でなく、テキスト=`Issue として送信する`。送信バナーは非表示
- **テスト**: `[SPEC-FEEDBACK-004]`

### SPEC-FEEDBACK-005: キーワードを Enter でチップ追加し、重複は無視する

- **対象**: `#keywords-input`、`#keywords-wrap .tag-chip`
- **前提**: キーワード入力に「提案書」+Enter を2回
- **挙動**: Enter で入力値をチップ化する。既存と同じ値は追加しない
- **期待値**: `.tag-chip` は1個、テキストに `提案書` を含む
- **テスト**: `[SPEC-FEEDBACK-005]`

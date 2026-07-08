# 要望フォーム画面（pages/feedback.html）仕様

- **画面ID**: `FEEDBACK`
- **対応実装**: `pages/feedback.html` 内インラインスクリプト（`buildIssue` / submit ハンドラ）
- **対応テスト**: `test/e2e/feedback.spec.js`
- **API**: 送信は `AA4HAPI.createIssue`（POST `/api/issues`）。テストでは route で応答をモックする

### 必須項目

- フィードバックの種類（`input[name="fb-type"]`）: 常に必須
- 種類が「目的のアセットがあったが見つからなかった / なんとなく探したが見つからなかった」の場合:
  達成したかったこと（`#goal`）、検索結果の状況（`#result`）、求める機能・処理（`#asset-desc`）
- 種類が「サイトの使い勝手について意見がある」の場合:
  具体的な困りごと（`#ux-desc`）

---

### SPEC-FEEDBACK-001: 入力に応じてIssueタイトルをライブプレビューする

- **対象**: `#asset-name`、`#preview-issue-title`
- **前提**: 種類「目的のアセットがあったが見つからなかった」を選択し、アセット仮称に「テストAI」を入力
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
- **前提**: 種類「目的のアセットがあったが見つからなかった」を選択し、キーワード入力に「提案書」+Enter を2回
- **挙動**: Enter で入力値をチップ化する。既存と同じ値は追加しない
- **期待値**: `.tag-chip` は1個、テキストに `提案書` を含む
- **テスト**: `[SPEC-FEEDBACK-005]`

### SPEC-FEEDBACK-006: フィードバック種別で表示セクションが切り替わる

- **対象**: `#branch-search`、`#branch-ux`
- **前提**: 初期表示 → 種類「サイトの使い勝手について意見がある」を選択
- **挙動**: 初期状態では検索・アセット系セクション（`#branch-search`）と困りごとセクション（`#branch-ux`）はどちらも非表示。「使い勝手」を選ぶと `#branch-search` が非表示のまま `#branch-ux` が表示される。「目的のアセットがあったが見つからなかった」を選ぶと逆になる
- **期待値**: 初期状態で両方 hidden。UX選択後は `#branch-ux` が visible かつ `#branch-search` が hidden。検索系選択後は `#branch-search` が visible かつ `#branch-ux` が hidden
- **テスト**: `[SPEC-FEEDBACK-006]`

### SPEC-FEEDBACK-007: UX種別で困りごと未入力のまま送信するとアラートを出し、APIを呼ばない

- **対象**: `#submit-btn`
- **前提**: 種類「サイトの使い勝手について意見がある」を選択し、`#ux-desc` は空のまま送信
- **挙動**: 不足項目を列挙する alert を表示し、`createIssue`（POST /api/issues）は呼ばない
- **期待値**: alert が表示される。`/api/issues` へのリクエストが発生しない
- **テスト**: `[SPEC-FEEDBACK-007]`

### SPEC-FEEDBACK-008: UX種別で送信すると `ux-improvement` ラベル付きの Issue を作成する

- **対象**: `#submit-btn`、`#sent-banner`
- **前提**: 種類「サイトの使い勝手について意見がある」を選択し、`#ux-desc` に困りごとを入力。`/api/issues` は `{ url, number }` を返すモック
- **挙動**: 送信すると `createIssue` に渡す body に `ux-improvement` ラベルが含まれ、通常の「アセット要望」系ラベルは含まれない
- **期待値**: `/api/issues` へのPOSTボディ（body文字列）が `` `ux-improvement` `` を含み `` `asset-request` `` を含まない。`#sent-banner` が可視
- **テスト**: `[SPEC-FEEDBACK-008]`

### SPEC-FEEDBACK-009: 確信度を選択するとプレビュー本文に反映される

- **対象**: `#confidence`、`#preview-body`
- **前提**: 種類「目的のアセットがあったが見つからなかった」を選択し、確信度「探した範囲では存在しないと思う」を選択
- **挙動**: 確信度セレクトの選択に応じて、Issueプレビュー本文に選択した確信度の文言が追加される
- **期待値**: `#preview-body` のテキストが「探した範囲では存在しないと思う」を含む
- **テスト**: `[SPEC-FEEDBACK-009]`

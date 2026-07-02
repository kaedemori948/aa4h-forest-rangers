# Lifecycle Flow

## スライド設定
- data-act: "Flow"
- 3枚組（DISCOVERY/PLAN・DEVELOPMENT/TEST・DEPLOY/RUN・SUSTAIN）
- セクションラベル:
  - 03 — 開発フロー④ プロジェクトライフサイクル（DISCOVERY / PLAN）
  - 03 — 開発フロー⑤ プロジェクトライフサイクル（DEVELOPMENT / TEST）
  - 03 — 開発フロー⑥ プロジェクトライフサイクル（DEPLOY / RUN・SUSTAIN）
- 挿入位置: 既存「Flow③ ブランチ構成」スライドの直後、Sitemapスライドの手前

## レイアウト
上から順に:
1. 赤いバー（h-1.5 bg-[#E60012]）
2. コンテンツエリア（flex-1 bg-white px-16 py-8 flex flex-col）
3. 中央に1つのSVGスイムレーン図（4列: エンドユーザー / GitHub / Claude / 承認者）

## 出典
社内向けにユーザーが作成したフェーズ×担当者のExcel風フローチャート（DISCOVERY → PLAN → DEVELOPMENT → TEST → DEPLOY → RUN/SUSTAIN の6フェーズ、各フェーズに担当者別のステップを配置）を、dev-environment.html のスライド意匠に合わせてSVGスイムレーン図として3枚に分割・再現したもの。

## 共通要素
- 列見出し（font-size 11 font-weight 700 fill #94a3b8）: エンドユーザー / GitHub / Claude / 承認者。x座標はそれぞれ100 / 320 / 560 / 780。
- 各フェーズの先頭に「フェーズ名（font-size 12 font-weight 700 fill #E60012）+ 説明文（font-size 8 fill #6b7280）」を左寄せで配置。
- ノード: rounded rect（rx=8）。Claude担当ノードは `fill=#fff5f5 stroke=#E60012`、それ以外（GitHub/エンドユーザー）は `fill=#f8fafc stroke=#94a3b8`、承認者ノードは `fill=#f8fafc stroke=#3b82f6`。
- 分岐・保留系ノード（新規Issue？ / 即下理由収集 / 即下）は `stroke-dasharray="4,2"` の破線枠。
- 矢印マーカーは各スライドごとに `arrLC{n}` / `arrLC{n}Red` を定義（style.md の標準マーカー定義に準拠、IDのみスライド間で衝突しないよう連番）。
- スライドをまたぐ接続（PLANの「即下理由収集」⇔TESTの「即下」、TESTの「PR承認:承認」⇔DEPLOYの「本番へマージ」、RUN/SUSTAINの「指標の見直し」⇔1枚目「Form入力」への改善サイクル）は、実線でつながず注記テキスト（font-size 7-8 fill #6b7280 or #E60012）で参照先スライドを明記する。

## スライド①（DISCOVERY / PLAN）
- DISCOVERY: Form入力（エンドユーザー）→ Issue作成（GitHub）→ Issue作成（承認者）→ Issue選定（承認者）
- PLAN: Issue選定 → Issue取得（Claude）→ 新規Issue？（分岐）
  - NO → 実施履歴・却下理由を収集 → 前回変更の巻き戻し → 改善案の生成
  - YES → 改善案の生成（バイパス矢印）
  - 承認者側「即下理由収集」（次スライドの「即下」からの破線赤矢印で改善案の生成に合流）

## スライド②（DEVELOPMENT / TEST）
- DEVELOPMENT: 実装（Claude）
- TEST: 実装した機能のテストコード生成 → 仕様書の更新 → ドキュメンテーション更新 → テスト実行
  - 失敗 → 修正 → テスト実行に戻る（ループ）
  - 成功 → プッシュ（GitHub）→ PR作成（GitHub）→ PR承認（承認者）
    - 却下 → 即下（承認者、前スライド「即下理由収集」へ注記で接続）
    - 承認 → 次スライド「本番へマージ」へ注記で接続

## スライド③（DEPLOY / RUN・SUSTAIN）
- DEPLOY: 本番へマージ（GitHub、前スライド「PR承認:承認」から注記で接続）
- RUN/SUSTAIN: 指標に関連するデータのモニタリング（Claude）→ システムの成果を確認（承認者）→ 指標の見直し（承認者）
  - 指標の見直し → 赤い破線ループ矢印で1枚目「Form入力」へ戻り、改善サイクルを継続する旨を注記

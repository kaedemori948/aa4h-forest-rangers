# update-docs

`.claude/documents/` フォルダ内のMarkdownファイルを参照して、`dev-environment.html` を再生成するスキル。

## 手順

### STEP 1: ドキュメント構成を読む

まず `.claude/documents/documents-creator.md` を読み、スライドの順番と使用するMDファイルを確認する。

### STEP 2: 各MDファイルを読む

`documents-creator.md` に記載された順番で、各スライドのMDファイルをすべて読む。
また `.claude/documents/style.md` を読み、デザイン規約を把握する。

### STEP 3: HTMLを再生成する

以下のルールに従って `dev-environment.html` を丸ごと書き直す。

**共通ルール**
- スライドの順番は `documents-creator.md` の Page 順に従う
- コメントアウトされた Page は無視する
- スタイル・レイアウト・カラーは `style.md` に従う
- 各スライドのHTMLは、対応するMDファイルの内容を忠実に反映する
- MDファイルに記載のないものは勝手に追加しない
- MDファイルに記載のあるものを勝手に削除・変更しない

**HTMLの骨格**
- `<!DOCTYPE html>` から `</html>` まで完全なHTMLを出力する
- `<head>` には Noto Sans JP (Google Fonts) と Tailwind CSS CDN を含める
- ナビゲーション（← → ボタン・ドット・カウンター・セクションラベル）を含める
- スライド切り替えのJSを含める（キーボード操作含む）
- 印刷対応のCSSを含める（`@media print`）

**スライドの組み立て**
- 各スライドは `<div class="slide" data-act="{act名}">` で囲む
- 最初のスライド（カバー）のみ `class="slide active"` にする
- MDファイルの「スライド設定」「レイアウト」「コンテンツ」セクションをHTMLに変換する
- テキスト・クラス・構造はMDに記載の通りに実装する

### STEP 4: 確認

生成後、スライド枚数が `documents-creator.md` のPage数と一致しているか確認する。

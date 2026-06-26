---
name: resolve-conflict
description: PRのコンフリクト発生時に、前回実装のdiffを保存→mainをバックマージ→同じissueを再実装することで解消する。コミット・プッシュはユーザー（または呼び出し元スキル）が行う。/resolve-conflict <PR番号> で呼び出す。
---

# resolve-conflict

PRのコンフリクトを、mainのバックマージ＋再実装で解消する。
コンフリクトマーカーを直接編集しないため、mainの既存機能もPRの新機能も安全に保たれる。
コミット・プッシュはユーザー（または呼び出し元スキル）が行う。

## トリガー
- `/resolve-conflict <PR番号>`
- `/ship` からの自動呼び出し

## 手順

### 1. PR情報の取得

```bash
gh pr view <PR番号> --json number,title,headRefName,baseRefName,mergeable,body,url
```

`mergeable` が `CONFLICTING` 以外なら「コンフリクトなし」と報告して終了する。

issueリンク（`closes #<番号>` 等）をPR本文から取得し、issue番号を特定する。

### 2. ブランチのチェックアウトと前回実装の保存

```bash
git fetch origin
git checkout <headRefName>
git pull origin <headRefName>
```

**前回実装の差分を保存する（後の再実装に使う）:**

```bash
git diff origin/<baseRefName>...HEAD
```

この出力を変数として保持しておく。後のステップで「何をどう実装したか」の参考にする。

あわせてissue本文も取得する：

```bash
gh issue view <issue番号> --json number,title,body,comments
```

### 3. mainのバックマージ

最新のbaseブランチをPRブランチにマージする。

```bash
git merge origin/<baseRefName>
```

マージ後にコンフリクトマーカーが残っている場合は、**その箇所に限り**以下のルールで解消する：

- マーカー外の行には一切触れない
- 追加同士で両立できる場合: 両方を残す
- それ以外（どちらかを捨てる必要がある場合）: base側を採用し、後の再実装ステップで改めてPR側の意図を反映する

### 4. 前回実装の巻き戻し

バックマージ後、PRブランチをクリーンな状態にするため、前回の実装変更を除去する。

```bash
git diff origin/<baseRefName>...HEAD --name-only
# 変更ファイルを確認してから:
git checkout origin/<baseRefName> -- <前回の変更ファイル群>
```

### 5. 再実装

ステップ2で保存した以下の情報を両方参照しながら、`/issue-to-impl` の手順に従って再実装する：

- **issue本文**: 元の要件・目的
- **前回のgit diff**: 前回どのファイルをどう変更したか、何を実現しようとしたか

前回の実装をそのままコピーするのではなく、最新のbaseブランチのコードに対して自然に適合する形で実装し直す。

### 6. 完了報告

解消の経緯と再実装の概要をチャットに報告する。コミット・プッシュは行わない。

```
## コンフリクト解消完了

対象PR: #<PR番号>
issue: #<issue番号>

手順:
1. mainをバックマージ
2. 前回実装を巻き戻し
3. 再実装

前回との主な差分:
- <前回と変えた点があれば記述。なければ「実質同一」>

確認後、以下のコマンドでコミット・プッシュしてください。
  git add .
  git commit -m "fix: re-implement after backmerge <baseRefName> (#<PR番号>)"
  git push origin <headRefName>
```

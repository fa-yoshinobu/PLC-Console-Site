# refactor-instructions.md

PLC IO Checker マニュアルサイトの保守自動化指示書。
この文書は実装担当モデル向けの完結した作業指示である。実装前にこの文書全体を読むこと。

> このリポジトリは 47 ページの手書き HTML を `TODO.md` のチェックリストで人力検査する
> 運用である。本タスクの目的は**そのチェックリストの機械化**であり、サイトの見た目・本文・
> ナビ構成・URL を 1 文字も変えないこと。公開サイトの出力(デプロイされるファイル内容)が
> 変わらないことが合格条件である(Phase 3 の任意画像圧縮のみ例外)。

---

## Objective

1. 内部リンク切れ・画像参照切れ・`alt` 抜けを CI で自動検査する(`TODO.md` の手動チェック
   項目の自動化)
2. 共通ヘッダー/ナビ(`templates/page-shell.html.tmpl` を 47 ページへ手動反映する運用)の
   **ドリフト検出**を CI に追加する
3. (任意)500KB 超のスクリーンショット画像の再圧縮

静的サイトジェネレータの導入、HTML 構成の変更、本文・表記の変更は行わない。

---

## Project Understanding

- 素の HTML 47 ページ + `assets/style.css` + `assets/nav.js`。ビルド工程なし(`.nojekyll`)。
- デプロイ: `.github/workflows/pages.yml` が main push で rsync → GitHub Pages。
- 共通ヘッダー/ナビは `templates/page-shell.html.tmpl` が原本。各ページはこれを
  ページ深度に応じた `{{BASE}}`(`./` / `../` / `../../`)置換と、現在地の
  `class="active"` / `aria-current` 付与をした形で複製している。
- 運用ルールと検査項目は `README.md`(Writing Rules)と `TODO.md`(更新チェックリスト)に
  明文化済み。本タスクはそのうち機械化可能な項目だけを対象とする。
- 画像は `assets/images/` に計約 7.2MB / 46 ファイル。500KB 超は
  `assets/images/transfer/qr-import.jpg`(約 760KB)のみ(2026-06-11 時点)。

---

## Behaviors To Preserve

1. デプロイされる HTML / CSS / JS / 画像の内容(Phase 3 の画像再圧縮を除き、
   `git diff` でサイト本体に差分が無いこと)
2. ページ URL・ファイル配置・ナビ構成・本文・表記
3. `pages.yml` の main push デプロイ動作(チェック失敗時にデプロイが止まるのは意図どおり)
4. `templates/page-shell.html.tmpl` の「原本 → 手動反映」という運用自体
   (SSG 化しない。検出だけを足す)

---

## Non-Negotiables

- 最初に `git status` を確認する。未コミット変更があれば混ぜず、報告して停止する。
- チェックスクリプトは **Python 3 標準ライブラリのみ**で書く(外部 action・pip 依存・
  Node 依存を増やさない。GitHub runner の python3 で動くこと)。
- 置き場所は `.github/scripts/`(公開サイトに rsync されない場所。`pages.yml` の
  exclude に `.github` が既にあることを確認済み)。
- 既存ページの HTML は修正しない。チェッカーが既存ページの違反を検出した場合:
  - パス typo 等の機械的なリンク切れ → 修正してよい(修正内容を報告)
  - `alt` の文言追加・本文に関わる修正 → **書かずに Stop And Ask**(文言はコンテンツ判断)
- 外部 URL(http/https)への実アクセス検査はしない(CI が外部都合で落ちるため。
  検査対象はリポジトリ内参照のみ)。
- コミットはユーザーの指示があるまで行わない。

---

## Implementation Phases

### Phase 0: 現状確認

1. `git status` 確認(クリーンでなければ停止・報告)
2. ページ一覧(`*.html`、`templates/` 除く)と `TODO.md` のページ状態表の一致を確認し、
   差異があれば報告(修正はしない)

### Phase 1: サイト検査スクリプト

`.github/scripts/check_site.py` を新規作成。検査内容:

1. **内部リンク**: 全 HTML の `href` / `src` のうち、`http(s):` / `mailto:` / `#` 始まり
   以外を対象に、`?` / `#` 以降を除去した参照先ファイルがリポジトリ内に存在すること
2. **画像 alt**: すべての `<img>` に空でない `alt` があること
3. **nav.js**: すべてのページ(`templates/` 除く)が `assets/nav.js` を読み込んでいること
4. **ヘッダー整合**: 各ページの `<header class="site-header">…</header>` ブロックが、
   テンプレートの同ブロックに「`{{BASE}}` をページ深度相当のプレフィックスに置換し、
   `class="active"` と `aria-current` 属性の有無を無視する正規化」を適用したものと
   一致すること。不一致はページ名と差分を表示して fail

実装は `html.parser` 等の標準ライブラリで行い、違反は「ファイル名 + 行番号(可能なら)+
内容」で列挙して非ゼロ終了する。

まず**ローカルで現行サイトに対して実行**し、既存違反の有無を報告する
(`TODO.md` のチェックリストが守られていれば 0 件のはず。ヘッダー整合だけは
正規化ルールの調整が必要になる可能性があるので、実ページに合わせて正規化を詰める。
**実ページ側をスクリプトに合わせて書き換えないこと**)。

### Phase 2: CI 組み込み

`pages.yml` に `check` ジョブを追加し、`deploy` を `needs: check` にする。
さらに `pull_request` トリガーを追加し、`deploy` ジョブには
`if: github.event_name != 'pull_request'` を付けて PR ではチェックのみ走るようにする。
`workflow_dispatch` の挙動は維持。

### Phase 3(任意): 画像再圧縮

- 対象: 500KB 超の画像のみ(現時点では `qr-import.jpg` 1 枚)
- 文字が読める品質を保ったまま再圧縮し、前後のファイルサイズと目視確認結果を報告
- 迷ったら実施せず提案として報告(スクリーンショットの可読性はマニュアルの生命線)

### Phase 4(提案のみ・実装禁止)

- `<img>` への `loading="lazy"` / `width` / `height` 付与(47 ページの一括編集になるため
  提案だけ)
- アンカー(`#fragment`)の存在検査の追加

---

## Verification Requirements

- `python3 .github/scripts/check_site.py` がローカルで成功すること(既存違反があり
  修正対象外の場合はその旨を報告し、当該検査の扱いを Stop And Ask)
- ヘッダー整合検査の有効性確認: 任意のページのナビを一時的に 1 文字変えて検査が fail する
  こと、戻して pass することを確認(一時変更は必ず原状復帰し、確認した旨を報告)
- `git diff` で、変更が `.github/` 配下(+ Phase 3 実施時の対象画像)に限られること
- workflow YAML の構文確認(`actionlint` があれば使用、無ければ目視 + 構造説明)

## Reporting Format

1. Phase 0 の確認結果(ページ一覧と TODO の一致)
2. 検査スクリプトの検査項目と、現行サイトへの初回実行結果(違反 0 件か、件数と内訳)
3. ヘッダー整合の正規化ルールの説明(BASE 置換・active 無視の具体実装)
4. fail 動作確認の結果(一時変更 → fail → 原状復帰 → pass)
5. Phase 3 の実施有無と前後サイズ
6. `git diff --stat`(変更範囲の証明)
7. Stop And Ask(発生した場合)

## Out-of-scope Items

- 静的サイトジェネレータ・テンプレートエンジンの導入
- 本文・表記・ナビ構成・URL・`templates/` の変更
- 外部 URL の死活監視
- `release-notes.html` の執筆(コンテンツ作業。`TODO.md` で別管理)
- 他リポジトリの変更

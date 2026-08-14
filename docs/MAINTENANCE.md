# Maintenance Guide

FA Labo PLC Console マニュアルサイトのメンテナ向け資料です。GitHub の入口になる `README.md` には軽い説明だけを置き、編集方針や運用ルールはこのファイルで管理します。

## Directory Layout

| Path | 内容 |
| --- | --- |
| `index.html` | 目次トップ |
| `start/` | 入手・インストール、はじめる |
| `plc/` | 接続、接続設定例、MELSEC / KEYENCE 設定 |
| `plc/models/` | 対応機種ごとの接続設定例ページ |
| `monitoring/` | 監視、List 登録編集、デバイス操作パネル、書込、CPU操作、コメント、タイムチャート、トラップ |
| `transfer/` | QR / JSON、プロジェクトJSON |
| `settings/` | メニュー、アプリ設定、ライセンス/購入 |
| `projectbuilder/` | ProjectBuilder、入力、QR 生成 |
| `reference/` | 公開情報、用語集、リリースノート、困ったとき |
| `assets/style.css` | ページスタイル |
| `assets/images/plc/` | 接続・PLC 設定系スクリーンショット |
| `assets/images/monitoring/` | 監視・記録系スクリーンショット |
| `assets/images/transfer/` | QR / JSON 転送系スクリーンショット |
| `assets/images/projectbuilder/` | ProjectBuilder ロゴ・関連画像 |
| `templates/` | 共通ヘッダー/ナビ更新時の参照テンプレート |
| `TODO.md` | ページ作成状態と更新チェックリスト |

## Editing Workflow

1. Android / iOS / ProjectBuilder の source code、localization、resource を確認する。
2. 実装されている画面名、ボタン名、メニュー名に合わせて本文を書く。
3. 新しいページを追加した場合は、`index.html`、上部ナビ、前後リンク、`TODO.md` の状態一覧を同時に更新する。
4. スクリーンショットを差し替えた場合は、対象画面と撮影日を作業メモや PR 説明で追えるようにする。
5. 更新後にリンク、画像参照、表記ゆれ、実装との矛盾を確認する。
6. 共通ヘッダーや上部ナビを変更する場合は、`templates/page-shell.html.tmpl` を先に更新し、各 HTML へ反映する。

## Writing Rules

### 基本方針

- 公開マニュアルはユーザー向けの操作説明であり、内部仕様書ではない。
- ユーザーが押すボタン、選ぶメニュー、入力する値、成功時の表示、失敗時に見る場所を優先する。
- ユーザーが知らなくてよい内部形式、互換処理、ライブラリ名、開発用画面は通常ページに混ぜない。
- 実装で確認できない機能、未実装の導線、想像した便利機能は書かない。
- スクリーンショットに実画面の内部情報が写ることと、本文でその情報を説明することは別に扱う。

### ページ構成

新規ページや大きく書き直すページは、必要な項目だけを選んで次の順に揃える。

1. 対象: Android / iOS 共通、Android のみ、iOS のみ、ProjectBuilder、MELSEC、KEYENCE のどれか。
2. 実行条件: 接続状態、プロジェクトの有無、ライセンス、対応 PLC、登録上限など。
3. 入口: どの画面、タブ、メニュー、ボタンから開くか。
4. 操作: 押す順番、入力する値、選ぶ項目。
5. 結果: 成功時に画面やステータスがどう変わるか。
6. 失敗時の確認: ステータス、エラー履歴、接続設定、PLC 側設定、権限、QR 設定など。
7. MELSEC / KEYENCE 差分: 差分がある場合だけ分けて書く。
8. Android / iOS 差分: 差分がある場合だけ分けて書く。

### 表記ルール

- アプリ名は `FA Labo PLC Console`、PC ツール名は `PLC Console ProjectBuilder`（短縮時は `ProjectBuilder`）、repository 名は `PlcIoChecker_ProjectBuilder` に統一する。
- 日本語表記は `プロジェクト`、`プロジェクト名`、`プロジェクトJSON` に統一する。
- 画面名は app 表示に合わせて `List`、`Block`、`デバイス操作パネル`、`タイムチャート`、`トラップ`、`List 登録編集` を使う。
- 操作名は表示文言に合わせて `QR読込`、`JSON読込`、`JSON書出`、`CSVコメント読込`、`コメント読込`、`CPU操作` と書く。
- PLC 種別は `MELSEC` / `KEYENCE`、通信方式は `SLMP（Seamless Message Protocol）` / `Host-link（上位リンク）` と書く。
- 通常の操作ページでは、内部フィールド名ではなく画面表示を使う。例: `ネットワーク`、`局番`、`ユニットI/O`、`マルチドロップ`。
- `BIT` / `WORD`、`データタイプ`、`address`、`comment` の意味を混ぜない。
- 公開ページでは原則として内部名を出さない。内部名との対応はこの保守メモで管理する。

### 画面名と内部名

| 公開表示名 | 英語表記 | アプリ内部名・実装名 | 備考 |
| --- | --- | --- | --- |
| List / リスト | List | `List` / `ViewMode.List` | 登録済みデバイス一覧 |
| Block / ブロック | Block | `Block` / `ViewMode.Block` | デバイス範囲のページ表示 |
| デバイス操作パネル | Device Control Panel | `FocusPanel` | List / Block で選択した 1 デバイスを操作する下部シート/右側ペイン |
| ON/OFF操作 | ON/OFF control | `FocusPanel` 内の BIT 書込操作 | パネル名ではなく、BIT デバイスの大きな ON/OFF ボタンの操作名 |
| 表示型を選択 | Select display type | `Select display type` dialog | WORD デバイスの `Type` から開く表示/書込型選択 |
| モニタ表示設定 | Monitor Display Settings | Block display/settings dialog | `コンパクト / 詳細` と `グラフ100%値` を設定 |
| タイムチャート | Time Chart | `TimeChart` | チャンネル登録と記録 |
| トラップ | Trap | `Trap` | 条件登録と検知履歴 |

### MELSEC / KEYENCE 差分

- 通信方式、設定項目、対応デバイス、コメント読込、CPU操作、JSON 項目が変わる場合は、共通説明に混ぜず見出しや表で分ける。
- 対応 PLC 機種、CPU機種、既定ポート、通信方式、対応デバイス、アドレス表記、使用できない設定項目は source code で確認する。

### 接続設定例ページ

- `plc/models/*.html` は、設定例の前提、PLC 側設定画面、PLC 側設定項目、アプリ側で選ぶ項目、前後ナビの順に揃える。
- `アプリ側で選ぶ項目` は、前後ナビの直前に置く。
- スクリーンショットのキャプションは `PLC 側設定画面 N(設定画面名)` の形に揃える。
- スクリーンショット画像は横並びにせず、1枚ずつ縦に並べて文字が読める大きさを保つ。
- 説明用の IP アドレスやポート番号は、必須値ではなく設定例であることを前提文に明記する。

### ストア公開時の扱い

- App Store / Google Play のリンクは、正式 URL が確定してから掲載する。
- 未確定の金額は書かない。価格は Store 公開時の表示を正とする。
- ユーザー向けページには、未確定項目を作業メモとして出さず、必要な場合は `公開状況` や `ストアリンク` として説明する。
- Store 公開作業の内部チェックは `.github/STORE_RELEASE_CHECKLIST.md` で管理する。
- ユーザー向け本文には、作業メモ、仮リンク、開発用語を混ぜない。
- 公開 build から開発用表記、開発用の購入状態表示、未確定の金額表示が消えていることを `.github/STORE_RELEASE_CHECKLIST.md` に残す。

### リリースノート

- リリースノートには、公開済みの FA Labo PLC Console アプリの変更点だけを書く。
- 未実装の予定機能や、公開していない変更は書かない。
- MELSEC / KEYENCE、Android / iOS で影響範囲が違う場合は分けて書く。
- ProjectBuilder の更新履歴は、ProjectBuilder 側の Releases で扱う。
- 書込、CPU操作、通信、QR / JSON に関わる変更は、必要な注意点も一緒に書く。

## Tracking

ページ作成状態と更新チェックリストは [`TODO.md`](../TODO.md) で管理します。
画面、パネル、シート、ダイアログの正式名と内部名の対応は [`WINDOW_NAMES.md`](./WINDOW_NAMES.md) で管理します。
画面名以外の機能名、操作名、表示モード名、データ名は [`NAMING_CATALOG.md`](./NAMING_CATALOG.md) で管理します。

## Preview

ブラウザで repository root の `index.html` を開けば確認できます。静的ファイルだけで動作するため、GitHub Pages や通常の Web サーバーへそのまま配置できます。

macOS の terminal から開く場合:

```bash
open https://fa-yoshinobu.github.io/PlcIoChecker_Site/
```

Windows PowerShell からローカル確認する場合:

```powershell
Start-Process .\index.html
```

## GitHub Pages

この repository は GitHub Pages でそのまま公開できる構成です。

- 公開入口は repository root の `index.html`。
- Jekyll 処理を避けるため `.nojekyll` を置く。
- `.github/workflows/pages.yml` は `main` branch への push または manual dispatch で実行する。
- workflow は root の静的ファイルを `_site` へコピーし、`.git`、`.github`、`README.md` を除外して Pages artifact として deploy する。
- GitHub repository settings の Pages source は `GitHub Actions` を選ぶ。

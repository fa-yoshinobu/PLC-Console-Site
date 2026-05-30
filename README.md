# PLC IO Checker Manual Site

PLC IO Checker の Web 公開用マニュアルです。Android / iOS 共通の操作説明と、PC 用 `PlcIoChecker_ProjectBuilder` の説明を、機能別 HTML に分けて管理します。

- Public site: <https://fa-yoshinobu.github.io/PlcIoChecker_Site/>
- Privacy policy: <https://fa-yoshinobu.github.io/PlcIoChecker_Site/reference/privacy-policy.html>

ProjectBuilder の exe は、`PlcIoChecker_ProjectBuilder` の Releases にある Assets から `PlcIoCheckerProjectBuilder-win-x64.zip` をダウンロードして使用します。

## Related Repositories

- ProjectBuilder: <https://github.com/fa-yoshinobu/PlcIoChecker_ProjectBuilder>
- Manual site: <https://github.com/fa-yoshinobu/PlcIoChecker_Site>

## Directory Layout

| Path | 内容 |
| --- | --- |
| `index.html` | 目次トップ |
| `start/` | 入手・インストール、はじめる |
| `plc/` | 対応 PLC、接続、接続設定例、MELSEC / KEYENCE 設定 |
| `plc/models/` | 対応機種ごとの接続設定例ページ。未作成の機種は作成中として扱う |
| `monitoring/` | 監視、List 登録編集、操作パネル、書込、CPU操作、コメント、タイムチャート、トラップ |
| `transfer/` | QR / JSON、プロジェクトJSON |
| `settings/` | メニュー、アプリ設定、ライセンス/購入 |
| `projectbuilder/` | ProjectBuilder、入力、QR 生成 |
| `reference/` | 公開情報、用語集、リリースノート、困ったとき |
| `assets/style.css` | ページスタイル |
| `assets/images/plc/` | 接続・PLC 設定系スクリーンショット |
| `assets/images/monitoring/` | 監視・記録系スクリーンショット |
| `assets/images/transfer/` | QR / JSON 転送系スクリーンショット |
| `assets/images/projectbuilder/` | ProjectBuilder ロゴ・関連画像 |

## Editing Workflow

1. Android / iOS / ProjectBuilder の source code、localization、resource を確認する。
2. 実装されている画面名、ボタン名、メニュー名に合わせて本文を書く。
3. 新しいページを追加した場合は、`index.html`、上部ナビ、前後リンク、README の状態一覧を同時に更新する。
4. スクリーンショットを差し替えた場合は、対象画面と撮影日を作業メモや PR 説明で追えるようにする。
5. 更新後にリンク、画像参照、表記ゆれ、実装との矛盾を確認する。

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

- アプリ名は `PLC IO Checker`、PC ツール名は `ProjectBuilder` または `PlcIoChecker_ProjectBuilder` に統一する。
- 日本語表記は `プロジェクト`、`プロジェクト名`、`プロジェクトJSON` に統一する。
- 画面名は app 表示に合わせて `List`、`Block`、`タイムチャート`、`トラップ`、`List 登録編集` を使う。
- 操作名は表示文言に合わせて `QR読込`、`JSON読込`、`JSON書出`、`CSVコメント読込`、`コメント読込`、`CPU操作` と書く。
- PLC 種別は `MELSEC` / `KEYENCE`、通信方式は `SLMP（Seamless Message Protocol）` / `Host-link` と書く。
- 通常の操作ページでは、内部フィールド名ではなく画面表示を使う。例: `ネットワーク`、`局番`、`ユニットI/O`、`マルチドロップ`。
- `BIT` / `WORD`、`データタイプ`、`address`、`comment` の意味を混ぜない。

### MELSEC / KEYENCE 差分

- 通信方式、設定項目、対応デバイス、コメント読込、CPU操作、JSON 項目が変わる場合は、共通説明に混ぜず見出しや表で分ける。
- 対応 PLC 機種、CPU機種、既定ポート、通信方式、対応デバイス、アドレス表記、使用できない設定項目は source code で確認する。

### 公開前確認

- App Store / Google Play のリンクは、正式 URL が確定してから掲載する。
- 未確定の金額は書かない。価格は Store 公開時の表示を正とする。
- 未確定項目は、各ページ冒頭の `公開前確認` または `reference/store-release-checklist.html` の `公開前ブロッカー` に集約する。
- ユーザー向け本文には、作業メモ、仮リンク、開発用語を混ぜない。
- 開発中の購入 UI がある場合は、公開 build から開発用表記、開発用の購入状態表示、未確定の金額表示が消えていることを公開準備ページに残す。

### リリースノート

- リリースノートには、公開済みの PLC IO Checker アプリの変更点だけを書く。
- 未実装の予定機能や、公開していない変更は書かない。
- MELSEC / KEYENCE、Android / iOS で影響範囲が違う場合は分けて書く。
- ProjectBuilder の更新履歴は、ProjectBuilder 側の Releases で扱う。
- 書込、CPU操作、通信、QR / JSON に関わる変更は、必要な注意点も一緒に書く。

## Page Status

| 状態 | Page |
| --- | --- |
| 作成済み | `start/install.html` |
| 作成済み | `start/getting-started.html` |
| 作成済み | `plc/supported-plc.html` |
| 作成済み | `plc/connection.html` |
| 作成済み | `plc/plc-side-settings.html` |
| 作成済み | `plc/melsec-settings.html` |
| 作成済み | `plc/keyence-settings.html` |
| 作成中 | `plc/models/*.html` |
| 作成済み | `monitoring/monitoring.html` |
| 作成済み | `monitoring/list-edit.html` |
| 作成済み | `monitoring/focus-panel.html` |
| 作成済み | `monitoring/writing.html` |
| 作成済み | `monitoring/cpu-control.html` |
| 作成済み | `monitoring/comments.html` |
| 作成済み | `monitoring/time-chart.html` |
| 作成済み | `monitoring/traps.html` |
| 作成済み | `transfer/import-export.html` |
| 作成済み | `transfer/project-json.html` |
| 作成済み | `settings/tools-menu.html` |
| 作成済み | `settings/app-settings.html` |
| 作成済み | `settings/license.html` |
| 作成済み | `projectbuilder/projectbuilder.html` |
| 作成済み | `projectbuilder/projectbuilder-devices.html` |
| 作成済み | `projectbuilder/projectbuilder-qr.html` |
| 作成済み | `reference/privacy-policy.html` |
| 作成済み | `reference/app-permissions.html` |
| 作成済み | `reference/terms.html` |
| 作成済み | `reference/purchase-info.html` |
| 作成済み | `reference/support.html` |
| 作成済み | `reference/store-release-checklist.html` |
| 作成済み | `reference/glossary.html` |
| 作成中 | `reference/release-notes.html` |
| 作成済み | `reference/troubleshooting.html` |

## Update Checklist

- [ ] Android / iOS / ProjectBuilder の source code、localization、resource と矛盾していない。
- [ ] 画面名、ボタン名、メニュー名、主要用語が実画面と一致している。
- [ ] 未実装機能、開発用機能、推測した便利機能を書いていない。
- [ ] MELSEC / KEYENCE の差分を混ぜずに分けている。
- [ ] QR / JSON の通常操作ページに内部形式の説明を混ぜていない。
- [ ] App Store / Google Play の正式 URL が未確定の場合は、仮リンクを置かず公開前確認に残している。
- [ ] 書込、CPU操作、トラップ、REC など危険操作に注意書きがある。
- [ ] `index.html`、上部ナビ、前後リンク、README の `Page Status` が実ページ構成と一致している。
- [ ] HTML リンク切れ、画像参照切れ、alt text 抜けがない。

## Preview

ブラウザで `index.html` を開けば確認できます。静的ファイルだけで動作するため、GitHub Pages や通常の Web サーバーへそのまま配置できます。

macOS の terminal から開く場合:

```bash
open https://fa-yoshinobu.github.io/PlcIoChecker_Site/
```

## GitHub Pages

この repository は GitHub Pages でそのまま公開できる構成です。

- 公開入口は repository root の `index.html`。
- Jekyll 処理を避けるため `.nojekyll` を置く。
- `.github/workflows/pages.yml` は `main` branch への push または manual dispatch で実行する。
- workflow は root の静的ファイルを `_site` へコピーし、`.git`、`.github`、`README.md` を除外して Pages artifact として deploy する。
- GitHub repository settings の Pages source は `GitHub Actions` を選ぶ。

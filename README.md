# PLC IO Checker Manual

Web公開用の静的マニュアルです。Android / iOS 共通の操作説明と、PC 用 `PlcIoChecker_ProjectBuilder` の説明を機能別 HTML に分割しています。

Public site: <https://fa-yoshinobu.github.io/PlcIoChecker_Site/>
Privacy policy: <https://fa-yoshinobu.github.io/PlcIoChecker_Site/reference/privacy-policy.html>

Terminal で URL を直接入力すると `zsh: no such file or directory` になります。ブラウザで開くか、macOS の terminal では次のように実行します。

```bash
open https://fa-yoshinobu.github.io/PlcIoChecker_Site/
```

ProjectBuilder の exe は <https://github.com/fa-yoshinobu/PlcIoChecker_ProjectBuilder/releases> の各リリースにある Assets から `PlcIoCheckerProjectBuilder-win-x64.zip` をダウンロードして使用します。
ProjectBuilder のソースと README は <https://github.com/fa-yoshinobu/PlcIoChecker_ProjectBuilder> です。

## Related Repositories

- Android app: <https://github.com/fa-yoshinobu/PlcIoChecker_Android>
- iOS app: <https://github.com/fa-yoshinobu/PlcIoChecker_iOS>
- ProjectBuilder: <https://github.com/fa-yoshinobu/PlcIoChecker_ProjectBuilder>
- Manual site: <https://github.com/fa-yoshinobu/PlcIoChecker_Site>

## Files

- `index.html`: 目次トップ
- `start/`: 入手・インストール、はじめる
- `plc/`: 対応 PLC、接続・プロジェクト、PLC 側設定参考、MELSEC / KEYENCE 設定、デバイス表記
- `plc/models/`: 対応機種ごとの PLC 側設定参考ページ。現時点は dummy / TODO
- `monitoring/`: 監視、List 登録編集、操作パネル、書込、コメント、タイムチャート、トラップ
- `transfer/`: QR / JSON、プロジェクトJSON
- `settings/`: メニュー・設定、アプリ設定、ライセンス/購入
- `projectbuilder/`: ProjectBuilder、ProjectBuilder 入力、ProjectBuilder QR 生成
- `reference/`: 用語集、FAQ、リリースノート、困ったとき
- `reference/support.html`: Store metadata 用サポート URL 候補
- `reference/privacy-policy.html`: Store metadata 用プライバシーポリシー URL 候補
- `reference/app-permissions.html`: Android / iOS の権限、Local Network、カメラ、ファイルアクセス
- `reference/terms.html`: 利用条件
- `reference/purchase-info.html`: 購入・返金案内
- `reference/store-release-checklist.html`: iOS / Android 有料公開前 TODO
- `assets/style.css`: ページスタイル
- `assets/images/plc/`: 接続・PLC 設定系スクリーンショット
- `assets/images/monitoring/`: 監視・記録系スクリーンショット
- `assets/images/transfer/`: QR/JSON 転送系スクリーンショット
- `assets/images/projectbuilder/`: ProjectBuilder ロゴ・関連画像

## Manual Writing Rules

- Android / iOS / ProjectBuilder の source code、localization/resource、既存 docs を確認してから書く。
- 公開マニュアルはユーザー向けの操作説明であり、内部仕様書ではない。通常ページでは、ユーザーが操作、判断、復旧に使わない実装詳細を書かない。
- スクリーンショットに実画面の内部情報が写ることと、本文でその情報を説明することは別に扱う。スクリーンショットは実画面として載せてよいが、本文はユーザーが押すボタン、選ぶメニュー、入力する値、成功/失敗時に見る場所を優先する。
- payload、checksum、session、schema、圧縮方式、ライブラリ名、内部互換処理などは通常の操作説明に混ぜない。必要な場合だけ、形式確認ページや開発者向けメモに分ける。
- 実装で確認できない機能、未実装の導線、想像した便利機能は書かない。
- 開発用メニュー、開発用 overlay、開発用画面や隠し機能は公開マニュアルに載せない。
- Android / iOS 共通の動作は共通説明として書き、差分が実装上存在する場合だけプラットフォーム差分として書く。
- MELSEC と KEYENCE で通信方式、設定項目、対応デバイス、コメント読込、CPU操作、JSON 項目が変わる場合は、共通説明に混ぜず `MELSEC` / `KEYENCE` の見出しや表で分けて書く。
- 対応 PLC 機種、CPU model 選択肢、既定ポート、通信方式、対応デバイス、アドレス表記、使用できない設定項目は source code で確認し、接続・ProjectBuilder・困ったときのページに必要な範囲で書く。
- 内容が多い場合は 1 ページに詰め込まず、操作単位・機能単位・MELSEC / KEYENCE 差分単位でページを細分化する。HTML は機能別フォルダへ分け、ページを増やした場合は `index.html`、前後リンク、上部ナビ、README の file list も更新する。
- 画像も用途別フォルダへ分ける。接続・PLC 設定系は `assets/images/plc/`、監視・記録系は `assets/images/monitoring/`、QR/JSON 転送系は `assets/images/transfer/`、ProjectBuilder 関連は `assets/images/projectbuilder/` を使う。
- App Store / Google Play へのリンクを載せる場合、正式 URL が未確定なら dummy link として書き、公開済み・購入可能と誤読される表現にしない。
- 画面名、ボタン名、メニュー名は app の表示文言に合わせる。手で別名を作らない。
- 用語を変更する場合は Android の `app/src/main/res/values*/strings.xml`、iOS の `ios-app/PlcIoChecker/*.lproj/Localizable.strings`、ProjectBuilder の `dotnet/src/PlcIoCheckerQr.Wpf/Languages/*.json` を先に照合し、resource と Site の表記がずれないようにする。
- QR/JSON の通常操作ページでは、読込順、保存メニュー、読み取りにくい場合の対処など、ユーザー操作に必要な範囲だけ説明する。内部形式の詳細は形式確認ページに分ける。
- 旧 QR 形式や未対応形式の fallback、alias 変換、互換 normalization を案内しない。
- 未確定の金額は公開 manual に書かない。価格は Store 公開時の表示を正とし、確定前は TODO として残す。
- Privacy Policy、Support URL、Terms、Purchase / Refund は Store 申請で使う公開 URL として単独ページを用意し、未定項目は細かく TODO に分ける。
- Android / iOS の購入 UI が mock の間は、公開 build から mock 表記、開発用アンロック、未確定の金額表示が消えていることを Store 申請 TODO に残す。
- 書込、CPU操作、トラップなど実設備へ影響する操作は、安全確認と対象確認の注意を残す。
- 更新後は HTML リンク、画像参照、見出し、表記ゆれ、Android / iOS / ProjectBuilder の実装との矛盾を確認する。

## Detailed Manual Policy

- 各ページの冒頭で対象を明確にする。対象が Android / iOS 共通、Android のみ、iOS のみ、ProjectBuilder のみ、MELSEC のみ、KEYENCE のみのどれか分かるように書く。
- 操作説明は原則として「入口」「操作」「結果」「失敗時の確認」の順で書く。
- 接続していないと使えない機能、プロジェクトがないと使えない機能、ライセンス状態で変わる機能は実行条件を先に書く。
- 書込、CPU操作、トラップ、REC、コメント読込、QR/JSON 取込は、成功時の表示と失敗時に見る場所を必ず書く。
- ProjectBuilder で作成する内容と、モバイルアプリ側で編集する内容を混ぜない。どちらで行う操作かを明記する。
- 登録上限、対応データ型、複数ページ QR、読み取り順、CSV/JSON の列や項目など、ユーザーが入力前に知るべき制約を書く。
- ユーザーが知らなくてよい値や内部状態は書かない。説明が詳細化しすぎた場合は、操作手順、入力項目、表示結果、失敗時の確認に戻して整理する。
- スクリーンショットを差し替える場合は、対象画面と撮影日を commit か作業メモで追えるようにする。
- 詳細説明を書く時は、根拠として確認した source file、resource、docs を作業メモや PR 説明に残す。

## Page Template

新規ページや大きく書き直すページは、必要な項目だけを選んでこの順に揃える。

1. 対象: Android / iOS 共通、Android のみ、iOS のみ、ProjectBuilder、MELSEC、KEYENCE のいずれかを明記する。
2. 実行条件: 接続状態、プロジェクトの有無、ライセンス、対応 PLC、登録上限などを書く。
3. 入口: どの画面、タブ、メニュー、ボタンから開くかを書く。
4. 操作: ユーザーが押す順番、入力する値、選ぶ項目を書く。
5. 結果: 成功時に画面やステータスがどう変わるかを書く。
6. 失敗時の確認: ステータス、エラー履歴、接続設定、PLC 側設定、権限、QR 設定など、次に見る場所を書く。
7. MELSEC / KEYENCE 差分: 差分がある場合だけ分けて書く。
8. Android / iOS 差分: 差分がある場合だけ分けて書く。

## Terminology Rules

- アプリ名は `PLC IO Checker`、PC ツール名は `ProjectBuilder` または `PlcIoChecker_ProjectBuilder` に統一する。
- Android / iOS / ProjectBuilder / Site の日本語表記は `プロジェクト`、`プロジェクト名`、`プロジェクトJSON` に統一する。旧称は使わない。
- 表記を変える場合は、先に Android / iOS / ProjectBuilder の localization/resource と画面表示を変更してから Site を更新する。
- 画面名は app 表示に合わせて `List`、`Block`、`タイムチャート`、`トラップ`、`List 登録編集` を使う。
- 操作名は表示文言に合わせて `QR読込`、`JSON読込`、`JSON書出`、`CSVコメント読込`、`コメント読込`、`CPU操作` と書く。
- PLC 種別は `MELSEC` / `KEYENCE`、通信方式は `SLMP` / `KV Host Link` のように source と実装に合わせる。
- デバイス説明では `BIT` / `WORD`、`data type`、`address`、`comment` の意味が混ざらないように分ける。
- `トラップ` と `タイムチャート` は登録対象、実行条件、記録・検知結果を分けて説明する。
- Store や購入に関する説明は、正式公開前は `dummy link`、`予定`、`mock` など現状が分かる表現にする。
- ただし価格や金額は、正式確定前に具体額を書かない。

## Publish Checklist

公開前または大きな更新後は、最低限ここを確認する。

- [ ] Android / iOS / ProjectBuilder の source code、localization/resource、既存 docs と矛盾していない。
- [ ] 画面名、ボタン名、メニュー名、主要用語が Android / iOS / ProjectBuilder の resource と一致している。
- [ ] 未実装機能、開発用機能、推測した便利機能を書いていない。
- [ ] MELSEC / KEYENCE の差分を混ぜずに分けている。
- [ ] 対応 PLC 機種、既定ポート、通信方式、対応デバイスなどの表記が source code と一致している。
- [ ] QR/JSON の通常操作ページに内部形式の説明を混ぜていない。形式詳細が必要な場合は専用ページに分けている。
- [ ] App Store / Google Play が正式 URL 未確定の場合は dummy link として扱っている。
- [ ] 書込、CPU操作、トラップ、REC など危険操作に注意書きがある。
- [ ] `index.html`、上部ナビ、前後リンク、README の `Files` が実ページ構成と一致している。
- [ ] HTML と画像が機能別フォルダに分かれており、参照パスが崩れていない。
- [ ] HTML リンク切れ、画像参照切れ、alt text 抜けがない。
- [ ] スクリーンショットが古い場合は差し替えるか、本文が画像に依存しすぎないようにしている。

## Page Status

未作成ページが出た場合は TODO として残す。実際に追加したページだけ `Files`、`index.html`、前後リンク、上部ナビへ反映する。

- [x] `start/install.html`: Android / iOS アプリ入手先、ProjectBuilder 入手先、App Store / Google Play dummy link。
- [x] `plc/supported-plc.html`: 対応 PLC 機種、CPU model、既定ポート、通信方式。
- [ ] `plc/plc-side-settings.html`: PLC 側設定参考の親ページ。詳細内容は TODO。
- [ ] `plc/models/*.html`: 対応機種ごとの PLC 側設定参考ページ。詳細内容は TODO。
- [x] `plc/melsec-settings.html`: MELSEC の SLMP、TCP/UDP、ルート指定、remote password、X/Y 表記。
- [x] `plc/keyence-settings.html`: KEYENCE の KV Host Link、Normal/XYM、コメント読込、対応デバイス。
- [x] `plc/device-addressing.html`: デバイス種別、10 進/16 進/8 進、BIT/WORD、data type。
- [x] `monitoring/list-edit.html`: `List 登録編集`、単体追加、範囲追加、検索、並び替え、削除。
- [x] `monitoring/focus-panel.html`: ON/OFF、数値書込、Dec/Hex/Bit、表示型変更、タイムチャート/トラップ追加導線。
- [x] `settings/app-settings.html`: 多言語、ライト/ダーク、画面配置、ビット書込モード。
- [x] `settings/license.html`: 無料枠、MELSEC / KEYENCE 実機通信、App Store / Google Play dummy link。
- [x] `projectbuilder/projectbuilder-devices.html`: デバイス、タイムチャート、トラップの入力、貼り付け、登録上限。
- [x] `projectbuilder/projectbuilder-qr.html`: QR 生成、分割サイズ、表示サイズ、誤り訂正、PNG/JSON 保存。
- [x] `transfer/project-json.html`: schema v3、MELSEC / KEYENCE の JSON 差分、対応 value set。
- [x] `reference/glossary.html`: プロジェクト、デバイス、address、data type、BIT、WORD、トラップ、タイムチャートなどの用語。
- [x] `reference/faq.html`: 接続、QR、REC、書込、コメント読込、ライセンス、エラー履歴の確認項目。
- [ ] `reference/release-notes.html`: リリースノート。正式な変更履歴は TODO。
- [x] `reference/privacy-policy.html`: INTERNET permission、ユーザー設定 PLC への通信、個人情報非収集を記載。
- [x] `reference/app-permissions.html`: Android / iOS の permission、Local Network、Camera、storage/file access を source code ベースで整理。
- [x] `reference/support.html`: Store 用 Support URL 候補。正式連絡先は TODO。
- [x] `reference/terms.html`: 利用条件。法務・販売条件の未定事項は TODO。
- [x] `reference/purchase-info.html`: 購入、返金、Store URL。価格は未定として金額を書かない。
- [x] `reference/store-release-checklist.html`: Android / iOS / ProjectBuilder TODO を Store 申請前項目として整理。

## Preview

ブラウザで `index.html` を開けば確認できます。静的ファイルだけで動作するため、GitHub Pages や通常の Web サーバーへそのまま配置できます。

## GitHub Pages

この repository は GitHub Pages でそのまま公開できる構成です。

- 公開入口は repository root の `index.html`。
- Jekyll 処理を避けるため `.nojekyll` を置く。
- `.github/workflows/pages.yml` は `main` branch への push または manual dispatch で実行する。
- workflow は root の静的ファイルを `_site` へコピーし、`.git`、`.github`、`README.md` を除外して Pages artifact として deploy する。
- GitHub repository settings の Pages source は `GitHub Actions` を選ぶ。
- 初回は Pages が無効だと `Setup Pages` が `Get Pages site failed` で失敗する。Repository Settings > Pages で Source を `GitHub Actions` に変更してから、workflow を rerun する。

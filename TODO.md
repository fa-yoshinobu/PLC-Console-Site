# FA Labo PLC Console マニュアルサイト TODO

ページ作成状態と更新前後の確認項目を管理します。

最終確認日: 2026-08-25

## 未完了作業

- 正式な App Store / Google Play URL と公式バッジ画像が確定したら、`templates/store-links.html.tmpl` を使って公開ページへストアリンクを追加する。
- 新名称が表示される状態でモバイルアプリのバージョン情報画面を再撮影し、`settings/version-info.html` に再掲載する。
- Windowsで PLC Console ProjectBuilder の5画面を再撮影し、ProjectBuilderの操作ページに再掲載する。
- 最新のモバイルアプリUIが確定したら、`start/getting-started.html`、`monitoring/list-edit.html`、`monitoring/focus-panel.html`、`monitoring/writing.html`、`settings/tools-menu.html` の操作説明用画像を撮影して掲載する。

## ページ状態

| 状態 | ページ |
| --- | --- |
| 作成済み | `index.html` |
| 作成済み | `search.html` |
| 作成済み | `404.html` |
| 作成済み | `start/install.html` |
| 作成済み | `start/getting-started.html` |
| 作成済み | `plc/connection.html` |
| 作成済み | `plc/plc-side-settings.html` |
| 作成済み | `plc/melsec-settings.html` |
| 作成済み | `plc/keyence-settings.html` |
| 作成済み | `plc/models/*.html` |
| 作成済み | `monitoring/monitoring.html` |
| 作成済み | `monitoring/list-edit.html` |
| 作成済み | `monitoring/focus-panel.html` |
| 作成済み | `monitoring/writing.html` |
| 作成済み | `monitoring/comments.html` |
| 作成済み | `monitoring/time-chart.html` |
| 作成済み | `monitoring/traps.html` |
| 作成済み | `settings/tools-menu.html` |
| 作成済み | `settings/cpu-control.html` |
| 作成済み | `settings/device-range.html` |
| 作成済み | `settings/monitor-display-settings.html` |
| 作成済み | `settings/comment-import.html` |
| 作成済み | `settings/csv-comment-import.html` |
| 作成済み | `settings/qr-import.html` |
| 作成済み | `settings/json-import.html` |
| 作成済み | `settings/json-export.html` |
| 作成済み | `settings/project-json.html` |
| 作成済み | `settings/error-history.html` |
| 作成済み | `settings/app-settings.html` |
| 作成済み | `settings/license.html` |
| 作成済み | `settings/version-info.html` |
| 作成済み | `projectbuilder/projectbuilder.html` |
| 作成済み | `projectbuilder/projectbuilder-devices.html` |
| 作成済み | `projectbuilder/projectbuilder-qr.html` |
| 作成済み | `reference/privacy-policy.html` |
| 作成済み | `reference/app-permissions.html` |
| 作成済み | `reference/terms.html` |
| 作成済み | `reference/purchase-info.html` |
| 作成済み | `reference/support.html` |
| 作成済み | `reference/glossary.html` |
| 作成済み | `reference/release-notes.html` |
| 作成済み | `reference/troubleshooting.html` |

## 更新チェックリスト

このチェックリストは更新作業ごとに確認し、確認後に `最終確認日` を更新します。

- [x] Android / iOS / ProjectBuilder のソースコード、ローカライズ、リソースと矛盾していない。
- [x] 画面名、ボタン名、メニュー名、主要用語が実画面と一致している。
- [x] 未実装機能、開発用機能、推測した便利機能を書いていない。
- [x] MELSEC / KEYENCE の差分を混ぜずに分けている。
- [x] QR / JSON の通常操作ページに内部形式の説明を混ぜていない。
- [x] App Store / Google Play の正式 URL が未確定の場合は、仮リンクを置かず、ユーザー向けの公開状況説明にしている。
- [x] 書込、CPU操作、トラップ、タイムチャート記録など危険操作に注意書きがある。
- [x] `index.html` のカードが各カテゴリの主要な入口と一致している。
- [x] 上部ナビのリンクが実ページ構成と一致している。
- [x] 同じカテゴリ内の前後リンクが相互に一致している。
- [x] `TODO.md` の `ページ状態` が実ページ構成と一致している。
- [x] HTML リンク切れ、画像参照切れ、代替テキスト抜けがない。
- [x] スクリーンショット画像を横並びにせず、1枚ずつ縦に並べている。

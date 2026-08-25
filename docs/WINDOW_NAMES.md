# 画面・ウィンドウ名称一覧

FA Labo PLC Console の画面、パネル、シート、ダイアログ、バナーの呼び方を揃えるための保守メモです。公開ページでは「正式表示名」を使い、内部名は説明しません。実装確認や改修時だけ「iOS内部名」「Android内部名」を参照します。

最終実装照合: 2026-08-25

## 命名ルール

| 種別 | 使い方 |
| --- | --- |
| 画面 | タブや主要導線で切り替える作業領域。例: `List`、`Block`、`タイムチャート`、`トラップ`。 |
| パネル | 現在の画面に重ねる、または横に出る補助領域。例: `デバイス操作パネル`。 |
| シート / ダイアログ | 操作の途中で開く一時画面。公開文では、見た目の違いよりも画面名を優先する。 |
| バナー / 通知 | 一時的な状態表示。画面名として扱わない。 |
| OSシート | iOS / Android が出すファイル選択、共有、購入などの標準UI。アプリ側の入口名で呼ぶ。 |

## 基本画面

| 正式表示名 | 英語名 | iOS内部名 | Android内部名 | 入口 / 用途 |
| --- | --- | --- | --- | --- |
| 監視画面 | Monitor | `RootView` / `workspaceContent` | `PlcIoCheckerApp` | アプリの主画面全体。 |
| List / リスト | List | `DeviceListView` | `DeviceListView` / `ViewMode.List` | 登録済みデバイスを一覧監視する。 |
| Block / ブロック | Block | `BlockMonitorView` | `BlockMonitorView` / `ViewMode.Block` | PLC のデバイス範囲をページ単位で監視する。 |
| タイムチャート | Time Chart | `TimeChartView` | `LogWaveView` / `ViewMode.Log` | 登録チャンネルの値を記録し、波形とCSVで確認する。Android内部の `Log` は公開名に出さない。 |
| トラップ | Trap | `TrapListView` | `TrapListView` / `ViewMode.Trap` | 条件検知とイベント履歴を扱う。 |

## 常時表示・重ね表示

| 正式表示名 | 英語名 | iOS内部名 | Android内部名 | 入口 / 用途 |
| --- | --- | --- | --- | --- |
| ヘッダー / ステータスライン | Header / Status Line | `headerSection` / `ConnectionSummaryCard` | `HeaderSection` | RUN/STOP、CPU機種、IP、プロジェクト名を表示する上部領域。 |
| メニュー | Menu | `OverflowMenuOverlay` | `HeaderMenu` | ヘッダーのメニューボタンから開く。 |
| 接続先切替 | Connection Switch | `ConnectionHubSheet` | `ConnectionHubSheet` | ヘッダーの接続情報から開く。現在の接続、最近使ったプロジェクト、クイック開始を扱う。 |
| デバイス操作パネル | Device Control Panel | `FocusPanelView` / `FocusPanelOverlay` / `isFocusPanelOverlayVisible` | `FocusPanel` / `StaticFocusSheetOverlay` / `showFocusSheet` | List / Block で選択した 1 デバイスの現在値確認、ON/OFF操作、数値書込、追加導線を扱う。旧称や内部名の `FocusPanel` は公開名に出さない。 |
| ON/OFF操作 | ON/OFF Control | `FocusPanelView` 内の BIT 操作 | `FocusPanel` 内の BIT 操作 | パネル名ではなく、BIT デバイスの大きな ON / OFF ボタンの操作名。 |
| トラップ通知バナー | Trap Alert Banner | `trapAlertBanner` | `TrapAlertBanner` | トラップ検知時に一時表示する通知。 |
| スリープ防止バナー | Sleep Prevention Banner | `TimeChartView.sleepPreventionBanner` | なし | iOS のタイムチャート記録中だけ表示する注意バナー。 |

## メニューから開く画面

| 正式表示名 | 英語名 | iOS内部名 | Android内部名 | 入口 / 用途 |
| --- | --- | --- | --- | --- |
| 通信設定 | Connection Settings | `PlcSettingsSheet` / `isPlcSettingsSheetPresented` | `ConnectionSettingsDialog` / `showConnectionDialog` | PLC 接続設定とプロジェクト保存。 |
| CPU操作 | CPU Operation | `CpuOperationSheet` / `isCpuSheetPresented` | `CpuDialog` / `showCpuDialog` | MELSEC CPU の RUN / STOP、KEYENCE CPU の RUN / PROGRAM 操作。 |
| デバイス範囲 | Device Ranges | `DeviceRangeSheet` / `isDeviceRangeSheetPresented` | `DeviceRangeDialog` / `showDeviceRangeDialog` | CPU機種ごとの使用可能デバイス範囲を確認する。 |
| モニタ表示設定 | Monitor Display Settings | `BlockDisplaySettingsSheet` / `isBlockDisplaySettingsSheetPresented` | `BlockDisplaySettingsDialog` / `showBlockSettingsDialog` | Block の表示密度と `グラフ100%値` を設定する。 |
| コメント読込 | Comment Read | `CommentReadSheet` / `isCommentReadSheetPresented` | `CommentReadDialog` / `showCommentReadDialog` | PLC からコメントを読み込む。KEYENCE 対応接続のみ。 |
| CSVコメント読込 | CSV Comment Import | `DocumentImportSheet` / `isCommentImporterPresented` | Android OS file picker / `csvLauncher` | CSV からデバイスコメントを取り込む。 |
| QR読込 | QR Import | `ProjectQrScannerSheet` / `isProjectQrScannerPresented` | `ProjectQrScannerDialog` / `showProjectQrScanner` | ProjectBuilder の QR を読み込む。 |
| JSON読込 | JSON Import | `DocumentImportSheet` / `isProjectImporterPresented` | Android OS file picker / `jsonImportLauncher` | プロジェクトJSONを読み込む。 |
| JSON書出 | JSON Export | `FileShareSheet` / `sharedFileItem` | Android OS file saver / `jsonExportLauncher` | プロジェクトJSONを書き出す。 |
| エラー履歴 | Error History | `ErrorHistorySheet` / `isErrorHistorySheetPresented` | `ErrorHistoryDialog` / `showErrorHistoryDialog` | エラー履歴の確認、クリア、保存。 |
| アプリ設定 | App Settings | `SettingsSheet` / `isSettingsSheetPresented` | `AppSettingsDialog` / `showAppSettingsDialog` | 言語、テーマ、画面配置、ビット書込モードなどを設定する。 |
| ライセンス/購入 | License / Purchase | `LicensePurchaseSheet` / `isLicensePurchasePresented` | `LicensePurchaseDialog` / `showLicensePurchaseDialog` | 実機通信ライセンスの購入、復元、状態確認。 |
| バージョン情報 | Version Info | `VersionInfoSheet` / `isVersionSheetPresented` | `VersionDialog` / `showVersionDialog` | アプリバージョンと関連情報を表示する。 |

## 登録・編集・選択系

| 正式表示名 | 英語名 | iOS内部名 | Android内部名 | 入口 / 用途 |
| --- | --- | --- | --- | --- |
| List 登録編集 | List Registration Edit | `DeviceEditorSheet` / `isDeviceEditorSheetPresented` | `DeviceEditorDialog` / `showDeviceEditor` | List の登録デバイス、範囲追加、一括削除を編集する。 |
| デバイス選択 | Device Selection | なし | `DevicePickerDialog` / `showDevicePicker` | Android の縦向きなどでデバイス選択用に開く。公開説明では必要時のみ使う。 |
| ブロック選択 | Block Selection | `BlockSelectionSheet` | `BlockPagePickerDialog` | Block のページ/範囲を選ぶ。 |
| 表示型を選択 | Select Display Type | `DataTypeSelectionSheet` | `StaticDialog` in `FocusPanel` | デバイス操作パネルの `Type` から開き、WORD の表示/書込型を選ぶ。 |
| タイムチャート登録 | Time Chart Registration | `WatchChannelSheet` / `isWatchSheetPresented` | `WatchAddDialog` / `showLogDialog` | タイムチャートのチャンネルを追加、解除、並び替えする。 |
| スケール設定 | Scale Settings | `WaveChannelRangeSheet` / `rangeDialogAddress` | `WaveChannelRangeDialog` | タイムチャートの数値チャンネルの手動レンジを設定する。表示タイトルは `%address% スケール設定`。 |
| トラップ登録 | Trap Registration | `TrapAddSheet` / `isTrapSheetPresented` | `TrapAddDialog` / `showTrapDialog` | トラップ条件を新規登録する。 |
| トラップ編集 | Trap Edit | `TrapAddSheet` + `editingTrap` | `TrapAddDialog` + `editingTrapId` | 既存トラップ条件を編集する。 |

## 確認・警告・OS標準UI

| 正式表示名 | 英語名 | iOS内部名 | Android内部名 | 入口 / 用途 |
| --- | --- | --- | --- | --- |
| 範囲削除の確認 | Confirm Range Delete | SwiftUI `.alert` in `DeviceEditorSheet` | `AlertDialog` in `DeviceEditorDialog` | List 登録編集で範囲一括削除前に表示する。 |
| プロジェクト削除 | Project Delete | SwiftUI `.alert` in `ConnectionHubSheet` | `AlertDialog` in `ConnectionHubSheet` | 接続先切替でプロジェクト削除前に表示する。 |
| エラー履歴クリア確認 | Confirm Clear Error History | `ErrorHistorySheet` 内の確認UI | `AlertDialog` in `ErrorHistoryDialog` | エラー履歴のクリア前に表示する。 |
| トラップ削除の確認 | Confirm Trap Delete | `TrapListView` 内の確認UI | `AlertDialog` in `TrapListView` | トラップ定義を削除する前に表示する。 |
| ファイル選択 | File Picker | `UIDocumentPickerViewController` via `DocumentImportSheet` | Android Activity Result file picker | CSVコメント読込、JSON読込で OS が表示する標準UI。 |
| ファイル共有 | Share Sheet | `UIActivityViewController` via `FileShareSheet` | Android file saver / share target | JSON書出、タイムチャートCSV、トラップCSV、エラー履歴保存で使う OS 標準UI。 |
| 購入画面 | Purchase Sheet | StoreKit / App Store sheet | Google Play Billing sheet | ライセンス/購入から OS / Store が表示する購入UI。 |
| カメラ許可 | Camera Permission | iOS permission alert | Android permission dialog | QR読込でカメラ権限が必要なとき OS が表示する。 |

## デバッグ専用

| 正式表示名 | 英語名 | iOS内部名 | Android内部名 | 入口 / 用途 |
| --- | --- | --- | --- | --- |
| Debug | Debug | `DebugDataResetSheet` / `isDebugDataResetPresented` | `DebugDataResetDialog` / `showDebugDialog` | 開発ビルドのデータ初期化、ライセンス状態調整など。公開マニュアルには出さない。 |
| Debug Comment SQLite | Debug Comment SQLite | `DebugCommentSQLiteSheet` / `isDebugCommentSQLitePresented` | `DebugCommentSqliteDialog` / `showDebugCommentSqliteDialog` | コメントDB確認用。公開マニュアルには出さない。 |
| Debug Overlay | Debug Overlay | `DebugOverlayCard` / `isDebugOverlayVisible` | `DebugOverlay` / `DEBUG_OVERLAY_VISIBLE` | 通信・メモリ確認用の常時表示オーバーレイ。公開マニュアルには出さない。 |

## 表記注意

| 避ける表記 | 使う表記 | 理由 |
| --- | --- | --- |
| フォーカスパネル | デバイス操作パネル | `FocusPanel` は内部名。ユーザーには対象が分かりにくい。 |
| ON/OFFパネル | デバイス操作パネル / ON/OFF操作 | ON/OFF は BIT 操作名で、パネル全体の名前ではない。 |
| Log / ログ画面 | タイムチャート | Android内部の `ViewMode.Log` は公開名と違う。 |
| Block List Display Settings | モニタ表示設定 | app 表示に合わせる。 |
| ワードバー上限値 | グラフ100%値 | 数値バー/グラフ系の 100% 基準であることを優先する。 |

# Store Release Checklist

FA Labo PLC Console の App Store / Google Play 公開前に確認する内部リストです。
このファイルは GitHub Pages の公開対象外です。

## 公開前ブロッカー

- 正式なサポート連絡先。
- 販売者名 / 開発者名の表記。
- iOS / Android の正式 Store URL。
- `templates/store-links.html.tmpl` に正式 Store URL と公式バッジ画像を設定し、公開ページへ挿入すること。
- メーカー別アプリ内購入の最終ストア設定。
- 価格、提供国、法人利用時の案内。
- プライバシーポリシーの最終更新日と連絡先。
- アプリ内のプライバシーポリシー導線の有無。
- 公開確認用サンプル QR / JSON の公開可否と保存場所。
- 公開 build から開発用購入状態、未確定の金額表示を消すこと。
- StoreKit / Google Play Billing の sandbox / tester 購入確認。
- iOS Privacy Manifest / Required Reason API の確認。
- iOS Accessibility Nutrition Labels を入力する場合は、評価基準に沿って過大申告しないこと。
- Android Foreground Service `connectedDevice` の Play Console 宣言とデモ動画。
- Android Predictive Back と release 難読化の確認。
- Android `POST_NOTIFICATIONS` の許可 / 拒否時の通知挙動確認。

## 公開 URL

| 項目 | 確認 |
| --- | --- |
| Support URL | `reference/support.html`。GitHub Pages 公開後の絶対 URL にする。 |
| Privacy Policy URL | `reference/privacy-policy.html`。公開申請ではこの URL を使用する。 |
| Terms URL | `reference/terms.html`。Apple 標準 EULA / 独自規約の選択を決める。 |
| Purchase URL | `reference/purchase-info.html`。価格とメーカー別商品を確定する。正式 Store URL は `templates/store-links.html.tmpl` から公開ページへ反映する。 |

## App Store Connect

- App name、subtitle、description、keywords、category、age rating を確定する。
- Privacy Policy URL に GitHub Pages の絶対 URL を設定する。
- Support URL にサポートページの絶対 URL を設定する。
- App Privacy の回答を確定する。現方針: アプリは個人情報を収集しない。PLC 通信はユーザー設定先へのリアルタイム通信で、開発者サーバーへ送信しない。
- Privacy Manifest / Required Reason API を確認する。`UserDefaults`、ファイルタイムスタンプ、ディスク容量、システム起動時間などを使う場合は `PrivacyInfo.xcprivacy` に理由を記載する。
- Export compliance は `ITSAppUsesNonExemptEncryption = false` を確認し、TestFlight が `Missing Compliance` にならないことを確認する。
- Local Network と Camera の用途を `reference/app-permissions.html` と矛盾しない説明にする。現行実装は PLC への直接 TCP / UDP 通信と QR読込。
- MELSEC / KEYENCE 別のアプリ内購入商品を確認し、価格、提供国、税区分、購入復元の説明を確認する。金額は公開前に確定するまで manual へ書かない。
- Review Notes にサンプル QR / JSON と、PLC 実機なしで確認できる手順を書く。
- スクリーンショットを Android / iOS の現行 UI で撮り直し、書込や CPU操作が危険に見えない説明にする。
- アプリ内からプライバシーポリシーを容易に開ける導線があるか確認する。
- Accessibility Nutrition Labels は、VoiceOver / Voice Control / Larger Text などを実機で確認した項目だけ申告する。
- 現行 iOS 実装は StoreKit 2 の商品 ID と購入復元処理を持つ。公開前に sandbox / TestFlight で購入、復元、キャンセル、保留中、失敗表示を確認する。
- iOS bundle ID は `com.fa-labo.plciochecker`。公開前に App Store Connect の Bundle ID と一致しているか確認する。

## Google Play Console

- Store listing の short description、full description、feature graphic、screenshots、category を確定する。
- Privacy Policy URL に公開済みの privacy-policy.html 絶対 URL を設定する。
- Data safety section を privacy policy と矛盾しない内容で入力する。広告・横断トラッキングはなく、PLC データを開発者へ送信しない。Google ML Kit Barcode Scanning が診断・利用分析のために扱う端末・アプリ情報、インストール識別子、性能・API情報、イベント種別、エラーコードを含めて回答する。
- `INTERNET`、`ACCESS_NETWORK_STATE`、`CAMERA`、`POST_NOTIFICATIONS`、foreground service 系 permission の用途を `reference/app-permissions.html` と矛盾しない説明にする。
- `FOREGROUND_SERVICE_CONNECTED_DEVICE` は Play Console の App content で foreground service declaration を入力する。用途は、ユーザー開始のタイムチャート記録または Trap 監視中に PLC 通信と記録・監視を継続するため。中断時の影響と、通知が出るデモ動画も用意する。
- 外部ストレージ全体への permission は現行 Android 実装では宣言していない。JSON / CSV / ログは document picker / create document 経由であることを Data safety と説明文に反映する。
- MELSEC / KEYENCE 別のアプリ内購入商品を確認し、価格、提供国、税・支払い profile を確定する。金額は公開前に確定するまで manual へ書かない。
- Content rating questionnaire を入力し、産業用ツールとしての対象年齢を確認する。
- App access の手順に、ログイン不要で確認できること、サンプル QR / JSON の確認手順を書く。
- Ads、Target audience、Store listing contact details、App category、Data deletion の該当有無を Play Console の App content で確認する。
- アプリ内からプライバシーポリシーを容易に開ける導線があるか確認する。
- 現行 Android 実装は Google Play Billing の商品 ID、購入承認、購入復元、license state 永続化を持つ。公開前にライセンステスターでキャンセル、返金 / 取り消し、保留中、商品利用不可、応答コードを確認する。
- Android `applicationId` は `com.fa_labo.plc_io_checker`。Google Play 登録後は変更できないため、公開前にブランド表記と一致しているか確認する。
- Predictive Back Gesture を実機で確認する。Android 側では `targetSdk = 36` の手動確認が残っている。
- release build は `isMinifyEnabled = true` / `isShrinkResources = true`。R8 / ProGuard rules と Play Console の Pre-launch report を確認する。

## アプリ内で追加確認する項目

- 公開 manual に開発用メニューや開発用画面は載せない。ただしアプリ内に開発用購入状態が release build で出ないことを確認する。
- ライセンス/購入画面の文言から未確定の金額表示、開発用の購入状態表示が公開 build に出ないことを確認する。
- Privacy Policy、Support、Terms、Purchase info をアプリ内メニューから開けるか、Store metadata に URL として登録するかを決める。
- 確認用接続、未購入時の接続制限、MELSEC / KEYENCE の購入状態表示を iOS / Android で一致させる。

## ProjectBuilder

- ProjectBuilder は GitHub Releases の Assets にある `PLCConsoleProjectBuilder-win-x64.zip` から exe を配布する。Store のリリースノートには ProjectBuilder の履歴を書かず、ProjectBuilder 側の Releases へ誘導する。
- ProjectBuilder の license は MIT。モバイルアプリの利用条件と混同しないよう、ProjectBuilder ページでは ProjectBuilder の配布元と license を分けて書く。
- QR / JSON は `PLCIOC3|ZSTD` と schema v3 を前提にする。旧 `PLCIOC2D` は現行の取込処理では未対応のまま説明する。
- ProjectBuilder が生成する QR / JSON のサンプルを公開するか、Review Notes だけに添付するか決める。

## 公式資料

- Apple: App Privacy Details: https://developer.apple.com/app-store/app-privacy-details/
- Apple: App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play: User Data policy: https://support.google.com/googleplay/android-developer/answer/10144311

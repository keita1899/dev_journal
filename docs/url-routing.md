# URL 設計

## 認証・アカウント管理（Auth / Account）

| パス               | メソッド | コントローラ            | アクション | 備考            |
| ------------------ | -------- | ----------------------- | ---------- | --------------- |
| /signup            | GET      | RegistrationsController | new        | 新規登録ページ  |
| /signup            | POST     | RegistrationsController | create     | 新規登録        |
| /signin            | GET      | SessionsController      | new        | ログインページ  |
| /signin            | POST     | SessionsController      | create     | ログイン        |
| /signout           | DELETE   | SessionsController      | destroy    | ログアウト      |
| /provider/callback | GET      | AuthProviderController  | callback   | GitHub ログイン |

## アカウント・プロフィール関連

| パス                   | メソッド | コントローラ                     | アクション | 備考                 |
| ---------------------- | -------- | -------------------------------- | ---------- | -------------------- |
| /account/profile       | GET      | Account::ProfileController       | show       | プロフィールページ   |
| /account/profile       | DELETE   | Account::ProfileController       | destroy    | プロフィール削除     |
| /account/password/edit | GET      | PasswordsController              | edit       | パスワード変更ページ |
| /account/password      | PUT      | PasswordsController              | update     | パスワード変更実行   |
| /account/delete        | GET      | RegistrationsController          | show       | アカウント削除ページ |
| /account/delete        | DELETE   | RegistrationsController          | destroy    | アカウント削除実行   |
| /account/subscription  | GET      | Account::SubscriptionController  | show       | プラン確認           |
| /account/billing       | GET      | Account::BillingsController      | index      | 請求書               |
| /account/settings      | GET      | Account::SettingsController      | index      | 設定ページ           |
| /account/notifications | GET      | Account::NotificationsController | edit       | 通知設定画面         |
| /account/notifications | PUT      | Account::NotificationsController | update     | 通知設定更新         |

## パスワードリセット関連

| パス                         | メソッド | コントローラ             | アクション | 備考                   |
| ---------------------------- | -------- | ------------------------ | ---------- | ---------------------- |
| /password_resets/new         | GET      | PasswordResetsController | new        | リセット申請ページ     |
| /password_resets             | POST     | PasswordResetsController | create     | メール送信処理         |
| /password_resets/:token/edit | GET      | PasswordResetsController | edit       | パスワード再設定ページ |
| /password_resets/:token      | PATCH    | PasswordResetsController | update     | パスワード再設定実行   |

## 記事関連（Articles）

| パス                             | メソッド | コントローラ        | アクション | 備考                  |
| -------------------------------- | -------- | ------------------- | ---------- | --------------------- |
| /articles/new                    | GET      | ArticlesController  | new        | 記事作成ページ        |
| /articles                        | POST     | ArticlesController  | create     | 記事作成              |
| /articles                        | GET      | ArticlesController  | index      | 記事一覧              |
| /articles/:id                    | GET      | ArticlesController  | show       | 記事詳細              |
| /articles/:id/edit               | GET      | ArticlesController  | edit       | 記事編集ページ        |
| /articles/:id                    | PUT      | ArticlesController  | update     | 記事更新              |
| /articles/:id                    | DELETE   | ArticlesController  | destroy    | 記事削除（ゴミ箱へ）  |
| /articles?keyword=               | GET      | ArticlesController  | search     | 記事検索              |
| /articles/:id/downloads/markdown | GET      | DownloadsController | markdown   | Markdown エクスポート |
| /articles/trash                  | GET      | ArticlesController  | trash      | ゴミ箱記事一覧        |
| /articles/:id/restore            | PUT      | ArticlesController  | restore    | ゴミ箱から復元        |
| /articles/:id/clear              | DELETE   | ArticlesController  | clear      | 完全削除              |

## 日報（Daily Reports）

| パス                    | メソッド | コントローラ           | アクション | 備考           |
| ----------------------- | -------- | ---------------------- | ---------- | -------------- |
| /daily-reports/new      | GET      | DailyReportsController | new        | 日報作成ページ |
| /daily-reports          | POST     | DailyReportsController | create     | 日報作成       |
| /daily-reports/:id/edit | GET      | DailyReportsController | edit       | 日報編集ページ |
| /daily-reports/:id      | PUT      | DailyReportsController | update     | 日報編集       |
| /daily-reports/:id      | DELETE   | DailyReportsController | destroy    | 日報削除       |

## サブスクリプション / Stripe 決済

| パス                   | メソッド | コントローラ            | アクション | 備考                 |
| ---------------------- | -------- | ----------------------- | ---------- | -------------------- |
| /subscriptions/create  | POST     | SubscriptionsController | create     | Stripe 決済作成      |
| /subscriptions/success | GET      | SubscriptionsController | success    | 決済成功ページ       |
| /subscriptions/cancel  | GET      | SubscriptionsController | cancel     | 決済キャンセルページ |
| /webhook/stripe        | POST     | WebhooksController      | stripe     | Stripe Webhook       |
| /pricing               | GET      | PlansController         | index      | 料金プラン一覧       |

## お問い合わせ・静的ページ

| パス     | メソッド | コントローラ       | アクション | 備考                     |
| -------- | -------- | ------------------ | ---------- | ------------------------ |
| /        | GET      | HomeController     | index      | トップページ             |
| /contact | GET      | ContactsController | new        | お問い合わせフォーム     |
| /contact | POST     | ContactsController | create     | お問い合わせ送信         |
| /terms   | GET      | StaticController   | terms      | 利用規約                 |
| /privacy | GET      | StaticController   | privacy    | プライバシーポリシー     |
| /law     | GET      | StaticController   | law        | 特定商取引法に基づく表記 |

## いいね・閲覧履歴

| パス                | メソッド | コントローラ        | アクション | 備考           |
| ------------------- | -------- | ------------------- | ---------- | -------------- |
| /articles/:id/likes | POST     | LikesController     | create     | 記事にいいね   |
| /articles/:id/likes | DELETE   | LikesController     | destroy    | いいね削除     |
| /likes              | GET      | LikesController     | index      | いいね一覧     |
| /histories          | GET      | HistoriesController | index      | 閲覧履歴一覧   |
| /histories          | DELETE   | HistoriesController | destroy    | 閲覧履歴削除   |
| /histories          | DELETE   | HistoriesController | clear      | 閲覧履歴全削除 |

## 技術スタック

| /tech-stacks/new | GET | TechStacksController | new | 技術スタック登録ページ |
| /tech-stacks | POST | TechStacksController | create | 技術スタック登録 |
| /tech-stacks/:id/edit | GET | TechStacksController | edit | 編集ページ |
| /tech-stacks/:id | PUT | TechStacksController | update | 編集実行 |
| /tech-stacks/:id | DELETE | TechStacksController | destroy | 削除 |

## 通知・設定

| パス                         | メソッド | コントローラ            | アクション    | 備考           |
| ---------------------------- | -------- | ----------------------- | ------------- | -------------- |
| /notifications               | GET      | NotificationsController | index         | 通知一覧       |
| /notifications/:id/read      | PUT      | NotificationsController | read          | 既読にする     |
| /notifications/mark_all_read | PUT      | NotificationsController | mark_all_read | 全て既読にする |

## エクスポート

| パス                  | メソッド | コントローラ      | アクション | 備考                 |
| --------------------- | -------- | ----------------- | ---------- | -------------------- |
| /exports              | GET      | ExportsController | index      | エクスポート画面     |
| /exports              | POST     | ExportsController | create     | エクスポート実行     |
| /exports/:id/download | GET      | ExportsController | download   | ファイルダウンロード |

## AI 機能

| パス                     | メソッド | コントローラ | アクション | 備考        |
| ------------------------ | -------- | ------------ | ---------- | ----------- |
| /articles/:id/ai_summary | POST     | AiController | summary    | AI 要約生成 |

## その他

| パス        | メソッド | コントローラ         | アクション | 備考           |
| ----------- | -------- | -------------------- | ---------- | -------------- |
| /calendar   | GET      | CalendarController   | index      | カレンダー表示 |
| /categories | GET      | CategoriesController | index      | カテゴリー取得 |
| /tags       | GET      | TagsController       | index      | タグ取得       |
| /mypage     | GET      | MypageController     | index      | マイページ     |
| /help       | GET      | HelpController       | index      | ヘルプ・FAQ    |

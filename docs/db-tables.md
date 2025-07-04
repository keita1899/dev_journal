# テーブル設計書

## users テーブル

| カラム名        | データ型 | 制約               | 説明                   |
| --------------- | -------- | ------------------ | ---------------------- |
| id              | bigint   | PK, auto increment | ユーザー ID            |
| name            | string   | not null           | ユーザー名             |
| email           | string   | unique, not null   | メールアドレス         |
| password_digest | string   | not null           | パスワード（ハッシュ） |
| avatar          | string   |                    | アバター画像           |
| deleted_at      | datetime |                    | 削除日時               |
| created_at      | datetime |                    | 作成日時               |
| updated_at      | datetime |                    | 更新日時               |

## auth_providers テーブル

| カラム名   | データ型 | 制約               | 説明                        |
| ---------- | -------- | ------------------ | --------------------------- |
| id         | bigint   | PK, auto increment | プロバイダー ID             |
| user_id    | bigint   | FK (users.id)      | 作成者 ID                   |
| provider   | string   | not null           | プロバイダーの種類          |
| uid        | string   | not null           | プロバイダー側のユーザー ID |
| created_at | datetime |                    | 作成日時                    |
| updated_at | datetime |                    | 更新日時                    |

## password_resets テーブル

| カラム名   | データ型 | 制約               | 説明                  |
| ---------- | -------- | ------------------ | --------------------- |
| id         | bigint   | PK, auto increment | パスワードリセット ID |
| user_id    | bigint   | FK (users.id)      | ユーザー ID           |
| token      | string   | unique, not null   | リセットトークン      |
| expires_at | datetime | not null           | 有効期限              |
| used_at    | datetime |                    | 使用日時              |
| created_at | datetime |                    | 作成日時              |
| updated_at | datetime |                    | 更新日時              |

## plans テーブル

| カラム名        | データ型 | 制約               | 説明              |
| --------------- | -------- | ------------------ | ----------------- |
| id              | bigint   | PK, auto increment | プラン ID         |
| name            | string   | unique, not null   | プラン名          |
| display_name    | string   | not null           | 表示名            |
| price_cents     | integer  | not null           | 金額（分単位）    |
| interval        | string   | not null           | monthly、yearly   |
| stripe_price_id | string   |                    | Stripe の PriceID |
| features        | jsonb    |                    | 機能制限（JSON）  |
| is_active       | boolean  | not null           | 有効フラグ        |
| created_at      | datetime |                    | 作成日時          |
| updated_at      | datetime |                    | 更新日時          |

## subscriptions テーブル

| カラム名               | データ型 | 制約               | 説明                     |
| ---------------------- | -------- | ------------------ | ------------------------ |
| id                     | bigint   | PK, auto increment | サブスクリプション ID    |
| user_id                | bigint   | FK (users.id)      | ユーザー ID              |
| plan_id                | bigint   | FK（plans.id）     | プラン ID                |
| stripe_subscription_id | string   | unique             | Stripe 側のサブスク ID   |
| stripe_customer_id     | string   | unique             | Stripe 側のカスタマー ID |
| status                 | string   | not null           | 状態                     |
| current_period_start   | datetime |                    | 現在のサブスクの開始日   |
| current_period_end     | datetime |                    | 現在のサブスクの終了日   |
| cancel_at              | datetime |                    | 解約予定日時             |
| canceled_at            | datetime |                    | 解約された日時           |
| created_at             | datetime |                    | 作成日時                 |
| updated_at             | datetime |                    | 更新日時                 |

## payments テーブル

| カラム名     | データ型 | 制約               | 説明                  |
| ------------ | -------- | ------------------ | --------------------- |
| id           | bigint   | PK, auto increment | サブスクリプション ID |
| user_id      | bigint   | FK (users.id)      | ユーザー ID           |
| amount_cents | integer  | not null           | 支払額                |
| currency     | string   | not null           | 通貨                  |
| created_at   | datetime |                    | 作成日時              |
| updated_at   | datetime |                    | 更新日時              |

## daily_reports テーブル

| カラム名   | データ型 | 制約               | 説明      |
| ---------- | -------- | ------------------ | --------- |
| id         | bigint   | PK, auto increment | 日報 ID   |
| user_id    | bigint   | FK (users.id)      | 作成者 ID |
| title      | string   | not null           | タイトル  |
| body       | text     | not null           | 本文      |
| date       | date     | not null           | 日付      |
| created_at | datetime |                    | 作成日時  |
| updated_at | datetime |                    | 更新日時  |

## categories テーブル

| カラム名   | データ型 | 制約               | 説明          |
| ---------- | -------- | ------------------ | ------------- |
| id         | bigint   | PK, auto increment | カテゴリー ID |
| name       | string   | unique, not null   | 名前          |
| created_at | datetime |                    | 作成日時      |
| updated_at | datetime |                    | 更新日時      |

## tech_stacks テーブル

| カラム名    | データ型 | 制約               | 説明            |
| ----------- | -------- | ------------------ | --------------- |
| id          | bigint   | PK, auto increment | 技術スタック ID |
| user_id     | bigint   | FK (users.id)      | ユーザー ID     |
| category_id | bigint   | FK (categories.id) | カテゴリー ID   |
| name        | string   | not null           | 技術スタック名  |
| version     | string   |                    | バージョン      |
| created_at  | datetime |                    | 作成日時        |
| updated_at  | datetime |                    | 更新日時        |

## tech_stack_sets テーブル

| カラム名   | データ型 | 制約               | 説明                  |
| ---------- | -------- | ------------------ | --------------------- |
| id         | bigint   | PK, auto increment | 技術スタックセット ID |
| user_id    | bigint   | FK (users.id)      | ユーザー ID           |
| name       | string   | not null           | セット名              |
| created_at | datetime |                    | 作成日時              |
| updated_at | datetime |                    | 更新日時              |

## tech_stack_set_items テーブル

| カラム名          | データ型 | 制約                    | 説明                          |
| ----------------- | -------- | ----------------------- | ----------------------------- |
| id                | bigint   | PK, auto increment      | セットの個々の技術スタック ID |
| tech_stack_set_id | bigint   | FK (tech_stack_sets.id) | セット ID                     |
| tech_stack_id     | bigint   | FK (tech_stack.id)      | 技術スタック ID               |
| created_at        | datetime |                         | 作成日時                      |
| updated_at        | datetime |                         | 更新日時                      |

## article_tech_stacks テーブル

| カラム名      | データ型 | 制約                | 説明            |
| ------------- | -------- | ------------------- | --------------- |
| article_id    | bigint   | FK (articles.id)    | 記事 ID         |
| tech_stack_id | bigint   | FK (tech_stacks.id) | 技術スタック ID |
| created_at    | datetime |                     | 作成日時        |
| updated_at    | datetime |                     | 更新日時        |

## articles テーブル

| カラム名     | データ型 | 制約               | 説明                               |
| ------------ | -------- | ------------------ | ---------------------------------- |
| id           | bigint   | PK, auto increment | 記事 ID                            |
| user_id      | bigint   | FK (users.id)      | 投稿者 ID                          |
| title        | string   | not null           | タイトル                           |
| url          | string   | not null           | URL                                |
| type         | string   | not null           | 記事タイプ                         |
| status       | string   | not null           | ステータス（公開・非公開・下書き） |
| published_at | datetime | not null           | 公開日時                           |
| deleted_at   | datetime |                    | 削除日時                           |
| created_at   | datetime |                    | 作成日時                           |
| updated_at   | datetime |                    | 更新日時                           |

## input_articles テーブル

| カラム名        | データ型 | 制約               | 説明                 |
| --------------- | -------- | ------------------ | -------------------- |
| id              | bigint   | PK, auto increment | インプット記事 ID    |
| article_id      | bigint   | FK（articles.id）  | 記事 ID              |
| content         | text     | not null           | 対象                 |
| objective       | text     | not null           | 目的                 |
| before_question | text     | not null           | インプット前の疑問点 |
| learning        | text     | not null           | 学んだこと           |
| new_question    | text     | not null           | 新しい疑問点         |
| summary         | text     | not null           | 要約                 |
| created_at      | datetime |                    | 作成日時             |
| updated_at      | datetime |                    | 更新日時             |

## error_articles テーブル

| カラム名      | データ型 | 制約               | 説明             |
| ------------- | -------- | ------------------ | ---------------- |
| id            | bigint   | PK, auto increment | エラー記事 ID    |
| article_id    | bigint   | FK（articles.id）  | 記事 ID          |
| error_message | string   |                    | エラーメッセージ |
| content       | text     | not null           | エラー内容       |
| hypothesis    | text     |                    | 仮説             |
| solution      | text     | not null           | 解決方法         |
| cause         | text     | not null           | 原因             |
| created_at    | datetime |                    | 作成日時         |
| updated_at    | datetime |                    | 更新日時         |

## code_review_articles テーブル

| カラム名      | データ型 | 制約               | 説明                  |
| ------------- | -------- | ------------------ | --------------------- |
| id            | bigint   | PK, auto increment | コードレビュー記事 ID |
| article_id    | bigint   | FK（articles.id）  | 記事 ID               |
| title         | text     | not null           | 何のレビューか        |
| error_message | text     | not null           | 自分が書いたコード    |
| review        | text     | not null           | レビュー内容          |
| fixed_code    | text     | not null           | 修正したコード        |
| learning      | text     |                    | 学んだこと            |
| created_at    | datetime |                    | 作成日時              |
| updated_at    | datetime |                    | 更新日時              |

## coding_exam_articles テーブル

| カラム名       | データ型 | 制約               | 説明                    |
| -------------- | -------- | ------------------ | ----------------------- |
| id             | bigint   | PK, auto increment | コーディング試験記事 ID |
| article_id     | bigint   | FK（articles.id）  | 記事 ID                 |
| problem        | text     | not null           | 問題                    |
| my_answer      | text     | not null           | 自分の回答              |
| correct_answer | text     | not null           | 答え                    |
| point          | text     | not null           | 解くポイント            |
| duration       | string   | not null           | かかった時間            |
| created_at     | datetime |                    | 作成日時                |
| updated_at     | datetime |                    | 更新日時                |

## setup_articles テーブル

| カラム名   | データ型 | 制約               | 説明               |
| ---------- | -------- | ------------------ | ------------------ |
| id         | bigint   | PK, auto increment | 環境構築記事 ID    |
| article_id | bigint   | FK（articles.id）  | 記事 ID            |
| content    | string   | not null           | 構築する環境の内容 |
| created_at | datetime |                    | 作成日時           |
| updated_at | datetime |                    | 更新日時           |

## setup_steps テーブル

| カラム名         | データ型 | 制約                    | 説明            |
| ---------------- | -------- | ----------------------- | --------------- |
| id               | bigint   | PK, auto increment      | 環境構築手順 ID |
| setup_article_id | bigint   | FK（setup_articles.id） | 記事 ID         |
| step             | string   | not null                | 構築手順        |
| content          | text     | not null                | 構築手順内容    |
| order            | integer  | not null                | 順番            |
| created_at       | datetime |                         | 作成日時        |
| updated_at       | datetime |                         | 更新日時        |

## tech_catchup_articles テーブル

| カラム名                 | データ型 | 制約               | 説明                                                     |
| ------------------------ | -------- | ------------------ | -------------------------------------------------------- |
| id                       | bigint   | PK, auto increment | キャッチアップ記事 ID                                    |
| article_id               | bigint   | FK（articles.id）  | 記事 ID                                                  |
| known_tech               | string   | not null           | 既知技術                                                 |
| new_tech                 | string   | not null           | キャッチアップする技術                                   |
| known_tech_url           | string   |                    | 既知技術 URL                                             |
| new_tech_url             | string   |                    | キャッチアップ技術 URL                                   |
| known_tech_advantages    | text     | not null           | 既知技術のメリット                                       |
| known_tech_disadvantages | text     | not null           | 既知技術のデメリット                                     |
| new_tech_adnvantages     | text     | not null           | キャッチアップ技術のメリット                             |
| new_tech_disadnvantages  | text     | not null           | キャッチアップ技術のデメリット                           |
| improvement              | text     | not null           | キャッチアップ技術がどのように既知技術の課題を解決するか |
| caution                  | text     | not null           | キャッチアップ技術の注意点                               |
| created_at               | datetime |                    | 作成日時                                                 |
| updated_at               | datetime |                    | 更新日時                                                 |

## feature_articles テーブル

| カラム名   | データ型 | 制約               | 説明        |
| ---------- | -------- | ------------------ | ----------- |
| id         | bigint   | PK, auto increment | 機能記事 ID |
| article_id | bigint   | FK（articles.id）  | 記事 ID     |
| app_name   | string   |                    | アプリ名    |
| created_at | datetime |                    | 作成日時    |
| updated_at | datetime |                    | 更新日時    |

## execution_flows テーブル

| カラム名           | データ型 | 制約                      | 説明              |
| ------------------ | -------- | ------------------------- | ----------------- |
| id                 | bigint   | PK, auto increment        | 機能処理フロー ID |
| feature_article_id | bigint   | FK（feature_articles.id） | 機能記事 ID       |
| flow               | string   | not null                  | 処理フロー        |
| order              | integer  | not null                  | 順番              |
| created_at         | datetime |                           | 作成日時          |
| updated_at         | datetime |                           | 更新日時          |

## implementation_steps テーブル

| カラム名           | データ型 | 制約                      | 説明        |
| ------------------ | -------- | ------------------------- | ----------- |
| id                 | bigint   | PK, auto increment        | 実装手順 ID |
| feature_article_id | bigint   | FK（feature_articles.id） | 機能記事 ID |
| step               | string   | not null                  | 実装手順    |
| order              | integer  | not null                  | 順番        |
| created_at         | datetime |                           | 作成日時    |
| updated_at         | datetime |                           | 更新日時    |

## refactoring_articles テーブル

| カラム名    | データ型 | 制約               | 説明                       |
| ----------- | -------- | ------------------ | -------------------------- |
| id          | bigint   | PK, auto increment | リファクタリング記事 ID    |
| article_id  | bigint   | FK（articles.id）  | 記事 ID                    |
| reason      | text     | not null           | 理由                       |
| before_code | text     | not null           | 元のコード                 |
| after_code  | text     | not null           | リファクタリング後のコード |
| point       | text     | not null           | ポイント                   |
| created_at  | datetime |                    | 作成日時                   |
| updated_at  | datetime |                    | 更新日時                   |

## performance_articles テーブル

| カラム名      | データ型 | 制約               | 説明                      |
| ------------- | -------- | ------------------ | ------------------------- |
| id            | bigint   | PK, auto increment | パフォーマンス改善記事 ID |
| article_id    | bigint   | FK（articles.id）  | 記事 ID                   |
| reason        | text     | not null           | 理由                      |
| before_code   | text     | not null           | 元のコード                |
| after_code    | text     | not null           | 改善後のコード            |
| before_metric | text     | not null           | 元のパフォーマンス        |
| after_metric  | text     | not null           | 改善後のパフォーマンス    |
| point         | text     | not null           | ポイント                  |
| created_at    | datetime |                    | 作成日時                  |
| updated_at    | datetime |                    | 更新日時                  |

## interview_articles テーブル

| カラム名            | データ型 | 制約               | 説明                   |
| ------------------- | -------- | ------------------ | ---------------------- |
| id                  | bigint   | PK, auto increment | 面接記事 ID            |
| article_id          | bigint   | FK（articles.id）  | 記事 ID                |
| company_name        | string   | not null           | 面接を受けた企業       |
| company_information | text     | not null           | 面接を受けた企業の情報 |
| created_at          | datetime |                    | 作成日時               |
| updated_at          | datetime |                    | 更新日時               |

## interview_questions テーブル

| カラム名             | データ型 | 制約                        | 説明        |
| -------------------- | -------- | --------------------------- | ----------- |
| id                   | bigint   | PK, auto increment          | 面接記事 ID |
| interview_article_id | bigint   | FK（interview_articles.id） | 面接記事 ID |
| question             | text     | not null                    | 聞かれた事  |
| answer               | text     | not null                    | 答えた事    |
| order                | integer  | not null                    | 順番        |
| created_at           | datetime |                             | 作成日時    |
| updated_at           | datetime |                             | 更新日時    |

## event_articles テーブル

| カラム名   | データ型 | 制約               | 説明                          |
| ---------- | -------- | ------------------ | ----------------------------- |
| id         | bigint   | PK, auto increment | 勉強会・カンファレンス記事 ID |
| article_id | bigint   | FK（articles.id）  | 記事 ID                       |
| event      | string   | not null           | 勉強会・カンファレンス名      |
| date       | date     | not null           | 日付                          |
| objective  | text     | not null           | 目的                          |
| learning   | text     | not null           | 学んだこと                    |
| question   | text     | not null           | 疑問点                        |
| thoughts   | text     |                    | 感想                          |
| created_at | datetime |                    | 作成日時                      |
| updated_at | datetime |                    | 更新日時                      |

## tags テーブル

| カラム名   | データ型 | 制約               | 説明     |
| ---------- | -------- | ------------------ | -------- |
| id         | bigint   | PK, auto increment | タグ ID  |
| name       | string   | unique, not null   | 名前     |
| created_at | datetime |                    | 作成日時 |
| updated_at | datetime |                    | 更新日時 |

## article_tags テーブル

| カラム名   | データ型 | 制約              | 説明     |
| ---------- | -------- | ----------------- | -------- |
| article_id | bigint   | FK（articles.id） | 記事 ID  |
| tag_id     | bigint   | FK（tags.id）     | タグ ID  |
| created_at | datetime |                   | 作成日時 |
| updated_at | datetime |                   | 更新日時 |

## attempts テーブル

| カラム名         | データ型 | 制約                    | 説明          |
| ---------------- | -------- | ----------------------- | ------------- |
| id               | bigint   | PK, auto increment      | 試したこと ID |
| error_article_id | bigint   | FK（error_articles.id） | エラー記事 ID |
| content          | text     | not null                | 内容          |
| created_at       | datetime |                         | 作成日時      |
| updated_at       | datetime |                         | 更新日時      |

## references テーブル

| カラム名   | データ型 | 制約               | 説明     |
| ---------- | -------- | ------------------ | -------- |
| id         | bigint   | PK, auto increment | 参考 ID  |
| article_id | bigint   | FK（articles.id）  | 記事 ID  |
| url        | string   | not null           | URL      |
| title      | string   |                    | タイトル |
| created_at | datetime |                    | 作成日時 |
| updated_at | datetime |                    | 更新日時 |

## likes テーブル

| カラム名   | データ型 | 制約              | 説明        |
| ---------- | -------- | ----------------- | ----------- |
| user_id    | bigint   | FK（users.id）    | ユーザー ID |
| article_id | bigint   | FK（articles.id） | 記事 ID     |
| created_at | datetime |                   | 作成日時    |
| updated_at | datetime |                   | 更新日時    |

## histories テーブル

| カラム名   | データ型 | 制約              | 説明        |
| ---------- | -------- | ----------------- | ----------- |
| user_id    | bigint   | FK（users.id）    | ユーザー ID |
| article_id | bigint   | FK（articles.id） | 記事 ID     |
| created_at | datetime |                   | 作成日時    |
| updated_at | datetime |                   | 更新日時    |

## comments テーブル

| カラム名   | データ型 | 制約               | 説明                    |
| ---------- | -------- | ------------------ | ----------------------- |
| id         | bigint   | PK, auto increment | コメント ID             |
| article_id | bigint   | FK（articles.id）  | 対象の記事 ID           |
| user_id    | bigint   | FK（users.id）     | コメントした人 ID       |
| content    | text     | not null           | コメント内容            |
| parent_id  | bigint   | null               | 親コメント ID（返信用） |
| created_at | datetime |                    | 作成日時                |
| updated_at | datetime |                    | 更新日時                |

## invoices テーブル

| カラム名          | データ型 | 制約                  | 説明                  |
| ----------------- | -------- | --------------------- | --------------------- |
| id                | bigint   | PK, auto increment    | 請求書 ID             |
| user_id           | bigint   | FK (users.id)         | ユーザー ID           |
| subscription_id   | bigint   | FK (subscriptions.id) | サブスクリプション ID |
| stripe_invoice_id | string   | unique                | Stripe 請求書 ID      |
| amount_cents      | integer  | not null              | 請求額（分単位）      |
| currency          | string   | not null              | 通貨                  |
| status            | string   | not null              | ステータス            |
| paid_at           | datetime |                       | 支払日時              |
| invoice_pdf_url   | string   |                       | PDF URL               |
| created_at        | datetime |                       | 作成日時              |
| updated_at        | datetime |                       | 更新日時              |

## notifications テーブル

| カラム名   | データ型 | 制約               | 説明           |
| ---------- | -------- | ------------------ | -------------- |
| id         | bigint   | PK, auto increment | 通知 ID        |
| user_id    | bigint   | FK (users.id)      | 受信者 ID      |
| type       | string   | not null           | 通知タイプ     |
| title      | string   | not null           | タイトル       |
| body       | text     | not null           | 本文           |
| read_at    | datetime |                    | 既読日時       |
| action_url | string   |                    | アクション URL |
| metadata   | jsonb    |                    | メタデータ     |
| created_at | datetime |                    | 作成日時       |
| updated_at | datetime |                    | 更新日時       |

## notification_settings テーブル

| カラム名           | データ型 | 制約                  | 説明                     |
| ------------------ | -------- | --------------------- | ------------------------ |
| id                 | bigint   | PK, auto increment    | 通知設定 ID              |
| user_id            | bigint   | FK (users.id)         | ユーザー ID              |
| email_comment      | boolean  | not null default true | コメント通知（メール）   |
| email_like         | boolean  | not null default true | いいね通知（メール）     |
| email_subscription | boolean  | not null default true | サブスク通知（メール）   |
| push_comment       | boolean  | not null default true | コメント通知（プッシュ） |
| push_like          | boolean  | not null default true | いいね通知（プッシュ）   |
| created_at         | datetime |                       | 作成日時                 |
| updated_at         | datetime |                       | 更新日時                 |

## exports テーブル

| カラム名   | データ型 | 制約               | 説明                      |
| ---------- | -------- | ------------------ | ------------------------- |
| id         | bigint   | PK, auto increment | エクスポート ID           |
| user_id    | bigint   | FK (users.id)      | ユーザー ID               |
| format     | string   | not null           | 形式（markdown/pdf/json） |
| status     | string   | not null           | ステータス                |
| file_url   | string   |                    | ファイル URL              |
| expires_at | datetime |                    | 有効期限                  |
| created_at | datetime |                    | 作成日時                  |
| updated_at | datetime |                    | 更新日時                  |

## usage_limits テーブル

| カラム名    | データ型 | 制約               | 説明                  |
| ----------- | -------- | ------------------ | --------------------- |
| id          | bigint   | PK, auto increment | 利用制限 ID           |
| user_id     | bigint   | FK (users.id)      | ユーザー ID           |
| feature     | string   | not null           | 機能名                |
| period      | string   | not null           | 期間（monthly/daily） |
| limit_count | integer  | not null           | 制限数                |
| used_count  | integer  | not null default 0 | 使用数                |
| reset_at    | datetime | not null           | リセット日時          |
| created_at  | datetime |                    | 作成日時              |
| updated_at  | datetime |                    | 更新日時              |

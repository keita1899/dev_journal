# DevJournal

## 概要

エンジニアのための日報・技術記事・メモ管理アプリ。
技術記事や日報をテンプレートで統一し、GitHub の活動もまとめて “その日の成果” を確認できるようにすることを目的としています。

## 機能一覧

- 認証
  - メールアドレス & パスワード認証
  - GitHub OAuth ログイン
  - ゲスト ログイン
  - パスワードリセット
- 日報
  - 作成 / 編集 / 削除
  - カレンダーからアクセス
  - 当日の活動（技術記事・メモ・PR・Issue・コミット）を自動紐付け
  - 日報のリマインダー通知
- 技術記事
  - 作成 / 編集 / 削除
  - カテゴリー管理
  - タグ付け
  - 検索（全文検索 / カテゴリ / タグ）
  - 並び替え（作成日）
- メモ
  - 作成 / 編集 / 削除
  - カテゴリー / タグ
  - 検索
  - 並び替え（作成日）
- テンプレート
  - 日報テンプレート
  - 技術記事テンプレート
  - デフォルトテンプレート設定
  - 適用ボタンでワンクリック挿入

## 環境構築

### 1. リポジトリをクローン

```
git clone https://github.com/keita1899/dev_journal.git
cd dev_journal
```

### 2. 環境変数をコピー

```
cp .env.example .env
```

### 3. パッケージをインストール

```
bundle install
```

### 4. データベース設定 & 作成

```
bin/rails db:create db:migrate
```

### 5. サーバー起動

```
bin/dev
```

## 使用技術

- 言語: Ruby 3.x
- フレームワーク: Rails 7.1.x
- DB: PostgreSQL
- フロントエンド: Hotwire / Turbo / Stimulus
- 静的解析: Rubocop
- テスト: RSpec
- 認証: Devise
- CSS: TailwindCSS
- 開発環境: Docker
- CI/CD: Github Actions
- 本番環境: Fly.io

## ディレクトリ構造

```
dev_journal/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── views/
│   ├── helpers/
│   └── javascript/
├── config/
├── db/
├── spec/
└──
```

## Git 運用ルール

- main：常にデプロイ可能な状態
- ブランチ名
  - feature/xxx：新機能
  - fix/xxx：バグ修正
  - docs/xxx：ドキュメント修正
  - chore/xxx：設定ファイル・CI/CD・環境調整
- プルリク
  - 小さめにまとめる
  - タイトルはわかりやすく
  - 必要ならスクリーンショット添付

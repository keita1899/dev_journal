# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際の Claude Code (claude.ai/code) への指針を提供します。

## プロジェクト概要

Rails API（バックエンド）+ Next.js（フロントエンド）を使用したフルスタック Web アプリケーションで、Docker によるコンテナ化開発環境を採用しています。

## コマンド一覧

### バックエンド (Rails API)

```bash
# テストの実行
docker compose exec backend bundle exec rspec
docker compose exec backend bundle exec rspec spec/path/to/specific_spec.rb

# リンターの実行
docker compose exec backend bundle exec rubocop
docker compose exec backend bundle exec rubocop -a  # 自動修正

# データベース操作
docker compose exec backend rails db:migrate
docker compose exec backend rails db:rollback
docker compose exec backend rails db:seed

# Rails コンソール
docker compose exec backend rails c

# モデル・コントローラーの生成
docker compose exec backend rails g model ModelName
docker compose exec backend rails g controller api/v1/ControllerName
```

### フロントエンド (Next.js)

```bash
# テストの実行
docker compose exec frontend npm test
docker compose exec frontend npm run test:watch
docker compose exec frontend npm run test:coverage

# リンターとフォーマッターの実行
docker compose exec frontend npm run lint
docker compose exec frontend npm run format

# ビルド
docker compose exec frontend npm run build
```

### 開発ワークフロー

```bash
# 全サービスの起動
docker compose up -d

# ログの確認
docker compose logs -f backend
docker compose logs -f frontend

# サービスの再起動
docker compose restart backend
docker compose restart frontend
```

## 命名規則

### Ruby・Rails

- 変数・関数名: スネークケース
- ファイル名: スネークケース
- データベーステーブル名: スネークケース

### JavaScript・TypeScript・React・Next.js

- 変数・関数名: キャメルケース
- コンポーネント名: パスカルケース
- ファイル名: ケバブケース

## アーキテクチャ

### API 構造

- バージョン管理された API: コントローラーは `backend/app/controllers/api/v1/` にあります
- フロントエンド通信のための CORS 有効化
- JSON API レスポンス

### フロントエンドアーキテクチャ

- Next.js 14 と App Router (`frontend/src/app/`)
- サーバー状態管理のための TanStack Query
- API 呼び出し用の Axios 設定済み (`frontend/src/lib/axios.ts`)
- グローバルプロバイダー (`frontend/src/app/providers.tsx`)

### 主要開発ポート

- フロントエンド: http://localhost:8888
- バックエンド API: http://localhost:3200
- メールプレビュー: http://localhost:3200/letter_opener
- PostgreSQL: localhost:5434

### テスト

- バックエンド: RSpec と FactoryBot を使用
- フロントエンド: Jest と React Testing Library
- CI では GitHub Actions を使用して PR で全テストを実行

### コード品質ツール

- バックエンド: Rails/RSpec 固有のルールを持つ Rubocop
- フロントエンド: ESLint + Prettier (TailwindCSS プラグイン付き)
- 両方とも CI パイプラインで実施

## Git 運用

- Github Flow で main ブランチから`feature/機能`ブランチを切って開発する
- コミットメッセージに feat:, fix:, docs:,refactor:,chore:,test:,style:などのプレフィックスをつける

## log

実装完了後、要件定義ディレクトリ `_docs/` に実装ログを残す。`yyyy-mm-dd_機能名.md` という形式で保存する。起動時も読み込む

1 ヶ月前のログは削除する。

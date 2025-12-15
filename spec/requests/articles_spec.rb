require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  include Devise::Test::IntegrationHelpers

  let(:user) { create(:user) }

  describe 'GET #index' do
    context '記事の表示内容と並び順' do
      let!(:new_article) { create(:article, :published, created_at: 1.hour.ago, title: '新しい記事') }
      let!(:old_article) { create(:article, :published, created_at: 1.day.ago, title: '古い記事') }
      let!(:draft_article) { create(:article, :draft, title: '下書き記事') }

      it '正常にレスポンスを返すこと' do
        get articles_path
        expect(response).to have_http_status(:success)
      end

      it '公開記事のみが表示されていること' do
        get articles_path
        expect(response.body).to include(new_article.title)
        expect(response.body).not_to include(draft_article.title)
      end

      it '記事が新しい順で表示されていること' do
        get articles_path
        expect(response.body.index(new_article.title)).to be < response.body.index(old_article.title)
      end
    end

    context '記事が1件もない場合' do
      it '空の状態のメッセージが表示されること' do
        get articles_path
        expect(response).to have_http_status(:success)
        expect(response.body).to include('まだ記事が投稿されていません')
      end
    end

    context 'ページネーション' do
      before do
        create_list(:article, 25, :published)
      end

      let!(:oldest_article) { create(:article, :published, created_at: 1.year.ago, title: '2ページ目の記事') }

      context 'パラメータなし（1ページ目）の場合' do
        it '2ページ目の記事は表示されないこと' do
          get articles_path
          expect(response.body).not_to include(oldest_article.title)
        end
      end

      context '2ページ目を指定した場合' do
        it '2ページ目の記事が表示されること' do
          get articles_path(page: 2)
          expect(response).to have_http_status(:success)
          expect(response.body).to include(oldest_article.title)
        end
      end
    end
  end

  describe 'GET #new' do
    context 'ログイン済みの場合' do
      before { sign_in user }

      it '正常にレスポンスを返し、新しい技術記事オブジェクトを保持すること' do
        get new_article_path
        expect(response).to have_http_status(:success)
        expect(response.body).to include('新しい技術記事を作成')
      end
    end

    context '未ログインの場合' do
      it 'トップページにリダイレクトされること' do
        get new_article_path
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST #create' do
    let(:valid_params) do
      { article: attributes_for(:article) }
    end
    let(:invalid_params) do
      { article: attributes_for(:article, title: nil) }
    end

    context 'ログイン済みの場合' do
      before { sign_in user }

      context 'パラメータが有効な場合' do
        it '技術記事がDBに保存され、ユーザーと紐付いていること' do
          expect do
            post articles_path, params: valid_params
          end.to change(Article, :count).by(1)

          expect(Article.last.user).to eq(user)
        end

        it '記事一覧ページにリダイレクトすること' do
          post articles_path, params: valid_params
          expect(response).to redirect_to(articles_path)
        end
      end

      context 'パラメータが無効な場合' do
        it '技術記事がDBに保存されず、フォームが再表示されること' do
          expect do
            post articles_path, params: invalid_params
          end.not_to change(Article, :count)

          expect(response).to have_http_status(:unprocessable_content)
          expect(response.body).to include(I18n.t('articles.create.failure'))
        end
      end
    end

    context '未ログインの場合' do
      it '技術記事が保存されず、トップページにリダイレクトされること' do
        expect do
          post articles_path, params: valid_params
        end.not_to change(Article, :count)

        expect(response).to redirect_to(root_path)
      end
    end
  end
end

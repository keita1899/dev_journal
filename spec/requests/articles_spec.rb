require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  include Devise::Test::IntegrationHelpers

  let(:user) { create(:user) }

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

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

  describe 'GET #show' do
    let(:other_user) { create(:user) }
    let!(:article) { create(:article, :published, user: user, title: '詳細ページのテスト') }
    let!(:draft_article) { create(:article, :draft, user: user) }

    context '未ログイン（ゲスト）の場合' do
      it '正常に表示され、編集ボタンが表示されないこと' do
        get article_path(article)

        expect(response).to have_http_status(:success)
        expect(response.body).to include(article.title)
        expect(response.body).not_to include(edit_article_path(article))
      end
    end

    context '記事の作成者がログインしている場合' do
      before { sign_in user }

      it '編集ボタンが表示されること' do
        get article_path(article)

        expect(response).to have_http_status(:success)
        expect(response.body).to include(edit_article_path(article))
      end
    end

    context '記事の作成者以外がログインしている場合' do
      before { sign_in other_user }

      it '編集ボタンが表示されないこと' do
        get article_path(article)

        expect(response).to have_http_status(:success)
        expect(response.body).to include(article.title)
        expect(response.body).not_to include(edit_article_path(article))
      end
    end

    context '下書き記事にアクセスした場合' do
      it '404エラーが発生すること' do
        get article_path(draft_article)
        expect(response).to have_http_status(:not_found)
      end
    end

    context '存在しないIDにアクセスした場合' do
      it '404エラーが発生すること' do
        get article_path(id: 999_999)
        expect(response).to have_http_status(:not_found)
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

  describe 'GET #edit' do
    let(:other_user) { create(:user) }
    let!(:article) { create(:article, :published, user: user, title: '編集ページのテスト') }
    let!(:draft_article) { create(:article, :draft, user: user, title: '下書き記事') }

    context 'ログイン済みで自分の記事の場合' do
      before { sign_in user }

      it '正常に表示されること' do
        get edit_article_path(article)
        expect(response).to have_http_status(:success)
        expect(response.body).to include('記事を編集')
      end

      it '下書き記事も編集可能であること' do
        get edit_article_path(draft_article)
        expect(response).to have_http_status(:success)
        expect(response.body).to include('記事を編集')
      end
    end

    context 'ログイン済みで他人の記事の場合' do
      before { sign_in other_user }

      it '404エラーが発生すること' do
        get edit_article_path(article)
        expect(response).to have_http_status(:not_found)
      end
    end

    context '未ログインの場合' do
      it 'トップページにリダイレクトされること' do
        get edit_article_path(article)
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'PATCH #update' do
    let(:other_user) { create(:user) }
    let!(:article) { create(:article, :published, user: user, title: '更新前のタイトル', content: '更新前の内容') }
    let(:valid_params) do
      { article: { title: '更新後のタイトル', content: '更新後の内容', status: :published } }
    end
    let(:invalid_params) do
      { article: { title: nil, content: '更新後の内容', status: :published } }
    end

    context 'ログイン済みで自分の記事の場合' do
      before { sign_in user }

      context 'パラメータが有効な場合' do
        it '正常に更新されること' do
          patch article_path(article), params: valid_params
          article.reload
          expect(article.title).to eq('更新後のタイトル')
          expect(article.content).to eq('更新後の内容')
        end

        it '更新後、記事詳細ページにリダイレクトされること' do
          patch article_path(article), params: valid_params
          expect(response).to redirect_to(article_path(article))
        end
      end

      context 'パラメータが無効な場合' do
        it 'フォームが再表示されること' do
          patch article_path(article), params: invalid_params
          expect(response).to have_http_status(:unprocessable_content)
          expect(response.body).to include('記事を編集')
        end
      end
    end

    context 'ログイン済みで他人の記事の場合' do
      before { sign_in other_user }

      it '404エラーが発生すること' do
        patch article_path(article), params: valid_params
        expect(response).to have_http_status(:not_found)
      end
    end

    context '未ログインの場合' do
      it 'トップページにリダイレクトされること' do
        patch article_path(article), params: valid_params
        expect(response).to redirect_to(root_path)
      end
    end
  end
end

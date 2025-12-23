require 'rails_helper'

RSpec.describe 'Memos', type: :request do
  include Devise::Test::IntegrationHelpers

  let(:user) { create(:user) }
  let(:other_user) { create(:user) }

  describe 'GET #index' do
    context 'ログイン済みの場合' do
      before { sign_in user }

      context 'メモが存在する場合' do
        let!(:my_memo) { create(:memo, user: user, body: 'My memo') }
        let!(:other_memo) { create(:memo, user: other_user, body: 'Other user memo') }

        it '正常にレスポンスを返すこと' do
          get memos_path
          expect(response).to have_http_status(:success)
        end

        it '自分のメモのみが表示されること' do
          get memos_path
          expect(response.body).to include(my_memo.body)
          expect(response.body).not_to include(other_memo.body)
        end
      end

      context 'メモの並び順' do
        let!(:old_memo) { create(:memo, user: user, body: 'Old memo', created_at: 1.day.ago) }
        let!(:new_memo) { create(:memo, user: user, body: 'New memo', created_at: 1.hour.ago) }

        it 'メモが新しい順で表示されること' do
          get memos_path
          expect(response.body.index(new_memo.body)).to be < response.body.index(old_memo.body)
        end
      end

      context 'メモが存在しない場合' do
        it '空の状態のメッセージが表示されること' do
          get memos_path
          expect(response).to have_http_status(:success)
          expect(response.body).to include('まだメモが投稿されていません')
        end
      end

      context 'ページネーション' do
        before { create_list(:memo, 25, user: user) }

        let!(:oldest_memo) { create(:memo, user: user, body: '2 page memo', created_at: 1.year.ago) }

        it 'パラメータなし（1ページ目）の場合、2ページ目のメモは表示されないこと' do
          get memos_path
          expect(response.body).not_to include(oldest_memo.body)
        end

        it '2ページ目を指定した場合、2ページ目のメモが表示されること' do
          get memos_path(page: 2)
          expect(response).to have_http_status(:success)
          expect(response.body).to include(oldest_memo.body)
        end
      end
    end

    context '未ログインの場合' do
      it 'トップページにリダイレクトされること' do
        get memos_path
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST #create' do
    let(:valid_params) { { memo: { body: 'Test memo body' } } }
    let(:invalid_params) { { memo: { body: '' } } }

    context 'ログイン済みの場合' do
      before { sign_in user }

      context 'パラメータが有効な場合' do
        it 'メモがDBに保存され、ユーザーと紐付いていること' do
          expect do
            post memos_path, params: valid_params
          end.to change(Memo, :count).by(1)

          expect(Memo.last.user).to eq(user)
        end

        it 'メモ一覧ページにリダイレクトすること' do
          post memos_path, params: valid_params
          expect(response).to redirect_to(memos_path)
        end
      end

      context 'パラメータが無効な場合' do
        it 'メモがDBに保存されず、フォームが再表示されること' do
          expect do
            post memos_path, params: invalid_params
          end.not_to change(Memo, :count)

          expect(response).to have_http_status(:unprocessable_content)
        end
      end

      context '本文が500文字を超える場合' do
        let(:over_limit_params) { { memo: { body: 'a' * 501 } } }

        it 'メモがDBに保存されないこと' do
          expect do
            post memos_path, params: over_limit_params
          end.not_to change(Memo, :count)

          expect(response).to have_http_status(:unprocessable_content)
        end
      end
    end

    context '未ログインの場合' do
      it 'メモが保存されず、トップページにリダイレクトされること' do
        expect do
          post memos_path, params: valid_params
        end.not_to change(Memo, :count)

        expect(response).to redirect_to(root_path)
      end
    end
  end
end

require 'rails_helper'

RSpec.describe 'Sessions', type: :request do
  let(:user) { create(:user) }

  include Devise::Test::IntegrationHelpers

  describe 'ログアウト' do
    context 'ログイン済みの場合' do
      before do
        sign_in user
      end

      it 'DELETEリクエストによりログアウトが成功し、ルートパスにリダイレクトされること' do
        delete destroy_user_session_path

        expect(response).to have_http_status(:see_other)
        expect(response).to redirect_to(root_path)

        follow_redirect!
        expect(response.body).to include('ログアウトしました。')
      end
    end

    context '未ログインの場合' do
      it 'ログアウト処理を実行してもエラーにならないこと' do
        delete destroy_user_session_path

        follow_redirect!
        expect(response.body).to include('既にログアウト済みです。')
      end
    end
  end

  describe 'ゲストログイン' do
    context 'ユーザーが未登録の場合' do
      it 'ゲストログインが成功し、フラッシュメッセージが表示されること' do
        expect { post users_guest_sign_in_path }.to change(User, :count).by(1)
        follow_redirect!
        expect(response.body).to include(I18n.t('devise.sessions.guest.sign_in'))
        expect(User.last.email).to eq 'guest@example.com'
        expect(User.last.nickname).to eq 'ゲスト'
      end
    end

    context 'ゲストユーザーが既に存在する場合' do
      let(:existing_guest) { create(:user, :guest) }
      let(:initial_user_count) { User.count }

      before do
        delete destroy_user_session_path
        post users_guest_sign_in_path
        follow_redirect!
      end

      it '新規ユーザーを作成せず、既存のユーザーでログインすること' do
        expect(User.count).to eq initial_user_count

        expect(response.body).to include(I18n.t('devise.sessions.guest.sign_in'))
      end
    end
  end
end

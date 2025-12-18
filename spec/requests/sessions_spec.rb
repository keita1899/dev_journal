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
      it 'ゲストログインが成功し、カレンダーページにリダイレクトされること' do
        expect { post users_guest_sign_in_path }.to change(User, :count).by(1)
        expect(response).to redirect_to(daily_reports_path)
        follow_redirect!
        expect(response.body).to include(I18n.t('devise.sessions.guest.sign_in'))
        expect(User.last.email).to eq 'guest@example.com'
        expect(User.last.nickname).to eq 'ゲスト'
      end
    end

    context 'ゲストユーザーが既に存在する場合' do
      before do
        create(:user, :guest)
      end

      it '新規ユーザーを作成せず、既存のユーザーでログインすること' do
        initial_count = User.count
        post users_guest_sign_in_path
        expect(User.count).to eq initial_count
        expect(response).to redirect_to(daily_reports_path)
        follow_redirect!

        expect(response.body).to include(I18n.t('devise.sessions.guest.sign_in'))
      end
    end
  end
end

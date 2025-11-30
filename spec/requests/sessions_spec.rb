require 'rails_helper'

RSpec.describe 'Sessions', type: :request do
  let(:user) { create(:user) }

  include Devise::Test::IntegrationHelpers

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

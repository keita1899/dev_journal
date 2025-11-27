require 'rails_helper'

RSpec.describe 'OAuth Login', type: :request do
  describe 'GitHubログイン' do
    before do
      # 成功パターンのMockをセット
      OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new({
                                                                    provider: 'github',
                                                                    uid: '12345678',
                                                                    info: {
                                                                      email: 'oauth_test@example.com'
                                                                    }
                                                                  })
    end

    context '認証に成功した場合' do
      before { post user_github_omniauth_callback_path }

      it 'ユーザーが新規作成されること' do
        expect(User.count).to eq 1
        expect(User.last.email).to eq 'oauth_test@example.com'
      end

      it 'トップページへリダイレクトすること' do
        expect(response).to redirect_to(root_path)
      end

      it '認証成功のフラッシュメッセージが表示されること' do
        follow_redirect!
        expect(response.body).to include('Github アカウントによる認証に成功しました。')
      end
    end

    context '認証に失敗した場合' do
      before do
        OmniAuth.config.mock_auth[:github] = :invalid_credentials
      end

      it 'ログインできず、トップページ（または登録画面）にリダイレクトすること' do
        post user_github_omniauth_callback_path

        expect(response).to redirect_to(root_path)

        expect(User.count).to eq 0
      end
    end
  end
end

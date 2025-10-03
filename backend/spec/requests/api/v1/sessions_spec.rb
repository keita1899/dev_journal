require 'rails_helper'

RSpec.describe 'Api::V1::Sessions', type: :request do
  describe 'POST /api/v1/auth/sign_in' do
    before do
      create(:user, email: 'test@example.com', password: 'password123')
    end

    context '有効なパラメータの場合' do
      let(:params) { { email: 'test@example.com', password: 'password123' } }

      it 'okステータス(200)が返されること' do
        post api_v1_user_session_path, params: params
        expect(response).to have_http_status(:ok)
      end

      it 'トークン情報が返されること' do
        post api_v1_user_session_path, params: params
        expect(response.headers['access-token']).to be_present
        expect(response.headers['client']).to be_present
        expect(response.headers['uid']).to be_present
      end
    end

    context 'メールアドレスが異なる場合' do
      let(:params) { { email: 'invalid@example.com', password: 'password123' } }

      it 'unauthorizedステータス(401)が返されること' do
        post api_v1_user_session_path, params: params
        expect(response).to have_http_status(:unauthorized)
      end

      it 'エラーメッセージが含まれていること' do
        post api_v1_user_session_path, params: params
        expect(response.parsed_body['errors']).to include(
          'ログイン用の認証情報が正しくありません。再度お試しください。'
        )
      end
    end

    context 'パスワードが異なる場合' do
      let(:params) { { email: 'test@example.com', password: 'invalidpassword' } }

      it 'unauthorizedステータス(401)が返されること' do
        post api_v1_user_session_path, params: params
        expect(response).to have_http_status(:unauthorized)
      end

      it 'エラーメッセージが含まれていること' do
        post api_v1_user_session_path, params: params
        expect(response.parsed_body['errors']).to include(
          'ログイン用の認証情報が正しくありません。再度お試しください。'
        )
      end
    end
  end

  describe 'DELETE /api/v1/auth/sign_out' do
    let(:user) { create(:user) }

    context 'ログインしている場合' do
      it 'ヘッダーが正しければ、ok(200)が返されログアウトできること' do
        delete destroy_api_v1_user_session_path, headers: user.create_new_auth_token

        expect(response).to have_http_status(:ok)
      end

      it 'ヘッダーが正しくなければ、not_found(404)が返されログアウトできないこと' do
        delete destroy_api_v1_user_session_path, headers: { 'access-token' => 'invalid',
                                                            'client' => 'invalid',
                                                            'uid' => 'invalid@example.com' }

        expect(response).to have_http_status(:not_found)
      end
    end

    context 'ログインしていない場合' do
      it 'not_found(404)が返されログアウトできないこと' do
        delete destroy_api_v1_user_session_path, headers: {}

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end

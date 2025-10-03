require 'rails_helper'

RSpec.describe 'Api::V1::Auth::TokenValidations', type: :request do
  describe 'GET /api/v1/auth/validate_token' do
    let(:user) { create(:user) }

    context 'トークンが有効な場合' do
      let(:headers) { user.create_new_auth_token }

      it 'okステータス(200)が返ること' do
        get api_v1_auth_validate_token_path, headers: headers

        expect(response).to have_http_status(:ok)
      end

      it 'ユーザー情報が返ること' do
        get api_v1_auth_validate_token_path, headers: headers
        json = response.parsed_body

        expect(json['data']['email']).to eq(user.email)
      end
    end

    context 'トークンが無効な場合' do
      let(:headers) do
        {
          'access-token' => 'invalid',
          'client' => 'invalid',
          'uid' => 'invalid@example.com'
        }
      end

      it 'Unauthorizedステータス(401)が返ること' do
        get api_v1_auth_validate_token_path, headers: headers

        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'トークンが無い場合' do
      it 'Unauthorizedステータス(401)が返ること' do
        get api_v1_auth_validate_token_path

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

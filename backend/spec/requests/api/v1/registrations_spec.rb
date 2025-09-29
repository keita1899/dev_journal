require 'rails_helper'

RSpec.describe 'Api::V1::Registrations', type: :request do
  describe 'POST /api/v1/auth' do
    subject(:signup_request) { post api_v1_user_registration_path, params: params }

    let(:json) { response.parsed_body }
    let(:password) { 'password123' }

    context '有効なパラメータの場合' do
      let(:params) do
        { email: 'test@example.com', password: password, password_confirmation: password }
      end

      it '新しいユーザーが作成されること' do
        expect { signup_request }.to change(User, :count).by(1)
      end

      it 'okステータス(200)が返されること' do
        signup_request
        expect(response).to have_http_status(:ok)
      end

      it 'トークン情報が返されること' do
        signup_request
        expect(response.headers['access-token']).to be_present
        expect(response.headers['client']).to be_present
        expect(response.headers['uid']).to be_present
      end
    end

    context 'メールアドレスが重複している場合' do
      let(:params) do
        { email: 'test@example.com', password: password, password_confirmation: 'invalid' }
      end

      before do
        create(:user, email: 'test@example.com')
      end

      it 'ユーザーが作成されないこと' do
        expect { signup_request }.not_to change(User, :count)
      end

      it 'unprocessable_contentステータス(422)が返されること' do
        signup_request
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'エラーメッセージが含まれていること' do
        signup_request
        json = response.parsed_body
        expect(json['errors']['email']).to include('はすでに存在します')
      end
    end

    context 'パスワードが一致しない場合' do
      let(:params) do
        { email: 'test@example.com', password: password, password_confirmation: 'invalid' }
      end

      it 'unprocessable_contentステータス(422)が返されること' do
        signup_request
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'エラーメッセージが含まれていること' do
        signup_request
        json = response.parsed_body
        expect(json['errors']['password_confirmation']).to include('とパスワードの入力が一致しません')
      end
    end
  end
end

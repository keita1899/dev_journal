require 'rails_helper'

RSpec.describe 'Api::V1::Registrations', type: :request do
  describe 'POST /api/v1/auth' do
    let(:json) { response.parsed_body }

    context '有効なパラメータの場合' do
      let(:params) { { email: 'test@example.com', password: 'password123', password_confirmation: 'password123' } }

      it '新しいユーザーが作成されること' do
        expect { post api_v1_user_registration_path, params: params }.to change(User, :count).by(1)
      end

      it 'okステータス(200)が返されること' do
        post api_v1_user_registration_path, params: params
        expect(response).to have_http_status(:ok)
      end

      it 'トークン情報が返されること' do
        post api_v1_user_registration_path, params: params
        expect(response.headers['access-token']).to be_present
        expect(response.headers['client']).to be_present
        expect(response.headers['uid']).to be_present
      end
    end

    context 'メールアドレスが重複している場合' do
      let(:params) { { email: 'test@example.com', password: 'password123', password_confirmation: 'password123' } }

      before do
        create(:user, email: 'test@example.com')
      end

      it 'ユーザーが作成されないこと' do
        expect { post api_v1_user_registration_path, params: params }.not_to change(User, :count)
      end

      it 'unprocessable_contentステータス(422)が返されること' do
        post api_v1_user_registration_path, params: params
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'エラーメッセージが含まれていること' do
        post api_v1_user_registration_path, params: params
        expect(json['errors']['full_messages']).to include('メールアドレスはすでに存在します')
      end
    end

    context 'パスワードが一致しない場合' do
      let(:params) { { email: 'test@example.com', password: 'password123', password_confirmation: 'invalid' } }

      it 'unprocessable_contentステータス(422)が返されること' do
        post api_v1_user_registration_path, params: params
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'エラーメッセージが含まれていること' do
        post api_v1_user_registration_path, params: params
        expect(json['errors']['full_messages']).to include('パスワード（確認用）とパスワードの入力が一致しません')
      end
    end
  end
end

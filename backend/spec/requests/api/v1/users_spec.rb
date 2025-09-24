require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  describe 'POST /api/v1/users' do
    subject(:user_creation_request) { post api_v1_users_path, params: params }

    let(:json) { response.parsed_body }
    let(:password) { 'password123' }

    context '有効なパラメータの場合' do
      let(:params) do
        { user: { email: 'test@example.com', password: password, password_confirmation: password } }
      end

      it '新しいユーザーが作成されること' do
        expect { user_creation_request }.to change(User, :count).by(1)
      end

      it 'createdステータス(201)が返されること' do
        user_creation_request
        expect(response).to have_http_status(:created)
      end

      it 'シリアライズされたユーザー情報が返されること' do
        user_creation_request
        json = response.parsed_body
        expect(json.keys).to contain_exactly('id', 'email', 'created_at', 'updated_at')
      end
    end

    context 'メールアドレスが重複している場合' do
      let(:params) do
        { user: { email: 'test@example.com', password: password, password_confirmation: 'invalid' } }
      end

      before do
        create(:user, email: 'test@example.com')
      end

      it 'ユーザーが作成されないこと' do
        expect { user_creation_request }.not_to change(User, :count)
      end

      it 'unprocessable_contentステータス(422)が返されること' do
        user_creation_request
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'エラーメッセージが含まれていること' do
        user_creation_request
        json = response.parsed_body
        expect(json['errors']).to include('メールアドレスはすでに存在します')
      end
    end

    context 'パスワードが一致しない場合' do
      let(:params) do
        { user: { email: 'test@example.com', password: password, password_confirmation: 'invalid' } }
      end

      it 'unprocessable_contentステータス(422)が返されること' do
        user_creation_request
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'エラーメッセージが含まれていること' do
        user_creation_request
        json = response.parsed_body
        expect(json['errors']).to include('パスワード（確認用）とパスワードの入力が一致しません')
      end
    end
  end
end

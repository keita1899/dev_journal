require 'rails_helper'

RSpec.describe 'Api::V1::DailyReports', type: :request do
  describe 'POST /api/v1/daily_reports' do
    let!(:user) { create(:user, email: 'test@example.com', password: 'password123') }
    let(:headers) { user.create_new_auth_token }

    context 'ログインしている場合' do
      context '有効なパラメータの場合' do
        let(:params) do
          {
            daily_report: {
              content: '今日の作業',
              date: Time.zone.today
            }
          }
        end

        it 'createdステータス(201)が返されること' do
          post api_v1_daily_reports_path, params: params, headers: headers
          expect(response).to have_http_status(:created)
        end

        it '日報が作られること' do
          expect do
            post api_v1_daily_reports_path, params: params, headers: headers
          end.to change(DailyReport, :count).by(1)
        end
      end

      context '無効なパラメータの場合' do
        let(:invalid_params) do
          { daily_report: { content: '', date: Time.zone.today } }
        end

        it 'エラーメッセージが含まれていること' do
          post api_v1_daily_reports_path, params: invalid_params, headers: headers
          expect(response).to have_http_status(:unprocessable_content)
          expect(response.parsed_body['errors']).not_to be_empty
        end
      end
    end

    context 'ログインしていない場合' do
      it 'unauthorizedステータス(401)が返されること' do
        post api_v1_daily_reports_path, params: { daily_report: { content: 'テスト', date: Time.zone.today } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

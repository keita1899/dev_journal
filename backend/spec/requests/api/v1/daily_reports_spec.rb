require 'rails_helper'

RSpec.describe 'Api::V1::DailyReports', type: :request do
  let!(:user) { create(:user, email: 'test@example.com', password: 'password123') }
  let(:headers) { user.create_new_auth_token }

  describe 'GET /api/v1/daily_reports' do
    let(:params) { { year: '2025', month: '10' } }

    context 'ログインしている場合' do
      context '日報のデータが存在する場合' do
        it 'okステータス(200)が返されること' do
          get api_v1_daily_reports_path, params:, headers: headers
          expect(response).to have_http_status(:ok)
        end

        it '自分の日報のデータが返されること' do
          own_report = create(:daily_report, user: user, date: Date.new(2025, 10, 5))
          get api_v1_daily_reports_path, params:, headers: headers

          expect(json.length).to eq(1)
          expect(json.first['id']).to eq(own_report.id)
        end

        it '他人の日報のデータは返されないこと' do
          other_user = create(:user)
          other_report = create(:daily_report, user: other_user, date: Date.new(2025, 10, 10))
          get api_v1_daily_reports_path, params:, headers: headers

          ids = json.map { |daily_report| daily_report['id'] }
          expect(ids).not_to include(other_report.id)
        end
      end

      context '日報のデータが存在しない場合' do
        it 'okステータス(200)が返されること' do
          get api_v1_daily_reports_path, params:, headers: headers
          expect(response).to have_http_status(:ok)
        end

        it '空の配列が返ること' do
          get api_v1_daily_reports_path, params:, headers: headers
          expect(json).to eq([])
        end
      end

      context '日付が不正な場合' do
        let(:params) { { year: 'abcd', month: '13' } }

        it '400 Bad Requestが返ること' do
          get api_v1_daily_reports_path, params:, headers: headers
          expect(response).to have_http_status(:bad_request)
        end
      end
    end

    context 'ログインしていない場合' do
      it 'unauthorizedステータス(401)が返されること' do
        get api_v1_daily_reports_path
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/daily_reports' do
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

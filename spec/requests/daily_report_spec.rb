require 'rails_helper'

RSpec.describe 'DailyReports', type: :request do
  include Devise::Test::IntegrationHelpers

  let(:user) { create(:user) }
  let(:valid_params) do
    { daily_report: attributes_for(:daily_report, date: Date.current) }
  end
  let(:invalid_params) do
    { daily_report: attributes_for(:daily_report, content: nil) }
  end

  describe 'GET #new' do
    context 'ログイン済みの場合' do
      before { sign_in user }

      it '正常にレスポンスを返し、新しい日報オブジェクトを保持すること' do
        get new_daily_report_path
        expect(response).to have_http_status(:success)
        expect(response.body).to include('新しい日報を作成')
      end
    end

    context '未ログインの場合' do
      it 'トップページにリダイレクトされること' do
        get new_daily_report_path
        expect(response).to redirect_to(root_path)
      end
    end
  end

  describe 'POST #create' do
    context 'ログイン済みの場合' do
      before { sign_in user }

      context 'パラメータが有効な場合' do
        it '日報がDBに保存され、カレンダーページにリダイレクトすること' do
          expect do
            post daily_reports_path, params: valid_params
          end.to change(DailyReport, :count).by(1)

          expect(response).to redirect_to(daily_reports_path)
        end
      end

      context 'パラメータが無効な場合' do
        it '日報がDBに保存されず、フォームが再表示されること' do
          expect do
            post daily_reports_path, params: invalid_params
          end.not_to change(DailyReport, :count)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).to include(I18n.t('daily_reports.create.failure'))
        end
      end
    end

    context '未ログインの場合' do
      it '日報が保存されず、トップページにリダイレクトされること' do
        expect do
          post daily_reports_path, params: valid_params
        end.not_to change(DailyReport, :count)

        expect(response).to redirect_to(root_path)
      end
    end
  end
end

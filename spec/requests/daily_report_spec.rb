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

  describe 'GET #index' do
    context 'ログイン済みの場合' do
      before { sign_in user }

      let(:today) { Date.current }
      let(:last_month) { today.last_month }

      it '正常にレスポンスを返し、今月のカレンダーが表示されること' do
        get daily_reports_path
        expect(response).to have_http_status(:success)
        expect(response.body).to include('日報カレンダー')
      end

      it 'パラメータなしの場合、今月のレポートのみが表示されること' do
        report_this_month = create(:daily_report, user: user, date: today)
        report_last_month = create(:daily_report, user: user, date: last_month)

        get daily_reports_path

        expect(response.body).to include(edit_daily_report_path(report_this_month))
        expect(response.body).not_to include(edit_daily_report_path(report_last_month))
      end

      it 'start_dateパラメータがある場合、指定された月のレポートが表示されること' do
        report_last_month = create(:daily_report, user: user, date: last_month)
        report_this_month = create(:daily_report, user: user, date: today)

        get daily_reports_path(start_date: last_month)

        expect(response.body).to include(edit_daily_report_path(report_last_month))
        expect(response.body).not_to include(edit_daily_report_path(report_this_month))
      end

      it '日報が存在しない場合、新規作成リンクが表示されること' do
        target_date = today.beginning_of_month + 1.day

        get daily_reports_path

        expect(response.body).to include(new_daily_report_path(date: target_date))
      end

      it '他のユーザーの日報は表示されないこと' do
        other_user = create(:user)
        other_report = create(:daily_report, user: other_user, date: today)

        get daily_reports_path

        expect(response.body).not_to include(edit_daily_report_path(other_report))
      end
    end

    context '未ログインの場合' do
      it 'トップページにリダイレクトされること' do
        get daily_reports_path
        expect(response).to redirect_to(root_path)
      end
    end
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

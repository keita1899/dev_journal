class Api::V1::DailyReportsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    return render json: { error: '不正な日付です' }, status: :bad_request unless valid_year_month?(params[:year],
                                                                                                   params[:month])

    daily_reports = DailyReport.for_user_in_month(current_api_v1_user, params[:year].to_i, params[:month].to_i)
    render json: daily_reports, status: :ok
  end

  def create
    daily_report = current_api_v1_user.daily_reports.new(daily_report_params)
    if daily_report.save
      render json: daily_report, status: :created
    else
      render json: { errors: daily_report.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def daily_report_params
    params.require(:daily_report).permit(:content, :date)
  end

  def valid_year_month?(year, month)
    year =~ /\A\d{1,4}\z/ &&
      month =~ /\A\d{1,2}\z/ &&
      year.to_i.between?(1, 9999) &&
      month.to_i.between?(1, 12)
  rescue StandardError
    false
  end
end

class Api::V1::DailyReportsController < ApplicationController
  before_action :authenticate_api_v1_user!

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
end

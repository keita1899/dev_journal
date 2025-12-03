class DailyReportsController < ApplicationController
  before_action :authenticate_user!

  def new
    @daily_report = current_user.daily_reports.build
  end

  def create
    @daily_report = current_user.daily_reports.build(daily_report_params)
    if @daily_report.save
      redirect_to daily_reports_path, notice: t('.success')
    else
      render :new
    end
  end

  private

  def daily_report_params
    params.require(:daily_report).permit(:date, :content)
  end
end

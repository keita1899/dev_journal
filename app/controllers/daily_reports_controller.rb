class DailyReportsController < ApplicationController
  before_action :authenticate_user!

  def index
    start_date = params[:start_date]&.to_date || Date.current
    start_of_data_month = start_date.beginning_of_month
    end_of_data_month = start_date.end_of_month
    @daily_reports = current_user.daily_reports
                                 .select(:id, :date, :user_id)
                                 .where(date: start_of_data_month..end_of_data_month)
                                 .order(date: :asc)
  end

  def new
    @daily_report = current_user.daily_reports.build(date: params[:date] || Date.current)
  end

  def edit
    @daily_report = current_user.daily_reports.find(params[:id])
  end

  def create
    @daily_report = current_user.daily_reports.build(daily_report_params)
    if @daily_report.save
      redirect_to daily_reports_path, notice: t('.success')
    else
      render :new, status: :unprocessable_content
    end
  end

  def update
    @daily_report = current_user.daily_reports.find(params[:id])
    if @daily_report.update(daily_report_params)
      redirect_to daily_reports_path, notice: t('.success')
    else
      render :edit, status: :unprocessable_content
    end
  end

  private

  def daily_report_params
    params.require(:daily_report).permit(:date, :content)
  end
end

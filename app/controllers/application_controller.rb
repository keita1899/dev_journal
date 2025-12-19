class ApplicationController < ActionController::Base
  protected

  def authenticate_user!(_options = {})
    return if user_signed_in?

    flash[:alert] = t('common.login_required')

    redirect_to root_path and return
  end

  def after_sign_in_path_for(_resource)
    daily_reports_path
  end
end

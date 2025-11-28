class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token, only: [:github]

  def github
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user&.persisted?
      handle_persisted_user
    else
      handle_new_user
    end
  end

  private

  def handle_persisted_user
    sign_in_and_redirect @user, event: :authentication
    set_flash_message(:notice, :success, kind: 'Github') if is_navigational_format?
  end

  def handle_new_user
    flash[:alert] = t('devise.omniauth_callbacks.failure.email_missing')
    session['devise.github_data'] = request.env['omniauth.auth'].except(:extra)
    redirect_to new_user_registration_url
  end

  def failure
    redirect_to root_path
  end
end

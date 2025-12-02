class Users::SessionsController < Devise::SessionsController
  def guest_sign_in
    user = User.guest

    unless user&.persisted?
      redirect_to root_path, alert: t('devise.sessions.guest.failure')
      return
    end

    sign_in user

    redirect_to root_path, notice: t('devise.sessions.guest.sign_in')
  end
end

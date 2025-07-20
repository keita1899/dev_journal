class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

    def respond_with(resource, _opts = {})
      if resource.persisted?
        sign_in(resource)
        render json: {
          status: "success",
          message: "アカウントが作成されました",
          user: {
            id: resource.id,
            email: resource.email,
            created_at: resource.created_at,
          },
        }, status: :created
      else
        render json: {
          status: "error",
          message: "アカウント作成に失敗しました",
          errors: resource.errors.full_messages,
        }, status: :unprocessable_entity
      end
    end

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end

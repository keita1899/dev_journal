class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  private

    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: {
          status: "success",
          message: "ログインしました",
          user: {
            id: resource.id,
            email: resource.email,
          },
        }, status: :ok
      else
        render json: {
          status: "error",
          message: "ログインに失敗しました",
          errors: resource.errors.full_messages.presence || ["メールアドレスまたはパスワードが正しくありません"],
        }, status: :unauthorized
      end
    end

    def respond_to_on_destroy
      render json: {
        status: "success",
        message: "ログアウトしました",
      }, status: :ok
    end
end

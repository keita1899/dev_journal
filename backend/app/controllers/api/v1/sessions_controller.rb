class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  private

    def respond_to_on_destroy
      render json: {
        status: "success",
        message: "ログアウトしました",
      }, status: :ok
    end

    def respond_with(resource, _opts = {})
      render json: {
        status: "success",
        message: "ログインしました",
        user: {
          id: resource.id,
          email: resource.email,
        },
      }, status: :ok
    end
end

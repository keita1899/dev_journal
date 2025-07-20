class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!

  def validate
    render json: {
      status: "success",
      message: "Token is valid",
      user: {
        id: current_user.id,
        email: current_user.email,
        created_at: current_user.created_at,
      },
    }, status: :ok
  end
end

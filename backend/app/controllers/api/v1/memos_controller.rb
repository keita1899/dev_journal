class Api::V1::MemosController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[create]

  def create
    memo = current_api_v1_user.memos.new(memo_params)
    if memo.save
      render json: memo, status: :created
    else
      render json: { errors: memo.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def memo_params
    params.require(:memo).permit(:content)
  end
end

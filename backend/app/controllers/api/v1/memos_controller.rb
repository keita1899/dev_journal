class Api::V1::MemosController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_api_v1_user!, only: %i[index create]

  def index
    pagy, memos = pagy(current_api_v1_user.memos.order(created_at: :desc),
                       page: params[:page])
    render json: {
      memos: MemoBlueprint.render_as_hash(memos),
      pagy: pagy_metadata(pagy)
    }
  end

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

class MemosController < ApplicationController
  before_action :authenticate_user!

  def index
    @pagy, @memos = pagy(current_user.memos.order(created_at: :desc))
    @memo = Memo.new
  end

  def create
    @memo = current_user.memos.build(memo_params)

    if @memo.save
      redirect_to memos_path, notice: t('.success')
    else
      @pagy, @memos = pagy(current_user.memos.order(created_at: :desc))
      render :index, status: :unprocessable_content
    end
  end

  private

  def memo_params
    params.require(:memo).permit(:body)
  end
end

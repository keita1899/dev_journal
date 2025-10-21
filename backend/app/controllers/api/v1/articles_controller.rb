class Api::V1::ArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    article = current_api_v1_user.articles.new(article_params)
    if article.save
      render json: article, status: :created
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content, :published)
  end
end

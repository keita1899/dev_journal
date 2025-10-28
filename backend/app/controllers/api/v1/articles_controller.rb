class Api::V1::ArticlesController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_api_v1_user!, only: %i[create]

  def index
    pagy, articles = pagy(Article.preload(:user).where(published: true).order(created_at: :desc),
                          page: params[:page])

    render json: {
      articles: ArticleBlueprint.render_as_hash(articles),
      pagy: pagy_metadata(pagy)
    }, status: :ok
  rescue Pagy::OverflowError
    render json: { error: 'ページが見つかりません' }, status: :not_found
  end

  def show
    article = Article.includes(:user).where(published: true).find(params[:id])
    render json: ArticleBlueprint.render(article), status: :ok
  end

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

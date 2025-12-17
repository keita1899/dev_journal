class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: %i[new create edit update]

  def index
    @articles = Article.published.includes(:user).order(created_at: :desc).page(params[:page])
  end

  def show
    @article = Article.published.includes(:user).find(params[:id])
  end

  def new
    @article = current_user.articles.build(status: :draft)
  end

  def edit
    @article = current_user.articles.find(params[:id])
  end

  def create
    @article = current_user.articles.build(article_params)

    if @article.save
      redirect_to articles_path, notice: t('.success')
    else
      render :new, status: :unprocessable_content
    end
  end

  def update
    @article = current_user.articles.find(params[:id])
    if @article.update(article_params)
      redirect_to article_path(@article), notice: t('.success')
    else
      render :edit, status: :unprocessable_content
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content, :status)
  end
end

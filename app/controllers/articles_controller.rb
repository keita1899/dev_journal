class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: %i[new create edit update destroy]

  def index
    @articles = Article.published.includes(:user).order(created_at: :desc).page(params[:page])
  end

  def show
    @article = Article.includes(:user).find(params[:id])
    return if @article.published? || (user_signed_in? && @article.user == current_user)

    raise ActiveRecord::RecordNotFound
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

  def destroy
    @article = current_user.articles.find(params[:id])
    return redirect_to articles_path, alert: t('.failure') unless @article.destroy

    redirect_to articles_path, notice: t('.success'), status: :see_other
  end

  private

  def article_params
    params.require(:article).permit(:title, :content, :status)
  end
end

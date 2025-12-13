class ArticlesController < ApplicationController
  before_action :authenticate_user!, only: %i[new create]

  def index; end

  def new
    @article = current_user.articles.build(status: :draft)
  end

  def create
    @article = current_user.articles.build(article_params)

    if @article.save
      redirect_to articles_path, notice: t('.success')
    else
      render :new, status: :unprocessable_content
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content, :status)
  end
end

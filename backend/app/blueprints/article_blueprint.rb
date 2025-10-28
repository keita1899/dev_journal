class ArticleBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :content, :published, :created_at

  association :user, blueprint: UserBlueprint
end

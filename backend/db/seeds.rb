require 'faker'

Rails.logger.debug '🌱 Seeding database...'

User.destroy_all
Article.destroy_all

user = User.create!(
  name: 'テストユーザー',
  email: 'test@example.com',
  password: 'password',
  password_confirmation: 'password'
)

Rails.logger.debug { "👤 User created: #{user.email}" }

100.times do
  Article.create!(
    title: Faker::Book.title,
    content: Faker::Lorem.paragraphs(number: 4).join("\n\n"),
    published: true,
    user: user
  )
end

Rails.logger.debug { "📝 100 articles created for #{user.name}" }
Rails.logger.debug '✅ Seeding completed!'

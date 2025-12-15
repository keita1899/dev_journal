Rails.logger.debug '既存のデータを削除中...'
Article.destroy_all
User.destroy_all

main_user = User.create!(
  nickname: '開発 太郎',
  email: 'test@example.com',
  password: 'password',
  password_confirmation: 'password'
)
Rails.logger.debug { "メインユーザーを作成: #{main_user.email} / password" }

other_users = []
5.times do |n|
  other_users << User.create!(
    nickname: "User No.#{n + 1}",
    email: "sample#{n + 1}@example.com",
    password: 'password',
    password_confirmation: 'password'
  )
end

all_users = [main_user] + other_users

Rails.logger.debug '記事データを作成中...'

100.times do |n|
  user = all_users.sample
  created_at = Time.current - n.days

  Article.create!(
    title: "【No.#{n + 1}】Rails技術記事 - #{user.nickname}の投稿",
    content: "これは#{n + 1}番目の記事の本文です。\n" + ('長い文章のテスト。' * 20),
    status: :published,
    published_at: created_at,
    created_at: created_at,
    updated_at: created_at,
    user: user
  )
end

10.times do |n|
  user = all_users.sample
  Article.create!(
    title: "【下書き】書きかけの記事 #{n + 1}",
    content: 'これは下書きです。一覧には表示されません。',
    status: :draft,
    published_at: nil,
    user: user
  )
end

Rails.logger.debug 'データの作成が完了しました！'
Rails.logger.debug { "公開記事: #{Article.published.count}件" }
Rails.logger.debug do
  "下書き: #{begin
    Article.draft.count
  rescue StandardError
    Article.where(status: :draft).count
  end}件"
end

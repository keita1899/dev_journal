FactoryBot.define do
  factory :article do
    association :user
    title { 'テスト記事のタイトル' }
    content { 'これはテスト記事の本文です。Markdown記法などもテストできます。' }
    status { :draft }
    published_at { nil }

    trait :published do
      status { :published }
      published_at { Time.current }
    end
  end
end

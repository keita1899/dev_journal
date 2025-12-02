FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@example.com" }
    password { 'password123' }

    trait :with_github do
      provider { 'github' }
      sequence(:nickname) { |n| "user_handle_#{n}" }
      sequence(:uid) { |n| "uid#{n}" }
    end

    trait :guest do
      email { 'guest@example.com' }
      nickname { 'ゲスト' }
      provider { 'guest' }
      uid { 'guest' }
    end
  end
end

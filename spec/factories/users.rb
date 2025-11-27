FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@example.com" }
    password { 'password123' }

    trait :with_github do
      provider { 'github' }
      sequence(:uid) { |n| "uid#{n}" }
    end
  end
end

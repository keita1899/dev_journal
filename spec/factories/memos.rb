FactoryBot.define do
  factory :memo do
    sequence(:body) { |n| "Test memo body #{n}" }
    association :user
  end
end

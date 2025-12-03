FactoryBot.define do
  factory :daily_report do
    association :user
    sequence(:date) { |n| n.days.ago.to_date }
    content { 'test' }
  end
end

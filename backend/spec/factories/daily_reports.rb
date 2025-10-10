FactoryBot.define do
  factory :daily_report do
    content { '今日の作業内容' }
    date { Time.zone.today }
    association :user
  end
end

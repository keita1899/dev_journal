class DailyReport < ApplicationRecord
  belongs_to :user

  validates :date, presence: true, comparison: { less_than_or_equal_to: lambda {
    Date.current
  }, allow_blank: true }, uniqueness: { scope: :user_id }
  validates :content, presence: true
end

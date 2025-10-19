class DailyReport < ApplicationRecord
  belongs_to :user

  validates :content, presence: true
  validates :date, presence: true, uniqueness: { scope: :user_id }

  def self.for_user_in_month(user, year, month)
    start_date = Date.new(year, month, 1)
    end_date = start_date.end_of_month

    where(user: user, date: start_date..end_date)
      .select(:id, :date)
  end
end

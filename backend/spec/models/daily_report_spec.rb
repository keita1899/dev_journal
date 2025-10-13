require 'rails_helper'

RSpec.describe DailyReport, type: :model do
  subject { build(:daily_report) }

  describe 'アソシエーション' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'バリデーション' do
    describe 'content' do
      it { is_expected.to validate_presence_of(:content) }
    end

    describe 'date' do
      it { is_expected.to validate_presence_of(:date) }
      it { is_expected.to validate_uniqueness_of(:date).scoped_to(:user_id) }
    end
  end
end

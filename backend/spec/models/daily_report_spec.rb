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

  describe '.for_user_in_month' do
    let(:user) { create(:user) }
    let(:other_user) { create(:user) }

    let!(:report) { create(:daily_report, user: user, date: Date.new(2025, 10, 5)) }
    let!(:other_report) { create(:daily_report, user: other_user, date: Date.new(2025, 10, 15)) }

    it '指定したユーザーの指定月の日報だけ返す' do
      daily_reports = described_class.for_user_in_month(user, 2025, 10)
      expect(daily_reports).to contain_exactly(report)
    end

    it '他のユーザーの日報は含まれない' do
      daily_reports = described_class.for_user_in_month(user, 2025, 10)
      expect(daily_reports).not_to include(other_report)
    end

    it '他の月の日報は含まれない' do
      other_month_report = create(:daily_report, user: user, date: Date.new(2025, 11, 1))
      daily_reports = described_class.for_user_in_month(user, 2025, 10)
      expect(daily_reports).not_to include(other_month_report)
    end
  end
end

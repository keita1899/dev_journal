require 'rails_helper'

RSpec.describe DailyReport, type: :model do
  let(:user) { create(:user) }
  let(:valid_report) { build(:daily_report, user: user, date: Date.current, content: 'test') }

  describe 'Associations' do
    it { is_expected.to belong_to(:user) }

    it 'userがnilの場合は無効であること' do
      report = build(:daily_report, user: nil)
      expect(report).to be_invalid
    end
  end

  describe 'Validations' do
    it 'contentがない場合は無効であること' do
      report = build(:daily_report, content: nil)
      expect(report).to be_invalid
    end

    context '日付の重複チェック' do
      before { valid_report.save! }

      it '同じuserが同日に作成した場合は無効であること' do
        duplicate_report = build(:daily_report, user: user, date: Date.current)
        expect(duplicate_report).to be_invalid
        expect(duplicate_report.errors[:date]).to include('はすでに存在します')
      end

      it '異なるuserであれば同日に作成可能であること' do
        other_user = create(:user)
        expect(build(:daily_report, user: other_user, date: Date.current)).to be_valid
      end
    end

    it '未来の日付の場合は無効であり、エラーメッセージを含むこと' do
      future_report = build(:daily_report, user: user, date: Date.tomorrow)
      expect(future_report).to be_invalid
      expect(future_report.errors[:date]).to include(
        I18n.t('activerecord.errors.models.daily_report.attributes.date.less_than_or_equal_to')
      )
    end
  end
end

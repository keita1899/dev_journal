require 'rails_helper'

RSpec.describe CalendarHelper, type: :helper do
  describe '#today?' do
    it '引数が今日の日付であればtrueを返すこと' do
      expect(helper.today?(Date.current)).to be true
      expect(helper.today?(Date.current.yesterday)).to be false
    end
  end

  describe '#date_number_classes' do
    let(:today) { Date.current }
    let(:td_classes) { ['day'] }

    it '今日の日付であれば緑色のクラスが適用されること' do
      expect(helper.date_number_classes(today, td_classes)).to include('text-green-400')
    end

    it '今月以外であれば薄い色と透過度が適用されること' do
      non_current_classes = %w[day prev-month]
      expect(helper.date_number_classes(today, non_current_classes)).to include('opacity-60')
      expect(helper.date_number_classes(today, non_current_classes)).not_to include('text-green-400')
    end
  end
end

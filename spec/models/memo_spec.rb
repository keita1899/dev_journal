require 'rails_helper'

RSpec.describe Memo, type: :model do
  describe 'Validation' do
    let(:user) { create(:user) }

    context '正常系' do
      it 'すべての属性が正しければ有効であること' do
        memo = build(:memo, user: user)
        expect(memo).to be_valid
      end

      it '本文が500文字以内であれば有効であること' do
        memo = build(:memo, user: user, body: 'a' * 500)
        expect(memo).to be_valid
      end
    end

    context '異常系' do
      it { is_expected.to validate_presence_of(:body) }
      it { is_expected.to validate_length_of(:body).is_at_most(500) }
    end
  end

  describe 'Association' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'default_scope' do
    let(:user) { create(:user) }
    let!(:old_memo) { create(:memo, user: user, created_at: 1.day.ago) }
    let!(:new_memo) { create(:memo, user: user, created_at: 1.hour.ago) }

    it '作成日時の降順で取得されること' do
      expect(described_class.all).to eq([new_memo, old_memo])
    end
  end
end

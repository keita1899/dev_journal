require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'Validation' do
    let(:user) { create(:user) }

    context '正常系' do
      it 'すべての属性が正しければ有効であること' do
        article = build(:article, user: user)
        expect(article).to be_valid
      end

      it 'ステータスがdraftのとき、published_atがnilでも有効であること' do
        article = build(:article, status: :draft, published_at: nil)
        expect(article).to be_valid
      end
    end

    context '異常系' do
      it { is_expected.to validate_presence_of(:title) }
      it { is_expected.to validate_length_of(:title).is_at_most(100) }
      it { is_expected.to validate_presence_of(:content) }
      it { is_expected.to validate_presence_of(:status) }
    end
  end

  describe 'コールバック (before_validation)' do
    context 'ステータスをpublishedにして保存する場合' do
      it 'published_atがnilなら、現在時刻が自動でセットされること' do
        article = build(:article, status: :published, published_at: nil)
        article.valid?
        expect(article.published_at).to be_present
        expect(article.published_at).to be_within(1.second).of(Time.current)
      end

      it 'published_atに既に値があるなら、上書きされないこと' do
        old_date = 1.day.ago
        article = build(:article, status: :published, published_at: old_date)
        article.valid?
        expect(article.published_at).to be_within(1.second).of(old_date)
      end
    end

    context 'ステータスをdraftにして保存する場合' do
      it 'published_atがnilのままであること' do
        article = build(:article, status: :draft, published_at: nil)
        article.valid?
        expect(article.published_at).to be_nil
      end
    end
  end

  describe 'Association' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'enum' do
    it { is_expected.to define_enum_for(:status).with_values(draft: 0, published: 1) }
  end
end

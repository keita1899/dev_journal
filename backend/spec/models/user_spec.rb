require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  before do
    create(:user)
  end

  describe 'バリデーション' do
    describe 'email' do
      it { is_expected.to validate_presence_of(:email) }
      it { is_expected.to validate_uniqueness_of(:email).case_insensitive.scoped_to(:provider) }
      it { is_expected.to allow_value("#{'a' * 243}@example.com").for(:email) }
      it { is_expected.not_to allow_value("#{'a' * 244}@example.com").for(:email) }
      it { is_expected.to allow_value('user@example.com').for(:email) }
      it { is_expected.not_to allow_value('userexample.com').for(:email) }
    end

    describe 'password' do
      it { is_expected.to validate_presence_of(:password) }
      it { is_expected.to validate_confirmation_of(:password) }
      it { is_expected.not_to allow_value('a' * 7).for(:password) }
      it { is_expected.to allow_value('a' * 8).for(:password) }
      it { is_expected.to allow_value('a' * 128).for(:password) }
      it { is_expected.not_to allow_value('a' * 129).for(:password) }
    end
  end
end

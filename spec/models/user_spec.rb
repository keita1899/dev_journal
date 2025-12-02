require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.from_omniauth' do
    let(:auth_hash) do
      OmniAuth::AuthHash.new({
                               provider: 'github',
                               uid: '12345678',
                               info: {
                                 email: 'test_github@example.com'
                               }
                             })
    end

    context '新しいユーザーの場合' do
      it 'ユーザーが新規作成されること' do
        expect do
          described_class.from_omniauth(auth_hash)
        end.to change(described_class, :count).by(1)
      end

      it '正しい情報（provider, uid, email）が保存されること' do
        user = described_class.from_omniauth(auth_hash)
        expect(user.provider).to eq 'github'
        expect(user.uid).to eq '12345678'
        expect(user.email).to eq 'test_github@example.com'
      end
    end

    context 'すでに登録済みのユーザーの場合' do
      before do
        create(:user, :with_github, email: 'test_github@example.com', uid: '12345678')
      end

      it '新しいユーザーは作成されないこと' do
        expect do
          described_class.from_omniauth(auth_hash)
        end.not_to change(described_class, :count)
      end

      it '既存のユーザーを返すこと' do
        user = described_class.from_omniauth(auth_hash)
        expect(user.uid).to eq '12345678'
      end
    end
  end

  describe '.guest' do
    context 'ゲストユーザーがDBに存在しない場合' do
      it '新規ユーザーを作成し、ゲスト用の属性が設定されること' do
        expect { described_class.guest }.to change(described_class, :count).by(1)

        guest_user = described_class.guest
        expect(guest_user.email).to eq('guest@example.com')
        expect(guest_user.nickname).to eq('ゲスト')
        expect(guest_user.provider).to eq('guest')
      end
    end

    context 'ゲストユーザーがDBに存在する場合' do
      let!(:existing_guest) { create(:user, :guest) }

      it '新規ユーザーを作成せず、既存のユーザーを返すこと' do
        expect { described_class.guest }.not_to change(described_class, :count)

        expect(described_class.guest).to eq(existing_guest)
      end
    end
  end
end

class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,
         :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :daily_reports, dependent: :destroy
  has_many :articles, dependent: :destroy

  validates :email, length: { maximum: 255 }
  validates :password, length: { maximum: 128 }, if: -> { new_record? || password.present? }
end

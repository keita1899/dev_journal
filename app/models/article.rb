class Article < ApplicationRecord
  belongs_to :user

  enum :status, { draft: 0, published: 1 }

  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true
  validates :status, presence: true
  validates :published_at, presence: true, if: :published?

  before_validation :set_published_at

  private

  def set_published_at
    return unless published? && published_at.nil?

    self.published_at = Time.current
  end
end

class Article < ApplicationRecord
  belongs_to :user

  before_save :sanitize_content

  validates :title, presence: true, length: { maximum: 255 }
  validates :content, presence: true
  validates :published, inclusion: { in: [true, false] }

  private

  def sanitize_content
    allowed_tags = %w[p br strong em ul ol li a h1 h2 h3 blockquote code pre]
    allowed_attributes = %w[href]

    self.content = Loofah.fragment(content)
                         .scrub!(:whitewash)
                         .to_s
    self.content = ActionController::Base.helpers.sanitize(content, tags: allowed_tags,
                                                                    attributes: allowed_attributes)
  end
end

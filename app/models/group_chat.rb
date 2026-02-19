class GroupChat < ApplicationRecord
  include PgSearch::Model
  DEFAULT_IMAGE = "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"

  belongs_to :admin, class_name: "User", foreign_key: "user_id", optional: true 
  has_many :user_group_chats
  has_many :participants, through: :user_group_chats, source: :user

  has_many :messages, -> { order "created_at DESC" }, as: :messageable, dependent: :destroy
  has_one_attached :image

  validates :name, uniqueness: :true, length: { minimum: 6 }

  pg_search_scope :search,
                  against: :name,
                  using: {
                     tsearch: {
                      prefix: true,
                       highlight: {
                        StartSel: '<span class="highlight">',
                        StopSel: "</span>",
                        HighlightAll: true
                      }

                    }

                  }

  before_validation :generate_slug

  # def create_and_join current_user, group_chat_params
  #   GroupChat.transaction do
  #     UserGroupChats.transaction do
  #       user_group_chats.create!(user: current_user)

  #       group_chat = GroupChat.build(group_chat_params) 
  #       group_chat.user = current_user
  #       group_chat.save!
  #     end
  #   end
  # end

  def as_json(options = {})
      super( {methods: [:avatar_image, :last_message] }.merge(options))
  end

  private
    def last_message
      messages.first
    end

    def generate_slug
     self.slug ||= name.parameterize if name
    end
    def avatar_image
      return image.url if image.attached?
      DEFAULT_IMAGE
    end 
     

end

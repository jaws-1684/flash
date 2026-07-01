class User < ApplicationRecord
  include PgSearch::Model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  before_validation :generate_slug
  before_create :set_gravatar
  after_create :create_self_chat

  validates :username, uniqueness: :true, length: { minimum: 4 }
  validates :slug, presence: true, uniqueness: true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :image, content_type: ['image/png', 'image/jpeg']

  has_many :user_providers, dependent: :destroy

 
  has_many :user_chats
  has_many :chats, through: :user_chats, source: :chat

  has_many :messages

  has_many :user_group_chats
  has_many :group_chats, through: :user_group_chats, source: :group_chat

  has_many :administered_group_chats, class_name: "GroupChat", foreign_key: "user_id"
  


  has_one_attached :image

  pg_search_scope :search,
                  against: :username,
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


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[github google]

  

  def as_json(options = {})
      super({ except: [ :avatar, :password, :password_confirmation, :slug ], methods: [:avatar_image] }.merge(options))
  end

  private
    def generate_slug
     self.slug ||= username.parameterize if username
    end
    def avatar_image
      return image.url if image.attached?
      self&.avatar ? avatar : "" 
    end

    def gravatar
      gravatar = AvatarProviders::Gravatar.new(email_address: self.email)
      gravatar.avatar_src
    end

    def set_gravatar
      if self.avatar.blank?
        self.avatar = gravatar
      end
    end
    def create_self_chat
      Chat.transaction {  Chat.create!(user_id: id, recipient_id: id) }
    end
end

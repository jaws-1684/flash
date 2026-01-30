class User < ApplicationRecord
  include PgSearch::Model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  before_create :create_slug, :set_gravatar
  before_update :create_slug

  multisearchable against: [:slug, :username]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[github google]

  has_many :user_providers, dependent: :destroy
 

  validates :username, :slug, uniqueness: :true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  def chats
    Chat.where(creator_id: self).or(Chat.where(recipient_id: self))
  end

  def chat_names
    get_recipient = lambda {|chat| chat.recipient == self ? chat.creator : chat.recipient }

    chats.map do |chat; recipient|
      recipient = get_recipient.call(chat)
      {
        chat_id: chat.id,
        chat_name: recipient.username,
        chat_avatar: recipient.avatar
      }
    end
  end
  
  private
    def create_slug
      self.slug = slug
    end

    def slug
      self.username.parameterize
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
end
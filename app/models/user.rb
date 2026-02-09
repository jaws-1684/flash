class User < ApplicationRecord
  include PgSearch::Model
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  before_create :create_slug, :set_gravatar
  before_update :create_slug

  pg_search_scope :search,
                  against: :username,
                  using: {
                     :tsearch => { 
                      :prefix => true,
                       highlight: {
                        StartSel: '<span class="highlight">',
                        StopSel: '</span>',
                        HighlightAll: true,
                      } 

                    }

                  }


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[github google]

  has_many :user_providers, dependent: :destroy
  has_many :chats, class_name: "Chat", foreign_key: "creator_id"
  has_many :messages
  validates :username, :slug, uniqueness: :true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  
  def conversations
    Chat.where(creator_id: self).or(Chat.where(recipient_id: self))
  end


  def chat_names
    get_recipient = lambda {|chat|  chat_recipient(chat)}
    chats = conversations.includes(:creator, :recipient)
    chats.map do |chat; recipient|
      recipient = get_recipient.call(chat)
      {
          id: chat.id,
          name: recipient.username,
          avatar: recipient.avatar
      }
    end
  end
  def chat_recipient chat
    chat.recipient == self ? chat.creator : chat.recipient
  end

  def find_chat(recipient_id)
    Chat.where(creator_id: self).where(recipient_id: recipient_id).first
  end

  def as_json(options={})
      super({ only: [:username, :id, :avatar, :pg_search_highlight] }.merge(options))
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
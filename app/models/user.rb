class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  before_create :create_slug
  before_update :create_slug, if: :username_changed?

  multisearchable against: [:slug, :username]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[github google]
  has_many :user_providers, dependent: :destroy
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :user_chats
  has_many :chats, class_name: "Chat", foreign_key: "creator_id", dependent: :destroy
  validates :username, :slug, uniqueness: :true

  def all_user_chats
    user_chats = UserChat.where(user_id: self).or(UserChat.where(friend_id: self))
  end
  
  def all_chats
    Chat.find(all_user_chats.map {|uc| uc.chat_id })
  end

  private
    def create_slug
      self.slug = slug
    end

    def slug
      self.username.parameterize
    end    
end
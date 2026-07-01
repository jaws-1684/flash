class Chat < ApplicationRecord
  attr_accessor :recipient_id
  cattr_accessor :Current

  after_create :create_bilateral_user_chats

  belongs_to :admin, class_name: "User", foreign_key: "user_id"

  has_many :messages, -> { order "created_at DESC" }, as: :messageable, dependent: :destroy

  has_many :user_chats, dependent: :destroy
  has_many :participants, through: :user_chats, source: :user

  def as_json(options = {})
      super({ only: [ :id ], methods: [ :last_message, :recipient ] }.merge(options))
  end

  def recipient
    participants.where.not(id: Chat.Current).first || admin
  end

  def last_message
    messages.first
  end
  
  private
    def create_bilateral_user_chats
      UserChat.transaction do
        unless (user_id == recipient_id)
          user_chats.create!(user_id: user_id, recipient_id: recipient_id)
          user_chats.create!(user_id: recipient_id, recipient_id: user_id)
        else
          user_chats.create!(user_id: user_id, recipient_id: recipient_id)  
        end
       
      end
    end
end

class Chat < ApplicationRecord
  belongs_to :creator, class_name: "User", foreign_key: "creator_id", optional: true
  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id", optional: true
  has_many :messages, as: :messageable, dependent: :destroy
  has_many_attached :images

  validates_uniqueness_of :creator_id, scope: [ :recipient_id ]
end

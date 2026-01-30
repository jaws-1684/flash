class Chat < ApplicationRecord
	belongs_to :creator, class_name: "User", foreign_key: "creator_id", optional: true
	belongs_to :recipient, class_name: "User", foreign_key: "recipient_id", optional: true
end

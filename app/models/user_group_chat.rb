class UserGroupChat < ApplicationRecord
  belongs_to :group_chat
  belongs_to :user
  validates_uniqueness_of :user_id
end

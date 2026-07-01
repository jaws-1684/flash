class AddUniqueIndexToUserGroupChats < ActiveRecord::Migration[8.1]
  def change
    add_index :user_group_chats, [:user_id, :group_chat_id], unique: true
  end
end

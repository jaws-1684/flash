class AddUniqueIndexToUserChat < ActiveRecord::Migration[8.1]
  def change
    add_index :user_chats, [:user_id, :chat_id], unique: true
  end
end

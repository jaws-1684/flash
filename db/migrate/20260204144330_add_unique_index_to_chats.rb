class AddUniqueIndexToChats < ActiveRecord::Migration[8.1]
  def change
    add_index :chats, [:creator_id, :recipient_id], unique: true
  end
end

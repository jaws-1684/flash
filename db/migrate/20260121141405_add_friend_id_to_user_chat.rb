class AddFriendIdToUserChat < ActiveRecord::Migration[8.1]
  def change
    add_column :user_chats, :friend_id, :string
  end
end

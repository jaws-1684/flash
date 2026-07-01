class AddRecipientIdToUserChats < ActiveRecord::Migration[8.1]
  def change
    add_column :user_chats, :recipient_id, :string
  end
end

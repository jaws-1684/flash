class AddRecipientIdToChat < ActiveRecord::Migration[8.1]
  def change
    add_column :chats, :recipient_id, :string
  end
end

class RemoveChatIdFromMessages < ActiveRecord::Migration[8.1]
  def change
    remove_column :messages, :chat_id, :string
  end
end

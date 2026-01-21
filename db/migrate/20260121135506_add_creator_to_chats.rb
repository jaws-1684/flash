class AddCreatorToChats < ActiveRecord::Migration[8.1]
  def change
    add_column :chats, :creator_id, :string
  end
end

class CreateUserGroupChats < ActiveRecord::Migration[8.1]
  def change
    create_table :user_group_chats do |t|
      t.references :group_chat, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

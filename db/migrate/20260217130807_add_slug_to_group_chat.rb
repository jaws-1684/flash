class AddSlugToGroupChat < ActiveRecord::Migration[8.1]
  def change
    add_column :group_chats, :slug, :string
  end
end

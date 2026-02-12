class AddImageKeysToMessage < ActiveRecord::Migration[8.1]
  def change
    add_column :messages, :image_keys, :string
  end
end

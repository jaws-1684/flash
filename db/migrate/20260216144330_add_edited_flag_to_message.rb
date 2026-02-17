class AddEditedFlagToMessage < ActiveRecord::Migration[8.1]
  def change
    add_column :messages, :edited, :boolean
  end
end

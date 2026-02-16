class AddSoftDeleteFlagToMessage < ActiveRecord::Migration[8.1]
  def change
    add_column :messages, :soft_deleted, :boolean
  end
end

class AddPolymorphicAssociacionsToMessages < ActiveRecord::Migration[8.1]
  def change
    add_reference :messages, :messageable, polymorphic: true
  end
end

class AddUidAndProviderToUserProviders < ActiveRecord::Migration[8.1]
  def change
    add_column :user_providers, :provider, :string
    add_column :user_providers, :uid, :string
  end
end

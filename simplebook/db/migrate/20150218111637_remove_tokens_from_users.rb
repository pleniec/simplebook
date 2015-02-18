class RemoveTokensFromUsers < ActiveRecord::Migration
  def change
  	remove_column :users, :token
  	remove_column :users, :authentication_token
  end
end

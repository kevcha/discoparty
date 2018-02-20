class RemoveNullConstraintToUserFromPlaylists < ActiveRecord::Migration[5.0]
  def change
    change_column :playlists, :user_id, :integer, null: true
  end
end

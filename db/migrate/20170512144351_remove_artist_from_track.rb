class RemoveArtistFromTrack < ActiveRecord::Migration[5.0]
  def change
    remove_column :tracks, :artist
  end
end

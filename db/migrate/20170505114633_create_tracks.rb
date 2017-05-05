class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.string :provider, null: false
      t.string :provider_track_id, null: false
      t.belongs_to :playlist, foreign_key: true, null: false
      t.string :image_url
      t.integer :duration

      t.timestamps
    end
  end
end

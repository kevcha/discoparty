class CreateUpvotes < ActiveRecord::Migration[5.0]
  def change
    create_table :upvotes do |t|
      t.belongs_to :track, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end

class Track < ApplicationRecord
  belongs_to :playlist
  has_many :upvotes, dependent: :destroy

  validates :title, presence: true
  validates :provider, presence: true
  validates :provider_track_id, presence: true
  validates :playlist, presence: true
end

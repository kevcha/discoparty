class Playlist < ApplicationRecord
  has_many :tracks, dependent: :destroy
  belongs_to :user, optional: true

  validates :name, presence: true
end

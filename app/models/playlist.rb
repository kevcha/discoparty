class Playlist < ApplicationRecord
  has_many :tracks, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
  validates :user, presence: true
end

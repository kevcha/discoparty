class Playlist < ApplicationRecord
  has_many :tracks, -> { left_joins(:upvotes).group(:id).order('count(upvotes.id) desc') }, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
  validates :user, presence: true
end

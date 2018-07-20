class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :playlists, dependent: :destroy
  has_many :upvotes, dependent: :destroy

  validates :username, presence: true
end

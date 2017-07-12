class Upvote
  belongs_to :track
  belongs_to :user

  validates :track, presence: true
  validates :user, presence: true
end

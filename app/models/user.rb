class User < ApplicationRecord
  has_many :playlists

  validates :uuid, presence: true

  before_validation :set_uuid

  private

  def set_uuid
    self.uuid = SecureRandom.uuid if uuid.blank?
  end
end

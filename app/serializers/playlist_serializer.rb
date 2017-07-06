class PlaylistSerializer < ActiveModel::Serializer
  attributes :name

  has_many :tracks
end

class TrackSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :image_url,
    :provider,
    :provider_track_id,
    :duration
  )
end

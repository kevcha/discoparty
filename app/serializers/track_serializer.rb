class TrackSerializer < ActiveModel::Serializer
  attributes(
    :title,
    :image_url,
    :provider,
    :provider_track_id,
    :duration
  )
end

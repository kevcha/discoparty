class TrackSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :image_url,
    :provider,
    :provider_track_id,
    :duration,
    :upvotes,
    :upvoted,
    :url,
    :played,
    :playing
  )

  def upvotes
    object.upvotes.count
  end

  def upvoted
    object.upvotes.map(&:user_id)
  end

  def url
    "https://www.youtube.com/watch?v=#{object.provider_track_id}"
  end

  def played
    false
  end

  def playing
    false
  end
end

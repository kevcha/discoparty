class TrackSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :image_url,
    :provider,
    :provider_track_id,
    :duration,
    :upvotes,
    :upvoted
  )

  def upvotes
    object.upvotes.count
  end

  def upvoted
    scope.upvotes.map(&:track).include?(object)
  end
end

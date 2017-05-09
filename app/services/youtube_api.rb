class YoutubeApi
  API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search'

  def self.search(query)
      json_response_for(query).map do |track|
      {
        title: track['snippet']['title'],
        provider: 'youtube',
        provider_track_id: track['id']['videoId'],
        duration: nil,
        artist: track['channelTitle'],
        image_url: track['snippet']['thumbnails']['default']['url']
      }
    end
  end

  private

  def self.json_response_for(query)
    json_response = JSON.parse(RestClient.get("#{API_ENDPOINT}?q=#{query}&type=video&videoEmbedabble=true&part=id,snippet&key=#{ENV.fetch('YOUTUBE_API_KEY')}"))
    json_response['items']
  end
end

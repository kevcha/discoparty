class Api::V1::TracksController < ApplicationController
  before_action :set_playlist

  def index
    render json: @playlist.tracks
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      render json: @track, status: :created
    else
      binding.pry
      head :bad_request
    end
  end

  def update
    @track = @playlist.tracks.find(params[:id])

    if @track.update(track_params)
      render json: @track, status: :no_content
    else
      head :bad_request
    end
  end

  def destroy
    @track = @playlist.tracks.find(params[:id])

    if @track.destroy
      render json: @track, status: :no_content
    else
      head :bad_request
    end
  end

  private

  def track_params
    params
      .require(:track)
      .permit(
        :title,
        :provider,
        :provider_track_id,
        :image_url,
        :duration
      ).merge(playlist: @playlist)
  end

  def set_playlist
    @playlist = Playlist.find(params[:playlist_id])
  end
end

class Api::V1::TracksController < ApplicationController
  before_action :set_playlist
  before_action :set_track, only: [:upvote, :downvote]
  skip_before_action :verify_authenticity_token, only: :create

  def index
    render json: @playlist.tracks
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      PlaylistChannel.broadcast_to(@playlist, {
        playlist: PlaylistSerializer.new(@playlist).as_json
      })
      render json: @track, status: :created
    else
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

  def upvote
    current_user.upvotes.create({ track: @track })
    head :created
  end

  def downvote
    current_user.upvotes.where(track: @track).destroy
    head :no_content
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

  def set_track
    @track = Track.find(params[:id])
  end

  def set_playlist
    @playlist = Playlist.find(params[:playlist_id])
  end
end

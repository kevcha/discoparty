class Api::V1::TracksController < ApplicationController
  before_action :set_playlist, except: [:upvote, :downvote]
  before_action :set_track, only: [:upvote, :downvote]
  skip_before_action :authenticate_user!, only: [:index, :create]
  skip_before_action :verify_authenticity_token, only: [:create, :downvote, :upvote]

  def index
    render json: @playlist.tracks
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      broadcast
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
    @playlist = @track.playlist
    broadcast
    head :created
  end

  def downvote
    current_user.upvotes.find_by(track: @track).destroy
    @playlist = @track.playlist
    broadcast
    head :no_content
  end

  private

  def broadcast
    PlaylistChannel.broadcast_to(@playlist, {
      playlist: PlaylistSerializer.new(@playlist).as_json
    });
  end

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

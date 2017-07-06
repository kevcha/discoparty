class Api::V1::PlaylistsController < ApplicationController
  def show
    @playlist = Playlist.find(params[:id])
    render json: @playlist
  end
end

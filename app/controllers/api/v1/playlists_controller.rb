class Api::V1::PlaylistsController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: :state
  skip_before_filter :authenticate_user!, only: :show
  before_action :set_playlist, only: [:show, :state]

  def show
    render json: @playlist
  end

  def state
    StateChannel.broadcast_to(@playlist, {
      state: params[:state]
    });
    head :ok
  end

  private

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end
end

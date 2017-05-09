class PlaylistsController < ApplicationController
  before_action :set_user, only: :new

  def new
    @playlist = current_user.playlists.build
  end

  def create
    @playlist = Playlist.new(playlist_params)

    if @playlist.save
      redirect_to @playlist
    else
      render :new
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
  end

  private

  def playlist_params
    params
      .require(:playlist)
      .permit(:name)
      .merge(user: current_user)
  end

  def set_user
    if cookies[:auth_token].blank?
      user = User.create
      cookies.permanent[:auth_token] = user.uuid
    end
  end
end

class PlaylistsController < ApplicationController
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
end

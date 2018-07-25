class PlaylistsController < ApplicationController
  skip_before_action :authenticate_user!, only: :join

  def index
    @playlists = current_user.playlists
    @playlist = Playlist.new
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
    redirect_to root_path if current_user != @playlist.user
  end

  def join
    if params[:query]
      playlist = Playlist.find_by('name ILIKE ?', "#{params[:query]}")
      redirect_to party_path(playlist) if playlist
    end
  end

  private

  def playlist_params
    params
      .require(:playlist)
      .permit(:name)
      .merge(user_id: current_user.id)
  end
end

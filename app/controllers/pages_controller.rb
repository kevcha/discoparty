class PagesController < ApplicationController
  def home
    # redirect_to playlists_path if current_user
    @playlist = Playlist.new
  end
end

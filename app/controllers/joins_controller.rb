class JoinsController < ApplicationController
  skip_before_action :authenticate_user!, only: :index

  def index
    if params[:query]
      @playlists = Playlist.where('name ILIKE ?', "#{params[:query]}")
    end
  end
end

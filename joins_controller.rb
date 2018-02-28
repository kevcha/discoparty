class JoinsController < ApplicationController
  before_action :set_playlist

  def index
    if params[:query]
      @playlist = Playlist.find_by('name ILIKE ?', "#{params[:query]}")
    end
  end
end

class PartiesController < ApplicationController
  def show
    @playlist = Playlist.find(params[:id])
  end
end

class PartiesController < ApplicationController
  skip_before_action :authenticate_user!, only: :show

  def show
    @playlist = Playlist.find(params[:id])
  end
end

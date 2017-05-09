class Api::V1::SearchesController < ApplicationController
  def show
    if params[:query]
      render json: YoutubeApi.search(params[:query])
    else
      render json: []
    end
  end
end

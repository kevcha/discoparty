class Api::V1::SearchesController < ApplicationController
  skip_before_filter :authenticate_user!, only: :show

  def show
    if params[:query]
      render json: YoutubeApi.search(params[:query])
    else
      render json: []
    end
  end
end

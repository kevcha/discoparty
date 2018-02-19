class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    super || Guest.new
  end
end

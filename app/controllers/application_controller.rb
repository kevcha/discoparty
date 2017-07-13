class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    @user ||= User.find_by_uuid(cookies[:auth_token])
  end
  helper_method :current_user
end

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_user

  def current_user
    @user ||= User.find_by_uuid(cookies[:auth_token])
  end
  helper_method :current_user

  private

  def set_user
    if cookies[:auth_token].blank?
      user = User.create
      cookies.permanent[:auth_token] = user.uuid
    end
  end
end

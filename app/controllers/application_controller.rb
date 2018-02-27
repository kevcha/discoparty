class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :layout_by_resource

  def current_user
    super || Guest.new
  end

  def layout_by_resource
    if devise_controller? || params[:controller] == 'pages'
      'home'
    else
      'application'
    end
  end
end

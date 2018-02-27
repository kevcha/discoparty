module ApplicationHelper
  def user_signed_in?
    current_user.is_a?(User)
  end
end

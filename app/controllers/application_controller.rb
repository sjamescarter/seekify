class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::Serialization
  before_action :authorize

  def authorize
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    else
      render json: { error: "Please Sign In"}, status: :unauthorized
    end
  end
end

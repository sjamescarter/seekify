class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    render json: User.all
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, serializer: MeSerializer, status: :created
  end

  def show
    render json: @current_user, serializer: MeSerializer
  end

  def destroy
    @current_user.destroy
    head :no_content
  end

  private
  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end

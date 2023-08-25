class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def index
    musicians = User.all.filter { |m| m.id != @current_user.id }
    render json: musicians, each_serializer: MusicianSerializer
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, include: user_data, status: :created
  end

  def show
    render json: @current_user, include: user_data
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

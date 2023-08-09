class ProfilesController < ApplicationController
  def index
    render json: Profile.all
  end

  def create
    profile = @current_user.build_profile(profile_params) if @current_user.profile.nil?
    profile.avatar.attach(profile_params[:avatar]) unless profile_params[:avatar].nil?
    venue = Venue.find(profile_params[:venue_id])
    venue.profiles << profile
    profile.save!
    render json: @current_user, status: :created
  end

  def update
    profile = @current_user.profile
    profile.update!(profile_params)
    profile.avatar.attach(profile_params[:avatar]) unless profile_params[:avatar].nil?
    render json: profile, status: :accepted
  end

  private
  def profile_params
    params.permit(:avatar, :first_name, :last_name, :bio, :phone, :city, :state, :venue_id, :video_url)
  end
end

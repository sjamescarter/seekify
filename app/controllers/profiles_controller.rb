class ProfilesController < ApplicationController
  def index
    render json: Profile.all
  end

  def create
    profile = @current_user.create_profile(profile_params)
    venue = Venue.find(profile_params[:venue_id])
    venue.profiles << profile
    if profile_params[:avatar]
      profile.avatar.attach(profile_params[:avatar]) 
    end
    if profile.valid?
      render json: profile, status: :created
    else
      render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    profile = @current_user.profile
    profile.update!(profile_params)
    if profile_params[:avatar]
      profile.avatar.attach(profile_params[:avatar])
    end
    render json: profile, status: :accepted
  end

  private
  def profile_params
    params.permit(:avatar, :first_name, :last_name, :bio, :phone, :city, :state, :venue_id, :video_url)
  end
end

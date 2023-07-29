class ProfilesController < ApplicationController
  def index
    render json: Profile.all
  end

  def create
    profile = Profile.create(profile_params)
    profile.user_id = @current_user.id
    profile.attach.avatar if params[:avatar]
    if params[:venue_id]
      venue = Venue.find(params[:venue_id])
      venue.profiles << profile
    end
    if profile.valid?
      render json: profile, status: :created
    else
      render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def profile_params
    params.permit(:first_name, :last_name, :bio, :phone, :city, :state, :video_url)
  end
end

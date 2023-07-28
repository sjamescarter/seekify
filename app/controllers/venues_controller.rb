class VenuesController < ApplicationController
  def create
    venue = Venue.create(venue_params)
    if venue.valid?
      if venue_params[:logo]
        venue.logo.attach(params[:logo])
      end
      render json: venue, status: :created
    else
      render json: { errors: venue.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: Venue.find(params[:id])
  end

  private
  def venue_params
    params.permit(:name, :street_address, :city, :state, :logo)
  end
end

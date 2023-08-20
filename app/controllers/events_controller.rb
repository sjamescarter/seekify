class EventsController < ApplicationController
  def index
    render json: Event.where("public = true")
  end

  def create
    event = @current_user.events.create!(event_params)
    event.image.attach(event_params[:image]) unless event_params[:image].nil?
    venue = Venue.find(event_params[:venue_id])
    venue.events << event
    render json: @current_user, status: :created
  end

  private
  def event_params
    params.permit(:name, :date, :rehearsal, :image, :description, :public, :venue_id)
  end
end

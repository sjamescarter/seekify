class EventsController < ApplicationController
  def index
    render json: Event.all
  end

  def create
    event = @current_user.events.build(event_params)
    event.image.attach(:image) unless event_params[:image].nil?
    venue = Venue.find(event_params[:venue_id])
    venue.events << event
    venue.save!
    render json: event, status: :created
  end

  private
  def event_params
    params.permit(:name, :date, :rehearsal, :image, :description, :public, :venue_id)
  end
end

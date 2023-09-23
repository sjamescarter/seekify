class EventsController < ApplicationController
  def index
    render json: Event.all.sort_by(&:date)
  end

  def create
    event = @current_user.events.create!(event_params)
    event.image.attach(event_params[:image]) unless event_params[:image].nil?
    venue = Venue.find(event_params[:venue_id])
    venue.events << event
    render json: event, status: :created
  end

  def update
    event = find_event
    event.update!(event_params)
    event.image.attach(event_params[:image]) unless event_params[:image].nil?
    render json: event, include: ['roles', 'roles.user_instrument', 'venue'], status: :accepted
  end

  def destroy
    event = find_event
    event.destroy
    head :no_content
  end

  private
  def event_params
    params.permit(:name, :date, :rehearsal, :image, :description, :public, :venue_id)
  end

  def find_event
    @current_user.events.find(params[:id])
  end
end

class InstrumentsController < ApplicationController
  def index
    render json: Instrument.all
  end

  def create
    instrument = Instrument.create!(name: params[:name].strip.titlecase)
    render json: instrument, status: :created
  end
end

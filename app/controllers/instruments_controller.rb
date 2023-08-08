class InstrumentsController < ApplicationController
  def index
    render json: Instrument.all
  end
end

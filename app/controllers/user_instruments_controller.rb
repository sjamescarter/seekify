class UserInstrumentsController < ApplicationController
  def index
    render json: UserInstrument.all
  end

  def create
    user_instrument = @current_user.user_instruments.build(user_instrument_params)
    instrument = Instrument.find(params[:instrument_id])
    instrument.user_instruments << user_instrument
    user_instrument.save!
    render json: @current_user, status: :created
  end

  private
  def user_instrument_params
    params.permit(:instrument_id, :skill, :experience)
  end
end

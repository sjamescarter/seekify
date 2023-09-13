class UserInstrumentsController < ApplicationController
  def index
    render json: UserInstrument.all
  end

  def create
    user_instrument = @current_user.user_instruments.build(user_instrument_params)
    instrument = Instrument.find(params[:instrument_id])
    instrument.user_instruments << user_instrument
    user_instrument.save!
    render json: user_instrument, status: :created
  end

  def destroy
    instrument = @current_user.user_instruments.find(params[:id])
    instrument.destroy
    head :no_content
  end
  
  private
  def user_instrument_params
    params.permit(:instrument_id, :skill, :experience)
  end
end

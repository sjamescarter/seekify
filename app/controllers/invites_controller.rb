class InvitesController < ApplicationController
  def create
    event = @current_user.events.find(params[:event_id])
    invite = event.invites.create!(invite_params)
    musician = UserInstrument.find(params[:user_instrument_id])
    musician.invites << invite
    render json: invite, status: :created
  end

  def update
    invite = @current_user.invites.find(params[:id])
    invite.update!(params.permit(:status))
    render json: invite, status: :accepted
  end

  def destroy
    event = @current_user.events.find(params[:event_id])
    invite = event.invites.find(params[:id].to_i) 
    invite.destroy
    head :no_content
  end

  private
  def invite_params
    params.permit(:message, :pay, :status, :user_instrument_id)
  end
end

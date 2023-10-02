class InviteSerializer < ActiveModel::Serializer
  attributes :id, :message, :pay, :status, :venue, :host, :role, :date
  belongs_to :user_instrument
  belongs_to :event
  
  def date
    object.event.date
  end

  def host
    host = object.event.host.profile
    "#{host.first_name} #{host.last_name}"
  end

  def role
    object.user_instrument.instrument.name
  end

  def venue
    object.event.venue.name
  end
end

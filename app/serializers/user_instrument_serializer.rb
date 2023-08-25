class UserInstrumentSerializer < ActiveModel::Serializer
  attributes :id, :name, :instrument, :skill, :experience
  has_one :user
  has_one :instrument
  has_many :invites
  
  def name
    "#{object.user.profile.first_name} #{object.user.profile.last_name}"
  end

  def instrument
    object.instrument.name
  end
end

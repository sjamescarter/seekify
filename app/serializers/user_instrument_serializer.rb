class UserInstrumentSerializer < ActiveModel::Serializer
  attributes :id, :name, :skill, :experience
  has_one :user
  has_one :instrument

  def name
    object.instrument.name
  end
end

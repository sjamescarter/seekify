class UserInstrumentSerializer < ActiveModel::Serializer
  attributes :id, :skill, :experience
  has_one :user
  has_one :instrument
end

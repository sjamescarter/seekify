class InstrumentSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :musicians
end

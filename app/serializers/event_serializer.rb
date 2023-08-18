class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :rehearsal, :public, :description
  has_one :host
  has_one :venue
end

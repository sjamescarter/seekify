class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :street_address, :city, :state, :logo
end

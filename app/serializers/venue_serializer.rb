class VenueSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :street, :city, :state, :logo

  def logo
    return unless object.logo.attached?

    object.logo.blob.attributes
      .slice('filename')
      .merge(url: url_for(object.logo))
      .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end

  def street
    object.street_address
  end
end

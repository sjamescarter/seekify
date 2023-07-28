class VenueSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :street_address, :city, :state, :logo

  def logo
    return unless object.logo.attached?

    object.logo.blob.attributes
      .slice('filename')
      .merge(url: url_for(object.logo))
      .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end
  
end

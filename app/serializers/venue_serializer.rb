class VenueSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :street_address, :city, :state, :logo

  def logo
    return unless object.logo.attached?

    object.logo.blob.attributes
      .slice('filename', 'byte_size')
      .merge(url: logo_url)
      .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end

  def logo_url
    url_for(object.logo)
  end
end

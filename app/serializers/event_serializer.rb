class EventSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :date, :time, :rehearsal, :public, :description, :image, :location
  has_one :host
  has_one :venue

  def location
    object.venue.name.upcase
  end

  def image
    url_for(object.image) if object.image.attached?
  end

  def time
    object.date.to_fs(:small)
  end

end

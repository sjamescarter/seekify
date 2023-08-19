class EventSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :date, :rehearsal, :public, :description, :image
  has_one :host
  has_one :venue

  def image
    url_for(object.image) if object.image.attached?
  end
end

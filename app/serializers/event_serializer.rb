class EventSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :date, :time, :rehearsal, :rehearsal_time, :public, :description, :image, :location
  has_many :roles
  belongs_to :venue

  def date
    object.date.to_fs(:fe)
  end

  def image
    url_for(object.image) if object.image.attached?
  end

  def location
    object.venue.name.upcase
  end

  def rehearsal
    object.rehearsal.to_fs(:fe) unless object.rehearsal.nil?
  end
  
  def rehearsal_time
    object.rehearsal.to_fs(:small) unless object.rehearsal.nil?
  end

  def time
    object.date.to_fs(:small)
  end
end

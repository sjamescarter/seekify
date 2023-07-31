class ProfileSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :avatar, :name, :phone, :city, :state, :bio, :video_url
  has_one :user
  has_one :venue

  def avatar
    url_for(object.avatar) if object.avatar.attached?
  end

  def name 
    "#{object.first_name} #{object.last_name}"
  end
end

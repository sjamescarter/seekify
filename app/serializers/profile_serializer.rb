class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :first_name, :last_name, :phone, :city, :state, :bio, :video_url
  has_one :user
  has_one :venue

  def avatar
    url_for(object.avatar) if object.avatar.attached?
  end
end

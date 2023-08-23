class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name
  has_many :user_instruments
  has_many :invites, through: :user_instruments
  has_many :events
  has_one :profile
  has_one :church

  def name
    return if object.profile.nil?
    "#{object.profile.first_name} #{object.profile.last_name}"
  end
end

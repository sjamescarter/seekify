class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_one :profile
  has_one :church
end

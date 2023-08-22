class InviteSerializer < ActiveModel::Serializer
  attributes :id, :message, :pay, :status
  has_one :user_instrument
  has_one :event
end

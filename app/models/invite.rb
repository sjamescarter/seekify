class Invite < ApplicationRecord
  belongs_to :user_instrument
  belongs_to :event
end

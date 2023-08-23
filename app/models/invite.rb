class Invite < ApplicationRecord
  belongs_to :user_instrument
  belongs_to :event

  validates :message, presence: true
  validates :pay, numericality: { only_integer: true }, allow_nil: true
  validates :status, inclusion: { in: %w(accepted pending declined) }
end

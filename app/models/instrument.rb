class Instrument < ApplicationRecord
  has_many :user_instruments, dependent: :destroy
  has_many :users, through: :user_instruments

  validates :name, 
    presence: true, 
    format: { without: /[0-9]/ }, 
    uniqueness: true
end

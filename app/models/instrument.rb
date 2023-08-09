class Instrument < ApplicationRecord
  validates :name, 
    presence: true, 
    format: { without: /[0-9]/ }, 
    uniqueness: true
end

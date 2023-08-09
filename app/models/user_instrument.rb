class UserInstrument < ApplicationRecord
  belongs_to :user
  belongs_to :instrument

  validates :skill, 
    presence: true, 
    inclusion: { in: %w(beginner intermediate advanced professional)}
  validates :experience, 
    presence: true, 
    numericality: { only_integer: true, in: 0..95 }
end

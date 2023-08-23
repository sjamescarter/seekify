class UserInstrument < ApplicationRecord
  belongs_to :user
  belongs_to :instrument
  has_many :invites
  has_many :events, through: :invites

  validates :skill, 
    presence: true, 
    inclusion: { in: %w(beginner intermediate advanced professional)}
  validates :experience, 
    presence: true, 
    inclusion: { in: %w(<1 1–4 5–9 10–20 >20)}
end

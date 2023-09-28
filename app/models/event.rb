class Event < ApplicationRecord
  belongs_to :user
  belongs_to :venue
  has_one_attached :image, dependent: :destroy
  has_many :invites, dependent: :destroy
  alias :roles :invites
  alias :host :user
  
  validates :name, presence: true
  validates :date, 
    comparison: { 
      greater_than: Time.now, 
      message: ": Please select a future date" 
    }
  validates :rehearsal, 
    comparison: { 
      less_than: :date, 
      message: "must be scheduled before the event" 
    }, 
    allow_nil: true
end

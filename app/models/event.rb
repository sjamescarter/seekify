class Event < ApplicationRecord
  belongs_to :user
  belongs_to :venue
  has_one_attached :image
  alias :host :user
  

end

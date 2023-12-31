class Venue < ApplicationRecord
  has_one_attached :logo
  has_many :profiles
  has_many :events

  validates :name, :street_address, :city, presence: true
  validates :state, inclusion: { in: %w(AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY)}
  validates :logo, content_type: ['image/gif', 'image/jpg', 'image/jpeg', 'image/png']
end

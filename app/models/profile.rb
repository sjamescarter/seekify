class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :venue
  has_one_attached :avatar

  validates :avatar, content_type: ['image/gif', 'image/jpg', 'image/jpeg', 'image/png']
  validates :first_name, :last_name, :city, presence: true, format: { without: /[0-9]/ }
  validates :bio, length: { maximum: 1000 }
  validates :phone, length: { is: 10 }, format: { with: /[0-9]/}, allow_blank: true
  validates :state, inclusion: { in: %w(AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY)}
  validates :video_url, url: { allow_blank: true}
end

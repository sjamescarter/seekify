class User < ApplicationRecord
  has_secure_password
  has_one :profile, dependent: :destroy

  validates :email, 
    format: { with: /\A[A-Za-z0-9+_.-]+@([A-Za-z0-9]+\.)+[A-Za-z]{2,6}\z/}, 
    uniqueness: { case_sensitive: false }, 
    length: { minimum: 4, maximum: 254 }, 
    presence: true
  validates :password, length: { minimum: 8 }
  validates :password_confirmation, presence: true

end

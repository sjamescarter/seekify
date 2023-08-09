class User < ApplicationRecord
  has_secure_password
  has_many :user_instruments, dependent: :destroy
  has_many :instruments, through: :user_instruments
  has_one :profile, dependent: :destroy
  has_one :venue, through: :profile 
  alias :church :venue

  validates :email, 
    format: { with: /\A[A-Za-z0-9+_.-]+@([A-Za-z0-9]+\.)+[A-Za-z]{2,6}\z/}, 
    uniqueness: { case_sensitive: false }, 
    length: { minimum: 4, maximum: 254 }, 
    presence: true
  validates :password, length: { minimum: 8 }
  validates :password_confirmation, presence: true

end

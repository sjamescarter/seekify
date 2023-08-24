class MeSerializer < UserSerializer
  has_many :events
  has_many :invites, through: :user_instruments
end

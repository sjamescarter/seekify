class MusicianSerializer < UserSerializer
  has_many :events do
    object.events.filter { |event| event.public == true }
  end
end

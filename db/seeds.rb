puts 'Seeding 🌱'

# User seed data
# User.create(email: "bill@example.com", password: "12345678", password_confirmation: "12345678")
# User.create(email: "don@example.com", password: "12345678", password_confirmation: "12345678")
# User.create(email: "sarah@example.com", password: "12345678", password_confirmation: "12345678")
# User.create(email: "phil@example.com", password: "12345678", password_confirmation: "12345678")
# User.create(email: "judy@example.com", password: "12345678", password_confirmation: "12345678")

# Venue.create(name: "First Baptist Church", street_address: "123 Crawford St.", city: "Bergma", state: "IL")
# Venue.create(name: "Christ Church", street_address: "2020 Lindsey Ln.", city: "Arlington", state: "IL")
# Venue.create(name: "Community Church", street_address: "426 Parker Ave.", city: "Rockford", state: "IL")
# Venue.create(name: "Believers Fellowship", street_address: "4023 Industrial Way", city: "Caseville", state: "IL")

# Instruments
# Instrument.create(name: 'Piano')
# Instrument.create(name: 'Synth')
# Instrument.create(name: 'Acoustic Guitar')
# Instrument.create(name: 'Electric Guitar')
# Instrument.create(name: 'Bass')
# Instrument.create(name: 'Drums')
# Instrument.create(name: 'Djembe')
# Instrument.create(name: 'Cajon')
# Instrument.create(name: 'Congas')
# Instrument.create(name: 'Violin')
# Instrument.create(name: 'Viola')
# Instrument.create(name: 'Cello')
# Instrument.create(name: 'String Bass')
# Instrument.create(name: 'Vocals')
# Instrument.create(name: 'Trumpet')
# Instrument.create(name: 'Trombone')
# Instrument.create(name: 'Tuba')
# Instrument.create(name: 'Clarinet')
# Instrument.create(name: 'Saxophone')
# Instrument.create(name: 'Flute')
# Instrument.create(name: 'Oboe')

# Profile.create(user_id: 1, first_name: "Bill", last_name: "Meyer", bio: "I am a multi-instrumentalist, and I'm looking to connect.", phone: "888-888-8888", city: "Bergma", state: "IL", venue_id: 1, video_url: "https://www.youtube.com")
# Profile.create(user_id: 2, first_name: "Don", last_name: "Jones", bio: "I am a worship leader at Christ Church. I am always looking for more musicians.", phone: "888-888-8889", city: "Arlington", state: "IL", venue_id: 2, video_url: "https://www.youtube.com")
# Profile.create(user_id: 3, first_name: "Sarah", last_name: "Axelson", bio: "I love to sing. When can we get together?", phone: "888-888-8898", city: "Rockford", state: "IL", venue_id: 3, video_url: "https://www.youtube.com")
# Profile.create(user_id: 4, first_name: "Phil", last_name: "Baker", bio: "I have limited availability but love to use my gift.", phone: "888-888-8988", city: "Caseville", state: "IL", venue_id: 4, video_url: "https://www.youtube.com")
# Profile.create(user_id: 5, first_name: "Judy", last_name: "Trudy", bio: "I love to serve in worship ministry.", phone: "888-888-9888", city: "Bergma", state: "IL", venue_id: 1, video_url: "https://www.youtube.com")

# UserInstrument.create(user_id: 1, instrument_id: 1, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 1, instrument_id: 2, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 1, instrument_id: 3, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 1, instrument_id: 4, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 2, instrument_id: 1, skill: "professional", experience: "10–20")
# UserInstrument.create(user_id: 2, instrument_id: 3, skill: "professional", experience: "10–20")
# UserInstrument.create(user_id: 2, instrument_id: 14, skill: "professional", experience: "10–20")
# UserInstrument.create(user_id: 3, instrument_id: 14, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 4, instrument_id: 10, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 4, instrument_id: 11, skill: "advanced", experience: "10–20")
# UserInstrument.create(user_id: 4, instrument_id: 12, skill: "intermediate", experience: "5–9")
# UserInstrument.create(user_id: 5, instrument_id: 5, skill: "advanced", experience: "10–20")

# Event.create(user_id: 1, name: "Worship Gathering", date: "3 Oct 2023 07:00 PM", rehearsal: "3 Oct 2023 05:00 PM", description: "Join us for a city-wide worship celebration!", public: true, venue_id: 1)
# Event.create(user_id: 2, name: "Worship Night", date: "6 Oct 2023 07:00 PM", description: "This is an informal worship night—living room style. Hope you can join us!", public: true, venue_id: 2)
# Event.create(user_id: 3, name: "Sunday Service", date: "8 Oct 2023 10:00 AM", rehearsal: "8 Oct 2023 08:30 AM", description: "I am in need of some musicians to accompany me.", public: false, venue_id: 3)
puts 'Done ✅'
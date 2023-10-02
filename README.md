# Seekify.io

This project is a social network app for worship leaders, musicians and technicians to connect through events. Users can create events and invite other users to participate in various roles. The frontend of this project uses ReactJS v18.2.0 and is found in the client folder. The backend is a Rails v7.0.5 API built in Ruby v2.7.4. 

## Setup
To get set up, run:
```
$ bundle install
$ npm install --prefix client
$ rails s
$ npm start --prefix client
```

## Database
This project uses PostgreSQL v9.3. It has a many-to-many relationship of Events and UserInstruments through a joins table of Invites. The schema is as follows:

### events
```
id                  integer
name                string
date                datetime
rehearsal           datetime
public              boolean
description         text
user_id             integer
venue_id            integer
created_at          timestamp
updated_at          timestamp
```

### instruments
```
id                  integer
name                string
created_at          timestamp
updated_at          timestamp
```

### invites
```
id                  integer
message             text
pay                 integer
status              string
user_instrument_id  integer
event_id            integer
created_at          timestamp
updated_at          timestamp
```

### profile
```
id              integer
first_name      string
last_name       string
phone           string
city            string
state           string
bio             text
video_url       string
user_id         integer
venue_id        integer
created_at      timestamp
updated_at      timestamp
```

### user_instruments
```
id              integer
skill           string
experience      string
user_id"        integer
instrument_id   integer
created_at      timestamp
updated_at      timestamp
```

### users
```
id              integer
email           string
password_digest string
created_at      timestamp
updated_at      timestamp
```

### venues
```
id              integer
name            string
street_address  string
city            string
state           string
created_at      timestamp
updated_at      timestamp
```

### Active Storage
Additionally, the schema includes active storage tables for storing and associating images with Events, Profiles and Venues.

## Seed Data
Seed data is commented out in the db/seeds.rb file. To use this data, uncomment the appropriate lines and run:
```
$ rails db:migrate db:seed
```

## Video
Find a video walk-through of this project here:
https://watch.screencastify.com/v/STRObuZNejvSuLsdhPdq
import { useState } from 'react';
import styled from 'styled-components';
import { abc, addS, chron } from '../components/utilities';
import EventCard from '../components/EventCard';

function Profile({ user }) {
    const { profile, church, user_instruments, events } = user
    const currentEvents = events.filter(event => {
        const today = Date.now()
        const date = new Date(event.date)
        return date > today
    })

    // State
    const [editProfile, setEditProfile] = useState(false);

    return(
        <ProfileGrid>
            { <Avatar src={profile.avatar ? profile.avatar : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L-PLw9YL0s6ErCIcuprlKgAAAA%26pid%3DApi&f=1&ipt=98bca178f7faad18a400337a2735e92959f258e43128e375907f1e6d80f5b423&ipo=images" } alt="Avatar" loading="lazy" /> }
            <div></div>
            <Name>{user.name}</Name>
            <Location>🏠 {profile.city}, {profile.state} | ⛪️ {church.name}</Location>
            <div></div>
            <Button>{editProfile ? "Save Profile" : "Edit Profile"}</Button>
            <h6>My Connections</h6>
            <Div>
                <h3>✍️ Bio</h3>
                <p>{profile.bio}</p>
            </Div>
            <Div>
                <h3>🎸 Instruments</h3>
                {abc(user_instruments).map(instrument => <li key={instrument.id}>{instrument.name} | {instrument.skill} | {instrument.experience} year{addS(instrument.experience)} experience</li>)}
            </Div>
            <Div>
                <h3>🎥 Videos</h3>
                <p>Check out my videos: {profile.video_url}</p>
            </Div>
            <Div>
                <h3>📅 Events</h3>
                <ul>
                    {chron(events).map(event => <EventCard key={event.id} event={event} />)}
                </ul>
            </Div>
        </ProfileGrid>
    );
}

// Styles
const ProfileGrid = styled.div`
    background-color: white;
    border-radius: 1em;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 6em 4em 1em 3em 3em auto auto auto auto;
    align-items: center;
    justify-content: center;
    padding: 1em;
    margin: auto;
    max-width: 800px;
    min-width: 550px;
`
const Avatar = styled.img`
    width: 12em;
    height: 12em;
    border-radius: 50%;
    object-fit: cover;
    object-position: 50%;
    margin: auto;
    padding: 1em;
    grid-row: 1 / span 4;
`
const Name = styled.h1`
    color: #3D5467;
    font-size: 2.5em;
    font-weight: 800;
`
const Location = styled.small`
    // grid-row: 3 / span 4;
`
const Button = styled.button`
    background-color: #8AA29E;
    border: none;
    border-radius: 2em;
    color: white;
    opacity: .75;
    margin: auto;
    padding: 10px;
    width: 12em;
    &:hover {
        cursor: pointer;
        opacity: 1;
    }
`
const Div = styled.div`
    grid-column: 1 / span 2;
    margin: 1em;
    padding: 1em;
`
export default Profile;
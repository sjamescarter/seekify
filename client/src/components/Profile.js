import { useContext } from 'react';
import styled from 'styled-components';
import { chron, currentEvents } from './utilities';
import PublicEventCard from './PublicEventCard';
import { UserContext } from '../context/user';
import InstrumentsTable from './InstrumentsTable';
import Icon from './Icon';

function Profile({ person }) {
    const { user } = useContext(UserContext);
    const { profile, church, user_instruments, events } = person

    const loggedIn = person.id === user.id ? true : false;

    const upcomingEvents = currentEvents(events);

    return(
        <ProfileGrid>
            { <Avatar src={profile.avatar ? profile.avatar : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L-PLw9YL0s6ErCIcuprlKgAAAA%26pid%3DApi&f=1&ipt=98bca178f7faad18a400337a2735e92959f258e43128e375907f1e6d80f5b423&ipo=images" } alt="Avatar" loading="lazy" /> }
            <div></div>
            <Name>{person.name}</Name>
            <Location>{profile.city}, {profile.state} :: {church.name}</Location>
            <Location>{person.email} :: {profile.phone}</Location>
            <div></div>
            <Div>
                <h3>Bio</h3>
                <p>{profile.bio}</p>
            </Div>
            <Div>
                <InstrumentsTable userInstruments={user_instruments} loggedIn={loggedIn} />
            </Div>
            { profile.video_url
                ? <Div>
                    <h3>Videos</h3> 
                    <a href={profile.video_url} rel="noreferrer" target="_blank">Check out my videos</a>
                    {/* <Icon>open_in_new</Icon> */}
                    {/* <Videos src={profile.video_url} title="Videos"></Videos> */}
                </Div>
                : null
            }
            <Div>
                <h3>Upcoming Events</h3>
                {chron(upcomingEvents).map(event => 
                    <PublicEventCard key={event.id} event={event} />
                )}
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
    grid-template-rows: 6em 4em 1em 3em 3em 3em auto auto auto auto;
    align-items: center;
    justify-content: center;
    padding: 1em;
    margin: auto;
    margin-bottom: 50px;
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
const Div = styled.div`
    grid-column: 1 / span 2;
    margin: 1em;
    padding: 1em;
`
const Videos = styled.iframe`
    width: 100%;
    height: 24em;
    border: none;
`
export default Profile;
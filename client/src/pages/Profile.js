// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { abc, addS, chron } from '../components/utilities';
import Button from '../components/Button';
import PublicEventCard from '../components/PublicEventCard';

function Profile({ user }) {
    const { profile, church, user_instruments, events } = user
    const navigate = useNavigate();
    const currentEvents = events.filter(event => {
        const today = Date.now()
        const date = new Date(event.date)
        return date > today
    })

    // State
    // const [editProfile, setEditProfile] = useState(false);

    return(
        <ProfileGrid>
            { <Avatar src={profile.avatar ? profile.avatar : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L-PLw9YL0s6ErCIcuprlKgAAAA%26pid%3DApi&f=1&ipt=98bca178f7faad18a400337a2735e92959f258e43128e375907f1e6d80f5b423&ipo=images" } alt="Avatar" loading="lazy" /> }
            <div></div>
            <Name>{user.name}</Name>
            <Location>{profile.city}, {profile.state} :: {church.name}</Location>
            <div></div>
            <Button>
                <span className="material-symbols-rounded">edit</span>
                Edit Profile
            </Button>
            <h6>My Connections</h6>
            <Div>
                <h3>Bio</h3>
                <p>{profile.bio}</p>
            </Div>
            <Div>
                <h3>Instruments</h3>
                {abc(user_instruments).map(i => <li key={i.id}>{i.instrument} :: {i.skill} :: {i.experience} year{addS(i.experience)} experience</li>)}
                <Button onClick={() => navigate('/profile/add-instrument')}>
                    <span class="material-symbols-rounded">add_circle</span>
                    Add Instrument
                </Button>
            </Div>
            <Div>
                <h3>Videos</h3>
                <p>Check out my videos: {profile.video_url}</p>
            </Div>
            <Div>
                <h3>Events</h3>
                <ul>
                    {chron(currentEvents).map(event => <PublicEventCard key={event.id} event={event} />)}
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
// const Button = styled.button`
//     background-color: #8AA29E;
//     border: none;
//     border-radius: 10px;
//     display: grid;
//     grid-template-columns: 30px 1fr 15px;
//     align-items: center;
//     color: white;
//     margin: auto;
//     padding: 10px;
//     width: 12em;
//     &:hover {
//         cursor: pointer;
//     }
// `
const Div = styled.div`
    grid-column: 1 / span 2;
    margin: 1em;
    padding: 1em;
`
export default Profile;
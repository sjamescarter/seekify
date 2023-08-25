import { useContext } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { chron } from "../components/utilities";
import EventCard from "../components/EventCard";
import InviteCard from "../components/InviteCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    // Context
    const { user } = useContext(UserContext);
    const { events } = user;

    const navigate = useNavigate();

    const currentEvents = events.filter(event => {
        const today = Date.now()
        const date = new Date(event.date)
        return date > today
    })

    return (
        <Grid>
            <h1>Dashboard</h1>
            <h2>Welcome back, {user.name}</h2>
            <Button onClick={() => navigate('/events/new')}>Create Event</Button>
            <Button onClick={() => navigate('/instruments/new')}>Add Instrument</Button>
            <Container>
                <h2>Events</h2>
                <ul>
                    {currentEvents ? chron(currentEvents).map(event => <EventCard key={event.id} event={event} />) : null}
                </ul>
            </Container>
            <Container>
                <h2>Invites</h2>
                <ul>
                    {user.user_instruments.map(instrument => instrument.invites.map(i => <InviteCard key={i.id} invite={i} />))}
                </ul>
            </Container>
        </Grid>
    );
}

const Grid = styled.div`
    background-color: white;
    border-radius: 10px;
    max-width: 800px;
    min-width: 500px;
    margin: auto;
`
const Container = styled.div`
    margin: auto;
    padding: 20px;
`
export default Dashboard;
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { chron } from "../components/utilities";
import Button from "../styles/Button";
import EventCard from "../components/EventCard";
import InviteCard from "../components/InviteCard";
import Icon from "../components/Icon";

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
            <Container style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h1>Dashboard</h1>
                <Button onClick={() => navigate('/events/new')} style={{height: "3em"}}>
                    <Icon>calendar_add_on</Icon>
                    Create Event
                </Button>
            </Container>
            <Container>
                <h2>Upcoming Events</h2>
                {currentEvents 
                    ? chron(currentEvents).map(event => 
                        <EventCard 
                            key={event.id} 
                            event={event} 
                        />
                    ) 
                    : null
                }
            </Container>
            <Container>
                <h2>Invites</h2>
                {user.user_instruments.map(instrument => 
                    instrument.invites.map(i => 
                        <InviteCard 
                            key={i.id} 
                            invite={i} 
                        />
                    )
                )}
            </Container>
        </Grid>
    );
}

const Grid = styled.div`
    background-color: white;
    border-radius: 10px;
    // display: flex;
    max-width: 800px;
    min-width: 500px;
    margin: auto;
`
const Container = styled.div`
    margin: auto;
    padding: 20px;
`
export default Dashboard;
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { styled } from "styled-components";
import { Container, PageTitle } from "../styles";
import { chron, currentEvents } from "../components/utilities";
import Button from "../styles/Button";
import EventCard from "../components/EventCard";
import Icon from "../components/Icon";
import InviteCard from "../components/InviteCard";

function Dashboard() {
    // Context
    const { user } = useContext(UserContext);
    const { events, invites } = user;

    const navigate = useNavigate();

    const upcomingEvents = currentEvents(events);
    const upcomingInvites = currentEvents(invites)

    return (
        <Container>
            <PageTitle>
                <h1>Dashboard</h1>
                <Button onClick={() => navigate('/events/new')} style={{height: "3em"}}>
                    <Icon>calendar_add_on</Icon>
                    Create Event
                </Button>
            </PageTitle>
            <Div>
                <h2>Events You Host</h2>
                {upcomingEvents.length > 0 
                    ? chron(upcomingEvents).map(event => 
                        <EventCard 
                            key={event.id} 
                            event={event} 
                        />
                    ) 
                    : <p>You have no upcoming events.</p>
                }
            </Div>
            <Div>
                <h2>Invites You've Received</h2>
                {invites.length > 0
                    ? chron(upcomingInvites).map(i => 
                        <InviteCard 
                            key={i.id} 
                            invite={i} 
                        />
                    )
                    : <p>You have no upcoming invites.</p>
                }
            </Div>
        </Container>
    );
}

// Styles
const Div = styled.div`
    margin: auto;
    padding: 20px;
`
export default Dashboard;
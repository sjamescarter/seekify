import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { chron, currentEvents } from "../components/utilities";
import Button from "../styles/Button";
import EventCard from "../components/EventCard";
import InviteCard from "../components/InviteCard";
import Icon from "../components/Icon";
import { Container, PageTitle } from "../styles";

function Dashboard() {
    // Context
    const { user } = useContext(UserContext);
    const { events } = user;

    const navigate = useNavigate();

    const upcomingEvents = currentEvents(events)

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
                {upcomingEvents 
                    ? chron(upcomingEvents).map(event => 
                        <EventCard 
                            key={event.id} 
                            event={event} 
                        />
                    ) 
                    : null
                }
            </Div>
            <Div>
                <h2>Invites You've Received</h2>
                {user.user_instruments.map(instrument => 
                    instrument.invites.map(i => 
                        <InviteCard 
                            key={i.id} 
                            invite={i} 
                        />
                    )
                )}
            </Div>
        </Container>
    );
}

const Div = styled.div`
    margin: auto;
    padding: 20px;
`
export default Dashboard;
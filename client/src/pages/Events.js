import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MusiciansContext } from "../context/musicians";
import { Button, Container, PageTitle } from "../styles";
import Icon from "../components/Icon";
import PublicEventCard from "../components/PublicEventCard";

function Events() {
    const { musicians } = useContext(MusiciansContext);

    const navigate = useNavigate();

    if(!musicians) return <h1>Loading...</h1>

    return (
        <Container>
            <PageTitle>
                <h1>Events</h1>
                <Button onClick={() => navigate('/events/new')} style={{height: "3em"}}>
                        <Icon>calendar_add_on</Icon>
                        Create Event
                </Button>
            </PageTitle>
            <ul>
                {musicians.map(musician => 
                    musician.events.map(event => <PublicEventCard key={event.id} event={event} />)
                )}
            </ul>
        </Container>
    );
}

export default Events;
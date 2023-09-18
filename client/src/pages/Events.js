import { useContext } from "react";
import { MusiciansContext } from "../context/musicians";
import styled from "styled-components";
import PublicEventCard from "../components/PublicEventCard";

function Events() {
    const { musicians } = useContext(MusiciansContext);

    if(!musicians) return <h1>Loading...</h1>
    return (
        <Container>
            <h1>Events</h1>
            <ul>
                {musicians.map(musician => 
                    musician.events.map(event => <PublicEventCard key={event.id} event={event} />)
                )}
            </ul>
        </Container>
    );
}

// Styles
const Container = styled.div`
    background-color: white;
    border-radius: 1em;
    padding: 1em;
    margin: auto;
    margin-bottom: 50px;
    max-width: 800px;
    min-width: 550px;
`
export default Events;
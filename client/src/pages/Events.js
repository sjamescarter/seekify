import { useContext } from "react";
import { MusiciansContext } from "../context/musicians";
import styled from "styled-components";
import PublicEventCard from "../components/PublicEventCard";

function Events() {
    const { musicians } = useContext(MusiciansContext);

    if(!musicians) return <h1>Loading...</h1>
    return (
        <div>
            <h1>Events</h1>
            <ul>
                {musicians.map(musician => 
                    musician.events.map(event => <PublicEventCard key={event.id} event={event} />)
                )}
            </ul>
        </div>
    );
}

export default Events;
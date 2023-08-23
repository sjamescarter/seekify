import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { chron } from "../components/utilities";
import EventCard from "../components/EventCard";
import CreateInvite from "../components/CreateInvite";

function Dashboard() {
    // Context
    const { user } = useContext(UserContext);
    const { events } = user;
    const currentEvents = events.filter(event => {
        const today = Date.now()
        const date = new Date(event.date)
        return date > today
    })

    return (
        <Grid>
            <h1>Dashboard</h1>
            <h2>Welcome back, {user.name}</h2>
            <ul>
                {currentEvents ? chron(currentEvents).map(event => <EventCard key={event.id} event={event} />) : null}
            </ul>
            {user.invites.map(i => <li key={i.id}>{i.message}</li>)}
            <CreateInvite event={events[0]} />
        </Grid>
    );
}

const Grid = styled.div`
`
export default Dashboard;
import styled from 'styled-components';
import Button from './Button';
import { useState } from 'react';
import Form from './Form';

function InviteCard({ invite }) {
    const { message, pay, event, role, host, venue, status } = invite
    const { name, time, rehearsal } = event
    const [show, setShow] = useState()

    function handleClick() {
        
    }

    console.log(event)
    return (
        <Div>
            <Title style={{gridColumn: "1 / span 2"}} onClick={() => setShow(!show)}>{status.toUpperCase()} request for {time}</Title>
            { show 
                ?<>
                <p>Pay: ${pay}</p>
                <p style={{gridColumn: "1 / span 2"}}>Message: {message}</p>
                <p>Event: {name}</p> <p>Date: {time}</p>
                <p>Host: {host}</p>
                <p>Location: {venue}</p>
                <p>Role: {role}</p>
                <p>Rehearsal: {rehearsal}</p>
                <Button onClick={handleClick}>Accept</Button>
                <Button alt={true}>Decline</Button>
                </>
                : null
            }
        </Div>
    );
}

const Div = styled.div`
    background-color: #F1EDEE;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: auto;
    margin-bottom: 15px;
    padding: 20px;
    max-width: 500px;
`
const Title = styled.h2`
    text-align: center;
    color: #3D5467;
`
export default InviteCard;
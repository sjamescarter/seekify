import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';

function InviteCard({ invite }) {
    const { user, setUser } = useContext(UserContext)
    const { id, message, pay, event, role, host, venue, status } = invite
    const { name, time, rehearsal } = event
    const [show, setShow] = useState()

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/invites/${invite.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: e.target.id})
        })
        .then(r => r.json())
        .then(updatedInvite => setUser({
            ...user, 
            user_instruments: [
                ...user.user_instruments.map(i => 
                    i.instrument === role 
                        ? {
                            ...i, 
                            invites: [
                                ...i.invites.map(inv => 
                                    inv.id === id 
                                        ? updatedInvite
                                        : inv
                                )
                            ]
                        }
                        : i 
                )
            ]
        }))
    }

    return (
        <Div>
            <Title style={{gridColumn: "1 / span 2"}} onClick={() => setShow(!show)}>{status.toUpperCase()} request for {time}</Title>
            { show 
                ?<>
                    <p>Event: {name}</p> <p>Date: {time}</p>
                    <p>Host: {host}</p>
                    <p>Location: {venue}</p>
                    <p>Role: {role}</p>
                    <p>Rehearsal: {rehearsal}</p>
                    <p>Pay: ${pay}</p>
                    <p style={{gridColumn: "1 / span 2"}}>Message: {message}</p>
                    <form id='accepted' onSubmit={handleSubmit}>
                        <Submit type="submit" value="Accept" />
                    </form>
                    <form id='declined' onSubmit={handleSubmit}>
                        <Submit type="submit" value="Decline" />
                    </form>
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
    &:hover{
        cursor: pointer;
        background-color: #E4DDDF;
    }
`
const Title = styled.h2`
    text-align: center;
    color: #3D5467;
`
const Submit = styled.input`
    margin: auto;
    width: 100%;
`
export default InviteCard;
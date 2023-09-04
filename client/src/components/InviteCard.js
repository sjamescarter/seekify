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
        .then(updatedInvite => {
            setUser({
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
            });
            setShow();
        })
    }

    return (
        <Div>
            <Title 
                style={{ 
                    gridColumn: "1 / span 2",
                    color: status === "pending" ? "#3D5467" : status === "accepted" ? "#77928E" : "#DB5461"
                }} 
                onClick={() => setShow(!show)}>{status.toUpperCase()} request for {time}
            </Title>
            { show 
                ?<>
                    <Item>
                        <h4>Event</h4>
                        <p>{name}</p> 
                    </Item>
                    <Item>
                        <h4>Date</h4> 
                        <p>{time}</p>
                    </Item>
                    <Item>
                        <h4>Host</h4>
                        <p>{host}</p>
                    </Item>
                    <Item>
                        <h4>Location</h4>
                        <p>{venue}</p>
                    </Item>
                    <Item>
                        <h4>Role</h4>
                        <p>{role}</p>
                    </Item>
                    <Item>
                        <h4>Rehearsal Time</h4>
                        <p>{rehearsal}</p>
                    </Item>
                    { pay 
                        ?<Item>
                            <h4>Pay</h4>
                            <p>${pay}</p>
                        </Item>
                        : null
                    }
                    <Item style={{gridColumn: "1 / span 2"}}>
                        <h4>Message</h4>
                        <p>{message}</p>
                    </Item>
                    <form id='accepted' onSubmit={handleSubmit}>
                        <Accept type="submit" value="Accept" />
                    </form>
                    <form id='declined' onSubmit={handleSubmit}>
                        <Decline type="submit" value="Decline" />
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
        box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
    }
`
const Title = styled.h2`
    text-align: center;
    color: #3D5467;
`
const Item = styled.div`
    display: grid;
    grid-template-rows: 25px 30px;
`
const Accept = styled.input`
    margin: auto;
    width: 100%;
    background-color: #8AA29E;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 12px 0;
    font: inherit;
    font-size: 1.3em;
    font-weight: 800;
    &:hover {
        background-color: #77928E;
        cursor: pointer;
    }
`
const Decline = styled.input`
    margin: auto;
    width: 100%;
    background-color: #DB5461;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 12px 0;
    font: inherit;
    font-size: 1.3em;
    font-weight: 800;
    &:hover {
        background-color: #D43545;
        cursor: pointer;
    }
`
export default InviteCard;
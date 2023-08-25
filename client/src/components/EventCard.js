import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import CreateInvite from "./CreateInvite";

function EventCard({ event }) {
    const { name, time } = event;
    const [expand, setExpand] = useState();
    const [invite, setInvite] = useState();

    return(
        <Div>
            <h2 onClick={() => setExpand(!expand)}>{name}</h2>
            <small>{time}</small>
            { expand
                ? <>
                    <div>
                        <Button>Edit Event</Button>
                        <Button onClick={() => setInvite(!invite)}>Add Role</Button>
                    </div>
                    <div>
                    <h3>Roles</h3>
                    <ul>
                        {event.roles.map(r => <li key={r.id}>{r.user_instrument.name} :: {r.role} :: {r.status.toUpperCase()}</li>)}
                    </ul>
                    </div>
                </>
                : null
            }
            { invite
                ? <CreateInvite event={event} setInvite={setInvite} />
                : null
            }
        </Div>
    );
}

const Div = styled.div`
    background-color: #F1EDEE;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 40px 30px 1fr;
    gap: 10px;
    margin: auto;
    margin-bottom: 15px;
    padding: 20px;
    max-width: 500px;
`
export default EventCard;
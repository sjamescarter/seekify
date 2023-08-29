import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import CreateInvite from "./CreateInvite";
import FormItem from "./FormItem";

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
                        <Button>
                         <span className="material-symbols-rounded">edit</span>
                            Edit Event
                        </Button>
                        <Button onClick={() => setInvite(!invite)}>
                            <span className="material-symbols-rounded">send</span>
                            Send Musician Invite
                        </Button>
                    </div>
                    <div>
                        <h3>Roles</h3>
                        <ul>
                            {event.roles.map(r => <FormItem key={r.id} icon='pending'>
                                {r.status.toUpperCase()}
                                {r.user_instrument.name} :: {r.role}
                                </FormItem>)}
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
    &:hover{
        cursor: pointer;
        background-color: #E4DDDF;
    }
`
export default EventCard;
import styled from "styled-components";
import Button from "./Button";
import { useContext, useEffect, useRef, useState } from "react";
import CreateInvite from "./CreateInvite";
import FormItem from "./FormItem";
import { UserContext } from "../context/user";
import Modal from "./Modal";
import Warning from "./Warning";
import { handleModal } from "./utilities";

function EventCard({ event }) {
    const { user, setUser } = useContext(UserContext);
    const { name, time } = event;
    const [expand, setExpand] = useState();
    const [invite, setInvite] = useState();
    const inviteId = useRef();

    useEffect(() => {
        invite
            ? handleModal('modal', 'open')
            : handleModal('modal')
    }, [invite])

    function confirmDelete(e) {
        inviteId.current = e.target.id;
        handleModal('confirm', 'open');
    }

    function handleDelete(e) {
        e.preventDefault();
        document.getElementById('confirm').close();
        const id = inviteId.current
        fetch(`/events/${event.id}/invites/${id}`, {
            method: "DELETE",
        })
        .then(r => {
            if(r.ok) {
                setUser({
                    ...user,
                    events: user.events.map(evnt => 
                        evnt.id === event.id 
                            ? {...evnt,
                                roles: evnt.roles.filter(role => role.id !== parseInt(id))
                            }
                            : evnt
                    )
                });
            }
        });
    }

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
                            <span className="material-symbols-rounded">person_add</span>
                            Invite Musician
                        </Button>
                    </div>
                    <div>
                        <h3>Roles</h3>
                        <ul>
                            {event.roles.map(r => 
                                <FormItem key={r.id} icon='pending'>
                                    <div style={{
                                        display: "grid", 
                                        gridTemplateColumns: "1fr 1fr 1fr 30px", 
                                        alignItems: "center", 
                                        width: "100%"
                                    }}>
                                        <p>{r.status.toUpperCase()}</p>
                                        <p>{r.user_instrument.name}</p>
                                        <p>{r.role}</p>
                                        <i 
                                            id={r.id} 
                                            className='material-symbols-rounded' 
                                            style={{color: "#DB5461"}} 
                                            onClick={confirmDelete}
                                        >
                                            delete
                                        </i>
                                    </div>
                                </FormItem>
                            )}
                        </ul>
                    </div>
                </>
                : null
            }
            <Modal id='modal'>
                <CreateInvite event={event} setInvite={setInvite} />
            </Modal>
            <Modal id='confirm'>
                <Warning onSubmit={handleDelete} />
            </Modal>
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
        box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
    }
`
export default EventCard;
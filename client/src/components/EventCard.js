import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/user";
import { styled } from "styled-components";
import { colors } from "../styles";
import Button from "../styles/Button";
import CreateInvite from "./CreateInvite";
import Delete from "./Delete";
import Modal from "./Modal";
import UpdateEvent from "./UpdateEvent";
import PublicEventCard from "./PublicEventCard";
import Roles from "./Roles";
import Icon from "./Icon";

function EventCard({ event }) {
    // Context
    const { user, setUser } = useContext(UserContext);
    const { id } = event;

    // State
    const [expand, setExpand] = useState();

    // Ref
    const updateEventModal = useRef(null);
    const createInviteModal = useRef(null);

    // Handlers
    function handleDelete() {
        setUser({
            ...user,
            events: user.events.filter(evnt => evnt.id !== parseInt(id))
        });
    }

    return(
        <PublicEventCard event={event} onClick={() => setExpand(!expand)}>
            <Delete 
                id={`deleteEvent${id}`} 
                endpoint={`/events/${id}`} 
                callback={handleDelete}
            />
            { expand
                ? <Container>
                    <Grid>
                        <Button onClick={() => updateEventModal.current.showModal()}>
                            <Icon>edit</Icon>
                            Edit Event
                        </Button>
                        <Button onClick={() => createInviteModal.current.showModal()}>
                            <Icon>person_add</Icon>
                            Invite Musician
                        </Button>
                    </Grid>
                    <Roles event={event} />
                </Container>
                : null
            }
            <Modal ref={updateEventModal}>
                <UpdateEvent event={event} closeModal={() => updateEventModal.current.close()} />
            </Modal>
            <Modal ref={createInviteModal}>
                <CreateInvite event={event} handleCancel={() => createInviteModal.current.close()} />
            </Modal>
        </PublicEventCard>                      
    );
}

// Styles
const Container = styled.div`
    background-color: ${colors.nuetral};
    margin: 2px 0 0 30px;
    margin-bottom: 15px;
    border-bottom-right-radius: 12px;
    padding: 20px;
`
const Grid = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 30px;
    gap: 10px;
`
export default EventCard;
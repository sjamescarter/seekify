import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { colors } from "../styles";
import { handleModal } from "./utilities";
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
                        <Button onClick={() => handleModal(`updateEvent${id}`, true)}>
                            <Icon>edit</Icon>
                            Edit Event
                        </Button>
                        <Button onClick={() => handleModal(`createInvite${id}`, true)}>
                            <Icon>person_add</Icon>
                            Invite Musician
                        </Button>
                    </Grid>
                    <Roles event={event} />
                </Container>
                : null
            }
            <Modal id={`updateEvent${id}`}>
                <UpdateEvent event={event} handleCancel={() => handleModal(`updateEvent${id}`)} />
            </Modal>
            <Modal id={`createInvite${id}`}>
                <CreateInvite event={event} handleCancel={() => handleModal(`createInvite${id}`)} />
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
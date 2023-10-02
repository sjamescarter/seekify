import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { MusiciansContext } from "../context/musicians";
import { styled } from "styled-components";
import { TableRow, colors } from "../styles";
import Delete from "./Delete";

function RoleCard({ eventId, musician }) {
    const { id, status, role, user_instrument } = musician;
    const { name } = user_instrument;

    // Context
    const { user, setUser } = useContext(UserContext);
    const { musicians } = useContext(MusiciansContext);

    // Constants
    const color = status === "pending" 
        ? colors.secondary 
        : status === "accepted" 
            ? colors.main 
            : colors.red;
    
    const navigate = useNavigate();
    const personId = musicians.find(musician => musician.name === name).id

    // Handlers
    function handleClick() {
        navigate(`/people/${personId}`);
    }

    function handleDelete() {
        setUser({
            ...user,
            events: user.events.map(evnt => 
                evnt.id === eventId 
                    ? {...evnt,
                        roles: evnt.roles.filter(role => role.id !== parseInt(id))
                    }
                    : evnt
            )
        });
    }

    return (
        <TableRow>
            <Span style={{color: color}}>
                <i className='material-symbols-rounded'>
                    { status === "pending" 
                        ? "pending" 
                        : status === "accepted" 
                        ? "check_circle" 
                        : "cancel"
                    }
                </i>
                {status.toUpperCase()}
            </Span>
            <P onClick={handleClick}>{name}</P>
            <p>{role}</p>
            <Delete 
                id={`inviteDelete${id}`} 
                endpoint={`/events/${eventId}/invites/${id}`} 
                callback={handleDelete}
            />
        </TableRow>
    );
}

// Styles
const Span = styled.span`
    align-items: center;
    display: grid;
    grid-template-columns: 30px auto;
    gap: 5px;
    font-weight: 600;
`
const P = styled.p`
    &:hover {
        color: ${colors.secondary};
        cursor: pointer;
        text-decoration: underline;
    }
`
export default RoleCard;
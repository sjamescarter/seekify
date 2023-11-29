import { useContext, useRef } from "react";
import { UserContext } from "../context/user";
import { MusiciansContext } from "../context/musicians";
import { styled } from "styled-components";
import { TableRow, colors } from "../styles";
import { addS, camelToTitle } from "./utilities";
import Delete from "./Delete";
import FindEvent from "./FindEvent";
import Modal from "./Modal";

function InstrumentCard({ userInstrument }) {
    const { id, name, instrument, skill, experience } = userInstrument

    // Context
    const { user, setUser } = useContext(UserContext);
    const { musicians, setMusicians } = useContext(MusiciansContext);
    const loggedIn = user.user_instruments.find( u => u.id === id ? true : false)
    
    // Ref
    const findEventModal = useRef(null);

    // Handlers
    function handleState() {
        setUser({
            ...user,
            user_instruments: user.user_instruments.filter(u => u.id !== id)
        });
        setMusicians([
            ...musicians.map(m => m.id === user.id 
                ? {
                    ...m,
                    user_instruments: m.user_instruments.filter(u => u.id !== id)
                }
                : m
            ) 
        ]);
    }

    return(
        <TableRow>
            <p>{instrument}</p>
            <p>{camelToTitle(skill)}</p>
            <p>{experience} Year{addS(experience)} Experience</p>
            { loggedIn
                ? <Delete 
                    id={`instrumentDelete${id}`} 
                    endpoint={`/user_instruments/${id}`} 
                    callback={handleState} 
                />
                :<I 
                    onClick={() => findEventModal.current.showModal()}
                    title={`Invite ${name.split(" ")[0]} to play ${instrument}`}
                    className='material-symbols-rounded' 
                >
                    person_add
                </I>
            }
            { !loggedIn
                ? <Modal ref={findEventModal}>
                    <FindEvent 
                        userInstrument={userInstrument} 
                        handleCancel={() => findEventModal.current.close()} 
                    />
                </Modal>
                : null
            }
        </TableRow>
    );
}

// Styles
const I = styled.i`
    color: ${colors.gray};
    &:hover {
        color: ${colors.main};
        cursor: pointer;
    }
`
export default InstrumentCard;
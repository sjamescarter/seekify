import styled from "styled-components";
import Button from "./Button";
import { addS } from "./utilities";
import { useContext } from "react";
import { UserContext } from "../context/user";

function InstrumentCard({ userInstrument }) {
    const { id, name, instrument, skill, experience } = userInstrument

    // Context
    const { user } = useContext(UserContext);
    const loggedIn = user.user_instruments.find( u => u.id === id ? true : false)
console.log(loggedIn)
    return(
        <Grid>
            <p>{instrument}</p>
            <p>{skill}</p>
            <p>{experience} year{addS(experience)} experience</p>
            { loggedIn
                ? <Button>
                    <span 
                        className='material-symbols-rounded' 
                    >
                        delete
                    </span>
                </Button>
                : <Button
                    title={`Invite ${name.split(" ")[0]} to play ${instrument}`}
                >
                    <span 
                        className='material-symbols-rounded' 
                    >
                        person_add
                    </span>
                </Button>
            }
        </Grid>
    );
}

// Styles
const Grid = styled.li`
    border-bottom: .5px solid #686963;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 60px;
`

export default InstrumentCard;
import styled from "styled-components";
import { TableHeader, TableRow } from "../styles";
import { abc, handleModal } from "./utilities";
import AddInstrument from "./AddInstrument";
import Button from "../styles/Button";
import InstrumentCard from "./InstrumentCard";
import Modal from "./Modal";
import Icon from "./Icon";

function InstrumentsTable({ userInstruments, loggedIn }) {
    return (
        <>
            <Div>
                <h3>Instruments</h3>
                { loggedIn
                    ? <Button onClick={() => handleModal("addInstrument", true)}>
                        <Icon>add_circle</Icon>
                        Add Instrument
                    </Button>
                    : null
                }
            </Div>
            <TableHeader>
                <p><strong>Instrument</strong></p>
                <p><strong>Skill</strong></p>
                <p><strong>Experience</strong></p>
            </TableHeader>
            {userInstruments.length === 0 
                ? <TableRow>
                    <p>None Listed</p>
                </TableRow>
                : abc(userInstruments).map(i => <InstrumentCard key={i.id} userInstrument={i} />)
            }
            <Modal id="addInstrument">
                <AddInstrument />
            </Modal>
        </>
    );
}

// Styles
const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export default InstrumentsTable;
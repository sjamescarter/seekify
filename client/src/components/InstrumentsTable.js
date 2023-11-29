import { useRef } from "react";
import { styled } from "styled-components";
import { TableHeader, TableRow } from "../styles";
import { abc } from "./utilities";
import AddInstrument from "./AddInstrument";
import Button from "../styles/Button";
import Icon from "./Icon";
import InstrumentCard from "./InstrumentCard";
import Modal from "./Modal";

function InstrumentsTable({ userInstruments, loggedIn }) {
    // Ref
    const addInstrumentModal = useRef(null);

    return (
        <>
            <Div>
                <h3>Instruments</h3>
                { loggedIn
                    ? <Button onClick={() => addInstrumentModal.current.showModal()}>
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
                : abc(userInstruments, "instrument").map(i => <InstrumentCard key={i.id} userInstrument={i} />)
            }
            <Modal ref={addInstrumentModal}>
                <AddInstrument addInstrumentModal={addInstrumentModal}/>
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
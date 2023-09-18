import { TableHeader, TableRow } from "../styles";
import { abc, handleModal } from "./utilities";
import AddInstrument from "./AddInstrument";
import Button from "../styles/Button";
import InstrumentCard from "./InstrumentCard";
import Modal from "./Modal";

function InstrumentsTable({ userInstruments, loggedIn }) {
    return (
        <>
            <h3>Instruments</h3>
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
            { loggedIn
                ? <Button onClick={() => handleModal("addInstrument", true)}>
                    <span className="material-symbols-rounded">add_circle</span>
                    Add Instrument
                </Button>
                : null
            }
            <Modal id="addInstrument">
                <AddInstrument />
            </Modal>
        </>
    );
}

export default InstrumentsTable;
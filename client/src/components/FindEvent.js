import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { InstrumentsContext } from "../context/instruments";
import { Select } from "../styles";
import { handleChange, handleModal } from "./utilities";
import CreateInvite from "./CreateInvite";
import Form from "./Form";
import Modal from "./Modal";

function FindEvent({ userInstrument, handleCancel }) {
    const { id, instrument } = userInstrument;

    // Context
    const { user } = useContext(UserContext);
    const { instruments } = useContext(InstrumentsContext);

    // State
    const [form, setForm] = useState({ event: "" });

    // Constants
    const event = user.events.find(e => e.id === parseInt(form.event));
    const instrumentId = instruments.find(i => i.name === instrument).id;

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const onCancel = () => {
        setForm({ event: "" });
        handleCancel();
    }
    function handleSubmit(e) {
        e.preventDefault();
        handleModal(`createInvite${form.event}`, true);
        // handleCancel();
    } 

    return (
        <>
            <Form
                title='Find Event'
                onSubmit={handleSubmit}
                handleCancel={onCancel}
            >
                <Select
                    name="event" 
                    value={form.event} 
                    onChange={onChange}
                >
                    <option>Select Event</option>
                    {/* <option>Create New Event</option> */}
                    {user.events.map(event => 
                        <option 
                            key={event.id}
                            value={event.id}
                        >
                            {event.name}, {event.time}
                        </option>
                    )}
                </Select>
            </Form>
            <Modal id={`createInvite${form.event}`}>
                <CreateInvite 
                    event={event} 
                    instrumentId={instrumentId}
                    userInstrumentId={id} 
                    handleCancel={() => handleModal(`createInvite${form.event}`)} 
                />
            </Modal>
        </>
    );
}

export default FindEvent;
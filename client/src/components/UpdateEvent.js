import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { VenuesContext } from "../context/venues";
import { handleModal, handleImgSubmit } from "../components/utilities";
import CreateVenue from "../components/CreateVenue";
import Modal from "../components/Modal";
import EventForm from "./EventForm";

function UpdateEvent({ event }) {
    const { id, date, description, name, rehearsal, venue } = event 

    // Context
    const { user, setUser } = useContext(UserContext);
    const { venues } = useContext(VenuesContext);

    // State
    const [form, setForm] = useState({
        id: id,
        date: date,
        description: description,
        name: name,
        public: event.public,
        rehearsal: rehearsal,
        venueId: venue.id
    });
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();

    // Const
    const endpoint = `/events/${id}`;
    const method = "PATCH";
    const imgLabel = 'image';
    const callback = (data) => {
        setUser({
            ...user,
            events: [
                ...user.events.map(evnt => evnt.id === id 
                    ? data
                    : evnt
                )
            ]
        });
        handleModal(`updateEvent${id}`);
    }

    // Handlers
    const handleCancel = () => {
        setForm({...form, venueId: ""});
        handleModal(`createVenue${event.id}`);
    }
    const onSubmit = (e) => handleImgSubmit(e, endpoint, method, setErrors, form, imgLabel, img, callback)

    if(form.venueId === "new") { 
        handleModal(`createVenue${id}`, true)
    };

    return (
        <>
            <EventForm
                errors={errors}
                form={form}
                img={img}
                imgLabel={imgLabel}
                onCancel={() => handleModal(`updateEvent${id}`)}
                onSubmit={onSubmit}
                setForm={setForm}
                setImg={setImg}
                title="Update Event"
                venues={venues}
            />
            <Modal id={`createVenue${id}`}>
                <CreateVenue 
                    state={form} 
                    setState={setForm} 
                    handleCancel={handleCancel} 
                    closeModal={() => handleModal(`createVenue${id}`)}
                />
            </Modal>
        </>
    );
}

export default UpdateEvent;
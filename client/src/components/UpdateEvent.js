import { useContext, useRef, useState } from "react";
import { MusiciansContext } from "../context/musicians";
import { UserContext } from "../context/user";
import { handleImgSubmit } from "../components/utilities";
import CreateVenue from "../components/CreateVenue";
import Modal from "../components/Modal";
import EventForm from "./EventForm";

function UpdateEvent({ event, closeModal }) {
    const { id, date, description, name, rehearsal, venue } = event 

    // Context
    const { user, setUser } = useContext(UserContext);
    const { musicians, setMusicians } = useContext(MusiciansContext)

    // State
    const [form, setForm] = useState({
        id: id,
        date: date,
        description: description,
        name: name,
        public: event.public,
        rehearsal: rehearsal || "",
        venueId: venue.id
    });
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();

    // Ref
    const createVenueModal = useRef(null);

    // Const
    const endpoint = `/events/${id}`;
    const method = "PATCH";
    const imgLabel = 'image';
    const callback = (data) => {
        if(!data.public) {
            setMusicians([
                ...musicians.map(m => m.id === user.id
                    ? {
                        ...m,
                        events: [
                            ...m.events.filter(evnt => evnt.id !== id)
                        ]
                    }
                    : m
                )
            ]);
        } else if (!event.public && data.public) {
            setMusicians([
                ...musicians.map(m => m.id === user.id
                    ? {
                        ...m,
                        events: [
                            ...m.events,
                            data
                        ]
                    }
                    : m
                )
            ]);
        } else {
            setMusicians([
                ...musicians.map(m => m.id === user.id
                    ? {
                        ...m,
                        events: [
                            ...m.events.map(evnt => evnt.id === id
                                ? data
                                : evnt
                            )
                        ]
                    }
                    : m
                )
            ]);
        }
        setUser({
            ...user,
            events: [
                ...user.events.map(evnt => evnt.id === id 
                    ? data
                    : evnt
                )
            ]
        });
        closeModal();
    }

    // Handlers
    const handleCancel = () => {
        setForm({...form, venueId: ""});
        createVenueModal.current.close()
    }
    const onSubmit = (e) => {
        handleImgSubmit(e, endpoint, method, setErrors, form, imgLabel, img, callback);
        setImg();
    }

    if(form.venueId === "new") { 
        createVenueModal.current.showModal()
    };

    return (
        <>
            <EventForm
                errors={errors}
                form={form}
                img={img}
                imgLabel={imgLabel}
                onCancel={closeModal}
                onSubmit={onSubmit}
                setForm={setForm}
                setImg={setImg}
                title="Update Event"
            />
            <Modal ref={createVenueModal}>
                <CreateVenue 
                    state={form} 
                    setState={setForm} 
                    handleCancel={handleCancel} 
                    closeModal={() => createVenueModal.current.close()}
                />
            </Modal>
        </>
    );
}

export default UpdateEvent;
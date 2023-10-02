import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusiciansContext } from "../context/musicians";
import { VenuesContext } from "../context/venues";
import { UserContext } from "../context/user";
import { handleImgSubmit, handleModal } from "../components/utilities";
import CreateVenue from "../components/CreateVenue";
import EventForm from "../components/EventForm";
import Modal from "../components/Modal";


const formFields = {name: "", date: "", rehearsal: "", public: "", description: "", venueId: ""}

function CreateEvent() {
    // Context
    const { user, setUser } = useContext(UserContext);
    const { musicians, setMusicians } = useContext(MusiciansContext);
    const { venues } = useContext(VenuesContext);

    // State
    const [form, setForm] = useState({...formFields, venueId: user.church.id});
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();

    // Const
    const navigate = useNavigate();
    const callback = (event) => {
        setUser({...user, events: [...user.events, event]});
        setMusicians([...musicians.map(m => m.id === user.id 
            ? {
                ...m,
                events: [
                    ...m.events,
                    event
                ]
            }
            : m
        )])
        navigate('/');
    };
    const endpoint = '/events';
    const method = 'POST';
    const imgLabel = 'image';

    // Handlers
    const handleCancel = () => {
        setForm({...form, venueId: ""});
        handleModal('createVenue');
    }
    const onSubmit = (e) => handleImgSubmit(e, endpoint, method, setErrors, form, imgLabel, img, callback);

    if(form.venueId === "new") { 
        handleModal('createVenue', true)
    };

    return (
        <>
            <EventForm
                errors={errors}
                form={form}
                img={img}
                imgLabel={imgLabel}
                onCancel={() => navigate('/')}
                onSubmit={onSubmit}
                setForm={setForm}
                setImg={setImg}
                title="Create Event"
                venues={venues}
            />
            <Modal id='createVenue'>
                <CreateVenue 
                    state={form} 
                    setState={setForm} 
                    handleCancel={handleCancel} 
                    closeModal={() => handleModal('createVenue')}
                />
            </Modal>
        </>
    );
}

export default CreateEvent;
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { VenuesContext } from "../context/venues";
import { Input, TextArea } from "../styles";
import { handleChange, handleModal, camelToSnake } from "../components/utilities";
import CreateVenue from "../components/CreateVenue";
import Form from "../components/Form";
import FormItem from "../components/FormItem";
import ImgUploader from "../components/ImgUploader";
import VenueSelect from "../components/VenueSelect";
import Modal from "../components/Modal";

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
    const imgLabel = 'image';

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => {
        setForm({...form, venueId: ""});
        handleModal(`createVenue${event.id}`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors();
    
        const data = new FormData();
        Object.keys(form).map(key => data.append(camelToSnake(key), form[key]))
        if(img) {
            data.append(imgLabel, img);
        }
    
        fetch(`/events/${id}`, {
            method: 'PATCH',
            body: data
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => {
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
                })
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        });
    }

    if(form.venueId === "new") { 
        handleModal(`createVenue${id}`, 'open')
    };

    return (
        <>
            <Form 
                title='Update Event'
                onSubmit={handleSubmit}
                errors={errors}
                handleCancel={() => handleModal(`updateEvent${id}`)}
                >
                <FormItem icon='event'>
                    <Input 
                        type='text'
                        name='name'
                        placeholder="Name"
                        value={form.name}
                        onChange={onChange}
                        />
                    <Input
                        type='datetime-local'
                        name='date'
                        value={form.date}
                        onChange={onChange}
                        />
                </FormItem>
                <FormItem icon="event_note">
                    <p style={{width: '100%', margin: '5px', padding: '5px 10px'}}>Rehearsal</p>
                    <Input
                        type='datetime-local'
                        name='rehearsal'
                        value={form.rehearsal}
                        onChange={onChange}
                        />
                </FormItem>
                <VenueSelect onChange={onChange} value={form.venueId} venues={venues} />
                <FormItem icon="public">
                    <p style={{width: '100%', margin: '5px', padding: '5px 10px'}}>Public Event?</p>
                    <Input
                        type="checkbox"
                        name="public"
                        checked={form.public}
                        onChange={onChange}
                        />
                </FormItem>
                <FormItem icon='description'>
                    <TextArea 
                        name='description' 
                        placeholder='Give us all the details about your event...' 
                        rows='5' 
                        value={form.description} 
                        onChange={onChange} 
                        />
                </FormItem>
                <ImgUploader id={imgLabel} img={img} setImg={setImg} />
            </Form>
            <Modal id={`createVenue${id}`}>
                <CreateVenue state={form} setState={setForm} handleCancel={handleCancel} />
            </Modal>
        </>
    );
}

export default UpdateEvent;
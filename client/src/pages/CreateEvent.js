import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { VenuesContext } from "../context/venues";
import { Input, TextArea } from "../styles";
import { handleChange, handleImgSubmit, handleModal } from "../components/utilities";
import CreateVenue from "../components/CreateVenue";
import Form from "../components/Form";
import FormItem from "../components/FormItem";
import ImgUploader from "../components/ImgUploader";
import VenueSelect from "../components/VenueSelect";
import Modal from "../components/Modal";


const formFields = {name: "", date: "", rehearsal: "", public: "", description: "", venueId: ""}

function CreateEvent() {
    // Context
    const { user, setUser } = useContext(UserContext);
    const { venues } = useContext(VenuesContext);

    // State
    const [form, setForm] = useState({...formFields, venueId: user.church.id});
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();

    // Const
    const navigate = useNavigate();
    const callback = (event) => {
        setUser({...user, events: [...user.events, event]});
        navigate('/');
    };
    const endpoint = 'events';
    const imgLabel = 'image';

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => {
        setForm({...form, venueId: ""});
        handleModal('createVenue');
    }
    const onSubmit = (e) => handleImgSubmit(e, endpoint, setErrors, form, imgLabel, img, callback);

console.log(form)

    if(form.venueId === "new") { 
        handleModal('createVenue', 'open')
    };

    return (
        <>
            <Form 
                title='Create Event'
                onSubmit={onSubmit}
                errors={errors}
                handleCancel={() => navigate('/')}
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
                    <label style={{width: '100%', margin: '5px', padding: '5px 10px'}}>Rehearsal</label>
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
                { form.public 
                    ? <>
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
                    </> 
                    : null
                }
            </Form>
            <Modal id='createVenue'>
                <CreateVenue state={form} setState={setForm} handleCancel={handleCancel} />
            </Modal>
        </>
    );
}

export default CreateEvent;
import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { states, handleChange, camelToTitle, handleModal } from '../components/utilities';
import Form from '../components/Form'
import { Input, Select, TextArea } from '../styles';
import { handleImgSubmit } from '../components/utilities';
import FormItem from '../components/FormItem';
import ImgUploader from '../components/ImgUploader';
import CreateVenue from '../components/CreateVenue';
import VenueSelect from '../components/VenueSelect';
import { VenuesContext } from '../context/venues';
import Modal from '../components/Modal';

const formFields = {
    firstName: "", 
    lastName: "", 
    phone: "", 
    city: "", 
    state: "", 
    bio: "", 
    venueId: "", 
    videoUrl: ""
}

function CreateProfile({ handleLogout }) {
    // Context
    const { setUser } = useContext(UserContext);
    const { venues } = useContext(VenuesContext);

    // State
    const [form, setForm] = useState(formFields);
    const [img, setImg] = useState();
    const [errors, setErrors] = useState();
    
    // Const
    const callback = (data) => setUser(data);
    const endpoint = 'profiles';
    const imgLabel = 'avatar';

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => {
        handleModal('createVenue');
        setForm({ ...form, venueId: "" });
    }
    const onSubmit = (e) => handleImgSubmit(e, endpoint, setErrors, form, imgLabel, img, callback);

    if(form.venueId === "new") { 
        handleModal('createVenue', 'open');
    };

    return (
        <>
            <Form 
                title='Create Profile'
                onSubmit={onSubmit} 
                errors={errors} 
                handleCancel={handleLogout}
            >
                <FormItem icon="person">
                    {Object.keys(form).slice(0, 2).map(key => 
                        <Input 
                            key={key} 
                            type="text"
                            name={key}
                            placeholder={camelToTitle(key)}
                            value={form[key]}
                            onChange={onChange}
                        />
                    )}
                </FormItem>
                <FormItem icon="phone">
                    <Input 
                        type="tel" 
                        name="phone"
                        placeholder='888-888-8888'
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={form.phone} 
                        onChange={onChange} 
                    />
                </FormItem>
                <FormItem icon='location_on'>
                    <Input 
                        type="text" 
                        name="city" 
                        placeholder='City' 
                        value={form.city} 
                        onChange={onChange}
                    />
                    <Select 
                        name="state" 
                        value={form.state} 
                        onChange={onChange} 
                        >
                        <option>State</option>
                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </FormItem>
                <FormItem icon='description'>
                    <TextArea 
                        name='bio' 
                        placeholder='Tell us about yourself...' 
                        rows='5'
                        value={form.bio} 
                        onChange={onChange} 
                    />
                </FormItem>
                <FormItem icon="videocam">
                    <Input 
                        type="url" 
                        name="videoUrl" 
                        placeholder='Video URL: https://www.youtube.com/' 
                        value={form.videoUrl} 
                        onChange={onChange} 
                    />
                </FormItem>
                <VenueSelect onChange={onChange} value={form.venueId} venues={venues} />
                <ImgUploader 
                    id={imgLabel}
                    img={img}
                    setImg={setImg}
                />            
            </Form>
            <Modal id="createVenue">
                <CreateVenue state={form} setState={setForm} handleCancel={handleCancel} />
            </Modal>
        </>
    );
}

export default CreateProfile;
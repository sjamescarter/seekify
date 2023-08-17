import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { states, handleChange } from '../components/utilities';
import DropZone from '../components/DropZone';
import Form from '../components/Form'
import { Input, Select, TextArea } from '../styles';
import VenueForm from '../components/VenueForm';
import { abc } from '../components/utilities';
import FormItem from '../components/FormItem';

function CreateProfile({ handleLogout }) {
    // Context
    const { setUser, venues } = useContext(UserContext);

    // State
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        state: "",
        bio: "",
        venue: "",
        videoUrl: "",
    });
    const [img, setImg] = useState();
    const [errors, setErrors] = useState([]);

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const profile = new FormData();
        profile.append('first_name', form.firstName);
        profile.append('last_name', form.lastName);
        profile.append('phone', form.phone);
        profile.append('city', form.city);
        profile.append('state', form.state);
        profile.append('bio', form.bio);
        profile.append('venue_id', form.venue);
        profile.append('video_url', form.videoUrl);
        if(img) {
            profile.append('avatar', img);
        }

        fetch('/profiles', {
            method: 'POST',
            body: profile
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => setUser(data));
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    if(form.venue === "new") { return <VenueForm state={form} setState={setForm} /> };

    return (
        <Form 
            formTitle='Create Profile'
            onSubmit={handleSubmit} 
            errors={errors} 
            handleCancel={handleLogout}
        >
            <FormItem icon="person">
                <Input 
                    type="text" 
                    name="firstName" 
                    placeholder='First Name' 
                    value={form.firstName} 
                    onChange={onChange} 
                />
                <Input 
                    type="text" 
                    name="lastName" 
                    placeholder='Last Name' 
                    value={form.lastName} 
                    onChange={onChange} 
                />
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
            <FormItem icon='church'>
                <Select  
                    name="venue"  
                    value={form.venue} 
                    onChange={onChange} 
                >
                    <option>Select Church</option>
                    <option value="new" >Add Church</option>
                    {venues ? abc(venues).map(venue => <option key={venue.id} value={parseInt(venue.id, 10)}>{venue.name}</option>) : null}
                </Select>
            </FormItem>
            <FormItem icon='image'>
                <label htmlFor="avatar">Upload Profile Pic</label>
            </FormItem>
            {img ? <p>{img.name} <span onClick={() => setImg()}> Change</span></p> : <DropZone id='avatar' setState={setImg} />}            
        </Form>
    );
}

export default CreateProfile;
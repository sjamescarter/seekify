import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { states, handleChange, camelToTitle, camelToSnake } from '../components/utilities';
import Form from '../components/Form'
import { Input, Select, TextArea } from '../styles';
import VenueForm from '../components/VenueForm';
import { abc } from '../components/utilities';
import FormItem from '../components/FormItem';
import ImgUploader from '../components/ImgUploader';

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
        venueId: "",
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
        Object.keys(form).map(key => profile.append(camelToSnake(key), form[key]))
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

    if(form.venueId === "new") { return <VenueForm state={form} setState={setForm} /> };

    return (
        <Form 
            formTitle='Create Profile'
            onSubmit={handleSubmit} 
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
            <FormItem icon='church'>
                <Select  
                    name="venueId"  
                    value={form.venueId} 
                    onChange={onChange} 
                >
                    <option>Select Church</option>
                    <option value="new" >Add Church</option>
                    {abc(venues).map(venue => <option key={venue.id} value={parseInt(venue.id, 10)}>{venue.name}</option>)}
                </Select>
            </FormItem>
            <ImgUploader 
                id='avatar'
                img={img}
                setImg={setImg}
            />            
        </Form>
    );
}

export default CreateProfile;
import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { states, handleChange } from '../components/utilities';
import DropZone from '../components/DropZone';
import Errors from '../components/Errors';
import VenueForm from '../components/VenueForm';

function CreateProfile() {
    // Context
    const { user, setUser, venues } = useContext(UserContext);

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
                r.json().then(data => setUser({...user, profile: data}));
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    if(form.venue === "new") { return <VenueForm state={form} setState={setForm} /> };

    return (
        <div>
            <h1>Create Profile</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder='First Name' 
                    value={form.firstName} 
                    onChange={onChange} 
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder='Last Name' 
                    value={form.lastName} 
                    onChange={onChange} 
                />
                <input 
                    type="tel" 
                    name="phone"
                    placeholder='888-888-8888'
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={form.phone} 
                    onChange={onChange} 
                />
                <input 
                    type="text" 
                    name="city" 
                    placeholder='City' 
                    value={form.city} 
                    onChange={onChange} 
                />
                <select 
                    name="state" 
                    value={form.state} 
                    onChange={onChange} 
                >
                    <option>State</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                <textarea 
                    name="bio" 
                    placeholder='Bio' 
                    value={form.bio} 
                    onChange={onChange} 
                />
                <input 
                    type="url" 
                    name="videoUrl" 
                    placeholder='https://www.youtube.com/' 
                    value={form.videoUrl} 
                    onChange={onChange} 
                />
                <select  
                    name="venue"  
                    value={form.venue} 
                    onChange={onChange} 
                >
                    <option>Select Church</option>
                    <option>Not currently attending</option>
                    <option value="new" >Add Church</option>
                    {venues ? venues.map(venue => <option key={venue.id} value={parseInt(venue.id, 10)}>{venue.name}</option>) : null}
                </select>
                <label htmlFor="avatar">Upload Profile Pic</label>
                {img ? <p>{img.name} <span onClick={e => setImg()}> Change</span></p> : <DropZone id='avatar' setState={setImg} />}            
                <input type="submit" value='Create Profile' />
                {errors ? <Errors errors={errors} />: null}
            </form>
        </div>
    );
}

export default CreateProfile;
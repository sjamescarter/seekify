import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { handleChange, states } from './utilities';
import DropZone from './DropZone';
import Errors from './Errors';

function VenueForm() {
    // Context
    const { venues, setVenues } = useContext(UserContext);

    // State
    const [form, setForm] = useState({name: "", street: "", city: "", state: ""});
    const [img, setImg] = useState();
    const [errors, setErrors] = useState([]);
    
    // Handlers
    const onChange = (e) => handleChange(e, form, setForm)

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const venue = new FormData();
        venue.append('name', form.name);
        venue.append('street_address', form.street);
        venue.append('city', form.city);
        venue.append('state', form.state);
        if(form.logo){
            venue.append('logo', img);
        }

        fetch('/venues', {
            method: 'POST',
            body: venue
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => setVenues({ ...venues, data }));
                setForm({name: "", street: "", city: "", state: ""});
                setImg();
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder='Venue Name' 
                value={form.name} 
                onChange={onChange} 
            />
            <input 
                type="text" 
                name="street" 
                placeholder='123 Anywhere Rd.' 
                value={form.street} 
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
            <label htmlFor="logo">Upload Logo</label>
            {img ? <p>{img.name} <span onClick={e => setImg()}> Change</span></p> : <DropZone id='logo' setState={setImg} />}            
            <input type="submit" value='Submit' />
            {errors ? <Errors errors={errors} />: null}
        </form>
    );
}

export default VenueForm;
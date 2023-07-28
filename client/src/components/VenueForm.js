import { useState } from 'react';
import { handleChange, states } from './utilities';
import Errors from './Errors';

function VenueForm() {
    const [form, setForm] = useState({name: "", street: "", city: "", state: ""});
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const venue = new FormData();
        venue.append('name', form.name);
        venue.append('street_address', form.street);
        venue.append('city', form.city);
        venue.append('state', form.state);
        if(form.logo){
            venue.append('logo', form.logo);
        }

        fetch('/venues', {
            method: 'POST',
            body: venue
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => console.log(data));
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                type="text" 
                name="name" 
                placeholder='Venue Name' 
                value={form.name} 
                onChange={(e) => handleChange(e, form, setForm)} 
            />
            <input 
                type="text" 
                name="street" 
                placeholder='123 Anywhere Rd.' 
                value={form.street} 
                onChange={(e) => handleChange(e, form, setForm)} 
            />
            <input 
                type="text" 
                name="city" 
                placeholder='City' 
                value={form.city} 
                onChange={(e) => handleChange(e, form, setForm)} 
            />
            <select 
                name="state" 
                value={form.state} 
                onChange={(e) => handleChange(e, form, setForm)} 
            >
                <option>State</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
            <input 
                type="file" 
                name="logo" 
                accept="image/*" 
                value={undefined} 
                onChange={(e) => setForm({...form, logo: e.target.files[0]})} 
            />
            <input type="submit" value='Submit' />
            {errors ? <Errors errors={errors} />: null}
        </form>
    );
}

export default VenueForm;
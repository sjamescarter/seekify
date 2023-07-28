import { useState } from 'react';
import { handleChange, states } from './utilities';
import DropZone from './DropZone';
import Errors from './Errors';

function VenueForm() {
    const [form, setForm] = useState({name: "", street: "", city: "", state: ""});
    const [errors, setErrors] = useState([]);
    
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
            <DropZone file={'logo'} state={form} setState={setForm} />
            <input type="submit" value='Submit' />
            {errors ? <Errors errors={errors} />: null}
        </form>
    );
}

export default VenueForm;
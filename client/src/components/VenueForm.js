import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { handleChange, states } from './utilities';
import DropZone from './DropZone';
import Form from './Form';
import FormItem from './FormItem';
import { Input, Select } from '../styles'

const formFields = { name: "", streetAddress: "", city: "", state: "" };

function VenueForm({ state, setState }) {
    // Context
    const { venues, setVenues } = useContext(UserContext);

    // State
    const [form, setForm] = useState(formFields);
    const [img, setImg] = useState();
    const [errors, setErrors] = useState([]);

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => handleVenueChange("")
    const handleVenueChange = (id) => setState({ ...state, venue: id }) 
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const venue = new FormData();
        venue.append('name', form.name);
        venue.append('street_address', form.streetAddress);
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
                r.json().then(data => {
                    setVenues([ ...venues, data ]);
                    handleVenueChange(data.id);
                });
                setForm(formFields);
                setImg();
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        })
    }

    return (
        <Form 
            formTitle='Add Church'
            onSubmit={handleSubmit}
            errors={errors}
            handleCancel={handleCancel}
        >
            <FormItem icon='church'>
                <Input 
                    type="text" 
                    name="name" 
                    placeholder='Name' 
                    value={form.name} 
                    onChange={onChange} 
                />
            </FormItem>
            <FormItem icon='location_on'>
                <Input 
                    type="text" 
                    name="streetAddress" 
                    placeholder='Street Address' 
                    value={form.streetAddress} 
                    onChange={onChange} 
                    />
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
            <FormItem icon='image'>
            <label htmlFor="logo">Upload Logo</label>
            </FormItem>

            {img 
                ? <p>{img.name} <span onClick={e => setImg()}> Change</span></p> 
                : <DropZone id='logo' setState={setImg} />
            }            
        </Form>
    );
}

export default VenueForm;
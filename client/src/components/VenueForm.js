import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { Input, Select } from '../styles'
import { camelToSnake, camelToTitle, handleChange, states } from './utilities';
import Form from './Form';
import FormItem from './FormItem';
import ImgUploader from './ImgUploader';

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
    const handleVenueChange = (id) => setState({ ...state, venueId: id }) 
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const venue = new FormData();
        Object.keys(form).map(key => venue.append(camelToSnake(key), form[key]));
        if(img){
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
                {Object.keys(form).slice(1, 3).map(key =>
                    <Input 
                        key={key}
                        type="text"
                        name={key}
                        placeholder={camelToTitle(key)}
                        value={form[key]}
                        onChange={onChange}
                    />
                )}
                <Select 
                    name="state" 
                    value={form.state} 
                    onChange={onChange} 
                    >
                    <option>State</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </Select>
            </FormItem>
            <ImgUploader 
                id='logo'
                img={img}
                setImg={setImg}
            />
        </Form>
    );
}

export default VenueForm;
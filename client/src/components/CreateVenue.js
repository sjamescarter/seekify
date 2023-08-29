import { useContext, useState } from 'react';
import { VenuesContext } from '../context/venues';
import { Input, Select } from '../styles'
import { camelToTitle, handleImgSubmit, handleChange, states } from './utilities';
import Form from './Form';
import FormItem from './FormItem';
import ImgUploader from './ImgUploader';

const formFields = { name: "", streetAddress: "", city: "", state: "" };

function CreateVenue({ state, setState }) {
    // Context
    const { venues, setVenues } = useContext(VenuesContext);

    // State
    const [form, setForm] = useState(formFields);
    const [img, setImg] = useState();
    const [errors, setErrors] = useState([]);

    // Const
    const callback = (data) => { // This is the onSubmit callback
        setVenues([ ...venues, data ]);
        handleVenueChange(data.id);
        setForm(formFields);
        setImg();
    };
    const endpoint = 'venues';
    const imgLabel = 'logo';

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => handleVenueChange("");
    const handleVenueChange = (id) => setState({ ...state, venueId: id }); 
    const onSubmit = (e) => handleImgSubmit(e, endpoint, setErrors, form, imgLabel, img, callback);

    return (
        <Form 
            title='Add Church'
            onSubmit={onSubmit}
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
                    autoFocus
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
                    {states.map(state => 
                        <option 
                            key={state} 
                            value={state}
                        >
                            {state}
                        </option>
                    )}
                </Select>
            </FormItem>
            <ImgUploader 
                id={imgLabel}
                img={img}
                setImg={setImg}
            />
        </Form>
    );
}

export default CreateVenue;
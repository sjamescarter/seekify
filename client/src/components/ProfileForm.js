import { Input, Select, TextArea } from '../styles';
import { states, handleChange, camelToTitle } from '../components/utilities';
import Form from '../components/Form'
import FormItem from '../components/FormItem';
import ImgUploader from '../components/ImgUploader';
import VenueSelect from '../components/VenueSelect';

function ProfileForm({ form, setForm, title, onSubmit, errors, venues, onCancel, imgLabel, img, setImg }) {
    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);

    return (
        <Form 
            title={title}
            onSubmit={onSubmit} 
            errors={errors} 
            handleCancel={onCancel}
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
    );
}

export default ProfileForm;
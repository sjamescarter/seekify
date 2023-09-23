import { Input, TextArea } from "../styles";
import { handleChange } from "../components/utilities";
import Form from "../components/Form";
import FormItem from "../components/FormItem";
import ImgUploader from "../components/ImgUploader";
import VenueSelect from "../components/VenueSelect";

function EventForm({ title, form, setForm, imgLabel, img, setImg, onSubmit, onCancel, errors, venues }) {
    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);

    return (
        <Form 
            title={title}
            onSubmit={onSubmit}
            errors={errors}
            handleCancel={onCancel}
            >
            <FormItem icon='event'>
                <Input 
                    type='text'
                    name='name'
                    placeholder="Name"
                    value={form.name}
                    onChange={onChange}
                    />
                <Input
                    type='datetime-local'
                    name='date'
                    value={form.date}
                    onChange={onChange}
                    />
            </FormItem>
            <FormItem icon="event_note">
                <label style={{width: '100%', margin: '5px', padding: '5px 10px'}}>Rehearsal</label>
                <Input
                    type='datetime-local'
                    name='rehearsal'
                    value={form.rehearsal}
                    onChange={onChange}
                    />
            </FormItem>
            <VenueSelect onChange={onChange} value={form.venueId} venues={venues} />
            <FormItem icon="public">
                <p style={{width: '100%', margin: '5px', padding: '5px 10px'}}>Public Event?</p>
                <Input
                    type="checkbox"
                    name="public"
                    checked={form.public}
                    onChange={onChange}
                    />
            </FormItem>
            <FormItem icon='description'>
                <TextArea 
                    name='description' 
                    placeholder='Give us all the details about your event...' 
                    rows='5' 
                    value={form.description} 
                    onChange={onChange} 
                    />
            </FormItem>
            <ImgUploader id={imgLabel} img={img} setImg={setImg} />
        </Form>
    );
}

export default EventForm;
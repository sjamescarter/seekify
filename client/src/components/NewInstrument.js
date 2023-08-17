import { useContext, useState } from "react";
import { UserContext } from '../context/user';
import { handleChange } from './utilities';
import Form from "./Form";
import { Input } from '../styles'
import FormItem from "./FormItem";

const formFields = { name: "" };

function NewInstrument({state, setState}) {
    // Context
    const { instruments, setInstruments } = useContext(UserContext);

    // State
    const [form, setForm] = useState(formFields);
    const [errors, setErrors] = useState([]);

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => setState({...state, instrumentId: ""})
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        fetch('/instruments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => {
                    setInstruments([...instruments, data]);
                    setState({...state, instrumentId: data.id});
                    setForm(formFields);
                });
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        })
    }

    return (
            <Form formTitle='Create Instrument' onSubmit={handleSubmit} errors={errors} handleCancel={handleCancel}>
                <FormItem icon='piano'>
                    <Input type="text" name="name" placeholder="Instrument Name" value={form.name} onChange={onChange} />
                </FormItem>
            </Form>
    );
}

export default NewInstrument;
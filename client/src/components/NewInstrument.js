import { useContext, useState } from "react";
import { UserContext } from '../context/user';
import { handleChange } from './utilities';
import Errors from "./Errors";

const formFields = { name: "" };

function NewInstrument({state, setState}) {
    // Context
    const { instruments, setInstruments } = useContext(UserContext);

    // State
    const [form, setForm] = useState(formFields);
    const [errors, setErrors] = useState([]);

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);

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
        <div>
            <h2>Create New Instrument</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Instrument Name" value={form.name} onChange={onChange} />
                <input type="submit" value="Submit" />
                <button onClick={() => setState({...state, instrumentId: ""})}>Cancel</button>
                {errors ? <Errors errors={errors} />: null}
            </form>
        </div>
    );
}

export default NewInstrument;
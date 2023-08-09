import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { abc, skillLevels, handleChange } from './utilities';
import Errors from './Errors';
import NewInstrument from './NewInstrument';

const formFields = { instrumentId: "", skill: "", experience: 0 }

function AddInstrument() {
    // Context
    const { user, setUser, instruments } = useContext(UserContext);

    // State
    const [form, setForm] = useState(formFields);
    const [errors, setErrors] = useState([]);

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    function handleSubmit(e){
        e.preventDefault();
        setErrors();

        fetch('/user_instruments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                instrument_id: form.instrumentId,
                skill: form.skill,
                experience: form.experience
            })
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => setUser({ ...user, userInstruments: data}));
                setForm(formFields);
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        })
    }

    if(form.instrumentId === "new") return <NewInstrument state={form} setState={setForm} />
console.log(form);
    return (
        <div>
            <h2>Add an Instrument</h2>
            <form onSubmit={handleSubmit}>
                <select name="instrumentId" value={form.instrumentId} onChange={onChange}>
                    <option>Select Instrument</option>
                    <option value="new">New Instrument</option>
                    { instruments ? abc(instruments).map(i => <option key={i.id} value={i.id}>{i.name}</option>) : null }
                </select>
                <select name="skill" value={form.skill} onChange={onChange}>
                    <option>Select Skill Level</option>
                    { skillLevels.map(skill => <option key={skill} value={skill}>{skill[0].toUpperCase() + skill.substring(1)}</option>) }
                </select>
                <input type="number" name="experience" value={form.experience} onChange={onChange} />
                <input type="submit" value="Submit" />
                {errors ? <Errors errors={errors} />: null}
            </form>
        </div>
    );
}

export default AddInstrument;
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import { abc, addS, experienceLevels, skillLevels, handleChange } from './utilities';
import { Select } from '../styles';
import Form from './Form';
import CreateInstrument from './CreateInstrument';
import FormItem from './FormItem';
import { InstrumentsContext } from '../context/instruments';

const formFields = { instrumentId: "", skill: "", experience: "" }

function AddInstrument() {
    // Context
    const { user, setUser } = useContext(UserContext);
    const { instruments } = useContext(InstrumentsContext);

    // State
    const [form, setForm] = useState(formFields);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

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
                r.json().then(userInstrument => setUser({
                    ...user, 
                    user_instruments: [
                        ...user.user_instruments, 
                        userInstrument
                    ]
                }));
                navigate('/profile');
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        })
    }

    if(form.instrumentId === "new") return <CreateInstrument state={form} setState={setForm} />

    return (
            <Form 
                title='Add Instrument'
                onSubmit={handleSubmit} 
                errors={errors}
            >
                <FormItem icon='piano'>
                    <Select name="instrumentId" value={form.instrumentId} onChange={onChange}>
                        <option>Select Instrument</option>
                        <option value="new">New Instrument</option>
                        { instruments ? abc(instruments).map(i => <option key={i.id} value={i.id}>{i.name}</option>) : null }
                    </Select>
                </FormItem>
                <FormItem icon='star'>
                    <Select name="skill" value={form.skill} onChange={onChange}>
                        <option>Select Skill Level</option>
                        { skillLevels.map(skill => <option key={skill} value={skill}>{skill[0].toUpperCase() + skill.substring(1)}</option>) }
                    </Select>
                </FormItem>
                <FormItem icon='history'>
                    <Select name="experience" value={form.experience} onChange={onChange}>
                        <option>Select Experience Level</option>
                        { experienceLevels.map(xp => <option key={xp} value={xp}>{xp} year{addS(xp)} experience</option>) }
                    </Select>
                </FormItem>
            </Form>
    );
}

export default AddInstrument;
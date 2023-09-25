import { useContext, useState } from 'react';
import { InstrumentsContext } from '../context/instruments';
import { MusiciansContext } from '../context/musicians';
import { UserContext } from '../context/user';
import { styled } from 'styled-components';
import { Select } from '../styles';
import { abc, addS, experienceLevels, skillLevels, handleChange, handleModal } from './utilities';
import Form from './Form';
import CreateInstrument from './CreateInstrument';
import FormItem from './FormItem';
import Modal from './Modal';

const formFields = { instrumentId: "", skill: "", experience: "" }

function AddInstrument() {
    // Context
    const { user, setUser } = useContext(UserContext);
    const { instruments } = useContext(InstrumentsContext);
    const { musicians, setMusicians } = useContext(MusiciansContext);

    // State
    const [form, setForm] = useState(formFields);
    const [errors, setErrors] = useState();

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleCancel = () => {
        setForm({...form, instrumentId: ""});
        handleModal('createInstrument');
    }
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
                r.json().then(userInstrument => {
                    setUser({
                        ...user, 
                        user_instruments: [
                            ...user.user_instruments, 
                            userInstrument
                        ]
                    })
                    setMusicians([
                        ...musicians.map(m => m.id === user.id
                            ? {
                                ...m,
                                user_instruments: [
                                    ...m.user_instruments,
                                    userInstrument
                                ]
                            }
                            : m
                        )
                    ])
                });
                handleModal('addInstrument');
                setForm(formFields);
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        })
    }

    if(form.instrumentId === "new") {
        handleModal('createInstrument', true);
    }

    return (
        <>
            <Form 
                title='Add Instrument'
                onSubmit={handleSubmit} 
                handleCancel={() => {
                    setForm(formFields);
                    handleModal('addInstrument');
                }}
                errors={errors}
                >
                <FormItem icon='piano'>
                    <WideSelect name="instrumentId" value={form.instrumentId} onChange={onChange}>
                        <option>Select Instrument</option>
                        <option value="new">New Instrument</option>
                        { instruments ? abc(instruments).map(i => <option key={i.id} value={i.id}>{i.name}</option>) : null }
                    </WideSelect>
                </FormItem>
                <FormItem icon='star'>
                    <WideSelect name="skill" value={form.skill} onChange={onChange}>
                        <option>Select Skill Level</option>
                        { skillLevels.map(skill => <option key={skill} value={skill}>{skill[0].toUpperCase() + skill.substring(1)}</option>) }
                    </WideSelect>
                </FormItem>
                <FormItem icon='history'>
                    <WideSelect name="experience" value={form.experience} onChange={onChange}>
                        <option>Select Experience Level</option>
                        { experienceLevels.map(xp => <option key={xp} value={xp}>{xp} year{addS(xp)} experience</option>) }
                    </WideSelect>
                </FormItem>
            </Form>
            <Modal id="createInstrument">
                <CreateInstrument state={form} setState={setForm} handleCancel={handleCancel} />
            </Modal>
        </>
    );
}

// Styles
const WideSelect = styled(Select)`
    width: 100%
`
export default AddInstrument;
import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import Form from "./Form";
import FormItem from "./FormItem";
import { Input, Select, TextArea } from "../styles";
import { abc, addS, camelToSnake, handleChange } from "./utilities";
import { InstrumentsContext } from "../context/instruments";
import { MusiciansContext } from "../context/musicians";

const formFields = {message: "", status: "pending", pay: "", userInstrumentId: "", instrumentId: ""};

function CreateInvite({ event }) {
    // Context
    const { user } = useContext(UserContext);
    const { instruments } = useContext(InstrumentsContext);
    const { musicians } = useContext(MusiciansContext);

    // State
    const [form, setForm] = useState({...formFields, eventId: event.id});
    const [search, setSearch] = useState()
    const [errors, setErrors] = useState();

    const title = `Invite for ${event.name}`;
    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setForm({...form, userInstrumentId: ""});
    }
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const invite = new FormData();
        Object.keys(form).map(key => invite.append(camelToSnake(key), form[key]));

        fetch('/invites', {
            method: "POST",
            body: invite
        })
        .then(r => {
            if(r.ok) {
                r.json().then(data => console.log(data));
            } else {
                r.json().then(err => setErrors(err.errors));
            }
        })
    } 
console.log(instruments)
console.log(search)
    if(!instruments) return <h1>Loading...</h1>

    return (
        <Form title={title} onSubmit={handleSubmit} errors={errors}>
            <FormItem icon='piano'>
                <Select 
                    name="instrumentId" 
                    value={form.instrumentId}
                    onChange={handleSearch}
                >
                    <option>Select Instrument</option>
                    { abc(instruments).map(i => 
                        <option 
                            key={i.id} 
                            value={i.id}
                        >
                            {i.name}
                        </option>) 
                    }
                </Select>
            </FormItem>
            <FormItem icon='person'>
                <Select 
                    name="userInstrumentId" 
                    value={form.userInstrumentId} 
                    onChange={onChange}
                >
                    <option>Select Musician</option>
                    { search 
                        ? instruments.filter(i => i.id === parseInt(search))
                            .map(i => abc(i.musicians).map(m => 
                                <option 
                                    key={m.id} 
                                    value={m.id}
                                >
                                    {m.name} | {m.skill} | {m.experience} year{addS(m.experience)} experience 
                                </option>)
                            ) 
                        : null 
                    }
                </Select>
            </FormItem>

            <FormItem icon='paid'>
                <Input 
                    type="number" 
                    name="pay" 
                    placeholder="Pay optional" 
                    value={form.pay} 
                    onChange={onChange} 
                />
            </FormItem>
            <FormItem icon='description'>
                <TextArea 
                    name="message" 
                    placeholder="Message" 
                    value={form.message} 
                    onChange={onChange} 
                />
            </FormItem>
        </Form>
    );
}

export default CreateInvite;
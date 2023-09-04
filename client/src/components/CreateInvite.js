import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { InstrumentsContext } from "../context/instruments";
import { Input, Select, TextArea } from "../styles";
import { abc, addS, camelToSnake, handleChange, handleModal } from "./utilities";
import Form from "./Form";
import FormItem from "./FormItem";

const formFields = {message: "", status: "pending", pay: "", userInstrumentId: "", instrumentId: ""};

function CreateInvite({ event, handleCancel }) {
    // Context
    const { user, setUser } = useContext(UserContext);
    const { instruments } = useContext(InstrumentsContext);
    
    // State
    const [form, setForm] = useState(formFields);
    const [search, setSearch] = useState()
    const [errors, setErrors] = useState();
    
    const title = `Invite for ${event.name}`;
    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    
    const resetForm = () => { 
        setForm(formFields); 
        handleCancel();
        setErrors(); 
    }
    
    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value);
        setForm({...form, instrumentId: value, userInstrumentId: ""});
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        setErrors();
        
        const invite = new FormData();
        Object.keys(form).map(key => invite.append(camelToSnake(key), form[key]));
        
        fetch(`/events/${event.id}/invites`, {
            method: "POST",
            body: invite
        })
        .then(r => {
            if(r.ok) {
                r.json().then(invite => {
                    setUser({
                        ...user, 
                        events: [
                            ...user.events.map(e => 
                                e.id === event.id 
                                ? {...e, roles: [...e.roles, invite]} 
                                : e
                                )
                            ]
                        });
                        resetForm();
                        handleModal('createInvite');
                    });
                } else {
                    r.json().then(err => setErrors(err.errors));
                }
            })
        } 
        
    if(!instruments) return <h1>Loading...</h1>
    const filteredInstruments = [...instruments].filter(i => i.musicians.length !== 0);

    return (
        <Form title={title} onSubmit={handleSubmit} errors={errors} handleCancel={resetForm}>
            <FormItem icon='piano'>
                <Select 
                    name="instrumentId" 
                    value={form.instrumentId}
                    onChange={handleSearch}
                >
                    <option>Select Instrument</option>
                    { abc(filteredInstruments).map(i => 
                        <option 
                            key={i.id} 
                            value={i.id}
                        >
                            {i.name}
                        </option>) 
                    }
                </Select>
                <span className='material-symbols-rounded' style={{color: "#8AA29E", margin: "0 5px"}}>paid</span>
                <Input 
                    type="number" 
                    name="pay"
                    min="0" 
                    placeholder="Pay (optional)" 
                    value={form.pay} 
                    onChange={onChange} 
                />
            </FormItem>
            <FormItem icon='person'>
                <Select 
                    name="userInstrumentId" 
                    style={{width: "100%"}}
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
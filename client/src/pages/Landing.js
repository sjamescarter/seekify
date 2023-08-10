import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { handleChange } from '../components/utilities';
import Errors from '../components/Errors';

function Landing() {
    // Context
    const { setUser } = useContext(UserContext);

    // State
    const [showSignUp, setShowSignUp] = useState(false)
    const [form, setForm] = useState({email: "", password: "", passwordConfirmation: ""})
    const [errors, setErrors] = useState();

    // Handlers
    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        const endpoint = showSignUp ? '/signup' : '/login';

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
                password_confirmation: form.passwordConfirmation
            })
        }).then(r => {
            if(r.ok) {
                r.json().then(user => setUser(user))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        }); 
    }

    return (
        <Wrapper>
            <h1>Welcome to Seekify.io</h1>
            <p>A social network for worship leaders, musicians and technicians</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    name='email' 
                    placeholder='Email' 
                    value={form.email} 
                    onChange={(e) => handleChange(e, form, setForm)} 
                />
                <input 
                    type='password' 
                    name='password'
                    placeholder='Password' 
                    value={form.password} 
                    onChange={(e) => handleChange(e, form, setForm)}
                />
                {
                    showSignUp 
                        ? <input 
                            type='password' 
                            name='passwordConfirmation'
                            placeholder='Confirm Password' 
                            value={form.passwordConfirmation} 
                            onChange={(e) => handleChange(e, form, setForm)}
                        /> 
                        : null
                }
                <input type='submit' value='Submit' />
                {errors ? <Errors errors={errors} />: null}
                {
                    showSignUp 
                        ? <p>Already have an account? <span onClick={() => setShowSignUp(false)}>Sign In Here!</span></p>
                        : <p>Need an account? <span onClick={() => setShowSignUp(true)}>Sign Up Here!</span></p>
                }
            </form>
        </Wrapper>
    );
}

// Styles
const Wrapper = styled.div`
    margin: auto;
    // margin-top: 100px;
    padding: 10px;
    width: 800px;
`

export default Landing;
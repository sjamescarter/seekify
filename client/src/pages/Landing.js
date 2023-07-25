import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
// import NavBar from '../components/NavBar';

function Landing() {
    const { setUser } = useContext(UserContext);
    const [showSignUp, setShowSignUp] = useState(false)
    const [form, setForm] = useState({email: "", password: "", passwordConfirmation: ""})

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
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
            }
        }); 
    }

    return (
        <>
        {/* <NavBar /> */}
        <Wrapper>
            <h1>This is the landing page</h1>
            <p>You can find out about us.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    name='email' 
                    placeholder='Email' 
                    value={form.email} 
                    onChange={(e) => handleChange(e)} 
                />
                <input 
                    type='password' 
                    name='password'
                    placeholder='Password' 
                    value={form.password} 
                    onChange={(e) => handleChange(e)}
                />
                {
                    showSignUp 
                        ? <input 
                            type='password' 
                            name='passwordConfirmation'
                            placeholder='Confirm Password' 
                            value={form.passwordConfirmation} 
                            onChange={(e) => handleChange(e)}
                        /> 
                        : null
                }
                <input type='submit' value='Submit' />
                {
                    showSignUp 
                        ? <p>Already have an account? <span onClick={() => setShowSignUp(false)}>Sign In Here!</span></p>
                        : <p>Need an account? <span onClick={() => setShowSignUp(true)}>Sign Up Here!</span></p>
                }
            </form>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    margin: auto;
    // margin-top: 100px;
    padding: 10px;
    width: 800px;
`

export default Landing;
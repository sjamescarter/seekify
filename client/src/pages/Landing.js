import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { handleChange } from '../components/utilities';
import Form from '../components/Form';
import FormItem from '../components/FormItem';
import { Input } from '../styles'

function Landing() {
    // Context
    const { setUser } = useContext(UserContext);

    // State
    const [showSignUp, setShowSignUp] = useState(false)
    const [form, setForm] = useState({email: "", password: "", passwordConfirmation: ""})
    const [errors, setErrors] = useState();

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
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
        <div>
            <Container>
                <h1>Welcome to Seekify.io</h1>
                <p>A social network for worship leaders, musicians and technicians</p>
            </Container>
            <Form 
                title={showSignUp ? 'Sign Up' : 'Sign In'}
                onSubmit={handleSubmit} 
                errors={errors} 
            >
                <FormItem icon='email'>
                    <Input 
                        type='email' 
                        name='email' 
                        placeholder='Email' 
                        value={form.email} 
                        onChange={onChange} 
                    />
                </FormItem>
                <FormItem icon='lock'>
                    <Input 
                        type='password' 
                        name='password'
                        placeholder='Password' 
                        value={form.password} 
                        onChange={onChange}
                    />
                </FormItem>
                {
                    showSignUp 
                    ? <FormItem icon='lock'>
                        <Input 
                            type='password' 
                            name='passwordConfirmation'
                            placeholder='Confirm Password' 
                            value={form.passwordConfirmation} 
                            onChange={onChange}
                        /> 
                    </FormItem>
                    : null
                }
            </Form>
            <Container>
                {
                    showSignUp 
                    ? <P>Already have an account? <Span onClick={() => setShowSignUp(false)}>Sign In Here!</Span></P>
                    : <P>Need an account? <Span onClick={() => setShowSignUp(true)}>Sign Up Here!</Span></P>
                }
            </Container>
        </div>
    );
}

// Styles
const Container = styled.div`
    margin: auto;
    padding: 10px 2em;
    width: 550px;
    text-align: center;
`
const Span = styled.span`
    text-decoration-line: underline;
    color: #3D5467;
    &:hover {
        cursor: pointer;
    }
`
const P = styled.p`
    text-align: center;
`
export default Landing;
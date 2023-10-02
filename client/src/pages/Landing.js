import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { styled } from 'styled-components';
import { Input, colors } from '../styles'
import { handleChange } from '../components/utilities';
import Form from '../components/Form';
import FormItem from '../components/FormItem';

function Landing() {
    // Context
    const { setUser } = useContext(UserContext);

    // State
    const [showSignUp, setShowSignUp] = useState(false)
    const [form, setForm] = useState({email: "", password: "", passwordConfirmation: ""})
    const [errors, setErrors] = useState();

    // Handlers
    const onChange = (e) => handleChange(e, form, setForm);
    const handleClick = () => setShowSignUp(!showSignUp);
    function handleSubmit(e) {
        e.preventDefault();
        setErrors();
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
        <Container>
            <h1 style={{fontSize: "2.5em"}}>Welcome to Seekify.io</h1>
            <P>A social network for worship leaders, musicians and technicians</P>
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
                { showSignUp 
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
            { showSignUp 
                ? <P>Already have an account? <Span onClick={handleClick}>Sign In Here!</Span></P>
                : <P>Need an account? <Span onClick={handleClick}>Sign Up Here!</Span></P>
            }
        </Container>
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
    color: ${colors.secondary};
    &:hover {
        cursor: pointer;
    }
`
const P = styled.p`
    text-align: center;
    font-size: 1.2em;
`
export default Landing;
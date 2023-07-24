import styled from 'styled-components';
import NavBar from '../components/NavBar';

function Landing() {
    return (
        <>
        <NavBar />
        <Wrapper>
            <h1>This is the landing page</h1>
            <p>You can find out about us.</p>
            <p>And sign in or sign up</p>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    margin: auto;
    margin-top: 100px;
    padding: 10px;
    width: 800px;
`

export default Landing;
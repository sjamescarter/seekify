import styled from "styled-components";

function Warning({ onSubmit }) {
    return (
        <Form onSubmit={onSubmit}>
            <h3>You sure, bro?</h3>
            <input type="submit" value="Yes, delete forever"/>
            <button type="button" onClick={() => document.getElementById('confirm').close()}>Nope!</button>
        </Form>
    );
}

const Form = styled.form`
    border: 5px solid #DB5461;
    border-radius: 20px;
    background-color: white;
    padding: 1em 2em 2em;
`
export default Warning;

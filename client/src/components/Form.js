import Button from '../styles/Button'
import styled from 'styled-components';
import Errors from './Errors'

function Form({ formTitle, children, onSubmit, errors, handleCancel }) {
    return(
        <StyledForm onSubmit={onSubmit}>
            <h1>{formTitle}</h1>
            {children}
            <input type="submit" value={formTitle} />
            <Button onClick={handleCancel} style="alt">Cancel</Button>
            {errors ? <Errors errors={errors} /> : null}
        </StyledForm>
    );
}

const StyledForm = styled.form`
    background-color: white;
    border-radius: 2em;
    display: grid;
    width: 550px;
    padding: 2em;
    margin: auto;
    margin-top: 2em;
    text-align: center;
`

export default Form;
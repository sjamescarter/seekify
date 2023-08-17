import styled from 'styled-components';
import Button from './Button';
import Errors from './Errors'

function Form({ formTitle, children, onSubmit, errors, handleCancel }) {
    return(
        <StyledForm onSubmit={onSubmit}>
            <Title>{formTitle}</Title>
            {children}
            <Submit type="submit" value='Submit' />
            {handleCancel ? <Button onClick={handleCancel} alt='true'>Cancel</Button> : null}
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
`
const Title = styled.h1`
    color: #3D5467;
    text-align: center;
`
const Submit = styled.input`
    background-color: #8AA29E;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 12px 0;
    font: inherit;
    font-size: 1.3em;
    font-weight: 800;

`

export default Form;
import { styled } from 'styled-components';
import { CancelBtn, colors } from '../styles';
import Errors from './Errors'

function Form({ title, children, onSubmit, errors, handleCancel }) {
    return(
        <StyledForm onSubmit={onSubmit}>
            <Title>{title}</Title>
            {children}
            <Submit type="submit" value='Submit' />
            {handleCancel ? <CancelBtn type="button" onClick={handleCancel}>Cancel</CancelBtn> : null}
            {errors ? <Errors errors={errors} /> : null}
        </StyledForm>
    );
}

const StyledForm = styled.form`
    background-color: white;
    border-radius: 1em;
    display: grid;
    max-width: 550px;
    min-width: 500px;
    padding: 0 2em 2em;
    margin: auto;
    margin-top: 2em;
    margin-bottom: 2em;
    box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
`
const Title = styled.h1`
    color: ${colors.secondary};
    text-align: center;
`
const Submit = styled.input`
    background-color: ${colors.main};
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 12px 0;
    font: inherit;
    font-size: 1.3em;
    font-weight: 800;
    &:hover {
        background-color: ${colors.mainHover};
        cursor: pointer;
    }
`
export default Form;
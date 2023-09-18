import styled from 'styled-components';
import Button from '../styles/Button';
import Errors from './Errors'
import { colors } from '../styles';

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
    padding: 0 2em 2em;
    margin: auto;
    margin-top: 2em;
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
const CancelBtn = styled(Button)`
    color: ${colors.gray};
    background-color: white;
    padding: 1em 2em;
    width: auto;
    margin: auto;
    &:hover {
        background-color: ${colors.nuetral};
    }
`
export default Form;
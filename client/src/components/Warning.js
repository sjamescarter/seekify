import { styled } from "styled-components";
import { CancelBtn, colors } from "../styles";

function Warning({ onSubmit, handleCancel }) {
    return (
        <Form onSubmit={onSubmit}>
            <H2>You sure, Bro?!</H2>
            <P>This change is permanent.</P>
            <Container>
                <Delete 
                    type="submit" 
                    value="Yes, delete!"
                />
                <CancelBtn 
                    type="button" 
                    onClick={handleCancel}
                >
                    Cancel
                </CancelBtn>
            </Container>
        </Form>
    );
}

const Form = styled.form`
    border-radius: 20px;
    background-color: white;
    padding: 1em 2em 2em;
    text-align: center;
    box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
`
const H2 = styled.h2`
    font-size: 40px;
    margin-bottom: 0px;
    padding: 0 1em;
`
const P = styled.p`
    padding: 0 10px 20px;
    font-size: 16px;
    border-bottom: .5px solid ${colors.gray};
`
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Delete = styled.input`
    background-color: ${colors.red};
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    padding: 1em 2em;
    width: auto;
    margin: auto;
    &:hover {
        background-color: ${colors.redHover};
        cursor: pointer;
    }
`
export default Warning;

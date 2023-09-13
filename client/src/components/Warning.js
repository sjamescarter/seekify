import styled from "styled-components";
import Button from "./Button";
import { colors } from "../styles";

function Warning({ onSubmit, handleCancel }) {
    return (
        <Form onSubmit={onSubmit}>
            <H2>You sure, Bro?!</H2>
            <P>This change is permanent.</P>
            <Delete 
                type="submit" 
                value="Yes, delete!"
            />
            <Button 
                type="button" 
                alt="true"
                onClick={handleCancel}
            >
                Cancel
            </Button>
        </Form>
    );
}

const Form = styled.form`
    border-radius: 20px;
    background-color: white;
    padding: 1em 2em 2em;
    text-align: center;
`
const H2 = styled.h2`
    font-size: 40px;
    margin-bottom: 0px;
    padding: 0 1em;
    // border-bottom: .5px solid #686963;
`
const P = styled.p`
    padding: 0 10px 20px;
    font-size: 16px;
    border-bottom: .5px solid ${colors.gray};
`
const Delete = styled.input`
    background-color: #DB5461;
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    padding: 8px;
`
export default Warning;

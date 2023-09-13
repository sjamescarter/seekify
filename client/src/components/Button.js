import styled from 'styled-components';
import { colors } from '../styles';

const main = {
    border: "1px solid #8AA29E",
    backgroundColor: colors.main,
    color: "white"
};
const secondary = {    
    border: "1px solid #686963",
    backgroundColor: "white",
    color: "#686963"
};
const StyledButton = styled.button`
    border: none;
    border-radius: 10px;
    // display: grid;
    // grid-template-columns: 35px 1fr;
    align-items: center;
    padding: 8px;
    margin: 10px;
    font-weight: 600;
    &:hover {
        background-color: ${colors.mainHover};
        cursor: pointer;
    }
`

function Button({ title, onClick, children, alt=false }) {
    return <StyledButton 
        title={title}
        type="button" 
        style={alt ? secondary : main} 
        onClick={onClick}
    >
        {children}
    </StyledButton>
}

export default Button;
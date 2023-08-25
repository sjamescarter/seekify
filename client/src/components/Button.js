import styled from 'styled-components';

const main = {
    border: "1px solid #8AA29E",
    backgroundColor: "#8AA29E",
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
    padding: 8px;
    font-weight: 600;
    opacity: .8;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

function Button({ onClick, children, alt=false }) {
    return <StyledButton 
        type="button" 
        style={alt ? secondary : main} 
        onClick={onClick}
    >
        {children}
    </StyledButton>
}

export default Button;
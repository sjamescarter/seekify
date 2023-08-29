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
    display: grid;
    grid-template-columns: 35px 1fr;
    align-items: center;
    padding: 8px;
    margin: 10px;
    font-weight: 600;
    opacity: 1;
    &:hover {
        opacity: .8;
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
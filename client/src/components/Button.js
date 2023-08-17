import styled from 'styled-components';

const main = {
    border: "2px solid #8AA29E",
    backgroundColor: "#8AA29E",
    color: "white"
};
const secondary = {    
    border: "1px solid #686963",
    backgroundColor: "white",
    fontWeight: "600",
    color: "#686963"
};
const StyledButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px;
`

function Button({ onClick, children, alt=false }) {
    return <StyledButton type="button" style={alt ? secondary : main} onClick={onClick}>{children}</StyledButton>
}

export default Button;